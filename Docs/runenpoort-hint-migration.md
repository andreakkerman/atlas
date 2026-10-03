# Runenpoort reusable hint migration

Scope: LVL-0001, LVL-0002 and LVL-0003 only. Current source was inventoried before editing.

## Inventory and result

88 active variants across 11 challenges: 24 in LVL-0001, 32 in LVL-0002, and 32 in LVL-0003. All 176 explicit hint strings were removed; zero explicit overrides remain.

| Family | Variants |
| --- | ---: |
| bare_multiplication | 40 |
| story_multiplication | 16 |
| bare_division | 12 |
| story_division (sharing) | 8 |
| money (munten) | 2 |
| route (length division) | 2 |
| clock_reading_five_minutes | 8 |

All stories were reviewed against the operand roles. There are no grouping-style division or spelling questions in the active bank. Arithmetic operands are now explicit hintParameters; clock input remains visual.hour/minute. No runtime prompt parsing is used.

## Architecture

The existing resolver now has an explicit reusable-level opt-in set for Runenpoort and ARC. It retains the ARC multiplication priority, division, story and route strategies. Money accepts the actual authored unit munten as well as euro. The existing clock_reading_five_minutes family selects reusable Dutch minute relationships for 05, 10, 20, 25, 35, 40, 50 and 55. Quarter/whole/half-hour guidance is shared with the existing clock strategy. The next hour is used conceptually for voor/over half, while the learner must still determine the hour. ARC clock_reading output remains unchanged. Overrides remain supported independently per speaker.

The common runtime and editor-preview resolver call sites already support this extension; no app, answer-checking, NPC, progression or retry handler changes were required. All answer-revealing first/second hint prose in the migrated bank was replaced by strategy cues. No deliberate answer-revealing exceptions remain; the original third-failure explanations are preserved.

## Representative rendered examples

### Bare multiplication — LVL-0001 / zon-1a

Question: 5 × 10 = ?

- Minnie: Denk aan 5 groepjes van 10.
- Moose: Bij × 10 komt er een nul achter 5.

### Multiplication story — LVL-0001 / wind-4a

Question: Aan 8 vlaggenmasten hangen elk 7 linten. Hoeveel linten hangen er in totaal?

- Minnie: Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?
- Moose: Je hebt 8 groepjes van 7. Reken 8 × 7.

### Bare division — LVL-0001 / wind-2b

Question: 24 : 6 = ?

- Minnie: Welke keersom met 6 helpt je bij 24 : 6?
- Moose: Zoek in de tafel van 6 welk getal precies op 24 uitkomt.

### Sharing-division story — LVL-0001 / steen-4b

Question: De Viking verdeelt 63 stenen eerlijk over 7 bouwers. Hoeveel stenen krijgt iedere bouwer?

- Minnie: Wat wordt verdeeld? En over hoeveel gelijke groepjes?
- Moose: Je verdeelt 63 over 7 gelijke groepjes. Reken 63 : 7.

### Clock: ten past — LVL-0003 / shipCompass-1a

Question: Hoe laat is het? (visible clock 8:10)

- Minnie: Kijk eerst naar de grote wijzer.
- Moose: De grote wijzer staat op de 2: dat is tien minuten over. Kijk nu naar de kleine wijzer.

### Clock: five before half — LVL-0003 / shipCompass-2a

Question: Hoe laat is het? (visible clock 6:25)

- Minnie: Kijk eerst naar de grote wijzer.
- Moose: De grote wijzer staat op de 5: dat is vijf voor half. Kijk naar welk uur de kleine wijzer onderweg is.

### Clock: five after half — LVL-0003 / shipCompass-2b

Question: Hoe laat is het? (visible clock 10:35)

- Minnie: Kijk eerst naar de grote wijzer.
- Moose: De grote wijzer staat op de 7: dat is vijf over half. Kijk naar welk uur de kleine wijzer onderweg is.

### Clock: ten before — LVL-0003 / shipCompass-3b

Question: Hoe laat is het? (visible clock 7:50)

- Minnie: Kijk eerst naar de grote wijzer.
- Moose: De grote wijzer staat op de 10: dat is tien voor. Kijk welk uur eraan komt.

### Money — LVL-0001 / wind-3a

Question: Op de havenmarkt koopt de Viking 5 vlaggen voor 6 munten per stuk. Hoeveel munten betaalt hij?

- Minnie: Hoeveel keer betaal je hetzelfde bedrag?
- Moose: Je betaalt 5 keer 6 munten. Reken 5 × 6.

### Length division — LVL-0002 / shipModel-3b

Question: Een touw van 9 meter wordt in 3 gelijke stukken geknipt. Hoe lang is ieder stuk?

- Minnie: In hoeveel gelijke stukken wordt de totale lengte verdeeld?
- Moose: Verdeel 9 door 3. Reken 9 : 3.

## Preservation

Before/after comparison confirms all Runenpoort fields except hint strings/metadata remain identical, including question wording, answers, choices, explanations, families, presentation, ordering, active flags, prerequisites, geometry, companion moments and companionPolicy. All other level files remain byte-identical. All 96 ARC hint pairs match the pre-edit output. Nautilus and LVL-0004–LVL-0031 retain authored hints; no later world was migrated. Shared app/runtime and routing source hashes remain unchanged. The service-worker cache version was bumped to deliver the new resolver and content.

## Files changed

- Levels/LVL-0001/level.js, Levels/LVL-0002/level.js, Levels/LVL-0003/level.js
- src/challenge-hints.js and service-worker.js
- tests/runenpoort-hints.spec.js and tests/fixtures/runenpoort-hints-baseline.json
- tests/arc-dialogue.spec.js (unmigrated-world range now starts at LVL-0004)
- tests/fixtures/older-companion-baseline.json (three fingerprints updated for the intentional hint representation change; companion text expectations unchanged)
- Docs/LEVEL_CONTRACT.md, Docs/ATLAS_LEARNING_CONTENT_RULES.md, and this report

## Validation results

- Runenpoort exhaustive suite: **18 passed**, six checks in each of desktop Chromium, iPad landscape and iPad portrait. Every active variant follows Minnie → Moose → original third-failure assistance; variants and displayed choices stay stable. Hints are verified in both the ordinary companion bar and the existing NPC retry panel. Clock inputs are checked against rendered SVG data.
- ARC dialogue/hint suite: **15 passed** on desktop, including all 96 variants through their existing hint flow, approved copy and event behavior. All generated ARC hint pairs also match the saved pre-edit outputs.
- Existing progression-copy suite: **6 passed**, covering the three Runenpoort levels, prerequisites, earned completion, optional/inactive challenges, blocked counts and progression.
- Older companion preservation and Runenpoort event regressions: **4 passed**, including all 238 ledger rows and the approved five destination corrections.
- Service-worker cache ownership regression: **1 passed**.
- Level validation: **35 production levels and 1 developer level passed**. JavaScript syntax and diff whitespace checks passed.

The initial exhaustive visibility assertion used ARC’s companion-bar selector for every challenge. It was corrected to also inspect the existing NPC retry panel used by Freya and Eivar; no production presentation or NPC behavior changed. The corrected suite passed in all three projects.

No unresolved content or resolver exceptions remain. This migration stops at Runenpoort; Nautilus was not migrated.
