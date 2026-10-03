# Batch 1 hint migration

Migrated the 392 active variants in Nautilus, Blokkenpoort and Europa to `src/challenge-hints.js`, removing 784 explicit hint strings. Zero active variants remain authored; zero text or strategy overrides were needed. No family corrections or unsupported semantic cases were found.

## Counts

| Family / subtype | Nautilus | Blokkenpoort | Europa |
|---|---:|---:|---:|
| bare_division | 15 | 18 | 21 |
| bare_multiplication | 48 | 60 | 66 |
| story_multiplication | 20 | 24 | 28 |
| money | 2 | 3 | 4 |
| route | 2 | 3 | 3 |
| story_division (sharing) | 9 | 12 | 14 |
| clock_reading_quarter | 0 | 0 | 8 |
| clock_reading_half_hour | 0 | 0 | 8 |
| clock_reading_five_minutes | 0 | 0 | 24 |
| **Total** | **96** | **120** | **176** |

304 migrated variants are in enabled levels; 88 are in disabled levels (LVL-0012, LVL-0015, LVL-0018, LVL-0020). Their enabled flags and route positions are unchanged.

The 16 inactive variants retain all 32 authored strings, as explicitly required:

- LVL-0014 / postbox / postbox-1a: inactive challenge.
- LVL-0014 / postbox / postbox-1b: inactive challenge.
- LVL-0014 / postbox / postbox-2a: inactive challenge.
- LVL-0014 / postbox / postbox-2b: inactive challenge.
- LVL-0014 / postbox / postbox-3a: inactive challenge.
- LVL-0014 / postbox / postbox-3b: inactive challenge.
- LVL-0014 / postbox / postbox-4a: inactive challenge.
- LVL-0014 / postbox / postbox-4b: inactive challenge.
- LVL-0015 / marketStall / market-stall-1a: inactive challenge.
- LVL-0015 / marketStall / market-stall-1b: inactive challenge.
- LVL-0015 / marketStall / market-stall-2a: inactive challenge.
- LVL-0015 / marketStall / market-stall-2b: inactive challenge.
- LVL-0015 / marketStall / market-stall-3a: inactive challenge.
- LVL-0015 / marketStall / market-stall-3b: inactive challenge.
- LVL-0015 / marketStall / market-stall-4a: inactive challenge.
- LVL-0015 / marketStall / market-stall-4b: inactive challenge.

## Architecture and semantics

Extended the existing exact level-ID opt-in to LVL-0001–LVL-0020 plus ARC. Arithmetic uses the existing `hintParameters: { a, b }`; money adds the existing `currency`. No runtime parsing is introduced. All division stories ask how much each equal group receives. Route questions divide a total meter length into equal pieces; the approved hints continue to omit units. Money uses existing munten/euro support.

Quarter-hour and half-hour family names now route through the existing clock function. No new clock pedagogy, unit, template or multiplication strategy was added. The five-minute family retains its existing Dutch relationships; ordinary ARC clocks retain their existing output. Explicit per-stage overrides remain supported for exceptional questions and existing drafts.

## Representative rendered hints

### bare_division — LVL-0004 / harborMap-1a

Question: 63 : 9 = ?

- Minnie: Welke keersom met 9 helpt je bij 63 : 9?
- Moose: Zoek in de tafel van 9 welk getal precies op 63 uitkomt.

### bare_multiplication — LVL-0004 / harborMap-2a

Question: 7 × 7 = ?

- Minnie: Denk aan 7 groepjes van 7.
- Moose: Reken eerst 7 × 5 en tel er nog twee groepjes van 7 bij.

### story_multiplication — LVL-0004 / harborMap-2b

Question: Op de havenkaart staan 7 routes met elk 6 meetpunten. Hoeveel meetpunten staan er in totaal?

- Minnie: Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?
- Moose: Je hebt 7 groepjes van 6. Reken 7 × 6.

### money — LVL-0004 / nautilusLight-1a

Question: Nemo koopt 8 reservelampen voor 10 munten per stuk. Hoeveel munten betaalt hij?

- Minnie: Hoeveel keer betaal je hetzelfde bedrag?
- Moose: Je betaalt 8 keer 10 munten. Reken 8 × 10.

### route — LVL-0004 / nautilusLight-3a

Question: Een kabel naar de Nautiluslamp is 16 meter lang. Hij wordt in 8 gelijke stukken verdeeld. Hoe lang is ieder stuk?

- Minnie: In hoeveel gelijke stukken wordt de totale lengte verdeeld?
- Moose: Verdeel 16 door 8. Reken 16 : 8.

### story_division — LVL-0005 / captainChart-2a

Question: Nemo verdeelt 36 koerspunten eerlijk over 6 routes. Hoeveel koerspunten krijgt iedere route?

- Minnie: Wat wordt verdeeld? En over hoeveel gelijke groepjes?
- Moose: Je verdeelt 36 over 6 gelijke groepjes. Reken 36 : 6.

### clock_reading_quarter — LVL-0013 / nl-clock-1a

Question: Hoe laat is het? (clock 4:15)

- Minnie: Kijk eerst naar de grote wijzer.
- Moose: De grote wijzer staat op de 3: dat is kwart over. Kijk nu naar de kleine wijzer.

### clock_reading_half_hour — LVL-0014 / uk-clock-1a

Question: Hoe laat is het? (clock 7:30)

- Minnie: Kijk eerst naar de grote wijzer.
- Moose: De grote wijzer staat op de 6: dat is half. Kijk naar welk uur de kleine wijzer onderweg is.

### clock_reading_five_minutes — LVL-0015 / fr-clock-1a

Question: Hoe laat is het? (clock 3:10)

- Minnie: Kijk eerst naar de grote wijzer.
- Moose: De grote wijzer staat op de 2: dat is tien minuten over. Kijk nu naar de kleine wijzer.

## Preservation and validation

The before/after fingerprints cover the complete scoped level definitions with only hint fields excluded. Inactive banks have separate exact fingerprints. Thus questions, stories, answers, choices, explanations, answer modes, counts, order, flags, prerequisites, presentation, geometry, NPC setup, reward/progression data, companionMoments and companionPolicy are preserved. Runtime and routing source files are unchanged. All prior ARC and Runenpoort generated hint pairs are compared exactly. Leonardo/Egypt and the prior migrated level sources remain byte-identical to the start of this task.

Generated hints contain no final answer statement; operand digits can legitimately coincide with an answer and are not treated as disclosure. Clock hints leave the hour to the learner. All active variants use distinct first/second stages and keep the third-failure explanation.

Changed files: the 17 scoped level definitions; `src/challenge-hints.js`; cache version in `service-worker.js`; `tests/batch1-hints.spec.js` and its baseline; existing ARC/Runenpoort scope assertions and Runenpoort/older-companion fixtures; the learning-content and level contracts; this report and inventory. Existing preservation fixtures were advanced only for the deliberately migrated hint banks; the new pre-edit baseline separately protects every non-hint field.

See [the full inventory](batch1-hint-inventory.md). Batch 2 has not been started.

## Test results

- Desktop Chromium: 80 checks passed across batch1-hints (20), arc-dialogue (15), runenpoort-hints (6), progression-copy (6), older-companion-dialogue (32), and service-worker-ownership (1). The initial run passed 79; a copied Runenpoort-specific prompt assertion failed on an equally sized fish-school story. The assertion now checks the reviewed sharing subtype and both operands, alongside the exact pre-edit story snapshot. That test passed on rerun. No production correction was needed.
- Exhaustive desktop flow covers all 392 Batch 1 variants, all 96 ARC variants and all 88 Runenpoort variants through Minnie → Moose → original assistance, including stable selected variants/shuffled choices, answer mode controls and rendered clock inputs. Both existing companion-bar and NPC retry-panel selectors are supported by the checks.
- iPad WebKit emulation: 20 representative landscape/portrait cases passed across LVL-0004, 0005, 0007, 0009, 0012, 0013, 0014, 0015, 0017 and 0019. Initial run: 19 passed and LVL-0009 landscape timed out clicking the intro Start avontuur button, before level loading. Its unchanged isolated rerun passed in 7.4 seconds; no timeout or assertion was relaxed. This is browser emulation, not a physical iPad test.
- Level validator: 35 production levels and 1 developer level passed.
- Node syntax checks: all 22 affected JavaScript source/test files passed.
- git diff --check passed; Git only printed line-ending normalization warnings.
- Pre-edit source comparison confirms only the 17 intended level definitions and resolver changed among the snapshotted gameplay sources. Cache version advanced separately to v237-batch1-hints.

Commands:

```powershell
npx.cmd playwright test tests/batch1-hints.spec.js tests/arc-dialogue.spec.js tests/runenpoort-hints.spec.js tests/progression-copy.spec.js tests/older-companion-dialogue.spec.js tests/service-worker-ownership.spec.js --project=desktop-chromium --workers=2
npx.cmd playwright test tests/batch1-hints.spec.js --project=desktop-chromium --workers=1 --grep 'all 392'
npx.cmd playwright test tests/batch1-hints.spec.js --project=ipad-landscape --project=ipad-portrait --workers=1 --grep LVL-00[01][234579]:
npx.cmd playwright test tests/batch1-hints.spec.js --project=ipad-landscape --workers=1 --grep LVL-0009:
node scripts/validate-levels.js
git diff --check
```
