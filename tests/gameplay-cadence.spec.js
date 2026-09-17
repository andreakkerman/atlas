const { test, expect } = require('@playwright/test');
const { createSampler } = require('../src/gameplay-cadence');
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';
for (const hz of [30, 60, 90, 120]) {
  test(`foreground cadence and pacing at ${hz} Hz`, () => {
    const sampler = createSampler(); let sample;
    for (let i = 0; i <= hz + 1; i++) sample = sampler.frame(i * 1000 / hz) || sample;
    expect(sample.fps).toBeCloseTo(hz, 5);
    expect(sample.expectedMs).toBeCloseTo(1000 / hz, 5);
    expect(sample.missed).toBe(0);
    sampler.reset(); expect(sampler.frame(50000)).toBeNull();
    expect(sampler.frame(50500)).toBeNull();
  });
}
test('a long hitch reduces throughput and records missed opportunities', () => {
  const sampler = createSampler(); sampler.frame(0);
  for (let i = 1; i <= 30; i++) sampler.frame(i * 1000 / 60);
  const sample = sampler.frame(1000);
  expect(sample.fps).toBe(31);
  expect(sample.worstMs).toBe(500);
  expect(sample.missed).toBe(29);
  expect(sample.missedPercent).toBeCloseTo(29 / 60 * 100);
});
async function scene(page) {
  await page.route('**/__dev/levels/*/editor-draft', route => route.fulfill({json:{}}));
  await page.goto(base + '/?dev=editor&level=LVL-0001');
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
}
test('shared HUD: modes, stalls, visibility, level entry, debug and off use fresh samples', async ({page}) => {
  await page.addInitScript(() => {
    const raf = window.requestAnimationFrame, cancel = window.cancelAnimationFrame;
    window.__cadenceCallbacks = new Map(); let id = -1;
    window.requestAnimationFrame = callback => {
      if (callback.name !== 'sampleGameplayFrame') return raf(callback);
      const key = id--; window.__cadenceCallbacks.set(key, callback); return key;
    };
    window.cancelAnimationFrame = key => window.__cadenceCallbacks.delete(key) || cancel(key);
    window.__advanceCadence = timestamps => timestamps.forEach(t => {
      const callbacks = [...window.__cadenceCallbacks.values()]; window.__cadenceCallbacks.clear(); callbacks.forEach(callback => callback(t));
    });
  });
  await scene(page);
  await page.evaluate(() => window.eval('toggleDisplayControl')('fps'));
  for (const mode of ['illustrated', 'cinematic', 'illustrated']) {
    await page.evaluate(mode => { window.eval('voxelRenderer').updateSettings({renderer:mode}); window.eval('render')(); }, mode);
    const hud = page.locator('[data-fps-display]');
    await expect(hud).toHaveCount(1); await expect(hud).toHaveText('— FPS');
    await page.evaluate(() => window.__advanceCadence(Array.from({length:62}, (_,i)=>i*1000/60)));
    await expect(hud).toHaveText('60 FPS');
    await page.evaluate(() => { if (!window.eval('debugInfoEnabled')) window.eval('toggleDisplayControl')('debug'); window.__advanceCadence([...Array.from({length:29}, (_,i)=>(i+62)*1000/60), 2100]); });
    await expect(hud).toContainText('worst 600 ms');
    expect(parseInt(await hud.textContent())).toBeLessThan(40);
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', {configurable:true, value:true}); document.dispatchEvent(new Event('visibilitychange')); });
    await expect(hud).toHaveText('— FPS');
    expect(await page.evaluate(()=>window.__cadenceCallbacks.size)).toBe(0);
    await page.evaluate(() => { Object.defineProperty(document, 'hidden', {configurable:true, value:false}); document.dispatchEvent(new Event('visibilitychange')); });
    await expect(hud).toHaveText('— FPS');
    await page.evaluate(() => { window.__advanceCadence(Array.from({length:62}, (_,i)=>100000+i*1000/60)); window.eval('toggleDisplayControl')('debug'); });
    await expect(hud).toHaveText('60 FPS');
  }
  for (const mode of ['illustrated', 'cinematic']) {
    await page.evaluate(mode => { window.eval('voxelRenderer').updateSettings({renderer:mode}); window.eval('render')(); window.eval('syncFpsDisplay')(true); window.__advanceCadence(Array.from({length:32}, (_,i)=>i*1000/30)); }, mode);
    await expect(page.locator('[data-fps-display]')).toHaveText('30 FPS');
  }
  await page.evaluate(()=>window.eval('toggleDisplayControl')('fps'));
  await expect(page.locator('[data-fps-display]')).toBeHidden();
  expect(await page.evaluate(()=>window.__cadenceCallbacks.size)).toBe(0);
  await page.evaluate(()=>window.eval('toggleDisplayControl')('fps'));
  await expect(page.locator('[data-fps-display]')).toHaveText('— FPS');
  await page.evaluate(()=>{window.eval('state').screen='menu';window.eval('render')();});
  expect(await page.evaluate(()=>window.__cadenceCallbacks.size)).toBe(0);
  await page.evaluate(()=>{window.eval('state').screen='scene';window.eval('render')();});
  await expect(page.locator('[data-fps-display]')).toHaveText('— FPS');
  await page.evaluate(async()=>{ await window.eval('selectLevel')('LVL-0001', {startImmediately:true,recordStart:false}); });
  await expect(page.locator('[data-fps-display]')).toHaveCount(1);
  await expect(page.locator('[data-fps-display]')).toHaveText('— FPS');
});
test('real RAF stays primary when Illustrated effects and Cinematic submissions run slower', async ({page}) => {
  test.skip(process.env.ATLAS_WEBGPU_QA !== '1', 'Requires real WebGPU');
  test.setTimeout(60000);
  await page.route('**/src/cinematic-renderer.js', async route => {
    const response=await route.fetch();
    const body=(await response.text()).replace('function renderFrame(timestamp) {', 'function renderFrame(timestamp) { if(timestamp-(window.__lastSubmission||0)<32){raf=requestAnimationFrame(renderFrame);return;}window.__lastSubmission=timestamp;');
    await route.fulfill({response,body});
  });
  await scene(page);
  await page.evaluate(()=>{
    window.eval('voxelRenderer').updateSettings({renderer:'illustrated'});window.eval('render')();window.eval('toggleDisplayControl')('fps');
    document.documentElement.dataset.effectsQuality='balanced';
    const original=CanvasRenderingContext2D.prototype.clearRect, target=document.querySelector('[data-scene-effects-canvas]');window.__draws=0;
    CanvasRenderingContext2D.prototype.clearRect=function(...args){if(this.canvas===target)window.__draws++;return original.apply(this,args);};
  });
  await page.waitForTimeout(2500);
  await page.evaluate(()=>{window.__draws=0;window.__start=performance.now();});
  await page.waitForTimeout(3000);
  const effects=await page.evaluate(()=>window.__draws*1000/(performance.now()-window.__start));
  expect(effects).toBeGreaterThan(20);expect(effects).toBeLessThan(40);
  const fps=async()=>parseInt(await page.locator('[data-fps-display]').textContent());
  expect(await fps()).toBeGreaterThan(50);
  await page.evaluate(()=>window.eval('sceneEffectRuntime').pause());await page.waitForTimeout(2200);
  expect(await fps()).toBeGreaterThan(50);
  await page.evaluate(()=>{window.eval('voxelRenderer').updateSettings({renderer:'cinematic'});window.eval('render')();});
  await expect.poll(()=>page.evaluate(()=>window.eval('cinematicRenderer').snapshot().status)).toBe('ready');
  await page.waitForTimeout(5000);
  expect(await fps()).toBeGreaterThan(50);
  const rendererFps=await page.evaluate(()=>window.eval('cinematicRenderer').snapshot().fps);
  expect(rendererFps).toBeGreaterThan(25);expect(rendererFps).toBeLessThan(35);
  // Unlike a submission cap, sustained main-thread work reduces the shared RAF.
  await page.evaluate(()=>{
    window.__cpuLoad=true;
    function busyFrame(){if(!window.__cpuLoad)return;const until=performance.now()+32;while(performance.now()<until){};requestAnimationFrame(busyFrame);}
    requestAnimationFrame(busyFrame);
  });
  try {
    await page.waitForTimeout(2700);
    expect(await fps()).toBeGreaterThan(20);expect(await fps()).toBeLessThan(40);
  } finally { await page.evaluate(()=>{window.__cpuLoad=false;}); }

  for (const mode of ['illustrated', 'cinematic']) {
    await page.evaluate(mode=>{window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();window.eval('syncFpsDisplay')(true);},mode);
    await page.waitForTimeout(400);
    await page.evaluate(()=>{const until=performance.now()+700;while(performance.now()<until){};});
    await expect.poll(()=>page.evaluate(()=>window.eval('fpsSample')?.worstMs || 0)).toBeGreaterThan(650);
    expect(await fps()).toBeLessThan(40);
  }

});
