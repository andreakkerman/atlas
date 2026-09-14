const { test, expect } = require('@playwright/test');
const base = new URL('/', process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').href;
const realGpu = process.env.ATLAS_WEBGPU_QA === '1';

for (const renderer of ['cinematic', 'illustrated']) {
  test(renderer + ' route overlay paints above presentation and follows editor visibility', async ({ page }, info) => {
    let draft = {};
    await page.route('**/__dev/levels/*/editor-draft', route => {
      if (route.request().method() !== 'GET') draft = route.request().postDataJSON() || {};
      return route.fulfill({ json: draft });
    });
    await page.goto(base + '?dev=editor&level=LVL-0001');
    if (renderer === 'cinematic') {
      await page.locator('[data-graphics-action="toggle"]').click();
      await page.locator('[data-renderer-choice="cinematic"]').click();
      await page.locator('[data-graphics-action="close"]').click();
      if (realGpu) {
        await expect.poll(() => page.evaluate(() => window.eval('cinematicRenderer').snapshot().ready), { timeout: 30000 }).toBe(true);
      } else {
        // Layout-only WebKit coverage: an opaque presentation canvas at its real CSS layer.
        await page.addStyleTag({ content: '.cinematicViewportCanvas { opacity:1; visibility:visible; background:#182d29; }' });
      }
    }
    await page.keyboard.press('Control+Shift+D');
    await expect(page.locator('[data-developer-tools]')).toBeVisible();
    const layering = await page.evaluate(() => {
      const svg = document.querySelector('[data-debug-overlay]');
      const stage = svg.closest('[data-world-stage]');
      let layer = svg;
      while (layer.parentElement !== stage) layer = layer.parentElement;
      return {
        layer: Number(getComputedStyle(layer).zIndex) || 0,
        canvas: Number(getComputedStyle(document.querySelector('[data-cinematic-canvas]') || document.querySelector('.worldArt')).zIndex),
        nodes: svg.querySelectorAll('[data-walkpath-index]').length,
        expectedNodes: window.eval('authoredWalkPathPoints')(window.eval('level')).length,
        edges: svg.querySelectorAll('.debugPathEdge').length,
        markersPaintedAndInteractive: [...svg.querySelectorAll('[data-walkpath-index] circle')].every(circle => {
          const style = getComputedStyle(circle);
          return style.visibility === 'visible' && style.opacity === '1' && style.stroke !== 'none' && style.pointerEvents === 'auto';
        })
      };
    });
    expect(layering.layer).toBeGreaterThan(layering.canvas);
    expect(layering.nodes).toBe(layering.expectedNodes);
    expect(layering.edges).toBeGreaterThan(0);
    expect(layering.markersPaintedAndInteractive).toBe(true);
    await page.locator('[data-debug-action="collapse-editor-panel"]').click();
    expect(await page.evaluate(() => Boolean(document.elementFromPoint(30, 200)?.closest('.editorWorldTrack')))).toBe(false);
    const node = page.locator('[data-walkpath-index] circle').first();
    const initial = await node.evaluate(circle => ({ x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) }));
    const box = await node.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 20, box.y + box.height / 2 + 8, { steps: 3 });
    await page.mouse.up();
    const moved = await node.evaluate(circle => ({ x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) }));
    expect(moved).not.toEqual(initial);
    await page.screenshot({ path: info.outputPath(renderer + '-route.png') });
    const activeBox = await node.boundingBox();
    await page.mouse.move(activeBox.x + activeBox.width / 2, activeBox.y + activeBox.height / 2);
    await page.mouse.down();
    const beforeClose = await page.evaluate(() => window.eval('level.walkPath'));
    const frozenMarker = await node.evaluate(circle => ({ x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) }));
    await page.keyboard.press('Control+Shift+D');
    await page.mouse.move(30, 200);
    await page.mouse.up();
    expect(await page.evaluate(() => window.eval('level.walkPath'))).toEqual(beforeClose);
    await expect(page.locator('[data-debug-overlay]')).toHaveCount(0);
    await expect(page.locator('[data-walkpath-index]')).toHaveCount(0);
    await page.keyboard.press('Control+Shift+D');
    await expect(node).toBeVisible();
    expect(await node.evaluate(circle => ({ x: Number(circle.getAttribute('cx')), y: Number(circle.getAttribute('cy')) }))).toEqual(frozenMarker);
    // Camera updates use the same geometry as the world, without a separate route model.
    await page.evaluate(() => {
      window.eval('state.worldX = 1600');
      window.eval('state.cameraX = undefined');
      window.eval('updateWorldDom')();
    });
    const geometry = await page.evaluate(() => {
      const svg = document.querySelector('[data-debug-overlay]').getBoundingClientRect();
      const world = document.querySelector('.worldTrack').getBoundingClientRect();
      return { x: svg.x - world.x, y: svg.y - world.y, width: svg.width - world.width, height: svg.height - world.height };
    });
    for (const value of Object.values(geometry)) expect(Math.abs(value)).toBeLessThan(0.1);
  });
}
