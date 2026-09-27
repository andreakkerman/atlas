// The accepted five-second look. All controls, persistence and exports share
// this schema; renderer values are never maintained in a second UI state.
const control=(key,label,value,min,max,step=.05)=>({key,label,value,min,max,step});
export const groups=[
 ['Global timing',[
  control('totalDuration','Total duration · scales all cues (s)',5,1,60,.1),
  control('emptyDuration','Empty phase / earliest arrival (s)',0,0,8,.05),
  control('arrivalStart','Magic arrival start (s)',0,0,15,.05),
  control('finalHold','Final hold (s)',.4,0,8,.05),
  control('drift','Camera drift',.3,0,1),
 ]],
 ['Magic flow',[
  control('magicIntensity','Overall magic intensity',0.65,0,3),control('cyan','Cyan intensity',1,0,3),control('gold','Gold intensity',1,0,3),
  control('ribbonCount','Ribbon / sheet count',13,0,30,1),control('ribbonWidth','Ribbon width',1,.2,3),control('ribbonOpacity','Ribbon opacity',0.8,0,3),control('ribbonGlow','Ribbon glow',1,0,3),
  control('speed','Flow speed',1,.1,3),control('curvature','Flow curvature',1,.2,2),control('turbulence','Turbulence amount',.65,0,2),control('turbulenceFrequency','Turbulence frequency',1,.2,3),
  control('wispAmount','Wisp / haze amount',1,0,3),control('wispOpacity','Wisp opacity',1,0,3),control('magicSpread','Magic spread / vertical coverage',1,.2,2),control('depth','Depth / layering',1,0,2),
  control('hotspotAmount','Energy hotspot amount',1,0,3),control('hotspotBrightness','Hotspot brightness',0.6,0,3),
 ]],
 ['Gold dust / particles',[
  control('density','Particle density · 1 = 1,500',1.4,0,3),control('particleSize','Particle size',2.3,.25,3),control('particleBrightness','Particle brightness',1.5,0,3),control('particleSpread','Particle spread',1.5,.1,3),
  control('particleSpeed','Particle speed',1,.1,3),control('particleLifetime','Particle lifetime',1,.2,4),control('sparkleFrequency','Sparkle frequency',1,0,5),control('largeSparkles','Large sparkle amount',1,0,3),control('particleMix','Cyan fraction · remaining dust is gold',1/6,0,1,.01),
 ]],
 ['Logo formation',[
  control('formationStart','Formation start (s)',1.05,.05,15,.05),control('formationDuration','Formation duration (s)',1.3,.3,10,.05),
  control('depositionSoftness','Deposition softness',1,.3,3),control('frontWidth','Construction front width',1,.3,3),control('materialization','Gold materialization intensity',1,0,3),control('glow','Residual construction glow',1,0,3),control('edgeParticles','Particles near forming edge',1,0,3),control('roughness','Highlight restraint',.5,0,1),
 ]],
 ['Glyph',[
  control('glyphStart','Ignition start (s)',2.35,.1,20,.05),control('glyphDuration','Ignition rise duration (s)',.18,.05,2,.01),control('glyphPeak','Peak brightness',1,.4,3,.01),control('glyphFinal','Final brightness',1.3,.2,2),
  control('glyphRadius','Glow radius',1,.3,3),control('glyphPulse','Ignition pulse strength',1,0,3),control('glyphSettle','Settle speed',1,.25,4),
 ]],
 ['Wordmark',[
  control('wordTime','Unified fade start (s)',3.1,0,20,.05),control('wordDuration','Fade duration (s)',.5,.05,4,.05),control('wordOpacity','Opacity',1,0,1),control('wordGold','Gold brightness',1,.2,2),control('wordInteraction','Residual magic interaction',1,0,3),
 ]],
 ['Energy handoff to Start',[
  control('handoffIntensity','Enable / intensity · 0 = off',1.95,0,3),control('handoffStart','Handoff start (s)',3.15,0,20,.05),control('handoffDuration','Handoff duration (s)',1.2,.15,8,.05),
  control('handoffCyan','Cyan energy',1.45,0,3),control('handoffGold','Gold dust',1.85,0,3),control('handoffPath','Downward path strength',1,0,1.5),control('buttonReach','Glow reaching Start',1.8,0,3),
 ]],
 ['Start button',[
  control('buttonStart','Appearance start (s)',4.2,0,25,.05),control('buttonDuration','Fade duration (s)',.4,.05,4,.05),control('buttonScale','Scale-in amount',0,0,.4,.01),
  control('buttonGold','Gold intensity',1,.2,2),control('buttonCyan','Cyan accent intensity',1,0,3),control('buttonBorder','Border brightness',1,.2,2),control('buttonIdle','Idle glow',2,0,2),control('buttonBreathing','Breathing strength',0.95,0,1,.01),
 ]],
 ['Background / atmosphere',[
  control('tealBrightness','Teal brightness',1,.4,2),control('saturation','Teal saturation',1,.4,1.5),control('vignetteStrength','Vignette',1,.25,2),control('atmosphere','Haze amount',1,0,3),control('hazeMovement','Haze movement',1,0,4),control('ambientParticles','Ambient particle amount',0,0,2),
 ]],
];
export const controls=groups.flatMap(([,rows])=>rows);
export const defaults=Object.freeze(Object.fromEntries(controls.map(c=>[c.key,c.value])));
export const STORAGE_KEY='atlas.intro-lab.settings.v1';
export const timeKeys=['emptyDuration','arrivalStart','finalHold','formationStart','formationDuration','glyphStart','glyphDuration','wordTime','wordDuration','handoffStart','handoffDuration','buttonStart','buttonDuration'];
export const presets={Current:{},'More Magic':{magicIntensity:1.3,ribbonWidth:1.5,ribbonCount:18,wispAmount:1.5,wispOpacity:1.15,density:1.3},'More Gold':{gold:1.5,density:1.5,particleMix:.08},'More Cyan':{cyan:1.35,ribbonGlow:1.2},Subtle:{magicIntensity:.65,density:.6,ribbonOpacity:.8,hotspotBrightness:.6}};
export function sanitize(input){
 const result={...defaults};
 if(input&&typeof input==='object')for(const c of controls){const v=input[c.key];if(typeof v==='number'&&Number.isFinite(v))result[c.key]=Math.max(c.min,Math.min(c.max,v));}
 result.ribbonCount=Math.round(result.ribbonCount);return result;
}
export function timing(s){
 const arrival=Math.max(s.emptyDuration,s.arrivalStart),formation=Math.max(arrival+.05,s.formationStart);
 const formed=formation+s.formationDuration;
 const handoff=Math.max(formed,s.handoffStart),handoffEnd=handoff+s.handoffDuration;
 const end=Math.max(formed,s.glyphStart+s.glyphDuration+.47*(s.glyphDuration/.18)/s.glyphSettle,s.wordTime+s.wordDuration,s.buttonStart+s.buttonDuration,handoffEnd+.25*(s.handoffDuration/1.2));
 // Keep exact scrub/stop endpoints stable across floating-point cue sums.
 const seconds=value=>Math.round(value*1e6)/1e6;
 return {arrival,formation,formed,handoff,handoffEnd,contentEnd:seconds(end),end:seconds(Math.max(s.totalDuration,end+s.finalHold))};
}
export function normalize(s){
 Object.assign(s,sanitize(s));
 const t=timing(s);s.formationStart=t.formation;s.handoffStart=t.handoff;s.totalDuration=t.end;
 return s;
}
