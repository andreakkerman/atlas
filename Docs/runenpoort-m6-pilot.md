> Current architecture (5 October 2026): the 24 exact questions now live in the [central M6 bank](M6_CONTENT_BANK.md), available globally. Earlier slot-placement/local-fallback descriptions below are historical. Current notebook and help-flow sections still apply. The original approved content bundle is unchanged.

# Runenpoort M6 pilot — implementation and QA

Implemented in the existing local working tree, 3 October 2026. The approved bundle is checked in unchanged at `scripts/content/runenpoort-m6-approved.md`. All 24 questions are alternatives in existing slots; there are still 11 challenge objects and 44 required question positions across the three levels. Twenty positions now have M6 coverage. No educational text or world content was invented to resolve placement.

**Current product flow:** the 3 October corrections withdraw direct `Leg uit` access and introduce structured euro/cent entry. The 4 October workspace correction supersedes the prior M6 companion presentation: all M6 help now appears inside the challenge and its companion bar stays hidden throughout the open question. The current flow below and [Level Contract](LEVEL_CONTRACT.md#runenpoort-m6-authored-support) govern runtime behavior; the approved bundle remains unchanged educational content. Earlier correction/QA sections below are historical.

## Architecture

- Existing `learningChallenges[].questions[].variants[]` holds the imported questions. The existing E5/M6 planner, preference, challenge handlers, NPC presentation, hint flow and local session reporter are extended.
- The default remains 90% E5 / 10% M6. One central difficulty policy in `src/learning-levels.js` requests 50% Instap, 35% Normaal and 15% Uitdagend. Selection first finds the nearest available M6 difficulty, preferring easier ties, then uses the existing E5 fallback if the slot has no M6. No fallback debt is accumulated. Eligible same-slot repetition is avoided where another choice exists.
- `src/challenge-support.js` renders four content-driven components: `fractionStrip`, `calculationSteps`, `moneyReceipt`, `timeLine`. Explicit stage data controls every disclosure. It also owns opt-in answer contracts and safe rendering of authored emphasis. Visuals compute no educational answers or prose.
- Literal Minnie/Moose overrides use the existing hint API's authored-content path; `src/challenge-hints.js` is unchanged. First/second/third valid wrong answers reveal Minnie/Moose/full explanation. There is no direct **Leg uit** action or handler. One shared challenge workspace uses the delivered learning level: E5 standard/NPC questions keep bottom companion hints and existing assisted completion; M6 standard/NPC questions use one integrated hint section with no companion bar. Moose's compact portrait appears inside **Moose legt het uit** while the original challenge/NPC presenter/title remains context. Declarative indices in `src/challenge-explanation-layouts.js` join exact explanation text with existing visual groups. A correct answer is still required for M6 completion. Closing/reopening retains the same question, help, choice order, drafts and private scratch notes within the run.
- Only M6 open-euro input uses `€ [euro] , [cent]`, with fixed punctuation, separate digit-only fields and numeric keyboard hints. It stores canonical integer cents and both raw fields. `50` in the euro field means €50,00; `5` in the cent field means five cents. Blank euro plus `50` cent means €0,50, while both blank is a non-attempt. Invalid formats are recorded but do not count as mathematical attempts. Whole-number grouping is enabled only by the question's explicit contract. The final two time questions use exact choice content; no clock parser was introduced. Existing E5 grading remains on its original path.
- The existing settings panel explains the configured mix, possible fallback and M6 difficulty policy in Dutch. There is no second difficulty slider.

## Exact placement

Every proposed object was compatible. Several variants share a position because they are alternative content.

| Question ID | Level | Actual slot | Difficulty |
| --- | --- | --- | --- |
| RP-M6-BR-001 | LVL-0002 | shieldWall-slot-3 | 1 |
| RP-M6-BR-002 | LVL-0001 | steen-slot-3 | 1 |
| RP-M6-BR-003 | LVL-0002 | shieldWall-slot-3 | 2 |
| RP-M6-BR-004 | LVL-0003 | mooringRope-slot-3 | 2 |
| RP-M6-BR-005 | LVL-0003 | harborMap-slot-3 | 3 |
| RP-M6-BR-006 | LVL-0002 | fireBowl-slot-2 | 3 |
| RP-M6-OP-001 | LVL-0001 | zon-slot-1 | 1 |
| RP-M6-OP-002 | LVL-0003 | harborMap-slot-1 | 1 |
| RP-M6-OP-003 | LVL-0002 | shieldWall-slot-2 | 2 |
| RP-M6-OP-004 | LVL-0002 | shipModel-slot-1 | 2 |
| RP-M6-OP-005 | LVL-0002 | mapTable-slot-3 | 3 |
| RP-M6-OP-006 | LVL-0001 | steen-slot-1 | 3 |
| RP-M6-GE-001 | LVL-0001 | zon-slot-2 | 1 |
| RP-M6-GE-002 | LVL-0001 | wind-slot-3 (Freya) | 1 |
| RP-M6-GE-003 | LVL-0002 | shipModel-slot-2 | 2 |
| RP-M6-GE-004 | LVL-0003 | harborMap-slot-2 | 2 |
| RP-M6-GE-005 | LVL-0002 | mapTable-slot-1 | 3 |
| RP-M6-GE-006 | LVL-0002 | shipModel-slot-2 | 3 |
| RP-M6-TI-001 | LVL-0003 | shipCompass-slot-1 | 1 |
| RP-M6-TI-002 | LVL-0002 | fireBowl-slot-4 | 1 |
| RP-M6-TI-003 | LVL-0003 | harborMap-slot-4 | 2 |
| RP-M6-TI-004 | LVL-0002 | shieldWall-slot-4 | 2 |
| RP-M6-TI-005 | LVL-0003 | shipCompass-slot-1 | 3 |
| RP-M6-TI-006 | LVL-0003 | harborMap-slot-4 | 3 |

## Reporting and historical compatibility

New sessions have schema version **2**, under the existing `atlas-session-report-v1` and `atlas-session-current-v1` storage keys. Retention remains three unchecked reports with no overwriting and no backend.

Session metadata stores the configured M6 percentage. Each shown question records requested/delivered learning level and difficulty, content version, exact prompt, learning objective/report label, correct-answer display, timestamped raw/interpreted answers and timestamped snapshots of help actually shown. Full explanation is recorded when opened after the third valid incorrect answer, including when no correct answer follows. Older reports containing direct explanation remain readable without rewriting. Support still visible across the ten-minute session boundary is recorded in the new session before grading.

The main outcomes are `direct`, `afterMinnie`, `afterMoose`, `afterExplanation`, `incomplete`. A first valid correct attempt is direct only without prior help. Legacy `assisted` remains readable; an unhinted retry uses `afterRetry` rather than claiming direct success. Voortgang shows actual counts, exact report-label groupings and expandable question evidence.

Completed v1 sessions are not rewritten or enriched from the current question bank. A recovered active v1 session is archived with its original version/evidence before a new session starts. Missing fields display **niet geregistreerd**. Explanation shown never means understood.

Structured money adds optional `rawFields: {euros, cents}` and `normalizedDisplay` to the existing `answerHistory` entry, alongside `raw` (`euros|cents`), `interpreted` integer cents, `unit: "cents"`, validity, correctness and timestamp. Voortgang shows the entered fields, normalized amount and interpreted cents. This additive v2 extension needs no migration or history rewrite. `afterMoose` still means completion after the second hint, before full explanation. Rendering Moose as the explanation presenter adds no hint/attempt event; completion after the full explanation remains `afterExplanation`.

## Files changed for this pilot

| Area | Files |
| --- | --- |
| Approved source/import | `scripts/content/runenpoort-m6-approved.md`, `scripts/content/runenpoort-m6-visuals.json`, `scripts/runenpoort-m6-content.cjs`, `scripts/import-runenpoort-m6.cjs` |
| Level alternatives | `Levels/LVL-0001/level.js`, `Levels/LVL-0002/level.js`, `Levels/LVL-0003/level.js` |
| Runtime | `src/learning-levels.js`, `src/challenge-support.js`, `src/app.js`, `src/session-report.js`, `src/styles.css` |
| Loading/cache/validation | `index.html`, `service-worker.js`, `scripts/validate-levels.js` |
| New contract tests | `tests/runenpoort-m6.spec.js`, `tests/helpers/pilot-e5-baseline.cjs` |
| Existing test integration | `tests/learning-levels.spec.js`, `tests/runenpoort-hints.spec.js`, `tests/batch1-hints.spec.js`, `tests/batch2-hints.spec.js`, `tests/spelling-grading.spec.js`, `tests/progression-copy.spec.js`, `tests/challenge-active.spec.js`, `tests/npc-challenges.spec.js` |
| Expected app fingerprint only | `tests/fixtures/runenpoort-hints-baseline.json`, `tests/fixtures/batch1-hints-baseline.json`, `tests/fixtures/batch2-hints-baseline.json` |
| Documentation | `Docs/LEVEL_CONTRACT.md`, `Docs/ATLAS_LEARNING_CONTENT_RULES.md`, `Docs/DEV_TOOLS.md`, `Docs/learning-level-framework.md`, this report |

The working tree already contained framework work and unrelated level/world edits. Those were preserved. Existing E5 regression checks remove only the exact 24 approved insertions before comparing original baselines. Historical world/level fingerprints were not rebaselined. After removing the insertions, all three Runenpoort level sources match their saved pre-pilot versions (normalizing line endings).

## Original pilot QA (before the automatic-flow correction)

Run against the existing asset server at `http://127.0.0.1:4173`, with `ATLAS_EDITOR_URL` set accordingly and one Playwright worker.

- `node scripts/validate-levels.js`: **passed**, 35 production levels and one developer level. Includes exact IDs, content, placements, support and visual-stage checks.
- `tests/runenpoort-m6.spec.js`: **18/18 passed** on desktop. Includes all 24 runtime help/completion flows, exact approved content, all 816 unchanged E5 hint pairs, selection/fallback, grading, disclosure, direct explanation, report outcomes, reopening, inactivity and v1 recovery.
- `tests/session-report.spec.js`: **9/9 passed**. `tests/spelling-grading.spec.js`: **2/2 passed**. `tests/progression-copy.spec.js`: **6/6 passed**.
- `tests/challenge-active.spec.js`: **11/11 passed across final runs**. The final combined run passed 10/11; the remaining menu test passed after isolating draft I/O. Its original persistent-draft leak was removed. The separate Apply test still verifies real disk persistence with restoration.
- Both iPad WebKit orientations, five representative standard/NPC visual cases plus settings each: **12/12 passed**. Checks include viewport bounds, internal scrolling, no horizontal overflow, touch control sizing and correct completion. Screenshots were visually reviewed.
- Earlier exhaustive E5 browser flows covered all 88 Runenpoort, 392 batch-one and 240 batch-two variants successfully. Learning-level checks passed 18/19; service-worker coverage passed. Seven broader historical fingerprint assertions remain red because pre-existing local level/world edits differ from their old fixtures. The exact E5 content/hint checks remain intact.
- `tests/npc-challenges.spec.js`: **15/19 passed**. The four failures were reproduced using the saved pre-pilot app, styles, selection/session modules and level files: two navigation tests have the existing templeGate hotspot intercepting Freya's center click; two appearance tests fail their empty-console assertion on existing `ERR_FILE_NOT_FOUND` asset requests. Their geometry/assets were preserved and assertions were not weakened.
- JavaScript syntax checks and `git diff --check`: **passed**.

Reproduce the main checks:

```powershell
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
node scripts/validate-levels.js
npx.cmd playwright test tests/runenpoort-m6.spec.js tests/session-report.spec.js tests/spelling-grading.spec.js tests/challenge-active.spec.js --project=desktop-chromium --workers=1
npx.cmd playwright test tests/runenpoort-m6.spec.js tests/learning-levels.spec.js --project=ipad-landscape --project=ipad-portrait --workers=1 --grep 'touch layout|settings slider'
```

## Limitations and conflicts

The bank deliberately covers 20/44 Runenpoort positions and no positions outside those three levels. Most positions do not contain all three M6 difficulties. Consequently requested mix/difficulty percentages can differ substantially from delivered counts, even at 100% M6; the reporter exposes this instead of manufacturing questions or requests. The 50/35/15 figures describe repeated selection targets, not a guaranteed short-session distribution.

The broad regression suite is **not entirely green**: seven historical source-fingerprint checks and four NPC checks remain as described above. As a concrete fingerprint example, LVL-0002 already had normalized SHA-256 `7c09bb9776a1c363642f014eaa2303a731579c0042ca7d3aed2fba90a807bb19` before this task, whereas the historical fixture expects `de7a454baf64a6373a3b129be507f2f99867181a1a689ee3905328f23baed73f`. Removing only the pilot insertions reproduces the pre-task hash. Local screenshots and comparison evidence are retained in ignored `qa-screenshots/runenpoort-m6-20261003/`.

There is **no unresolved educational-content or placement conflict**. All 24 approved questions are imported verbatim. Physical iPad Safari and installed-PWA behavior were not tested. The renderer/GPU acceptance gate does not apply: this change adds DOM challenge UI and does not change renderer presets, resource preparation, assets or GPU lifecycle.

## Automatic-help correction — 3 October 2026

Removed the M6 `Leg uit` button, its delegated `explain-question` action and `explainCurrentQuestion` gameplay handler. The remaining authored-support helper derives its stage solely from valid wrong-answer counts and records a stage only when advancing. A fourth wrong answer does not duplicate the already shown explanation event.

Minnie and Moose now use `setGuideMessage` → `renderAdventureTeamBar` for both standard and NPC M6 questions. The duplicate inline M6 hint is removed. The existing companion speaker label and active portrait identify Minnie/Moose; NPC identity stays in its original card. Scoped M6 CSS reserves space for this bar, also in a reduced keyboard viewport. Long visuals retain internal scrolling and reachable answer controls.

Closing/reopening preserves the selected variant, shuffled choices, per-challenge failure counter and help history without another draw or event. The saved companion baseline is also restored so the next question clears the old hint correctly. Correct answers at stages question/Minnie/Moose complete without opening full explanation; after three valid wrong answers, explanation alone remains incomplete until a correct answer. The report module, schema and old direct-help history are unchanged.

The correction changes `src/app.js`, narrowly scoped styles, the service-worker cache version, `tests/runenpoort-m6.spec.js`, the expected app-source hash in three existing hint fixtures, an importer comment and the current technical documents. Byte-hash comparison confirms no changes to the three pilot level files, educational bundle, visual transcription, `challenge-support.js` answer contracts/renderers, E5 resolver, learning-level/difficulty planner, session-report module or world configuration.

The revised suite covers all 24 questions, each completed directly, after Minnie, after Moose and after explanation. It checks exact companion text and speaker, stage disclosure, stable variants/choice order, reopening at every stage, no additional selection/history entries, invalid-input handling, incomplete outcomes, historical direct-help reports and inactivity. Touch checks explicitly include RP-M6-OP-003, all four visual families and Freya, with both iPad orientations and reduced keyboard viewports. Local screenshots and before/after evidence are in ignored `qa-screenshots/m6-helpflow-20261003/`.

Correction QA results, against the existing local asset server with one worker per run:

| Check | Result |
| --- | --- |
| Desktop: revised M6 suite plus session-report, spelling and service-worker ownership | 56/56 passed before splitting the long input test; all three replacement input cases also passed. Final distinct coverage: 58 passing checks across these runs. |
| Both iPad WebKit orientations: complete M6 suite | 86 checks passed; the single test containing twelve input rounds exceeded the unchanged 30-second limit in each orientation. It was split into three tests, one per support stage, retaining all input values and assertions. All six replacement iPad cases passed in 17–18 seconds each. Final distinct coverage: 92 passing checks across these runs. |
| All 24 questions, four completion outcomes each | Passed on desktop, iPad landscape and iPad portrait. |
| Targeted OP-003/Freya touch and reduced-keyboard checks | 12/12 passed in both iPad orientations; screenshots visually inspected. |
| Existing Runenpoort E5 hints and learning-level framework | 22/25 passed. All 88 E5 runtime variants passed; only the three previously documented LVL-0002/world-config fingerprint assertions remain red. No assertion was loosened or content rebaselined to conceal them. |
| Content, source preservation and syntax | Level validation passed for 35 production levels plus one developer level; unchanged-content byte hashes, JavaScript syntax and diff whitespace checks passed. |

The tested split-input candidate was copied byte-for-byte into `tests/runenpoort-m6.spec.js` and the temporary candidate removed. No timeout was extended. The final file defines 46 tests per browser project. Production code did not change between the complete runs and the split-input verification.

Reproduce the correction checks:

```powershell
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
npx.cmd playwright test tests/runenpoort-m6.spec.js tests/session-report.spec.js tests/spelling-grading.spec.js tests/service-worker-ownership.spec.js --project=desktop-chromium --workers=1
npx.cmd playwright test tests/runenpoort-m6.spec.js --project=ipad-landscape --project=ipad-portrait --workers=1
npx.cmd playwright test tests/runenpoort-hints.spec.js tests/learning-levels.spec.js --project=desktop-chromium --workers=1
```

Physical iPad Safari/installed-PWA testing remains unverified; the reduced keyboard viewport is simulated. The documented broader NPC/fingerprint problems remain outside this correction. No renderer/resource or world-geometry changes were made.

## Moose presenter and structured money correction — 3 October 2026

The existing support stage is still the sole authority for help. `renderChallenge` derives a temporary Moose presenter from `guideEntries` only for an M6 full-explanation state. It reuses the standard/NPC header layout and the existing Moose asset/name, keeps the original challenge title as context, and passes **Moose legt het uit** to the existing explanation renderer. No `challengeCharacter`, NPC, level, question or visual-frame data is modified. No new explanation route exists. The first and second hints still use the existing bottom companion presentation and the exact authored hint/frame.

During full explanation, the existing `renderScene({hideTeamBar: true})` path omits the companion bar. A scoped explanation-layer rule reclaims the bottom strip, including the reduced keyboard viewport. The full explanation remains inside the existing scrolling challenge card with reachable answer controls. Leaving the explanation naturally restores normal rendering. Reopening derives Moose and the hidden bar from the saved stage without duplicate reporting.

`usesStructuredMoney` restricts the two-field control/parser to `learningLevel: "M6"`, `answerMode: "open"`, `answerSpec.type: "euro"`. Numeric input modes, a two-character cent limit and input/paste guards avoid punctuation entry. Parser validation also rejects malformed states that bypass DOM controls. It never derives a value from the expected answer. Both blank is invalid; one blank part means zero only when the other is a valid digit string. `5` cents remains five cents, while display normalization pads it to `05`. Other euro/text grading remains unchanged. The immutable source's historical allowed forms are still validated independently, without requiring students to type them.

The existing suspended-question snapshot additionally retains the money draft. Redraw/reopening keeps both raw fields; advancing to another question clears them. Selected variants, choice order, wrong counts, planner draws and help histories keep their prior behavior. `afterMoose`/`afterExplanation` semantics and actual-show explanation logging are unchanged. The additive report fields are documented above; historical raw-only money and direct-help reports remain readable without rewriting.

Files changed for this correction only:

- Runtime: `src/app.js`, `src/challenge-support.js`, `src/session-report.js`, `src/styles.css`, `service-worker.js` (cache v243).
- Tests: `tests/runenpoort-m6.spec.js`, `tests/progression-copy.spec.js`; only the intentional app-source fingerprint in `tests/fixtures/{runenpoort,batch1,batch2}-hints-baseline.json`.
- Contracts: `Docs/LEVEL_CONTRACT.md`, `Docs/ATLAS_LEARNING_CONTENT_RULES.md`, `Docs/DEV_TOOLS.md`, this report.

The pre-correction byte fingerprints and source copies, browser logs and screenshots are retained in ignored `qa-screenshots/m6-moose-money-20261003/`. The approved source bundle, all 24 variants/placements, stage transcription, E5 resolver, planner/policy, level/world files and renderer code are unchanged. The prior broader fingerprint/NPC issues remain outside this work.

Correction QA uses the existing local asset server and one browser worker:

- Desktop combined run: **70/71 passed**, including all 24 questions at all four completion outcomes, progression, session reports, spelling and service-worker ownership. Freya's reduced-keyboard test observed a transient loading overlay between its visibility poll and separate geometry snapshot. The helper now asserts visibility and all unchanged geometry checks from the same snapshot; no assertion or timeout was weakened.
- Final desktop money/layout/history rerun: **20/20 passed**, including that Freya check, all six expected amounts, invalid/non-attempts at each hint stage, single-cent entry, reopened drafts, historical raw-only euro reports and presenter screenshots. This also verifies a final parser guard against null/missing fields. Together the desktop runs cover **71 distinct passing checks**.
- Complete final M6 suite in both iPad WebKit orientations: **106/106 passed** (53 landscape + 53 portrait), including all 24 questions at all four outcomes, exact progressive hints/visuals, no direct explanation action, Moose presentation, hidden companion bar, reopening, all six money amounts, touch input, raw/canonical report evidence, historical compatibility and reduced keyboard viewports. Standard OP-003 and NPC Freya screenshots were reviewed at both presenter and answer-control scroll positions on desktop and both iPad orientations. No horizontal overflow or inaccessible answer controls was found in the tested layouts.
- Existing learning-level contract unit tests: **4/4 passed** for the canonical preference, balanced requests, fallback and slot validation. The M6 suite separately verifies the unchanged 50/35/15 policy and all 24 variants' availability.
- `node scripts/validate-levels.js`: **passed** for 35 production levels and one developer level. All 24 IDs, content and stage data match the approved source. All 816 E5 hint pairs pass. Direct source comparison confirms the legacy grading expression and text-answer parser are unchanged; **270 content/planner/hint/renderer files** retain their pre-correction byte hashes.
- JavaScript syntax and `git diff --check`: **passed**. The final scope audit contains exactly the 14 intended files listed above relative to task start; no approved educational content or unrelated world/renderer source changed.

Reproduce this correction's checks:

```powershell
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
node scripts/validate-levels.js
npx.cmd playwright test tests/runenpoort-m6.spec.js tests/session-report.spec.js tests/spelling-grading.spec.js tests/progression-copy.spec.js tests/service-worker-ownership.spec.js --project=desktop-chromium --workers=1
npx.cmd playwright test tests/runenpoort-m6.spec.js --project=ipad-landscape --project=ipad-portrait --workers=1
npx.cmd playwright test tests/learning-levels.spec.js --project=desktop-chromium --workers=1 --grep 'canonical preference|balanced decks|mixed, single-level|content validator'
```

The broader historical fingerprint/NPC failures documented above were not modified or rebaselined. Physical iPad Safari, its native keyboard and installed-PWA behavior remain unverified; these are WebKit device emulations and simulated reduced keyboard viewports. This DOM correction does not trigger the renderer/resource QA gate.

## Shared challenge workspace correction — 4 October 2026

This section and the current canonical contracts supersede the earlier presentation sections. The original approved source bundle and level variants are unchanged.

`renderChallenge` now selects a presentation mode from `learningLevels.resolveLevel(currentQuestion)`. The same selected object, answer handler, hint thresholds, question index, failure counters, planner and session reporter continue to own gameplay. Missing learning level and delivered E5 fallback use E5 presentation even at 100% requested M6.

- E5 standard and NPC questions share a compact original presenter/title, prompt, answer zone and completion controls. Minnie/Moose appear once in the existing companion bar; the former NPC inline copy is gone. Third-error explanation and `Samen afronden` retain their existing function. Reopening now preserves E5 selected variants and drafts through the same suspended-question snapshot already used by M6. Blank legacy numeric input is rejected before coercion to zero; valid-answer comparators and the E5 resolver are unchanged.
- M6 hides the companion bar for the entire open question. One help section shows Minnie, then Moose, then **Moose legt het uit**, each with the exact authored stage. The original presenter/title remains in the compact context header. No main-header identity substitution, direct explanation action, duplicate companion event or automatic M6 completion is introduced.
- A modest gold frame, dark green background, edge vignette and compact dimensions reuse existing portrait assets. Crop overrides are presentation-only; NPC definitions, scene art and companion-bar artwork remain unchanged. Locked, question and completion surfaces use the shared compact portrait treatment.
- `challenge-explanation-layouts.js` declares only step/group indices. Calculation groups and receipt data render once with the exact corresponding explanation text. Fraction strips and timelines use one compact shared visual at a declared step: splitting these geometries could obscure the approved part/whole or time relationship. Unmapped future content falls back to a complete shared visual rather than invented teaching text. All approved sentences and visual groups are retained, in their authored order.
- The optional M6 Kladblok is a free-text sibling pane, stacked when the window is narrow. Warm lined paper is rendered with CSS without importing the reference image. Nonempty clearing asks for confirmation. Notes, open/closed state, the ordinary answer draft and both euro/cent fields survive help, redraw and same-question reopening. Advancing gives the next question an empty workspace. Notes are memory-only and disappear with a new run, menu/restart, reload or fresh level visit; report recovery does not restore a playable run. Notes never enter local storage, editor drafts or Voortgang and never change `direct` or help histories.
- The question remains available above an internally scrolling help region. The answer zone remains separate, with touch-sized controls. Money entry retains its exact digit validation/canonical-cent semantics and now has balanced widths and permanent euro/cent labels. No new report schema, retention rule, grading contract, selection rule or educational content is introduced.

The pre-change file fingerprints/source snapshots and all test logs/screenshots are in ignored `qa-screenshots/challenge-workspace-20261004/`. Exact content and declarative visual checks cover all 24 variants, while the existing 816-pair E5 hint baseline remains intact. Focused tests additionally cover Freya's real `24 : 6` E5 fallback followed by her runenstickers M6 question, Eivar, every reopen stage, note privacy/clearing, level transitions, internal scrolling and a reduced viewport through the actual keyboard-layout handler.

Changed runtime files: `src/app.js`, `src/styles.css`, `src/challenge-support.js`, new `src/challenge-explanation-layouts.js`, `index.html`, `service-worker.js` (v244). Tests: `tests/runenpoort-m6.spec.js`, new `tests/challenge-workspace.spec.js`, compact identity expectations in `tests/npc-challenges.spec.js`, and the visible-hint expectation in `tests/learning-levels.spec.js`; intentional app-source fingerprints only in the three hint fixtures. Contracts: this document, `LEVEL_CONTRACT.md`, `ATLAS_LEARNING_CONTENT_RULES.md`, `DEV_TOOLS.md`. The session-report module and schemas are unchanged.

Reproduce the focused matrix:

```powershell
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
npx.cmd playwright test tests/challenge-workspace.spec.js tests/runenpoort-m6.spec.js --project=desktop-chromium --project=ipad-landscape --project=ipad-portrait --workers=1
```

Workspace QA (local asset server, one browser worker):

- The full matrix ran **198 checks**: all 159 existing M6 checks passed, and 37/39 new workspace checks passed. The two failures assumed that short fraction/time explanations must overflow in portrait even when they fit. The replacement checks require the final step to be fully reachable with End, the first step with Home, and actual internal scrolling for the long OP-003 explanation. The final visual/layout rerun passed **15/15** across desktop and both iPad orientations, including all four visual types. No content or visibility assertion was removed to conceal a layout failure.
- Final E5/fallback/invalid-money checks passed **20/21**. The additional Eivar keyboard check exposed an E5 explanation squeezed by the answer footer in portrait. Scoped keyboard spacing and a shared row for open-answer controls plus `Samen afronden` reclaim space without shrinking the teaching text or changing companion artwork. Screenshot inspection led to requiring **100%** visibility of the explanation, rather than accepting a visible fragment. The final stronger keyboard check passed **3/3**. Together these runs cover all **198 distinct matrix checks** successfully, plus the stronger final focus checks; this is not a claim of one uninterrupted 198/198 run.
- All 24 question IDs, authored texts, four-stage visuals, choices, help histories and four completion outcomes are covered, including reopening at every stage. All six money answers, invalid/non-attempts, raw/interpreted evidence, old reports, the 50/35/15 policy and the unchanged 816 E5 hint pairs pass. Notes-only completion stays `direct`; notes do not appear in session/local storage or reports.
- `node scripts/validate-levels.js` passes for **35 production levels and one developer level**. JavaScript syntax and normalized `git diff --check` pass. The task-start audit confirms **66 protected content/level/planner/hint/report sources** are byte-identical and money/text parsers and valid legacy grading comparisons are unchanged. The only legacy grading guard added rejects blank input before JavaScript can coerce it to zero.

Representative screenshots were inspected, including the full set of question/Minnie/Moose/explanation stages with notes open and closed. The answer zone remains reachable; no horizontal overflow was found in the tested layouts.

| Evidence | Screenshot |
| --- | --- |
| Desktop, original Freya context and integrated money explanation | [Moose and money with notes](../qa-screenshots/challenge-workspace-20261004/desktop-chromium-RP-M6-GE-002-explanation-notes.png) |
| Desktop, E5 NPC explanation and existing companion bar | [Freya E5](../qa-screenshots/challenge-workspace-20261004/desktop-chromium-e5-freya-explanation.png) |
| iPad landscape, exact Minnie hint and progressive receipt | [Minnie with notes](../qa-screenshots/challenge-workspace-20261004/ipad-landscape-RP-M6-GE-002-minnie-notes.png) |
| iPad portrait, long explanation, fixed answer zone and stacked notes | [OP-003 explanation](../qa-screenshots/challenge-workspace-20261004/ipad-portrait-RP-M6-OP-003-explanation-notes.png) |
| iPad portrait, reduced keyboard viewport and complete E5 explanation | [Eivar keyboard layout](../qa-screenshots/challenge-workspace-20261004/ipad-portrait-e5-eivar-keyboard.png) |

Physical iPad Safari, the native on-screen keyboard and installed-PWA upgrade/resume remain **unverified**. The tests use WebKit device emulation and a reduced `visualViewport` passed through the real keyboard-layout handler. Playwright blocks service workers; cache ownership has its separate existing test. Some screenshots retain the existing WebGPU-unavailable background notice from the DOM test environment. This task changes no renderer/resource behavior and makes no GPU/device acceptance claim. The known coverage/difficulty fallbacks remain unchanged, and fraction strips/timelines retain their complete shared geometry rather than a fabricated per-step reconstruction.

The final existing-regression run passed **86/97** in 11 minutes:

| Suite | Result |
| --- | --- |
| Runenpoort + batch-one + batch-two E5 hints | **35/41**; all 31 runtime flows covering 720 variants pass; six historical content/source fingerprint failures remain |
| Learning-level framework | **18/19**; settings, persistence, fallback and mixed runtime pass; one historical source fingerprint failure remains |
| NPC challenges | **15/19**; the same four documented failures remain |
| Session reports | **9/9** |
| Spelling grading | **2/2** |
| Progression/copy | **6/6** |
| Service-worker cache ownership | **1/1** |

The seven fingerprint failures still refer to pre-existing level/world differences, including LVL-0002 and `world-config.js`; those source files match this task's starting hashes. Only the deliberately changed app-source fingerprint was refreshed in the three hint fixtures. The two NPC appearance checks still fail their empty-console assertion on `ERR_FILE_NOT_FOUND`; the two real-click tests still encounter the existing `templeGate` hotspot intercepting Freya. No assertions, hitboxes, assets or historical world/content baselines were changed to conceal them. This reproduces the previously documented problems and does **not** claim the broad suite is entirely green.

Logs are `full.log`, `final-focus.log`, `layout-final.log`, `e5-keyboard-final.log` and `regression.log` in the evidence directory. The final scope audit contains **17 intended files** (six runtime/loading files, four test files, three app-fingerprint fixtures and four documents), relative to the task-start working tree. Pre-existing local edits and drafts remain intact.

```powershell
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
npx.cmd playwright test tests/session-report.spec.js tests/spelling-grading.spec.js tests/progression-copy.spec.js tests/service-worker-ownership.spec.js tests/learning-levels.spec.js tests/runenpoort-hints.spec.js tests/batch1-hints.spec.js tests/batch2-hints.spec.js tests/npc-challenges.spec.js --project=desktop-chromium --workers=1
```

## Facing notebook refinement — 4 October 2026

This later A/B presentation supersedes the separate empty scratchpad pane described above. M6 opens at content height. Unlocked help or private notes expands the same workspace horizontally: original presenter/question/answers on the left, a ruled-paper notebook on the right. Challenge and guide portraits share dimensions. The notebook presents exact Minnie/Moose/full-explanation content and the same progressive visuals, then can turn to editable notes and back. Only the selected face is rendered. First/second/third valid errors select the newly unlocked help face without deleting notes; no button can unlock later help. Animation honors reduced motion.

The existing scratchpad boolean selects editing; the existing support stage selects help. Both remain in the existing suspended-question snapshot. Flipping and reopening do not record learning events, reset drafts, redraw variants or reshuffle answers. Approved source, visual-stage data, E5 hints, grading, planning, reports and level/world content are unchanged. Paper-only ink styling preserves visual geometry. A layout helper snaps explanation text following intrinsic-height visuals to the next paper rule without changing the text or stage data.

The existing visual-viewport handler bounds the workspace above the keyboard. In M6 it now retains that compact geometry during input blur until the viewport expands, preventing controls from moving between pointer down and click. Question and help areas scroll independently; answer controls stay available. The same layout remains horizontal on iPad portrait/landscape and Chromebook-sized viewports, with a stacked fallback below 700px. Multiple-choice answers retain turquoise styling and two columns; `Controleer` stays gold.

Runtime changes: `src/app.js`, `src/styles.css`, cache v246 in `service-worker.js`. Coverage: `tests/challenge-workspace.spec.js`, the strengthened paper/presenter assertions in `tests/runenpoort-m6.spec.js`, and only the intentional app-source digest in the three hint-baseline fixtures. Current contracts are updated in `LEVEL_CONTRACT.md`, `ATLAS_LEARNING_CONTENT_RULES.md` and `DEV_TOOLS.md`. Task-start fingerprints, screenshots and logs are in ignored `qa-screenshots/m6-notebook-20261004/`. No educational source bundle was edited.

Physical iPad keyboards and installed-PWA cache upgrades are not certified by emulation. The previously documented broad fingerprint/NPC issues remain outside this correction; their assertions and world content are retained.

Final QA for this refinement:

- **53 distinct M6 contract checks passed** on desktop across the main run and targeted rerun: exact 24 IDs/content/stages, all four completion outcomes per question, stable reopening, six canonical money values, invalid input, selection/fallback and historical reports. One OP-003 run timed out at `Start avontuur`, before opening the question; its complete targeted rerun passed.
- **54 distinct workspace checks passed** (18 per desktop/iPad landscape/iPad portrait), accumulated across the main matrix and focused final reruns. The final tablet visual/keyboard/compact-layout rerun passed **18/18**; the final two-direction motion and multiple-choice keyboard rerun passed **6/6**. These totals describe coverage across runs, not one uninterrupted clean matrix.
- The initial QA exposed a focus-blur layout jump, excessive height in the compact time question, and perspective expansion during the page turn. Those were corrected. The motion regression checks a paused intermediate frame in both directions, not only the flat end state. Text-rule alignment is checked after the page becomes flat. The reduced-motion assertion identifies the notebook animation specifically instead of mistaking unrelated existing 0.01ms CSS transitions for it.
- The existing learning/E5 hint/session/grading/cache regressions passed **34/37**. The three retained failures are historical fingerprints: `learning-levels.spec.js` at `Levels/LVL-0002/level.js`, `runenpoort-hints.spec.js` non-hint LVL-0002 data, and its source check at `Levels/world-config.js`. All 88 Runenpoort E5 runtime flows passed; session reports passed 9/9, spelling/comparison 2/2 and cache ownership 1/1. No level/world digest or failing assertion was updated. Only the intentional app digest changed in three fixtures.
- `npm run validate:levels` passed **35 production + 1 developer levels**. Syntax and whitespace checks passed. The task-start audit checked **2,058 existing files**, found only the **12 intended changed files** listed above, and confirmed unchanged grading, educational/visual source, planners, hint resolver, report module, levels and world configuration.

Evidence: `desktop-final.log`, `final-fixes.log`, `tablet-final.log`, `choices-motion-final.log`, `regression-final.log`, `validate.log`, `scope-final.json` and the A/B/keyboard screenshots under `qa-screenshots/m6-notebook-20261004/`. Earlier failing logs are retained there for diagnosis. The emulated WebKit background can display its existing WebGPU-unavailable banner; renderer behavior was not changed or hidden.


## Notebook typography and rule editing — 4 October 2026

The follow-up polish uses a small shared M6 type scale (24px titles/bare sums, 20px story questions/input text, 16px actions and 14px metadata), including when the software keyboard reduces the viewport. Help and private notes use the locally supplied Patrick Hand Regular at 22px on the existing 28px paper rules. This separate-letter handwriting face is distributed with its SIL OFL license in assets/fonts/patrick-hand; it needs no external font request or installed device font. Font loading retriggers rule alignment. Approved text, visual stages and teaching content remain byte-for-byte unchanged.

Help and editing share identical header, paper and toolbar geometry. Kladblok and both return actions use the same fixed 158×44px control. Wis kladwerk is bottom-right on the notes face; its existing confirmation overlays that corner, preserving the paper dimensions. The redundant saved-work message and Eigen kladwerk footer are removed; the latter remains the accessible name of the notes field. E5 ordinary and NPC multiple-choice buttons are again turquoise 2×2, with stable choice order and unchanged grading.

The editor remains the existing native textarea, not a second note/persistence engine. A pointer tap below the last written visual row inserts blank newlines up to that row and places the cursor at its left edge. A temporary text measurement accounts for soft wrapping. Existing rows retain native editing and selection; scroll/drag gestures do not add lines. The plain scratchpad.text string remains in the suspended-question snapshot. An explicit initial HTML newline prevents the textarea parser from consuming meaningful leading blank rows on reopening. Flipping, typing and clearing still emit no learning/report events. Help stages, question selection, money contracts and report semantics are unchanged.

Files: src/app.js, src/styles.css, service-worker.js (cache v247), assets/fonts/patrick-hand/{PatrickHand-Regular.ttf,OFL.txt,README.md}, tests/challenge-workspace.spec.js, Docs/LEVEL_CONTRACT.md, this document, and only the intentional app-source digest in the three existing hint-baseline fixtures. No level/world data, renderer, educational source, hint resolver, planner or report module changed in this follow-up. Evidence is in qa-screenshots/notebook-polish-20261004/.


Final QA for this polish:

- **80/80 desktop checks passed in one final run**: 27 workspace checks plus all 53 existing M6 contract checks. This includes every approved ID and its complete help/outcome/reopening flow, exact authored copy, all six euro amounts, invalid input, visual stages, historical reports and unchanged E5 hint content/selection.
- **54 distinct current workspace checks passed across the two iPad orientations**, combining the initial matrix with the final targeted run. The latter passed **18/18**, including all six separate compact-stage cases per device, font/paper/button geometry and both keyboard cases. The initial matrix was 43/46; it exposed two browser-dependent font-name assertions and a combined three-stage test reaching its 30-second limit at completion. The font assertion now verifies the actual loaded FontFace objects. The combined test is separated by stage, preserving its content/state/layout assertions and additionally verifying completion after each help stage. The normal timeout is unchanged. Existing cross-stage scratchpad persistence coverage remains intact. This is accumulated coverage, not a claim that the initial matrix was entirely green.
- New coverage checks clicking/tapping lower blank rules and returning to earlier blank rules, left-edge insertion, soft wrapping, scrolling/dragging, multiline insertion/selection, leading-newline preservation on reopen, identical help/edit paper bounds, aligned equal toggle controls, clear confirmation without resizing, local font loading and E5 ordinary/NPC turquoise 2×2 choices. Screenshots were inspected on desktop and both tablet orientations; Chromebook-sized and reduced keyboard viewports also pass.
- **3/3 independent regressions passed** for cache ownership, spelling and ordinary numeric/string grading. Level validation passed **35 production + 1 developer levels**; syntax and whitespace checks passed. The task-start audit checks **2,058 existing files**, allowing only the nine intended existing-file changes plus three new font files, and verifies unchanged gameplay/grading/help code and protected content/planner/report/world/renderer sources.
- Early focused runs also exposed header-height alignment and textarea leading-newline loss; both were corrected before the final runs. All earlier logs remain available. The previously documented broader fingerprint/NPC failures remain untouched and were not rerun as part of this presentation-only polish. Physical iPad software-keyboard behavior and installed-PWA upgrades remain outside what desktop/WebKit emulation can certify.

Evidence: desktop-final.log, tablet.log, tablet-final.log, static-regression.log, validate.log, scope.json and the screenshots under qa-screenshots/notebook-polish-20261004/. preview-minnie.png and preview-notes.png are direct element screenshots for reviewing the changed panel; full-page screenshots retain the surrounding test-browser environment.

## Final challenge consistency pass — 4 October 2026

This presentation correction follows the final manual test round. It does not change the M6/E5 presentation model, approved source bundle, content, help sequence, notes behavior, grading, report semantics or level data.

- M6 help headings now show only Minnie or Moose with the existing portrait; the full explanation still says **Moose legt het uit**. No visible Tip 1 / Tip 2 labels and no direct explanation route.
- One shared `workspaceFooter` grid spans the workspace columns. Its left answer controls and right notebook toolbar align at their bottom edge; primary and secondary actions share 52px height, radius, padding and type scale. The paper scrolls independently, and help/edit paper dimensions and the existing clear-confirmation behavior are preserved.
- The structured euro/cent group is flat: no outer border or background, compact separately outlined fields, permanent small labels, fixed currency sign and comma. `renderStructuredMoneyInput`, parsing, canonical cents, drafts and raw/interpreted history are unchanged. This is CSS only.
- Paper supplies the outer surface for fraction, calculation and timeline visuals. Calculation groups retain their guiding rule; known calculation nodes no longer have a separate white box. Unknown nodes and arrows remain identifiable. The receipt and its existing card styling are unchanged. No visual text, calculations, groups or disclosure data change.
- `renderCorrect` now uses the shared `renderChallenge` shell. A WeakMap keyed by the existing selected question retains only the displayed rectangle and compact-header mode. Ordinary and NPC E5/M6 completion preserves card bounds, original identity/title/progress and close-button position, including same-question reopening. Only a shrinking viewport clamps those bounds. The next question returns to normal layout. The result uses an optional internal fade and scrollable content rather than an independently anchored success card.
- Correct answers before full explanation retain **✓ Goed zo!**. After full explanation or **Samen afronden**, the heading is **Samen opgelost**, followed by the existing canonical answer. No authored explanation is regenerated for completion. Outcomes remain unchanged, including the distinction between `afterMoose`, `afterExplanation` and legacy E5 `assisted`.
- E5 clears the stale companion message with the existing `setGuideMessage` when entering final help. The first two hints, existing final explanation/assistance and next-question bar behavior are unchanged.

Changed files in this pass: `src/app.js`, `src/styles.css`, `service-worker.js` (cache v248), `tests/challenge-consistency.spec.js`, the workspace test evidence location, this document, `Docs/LEVEL_CONTRACT.md`, and only the intentional `src/app.js` source digest in the three hint-baseline fixtures. No unrelated fingerprint is updated. Evidence and the task-start scope audit are under `qa-screenshots/challenge-final-polish-20261004/`.

The baseline files are `tests/fixtures/runenpoort-hints-baseline.json`, `tests/fixtures/batch1-hints-baseline.json` and `tests/fixtures/batch2-hints-baseline.json`. The only change in `tests/challenge-workspace.spec.js` is its screenshot output directory; its behavioral assertions are preserved. New consistency coverage lives in `tests/challenge-consistency.spec.js`.

Final QA:

| Checks | Result |
| --- | --- |
| Desktop: workspace + full M6 pilot + new consistency suite | **102/102 passed** |
| Both iPad orientations: workspace + new consistency suite | **98 distinct checks passed across the matrix and one unchanged retry**; initial matrix **97/98** |
| Final desktop keyboard/money-row checks after the small keyboard styling adjustment | **5/5 passed** |
| Runenpoort, batch-one and batch-two E5 hints | **35/41**; all 31 runtime flows passed, six historical fingerprints failed |
| Learning-level framework | **18/19**; the historical source fingerprint failed |
| Session/Voortgang | **9/9 passed** |
| Progression, prerequisites and route/completion copy | **6/6 passed** |
| Spelling and ordinary grading | **2/2 passed** |
| Service-worker cache ownership | **1/1 passed** |
| Level validator | **35 production + 1 developer levels passed** |
| Syntax and diff whitespace | **Passed** |

The iPad matrix's one failure was `RP-M6-TI-006 explanation` in landscape: it timed out on the disabled **Start avontuur** introduction button before opening a challenge. The exact same test passed in 15.6 seconds on retry, with no code, assertion or timeout change. This is not a claim that the initial matrix was entirely green or that the startup issue was diagnosed/fixed. `tablet-start-timeout.md` and the original log are retained. All 49 portrait checks passed in the initial matrix; landscape coverage combines 48 initial passes with the unchanged retry.

The seven retained regression failures are the already documented fingerprints: Runenpoort non-hint LVL-0002 and world-config source; batch-one non-hint LVL-0004 and LVL-0002 source; batch-two non-hint LVL-0023 and LVL-0002 source; learning-level LVL-0002 source. The affected files match the task-start hashes. No level/world fingerprint, assertion or world content was changed to obtain a pass. The broader existing NPC asset/hotspot failures remain outside this task and were not repaired or rebaselined.

Coverage includes E5 2 × 9, 8 × 7 and Freya; M6 OP-001, OP-006, BR-002, GE-001, Freya's GE-002 and TI-006; all 24 pilot IDs/support/outcomes via the unchanged M6 suite; all four visual types, all six euro amounts, invalid input, historical reports, exact completion/card/header/close-button geometry, same-question completion reopening, next-question presenter restoration, equal footer button dimensions, independent paper scrolling and unchanged notes. Initial focused work caught compact-header restoration on reopening; that was corrected. Paper geometry checks wait for the existing page-turn animation to finish rather than disabling it or loosening bounds.

Desktop, both WebKit iPad orientations, Chromebook-sized layout and simulated half-height keyboard viewports were inspected. Physical iPad software keyboards and installed-PWA upgrades remain unverified. The test browser's existing WebGPU-unavailable banner is visible in full-page evidence; renderer behavior was not changed or hidden, and this UI-only task does not claim GPU acceptance.

The task-start scope audit checked **2,061 existing files**, allowing only **nine existing-file changes plus one new test file**. It verifies unchanged educational content/assets/levels, grading, parsers, notes handlers, selection, report sources and renderers. The only answer-handler difference is clearing E5's final-help companion text. Logs: `desktop-full.log`, `tablet-full.log`, `tablet-retry.log`, `keyboard-final.log`, `regression.log`, `validate.log`, `scope.json`; regression error contexts and earlier focused logs are retained alongside screenshots.

## Compact controls and expanded paper — 4 October 2026

This later visual refinement supersedes the previous cross-column footer and 52px action sizing, following the supplied Freya/Moose mockup. It changes only presentation:

- The footer is entirely in the left column. The notebook spans both grid rows on the right, letting ruled paper extend to the bottom of the panel. Its help and editing faces still have identical bounds and independent scrolling.
- The notebook toggle always occupies the footer's rightmost position, aligned with the close button above. `Controleer` and every notebook-toggle label use equal **112×44px** buttons. M6 fields are **44px** high, with numeric keyboard hints and the existing fixed euro/comma UI. Four M6 choices remain a turquoise **2×2** grid to the left of the toggle; E5's 2×2 choices are untouched.
- `Controleer` uses a flat teal gradient, restrained gold border and cream text in E5 and M6. The secondary notebook control has a darker complementary finish. Neither has a raised bezel or downward pressed translation. Other primary actions keep their current appearance. Panel edging is subtle; portrait and notebook typography remain consistent.
- M6's generic answer label is visually hidden but retains its accessible input association. The redundant notes subtitle is removed. Small euro/cent labels remain visible. No educational text is removed or shortened.
- While editing, `Wis kladwerk` is an SVG eraser button at the notebook header's top-right, with its accessible name and tooltip. It invokes the existing clear/confirm/cancel handlers. Confirmation overlays that corner without resizing paper; it never touches authored help.

Only `renderChallenge`, `renderNotebookToolbar` and `renderScratchpad` change in application JavaScript. Selection, hints, full explanation, notes, input, completion bounds, history, outcomes and reopening handlers are byte-for-byte unchanged from the task-start snapshot. The approved content, visuals' stage data, fonts, assets, level/world data, parsers, planners and report sources are unchanged. There is still no direct explanation route. The owning contract is `Docs/LEVEL_CONTRACT.md`; previous sections above remain historical evidence. Cache version is v249.

Evidence for this pass is in `qa-screenshots/challenge-refinement-20261004/`. Tests assert equal button dimensions, flat surfaces, close/toggle alignment, paper extending to the control baseline, 2×2 choices to the left, accessible labels, the top-right eraser, unchanged paper bounds when flipping or confirming, unchanged content/help/history and in-place completion. The task-start audit protects all 2,062 existing files outside the declared presentation, test, cache and documentation changes; hint-fixture refreshes are limited to the intentional `src/app.js` digest.

Files changed: `src/app.js`, `src/styles.css`, `service-worker.js`, `tests/challenge-consistency.spec.js`, `tests/challenge-workspace.spec.js`, `Docs/LEVEL_CONTRACT.md`, this document, and the `src/app.js` fingerprint entries in `tests/fixtures/{runenpoort,batch1,batch2}-hints-baseline.json`. No level/world fingerprints or educational assertions are rebaselined.

Desktop QA covers **102 distinct scenarios** from the consistency, workspace and full M6 suites. The first full run passed 98/102: four newly added accessible-name assertions incorrectly used a strict locator matching both euro and cent inputs. The correction asserts the field count and each field's accessible name separately; **all four affected scenarios then passed**, with no application-code or timeout change. Both original and recheck logs are retained (`desktop-full.log`, `money-label-recheck.log`). This is not reported as a clean initial run. The initial focused matrix also passed **18/18** across desktop and both iPad orientations (`targeted.log`).

The level validator passes all **35 production and 1 developer levels**. Physical iPad software keyboards and installed-PWA cache upgrades remain unverified; WebKit device emulation and simulated visual viewports are the layout/input evidence. Previously documented broader fingerprint/NPC regressions remain outside this pass and were not rebaselined or rerun. The existing WebGPU-unavailable banner is retained in full-page screenshots; this UI-only change neither changes renderer behavior nor claims GPU acceptance.

The supplementary iPad matrix initially passed **21/22**. The portrait BR-006 check caught an actual 39.78px-wide answer field beside the long unit `houtblokken`; the existing 44px assertion was retained. M6 number fields now have an explicit 44px minimum width, and at widths up to 900px their existing unit becomes a small caption above the field. This preserves the exact unit text and leaves ample room for the equal action buttons. The original failure is retained in `tablet-supplement.log` and `portrait-long-unit-error.md`. A focused final matrix covering that fraction question, OP-006 completion, OP-003 keyboard input and equal help/edit paper bounds passed **12/12** across desktop and both iPad orientations (`unit-layout-recheck.log`).

Final coverage: **102 distinct desktop scenarios and 34 distinct iPad scenarios passed across the initial runs and the documented corrections/rechecks**, including all 24 M6 questions, four visual types, all six euro amounts, invalid input, historical reports, E5 hints/2×2 answers, NPC identity, notes, reopening and completion. Syntax, whitespace and the final task-start scope audit also pass. `scope.json` records exactly ten changed existing files and no new non-ignored files; educational content, answer/notes/help handlers, planners, reports, assets and renderers remain unchanged.

## Compact completion and notebook finish — 4 October 2026

The next manual review explicitly replaces the earlier requirement to retain expanded question-card bounds on completion. A completed challenge now uses a content-height card, at most **650px wide**, inside the current visual viewport. It has no notebook column, empty paper area or retained expanded height. The shared challenge shell still supplies the original presenter, title, question progress, close action and existing result/next-question controls. Closing and reopening preserves this compact result and the same learning record. The obsolete presentation-only completion-rectangle WeakMap and positioning callbacks are removed; gameplay completion, grading and outcomes are unchanged.

The notebook has a warm, lightly aged paper surface, subtle grain and edge shading, with brass binder rings down its left edge. The rings are decorative, ignore pointer input and remain outside the native editable textarea. Their SVG and the paper grain are embedded in CSS, so they do not depend on additional asset requests or the development server's SVG MIME configuration. Both help and notes retain identical paper dimensions and the existing two-direction page-turn animation, including reduced-motion behavior. Circled explanation-step numbers follow the same 28px ruling alignment and per-step offset as the authored text. No explanation, visual data, step order or educational information is changed.

The supplied transparent Atlas emblem is copied unchanged to `assets/branding/atlas-emblem-transparent.png`. It appears only as a **4.5% opacity**, noninteractive watermark in the question panel. It is absent from the compact completion card. Existing branding assets are untouched. The new PNG is included in the service worker's asset list; cache version is **v250-notebook-finish**.

Files in this correction: `src/app.js`, `src/styles.css`, `src/challenge-support.js` (only an explicit accessible-list role), `service-worker.js`, the two `tests/challenge-{workspace,consistency}.spec.js` suites, `Docs/LEVEL_CONTRACT.md`, this document, `assets/branding/README.md`, the new transparent PNG, and only the intentional app-source digest in the three hint-baseline fixtures. The task-start audit covers **2,062 existing files**, including unchanged educational source, level/world content, parsers, selection, reports, notes/help/answer handlers and graphics renderers. It separately verifies that the list role is the sole change in `challenge-support.js`. Evidence is under `qa-screenshots/challenge-notebook-finish-20261004/`.

The final desktop run passes **49/49** consistency/workspace checks (`desktop-full.log`), including exact authored explanation text, all four visual types, compact ordinary/NPC E5/M6 completion, stable reopening, native notes editing, two-direction animation and reduced motion, local font/image loading, equal paper bounds, decoration alignment, Chromebook sizing and simulated keyboard viewports. Level validation passes **35 production + 1 developer levels**; syntax, whitespace and the task-start scope audit pass.

Earlier focused logs are retained: `targeted.log` passed 10/12 and `paper-recheck.log` passed 4/6. In each run the two long iPad full-stage screenshot cases reached the unchanged 30-second limit at the final notes edit/return. Decoration measurements are now batched, and that test saves four endpoint PNGs instead of eight stage PNGs while retaining every stage/face, touch, focus, scrolling and layout assertion. No timeout, gameplay assertion or authored-content assertion is relaxed. The initial external SVG ring asset did not decode under the existing local server's MIME configuration; the final CSS data image is explicitly decoded by the browser asset test.

Visual inspection of the next landscape screenshots found WebKit painting the old list markers alongside the circular numbers even with empty marker content. That run was stopped after 11 passes (`tablet-before-marker-fix.log`). A zero-size/transparent-marker attempt removed the visible duplicates (`markers-final.log`, 3/3), but an expanded regression checking **every wrapped line** exposed an extra 8px after the first line in WebKit. The failing reproduction is retained in `wrapped-rule-detail.log`; the initial expanded run was stopped after five failures (`wrapped-rule-investigation.log`). The final correction disables native markers only inside the notebook and explicitly retains `role="list"` on the explanation's existing `ol`. The same failing keyboard regression then passes (`wrapped-rule-fix.log`). Tests retain all wrapped-line alignment checks, and also verify native-marker suppression, accessible list semantics and circular-badge placement.

The final notebook matrix after this correction passes **27/27** (`workspace-final.log`): nine scenarios on each of desktop Chromium, iPad landscape WebKit and iPad portrait WebKit. It includes exact rendering of all 24 explanations, all four visual types through every help/edit face, both simulated keyboard cases, both page-turn directions/reduced motion, local assets/fonts and equal paper bounds. All five failed wrapped-line scenarios pass in this matrix without changing their assertions or timeouts. Screenshots of the corrected desktop and both iPad layouts were inspected.

The final portrait completion check passes **2/2** for ordinary E5 and Freya's M6 full-explanation outcome (`portrait-completion-final.log`), including compact bounds and unchanged records on reopening. Together with the seven successful landscape completion cases before the notebook-only marker correction, this pass verifies **49 distinct desktop scenarios and 27 distinct iPad scenarios across the documented runs**, not one uninterrupted clean matrix. Final syntax, whitespace, level validation and scope checks pass; the scope report permits exactly **12 changed existing files plus the copied PNG**.

Physical iPad software keyboards and installed-PWA cache upgrades remain unverified. The existing WebGPU-unavailable message is retained in full-page test evidence; this presentation change does not alter or certify graphics rendering. The previously documented broad fingerprint/NPC regressions remain outside this correction, with no level/world rebaselining. Earlier failing and interrupted logs are retained alongside final results rather than being reported as clean runs.

## Double wire bindings and full notebook QA — 5 October 2026

The notebook now has two slender gold-bronze wires per punched hole, with light
metallic highlights and darker edges. Each pair is centred on the existing
rounded rectangular hole. Its return arcs and their shadows remain clipped at
the paper edge, so they pass behind the sheet. The approved aged-paper PNG,
28px ruling, typography, geometry, touch controls and page-turn animation are
unchanged. Both help and editable notes use the same decorative CSS image;
bindings ignore input and are hidden from assistive technology. Static cache
**v257-notebook-double-rings** distributes the updated CSS.

Production changes are restricted to the SVG data image in
`.notebookBindings` and the cache version. The owning material description is
updated in `Docs/LEVEL_CONTRACT.md` and `assets/ui/notebook/README.md`.
`tests/challenge-workspace.spec.js` additionally verifies that the bindings keep
their position, image, pointer behavior and accessibility treatment through both
page-turn directions and reduced motion. No gameplay, help, answer, notes,
reporting, planner, content, world or renderer source was changed.

### QA evidence

Evidence is in `qa-screenshots/notebook-double-rings-20261005/`. The complete
current matrix of workspace, challenge-consistency and M6-pilot scenarios is
covered: **309 distinct passing cases, 103 each on desktop Chromium, iPad
landscape WebKit and iPad portrait WebKit**. `coverage.json` reconciles every
current scenario against its successful run; this is not claimed as a single
uninterrupted clean run.

- The initial focused material/motion matrix passed **6/6**.
- The first full run used two workers. It was stopped after **128 passes and
  11 iPad timeouts**; the original log and error contexts remain in `full.log`
  and `full-results/`.
- Every remaining or failed scenario was then run with one worker and unchanged
  timeouts: **177/178 passed** (`serial.log`). Only the combined notes-retention,
  clearing and next-question scenario exceeded 30 seconds on iPad landscape;
  its portrait counterpart took 29.5 seconds. The same timeout also reproduces
  with the task-start CSS and original test (`baseline-probe.log`).
- That combined test is now two focused scenarios: retention through all stages
  and reopening; and clearing reopened notes followed by completion and empty
  notes on the next question. Every original assertion is retained, and the
  clearing case explicitly reopens the populated notes before checking them.
  Both scenarios pass on all three profiles: **6/6** (`notes.log`). No timeout
  was extended, assertion relaxed, content rebaselined or runtime behavior changed.

Coverage includes every approved M6 question and help/outcome state; all four
visuals; standard/NPC and E5 presentation; opening, editing on arbitrary rules,
selection, wrapping, scrolling, clear/cancel, switching faces, reopening,
completion and next-question reset; both motion preferences; all six euro
amounts; invalid input; history and legacy reports; keyboard-height simulation;
touch targets, equal paper bounds, control alignment and horizontal overflow.
Screenshots were inspected for tips, full explanations, editable notes, page
turns, compact completion and reduced-height layouts. The current-run captures
are archived in `full-screenshots/`.

Level validation passes **35 production + 1 developer levels**. Syntax and
whitespace checks pass. The task-start audit checks **2,065 existing files** and
limits changes to `src/styles.css`, `service-worker.js`, the workspace test,
the two documents above and this report. It verifies that all CSS outside the
ring image, the paper asset, application handlers and educational data remain
unchanged; it also checks that the original notes assertion lines remain.

Physical iPad software keyboards and installed-PWA updates are not certified by
browser emulation. Existing WebGPU-unavailable banners remain visible in the
evidence; this UI-only change does not alter or certify the 3D renderer. Previously
documented broader fingerprint/NPC regressions were neither rebaselined nor
included as unrelated fixes.

## Scrolling notebook paper — 5 October 2026

Long hints, full explanations and native notes now scroll their paper material
and double ring strip with the text. The existing native region/textarea remains
the only scroll owner. Its measured content height adds complete ring pairs at
a fixed 40px pitch; deleting notes shortens the surface again. Decorative DOM
styles track render, font, viewport, input and scroll changes, with no additional
learning, report or persistence state.

The approved aged-paper PNG and gold-bronze ring SVG are unchanged. Short pages
retain the fitted paper artwork. Long pages use nine-slice rendering, preserving
the scale of worn corners and repeating the central/side texture. This replaced
an initial local prototype that stretched the entire image and visibly elongated
its grain. The page-turn animation moves text and paper together; rings remain
outside that transform. Clipping keeps the scrolling decorations inside the
paper window, with no input interception. Existing answer controls, note editing,
help stages and authored content remain unchanged. Static cache:
`v258-notebook-scrolling-paper`.

The focused regression coverage in `tests/challenge-workspace.spec.js` now checks
native scroll synchronization at top/middle/bottom, growth and shrinkage, native
row editing, unchanged learning evidence, page turning, equal help/notes bounds,
and the existing visual/touch/keyboard scenarios. The material-height check waits
for the real page-turn animation to finish before comparing untransformed bounds.
Prototype screenshots, test logs and the task-start fingerprints are kept in
`qa-screenshots/notebook-scroll-20261005/`. The final targeted run passed **45/45**
cases: 15 each on desktop Chromium, iPad landscape WebKit and iPad portrait WebKit
(`targeted.log`, one worker, unchanged timeouts). Current-run screenshots are
archived in `current-screenshots/`. Coverage includes the four visual types,
keyboard-height simulation, touch targets, scrolling, note growth/deletion,
blank-rule selection, wrapping, clear/reopen, page turns and reduced motion.
Syntax and whitespace checks pass. The 2,065-file task-start audit confirms only
the notebook runtime/CSS, focused tests, cache version and owning documentation
changed; the paper PNG, ring SVG and educational/world content remain unchanged.
This is UI-only work; it does not change
renderer resources or require the 3D acceptance suite. Physical iPad inertial
scrolling, software keyboards and installed-PWA upgrades still require device QA.
