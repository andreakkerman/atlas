const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
// Physical M3 iPad evidence: 1180x734 CSS pixels at the runtime's 1.5 DPR cap.
test.use({viewport:{width:1180,height:734},deviceScaleFactor:2});
for(const failure of ['none','stall','validation','lost'])test(`Cinematic to compact 3D to Cinematic, failure ${failure}`,async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real WebGPU.');
 test.setTimeout(300000);
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
  const request=GPUAdapter.prototype.requestDevice,destroy=GPUDevice.prototype.destroy,fence=GPUQueue.prototype.onSubmittedWorkDone,submit=GPUQueue.prototype.submit;
  const live=new Set();let threeQueue;
  window.presentationSamples=[];window.depthSamples=[];
  const pipeline=GPUDevice.prototype.createRenderPipeline,texture=GPUDevice.prototype.createTexture;
  GPUDevice.prototype.createRenderPipeline=function(d){if(d.vertex?.module?.label==='vertex_PostProcessing')window.presentationSamples.push(d.multisample?.count||1);return Reflect.apply(pipeline,this,[d]);};
  GPUDevice.prototype.createTexture=function(d){if(d.label==='depth')window.depthSamples.push(d.sampleCount||1);return Reflect.apply(texture,this,[d]);};
  window.gpuEvidence={created:0,destroyed:0,peak:0,submitsWhileStalled:0,errors:[],shaderErrors:[]};
  const shader=GPUDevice.prototype.createShaderModule;
  GPUDevice.prototype.createShaderModule=function(descriptor){const module=Reflect.apply(shader,this,[descriptor]);module.getCompilationInfo().then(info=>{for(const message of info.messages)if(message.type==='error')window.gpuEvidence.shaderErrors.push({label:descriptor.label,message:message.message});});return module;};
  GPUAdapter.prototype.requestDevice=async function(...args){const d=await Reflect.apply(request,this,args);d.addEventListener('uncapturederror',event=>window.gpuEvidence.errors.push(event.error.message));live.add(d);const e=window.gpuEvidence;e.created++;e.peak=Math.max(e.peak,live.size);if(e.created===2){threeQueue=d.queue;window.threeTestDevice=d;}return d;};
  GPUDevice.prototype.destroy=function(...args){if(live.delete(this))window.gpuEvidence.destroyed++;return Reflect.apply(destroy,this,args);};
  GPUQueue.prototype.onSubmittedWorkDone=function(...args){if(window.stallFrame&&this===threeQueue)return new Promise(()=>{});return Reflect.apply(fence,this,args);};
  GPUQueue.prototype.submit=function(...args){if(window.stallFrame&&this===threeQueue)window.gpuEvidence.submitsWhileStalled++;return Reflect.apply(submit,this,args);};
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0001');
 const choose=async mode=>{await page.evaluate(mode=>{window.eval('voxelRenderer.updateSettings')({renderer:mode});window.eval('render')();},mode);};
 await choose('cinematic');
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer.snapshot')().status),{timeout:60000}).toBe('ready');
 await choose('3d');
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 await info.attach('gpu-validation',{body:JSON.stringify(await page.evaluate(()=>window.gpuEvidence),null,2),contentType:'application/json'});
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().error)).toBeNull();
 expect(await page.evaluate(()=>window.gpuEvidence.shaderErrors)).toEqual([]);
 expect(await page.evaluate(()=>window.gpuEvidence.errors)).toEqual([]);
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().resolution)).toEqual([1770,1101]);
 expect(await page.evaluate(()=>window.presentationSamples)).toContain(1);
 expect(await page.evaluate(()=>window.presentationSamples)).not.toContain(4);
 expect(await page.evaluate(()=>window.depthSamples)).toContain(4);
 expect(await page.evaluate(()=>window.gpuEvidence.peak)).toBe(1);
 expect(await page.evaluate(()=>window.gpuEvidence.destroyed)).toBe(1);
 if(failure==='stall'){
  await page.evaluate(()=>window.stallFrame=true);
  await page.waitForTimeout(2000);
  const before=await page.evaluate(()=>({frames:window.eval('threeRenderer.snapshot')().frames,submits:window.gpuEvidence.submitsWhileStalled}));
  await page.evaluate(()=>window.eval('threeRenderer.sync')());
  await page.waitForTimeout(1000);
  expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().frames)).toBe(before.frames);
  expect(await page.evaluate(()=>window.gpuEvidence.submitsWhileStalled)).toBe(before.submits);
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:20000}).toBe('error');
  await expect(page.locator('[data-three-diagnostic]')).toContainText('GPU-frame afronden');
 }else if(failure==='validation'||failure==='lost'){
  await page.evaluate(kind=>{
   if(kind==='validation')window.threeTestDevice.createBuffer({size:4,usage:0});
   else window.threeTestDevice.destroy();
  },failure);
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('error');
 }else{
  const x=await page.evaluate(()=>window.eval('state.worldX'));
  await page.keyboard.down('w');await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(x+2);await page.keyboard.up('w');
  // A changing target/position does not prove that the GPU presents new images.
  // Compare world pixels away from controls, HUD and the companion strip.
  const box=await page.locator('[data-three-canvas]').boundingBox();
  const clip={x:Math.round(box.x+box.width*.25),y:Math.round(box.y+box.height*.3),width:Math.round(box.width*.4),height:Math.round(box.height*.25)};
  const before=(await page.screenshot({clip})).toString('base64');
  const frames=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().frames);
  await page.mouse.move(box.x+box.width*.4,box.y+box.height*.4);await page.mouse.down();
  await page.mouse.move(box.x+box.width*.7,box.y+box.height*.4,{steps:12});await page.mouse.up();
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().frames)).toBeGreaterThan(frames+2);
  const after=(await page.screenshot({clip})).toString('base64');
  const changed=await page.evaluate(async data=>{
   const pixels=await Promise.all(data.map(async png=>{const img=new Image();img.src='data:image/png;base64,'+png;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return ctx.getImageData(0,0,c.width,c.height).data;}));
   let count=0;for(let i=0;i<pixels[0].length;i+=4)if(Math.abs(pixels[0][i]-pixels[1][i])+Math.abs(pixels[0][i+1]-pixels[1][i+1])+Math.abs(pixels[0][i+2]-pixels[1][i+2])>60)count++;
   return count/(pixels[0].length/4);
  },[before,after]);
  expect(changed).toBeGreaterThan(.2);
  // Sustain movement well beyond the physical 15–20 second failure boundary.
  await page.keyboard.down('w');
  for(let i=0;i<9;i++){
   const previous=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().frames);
   await page.waitForTimeout(5000);
   const current=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());
   expect(current.status).toBe('ready');expect(current.frames).toBeGreaterThan(previous);
  }
  await page.keyboard.up('w');
  expect(await page.evaluate(()=>window.gpuEvidence.shaderErrors)).toEqual([]);
  expect(await page.evaluate(()=>window.gpuEvidence.errors)).toEqual([]);
  await info.attach('rendered-world-change',{body:JSON.stringify({fractionOfPixelsChanged:changed}),contentType:'application/json'});
 }
 if(failure!=='none'){
  await expect(page.locator('[data-three-loading-title]')).toHaveText('De 3D-weergave is gestopt');
  await expect(page.locator('[data-three-progress-label]')).toHaveText('5 van 5 stappen voltooid');
  expect(await page.evaluate(()=>window.gpuEvidence.destroyed)).toBe(2);
 }
 await choose('illustrated');await expect(page.locator('.worldArt')).toBeVisible();
 await choose('cinematic');await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer.snapshot')().status),{timeout:60000}).toBe('ready');
 expect(await page.evaluate(()=>window.gpuEvidence.peak)).toBe(1);
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});
