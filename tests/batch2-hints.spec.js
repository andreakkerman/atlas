const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const hints = require('../src/challenge-hints');
const baseline = require('./fixtures/batch2-hints-baseline.json');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];
const ids = Array.from({ length: 11 }, (_, i) => `LVL-${String(i + 21).padStart(4, '0')}`);
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
function load(id) {
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(`Levels/${id}/level.js`, 'utf8'), c);
  return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));
}
function variants(l) { return l.learningChallenges.filter(ch => ch.active !== false).flatMap(ch => ch.questions.flatMap(s => s.variants)); }

test('all 240 active variants preserve non-hint data and resolve reviewed semantics', () => {
  const counts = {};
  for (const id of ids) {
    const l = load(id);
    expect(hash(JSON.stringify(l, (k, v) => ['hintMinnie', 'hintMoose', 'hintParameters'].includes(k) ? undefined : v))).toBe(baseline.levelHashes[id]);
    expect(hash(JSON.stringify(l.learningChallenges.filter(ch => ch.active === false)))).toBe(baseline.inactiveHashes[id]);
    for (const q of variants(l)) {
      const r = baseline.inventory.find(r => r.level === id && r.id === q.id);
      counts[r.subtype] = (counts[r.subtype] || 0) + 1;
      expect(q.hintParameters).toEqual(r.parameters);
      expect(q.hintMinnie).toBeUndefined(); expect(q.hintMoose).toBeUndefined();
      const first = hints.resolve(id, q, 'minnie'), second = hints.resolve(id, q, 'moose');
      expect(first).toBeTruthy(); expect(second).toBeTruthy(); expect(first).not.toBe(second);
      expect(first + second).not.toMatch(/undefined|NaN|null|\{|\}|=|antwoord is|dus is|eerst 0/);
      if (typeof q.answer === 'string') expect((first + second).toLowerCase()).not.toContain(q.answer.toLowerCase());
      if (q.visual) {
        expect(q.visual).toEqual(r.visual);
        expect(first).toBe('Kijk eerst naar de grote wijzer.');
        expect(second).toBe(hints.resolve('LVL-0032', q, 'moose'));
      } else if (q.family === 'spelling') {
        expect(q.choices).toEqual(r.choices); expect(q.answer).toBe(r.answer);
        expect(first).toBe('Lees de woorden rustig. Welke spelling herken je?');
        expect(second).toBe('Vergelijk de woorden letter voor letter. Kijk waar ze van elkaar verschillen.');
      } else {
        const { a, b, strategy = q.family } = q.hintParameters;
        const division = strategy.includes('division');
        const result = strategy === 'subtraction' ? a - b : strategy.includes('addition') ? a + b : division ? a / b : a * b;
        expect(result, q.id).toBe(q.answer);
        expect(q.prompt).toBe(r.prompt);
        const cues = {
          addition: 'Kijk welke twee aantallen je bij elkaar moet optellen.',
          subtraction: 'Kijk hoeveel er van het begingetal afgaat.',
          duration_addition: 'Tel de twee tijdsduren bij elkaar op.'
        };
        if (cues[strategy]) expect(first).toBe(cues[strategy]);
        if (q.hintParameters.unit) expect(q.prompt).toContain(q.hintParameters.unit);
        if (q.presentation === 'story') { expect(q.prompt).toContain(String(a)); expect(q.prompt).toContain(String(b)); }
        if (q.family === 'story_division') {
          expect(r.subtype).toBe('sharing');
          expect(second).toBe(`Je verdeelt ${a} over ${b} gelijke groepjes. Reken ${a} : ${b}.`);
        }
      }
    }
  }
  expect(counts).toEqual({ bare_multiplication: 73, bare_division: 28, story_multiplication: 43, sharing: 22, addition: 2, subtraction: 3, duration_addition: 1, clock_reading: 48, recognition: 20 });
  expect(baseline.inventory.filter(r => !r.active)).toHaveLength(128);
});

test('prior worlds, generated hint pairs, routing and shared gameplay remain identical', () => {
  for (const [file, digest] of Object.entries(baseline.unchangedSources)) expect(hash(fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n')), file).toBe(digest);
  for (const [id, pairs] of Object.entries(baseline.previousHints)) expect(variants(load(id)).map(q => [q.id, hints.resolve(id, q, 'minnie'), hints.resolve(id, q, 'moose')])).toEqual(pairs);
  for (let n = 1; n <= 35; n++) for (const q of variants(load(`LVL-${String(n).padStart(4, '0')}`))) {
    expect(q.hintMinnie).toBeUndefined(); expect(q.hintMoose).toBeUndefined();
  }
});

test('addition, regrouping, duration and subtraction use concrete steps without zero steps', () => {
  const hint = (strategy, a, b, unit) => hints.resolve('LVL-0021', { family: 'measurement', hintParameters: { strategy, a, b, unit } }, 'moose');
  expect(hint('addition', 28, 17)).toBe('Begin met 28. Tel eerst 10 erbij en daarna 7.');
  expect(hint('addition', 46, 29)).toBe('Begin met 46. Tel eerst 20 erbij en daarna 9.');
  expect(hint('addition', 28, 7)).toBe('Begin met 28. Tel 7 erbij.');
  expect(hint('addition', 28, 20)).toBe('Begin met 28. Tel 20 erbij.');
  expect(hint('subtraction', 90, 27)).toBe('Begin met 90. Trek eerst 20 af en daarna 7.');
  expect(hint('subtraction', 64, 19)).toBe('Begin met 64. Trek eerst 10 af en daarna 9.');
  expect(hint('subtraction', 64, 9)).toBe('Begin met 64. Trek 9 af.');
  expect(hint('subtraction', 64, 20)).toBe('Begin met 64. Trek 20 af.');
  expect(hint('duration_addition', 18, 25, 'minuten')).toBe('Begin met 18 minuten. Tel eerst 20 minuten erbij en daarna 5 minuten.');
  expect(hint('duration_addition', 1, 21, 'minuten')).toBe('Begin met 1 minuut. Tel eerst 20 minuten erbij en daarna 1 minuut.');
  expect(() => hint('duration_addition', 18, 25)).toThrow();
});

test('actual Leonardo larger facts use commutative 11/12 decompositions and simpler 10 strategy', () => {
  for (const [id, variant, expected] of [
    ['LVL-0024', 'wing-frame-2a', 'Reken eerst 3 × 10 en tel er nog 3 bij.'],
    ['LVL-0021', 'optics-table-1a', 'Reken eerst 6 × 10 en 6 × 2 en tel die uitkomsten op.'],
    ['LVL-0024', 'wing-frame-1b', 'Bij × 10 komt er een nul achter 11.']
  ]) {
    const q = variants(load(id)).find(q => q.id === variant), { a, b } = q.hintParameters;
    expect(hints.resolve(id, q, 'moose')).toBe(expected);
    expect(hints.multiplication(b, a)).toBe(expected);
  }
  for (const n of [3, 6, 7, 8, 9]) { expect(n * 10 + n).toBe(n * 11); expect(n * 10 + n * 2).toBe(n * 12); }
});

async function enter(page, id) {
  await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({ json: {} }));
  await page.goto(base + '/?atlasSessionTest=1');
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  await page.evaluate(id => window.eval('selectLevel')(id, { startImmediately: true, allowDisabledForEditor: true }), id);
}

for (const id of ids) test(`${id}: all variants follow Minnie → Moose → assistance without changing question or choices`, async ({ page }) => {
  await enter(page, id);
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  const results = await page.evaluate(() => {
    const call = name => window.eval(name), s = call('state'), l = call('level');
    const output = [], random = Math.random;
    try {
      for (const pick of [0, 1]) {
        Math.random = () => pick ? 0.999 : 0;
        s.completedRunes.clear();
        for (const rune of call('activeRunes')()) {
          call('openRuneChallenge')(rune.id);
          for (let slot = 0; slot < 4; slot++) {
            const q = call('currentChallengeQuestions')()[s.questionIndex];
            const frozen = JSON.stringify(q);
            const openControl = !!document.querySelector("[data-open-answer-form]");
            // Spelling distractors, including accent-only differences, must exercise failure.
            const accentDistractor = q.family === 'spelling' && q.choices.find(c => c !== q.answer && String(c).localeCompare(q.answer, 'nl', { sensitivity: 'base' }) === 0);
            const wrong = accentDistractor || (q.answerMode === 'open' ? q.answer + 1 : q.choices.find(c => typeof q.answer === 'string'
              ? (q.family === 'spelling' ? c !== q.answer : String(c).localeCompare(q.answer, 'nl', { sensitivity: 'base' }) !== 0) : c !== q.answer));
            if (wrong === undefined) throw new Error(`No incorrect option for ${q.id}`);
            const stages = [];
            for (let attempt = 1; attempt <= 3; attempt++) {
              call('answerQuestion')(wrong);
              stages.push({ message: { ...s.guideMessage }, feedback: s.feedback, assisted: !!s.assistedCompletionAvailable,
                stable: call('currentChallengeQuestions')()[s.questionIndex] === q && JSON.stringify(q) === frozen,
                visible: document.querySelector('.npcRetryHint p')?.textContent ?? document.querySelector('.teamMessage')?.textContent,
                clock: q.visual ? [document.querySelector('[data-clock-visual]')?.dataset.clockHour, document.querySelector('[data-clock-visual]')?.dataset.clockMinute] : null });
            }
            let correctAccepted = null;
            if (q.family === 'spelling') {
              call('answerQuestion')(q.answer);
              correctAccepted = s.screen === 'correct' && s.feedback === `Ja! Het antwoord is ${q.answer}.`;
            } else call('completeQuestionWithHelp')();
            output.push({ q, stages, openControl, correctAccepted });
            call('nextQuestion')();
          }
        }
      }
    } finally { Math.random = random; }
    return output;
  });
  expect(results).toHaveLength(variants(load(id)).length);
  expect(results.map(({ q }) => q.id).sort()).toEqual(variants(load(id)).map(q => q.id).sort());
  for (const { q, stages, openControl, correctAccepted } of results) {
    expect(stages.every(s => s.stable)).toBe(true);
    if (q.family === 'spelling') expect(correctAccepted).toBe(true);
    expect(openControl).toBe(q.answerMode === "open");
    const original = variants(load(id)).find(v => v.id === q.id);
    expect(q.answer).toEqual(original.answer);
    expect([...(q.choices || [])].sort()).toEqual([...(original.choices || [])].sort());
    expect(stages[0]).toMatchObject({ message: { speaker: 'minnie', text: hints.resolve(id, q, 'minnie') }, feedback: '', assisted: false });
    expect(stages[1]).toMatchObject({ message: { speaker: 'moose', text: hints.resolve(id, q, 'moose') }, feedback: '', assisted: false });
    expect(stages[0].visible).toBe(stages[0].message.text); expect(stages[1].visible).toBe(stages[1].message.text);
    expect(stages[2]).toMatchObject({ feedback: q.explanation, assisted: true });
    if (q.visual) for (const s of stages) expect(s.clock).toEqual([String(q.visual.hour), String(q.visual.minute)]);
  }
  expect(errors).toEqual([]);
});
