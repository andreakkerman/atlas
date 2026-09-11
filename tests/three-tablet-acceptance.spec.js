const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test.use({viewport:{width:1180,height:734},deviceScaleFactor:2,hasTouch:true});

// Real renderer, real native GPU calls. This is a tablet configuration acceptance
// path in Chromium, not a substitute for Safari's GPU implementation.
for(const height of [734,689])test(`Tablet Optimized real GPU acceptance: 1180x${height}`,async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real WebGPU.');
 test.setTimeout(600000);
 page.setDefaultTimeout(20000);
 await page.setViewportSize({width:1180,height});
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});
  Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
  const e=window.tabletQA={errors:[],operations:[],textures:[],pipelines:[],anisotropy:[],fences:0,submits:0,devices:0,destroyed:0,gtao:0};
  let operation='page startup',phase='page startup';const destroyed=new WeakSet(),checks=[];
  const fail=(error,detail={})=>e.errors.push({operation,name:error?.name,message:String(error?.message||error),stack:String(error?.stack||''),...detail});
  window.addEventListener('error',event=>fail(event.error||event.message));
  window.addEventListener('unhandledrejection',event=>fail(event.reason));
  window.addEventListener('atlas-three-preparation',event=>{operation=event.detail.operation;if(event.detail.state==='pending'&&/^Warm-up \d+\/|^Eerste speelbare frame op|^Wereld- en schaduwpipelines/.test(operation))phase=operation;if(event.detail.state==='complete'&&/^Warm-up \d+\/|^Eerste speelbare frame op/.test(operation))e.operations.push({operation,fences:e.fences,submits:e.submits,resolution:window.eval('threeRenderer.snapshot')().resolution});});
  const wrap=(target,name,handler)=>{const original=target[name];target[name]=function(...args){return handler(original,this,args);};};
  wrap(Object.getPrototypeOf(Uint8Array.prototype),'set',(fn,self,args)=>{
   try{return Reflect.apply(fn,self,args);}catch(error){fail(error,{api:'TypedArray.set',destination:{length:self.length,byteOffset:self.byteOffset,bufferBytes:self.buffer.byteLength},sourceLength:args[0]?.length,offset:args[1]||0});throw error;}
  });
  for(const name of ['writeBuffer','writeTexture'])wrap(GPUQueue.prototype,name,(fn,self,args)=>{
   try{return Reflect.apply(fn,self,args);}catch(error){fail(error,{api:name,sourceBytes:args[name==='writeBuffer'?2:1]?.byteLength,layout:name==='writeTexture'?args[2]:{bufferOffset:args[1],dataOffset:args[3],size:args[4]},extent:name==='writeTexture'?args[3]:null});throw error;}
  });
  wrap(GPUBuffer.prototype,'getMappedRange',(fn,self,args)=>{try{return Reflect.apply(fn,self,args);}catch(error){fail(error,{api:'getMappedRange',bufferSize:self.size,args});throw error;}});
  wrap(GPUDevice.prototype,'destroy',(fn,self,args)=>{destroyed.add(self);e.destroyed++;return Reflect.apply(fn,self,args);});
  wrap(GPUAdapter.prototype,'requestDevice',async(fn,self,args)=>{
   const device=await Reflect.apply(fn,self,args);e.devices++;
   device.addEventListener('uncapturederror',event=>fail(event.error,{api:'uncapturederror'}));
   device.lost.then(loss=>{if(!destroyed.has(device))fail({name:'DeviceLost',message:loss.reason+': '+loss.message});});
   return device;
  });
  wrap(GPUQueue.prototype,'submit',(fn,self,args)=>{const result=Reflect.apply(fn,self,args);e.submits++;return result;});
  wrap(GPUQueue.prototype,'onSubmittedWorkDone',async(fn,self,args)=>{const result=await Reflect.apply(fn,self,args);e.fences++;return result;});
  wrap(GPUDevice.prototype,'createShaderModule',(fn,self,args)=>{
   const module=Reflect.apply(fn,self,args);if(/GTAO|VolumeNodeMaterial|Bloom|GaussianBlur/.test(args[0].label))e.gtao++;
   checks.push(module.getCompilationInfo().then(result=>{for(const m of result.messages)if(m.type==='error')fail({name:'ShaderError',message:m.message},{label:module.label});}));return module;
  });
  wrap(GPUDevice.prototype,'createTexture',(fn,self,args)=>{const d=args[0],result=Reflect.apply(fn,self,args);e.textures.push({operation,phase,label:d.label,format:d.format,size:d.size,actualSize:[result.width,result.height],samples:result.sampleCount});return result;});
  wrap(GPUDevice.prototype,'createSampler',(fn,self,args)=>{e.anisotropy.push(args[0]?.maxAnisotropy||1);return Reflect.apply(fn,self,args);});
  for(const name of ['createRenderPipeline','createRenderPipelineAsync'])wrap(GPUDevice.prototype,name,(fn,self,args)=>{const d=args[0];e.pipelines.push({operation,phase,label:d.vertex.module.label,samples:d.multisample?.count||1});return Reflect.apply(fn,self,args);});
  window.finishTabletChecks=()=>Promise.all(checks);
  const trackedSet=Object.getPrototypeOf(Uint8Array.prototype).set;
  window.tabletHooksRestored=()=>Object.getPrototypeOf(Uint8Array.prototype).set===trackedSet;
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(`${base}/?dev=editor&level=LVL-0001&debug3d=1&rendererPreset=tablet-optimized`);
 expect(await page.evaluate(()=>devicePixelRatio)).toBe(2);
 const snapshot=()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')());
 const choose=async mode=>{if(!await page.locator(`[data-renderer-choice="${mode}"]`).isVisible())await page.locator('[data-graphics-action="toggle"]').click();await page.locator(`[data-renderer-choice="${mode}"]`).click();};
 try{
  for(let entry=0;entry<2;entry++){
   const before=await page.evaluate(()=>({operations:window.tabletQA.operations.length,fences:window.tabletQA.fences,textures:window.tabletQA.textures.length}));
   await choose('3d');
   console.log(`Tablet ${height}, entry ${entry+1}: preparation started`);
   await expect(page.locator('[data-three-loading]')).toBeVisible();
   await expect(page.locator('[data-three-canvas]')).toBeHidden();
   await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
   const s=await snapshot();expect(s.error,JSON.stringify(await page.evaluate(()=>window.tabletQA.errors))).toBeNull();
   console.log(`Tablet ${height}, entry ${entry+1}: ${s.status}, ${s.warmupViews} frames prepared`);
   expect(s.status).toBe('ready');expect(s.backend).toBe('WebGPU');expect(s.resolution).toEqual([885,Math.round(height*.75)]);
   expect(s.configuration.preset).toEqual({id:'tablet-optimized',name:'Tablet Optimized',worldSamples:1,effectSamples:1,dprCap:.75,shadowSize:1024,volumeResolution:0,volumeSteps:0,gtao:false,bloom:false,anisotropy:2,textureCap:1024,environmentCap:512});
   expect(s.configuration.presentationSamples).toBe(1);expect(s.configuration.presentationDepth).toBe(false);
   expect(s.actualEffects).toEqual({gtao:false,bloom:false,volumeSteps:0,volumeResolution:0});
   expect(s.textureBudget.maxLongEdge).toBeLessThanOrEqual(1024);expect(s.textureBudget.resized).toBeGreaterThan(0);expect(s.textureBudget.resizedBytes).toBeLessThan(s.textureBudget.sourceBytes);
   expect(s.preparationCompleted).toBe(5);expect(s.warmupViews).toBe(4);
   const operations=await page.evaluate(n=>window.tabletQA.operations.slice(n),before.operations);
   expect(operations).toHaveLength(4);
   for(let n=0;n<3;n++){
    expect(operations[n].operation).toMatch(new RegExp(`^Warm-up ${n+1}/3:`));
    expect(operations[n].resolution).toEqual([512,Math.round(height*512/1180)]);
    expect(operations[n].fences).toBeGreaterThan(n?operations[n-1].fences:before.fences);
   }
   expect(operations[3].operation).toContain('Eerste speelbare frame op volledige resolutie');
   expect(operations[3].fences).toBeGreaterThan(operations[2].fences);
   await expect(page.locator('[data-three-canvas]')).toBeVisible();await expect(page.locator('[data-three-loading]')).toBeHidden();
   expect(await page.evaluate(()=>window.tabletHooksRestored())).toBe(true);
   const box=await page.locator('[data-three-canvas]').boundingBox(),x=await page.evaluate(()=>window.eval('state.worldX'));
   const clip={x:Math.round(box.x+box.width*.3),y:Math.round(box.y+box.height*.35),width:Math.round(box.width*.3),height:Math.round(box.height*.2)};
   const beforePixels=await page.screenshot({clip});
   const cdp=await page.context().newCDPSession(page),pad=await page.locator('[data-three-move]').boundingBox();
   const finger={id:1,x:pad.x+pad.width/2,y:pad.y+pad.height/2};
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger]});finger.y-=40;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[finger]});
   await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(x+2);
   const yaw=(await snapshot()).yaw;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger,{id:2,x:box.width*.6,y:box.height*.4}]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[finger,{id:2,x:box.width*.7,y:box.height*.4}]});
   await expect.poll(async()=>(await snapshot()).yaw).not.toBe(yaw);
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await cdp.detach();
   for(let n=0;n<5;n++){const frames=(await snapshot()).frames;await page.waitForTimeout(4000);const after=await snapshot();expect(after.status).toBe('ready');expect(after.frames).toBeGreaterThan(frames);}
   expect((await page.screenshot({clip})).equals(beforePixels),'World pixels must change, not just the HUD/input state').toBe(false);
   await page.evaluate(()=>window.finishTabletChecks());
   const e=await page.evaluate(()=>window.tabletQA);
   const allocated=e.textures.slice(before.textures);expect(allocated.length).toBeGreaterThan(0);expect(allocated.every(t=>Math.max(...t.actualSize)<=1024)).toBe(true);
   expect(allocated.some(t=>t.actualSize[0]===512&&t.actualSize[1]===256&&t.format==='rgba16float')).toBe(true);
   expect(allocated.some(t=>t.label==='PMREM.cubeUv'&&t.actualSize[0]===384&&t.actualSize[1]===512)).toBe(true);
   expect(e.errors).toEqual([]);expect(e.gtao).toBe(0);expect(Math.max(...e.anisotropy)).toBe(2);
   expect(e.textures.some(t=>t.format.startsWith('depth')&&t.size.width===1024&&t.size.height===1024)).toBe(true);
   const effects=e.pipelines.filter(p=>/^Warm-up/.test(p.phase));
   expect(effects.length).toBeGreaterThan(0);expect(effects.every(p=>p.samples===1)).toBe(true);
   await choose('illustrated');await expect(page.locator('.worldArt')).toBeVisible();
   await choose('cinematic');await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer.snapshot')().status),{timeout:60000}).toBe('ready');
  }
  await page.evaluate(()=>window.finishTabletChecks());
  expect((await page.evaluate(()=>window.tabletQA)).errors).toEqual([]);
 }finally{
  const file=info.outputPath('tablet-runtime-evidence.json'),fs=require('node:fs');fs.mkdirSync(require('node:path').dirname(file),{recursive:true});
  fs.writeFileSync(file,JSON.stringify({snapshot:await snapshot(),journal:await page.evaluate(()=>JSON.parse(localStorage.getItem('atlas3d-debug-preparation-v1'))),gpu:await page.evaluate(()=>window.tabletQA)},null,2));
  await info.attach('tablet-runtime-evidence',{path:file,contentType:'application/json'});
 }
});
