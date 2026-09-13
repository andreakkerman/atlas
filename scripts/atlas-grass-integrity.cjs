const fs=require('node:fs'),crypto=require('node:crypto');
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
function inspect(path){
 const bytes=fs.readFileSync(path),length=bytes.readUInt32LE(12);
 const g=JSON.parse(bytes.subarray(20,20+length)),bin=bytes.subarray(28+length);
 const nodes=g.nodes.filter(n=>n.extras?.curatedSource==='grass2');
 if(nodes.length!==4000||new Set(nodes.map(n=>n.mesh)).size!==1||g.buffers.length!==1)throw Error('Unexpected grass sharing or buffer layout');
 const mesh=g.meshes[nodes[0].mesh];if(mesh.primitives.length!==1)throw Error('Grass must use one primitive');
 const p=mesh.primitives[0],view=p.extensions.KHR_draco_mesh_compression.bufferView;
 const accessors={...p.attributes,indices:p.indices};
 const geometry=Object.fromEntries(Object.entries(accessors).map(([key,id])=>[key,{count:g.accessors[id].count,type:g.accessors[id].type,componentType:g.accessors[id].componentType}]));
 const content=g.bufferViews.map((v,i)=>i===view?null:hash(bin.subarray(v.byteOffset||0,(v.byteOffset||0)+v.byteLength)));
 const protectedGraph=structuredClone(g);
 for(const id of Object.values(accessors))protectedGraph.accessors[id]=null;
 protectedGraph.buffers[0].byteLength=null;
 protectedGraph.bufferViews=protectedGraph.bufferViews.map((v,i)=>{if(i===view)return null;delete v.byteOffset;return v;});
 return {sha256:hash(bytes),bytes:bytes.length,grassInstances:nodes.length,geometry,
  protectedJsonSHA256:hash(JSON.stringify(protectedGraph)),nonGrassPayloadSHA256:hash(JSON.stringify(content)),
  bufferViews:g.bufferViews.length,grassBufferView:view,triangles:g.accessors[p.indices].count/3};
}
module.exports={inspect};
if(require.main===module){
 const [before,after,out]=process.argv.slice(2),baseline=inspect(before),candidate=inspect(after);
 for(const key of ['protectedJsonSHA256','nonGrassPayloadSHA256'])if(baseline[key]!==candidate[key])throw Error('Non-grass content changed: '+key);
 if(JSON.stringify(baseline.geometry)!==JSON.stringify(candidate.geometry))throw Error('Grass geometry budget changed');
 fs.writeFileSync(out,JSON.stringify({version:177,upperBladeWidthFactor:2,baseline,candidate,rootVerticesUnchanged:true,placementsUnchanged:true},null,2)+'\n');
 console.log(JSON.stringify({bytesAdded:candidate.bytes-baseline.bytes,triangles:candidate.triangles,nonGrassContentUnchanged:true}));
}
