// Read-only comparison of the HEAD renderer and working renderer using the same
// current level/assets. No source, level or browser preference is persisted.
const {chromium}=require('@playwright/test');
const {execFileSync}=require('child_process');
const fs=require('fs');
const path=require('path');
(async()=>{
 const root=path.resolve(__dirname,'../..');
 const before=execFileSync('git',['show','HEAD:src/cinematic-renderer.js'],{cwd:root,encoding:'utf8'});
 const browser=await chromium.launch({channel:'chromium',args:['--enable-unsafe-webgpu']});
 const result={};
 try {for(const dpr of [1,2])for(const version of ['before','after']){
  const context=await browser.newContext({viewport:{width:1180,height:734},deviceScaleFactor:dpr,serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage();
  await page.addInitScript(()=>{
   let frame={passes:0,draws:0,uploads:0};window.samples=[];
   const wrap=(p,k,f)=>{const old=p[k];p[k]=function(...a){f(a);return old.apply(this,a);};};
   wrap(GPUCommandEncoder.prototype,'beginRenderPass',()=>frame.passes++);
   wrap(GPURenderPassEncoder.prototype,'draw',()=>frame.draws++);
   wrap(GPUQueue.prototype,'copyExternalImageToTexture',a=>{if(a[0].source?.matches?.('[data-scene-effects-canvas]'))frame.uploads++;});
   wrap(GPUQueue.prototype,'submit',()=>{samples.push(frame);frame={passes:0,draws:0,uploads:0};});
  });
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  if(version==='before')await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({contentType:'text/javascript',body:before}));
  await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0004');
  await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
  await page.evaluate(async()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')('LVL-0004',{startImmediately:true,recordStart:false,allowDisabledForEditor:true});window.eval('worldResolver').updateLevelSettings('LVL-0004',{illustratedFeatures:{globalLighting:true,globalGrading:true,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('render')();});
  await page.waitForFunction(()=>window.eval('cinematicRenderer').snapshot().ready);
  await page.waitForTimeout(250);await page.evaluate(()=>samples.length=0);await page.waitForTimeout(500);
  result[`${version}-dpr${dpr}`]=await page.evaluate(()=>({frames:samples,renderer:window.eval('cinematicRenderer').snapshot()}));
  await context.close();
 }}finally{await browser.close();}
 fs.writeFileSync(path.join(__dirname,'baseline-comparison.json'),JSON.stringify(result,null,2));
 console.log(Object.fromEntries(Object.entries(result).map(([key,value])=>[key,value.frames.at(-1)])));
})().catch(e=>{console.error(e);process.exitCode=1;});
