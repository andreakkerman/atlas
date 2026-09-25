const {test,expect}=require('@playwright/test');
const path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test.beforeEach(async({page},info)=>{info.previewErrors=[];page.on('pageerror',e=>info.previewErrors.push(e.message));page.on('console',m=>{if(m.type()==='error')info.previewErrors.push(m.text());});});
test.afterEach(async({},info)=>expect(info.previewErrors).toEqual([]));
async function enter(page,mode='illustrated',extra={}){
 await page.goto(base+'/?dev=editor');
 await page.evaluate(async({mode,extra})=>{await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});const r=window.eval('ambientFlybyRuntime');r.stopAll();const c={...window.eval('level').ambientFlybys[0],path:[{x:350,y:499},{x:1200,y:499}],depthBias:0,motionProfile:'smooth',speed:60,mirrorX:true,rotateAlongPath:false,soundTriggers:[],...extra};await window.eval('setLevelAmbientFlybys')([c]);window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('walkPathEditor').selectedObjectType='flyby';window.eval('walkPathEditor').selectedObjectId=c.id;window.eval('walkPathEditor').editorMode='graphics';window.eval('render')();}, {mode,extra});
 await page.keyboard.press('Control+Shift+D');
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopAll());
 await page.evaluate(()=>document.querySelectorAll('[data-developer-tools] details').forEach(d=>d.open=true));
 if(mode==='cinematic' && await page.evaluate(()=>Boolean(navigator.gpu)))await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
 await page.clock.install();
 await page.clock.pauseAt(await page.evaluate(()=>new Date(Date.now()+100).toISOString()));
}
const button=page=>page.locator('[data-debug-action="preview-flyby"]').first();
const field=(page,key)=>page.locator(`[data-flyby-setting="${key}"]`).first();
async function snapshot(page){return page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),i=[...r.active.values()][0],canvas=document.querySelector('[data-flyby-canvas]');let alpha=0;if(canvas){const p=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;for(let n=3;n<p.length;n+=4)alpha+=p[n];}return {state:i?r.previewState(i.id):'idle',frame:i?.frameIndex||0,distance:i?.distance,progress:i?.progress,time:i?.animationTime,elapsed:i?.elapsed,alpha,same:!window.previewRef||i===window.previewRef,canvasSame:!window.previewCanvas||canvas===window.previewCanvas,timers:r.timers.size};});}
for(const mode of ['illustrated','cinematic'])test(`paused real Riven Tides preview tunes depth in place in ${mode}`,async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await enter(page,mode);
 if(mode==='cinematic'&&info.project.name==='desktop-chromium')await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
 await expect(button(page)).toHaveText('Preview Flyby');await button(page).click();await expect(button(page)).toHaveText('Pause Preview');await page.clock.runFor(120);await button(page).click();await expect(button(page)).toHaveText('Resume Preview');
 await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');window.previewRef=[...r.active.values()][0];window.previewCanvas=document.querySelector('[data-flyby-canvas]');window.previewMask=window.previewRef.mask;window.previewFrames=r.readiness.get('LVL-0034:'+window.previewRef.id).images;});const frozen=await snapshot(page);await page.clock.runFor(2000);expect(await snapshot(page)).toEqual(frozen);
 await field(page,'depthBias').fill('-0.10');const masked=await snapshot(page);expect(masked.alpha).toBeLessThan(frozen.alpha);expect(masked.distance).toBe(frozen.distance);expect(masked.frame).toBe(frozen.frame);expect(masked.same&&masked.canvasSame).toBe(true);
 const rawAlpha=await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),i=window.previewRef,img=r.readiness.get('LVL-0034:'+i.id).images[i.frameIndex||0],c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);const p=ctx.getImageData(0,0,c.width,c.height).data;let a=0;for(let n=3;n<p.length;n+=4)a+=p[n];return a;});
 await field(page,'depthOcclusion').uncheck();expect((await snapshot(page)).alpha).toBe(rawAlpha);await field(page,'depthOcclusion').check();expect((await snapshot(page)).alpha).toBe(masked.alpha);
 await field(page,'depthBias').scrollIntoViewIfNeeded();
 await page.evaluate(()=>window.biasControl=document.querySelector('[data-flyby-setting="depthBias"]'));
 for(const bias of ['-0.08','-0.11','-0.10'])await field(page,'depthBias').fill(bias);
 expect(await page.evaluate(()=>document.querySelector('[data-flyby-setting="depthBias"]')===window.biasControl)).toBe(true);
 await expect(field(page,'depthBias')).toBeInViewport();
 expect(await page.evaluate(()=>window.previewRef.mask===window.previewMask&&window.eval('ambientFlybyRuntime').readiness.get('LVL-0034:'+window.previewRef.id).images===window.previewFrames)).toBe(true);
 await page.clock.runFor(32);
 await page.screenshot({path:`output/flyby-paused-preview-${mode}-${info.project.name}.png`});
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(true));expect(await page.evaluate(()=>window.previewRef.depthDebug.bias)).toBe(-.1);await field(page,'depthBias').fill('-0.09');expect(await page.evaluate(()=>window.previewRef.depthDebug.bias)).toBe(-.09);await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(false));
 await field(page,'scale').fill('0.9');await field(page,'mirrorX').uncheck();await field(page,'faceFlightDirection').check();await field(page,'rotateAlongPath').check();await field(page,'speed').fill('180');await field(page,'animationFps').fill('12');
 await page.evaluate(()=>{window.eval('state').cameraX+=40;window.eval('render')();});const tuned=await snapshot(page);expect(tuned.same&&tuned.canvasSame).toBe(true);expect(tuned.frame).toBe(frozen.frame);expect(tuned.distance).toBe(frozen.distance);
 await button(page).click();await page.clock.runFor(300);const resumed=await snapshot(page);expect(resumed.same).toBe(true);expect(resumed.distance).toBeGreaterThan(tuned.distance);expect(resumed.frame).toBeGreaterThan(tuned.frame);expect(resumed.frame-tuned.frame).toBeLessThanOrEqual(4);
 await page.locator('[data-debug-action="stop-preview-flyby"]').first().click();await expect(button(page)).toHaveText('Preview Flyby');expect((await snapshot(page)).state).toBe('idle');expect(errors).toEqual([]);
});

for(const playback of ['static','legacy','loop','once','hold'])test(`${playback} preview freezes and resumes without recurrence`,async({page})=>{
 const frames=Array.from({length:5},(_,i)=>`assets/ambient/flybys/bastion_walk/frame_${String(i+1).padStart(3,'0')}.png`);
 await enter(page,'illustrated',{frames,playback:playback==='hold'?'once':playback==='legacy'?'static':playback,animationFps:10,movementEndFrame:3,endBehavior:playback==='hold'?'hold':'despawn',intervalMinMs:100,intervalMaxMs:100});
 if(playback==='legacy')await page.evaluate(async()=>{const c={...window.eval('level').ambientFlybys[0]};delete c.frames;delete c.playback;delete c.movementEndFrame;c.frameB='assets/ambient/flybys/bastion_walk/frame_002.png';await window.eval('setLevelAmbientFlybys')([c]);});
 await button(page).click();await page.clock.runFor(120);await button(page).click();const paused=await snapshot(page);await page.clock.runFor(500);expect(await snapshot(page)).toEqual(paused);
 await button(page).click();await page.clock.runFor(140);const moving=await snapshot(page);expect(moving.elapsed).toBeGreaterThan(paused.elapsed);
 if(playback==='hold'){await page.clock.runFor(500);expect(await page.evaluate(()=>[...window.eval('ambientFlybyRuntime').active.values()][0].held)).toBe(true);const held=await snapshot(page);await button(page).click();await button(page).click();await page.clock.runFor(1000);const after=await snapshot(page);expect(after.frame).toBe(held.frame);expect(after.distance).toBe(held.distance);}
 else if(playback==='once'){await page.clock.runFor(1000);expect((await snapshot(page)).state).toBe('idle');expect((await snapshot(page)).timers).toBe(0);}
 else {await button(page).click();await page.locator('[data-debug-action="stop-preview-flyby"]').first().click();}
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').stopPreview());await page.clock.runFor(2000);expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);
});

test('path and asset changes keep paused preview ownership; selection and editor close clean up',async({page})=>{
 await enter(page);await button(page).click();await page.clock.runFor(200);await button(page).click();const paused=await snapshot(page);
 await page.evaluate(async()=>{const r=window.eval('ambientFlybyRuntime');window.previewRef=[...r.active.values()][0];const c=window.eval('level').ambientFlybys[0];window.eval('updateFlybyPathPoint')(c.id,1,{x:1500,y:499});});
 expect((await snapshot(page)).progress).toBe(paused.progress);
 await page.evaluate(async()=>{const c={...window.eval('level').ambientFlybys[0],frames:['assets/ambient/flybys/bastion_walk_aim/frame_001.png','assets/ambient/flybys/bastion_walk_aim/frame_002.png']};await Promise.all([window.eval('setLevelAmbientFlybys')([c]),window.eval('setLevelAmbientFlybys')([{...c,depthBias:.1}])]);});
 const rebuilt=await snapshot(page);expect(rebuilt.state).toBe('paused');expect(rebuilt.same).toBe(true);expect(rebuilt.frame).toBe(0);expect(rebuilt.progress).toBe(paused.progress);expect(rebuilt.alpha).toBeGreaterThan(0);
 await field(page,'playback').selectOption('once');const changedMode=await snapshot(page);expect(changedMode.state).toBe('paused');expect(changedMode.same).toBe(true);expect(changedMode.progress).toBe(paused.progress);
 await page.keyboard.press('Control+Shift+D');expect((await snapshot(page)).state).toBe('idle');
 await page.keyboard.press('Control+Shift+D');await button(page).click();await button(page).click();await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');return [r.active.size,r.timers.size,r.readiness.size];})).toEqual([0,0,0]);
});

test('pause resume does not replay During audio or repeat completion actions',async({page})=>{
 await enter(page,'illustrated',{playback:'once',frames:Array.from({length:5},(_,i)=>`assets/ambient/flybys/bastion_walk/frame_${String(i+1).padStart(3,'0')}.png`),animationFps:10,movementEndFrame:3,endBehavior:'hold',soundTriggers:['during'],actions:{onAnimationComplete:'preview-complete'}});
 await page.evaluate(()=>{window.audioPlays=0;window.audioPauses=0;window.completions=0;window.AtlasAmbientSystem.registerAction('preview-complete',()=>window.completions++);window.eval('audioState').unlocked=true;for(const s of window.eval('ambientFlybyRuntime').readiness.values())s.sound=true;window.Audio=class {constructor(src){this.src=src;this.currentTime=0;this.duration=10;}addEventListener(){}play(){if(this.src?.includes('bastion'))window.audioPlays++;return Promise.resolve();}pause(){if(this.src?.includes('bastion'))window.audioPauses++;}};});
 await button(page).click();await page.clock.runFor(120);await button(page).click();await page.clock.runFor(300);await button(page).click();await page.clock.runFor(500);expect(await page.evaluate(()=>[window.audioPlays,window.completions])).toEqual([1,1]);
 await button(page).click();await button(page).click();await page.clock.runFor(500);expect(await page.evaluate(()=>[window.audioPlays,window.completions])).toEqual([1,1]);
 await page.locator('[data-debug-action="stop-preview-flyby"]').first().click();expect(await page.evaluate(()=>window.audioPauses)).toBe(1);
});

test('playing speed changes in place and selection stops only preview ownership',async({page})=>{
 await enter(page);await button(page).click();await page.clock.runFor(100);
 const before=await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),i=[...r.active.values()][0];window.previewRef=i;const distance=i.distance;window.eval('updateAmbientFlybySetting')(i.id,'speed',180);return {distance,after:i.distance,elapsed:i.elapsed};});expect(before.after).toBe(before.distance);
 await page.clock.runFor(200);const after=await snapshot(page);expect(after.same).toBe(true);expect(after.distance-before.distance).toBeCloseTo((after.elapsed-before.elapsed)*180,3);
 await button(page).click();await page.evaluate(async()=>{const c=window.eval('level').ambientFlybys[0];await window.eval('setLevelAmbientFlybys')([c,{...c,id:'second-preview'}]);});
 await page.locator('[data-select-ambient-id="second-preview"]').first().click();expect((await snapshot(page)).state).toBe('idle');
 for(let i=0;i<3;i++){await button(page).click();await button(page).click();await button(page).click();await page.locator('[data-debug-action="stop-preview-flyby"]').first().click();expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');return [r.active.size,r.timers.size,r.activeAudio.size];})).toEqual([0,0,0]);}
});
