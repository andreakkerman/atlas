const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test('compact preparation retains full pipeline coverage and final resolution',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real Chromium WebGPU; this exercises iPad strategy, not physical Safari.');
 test.setTimeout(300000);
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});
  Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
  window.preparationViews=[];window.pipelineCount=0;window.compileActive=0;window.compilePeak=0;
  const original=GPUDevice.prototype.createRenderPipelineAsync;
  const originalSync=GPUDevice.prototype.createRenderPipeline;
  GPUDevice.prototype.createRenderPipeline=function(...args){window.pipelineCount++;return Reflect.apply(originalSync,this,args);};
  GPUDevice.prototype.createRenderPipelineAsync=async function(...args){
   window.pipelineCount++;window.compileActive++;window.compilePeak=Math.max(window.compilePeak,window.compileActive);
   try{return await Reflect.apply(original,this,args);}finally{window.compileActive--;}
  };
  window.addEventListener('atlas-three-preparation',event=>{
   const record=event.detail;
   if(record.state==='complete'&&record.operation.startsWith('Warm-up ')){
    const canvas=document.querySelector('[data-three-canvas]');
    window.preparationViews.push({width:canvas.width,height:canvas.height});
   }
  });
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${base}/?dev=editor&level=LVL-0001&debug3d=1`);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="3d"]').click();
 await expect(page.locator('[data-three-loading]')).toBeVisible();
 await expect(page.locator('[data-three-canvas]')).toBeHidden();
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().ready),{timeout:240000}).toBe(true);
 const ready=await page.evaluate(()=>({snapshot:window.eval('threeRenderer.snapshot')(),views:window.preparationViews,pipelines:window.pipelineCount,compilePeak:window.compilePeak,journal:JSON.parse(localStorage.getItem('atlas3d-debug-preparation-v1'))}));
 expect(ready.snapshot.preparationStrategy).toBe('compact');
 expect(ready.snapshot.warmupTotal).toBe(4);expect(ready.snapshot.warmupViews).toBe(4);
 expect(ready.views).toHaveLength(3);
 expect(ready.views.every(size=>Math.max(size.width,size.height)<=512)).toBe(true);
 expect(ready.snapshot.resolution[0]).toBeGreaterThan(512);
 expect(ready.snapshot.releasedImageBytes).toBeGreaterThan(800*1024*1024);
 expect(ready.compilePeak).toBeLessThan(100);
 expect(ready.journal.operation).toBe('3D gereed');
 await expect(page.locator('[data-three-loading]')).toBeHidden();
 await page.screenshot({path:'qa-screenshots/usability/compact-ready.png'});
 // No second shader warm-up after the gate. Actual mouse/keyboard interaction.
 await page.keyboard.down('w');
 await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(185);await page.keyboard.up('w');
 await page.mouse.move(700,300);await page.mouse.down();await page.mouse.move(930,360,{steps:12});await page.mouse.up();
 await page.waitForTimeout(500);
 const after=await page.evaluate(()=>({pipelines:window.pipelineCount,snapshot:window.eval('threeRenderer.snapshot')()}));
 require('fs').writeFileSync('qa-screenshots/usability/compact-preparation.json',JSON.stringify({ready,after},null,2));
 expect(after.pipelines).toBe(ready.pipelines);
 expect(after.snapshot.ready).toBe(true);expect(errors).toEqual([]);
 await page.evaluate(()=>{window.eval('state').worldX=1847;window.eval('updateWorldDom')();window.eval('threeRenderer.lookAt')(-.38,.46);});
 await page.setViewportSize({width:800,height:1000});
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().resolution)).toEqual([800,1000]);
 await page.screenshot({path:'qa-screenshots/usability/compact-temple-resized.png'});
 expect(await page.evaluate(()=>window.pipelineCount)).toBe(ready.pipelines);
 expect(errors).toEqual([]);
 await info.attach('preparation-evidence',{body:JSON.stringify({ready,after},null,2),contentType:'application/json'});
 await page.getByRole('button',{name:'Terug naar menu'}).click();
 await expect(page.getByRole('heading',{name:'Kies een avontuur'})).toBeVisible();
});
test('debug journal survives reload and is absent from normal production UI',async({page})=>{
 await page.addInitScript(()=>{window.originalPreventDefault=Event.prototype.preventDefault;});
 await page.addInitScript(()=>Object.defineProperty(navigator,'gpu',{configurable:true,value:{requestAdapter:()=>new Promise(()=>{})}}));
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(`${base}/?dev=editor&level=LVL-0001&debug3d=1`);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="3d"]').click();
 await expect(page.locator('[data-three-diagnostic]')).toBeVisible();
 await expect(page.locator('[data-three-diagnostic]')).toContainText('WebGPU-adapter aanvragen');
 await page.goto(`${base}/?debug3d=1`);
 await expect(page.locator('[data-tap-diagnostics]')).toContainText('Vorige voorbereiding (pending): WebGPU-adapter aanvragen');
 await page.goto(base);
 await expect(page.locator('[data-tap-diagnostics]')).toHaveCount(0);
 await expect(page.locator('body')).not.toContainText('Vorige voorbereiding');
 expect(await page.evaluate(()=>Event.prototype.preventDefault===window.originalPreventDefault)).toBe(true);
});
