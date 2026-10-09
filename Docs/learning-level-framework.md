# Learning-level framework

Historical framework implementation report. The current Runenpoort M6 extension and QA are documented in [the pilot report](runenpoort-m6-pilot.md) and [the owning contract](LEVEL_CONTRACT.md#runenpoort-m6-authored-support).

Atlas now supports an E5/M6 preference without adding M6 production content or changing existing questions.

## Model and selection

- Supported identifiers: E5 and M6, case-sensitive. Missing learningLevel intentionally means E5; explicit unknown/null values fail validation. No hundreds-of-fields migration was needed.
- All 816 active production variants remain byte-identical in their level definitions and resolve as E5. All previously generated Minnie/Moose pairs are compared against a pre-change snapshot. The resolver itself is unchanged.
- Future authors add uniquely identified variants with learningLevel: "M6" to the existing slots, retaining the required question fields and supported family/hintParameters. M6 is independent of family and arithmetic difficulty. There is no M6 curriculum or production question in this change.
- The validator now accepts nonempty variant banks (one or more variants, instead of exactly two), validates learningLevel strictly, and permits the legacy schoolBand labels E5-intended and M6-intended. schoolBand is descriptive; it does not select the learning level. Four question slots per challenge remain unchanged.

## Preference and UI

- Existing main-menu gear settings: Niveau, E5/M6 endpoints, native range control and immediately updated percentage text.
- Range: min 0, max 100, step 10. The value represents M6; E5 is always 100 minus M6.
- One canonical default: DEFAULT_M6_PERCENTAGE = 10 in src/learning-levels.js, displayed as 90% E5 · 10% M6.
- Storage key: atlas.learning.m6Percentage, one JSON number. This is separate from graphics/session settings.
- Reload/browser reopening/menu return preserve the preference. Cleared or missing storage returns to default; malformed, nonnumeric, out-of-range and non-step values resolve to default without rounding. Storage failures leave the in-memory preference usable.
- Native mouse, touch and keyboard behavior; 44px-high range target, associated label/output, focus indicator and aria-valuetext. No custom dragging.

## Planner lifecycle and fallback

The shared planner creates an evenly spaced 20-request deck with a random rotation. Every full deck has the exact configured counts: 10% gives 18 E5 and 2 M6, 30% gives 14/6, 50% gives 10/10. The rotation repeats across deck boundaries to avoid bunching there. A fresh planner gets a fresh rotation. This is a balanced mix, not adaptive learning.

A planner begins lazily on the first selected question, continues across challenges and level transitions, and resets on return to menu, replay/restart, page reload or preference change. Its order is not persisted. It does not impose a ratio independently on each four-question challenge.

The planner records requested level; selection records delivered level. Missing M6 falls back to E5, and missing E5 falls back to M6. Empty/invalid banks are rejected. A fallback consumes its planned request normally: no catch-up debt, retries or changes to the slider. Thus even at 100% M6 all current production questions remain playable as E5.

Only initial variant selection consumes a request. The existing selected-question object retains the variant and shuffled choices through retries, Minnie, Moose and assistance. It now also carries delivered learningLevel and atlasLearningSelection: { m6Percentage, requested, delivered, fallback }. These are minimal inspectable runtime diagnostics, not a new reporting/analytics system.

## Editor and preservation

The existing variant preview shows its resolved E5/M6 label, including the compatibility default. No curriculum editor or generation UI was added.

No level source, question, answer, choice, spelling distractor, explanation, hint parameter, active flag, prerequisite, progression, routing, NPC behavior, companion dialogue/policy, renderer setting or audio setting was changed. Spelling's NFC/case-tolerant but diacritic-sensitive grading is unchanged.

## Files

- src/learning-levels.js — preference, strict identifier resolution, balanced planner and symmetric fallback.
- src/app.js — existing gear menu, persistent preference integration, initial-selection hook, lifecycle resets, preview labels and per-question diagnostics.
- src/styles.css — scoped learning-control styling.
- index.html and service-worker.js — load/cache the module; cache version v240-learning-levels.
- scripts/validate-levels.js — identifier/bank validation and future schoolBand label support.
- tests/learning-levels.spec.js and tests/fixtures/learning-levels-baseline.json — new coverage and exact production/hint preservation.
- Existing Runenpoort/Batch 1/Batch 2 baseline fixtures — update only the app.js hash for the authorized runtime integration.
- Docs/DEV_TOOLS.md, Docs/LEVEL_CONTRACT.md, Docs/ATLAS_LEARNING_CONTENT_RULES.md and this report — current contracts and evidence.

M6 curriculum/content creation has not started.

## Validation results

- **116 desktop checks passed across the final test set, including targeted reruns**: all 97 existing regressions plus 19 new learning-level checks. Existing suites cover all 816 active variants through hint/assistance flows, spelling grading, companion preservation, progression and cache ownership.
- New checks cover all valid slider positions, malformed stored values, persisted preference across menu/reload/reopened browser context, exact 20-request distributions at every percentage, separated low-M6 requests, deterministic rotations, symmetric fallback without debt, empty/invalid banks, real validator acceptance/rejection, all production E5 content/hint snapshots, current production at 0/10/50/100%, and synthetic E5/M6 variants staying fixed through Minnie/Moose retries. Editor labels and planner continuation across level transitions/menu reset are exercised.
- **2 iPad WebKit-emulation checks passed**, landscape and portrait. Both use native touchscreen taps rather than programmatic slider mutation; percentage output updates immediately. Screenshots were visually inspected alongside the desktop screenshot. This is emulation, not physical-iPad verification.
- Level validation passed for **35 production + 1 developer level**.
- Node syntax checks passed for the new module, app, validator, worker and test file. **git diff --check passed**.

Initial combined run: 109 passed, with two new test-setup failures. The validator test originally referenced a legacy walkGraph.nodes representation; it now uses the validator's existing authored-path normalization. The corrupt-storage test originally performed six complete startups in one timed test; each value now has its own unchanged assertion in an isolated startup test. No timeout was extended or assertion removed.

The subsequent 19-test run passed 17; the final two synthetic cases timed out before entering a level while the runner reported an anomalous 1.3-hour elapsed duration. Their unchanged isolated rerun passed 2/2 in 7.2 seconds. No production workaround was made for those startup failures.

Commands:

```powershell
npx.cmd playwright test tests/learning-levels.spec.js tests/spelling-grading.spec.js tests/batch2-hints.spec.js tests/batch1-hints.spec.js tests/runenpoort-hints.spec.js tests/arc-dialogue.spec.js tests/progression-copy.spec.js tests/older-companion-dialogue.spec.js tests/service-worker-ownership.spec.js --project=desktop-chromium --workers=2
npx.cmd playwright test tests/learning-levels.spec.js --project=desktop-chromium --workers=2
npx.cmd playwright test tests/learning-levels.spec.js --project=desktop-chromium --workers=1 --grep synthetic
npx.cmd playwright test tests/learning-levels.spec.js --project=ipad-landscape --project=ipad-portrait --workers=1 --grep 'settings slider'
node scripts/validate-levels.js
git -c core.safecrlf=false diff --check
```
