const { test: baseTest, expect } = require('@playwright/test');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').replace(/\/$/, '');
const imagePath = 'assets/ambient/flybys/arc_wasp/awc_wasp.png';
const soundPath = 'assets/ambient/flybys/arc_wasp/arc_wasp.mp3';
const test = baseTest.extend({ recoveryServer: async ({}, use) => {
  const server = await require('./asset-recovery-server').createRecoveryServer(base);
  try { await use(server); } finally { await server.close(); }
} });
test.setTimeout(90000);
test.afterEach(async ({ page }, info) => {
  if (page && info.status !== info.expectedStatus) console.log('RECOVERY DIAGNOSTIC', await page.evaluate(() => ({
    plays: window.recoveryPlays?.map(p => ({ ok: p.ok, error: p.error, ready: p.audio.readyState, src: p.audio.src, paused: p.audio.paused })),
    loads: window.recoveryLoads, failures: window.recoveryFailures,
    unlocked: window.eval('audioState.unlocked'),
    readiness: [...window.eval('ambientFlybyRuntime').readiness].map(([key, s]) => ({ key, ready: s.ready, sound: s.sound })),
    active: [...window.eval('ambientFlybyRuntime').active.keys()]
  })).catch(() => null));
});

async function boot(page, url) {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({ json: {} }));
  await page.addInitScript(() => {
    window.recoveryPlays = []; window.recoveryLoads = 0; window.recoveryFailures = 0;
    const load = HTMLMediaElement.prototype.load, play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.load = function () {
      if (this.src.includes('/arc_wasp.mp3')) {
        window.recoveryLoads++;
        this.addEventListener('error', () => window.recoveryFailures++, { once: true });
      }
      return load.call(this);
    };
    HTMLMediaElement.prototype.play = function () {
      if (!this.src.includes('/arc_wasp.mp3')) return play.call(this);
      const row = { audio: this }; window.recoveryPlays.push(row);
      return play.call(this).then(() => { row.ok = true; }, error => { row.error = error.name; throw error; });
    };
  });
  await page.goto(url);
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
}
async function enter(page) {
  expect(await page.evaluate(() => window.eval('selectLevel')('LVL-0032', { startImmediately: true, recordStart: false }))).toBe(true);
  await expect(page.locator('#app')).toHaveAttribute('data-screen', 'scene');
  // A real scene gesture unlocks audio; deferred bootstrap's Start is earlier
  // than the app's audio handlers and is not sufficient on every browser.
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-graphics-action="toggle"]').click();
}
async function soundReady(page) {
  await expect.poll(() => page.evaluate(() => window.eval('ambientFlybyRuntime').readiness.get('LVL-0032:arc_wasp2')?.sound)).toBe(true);
}
async function schedule(page) {
  await page.evaluate(() => {
    const r = window.eval('ambientFlybyRuntime'), c = window.eval('level').ambientFlybys[0];
    r.stopAll(); c.intervalMinMs = c.intervalMaxMs = 100; c.startDelayMs = 0;
    c.path = [{ x: 450, y: 240 }, { x: 900, y: 240 }]; c.speed = 50;
    c.soundTriggers = ['during']; r.invalidatePath(c.id); r.sync();
  });
  await expect(page.locator('[data-ambient-flyby="arc_wasp2"]')).toHaveAttribute('data-active', 'true');
}

test('optional image exhaustion permits entry and a later shared recovery becomes visible and cached', async ({ page, recoveryServer }) => {
  let failing = true, requests = 0, release;
  const held = new Promise(resolve => { release = resolve; });
  recoveryServer.route('/' + imagePath, async route => {
    requests++;
    if (failing) return route.fulfill({ status: 503, body: 'temporary image failure' });
    await held; await route.continue();
  });
  await boot(page, recoveryServer.url); await enter(page);
  // Each existing preparation consumer has its bounded three-attempt policy.
  expect(requests).toBeGreaterThanOrEqual(3); expect(requests).toBeLessThanOrEqual(6);
  expect(await page.evaluate(() => window.eval('assetReadiness.snapshot()').failed.some(a => a.path.includes('awc_wasp')))).toBe(true);
  expect(await page.evaluate(() => window.eval('ambientFlybyRuntime').readiness.get('LVL-0032:arc_wasp2')?.ready)).toBe(false);
  await page.evaluate(() => window.eval('returnToMenu')());
  failing = false; const before = requests;
  await page.evaluate(() => { window.recoveryEntry = window.eval('selectLevel')('LVL-0032', { startImmediately: true, recordStart: false }); });
  try {
    await expect.poll(() => requests).toBe(before + 1);
    await page.evaluate(path => { window.recoveryConsumers = Promise.all([window.eval('assetCache').image(path), window.eval('assetCache').image('./' + path)]); }, imagePath);
    expect(requests).toBe(before + 1);
  } finally { release(); }
  expect(await page.evaluate(() => window.recoveryEntry)).toBe(true);
  expect(await page.evaluate(async () => (await window.recoveryConsumers).every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await schedule(page);
  await expect(page.locator('[data-ambient-flyby="arc_wasp2"] img').first()).toBeVisible();
  await expect(page.locator('[data-ambient-flyby="arc_wasp2"]')).toBeInViewport();
  expect(await page.locator('[data-ambient-flyby="arc_wasp2"] img').evaluateAll(images => images.length > 0 && images.every(i => i.complete && i.naturalWidth > 0))).toBe(true);
  await page.evaluate(async path => { await Promise.all([window.eval('assetCache').image(path), window.eval('assetCache').image(path)]); }, imagePath);
  expect(requests).toBe(before + 1);
});

for (const boundary of ['preparation', 're-entry']) test(`failed Flyby preload recovers at later ${boundary} and native scheduled playback works`, async ({ page, recoveryServer }) => {
  let failing = true, requests = 0;
  recoveryServer.route('/' + soundPath, route => {
    requests++;
    return failing ? route.fulfill({ status: 503, body: 'temporary audio failure' }) : route.continue();
  });
  await boot(page, recoveryServer.url); await enter(page);
  await expect.poll(() => requests).toBeGreaterThan(0);
  await expect.poll(() => page.evaluate(() => window.recoveryFailures)).toBeGreaterThan(0);
  await schedule(page);
  expect(await page.evaluate(() => window.recoveryPlays.length)).toBe(0);
  await page.evaluate(() => {
    window.eval('ambientFlybyRuntime').stopAll();
    for (const c of window.eval('level').ambientFlybys) c.intervalMinMs = c.intervalMaxMs = 60000;
  });
  const before = requests, loads = await page.evaluate(() => window.recoveryLoads);
  if (boundary === 're-entry') await page.evaluate(() => window.eval('returnToMenu')());
  failing = false;
  if (boundary === 're-entry') await enter(page);
  else await page.evaluate(() => window.eval('ambientFlybyRuntime').prepareLevel(window.eval('level')));
  await soundReady(page);
  expect(requests).toBeGreaterThan(before);
  expect(await page.evaluate(() => window.recoveryLoads)).toBe(loads + 1);
  await schedule(page);
  await expect.poll(() => page.evaluate(() => window.recoveryPlays[0]?.ok)).toBe(true);
  await expect.poll(() => page.evaluate(() => window.recoveryPlays[0].audio.currentTime)).toBeGreaterThan(0);
  const gains = await page.evaluate(async () => {
    const frames = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const audio = window.recoveryPlays[0].audio;
    window.eval('audioConfig').volumes.master = 0; await frames(); const muted = audio.volume;
    window.eval('audioConfig').volumes.master = .5; await frames();
    return { muted, restored: audio.volume, ended: audio.ended };
  });
  expect(gains.muted).toBe(0); expect(gains.restored).toBeGreaterThan(0); expect(gains.ended).toBe(false);
  await page.evaluate(() => window.eval('returnToMenu')());
  expect(await page.evaluate(() => window.recoveryPlays.every(p => p.audio.paused))).toBe(true);
  expect(await page.evaluate(() => window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
});

test('concurrent recovered Flybys share one preload and group playback; play rejection stays separate', async ({ page, recoveryServer }) => {
  let failing = true, release;
  const held = new Promise(resolve => { release = resolve; });
  recoveryServer.route('/' + soundPath, async route => {
    if (failing) return route.fulfill({ status: 503, body: 'temporary audio failure' });
    await held; await route.continue();
  });
  await boot(page, recoveryServer.url); await enter(page);
  await expect.poll(() => page.evaluate(() => window.recoveryFailures)).toBe(1);
  failing = false;
  await page.evaluate(async () => {
    const level = window.eval('level'), c = level.ambientFlybys[0];
    c.syncKey = 'recovery-group'; c.intervalMinMs = c.intervalMaxMs = 60000;
    c.startDelayMs = 0; c.soundTriggers = ['during'];
    level.ambientFlybys.push({ ...c, id: 'recovery-copy' });
    await window.eval('ambientFlybyRuntime').prepareLevel(level);
    window.eval('render')();
  });
  try { expect(await page.evaluate(() => window.recoveryLoads)).toBe(2); }
  finally { release(); }
  await expect.poll(() => page.evaluate(() => [...window.eval('ambientFlybyRuntime').readiness.values()].filter(s => s.sound).length)).toBe(2);
  // Inject only a playback rejection after real successful preload. The next
  // scheduled group must use native play without reloading the preload asset.
  await page.evaluate(() => {
    const play = HTMLMediaElement.prototype.play;
    HTMLMediaElement.prototype.play = function () {
      if (!this.src.includes('/arc_wasp.mp3')) return play.call(this);
      HTMLMediaElement.prototype.play = play;
      window.rejectedRecoveryPlay = true;
      return Promise.reject(new DOMException('Test autoplay denial', 'NotAllowedError'));
    };
    const r = window.eval('ambientFlybyRuntime'); r.stopAll();
    for (const c of window.eval('level').ambientFlybys) c.intervalMinMs = c.intervalMaxMs = 100;
    r.sync();
  });
  await expect.poll(() => page.evaluate(() => window.rejectedRecoveryPlay)).toBe(true);
  expect(await page.evaluate(() => window.eval('ambientFlybyRuntime').active.size)).toBe(2);
  await expect.poll(() => page.evaluate(() => window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
  await page.evaluate(() => { const r = window.eval('ambientFlybyRuntime'); r.stopAll(); r.sync(); });
  await expect.poll(() => page.evaluate(() => window.recoveryPlays[0]?.ok)).toBe(true);
  expect(await page.evaluate(() => window.recoveryPlays.length)).toBe(1);
  expect(await page.evaluate(() => window.recoveryLoads)).toBe(2);
  await page.evaluate(() => window.eval('returnToMenu')());
  expect(await page.evaluate(() => window.recoveryPlays.every(p => p.audio.paused))).toBe(true);
});

for (const boundary of ['menu', 'transition', 'restart', 'cancel']) test(`pending recovered audio cannot start stale playback after ${boundary}`, async ({ page, recoveryServer }) => {
  let failing = true, pending = 0, release;
  const held = new Promise(resolve => { release = resolve; });
  recoveryServer.route('/' + soundPath, async route => {
    if (failing) return route.fulfill({ status: 503, body: 'temporary audio failure' });
    pending++; await held; await route.continue();
  });
  await boot(page, recoveryServer.url); await enter(page);
  await expect.poll(() => page.evaluate(() => window.recoveryFailures)).toBe(1);
  failing = false;
  await page.evaluate(() => window.eval('ambientFlybyRuntime').prepareLevel(window.eval('level')));
  try {
    await expect.poll(() => pending).toBeGreaterThan(0);
    await page.evaluate(async boundary => {
      if (boundary === 'menu') window.eval('returnToMenu')();
      if (boundary === 'transition') await window.eval('selectLevel')('LVL-0001', { startImmediately: true, recordStart: false });
      if (boundary === 'restart') window.eval('restart')();
      if (boundary === 'cancel') window.eval('ambientFlybyRuntime').stopAll();
    }, boundary);
  } finally { release(); }
  // Covers native media callbacks and the existing 1.8-second preload fallback.
  await page.waitForTimeout(2000);
  expect(await page.evaluate(() => window.recoveryPlays.length)).toBe(0);
  expect(await page.evaluate(() => window.eval('ambientFlybyRuntime').activeAudio.size)).toBe(0);
  expect(await page.evaluate(() => window.eval('ambientFlybyRuntime').active.has('arc_wasp2'))).toBe(false);
  if (boundary === 'menu') await expect(page.locator('.menuScreen')).toBeVisible();
  if (boundary === 'restart') await expect(page.locator('#app')).toHaveAttribute('data-screen', 'intro');
});

test('pending recovered optional image cannot activate a superseded level', async ({ page, recoveryServer }) => {
  let failing = true, pending = 0, release;
  const held = new Promise(resolve => { release = resolve; });
  recoveryServer.route('/' + imagePath, async route => {
    if (failing) return route.fulfill({ status: 503, body: 'temporary image failure' });
    pending++; await held; await route.continue();
  });
  await boot(page, recoveryServer.url); await enter(page);
  await page.evaluate(() => window.eval('returnToMenu')());
  failing = false;
  await page.evaluate(() => { window.recoveryEntry = window.eval('selectLevel')('LVL-0032', { startImmediately: true, recordStart: false }); });
  try {
    await expect.poll(() => pending).toBe(1);
    await page.evaluate(() => window.eval('returnToMenu')());
  } finally { release(); }
  expect(await page.evaluate(() => window.recoveryEntry)).toBe(false);
  await expect(page.locator('.menuScreen')).toBeVisible();
  expect(await page.locator('[data-ambient-flyby]').count()).toBe(0);
  expect(await page.evaluate(() => window.eval('assetReadiness.snapshot()'))).toBeNull();
  expect(await page.evaluate(() => window.eval('ambientFlybyRuntime').active.size)).toBe(0);
});

test('recovered preload never starts audio late for a finished flight', async ({ page, recoveryServer }) => {
  let failing = true, release;
  const held = new Promise(resolve => { release = resolve; });
  recoveryServer.route('/' + soundPath, async route => {
    if (failing) return route.fulfill({ status: 503, body: 'temporary audio failure' });
    await held; await route.continue();
  });
  await boot(page, recoveryServer.url); await enter(page);
  await expect.poll(() => page.evaluate(() => window.recoveryFailures)).toBe(1);
  failing = false;
  await page.evaluate(async () => {
    const r = window.eval('ambientFlybyRuntime'), c = window.eval('level').ambientFlybys[0];
    c.path = [{ x: 450, y: 240 }, { x: 460, y: 240 }]; c.speed = 20;
    c.intervalMinMs = c.intervalMaxMs = 50; c.startDelayMs = 0; c.soundTriggers = ['during'];
    await r.prepareLevel(window.eval('level'));
  });
  try {
    await expect.poll(() => page.evaluate(() => window.eval('ambientFlybyRuntime').active.has('arc_wasp2'))).toBe(true);
    await page.evaluate(() => { for (const c of window.eval('level').ambientFlybys) c.intervalMinMs = c.intervalMaxMs = 60000; });
    await expect.poll(() => page.evaluate(() => window.eval('ambientFlybyRuntime').active.size)).toBe(0);
    expect(await page.evaluate(() => window.recoveryPlays.length)).toBe(0);
  } finally { release(); }
  await soundReady(page);
  expect(await page.evaluate(() => window.recoveryPlays.length)).toBe(0);
  await schedule(page);
  await expect.poll(() => page.evaluate(() => window.recoveryPlays[0]?.ok)).toBe(true);
  expect(await page.evaluate(() => window.recoveryPlays.length)).toBe(1);
  await page.evaluate(() => window.eval('returnToMenu')());
});
