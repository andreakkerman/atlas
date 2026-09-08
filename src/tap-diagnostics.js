(function () {
  'use strict';
  // Temporary physical-device evidence. Observers never cancel events or take focus.
  const enabled=new URLSearchParams(location.search).get('debug3d')==='1';
  if(!enabled)return;
  const controls='button,a,input,select,textarea,[role="button"],[data-level]';
  const panel=document.createElement('pre');
  panel.className='atlasTapDiagnostics';panel.dataset.tapDiagnostics='';panel.setAttribute('aria-hidden','true');
  document.body.append(panel);
  const events=new WeakMap();let trace=null,lastError='',currentPreparation='';
  let previousPreparation='';
  try{const previous=JSON.parse(localStorage.getItem('atlas3d-debug-preparation-v1'));if(previous)previousPreparation=`Vorige voorbereiding (${previous.state}): ${previous.operation}\nLaatst voltooid: ${previous.lastCompleted||'—'}`;}catch{}
  const name=node=>node instanceof Element?`${node.tagName.toLowerCase()}${node.id?'#'+node.id:''}${node.classList.length?'.'+Array.from(node.classList).slice(0,2).join('.'):''}`:'(geen)';
  const label=node=>(node?.getAttribute('aria-label')||node?.textContent||name(node)).trim().replace(/\s+/g,' ').slice(0,48);
  const render=()=>{panel.textContent=[previousPreparation,currentPreparation,(trace?`Tapdiagnose · ${trace.button}\n${['pointerdown','touchstart','click'].map(type=>`${type}: ${trace.seen[type]||'—'}`).join(' · ')}\n${trace.hit}\n${trace.style}\n${trace.lines.join('\n')}`:'Tapdiagnose actief · tik op Menu / Terug'),lastError?'FOUT: '+lastError:''].filter(Boolean).join('\n');};
  window.addEventListener('atlas-three-preparation',event=>{const record=event.detail;currentPreparation=`3D (${record.strategy}, ${record.state}): ${record.operation}\nLaatst voltooid: ${record.lastCompleted||'—'}`;render();});
  const add=(entry,line)=>{entry.lines.push(line);entry.lines=entry.lines.slice(-5);if(entry===trace)render();};
  const locationOfCall=()=>new Error().stack?.split('\n').find(line=>/\.js:\d+/.test(line)&&!line.includes('tap-diagnostics.js'))?.trim().replace(location.origin,'').slice(-130)||'handler';
  function begin(event) {
    const point=event.changedTouches?.[0]||event;
    if(!Number.isFinite(point.clientX))return;
    const hit=document.elementFromPoint(point.clientX,point.clientY);
    const containsPoint=el=>{const rect=el.getBoundingClientRect(),css=getComputedStyle(el);return rect.width>0&&rect.height>0&&css.visibility!=='hidden'&&point.clientX>=rect.left&&point.clientX<=rect.right&&point.clientY>=rect.top&&point.clientY<=rect.bottom;};
    let intended=Array.from(document.querySelectorAll('[data-action="menu"]')).find(containsPoint)||event.target.closest?.(controls);
    if(!intended){
      // Find a button underneath an intercepting overlay, without changing hit testing.
      intended=Array.from(document.querySelectorAll(controls)).find(containsPoint);
    }
    if(!intended)return;
    if(!trace||event.type==='pointerdown'||(event.type==='touchstart'&&performance.now()-trace.started>600)){
      const chain=[];for(let el=hit;el&&chain.length<3;el=el.parentElement){const css=getComputedStyle(el);chain.push(`${name(el)}: touch=${css.touchAction}, pointer=${css.pointerEvents}, z=${css.zIndex}`);}
      trace={started:performance.now(),button:label(intended),hit:`doel=${name(event.target)} · hit=${name(hit)} · overlay=${hit===intended||intended.contains(hit)?'nee':'JA'}`,style:chain.join('\n'),lines:[],seen:{},pointer:event.pointerId};
      lastError='';
    }
    const entry=trace;events.set(event,entry);
    entry.seen[event.type]='ontvangen';render();
    // A task runs after dispatch has finished, including handlers on other nodes.
    setTimeout(()=>{entry.seen[event.type]=`ontvangen, defaultPrevented=${event.defaultPrevented}`;render();},0);
  }
  for(const type of ['pointerdown','touchstart','click']){
    window.addEventListener(type,begin,{capture:true,passive:true});
    window.addEventListener(type,event=>{const entry=events.get(event);if(entry)add(entry,`${type}: einde bubble bereikt`);},{passive:true});
  }
  // Call-through instrumentation: preserve receiver, arguments, return value and exceptions.
  // Record only events already identified as UI taps by the passive capture observer.
  for(const method of ['preventDefault','stopPropagation','stopImmediatePropagation']){
    const original=Event.prototype[method];
    Event.prototype[method]=function(...args){
      const result=Reflect.apply(original,this,args),entry=events.get(this);
      try{if(entry)add(entry,`${this.type}: ${method} · ${locationOfCall()}`);}catch{/* Diagnostics must not change the observed handler. */}
      return result;
    };
  }
  for(const type of ['gotpointercapture','lostpointercapture','pointercancel','touchcancel'])window.addEventListener(type,event=>{
    if(trace&&(event.pointerId===trace.pointer||performance.now()-trace.started<1000))add(trace,`${type}: ${name(event.target)}`);
  },{capture:true,passive:true});
  const error=caught=>{lastError=`${caught?.name||'Error'}: ${caught?.message||caught}`;render();};
  window.addEventListener('error',event=>error(event.error||event.message),{passive:true});
  window.addEventListener('unhandledrejection',event=>error(event.reason),{passive:true});
  render();
})();
