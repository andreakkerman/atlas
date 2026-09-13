const {test,expect}=require('@playwright/test');
const fs=require('fs');
test('premium full direction visual audit',async({page},info)=>{
 test.skip(process.env.ATLAS_PERFORMANCE_QA!=='1'||info.project.name!=='desktop-chromium');test.setTimeout(300000);
 await page.setViewportSize({width:1180,height:734});
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.route('**/src/three-renderer.js*',async r=>{
  const response=await r.fetch();let body=(await response.text()).replace('async function buildAtmosphere(token) {','async function buildAtmosphere(token) { global.__premiumQA={scene,camera,THREE};');
  if(process.env.ATLAS_PREMIUM_SKY_BEFORE==='1')body=body.replace("if(activeMode==='atlas-3d')scene.getObjectByName('Atlas evening sky')?.position.copy(camera.position);",'/* Reproduce the original fixed-origin dome. */');
  await r.fulfill({response,body});
 });
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1');
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().error)).toBeNull();
 await page.addStyleTag({content:'[data-tap-diagnostics]{visibility:hidden}'});
 const colors=await page.evaluate(()=>{const out=[];window.__premiumQA.scene.traverse(o=>{if(o.isMesh&&o.material?.name==='forrest_ground_01')out.push({name:o.name,vertexColors:o.material.vertexColors,attributes:Object.fromEntries(Object.entries(o.geometry.attributes).filter(([k])=>k.includes('color')).map(([k,a])=>[k,{size:a.itemSize,values:Array.from(a.array.slice(0,24))}]))});});return out;});
 fs.writeFileSync(info.outputPath('floor-colors.json'),JSON.stringify(colors,null,2));
 expect(colors.length).toBeGreaterThan(0);
 for(const floor of colors){expect(floor.attributes.color_1).toBeDefined();expect(new Set(floor.attributes.color_1.values).size).toBeGreaterThan(3);}

 const picks=[],skyChecks=[];
 for(const [id,x,yaw,pitch] of [['rune-one-approach',175,0,0],['rune-one-side',322,-.9,0],['rune-two-approach',1231,.3,0],['rune-two-side',1322,-.8,0],['hill-approach',1454,.45,.12],['hill-side',1617,.8,.1],['temple-forward',1697,0,.15],['temple-back',1697,Math.PI,.10],['reverse-detail',1617,2.9,0],...Array.from({length:8},(_,i)=>['direction-'+i,1697,i*Math.PI/4,.2]),['sky-sun',1697,.632,.356]]){
  await page.evaluate(({x,yaw,pitch})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,pitch);},{x,yaw,pitch});await page.waitForTimeout(500);
  await page.screenshot({path:info.outputPath(id+'.png')});
  const rays=await page.evaluate(()=>{
   const {scene,camera,THREE}=window.__premiumQA,ray=new THREE.Raycaster(),out=[];
   for(let y=.1;y<.55;y+=.08)for(let x=.2;x<.81;x+=.05){
    ray.setFromCamera(new THREE.Vector2(x*2-1,1-y*2),camera);
    const hit=ray.intersectObjects(scene.children,true).find(h=>h.object.visible&&h.object.name!=='Atlas evening sky');
    if(hit)out.push({x,y,name:hit.object.name,distance:hit.distance,point:hit.point.toArray()});
   }
   return out;
  });picks.push({id,rays});
  skyChecks.push(await page.evaluate(()=>{
   const {scene,camera,THREE}=window.__premiumQA,sky=scene.getObjectByName('Atlas evening sky'),ray=new THREE.Raycaster();let maximumDepth=0;
   for(let y=-1;y<=1;y+=.1)for(let x=-1;x<=1;x+=.1){
    ray.setFromCamera(new THREE.Vector2(x,y),camera);const h=ray.intersectObject(sky)[0];
    if(h)maximumDepth=Math.max(maximumDepth,-h.point.clone().applyMatrix4(camera.matrixWorldInverse).z);
   }
   return {maximumDepth,far:camera.far,skyCenter:sky.position.toArray(),camera:camera.position.toArray()};
  }));
 }
 fs.writeFileSync(info.outputPath('picks.json'),JSON.stringify(picks,null,2));
 fs.writeFileSync(info.outputPath('sky-clipping.json'),JSON.stringify(skyChecks,null,2));
 for(const check of skyChecks)expect(check.maximumDepth,'the sky must not intersect the camera far clipping plane').toBeLessThan(check.far);
});
