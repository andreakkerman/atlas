const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
async function start(page){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?dev=editor&level=LVL-0001');await expect(page.locator('[data-actor="sven"]')).toBeVisible();
 await page.locator('[data-graphics-action="toggle"]').click();await page.locator('[data-challenge-fx-controls] summary').click();await page.locator('[data-challenge-fx="mode"]').selectOption('canvas');
}
test('Canvas tuning has numeric values, responds live and persists through renderer switches and reload',async({page},info)=>{
 await start(page);
 await expect(page.locator('[data-challenge-fx-controls] legend').filter({hasText:'Enchanted cloud'})).toBeVisible();
 expect(await page.locator('[data-challenge-fx-controls] input[type=number]').evaluateAll(nodes=>nodes.length===27&&nodes.every(n=>n.value!==''&&Number.isFinite(Number(n.value))))).toBe(true);
 for(const [key,value]of [['marker.size','1.45'],['exit.radius','105'],['exit.speed','0.72'],['exit.ellipse','1.2'],['exit.turbulence','0.85'],['exit.wisps','2.4'],['renderer.moteSize','1.3']])await page.locator(`[data-challenge-fx="${key}"]`).fill(value);
 await page.locator('[data-challenge-fx="volume"]').fill('0.45');await expect(page.locator('[data-challenge-fx-value="volume"]')).toHaveText('0.45');
 await page.locator('[data-challenge-fx="exit.radius"]').scrollIntoViewIfNeeded();await page.screenshot({path:info.outputPath('canvas-exit-numeric-controls.png')});
 const ink=()=>page.locator('[data-challenge-fx-canvas]').evaluate(c=>c.getContext('2d').getImageData(0,0,c.width,c.height).data.some((v,i)=>i%4===3&&v>0));
 await page.locator('[data-challenge-fx="renderer.cyanParticles"]').fill('0');await page.locator('[data-challenge-fx="renderer.goldParticles"]').fill('0');await expect.poll(ink).toBe(false);
 await page.locator('[data-challenge-fx="renderer.goldParticles"]').fill('1.6');await expect.poll(ink).toBe(true);
 const settings=()=>page.evaluate(()=>window.eval('voxelRenderer').getSettings().challengeFx),before=await settings();
 await page.locator('[data-challenge-fx="mode"]').selectOption('legacy');await page.locator('[data-challenge-fx="mode"]').selectOption('canvas');expect(await settings()).toEqual(before);
 await page.reload();await expect(page.locator('[data-actor="sven"]')).toBeVisible();expect(await settings()).toEqual(before);
 await page.evaluate(()=>{const p=window.eval('getApproachPoint')(window.eval('runeById')('zon')),s=window.eval('state');s.worldX=p.x;s.worldY=p.y;window.eval('updateWorldDom')();});
 await expect(page.locator('[data-gpu-preparation]')).toBeHidden();
 await expect.poll(ink).toBe(true);
 await page.screenshot({path:info.outputPath('canvas-particles-in-atlas.png')});
});

test('production Canvas matches approved lab motes through departure and Enchanted cloud regardless of old exit style',async({page},info)=>{
 await start(page);await page.locator('[data-graphics-action="close"]').click();
 const result=await page.evaluate(async()=>{
  const {drawChallengeParticles}=await import('/experiments/atlas-challenge-fx/canvas-particles.js');
  const {drawExitVisual}=await import('/experiments/atlas-challenge-fx/exit-visuals.js');
  const s=window.AtlasChallengeFx.settings({mode:'canvas'});s.flow.intensity=0;
  const anchors=[{id:'a',x:150,y:150},{id:'b',x:400,y:200}],scene={anchors,markers:[anchors[1]],player:[600,400],exit:null};
  function surface(){const c=document.createElement('canvas');c.width=800;c.height=600;return c.getContext('2d');}
  const smooth=v=>{v=Math.max(0,Math.min(1,v));return v*v*(3-2*v);},rand=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v);};
  const compare=(sample,seq,reference)=>{const actual=surface(),expected=surface();window.AtlasChallengeFxVisuals.paint(actual,s,sample,seq,4);expected.globalCompositeOperation='lighter';reference(expected);const a=actual.getImageData(0,0,800,600).data,b=expected.getImageData(0,0,800,600).data;let changed=0,lit=0;for(let i=0;i<a.length;i++){if(a[i]!==b[i])changed++;if(i%4===3&&a[i]>0)lit++;}return {changed,lit};};
  const idle=compare(scene,null,ctx=>drawChallengeParticles(ctx,s.marker,s.renderer,1,[400,200],4,-1,1));
  const departure=compare({...scene,markers:[]},{runeId:'b',origin:[400,200],bend:scene.player,age:0,releaseMarker:true},ctx=>drawChallengeParticles(ctx,s.marker,s.renderer,1,[400,200],4,-1,1));
  const arrived=compare({...scene,markers:[]},{runeId:'b',origin:[400,200],bend:scene.player,age:s.flow.duration,releaseMarker:true},()=>{});
  const exit=compare({...scene,markers:[],exit:[400,300]},null,ctx=>drawExitVisual(ctx,{...s.exit,style:'orbital'},4,[400,300],{rand,smooth},s.renderer));
  const fixture=surface();window.AtlasChallengeFxVisuals.paint(fixture,s,{...scene,exit:[600,300]},null,4);window.canvasCloudFixture=fixture.canvas.toDataURL();
  return {idle,departure,arrived,exit};
 });
 for(const name of ['idle','departure','exit']){expect(result[name].changed).toBe(0);expect(result[name].lit).toBeGreaterThan(100);}
 expect(result.arrived).toEqual({changed:0,lit:0});
 const image=await page.evaluate(()=>window.canvasCloudFixture);await info.attach('canvas-cloud-and-motes',{body:Buffer.from(image.split(',')[1],'base64'),contentType:'image/png'});
});
