const {test,expect}=require('@playwright/test');
const fs=require('fs');
test.use({viewport:{width:1180,height:734},deviceScaleFactor:2,hasTouch:true});
test('Atlas material polish alternates in place without new GPU resources',async({page},info)=>{
 test.skip(process.env.ATLAS_PERFORMANCE_QA!=='1'||info.project.name!=='desktop-chromium');test.setTimeout(180000);
 await page.addInitScript(()=>{Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.route('**/src/three-renderer.js*',async r=>{
  const response=await r.fetch(),body=(await response.text()).replace('async function buildAtmosphere(token) {','async function buildAtmosphere(token) { window.materialCostScene=scene;');
  await r.fulfill({response,body});
 });
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&profile3d=1');
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
 const snap=()=>page.evaluate(()=>window.eval('threeRenderer.snapshot')());
 await expect.poll(async()=>(await snap()).status,{timeout:120000}).toBe('ready');
 const initial=await snap();
 const materials=await page.evaluate(()=>{
  const set=new Set();materialCostScene.traverse(o=>{if(o.isMesh)for(const m of Array.isArray(o.material)?o.material:[o.material])if(m)set.add(m);});
  window.costMaterials=[...set].map(m=>({m,roughness:m.roughness,metalness:m.metalness}));
  return costMaterials.filter(({m})=>/rock|stone|carved|relief|Leaves|Bark_NormalTree/i.test(m.name)).map(({m,roughness,metalness})=>({name:m.name,roughness,metalness}));
 });
 const blocks=[];
 for(const [pose,x,yaw] of [['forest',322,-.08],['temple',1697,-.65]]){
  await page.evaluate(({x,yaw})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,0);},{x,yaw});
  for(const variant of ['before','after','after','before','after','before']){
   await page.evaluate(variant=>{
    for(const {m,roughness,metalness} of costMaterials){
     m.roughness=roughness*(variant==='before'&&/rock|stone|carved|relief/i.test(m.name)?.46:1);
     m.metalness=variant==='before'&&['Leaves','Leaves_Pine','Bark_NormalTree'].includes(m.name)?.4000000059604645:metalness;
    }
   },variant);
   await page.waitForTimeout(500);
   const start=(await snap()).frames;await page.waitForTimeout(3000);const end=await snap();
   expect(end.ready).toBe(true);expect(end.frames).toBeGreaterThan(start+30);
   const samples=end.performanceProfile.samples.slice(-(end.frames-start));
   const mean=k=>samples.reduce((s,v)=>s+(v[k]||0),0)/samples.length;
   blocks.push({pose,variant,samples:samples.length,cpuMs:mean('cpu'),fenceMs:mean('fenceMs'),fps:1000/mean('interval'),draws:mean('draws'),triangles:mean('visibleTriangles')});
  }
 }
 const end=await snap();
 expect(end.performanceProfile.totals.createRenderPipeline).toBe(initial.performanceProfile.totals.createRenderPipeline);
 expect(end.performanceProfile.totals.createShaderModule).toBe(initial.performanceProfile.totals.createShaderModule);
 expect(end.performanceProfile.inventory).toEqual(initial.performanceProfile.inventory);
 const result={materials,blocks,initialTotals:initial.performanceProfile.totals,finalTotals:end.performanceProfile.totals,inventory:end.performanceProfile.inventory};
 fs.writeFileSync(info.outputPath('material-cost.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(blocks));
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
});
