const {test,expect}=require('@playwright/test');
const fs=require('fs');
const contract=require('../src/cinematic-settings');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
const snap=p=>p.evaluate(()=>window.eval('cinematicRenderer').snapshot());
const ready=async p=>expect.poll(async()=>(await snap(p)).error||(await snap(p)).status,{timeout:25000}).toBe('ready');
async function open(page){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor');
 await page.evaluate(async()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false,allowDisabledForEditor:true});});
}
async function flags(page,value){await page.evaluate(value=>{window.eval('worldResolver').updateLevelSettings('LVL-0034',{illustratedFeatures:value});window.eval('render')();},value);}
const off={globalLighting:false,globalGrading:false,areaDirectionalLights:false,sceneDepth:false,characterShadows:false,particleFields:false};
async function author(page){await page.evaluate(()=>{
 const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings('LVL-0034').cinematicLighting);
 s.layers.globalLighting=true;s.layers.characters=true;s.grading={...s.grading,enabled:true,exposure:1,warmth:.5};s.depth={...s.depth,enabled:true,perspective:.3};
 s.characters.groundingShadow=true;s.characters.shadowStrength=8;
 s.areaLights={enabled:true,items:[AtlasCinematicSettings.instance('areaLights',{x:1100,y:400,width:2200,height:1200,intensity:1.7})]};
 r.updateLevelSettings('LVL-0034',{cinematicLighting:s});
 });}

test('safe defaults and independent depth dependencies leave authored data untouched',()=>{
 const authored=contract.normalize({particles:{enabled:true,items:[{depthInfluence:1}]},grading:{enabled:true},depth:{enabled:true,perspective:.3},shafts:{enabled:true,items:[{}]},bloom:{enabled:true},godRays:{enabled:true,items:[{}]}}),saved=JSON.stringify(authored);
 expect(contract.illustratedFeatures()).toEqual({...off,globalGrading:true,areaDirectionalLights:true,sceneDepth:true,particleFields:true});
 const s=contract.forIllustrated(authored,{...off,particleFields:true});
 expect(s.grading.enabled).toBe(false);expect(s.depth.enabled).toBe(true);expect(s.depth.perspective).toBe(0);
 for(const key of ['shafts','bloom','godRays','autoExposure','finishing','localLights','atmosphere','waterSurface','waterSparkles','wrap','rim'])expect(s[key].enabled).toBe(false);
 expect(JSON.stringify(authored)).toBe(saved);
});

test('Graphics gates are Illustrated-only, retain choices, suppress glow and revert',async({page},info)=>{
 await open(page);await flags(page,{...off,globalGrading:true,sceneDepth:true});
 await page.evaluate(()=>{window.eval('worldResolver').updateLevelSettings('LVL-0034',{emissiveGlow:{enabled:true,intensity:.7,radius:8,sensitivity:.5}});window.eval('graphicsSettingsOpen=true');window.eval('render')();});
 const gate=k=>page.locator(`[data-illustrated-feature="${k}"]`);
 await expect(gate('globalLighting')).toBeVisible();
 const box=await page.locator('[data-graphics-settings]').boundingBox();expect(box.y+box.height).toBeLessThanOrEqual((await page.evaluate(()=>innerHeight)));
 await page.locator('[data-graphics-settings]').screenshot({path:info.outputPath('graphics-controls.png')});
 await expect(gate('globalGrading')).toBeDisabled();await expect(gate('globalGrading')).toBeChecked();
 await expect(page.locator('[data-illustrated-features]')).not.toContainText('WebGPU Enhancements');
 await gate('globalLighting').check();await expect(gate('globalGrading')).toBeEnabled();await expect(gate('areaDirectionalLights')).not.toBeChecked();
 await expect(page.locator('[data-emissive-glow-canvas]')).toBeHidden();
 expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034').emissiveGlow.enabled)).toBe(true);
 await gate('globalLighting').uncheck();await expect(gate('globalGrading')).toBeChecked();await expect(gate('sceneDepth')).toBeChecked();await expect(page.locator('[data-emissive-glow-canvas]')).toBeVisible();
 const indent=await gate('globalGrading').evaluate(e=>e.parentElement.getBoundingClientRect().left-document.querySelector('[data-illustrated-feature="globalLighting"]').parentElement.getBoundingClientRect().left);expect(indent).toBeGreaterThan(16);
 await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'cinematic'});window.eval('render')();});await expect(gate('globalLighting')).toHaveCount(0);
 await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();});await expect(gate('globalGrading')).toBeChecked();
 await page.keyboard.press('Control+Shift+D');await page.locator('[data-editor-mode="graphics"]').click();
 await page.evaluate(()=>window.eval('updateIllustratedFeature')('LVL-0034','globalLighting',true));
 await expect(page.locator('[data-emissive-setting="enabled"]')).toBeDisabled();
 await page.locator('[data-debug-action="revert-walkpath"]').click();await expect(gate('globalLighting')).not.toBeChecked();
});

test('selected GPU passes, combinations, recovery and measured tablet cost',async({page},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');test.setTimeout(90000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setDeviceMetricsOverride',{width:1180,height:734,deviceScaleFactor:2,mobile:false});await open(page);await author(page);
 const authored=await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034').cinematicLighting);
 const configurations={A:off,B:{...off,particleFields:true},C:{...off,characterShadows:true},D:{...off,globalLighting:true,globalGrading:true},E:{...off,globalLighting:true,globalGrading:true,areaDirectionalLights:true,sceneDepth:true},F:{globalLighting:true,globalGrading:true,areaDirectionalLights:true,sceneDepth:true,characterShadows:true,particleFields:true}};
 const metrics={};
 for(const [name,value] of Object.entries(configurations)){
  await flags(page,value);
  if(name==='A'){await expect.poll(async()=>(await snap(page)).buffers).toBe(0);metrics.A={cpuMs:0,targets:0,draws:0,pipelines:[]};continue;}
  await ready(page);await expect.poll(async()=>(await snap(page)).frame).toBeGreaterThan(15);
  const cadence=await page.evaluate(()=>new Promise(resolve=>{const start=performance.now();let count=0;function frame(){count++;const elapsed=performance.now()-start;if(elapsed>=1200)resolve(count*1000/elapsed);else requestAnimationFrame(frame);}requestAnimationFrame(frame);}));
  const s=await snap(page);expect(s.error).toBeNull();
  for(const forbidden of ['extract','blur','adapt'])expect(s.pipelines).not.toContain(forbidden);
  expect(s.effective.grading.enabled).toBe(value.globalGrading);expect(s.effective.areaLights.enabled).toBe(value.areaDirectionalLights);
  expect(s.effective.depth.perspective).toBe(value.sceneDepth?.3:0);expect(s.particles).toBe(value.particleFields?8937:0);
  if(name==='B'){expect(s.pipelines).toEqual(['particle']);expect(s.renderTargets).toBe(0);expect(s.depthStatus).toBe('ready');}
  if(name==='C'){expect(s.pipelines).toEqual(['sprite','shadow']);expect(s.renderTargets).toBe(1);expect(s.depthStatus).toBe('unused');expect(s.shadowDraws).toBeGreaterThan(0);await expect(page.locator('[data-actor="sven"]')).toHaveCSS('opacity','1');}
  if(name==='D'){expect(s.pipelines).toEqual(['sprite','finish']);expect(s.depthStatus).toBe('unused');}
  if(name==='F')expect(s.shadowDraws).toBeGreaterThan(0);
  metrics[name]={dpr:await page.evaluate(()=>devicePixelRatio),foregroundRafFps:cadence,cpuMs:s.averageMs,rendererRafFps:s.fps,targets:s.renderTargets,draws:s.drawCalls,pipelines:s.pipelines,resolution:s.resolution};
  await page.screenshot({path:info.outputPath(`${name}.png`)});
 }
 // Explicit partial combination and shadows + particles retain depth with perspective disabled.
 for(const value of [{...off,characterShadows:true,particleFields:true},{...off,globalLighting:true,globalGrading:true,sceneDepth:true,particleFields:true}]){await flags(page,value);await ready(page);expect((await snap(page)).depthStatus).toBe('ready');}
 await flags(page,configurations.F);await ready(page);
 const before=await snap(page);
 await page.evaluate(()=>{window.oldGPU=__ATLAS_WEBGPU_SESSION__.device;dispatchEvent(new PageTransitionEvent('pagehide',{persisted:true}));oldGPU.destroy();});
 await expect.poll(async()=>(await snap(page)).buffers).toBe(0);
 await page.evaluate(()=>dispatchEvent(new PageTransitionEvent('pageshow',{persisted:true})));await ready(page);
 expect((await snap(page)).particles).toBe(before.particles);expect((await snap(page)).depthStatus).toBe('ready');expect(await page.evaluate(()=>oldGPU!==__ATLAS_WEBGPU_SESSION__.device)).toBe(true);
 for(const renderer of ['cinematic','illustrated','cinematic','illustrated']){await page.evaluate(renderer=>{window.eval('voxelRenderer').updateSettings({renderer});window.eval('render')();},renderer);await ready(page);}
 expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034').cinematicLighting)).toEqual(authored);
 await flags(page,off);await expect.poll(async()=>(await snap(page)).renderTargets).toBe(0);expect((await snap(page)).depthCached).toBe(0);
 expect(errors).toEqual([]);fs.writeFileSync(info.outputPath('performance.json'),JSON.stringify(metrics,null,2));await info.attach('performance.json',{body:JSON.stringify(metrics,null,2),contentType:'application/json'});
});


test('Apply/reload saves only feature gates and preserves authored settings',async({page},info)=>{
 test.skip(info.project.name!=='desktop-chromium','One source-restoring persistence run');
 const {spawn}=require('child_process'),path=require('path');
 const configPath=path.join(__dirname,'../Levels/world-config.js'),original=fs.readFileSync(configPath,'utf8');
 // A temporary editor API loads the changed validator without restarting the
 // user's asset server or losing its transient drafts. Assets still use base.
 const server=spawn(process.execPath,['scripts/dev-server.js'],{cwd:path.join(__dirname,'..'),env:{...process.env,PORT:'4174'},windowsHide:true,stdio:['ignore','pipe','pipe']});
 try{
  await new Promise((resolve,reject)=>{server.stdout.on('data',data=>{if(String(data).includes('dev server:'))resolve();});server.once('error',reject);server.once('exit',code=>reject(Error(`Editor API exited ${code}`)));});
  await page.route('**/__dev/world-config',async route=>{const response=await route.fetch({url:'http://127.0.0.1:4174/__dev/world-config'});await route.fulfill({response});});
  await open(page);await page.keyboard.press('Control+Shift+D');
  const before=await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034'));
  await page.evaluate(()=>{for(const [key,value] of Object.entries({globalLighting:true,globalGrading:true,areaDirectionalLights:false,sceneDepth:true,characterShadows:true,particleFields:false}))window.eval('updateIllustratedFeature')('LVL-0034',key,value);});
  await page.locator('[data-debug-action="apply-walkpath"]').click();
  await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');
  await page.reload();
  const saved=await page.evaluate(()=>window.SVEN_WORLD_CONFIG.levels['LVL-0034']);
  expect(saved.illustratedFeatures).toEqual({globalLighting:true,globalGrading:true,areaDirectionalLights:false,sceneDepth:true,characterShadows:true,particleFields:false});
  expect(saved.cinematicLighting).toEqual(contract.normalize(before.cinematicLighting));expect(saved.emissiveGlow).toEqual(before.emissiveGlow);
 }finally{
  await page.close();server.kill();await new Promise(resolve=>server.exitCode!==null?resolve():server.once('exit',resolve));fs.writeFileSync(configPath,original);
 }
});
