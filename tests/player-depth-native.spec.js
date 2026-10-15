const {test,expect}=require('@playwright/test');
const {bootEditorTest}=require('./editor-workspace-helpers');
const fs=require('fs'),path=require('path');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
for(const character of ['sven','sven_arc'])test(`native Cinematic matches CPU-mask reference: ${character}`,async({browser})=>{
 const images=[];
 for(const reference of [true,false]){
  const context=await browser.newContext({viewport:{width:1280,height:800},serviceWorkers:'block'}),page=await context.newPage();
  try{
   if(reference){
    // The investigation can compare the saved pre-optimization sources. The
    // permanent regression forces the existing CPU fallback as a reference.
    if(process.env.ATLAS_DEPTH_REFERENCE){for(const file of ['player-depth.js','app.js','cinematic-renderer.js'])await page.route('**/src/'+file,r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync(path.join(process.env.ATLAS_DEPTH_REFERENCE,file))}));}
    else await page.route('**/src/player-depth.js',r=>r.fulfill({contentType:'application/javascript',body:fs.readFileSync(path.join(__dirname,'../src/player-depth.js'),'utf8').replace("if(mode==='cinematic' && (gpuNative || nativePresented)){","if(false){")}));
   }
   await page.addInitScript(()=>{let api;Object.defineProperty(window,'AtlasLocomotion',{configurable:true,get:()=>api,set:value=>{const create=value.createController;value.createController=options=>create({...options,blinkDelay:()=>2147483647});api=value;}});});
   await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');
   await page.evaluate(async character=>{
    await window.eval('selectMainCharacter')('LVL-0034',character);
    const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize();
    // Keep character lighting, wrap/rim and grounding shadows. Remove only
    // time-varying scenery so screenshots can be compared byte-for-byte.
    for(const key of ['particles','waterSurface','waterSparkles','godRays','autoExposure','gameplayCues'])s[key].enabled=false;
    r.updateLevelSettings('LVL-0034',{cinematicLighting:s,playerDepthOcclusion:{enabled:true,offset:-.1}});
    window.eval('ambientFlybyRuntime').stopAll();window.eval('level').ambientFlybys=[];window.eval('level').sceneEffects=[];window.eval('sceneEffectRuntime').dispose();
    window.eval('voxelRenderer').updateSettings({renderer:'cinematic'});window.eval('state').worldX=350;window.eval('state').worldY=499;window.eval('render')();window.eval('locomotion').reset();
   },character);
   await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
   await expect.poll(()=>page.evaluate(()=>window.eval('playerDepth').snapshot().ready)).toBe(true);
   await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   images.push(await page.screenshot({clip:{x:280,y:335,width:215,height:270},path:`output/player-depth-optimization/${character}-${reference?'reference':'native'}.png`}));
   if(!reference){
    const before=await page.evaluate(()=>window.eval('playerDepth').snapshot());
    expect(before.maskBytes).toBe(0);await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(0);
    await page.evaluate(()=>{window.eval('locomotion').transition('turnRightToLeft');window.eval('state').worldX+=10;window.eval('updateWorldDom')();});
    await page.waitForTimeout(100);
    const after=await page.evaluate(()=>window.eval('playerDepth').snapshot());expect(after.masks).toBe(before.masks);expect(after.frames).toBe(before.frames);expect(after.contactSamples).toBeGreaterThan(before.contactSamples);
    // Actual compositor teardown must restore a masked DOM fallback immediately.
    await page.evaluate(()=>window.eval('cinematicRenderer').dispose());
    await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(1);
    await page.evaluate(()=>window.eval('cinematicRenderer').sync());await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);await expect(page.locator('[data-player-depth-canvas]')).toHaveCount(0);
   }
  }finally{await context.close();}
 }
 expect(images[1].equals(images[0])).toBe(true);
});
