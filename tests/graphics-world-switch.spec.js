const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test('desktop world switching uses one device and the correct worlds and quality',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Real WebGPU required');test.setTimeout(600000);
 await page.addInitScript(()=>{
  const live=new Set(),request=GPUAdapter.prototype.requestDevice,destroy=GPUDevice.prototype.destroy;
  window.worldQA={peak:0,errors:[]};
  GPUAdapter.prototype.requestDevice=async function(...args){const d=await Reflect.apply(request,this,args);live.add(d);window.worldQA.peak=Math.max(window.worldQA.peak,live.size);d.addEventListener('uncapturederror',e=>window.worldQA.errors.push(e.error.message));d.lost.then(e=>{if(live.has(d))window.worldQA.errors.push('lost: '+e.reason);});return d;};
  GPUDevice.prototype.destroy=function(...args){live.delete(this);return Reflect.apply(destroy,this,args);};
  window.addEventListener('unhandledrejection',e=>window.worldQA.errors.push(String(e.reason)));
 });
 const errors=[],assets=[];page.on('pageerror',e=>errors.push(e.message));page.on('request',r=>{if(/\/(real|atlas)-3d.glb$/.test(r.url()))assets.push(r.url().split('/').pop());});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0001&debug3d=1&rendererPreset=desktop-high');
 const choose=async mode=>{if(!await page.locator(`[data-renderer-choice="${mode}"]`).isVisible())await page.locator('[data-graphics-action="toggle"]').click();await page.locator(`[data-renderer-choice="${mode}"]`).click();};
 for(const mode of ['cinematic','voxel','3d','atlas-3d','3d','illustrated']){
  await choose(mode);
  if(['3d','atlas-3d'].includes(mode)){
   await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
   const s=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(s.error).toBeNull();expect(s.ready).toBe(true);
   expect(s.worldMode).toBe(mode==='3d'?'real-3d':'atlas-3d');expect(s.source).toContain(mode==='3d'?'real-3d.glb':'atlas-3d.glb');
   expect(s.configuration.preset.id).toBe(mode==='3d'?'desktop-high':'atlas-canonical');expect(s.preparationCompleted).toBe(5);
   if(mode==='atlas-3d'){expect(s.warmupViews).toBe(4);expect(s.actualEffects).toEqual({gtao:false,bloom:false,volumeSteps:0,volumeResolution:0});expect(s.textureBudget.maxLongEdge).toBeLessThanOrEqual(1024);}
   const x=await page.evaluate(()=>window.eval('state.worldX'));await page.keyboard.down('w');await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(x+1);await page.keyboard.up('w');
   await page.mouse.move(600,280);await page.mouse.down();await page.mouse.move(760,300,{steps:6});await page.mouse.up();await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().yaw)).not.toBe(s.yaw);
   await page.screenshot({path:info.outputPath(mode+'-world.png')});
  }else if(mode!=='illustrated')await expect.poll(()=>page.evaluate(mode=>window.eval(mode==='voxel'?'voxelRenderer.snapshot':'cinematicRenderer.snapshot')().status,mode),{timeout:60000}).toBe('ready');
 }
 expect(assets).toEqual(['real-3d.glb','atlas-3d.glb','real-3d.glb']);
 const e=await page.evaluate(()=>window.worldQA);expect(e.peak).toBe(1);expect(e.errors).toEqual([]);expect(errors).toEqual([]);await expect(page.locator('.worldArt')).toBeVisible();
 await choose('cinematic');await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer.snapshot')().status),{timeout:60000}).toBe('ready');
});

test('cancelling a world decode joins cleanup before the next world loads',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Real WebGPU required');test.setTimeout(300000);
 let release,requested=false,atlasRequests=0;const gate=new Promise(resolve=>release=resolve);
 await page.route('**/real-3d.glb',async route=>{requested=true;await gate;await route.continue();});
 page.on('request',r=>{if(r.url().endsWith('/atlas-3d.glb'))atlasRequests++;});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0001&debug3d=1');
 const choose=async mode=>{await page.locator('[data-graphics-action="toggle"]').click();await page.locator(`[data-renderer-choice="${mode}"]`).click();};
 await choose('3d');await expect.poll(()=>requested,{timeout:60000}).toBe(true);
 await choose('atlas-3d');await expect(page.locator('[data-three-loading]')).toBeVisible();
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().diagnostic)).toContain('Vorige werelddecode afronden');
 expect(atlasRequests).toBe(0);release();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 const s=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());expect(s.error).toBeNull();expect(s.worldMode).toBe('atlas-3d');expect(s.ready).toBe(true);expect(atlasRequests).toBe(1);
 await expect(page.locator('[data-three-canvas]')).toHaveAttribute('data-three-mode','atlas-3d');
 await choose('illustrated');await expect(page.locator('.worldArt')).toBeVisible();
});
