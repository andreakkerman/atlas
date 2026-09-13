const {test,expect}=require('@playwright/test');
const fs=require('fs');
const sizes=(process.env.ATLAS_GROUP_SIZES||'32').split(',').map(Number);
if(process.env.ATLAS_PROFILE_TABLET==='1')test.use({deviceScaleFactor:2,hasTouch:true});
for(const size of sizes)test(`Atlas matched grouping ${process.env.ATLAS_BASELINE_ASSET==='1'?12:size}`,async({page},info)=>{
 test.skip(process.env.ATLAS_PERFORMANCE_QA!=='1'||info.project.name!=='desktop-chromium','Opt-in sequential real WebGPU benchmark');test.setTimeout(300000);
 await page.setViewportSize(process.env.ATLAS_ART_POSES==='1'&&process.env.ATLAS_CAPTURE_ONLY==='1'?{width:1840,height:1034}:{width:1180,height:734});
 if(process.env.ATLAS_PROFILE_TABLET==='1')await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});Object.defineProperty(window,'devicePixelRatio',{get:()=>2});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 if(process.env.ATLAS_GRASS_COVERAGE_ASSET)await page.route('**/atlas-3d.glb',r=>r.fulfill({path:process.env.ATLAS_GRASS_COVERAGE_ASSET,contentType:'model/gltf-binary'}));
 if(process.env.ATLAS_SKY_VARIANT)for(const file of ['three-renderer.js','atlas-world-policy.js'])await page.route('**/src/'+file+'*',r=>r.fulfill({path:`output/golden-hour/${process.env.ATLAS_SKY_VARIANT}/${file}`,contentType:'text/javascript'}));
 if(process.env.ATLAS_POLISH_VARIANT)for(const file of ['three-renderer.js','atlas-world-policy.js'])await page.route('**/src/'+file+'*',r=>r.fulfill({path:`output/final-polish/${process.env.ATLAS_POLISH_VARIANT}/${file}`,contentType:'text/javascript'}));
 if(process.env.ATLAS_COHESION_V176_BEFORE==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/v176-backup/atlas-3d.glb',contentType:'model/gltf-binary'}));
  for(const name of ['three-renderer.js','atlas-world-policy.js'])await page.route('**/src/'+name+'*',r=>r.fulfill({path:'output/v176-backup/'+name,contentType:'text/javascript'}));
  await page.route('**/atlas-contact-v174.png',r=>r.fulfill({path:'output/v176-backup/atlas-contact-v174.png',contentType:'image/png'}));
 }
 if(process.env.ATLAS_TEMPLE_BEFORE==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/v175-backup/atlas-3d.glb',contentType:'model/gltf-binary'}));
  await page.route('**/src/three-renderer.js*',r=>r.fulfill({path:'output/v175-backup/three-renderer.js',contentType:'text/javascript'}));
  await page.route('**/atlas-contact-v174.png',r=>r.fulfill({path:'output/v175-backup/atlas-contact-v174.png',contentType:'image/png'}));
 }
 if(process.env.ATLAS_PANORAMA_BEFORE==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/art-v172-backup/atlas-3d.glb',contentType:'model/gltf-binary'}));
  for(const name of ['three-renderer.js','atlas-world-policy.js'])await page.route('**/src/'+name+'*',r=>r.fulfill({path:'output/art-v172-backup/'+name,contentType:'text/javascript'}));
 }
 if(process.env.ATLAS_PATH_BEFORE==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/art-v171-backup/atlas-3d.glb',contentType:'model/gltf-binary'}));
  for(const name of ['three-renderer.js','atlas-world-policy.js'])await page.route('**/src/'+name+'*',r=>r.fulfill({path:'output/art-v171-backup/'+name,contentType:'text/javascript'}));
 }
 if(process.env.ATLAS_COHESION_BEFORE==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/cohesion-v169-backup/atlas-3d.glb',contentType:'model/gltf-binary'}));
  await page.route('**/src/three-renderer.js*',r=>r.fulfill({path:'output/cohesion-v169-backup/three-renderer.js',contentType:'text/javascript'}));
 }
 if(process.env.ATLAS_CURATED_BEFORE==='1')await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/curated-foliage-backup/before.glb',contentType:'model/gltf-binary'}));
 if(process.env.ATLAS_GRASS_BASELINE==='1')await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/grass-v166/no-grass.glb',contentType:'model/gltf-binary'}));
 if(process.env.ATLAS_EVENING_BEFORE==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/evening-v168-backup/atlas-3d.glb',contentType:'model/gltf-binary'}));
  for(const name of ['three-renderer.js','atlas-world-policy.js'])await page.route('**/src/'+name+'*',r=>r.fulfill({path:'output/evening-v168-backup/'+name,contentType:'text/javascript'}));
 }
 if(process.env.ATLAS_MORNING_BEFORE==='1'){
  await page.route('**/atlas-3d.glb',r=>r.fulfill({path:'output/morning-v167-backup/before.glb',contentType:'model/gltf-binary'}));
  for(const name of ['three-renderer.js','atlas-world-policy.js'])await page.route('**/src/'+name+'*',r=>r.fulfill({path:'output/morning-v167-backup/'+name,contentType:'text/javascript'}));
 }
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
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&profile3d=1'+(process.env.ATLAS_FXAA!==undefined?'&atlasFxaa='+process.env.ATLAS_FXAA:''));
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
  phases[phase].matrixUpdateMs=mean('matrixUpdateMs');phases[phase].fenceMs=mean('fenceMs');
 }
 const views=process.env.ATLAS_ART_POSES==='1'?[[1,322,-.6],[2,1017,1.4],[3,1322,1.4],[4,1617,1.55]]:process.env.ATLAS_REVIEW_POSES==='1'?[[1,322,-.4],[2,1017,-1.2],[3,1322,1.4],[4,1617,1.5]]:[[1,322,-1.1],[2,1017,1.5],[3,1322,1.4],[4,1617,2.9]];
 if(process.env.ATLAS_REVIEW_POSES==='1')await page.addStyleTag({content:'[data-tap-diagnostics]{visibility:hidden}'});
 for(const [i,x,yaw] of views){
  await page.evaluate(({x,yaw})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,0);},{x,yaw});await page.waitForTimeout(700);await page.screenshot({path:info.outputPath(`view-${i}.png`)});
 }
 if(process.env.ATLAS_SKY_VARIANT||process.env.ATLAS_POLISH_VARIANT){
  await page.addStyleTag({content:'[data-tap-diagnostics]{visibility:hidden}'});
  const sun=await page.evaluate(()=>{const [x,y,z]=AtlasWorldPolicy.lighting.sunOffset;return {yaw:Math.atan2(-x,-z),pitch:Math.atan2(y,Math.hypot(x,z))};});
  for(const [id,x,yaw,pitch] of [['trail',650,0,0],['bank',322,-1.1,0],['rune',1322,1.4,0],['hill',1617,1.5,.12],['temple',1697,0,.2],['sun',1697,sun.yaw,sun.pitch],['opposite-sky',1697,sun.yaw-Math.PI,.55],['upper-sky',1697,sun.yaw,1.1],['seam-left',1697,Math.PI-.001,.48],['seam-right',1697,-Math.PI+.001,.48]]){
   await page.evaluate(({x,yaw,pitch})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,pitch);},{x,yaw,pitch});
   await page.waitForTimeout(500);await page.screenshot({path:info.outputPath(`sky-${id}.png`)});
  }
 }
 if(process.env.ATLAS_CURATED_CLOSE==='1'){
  await page.evaluate(()=>{window.eval('state.worldX=1017');window.eval('threeRenderer').lookAt(1.4,-.42);});
  await page.waitForTimeout(1000);await page.screenshot({path:info.outputPath('fern-close.png')});
 }
 if(process.env.ATLAS_PATH_VIEWS==='1'){
  for(const x of [175,650,1017,1322,1617,1697]){
   for(const [prefix,yaw,pitch] of [['path',0,-.22],['return-path',Math.PI,-.12]]){
    await page.evaluate(({x,yaw,pitch})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,pitch);},{x,yaw,pitch});
    await page.waitForTimeout(700);await page.screenshot({path:info.outputPath(`${prefix}-${x}.png`)});
   }
  }
 }
 if(process.env.ATLAS_PANORAMA_VIEWS==='1'){
  for(const [i,yaw] of [-2.5,-1.4,1.4,2.5,Math.PI].entries()){
   await page.evaluate(yaw=>{window.eval('state.worldX=885');window.eval('threeRenderer').lookAt(yaw,.16);},yaw);
   await page.waitForTimeout(700);await page.screenshot({path:info.outputPath(`panorama-${i+1}.png`)});
  }
 }
 if(process.env.ATLAS_MORNING_VIEWS==='1'){
  for(const x of [175,650,1017]){
   await page.evaluate(x=>{window.eval('state.worldX='+x);const [sx,sy,sz]=AtlasWorldPolicy.lighting.sunOffset;window.eval('threeRenderer').lookAt(Math.atan2(-sx,-sz),Math.atan2(sy,Math.hypot(sx,sz)));},x);
   await page.waitForTimeout(700);await page.screenshot({path:info.outputPath(`sun-${x}.png`)});
  }
 }
 if(process.env.ATLAS_EVENING_DETAILS==='1'){
  for(const [name,x,target] of [['second-rune-context',1231,[11.4,3.66,-42.5]],['second-rune',1322,[11.4,3.66,-42.5]],['first-rune',175,[-2.8,1.8,-5]],['rock-1',322,[9,1.8,-5]],['rock-2',885,[-.5,1.6,-18]],['rock-3',1017,[1.6,1.5,-31.3]],['temple',1697,[19,8,-58.5]],['rock-4',1617,[8.3,1.7,-50]]]){
   await page.evaluate(x=>window.eval('state.worldX='+x),x);await page.waitForTimeout(100);
   await page.evaluate(target=>{const r=window.eval('threeRenderer'),p=r.snapshot().camera;const d=target.map((v,i)=>v-p[i]);r.lookAt(Math.atan2(-d[0],-d[2]),Math.atan2(d[1],Math.hypot(d[0],d[2])));},target);
   await page.waitForTimeout(700);await page.screenshot({path:info.outputPath(name+'.png')});
  }
 }
 const gpuErrors=await page.evaluate(()=>benchmarkErrors);fs.writeFileSync(info.outputPath('metrics.json'),JSON.stringify({size:process.env.ATLAS_BASELINE_ASSET==='1'?12:size,baseline:process.env.ATLAS_BASELINE_ASSET==='1',initial,phases,errors,gpuErrors},null,2));console.log(size,JSON.stringify(phases));expect(errors).toEqual([]);expect(gpuErrors).toEqual([]);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
});
