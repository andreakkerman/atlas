const { test, expect } = require('@playwright/test');
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';
const framePattern = '**/assets/characters/freya/idle_animation_2/frame_001.png?v=*';

async function openMenu(page) {
  await page.goto(base);
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
}

test.describe('cold-cache critical assets', () => {
  test.setTimeout(90_000);

  test('first Runenpoort launch retries one Freya 503 before READY and reuses every prepared frame', async ({ page }) => {
    // A fresh browser context plus routing disables HTTP cache; workers are blocked
    // by the shared config. Count fetches as well as native image requests.
    const requests = [], lateRequests = [];
    let ready = false;
    page.on('request', request => {
      if (request.url().includes('/assets/characters/freya/')) {
        requests.push(request.url());
        if (ready) lateRequests.push(request.url());
      }
    });
    let attempts = 0, release;
    const held = new Promise(resolve => { release = resolve; });
    await page.route(framePattern, async route => {
      attempts++;
      if (attempts === 1) return route.fulfill({ status: 503, body: 'Temporarily unavailable' });
      await held;
      await route.continue();
    });
    await openMenu(page);
    await page.evaluate(() => {
      window.coldLaunch = window.eval('selectLevel')('LVL-0001', { startImmediately: true, recordStart: false });
    });
    try {
      await expect.poll(() => attempts).toBe(2);
      await expect(page.locator('#app')).toHaveAttribute('data-screen', 'loading');
      await expect(page.locator('#app')).toHaveAttribute('data-critical-assets-ready', 'false');
      expect(await page.evaluate(() => window.eval('assetReadiness.snapshot()'))).toBeNull();
      expect(await page.evaluate(() => {
        const cache = window.eval('assetCache');
        const character = window.ATLAS_CHARACTER_MANIFEST.characters.find(c => c.id === 'freya');
        const path = character.animations.idle_animation_2[0];
        return cache.image(path) === cache.image(`./${path}`);
      })).toBe(true);
    } finally { release(); }
    expect(await page.evaluate(() => window.coldLaunch)).toBe(true);
    ready = true;
    const result = await page.evaluate(async () => {
      const plan = window.eval('assetReadiness.snapshot()');
      const cache = window.eval('assetCache');
      const character = window.ATLAS_CHARACTER_MANIFEST.characters.find(c => c.id === 'freya');
      const frames = Object.values(character.animations).flat();
      const runtime = window.eval('npcAnimationRuntime');
      cancelAnimationFrame(runtime.rafId);
      runtime.rafId = 0;
      const entry = runtime.entries.get('LVL-0001:wind');
      const missing = [], unusable = [], different = [];
      for (const [animation, paths] of Object.entries(character.animations)) {
        window.eval('setNpcAnimation')(entry, animation, performance.now());
        for (let index = 0; index < paths.length; index++) {
          const path = paths[index];
          const prepared = plan.images.get(path);
          if (!plan.assets.some(a => a.path === path && a.required)) missing.push(path);
          if (!prepared?.complete || !prepared.naturalWidth) unusable.push(path);
          if (await cache.image(path) !== prepared) different.push(path);
          entry.frameIndex = index;
          window.eval('setNpcFrame')(entry);
          const sprite = entry.element.querySelector('[data-npc-sprite]');
          await sprite.decode();
          if (sprite.src !== prepared?._atlasObjectUrl || !sprite.naturalWidth) different.push(path);
        }
      }
      return {
        frames, missing, unusable, different, ready: plan.ready, failed: plan.failed.length,
        allCriticalUsable: plan.results.filter(asset => asset.required)
          .every(asset => asset.ready && asset.image?.complete && asset.image.naturalWidth > 0)
      };
    });
    expect(result.frames.length).toBeGreaterThan(1);
    expect(result.missing).toEqual([]);
    expect(result.unusable).toEqual([]);
    expect(result.different).toEqual([]);
    expect(result.ready).toBe(true);
    expect(result.allCriticalUsable).toBe(true);
    expect(result.failed).toBe(0);
    for (const frame of result.frames) {
      expect(frame).toMatch(/\?v=.+/);
      const count = requests.filter(url => url === new URL(frame, base).href).length;
      expect(count, frame).toBe(frame.includes('/idle_animation_2/frame_001.png') ? 2 : 1);
    }
    expect(attempts).toBe(2);
    expect(lateRequests).toEqual([]);
  });

  for (const status of [503, 404]) test(`HTTP ${status} exhaustion never reports READY`, async ({ page }) => {
    let attempts = 0;
    await page.route(framePattern, route => {
      attempts++;
      return route.fulfill({ status, body: 'Unavailable' });
    });
    await openMenu(page);
    expect(await page.evaluate(() => window.eval('selectLevel')('LVL-0001', { startImmediately: true, recordStart: false }))).toBe(false);
    expect(attempts).toBe(status === 503 ? 3 : 1);
    await expect(page.locator('#app')).toHaveAttribute('data-screen', 'menu');
    expect(await page.evaluate(() => ({
      plan: window.eval('assetReadiness.snapshot()'),
      ready: Boolean(window.eval('state.criticalAssetsReady')),
      error: window.eval('state.error')
    }))).toEqual({ plan: null, ready: false, error: expect.stringContaining(`Image request failed (${status})`) });
  });

  test('prepare awaits image decode and rejects unusable pixels', async ({ page }) => {
    await openMenu(page);
    await page.evaluate(() => {
      const original = HTMLImageElement.prototype.decode;
      window.decodeEntered = false;
      const held = new Promise(resolve => { window.releaseDecode = resolve; });
      HTMLImageElement.prototype.decode = async function () {
        await original.call(this);
        window.decodeEntered = true;
        await held;
        throw new Error('Decode failed');
      };
      const cache = window.AtlasAmbientSystem.createAssetCache();
      const coordinator = window.AtlasAssetReadiness.createCoordinator({ loadImage: src => cache.image(src) });
      window.decodeResult = 'pending';
      window.decodePlan = coordinator.prepare({ id: 'decode', world: { background: 'assets/characters/freya/idle_animation_2/frame_001.png' } })
        .then(() => { window.decodeResult = 'ready'; }, () => { window.decodeResult = 'failed'; });
    });
    await expect.poll(() => page.evaluate(() => window.decodeEntered)).toBe(true);
    expect(await page.evaluate(() => window.decodeResult)).toBe('pending');
    await page.evaluate(async () => { window.releaseDecode(); await window.decodePlan; });
    expect(await page.evaluate(() => window.decodeResult)).toBe('failed');
  });
});
