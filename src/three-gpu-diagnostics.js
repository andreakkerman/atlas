(function(global){
 'use strict';
 if(new URLSearchParams(location.search).get('debug3d')!=='1')return;
 let currentSession=0;
 function create(device){
  const session=++currentSession,started=performance.now(),restore=[],events=[],boundaries=[],seen=new Map(),views={},inspected=new Set();
  let operation='device acquired',pass='',object=null,material=null,lastShader=null,lastPipeline=null,cleanupAt=null,loss=null,firstFailure=null,active=true;
  const counts={shaders:0,pipelines:0,newShaders:0},unavailable=[];
  const now=()=>+(performance.now()-started).toFixed(1);
  const errorInfo=e=>({name:e?.name||e?.constructor?.name||'Error',message:String(e?.message||e)});
  function snapshot(){return {session,operation,pass,counts:{...counts},lastShader,lastPipeline,firstFailure,loss,cleanupAt,views:JSON.parse(JSON.stringify(views)),events:events.slice(),boundaries:boundaries.slice(),unavailable:unavailable.slice()};}
  function publish(){if(session!==currentSession)return;const data=snapshot();try{localStorage.setItem('atlas3d-gpu-preparation-v1',JSON.stringify(data));}catch{}global.dispatchEvent(new CustomEvent('atlas-three-gpu',{detail:data}));}
  function record(type,detail={}){events.push({at:now(),operation,pass,type,...detail});if(events.length>48)events.shift();publish();}
  function failure(type,error,detail={}){const entry={at:now(),operation,pass,type,error:errorInfo(error),shader:lastShader,pipeline:lastPipeline,...detail};firstFailure||=entry;record(type,entry);}
  function wrap(target,name,handler){
   if(typeof target?.[name]!=='function'){unavailable.push(name);return;}
   const original=target[name],descriptor=Object.getOwnPropertyDescriptor(target,name);
   const replacement=function(...args){return handler(original,this,args);};
   try{target[name]=replacement;if(target[name]!==replacement)throw Error('readonly');restore.push(()=>{if(descriptor)Object.defineProperty(target,name,descriptor);else delete target[name];});}catch{unavailable.push(name);}
  }
  function objectInfo(){return object?{name:object.name,type:object.type,material:material?.name||object.material?.name,materialType:material?.type||object.material?.type}:null;}
  function fingerprint(code){let h=2166136261;for(let i=0;i<code.length;i++)h=Math.imul(h^code.charCodeAt(i),16777619);return `${code.length}:${(h>>>0).toString(16)}`;}
  const inView=()=>/^Beeld |^Warm-up |^Eerste speelbare/.test(operation);
  wrap(device,'createShaderModule',(fn,self,args)=>{
   const d=args[0],hash=fingerprint(d.code),firstSeen=seen.get(hash)||operation;
   const fresh=!seen.has(hash);if(fresh&&seen.size<8192)seen.set(hash,operation);
   counts.shaders++;if(fresh)counts.newShaders++;
   lastShader={at:now(),sequence:counts.shaders,label:d.label||'(unlabelled)',hash,firstSeen,newSource:fresh,operation,pass,object:objectInfo(),state:'creating'};
   if(inView()){
    const view=views[operation]||=( {} ),key=`${pass}: ${lastShader.label}`;
    const group=view[key]||={count:0,firstObject:objectInfo(),lastObject:null};group.count++;group.lastObject=objectInfo();
   }
   // Persist immediately at the physical failure boundary, but avoid thousands
   // of synchronous storage writes during the bulk compilation batches.
   if(inView())publish();
   try{
    const result=Reflect.apply(fn,self,args);lastShader={...lastShader,state:'created'};
    if(inView()){
     const shader=lastShader;record('shader-created',{shader});
     // Capture the compiler's own location/message without retaining WGSL or modules.
     const key=`${operation}:${shader.label}`;
     if(result.getCompilationInfo&&!inspected.has(key)){inspected.add(key);void result.getCompilationInfo().then(info=>{
      for(const message of info.messages)if(message.type==='error')failure('shader-compilation',{name:'GPUValidationError',message:message.message},{shader,line:message.lineNum,column:message.linePos});
     },error=>failure('shader-compilation-info',error,{shader}));}
    }
    return result;
   }catch(error){lastShader={...lastShader,state:'threw'};failure('shader-throw',error);throw error;}
  });
  for(const name of ['createRenderPipeline','createRenderPipelineAsync','createComputePipeline','createComputePipelineAsync'])wrap(device,name,(fn,self,args)=>{
   const d=args[0];counts.pipelines++;
   const entry={at:now(),method:name,label:d.label||'(unlabelled)',vertex:d.vertex?.module?.label,fragment:d.fragment?.module?.label,compute:d.compute?.module?.label,operation,pass,object:objectInfo()};lastPipeline=entry;
   try{const result=Reflect.apply(fn,self,args);if(inView())record('pipeline-created',{pipeline:entry});if(result?.then)return result.catch(error=>{failure('pipeline-rejection',error,{pipeline:entry});throw error;});return result;}
   catch(error){failure('pipeline-throw',error,{pipeline:entry});throw error;}
  });
  const uncaptured=event=>failure('uncapturederror',event.error);
  device.addEventListener?.('uncapturederror',uncaptured);
  device.lost?.then(info=>{loss={at:now(),reason:info.reason,message:info.message||'',cleanupAlreadyRequested:cleanupAt!==null};record('device.lost',{loss});},error=>failure('device.lost-rejection',error));
  function attach(renderer){
   for(const [name,index]of [['renderObject',4],['_renderObjectDirect',1],['_createObjectPipeline',1]])wrap(renderer,name,(fn,self,args)=>{
    const previous=[object,material];object=args[0];material=args[index];try{return Reflect.apply(fn,self,args);}finally{[object,material]=previous;}
   });
  }
  async function scope(label,task){
   if(!active||!device.pushErrorScope||!device.popErrorScope)return task();
   const filters=['out-of-memory','internal','validation'],pushed=[];
   for(const filter of filters){try{device.pushErrorScope(filter);pushed.push(filter);}catch(error){failure('pushErrorScope',error,{filter});}}
   const pop=()=>pushed.reverse().map(filter=>{
    try{return device.popErrorScope().then(error=>{if(error){failure('error-scope',error,{scope:label,filter});return error;}return null;},error=>{failure('popErrorScope',error,{scope:label,filter});return error;});}
    catch(error){failure('popErrorScope',error,{scope:label,filter});return Promise.resolve(error);}
   });
   let result;
   try{result=await task();}catch(error){failure('scoped-operation',error,{scope:label});void Promise.all(pop());throw error;}
   const errors=await Promise.all(pop()),error=errors.find(Boolean);
   if(error){const detail=errorInfo(error);throw new DOMException(`${label}: ${detail.message}`,detail.name);}
   return result;
  }
  function checkpoint(label,state){
   if(!/renderresources voorbereiden|GPU-opdrachten ingediend/.test(label))operation=label;
   if(/^Warm-up \d+\/\d+:/.test(label)||label==='3D gereed'){
    boundaries.push({at:now(),label,state,counts:{...counts},loss});if(boundaries.length>12)boundaries.shift();
   }
   if(state==='error')record('operation-error',{label});else if(label==='3D gereed'||/^Warm-up |^Beeld |^Eerste speelbare/.test(label))publish();
  }
  function cleanup(){if(cleanupAt!==null)return;cleanupAt=now();record('cleanup-requested');stop();device.removeEventListener?.('uncapturederror',uncaptured);}
  function stop(){if(!active)return;active=false;restore.reverse().forEach(fn=>{try{fn();}catch{}});publish();}
  return {attach,scope,snapshot,checkpoint,cleanup,stop,withPass(name,task){const old=pass;pass=name;try{return task();}finally{pass=old;}}};
 }
 global.AtlasThreeGpuDiagnostics=Object.freeze({create});
})(window);
