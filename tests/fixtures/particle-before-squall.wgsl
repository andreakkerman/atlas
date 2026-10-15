@vertex fn particle(@builtin(vertex_index) vertex:u32,@builtin(instance_index) id:u32) -> ParticleVertex {
  let e=effects[u32(d.flags.x)];let seed=id+u32(e.v[0].w)*65537u;let life=e.v[4].w;
  let age=fract(g.v[1].y/life+randomIndex(seed*3u+2u))*life;let phase=age/life;
  let random=vec2f(randomIndex(seed*3u),randomIndex(seed*3u+1u));
  let velocity=vec2f(cos(e.v[8].x),sin(e.v[8].x))*e.v[4].y*mix(1.0,0.5+random.x,e.v[5].w)+vec2f(e.v[7].x,0);
  let swirl=vec2f(noise(vec2f(random.x*64.0,age*0.2)),noise(vec2f(age*0.2,random.y*64.0+9.0)))-0.5;
  let travel=velocity*age+vec2f(0,0.5*e.v[5].z*age*age)+swirl*e.v[4].z*50.0;
  // Spawn and wrap in the same local rectangle used by region() and editor
  // handles. Motion stays in world space; only the wrapping basis is rotated.
  let localTravel=rotate(travel,e.v[3].x);
  let distributed=(fract(random+localTravel/e.v[1].zw)-0.5)*e.v[1].zw;
  let offsetFromSource=(random-0.5)*e.v[1].zw*0.08+localTravel;
  var p=e.v[1].xy+rotate(select(distributed,offsetFromSource,e.v[7].w>0.5),-e.v[3].x);
  // Optional spatial flow: nearby flakes share the same bends and two broad
  // counter-rotating eddies. Analytic deformation, not integrated simulation;
  // camera-independent, bounded, and evaluated only for opted-in fields.
  if(e.v[8].y>0.0){
    let strength=e.v[8].y;let t=g.v[1].y;let q=rotate(p-e.v[1].xy,e.v[3].x);
    // Taper before the wrap boundary so region wrapping cannot expose a seam.
    let edge=1.0-smoothstep(0.30,0.49,max(abs(q.x)/e.v[1].z,abs(q.y)/e.v[1].w));
    let lane=sin(p.y*0.009-t*0.65)+0.35*sin(p.y*0.017+t*0.31);
    var flow=vec2f(lane*42.0,sin(p.x*0.006-t*0.43)*24.0)*strength;
    for(var cell=0u;cell<2u;cell++){
      let phase=f32(cell)*3.1;
      let center=e.v[1].xy+vec2f((f32(cell)-0.5)*e.v[1].z*0.38+sin(t*0.17+phase)*65.0,sin(t*0.23+phase)*e.v[1].w*0.16);
      let delta=p-center;let r2=dot(delta,delta)/(180.0*180.0);
      let angle=select(1.0,-1.0,cell==1u)*(0.7+0.3*sin(t*0.57+phase))*strength/(1.0+r2*r2);
      flow+=rotate(delta,angle)-delta;
    }
    p+=flow*edge;
  }
  let corners=array<vec2f,6>(vec2f(-1,-1),vec2f(1,-1),vec2f(-1,1),vec2f(-1,1),vec2f(1,-1),vec2f(1,1));let uv=corners[vertex];
  let z=clamp(e.v[6].x+(random.y-0.5)*e.v[6].w,0.0,1.0);
  // Size is a world-space radius, independent of emission, DPR and target scale.
  // Source emitters favor tiny sparks, with a sparse larger tail. Volume presets
  // retain their established distribution (including pollen).
  let variation=select(0.3+random.y,0.2+pow(random.y,3.0)*1.3,e.v[7].w>0.5);
  let radius=e.v[3].z*mix(1.0,variation,e.v[3].w)*mix(0.6,1.2,z);
  let direction=normalize(velocity+vec2f(0.001,0.001));let offset=(vec2f(-direction.y,direction.x)*uv.x+direction*uv.y*e.v[7].y)*radius;
  let screen=vec2f((p.x-g.v[0].z)/g.v[0].w,p.y/g.v[1].x)+offset/vec2f(g.v[0].w,g.v[1].x);
  var out:ParticleVertex;out.position=vec4f(screen*vec2f(2,-2)+vec2f(-1,1),0,1);out.uv=uv;
  out.worldPoint=p+offset;out.distance=z;
  let pulse=1.0-e.v[7].z*(0.5+0.5*sin(g.v[1].y*1.6+random.x*6.28));
  out.color=vec4f(e.v[2].rgb*(1.0+e.v[5].y),e.v[5].x*smoothstep(0.0,0.15,phase)*(1.0-smoothstep(0.65,1.0,phase))*region(e,p)*pulse);return out;
}
