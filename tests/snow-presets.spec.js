const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const api=require('../src/cinematic-settings');
const {bootEditorTest,chooseCreation}=require('./editor-workspace-helpers');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4185';
const out=path.join(__dirname,'../output/snow-presets');
const historicalSnow={color:'#e2efff',count:1600,size:2.2,sizeVariation:.9,speed:65,direction:90,gravity:.6,turbulence:1,wind:18,lifetime:18,streak:1,glow:0,opacity:.7,depth:.7,depthSpread:.6};
test('Snowfall retains the original Snow behavior and all styles retain geometry on retuning',()=>{
 expect(api.presets.particles.Snow).toEqual(historicalSnow);
 const item=api.instance('particles',{id:'kept',name:'Authored',x:1400,y:280,width:1900,height:640,boundsRotation:12,shape:'rectangle'});
 for(const name of api.snowPresets){const next=api.preset('particles',name,api.preset('particles','Heavy Rain',item));
  for(const key of ['id','name','x','y','width','height','shape','boundsRotation'])expect(next[key]).toEqual(item[key]);
  expect(api.particleCount(next)).toBeLessThanOrEqual(['Blizzard','Snow Squall'].includes(name)?3200:1600);expect(next.glow).toBe(0);expect(next.distribution).toBe('volume');expect(next.scaleCountWithArea).toBe(false);
  expect(api.normalize({particles:{enabled:true,items:[next]}}).particles.items[0]).toEqual(next);
 }
});
test('Snow family adds exactly one scene-wide field through the existing editor',async({page})=>{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');await page.keyboard.press('Control+Shift+D');
 const count=()=>page.evaluate(()=>AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings('LVL-0036').cinematicLighting).particles.items.length);
 const initial=await count();
 for(const [i,name] of api.snowPresets.entries()){
  await chooseCreation(page,'cinematic:snow');await page.locator('[data-add-category]').selectOption('Particle Fields');await page.locator('[data-add-family]').selectOption('cinematic:snow');
  await page.locator('[data-add-variant]').selectOption(name);await page.locator('[data-cinematic-action="add"]').click();
  expect(await count()).toBe(initial+i+1);
  const item=await page.evaluate(()=>AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings('LVL-0036').cinematicLighting).particles.items.at(-1));
  expect(item.name).toBe(api.presetLabel(name));expect([item.x,item.y,item.width,item.height,item.boundsRotation]).toEqual([1086,362,2172,724,0]);
  expect(item.count).toBe(api.presets.particles[name].count);
 }
 await expect(page.locator('[data-cinematic-preset="particles"] option[value="Snow"]')).toHaveText('Snowfall');
});
for(const tablet of [false,true])test.describe(tablet?'tablet':'desktop',()=>{
 test.use({viewport:tablet?{width:1180,height:734}:{width:1600,height:900},deviceScaleFactor:tablet?2:1});
 for(const mode of ['illustrated','cinematic'])test(`snow motion and cost ${mode}`,async({page},info)=>{
  test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Real GPU required');
  const faults=[];page.on('pageerror',e=>faults.push(e.message));
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  // Record renderer CPU work at its existing timing boundary. No production profiler.
  const source=fs.readFileSync(path.join(__dirname,'../src/cinematic-renderer.js'),'utf8').replaceAll('averageMs=averageMs?', '(window.snowCPU ||= []).push(performance.now()-start);averageMs=averageMs?').replaceAll('averageMs = averageMs ?', '(window.snowCPU ||= []).push(performance.now()-start);averageMs = averageMs ?');
  await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({contentType:'application/javascript',body:source}));
  await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');
  await page.evaluate(mode=>{window.eval('playGraphicsFeatures=null');window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
  const results={};
  for(const name of ['Snow',...api.snowPresets.filter(n=>n!=='Snow'),'Snow']){
   await page.evaluate(name=>{const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings('LVL-0036').cinematicLighting);const old=s.particles.items[0];s.particles.items=[AtlasCinematicSettings.preset('particles',name,{...old,x:1086,y:362,width:2172,height:724,boundsRotation:0,shape:'rectangle'})];s.particles.enabled=true;r.updateLevelSettings('LVL-0036',{cinematicLighting:s});window.eval('cinematicRenderer').sync();},name);
   const result=await page.evaluate(async()=>{
    const r=window.eval('cinematicRenderer');for(let i=0;i<40;i++)await new Promise(requestAnimationFrame);
    const before=r.snapshot();window.snowCPU=[];const cadence=[];let last;
    for(let i=0;i<120;i++){const t=await new Promise(requestAnimationFrame);if(last)cadence.push(t-last);last=t;}
    const summarize=a=>{a.sort((x,y)=>x-y);return {n:a.length,mean:a.reduce((s,v)=>s+v,0)/a.length,p95:a[Math.floor(a.length*.95)],p99:a[Math.floor(a.length*.99)]};};
    const after=r.snapshot();return {cpu:summarize(window.snowCPU),cadence:summarize(cadence),particles:after.particles,buffers:after.buffers,targets:after.renderTargets,drawCalls:after.drawCalls,uploads:after.textureUploads.length-before.textureUploads.length,resolution:after.resolution,error:after.error};
   });
   expect(result.error).toBeNull();expect(result.cpu.n).toBeGreaterThan(90);expect(result.particles).toBe(api.presets.particles[name].count);
   if(results.Snow){expect(result.buffers).toBe(results.Snow.buffers);expect(result.targets).toBe(results.Snow.targets);expect(result.drawCalls).toBe(results.Snow.drawCalls);}
   results[name==='Snow'&&results.Snow?'Snow repeat':name]=result;
   fs.mkdirSync(out,{recursive:true});await page.screenshot({path:path.join(out,`${tablet?'tablet':'desktop'}-${mode}-${name.replaceAll(' ','-')}.png`)});
  }
  fs.writeFileSync(path.join(out,`${tablet?'tablet':'desktop'}-${mode}.json`),JSON.stringify(results,null,2));
  expect(faults).toEqual([]);
 });
});

