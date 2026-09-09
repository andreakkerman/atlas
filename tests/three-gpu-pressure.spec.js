const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
for(const stall of [false,true])test(`Cinematic to compact 3D to Cinematic, stalled frame ${stall}`,async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real WebGPU.');
 test.setTimeout(300000);
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
  const request=GPUAdapter.prototype.requestDevice,destroy=GPUDevice.prototype.destroy,fence=GPUQueue.prototype.onSubmittedWorkDone,submit=GPUQueue.prototype.submit;
  const live=new Set();let threeQueue;
  window.gpuEvidence={created:0,destroyed:0,peak:0,submitsWhileStalled:0};
  GPUAdapter.prototype.requestDevice=async function(...args){const d=await Reflect.apply(request,this,args);live.add(d);const e=window.gpuEvidence;e.created++;e.peak=Math.max(e.peak,live.size);if(e.created===2)threeQueue=d.queue;return d;};
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
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:240000}).toBe('ready');
 expect(await page.evaluate(()=>window.gpuEvidence.peak)).toBe(1);
 expect(await page.evaluate(()=>window.gpuEvidence.destroyed)).toBe(1);
 if(stall){
  await page.evaluate(()=>window.stallFrame=true);
  await page.waitForTimeout(2000);
  const before=await page.evaluate(()=>({frames:window.eval('threeRenderer.snapshot')().frames,submits:window.gpuEvidence.submitsWhileStalled}));
  await page.evaluate(()=>window.eval('threeRenderer.sync')());
  await page.waitForTimeout(1000);
  expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().frames)).toBe(before.frames);
  expect(await page.evaluate(()=>window.gpuEvidence.submitsWhileStalled)).toBe(before.submits);
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:20000}).toBe('error');
  await expect(page.locator('[data-three-diagnostic]')).toContainText('GPU-frame afronden');
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
  await info.attach('rendered-world-change',{body:JSON.stringify({fractionOfPixelsChanged:changed}),contentType:'application/json'});
 }
 await choose('illustrated');await expect(page.locator('.worldArt')).toBeVisible();
 await choose('cinematic');await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer.snapshot')().status),{timeout:60000}).toBe('ready');
 expect(await page.evaluate(()=>window.gpuEvidence.peak)).toBe(1);
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});
