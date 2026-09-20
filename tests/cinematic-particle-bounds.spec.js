const {test,expect}=require('@playwright/test');
const contract=require('../src/cinematic-settings');
const fs=require('fs'),path=require('path');
require('./editor-draft-fixture').preserveEditorDrafts(test,path.join(__dirname,'..'));
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');

async function probe(page,item,time=1.75){
  return page.evaluate(async({item,time})=>{
    // Execute the production vertex shader on the GPU, reading centers and alpha
    // before rasterization. Opposite quad vertices cancel the particle radius.
    const adapter=await navigator.gpu.requestAdapter(),device=await adapter.requestDevice();
    const errors=[];device.addEventListener('uncapturederror',e=>errors.push(e.error.message));
    const shared=window.AtlasCinematicShaders.shared.replace('@vertex fn particle(@builtin(vertex_index) vertex:u32,@builtin(instance_index) id:u32)', 'fn sampledParticle(vertex:u32,id:u32)').replace('var<storage, read> exposure','var<storage, read_write> exposure');
    const module=device.createShaderModule({code:shared+`
      @compute @workgroup_size(64) fn probe(@builtin(global_invocation_id) invocation:vec3u){
        let id=invocation.x;if(id>=u32(effects[0].v[4].x)){return;}
        let a=sampledParticle(0u,id);let b=sampledParticle(5u,id);
        let p=(a.worldPoint+b.worldPoint)*0.5;
        exposure[id*4u]=p.x;exposure[id*4u+1u]=p.y;
        exposure[id*4u+2u]=region(effects[0],p);exposure[id*4u+3u]=a.color.a;
      }`});
    const messages=(await module.getCompilationInfo()).messages.filter(m=>m.type==='error').map(m=>m.message);
    if(messages.length)throw Error(messages.join('\n'));
    const settings=window.AtlasCinematicSettings.normalize({particles:{enabled:true,items:[item]}});
    const packed=window.AtlasCinematicRenderer.packEffects(settings).find(e=>e.key==='particles').data;
    const count=packed[16],size=count*16;
    const make=(size,usage)=>device.createBuffer({size,usage});
    const uniform=make(512,GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST);
    const draw=make(80,GPUBufferUsage.UNIFORM);
    const effects=make(256,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST);
    const output=make(size,GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC);
    const read=make(size,GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ);
    const globals=new Float32Array(128);globals.set([1280,800,0,1000,724,time,0,1/60,2171]);
    device.queue.writeBuffer(uniform,0,globals);device.queue.writeBuffer(effects,0,packed);
    const pipeline=await device.createComputePipelineAsync({layout:'auto',compute:{module,entryPoint:'probe'}});
    const bind=device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[uniform,effects,output].map((buffer,binding)=>({binding,resource:{buffer}}))});
    const drawBind=device.createBindGroup({layout:pipeline.getBindGroupLayout(1),entries:[{binding:3,resource:{buffer:draw}}]});
    const encoder=device.createCommandEncoder(),pass=encoder.beginComputePass();pass.setPipeline(pipeline);pass.setBindGroup(0,bind);pass.setBindGroup(1,drawBind);pass.dispatchWorkgroups(Math.ceil(count/64));pass.end();encoder.copyBufferToBuffer(output,0,read,0,size);device.queue.submit([encoder.finish()]);
    await read.mapAsync(GPUMapMode.READ);const values=Array.from(new Float32Array(read.getMappedRange()));read.unmap();
    for(const buffer of [uniform,draw,effects,output,read])buffer.destroy();device.destroy();
    return {values,count,errors};
  },{item,time});
}

test('GPU Drizzle spawn domain fills the rotated editor rectangle without hidden width clipping',async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
  await page.goto(base+'/?dev=editor');
  await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false}));
  const measurements=[];
  for(const [span,scaled] of [[500,false],[2172,false],[2172,true]]){
    // At Drizzle's 90-degree direction, the editor's horizontal span is height.
    const item=contract.preset('particles','Drizzle',contract.instance('particles',{x:1086,y:362,width:724,height:span,shape:'rectangle',softness:0.1}));
    item.scaleCountWithArea=scaled;
    const {values,count,errors}=await probe(page,item);
    expect(errors).toEqual([]);
    const visible=[];
    for(let i=0;i<values.length;i+=4)if(values[i+3]>0.005)visible.push({x:values[i],y:values[i+1]});
    const bins=Array(10).fill(0),left=item.x-span/2;
    for(const p of visible){const bin=Math.floor((p.x-left)/span*10);if(bin>=0&&bin<10)bins[bin]++;}
    measurements.push({span,scaled,count,bins,minX:Math.min(...visible.map(p=>p.x)),maxX:Math.max(...visible.map(p=>p.x))});
  }
  await info.attach('gpu-spawn-coverage.json',{body:JSON.stringify(measurements,null,2),contentType:'application/json'});
  for(const m of measurements){expect(m.bins.every(n=>n>5),JSON.stringify(m)).toBe(true);expect(m.maxX-m.minX).toBeGreaterThan(m.span*0.95);}
});

for(const viewport of [{width:1280,height:800,dpr:1},{width:1180,height:734,dpr:2},{width:820,height:1180,dpr:2}])test(`GPU rain scroll coverage ${viewport.width}x${viewport.height} DPR ${viewport.dpr}`,async({browser},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
  const context=await browser.newContext({viewport,deviceScaleFactor:viewport.dpr,serviceWorkers:'block'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  try{
    await scene(page);
    const item=contract.preset('particles','Drizzle',contract.instance('particles',{x:1086,y:362,width:724,height:2172,shape:'rectangle'}));
    const config=contract.normalize({particles:{enabled:true,items:[item]}});
    const set=enabled=>page.evaluate(({config,enabled})=>{config.particles.enabled=enabled;window.eval('worldResolver').updateLevelSettings('LVL-0034',{cinematicLighting:config});window.eval('cinematicRenderer').sync();},{config,enabled});
    const measurements=[];
    for(const x of [200,1086,1970]){
      await page.evaluate(x=>{const s=window.eval('state');s.worldX=x;s.cameraX=window.eval('getDesiredCameraX')();window.eval('render')();},x);
      await set(false);await frames(page);const off=await page.locator('[data-cinematic-canvas]').screenshot();
      await set(true);await frames(page);const on=await page.locator('[data-cinematic-canvas]').screenshot({path:info.outputPath(`rain-${x}.png`)});
      const bins=await page.evaluate(async({off,on})=>{
        async function pixels(base64){const img=new Image();img.src='data:image/png;base64,'+base64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return ctx.getImageData(0,0,c.width,c.height);}
        const a=await pixels(off),b=await pixels(on),bins=Array(5).fill(0);
        // Upper scene excludes animated actors and companion UI.
        for(let y=Math.floor(a.height*.1);y<a.height*.45;y++)for(let x=0;x<a.width;x++){const i=(y*a.width+x)*4;if(Math.max(...[0,1,2].map(c=>Math.abs(a.data[i+c]-b.data[i+c])))>3)bins[Math.min(4,Math.floor(x/a.width*5))]++;}
        return bins;
      },{off:off.toString('base64'),on:on.toString('base64')});
      expect(bins.every(n=>n>10),JSON.stringify({x,bins})).toBe(true);
      const snapshot=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot());expect(snapshot.error).toBeNull();expect(snapshot.particles).toBe(11794);
      measurements.push({x,bins,fps:snapshot.fps,drawCalls:snapshot.drawCalls,camera:await page.evaluate(()=>window.eval('state').cameraX)});
    }
    await info.attach('render-coverage.json',{body:JSON.stringify(measurements),contentType:'application/json'});expect(errors).toEqual([]);
  }finally{await context.close();}
});

test('particle density is bounded, optional for legacy fields and reset by other presets',()=>{
  const legacy=contract.instance('particles',{width:16000,height:16000,count:2400});
  expect(legacy.scaleCountWithArea).toBe(false);expect(contract.particleCount(legacy)).toBe(2400);
  const rain=contract.preset('particles','Drizzle',contract.instance('particles',{x:1086,y:362,width:724,height:2172,shape:'rectangle'}));
  expect(rain).toMatchObject({x:1086,y:362,width:724,height:2172,shape:'rectangle',scaleCountWithArea:true});
  expect(contract.particleCount(rain)).toBe(11794);
  expect(contract.particleCount({...rain,width:800,height:400})).toBe(2400);
  expect(contract.particleCount({...rain,width:400,height:400})).toBe(1200);
  expect(contract.particleCount({...rain,width:16000,height:16000})).toBe(20000);
  expect(contract.particleCount({...rain,width:1,height:1})).toBe(1);
  const pollen=contract.preset('particles','Pollen',rain);
  expect(pollen).toMatchObject({x:1086,y:362,width:724,height:2172,scaleCountWithArea:false});
  expect(contract.particleCount(pollen)).toBe(450);
});

test('GPU other preset and capped rain retain their complete rotated spawn domains',async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU required');
  await page.goto(base+'/?dev=editor');
  for(const [name,width,height] of [['Pollen',1400,450],['Heavy Rain',724,2172]]){
    const item=contract.preset('particles',name,contract.instance('particles',{x:1086,y:362,width,height,shape:'rectangle'}));
    const {values,count,errors}=await probe(page,item);expect(errors).toEqual([]);
    if(name==='Heavy Rain')expect(count).toBe(20000);
    const bins=Array(10).fill(0),angle=item.direction*Math.PI/180;let maxX=0,maxY=0;
    for(let i=0;i<values.length;i+=4){
      const dx=values[i]-item.x,dy=values[i+1]-item.y;
      const x=Math.cos(angle)*dx+Math.sin(angle)*dy,y=-Math.sin(angle)*dx+Math.cos(angle)*dy;
      maxX=Math.max(maxX,Math.abs(x));maxY=Math.max(maxY,Math.abs(y));
      bins[Math.min(9,Math.floor((y/height+.5)*10))]++;
    }
    expect(maxX).toBeLessThanOrEqual(width/2+.01);expect(maxY).toBeLessThanOrEqual(height/2+.01);
    expect(bins.every(n=>n>0)).toBe(true);
  }
});

async function frames(page){const n=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame);await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame)).toBeGreaterThan(n+3);}
async function ready(page){await expect.poll(()=>page.evaluate(()=>{const s=window.eval('cinematicRenderer').snapshot();return s.error||s.status;}),{timeout:25000}).toBe('ready');}
async function scene(page){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(base+'/?dev=editor');
  await page.evaluate(async()=>{await window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false});window.eval('voxelRenderer').updateSettings({renderer:'cinematic'});window.eval('render')();});
  await ready(page);
}
test('Particle Field editor drag, resize, Apply and reload preserve the rendered region',async({page},info)=>{
  test.skip(!process.env.ATLAS_WEBGPU_QA||info.project.name!=='desktop-chromium','Real WebGPU and local Apply server required');
  const config=path.join(__dirname,'../Levels/world-config.js'),original=fs.readFileSync(config);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  try{
    await page.setViewportSize({width:2600,height:900});await scene(page);
    await page.keyboard.press('Control+Shift+D');await page.locator('[data-editor-mode="graphics"]').click();
    await page.locator('[data-cinematic-layer="environment"]').click();
    const group=page.locator('[data-cinematic-group="particles"]');if(!await group.evaluate(e=>e.open))await group.locator('summary').click();
    await group.locator('[data-cinematic-action="add"]').click();
    await group.locator('[data-cinematic-preset="particles"]').selectOption('Drizzle');
    const field=key=>group.locator(`[data-cinematic-setting="${key}"]`);
    await field('shape').selectOption('rectangle');
    for(const [key,value] of Object.entries({x:1026,y:342,width:400,height:600}))await field(key).fill(String(value));
    const item=()=>page.evaluate(()=>window.eval('cinematicRenderer').getSettings().particles.items.at(-1));
    const id=(await item()).id;
    const screen=point=>page.evaluate(p=>{const svg=document.querySelector('[data-cinematic-placement]'),q=new DOMPoint(p.x,p.y).matrixTransform(svg.getScreenCTM());return {x:q.x,y:q.y};},point);
    async function drag(type,destination){const box=await page.locator(`[data-cinematic-handle="${type}"][data-id="${id}"]`).boundingBox();const end=await screen(destination);await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.mouse.move(end.x,end.y,{steps:4});await page.mouse.up();}
    await drag('move',{x:1086,y:362});
    expect((await item()).x).toBeCloseTo(1086,0);expect((await item()).y).toBeCloseTo(362,0);
    await drag('size',{x:86,y:562});
    expect((await item()).height).toBeCloseTo(2000,0);expect((await item()).width).toBeCloseTo(400,0);
    await field('height').fill('2172');await field('width').fill('724');
    await expect(field('scaleCountWithArea')).toBeChecked();
    const authored=await item();
    const bounds=await page.locator(`[data-cinematic-detail="${id}"] rect`).evaluate(e=>({width:+e.getAttribute('width'),height:+e.getAttribute('height'),transform:e.getAttribute('transform')}));
    expect(bounds).toEqual({width:724,height:2172,transform:`rotate(90 ${authored.x} ${authored.y})`});
    await page.locator('[data-debug-action="apply-walkpath"]').click();await expect.poll(()=>page.evaluate(()=>window.eval('walkPathEditor').status)).toBe('Applied');
    await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true,recordStart:false}));await ready(page);
    expect(await item()).toEqual(authored);
    expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().particles)).toBe(contract.particleCount(authored));
    for(const renderer of ['illustrated','cinematic']){await page.evaluate(renderer=>{window.eval('voxelRenderer').updateSettings({renderer});window.eval('render')();},renderer);if(renderer==='cinematic')await ready(page);}
    expect(await item()).toEqual(authored);expect(errors).toEqual([]);
  }finally{await page.close();fs.writeFileSync(config,original);}
});
