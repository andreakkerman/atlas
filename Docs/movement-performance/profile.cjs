const {chromium}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const levelId=process.env.ATLAS_LEVEL||'LVL-0004';
const rendererSource=process.env.ATLAS_RENDERER_SOURCE?path.resolve(process.env.ATLAS_RENDERER_SOURCE):path.resolve(__dirname,'../../src/cinematic-renderer.js');
const out=path.resolve(process.env.ATLAS_PROFILE_OUTPUT||path.join(__dirname,'before'));fs.mkdirSync(out,{recursive:true});
fs.writeFileSync(path.join(out,'run.json'),JSON.stringify({level:levelId,channel:process.env.ATLAS_CHANNEL||'chromium',headed:process.env.ATLAS_HEADED==='1',sampleMs:Number(process.env.ATLAS_SAMPLE_MS)||5000,sourceHashes:Object.fromEntries(['src/cinematic-renderer.js','src/cinematic-shaders.js','src/scene-effects.js','src/locomotion.js'].map(name=>[name,require('crypto').createHash('sha256').update(fs.readFileSync(name==='src/cinematic-renderer.js'?rendererSource:path.resolve(__dirname,'../..',name))).digest('hex')]))},null,2));
const quantile=(a,p)=>{a=[...a].sort((a,b)=>a-b);return a[Math.min(a.length-1,Math.floor(a.length*p))]||0;};
function summarize(rows){
 const intervals=rows.map(r=>r.dt),keys=[...new Set(rows.flatMap(r=>Object.keys(r.count)))];
 const mean=k=>rows.reduce((s,r)=>s+(r.count[k]||0),0)/rows.length;
 const groups={};for(const key of ['spriteChanged','positionOnly','unchanged']){const group=rows.filter(r=>r.change===key);groups[key]={frames:group.length,p50:quantile(group.map(r=>r.dt),.5),p95:quantile(group.map(r=>r.dt),.95),copyMs:group.reduce((s,r)=>s+(r.count.copyMs||0),0)/Math.max(1,group.length)};}
 return {frames:rows.length,fps:1000*rows.length/intervals.reduce((s,n)=>s+n,0),p50:quantile(intervals,.5),p95:quantile(intervals,.95),p99:quantile(intervals,.99),perFrame:Object.fromEntries(keys.map(k=>[k,mean(k)])),groups,dimensions:[...new Set(rows.flatMap(r=>r.uploads.map(u=>`${u.kind} ${u.width}x${u.height}`)))],producers:[...new Set(rows.flatMap(r=>Object.keys(r.raf)))]};
}
(async()=>{const browser=await chromium.launch({channel:process.env.ATLAS_CHANNEL||'chromium',headless:process.env.ATLAS_HEADED!=='1',args:['--enable-unsafe-webgpu']});const results={};
try{for(const dpr of (process.env.ATLAS_DPR||'1,2').split(',').map(Number)){
 const context=await browser.newContext({viewport:{width:Number(process.env.ATLAS_WIDTH)||1180,height:Number(process.env.ATLAS_HEIGHT)||734},deviceScaleFactor:dpr,serviceWorkers:'block'}),page=await context.newPage();
 await page.addInitScript(()=>{
  const fresh=()=>({count:{},uploads:[],raf:{}});let current=fresh(),lastTime=null,lastSprite='',lastPosition='';window.profileRows=[];window.profileActive=false;
  const add=(k,n=1)=>{if(profileActive)current.count[k]=(current.count[k]||0)+n;};
  window.profileRaster=(previous,next)=>{if(previous===next)return;add('rasterInvalidation');const a=previous?JSON.parse(previous):[],b=JSON.parse(next);['source','width','height','phaseX','phaseY','displayWidth','displayHeight','dpr','imageFilter','ownerFilter','mirror'].forEach((key,i)=>{if(a[i]!==b[i])add('dirty:'+key);});};
  const wrap=(proto,key,label,extra)=>{const original=proto[key];proto[key]=function(...args){const t=performance.now();try{return original.apply(this,args);}finally{add(label);add(label+'Ms',performance.now()-t);extra?.(args);}};};
  const raf=requestAnimationFrame;window.requestAnimationFrame=fn=>raf(time=>{
   if(profileActive && time!==lastTime){
    if(lastTime!==null){current.dt=time-lastTime;profileRows.push(current);}
    current=fresh();lastTime=time;
    const actor=document.querySelector('[data-actor="sven"]'),sprite=actor?.getAttribute('src'),position=actor?.closest('[data-actor-shell]')?.getAttribute('style');
    current.change=sprite!==lastSprite?'spriteChanged':position!==lastPosition?'positionOnly':'unchanged';lastSprite=sprite;lastPosition=position;
   }
   const t=performance.now();try{return fn(time);}finally{if(profileActive){const key=fn.name||'anonymous';current.raf[key]=(current.raf[key]||0)+1;add('raf:'+key,performance.now()-t);}}
  });
  window.startProfile=()=>{profileRows=[];current=fresh();lastTime=null;profileActive=true;};
  const style=getComputedStyle;window.getComputedStyle=function(...args){const t=performance.now();try{return style.apply(this,args);}finally{add('styleReads');add('styleReadMs',performance.now()-t);}};
  wrap(Element.prototype,'getBoundingClientRect','geometryReads');
  wrap(CanvasRenderingContext2D.prototype,'drawImage','canvasDraw');
  wrap(CanvasRenderingContext2D.prototype,'clearRect','canvasClear',()=>{});
  wrap(GPUDevice.prototype,'createTexture','textureCreate');wrap(GPUTexture.prototype,'destroy','textureDestroy');
  wrap(GPUDevice.prototype,'createBuffer','bufferCreate');wrap(GPUBuffer.prototype,'destroy','bufferDestroy');
  wrap(GPUDevice.prototype,'createBindGroup','bindGroup');wrap(GPUQueue.prototype,'writeBuffer','uniformWrite');
  wrap(GPUCommandEncoder.prototype,'beginRenderPass','passes');wrap(GPURenderPassEncoder.prototype,'draw','draws');
  wrap(GPUQueue.prototype,'submit','submit');
  wrap(GPUQueue.prototype,'copyExternalImageToTexture','copy',args=>{if(!profileActive)return;const s=args[0].source,size=args[2],width=size.width||size[0],height=size.height||size[1];const kind=s.dataset?.sceneEffectsCanvas?'legacy:'+s.dataset.sceneEffectsCanvas:s instanceof HTMLCanvasElement?'filteredSprite':s.constructor.name;current.uploads.push({kind,width,height});add(kind);add(kind+'MB',width*height*4/1048576);});
  window.longFrames=[];if(PerformanceObserver.supportedEntryTypes.includes('long-animation-frame'))new PerformanceObserver(list=>{if(profileActive)longFrames.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration,blocking:e.blockingDuration,renderStart:e.renderStart,styleLayoutStart:e.styleAndLayoutStart})));}).observe({type:'long-animation-frame',buffered:false});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 // Diagnostic counters only; the production cache decision and pixels are unchanged.
 const source=fs.readFileSync(rendererSource,'utf8').replace('if(!resource || resource.displayRevision!==revision){','window.profileRaster?.(resource?.displayRevision,revision);\n      if(!resource || resource.displayRevision!==revision){');
 await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({body:source,contentType:'text/javascript'}));
 await page.goto('http://127.0.0.1:4173/?dev=editor&level='+levelId);await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
 const cdp=await context.newCDPSession(page);await cdp.send('Performance.enable');
 const environment=await page.evaluate(async()=>{const adapter=await navigator.gpu.requestAdapter();return {userAgent:navigator.userAgent,adapter:adapter?.info?.toJSON?.()||{vendor:adapter?.info?.vendor,architecture:adapter?.info?.architecture,device:adapter?.info?.device,description:adapter?.info?.description},viewport:[innerWidth,innerHeight],dpr:devicePixelRatio};});fs.writeFileSync(path.join(out,'environment.json'),JSON.stringify(environment,null,2));
 for(const variant of (process.env.ATLAS_VARIANTS||'baseline,full,cinematic,grading,area,depth').split(',')){
  for(const moving of (['baseline','full','cinematic'].includes(variant)?[false,true]:[true])){
   await page.evaluate(async({variant,levelId})=>{
    window.profileActive=false;window.eval('voxelRenderer').updateSettings({renderer:variant==='cinematic'?'cinematic':'illustrated'});
    await window.eval('selectLevel')(levelId,{startImmediately:true,recordStart:false,allowDisabledForEditor:true});
    window.eval('worldResolver').updateLevelSettings(levelId,{illustratedFeatures:{globalLighting:true,globalGrading:['full','grading','cinematic'].includes(variant),areaDirectionalLights:['full','area','cinematic'].includes(variant),sceneDepth:['full','depth','cinematic'].includes(variant),characterShadows:true,particleFields:true}});window.eval('render')();
   },{variant,levelId});
   await page.waitForFunction(()=>window.eval('cinematicRenderer').snapshot().status==='ready',null,{timeout:30000});await page.waitForTimeout(1200);
   if(moving)await page.evaluate(()=>window.eval('beginFreeWalk')({x:window.eval('state').worldX+1400,y:window.eval('state').worldY}));
   await page.waitForTimeout(700);const before=await cdp.send('Performance.getMetrics');
   await page.evaluate(()=>{longFrames=[];startProfile();});await page.waitForTimeout(Number(process.env.ATLAS_SAMPLE_MS)||5000);
   const data=await page.evaluate(()=>{profileActive=false;return {rows:profileRows,longFrames,snapshot:window.eval('cinematicRenderer').snapshot(),state:{x:window.eval('state').worldX,y:window.eval('state').worldY,camera:window.eval('state').cameraX,moving:window.eval('state').moving,animation:window.eval('locomotion').snapshot()}};});
   const after=await cdp.send('Performance.getMetrics'),prior=Object.fromEntries(before.metrics.map(m=>[m.name,m.value]));data.browserMetrics=Object.fromEntries(after.metrics.filter(m=>/Duration|Count/.test(m.name)).map(m=>[m.name,m.value-(prior[m.name]||0)]));
   data.summary=summarize(data.rows);const key=`${dpr}-${variant}-${moving?'walking':'idle'}`;results[key]=data;fs.writeFileSync(path.join(out,'profile.json'),JSON.stringify(results,null,2));console.log(key,JSON.stringify(data.summary));
  }
 }
 await context.close();
}}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
