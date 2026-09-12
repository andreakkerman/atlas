// Compare v168 backup to the colour-only v169 export, including binary foliage.
const fs=require('fs'),assert=require('node:assert/strict'),crypto=require('crypto');
const read=p=>{const b=fs.readFileSync(p),length=b.readUInt32LE(12);return {g:JSON.parse(b.subarray(20,20+length)),bin:b.subarray(28+length)};};
const before=read('output/cohesion-v169-backup/atlas-3d.glb'),after=read('Levels/LVL-0001/3d/atlas-3d.glb');
assert.deepEqual(after.g.nodes,before.g.nodes);
assert.deepEqual(after.g.materials,before.g.materials);
assert.deepEqual(after.g.accessors,before.g.accessors);
const bytes=(a,i)=>{const v=a.g.bufferViews[i];return a.bin.subarray(v.byteOffset||0,(v.byteOffset||0)+v.byteLength);};
for(let i=0;i<before.g.images.length;i++)assert.deepEqual(bytes(before,before.g.images[i].bufferView),bytes(after,after.g.images[i].bufferView));
let foliage=0;
for(const n of before.g.nodes.filter(n=>n.extras?.curatedSource)){
 for(const p of before.g.meshes[n.mesh].primitives){
  const i=p.extensions.KHR_draco_mesh_compression.bufferView;
  assert.deepEqual(bytes(before,i),bytes(after,i),n.name+' geometry/colour changed');
 }
 foliage++;
}
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const report={unchangedNodes:after.g.nodes.length,unchangedFoliage:foliage,unchangedMaterials:after.g.materials.length,unchangedImages:after.g.images.length,accessorsUnchanged:true,realHash:hash('Levels/LVL-0001/3d/real-3d.glb'),routeHash:hash('Levels/LVL-0001/3d/route.json')};
fs.writeFileSync('Docs/atlas-cohesion-integrity.json',JSON.stringify(report,null,2));console.log(report);
