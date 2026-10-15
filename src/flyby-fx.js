(function(global){
  'use strict';
  const effects=global.AtlasSceneEffects;
  const PRESETS=['blue-thruster','jetwash','orange-yellow-thruster','blue-white-spotlight','blue-light','green-light','orange-light','red-light'];
  const clone=value=>JSON.parse(JSON.stringify(value));
  const cache=new Map();
  const eligible=config=>{
    const frames=global.AtlasAmbientSystem.framesFor(config);
    return frames.length===1 && global.AtlasAmbientSystem.playbackFor(config)==='static' && /^assets\/ambient\/(?:flybys|exit)\/.+\/[^/]+\.png$/i.test(frames[0]);
  };
  const pathFor=sprite=>sprite.slice(0,sprite.lastIndexOf('/')+1)+'fx.json';
  function empty(sprite,width,height){return {version:1,sprite:sprite.split('/').at(-1),sourceSize:{width,height},effects:[]};}
  function bounds(r){
    const g=r.geometry, length=g.length, angle=(g.directionDeg-90)*Math.PI/180;
    if(r.preset.glowStyle==='indicator'){
      const {rx,ry}=effects.indicatorExtent(r),a=g.directionDeg*Math.PI/180;
      const w=Math.abs(rx*Math.cos(a))+Math.abs(ry*Math.sin(a)),h=Math.abs(rx*Math.sin(a))+Math.abs(ry*Math.cos(a));
      const x=Math.floor(g.x-w-4),y=Math.floor(g.y-h-4);
      return {x,y,width:Math.ceil(g.x+w+4-x),height:Math.ceil(g.y+h+4-y)};
    }
    if(r.preset.beamStyle==='searchlight'){
      const halo=g.width*(1.4+r.glow*.6),radius=Math.max(halo,g.width/2+length*Math.tan(g.spreadDeg*Math.PI/360));
      const amplitude=(r.sweepEnabled?r.sweepAmplitude:0)*Math.PI/180,lo=angle-amplitude,hi=angle+amplitude,points=[];
      // Enclose the whole swept rectangle, including extrema between its end
      // poses. Plane dimensions stay fixed throughout preview and gameplay.
      for(const [x,y] of [[-radius,-halo],[radius,-halo],[radius,length],[-radius,length]]){
        const angles=[lo,hi],offset=Math.atan2(y,x);
        for(let k=Math.ceil((lo+offset)/(Math.PI/2));k<=Math.floor((hi+offset)/(Math.PI/2));k++)angles.push(k*Math.PI/2-offset);
        for(const a of angles)points.push({x:g.x+x*Math.cos(a)-y*Math.sin(a),y:g.y+x*Math.sin(a)+y*Math.cos(a)});
      }
      const x=Math.floor(Math.min(...points.map(p=>p.x))-4),y=Math.floor(Math.min(...points.map(p=>p.y))-4);
      return {x,y,width:Math.ceil(Math.max(...points.map(p=>p.x))+4-x),height:Math.ceil(Math.max(...points.map(p=>p.y))+4-y)};
    }
    const radius=r.preset.propulsion==='jet'?Math.max(g.width*3,g.width*r.size)+r.softness*3:Math.max(g.width*2,(g.width*.8+length*Math.tan(g.spreadDeg*Math.PI/360)*r.plumeExpansion)*r.size*(1.6+.22*r.turbulence));
    const corners=[[-radius,-radius],[radius,-radius],[radius,length+radius],[-radius,length+radius]].map(([x,y])=>({x:g.x+x*Math.cos(angle)-y*Math.sin(angle),y:g.y+x*Math.sin(angle)+y*Math.cos(angle)}));
    const x=Math.floor(Math.min(...corners.map(p=>p.x))-4),y=Math.floor(Math.min(...corners.map(p=>p.y))-4);
    return {x,y,width:Math.ceil(Math.max(...corners.map(p=>p.x))+4-x),height:Math.ceil(Math.max(...corners.map(p=>p.y))+4-y)};
  }
  function union(items){
    if(!items.length)return {x:0,y:0,width:1,height:1};
    const x=Math.min(...items.map(b=>b.x)),y=Math.min(...items.map(b=>b.y));
    return {x,y,width:Math.max(...items.map(b=>b.x+b.width))-x,height:Math.max(...items.map(b=>b.y+b.height))-y};
  }
  function validate(doc,sprite,size){
    const errors=[];
    if(!doc||doc.version!==1)return ['Unsupported Flyby FX document version.'];
    if(doc.sprite!==sprite.split('/').at(-1))errors.push('FX sprite identity does not match.');
    if(!doc.sourceSize||doc.sourceSize.width!==size.width||doc.sourceSize.height!==size.height)errors.push('FX source dimensions do not match the PNG.');
    if(!Array.isArray(doc.effects)||doc.effects.length>16)return [...errors,'FX must contain at most 16 effects.'];
    const ids=new Set(),extents=[];
    for(const effect of doc.effects){
      if(!effect||!PRESETS.includes(effect.presetId)){errors.push('Unsupported attached preset.');continue;}
      errors.push(...effects.validateInstance(effect,{}, {ids}).errors);ids.add(effect.id);
      if(!['behind','front'].includes(effect.plane))errors.push('FX plane must be behind or front.');
      if(effect.groupId||effect.layerSlot)errors.push('Attached FX cannot use world groups or layers.');
      const g=effect.geometry;
      if(effects.presetById(effect.presetId).glowStyle==='indicator'){
        if(!g||g.width>800||g.height>800||Math.abs(g.x)>8192||Math.abs(g.y)>8192||!Number.isFinite(g.directionDeg)||Math.abs(g.directionDeg)>360)errors.push('Indicator geometry is out of range.');
      }else if(!g||!Number.isFinite(g.length)||g.length<1||g.length>1200||Math.abs(g.x)>8192||Math.abs(g.y)>8192||g.width>800||g.spreadDeg>120)errors.push('Attached emitter geometry is out of range.');
      if(effect.mask && JSON.stringify(effect.mask).length>32000)errors.push('Mask is too complex.');
      if(!errors.length)extents.push(bounds(effects.resolve(effect,{})));
    }
    for(const plane of ['behind','front']){
      const box=union(extents.filter((_,i)=>doc.effects[i]?.plane===plane));
      if(box.width>4096||box.height>4096||box.width*box.height>4000000)errors.push('FX surface exceeds the 4 MP / 4096 px budget. Reduce geometry, size or spread.');
    }
    return errors;
  }
  async function load(config,image){
    if(!eligible(config)||!global.fetch)return null;
    const sprite=global.AtlasAmbientSystem.framesFor(config)[0],path=pathFor(sprite);
    if(!cache.has(path))cache.set(path,global.fetch(path,{cache:'no-store'}).then(async response=>{
      if(response.status===404||response.status===204)return null;
      if(!response.ok)throw new Error(`FX request failed (${response.status})`);
      return response.json();
    }).catch(error=>{cache.delete(path);throw error;}));
    const doc=await cache.get(path);if(!doc)return null;
    const errors=validate(doc,sprite,{width:image.naturalWidth,height:image.naturalHeight});
    if(errors.length)throw new Error(errors.join(' '));
    return doc;
  }
  function create(doc,options={}){
    const quality=options.quality||effects.detectQuality();
    const reducedMotion=options.reducedMotion??global.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const resolved=doc.effects.filter(e=>e.enabled!==false&&(!options.isolate||e.id===options.isolate)).map(e=>effects.resolve(e,{}, {quality,reducedMotion}));
    const planes=['behind','front'].map(plane=>{
      const items=resolved.filter(r=>r.instance.plane===plane),box=union(items.map(bounds));
      // The shared mask painter expects an include contour. A cutout-only
      // attachment includes its whole cropped plane, in source coordinates.
      for(const r of items)if(r.mask&&!r.mask.includes.length)r.mask.includes=[[{x:box.x,y:box.y},{x:box.x+box.width,y:box.y},{x:box.x+box.width,y:box.y+box.height},{x:box.x,y:box.y+box.height}]];
      const canvas=document.createElement('canvas');canvas.width=box.width;canvas.height=box.height;
      return {plane,items,box,canvas};
    });
    let last=-Infinity;
    return {
      planes,quality,
      draw(time,force=false){
        const frame=Math.floor(time*effects.QUALITY[quality].updateFps);
        if(!force&&frame===last)return false;last=frame;
        for(const p of planes){const ctx=p.canvas.getContext('2d');ctx.setTransform(1,0,0,1,0,0);ctx.clearRect(0,0,p.canvas.width,p.canvas.height);ctx.translate(-p.box.x,-p.box.y);p.items.forEach(r=>effects.drawResolved(ctx,r,time));}
        return true;
      },
      dispose(){for(const r of resolved){for(const c of [r._maskCanvas,r._searchlightCanvas,...(r._vapor||[]),...(r._vaporTint||[]).flat()].filter(Boolean))c.width=c.height=0;delete r._maskCanvas;delete r._searchlightCanvas;delete r._vapor;delete r._vaporTint;}for(const p of planes){p.canvas.width=p.canvas.height=0;if(p.mask)p.mask.width=p.mask.height=0;p.maskPixels=null;p.items.length=0;}resolved.length=0;}
    };
  }
  global.AtlasFlybyFX={PRESETS,empty,clone,bounds,union,validate,eligible,pathFor,load,create,invalidate(sprite){cache.delete(pathFor(sprite));},clearCache(){cache.clear();}};
})(typeof window==='undefined'?globalThis:window);
