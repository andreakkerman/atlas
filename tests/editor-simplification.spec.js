const {test,expect}=require('@playwright/test');
const {selectSceneItem,selectSystem,chooseCreation}=require('./editor-workspace-helpers');
require('./editor-draft-fixture').preserveEditorDrafts(test,require('path').join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
async function open(page,id='LVL-0034') {
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(base+'/?dev=editor&level='+id);
  await page.waitForFunction(id=>window.eval('state.screen')==='scene'&&window.eval('level.id')===id,id);
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
  await page.keyboard.press('Control+Shift+D');
}
test('playable character edits directly with shared controls and explicitly shared locomotion',async({page})=>{
  await open(page);await selectSceneItem(page,'player','player');
  await expect(page.getByRole('button',{name:'Configure in Level settings',exact:true})).toHaveCount(0);
  await expect(page.locator('[data-main-character]')).toHaveCount(1);
  await expect(page.locator('[data-main-character]')).toHaveValue('sven_arc');
  await expect(page.locator('[data-editor-panel-key="sven-locomotion"]')).toContainText('across all levels');
  const before=await page.evaluate(()=>JSON.stringify(window.eval('worldResolver').getConfig().characterLocomotion));
  await page.locator('[data-level-setting="spriteScale"]').fill('1.15');
  expect(await page.evaluate(()=>window.eval('levelTuning')(window.eval('level.id')).spriteScale)).toBe(1.15);
  expect(await page.evaluate(()=>JSON.stringify(window.eval('worldResolver').getConfig().characterLocomotion))).toBe(before);
  await selectSceneItem(page,'level','level');await expect(page.locator('[data-level-setting="spriteScale"]')).toHaveValue('1.15');
  await selectSceneItem(page,'player','player');await expect(page.locator('[data-level-setting="spriteScale"]')).toHaveCount(1);await expect(page.locator('[data-level-setting="spriteScale"]')).toHaveValue('1.15');
});
test('one compact family picker retains every supported definition and variant',async({page})=>{
  await open(page);await page.locator('[data-workspace-action="add"]').click();
  const expected=await page.evaluate(()=>[
    ...Object.values(window.AtlasSceneEffects.PRESETS).filter(p=>!p.hiddenFromLibrary).map(p=>'effect:'+p.id),
    ...Object.entries(window.AtlasCinematicSettings.systems).filter(([,d])=>d.type).map(([k])=>'cinematic:'+k),
    ...['animal','flyby'].flatMap(k=>[...window.eval('discoveredAssetSets')(k).map(s=>k+':'+s.key),k+':manual'])
  ].sort());
  expect(await page.locator('[data-add-family] option').evaluateAll(nodes=>nodes.map(n=>n.value).sort())).toEqual(expected);
  await chooseCreation(page,'cinematic:localLights');
  expect(await page.locator('[data-add-variant] option').allTextContents()).toEqual(['Default','Steady','Fire','Arcane','Beacon']);
  await page.locator('[data-add-variant]').selectOption('Fire');
  await page.locator('[data-cinematic-action="add"]').click();
  const item=await page.evaluate(()=>{const s=window.eval('editorWorkspace.selection');return window.eval('worldResolver').levelSettings(window.eval('level.id')).cinematicLighting[s.system].items.find(i=>i.id===s.id);});
  expect(item).toMatchObject(require('../src/cinematic-settings').presets.localLights.Fire);
  await chooseCreation(page,'cinematic:particles');await page.locator('[data-editor-add-search]').fill('snow');
  await expect(page.locator('[data-add-variant]')).toHaveValue('Snow');
  expect(await page.locator('[data-add-family] option').evaluateAll(nodes=>nodes.map(n=>n.value))).toEqual(['cinematic:particles']);
  await page.screenshot({path:'qa-screenshots/editor-simplification/add-snow.png'});
  await page.locator('[data-cinematic-action="add"]').click();
  const snow=await page.evaluate(()=>{const s=window.eval('editorWorkspace.selection');return window.eval('worldResolver').levelSettings(window.eval('level.id')).cinematicLighting.particles.items.find(i=>i.id===s.id);});
  expect(snow).toMatchObject(require('../src/cinematic-settings').presets.particles.Snow);
  await chooseCreation(page,'cinematic:particles');await page.locator('[data-add-variant]').selectOption('Embers');
  await page.locator('[data-cinematic-action="add"]').click();
  const embers=await page.evaluate(()=>{const s=window.eval('editorWorkspace.selection');return window.eval('worldResolver').levelSettings(window.eval('level.id')).cinematicLighting.particles.items.find(i=>i.id===s.id);});
  expect(embers).toMatchObject(require('../src/cinematic-settings').presets.particles.Embers);
  await expect(page.locator('[data-cinematic-setting="layer"]')).toHaveValue('effects');
});
test('Environment prioritizes active weather and routes individual fields to Scene',async({page})=>{
  await open(page);await selectSceneItem(page,'environment','environment');
  await expect(page.locator('[data-environment-system="particles"]')).toContainText('Active');
  await expect(page.locator('[data-environment-system="autoExposure"]')).toHaveCount(0);
  await expect(page.locator('[data-cinematic-section="depth"][data-cinematic-setting="filterRadius"]')).toBeVisible();
  await expect(page.locator('[data-environment-category], [data-environment-all]')).toHaveCount(0);
  await page.screenshot({path:'qa-screenshots/editor-simplification/environment.png'});
  await page.locator('[data-environment-system="particles"] [data-environment-find]').click();
  await expect(page.locator('[data-editor-search]')).toHaveValue('Particle fields');
  await page.locator('[data-editor-browser] [data-workspace-system="particles"]:visible').first().click();
  await expect(page.locator('[data-cinematic-setting="count"]')).toHaveValue('2400');
  await expect(page.locator('[data-cinematic-system]')).toHaveCount(0);
  await selectSceneItem(page,'environment','environment');await page.locator('[data-environment-participation-panel] > summary').click();
  await expect(page.locator('[data-illustrated-feature="particleFields"]')).toBeChecked();
  await page.locator('[data-illustrated-feature="particleFields"]').uncheck();
  expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings(window.eval('level.id')).illustratedFeatures.particleFields)).toBe(false);
  // The persistent canvas remains mounted; the renderer hides it and releases GPU work.
  await expect(page.locator('[data-particle-fields-canvas]')).toBeHidden();
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status)).toBe('inactive');
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().scheduled)).toBe(false);
  await page.locator('[data-illustrated-feature="particleFields"]').check();
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().effective.particles.enabled)).toBe(true);
  await selectSystem(page,'grading');await page.locator('[data-cinematic-section="grading"][data-cinematic-setting="enabled"]').check();
  expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings(window.eval('level.id')).cinematicLighting.grading.enabled)).toBe(true);
});

test('ambient creation keeps prepared assets, explicit sequence playback and existing defaults',async({page})=>{
  await open(page);
  for(const kind of ['animal','flyby']) {
    const set=await page.evaluate(kind=>window.eval('discoveredAssetSets')(kind).find(s=>kind==='animal'?s.openFrame&&s.closedFrame:s.frames?.length>2),kind);
    expect(set).toBeTruthy();await chooseCreation(page,kind+':'+set.key);
    const form=page.locator('[data-add-'+kind+'-form]');
    const id=await form.locator('[name="id"]').inputValue();
    await expect(form.locator('[name="assetSet"]')).toHaveValue(set.key);
    if(kind==='flyby')await form.locator('[name="playback"]').selectOption('loop');
    await form.locator('[name="label"]').fill('Prepared '+kind);
    await page.evaluate(()=>window.eval('render')());
    await expect(form.locator('[name="id"]')).toHaveValue(id);
    await expect(form.locator('[name="label"]')).toHaveValue('Prepared '+kind);
    await form.getByRole('button',{name:'Add to scene',exact:true}).click();
    await expect.poll(()=>page.evaluate(({kind,id})=>(window.eval('level')[kind==='animal'?'ambientAnimals':'ambientFlybys'] || []).some(i=>i.id===id),{kind,id})).toBe(true);
    const item=await page.evaluate(({kind,id})=>window.eval('level')[kind==='animal'?'ambientAnimals':'ambientFlybys'].find(i=>i.id===id),{kind,id});
    expect(item.scale).toBe(kind==='animal'?.2:.22);
    if(kind==='animal')expect(item).toMatchObject({openFrame:set.openFrame,closedFrame:set.closedFrame});
    else expect(item).toMatchObject({frames:set.frames,playback:'loop'});
    expect(await page.evaluate(()=>window.eval('editorWorkspace.selection').id)).toBe(id);
  }
});


test('inline Environment keeps schema controls, editing context and inactive authoring',async({page})=>{
  await open(page);await selectSceneItem(page,'environment','environment');
  const depth=page.locator('[data-environment-system="depth"]');
  const radius=depth.locator('[data-cinematic-setting="filterRadius"]');
  await expect(radius).toBeVisible();await radius.fill('2.25');
  expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034').cinematicLighting.depth.filterRadius)).toBe(2.25);
  expect(await page.evaluate(()=>window.eval('editorWorkspace.selection'))).toMatchObject({kind:'environment'});
  const panel=page.locator('[data-developer-tools]');await radius.focus();
  const scroll=await panel.evaluate(n=>n.scrollTop);await page.evaluate(()=>window.eval('render')());
  await expect(radius).toBeFocused();expect(await panel.evaluate(n=>n.scrollTop)).toBe(scroll);
  await depth.locator(':scope > summary').click();
  await selectSceneItem(page,'player','player');await expect(page.locator('[data-level-setting="spriteScale"]')).toBeVisible();
  await selectSceneItem(page,'environment','environment');await expect(depth).toHaveJSProperty('open',false);
  await page.locator('[data-environment-other]').click();
  const expected=await page.evaluate(()=>Object.entries(window.AtlasCinematicSettings.systems).filter(([,d])=>!d.type).flatMap(([k,d])=>Object.keys(d.fields).map(f=>k+':'+f)).sort());
  expect(await page.locator('[data-cinematic-setting]').evaluateAll(ns=>ns.map(n=>n.dataset.cinematicSection+':'+n.dataset.cinematicSetting).sort())).toEqual(expected);
  const grading=page.locator('[data-environment-system="grading"]');await grading.locator(':scope > summary').click();
  await grading.locator('[data-cinematic-setting="exposure"]').fill('0.45');
  await expect(grading).toContainText('inactive');
  expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034').cinematicLighting.grading.exposure)).toBe(.45);
  await grading.locator('[data-editor-panel-key="environment-more-grading"] > summary').click();
  await grading.locator('[data-cinematic-action="reset"]').click();
  expect(await page.evaluate(()=>window.eval('editorWorkspace.selection').kind)).toBe('environment');
  expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034').cinematicLighting.grading.exposure)).toBe(0);
});
