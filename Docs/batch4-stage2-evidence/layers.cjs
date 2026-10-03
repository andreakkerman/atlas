const {chromium}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const out=process.env.ATLAS_PARITY_OUTPUT?path.resolve(process.env.ATLAS_PARITY_OUTPUT):__dirname;fs.mkdirSync(out,{recursive:true});
async function diff(page,a,b){return page.evaluate(async srcs=>{
 const read=async src=>{const im=new Image();im.src='data:image/png;base64,'+src;await im.decode();const c=document.createElement('canvas');c.width=im.width;c.height=im.height;const ctx=c.getContext('2d');ctx.drawImage(im,0,0);return ctx.getImageData(0,0,c.width,c.height).data;};
 const [a,b]=await Promise.all(srcs.map(read));let sum=0,count=0,max=0;for(let i=0;i<a.length;i++)if(i%4!==3){const d=Math.abs(a[i]-b[i]);sum+=d;max=Math.max(max,d);if(d>8)count++;}return {mae:sum/(a.length*.75),over8:count/(a.length*.75),max};
 },[a.toString('base64'),b.toString('base64')]);}
(async()=>{
 const browser=await chromium.launch({channel:'chromium',args:['--enable-unsafe-webgpu']});const results={};
 try{for(const dpr of [1,2]){
 const context=await browser.newContext({viewport:{width:1180,height:734},deviceScaleFactor:dpr,serviceWorkers:'block',reducedMotion:'reduce'}),page=await context.newPage();
 await page.addInitScript(()=>{
  let locomotionAPI;Object.defineProperty(window,'AtlasLocomotion',{configurable:true,get:()=>locomotionAPI,set:api=>{const create=api.createController;api.createController=options=>create({...options,blinkDelay:()=>2147483647});locomotionAPI=api;}});
  const raf=requestAnimationFrame;window.requestAnimationFrame=fn=>window.freezeProducer&&fn.name==='draw'?0:raf(fn);
  const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(b,o,d,...rest){if(d instanceof Float32Array&&d.length===128){d=d.slice();d[5]=10;}return write.call(this,b,o,d,...rest);};
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 if(process.env.ATLAS_PARITY_RASTER_QUALITY){const code=fs.readFileSync(path.resolve(__dirname,'../../src/cinematic-renderer.js'),'utf8').replace('localContext.filter=imageFilter;',`localContext.imageSmoothingQuality='${process.env.ATLAS_PARITY_RASTER_QUALITY}';localContext.filter=imageFilter;`);await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({body:code,contentType:'text/javascript'}));}
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0004');await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
 const isolationStyle=await page.addStyleTag({content:`*,*::before,*::after{animation-play-state:paused!important;transition:none!important}
 .adventureTeamBar,.gameTopBar,.worldHotspot,.runeHotspot,.challengeFxCanvas,.ambientAnimal,.ambientFlyby{visibility:hidden!important}
 html:not([data-layer="combined"]):not([data-layer="mist"]) .forestMist{visibility:hidden!important}
 html:not([data-layer="combined"]):not([data-layer="actor"]):not([data-layer="actorNoCSSShadow"]):not([data-layer="shadow"]) [data-actor-shell]{visibility:hidden!important}
 html[data-layer="actorNoCSSShadow"] [data-actor-shell]{filter:none!important}
 html:not([data-layer="combined"]) .sceneEffectsCanvas{visibility:hidden!important}
 html[data-layer="backgroundAtmosphere"] [data-scene-effects-canvas="backgroundAtmosphere"],html[data-layer="worldAtmosphere"] [data-scene-effects-canvas="worldAtmosphere"],html[data-layer="worldLight"] [data-scene-effects-canvas="worldLight"],html[data-layer="foregroundAtmosphere"] [data-scene-effects-canvas="foregroundAtmosphere"]{visibility:visible!important}
 `});
 await isolationStyle.evaluate(e=>e.id='parity-isolation');
 await page.evaluate(()=>{
  const query=document.querySelector.bind(document),queryAll=document.querySelectorAll.bind(document);
  document.querySelector=function(s){if(s==="[data-actor='sven']"&&!['combined','actor','actorNoCSSShadow','shadow'].includes(document.documentElement.dataset.layer))return null;return query(s);};
  document.querySelectorAll=function(s){if(s.startsWith('.ambientAnimal[')||s.startsWith('[data-npc-challenge] [data-npc-sprite]')||s.startsWith('.ambientFlyby['))return [];return queryAll(s);};
  const frame=AtlasSceneEffects.canvasFrame;AtlasSceneEffects.canvasFrame=canvas=>{const f=frame(canvas),slot=canvas.dataset.sceneEffectsCanvas,layer=document.documentElement.dataset.layer;return layer==='combined'||slot===layer?f:{...f,active:false};};
 });
 for(const id of ['LVL-0004','LVL-0001']){
  await page.evaluate(async id=>{window.freezeProducer=false;window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')(id,{startImmediately:true,recordStart:false,allowDisabledForEditor:true});window.eval('worldResolver').updateLevelSettings(id,{illustratedFeatures:{globalLighting:true,globalGrading:false,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('render')();window.freezeProducer=true;},id);await page.waitForTimeout(150);
  results[`${id}-${dpr}`]={inventory:await page.evaluate(()=>{const sheet=document.getElementById('parity-isolation').sheet;sheet.disabled=true;try{return [...document.querySelector('.worldTrack').children].map(e=>({tag:e.tagName,class:e.className,slot:e.dataset.sceneEffectsCanvas,z:getComputedStyle(e).zIndex,blend:getComputedStyle(e).mixBlendMode,opacity:getComputedStyle(e).opacity,display:getComputedStyle(e).display,visibility:getComputedStyle(e).visibility,filter:getComputedStyle(e).filter,background:getComputedStyle(e).backgroundImage}));}finally{sheet.disabled=false;}}),cases:{}};
  for(const layer of ((process.env.ATLAS_PARITY_LAYERS && process.env.ATLAS_PARITY_LAYERS.split(',')) || ['base','mist','backgroundAtmosphere','worldAtmosphere','worldLight','foregroundAtmosphere','actor','shadow','particles','combined'])){
   await page.evaluate(()=>window.eval('locomotion').reset());
   const images=[];
   for(const full of [false,true,false]){
    await page.evaluate(({id,layer,full})=>{document.documentElement.dataset.layer=layer;const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings(id).cinematicLighting);s.grading={...s.grading,enabled:true,exposure:0,contrast:1,saturation:1,highlights:0,shadows:0,warmth:0,tint:0,blackPoint:0};r.updateLevelSettings(id,{cinematicLighting:s,illustratedFeatures:{globalLighting:true,globalGrading:full,areaDirectionalLights:false,sceneDepth:false,characterShadows:['combined','shadow'].includes(layer),particleFields:['combined','particles'].includes(layer)}});window.eval('cinematicRenderer').sync();},{id,layer,full});
    await page.waitForFunction(({full,layer})=>{const s=window.eval('cinematicRenderer').snapshot();return full?s.ready&&s.illustratedScene:!s.illustratedScene&&(['combined','shadow','particles'].includes(layer)?s.ready||s.status==='inactive':true);},{full,layer});await page.waitForTimeout(100);
    const retain=images.length<2&&(layer==='combined'||(dpr===1&&id==='LVL-0004'&&['mist','worldLight','actor','particles'].includes(layer)));
    images.push(await page.screenshot(retain?{path:path.join(out,`${id}-${dpr}-${layer}-${images.length}.png`)}:{}));
   }
   const entry={parity:await diff(page,images[0],images[1]),restore:await diff(page,images[0],images[2])};results[`${id}-${dpr}`].cases[layer]=entry;console.log(id,dpr,layer,JSON.stringify(entry));
   if(entry.restore.mae>.001)throw Error(`Unfrozen reference: ${id} DPR ${dpr} ${layer}`);
  }
 }
 await context.close();
 }}finally{await browser.close();}
 fs.writeFileSync(path.join(out,'layers.json'),JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});

