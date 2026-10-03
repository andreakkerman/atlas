const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const hints = require('../src/challenge-hints');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];
const ids = ['LVL-0032', 'LVL-0033', 'LVL-0034', 'LVL-0035'];
const unlock = [
  'We zijn klaar bij de dam. Op naar Buried City.',
  'Daar is de metrotrap. We kunnen verder.',
  'De weg naar het hotel is vrij. We kunnen verder.',
  'Alles klaar. Tijd om Stella Montis achter ons te laten.'
];
const destinations = ['verder', 'naar de metro', 'naar het hotel', 'verder'];
function load(id) {
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(`Levels/${id}/level.js`, 'utf8'), c);
  return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));
}
function variants(l) { return l.learningChallenges.flatMap(ch => ch.questions.flatMap(s => s.variants)); }

test('ARC entry and attention copy exactly matches the approved editorial text', () => {
  const expected = [
    [
      ['LEVEL_ENTER', undefined, 'minnie', 'Dam Battlegrounds… ooit gaf deze dam stroom. Nu wemelt het hier van de ARC.'],
      ['HOTSPOT_ATTENTION_FIRST', 'car', 'minnie', 'Er groeien plantjes naast die auto. Misschien ook op de achterbank?'],
      ['HOTSPOT_ATTENTION_FIRST', 'lootCrate', 'moose', 'Die kist is nog dicht. Misschien zit er iets bruikbaars in.'],
      ['HOTSPOT_ATTENTION_FIRST', 'raiderCache', 'minnie', 'Dat rode lampje brandt nog. Zou hier nog stroom zijn?']
    ],
    [
      ['LEVEL_ENTER', undefined, 'minnie', 'Buried City… ooit was dit Marano. Kijken wat het zand heeft bewaard?'],
      ['HOTSPOT_ATTENTION_FIRST', 'churchClock', 'minnie', 'Die klok is vanaf bijna de hele straat te zien.'],
      ['HOTSPOT_ATTENTION_FIRST', 'chimney', 'moose', 'Die schoorsteen staat nog overeind. Niet slecht na al dat zand.'],
      ['HOTSPOT_ATTENTION_FIRST', 'arcProbe', 'minnie', 'Dat blauwe licht hoort niet bij de stad. Daar staat een ARC Probe.']
    ],
    [
      ['LEVEL_ENTER', undefined, 'minnie', 'Riven Tides, een prachtige vakantiebestemming... voor ARC.'],
      ['HOTSPOT_ATTENTION_FIRST', 'seaContainer', 'moose', 'Die container heeft vast een lange zeereis gemaakt.'],
      ['HOTSPOT_ATTENTION_FIRST', 'raiderCache', 'minnie', 'Daar tussen de strandstoelen ligt een Raider Cache.'],
      ['HOTSPOT_ATTENTION_FIRST', 'blueSuitcase', 'minnie', 'Die blauwe koffer valt wel erg op.']
    ],
    [
      ['LEVEL_ENTER', undefined, 'minnie', 'Stella Montis... één van de gevaarlijkste ARC-maps.'],
      ['HOTSPOT_ATTENTION_FIRST', 'terminal', 'minnie', 'Dat scherm geeft nog licht. Zelfs in deze kou.'],
      ['HOTSPOT_ATTENTION_FIRST', 'roundContainer', 'moose', 'Die container hangt behoorlijk hoog.'],
      ['HOTSPOT_ATTENTION_FIRST', 'crate', 'minnie', 'Onder dat zeil blijft de voorraad vast droog.']
    ]
  ];
  ids.forEach((id, i) => expected[i].forEach(([event, challengeId, speaker, text]) => {
    expect(load(id).companionMoments.find(m => m.event === event && m.challengeId === challengeId)).toMatchObject({ speaker, text });
  }));
});

test('all 96 ARC variants retain the pre-migration question bank and resolve both hint stages', () => {
  // Every question field except hints. Stella's hash incorporates only the
  // reviewed crate-4b family correction from story_multiplication to money.
  const hashes = [
    'cdeb148bdcdc037518495b44008397ba6329ee0a45dd260acd2998ea1435e52f',
    '1f1087e5391233c28cb6431daa6011af7014e33de82c4f9c26e3e781c16ede8f',
    '4dd251b01ae24ba7ace93ee54813e51f62fcb22940ce2d4d3208aabb2914526d',
    '68ea62a84b3a5f7d9a262f7711e9ed0425ccbe6f4e2bdbcafbe49cbd59375de5'
  ];
  let count = 0;
  for (const [i, id] of ids.entries()) {
    const l = load(id);
    expect(l.companionPolicy).toEqual({
      disabledEvents: ['CHALLENGE_OPEN', 'CHALLENGE_SUCCESS', 'LEVEL_PROGRESS_MILESTONE'],
      attentionOncePerVisit: true
    });
    const bank = l.learningChallenges.map(ch => ({ id: ch.id, questions: ch.questions.map(s => ({
      id: s.id, variants: s.variants.map(({ hintParameters, ...v }) => v)
    })) }));
    expect(crypto.createHash('sha256').update(JSON.stringify(bank)).digest('hex')).toBe(hashes[i]);
    for (const v of variants(l)) {
      count++;
      expect(v.hintMinnie).toBeUndefined(); expect(v.hintMoose).toBeUndefined();
      const m = hints.resolve(id, v, 'minnie'), mo = hints.resolve(id, v, 'moose');
      expect(m).toBeTruthy(); expect(mo).toBeTruthy(); expect(m).not.toBe(mo);
      expect(m + mo).not.toMatch(/undefined|NaN|null|\{|\}/);
      // An operand can equal the answer (e.g. 2×2); reject an answer statement,
      // not the mere presence of a digit used legitimately in a strategy.
      expect(m + mo).not.toMatch(/=|antwoord is|dus is/);
      if (typeof v.answer === 'string') expect((m + mo).toLowerCase()).not.toContain(v.answer.toLowerCase());
      if (v.family === 'clock_reading') {
        expect(m).toBe('Kijk eerst naar de grote wijzer.');
        expect(v.visual.type).toBe('clock'); expect(v.visual.minute % 5).toBe(0);
      } else {
        const { a, b, strategy = v.family } = v.hintParameters;
        expect(['bare_division', 'story_division', 'route'].includes(strategy) ? a / b : a * b).toBe(v.answer);
        const equation = v.explanation.match(/^(\d+) [×:] (\d+) =/);
        // Story operands were reviewed in semantic order, not guessed at runtime.
        expect([a, b]).toEqual(id === 'LVL-0035' && v.id === 'crate-4b' ? [5, 4] : [+equation[1], +equation[2]]);
        if (strategy === 'bare_division') {
          expect(m).toBe(`Welke keersom met ${b} helpt je bij ${a} : ${b}?`);
          expect(mo).toBe(`Zoek in de tafel van ${b} welk getal precies op ${a} uitkomt.`);
        }
        if (strategy === 'story_multiplication') expect(mo).toBe(`Je hebt ${a} groepjes van ${b}. Reken ${a} × ${b}.`);
        if (strategy === 'story_division') expect(mo).toBe(`Je verdeelt ${a} over ${b} gelijke groepjes. Reken ${a} : ${b}.`);
        if (strategy === 'money') expect(mo).toBe(`Je betaalt ${a} keer ${b} euro. Reken ${a} × ${b}.`);
        if (strategy === 'route') expect(mo).toBe(`Verdeel ${a} door ${b}. Reken ${a} : ${b}.`);
      }
    }
    expect(l.companionMoments.find(m => m.event === 'PATH_UNLOCKED')).toMatchObject({ speaker: 'moose', text: unlock[i] });
    expect(l.companionMoments.filter(m => ['CHALLENGE_OPEN', 'CHALLENGE_SUCCESS', 'LEVEL_PROGRESS_MILESTONE'].includes(m.event))).toEqual([]);
  }
  expect(count).toBe(96);
});

test('Stella crate-4b uses the money family without an override and preserves its question and reporting', () => {
  const q = variants(load('LVL-0035')).find(v => v.id === 'crate-4b');
  expect(q).toEqual({
    id: 'crate-4b', domain: 'math', schoolBand: 'E5-intended', family: 'money',
    presentation: 'story', answerMode: 'open',
    prompt: 'Een zaklamp kost 4 euro. Valente koopt 5 zaklampen. Hoeveel euro betaalt hij?',
    answer: 20, hintParameters: { a: 5, b: 4, currency: 'euro' }, explanation: '4 × 5 = 20.'
  });
  expect(hints.resolve('LVL-0035', q, 'minnie')).toBe('Hoeveel keer betaal je hetzelfde bedrag?');
  expect(hints.resolve('LVL-0035', q, 'moose')).toBe('Je betaalt 5 keer 4 euro. Reken 5 × 4.');
  const context = vm.createContext({
    window: { location: { search: '?dev=editor' }, addEventListener() {} },
    URLSearchParams, navigator: { webdriver: false }, localStorage: { getItem: () => null }
  });
  vm.runInContext(fs.readFileSync('src/session-report.js', 'utf8'), context);
  const classify = context.window.AtlasSessionReport.classifyQuestion;
  expect(classify(q)).toEqual({ category: 'Verhaalsommen', detail: 'Vermenigvuldigen' });
  expect(classify(q)).toEqual(classify({ ...q, family: 'story_multiplication' }));
});

test('multiplication priority is commutative and the approved decompositions are equivalent', () => {
  const strategies = [
    [10, n => `Bij × 10 komt er een nul achter ${n}.`, n => n * 10],
    [2, n => `Verdubbel ${n}.`, n => n + n],
    [4, n => `Verdubbel ${n} en verdubbel de uitkomst nog een keer.`, n => (n + n) * 2],
    [5, n => `Reken ${n} × 10 en neem daar de helft van.`, n => n * 10 / 2],
    [9, n => `Reken eerst ${n} × 10 en haal er één groepje van ${n} af.`, n => n * 10 - n],
    [6, n => `Reken eerst ${n} × 5 en tel er nog ${n} bij.`, n => n * 5 + n],
    [7, n => `Reken eerst ${n} × 5 en tel er nog twee groepjes van ${n} bij.`, n => n * 5 + 2 * n],
    [8, n => `Reken eerst ${n} × 4 en verdubbel die uitkomst.`, n => n * 4 * 2],
    [3, n => `Neem drie groepjes van ${n}: ${n} + ${n} + ${n}.`, n => n + n + n]
  ];
  for (let a = 2; a <= 10; a++) for (let b = 2; b <= 10; b++) {
    const [k, text, value] = strategies.find(([k]) => k === a || k === b);
    const n = k === a ? b : a;
    expect(hints.multiplication(a, b)).toBe(text(n));
    expect(hints.multiplication(b, a)).toBe(text(n));
    expect(value(n)).toBe(a * b);
  }
});

test('clock strategies preserve Dutch half semantics, reject invalid inputs, and allow explicit exceptions', () => {
  const q = { id: 'clock', family: 'clock_reading', visual: { type: 'clock', hour: 6, minute: 30 } };
  expect(hints.resolve(ids[0], q, 'moose')).toBe('De grote wijzer staat op de 6: dat is half. Kijk naar welk uur de kleine wijzer onderweg is.');
  for (const [minute, phrase] of [[0, 'precies een heel uur'], [15, 'kwart over'], [45, 'kwart voor']]) {
    expect(hints.resolve(ids[0], { ...q, visual: { ...q.visual, minute } }, 'moose')).toContain(phrase);
  }
  for (const minute of [5, 10, 20, 25, 35, 40, 50, 55]) {
    expect(hints.resolve(ids[0], { ...q, visual: { ...q.visual, minute } }, 'moose')).toBe('Elke stap van de grote wijzer is 5 minuten. Tel vanaf de 12 tot waar hij staat.');
  }
  expect(() => hints.resolve(ids[0], { family: 'bare_division' }, 'moose')).toThrow();
  expect(() => hints.resolve(ids[0], { ...q, visual: { type: 'clock', minute: 7 } }, 'moose')).toThrow();
  expect(hints.resolve(ids[0], { ...q, hintMoose: 'Explicit exception.' }, 'moose')).toBe('Explicit exception.');
  for (let i = 21; i <= 31; i++) {
    const id = `LVL-${String(i).padStart(4, '0')}`;
    for (const ch of load(id).learningChallenges.filter(ch => ch.active === false)) for (const slot of ch.questions) for (const v of slot.variants) {
      expect(hints.resolve(id, v, 'minnie')).toBe(v.hintMinnie);
      expect(hints.resolve(id, v, 'moose')).toBe(v.hintMoose);
    }
  }
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
        for (const rune of l.runes) {
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
                visible: document.querySelector('.teamMessage')?.textContent,
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
  expect(results).toHaveLength(24);
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

for (const [i, id] of ids.entries()) test(`${id}: once-per-visit attention, silent events, counted exits and exact unlock`, async ({ page }) => {
  await enter(page, id);
  const result = await page.evaluate(() => {
    const call = n => window.eval(n), s = call('state'), l = call('level'), rune = l.runes[0];
    const select = () => { call('selectChallenge')(rune); call('stopMovement')({ invalidateIntent: true }); };
    select(); const first = { ...s.guideMessage };
    call('setGuideMessage')({ speaker: 'moose', text: 'sentinel' }); select(); const repeated = s.guideMessage.text;
    call('openRuneChallenge')(rune.id);
    const q = call('currentChallengeQuestions')()[0]; call('answerQuestion')(typeof q.answer === 'number' ? q.answer + 1 : 'wrong');
    call('closeChallenge')(); call('setGuideMessage')({ speaker: 'moose', text: 'after retry' }); select(); const retry = s.guideMessage.text;
    s.completedRunes.add(l.runes[1].id); call('emitCompanionEvent')('LEVEL_PROGRESS_MILESTONE'); select(); const other = s.guideMessage.text;
    const silent = [];
    for (const event of ['CHALLENGE_OPEN', 'CHALLENGE_SUCCESS', 'LEVEL_PROGRESS_MILESTONE']) {
      const before = JSON.stringify([s.guideMessage, s.companionQueue, s.guidePriority]);
      call('emitCompanionEvent')(event, { challengeId: rune.id, objectId: rune.objectId });
      silent.push(before === JSON.stringify([s.guideMessage, s.companionQueue, s.guidePriority]));
    }
    s.completedRunes.add(rune.id); call('finishInteraction')(rune, 'rune', 'activate'); const revisit = s.guideMessage.text;
    const blocked = [];
    for (let done = 0; done < 3; done++) {
      s.completedRunes = new Set(l.runes.slice(0, done).map(r => r.id));
      call('finishInteraction')(call('hotspotById')(l.exitHotspotId), 'hotspot', 'activate'); blocked.push(s.guideMessage.text);
    }
    s.completedRunes = new Set(l.runes.map(r => r.id)); call('emitCompanionEvent')('PATH_UNLOCKED');
    return { first, repeated, retry, other, silent, revisit, blocked, unlocked: { ...s.guideMessage }, next: call('resolvedNextLevelId')() };
  });
  expect(result.first).toMatchObject(load(id).companionMoments.find(m => m.event === 'HOTSPOT_ATTENTION_FIRST') && {
    speaker: load(id).companionMoments.find(m => m.event === 'HOTSPOT_ATTENTION_FIRST').speaker,
    text: load(id).companionMoments.find(m => m.event === 'HOTSPOT_ATTENTION_FIRST').text
  });
  expect(result.repeated).toBe('sentinel'); expect(result.retry).toBe('after retry'); expect(result.other).toBe('after retry'); expect(result.revisit).toBe('after retry');
  expect(result.silent).toEqual([true, true, true]);
  expect(result.blocked).toEqual([3, 2, 1].map(n => `Nog ${n} ${n === 1 ? 'opdracht' : 'opdrachten'} te gaan. Daarna kunnen we ${destinations[i]}.`));
  expect(result.unlocked).toEqual({ speaker: 'moose', text: unlock[i] });
  if (id === 'LVL-0035') expect(result.next).toBeNull();
  await page.evaluate(id => window.eval('selectLevel')(id, { startImmediately: true }), id);
  expect(await page.evaluate(() => [...window.eval('state.seenObjects')])).toEqual([]);
});

test('unconfigured levels retain fallback chatter and repeat attention', async ({ page }) => {
  await enter(page, 'LVL-0001');
  const result = await page.evaluate(() => {
    const emit = window.eval('emitCompanionEvent'), s = window.eval('state');
    // LVL-0001 now opts in; explicitly exercise the omitted-policy contract.
    delete window.eval('level').companionPolicy;
    emit('HOTSPOT_ATTENTION_FIRST', { challengeId: 'zon', objectId: 'zon' }); const first = s.guideMessage.text;
    window.eval('setGuideMessage')('sentinel'); emit('HOTSPOT_ATTENTION_FIRST', { challengeId: 'zon', objectId: 'zon' }); const repeat = s.guideMessage.text;
    s.guidePriority = 0; emit('CHALLENGE_SUCCESS', { challengeId: 'zon', objectId: 'zon' });
    return { first, repeat, success: s.guideMessage.text };
  });
  expect(result.repeat).toBe(result.first);
  expect(result.success).toBe('Deze opdracht is al voltooid. Goed gedaan.');
});

test('companion policy is declarative: an unconfigured ARC level uses fallback, any level can opt out', async ({ page }) => {
  await enter(page, 'LVL-0035');
  const arcFallback = await page.evaluate(() => {
    const l = window.eval('level'), policy = l.companionPolicy;
    try {
      delete l.companionPolicy;
      window.eval('state').guidePriority = 0;
      window.eval('emitCompanionEvent')('CHALLENGE_SUCCESS', { challengeId: 'crate' });
      return window.eval('state').guideMessage.text;
    } finally { l.companionPolicy = policy; }
  });
  expect(arcFallback).toBe('Deze opdracht is al voltooid. Goed gedaan.');
  await page.evaluate(() => window.eval('selectLevel')('LVL-0001', { startImmediately: true }));
  const result = await page.evaluate(() => {
    const l = window.eval('level'), s = window.eval('state'), emit = window.eval('emitCompanionEvent');
    const policy = l.companionPolicy, moments = l.companionMoments;
    try {
      l.companionPolicy = { disabledEvents: ['CHALLENGE_OPEN', 'CHALLENGE_SUCCESS', 'LEVEL_PROGRESS_MILESTONE'], attentionOncePerVisit: true };
      window.eval('setGuideMessage')('sentinel');
      const before = JSON.stringify([s.guideMessage, s.companionQueue, s.guidePriority]);
      for (const event of l.companionPolicy.disabledEvents) emit(event);
      const silent = before === JSON.stringify([s.guideMessage, s.companionQueue, s.guidePriority]);
      emit('HOTSPOT_ATTENTION_FIRST', { challengeId: 'zon', objectId: 'zon' });
      const first = s.guideMessage.text;
      window.eval('setGuideMessage')('sentinel');
      emit('HOTSPOT_ATTENTION_FIRST', { challengeId: 'zon', objectId: 'zon' });
      const once = s.guideMessage.text;
      l.companionPolicy = {}; l.companionMoments = [];
      s.guidePriority = 0; emit('CHALLENGE_SUCCESS'); const success = s.guideMessage.text;
      emit('LEVEL_PROGRESS_MILESTONE', { completedCount: 1, totalCount: 3 });
      return { silent, first, once, success, milestone: s.guideMessage.text };
    } finally { l.companionPolicy = policy; l.companionMoments = moments; }
  });
  expect(result.silent).toBe(true);
  expect(result.first).not.toBe('sentinel'); expect(result.once).toBe('sentinel');
  expect(result.success).toBe('Deze opdracht is al voltooid. Goed gedaan.');
  expect(result.milestone).toBe('Goed gedaan! 1 van de 3 opdrachten voltooid. Nog 2 opdrachten te doen.');
});
