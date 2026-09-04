(function (global) {
  "use strict";
  const shared = /* wgsl */ `
struct Globals { v: array<vec4f, 32> }
struct Effect { v: array<vec4f, 16> }
struct Draw { rect: vec4f, uv: vec4f, flags: vec4f, appearance: vec4f, extra: vec4f }
@group(0) @binding(0) var<uniform> g: Globals;
@group(0) @binding(1) var<storage, read> effects: array<Effect>;
@group(0) @binding(2) var<storage, read> exposure: array<f32>;
@group(0) @binding(3) var sceneDepth: texture_2d<f32>;
@group(0) @binding(4) var depthSampler: sampler;
@group(1) @binding(0) var source: texture_2d<f32>;
@group(1) @binding(1) var linearSampler: sampler;
@group(1) @binding(2) var auxiliary: texture_2d<f32>;
@group(1) @binding(3) var<uniform> d: Draw;
struct Vertex { @builtin(position) position: vec4f, @location(0) uv: vec2f }
fn luminance(c: vec3f) -> f32 { return dot(c, vec3f(0.2126, 0.7152, 0.0722)); }
fn toLinear(c: vec3f) -> vec3f { return select(c / 12.92, pow(max((c + 0.055) / 1.055, vec3f(0)), vec3f(2.4)), c > vec3f(0.04045)); }
fn toSRGB(c: vec3f) -> vec3f { return select(c * 12.92, 1.055 * pow(max(c, vec3f(0)), vec3f(1.0/2.4)) - 0.055, c > vec3f(0.0031308)); }
fn hash(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn noise(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p); let u = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2f(1,0)),u.x), mix(hash(i+vec2f(0,1)),hash(i+1.0),u.x),u.y);
}
fn fbm(p0: vec2f, detail: f32) -> f32 {
  var p = p0; var sum = 0.0; var weight = 0.5; var total = 0.0;
  for(var j=0u; j<5u; j++) { if(f32(j)>=detail){break;} sum += noise(p)*weight; total+=weight; p=mat2x2f(0.8,0.6,-0.6,0.8)*p*2.03+vec2f(19.1,7.7); weight*=0.5; }
  return sum / max(total,0.01);
}
fn world(uv: vec2f) -> vec2f { return vec2f(g.v[0].z + uv.x*g.v[0].w, uv.y*g.v[1].x); }
fn viewportUV(p: vec2f) -> vec2f { return vec2f((p.x-g.v[0].z)/g.v[0].w,p.y/g.v[1].x); }
// Authored distance guidance, black far / white near. Fixed world-space taps
// avoid screen-space crawling when the camera moves. No temporal jitter.
fn depthAt(p:vec2f) -> f32 {
  if(g.v[18].x<0.5){return 0.5;}
  let uv=p/vec2f(g.v[2].x,g.v[1].x);let r=g.v[18].y/vec2f(textureDimensions(sceneDepth));
  return textureSampleLevel(sceneDepth,depthSampler,uv,0).r*0.4+
    (textureSampleLevel(sceneDepth,depthSampler,uv+vec2f(r.x,0),0).r+textureSampleLevel(sceneDepth,depthSampler,uv-vec2f(r.x,0),0).r+
     textureSampleLevel(sceneDepth,depthSampler,uv+vec2f(0,r.y),0).r+textureSampleLevel(sceneDepth,depthSampler,uv-vec2f(0,r.y),0).r)*0.15;
}
fn visibility(e:Effect,z:f32) -> f32 {
  let soft=e.v[6].z;
  return mix(1.0,1.0-smoothstep(e.v[6].x-soft,e.v[6].x+soft,z),e.v[6].y*g.v[18].x);
}
// Local effects live on the painted plane under their authoring handle. This
// keeps a foreground rune or mist pocket from being compared to a fixed rear
// depth. The small artist bias is useful only when the source sits on an edge.
fn placedVisibility(e:Effect,z:f32) -> f32 {
  let soft=e.v[6].z;let placed=clamp(depthAt(e.v[1].xy)+e.v[6].w,0.0,1.0);
  return mix(1.0,1.0-smoothstep(placed-soft,placed+soft,z),e.v[6].y*g.v[18].x);
}
// One authored God Ray volume travels through three overlapping scene-depth
// ranges. The low-weight near range lets light live between forest layers
// without washing through the closest silhouettes.
fn layeredRayVisibility(e:Effect,z:f32) -> f32 {
  let soft=e.v[6].z;let reach=max(0.22,soft*2.4);let center=e.v[6].x;
  let farDepth=clamp(center-reach,0.04,0.9);let nearDepth=clamp(center+reach,0.1,0.96);
  let far=1.0-smoothstep(farDepth-soft,farDepth+soft,z);
  let middle=1.0-smoothstep(center-soft,center+soft,z);
  let near=1.0-smoothstep(nearDepth-soft,nearDepth+soft,z);
  let layered=far*0.30+middle*0.62+near*0.08;
  return mix(1.0,layered,e.v[6].y*g.v[18].x);
}
fn rotate(p: vec2f, angle: f32) -> vec2f { return vec2f(cos(angle)*p.x+sin(angle)*p.y,-sin(angle)*p.x+cos(angle)*p.y); }
fn temporal(e: Effect) -> f32 {
  let t = g.v[1].y * e.v[4].y; let seed = e.v[0].w;
  var variation = 0.0;
  if(e.v[4].w==1.0) { let slow=noise(vec2f(t*2.1,seed+41.0)); let erratic=noise(vec2f(t*7.0,seed))*0.65+noise(vec2f(t*17.3,seed+13.0))*0.35; variation=mix(slow,erratic,e.v[4].z)*2.0-1.0; }
  if(e.v[4].w==2.0) { variation = sin(t*1.5)*0.5; }
  if(e.v[4].w==3.0) { variation = pow(max(0.0,sin(t*1.3+noise(vec2f(t*0.23,seed))*e.v[4].z*4.0)),4.0)*1.8-0.5; }
  return max(0.0,1.0+variation*e.v[4].x);
}
fn region(e: Effect, p: vec2f) -> f32 {
  let q=rotate(p-e.v[1].xy,e.v[3].x)/max(e.v[1].zw,vec2f(1));
  var distance = length(q*2.0);
  if(e.v[0].z==1.0) {distance=max(abs(q.x),abs(q.y))*2.0;}
  if(e.v[0].z==2.0) {
    var inside=false; var edge=100.0; let count=u32(e.v[10].x);
    for(var i=0u;i<count;i++) { let a=e.v[11u+i/2u]; let b=e.v[11u+((i+1u)%count)/2u]; let va=select(a.xy,a.zw,i%2u==1u); let vb=select(b.xy,b.zw,((i+1u)%count)%2u==1u);
      let segment=vb-va; edge=min(edge,length(q-va-segment*clamp(dot(q-va,segment)/max(dot(segment,segment),0.00001),0.0,1.0)));
      if((va.y>q.y)!=(vb.y>q.y)) { if(q.x<(vb.x-va.x)*(q.y-va.y)/(vb.y-va.y)+va.x) {inside=!inside;} }
    }
    return select(0.0,smoothstep(0.0,max(0.005,e.v[3].y*0.3),edge),inside);
  }
  return 1.0-smoothstep(1.0-e.v[3].y,1.0,distance);
}
fn lightWeight(e: Effect,p: vec2f) -> f32 {
  if(e.v[0].x==1.0) {
    let delta=(p-e.v[1].xy)/vec2f(e.v[1].z*e.v[1].w,e.v[1].z);
    let r=length(delta); let edge=1.0-smoothstep(1.0-e.v[3].y*0.6,1.0,r);
    return edge / pow(1.0+8.0*r*r,e.v[3].z)*e.v[2].w*temporal(e);
  }
  if(e.v[0].x==2.0) {
    let q=rotate(p-e.v[1].xy,e.v[3].x)/e.v[1].zw;
    return region(e,p)*pow(clamp(0.8-q.y*0.5,0.0,1.0),e.v[3].z)*e.v[2].w;
  }
  return 0.0;
}
fn lights(p: vec2f, influence: u32,z:f32) -> vec3f {
  var result=vec3f(0);
  for(var i=0u;i<u32(g.v[1].z);i++) {let e=effects[i]; if(e.v[0].y==0.0 || e.v[0].x>2.0){continue;}
    var weight=lightWeight(e,p)*select(visibility(e,z),placedVisibility(e,z),e.v[0].x==1.0); var spill=1.0;
    if(e.v[0].x==1.0){spill=e.v[5].x; if(influence==1u){weight*=e.v[5].y;} if(influence==2u){weight*=e.v[5].z;}}
    if(influence==1u){weight*=select(g.v[8].y,g.v[7].z,e.v[0].x==1.0);}
    result+=mix(vec3f(luminance(e.v[2].rgb)),e.v[2].rgb,spill)*weight;
  }
  return result;
}
fn shaft(e: Effect,p: vec2f,z:f32) -> vec3f {
  let q=rotate(p-e.v[1].xy,e.v[3].x); let along=q.x/max(e.v[1].z,1.0);
  let spread=e.v[1].w*(0.18+max(0.0,along)*0.82);
  let edge=1.0-smoothstep(1.0-e.v[3].y,1.0,abs(q.y)/max(spread,1.0));
  let breakup=fbm(vec2f(q.y*0.018*e.v[4].y,along*2.0-g.v[1].y*e.v[4].z),3.0);
  let density=mix(1.0,breakup,e.v[4].x);
  let weight=edge*smoothstep(0.0,0.04,along)*(1.0-smoothstep(0.7,1.0,along))*exp(-max(along,0.0)*e.v[3].w)*e.v[3].z*density;
  return e.v[2].rgb*e.v[2].w*weight*visibility(e,z);
}
// A source-centered angular family, not a cone with noise painted over it.
// Only the nearest three angular cells are evaluated, independent of ray count.
fn godRay(e:Effect,p:vec2f,z:f32) -> vec3f {
  let q=rotate(p-e.v[1].xy,e.v[3].x);let distance=length(q);let along=distance/e.v[1].z;
  let angle=atan2(q.y,q.x);let cell=e.v[5].x/e.v[5].y;
  let coordinate=(angle+e.v[5].x*0.5)/cell;let nearest=floor(coordinate);
  var family=0.0;
  for(var j=-1;j<=1;j++) {
    let index=nearest+f32(j);if(index<0.0 || index>=e.v[5].y){continue;}
    let seed=vec2f(index+e.v[0].w*17.0,31.7);
    let phase=g.v[1].y*e.v[7].w+hash(seed+vec2f(3.1,9.7))*6.2831853;
    let motion=e.v[7].z;
    let center=index+0.5+(hash(seed)-0.5)*e.v[7].x*0.65+sin(phase*0.71)*motion*0.025;
    let width=e.v[5].z*mix(1.0,0.35+hash(seed+8.0)*0.9,e.v[5].w)*(1.0+sin(phase*0.83+1.2)*motion*0.04);
    let transverse=abs(coordinate-center)/max(width,0.01);
    let strand=1.0-smoothstep(1.0-e.v[3].y,1.0,transverse);
    let drift=g.v[1].y*e.v[4].z*motion*0.25;
    let patches=noise(vec2f(index*3.7+12.0,along*7.0*e.v[4].y-drift));
    let fine=noise(vec2f(coordinate*8.0,along*20.0-drift*0.5));
    let fade=1.0+sin(phase)*e.v[8].y*motion*0.45;
    family+=strand*mix(1.0,0.2+patches*1.1,e.v[4].w)*mix(1.0,0.65+fine*0.5,e.v[4].x)*fade;
  }
  let envelope=smoothstep(0.0,0.025,along)*(1.0-smoothstep(1.0-e.v[7].y,1.0,along))*exp(-along*e.v[3].w);
  return toLinear(e.v[2].rgb)*e.v[2].w*family*envelope*layeredRayVisibility(e,z);
}
fn rayField(p:vec2f,z:f32) -> vec3f {
  var result=vec3f(0);
  for(var i=0u;i<u32(g.v[1].z);i++){let e=effects[i];if(e.v[0].y==0.0){continue;}if(e.v[0].x==6.0){result+=godRay(e,p,z);}if(e.v[0].x==3.0){result+=shaft(e,p,z);}}
  return result;
}
// The artwork remains spatially immutable. A single organic light field
// evolves across wave detail, clipped by the authored region and scene depth.
fn paintedWaveStructure(p:vec2f,sampleRadius:f32) -> vec2f {
  // Read the immutable full level artwork directly. Sampling the source target here used
  // to inspect the already camera-cropped intermediate target, so fractional
  // camera motion filtered the painting twice and made fine wave guidance pulse.
  let sceneSize=vec2f(g.v[2].x,g.v[1].x);
  let delta=vec2f(max(sampleRadius,1.0),0.0);
  let left=luminance(toLinear(textureSampleLevel(auxiliary,linearSampler,clamp((p-delta)/sceneSize,vec2f(0),vec2f(1)),0).rgb));
  let right=luminance(toLinear(textureSampleLevel(auxiliary,linearSampler,clamp((p+delta)/sceneSize,vec2f(0),vec2f(1)),0).rgb));
  let up=luminance(toLinear(textureSampleLevel(auxiliary,linearSampler,clamp((p-delta.yx)/sceneSize,vec2f(0),vec2f(1)),0).rgb));
  let down=luminance(toLinear(textureSampleLevel(auxiliary,linearSampler,clamp((p+delta.yx)/sceneSize,vec2f(0),vec2f(1)),0).rgb));
  let farDelta=delta.yx*2.7;
  let farUp=luminance(toLinear(textureSampleLevel(auxiliary,linearSampler,clamp((p-farDelta)/sceneSize,vec2f(0),vec2f(1)),0).rgb));
  let farDown=luminance(toLinear(textureSampleLevel(auxiliary,linearSampler,clamp((p+farDelta)/sceneSize,vec2f(0),vec2f(1)),0).rgb));
  let center=luminance(toLinear(textureSampleLevel(auxiliary,linearSampler,clamp(p/sceneSize,vec2f(0),vec2f(1)),0).rgb));
  let localMean=(left+right+up+down)*0.25;let verticalMean=(farUp+farDown)*0.5;
  let brightRidge=max(center-localMean,0.0)*7.5+max(center-verticalMean,0.0)*4.0;
  let darkTrough=max(localMean-center,0.0)*5.2+max(verticalMean-center,0.0)*2.8;
  let waveEdge=abs(up-down)*1.35+abs(farUp-farDown)*0.55;
  let horizontalContinuity=1.0-smoothstep(0.08,0.3,abs(left-right));
  let continuity=mix(0.62,1.0,horizontalContinuity);
  let brightStructure=clamp((brightRidge+waveEdge)*continuity,0.0,1.0);
  let darkStructure=clamp((darkTrough+waveEdge*0.72)*continuity,0.0,1.0);
  return vec2f(brightStructure,darkStructure);
}
fn organicSpecularField(q:vec2f,t:f32,size:f32,anisotropy:f32,coverage:f32,softness:f32,seed:f32) -> vec2f {
  let scale=max(size,2.0);let coordinate=vec2f(q.x/(scale*max(anisotropy,1.0)),q.y/scale);
  let slowWarp=vec2f(noise(coordinate*0.37+vec2f(seed,13.7)),noise(coordinate.yx*0.31+vec2f(41.3,seed)))-0.5;
  let phaseA=vec2f(sin(t*0.37+seed),cos(t*0.29+seed*1.7))*0.82;
  let phaseB=vec2f(cos(t*0.23-seed*0.7),sin(t*0.41+seed))*0.71;
  let fieldA=fbm(coordinate+slowWarp*0.9+phaseA,4.0);
  let fieldB=fbm(mat2x2f(0.86,0.28,-0.22,1.08)*coordinate*1.63-slowWarp*0.55+phaseB,3.0);
  let ridgeA=1.0-abs(fieldA*2.0-1.0);let ridgeB=1.0-abs(fieldB*2.0-1.0);
  let localPhase=noise(coordinate*0.43+vec2f(seed*2.1,seed*5.7))*6.2831853;
  let morph=sin(t*0.61+localPhase)*0.5+0.5;
  let merged=max(ridgeA*mix(0.48,1.0,morph),ridgeB*mix(1.0,0.42,morph));
  let clusterCoordinate=coordinate*0.19+slowWarp*0.18;
  let clusterPhase=vec2f(sin(t*0.11+seed*0.31),cos(t*0.09-seed*0.27))*0.38;
  let clusterA=fbm(clusterCoordinate+clusterPhase+vec2f(seed*0.17,5.9),4.0);
  let clusterB=fbm(mat2x2f(0.73,0.41,-0.36,0.92)*clusterCoordinate-clusterPhase*0.63+vec2f(9.7,seed*0.11),3.0);
  let clusterMorph=sin(t*0.17+localPhase*0.29)*0.5+0.5;
  let clusterRaw=mix(clusterA,clusterB,clusterMorph);
  let coverageN=clamp(coverage,0.0,1.0);let coverageFloor=pow(coverageN,1.45);
  let clusterThreshold=0.56;let clusterFeather=max(0.06,softness*1.4);
  let clusterEnvelope=smoothstep(clusterThreshold-clusterFeather,clusterThreshold+clusterFeather*1.35,clusterRaw);
  let ridgeThreshold=0.77;
  let ridgeActivity=smoothstep(ridgeThreshold-softness,ridgeThreshold+softness,merged);
  let eventNoise=noise(coordinate*0.48+slowWarp*0.7+vec2f(seed*0.43,seed*0.19));
  let eventPhase=sin(t*mix(0.68,1.21,eventNoise)+localPhase+eventNoise*4.8)*0.5+0.5;
  let temporalPeak=smoothstep(0.72,0.98,eventPhase);
  let baseShimmer=ridgeActivity*coverageFloor*mix(0.34,0.72,temporalPeak);
  let localShimmer=ridgeActivity*clusterEnvelope*mix(0.25,1.0,temporalPeak);
  let activity=clamp(baseShimmer+localShimmer*(1.0-coverageFloor*0.35),0.0,1.0);
  let convergence=pow(clamp(ridgeA*ridgeB,0.0,1.0),1.35);
  let peakAvailability=mix(pow(clusterEnvelope,1.4),mix(0.2,1.0,clusterEnvelope),coverageFloor);
  let rarePeak=smoothstep(0.5,0.86,convergence*mix(0.7,1.35,temporalPeak))*peakAvailability;
  return vec2f(activity,rarePeak);
}
fn waterSurface(e:Effect,p:vec2f,z:f32,painted:vec3f) -> vec3f {
  let allowed=region(e,p)*visibility(e,z);
  if(allowed<=0.0001){return painted;}
  let q=rotate(p-e.v[1].xy,e.v[5].w);let time=g.v[1].y*e.v[5].y;
  let field=organicSpecularField(q,time,e.v[4].z,e.v[4].w,e.v[4].y,e.v[5].x,e.v[0].w+17.0);
  let waveStructure=paintedWaveStructure(p,max(1.0,e.v[4].z*0.22));let waveGuide=waveStructure.x;let waveMask=smoothstep(0.24,0.82,waveGuide);
  let contrastN=clamp((e.v[5].z-0.25)/4.75,0.0,1.0);
  let subtle=pow(clamp(field.x*waveMask,0.0,1.0),mix(1.25,2.8,contrastN));
  let rarePeak=pow(clamp(field.y*waveMask,0.0,1.0),mix(2.35,1.15,contrastN));
  let darkEligibility=1.0-smoothstep(0.12,0.48,luminance(painted));
  let darkWaveMask=darkEligibility*smoothstep(0.08,0.62,waveStructure.y);
  let darkShimmer=pow(clamp(field.x*darkWaveMask,0.0,1.0),mix(3.1,4.0,contrastN));
  let darkPeak=pow(clamp(field.y*darkWaveMask,0.0,1.0),mix(2.2,1.45,contrastN));
  let highlightColor=mix(toLinear(e.v[2].rgb),vec3f(1.0),clamp(waveGuide*0.52+contrastN*0.18,0.0,0.82));
  let peakColor=mix(highlightColor,vec3f(1.0),0.9);
  let darkHighlightColor=mix(toLinear(e.v[2].rgb),vec3f(1.0),0.58);
  return painted+allowed*e.v[4].x*(highlightColor*subtle*mix(0.15,0.28,contrastN)+peakColor*rarePeak*mix(0.5,0.95,contrastN)+darkHighlightColor*darkShimmer*mix(0.08,0.14,contrastN)+peakColor*darkPeak*mix(0.38,0.68,contrastN));
}
// A discrete world-space specular population. Candidate positions never move;
// only their independent optical response evolves, so camera motion cannot make
// the sparkle field swim over the painting.
fn waterSparkles(e:Effect,p:vec2f,z:f32,painted:vec3f) -> vec3f {
  let allowed=region(e,p)*visibility(e,z);
  if(allowed<=0.0001){return painted;}
  let q=rotate(p-e.v[1].xy,e.v[3].x);let size=max(e.v[4].z,0.5);let cellSpan=max(3.2,size*4.0);let baseCell=floor(q/cellSpan);
  let seed=e.v[0].w*19.73+31.7;let time=g.v[1].y*e.v[5].x;
  var regular=0.0;var peaks=0.0;
  for(var oy=-1;oy<=1;oy++) { for(var ox=-1;ox<=1;ox++) {
    let cell=baseCell+vec2f(f32(ox),f32(oy));
    let randomA=hash(cell+vec2f(seed,seed*0.37));let randomB=hash(cell.yx+vec2f(seed*1.91,7.3));
    let randomC=hash(cell*2.17+vec2f(3.1,seed*0.73));let randomD=hash(cell*0.83+vec2f(seed*0.29,17.9));
    let cluster=fbm(cell*cellSpan/max(e.v[5].z,20.0)+vec2f(seed*0.013,seed*0.031),3.0);
    let clusterWeight=smoothstep(0.42,0.62,cluster);
    let availability=mix(1.0,mix(0.02,2.38,clusterWeight),e.v[5].w);
    if(randomA>clamp(e.v[4].y*availability,0.0,0.96)){continue;}
    let center=(cell+vec2f(0.03+randomB*0.94,0.03+randomC*0.94))*cellSpan;
    let sizeTail=mix(randomD,pow(randomD,2.6),e.v[4].w);
    let radius=size*mix(0.34,1.58,sizeTail);
    let delta=q-center;let aspect=max(e.v[7].y,0.5)*mix(0.82,1.18,randomB);
    let distance=length(delta/vec2f(max(radius*aspect,0.35),max(radius,0.35)));
    let worldPerPixel=max(g.v[0].w/g.v[0].x,g.v[1].x/g.v[0].y);
    let aa=clamp(worldPerPixel/max(radius,0.35)*0.72,0.08,0.48);
    let core=1.0-smoothstep(0.62-aa,1.0+aa,distance);
    let halo=exp(-distance*distance*2.35)*(1.0-smoothstep(1.0,2.35,distance));
    let phase=randomB*6.2831853+randomC*2.7;let rate=mix(0.68,1.58,randomD);
    let waveA=sin(time*rate+phase)*0.5+0.5;let waveB=sin(time*rate*2.31+phase*1.73)*0.5+0.5;
    let varied=pow(waveA,mix(1.8,6.8,e.v[5].y))*mix(0.58,1.0,waveB);let twinkle=mix(0.72,varied,e.v[5].y);
    let rare=smoothstep(0.84,0.985,waveA*mix(0.72,1.0,waveB))*smoothstep(0.38,0.92,randomC);
    let horizontalWing=exp(-abs(delta.x)/max(radius*2.8,0.5))*exp(-abs(delta.y)/max(radius*0.18,0.16));
    let verticalWing=exp(-abs(delta.y)/max(radius*2.0,0.5))*exp(-abs(delta.x)/max(radius*0.16,0.14));
    regular+=(core+halo*0.07)*twinkle;
    peaks+=(core*1.1+(horizontalWing+verticalWing*0.62)*0.22)*rare*mix(0.72,1.28,randomA);
  }}
  let structure=paintedWaveStructure(p,max(1.0,size*0.9));
  let darkEligibility=1.0-smoothstep(0.12,0.48,luminance(painted));
  let paintedGuide=max(structure.x,structure.y*darkEligibility);
  let artworkEmphasis=mix(1.0,mix(0.58,1.5,smoothstep(0.04,0.78,paintedGuide)),e.v[6].w);
  let sparkleColor=mix(toLinear(e.v[2].rgb),vec3f(1.0),0.48);let peakColor=mix(sparkleColor,vec3f(1.0),0.94);
  let contribution=sparkleColor*min(regular,1.6)*0.34+peakColor*min(peaks,1.8)*e.v[7].x*0.36;
  return painted+allowed*e.v[4].x*artworkEmphasis*contribution;
}
fn spriteLight(p:vec2f,center:vec2f,relative:vec2f,z:f32) -> vec3f {
  var result=vec3f(0);
  for(var i=0u;i<u32(g.v[1].z);i++) {
    let e=effects[i];if(e.v[0].y==0.0 || e.v[0].x>2.0){continue;}
    var toward=e.v[1].xy-center;if(e.v[0].x==2.0){toward=-vec2f(cos(e.v[3].x),sin(e.v[3].x));}
    toward/=max(length(toward),0.01);
    let side=mix(1.0,clamp(0.65+dot(relative,toward)*0.9,0.15,1.6),g.v[19].x);
    let strength=select(g.v[8].y,g.v[7].z*e.v[5].y,e.v[0].x==1.0);
    let color=mix(vec3f(luminance(e.v[2].rgb)),e.v[2].rgb,select(1.0,e.v[5].x,e.v[0].x==1.0));
    result+=color*lightWeight(e,p)*select(visibility(e,z),placedVisibility(e,z),e.v[0].x==1.0)*side*strength;
  }
  return result;
}
fn atmosphere(p:vec2f,z:f32) -> vec4f {
  var fogColor=vec3f(0);var optical=0.0;
  for(var i=0u;i<u32(g.v[1].z);i++){let e=effects[i];if(e.v[0].y==0.0 || e.v[0].x!=4.0){continue;}
    let drift=vec2f(cos(e.v[4].y),sin(e.v[4].y))*g.v[1].y*e.v[4].x;
    let q=(p-drift)*0.006*e.v[4].w/max(e.v[3].z,0.1);let warp=vec2f(noise(q*0.6+g.v[1].y*0.017),noise(q*0.7+7.0))*e.v[4].z;
    let distance=pow(1.0-smoothstep(0.0,e.v[7].x,z),e.v[7].z)*e.v[7].y;
    let depthWeight=max(distance,placedVisibility(e,z)*0.85);
    let vertical=clamp(1.0+e.v[7].w*(p.y/g.v[1].x-0.5)*2.0,0.0,2.0);
    let density=region(e,p)*e.v[2].w*smoothstep(0.18,0.85,fbm(q+warp,e.v[5].x))*mix(1.0,depthWeight,e.v[6].y*g.v[18].x)*vertical;
    optical+=density;fogColor+=toLinear(e.v[2].rgb)*density;
  }
  return vec4f(fogColor/max(optical,0.0001),optical);
}
fn groundingShadowExposure(p:vec2f) -> f32 {
  var direct=0.0;
  for(var i=0u;i<u32(g.v[1].z);i++){
    let e=effects[i];if(e.v[0].y==0.0 || e.v[0].x!=2.0){continue;}
    direct=max(direct,lightWeight(e,p));
  }
  return clamp(direct,0.0,1.0);
}
fn projectedSpriteAlpha(uv:vec2f,blurUV:vec2f) -> f32 {
  var mask=0.0;var total=0.0;
  // A compact Gaussian grid diffuses the complete projected alpha. Keeping the
  // taps dense avoids the sparse, fading-only response of the old wide kernel.
  for(var y=-2;y<=2;y++){for(var x=-2;x<=2;x++){
    let q=vec2f(f32(x),f32(y));let weight=exp(-dot(q,q)*0.5);
    let tap=uv+q*blurUV*0.5;let inside=select(0.0,1.0,all(tap>=vec2f(0))&&all(tap<=vec2f(1)));
    mask+=textureSampleLevel(source,linearSampler,clamp(tap,vec2f(0),vec2f(1)),0).a*weight*inside;total+=weight;
  }}
  return mask/total;
}
fn cross2(a:vec2f,b:vec2f) -> f32 { return a.x*b.y-a.y*b.x; }
@vertex fn fullscreen(@builtin(vertex_index) i: u32) -> Vertex {
  let uv=vec2f(f32((i<<1u)&2u),f32(i&2u)); var out:Vertex; out.position=vec4f(uv*vec2f(2,-2)+vec2f(-1,1),0,1);out.uv=uv;return out;
}
@vertex fn quad(@builtin(vertex_index) i:u32) -> Vertex {
  let corners=array<vec2f,6>(vec2f(0,0),vec2f(1,0),vec2f(0,1),vec2f(0,1),vec2f(1,0),vec2f(1,1));
  let uv=corners[i]; var out:Vertex;out.position=vec4f((d.rect.xy+uv*d.rect.zw)*vec2f(2,-2)+vec2f(-1,1),0,1);out.uv=uv;return out;
}
fn appearance(input:vec3f) -> vec3f {
  var c=(input*d.appearance.x-0.5)*d.appearance.y+0.5;
  c=mix(vec3f(dot(c,vec3f(0.213,0.715,0.072))),c,d.appearance.z);
  let sepia=vec3f(dot(c,vec3f(0.393,0.769,0.189)),dot(c,vec3f(0.349,0.686,0.168)),dot(c,vec3f(0.272,0.534,0.131)));
  c=mix(c,sepia,d.appearance.w); let co=cos(d.extra.x);let si=sin(d.extra.x);
  return clamp(vec3f(dot(c,vec3f(0.213+co*0.787-si*0.213,0.715-co*0.715-si*0.715,0.072-co*0.072+si*0.928)),dot(c,vec3f(0.213-co*0.213+si*0.143,0.715+co*0.285+si*0.140,0.072-co*0.072-si*0.283)),dot(c,vec3f(0.213-co*0.213-si*0.787,0.715-co*0.715+si*0.715,0.072+co*0.928+si*0.072))),vec3f(0),vec3f(1));
}
@fragment fn sprite(in:Vertex) -> @location(0) vec4f {
  if(d.flags.w>1.5){
    let size=vec2f(g.v[2].x,g.v[1].x);let p=in.uv*size;let a=d.appearance.xy*size;let b=d.appearance.zw*size;let ab=b-a;let t=clamp(dot(p-a,ab)/max(dot(ab,ab),0.0001),0.0,1.0);let lineDistance=length(p-(a+ab*t));let pointDistance=min(length(p-a),length(p-b));let lineAlpha=1.0-smoothstep(1.0,2.2,lineDistance);let pointAlpha=1.0-smoothstep(3.5,5.5,pointDistance);let alpha=max(lineAlpha,pointAlpha);return vec4f(vec3f(0.02,0.42,1.0)*alpha,alpha);
  }
  if(d.flags.w>0.5){
    var foot=world(d.rect.xy+vec2f(d.rect.z*0.5,d.rect.w*0.5));
    let axis=vec2f(cos(d.appearance.x),sin(d.appearance.x));let side=vec2f(-axis.y,axis.x);let delta=in.uv-vec2f(0.5);
    let along=dot(delta,axis);let across=dot(delta,side);let shadowLength=max(0.035,0.19*d.appearance.y);let width=max(0.018,0.055*g.v[20].z);
    let softness=max(0.0,g.v[20].y);let feather=0.002+min(softness,1.0)*0.053+max(0.0,softness-1.0)*0.035;let shapeKind=g.v[21].x;var metric=2.0;
    if(shapeKind<0.5){
      let t=clamp((along+shadowLength*0.08)/(shadowLength*1.08),0.0,1.0);let taperedWidth=mix(width,width*0.24,t);
      metric=pow(abs(across)/taperedWidth,2.0)+pow(abs((along-shadowLength*0.46)/(shadowLength*0.54)),4.0);
    }else if(shapeKind<1.5){
      let q=vec2f((along-shadowLength*0.38)/(shadowLength*0.62),across/width);metric=dot(q,q);
    }else if(shapeKind<2.5){
      let segment=clamp(along,0.0,shadowLength*0.76);metric=length(vec2f(along-segment,across))/width;
    }else if(shapeKind<3.5){
      let q=vec2f((along-shadowLength*0.25)/(shadowLength*0.72),across/(width*1.55));metric=dot(q,q);
    }
    var silhouette=1.0-smoothstep(1.0-feather*8.0,1.0+feather*8.0,metric);
    if(shapeKind>3.5){
      let screen=g.v[0].xy;let pixel=d.rect.xy*screen+in.uv*d.rect.zw*screen;let leftBase=d.extra.xy*screen;let rightBase=d.extra.zw*screen;let base=rightBase-leftBase;let baseLength=max(length(base),0.5);let baseDirection=base/baseLength;let baseNormal=vec2f(-baseDirection.y,baseDirection.x);let tangent=dot(axis,baseDirection);let normal=dot(axis,baseNormal);let safeNormal=select(-max(abs(normal),0.08),max(abs(normal),0.08),normal>=0.0);let castAxis=normalize(baseDirection*tangent+baseNormal*safeNormal);let castLength=max(1.0,0.46*d.appearance.y*d.appearance.w*d.flags.x);let castVector=castAxis*castLength;let determinant=cross2(base,castVector);let relative=pixel-leftBase;let baseT=cross2(relative,castVector)/determinant;let castHeight=cross2(base,relative)/determinant;let leftU=d.uv.x;let rightU=d.uv.y;var displayU=mix(leftU,rightU,baseT);let authoredWidth=mix(1.0,max(0.25,g.v[20].z),smoothstep(0.0,0.20,castHeight));displayU=d.flags.z+(displayU-d.flags.z)/authoredWidth;let castBottom=mix(d.uv.z,d.uv.w,clamp(baseT,0.0,1.0));let castRawU=select(displayU,1.0-displayU,d.flags.y>0.5);let castUV=vec2f(castRawU,castBottom-castHeight);let blurPixels=softness*1.4;let castBlur=vec2f(blurPixels/max(d.flags.x*d.appearance.z,1.0),blurPixels/max(d.flags.x,1.0));silhouette=projectedSpriteAlpha(castUV,castBlur);foot=world((d.extra.xy+d.extra.zw)*0.5);
    }
    // The auxiliary receiver is the camera-sized scene render target, so sample
    // it in screen UV. Converting through world coordinates would address a
    // different part of this texture whenever the camera moves.
    let receiverUV=d.rect.xy+in.uv*d.rect.zw;
    let receiver=textureSampleLevel(auxiliary,linearSampler,receiverUV,0).rgb;
    // targets[0] is the pre-shadow scene in linear light. Its local luminance is
    // therefore a stable receiver measurement with no shadow feedback.
    let receiverLuminance=luminance(receiver);
    // Strength and Opacity continue to establish the unmodified contribution.
    // Receiver matching only caps that contribution: the smooth mid/dark knee
    // reaches zero near black and leaves linear-light luma >= 0.18 untouched.
    let strength=g.v[20].x;
    let authoredOpacity=1.0-exp(-strength*0.505145);
    let authorIntent=smoothstep(1.0,5.0,strength);
    let minimumLightResponse=mix(0.5,0.8,authorIntent);
    let lightResponse=mix(minimumLightResponse,1.0,smoothstep(0.0,0.18,groundingShadowExposure(foot)));
    // Strength 5 retains the established response. Values up to 10 can continue
    // toward an almost opaque authored maximum instead of being clipped at 5.
    let authoredMaximum=clamp(authoredOpacity*g.v[21].w,0.0,0.99);
    let authoredContribution=authoredMaximum*lightResponse;
    let receiverAllowance=smoothstep(0.02,0.18,receiverLuminance);
    let maxAllowedContribution=authoredContribution*receiverAllowance;
    let matchedContribution=min(authoredContribution,maxAllowedContribution);
    let receiverMatching=smoothstep(0.0,1.0,g.v[21].z);
    let localContribution=mix(authoredContribution,matchedContribution,receiverMatching);
    let alpha=silhouette*localContribution;
    return vec4f(receiver*0.08*alpha,alpha);
  }
  var uv=d.uv.xy+in.uv*d.uv.zw;if(d.flags.y>0.5){uv.x=1.0-uv.x;}
  let sourceInside=select(0.0,1.0,all(uv>=vec2f(0))&&all(uv<=vec2f(1)));
  var sample=textureSampleLevel(source,linearSampler,clamp(uv,vec2f(0),vec2f(1)),0);sample.a*=sourceInside;
  if(d.extra.z>0.0 || d.extra.w>0.0){
    // Preserve authored animal softness without blurring the scene or other sprites.
    var weighted=vec4f(sample.rgb*sample.a,sample.a)*0.4;
    let offsets=array<vec2f,4>(vec2f(d.extra.z,0),vec2f(-d.extra.z,0),vec2f(0,d.extra.w),vec2f(0,-d.extra.w));
    for(var i=0u;i<4u;i++){let s=textureSampleLevel(source,linearSampler,uv+offsets[i],0);weighted+=vec4f(s.rgb*s.a,s.a)*0.15;}
    sample=vec4f(weighted.rgb/max(weighted.a,0.0001),weighted.a);
  }
  var c=toLinear(appearance(sample.rgb));
  let p=world(d.rect.xy+in.uv*d.rect.zw);
  if(d.flags.x>0.5) {
    // Anchor distance at the current feet, not the changing animation silhouette.
    let foot=world(d.rect.xy+vec2f(d.rect.z*0.5,d.rect.w*0.96));let z=depthAt(foot);
    let center=world(d.rect.xy+d.rect.zw*0.5);
    let field=spriteLight(p,center,in.uv*2.0-1.0,z)+rayField(p,min(z,depthAt(p)))*g.v[8].y*0.5;
    let ambient=toLinear(textureSampleLevel(auxiliary,linearSampler,foot/vec2f(g.v[2].x,g.v[1].x),0).rgb);
    if(g.v[7].x>0.5) {
      let contribution=field+ambient*g.v[7].y;let illumination=mix(vec3f(luminance(contribution)),contribution,g.v[7].w)*g.v[8].x;
      // Painted highlights have less headroom than cloth/shadow colors. Preserve
      // facial detail while allowing colored spill into darker sprite regions.
      c+=(c*0.8+vec3f(0.035))*illumination/(1.0+luminance(c)*2.8);
      let tint=ambient/max(luminance(ambient),0.08);c*=mix(vec3f(1),clamp(tint,vec3f(0.6),vec3f(1.4)),g.v[8].w*(1.0-z)*g.v[18].x);
      // The map locates the actor's feet on the painted floor. Authored front air
      // integrates a portion of the volume between that plane and the viewer.
      let air=atmosphere(p,z*(1.0-g.v[19].y*0.4));let cover=(1.0-exp(-air.a))*g.v[8].z;
      c=mix(c,air.rgb*0.8+lights(p,2u,z)*0.12+rayField(p,z)*0.2,clamp(cover,0.0,0.55));
      c*=1.0-g.v[18].w*smoothstep(0.78,1.0,in.uv.y)*select(1.0,0.0,d.flags.z>0.5);
    }
    let texel=1.0/vec2f(textureDimensions(source));
    if(g.v[9].x>0.5) {
      let r=texel*g.v[9].z; let alpha=(textureSampleLevel(source,linearSampler,uv+r*vec2f(1,0),0).a+textureSampleLevel(source,linearSampler,uv+r*vec2f(-1,0),0).a+textureSampleLevel(source,linearSampler,uv+r*vec2f(0,1),0).a+textureSampleLevel(source,linearSampler,uv+r*vec2f(0,-1),0).a)*0.25;
      let wrapLight=min(ambient+field,vec3f(1.2));
      c+=mix(vec3f(luminance(wrapLight)),wrapLight,g.v[9].w)*(1.0-alpha)*g.v[9].y*0.22;
    }
    if(g.v[10].x>0.5) {
      let r=texel*g.v[10].z; let ax=textureSampleLevel(source,linearSampler,uv+vec2f(r.x,0),0).a-textureSampleLevel(source,linearSampler,uv-vec2f(r.x,0),0).a;
      let ay=textureSampleLevel(source,linearSampler,uv+vec2f(0,r.y),0).a-textureSampleLevel(source,linearSampler,uv-vec2f(0,r.y),0).a;
      let gradient=vec2f(ax,ay);var edgeLight=ambient*g.v[11].y*length(gradient);
      for(var i=0u;i<u32(g.v[1].z);i++){let e=effects[i];if(e.v[0].x>2.0 || e.v[0].y==0.0){continue;}let delta=e.v[1].xy-p;let direction=delta/max(length(delta),0.01);edgeLight+=e.v[2].rgb*lightWeight(e,p)*visibility(e,z)*max(0.0,-dot(gradient,direction))*g.v[11].x;}
      c+=mix(vec3f(luminance(edgeLight)),edgeLight,g.v[10].w)*g.v[10].y*0.35;
    }
  }
  let alpha=sample.a*d.extra.y;
  return vec4f(c*alpha,alpha);
}
@fragment fn field(in:Vertex) -> @location(0) vec4f {
  let p=world(in.uv);let sourceBase=textureSampleLevel(source,linearSampler,in.uv,0).rgb;
  let z=depthAt(p);let light=lights(p,0u,z);var beams=vec3f(0);var beamScatter=vec3f(0);
  var base=sourceBase;var cues=vec3f(0);
  for(var i=0u;i<u32(g.v[1].z);i++){let e=effects[i];if(e.v[0].y==0.0){continue;}
    if(e.v[0].x==7.0){base=waterSurface(e,p,z,base);}
    if(e.v[0].x==8.0){base=waterSparkles(e,p,z,base);}
    if(e.v[0].x==3.0 || e.v[0].x==6.0){var ray=vec3f(0);if(e.v[0].x==6.0){ray=godRay(e,p,z);}else{ray=shaft(e,p,z);}beams+=ray;beamScatter+=ray*e.v[8].x;}
    if(e.v[9].y>0.0){let delta=p-e.v[1].xy;let radius=e.v[9].x;let r=length(delta)/radius;let halo=exp(-r*r*3.2);let core=exp(-r*r*18.0);let cueActive=e.v[9].y==4.0 || e.v[9].y==3.0;let open=e.v[9].y==3.0;let breath=select(1.0,0.91+0.09*sin(g.v[1].y*1.25),cueActive);let response=select(1.0,select(1.26,1.52,e.v[9].z>1.5),e.v[9].z>0.5);let ringRadius=select(0.78,0.84,open)+select(0.0,select(0.035,0.065,e.v[9].z>1.5),e.v[9].z>0.5);let angle=atan2(delta.y,delta.x)+g.v[1].y*select(0.0,select(0.085,0.12,open),cueActive);let gap=1.0-smoothstep(0.78,0.98,cos(angle-0.72));let arc=exp(-pow((r-ringRadius)*24.0,2.0))*gap*select(0.0,select(0.72,0.96,open),cueActive);let runeCell=abs(fract(angle/6.2831853*4.0+0.5)-0.5);let notches=(1.0-smoothstep(0.035,0.095,runeCell))*exp(-pow((r-(ringRadius+0.16))*17.0,2.0))*select(0.0,select(0.62,0.84,open),cueActive);cues+=e.v[2].rgb*(halo*select(0.022,0.075,cueActive)+core*0.09+arc+notches)*e.v[2].w*breath*response;}
  }
  let air=atmosphere(p,z);let transmission=exp(-air.a);let haze=air.rgb;
  // Light multiplies the painted surface; scattering is additive only in the participating medium.
  let lit=base*(vec3f(1)+light)+light*0.012;
  let scattering=haze*0.65+lights(p,2u,z)*0.12+beamScatter*1.4;
  return vec4f(lit*transmission+scattering*(1.0-transmission)+beams*0.34+cues,1);
}
@fragment fn bloomExtract(in:Vertex) -> @location(0) vec4f {
  var c=textureSampleLevel(source,linearSampler,in.uv,0).rgb;
  let p=world(in.uv);let local=lights(p,0u,depthAt(p));c+=local*g.v[13].z*0.1;
  let high=max(c.r,max(c.g,c.b));let knee=g.v[12].w;let soft=clamp(high-g.v[12].z+knee,0.0,2.0*knee);let mask=max(high-g.v[12].z,soft*soft/(4.0*knee+0.00001))/max(high,0.0001);
  return vec4f(mix(vec3f(luminance(c)),c,g.v[13].y)*mask*g.v[12].x,1);
}
@fragment fn blur(in:Vertex) -> @location(0) vec4f {
  var result=vec3f(0);var total=0.0;
  for(var i=-6;i<=6;i++){let f=f32(i);let w=exp(-f*f*0.06*g.v[13].w);result+=textureSampleLevel(source,linearSampler,in.uv+d.flags.zw*f*g.v[13].x/6.0,0).rgb*w;total+=w;}
  return vec4f(result/total,1);
}
fn shoulder(c:vec3f) -> vec3f { return select(c,vec3f(1)-0.2*exp(-(c-0.8)*5.0),c>vec3f(0.8)); }
@fragment fn finish(in:Vertex) -> @location(0) vec4f {
  var c=textureSampleLevel(source,linearSampler,in.uv,0).rgb;
  if(g.v[12].x>0.5){c+=textureSampleLevel(auxiliary,linearSampler,in.uv,0).rgb*g.v[12].y;}
  if(g.v[14].x>0.5){c*=exp2(exposure[0]*g.v[15].x);}
  if(g.v[18].x>0.5 && g.v[18].z>0.0){let distance=(1.0-depthAt(world(in.uv)))*g.v[18].z;c=c*(1.0+distance*0.12)+vec3f(0.014,0.021,0.024)*distance;}
  if(g.v[3].x>0.5){c*=exp2(g.v[3].y);let l=luminance(c);c+=c*g.v[4].x*smoothstep(0.3,1.0,l)*0.5;c+=g.v[4].y*(1.0-smoothstep(0.0,0.4,l))*0.08;c*=vec3f(1.0+g.v[4].w*0.12+g.v[5].x*0.04,1.0-g.v[5].x*0.08,1.0-g.v[4].w*0.12+g.v[5].x*0.04);c=max(vec3f(0),c-g.v[5].y);}
  // Neutral bypass is an exact sRGB round trip; the shoulder only compresses added HDR energy.
  if(g.v[2].y>0.5){c=shoulder(c);}
  c=toSRGB(max(c,vec3f(0)));
  if(g.v[3].x>0.5){c=(c-0.5)*g.v[3].z+0.5;c=mix(vec3f(luminance(c)),c,g.v[3].w);}
  if(g.v[16].x>0.5){let r=length((in.uv-0.5)*vec2f(1.15,1));c*=1.0-g.v[16].y*smoothstep(0.72*(1.0-g.v[16].z),0.75,r);c=(c*exp2(g.v[16].w)-0.5)*g.v[17].x+0.5;}
  return vec4f(clamp(c,vec3f(0),vec3f(1)),1);
}
struct ParticleVertex { @builtin(position) position: vec4f, @location(0) uv: vec2f, @location(1) color: vec4f, @location(2) worldPoint:vec2f, @location(3) distance:f32 }
// Integer avalanche avoids the correlated columns that a sine hash produces for
// large instance IDs after f32 multiplication loses low bits.
fn randomIndex(value:u32) -> f32 { var h=value;h=(h^(h>>16u))*0x7feb352du;h=(h^(h>>15u))*0x846ca68bu;h=h^(h>>16u);return f32(h&0x00ffffffu)/16777216.0; }
@vertex fn particle(@builtin(vertex_index) vertex:u32,@builtin(instance_index) id:u32) -> ParticleVertex {
  let e=effects[u32(d.flags.x)];let seed=id+u32(e.v[0].w)*65537u;let life=e.v[4].w;
  let age=fract(g.v[1].y/life+randomIndex(seed*3u+2u))*life;let phase=age/life;
  let random=vec2f(randomIndex(seed*3u),randomIndex(seed*3u+1u));
  let velocity=vec2f(cos(e.v[3].x),sin(e.v[3].x))*e.v[4].y*mix(1.0,0.5+random.x,e.v[5].w)+vec2f(e.v[7].x,0);
  let swirl=vec2f(noise(vec2f(random.x*64.0,age*0.2)),noise(vec2f(age*0.2,random.y*64.0+9.0)))-0.5;
  let travel=velocity*age+vec2f(0,0.5*e.v[5].z*age*age)+swirl*e.v[4].z*50.0;
  let distributed=(fract(random+travel/e.v[1].zw)-0.5)*e.v[1].zw;
  let p=e.v[1].xy+select(distributed,(random-0.5)*e.v[1].zw*0.08+travel,e.v[7].w>0.5);
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
@fragment fn particleColor(in:ParticleVertex) -> @location(0) vec4f {
  var e=effects[u32(d.flags.x)];e.v[6].x=in.distance;let visible=visibility(e,depthAt(in.worldPoint));
  let a=exp(-dot(in.uv,in.uv)*4.0)*(1.0-smoothstep(0.7,1.0,length(in.uv)))*in.color.a*visible;
  return vec4f(in.color.rgb*a,a);
}
`;
  const autoExposure = /* wgsl */ `
struct Globals { v: array<vec4f,32> }
@group(0) @binding(0) var<uniform> g: Globals;
@group(0) @binding(1) var scene: texture_2d<f32>;
@group(0) @binding(2) var<storage, read_write> exposure: array<f32>;
@compute @workgroup_size(1) fn adapt() {
  if(g.v[14].x<0.5){exposure[0]=0.0;return;}
  let size=textureDimensions(scene);var sum=0.0;
  for(var y=0u;y<16u;y++){for(var x=0u;x<16u;x++){let c=textureLoad(scene,vec2i(vec2u((x*2u+1u)*size.x/32u,(y*2u+1u)*size.y/32u)),0).rgb;sum+=log(max(dot(c,vec3f(0.2126,0.7152,0.0722)),0.001));}}
  let desiredExposure=clamp(log2(0.18/exp(sum/256.0)),g.v[14].y,g.v[14].z);
  exposure[0]=mix(exposure[0],desiredExposure,1.0-exp(-g.v[14].w*min(g.v[1].w,0.1)));
}`;
  global.AtlasCinematicShaders = { shared, autoExposure };
})(window);
