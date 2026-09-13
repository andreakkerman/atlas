const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
test.use({viewport:{width:1180,height:734},deviceScaleFactor:2,hasTouch:true});

for(const variant of ['baseline','width-2','width-3'])test(`grass coverage pixels: ${variant}`,async({page},info)=>{
 test.skip(process.env.ATLAS_GRASS_COVERAGE_QA!=='1'||process.env.ATLAS_WEBGPU_QA!=='1'||info.project.name!=='desktop-chromium','Opt-in real GPU investigation');
 test.setTimeout(300000);
 await page.addInitScript(()=>{
  Object.defineProperty(navigator,'platform',{get:()=> 'MacIntel'});
  Object.defineProperty(navigator,'maxTouchPoints',{get:()=>5});
 });
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.route('**/atlas-3d.glb',r=>r.fulfill({path:`output/grass-coverage/${variant}.glb`,contentType:'model/gltf-binary'}));
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1&profile3d=1');
 await page.evaluate(()=>{
  const start=AtlasThreePerformance.start;
  AtlasThreePerformance.start=(renderer,scene)=>{
   window.coverageGrass=visible=>scene.traverse(o=>{if(o.material?.name==='Atlas shared grass')o.visible=visible;});
   return start(renderer,scene);
  };
 });
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
 await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
 const initial=await page.evaluate(()=>window.eval('threeRenderer.snapshot')());
 expect(initial.ready,initial.error).toBe(true);expect(initial.resolution).toEqual([885,551]);
 await page.addStyleTag({content:'[data-tap-diagnostics]{visibility:hidden}'});
 const views=[];
 for(const [id,x,yaw,pitch] of [['bank',322,-1.1,-.1],['understory',1017,1.5,-.15],['rune-bank',1322,1.4,-.15],['path',650,0,-.25]]){
  await page.evaluate(({x,yaw,pitch})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,pitch);},{x,yaw,pitch});
  await page.waitForTimeout(500);
  await page.screenshot({path:info.outputPath(id+'.png')});
  const clip={x:0,y:70,width:750,height:550};
  const on=(await page.screenshot({clip})).toString('base64');
  // Diagnostic only, after preparation and profiling: a grass-off reference
  // isolates its visible pixel contribution without adding GPU resources.
  await page.evaluate(()=>coverageGrass(false));await page.waitForTimeout(100);
  const off=(await page.screenshot({clip})).toString('base64');
  await page.evaluate(()=>coverageGrass(true));
  const pixels=await page.evaluate(async([on,off])=>{
   const images=await Promise.all([on,off].map(async data=>{
    const img=new Image();img.src='data:image/png;base64,'+data;await img.decode();
    const c=document.createElement('canvas');c.width=img.width;c.height=img.height;
    const ctx=c.getContext('2d');ctx.drawImage(img,0,0);return ctx.getImageData(0,0,c.width,c.height).data;
   }));
   const counts={over3:0,over8:0,over16:0};
   for(let i=0;i<images[0].length;i+=4){const d=Math.max(...[0,1,2].map(k=>Math.abs(images[0][i+k]-images[1][i+k])));if(d>3)counts.over3++;if(d>8)counts.over8++;if(d>16)counts.over16++;}
   return {...counts,total:images[0].length/4};
  },[on,off]);
  expect(pixels.over8).toBeGreaterThan(100);views.push({id,x,yaw,pitch,pixels});
 }
 fs.writeFileSync(info.outputPath('coverage.json'),JSON.stringify({variant,views,initial,errors},null,2));console.log(variant,JSON.stringify(views));
 expect(errors).toEqual([]);
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="illustrated"]').click();
});
