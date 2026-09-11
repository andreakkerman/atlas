const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const source=fs.readFileSync('src/three-runtime-diagnostics.js','utf8');
function load(search){const window={};vm.runInNewContext(source,{window,location:{search},URLSearchParams,performance});return window;}
test('performance instrumentation is opt-in and records native pipeline sharing, shadows and restores hooks',async()=>{
 expect(load('?debug3d=1&profile3d=1&debug3dgpu=1').AtlasThreePerformance).toBeUndefined();expect(load('').AtlasThreePerformance).toBeUndefined();expect(load('?debug3d=1').AtlasThreePerformance).toBeUndefined();
 const api=load('?debug3d=1&profile3d=1').AtlasThreePerformance,pipeline={},material={id:4,uuid:'m',side:2},geometry={uuid:'g'};
 const mesh={id:7,isMesh:true,isInstancedMesh:true,count:3,castShadow:true,geometry,material};
 const scene={traverse(fn){fn(mesh);},updateMatrixWorld(){return 'matrix';}};
 const device={queue:{submit(){return 'submit';}},createShaderModule(){return 'shader';}};
 let draws=0;const backend={device,get(){return {pipeline};},draw(){draws++;return 'draw';}};
 const renderer={backend,_projectObject(){return 'project';},waitForGPU(){return Promise.resolve('fence');}};
 const original=backend.draw,wait=renderer.waitForGPU,submit=device.queue.submit;
 const p=api.start(renderer,scene);p.prepared();device.createShaderModule({});device.queue.submit([]);
 const ro={object:mesh,material,pipeline:{},getDrawParameters(){return {vertexCount:6,instanceCount:3};}};
 expect(backend.draw(ro)).toBe('draw');backend.draw({...ro,pipeline:{}});
 backend.draw({...ro,material:{isShadowPassMaterial:true}});
 scene.updateMatrixWorld();renderer._projectObject();p.frame(16,4,true);await renderer.waitForGPU();
 const s=p.snapshot();expect(draws).toBe(3);expect(s.samples[0]).toMatchObject({draws:2,shadowDraws:1,visibleTriangles:12,visibleObjects:1,visibleMaterials:1,pipelineSwitches:1,submissions:1});expect(s.totals.visibleFences).toBe(1);
 expect(s.inventory).toMatchObject({instancedMeshes:1,instances:3,materials:1,geometries:1,shadowCasters:1});
 p.stop();expect(backend.draw).toBe(original);expect(renderer.waitForGPU).toBe(wait);expect(device.queue.submit).toBe(submit);
});
