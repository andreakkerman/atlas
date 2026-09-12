const {test,expect}=require('@playwright/test');
const fs=require('fs');
const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb');
const g=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)));
test('evening delta retains foliage counts and clears rune trunks and temple footprint',()=>{
 const foliage=g.nodes.filter(n=>n.extras?.curatedSource);
 expect(foliage).toHaveLength(4335);
 const trees=foliage.filter(n=>n.extras.curatedSource==='Pine1');expect(trees).toHaveLength(80);
 for(const name of ['forestRune','zon','steen']){
  const rune=g.nodes.find(n=>n.name===name);
  for(const tree of trees)expect(Math.hypot(tree.translation[0]-rune.translation[0],tree.translation[2]-rune.translation[2])).toBeGreaterThan(3.1);
 }
 for(const n of foliage){const [x,,z]=n.translation;expect(x>11.5&&x<26.5&&-z>56.5&&-z<68.5,n.name+' inside temple').toBe(false);}
});
test('four supplied rocks replace existing stones and share one bounded opaque material',()=>{
 const ledger=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-evening-ledger.json'));
 const rocks=g.nodes.filter(n=>n.extras?.suppliedRock);expect(rocks).toHaveLength(4);
 const materials=new Set();
 for(const [i,n] of rocks.entries()){
  expect(n.extras.suppliedRock).toBe(`rock${i+1}.glb`);
  const mesh=g.meshes[n.mesh];expect(mesh.primitives).toHaveLength(1);
  const p=mesh.primitives[0];materials.add(p.material);
  expect(g.accessors[p.indices].count/3).toBe([342,244,244,342][i]);
  expect(g.nodes.some(n=>n.name===ledger.rocks[i].replaced)).toBe(false);
 }
 expect(materials.size).toBe(1);const m=g.materials[[...materials][0]];
 expect(m.alphaMode||'OPAQUE').toBe('OPAQUE');expect(m.pbrMetallicRoughness.metallicFactor).toBe(0);
 expect(m.pbrMetallicRoughness.roughnessFactor).toBeCloseTo(.94);
 expect(m.pbrMetallicRoughness.baseColorTexture).toBeDefined();expect(m.normalTexture).toBeUndefined();
});
