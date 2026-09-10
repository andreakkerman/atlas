const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
// Non-round aspect ratio also exercises the physical retest's 512×318 warm-up.
test.use({hasTouch:true,viewport:{width:1770,height:1101}});
test('compact preparation retains full pipeline coverage and final resolution',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium'||process.env.ATLAS_WEBGPU_QA!=='1','Requires real Chromium WebGPU; this exercises iPad strategy, not physical Safari.');
 test.setTimeout(300000);
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});
  Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
  window.preparationViews=[];window.pipelineCount=0;window.compileActive=0;window.compilePeak=0;
  window.pipelineGroups={};let phase='startup';
  const record=d=>{const key=phase+' | '+d.vertex?.module?.label+' | '+d.fragment?.module?.label+' | samples='+d.multisample?.count;window.pipelineGroups[key]=(window.pipelineGroups[key]||0)+1;};
  const original=GPUDevice.prototype.createRenderPipelineAsync;
  const originalSync=GPUDevice.prototype.createRenderPipeline;
  GPUDevice.prototype.createRenderPipeline=function(...args){record(args[0]);window.pipelineCount++;return Reflect.apply(originalSync,this,args);};
  GPUDevice.prototype.createRenderPipelineAsync=async function(...args){
   record(args[0]);window.pipelineCount++;window.compileActive++;window.compilePeak=Math.max(window.compilePeak,window.compileActive);
   try{return await Reflect.apply(original,this,args);}finally{window.compileActive--;}
  };
  window.addEventListener('atlas-three-preparation',event=>{
   const record=event.detail;
   if(record.state==='pending'&&(/compileren|Warm-up \d+\/|Eerste speelbare/.test(record.operation)))phase=record.operation;
   if(record.state==='complete'&&record.operation.startsWith('Warm-up ')){
    const canvas=document.querySelector('[data-three-canvas]');
    window.preparationViews.push({width:canvas.width,height:canvas.height,camera:window.eval('threeRenderer.snapshot')().camera,pipelines:window.pipelineCount});
   }
  });
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${base}/?dev=editor&level=LVL-0001&debug3d=1`);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="3d"]').click();
 await expect(page.locator('[data-three-loading]')).toBeVisible();
 await expect(page.locator('[data-three-canvas]')).toBeHidden();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().error)).toBeNull();
 const ready=await page.evaluate(()=>({snapshot:window.eval('threeRenderer.snapshot')(),views:window.preparationViews,pipelines:window.pipelineCount,groups:window.pipelineGroups,compilePeak:window.compilePeak,journal:JSON.parse(localStorage.getItem('atlas3d-debug-preparation-v1'))}));
 expect(ready.snapshot.preparationStrategy).toBe('compact');
 expect(ready.snapshot.configuration.preset.name).toBe('Tablet Optimized');
 expect(ready.snapshot.resolution).toEqual([1770,1101]);
 expect(ready.snapshot.actualEffects).toEqual({gtao:false,bloom:true,volumeSteps:40,volumeResolution:.25});
 await expect(page.locator('[data-tap-diagnostics]')).toContainText('tablet · Tablet Optimized');
 await expect(page.locator('[data-tap-diagnostics]')).toContainText('MSAA wereld 1× / effecten 1× / presentatie 1× · DPR-cap 1');
 await expect(page.locator('[data-tap-diagnostics]')).toContainText('Schaduw 2048² · GTAO uit · Volume 25% / 40 stappen');
 await expect(page.locator('[data-tap-diagnostics]')).toContainText('Bloom aan · Anisotropie 4');
 expect(ready.snapshot.warmupTotal).toBe(4);expect(ready.snapshot.warmupViews).toBe(4);
 expect(ready.views).toHaveLength(3);
 // Actual shadow passes must finish in bounded batches, not first appear in
 // camera warm-up (the previous path created 796 / 702 / 73 late pipelines).
 const shadowGroups=Object.entries(ready.groups).filter(([key])=>key.includes('vertex_ShadowMaterial'));
 expect(shadowGroups.length).toBeGreaterThan(0);
 expect(shadowGroups.every(([key,count])=>key.startsWith('Wereld- en schaduwpipelines compileren')&&count<=16)).toBe(true);
 expect(ready.views[2].pipelines).toBe(ready.views[1].pipelines);
 expect(ready.views[0].camera).toEqual(ready.snapshot.camera);
 expect(ready.views.every(size=>Math.max(size.width,size.height)<=512)).toBe(true);
 expect(ready.snapshot.resolution[0]).toBeGreaterThan(512);
 expect(ready.snapshot.releasedImageBytes).toBeGreaterThan(800*1024*1024);
 expect(ready.compilePeak).toBeLessThan(100);
 expect(ready.journal.operation).toBe('3D gereed');
 expect(ready.snapshot.gpuPreparation).toBeUndefined();
 expect(ready.snapshot.visibleProfile).toBeUndefined();
 await expect(page.locator('[data-three-loading]')).toBeHidden();
 await page.screenshot({path:'qa-screenshots/usability/compact-ready.png'});
 // Drive the production native TouchEvent path through Chromium's input device.
 // WebKit identifier/cancellation behavior is covered separately, without GPU.
 const cdp=await page.context().newCDPSession(page),pad=await page.locator('[data-three-move]').boundingBox();
 const finger={id:1,x:pad.x+pad.width/2,y:pad.y+pad.height/2};
 const origin=await page.evaluate(()=>window.eval('state.worldX'));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger]});
 finger.y-=40;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[finger]});
 await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(origin+2);
 await page.evaluate(()=>window.eval('threeRenderer.sync')());
 const held=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().input);
 expect(held.walk).toBe(1);expect(held.transport).toContain('native touch');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[finger,{id:2,x:700,y:300}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[finger,{id:2,x:760,y:320}]});
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().input.lookId)).not.toBeNull();
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 // No second shader warm-up after the gate. Actual mouse/keyboard interaction.
 await page.keyboard.down('w');
 await expect.poll(()=>page.evaluate(()=>window.eval('state.worldX'))).toBeGreaterThan(235);await page.keyboard.up('w');
 await page.mouse.move(700,300);await page.mouse.down();await page.mouse.move(930,360,{steps:12});await page.mouse.up();
 await page.waitForTimeout(500);
 const after=await page.evaluate(()=>({pipelines:window.pipelineCount,snapshot:window.eval('threeRenderer.snapshot')()}));
 require('fs').writeFileSync('qa-screenshots/usability/compact-preparation.json',JSON.stringify({ready,after},null,2));
 // Preserve the physically verified preparation view. Its known single root
 // shadow pipeline may initialize on walking; do not trade iPad startup for it.
 expect(after.pipelines-ready.pipelines).toBeLessThanOrEqual(1);
 expect(after.snapshot.fps).toBeGreaterThan(0);
 expect(after.snapshot.ready).toBe(true);expect(errors).toEqual([]);
 await page.evaluate(()=>{window.eval('state').worldX=1847;window.eval('updateWorldDom')();window.eval('threeRenderer.lookAt')(-.38,.46);});
 await page.setViewportSize({width:800,height:1000});
 await expect.poll(()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')().resolution)).toEqual([800,1000]);
 await page.screenshot({path:'qa-screenshots/usability/compact-temple-resized.png'});
 expect(await page.evaluate(()=>window.pipelineCount)-ready.pipelines).toBeLessThanOrEqual(1);
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
 await expect(page.locator('[data-tap-diagnostics]')).toContainText('Vorige voorbereiding (cancelled): Voorbereiding gestopt tijdens: WebGPU-adapter aanvragen');
 await page.goto(base);
 await expect(page.locator('[data-tap-diagnostics]')).toHaveCount(0);
 await expect(page.locator('body')).not.toContainText('Vorige voorbereiding');
 expect(await page.evaluate(()=>Event.prototype.preventDefault===window.originalPreventDefault)).toBe(true);
});
