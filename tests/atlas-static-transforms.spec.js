const {test,expect}=require('@playwright/test');
const fs=require('node:fs');

test.use({viewport:{width:1180,height:734},deviceScaleFactor:2,hasTouch:true});
test('Atlas static transforms preserve the world and remove repeated matrix work',async({page},info)=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1'||info.project.name!=='desktop-chromium','Requires real WebGPU');
 test.setTimeout(300000);
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});
  Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&profile3d=1');
 await page.evaluate(()=>{
  const start=AtlasThreePerformance.start;
  AtlasThreePerformance.start=(renderer,scene)=>{window.transformScene=scene;return start(renderer,scene);};
 });
 await page.locator('[data-graphics-action="toggle"]').click();
 await page.locator('[data-renderer-choice="atlas-3d"]').click();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().ready)).toBe(true);
 const result=await page.evaluate(()=>{
  const scene=window.transformScene,objects=[];scene.traverse(o=>objects.push(o));
  const frozen=objects.filter(o=>!o.matrixAutoUpdate&&!o.matrixWorldAutoUpdate);
  const meshes=frozen.filter(o=>o.isInstancedMesh);
  const before=new Map(frozen.map(o=>[o,o.matrixWorld.elements.slice()]));
  const instanceVersions=meshes.map(o=>o.instanceMatrix.version);
  let matrixCalls=0,mismatches=0;
  const originals=frozen.map(o=>[o,o.updateMatrix]);
  originals.forEach(([o,fn])=>{o.updateMatrix=function(){matrixCalls++;return fn.call(this);};});
  const phases=[];
  try{
   for(const enabled of [true,false,true,false,true,false]){
    frozen.forEach(o=>{o.matrixAutoUpdate=enabled;o.matrixWorldAutoUpdate=enabled;});
    matrixCalls=0;
    const at=performance.now();for(let i=0;i<1000;i++)scene.updateMatrixWorld();
    phases.push({automatic:enabled,msPerUpdate:(performance.now()-at)/1000,landscapeMatrixCalls:matrixCalls});
    for(const [o,values]of before)if(values.some((v,i)=>v!==o.matrixWorld.elements[i]))mismatches++;
   }
  }finally{
   frozen.forEach(o=>{o.matrixAutoUpdate=false;o.matrixWorldAutoUpdate=false;});
   originals.forEach(([o])=>delete o.updateMatrix);
  }
  return {frozen:frozen.length,meshes:meshes.length,mismatches,phases,
   instanceVersionsUnchanged:meshes.every((o,i)=>o.instanceMatrix.version===instanceVersions[i]),
   dynamicMeshes:objects.filter(o=>o.isMesh&&!frozen.includes(o)).map(o=>({name:o.name,automatic:o.matrixAutoUpdate&&o.matrixWorldAutoUpdate})),
   dynamicLights:objects.filter(o=>o.isLight).every(o=>o.matrixAutoUpdate&&o.matrixWorldAutoUpdate)};
 });
 expect(result.meshes).toBe(459);expect(result.mismatches).toBe(0);
 expect(result.instanceVersionsUnchanged).toBe(true);expect(result.dynamicLights).toBe(true);
 expect(result.dynamicMeshes.length).toBeGreaterThanOrEqual(8);
 expect(result.dynamicMeshes.every(o=>o.automatic)).toBe(true);
 for(const phase of result.phases)expect(phase.landscapeMatrixCalls).toBe(phase.automatic?result.frozen*1000:0);
 const frames=await page.evaluate(()=>window.eval('threeRenderer.snapshot')().frames);
 await page.keyboard.down('w');await page.waitForTimeout(1000);await page.keyboard.up('w');
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().frames)).toBeGreaterThan(frames);
 fs.writeFileSync(info.outputPath('transforms.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify(result));
 await page.locator('[data-graphics-action="toggle"]').click();
 await page.locator('[data-renderer-choice="illustrated"]').click();
});
