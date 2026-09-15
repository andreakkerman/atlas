# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: menu-carousel.spec.js >> manual next, previous and dots keep the scrolled menu mounted
- Location: tests\menu-carousel.spec.js:37:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  - 2
+ Received  + 2

  Object {
    "height": 1673,
-   "mounted": true,
-   "scroll": 600,
+   "mounted": false,
+   "scroll": 0,
    "url": "http://127.0.0.1:4173/",
  }
```

# Page snapshot

```yaml
- main [ref=e3]:
  - generic [ref=e4]:
    - button "Voortgang" [ref=e5] [cursor=pointer]
    - group [ref=e6]:
      - generic "Instellingen" [ref=e7] [cursor=pointer]:
        - img [ref=e8]
  - generic [ref=e11]:
    - heading "Kies een avontuur" [level=1] [ref=e12]
    - paragraph [ref=e13]: Wat ga je vandaag ontdekken?
  - region "Beschikbare avonturen" [ref=e14]:
    - generic [ref=e15]:
      - button "Vorig avontuur" [ref=e16] [cursor=pointer]: ‹
      - button "De Nautilus starten" [ref=e17] [cursor=pointer]:
        - generic [ref=e19]:
          - generic [ref=e20]: 4 plaatsen · 12 opdrachten
          - strong [ref=e21]: De Nautilus
          - generic [ref=e22]: Duik in een geheim avontuur met de Nautilus.
          - generic [ref=e23]: ">Tik om te starten"
      - button "Volgend avontuur" [ref=e24] [cursor=pointer]: ›
    - generic "Avontuur kiezen" [ref=e25]:
      - button "Toon avontuur 1" [ref=e26] [cursor=pointer]
      - button "Toon avontuur 2" [ref=e27] [cursor=pointer]
      - button "Toon avontuur 3" [ref=e28] [cursor=pointer]
      - button "Toon avontuur 4" [ref=e29] [cursor=pointer]
      - button "Toon avontuur 5" [ref=e30] [cursor=pointer]
      - button "Toon avontuur 6" [ref=e31] [cursor=pointer]
      - button "Toon avontuur 7" [ref=e32] [cursor=pointer]
    - generic [ref=e33]:
      - button "3 plaatsen · 11 opdrachten De Runenpoort Verken een vergeten Vikingtempel en ontdek het geheim van de oude runen." [ref=e34] [cursor=pointer]:
        - generic [ref=e36]:
          - generic [ref=e37]: 3 plaatsen · 11 opdrachten
          - strong [ref=e38]: De Runenpoort
          - generic [ref=e39]: Verken een vergeten Vikingtempel en ontdek het geheim van de oude runen.
      - button "4 plaatsen · 12 opdrachten De Nautilus Duik in een geheim avontuur met de Nautilus." [pressed] [ref=e40] [cursor=pointer]:
        - generic [ref=e42]:
          - generic [ref=e43]: 4 plaatsen · 12 opdrachten
          - strong [ref=e44]: De Nautilus
          - generic [ref=e45]: Duik in een geheim avontuur met de Nautilus.
      - button "4 plaatsen · 12 opdrachten De Blokkenpoort Ontdek vijf blokkenkamers en vind de weg terug naar huis." [ref=e46] [cursor=pointer]:
        - generic [ref=e48]:
          - generic [ref=e49]: 4 plaatsen · 12 opdrachten
          - strong [ref=e50]: De Blokkenpoort
          - generic [ref=e51]: Ontdek vijf blokkenkamers en vind de weg terug naar huis.
      - button "5 plaatsen · 14 opdrachten De Reis door Europa Reis door zeven Europese landen" [ref=e52] [cursor=pointer]:
        - generic [ref=e54]:
          - generic [ref=e55]: 5 plaatsen · 14 opdrachten
          - strong [ref=e56]: De Reis door Europa
          - generic [ref=e57]: Reis door zeven Europese landen
      - button "4 plaatsen · 12 opdrachten Leonardo’s onvoltooide atlas Reis door Italië en ontdek hoe Leonardo keek, mat, onderzocht en ontwierp." [ref=e58] [cursor=pointer]:
        - generic [ref=e60]:
          - generic [ref=e61]: 4 plaatsen · 12 opdrachten
          - strong [ref=e62]: Leonardo’s onvoltooide atlas
          - generic [ref=e63]: Reis door Italië en ontdek hoe Leonardo keek, mat, onderzocht en ontwierp.
      - button "5 plaatsen · 12 opdrachten Cairo Museum Een stille zaal met een sarcofaag die Sven naar oud Egypte trekt." [ref=e64] [cursor=pointer]:
        - generic [ref=e66]:
          - generic [ref=e67]: 5 plaatsen · 12 opdrachten
          - strong [ref=e68]: Cairo Museum
          - generic [ref=e69]: Een stille zaal met een sarcofaag die Sven naar oud Egypte trekt.
      - button "1 plaats · 0 opdrachten Cinematic FX Lab Developer benchmark voor Atlas Cinematic/WebGPU-effecten." [ref=e70] [cursor=pointer]:
        - generic [ref=e72]:
          - generic [ref=e73]: 1 plaats · 0 opdrachten
          - strong [ref=e74]: Cinematic FX Lab
          - generic [ref=e75]: Developer benchmark voor Atlas Cinematic/WebGPU-effecten.
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';
  3  | 
  4  | test.use({ reducedMotion: 'no-preference' });
  5  | 
  6  | async function openMenu(page) {
  7  |   await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
  8  |   await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  9  |   await page.waitForFunction(() => window.eval('menuAdventureStats.loaded'));
  10 | }
  11 | 
  12 | async function rememberMenu(page) {
  13 |   return page.evaluate(() => {
  14 |     const menu = document.querySelector('.menuScreen');
  15 |     menu.scrollTop = 600;
  16 |     const selectors = ['.menuScreen', '.menuHeader', '.menuControls', '.menuSettings',
  17 |       '.levelGrid', '.featuredAdventureShell', '.menuNavButtonPrevious',
  18 |       '.menuNavButtonNext', '.menuCarouselDots', '.supportingAdventureGrid',
  19 |       '[data-menu-tile]', '[data-menu-tile] img', '[data-menu-index]'];
  20 |     window.menuNodes = selectors.flatMap(selector => [...document.querySelectorAll(selector)]);
  21 |     window.menuStart = { scroll: menu.scrollTop, height: menu.scrollHeight, url: location.href };
  22 |     return window.menuStart;
  23 |   });
  24 | }
  25 | 
  26 | async function expectMenuUnchanged(page, original) {
  27 |   const current = await page.evaluate(() => {
  28 |     const menu = document.querySelector('.menuScreen');
  29 |     return {
  30 |       scroll: menu.scrollTop, height: menu.scrollHeight, url: location.href,
  31 |       mounted: window.menuNodes.every(node => node.isConnected)
  32 |     };
  33 |   });
> 34 |   expect(current).toEqual({ ...original, mounted: true });
     |                   ^ Error: expect(received).toEqual(expected) // deep equality
  35 | }
  36 | 
  37 | test('manual next, previous and dots keep the scrolled menu mounted', async ({ page }) => {
  38 |   await openMenu(page);
  39 |   const original = await rememberMenu(page);
  40 |   expect(original.scroll).toBeGreaterThan(300);
  41 |   for (const [selector, index] of [
  42 |     ['[data-action="menu-next"]', 1],
  43 |     ['[data-action="menu-previous"]', 0],
  44 |     ['[data-menu-index="2"]', 2]
  45 |   ]) {
  46 |     // Offscreen activation exercises the real delegated handler without Playwright scrolling it into view.
  47 |     await page.locator(selector).evaluate(button => {
  48 |       button.focus({ preventScroll: true });
  49 |       window.carouselFocus = button;
  50 |       button.click();
  51 |     });
  52 |     await expectMenuUnchanged(page, original);
  53 |     expect(await page.evaluate(() => document.activeElement === window.carouselFocus)).toBe(true);
  54 |     await expect(page.locator('[data-menu-index="' + index + '"]')).toHaveAttribute('aria-current', 'true');
  55 |     await expect(page.locator('[data-menu-tile][aria-pressed="true"]')).toHaveCount(1);
  56 |     expect(await page.locator('.heroLevelTile').getAttribute('data-featured-level'))
  57 |       .toBe(await page.locator('[data-menu-tile][aria-pressed="true"]').getAttribute('data-menu-tile'));
  58 |   }
  59 | });
  60 | 
  61 | test('multiple automatic transitions preserve scroll and keep the ten-second cadence', async ({ page }) => {
  62 |   await openMenu(page);
  63 |   await page.mouse.move(0, 0);
  64 |   const original = await rememberMenu(page);
  65 |   await page.clock.install();
  66 |   await page.evaluate(() => window.eval('syncMenuAutoRotation')());
  67 |   for (let index = 1; index <= 3; index++) {
  68 |     await page.clock.fastForward(9999);
  69 |     await expect(page.locator('[data-menu-index="' + (index - 1) + '"]')).toHaveAttribute('aria-current', 'true');
  70 |     await page.clock.fastForward(1);
  71 |     await expect(page.locator('[data-menu-index="' + index + '"]')).toHaveAttribute('aria-current', 'true');
  72 |     await expectMenuUnchanged(page, original);
  73 |   }
  74 | });
  75 | 
  76 | test('late adventure counts update badges without rebuilding the menu', async ({ page }) => {
  77 |   await openMenu(page);
  78 |   const original = await rememberMenu(page);
  79 |   await page.evaluate(() => window.eval('refreshMenuAdventureStats')());
  80 |   await expectMenuUnchanged(page, original);
  81 |   await expect(page.locator('.heroLevelTile .levelBadge')).toHaveText(/plaatsen.*opdrachten/);
  82 | });
  83 | 
```