const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
function lane(){
 const context={window:{},location:{search:''},URLSearchParams};vm.createContext(context);
 vm.runInContext(fs.readFileSync('src/three-renderer.js','utf8'),context);
 return context.window.AtlasThreeRenderer.createLane(JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/route.json')));
}
test('Atlas lane supports camera-relative walking, bounded strafing and equal diagonal speed',()=>{
 const l=lane();let p=l.sync(322);
 p=l.step(p.atlasX,0,1,0,.05);expect(p.x).toBeCloseTo(.135);expect(p.z).toBeCloseTo(-5);
 for(let i=0;i<100;i++)p=l.step(p.atlasX,0,1,0,.05);
 expect(p.distance).toBeLessThanOrEqual(1.200001);
 const before={...p};p=l.step(p.atlasX,0,-1,0,.05);expect(p.x).toBeLessThan(before.x);
 const start=l.sync(650),diagonal=l.step(650,1,1,0,.05);
 expect(Math.hypot(diagonal.x-start.x,diagonal.z-start.z)).toBeCloseTo(.135);
 const facing=l.sync(800),back=l.step(800,1,0,Math.PI,.05);expect(back.z).toBeGreaterThan(facing.z);
});
test('running raises the speed cap without diagonal boost or escaping the lane',()=>{
 const l=lane();let start=l.sync(650),p=l.step(650,1,0,0,.05,4.8);
 expect(Math.hypot(p.x-start.x,p.z-start.z)).toBeCloseTo(.24);
 start=l.sync(700);p=l.step(700,1,1,0,.05,4.8);
 expect(Math.hypot(p.x-start.x,p.z-start.z)).toBeCloseTo(.24);
 start=l.sync(750);p=l.step(750,.5,0,0,.05,4.8);
 expect(Math.hypot(p.x-start.x,p.z-start.z)).toBeCloseTo(.12);
 for(let i=0;i<100;i++)p=l.step(p.atlasX,0,1,0,.05,4.8);
 expect(p.distance).toBeLessThanOrEqual(1.200001);
});
test('Atlas lane follows every bend and elevation to the gate, clamps ends and resets external jumps',()=>{
 const l=lane(),route=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/route.json')).route;
 let p=l.sync(175);
 p=l.step(p.atlasX,-1,0,0,.05);expect(p.atlasX).toBe(175);expect(p.z).toBe(0);
 for(const target of route.slice(1)){
  let n=0;
  while(Math.hypot(target.position[0]-p.x,target.position[2]-p.z)>.14&&n++<1000){
   const yaw=Math.atan2(-(target.position[0]-p.x),-(target.position[2]-p.z));
   p=l.step(p.atlasX,1,0,yaw,.05);expect(p.distance).toBeLessThanOrEqual(1.200001);
  }
  expect(n).toBeLessThan(1000);expect(Math.abs(p.y-target.position[1])).toBeLessThan(.2);
 }
 for(let i=0;i<30;i++)p=l.step(p.atlasX,1,0,-Math.PI/4,.05);
 expect(p.atlasX).toBe(1847);
 p=l.sync(322);expect(p.x).toBe(0);expect(p.z).toBe(-5);expect(p.distance).toBe(0);
});
