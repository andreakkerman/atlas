const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
async function harness(configs){
 let now=100,seq=0,raf;const timers=new Map(),loads=[],shells=new Map();
 const document={hidden:false,querySelector:s=>s==='.worldTrack'?{getBoundingClientRect:()=>({width:1000,height:500})}:shells.get(s.match(/"(.*?)"/)?.[1])};
 const window={setTimeout:(fn,ms)=>{const id=++seq;timers.set(id,{fn,at:now+ms});return id;},clearTimeout:id=>timers.delete(id),requestAnimationFrame:fn=>(raf=fn,1),cancelAnimationFrame:()=>{raf=null;},matchMedia:()=>({matches:false})};
 const level={id:'test',world:{width:1000,height:500},ambientFlybys:configs.map(c=>({frameA:'a.png',speed:1,path:[{x:0,y:0},{x:20,y:0}],intervalMinMs:1000,intervalMaxMs:1000,...c}))};
 for(const c of level.ambientFlybys)shells.set(c.id,{dataset:{},style:{}});
 vm.runInNewContext(fs.readFileSync('src/ambient-system.js','utf8'),{window,document,CSS:{escape:x=>x}});
 let screen='scene';const r=window.AtlasAmbientSystem.createFlybyRuntime({getLevel:()=>level,getScreen:()=>screen,assetCache:{image:async p=>{loads.push(p);return {};},normalize:x=>x}});
 await r.prepareLevel(level);
 const advance=ms=>{for(let i=0;i<ms;i+=100){now+=100;for(const [id,t] of [...timers])if(t.at<=now&&timers.has(id)){timers.delete(id);t.fn();}const fn=raf;raf=null;fn?.(now);}};
 return {r,advance,loads,shells,level,hide(){document.hidden=true;r.sync();},leave(){screen='menu';r.sync();}};
}
test('preview cancels old recurrence; full slow flight precedes the next delay',async()=>{
 const h=await harness([{id:'slow'},{id:'other'}]);h.r.preview('slow');h.advance(100);
 const instance=h.r.active.get('slow');
 h.advance(5000);expect(h.r.active.get('slow')).toBe(instance);expect(h.r.active.has('other')).toBe(true);
 expect(instance.distance).toBeCloseTo(5,6);h.r.preview('slow');expect(h.r.active.get('slow')).toBe(instance);
 h.advance(15000);expect(h.r.active.has('slow')).toBe(false);
 h.advance(900);expect(h.r.active.has('slow')).toBe(false);
 h.advance(100);expect(h.r.active.has('slow')).toBe(true);
 h.leave();h.advance(60000);expect(h.r.active.size).toBe(0);expect(h.r.timers.size).toBe(0);
});
test('delayed group members reserve their IDs through the entire flight',async()=>{
 const h=await harness([{id:'early',syncKey:'pair',path:[{x:0,y:0},{x:1,y:0}]},{id:'late',syncKey:'pair',startDelayMs:5000}]);
 h.advance(1000);h.advance(1500);h.r.sync();h.advance(3500);
 const late=h.r.active.get('late');expect(late).toBeTruthy();
 h.advance(10000);expect(h.r.active.get('late')).toBe(late);expect(late.distance).toBeCloseTo(10,6);
 h.hide();h.advance(60000);expect(h.r.active.size).toBe(0);expect(h.r.timers.size).toBe(0);
});
test('single frame loads only A and never mutates frame state; two frames still animate',async()=>{
 const h=await harness([{id:'single',flapFrequencyHz:7},{id:'dual',frameB:'b.png',flapFrequencyHz:2}]);
 expect(h.loads.filter(p=>p===undefined)).toHaveLength(0);expect(h.loads).toEqual(['a.png','a.png','b.png']);
 h.r.preview('single');h.r.preview('dual');
 let updates=0;const single=h.shells.get('single');Object.defineProperty(single.dataset,'frame',{set(){updates++;}});
 const frames=new Set();for(let i=0;i<10;i++){h.advance(100);frames.add(h.shells.get('dual').dataset.frame);}
 expect(updates).toBe(0);expect([...frames].sort()).toEqual(['a','b']);expect(h.r.active.get('single').distance).toBeGreaterThan(0);
});

