const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
async function harness(extra={}){
  let now=100,raf=null,sequence=0;const timers=new Map(),warnings=[],plays=[];
  const shell={dataset:{},style:{setProperty(){}},querySelector:()=>null};
  const document={hidden:false,querySelector:s=>s==='.worldTrack'?{getBoundingClientRect:()=>({width:1000,height:500})}:shell};
  const window={setTimeout:(fn,ms)=>{const id=++sequence;timers.set(id,{fn,at:now+ms});return id;},clearTimeout:id=>timers.delete(id),requestAnimationFrame:fn=>(raf=fn,1),cancelAnimationFrame:()=>{raf=null;},matchMedia:()=>({matches:true})};
  const config={id:'gondola',frameA:'gondola.png',activation:'exit',postExitDelay:2.5,speed:100,startDelayMs:600,sound:'gondola.mp3',loopDuringFlyby:true,path:[{x:800,y:200},{x:800,y:-200}],...extra};
  const level={id:'test',world:{width:1000,height:500},ambientFlybys:[config]};let screen='scene';
  class Audio{constructor(){this.paused=true;this.volume=0;plays.push(this);}addEventListener(){}play(){this.paused=false;return Promise.resolve();}pause(){this.paused=true;}}
  vm.runInNewContext(fs.readFileSync('src/ambient-system.js','utf8'),{window,document,CSS:{escape:x=>x},Audio});
  const api=window.AtlasAmbientSystem,r=api.createFlybyRuntime({getLevel:()=>level,getScreen:()=>screen,getAudioUnlocked:()=>true,warn:m=>warnings.push(m),assetCache:{image:async()=>({naturalWidth:64,naturalHeight:64}),sound:async()=>({}),normalize:x=>x}});
  await r.prepareLevel(level);r.sync();
  const advance=ms=>{for(let i=0;i<ms;i+=20){now+=20;for(const [id,t] of [...timers])if(t.at<=now&&timers.has(id)){timers.delete(id);t.fn();}const callback=raf;raf=null;callback?.(now);}};
  return {r,api,config,level,advance,plays,warnings,shell,scheduled:()=>!!raf,hide(){document.hidden=true;r.sync();},leave(){screen='menu';r.releaseLevel();},screen(value){screen=value;r.sync();}};
}
test('idle needs no RAF, sound or recurrence and survives challenge/reduced-motion refreshes',async()=>{
  const h=await harness();const idle=h.r.active.get('gondola');
  expect(idle.idle).toBe(true);expect(h.scheduled()).toBe(false);expect(h.r.timers.size).toBe(0);expect(h.plays).toHaveLength(0);
  h.advance(60000);h.screen('challenge');h.screen('correct');h.screen('scene');
  expect(h.r.active.get('gondola')).toBe(idle);expect(idle.distance).toBe(0);expect(h.scheduled()).toBe(false);
});
test('exit uses the same path after ignition, accelerates, and settles once after audio cleanup',async()=>{
  const h=await harness(),start=h.shell.style.transform,promise=h.r.activateExit();
  expect(h.r.activateExit()).toBe(promise);expect(h.shell.style.transform).toBe(start);
  h.advance(400);expect(h.r.active.get('gondola').distance).toBe(0);expect(h.plays).toHaveLength(1);expect(h.plays[0].volume).toBeGreaterThan(0);
  h.advance(500);expect(h.r.active.get('gondola').distance).toBeGreaterThan(0);expect(h.r.active.get('gondola').distance).toBeLessThan(10);
  h.advance(6000);expect(await promise).toBe(true);expect(h.r.active.size).toBe(0);expect(h.r.activeAudio.size).toBe(0);expect(h.plays[0].paused).toBe(true);expect(h.scheduled()).toBe(false);
  h.r.sync();h.advance(60000);expect(h.r.active.size).toBe(0);expect(h.plays).toHaveLength(1);
  h.r.resetExit();expect(h.r.active.get('gondola').idle).toBe(true);expect(h.shell.style.transform).toBe(start);
});
test('preview returns idle, can replay, and does not dispatch gameplay completion actions',async()=>{
  const h=await harness({frames:['gondola.png'],playback:'once',animationFps:10,movementEndFrame:1,endBehavior:'hold',actions:{onAnimationComplete:'finish'}});
  let callbacks=0;h.api.registerAction('finish',()=>callbacks++);
  h.r.togglePreview('gondola');h.advance(400);expect(h.r.active.get('gondola').distance).toBe(0);
  h.advance(1000);expect(h.r.active.get('gondola').idle).toBe(true);expect(callbacks).toBe(0);expect(h.r.activeAudio.size).toBe(0);
  h.r.togglePreview('gondola');h.advance(200);h.r.stopPreview('gondola');expect(h.r.active.get('gondola').idle).toBe(true);expect(h.scheduled()).toBe(false);
});
for(const operation of ['hide','leave','stop','delete','failure'])test(`${operation} settles exit ownership and releases audio`,async()=>{
  const h=await harness(),promise=h.r.activateExit();h.advance(100);
  if(operation==='hide')h.hide();
  if(operation==='leave')h.leave();
  if(operation==='stop')h.r.stopAll();
  if(operation==='delete'){const previous=[h.config];h.level.ambientFlybys=[];await h.r.updateLevel(previous);}
  if(operation==='failure'){h.config.path=null;h.r.invalidatePath('gondola');h.advance(100);}
  expect(await promise).toBe(false);expect(h.r.activeAudio.size).toBe(0);expect(h.plays.every(a=>a.paused)).toBe(true);
});
test('missing prepared sprite and zero-length route cannot hang the completion promise',async()=>{
  for(const failure of ['missing','path']){
    const h=await harness();if(failure==='missing')h.r.readiness.clear();else h.config.path=[{x:800,y:200},{x:800,y:200}];
    expect(await h.r.activateExit()).toBe(false);expect(h.r.activeAudio.size).toBe(0);
  }
});

test('multiple exit flybys wait for the last departure and retain shared audio ownership',async()=>{
  const h=await harness();h.level.ambientFlybys.push({...h.config,id:'second',speed:50});await h.r.updateLevel([h.config]);
  let finished=false;const promise=h.r.activateExit().then(value=>{finished=true;return value;});
  h.advance(6000);await Promise.resolve();
  expect(finished).toBe(false);expect(h.r.active.has('gondola')).toBe(false);expect(h.r.active.has('second')).toBe(true);expect(h.plays).toHaveLength(1);expect(h.plays[0].paused).toBe(false);
  h.advance(4000);expect(await promise).toBe(true);expect(h.r.activeAudio.size).toBe(0);expect(h.plays[0].paused).toBe(true);
});
