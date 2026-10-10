const {test,expect}=require('@playwright/test');
const root=require('path').join(__dirname,'..');
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
async function open(page,id='LVL-0003') {
  await page.route('**/__dev/levels/*/editor-draft',route=>route.request().method()==='GET'?route.fulfill({json:{}}):route.continue());
  await page.goto(`${base}/?dev=editor&level=${id}`);
  await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
  await page.waitForFunction(id=>window.eval('state.screen')==='scene' && window.eval('level.id')===id,id);
  await page.keyboard.press('Control+Shift+D');
  await expect(page.locator('[data-editor-workspace]')).toBeVisible();
}
async function select(page,kind,id) {
  await page.keyboard.press('Control+k');
  await page.locator('[data-editor-search]').fill('');
  await page.locator(`[data-editor-browser] [data-workspace-kind="${kind}"][data-workspace-id="${id}"]`).click();
}
test('Focus Mode preserves panels, camera and selection without reopening inspector',async({page},info)=>{
  await open(page);
  await select(page,'effect','light-source-enhancement-01');
  await page.locator('[data-workspace-action="zoom-in"]').click();
  const before=await page.evaluate(()=>({camera:{...window.eval('editorWorkspace.camera')},selection:{...window.eval('editorWorkspace.selection')},browser:window.eval('editorWorkspace.browserOpen'),inspector:window.eval('editorWorkspace.inspectorOpen')}));
  await page.evaluate(()=>window.__stage=document.querySelector('[data-world-stage]'));
  const narrow=await page.locator('[data-world-stage]').boundingBox();
  await page.getByRole('button',{name:'Focus Mode',exact:true}).click();
  expect(await page.evaluate(()=>window.__stage===document.querySelector('[data-world-stage]'))).toBe(true);
  await expect(page.locator('[data-editor-browser]')).toBeHidden();
  await expect(page.locator('[data-developer-tools]')).toBeHidden();
  expect((await page.locator('[data-world-stage]').boundingBox()).width).toBeGreaterThan(narrow.width);
  await page.evaluate(()=>window.eval('selectWorkspaceItem')('object','harborMap'));
  await expect(page.locator('[data-developer-tools]')).toBeHidden();
  await page.getByRole('button',{name:'Exit Focus',exact:true}).click();
  await expect(page.locator('[data-editor-browser]')).toBeVisible();
  await expect(page.locator('[data-developer-tools]')).toBeVisible();
  expect(await page.evaluate(()=>window.eval('editorWorkspace.camera'))).toEqual(before.camera);
  await page.screenshot({path:info.outputPath('vikinghaven-workspace.png')});
  await page.getByRole('button',{name:'Focus Mode',exact:true}).click();
  await page.getByRole('button',{name:'Inspector',exact:true}).click();
  await expect(page.locator('[data-developer-tools]')).toBeVisible();
  expect(await page.evaluate(()=>window.eval('editorWorkspace.focus'))).toBe(false);
});
test('standard Tab navigation and keyboard search remain available; shared tuning is dirty',async({page})=>{
  await open(page);
  await page.keyboard.press('Control+k');
  await expect(page.locator('[data-editor-search]')).toBeFocused();
  await page.locator('[data-editor-search]').fill('sven');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(()=>window.eval('editorWorkspace.focus'))).toBe(false);
  await select(page,'player','player');
  await page.locator('[data-level-setting="spriteScale"]').fill('1.35');
  await page.locator('[data-level-setting="spriteScale"]').press('Tab');
  await expect(page.locator('[data-editor-draft-status]')).toHaveText('Changes: Modified');
  await page.locator('[data-workspace-action="changes"]').click();
  await expect(page.locator('[data-editor-world-pending]')).toContainText('Not stored in the level draft');
});
test('expanded inspector scroll and text focus survive refresh',async({page})=>{
  await open(page);
  await page.locator('[data-editor-panel-key="sven-locomotion"] > summary').click();
  const panel=page.locator('[data-developer-tools]');
  await panel.evaluate(node=>node.scrollTop=node.scrollHeight);
  const before=await panel.evaluate(node=>node.scrollTop);
  await page.evaluate(()=>{
    window.__stage=document.querySelector('[data-world-stage]');window.__detachedCanvases=0;window.__canvasResets=0;
    window.__canvasObserver=new MutationObserver(records=>window.__canvasResets+=records.length);
    window.__stage.querySelectorAll('canvas').forEach(canvas=>window.__canvasObserver.observe(canvas,{attributes:true,attributeFilter:['width','height']}));
    window.__editorObserver=new MutationObserver(records=>{for(const record of records)for(const node of record.removedNodes)if(node.nodeType===1 && (node.matches('canvas')||node.querySelector('canvas')))window.__detachedCanvases++;});
    window.__editorObserver.observe(window.__stage,{childList:true,subtree:true});
  });
  await page.evaluate(()=>window.eval('render')());
  expect(await page.evaluate(()=>({same:window.__stage===document.querySelector('[data-world-stage]'),detached:window.__detachedCanvases}))).toEqual({same:true,detached:0});
  expect(await page.evaluate(()=>window.__canvasResets)).toBe(0);
  expect(await panel.evaluate(node=>node.scrollTop)).toBe(before);
  await select(page,'effect',await page.evaluate(()=>window.eval('level.sceneEffects[0].id')));
  const label=page.locator('[data-effect-field="label"]');
  await label.focus();
  await label.evaluate(node=>node.setSelectionRange(1,3));
  await page.evaluate(()=>window.eval('render')());
  await expect(label).toBeFocused();
  expect(await label.evaluate(node=>[node.selectionStart,node.selectionEnd])).toEqual([1,3]);
});
test('real complex scene and flight path remain accessible',async({page},info)=>{
  await open(page,'LVL-0032');
  await select(page,'flyby','arc_wasp2');
  await expect(page.locator('[data-flyby-editor-id="arc_wasp2"]')).toBeVisible();
  await page.getByRole('button',{name:'Edit flight path',exact:true}).click();
  await expect(page.locator('[data-flight-path-workspace]')).toBeVisible();
  await expect(page.getByRole('button',{name:'Focus Mode',exact:true})).toBeVisible();
  await page.screenshot({path:info.outputPath('arc-flight-path.png')});
});

test('Revert discards world tuning; partial Apply reports pending world configuration',async({page})=>{
  await open(page);
  await page.evaluate(()=>{
    window.eval('updateIllustratedFeature')(window.eval('level.id'),'globalLighting',false);
    window.eval('updateLevelSetting')(window.eval('level.id'),'spriteScale',1.39);
  });
  await page.locator('[data-workspace-action="changes"]').click();
  await page.getByRole('button',{name:'Revert',exact:true}).click();
  await expect(page.locator('[data-editor-draft-status]')).toHaveText('Changes: Reverted');
  expect(await page.evaluate(()=>window.eval('levelTuning')().spriteScale)).not.toBe(1.39);
  await page.getByRole('button',{name:'Close',exact:true}).click();
  await page.route('**/__dev/levels/*/apply-editor',r=>r.fulfill({json:{ok:true}}));
  await page.route('**/__dev/world-config',r=>r.request().method()==='POST'?r.fulfill({status:500,json:{error:'simulated world write failure'}}):r.continue());
  await page.evaluate(()=>{window.eval('addSceneEffect')('light-source-enhancement');window.eval('updateLevelSetting')(window.eval('level.id'),'spriteScale',1.39);});
  await page.getByRole('button',{name:'Apply',exact:true}).click();
  await expect(page.locator('[data-editor-draft-status]')).toHaveText('Changes: Error');
  await expect(page.locator('[data-developer-tools]')).toContainText('Level/audio applied; world configuration is still pending.');
  expect(await page.evaluate(()=>Object.keys(window.eval('persistedLevelEditorPayload')()))).toContain('sceneEffects'); // The stub did not write a level: read-back must retain that pending scope.
  expect(await page.evaluate(()=>window.eval('worldEditor.dirty'))).toBe(true);
});

test('desktop panel resizing and direct selection preserve Focus Mode context',async({page},info)=>{
  await page.setViewportSize({width:1920,height:1080});
  await open(page);await select(page,'effect','light-source-enhancement-01');
  const camera=await page.evaluate(()=>({...window.eval('editorWorkspace.camera')}));
  for(const side of ['browser','inspector']) {
    const handle=await page.locator('[data-editor-resize="'+side+'"]').boundingBox();
    await page.mouse.move(handle.x+3,handle.y+100);await page.mouse.down();
    await page.mouse.move(handle.x+3+(side==='browser'?35:-35),handle.y+100);await page.mouse.up();
  }
  expect(await page.evaluate(()=>window.eval('editorWorkspace.camera'))).toEqual(camera);
  const layout=await page.evaluate(()=>({browser:window.eval('editorWorkspace.browserWidth'),inspector:window.eval('editorWorkspace.inspectorWidth')}));
  await page.screenshot({path:info.outputPath('desktop-configure.png')});
  await page.getByRole('button',{name:'Focus Mode',exact:true}).click();
  await page.locator('[data-actor-shell="sven"]').click();
  await expect(page.locator('[data-developer-tools]')).toBeHidden();
  expect(await page.evaluate(()=>window.eval('editorWorkspace.selection.kind'))).toBe('player');
  await page.screenshot({path:info.outputPath('desktop-focus.png')});
  await page.getByRole('button',{name:'Exit Focus',exact:true}).click();
  await expect(page.locator('[data-editor-browser]')).toBeVisible();
  await expect(page.locator('[data-developer-tools]')).toBeVisible();
  expect(await page.evaluate(()=>({browser:window.eval('editorWorkspace.browserWidth'),inspector:window.eval('editorWorkspace.inspectorWidth')}))).toEqual(layout);
  expect(await page.evaluate(()=>window.eval('editorWorkspace.camera'))).toEqual(camera);
});

test('Illustrated fallback retains desktop pan and camera when a 3D preview is unavailable',async({page})=>{
  await open(page,'LVL-0003');
  await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'atlas-3d'});window.eval('render')();});
  await expect(page.locator('.editorContextToolbar')).toContainText('Illustrated fallback');
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
  await page.locator('[data-workspace-action="zoom-in"]').click();
  const before=await page.evaluate(()=>({...window.eval('editorWorkspace.camera')}));
  const stage=await page.locator('[data-world-stage]').boundingBox();
  await page.mouse.move(stage.x+stage.width/2,stage.y+stage.height/2);
  await page.mouse.down({button:'middle'});await page.mouse.move(stage.x+stage.width/2+60,stage.y+stage.height/2+20);await page.mouse.up({button:'middle'});
  const after=await page.evaluate(()=>({...window.eval('editorWorkspace.camera')}));
  expect(after.center).toBeCloseTo(before.center-60/before.scale,4);
  expect(after.y).toBe(before.y+20);
  await page.getByRole('button',{name:'Focus Mode',exact:true}).click();
  expect(await page.evaluate(()=>window.eval('editorWorkspace.camera'))).toEqual(after);
});
