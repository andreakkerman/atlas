const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path');
const {bootEditorTest}=require('./editor-workspace-helpers');
const before=require('./fixtures/snow-preset-only.json');
const api=require('../src/cinematic-settings');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4186';
const out=path.join(__dirname,'../output/snow-gusts');
for(const tablet of [false,true])test.describe(tablet?'tablet':'desktop',()=>{
 test.use({viewport:tablet?{width:1180,height:734}:{width:1600,height:900},deviceScaleFactor:tablet?2:1});
 for(const mode of ['illustrated','cinematic'])test(`gust comparison ${mode}`,async({page})=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Real WebGPU required');
 await page.addInitScript(()=>{
  window.gustCPU=[];window.gustGPU=null;
  const request=GPUAdapter.prototype.requestDevice;
  GPUAdapter.prototype.requestDevice=async function(desc={}){const capable=this.features.has('timestamp-query');const device=await request.call(this,{...desc,requiredFeatures:[...new Set([...(desc.requiredFeatures||[]),...(capable?['timestamp-query']:[])])]});window.gustDevice=device;window.gustTimestamps=capable;return device;};
  const begin=GPUCommandEncoder.prototype.beginRenderPass;
  GPUCommandEncoder.prototype.beginRenderPass=function(desc){const p=window.gustGPU;if(p?.active&&p.count<4096){const i=p.count;p.count+=2;p.labels.push(Boolean(window.gustParticlePass));window.gustParticlePass=false;return begin.call(this,{...desc,timestampWrites:{querySet:p.query,beginningOfPassWriteIndex:i,endOfPassWriteIndex:i+1}});}return begin.call(this,desc);};
 });
 const source=fs.readFileSync(path.join(__dirname,'../src/cinematic-renderer.js'),'utf8').replace('if (particleFields.length) { pass = begin','if (particleFields.length) { window.gustParticlePass=true; pass = begin').replace('const pass=encoder.beginRenderPass(', 'window.gustParticlePass=true;const pass=encoder.beginRenderPass(').replaceAll('averageMs=averageMs?', '(window.gustCPU ||= []).push(performance.now()-start);averageMs=averageMs?').replaceAll('averageMs = averageMs ?', '(window.gustCPU ||= []).push(performance.now()-start);averageMs = averageMs ?');
 await page.route('**/src/cinematic-renderer.js',r=>r.fulfill({contentType:'application/javascript',body:source}));
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await bootEditorTest(page,base+'/?dev=editor&level=LVL-0036');
 await page.evaluate(mode=>{window.eval('playGraphicsFeatures=null');window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
 await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status),{timeout:25000}).toBe('ready');
 await page.evaluate(legacy=>{window.gustCurrentShader=AtlasCinematicShaders.shared;window.gustLegacyShader=AtlasCinematicShaders.shared.replace(/@vertex fn particle\([\s\S]*?(?=@fragment fn particleColor)/,legacy);},fs.readFileSync(path.join(__dirname,'fixtures/particle-preset-only.wgsl'),'utf8'));
 const results={};
 const cases=[['Snowfall',before.Snow],['Windblown before',before['Windblown Snow']],['Windblown after',api.presets.particles['Windblown Snow']],['Blizzard before',before.Blizzard],['Blizzard after',api.presets.particles.Blizzard],['Snowfall repeat',before.Snow],['Snowfall legacy repeat',before.Snow]];
 for(const [name,preset] of cases){
 await page.evaluate(async({preset,legacy})=>{const renderer=window.eval('cinematicRenderer');renderer.dispose();AtlasCinematicShaders.shared=legacy?window.gustLegacyShader:window.gustCurrentShader;const r=window.eval('worldResolver'),s=AtlasCinematicSettings.normalize(r.levelSettings('LVL-0036').cinematicLighting);s.particles.items=[AtlasCinematicSettings.instance('particles',{...s.particles.items[0],gustStrength:0,...preset,x:1086,y:362,width:2172,height:724,boundsRotation:0,shape:'rectangle'})];r.updateLevelSettings('LVL-0036',{cinematicLighting:s});await renderer.sync();},{preset,legacy:name.endsWith('before')||name.includes('legacy')||name==='Snowfall'});
 const result=await page.evaluate(async()=>{
  const r=window.eval('cinematicRenderer');for(let i=0;i<40;i++)await new Promise(requestAnimationFrame);
  const device=window.gustDevice;if(window.gustTimestamps)window.gustGPU={active:true,count:0,labels:[],query:device.createQuerySet({type:'timestamp',count:4096})};
  window.gustCPU=[];let last;const cadence=[];const start=r.snapshot();
  for(let i=0;i<120;i++){const t=await new Promise(requestAnimationFrame);if(last)cadence.push(t-last);last=t;}
  const p=window.gustGPU;if(p)p.active=false;
  const end=r.snapshot(),cpu=window.gustCPU.slice();let gpuMs=null,gpuParticleMs=null,passes=0;
  if(p){if(p.count>=4096)throw Error('GPU timestamp capacity exceeded');const size=p.count*8,resolve=device.createBuffer({size,usage:GPUBufferUsage.QUERY_RESOLVE|GPUBufferUsage.COPY_SRC}),read=device.createBuffer({size,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST});const encoder=device.createCommandEncoder();encoder.resolveQuerySet(p.query,0,p.count,resolve,0);encoder.copyBufferToBuffer(resolve,0,read,0,size);device.queue.submit([encoder.finish()]);await read.mapAsync(GPUMapMode.READ);const values=new BigUint64Array(read.getMappedRange());let total=0,particle=0;for(let i=0;i<values.length;i+=2){const duration=Number(values[i+1]-values[i]);total+=duration;if(p.labels[i/2])particle+=duration;}gpuParticleMs=particle/1e6/cpu.length;passes=p.count/2;gpuMs=total/1e6/cpu.length;read.unmap();resolve.destroy();read.destroy();p.query.destroy();window.gustGPU=null;}
  const summary=a=>{a.sort((x,y)=>x-y);return {n:a.length,mean:a.reduce((s,v)=>s+v,0)/a.length,p95:a[Math.floor(a.length*.95)],p99:a[Math.floor(a.length*.99)]};};
  return {cpu:summary(cpu),cadence:summary(cadence),gpuMs,gpuParticleMs,passes,frames:cpu.length,particles:end.particles,buffers:end.buffers,targets:end.renderTargets,drawCalls:end.drawCalls,resolution:end.resolution,uploads:end.textureUploads.length-start.textureUploads.length,error:end.error};
 });
 expect(result.error).toBeNull();expect(result.cpu.n).toBeGreaterThan(90);expect(result.particles).toBe(preset.count);
 if(results.Snowfall){expect(result.buffers).toBe(results.Snowfall.buffers);expect(result.targets).toBe(results.Snowfall.targets);expect(result.drawCalls).toBe(results.Snowfall.drawCalls);}
 result.shader=name.endsWith('before')||name==='Snowfall'?'legacy vertex':'gust vertex';results[name]=result;await page.screenshot({path:path.join(out,`${tablet?'tablet':'desktop'}-${mode}-${name.replaceAll(' ','-')}.png`)});
 }
 fs.writeFileSync(path.join(out,`${tablet?'tablet':'desktop'}-${mode}.json`),JSON.stringify(results,null,2));
 });
});
