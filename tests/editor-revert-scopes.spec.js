const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const {bootEditorTest,selectSceneItem}=require('./editor-workspace-helpers');
const root=path.join(__dirname,'..'),base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
let originals;
const suiteOriginals=['Levels/world-config.js','src/audio-config.js'].map(p=>[path.join(root,p),fs.readFileSync(path.join(root,p))]);
async function restore(entries){const errors=[];for(const [p,bytes] of entries){for(let attempt=0;attempt<5;attempt++){try{fs.writeFileSync(p,bytes);expect(fs.readFileSync(p).equals(bytes)).toBe(true);break;}catch(error){if(attempt===4)errors.push(error);else await new Promise(resolve=>setTimeout(resolve,100));}}}if(errors.length)throw errors[0];}
test.afterAll(()=>restore(suiteOriginals));
test.beforeEach(()=>{originals=['Levels/world-config.js','src/audio-config.js'].map(p=>[path.join(root,p),fs.readFileSync(path.join(root,p))]);});
test.afterEach(async({page})=>{await page.close();await restore(originals);});
async function open(page){await page.route('**/__dev/levels/*/editor-draft',r=>r.request().method()==='GET'?r.fulfill({json:{}}):r.continue());await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');await page.keyboard.press('Control+Shift+D');}
async function revert(page){await page.locator('[data-workspace-action="changes"]').click();await page.getByRole('button',{name:'Revert',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Reverted');}
const snapshot=page=>page.evaluate(()=>({world:window.eval('worldResolver').getConfig(),audio:window.eval('audioConfig'),effects:window.eval('level').sceneEffects||[]}));
async function edit(page){await page.evaluate(()=>{window.eval('updateLevelSetting')('LVL-0034','spriteScale',1.31);window.eval('updateLocomotionSetting')('fromIdleMovement',.37,'LVL-0034','sven');window.eval('updateAudioDraft')('volumes.master',.43);window.eval('addSceneEffect')('light-source-enhancement');});}
test('Revert discards every pending authored scope and retains an earlier successful Apply',async({page})=>{
 await open(page);await edit(page);await page.getByRole('button',{name:'Apply',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');const applied=await snapshot(page);
 await page.evaluate(()=>{window.eval('updateLevelSetting')('LVL-0034','spriteScale',1.51);window.eval('updateLevelSetting')('LVL-0001','backgroundTint',.42);const config=window.eval('worldResolver').getConfig();config.worlds['LVL-0001']||={};config.worlds['LVL-0001'].isNew=!config.worlds['LVL-0001'].isNew;window.eval('worldResolver').setConfig(config);window.eval('markWorldConfigDirty')('World test');window.eval('updateLocomotionSetting')('fromIdleMovement',.52,'LVL-0034','sven');window.eval('updateAudioDraft')('volumes.master',.61);window.eval('addSceneEffect')('light-source-enhancement');});
 const scopes=await page.evaluate(()=>window.eval('editorPendingScopes')());expect(scopes.join(' ')).toContain('Shared character profiles');expect(scopes.join(' ')).toContain('Level settings');expect(scopes.join(' ')).toContain('Audio');expect(scopes.join(' ')).toContain('World settings');
 await revert(page);expect(await snapshot(page)).toEqual(applied);await expect(page.locator('[data-editor-draft-status]')).toHaveText('Changes: Reverted');expect(await page.evaluate(()=>window.eval('editorPendingScopes')())).toEqual([]);
});
for(const savedAudio of [false,true])test('partial Apply preserves saved level'+(savedAudio?' and audio':'')+' while Revert discards remaining scopes',async({page})=>{
 await open(page);const before=await snapshot(page);await edit(page);const staged=await snapshot(page);
 await page.route('**/apply-editor',async route=>{const payload=route.request().postDataJSON();if(!savedAudio)delete payload.audioConfig;const response=await route.fetch({postData:JSON.stringify(payload)});expect(response.ok()).toBe(true);await route.fulfill({status:500,json:{error:savedAudio?'Lost acknowledgement after level/audio write':'Audio write failed after level write'}});});
 await page.getByRole('button',{name:'Apply',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Error');
 expect(await page.evaluate(()=>Object.keys(window.eval('persistedLevelEditorPayload')()))).toEqual(savedAudio?[]:['audioConfig']);
 await revert(page);const after=await snapshot(page);expect(after.effects).toEqual(staged.effects);expect(after.world).toEqual(before.world);expect(after.audio).toEqual(savedAudio?staged.audio:before.audio);
 await expect(page.locator('[data-editor-draft-status]')).toHaveText('Changes: Reverted');expect(await page.evaluate(()=>window.eval('editorPendingScopes')())).toEqual([]);
});
test('unconfirmed saved state leaves edits and draft intact',async({page})=>{
 await open(page);await edit(page);await page.evaluate(()=>window.eval('editorDraftWrite'));const pending=await snapshot(page);let deletes=0;
 await page.route('**/saved-editor',r=>r.fulfill({status:503,json:{error:'Saved state unavailable'}}));
 await page.route('**/editor-draft',r=>{if(r.request().method()==='DELETE')deletes++;return r.continue();});
 await page.locator('[data-workspace-action="changes"]').click();await page.getByRole('button',{name:'Revert',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Error');
 expect(await snapshot(page)).toEqual(pending);expect(deletes).toBe(0);expect(await page.evaluate(()=>document.getElementById('app').inert)).toBe(false);
});

test('lost world-save acknowledgement does not undo the committed profile',async({page})=>{
 await open(page);await page.evaluate(()=>window.eval('updateLocomotionSetting')('fromIdleMovement',.47,'LVL-0034','sven'));
 await page.route('**/__dev/world-config',async route=>{if(route.request().method()!=='POST')return route.continue();const response=await route.fetch();expect(response.ok()).toBe(true);await route.fulfill({status:500,json:{error:'Lost world acknowledgement'}});});
 await page.getByRole('button',{name:'Apply',exact:true}).click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Error');
 expect(await page.evaluate(()=>window.eval('worldEditor.dirty'))).toBe(false);await revert(page);expect((await snapshot(page)).world.characterLocomotion.sven.fromIdleMovement).toBe(.47);
});
test('Revert drains queued draft writes before deleting the current draft',async({page})=>{
 await open(page);const methods=[];
 await page.route('**/editor-draft',async route=>{const method=route.request().method();methods.push(method);if(method==='POST')await new Promise(resolve=>setTimeout(resolve,200));return route.continue();});
 await page.evaluate(()=>window.eval('updateAudioDraft')('volumes.master',.29));await revert(page);
 expect(methods.indexOf('POST')).toBeLessThan(methods.lastIndexOf('DELETE'));
 const draft=await (await page.request.get(base+'/__dev/levels/LVL-0034/editor-draft')).json();expect(draft.audioConfig).toBeNull();
});

test('pending shared audio stays dirty across level navigation and is discarded from saved audio',async({page})=>{
 await open(page);const before=(await snapshot(page)).audio;
 await page.evaluate(async()=>{window.eval('updateAudioDraft')('volumes.master',.21);await window.eval('editorDraftWrite');await window.eval('selectLevel')('LVL-0035',{startImmediately:true,recordStart:false});});
 expect(await page.evaluate(()=>Object.keys(window.eval('persistedLevelEditorPayload')()))).toContain('audioConfig');await expect(page.locator('[data-editor-draft-status]')).toHaveText('Changes: Modified');await revert(page);expect((await snapshot(page)).audio).toEqual(before);
});
