const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';
test('world FX follow Sven silhouette while absorb stays visible; ambient rune decoration toggles',async({page},info)=>{
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(base+'/?dev=editor&level=LVL-0001');
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
  const stone=page.locator('[data-hotspot="forestRune"]');
  const styles=el=>({background:getComputedStyle(el).backgroundImage,shadow:getComputedStyle(el).boxShadow});
  const legacy=await stone.evaluate(styles);
  expect(legacy.background).toContain('radial-gradient');
  await page.evaluate(()=>{
    const r=window.eval('voxelRenderer');r.updateSettings({challengeFx:{...r.getSettings().challengeFx,enabled:true,mode:"canvas"}});window.eval('render')();
    const original=window.AtlasChallengeFxVisuals.paint;
    window.AtlasChallengeFxVisuals.paint=(ctx,s,scene,...rest)=>{window.occlusionScene=scene;window.occlusionSettings=s;return original(ctx,s,scene,...rest);};
    window.occlusionPaint=original;
    const state=window.eval('state');state.worldX=1467;state.worldY=430;window.eval('updateWorldDom')();
  });
  await expect(stone).toHaveAttribute('data-legacy-rune-cue','true');
  expect(await stone.evaluate(styles)).toEqual({background:'none',shadow:'none'});
  await expect(stone).toBeEnabled();
  await expect.poll(()=>page.evaluate(()=>!!window.occlusionScene?.occluder)).toBe(true);
  const pixels=await page.evaluate(()=>{
    const scene=window.occlusionScene,s=window.occlusionSettings,o=scene.occluder,w=window.eval('level').world;
    function surface(){const c=document.createElement('canvas');c.width=w.width;c.height=w.height;return c.getContext('2d');}
    const mask=surface();mask.drawImage(o.image,o.x,o.y,o.width,o.height);
    const m=mask.getImageData(0,0,w.width,w.height).data;
    let point;
    for(let y=Math.floor(o.y+o.height*.4);y<o.y+o.height*.7&&!point;y++)for(let x=Math.floor(o.x+o.width*.3);x<o.x+o.width*.7;x++)if(m[(y*w.width+x)*4+3]>250){point=[x,y];break;}
    if(!point)throw Error('No opaque torso pixel');
    const sample={...scene,markers:[{x:point[0],y:point[1]}],exit:null,player:point};
    const plain=surface(),hidden=surface(),absorb=surface();
    window.occlusionPaint(plain,s,{...sample,occluder:null},null,0);
    window.occlusionPaint(hidden,s,sample,null,0);
    window.occlusionPaint(absorb,s,sample,{origin:point,bend:point,age:s.flow.duration+.2,releaseMarker:false},0);
    const a=plain.getImageData(0,0,w.width,w.height).data,b=hidden.getImageData(0,0,w.width,w.height).data;
    let removed=0,leaked=0,outsideChanged=0;
    for(let i=3;i<a.length;i+=4){if(m[i]===255&&a[i]>20){removed++;if(b[i]>1)leaked++;}if(m[i]===0&&a[i]!==b[i])outsideChanged++;}
    return{removed,leaked,outsideChanged,absorb:absorb.getImageData(...point,1,1).data[3],sourceIsLive:o.image===document.querySelector('[data-actor="sven"]')};
  });
  expect(pixels.removed).toBeGreaterThan(10);
  expect(pixels.leaked).toBe(0);
  expect(pixels.outsideChanged).toBe(0);
  expect(pixels.absorb).toBeGreaterThan(0);
  expect(pixels.sourceIsLive).toBe(true);
  await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
  await page.screenshot({path:info.outputPath('sven-in-front-of-marker.png')});
  await page.evaluate(()=>{const r=window.eval('voxelRenderer');r.updateSettings({challengeFx:{...r.getSettings().challengeFx,enabled:false,mode:"legacy"}});window.eval('render')();});
  expect(await stone.evaluate(styles)).toEqual(legacy);
});
