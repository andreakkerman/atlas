(function(global){
  'use strict';
  function create(options){
    let binding=null,abort=null,move=null,look=null,walk=0,turn=0,lastEvent='idle',lastReset='initial',capture='none';
    const counts={down:0,motion:0,end:0,cancel:0,rebind:0},keys=options.keys||new Set();
    const clamp=(v)=>Math.max(-1,Math.min(1,v));
    const permitted=()=>Boolean(options.canPlay());
    const snapshot=()=>({transport:options.nativeTouch?'native touch IDs / mouse pointers':'pointer IDs',moveId:move?.id??null,lookId:look?.id??null,walk,turn,lastEvent,lastReset,capture,counts:{...counts},allowed:permitted()});
    function vector(x=0,y=0){
      const axis=v=>Math.abs(v)<.15?0:Math.sign(v)*(Math.abs(v)-.15)/.85;
      walk=-axis(y)||0;turn=axis(x);options.onVector(walk,turn);
      const stick=binding?.pad?.querySelector('[data-three-stick]');
      if(stick)stick.style.transform=`translate(${x*32}px,${y*32}px)`;
    }
    function reset(reason='reset'){
      if(move||look||keys.size||walk||turn)lastReset=reason;
      keys.clear();move=look=null;vector();
    }
    function begin(role,id,x,y,source){
      lastEvent=`${source} start ${id}`;counts.down++;
      if(!permitted()||(role==='move'?move:look))return false;
      options.onInputType(role==='move'||source==='touch'?'touch':'desktop');
      if(role==='move'){
        options.onInputType('touch');const rect=binding.pad.getBoundingClientRect();
        move={id,x:rect.left+rect.width/2,y:rect.top+rect.height/2,source};
        vector(clamp((x-move.x)/40),clamp((y-move.y)/40));
      }else look={id,x,y,source};
      return true;
    }
    function motion(id,x,y,source,dx,dy,locked=false){
      if(!permitted()){reset('input guard');return;}
      if(move?.source===source&&move.id===id){lastEvent=`${source} move ${id}`;counts.motion++;vector(clamp((x-move.x)/40),clamp((y-move.y)/40));return;}
      if(!locked&&!(look?.source===source&&look.id===id))return;
      lastEvent=`${source} look ${id}`;counts.motion++;
      options.onLook(locked?dx:x-look.x,locked?dy:y-look.y);
      if(look){look.x=x;look.y=y;}
    }
    function end(id,source,reason){
      if(!(move?.source===source&&move.id===id)&&!(look?.source===source&&look.id===id))return;
      lastEvent=`${reason} ${id}`;counts[reason.includes('cancel')?'cancel':'end']++;
      if(move?.source===source&&move.id===id){move=null;vector();}
      if(look?.source===source&&look.id===id)look=null;
    }
    function attach(canvas,pad,action){
      // Status refreshes must not cancel a finger that is still held down.
      if(binding?.canvas===canvas&&binding.pad===pad&&binding.action===action)return;
      reset('controls replaced');abort?.abort();abort=new AbortController();binding={canvas,pad,action};counts.rebind++;
      const opts={signal:abort.signal};
      const capturePointer=(target,id)=>{try{target.setPointerCapture?.(id);capture=target.hasPointerCapture?.(id)?`pointer ${id}`:'not established';}catch(error){capture=`${error.name}: ${error.message}`;}};
      for(const [target,role]of [[canvas,'look'],[pad,'move']])if(target){
        target.addEventListener('pointerdown',event=>{
          if(options.nativeTouch&&event.pointerType==='touch')return;
          if(event.button!==0)return;
          if(role==='look')options.activate?.();
          if(!begin(role,event.pointerId,event.clientX,event.clientY,'pointer'))return;
          if(role==='look')options.onInputType(event.pointerType==='touch'||event.pointerType==='pen'?'touch':'desktop');
          if(role==='move')event.preventDefault();event.stopPropagation();
          if(role==='look')canvas.focus({preventScroll:true});capturePointer(target,event.pointerId);
        },opts);
        if(options.nativeTouch){
          // Touch events stay associated with the original surface and carry
          // stable identifiers. iPad movement does not depend on pointer capture
          // or get reset by the parallel compatibility pointer event stream.
          target.addEventListener('touchstart',event=>{
            if(role==='look')options.activate?.();
            if(!permitted())return;
            let accepted=false;for(const touch of Array.from(event.changedTouches)){if(touch.target!==target&&!target.contains(touch.target))continue;accepted=begin(role,touch.identifier,touch.clientX,touch.clientY,'touch')||accepted;}
            if(accepted){capture='native touch: no pointer capture';event.preventDefault();event.stopPropagation();}
          },{...opts,passive:false});
          target.addEventListener('touchmove',event=>{
            const owned=Array.from(event.changedTouches).some(t=>(move?.source==='touch'&&move.id===t.identifier)||(look?.source==='touch'&&look.id===t.identifier));
            if(!owned)return;
            for(const touch of Array.from(event.changedTouches))motion(touch.identifier,touch.clientX,touch.clientY,'touch');
            event.preventDefault();event.stopPropagation();
          },{...opts,passive:false});
          for(const type of ['touchend','touchcancel'])target.addEventListener(type,event=>{for(const touch of Array.from(event.changedTouches))end(touch.identifier,'touch',type);},opts);
        }
        // No suppression is installed on document/window or Atlas buttons.
        for(const type of ['touchmove','gesturestart','gesturechange'])target.addEventListener(type,event=>{if(permitted())event.preventDefault();},{...opts,passive:false});
      }
      canvas.addEventListener('click',event=>event.stopPropagation(),opts);
      canvas.addEventListener('dblclick',event=>{event.stopPropagation();if(permitted()&&event.pointerType!=='touch')canvas.requestPointerLock?.()?.catch?.(()=>{});},opts);
      pad?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();},opts);
      action?.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();if(permitted())options.interact();},opts);
      global.addEventListener('pointermove',event=>{
        if(options.nativeTouch&&event.pointerType==='touch')return;
        motion(event.pointerId,event.clientX,event.clientY,'pointer',event.movementX,event.movementY,document.pointerLockElement===canvas);
      },opts);
      for(const type of ['pointerup','pointercancel','lostpointercapture'])global.addEventListener(type,event=>end(event.pointerId,'pointer',type),opts);
      global.addEventListener('blur',()=>reset('window blur'),opts);
      document.addEventListener('visibilitychange',()=>{if(document.hidden)reset('document hidden');},opts);
      document.addEventListener('pointerlockchange',()=>{if(look?.source==='pointer')reset('pointer lock changed');},opts);
      const code=event=>event.code||({w:'KeyW',s:'KeyS',a:'KeyA',d:'KeyD',e:'KeyE'}[event.key?.toLowerCase()]||event.key);
      global.addEventListener('keydown',event=>{
        if(!permitted()||event.ctrlKey||event.metaKey||event.altKey||event.target.closest?.('input,textarea,select,[contenteditable="true"],[role="dialog"]'))return;
        const key=code(event);
        if(['KeyW','KeyS','KeyA','KeyD','KeyE','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(key))options.onInputType('desktop');
        if(['KeyW','KeyS','KeyA','KeyD','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(key)){event.preventDefault();keys.add(key);}
        if(key==='KeyE'&&!event.repeat){event.preventDefault();options.interact();}
      },opts);
      global.addEventListener('keyup',event=>keys.delete(code(event)),opts);canvas.tabIndex=0;
    }
    return {attach,reset,snapshot,dispose(){reset('disposed');abort?.abort();abort=null;binding=null;}};
  }
  global.AtlasThreeInput=Object.freeze({create});
})(window);
