const {test,expect}=require('@playwright/test');
const fs=require('fs');
for(const mode of ['3d','atlas-3d'])test(`performance comparison ${mode}`,async({page},info)=>{
 test.skip(process.env.ATLAS_PERFORMANCE_QA!=='1'||process.env.ATLAS_WEBGPU_QA!=='1'||info.project.name!=='desktop-chromium','Opt-in real Chromium/WebGPU performance capture');test.setTimeout(300000);
 await page.setViewportSize({width:1180,height:734});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.addInitScript(()=>{
  performance.setResourceTimingBufferSize(10000);
  const request=GPUAdapter.prototype.requestDevice;
  GPUAdapter.prototype.requestDevice=function(...args){const i=this.info;window.profileAdapter=i?{vendor:i.vendor,architecture:i.architecture,device:i.device,description:i.description}:null;return Reflect.apply(request,this,args);};
 });
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&profile3d=1');
 if(mode==='atlas-3d'&&process.env.ATLAS_PC_ABLATION==='scheduler-only')await page.evaluate(()=>{
  // Diagnostic ablation only: reproduce original compact preparation, then
  // remove only its visible-frame completion fence on this desktop GPU.
  const registry=AtlasGraphicsModes;
  window.AtlasGraphicsModes={...registry,configuration(id,...args){const c=registry.configuration(id,...args);return c&&id==='atlas-3d'?{...c,compact:true}:c;}};
  const start=AtlasThreePerformance.start;
  AtlasThreePerformance.start=(renderer,...args)=>{const p=start(renderer,...args),prepared=p.prepared;return {...p,prepared(){prepared();renderer.waitForGPU=()=>Promise.resolve();}};};
 });
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator(`[data-renderer-choice="${mode}"]`).click();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 const initial=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(initial.error).toBeNull();expect(initial.ready).toBe(true);
 await page.waitForTimeout(15000);
 const stationary=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(stationary.ready).toBe(true);
 await page.screenshot({path:info.outputPath(mode+'.png')});
 await page.keyboard.down('w');await page.waitForTimeout(10000);await page.keyboard.up('w');
 const moving=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(moving.ready).toBe(true);expect(moving.frames).toBeGreaterThan(stationary.frames);
 const resource=await page.evaluate(()=>performance.getEntriesByType('resource').filter(e=>/glb|hdr/.test(e.name)).map(e=>({name:e.name,duration:e.duration,bytes:e.transferSize})));
 fs.writeFileSync(info.outputPath(mode+'.json'),JSON.stringify({initial,stationary,moving,resource,errors,adapter:await page.evaluate(()=>window.profileAdapter)},null,2));
 console.log(mode,JSON.stringify({load:initial.preparationMs,fps:stationary.fps,cpu:stationary.averageMs,resolution:stationary.resolution,inventory:stationary.performanceProfile.inventory}));expect(errors).toEqual([]);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
});
test('same-device scheduler A-B-A isolates completion gating',async({page},info)=>{
 test.skip(process.env.ATLAS_PERFORMANCE_QA!=='1'||process.env.ATLAS_WEBGPU_QA!=='1'||info.project.name!=='desktop-chromium','Opt-in real GPU ablation');test.setTimeout(240000);
 await page.setViewportSize({width:1180,height:734});await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&profile3d=1');
 await page.evaluate(()=>{
  const registry=AtlasGraphicsModes;
  window.AtlasGraphicsModes={...registry,configuration(id,...args){const c=registry.configuration(id,...args);return c&&id==='atlas-3d'?{...c,compact:true}:c;}};
  const start=AtlasThreePerformance.start;
  AtlasThreePerformance.start=(renderer,...args)=>{const p=start(renderer,...args),fence=renderer.waitForGPU;window.setBenchmarkFence=enabled=>{renderer.waitForGPU=enabled?fence:()=>Promise.resolve();};return p;};
 });
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:180000});expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().ready)).toBe(true);
 await page.waitForTimeout(5000);const phases=[];
 for(const gated of [true,false,true]){
  await page.evaluate(gated=>window.setBenchmarkFence(gated),gated);await page.waitForTimeout(1000);
  const start=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().performanceProfile.samples.length);
  await page.waitForTimeout(10000);const s=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(s.ready).toBe(true);
  const samples=s.performanceProfile.samples.slice(start),mean=key=>samples.reduce((sum,x)=>sum+(x[key]||0),0)/samples.length;
  expect(samples.length).toBeGreaterThan(30);phases.push({gated,frames:samples.length,fps:1000/mean('interval'),cpuMs:mean('cpu'),fenceMs:mean('fenceMs'),draws:mean('draws'),triangles:mean('visibleTriangles')});
 }
 fs.writeFileSync(info.outputPath('scheduler-aba.json'),JSON.stringify(phases,null,2));console.log('same GPU scheduler A/B/A',JSON.stringify(phases));
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
});
