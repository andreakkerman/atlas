import {drawMote} from './canvas-particles.js';
// A filled enchanted volume, with independent drifting seeds rather than spiral arms.
// Existing style values are retained for old exports and the WebGPU comparison.
export function drawExitVisual(ctx,e,elapsed,point,{rand,smooth},finish){
 if(elapsed<0)return;
 const [x,y]=point,opening=smooth(elapsed/e.duration*2),breath=1+.07*Math.sin(elapsed*1.3)*e.pulse;
 const t=elapsed*e.speed,count=Math.min(2400,Math.round(360*e.particles*finish.richness));
 for(let i=0;i<count;i++){
  const gold=i%16!==0,amount=gold?finish.goldParticles:finish.cyanParticles;
  if(rand(i+907)>=amount/3)continue;
  const k=i+6100,depth=rand(k+87),a=rand(k)*Math.PI*2,r=Math.sqrt(rand(k+29));
  const drift=Math.sin(t*.73+k)*.12*e.turbulence;
  let px=Math.cos(a)*r,py=Math.sin(a)*r;
  // Two calm cloud moods, neither linked angle/radius nor a rotating disk.
  if(e.style==='spiral'){
   const lift=((rand(k+13)+t*.09*(e.direction==='inward'?-1:1))%1+1)%1;
   py=(lift-.5)*1.8;px*=.75+.2*Math.cos(lift*Math.PI*2);
  }
  px+=Math.sin(t*.62+k*.71)*(.09+e.wisps*.035)+drift;
  py+=Math.cos(t*.47+k*.37)*(.08+e.wisps*.025);
  const edge=e.style==='spiral'?Math.pow(Math.max(0,1-Math.abs(py)/1.1),.6):1;
  const twinkle=.5+.5*Math.pow(.5+.5*Math.sin(elapsed*(.65+rand(k+31))+k),3);
  const gain=1.2*opening*breath*edge*twinkle*(gold?e.gold:e.cyan*3)*(.7+.3*e.glow);
  const size=(.45+Math.pow(depth,8)*2.1)*finish.moteSize*(1+Math.pow(depth,12)*finish.depth*.4);
  drawMote(ctx,x+px*e.radius,y+py*e.radius*e.ellipse,size,gain,gold,finish);
 }
}
