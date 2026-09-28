// Lab-only motes: cached soft sprites, never an anchor glow or a stroked shape.
const TAU=Math.PI*2,clamp=x=>Math.max(0,Math.min(1,x));
const smooth=x=>{x=clamp(x);return x*x*(3-2*x);};
const rand=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v);};
const sprites=new Map();
function sprite(gold){
 if(sprites.has(gold))return sprites.get(gold);
 const c=document.createElement('canvas');c.width=c.height=48;
 const ctx=c.getContext('2d'),g=ctx.createRadialGradient(24,24,0,24,24,24),rgb=gold?'255,196,86':'74,229,235';
 g.addColorStop(0,gold?'#fff8df':'#e7fffe');g.addColorStop(.09,gold?'#fff0b9':'#c6fffb');
 g.addColorStop(.22,`rgba(${rgb},.68)`);g.addColorStop(.5,`rgba(${rgb},.14)`);g.addColorStop(1,`rgba(${rgb},0)`);
 ctx.fillStyle=g;ctx.fillRect(0,0,48,48);sprites.set(gold,c);return c;
}
export function drawMote(ctx,x,y,r,gain,gold,finish){
 if(gain<=0)return;
 const extent=r*(2.2+finish.bloom*1.3);
 ctx.globalAlpha=clamp(gain*finish.exposure*.68);
 ctx.drawImage(sprite(gold),x-extent,y-extent,extent*2,extent*2);
 ctx.globalAlpha=1;
}
// Stable seeds preserve particle identity through release, scrubbing and replay.
export function challengeMotes(m,finish,index,point,time,stage,boost=1,carrier=null){
 if(stage>1)return [];
 const motes=[],pulse=1+Math.sin(time*m.pulseSpeed*2.2+index)*m.pulseAmplitude;
 const count=Math.min(3600,Math.round(1260*m.particles*finish.richness));
 for(let n=0;n<count;n++){
  const k=n+index*2400,gold=n%4===0,amount=gold?finish.goldParticles:finish.cyanParticles;
  if(rand(k+703)>=amount/3)continue;
  const depth=rand(k+87),z=rand(k+8),a=rand(k+2)*TAU+time*(.12+.16*depth)*m.pulseSpeed;
  const r=Math.pow(z,.6)*36*m.size*pulse,petal=1+Math.sin(a*3+time*.35+index)*.27*m.wisps;
  const offset=[Math.cos(a)*r*petal,Math.sin(a)*r*.79+Math.sin(k+time*.4)*r*.15];
  let x=point[0]+offset[0],y=point[1]+offset[1];
  let gain=m.intensity*boost*(gold?m.gold:m.cyan)*(.3+.65*rand(k+19))*(.7+.3*m.glow);
  if(stage>=0&&carrier){
   const delay=rand(k+61)*.22,u=clamp((stage-delay)/(1-delay)),p=carrier(u,rand(k+9)*2.6);
   x=p[0]+offset[0]*(1-smooth(u));y=p[1]+offset[1]*(1-smooth(u));
   gain*=1-smooth((u-.94)/.06);
  }
  gain*=.55+.45*Math.pow(.5+.5*Math.sin(time*(.8+rand(k+41))+k),2);
  motes.push({id:k,x,y,r:(.45+Math.pow(depth,9)*1.6)*m.size*finish.moteSize*(1+Math.pow(depth,12)*finish.depth*.4),gain,gold});
 }
 return motes;
}
export function drawChallengeParticles(ctx,m,finish,index,point,time,stage,boost,carrier){
 for(const p of challengeMotes(m,finish,index,point,time,stage,boost,carrier))drawMote(ctx,p.x,p.y,p.r,p.gain,p.gold,finish);
}
