const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm'),path=require('path');
const {bootEditorTest}=require('./editor-workspace-helpers');
const api=require('../src/cinematic-settings');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4186';
const old={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../src/cinematic-shaders.js'),'utf8'),old);
old.window.AtlasCinematicShaders.shared=old.window.AtlasCinematicShaders.shared.replace(/@vertex fn particle\([\s\S]*?(?=@fragment fn particleColor)/,fs.readFileSync(path.join(__dirname,'fixtures/particle-preset-only.wgsl'),'utf8'));
async function probe(page,item,time=1.75,shader=null,cameraX=0,viewport=1000){
  return page.evaluate(async({item,time,shader,cameraX,viewport})=>{
    // Execute the production vertex shader on the GPU, reading centers and alpha
    // before rasterization. Opposite quad vertices cancel the particle radius.
    const adapter=await navigator.gpu.requestAdapter(),device=await adapter.requestDevice();
    const errors=[];device.addEventListener('uncapturederror',e=>errors.push(e.error.message));
    const shared=(shader||window.AtlasCinematicShaders.shared).replace('@vertex fn particle(@builtin(vertex_index) vertex:u32,@builtin(instance_index) id:u32)', 'fn sampledParticle(vertex:u32,id:u32)').replace('var<storage, read> exposure','var<storage, read_write> exposure');
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
    const globals=new Float32Array(128);globals.set([1280,800,cameraX,viewport,724,time,0,1/60,2171]);
    device.queue.writeBuffer(uniform,0,globals);device.queue.writeBuffer(effects,0,packed);
    const pipeline=await device.createComputePipelineAsync({layout:'auto',compute:{module,entryPoint:'probe'}});
    const bind=device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries:[uniform,effects,output].map((buffer,binding)=>({binding,resource:{buffer}}))});
    const drawBind=device.createBindGroup({layout:pipeline.getBindGroupLayout(1),entries:[{binding:3,resource:{buffer:draw}}]});
    const encoder=device.createCommandEncoder(),pass=encoder.beginComputePass();pass.setPipeline(pipeline);pass.setBindGroup(0,bind);pass.setBindGroup(1,drawBind);pass.dispatchWorkgroups(Math.ceil(count/64));pass.end();encoder.copyBufferToBuffer(output,0,read,0,size);device.queue.submit([encoder.finish()]);
    await read.mapAsync(GPUMapMode.READ);const values=Array.from(new Float32Array(read.getMappedRange()));read.unmap();
    for(const buffer of [uniform,draw,effects,output,read])buffer.destroy();device.destroy();
    return {values,count,errors};
  },{item,time,shader,cameraX,viewport});
}


test('gust opt-in, bounds, preset reset and persistence normalization',()=>{
 expect(api.instance('particles').gustStrength).toBe(0);
 expect(api.instance('particles',{gustStrength:99}).gustStrength).toBe(2);
 for(const name of ['Snow','Light Snow','Fluffy Snow','Dust','Embers','Sand'])expect(api.preset('particles',name,{gustStrength:2}).gustStrength).toBe(0);
 for(const name of ['Windblown Snow','Blizzard']){const item=api.preset('particles',name);expect(item.gustStrength).toBeGreaterThan(0);expect(api.normalize({particles:{items:[item]}}).particles.items[0]).toEqual(item);}
});
test('real GPU keeps legacy trajectories exact and coherent flow finite, smooth and camera independent',async({page})=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Real GPU required');
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');
 const item=api.preset('particles','Snow',api.instance('particles',{count:1600,x:1086,y:362,width:2172,height:724,shape:'rectangle',boundsRotation:0}));
 for(const time of [1.75,11]){const original=await probe(page,item,time,old.window.AtlasCinematicShaders.shared),current=await probe(page,item,time);expect(current.errors).toEqual([]);expect(current.values).toEqual(original.values);}
 for(const name of ['Dust','Embers','Drizzle']){const other=api.preset('particles',name,item);expect((await probe(page,other,4)).values).toEqual((await probe(page,other,4,old.window.AtlasCinematicShaders.shared)).values);}
 const gust={...item,gustStrength:1.6};const off=await probe(page,item,8),on=await probe(page,gust,8),later=await probe(page,gust,8.016);
 expect((await probe(page,gust,8,null,500,724)).values).toEqual(on.values);
 expect(on.errors).toEqual([]);expect(on.values.every(Number.isFinite)).toBe(true);
 const moved=[],steps=[];for(let i=0;i<on.values.length;i+=4){const dx=on.values[i]-off.values[i],dy=on.values[i+1]-off.values[i+1];moved.push(Math.hypot(dx,dy));const step=Math.hypot(on.values[i]-later.values[i],on.values[i+1]-later.values[i+1]);if(off.values[i]>100&&off.values[i]<2072&&off.values[i+1]>100&&off.values[i+1]<624&&on.values[i+3]>.1)steps.push(step);}
 expect(moved.filter(n=>n>15).length).toBeGreaterThan(300);expect(Math.max(...moved)).toBeLessThan(450);expect(Math.max(...steps)).toBeLessThan(12);
 // Adjacent points inside an eddy must share its deformation, rather than random jitter.
 let pairs=0,coherent=0;for(let a=0;a<off.values.length;a+=4)for(let b=a+4;b<off.values.length;b+=4){const distance=Math.hypot(off.values[a]-off.values[b],off.values[a+1]-off.values[b+1]);if(distance>1&&distance<12&&moved[a/4]>15&&moved[b/4]>15){pairs++;const delta=Math.hypot((on.values[a]-off.values[a])-(on.values[b]-off.values[b]),(on.values[a+1]-off.values[a+1])-(on.values[b+1]-off.values[b+1]));if(delta<18)coherent++;}}
 expect(pairs).toBeGreaterThan(20);expect(coherent/pairs).toBeGreaterThan(.95);
});

test('Snow Squall preserves existing gust presets and has smooth camera-independent curling motion',async({page})=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Real GPU required');
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');
 const current=await page.evaluate(()=>AtlasCinematicShaders.shared);
 const prior=current.replace(/@vertex fn particle\([\s\S]*?(?=@fragment fn particleColor)/,fs.readFileSync(path.join(__dirname,'fixtures/particle-before-squall.wgsl'),'utf8'));
 const geometry={x:1086,y:362,width:2172,height:724,shape:'rectangle',boundsRotation:0};
 for(const name of ['Snow','Windblown Snow','Blizzard']){const item=api.preset('particles',name,api.instance('particles',geometry));expect((await probe(page,item,7)).values).toEqual((await probe(page,item,7,prior)).values);}
 const squall=api.preset('particles','Snow Squall',api.instance('particles',geometry));
 expect(squall.motion).toBe('windFlow');expect(api.preset('particles','Snow',squall).motion).toBe('falling');
 const a=await probe(page,squall,7),b=await probe(page,squall,7.016),straight=await probe(page,{...squall,gustStrength:0},7);
 expect(a.errors).toEqual([]);expect(a.values.every(Number.isFinite)).toBe(true);
 expect((await probe(page,squall,7,null,500,724)).values).toEqual(a.values);
 let curling=0,rising=0,falling=0,visible=0,maxStep=0;
 for(let i=0;i<a.values.length;i+=4){if(a.values[i+3]<.02||b.values[i+3]<.02)continue;visible++;const dx=b.values[i]-a.values[i],dy=b.values[i+1]-a.values[i+1];maxStep=Math.max(maxStep,Math.hypot(dx,dy));if(dy<-.2)rising++;if(dy>.2)falling++;if(Math.hypot(a.values[i]-straight.values[i],a.values[i+1]-straight.values[i+1])>25)curling++;}
 expect(visible).toBeGreaterThan(500);expect(curling).toBeGreaterThan(200);expect(rising).toBeGreaterThan(100);expect(falling).toBeGreaterThan(100);expect(maxStep).toBeLessThan(15);
});


test('Snow Squall keeps one configuration through renderer switches and releases resources when disabled',async({page})=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Real GPU required');
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');
 const settings=api.normalize({particles:{enabled:true,items:[api.preset('particles','Snow Squall',api.instance('particles',{x:1086,y:362,width:2172,height:724,shape:'rectangle'}))]}});
 await page.evaluate(s=>window.eval('worldResolver').updateLevelSettings('LVL-0036',{cinematicLighting:s}),settings);
 for(const mode of ['illustrated','cinematic','illustrated']){
  await page.evaluate(mode=>{window.eval('playGraphicsFeatures=null');window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status)).toBe('ready');
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').getSettings())).toEqual(settings);
  expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().particles)).toBe(3200);
 }
 await page.evaluate(()=>{const r=window.eval('worldResolver'),s=r.levelSettings('LVL-0036').cinematicLighting;s.particles.enabled=false;r.updateLevelSettings('LVL-0036',{cinematicLighting:s});window.eval('cinematicRenderer').sync();});
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().buffers)).toBe(0);
});
