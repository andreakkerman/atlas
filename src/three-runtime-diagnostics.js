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
