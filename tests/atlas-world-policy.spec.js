const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('src/atlas-world-policy.js','utf8'),sandbox);const policy=sandbox.window.AtlasWorldPolicy;
test('Atlas coarsens only opaque repeated nature and keeps useful shadows',()=>{
 for(const name of ['Curated_grass2.012','Curated_Fern.012','Curated_Pine1.012','Curated_Flower1.004','Faceted_mature_fir.012','Atlas_woodland_fern.004','Grass.010','Atlas_moss_rock.015'])expect(policy.cellSize({name,material:{}})).toBe(32);
 for(const name of ['Temple_stair','forestRune','Guardian_face','NPC'])expect(policy.cellSize({name,material:{}})).toBe(12);
 expect(policy.cellSize({name:'Grass',material:{transparent:true}})).toBe(12);
 expect(policy.cellSize({name:'Grass',material:{alphaTest:.35}})).toBe(12);
 expect(policy.cellSize({name:'Grass',material:[{}]})).toBe(12);
 for(const name of ['Curated_grass2','Curated_Fern','Curated_Flower1','Curated_Flower2','Curated_Flower3','Grass','Atlas_woodland_fern','Broad_leaf_community','Detailed_woodland_flower'])expect(policy.castsShadow({name})).toBe(false);
 for(const name of ['Faceted_mature_fir','Faceted_young_fir','Atlas_moss_rock','forestRune','Temple_stair','Library_small_broadleaf_tree'])expect(policy.castsShadow({name})).toBe(true);
 expect(policy.shadowRecenterDistance).toBe(.8);
});

test('Atlas art export keeps shared foliage, scenic closure and no rejected haze sheets',()=>{
 const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb');const g=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)).toString());
 const nodes=prefix=>g.nodes.filter(n=>(n.name||'').startsWith(prefix));
 expect(nodes('Atlas sunlight haze')).toHaveLength(0);
 expect(nodes('Atlas distant ridgeline')).toHaveLength(1);
 expect(nodes('Faceted distant fir')).toHaveLength(0);
 const floor=g.materials.find(m=>m.name==='forrest_ground_01');
 expect(floor.normalTexture).toBeUndefined();
 expect(floor.pbrMetallicRoughness.metallicRoughnessTexture).toBeUndefined();
 expect(floor.pbrMetallicRoughness.baseColorTexture).toBeDefined();
 expect(floor.pbrMetallicRoughness.roughnessFactor).toBeCloseTo(.94);
 expect(nodes('Broadleaf hazel sapling')).toHaveLength(0);
 expect(policy.lighting.fogDensity).toBeGreaterThan(.009);
 expect(policy.castsShadow({name:'Atlas_distant_ridgeline'})).toBe(false);
});
test('historical composition ledger and current protected gameplay files remain intact',()=>{
 const ledger=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-composition-ledger.json'));
 for(const key of ['Faceted mature fir','Faceted young fir','forestRune','zon','steen','templeGate door','Temple stair','Atlas moss rock','Opening fractured moss boulder'])expect(ledger.after[key]).toBe(ledger.before[key]);
 const sum=obj=>Object.values(obj).reduce((a,b)=>a+b,0);const ratio=sum(ledger.nearRouteAfter)/sum(ledger.nearRouteBefore);expect(ratio).toBeGreaterThan(.3);expect(ratio).toBeLessThan(.5);
 expect(ledger.boulderFaces).toBeLessThan(1000);expect(Math.max(...ledger.fernFaces)).toBeLessThan(392);
 const hash=p=>require('crypto').createHash('sha256').update(fs.readFileSync(p)).digest('hex');
 expect(hash('Levels/LVL-0001/3d/route.json')).toBe(ledger.routeSHA256);
 expect(hash('Levels/LVL-0001/3d/real-3d.glb')).toBe(ledger.realSHA256);
});
test('export uses intact curated source geometry and shared meshes, with all old ferns removed',()=>{
 const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb');const gltf=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)).toString());
 const nodes=prefix=>gltf.nodes.filter(n=>(n.name||'').startsWith(prefix));
 for(const prefix of ['Faceted mature fir','Faceted young fir','Faceted planted root collar','Atlas woodland fern','Fern drift','Grass','Rich route understory','Broad leaf community','Detailed woodland flower'])expect(nodes(prefix)).toHaveLength(0);
 const counts={Fern:165,Pine1:80,Flower1:28,Flower2:31,Flower3:31};
 for(const [key,count] of Object.entries(counts)){
  const source=fs.readFileSync(`3dmodels/${key}.glb`),s=JSON.parse(source.subarray(20,20+source.readUInt32LE(12)).toString());
  const placements=nodes('Curated '+key);expect(placements).toHaveLength(count);
  expect(new Set(placements.map(n=>n.mesh)).size).toBe(1);
  const mesh=gltf.meshes[placements[0].mesh];
  const triangles=(g,m)=>m.primitives.reduce((total,p)=>total+g.accessors[p.indices].count/3,0);
  expect(triangles(gltf,mesh)).toBe(triangles(s,s.meshes[0]));
  for(const original of s.materials){
   const material=gltf.materials.find(m=>m.name===original.name);expect(material).toBeDefined();
   expect(material.pbrMetallicRoughness.metallicFactor??1).toBeCloseTo(original.pbrMetallicRoughness?.metallicFactor??1,10);
   expect(material.pbrMetallicRoughness.roughnessFactor??1).toBeCloseTo(original.pbrMetallicRoughness?.roughnessFactor??1,5);
   expect(Boolean(material.pbrMetallicRoughness.baseColorTexture)).toBe(Boolean(original.pbrMetallicRoughness?.baseColorTexture));
   expect(Boolean(material.normalTexture)).toBe(Boolean(original.normalTexture));
   expect(material.alphaMode||'OPAQUE').toBe(original.alphaMode||'OPAQUE');
   (material.pbrMetallicRoughness.baseColorFactor||[1,1,1,1]).forEach((value,i)=>expect(value).toBeCloseTo((original.pbrMetallicRoughness?.baseColorFactor||[1,1,1,1])[i],5));
  }
 }
 const rock=nodes('Opening fractured moss boulder');expect(rock.length).toBe(1);expect(gltf.accessors[gltf.meshes[rock[0].mesh].primitives[0].indices].count).toBe(640*3);
});
test('curated export keeps audited root transforms, uniform scaling and untouched source files',()=>{
 const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb');const g=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)).toString());
 const nodes=prefix=>g.nodes.filter(n=>(n.name||'').startsWith(prefix));
 const ledger=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-curated-ledger.json'));
 const audit=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-curated-grounding.json'));
 expect(audit.objects).toBe(ledger.placements.length);expect(audit.results).toHaveLength(ledger.placements.length);
 expect(audit.failures).toBe(0);expect(audit.maximumRootGap).toBeLessThanOrEqual(0);
 expect(new Set(audit.results.map(p=>p.name))).toEqual(new Set(ledger.placements.map(p=>p.name)));
 const hash=p=>require('crypto').createHash('sha256').update(fs.readFileSync(p)).digest('hex');
 for(const [key,source] of Object.entries(ledger.sources))expect(hash(`3dmodels/${key}.glb`)).toBe(source.sha256);
 expect(nodes('Curated ')).toHaveLength(ledger.placements.length);
 for(const p of ledger.placements){
  const node=g.nodes.find(n=>n.name===p.name);expect(node).toBeDefined();
  const expected=[p.position[0],p.position[2],-p.position[1]];
  node.translation.forEach((value,i)=>expect(value).toBeCloseTo(expected[i],4));
  node.scale.forEach(value=>expect(value).toBeCloseTo(p.scale,5));
  expect(node.extras.curatedSource).toBe(p.source);
  expect(p.maxRootGap).toBeLessThanOrEqual(0);
  expect(p.minRootGap).toBeGreaterThan(p.source==='Pine1'?-.25:-.085);
  expect(p.maxTerrainPenetration).toBeLessThanOrEqual(p.source==='Pine1'?.27:.095);
 }
 expect(hash('Levels/LVL-0001/3d/real-3d.glb')).toBe(ledger.realSHA256);
 expect(hash('Levels/LVL-0001/3d/route.json')).toBe(ledger.routeSHA256);
});

test('80 pines span the map and grass is one shared inexpensive non-shadowing mesh',()=>{
 const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb'),g=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));
 const pines=g.nodes.filter(n=>n.extras?.curatedSource==='Pine1');expect(pines).toHaveLength(80);
 expect(pines.filter(n=>n.extras.forestZone==='closure').length).toBeGreaterThanOrEqual(35);
 expect(Math.max(...pines.map(n=>n.translation[0]))-Math.min(...pines.map(n=>n.translation[0]))).toBeGreaterThan(80);
 expect(Math.max(...pines.map(n=>n.translation[2]))-Math.min(...pines.map(n=>n.translation[2]))).toBeGreaterThan(100);
 for(let i=0;i<pines.length;i++)for(const n of pines.slice(i+1))expect(Math.hypot(n.translation[0]-pines[i].translation[0],n.translation[2]-pines[i].translation[2])).toBeGreaterThan(7);
 const grass=g.nodes.filter(n=>n.extras?.curatedSource==='grass2');expect(grass).toHaveLength(4000);expect(new Set(grass.map(n=>n.mesh)).size).toBe(1);
 const mesh=g.meshes[grass[0].mesh];expect(mesh.primitives).toHaveLength(1);const p=mesh.primitives[0],m=g.materials[p.material];
 expect(g.accessors[p.indices].count).toBe(256*3);expect(p.attributes.COLOR_0).toBeDefined();expect(m.alphaMode||'OPAQUE').toBe('OPAQUE');
 expect(m.pbrMetallicRoughness.baseColorTexture).toBeUndefined();expect(m.normalTexture).toBeUndefined();
 expect(policy.castsShadow({name:grass[0].name})).toBe(false);expect(policy.cellSize({name:grass[0].name,material:{}})).toBe(32);
});
