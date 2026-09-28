// Every visible form is a field of round sprites. No strokes, strips or outlines.
export const magic=/* wgsl */`
struct Params {v:array<vec4f,22>}
@group(0) @binding(0) var<uniform> p:Params;
const PI=3.14159265359;
const TAU=6.28318530718;
fn hash(n:f32)->f32{
 var x=u32(abs(n)*1009.+.5)+0x9e3779b9u;
 x=(x^(x>>16u))*0x7feb352du;x=(x^(x>>15u))*0x846ca68bu;
 return f32((x^(x>>16u))>>8u)/16777216.;
}
// Interleaved, independently budgeted species. Amount changes count, never hue or energy.
fn population(n:u32,total:f32,goldShare:f32)->f32{
 let gold=(n%2u)==1u;let amount=select(p.v[20].x,p.v[20].y,gold);
 let share=select(1.-goldShare,goldShare,gold);
 return select(0.,1.,f32(n/2u)<total*share*amount*richness());
}
fn marker(i:u32)->vec2f{if(i==0u){return p.v[1].xy;}if(i==1u){return p.v[1].zw;}return p.v[2].xy;}
fn pulse(i:u32)->f32{return 1.+sin(p.v[0].z*p.v[6].w*2.2+f32(i))*p.v[18].x;}
fn richness()->f32{return clamp(p.v[17].z,.15,3.);}
fn carrier(u:f32,k:f32)->vec2f{
 let v=clamp(u,0.,1.);let en=sin(v*PI);let t=p.v[0].w;let phase=t*.9*p.v[8].w+k*1.7;
 let sm=mix(v,v*v*(3.-2.*v),p.v[9].w*.35);
 return mix(p.v[3].xy,p.v[3].zw,sm)+(p.v[4].xy-p.v[3].zw)*en*v*.8+vec2f(
 sin(v*TAU+k)*en*13.*p.v[19].w+sin(v*8.*p.v[8].z+phase)*en*7.*p.v[8].y,
 -en*p.v[8].x*p.v[19].w+sin(v*TAU*1.3+t*.35+k*.24)*en*23.*p.v[9].y+sin(phase+v*7.)*en*8.*p.v[8].y);
}
fn flowGain()->f32{let v=p.v[4].z;return smoothstep(0.,.05,v)*(1.-smoothstep(.96,1.,v))*p.v[7].z;}
// The tail catches the head at arrival, so the entire swarm reaches Sven.
fn flowU(z:f32)->f32{return mix(max(0.,p.v[4].z-p.v[9].z*(1.-p.v[4].z)),min(1.,p.v[4].z),z);}
// Filled, irregular volumes: orbit direction describes motion, never a drawn ring.
fn exitCloud(k:f32)->vec2f{
 let t=p.v[12].w;let direction=select(1.,-1.,p.v[14].w<0.);
 let z=fract(hash(k+13.)+t*.045*direction);var a=hash(k)*TAU+t*p.v[12].z;
 var radius=p.v[12].x*(.18+.9*sqrt(hash(k+29.)));
 if(p.v[14].x>.5){a=z*TAU*p.v[14].y+t*p.v[12].z+floor(hash(k+7.)*3.)*TAU/3.;a+=(hash(k+3.)-.5)*.85;radius=p.v[12].x*(.08+.97*z);}
 else{radius*=.7+.3*sin(a*3.+t*.24)+p.v[15].x*.13; a+=sin(t*.3+k)*.13;}
 return p.v[2].zw+vec2f(cos(a),sin(a)*p.v[12].y)*radius+vec2f(sin(k*3.+t),cos(k*7.-t))*(3.+p.v[14].z*4.);
}
struct Out{@builtin(position) position:vec4f,@location(0) uv:vec2f,@location(1) color:vec3f,@location(2) gain:f32,@location(3) softness:f32}
@vertex fn dust(@builtin(vertex_index) vi:u32,@builtin(instance_index) id:u32)->Out{
 let quad=array<vec2f,6>(vec2f(-1.,-1.),vec2f(1.,-1.),vec2f(-1.,1.),vec2f(-1.,1.),vec2f(1.,-1.),vec2f(1.,1.))[vi];
 let k=f32(id);let t=p.v[0].z;let depth=hash(k+87.);let gold=id%2u==1u;
 var center=vec2f(0.);var radius=1.;var gain=0.;
 let color=select(vec3f(.065,.82,.94),vec3f(1.,.66,.19),gold);
 // Three gently folding lobes, with an airy scatter of fireflies around them.
 // The volume is filled with separate motes; there is no central glow sprite.
 if(id<7200u){
  let i=id/2400u;let n=id%2400u;let z=hash(k+8.);
  let a=hash(k+2.)*TAU+t*(.12+.16*depth)*p.v[6].w+z*1.7;
  let r=pow(z,.6)*36.*p.v[5].x*pulse(i);
  let petal=1.+sin(a*3.+t*.35+f32(i))*.27*p.v[6].y;
  center=marker(i)+vec2f(cos(a)*r*petal,sin(a)*r*.79+sin(k+t*.4)*r*.15);
  radius=(.65+pow(depth,9.)*3.6)*p.v[5].x;
  gain=p.v[5].y*select(p.v[5].z,p.v[5].w,gold)*p.v[18][i+1u]*(.24+.72*hash(k+19.));
  gain*=population(n,620.*p.v[6].x,.28)*(.7+.3*p.v[6].z);
  let stage=p.v[21][i];
  if(stage>=0.&&stage<=1.){
   // These are the SAME seeded motes as the idle challenge, not a replacement burst.
   // A staggered departure peels the volume into the shared live-target carrier.
   let delay=hash(k+61.)*.22;
   let u=clamp((stage-delay)/(1.-delay),0.,1.);
   let offset=center-marker(i);
   center=carrier(u,hash(k+9.)*max(1.,p.v[7].y)*.38)+offset*(1.-smoothstep(0.,1.,u));
   gain*=1.-smoothstep(.94,1.,u);
  }else if(stage>1.){gain=0.;}
 }
 else if(id<19200u){
  let n=id-7200u;let z=hash(k);let u=flowU(z);
  let strata=hash(k+9.)*max(1.,p.v[7].y)*.38;
  let a=hash(k+4.)*TAU+t*.6;let r=sqrt(hash(k+11.))*14.*p.v[7].x*p.v[9].x*pow(max(.02,sin(z*PI)),.6);
  center=carrier(u,strata)+vec2f(cos(a),sin(a))*r;
  radius=(.7+pow(depth,9.)*3.8)*p.v[10].y;
  let cloud=mix(1.,.35+.65*pow(.5+.5*sin(u*21.-t*.7+strata*.6),2.),clamp(p.v[11].y*p.v[11].z,0.,1.));
  gain=flowGain()*pow(max(0.,sin(z*PI)),.5)*cloud*p.v[7].w*p.v[10].z*(.36+.86*hash(k+32.));
  gain*=population(n,4000.*p.v[10].x,.32)*(.7+.3*p.v[11].x);
  if(p.v[4].z<0.){gain=0.;}
 }
 else if(id<25200u){
  let n=id-19200u;center=exitCloud(k);radius=.7+pow(depth,9.)*3.8;
  gain=p.v[13].x*p.v[19].x*(.28+.8*hash(k+31.));
  gain*=population(n,450.*p.v[13].w,1.-clamp(p.v[13].y*.18,0.,1.))*(.7+.3*p.v[13].z);
  if(p.v[12].w<0.){gain=0.;}
 }
 // Rare near-camera motes are softer; fine mid-plane sparks keep crisp luminous cores.
 let softness=pow(depth,12.)*p.v[20].w;
 radius*=p.v[20].z*(1.+softness*.65);gain/=(1.+softness*.7);
 gain*=.55+.45*pow(.5+.5*sin(t*(.8+hash(k+41.))+k),2.);
 let pos=center+quad*radius;var out:Out;out.position=vec4f(pos.x/p.v[0].x*2.-1.,1.-pos.y/p.v[0].y*2.,0.,1.);out.uv=quad;out.color=color;out.gain=gain;out.softness=softness;return out;
}
@fragment fn mote(in:Out)->@location(0) vec4f{
 let r=length(in.uv);if(r>1.){discard;}
 let halo=exp(-r*r*mix(8.,3.,clamp(in.softness,0.,1.)))*.55;
 let core=exp(-r*r*32.)*2.3;
 // White-hot pinpricks over colored emission, without adding a separate aura field.
 let light=in.color*halo+mix(in.color,vec3f(1.),.68)*core;
 return vec4f(light*in.gain,0.);
}
`;
