const { test, expect } = require('@playwright/test');
const path = require('path');
const root = path.join(__dirname, '..');
require('./editor-draft-fixture').preserveEditorDrafts(test, root);
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];

test('legacy sand drafts retain bounded rendering through the shared Canvas2D field backend', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setContent('<body style="margin:0;background:#181715"><canvas data-scene-effects-canvas="worldAtmosphere"></canvas></body>');
  await page.addScriptTag({ path: path.join(root, 'src/cinematic-settings.js') });
  await page.addScriptTag({ path: path.join(root, 'src/scene-effects.js') });
  const result = await page.evaluate(() => {
    const api = window.AtlasSceneEffects;
    // Drive the real shared scheduler deterministically, without adding a test renderer.
    let callback;
    window.requestAnimationFrame = fn => { callback = fn; return 1; };
    window.cancelAnimationFrame = () => { callback = null; };
    const effect = api.defaultInstance('windblown-sand', 'fine-sand', { width: 1200, height: 700 });
    effect.seed = 33019; effect.geometry = { type: 'rectangle', x: 600, y: 560, width: 1100, height: 85 };
    const level = { id: 'sand-test', world: { width: 1200, height: 700 }, sceneEffects: [effect] };
    const runtime = api.createRuntime({ getLevel: () => level, getScreen: () => 'scene' });
    const canvas = document.querySelector('canvas'), ctx = canvas.getContext('2d');
    let grains = 0, largest = 0;
    const fill = ctx.fillRect.bind(ctx);
    ctx.fillRect = (x,y,w,h) => { grains++; largest = Math.max(largest,w,h); fill(x,y,w,h); };
    const pixels = () => {
      const data = ctx.getImageData(0,0,1200,700).data;
      let count = 0, minY = 700, maxY = 0, maxAlpha = 0, sum = 0;
      for(let y=0;y<700;y++) for(let x=0;x<1200;x++) {
        const a = data[(y*1200+x)*4+3];
        if(a) { count++; minY=Math.min(minY,y); maxY=Math.max(maxY,y); maxAlpha=Math.max(maxAlpha,a); sum += a*(x+1); }
      }
      return {count,minY,maxY,maxAlpha,sum};
    };
    const counts = [];
    for(const tier of ['high','balanced','reduced']) {
      document.documentElement.dataset.effectsQuality = tier;
      grains = 0; runtime.prepareLevel(level); counts.push(grains);
    }
    document.documentElement.dataset.effectsQuality = 'high';
    runtime.prepareLevel(level);
    const first = pixels(); callback(performance.now()+4000); const later = pixels();
    effect.overrides.amount=0; runtime.sync(); const zero = pixels().count;
    effect.overrides.amount=1; effect.overrides.opacity=0; runtime.sync(); const transparent = pixels().count;
    effect.overrides.opacity=.55; runtime.sync();
    const reduced = api.resolve(effect,level,{quality:'balanced',reducedMotion:true});
    runtime.dispose();
    const disposed = { raf:runtime.rafId, count:runtime.resolved.length, pixels:pixels().count };
    runtime.prepareLevel(level);
    return { first,later,counts,largest,zero,transparent,disposed,reducedSpeed:reduced.speed,
      validation:api.validateLevel(level), canvases:document.querySelectorAll('canvas').length };
  });
  expect(result.validation.errors).toEqual([]);
  expect(result.counts).toEqual([480,326,182]);
  expect(result.largest).toBeLessThan(2);
  expect(result.first.count).toBeGreaterThan(1500);
  expect(result.first.minY).toBeGreaterThan(525);
  expect(result.first.maxY).toBeLessThan(600);
  expect(result.first.maxAlpha).toBeLessThan(100);
  expect(result.later.sum).not.toBe(result.first.sum);
  expect(result.zero).toBe(0); expect(result.transparent).toBe(0);
  expect(result.disposed).toEqual({raf:null,count:0,pixels:0});
  expect(result.reducedSpeed).toBeLessThan(.2);
  expect(result.canvases).toBe(1);
  await page.locator('canvas').screenshot({path:info.outputPath('sand-ribbon.png')});
});

