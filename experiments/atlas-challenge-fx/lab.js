import {drawChallengeParticles} from './canvas-particles.js';
import {drawExitVisual} from './exit-visuals.js';
import {groups,defaults,validate,schedule} from './settings.js';
import {createTransferAudio} from './transfer-audio.js';
import {createWebGPU} from './webgpu.js';
const $=id=>document.getElementById(id), KEY='atlas-challenge-fx-lab-v2', W=1007,H=724,TAU=Math.PI*2;
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v)),mix=(a,b,t)=>a+(b-a)*t,smooth=v=>{v=clamp(v);return v*v*(3-2*v);},rand=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};
let s=defaults();try{s=validate(JSON.parse(localStorage.getItem(KEY))||s);}catch{ $('notice').textContent='Storage unavailable; export to keep settings'; }
let time=0,idle=0,playing=true,active=-1,lastActive=0,queue=[],demo=false,last=0,hover=-1;
let awaiting=false,moveOnTransfer=false,walk=null,exitTime=null,unlockedTime=null;
const completed=new Set();
// Desired layout is shared with the editor; the rendered actor eases toward it.
// The carrier endpoint is always this SAME rendered actor, never a captured destination.
let actor=position('sven'),bend=[...actor];
const canvas=$('fx'),ctx=canvas.getContext('2d'),stage=$('stage'),popup=$('popup');
const gpuCanvas=document.createElement('canvas');gpuCanvas.id='fx-gpu';gpuCanvas.hidden=true;gpuCanvas.setAttribute('aria-label','WebGPU magical effects');canvas.after(gpuCanvas);
const gpu=createWebGPU(gpuCanvas,message=>$('renderer-status').textContent=message);
$('renderer-mode').onchange=()=>{s.renderer.mode=$('renderer-mode').value;sync();persist();};
window.addEventListener('pagehide',()=>gpu.dispose());
window.addEventListener('pageshow',event=>{if(event.persisted)gpu.resume();});
const transferAudio=createTransferAudio(notice);
let sequenceId=0;
document.addEventListener('pointerdown',transferAudio.unlock,{capture:true});
document.addEventListener('keydown',transferAudio.unlock,{capture:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden)transferAudio.stop();});
window.addEventListener('pagehide',transferAudio.stop);
function notice(text){$('notice').textContent=text;}
function persist(){try{localStorage.setItem(KEY,JSON.stringify(s));notice('Settings saved on this device');}catch{notice('Storage unavailable; use Export');}}
const bindings=[];
function control(parent,g,k){const d=groups[g].fields[k];if(d.legacy)return;const row=document.createElement('div');row.className='control';const label=document.createElement('label');label.textContent=d.label;const input=document.createElement(d.options?'select':'input');input.id=`${g}-${k}-${bindings.length}`;label.htmlFor=input.id;row.append(label,input);let range;
 if(d.options){for(const[value,text]of Object.entries(d.options)){const option=document.createElement('option');option.value=value;option.textContent=text;input.append(option);}input.value=s[g][k];input.onchange=()=>{s[g][k]=input.value;sync();persist();};bindings.push({g,k,input,row,label});parent.append(row);return;}
 if(typeof d.value==='boolean'){input.type='checkbox';input.checked=s[g][k];}else{input.type='number';for(const key of ['min','max','step'])input[key]=d[key];input.value=s[g][k];range=document.createElement('input');range.type='range';range.setAttribute('aria-label',d.label);for(const key of ['min','max','step'])range[key]=d[key];range.value=s[g][k];row.append(range);}
 const update=e=>{if(input.type==='checkbox')s[g][k]=input.checked;else{if(e.target.value==='')return;s[g][k]=clamp(Number(e.target.value),d.min,d.max);}if(g==='layout'&&(k==='svenX'||k==='svenY'))walk=null;sync();persist();};input.addEventListener('input',update);range?.addEventListener('input',update);bindings.push({g,k,input,range,row,label});parent.append(row);
}
for(const[g,def]of Object.entries(groups)){const details=document.createElement('details');details.className='group';details.open=g==='marker';const summary=document.createElement('summary');summary.textContent=def.title;details.append(summary);if(def.hint){const hint=document.createElement('p');hint.className='control-hint';hint.textContent=def.hint;details.append(hint);}for(const k of Object.keys(def.fields))control(details,g,k);if(g==='timing'){const hint=document.createElement('p');hint.textContent='Seconds below share the screen, transfer and receive settings. Total duration scales the preview. Individual popups wait for Complete. Release and transfer share the close boundary.';hint.style='font-size:11px;color:#829783;line-height:1.5';details.append(hint);for(const[a,b]of [['screen','show'],['screen','hold'],['screen','close'],['flow','duration'],['exit','delay'],['exit','duration']])control(details,a,b);} $('controls').append(details);}
function sync(){for(const b of bindings){const def=groups[b.g].fields[b.k],style=def.style,isGPU=s.renderer.mode==="webgpu";b.label.textContent=(isGPU?def.gpuLabel:def.canvasLabel)||def.label;b.range?.setAttribute("aria-label",b.label.textContent);b.row.hidden=(!!style&&style!==s.exit.style&&!(def.canvasBoth&&!isGPU))||(isGPU?def.gpuHide:def.canvasHide);if(def.canvasOptions)for(const option of b.input.options)option.textContent=(isGPU?def.options:def.canvasOptions)[option.value];if(b.input.type==='checkbox')b.input.checked=s[b.g][b.k];else{b.input.value=s[b.g][b.k];if(b.range)b.range.value=s[b.g][b.k];}}$('renderer-mode').value=s.renderer.mode;gpu.select(s.renderer.mode);layout();}
function position(name){return[s.layout[name+'X']/100*W,s.layout[name+'Y']/100*H];}
const anchorNames=['c1','c2','c3','exit','sven'];
anchorNames.forEach((name,i)=>{const b=document.createElement('button');b.className='anchor'+(i===3?' exit':i===4?' player':'');b.setAttribute('aria-label',i<3?`Trigger challenge ${i+1}`:`Move ${name}`);b.innerHTML=`<span>${i<3?'0'+(i+1)+' / KNOWLEDGE':i===3?'EXIT / RUNE':'SVEN'}</span>`;let drag=null;
 b.onpointerenter=()=>hover=i;b.onpointerleave=()=>hover=-1;b.onpointerdown=e=>{if(!s.layout.edit)return;if(name==='sven')walk=null;drag={x:e.clientX,y:e.clientY};b.setPointerCapture(e.pointerId);move(e);};function move(e){if(!drag)return;const r=stage.getBoundingClientRect();s.layout[name+'X']=Math.round(clamp((e.clientX-r.left)/r.width)*1000)/10;s.layout[name+'Y']=Math.round(clamp((e.clientY-r.top)/r.height)*1000)/10;sync();}b.onpointermove=move;b.onpointerup=()=>{if(drag){drag=null;persist();}};b.onpointercancel=()=>drag=null;b.onclick=()=>{if(!s.layout.edit&&i<3)trigger(i);};$('anchors').append(b);});
function layout(){$('sven').style.left=actor[0]/W*100+'%';$('sven').style.top=actor[1]/H*100+'%';$('sven').style.width=s.layout.svenSize+'%';[...$('anchors').children].forEach((b,i)=>{const p=i===4?actor:position(anchorNames[i]);b.style.left=p[0]/W*100+'%';b.style.top=p[1]/H*100+'%';b.classList.toggle('edit',s.layout.edit);});popup.style.left=s.layout.popupX+'%';popup.style.top=s.layout.popupY+'%';}
function resize(){const r=stage.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);}
new ResizeObserver(resize).observe(stage);
function trigger(i,keepQueue=false){transferAudio.stop();sequenceId++;if(!keepQueue)queue=[];active=i;lastActive=i;time=0;awaiting=!keepQueue;moveOnTransfer=false;playing=true;setPause();}
function setPause(){$('pause').textContent=playing?'Pause':'Resume';}
document.querySelectorAll('[data-trigger]').forEach(b=>b.onclick=()=>trigger(Number(b.dataset.trigger)));
$('replay').onclick=()=>trigger(lastActive);$('pause').onclick=()=>{playing=!playing;setPause();};$('reset').onclick=()=>{active=-1;time=0;queue=[];demo=false;awaiting=false;walk=null;moveOnTransfer=false;exitTime=null;unlockedTime=null;completed.clear();$('demo').checked=false;playing=true;setPause();};$('sequential').onclick=()=>{queue=[1,2];trigger(0,true);};$('demo').onchange=e=>{demo=e.target.checked;if(demo){queue=[1,2];trigger(0,true);}};
$('editor-toggle').onclick=()=>{const hidden=document.body.classList.toggle('editor-hidden');$('editor-toggle').textContent=hidden?'Show editor':'Hide editor';$('editor-toggle').setAttribute('aria-expanded',String(!hidden));};
$('scrub').oninput=e=>{if(active<0)active=lastActive;const q=schedule(s),end=q.end*q.scale;time=Number(e.target.value);if(Math.abs(time-end)<.0051)time=end;awaiting=false;playing=false;setPause();};
function complete(){if(active<0)return;awaiting=false;time=schedule(s).close*schedule(s).scale;playing=true;setPause();}
$('complete').onclick=complete;
function startWalk(){walk={from:s.layout.svenX,to:s.layout.svenX<55?Math.min(85,s.layout.svenX+27):Math.max(15,s.layout.svenX-27),elapsed:0,duration:Math.max(.35,Math.min(1.25,s.flow.duration*schedule(s).scale*.75))};playing=true;setPause();}
$('walk').onclick=startWalk;
$('moving-transfer').onclick=()=>{const q=schedule(s),t=time/q.scale;if(active>=0&&t>=q.transfer&&t<q.arrive){startWalk();return;}trigger(lastActive);complete();moveOnTransfer=true;};
function playExit(){exitTime=0;playing=true;setPause();}
$('exit-play').onclick=playExit;$('exit-replay').onclick=playExit;$('exit-reset').onclick=()=>{exitTime=null;};
function exported(){return JSON.stringify({schema:'atlas-challenge-fx/v1',settings:s},null,2);}
$('copy').onclick=async()=>{try{await navigator.clipboard.writeText(exported());notice('Settings JSON copied');}catch{notice('Clipboard unavailable; use Export');}};
$('export').onclick=()=>{const url=URL.createObjectURL(new Blob([exported()],{type:'application/json'})),a=document.createElement('a');a.href=url;a.download='atlas-challenge-fx.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};$('import').onclick=()=>$('file').click();$('file').onchange=async e=>{try{const data=JSON.parse(await e.target.files[0].text());if(data.schema!=='atlas-challenge-fx/v1'||!data.settings)throw Error('format');s=validate(data.settings);sync();persist();notice('Settings imported');}catch{notice('Could not import: expected an Atlas Challenge FX JSON export');}e.target.value='';};$('defaults').onclick=()=>{s=defaults();sync();persist();};
// Atlas intro reference: one carrier field for sheets, filaments, nodes and dust.
// This independent CPU ribbon mesh keeps production shaders and GPU resources untouched.
function path(u,t,strand=0){const f=s.flow,A=position('c'+(active+1)),B=receive(),v=clamp(u),en=Math.sin(v*Math.PI),phase=t*.9*f.speed+strand*1.7;const sm=mix(v,smooth(v),f.smoothing*.35),lag=en*v*.8;return[mix(A[0],B[0],sm)+(bend[0]-actor[0])*lag+Math.sin(v*TAU+strand)*en*18*f.curvature+Math.sin(v*8*f.frequency+phase)*en*7*f.turbulence,mix(A[1],B[1],sm)+(bend[1]-actor[1])*lag-en*f.arc*f.curvature+Math.sin(v*9*f.frequency-phase)*en*9*f.turbulence+Math.sin(strand*7.13+v*5+t*.25)*en*14*f.spread*f.depth];}
function receive(){return[actor[0],actor[1]-s.layout.svenSize/100*W*.69];}
function glow(x,y,r,gain,color='cyan'){if(gpu.ready)return;if(r<=0||gain<=0)return;const rgb=color==='gold'?'255,204,112':'78,233,233';const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(${rgb},${clamp(gain*.48)})`);g.addColorStop(.23,`rgba(${rgb},${clamp(gain*.19)})`);g.addColorStop(1,`rgba(${rgb},0)`);ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);}
function dot(x,y,r,alpha,gold=true){if(gpu.ready)return;ctx.globalAlpha=clamp(alpha);ctx.fillStyle=gold?'#ffe1a0':'#bcfffb';ctx.beginPath();ctx.arc(x,y,Math.max(.1,r),0,TAU);ctx.fill();ctx.globalAlpha=1;}
function marker(i,t,stage,boost=1){if(gpu.ready)return;drawChallengeParticles(ctx,s.marker,s.renderer,i,position('c'+(i+1)),t,stage,boost,(u,strand)=>path(u,time/schedule(s).scale,strand));}
function transfer(t,p){if(gpu.ready)return;const f=s.flow,head=p,tail=f.trail,env=smooth(p*14)*(1-smooth((p-.96)/.04))*f.intensity;const lo=Math.max(0,head-tail),hi=Math.min(1,head);if(hi<=lo)return;
 for(let k=0;k<f.count;k++){const pts=[],n=90;for(let j=0;j<=n;j++){const u=mix(lo,hi,j/n),a=path(u,t,k),b=path(u+.001,t,k),len=Math.hypot(b[0]-a[0],b[1]-a[1])||1,twist=.65+.35*Math.sin(u*15-t*.8+k),width=(k%3===0?15:k%3===1?7:2.5)*f.width*Math.sin(j/n*Math.PI)*twist;pts.push({x:a[0],y:a[1],nx:-(b[1]-a[1])/len*width,ny:(b[0]-a[0])/len*width});}
  for(let layer=0;layer<3;layer++){const side=1-layer*.3;ctx.beginPath();pts.forEach((a,j)=>j?ctx.lineTo(a.x+a.nx*side,a.y+a.ny*side):ctx.moveTo(a.x+a.nx*side,a.y+a.ny*side));[...pts].reverse().forEach(a=>ctx.lineTo(a.x-a.nx*side,a.y-a.ny*side));ctx.closePath();ctx.fillStyle=`rgba(49,218,226,${clamp(env*f.opacity*(.048+layer*.018)/(1+k*.08))})`;ctx.fill();}
  ctx.beginPath();pts.forEach((a,j)=>j?ctx.lineTo(a.x+a.nx*.7,a.y+a.ny*.7):ctx.moveTo(a.x+a.nx*.7,a.y+a.ny*.7));ctx.lineWidth=.65;ctx.strokeStyle=`rgba(148,255,248,${clamp(env*f.opacity*.42)})`;ctx.stroke();
 }
 for(let k=0;k<Math.round(f.wisps*14);k++){const u=mix(lo,hi,rand(k+600)),pt=path(u,t,k*.7);glow(pt[0],pt[1],(12+rand(k)*23)*f.width,env*f.wispOpacity*.13);}
 for(let k=0;k<Math.round(380*f.dust);k++){const z=(rand(k)+t*.18*f.speed)%1,u=mix(lo,hi,z),a=path(u,t,k%17),spread=10*f.spread*Math.sin(u*Math.PI),fade=Math.sin(z*Math.PI);dot(a[0]+(rand(k+3)-.5)*spread,a[1]+(rand(k+33)-.5)*spread,(.35+rand(k+56)**5*1.6)*f.particleSize,env*fade*f.particleBrightness*(.2+rand(k+23)*.55));}
 for(let k=0;k<f.hotspots;k++){const u=mix(lo,hi,(t*.21*f.speed+k/Math.max(1,f.hotspots))%1),a=path(u,t,k),brightness=env*f.hotspotBrightness;glow(a[0],a[1],18*f.glow,brightness*.65);dot(a[0],a[1],1.6,brightness,false);}
 const end=path(Math.min(1,head),t);glow(end[0],end[1],32*f.glow,env*.45);
}
function burst(point,t,duration,gain,radius,gold=1){if(gpu.ready)return;if(t<0||t>duration)return;const p=t/duration,env=Math.sin(Math.PI*p)*(1-p);glow(...point,radius*(.65+p),gain*env);for(let i=0;i<Math.round(48*gold);i++){const a=rand(i+90)*TAU,r=radius*(.1+rand(i+14)*.8)*(1-p);dot(point[0]+Math.cos(a)*r,point[1]+Math.sin(a)*r,.5+rand(i+13),env*gain,true);}}
function drawExit(elapsed){if(gpu.ready)return;drawExitVisual(ctx,s.exit,elapsed,position('exit'),{rand,smooth},s.renderer);}
// Reuse the sequence clock and completion set: -1 = idle, 0..1 = travelling,
// 2 = consumed. An explicit replay/scrub previews the active challenge again.
function stardustStages(q,t){return [0,1,2].map(i=>{
 if(i===active){if(awaiting||t<q.transfer)return -1;return t<q.arrive?clamp((t-q.transfer)/s.flow.duration):2;}
 return completed.has(i)?2:-1;
});}
const phaseNames=['Appear','Hold','Close','Transfer','Absorb','Gate'];$('phases').innerHTML=phaseNames.map(x=>`<span>${x}</span>`).join('');
function render(){const q=schedule(s),t=time/q.scale,total=q.end*q.scale;ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);ctx.globalCompositeOperation='lighter';const stages=stardustStages(q,t);for(let i=0;i<3;i++)marker(i,idle,stages[i],i===hover||i===active&&t<q.appear?s.marker.highlight:1);let phase='Idle vessels',pi=-1;
 transferAudio.sync(active>=0&&!awaiting&&playing&&!document.hidden&&t>=q.transfer&&t<q.arrive?sequenceId:null,Math.max(0,time-q.transfer*q.scale),Math.max(0,q.arrive*q.scale-time));
 if(active>=0){pi=t<q.hold?0:t<q.close||awaiting?1:t<q.transfer?2:t<q.absorb?3:t<q.settled?4:5;phase=t>=q.end?'Settled':(awaiting&&t>=q.hold?'Awaiting completion':phaseNames[pi])+' · Challenge '+(active+1);const showing=smooth((t-q.appear)/s.screen.show),closing=awaiting?0:smooth((t-q.close)/s.screen.close),vis=showing*(1-closing);popup.style.visibility=vis>.001?'visible':'hidden';popup.style.opacity=vis*s.screen.opacity;popup.style.pointerEvents=vis>.5?'auto':'none';const target=position('c'+(active+1)),px=s.layout.popupX/100*W,py=s.layout.popupY/100*H;popup.style.transform=`translate(calc(-50% + ${(target[0]-px)*closing/W*stage.clientWidth}px),calc(-50% + ${(target[1]-py)*closing/H*stage.clientHeight}px)) scale(${s.screen.scale*(.9+.1*showing)*(1-closing*.94)})`;popup.style.filter=`drop-shadow(0 0 ${15*s.screen.glow}px #51dcd555)`;
  if(t>=q.close&&t<q.release)glow(...target,55,s.flow.burst*(1-Math.abs(clamp((t-q.close)/(q.release-q.close))*2-1)));
  burst(target,t-q.release,Math.min(.45,s.flow.duration*.25),s.flow.burst,55,.8);
  if(t>=q.transfer&&t<=q.arrive)transfer(t,clamp((t-q.transfer)/s.flow.duration));
  if(t>=q.absorb&&t<=q.settled){const a=s.absorb,p=(t-q.absorb)/(q.settled-q.absorb),env=Math.sin(Math.PI*p)*(1-p),r=a.radius*(1+a.pulse*.3*Math.sin(p*Math.PI));glow(...receive(),r,a.intensity*a.cyan*env*1.5);burst(receive(),t-q.absorb,q.settled-q.absorb,a.intensity*a.burst,a.radius,a.gold);}
 }else{popup.style.visibility='hidden';popup.style.pointerEvents='none';}
 const visibleExit=exitTime??(s.exit.enabled?unlockedTime:null);if(visibleExit!==null)drawExit(visibleExit);
 $('exit-status').textContent=exitTime!==null?'Exit preview':unlockedTime!==null?(s.exit.enabled?'Exit ready · 3/3':'Exit hidden · 3/3'):`Exit locked · ${completed.size}/3`;
 const gpuDrawn=gpu.render({s,idle,t,anchors:[0,1,2].map(i=>position('c'+(i+1))),source:active>=0?position('c'+(active+1)):receive(),target:receive(),bend,
  progress:active>=0&&!awaiting&&t>=q.transfer&&t<=q.arrive?clamp((t-q.transfer)/s.flow.duration):-1,
  exit:visibleExit,exitAnchor:position('exit'),markerStages:stages,highlights:[0,1,2].map(i=>i===hover||i===active&&t<q.appear?s.marker.highlight:1)});
 canvas.hidden=gpuDrawn;gpuCanvas.hidden=!gpuDrawn;
 ctx.globalCompositeOperation='source-over';$('phase').textContent=phase;$('clock').value=`${time.toFixed(2)} / ${total.toFixed(2)} s`;$('scrub').max=total;$('scrub').value=Math.min(time,total);[...$('phases').children].forEach((el,i)=>el.classList.toggle('active',i===pi&&t<q.end));stage.dataset.phase=phase;
}
function frame(now){const dt=last?Math.min((now-last)/1000,.1):0;last=now;if(playing&&!document.hidden){idle+=dt;
 if(active>=0){const q=schedule(s);time=Math.min(time+dt,(awaiting?q.hold:q.end)*q.scale);if(moveOnTransfer&&time>=q.transfer*q.scale){moveOnTransfer=false;startWalk();}if(!awaiting&&time>=q.settled*q.scale)completed.add(active);if(completed.size===3&&unlockedTime===null&&time>=q.gate*q.scale)unlockedTime=0;if(!awaiting&&time>=q.end*q.scale){if(queue.length)trigger(queue.shift(),true);else if(demo){queue=[1,2];trigger(0,true);}}}
 if(walk){walk.elapsed+=dt;s.layout.svenX=mix(walk.from,walk.to,smooth(walk.elapsed/walk.duration));if(walk.elapsed>=walk.duration){walk=null;persist();}sync();}
 const desired=position('sven'),follow=1-Math.exp(-dt*14),inertia=1-Math.exp(-dt*5);for(let i=0;i<2;i++){actor[i]=mix(actor[i],desired[i],follow);bend[i]=mix(bend[i],actor[i],inertia);}layout();
 if(exitTime!==null)exitTime+=dt;if(unlockedTime!==null)unlockedTime+=dt;
 }render();requestAnimationFrame(frame);}
// Read-only diagnostics used by regression tests alongside actual screenshots.
export function inspect(){const q=schedule(s);return{time,markerStages:stardustStages(q,time/q.scale),phase:$('phase').textContent,awaiting,actor:[...actor],chest:receive(),endpoint:active<0?null:path(1,time/q.scale),middle:active<0?null:path(.5,time/q.scale),exitTime,unlockedTime,completed:[...completed],audio:transferAudio.inspect(),schedule:q,settings:structuredClone(s)};}
export const inspectGPU=()=>gpu.inspect();
export const readGPU=region=>gpu.readback(region);
document.addEventListener('visibilitychange',()=>last=0);sync();resize();requestAnimationFrame(frame);


