import {magic,post} from './gpu-shaders.js';

// One owner, one device, bounded surfaces. The lab owns the clock and audio.
export function createWebGPU(canvas,notify){
 let device=null,context=null,uniform=null,pipelines=null,groups=null,targets=[],generation=0,mode='canvas',status='Canvas 2D',frames=0,error=null,dimensions=[0,0];
 const values=new Float32Array(88);
 function release(){for(const t of targets)t.destroy();targets=[];groups=null;dimensions=[0,0];}
 function dispose(){generation++;release();context?.unconfigure();context=null;uniform?.destroy();uniform=null;const d=device;device=null;d?.destroy();pipelines=null;canvas.hidden=true;}
 function fail(message){error=message;dispose();status='Canvas fallback · '+message;notify(status);}
 async function select(next){
  if(next===mode)return;mode=next;dispose();error=null;
  if(mode!=='webgpu'){status='Canvas 2D · living particles';notify(status);return;}
  status='Starting WebGPU…';notify(status);const token=generation;
  if(!navigator.gpu){fail('WebGPU unavailable in this browser');return;}
  let candidate;
  try{
   const adapter=await navigator.gpu.requestAdapter();if(!adapter)throw Error('No WebGPU adapter');
   if(token!==generation)return;
   candidate=await adapter.requestDevice();if(token!==generation){candidate.destroy();return;}device=candidate;
   device.lost.then(info=>{if(token===generation&&mode==='webgpu')fail('GPU device lost: '+info.message);});
   device.addEventListener('uncapturederror',event=>{if(token===generation)fail(event.error.message);});
   device.pushErrorScope('validation');
   const shader=device.createShaderModule({code:magic}),filter=device.createShaderModule({code:post});
   for(const module of [shader,filter]){const info=await module.getCompilationInfo();const errors=info.messages.filter(m=>m.type==='error');if(errors.length)throw Error(errors.map(m=>`${m.lineNum}: ${m.message}`).join('; '));}
   if(token!==generation)return;
   uniform=device.createBuffer({size:values.byteLength,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});
   const additive={color:{srcFactor:'one',dstFactor:'one',operation:'add'},alpha:{srcFactor:'one',dstFactor:'one',operation:'add'}};
   const make=(vertex,fragment,module,format,blend)=>device.createRenderPipeline({layout:'auto',vertex:{module,entryPoint:vertex},fragment:{module,entryPoint:fragment,targets:[{format,...blend?{blend}:{}}]},primitive:{topology:'triangle-list'}});
   const format=navigator.gpu.getPreferredCanvasFormat();
   pipelines={dust:make('dust','mote',shader,'rgba16float',additive),horizontal:make('screen','horizontal',filter,'rgba16float'),vertical:make('screen','vertical',filter,'rgba16float'),finish:make('screen','finish',filter,format)};
   const validation=await device.popErrorScope();if(validation)throw validation;
   if(token!==generation)return;
   context=canvas.getContext('webgpu');context.configure({device,format,alphaMode:'premultiplied'});
   status='WebGPU · living stardust & bloom';notify(status);
  }catch(e){candidate?.destroy();if(token===generation)fail(e.message);}
 }
 function size(){
  const r=canvas.parentElement.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2,device.limits.maxTextureDimension2D/Math.max(r.width,r.height),Math.sqrt(4000000/(r.width*r.height)));
  const w=Math.max(1,Math.floor(r.width*d)),h=Math.max(1,Math.floor(r.height*d));
  if(w===dimensions[0]&&h===dimensions[1])return;
  release();canvas.width=w;canvas.height=h;dimensions=[w,h];
  const texture=(width,height)=>device.createTexture({size:[width,height],format:'rgba16float',usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.COPY_SRC});
  targets=[texture(w,h),texture(Math.max(1,w>>2),Math.max(1,h>>2)),texture(Math.max(1,w>>2),Math.max(1,h>>2))];
  const sampler=device.createSampler({minFilter:'linear',magFilter:'linear'});
  const bind=(pipeline,entries)=>device.createBindGroup({layout:pipeline.getBindGroupLayout(0),entries});
  const entry={binding:0,resource:{buffer:uniform}};
  const postGroup=(name,a,b)=>{
   // Auto layouts only contain resources actually used by this entry point.
   const entries=name==='finish'?[entry,{binding:1,resource:a.createView()},{binding:2,resource:b.createView()},{binding:3,resource:sampler}]:[{binding:1,resource:a.createView()},{binding:3,resource:sampler}];
   return bind(pipelines[name],entries);
  };
  groups={dust:bind(pipelines.dust,[entry]),horizontal:postGroup('horizontal',targets[0]),vertical:postGroup('vertical',targets[1]),finish:postGroup('finish',targets[0],targets[2])};
 }
 function render(frame){
  if(!context||!pipelines||mode!=='webgpu'||document.hidden)return false;
  try{
   size();const {s,idle,t,anchors,source,target,bend,progress,exit,highlights}=frame;
   const put=(i,...v)=>values.set(v,i*4);
   put(0,1007,724,idle,t);put(1,...anchors[0],...anchors[1]);put(2,...anchors[2],...frame.exitAnchor);put(3,...source,...target);put(4,...bend,progress,0);
   put(5,s.marker.size,s.marker.intensity,s.marker.cyan,s.marker.gold);put(6,s.marker.particles,s.marker.wisps,s.marker.glow,s.marker.pulseSpeed);
   put(7,s.flow.width,s.flow.count,s.flow.intensity,s.flow.opacity);put(8,s.flow.arc,s.flow.turbulence,s.flow.frequency,s.flow.speed);put(9,s.flow.spread,s.flow.depth,s.flow.trail,s.flow.smoothing);
   put(10,s.flow.dust,s.flow.particleSize,s.flow.particleBrightness,s.flow.hotspots);put(11,s.flow.glow,s.flow.wisps,s.flow.wispOpacity,s.flow.hotspotBrightness);
   put(12,s.exit.radius,s.exit.ellipse,s.exit.speed,exit??-1);put(13,s.exit.gold,s.exit.cyan,s.exit.glow,s.exit.particles);put(14,+(s.exit.style==='spiral'),s.exit.tightness,s.exit.turbulence,s.exit.direction==='inward'?-1:1);
   put(15,s.exit.secondary,+s.exit.counter,s.exit.line,s.exit.wisps);put(16,0,0,0,0); // Reserved former absorb slots.
   put(17,s.renderer.bloom,s.renderer.exposure,s.renderer.richness,0);put(18,s.marker.pulseAmplitude,...highlights);put(19,s.exit.pulse,0,0,s.flow.curvature);
   put(20,s.renderer.cyanParticles,s.renderer.goldParticles,s.renderer.moteSize,s.renderer.depth);
   put(21,...frame.markerStages,0);
   device.queue.writeBuffer(uniform,0,values);
   const encoder=device.createCommandEncoder();
   const begin=view=>encoder.beginRenderPass({colorAttachments:[{view,clearValue:{r:0,g:0,b:0,a:0},loadOp:'clear',storeOp:'store'}]});
   let pass=begin(targets[0].createView());
   pass.setPipeline(pipelines.dust);pass.setBindGroup(0,groups.dust);pass.draw(6,25200);
   pass.end();
   for(const [name,view] of [['horizontal',targets[1].createView()],['vertical',targets[2].createView()],['finish',context.getCurrentTexture().createView()]]){pass=begin(view);pass.setPipeline(pipelines[name]);pass.setBindGroup(0,groups[name]);pass.draw(3);pass.end();}
   device.queue.submit([encoder.finish()]);frames++;canvas.hidden=false;return true;
  }catch(e){fail(e.message);return false;}
 }
 async function readback(region=null){
  if(!device||!targets.length)return null;
  const [w,h]=dimensions,stride=Math.ceil(w*8/256)*256,buffer=device.createBuffer({size:stride*h,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});
  try{const encoder=device.createCommandEncoder();encoder.copyTextureToBuffer({texture:targets[0]},{buffer,bytesPerRow:stride},[w,h]);device.queue.submit([encoder.finish()]);await buffer.mapAsync(GPUMapMode.READ);const pixels=new Uint16Array(buffer.getMappedRange());let lit=0,cyanPixels=0,goldPixels=0;
   const [left,top,right,bottom]=region?[Math.max(0,Math.floor(region[0]*w/1007)),Math.max(0,Math.floor(region[1]*h/724)),Math.min(w,Math.ceil((region[0]+region[2])*w/1007)),Math.min(h,Math.ceil((region[1]+region[3])*h/724))]:[0,0,w,h];
   // Positive half-float encodings sort numerically; no CPU float conversion needed.
   for(let y=top;y<bottom;y++)for(let x=left;x<right;x++){const i=y*stride/2+x*4,r=pixels[i],g=pixels[i+1],b=pixels[i+2];if(r||g||b){lit++;if(b>r)cyanPixels++;if(r>b)goldPixels++;}}return {lit,cyanPixels,goldPixels,width:w,height:h};}finally{buffer.destroy();}
 }
 function resume(){const wanted=mode;mode=null;select(wanted);}
 return {select,render,dispose,resume,readback,get ready(){return !!context;},inspect:()=>({mode,status,error,frames,dimensions:[...dimensions],targets:targets.length,estimatedTargetBytes:targets.length?dimensions[0]*dimensions[1]*9:0})};
}
