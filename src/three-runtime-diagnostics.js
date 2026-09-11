(function(global){
  'use strict';
  if(new URLSearchParams(location.search).get('debug3d')!=='1')return;
  function start(renderer,passes){
    const device=renderer.backend.device,started=performance.now(),restore=[],unavailable=[],samples=[],pipelines=[];
    let active=true,last=started,frameCount=0,frameMs=0,maxFrameMs=0,cpuMs=0,fencePending=false,fenceMs=null;
    let counts={},phases={},currentObject=null;
    const renderObject=renderer.renderObject;
    renderer.renderObject=function(...args){const previous=currentObject;currentObject=args[0];try{return Reflect.apply(renderObject,this,args);}finally{currentObject=previous;}};
    restore.push(()=>{renderer.renderObject=renderObject;});
    const count=(name,n=1)=>{counts[name]=(counts[name]||0)+n;};
    function wrap(target,name,observe){
      if(typeof target?.[name]!=='function'){unavailable.push(name);return;}
      const original=target[name],descriptor=Object.getOwnPropertyDescriptor(target,name);
      const wrapped=function(...args){if(active)observe(args);return Reflect.apply(original,this,args);};
      try{target[name]=wrapped;if(target[name]!==wrapped)throw Error('readonly');restore.push(()=>{if(descriptor)Object.defineProperty(target,name,descriptor);else delete target[name];});}catch{unavailable.push(name);}
    }
    for(const name of ['createRenderPipeline','createRenderPipelineAsync','createComputePipeline','createComputePipelineAsync'])wrap(device,name,args=>{count(name);if(pipelines.length<16){const d=args[0],o=currentObject;pipelines.push({seconds:(performance.now()-started)/1000,method:name,label:d.label,object:o?{name:o.name,type:o.type,material:o.material?.name,position:o.position.toArray()}:null,vertex:d.vertex?.module?.label,fragment:d.fragment?.module?.label,depth:d.depthStencil,primitive:d.primitive});}});
    wrap(device,'createTexture',()=>count('textures'));
    wrap(device,'createBuffer',args=>{count('buffers');count('bufferBytes',args[0].size);});
    for(const name of ['copyExternalImageToTexture','writeTexture','writeBuffer'])wrap(device.queue,name,()=>count(name));
    wrap(renderer.backend,'generateMipmaps',()=>count('mipmaps'));
    for(const node of passes){
      if(typeof node.updateBefore!=='function')continue;
      const original=node.updateBefore,name=node.atlasProfileName||node.constructor.name;
      node.updateBefore=function(...args){const before=performance.now();try{return Reflect.apply(original,this,args);}finally{if(active)phases[name]=(phases[name]||0)+performance.now()-before;}};
      restore.push(()=>{node.updateBefore=original;});
    }
    let observer;
    if(global.PerformanceObserver?.supportedEntryTypes?.includes('longtask')){
      observer=new PerformanceObserver(list=>{for(const entry of list.getEntries()){count('longTasks');count('longTaskMs',entry.duration);}});observer.observe({entryTypes:['longtask']});
    }
    function snapshot(){return {active,seconds:(performance.now()-started)/1000,samples:samples.slice(),pipelines:pipelines.slice(),unavailable:unavailable.slice(),gc:'not exposed by browser',longTasksSupported:Boolean(observer)};}
    function publish(){
      const now=performance.now(),seconds=(now-last)/1000;
      samples.push({seconds:+((now-started)/1000).toFixed(1),fps:frameCount&&frameMs?+(1000*frameCount/frameMs).toFixed(1):null,maxFrameMs:+maxFrameMs.toFixed(1),cpuMs:frameCount?+(cpuMs/frameCount).toFixed(1):null,gpuQueueWaitMs:fenceMs,counts,phasesMs:phases,heapBytes:performance.memory?.usedJSHeapSize??null,bucketSeconds:+seconds.toFixed(2)});
      frameCount=frameMs=maxFrameMs=cpuMs=0;counts={};phases={};last=now;
      const data=snapshot();try{localStorage.setItem('atlas3d-first-visible-v1',JSON.stringify(data));}catch{}
      global.dispatchEvent(new CustomEvent('atlas-three-visible-profile',{detail:data}));
    }
    function stop(){if(!active)return;active=false;clearInterval(timer);publish();observer?.disconnect();restore.reverse().forEach(fn=>fn());}
    const timer=setInterval(()=>{
      if(performance.now()-started>=15000){stop();return;}
      publish();
      // One non-blocking fence at a time. This observes queue latency; it neither
      // stalls rendering nor allocates readback buffers or extra render targets.
      if(!fencePending){fencePending=true;const before=performance.now();device.queue.onSubmittedWorkDone().then(()=>{fenceMs=+(performance.now()-before).toFixed(1);fencePending=false;},()=>{fencePending=false;});}
    },1000);
    return {stop,snapshot,frame(interval,cpu,shadow){if(!active)return;if(interval){frameCount++;frameMs+=interval;maxFrameMs=Math.max(maxFrameMs,interval);cpuMs+=cpu;}if(shadow)count('shadowRefresh');},npc(width,height){if(active){count('npcUpdates');count('npcPixelBytes',width*height*4);}},phase(name,ms){if(active)phases[name]=(phases[name]||0)+ms;}};
  }
  global.AtlasThreeRuntimeDiagnostics=Object.freeze({start});
})(window);
(function(global){
 'use strict';
 // The existing detailed shader tracer takes precedence: do not nest two
 // independent GPU method interceptors with different restoration lifetimes.
 const flags=new URLSearchParams(location.search);
 if(flags.get('debug3d')!=='1'||flags.get('profile3d')!=='1'||flags.get('debug3dgpu')==='1')return;
 // Opt-in CPU/submission instrumentation. Queue completion latency is NOT a GPU timestamp.
 global.AtlasThreePerformance={start(renderer,scene){
  const restore=[],totals={},samples=[];let ready=false,inventory=null,current={},objects=new Set(),materials=new Set(),lastPipeline=null,projectDepth=0;
  const add=(target,key,n=1)=>target[key]=(target[key]||0)+n;
  function hook(target,name,fn){const original=target[name],own=Object.getOwnPropertyDescriptor(target,name);if(typeof original!=='function')return;target[name]=function(...args){return fn.call(this,original,args);};restore.push(()=>own?Object.defineProperty(target,name,own):delete target[name]);}
  for(const method of ['createShaderModule','createRenderPipeline','createRenderPipelineAsync','createComputePipeline','createComputePipelineAsync'])hook(renderer.backend.device,method,function(original,args){add(totals,method);return Reflect.apply(original,this,args);});
  hook(renderer.backend.device.queue,'submit',function(original,args){add(current,'submissions');return Reflect.apply(original,this,args);});
  hook(renderer,'waitForGPU',function(original,args){const at=performance.now();return Reflect.apply(original,this,args).finally(()=>{const ms=performance.now()-at;add(totals,ready?'visibleFenceMs':'preparationFenceMs',ms);add(totals,ready?'visibleFences':'preparationFences');if(ready&&samples.length)samples.at(-1).fenceMs=ms;});});
  hook(renderer,'_projectObject',function(original,args){const outer=projectDepth++===0,at=outer?performance.now():0;try{return Reflect.apply(original,this,args);}finally{projectDepth--;if(outer)add(current,'traversalAndCullingMs',performance.now()-at);}});
  hook(scene,'updateMatrixWorld',function(original,args){const at=performance.now();try{return Reflect.apply(original,this,args);}finally{add(current,'matrixUpdateMs',performance.now()-at);}});
  hook(renderer.backend,'draw',function(original,args){
   const ro=args[0],p=ro.getDrawParameters();if(p){const shadow=Boolean(ro.material.isShadowPassMaterial),world=ro.object.isMesh&&!ro.object.isQuadMesh;
    add(current,shadow?'shadowDraws':'draws');if(world&&!shadow){objects.add(ro.object.id);materials.add(ro.material.id);add(current,'visibleTriangles',(p.vertexCount||0)*(p.instanceCount||1)/3);}
    const pipeline=renderer.backend.get(ro.pipeline).pipeline;if(lastPipeline!==pipeline){add(current,'pipelineSwitches');lastPipeline=pipeline;}}
   return Reflect.apply(original,this,args);
  });
  return {prepared(){
   const geo=new Set(),mats=new Set(),tex=new Set(),pairs=new Set();let meshes=0,instances=0,instancedMeshes=0,shadowCasters=0,lights=0;
   scene.traverse(o=>{if(o.isLight)lights++;if(!o.isMesh)return;meshes++;if(o.castShadow)shadowCasters++;if(o.isInstancedMesh){instancedMeshes++;instances+=o.count;}geo.add(o.geometry);
    for(const m of Array.isArray(o.material)?o.material:[o.material]){mats.add(m);pairs.add(o.geometry.uuid+'/'+m.uuid);for(const v of Object.values(m))if(v?.isTexture)tex.add(v);}});
   inventory={meshes,instances,instancedMeshes,shadowCasters,lights,geometries:geo.size,materials:mats.size,geometryMaterialPairs:pairs.size,textures:tex.size,nodeMaterials:[...mats].filter(m=>m.isNodeMaterial).length,doubleSided:[...mats].filter(m=>m.side===2).length,alphaTest:[...mats].filter(m=>m.alphaTest>0).length,transparent:[...mats].filter(m=>m.transparent).length};
   ready=true;current={};objects.clear();materials.clear();
  },frame(interval,cpu,shadow){if(!ready)return;samples.push({...current,interval,cpu,shadowRefresh:shadow,visibleObjects:objects.size,visibleMaterials:materials.size});if(samples.length>2400)samples.shift();current={};objects.clear();materials.clear();lastPipeline=null;},snapshot(){return {inventory,totals:{...totals},samples:samples.slice(),gpuTiming:'queue fence wall time, not hardware execution time; culling included in traversal'};},stop(){restore.reverse().forEach(fn=>fn());}};
 }};
})(window);
