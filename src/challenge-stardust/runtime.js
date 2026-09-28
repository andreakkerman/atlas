import {createWebGPU} from './webgpu.js';

// Uses the production overlay's scheduler, world transform and sprite-alpha mask.
// The GPU renders particles/bloom; Canvas only composites the finished GPU frame.
export function createRuntime(notify) {
  const canvas=document.createElement('canvas');
  const gpu=createWebGPU(canvas,notify);
  gpu.select('webgpu');
  return {
    paint(ctx,s,scene,sequence,clock) {
      if(scene.anchors.length>64) {notify('Canvas fallback · too many challenge anchors');return false;}
      const progress=sequence&&sequence.age<sequence.duration?sequence.age/sequence.duration:-1;
      const anchors=scene.anchors.map(a=>[a.x,a.y,
        sequence?.runeId===a.id&&sequence.releaseMarker&&progress>=0?progress:
        a.idleMarker!==false&&!scene.completed.has(a.id)?-1:2,
        a.highlight?s.marker.highlight:1]);
      const rendered=gpu.render({s,idle:clock,t:sequence?.age||0,anchors,
        source:sequence?.origin||scene.player,target:scene.player,bend:sequence?.bend||scene.player,
        progress,exit:scene.exit?clock:null,exitAnchor:scene.exit||[0,0],
        world:[scene.world.width,scene.world.height],dimensions:[ctx.canvas.width,ctx.canvas.height]});
      if(!rendered)return false;
      ctx.save();
      ctx.drawImage(canvas,0,0,scene.world.width,scene.world.height);
      if(scene.occluder){const o=scene.occluder;ctx.globalCompositeOperation='destination-out';ctx.drawImage(o.image,o.x,o.y,o.width,o.height);}
      ctx.restore();
      return true;
    },
    dispose:()=>gpu.dispose(),
    snapshot:()=>gpu.inspect(),
    readback:region=>gpu.readback(region)
  };
}
