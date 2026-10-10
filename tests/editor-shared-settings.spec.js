const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const {bootEditorTest,selectSceneItem}=require('./editor-workspace-helpers');
const root=path.join(__dirname,'..'),config=path.join(root,'Levels/world-config.js');
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
async function open(page){await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');await page.keyboard.press('Control+Shift+D');await selectSceneItem(page,'shared','shared');}
test('Shared Settings edits an explicit profile without changing level character or presentation',async({page})=>{
 const original=fs.readFileSync(config);
 try{
  await open(page);await expect(page.locator('[data-developer-tools] > header')).toContainText('All levels and worlds');
  const before=await page.evaluate(()=>({levels:window.eval('worldResolver').getConfig().levels,profiles:window.eval('worldResolver').getConfig().characterLocomotion}));
  const input=page.locator('[data-locomotion-setting="fromIdleMovement"]');await expect(input).toBeVisible();await page.screenshot({path:'qa-screenshots/editor-shared-settings.png'});
  await page.locator('[data-shared-profile]').selectOption('sven');await input.fill('31');
  const after=await page.evaluate(()=>window.eval('worldResolver').getConfig());
  expect(after.levels).toEqual(before.levels);expect(after.characterLocomotion.sven_arc).toEqual(before.profiles.sven_arc);expect(after.characterLocomotion.sven.fromIdleMovement).toBe(.31);
  expect(await page.locator('[data-locomotion-setting]').evaluateAll(ns=>ns.map(n=>n.dataset.locomotionSetting).sort())).toEqual(await page.evaluate(()=>Object.keys(window.AtlasPlayableCharacters.locomotionRanges).sort()));
  await expect(page.locator('[data-developer-tools]')).not.toContainText('(Character / Global)');
  await expect(page.locator('[data-editor-panel-key="locomotion-animation"]')).toHaveJSProperty('open',false);
  await page.locator('[data-info-title="Start travel %"]').click();await expect(page.locator('[data-editor-info-popup]')).toContainText('transition out of idle');await page.keyboard.press('Escape');
  await page.getByRole('button',{name:'Apply',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');
  await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');await page.keyboard.press('Control+Shift+D');await selectSceneItem(page,'shared','shared');await page.locator('[data-shared-profile]').selectOption('sven');await expect(input).toHaveValue('31');
  await selectSceneItem(page,'player','player');await expect(page.locator('[data-main-character]')).toHaveValue('sven_arc');
  expect(await page.evaluate(()=>window.eval('worldResolver').getConfig().characterLocomotion.sven_arc)).toEqual(before.profiles.sven_arc);
 }finally{await page.close();fs.writeFileSync(config,original);}
});
test('Audio labels shared and per-level storage paths without duplicate controls',async({page})=>{
 await open(page);await selectSceneItem(page,'audio','audio');
 await expect(page.locator('[data-audio-editor]')).toContainText('All levels');await expect(page.locator('[data-audio-editor]')).toContainText('This level · music and ambience');
 for(const key of ['volumes.master','volumes.companionPurr','levels.LVL-0034.musicVolume','levels.LVL-0034.ambienceVolume'])await expect(page.locator('[data-audio-path="'+key+'"]')).toHaveCount(1);
 await page.locator('[data-audio-path="levels.LVL-0034.musicVolume"]').fill('0.42');
 expect(await page.evaluate(()=>window.eval('audioConfig').levels['LVL-0034'].musicVolume)).toBe(.42);
});
