const {test,expect}=require('@playwright/test');
const {selectSceneItem,selectSystem}=require('./editor-workspace-helpers');
require('./editor-draft-fixture').preserveEditorDrafts(test,require('path').join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
async function open(page,id='LVL-0003',editor=true,mode='illustrated'){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.request().method()==='GET'?r.fulfill({json:{}}):r.continue());
 await page.goto(base+'/?dev=editor&level='+id);
 await page.waitForFunction(id=>window.eval('state.screen')==='scene'&&window.eval('level.id')===id,id);
 await page.evaluate(renderer=>{window.eval('voxelRenderer').updateSettings({renderer});window.eval('render')();},mode);
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
 if(editor)await page.keyboard.press('Control+Shift+D');
}
async function worldClick(page,x){
 const p=await page.evaluate(x=>{const s=document.querySelector('[data-world-stage]').getBoundingClientRect(),state=window.eval('state'),l=window.eval('level');return {x:s.left+(x-state.cameraX)*s.width/state.viewportWorldWidth,y:s.top+s.height*.12};},x);
 await page.mouse.click(p.x,p.y);
}
test('walk while editing and changing panels; explicit editing input never starts walking',async({page})=>{
 await open(page);await selectSceneItem(page,'player','player');
 const initial=await page.evaluate(()=>window.eval('state.worldX'));
 await worldClick(page,initial+500);
 await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(initial+5);
 const token=await page.evaluate(()=>window.eval('state.interactionToken'));
 await page.locator('[data-level-setting="spriteScale"]').fill('1.12');
 await page.getByRole('button',{name:'Focus Mode',exact:true}).click();
 expect(await page.evaluate(()=>window.eval('state.interactionToken'))).toBe(token);
 await worldClick(page,initial+700);
 await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(initial+40);
 await expect(page.locator('[data-developer-tools]')).toBeHidden();
 await page.getByRole('button',{name:'Exit Focus',exact:true}).click();
 await page.keyboard.press('Control+k');
 await page.evaluate(()=>window.eval('stopMovement')({invalidateIntent:true}));
 await page.locator('[data-editor-browser] [data-workspace-kind="effect"]').first().click();
 expect(await page.evaluate(()=>!!window.eval('state.movement'))).toBe(false);
 await page.getByRole('button',{name:'Collapse scene browser',exact:true}).click();
 await page.getByRole('button',{name:'Edit geometry',exact:true}).click();
 const geometry=await page.locator('[data-effect-geometry-surface="workspace"]').boundingBox();
 await page.mouse.click(geometry.x+20,geometry.y+20);
 expect(await page.evaluate(()=>!!window.eval('state.movement'))).toBe(false);
});
for(const mode of ['illustrated','cinematic'])for(const id of ['LVL-0003','LVL-0034'])test(`${mode} ${id} flyby and NPC presentation matches gameplay at editor zoom`,async({page})=>{
 await page.setViewportSize({width:1920,height:1080});await open(page,id,false,mode);
 const flyby=await page.evaluate(()=>window.eval('level').ambientFlybys?.[0]?.id);
 async function preview(){if(flyby)await page.evaluate(id=>{const r=window.eval('ambientFlybyRuntime');r.stopAll();r.preview(id);r.togglePreview(id);window.eval('render')();},flyby);}
 async function sizes(){return page.evaluate(()=>{const h=document.querySelector('[data-world-stage]').getBoundingClientRect().height;return [...document.querySelectorAll('[data-ambient-flyby][data-active="true"], [data-npc-challenge]')].map(n=>({id:n.dataset.ambientFlyby||n.dataset.npcChallenge,width:n.getBoundingClientRect().width/h,height:n.getBoundingClientRect().height/h}));});}
 await preview();const original=await sizes();expect(original.length).toBeGreaterThan(0);
 await page.keyboard.press('Control+Shift+D');await preview();
 for(const action of ['zoom-in','focus','zoom-out']){
  await page.locator(`[data-workspace-action="${action}"]`).click();
  const actual=await sizes();expect(actual.map(x=>x.id)).toEqual(original.map(x=>x.id));
  for(let i=0;i<actual.length;i++){expect(actual[i].width).toBeCloseTo(original[i].width,3);expect(actual[i].height).toBeCloseTo(original[i].height,3);}
 }
});
test('Add search spans preset metadata, weather and discovered assets without compatibility presets',async({page})=>{
 await open(page);await page.locator('[data-workspace-action="add"]').click();const input=page.locator('[data-editor-add-search]');
 await input.fill('particle');
 const results=await page.locator('[data-add-family] option').evaluateAll(nodes=>nodes.map(n=>n.value));
 expect(results).toContain('cinematic:particles');
 expect(results.some(key=>key.startsWith('animal:')||key.startsWith('flyby:'))).toBe(false);
 await page.locator('[data-add-family]').selectOption('cinematic:snow');
 expect(await page.locator('[data-add-variant] option').allTextContents()).toEqual(['Light Snow','Snowfall','Fluffy Snow','Windblown Snow','Blizzard']);
 await page.screenshot({path:'qa-screenshots/editor-review/add-particles.png'});
 expect(results).not.toContain('effect:light-source-enhancement');
 expect(results).not.toContain('effect:sand');
 await input.fill('snowfall');await page.locator('[data-add-cinematic-preset="Snow"]').click();
 const authored=await page.evaluate(()=>{const s=window.eval('editorWorkspace.selection');return window.AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings(window.eval('level.id')).cinematicLighting)[s.system].items.find(i=>i.id===s.id);});
 expect(authored).toMatchObject(require('../src/cinematic-settings').presets.particles.Snow);
 await page.locator('[data-workspace-action="add"]').click();await input.fill('wasp');
 const asset=page.locator('[data-add-family]');await expect(asset).toHaveValue(/flyby:.*wasp/);
 await expect(page.locator('[data-add-flyby-form] [name="assetSet"]')).toHaveValue(/wasp/);
 await input.fill('seagull');await expect(asset.locator('option')).toHaveCount(1);await expect(asset).toHaveValue(/animal:.*seagull/);
 await input.fill('no-matching-asset-xyz');await expect(page.locator('[data-add-empty]')).toBeVisible();
 await expect(page.locator('[data-add-family]')).toHaveCount(0);
 await input.fill('');await expect(page.locator('[data-add-empty]')).toBeHidden();
});
test('information popup floats without changing inspector layout or scroll',async({page})=>{
 await open(page,'LVL-0034');await selectSystem(page,'particles');
 const button=page.locator('[data-cinematic-help][data-help-key="depthInfluence"]');await button.scrollIntoViewIfNeeded();
 const panel=page.locator('[data-developer-tools]');const before=await panel.evaluate(n=>({scroll:n.scrollTop,height:n.scrollHeight,width:n.clientWidth}));
 await button.click();await expect(page.locator('[data-editor-info-popup]')).toContainText('independently of Global Lighting');
 expect(await panel.evaluate(n=>({scroll:n.scrollTop,height:n.scrollHeight,width:n.clientWidth}))).toEqual(before);
 await page.screenshot({path:'qa-screenshots/editor-review/information.png'});
 await page.getByRole('button',{name:'Close information',exact:true}).click();await expect(button).toBeFocused();
 expect(await panel.evaluate(n=>n.scrollTop)).toBe(before.scroll);
 await page.locator('[data-editor-workspace] [data-graphics-action="toggle"]').click();
 await page.locator('[data-environment-participation]').click();
 const gate=page.locator('[data-illustrated-feature="particleFields"]');await expect(gate).toBeChecked();
 const info=page.locator('[data-info-title="Particle Fields"]');await info.click();
 await expect(page.locator('[data-editor-info-popup]')).toContainText('Independent of Global Lighting');
 await expect(gate).toBeChecked();await page.keyboard.press('Escape');await expect(info).toBeFocused();
});
for(const width of [1100,1920])test(`renderer popup remains beside docked panels at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await open(page);await page.keyboard.press('Control+k');
 await page.locator('[data-editor-workspace] [data-graphics-action="toggle"]').click();
 const browser=await page.locator('[data-editor-browser]').boundingBox(),popup=await page.locator('[data-graphics-settings]').boundingBox();
 expect(popup.x).toBeGreaterThanOrEqual(browser.x+browser.width);
 await page.screenshot({path:`qa-screenshots/editor-review/renderer-${width}.png`});
 const camera=await page.evaluate(()=>({...window.eval('editorWorkspace.camera')}));
 await page.locator('[data-renderer-choice="cinematic"]').click();
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
 await page.locator('[data-renderer-choice="illustrated"]').click();
 expect(await page.evaluate(()=>window.eval('editorWorkspace.camera'))).toEqual(camera);
 await page.getByRole('button',{name:'Focus Mode',exact:true}).click();
 expect((await page.locator('[data-graphics-settings]').boundingBox()).x).toBe(12);
 await page.getByRole('button',{name:'Exit Focus',exact:true}).click();
 const inspector=await page.locator('[data-developer-tools]').boundingBox();
 for(const action of ['add','tools','changes']) {
  await page.locator('[data-editor-workspace] [data-workspace-action="'+action+'"]').first().click();
  await expect(page.locator('[data-graphics-settings]')).toHaveCount(0);
  const surface=page.locator('[data-editor-add],.editorChanges');await expect(surface).toHaveCount(1);
  const box=await surface.boundingBox();expect(box.x).toBeGreaterThanOrEqual(browser.x+browser.width);expect(box.x+box.width).toBeLessThanOrEqual(inspector.x);
 }
 await page.locator('[data-editor-workspace] [data-graphics-action="toggle"]').click();
 await expect(page.locator('[data-editor-add],.editorChanges')).toHaveCount(0);
 expect(await page.evaluate(()=>window.eval('editorWorkspace.camera'))).toEqual(camera);
});
for(const id of ['LVL-0034','LVL-0035'])test(`${id} Illustrated weather and depth match the runtime projection`,async({page})=>{
 await open(page,id);await selectSystem(page,'particles');
 await expect(page.locator('.editorAvailability')).toContainText('Active in Illustrated');
 const snapshot=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());
 expect(snapshot.mode).toBe('illustrated');expect(snapshot.effective.particles.enabled).toBe(true);expect(snapshot.particles).toBeGreaterThan(0);expect(snapshot.effective.depth.enabled).toBe(true);
 const count=page.locator('[data-cinematic-section="particles"][data-cinematic-setting="count"]');
 const changed=Number(await count.inputValue())-1;await count.fill(String(changed));
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().effective.particles.items.find(i=>i.enabled).count)).toBe(changed);
 await expect(page.locator('[data-workspace-action="changes"]')).toContainText('Modified');
 await selectSystem(page,'depth');await page.locator('[data-info-title="Scene depth"]').click();await expect(page.locator('[data-editor-info-popup]')).toContainText('Particle masking can use depth with Global Lighting off');
});
test('all production Illustrated contributions retain Scene discovery',async({page},info)=>{
 await open(page);
 const audit=await page.evaluate(async()=>{
  const api=window.AtlasCinematicSettings,entries=window.eval('levelCatalog').filter(x=>x.id!=='LVL-0000');
  const result=[];
  for(const entry of entries){const source=await window.eval('loadLevelDefinition')(entry),settings=window.eval('worldResolver').levelSettings(entry.id),effective=api.forIllustrated(settings.cinematicLighting,settings.illustratedFeatures),items=window.eval('editorSceneItems')(source);
   const active=Object.entries(api.systems).filter(([k])=>effective[k].enabled || k==='characters'&&effective.characters.groundingShadow).map(([k])=>k);
   const spatial=Object.entries(api.systems).filter(([k,d])=>d.type&&effective[k].enabled).flatMap(([k])=>effective[k].items.filter(i=>i.enabled).map(i=>({kind:'cinematic',id:i.id,system:k})));
   const missing=[...spatial,...(source.sceneEffects||[]).map(e=>({kind:'effect',id:e.id}))].filter(ref=>!items.some(i=>i.kind===ref.kind&&i.id===ref.id&&i.system===ref.system));
   result.push({id:entry.id,active,missing,spatial:spatial.length});
  }return result;
 });
 expect(audit).toHaveLength(39);expect(audit.flatMap(r=>r.missing)).toEqual([]);
 await require('fs').promises.writeFile(info.outputPath('illustrated-parity.json'),JSON.stringify(audit,null,2));
});
