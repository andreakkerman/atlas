// The emblem uses the supplied PNG alpha, never a luminance/chroma extraction.
// Every sample and the final blend stay premultiplied, including mipmaps and AA.
export function logoShader(noise) { return `#version 300 es
precision highp float;
in vec2 uv;
out vec4 color;
uniform sampler2D artwork, emblem;
uniform vec2 resolution;
uniform vec3 placement;
uniform float time, glow, cyan, roughness, wordTime, dpr;
uniform float formationClock,depositionSoftness,frontWidth,materialization;
uniform float glyphStart,glyphDuration,glyphPeak,glyphFinal,glyphPulse,glyphSettle;
uniform float wordDuration,wordOpacity,wordGold,wordmarkOffset;
${noise}
const float TAU=6.283185307;
vec4 emblemAt(vec2 q){
 // Register the new emblem's center and size to the established composition.
 // Its included wordmark is excluded; the existing wordmark stays unchanged.
 vec2 source=(q-vec2(.5,.375))/.88+vec2(.5,.4043);
 if(source.y>.766 || any(lessThan(source,vec2(0))) || any(greaterThan(source,vec2(1))))return vec4(0);
 return texture(emblem,source);
}
vec4 deposit(vec2 q,float grain){
 if(any(lessThan(q,vec2(0)))||any(greaterThan(q,vec2(1))))return vec4(0);
 if(q.y>.704){
  // Reposition only the letters; exclude the source's underline and diamond.
  // The unified fade and source letter shapes remain unchanged.
  vec2 wordQ=q-vec2(0,wordmarkOffset);
  if(wordQ.y<.704 || wordQ.y>.833)return vec4(0);
  vec3 tex=texture(artwork,wordQ).rgb;
  vec3 bg=(texture(artwork,vec2(.10,wordQ.y)).rgb+texture(artwork,vec2(.90,wordQ.y)).rgb)*.5;
  float coverage=clamp(max(tex.r-max(tex.g*.90,tex.b),0.)*22.+max(tex.g-.18,0.)*4.,0.,1.);
  float plate=(1.-smoothstep(.30,.39,abs(wordQ.x-.5)))*smoothstep(.704,.712,wordQ.y)*(1.-smoothstep(.822,.833,wordQ.y));
  float reveal=plate*smoothstep(wordTime,wordTime+wordDuration,time)*wordOpacity;
  return vec4(max(vec3(0),tex-bg*(1.-coverage))*reveal*step(.00001,coverage)*wordGold,coverage*reveal);
 }
 vec2 d=q-vec2(.5,.375);
 float radius=length(d);
 float angle=mod(atan(d.y,d.x)+3.14159265,TAU)/TAU;
 float timestamp=1.085+angle*1.17;
 float cardinal=mod(floor(angle*4.+.5),4.)*.25;
 float axis=max(abs(d.x),abs(d.y));
 float pointWidth=.04*clamp((.283-axis)/.163,0.,1.)+.004;
 if(radius<.200 && radius>.123){
  float diagonal=(floor(angle*4.)+.5)*.25;
  timestamp=1.09+diagonal*1.06+clamp((radius-.123)/.075,0.,1.)*.16;
 }
 if(min(abs(d.x),abs(d.y))<pointWidth && radius>.120 && radius<.289){
  timestamp=1.07+cardinal*1.18+clamp((radius-.120)/.160,0.,1.)*.25;
 }
 if(radius<=.123)timestamp=1.17+angle*1.04;
 // The detached compass ticks resolve together, including their soft shadows.
 if(radius>.282)timestamp=2.12+angle*.13;
 // This selects timing, never silhouette. A smooth transition avoids creating
 // an artificial hard circular contour inside the source's opaque center.
 float glyphRegion=1.-smoothstep(.093,.101,radius);
 timestamp=mix(timestamp,1.98+clamp((q.y-.288)/.173,0.,1.)*.35,glyphRegion);
 float age=formationClock-timestamp-(grain-.5)*.026;
 float aa=max(fwidth(age)*.65,.006)*depositionSoftness;
 float solid=smoothstep(-aa,.022*frontWidth+aa,age);
 float settle=1.-smoothstep(.025,.16,age);
 vec2 offset=d/max(radius,.001)*.0025*settle*(1.-glyphRegion);
 // Move color AND its authored coverage together as fresh material seats.
 vec4 tex=emblemAt(q-offset);
 vec3 surface=tex.rgb/max(tex.a,.00001);
 float metal=smoothstep(.025,.16,surface.r-surface.b)*smoothstep(.09,.30,surface.r);
 float energy=(1.-smoothstep(.104,.122,radius))*smoothstep(.09,.34,surface.g)*smoothstep(-.01,.04,surface.b-surface.r);
 float heat=exp(-pow((age-.027)/(.044*frontWidth),2.));
 surface=mix(surface,surface*.72+vec3(.19,.085,.018),metal*settle*.65*min(materialization,1.));
 surface+=vec3(.35,.18,.038)*metal*heat*glow*materialization*(1.-roughness*.3);
 float peakTime=glyphStart+glyphDuration;
 float width=.12*(glyphDuration/.18)/mix(1.,glyphSettle,step(peakTime,time));
 float ignition=exp(-pow((time-peakTime)/width,2.));
 float gain=max(.05,.40+(glyphFinal-.40)*smoothstep(glyphStart,peakTime,time)+ignition*(glyphPeak-glyphFinal)*glyphPulse);
 surface*=mix(1.,cyan*gain,energy);
 vec4 material=vec4(surface*tex.a,tex.a)*solid;
 // Preserve the existing fine compass guide without transporting a JPEG plate.
 // This is analytic pixel coverage, separate from the PNG's untouched silhouette.
 float px=1./(placement.z*dpr);
 float guide=(1.-smoothstep(px*.15,px*.85,abs(radius-.293)))*.34;
 guide*=smoothstep(2.12,2.30,formationClock);
 vec4 orbit=vec4(vec3(.40,.31,.13)*guide,guide);
 return material+orbit*(1.-material.a);
}
void main(){
 vec2 pixel=vec2(uv.x,1.-uv.y)*resolution;
 vec2 q=(pixel-placement.xy)/placement.z;
 vec2 s=vec2(.25/(placement.z*dpr));
 float grain=noise(q*590.);
 vec4 sum=deposit(q,grain);
 if(fwidth(sum.a)>.006){
  sum=(deposit(q+vec2(-s.x,-s.y),grain)+deposit(q+vec2(s.x,-s.y),grain)
       +deposit(q+vec2(-s.x,s.y),grain)+deposit(q+s,grain))*.25;
 }
 color=sum;
}`; }
