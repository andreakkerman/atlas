const { test, expect } = require('@playwright/test');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').replace(/\/$/, '');
test.setTimeout(90000);
async function press(locator, info) { if (info.project.name.startsWith('ipad')) await locator.tap(); else await locator.click(); }
async function enter(page, id) {
  expect(await page.evaluate(id => window.eval('startLevelFromMenu')(id), id)).toBe(true);
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
}
async function markers(page) { return page.evaluate(() => window.eval('challengeFx').snapshot().markers); }
async function open(page, info) {
  // Stand at the authored approach point, then use the actual hit target/input.
  await page.evaluate(() => {
    const p = window.eval('getApproachPoint')(window.eval('runeById')('car')), s = window.eval('state');
    s.worldX = p.x; s.worldY = p.y; s.cameraX = window.eval('getDesiredCameraX')(); window.eval('render')();
  });
  await press(page.locator('[data-rune="car"]'), info);
  await expect(page.getByRole('dialog', { name: 'Auto', exact: true })).toBeVisible();
  await expect(page.locator('.runeFocusSpark')).toHaveCount(1);
  await expect(page.locator('.runeFocusSpark')).not.toBeVisible();
  // The Canvas effect remains intact; only the legacy circle is suppressed.
  expect(await markers(page)).toContain('car');
}

test('open indicator hides, closes restore it, completion and retry/transition keep correct visibility', async ({ page }, info) => {
  await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({ json: {} }));
  await page.goto(base);
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  await enter(page, 'LVL-0032');
  await page.evaluate(() => {
    const paint = window.AtlasChallengeFxVisuals.paint;
    window.AtlasChallengeFxVisuals.paint = function(ctx, settings, scene, ...rest) {
      window.indicatorPaint = scene.markers.map(m => m.id);
      return paint(ctx, settings, scene, ...rest);
    };
  });
  expect(await page.evaluate(() => window.eval('challengeFx').snapshot().mode)).toBe('canvas');
  const initial = await markers(page);
  expect(initial).toContain('car');
  for (let cycle = 0; cycle < 3; cycle++) {
    await open(page, info);
    expect(await markers(page)).toEqual(initial);
    // Standard questions have no close button; exercise the existing handler.
    await page.evaluate(() => window.eval('closeChallenge')());
    await expect(page.locator('.runeFocusSpark')).toHaveCount(0);
    expect(await markers(page)).toEqual(initial);
    await expect.poll(() => page.evaluate(() => window.indicatorPaint)).toEqual(initial);
  }
  await open(page, info);
  for (let i = 0; i < 4; i++) {
    const answer = await page.evaluate(() => window.eval('answerFor')(window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]));
    if (await page.locator('[data-open-answer]').count()) {
      await page.locator('[data-open-answer]').fill(String(answer));
      await press(page.getByRole('button', { name: 'Controleer', exact: true }), info);
    } else await press(page.locator(`[data-choice="${answer}"]`), info);
    await expect(page.locator('.runeFocusSpark')).not.toBeVisible();
    await press(page.locator('[data-action="next-question"]'), info);
  }
  expect(await page.evaluate(() => window.eval('state.completedRunes').has('car'))).toBe(true);
  expect(await markers(page)).not.toContain('car');
  await page.evaluate(() => window.eval('restart')());
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  expect(await markers(page)).toEqual(initial);
  await open(page, info);
  await page.evaluate(() => window.eval('selectLevel')('LVL-0033', { startImmediately: true, recordStart: false }));
  expect(await page.evaluate(() => window.eval('state.activeRuneId'))).toBeNull();
  await page.evaluate(() => window.eval('returnToMenu')());
  await enter(page, 'LVL-0032');
  expect(await markers(page)).toEqual(initial);
});
