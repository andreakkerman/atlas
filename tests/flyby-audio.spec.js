const {test,expect}=require('@playwright/test');
require('./editor-draft-fixture').preserveEditorDrafts(test,require('path').join(__dirname,'..'));
let errors;
test.beforeEach(async({page})=>{errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});});
test.afterEach(()=>expect(errors).toEqual([]));
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
const sound='assets/ambient/flybys/arc_wasp/arc_wasp.mp3';
async function setup(page,trigger){
 await page.emulateMedia({reducedMotion:'no-preference'});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.addInitScript(()=>{window.flybyPlays=[];const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(!this.src.includes('/flybys/'))return play.call(this);const row={audio:this,peak:0};window.flybyPlays.push(row);const monitor=setInterval(()=>row.peak=Math.max(row.peak,this.volume),10);this.addEventListener('ended',()=>clearInterval(monitor),{once:true});this.addEventListener('pause',()=>clearInterval(monitor),{once:true});return play.call(this).then(()=>{row.ok=true;},e=>{clearInterval(monitor);row.error=e.name;throw e;});};});
 await page.goto(base);
 await page.evaluate(async trigger=>{await window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false});const c=window.eval('level').ambientFlybys.find(x=>x.sound.includes('arc_wasp'));c.soundTrigger=trigger;window.waspId=c.id;window.eval('ambientFlybyRuntime').stopAll();window.eval('render')();},trigger);
 await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').readiness.get('LVL-0032:'+window.waspId)?.sound)).toBe(true);
}
async function visible(page){
 await page.evaluate(()=>{const s=window.eval('state');s.worldX=1100;s.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();const r=window.eval('ambientFlybyRuntime');r.preview(window.waspId);r.active.get(window.waspId).distance=r.cacheFor(window.eval('level').ambientFlybys.find(x=>x.id===window.waspId)).totalLength*.55;});
 await expect.poll(()=>page.evaluate(()=>document.querySelector(`[data-ambient-flyby="${window.waspId}"]`)?.dataset.progress)).not.toBeUndefined();
}
async function tap(page,info){const id=await page.evaluate(()=>window.waspId);const b=await page.locator(`[data-ambient-flyby="${id}"]`).boundingBox();if(info.project.name.startsWith('ipad'))await page.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);else await page.mouse.click(b.x+b.width/2,b.y+b.height/2);}
test('authored short Wasp call reaches instance gain before it ends during a slow flight',async({page})=>{
 await setup(page,'during');await page.mouse.click(700,400);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').preview(window.waspId));
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays.some(p=>p.audio.ended))).toBe(true);
 const result=await page.evaluate(()=>({plays:window.flybyPlays.map(p=>({ok:p.ok,error:p.error,peak:p.peak,duration:p.audio.duration})),active:window.eval('ambientFlybyRuntime').active.size,audio:window.eval('ambientFlybyRuntime').activeAudio.size,expected:window.eval('audioMasterVolume')()*window.eval('level').ambientFlybys[0].soundVolume}));
 expect(result.plays).toHaveLength(1);expect(result.plays[0].ok).toBe(true);expect(result.plays[0].error).toBeUndefined();expect(result.plays[0].peak).toBeGreaterThan(result.expected*.9);expect(result.active).toBe(1);expect(result.audio).toBe(0);
});
test('authored Wasp tap passes through noninteractive status; native audio ends and can replay',async({page},info)=>{
 await setup(page,'tap');await visible(page);
 // Exercise a real status banner overlapping this authored path, also on GPU-capable hosts.
 await page.evaluate(()=>{const e=document.querySelector('[data-cinematic-error]');e.hidden=false;e.textContent='Particle Fields unavailable: WebGPU API is not available in this browser.';});
 expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(0);
 await tap(page,info);
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays.length)).toBe(1);
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0].ok)).toBe(true);
 expect(await page.evaluate(()=>window.flybyPlays[0].audio.volume)).toBeCloseTo(await page.evaluate(()=>window.eval('audioMasterVolume')()*window.eval('level').ambientFlybys[0].soundVolume));
 await tap(page,info);expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(1);
 await page.mouse.click(700,400);expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(1);
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0].audio.ended)).toBe(true);
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
 await visible(page);await tap(page,info);await expect.poll(()=>page.evaluate(()=>window.flybyPlays.length)).toBe(2);
 await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
});


test('Wasp and control sound return audio MIME and native decode; non-silent PCM where Web Audio is available',async({page})=>{
 await page.goto(base);
 for(const path of [sound,'assets/ambient/flybys/common-swift/common-swift-call.mp3']){
  const result=await page.evaluate(async path=>{const response=await fetch(path),bytes=await response.arrayBuffer(),media=await window.eval('assetCache').sound(path),result={status:response.status,type:response.headers.get('content-type'),duration:media.duration,ready:media.readyState};const Context=window.AudioContext||window.webkitAudioContext;if(!Context)return result;const ctx=new Context();try{const buffer=await ctx.decodeAudioData(bytes);let peak=0,energy=0;for(const value of buffer.getChannelData(0)){peak=Math.max(peak,Math.abs(value));energy+=value*value;}return {...result,peak,rms:Math.sqrt(energy/buffer.length)};}finally{await ctx.close();}},path);
  expect(result.status).toBe(200);expect(result.type).toContain('audio/mpeg');expect(result.duration).toBeGreaterThan(0);expect(result.ready).toBeGreaterThanOrEqual(2);
  if(await page.evaluate(()=>Boolean(window.AudioContext||window.webkitAudioContext))){expect(result.peak).toBeGreaterThan(.01);expect(result.rms).toBeGreaterThan(.001);}
 }
});
for(const trigger of ['during','tap'])test(`existing two-frame swift uses native ${trigger} playback`,async({page},info)=>{
 await setup(page,trigger);
 await page.evaluate(async trigger=>{await window.eval('selectLevel')('LVL-0016',{startImmediately:true,recordStart:false});const c=window.eval('level').ambientFlybys.find(x=>x.sound);c.soundTrigger=trigger;window.waspId=c.id;window.eval('ambientFlybyRuntime').stopAll();window.eval('render')();},trigger);
 await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').readiness.get('LVL-0016:'+window.waspId)?.sound)).toBe(true);
 if(trigger==='during')await page.mouse.click(700,400);
 await visible(page);
 if(trigger==='tap'){expect(await page.evaluate(()=>window.flybyPlays.length)).toBe(0);await tap(page,info);}
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0]?.ok)).toBe(true);
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0]?.audio.currentTime)).toBeGreaterThan(0);
 expect(await page.locator('[data-ambient-flyby="italyCommonSwift"] img').count()).toBe(2);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());expect(await page.evaluate(()=>window.flybyPlays[0].audio.paused)).toBe(true);
});

test('failed play, media error and settings replacement clear tap ownership; master mute stays live',async({page},info)=>{
 await setup(page,'tap');await visible(page);
 await page.evaluate(()=>{const play=HTMLMediaElement.prototype.play;HTMLMediaElement.prototype.play=function(){if(!this.src.includes('/flybys/'))return play.call(this);HTMLMediaElement.prototype.play=play;return Promise.reject(new DOMException('Test autoplay denial','NotAllowedError'));};});
 await tap(page,info);await expect.poll(()=>page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
 await tap(page,info);await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0]?.ok)).toBe(true);
 await page.evaluate(()=>window.eval('audioConfig').volumes.master=0);
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0].audio.volume)).toBe(0);
 await page.evaluate(()=>window.eval('audioConfig').volumes.master=.5);
 await expect.poll(()=>page.evaluate(()=>window.flybyPlays[0].audio.volume)).toBeCloseTo(await page.evaluate(()=>.5*window.eval('level').ambientFlybys[0].soundVolume));
 await page.evaluate(()=>{const a=window.flybyPlays[0].audio;a.pause();a.dispatchEvent(new Event('error'));});
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
 await visible(page);await tap(page,info);await expect.poll(()=>page.evaluate(()=>window.flybyPlays.length)).toBe(2);
 await page.evaluate(()=>{const c=window.eval('level').ambientFlybys;c[0].soundTrigger='during';window.eval('setLevelAmbientFlybys')(c);});
 expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);expect(await page.evaluate(()=>window.flybyPlays[1].audio.paused)).toBe(true);
});


test('authored Wasp sound, volume and both trigger modes survive normal Apply and reload',async({page})=>{
 await setup(page,'tap');
 const original=await page.evaluate(()=>window.eval('level').ambientFlybys);
 for(const trigger of ['during','tap']){
  const payload=original.map(c=>({...c,soundTrigger:trigger}));
  const response=await page.request.post(base+'/__dev/levels/LVL-0032/apply-editor',{data:{ambientFlybys:payload}});
  expect(response.ok()).toBe(true);
  await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0032',{startImmediately:true,recordStart:false}));
  expect(await page.evaluate(()=>window.eval('level').ambientFlybys)).toEqual(payload);
 }
});
