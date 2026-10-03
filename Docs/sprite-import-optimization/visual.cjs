const {chromium}=require('@playwright/test');const fs=require('fs'),path=require('path');
const poses=process.env.ATLAS_VISUAL_POSES?.split(',')||['idle','idleBlink','walkRightFromIdle','walkRightLoop','turnRightToLeft','walkLeftLoop','walkLeftToIdle','idle','walkLeftFromIdle','turnLeftToRight','walkRightToIdle','npc'];
(async()=>{const browser=await chromium.launch({channel:'chromium',args:['--enable-unsafe-webgpu']});const result={};try{
 for(const dpr of [1,2]){
  const images={};
  for(const version of ['before','after']){
   const context=await browser.newContext({viewport:{width:1180,height:734},deviceScaleFactor:dpr,serviceWorkers:'block'}),page=await context.newPage();
   await page.addInitScript(()=>{
    let locomotionAPI;Object.defineProperty(window,'AtlasLocomotion',{configurable:true,get:()=>locomotionAPI,set:api=>{const create=api.createController;api.createController=o=>create({...o,blinkDelay:()=>2147483647});locomotionAPI=api;}});
    const raf=requestAnimationFrame;window.requestAnimationFrame=fn=>raf(time=>{if(['draw','tick','npcAnimationStep'].includes(fn.name))return;fn(time);});
    const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(b,o,d,...rest){if(d instanceof Float32Array&&d.length===128){d=d.slice();d[5]=10;}return write.call(this,b,o,d,...rest);};
   });
   if(version==='before')await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({body:fs.readFileSync(path.join(__dirname,'renderer-before.js'),'utf8'),contentType:'text/javascript'}));
   await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
   await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0004');await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
   await page.evaluate(async()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')('LVL-0004',{startImmediately:true,recordStart:false});const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings('LVL-0004').cinematicLighting);s.grading={...s.grading,enabled:true,exposure:0,contrast:1,saturation:1,highlights:0,shadows:0,warmth:0,tint:0,blackPoint:0};r.updateLevelSettings('LVL-0004',{cinematicLighting:s,illustratedFeatures:{globalLighting:true,globalGrading:true,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('render')();});
   await page.waitForFunction(()=>window.eval('cinematicRenderer').snapshot().status==='ready');
   await page.addStyleTag({content:'*,*::before,*::after{animation-play-state:paused!important;transition:none!important}'});
   for(const [index,pose] of poses.entries()){
    if(pose==='npc'){
     await page.evaluate(async()=>{await window.eval('selectLevel')('LVL-0001',{startImmediately:true,recordStart:false});const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings('LVL-0001').cinematicLighting);s.grading={...s.grading,enabled:true,exposure:0,contrast:1,saturation:1,highlights:0,shadows:0,warmth:0,tint:0,blackPoint:0};r.updateLevelSettings('LVL-0001',{cinematicLighting:s,illustratedFeatures:{globalLighting:true,globalGrading:true,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('render')();window.eval('state').worldX=1100;window.eval('updateWorldDom')();document.querySelector('[data-npc-challenge]').style.translate='.37px .19px';});
     await page.waitForFunction(()=>window.eval('cinematicRenderer').snapshot().status==='ready');
     await page.locator('[data-npc-challenge]').evaluate(el=>el.style.translate=`${450-el.getBoundingClientRect().x+.37}px .19px`);
    }else await page.evaluate(({pose,index})=>{window.eval('locomotion').transition(pose,1,performance.now(),{frameStart:1});document.querySelector('[data-actor-shell]').style.translate=`${index%2?13.13:.37}px ${index%2?2.17:.19}px`;},{pose,index});
    const selector=pose==='npc'?'[data-npc-challenge] [data-npc-sprite]':'[data-actor="sven"]';
    await page.locator(selector).evaluate(image=>image.decode());await page.waitForTimeout(250);
    const box=await page.locator(selector).boundingBox(),clip={x:Math.max(0,Math.floor(box.x-45)),y:Math.max(0,Math.floor(box.y-45)),width:Math.ceil(box.width+90),height:Math.ceil(box.height+90)};
    const name=`${dpr}-${index}-${pose}`;const image=await page.screenshot({clip,path:path.join(__dirname,`${name}-${version}.png`)});
    if(version==='before')images[name]=image.toString('base64');
    else{
     result[name]=await page.evaluate(async([a,b])=>{const read=async data=>{const i=new Image();i.src='data:image/png;base64,'+data;await i.decode();const c=document.createElement('canvas');c.width=i.width;c.height=i.height;const x=c.getContext('2d');x.drawImage(i,0,0);return x.getImageData(0,0,c.width,c.height).data;};const [x,y]=await Promise.all([a,b].map(read));let sum=0,max=0,over8=0;for(let n=0;n<x.length;n++)if(n%4!==3){const d=Math.abs(x[n]-y[n]);sum+=d;max=Math.max(max,d);over8+=d>8;}return{mae:sum/(x.length*.75),max,over8:over8/(x.length*.75)};},[images[name],image.toString('base64')]);
     console.log(name,JSON.stringify(result[name]));if(result[name].mae>=2)throw Error('Sprite comparison exceeded 2/255 regional mean');
    }
   }
   await context.close();
  }
 }
 fs.writeFileSync(path.join(__dirname,process.env.ATLAS_VISUAL_POSES?'visual-extra.json':'visual.json'),JSON.stringify(result,null,2));
}finally{await browser.close();}})().catch(e=>{console.error(e);process.exitCode=1;});
