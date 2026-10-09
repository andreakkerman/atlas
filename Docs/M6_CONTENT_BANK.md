# Central M6 bank and challenge capabilities v2 — 99 approved questions

Current contract, 9 October 2026. This supersedes the pilot's historical slot placements and local M6 fallback. Approved source documents remain immutable; explicitly dated addenda supersede only their stated fields. Runtime authorities: `src/m6-bank.js`, `src/learning-levels.js`, `src/challenge-support.js`, `src/challenge-capabilities.js` and the existing app/session handlers.

## Ownership and data flow

The existing four question positions still own progression. At first entry to each position the existing 20-request planner draws E5/M6. E5 selects from that position's unchanged local variants. M6 takes the next difficulty from the same planner's slider-dependent difficulty sequence, selects from `AtlasM6Content.bank`, resolves one authored surface, then stores the selected instance on `state.activeQuestions`. Choices are shuffled once by the existing handler. Rendering never selects content.

Production modules in `src/content/m6/`:

| Module | Records | Broad educational domain |
| --- | ---: | --- |
| `fractions-ratios.js` | 6 | fractionsRatios |
| `addition-subtraction.js` | 6 | additionSubtraction |
| `money.js` | 6 | money |
| `time.js` | 6 | time |
| `expansion/number-sense.js` | 8 | numberSense |
| `expansion/addition-subtraction.js` | 8 | additionSubtraction |
| `expansion/multiplication-division.js` | 10 | multiplicationDivision |
| `expansion/fractions-ratios.js` | 10 | fractionsRatios |
| `expansion/money.js` | 8 | money |
| `expansion/time.js` | 18 | time |
| `expansion/measurement.js` | 7 | measurementGeometry |
| `expansion/data-patterns.js` | 6 | dataPatterns |
| `index.js` | **99 combined** | One logical indexed bank |

All 24 stable `RP-M6-*` IDs remain with one generic `original` surface. The 6 October genericization used contentVersion `"0.2"`; the four explicitly recalibrated time cores below now use `"0.3"`. No legacy surface or recovery alias is preserved. Non-time content remains exact. Canonical educational domains and machine objective IDs replace transitional metadata. Historical migration checks and the full pre-recalibration level fixture protect all E5 fields outside the authorized representation conversion.

The bank contains **99 IDs / 132 surfaces**: 24 genericized original records plus 75 expansion records. After the seven approved reclassifications, expansion difficulties are **37 / 26 / 12** and full-bank difficulties are **45 / 34 / 20**. The default D1 pool contains **35 non-time** and **10 time** questions. Raw bank counts do not implement the planner’s delivery policy. Expansion surface counts are 33 double-surface records and 42 single-surface records; M6-TI-009 now uses only its newly approved glue-drying surface.

The editorial source is `scripts/content/atlas-m6-central-approved.md`, a byte-for-byte copy of the attachment. The separately approved `atlas-m6-visual-addendum.md` supplies the missing stages for M6-MD-002/003/004. `scripts/m6-expansion-content.cjs` parses exact fields, and `scripts/content/atlas-m6-expansion-visuals.cjs` transcribes their fixed visual frames. `node scripts/import-m6-expansion.cjs` deliberately rebuilds only the eight expansion modules; it does not run in the browser. The source's “draft” batch heading is historical: the user's explicit approval covers all 75 records. Source prose is never rewritten to satisfy a schema.

## Time recalibration — 9 October 2026

The exact approval is [atlas-time-recalibration-approved.md](../scripts/content/atlas-time-recalibration-approved.md). `atlas-time-recalibration.cjs` is the final offline transcription layer in both importers. It supplies fixed authored values, prose and four-stage visuals, never runtime-generated exercises. Analogue/digital is a representation choice: E5 now has one of each in all 60 explicit time positions. M6 time remains exactly 24 IDs with difficulty counts **10 / 9 / 5**.

| Replaced ID | Current core | Version |
| --- | --- | --- |
| RP-M6-TI-001 | 240 seconds → 4 minutes | "0.3" |
| RP-M6-TI-002 | 3 minutes → 180 seconds | "0.3" |
| RP-M6-TI-003 | 430 seconds → 7 minutes 10 seconds | "0.3" |
| RP-M6-TI-004 | 5 minutes 20 seconds → 320 seconds | "0.3" |
| M6-TI-001 | 15:58 + 4 minutes → 16:02 | 2 |
| M6-TI-002 | 08:57 + 8 minutes → 09:05 | 2 |
| M6-TI-003 | 14:51–15:32 → 41 minutes | 2 |
| M6-TI-004 | 19:43–20:28 → 45 minutes | 2 |
| M6-TI-005 | 15:29–16:12 → 43 minutes | 2 |
| M6-TI-006 | 08:50–09:34 → 44 minutes | 2 |
| M6-TI-007 | 17:36 + 48 minutes → 18:24 | 2 |
| M6-TI-008 | 20:13 − 47 minutes → 19:26 | 2 |
| M6-TI-009 | 300 seconds → 5 minutes | 3 |
| M6-TI-010 | 4 minutes → 240 seconds | 3 |
| M6-TI-013 | 2 minutes 30 seconds → 150 seconds | 2 |

RP-M6-TI-005/006 and M6-TI-011/012/014/015/016/017/018 remain exact full records, including all nine educational cores, surfaces and versions. No aliases retain replaced cores. Stored report snapshots are not rewritten. The 15 versions increase once; difficulty labels and the entire planner/policy source remain unchanged. The numerical audit includes canonical minutes/seconds conversions and reports zero exact duplicate cores across 99 questions.

Unchanged cores: RP-M6-TI-005: 13:50 + 85 min = 15:15; RP-M6-TI-006: 16:20 − 95 min = 14:45; M6-TI-011: 14:31–15:20 = 49 min; M6-TI-012: 15:42–16:39 = 57 min; M6-TI-014: 08:45 + 1 h 35 min = 10:20; M6-TI-015: 15:10 − 35 min = 14:35; M6-TI-016: 17:10 − 1 h 45 min = 15:25; M6-TI-017: 13:42–14:05 = 23 min; M6-TI-018: 10:35 + 45 + 20 + 55 min = 12:35.

`renderDigitalClock` in `challenge-capabilities.js` is shared by flat E5 `renderClockVisual` and M6 `render(type, frame)`. It uses scalable seven-segment SVG, graphite casing, a dark display, red segments, static colon, leading zeros, accessible `Digitale klok: HH:MM`, optional `compact`, `highlightHours` and `highlightMinutes`. No font or clock image is loaded. `challenge-support.js` renders only staged data; flat E5 clocks are not rendered a second time. M6 stage data remains the sole authority for revealed times and notes. No notebook layout, companion, challenge structure or report-schema change accompanies this capability.

Focused regressions: `time-recalibration.spec.js` (all 60 pairs, exact 15 transcriptions, untouched 84 records, all 24 calculations, stage disclosure, segment masks, policy/routing/exhaustion) and `time-recalibration-browser.spec.js` (both ARC clock challenges, non-ARC paired variants and eight-time DPR 2 gallery). `m6-quality-browser.spec.js` covers the new conversions, digital stages, irregular duration, backwards time and retained D3 schedule, including all help stages, stable reopening and report outcomes. Older content tests use only the enumerated new approval where it explicitly supersedes old expectations; unrelated assertions stay in force.

QA results: **73 unique focused unit/content/planner/grading checks passed** (32 bank/content tests, 25 difficulty tests, 7 pilot tests, 2 grading tests, 4 learning-framework tests, 2 clock-language tests and 1 ARC-bank test). **72 browser scenarios passed**, 24 each on desktop Chromium, iPad-landscape WebKit and iPad-portrait WebKit, plus the existing slider/report browser regression. One portrait analogue-click run timed out; its unchanged isolated rerun passed in 12.1 seconds, without increasing the 30-second limit. The initial browser run found the flat-E5/staged-M6 dispatch collision; the staged renderer guard fixes that and the regression protects it. New test selectors were corrected to assert E5's existing companion presentation rather than M6 notebook markup. No application assertions were weakened.

All 35 production levels plus the developer level validate; both imports are byte-idempotent across all 12 content modules; all 816 active E5 hint pairs match the current approval. Seven broader historical fingerprint assertions still fail (old level/source hashes, including LVL-0002/0004/0027 and `src/app.js`); their unrelated failures are retained. Those files match the task-start snapshot. The final scope audit finds 45 intentionally changed existing files and 512 unchanged; application flow, session reporting and planner source remain exact. Evidence, screenshots and `scope.json` are in ignored `qa-screenshots/time-recalibration-20261009/`. The WebKit WebGPU-unavailable banner is unchanged. Physical iPad Safari, installed-PWA upgrade behavior and historical renderer/NPC issues were not certified or modified.

## Approved content-quality correction — 6 October 2026 (historical, time overrides above take precedence)

The exact user approval is [atlas-m6-quality-approved.md](../scripts/content/atlas-m6-quality-approved.md). The build-time transcription in `atlas-m6-quality.cjs` explicitly supersedes the original source fields it changes. The six replacement IDs retain their surfaces and use these new cores:

| ID | Approved core |
| --- | --- |
| M6-MO-003 | €2,70 paid with €3,00 → 30 cents change |
| M6-MO-006 | €14,65 paid with €20,00 → 535 cents change |
| M6-TI-009 | 08:25–08:50 → 25 minutes |
| M6-TI-010 | 11:15–11:45 → 30 minutes |
| M6-TI-014 | 08:45 + 1 hour 35 minutes → 10:20 |
| M6-TI-016 | 17:10 − 1 hour 45 minutes → 15:25 |

Only AS-004/TI-017 (1→2), NS-008 (3→1), AS-007/MO-007/FR-008 (2→3) and FR-010 (3→2) change difficulty. FR-008 now resolves “7 schalen” or “7 pakketten” in Moose and explanation through its existing surface tokens. The 133-surface audit found no additional clear context leak.

Canonical domain counts: numberSense 8, additionSubtraction 14, multiplicationDivision 10, fractionsRatios 16, money 14, time 24, measurementGeometry 7, dataPatterns 6. The legacy domain keys `fractions` and `addition-subtraction` no longer occur in production metadata.

All 37 changed records receive one version increment: the original 24 use `"0.2"`; 13 expansion records increment their existing integer version. AS-007/FR-008/FR-010 become version 3; the other ten become version 2. No report schema, stored history, selector, policy, time routing, answer architecture, UI or level data changes. Cache v265 refreshes the central content.

`node scripts/import-runenpoort-m6.cjs --write` rebuilds only the four genericized central modules; without that flag it verifies current approved content. `node scripts/import-m6-expansion.cjs` rebuilds the eight expansion modules, retaining both approved correction layers. Neither importer writes local question slots. The old bundles remain historical source provenance, not runtime narrative alternatives.

`npm run audit:m6` additionally compares numerical task signatures across all 99 IDs via `scripts/m6-core-audit.cjs`, independent of prose and old/new core serialization. The regression proves it finds the six prior duplicate pairs; the corrected bank has **zero exact duplicate cores**. Different givens or a different unknown are distinct tasks.

Focused coverage: `m6-quality.spec.js`, `m6-quality-browser.spec.js`, existing bank/expansion/presentation tests, difficulty ceilings and original-pilot grading/E5 gates. The browser matrix covers three genericized questions, all six replacement IDs and both FR-008 surfaces on desktop and both iPad orientations. Physical iPad hardware is not part of this emulated browser check.

Final focused results: **58/58** unique content/schema/arithmetic/routing/difficulty/E5 tests and **33/33** browser scenarios (11 each desktop, iPad landscape and iPad portrait). All 35 production levels plus the developer level validate. Both imports reproduce identical content bytes. The 133 resolved surfaces have no remaining clear context leaks; all 816 E5 hint pairs remain exact. No timeouts or application assertions were relaxed. The first negative validator test exposed a missing-record guard in the new import check, which was fixed. The new browser harness was corrected to address the existing input selector and to exclude only measured notebook padding when comparing authored markup. Browser launching required execution outside the sandbox after EPERM. The existing WebKit WebGPU-unavailable banner was left unchanged; physical-device and historical renderer/NPC/fingerprint issues remain outside this content correction.

## Earlier presentation correction (historical validation evidence)

The October 2026 presentation correction is explicitly recorded in `scripts/content/atlas-m6-presentation.cjs`, after parsing the immutable source. The existing surface tokens resolve selected contextual nouns in Minnie/Moose/explanation; the two arithmetic-only surfaces omit only the paragraph referring to another narrative variant. Exact preconditions reject stale correction entries. No runtime noun guessing or new question/surface is introduced. Reimporting retains these corrections.

The complete 75-question / 109-surface audit identified **11 questions / 20 rendered surfaces** needing context correction: AS-001/007, MD-008/009/010, FR-004/005/008/010, ME-004/006. Their mathematical cores, prompts, answers, steps and stage disclosure are unchanged apart from those literal context edits. All contextual visual labels were checked; none required substitution. Four redundant prose notes in MO-004/005 change: each Moose visual uses a compact subtraction showing the same remainder, and each explanation visual keeps its example equation without repeating the adjacent sentence about other valid combinations. Short clock/fraction annotations, equations, tables, units and diagrams remain useful visual support and are retained.

These 13 records use `contentVersion:2` so new report snapshots identify the revised presentation. The other expansion records and original 24 keep their versions. No report migration or historical rewrite occurs. Cache v264 refreshes the five affected expansion modules. Focused coverage lives in `m6-presentation.spec.js`, `m6-presentation-browser.spec.js` and the existing exact-source expansion suite; their independent expectations permit only the enumerated presentation edits. Selection, time routing, difficulty, E5 and notebook layout are unchanged.

Focused QA for this correction: **22/22** content/schema/arithmetic/routing/migration checks (including all 816 E5 hint pairs), **24/24** desktop surface scenarios, **8/8** representative WebKit scenarios across both iPad orientations, and **1/1** real service-worker cache-upgrade/offline check. All 35 production levels plus the developer level validate. Reimporting reproduces identical modules. The 475-file task-start audit confirms 466 existing files unchanged, nine intentionally changed and four added; the educational-core hash and entire original 24-record hash are unchanged. Evidence is in ignored `qa-screenshots/m6-presentation-polish/`, including the exact file list in `scope.json`. The new browser test initially needed two harness corrections: invalid entries remain in answer history without counting as attempts, and browser serialization normalizes `<img />` to `<img>`. Full assertions remain; the affected scenarios pass on recheck. WebKit required unsandboxed launching after `spawn EPERM`; physical iPad testing was not performed.

No record contains level/world/challenge eligibility restrictions. ARC, Egypt and Runenpoort use the same global selector; other normal production challenges use that same path, including legacy question positions. Adding a future world requires no M6 ID attachments. E5 authoring remains local. Explicit clock positions use the central time-domain constraint below, derived from existing E5 semantics rather than world or object names.

## Record and surface contract

Illustrative schema (not a production question):

```js
{
  id: 'TEST-M6-EXAMPLE', contentVersion: 1,
  learningLevel: 'M6', difficulty: 2,
  domain: 'math', educationalDomain: 'fractionsRatios',
  learningObjective: 'fraction_of_quantity_multiple_parts',
  reportLabel: 'An explicitly authored report label',
  family: 'fraction_quantity', presentation: 'story', answerMode: 'open',
  educationalCore: {
    values: {total: 28, fraction: {numerator: 3, denominator: 4}},
    question: {answer: 21, answerSpec: {type: 'wholeNumber', allowedForms: ['21']}}
  },
  surfaces: [{
    id: 'approved-crate', tokens: {container: 'een kist'},
    prompt: 'Explicitly approved copy with {container}',
    answerDisplay: '21', hintMinnie: 'Approved text', hintMoose: 'Approved text',
    explanation: 'Approved complete text',
    authoredSupport: {explanationSteps: ['Approved complete text']},
    visual: {type: 'calculationSteps', stages: {
      question: {groups: []}, minnie: {groups: []},
      moose: {groups: []}, explanation: {groups: []}
    }}
  }]
}
```

`domain: math`, stable machine `learningObjective`, approved difficulty and exact report labels form the semantic metadata. `educationalDomain` provides the broader balancing classification without replacing the original domain. `educationalCore.values` records fixed operands, fractions, prices or times; the expansion retains its exact editorial core as `values.authored`. `educationalCore.question` owns the canonical answer, answer contract and any choice values. Surface data owns exact narrative/support/illustration wording. The original records retain `original`; expansion surface IDs and complete text come from the source, with `original` used where no alternatives were authored.

Numbers, operators and answers are authored data. Neither the selector nor template rendering generates arithmetic. To add another numerical task, add another approved record. Optional `educationalCore.tokens` supplies explicitly authored fixed substitutions (for example `{total:28}`); a narrative bundle cannot override these. Surface tokens are literal substitutions from one complete approved bundle, never independent noun/verb lists or runtime grammar. Every referenced token must exist; unresolved nested tokens, duplicate surface IDs and core overrides are rejected. A different surface is still the same educational question for anti-repeat. Human review still verifies that all surface/visual wording agrees with its fixed core; validation does not interpret Dutch prose.

Add approved data to the relevant content module. A new subject module must be registered once in `index.js`, HTML bootstrap and the service-worker shell; adding records to an existing module requires no runtime or level changes. Run validation, exact-content tests and the audit. Do not promote `TEST-M6-*` fixtures from `tests/fixtures/m6-capabilities.cjs` into production.

## Selection, stability and bounded history

Default mix remains 90% E5 / 10% M6. Since the 6 October 2026 planner correction, the same slider also sets the M6 difficulty policy in `src/learning-levels.js`:

| M6 percentage | D1 / Instap | D2 / Normaal | D3 / Uitdagend |
| --- | ---: | ---: | ---: |
| 0% | n/a | n/a | n/a |
| 10% | 100% | 0% | 0% |
| 20% | 100% | 0% | 0% |
| 30% | 100% | 0% | 0% |
| 40% | 85% | 15% | 0% |
| 50% | 75% | 25% | 0% |
| 60% | 65% | 35% | 0% |
| 70% | 65% | 30% | 5% |
| 80% | 60% | 30% | 10% |
| 90% | 55% | 35% | 10% |
| 100% | 50% | 35% | 15% |

The E5/M6 deck is unchanged. A separate counter inside that same planner advances a balanced 20-M6-request difficulty deck only for M6 requests. Smooth weighted ordering and the run's existing random rotation provide exact cycle counts (for example 10/7/3 at 100% M6), without per-question difficulty rolls. Slider changes discard the planner through the existing handler; the next new question builds both sequences with the new percentage. Already selected questions, retries and reopening retain their selection. At 0%, no M6 difficulty is requested. Fallback consumes its request normally without difficulty debt.

Zero-weight difficulties are hard exclusions passed as `allowedDifficulties` to the central selector, alongside the unchanged domain filter. At the default 10% M6, every delivered M6 question is D1. Within the allowed domain/difficulty set, the selector first excludes IDs already used in this challenge, then uses the closest available difficulty among remaining questions; ties prefer easier. Thus avoiding a duplicate can honestly deliver another **allowed** difficulty. Only when every eligible bank ID is exhausted in the challenge can an ID repeat. An empty allowed set falls back to local E5 instead of crossing the ceiling or domain boundary. Requested/delivered level and difficulty still use existing report fields; historical reports are unchanged. Focused coverage: `tests/m6-difficulty.spec.js`.

Within the eligible difficulty bucket, unseen recent IDs win. If all were seen, the oldest eligible ID is reused. Among equally fresh candidates, unseen objectives and domains occurring fewer than twice are preferred. These are soft educational preferences, never reasons to fall back to E5. A surface other than the prior surface is preferred when available. A genuinely empty eligible central collection uses local E5 as last resort. No fallback creates planner debt.

`positionDomain(localVariants)` recognizes a clock position when every existing E5 variant has `visual.type === 'clock'` or a `clock_reading` family (including its suffixed strategies). `selectPosition` supplies `domain:'time'` for those positions and `excludeDomain:'time'` for generic positions to the same indexed selector. Difficulty, freshness, current-challenge uniqueness and oldest reuse operate **inside** that eligible set. Time questions are exclusive to explicit clock positions: neither direction may cross the time/non-time boundary to avoid repetition or obtain a closer difficulty. Exhaustion reuses the oldest eligible ID in the selected difficulty bucket; an actually empty eligible collection falls back honestly to local E5. E5 selection is unchanged. This adds no metadata or lists to levels. The current time inventory is 24 (6 original + 18 new).

`atlas.learning.m6Recent` contains at most 128 `{id, surfaceId}` records ordered oldest to newest, one per question ID. No prompts, notes or educational blobs enter this history. It survives menu/reload/session boundaries; storage failure keeps bounded memory history usable. Existing Atlas local-data reset owns this key. Indexes by ID/difficulty/domain/objective are built once. A draw filters one metadata bucket and renders/clones only the chosen instance, never the whole bank on UI redraw.

The existing suspended-question snapshot retains the selected object, shuffled choices, wrong count, current help stage, drafts, help history and private notebook notes. Currency counts use an additional draft in the same snapshot. Reopening/rendering consumes no planner request, recent-history write, hint or attempt. New positions reset drafts/notes normally.

`bank.recover(id, surfaceId)` resolves migrated stable IDs for callers that hold content references. Actual reload behavior is unchanged: Atlas recovers session reports, not a playable question/notes. Reports keep their original snapshots and never consult a future bank version to backfill history.

## Additive capabilities

All staged visuals use `visual: {type, stages: {question, minnie, moose, explanation}}`. Every frame is explicitly authored. No type infers a lesson or intermediate answer. The four pilot types, analogue clocks, money fields and current notebook remain supported.

| Type | Frame data and behavior |
| --- | --- |
| currency/count | `mode: 'count', items: [{denomination:2000,count:1}]`; real repeated coin/banknote images, no computed total shown. Pair with the existing open-euro contract. |
| currency/compose | Frame has `mode: 'compose', targetCents, denominations`; an explicit `label`/groups/notes may be shown. `answerMode:'currencyCompose'`, `answerSpec:{type:'currency',mode:'compose',targetCents,denominations}` supplies compact count controls. |
| currency/change | The same answer mode with `priceCents`, `paidCents` and denominations. Required total is paid minus price. The renderer never exposes this computed target; only authored frames may explain it. |
| digitalClock | `{hour:22,minute:25}` with shared seven-segment SVG, zero-padded 24h digits and accessible `Digitale klok: 22:25`. Optional `compact`, `highlightHours`, `highlightMinutes`. Flat E5 clocks and staged M6 frames use the same renderer. |
| analogueClock | Authored hour/minute plus optional hand/numeral emphasis and reference-minute mark. Uses the existing E5 clock geometry/markup, extracted unchanged into the shared capability module. No digital/spoken answer is added unless authored for that stage. |
| compactDataTable | Authored `columns`/`rows`, optional `highlightRows`/`highlightCells`; semantic column and row headers. A question table belongs in rich prompt parts; `inPrompt` prevents a second copy. Each help frame retains the table and only its authored highlighting/calculation. |
| numberLine | `{min:9000,max:10000,markers:[{value:9000,label:'9000'}]}`; only authored markers/labels appear. |
| measurement | `{source:{value:300,unit:'cm'},targetUnit:'m'}`; target remains `?` unless an authored `targetLabel` is supplied. Units: mm/cm/dm/m/g/kg. No conversion rule is generated. |

Number lines additionally accept authored jumps, emphasis and label lanes; measurement accepts multiple source quantities, grouped lengths, repeated pieces and an explicit multiplier. Existing calculation/fraction/timeline/receipt types gained only the declarative fields required by the expansion: quantity groups, an initially undivided strip, joined strip boundaries, authored time-node emphasis and receipt change/highlighting. `none` deliberately draws nothing for the three questions whose source says no visual. Notebook geometry, paper/rings, scrolling and flip handlers are unchanged.

`currencyAssetForCents` is the sole denomination path resolver. Supported files currently are 5, 10, 20, 50, 100, 200, 500, 1000, 2000 and 5000 cents. The supplied `assets/ui/currency/20.png` is supported for counting, composition and change. Unsupported denominations are rejected, not replaced by a different coin. Asset existence is checked by normal validation. Asset images are app-shell cached. Individual questions still explicitly authorize their available denominations.

Composition accepts any denomination combination with the correct sum. Counts are digit strings 0–99, canonical total is integer cents; empty/zero-only, malformed or out-of-contract counts are non-attempts. Evidence uses existing answer history: `rawCounts`, `interpreted`, `unit:'cents'`, `targetCents`. A valid wrong amount follows the unchanged Minnie → Moose → full-explanation flow.

Proper fractions use `{numerator:2,denominator:3}` in declarative rich-text arrays, for example `prompt: ['Test ', {numerator:2,denominator:3}]`. The same arrays work in authored hints/explanation steps and the new visual labels/notes. Rendering uses a stacked fraction and an accessible textual equivalent. The selected instance also stores a plain `2/3` snapshot for reports and the existing hint resolver. Existing strings are never automatically parsed/reformatted. Integer numerator and positive denominator are validated.

The offline import converts only explicitly authored mathematical fractions to those parts, retaining emphasis and exact plain snapshots. `choiceParts` changes MC presentation only; canonical choices and once-shuffled order are unchanged. Table parts retain their exact source Markdown for reports. New whole-number contracts explicitly allowing thousands grouping use `grouping:true`; numeric equivalence is checked only inside that opt-in contract. Unrelated E5/spelling/money grading does not change.

## Reports, validation and QA

Session v2 adds optional `centralQuestionId`, `surfaceId`, `domain`, `educationalDomain` and rich prompt parts alongside its existing prompt/version/objective/report-label snapshots. Composition adds the count evidence above. Storage keys, three-unchecked-report retention, historical outcomes and help timing are unchanged. `afterMoose` and `afterExplanation` remain distinct; notes and flips remain private/non-learning actions. No direct `Leg uit` route exists.

`npm run validate:levels` includes bank validation, actual currency assets, exact 24-ID/content migration, exact 75-record expansion and rejection of redundant M6 level copies. `npm run audit:m6` reports the full bank and expansion separately: exact IDs, domain/difficulty counts, objectives, visual types, missing labels, duplicate IDs/explicit cores and surfaces. Production contains no TEST records. The expansion adds no session schema/version or storage-key migration; current report snapshots and answer evidence already cover the data. Historical reports are not rewritten.

Tests: `m6-bank.spec.js` (migration, schema, surfaces, selection, history, 600-record performance), `m6-capabilities.spec.js` (real runtime/global access/controls/reporting/desktop and iPad), plus existing `runenpoort-m6`, workspace, E5 learning/hints, grading, progression and session suites. Synthetic fixtures are isolated from bootstrap, levels and production bank. The existing broader fingerprint/NPC failures are not rebaselined or hidden. Physical iPad keyboard and installed-PWA upgrade behavior require device verification beyond WebKit emulation.

## Initial architecture-migration scope

| Responsibility | Files |
| --- | --- |
| Production bank | `src/content/m6/{index,fractions-ratios,addition-subtraction,money,time}.js` |
| Index, fixed surfaces, recent history and selection | `src/m6-bank.js`, extension of `src/learning-levels.js` |
| Shared capabilities and current gameplay integration | `src/challenge-capabilities.js`, `src/challenge-support.js`, `src/app.js`, additive rules in `src/styles.css` |
| Snapshot evidence | `src/session-report.js` and existing Voortgang rendering in `src/app.js` |
| Removed redundant copies only | `Levels/LVL-0001/level.js`, `Levels/LVL-0002/level.js`, `Levels/LVL-0003/level.js` |
| Loading and app-shell cache | `index.html`, `service-worker.js` |
| Editorial checks | `scripts/audit-m6.cjs`, `scripts/validate-levels.js`, `scripts/runenpoort-m6-content.cjs`, `scripts/import-runenpoort-m6.cjs`, `package.json` |
| New regression coverage | `tests/m6-bank.spec.js`, `tests/m6-capabilities.spec.js`, `tests/fixtures/m6-capabilities.cjs`, `tests/fixtures/m6-migration-baseline.json` |
| Existing test integration | `tests/{runenpoort-m6,challenge-workspace,challenge-consistency,learning-levels,batch1-hints,batch2-hints,npc-challenges}.spec.js`; only the intentional app-source digest in three hint-baseline fixtures |
| Owning documentation | This contract, `LEVEL_CONTRACT.md`, `ATLAS_LEARNING_CONTENT_RULES.md`, `DEV_TOOLS.md`; supersession notice in `runenpoort-m6-pilot.md` |

The migration gate protects the exact `RP-M6-*` collection. The inventory tests now assert those same 24 plus exactly the 75 approved expansion IDs. A future content batch must deliberately update that inventory expectation. The original importer verifies central content by default and explicitly rebuilds only its four central modules with `--write`; it cannot put retired copies back into slots.

No changes were made to the authored source bundle, reusable E5 hint resolver, currency/notebook assets, notebook material/animation algorithms, progression, rewards, world geometry or renderer. Count controls use the existing keyboard-viewport accommodation and answer form; Enter submits the same canonical-cent answer as Controleer.

## 75-question expansion scope

| Responsibility | Added/changed files |
| --- | --- |
| Exact approved content | Eight `src/content/m6/expansion/*.js` modules listed above; `src/content/m6/index.js` |
| Immutable source and approved transcription | `scripts/content/atlas-m6-central-approved.md`, `atlas-m6-visual-addendum.md`, `atlas-m6-expansion-visuals.cjs` |
| Offline import and exact audit | `scripts/m6-expansion-content.cjs`, `scripts/import-m6-expansion.cjs`, `scripts/audit-m6.cjs` |
| Existing bank/domain constraint | `src/m6-bank.js`, `src/learning-levels.js` |
| Additive presentation/formatting | `src/challenge-capabilities.js`, `src/challenge-support.js`, `src/app.js`, appended rules in `src/styles.css` |
| Loading/cache v261 | `index.html`, `service-worker.js` |
| New source/arithmetic/runtime QA | `tests/m6-expansion.spec.js`, `tests/m6-expansion-browser.spec.js` |
| Existing inventory/runtime expectations | `tests/m6-bank.spec.js`, `tests/m6-capabilities.spec.js`, `tests/runenpoort-m6.spec.js`; CSS-pixel endpoint screenshots in `tests/challenge-consistency.spec.js`; intentional app-source digest only in the three hint-baseline fixtures |
| Owning contracts | `Docs/M6_CONTENT_BANK.md`, `LEVEL_CONTRACT.md`, `ATLAS_LEARNING_CONTENT_RULES.md`, `DEV_TOOLS.md` |

There are **no level-file changes in this expansion**. All old production modules, the E5 resolver, session-report implementation, explanation-layout mappings, notebook assets and original CSS prefix remain unchanged from task start. The full educational source/addendum remains separate from runtime presentation. The Markdown import is deterministic data serialization, not question generation. Current approved Moose wording is retained even where it already names a result; the stricter visual withholding in the MD addendum is respected independently.

Generic clock/time eligibility is based on existing authored clock families/visuals in the local position, not its title. A mixed position containing one duration story and a non-time alternative (for example the existing LVL-0022 bridge-model slot) stays generic. There is no world-specific allow-list. Same-run state recovery is unchanged; a full reload still recovers reports/history rather than a playable question or private notes.

## Expansion QA — 5 October 2026

Evidence is in ignored `qa-screenshots/m6-expansion-20261005/`. This includes the original failed runs, sequential rechecks, source/scope audit and desktop/landscape/portrait screenshots.

| Check | Result |
| --- | --- |
| Production import/audit | **75 new + 24 unchanged = 99**; new domain counts **8 / 8 / 10 / 10 / 8 / 18 / 7 / 6**; new difficulty **38 / 26 / 11**; no audit errors |
| Levels | **35 production + 1 developer level pass**; no level-file edits |
| Bank and expansion unit tests | **14/14**: exact source/addendum/surfaces, arithmetic for all 75 IDs, contracts, staged disclosure, time routing/exhaustion and 600-record stress fixture |
| All visual frames | **532/532** across 133 complete surfaces render without undefined values, NaN or object placeholders |
| New production browser tests | **87/87**: 29 each on desktop Chromium, iPad landscape WebKit and iPad portrait WebKit |
| Existing desktop M6/workspace/completion/capability tests | **119/119** |
| Existing iPad-landscape M6/workspace/completion/capability tests | **119/119**, sequential WebKit run |
| Existing iPad-portrait M6/workspace/completion/capability tests | **119/119**, sequential WebKit run; combined tablet run **238/238** |
| Broader E5/hints/learning/session/spelling/progression/NPC/cache suite | **86/97**; the same seven historical fingerprint failures and four historical NPC failures remain |

Every new ID completes directly in all three browser projects. Twenty representative production IDs exercise the complete wrong-answer sequence, exact authored hint/explanation rendering, stable surface/choices, reopen, notes/flip/scroll and completion evidence. These include all three addendum questions and every new visual family. Real clock positions in LVL-0003/0023/0033 select only central time content; unit coverage additionally includes LVL-0013, exhausted history, empty time-domain fallback and a mixed generic position. Long tables, stacked fractions, currency controls, analogue/digital clocks and notebook pages were visually inspected in desktop and both tablet orientations. The reduced-keyboard case retains reachable answer controls.

The initial concurrent regression attempt passed all 119 desktop cases but hit the normal 30-second budget in ten long landscape cases (six completion/flip and four workspace screenshot cases). Traces showed repeated 2–3 second waits for actionable/stable controls during overlapping WebKit runs. The run was stopped with its evidence preserved, and the complete tablet set was repeated sequentially: **238/238 passed**. All ten landscape cases then passed, with no runtime change, timeout increase or removed assertion. Three completion-test endpoint screenshots now use CSS-pixel resolution rather than device-pixel PNGs; the geometry, content, animation and interaction checks remain intact. This is evidence of test-run timing sensitivity, not a physical-device performance diagnosis.

The 600-record Node fixture measured about **16 ms** to validate/index, **20 ms** for 400 selections and **6,273 bytes** for its bounded 128-entry persisted history. These are observations on this host, not physical-iPad benchmarks. The runtime keeps only the selected instance in question state and does not serialize the bank into localStorage.

The task-start audit covers 1,204 existing source/test/document files. It confirms no deleted files, no changes to protected level/E5/original-M6/reporting files and a byte-identical original CSS prefix; all expansion styles are appended. JavaScript syntax checks pass for the 19 added/changed runtime/import modules, as does `git diff --check`.

Historical fingerprint failures concern existing LVL-0002/LVL-0004/LVL-0023 data and LVL-0002/world-config source differences. Two NPC appearance checks still report `ERR_FILE_NOT_FOUND`; two real-click checks still encounter `templeGate` intercepting Freya. Their world data/assets/hitboxes were not changed, and no failing assertion or world fingerprint was replaced.

The source copy is byte-identical to the approved attachment. There are no unresolved arithmetic contradictions. Missing MD-002/003/004 visual instructions were resolved by the user's authored addendum rather than invented steps. Existing authored Moose prose that already names a result is preserved; the visual separately obeys its approved disclosure stage.

Remaining device boundaries: physical iPad Safari/software keyboards and installed-PWA upgrades were not exercised. The DOM suites retain the existing WebGPU-unavailable banner and make no renderer/device acceptance claim. Full reload retains historical reports/recent history rather than resuming the playable question/private notes, as before. This expansion adds no report-schema migration and never rewrites saved reports.

## Historical architecture-migration QA — before the 75-question expansion

Evidence is in ignored `qa-screenshots/central-m6-bank-20261005/`, including original failing runs, final logs, screenshots, task-start snapshots and `scope.json`.

| Check | Final result |
| --- | --- |
| Desktop M6 production, workspace, completion, bank and capability scenarios | **128 distinct scenarios passed across the full run and focused corrections.** Initial full run: 117/125; final focused run: 35/35, including three newly added scenarios. |
| Bank/schema/migration/selection/600-record unit suite after final validation changes | **9/9** |
| iPad landscape, WebKit emulation | **28/28** |
| iPad portrait, WebKit emulation | **28/28 across the main run and four targeted rechecks** |
| Broader E5/hint/learning/NPC/session/spelling/progression/cache regression | **87/98**; the seven historical fingerprint failures and four historical NPC failures remain. |
| Level validation and production editorial audit | **35 production + 1 developer level passed; exactly 24 production M6 records.** |
| JavaScript syntax, JSON and whitespace checks | Passed |

The desktop production suite exercises every approved M6 ID through automatic Minnie/Moose/explanation, stable choices/reopening and completion outcomes; all six original euro amounts, invalid input, historical reports and the four existing visuals remain covered. New tests exercise real runtime selection in ARC (`LVL-0032`), Egypt (`LVL-0004`) and Runenpoort (`LVL-0001`), complete authored surfaces, all additive capabilities, multiple valid currency compositions, canonical evidence and reports readable after removing the test bank. Both iPad orientations cover new capabilities plus old touch/focus, keyboard viewport, 2×2 choices, fonts, paper, rings, notes and animation behavior. Screenshots of desktop and both tablet orientations were inspected.

The six initial desktop completion failures waited for the obsolete paper animation target; the test now waits on the actual existing sheet animation, retaining all geometry assertions. Two malformed-currency tests initially attempted to type through the working numeric input guard; they now deliberately inject corrupt runtime field state, then assert it remains a non-attempt. Four cumulative portrait scenarios reached the 30-second budget while collecting large DPR-2 PNGs. Only their endpoint screenshots changed to CSS-pixel resolution; all eight stage/face checks and actions remain, with no timeout increase. Their isolated final runs pass in 24–26 seconds. The intentional app fingerprint uses the same existing line-ending normalization as its test; a final recheck reaches the original `world-config.js` failure. No world/content fingerprint or failing assertion was replaced.

The retained fingerprints concern non-hint LVL-0002/LVL-0004/LVL-0023 data and pre-existing LVL-0002/world-config source differences. The two NPC appearance tests still report `ERR_FILE_NOT_FOUND`; the two real-click tests still encounter `templeGate` intercepting Freya. Their assets/hitboxes/world content were not changed. The broader suite is therefore **not entirely green**.

A synthetic 600-record bank takes roughly 15–22 ms to validate/index in Node and 17–45 ms in the tested desktop/WebKit browser runs on this host. Four hundred Node selections take roughly 20–25 ms. The persisted 128-entry history in that stress fixture is 6,273 bytes. These are host/emulation observations, not physical-iPad benchmarks. Only one selected central instance is present at first question opening; rerender/reopen does not rebuild the bank or reselect.

The task-start scope audit covers 2,074 existing files: 28 intentionally changed, 2,046 byte-identical, plus 13 new implementation/documentation/test files. The existing CSS is preserved as a byte-identical prefix with additive capability rules. Original E5 level values match the pre-migration fixture after removing only the approved embedded copies.

Limitations of that earlier migration: its 24-record bank had only one surface per question and reused Runenpoort wording across worlds. The expansion above adds the approved variety; original transitional wording remains exact. Physical iPad Safari/software keyboards and installed-PWA upgrades were not exercised; actual reload retains historical reports rather than resuming a playable question, as before. The DOM tests retain the existing WebGPU-unavailable banner and make no new renderer/device acceptance claim.

### 20-cent asset follow-up — 5 October 2026

The supplied `20.png` is now registered and precached (cache v260). No production question or educational copy changed. Focused QA: 10/10 bank/cache tests; 6/6 composition/change runtime scenarios across desktop Chromium and both iPad WebKit orientations, including decoded 20-cent images, canonical sums, help stages, reopening and report evidence. Level validation passes for all 35 production levels and the developer level; the approved 24-record migration remains exact. Screenshots are in `qa-screenshots/currency-20/browser-results/`. Physical-device/PWA upgrade verification remains outside this focused check.
