import * as shaders from './shaders.js';
import {timing} from './settings.js';
import {loadSettings,attachTuning} from './tuning-ui.js';

const $ = (id) => document.getElementById(id);
const canvas = $('scene');
const query = new URLSearchParams(location.search);
const settings = loadSettings(query);
let time=0, playing=true, ready=false, last=0, frame=0, raf=0, gl;
let W=0,H=0,DPR=1,layout=[0,0,1], programs={}, buffers={}, texture,emblemTexture,flowTexture,fxTexture,fxBuffer,fxWidth,fxHeight;
let bgTexture,bgBuffer,bgWidth,bgHeight,bloomTexture,bloomBuffer;
let frameTimes=[], drawTimes=[], lastUI=0;
let holding=false,idleClock=0;
let wordmarkOffset=0;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=(a,b,x)=>{const t=clamp((x-a)/(b-a));return t*t*(3-2*t);};
const mix=(a,b,t)=>a+(b-a)*t;
const TAU=Math.PI*2;
function formationClock(t){const phase=timing(settings);return phase.formation===1.05&&settings.formationDuration===1.3?t:1.05+(t-phase.formation)*1.3/settings.formationDuration;}
function handoffMix(t){return smooth(timing(settings).handoff-.2,timing(settings).handoff+.15,t);}

function compile(vs,fs) {
 const program=gl.createProgram();
 for(const [type,source] of [[gl.VERTEX_SHADER,vs],[gl.FRAGMENT_SHADER,fs]]){
  const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
  if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader));
  gl.attachShader(program,shader);gl.deleteShader(shader);
 }
 gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw new Error(gl.getProgramInfoLog(program));
 const uniforms={};for(let i=0;i<gl.getProgramParameter(program,gl.ACTIVE_UNIFORMS);i++){const u=gl.getActiveUniform(program,i);uniforms[u.name]=gl.getUniformLocation(program,u.name);}
 return {program,uniforms,position:gl.getAttribLocation(program,'position'),detail:gl.getAttribLocation(program,'detail')};
}
function use(p,t) {
 gl.useProgram(p.program);
 const handoff=handoffMix(t);
 const data={resolution:[W,H],placement:layout,wordmarkOffset,time:t,formationClock:formationClock(t),dpr:DPR,...settings,
  magicCyan:settings.cyan*mix(1,settings.handoffCyan,handoff),magicGold:settings.gold*mix(1,settings.handoffGold,handoff),
  wordSupport:mix(1,settings.wordInteraction,Math.sin(Math.PI*clamp((t-timing(settings).handoff)/settings.handoffDuration)))};
 for(const [name,loc] of Object.entries(p.uniforms)){
  const value=data[name];if(value===undefined)continue;
  if(Array.isArray(value)){if(value.length===2)gl.uniform2fv(loc,value);else gl.uniform3fv(loc,value);}else gl.uniform1f(loc,value);
 }
 if(p.uniforms.flowTexture){gl.activeTexture(gl.TEXTURE1);gl.bindTexture(gl.TEXTURE_2D,flowTexture);gl.uniform1i(p.uniforms.flowTexture,1);gl.activeTexture(gl.TEXTURE0);}
 if(p.uniforms.emblem){gl.activeTexture(gl.TEXTURE3);gl.bindTexture(gl.TEXTURE_2D,emblemTexture);gl.uniform1i(p.uniforms.emblem,3);gl.activeTexture(gl.TEXTURE0);}
}
function quad(p){
 gl.bindBuffer(gl.ARRAY_BUFFER,buffers.quad);gl.enableVertexAttribArray(p.position);gl.vertexAttribPointer(p.position,2,gl.FLOAT,false,0,0);gl.drawArrays(gl.TRIANGLES,0,6);
}
function geometry(p,data,mode){
 if(!data.length)return;
 gl.bindBuffer(gl.ARRAY_BUFFER,buffers.dynamic);gl.bufferData(gl.ARRAY_BUFFER,data,gl.DYNAMIC_DRAW);
 gl.enableVertexAttribArray(p.position);gl.vertexAttribPointer(p.position,2,gl.FLOAT,false,20,0);
 gl.enableVertexAttribArray(p.detail);gl.vertexAttribPointer(p.detail,3,gl.FLOAT,false,20,8);
 gl.drawArrays(mode,0,data.length/5);
 gl.disableVertexAttribArray(p.detail);
}
function target(width,height){
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,width,height,0,gl.RGBA,gl.UNSIGNED_BYTE,null);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 const buffer=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,buffer);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.COLOR_ATTACHMENT0,gl.TEXTURE_2D,texture,0);
 if(gl.checkFramebufferStatus(gl.FRAMEBUFFER)!==gl.FRAMEBUFFER_COMPLETE)throw new Error('Atmosphere target is incomplete');
 return [texture,buffer];
}
function sampledQuad(p,texture,t){use(p,t);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(p.uniforms.source,0);quad(p);}
function resize(){
 W=innerWidth;H=innerHeight;DPR=Math.min(devicePixelRatio||1,2);
 // Independent lab policy. Atlas renderer presets are never imported or modified.
 const max=gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);DPR=Math.min(DPR,max/W,max/H);
 canvas.width=Math.round(W*DPR);canvas.height=Math.round(H*DPR);gl.viewport(0,0,canvas.width,canvas.height);
 const size=Math.min(H*.89,W*1.03);layout=[(W-size)/2,(H-size*.99)/2-H*.035,size];
 $('start').style.top=`${layout[1]+size*.96}px`;
 // Center the letters in the free gap between the existing emblem's bottom
 // tick and the button's top edge. Neither anchor is moved.
 wordmarkOffset=(.694+.96-$('start').offsetHeight/(2*size))/2-.764;
 for(const tex of [fxTexture,bgTexture,bloomTexture])if(tex)gl.deleteTexture(tex);
 for(const buffer of [fxBuffer,bgBuffer,bloomBuffer])if(buffer)gl.deleteFramebuffer(buffer);
 fxWidth=Math.max(1,Math.round(canvas.width/3));fxHeight=Math.max(1,Math.round(canvas.height/3));
 bgWidth=Math.max(1,Math.round(canvas.width/2));bgHeight=Math.max(1,Math.round(canvas.height/2));
 [fxTexture,fxBuffer]=target(fxWidth,fxHeight);[bloomTexture,bloomBuffer]=target(fxWidth,fxHeight);[bgTexture,bgBuffer]=target(bgWidth,bgHeight);
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);
}

// A single continuous carrier: a long incoming S-curve becomes an orbital path.
// Every strand and particle samples this field, including the deposition front.
function path(u,t,strand=0){
 const s=strand, phase=t*.36*settings.speed;
 let x,y;
 if(u<0){
  const v=(u+1.5)/1.5,z=1-v;
  x=z*z*z*(-.90)+3*z*z*v*(-.35)+3*z*v*v*.278+v*v*v*.278;
  y=z*z*z*.02+3*z*z*v*(.76*settings.curvature)+3*z*v*v*.80+v*v*v*.375;
 } else if(u<=1.75) {
  const a=Math.PI+u*TAU;
  const r=.222+Math.sin(s*1.7+u*8.+phase*.3)*.017*smooth(0,.18,u)*(1-smooth(1.55,1.75,u));
  x=.5+Math.cos(a)*r;y=.375+Math.sin(a)*r;
 } else {
  // The existing carrier peels from the lower compass, brushes the wordmark,
  // and arrives on the Start inlay. No second emitter or particle system.
  const v=clamp(u-1.75),z=1-v;
  x=z*z*z*.5+3*z*z*v*.18+3*z*v*v*.84+v*v*v*.5;
  y=.597+(z*z*z*.597+3*z*z*v*.597+3*z*v*v*.86+v*v*v*.96-.597)*settings.handoffPath;
 }
 const spread=Math.sin(s*7.13)*(.018+(1-smooth(-.45,0,u))*.10)*settings.depth;
 const wave=Math.sin(u*10.*settings.turbulenceFrequency+phase+s*1.7)*.011*settings.turbulence;
 const gather=1-smooth(1.6,2.75,u);
 x+=(Math.sin(u*3.+s)*spread+wave*.6)*gather;
 y+=(Math.cos(u*4.+s*.7+phase*.25)*spread+wave)*gather;
 y=.375+(y-.375)*settings.magicSpread;
 return [x,y];
}
function headAt(t){
 const phase=timing(settings),orbitEnd=phase.formation+settings.formationDuration*1.2/1.3;
 if(t>=phase.handoff){const v=clamp((t-phase.handoff)/settings.handoffDuration);return 1.75+v+v*v-v*v*v;}
 if(t>=orbitEnd)return 1.+(t-orbitEnd)/Math.max(.05,phase.handoff-orbitEnd)*.75;
 if(t>=phase.formation)return (t-phase.formation)/(orbitEnd-phase.formation);
 const v=clamp((t-phase.arrival)/(phase.formation-phase.arrival)),s=(-1.66*v+2.66)*v*v;
 return mix(-1.35,0,s);
}
function envelope(t){const phase=timing(settings),tail=settings.handoffDuration/1.2;return smooth(phase.arrival,phase.arrival+.33*(phase.formation-phase.arrival)/.55,t)*mix(1,.14,smooth(2.05,2.50,formationClock(t)))*(1-smooth(phase.handoffEnd-.20*tail,phase.handoffEnd+.25*tail,t))*settings.magicIntensity*mix(1,settings.handoffIntensity,handoffMix(t));}

function makeRibbons(t,front){
 const data=[];
 const head=headAt(t), env=envelope(t);
 if(env<.001)return new Float32Array();
 const frontCount=Math.round(settings.ribbonCount*3/13),count=front?frontCount:settings.ribbonCount-frontCount;
 for(let k=0;k<count;k++){
  const s=k+(front?19:0), len=1.00+(s%4)*.16;
  const lead=head-(s%5)*.012;
  const width=(s%4===0?.14:s%4===1?.075:.025)*(front?.65:1)*Math.sqrt(env)*settings.ribbonWidth;
  const N=170;
  function point(i,side){
   const v=i/N,u=lead-len+v*len;
   const p=path(u,t,s),a=path(u-.002,t,s),b=path(u+.002,t,s);
   const dx=b[0]-a[0],dy=b[1]-a[1],norm=Math.hypot(dx,dy)||1;
   const twist=.65+.35*Math.sin(v*13.-t*.3+s*.9);
   const w=width*twist*(.4+.6*Math.sin(Math.PI*v));
   return [p[0]-dy/norm*w*side,p[1]+dx/norm*w*side,v,side,s];
  }
  for(let i=0;i<N;i++){
   const a=point(i,-1),b=point(i,1),c=point(i+1,-1),d=point(i+1,1);
   data.push(...a,...b,...c,...c,...b,...d);
  }
 }
 return new Float32Array(data);
}
function rand(i){const v=Math.sin(i*127.1+311.7)*43758.5453123;return v-Math.floor(v);}
const seeds=Array.from({length:4500},(_,i)=>[rand(i*6+1),rand(i*6+2),rand(i*6+3),rand(i*6+4),rand(i*6+5),rand(i*6+6)]);
function makeParticles(t,front){
 const data=[],head=headAt(t),env=envelope(t);
 const count=env<.001?0:Math.min(seeds.length,Math.round(1500*settings.density));
 for(let i=front?1:0;i<count;i+=2){
  const [a,b,c,d,e,f]=seeds[i];
  let u=head-a*1.6;
  const p=path(u,t,Math.floor(b*26));
  const age=(t*.15*settings.speed*settings.particleSpeed/settings.particleLifetime+c)%1;
  const life=Math.sin(age*Math.PI)**2;
  const width=(.008+Math.pow(b,3)*.072)*settings.particleSpread;
  p[0]+=Math.sin(d*TAU+t*.14*settings.particleSpeed)*width;
  p[1]+=Math.cos(e*TAU+t*.19*settings.particleSpeed)*width+(age-.5)*.014;
  const sparkle=f>1-.007*settings.sparkleFrequency&&settings.largeSparkles>0;
  const size=(sparkle?(7+f*4)*settings.largeSparkles:.8+Math.pow(f,5)*3.3)*settings.particleSize;
  const alpha=env*life*(sparkle?.28:.35+b*.55)*(1-smooth(.8,1,a))*settings.particleBrightness;
  const wordSupport=u>1.75?mix(1,settings.wordInteraction,Math.sin(Math.PI*clamp(u-1.75))):1;
  data.push(p[0],p[1],size,alpha*wordSupport,clamp(settings.particleMix*6-(i%6)));
 }
 // Depositing flecks stay close to the leading edge of the actual gold reveal.
 const ft=formationClock(t);
 if(ft>1.05&&ft<2.3){
  for(let i=0;i<Math.round(180*settings.edgeParticles);i++){
   const [a,b,c,d]=seeds[i+1700];
   const angle=Math.PI+(head-a*.065)*TAU;
   const r=.217+(b-.5)*.045;
   data.push(.5+Math.cos(angle)*r,.375+Math.sin(angle)*r,(.8+c*2)*settings.particleSize,(1-a)*.8*env*settings.particleBrightness,0);
  }
 }
 if(ft>1.98&&ft<2.36){
  const progress=clamp((ft-1.98)/.35),y=.288+progress*.17;
  for(let i=0;i<Math.round(100*settings.edgeParticles);i++){
   const [a,b,c]=seeds[i+2000],side=i%2?1:-1;
   data.push(.5+side*progress*.077+(a-.5)*.012,y+(b-.5)*.015,(1+c*3)*settings.particleSize,(1-smooth(2.30,2.36,ft))*.7*settings.magicIntensity*settings.particleBrightness,1);
  }
 }
 for(let i=front?1:0;i<Math.round(96*settings.ambientParticles);i+=2){const [a,b,c,d]=seeds[i+3000];data.push(a*1.5-.25,b+(Math.sin(t*.06+c*TAU)*.012),1+c*2,(.05+d*.08)*settings.ambientParticles,1);}
 return new Float32Array(data);
}

function render(){
 if(!ready)return;
 const start=performance.now(),t=time;
 const drift=Math.sin(t*.18)*settings.drift*.003*layout[2];
 const home=layout[0];layout[0]+=drift;
 const ribbonsBack=makeRibbons(t,false),ribbonsFront=makeRibbons(t,true),particlesBack=makeParticles(t,false),particlesFront=makeParticles(t,true);
 const active=envelope(t)>.001||settings.ambientParticles>0;
 if(active){
  gl.bindFramebuffer(gl.FRAMEBUFFER,fxBuffer);gl.viewport(0,0,fxWidth,fxHeight);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
  use(programs.ribbon,t);gl.uniform1f(programs.ribbon.uniforms.silk,envelope(t));geometry(programs.ribbon,ribbonsBack,gl.TRIANGLES);geometry(programs.ribbon,ribbonsFront,gl.TRIANGLES);
  use(programs.particle,t);geometry(programs.particle,particlesBack,gl.POINTS);geometry(programs.particle,particlesFront,gl.POINTS);
  gl.bindFramebuffer(gl.FRAMEBUFFER,bloomBuffer);gl.disable(gl.BLEND);sampledQuad(programs.bloom,fxTexture,t);
 }
 gl.bindFramebuffer(gl.FRAMEBUFFER,bgBuffer);gl.viewport(0,0,bgWidth,bgHeight);gl.disable(gl.BLEND);use(programs.background,t);quad(programs.background);
 gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,canvas.width,canvas.height);
 use(programs.copy,t);gl.activeTexture(gl.TEXTURE2);gl.bindTexture(gl.TEXTURE_2D,bloomTexture);gl.uniform1i(programs.copy.uniforms.halo,2);gl.uniform1f(programs.copy.uniforms.haloEnabled,active?1:0);sampledQuad(programs.copy,bgTexture,t);
 gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
 use(programs.ribbon,t);gl.uniform1f(programs.ribbon.uniforms.silk,envelope(t));geometry(programs.ribbon,ribbonsBack,gl.TRIANGLES);
 use(programs.particle,t);geometry(programs.particle,particlesBack,gl.POINTS);
 gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);
 if(t>=Math.min(timing(settings).formation-.03,settings.wordTime)){use(programs.logo,t);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,texture);gl.uniform1i(programs.logo.uniforms.artwork,0);quad(programs.logo);}
 gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
 use(programs.ribbon,t);gl.uniform1f(programs.ribbon.uniforms.silk,envelope(t)*.75*settings.depth);geometry(programs.ribbon,ribbonsFront,gl.TRIANGLES);
 use(programs.particle,t);geometry(programs.particle,particlesFront,gl.POINTS);
 layout[0]=home;
 updateButton(t);
 drawTimes.push(performance.now()-start);if(drawTimes.length>180)drawTimes.shift();
 updateUI(t);
}
function updateButton(t){
 const buttonTime=settings.buttonStart;
 const reveal=smooth(buttonTime,buttonTime+settings.buttonDuration,t);
 $('start').style.opacity=String(reveal);$('start').style.visibility=reveal>0?'visible':'hidden';
 $('start').style.transform=`translate(-50%,calc(-50% + ${(1-reveal)*6}px))`+(settings.buttonScale?` scale(${1-(1-reveal)*settings.buttonScale})`:'');
 const breathing=settings.buttonBreathing*(.5+.5*Math.sin((t+idleClock)*2.2))*.18;
 $('start').style.setProperty('--arrival',String((Math.exp(-(((t-buttonTime-.13)/.15)**2))*.24*settings.buttonReach*settings.handoffIntensity+settings.buttonIdle*.12+breathing)*settings.buttonCyan));
 const tint=(rgb,gain)=>`rgb(${rgb.map(c=>Math.round(clamp(c*gain,0,255))).join(' ')})`;
 $('start').style.setProperty('--button-gold',tint([230,211,166],settings.buttonGold));
 for(const [key,rgb]of [['a',[113,85,37]],['b',[204,180,120]],['c',[114,85,40]]])$('start').style.setProperty(`--border-${key}`,tint(rgb,settings.buttonBorder));
}
function stageAt(t){
 const phase=timing(settings);
 return t<phase.arrival?'Empty':t<phase.formation?'Arrival':t<phase.formed?'Formation':t<settings.glyphStart+settings.glyphDuration+.27?'Glyph ignition':t<settings.wordTime?'Emblem complete':t<settings.buttonStart?'Wordmark':t<settings.buttonStart+settings.buttonDuration?'Start':'Settled';
}
function updateUI(t){
 $('timeline').value=time;$('time-value').value=`${time.toFixed(2)} s`;$('stage').textContent=stageAt(t);$('pause').textContent=playing?'Pause':'Resume';
 if(performance.now()-lastUI>700){lastUI=performance.now();const avg=frameTimes.reduce((a,b)=>a+b,0)/frameTimes.length;$('fps').textContent=Number.isFinite(avg)?`${Math.round(1000/avg)} fps`:'Paused';}
}
function tick(now){
 const wasPlaying=playing,dt=last?Math.min((now-last)/1000,.08):0;
 if(last&&playing&&!document.hidden){time=Math.min(timing(settings).end,time+dt);frameTimes.push((now-last));if(frameTimes.length>180)frameTimes.shift();if(time>=timing(settings).end){playing=false;holding=true;}}
 if(holding&&!document.hidden)idleClock+=dt;
 last=now;
 if(wasPlaying||frame===0)render();
 else if(holding&&settings.buttonBreathing>0)updateButton(time);
 frame++;raf=requestAnimationFrame(tick);
}
function seek(t,pausePlayback=true){if(!Number.isFinite(Number(t)))return;time=clamp(Number(t),0,timing(settings).end);if(pausePlayback){playing=false;holding=false;idleClock=0;}render();}
function replay(){time=0;playing=true;holding=false;idleClock=0;last=0;render();}
function pause(){if(!playing&&time>=timing(settings).end){replay();return;}playing=!playing;holding=false;last=0;render();}
function fail(error){console.error(error);$('error').textContent=`The visual lab could not start. ${error.message}`;$('error').hidden=false;}
const tuning=attachTuning({settings,render,seek,replay,pause,state:()=>({time,playing}),query});
addEventListener('resize',()=>{if(ready){resize();render();}});
document.addEventListener('visibilitychange',()=>{last=0;});
canvas.addEventListener('webglcontextlost',(event)=>{event.preventDefault();cancelAnimationFrame(raf);ready=false;fail(new Error('Graphics context lost. Reload this page to recover.'));});
function dispose(){
 cancelAnimationFrame(raf);ready=false;
 if(!gl||gl.isContextLost())return;
 for(const p of Object.values(programs))gl.deleteProgram(p.program);
 for(const b of Object.values(buffers))gl.deleteBuffer(b);
 for(const tex of [texture,emblemTexture,flowTexture,fxTexture,bgTexture,bloomTexture])if(tex)gl.deleteTexture(tex);
 for(const buffer of [fxBuffer,bgBuffer,bloomBuffer])if(buffer)gl.deleteFramebuffer(buffer);
}
addEventListener('pagehide',(e)=>{cancelAnimationFrame(raf);if(!e.persisted)dispose();});
addEventListener('pageshow',(e)=>{if(e.persisted&&ready){last=0;raf=requestAnimationFrame(tick);}});

window.atlasLab={
 get ready(){return ready;},seek,replay,
 pause(){playing=false;holding=false;render();},
 set(name,value){tuning.set(name,value);},
 exportSettings(){return tuning.exportObject();},
 get state(){return {time,stage:stageAt(time),playing,settings:{...settings},timing:timing(settings),layout:[...layout],wordmarkOffset,resolution:[canvas.width,canvas.height]};},
 get performance(){const avg=a=>a.reduce((x,y)=>x+y,0)/(a.length||1),p95=a=>[...a].sort((x,y)=>x-y)[Math.floor(a.length*.95)]||0;const debug=gl?.getExtension('WEBGL_debug_renderer_info');return {fps:1000/avg(frameTimes),frameP95Ms:p95(frameTimes),cpuSubmissionMs:avg(drawTimes),cpuP95Ms:p95(drawTimes),frames:frame,samples:frameTimes.length,renderer:gl?.getParameter(debug?debug.UNMASKED_RENDERER_WEBGL:gl.RENDERER)};},
};

async function init(){
 gl=canvas.getContext('webgl2',{alpha:false,antialias:false,depth:false,stencil:false,powerPreference:'high-performance',preserveDrawingBuffer:true});
 if(!gl)throw new Error('WebGL 2 is required.');
 programs={background:compile(shaders.vertex,shaders.background),logo:compile(shaders.logoVertex,shaders.logo),ribbon:compile(shaders.ribbonVertex,shaders.ribbon),particle:compile(shaders.particleVertex,shaders.particle),bloom:compile(shaders.vertex,shaders.bloom),copy:compile(shaders.vertex,shaders.copy)};
 buffers.quad=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffers.quad);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);buffers.dynamic=gl.createBuffer();
 const image=new Image();image.src='./assets/atlas-reference-b.jpg';await image.decode();
 texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,image);
 gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 // Premultiply BEFORE filtering/mipmap generation. Hidden RGB must never bleed
 // into transparent contours, and coverage must be applied exactly once.
 const emblem=new Image();emblem.src='./assets/atlas-transparent.png';await emblem.decode();
 emblemTexture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,emblemTexture);
 gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);
 gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,emblem);
 gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,false);
 gl.generateMipmap(gl.TEXTURE_2D);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);
 const magic=new Image();magic.src='./assets/magic-reference-c.jpg';await magic.decode();
 flowTexture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,flowTexture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGB,gl.RGB,gl.UNSIGNED_BYTE,magic);gl.generateMipmap(gl.TEXTURE_2D);
 gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR_MIPMAP_LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.MIRRORED_REPEAT);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.MIRRORED_REPEAT);
 ready=true;resize();
 if(query.has('t'))seek(+query.get('t'));else if(reducedMotion.matches)seek(timing(settings).end);
 render();raf=requestAnimationFrame(tick);
}
init().catch(fail);
