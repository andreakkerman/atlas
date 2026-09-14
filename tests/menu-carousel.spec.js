const { test, expect } = require('@playwright/test');
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';

test.use({ reducedMotion: 'no-preference' });

async function openMenu(page) {
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await page.waitForFunction(() => window.eval('menuAdventureStats.loaded'));
}

async function rememberMenu(page) {
  return page.evaluate(() => {
    const menu = document.querySelector('.menuScreen');
    menu.scrollTop = 600;
    const selectors = ['.menuScreen', '.menuHeader', '.menuControls', '.menuSettings',
      '.levelGrid', '.featuredAdventureShell', '.menuNavButtonPrevious',
      '.menuNavButtonNext', '.menuCarouselDots', '.supportingAdventureGrid',
      '[data-menu-tile]', '[data-menu-tile] img', '[data-menu-index]'];
    window.menuNodes = selectors.flatMap(selector => [...document.querySelectorAll(selector)]);
    window.menuStart = { scroll: menu.scrollTop, height: menu.scrollHeight, url: location.href };
    return window.menuStart;
  });
}

async function expectMenuUnchanged(page, original) {
  const current = await page.evaluate(() => {
    const menu = document.querySelector('.menuScreen');
    return {
      scroll: menu.scrollTop, height: menu.scrollHeight, url: location.href,
      mounted: window.menuNodes.every(node => node.isConnected)
    };
  });
  expect(current).toEqual({ ...original, mounted: true });
}

test('manual next, previous and dots keep the scrolled menu mounted', async ({ page }) => {
  await openMenu(page);
  const original = await rememberMenu(page);
  expect(original.scroll).toBeGreaterThan(0);
  for (const [selector, index] of [
    ['[data-action="menu-next"]', 1],
    ['[data-action="menu-previous"]', 0],
    ['[data-menu-index="2"]', 2]
  ]) {
    // Offscreen activation exercises the real delegated handler without Playwright scrolling it into view.
    await page.locator(selector).evaluate(button => {
      button.focus({ preventScroll: true });
      window.carouselFocus = button;
      button.click();
    });
    await expectMenuUnchanged(page, original);
    expect(await page.evaluate(() => document.activeElement === window.carouselFocus)).toBe(true);
    await expect(page.locator('[data-menu-index="' + index + '"]')).toHaveAttribute('aria-current', 'true');
    await expect(page.locator('[data-menu-tile][aria-pressed="true"]')).toHaveCount(1);
    expect(await page.locator('.heroLevelTile').getAttribute('data-featured-level'))
      .toBe(await page.locator('[data-menu-tile][aria-pressed="true"]').getAttribute('data-menu-tile'));
  }
});

test('multiple automatic transitions preserve scroll and keep the ten-second cadence', async ({ page }) => {
  await page.clock.install({ time: new Date('2026-09-14T00:00:00Z') });
  await openMenu(page);
  await page.mouse.move(0, 0);
  const original = await rememberMenu(page);
  await page.clock.pauseAt(new Date('2026-09-14T00:00:10Z'));
  await page.evaluate(() => window.eval('syncMenuAutoRotation')());
  for (let index = 1; index <= 3; index++) {
    await page.clock.fastForward(9999);
    await expect(page.locator('[data-menu-index="' + (index - 1) + '"]')).toHaveAttribute('aria-current', 'true');
    await page.clock.fastForward(1);
    await expect(page.locator('[data-menu-index="' + index + '"]')).toHaveAttribute('aria-current', 'true');
    await expectMenuUnchanged(page, original);
  }
});

test('late adventure counts update badges without rebuilding the menu', async ({ page }) => {
  await openMenu(page);
  const original = await rememberMenu(page);
  await page.evaluate(() => window.eval('refreshMenuAdventureStats')());
  await expectMenuUnchanged(page, original);
  await expect(page.locator('.heroLevelTile .levelBadge')).toHaveText(/plaatsen.*opdrachten/);
});

test('delayed carousel artwork cannot change menu geometry or scroll', async ({ page }) => {
  await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  const artwork = await page.evaluate(() => new URL(
    window.eval('visibleLevelCatalog')()[1].menu.illustration, location.href
  ).href);
  let release;
  const held = new Promise(resolve => { release = resolve; });
  await page.route(artwork, async route => { await held; await route.continue(); });
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await page.waitForFunction(() => window.eval('menuAdventureStats.loaded'));
  const original = await rememberMenu(page);
  try {
    await page.locator('[data-action="menu-next"]').evaluate(button => button.click());
    await expectMenuUnchanged(page, original);
    release();
    await page.locator('.heroLevelTile img').evaluate(image => image.decode());
    await expectMenuUnchanged(page, original);
  } finally { release(); }
});

test('visible carousel controls retain focus and use the existing reveal transition', async ({ page }) => {
  await openMenu(page);
  for (const selector of ['[data-action="menu-next"]', '[data-action="menu-previous"]', '[data-menu-index="2"]']) {
    const button = page.locator(selector);
    if (test.info().project.name.startsWith('ipad-')) await button.tap();
    else await button.click();
    await expect(page.locator('.heroLevelTile')).toHaveClass(/heroLevelTileTransition/);
    expect(await page.locator('.heroLevelTile').evaluate(hero => getComputedStyle(hero).animationDuration)).toBe('0.62s');
    expect(await page.locator('.menuScreen').evaluate(menu => menu.scrollTop)).toBe(0);
  }
  // Keyboard activation must retain the actual navigation node/focus.
  const next = page.locator('[data-action="menu-next"]');
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(next).toBeFocused();
});
