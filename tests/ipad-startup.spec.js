const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test.use({hasTouch:true});
test.beforeEach(async({page})=>{
 await page.addInitScript(()=>{
  Object.defineProperty(document,'pointerLockElement',{configurable:true,get:()=>undefined});
  Object.defineProperty(document,'exitPointerLock',{configurable:true,value:undefined});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
});
test('Atlas navigation works without Pointer Lock APIs',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(base);
 await page.getByRole('button',{name:'Start avontuur'}).tap();
 await page.locator('.heroLevelTile').tap();
 await expect(page.locator('.introScreen')).toBeVisible();
 await page.getByRole('button',{name:'Terug',exact:true}).tap();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
 await expect(page.locator('[data-tap-diagnostics]')).toHaveCount(0);
 await page.locator('[data-menu-tile="LVL-0004"]').tap();
 await page.getByRole('button',{name:'Terug',exact:true}).tap();
 await page.locator('.heroLevelTile').tap();
 await page.getByRole('button',{name:'Start avontuur'}).tap();
 await expect(page.locator('[data-world-stage]')).toBeVisible();
 await page.locator('[data-graphics-action="toggle"]').tap();
 await expect(page.locator('[data-graphics-settings]')).toBeVisible();
 await page.getByRole('button',{name:'Sluiten',exact:true}).tap();
 await page.getByRole('button',{name:'Terug naar menu'}).tap();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
 await page.screenshot({path:`qa-screenshots/usability/tap-diagnostics-${test.info().project.name}.png`});
 expect(errors).toEqual([]);
});
test('startup reaches adapter diagnostics without Pointer Lock APIs',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:()=>new Promise(()=>{})}}));
 await page.goto(`${base}/?dev=editor&level=LVL-0001`);
 await page.locator('[data-graphics-action="toggle"]').tap();
 await page.locator('[data-renderer-choice="3d"]').tap();
 await expect(page.locator('[data-three-diagnostic]')).toContainText('WebGPU-adapter aanvragen');
 await expect(page.locator('[data-three-recover]')).toBeVisible();
 await expect(page.locator('[data-three-canvas]')).toBeHidden();
 await page.locator('[data-three-recover]').tap();
 await expect(page.locator('[data-three-loading]')).toHaveCount(0);
 await expect(page.locator('.worldArt')).toBeVisible();
 await page.getByRole('button',{name:'Terug naar menu'}).tap();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
 await expect(page.locator('[data-three-loading]')).toHaveCount(0);
});
for(const boundary of ['requestAdapter','requestDevice'])test(`names and recovers from ${boundary} failure`,async({page})=>{
 await page.goto(`${base}/?dev=editor&level=LVL-0001`);
 await page.locator('[data-graphics-action="toggle"]').tap();
 await page.evaluate(boundary=>{
  const fail=()=>{throw new DOMException(`Injected ${boundary} failure`,'OperationError');};
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:boundary==='requestAdapter'?fail:async()=>({requestDevice:async()=>fail()})}});
 },boundary);
 await page.locator('[data-renderer-choice="3d"]').tap();
 await expect(page.locator('[data-three-loading]')).toHaveAttribute('data-status','error');
 await expect(page.locator('[data-three-diagnostic]')).toContainText(`OperationError: Injected ${boundary} failure`);
 await expect(page.locator('[data-three-progress]')).toHaveAttribute('aria-valuenow','0');
 await page.screenshot({path:`qa-screenshots/usability/startup-error-${boundary}-${test.info().project.name}.png`});
 await page.locator('[data-three-recover]').tap();
 await expect(page.locator('[data-three-loading]')).toHaveCount(0);
 await expect(page.locator('.worldArt')).toBeVisible();
 await page.getByRole('button',{name:'Terug naar menu'}).tap();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});
test('cancelled rejection cannot overwrite a new startup or leave an input shield',async({page})=>{
 await page.goto(`${base}/?dev=editor&level=LVL-0001`);
 await page.evaluate(()=>{
  let count=0;
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:()=>new Promise((resolve,reject)=>{if(++count===1)window.rejectOldAdapter=reject;})}});
 });
 const choose=async mode=>{await page.locator('[data-graphics-action="toggle"]').tap();await page.locator(`[data-renderer-choice="${mode}"]`).tap();};
 await choose('3d');
 await expect(page.locator('[data-three-diagnostic]')).toContainText('WebGPU-adapter aanvragen');
 await choose('illustrated');
 await expect(page.locator('[data-three-loading]')).toHaveCount(0);
 // Illustrated keeps the Graphics panel open.
 await page.locator('[data-renderer-choice="3d"]').tap();
 await page.evaluate(()=>window.rejectOldAdapter(new Error('obsolete adapter')));
 await expect(page.locator('[data-three-diagnostic]')).toContainText('wacht nog steeds',{timeout:7000});
 await expect(page.locator('[data-three-loading]')).toHaveAttribute('data-status','loading');
 await expect(page.locator('[data-three-recover]')).toBeVisible();
 await page.getByRole('button',{name:'Terug naar menu'}).tap();
 await expect(page.locator('[data-three-loading], [data-three-canvas], [data-three-move]')).toHaveCount(0);
 await page.locator('.heroLevelTile').tap();
 await page.getByRole('button',{name:'Start avontuur'}).tap();
 await expect(page.locator('.worldArt')).toBeVisible();
});
test('tap evidence distinguishes an overlay and a cancelling handler',async({page})=>{
 await page.goto(`${base}/?dev=editor&level=LVL-0001&debug3d=1`);
 const menu=page.getByRole('button',{name:'Terug naar menu'}),box=await menu.boundingBox();
 await page.evaluate(()=>{
  const menu=document.querySelector('[data-action="menu"]'),rect=menu.getBoundingClientRect();
  const shield=document.createElement('div');shield.id='test-shield';
  Object.assign(shield.style,{position:'fixed',left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px',zIndex:1000});
  shield.addEventListener('pointerdown',e=>{e.preventDefault();e.stopPropagation();shield.setPointerCapture(e.pointerId);});
  document.body.append(shield);
 });
 await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);
 const diagnostic=page.locator('[data-tap-diagnostics]');
 await expect(diagnostic).toContainText('hit=div#test-shield');
 await expect(diagnostic).toContainText('overlay=JA');
 await expect(diagnostic).toContainText('preventDefault');
 await expect(diagnostic).toContainText('stopPropagation');
 await page.evaluate(()=>document.querySelector('#test-shield').remove());
 await menu.tap();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});
test('Illustrated challenge form remains touch editable and submits normally',async({page})=>{
 await page.goto(`${base}/?dev=editor&level=LVL-0001`);
 await expect(page.locator('[data-world-stage]')).toBeVisible();
 // Deterministic challenge fixture; focus, text editing, submit and feedback use real UI.
 const answer=await page.evaluate(()=>{
  window.eval('openRuneChallenge')("zon");
  const questions=window.eval('currentChallengeQuestions')();questions[0].answerMode='open';window.eval('render')();
  return String(window.eval('answerFor')(questions[0]));
 });
 await expect(page.getByRole('dialog')).toBeVisible();
 const input=page.locator('[data-open-answer]');await input.tap();await expect(input).toBeFocused();
 await input.fill(answer);await expect(input).toHaveValue(answer);
 await page.getByRole('button',{name:'Controleer'}).tap();
 await expect(page.locator('[data-action="next-question"]')).toBeVisible();
 await page.locator('[data-action="next-question"]').tap();
 await expect(page.getByRole('dialog')).toBeVisible();
});
test('synchronous cleanup and status errors cannot strand the initial loader',async({page})=>{
 await page.goto(base);
 const evidence=await page.evaluate(async()=>{
  document.querySelector('#app').innerHTML='<div class="gameShell"><canvas data-three-canvas></canvas><div data-three-loading><h2 data-three-loading-title></h2><p data-three-diagnostic>WebGPU controleren…</p><button data-three-recover hidden>Terug</button></div></div>';
  let cleaned=false;
  const runtime=window.AtlasThreeRenderer.createRuntime({
   getRenderer:()=> '3d',getLevel:()=>({id:'LVL-0001'}),
   onStatus:snapshot=>{if(snapshot.status==='idle'&&!snapshot.diagnostic){cleaned=true;throw new TypeError('Injected cleanup status failure');}if(snapshot.status==='error')throw new Error('Injected error display failure');}
  });
  await runtime.sync();
  return {cleaned,status:runtime.snapshot().status};
 });
 expect(evidence).toEqual({cleaned:true,status:'error'});
 await expect(page.locator('[data-three-diagnostic]')).toContainText('TypeError: Injected cleanup status failure');
 await expect(page.locator('[data-three-loading]')).toBeVisible();
 await expect(page.locator('[data-three-recover]')).toBeVisible();
});
