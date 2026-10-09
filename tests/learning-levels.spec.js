const {withoutPilot,withoutPilotSource}=require('./helpers/pilot-e5-baseline.cjs');
const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const levels = require('../src/learning-levels');
const hints = require('../src/challenge-hints');
const baseline = require('./fixtures/learning-levels-baseline.json');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];
const bank = ['E5', 'M6'].flatMap(learningLevel => ['A', 'B'].map(letter => ({ id: `${learningLevel}-${letter}`, learningLevel })));
const hash = s => crypto.createHash('sha256').update(s.replaceAll('\r\n', '\n')).digest('hex');
function load(id) {
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(`Levels/${id}/level.js`, 'utf8'), c);
  return withoutPilot(JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id])));
}

test('canonical preference validates all eleven steps and rejects corrupt persistence', () => {
  expect(levels.DEFAULT_M6_PERCENTAGE).toBe(10);
  for (let n = 0; n <= 100; n += 10) {
    let stored = null;
    const storage = { getItem: () => stored, setItem: (_key, value) => { stored = value; } };
    expect(levels.savePreference(n, storage)).toBe(n);
    expect(levels.readPreference(storage)).toBe(n);
  }
  for (const raw of [null, '', 'invalid', '"30"', '-10', '110', '17', '53', 'null', '{}', 'true']) {
    expect(levels.readPreference({ getItem: () => raw })).toBe(10);
  }
  expect(levels.readPreference({ getItem() { throw new Error('blocked'); } })).toBe(10);
});

test('balanced decks have exact counts, varied rotations and no fallback debt', () => {
  for (let n = 0; n <= 100; n += 10) {
    const planner = levels.createPlanner(n, () => .25);
    for (let deck = 0; deck < 3; deck++) {
      const draws = Array.from({ length: 20 }, () => planner.next());
      expect(draws.filter(v => v === 'M6')).toHaveLength(n / 5);
    }
    expect(planner.selections).toBe(60);
  }
  const a = levels.createPlanner(10, () => 0), b = levels.createPlanner(10, () => .2);
  const seq = Array.from({ length: 40 }, () => a.next());
  const positions = seq.flatMap((v, i) => v === 'M6' ? [i] : []);
  expect(positions.slice(1).map((v, i) => v - positions[i])).toEqual([10, 10, 10]);
  expect(seq.slice(0, 20)).not.toEqual(Array.from({ length: 20 }, () => b.next()));
  const fallbackPlanner = levels.createPlanner(10, () => 0);
  const fallback = Array.from({ length: 20 }, () => levels.selectVariant(bank.filter(v => v.learningLevel === 'E5'), fallbackPlanner, () => 0));
  expect(fallback.filter(v => v.requested === 'M6')).toHaveLength(2);
  expect(fallback.every(v => v.delivered === 'E5')).toBe(true);
  expect(fallbackPlanner.m6Percentage).toBe(10);
});

test('mixed, single-level and malformed slots obey the strict learning-level contract', () => {
  expect(levels.resolveLevel({})).toBe('E5');
  for (const invalid of ['E6', 'M5', 'group6', 'medium', 'm6', '', null, undefined]) expect(() => levels.resolveLevel({ learningLevel: invalid })).toThrow('Unknown learningLevel');
  for (const n of [0, 10, 50, 100]) {
    const planner = levels.createPlanner(n, () => 0);
    const selections = Array.from({ length: 20 }, (_, i) => levels.selectVariant(bank, planner, () => i % 2 ? .99 : 0));
    expect(selections.filter(s => s.delivered === 'M6')).toHaveLength(n / 5);
    expect(selections.every(s => !s.fallback && s.variant.learningLevel === s.requested)).toBe(true);
  }
  expect(levels.selectVariant(bank.filter(v => v.learningLevel === 'M6'), levels.createPlanner(0), () => 0)).toMatchObject({ requested: 'E5', delivered: 'M6', fallback: true });
  const planner = levels.createPlanner();
  expect(() => levels.selectVariant([], planner)).toThrow('requires eligible');
  expect(() => levels.selectVariant([null], planner)).toThrow('must be an object');
  expect(() => levels.selectVariant([[]], planner)).toThrow('must be an object');
  expect(() => levels.selectVariant([{ learningLevel: 'm6' }], planner)).toThrow('Unknown');
  expect(planner.selections).toBe(0);
});

test('content validator accepts mixed-size banks and rejects explicit unknown levels and empty slots', () => {
  const path = require('path');
  const filename = path.resolve('scripts/validate-levels.js');
  const sandbox = vm.createContext({ require: require('module').createRequire(filename), __dirname: path.dirname(filename), console });
  const source = fs.readFileSync(filename, 'utf8').replace(/main\(\);\s*$/, `
    globalThis.check = level => {
      errors.length = 0;
      validateReferences(level, new Map(level.interactiveObjects.map(o => [o.id, o])), new Set(authoredWalkPathPoints(level).map(normalizeWalkPathPoint).map(n => n.id)), 'fixture');
      return [...errors];
    };`);
  vm.runInContext(source, sandbox);
  const level = load('LVL-0032'), slot = level.learningChallenges[0].questions[0];
  slot.variants.push(...slot.variants.map(v => ({ ...v, id: v.id + '-m6', learningLevel: 'M6', schoolBand: 'M6-intended' })));
  expect(sandbox.check(level)).toEqual([]);
  for (const invalid of ['E6', 'M5', 'group6', 'medium', 'm6', null]) {
    slot.variants[0].learningLevel = invalid;
    expect(sandbox.check(level).some(s => s.includes('Unknown learningLevel'))).toBe(true);
  }
  slot.variants = [];
  expect(sandbox.check(level).some(s => s.includes('at least 1 authored learning variant'))).toBe(true);
});

test('all 816 production variants and hint pairs remain unchanged and reachable as E5', () => {
  let count = 0;
  for (const [file, digest] of Object.entries(baseline.sources)) expect(hash(withoutPilotSource(fs.readFileSync(file, 'utf8'))), file).toBe(digest);
  for (const [id, pairs] of Object.entries(baseline.hintPairs)) {
    const variants = load(id).learningChallenges.filter(ch => ch.active !== false).flatMap(ch => ch.questions.flatMap(s => s.variants));
    expect(variants.map(q => [q.id, hints.resolve(id, q, 'minnie'), hints.resolve(id, q, 'moose')])).toEqual(pairs);
    for (const q of variants) {
      count++; expect(levels.resolveLevel(q)).toBe('E5');
      for (const percentage of [0, 10, 50, 100]) expect(levels.selectVariant([q], levels.createPlanner(percentage), () => 0).variant).toBe(q);
    }
  }
  expect(count).toBe(816);
});

async function menu(page) {
  await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({ json: {} }));
  await page.goto(base + '/?atlasSessionTest=1');
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
}
async function settings(page) { await page.getByLabel('Instellingen', { exact: true }).click(); }

for (const raw of ['invalid', '-10', '110', '17', '53', '"30"']) test(`corrupt persisted ${raw} shows the canonical default after startup`, async ({ page }) => {
  await page.addInitScript(({ key, raw }) => localStorage.setItem(key, raw), { key: levels.STORAGE_KEY, raw });
  await menu(page); await settings(page);
  await expect(page.locator('[data-learning-mix]')).toHaveValue('10');
  await expect(page.locator('[data-learning-mix-label]')).toHaveText('90% E5 · 10% M6');
});

test('settings slider: default, native pointer/touch input, keyboard steps and immediate labels', async ({ page, isMobile }) => {
  await menu(page); await settings(page);
  const slider = page.getByLabel('Niveau', { exact: true });
  await expect(slider).toHaveValue('10');
  await expect(page.locator('[data-learning-mix-label]')).toHaveText('90% E5 · 10% M6');
  await expect(slider).toHaveAttribute('min', '0'); await expect(slider).toHaveAttribute('max', '100'); await expect(slider).toHaveAttribute('step', '10');
  const box = await slider.boundingBox(); expect(box.height).toBeGreaterThanOrEqual(44);
  if (isMobile) await page.touchscreen.tap(box.x + box.width * .8, box.y + box.height / 2);
  else await page.mouse.click(box.x + box.width * .8, box.y + box.height / 2);
  await expect(slider).not.toHaveValue('10');
  const value = Number(await slider.inputValue()); expect(value % 10).toBe(0);
  await expect(page.locator('[data-learning-mix-label]')).toHaveText(`${100 - value}% E5 · ${value}% M6`);
  if (!isMobile) {
    await slider.focus(); await slider.press('Home');
    for (let n = 0; n <= 100; n += 10) {
      await expect(slider).toHaveValue(String(n));
      await expect(page.locator('[data-learning-mix-label]')).toHaveText(`${100 - n}% E5 · ${n}% M6`);
      if (n < 100) await slider.press('ArrowRight');
    }
  }
  await page.screenshot({ path: test.info().outputPath('learning-settings.png') });
});

test('learning preference survives menu, reload and a reopened browser context', async ({ page, context, browser }) => {
  await menu(page); await settings(page);
  await page.locator('[data-learning-mix]').evaluate(el => { el.value = '30'; el.dispatchEvent(new Event('input', { bubbles: true })); });
  await page.evaluate(async () => { await window.eval('selectLevel')('LVL-0032', { startImmediately: true }); window.eval('returnToMenu')(); });
  await expect(page.locator('[data-learning-mix]')).toHaveValue('30');
  await menu(page); await settings(page);
  await expect(page.locator('[data-learning-mix]')).toHaveValue('30');
  const reopened = await browser.newContext({ storageState: await context.storageState(), serviceWorkers: 'block', reducedMotion: 'reduce' });
  try {
    const tab = await reopened.newPage(); await menu(tab); await settings(tab);
    await expect(tab.locator('[data-learning-mix-label]')).toHaveText('70% E5 · 30% M6');
    await tab.evaluate(() => localStorage.clear()); await menu(tab); await settings(tab);
    await expect(tab.locator('[data-learning-mix]')).toHaveValue('10');
  } finally { await reopened.close(); }
});

for (const percentage of [0, 10, 50, 100]) test(`empty central bank fallback at ${percentage}% M6 remains playable and keeps the preference`, async ({ page }) => {
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key: levels.STORAGE_KEY, value: percentage });
  await menu(page);
  const result = await page.evaluate(async () => {
    const call = n => window.eval(n);
    await call('selectLevel')('LVL-0032', { startImmediately: true });
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([])};
    call('openRuneChallenge')(call('activeRunes')()[0].id);
    const q = call('currentChallengeQuestions')()[0], frozen = JSON.stringify(q);
    for (let i = 0; i < 3; i++) call('answerQuestion')(q.answerMode === 'open' ? q.answer + 1 : q.choices.find(v => v !== q.answer));
    return { diagnostics: q.atlasLearningSelection, level: q.learningLevel, stable: JSON.stringify(q) === frozen, assistance: call('state').assistedCompletionAvailable, preference: call('m6Percentage'), selections: call('learningPlanner').selections };
  });
  expect(result).toMatchObject({ level: 'E5', stable: true, assistance: true, preference: percentage, selections: 1 });
  if (percentage === 100) expect(result.diagnostics).toEqual({ m6Percentage: 100, requested: 'M6', delivered: 'E5', fallback: true, requestedDifficulty: expect.any(Number), deliveredDifficulty: null, difficultyFallback: false });
});

for (const percentage of [0, 100]) test(`synthetic mixed runtime selects ${percentage ? 'M6' : 'E5'} once, keeps hints/choices and resets only at run boundaries`, async ({ page }) => {
  await page.addInitScript(({ key, value }) => localStorage.setItem(key, JSON.stringify(value)), { key: levels.STORAGE_KEY, value: percentage });
  await menu(page);
  const result = await page.evaluate(async () => {
    const call = n => window.eval(n);
    await call('selectLevel')('LVL-0032', { startImmediately: true });
    const l = call('level'), rune = call('activeRunes')()[0];
    const challenge = l.learningChallenges.find(ch => ch.id === rune.challengeId || ch.id === rune.id);
    challenge.questions[0].variants = ['E5', 'M6'].flatMap(learningLevel => ['A', 'B'].map(suffix => ({
      id: `${learningLevel}-${suffix}`, learningLevel, family: 'bare_multiplication', hintParameters: { a: 2, b: 3 },
      prompt: '2 × 3 = ?', answerMode: 'multipleChoice', answer: 6, choices: [4, 5, 6, 7], explanation: '2 × 3 = 6.'
    })));
    const fixture=JSON.parse(JSON.stringify(window.AtlasM6Content.records[0]));
    Object.assign(fixture,{id:'TEST-M6-MULTIPLICATION',family:'bare_multiplication',difficulty:1});
    fixture.educationalCore={values:{a:2,b:3},question:{answer:6,choices:[4,5,6,7],answerSpec:{type:'choice'}}};
    fixture.answerMode='multipleChoice';fixture.surfaces=[{id:'test',prompt:'2 × 3 = ?',answerDisplay:'6',hintMinnie:'Denk aan 2 groepjes van 3.',hintMoose:'Verdubbel 3.',explanation:'2 × 3 = 6.',authoredSupport:{explanationSteps:['2 × 3 = 6.']},visual:{type:'calculationSteps',stages:Object.fromEntries(['question','minnie','moose','explanation'].map(s=>[s,{groups:[]}]))}}];
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([fixture])};
    call('openRuneChallenge')(rune.id);
    const q = call('currentChallengeQuestions')()[0], frozen = JSON.stringify(q), planner = call('learningPlanner');
    const messages = [];
    for (let i = 0; i < 2; i++) {
      call('answerQuestion')(q.learningLevel==='M6'?'4':4);
      const integrated = document.querySelector('[data-help-speaker]');
      messages.push(integrated ? {speaker: integrated.dataset.helpSpeaker, text: integrated.querySelector('.integratedHintText').textContent} : {...call('state').guideMessage});
    }
    const stable = call('currentChallengeQuestions')()[0] === q && JSON.stringify(q) === frozen;
    const preview = call('renderChallengeVariantPreview')(q, 0);
    await call('selectLevel')('LVL-0033', { startImmediately: true });
    const continued = call('learningPlanner') === planner;
    call('returnToMenu')(); const reset = call('learningPlanner') === null;
    return { q, stable, messages, count: planner.selections, continued, reset, preview };
  });
  expect(result.q.learningLevel).toBe(percentage ? 'M6' : 'E5');
  expect(result.q.atlasLearningSelection.fallback).toBe(false);
  expect(result).toMatchObject({ stable: true, count: 1, continued: true, reset: true });
  expect(result.messages).toEqual([{ speaker: 'minnie', text: 'Denk aan 2 groepjes van 3.' }, { speaker: 'moose', text: 'Verdubbel 3.' }]);
  expect(result.preview).toContain(`${result.q.learningLevel} · bare_multiplication`);
});
