const {test,expect}=require('@playwright/test');
const fs=require('fs');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
async function settle(page){await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))));}
for(const dpr of [1,2])test(`Illustrated sprite pixels survive translation and animation at DPR ${dpr}`,async({browser},info)=>{
 test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Native WebGPU');test.setTimeout(120000);
 const context=await browser.newContext({viewport:{width:1180,height:734},deviceScaleFactor:dpr,serviceWorkers:'block'}),page=await context.newPage();
 try{
  await page.addInitScript(()=>{
   window.spriteStates=[];
   let locomotionAPI;Object.defineProperty(window,'AtlasLocomotion',{configurable:true,get:()=>locomotionAPI,set:api=>{const create=api.createController;api.createController=o=>create({...o,blinkDelay:()=>2147483647,onState:(...args)=>{spriteStates.push(args[0]);o.onState?.(...args);}});locomotionAPI=api;}});
   const raf=requestAnimationFrame;window.requestAnimationFrame=fn=>raf(time=>{if(['draw','tick','npcAnimationStep'].includes(fn.name)&&window.freezeSpriteTest)return;fn(time);});
   window.spriteWork={uploads:0,rasterDraws:0,allocations:0,destroyed:0};window.liveTextures=new Set();
   const copy=GPUQueue.prototype.copyExternalImageToTexture;GPUQueue.prototype.copyExternalImageToTexture=function(...args){const source=args[0].source;if(source instanceof HTMLCanvasElement&&!source.isConnected)spriteWork.uploads++;return copy.apply(this,args);};
   const draw=CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage=function(...args){if(!this.canvas.isConnected)spriteWork.rasterDraws++;return draw.apply(this,args);};
   const make=GPUDevice.prototype.createTexture;GPUDevice.prototype.createTexture=function(...args){spriteWork.allocations++;const t=make.apply(this,args);liveTextures.add(t);return t;};
   const destroy=GPUTexture.prototype.destroy;GPUTexture.prototype.destroy=function(...args){spriteWork.destroyed++;liveTextures.delete(this);return destroy.apply(this,args);};
  });
  if(process.env.ATLAS_RENDERER_SOURCE)await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({body:fs.readFileSync(process.env.ATLAS_RENDERER_SOURCE,'utf8'),contentType:'text/javascript'}));
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(base+'/?dev=editor&level=LVL-0004');await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
  const select=async id=>{
   await page.evaluate(async id=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')(id,{startImmediately:true,recordStart:false,allowDisabledForEditor:true});window.eval('worldResolver').updateLevelSettings(id,{illustratedFeatures:{globalLighting:true,globalGrading:true,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('render')();window.freezeSpriteTest=true;},id);
   await page.waitForFunction(()=>window.eval('cinematicRenderer').snapshot().status==='ready');await page.waitForTimeout(250);
  };
  const reset=()=>page.evaluate(()=>{spriteWork={uploads:0,rasterDraws:0,allocations:0,destroyed:0};});
  const noWork=async()=>expect(await page.evaluate(()=>spriteWork)).toEqual({uploads:0,rasterDraws:0,allocations:0,destroyed:0});
  const translations=async selector=>{
   const initial=await page.locator(selector).boundingBox();expect(initial.width).toBeGreaterThan(0);
   const origin=await page.locator(selector).evaluate(el=>({text:el.style.translate,x:parseFloat(el.style.translate)||0,y:parseFloat(el.style.translate.split(' ')[1])||0}));
   await reset();
   for(const [x,y] of [[.37,.19],[7.71,1.43],[-5.29,-.61],[13.13,2.17],[0,0]]){
    await page.locator(selector).evaluate((el,{x,y})=>el.style.translate=`${x}px ${y}px`,{x:x+origin.x,y:y+origin.y});await settle(page);
    const box=await page.locator(selector).boundingBox();expect(box.x-initial.x).toBeCloseTo(x,3);expect(box.y-initial.y).toBeCloseTo(y,3);
   }
   await noWork();await page.locator(selector).evaluate((el,value)=>el.style.translate=value,origin.text);
  };
  await select('LVL-0004');await reset();await settle(page);await noWork();
  // Production animation controller emits the real decoded image. Freeze only
  // time progression so geometry-only work can be tested independently.
  for(const animation of ['idleBlink','walkRightFromIdle','walkRightLoop','turnRightToLeft','walkLeftLoop','walkLeftToIdle','idle','walkLeftFromIdle','turnLeftToRight','walkRightToIdle','idle']){
   await reset();await page.evaluate(animation=>window.eval('locomotion').transition(animation,1,performance.now(),{frameStart:1}),animation);
   await page.locator('[data-actor="sven"]').evaluate(image=>image.decode());await page.waitForTimeout(100);await settle(page);
   expect(await page.evaluate(()=>spriteWork.uploads),animation).toBeGreaterThan(0);
   expect(await page.evaluate(()=>window.eval('locomotion').snapshot().state)).toBe(animation);
   await translations('[data-actor-shell="sven"]');
  }
  // A real visual filter/size change must still invalidate the image.
  await reset();await page.locator('[data-actor-shell="sven"]').evaluate(el=>el.style.filter='brightness(0.9) drop-shadow(0 14px 9px rgba(0,0,0,.35))');await settle(page);
  expect(await page.evaluate(()=>spriteWork.uploads)).toBeGreaterThan(0);
  await page.locator('[data-actor-shell="sven"]').evaluate(el=>el.style.removeProperty('filter'));await settle(page);
  await reset();await page.locator('[data-actor-shell="sven"]').evaluate(el=>el.style.scale='1.1');await settle(page);
  expect(await page.evaluate(()=>spriteWork.uploads)).toBeGreaterThan(0);
  await page.locator('[data-actor-shell="sven"]').evaluate(el=>el.style.removeProperty('scale'));await settle(page);
  await select('LVL-0001');
  await page.evaluate(()=>{window.eval('state').worldX=1100;window.eval('updateWorldDom')();});await page.waitForTimeout(250);
  const npc=page.locator('[data-npc-challenge]').filter({has:page.locator('[data-npc-sprite]')}).first();
  await npc.locator('[data-npc-sprite]').evaluate(image=>image.decode());
  await npc.evaluate(el=>el.style.translate=`${450-el.getBoundingClientRect().x}px 0px`);await settle(page);
  const npcBox=await npc.locator('[data-npc-sprite]').boundingBox();expect(npcBox.x).toBeGreaterThan(0);expect(npcBox.x+npcBox.width).toBeLessThan(1180);
  await translations('[data-npc-challenge]');
  await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>liveTextures.size)).toBe(0);
  await select('LVL-0004');await translations('[data-actor-shell="sven"]');
  // Exercise actual timed walking/reversal/arrival as well as frozen poses.
  await page.evaluate(()=>{freezeSpriteTest=false;window.eval('locomotion').reset();spriteStates=[];window.eval('locomotion').transition('idleBlink');});
  await page.waitForFunction(()=>window.eval('locomotion').snapshot().state==='idle');
  for(let repeat=0;repeat<2;repeat++){
   const start=await page.evaluate(()=>({x:window.eval('state').worldX,y:window.eval('state').worldY}));
   await page.evaluate(start=>window.eval('beginFreeWalk')({x:start.x+650,y:start.y}),start);
   await page.waitForFunction(x=>window.eval('state').worldX>x+260,start.x);
   await page.evaluate(start=>window.eval('beginFreeWalk')(start),start);
   await page.waitForFunction(()=>!window.eval('state').moving&&window.eval('locomotion').snapshot().state==='idle');
  }
  const states=await page.evaluate(()=>spriteStates);
  for(const state of ['idleBlink','walkRightLoop','turnRightToLeft','walkLeftLoop','walkLeftToIdle','idle'])expect(states).toContain(state);
  await page.evaluate(()=>window.eval('returnToMenu')());expect(await page.evaluate(()=>liveTextures.size)).toBe(0);
 }finally{await context.close();}
});
