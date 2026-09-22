const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');
const { loadAllLevels } = require('../scripts/level-utils');

const gameUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(__dirname, '..', 'index.html')).href;
const levels = loadAllLevels().filter(({ entry }) => !entry.developerOnly);
const variants = levels.flatMap(({ level }) => level.learningChallenges.flatMap(c => c.questions.flatMap(s => s.variants)));

test.beforeEach(async ({ page }) => {
  await page.route('**/__dev/levels/*/editor-draft', route => route.fulfill({ json: {} }));
  await page.goto(`${gameUrl}${gameUrl.includes('?') ? '&' : '?'}atlasSessionTest=1`);
});
test.afterEach(async ({ page }) => { await page.goto('about:blank'); });

test('all authored variants use an isolated, stable runtime copy; open answers are unchanged', async ({ page }) => {
  const result = await page.evaluate(bank => {
    const state = window.eval('state');
    const current = window.eval('currentChallengeQuestions');
    const originalRandom = Math.random;
    const failures = [];
    try {
      Math.random = () => 0;
      for (const variant of bank) {
        const before = JSON.stringify(variant);
        state.questionIndex = 0;
        state.activeQuestions = [{ id: 'test-slot', variants: [variant] }];
        const q = current()[0];
        if (JSON.stringify(variant) !== before || q.answer !== variant.answer || q.id !== variant.id) failures.push(variant.id);
        if (variant.answerMode === 'multipleChoice') {
          const expected = [...variant.choices.slice(1), variant.choices[0]];
          if (q.choices === variant.choices || JSON.stringify(q.choices) !== JSON.stringify(expected)) failures.push(variant.id);
          if (JSON.stringify([...q.choices].sort()) !== JSON.stringify([...variant.choices].sort())) failures.push(variant.id);
          if (current()[0] !== q || current()[0].choices !== q.choices) failures.push(variant.id);
        } else {
          const { atlasSlotId, ...unchanged } = q;
          if (JSON.stringify(unchanged) !== before) failures.push(variant.id);
        }
      }
    } finally { Math.random = originalRandom; state.activeQuestions = []; }
    return failures;
  }, variants);
  expect(result).toEqual([]);
});

test('controlled Fisher–Yates draws cover every permutation equally', async ({ page }) => {
  const counts = await page.evaluate(() => {
    const shuffle = window.eval('shuffledCopy');
    const originalRandom = Math.random;
    const permutations = {};
    const positions = [0, 0, 0, 0];
    try {
      // Exhaust all equally likely swap-index combinations: 4 × 3 × 2.
      for (let a = 0; a < 4; a++) for (let b = 0; b < 3; b++) for (let c = 0; c < 2; c++) {
        const draws = [(a + 0.5) / 4, (b + 0.5) / 3, (c + 0.5) / 2];
        Math.random = () => draws.shift();
        const choices = shuffle(['A', 'B', 'C', 'D']);
        permutations[choices.join('')] = (permutations[choices.join('')] || 0) + 1;
        positions[choices.indexOf('B')]++;
      }
    } finally { Math.random = originalRandom; }
    return { permutations, positions };
  });
  expect(Object.keys(counts.permutations)).toHaveLength(24);
  expect(Object.values(counts.permutations)).toEqual(Array(24).fill(1));
  expect(counts.positions).toEqual([6, 6, 6, 6]);
});

for (const [name, levelId, family] of [
  ['numeric', 'LVL-0001', 'bare_multiplication'],
  ['clock', 'LVL-0035', 'clock_reading'],
  ['spelling', 'LVL-0027', 'spelling'],
  ['ARC', 'LVL-0035', 'bare_multiplication']
]) test(`${name}: retry, hints, feedback, rotation, correctness and replay preserve question identity`, async ({ page }) => {
  const initial = await page.evaluate(async ({ levelId, family }) => {
    await window.eval('selectLevel')(levelId, { startImmediately: true });
    const level = window.eval('level'), state = window.eval('state');
    const challenge = level.learningChallenges.find(c => c.active !== false && c.questions.some(s => s.variants.some(v => v.answerMode === 'multipleChoice' && v.family === family)));
    const slotIndex = challenge.questions.findIndex(s => s.variants.some(v => v.answerMode === 'multipleChoice' && v.family === family));
    const slot = challenge.questions[slotIndex];
    const vi = slot.variants.findIndex(v => v.answerMode === 'multipleChoice' && v.family === family);
    const rune = level.runes.find(r => r.challengeId === challenge.id);
    state.activeRuneId = rune.id;
    state.activeQuestions = window.eval('selectChallengeQuestions')(rune);
    state.questionIndex = slotIndex;
    state.screen = 'challenge';
    state.challengePrerequisiteLocked = false;
    const originalRandom = Math.random;
    let calls = 0;
    try {
      Math.random = () => calls++ === 0 ? (vi + 0.5) / slot.variants.length : 0;
      window.eval('currentChallengeQuestions')();
    } finally { Math.random = originalRandom; }
    const q = state.activeQuestions[slotIndex];
    window.shuffleProbe = { q, choices: q.choices, authored: JSON.stringify(challenge.questions), challenge, rune, slotIndex, vi };
    window.eval('trackCurrentSessionQuestion')();
    window.eval('render')();
    return { choices: q.choices.map(String), answer: String(q.answer), id: q.id, slotIndex };
  }, { levelId, family });
  const buttons = page.locator('.choices [data-choice]');
  await expect(buttons).toHaveText(initial.choices);
  // Existing textual correctness intentionally ignores case and accents.
  const wrong = initial.choices.find(x => x.localeCompare(initial.answer, 'nl', { sensitivity: 'base' }) !== 0);
  for (let attempt = 1; attempt <= 3; attempt++) {
    await page.locator(`.choices [data-choice="${wrong}"]`).click();
    await expect(buttons).toHaveText(initial.choices);
    expect(await page.evaluate(() => window.eval('state.selectedWrong'))).toBe(true);
    if (attempt <= 2) expect(await page.evaluate(() => window.eval('state.guideMessage.speaker'))).toBe(attempt === 1 ? 'minnie' : 'moose');
  }
  await expect(page.locator('.challengeFeedback')).toBeVisible();
  for (const viewport of [{ width: 1180, height: 820 }, { width: 768, height: 1024 }, { width: 1280, height: 800 }]) {
    await page.setViewportSize(viewport);
    await page.evaluate(() => window.eval('render')());
    await expect(buttons).toHaveText(initial.choices);
  }
  expect(await page.evaluate(() => {
    const p = window.shuffleProbe;
    const q = window.eval('currentChallengeQuestions')()[p.slotIndex];
    return q === p.q && q.choices === p.choices && JSON.stringify(p.challenge.questions) === p.authored;
  })).toBe(true);
  const correct = page.locator(`.choices [data-choice="${initial.answer}"]`);
  await correct.focus();
  await correct.press('Enter');
  expect(await page.evaluate(() => window.eval('state.screen'))).toBe('correct');
  const logged = await page.evaluate(() => window.AtlasSessionReport.getCurrent().questions.find(q => q.variantId === window.shuffleProbe.q.id));
  expect(logged).toMatchObject({ variantId: initial.id, attempts: 4, minnieHint: true, mooseHint: true, outcome: 'afterMoose' });
  const replay = await page.evaluate(() => {
    const p = window.shuffleProbe, state = window.eval('state');
    const random = Math.random;
    try {
      Math.random = () => 0;
      window.eval('nextQuestion')();
    } finally { Math.random = random; }
    const advanced = state.questionIndex !== p.slotIndex || state.screen === 'scene';
    const nextAuthored = p.challenge.questions[p.slotIndex + 1]?.variants[0];
    const next = state.activeQuestions[state.questionIndex];
    const nextOrderCorrect = nextAuthored?.answerMode !== 'multipleChoice' || (
      next.id === nextAuthored.id && next.choices !== nextAuthored.choices &&
      JSON.stringify(next.choices) === JSON.stringify([...nextAuthored.choices.slice(1), nextAuthored.choices[0]])
    );
    state.activeQuestions = window.eval('selectChallengeQuestions')(p.rune);
    state.questionIndex = p.slotIndex;
    let calls = 0;
    try {
      Math.random = () => calls++ === 0 ? (p.vi + 0.5) / 2 : 0.999;
      const q = window.eval('currentChallengeQuestions')()[p.slotIndex];
      return { advanced, nextOrderCorrect, id: q.id, fresh: q !== p.q && q.choices !== p.choices, choices: q.choices.map(String), authored: p.challenge.questions[p.slotIndex].variants[p.vi].choices.map(String) };
    } finally { Math.random = random; }
  });
  expect(replay.advanced).toBe(true);
  expect(replay.nextOrderCorrect).toBe(true);
  expect(replay.id).toBe(initial.id);
  expect(replay.fresh).toBe(true);
  expect(replay.choices).toEqual(replay.authored);
  expect(replay.choices).not.toEqual(initial.choices);
});
