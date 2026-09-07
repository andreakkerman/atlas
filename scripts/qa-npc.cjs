// Diagnose the spatial NPC without exposing renderer internals in production.
const {chromium}=require('@playwright/test');
const fs=require('fs');
(async()=>{
 const browser=await chromium.launch({channel:'chromium',headless:true,args:['--enable-unsafe-webgpu']});
 try{
  const page=await browser.newPage({viewport:{width:1419,height:867}});
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.route('**/src/three-renderer.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync('src/three-renderer.js','utf8').replace('npc.visible=true;','npc.material.depthTest=!window.__disableNpcDepth;npc.visible=true;').replace('return {status,error,','return {npcDebug:{exists:!!npc,visible:npc?.visible,position:npc?.position.toArray(),rotation:npc?.rotation.toArray(),map:npc?.material.map?.image?.currentSrc,opacity:npc?.material.opacity},status,error,')}));
  await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001');
  await page.waitForFunction(()=>window.eval('state.screen')==='scene');
  await page.evaluate(()=>{window.eval('voxelRenderer.updateSettings')({renderer:'3d'});window.eval('render')();});
  await page.waitForFunction(()=>window.eval('threeRenderer.snapshot')().ready,null,{timeout:120000});
  await page.waitForFunction(()=>window.eval('threeRenderer.snapshot')().frames>160,null,{timeout:120000});
  await page.evaluate(()=>{window.eval('state').worldX=1697;window.eval('threeRenderer.lookAt')(-.61,.267);window.eval('updateWorldDom')();});
  await page.waitForFunction(()=>window.eval('threeRenderer.snapshot')().positionIndex>=10,null,{timeout:30000});
  await page.waitForTimeout(4000);
  console.log(await page.evaluate(()=>{const s=document.querySelector('[data-npc-challenge="wind"] [data-npc-sprite]');return {snapshot:window.eval('threeRenderer.snapshot')(),dom:s?{src:s.currentSrc,complete:s.complete,width:s.naturalWidth,height:s.naturalHeight}:null};}));
  await page.screenshot({path:'qa-screenshots/npc-diagnostic.jpg',quality:90});
  await page.evaluate(()=>{window.__disableNpcDepth=true;});
  await page.waitForTimeout(2000);
  await page.screenshot({path:'qa-screenshots/npc-without-depth.jpg',quality:90});
  const bytes=await page.evaluate(async()=>Array.from(new Uint8Array(await (await fetch(document.querySelector('[data-npc-challenge="wind"] [data-npc-sprite]').currentSrc)).arrayBuffer())));
  fs.writeFileSync('qa-screenshots/npc-current-frame.png',Buffer.from(bytes));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
