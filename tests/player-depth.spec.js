const {test,expect}=require('@playwright/test');
const {bootEditorTest}=require('./editor-workspace-helpers');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
for(const character of ['sven','sven_arc'])for(const mode of ['illustrated','cinematic','illustrated-gpu'])test(`${character} genuine depth alpha in ${mode}`,async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');
 await page.evaluate(async({character,mode})=>{
  await window.eval('selectMainCharacter')('LVL-0034',character);
  window.eval('ambientFlybyRuntime').stopAll();
  const resolver=window.eval('worldResolver');window.eval('playGraphicsFeatures=null');
  if(mode==='illustrated-gpu')resolver.updateLevelSettings('LVL-0034',{cinematicLighting:{...window.AtlasCinematicSettings.normalize(resolver.levelSettings('LVL-0034').cinematicLighting),grading:{...window.AtlasCinematicSettings.normalize(resolver.levelSettings('LVL-0034').cinematicLighting).grading,enabled:true}},illustratedFeatures:{...window.AtlasCinematicSettings.illustratedDefaults,globalLighting:true}});
  window.eval('voxelRenderer').updateSettings({renderer:mode==='cinematic'?mode:'illustrated'});
  window.eval('state').worldX=350;window.eval('state').worldY=499;window.eval('render')();
 },{character,mode});
 if(mode!=='illustrated')await expect(page.locator('.gameShell')).toHaveClass(mode==='cinematic'?/cinematicReady/:/illustratedSceneReady/);
 await expect(page.locator('[data-actor="sven"]')).toHaveCount(1);
 await page.evaluate(()=>window.eval('locomotion').reset());
 const before=await page.evaluate(()=>({rect:document.querySelector('[data-actor="sven"]').getBoundingClientRect().toJSON(),stats:window.eval('playerDepth').snapshot()}));
 expect(before.stats.active).toBe(false);expect(before.stats.masks).toBe(0);
 await page.evaluate(()=>{window.eval('updatePlayerDepth')('LVL-0034','offset',-.1);window.eval('updatePlayerDepth')('LVL-0034','enabled',true);});
 if(mode==='cinematic'){
  await expect.poll(()=>page.evaluate(()=>window.eval('playerDepth').snapshot().ready)).toBe(true);
  await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(0);
  const native=await page.evaluate(()=>({stats:window.eval('playerDepth').snapshot(),rect:document.querySelector('[data-actor="sven"]').getBoundingClientRect().toJSON(),value:window.eval('playerDepth').actorDepth}));
  expect(native.stats.masks).toBe(0);expect(native.stats.frames).toBe(0);expect(native.stats.maskBytes).toBe(0);expect(native.rect).toEqual(before.rect);expect(native.value).toBeGreaterThanOrEqual(0);
 }else{
 await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(1);
 const result=await page.evaluate(()=>{
 const c=window.eval('playerDepth').surface,a=document.querySelector('[data-actor="sven"]');const raw=document.createElement('canvas');raw.width=c.width;raw.height=c.height;raw.getContext('2d').drawImage(a,0,0);const orig=raw.getContext('2d').getImageData(0,0,c.width,c.height).data,out=c.getContext('2d').getImageData(0,0,c.width,c.height).data;let visible=0,hidden=0;for(let i=3;i<out.length;i+=4){if(orig[i]>200){if(out[i]===0)hidden++;if(out[i]>200)visible++;}}return{visible,hidden,rect:a.getBoundingClientRect().toJSON(),stats:window.eval('playerDepth').snapshot()};});
 console.log(character,mode,JSON.stringify(result));expect(result.hidden).toBeGreaterThan(100);expect(result.visible).toBeGreaterThan(100);expect(result.rect).toEqual(before.rect);
 }
 await page.screenshot({path:`output/player-depth/${character}-${mode}-enabled.png`});
 await page.evaluate(()=>window.eval('updatePlayerDepth')('LVL-0034','enabled',false));
 await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(0);
 await page.screenshot({path:`output/player-depth/${character}-${mode}-disabled.png`});
 expect(errors).toEqual([]);
});

test('mask caching, walking, turning, camera and renderer lifecycle',async({page})=>{
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');
 await page.evaluate(()=>window.eval('updatePlayerDepth')('LVL-0034','enabled',true));
 await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(1);
 // Scene entry precedes GPU particle preparation. Its loading cover correctly
 // cancels movement, so begin this workflow only after preparation completes.
 await page.evaluate(()=>window.eval('cinematicRenderer').sync());
 await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
 const before=await page.evaluate(()=>window.eval('playerDepth').snapshot());
 await page.evaluate(()=>{window.eval('state').cameraX+=30;window.eval('updateWorldDom')();window.eval('locomotion').transition('idleBlink');});
 await page.waitForTimeout(350);
 const idle=await page.evaluate(()=>window.eval('playerDepth').snapshot());expect(idle.masks).toBe(before.masks);expect(idle.frames).toBeGreaterThan(before.frames);
 // Give a low-cadence backend enough travel for six distinct position samples;
 // a 100px route can finish in five frames even when every frame is correct.
 await page.evaluate(()=>window.eval('walkRoute')([{x:window.eval('state').worldX+300,y:window.eval('state').worldY}],()=>{}));
 await expect.poll(()=>page.evaluate(()=>window.eval('playerDepth').snapshot().masks)).toBeGreaterThan(before.masks+5);
 await page.evaluate(()=>{window.eval('stopMovement')({invalidateIntent:true});window.eval('locomotion').transition('turnRightToLeft');});
 await page.waitForTimeout(350);expect((await page.evaluate(()=>window.eval('playerDepth').snapshot())).frames).toBeGreaterThan(idle.frames);
 await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'voxel'});window.eval('render')();});
 await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(0);expect((await page.evaluate(()=>window.eval('playerDepth').snapshot())).bytes).toBe(0);
 await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();});await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(1);
 await page.evaluate(()=>window.eval('returnToMenu')());await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(0);
});

for(const mode of ['illustrated','cinematic','illustrated-gpu'])for(const viewport of [{width:1280,height:800},{width:1180,height:734}])for(const enabled of [false,true])test(`movement cost ${mode} ${viewport.width}x${viewport.height} ${enabled?'enabled':'disabled'}`,async({browser},info)=>{
 const context=await browser.newContext({viewport,deviceScaleFactor:viewport.width===1180?2:1,serviceWorkers:'block'}),page=await context.newPage();
 try{
 await page.addInitScript(()=>{window.depthUploads=0;if(typeof GPUQueue!=='undefined'){const copy=GPUQueue.prototype.copyExternalImageToTexture;GPUQueue.prototype.copyExternalImageToTexture=function(...args){window.depthUploads++;return Reflect.apply(copy,this,args);};}});
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');
 await page.evaluate(mode=>{window.eval('playGraphicsFeatures=null');const r=window.eval('worldResolver');if(mode==='illustrated-gpu'){const c=AtlasCinematicSettings.normalize(r.levelSettings('LVL-0034').cinematicLighting);c.grading.enabled=true;r.updateLevelSettings('LVL-0034',{cinematicLighting:c,illustratedFeatures:{...AtlasCinematicSettings.illustratedDefaults,globalLighting:true}});}window.eval('voxelRenderer').updateSettings({renderer:mode==='cinematic'?'cinematic':'illustrated'});window.eval('render')();},mode);
 if(mode!=='illustrated')await expect(page.locator('.gameShell')).toHaveClass(mode==='cinematic'?/cinematicReady/:/illustratedSceneReady/);
 await page.evaluate(()=>{window.eval('ambientFlybyRuntime').stopAll();window.eval('updatePlayerDepth')('LVL-0034','enabled',true);});await expect.poll(()=>page.evaluate(()=>window.eval('playerDepth').snapshot().ready)).toBe(true);
 const results=await page.evaluate(async enabled=>{
  const out={};{
   window.eval('updatePlayerDepth')('LVL-0034','enabled',enabled);const before=window.eval('playerDepth').snapshot(),uploadsBefore=window.depthUploads,times=[],deltas=[];let previous;
   window.eval('locomotion').setIntent('right');
   for(let i=0;i<120;i++){await new Promise(requestAnimationFrame);const now=performance.now();if(previous)deltas.push(now-previous);previous=now;window.eval('state').worldX=250+i*2;const start=performance.now();window.eval('updateWorldDom')();times.push(performance.now()-start);}
   const after=window.eval('playerDepth').snapshot();times.sort((a,b)=>a-b);deltas.sort((a,b)=>a-b);out[enabled?'enabled':'disabled']={syncMean:times.reduce((a,b)=>a+b)/times.length,syncP95:times[Math.floor(times.length*.95)],frameMedian:deltas[Math.floor(deltas.length*.5)],frameP95:deltas[Math.floor(deltas.length*.95)],maskMean:(after.totalMaskMs-before.totalMaskMs)/(after.masks-before.masks),masks:after.masks-before.masks,bytes:after.bytes,uploads:window.depthUploads-uploadsBefore,rendererCPU:window.eval('cinematicRenderer').snapshot().averageMs};
  }return out;
 },enabled);console.log('PLAYER_DEPTH_PERFORMANCE',mode,viewport,results);const fs=require('fs'),file=`output/player-depth/performance-${info.project.name}-${mode}-${viewport.width}.json`;fs.writeFileSync(file,JSON.stringify({...fs.existsSync(file)?JSON.parse(fs.readFileSync(file)): {},...results},null,2));if(enabled&&mode==='cinematic'){expect(results.enabled.masks).toBe(0);}else if(enabled){expect(results.enabled.masks).toBeGreaterThan(100);expect(results.enabled.maskMean).toBeLessThan(8);}else{expect(results.disabled.masks).toBe(0);expect(results.disabled.bytes).toBe(0);}
 }finally{await context.close();}
});

test('missing depth reports failure and disabling restores the original actor',async({page})=>{
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');
 await page.route('**/missing-player-depth.png',r=>r.fulfill({status:404,body:''}));
 await page.evaluate(()=>{window.eval('level').world.depthmap='missing-player-depth.png';window.eval('updatePlayerDepth')('LVL-0034','enabled',true);});
 await expect(page.locator('[data-player-depth-error]')).toBeVisible();await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(0);
 await page.evaluate(()=>window.eval('updatePlayerDepth')('LVL-0034','enabled',false));await expect(page.locator('[data-player-depth-error]')).toHaveCount(0);expect((await page.evaluate(()=>window.eval('playerDepth').snapshot())).bytes).toBe(0);
});
