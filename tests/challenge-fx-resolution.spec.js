const {test,expect}=require('@playwright/test');
const base=process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173';

for(const dpr of [1,2])test.describe(`FX DPR ${dpr}`,()=>{
  test.use({deviceScaleFactor:dpr});
  test('screen-resolution raster retains world alignment through resize and camera motion',async({page},info)=>{
    await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
    await page.goto(base+'/?dev=editor&level=LVL-0001');
    await expect(page.locator('[data-actor="sven"]')).toBeVisible();
    await page.evaluate(()=>{
      const renderer=window.eval('voxelRenderer');
      renderer.updateSettings({challengeFx:{...renderer.getSettings().challengeFx,enabled:true,mode:"canvas"}});
      window.eval('render')();
      const paint=window.AtlasChallengeFxVisuals.paint;
      window.AtlasChallengeFxVisuals.paint=(ctx,...args)=>{
        window.fxRasterTransform={a:ctx.getTransform().a,d:ctx.getTransform().d};
        return paint(ctx,...args);
      };
    });
    const inspect=()=>page.evaluate(()=>{
      const canvas=document.querySelector('[data-challenge-fx-canvas]'),r=canvas.getBoundingClientRect(),world=window.eval('level').world;
      const marker=document.querySelector('[data-rune="zon"]'),m=marker.getBoundingClientRect();
      const x=+marker.dataset.worldCenterX,y=+marker.dataset.worldCenterY;
      return{width:canvas.width,height:canvas.height,cssWidth:r.width,cssHeight:r.height,dpr:devicePixelRatio,
        world,transform:window.fxRasterTransform,error:Math.hypot(r.left+x/world.width*r.width-(m.left+m.width/2),r.top+y/world.height*r.height-(m.top+m.height/2)),
        legacy:[...document.querySelectorAll('[data-scene-effects-canvas]')].map(c=>[c.width,c.height])};
    });
    await expect.poll(()=>page.evaluate(()=>!!window.fxRasterTransform)).toBe(true);
    const before=await inspect();
    await info.attach('raster-dimensions',{body:JSON.stringify(before,null,2),contentType:'application/json'});
    await page.screenshot({path:info.outputPath('production.png')});
    async function check(){
      await expect.poll(async()=>{
        const m=await inspect(),scale=Math.min(m.dpr,2,8192/Math.max(m.cssWidth,m.cssHeight),Math.sqrt(8e6/(m.cssWidth*m.cssHeight)));
        return Math.abs(m.width-Math.floor(m.cssWidth*scale))+Math.abs(m.height-Math.floor(m.cssHeight*scale));
      }).toBeLessThanOrEqual(2);
      const m=await inspect();
      expect(m.error).toBeLessThan(1);
      expect(m.transform.a).toBeCloseTo(m.width/m.world.width,5);
      expect(m.transform.d).toBeCloseTo(m.height/m.world.height,5);
      expect(m.width*m.height).toBeLessThanOrEqual(8e6);
      for(const dimensions of m.legacy)expect(dimensions).toEqual([m.world.width,m.world.height]);
    }
    await check();
    await page.setViewportSize({width:1180,height:734});
    await check();
    await page.evaluate(()=>{
      const s=window.eval('state');s.worldX=1800;window.eval('updateWorldDom')();
    });
    await check();
    await page.setViewportSize({width:820,height:1180});
    await check();
    await page.evaluate(()=>{
      const r=window.eval('voxelRenderer');r.updateSettings({challengeFx:{...r.getSettings().challengeFx,enabled:false,mode:"legacy"}});window.eval('render')();
    });
    await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
    await page.evaluate(()=>{
      const r=window.eval('voxelRenderer');r.updateSettings({challengeFx:{...r.getSettings().challengeFx,enabled:true,mode:"canvas"}});window.eval('render')();
    });
    await check();
  });
});
