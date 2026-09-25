const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const frames=set=>fs.readdirSync(`assets/ambient/flybys/${set}`).filter(p=>p.endsWith('.png')).sort().map(p=>`assets/ambient/flybys/${set}/${p}`);
const controls={brightness:.8,contrast:1.2,saturation:.4,warmth:.5,tint:-.5,softness:1};
const button=page=>page.locator('[data-debug-action="preview-flyby"]').first();
const field=(page,key)=>page.locator(`[data-flyby-setting="${key}"]`).first();
test.beforeEach(async({page},info)=>{info.flybyErrors=[];page.on('pageerror',e=>info.flybyErrors.push(e.message));page.on('console',m=>{if(m.type()==='error')info.flybyErrors.push(m.text());});});
test.afterEach(async({},info)=>expect(info.flybyErrors).toEqual([]));
async function enter(page,mode='illustrated',extra={}){
 await page.goto(base+'/?dev=editor');
 await page.evaluate(async({mode,extra})=>{
  await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});window.eval('ambientFlybyRuntime').stopAll();
  const c={...window.eval('level').ambientFlybys[0],path:[{x:350,y:499},{x:1200,y:499}],scale:1,depthBias:-.1,motionProfile:'smooth',speed:60,mirrorX:true,rotateAlongPath:false,soundTriggers:[],brightness:1,contrast:1,warmth:0,tint:0,saturation:1,softness:0,...extra};
  await window.eval('setLevelAmbientFlybys')([c]);window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('walkPathEditor').selectedObjectType='flyby';window.eval('walkPathEditor').selectedObjectId=c.id;window.eval('walkPathEditor').editorMode='graphics';window.eval('render')();
 },{mode,extra});
 await page.keyboard.press('Control+Shift+D');await page.evaluate(()=>{window.eval('ambientFlybyRuntime').stopAll();document.querySelectorAll('[data-developer-tools] details').forEach(d=>d.open=true);});
 if(mode==='cinematic'&&await page.evaluate(()=>Boolean(navigator.gpu)))await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
 await page.clock.install();await page.clock.pauseAt(await page.evaluate(()=>new Date(Date.now()+100).toISOString()));
}
async function remember(page){await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');window.gInstance=[...r.active.values()][0];window.gCanvas=document.querySelector('[data-flyby-canvas]');window.gFrames=r.readiness.get('LVL-0034:'+gInstance.id).images;window.gMask=gInstance.mask;window.gFetch=0;window.gDecode=0;const fetch=window.fetch;window.fetch=function(...a){if(String(a[0]).includes('/bastion_'))gFetch++;return fetch.apply(this,a);};const decode=HTMLImageElement.prototype.decode;HTMLImageElement.prototype.decode=function(){if(gFrames.some(img=>img.src===this.src))gDecode++;return decode.call(this);};});}
async function snapshot(page){return page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),i=[...r.active.values()][0],c=document.querySelector('[data-flyby-canvas]'),ctx=c.getContext('2d'),p=ctx.getImageData(0,0,c.width,c.height).data;let rgb=0,alpha=0,hash=0;for(let n=0;n<p.length;n+=4){rgb+=p[n]+p[n+1]+p[n+2];alpha+=p[n+3];hash=(Math.imul(hash,31)+p[n+3])|0;}return {frame:i.frameIndex||0,distance:i.distance,progress:i.progress,elapsed:i.elapsed,held:!!i.held,rgb,alpha,hash,same:i===gInstance&&c===gCanvas,frames:r.readiness.get('LVL-0034:'+i.id).images===gFrames,mask:i.mask===gMask,filter:getComputedStyle(c.closest('.ambientFlybyFrames')).filter,transform:c.closest('[data-ambient-flyby]').style.transform};});}

test('graphics defaults, directions, alpha and validation',async({page})=>{
 await page.goto(base);const p=await page.evaluate(()=>{const a=window.AtlasAmbientSystem;
 const sample=c=>Array.from(a.adjustGraphics({data:new Uint8ClampedArray([64,128,192,128,0,0,0,0])},c).data);
 return {neutral:sample({}),explicit:sample({brightness:1,contrast:1,warmth:0,tint:0}),dark:sample({brightness:.8}),light:sample({brightness:1.2}),contrast:sample({contrast:1.5}),warm:sample({warmth:1}),cool:sample({warmth:-1}),magenta:sample({tint:1}),green:sample({tint:-1}),fallback:a.graphicsFor({brightness:NaN,contrast:Infinity}),invalid:['brightness','contrast','warmth','tint'].map(k=>a.sequenceErrors({frameA:'a.png',[k]:99}).some(e=>e.includes(k))),old:a.sequenceErrors({frameA:'a.png',softness:12,saturation:3})};});
 expect(p.neutral).toEqual([64,128,192,128,0,0,0,0]);expect(p.explicit).toEqual(p.neutral);
 for(const k of ['dark','light','contrast','warm','cool','magenta','green']){expect(p[k][3]).toBe(128);expect(p[k].slice(4)).toEqual([0,0,0,0]);}
 expect(p.dark[1]).toBeLessThan(128);expect(p.light[1]).toBeGreaterThan(128);expect(p.contrast[0]).toBeLessThan(64);expect(p.contrast[2]).toBeGreaterThan(192);
 expect(p.warm[0]).toBeGreaterThan(p.cool[0]);expect(p.warm[2]).toBeLessThan(p.cool[2]);expect(p.magenta[1]).toBeLessThan(p.green[1]);expect(p.magenta[0]).toBeGreaterThan(p.green[0]);expect(p.fallback.brightness).toBe(1);expect(p.fallback.contrast).toBe(1);expect(p.invalid).toEqual([true,true,true,true]);expect(p.old).toEqual([]);
});
for(const mode of ['illustrated','cinematic'])test(`live Graphics preserve real container depth and preview in ${mode}`,async({page},info)=>{
 await enter(page,mode);await button(page).click();await page.clock.runFor(120);await button(page).click();await remember(page);
 // Native sprite size projects differently across viewport scales. Establish a
 // partially occluded real-container pose, so both visible RGB and hidden alpha
 // can be tested (at -0.1 portrait can legitimately hide the whole sprite).
 await field(page,'depthOcclusion').uncheck();const raw=(await snapshot(page)).alpha;await field(page,'depthOcclusion').check();
 for(const bias of [-.1,-.075,-.05,-.025,-.01]){await field(page,'depthBias').fill(String(bias));const a=(await snapshot(page)).alpha;if(a>0&&a<raw)break;}
 const initial=await snapshot(page);expect(initial.alpha).toBeGreaterThan(0);expect(initial.alpha).toBeLessThan(raw);
 for(const [key,value] of Object.entries(controls)){
  await field(page,key).scrollIntoViewIfNeeded();await field(page,key).fill(String(value));const after=await snapshot(page);
  expect(after.same&&after.frames&&after.mask).toBe(true);expect([after.frame,after.distance,after.progress,after.transform,after.alpha,after.hash]).toEqual([initial.frame,initial.distance,initial.progress,initial.transform,initial.alpha,initial.hash]);
  if(['brightness','contrast','warmth','tint'].includes(key))expect(after.rgb).not.toBe(initial.rgb);
 }
 expect((await snapshot(page)).filter).toContain('blur(1px)');expect((await snapshot(page)).filter).toContain('saturate(0.4)');
 await page.clock.runFor(32);await page.screenshot({path:`output/flyby-graphics-${mode}-${info.project.name}.png`});
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(true));const debug=await snapshot(page);expect(debug.filter).toContain('saturate(1)');
 await field(page,'brightness').fill('1.8');await field(page,'saturation').fill('0');await field(page,'softness').fill('2');expect((await snapshot(page)).rgb).toBe(debug.rgb);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(false));await field(page,'depthBias').fill('0');expect((await snapshot(page)).alpha).toBeGreaterThan(initial.alpha);
 await button(page).click();const before=await snapshot(page);await field(page,'warmth').fill('-.2');await page.clock.runFor(200);const moving=await snapshot(page);expect(moving.same&&moving.frames).toBe(true);expect(moving.distance).toBeGreaterThan(before.distance);expect(moving.frame).toBeGreaterThan(before.frame);
 expect(await page.evaluate(()=>[gFetch,gDecode])).toEqual([0,0]);
 await page.locator('[data-debug-action="stop-preview-flyby"]').first().click();expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');return [r.active.size,r.activeAudio.size,r.timers.size];})).toEqual([0,0,0]);await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').readiness.size)).toBe(0);
});
for(const mode of ['static','legacy','hold'])test(`${mode} graphics use prepared source and retain final state`,async({page})=>{
 const set=mode==='hold'?'bastion_walk_aim':'bastion_walk';
 await enter(page,'illustrated',{frames:frames(set),playback:mode==='hold'?'once':'static',endBehavior:mode==='hold'?'hold':'despawn',animationFps:60,movementEndFrame:3,depthBias:.1});
 if(mode!=='hold')await page.evaluate(async mode=>{const c={...window.eval('level').ambientFlybys[0]};delete c.frames;delete c.playback;delete c.movementEndFrame;c.frameB=mode==='legacy'?'assets/ambient/flybys/bastion_walk/frame_002.png':null;await window.eval('setLevelAmbientFlybys')([c]);},mode);
 await button(page).click();await page.clock.runFor(mode==='hold'?4000:120);await button(page).click();await remember(page);const before=await snapshot(page);
 if(mode==='hold')expect(before.held).toBe(true);
 for(const [k,v]of Object.entries(controls))await field(page,k).fill(String(v));const after=await snapshot(page);expect(after.same&&after.frames).toBe(true);expect(after.frame).toBe(before.frame);expect(after.distance).toBe(before.distance);expect(after.alpha).toBe(before.alpha);expect(after.rgb).not.toBe(before.rgb);
 await button(page).click();await page.clock.runFor(300);if(mode==='hold'){expect((await snapshot(page)).frame).toBe(before.frame);expect((await snapshot(page)).held).toBe(true);}expect(await page.evaluate(()=>[gFetch,gDecode])).toEqual([0,0]);
});
test('Graphics Apply reload persists only instance values',async({page})=>{
 await enter(page);for(const [k,v]of Object.entries(controls))await field(page,k).fill(String(v));await page.clock.resume();
 await page.getByRole('button',{name:'Apply',exact:true}).click();await expect(page.getByText('Draft Status: Applied')).toBeVisible();await page.reload();
 await page.evaluate(async()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false}));
 expect(await page.evaluate(()=>window.AtlasAmbientSystem.graphicsFor(window.eval('level').ambientFlybys[0]))).toEqual(controls);
});
