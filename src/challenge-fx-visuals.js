(function () {
  const TAU = Math.PI * 2,
    clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)),
    mix = (a, b, t) => a + (b - a) * t,
    smooth = v => {
      v = clamp(v);
      return v * v * (3 - 2 * v);
    },
    rand = i => {
      const v = Math.sin(i * 127.1 + 311.7) * 43758.5453;
      return v - Math.floor(v);
    };
  // Approved lab motes, owned locally so production never imports the lab.
const sprites=new Map();
function sprite(gold){
 if(sprites.has(gold))return sprites.get(gold);
 const c=document.createElement('canvas');c.width=c.height=48;
 const ctx=c.getContext('2d'),g=ctx.createRadialGradient(24,24,0,24,24,24),rgb=gold?'255,196,86':'74,229,235';
 g.addColorStop(0,gold?'#fff8df':'#e7fffe');g.addColorStop(.09,gold?'#fff0b9':'#c6fffb');
 g.addColorStop(.22,`rgba(${rgb},.68)`);g.addColorStop(.5,`rgba(${rgb},.14)`);g.addColorStop(1,`rgba(${rgb},0)`);
 ctx.fillStyle=g;ctx.fillRect(0,0,48,48);sprites.set(gold,c);return c;
}
function drawMote(ctx,x,y,r,gain,gold,finish){
 if(gain<=0)return;
 const extent=r*(2.2+finish.bloom*1.3);
 ctx.globalAlpha=clamp(gain*finish.exposure*.68);
 ctx.drawImage(sprite(gold),x-extent,y-extent,extent*2,extent*2);
 ctx.globalAlpha=1;
}
// Stable seeds preserve particle identity through release, scrubbing and replay.
function challengeMotes(m,finish,index,point,time,stage,boost=1,carrier=null){
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
function drawChallengeParticles(ctx,m,finish,index,point,time,stage,boost,carrier){
 for(const p of challengeMotes(m,finish,index,point,time,stage,boost,carrier))drawMote(ctx,p.x,p.y,p.r,p.gain,p.gold,finish);
}

function drawExitVisual(ctx,e,elapsed,point,{rand,smooth},finish){
 if(elapsed<0)return;
 const [x,y]=point,opening=smooth(elapsed/e.duration*2),breath=1+.07*Math.sin(elapsed*1.3)*e.pulse;
 const t=elapsed*e.speed,count=Math.min(2400,Math.round(360*e.particles*finish.richness));
 for(let i=0;i<count;i++){
  const gold=i%16!==0,amount=gold?finish.goldParticles:finish.cyanParticles;
  if(rand(i+907)>=amount/3)continue;
  const k=i+6100,depth=rand(k+87),a=rand(k)*Math.PI*2,r=Math.sqrt(rand(k+29));
  const drift=Math.sin(t*.73+k)*.12*e.turbulence;
  let px=Math.cos(a)*r,py=Math.sin(a)*r;
  px+=Math.sin(t*.62+k*.71)*(.09+e.wisps*.035)+drift;
  py+=Math.cos(t*.47+k*.37)*(.08+e.wisps*.025);
  const edge=1;
  const twinkle=.5+.5*Math.pow(.5+.5*Math.sin(elapsed*(.65+rand(k+31))+k),3);
  const gain=1.2*opening*breath*edge*twinkle*(gold?e.gold:e.cyan*3)*(.7+.3*e.glow);
  const size=(.45+Math.pow(depth,8)*2.1)*finish.moteSize*(1+Math.pow(depth,12)*finish.depth*.4);
  drawMote(ctx,x+px*e.radius,y+py*e.radius*e.ellipse,size,gain,gold,finish);
 }
}

  function paint(ctx, s, scene, sequence, clock) {
    const anchors = scene.anchors || scene.markers,
      actor = scene.player,
      bend = sequence?.bend || actor,
      origin = sequence?.origin || actor;
    function path(u, t, strand = 0) {
      const f = s.flow,
        A = origin,
        B = receive(),
        v = clamp(u),
        en = Math.sin(v * Math.PI),
        phase = t * .9 * f.speed + strand * 1.7;
      const sm = mix(v, smooth(v), f.smoothing * .35),
        lag = en * v * .8;
      return [mix(A[0], B[0], sm) + (bend[0] - actor[0]) * lag + Math.sin(v * TAU + strand) * en * 18 * f.curvature + Math.sin(v * 8 * f.frequency + phase) * en * 7 * f.turbulence, mix(A[1], B[1], sm) + (bend[1] - actor[1]) * lag - en * f.arc * f.curvature + Math.sin(v * 9 * f.frequency - phase) * en * 9 * f.turbulence + Math.sin(strand * 7.13 + v * 5 + t * .25) * en * 14 * f.spread * f.depth];
    }
    function receive() {
      return actor;
    }
    function glow(x, y, r, gain, color = 'cyan') {
      if (r <= 0 || gain <= 0) return;
      const rgb = color === 'gold' ? '255,204,112' : '78,233,233';
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${rgb},${clamp(gain * .48)})`);
      g.addColorStop(.23, `rgba(${rgb},${clamp(gain * .19)})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    }
    function dot(x, y, r, alpha, gold = true) {
      ctx.globalAlpha = clamp(alpha);
      ctx.fillStyle = gold ? '#ffe1a0' : '#bcfffb';
      ctx.beginPath();
      ctx.arc(x, y, Math.max(.1, r), 0, TAU);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    function marker(anchor, stage = -1, boost = 1) {
      const index=Math.max(0,anchors.findIndex(a=>a.id===anchor.id));
      drawChallengeParticles(ctx,s.marker,s.renderer,index,[anchor.x,anchor.y],clock,stage,boost,(u,strand)=>path(u,sequence?.age||0,strand));
    }
    function transfer(t, p) {
      const f = s.flow,
        head = p,
        tail = f.trail,
        env = smooth(p * 14) * (1 - smooth((p - .96) / .04)) * f.intensity;
      const lo = Math.max(0, head - tail),
        hi = Math.min(1, head);
      if (hi <= lo) return;
      for (let k = 0; k < f.count; k++) {
        const pts = [],
          n = 90;
        for (let j = 0; j <= n; j++) {
          const u = mix(lo, hi, j / n),
            a = path(u, t, k),
            b = path(u + .001, t, k),
            len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1,
            twist = .65 + .35 * Math.sin(u * 15 - t * .8 + k),
            width = (k % 3 === 0 ? 15 : k % 3 === 1 ? 7 : 2.5) * f.width * Math.sin(j / n * Math.PI) * twist;
          pts.push({
            x: a[0],
            y: a[1],
            nx: -(b[1] - a[1]) / len * width,
            ny: (b[0] - a[0]) / len * width
          });
        }
        for (let layer = 0; layer < 3; layer++) {
          const side = 1 - layer * .3;
          ctx.beginPath();
          pts.forEach((a, j) => j ? ctx.lineTo(a.x + a.nx * side, a.y + a.ny * side) : ctx.moveTo(a.x + a.nx * side, a.y + a.ny * side));
          [...pts].reverse().forEach(a => ctx.lineTo(a.x - a.nx * side, a.y - a.ny * side));
          ctx.closePath();
          ctx.fillStyle = `rgba(49,218,226,${clamp(env * f.opacity * (.048 + layer * .018) / (1 + k * .08))})`;
          ctx.fill();
        }
        ctx.beginPath();
        pts.forEach((a, j) => j ? ctx.lineTo(a.x + a.nx * .7, a.y + a.ny * .7) : ctx.moveTo(a.x + a.nx * .7, a.y + a.ny * .7));
        ctx.lineWidth = .65;
        ctx.strokeStyle = `rgba(148,255,248,${clamp(env * f.opacity * .42)})`;
        ctx.stroke();
      }
      for (let k = 0; k < Math.round(f.wisps * 14); k++) {
        const u = mix(lo, hi, rand(k + 600)),
          pt = path(u, t, k * .7);
        glow(pt[0], pt[1], (12 + rand(k) * 23) * f.width, env * f.wispOpacity * .13);
      }
      for (let k = 0; k < Math.round(380 * f.dust); k++) {
        const z = (rand(k) + t * .18 * f.speed) % 1,
          u = mix(lo, hi, z),
          a = path(u, t, k % 17),
          spread = 10 * f.spread * Math.sin(u * Math.PI),
          fade = Math.sin(z * Math.PI);
        dot(a[0] + (rand(k + 3) - .5) * spread, a[1] + (rand(k + 33) - .5) * spread, (.35 + rand(k + 56) ** 5 * 1.6) * f.particleSize, env * fade * f.particleBrightness * (.2 + rand(k + 23) * .55));
      }
      for (let k = 0; k < f.hotspots; k++) {
        const u = mix(lo, hi, (t * .21 * f.speed + k / Math.max(1, f.hotspots)) % 1),
          a = path(u, t, k),
          brightness = env * f.hotspotBrightness;
        glow(a[0], a[1], 18 * f.glow, brightness * .65);
        dot(a[0], a[1], 1.6, brightness, false);
      }
      const end = path(Math.min(1, head), t);
      glow(end[0], end[1], 32 * f.glow, env * .45);
    }
    function burst(point, t, duration, gain, radius, gold = 1) {
      if (t < 0 || t > duration) return;
      const p = t / duration,
        env = Math.sin(Math.PI * p) * (1 - p);
      glow(...point, radius * (.65 + p), gain * env);
      for (let i = 0; i < Math.round(48 * gold); i++) {
        const a = rand(i + 90) * TAU,
          r = radius * (.1 + rand(i + 14) * .8) * (1 - p);
        dot(point[0] + Math.cos(a) * r, point[1] + Math.sin(a) * r, .5 + rand(i + 13), env * gain, true);
      }
    }

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    scene.markers.forEach(anchor => marker(anchor, -1, anchor.highlight ? s.marker.highlight : 1));
    if (sequence) {
      const t = sequence.age;
      if (sequence.releaseMarker !== false && t < s.flow.duration) {
        marker({id:sequence.runeId,x:origin[0],y:origin[1]},t/s.flow.duration);
      }
      if (t < s.flow.duration) transfer(t, t / s.flow.duration);
    }
    if (scene.exit) drawExitVisual(ctx, s.exit, clock, scene.exit, {
      rand, smooth
    },s.renderer);
    // The high-DPI DOM overlay also covers GPU-composited characters. Remove
    // world FX through the current decoded sprite alpha, not its rectangular box.
    if (scene.occluder) {
      const o = scene.occluder;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      ctx.drawImage(o.image, o.x, o.y, o.width, o.height);
      ctx.restore();
    }
    // Absorption belongs on Sven; it is intentionally drawn after world occlusion.
    if (sequence) {
      const elapsed = sequence.age - s.flow.duration,
        duration = s.timing.absorbDuration + s.absorb.settle;
      if (elapsed >= 0 && elapsed < duration) {
        const a = s.absorb,
          p = elapsed / duration,
          env = Math.sin(Math.PI * p) * (1 - p);
        glow(...actor, a.radius * (1 + a.pulse * .3 * Math.sin(p * Math.PI)), a.intensity * a.cyan * env * 1.5);
        burst(actor, elapsed, duration, a.intensity * a.burst, a.radius, a.gold);
      }
    }
    ctx.restore();
  }
  window.AtlasChallengeFxVisuals = {
    paint
  };
})();
