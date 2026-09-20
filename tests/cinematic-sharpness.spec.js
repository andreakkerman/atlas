const {test, expect} = require('@playwright/test');
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';

for (const layout of [
  {name:'desktop', width:1280, height:800, dpr:1},
  {name:'desktop-wide', width:2560, height:1440, dpr:1},
  {name:'tablet-landscape', width:1180, height:734, dpr:2},
  {name:'tablet-portrait', width:820, height:1180, dpr:2},
]) test(`Cinematic preserves sprite resolution and lighting at ${layout.name}`, async ({browser}, info) => {
  test.skip(!process.env.ATLAS_WEBGPU_QA || info.project.name !== 'desktop-chromium', 'Real WebGPU Chromium required');
  const context = await browser.newContext({viewport:{width:layout.width,height:layout.height}, deviceScaleFactor:layout.dpr, serviceWorkers:'block'});
  const page = await context.newPage(), errors = [], measurements = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type()==='error') errors.push(m.text()); });
  await page.route('**/__dev/levels/*/editor-draft', route => route.fulfill({json:{}}));
  try {
    await page.goto(base);
    for (const [id, character] of [['LVL-0033','sven_arc'],['LVL-0001','sven']]) {
      await page.evaluate(async id => {
        window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});
        await window.eval('selectLevel')(id,{startImmediately:true,recordStart:false});
      }, id);
      const actor = page.locator('[data-actor="sven"]');
      await expect(actor).toHaveAttribute('data-character-id', character);
      await expect(actor).toBeVisible();
      const box = await actor.boundingBox();
      const clip = {x:Math.max(0,Math.floor(box.x)), y:Math.max(0,Math.floor(box.y)), width:Math.ceil(box.width), height:Math.ceil(box.height)};
      await page.screenshot({clip,path:info.outputPath(`${character}-illustrated.png`)});
      await page.evaluate(() => { window.eval('voxelRenderer').updateSettings({renderer:'cinematic'}); window.eval('render')(); });
      await expect.poll(() => page.evaluate(() => { const s=window.eval('cinematicRenderer').snapshot(); return s.error || s.status; }),{timeout:25000}).toBe('ready');
      const authored = await page.evaluate(()=>window.eval('cinematicRenderer').getSettings());
      const captures = [];
      for (const [name, relight, wrap, rim] of [['off',false,false,false],['relight',true,false,false],['wrap',true,true,false],['full',true,true,true],['off-again',false,false,false]]) {
        await page.evaluate(({relight,wrap,rim}) => {
          const api=window.AtlasCinematicSettings, level=window.eval('level');
          // Isolate character treatments from authored fog, bloom and grading. No disk writes.
          const value=api.normalize({depth:{enabled:false}, characters:{enabled:relight,groundingShadow:false,ambientInfluence:0.6}, wrap:{enabled:wrap,strength:0.5}, rim:{enabled:rim,strength:0.5,ambientInfluence:1}});
          window.eval('worldResolver').updateLevelSettings(level.id,{cinematicLighting:value});
          window.eval('cinematicRenderer').sync();
          window.eval('locomotion').reset();
        },{relight,wrap,rim});
        const frame=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame);
        await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame)).toBeGreaterThan(frame+2);
        captures.push(await page.screenshot({clip,path:info.outputPath(`${character}-${name}.png`)}));
      }
      for (let i=1;i<4;i++) expect(captures[i].equals(captures[i-1])).toBe(false);
      expect(captures[4].equals(captures[0])).toBe(true);
      const measurement = await page.evaluate(() => {
        const canvas=document.querySelector('.cinematicViewportCanvas'), actor=document.querySelector('[data-actor="sven"]');
        return {css:[canvas.clientWidth,canvas.clientHeight],dpr:devicePixelRatio,source:[actor.naturalWidth,actor.naturalHeight],snapshot:window.eval('cinematicRenderer').snapshot()};
      });
      measurements.push({character,...measurement});
      expect(measurement.snapshot.textureUploads.find(u=>u.purpose==='sprite actor:sven')).toMatchObject({width:measurement.source[0],height:measurement.source[1]});
      expect(measurement.snapshot.error).toBeNull();
      await page.evaluate(()=>{
        const renderer=window.eval('cinematicRenderer'), s=renderer.getSettings();s.characters.groundingShadow=true;
        window.eval('worldResolver').updateLevelSettings(window.eval('level').id,{cinematicLighting:s});renderer.sync();
      });
      await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().shadowDraws)).toBeGreaterThan(0);
      await page.evaluate(authored=>{
        window.eval('worldResolver').updateLevelSettings(window.eval('level').id,{cinematicLighting:authored});
        window.eval('cinematicRenderer').sync();
      },authored);
      const frame=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame);
      await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().frame)).toBeGreaterThan(frame+20);
      await page.screenshot({clip,path:info.outputPath(`${character}-authored.png`)});
      expect(await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().error)).toBeNull();
    }
    await info.attach('render-path.json',{body:JSON.stringify(measurements,null,2),contentType:'application/json'});
    for (const m of measurements) expect(m.snapshot.resolution).toEqual(m.css.map(n=>Math.round(n*m.dpr)));
    expect(errors).toEqual([]);
  } finally { await context.close(); }
});
