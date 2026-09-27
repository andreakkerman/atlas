import { logoShader } from './logo-material.js';
export const vertex = `#version 300 es
in vec2 position;
out vec2 uv;
void main(){ uv=position*.5+.5; gl_Position=vec4(position,0,1); }
`;

const noise = `
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y); }
float fbm(vec2 p){ return .53*noise(p)+.27*noise(p*2.03)+.13*noise(p*4.07)+.07*noise(p*8.13); }
`;

export const background = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 color;
uniform vec2 resolution;
uniform float time, atmosphere, glow;
uniform float tealBrightness,saturation,vignetteStrength,hazeMovement;
uniform float glyphStart,glyphDuration,glyphPeak,glyphFinal,glyphRadius,glyphPulse,glyphSettle;
uniform vec3 placement;
${noise}
void main(){
 vec2 p=(uv-.5)*vec2(resolution.x/resolution.y,1.);
 float n=fbm(p*3.2+vec2(time*.007,-time*.009)*hazeMovement);
 float cloud=fbm(p*5.+vec2(n*2.5,time*.005*hazeMovement));
 float vignette=exp(-dot(p*vec2(.85,1.),p*vec2(.85,1.))*1.9*vignetteStrength);
 vec3 base=mix(vec3(.004,.035,.036),vec3(.014,.115,.108),vignette);
 base+=(cloud-.43)*vec3(.009,.065,.053)*atmosphere*vignette;
 float shaft=pow(max(0.,sin(p.x*4.+p.y*1.6+cloud*1.3)),12.)*.014;
 base+=vec3(.12,.7,.58)*shaft*vignette*atmosphere;
 float center=exp(-length(p-vec2(0,.13))*7.);
 base+=vec3(.008,.045,.037)*center;
 vec2 q=(vec2(uv.x,1.-uv.y)*resolution-placement.xy)/placement.z;
 float aura=exp(-length((q-vec2(.5,.382))*vec2(1.,1.15))*24./glyphRadius);
 float peakTime=glyphStart+glyphDuration;
 float width=.14*(glyphDuration/.18)/mix(1.,glyphSettle,step(peakTime,time));
 float ignition=exp(-pow((time-peakTime)/width,2.));
 base+=vec3(.008,.11,.10)*aura*(smoothstep(glyphStart,glyphStart+.30*(glyphDuration/.18),time)*glyphFinal+ignition*1.5*glyphPulse*(glyphPeak/1.24))*glow;
 if(saturation!=1.)base=mix(vec3(dot(base,vec3(.2126,.7152,.0722))),base,saturation);
 base*=tealBrightness;
 base+=(hash(gl_FragCoord.xy)-.5)/550.;
 color=vec4(base,1.);
}`;

export const logo = logoShader(noise);

export const logoVertex = `#version 300 es
in vec2 position;
out vec2 uv;
uniform vec2 resolution;
uniform vec3 placement;
void main(){
 vec2 screen=(placement.xy+(position*.5+.5)*placement.z)/resolution;
 uv=vec2(screen.x,1.-screen.y);
 gl_Position=vec4(screen.x*2.-1.,1.-screen.y*2.,0,1);
}`;

export const ribbonVertex = `#version 300 es
in vec2 position;
in vec3 detail;
out vec3 v;
uniform vec2 resolution;
uniform vec3 placement;
void main(){v=detail;vec2 p=(placement.xy+position*placement.z)/resolution;gl_Position=vec4(p.x*2.-1.,1.-p.y*2.,0,1);}
`;

export const ribbon = `#version 300 es
precision highp float;
in vec3 v;
out vec4 color;
uniform float time, magicCyan, magicGold, ribbonGlow, silk, speed;
uniform float ribbonOpacity,wispAmount,wispOpacity,turbulenceFrequency,hotspotAmount,hotspotBrightness,wordSupport;
uniform sampler2D flowTexture;
${noise}
void main(){
 float across=v.y;
 float fold=fbm(vec2(v.x*7.*turbulenceFrequency-time*.16,across*2.+v.z*.7));
 float edge=pow(max(0.,1.-abs(across)),1.5);
 float seam=across-.36*sin(v.x*6.+time*.22+v.z);
 float veining=exp(-pow((seam+fold*.3)*5.,2.));
 float spine=exp(-pow(seam*34.,2.))*hotspotAmount;
 float mist=fbm(vec2(v.x*24.+fold*3.-time*.24,across*4.+fold*2.));
 float taper=smoothstep(0.,.13,v.x)*(1.-smoothstep(.94,1.,v.x));
 vec2 texUV=vec2(v.x*1.1-time*speed*.045+v.z*.17,across*.36+.5+v.z*.19+fold*.10);
 vec3 magic=texture(flowTexture,texUV).rgb;
 float material=smoothstep(.035,.27,max(magic.g,magic.b));
 float alpha=edge*taper*max(0.,material*.50*wispOpacity+veining*.055*wispAmount+spine*.06+mist*.015*(wispAmount-1.))*silk*ribbonOpacity*wordSupport;
 vec3 tint=magic*1.25+vec3(.015,.11,.12)*veining;
 tint+=vec3(.12,.30,.28)*spine*ribbonGlow*hotspotBrightness;
 vec3 materialColor=tint*magicCyan;
 if(magicGold!=magicCyan)materialColor=mix(materialColor,tint*magicGold,smoothstep(.05,.3,magic.r-magic.b));
 color=vec4(materialColor,alpha);
}`;

export const particleVertex = `#version 300 es
in vec2 position;
in vec3 detail;
out vec3 v;
uniform vec2 resolution;
uniform vec3 placement;
uniform float dpr;
void main(){v=detail;vec2 p=(placement.xy+position*placement.z)/resolution;gl_Position=vec4(p.x*2.-1.,1.-p.y*2.,0,1);gl_PointSize=detail.x*dpr;}
`;

export const particle = `#version 300 es
precision highp float;
in vec3 v;
out vec4 color;
uniform float magicGold, magicCyan;
void main(){
 float r=length(gl_PointCoord-.5)*2.;
 float a=exp(-r*r*5.)*(1.-smoothstep(.65,1.,r))*v.y;
 vec3 c=mix(vec3(1.,.68,.23),vec3(.20,.85,.89),v.z);
 color=vec4(c,a*mix(magicGold,magicCyan,v.z));
}`;

export const bloom = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 color;
uniform sampler2D source;
uniform vec2 resolution;
uniform float ribbonGlow;
void main(){
 vec3 light=vec3(0);
 for(int i=0;i<12;i++){
  float a=float(i)*2.39996323;
  vec2 offset=vec2(cos(a),sin(a))*sqrt(float(i)+.5)/resolution;
  light+=texture(source,uv+offset*3.).rgb*.048;
  light+=texture(source,uv+offset*12.).rgb*.030;
 }
 color=vec4(light*ribbonGlow*.48,1);
}`;

export const copy = `#version 300 es
precision highp float;
in vec2 uv;
out vec4 color;
uniform sampler2D source;
uniform sampler2D halo;
uniform float haloEnabled;
void main(){color=texture(source,uv)+vec4(texture(halo,uv).rgb*haloEnabled,0);}
`;
