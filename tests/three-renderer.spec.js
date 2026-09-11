// @ts-check
const {test,expect}=require('@playwright/test');
test.describe('Atlas first-person LVL-0001',()=>{
 test.skip(!process.env.ATLAS_EDITOR_URL,'Requires the local HTTP asset server.');
 test.beforeEach(async({page})=>{
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(`${process.env.ATLAS_EDITOR_URL}/?dev=editor&level=LVL-0001`);
  await page.waitForFunction(()=>window.eval('state.screen')==='scene');
 });
 async function enable(page,mode='3d'){
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator(`[data-renderer-choice="${mode}"]`).click();
  await expect(page.locator('[data-three-loading]')).toBeVisible();
  await expect(page.locator('[data-three-canvas]')).toBeHidden();
  await expect(page.locator('[data-graphics-settings]')).toHaveCount(0);
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:120000}).toBe('ready');
  await expect(page.locator('[data-three-loading]')).toBeHidden();
  await expect(page.locator('[data-three-canvas]')).toBeVisible();
  await expect(page.locator('[data-tap-diagnostics]')).toHaveCount(0);
  await page.screenshot({path:'qa-screenshots/usability/desktop-ready.png'});
  const readiness=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());
  expect(readiness.warmupViews).toBe(readiness.warmupTotal);
  expect(readiness.warmupTotal).toBeGreaterThan(1);
  expect(readiness.preparationCompleted).toBe(readiness.preparationTotal);
  expect(readiness.preparationMs).toBeGreaterThan(0);
  await expect(page.locator('[data-three-performance]')).toBeVisible();
  await expect(page.locator('[data-three-performance]')).toContainText('CPU');
  await expect(page.locator('[data-three-performance]')).toContainText(`Voorbereiding ${(readiness.preparationMs/1000).toFixed(1)} s`);
  expect(await page.locator('[data-three-performance]').evaluate(el=>({pointer:getComputedStyle(el).pointerEvents,tab:el.tabIndex}))).toEqual({pointer:'none',tab:-1});
 }
 test('advances loading segments only at real preparation milestones',async({page})=>{
  test.setTimeout(180000);
  let releaseModel;
  const modelGate=new Promise(resolve=>{releaseModel=resolve;});
  await page.route('**/3d/real-3d.glb',async route=>{await modelGate;await route.continue();});
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-renderer-choice="3d"]').click();
  const progress=page.locator('[data-three-progress]');
  try{
   await expect(progress).toHaveAttribute('aria-valuenow','1');
   await expect(page.locator('[data-three-preparation]')).toHaveText('Wereld en modellen laden…');
   await page.waitForTimeout(300);
   await expect(progress).toHaveAttribute('aria-valuenow','1');
   await expect(progress.locator('[data-state="complete"]')).toHaveCount(1);
   await expect(page.locator('[data-three-canvas]')).toBeHidden();
   await page.evaluate(()=>{
    window.__loadingMilestones=[];window.__prematureReveal=false;
    const progress=document.querySelector('[data-three-progress]');
    new MutationObserver(()=>{
     const completed=Number(progress.getAttribute('aria-valuenow'));
     if(window.__loadingMilestones.at(-1)!==completed)window.__loadingMilestones.push(completed);
     if(completed<5&&getComputedStyle(document.querySelector('[data-three-canvas]')).visibility==='visible')window.__prematureReveal=true;
    }).observe(progress,{attributes:true,attributeFilter:['aria-valuenow']});
   });
  }finally{releaseModel();}
  await expect(progress).toHaveAttribute('aria-valuenow','2',{timeout:120000});
  await page.screenshot({path:'qa-screenshots/usability/loading-materials.jpg',quality:90});
  await expect(progress).toHaveAttribute('aria-valuenow','3',{timeout:120000});
  await expect(page.locator('[data-three-progress-detail]')).toContainText('van 18 beelden voorbereid');
  await page.screenshot({path:'qa-screenshots/usability/loading-warmup.jpg',quality:90});
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().ready),{timeout:120000}).toBe(true);
  await expect(progress).toHaveAttribute('aria-valuenow','5');
  await expect(page.locator('[data-three-loading]')).toBeHidden();
  const evidence=await page.evaluate(()=>({milestones:window.__loadingMilestones,premature:window.__prematureReveal}));
  expect(evidence).toEqual({milestones:[1,2,3,4,5],premature:false});
  await page.keyboard.down('w');await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(175);await page.keyboard.up('w');
 });
 test('keeps iPad Atlas navigation outside 3D handlers',async({browser})=>{
  const context=await browser.newContext({hasTouch:true,viewport:{width:1024,height:768},deviceScaleFactor:1});
  const page=await context.newPage();
  const tap=async locator=>{await expect(locator).toBeVisible();const box=await locator.boundingBox();await page.touchscreen.tap(box.x+box.width/2,box.y+box.height/2);};
  try{
   await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
   await page.goto(process.env.ATLAS_EDITOR_URL);await page.evaluate(()=>localStorage.clear());await page.reload();
   await tap(page.getByRole('button',{name:'Start avontuur'}));
   await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
   await tap(page.locator('.heroLevelTile'));
   await expect(page.getByRole('heading',{name:'De Runenpoort'})).toBeVisible();
   await tap(page.getByRole('button',{name:'Terug'}));
   await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
   await tap(page.locator('[data-menu-tile="LVL-0004"]'));
   await expect(page.locator('.introScreen')).toBeVisible();
   await tap(page.getByRole('button',{name:'Terug'}));
   await tap(page.locator('.heroLevelTile'));
   await tap(page.getByRole('button',{name:'Start avontuur'}));
   await expect(page.locator('[data-world-stage]')).toBeVisible();
   await tap(page.locator('[data-graphics-action="toggle"]'));
   await expect(page.locator('[data-graphics-settings]')).toBeVisible();
   await tap(page.getByRole('button',{name:'Sluiten'}));
   await tap(page.getByRole('button',{name:'Terug naar menu'}));
   await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
  }finally{await context.close();}
 });
 test('reports a waiting adapter and lets iPad leave the loader',async({browser})=>{
  const context=await browser.newContext({hasTouch:true,viewport:{width:1024,height:768},deviceScaleFactor:1});
  const page=await context.newPage();
  try{
   await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
   await page.goto(`${process.env.ATLAS_EDITOR_URL}/?dev=editor&level=LVL-0001`);
   await page.waitForFunction(()=>window.eval('state.screen')==='scene');
   await page.evaluate(()=>Object.defineProperty(navigator.gpu,'requestAdapter',{configurable:true,value:()=>new Promise(()=>{})}));
   await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
   await expect(page.locator('[data-three-preparation]')).toHaveText('3D-engine starten…');
   await expect(page.locator('[data-three-diagnostic]')).toContainText('WebGPU-adapter aanvragen (navigator.gpu: ja) — wacht nog steeds',{timeout:7000});
   await expect(page.locator('[data-three-progress]')).toHaveAttribute('aria-valuenow','0');
   await page.getByRole('button',{name:'Terug naar menu'}).click();
   await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
  }finally{await context.close();}
 });
 test('surfaces engine startup failure with Illustrated recovery',async({page})=>{
  await page.evaluate(()=>Object.defineProperty(navigator.gpu,'requestAdapter',{configurable:true,value:async()=>null}));
  await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="3d"]').click();
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('error');
  await expect(page.locator('[data-three-loading]')).toBeVisible();
  await expect(page.locator('[data-three-loading-title]')).toHaveText('3D kon niet worden gestart');
  await expect(page.locator('[data-three-diagnostic]')).toContainText('NotSupportedError');
  await page.locator('[data-three-recover]').click();
  await expect(page.locator('[data-three-canvas]')).toHaveCount(0);await expect(page.locator('.worldArt')).toBeVisible();
  expect(await page.evaluate(()=>window.eval('voxelRenderer.getSettings')().renderer)).toBe('illustrated');
 });
 test('walks the route, looks around, completes three challenges and unlocks the gate',async({page})=>{
  test.setTimeout(240000);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await enable(page);
  expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().backend)).toBe('WebGPU');
  // No forced canvas focus or artificial post-readiness warm-up.
  await page.keyboard.down('w');
  await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(180);
  await page.keyboard.up('w');
  await expect(page.locator('.threeDesktopHint')).toBeVisible();
  await expect(page.locator('.threeTouchHint')).toBeHidden();
  const hudText=await page.locator('[data-three-performance]').textContent();
  await expect.poll(()=>page.locator('[data-three-performance]').textContent()).not.toBe(hudText);
  await page.keyboard.down('s');await page.waitForTimeout(700);await page.keyboard.up('s');
  expect(await page.evaluate(()=>window.eval('state.worldX'))).toBe(175);
  await page.evaluate(()=>{window.__threeCanvas=document.querySelector('[data-three-canvas]');});
  const yaw=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().yaw);
  await page.mouse.move(700,300);await page.mouse.down();await page.mouse.move(860,355,{steps:8});await page.mouse.up();
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().yaw)).toBeLessThan(yaw-.2);
  await page.keyboard.down('a');await page.waitForTimeout(200);await page.keyboard.up('a');
  async function walkTo(x){
   await expect.poll(()=>page.evaluate(()=>window.eval('state.moving')),{timeout:15000}).toBe(false);
   await page.keyboard.down('w');
   await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX')),{timeout:40000}).toBeGreaterThanOrEqual(x);
   await page.keyboard.up('w');
  }
  async function aim(id){
   await page.evaluate(async id=>{
    const data=await fetch('Levels/LVL-0001/3d/route.json').then(r=>r.json());
    const p=window.eval('threeRenderer.snapshot')().camera,t=data.landmarks[id],dx=t[0]-p[0],dy=t[1]-p[1],dz=t[2]-p[2];
    window.eval('threeRenderer.lookAt')(Math.atan2(-dx,-dz),Math.atan2(dy,Math.hypot(dx,dz)));
   },id);
   await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().target)).toBe(id);
  }
  await walkTo(320);await aim('forestRune');await page.keyboard.press('e');
  for(const [id,x]of [['zon',1322],['steen',1454],['wind',1697]]){
   await walkTo(x);await aim(id);await page.keyboard.press('e');
   await expect.poll(()=>page.evaluate(()=>window.eval('state.screen')),{timeout:30000}).toBe('challenge');
   while(await page.evaluate(()=>window.eval('state.screen')==='challenge')){
    const answer=await page.evaluate(()=>window.eval('answerFor')(window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]));
    const input=page.locator('[data-open-answer]');
    if(await input.count()){await input.fill(String(answer));await input.press('Enter');}
    else await page.locator(`[data-choice="${answer}"]`).click();
    await page.locator('[data-action="next-question"]').click();
   }
   expect(await page.evaluate(id=>window.eval('state.completedRunes').has(id),id)).toBe(true);
   expect(await page.evaluate(()=>document.querySelector('[data-three-canvas]')===window.__threeCanvas)).toBe(true);
  }
  await walkTo(1847);await aim('templeGate');
  expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(true);
  await page.keyboard.press('e');
  await expect.poll(()=>page.evaluate(()=>window.eval('state.screen')),{timeout:30000}).toBe('reward');
  expect(errors).toEqual([]);
 });
 test('preserves the other graphics modes and unsupported-level fallback',async({page})=>{
  test.setTimeout(300000);
  for(const mode of ['3d','illustrated','voxel','cinematic','3d']){
   await page.evaluate(renderer=>{window.eval('voxelRenderer.updateSettings')({renderer});window.eval('render')();},mode);
   await expect(page.locator('.gameShell')).toHaveAttribute('data-active-renderer',mode);
   if(mode==='3d')await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:120000}).toBe('ready');
   else {await expect(page.locator('[data-three-canvas]')).toHaveCount(0);await expect(page.locator('[data-three-performance]')).toHaveCount(0);expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('idle');}
   if(mode==='voxel'||mode==='cinematic')await expect.poll(()=>page.evaluate(mode=>window.eval(`${mode}Renderer.snapshot`)().status,mode),{timeout:30000}).toBe('ready');
  }
  await page.evaluate(()=>window.eval('selectLevel')('LVL-0002',{startImmediately:true}));
  await expect(page.locator('[data-three-canvas]')).toHaveCount(0);await expect(page.locator('.worldArt')).toBeVisible();
  expect(await page.evaluate(()=>window.eval('voxelRenderer.getSettings')().renderer)).toBe('3d');
 });
 test('cancels preparation and never reveals an unfinished scene',async({page})=>{
  test.setTimeout(180000);
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-renderer-choice="3d"]').click();
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:120000}).toBe('warming');
  await expect(page.locator('[data-three-loading]')).toBeVisible();
  await expect(page.locator('[data-three-canvas]')).toBeHidden();
  await page.keyboard.down('w');await page.waitForTimeout(150);await page.keyboard.up('w');
  expect(await page.evaluate(()=>window.eval('state.worldX'))).toBe(175);
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-renderer-choice="illustrated"]').click();
  await expect(page.locator('[data-three-canvas]')).toHaveCount(0);
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('idle');
  await page.locator('[data-graphics-action="close"]').click();
  await expect(page.locator('.worldArt')).toBeVisible();
 });
 test('supports simultaneous touch walking and looking, interaction and release',async({browser})=>{
  test.setTimeout(180000);
  const context=await browser.newContext({hasTouch:true,viewport:{width:1024,height:768},deviceScaleFactor:1});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{
   await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
   await page.goto(`${process.env.ATLAS_EDITOR_URL}/?dev=editor&level=LVL-0001`);
   await page.waitForFunction(()=>window.eval('state.screen')==='scene');
   await enable(page,'atlas-3d');
   await expect(page.locator('[data-three-move]')).toBeVisible();
   await expect(page.locator('.threeDesktopHint')).toBeHidden();
   await expect(page.locator('.threeTouchHint')).toContainText('Actieknop');
   const duration=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().preparationMs);
   // Deliberate mouse/keyboard use on a hybrid device changes the hints.
   await page.mouse.click(700,320);
   await expect(page.locator('.threeDesktopHint')).toBeVisible();
   await page.touchscreen.tap(700,320);
   await expect(page.locator('.threeTouchHint')).toBeVisible();
   await page.locator('[data-graphics-action="toggle"]').click();
   await expect(page.locator('[data-three-status]')).toContainText('ms CPU');
   await expect(page.locator('[data-three-performance]')).toBeVisible();
   await page.locator('[data-graphics-action="close"]').click();
   await expect(page.locator('.threeTouchHint')).toBeVisible();
   expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().preparationMs)).toBe(duration);
   const gestureScope=await page.evaluate(()=>{
    const cancel=target=>!target.dispatchEvent(new Event('gesturestart',{bubbles:true,cancelable:true}));
    const canvas=document.querySelector('[data-three-canvas]'),pad=document.querySelector('[data-three-move]');
    return {canvas:cancel(canvas),pad:cancel(pad),menu:cancel(document.querySelector('[data-graphics-action="toggle"]')),touchAction:getComputedStyle(canvas).touchAction};
   });
   expect(gestureScope).toEqual({canvas:true,pad:true,menu:false,touchAction:'none'});
   const scroll=await page.evaluate(()=>({x:scrollX,y:scrollY,scale:visualViewport.scale}));
   await page.screenshot({path:'qa-screenshots/usability/touch-landscape.jpg',quality:90});
   const pad=await page.locator('[data-three-move]').boundingBox();
   const client=await context.newCDPSession(page);
   const center={x:pad.x+pad.width/2,y:pad.y+pad.height/2};
   const touch=(type,touchPoints)=>client.send('Input.dispatchTouchEvent',{type,touchPoints});
   const yaw=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().yaw);
   await touch('touchStart',[{id:1,...center},{id:2,x:720,y:320}]);
   await touch('touchMove',[{id:1,x:center.x,y:center.y-40},{id:2,x:830,y:345}]);
   await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(185);
   await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().yaw)).toBeLessThan(yaw-.15);
   await touch('touchEnd',[]);
   expect(await page.evaluate(()=>({x:scrollX,y:scrollY,scale:visualViewport.scale}))).toEqual(scroll);
   const stopped=await page.evaluate(()=>window.eval('state.worldX'));
   await page.waitForTimeout(250);expect(await page.evaluate(()=>window.eval('state.worldX'))).toBe(stopped);
   await touch('touchStart',[{id:1,...center}]);
   await touch('touchMove',[{id:1,x:center.x,y:center.y+40}]);
   await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBe(175);
   await touch('touchCancel',[]);
   // Reach a challenge; desktop test covers the complete route and progression.
   await page.evaluate(async()=>{
    window.eval('state').worldX=1322;window.eval('updateWorldDom')();
    const route=await fetch('Levels/LVL-0001/3d/route.json').then(r=>r.json()),p=route.route.find(p=>p.atlas[0]===1322).position,t=route.landmarks.zon;
    window.eval('threeRenderer.lookAt')(Math.atan2(p[0]-t[0],p[2]-t[2]),Math.atan2(t[1]-p[1]-route.eyeHeight,Math.hypot(t[0]-p[0],t[2]-p[2])));
   });
   await expect(page.locator('[data-three-interact]')).toBeVisible();
   await page.setViewportSize({width:768,height:1024});
   await expect(page.locator('[data-three-move]')).toBeVisible();
   await page.screenshot({path:'qa-screenshots/usability/touch-portrait.jpg',quality:90});
   const action=await page.locator('[data-three-interact]').boundingBox();
   await page.touchscreen.tap(action.x+action.width/2,action.y+action.height/2);
   await expect.poll(()=>page.evaluate(()=>window.eval('state.screen')),{timeout:30000}).toBe('challenge');
   expect(errors).toEqual([]);
  }finally{await context.close();}
 });
 test('reports unavailable WebGPU and leaves Illustrated playable',async({page})=>{
  await page.evaluate(()=>{
   Object.defineProperty(navigator,'gpu',{value:undefined,configurable:true});
   window.eval('voxelRenderer.updateSettings')({renderer:'3d'});window.eval('render')();
  });
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:30000}).toBe('error');
  await expect(page.locator('[data-three-error]')).toBeVisible();
  await expect(page.locator('[data-three-loading]')).toBeVisible();
  await expect(page.locator('.worldArt')).toBeHidden();
  await page.locator('[data-three-recover]').click();
  await expect(page.locator('.worldArt')).toBeVisible();
  expect(await page.evaluate(()=>window.eval('voxelRenderer.getSettings')().renderer)).toBe('illustrated');
 });
});
