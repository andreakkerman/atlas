const { test, expect } = require('@playwright/test');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0].replace(/\/$/, '');

async function boot(page, reload = false) {
  await page.route('**/__dev/levels/*/editor-draft', route => route.fulfill({ json: {} }));
  if (reload) await page.reload();
  else await page.goto(base + '/?atlasSessionTest=1');
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
}
async function enter(page, id) {
  expect(await page.evaluate(id => window.eval('startLevelFromMenu')(id), id)).toBe(true);
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
}
async function fresh(page) {
  expect(await page.evaluate(() => {
    const s = window.eval('state');
    return { done: [...s.completedRunes], answered: s.answered, attempts: s.attempts,
      firstTryCorrect: s.firstTryCorrect, questions: s.activeQuestions, active: s.activeRuneId,
      failures: s.challengeFailureCounts, assisted: s.assistedCompletionAvailable,
      wrong: s.selectedWrong, feedback: s.feedback, exit: !!s.exitTransitionPending,
      transition: !!s.sceneTransitionPending, ready: s.criticalAssetsReady };
  })).toEqual({ done: [], answered: 0, attempts: 0, firstTryCorrect: 0, questions: [], active: null,
    failures: {}, assisted: false, wrong: false, feedback: '', exit: false, transition: false, ready: true });
  expect(await page.evaluate(() => window.eval('isLevelExitReady')())).toBe(false);
}
async function solve(page, id) {
  // Real arrival handler and authored answers; no debug completion or direct reward call.
  await page.evaluate(id => window.eval('finishInteraction')(window.eval('runeById')(id), 'rune', 'activate'), id);
  for (let i = 0; i < 4; i++) {
    const q = await page.evaluate(() => window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
    if (q.answerMode === 'open') {
      await page.locator('[data-open-answer]').fill(String(q.answer));
      await page.getByRole('button', { name: 'Controleer', exact: true }).click();
    } else await page.locator(`[data-choice="${q.answer}"]`).click();
    await page.locator('[data-action="next-question"]').click();
  }
}
async function ids(page) {
  return page.evaluate(() => window.eval('activeRunes')().slice().sort((a, b) =>
    Number(window.eval('requiresAllOtherChallenges')(window.eval('learningChallengeForRune')(a))) -
    Number(window.eval('requiresAllOtherChallenges')(window.eval('learningChallengeForRune')(b)))).map(r => r.id));
}

test('earned terminal reward can replay twice with fresh usable run state and durable completion', async ({ page }, info) => {
  test.setTimeout(150000);
  await boot(page); await enter(page, 'LVL-0035'); await fresh(page);
  for (let replay = 0; replay < 2; replay++) {
    for (const id of await ids(page)) await solve(page, id);
    expect(await page.evaluate(() => window.eval('state.answered'))).toBe(12);
    await page.evaluate(() => window.eval('finishInteraction')(window.eval('hotspotById')(window.eval('level.exitHotspotId')), 'hotspot', 'activate'));
    await expect(page.locator('[data-action="restart"]')).toBeVisible();
    expect(await page.evaluate(() => window.eval('state.exitTransitionPending'))).toBe(true);
    const saved = await page.evaluate(() => localStorage.getItem(window.eval('level.storageKey')));
    const restart = page.getByRole('button', { name: 'Speel nog een keer', exact: true });
    if (info.project.name.startsWith('ipad')) await restart.tap(); else await restart.click();
    await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
    await fresh(page);
    expect(await page.evaluate(() => localStorage.getItem(window.eval('level.storageKey')))).toBe(saved);
    expect(await page.evaluate(() => window.eval('storedLevelIsComplete')(window.eval('level')))).toBe(true);
    const rune = page.locator(`[data-rune="${(await ids(page))[0]}"]`);
    await expect(rune).toBeEnabled();
    if (info.project.name.startsWith('ipad')) await rune.tap(); else await rune.click();
    await expect(page.locator('[data-open-answer], [data-choice]').first()).toBeVisible({ timeout: 20000 });
    // The next loop answers this opened challenge through the same production handler.
  }
});

test('partial reload and menu re-entry reset the run without erasing learning history', async ({ page }) => {
  test.setTimeout(90000);
  await boot(page); await enter(page, 'LVL-0032'); await fresh(page);
  await solve(page, (await ids(page))[0]);
  expect(await page.evaluate(() => window.eval('state.completedRunes.size'))).toBe(1);
  const learning = await page.evaluate(() => localStorage.getItem(window.eval('level.progressKey')));
  await boot(page, true); await enter(page, 'LVL-0032'); await fresh(page);
  expect(await page.evaluate(() => localStorage.getItem(window.eval('level.progressKey')))).toBe(learning);
  for (const id of (await ids(page)).slice(0, 2)) await solve(page, id);
  expect(await page.evaluate(() => window.eval('state.completedRunes.size'))).toBe(2);
  await page.locator('[data-action="menu"]').click();
  await enter(page, 'LVL-0032'); await fresh(page);
});

test('legacy partial saves are ignored without deleting durable completion fields', async ({ page }) => {
  await boot(page); await enter(page, 'LVL-0032');
  const saved = await page.evaluate(() => {
    const l = window.eval('level'), record = { levelId: l.id, completedAt: '2026-01-01T00:00:00.000Z',
      activeChallengeSignature: window.eval('activeChallengeSignature')(l), runCompleted: false,
      completedRuneIds: [window.eval('activeRunes')()[0].id], answered: 4, attempts: 7, firstTryCorrect: 2 };
    localStorage.setItem(l.storageKey, JSON.stringify(record)); return JSON.stringify(record);
  });
  await boot(page, true); await enter(page, 'LVL-0032'); await fresh(page);
  expect(await page.evaluate(() => localStorage.getItem(window.eval('level.storageKey')))).toBe(saved);
  expect(await page.evaluate(() => window.eval('storedLevelIsComplete')(window.eval('level')))).toBe(true);
});
