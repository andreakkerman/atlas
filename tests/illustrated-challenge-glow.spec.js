const {test,expect}=require('@playwright/test');
const {pathToFileURL}=require('url');const path=require('path');
const url=pathToFileURL(path.join(__dirname,'../index.html')).href;
for(const id of ['LVL-0001','LVL-0004','LVL-0016']) test(`${id} keeps pulse and adds shared Rune glow`,async({page},info)=>{
 if(info.project.name==='desktop-chromium') await page.emulateMedia({reducedMotion:'no-preference'});
 await page.goto(url+'?dev=editor&level='+id);
 await expect(page.locator('[data-actor="sven"]')).toBeVisible();
 const result=await page.evaluate(()=>{
  const runtime=window.eval('sceneEffectRuntime'),level=window.eval('level');
  const authored=JSON.stringify(level.sceneEffects),effects=runtime.transient;
  const canvas=document.querySelector('[data-scene-effects-canvas="worldLight"]');
  const e=effects[0],node=document.querySelector(`[data-rune="${e.instance.id.replace('challenge-glow-','')}"]`);
  const style=getComputedStyle(node,'::after'),pixels=canvas.getContext('2d').getImageData(Math.floor(e.geometry.x-e.geometry.radius),Math.floor(e.geometry.y-e.geometry.radius),Math.ceil(e.geometry.radius*2),Math.ceil(e.geometry.radius*2)).data;
  runtime.sync();
  return {count:effects.length,expected:document.querySelectorAll('.runeHotspot[data-hotspot-cue="challenge"]:not([data-npc-challenge])').length,
   presets:effects.map(e=>[e.preset.id,e.instance.variantId,e.layerSlot]),pulse:style.animationName,hasParticles:pixels.some((v,i)=>i%4===3 && v>0),pointer:getComputedStyle(canvas).pointerEvents,
   unchanged:JSON.stringify(level.sceneEffects)===authored,seed:e.instance.seed,seedAfter:runtime.transient[0].instance.seed,canvasCount:document.querySelectorAll('[data-scene-effects-canvas="worldLight"]').length};
 });
 expect(result.count).toBe(result.expected);expect(result.count).toBeGreaterThan(1);expect(result.canvasCount).toBe(1);
 expect(result.presets.every(p=>p.join('/')==='magical-glow/rune/worldLight')).toBe(true);
 expect(result.pulse).toContain('runeBreath');expect(result.hasParticles).toBe(true);expect(result.pointer).toBe('none');expect(result.unchanged).toBe(true);expect(result.seedAfter).toBe(result.seed);
 await page.screenshot({path:info.outputPath(id+'-glow.png')});
 await page.evaluate(()=>{const r=window.eval('sceneEffectRuntime');r.pause();});
 expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').rafId)).toBeNull();
 await page.evaluate(()=>window.eval('sceneEffectRuntime').play());
 expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').rafId)).not.toBeNull();
});
test('cue lifecycle clears completed/inactive effects, stays inside ring and excludes other modes',async({page})=>{
 await page.goto(url+'?dev=editor&level=LVL-0001');await expect(page.locator('[data-actor="sven"]')).toBeVisible();
 for(const viewport of [{width:1280,height:800},{width:820,height:1180}]){
  await page.setViewportSize(viewport);
  await expect.poll(()=>page.evaluate(()=>{
   const e=window.eval('sceneEffectRuntime').transient[0],stage=document.querySelector('[data-world-stage]'),scale=stage.getBoundingClientRect().height/window.eval('level').world.height;
   const node=document.querySelector(`[data-rune="${e.instance.id.replace('challenge-glow-','')}"]`);
   return e.geometry.radius*scale < node.getBoundingClientRect().width/2-20;
  })).toBe(true);
 }
 await page.evaluate(()=>{const level=window.eval('level');level.sceneEffects=[];for(const rune of level.runes)window.eval('state').completedRunes.add(rune.id);window.eval('render')();});
 expect(await page.evaluate(()=>({count:window.eval('sceneEffectRuntime').transient.length,raf:window.eval('sceneEffectRuntime').rafId}))).toEqual({count:0,raf:null});
 const pixels=await page.evaluate(()=>{const c=document.querySelector('[data-scene-effects-canvas="worldLight"]');return c.getContext('2d').getImageData(0,0,c.width,c.height).data.some(v=>v);});expect(pixels).toBe(false);
 await page.evaluate(()=>{window.eval('state').completedRunes.clear();for(const c of window.eval('level').learningChallenges)c.active=false;window.eval('render')();});
 expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').transient.length)).toBe(0);
 await page.evaluate(()=>{for(const c of window.eval('level').learningChallenges)c.active=true;window.eval('render')();});
 expect(await page.evaluate(()=>window.eval('sceneEffectRuntime').transient.length)).toBeGreaterThan(0);
 for(const mode of ['cinematic','voxel','3d','atlas-3d']){
  await page.evaluate(mode=>{window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('sceneEffectRuntime').sync();},mode);
  const status=await page.evaluate(()=>({mode:window.eval('voxelRenderer').getSettings().renderer,count:window.eval('sceneEffectRuntime').transient.length}));
  // Unsupported tablet modes intentionally fall back to Illustrated.
  if(status.mode==='illustrated') expect(status.count).toBeGreaterThan(0);
  else expect(status.count).toBe(0);
 }
});

// Isolate the generated cues from authored lighting so center pixels test the cue itself.
test('challenge Rune particles leave the center open while authored Rune retains its core',async({page})=>{
 await page.goto(url+'?dev=editor&level=LVL-0004');
 await expect(page.locator('[data-actor="sven"]')).toBeVisible();
 const result=await page.evaluate(()=>{
  const runtime=window.eval('sceneEffectRuntime'),level=window.eval('level');
  level.sceneEffects=[];
  runtime.sync();
  const effects=runtime.transient;
  const canvas=document.querySelector('[data-scene-effects-canvas="worldLight"]'),ctx=canvas.getContext('2d');
  const alpha=(x,y,w,h)=>[...ctx.getImageData(x,y,w,h).data].filter((v,i)=>i%4===3).reduce((sum,v)=>sum+v,0);
  const cues=effects.map(e=>({
   center:alpha(Math.floor(e.geometry.x)-2,Math.floor(e.geometry.y)-2,5,5),
   particles:alpha(Math.floor(e.geometry.x-e.geometry.radius),Math.floor(e.geometry.y-e.geometry.radius),Math.ceil(e.geometry.radius*2),Math.ceil(e.geometry.radius*2))
  }));
  const e=effects[0];
  level.sceneEffects=[structuredClone(e.instance)];
  window.eval('illustratedChallengeGlows = () => []');
  runtime.sync();
  return {cues,authoredCenter:alpha(Math.floor(e.geometry.x)-2,Math.floor(e.geometry.y)-2,5,5)};
 });
 expect(result.cues.length).toBeGreaterThan(1);
 for(const cue of result.cues){expect(cue.center).toBe(0);expect(cue.particles).toBeGreaterThan(0);}
 expect(result.authoredCenter).toBeGreaterThan(0);
});
