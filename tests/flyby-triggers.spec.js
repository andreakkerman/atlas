const {test,expect}=require('@playwright/test');
const path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
let errors;
test.beforeEach(async({page})=>{errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});});
test.afterEach(()=>expect(errors).toEqual([]));
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
async function scene(page,options={}){
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.addInitScript(()=>{window.plays=[];window.inputTrace=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(!this.src.includes('/flybys/'))return play.call(this);const row={audio:this};window.plays.push(row);return play.call(this).then(()=>row.ok=true,e=>{row.error=e.name;throw e;});};for(const type of ['pointerdown','pointerup','click'])document.addEventListener(type,e=>window.inputTrace.push({type,target:e.target.closest('[data-ambient-flyby]')?.dataset.ambientFlyby||e.target.className}),true);});
 await page.goto(base+(options.editorURL?'/?dev=editor':''));
 await page.evaluate(async options=>{await window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false});const c=window.eval('level').ambientFlybys.find(c=>c.sound.includes('arc_wasp'));window.flybyId=c.id;Object.assign(c,options.config||{});window.eval('voxelRenderer').updateSettings({renderer:options.renderer||'illustrated'});const s=window.eval('state');s.worldX=1100;s.cameraX=window.eval('getDesiredCameraX')();await window.eval('ambientFlybyRuntime').prepareLevel(window.eval('level'));window.eval('ambientFlybyRuntime').stopAll();window.eval('render')();},options);
 await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').readiness.get('LVL-0032:'+window.flybyId)?.sound)).toBe(true);
 if(options.renderer==='cinematic')await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
 expect(await page.evaluate(()=>window.eval('debugOverlayEnabled'))).toBe(false);
}
async function spawn(page){await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.preview(window.flybyId);const c=window.eval('level').ambientFlybys.find(c=>c.id===window.flybyId);r.active.get(c.id).distance=r.cacheFor(c).totalLength*.55;});await expect.poll(()=>page.locator('[data-ambient-flyby]').getAttribute('data-progress')).not.toBeNull();}
async function hit(page,info){const b=await page.locator('[data-ambient-flyby]').boundingBox();const x=b.x+b.width/2,y=b.y+b.height/2;if(info.project.name.startsWith('ipad'))await page.touchscreen.tap(x,y);else await page.mouse.click(x,y);}
test('development URL with editor closed keeps genuine gameplay tap input enabled',async({page},info)=>{
 await scene(page,{editorURL:true});
 await page.keyboard.press('Control+Shift+D');await expect(page.locator('[data-developer-tools]')).toBeVisible();
 await page.keyboard.press('Control+Shift+D');await expect(page.locator('[data-developer-tools]')).toHaveCount(0);
 expect(await page.evaluate(()=>window.eval('walkPathEditor').enabled)).toBe(true);
 await spawn(page);await hit(page,info);
 await expect.poll(()=>page.evaluate(()=>window.plays.length)).toBe(1);
 await expect.poll(()=>page.evaluate(()=>window.plays[0].ok)).toBe(true);
 await expect.poll(()=>page.evaluate(()=>window.plays[0].audio.currentTime)).toBeGreaterThan(0);
 expect(await page.evaluate(()=>window.plays[0].audio.volume)).toBeGreaterThan(0);
});
for(const renderer of ['illustrated','cinematic'])test(`moving desktop ${renderer} flyby retains a press until release`,async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium','Desktop press/release regression');
 await scene(page,{renderer});await spawn(page);
 const b=await page.locator('[data-ambient-flyby]').boundingBox(),x=b.x+b.width-8,y=b.y+b.height/2;
 await page.mouse.move(x,y);await page.mouse.down();expect(await page.evaluate(()=>window.inputTrace.find(e=>e.type==='pointerdown').target)).toBe('arc_wasp2');await page.waitForTimeout(350);await page.mouse.up();
 await expect.poll(()=>page.evaluate(()=>window.plays.length)).toBe(1);
 await expect.poll(()=>page.evaluate(()=>window.plays[0].ok)).toBe(true);
 await expect.poll(()=>page.evaluate(()=>window.plays[0].audio.currentTime)).toBeGreaterThan(0);
 expect(await page.evaluate(()=>window.plays[0].audio.volume)).toBeGreaterThan(0);
 expect(await page.evaluate(()=>window.inputTrace.find(e=>e.type==='click').target)).toBe('arc_wasp2');
});

const combinations=[['during'],['tap'],['during','tap'],[]];
for(const asset of ['arc_wasp','arc_snitch'])for(const soundTriggers of combinations)test(`${asset} real gameplay triggers ${soundTriggers.join('+')||'neither'}`,async({page},info)=>{
 const image=asset==='arc_wasp'?'awc_wasp.png':'arc_snitch.png';
 await scene(page,{config:{frameA:`assets/ambient/flybys/${asset}/${image}`,frameB:null,sound:`assets/ambient/flybys/${asset}/${asset}.mp3`,soundTriggers,speed:1,mirrorX:true,faceFlightDirection:false,rotateAlongPath:true,maxRotationDeg:30}});
 // A normal UI gesture unlocks audio without moving Sven/the camera.
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-graphics-action="toggle"]').click();
 await spawn(page);
 expect(await page.locator('[data-ambient-flyby]').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a)).toBeLessThan(0);
 await page.evaluate(()=>{window.frameChanges=0;new MutationObserver(records=>window.frameChanges+=records.length).observe(document.querySelector('[data-ambient-flyby]'),{attributes:true,attributeFilter:['data-frame']});});
 const automatic=soundTriggers.includes('during')?1:0;
 expect(await page.evaluate(()=>window.plays.length)).toBe(automatic);
 await hit(page,info);
 const first=soundTriggers.length?1:0;
 expect(await page.evaluate(()=>window.plays.length)).toBe(first);
 if(first){await expect.poll(()=>page.evaluate(()=>window.plays[0].ok)).toBe(true);await expect.poll(()=>page.evaluate(()=>window.plays[0].audio.currentTime)).toBeGreaterThan(0);expect(await page.evaluate(()=>window.plays[0].audio.volume)).toBeGreaterThan(0);await hit(page,info);expect(await page.evaluate(()=>window.plays.length)).toBe(1);await expect.poll(()=>page.evaluate(()=>window.plays[0].audio.ended)).toBe(true);}
 await hit(page,info);
 expect(await page.evaluate(()=>window.plays.length)).toBe(first+(soundTriggers.includes('tap')?1:0));
 const shell=page.locator('[data-ambient-flyby]');await expect(shell.locator('img')).toHaveCount(1);await expect(shell.locator('.ambientFlybyFrameB')).toHaveCount(0);expect(await page.evaluate(()=>window.frameChanges)).toBe(0);
 // Check outside input with no dedupe owner, after testing replay: this world
 // click also legitimately moves Sven/the camera away from the flyby.
 const count=await page.evaluate(()=>window.plays.length);
 if(count)await expect.poll(()=>page.evaluate(()=>window.plays.at(-1).audio.ended)).toBe(true);
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
 const size=page.viewportSize();await page.mouse.click(size.width-10,size.height*.6);expect(await page.evaluate(()=>window.plays.length)).toBe(count);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());await expect(shell).toHaveAttribute('data-active','false');expect(await shell.evaluate(e=>getComputedStyle(e).pointerEvents)).toBe('none');expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
});

test('legacy and modern trigger resolver and validation have one precedence/default contract',()=>{
 const api=require('../src/ambient-system');
 for(const [config,expected]of [[{},['during']],[{soundTrigger:'during'},['during']],[{soundTrigger:'tap'},['tap']],[{soundTriggers:['during','tap'],soundTrigger:'tap'},['during','tap']],[{soundTriggers:[],soundTrigger:'during'},[]]]){expect(api.validSoundTriggers(config)).toBe(true);expect(api.soundTriggers(config)).toEqual(expected);}
 for(const config of [{soundTriggers:'tap'},{soundTriggers:['tap','tap']},{soundTriggers:['invalid']},{soundTriggers:null},{soundTrigger:'invalid'}])expect(api.validSoundTriggers(config)).toBe(false);
});

test('Apply rejects malformed trigger combinations before changing a level',async({page})=>{
 await scene(page);const flybys=await page.evaluate(()=>window.eval('level').ambientFlybys);
 for(const invalid of ['tap',null,['invalid'],['tap','tap']]){
  const response=await page.request.post(base+'/__dev/levels/LVL-0032/apply-editor',{data:{ambientFlybys:flybys.map(c=>({...c,soundTriggers:invalid}))}});
  expect(response.status()).toBe(400);expect(await response.text()).toContain('soundTriggers');
 }
});

for(const triggers of combinations)test(`Snitch discovery and checkbox ${triggers.join('+')||'neither'} survive Apply/reload`,async({page})=>{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor');await page.evaluate(()=>window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false}));
 if(!await page.evaluate(()=>window.eval('debugOverlayEnabled')))await page.keyboard.press('Control+Shift+D');await page.locator('[data-editor-mode="graphics"]').click();
 // The current authored Wasp enables both triggers; each Snitch combination is tested below.
 await expect(page.locator('[data-flyby-id="arc_wasp2"][data-flyby-sound-trigger="during"]')).toBeChecked();
 await expect(page.locator('[data-flyby-id="arc_wasp2"][data-flyby-sound-trigger="tap"]')).toBeChecked();
 await page.locator('summary').filter({hasText:/^Add ambient flyby$/}).click();
 const form=page.locator('[data-add-flyby-form]');
 for(const [set,a,b,sound]of [['arc_wasp','awc_wasp.png','', 'arc_wasp.mp3'],['common-swift','common-swift-a.png','common-swift-b.png','common-swift-call.mp3'],['arc_snitch','arc_snitch.png','','arc_snitch.mp3']]){
  await form.locator('[name="assetSet"]').selectOption('flybys/'+set);await expect(form.locator('[name="frameA"]')).toHaveValue(`assets/ambient/flybys/${set}/${a}`);await expect(form.locator('[name="frameB"]')).toHaveValue(b?`assets/ambient/flybys/${set}/${b}`:'');await expect(form.locator('[name="sound"]')).toHaveValue(`assets/ambient/flybys/${set}/${sound}`);if(!b)await expect(form.locator('[name="frameB"]')).toBeDisabled();else await expect(form.locator('[name="frameB"]')).toBeEnabled();
 }
 await form.locator('[name="id"]').fill('qaSnitch');await form.locator('[name="label"]').fill('QA Snitch');await form.locator('[data-debug-action="add-flyby"]').click();
  const card=page.locator('[data-flyby-editor-id="qaSnitch"]');const audio=card.locator('details').filter({has:page.locator('summary').filter({hasText:/^Audio$/})});if(await audio.getAttribute('open')===null)await audio.locator('summary').click();
  await expect(card.locator('select[data-flyby-setting="soundTrigger"]')).toHaveCount(0);
  for(const trigger of ['during','tap'])await card.locator(`[data-flyby-sound-trigger="${trigger}"]`).setChecked(triggers.includes(trigger));
  await page.getByRole('button',{name:'Apply',exact:true}).click();await expect(page.getByText('Draft Status: Applied',{exact:true})).toBeVisible();
  await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false}));
  const stored=await page.evaluate(()=>window.eval('level').ambientFlybys.find(c=>c.id==='qaSnitch'));
  expect(require('../src/ambient-system').soundTriggers(stored)).toEqual(triggers);expect(stored.frameB).toBeNull();expect(stored.frameA).toBe('assets/ambient/flybys/arc_snitch/arc_snitch.png');expect(stored.sound).toBe('assets/ambient/flybys/arc_snitch/arc_snitch.mp3');
  if(!await page.evaluate(()=>window.eval('debugOverlayEnabled')))await page.keyboard.press('Control+Shift+D');await page.locator('[data-editor-mode="graphics"]').click();
  await page.locator('[data-select-ambient-type="flyby"][data-select-ambient-id="qaSnitch"]').click();
  for(const trigger of ['during','tap'])await expect(page.locator(`[data-flyby-id="qaSnitch"][data-flyby-sound-trigger="${trigger}"]`)).toBeChecked({checked:triggers.includes(trigger)});
});
