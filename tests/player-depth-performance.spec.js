const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const {bootEditorTest}=require('./editor-workspace-helpers');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
// Test-only instrumentation: timings are CPU elapsed time, not GPU timestamps.
// The same wrappers and 120-frame workloads are used for each revision/state.
function instrument(source){
 return source.replace(/function sync\(([^)]*)\) \{/,`function sync(...args){const t=performance.now();try{return syncMeasured(...args);}finally{window.depthProfile.sync.push(performance.now()-t);}}
    function syncMeasured($1) {`)
  .replace("mask=document.createElement('canvas');","mask=document.createElement('canvas');mask.dataset.profilePlayerMask='';")
  .replace('stats.masks++;','window.depthProfile.mask.push(elapsed);stats.masks++;')
  .replace("if(frameKey!==nextFrame){","if(frameKey!==nextFrame){const compositeStart=performance.now();")
  .replace('stats.frames++;','stats.frames++;window.depthProfile.composite.push(performance.now()-compositeStart);');
}
for(const id of ['LVL-0005','LVL-0034','LVL-0036'])for(const mode of ['illustrated','illustrated-gpu','cinematic'])for(const walking of [false,true])test(`depth profile ${id} ${mode} ${walking?'walk':'idle'}`,async({page},info)=>{
 await page.addInitScript(()=>{
  window.depthProfile={sync:[],mask:[],composite:[],canvas:[],upload:[],playerUpload:[]};
  for(const name of ['drawImage','clearRect','putImageData']){const fn=CanvasRenderingContext2D.prototype[name];CanvasRenderingContext2D.prototype[name]=function(...args){if(!this.canvas.hasAttribute('data-player-depth-canvas')&&!this.canvas.hasAttribute('data-profile-player-mask'))return Reflect.apply(fn,this,args);const t=performance.now();try{return Reflect.apply(fn,this,args);}finally{depthProfile.canvas.push(performance.now()-t);}};}
  if(typeof GPUQueue!=='undefined'){const fn=GPUQueue.prototype.copyExternalImageToTexture;GPUQueue.prototype.copyExternalImageToTexture=function(...args){const t=performance.now();try{return Reflect.apply(fn,this,args);}finally{depthProfile.upload.push(performance.now()-t);}};}
 });
 const revision=process.env.ATLAS_DEPTH_PROFILE_REVISION||'current';
 for(const file of ['player-depth.js','sprite-depth.js','app.js','cinematic-renderer.js']){
  const source=fs.readFileSync(path.join(__dirname,revision==='before'?'../output/player-depth-optimization/before/'+file:'../src/'+file),'utf8');
  // Attribute using renderer metadata: HTML images become ImageBitmaps before
  // upload, so DOM dataset inspection would incorrectly report zero uploads.
  const body=file==='player-depth.js'?instrument(source):file==='cinematic-renderer.js'?source.replace('function copyPreparedExternalSource(prepared, old) {',`function copyPreparedExternalSource(prepared,old){const t=performance.now();try{return copyMeasured(prepared,old);}finally{if(prepared.details.purpose.includes('actor:sven'))window.depthProfile.playerUpload.push(performance.now()-t);}}
    function copyMeasured(prepared, old) {`):source;
  await page.route('**/src/'+file,r=>r.fulfill({contentType:'application/javascript',body}));
 }
 await bootEditorTest(page,base+'/?dev=editor&level='+id);
 await page.evaluate(({id,mode})=>{
  window.eval('playGraphicsFeatures=null');const r=window.eval('worldResolver');
  // Preserve authored effects. Only select the existing mode participation gates.
  r.updateLevelSettings(id,{illustratedFeatures:{...AtlasCinematicSettings.illustratedDefaults,globalLighting:mode==='illustrated-gpu'}});
  if(mode==='illustrated-gpu'){const c=AtlasCinematicSettings.normalize(r.levelSettings(id).cinematicLighting);c.grading.enabled=true;r.updateLevelSettings(id,{cinematicLighting:c});}
  window.eval('voxelRenderer').updateSettings({renderer:mode==='cinematic'?'cinematic':'illustrated'});window.eval('render')();
 },{id,mode});
 if(mode!=='illustrated')await expect(page.locator('.gameShell')).toHaveClass(mode==='cinematic'?/cinematicReady/:/illustratedSceneReady/);
 // Plain Illustrated can also prepare GPU particle fields asynchronously.
 // Do not let its preparation cover cancel the animation intent during warmup.
 await page.evaluate(()=>window.eval('cinematicRenderer').sync());
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 const result=await page.evaluate(async({id,walking})=>{
  const summary=values=>{const v=[...values].sort((a,b)=>a-b);return{n:v.length,total:v.reduce((a,b)=>a+b,0),mean:v.length?v.reduce((a,b)=>a+b,0)/v.length:0,p95:v[Math.min(v.length-1,Math.floor(v.length*.95))]||0,p99:v[Math.min(v.length-1,Math.floor(v.length*.99))]||0};};
  const results={},state=window.eval('state'),x=state.worldX,y=state.worldY;
  for(const enabled of [false,true]){
   state.worldX=x;state.worldY=y;window.eval('locomotion').reset();window.eval('updatePlayerDepth')(id,'enabled',enabled);
   if(walking)window.eval('locomotion').setIntent('right');else window.eval('locomotion').transition('idleBlink');
   for(let i=0;i<40;i++)await new Promise(requestAnimationFrame);
   const before=window.eval('playerDepth').snapshot();for(const key in depthProfile)depthProfile[key]=[];
   const updates=[],cadence=[];let last;
   for(let i=0;i<120;i++){
    await new Promise(requestAnimationFrame);const now=performance.now();if(last)cadence.push(now-last);last=now;
    if(walking)state.worldX=x+i*2;else if(i%30===0)window.eval('locomotion').transition('idleBlink');
    const t=performance.now();window.eval('updateWorldDom')();updates.push(performance.now()-t);
   }
   const after=window.eval('playerDepth').snapshot(),renderer=window.eval('cinematicRenderer').snapshot();
   results[enabled?'enabled':'disabled']={updates:summary(updates),cadence:summary(cadence),...Object.fromEntries(Object.entries(depthProfile).map(([k,v])=>[k,summary(v)])),masks:after.masks-before.masks,composites:after.frames-before.frames,bytes:after.bytes,renderer:{averageCPU:renderer.averageMs,particles:renderer.particles,depth:renderer.depthStatus,ready:renderer.ready},character:document.querySelector('[data-actor="sven"]').dataset.characterId};
  }return results;
 },{id,walking});
 expect(result.disabled.masks).toBe(0);expect(result.disabled.bytes).toBe(0);
 if(!walking)expect(result.enabled.masks).toBe(0);
 if(revision!=='before'&&mode==='cinematic'){expect(result.enabled.masks).toBe(0);expect(result.enabled.composites).toBe(0);}
 const dir=path.join(__dirname,'../output/player-depth-optimization',revision);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,`${info.project.name}-${id}-${mode}-${walking?'walk':'idle'}.json`),JSON.stringify(result,null,2));
 if(id==='LVL-0036'&&walking)await page.screenshot({path:path.join(dir,`${info.project.name}-${id}-${mode}.png`)});
 console.log(id,mode,walking?'walk':'idle',JSON.stringify({update:[result.disabled.updates.mean,result.enabled.updates.mean],mask:result.enabled.mask.mean,masks:result.enabled.masks,composites:result.enabled.composites,uploads:[result.disabled.upload.n,result.enabled.upload.n],particles:result.enabled.renderer.particles}));
});
