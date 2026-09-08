const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

test('a throwing renderer disposer cannot retain the owned device or hide the startup error',async({page})=>{
 await page.route('**/assets/vendor/three/loaders/*.js',route=>route.fulfill({contentType:'application/javascript',body:'export class GLTFLoader {} export class HDRLoader {} export class DRACOLoader {}'}));
 await page.route('**/assets/vendor/three/three.webgpu.min.js',route=>route.fulfill({contentType:'application/javascript',body:`export class WebGPURenderer {constructor(){this.backend={context:{unconfigure(){window.unconfigured++}}}} async init(){throw new RangeError('injected initialization failure')} dispose(){throw new Error('injected disposer failure')}}`}));
 await page.goto(base);
 const result=await page.evaluate(async()=>{
  document.querySelector('#app').innerHTML='<canvas data-three-canvas></canvas>';
  window.unconfigured=0;let destroyed=0;
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:async()=>({destroy:()=>destroyed++})})}});
  const runtime=AtlasThreeRenderer.createRuntime({getRenderer:()=> '3d',getLevel:()=>({id:'LVL-0001'})});
  await runtime.sync();return {destroyed,unconfigured:window.unconfigured,status:runtime.snapshot().status,diagnostic:runtime.snapshot().diagnostic};
 });
 expect(result.destroyed).toBe(1);expect(result.unconfigured).toBe(1);expect(result.status).toBe('error');expect(result.diagnostic).toContain('RangeError: injected initialization failure');
});

test('device arriving after cancellation is destroyed and cannot revive startup',async({page})=>{
 await page.goto(base);
 const result=await page.evaluate(async()=>{
  document.querySelector('#app').innerHTML='<canvas data-three-canvas></canvas>';
  let resolveDevice,destroyed=0,requested=false;
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:()=>{requested=true;return new Promise(resolve=>resolveDevice=resolve);}})}});
  const runtime=AtlasThreeRenderer.createRuntime({getRenderer:()=> '3d',getLevel:()=>({id:'LVL-0001'})});
  const pending=runtime.sync();while(!requested)await new Promise(resolve=>setTimeout(resolve,0));
  runtime.dispose();resolveDevice({destroy:()=>destroyed++});await pending;
  return {destroyed,status:runtime.snapshot().status};
 });
 expect(result).toEqual({destroyed:1,status:'idle'});
});

for(const action of ['failure','cancel','stall','stall-cancel'])test(`warm-up ${action} releases the GPU device and allows Cinematic Lighting`,async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires a real WebGPU device.');
 test.setTimeout(300000);
 await page.addInitScript(action=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
  window.destroyedDevices=0;window.triggered=false;window.stall=false;
  const timeout=window.setTimeout;
  window.setTimeout=(fn,ms,...args)=>timeout(fn,action==='stall'&&window.stall&&ms===90000?3000:ms,...args);
  const fence=GPUQueue.prototype.onSubmittedWorkDone;let stalledQueue;
  GPUQueue.prototype.onSubmittedWorkDone=function(...args){if(window.stall&&(!stalledQueue||stalledQueue===this)){stalledQueue=this;return new Promise(resolve=>window.finishStaleFence=resolve);}return Reflect.apply(fence,this,args);};
  const adapter=navigator.gpu.requestAdapter.bind(navigator.gpu);
  navigator.gpu.requestAdapter=(...args)=>{if(window.triggered&&window.destroyedDevices===0)return Promise.resolve(null);return adapter(...args);};
  const destroy=GPUDevice.prototype.destroy;
  GPUDevice.prototype.destroy=function(...args){window.destroyedDevices++;return Reflect.apply(destroy,this,args);};
  const write=GPUQueue.prototype.writeBuffer;let fail=false;
  GPUQueue.prototype.writeBuffer=function(...args){if(fail){fail=false;throw new RangeError('Range consisting of offset and length are out of bounds');}return Reflect.apply(write,this,args);};
  window.addEventListener('atlas-three-preparation',event=>{
   if(action.startsWith('stall')){
    if(!window.triggered&&event.detail.operation.startsWith('Warm-up 1/3:')&&event.detail.state==='complete'){window.triggered=window.stall=true;}
    return;
   }
   if(window.triggered||!event.detail.operation.startsWith('Warm-up 1/3:')||event.detail.state!=='pending')return;
   window.triggered=true;
   if(action==='failure')fail=true;
   else window.eval('threeRenderer.dispose')();
  });
 },action);
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(`${base}/?dev=editor&level=LVL-0001&debug3d=1`);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="3d"]').click();
 await expect.poll(()=>page.evaluate(()=>window.triggered),{timeout:240000}).toBe(true);
 if(action.startsWith('stall')){
  await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().warmupViews)).toBe(1);
  await page.evaluate(()=>{for(let i=0;i<3;i++)window.eval('render')();});
  await expect(page.locator('[data-three-loading]')).toBeVisible();
  await expect(page.locator('[data-three-canvas]')).toBeHidden();
  expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().ready)).toBe(false);
  if(action==='stall-cancel')await page.locator('[data-three-recover]').click();
 }
 const failed=action==='failure'||action==='stall';
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().status),{timeout:10000}).toBe(failed?'error':'idle');
 expect(await page.evaluate(()=>window.destroyedDevices)).toBe(1);
 if(failed){
  await expect(page.locator('[data-three-diagnostic]')).toContainText(action==='stall'?'TimeoutError: Beeld 2/3':'RangeError: Range consisting');
  await expect(page.locator('[data-three-recover]')).toBeVisible();
  await page.evaluate(()=>window.eval('render')());
  expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('error');
  await expect(page.locator('[data-three-loading]')).toBeVisible();
 }
 await page.evaluate(()=>{window.eval('voxelRenderer.updateSettings')({renderer:'cinematic'});window.eval('render')();});
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer.snapshot')().status),{timeout:60000}).toBe('ready');
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('idle');
 if(action.startsWith('stall')){await page.evaluate(()=>window.finishStaleFence?.());expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().status)).toBe('idle');}
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});
