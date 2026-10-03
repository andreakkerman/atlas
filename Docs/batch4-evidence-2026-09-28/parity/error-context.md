# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: illustrated-compositor.spec.js >> neutral Illustrated ownership preserves frozen production composition
- Location: tests\illustrated-compositor.spec.js:25:1

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 1
Received:   11.3406943359375
```

```
Error: expect(received).toBeLessThan(expected)

Expected: < 1
Received:   10.495106770833333
```

# Page snapshot

```yaml
- main [ref=e3]:
  - navigation "Spelbesturing" [ref=e4]:
    - button "Terug naar menu" [ref=e5] [cursor=pointer]: Menu
    - button "Grafische instellingen" [ref=e6] [cursor=pointer]: ◆Graphics
  - region "Verbonden wereld" [ref=e7]:
    - generic [ref=e8]:
      - img "Een doorlopend bospad naar de Vikingtempel" [ref=e9]
      - generic "Particle Fields"
      - button "Uil" [ref=e10] [cursor=pointer]
      - button "Bosrune" [ref=e12] [cursor=pointer]
      - button "Runenpoort" [ref=e13] [cursor=pointer]
      - button "Zonrune" [ref=e14] [cursor=pointer]
      - button "Steenrune" [ref=e15] [cursor=pointer]
      - button "Praat met Freya" [ref=e16] [cursor=pointer]
      - generic:
        - img "Sven"
    - img
  - generic [ref=e18]:
    - generic "Avonturenteam" [ref=e19]:
      - button "Minnie laten spinnen" [ref=e20] [cursor=pointer]:
        - img "Minnie"
        - generic [ref=e21]: Minnie
      - button "Moose laten spinnen" [ref=e22] [cursor=pointer]:
        - img "Moose"
        - generic [ref=e23]: Moose
    - generic:
      - paragraph: Minnie
      - paragraph: Kijk, blauwe tekens tussen de oude bomen.
      - paragraph: Bos - 0/3 opdrachten voltooid
```

# Test source

```ts
  1   | const {test,expect}=require('@playwright/test');
  2   | const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
  3   | test('transient producer publishes empty, active, cleared and restarted frames',async({page})=>{
  4   |  await page.setContent('<canvas data-scene-effects-canvas="worldLight"></canvas>');
  5   |  await page.addScriptTag({path:require('path').join(__dirname,'../src/scene-effects.js')});
  6   |  const result=await page.evaluate(()=>{
  7   |   const level={id:'transient-test',world:{width:400,height:400},sceneEffects:[]};let transient=[];
  8   |   const runtime=AtlasSceneEffects.createRuntime({getLevel:()=>level,getScreen:()=> 'scene',getTransientEffects:()=>transient});
  9   |   const canvas=document.querySelector('canvas'),read=()=>({frame:AtlasSceneEffects.canvasFrame(canvas),visible:canvas.getContext('2d').getImageData(0,0,400,400).data.some((v,i)=>i%4===3&&v>0)});
  10  |   runtime.prepareLevel(level);const empty=read();
  11  |   transient=[AtlasSceneEffects.defaultInstance('light-source-enhancement','large-brazier',level.world)];runtime.sync();const active=read();
  12  |   transient=[];runtime.sync();const cleared=read();
  13  |   transient=[AtlasSceneEffects.defaultInstance('light-source-enhancement','large-brazier',level.world)];runtime.sync();const restarted=read();runtime.dispose();const stopped=read();
  14  |   return {empty,active,cleared,restarted,stopped};
  15  |  });
  16  |  expect(result.empty.visible).toBe(false);expect(result.empty.frame.active).toBe(false);
  17  |  for(const key of ['active','restarted']){expect(result[key].visible).toBe(true);expect(result[key].frame.active).toBe(true);}
  18  |  for(const key of ['cleared','stopped']){expect(result[key].visible).toBe(false);expect(result[key].frame.active).toBe(false);}
  19  |  expect(result.cleared.frame.revision).toBeGreaterThan(result.active.frame.revision);expect(result.restarted.frame.revision).toBeGreaterThan(result.cleared.frame.revision);
  20  | });
  21  | async function difference(page,a,b){return page.evaluate(async images=>{
  22  |  const read=async src=>{const image=new Image();image.src='data:image/png;base64,'+src;await image.decode();const c=document.createElement('canvas');c.width=image.width;c.height=image.height;const ctx=c.getContext('2d');ctx.drawImage(image,0,0);return ctx.getImageData(0,0,c.width,c.height).data;};
  23  |  const [a,b]=await Promise.all(images.map(read));let sum=0;for(let i=0;i<a.length;i++)if(i%4!==3)sum+=Math.abs(a[i]-b[i]);return sum/(a.length*.75);
  24  | },[a.toString('base64'),b.toString('base64')]);}
  25  | test('neutral Illustrated ownership preserves frozen production composition',async({page},info)=>{
  26  |  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Native WebGPU');test.setTimeout(90000);
  27  |  await page.addInitScript(()=>{
  28  |   const raf=requestAnimationFrame;window.requestAnimationFrame=fn=>window.freezeEffects&&fn.name==='draw'?0:raf(fn);
  29  |   const write=GPUQueue.prototype.writeBuffer;GPUQueue.prototype.writeBuffer=function(buffer,offset,data,...rest){if(data instanceof Float32Array&&data.length===128){data=data.slice();data[5]=10;}return write.call(this,buffer,offset,data,...rest);};
  30  |  });
  31  |  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  32  |  await page.goto(base+'/?dev=editor&level=LVL-0004');await page.waitForFunction(()=>window.eval('typeof selectLevel')==='function');
  33  |  await page.addStyleTag({content:'*,*::before,*::after{animation-play-state:paused!important;transition:none!important}'});
  34  |  for(const id of ['LVL-0004','LVL-0001']){
  35  |   await page.evaluate(async id=>{window.freezeEffects=false;window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')(id,{startImmediately:true,recordStart:false,allowDisabledForEditor:true});window.freezeEffects=true;},id);
  36  |   const toggle=async enabled=>{
  37  |    await page.evaluate(({id,enabled})=>{const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings(id).cinematicLighting);s.grading={...s.grading,enabled:true,exposure:0,contrast:1,saturation:1,highlights:0,shadows:0,warmth:0,tint:0,blackPoint:0};r.updateLevelSettings(id,{cinematicLighting:s,illustratedFeatures:{globalLighting:true,globalGrading:enabled,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true}});window.eval('cinematicRenderer').sync();},{id,enabled});
  38  |    await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');await page.waitForTimeout(200);
  39  |   };
  40  |   await toggle(false);const before=await page.screenshot({path:info.outputPath(id+'-dom.png')});
  41  |   await toggle(true);const after=await page.screenshot({path:info.outputPath(id+'-full.png')});
  42  |   const mae=await difference(page,before,after);console.log('NEUTRAL_PARITY',id,mae);
  43  |   await toggle(false);const restored=await page.screenshot();expect(await difference(page,before,restored)).toBeLessThan(.1);
> 44  |   expect.soft(mae).toBeLessThan(1);
      |                    ^ Error: expect(received).toBeLessThan(expected)
  45  |  }
  46  | });
  47  | test('producer revisions suppress empty and unchanged uploads across recovery',async({page},info)=>{
  48  |  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Native WebGPU');
  49  |  test.setTimeout(90000);
  50  |  await page.addInitScript(()=>{
  51  |   const raf=requestAnimationFrame;
  52  |   window.requestAnimationFrame=fn=>window.freezeEffects&&fn.name==='draw'?0:raf(fn);
  53  |   window.gpuFrames=[];let current={passes:0,draws:0,uploads:0,empty:0},draws=0;
  54  |   window.liveGPU={textures:new Set(),buffers:new Set()};
  55  |   for(const [kind,create,prototype] of [['textures','createTexture',GPUTexture.prototype],['buffers','createBuffer',GPUBuffer.prototype]]){
  56  |    const make=GPUDevice.prototype[create],destroy=prototype.destroy;
  57  |    GPUDevice.prototype[create]=function(...args){const value=make.apply(this,args);liveGPU[kind].add(value);return value;};
  58  |    prototype.destroy=function(...args){liveGPU[kind].delete(this);return destroy.apply(this,args);};
  59  |   }
  60  |   const wrap=(proto,key,fn)=>{const original=proto[key];proto[key]=function(...args){fn(args);return original.apply(this,args);};};
  61  |   wrap(GPUCommandEncoder.prototype,'beginRenderPass',()=>{current.passes++;draws=0;});
  62  |   wrap(GPURenderPassEncoder.prototype,'draw',()=>{current.draws++;draws++;});
  63  |   wrap(GPURenderPassEncoder.prototype,'end',()=>{if(!draws)current.empty++;});
  64  |   wrap(GPUQueue.prototype,'copyExternalImageToTexture',args=>{if(args[0].source?.matches?.('[data-scene-effects-canvas]'))current.uploads++;});
  65  |   wrap(GPUQueue.prototype,'submit',()=>{gpuFrames.push(current);current={passes:0,draws:0,uploads:0,empty:0};});
  66  |  });
  67  |  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  68  |  await page.goto(base+'/?dev=editor&level=LVL-0004');
  69  |  await page.waitForFunction(()=>typeof window.AtlasCinematicRenderer!=='undefined' && window.eval('typeof selectLevel')==='function');
  70  |  await page.evaluate(async()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});await window.eval('selectLevel')('LVL-0004',{startImmediately:true,recordStart:false,allowDisabledForEditor:true});});
  71  |  const flags=async enabled=>page.evaluate(enabled=>{window.eval('worldResolver').updateLevelSettings('LVL-0004',{illustratedFeatures:{globalLighting:true,globalGrading:typeof enabled==='boolean'?enabled:false,areaDirectionalLights:false,sceneDepth:false,characterShadows:true,particleFields:true,...(typeof enabled==='object'?enabled:{})}});window.eval('render')();},enabled);
  72  |  const ready=async()=>expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
  73  |  for(const dpr of [1,2]){
  74  |   const cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setDeviceMetricsOverride',{width:1180,height:734,deviceScaleFactor:dpr,mobile:false});
  75  |   await page.evaluate(()=>{window.freezeEffects=false;});
  76  |   const metrics={};
  77  |   for(const [name,value] of Object.entries({baseline:false,grading:true,area:{areaDirectionalLights:true},combined:{globalGrading:true,areaDirectionalLights:true},depth:{sceneDepth:true}})){
  78  |    await flags(value);await ready();await page.waitForTimeout(150);await page.evaluate(()=>gpuFrames.length=0);
  79  |    const pacing=await page.evaluate(()=>new Promise(resolve=>{const frames=[];let last=performance.now();function sample(now){frames.push(now-last);last=now;if(frames.length===30)resolve(frames);else requestAnimationFrame(sample);}requestAnimationFrame(sample);}));
  80  |    metrics[name]=await page.evaluate(()=>({frames:gpuFrames,snapshot:window.eval('cinematicRenderer').snapshot(),live:{textures:liveGPU.textures.size,buffers:liveGPU.buffers.size}}));metrics[name].pacing=pacing;
  81  |    expect(metrics[name].frames.every(f=>f.empty===0&&f.passes===(name==='baseline'?3:5))).toBe(true);
  82  |   }
  83  |   console.log('COMPOSITOR_METRICS',dpr,JSON.stringify(Object.fromEntries(Object.entries(metrics).map(([name,m])=>[name,{passes:m.frames.at(-1).passes,draws:m.frames.at(-1).draws,uploads:m.frames.reduce((s,f)=>s+f.uploads,0)/m.frames.length,targets:m.snapshot.renderTargets,live:m.live,cpuMs:m.snapshot.averageMs,fps:30000/m.pacing.reduce((s,t)=>s+t,0)}]))));
  84  |   await info.attach(`metrics-dpr-${dpr}.json`,{body:JSON.stringify(metrics),contentType:'application/json'});
  85  |   await flags(true);await ready();
  86  |   await page.evaluate(()=>{window.freezeEffects=true;});
  87  |   await page.waitForTimeout(150);
  88  |   await page.evaluate(()=>gpuFrames.length=0);await page.waitForTimeout(250);
  89  |   const frozen=await page.evaluate(()=>gpuFrames);
  90  |   expect(frozen.length).toBeGreaterThan(2);expect(frozen.every(f=>f.uploads===0&&f.empty===0&&f.passes===5)).toBe(true);
  91  |   // The production clear publishes emptiness; no old texture may be drawn.
  92  |   await page.evaluate(()=>{window.eval('sceneEffectRuntime').pause();gpuFrames.length=0;});await page.waitForTimeout(150);
  93  |   const cleared=await page.evaluate(()=>gpuFrames);
  94  |   expect(cleared.every(f=>f.uploads===0&&f.draws===frozen.at(-1).draws-2)).toBe(true);
  95  |   await page.evaluate(()=>{gpuFrames.length=0;window.eval('sceneEffectRuntime').play();});await page.waitForTimeout(150);
  96  |   const resumed=await page.evaluate(()=>gpuFrames);
  97  |   expect(resumed.reduce((sum,f)=>sum+f.uploads,0)).toBe(2);
  98  |   expect(resumed.at(-1).draws).toBe(frozen.at(-1).draws);
  99  |   await flags(false);await ready();expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().renderTargets)).toBe(1);
  100 |   await flags(true);await ready();expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().renderTargets)).toBe(2);
  101 |   await page.evaluate(()=>{window.eval('cinematicRenderer').dispose();window.eval('cinematicRenderer').sync();});await ready();
  102 |   expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().renderTargets)).toBe(2);
  103 |   await info.attach(`dpr-${dpr}.json`,{body:JSON.stringify({frozen,cleared,resumed}),contentType:'application/json'});
  104 |  }
  105 |  await page.evaluate(()=>window.eval('cinematicRenderer').dispose());
  106 |  expect(await page.evaluate(()=>({textures:liveGPU.textures.size,buffers:liveGPU.buffers.size,scheduled:window.eval('cinematicRenderer').snapshot().scheduled}))).toEqual({textures:0,buffers:0,scheduled:false});
  107 | });
  108 | 
  109 | 
  110 | 
```