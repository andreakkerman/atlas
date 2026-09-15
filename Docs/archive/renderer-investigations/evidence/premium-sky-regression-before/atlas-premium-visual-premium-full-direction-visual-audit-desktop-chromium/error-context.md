# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: atlas-premium-visual.spec.js >> premium full direction visual audit
- Location: tests\atlas-premium-visual.spec.js:3:1

# Error details

```
Error: the sky must not intersect the camera far clipping plane

expect(received).toBeLessThan(expected)

Expected: < 220
Received:   231.60852311574286
```

# Page snapshot

```yaml
- main [ref=e3]:
  - navigation "Spelbesturing" [ref=e4]:
    - button "Terug naar menu" [ref=e5] [cursor=pointer]: Menu
    - button "Grafische instellingen" [ref=e6] [cursor=pointer]: ◆Graphics
  - region "Verbonden wereld" [ref=e7]:
    - 'generic "Eerste persoon: De Runenpoort" [active] [ref=e8]'
    - generic: W/S · Lopen Slepen · Rondkijken A/D · Draaien E · Actie
    - text: E ·
  - generic [ref=e9]:
    - generic "Avonturenteam" [ref=e10]:
      - button "Minnie laten spinnen" [ref=e11] [cursor=pointer]:
        - img "Minnie"
        - generic [ref=e12]: Minnie
      - button "Moose laten spinnen" [ref=e13] [cursor=pointer]:
        - img "Moose"
        - generic [ref=e14]: Moose
    - generic:
      - paragraph: Minnie
      - paragraph: Kijk, blauwe tekens tussen de oude bomen.
      - paragraph: Bos - 0/3 opdrachten voltooid
```

# Test source

```ts
  1  | const {test,expect}=require('@playwright/test');
  2  | const fs=require('fs');
  3  | test('premium full direction visual audit',async({page},info)=>{
  4  |  test.skip(process.env.ATLAS_PERFORMANCE_QA!=='1'||info.project.name!=='desktop-chromium');test.setTimeout(300000);
  5  |  await page.setViewportSize({width:1180,height:734});
  6  |  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  7  |  await page.route('**/src/three-renderer.js*',async r=>{
  8  |   const response=await r.fetch();let body=(await response.text()).replace('async function buildAtmosphere(token) {','async function buildAtmosphere(token) { global.__premiumQA={scene,camera,THREE};');
  9  |   if(process.env.ATLAS_PREMIUM_SKY_BEFORE==='1')body=body.replace("if(activeMode==='atlas-3d')scene.getObjectByName('Atlas evening sky')?.position.copy(camera.position);",'/* Reproduce the original fixed-origin dome. */');
  10 |   await r.fulfill({response,body});
  11 |  });
  12 |  await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001&debug3d=1');
  13 |  await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-renderer-choice="atlas-3d"]').click();
  14 |  await page.waitForFunction(()=>['ready','error'].includes(window.eval('threeRenderer.snapshot')().status),{},{timeout:240000});
  15 |  expect(await page.evaluate(()=>window.eval('threeRenderer.snapshot')().error)).toBeNull();
  16 |  await page.addStyleTag({content:'[data-tap-diagnostics]{visibility:hidden}'});
  17 |  const picks=[],skyChecks=[];
  18 |  for(const [id,x,yaw,pitch] of [['temple-back',1697,Math.PI,.10],['reverse-detail',1617,2.9,0],...Array.from({length:8},(_,i)=>['direction-'+i,1697,i*Math.PI/4,.2]),['sky-sun',1697,.632,.356]]){
  19 |   await page.evaluate(({x,yaw,pitch})=>{window.eval('state.worldX='+x);window.eval('threeRenderer').lookAt(yaw,pitch);},{x,yaw,pitch});await page.waitForTimeout(500);
  20 |   await page.screenshot({path:info.outputPath(id+'.png')});
  21 |   const rays=await page.evaluate(()=>{
  22 |    const {scene,camera,THREE}=window.__premiumQA,ray=new THREE.Raycaster(),out=[];
  23 |    for(let y=.1;y<.55;y+=.08)for(let x=.2;x<.81;x+=.05){
  24 |     ray.setFromCamera(new THREE.Vector2(x*2-1,1-y*2),camera);
  25 |     const hit=ray.intersectObjects(scene.children,true).find(h=>h.object.visible&&h.object.name!=='Atlas evening sky');
  26 |     if(hit)out.push({x,y,name:hit.object.name,distance:hit.distance,point:hit.point.toArray()});
  27 |    }
  28 |    return out;
  29 |   });picks.push({id,rays});
  30 |   skyChecks.push(await page.evaluate(()=>{
  31 |    const {scene,camera,THREE}=window.__premiumQA,sky=scene.getObjectByName('Atlas evening sky'),ray=new THREE.Raycaster();let maximumDepth=0;
  32 |    for(let y=-1;y<=1;y+=.1)for(let x=-1;x<=1;x+=.1){
  33 |     ray.setFromCamera(new THREE.Vector2(x,y),camera);const h=ray.intersectObject(sky)[0];
  34 |     if(h)maximumDepth=Math.max(maximumDepth,-h.point.clone().applyMatrix4(camera.matrixWorldInverse).z);
  35 |    }
  36 |    return {maximumDepth,far:camera.far,skyCenter:sky.position.toArray(),camera:camera.position.toArray()};
  37 |   }));
  38 |  }
  39 |  fs.writeFileSync(info.outputPath('picks.json'),JSON.stringify(picks,null,2));
  40 |  fs.writeFileSync(info.outputPath('sky-clipping.json'),JSON.stringify(skyChecks,null,2));
> 41 |  for(const check of skyChecks)expect(check.maximumDepth,'the sky must not intersect the camera far clipping plane').toBeLessThan(check.far);
     |                                                                                                                     ^ Error: the sky must not intersect the camera far clipping plane
  42 | });
  43 | 
```