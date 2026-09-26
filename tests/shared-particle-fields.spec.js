const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const contract=require('../src/cinematic-settings');
const source={window:{}};vm.runInNewContext(fs.readFileSync('Levels/world-config.js','utf8'),source);
const authored=source.window.SVEN_WORLD_CONFIG.levels;
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
test.beforeEach(async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
});
const snapshot=page=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot());
async function ready(page){await expect.poll(async()=>{const s=await snapshot(page);return s.error||s.status;},{timeout:25000}).toBe('ready');}
async function mode(page,renderer){await page.evaluate(renderer=>{window.eval('voxelRenderer').updateSettings({renderer});window.eval('render')();},renderer);await ready(page);}
async function open(page,id){await page.goto(base+'/?dev=editor');await page.evaluate(id=>window.eval('selectLevel')(id,{startImmediately:true,recordStart:false,allowDisabledForEditor:true}),id);}
function errors(page){const result=[];page.on('pageerror',e=>result.push(e.message));page.on('console',m=>{if(m.type()==='error')result.push(m.text());});return result;}

// Audit every production level, including authored fields that are disabled.
for(const [id,config] of Object.entries(authored).filter(([id])=>id!=='LVL-0000' && /^LVL-\d+$/.test(id))){
  test(`shared authored Particle Fields ${id}`,async({page})=>{
    const faults=errors(page);await open(page,id);
    const expected=contract.normalize(config.cinematicLighting),effective=contract.effective(expected);
    const count=effective.particles.enabled?effective.particles.items.filter(i=>i.enabled).reduce((n,i)=>n+contract.particleCount(i),0):0;
    for(const renderer of ['illustrated','cinematic','illustrated']){
      if(renderer==='illustrated'&&!count){await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();});await expect.poll(async()=>(await snapshot(page)).buffers).toBe(0);continue;}
      await mode(page,renderer);const s=await snapshot(page);
      expect(s.particles).toBe(count);expect(s.error).toBeNull();expect(s.mode).toBe(renderer);
      expect(await page.evaluate(()=>window.eval('cinematicRenderer').getSettings())).toEqual(expected);
      if(renderer==='illustrated'){
        expect(s.pipelines).toEqual(['particle']);expect(s.renderTargets).toBe(0);expect(s.shadowDraws).toBe(0);expect(s.sprites).toBe(0);
        expect(s.textureUploads.map(t=>t.purpose)).toEqual(['scene depthmap']);expect(s.depthStatus).toBe('ready');
        await expect(page.locator('.gameShell')).not.toHaveClass(/cinematicReady/);
        expect(await page.locator('.worldArt').evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
        expect(await page.locator('[data-actor="sven"]').evaluate(e=>getComputedStyle(e).opacity)).toBe('1');
      }
    }
    await page.evaluate(()=>window.eval('cinematicRenderer').dispose());
    const idle=await snapshot(page);expect(idle.buffers).toBe(0);expect(idle.renderTargets).toBe(0);expect(idle.depthCached).toBe(0);expect(idle.scheduled).toBe(false);
    expect(faults).toEqual([]);
  });
}

test('all presets, controls, layers and disable/re-enable use one live config',async({page})=>{
  const faults=errors(page);await open(page,'LVL-0034');await mode(page,'illustrated');
  for(const name of Object.keys(contract.presets.particles)){
    const item=contract.preset('particles',name,contract.instance('particles',{x:1090,y:345,width:1550,height:630,shape:'rectangle'}));
    Object.assign(item,{direction:37,depth:.4,depthInfluence:.8,depthSoftness:.2,depthSpread:.5,count:19999,scaleCountWithArea:true});
    const settings=contract.normalize({particles:{enabled:true,items:[item]}});
    await page.evaluate(s=>{window.eval('worldResolver').updateLevelSettings('LVL-0034',{cinematicLighting:s});window.eval('cinematicRenderer').sync();},settings);
    for(const renderer of ['illustrated','cinematic','illustrated']){await mode(page,renderer);expect(await page.evaluate(()=>window.eval('cinematicRenderer').getSettings())).toEqual(settings);expect((await snapshot(page)).particles).toBe(20000);}
  }
  for(const mutation of ['layer','system','item']){
    await page.evaluate(key=>{const r=window.eval('worldResolver'),s=r.levelSettings('LVL-0034').cinematicLighting;if(key==='layer')s.layers[s.particles.items[0].layer]=false;if(key==='system')s.particles.enabled=false;if(key==='item')s.particles.items[0].enabled=false;r.updateLevelSettings('LVL-0034',{cinematicLighting:s});window.eval('cinematicRenderer').sync();},mutation);
    await expect.poll(async()=>(await snapshot(page)).buffers).toBe(0);
    await page.evaluate(()=>{const r=window.eval('worldResolver'),s=r.levelSettings('LVL-0034').cinematicLighting;s.layers[s.particles.items[0].layer]=true;s.particles.enabled=true;s.particles.items[0].enabled=true;r.updateLevelSettings('LVL-0034',{cinematicLighting:s});window.eval('cinematicRenderer').sync();});await ready(page);
  }
  expect(faults).toEqual([]);
});

for(const viewport of [{width:1280,height:800,dpr:1},{width:1180,height:734,dpr:2},{width:820,height:1180,dpr:2}]){
  test(`authored ARC weather camera and composition ${viewport.width}x${viewport.height}`,async({browser},info)=>{
    const context=await browser.newContext({viewport:{width:viewport.width,height:viewport.height},deviceScaleFactor:viewport.dpr,serviceWorkers:'block'}),page=await context.newPage(),faults=errors(page);
    try{
      await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
      for(const id of ['LVL-0034','LVL-0035']){
        await open(page,id);
        for(const renderer of ['illustrated','cinematic']){
          await mode(page,renderer);
          for(const x of [200,1086,1970]){
            await page.evaluate(x=>{const s=window.eval('state');s.worldX=x;s.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();},x);
            await ready(page);await page.screenshot({path:info.outputPath(`${id}-${renderer}-${x}.png`)});
            const s=await snapshot(page);expect(s.depthStatus).toBe('ready');expect(s.particles).toBe(id==='LVL-0034'?8937:1600);
            expect(await page.locator('[data-cinematic-canvas], [data-particle-fields-canvas]').evaluate(e=>getComputedStyle(e).pointerEvents)).toBe('none');
            const placement=await page.locator('[data-cinematic-canvas], [data-particle-fields-canvas]').evaluate(e=>{const a=e.getBoundingClientRect(),b=document.querySelector('[data-world-stage]').getBoundingClientRect();return {x:a.x-b.x,y:a.y-b.y,width:a.width-b.width,height:a.height-b.height};});
            for(const delta of Object.values(placement))expect(Math.abs(delta)).toBeLessThan(.1);
            if(renderer==='illustrated'){
              const layers=await page.evaluate(()=>{const z=s=>Number(getComputedStyle(document.querySelector(s)).zIndex);return {particle:z('.particleFieldsCanvas'),marker:z('[data-rune]'),companion:z('[data-adventure-team-bar]')};});
              expect(layers.particle).toBeLessThan(layers.marker);expect(layers.particle).toBeLessThan(layers.companion);
            }
          }
        }
      }
      expect(faults).toEqual([]);
    }finally{await context.close();}
  });
}

// Run the production particle vertex AND fragment against the actual authored
// depth image, at fixed time. Depth-off is an A/B measurement, never saved.
async function depthProbe(page,id){return page.evaluate(async id=>{
  const level=window.eval('level'),s=window.AtlasCinematicSettings.normalize(window.eval('worldResolver').levelSettings(id).cinematicLighting);
  const records=window.AtlasCinematicRenderer.packEffects(s),fields=records.map((r,index)=>({...r,index})).filter(r=>r.key==='particles'&&r.data[1]);
  const device=await window.AtlasWebGPUCapabilities.requestDevice('particle-depth-regression');
  const module=device.createShaderModule({code:window.AtlasCinematicShaders.shared});
  const pipe=await device.createRenderPipelineAsync({layout:'auto',vertex:{module,entryPoint:'particle'},fragment:{module,entryPoint:'particleColor',targets:[{format:'rgba8unorm',blend:{color:{srcFactor:'one',dstFactor:'one'},alpha:{srcFactor:'one',dstFactor:'one'}}}]},primitive:{topology:'triangle-list'}});
  const width=level.world.width,height=level.world.height,row=Math.ceil(width*4/256)*256;
  const image=new Image();image.src=level.world.depthmap||`Levels/${id}/assets/depthmap.png`;await image.decode();const bitmap=await createImageBitmap(image,{premultiplyAlpha:'none',colorSpaceConversion:'default'});
  const depth=device.createTexture({size:[bitmap.width,bitmap.height],format:'rgba8unorm',usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT});device.queue.copyExternalImageToTexture({source:bitmap},{texture:depth,premultipliedAlpha:false},[bitmap.width,bitmap.height]);bitmap.close();
  const c=document.createElement('canvas');c.width=width;c.height=height;const ctx=c.getContext('2d');ctx.drawImage(image,0,0,width,height);const depthPixels=ctx.getImageData(0,0,width,height).data;
  const target=device.createTexture({size:[width,height],format:'rgba8unorm',usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC});
  const uniform=device.createBuffer({size:512,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),effects=device.createBuffer({size:128*256,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});
  const packed=new Float32Array(128*64);records.forEach((r,i)=>packed.set(r.data,i*64));device.queue.writeBuffer(effects,0,packed);
  const group=device.createBindGroup({layout:pipe.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:uniform}},{binding:1,resource:{buffer:effects}},{binding:3,resource:depth.createView()},{binding:4,resource:device.createSampler({minFilter:'linear',magFilter:'linear'})}]});
  const draws=fields.map(f=>{const buffer=device.createBuffer({size:80,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),values=new Float32Array(20);values[8]=f.index;device.queue.writeBuffer(buffer,0,values);return {buffer,group:device.createBindGroup({layout:pipe.getBindGroupLayout(1),entries:[{binding:3,resource:{buffer}}]}),count:f.data[16]};});
  async function render(enabled){
    const values=new Float32Array(128);values.set([width,height,0,width,height,1.75,records.length,1/60,width]);values.set([+enabled,s.depth.filterRadius,s.depth.perspective,0],72);device.queue.writeBuffer(uniform,0,values);
    const read=device.createBuffer({size:row*height,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ}),encoder=device.createCommandEncoder(),pass=encoder.beginRenderPass({colorAttachments:[{view:target.createView(),clearValue:[0,0,0,0],loadOp:'clear',storeOp:'store'}]});pass.setPipeline(pipe);pass.setBindGroup(0,group);for(const d of draws){pass.setBindGroup(1,d.group);pass.draw(6,d.count);}pass.end();encoder.copyTextureToBuffer({texture:target},{buffer:read,bytesPerRow:row},[width,height]);device.queue.submit([encoder.finish()]);await read.mapAsync(GPUMapMode.READ);const bytes=new Uint8Array(read.getMappedRange()),rgba=new Uint8ClampedArray(width*height*4);for(let y=0;y<height;y++)rgba.set(bytes.subarray(y*row,y*row+width*4),y*width*4);read.unmap();read.destroy();return rgba;
  }
  try{
    const off=await render(false),on=await render(s.depth.enabled),bins=Array(10).fill(0),stats={near:{on:0,off:0,pixels:0},far:{on:0,off:0,pixels:0},masked:0};
    for(let i=0;i<on.length;i+=4){const z=depthPixels[i]/255,energy=off[i]+off[i+1]+off[i+2],visible=on[i]+on[i+1]+on[i+2];if(energy>0)bins[Math.min(9,Math.floor((i/4%width)/width*10))]++;if(energy>visible+3)stats.masked++;const group=z>.92?stats.near:z<.07?stats.far:null;if(group&&energy){group.on+=visible;group.off+=energy;group.pixels++;}}
    ctx.putImageData(new ImageData(on,width,height),0,0);const png=c.toDataURL('image/png').split(',')[1];return {stats,bins,png,count:draws.reduce((n,d)=>n+d.count,0),fields:s.particles,depth:s.depth,path:image.src};
  }finally{uniform.destroy();effects.destroy();depth.destroy();target.destroy();draws.forEach(d=>d.buffer.destroy());}
},id);}

test('authored Drizzle fills its width; Stella Snow is occluded by the actual near artwork in both modes',async({page},info)=>{
  for(const id of ['LVL-0034','LVL-0035']){
    await open(page,id);const results=[];
    for(const renderer of ['illustrated','cinematic']){
      await mode(page,renderer);const result=await depthProbe(page,id);results.push(result);
      await info.attach(`${id}-${renderer}-particle-depth.png`,{body:Buffer.from(result.png,'base64'),contentType:'image/png'});
      await info.attach(`${id}-${renderer}-depth.json`,{body:JSON.stringify({...result,png:undefined}),contentType:'application/json'});
      if(id==='LVL-0034')expect(result.bins.every(n=>n>10),JSON.stringify(result.bins)).toBe(true);
      else{expect(result.stats.masked).toBeGreaterThan(100);expect(result.stats.near.pixels).toBeGreaterThan(10);expect(result.stats.far.pixels).toBeGreaterThan(10);expect(result.stats.near.on/result.stats.near.off).toBeLessThan(.1);expect(result.stats.far.on/result.stats.far.off).toBeGreaterThan(.95);}
    }
    expect(results[0]).toEqual(results[1]);
  }
});

test('Illustrated without fields never acquires a GPU; late work cannot revive a disposed scene',async({page})=>{
  const faults=errors(page);await open(page,'LVL-0005');
  expect(await page.evaluate(()=>window.AtlasWebGPUCapabilities.snapshot().deviceReady)).toBe(false);
  expect((await snapshot(page)).buffers).toBe(0);
  // Depth is now part of image readiness. Hold its GPU upload preparation,
  // after preload, to keep testing stale renderer work rather than blocking entry.
  await page.evaluate(()=>{
    const create=window.createImageBitmap.bind(window),held=new Promise(resolve=>window.releaseDepthUpload=resolve);
    window.createImageBitmap=async(source,...args)=>{
      const depth=await window.eval('assetCache').images.get('Levels/LVL-0035/depthmap.png');
      if(source===depth)await held;
      return create(source,...args);
    };
  });
  await page.evaluate(()=>window.eval('selectLevel')('LVL-0035',{startImmediately:true,recordStart:false}));
  await expect.poll(async()=>(await snapshot(page)).depthStatus).toBe('loading');
  await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'cinematic'});window.eval('render')();window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();});
  await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false}));await page.evaluate(()=>window.releaseDepthUpload());await ready(page);
  expect((await snapshot(page)).levelId).toBe('LVL-0034');expect((await snapshot(page)).depthPath).toContain('LVL-0034');
  await page.evaluate(()=>window.eval('returnToMenu')());
  const idle=await snapshot(page);expect(idle.ready).toBe(false);expect(idle.buffers).toBe(0);expect(idle.depthCached).toBe(0);expect(idle.scheduled).toBe(false);expect(faults).toEqual([]);
});

test('repeated mode switches release buffers/textures and retain the broker-owned device',async({page})=>{
  await page.addInitScript(()=>{
    const live=new Set(),counts={created:0,destroyed:0};window.particleResources=()=>({...counts,live:live.size});
    for(const [owner,method] of [[GPUDevice.prototype,'createBuffer'],[GPUDevice.prototype,'createTexture']]){
      const create=owner[method];owner[method]=function(...args){const resource=Reflect.apply(create,this,args);live.add(resource);counts.created++;return resource;};
    }
    for(const owner of [GPUBuffer.prototype,GPUTexture.prototype]){const destroy=owner.destroy;owner.destroy=function(...args){if(live.delete(this))counts.destroyed++;return Reflect.apply(destroy,this,args);};}
  });
  const faults=errors(page);await open(page,'LVL-0035');await mode(page,'illustrated');
  const baseline=await page.evaluate(()=>window.particleResources());
  for(let i=0;i<4;i++){await mode(page,'cinematic');await mode(page,'illustrated');expect((await page.evaluate(()=>window.particleResources())).live).toBe(baseline.live);}
  await page.evaluate(()=>window.eval('returnToMenu')());
  await expect.poll(()=>page.evaluate(()=>window.particleResources().live)).toBe(0);
  expect(await page.evaluate(()=>window.AtlasWebGPUCapabilities.snapshot().deviceReady)).toBe(true);expect(faults).toEqual([]);
});

