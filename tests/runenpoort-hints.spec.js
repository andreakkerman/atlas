const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const hints = require('../src/challenge-hints');
const baseline = require('./fixtures/runenpoort-hints-baseline.json');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];
const ids = ['LVL-0001', 'LVL-0002', 'LVL-0003'];
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
function load(id) {
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(`Levels/${id}/level.js`, 'utf8'), c);
  return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));
}
function variants(l) { return l.learningChallenges.filter(ch => ch.active !== false).flatMap(ch => ch.questions.flatMap(s => s.variants)); }

test('all 88 active variants use structured strategies and preserve every non-hint field', () => {
  const counts = {};
  for (const id of ids) {
    const l = load(id);
    const stripped = JSON.stringify(l, (k, v) => ['hintMinnie', 'hintMoose', 'hintParameters'].includes(k) ? undefined : v);
    expect(hash(stripped), id).toBe(baseline.levels[id]);
    for (const q of variants(l)) {
      counts[q.family] = (counts[q.family] || 0) + 1;
      expect(q.hintMinnie).toBeUndefined(); expect(q.hintMoose).toBeUndefined();
      const first = hints.resolve(id, q, 'minnie'), second = hints.resolve(id, q, 'moose');
      expect(first).toBeTruthy(); expect(second).toBeTruthy(); expect(first).not.toBe(second);
      expect(first + second).not.toMatch(/undefined|NaN|null|\{|\}|=|antwoord is|dus is|Omdat/);
      if (q.visual) {
        expect(first).toBe('Kijk eerst naar de grote wijzer.');
        expect((first + second).toLowerCase()).not.toContain(q.answer.toLowerCase());
        continue;
      }
      const { a, b } = q.hintParameters;
      const division = ['bare_division', 'story_division', 'route'].includes(q.family);
      expect(division ? a / b : a * b).toBe(q.answer);
      expect(q.explanation.startsWith(`${a} ${division ? ':' : '×'} ${b} =`)).toBe(true);
      if (q.family === 'bare_multiplication') {
        expect(first).toBe(`Denk aan ${a} groepjes van ${b}.`);
        expect(second).toBe(hints.multiplication(a, b));
      } else if (q.family === 'bare_division') {
        expect(first).toBe(`Welke keersom met ${b} helpt je bij ${a} : ${b}?`);
        expect(second).toBe(`Zoek in de tafel van ${b} welk getal precies op ${a} uitkomt.`);
      } else if (q.family === 'story_multiplication') {
        expect(first).toBe('Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?');
        expect(second).toBe(`Je hebt ${a} groepjes van ${b}. Reken ${a} × ${b}.`);
      } else if (q.family === 'story_division') {
        expect(q.prompt).toContain(`verdeelt ${a}`);
        expect(q.prompt).toContain(`eerlijk over ${b}`);
        expect(first).toBe('Wat wordt verdeeld? En over hoeveel gelijke groepjes?');
        expect(second).toBe(`Je verdeelt ${a} over ${b} gelijke groepjes. Reken ${a} : ${b}.`);
      } else if (q.family === 'money') {
        expect(q.hintParameters.currency).toBe('munten');
        expect(q.prompt).toContain(`${b} munten per stuk`);
        expect(first).toBe('Hoeveel keer betaal je hetzelfde bedrag?');
        expect(second).toBe(`Je betaalt ${a} keer ${b} munten. Reken ${a} × ${b}.`);
      } else if (q.family === 'route') {
        expect(q.prompt).toContain(`${b} gelijke stukken`);
        expect(first).toBe('In hoeveel gelijke stukken wordt de totale lengte verdeeld?');
        expect(second).toBe(`Verdeel ${a} door ${b}. Reken ${a} : ${b}.`);
      } else throw new Error('Unreviewed family ' + q.family);
    }
  }
  expect(counts).toEqual({ bare_multiplication: 40, story_multiplication: 16, bare_division: 12, story_division: 8, money: 2, route: 2, clock_reading_five_minutes: 8 });
});

test('five-minute Dutch clock guidance follows the visual without naming the final hour', () => {
  const expected = {
    5: 'Elke stap van de grote wijzer is 5 minuten. Op de 1 is dat vijf over.',
    10: 'De grote wijzer staat op de 2: dat is tien minuten over. Kijk nu naar de kleine wijzer.',
    20: 'De grote wijzer staat op de 4: dat is tien voor half. Kijk naar welk uur de kleine wijzer onderweg is.',
    25: 'De grote wijzer staat op de 5: dat is vijf voor half. Kijk naar welk uur de kleine wijzer onderweg is.',
    35: 'De grote wijzer staat op de 7: dat is vijf over half. Kijk naar welk uur de kleine wijzer onderweg is.',
    40: 'De grote wijzer staat op de 8: dat is tien over half. Kijk naar welk uur de kleine wijzer onderweg is.',
    50: 'De grote wijzer staat op de 10: dat is tien voor. Kijk welk uur eraan komt.',
    55: 'De grote wijzer staat op de 11: dat is vijf voor. Kijk welk uur eraan komt.'
  };
  const clocks = variants(load('LVL-0003')).filter(q => q.visual);
  for (const q of clocks) expect(hints.resolve('LVL-0003', q, 'moose')).toBe(expected[q.visual.minute]);
  expect(clocks.find(q => q.visual.minute === 25)).toMatchObject({ visual: { hour: 6 }, answer: 'Vijf voor half zeven' });
  expect(clocks.find(q => q.visual.minute === 35)).toMatchObject({ visual: { hour: 10 }, answer: 'Vijf over half elf' });
  expect(hints.resolve('LVL-0003', { family: 'clock_reading_five_minutes', visual: { type: 'clock', hour: 6, minute: 30 } }, 'moose'))
    .toBe('De grote wijzer staat op de 6: dat is half. Kijk naar welk uur de kleine wijzer onderweg is.');
});

test('ARC output, unmigrated worlds, shared runtime and routing are unchanged', () => {
  for (const [file, digest] of Object.entries(baseline.unchangedSources)) expect(hash(fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n')), file).toBe(digest);
  for (const [id, pairs] of Object.entries(baseline.arcHints)) {
    expect(variants(load(id)).map(q => [q.id, hints.resolve(id, q, 'minnie'), hints.resolve(id, q, 'moose')])).toEqual(pairs);
  }
  // All production levels now opt in; authored inactive stages still take precedence.
  expect(hints.usesReusableHints('LVL-0036')).toBe(false);
  expect(hints.resolve('LVL-0021', { hintMoose: 'Authored inactive hint.' }, 'moose')).toBe('Authored inactive hint.');
});

async function enter(page, id) {
  await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({ json: {} }));
  await page.goto(base + '/?atlasSessionTest=1');
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  await page.evaluate(id => window.eval('selectLevel')(id, { startImmediately: true }), id);
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
            const wrong = q.answerMode === 'open' ? q.answer + 1 : q.choices.find(c => c !== q.answer);
            const stages = [];
            for (let attempt = 1; attempt <= 3; attempt++) {
              call('answerQuestion')(wrong);
              stages.push({ message: { ...s.guideMessage }, feedback: s.feedback, assisted: !!s.assistedCompletionAvailable,
                stable: call('currentChallengeQuestions')()[s.questionIndex] === q && JSON.stringify(q) === frozen,
                visible: document.querySelector('.npcRetryHint p')?.textContent ?? document.querySelector('.teamMessage')?.textContent,
                clock: q.visual ? [document.querySelector('[data-clock-visual]')?.dataset.clockHour, document.querySelector('[data-clock-visual]')?.dataset.clockMinute] : null });
            }
            output.push({ q, stages });
            call('completeQuestionWithHelp')(); call('nextQuestion')();
          }
        }
      }
    } finally { Math.random = random; }
    return output;
  });
  expect(results).toHaveLength(id === 'LVL-0001' ? 24 : 32);
  expect(results.map(({ q }) => q.id).sort()).toEqual(variants(load(id)).map(q => q.id).sort());
  for (const { q, stages } of results) {
    expect(stages.every(s => s.stable)).toBe(true);
    expect(stages[0]).toMatchObject({ message: { speaker: 'minnie', text: hints.resolve(id, q, 'minnie') }, feedback: '', assisted: false });
    expect(stages[1]).toMatchObject({ message: { speaker: 'moose', text: hints.resolve(id, q, 'moose') }, feedback: '', assisted: false });
    expect(stages[0].visible).toBe(stages[0].message.text); expect(stages[1].visible).toBe(stages[1].message.text);
    expect(stages[2]).toMatchObject({ feedback: q.explanation, assisted: true });
    if (q.visual) for (const s of stages) expect(s.clock).toEqual([String(q.visual.hour), String(q.visual.minute)]);
  }
  expect(errors).toEqual([]);
});
