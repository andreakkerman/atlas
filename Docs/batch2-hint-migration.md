# Batch 2 hint migration

Completed Leonardo and Egypt using the existing shared resolver. Inventoried **152 active Leonardo variants** and **88 active Egypt variants**. All **240** migrated, removing **480** explicit hint strings. **128 inactive variants** (56 Leonardo, 72 Egypt) retain their **256 authored strings**. There are **zero active text overrides**, **zero family corrections**, **zero unsupported cases**, and **no remaining active authored hint bank** across LVL-0001–LVL-0035.

## Family and subtype counts

| Family / subtype | Leonardo active | Egypt active |
|---|---:|---:|
| bare_multiplication | 53 | 20 |
| bare_division | 18 | 10 |
| story_multiplication | 23 | 20 |
| measurement / addition | 2 | 0 |
| sharing | 12 | 10 |
| measurement / subtraction | 3 | 0 |
| measurement / duration_addition | 1 | 0 |
| clock_reading | 40 | 8 |
| recognition | 0 | 20 |

56 active variants in disabled Proceno and Florence are included through existing editor test access. Neither level was enabled or reordered. Inactive variants are individually recorded in [the inventory](batch2-hint-inventory.md).

## Shared architecture

The existing exact-ID opt-in now covers LVL-0001–LVL-0035. Explicit authored hint stages still take precedence, preserving inactive banks and existing drafts. Measurement remains a broad production family; its metadata uses existing a/b operands plus strategy (addition, subtraction or duration_addition), with authored unit where relevant. No new family names or parallel operand schema were introduced.

The shared tens/ones helper omits zero steps and uses numeric subtraction steps, avoiding digit-wise subtraction instructions. Duration addition preserves minuten, with minuut for a quantity of one. Generic spelling recognition uses the exact approved two lines and reads neither the answer nor option positions. No unsupported phonics claims or word-specific metadata were added. More specific spelling metadata can be added later without changing the current source family.

Multiplication selection now prioritizes ×10, ×2, ×4, ×11, ×12, then the previous ×5/×9/×6/×7/×8/×3 order. Earlier content has no affected facts; every earlier generated pair is snapshot-tested. Existing ×13 questions need no new strategy because their other operand has an approved strategy. Clock behavior is unchanged, including ordinary clock_reading in Leonardo/Egypt and existing Dutch half semantics.

## New-strategy examples

### LVL-0021 / optics-table-4a

Bij de spiegels liggen eerst 28 onderdelen en Leonardo legt er 17 bij. Hoeveel onderdelen liggen er nu?

- Minnie: Kijk welke twee aantallen je bij elkaar moet optellen.
- Moose: Begin met 28. Tel eerst 10 erbij en daarna 7.

### LVL-0022 / gate-mechanism-3a

Leonardo telt bij de kettingen 46 markeringen en voegt er 29 toe. Hoeveel markeringen zijn er samen?

- Minnie: Kijk welke twee aantallen je bij elkaar moet optellen.
- Moose: Begin met 46. Tel eerst 20 erbij en daarna 9.

### LVL-0021 / mechanical-model-4b

Bij de wielen zijn 64 cm touw nodig en Sven gebruikt al 19 cm. Hoeveel cm blijft over?

- Minnie: Kijk hoeveel er van het begingetal afgaat.
- Moose: Begin met 64. Trek eerst 10 af en daarna 9.

### LVL-0022 / measuring-table-1b

Leonardo heeft 90 gram materiaal bij de latten en gebruikt 27 gram. Hoeveel gram blijft over?

- Minnie: Kijk hoeveel er van het begingetal afgaat.
- Moose: Begin met 90. Trek eerst 20 af en daarna 7.

### LVL-0022 / bridge-model-2a

De proef bij de brugliggers duurt eerst 18 minuten en daarna nog 25 minuten. Hoeveel minuten duurt het samen?

- Minnie: Tel de twee tijdsduren bij elkaar op.
- Moose: Begin met 18 minuten. Tel eerst 20 minuten erbij en daarna 5 minuten.

### LVL-0024 / wing-frame-2a

3 × 11 = ?

- Minnie: Denk aan 3 groepjes van 11.
- Moose: Reken eerst 3 × 10 en tel er nog 3 bij.

### LVL-0021 / optics-table-1a

6 × 12 = ?

- Minnie: Denk aan 6 groepjes van 12.
- Moose: Reken eerst 6 × 10 en 6 × 2 en tel die uitkomsten op.

### LVL-0024 / wing-frame-1b

10 × 11 = ?

- Minnie: Denk aan 10 groepjes van 11.
- Moose: Bij × 10 komt er een nul achter 11.

### LVL-0029 / altar-table-4b

Welk woord is goed gespeld? Choices: Sarcofaag, Sarkofaag, Sarcofhaag, Sarcofag.

- Minnie: Lees de woorden rustig. Welke spelling herken je?
- Moose: Vergelijk de woorden letter voor letter. Kijk waar ze van elkaar verschillen.

### LVL-0028 / planning-table-4b

Welk woord is goed gespeld? Choices: Bouwplan, Bouwplaan, Bouplan, Bouw-plan.

- Minnie: Lees de woorden rustig. Welke spelling herken je?
- Moose: Vergelijk de woorden letter voor letter. Kijk waar ze van elkaar verschillen.

## Preservation

Full level fingerprints strip only hintMinnie, hintMoose and hintParameters. Separate inactive-bank fingerprints include every field. Thus wording, answers, choices (including spelling distractors), explanations, modes, family labels, counts/order, flags, prerequisites, progression, geometry, NPC setup, rewards, companion moments/policies and corrected destinations are preserved. All existing gameplay and routing source files remain unchanged. ARC, Runenpoort and Batch 1 source banks and every generated hint pair remain identical.

No first/second hint states the final answer or identifies a spelling choice. Operand numbers may coincide with an answer in a legitimate strategy; tests reject answer statements rather than such incidental digits. Third failure still displays the original explanation and offers assistance. NPC retry-panel and companion-bar presentation remain unchanged.

## Files changed

- Levels/LVL-0021/level.js through Levels/LVL-0031/level.js: active hint fields only.
- src/challenge-hints.js: opt-in, reusable measurement/spelling strategies and ×11/×12 selector.
- service-worker.js: v238-batch2-hints asset cache version.
- tests/batch2-hints.spec.js and tests/fixtures/batch2-hints-baseline.json: exhaustive runtime and preservation coverage.
- ARC/Runenpoort legacy-scope assertions; Batch 1/Runenpoort source-scope fixtures; older-companion fixture: advance only intentionally migrated banks, with the new baseline protecting all non-hint data.
- Docs/LEVEL_CONTRACT.md, Docs/ATLAS_LEARNING_CONTENT_RULES.md, this report and inventory.

No further content redesign was started.

## Existing spelling grading limitation

The unchanged answerQuestion grader at src/app.js uses Dutch localeCompare with sensitivity: base. Consequently the distractors Hieroglief (against Hiëroglief) and Museüm (against Museum) are accepted as equivalent. These are existing grading semantics, not changes from hint migration. Tests choose a genuinely incorrect option using that same equivalence to exercise all three failure stages. Source answers/choices and grading are preserved as requested; correcting accent-sensitive spelling grading would require a separate authorized behavior change.

## Validation results

- **95 desktop checks passed after correcting the new test's wrong-option selection**: 80 existing checks across ARC (15), Runenpoort (6), Batch 1 (20), progression (6), older-companion preservation/runtime (32), and cache ownership (1); plus all 15 Batch 2 checks. Initial combined run: 93 passed, 2 failed due to the accent-equivalent spelling options described above. The complete Batch 2 rerun passed 15/15 without production grading changes or relaxed assertions.
- The exhaustive browser suites cover all **816 active production variants** through three wrong attempts. The Batch 2 suite compares retry object/choice stability, displayed companion/NPC hint text, answer modes, rendered clock inputs, answers and original explanations. All 20 active spelling variants and their differing distractor sets are included.
- **6 iPad WebKit emulation checks passed**: landscape and portrait for LVL-0022, LVL-0025 and LVL-0030, including both disabled Leonardo levels, measurement/duration arithmetic, larger facts, clocks and spelling. This is emulated tablet coverage, not physical-iPad verification.
- Level validator passed for **35 production + 1 developer level**.
- **16 affected JavaScript files** passed Node syntax checks; the final test edit was checked again.
- **git diff --check passed**.

Commands:

```powershell
npx.cmd playwright test tests/batch2-hints.spec.js tests/batch1-hints.spec.js tests/arc-dialogue.spec.js tests/runenpoort-hints.spec.js tests/progression-copy.spec.js tests/older-companion-dialogue.spec.js tests/service-worker-ownership.spec.js --project=desktop-chromium --workers=2
npx.cmd playwright test tests/batch2-hints.spec.js --project=desktop-chromium --workers=2
npx.cmd playwright test tests/batch2-hints.spec.js --project=ipad-landscape --project=ipad-portrait --workers=1 --grep LVL-00[23][025]:
node scripts/validate-levels.js
node --check tests/batch2-hints.spec.js
git -c core.safecrlf=false diff --check
```
