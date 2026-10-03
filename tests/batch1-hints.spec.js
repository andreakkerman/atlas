const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const hints = require('../src/challenge-hints');
const baseline = require('./fixtures/batch1-hints-baseline.json');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];
const ids = Array.from({ length: 17 }, (_, i) => `LVL-${String(i + 4).padStart(4, '0')}`);
const hash = s => crypto.createHash('sha256').update(s).digest('hex');
function load(id) {
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(`Levels/${id}/level.js`, 'utf8'), c);
  return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));
}
function variants(l) { return l.learningChallenges.filter(ch => ch.active !== false).flatMap(ch => ch.questions.flatMap(s => s.variants)); }

test('all 392 active variants use structured strategies and preserve every non-hint field', () => {
  const counts = {};
  for (const id of ids) {
    const l = load(id);
    const stripped = JSON.stringify(l, (k, v) => ['hintMinnie', 'hintMoose', 'hintParameters'].includes(k) ? undefined : v);
    expect(hash(stripped), id).toBe(baseline.levelHashes[id]);
    for (const q of variants(l)) {
      counts[q.family] = (counts[q.family] || 0) + 1;
      expect(q.hintMinnie).toBeUndefined(); expect(q.hintMoose).toBeUndefined();
      const first = hints.resolve(id, q, 'minnie'), second = hints.resolve(id, q, 'moose');
      expect(first).toBeTruthy(); expect(second).toBeTruthy(); expect(first).not.toBe(second);
      expect(first + second).not.toMatch(/undefined|NaN|null|\{|\}|=|antwoord is|dus is|Omdat/);
      const reviewed = baseline.inventory.find(r => r.level === id && r.variant === q.id);
      expect(q.hintParameters).toEqual(reviewed.parameters);
      if (reviewed.story) expect(q.prompt).toBe(reviewed.story);
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
        expect(reviewed.subtype).toBe('sharing');
        expect(q.prompt).toContain(String(a));
        expect(q.prompt).toContain(String(b));
        expect(first).toBe('Wat wordt verdeeld? En over hoeveel gelijke groepjes?');
        expect(second).toBe(`Je verdeelt ${a} over ${b} gelijke groepjes. Reken ${a} : ${b}.`);
      } else if (q.family === 'money') {
        expect(q.hintParameters.currency).toBe(reviewed.parameters.currency);
        expect(q.prompt).toContain(`${b} ${q.hintParameters.currency}`);
        expect(first).toBe('Hoeveel keer betaal je hetzelfde bedrag?');
        expect(second).toBe(`Je betaalt ${a} keer ${b} ${q.hintParameters.currency}. Reken ${a} × ${b}.`);
      } else if (q.family === 'route') {
        expect(q.prompt).toContain(`${b}`);
        expect(first).toBe('In hoeveel gelijke stukken wordt de totale lengte verdeeld?');
        expect(second).toBe(`Verdeel ${a} door ${b}. Reken ${a} : ${b}.`);
      } else throw new Error('Unreviewed family ' + q.family);
    }
  }
  expect(counts).toEqual({ bare_multiplication: 174, story_multiplication: 72, bare_division: 54, story_division: 35, money: 9, route: 8, clock_reading_quarter: 8, clock_reading_half_hour: 8, clock_reading_five_minutes: 24 });
});


test('inactive banks, previous migrations, other worlds and routing remain unchanged', () => {
  expect(baseline.inventory.filter(r=>r.active)).toHaveLength(392);
  expect(baseline.inventory.filter(r=>r.active && !r.levelEnabled)).toHaveLength(88);
  expect(baseline.inventory.filter(r=>!r.active)).toHaveLength(16);
  for(const id of ids) expect(hash(JSON.stringify(load(id).learningChallenges.filter(ch=>ch.active===false)))).toBe(baseline.inactiveHashes[id]);
  for(const [file,digest] of Object.entries(baseline.unchangedSources)) expect(hash(fs.readFileSync(file,'utf8').replaceAll('\r\n','\n')),file).toBe(digest);
  for(const [id,pairs] of Object.entries(baseline.previousHints)) expect(variants(load(id)).map(q=>[q.id,hints.resolve(id,q,'minnie'),hints.resolve(id,q,'moose')])).toEqual(pairs);
});

test('quarter and half-hour aliases preserve Dutch clock semantics', () => {
  const expected = {0:'De grote wijzer staat op de 12: het is precies een heel uur. Kijk nu naar de kleine wijzer.',15:'De grote wijzer staat op de 3: dat is kwart over. Kijk nu naar de kleine wijzer.',30:'De grote wijzer staat op de 6: dat is half. Kijk naar welk uur de kleine wijzer onderweg is.',45:'De grote wijzer staat op de 9: dat is kwart voor. Kijk welk uur eraan komt.'};
  for(const id of ids) for(const q of variants(load(id)).filter(q=>q.visual)) {
    expect(q.visual).toEqual(baseline.inventory.find(r=>r.level===id&&r.variant===q.id).visual);
    if(expected[q.visual.minute]) expect(hints.resolve(id,q,'moose')).toBe(expected[q.visual.minute]);
    else expect(hints.resolve(id,q,'moose')).toBe(hints.resolve('LVL-0003',{...q,family:'clock_reading_five_minutes'},'moose'));
  }
  expect(hints.resolve('LVL-0014',{family:'clock_reading_half_hour',visual:{type:'clock',hour:6,minute:30}},'moose')).toBe(expected[30]);
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
            const wrong = q.answerMode === 'open' ? q.answer + 1 : q.choices.find(c => c !== q.answer);
            const stages = [];
            for (let attempt = 1; attempt <= 3; attempt++) {
              call('answerQuestion')(wrong);
              stages.push({ message: { ...s.guideMessage }, feedback: s.feedback, assisted: !!s.assistedCompletionAvailable,
                stable: call('currentChallengeQuestions')()[s.questionIndex] === q && JSON.stringify(q) === frozen,
                visible: document.querySelector('.npcRetryHint p')?.textContent ?? document.querySelector('.teamMessage')?.textContent,
                clock: q.visual ? [document.querySelector('[data-clock-visual]')?.dataset.clockHour, document.querySelector('[data-clock-visual]')?.dataset.clockMinute] : null });
            }
            output.push({ q, stages, openControl });
            call('completeQuestionWithHelp')(); call('nextQuestion')();
          }
        }
      }
    } finally { Math.random = random; }
    return output;
  });
  expect(results).toHaveLength(variants(load(id)).length);
  expect(results.map(({ q }) => q.id).sort()).toEqual(variants(load(id)).map(q => q.id).sort());
  for (const { q, stages, openControl } of results) {
    expect(stages.every(s => s.stable)).toBe(true);
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
