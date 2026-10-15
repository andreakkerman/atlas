(function (global) {
  "use strict";
  function create(options) {
    let surface=null, mask=null, pixels=null, depth=null, path=null, pending=null, generation=0;
    let columns=null, rows=null, alpha=null, actorDepth=0, extent=null;
    let maskKey='', frameKey='', contactKey='', shell=null, shadow=null, shadowFilter='', error='', shadowSizeKey='';
    const stats={masks:0, frames:0, contactSamples:0, totalMaskMs:0, maxMaskMs:0};
    function releaseSurface() {
      shell?.classList.remove('playerDepthActive'); shadow?.remove(); surface?.remove();
      if(surface)surface.width=surface.height=0;
      if(mask)mask.width=mask.height=0;
      surface=mask=pixels=shell=shadow=columns=rows=alpha=extent=null; maskKey=frameKey='';
    }
    function dispose() {
      generation++; pending=null; depth=null; path=null; error='';contactKey='';
      releaseSurface();
      document.querySelector('[data-player-depth-error]')?.remove();
    }
    // The Cinematic draw requests only contact depth. Until its first presented
    // frame (or after GPU failure), normal scene updates retain the DOM fallback.
    // Return true for a ready native draw, or the prepared Illustrated surface.
    function sync(gpuNative=false) {
      const level=options.getLevel(), config=options.getSettings(), mode=config?.enabled===true?options.getMode():null;
      if(config?.enabled!==true || !['illustrated','cinematic'].includes(mode) || !level || document.hidden) {
        if(surface || pending || depth || path)dispose();
        return null;
      }
      const actor=document.querySelector('[data-actor="sven"]');
      if(!actor?.complete || !actor.naturalWidth)return null;
      const nextPath=global.AtlasAmbientSystem.depthPathFor(level);
      if(path!==nextPath){dispose();path=nextPath;}
      if(!depth){
        if(!pending && !error){
          const token=generation;
          pending=options.loadImage(path).then(image=>{
            if(token!==generation)return;
            depth=global.AtlasSpriteDepth.prepare(image);pending=null;sync();
          }).catch(caught=>{if(token===generation){pending=null;error=caught.message;options.onError?.(error);
              const warning=document.createElement('p');warning.className='cinematicError';warning.dataset.playerDepthError='';warning.setAttribute('role','alert');warning.textContent='Character depth unavailable: '+error;document.querySelector('[data-world-stage]')?.append(warning);}});
        }
        return null;
      }
      const nativePresented=mode==='cinematic' && options.getNativeReady();
      if(mode==='cinematic' && (gpuNative || nativePresented)){
        const point=options.getPosition(),offset=Number(config.offset)||0;
        const nextContact=[level.world.width,level.world.height,point.x,point.y,offset].join(':');
        if(contactKey!==nextContact){
          actorDepth=Math.max(0,Math.min(1,global.AtlasSpriteDepth.sample(depth,level.world,point.x,point.y)+offset));
          contactKey=nextContact;stats.contactSamples++;
        }
        // Challenge FX consume CPU alpha only in Illustrated. No hidden mask,
        // animation compositing or layout reads are needed by native Cinematic.
        if(surface && nativePresented)releaseSurface();
        return true;
      }
      const track=document.querySelector('.worldTrack');
      if(!track)return null;
      const rect=actor.getBoundingClientRect(), worldRect=track.getBoundingClientRect();
      if(!rect.width || !worldRect.width)return null;
      const width=actor.naturalWidth,height=actor.naturalHeight;
      if(!surface){surface=document.createElement('canvas');surface.getContext('2d',{willReadFrequently:true});surface.dataset.playerDepthCanvas='';surface.className='svenSprite playerDepthSurface';mask=document.createElement('canvas');}
      if(surface.width!==width || surface.height!==height){surface.width=mask.width=width;surface.height=mask.height=height;pixels=mask.getContext('2d').createImageData(width,height);columns=new Int32Array(width);rows=new Int32Array(height);alpha=new Uint8Array(256);maskKey=frameKey='';}
      const nextShell=actor.parentElement;
      if(shell!==nextShell || !surface.isConnected){
        shell?.classList.remove('playerDepthActive');shadow?.remove();shell=nextShell;
        shadowFilter=getComputedStyle(shell).filter;
        // Keep the legacy unmasked CSS shadow separate from the visible sprite.
        shadow=document.createElement('span');shadow.className='playerDepthShadow';
        shadow.innerHTML='<svg width="0" height="0" aria-hidden="true"><filter id="player-depth-shadow" x="-100%" y="-100%" width="300%" height="300%" color-interpolation-filters="sRGB"><feGaussianBlur in="SourceAlpha" stdDeviation="9"/><feOffset dy="14"/><feFlood flood-color="black" flood-opacity="0.35"/><feComposite in2="SourceGraphic" operator="in"/></filter></svg>';
        // feComposite must use the blurred/offset alpha, not the source alpha.
        shadowSizeKey='';shadow.querySelector('feOffset').setAttribute('result','offset');
        shadow.querySelector('feComposite').setAttribute('in2','offset');
        const image=document.createElement('img');image.className='svenSprite';image.alt='';shadow.append(image);
        shell.append(shadow,surface);shell.classList.add('playerDepthActive');
      }
      const sw=shell.offsetWidth,sh=shell.offsetHeight,shadowBounds=[Math.min(0,(sw-rect.width)/2)-40,Math.min(0,sh-rect.height)-40,Math.max(sw,rect.width)+80,Math.max(sh,rect.height)+96];
      const nextShadowSize=shadowBounds.join(':');
      if(shadowSizeKey!==nextShadowSize){const filter=shadow.querySelector('filter');filter.setAttribute('filterUnits','userSpaceOnUse');['x','y','width','height'].forEach((name,i)=>filter.setAttribute(name,String(shadowBounds[i])));shadowSizeKey=nextShadowSize;}
      const shadowImage=shadow.querySelector('img'),sourceUrl=actor.currentSrc || actor.src;
      if(shadowImage.src!==sourceUrl)shadowImage.src=sourceUrl;
      if(surface.style.filter!==actor.style.filter)surface.style.filter=actor.style.filter;
      const sy=level.world.height/worldRect.height;
      const point=options.getPosition();
      // CSS layout quantizes the same sprite differently at editor zoom.
      // Retain sub-1/64-world-pixel extent changes so panel/camera changes
      // cannot flip nearest depth samples. The displayed geometry is untouched.
      const stable=(value,previous)=>previous!==undefined && Math.abs(value-previous)<1/64?previous:value;
      const h=stable(rect.height*sy,extent?.h),w=h*width/height;extent={w,h};
      const x=point.x-w/2,y=point.y-h;
      const offset=Number(config.offset)||0;
      const key=level.id+':'+[level.world.width,level.world.height,x,y,w,h,point.x,point.y,offset,width,height].map(n=>Math.round(n*1e6)/1e6).join(':');
      if(key!==maskKey){
        const start=performance.now();
        actorDepth=Math.max(0,Math.min(1,global.AtlasSpriteDepth.sample(depth,level.world,point.x,point.y)+offset));
        contactKey='';stats.contactSamples++;
        for(let i=0;i<256;i++)alpha[i]=Math.round(255*global.AtlasSpriteDepth.visibility(actorDepth,i/255));
        for(let px=0;px<width;px++)columns[px]=Math.max(0,Math.min(depth.width-1,Math.round((x+(px+.5)*w/width)/level.world.width*(depth.width-1))))*4;
        for(let py=0;py<height;py++)rows[py]=Math.max(0,Math.min(depth.height-1,Math.round((y+(py+.5)*h/height)/level.world.height*(depth.height-1))))*depth.width*4;
        let changed=false;
        for(let py=0;py<height;py++){const row=rows[py];let dst=py*width*4+3;for(let px=0;px<width;px++,dst+=4){const value=alpha[depth.data[row+columns[px]]];if(pixels.data[dst]!==value){pixels.data[dst]=value;changed=true;}}}
        if(changed){mask.getContext('2d').putImageData(pixels,0,0);frameKey='';}
        maskKey=key;
        const elapsed=performance.now()-start;stats.masks++;stats.totalMaskMs+=elapsed;stats.maxMaskMs=Math.max(stats.maxMaskMs,elapsed);
      }
      const nextFrame=actor.dataset.assetPath || actor.src;
      if(frameKey!==nextFrame){
        const ctx=surface.getContext('2d');ctx.clearRect(0,0,width,height);ctx.drawImage(actor,0,0);
        ctx.globalCompositeOperation='destination-in';ctx.drawImage(mask,0,0);ctx.globalCompositeOperation='source-over';
        surface.dataset.revision=String(Number(surface.dataset.revision||0)+1);frameKey=nextFrame;stats.frames++;
      }
      return surface;
    }
    document.addEventListener('visibilitychange',()=>document.hidden?dispose():sync());
    global.addEventListener('pagehide',dispose);global.addEventListener('pageshow',()=>sync());
    return {sync,dispose,get surface(){return surface?.isConnected?surface:null;},get shadowFilter(){return shadowFilter;},get actorDepth(){return actorDepth;},snapshot:()=>({...stats,worldSize:extent,active:!!depth,ready:!!depth,error,maskBytes:surface?surface.width*surface.height*12:0,bytes:(surface?surface.width*surface.height*12:0)+(depth?.data.byteLength||0)})};
  }
  global.AtlasPlayerDepth={create};
})(window);
