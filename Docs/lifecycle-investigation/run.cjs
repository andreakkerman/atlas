const {chromium}=require('@playwright/test'),fs=require('fs'),path=require('path');
const root=path.resolve(__dirname,'../..'),out=path.resolve(process.env.ATLAS_LIFECYCLE_OUT||path.join(__dirname,'matrix'));fs.mkdirSync(out,{recursive:true});
const base='http://127.0.0.1:4173',duration=Number(process.env.ATLAS_SAMPLE_MS)||4000;
const sequences={A:['LVL-0032','LVL-0001'],B:['LVL-0001','LVL-0032','LVL-0001','LVL-0032','LVL-0001'],C:['LVL-0004','LVL-0034','LVL-0035','LVL-0004','LVL-0001'],D:['LVL-0004','menu','LVL-0034','menu','LVL-0035','menu','LVL-0004','menu','LVL-0001'],E:['LVL-0004:off','LVL-0001'],A_repeat:['LVL-0032','LVL-0001']};
const results={};
async function boot(context){
 const page=await context.newPage();await page.addInitScript({path:path.join(__dirname,'diagnostics.js')});
 if(process.env.ATLAS_NATIVE_BROWSER==='1'){
  await page.setViewportSize({width:Number(process.env.ATLAS_WIDTH)||1180,height:Number(process.env.ATLAS_HEIGHT)||734});
  const cdp=await context.newCDPSession(page);await cdp.send('Emulation.setDeviceMetricsOverride',{width:Number(process.env.ATLAS_WIDTH)||1180,height:Number(process.env.ATLAS_HEIGHT)||734,deviceScaleFactor:Number(process.env.ATLAS_DPR)||2,mobile:false});
 }
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 let source=fs.readFileSync(path.join(root,'src/cinematic-renderer.js'),'utf8');
 source=source.replaceAll('uploadDiagnostics.set(details.purpose,','global.AtlasLifecycleAudit?.tagTexture(resource.texture,details);uploadDiagnostics.set(details.purpose,');
 source=source.replace('const snapshot = () => ({ status,','const snapshot = () => ({ auditCaches:{uploaded:uploaded.size,pendingUploads:pendingUploads.size,effects:effectTextures.size,fallbacks:spriteFallbacks.size}, status,');
 source=source.replace('if (resetExposure && device && exposureBuffer) device.queue.writeBuffer(exposureBuffer, 0, new Float32Array(4));','if (resetExposure && device && exposureBuffer) device.queue.writeBuffer(exposureBuffer, 0, new Float32Array(4)); global.AtlasLifecycleAudit?.capture("cinematic.releaseLevel:after");');
 await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({body:source,contentType:'text/javascript'}));
 page.on('pageerror',e=>console.log('PAGE_ERROR',e.message));
 await page.goto(base+'/?dev=editor');await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
 return page;
}
async function ready(page){await page.waitForFunction(()=>{const s=window.eval('cinematicRenderer').snapshot();return s.status==='ready'||!!s.error;},null,{timeout:90000});const error=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().error);if(error)throw Error(error);}
async function enter(page,entry){const [id,setting]=entry.split(':');console.log('ENTER',entry);await page.evaluate(async({id,off})=>{AtlasLifecycleAudit.capture('before-leave');window.eval('voxelRenderer').updateSettings({renderer:'illustrated',challengeFx:{mode:'canvas',enabled:true}});await window.eval('selectLevel')(id,{startImmediately:true,recordStart:false,allowDisabledForEditor:true});AtlasLifecycleAudit.capture('after-select-before-feature-selection');const flags={globalLighting:true,globalGrading:!off,areaDirectionalLights:!off,sceneDepth:!off,characterShadows:true,particleFields:true};window.eval('worldResolver').updateLevelSettings(id,{illustratedFeatures:flags});if(window.eval('playGraphicsFeatures'))Object.assign(window.eval('playGraphicsFeatures'),flags);window.eval('render')();AtlasLifecycleAudit.capture('after-select-initialization');},{id,off:setting==='off'});await ready(page);await page.waitForTimeout(1200);const s=await page.evaluate(()=>AtlasLifecycleAudit.capture('after-steady-initialization'));if(!s.features.globalLighting||!s.features.characterShadows||!s.features.particleFields||s.features.globalGrading!==(setting!=='off')||s.features.areaDirectionalLights!==(setting!=='off')||s.features.sceneDepth!==(setting!=='off')||s.challenge.mode!=='canvas')throw Error('Requested feature flags were not established: '+JSON.stringify(s.features));console.log('EFFECTIVE',id,s.renderer.illustratedScene,s.renderer.effective.grading.enabled,s.renderer.effective.areaLights.enabled,s.renderer.effective.depth.perspective);}
async function measure(page,label){
 const stationary=await page.evaluate(async({duration,label})=>AtlasLifecycleAudit.measure(label+':stationary',duration),{duration,label});
 await page.evaluate(()=>window.eval('beginFreeWalk')({x:window.eval('state').worldX+1400,y:window.eval('state').worldY}));await page.waitForTimeout(700);
 const walking=await page.evaluate(async({duration,label})=>AtlasLifecycleAudit.measure(label+':walking',duration),{duration,label});
 const history=await page.evaluate(()=>({captures:AtlasLifecycleAudit.captures.splice(0),events:AtlasLifecycleAudit.events.splice(0)}));
 return{stationary,walking,...history};
}
function brief(item){return Object.fromEntries(['stationary','walking'].map(k=>{const v=item[k],s=v.snapshot,r=s.renderer;return[k,{...v.summary,textures:s.gpu.textures.length,buffers:s.gpu.buffers,depth:r.depthCached,images:s.caches.images,decoded:s.caches.decodedSprites,raf:s.raf,scheduled:r.scheduled,passes:v.rows.reduce((n,x)=>n+(x.work.passes||0),0)/v.rows.length,submissions:v.rows.reduce((n,x)=>n+(x.work.submissions||0),0)/v.rows.length}];}));}
function save(name){fs.writeFileSync(path.join(out,name+'.json'),JSON.stringify(results[name],null,2));}
let nativeProcess=null,nativeProfile=null;
async function makeBrowser(){
 if(process.env.ATLAS_NATIVE_BROWSER!=='1')return chromium.launch({channel:process.env.ATLAS_CHANNEL||'chromium',headless:process.env.ATLAS_HEADED!=='1',args:['--enable-unsafe-webgpu']});
 const os=require('os'),{spawn}=require('child_process');nativeProfile=fs.mkdtempSync(path.join(os.tmpdir(),'atlas-lifecycle-'));
 // A separate, owned Chromium process with no Playwright focus defaults.
 nativeProcess=spawn(chromium.executablePath(),['--remote-debugging-port=0','--user-data-dir='+nativeProfile,'--no-first-run','--no-default-browser-check','--enable-unsafe-webgpu','about:blank'],{stdio:'ignore',windowsHide:true});
 const portFile=path.join(nativeProfile,'DevToolsActivePort');for(let i=0;!fs.existsSync(portFile)&&i<200;i++)await new Promise(r=>setTimeout(r,100));
 const port=fs.readFileSync(portFile,'utf8').split('\n')[0];return chromium.connectOverCDP('http://127.0.0.1:'+port,{noDefaults:true});
}
async function makeContext(browser){return process.env.ATLAS_NATIVE_BROWSER==='1'?browser.contexts()[0]:browser.newContext({viewport:{width:Number(process.env.ATLAS_WIDTH)||1180,height:Number(process.env.ATLAS_HEIGHT)||734},deviceScaleFactor:Number(process.env.ATLAS_DPR)||2,serviceWorkers:'block'});}
async function closeBrowser(browser){
 if(nativeProcess){try{const c=await browser.newBrowserCDPSession();await c.send('Browser.close');}catch{}await new Promise(r=>setTimeout(r,500));if(nativeProcess.exitCode===null)nativeProcess.kill();nativeProcess=null;}
 await browser.close();
 if(nativeProfile){const dir=path.resolve(nativeProfile),tmp=path.resolve(require('os').tmpdir());if(path.dirname(dir)!==tmp||!path.basename(dir).startsWith('atlas-lifecycle-'))throw Error('Unsafe diagnostic profile path');try{fs.rmSync(dir,{recursive:true,force:true});}catch(e){console.log('PROFILE_CLEANUP',dir,e.message);}nativeProfile=null;}
}
(async()=>{
for(const name of (process.env.ATLAS_SEQUENCES||'A,B,C,D,E,A_repeat').split(',')){
 const browser=await makeBrowser(),context=await makeContext(browser);results[name]={steps:[],environment:null};
 try{let page=await boot(context);const adapter=await page.evaluate(async()=>{const a=await navigator.gpu.requestAdapter();return a?.info?.toJSON?.()||{vendor:a?.info?.vendor,architecture:a?.info?.architecture};});results[name].environment={adapter,browser:browser.version(),dpr:Number(process.env.ATLAS_DPR)||2,viewport:page.viewportSize(),headless:process.env.ATLAS_HEADED!=='1'};
  if(name==='lifecycle'){
   await enter(page,'LVL-0001');let item=await measure(page,'cold');results[name].steps.push({label:'cold',...item});save(name);console.log(name,'cold',JSON.stringify(brief(item)));
   const cdp=await context.newCDPSession(page);
   // Playwright enables focus emulation by default, forcing visibility even
   // behind another tab. Disable that emulation for a real browser event.
   if(process.env.ATLAS_NATIVE_VISIBILITY==='1')await cdp.send('Emulation.setFocusEmulationEnabled',{enabled:false});
   for(const seconds of [3,30]){
    await page.evaluate(()=>{window.eval('stopMovement')({invalidateIntent:true});AtlasLifecycleAudit.capture('before-background');AtlasLifecycleAudit.begin();});
    const cover=await context.newPage();await cover.goto('about:blank');await cover.bringToFront();await page.waitForTimeout(300);
    let hidden=await page.evaluate(()=>document.visibilityState),windowId=null;
    if(hidden!=='hidden'&&process.env.ATLAS_MINIMIZE==='1'){
     ({windowId}=await cdp.send('Browser.getWindowForTarget'));
     await cdp.send('Browser.setWindowBounds',{windowId,bounds:{windowState:'minimized'}});await page.waitForTimeout(500);
     hidden=await page.evaluate(()=>document.visibilityState);
    }
    console.log('BACKGROUND_VISIBILITY',hidden);
    // A frozen target is a separate browser lifecycle probe, not a fake
    // visibility event and not physical iOS suspension.
    if(hidden!=='hidden')await cdp.send('Page.setWebLifecycleState',{state:'frozen'});
    await new Promise(r=>setTimeout(r,seconds*1000));
    if(hidden!=='hidden')await cdp.send('Page.setWebLifecycleState',{state:'active'});
    if(windowId!==null)await cdp.send('Browser.setWindowBounds',{windowId,bounds:{windowState:'normal'}});
    await page.bringToFront();await cover.close();await ready(page);await page.evaluate(()=>AtlasLifecycleAudit.capture('after-resume-initialization'));await page.waitForTimeout(1000);
    const resumeTrace=await page.evaluate(()=>AtlasLifecycleAudit.end());
    // Reset the route using the existing controller/world DOM, without tearing
    // down the retained renderer, so resume and cold samples share a camera.
    await page.evaluate(()=>{window.eval('stopMovement')({invalidateIntent:true});const p=window.eval('getPlayerStartPoint')(window.eval('level'));Object.assign(window.eval('state'),{worldX:p.x,worldY:p.y});window.eval('locomotion').reset();window.eval('updateWorldDom')();});await page.waitForTimeout(300);
    item=await measure(page,'resume-'+seconds);results[name].steps.push({label:'resume-'+seconds,visibilityWas:hidden,probe:hidden==='hidden'?'native-visibility': 'CDP-frozen',resumeTrace,...item});save(name);console.log(name,'resume-'+seconds,JSON.stringify(brief(item)));
   }
   await page.evaluate(()=>{AtlasLifecycleAudit.capture('before-menu');window.eval('returnToMenu')();AtlasLifecycleAudit.capture('after-menu-teardown');});await enter(page,'LVL-0034');item=await measure(page,'menu-riven');results[name].steps.push({label:'menu-riven',...item});save(name);
   await page.evaluate(()=>window.eval('returnToMenu')());await enter(page,'LVL-0001');item=await measure(page,'menu-rune');results[name].steps.push({label:'menu-rune',...item});save(name);
   await page.evaluate(()=>AtlasLifecycleAudit.capture('before-reload'));results[name].beforeReload=await page.evaluate(()=>AtlasLifecycleAudit.export());await page.reload();await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');await enter(page,'LVL-0001');item=await measure(page,'reload');results[name].steps.push({label:'reload',...item});save(name);console.log(name,'reload',JSON.stringify(brief(item)));
   await page.evaluate(()=>AtlasLifecycleAudit.capture('before-tab-close'));results[name].beforeClose=await page.evaluate(()=>AtlasLifecycleAudit.export());await page.close();page=await boot(context);await enter(page,'LVL-0001');item=await measure(page,'tab-reopen-same-browser');results[name].steps.push({label:'tab-reopen-same-browser',...item});save(name);console.log(name,'tab-reopen',JSON.stringify(brief(item)));
  }else for(const [index,entry] of sequences[name].entries()){
   if(entry==='menu'){await page.evaluate(()=>{AtlasLifecycleAudit.capture('before-menu');window.eval('returnToMenu')();AtlasLifecycleAudit.capture('after-menu-teardown');});await page.waitForTimeout(300);continue;}
   await enter(page,entry);const item=await measure(page,`${name}-${index}-${entry}`);results[name].steps.push({label:`${index}-${entry}`,...item});save(name);console.log(name,entry,JSON.stringify(brief(item)));
  }
  await page.evaluate(()=>{AtlasLifecycleAudit.capture('before-final-menu');window.eval('returnToMenu')();AtlasLifecycleAudit.capture('final-menu');});await page.waitForTimeout(2500);await page.evaluate(()=>AtlasLifecycleAudit.capture('menu-settled'));
  if(name==='lifecycle'){const before=await page.evaluate(()=>AtlasLifecycleAudit.capture('menu-quiet-before'));await page.waitForTimeout(8000);const after=await page.evaluate(()=>AtlasLifecycleAudit.capture('menu-quiet-after'));results[name].menuQuiet={before,after};}
  results[name].final=await page.evaluate(()=>AtlasLifecycleAudit.export());save(name);
 }catch(e){results[name].error=String(e.stack||e);save(name);console.error(name,e);process.exitCode=1;}finally{await closeBrowser(browser);}
}
})().catch(e=>{console.error(e);process.exitCode=1;});
