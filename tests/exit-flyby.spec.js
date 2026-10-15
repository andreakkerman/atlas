const {test,expect}=require('@playwright/test');
const {bootEditorTest,selectSceneItem}=require('./editor-workspace-helpers');
const fs=require('fs'),path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const id='ballistic-gondola';
const sprite='assets/ambient/exit/gondola/gondola.png';
test.beforeEach(async({page},info)=>{
  info.exitRuntimeErrors=[];page.on('pageerror',e=>info.exitRuntimeErrors.push(e.message));
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>{
    localStorage.setItem('atlas.learning.m6Percentage','0');
    window.gondolaAudio=[];
    const play=HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play=function(){if(this.src.includes('/exit/gondola/'))window.gondolaAudio.push(this);return play.call(this);};
  });
});
test.afterEach(async({},info)=>expect(info.exitRuntimeErrors).toEqual([]));
async function enter(page,mode='illustrated'){
  await bootEditorTest(page,base+'/?dev=editor');
  await page.evaluate(async mode=>{
    window.eval('voxelRenderer').updateSettings({renderer:mode});
    await window.eval('selectLevel')('LVL-0039',{startImmediately:true,recordStart:false});
  },mode);
  await expect(page.locator('.worldArt')).toHaveAttribute('data-asset-path','Levels/LVL-0039/fallenemperor.png');
  await expect(page.locator(`[data-ambient-flyby="${id}"]`)).toHaveAttribute('data-active','true');
  await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
}
async function freeze(page){await page.clock.install();await page.clock.pauseAt(await page.evaluate(()=>new Date(Date.now()+100).toISOString()));}
async function snapshot(page){return page.evaluate(id=>{
  const r=window.eval('ambientFlybyRuntime'),i=r.active.get(id),s=window.eval('state');
  const shell=document.querySelector(`[data-ambient-flyby="${id}"]`);
  return {screen:s.screen,phase:s.exitFlybyPhase,idle:i?.idle,distance:i?.distance,elapsed:i?.elapsed,transform:shell?.style.transform,
    active:shell?.dataset.active,fx:shell?.querySelectorAll('[data-flyby-fx-canvas]').length||0,
    audio:[...r.activeAudio.values()].filter(a=>a.ownerId===id).length,plays:window.gondolaAudio.length,
    pending:!!s.exitTransitionPending,playerGone:!!s.exitPlayerGone,saved:localStorage.getItem(window.eval('level.storageKey'))};
},id);}
async function atExit(page){await page.evaluate(()=>{
  const s=window.eval('state'),l=window.eval('level'),exit=l.interactiveObjects.find(o=>o.id===l.exitHotspotId),p=l.walkGraph.nodes.find(n=>n.id===exit.approachNode);
  s.worldX=p.x;s.worldY=p.y;s.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();
});}
async function activate(page){const exit=page.locator('[data-exit-hotspot="true"]');if(test.info().project.use.hasTouch)await exit.tap();else await exit.click();}
async function solve(page,rune){
  await page.evaluate(id=>window.eval('finishInteraction')(window.eval('runeById')(id),'rune','activate'),rune);
  for(let i=0;i<4;i++){
    const q=await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
    if(q.answerMode==='open'){await page.locator('[data-open-answer]').fill(String(q.answer));await page.getByRole('button',{name:'Controleer',exact:true}).click();}
    else await page.locator(`[data-choice="${q.answer}"]`).click();
    await page.locator('[data-action="next-question"]').click();
  }
}
async function unlockForLifecycle(page){await page.evaluate(()=>{for(const rune of window.eval('activeRunes')())window.eval('state.completedRunes').add(rune.id);window.eval('render')();});await atExit(page);}
async function untilDelay(page){
  for(let n=0;n<100;n++){if((await snapshot(page)).phase==='delay')return;await page.clock.runFor(100);}
  throw new Error('Flight did not finish within its authored path duration');
}

test('three earned challenges unlock the click-only launch, then an empty snowy scene precedes one completion',async({page},info)=>{
  test.setTimeout(120000); // Twelve answers through the ordinary challenge controls.
  await enter(page);
  const initial=await snapshot(page);
  expect(initial).toMatchObject({idle:true,distance:0,elapsed:0,fx:0,audio:0,plays:0,pending:false,saved:null});
  for(const rune of ['machineryFragment','controlCabinets','signalMast']){
    await solve(page,rune);
    expect(await snapshot(page)).toMatchObject({idle:true,distance:0,elapsed:0,fx:0,audio:0,pending:false,saved:null});
  }
  await expect(page.locator('[data-exit-hotspot="true"]')).toHaveAttribute('data-exit-ready','true');
  await atExit(page);await page.screenshot({path:info.outputPath('gondola-idle.png')});
  await freeze(page);
  const environment=await page.evaluate(()=>({particles:window.eval('cinematicRenderer').snapshot().particles,music:window.eval('audioState.music')?.src}));
  await page.evaluate(()=>{window.completions=0;const save=window.eval('saveCompletion');window.eval('saveCompletion = function(){ window.completions++; window.originalExitSave(); }');window.originalExitSave=save;});
  await activate(page);
  await page.clock.runFor(100);
  expect(await snapshot(page)).toMatchObject({phase:'boarding',idle:true,fx:0,audio:0,pending:true,saved:null});
  await page.evaluate(()=>{window.eval('beginFreeWalk')({x:100,y:500});window.eval('beginInteraction')(window.eval('level.runes')[0],'rune');window.eval('openRuneChallenge')(window.eval('level.runes')[0].id);window.eval('transitionToReward')(window.eval('hotspotById')(window.eval('level.exitHotspotId')));});
  expect(await page.evaluate(()=>window.eval('state.movementIntent'))).toBeNull();
  await page.clock.runFor(450);
  const ignition=await snapshot(page);
  expect(ignition).toMatchObject({phase:'launch',distance:0,fx:1,audio:1,plays:1,playerGone:true,saved:null});
  expect(ignition.transform).toBe((await page.evaluate(()=>window.initialTransform))||initial.transform);
  await page.clock.runFor(900);
  expect((await snapshot(page)).distance).toBeGreaterThan(0);
  await page.screenshot({path:info.outputPath('gondola-launch.png')});
  const beforeFrames=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame);
  await untilDelay(page);
  expect(await snapshot(page)).toMatchObject({screen:'scene',phase:'delay',active:'false',fx:0,audio:0,plays:1,playerGone:true,saved:null});
  await expect(page.locator('[data-actor-shell="sven"]')).toBeHidden();
  expect(await page.evaluate(()=>window.gondolaAudio.every(a=>a.paused))).toBe(true);
  expect(await page.evaluate(()=>document.querySelector('[data-ambient-flyby="ballistic-gondola"]').getBoundingClientRect().bottom<=document.querySelector('[data-world-stage]').getBoundingClientRect().top)).toBe(true);
  expect(await page.evaluate(()=>({particles:window.eval('cinematicRenderer').snapshot().particles,music:window.eval('audioState.music')?.src}))).toEqual(environment);
  if(info.project.name==='desktop-chromium')expect(environment.particles).toBeGreaterThan(0);
  await page.screenshot({path:info.outputPath('empty-scene.png')});
  await page.clock.runFor(2300);
  expect(await snapshot(page)).toMatchObject({screen:'scene',phase:'delay',saved:null});
  if(info.project.name==='desktop-chromium')expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame)).toBeGreaterThan(beforeFrames);
  await expect(page.locator('.exitIrisOverlay,.exitReducedFadeOut,[data-gpu-preparation]')).toHaveCount(0);
  await page.clock.runFor(300);
  expect((await snapshot(page)).phase).toBe('transition');
  await page.clock.runFor(800);
  expect(await snapshot(page)).toMatchObject({screen:'reward'});
  expect(await page.evaluate(()=>window.completions)).toBe(1);
  const saved=JSON.parse((await snapshot(page)).saved);expect(saved.completedRuneIds).toHaveLength(3);expect(saved.answered).toBe(12);
  await page.clock.runFor(5000);expect(await page.evaluate(()=>window.completions)).toBe(1);
});

test('existing preview returns to the stationary first waypoint without progress or exit effects',async({page},info)=>{
  test.skip(info.project.name!=='desktop-chromium','The authoring workspace is desktop-only.');
  await enter(page);await selectSceneItem(page,'flyby',id);
  await expect(page.locator('[data-flyby-setting="activation"]')).toHaveValue('exit');
  const delay=page.locator('[data-flyby-setting="postExitDelay"][type="number"]');expect(Number(await delay.inputValue())).toBe(2.5);
  await delay.fill('3');await delay.press('Tab');
  expect(await page.evaluate(()=>window.eval('level.ambientFlybys')[0].postExitDelay)).toBe(3);
  await freeze(page);
  const before=await snapshot(page);await page.locator('[data-debug-action="preview-flyby"]').first().click();
  await page.clock.runFor(350);expect(await snapshot(page)).toMatchObject({distance:0,fx:1,pending:false});
  await page.locator('[data-debug-action="preview-flyby"]').first().click();
  const paused=await snapshot(page);await page.clock.runFor(1000);expect((await snapshot(page)).elapsed).toBe(paused.elapsed);
  await page.locator('[data-debug-action="preview-flyby"]').first().click();await page.clock.runFor(7000);
  expect(await snapshot(page)).toMatchObject({idle:true,distance:0,fx:0,audio:0,pending:false,saved:null,transform:before.transform});
  await page.locator('[data-debug-action="preview-flyby"]').first().click();await page.clock.runFor(1500);
  await page.locator('[data-debug-action="stop-preview-flyby"]').first().click();
  expect(await snapshot(page)).toMatchObject({idle:true,distance:0,fx:0,audio:0,saved:null});
});

test('Cinematic uses the shared player fade and removes player/shadow during departure',async({page},info)=>{
  test.skip(info.project.name!=='desktop-chromium','Requires the real Chromium WebGPU compositor.');
  await page.emulateMedia({reducedMotion:'no-preference'});await enter(page,'cinematic');
  await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);await unlockForLifecycle(page);
  await page.evaluate(()=>{window.exitOpacities=[];const style=window.getComputedStyle;window.getComputedStyle=function(element,...args){const result=style.call(this,element,...args);if(element.matches?.('[data-actor-shell="sven"]')&&window.eval('state.exitTransitionPending'))window.exitOpacities.push(Number(result.opacity));return result;};});
  await activate(page);await expect(page.locator('[data-actor-shell="sven"]')).toHaveClass(/exitPlayerGone/);
  expect(await page.evaluate(()=>window.exitOpacities.some(v=>v>0&&v<1))).toBe(true);
  await expect.poll(()=>page.evaluate(()=>window.eval('state.exitFlybyPhase'))).toBe('delay');
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().grounding.some(g=>g.key==='actor:sven'))).toBe(false);
  await expect(page.locator('[data-actor-shell="sven"]')).toBeHidden();
  await page.evaluate(()=>window.eval('returnToMenu')());
});

for(const operation of ['restart','navigation'])for(const phase of ['boarding','launch','delay'])test(`${operation} cancels the ${phase} sequence`,async({page})=>{
  await enter(page);await unlockForLifecycle(page);await freeze(page);await activate(page);
  if(phase==='launch')await page.clock.runFor(1400);if(phase==='delay')await untilDelay(page);
  expect((await snapshot(page)).phase).toBe(phase);
  if(operation==='restart'){
    await page.evaluate(()=>{window.eval('restart')();window.eval('state.screen = "scene"');window.eval('render')();});
    await page.clock.fastForward(12000);
    expect(await snapshot(page)).toMatchObject({screen:'scene',idle:true,distance:0,fx:0,audio:0,pending:false,playerGone:false,saved:null});
    await expect(page.locator('[data-actor-shell="sven"]')).toBeVisible();
  }else{
    await page.evaluate(()=>window.eval('returnToMenu')());await page.clock.fastForward(12000);
    expect(await page.evaluate(()=>({screen:window.eval('state.screen'),active:window.eval('ambientFlybyRuntime').active.size,audio:window.eval('ambientFlybyRuntime').activeAudio.size}))).toEqual({screen:'menu',active:0,audio:0});
  }
});

for(const failure of ['sprite','audio','animation','cancel'])test(`${failure} failure cannot strand exit completion`,async({page})=>{
  if(failure==='sprite'||failure==='audio')await page.route(`**/exit/gondola/gondola.${failure==='sprite'?'png':'mp3'}`,r=>r.fulfill({status:404,body:'missing test asset'}));
  if(failure==='sprite'){
    await bootEditorTest(page,base+'/?dev=editor');await page.evaluate(()=>window.eval('selectLevel')('LVL-0039',{startImmediately:true,recordStart:false}));
    await expect(page.locator('.worldArt')).toBeVisible();
  }else await enter(page);
  await unlockForLifecycle(page);await freeze(page);await activate(page);await page.clock.runFor(600);
  if(failure==='animation')await page.evaluate(()=>{const i=window.eval('ambientFlybyRuntime').active.get('ballistic-gondola');i.fx.draw=()=>{throw Error('Injected exit FX rendering failure');};});
  if(failure==='cancel')await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());
  await untilDelay(page);await page.clock.runFor(2500);await page.clock.runFor(1000);expect(await page.evaluate(()=>window.eval('state.screen'))).toBe('reward');
  expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
});

test('exit assets are discoverable and activation/delay serialize through ordinary draft and Apply',async({request})=>{
  const assets=await (await request.get(base+'/__dev/flyby-assets')).json();
  expect(assets.assets.find(a=>a.key==='exit/gondola').frameA).toBe(sprite);
  const fx=await (await request.get(base+'/__dev/flyby-fx?asset=exit/gondola')).json();expect(fx.document.effects).toHaveLength(2);
  const vm=require('vm'),ctx={window:{}};vm.runInNewContext(fs.readFileSync('Levels/LVL-0039/level.js','utf8'),ctx);
  const flybys=JSON.parse(JSON.stringify(ctx.window.SVEN_LEVEL_DEFINITIONS['LVL-0039'].ambientFlybys));flybys[0].postExitDelay=4;
  for(const invalid of [{activation:'click'},{postExitDelay:10.5},{postExitDelay:-1}]){
    const response=await request.post(base+'/__dev/levels/LVL-0000/editor-draft',{data:{ambientFlybys:[{...flybys[0],...invalid}]}});expect(response.ok()).toBe(false);
  }
  const response=await request.post(base+'/__dev/levels/LVL-0000/apply-editor',{data:{ambientFlybys:flybys}});expect(response.ok()).toBe(true);
  const saved=await (await request.get(base+'/__dev/levels/LVL-0000/saved-editor')).json();
  expect(saved.level.ambientFlybys[0]).toMatchObject({activation:'exit',postExitDelay:4,frameA:sprite,startDelayMs:600});
});
