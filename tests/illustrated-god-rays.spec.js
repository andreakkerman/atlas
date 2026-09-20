const {test,expect}=require('@playwright/test');
const path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
async function scene(page,id='LVL-0001',editor=false){
  await page.route('**/__dev/levels/*/editor-draft',route=>route.fulfill({json:{}}));
  await page.goto(base+(editor?'/?dev=editor':'/'));
  await page.evaluate(async id=>{
    await window.eval('selectLevel')(id,{startImmediately:true,recordStart:false});
    window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});
    window.eval('render')();
  },id);
}
async function openEditor(page){
  await page.keyboard.press('Control+Shift+D');
  await page.locator('[data-editor-mode="graphics"]').click();
}
async function pixels(page){
  return page.evaluate(()=>{
    const now=performance.now;
    performance.now=()=>1000;
    try {
      window.eval('sceneEffectRuntime').restart();
      const canvas=document.querySelector('[data-scene-effects-canvas="worldLight"]');
      return canvas.toDataURL();
    } finally {performance.now=now;}
  });
}
async function dragSource(page){
  await page.locator('[data-debug-action="edit-effect-geometry"]').click();
  const handle=page.locator('[data-effect-geometry-surface="workspace"] [data-effect-handle="move"]');
  await expect(handle).toBeVisible();
  const box=await handle.boundingBox();
  await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
  await page.mouse.down();
  await page.mouse.move(box.x+box.width/2-45,box.y+box.height/2-25,{steps:5});
  await page.mouse.up();
  await page.locator('[data-debug-action="done-effect-geometry"]').click();
}
test('LVL-0001 keeps its authored classic rays and ignores Cinematic ray settings',async({page},info)=>{
  await scene(page);
  const sun=await page.evaluate(()=>window.eval('level').sceneEffects.find(e=>e.presetId==='sun-presence'));
  expect(sun).toMatchObject({id:'sun-presence-07',variantId:'golden-hour-sun',seed:2011289740,layerSlot:'worldLight',geometry:{type:'pointRadius',x:163,y:199,radius:134},overrides:{rayEndAngle:98}});
  const before=await pixels(page);
  await page.evaluate(()=>{
    const resolver=window.eval('worldResolver');
    const settings=window.AtlasCinematicSettings.normalize(resolver.levelSettings('LVL-0001').cinematicLighting);
    settings.godRays={enabled:true,items:[window.AtlasCinematicSettings.instance('godRays',{x:500,y:200,intensity:5})]};
    resolver.updateLevelSettings('LVL-0001',{cinematicLighting:settings});
  });
  expect(await pixels(page)).toBe(before);
  await page.screenshot({path:info.outputPath('lvl0001-classic-rays.png')});
  await page.evaluate(()=>{window.eval('level').sceneEffects.find(e=>e.presetId==='sun-presence').enabled=false;});
  expect(await pixels(page)).not.toBe(before);
});

test('classic God Rays use generic add, drag, radius, Apply, reload, reselect and delete',async({page},info)=>{
  const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await scene(page,'LVL-0032',true);
  await openEditor(page);
  const card=page.locator('[data-effect-preset-card="sun-presence"]');
  await expect(card).toContainText('God Rays (Sun Presence)');
  await card.locator('select').selectOption('golden-hour-sun');
  await card.getByRole('button',{name:'Add effect',exact:true}).click();
  const original=await page.evaluate(()=>window.eval('selectedSceneEffect')());
  expect(original).toMatchObject({presetId:'sun-presence',variantId:'golden-hour-sun',geometry:{type:'pointRadius'}});
  await expect(page.locator('[data-effect-property-panel]')).toBeVisible();
  const before=await pixels(page);
  await dragSource(page);
  const moved=await page.evaluate(()=>window.eval('selectedSceneEffect')());
  expect(moved.geometry.x).not.toBe(original.geometry.x);
  expect(moved.geometry.y).not.toBe(original.geometry.y);
  expect(await pixels(page)).not.toBe(before);
  await page.locator('[data-debug-action="edit-effect-geometry"]').click();
  await page.locator('[data-effect-coordinate="radius"]').fill('134');
  await page.locator('[data-effect-coordinate="radius"]').dispatchEvent('change');
  await page.locator('[data-debug-action="done-effect-geometry"]').click();
  const saved=await page.evaluate(()=>window.eval('selectedSceneEffect')());
  await page.locator('[data-debug-action="apply-walkpath"]').click();
  await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');
  await scene(page,'LVL-0032');
  expect(await page.evaluate(id=>window.eval('level').sceneEffects.find(e=>e.id===id),saved.id)).toEqual(saved);
  expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').resolved.some(e=>e.preset.renderer==='sunPresence'))).toBe(true);
  await page.screenshot({path:info.outputPath('classic-runtime.png')});
  await scene(page,'LVL-0032',true);
  await openEditor(page);
  await page.locator(`[data-select-effect="${saved.id}"]`).click();
  await dragSource(page);
  expect(await page.evaluate(()=>window.eval('selectedSceneEffect')().geometry)).not.toEqual(saved.geometry);
  await page.locator('[data-debug-action="delete-effect"]').click();
  expect(await page.evaluate(id=>window.eval('level').sceneEffects.some(e=>e.id===id),saved.id)).toBe(false);
  expect(errors).toEqual([]);
});

test('GPU mode round trip keeps classic and Cinematic rays separate',async({page},info)=>{
  test.skip(process.env.ATLAS_WEBGPU_QA!=='1'||info.project.name!=='desktop-chromium','Real WebGPU desktop check');
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  page.on('console',message=>{if(message.type()==='error')errors.push(message.text());});
  await scene(page);
  const initial=await pixels(page);
  const canvases=await page.locator('[data-scene-effects-canvas]').count();
  for(let i=0;i<3;i++){
    await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'cinematic'});window.eval('render')();});
    await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status)).toBe('ready');
    expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').resolved.some(e=>e.preset.renderer==='sunPresence'))).toBe(false);
    await expect(page.locator('[data-cinematic-canvas]')).toHaveCount(1);
    await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();});
    await expect(page.locator('[data-cinematic-canvas]')).toHaveCount(0);
    expect(await pixels(page)).toBe(initial);
    expect(await page.locator('[data-scene-effects-canvas]').count()).toBe(canvases);
  }
  expect(errors).toEqual([]);
});
