const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');
const crypto = require('crypto');
const baseline = require('./fixtures/older-companion-baseline.json');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];
const ledger = fs.readFileSync('Docs/older-worlds-non-challenge-dialogue-review-v2.md', 'utf8');
// Approved follow-up copy supersedes these five V2 destination rows, matching
// the current enabled route without changing the historical editorial ledger.
const destinationCopy = {
  D1288: 'Alles klaar. Door naar Umbrie.',
  D1481: 'Alles klaar voor vertrek. Op naar Vinci.',
  D0852: 'De collegepoort is open. Op naar Italië.',
  D1041: 'De Alpenpoort is open. Op naar Zweden.',
  D1163: 'De havenpoort is open. Onze reis door Europa zit erop.'
};
const rows = [];
let levelId;
for (const line of ledger.split(/\r?\n/)) {
  const heading = line.match(/^### (LVL-\d+)/);
  if (heading) levelId = heading[1];
  if (!/^\| D\d+ /.test(line)) continue;
  const [ref, event, speaker, context, decision, current, final] = line.split('|').slice(1, -1).map(s => s.trim().replaceAll('**', ''));
  rows.push({ levelId, ref, event, speaker: speaker.toLowerCase(), context, decision, current, final,
    expected: destinationCopy[ref] ?? (decision === 'REWRITE' ? final : current), momentId: baseline.momentIds[ref] });
}
const ids = [...new Set(rows.map(r => r.levelId))].sort();
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
function load(id) {
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(`Levels/${id}/level.js`, 'utf8'), c);
  return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));
}

test('all 238 V2 rows match approved follow-up copy; every other level field and ARC source is unchanged', () => {
  expect(rows).toHaveLength(238);
  expect(ids).toHaveLength(31);
  expect(new Set(rows.map(r => r.ref)).size).toBe(238);
  expect(rows.filter(r => r.decision === 'REWRITE')).toHaveLength(126);
  expect(rows.filter(r => Object.hasOwn(destinationCopy, r.ref))).toHaveLength(5);
  expect(rows.reduce((counts, r) => { counts[r.decision]++; return counts; }, { KEEP: 0, REWRITE: 0, 'REMOVE / SUPPRESS': 0 }))
    .toEqual({ KEEP: 37, REWRITE: 126, 'REMOVE / SUPPRESS': 75 });
  for (const id of ids) {
    const l = load(id), reviewed = rows.filter(r => r.levelId === id);
    expect(l.companionPolicy).toEqual({
      disabledEvents: [...new Set(reviewed.filter(r => r.decision === 'REMOVE / SUPPRESS').map(r => r.event))],
      attentionOncePerVisit: true
    });
    for (const row of reviewed) {
      const moments = l.companionMoments.filter(m => m.id === row.momentId);
      expect(moments, row.ref).toHaveLength(1);
      const m = moments[0];
      expect(m.event, row.ref).toBe(row.event);
      expect(m.speaker, row.ref).toBe(row.speaker);
      expect(m.text, row.ref).toBe(row.expected);
      expect(l.companionPolicy.disabledEvents.includes(m.event), row.ref).toBe(row.decision === 'REMOVE / SUPPRESS');
      m.text = row.current;
    }
    delete l.companionPolicy;
    // Includes all question/hint/answer fields, geometry, progression, hidden text,
    // moment IDs, filters and order: only approved text and policy may differ.
    expect(hash(JSON.stringify(l)), id).toBe(baseline.levelHashes[id]);
  }
  for (const id of ['LVL-0032', 'LVL-0033', 'LVL-0034', 'LVL-0035']) {
    // Ignore Git checkout line endings while checking every source character.
    expect(hash(fs.readFileSync(`Levels/${id}/level.js`, 'utf8').replaceAll('\r\n', '\n')), id).toBe(baseline.sourceHashes[id]);
  }
});

async function enter(page, id) {
  await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({ json: {} }));
  await page.goto(base + '/?atlasSessionTest=1');
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  // The ledger explicitly includes six currently disabled levels. Exercise
  // their authored dialogue through the existing editor option, without changing visibility.
  await page.evaluate(id => window.eval('selectLevel')(id, { startImmediately: true, allowDisabledForEditor: true }), id);
}

for (const id of ids) test(`${id}: reviewed events, once-per-visit attention and progression stay correct`, async ({ page }) => {
  await enter(page, id);
  const reviewed = rows.filter(r => r.levelId === id);
  const result = await page.evaluate(reviewed => {
    const call = n => window.eval(n), s = call('state'), l = call('level');
    const reset = () => { call('setGuideMessage')('sentinel'); s.guidePriority = 0; s.companionQueue = []; s.moving = false; };
    const snapshot = () => JSON.stringify([s.guideMessage, s.companionQueue, s.guidePriority]);
    const active = call('activeRunes')();
    const output = [];
    for (const row of reviewed) {
      s.seenObjects.clear(); s.completedRunes.clear();
      const m = l.companionMoments.find(m => m.id === row.momentId);
      if (m.event === 'PATH_UNLOCKED') s.completedRunes = new Set(active.map(r => r.id));
      const context = { objectId: m.objectId, challengeId: m.challengeId };
      reset(); const before = snapshot();
      call('emitCompanionEvent')(m.event, context);
      const text = s.guideMessage.text, silent = snapshot() === before;
      const expected = call('formatCompanionText')(row.expected,
        m.event === 'EXIT_BLOCKED' ? { remainingCount: call('remainingProgressionChallengeCount')() } : context);
      let repeated = null;
      if (m.event.includes('ATTENTION') && row.decision !== 'REMOVE / SUPPRESS') {
        reset(); const again = snapshot();
        call('emitCompanionEvent')(m.event, context);
        repeated = snapshot() === again;
      }
      output.push({ ref: row.ref, text, expected, silent, repeated });
    }
    // Exercise the actual completed-target handler, not only direct emission.
    s.completedRunes = new Set(active.map(r => r.id)); reset(); const beforeRevisit = snapshot();
    call('finishInteraction')(active[0], 'rune', 'activate');
    const revisitSilent = snapshot() === beforeRevisit;
    // Actual ambient handler transitions FIRST to ordinary ATTENTION on reselect.
    const ambient = [];
    s.completedRunes.clear(); s.seenObjects.clear();
    for (const target of l.hotspots.filter(h => h.type === 'ambient')) {
      reset(); call('finishInteraction')(target, 'hotspot', target.defaultAction);
      const first = s.guideMessage.text;
      reset(); const before = snapshot(); call('finishInteraction')(target, 'hotspot', target.defaultAction);
      ambient.push({ first, silent: before === snapshot() });
    }
    // A real wrong answer and another completion must not reset attention.
    s.completedRunes.clear(); s.seenObjects.clear(); s.screen = 'scene';
    const rune = active.find(r => !call('learningChallengeById')(r.challengeId || r.id)?.requiresAllOtherChallenges) || active[0];
    const select = () => { call('selectChallenge')(rune); call('stopMovement')({ invalidateIntent: true }); };
    reset(); select();
    const seen = [...s.seenObjects];
    call('openRuneChallenge')(rune.id);
    const q = call('currentChallengeQuestions')()[0];
    call('answerQuestion')(typeof q.answer === 'number' ? q.answer + 1 : 'wrong');
    call('closeChallenge')();
    s.completedRunes.add(active.find(r => r.id !== rune.id).id);
    reset(); select();
    const afterRetry = s.guideMessage.text;
    const retainedSeen = seen.every(key => s.seenObjects.has(key));
    // Early PATH_UNLOCKED cannot fire. EXIT_BLOCKED uses progression requirements.
    s.completedRunes.clear(); reset(); const beforeEarly = snapshot();
    call('emitCompanionEvent')('PATH_UNLOCKED'); const earlySilent = beforeEarly === snapshot();
    const blocked = [];
    for (const completed of [[], active.slice(0, -1).map(r => r.id)]) {
      s.completedRunes = new Set(completed); reset();
      const remaining = call('remainingProgressionChallengeCount')();
      call('emitCompanionEvent')('EXIT_BLOCKED');
      blocked.push({ remaining, text: s.guideMessage.text });
    }
    // Complete the final challenge through real answer checking/nextQuestion,
    // proving the unlock event still comes from the normal completion handler.
    s.completedRunes = new Set(active.slice(0, -1).map(r => r.id)); reset();
    call('openRuneChallenge')(active.at(-1).id);
    const questionCount = call('currentChallengeQuestions')().length;
    for (let index = 0; index < questionCount; index++) {
      const question = call('currentChallengeQuestions')()[s.questionIndex];
      call('answerQuestion')(call('answerFor')(question));
      if (s.screen !== 'correct') throw new Error('Canonical answer rejected: ' + question.id);
      call('nextQuestion')();
    }
    const unlocked = s.guideMessage.text;
    return { output, ambient, revisitSilent, afterRetry, retainedSeen, earlySilent, blocked, unlocked };
  }, reviewed);
  for (const row of reviewed) {
    const actual = result.output.find(r => r.ref === row.ref);
    if (row.decision === 'REMOVE / SUPPRESS') expect(actual.silent, row.ref).toBe(true);
    else expect(actual.text, row.ref).toBe(actual.expected);
    if (actual.repeated !== null) expect(actual.repeated, row.ref).toBe(true);
  }
  if (load(id).companionPolicy.disabledEvents.includes('CHALLENGE_SUCCESS')) expect(result.revisitSilent).toBe(true);
  for (const a of result.ambient) expect(a.silent).toBe(true);
  expect(result.afterRetry).toBe('sentinel'); expect(result.retainedSeen).toBe(true);
  expect(result.earlySilent).toBe(true);
  const blocked = reviewed.find(r => r.event === 'EXIT_BLOCKED');
  for (const b of result.blocked) {
    expect(b.remaining).toBeGreaterThan(0);
    expect(b.text).toBe(blocked.final.replace('{remainingChallenges}', `${b.remaining} ${b.remaining === 1 ? 'opdracht' : 'opdrachten'}`));
  }
  expect(result.blocked[1].remaining).toBe(1);
  const unlock = reviewed.find(r => r.event === 'PATH_UNLOCKED');
  expect(result.unlocked).toBe(unlock.expected);
  await page.evaluate(id => window.eval('selectLevel')(id, { startImmediately: true, allowDisabledForEditor: true }), id);
  const fresh = await page.evaluate(() => {
    const s = window.eval('state'), l = window.eval('level');
    const before = [...s.seenObjects];
    const m = l.companionMoments.find(m => m.event.includes('ATTENTION') && !l.companionPolicy.disabledEvents.includes(m.event));
    if (!m) return { before };
    window.eval('emitCompanionEvent')(m.event, { objectId: m.objectId, challengeId: m.challengeId });
    return { before, text: s.guideMessage.text, expected: m.text };
  });
  expect(fresh.before).toEqual([]);
  if (fresh.expected) expect(fresh.text).toBe(fresh.expected);
});
