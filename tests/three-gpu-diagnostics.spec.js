const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

test('native typed-array range failure records sizes, pass and stack then restores the method',async({page})=>{
 await page.goto(`${base}/?debug3d=1`);
 const data=await page.evaluate(()=>{
  const prototype=Object.getPrototypeOf(Uint8Array.prototype),original=prototype.set;
  const trace=AtlasThreeGpuDiagnostics.create({});let caught;
  trace.checkpoint('Beeld 1/3: renderer en post-processing','pending');
  try{trace.withPass('GTAO',()=>new Float32Array(4).set(new Float32Array(5),1));}catch(error){caught=error.name;}
  const failure=trace.snapshot().firstFailure;trace.cleanup();
  return {caught,failure,restored:prototype.set===original};
 });
 expect(data.caught).toBe('RangeError');expect(data.restored).toBe(true);
 expect(data.failure.type).toBe('typed-array-set');expect(data.failure.pass).toBe('GTAO');
 expect(data.failure.copy.destination.length).toBe(4);expect(data.failure.copy.source.length).toBe(5);expect(data.failure.copy.offset).toBe(1);
 expect(data.failure.error.stack).toBeTruthy();
 await expect(page.locator('[data-tap-diagnostics]')).toContainText('Foutbron: typed-array-set');
});
test('shader failure, scope errors and device loss remain distinct from cleanup',async({page})=>{
 await page.goto(`${base}/?debug3d=1`);
 const result=await page.evaluate(async()=>{
  let lose,throwShader=false,scopeError=null;
  const device=new EventTarget();Object.assign(device,{
   lost:new Promise(resolve=>lose=resolve),
   createShaderModule:d=>{if(throwShader)throw new DOMException('Unable to make shader module.','InvalidStateError');return {label:d.label};},
   pushErrorScope(){},popErrorScope:async()=>{const error=scopeError;scopeError=null;return error;},
   createRenderPipeline(){return {};},createRenderPipelineAsync:async()=>({}),createComputePipeline(){return {};},createComputePipelineAsync:async()=>({})
  });
  const trace=AtlasThreeGpuDiagnostics.create(device),mesh={name:'test rock',type:'Mesh',material:{name:'stone',type:'MeshStandardMaterial'}};
  const renderer={renderObject(o,s,c,g,m){return device.createShaderModule({label:'fragment_ShadowMaterial',code:'same source'});}};
  trace.attach(renderer);
  trace.checkpoint('Beeld 1/3: renderer en post-processing','pending');
  trace.withPass('Wereld en schaduwen',()=>renderer.renderObject(mesh,null,null,null,mesh.material));
  trace.checkpoint('Beeld 2/3: renderer en post-processing','pending');throwShader=true;
  try{trace.withPass('Wereld en schaduwen',()=>renderer.renderObject(mesh,null,null,null,mesh.material));}catch{}
  const beforeLoss=trace.snapshot();
  device.dispatchEvent(Object.assign(new Event('uncapturederror'),{error:{name:'GPUInternalError',message:'injected uncaptured error'}}));
  scopeError={name:'GPUOutOfMemoryError',message:'injected allocation failure'};
  try{await trace.scope('view 2',async()=>{});}catch{}
  lose({reason:'unknown',message:'GPU connection lost'});await Promise.resolve();trace.cleanup();
  const afterLoss=trace.snapshot();
  let lateLoss;const second=Object.assign(new EventTarget(),{...device,lost:new Promise(resolve=>lateLoss=resolve)});
  const cleanupTrace=AtlasThreeGpuDiagnostics.create(second);cleanupTrace.cleanup();lateLoss({reason:'destroyed',message:''});await Promise.resolve();
  return {beforeLoss,afterLoss,cleanupLoss:cleanupTrace.snapshot().loss};
 });
 expect(result.beforeLoss.loss).toBeNull();
 expect(result.beforeLoss.firstFailure.error.name).toBe('InvalidStateError');
 expect(result.beforeLoss.firstFailure.shader.newSource).toBe(false);
 expect(result.beforeLoss.firstFailure.shader.firstSeen).toContain('Beeld 1/3');
 expect(result.beforeLoss.firstFailure.shader.object.material).toBe('stone');
 expect(result.beforeLoss.firstFailure.shader.pass).toBe('Wereld en schaduwen');
 expect(result.afterLoss.events.some(e=>e.type==='error-scope'&&e.error.name==='GPUOutOfMemoryError')).toBe(true);
 expect(result.afterLoss.events.some(e=>e.type==='uncapturederror'&&e.error.name==='GPUInternalError')).toBe(true);
 expect(result.afterLoss.loss.cleanupAlreadyRequested).toBe(false);
 expect(result.cleanupLoss.cleanupAlreadyRequested).toBe(true);
});

test('normal mode installs no shader diagnostic hooks',async({page})=>{
 await page.goto(base);expect(await page.evaluate(()=>typeof AtlasThreeGpuDiagnostics)).toBe('undefined');
 await expect(page.locator('[data-tap-diagnostics]')).toHaveCount(0);
});

test('known device loss prevents the next initialization operation from running',async({page})=>{
 await page.route('**/assets/vendor/three/loaders/*.js',r=>r.fulfill({contentType:'application/javascript',body:'export class GLTFLoader {} export class HDRLoader {} export class DRACOLoader {}'}));
 await page.route('**/assets/vendor/three/three.webgpu.min.js',r=>r.fulfill({contentType:'application/javascript',body:'export class WebGPURenderer { constructor(){this.backend={context:{unconfigure(){}}};this.info={render:{}};} init(){window.initCalls++;return Promise.resolve();} dispose(){} }'}));
 await page.goto(base);
 const result=await page.evaluate(async()=>{
  document.querySelector('#app').innerHTML='<canvas data-three-canvas></canvas>';
  let notifyLoss,destroyed=0;window.initCalls=0;
  const device={lost:{then(callback){notifyLoss=callback;}},destroy(){destroyed++;}};
  Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:async()=>({requestDevice:async()=>device})}});
  const runtime=AtlasThreeRenderer.createRuntime({getRenderer:()=> '3d',getLevel:()=>({id:'LVL-0001'}),onStatus(s){if(s.diagnostic==='renderer.init uitvoeren')notifyLoss({reason:'unknown',message:'injected device loss at boundary'});}});
  await runtime.sync();return {initCalls:window.initCalls,destroyed,status:runtime.snapshot().status,error:runtime.snapshot().error};
 });
 expect(result.initCalls).toBe(0);expect(result.destroyed).toBe(1);expect(result.status).toBe('error');expect(result.error).toContain('injected device loss');
});

