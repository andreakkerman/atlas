const { chromium } = require('@playwright/test');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({ channel: 'chromium', headless: true, args: ['--enable-unsafe-webgpu'] });
  const page = await browser.newPage({ viewport: { width: 2548, height: 1297 }, deviceScaleFactor: 1.5 });
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', e => { if(e.type() === 'error') errors.push(e.text()); });
  await page.route('**/__dev/levels/*/editor-draft', route => route.fulfill({ json: {} }));
  await page.goto('http://127.0.0.1:4173/?dev=editor&level=LVL-0001');
  await page.waitForFunction(() => window.eval('state.screen') === 'scene', { timeout: 30000 });
  await page.evaluate(() => {
    window.eval('state').completedRunes = new Set(['zon', 'steen', 'wind']);
    window.eval('setGuideMessage')({speaker:'minnie',text:'Je kunt verder! Op naar de tempel.'});
  });
  await page.evaluate(() => { window.eval('voxelRenderer.updateSettings')({ renderer: '3d' }); window.eval('render')(); });
  await page.waitForFunction(() => ['ready','error'].includes(window.eval('threeRenderer.snapshot')().status), { timeout: 30000 });
  fs.mkdirSync('qa-screenshots/three', { recursive: true });
  const results = [];
  for (const [label, x, y, camera] of [['forest', 588, 613, 0], ['temple', 1553, 594, 760]]) {
    await page.evaluate(({ x,y,camera }) => {
      const s = window.eval('state'); s.worldX=x; s.worldY=y; s.cameraX=camera;
      window.eval('render')();
    }, { x,y,camera });
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `qa-screenshots/three/${label}-3d.png` });
    await page.screenshot({ path: `qa-screenshots/three/${label}-3d.jpg`, quality: 78 });
    results.push({ label, ...await page.evaluate(() => ({ ...window.eval('threeRenderer.snapshot')(), viewport:window.eval('state.viewportWorldWidth'),stateCamera:window.eval('state.cameraX'), animals:[...document.querySelectorAll('.ambientAnimal')].map(el=>({ready:el.dataset.ready,opacity:getComputedStyle(el).opacity,rect:el.getBoundingClientRect().toJSON(),src:el.querySelector('img')?.src})) })) });
    await page.evaluate(() => { window.eval('voxelRenderer.updateSettings')({ renderer: 'illustrated' }); window.eval('render')(); });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `qa-screenshots/three/${label}-illustrated.png` });
    await page.screenshot({ path: `qa-screenshots/three/${label}-illustrated.jpg`, quality: 78 });
    await page.evaluate(() => { window.eval('voxelRenderer.updateSettings')({ renderer: '3d' }); window.eval('render')(); });
    await page.waitForFunction(() => window.eval('threeRenderer.snapshot')().ready);
  }
  console.log(JSON.stringify({ results, errors }, null, 2));
  fs.writeFileSync('qa-screenshots/three/metrics.json', JSON.stringify({ results, errors }, null, 2));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
