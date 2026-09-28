import baseline from './baseline.js';
// The editor, renderer, timeline, import and persistence all share this schema.
const p=(label,value,min=0,max=5,step=.01)=>({label,value,min,max,step});
export const groups={
 marker:{title:'01 · Challenge marker',fields:{intensity:p('Intensity',1,0,8),cyan:p('Cyan amount',1,0,8),gold:p('Gold amount',.7,0,8),size:p('Size',1,.1,5),pulseSpeed:p('Pulse speed',1,0,8),pulseAmplitude:p('Pulse amplitude',.15,0,2),particles:p('Particle amount',1,0,12),wisps:p('Idle wisp amount',1,0,6),highlight:p('Highlight intensity',1.8,0,8),glow:p('Glow',1,0,8)}},
 screen:{title:'02 · Challenge screen',fields:{show:p('Show duration · s',.65,.05,8),hold:p('Hold duration · s',1.5,0,20),close:p('Close duration · s',.6,.05,8),scale:p('Popup scale',1,.2,1.45),opacity:p('Popup opacity',1,0,1),glow:p('Accent glow',1,0,8),completionDelay:p('Delay before completion · s',.2,0,10),releaseDelay:p('Delay before release · s',.1,0,10)}},
 flow:{title:'03 · Transfer flow',fields:{intensity:p('Intensity',1.5,0,8),width:p('Ribbon width',1.6,0,8),count:p('Ribbon count',7,0,30,1),opacity:p('Ribbon opacity',.7,0,2),glow:p('Ribbon glow',1,0,8),speed:p('Flow speed',1,.1,6),curvature:p('Curvature',1,-3,4),turbulence:p('Turbulence amount',.65,0,8),frequency:p('Turbulence scale',1,.1,8),wisps:p('Wisp amount',1,0,8),wispOpacity:p('Wisp opacity',.35,0,2),spread:p('Flow spread',1,0,8),depth:p('Depth / layering',1,0,5),hotspots:p('Hotspot amount',3,0,20,1),hotspotBrightness:p('Hotspot brightness',1,0,8),dust:p('Gold dust density',1,0,15),particleSize:p('Particle size',1,.1,6),particleBrightness:p('Particle brightness',1,0,8),trail:p('Trail persistence',.7,.05,2),smoothing:p('Path smoothing',.8,0,1),arc:p('Arc height',75,-300,400,1),burst:p('Start burst',1,0,8),duration:p('Transfer duration · s',2.7,.2,15)}},
 absorb:{title:'04 · Sven absorb',fields:{intensity:p('Intensity',1,0,8),radius:p('Radius',48,5,200,1),cyan:p('Cyan glow',1,0,8),gold:p('Gold sparkles',1,0,10),pulse:p('Pulse strength',1,0,8),burst:p('Absorb burst',1,0,8),settle:p('Settle duration · s',1.1,.1,10)}},
 exit:{title:'05 · Exit response',fields:{enabled:{label:'Enable gate response',value:true},pulse:p('Pulse intensity',.7,0,8),glow:p('Glow intensity',1,0,8),particles:p('Particle amount',1,0,10),delay:p('Delay · s',.3,0,10),duration:p('Duration · s',1.3,.1,10)}},
 timing:{title:'06 · Global timing',fields:{total:p('Total sequence · s (0 = auto)',0,0,60,.1),marker:p('Marker phase · s',.6,0,8),release:p('Release phase · s',.45,.05,5),transferDelay:p('Transfer start delay · s',0,0,8),absorbLead:p('Absorb overlap · s',.35,0,3),absorbDuration:p('Absorb duration · s',.65,.1,8)}},
 layout:{title:'07 · Layout / anchors',fields:{edit:{label:'Drag anchors in scene',value:false},svenX:p('Sven X · %',38,0,100,.1),svenY:p('Sven feet Y · %',86,0,100,.1),svenSize:p('Sven size · %',19,5,40,.1),c1X:p('Challenge 1 X · %',18,0,100,.1),c1Y:p('Challenge 1 Y · %',68,0,100,.1),c2X:p('Challenge 2 X · %',43,0,100,.1),c2Y:p('Challenge 2 Y · %',53,0,100,.1),c3X:p('Challenge 3 X · %',83,0,100,.1),c3Y:p('Challenge 3 Y · %',72,0,100,.1),exitX:p('Gate X · %',68,0,100,.1),exitY:p('Gate Y · %',47,0,100,.1),popupX:p('Screen X · %',50,0,100,.1),popupY:p('Screen Y · %',43,0,100,.1)}}
};
Object.assign(groups.exit.fields,{
 style:{label:'Exit style',value:'orbital',options:{orbital:'Orbital Halo',spiral:'Spiral Vortex'}},
 radius:p('Radius',62,10,200,1),ellipse:p('Ellipse ratio',.8,.2,1.8),speed:p('Rotation speed',.35,-3,3),
 secondary:{...p('Secondary loop strength',.35,0,2),style:'orbital'},counter:{label:'Counter-rotation',value:true,style:'orbital'},line:{...p('Ring line visibility',.3,0,2),style:'orbital'},
 tightness:{...p('Spiral turns',1.4,.25,5),style:'spiral'},direction:{label:'Flow direction',value:'inward',options:{inward:'Inward',outward:'Outward'},style:'spiral'},turbulence:{...p('Spiral turbulence',.35,0,3),style:'spiral'},wisps:{...p('Spiral wisp amount',1,0,5),style:'spiral'},
 gold:p('Gold intensity',1.3,0,6),cyan:p('Cyan accent',.12,0,3)
});
groups.exit.fields.enabled.label='Enable exit indicator';groups.exit.fields.glow.label='Aura strength';groups.exit.fields.duration.label='Opening duration · s';
groups.renderer={title:'08 · Particle finish',hint:'Cyan/gold counts and mote finish. Canvas: challenge and exit particles. WebGPU: all particles. Transfer and absorb settings remain in their own groups.',fields:{
 mode:{label:'FX renderer',value:'canvas',options:{canvas:'Canvas 2D · living particles',webgpu:'WebGPU · living stardust'},legacy:true},
 cyanParticles:p('Cyan particle amount',1,0,3),goldParticles:p('Gold particle amount',1,0,3),
 bloom:p('Particle bloom',.65,0,3),exposure:p('Light exposure',1.35,.2,3),richness:p('Particle richness',1,.15,3),moteSize:p('Mote size',1,.3,3),depth:p('Particle depth',1,0,2)
}};
for(const [g,values] of Object.entries(baseline))for(const [key,value] of Object.entries(values))groups[g].fields[key].value=value;
// Preserve exported legacy keys without presenting controls that no longer affect playback.
for(const [g,keys] of [['screen',['completionDelay','releaseDelay']],['timing',['marker','release','transferDelay','absorbLead']]])for(const k of keys)groups[g].fields[k].legacy=true;
groups.screen.fields.hold.label='Auto preview hold · s';
// These remain the same settings, with names appropriate to the selected medium.
for(const [g,labels] of Object.entries({marker:{cyan:'Cyan brightness',gold:'Gold brightness',wisps:'Swarm breathing',glow:'Particle radiance'},flow:{width:'Cloud width',count:'Swarm layers',opacity:'Cloud opacity',glow:'Particle radiance',wisps:'Swarm billows',wispOpacity:'Billow strength',dust:'Particle density'},absorb:{cyan:'Cyan brightness',gold:'Gold brightness'},exit:{secondary:'Outer cloud spread',line:'Ring line visibility',wisps:'Vortex billows',glow:'Particle radiance'}}))for(const [key,label] of Object.entries(labels))groups[g].fields[key].gpuLabel=label;
groups.exit.fields.line.gpuHide=true;
// Canvas uses free-floating clouds. Preserve orbital/spiral keys for GPU and old JSON.
groups.exit.fields.style.canvasOptions={orbital:'Enchanted cloud',spiral:'Wandering embers'};
for(const key of ['line','secondary','counter','tightness'])groups.exit.fields[key].canvasHide=true;
for(const key of ['wisps','turbulence'])groups.exit.fields[key].canvasBoth=true;
groups.exit.fields.direction.canvasOptions={inward:'Rising',outward:'Falling'};
for(const [g,labels]of Object.entries({marker:{cyan:'Cyan brightness',gold:'Gold brightness',wisps:'Swarm breathing',glow:'Particle radiance'},exit:{speed:'Drift speed',wisps:'Cloud drift',turbulence:'Wandering amount',glow:'Particle radiance'}}))for(const [key,label]of Object.entries(labels))groups[g].fields[key].canvasLabel=label;
// The original Canvas receive effect is retained; Living Stardust ends at arrival.
for(const k of ['intensity','radius','cyan','gold','pulse','burst'])groups.absorb.fields[k].gpuHide=true;
export const defaults=()=>Object.fromEntries(Object.entries(groups).map(([g,{fields}])=>[g,Object.fromEntries(Object.entries(fields).map(([k,v])=>[k,v.value]))]));
export function validate(input){const s=defaults();for(const [g,{fields}]of Object.entries(groups))for(const[k,d]of Object.entries(fields)){const v=input?.[g]?.[k]??(g==="renderer"&&k==="richness"?input?.renderer?.filaments:undefined);if(d.options){if(Object.hasOwn(d.options,v))s[g][k]=v;}else if(typeof d.value==='boolean'){if(typeof v==='boolean')s[g][k]=v;}else if(typeof v==='number'&&Number.isFinite(v))s[g][k]=Math.max(d.min,Math.min(d.max,d.step===1?Math.round(v):v));}return s;}
export function schedule(s){const a=s.timing,b=s.screen;const appear=0,hold=b.show,close=hold+b.hold,release=close+b.close,transfer=release,arrive=transfer+s.flow.duration,absorb=arrive,settled=absorb+a.absorbDuration+s.absorb.settle,gate=settled+s.exit.delay,end=s.exit.enabled?gate+s.exit.duration:settled;return{appear,hold,close,release,transfer,arrive,absorb,settled,gate,end,scale:a.total>0?a.total/end:1};}
