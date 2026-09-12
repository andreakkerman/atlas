const {test,expect}=require('@playwright/test');
const fs=require('fs');
const sizes=(process.env.ATLAS_GROUP_SIZES||'32').split(',').map(Number);
for(const size of sizes)test(`Atlas matched grouping ${process.env.ATLAS_BASELINE_ASSET==='1'?12:size}`,async({page},info)=>{
 test.skip(process.env.ATLAS_PERFORMANCE_QA!=='1'||info.project.name!=='desktop-chromium','Opt-in sequential real WebGPU benchmark');test.setTimeout(300000);
 await page.setViewportSize({width:1180,height:734});
 if(process.env.ATLAS_PROFILE_TABLET==='1')await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});Object.defineProperty(window,'devicePixelRatio',{get:()=>2});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 if(process.env.ATLAS_BASELINE_ASSET==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/atlas-before-composition.glb',contentType:'model/gltf-binary'}));
  const before=require('child_process').execFileSync('git',['show','f8f16a3:src/three-renderer.js'],{encoding:'utf8'});
  await page.route('**/src/three-renderer.js*',r=>r.fulfill({body:before,contentType:'text/javascript'}));
 }
 if(process.env.ATLAS_GROUP_SIZES)await page.route('**/src/atlas-world-policy.js*',async r=>{
  const response=await r.fetch();let body=await response.text();
  // Experimental grouping only; all GPU work, assets and quality remain enabled.
  expect(body).toContain('?32:12');body=body.replace('?32:12',`?${size}:12`);
  await r.fulfill({response,body});
 });
 await page.addInitScript(()=>{
  window.benchmarkErrors=[];const request=GPUAdapter.prototype.requestDevice,destroy=GPUDevice.prototype.destroy;const intentional=new WeakSet();
  GPUDevice.prototype.destroy=function(...a){intentional.add(this);return Reflect.apply(destroy,this,a);};
  GPUAdapter.prototype.requestDevice=async function(...a){const d=await Reflect.apply(request,this,a);d.addEventListener('uncapturederror',e=>benchmarkErrors.push(e.error.message));d.lost.then(e=>{if(!intentional.has(d))benchmarkErrors.push('device lost '+e.reason);});return d;};
  addEventListener('unhandledrejection',e=>benchmarkErrors.push(String(e.reason)));
 });
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&profile3d=1');
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 const initial=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(initial.error).toBeNull();expect(initial.ready).toBe(true);
 const phases={};
 for(const phase of process.env.ATLAS_CAPTURE_ONLY==='1'?[]:['stationary','walking','turning','walking-looking']){
  await page.evaluate(()=>{window.eval('state.worldX=322');window.eval('threeRenderer').lookAt(-.08,.015);});await page.waitForTimeout(1000);
  const start=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().performanceProfile.samples.length);
  if(phase.includes('walking'))await page.keyboard.down('w');
  if(phase.includes('turning')||phase.includes('looking'))await page.evaluate(()=>{let angle=-.08;window.benchmarkTurn=setInterval(()=>window.eval('threeRenderer').lookAt(angle+=.016,.015),40);});
  await page.waitForTimeout(6500);await page.keyboard.up('w');await page.evaluate(()=>clearInterval(window.benchmarkTurn));
  const snapshot=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(snapshot.ready).toBe(true);
  const samples=snapshot.performanceProfile.samples.slice(start),mean=k=>samples.reduce((s,x)=>s+(Number(x[k])||0),0)/samples.length;
  phases[phase]={fps:1000/mean('interval'),cpu:mean('cpu'),draws:mean('draws'),shadowDraws:mean('shadowDraws'),shadowRefreshHz:mean('shadowRefresh')*1000/mean('interval'),triangles:mean('visibleTriangles'),pipelineTransitions:mean('pipelineSwitches'),traversalMs:mean('traversalAndCullingMs')};
  const shadow=samples.filter(x=>x.shadowRefresh),regular=samples.filter(x=>!x.shadowRefresh),average=(values,key)=>values.length?values.reduce((s,x)=>s+(x[key]||0),0)/values.length:null;
  phases[phase].shadowFrameCpuMs=average(shadow,'cpu');phases[phase].regularFrameCpuMs=average(regular,'cpu');phases[phase].shadowFrameDraws=average(shadow,'shadowDraws');
 }
 const views=process.env.ATLAS_REVIEW_POSES==='1'?[[1,322,-.4],[2,1017,-1.2],[3,1322,1.4],[4,1617,1.5]]:[[1,322,-1.1],[2,1017,1.5],[3,1322,1.4],[4,1617,2.9]];
 if(process.env.ATLAS_REVIEW_POSES==='1')await page.addStyleTag({content:'[data-tap-diagnostics]{visibility:hidden}'});
 for(const [i,x,yaw] of views){
  await page.evaluate(({x,yaw})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,0);},{x,yaw});await page.waitForTimeout(700);await page.screenshot({path:info.outputPath(`view-${i}.png`)});
 }
 const gpuErrors=await page.evaluate(()=>benchmarkErrors);fs.writeFileSync(info.outputPath('metrics.json'),JSON.stringify({size:process.env.ATLAS_BASELINE_ASSET==='1'?12:size,baseline:process.env.ATLAS_BASELINE_ASSET==='1',initial,phases,errors,gpuErrors},null,2));console.log(size,JSON.stringify(phases));expect(errors).toEqual([]);expect(gpuErrors).toEqual([]);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
});

