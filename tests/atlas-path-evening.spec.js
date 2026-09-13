const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb'),g=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));
const ledger=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-panorama-ledger.json'));
test('organic supplied flagstones stay shared, grounded and continue into matching temple steps',()=>{
 const organic=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-organic-path-ledger.json'));
 const stones=g.nodes.filter(n=>n.name.startsWith('Atlas route stone')&&!n.extras?.pathCourse);
 expect(stones.length).toBe(organic.stoneCount);expect(stones.length).toBeGreaterThan(100);
 expect(g.nodes.filter(n=>n.extras?.pathSource==='temple-stair')).toHaveLength(0);
 expect(stones.every(n=>n.extras.pathSource==='rockpath3.glb')).toBe(true);
 expect(new Set(stones.map(n=>n.mesh)).size).toBe(6);
 expect(Math.max(...organic.stones.map(p=>p.maxBaseGap))).toBeLessThanOrEqual(0);
 expect(organic.triangles).toBeLessThan(organic.beforeTriangles);
 expect(new Set(organic.stones.map(p=>p.width.toFixed(2))).size).toBeGreaterThan(20);
 const audit=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-organic-path-audit.json'));
 expect(audit.sampleCount).toBeGreaterThan(2800);expect(audit.surfaceCoverage).toBeGreaterThan(.98);
 expect(audit.maxJointRadius).toBeLessThanOrEqual(.151);
 const courses=g.nodes.filter(n=>n.extras?.pathCourse&&n.mesh!==undefined);expect(courses).toHaveLength(1);
 expect(courses[0].extras.stoneCount).toBe(195);expect(organic.courseStones).toHaveLength(183);
 expect(organic.stairSurface.landingCount).toBe(12);expect(organic.stairSurface.removedDuplicateSteps).toBe(80);
 expect(organic.stairSurface.capDepth).toBeLessThanOrEqual(.18);
 expect(Math.max(...organic.courseStones.map(p=>p.position[1]))).toBeGreaterThan(56.5);
 expect(g.nodes.find(n=>n.name==='Irregular worn route stair courses')).toBeUndefined();
 const steps=g.nodes.filter(n=>n.name.startsWith('Temple stair'));
 expect(steps).toHaveLength(80);expect(steps.every(n=>n.extras.pathSource==='rockpath3.glb')).toBe(true);
 expect(steps.every(n=>n.mesh===undefined)).toBe(true);
 const materials=new Set([...stones,...courses].flatMap(n=>g.meshes[n.mesh].primitives.map(p=>p.material)));
 expect(materials.size).toBe(1);
 for(const i of materials){expect(g.materials[i].alphaMode||'OPAQUE').toBe('OPAQUE');expect(g.materials[i].pbrMetallicRoughness.metallicFactor).toBe(0);}
});
test('runes face their route approaches while gameplay and stair anchors remain intact',()=>{
 const review=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-temple-review-ledger.json'));
 const runeNames=new Set(review.runes.flatMap(r=>Object.keys(r.after)));
 for(const [name,m] of Object.entries(ledger.protected)){
  if(runeNames.has(name))continue;
  const n=g.nodes.find(n=>n.name===name);expect(n).toBeDefined();
  [m[0][3],m[2][3],-m[1][3]].forEach((v,i)=>expect((n.translation||[0,0,0])[i]).toBeCloseTo(v,4));
 }
 for(const r of review.runes){
  expect(Object.keys(r.after)).toHaveLength(4);
  for(const [name,m] of Object.entries(r.after)){
   const n=g.nodes.find(n=>n.name===name);expect(n).toBeDefined();
   [m[0][3],m[2][3],-m[1][3]].forEach((v,i)=>expect((n.translation||[0,0,0])[i]).toBeCloseTo(v,4));
  }
  const m=r.after[r.name],front=[-m[0][1],-m[1][1]],target=[r.approach[0]-m[0][3],r.approach[1]-m[1][3]];
  expect((front[0]*target[0]+front[1]*target[1])/Math.hypot(...front)/Math.hypot(...target)).toBeGreaterThan(.999);
 }
 const rune=g.nodes.find(n=>n.name==='zon'),r=review.runes.find(r=>r.name==='zon');
 expect(rune.extras.atlasLandmark).toBe('zon');
 const target=[...ledger.rune.target];target[1]+=r.groundingDelta;
 rune.extras.atlasLandmarkPosition.forEach((v,i)=>expect(v).toBeCloseTo(target[i],5));
});

test('bounded shared plant additions and three closed cheaper rock replacements',()=>{
 expect(g.nodes.filter(n=>n.extras?.curatedSource)).toHaveLength(4356);
 const plants=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-curated-ledger.json'));
 expect(plants.counts).toEqual({Fern:177,Pine1:80,Flower1:31,Flower2:34,Flower3:34,grass2:4000});
 expect(ledger.plants.filter(p=>p.change==='midground cluster')).toHaveLength(21);
 expect(ledger.plants.filter(p=>p.change==='larger fern').length).toBeGreaterThan(0);
 expect(ledger.rocks).toHaveLength(3);
 for(const r of ledger.rocks){const n=g.nodes.find(n=>n.name===r.name);expect(n.extras.replacementRock).toBe(r.source);expect(r.closed).toBe(true);expect(r.newTriangles).toBeLessThan(r.oldTriangles);}
});
test('seamless altitude sky replaces panorama and geometric ridgeline without heavy effects',()=>{
 expect(g.nodes.filter(n=>n.name==='Atlas distant ridgeline')).toHaveLength(0);
 const renderer=fs.readFileSync('src/three-renderer.js','utf8');expect(renderer).not.toContain('atlas-evening-panorama-v172.png');
 const scope={window:{}};vm.runInNewContext(fs.readFileSync('src/atlas-world-policy.js','utf8'),scope);
 const l=scope.window.AtlasWorldPolicy.lighting;expect(l.fogNear).toBeGreaterThanOrEqual(20);expect(l.fogFar).toBeGreaterThan(140);expect(l.sunIntensity).toBeLessThan(7);
});

test('premium rocks reuse existing supplied meshes and contact mask stays within the tablet texture cap',()=>{
 const premium=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-premium-ledger.json'));
 let before=0,after=0;
 for(const r of premium.rocks){
  const node=g.nodes.find(n=>n.name===r.name),master=g.nodes.find(n=>n.extras?.suppliedRock===r.source);
  expect(node.mesh,r.name+' must reuse supplied geometry').toBe(master.mesh);
  const actual=g.meshes[node.mesh].primitives.reduce((n,p)=>n+g.accessors[p.indices].count/3,0);
  expect(actual).toBe(r.newTriangles);before+=r.oldTriangles;after+=actual;
 }
 expect(after).toBeLessThan(before);
 const png=fs.readFileSync('assets/textures/atlas-contact-v174.png');
 expect(png.readUInt32BE(16)).toBeLessThanOrEqual(1024);expect(png.readUInt32BE(20)).toBeLessThanOrEqual(1024);
 expect(premium.contactMask.minimum).toBeGreaterThanOrEqual(.76);
});


test('temple sweep keeps shared supplied rocks, supported undersides and fixed vegetation count',()=>{
 const review=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-temple-review-ledger.json'));
 expect(review.weakRemainingInSweep).toEqual([]);
 let before=0,after=0;
 for(const r of review.rocks){
  const node=g.nodes.find(n=>n.name===r.name),master=g.nodes.find(n=>n.extras?.suppliedRock===r.source);
  expect(node.mesh,r.name).toBe(master.mesh);
  const triangles=g.meshes[node.mesh].primitives.reduce((sum,p)=>sum+g.accessors[p.indices].count/3,0);
  expect(triangles).toBe(r.newTriangles);before+=r.oldTriangles;after+=triangles;
 }
 expect(after).toBeLessThan(before);
 for(const r of review.templeSupport)expect(r.afterMaxGap,r.name).toBeLessThanOrEqual(0);
 expect(review.hillClusters.length).toBeLessThanOrEqual(80);
 expect(g.nodes.filter(n=>n.extras?.curatedSource)).toHaveLength(4356);
});
