const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const {bootEditorTest,selectSceneItem}=require('./editor-workspace-helpers');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test.beforeEach(async({page},info)=>{info.runtimeErrors=[];page.on('pageerror',e=>info.runtimeErrors.push(e.message));});
test.afterEach(async({},info)=>expect(info.runtimeErrors).toEqual([]));

// Real Canvas2D pixels through the production flyby runtime, with a known map.
async function harness(page,extra={},size={width:64,height:64}) {
  await page.emulateMedia({reducedMotion:'no-preference'});
  await page.setContent('<div class="worldTrack" style="width:256px;height:256px"><span data-ambient-flyby="test"><span class="ambientFlybyFrames"><canvas data-flyby-canvas></canvas></span></span></div>');
  await page.addScriptTag({path:'src/sprite-depth.js'});
  await page.addScriptTag({path:process.env.ATLAS_FLYBY_DEPTH_REFERENCE||'src/ambient-system.js'});
  await page.evaluate(()=>window.measureTime=performance.now.bind(performance));
  await page.clock.install();
  await page.clock.pauseAt(await page.evaluate(()=>new Date(Date.now()+100).toISOString()));
  await page.evaluate(async({extra,size})=>{
    const image=async(width,height,paint)=>{
      const c=document.createElement('canvas');c.width=width;c.height=height;paint(c.getContext('2d'));
      const img=new Image();img.src=c.toDataURL();await img.decode();return img;
    };
    const sprite=await image(size.width,size.height,c=>{c.fillStyle='#ef7b21';c.fillRect(1,1,size.width-2,size.height-2);});
    const map=await image(256,256,c=>{for(const [x,y,v] of [[0,0,51],[128,0,204],[0,128,102],[128,128,153]]){c.fillStyle=`rgb(${v},${v},${v})`;c.fillRect(x,y,128,128);}});
    window.fixture={id:'test',world:{width:256,height:256,depthmap:'depth.png'},ambientFlybys:[{id:'test',frameA:'sprite.png',playback:'static',scale:1,speed:80,path:[{x:96,y:96},{x:160,y:160}],faceFlightDirection:false,rotateAlongPath:false,motionProfile:'linear',depthOcclusion:true,depthBias:0,soundTriggers:[],intervalMinMs:60000,intervalMaxMs:60000,...extra}]};
    window.warnings=[];window.loads=[];
    window.runtime=AtlasAmbientSystem.createFlybyRuntime({getLevel:()=>fixture,getScreen:()=> 'scene',canDebug:()=>true,loadAssetFX:false,warn:m=>warnings.push(m),assetCache:{image:async p=>{loads.push(p);return p==='depth.png'?map:sprite;},normalize:p=>p}});
    await runtime.prepareLevel(fixture);runtime.stopAll();runtime.preview('test');
    window.instance=runtime.active.get('test');window.canvas=document.querySelector('[data-flyby-canvas]');
    window.sourcePixels=(()=>{const c=document.createElement('canvas');c.width=sprite.width;c.height=sprite.height;c.getContext('2d').drawImage(sprite,0,0);return c.getContext('2d').getImageData(0,0,c.width,c.height).data;})();
    window.setConfig=async patch=>{const old=fixture.ambientFlybys;fixture.ambientFlybys=[{...old[0],...patch}];await runtime.updateLevel(old);};
    window.checkPixels=()=>{
      const config=fixture.ambientFlybys[0],{point,rotation,facing}=instance.lastDraw,angle=rotation*Math.PI/180,sin=Math.sin(angle),cos=Math.cos(angle);
      const sample=(x,y)=>{const px=Math.max(0,Math.min(255,Math.round(x/256*255))),py=Math.max(0,Math.min(255,Math.round(y/256*255)));return (px<128?(py<128?51:102):(py<128?204:153))/255;};
      const groundY=canvas.height*.46*config.scale,foot=sample(point.x-sin*groundY,point.y+cos*groundY);
      const actor=config.depthMode==='fixed'?(config.fixedDepth??.5):Math.max(0,Math.min(1,foot+config.depthBias));
      const pixels=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
      let mismatch=0,visible=0,hidden=0;
      for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
        const i=(y*canvas.width+x)*4,dx=(x+.5-canvas.width/2)*config.scale*facing,dy=(y+.5-canvas.height/2)*config.scale;
        const scene=sample(point.x+cos*dx-sin*dy,point.y+sin*dx+cos*dy);
        const expected=config.depthOcclusion?Math.round(sourcePixels[i+3]*Math.max(0,Math.min(1,1+(actor-scene)/.01))):sourcePixels[i+3];
        if(Math.abs(pixels[i+3]-expected)>1)mismatch++;
        if(sourcePixels[i+3]){if(expected===255)visible++;if(expected===0)hidden++;}
      }
      return {mismatch,visible,hidden,actor,foot,point,revision:Number(canvas.dataset.revision),same:runtime.active.get('test')===instance&&document.querySelector('[data-flyby-canvas]')===canvas};
    };
  },{extra,size});
}

test('fixed depth stays constant across horizontal and vertical motion with pixel occlusion',async({page})=>{
  await harness(page,{depthMode:'fixed',fixedDepth:.5,depthBias:1});
  const rows=[];
  for(let step=0;step<8;step++){
    await page.clock.runFor(100);
    rows.push(await page.evaluate(()=>checkPixels()));
  }
  expect(rows.every(r=>r.mismatch===0&&r.actor===.5&&r.same)).toBe(true);
  expect(rows.at(-1).point.x-rows[0].point.x).toBeGreaterThan(30);
  expect(rows.at(-1).point.y-rows[0].point.y).toBeGreaterThan(30);
  expect(new Set(rows.map(r=>r.foot)).size).toBeGreaterThan(1);
  expect(rows.some(r=>r.visible>0&&r.hidden>0)).toBe(true);
  expect(await page.evaluate(()=>warnings)).toEqual([]);
});

test('legacy relative pixels, fixed endpoints, disabled depth and paused/held invalidation',async({page})=>{
  await harness(page,{depthBias:-.025});
  await page.evaluate(()=>runtime.togglePreview('test'));
  const legacy=await page.evaluate(()=>({pixels:Array.from(canvas.getContext('2d').getImageData(0,0,64,64).data),check:checkPixels()}));
  expect(legacy.check.mismatch).toBe(0);
  await page.evaluate(()=>setConfig({depthMode:'relative',fixedDepth:.9}));
  expect(await page.evaluate(()=>Array.from(canvas.getContext('2d').getImageData(0,0,64,64).data))).toEqual(legacy.pixels);
  await page.evaluate(()=>{instance.distance=runtime.cacheFor(fixture.ambientFlybys[0]).totalLength*.5;runtime.refreshPreviews();});
  for(const fixedDepth of [0,.5,1,.795]){
    await page.evaluate(fixedDepth=>setConfig({depthMode:'fixed',fixedDepth}),fixedDepth);
    const row=await page.evaluate(()=>checkPixels());expect(row.mismatch).toBe(0);expect(row.same).toBe(true);
    if(fixedDepth===0)expect(row.visible).toBe(0);
    if(fixedDepth===1)expect(row.hidden).toBe(0);
    if(fixedDepth===.5){expect(row.visible).toBeGreaterThan(0);expect(row.hidden).toBeGreaterThan(0);}
  }
  await page.evaluate(()=>{instance.held=true;instance.paused=false;return setConfig({fixedDepth:.5,mirrorX:true,rotateAlongPath:true,maxRotationDeg:30});});
  expect((await page.evaluate(()=>checkPixels())).mismatch).toBe(0);
  const revision=await page.evaluate(()=>Number(canvas.dataset.revision));
  await page.clock.runFor(300);expect(await page.evaluate(()=>Number(canvas.dataset.revision))).toBe(revision);
  await page.evaluate(()=>setConfig({depthOcclusion:false}));
  expect((await page.evaluate(()=>checkPixels())).mismatch).toBe(0);
  await page.evaluate(()=>setConfig({depthOcclusion:true,fixedDepth:0}));
  expect((await page.evaluate(()=>checkPixels())).visible).toBe(0);
});

test('disabled fixed depth needs no map and missing required depth keeps preparation failure',async({page})=>{
  await harness(page,{depthMode:'fixed',fixedDepth:0,depthOcclusion:false});
  expect(await page.evaluate(()=>loads)).toEqual(['sprite.png']);
  expect((await page.evaluate(()=>checkPixels())).hidden).toBe(0);
  const result=await page.evaluate(async()=>{
    runtime.releaseLevel();fixture.ambientFlybys[0].depthOcclusion=true;
    const r=AtlasAmbientSystem.createFlybyRuntime({getLevel:()=>fixture,getScreen:()=> 'scene',loadAssetFX:false,warn:m=>warnings.push(m),assetCache:{image:async()=>{throw new Error('missing test depthmap');}}});
    await r.prepareLevel(fixture);return {ready:r.readiness.size,active:r.active.size,warnings};
  });
  expect(result.ready).toBe(0);expect(result.active).toBe(0);expect(result.warnings).toEqual(['[Atlas] Flyby depth preparation failed: missing test depthmap']);
});

test('fixed depth validates optional fields without migrating old configurations',async()=>{
  const api=require('../src/ambient-system');
  for(const config of [{},{depthMode:'relative'},{depthMode:'fixed'},...[0,.001,.5,1].map(fixedDepth=>({depthMode:'fixed',fixedDepth}))])expect(api.sequenceErrors(config)).toEqual([]);
  for(const depthMode of ['other',null,1])expect(api.sequenceErrors({depthMode}).join(' ')).toContain('depthMode');
  for(const fixedDepth of [-.001,1.001,NaN,Infinity,'0.5',null])expect(api.sequenceErrors({fixedDepth}).join(' ')).toContain('fixedDepth');
});

test('fixed depth mask cost and cache reuse',async({page},info)=>{
  await harness(page,{}, {width:640,height:360});
  const metrics=await page.evaluate(async()=>{
    runtime.togglePreview('test');
    const samples={relative:[],fixed:[]},counts={};
    // Time the original functions; count work separately so instrumentation
    // does not dominate the per-pixel hot loop being measured.
    for(let round=0;round<12;round++)for(const mode of (round%2?['fixed','relative']:['relative','fixed'])){
      await setConfig({depthMode:mode,fixedDepth:.5});
      const start=measureTime();
      for(let i=0;i<20;i++){instance.distance=(i+round)%80;runtime.refreshPreviews();}
      if(round>=2)samples[mode].push((measureTime()-start)/20);
    }
    const originalSample=AtlasSpriteDepth.sample,originalPut=CanvasRenderingContext2D.prototype.putImageData;
    let taps=0,writes=0;
    AtlasSpriteDepth.sample=(...args)=>{taps++;return originalSample(...args);};
    CanvasRenderingContext2D.prototype.putImageData=function(...args){writes++;return originalPut.apply(this,args);};
    for(const mode of ['relative','fixed']){
      await setConfig({depthMode:mode,fixedDepth:.5});
      taps=0;writes=0;
      for(let i=0;i<20;i++){instance.distance=i;runtime.refreshPreviews();}
      counts[mode]={taps,writes};
    }
    const mask=instance.mask,revision=canvas.dataset.revision,loadsBefore=loads.length;
    taps=0;writes=0;for(let i=0;i<50;i++)runtime.refreshPreviews();
    const cached={taps,writes,mask:instance.mask===mask,revision:canvas.dataset.revision===revision,loads:loads.length-loadsBefore};
    AtlasSpriteDepth.sample=originalSample;CanvasRenderingContext2D.prototype.putImageData=originalPut;
    return {samples,counts,cached};
  });
  expect(metrics.cached).toEqual({taps:0,writes:0,mask:true,revision:true,loads:0});
  expect(metrics.counts.relative.writes).toBe(20);expect(metrics.counts.fixed.writes).toBe(20);
  expect(metrics.counts.relative.taps).toBe(20*(640*360+1));
  if(!process.env.ATLAS_FLYBY_DEPTH_REFERENCE)expect(metrics.counts.fixed.taps).toBe(20*640*360);
  const median=a=>[...a].sort((a,b)=>a-b)[Math.floor(a.length/2)];
  const summary={relativeMedianMs:median(metrics.samples.relative),fixedMedianMs:median(metrics.samples.fixed),...metrics};
  fs.mkdirSync('output/flyby-fixed-depth',{recursive:true});
  fs.writeFileSync(`output/flyby-fixed-depth/performance-${process.env.ATLAS_FLYBY_DEPTH_REFERENCE?'before':'after'}-${info.project.name}.json`,JSON.stringify(summary,null,2));
  await info.attach('mask performance',{body:JSON.stringify(summary,null,2),contentType:'application/json'});
});

async function appScene(page,mode='illustrated'){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await bootEditorTest(page,base+'/?dev=editor&level=LVL-0034');
  await page.evaluate(async mode=>{
    const r=window.eval('ambientFlybyRuntime');r.stopAll();
    const c={...window.eval('level').ambientFlybys[0],id:'fixed-depth-test',path:[{x:350,y:499},{x:750,y:420}],scale:1,speed:50,playback:'static',depthOcclusion:true,depthBias:-.1,softness:0,saturation:1,soundTriggers:[]};
    delete c.depthMode;delete c.fixedDepth;
    await window.eval('setLevelAmbientFlybys')([c]);r.stopAll();
    window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();
  },mode);
}

for(const mode of ['illustrated','cinematic'])test(`fixed depth uses the real map and retained compositor canvas in ${mode}`,async({page},info)=>{
  await appScene(page,mode);
  if(mode==='cinematic'&&info.project.name==='desktop-chromium')await expect(page.locator('.gameShell')).toHaveClass(/cinematicReady/);
  await page.clock.install();
  const result=await page.evaluate(async()=>{
    const r=window.eval('ambientFlybyRuntime'),c=window.eval('level').ambientFlybys[0];
    await window.eval('setLevelAmbientFlybys')([{...c,depthMode:'fixed',fixedDepth:.85}]);r.preview(c.id);r.togglePreview(c.id);
    const instance=r.active.get(c.id),canvas=document.querySelector('[data-flyby-canvas]'),mask=instance.mask;
    const depth=AtlasSpriteDepth.prepare(await window.eval('assetCache').image(AtlasAmbientSystem.depthPathFor(window.eval('level'))));
    const raw=document.createElement('canvas');raw.width=canvas.width;raw.height=canvas.height;raw.getContext('2d').drawImage(r.readiness.get('LVL-0034:'+c.id).images[0],0,0);
    const original=raw.getContext('2d').getImageData(0,0,raw.width,raw.height).data,rows=[];
    for(const progress of [0,.3,.6,.9]){
      instance.distance=r.cacheFor(c).totalLength*progress;r.refreshPreviews();
      const {point,rotation,facing}=instance.lastDraw,angle=rotation*Math.PI/180,cos=Math.cos(angle),sin=Math.sin(angle),p=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
      let mismatch=0,hidden=0,visible=0;
      for(let y=0;y<canvas.height;y++)for(let x=0;x<canvas.width;x++){
        const i=(y*canvas.width+x)*4;if(original[i+3]!==255)continue;
        const dx=(x+.5-canvas.width/2)*c.scale*facing,dy=(y+.5-canvas.height/2)*c.scale;
        const scene=AtlasSpriteDepth.sample(depth,window.eval('level').world,point.x+(cos*dx-sin*dy)/instance.scaleX,point.y+(sin*dx+cos*dy)/instance.scaleY);
        const expected=Math.round(255*Math.max(0,Math.min(1,1+(.85-scene)/.01)));
        if(Math.abs(p[i+3]-expected)>1)mismatch++;if(expected===0)hidden++;if(expected===255)visible++;
      }
      r.setDepthDebug(true);const debug=instance.depthDebug;r.setDepthDebug(false);
      window.eval('state').cameraX+=2;window.eval('render')();
      rows.push({mismatch,hidden,visible,debug,same:document.querySelector('[data-flyby-canvas]')===canvas&&instance.mask===mask});
    }
    return rows;
  });
  expect(result.every(r=>r.mismatch===0&&r.same&&r.debug.actorDepth===.85&&r.debug.mode==='fixed')).toBe(true);
  expect(result.some(r=>r.hidden>0&&r.visible>0)).toBe(true);
  await page.clock.runFor(64);
  if(mode==='cinematic'&&info.project.name==='desktop-chromium'){
    const gpu=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());
    expect(gpu.error).toBeFalsy();expect(gpu.textureUploads.filter(u=>u.path.startsWith('prepared flyby'))).toHaveLength(1);
  }
  await page.screenshot({path:`output/flyby-fixed-depth/real-${mode}-${info.project.name}.png`});
});

test('editor mode, precise controls, draft and Apply/reload preserve both values',async({page,request},info)=>{
  test.skip(info.project.name!=='desktop-chromium','The authoring workspace is desktop only.');
  await appScene(page);await selectSceneItem(page,'flyby','fixed-depth-test');
  await page.evaluate(()=>document.querySelectorAll('[data-developer-tools] details').forEach(d=>d.open=true));
  const field=k=>page.locator(`[data-flyby-setting="${k}"]`);
  await expect(field('depthMode')).toHaveValue('relative');await expect(field('depthBias')).toHaveValue('-0.1');
  await page.locator('[data-debug-action="preview-flyby"]').click();
  await page.locator('[data-debug-action="preview-flyby"]').click();
  await page.evaluate(()=>{window.savedInstance=window.eval('ambientFlybyRuntime').active.get('fixed-depth-test');window.savedCanvas=document.querySelector('[data-flyby-canvas]');});
  await field('depthMode').selectOption('fixed');await expect(field('depthBias')).toHaveCount(0);
  const number=page.locator('[data-flyby-setting="fixedDepth"][type="number"]');
  const slider=page.locator('[data-flyby-setting="fixedDepth"][type="range"]');
  await expect(number).toHaveValue('0.500');await number.fill('0.812');await number.press('ArrowUp');await expect(slider).toHaveValue('0.813');
  await number.press('ArrowDown');await expect(slider).toHaveValue('0.812');
  await slider.focus();await slider.press('ArrowRight');await expect(number).toHaveValue('0.813');
  await page.screenshot({path:'output/flyby-fixed-depth/editor.png'});
  expect(await page.evaluate(()=>window.eval('ambientFlybyRuntime').active.get('fixed-depth-test')===savedInstance&&document.querySelector('[data-flyby-canvas]')===savedCanvas&&savedInstance.paused)).toBe(true);
  await field('depthMode').selectOption('relative');await expect(field('depthBias')).toHaveValue('-0.1');
  await field('depthMode').selectOption('fixed');await expect(number).toHaveValue('0.813');
  const payload=await page.evaluate(()=>window.eval('persistedLevelEditorPayload')());
  const endpoint=base+'/__dev/levels/LVL-0034';
  expect((await request.post(endpoint+'/editor-draft',{data:payload})).ok()).toBe(true);
  expect((await(await request.get(endpoint+'/editor-draft')).json()).ambientFlybys[0]).toMatchObject({depthMode:'fixed',fixedDepth:.813,depthBias:-.1});
  // Reload the real draft through the existing loader before applying it.
  await page.unroute('**/__dev/levels/*/editor-draft');await page.reload();
  await page.waitForFunction(()=>window.eval('state.screen')==='scene');
  expect(await page.evaluate(()=>window.eval('level').ambientFlybys[0])).toMatchObject({depthMode:'fixed',fixedDepth:.813,depthBias:-.1});
  for(const patch of [{depthMode:'bad'},{fixedDepth:-.001},{fixedDepth:1.001},{fixedDepth:'0.5'}]){
    const response=await request.post(endpoint+'/apply-editor',{data:{ambientFlybys:[{...payload.ambientFlybys[0],...patch}]}});expect(response.status()).toBe(400);
  }
  expect((await request.post(endpoint+'/apply-editor',{data:payload})).ok()).toBe(true);
  await page.reload();await page.waitForFunction(()=>window.eval('state.screen')==='scene');
  expect(await page.evaluate(()=>window.eval('level').ambientFlybys[0])).toMatchObject({depthMode:'fixed',fixedDepth:.813,depthBias:-.1});
});

test('fixed depth updates attached FX masks while paused and reuses their surfaces',async({page})=>{
  // Keep procedural edge rasterization on one backend across pixel readbacks.
  await page.addInitScript(()=>{
    const getContext=HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext=function(type,options){return getContext.call(this,type,type==='2d'?{...options,willReadFrequently:true}:options);};
  });
  await appScene(page);
  const result=await page.evaluate(async()=>{
    const r=window.eval('ambientFlybyRuntime'),c={...window.eval('level').ambientFlybys[0],frameA:'assets/ambient/flybys/shredder/shredder.png',frameB:null,path:[{x:600,y:370},{x:1300,y:450}],scale:.35,depthMode:'fixed',fixedDepth:1};
    delete c.frames;delete c.playback;
    await window.eval('setLevelAmbientFlybys')([c]);r.preview(c.id);r.togglePreview(c.id);
    const instance=r.active.get(c.id),body=document.querySelector('[data-flyby-canvas]'),planes=instance.fx.planes.filter(p=>p.items.length),masks=planes.map(p=>p.mask);
    const alpha=canvas=>{const p=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;let sum=0;for(let i=3;i<p.length;i+=4)sum+=p[i];return sum;};
    const visible={body:alpha(body),fx:planes.map(p=>alpha(p.canvas))};
    await window.eval('setLevelAmbientFlybys')([{...c,fixedDepth:0}]);
    const hidden={body:alpha(body),fx:planes.map(p=>alpha(p.canvas))};
    await window.eval('setLevelAmbientFlybys')([{...c,fixedDepth:.5,depthOcclusion:false}]);
    return {visible,hidden,disabled:{body:alpha(body),fx:planes.map(p=>alpha(p.canvas))},same:planes.every((p,i)=>instance.fx.planes.includes(p)&&p.mask===masks[i])&&document.querySelector('[data-flyby-canvas]')===body};
  });
  expect(result.visible.body).toBeGreaterThan(10000);expect(result.visible.fx.length).toBeGreaterThan(0);
  expect(result.hidden.body).toBeLessThan(result.visible.body*.05);
  result.visible.fx.forEach((alpha,i)=>{expect(alpha).toBeGreaterThan(0);expect(result.hidden.fx[i]).toBeLessThan(alpha*.05);});
  expect(result.disabled).toEqual(result.visible);expect(result.same).toBe(true);
});
