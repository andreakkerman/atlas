const {test,expect}=require('@playwright/test');
const fs=require('fs');
const base='http://127.0.0.1:4173';
for(const mode of ['illustrated','cinematic'])test(`real Riven Tides depth comparison and debug in ${mode}`,async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await page.goto(base+'/?dev=editor');
 await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false}));
 await page.evaluate(mode=>{window.eval('ambientFlybyRuntime').stopAll();window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
 if(mode==='cinematic'&&info.project.name==='desktop-chromium')await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
 const measurements=[];
 for(const bias of [0,.98,-.1])for(const x of [70,350,750]){
 const row=await page.evaluate(async({bias,x})=>{
  const r=window.eval('ambientFlybyRuntime'),l=window.eval('level');r.stopAll();
  const c={...l.ambientFlybys[0],depthBias:bias,path:[{x,y:499},{x:x+1,y:499}],motionProfile:'linear',playback:'static'};
  await window.eval('setLevelAmbientFlybys')([c]);r.stopAll();r.preview(c.id);const instance=r.active.get(c.id);instance.held=true;
  await new Promise(requestAnimationFrame);
  const canvas=document.querySelector('[data-flyby-canvas]'),pixels=canvas.getContext('2d').getImageData(0,0,640,360).data;
  const image=r.readiness.get(l.id+':'+c.id).images[0],raw=document.createElement('canvas');raw.width=640;raw.height=360;raw.getContext('2d').drawImage(image,0,0);const original=raw.getContext('2d').getImageData(0,0,640,360).data;
  const map=new Image();map.src=window.AtlasAmbientSystem.depthPathFor(l);await map.decode();const dc=document.createElement('canvas');dc.width=map.naturalWidth;dc.height=map.naturalHeight;dc.getContext('2d').drawImage(map,0,0);const d=dc.getContext('2d').getImageData(0,0,dc.width,dc.height).data;
  const sample=(wx,wy)=>d[(Math.max(0,Math.min(dc.height-1,Math.round(wy/l.world.height*(dc.height-1))))*dc.width+Math.max(0,Math.min(dc.width-1,Math.round(wx/l.world.width*(dc.width-1)))))*4]/255;
  const foot={x,y:499+360*.46/instance.scaleY},actor=sample(foot.x,foot.y),biased=Math.max(0,Math.min(1,actor+bias));
  const rect=canvas.getBoundingClientRect(),track=document.querySelector('.worldTrack').getBoundingClientRect();let rawAlpha=0,alpha=0,mismatch=0,transformError=0;const categories={};
  for(let py=0;py<360;py++)for(let px=0;px<640;px++){
   const i=(py*640+px)*4;if(original[i+3]!==255)continue;
   const wx=x-(px+.5-320)/instance.scaleX,wy=499+(py+.5-180)/instance.scaleY,scene=sample(wx,wy),expected=Math.round(255*Math.max(0,Math.min(1,(biased-scene)/.01+1)));
   const sx=(rect.right-(px+.5)-track.left)/instance.scaleX,sy=(rect.top+py+.5-track.top)/instance.scaleY;
   transformError=Math.max(transformError,Math.abs(wx-sx),Math.abs(wy-sy));
   rawAlpha+=255;alpha+=pixels[i+3];if(Math.abs(pixels[i+3]-expected)>1)mismatch++;
   const category=wx>220&&wx<500&&wy>450&&wy<510?'container':wx>550&&wx<850&&wy>430&&wy<500?'background':wy>580?'ground':null;
   if(category&&!categories[category])categories[category]={sprite:[px,py],world:[wx,wy],scene,actor,biased,nearer:scene>biased,expected,actual:pixels[i+3]};
  }
  r.setDepthDebug(true);const debug=instance.depthDebug;r.setDepthDebug(false);
  return {x,bias,actor,biased,alpha,rawAlpha,mismatch,transformError,categories,debug};
 },{bias,x});
 expect(row.mismatch).toBe(0);expect(row.transformError).toBeLessThan(.02);expect(row.debug.rawDepth).toBe(row.actor);measurements.push(row);
 if(x===350)await page.screenshot({path:`output/riven-${mode}-${info.project.name}-bias${bias}.png`});
 }
 fs.writeFileSync(`output/riven-${mode}-${info.project.name}-samples.json`,JSON.stringify(measurements,null,2));
 const get=(bias,x)=>measurements.find(r=>r.bias===bias&&r.x===x);
 expect(get(.98,350).alpha).toBe(get(.98,350).rawAlpha);
 expect(get(0,350).categories.container.actual).toBe(255);
 expect(get(-.1,350).categories.container.actual).toBe(0);
 expect(get(-.1,350).alpha).toBeLessThan(get(0,350).alpha);
 expect(get(-.1,750).categories.background.actual).toBe(255);
 await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(true));await page.screenshot({path:`output/riven-${mode}-${info.project.name}-debug.png`});
 expect(errors).toEqual([]);
});


for(const kind of ['static','legacy','loop','once','hold'])for(const set of ['bastion_walk','bastion_walk_aim'])test(`real Riven Tides ${kind} ${set} masking and debug cleanup`,async({page})=>{
 await page.goto(base+'/?dev=editor');await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false}));await page.clock.install();

  const frames=fs.readdirSync(`assets/ambient/flybys/${set}`).filter(f=>f.endsWith('.png')).sort().map(f=>`assets/ambient/flybys/${set}/${f}`);
  await page.evaluate(async({kind,frames})=>{const r=window.eval('ambientFlybyRuntime');r.stopAll();const c={...window.eval('level').ambientFlybys[0],frames,frameA:frames[0],frameB:null,depthBias:-.1,path:[{x:550,y:499},{x:551,y:499}],motionProfile:'linear',speed:1,animationFps:60,playback:kind==='hold'?'once':kind,movementEndFrame:1,endBehavior:kind==='hold'?'hold':'despawn'};if(kind==='legacy'){delete c.frames;delete c.playback;c.frameB=frames[1];}await window.eval('setLevelAmbientFlybys')([c]);r.stopAll();r.setDepthDebug(true);r.preview(c.id);}, {kind,frames});
  await page.clock.runFor(kind==='hold'?1800:32);
  const result=await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),inst=[...r.active.values()][0];if(!inst)return {active:false};const canvas=document.querySelector('[data-flyby-canvas]');const debug=inst.depthDebug; r.setDepthDebug(false);const p=canvas.getContext('2d').getImageData(0,0,640,360).data;let alpha=0;for(let i=3;i<p.length;i+=4)alpha+=p[i];window.eval('state').cameraX+=50;window.eval('render')();return {active:true,held:!!inst.held,frame:inst.frameIndex||0,alpha,debug,retained:document.querySelector('[data-flyby-canvas]')===canvas,diagnosticsCleared:!inst.depthDebug};});
  expect(result.active).toBe(true);expect(result.alpha).toBeGreaterThan(0);expect(result.alpha).toBeLessThan(10000000);expect(result.retained).toBe(true);expect(result.diagnosticsCleared).toBe(true);expect(result.debug.bias).toBe(-.1);
  if(kind==='hold'){expect(result.held).toBe(true);expect(result.frame).toBe(frames.length-1);const a=result.debug.rawDepth;await page.clock.runFor(100);expect(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.setDepthDebug(true);return [...r.active.values()][0].depthDebug.rawDepth;})).toBe(a);}
 await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.size)).toBe(0);
 await page.goto(base);expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').setDepthDebug(true))).toBe(false);
});


for(const mode of ['illustrated','cinematic'])test(`real container crossing retains the moving canvas in ${mode}`,async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(base+'/?dev=editor');await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false}));
 await page.evaluate(async mode=>{const r=window.eval('ambientFlybyRuntime');r.stopAll();const c={...window.eval('level').ambientFlybys[0],depthBias:-.1,path:[{x:70,y:499},{x:750,y:499}],motionProfile:'linear',speed:680,playback:'loop'};await window.eval('setLevelAmbientFlybys')([c]);r.stopAll();window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
 if(mode==='cinematic'&&info.project.name==='desktop-chromium')await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
 await page.clock.install();await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime');r.preview(window.eval('level').ambientFlybys[0].id);window.crossingCanvas=document.querySelector('[data-flyby-canvas]');});
 const samples=[];
 for(let step=0;step<10;step++){
  await page.clock.runFor(90);
  samples.push(await page.evaluate(()=>{const r=window.eval('ambientFlybyRuntime'),instance=[...r.active.values()][0],canvas=document.querySelector('[data-flyby-canvas]');const p=canvas.getContext('2d').getImageData(0,0,640,360).data;let alpha=0;for(let i=3;i<p.length;i+=4)alpha+=p[i];window.eval('state').cameraX+=2;window.eval('render')();return {progress:instance.progress,alpha,retained:document.querySelector('[data-flyby-canvas]')===window.crossingCanvas,active:canvas.closest('[data-ambient-flyby]').dataset.active};}));
 }
 expect(samples.every(s=>s.retained&&s.active==='true')).toBe(true);expect(samples[0].alpha).toBeGreaterThan(0);const middle=samples.filter(s=>s.progress>.3&&s.progress<.6);expect(middle.length).toBeGreaterThan(0);expect(samples.at(-1).alpha).toBeGreaterThan(Math.min(...middle.map(s=>s.alpha)));expect(errors).toEqual([]);
});
