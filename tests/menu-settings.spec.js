const { test, expect } = require('@playwright/test');
async function activate(locator, page) {
  if (test.info().project.name.startsWith('ipad-')) await locator.tap();
  else await locator.click();
}
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';

for (const kind of ['fps', 'debug']) {
  for (const source of ['menu', 'graphics']) {
    test(`${kind} stays shared from ${source}`, async ({ page }) => {
      await page.goto(base + '/?dev=editor&level=LVL-0001');
      if (source === 'menu') {
        await activate(page.locator('[data-action="menu"]'), page);
        await activate(page.locator('.menuSettings summary'), page);
        await page.evaluate(() => window.eval('render')());
        const settings = page.locator('.menuSettings');
        await expect(settings.locator('[data-action="reset-local-atlas"]')).toBeVisible();
        await expect(page.locator('[data-action="reset-local-atlas"]')).toHaveCount(1);
        await expect(page.locator('.levelGrid [data-local-atlas-reset]')).toHaveCount(0);
        const bounds = await settings.locator('.menuSettingsPanel').boundingBox();
        expect(bounds.x).toBeGreaterThanOrEqual(0);
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(page.viewportSize().width);
        await activate(settings.locator('[data-display-toggle="' + kind + '"]'), page);
        // Use the existing transition; loading/navigation has separate UI coverage.
        await page.evaluate(() => window.eval('startLevelFromMenu')('LVL-0001'));
        await activate(page.getByRole('button', { name: 'Start avontuur', exact: true }), page);
        await activate(page.locator('[data-graphics-action="toggle"]'), page);
      } else {
        await activate(page.locator('[data-graphics-action="toggle"]'), page);
        await activate(page.locator('[data-display-toggle="' + kind + '"]'), page);
        await activate(page.locator('[data-graphics-action="close"]'), page);
        await activate(page.locator('[data-action="menu"]'), page);
        await activate(page.locator('.menuSettings summary'), page);
      }
      await expect(page.locator('[data-display-toggle="' + kind + '"]')).toHaveAttribute('aria-pressed', 'true');
      await expect(page.locator('[data-display-toggle="' + (kind === 'fps' ? 'debug' : 'fps') + '"]')).toHaveAttribute('aria-pressed', 'false');
    });
  }
}

test('level loading title fits its panel', async ({ page }, info) => {
  await page.goto(base + '/');
  await activate(page.getByRole('button', { name: 'Start avontuur', exact: true }), page);
  let release;
  const held = new Promise(resolve => { release = resolve; });
  await page.route('**/Levels/**', async route => { await held; await route.continue(); });
  await activate(page.locator('.heroLevelTile'), page);
  try {
    const title = page.locator('.atlasLoadingCard h1');
    await expect(title).toHaveText('Avontuur voorbereiden...');
    const size = await title.evaluate(el => ({
      font: parseFloat(getComputedStyle(el).fontSize),
      width: el.clientWidth, scroll: el.scrollWidth
    }));
    expect(size.font).toBeLessThanOrEqual(28);
    expect(size.scroll).toBeLessThanOrEqual(size.width);
    await page.screenshot({ animations: 'disabled', path: info.outputPath('loading-panel.png') });
  } finally { release(); }
  await activate(page.getByRole('button', { name: 'Start avontuur', exact: true }), page);
  await expect(page.locator('[data-graphics-action="toggle"]')).toBeVisible();
});
