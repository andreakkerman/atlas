const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const sandbox={window:{}};vm.runInNewContext(fs.readFileSync('src/atlas-world-policy.js','utf8'),sandbox);const policy=sandbox.window.AtlasWorldPolicy;
test('Atlas coarsens only opaque repeated nature and keeps useful shadows',()=>{
 for(const name of ['Faceted_mature_fir.012','Atlas_woodland_fern.004','Grass.010','Atlas_moss_rock.015'])expect(policy.cellSize({name,material:{}})).toBe(32);
 for(const name of ['Temple_stair','forestRune','Guardian_face','NPC'])expect(policy.cellSize({name,material:{}})).toBe(12);
 expect(policy.cellSize({name:'Grass',material:{transparent:true}})).toBe(12);
 expect(policy.cellSize({name:'Grass',material:{alphaTest:.35}})).toBe(12);
 expect(policy.cellSize({name:'Grass',material:[{}]})).toBe(12);
 for(const name of ['Grass','Atlas_woodland_fern','Broad_leaf_community','Detailed_woodland_flower'])expect(policy.castsShadow({name})).toBe(false);
 for(const name of ['Faceted_mature_fir','Faceted_young_fir','Atlas_moss_rock','forestRune','Temple_stair','Library_small_broadleaf_tree'])expect(policy.castsShadow({name})).toBe(true);
 expect(policy.shadowRecenterDistance).toBe(.8);
});
test('Atlas composition preserves trees and landmarks and opens route-adjacent ground',()=>{
 const ledger=JSON.parse(fs.readFileSync('Levels/LVL-0001/3d/atlas-composition-ledger.json'));
 for(const key of ['Faceted mature fir','Faceted young fir','forestRune','zon','steen','templeGate door','Temple stair','Atlas moss rock','Opening fractured moss boulder'])expect(ledger.after[key]).toBe(ledger.before[key]);
 const sum=obj=>Object.values(obj).reduce((a,b)=>a+b,0);const ratio=sum(ledger.nearRouteAfter)/sum(ledger.nearRouteBefore);expect(ratio).toBeGreaterThan(.3);expect(ratio).toBeLessThan(.5);
 expect(ledger.boulderFaces).toBeLessThan(1000);expect(Math.max(...ledger.fernFaces)).toBeLessThan(392);
 const hash=p=>require('crypto').createHash('sha256').update(fs.readFileSync(p)).digest('hex');
 expect(hash('Levels/LVL-0001/3d/route.json')).toBe(ledger.routeSHA256);
 expect(hash('Levels/LVL-0001/3d/real-3d.glb')).toBe(ledger.realSHA256);
});
test('export contains shared upright fern geometry and preserved trees, not just an authoring ledger',()=>{
 const b=fs.readFileSync('Levels/LVL-0001/3d/atlas-3d.glb');const gltf=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)).toString());
 const nodes=prefix=>gltf.nodes.filter(n=>(n.name||'').startsWith(prefix));
 expect(nodes('Faceted mature fir').length).toBe(175);expect(nodes('Faceted young fir').length).toBe(73);
 expect(nodes('Atlas static root cluster').length).toBe(20);
 const fernMeshes=new Set([...nodes('Atlas woodland fern'),...nodes('Fern drift')].map(n=>n.mesh));expect(fernMeshes.size).toBe(2);
 for(const i of fernMeshes){const p=gltf.meshes[i].primitives[0],position=gltf.accessors[p.attributes.POSITION];expect(position.max[1]-position.min[1]).toBeGreaterThan(.4);expect(gltf.accessors[p.indices].count).toBeLessThanOrEqual(1152);expect(gltf.materials[p.material].alphaMode||'OPAQUE').toBe('OPAQUE');}
 const rock=nodes('Opening fractured moss boulder');expect(rock.length).toBe(1);expect(gltf.accessors[gltf.meshes[rock[0].mesh].primitives[0].indices].count).toBe(640*3);
});
