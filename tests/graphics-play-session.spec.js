const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const defaults={globalLighting:true,globalGrading:false,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true};
const changed=Object.fromEntries(Object.entries(defaults).map(([key,value])=>[key,!value]));
const read=page=>page.evaluate(()=>({flags:window.eval('illustratedFeatures')(),settings:window.eval('voxelRenderer').getSettings(),saved:localStorage.getItem('atlas.graphics.v1'),authored:window.eval('worldResolver').getConfig(),dirty:window.eval('worldEditor').dirty}));
async function menu(page){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base);await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await expect(page.locator('.menuScreen')).toBeVisible();
 // Historical permanent preferences must not win over a new adventure's defaults.
 await page.evaluate(()=>window.eval('voxelRenderer').updateSettings({challengeFx:{mode:'legacy',volume:.37}}));
}
async function launch(page){
 await chooseAdventure(page);
 await expect(page.locator('.introScreen')).toBeVisible();
 await page.locator('[data-action="intro-next"]').click();await expect(page.locator('[data-world-stage]')).toBeVisible();
}
async function chooseAdventure(page){
 const index=await page.evaluate(()=>window.eval('visibleLevelCatalog')().findIndex(entry=>entry.id==='LVL-0001'));
 await page.locator(`[data-menu-index="${index}"]`).click();
 await expect(page.locator('.heroLevelTile')).toHaveAttribute('data-level','LVL-0001');
 await page.locator('.heroLevelTile').click();
}
async function controls(page){await page.locator('[data-graphics-action="toggle"]').click();}
test('main-menu launch defaults and session overrides across next level/retry',async({page},info)=>{
 await menu(page);const original=await read(page);await launch(page);
 expect((await read(page)).flags).toEqual(defaults);expect((await read(page)).settings.challengeFx.mode).toBe('canvas');
 await controls(page);
 for(const [key,value]of Object.entries(defaults))await expect(page.locator(`[data-illustrated-feature="${key}"]`)).toBeChecked({checked:value});
 await page.locator('[data-challenge-fx-controls] summary').click();await expect(page.locator('[data-challenge-fx="mode"]')).toHaveValue('canvas');
 await page.screenshot({path:info.outputPath('fresh-adventure-defaults.png')});
 await page.locator('[data-challenge-fx="mode"]').selectOption('legacy');
 for(const key of ['globalGrading','areaDirectionalLights','sceneDepth','characterShadows','particleFields','globalLighting']){
  const input=page.locator(`[data-illustrated-feature="${key}"]`);await input.focus();await input.press('Space');await expect(input).toBeChecked({checked:changed[key]});
 }
 await page.locator('[data-graphics-action="close"]').click();
 let current=await read(page);expect(current.flags).toEqual(changed);expect(current.saved).toBe(original.saved);expect(current.authored).toEqual(original.authored);expect(current.dirty).toBe(original.dirty);
 const next=await page.evaluate(()=>window.eval('resolvedNextLevelId')());expect(next).toBeTruthy();
 await page.evaluate(()=>window.eval('continueToNextLevel')());
 expect(await page.evaluate(()=>window.eval('level').id)).toBe(next);
 current=await read(page);expect(current.flags).toEqual(changed);expect(current.settings.challengeFx.mode).toBe('legacy');
 await page.evaluate(()=>window.eval('restart')());await page.locator('[data-action="intro-next"]').click();
 current=await read(page);expect(current.flags).toEqual(changed);expect(current.settings.challengeFx.mode).toBe('legacy');expect(current.saved).toBe(original.saved);expect(current.authored).toEqual(original.authored);
 await page.locator('[data-action="menu"]').first().click();await expect(page.locator('.menuScreen')).toBeVisible();expect((await read(page)).settings).toEqual(original.settings);
});

test('nested FX tuning is temporary without authoring particles',async({page})=>{
 await menu(page);
 await page.evaluate(()=>{
  const resolver=window.eval('worldResolver'),lighting=window.AtlasCinematicSettings.normalize(resolver.levelSettings('LVL-0001').cinematicLighting);
  lighting.particles={...lighting.particles,enabled:true,items:[]};
  resolver.updateLevelSettings('LVL-0001',{cinematicLighting:lighting,illustratedFeatures:{globalLighting:false,particleFields:false}});
 });
 const original=await read(page);await launch(page);await controls(page);await page.locator('[data-challenge-fx-controls] summary').click();
 await page.locator('[data-challenge-fx="marker.size"]').fill('2.4');await page.locator('[data-challenge-fx="volume"]').fill('0.8');
 expect((await read(page)).settings.challengeFx.marker.size).toBe(2.4);expect((await read(page)).saved).toBe(original.saved);
 const projected=await page.evaluate(()=>AtlasCinematicSettings.forIllustrated(window.eval('worldResolver').levelSettings('LVL-0001').cinematicLighting,window.eval('illustratedFeatures')()).particles);
 expect(projected.items).toEqual([]);expect(projected.enabled).toBe(false);expect((await read(page)).authored).toEqual(original.authored);
 await page.locator('[data-graphics-action="close"]').click();await page.locator('[data-action="menu"]').first().click();
 expect((await read(page)).settings).toEqual(original.settings);
 expect((await read(page)).saved).toBe(original.saved);
});

test('returning to menu discards play overrides before another adventure loads',async({page})=>{
 await menu(page);const original=await read(page);await launch(page);
 // Control wiring is exercised above; isolate the menu boundary using its existing handlers.
 await page.evaluate(()=>{
  window.eval('updateIllustratedFeature')('LVL-0001','sceneDepth',true);
  window.eval('updateIllustratedFeature')('LVL-0001','globalLighting',false);
  const runtime=window.eval('voxelRenderer');runtime.updateSettings({challengeFx:{...runtime.getSettings().challengeFx,mode:'legacy'}});
 });
 expect((await read(page)).flags.globalLighting).toBe(false);
 expect((await read(page)).flags.sceneDepth).toBe(true);
 expect((await read(page)).settings.challengeFx.mode).toBe('legacy');
 await page.locator('[data-action="menu"]').first().click();await chooseAdventure(page);
 expect((await read(page)).flags).toEqual(defaults);expect((await read(page)).settings.challengeFx.mode).toBe('canvas');expect((await read(page)).saved).toBe(original.saved);
});

test('cancelling an adventure intro restores the non-session settings',async({page})=>{
 await menu(page);const original=await read(page);await chooseAdventure(page);
 await expect(page.locator('.introScreen')).toBeVisible();
 expect((await read(page)).settings.challengeFx.mode).toBe('canvas');
 await page.locator('[data-action="menu"]').click();
 await expect(page.locator('.menuScreen')).toBeVisible();
 expect((await read(page)).settings).toEqual(original.settings);
 expect((await read(page)).saved).toBe(original.saved);
});

test('graphics session storage isolation survives renderer disposal and nested edits',async({page})=>{
 await menu(page);
 const evidence=await page.evaluate(()=>{
  const runtime=window.eval('voxelRenderer'),before=structuredClone(runtime.getSettings()),saved=localStorage.getItem('atlas.graphics.v1');
  runtime.beginSession({challengeFx:{...before.challengeFx,mode:'canvas'}});
  const fx=runtime.getSettings().challengeFx;fx.marker.size=2.7;
  runtime.updateSettings({quality:'low',challengeFx:fx});
  runtime.dispose(); // Resource cleanup on a level transition must not end the settings session.
  const active=structuredClone(runtime.getSettings());
  const reloaded=AtlasVoxelRenderer.loadSettings();
  runtime.endSession();
  const restored=structuredClone(runtime.getSettings());
  const savedDuringSession=localStorage.getItem('atlas.graphics.v1');
  runtime.updateSettings({challengeFx:{...restored.challengeFx,volume:.6}});
  return {before,saved,active,reloaded,restored,savedDuringSession,afterEditorSave:AtlasVoxelRenderer.loadSettings()};
 });
 expect(evidence.active.quality).toBe('low');expect(evidence.active.challengeFx.marker.size).toBe(2.7);expect(evidence.active.challengeFx.mode).toBe('canvas');
 expect(evidence.savedDuringSession).toBe(evidence.saved);expect(evidence.reloaded).toEqual(evidence.before);expect(evidence.restored).toEqual(evidence.before);
 expect(evidence.afterEditorSave.challengeFx.volume).toBe(.6);
});
