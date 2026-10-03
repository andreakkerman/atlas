/* Opt-in audit only. Load before app scripts for complete creation history, or
 * at the main menu before entering a level. Reload removes all instrumentation.
 * Registries use WeakRef: the audit must not retain resources/DOM as a leak. */
(function(global){
 'use strict';if(global.AtlasLifecycleAudit)return;
 const started=performance.now(),preloaded=!global.AtlasCinematicRenderer;
 const native={raf:requestAnimationFrame.bind(global),timeout:setTimeout.bind(global)};
 const refs=x=>typeof WeakRef==='function'?new WeakRef(x):{deref:()=>undefined};
 const read=expression=>{try{return global.eval(expression);}catch{return null;}};
 const level=()=>read('level?.id'),screen=()=>read('state?.screen');
 const count={},raf=new Map(),timeouts=new Map(),intervals=new Map(),textures=new Map(),buffers=new Map(),owners=[],observers=[],media=[],pending=new Map(),events=[],captures=[],measurements=[];
 const objectIds=new WeakMap(),functions=new WeakMap(),owned=new WeakSet();let serial=0,frame=null,rows=[],recording=false,last=null,previousSprite='',previousPosition='';
 const id=x=>{if(!objectIds.has(x))objectIds.set(x,++serial);return objectIds.get(x);};
 const add=(key,n=1)=>{count[key]=(count[key]||0)+n;if(recording&&frame)frame.work[key]=(frame.work[key]||0)+n;};
 const label=fn=>{if(typeof fn!=='function')return 'string timer';if(!functions.has(fn)){const site=(new Error().stack||'').split('\n').find(x=>/\/src\//.test(x))?.trim()||'';functions.set(fn,`${fn.name||'anonymous'}#${++serial}${site?' '+site:''}`);}return functions.get(fn);};
 const group=values=>{const result={};for(const v of values)result[v]=(result[v]||0)+1;return result;};
 const log=(type,data={})=>{events.push({time:performance.now(),type,level:level(),screen:screen(),...data});if(events.length>1500)events.shift();};
 function startFrame(time){if(!recording||time===last)return;if(last!==null){frame.dt=time-last;rows.push(frame);}const actor=document.querySelector('[data-actor="sven"]'),src=actor?.getAttribute('src'),position=actor?.closest('[data-actor-shell]')?.getAttribute('style');frame={time,work:{},change:src!==previousSprite?'image':position!==previousPosition?'position':'unchanged'};previousSprite=src;previousPosition=position;last=time;}
 global.requestAnimationFrame=function(fn){const name=label(fn);let token;token=native.raf(time=>{raf.delete(token);startFrame(time);const t=performance.now();add('raf:'+name);try{return fn(time);}finally{add('cpu:'+name,performance.now()-t);}});raf.set(token,{name,level:level()});return token;};
 const cancel=cancelAnimationFrame;global.cancelAnimationFrame=token=>{raf.delete(token);return cancel(token);};
 for(const [method,clear,registry,repeat] of [['setTimeout','clearTimeout',timeouts,false],['setInterval','clearInterval',intervals,true]]){
  const original=global[method],remove=global[clear];global[method]=function(fn,delay,...args){if(typeof fn!=='function')return original(fn,delay,...args);const name=label(fn),created=performance.now();let token;token=original(function(...a){if(!repeat)registry.delete(token);add('timerCallbacks');add('timer:'+name);if(recording&&frame)frame.maxTimerAge=Math.max(frame.maxTimerAge||0,performance.now()-created);return fn.apply(this,a);},delay,...args);registry.set(token,{name,delay:Number(delay)||0,level:level(),created});return token;};global[clear]=token=>{registry.delete(token);return remove(token);};
 }
 const wrap=(proto,key,fn)=>{if(!proto?.[key])return;const original=proto[key];proto[key]=function(...args){return fn.call(this,original,args);};};
 for(const [kind,registry,constructor] of [['Texture',textures,global.GPUTexture],['Buffer',buffers,global.GPUBuffer]]){
  wrap(global.GPUDevice?.prototype,'create'+kind,function(original,args){const result=original.apply(this,args);registry.set(id(result),{ref:refs(result),level:level(),descriptor:{label:args[0].label,size:args[0].size,format:args[0].format},created:performance.now()});add(kind+'Create');return result;});
  wrap(constructor?.prototype,'destroy',function(original,args){registry.delete(id(this));add(kind+'Destroy');return original.apply(this,args);});
 }
 wrap(global.GPUQueue?.prototype,'copyExternalImageToTexture',function(original,args){const t=performance.now();const s=args[0].source,size=args[2],bytes=(size.width||size[0])*(size.height||size[1])*4;const kind=s.dataset?.sceneEffectsCanvas?'canvas:'+s.dataset.sceneEffectsCanvas:s.hasAttribute?.('data-flyby-canvas')?'flyby':s instanceof HTMLCanvasElement?'spriteRaster':'image';add('uploads');add('uploadBytes',bytes);add('upload:'+kind);add('bytes:'+kind,bytes);const item=textures.get(id(args[1].texture));if(item)item.kind=kind;try{return original.apply(this,args);}finally{add('copyCPU',performance.now()-t);}});
 for(const [proto,key,name] of [[global.GPUCommandEncoder?.prototype,'beginRenderPass','passes'],[global.GPURenderPassEncoder?.prototype,'draw','draws'],[global.GPUQueue?.prototype,'submit','submissions'],[global.GPUQueue?.prototype,'writeBuffer','uniformWrites'],[global.GPUDevice?.prototype,'createBindGroup','bindGroups']])wrap(proto,key,function(original,args){add(name);return original.apply(this,args);});
 wrap(CanvasRenderingContext2D.prototype,'drawImage',function(original,args){if(!this.canvas.isConnected)add('detachedCanvasDraws');return original.apply(this,args);});
 wrap(CanvasRenderingContext2D.prototype,'clearRect',function(original,args){const slot=this.canvas.dataset.sceneEffectsCanvas;if(slot)add('producer:'+slot);return original.apply(this,args);});
 const addEvent=EventTarget.prototype.addEventListener,removeEvent=EventTarget.prototype.removeEventListener;
 EventTarget.prototype.addEventListener=function(type,...args){add('listenerAdd:'+type);return addEvent.call(this,type,...args);};
 EventTarget.prototype.removeEventListener=function(type,...args){add('listenerRemove:'+type);return removeEvent.call(this,type,...args);};
 for(const name of ['MutationObserver','ResizeObserver','IntersectionObserver'])if(global[name]){
  const Original=global[name];global[name]=new Proxy(Original,{construct(target,args){const callback=args[0],instance=new target(function(...a){add('observerCallback:'+name);return callback.apply(this,a);}),entry={name,ref:refs(instance),observing:false};observers.push(entry);const observe=instance.observe.bind(instance),disconnect=instance.disconnect.bind(instance);instance.observe=(...a)=>{entry.observing=true;return observe(...a);};instance.disconnect=(...a)=>{entry.observing=false;return disconnect(...a);};return instance;}});
 }
 const seenMedia=new WeakSet();function trackMedia(x){if(!seenMedia.has(x)){seenMedia.add(x);media.push(refs(x));}return x;}
 if(global.Audio)global.Audio=new Proxy(global.Audio,{construct(target,args){return trackMedia(new target(...args));}});
 for(const key of ['play','pause','load'])wrap(HTMLMediaElement.prototype,key,function(original,args){trackMedia(this);add('media:'+key);return original.apply(this,args);});
 function register(name,value){if(!value||owned.has(value))return value;owned.add(value);const owner={id:id(value),name,ref:refs(value)};owners.push(owner);
  for(const method of ['prepare','prepareLevel','activate','releaseActive','releaseLevel','dispose','stopAll','sync','suspend','resume'])if(typeof value[method]==='function'){
   const original=value[method];try{value[method]=function(...args){const stage=`${name}.${method}`,boundary=['dispose','releaseActive','releaseLevel','prepareLevel','activate','suspend','resume'].includes(method);if(boundary)log(stage+':before');let result;try{result=original.apply(this,args);}catch(e){log(stage+':error',{message:String(e)});throw e;}if(result?.then){const token=++serial;pending.set(token,{owner:name,method,level:level()});result.then(()=>{pending.delete(token);if(boundary)capture(stage+':resolved');},e=>{pending.delete(token);log(stage+':rejected',{message:String(e)});});}else if(boundary)capture(stage+':after');return result;};}catch{}
  }return value;
 }
 const factories={AtlasCinematicRenderer:['createRuntime'],AtlasVoxelRenderer:['createRuntime'],AtlasThreeRenderer:['createRuntime'],AtlasSceneEffects:['createRuntime'],AtlasAmbientSystem:['createFlybyRuntime'],AtlasChallengeFx:['createRuntime'],AtlasEmissiveGlow:['createRuntime'],AtlasAssetReadiness:['createCoordinator']};
 for(const [name,methods] of Object.entries(factories)){
  const instrument=api=>{if(!api)return api;const copy={...api};for(const method of methods)if(typeof api[method]==='function')copy[method]=function(...args){return register(name,api[method].apply(api,args));};return Object.isFrozen(api)?Object.freeze(copy):copy;};
  if(global[name])global[name]=instrument(global[name]);else{let api;Object.defineProperty(global,name,{configurable:true,get:()=>api,set:value=>{api=instrument(value);}});}
 }
 const live=registry=>{const result=[];for(const [key,value] of registry){if(!value.ref.deref()){registry.delete(key);continue;}const {ref,...rest}=value;result.push({id:key,...rest});}return result;};
 function snapshot(){
  const renderer=read('cinematicRenderer'),effects=read('sceneEffectRuntime'),ambient=read('ambientFlybyRuntime'),assets=read('assetCache'),plan=read('assetReadiness')?.snapshot?.();
  for(const name of ['cinematicRenderer','sceneEffectRuntime','ambientFlybyRuntime','challengeFx','voxelRenderer','threeRenderer','emissiveGlowRenderer','assetReadiness']){const value=read(name);if(value&&!owned.has(value))register(name,value);}
  const canvases=[...document.querySelectorAll('canvas')].map(c=>({id:id(c),slot:c.dataset.sceneEffectsCanvas||c.className,width:c.width,height:c.height,frame:global.AtlasSceneEffects?.canvasFrame(c)}));
  const decoded=global.AtlasLocomotion?.decodedImages;let decodedBytes=0;decoded?.forEach(i=>{decodedBytes+=i.naturalWidth*i.naturalHeight*4;});
  const audio=media.map(r=>r.deref()).filter(Boolean);const texturesLive=live(textures),buffersLive=live(buffers);
  return {time:performance.now(),level:level(),screen:screen(),visibility:document.visibilityState,renderer:renderer?.snapshot?.(),three:read('threeRenderer')?.snapshot?.()?.status,voxel:read('voxelRenderer')?.snapshot?.()?.status,broker:global.AtlasWebGPUCapabilities?.snapshot?.(),features:read('illustratedFeatures()'),challenge:read('challengeFx')?.snapshot?.(),
   gpu:{textures:texturesLive,buffers:buffersLive.length,bufferBytes:buffersLive.reduce((n,x)=>n+(x.descriptor.size||0),0),textureKinds:group(texturesLive.map(t=>t.purpose||t.kind||t.descriptor.format||'unknown'))},
   owners:owners.filter(o=>o.ref.deref()).map(({ref,...o})=>o),raf:group([...raf.values()].map(x=>x.name)),timers:{timeouts:[...timeouts.values()],intervals:[...intervals.values()]},pending:[...pending.values()],observers:group(observers.filter(o=>o.ref.deref()&&o.observing).map(o=>o.name)),
   media:{known:audio.length,playing:audio.filter(a=>!a.paused&&!a.ended).map(a=>({src:a.currentSrc||a.src,time:a.currentTime,loop:a.loop})),dom:document.querySelectorAll('audio,video').length},
   effects:effects?{raf:!!effects.rafId,resolved:effects.resolved?.length,transient:effects.transient?.length,performance:effects.performanceSnapshot?.()}:null,
   ambient:ambient?{active:ambient.active.size,audio:ambient.activeAudio.size,timers:ambient.timers.size,readiness:ambient.readiness.size,paths:ambient.pathCaches.size}:null,
   caches:{images:assets?.images?.size,sounds:assets?.audio?.size,decodedSprites:decoded?.size,decodedLogicalBytes:decodedBytes,activePlan:plan?{level:plan.levelId,images:plan.images.size}:null},
   dom:{nodes:document.querySelectorAll('*').length,canvases},counts:{...count},heap:performance.memory?{used:performance.memory.usedJSHeapSize,total:performance.memory.totalJSHeapSize}:null,
   environment:{viewport:[innerWidth,innerHeight],dpr:devicePixelRatio,userAgent:navigator.userAgent,standalone:matchMedia('(display-mode: standalone)').matches,serviceWorker:navigator.serviceWorker?.controller?.scriptURL||null}};
 }
 function capture(tag){try{const s=snapshot();captures.push({tag,...s});if(captures.length>400)captures.shift();return s;}catch(e){log('capture-error',{tag,message:String(e)});return null;}}
 function begin(){recording=true;rows=[];frame=null;last=null;}
 function end(){recording=false;const q=(data,p)=>{const s=[...data].sort((a,b)=>a-b);return s[Math.min(s.length-1,Math.floor(s.length*p))]||0;},dt=rows.map(x=>x.dt);return{rows,summary:{frames:rows.length,fps:1000*rows.length/dt.reduce((a,b)=>a+b,0),median:q(dt,.5),p95:q(dt,.95),p99:q(dt,.99),max:q(dt,1)},snapshot:snapshot()};}
 const compact=s=>({tag:s.tag,time:s.time,level:s.level,screen:s.screen,visibility:s.visibility,renderer:s.renderer?{status:s.renderer.status,mode:s.renderer.mode,scheduled:s.renderer.scheduled,targets:s.renderer.renderTargets,depthCached:s.renderer.depthCached,particles:s.renderer.particles,caches:s.renderer.auditCaches}:null,gpu:{textures:s.gpu.textures.length,buffers:s.gpu.buffers,kinds:s.gpu.textureKinds},raf:s.raf,timers:{timeouts:s.timers.timeouts.length,intervals:s.timers.intervals.length},pending:s.pending,owners:s.owners,effects:s.effects,ambient:s.ambient,media:s.media,caches:s.caches,observers:s.observers,dom:{nodes:s.dom.nodes,canvases:s.dom.canvases.length},features:s.features,environment:s.environment});
 const api=global.AtlasLifecycleAudit={preloaded,started,capture,begin,end,events,captures,tagTexture(texture,details){const entry=textures.get(id(texture));if(entry){entry.purpose=details.purpose;entry.path=details.path;}},async measure(tag,ms=5000){capture(tag+':before');begin();await new Promise(r=>native.timeout(r,ms));const result=end();capture(tag+':after');const work={};for(const row of result.rows)for(const [key,value] of Object.entries(row.work))work[key]=(work[key]||0)+value/result.rows.length;measurements.push({tag,...result.summary,work,snapshot:compact(result.snapshot)});if(measurements.length>40)measurements.shift();return result;},export(){return{preloaded,started,captures,events,measurements,snapshot:snapshot()};},download(full=false){const data=full?api.export():{preloaded,started,captures:captures.map(compact),events,measurements,snapshot:compact(snapshot())};const blob=new Blob([JSON.stringify(data)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='atlas-lifecycle-'+Date.now()+'.json';a.click();native.timeout(()=>URL.revokeObjectURL(url),1000);}};
 for(const type of ['visibilitychange','pagehide','pageshow','freeze','resume'])addEvent.call(type==='visibilitychange'||type==='freeze'||type==='resume'?document:global,type,event=>{log(type,{persisted:event.persisted,isTrusted:event.isTrusted,visibility:document.visibilityState});capture(type+':event');native.timeout(()=>capture(type+':settled'),0);});
 capture('diagnostics-installed');
})(window);
