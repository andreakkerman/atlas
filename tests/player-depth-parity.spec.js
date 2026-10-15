const {test,expect}=require('@playwright/test');
const {bootEditorTest}=require('./editor-workspace-helpers');
const fs=require('fs'),cp=require('child_process');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
// Capture the pre-change implementation for this investigation's parity evidence.
// This check also retains absent-versus-disabled coverage after the next commit.
const baseline=Object.fromEntries(['src/app.js','src/styles.css','src/ambient-system.js','src/cinematic-renderer.js','src/cinematic-shaders.js'].map(p=>[p,cp.execFileSync('git',['show','HEAD:'+p],{maxBuffer:8*1024*1024})]));
for(const character of ['sven','sven_arc'])for(const mode of ['illustrated','cinematic','illustrated-gpu'])test(`disabled exact image parity ${character} ${mode}`,async({browser})=>{
 const captures=[];
 for(const variant of ['legacy','absent','disabled']){
  const context=await browser.newContext({viewport:{width:1280,height:800},serviceWorkers:'block'});const page=await context.newPage();
  try{
   if(variant==='legacy')for(const [p,body] of Object.entries(baseline))await page.route('**/'+p,r=>r.fulfill({contentType:p.endsWith('.css')?'text/css':'application/javascript',body}));
   await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
   await page.addInitScript(()=>{let api;Object.defineProperty(window,'AtlasLocomotion',{configurable:true,get:()=>api,set:value=>{const create=value.createController;value.createController=options=>create({...options,blinkDelay:()=>2147483647});api=value;}});});
   await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');
   await page.evaluate(async({character,mode,variant})=>{
    await window.eval('selectMainCharacter')('LVL-0034',character);window.eval('playGraphicsFeatures=null');
    const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize();for(const v of Object.values(s))if(v&&typeof v==='object'&&'enabled' in v)v.enabled=false;s.characters.groundingShadow=false;
    if(mode==='illustrated-gpu')s.grading.enabled=true;
    r.updateLevelSettings('LVL-0034',{cinematicLighting:s,illustratedFeatures:{globalLighting:mode==='illustrated-gpu',globalGrading:true,areaDirectionalLights:false,sceneDepth:false,characterShadows:false,particleFields:false},playerDepthOcclusion:variant==='disabled'?{enabled:false,offset:-.5}:null});
    window.eval('ambientFlybyRuntime').stopAll();window.eval('level').ambientFlybys=[];window.eval('level').sceneEffects=[];window.eval('sceneEffectRuntime').dispose();
    window.eval('voxelRenderer').updateSettings({renderer:mode==='cinematic'?'cinematic':'illustrated'});window.eval('state').worldX=350;window.eval('state').worldY=499;window.eval('render')();window.eval('locomotion').reset();
   },{character,mode,variant});
   if(mode!=='illustrated')await expect(page.locator('.gameShell')).toHaveClass(mode==='cinematic'?/cinematicReady/:/illustratedSceneReady/);
   await page.addStyleTag({content:'*,*::before,*::after{animation:none!important;transition:none!important}'});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const clip={x:280,y:335,width:215,height:250};
   captures.push(await page.screenshot({clip,path:`output/player-depth/parity-${character}-${mode}-${variant}.png`}));
   if(variant!=='legacy'){const stats=await page.evaluate(()=>window.eval('playerDepth').snapshot());expect(stats.masks).toBe(0);expect(stats.bytes).toBe(0);expect(await page.locator('[data-player-depth-canvas]').count()).toBe(0);}
  }finally{await context.close();}
 }
 expect(captures[1].equals(captures[0])).toBe(true);expect(captures[2].equals(captures[0])).toBe(true);
});
