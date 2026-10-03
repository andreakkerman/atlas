const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test('transient producer publishes empty, active, cleared and restarted frames',async({page})=>{
 await page.setContent('<canvas data-scene-effects-canvas="worldLight"></canvas>');
 await page.addScriptTag({path:require('path').join(__dirname,'../src/scene-effects.js')});
 const result=await page.evaluate(()=>{
  const level={id:'transient-test',world:{width:400,height:400},sceneEffects:[]};let transient=[];
  const runtime=AtlasSceneEffects.createRuntime({getLevel:()=>level,getScreen:()=> 'scene',getTransientEffects:()=>transient});
  const canvas=document.querySelector('canvas'),read=()=>({frame:AtlasSceneEffects.canvasFrame(canvas),visible:canvas.getContext('2d').getImageData(0,0,400,400).data.some((v,i)=>i%4===3&&v>0)});
  runtime.prepareLevel(level);const empty=read();
  transient=[AtlasSceneEffects.defaultInstance('light-source-enhancement','large-brazier',level.world)];runtime.sync();const active=read();
  transient=[];runtime.sync();const cleared=read();
  transient=[AtlasSceneEffects.defaultInstance('light-source-enhancement','large-brazier',level.world)];runtime.sync();const restarted=read();runtime.dispose();const stopped=read();
  return {empty,active,cleared,restarted,stopped};
 });
 expect(result.empty.visible).toBe(false);expect(result.empty.frame.active).toBe(false);
 for(const key of ['active','restarted']){expect(result[key].visible).toBe(true);expect(result[key].frame.active).toBe(true);}
 for(const key of ['cleared','stopped']){expect(result[key].visible).toBe(false);expect(result[key].frame.active).toBe(false);}
 expect(result.cleared.frame.revision).toBeGreaterThan(result.active.frame.revision);expect(result.restarted.frame.revision).toBeGreaterThan(result.cleared.frame.revision);
});
async function difference(page,a,b){return page.evaluate(async images=>{
 const read=async src=>{const image=new Image();image.src='data:image/png;base64,'+src;await image.decode();const c=document.createElement('canvas');c.width=image.width;c.height=image.height;const ctx=c.getContext('2d');ctx.drawImage(image,0,0);return ctx.getImageData(0,0,c.width,c.height).data;};
 const [a,b]=await Promise.all(images.map(read));let sum=0;for(let i=0;i<a.length;i++)if(i%4!==3)sum+=Math.abs(a[i]-b[i]);return sum/(a.length*.75);
},[a.toString('base64'),b.toString('base64')]);}
for(const dpr of [1,2])test(`neutral Illustrated ownership preserves frozen production composition at DPR ${dpr}`,async({browser},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Native WebGPU');test.setTimeout(90000);
 const context=await browser.newContext({viewport:{width:1180,height:734},deviceScaleFactor:dpr,serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage();
 try {
 await page.addInitScript(()=>{
  // Use the controller's existing timing hook to freeze idle blinking too.
  let locomotionAPI;Object.defineProperty(window,'AtlasLocomotion',{configurable:true,get:()=>locomotionAPI,set:api=>{const create=api.createController;api.createController=options=>create({...options,blinkDelay:()=>2147483647});locomotionAPI=api;}});
  const raf=requestAnimationFrame;window.requestAnimationFrame=fn=>window.freezeEffects&&fn.name==='draw'?0:raf(fn);
  const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===128){data=data.slice();data[5]=10;}return write.call(this,buffer,offset,data,...rest);};
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0004');await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
 await page.addStyleTag({content:'*,*::before,*::after{animation-play-state:paused!important;transition:none!important}'});
 for(const id of ['LVL-0004','LVL-0001']){
  await page.evaluate(async id=>{window.freezeEffects=false;window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')(id,{startImmediately:true,recordStart:false,allowDisabledForEditor:true});window.eval('worldResolver').updateLevelSettings(id,{illustratedFeatures:{globalLighting:true,globalGrading:false,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('render')();window.eval('locomotion').reset();window.freezeEffects=true;},id);
  // Global Lighting also controls the DOM emissive-glow producer. Apply the
  // real render gate before freezing rather than only syncing the GPU owner.
  await expect(page.locator('[data-emissive-glow-canvas]')).toBeHidden();
  const toggle=async enabled=>{
   await page.evaluate(({id,enabled})=>{const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings(id).cinematicLighting);s.grading={...s.grading,enabled:true,exposure:0,contrast:1,saturation:1,highlights:0,shadows:0,warmth:0,tint:0,blackPoint:0};r.updateLevelSettings(id,{cinematicLighting:s,illustratedFeatures:{globalLighting:true,globalGrading:enabled,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('cinematicRenderer').sync();},{id,enabled});
   await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');await page.waitForTimeout(200);
  };
  await toggle(false);const before=await page.screenshot({path:info.outputPath(id+'-'+dpr+'-dom.png')});
  const actorBox=await page.locator('[data-actor="sven"]').boundingBox(),actorBefore=await page.screenshot({clip:actorBox});
  await toggle(true);const after=await page.screenshot({path:info.outputPath(id+'-'+dpr+'-full.png')}),actorAfter=await page.screenshot({clip:actorBox});
  const mae=await difference(page,before,after),actorMae=await difference(page,actorBefore,actorAfter);console.log('NEUTRAL_PARITY',id,dpr,{mae,actorMae});
  await toggle(false);const restored=await page.screenshot();expect(await difference(page,before,restored)).toBeLessThan(.1);
  expect.soft(mae).toBeLessThan(1);
  expect.soft(actorMae).toBeLessThan(4);
  if(id==='LVL-0004'){
   const shadowImpact=async full=>{
    await toggle(full);await page.evaluate(()=>window.eval('locomotion').reset());
    const clip={x:Math.max(0,actorBox.x-45),y:Math.max(0,actorBox.y-45),width:actorBox.width+90,height:actorBox.height+90};
    const on=await page.screenshot({clip});
    await page.locator('[data-actor-shell="sven"]').evaluate(e=>e.style.filter='none');
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    const off=await page.screenshot({clip});
    await page.locator('[data-actor-shell="sven"]').evaluate(e=>e.style.removeProperty('filter'));
    return difference(page,on,off);
   };
   const domImpact=await shadowImpact(false),fullImpact=await shadowImpact(true);
   console.log('SPRITE_FILTER_PARITY',dpr,{domImpact,fullImpact});
   expect(domImpact).toBeGreaterThan(.05);
   expect(fullImpact).toBeGreaterThan(domImpact*.7);
   expect(Math.abs(fullImpact-domImpact)).toBeLessThan(domImpact*.3);
  }
 }
 } finally {await context.close();}
});
test('producer revisions suppress empty and unchanged uploads across recovery',async({page},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Native WebGPU');
 test.setTimeout(90000);
 await page.addInitScript(()=>{
  const raf=requestAnimationFrame;
  window.requestAnimationFrame=fn=>window.freezeEffects&&fn.name==='draw'?0:raf(fn);
  window.gpuFrames=[];let current={passes:0,draws:0,uploads:0,empty:0},draws=0;
  window.liveGPU={textures:new Set(),buffers:new Set()};
  for(const [kind,create,prototype] of [['textures','createTexture',GPUTexture.prototype],['buffers','createBuffer',GPUBuffer.prototype]]){
   const make=GPUDevice.prototype[create],destroy=prototype.destroy;
   GPUDevice.prototype[create]=function(...args){const value=make.apply(this,args);liveGPU[kind].add(value);return value;};
   prototype.destroy=function(...args){liveGPU[kind].delete(this);return destroy.apply(this,args);};
  }
  const wrap=(proto,key,fn)=>{const original=proto[key];proto[key]=function(...args){fn(args);return original.apply(this,args);};};
  wrap(GPUCommandEncoder.prototype,'beginRenderPass',()=>{current.passes++;draws=0;});
  wrap(GPURenderPassEncoder.prototype,'draw',()=>{current.draws++;draws++;});
  wrap(GPURenderPassEncoder.prototype,'end',()=>{if(!draws)current.empty++;});
  wrap(GPUQueue.prototype,'copyExternalImageToTexture',args=>{if(args[0].source?.matches?.('[data-scene-effects-canvas]'))current.uploads++;});
  wrap(GPUQueue.prototype,'submit',()=>{gpuFrames.push(current);current={passes:0,draws:0,uploads:0,empty:0};});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0004');
 await page.waitForFunction(()=>typeof window.AtlasCinematicRenderer!=='undefined' && window.eval('typeof selectLevel')==='function');
 await page.evaluate(async()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')('LVL-0004',{startImmediately:true,recordStart:false,allowDisabledForEditor:true});});
 const flags=async enabled=>page.evaluate(enabled=>{window.eval('worldResolver').updateLevelSettings('LVL-0004',{illustratedFeatures:{globalLighting:true,globalGrading:typeof enabled==='boolean'?enabled:false,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true,...(typeof enabled==='object'?enabled:{})}});window.eval('render')();},enabled);
 const ready=async()=>expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
 for(const dpr of [1,2]){
  const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setDeviceMetricsOverride',{width:1180,height:734,deviceScaleFactor:dpr,mobile:false});
  await page.evaluate(()=>{window.freezeEffects=false;});
  const metrics={};
  for(const [name,value] of Object.entries({baseline:false,grading:true,area:{areaDirectionalLights:true},combined:{globalGrading:true,areaDirectionalLights:true},depth:{sceneDepth:true}})){
   await flags(value);await ready();await page.waitForTimeout(150);await page.evaluate(()=>gpuFrames.length=0);
   const pacing=await page.evaluate(()=>new Promise(resolve=>{const frames=[];let last=performance.now();function sample(now){frames.push(now-last);last=now;if(frames.length===30)resolve(frames);else requestAnimationFrame(sample);}requestAnimationFrame(sample);}));
   metrics[name]=await page.evaluate(()=>({frames:gpuFrames,snapshot:window.eval('cinematicRenderer').snapshot(),live:{textures:liveGPU.textures.size,buffers:liveGPU.buffers.size}}));metrics[name].pacing=pacing;
   expect(metrics[name].frames.every(f=>f.empty===0&&f.passes===(name==='baseline'?3:5))).toBe(true);
  }
  console.log('COMPOSITOR_METRICS',dpr,JSON.stringify(Object.fromEntries(Object.entries(metrics).map(([name,m])=>[name,{passes:m.frames.at(-1).passes,draws:m.frames.at(-1).draws,uploads:m.frames.reduce((s,f)=>s+f.uploads,0)/m.frames.length,targets:m.snapshot.renderTargets,live:m.live,cpuMs:m.snapshot.averageMs,fps:30000/m.pacing.reduce((s,t)=>s+t,0)}]))));
  await info.attach(`metrics-dpr-${dpr}.json`,{body:JSON.stringify(metrics),contentType:'application/json'});
  await flags(true);await ready();
  await page.evaluate(()=>{window.freezeEffects=true;});
  await page.waitForTimeout(150);
  await page.evaluate(()=>gpuFrames.length=0);await page.waitForTimeout(250);
  const frozen=await page.evaluate(()=>gpuFrames);
  expect(frozen.length).toBeGreaterThan(2);expect(frozen.every(f=>f.uploads===0&&f.empty===0&&f.passes===5)).toBe(true);
  // The production clear publishes emptiness; no old texture may be drawn.
  await page.evaluate(()=>{window.eval('sceneEffectRuntime').pause();gpuFrames.length=0;});await page.waitForTimeout(150);
  const cleared=await page.evaluate(()=>gpuFrames);
  expect(cleared.every(f=>f.uploads===0&&f.draws===frozen.at(-1).draws-2)).toBe(true);
  await page.evaluate(()=>{gpuFrames.length=0;window.eval('sceneEffectRuntime').play();});await page.waitForTimeout(150);
  const resumed=await page.evaluate(()=>gpuFrames);
  expect(resumed.reduce((sum,f)=>sum+f.uploads,0)).toBe(2);
  expect(resumed.at(-1).draws).toBe(frozen.at(-1).draws);
  await flags(false);await ready();expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().renderTargets)).toBe(1);
  await flags(true);await ready();expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().renderTargets)).toBe(2);
  await page.evaluate(()=>{window.eval('cinematicRenderer').dispose();window.eval('cinematicRenderer').sync();});await ready();
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().renderTargets)).toBe(2);
  await info.attach(`dpr-${dpr}.json`,{body:JSON.stringify({frozen,cleared,resumed}),contentType:'application/json'});
 }
 await page.evaluate(()=>window.eval('returnToMenu')());
 expect(await page.evaluate(()=>({textures:liveGPU.textures.size,buffers:liveGPU.buffers.size,scheduled:window.eval('cinematicRenderer').snapshot().scheduled}))).toEqual({textures:0,buffers:0,scheduled:false});
 await page.evaluate(async()=>{await window.eval('selectLevel')('LVL-0001',{startImmediately:true,recordStart:false});await window.eval('selectLevel')('LVL-0004',{startImmediately:true,recordStart:false});});
 const cycleResources={};
 for(let cycle=0;cycle<3;cycle++){
  for(const enabled of [true,false]){
   await flags(enabled);await ready();
   const resources=await page.evaluate(()=>({textures:liveGPU.textures.size,buffers:liveGPU.buffers.size}));
   // Available NPC sprites can change after visiting another level. Compare
   // identical post-transition recipes, not the earlier scene's sprite count.
   if(cycle===0)cycleResources[enabled]=resources;
   else expect(resources).toEqual(cycleResources[enabled]);
  }
 }
 await page.evaluate(()=>window.eval('returnToMenu')());
 expect(await page.evaluate(()=>({textures:liveGPU.textures.size,buffers:liveGPU.buffers.size,scheduled:window.eval('cinematicRenderer').snapshot().scheduled}))).toEqual({textures:0,buffers:0,scheduled:false});
});


