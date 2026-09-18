# Current Atlas learning-challenge catalog

Snapshot generated 2026-09-17T14:58:21.489Z. Source revision: `2481439eb330d45a805c434ce2fd3657e88a554b`. This is a current source export, not a canonical specification or historical-review import.

## Summary

| Measure | Count |
| --- | --- |
| productionLevels | 31 |
| challenges | 108 |
| active | 91 |
| inactive | 17 |
| slots | 432 |
| variants | 864 |
| legacy | 0 |

Production means a manifest entry not marked `developerOnly`; menu visibility, world enablement and challenge inactivity do not remove authored content from this export. Omitted challenge `active` means active. Counts below are authored variants, not player attempts or randomly selected questions. Each of the 432 slots has two alternatives; all alternatives are retained. LVL-0000 is a developer lab with no learning challenges or legacy questions.

### Counts by family

| family | All authored | Active challenge variants | Inactive challenge variants |
| --- | --- | --- | --- |
| bare_multiplication | 344 | 287 | 57 |
| story_multiplication | 160 | 131 | 29 |
| bare_division | 112 | 94 | 18 |
| story_division | 78 | 65 | 13 |
| money | 11 | 11 | 0 |
| route | 11 | 10 | 1 |
| clock_reading_five_minutes | 32 | 32 | 0 |
| clock_reading_quarter | 8 | 8 | 0 |
| clock_reading_half_hour | 8 | 8 | 0 |
| measurement | 8 | 6 | 2 |
| clock_reading | 56 | 56 | 0 |
| spelling | 36 | 20 | 16 |

### Counts by presentation

| presentation | All authored | Active challenge variants | Inactive challenge variants |
| --- | --- | --- | --- |
| bare | 556 | 465 | 91 |
| story | 308 | 263 | 45 |

### Counts by answer_mode

| answer_mode | All authored | Active challenge variants | Inactive challenge variants |
| --- | --- | --- | --- |
| open | 362 | 301 | 61 |
| multipleChoice | 502 | 427 | 75 |

### Counts by analysis_category

| analysis_category | All authored | Active challenge variants | Inactive challenge variants |
| --- | --- | --- | --- |
| multiplication | 504 | 418 | 86 |
| division | 190 | 159 | 31 |
| applied | 30 | 27 | 3 |
| clock | 104 | 104 | 0 |
| other | 36 | 20 | 16 |

Clock coverage: **13 challenges, 52 slots, 104 variants** across 12 production levels. Applied math: money 11, route 11, measurement 8; other 36 (spelling). Multiplication/division family counts exclude these applied families, even when their arithmetic uses multiplication/division.

### Multiplication/division table frequency

Table targets are not authored metadata. Prefer an explicit table number in a hint; otherwise use the second factor of a written multiplication equation or divisor of a written division equation. This convention counts each variant once and does not count both factors as separate exercises. CSV includes the evidence per row; operand conventions are not proof of pedagogical intent. Applied money/route/measurement variants are excluded from this table-practice denominator.

| Table | Multiplication | Division | Combined | Share |
| --- | --- | --- | --- | --- |
| 2 | 32 | 8 | 40 | 5.76% |
| 3 | 45 | 15 | 60 | 8.65% |
| 4 | 46 | 14 | 60 | 8.65% |
| 5 | 33 | 17 | 50 | 7.20% |
| 6 | 74 | 30 | 104 | 14.99% |
| 7 | 87 | 39 | 126 | 18.16% |
| 8 | 91 | 30 | 121 | 17.44% |
| 9 | 65 | 31 | 96 | 13.83% |
| 10 | 31 | 6 | 37 | 5.33% |

## Sources and interpretation

- [Learning-content intent](../../Docs/ATLAS_LEARNING_CONTENT_RULES.md)
- [Schema and linkage](../../Docs/LEVEL_CONTRACT.md)
- [Current runtime](../../src/app.js) and [validator](../../scripts/validate-levels.js)
- All current `Levels/**/*.js` files registering `SVEN_LEVEL_DEFINITIONS` were evaluated in isolated VM contexts; no browser persistence, editor drafts or runtime normalization was applied.
- CSV has one row per authored variant, exact text fields, typed answer JSON, complete raw variant JSON and complete challenge/rune/object metadata. JSON fields distinguish numeric answers from strings and preserve all additional fields.
- Identifiers are scoped by level/challenge/slot; no deduplication was performed. Variant A/B means array order, not an inferred ID suffix.
- All authored text below is retained without shortening or paraphrase. Derived analysis is explicitly separated at the end.

## Level navigation

- [LVL-0001 — De Runenpoort](#level-lvl-0001)
- [LVL-0002 — De Tempelzaal](#level-lvl-0002)
- [LVL-0003 — De Vikinghaven](#level-lvl-0003)
- [LVL-0004 — De Nautilus](#level-lvl-0004)
- [LVL-0005 — Aan boord](#level-lvl-0005)
- [LVL-0006 — De Minisub](#level-lvl-0006)
- [LVL-0007 — Het Tropische Eiland](#level-lvl-0007)
- [LVL-0008 — De Blokkenpoort](#level-lvl-0008)
- [LVL-0009 — De Ontwaakte Kamer](#level-lvl-0009)
- [LVL-0010 — De Strandkamer](#level-lvl-0010)
- [LVL-0011 — De Netherproef](#level-lvl-0011)
- [LVL-0012 — De Weg Naar Huis](#level-lvl-0012)
- [LVL-0013 — Nederland — Het Begin van de Reis](#level-lvl-0013)
- [LVL-0014 — Engeland — De Oude Klokkenstad](#level-lvl-0014)
- [LVL-0015 — Frankrijk — Het Zonnige Dorpsplein](#level-lvl-0015)
- [LVL-0016 — Italië — De Romeinse Route](#level-lvl-0016)
- [LVL-0017 — Oostenrijk — De Alpenpoort](#level-lvl-0017)
- [LVL-0018 — Noorwegen — Het Fjordlicht](#level-lvl-0018)
- [LVL-0019 — Zweden — Het Dorp aan het Water](#level-lvl-0019)
- [LVL-0020 — Rheden — Terug naar de Posbank](#level-lvl-0020)
- [LVL-0021 — Rome](#level-lvl-0021)
- [LVL-0022 — Proceno](#level-lvl-0022)
- [LVL-0023 — Umbrie](#level-lvl-0023)
- [LVL-0024 — Marche](#level-lvl-0024)
- [LVL-0025 — Florence](#level-lvl-0025)
- [LVL-0026 — Vinci](#level-lvl-0026)
- [LVL-0027 — Cairo Museum](#level-lvl-0027)
- [LVL-0028 — Pyramid Build at Giza](#level-lvl-0028)
- [LVL-0029 — Tutanchamon Tomb](#level-lvl-0029)
- [LVL-0030 — Abu Simbel](#level-lvl-0030)
- [LVL-0031 — Cairo Museum Return](#level-lvl-0031)

<a id="level-lvl-0001"></a>

## LVL-0001 — De Runenpoort

Source: [Levels/LVL-0001/level.js](../../Levels/LVL-0001/level.js). Production level.

### Challenge: zon

- State: **active** (active omitted; runtime default is true)
- anchorId: `zon`
- Linked rune(s): zon — Zonrune (objectId: zon)
- Linked object: zon — Zonrune (type: rune)
- challengeCharacterId: `runewachter`
- Families: bare_multiplication, story_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "zon",
  "anchorId": "zon",
  "challengeCharacterId": "runewachter"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "zon"
  }
]
```

#### Slot q1

Authored slot ID: `zon-slot-1`.

**Variant A**

- Variant ID: `zon-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 50
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 5 groepjes van 10 eindigen op nul.
- Explanation: 5 × 10 = 50.

**Variant B**

- Variant ID: `zon-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: [24,32,40,48]
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

#### Slot q2

Authored slot ID: `zon-slot-2`.

**Variant A**

- Variant ID: `zon-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Rond het zonneteken liggen 4 kringen met elk 7 gouden schijfjes. Hoeveel schijfjes zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- Explanation: 4 × 7 = 28.

**Variant B**

- Variant ID: `zon-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 2 twee keer.
- Explanation: 2 × 4 = 8.

#### Slot q3

Authored slot ID: `zon-slot-3`.

**Variant A**

- Variant ID: `zon-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 9 = ?
- Visual data: not authored
- Choices: [63,72,81,90]
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 8 en haal 8 eraf.
- Explanation: 8 × 9 = 72.

**Variant B**

- Variant ID: `zon-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 5 sprongen van 5.
- Explanation: 5 × 5 = 25.

#### Slot q4

Authored slot ID: `zon-slot-4`.

**Variant A**

- Variant ID: `zon-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 7 = ?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 8 en 2 × 8.
- Explanation: 8 × 7 = 56.

**Variant B**

- Variant ID: `zon-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 35 : 5 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 7 = 35, is 35 : 5 = 7.
- Explanation: 35 : 5 = 7.

### Challenge: steen

- State: **active** (active omitted; runtime default is true)
- anchorId: `steen`
- Linked rune(s): steen — Steenrune (objectId: steen)
- Linked object: steen — Steenrune (type: rune)
- challengeCharacterId: `runewachter`
- Families: story_multiplication, bare_multiplication, bare_division, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "steen",
  "anchorId": "steen",
  "challengeCharacterId": "runewachter"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "steen"
  }
]
```

#### Slot q1

Authored slot ID: `steen-slot-1`.

**Variant A**

- Variant ID: `steen-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Voor het steenteken bouwt de Viking 3 stapels van 8 stenen. Hoeveel stenen gebruikt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 3 drie keer.
- Explanation: 3 × 8 = 24.

**Variant B**

- Variant ID: `steen-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 6 = ?
- Visual data: not authored
- Choices: [6,12,18,24]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 2 en tel nog 2 erbij.
- Explanation: 2 × 6 = 12.

#### Slot q2

Authored slot ID: `steen-slot-2`.

**Variant A**

- Variant ID: `steen-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 70
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 7 groepjes van 10 eindigen op nul.
- Explanation: 7 × 10 = 70.

**Variant B**

- Variant ID: `steen-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 6 en verdubbel dat.
- Explanation: 6 × 8 = 48.

#### Slot q3

Authored slot ID: `steen-slot-3`.

**Variant A**

- Variant ID: `steen-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 20 : 5 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 4 = 20, is 20 : 5 = 4.
- Explanation: 20 : 5 = 4.

**Variant B**

- Variant ID: `steen-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 8 = ?
- Visual data: not authored
- Choices: [56,64,72,80]
- Correct answer: 64
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 8 en verdubbel dat.
- Explanation: 8 × 8 = 64.

#### Slot q4

Authored slot ID: `steen-slot-4`.

**Variant A**

- Variant ID: `steen-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 2 en haal 2 eraf.
- Explanation: 2 × 9 = 18.

**Variant B**

- Variant ID: `steen-4b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De Viking verdeelt 63 stenen eerlijk over 7 bouwers. Hoeveel stenen krijgt iedere bouwer?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel 63 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 63.
- Explanation: 63 : 7 = 9.

### Challenge: wind

- State: **active** (active omitted; runtime default is true)
- anchorId: `wind`
- Linked rune(s): wind — Windrune (objectId: wind)
- Linked object: wind — Windrune (type: rune)
- challengeCharacterId: `runewachter`
- Families: bare_division, bare_multiplication, money, story_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "wind",
  "anchorId": "wind",
  "challengeCharacterId": "runewachter",
  "presentationType": "npc",
  "requiresAllOtherChallenges": true,
  "unlocksLevelProgression": true,
  "npc": {
    "characterId": "freya",
    "displayName": "Freya",
    "scale": 1.23,
    "facing": "native",
    "brightness": 1,
    "idleIntervalMinMs": 2500,
    "idleIntervalMaxMs": 4500,
    "playbackRate": 1,
    "successIdleBeatMs": 650
  }
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "wind"
  }
]
```

#### Slot q1

Authored slot ID: `wind-slot-1`.

**Variant A**

- Variant ID: `wind-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 14 : 7 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 2 = 14, is 14 : 7 = 2.
- Explanation: 14 : 7 = 2.

**Variant B**

- Variant ID: `wind-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 6.
- Explanation: 6 × 2 = 12.

#### Slot q2

Authored slot ID: `wind-slot-2`.

**Variant A**

- Variant ID: `wind-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 36 : 4 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 4 helpt?
- hintMoose: Omdat 4 × 9 = 36, is 36 : 4 = 9.
- Explanation: 36 : 4 = 9.

**Variant B**

- Variant ID: `wind-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 24 : 6 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 4 = 24, is 24 : 6 = 4.
- Explanation: 24 : 6 = 4.

#### Slot q3

Authored slot ID: `wind-slot-3`.

**Variant A**

- Variant ID: `wind-3a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Op de havenmarkt koopt de Viking 5 vlaggen voor 6 munten per stuk. Hoeveel munten betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Er zijn 5 gelijke bedragen van 6 munten.
- hintMoose: Reken 5 × 5 en tel er nog 5 bij op.
- Explanation: 5 × 6 = 30 munten.

**Variant B**

- Variant ID: `wind-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De Viking verdeelt 25 gekleurde linten eerlijk over 5 vlaggenmasten. Hoeveel linten komen aan iedere mast?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Verdeel 25 eerlijk over 5 gelijke groepen.
- hintMoose: Zoek in de tafel van 5 welk getal uitkomt op 25.
- Explanation: 25 : 5 = 5.

#### Slot q4

Authored slot ID: `wind-slot-4`.

**Variant A**

- Variant ID: `wind-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Aan 8 vlaggenmasten hangen elk 7 linten. Hoeveel linten hangen er in totaal?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- Explanation: 8 × 7 = 56.

**Variant B**

- Variant ID: `wind-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Aan 6 vlaggenmasten hangen elk 4 linten. Hoeveel linten hangen er in totaal?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 6 en verdubbel de uitkomst nog eens.
- Explanation: 6 × 4 = 24.

<a id="level-lvl-0002"></a>

## LVL-0002 — De Tempelzaal

Source: [Levels/LVL-0002/level.js](../../Levels/LVL-0002/level.js). Production level.

### Challenge: shieldWall

- State: **active** (active omitted; runtime default is true)
- anchorId: `shieldWall`
- Linked rune(s): shieldWall — Schildenmuur (objectId: shieldWall)
- Linked object: shieldWall — Schildenmuur (type: rune)
- challengeCharacterId: `steenpriester`
- Families: bare_division, story_multiplication, bare_multiplication, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "shieldWall",
  "anchorId": "shieldWall",
  "challengeCharacterId": "steenpriester"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "shieldWall"
  }
]
```

#### Slot q1

Authored slot ID: `shieldWall-slot-1`.

**Variant A**

- Variant ID: `shieldWall-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 18 : 3 = ?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 3 helpt?
- hintMoose: Omdat 3 × 6 = 18, is 18 : 3 = 6.
- Explanation: 18 : 3 = 6.

**Variant B**

- Variant ID: `shieldWall-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Aan de schildenmuur hangen 7 rijen met elk 3 schilden. Hoeveel schilden hangen er?
- Visual data: not authored
- Choices: not authored
- Correct answer: 21
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 3.
- hintMoose: Verdubbel 7 en tel er nog 7 bij op.
- Explanation: 7 × 3 = 21.

#### Slot q2

Authored slot ID: `shieldWall-slot-2`.

**Variant A**

- Variant ID: `shieldWall-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 6 = ?
- Visual data: not authored
- Choices: [12,18,24,30]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 3 en tel nog 3 erbij.
- Explanation: 3 × 6 = 18.

**Variant B**

- Variant ID: `shieldWall-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 7 en haal 7 eraf.
- Explanation: 7 × 9 = 63.

#### Slot q3

Authored slot ID: `shieldWall-slot-3`.

**Variant A**

- Variant ID: `shieldWall-3a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: De Viking verdeelt 30 schilden eerlijk over 6 wachters. Hoeveel schilden krijgt iedere wachter?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 30 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 30.
- Explanation: 30 : 6 = 5.

**Variant B**

- Variant ID: `shieldWall-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De Viking verdeelt 36 schilden eerlijk over 6 wachters. Hoeveel schilden krijgt iedere wachter?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel 36 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 36.
- Explanation: 36 : 6 = 6.

#### Slot q4

Authored slot ID: `shieldWall-slot-4`.

**Variant A**

- Variant ID: `shieldWall-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 6 : 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 2 helpt?
- hintMoose: Omdat 2 × 3 = 6, is 6 : 2 = 3.
- Explanation: 6 : 2 = 3.

**Variant B**

- Variant ID: `shieldWall-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Tegen de schildenmuur staan 2 rekken met elk 8 schilden. Hoeveel schilden zijn dat samen?
- Visual data: not authored
- Choices: [8,16,24,32]
- Correct answer: 16
- hintMinnie: Er zijn 2 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 2 drie keer.
- Explanation: 2 × 8 = 16.

### Challenge: mapTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `mapTable`
- Linked rune(s): mapTable — Kaarttafel (objectId: mapTable)
- Linked object: mapTable — Kaarttafel (type: rune)
- challengeCharacterId: `steenpriester`
- Families: story_multiplication, bare_division, bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "mapTable",
  "anchorId": "mapTable",
  "challengeCharacterId": "steenpriester"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "mapTable"
  }
]
```

#### Slot q1

Authored slot ID: `mapTable-slot-1`.

**Variant A**

- Variant ID: `mapTable-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de kaarttafel liggen 3 rijen met elk 8 houten pionnen. Hoeveel pionnen liggen er?
- Visual data: not authored
- Choices: [16,24,32,40]
- Correct answer: 24
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 3 drie keer.
- Explanation: 3 × 8 = 24.

**Variant B**

- Variant ID: `mapTable-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 32 : 4 = ?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Welke som uit de tafel van 4 helpt?
- hintMoose: Omdat 4 × 8 = 32, is 32 : 4 = 8.
- Explanation: 32 : 4 = 8.

#### Slot q2

Authored slot ID: `mapTable-slot-2`.

**Variant A**

- Variant ID: `mapTable-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de kaarttafel liggen 9 rijen met elk 4 houten pionnen. Hoeveel pionnen liggen er?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 9 en verdubbel de uitkomst nog eens.
- Explanation: 9 × 4 = 36.

**Variant B**

- Variant ID: `mapTable-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 6 en verdubbel dat.
- Explanation: 6 × 8 = 48.

#### Slot q3

Authored slot ID: `mapTable-slot-3`.

**Variant A**

- Variant ID: `mapTable-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

**Variant B**

- Variant ID: `mapTable-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de kaarttafel liggen 7 rijen met elk 7 houten pionnen. Hoeveel pionnen liggen er?
- Visual data: not authored
- Choices: [42,49,56,63]
- Correct answer: 49
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 7 × 5 en 7 × 2 en tel de uitkomsten op.
- Explanation: 7 × 7 = 49.

#### Slot q4

Authored slot ID: `mapTable-slot-4`.

**Variant A**

- Variant ID: `mapTable-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 3 = ?
- Visual data: not authored
- Choices: [9,12,15,18]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 4 en tel nog 4 erbij.
- Explanation: 4 × 3 = 12.

**Variant B**

- Variant ID: `mapTable-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 27 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 3 = 27, is 27 : 9 = 3.
- Explanation: 27 : 9 = 3.

### Challenge: fireBowl

- State: **active** (active omitted; runtime default is true)
- anchorId: `fireBowl`
- Linked rune(s): fireBowl — Vuurschaal (objectId: fireBowl)
- Linked object: fireBowl — Vuurschaal (type: rune)
- challengeCharacterId: `steenpriester`
- Families: bare_multiplication, story_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "fireBowl",
  "anchorId": "fireBowl",
  "challengeCharacterId": "steenpriester"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "fireBowl"
  }
]
```

#### Slot q1

Authored slot ID: `fireBowl-slot-1`.

**Variant A**

- Variant ID: `fireBowl-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 9 en tel nog 9 erbij.
- Explanation: 9 × 6 = 54.

**Variant B**

- Variant ID: `fireBowl-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Naast de vuurschaal liggen 6 stapels van 10 houtblokken. Hoeveel houtblokken zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 60
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 10.
- hintMoose: Vermenigvuldig 6 met 10: zet een nul achter 6.
- Explanation: 6 × 10 = 60.

#### Slot q2

Authored slot ID: `fireBowl-slot-2`.

**Variant A**

- Variant ID: `fireBowl-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Naast de vuurschaal liggen 7 stapels van 10 houtblokken. Hoeveel houtblokken zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 70
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 10.
- hintMoose: Vermenigvuldig 7 met 10: zet een nul achter 7.
- Explanation: 7 × 10 = 70.

**Variant B**

- Variant ID: `fireBowl-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 15 : 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 3 = 15, is 15 : 5 = 3.
- Explanation: 15 : 5 = 3.

#### Slot q3

Authored slot ID: `fireBowl-slot-3`.

**Variant A**

- Variant ID: `fireBowl-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 9.
- Explanation: 9 × 2 = 18.

**Variant B**

- Variant ID: `fireBowl-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 9 = ?
- Visual data: not authored
- Choices: [72,81,90,99]
- Correct answer: 81
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 9 en haal 9 eraf.
- Explanation: 9 × 9 = 81.

#### Slot q4

Authored slot ID: `fireBowl-slot-4`.

**Variant A**

- Variant ID: `fireBowl-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 42 : 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 7 = 42, is 42 : 6 = 7.
- Explanation: 42 : 6 = 7.

**Variant B**

- Variant ID: `fireBowl-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 7 = ?
- Visual data: not authored
- Choices: [56,63,70,77]
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 9 en 2 × 9.
- Explanation: 9 × 7 = 63.

### Challenge: shipModel

- State: **active** (active omitted; runtime default is true)
- anchorId: `shipModel`
- Linked rune(s): shipModel — Scheepsmodel (objectId: shipModel)
- Linked object: shipModel — Scheepsmodel (type: rune)
- challengeCharacterId: `steenpriester`
- Families: bare_multiplication, story_division, route
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "shipModel",
  "anchorId": "shipModel",
  "challengeCharacterId": "steenpriester"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "shipModel"
  }
]
```

#### Slot q1

Authored slot ID: `shipModel-slot-1`.

**Variant A**

- Variant ID: `shipModel-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 7 twee keer.
- Explanation: 7 × 4 = 28.

**Variant B**

- Variant ID: `shipModel-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 3 = ?
- Visual data: not authored
- Choices: [18,21,24,27]
- Correct answer: 21
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 7 en tel nog 7 erbij.
- Explanation: 7 × 3 = 21.

#### Slot q2

Authored slot ID: `shipModel-slot-2`.

**Variant A**

- Variant ID: `shipModel-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 9 twee keer.
- Explanation: 9 × 4 = 36.

**Variant B**

- Variant ID: `shipModel-2b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: De Viking verdeelt 35 planken eerlijk over 7 scheepsbouwers. Hoeveel planken krijgt iedere scheepsbouwer?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 35 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 35.
- Explanation: 35 : 7 = 5.

#### Slot q3

Authored slot ID: `shipModel-slot-3`.

**Variant A**

- Variant ID: `shipModel-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 6 = ?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 5 en tel nog 5 erbij.
- Explanation: 5 × 6 = 30.

**Variant B**

- Variant ID: `shipModel-3b`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: Een touw van 9 meter wordt in 3 gelijke stukken geknipt. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Verdeel de totale lengte eerlijk over 3 gelijke stukken.
- hintMoose: Zoek in de tafel van 3 welk getal uitkomt op 9.
- Explanation: 9 : 3 = 3 meter.

#### Slot q4

Authored slot ID: `shipModel-slot-4`.

**Variant A**

- Variant ID: `shipModel-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 4 = ?
- Visual data: not authored
- Choices: [16,20,24,28]
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 5 twee keer.
- Explanation: 5 × 4 = 20.

**Variant B**

- Variant ID: `shipModel-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 7 = ?
- Visual data: not authored
- Choices: [56,63,70,77]
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 9 en 2 × 9.
- Explanation: 9 × 7 = 63.

<a id="level-lvl-0003"></a>

## LVL-0003 — De Vikinghaven

Source: [Levels/LVL-0003/level.js](../../Levels/LVL-0003/level.js). Production level.

### Challenge: harborMap

- State: **active** (active omitted; runtime default is true)
- anchorId: `harborMap`
- Linked rune(s): harborMap — Havenkaart (objectId: harborMap)
- Linked object: harborMap — Havenkaart (type: rune)
- challengeCharacterId: `eivar`
- Families: bare_multiplication, money, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "harborMap",
  "anchorId": "harborMap",
  "challengeCharacterId": "eivar"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "harborMap"
  }
]
```

#### Slot q1

Authored slot ID: `harborMap-slot-1`.

**Variant A**

- Variant ID: `harborMap-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 14
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 2 en 2 × 2.
- Explanation: 2 × 7 = 14.

**Variant B**

- Variant ID: `harborMap-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

#### Slot q2

Authored slot ID: `harborMap-slot-2`.

**Variant A**

- Variant ID: `harborMap-2a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: In de haven koopt de Viking 4 zeekaarten voor 7 munten per stuk. Hoeveel munten betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Er zijn 4 gelijke bedragen van 7 munten.
- hintMoose: Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- Explanation: 4 × 7 = 28 munten.

**Variant B**

- Variant ID: `harborMap-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 3 sprongen van 5.
- Explanation: 3 × 5 = 15.

#### Slot q3

Authored slot ID: `harborMap-slot-3`.

**Variant A**

- Variant ID: `harborMap-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 2 en tel nog 2 erbij.
- Explanation: 2 × 3 = 6.

**Variant B**

- Variant ID: `harborMap-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: De havenmeester verdeelt 49 houten routepionnen eerlijk over 7 zeekaarten. Hoeveel pionnen komen op iedere kaart?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Verdeel 49 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 49.
- Explanation: 49 : 7 = 7.

#### Slot q4

Authored slot ID: `harborMap-slot-4`.

**Variant A**

- Variant ID: `harborMap-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 7 = ?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 8 en 2 × 8.
- Explanation: 8 × 7 = 56.

**Variant B**

- Variant ID: `harborMap-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 5 en tel nog 5 erbij.
- Explanation: 5 × 3 = 15.

### Challenge: shipCompass

- State: **active** (active omitted; runtime default is true)
- anchorId: `shipCompass`
- Linked rune(s): shipCompass — Scheepsklok (objectId: shipCompass)
- Linked object: shipCompass — Scheepsklok (type: rune)
- challengeCharacterId: `eivar`
- Families: clock_reading_five_minutes
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "shipCompass",
  "anchorId": "shipCompass",
  "challengeCharacterId": "eivar"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "shipCompass"
  }
]
```

#### Slot q1

Authored slot ID: `shipCompass-slot-1`.

**Variant A**

- Variant ID: `shipCompass-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":8,"minute":10}
- Choices: ["Vijf over acht","Tien over acht","Tien voor acht","Kwart over acht"]
- Correct answer: "Tien over acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 2. Dat betekent tien minuten na het hele uur. Kijk welk uur net begonnen is.
- Explanation: Het is tien over acht.

**Variant B**

- Variant ID: `shipCompass-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":4,"minute":20}
- Choices: ["Kwart over vier","Tien voor half vijf","Tien over half vier","Half vijf"]
- Correct answer: "Tien voor half vijf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 4. Dat is twintig minuten na vier, oftewel tien minuten voor half vijf.
- Explanation: Het is tien voor half vijf.

#### Slot q2

Authored slot ID: `shipCompass-slot-2`.

**Variant A**

- Variant ID: `shipCompass-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":6,"minute":25}
- Choices: ["Vijf over zes","Vijf voor half zeven","Half zeven","Vijf over half zeven"]
- Correct answer: "Vijf voor half zeven"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 5. Dat is vijf minuten voor het halve uur dat eraan komt.
- Explanation: Het is vijf voor half zeven.

**Variant B**

- Variant ID: `shipCompass-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":10,"minute":35}
- Choices: ["Half elf","Vijf voor half elf","Vijf over half elf","Vijf voor elf"]
- Correct answer: "Vijf over half elf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 7. Dat is vijf minuten na het halve uur.
- Explanation: Het is vijf over half elf.

#### Slot q3

Authored slot ID: `shipCompass-slot-3`.

**Variant A**

- Variant ID: `shipCompass-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":2,"minute":40}
- Choices: ["Tien voor half drie","Half drie","Tien over half drie","Tien voor drie"]
- Correct answer: "Tien over half drie"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 8. Dat is tien minuten na het halve uur.
- Explanation: Het is tien over half drie.

**Variant B**

- Variant ID: `shipCompass-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":7,"minute":50}
- Choices: ["Tien over zeven","Vijf voor acht","Tien voor acht","Acht uur"]
- Correct answer: "Tien voor acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 10. Vanaf daar zijn het nog tien minuten tot het volgende uur.
- Explanation: Het is tien voor acht.

#### Slot q4

Authored slot ID: `shipCompass-slot-4`.

**Variant A**

- Variant ID: `shipCompass-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":11,"minute":5}
- Choices: ["Vijf voor elf","Vijf over elf","Tien over elf","Elf uur"]
- Correct answer: "Vijf over elf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 1. Elk cijfer is vijf minuten, dus er zijn vijf minuten voorbij.
- Explanation: Het is vijf over elf.

**Variant B**

- Variant ID: `shipCompass-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":1,"minute":55}
- Choices: ["Vijf over één","Tien voor twee","Vijf voor twee","Twee uur"]
- Correct answer: "Vijf voor twee"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer staat op de 11. Vanaf daar duurt het nog vijf minuten tot het volgende uur.
- Explanation: Het is vijf voor twee.

### Challenge: mooringRope

- State: **active** (active omitted; runtime default is true)
- anchorId: `mooringRope`
- Linked rune(s): mooringRope — Touwrol (objectId: mooringRope)
- Linked object: mooringRope — Touwrol (type: rune)
- challengeCharacterId: `eivar`
- Families: bare_multiplication, story_multiplication, route, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "mooringRope",
  "anchorId": "mooringRope",
  "challengeCharacterId": "eivar"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "mooringRope"
  }
]
```

#### Slot q1

Authored slot ID: `mooringRope-slot-1`.

**Variant A**

- Variant ID: `mooringRope-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 6 en tel nog 6 erbij.
- Explanation: 6 × 3 = 18.

**Variant B**

- Variant ID: `mooringRope-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: [24,32,40,48]
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

#### Slot q2

Authored slot ID: `mooringRope-slot-2`.

**Variant A**

- Variant ID: `mooringRope-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: De Viking maakt 3 bundels van 6 touwlussen. Hoeveel touwlussen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 3 × 5 en tel er nog 3 bij op.
- Explanation: 3 × 6 = 18.

**Variant B**

- Variant ID: `mooringRope-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 4 = ?
- Visual data: not authored
- Choices: [4,8,12,16]
- Correct answer: 8
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 2 twee keer.
- Explanation: 2 × 4 = 8.

#### Slot q3

Authored slot ID: `mooringRope-slot-3`.

**Variant A**

- Variant ID: `mooringRope-3a`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: Een meertouw is 18 meter lang. De Viking snijdt het in 2 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 9
- hintMinnie: Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- hintMoose: Zoek in de tafel van 2 welk getal uitkomt op 18.
- Explanation: 18 : 2 = 9 meter.

**Variant B**

- Variant ID: `mooringRope-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: De Viking verdeelt 49 touwlussen eerlijk over 7 boten. Hoeveel touwlussen krijgt iedere boot?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Verdeel 49 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 49.
- Explanation: 49 : 7 = 7.

#### Slot q4

Authored slot ID: `mooringRope-slot-4`.

**Variant A**

- Variant ID: `mooringRope-4a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De Viking verdeelt 42 touwlussen eerlijk over 6 boten. Hoeveel touwlussen krijgt iedere boot?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Verdeel 42 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 42.
- Explanation: 42 : 6 = 7.

**Variant B**

- Variant ID: `mooringRope-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De Viking maakt 8 bundels van 6 touwlussen. Hoeveel touwlussen zijn dat samen?
- Visual data: not authored
- Choices: [42,48,54,60]
- Correct answer: 48
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 8 × 5 en tel er nog 8 bij op.
- Explanation: 8 × 6 = 48.

### Challenge: gateShield

- State: **active** (active omitted; runtime default is true)
- anchorId: `gateShield`
- Linked rune(s): gateShield — Poortschild (objectId: gateShield)
- Linked object: gateShield — Poortschild (type: rune)
- challengeCharacterId: `eivar`
- Families: story_multiplication, bare_division, bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "gateShield",
  "anchorId": "gateShield",
  "challengeCharacterId": "eivar",
  "presentationType": "npc",
  "requiresAllOtherChallenges": true,
  "unlocksLevelProgression": true,
  "npc": {
    "characterId": "eivar",
    "displayName": "Eivar",
    "scale": 1.73,
    "facing": "native",
    "brightness": 0.9,
    "idleIntervalMinMs": 1750,
    "idleIntervalMaxMs": 5000,
    "playbackRate": 1,
    "successIdleBeatMs": 650
  }
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "gateShield"
  }
]
```

#### Slot q1

Authored slot ID: `gateShield-slot-1`.

**Variant A**

- Variant ID: `gateShield-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op 4 poortschilden staan elk 9 runentekens. Hoeveel runentekens zijn dat samen?
- Visual data: not authored
- Choices: [27,36,45,54]
- Correct answer: 36
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 4 × 10 en haal er daarna 4 af.
- Explanation: 4 × 9 = 36.

**Variant B**

- Variant ID: `gateShield-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 32 : 8 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 4 = 32, is 32 : 8 = 4.
- Explanation: 32 : 8 = 4.

#### Slot q2

Authored slot ID: `gateShield-slot-2`.

**Variant A**

- Variant ID: `gateShield-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 5 en verdubbel dat.
- Explanation: 5 × 8 = 40.

**Variant B**

- Variant ID: `gateShield-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 9 = ?
- Visual data: not authored
- Choices: [54,63,72,81]
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 7 en haal 7 eraf.
- Explanation: 7 × 9 = 63.

#### Slot q3

Authored slot ID: `gateShield-slot-3`.

**Variant A**

- Variant ID: `gateShield-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op 7 poortschilden staan elk 8 runentekens. Hoeveel runentekens zijn dat samen?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 7 drie keer.
- Explanation: 7 × 8 = 56.

**Variant B**

- Variant ID: `gateShield-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 81
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 9 en haal 9 eraf.
- Explanation: 9 × 9 = 81.

#### Slot q4

Authored slot ID: `gateShield-slot-4`.

**Variant A**

- Variant ID: `gateShield-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 9 en verdubbel dat.
- Explanation: 9 × 8 = 72.

**Variant B**

- Variant ID: `gateShield-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op 4 poortschilden staan elk 2 runentekens. Hoeveel runentekens zijn dat samen?
- Visual data: not authored
- Choices: [6,8,10,12]
- Correct answer: 8
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 2.
- hintMoose: Verdubbel 4.
- Explanation: 4 × 2 = 8.

<a id="level-lvl-0004"></a>

## LVL-0004 — De Nautilus

Source: [Levels/LVL-0004/level.js](../../Levels/LVL-0004/level.js). Production level.

### Challenge: harborMap

- State: **active** (active omitted; runtime default is true)
- anchorId: `harborMap`
- Linked rune(s): harborMap — Havenkaart (objectId: harborMap)
- Linked object: harborMap — Havenkaart (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_division, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "harborMap",
  "anchorId": "harborMap",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "harborMap"
  }
]
```

#### Slot q1

Authored slot ID: `harborMap-slot-1`.

**Variant A**

- Variant ID: `harborMap-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 63 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 7 = 63, is 63 : 9 = 7.
- Explanation: 63 : 9 = 7.

**Variant B**

- Variant ID: `harborMap-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 56 : 8 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 7 = 56, is 56 : 8 = 7.
- Explanation: 56 : 8 = 7.

#### Slot q2

Authored slot ID: `harborMap-slot-2`.

**Variant A**

- Variant ID: `harborMap-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 49
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 7 en 2 × 7.
- Explanation: 7 × 7 = 49.

**Variant B**

- Variant ID: `harborMap-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de havenkaart staan 7 routes met elk 6 meetpunten. Hoeveel meetpunten staan er in totaal?
- Visual data: not authored
- Choices: [36,42,48,54]
- Correct answer: 42
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 7 × 5 en tel er nog 7 bij op.
- Explanation: 7 × 6 = 42.

#### Slot q3

Authored slot ID: `harborMap-slot-3`.

**Variant A**

- Variant ID: `harborMap-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 63 : 7 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 9 = 63, is 63 : 7 = 9.
- Explanation: 63 : 7 = 9.

**Variant B**

- Variant ID: `harborMap-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 10 = ?
- Visual data: not authored
- Choices: [40,50,60,70]
- Correct answer: 50
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 5 groepjes van 10 eindigen op nul.
- Explanation: 5 × 10 = 50.

#### Slot q4

Authored slot ID: `harborMap-slot-4`.

**Variant A**

- Variant ID: `harborMap-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de havenkaart staan 9 routes met elk 5 meetpunten. Hoeveel meetpunten staan er in totaal?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 5.
- hintMoose: Tel 9 sprongen van 5.
- Explanation: 9 × 5 = 45.

**Variant B**

- Variant ID: `harborMap-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 2 sprongen van 5.
- Explanation: 2 × 5 = 10.

### Challenge: brassTelescope

- State: **active** (active omitted; runtime default is true)
- anchorId: `brassTelescope`
- Linked rune(s): brassTelescope — Koperen kijker (objectId: brassTelescope)
- Linked object: brassTelescope — Koperen kijker (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "brassTelescope",
  "anchorId": "brassTelescope",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "brassTelescope"
  }
]
```

#### Slot q1

Authored slot ID: `brassTelescope-slot-1`.

**Variant A**

- Variant ID: `brassTelescope-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 6 = ?
- Visual data: not authored
- Choices: [18,24,30,36]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 4 en tel nog 4 erbij.
- Explanation: 4 × 6 = 24.

**Variant B**

- Variant ID: `brassTelescope-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 3 twee keer.
- Explanation: 3 × 4 = 12.

#### Slot q2

Authored slot ID: `brassTelescope-slot-2`.

**Variant A**

- Variant ID: `brassTelescope-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 49 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 7 = 49, is 49 : 7 = 7.
- Explanation: 49 : 7 = 7.

**Variant B**

- Variant ID: `brassTelescope-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 8 = ?
- Visual data: not authored
- Choices: [64,72,80,88]
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 9 en verdubbel dat.
- Explanation: 9 × 8 = 72.

#### Slot q3

Authored slot ID: `brassTelescope-slot-3`.

**Variant A**

- Variant ID: `brassTelescope-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 8 = ?
- Visual data: not authored
- Choices: [8,16,24,32]
- Correct answer: 16
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 2 en verdubbel dat.
- Explanation: 2 × 8 = 16.

**Variant B**

- Variant ID: `brassTelescope-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nemo bekijkt 5 sterrenbeelden met elk 10 heldere sterren. Hoeveel sterren ziet hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 50
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 10.
- hintMoose: Vermenigvuldig 5 met 10: zet een nul achter 5.
- Explanation: 5 × 10 = 50.

#### Slot q4

Authored slot ID: `brassTelescope-slot-4`.

**Variant A**

- Variant ID: `brassTelescope-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Nemo bekijkt 9 sterrenbeelden met elk 5 heldere sterren. Hoeveel sterren ziet hij?
- Visual data: not authored
- Choices: [40,45,50,55]
- Correct answer: 45
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 5.
- hintMoose: Tel 9 sprongen van 5.
- Explanation: 9 × 5 = 45.

**Variant B**

- Variant ID: `brassTelescope-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Nemo bekijkt 3 sterrenbeelden met elk 6 heldere sterren. Hoeveel sterren ziet hij?
- Visual data: not authored
- Choices: [12,18,24,30]
- Correct answer: 18
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 3 × 5 en tel er nog 3 bij op.
- Explanation: 3 × 6 = 18.

### Challenge: nautilusLight

- State: **active** (active omitted; runtime default is true)
- anchorId: `nautilusLight`
- Linked rune(s): nautilusLight — Nautiluslamp (objectId: nautilusLight)
- Linked object: nautilusLight — Nautiluslamp (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: money, bare_multiplication, bare_division, route, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "nautilusLight",
  "anchorId": "nautilusLight",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "nautilusLight"
  }
]
```

#### Slot q1

Authored slot ID: `nautilusLight-slot-1`.

**Variant A**

- Variant ID: `nautilusLight-1a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Nemo koopt 8 reservelampen voor 10 munten per stuk. Hoeveel munten betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 80
- hintMinnie: Er zijn 8 gelijke bedragen van 10 munten.
- hintMoose: Vermenigvuldig 8 met 10: zet een nul achter 8.
- Explanation: 8 × 10 = 80 munten.

**Variant B**

- Variant ID: `nautilusLight-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q2

Authored slot ID: `nautilusLight-slot-2`.

**Variant A**

- Variant ID: `nautilusLight-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 64 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 8 = 64, is 64 : 8 = 8.
- Explanation: 64 : 8 = 8.

**Variant B**

- Variant ID: `nautilusLight-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 3 = ?
- Visual data: not authored
- Choices: [9,12,15,18]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 4 en tel nog 4 erbij.
- Explanation: 4 × 3 = 12.

#### Slot q3

Authored slot ID: `nautilusLight-slot-3`.

**Variant A**

- Variant ID: `nautilusLight-3a`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: Een kabel naar de Nautiluslamp is 16 meter lang. Hij wordt in 8 gelijke stukken verdeeld. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 2
- hintMinnie: Verdeel de totale lengte eerlijk over 8 gelijke stukken.
- hintMoose: Zoek in de tafel van 8 welk getal uitkomt op 16.
- Explanation: 16 : 8 = 2 meter.

**Variant B**

- Variant ID: `nautilusLight-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: De Nautiluslamp heeft 9 ringen met elk 6 lichtpunten. Hoeveel lichtpunten zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 9 × 5 en tel er nog 9 bij op.
- Explanation: 9 × 6 = 54.

#### Slot q4

Authored slot ID: `nautilusLight-slot-4`.

**Variant A**

- Variant ID: `nautilusLight-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 21
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 3 en 2 × 3.
- Explanation: 3 × 7 = 21.

**Variant B**

- Variant ID: `nautilusLight-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 40 : 8 = ?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 5 = 40, is 40 : 8 = 5.
- Explanation: 40 : 8 = 5.

<a id="level-lvl-0005"></a>

## LVL-0005 — Aan boord

Source: [Levels/LVL-0005/level.js](../../Levels/LVL-0005/level.js). Production level.

### Challenge: captainChart

- State: **active** (active omitted; runtime default is true)
- anchorId: `captainChart`
- Linked rune(s): captainChart — Kapiteinskaart (objectId: captainChart)
- Linked object: captainChart — Kapiteinskaart (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: story_multiplication, bare_multiplication, story_division, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "captainChart",
  "anchorId": "captainChart",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "captainChart"
  }
]
```

#### Slot q1

Authored slot ID: `captainChart-slot-1`.

**Variant A**

- Variant ID: `captainChart-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de kapiteinskaart staan 8 routes met elk 10 koerspunten. Hoeveel koerspunten staan er in totaal?
- Visual data: not authored
- Choices: not authored
- Correct answer: 80
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 10.
- hintMoose: Vermenigvuldig 8 met 10: zet een nul achter 8.
- Explanation: 8 × 10 = 80.

**Variant B**

- Variant ID: `captainChart-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 3 twee keer.
- Explanation: 3 × 4 = 12.

#### Slot q2

Authored slot ID: `captainChart-slot-2`.

**Variant A**

- Variant ID: `captainChart-2a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Nemo verdeelt 36 koerspunten eerlijk over 6 routes. Hoeveel koerspunten krijgt iedere route?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel 36 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 36.
- Explanation: 36 : 6 = 6.

**Variant B**

- Variant ID: `captainChart-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de kapiteinskaart staan 4 routes met elk 3 koerspunten. Hoeveel koerspunten staan er in totaal?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 3.
- hintMoose: Verdubbel 4 en tel er nog 4 bij op.
- Explanation: 4 × 3 = 12.

#### Slot q3

Authored slot ID: `captainChart-slot-3`.

**Variant A**

- Variant ID: `captainChart-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 63 : 7 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 9 = 63, is 63 : 7 = 9.
- Explanation: 63 : 7 = 9.

**Variant B**

- Variant ID: `captainChart-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 4 = ?
- Visual data: not authored
- Choices: [24,28,32,36]
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 7 twee keer.
- Explanation: 7 × 4 = 28.

#### Slot q4

Authored slot ID: `captainChart-slot-4`.

**Variant A**

- Variant ID: `captainChart-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 5 en haal 5 eraf.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `captainChart-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 3 en tel nog 3 erbij.
- Explanation: 3 × 6 = 18.

### Challenge: mainPorthole

- State: **active** (active omitted; runtime default is true)
- anchorId: `mainPorthole`
- Linked rune(s): mainPorthole — Groot raam (objectId: mainPorthole)
- Linked object: mainPorthole — Groot raam (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: story_multiplication, story_division, bare_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "mainPorthole",
  "anchorId": "mainPorthole",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "mainPorthole"
  }
]
```

#### Slot q1

Authored slot ID: `mainPorthole-slot-1`.

**Variant A**

- Variant ID: `mainPorthole-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Door het grote raam zwemmen 4 scholen met elk 6 vissen. Hoeveel vissen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 4 × 5 en tel er nog 4 bij op.
- Explanation: 4 × 6 = 24.

**Variant B**

- Variant ID: `mainPorthole-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Door het grote raam zwemmen 42 vissen in 7 even grote scholen. Hoeveel vissen zitten in iedere school?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Verdeel 42 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 42.
- Explanation: 42 : 7 = 6.

#### Slot q2

Authored slot ID: `mainPorthole-slot-2`.

**Variant A**

- Variant ID: `mainPorthole-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 4 = ?
- Visual data: not authored
- Choices: [12,16,20,24]
- Correct answer: 16
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 4 twee keer.
- Explanation: 4 × 4 = 16.

**Variant B**

- Variant ID: `mainPorthole-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Door het grote raam zwemmen 9 scholen met elk 8 vissen. Hoeveel vissen zijn dat samen?
- Visual data: not authored
- Choices: [64,72,80,88]
- Correct answer: 72
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 9 drie keer.
- Explanation: 9 × 8 = 72.

#### Slot q3

Authored slot ID: `mainPorthole-slot-3`.

**Variant A**

- Variant ID: `mainPorthole-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 5 en tel nog 5 erbij.
- Explanation: 5 × 3 = 15.

**Variant B**

- Variant ID: `mainPorthole-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Door het grote raam zwemmen 36 vissen in 9 even grote scholen. Hoeveel vissen zitten in iedere school?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Verdeel 36 eerlijk over 9 gelijke groepen.
- hintMoose: Zoek in de tafel van 9 welk getal uitkomt op 36.
- Explanation: 36 : 9 = 4.

#### Slot q4

Authored slot ID: `mainPorthole-slot-4`.

**Variant A**

- Variant ID: `mainPorthole-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 45 : 5 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 9 = 45, is 45 : 5 = 9.
- Explanation: 45 : 5 = 9.

**Variant B**

- Variant ID: `mainPorthole-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 9 twee keer.
- Explanation: 9 × 4 = 36.

### Challenge: logbookDesk

- State: **active** (active omitted; runtime default is true)
- anchorId: `logbookDesk`
- Linked rune(s): logbookDesk — Logboektafel (objectId: logbookDesk)
- Linked object: logbookDesk — Logboektafel (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: story_division, bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "logbookDesk",
  "anchorId": "logbookDesk",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "logbookDesk"
  }
]
```

#### Slot q1

Authored slot ID: `logbookDesk-slot-1`.

**Variant A**

- Variant ID: `logbookDesk-1a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Nemo verdeelt 8 aantekeningen over 4 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Verdeel 8 eerlijk over 4 gelijke groepen.
- hintMoose: Zoek in de tafel van 4 welk getal uitkomt op 8.
- Explanation: 8 : 4 = 2.

**Variant B**

- Variant ID: `logbookDesk-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 5 = ?
- Visual data: not authored
- Choices: [15,20,25,30]
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 4 sprongen van 5.
- Explanation: 4 × 5 = 20.

#### Slot q2

Authored slot ID: `logbookDesk-slot-2`.

**Variant A**

- Variant ID: `logbookDesk-2a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Nemo verdeelt 36 aantekeningen over 6 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel 36 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 36.
- Explanation: 36 : 6 = 6.

**Variant B**

- Variant ID: `logbookDesk-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 42 : 6 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 7 = 42, is 42 : 6 = 7.
- Explanation: 42 : 6 = 7.

#### Slot q3

Authored slot ID: `logbookDesk-slot-3`.

**Variant A**

- Variant ID: `logbookDesk-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: In het logboek staan 2 pagina's met elk 8 aantekeningen. Hoeveel aantekeningen zijn dat samen?
- Visual data: not authored
- Choices: [8,16,24,32]
- Correct answer: 16
- hintMinnie: Er zijn 2 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 2 drie keer.
- Explanation: 2 × 8 = 16.

**Variant B**

- Variant ID: `logbookDesk-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 7 twee keer.
- Explanation: 7 × 4 = 28.

#### Slot q4

Authored slot ID: `logbookDesk-slot-4`.

**Variant A**

- Variant ID: `logbookDesk-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 5 en haal 5 eraf.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `logbookDesk-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: In het logboek staan 4 pagina's met elk 7 aantekeningen. Hoeveel aantekeningen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- Explanation: 4 × 7 = 28.

<a id="level-lvl-0006"></a>

## LVL-0006 — De Minisub

Source: [Levels/LVL-0006/level.js](../../Levels/LVL-0006/level.js). Production level.

### Challenge: divingSuit

- State: **active** (active omitted; runtime default is true)
- anchorId: `divingSuit`
- Linked rune(s): divingSuit — Duikpak (objectId: divingSuit)
- Linked object: divingSuit — Duikpak (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_multiplication, story_multiplication, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "divingSuit",
  "anchorId": "divingSuit",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "divingSuit"
  }
]
```

#### Slot q1

Authored slot ID: `divingSuit-slot-1`.

**Variant A**

- Variant ID: `divingSuit-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 27
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 9 en tel nog 9 erbij.
- Explanation: 9 × 3 = 27.

**Variant B**

- Variant ID: `divingSuit-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q2

Authored slot ID: `divingSuit-slot-2`.

**Variant A**

- Variant ID: `divingSuit-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 64
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 8 en verdubbel dat.
- Explanation: 8 × 8 = 64.

**Variant B**

- Variant ID: `divingSuit-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Aan 5 duikpakken zitten elk 4 koperen sluitingen. Hoeveel sluitingen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 20
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 5 en verdubbel de uitkomst nog eens.
- Explanation: 5 × 4 = 20.

#### Slot q3

Authored slot ID: `divingSuit-slot-3`.

**Variant A**

- Variant ID: `divingSuit-3a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Nemo verdeelt 15 koperen sluitingen eerlijk over 3 duikpakken. Hoeveel sluitingen krijgt ieder pak?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 15 eerlijk over 3 gelijke groepen.
- hintMoose: Zoek in de tafel van 3 welk getal uitkomt op 15.
- Explanation: 15 : 3 = 5.

**Variant B**

- Variant ID: `divingSuit-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Nemo verdeelt 10 koperen sluitingen eerlijk over 2 duikpakken. Hoeveel sluitingen krijgt ieder pak?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 10 eerlijk over 2 gelijke groepen.
- hintMoose: Zoek in de tafel van 2 welk getal uitkomt op 10.
- Explanation: 10 : 2 = 5.

#### Slot q4

Authored slot ID: `divingSuit-slot-4`.

**Variant A**

- Variant ID: `divingSuit-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 21
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 3 en 2 × 3.
- Explanation: 3 × 7 = 21.

**Variant B**

- Variant ID: `divingSuit-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Aan 6 duikpakken zitten elk 9 koperen sluitingen. Hoeveel sluitingen zijn dat samen?
- Visual data: not authored
- Choices: [45,54,63,72]
- Correct answer: 54
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 6 × 10 en haal er daarna 6 af.
- Explanation: 6 × 9 = 54.

### Challenge: miniSub

- State: **active** (active omitted; runtime default is true)
- anchorId: `miniSub`
- Linked rune(s): miniSub — Minisub (objectId: miniSub)
- Linked object: miniSub — Minisub (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_division, bare_multiplication, money
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "miniSub",
  "anchorId": "miniSub",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "miniSub"
  }
]
```

#### Slot q1

Authored slot ID: `miniSub-slot-1`.

**Variant A**

- Variant ID: `miniSub-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 27 : 3 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 3 helpt?
- hintMoose: Omdat 3 × 9 = 27, is 27 : 3 = 9.
- Explanation: 27 : 3 = 9.

**Variant B**

- Variant ID: `miniSub-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 4 sprongen van 5.
- Explanation: 4 × 5 = 20.

#### Slot q2

Authored slot ID: `miniSub-slot-2`.

**Variant A**

- Variant ID: `miniSub-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 8 = ?
- Visual data: not authored
- Choices: [56,64,72,80]
- Correct answer: 64
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 8 en verdubbel dat.
- Explanation: 8 × 8 = 64.

**Variant B**

- Variant ID: `miniSub-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 3 = ?
- Visual data: not authored
- Choices: [9,12,15,18]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 4 en tel nog 4 erbij.
- Explanation: 4 × 3 = 12.

#### Slot q3

Authored slot ID: `miniSub-slot-3`.

**Variant A**

- Variant ID: `miniSub-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 9 en 2 × 9.
- Explanation: 9 × 7 = 63.

**Variant B**

- Variant ID: `miniSub-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 36 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 4 = 36, is 36 : 9 = 4.
- Explanation: 36 : 9 = 4.

#### Slot q4

Authored slot ID: `miniSub-slot-4`.

**Variant A**

- Variant ID: `miniSub-4a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Nemo koopt 2 reserveonderdelen voor de minisub. Elk onderdeel kost 6 munten. Hoeveel munten betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Er zijn 2 gelijke bedragen van 6 munten.
- hintMoose: Reken 2 × 5 en tel er nog 2 bij op.
- Explanation: 2 × 6 = 12 munten.

**Variant B**

- Variant ID: `miniSub-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 9 = ?
- Visual data: not authored
- Choices: [45,54,63,72]
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 6 en haal 6 eraf.
- Explanation: 6 × 9 = 54.

### Challenge: controlPanel

- State: **active** (active omitted; runtime default is true)
- anchorId: `controlPanel`
- Linked rune(s): controlPanel — Drukpaneel (objectId: controlPanel)
- Linked object: controlPanel — Drukpaneel (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_division, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "controlPanel",
  "anchorId": "controlPanel",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "controlPanel"
  }
]
```

#### Slot q1

Authored slot ID: `controlPanel-slot-1`.

**Variant A**

- Variant ID: `controlPanel-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 48 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 6 = 48, is 48 : 8 = 6.
- Explanation: 48 : 8 = 6.

**Variant B**

- Variant ID: `controlPanel-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 6 en 2 × 6.
- Explanation: 6 × 7 = 42.

#### Slot q2

Authored slot ID: `controlPanel-slot-2`.

**Variant A**

- Variant ID: `controlPanel-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Het bedieningspaneel heeft 4 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?
- Visual data: not authored
- Choices: [12,16,20,24]
- Correct answer: 16
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 4 en verdubbel de uitkomst nog eens.
- Explanation: 4 × 4 = 16.

**Variant B**

- Variant ID: `controlPanel-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 18 : 9 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 2 = 18, is 18 : 9 = 2.
- Explanation: 18 : 9 = 2.

#### Slot q3

Authored slot ID: `controlPanel-slot-3`.

**Variant A**

- Variant ID: `controlPanel-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Het bedieningspaneel heeft 9 rijen met elk 7 schakelaars. Hoeveel schakelaars zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 9 × 5 en 9 × 2 en tel de uitkomsten op.
- Explanation: 9 × 7 = 63.

**Variant B**

- Variant ID: `controlPanel-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Het bedieningspaneel heeft 5 rijen met elk 2 schakelaars. Hoeveel schakelaars zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 2.
- hintMoose: Verdubbel 5.
- Explanation: 5 × 2 = 10.

#### Slot q4

Authored slot ID: `controlPanel-slot-4`.

**Variant A**

- Variant ID: `controlPanel-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Het bedieningspaneel heeft 5 rijen met elk 9 schakelaars. Hoeveel schakelaars zijn dat samen?
- Visual data: not authored
- Choices: [36,45,54,63]
- Correct answer: 45
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 5 × 10 en haal er daarna 5 af.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `controlPanel-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Het bedieningspaneel heeft 9 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?
- Visual data: not authored
- Choices: [32,36,40,44]
- Correct answer: 36
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 9 en verdubbel de uitkomst nog eens.
- Explanation: 9 × 4 = 36.

<a id="level-lvl-0007"></a>

## LVL-0007 — Het Tropische Eiland

Source: [Levels/LVL-0007/level.js](../../Levels/LVL-0007/level.js). Production level.

### Challenge: escapeBoat

- State: **active** (active omitted; runtime default is true)
- anchorId: `escapeBoat`
- Linked rune(s): escapeBoat — Sloep (objectId: escapeBoat)
- Linked object: escapeBoat — Sloep (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "escapeBoat",
  "anchorId": "escapeBoat",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "escapeBoat"
  }
]
```

#### Slot q1

Authored slot ID: `escapeBoat-slot-1`.

**Variant A**

- Variant ID: `escapeBoat-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 6 en verdubbel dat.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `escapeBoat-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 5 en tel nog 5 erbij.
- Explanation: 5 × 6 = 30.

#### Slot q2

Authored slot ID: `escapeBoat-slot-2`.

**Variant A**

- Variant ID: `escapeBoat-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 6 = ?
- Visual data: not authored
- Choices: [30,36,42,48]
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 6 en tel nog 6 erbij.
- Explanation: 6 × 6 = 36.

**Variant B**

- Variant ID: `escapeBoat-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 6 = ?
- Visual data: not authored
- Choices: [36,42,48,54]
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 7 en tel nog 7 erbij.
- Explanation: 7 × 6 = 42.

#### Slot q3

Authored slot ID: `escapeBoat-slot-3`.

**Variant A**

- Variant ID: `escapeBoat-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 16 : 8 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 2 = 16, is 16 : 8 = 2.
- Explanation: 16 : 8 = 2.

**Variant B**

- Variant ID: `escapeBoat-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 14
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 2 en 2 × 2.
- Explanation: 2 × 7 = 14.

#### Slot q4

Authored slot ID: `escapeBoat-slot-4`.

**Variant A**

- Variant ID: `escapeBoat-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 9 = ?
- Visual data: not authored
- Choices: [36,45,54,63]
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 5 en haal 5 eraf.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `escapeBoat-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 7 = ?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 4 en 2 × 4.
- Explanation: 4 × 7 = 28.

### Challenge: islandWheel

- State: **active** (active omitted; runtime default is true)
- anchorId: `islandWheel`
- Linked rune(s): islandWheel — Stuurwiel (objectId: islandWheel)
- Linked object: islandWheel — Stuurwiel (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_multiplication, route, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "islandWheel",
  "anchorId": "islandWheel",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "islandWheel"
  }
]
```

#### Slot q1

Authored slot ID: `islandWheel-slot-1`.

**Variant A**

- Variant ID: `islandWheel-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 6 = ?
- Visual data: not authored
- Choices: [18,24,30,36]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 4 en tel nog 4 erbij.
- Explanation: 4 × 6 = 24.

**Variant B**

- Variant ID: `islandWheel-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 6 en 2 × 6.
- Explanation: 6 × 7 = 42.

#### Slot q2

Authored slot ID: `islandWheel-slot-2`.

**Variant A**

- Variant ID: `islandWheel-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 5 = ?
- Visual data: not authored
- Choices: [20,25,30,35]
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 5 sprongen van 5.
- Explanation: 5 × 5 = 25.

**Variant B**

- Variant ID: `islandWheel-2b`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: Een touw bij het stuurwiel is 20 meter lang. Nemo verdeelt het in 4 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel de totale lengte eerlijk over 4 gelijke stukken.
- hintMoose: Zoek in de tafel van 4 welk getal uitkomt op 20.
- Explanation: 20 : 4 = 5 meter.

#### Slot q3

Authored slot ID: `islandWheel-slot-3`.

**Variant A**

- Variant ID: `islandWheel-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 3 = ?
- Visual data: not authored
- Choices: [12,15,18,21]
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 5 en tel nog 5 erbij.
- Explanation: 5 × 3 = 15.

**Variant B**

- Variant ID: `islandWheel-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Nemo verdeelt 18 koerskaarten eerlijk over 3 reddingsboten. Hoeveel kaarten krijgt iedere boot?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel 18 eerlijk over 3 gelijke groepen.
- hintMoose: Zoek in de tafel van 3 welk getal uitkomt op 18.
- Explanation: 18 : 3 = 6.

#### Slot q4

Authored slot ID: `islandWheel-slot-4`.

**Variant A**

- Variant ID: `islandWheel-4a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Nemo verdeelt 21 koerskaarten eerlijk over 7 reddingsboten. Hoeveel kaarten krijgt iedere boot?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Verdeel 21 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 21.
- Explanation: 21 : 7 = 3.

**Variant B**

- Variant ID: `islandWheel-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 6 en haal 6 eraf.
- Explanation: 6 × 9 = 54.

### Challenge: islandMap

- State: **active** (active omitted; runtime default is true)
- anchorId: `islandMap`
- Linked rune(s): islandMap — Eilandkaart (objectId: islandMap)
- Linked object: islandMap — Eilandkaart (type: rune)
- challengeCharacterId: `captain-nemo`
- Families: bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "islandMap",
  "anchorId": "islandMap",
  "challengeCharacterId": "captain-nemo"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "islandMap"
  }
]
```

#### Slot q1

Authored slot ID: `islandMap-slot-1`.

**Variant A**

- Variant ID: `islandMap-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 7 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 5 en 2 × 5.
- Explanation: 5 × 7 = 35.

**Variant B**

- Variant ID: `islandMap-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 2 en tel nog 2 erbij.
- Explanation: 2 × 3 = 6.

#### Slot q2

Authored slot ID: `islandMap-slot-2`.

**Variant A**

- Variant ID: `islandMap-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 2 = ?
- Visual data: not authored
- Choices: [2,4,6,8]
- Correct answer: 4
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 2.
- Explanation: 2 × 2 = 4.

**Variant B**

- Variant ID: `islandMap-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 9 = ?
- Visual data: not authored
- Choices: [9,18,27,36]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 2 en haal 2 eraf.
- Explanation: 2 × 9 = 18.

#### Slot q3

Authored slot ID: `islandMap-slot-3`.

**Variant A**

- Variant ID: `islandMap-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 16 : 8 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 2 = 16, is 16 : 8 = 2.
- Explanation: 16 : 8 = 2.

**Variant B**

- Variant ID: `islandMap-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 10 = ?
- Visual data: not authored
- Choices: [40,50,60,70]
- Correct answer: 50
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 5 groepjes van 10 eindigen op nul.
- Explanation: 5 × 10 = 50.

#### Slot q4

Authored slot ID: `islandMap-slot-4`.

**Variant A**

- Variant ID: `islandMap-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 2 = ?
- Visual data: not authored
- Choices: [10,12,14,16]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 6.
- Explanation: 6 × 2 = 12.

**Variant B**

- Variant ID: `islandMap-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de eilandkaart staan 7 routes met elk 2 herkenningspunten. Hoeveel herkenningspunten zijn dat samen?
- Visual data: not authored
- Choices: [12,14,16,18]
- Correct answer: 14
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 2.
- hintMoose: Verdubbel 7.
- Explanation: 7 × 2 = 14.

<a id="level-lvl-0008"></a>

## LVL-0008 — De Blokkenpoort

Source: [Levels/LVL-0008/level.js](../../Levels/LVL-0008/level.js). Production level.

### Challenge: diamondSword

- State: **active** (active omitted; runtime default is true)
- anchorId: `diamondSword`
- Linked rune(s): diamondSword — Diamantzwaard (objectId: diamondSword)
- Linked object: diamondSword — Diamantzwaard (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, bare_division, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "diamondSword",
  "anchorId": "diamondSword",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "diamondSword"
  }
]
```

#### Slot q1

Authored slot ID: `diamondSword-slot-1`.

**Variant A**

- Variant ID: `diamondSword-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 9 en 2 × 9.
- Explanation: 9 × 7 = 63.

**Variant B**

- Variant ID: `diamondSword-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 6 en tel nog 6 erbij.
- Explanation: 6 × 3 = 18.

#### Slot q2

Authored slot ID: `diamondSword-slot-2`.

**Variant A**

- Variant ID: `diamondSword-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

**Variant B**

- Variant ID: `diamondSword-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 70 : 10 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 10 helpt?
- hintMoose: Omdat 10 × 7 = 70, is 70 : 10 = 7.
- Explanation: 70 : 10 = 7.

#### Slot q3

Authored slot ID: `diamondSword-slot-3`.

**Variant A**

- Variant ID: `diamondSword-3a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Job verdeelt 35 diamantblokken eerlijk over 7 kisten. Hoeveel blokken gaan in iedere kist?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Verdeel 35 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 35.
- Explanation: 35 : 7 = 5.

**Variant B**

- Variant ID: `diamondSword-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Job verdeelt 30 diamantblokken eerlijk over 6 kisten. Hoeveel blokken gaan in iedere kist?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 30 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 30.
- Explanation: 30 : 6 = 5.

#### Slot q4

Authored slot ID: `diamondSword-slot-4`.

**Variant A**

- Variant ID: `diamondSword-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 9
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 3 en tel nog 3 erbij.
- Explanation: 3 × 3 = 9.

**Variant B**

- Variant ID: `diamondSword-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 7 = ?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 8 en 2 × 8.
- Explanation: 8 × 7 = 56.

### Challenge: creeperMask

- State: **active** (active omitted; runtime default is true)
- anchorId: `creeperMask`
- Linked rune(s): creeperMask — Creepermasker (objectId: creeperMask)
- Linked object: creeperMask — Creepermasker (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_division, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "creeperMask",
  "anchorId": "creeperMask",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "creeperMask"
  }
]
```

#### Slot q1

Authored slot ID: `creeperMask-slot-1`.

**Variant A**

- Variant ID: `creeperMask-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 27 : 9 = ?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 3 = 27, is 27 : 9 = 3.
- Explanation: 27 : 9 = 3.

**Variant B**

- Variant ID: `creeperMask-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: [48,54,60,66]
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 9 en tel nog 9 erbij.
- Explanation: 9 × 6 = 54.

#### Slot q2

Authored slot ID: `creeperMask-slot-2`.

**Variant A**

- Variant ID: `creeperMask-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 45 : 5 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 9 = 45, is 45 : 5 = 9.
- Explanation: 45 : 5 = 9.

**Variant B**

- Variant ID: `creeperMask-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Job bouwt 6 creepermaskers met elk 9 groene blokken. Hoeveel blokken gebruikt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 6 × 10 en haal er daarna 6 af.
- Explanation: 6 × 9 = 54.

#### Slot q3

Authored slot ID: `creeperMask-slot-3`.

**Variant A**

- Variant ID: `creeperMask-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 80 : 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke som uit de tafel van 10 helpt?
- hintMoose: Omdat 10 × 8 = 80, is 80 : 10 = 8.
- Explanation: 80 : 10 = 8.

**Variant B**

- Variant ID: `creeperMask-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Job bouwt 5 creepermaskers met elk 6 groene blokken. Hoeveel blokken gebruikt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 5 × 5 en tel er nog 5 bij op.
- Explanation: 5 × 6 = 30.

#### Slot q4

Authored slot ID: `creeperMask-slot-4`.

**Variant A**

- Variant ID: `creeperMask-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 3 = ?
- Visual data: not authored
- Choices: [6,9,12,15]
- Correct answer: 9
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 3 en tel nog 3 erbij.
- Explanation: 3 × 3 = 9.

**Variant B**

- Variant ID: `creeperMask-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 3.
- Explanation: 3 × 2 = 6.

### Challenge: enderPortal

- State: **active** (active omitted; runtime default is true)
- anchorId: `enderPortal`
- Linked rune(s): enderPortal — Donkere poort (objectId: enderPortal)
- Linked object: enderPortal — Donkere poort (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, story_multiplication, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "enderPortal",
  "anchorId": "enderPortal",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "enderPortal"
  }
]
```

#### Slot q1

Authored slot ID: `enderPortal-slot-1`.

**Variant A**

- Variant ID: `enderPortal-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 27
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 3 en haal 3 eraf.
- Explanation: 3 × 9 = 27.

**Variant B**

- Variant ID: `enderPortal-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: [48,54,60,66]
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 9 en tel nog 9 erbij.
- Explanation: 9 × 6 = 54.

#### Slot q2

Authored slot ID: `enderPortal-slot-2`.

**Variant A**

- Variant ID: `enderPortal-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Voor de donkere poort bouwt Job 6 rijen van 10 portaalstenen. Hoeveel portaalstenen gebruikt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 60
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 10.
- hintMoose: Vermenigvuldig 6 met 10: zet een nul achter 6.
- Explanation: 6 × 10 = 60.

**Variant B**

- Variant ID: `enderPortal-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Voor de donkere poort bouwt Job 3 rijen van 6 portaalstenen. Hoeveel portaalstenen gebruikt hij?
- Visual data: not authored
- Choices: [12,18,24,30]
- Correct answer: 18
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 3 × 5 en tel er nog 3 bij op.
- Explanation: 3 × 6 = 18.

#### Slot q3

Authored slot ID: `enderPortal-slot-3`.

**Variant A**

- Variant ID: `enderPortal-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Voor de donkere poort bouwt Job 7 rijen van 9 portaalstenen. Hoeveel portaalstenen gebruikt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 7 × 10 en haal er daarna 7 af.
- Explanation: 7 × 9 = 63.

**Variant B**

- Variant ID: `enderPortal-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 5 en tel nog 5 erbij.
- Explanation: 5 × 6 = 30.

#### Slot q4

Authored slot ID: `enderPortal-slot-4`.

**Variant A**

- Variant ID: `enderPortal-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 49
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 7 en 2 × 7.
- Explanation: 7 × 7 = 49.

**Variant B**

- Variant ID: `enderPortal-4b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Job verdeelt 42 portaalstenen eerlijk over 6 rijen. Hoeveel stenen komen in iedere rij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Verdeel 42 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 42.
- Explanation: 42 : 6 = 7.

<a id="level-lvl-0009"></a>

## LVL-0009 — De Ontwaakte Kamer

Source: [Levels/LVL-0009/level.js](../../Levels/LVL-0009/level.js). Production level.

### Challenge: worldMap

- State: **active** (active omitted; runtime default is true)
- anchorId: `worldMap`
- Linked rune(s): worldMap — Wereldkaart (objectId: worldMap)
- Linked object: worldMap — Wereldkaart (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: story_multiplication, bare_multiplication, bare_division, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "worldMap",
  "anchorId": "worldMap",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "worldMap"
  }
]
```

#### Slot q1

Authored slot ID: `worldMap-slot-1`.

**Variant A**

- Variant ID: `worldMap-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de wereldkaart markeert Job 8 routes met elk 6 routeblokjes. Hoeveel routeblokjes gebruikt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 8 × 5 en tel er nog 8 bij op.
- Explanation: 8 × 6 = 48.

**Variant B**

- Variant ID: `worldMap-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 14
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 2 en 2 × 2.
- Explanation: 2 × 7 = 14.

#### Slot q2

Authored slot ID: `worldMap-slot-2`.

**Variant A**

- Variant ID: `worldMap-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 45 : 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 9 = 45, is 45 : 5 = 9.
- Explanation: 45 : 5 = 9.

**Variant B**

- Variant ID: `worldMap-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 5 en verdubbel dat.
- Explanation: 5 × 8 = 40.

#### Slot q3

Authored slot ID: `worldMap-slot-3`.

**Variant A**

- Variant ID: `worldMap-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 3 = ?
- Visual data: not authored
- Choices: [24,27,30,33]
- Correct answer: 27
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 9 en tel nog 9 erbij.
- Explanation: 9 × 3 = 27.

**Variant B**

- Variant ID: `worldMap-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Job verdeelt 72 routeblokjes eerlijk over 9 routes. Hoeveel blokjes krijgt iedere route?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel 72 eerlijk over 9 gelijke groepen.
- hintMoose: Zoek in de tafel van 9 welk getal uitkomt op 72.
- Explanation: 72 : 9 = 8.

#### Slot q4

Authored slot ID: `worldMap-slot-4`.

**Variant A**

- Variant ID: `worldMap-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 5 sprongen van 5.
- Explanation: 5 × 5 = 25.

**Variant B**

- Variant ID: `worldMap-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 2 en haal 2 eraf.
- Explanation: 2 × 9 = 18.

### Challenge: openBook

- State: **active** (active omitted; runtime default is true)
- anchorId: `openBook`
- Linked rune(s): openBook — Open boek (objectId: openBook)
- Linked object: openBook — Open boek (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, story_division, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "openBook",
  "anchorId": "openBook",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "openBook"
  }
]
```

#### Slot q1

Authored slot ID: `openBook-slot-1`.

**Variant A**

- Variant ID: `openBook-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 8 en tel nog 8 erbij.
- Explanation: 8 × 6 = 48.

**Variant B**

- Variant ID: `openBook-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 6 en tel nog 6 erbij.
- Explanation: 6 × 3 = 18.

#### Slot q2

Authored slot ID: `openBook-slot-2`.

**Variant A**

- Variant ID: `openBook-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

**Variant B**

- Variant ID: `openBook-2b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Job verdeelt 36 betovertekens over 4 pagina's. Op iedere pagina komen er evenveel. Hoeveel tekens per pagina?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel 36 eerlijk over 4 gelijke groepen.
- hintMoose: Zoek in de tafel van 4 welk getal uitkomt op 36.
- Explanation: 36 : 4 = 9.

#### Slot q3

Authored slot ID: `openBook-slot-3`.

**Variant A**

- Variant ID: `openBook-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 27 : 3 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 3 helpt?
- hintMoose: Omdat 3 × 9 = 27, is 27 : 3 = 9.
- Explanation: 27 : 3 = 9.

**Variant B**

- Variant ID: `openBook-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: In het open boek staan 7 pagina's met elk 8 betovertekens. Hoeveel tekens zijn dat samen?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 7 drie keer.
- Explanation: 7 × 8 = 56.

#### Slot q4

Authored slot ID: `openBook-slot-4`.

**Variant A**

- Variant ID: `openBook-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 64
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 8 en verdubbel dat.
- Explanation: 8 × 8 = 64.

**Variant B**

- Variant ID: `openBook-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 6 = ?
- Visual data: not authored
- Choices: [36,42,48,54]
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 7 en tel nog 7 erbij.
- Explanation: 7 × 6 = 42.

### Challenge: crystalCase

- State: **active** (active omitted; runtime default is true)
- anchorId: `crystalCase`
- Linked rune(s): crystalCase — Kristalkast (objectId: crystalCase)
- Linked object: crystalCase — Kristalkast (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: money, bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "crystalCase",
  "anchorId": "crystalCase",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "crystalCase"
  }
]
```

#### Slot q1

Authored slot ID: `crystalCase-slot-1`.

**Variant A**

- Variant ID: `crystalCase-1a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Job koopt 4 kristaldozen voor 10 munten per stuk. Hoeveel munten betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Er zijn 4 gelijke bedragen van 10 munten.
- hintMoose: Vermenigvuldig 4 met 10: zet een nul achter 4.
- Explanation: 4 × 10 = 40 munten.

**Variant B**

- Variant ID: `crystalCase-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 5 = ?
- Visual data: not authored
- Choices: [35,40,45,50]
- Correct answer: 40
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 8 sprongen van 5.
- Explanation: 8 × 5 = 40.

#### Slot q2

Authored slot ID: `crystalCase-slot-2`.

**Variant A**

- Variant ID: `crystalCase-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 45 : 9 = ?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 5 = 45, is 45 : 9 = 5.
- Explanation: 45 : 9 = 5.

**Variant B**

- Variant ID: `crystalCase-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 8 = ?
- Visual data: not authored
- Choices: [32,40,48,56]
- Correct answer: 40
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 5 en verdubbel dat.
- Explanation: 5 × 8 = 40.

#### Slot q3

Authored slot ID: `crystalCase-slot-3`.

**Variant A**

- Variant ID: `crystalCase-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 2 twee keer.
- Explanation: 2 × 4 = 8.

**Variant B**

- Variant ID: `crystalCase-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: In de kristalkast staan 4 bakjes met elk 5 kristalscherven. Hoeveel scherven zijn dat samen?
- Visual data: not authored
- Choices: [15,20,25,30]
- Correct answer: 20
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 5.
- hintMoose: Tel 4 sprongen van 5.
- Explanation: 4 × 5 = 20.

#### Slot q4

Authored slot ID: `crystalCase-slot-4`.

**Variant A**

- Variant ID: `crystalCase-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 7 = ?
- Visual data: not authored
- Choices: [42,49,56,63]
- Correct answer: 49
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 7 en 2 × 7.
- Explanation: 7 × 7 = 49.

**Variant B**

- Variant ID: `crystalCase-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: In de kristalkast staan 6 bakjes met elk 5 kristalscherven. Hoeveel scherven zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 5.
- hintMoose: Tel 6 sprongen van 5.
- Explanation: 6 × 5 = 30.

<a id="level-lvl-0010"></a>

## LVL-0010 — De Strandkamer

Source: [Levels/LVL-0010/level.js](../../Levels/LVL-0010/level.js). Production level.

### Challenge: treasureMap

- State: **active** (active omitted; runtime default is true)
- anchorId: `treasureMap`
- Linked rune(s): treasureMap — Schatkaart (objectId: treasureMap)
- Linked object: treasureMap — Schatkaart (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: route, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "treasureMap",
  "anchorId": "treasureMap",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "treasureMap"
  }
]
```

#### Slot q1

Authored slot ID: `treasureMap-slot-1`.

**Variant A**

- Variant ID: `treasureMap-1a`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: De schatroute is 8 meter lang en bestaat uit 2 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- hintMoose: Zoek in de tafel van 2 welk getal uitkomt op 8.
- Explanation: 8 : 2 = 4 meter.

**Variant B**

- Variant ID: `treasureMap-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 8 = ?
- Visual data: not authored
- Choices: [16,24,32,40]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 3 en verdubbel dat.
- Explanation: 3 × 8 = 24.

#### Slot q2

Authored slot ID: `treasureMap-slot-2`.

**Variant A**

- Variant ID: `treasureMap-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 6.
- Explanation: 6 × 2 = 12.

**Variant B**

- Variant ID: `treasureMap-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de schatkaart staan 4 routes met elk 7 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- Explanation: 4 × 7 = 28.

#### Slot q3

Authored slot ID: `treasureMap-slot-3`.

**Variant A**

- Variant ID: `treasureMap-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de schatkaart staan 7 routes met elk 9 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 7 × 10 en haal er daarna 7 af.
- Explanation: 7 × 9 = 63.

**Variant B**

- Variant ID: `treasureMap-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 4 = ?
- Visual data: not authored
- Choices: [8,12,16,20]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 3 twee keer.
- Explanation: 3 × 4 = 12.

#### Slot q4

Authored slot ID: `treasureMap-slot-4`.

**Variant A**

- Variant ID: `treasureMap-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 10 = ?
- Visual data: not authored
- Choices: [10,20,30,40]
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 2 groepjes van 10 eindigen op nul.
- Explanation: 2 × 10 = 20.

**Variant B**

- Variant ID: `treasureMap-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 7 = ?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 8 en 2 × 8.
- Explanation: 8 × 7 = 56.

### Challenge: sandCastle

- State: **active** (active omitted; runtime default is true)
- anchorId: `sandCastle`
- Linked rune(s): sandCastle — Zandkasteel (objectId: sandCastle)
- Linked object: sandCastle — Zandkasteel (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, money, story_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "sandCastle",
  "anchorId": "sandCastle",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "sandCastle"
  }
]
```

#### Slot q1

Authored slot ID: `sandCastle-slot-1`.

**Variant A**

- Variant ID: `sandCastle-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 6 twee keer.
- Explanation: 6 × 4 = 24.

**Variant B**

- Variant ID: `sandCastle-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 3 = ?
- Visual data: not authored
- Choices: [15,18,21,24]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 6 en tel nog 6 erbij.
- Explanation: 6 × 3 = 18.

#### Slot q2

Authored slot ID: `sandCastle-slot-2`.

**Variant A**

- Variant ID: `sandCastle-2a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Job koopt 2 bouwscheppen voor 6 munten per stuk. Hoeveel munten betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Er zijn 2 gelijke bedragen van 6 munten.
- hintMoose: Reken 2 × 5 en tel er nog 2 bij op.
- Explanation: 2 × 6 = 12 munten.

**Variant B**

- Variant ID: `sandCastle-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Het zandkasteel heeft 9 torens met elk 4 zandblokken. Hoeveel blokken zijn dat samen?
- Visual data: not authored
- Choices: [32,36,40,44]
- Correct answer: 36
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 9 en verdubbel de uitkomst nog eens.
- Explanation: 9 × 4 = 36.

#### Slot q3

Authored slot ID: `sandCastle-slot-3`.

**Variant A**

- Variant ID: `sandCastle-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 7 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 5 en 2 × 5.
- Explanation: 5 × 7 = 35.

**Variant B**

- Variant ID: `sandCastle-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Het zandkasteel heeft 7 torens met elk 8 zandblokken. Hoeveel blokken zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 7 drie keer.
- Explanation: 7 × 8 = 56.

#### Slot q4

Authored slot ID: `sandCastle-slot-4`.

**Variant A**

- Variant ID: `sandCastle-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 64 : 8 = ?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 8 = 64, is 64 : 8 = 8.
- Explanation: 64 : 8 = 8.

**Variant B**

- Variant ID: `sandCastle-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Het zandkasteel heeft 2 torens met elk 9 zandblokken. Hoeveel blokken zijn dat samen?
- Visual data: not authored
- Choices: [9,18,27,36]
- Correct answer: 18
- hintMinnie: Er zijn 2 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 2 × 10 en haal er daarna 2 af.
- Explanation: 2 × 9 = 18.

### Challenge: woodenBoat

- State: **active** (active omitted; runtime default is true)
- anchorId: `woodenBoat`
- Linked rune(s): woodenBoat — Houten boot (objectId: woodenBoat)
- Linked object: woodenBoat — Houten boot (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: story_multiplication, bare_multiplication, bare_division, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "woodenBoat",
  "anchorId": "woodenBoat",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "woodenBoat"
  }
]
```

#### Slot q1

Authored slot ID: `woodenBoat-slot-1`.

**Variant A**

- Variant ID: `woodenBoat-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Voor de houten boot maakt Job 9 stapels van 7 bouwplanken. Hoeveel planken zijn dat samen?
- Visual data: not authored
- Choices: [56,63,70,77]
- Correct answer: 63
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 9 × 5 en 9 × 2 en tel de uitkomsten op.
- Explanation: 9 × 7 = 63.

**Variant B**

- Variant ID: `woodenBoat-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 9 en tel nog 9 erbij.
- Explanation: 9 × 6 = 54.

#### Slot q2

Authored slot ID: `woodenBoat-slot-2`.

**Variant A**

- Variant ID: `woodenBoat-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 21 : 7 = ?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 3 = 21, is 21 : 7 = 3.
- Explanation: 21 : 7 = 3.

**Variant B**

- Variant ID: `woodenBoat-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Voor de houten boot maakt Job 8 stapels van 3 bouwplanken. Hoeveel planken zijn dat samen?
- Visual data: not authored
- Choices: [21,24,27,30]
- Correct answer: 24
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 3.
- hintMoose: Verdubbel 8 en tel er nog 8 bij op.
- Explanation: 8 × 3 = 24.

#### Slot q3

Authored slot ID: `woodenBoat-slot-3`.

**Variant A**

- Variant ID: `woodenBoat-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 6 = ?
- Visual data: not authored
- Choices: [18,24,30,36]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 4 en tel nog 4 erbij.
- Explanation: 4 × 6 = 24.

**Variant B**

- Variant ID: `woodenBoat-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Voor de houten boot maakt Job 7 stapels van 8 bouwplanken. Hoeveel planken zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 7 drie keer.
- Explanation: 7 × 8 = 56.

#### Slot q4

Authored slot ID: `woodenBoat-slot-4`.

**Variant A**

- Variant ID: `woodenBoat-4a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Job verdeelt 25 bouwplanken eerlijk over 5 bouwers. Hoeveel planken krijgt iedere bouwer?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 25 eerlijk over 5 gelijke groepen.
- hintMoose: Zoek in de tafel van 5 welk getal uitkomt op 25.
- Explanation: 25 : 5 = 5.

**Variant B**

- Variant ID: `woodenBoat-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 4 = ?
- Visual data: not authored
- Choices: [16,20,24,28]
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 5 twee keer.
- Explanation: 5 × 4 = 20.

<a id="level-lvl-0011"></a>

## LVL-0011 — De Netherproef

Source: [Levels/LVL-0011/level.js](../../Levels/LVL-0011/level.js). Production level.

### Challenge: potionTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `potionTable`
- Linked rune(s): potionTable — Brouwtafel (objectId: potionTable)
- Linked object: potionTable — Brouwtafel (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, story_multiplication, bare_division, route, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "potionTable",
  "anchorId": "potionTable",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "potionTable"
  }
]
```

#### Slot q1

Authored slot ID: `potionTable-slot-1`.

**Variant A**

- Variant ID: `potionTable-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 6 twee keer.
- Explanation: 6 × 4 = 24.

**Variant B**

- Variant ID: `potionTable-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de brouwtafel staan 2 rekken met elk 7 drankflesjes. Hoeveel flesjes zijn dat samen?
- Visual data: not authored
- Choices: [7,14,21,28]
- Correct answer: 14
- hintMinnie: Er zijn 2 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 2 × 5 en 2 × 2 en tel de uitkomsten op.
- Explanation: 2 × 7 = 14.

#### Slot q2

Authored slot ID: `potionTable-slot-2`.

**Variant A**

- Variant ID: `potionTable-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 8 twee keer.
- Explanation: 8 × 4 = 32.

**Variant B**

- Variant ID: `potionTable-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 28 : 7 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 4 = 28, is 28 : 7 = 4.
- Explanation: 28 : 7 = 4.

#### Slot q3

Authored slot ID: `potionTable-slot-3`.

**Variant A**

- Variant ID: `potionTable-3a`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: De veilige route vanaf de brouwtafel is 63 meter lang en bestaat uit 9 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Verdeel de totale lengte eerlijk over 9 gelijke stukken.
- hintMoose: Zoek in de tafel van 9 welk getal uitkomt op 63.
- Explanation: 63 : 9 = 7 meter.

**Variant B**

- Variant ID: `potionTable-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 : 3 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 3 helpt?
- hintMoose: Omdat 3 × 2 = 6, is 6 : 3 = 2.
- Explanation: 6 : 3 = 2.

#### Slot q4

Authored slot ID: `potionTable-slot-4`.

**Variant A**

- Variant ID: `potionTable-4a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Job verdeelt 25 drankflesjes eerlijk over 5 rekken. Hoeveel flesjes komen in ieder rek?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 25 eerlijk over 5 gelijke groepen.
- hintMoose: Zoek in de tafel van 5 welk getal uitkomt op 25.
- Explanation: 25 : 5 = 5.

**Variant B**

- Variant ID: `potionTable-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 12 : 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 3 helpt?
- hintMoose: Omdat 3 × 4 = 12, is 12 : 3 = 4.
- Explanation: 12 : 3 = 4.

### Challenge: netherOrb

- State: **active** (active omitted; runtime default is true)
- anchorId: `netherOrb`
- Linked rune(s): netherOrb — Netherbol (objectId: netherOrb)
- Linked object: netherOrb — Netherbol (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, story_multiplication, story_division, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "netherOrb",
  "anchorId": "netherOrb",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "netherOrb"
  }
]
```

#### Slot q1

Authored slot ID: `netherOrb-slot-1`.

**Variant A**

- Variant ID: `netherOrb-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 16
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 2 en verdubbel dat.
- Explanation: 2 × 8 = 16.

**Variant B**

- Variant ID: `netherOrb-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 2 = ?
- Visual data: not authored
- Choices: [8,10,12,14]
- Correct answer: 10
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 5.
- Explanation: 5 × 2 = 10.

#### Slot q2

Authored slot ID: `netherOrb-slot-2`.

**Variant A**

- Variant ID: `netherOrb-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Rond de Netherbol staan 3 ringen met elk 7 gloeiblokken. Hoeveel blokken zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 21
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 3 × 5 en 3 × 2 en tel de uitkomsten op.
- Explanation: 3 × 7 = 21.

**Variant B**

- Variant ID: `netherOrb-2b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Job verdeelt 54 gloeiblokken eerlijk over 9 ringen rond de Netherbol. Hoeveel blokken komen in iedere ring?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel 54 eerlijk over 9 gelijke groepen.
- hintMoose: Zoek in de tafel van 9 welk getal uitkomt op 54.
- Explanation: 54 : 9 = 6.

#### Slot q3

Authored slot ID: `netherOrb-slot-3`.

**Variant A**

- Variant ID: `netherOrb-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Rond de Netherbol staan 4 ringen met elk 6 gloeiblokken. Hoeveel blokken zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 4 × 5 en tel er nog 4 bij op.
- Explanation: 4 × 6 = 24.

**Variant B**

- Variant ID: `netherOrb-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q4

Authored slot ID: `netherOrb-slot-4`.

**Variant A**

- Variant ID: `netherOrb-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 10 = ?
- Visual data: not authored
- Choices: [10,20,30,40]
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 2 groepjes van 10 eindigen op nul.
- Explanation: 2 × 10 = 20.

**Variant B**

- Variant ID: `netherOrb-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 56 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 8 = 56, is 56 : 7 = 8.
- Explanation: 56 : 7 = 8.

### Challenge: netherMap

- State: **active** (active omitted; runtime default is true)
- anchorId: `netherMap`
- Linked rune(s): netherMap — Lavakaart (objectId: netherMap)
- Linked object: netherMap — Lavakaart (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_division, story_division, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "netherMap",
  "anchorId": "netherMap",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "netherMap"
  }
]
```

#### Slot q1

Authored slot ID: `netherMap-slot-1`.

**Variant A**

- Variant ID: `netherMap-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 27 : 9 = ?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 3 = 27, is 27 : 9 = 3.
- Explanation: 27 : 9 = 3.

**Variant B**

- Variant ID: `netherMap-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Job verdeelt 24 routeblokken eerlijk over 8 routes op de lavakaart. Hoeveel blokken krijgt iedere route?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Verdeel 24 eerlijk over 8 gelijke groepen.
- hintMoose: Zoek in de tafel van 8 welk getal uitkomt op 24.
- Explanation: 24 : 8 = 3.

#### Slot q2

Authored slot ID: `netherMap-slot-2`.

**Variant A**

- Variant ID: `netherMap-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 7 = ?
- Visual data: not authored
- Choices: [14,21,28,35]
- Correct answer: 21
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 3 en 2 × 3.
- Explanation: 3 × 7 = 21.

**Variant B**

- Variant ID: `netherMap-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de lavakaart markeert Job 4 routes met elk 7 routeblokken. Hoeveel routeblokken gebruikt hij?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- Explanation: 4 × 7 = 28.

#### Slot q3

Authored slot ID: `netherMap-slot-3`.

**Variant A**

- Variant ID: `netherMap-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de lavakaart markeert Job 6 routes met elk 8 routeblokken. Hoeveel routeblokken gebruikt hij?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 6 drie keer.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `netherMap-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Job verdeelt 56 routeblokken eerlijk over 8 routes op de lavakaart. Hoeveel blokken krijgt iedere route?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Verdeel 56 eerlijk over 8 gelijke groepen.
- hintMoose: Zoek in de tafel van 8 welk getal uitkomt op 56.
- Explanation: 56 : 8 = 7.

#### Slot q4

Authored slot ID: `netherMap-slot-4`.

**Variant A**

- Variant ID: `netherMap-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 5 = ?
- Visual data: not authored
- Choices: [20,25,30,35]
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 5 sprongen van 5.
- Explanation: 5 × 5 = 25.

**Variant B**

- Variant ID: `netherMap-4b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Job verdeelt 56 routeblokken eerlijk over 7 routes op de lavakaart. Hoeveel blokken krijgt iedere route?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Verdeel 56 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 56.
- Explanation: 56 : 7 = 8.

<a id="level-lvl-0012"></a>

## LVL-0012 — De Weg Naar Huis

Source: [Levels/LVL-0012/level.js](../../Levels/LVL-0012/level.js). Production level.

### Challenge: homeMap

- State: **active** (active omitted; runtime default is true)
- anchorId: `homeMap`
- Linked rune(s): homeMap — Thuiskaart (objectId: homeMap)
- Linked object: homeMap — Thuiskaart (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, bare_division, money, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "homeMap",
  "anchorId": "homeMap",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "homeMap"
  }
]
```

#### Slot q1

Authored slot ID: `homeMap-slot-1`.

**Variant A**

- Variant ID: `homeMap-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 4 = ?
- Visual data: not authored
- Choices: [20,24,28,32]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 6 twee keer.
- Explanation: 6 × 4 = 24.

**Variant B**

- Variant ID: `homeMap-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 36 : 9 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 4 = 36, is 36 : 9 = 4.
- Explanation: 36 : 9 = 4.

#### Slot q2

Authored slot ID: `homeMap-slot-2`.

**Variant A**

- Variant ID: `homeMap-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 21 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 3 = 21, is 21 : 7 = 3.
- Explanation: 21 : 7 = 3.

**Variant B**

- Variant ID: `homeMap-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 9 twee keer.
- Explanation: 9 × 4 = 36.

#### Slot q3

Authored slot ID: `homeMap-slot-3`.

**Variant A**

- Variant ID: `homeMap-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 4 = ?
- Visual data: not authored
- Choices: [4,8,12,16]
- Correct answer: 8
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 2 twee keer.
- Explanation: 2 × 4 = 8.

**Variant B**

- Variant ID: `homeMap-3b`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Job koopt 7 bouwkaarten voor 8 munten per stuk. Hoeveel munten betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Er zijn 7 gelijke bedragen van 8 munten.
- hintMoose: Verdubbel 7 drie keer.
- Explanation: 7 × 8 = 56 munten.

#### Slot q4

Authored slot ID: `homeMap-slot-4`.

**Variant A**

- Variant ID: `homeMap-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de thuiskaart staan 8 routes met elk 8 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 64
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 8 drie keer.
- Explanation: 8 × 8 = 64.

**Variant B**

- Variant ID: `homeMap-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 5 twee keer.
- Explanation: 5 × 4 = 20.

### Challenge: enchantTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `enchantTable`
- Linked rune(s): enchantTable — Betovertafel (objectId: enchantTable)
- Linked object: enchantTable — Betovertafel (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "enchantTable",
  "anchorId": "enchantTable",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "enchantTable"
  }
]
```

#### Slot q1

Authored slot ID: `enchantTable-slot-1`.

**Variant A**

- Variant ID: `enchantTable-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 6 = ?
- Visual data: not authored
- Choices: [42,48,54,60]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 8 en tel nog 8 erbij.
- Explanation: 8 × 6 = 48.

**Variant B**

- Variant ID: `enchantTable-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Job verdeelt 54 betoverboeken eerlijk over 6 boekenkisten. Hoeveel boeken gaan in iedere kist?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel 54 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 54.
- Explanation: 54 : 6 = 9.

#### Slot q2

Authored slot ID: `enchantTable-slot-2`.

**Variant A**

- Variant ID: `enchantTable-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 3 = ?
- Visual data: not authored
- Choices: [18,21,24,27]
- Correct answer: 21
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 7 en tel nog 7 erbij.
- Explanation: 7 × 3 = 21.

**Variant B**

- Variant ID: `enchantTable-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 3 = ?
- Visual data: not authored
- Choices: [21,24,27,30]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 8 en tel nog 8 erbij.
- Explanation: 8 × 3 = 24.

#### Slot q3

Authored slot ID: `enchantTable-slot-3`.

**Variant A**

- Variant ID: `enchantTable-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 6 en verdubbel dat.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `enchantTable-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q4

Authored slot ID: `enchantTable-slot-4`.

**Variant A**

- Variant ID: `enchantTable-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 9 = ?
- Visual data: not authored
- Choices: [72,81,90,99]
- Correct answer: 81
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 9 en haal 9 eraf.
- Explanation: 9 × 9 = 81.

**Variant B**

- Variant ID: `enchantTable-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 2 = ?
- Visual data: not authored
- Choices: [4,6,8,10]
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 3.
- Explanation: 3 × 2 = 6.

### Challenge: purplePortal

- State: **active** (active omitted; runtime default is true)
- anchorId: `purplePortal`
- Linked rune(s): purplePortal — Paars portaal (objectId: purplePortal)
- Linked object: purplePortal — Paars portaal (type: rune)
- challengeCharacterId: `dutchtuber-job`
- Families: bare_multiplication, bare_division, route, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "purplePortal",
  "anchorId": "purplePortal",
  "challengeCharacterId": "dutchtuber-job"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "purplePortal"
  }
]
```

#### Slot q1

Authored slot ID: `purplePortal-slot-1`.

**Variant A**

- Variant ID: `purplePortal-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 6 twee keer.
- Explanation: 6 × 4 = 24.

**Variant B**

- Variant ID: `purplePortal-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 36 : 9 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 4 = 36, is 36 : 9 = 4.
- Explanation: 36 : 9 = 4.

#### Slot q2

Authored slot ID: `purplePortal-slot-2`.

**Variant A**

- Variant ID: `purplePortal-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 2 = ?
- Visual data: not authored
- Choices: [10,12,14,16]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 6.
- Explanation: 6 × 2 = 12.

**Variant B**

- Variant ID: `purplePortal-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 4 en 2 × 4.
- Explanation: 4 × 7 = 28.

#### Slot q3

Authored slot ID: `purplePortal-slot-3`.

**Variant A**

- Variant ID: `purplePortal-3a`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: De tunnel door het paarse portaal is 80 meter lang en bestaat uit 10 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Verdeel de totale lengte eerlijk over 10 gelijke stukken.
- hintMoose: Zoek in de tafel van 10 welk getal uitkomt op 80.
- Explanation: 80 : 10 = 8 meter.

**Variant B**

- Variant ID: `purplePortal-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q4

Authored slot ID: `purplePortal-slot-4`.

**Variant A**

- Variant ID: `purplePortal-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 36 : 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 6 = 36, is 36 : 6 = 6.
- Explanation: 36 : 6 = 6.

**Variant B**

- Variant ID: `purplePortal-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Job bouwt 3 ringen met elk 2 portaalblokken. Hoeveel blokken gebruikt hij?
- Visual data: not authored
- Choices: [4,6,8,10]
- Correct answer: 6
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 2.
- hintMoose: Verdubbel 3.
- Explanation: 3 × 2 = 6.

<a id="level-lvl-0013"></a>

## LVL-0013 — Nederland — Het Begin van de Reis

Source: [Levels/LVL-0013/level.js](../../Levels/LVL-0013/level.js). Production level.

### Challenge: windmill

- State: **active** (active omitted; runtime default is true)
- anchorId: `windmill`
- Linked rune(s): windmill — Windmolen (objectId: windmill)
- Linked object: windmill — Windmolen (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, story_multiplication, money
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "windmill",
  "anchorId": "windmill",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "windmill"
  }
]
```

#### Slot q1

Authored slot ID: `windmill-slot-1`.

**Variant A**

- Variant ID: `windmill-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 7 groepjes van 8.
- Explanation: 7 × 8 = 56.

**Variant B**

- Variant ID: `windmill-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 6 = ?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 5 en tel nog 5 erbij.
- Explanation: 5 × 6 = 30.

#### Slot q2

Authored slot ID: `windmill-slot-2`.

**Variant A**

- Variant ID: `windmill-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: De molenaar vult 9 zakken met elk 9 scheppen graan. Hoeveel scheppen graan zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 81
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 9 × 10 en haal er daarna 9 af.
- Explanation: 9 × 9 = 81.

**Variant B**

- Variant ID: `windmill-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De molenaar vult 6 zakken met elk 5 scheppen graan. Hoeveel scheppen graan zijn dat samen?
- Visual data: not authored
- Choices: [25,30,35,40]
- Correct answer: 30
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 5.
- hintMoose: Tel 6 sprongen van 5.
- Explanation: 6 × 5 = 30.

#### Slot q3

Authored slot ID: `windmill-slot-3`.

**Variant A**

- Variant ID: `windmill-3a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Atlas koopt 3 zakjes meel voor 9 euro per stuk. Hoeveel euro betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 27
- hintMinnie: Er zijn 3 gelijke bedragen van 9 euro.
- hintMoose: Reken 3 × 10 en haal er daarna 3 af.
- Explanation: 3 × 9 = 27 euro.

**Variant B**

- Variant ID: `windmill-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 9 en tel nog 9 erbij.
- Explanation: 9 × 6 = 54.

#### Slot q4

Authored slot ID: `windmill-slot-4`.

**Variant A**

- Variant ID: `windmill-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 60
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 6 groepjes van 10 eindigen op nul.
- Explanation: 6 × 10 = 60.

**Variant B**

- Variant ID: `windmill-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 5 en verdubbel dat.
- Explanation: 5 × 8 = 40.

### Challenge: cheeseCart

- State: **active** (active omitted; runtime default is true)
- anchorId: `cheeseCart`
- Linked rune(s): cheeseCart — Kaaswagen (objectId: cheeseCart)
- Linked object: cheeseCart — Kaaswagen (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, story_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "cheeseCart",
  "anchorId": "cheeseCart",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "cheeseCart"
  }
]
```

#### Slot q1

Authored slot ID: `cheese-cart-slot-1`.

**Variant A**

- Variant ID: `cheese-cart-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 6 en verdubbel dat.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `cheese-cart-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q2

Authored slot ID: `cheese-cart-slot-2`.

**Variant A**

- Variant ID: `cheese-cart-2a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: De kaasboer verdeelt 16 kaasjes eerlijk over 4 planken. Hoeveel kaasjes liggen op iedere plank?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Verdeel 16 eerlijk over 4 gelijke groepen.
- hintMoose: Zoek in de tafel van 4 welk getal uitkomt op 16.
- Explanation: 16 : 4 = 4.

**Variant B**

- Variant ID: `cheese-cart-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op 2 planken liggen elk 9 kaasjes. Hoeveel kaasjes zijn dat samen?
- Visual data: not authored
- Choices: [9,18,27,36]
- Correct answer: 18
- hintMinnie: Er zijn 2 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 2 × 10 en haal er daarna 2 af.
- Explanation: 2 × 9 = 18.

#### Slot q3

Authored slot ID: `cheese-cart-slot-3`.

**Variant A**

- Variant ID: `cheese-cart-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 8 en tel nog 8 erbij.
- Explanation: 8 × 6 = 48.

**Variant B**

- Variant ID: `cheese-cart-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De kaasboer verdeelt 14 kaasjes eerlijk over 7 planken. Hoeveel kaasjes liggen op iedere plank?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Verdeel 14 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 14.
- Explanation: 14 : 7 = 2.

#### Slot q4

Authored slot ID: `cheese-cart-slot-4`.

**Variant A**

- Variant ID: `cheese-cart-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: [24,32,40,48]
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

**Variant B**

- Variant ID: `cheese-cart-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 6 = ?
- Visual data: not authored
- Choices: [12,18,24,30]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 3 en tel nog 3 erbij.
- Explanation: 3 × 6 = 18.

### Challenge: canalClock

- State: **active** (active omitted; runtime default is true)
- anchorId: `canalClock`
- Linked rune(s): canalClock — Grachtenklok (objectId: canalClock)
- Linked object: canalClock — Grachtenklok (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: clock_reading_quarter
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "canalClock",
  "anchorId": "canalClock",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "canalClock"
  }
]
```

#### Slot q1

Authored slot ID: `canal-clock-slot-1`.

**Variant A**

- Variant ID: `nl-clock-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":4,"minute":15}
- Choices: ["Kwart voor vier","Kwart over vier","Half vijf","Vier uur"]
- Correct answer: "Kwart over vier"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 4.
- Explanation: De grote wijzer staat op de 3 en de kleine wijzer net na de 4. Het is kwart over vier.

**Variant B**

- Variant ID: `nl-clock-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":8,"minute":45}
- Choices: ["Kwart over acht","Half negen","Kwart voor negen","Negen uur"]
- Correct answer: "Kwart voor negen"
- hintMinnie: De grote wijzer wijst naar de 9.
- hintMoose: Op de 9 betekent de grote wijzer kwart voor. De kleine wijzer staat bijna op de 9.
- Explanation: Het is kwart voor negen.

#### Slot q2

Authored slot ID: `canal-clock-slot-2`.

**Variant A**

- Variant ID: `nl-clock-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":9,"minute":45}
- Choices: ["Kwart over negen","Half tien","Kwart voor tien","Tien uur"]
- Correct answer: "Kwart voor tien"
- hintMinnie: De grote wijzer staat op de 9.
- hintMoose: Op de 9 betekent de grote wijzer kwart voor. Kijk daarna naar het volgende uur.
- Explanation: Het is kwart voor tien.

**Variant B**

- Variant ID: `nl-clock-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":1,"minute":15}
- Choices: ["Eén uur","Kwart over één","Half twee","Kwart voor twee"]
- Correct answer: "Kwart over één"
- hintMinnie: De grote wijzer staat op de 3.
- hintMoose: Op de 3 betekent de grote wijzer kwart over. De kleine wijzer staat net na de 1.
- Explanation: Het is kwart over één.

#### Slot q3

Authored slot ID: `canal-clock-slot-3`.

**Variant A**

- Variant ID: `nl-clock-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":2,"minute":15}
- Choices: ["Twee uur","Kwart over twee","Half drie","Kwart voor drie"]
- Correct answer: "Kwart over twee"
- hintMinnie: Kijk waar de grote wijzer staat.
- hintMoose: De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 2.
- Explanation: Het is kwart over twee.

**Variant B**

- Variant ID: `nl-clock-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":11,"minute":45}
- Choices: ["Kwart over elf","Half twaalf","Kwart voor twaalf","Twaalf uur"]
- Correct answer: "Kwart voor twaalf"
- hintMinnie: De grote wijzer wijst naar de 9.
- hintMoose: Kwart voor kijkt naar het uur dat bijna begint.
- Explanation: Het is kwart voor twaalf.

#### Slot q4

Authored slot ID: `canal-clock-slot-4`.

**Variant A**

- Variant ID: `nl-clock-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":6,"minute":45}
- Choices: ["Kwart over zes","Half zeven","Kwart voor zeven","Zeven uur"]
- Correct answer: "Kwart voor zeven"
- hintMinnie: De grote wijzer wijst naar de 9.
- hintMoose: De kleine wijzer staat bijna bij de 7, dus het is kwart voor zeven.
- Explanation: Het is kwart voor zeven.

**Variant B**

- Variant ID: `nl-clock-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_quarter
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":5,"minute":15}
- Choices: ["Vijf uur","Kwart over vijf","Half zes","Kwart voor zes"]
- Correct answer: "Kwart over vijf"
- hintMinnie: Zoek de grote wijzer op de 3.
- hintMoose: De kleine wijzer staat net na de 5.
- Explanation: Het is kwart over vijf.

<a id="level-lvl-0014"></a>

## LVL-0014 — Engeland — De Oude Klokkenstad

Source: [Levels/LVL-0014/level.js](../../Levels/LVL-0014/level.js). Production level.

### Challenge: clockTower

- State: **active** (active omitted; runtime default is true)
- anchorId: `clockTower`
- Linked rune(s): clockTower — Oude klokkentoren (objectId: clockTower)
- Linked object: clockTower — Oude klokkentoren (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: clock_reading_half_hour
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "clockTower",
  "anchorId": "clockTower",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "clockTower"
  }
]
```

#### Slot q1

Authored slot ID: `clock-tower-slot-1`.

**Variant A**

- Variant ID: `uk-clock-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":7,"minute":30}
- Choices: ["Half zeven","Zeven uur","Half acht","Acht uur"]
- Correct answer: "Half acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer op de 6 betekent half. De kleine wijzer staat tussen de 7 en de 8.
- Explanation: Het is half acht.

**Variant B**

- Variant ID: `uk-clock-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":4,"minute":30}
- Choices: ["Vier uur","Half vier","Half vijf","Vijf uur"]
- Correct answer: "Half vijf"
- hintMinnie: De grote wijzer staat op de 6.
- hintMoose: De kleine wijzer staat tussen de 4 en de 5. In het Nederlands kijk je vooruit.
- Explanation: Het is half vijf.

#### Slot q2

Authored slot ID: `clock-tower-slot-2`.

**Variant A**

- Variant ID: `uk-clock-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":30}
- Choices: ["Drie uur","Half drie","Half vier","Vier uur"]
- Correct answer: "Half vier"
- hintMinnie: Zoek de grote wijzer op de 6.
- hintMoose: De kleine wijzer staat tussen de 3 en de 4.
- Explanation: Het is half vier.

**Variant B**

- Variant ID: `uk-clock-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":8,"minute":30}
- Choices: ["Acht uur","Half acht","Half negen","Negen uur"]
- Correct answer: "Half negen"
- hintMinnie: Bij een half uur wijst de grote wijzer omlaag.
- hintMoose: Kijk naar het uur waar de kleine wijzer naartoe gaat.
- Explanation: Het is half negen.

#### Slot q3

Authored slot ID: `clock-tower-slot-3`.

**Variant A**

- Variant ID: `uk-clock-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":10,"minute":30}
- Choices: ["Tien uur","Half tien","Half elf","Elf uur"]
- Correct answer: "Half elf"
- hintMinnie: De grote wijzer staat op de 6.
- hintMoose: De kleine wijzer staat tussen de 10 en de 11.
- Explanation: Het is half elf.

**Variant B**

- Variant ID: `uk-clock-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":12,"minute":30}
- Choices: ["Twaalf uur","Half twaalf","Half één","Eén uur"]
- Correct answer: "Half één"
- hintMinnie: De kleine wijzer staat tussen 12 en 1.
- hintMoose: Bij half noem je het uur dat eraan komt.
- Explanation: Het is half één.

#### Slot q4

Authored slot ID: `clock-tower-slot-4`.

**Variant A**

- Variant ID: `uk-clock-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":1,"minute":30}
- Choices: ["Eén uur","Half één","Half twee","Twee uur"]
- Correct answer: "Half twee"
- hintMinnie: De grote wijzer staat recht naar beneden.
- hintMoose: De kleine wijzer staat tussen de 1 en de 2.
- Explanation: Het is half twee.

**Variant B**

- Variant ID: `uk-clock-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_half_hour
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":6,"minute":30}
- Choices: ["Zes uur","Half zes","Half zeven","Zeven uur"]
- Correct answer: "Half zeven"
- hintMinnie: Kijk naar het volgende hele uur.
- hintMoose: De kleine wijzer staat tussen de 6 en de 7.
- Explanation: Het is half zeven.

### Challenge: telescope

- State: **active** (active omitted; runtime default is true)
- anchorId: `telescope`
- Linked rune(s): telescope — Koperen telescoop (objectId: telescope)
- Linked object: telescope — Koperen telescoop (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_division, story_division, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "telescope",
  "anchorId": "telescope",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "telescope"
  }
]
```

#### Slot q1

Authored slot ID: `telescope-slot-1`.

**Variant A**

- Variant ID: `telescope-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 24 : 6 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 4 = 24, is 24 : 6 = 4.
- Explanation: 24 : 6 = 4.

**Variant B**

- Variant ID: `telescope-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Atlas verdeelt 30 sterrenstickers over 6 sterrenkaarten. Op iedere kaart komen er evenveel. Hoeveel stickers per kaart?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 30 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 30.
- Explanation: 30 : 6 = 5.

#### Slot q2

Authored slot ID: `telescope-slot-2`.

**Variant A**

- Variant ID: `telescope-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 3 = ?
- Visual data: not authored
- Choices: [6,9,12,15]
- Correct answer: 9
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 3 en tel nog 3 erbij.
- Explanation: 3 × 3 = 9.

**Variant B**

- Variant ID: `telescope-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 42 : 6 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 7 = 42, is 42 : 6 = 7.
- Explanation: 42 : 6 = 7.

#### Slot q3

Authored slot ID: `telescope-slot-3`.

**Variant A**

- Variant ID: `telescope-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 48 : 6 = ?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 8 = 48, is 48 : 6 = 8.
- Explanation: 48 : 6 = 8.

**Variant B**

- Variant ID: `telescope-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 3 = ?
- Visual data: not authored
- Choices: [15,18,21,24]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 6 en tel nog 6 erbij.
- Explanation: 6 × 3 = 18.

#### Slot q4

Authored slot ID: `telescope-slot-4`.

**Variant A**

- Variant ID: `telescope-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op 2 sterrenkaarten staan elk 6 sterren. Hoeveel sterren zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Er zijn 2 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 2 × 5 en tel er nog 2 bij op.
- Explanation: 2 × 6 = 12.

**Variant B**

- Variant ID: `telescope-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op 5 sterrenkaarten staan elk 8 sterren. Hoeveel sterren zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 5 drie keer.
- Explanation: 5 × 8 = 40.

### Challenge: postbox

- State: **inactive** (authored active: false)
- anchorId: `postbox`
- Linked rune(s): postbox — Rode brievenbus (objectId: postbox)
- Linked object: postbox — Rode brievenbus (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, story_division, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "postbox",
  "anchorId": "postbox",
  "challengeCharacterId": "atlas-de-reiziger",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "postbox"
  }
]
```

#### Slot q1

Authored slot ID: `postbox-slot-1`.

**Variant A**

- Variant ID: `postbox-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 5 = ?
- Visual data: not authored
- Choices: [10,15,20,25]
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 3 sprongen van 5.
- Explanation: 3 × 5 = 15.

**Variant B**

- Variant ID: `postbox-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De postbode verdeelt 72 postkaarten eerlijk over 9 postzakken. Hoeveel kaarten gaan in iedere zak?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel 72 eerlijk over 9 gelijke groepen.
- hintMoose: Zoek in de tafel van 9 welk getal uitkomt op 72.
- Explanation: 72 : 9 = 8.

#### Slot q2

Authored slot ID: `postbox-slot-2`.

**Variant A**

- Variant ID: `postbox-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 20 : 10 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 10 helpt?
- hintMoose: Omdat 10 × 2 = 20, is 20 : 10 = 2.
- Explanation: 20 : 10 = 2.

**Variant B**

- Variant ID: `postbox-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 6 sprongen van 5.
- Explanation: 6 × 5 = 30.

#### Slot q3

Authored slot ID: `postbox-slot-3`.

**Variant A**

- Variant ID: `postbox-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 7 sprongen van 5.
- Explanation: 7 × 5 = 35.

**Variant B**

- Variant ID: `postbox-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 4 = ?
- Visual data: not authored
- Choices: [24,28,32,36]
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 7 twee keer.
- Explanation: 7 × 4 = 28.

#### Slot q4

Authored slot ID: `postbox-slot-4`.

**Variant A**

- Variant ID: `postbox-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: In 6 postzakken zitten elk 2 postkaarten. Hoeveel postkaarten zijn dat samen?
- Visual data: not authored
- Choices: [10,12,14,16]
- Correct answer: 12
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 2.
- hintMoose: Verdubbel 6.
- Explanation: 6 × 2 = 12.

**Variant B**

- Variant ID: `postbox-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 8 en tel nog 8 erbij.
- Explanation: 8 × 3 = 24.

<a id="level-lvl-0015"></a>

## LVL-0015 — Frankrijk — Het Zonnige Dorpsplein

Source: [Levels/LVL-0015/level.js](../../Levels/LVL-0015/level.js). Production level.

### Challenge: marketStall

- State: **inactive** (authored active: false)
- anchorId: `marketStall`
- Linked rune(s): marketStall — Marktkraam (objectId: marketStall)
- Linked object: marketStall — Marktkraam (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, bare_division, route, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "marketStall",
  "anchorId": "marketStall",
  "challengeCharacterId": "atlas-de-reiziger",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "marketStall"
  }
]
```

#### Slot q1

Authored slot ID: `market-stall-slot-1`.

**Variant A**

- Variant ID: `market-stall-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 5 en 2 × 5.
- Explanation: 5 × 7 = 35.

**Variant B**

- Variant ID: `market-stall-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 20 : 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 4 = 20, is 20 : 5 = 4.
- Explanation: 20 : 5 = 4.

#### Slot q2

Authored slot ID: `market-stall-slot-2`.

**Variant A**

- Variant ID: `market-stall-2a`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: Een lint van 4 meter wordt in 2 gelijke stukken geknipt voor de marktkraam. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 2
- hintMinnie: Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- hintMoose: Zoek in de tafel van 2 welk getal uitkomt op 4.
- Explanation: 4 : 2 = 2 meter.

**Variant B**

- Variant ID: `market-stall-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 9 en verdubbel dat.
- Explanation: 9 × 8 = 72.

#### Slot q3

Authored slot ID: `market-stall-slot-3`.

**Variant A**

- Variant ID: `market-stall-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 5 en tel nog 5 erbij.
- Explanation: 5 × 3 = 15.

**Variant B**

- Variant ID: `market-stall-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 9 en tel nog 9 erbij.
- Explanation: 9 × 6 = 54.

#### Slot q4

Authored slot ID: `market-stall-slot-4`.

**Variant A**

- Variant ID: `market-stall-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Bij de marktkraam staan 5 kisten met elk 9 appels. Hoeveel appels zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 5 × 10 en haal er daarna 5 af.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `market-stall-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 7 = ?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 4 en 2 × 4.
- Explanation: 4 × 7 = 28.

### Challenge: villageClock

- State: **active** (active omitted; runtime default is true)
- anchorId: `villageClock`
- Linked rune(s): villageClock — Dorpsklok (objectId: villageClock)
- Linked object: villageClock — Dorpsklok (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: clock_reading_five_minutes
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "villageClock",
  "anchorId": "villageClock",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "villageClock"
  }
]
```

#### Slot q1

Authored slot ID: `village-clock-slot-1`.

**Variant A**

- Variant ID: `fr-clock-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":10}
- Choices: ["Vijf over drie","Tien over drie","Tien voor drie","Kwart over drie"]
- Correct answer: "Tien over drie"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer op de 2 betekent tien over. De kleine wijzer staat net na de 3.
- Explanation: Het is tien over drie.

**Variant B**

- Variant ID: `fr-clock-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":6,"minute":5}
- Choices: ["Vijf voor zes","Vijf over zes","Tien over zes","Zes uur"]
- Correct answer: "Vijf over zes"
- hintMinnie: Elk cijfer is vijf minuten.
- hintMoose: De grote wijzer staat op de 1: vijf minuten na zes.
- Explanation: Het is vijf over zes.

#### Slot q2

Authored slot ID: `village-clock-slot-2`.

**Variant A**

- Variant ID: `fr-clock-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":8,"minute":20}
- Choices: ["Tien over half acht","Kwart over acht","Tien voor half negen","Half negen"]
- Correct answer: "Tien voor half negen"
- hintMinnie: De grote wijzer staat op de 4.
- hintMoose: De grote wijzer op de 4 betekent tien minuten voor half. De kleine wijzer staat tussen acht en negen.
- Explanation: Het is tien voor half negen.

**Variant B**

- Variant ID: `fr-clock-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":1,"minute":25}
- Choices: ["Vijf over één","Vijf voor half twee","Vijf over half twee","Half twee"]
- Correct answer: "Vijf voor half twee"
- hintMinnie: De grote wijzer staat op de 5.
- hintMoose: Vijf minuten voor het halve uur zeg je vijf voor half twee.
- Explanation: Het is vijf voor half twee.

#### Slot q3

Authored slot ID: `village-clock-slot-3`.

**Variant A**

- Variant ID: `fr-clock-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":5,"minute":40}
- Choices: ["Tien voor half zes","Half zes","Tien over half zes","Tien voor zes"]
- Correct answer: "Tien over half zes"
- hintMinnie: De grote wijzer staat op de 8.
- hintMoose: De grote wijzer op de 8 betekent tien minuten na half. De kleine wijzer staat tussen vijf en zes.
- Explanation: Het is tien over half zes.

**Variant B**

- Variant ID: `fr-clock-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":9,"minute":35}
- Choices: ["Vijf voor half tien","Half tien","Vijf over half tien","Vijf voor tien"]
- Correct answer: "Vijf over half tien"
- hintMinnie: De grote wijzer is net voorbij de 6.
- hintMoose: Op de 7 is het vijf minuten na half tien.
- Explanation: Het is vijf over half tien.

#### Slot q4

Authored slot ID: `village-clock-slot-4`.

**Variant A**

- Variant ID: `fr-clock-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":11,"minute":50}
- Choices: ["Tien over elf","Vijf voor twaalf","Tien voor twaalf","Twaalf uur"]
- Correct answer: "Tien voor twaalf"
- hintMinnie: De grote wijzer staat op de 10.
- hintMoose: Vanaf de 10 zijn het nog tien minuten tot twaalf.
- Explanation: Het is tien voor twaalf.

**Variant B**

- Variant ID: `fr-clock-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":2,"minute":55}
- Choices: ["Vijf over twee","Tien voor drie","Vijf voor drie","Drie uur"]
- Correct answer: "Vijf voor drie"
- hintMinnie: De grote wijzer staat op de 11.
- hintMoose: Vanaf de 11 duurt het nog vijf minuten tot drie.
- Explanation: Het is vijf voor drie.

### Challenge: fountain

- State: **active** (active omitted; runtime default is true)
- anchorId: `fountain`
- Linked rune(s): fountain — Dorpsfontein (objectId: fountain)
- Linked object: fountain — Dorpsfontein (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: story_division, bare_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "fountain",
  "anchorId": "fountain",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "fountain"
  }
]
```

#### Slot q1

Authored slot ID: `fountain-slot-1`.

**Variant A**

- Variant ID: `fountain-1a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De dorpsfontein heeft 3 bakken met samen 27 waterlelies. In iedere bak liggen er evenveel. Hoeveel waterlelies liggen in één bak?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel 27 eerlijk over 3 gelijke groepen.
- hintMoose: Zoek in de tafel van 3 welk getal uitkomt op 27.
- Explanation: 27 : 3 = 9.

**Variant B**

- Variant ID: `fountain-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 2 en tel nog 2 erbij.
- Explanation: 2 × 3 = 6.

#### Slot q2

Authored slot ID: `fountain-slot-2`.

**Variant A**

- Variant ID: `fountain-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 2 = ?
- Visual data: not authored
- Choices: [2,4,6,8]
- Correct answer: 4
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Verdubbel 2.
- Explanation: 2 × 2 = 4.

**Variant B**

- Variant ID: `fountain-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 6 = ?
- Visual data: not authored
- Choices: [36,42,48,54]
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 7 en tel nog 7 erbij.
- Explanation: 7 × 6 = 42.

#### Slot q3

Authored slot ID: `fountain-slot-3`.

**Variant A**

- Variant ID: `fountain-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 15 : 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Welke som uit de tafel van 3 helpt?
- hintMoose: Omdat 3 × 5 = 15, is 15 : 3 = 5.
- Explanation: 15 : 3 = 5.

**Variant B**

- Variant ID: `fountain-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 7 = ?
- Visual data: not authored
- Choices: [7,14,21,28]
- Correct answer: 14
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 2 en 2 × 2.
- Explanation: 2 × 7 = 14.

#### Slot q4

Authored slot ID: `fountain-slot-4`.

**Variant A**

- Variant ID: `fountain-4a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: De dorpsfontein heeft 8 bakken met samen 32 waterlelies. In iedere bak liggen er evenveel. Hoeveel waterlelies liggen in één bak?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Verdeel 32 eerlijk over 8 gelijke groepen.
- hintMoose: Zoek in de tafel van 8 welk getal uitkomt op 32.
- Explanation: 32 : 8 = 4.

**Variant B**

- Variant ID: `fountain-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 70 : 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 10 helpt?
- hintMoose: Omdat 10 × 7 = 70, is 70 : 10 = 7.
- Explanation: 70 : 10 = 7.

<a id="level-lvl-0016"></a>

## LVL-0016 — Italië — De Romeinse Route

Source: [Levels/LVL-0016/level.js](../../Levels/LVL-0016/level.js). Production level.

### Challenge: colosseum

- State: **active** (active omitted; runtime default is true)
- anchorId: `colosseum`
- Linked rune(s): colosseum — Colosseum (objectId: colosseum)
- Linked object: colosseum — Colosseum (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, story_multiplication, story_division, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "colosseum",
  "anchorId": "colosseum",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "colosseum"
  }
]
```

#### Slot q1

Authored slot ID: `colosseum-slot-1`.

**Variant A**

- Variant ID: `colosseum-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 7 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 5 en 2 × 5.
- Explanation: 5 × 7 = 35.

**Variant B**

- Variant ID: `colosseum-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Het Colosseum heeft 2 rijen met elk 3 bogen. Hoeveel bogen zijn dat samen?
- Visual data: not authored
- Choices: [3,6,9,12]
- Correct answer: 6
- hintMinnie: Er zijn 2 gelijke groepjes. In elk groepje zitten er 3.
- hintMoose: Verdubbel 2 en tel er nog 2 bij op.
- Explanation: 2 × 3 = 6.

#### Slot q2

Authored slot ID: `colosseum-slot-2`.

**Variant A**

- Variant ID: `colosseum-2a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: In het Colosseum zijn 81 zitplaatsen verdeeld over 9 rijen. Hoeveel zitplaatsen zijn er per rij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 9
- hintMinnie: Verdeel 81 eerlijk over 9 gelijke groepen.
- hintMoose: Zoek in de tafel van 9 welk getal uitkomt op 81.
- Explanation: 81 : 9 = 9.

**Variant B**

- Variant ID: `colosseum-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 7 en tel nog 7 erbij.
- Explanation: 7 × 6 = 42.

#### Slot q3

Authored slot ID: `colosseum-slot-3`.

**Variant A**

- Variant ID: `colosseum-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 27
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 3 en haal 3 eraf.
- Explanation: 3 × 9 = 27.

**Variant B**

- Variant ID: `colosseum-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 7 twee keer.
- Explanation: 7 × 4 = 28.

#### Slot q4

Authored slot ID: `colosseum-slot-4`.

**Variant A**

- Variant ID: `colosseum-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Het Colosseum heeft 5 rijen met elk 9 bogen. Hoeveel bogen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 5 × 10 en haal er daarna 5 af.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `colosseum-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 54 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 6 = 54, is 54 : 9 = 6.
- Explanation: 54 : 9 = 6.

### Challenge: romanFountain

- State: **active** (active omitted; runtime default is true)
- anchorId: `romanFountain`
- Linked rune(s): romanFountain — Romeinse fontein (objectId: romanFountain)
- Linked object: romanFountain — Romeinse fontein (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, money, story_multiplication, bare_division, route
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "romanFountain",
  "anchorId": "romanFountain",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "romanFountain"
  }
]
```

#### Slot q1

Authored slot ID: `roman-fountain-slot-1`.

**Variant A**

- Variant ID: `roman-fountain-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 6 = ?
- Visual data: not authored
- Choices: [18,24,30,36]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 4 en tel nog 4 erbij.
- Explanation: 4 × 6 = 24.

**Variant B**

- Variant ID: `roman-fountain-1b`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Atlas koopt 3 ansichtkaarten van de fontein voor 4 euro per stuk. Hoeveel euro betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Er zijn 3 gelijke bedragen van 4 euro.
- hintMoose: Verdubbel 3 en verdubbel de uitkomst nog eens.
- Explanation: 3 × 4 = 12 euro.

#### Slot q2

Authored slot ID: `roman-fountain-slot-2`.

**Variant A**

- Variant ID: `roman-fountain-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 5 = ?
- Visual data: not authored
- Choices: [20,25,30,35]
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 5 sprongen van 5.
- Explanation: 5 × 5 = 25.

**Variant B**

- Variant ID: `roman-fountain-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Rond de Romeinse fontein liggen 7 mozaïekstroken met elk 6 tegels. Hoeveel tegels zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 42
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 7 × 5 en tel er nog 7 bij op.
- Explanation: 7 × 6 = 42.

#### Slot q3

Authored slot ID: `roman-fountain-slot-3`.

**Variant A**

- Variant ID: `roman-fountain-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 24 : 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 4 helpt?
- hintMoose: Omdat 4 × 6 = 24, is 24 : 4 = 6.
- Explanation: 24 : 4 = 6.

**Variant B**

- Variant ID: `roman-fountain-3b`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: De rand van de Romeinse fontein is 14 meter lang en verdeeld in 7 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 2
- hintMinnie: Verdeel de totale lengte eerlijk over 7 gelijke stukken.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 14.
- Explanation: 14 : 7 = 2 meter.

#### Slot q4

Authored slot ID: `roman-fountain-slot-4`.

**Variant A**

- Variant ID: `roman-fountain-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 5 en haal 5 eraf.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `roman-fountain-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Rond de Romeinse fontein liggen 5 mozaïekstroken met elk 8 tegels. Hoeveel tegels zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 5 drie keer.
- Explanation: 5 × 8 = 40.

### Challenge: gelatoCart

- State: **active** (active omitted; runtime default is true)
- anchorId: `gelatoCart`
- Linked rune(s): gelatoCart — Gelatokar (objectId: gelatoCart)
- Linked object: gelatoCart — Gelatokar (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, bare_division, story_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "gelatoCart",
  "anchorId": "gelatoCart",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "gelatoCart"
  }
]
```

#### Slot q1

Authored slot ID: `gelato-cart-slot-1`.

**Variant A**

- Variant ID: `gelato-cart-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 9 = ?
- Visual data: not authored
- Choices: [54,63,72,81]
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 7 en haal 7 eraf.
- Explanation: 7 × 9 = 63.

**Variant B**

- Variant ID: `gelato-cart-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q2

Authored slot ID: `gelato-cart-slot-2`.

**Variant A**

- Variant ID: `gelato-cart-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 9
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 3 en tel nog 3 erbij.
- Explanation: 3 × 3 = 9.

**Variant B**

- Variant ID: `gelato-cart-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 30 : 5 = ?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 6 = 30, is 30 : 5 = 6.
- Explanation: 30 : 5 = 6.

#### Slot q3

Authored slot ID: `gelato-cart-slot-3`.

**Variant A**

- Variant ID: `gelato-cart-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 7 = ?
- Visual data: not authored
- Choices: [56,63,70,77]
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 9 en 2 × 9.
- Explanation: 9 × 7 = 63.

**Variant B**

- Variant ID: `gelato-cart-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De ijsverkoper verdeelt 54 ijsbekers over 6 dienbladen. Op ieder blad komen er evenveel. Hoeveel bekers per dienblad?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel 54 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 54.
- Explanation: 54 : 6 = 9.

#### Slot q4

Authored slot ID: `gelato-cart-slot-4`.

**Variant A**

- Variant ID: `gelato-cart-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: De ijsverkoper zet 5 dienbladen klaar met elk 9 ijsbekers. Hoeveel bekers zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 5 × 10 en haal er daarna 5 af.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `gelato-cart-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 10 = ?
- Visual data: not authored
- Choices: [60,70,80,90]
- Correct answer: 70
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 7 groepjes van 10 eindigen op nul.
- Explanation: 7 × 10 = 70.

<a id="level-lvl-0017"></a>

## LVL-0017 — Oostenrijk — De Alpenpoort

Source: [Levels/LVL-0017/level.js](../../Levels/LVL-0017/level.js). Production level.

### Challenge: clockHouse

- State: **active** (active omitted; runtime default is true)
- anchorId: `clockHouse`
- Linked rune(s): clockHouse — Alpenklokhuis (objectId: clockHouse)
- Linked object: clockHouse — Alpenklokhuis (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: clock_reading_five_minutes
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "clockHouse",
  "anchorId": "clockHouse",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "clockHouse"
  }
]
```

#### Slot q1

Authored slot ID: `clock-house-slot-1`.

**Variant A**

- Variant ID: `at-clock-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":0}
- Choices: ["Half drie","Drie uur","Half vier","Vier uur"]
- Correct answer: "Drie uur"
- hintMinnie: De grote wijzer staat op de 12.
- hintMoose: Als de grote wijzer op de 12 staat, kijk je welk uur de kleine wijzer aanwijst.
- Explanation: De grote wijzer staat op de 12 en de kleine wijzer op de 3. Het is drie uur.

**Variant B**

- Variant ID: `at-clock-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":12,"minute":0}
- Choices: ["Half twaalf","Twaalf uur","Half één","Eén uur"]
- Correct answer: "Twaalf uur"
- hintMinnie: De grote wijzer staat op de 12.
- hintMoose: Beide wijzers wijzen naar de 12.
- Explanation: De grote en de kleine wijzer staan op de 12. Het is twaalf uur.

#### Slot q2

Authored slot ID: `clock-house-slot-2`.

**Variant A**

- Variant ID: `at-clock-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":6,"minute":0}
- Choices: ["Half zes","Zes uur","Half zeven","Zeven uur"]
- Correct answer: "Zes uur"
- hintMinnie: De grote wijzer staat op de 12.
- hintMoose: Kijk nu naar het cijfer dat de kleine wijzer aanwijst.
- Explanation: De grote wijzer staat op de 12 en de kleine wijzer op de 6. Het is zes uur.

**Variant B**

- Variant ID: `at-clock-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":9,"minute":0}
- Choices: ["Half negen","Negen uur","Half tien","Tien uur"]
- Correct answer: "Negen uur"
- hintMinnie: De grote wijzer staat op de 12.
- hintMoose: De kleine wijzer wijst precies naar de 9.
- Explanation: De grote wijzer staat op de 12 en de kleine wijzer op de 9. Het is negen uur.

#### Slot q3

Authored slot ID: `clock-house-slot-3`.

**Variant A**

- Variant ID: `at-clock-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":20}
- Choices: ["Kwart over drie","Tien voor half vier","Tien over half drie","Half vier"]
- Correct answer: "Tien voor half vier"
- hintMinnie: De grote wijzer staat op de 4.
- hintMoose: Op de 4 zijn twintig minuten voorbij. Dat is tien minuten voor half vier.
- Explanation: De grote wijzer staat op de 4 en de kleine wijzer tussen de 3 en de 4. Het is tien voor half vier.

**Variant B**

- Variant ID: `at-clock-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":5,"minute":40}
- Choices: ["Tien voor half zes","Half zes","Tien over half zes","Tien voor zes"]
- Correct answer: "Tien over half zes"
- hintMinnie: De grote wijzer staat op de 8.
- hintMoose: Op de 8 zijn veertig minuten voorbij. Dat is tien minuten na half zes.
- Explanation: De grote wijzer staat op de 8 en de kleine wijzer tussen de 5 en de 6. Het is tien over half zes.

#### Slot q4

Authored slot ID: `clock-house-slot-4`.

**Variant A**

- Variant ID: `at-clock-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":9,"minute":25}
- Choices: ["Vijf over negen","Vijf voor half tien","Half tien","Vijf over half tien"]
- Correct answer: "Vijf voor half tien"
- hintMinnie: De grote wijzer staat op de 5.
- hintMoose: Op de 5 zijn vijfentwintig minuten voorbij. Dat is vijf minuten voor half tien.
- Explanation: De grote wijzer staat op de 5 en de kleine wijzer tussen de 9 en de 10. Het is vijf voor half tien.

**Variant B**

- Variant ID: `at-clock-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":12,"minute":50}
- Choices: ["Tien over twaalf","Vijf voor één","Tien voor één","Eén uur"]
- Correct answer: "Tien voor één"
- hintMinnie: De grote wijzer staat op de 10.
- hintMoose: Vanaf de 10 zijn het nog tien minuten tot het volgende hele uur.
- Explanation: De grote wijzer staat op de 10 en de kleine wijzer bijna op de 1. Het is tien voor één.

### Challenge: alpineFountain

- State: **active** (active omitted; runtime default is true)
- anchorId: `alpineFountain`
- Linked rune(s): alpineFountain — Alpenfontein (objectId: alpineFountain)
- Linked object: alpineFountain — Alpenfontein (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, story_division, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "alpineFountain",
  "anchorId": "alpineFountain",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "alpineFountain"
  }
]
```

#### Slot q1

Authored slot ID: `alpine-fountain-slot-1`.

**Variant A**

- Variant ID: `alpine-fountain-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 7 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 5 en 2 × 5.
- Explanation: 5 × 7 = 35.

**Variant B**

- Variant ID: `alpine-fountain-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 7 en verdubbel dat.
- Explanation: 7 × 8 = 56.

#### Slot q2

Authored slot ID: `alpine-fountain-slot-2`.

**Variant A**

- Variant ID: `alpine-fountain-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 8 = ?
- Visual data: not authored
- Choices: [56,64,72,80]
- Correct answer: 64
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 8 en verdubbel dat.
- Explanation: 8 × 8 = 64.

**Variant B**

- Variant ID: `alpine-fountain-2b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Rond de Alpenfontein staan 4 bloembakken met samen 20 bloemen. In iedere bak staan er evenveel. Hoeveel bloemen per bak?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 20 eerlijk over 4 gelijke groepen.
- hintMoose: Zoek in de tafel van 4 welk getal uitkomt op 20.
- Explanation: 20 : 4 = 5.

#### Slot q3

Authored slot ID: `alpine-fountain-slot-3`.

**Variant A**

- Variant ID: `alpine-fountain-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 16 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 8 helpt?
- hintMoose: Omdat 8 × 2 = 16, is 16 : 8 = 2.
- Explanation: 16 : 8 = 2.

**Variant B**

- Variant ID: `alpine-fountain-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 14 : 7 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 2 = 14, is 14 : 7 = 2.
- Explanation: 14 : 7 = 2.

#### Slot q4

Authored slot ID: `alpine-fountain-slot-4`.

**Variant A**

- Variant ID: `alpine-fountain-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Rond de Alpenfontein staan 9 bloembakken met elk 5 bloemen. Hoeveel bloemen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 5.
- hintMoose: Tel 9 sprongen van 5.
- Explanation: 9 × 5 = 45.

**Variant B**

- Variant ID: `alpine-fountain-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 2 sprongen van 5.
- Explanation: 2 × 5 = 10.

### Challenge: cableCar

- State: **active** (active omitted; runtime default is true)
- anchorId: `cableCar`
- Linked rune(s): cableCar — Rode kabelbaan (objectId: cableCar)
- Linked object: cableCar — Rode kabelbaan (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, money, story_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "cableCar",
  "anchorId": "cableCar",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "cableCar"
  }
]
```

#### Slot q1

Authored slot ID: `cable-car-slot-1`.

**Variant A**

- Variant ID: `cable-car-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 10 = ?
- Visual data: not authored
- Choices: [70,80,90,100]
- Correct answer: 80
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 8 groepjes van 10 eindigen op nul.
- Explanation: 8 × 10 = 80.

**Variant B**

- Variant ID: `cable-car-1b`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Atlas koopt 8 kabelbaankaartjes voor 9 euro per stuk. Hoeveel euro betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Er zijn 8 gelijke bedragen van 9 euro.
- hintMoose: Reken 8 × 10 en haal er daarna 8 af.
- Explanation: 8 × 9 = 72 euro.

#### Slot q2

Authored slot ID: `cable-car-slot-2`.

**Variant A**

- Variant ID: `cable-car-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 9 = ?
- Visual data: not authored
- Choices: [72,81,90,99]
- Correct answer: 81
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 9 en haal 9 eraf.
- Explanation: 9 × 9 = 81.

**Variant B**

- Variant ID: `cable-car-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Er rijden 4 kabelbaancabines met elk 3 reizigers. Hoeveel reizigers zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 3.
- hintMoose: Verdubbel 4 en tel er nog 4 bij op.
- Explanation: 4 × 3 = 12.

#### Slot q3

Authored slot ID: `cable-car-slot-3`.

**Variant A**

- Variant ID: `cable-car-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Er rijden 6 kabelbaancabines met elk 4 reizigers. Hoeveel reizigers zijn dat samen?
- Visual data: not authored
- Choices: [20,24,28,32]
- Correct answer: 24
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 6 en verdubbel de uitkomst nog eens.
- Explanation: 6 × 4 = 24.

**Variant B**

- Variant ID: `cable-car-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 18 : 3 = ?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 3 helpt?
- hintMoose: Omdat 3 × 6 = 18, is 18 : 3 = 6.
- Explanation: 18 : 3 = 6.

#### Slot q4

Authored slot ID: `cable-car-slot-4`.

**Variant A**

- Variant ID: `cable-car-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

**Variant B**

- Variant ID: `cable-car-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Er rijden 4 kabelbaancabines met elk 7 reizigers. Hoeveel reizigers zijn dat samen?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- Explanation: 4 × 7 = 28.

<a id="level-lvl-0018"></a>

## LVL-0018 — Noorwegen — Het Fjordlicht

Source: [Levels/LVL-0018/level.js](../../Levels/LVL-0018/level.js). Production level.

### Challenge: staveChurch

- State: **active** (active omitted; runtime default is true)
- anchorId: `staveChurch`
- Linked rune(s): staveChurch — Houten staafkerk (objectId: staveChurch)
- Linked object: staveChurch — Houten staafkerk (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, bare_division, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "staveChurch",
  "anchorId": "staveChurch",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "staveChurch"
  }
]
```

#### Slot q1

Authored slot ID: `stave-church-slot-1`.

**Variant A**

- Variant ID: `stave-church-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 6 en verdubbel dat.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `stave-church-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 12 : 4 = ?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Welke som uit de tafel van 4 helpt?
- hintMoose: Omdat 4 × 3 = 12, is 12 : 4 = 3.
- Explanation: 12 : 4 = 3.

#### Slot q2

Authored slot ID: `stave-church-slot-2`.

**Variant A**

- Variant ID: `stave-church-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 5 = ?
- Visual data: not authored
- Choices: [20,25,30,35]
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Tel 5 sprongen van 5.
- Explanation: 5 × 5 = 25.

**Variant B**

- Variant ID: `stave-church-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 6 = ?
- Visual data: not authored
- Choices: [36,42,48,54]
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 7 en tel nog 7 erbij.
- Explanation: 7 × 6 = 42.

#### Slot q3

Authored slot ID: `stave-church-slot-3`.

**Variant A**

- Variant ID: `stave-church-3a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: De timmerman verdeelt 15 houten plankjes eerlijk over 3 deuren. Hoeveel plankjes gebruikt hij per deur?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 15 eerlijk over 3 gelijke groepen.
- hintMoose: Zoek in de tafel van 3 welk getal uitkomt op 15.
- Explanation: 15 : 3 = 5.

**Variant B**

- Variant ID: `stave-church-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 10 = ?
- Visual data: not authored
- Choices: [40,50,60,70]
- Correct answer: 50
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 5 groepjes van 10 eindigen op nul.
- Explanation: 5 × 10 = 50.

#### Slot q4

Authored slot ID: `stave-church-slot-4`.

**Variant A**

- Variant ID: `stave-church-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

**Variant B**

- Variant ID: `stave-church-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 9 twee keer.
- Explanation: 9 × 4 = 36.

### Challenge: lighthouse

- State: **active** (active omitted; runtime default is true)
- anchorId: `lighthouse`
- Linked rune(s): lighthouse — Fjordvuurtoren (objectId: lighthouse)
- Linked object: lighthouse — Fjordvuurtoren (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: story_division, bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "lighthouse",
  "anchorId": "lighthouse",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "lighthouse"
  }
]
```

#### Slot q1

Authored slot ID: `lighthouse-slot-1`.

**Variant A**

- Variant ID: `lighthouse-1a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De vuurtoren heeft 8 ramen met samen 48 lichtjes. In ieder raam branden er evenveel. Hoeveel lichtjes per raam?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel 48 eerlijk over 8 gelijke groepen.
- hintMoose: Zoek in de tafel van 8 welk getal uitkomt op 48.
- Explanation: 48 : 8 = 6.

**Variant B**

- Variant ID: `lighthouse-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 6 en 2 × 6.
- Explanation: 6 × 7 = 42.

#### Slot q2

Authored slot ID: `lighthouse-slot-2`.

**Variant A**

- Variant ID: `lighthouse-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 81 : 9 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 9 helpt?
- hintMoose: Omdat 9 × 9 = 81, is 81 : 9 = 9.
- Explanation: 81 : 9 = 9.

**Variant B**

- Variant ID: `lighthouse-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 30 : 5 = ?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 6 = 30, is 30 : 5 = 6.
- Explanation: 30 : 5 = 6.

#### Slot q3

Authored slot ID: `lighthouse-slot-3`.

**Variant A**

- Variant ID: `lighthouse-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 16
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 2 en verdubbel dat.
- Explanation: 2 × 8 = 16.

**Variant B**

- Variant ID: `lighthouse-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De vuurtoren heeft 7 ringen met elk 4 lampen. Hoeveel lampen zijn dat samen?
- Visual data: not authored
- Choices: [24,28,32,36]
- Correct answer: 28
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 4.
- hintMoose: Verdubbel 7 en verdubbel de uitkomst nog eens.
- Explanation: 7 × 4 = 28.

#### Slot q4

Authored slot ID: `lighthouse-slot-4`.

**Variant A**

- Variant ID: `lighthouse-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 8 twee keer.
- Explanation: 8 × 4 = 32.

**Variant B**

- Variant ID: `lighthouse-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 4 en 2 × 4.
- Explanation: 4 × 7 = 28.

### Challenge: vikingShip

- State: **active** (active omitted; runtime default is true)
- anchorId: `vikingShip`
- Linked rune(s): vikingShip — Vikingschip (objectId: vikingShip)
- Linked object: vikingShip — Vikingschip (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "vikingShip",
  "anchorId": "vikingShip",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "vikingShip"
  }
]
```

#### Slot q1

Authored slot ID: `viking-ship-slot-1`.

**Variant A**

- Variant ID: `viking-ship-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 6 en verdubbel dat.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `viking-ship-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 3 twee keer.
- Explanation: 3 × 4 = 12.

#### Slot q2

Authored slot ID: `viking-ship-slot-2`.

**Variant A**

- Variant ID: `viking-ship-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 16 : 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 4 helpt?
- hintMoose: Omdat 4 × 4 = 16, is 16 : 4 = 4.
- Explanation: 16 : 4 = 4.

**Variant B**

- Variant ID: `viking-ship-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op het Vikingschip staan 8 rijen met elk 7 scheepskisten. Hoeveel kisten zijn dat samen?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- Explanation: 8 × 7 = 56.

#### Slot q3

Authored slot ID: `viking-ship-slot-3`.

**Variant A**

- Variant ID: `viking-ship-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 9 = ?
- Visual data: not authored
- Choices: [18,27,36,45]
- Correct answer: 27
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 3 en haal 3 eraf.
- Explanation: 3 × 9 = 27.

**Variant B**

- Variant ID: `viking-ship-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 9 = ?
- Visual data: not authored
- Choices: [27,36,45,54]
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 4 en haal 4 eraf.
- Explanation: 4 × 9 = 36.

#### Slot q4

Authored slot ID: `viking-ship-slot-4`.

**Variant A**

- Variant ID: `viking-ship-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 4 en verdubbel dat.
- Explanation: 4 × 8 = 32.

**Variant B**

- Variant ID: `viking-ship-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 4 en 2 × 4.
- Explanation: 4 × 7 = 28.

<a id="level-lvl-0019"></a>

## LVL-0019 — Zweden — Het Dorp aan het Water

Source: [Levels/LVL-0019/level.js](../../Levels/LVL-0019/level.js). Production level.

### Challenge: dalaHorse

- State: **active** (active omitted; runtime default is true)
- anchorId: `dalaHorse`
- Linked rune(s): dalaHorse — Dalapaard (objectId: dalaHorse)
- Linked object: dalaHorse — Dalapaard (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: story_division, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "dalaHorse",
  "anchorId": "dalaHorse",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "dalaHorse"
  }
]
```

#### Slot q1

Authored slot ID: `dala-horse-slot-1`.

**Variant A**

- Variant ID: `dala-horse-1a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De schilder verdeelt 24 verfstrepen over 6 banen op het Dalapaard. Op iedere baan komen er evenveel. Hoeveel strepen per baan?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Verdeel 24 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 24.
- Explanation: 24 : 6 = 4.

**Variant B**

- Variant ID: `dala-horse-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 5 en tel nog 5 erbij.
- Explanation: 5 × 6 = 30.

#### Slot q2

Authored slot ID: `dala-horse-slot-2`.

**Variant A**

- Variant ID: `dala-horse-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Het Dalapaard heeft 7 banen met elk 7 verfstrepen. Hoeveel verfstrepen zijn dat samen?
- Visual data: not authored
- Choices: [42,49,56,63]
- Correct answer: 49
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 7 × 5 en 7 × 2 en tel de uitkomsten op.
- Explanation: 7 × 7 = 49.

**Variant B**

- Variant ID: `dala-horse-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 9 en verdubbel dat.
- Explanation: 9 × 8 = 72.

#### Slot q3

Authored slot ID: `dala-horse-slot-3`.

**Variant A**

- Variant ID: `dala-horse-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 3 = ?
- Visual data: not authored
- Choices: [12,15,18,21]
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 5 en tel nog 5 erbij.
- Explanation: 5 × 3 = 15.

**Variant B**

- Variant ID: `dala-horse-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 8 = ?
- Visual data: not authored
- Choices: [16,24,32,40]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 3 en verdubbel dat.
- Explanation: 3 × 8 = 24.

#### Slot q4

Authored slot ID: `dala-horse-slot-4`.

**Variant A**

- Variant ID: `dala-horse-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Het Dalapaard heeft 6 banen met elk 2 verfstrepen. Hoeveel verfstrepen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 2.
- hintMoose: Verdubbel 6.
- Explanation: 6 × 2 = 12.

**Variant B**

- Variant ID: `dala-horse-4b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: De schilder verdeelt 18 verfstrepen over 6 banen op het Dalapaard. Op iedere baan komen er evenveel. Hoeveel strepen per baan?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Verdeel 18 eerlijk over 6 gelijke groepen.
- hintMoose: Zoek in de tafel van 6 welk getal uitkomt op 18.
- Explanation: 18 : 6 = 3.

### Challenge: maypole

- State: **active** (active omitted; runtime default is true)
- anchorId: `maypole`
- Linked rune(s): maypole — Zweedse meiboom (objectId: maypole)
- Linked object: maypole — Zweedse meiboom (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: bare_multiplication, story_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "maypole",
  "anchorId": "maypole",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "maypole"
  }
]
```

#### Slot q1

Authored slot ID: `maypole-slot-1`.

**Variant A**

- Variant ID: `maypole-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Verdubbel 2 twee keer.
- Explanation: 2 × 4 = 8.

**Variant B**

- Variant ID: `maypole-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 3 = ?
- Visual data: not authored
- Choices: [3,6,9,12]
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 2 en tel nog 2 erbij.
- Explanation: 2 × 3 = 6.

#### Slot q2

Authored slot ID: `maypole-slot-2`.

**Variant A**

- Variant ID: `maypole-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 7 = ?
- Visual data: not authored
- Choices: [42,49,56,63]
- Correct answer: 49
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 7 en 2 × 7.
- Explanation: 7 × 7 = 49.

**Variant B**

- Variant ID: `maypole-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Aan de meiboom hangen 8 bloemenkransen met elk 7 bloemen. Hoeveel bloemen zijn dat samen?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- Explanation: 8 × 7 = 56.

#### Slot q3

Authored slot ID: `maypole-slot-3`.

**Variant A**

- Variant ID: `maypole-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Aan de meiboom hangen 9 bloemenkransen met elk 7 bloemen. Hoeveel bloemen zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Er zijn 9 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 9 × 5 en 9 × 2 en tel de uitkomsten op.
- Explanation: 9 × 7 = 63.

**Variant B**

- Variant ID: `maypole-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken 5 × 9 en tel nog 9 erbij.
- Explanation: 9 × 6 = 54.

#### Slot q4

Authored slot ID: `maypole-slot-4`.

**Variant A**

- Variant ID: `maypole-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Aan de meiboom hangen 3 bloemenkransen met elk 7 bloemen. Hoeveel bloemen zijn dat samen?
- Visual data: not authored
- Choices: [14,21,28,35]
- Correct answer: 21
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 3 × 5 en 3 × 2 en tel de uitkomsten op.
- Explanation: 3 × 7 = 21.

**Variant B**

- Variant ID: `maypole-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 10 : 5 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke som uit de tafel van 5 helpt?
- hintMoose: Omdat 5 × 2 = 10, is 10 : 5 = 2.
- Explanation: 10 : 5 = 2.

### Challenge: harborClock

- State: **active** (active omitted; runtime default is true)
- anchorId: `harborClock`
- Linked rune(s): harborClock — Havenklok (objectId: harborClock)
- Linked object: harborClock — Havenklok (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: clock_reading_five_minutes
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "harborClock",
  "anchorId": "harborClock",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "harborClock"
  }
]
```

#### Slot q1

Authored slot ID: `harbor-clock-slot-1`.

**Variant A**

- Variant ID: `se-clock-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":9,"minute":10}
- Choices: ["Vijf over negen","Tien over negen","Tien voor negen","Kwart over negen"]
- Correct answer: "Tien over negen"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: De grote wijzer op de 2 betekent tien over negen.
- Explanation: Het is tien over negen.

**Variant B**

- Variant ID: `se-clock-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":5,"minute":20}
- Choices: ["Kwart over vijf","Tien voor half zes","Tien over half vijf","Half zes"]
- Correct answer: "Tien voor half zes"
- hintMinnie: De grote wijzer staat op de 4.
- hintMoose: De grote wijzer op de 4 betekent tien minuten voor half. De kleine wijzer staat tussen vijf en zes.
- Explanation: Het is tien voor half zes.

#### Slot q2

Authored slot ID: `harbor-clock-slot-2`.

**Variant A**

- Variant ID: `se-clock-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":25}
- Choices: ["Vijf over drie","Vijf voor half vier","Half vier","Vijf over half vier"]
- Correct answer: "Vijf voor half vier"
- hintMinnie: De grote wijzer staat op de 5.
- hintMoose: Dat is vijf minuten voor half vier.
- Explanation: Het is vijf voor half vier.

**Variant B**

- Variant ID: `se-clock-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":7,"minute":35}
- Choices: ["Half acht","Vijf voor half acht","Vijf over half acht","Vijf voor acht"]
- Correct answer: "Vijf over half acht"
- hintMinnie: De grote wijzer staat op de 7.
- hintMoose: Dat is vijf minuten na half acht.
- Explanation: Het is vijf over half acht.

#### Slot q3

Authored slot ID: `harbor-clock-slot-3`.

**Variant A**

- Variant ID: `se-clock-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":10,"minute":40}
- Choices: ["Tien voor half elf","Half elf","Tien over half elf","Tien voor elf"]
- Correct answer: "Tien over half elf"
- hintMinnie: De grote wijzer staat op de 8.
- hintMoose: De grote wijzer op de 8 betekent tien minuten na half. De kleine wijzer staat tussen tien en elf.
- Explanation: Het is tien over half elf.

**Variant B**

- Variant ID: `se-clock-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":1,"minute":50}
- Choices: ["Tien over één","Vijf voor twee","Tien voor twee","Twee uur"]
- Correct answer: "Tien voor twee"
- hintMinnie: De grote wijzer staat op de 10.
- hintMoose: Vanaf de 10 zijn het nog tien minuten tot twee.
- Explanation: Het is tien voor twee.

#### Slot q4

Authored slot ID: `harbor-clock-slot-4`.

**Variant A**

- Variant ID: `se-clock-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":6,"minute":5}
- Choices: ["Vijf voor zes","Vijf over zes","Tien over zes","Zes uur"]
- Correct answer: "Vijf over zes"
- hintMinnie: De grote wijzer staat op de 1.
- hintMoose: Op de 1 zijn vijf minuten voorbij.
- Explanation: Het is vijf over zes.

**Variant B**

- Variant ID: `se-clock-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading_five_minutes
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":11,"minute":55}
- Choices: ["Vijf over elf","Tien voor twaalf","Vijf voor twaalf","Twaalf uur"]
- Correct answer: "Vijf voor twaalf"
- hintMinnie: De grote wijzer staat op de 11.
- hintMoose: Vanaf de 11 duurt het nog vijf minuten tot twaalf.
- Explanation: Het is vijf voor twaalf.

<a id="level-lvl-0020"></a>

## LVL-0020 — Rheden — Terug naar de Posbank

Source: [Levels/LVL-0020/level.js](../../Levels/LVL-0020/level.js). Production level.

### Challenge: mapBoard

- State: **active** (active omitted; runtime default is true)
- anchorId: `mapBoard`
- Linked rune(s): mapBoard — Posbankkaart (objectId: mapBoard)
- Linked object: mapBoard — Posbankkaart (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: story_division, bare_multiplication, story_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "mapBoard",
  "anchorId": "mapBoard",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "mapBoard"
  }
]
```

#### Slot q1

Authored slot ID: `map-board-slot-1`.

**Variant A**

- Variant ID: `map-board-1a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Op de Posbankkaart zijn 35 routepunten verdeeld over 7 wandelroutes. Hoeveel routepunten staan er per route?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel 35 eerlijk over 7 gelijke groepen.
- hintMoose: Zoek in de tafel van 7 welk getal uitkomt op 35.
- Explanation: 35 : 7 = 5.

**Variant B**

- Variant ID: `map-board-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 7 = ?
- Visual data: not authored
- Choices: [35,42,49,56]
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 6 en 2 × 6.
- Explanation: 6 × 7 = 42.

#### Slot q2

Authored slot ID: `map-board-slot-2`.

**Variant A**

- Variant ID: `map-board-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de Posbankkaart staan 6 wandelroutes met elk 6 routepunten. Hoeveel routepunten zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 6.
- hintMoose: Reken 6 × 5 en tel er nog 6 bij op.
- Explanation: 6 × 6 = 36.

**Variant B**

- Variant ID: `map-board-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de Posbankkaart staan 8 wandelroutes met elk 7 routepunten. Hoeveel routepunten zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- hintMoose: Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- Explanation: 8 × 7 = 56.

#### Slot q3

Authored slot ID: `map-board-slot-3`.

**Variant A**

- Variant ID: `map-board-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 63 : 7 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 9 = 63, is 63 : 7 = 9.
- Explanation: 63 : 7 = 9.

**Variant B**

- Variant ID: `map-board-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 54 : 6 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke som uit de tafel van 6 helpt?
- hintMoose: Omdat 6 × 9 = 54, is 54 : 6 = 9.
- Explanation: 54 : 6 = 9.

#### Slot q4

Authored slot ID: `map-board-slot-4`.

**Variant A**

- Variant ID: `map-board-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Op de Posbankkaart staan 4 wandelroutes met elk 8 routepunten. Hoeveel routepunten zijn dat samen?
- Visual data: not authored
- Choices: [24,32,40,48]
- Correct answer: 32
- hintMinnie: Er zijn 4 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 4 drie keer.
- Explanation: 4 × 8 = 32.

**Variant B**

- Variant ID: `map-board-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 14 : 2 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke som uit de tafel van 2 helpt?
- hintMoose: Omdat 2 × 7 = 14, is 14 : 2 = 7.
- Explanation: 14 : 2 = 7.

### Challenge: telescope

- State: **active** (active omitted; runtime default is true)
- anchorId: `telescope`
- Linked rune(s): telescope — Heidekijker (objectId: telescope)
- Linked object: telescope — Heidekijker (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: story_multiplication, bare_multiplication, route, money, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "telescope",
  "anchorId": "telescope",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "telescope"
  }
]
```

#### Slot q1

Authored slot ID: `telescope-slot-1`.

**Variant A**

- Variant ID: `telescope-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Door de heidekijker ziet Atlas 6 zwermen met elk 8 vogels. Hoeveel vogels ziet hij?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Er zijn 6 gelijke groepjes. In elk groepje zitten er 8.
- hintMoose: Verdubbel 6 drie keer.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `telescope-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 7 = ?
- Visual data: not authored
- Choices: [35,42,49,56]
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken 5 × 6 en 2 × 6.
- Explanation: 6 × 7 = 42.

#### Slot q2

Authored slot ID: `telescope-slot-2`.

**Variant A**

- Variant ID: `telescope-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 2 groepjes van 10 eindigen op nul.
- Explanation: 2 × 10 = 20.

**Variant B**

- Variant ID: `telescope-2b`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: Het pad naar de heidekijker is 6 meter lang en bestaat uit 2 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- hintMoose: Zoek in de tafel van 2 welk getal uitkomt op 6.
- Explanation: 6 : 2 = 3 meter.

#### Slot q3

Authored slot ID: `telescope-slot-3`.

**Variant A**

- Variant ID: `telescope-3a`
- Domain: math
- School band: E5-intended
- Family: money
- Presentation: story
- Answer mode: open
- Prompt: Atlas koopt 6 wandelkaarten voor 4 euro per stuk. Hoeveel euro betaalt hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Er zijn 6 gelijke bedragen van 4 euro.
- hintMoose: Verdubbel 6 en verdubbel de uitkomst nog eens.
- Explanation: 6 × 4 = 24 euro.

**Variant B**

- Variant ID: `telescope-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 10 = ?
- Visual data: not authored
- Choices: [40,50,60,70]
- Correct answer: 50
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: 5 groepjes van 10 eindigen op nul.
- Explanation: 5 × 10 = 50.

#### Slot q4

Authored slot ID: `telescope-slot-4`.

**Variant A**

- Variant ID: `telescope-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 32 : 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke som uit de tafel van 4 helpt?
- hintMoose: Omdat 4 × 8 = 32, is 32 : 4 = 8.
- Explanation: 32 : 4 = 8.

**Variant B**

- Variant ID: `telescope-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 28 : 7 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke som uit de tafel van 7 helpt?
- hintMoose: Omdat 7 × 4 = 28, is 28 : 7 = 4.
- Explanation: 28 : 7 = 4.

### Challenge: deerStatue

- State: **active** (active omitted; runtime default is true)
- anchorId: `deerStatue`
- Linked rune(s): deerStatue — Hertenbeeld (objectId: deerStatue)
- Linked object: deerStatue — Hertenbeeld (type: rune)
- challengeCharacterId: `atlas-de-reiziger`
- Families: story_multiplication, story_division, bare_multiplication, route
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "deerStatue",
  "anchorId": "deerStatue",
  "challengeCharacterId": "atlas-de-reiziger"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "deerStatue"
  }
]
```

#### Slot q1

Authored slot ID: `deer-statue-slot-1`.

**Variant A**

- Variant ID: `deer-statue-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het hertenbeeld staan 7 informatieborden met elk 9 wandeltekens. Hoeveel wandeltekens zijn dat samen?
- Visual data: not authored
- Choices: [54,63,72,81]
- Correct answer: 63
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 9.
- hintMoose: Reken 7 × 10 en haal er daarna 7 af.
- Explanation: 7 × 9 = 63.

**Variant B**

- Variant ID: `deer-statue-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Atlas verdeelt 18 wandelkaartjes eerlijk over 2 groepen wandelaars. Hoeveel kaartjes krijgt iedere groep?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel 18 eerlijk over 2 gelijke groepen.
- hintMoose: Zoek in de tafel van 2 welk getal uitkomt op 18.
- Explanation: 18 : 2 = 9.

#### Slot q2

Authored slot ID: `deer-statue-slot-2`.

**Variant A**

- Variant ID: `deer-statue-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 64
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken 4 × 8 en verdubbel dat.
- Explanation: 8 × 8 = 64.

**Variant B**

- Variant ID: `deer-statue-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Bij het hertenbeeld staan 3 informatieborden met elk 10 wandeltekens. Hoeveel wandeltekens zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Er zijn 3 gelijke groepjes. In elk groepje zitten er 10.
- hintMoose: Vermenigvuldig 3 met 10: zet een nul achter 3.
- Explanation: 3 × 10 = 30.

#### Slot q3

Authored slot ID: `deer-statue-slot-3`.

**Variant A**

- Variant ID: `deer-statue-3a`
- Domain: math
- School band: E5-intended
- Family: route
- Presentation: story
- Answer mode: open
- Prompt: Het pad naar het hertenbeeld is 24 meter lang en verdeeld in 4 gelijke stukken. Hoe lang is ieder stuk?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Verdeel de totale lengte eerlijk over 4 gelijke stukken.
- hintMoose: Zoek in de tafel van 4 welk getal uitkomt op 24.
- Explanation: 24 : 4 = 6 meter.

**Variant B**

- Variant ID: `deer-statue-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 3 = ?
- Visual data: not authored
- Choices: [15,18,21,24]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Reken eerst 2 × 6 en tel nog 6 erbij.
- Explanation: 6 × 3 = 18.

#### Slot q4

Authored slot ID: `deer-statue-slot-4`.

**Variant A**

- Variant ID: `deer-statue-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken 10 × 5 en haal 5 eraf.
- Explanation: 5 × 9 = 45.

**Variant B**

- Variant ID: `deer-statue-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het hertenbeeld staan 7 informatieborden met elk 2 wandeltekens. Hoeveel wandeltekens zijn dat samen?
- Visual data: not authored
- Choices: [12,14,16,18]
- Correct answer: 14
- hintMinnie: Er zijn 7 gelijke groepjes. In elk groepje zitten er 2.
- hintMoose: Verdubbel 7.
- Explanation: 7 × 2 = 14.

<a id="level-lvl-0021"></a>

## LVL-0021 — Rome

Source: [Levels/LVL-0021/level.js](../../Levels/LVL-0021/level.js). Production level.

### Challenge: opticsTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `opticsTable`
- Linked rune(s): opticsTable — Optiektafel (objectId: opticsTable)
- Linked object: opticsTable — Optiektafel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication, bare_division, story_multiplication, measurement, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "opticsTable",
  "anchorId": "opticsTable",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "opticsTable"
  }
]
```

#### Slot q1

Authored slot ID: `optics-table-slot-1`.

**Variant A**

- Variant ID: `optics-table-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 12 = ?
- Visual data: not authored
- Choices: [66,72,78,84]
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 12 = 72.

**Variant B**

- Variant ID: `optics-table-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 13 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 91
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 13 = 91.

#### Slot q2

Authored slot ID: `optics-table-slot-2`.

**Variant A**

- Variant ID: `optics-table-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 24 : 6 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 24 : 6 = 4, want 6 × 4 = 24.

**Variant B**

- Variant ID: `optics-table-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de spiegels liggen 6 rijen met 8 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [42,48,54,60]
- Correct answer: 48
- hintMinnie: Zoek 6 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 6 × 8 = 48.

#### Slot q3

Authored slot ID: `optics-table-slot-3`.

**Variant A**

- Variant ID: `optics-table-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 7 vakken met 10 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 70
- hintMinnie: Zoek 7 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 7 × 10 = 70.

**Variant B**

- Variant ID: `optics-table-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 42 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 42 : 7 = 6, want 7 × 6 = 42.

#### Slot q4

Authored slot ID: `optics-table-slot-4`.

**Variant A**

- Variant ID: `optics-table-4a`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: Bij de spiegels liggen eerst 28 onderdelen en Leonardo legt er 17 bij. Hoeveel onderdelen liggen er nu?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Kijk welke twee aantallen je samenneemt.
- hintMoose: Tel eerst de tientallen en daarna de lossen.
- Explanation: 28 + 17 = 45.

**Variant B**

- Variant ID: `optics-table-4b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de spiegels maakt Sven van 24 meetkaartjes 8 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 24 : 8 = 3, want 8 × 3 = 24.

### Challenge: mechanicalModel

- State: **active** (active omitted; runtime default is true)
- anchorId: `mechanicalModel`
- Linked rune(s): mechanicalModel — Mechanisch model (objectId: mechanicalModel)
- Linked object: mechanicalModel — Mechanisch model (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: story_division, bare_multiplication, bare_division, story_multiplication, measurement
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "mechanicalModel",
  "anchorId": "mechanicalModel",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "mechanicalModel"
  }
]
```

#### Slot q1

Authored slot ID: `mechanical-model-slot-1`.

**Variant A**

- Variant ID: `mechanical-model-1a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Bij de wielen verdeelt Sven 45 onderdelen over 9 gelijke bakken. Hoeveel onderdelen komen in elke bak?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 45 : 9 = 5, want 9 × 5 = 45.

**Variant B**

- Variant ID: `mechanical-model-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 9 = ?
- Visual data: not authored
- Choices: [64,72,80,88]
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 9 = 72.

#### Slot q2

Authored slot ID: `mechanical-model-slot-2`.

**Variant A**

- Variant ID: `mechanical-model-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 81
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 9 = 81.

**Variant B**

- Variant ID: `mechanical-model-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 14 : 2 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 14 : 2 = 7, want 2 × 7 = 14.

#### Slot q3

Authored slot ID: `mechanical-model-slot-3`.

**Variant A**

- Variant ID: `mechanical-model-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de wielen liggen 8 rijen met 5 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [32,40,48,56]
- Correct answer: 40
- hintMinnie: Zoek 8 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 8 × 5 = 40.

**Variant B**

- Variant ID: `mechanical-model-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 9 vakken met 7 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Zoek 9 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 9 × 7 = 63.

#### Slot q4

Authored slot ID: `mechanical-model-slot-4`.

**Variant A**

- Variant ID: `mechanical-model-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 24 : 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 24 : 3 = 8, want 3 × 8 = 24.

**Variant B**

- Variant ID: `mechanical-model-4b`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: Bij de wielen zijn 64 cm touw nodig en Sven gebruikt al 19 cm. Hoeveel cm blijft over?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Kijk wat er van het eerste aantal afgaat.
- hintMoose: Trek eerst de tientallen af en daarna de lossen.
- Explanation: 64 - 19 = 45.

### Challenge: centralCodex

- State: **active** (active omitted; runtime default is true)
- anchorId: `centralCodex`
- Linked rune(s): centralCodex — Centrale codex (objectId: centralCodex)
- Linked object: centralCodex — Centrale codex (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: story_division, bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "centralCodex",
  "anchorId": "centralCodex",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "centralCodex"
  }
]
```

#### Slot q1

Authored slot ID: `central-codex-slot-1`.

**Variant A**

- Variant ID: `central-codex-1a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de codexpagina's verdeelt Sven 12 onderdelen over 4 gelijke bakken. Hoeveel onderdelen komen in elke bak?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 12 : 4 = 3, want 4 × 3 = 12.

**Variant B**

- Variant ID: `central-codex-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Leonardo verdeelt 25 stukjes bij de codexpagina's in 5 gelijke groepen. Hoeveel stukjes krijgt elke groep?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 25 : 5 = 5, want 5 × 5 = 25.

#### Slot q2

Authored slot ID: `central-codex-slot-2`.

**Variant A**

- Variant ID: `central-codex-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 3 = ?
- Visual data: not authored
- Choices: [4,6,8,10]
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 3 = 6.

**Variant B**

- Variant ID: `central-codex-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 10 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 10 × 4 = 40.

#### Slot q3

Authored slot ID: `central-codex-slot-3`.

**Variant A**

- Variant ID: `central-codex-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 40 : 10 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 40 : 10 = 4, want 10 × 4 = 40.

**Variant B**

- Variant ID: `central-codex-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de codexpagina's liggen 2 rijen met 3 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [4,6,8,10]
- Correct answer: 6
- hintMinnie: Zoek 2 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 2 × 3 = 6.

#### Slot q4

Authored slot ID: `central-codex-slot-4`.

**Variant A**

- Variant ID: `central-codex-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 3 vakken met 5 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 15
- hintMinnie: Zoek 3 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 3 × 5 = 15.

**Variant B**

- Variant ID: `central-codex-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 36 : 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 36 : 6 = 6, want 6 × 6 = 36.

### Challenge: engineeringTable

- State: **inactive** (authored active: false)
- anchorId: `engineeringTable`
- Linked rune(s): engineeringTable — Bouwtafel (objectId: engineeringTable)
- Linked object: engineeringTable — Bouwtafel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: measurement, story_division, bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "engineeringTable",
  "anchorId": "engineeringTable",
  "challengeCharacterId": "leonardo-da-vinci",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "engineeringTable"
  }
]
```

#### Slot q1

Authored slot ID: `engineering-table-slot-1`.

**Variant A**

- Variant ID: `engineering-table-1a`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: Sven meet bij de modeldelen eerst 35 cm en daarna nog 24 cm. Hoeveel cm is dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 59
- hintMinnie: Kijk welke twee aantallen je samenneemt.
- hintMoose: Tel eerst de tientallen en daarna de lossen.
- Explanation: 35 + 24 = 59.

**Variant B**

- Variant ID: `engineering-table-1b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Leonardo verdeelt 70 stukjes bij de modeldelen in 7 gelijke groepen. Hoeveel stukjes krijgt elke groep?
- Visual data: not authored
- Choices: [9,10,11,12]
- Correct answer: 10
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 70 : 7 = 10, want 7 × 10 = 70.

#### Slot q2

Authored slot ID: `engineering-table-slot-2`.

**Variant A**

- Variant ID: `engineering-table-2a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Bij de modeldelen maakt Sven van 24 meetkaartjes 8 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 24 : 8 = 3, want 8 × 3 = 24.

**Variant B**

- Variant ID: `engineering-table-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 3 = ?
- Visual data: not authored
- Choices: [6,9,12,15]
- Correct answer: 9
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 3 × 3 = 9.

#### Slot q3

Authored slot ID: `engineering-table-slot-3`.

**Variant A**

- Variant ID: `engineering-table-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 4 × 3 = 12.

**Variant B**

- Variant ID: `engineering-table-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 63 : 9 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 63 : 9 = 7, want 9 × 7 = 63.

#### Slot q4

Authored slot ID: `engineering-table-slot-4`.

**Variant A**

- Variant ID: `engineering-table-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de modeldelen liggen 4 rijen met 9 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [32,36,40,44]
- Correct answer: 36
- hintMinnie: Zoek 4 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 4 × 9 = 36.

**Variant B**

- Variant ID: `engineering-table-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 5 vakken met 2 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Zoek 5 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 5 × 2 = 10.

<a id="level-lvl-0022"></a>

## LVL-0022 — Proceno

Source: [Levels/LVL-0022/level.js](../../Levels/LVL-0022/level.js). Production level.

### Challenge: measuringTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `measuringTable`
- Linked rune(s): measuringTable — Meettafel (objectId: measuringTable)
- Linked object: measuringTable — Meettafel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_division, measurement, story_division, bare_multiplication, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "measuringTable",
  "anchorId": "measuringTable",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "measuringTable"
  }
]
```

#### Slot q1

Authored slot ID: `measuring-table-slot-1`.

**Variant A**

- Variant ID: `measuring-table-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 20 : 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 20 : 2 = 10, want 2 × 10 = 20.

**Variant B**

- Variant ID: `measuring-table-1b`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: Leonardo heeft 90 gram materiaal bij de latten en gebruikt 27 gram. Hoeveel gram blijft over?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Kijk wat er van het eerste aantal afgaat.
- hintMoose: Trek eerst de tientallen af en daarna de lossen.
- Explanation: 90 - 27 = 63.

#### Slot q2

Authored slot ID: `measuring-table-slot-2`.

**Variant A**

- Variant ID: `measuring-table-2a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de latten maakt Sven van 30 meetkaartjes 3 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?
- Visual data: not authored
- Choices: [9,10,11,12]
- Correct answer: 10
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 30 : 3 = 10, want 3 × 10 = 30.

**Variant B**

- Variant ID: `measuring-table-2b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Bij de latten verdeelt Sven 12 onderdelen over 4 gelijke bakken. Hoeveel onderdelen komen in elke bak?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 12 : 4 = 3, want 4 × 3 = 12.

#### Slot q3

Authored slot ID: `measuring-table-slot-3`.

**Variant A**

- Variant ID: `measuring-table-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 3 = ?
- Visual data: not authored
- Choices: [10,15,20,25]
- Correct answer: 15
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 5 × 3 = 15.

**Variant B**

- Variant ID: `measuring-table-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 4 = 24.

#### Slot q4

Authored slot ID: `measuring-table-slot-4`.

**Variant A**

- Variant ID: `measuring-table-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 20 : 5 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 20 : 5 = 4, want 5 × 4 = 20.

**Variant B**

- Variant ID: `measuring-table-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de latten liggen 10 rijen met 10 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [90,100,110,120]
- Correct answer: 100
- hintMinnie: Zoek 10 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 10 × 10 = 100.

### Challenge: bridgeModel

- State: **active** (active omitted; runtime default is true)
- anchorId: `bridgeModel`
- Linked rune(s): bridgeModel — Brugmodel (objectId: bridgeModel)
- Linked object: bridgeModel — Brugmodel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: story_multiplication, bare_division, measurement, story_division, bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "bridgeModel",
  "anchorId": "bridgeModel",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "bridgeModel"
  }
]
```

#### Slot q1

Authored slot ID: `bridge-model-slot-1`.

**Variant A**

- Variant ID: `bridge-model-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 6 vakken met 7 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 42
- hintMinnie: Zoek 6 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 6 × 7 = 42.

**Variant B**

- Variant ID: `bridge-model-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 30 : 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 3
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 30 : 10 = 3, want 10 × 3 = 30.

#### Slot q2

Authored slot ID: `bridge-model-slot-2`.

**Variant A**

- Variant ID: `bridge-model-2a`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: De proef bij de brugliggers duurt eerst 18 minuten en daarna nog 25 minuten. Hoeveel minuten duurt het samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 43
- hintMinnie: Kijk welke twee aantallen je samenneemt.
- hintMoose: Tel eerst de tientallen en daarna de lossen.
- Explanation: 18 + 25 = 43.

**Variant B**

- Variant ID: `bridge-model-2b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de brugliggers verdeelt Sven 48 onderdelen over 6 gelijke bakken. Hoeveel onderdelen komen in elke bak?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 48 : 6 = 8, want 6 × 8 = 48.

#### Slot q3

Authored slot ID: `bridge-model-slot-3`.

**Variant A**

- Variant ID: `bridge-model-3a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Leonardo verdeelt 70 stukjes bij de brugliggers in 7 gelijke groepen. Hoeveel stukjes krijgt elke groep?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 70 : 7 = 10, want 7 × 10 = 70.

**Variant B**

- Variant ID: `bridge-model-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 11 = ?
- Visual data: not authored
- Choices: [70,77,84,91]
- Correct answer: 77
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 11 = 77.

#### Slot q4

Authored slot ID: `bridge-model-slot-4`.

**Variant A**

- Variant ID: `bridge-model-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 11 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 88
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 11 = 88.

**Variant B**

- Variant ID: `bridge-model-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 48 : 8 = ?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 48 : 8 = 6, want 8 × 6 = 48.

### Challenge: wellWinch

- State: **inactive** (authored active: false)
- anchorId: `wellWinch`
- Linked rune(s): wellWinch — Put en lier (objectId: wellWinch)
- Linked object: wellWinch — Put en lier (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: story_multiplication, bare_division, measurement, story_division, bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "wellWinch",
  "anchorId": "wellWinch",
  "challengeCharacterId": "leonardo-da-vinci",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "wellWinch"
  }
]
```

#### Slot q1

Authored slot ID: `well-winch-slot-1`.

**Variant A**

- Variant ID: `well-winch-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de emmers liggen 7 rijen met 2 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [7,14,21,28]
- Correct answer: 14
- hintMinnie: Zoek 7 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 7 × 2 = 14.

**Variant B**

- Variant ID: `well-winch-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 8 vakken met 4 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Zoek 8 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 8 × 4 = 32.

#### Slot q2

Authored slot ID: `well-winch-slot-2`.

**Variant A**

- Variant ID: `well-winch-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 54 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 54 : 9 = 6, want 9 × 6 = 54.

**Variant B**

- Variant ID: `well-winch-2b`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: Bij de emmers ligt 72 cm lat en Sven zaagt 38 cm af. Hoeveel cm blijft over?
- Visual data: not authored
- Choices: not authored
- Correct answer: 34
- hintMinnie: Kijk wat er van het eerste aantal afgaat.
- hintMoose: Trek eerst de tientallen af en daarna de lossen.
- Explanation: 72 - 38 = 34.

#### Slot q3

Authored slot ID: `well-winch-slot-3`.

**Variant A**

- Variant ID: `well-winch-3a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Leonardo verdeelt 16 stukjes bij de emmers in 2 gelijke groepen. Hoeveel stukjes krijgt elke groep?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 16 : 2 = 8, want 2 × 8 = 16.

**Variant B**

- Variant ID: `well-winch-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Bij de emmers maakt Sven van 30 meetkaartjes 3 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 30 : 3 = 10, want 3 × 10 = 30.

#### Slot q4

Authored slot ID: `well-winch-slot-4`.

**Variant A**

- Variant ID: `well-winch-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 2 = ?
- Visual data: not authored
- Choices: [9,18,27,36]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 2 = 18.

**Variant B**

- Variant ID: `well-winch-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 4 = 8.

### Challenge: gateMechanism

- State: **active** (active omitted; runtime default is true)
- anchorId: `gateMechanism`
- Linked rune(s): gateMechanism — Poortmechanisme (objectId: gateMechanism)
- Linked object: gateMechanism — Poortmechanisme (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_division, story_multiplication, measurement, story_division, bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "gateMechanism",
  "anchorId": "gateMechanism",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "gateMechanism"
  }
]
```

#### Slot q1

Authored slot ID: `gate-mechanism-slot-1`.

**Variant A**

- Variant ID: `gate-mechanism-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 : 4 = ?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 8 : 4 = 2, want 4 × 2 = 8.

**Variant B**

- Variant ID: `gate-mechanism-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de kettingen liggen 9 rijen met 8 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [63,72,81,90]
- Correct answer: 72
- hintMinnie: Zoek 9 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 9 × 8 = 72.

#### Slot q2

Authored slot ID: `gate-mechanism-slot-2`.

**Variant A**

- Variant ID: `gate-mechanism-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 2 vakken met 2 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Zoek 2 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 2 × 2 = 4.

**Variant B**

- Variant ID: `gate-mechanism-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 25 : 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 25 : 5 = 5, want 5 × 5 = 25.

#### Slot q3

Authored slot ID: `gate-mechanism-slot-3`.

**Variant A**

- Variant ID: `gate-mechanism-3a`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: Leonardo telt bij de kettingen 46 markeringen en voegt er 29 toe. Hoeveel markeringen zijn er samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 75
- hintMinnie: Kijk welke twee aantallen je samenneemt.
- hintMoose: Tel eerst de tientallen en daarna de lossen.
- Explanation: 46 + 29 = 75.

**Variant B**

- Variant ID: `gate-mechanism-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de kettingen maakt Sven van 42 meetkaartjes 6 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 42 : 6 = 7, want 6 × 7 = 42.

#### Slot q4

Authored slot ID: `gate-mechanism-slot-4`.

**Variant A**

- Variant ID: `gate-mechanism-4a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Bij de kettingen verdeelt Sven 63 onderdelen over 7 gelijke bakken. Hoeveel onderdelen komen in elke bak?
- Visual data: not authored
- Choices: not authored
- Correct answer: 9
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 63 : 7 = 9, want 7 × 9 = 63.

**Variant B**

- Variant ID: `gate-mechanism-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 10 × 12 = ?
- Visual data: not authored
- Choices: [110,120,130,140]
- Correct answer: 120
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 10 × 12 = 120.

<a id="level-lvl-0023"></a>

## LVL-0023 — Umbrie

Source: [Levels/LVL-0023/level.js](../../Levels/LVL-0023/level.js). Production level.

### Challenge: waterLevelPost

- State: **active** (active omitted; runtime default is true)
- anchorId: `waterLevelPost`
- Linked rune(s): waterLevelPost — Waterstandspaal (objectId: waterLevelPost)
- Linked object: waterLevelPost — Waterstandspaal (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication, bare_division, story_multiplication, measurement, story_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "waterLevelPost",
  "anchorId": "waterLevelPost",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "waterLevelPost"
  }
]
```

#### Slot q1

Authored slot ID: `water-level-post-slot-1`.

**Variant A**

- Variant ID: `water-level-post-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 3 × 8 = 24.

**Variant B**

- Variant ID: `water-level-post-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 24 : 8 = ?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 24 : 8 = 3, want 8 × 3 = 24.

#### Slot q2

Authored slot ID: `water-level-post-slot-2`.

**Variant A**

- Variant ID: `water-level-post-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de meetstrepen liggen 3 rijen met 6 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [15,18,21,24]
- Correct answer: 18
- hintMinnie: Zoek 3 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 3 × 6 = 18.

**Variant B**

- Variant ID: `water-level-post-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 4 vakken met 8 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 32
- hintMinnie: Zoek 4 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 4 × 8 = 32.

#### Slot q3

Authored slot ID: `water-level-post-slot-3`.

**Variant A**

- Variant ID: `water-level-post-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 36 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 36 : 9 = 4, want 9 × 4 = 36.

**Variant B**

- Variant ID: `water-level-post-3b`
- Domain: math
- School band: E5-intended
- Family: measurement
- Presentation: story
- Answer mode: open
- Prompt: Bij de meetstrepen staan 85 waterstrepen en Sven wist 16 proefstrepen weg. Hoeveel strepen blijven staan?
- Visual data: not authored
- Choices: not authored
- Correct answer: 69
- hintMinnie: Kijk wat er van het eerste aantal afgaat.
- hintMoose: Trek eerst de tientallen af en daarna de lossen.
- Explanation: 85 - 16 = 69.

#### Slot q4

Authored slot ID: `water-level-post-slot-4`.

**Variant A**

- Variant ID: `water-level-post-4a`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de meetstrepen verdeelt Sven 12 onderdelen over 6 gelijke bakken. Hoeveel onderdelen komen in elke bak?
- Visual data: not authored
- Choices: [1,2,3,4]
- Correct answer: 2
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 12 : 6 = 2, want 6 × 2 = 12.

**Variant B**

- Variant ID: `water-level-post-4b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: open
- Prompt: Leonardo verdeelt 28 stukjes bij de meetstrepen in 7 gelijke groepen. Hoeveel stukjes krijgt elke groep?
- Visual data: not authored
- Choices: not authored
- Correct answer: 4
- hintMinnie: Verdeel het totaal in even grote groepen.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 28 : 7 = 4, want 7 × 4 = 28.

### Challenge: valveWheel

- State: **inactive** (authored active: false)
- anchorId: `valveWheel`
- Linked rune(s): valveWheel — Ventiel (objectId: valveWheel)
- Linked object: valveWheel — Ventiel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "valveWheel",
  "anchorId": "valveWheel",
  "challengeCharacterId": "leonardo-da-vinci",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "valveWheel"
  }
]
```

#### Slot q1

Authored slot ID: `valve-wheel-slot-1`.

**Variant A**

- Variant ID: `valve-wheel-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 5 = ?
- Visual data: not authored
- Choices: [16,20,24,28]
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 4 × 5 = 20.

**Variant B**

- Variant ID: `valve-wheel-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 5 × 6 = 30.

#### Slot q2

Authored slot ID: `valve-wheel-slot-2`.

**Variant A**

- Variant ID: `valve-wheel-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 72 : 8 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 72 : 8 = 9, want 8 × 9 = 72.

**Variant B**

- Variant ID: `valve-wheel-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de ventieldraaien liggen 5 rijen met 3 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [10,15,20,25]
- Correct answer: 15
- hintMinnie: Zoek 5 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 5 × 3 = 15.

#### Slot q3

Authored slot ID: `valve-wheel-slot-3`.

**Variant A**

- Variant ID: `valve-wheel-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 10 vakken met 9 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 90
- hintMinnie: Zoek 10 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 10 × 9 = 90.

**Variant B**

- Variant ID: `valve-wheel-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 18 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 2
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 18 : 9 = 2, want 9 × 2 = 18.

#### Slot q4

Authored slot ID: `valve-wheel-slot-4`.

**Variant A**

- Variant ID: `valve-wheel-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 8 = ?
- Visual data: not authored
- Choices: [42,48,54,60]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 8 = 48.

**Variant B**

- Variant ID: `valve-wheel-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 9 = 63.

### Challenge: lockChambers

- State: **active** (active omitted; runtime default is true)
- anchorId: `lockChambers`
- Linked rune(s): lockChambers — Sluiskamers (objectId: lockChambers)
- Linked object: lockChambers — Sluiskamers (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_division, story_multiplication, bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "lockChambers",
  "anchorId": "lockChambers",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "lockChambers"
  }
]
```

#### Slot q1

Authored slot ID: `lock-chambers-slot-1`.

**Variant A**

- Variant ID: `lock-chambers-1a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 42 : 6 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 42 : 6 = 7, want 6 × 7 = 42.

**Variant B**

- Variant ID: `lock-chambers-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven legt bij de boten 6 stapels met 6 kleine onderdelen. Hoeveel onderdelen liggen er samen?
- Visual data: not authored
- Choices: [30,36,42,48]
- Correct answer: 36
- hintMinnie: Zoek 6 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 6 × 6 = 36.

#### Slot q2

Authored slot ID: `lock-chambers-slot-2`.

**Variant A**

- Variant ID: `lock-chambers-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de boten staan 7 groepjes van 8. Hoeveel zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Zoek 7 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 7 × 8 = 56.

**Variant B**

- Variant ID: `lock-chambers-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 2 = ?
- Visual data: not authored
- Choices: [8,16,24,32]
- Correct answer: 16
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 2 = 16.

#### Slot q3

Authored slot ID: `lock-chambers-slot-3`.

**Variant A**

- Variant ID: `lock-chambers-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 27
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 3 = 27.

**Variant B**

- Variant ID: `lock-chambers-3b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 63 : 7 = ?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 63 : 7 = 9, want 7 × 9 = 63.

#### Slot q4

Authored slot ID: `lock-chambers-slot-4`.

**Variant A**

- Variant ID: `lock-chambers-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de boten liggen 8 rijen met 10 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [72,80,88,96]
- Correct answer: 80
- hintMinnie: Zoek 8 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 8 × 10 = 80.

**Variant B**

- Variant ID: `lock-chambers-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 9 vakken met 3 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 27
- hintMinnie: Zoek 9 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 9 × 3 = 27.

### Challenge: paddleWheel

- State: **inactive** (authored active: false)
- anchorId: `paddleWheel`
- Linked rune(s): paddleWheel — Waterrad (objectId: paddleWheel)
- Linked object: paddleWheel — Waterrad (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "paddleWheel",
  "anchorId": "paddleWheel",
  "challengeCharacterId": "leonardo-da-vinci",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "paddleWheel"
  }
]
```

#### Slot q1

Authored slot ID: `paddle-wheel-slot-1`.

**Variant A**

- Variant ID: `paddle-wheel-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 9 = ?
- Visual data: not authored
- Choices: [16,18,20,22]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 9 = 18.

**Variant B**

- Variant ID: `paddle-wheel-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 10 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 100
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 10 × 10 = 100.

#### Slot q2

Authored slot ID: `paddle-wheel-slot-2`.

**Variant A**

- Variant ID: `paddle-wheel-2a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 32 : 8 = ?
- Visual data: not authored
- Choices: [3,4,5,6]
- Correct answer: 4
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 32 : 8 = 4, want 8 × 4 = 32.

**Variant B**

- Variant ID: `paddle-wheel-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven legt bij de schoepen 2 stapels met 6 kleine onderdelen. Hoeveel onderdelen liggen er samen?
- Visual data: not authored
- Choices: [10,12,14,16]
- Correct answer: 12
- hintMinnie: Zoek 2 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 2 × 6 = 12.

#### Slot q3

Authored slot ID: `paddle-wheel-slot-3`.

**Variant A**

- Variant ID: `paddle-wheel-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de schoepen staan 3 groepjes van 8. Hoeveel zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Zoek 3 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 3 × 8 = 24.

**Variant B**

- Variant ID: `paddle-wheel-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 12 = ?
- Visual data: not authored
- Choices: [33,36,39,42]
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 3 × 12 = 36.

#### Slot q4

Authored slot ID: `paddle-wheel-slot-4`.

**Variant A**

- Variant ID: `paddle-wheel-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 12 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 4 × 12 = 48.

**Variant B**

- Variant ID: `paddle-wheel-4b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 72 : 9 = ?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 72 : 9 = 8, want 9 × 8 = 72.

### Challenge: waterClock

- State: **active** (active omitted; runtime default is true)
- anchorId: `waterClock`
- Linked rune(s): waterClock — Waterklok (objectId: waterClock)
- Linked object: waterClock — Waterklok (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: clock_reading
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "waterClock",
  "anchorId": "waterClock",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "waterClock"
  }
]
```

#### Slot q1

Authored slot ID: `water-clock-slot-1`.

**Variant A**

- Variant ID: `water-clock-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":2,"minute":0}
- Choices: ["Twee uur","Drie uur","Kwart over twee","Half drie"]
- Correct answer: "Twee uur"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Twee uur.

**Variant B**

- Variant ID: `water-clock-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":4,"minute":15}
- Choices: ["Kwart over vier","Kwart over vijf","Half vijf","Kwart voor vijf"]
- Correct answer: "Kwart over vier"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart over vier.

#### Slot q2

Authored slot ID: `water-clock-slot-2`.

**Variant A**

- Variant ID: `water-clock-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":6,"minute":30}
- Choices: ["Half zeven","Half acht","Kwart voor zeven","Zes uur"]
- Correct answer: "Half zeven"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Half zeven.

**Variant B**

- Variant ID: `water-clock-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":8,"minute":45}
- Choices: ["Kwart voor negen","Kwart voor tien","Acht uur","Kwart over acht"]
- Correct answer: "Kwart voor negen"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart voor negen.

#### Slot q3

Authored slot ID: `water-clock-slot-3`.

**Variant A**

- Variant ID: `water-clock-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":10,"minute":5}
- Choices: ["Vijf over tien","Vijf over elf","Tien voor half elf","Vijf over half elf"]
- Correct answer: "Vijf over tien"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over tien.

**Variant B**

- Variant ID: `water-clock-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":12,"minute":20}
- Choices: ["Tien voor half een","Tien voor half twee","Vijf over half een","Tien voor een"]
- Correct answer: "Tien voor half een"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor half een.

#### Slot q4

Authored slot ID: `water-clock-slot-4`.

**Variant A**

- Variant ID: `water-clock-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":35}
- Choices: ["Vijf over half vier","Vijf over half vijf","Tien voor vier","Vijf over drie"]
- Correct answer: "Vijf over half vier"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over half vier.

**Variant B**

- Variant ID: `water-clock-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":5,"minute":50}
- Choices: ["Tien voor zes","Tien voor zeven","Vijf over vijf","Tien voor half zes"]
- Correct answer: "Tien voor zes"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor zes.

<a id="level-lvl-0024"></a>

## LVL-0024 — Marche

Source: [Levels/LVL-0024/level.js](../../Levels/LVL-0024/level.js). Production level.

### Challenge: wingRack

- State: **active** (active omitted; runtime default is true)
- anchorId: `wingRack`
- Linked rune(s): wingRack — Vleugelmeetrek (objectId: wingRack)
- Linked object: wingRack — Vleugelmeetrek (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: story_multiplication, bare_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "wingRack",
  "anchorId": "wingRack",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "wingRack"
  }
]
```

#### Slot q1

Authored slot ID: `wing-rack-slot-1`.

**Variant A**

- Variant ID: `wing-rack-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de ribben liggen 4 rijen met 10 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [36,40,44,48]
- Correct answer: 40
- hintMinnie: Zoek 4 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 4 × 10 = 40.

**Variant B**

- Variant ID: `wing-rack-1b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 5 vakken met 3 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 15
- hintMinnie: Zoek 5 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 5 × 3 = 15.

#### Slot q2

Authored slot ID: `wing-rack-slot-2`.

**Variant A**

- Variant ID: `wing-rack-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 13 = ?
- Visual data: not authored
- Choices: [60,65,70,75]
- Correct answer: 65
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 5 × 13 = 65.

**Variant B**

- Variant ID: `wing-rack-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 2 = 12.

#### Slot q3

Authored slot ID: `wing-rack-slot-3`.

**Variant A**

- Variant ID: `wing-rack-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 30 : 6 = ?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 30 : 6 = 5, want 6 × 5 = 30.

**Variant B**

- Variant ID: `wing-rack-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven legt bij de ribben 6 stapels met 5 kleine onderdelen. Hoeveel onderdelen liggen er samen?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Zoek 6 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 6 × 5 = 30.

#### Slot q4

Authored slot ID: `wing-rack-slot-4`.

**Variant A**

- Variant ID: `wing-rack-4a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de ribben staan 7 groepjes van 7. Hoeveel zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 49
- hintMinnie: Zoek 7 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 7 × 7 = 49.

**Variant B**

- Variant ID: `wing-rack-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 4 = ?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 4 = 28.

### Challenge: counterweights

- State: **inactive** (authored active: false)
- anchorId: `counterweights`
- Linked rune(s): counterweights — Tegengewichten (objectId: counterweights)
- Linked object: counterweights — Tegengewichten (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication, bare_division, story_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "counterweights",
  "anchorId": "counterweights",
  "challengeCharacterId": "leonardo-da-vinci",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "counterweights"
  }
]
```

#### Slot q1

Authored slot ID: `counterweights-slot-1`.

**Variant A**

- Variant ID: `counterweights-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 64
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 8 = 64.

**Variant B**

- Variant ID: `counterweights-1b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 49 : 7 = ?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 7
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 49 : 7 = 7, want 7 × 7 = 49.

#### Slot q2

Authored slot ID: `counterweights-slot-2`.

**Variant A**

- Variant ID: `counterweights-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de gewichten liggen 8 rijen met 9 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [64,72,80,88]
- Correct answer: 72
- hintMinnie: Zoek 8 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 8 × 9 = 72.

**Variant B**

- Variant ID: `counterweights-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 9 vakken met 2 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 18
- hintMinnie: Zoek 9 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 9 × 2 = 18.

#### Slot q3

Authored slot ID: `counterweights-slot-3`.

**Variant A**

- Variant ID: `counterweights-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 10 = ?
- Visual data: not authored
- Choices: [81,90,99,108]
- Correct answer: 90
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 10 = 90.

**Variant B**

- Variant ID: `counterweights-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 11 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 22
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 11 = 22.

#### Slot q4

Authored slot ID: `counterweights-slot-4`.

**Variant A**

- Variant ID: `counterweights-4a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 64 : 8 = ?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 64 : 8 = 8, want 8 × 8 = 64.

**Variant B**

- Variant ID: `counterweights-4b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven legt bij de gewichten 6 stapels met 9 kleine onderdelen. Hoeveel onderdelen liggen er samen?
- Visual data: not authored
- Choices: [48,54,60,66]
- Correct answer: 54
- hintMinnie: Zoek 6 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 6 × 9 = 54.

### Challenge: flightControls

- State: **active** (active omitted; runtime default is true)
- anchorId: `flightControls`
- Linked rune(s): flightControls — Testbediening (objectId: flightControls)
- Linked object: flightControls — Testbediening (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: clock_reading
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "flightControls",
  "anchorId": "flightControls",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "flightControls"
  }
]
```

#### Slot q1

Authored slot ID: `flight-controls-slot-1`.

**Variant A**

- Variant ID: `flight-controls-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":1,"minute":10}
- Choices: ["Tien over een","Tien over twee","Vijf voor half twee","Tien over half twee"]
- Correct answer: "Tien over een"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien over een.

**Variant B**

- Variant ID: `flight-controls-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":7,"minute":25}
- Choices: ["Vijf voor half acht","Vijf voor half negen","Tien over half acht","Vijf voor acht"]
- Correct answer: "Vijf voor half acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf voor half acht.

#### Slot q2

Authored slot ID: `flight-controls-slot-2`.

**Variant A**

- Variant ID: `flight-controls-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":9,"minute":40}
- Choices: ["Tien over half tien","Tien over half elf","Vijf voor tien","Tien over negen"]
- Correct answer: "Tien over half tien"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien over half tien.

**Variant B**

- Variant ID: `flight-controls-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":11,"minute":55}
- Choices: ["Vijf voor twaalf","Vijf voor een","Tien over elf","Vijf voor half twaalf"]
- Correct answer: "Vijf voor twaalf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf voor twaalf.

#### Slot q3

Authored slot ID: `flight-controls-slot-3`.

**Variant A**

- Variant ID: `flight-controls-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":0}
- Choices: ["Drie uur","Vier uur","Kwart over drie","Half vier"]
- Correct answer: "Drie uur"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Drie uur.

**Variant B**

- Variant ID: `flight-controls-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":5,"minute":15}
- Choices: ["Kwart over vijf","Kwart over zes","Half zes","Kwart voor zes"]
- Correct answer: "Kwart over vijf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart over vijf.

#### Slot q4

Authored slot ID: `flight-controls-slot-4`.

**Variant A**

- Variant ID: `flight-controls-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":7,"minute":30}
- Choices: ["Half acht","Half negen","Kwart voor acht","Zeven uur"]
- Correct answer: "Half acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Half acht.

**Variant B**

- Variant ID: `flight-controls-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":9,"minute":45}
- Choices: ["Kwart voor tien","Kwart voor elf","Negen uur","Kwart over negen"]
- Correct answer: "Kwart voor tien"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart voor tien.

### Challenge: wingFrame

- State: **active** (active omitted; runtime default is true)
- anchorId: `wingFrame`
- Linked rune(s): wingFrame — Vleugelframe (objectId: wingFrame)
- Linked object: wingFrame — Vleugelframe (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: story_multiplication, bare_multiplication, bare_division
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "wingFrame",
  "anchorId": "wingFrame",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "wingFrame"
  }
]
```

#### Slot q1

Authored slot ID: `wing-frame-slot-1`.

**Variant A**

- Variant ID: `wing-frame-1a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Op de vleugelsecties staan 7 groepjes van 2. Hoeveel zijn dat samen?
- Visual data: not authored
- Choices: not authored
- Correct answer: 14
- hintMinnie: Zoek 7 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 7 × 2 = 14.

**Variant B**

- Variant ID: `wing-frame-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 10 × 11 = ?
- Visual data: not authored
- Choices: [100,110,120,130]
- Correct answer: 110
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 10 × 11 = 110.

#### Slot q2

Authored slot ID: `wing-frame-slot-2`.

**Variant A**

- Variant ID: `wing-frame-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 11 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 33
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 3 × 11 = 33.

**Variant B**

- Variant ID: `wing-frame-2b`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 27 : 9 = ?
- Visual data: not authored
- Choices: [2,3,4,5]
- Correct answer: 3
- hintMinnie: Welke keersom hoort hier omgekeerd bij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 27 : 9 = 3, want 9 × 3 = 27.

#### Slot q3

Authored slot ID: `wing-frame-slot-3`.

**Variant A**

- Variant ID: `wing-frame-3a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de vleugelsecties liggen 8 rijen met 4 delen. Hoeveel delen zijn dat samen?
- Visual data: not authored
- Choices: [24,32,40,48]
- Correct answer: 32
- hintMinnie: Zoek 8 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 8 × 4 = 32.

**Variant B**

- Variant ID: `wing-frame-3b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Leonardo tekent 9 vakken met 6 lijnen per vak. Hoeveel lijnen tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Zoek 9 groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van en reken die rustig uit.
- Explanation: 9 × 6 = 54.

#### Slot q4

Authored slot ID: `wing-frame-slot-4`.

**Variant A**

- Variant ID: `wing-frame-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 13 = ?
- Visual data: not authored
- Choices: [48,52,56,60]
- Correct answer: 52
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 4 × 13 = 52.

**Variant B**

- Variant ID: `wing-frame-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 10
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 5 × 2 = 10.

<a id="level-lvl-0025"></a>

## LVL-0025 — Florence

Source: [Levels/LVL-0025/level.js](../../Levels/LVL-0025/level.js). Production level.

### Challenge: perspectiveFrame

- State: **active** (active omitted; runtime default is true)
- anchorId: `perspectiveFrame`
- Linked rune(s): perspectiveFrame — Perspectiefraam (objectId: perspectiveFrame)
- Linked object: perspectiveFrame — Perspectiefraam (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "perspectiveFrame",
  "anchorId": "perspectiveFrame",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "perspectiveFrame"
  }
]
```

#### Slot q1

Authored slot ID: `perspective-frame-slot-1`.

**Variant A**

- Variant ID: `perspective-frame-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 11 = ?
- Visual data: not authored
- Choices: [60,66,72,78]
- Correct answer: 66
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 11 = 66.

**Variant B**

- Variant ID: `perspective-frame-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 12 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 84
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 12 = 84.

#### Slot q2

Authored slot ID: `perspective-frame-slot-2`.

**Variant A**

- Variant ID: `perspective-frame-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 12 = ?
- Visual data: not authored
- Choices: [88,96,104,112]
- Correct answer: 96
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 12 = 96.

**Variant B**

- Variant ID: `perspective-frame-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 13 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 117
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 13 = 117.

#### Slot q3

Authored slot ID: `perspective-frame-slot-3`.

**Variant A**

- Variant ID: `perspective-frame-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 13 = ?
- Visual data: not authored
- Choices: [24,26,28,30]
- Correct answer: 26
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 13 = 26.

**Variant B**

- Variant ID: `perspective-frame-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 10 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 10 × 2 = 20.

#### Slot q4

Authored slot ID: `perspective-frame-slot-4`.

**Variant A**

- Variant ID: `perspective-frame-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 2 = ?
- Visual data: not authored
- Choices: [3,6,9,12]
- Correct answer: 6
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 3 × 2 = 6.

**Variant B**

- Variant ID: `perspective-frame-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 16
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 4 × 4 = 16.

### Challenge: geometricFloor

- State: **active** (active omitted; runtime default is true)
- anchorId: `geometricFloor`
- Linked rune(s): geometricFloor — Geometrische vloer (objectId: geometricFloor)
- Linked object: geometricFloor — Geometrische vloer (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "geometricFloor",
  "anchorId": "geometricFloor",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "geometricFloor"
  }
]
```

#### Slot q1

Authored slot ID: `geometric-floor-slot-1`.

**Variant A**

- Variant ID: `geometric-floor-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 4 = ?
- Visual data: not authored
- Choices: [15,20,25,30]
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 5 × 4 = 20.

**Variant B**

- Variant ID: `geometric-floor-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 5 = 30.

#### Slot q2

Authored slot ID: `geometric-floor-slot-2`.

**Variant A**

- Variant ID: `geometric-floor-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 5 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 5 = 35.

**Variant B**

- Variant ID: `geometric-floor-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 40
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 5 = 40.

#### Slot q3

Authored slot ID: `geometric-floor-slot-3`.

**Variant A**

- Variant ID: `geometric-floor-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 5 = ?
- Visual data: not authored
- Choices: [36,45,54,63]
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 5 = 45.

**Variant B**

- Variant ID: `geometric-floor-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 6 = 12.

#### Slot q4

Authored slot ID: `geometric-floor-slot-4`.

**Variant A**

- Variant ID: `geometric-floor-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 10 × 6 = ?
- Visual data: not authored
- Choices: [50,60,70,80]
- Correct answer: 60
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 10 × 6 = 60.

**Variant B**

- Variant ID: `geometric-floor-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 21
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 3 × 7 = 21.

### Challenge: pigmentTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `pigmentTable`
- Linked rune(s): pigmentTable — Pigmenttafel (objectId: pigmentTable)
- Linked object: pigmentTable — Pigmenttafel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "pigmentTable",
  "anchorId": "pigmentTable",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "pigmentTable"
  }
]
```

#### Slot q1

Authored slot ID: `pigment-table-slot-1`.

**Variant A**

- Variant ID: `pigment-table-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 4 × 2 = ?
- Visual data: not authored
- Choices: [4,8,12,16]
- Correct answer: 8
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 4 × 2 = 8.

**Variant B**

- Variant ID: `pigment-table-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 5 × 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 5 × 5 = 25.

#### Slot q2

Authored slot ID: `pigment-table-slot-2`.

**Variant A**

- Variant ID: `pigment-table-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 3 = ?
- Visual data: not authored
- Choices: [12,18,24,30]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 3 = 18.

**Variant B**

- Variant ID: `pigment-table-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 6 = 42.

#### Slot q3

Authored slot ID: `pigment-table-slot-3`.

**Variant A**

- Variant ID: `pigment-table-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 4 = ?
- Visual data: not authored
- Choices: [24,32,40,48]
- Correct answer: 32
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 4 = 32.

**Variant B**

- Variant ID: `pigment-table-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 6 = 54.

#### Slot q4

Authored slot ID: `pigment-table-slot-4`.

**Variant A**

- Variant ID: `pigment-table-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 × 5 = ?
- Visual data: not authored
- Choices: [8,10,12,14]
- Correct answer: 10
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 5 = 10.

**Variant B**

- Variant ID: `pigment-table-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 10 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 70
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 10 × 7 = 70.

### Challenge: pulleyPanel

- State: **active** (active omitted; runtime default is true)
- anchorId: `pulleyPanel`
- Linked rune(s): pulleyPanel — Katrolpaneel (objectId: pulleyPanel)
- Linked object: pulleyPanel — Katrolpaneel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: clock_reading
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "pulleyPanel",
  "anchorId": "pulleyPanel",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "pulleyPanel"
  }
]
```

#### Slot q1

Authored slot ID: `pulley-panel-slot-1`.

**Variant A**

- Variant ID: `pulley-panel-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":11,"minute":5}
- Choices: ["Vijf over elf","Vijf over twaalf","Tien voor half twaalf","Vijf over half twaalf"]
- Correct answer: "Vijf over elf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over elf.

**Variant B**

- Variant ID: `pulley-panel-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":1,"minute":20}
- Choices: ["Tien voor half twee","Tien voor half drie","Vijf over half twee","Tien voor twee"]
- Correct answer: "Tien voor half twee"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor half twee.

#### Slot q2

Authored slot ID: `pulley-panel-slot-2`.

**Variant A**

- Variant ID: `pulley-panel-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":4,"minute":35}
- Choices: ["Vijf over half vijf","Vijf over half zes","Tien voor vijf","Vijf over vier"]
- Correct answer: "Vijf over half vijf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over half vijf.

**Variant B**

- Variant ID: `pulley-panel-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":6,"minute":50}
- Choices: ["Tien voor zeven","Tien voor acht","Vijf over zes","Tien voor half zeven"]
- Correct answer: "Tien voor zeven"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor zeven.

#### Slot q3

Authored slot ID: `pulley-panel-slot-3`.

**Variant A**

- Variant ID: `pulley-panel-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":8,"minute":10}
- Choices: ["Tien over acht","Tien over negen","Vijf voor half negen","Tien over half negen"]
- Correct answer: "Tien over acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien over acht.

**Variant B**

- Variant ID: `pulley-panel-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":10,"minute":25}
- Choices: ["Vijf voor half elf","Vijf voor half twaalf","Tien over half elf","Vijf voor elf"]
- Correct answer: "Vijf voor half elf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf voor half elf.

#### Slot q4

Authored slot ID: `pulley-panel-slot-4`.

**Variant A**

- Variant ID: `pulley-panel-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":12,"minute":40}
- Choices: ["Tien over half een","Tien over half twee","Vijf voor een","Tien over twaalf"]
- Correct answer: "Tien over half een"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien over half een.

**Variant B**

- Variant ID: `pulley-panel-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":2,"minute":55}
- Choices: ["Vijf voor drie","Vijf voor vier","Tien over twee","Vijf voor half drie"]
- Correct answer: "Vijf voor drie"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf voor drie.

<a id="level-lvl-0026"></a>

## LVL-0026 — Vinci

Source: [Levels/LVL-0026/level.js](../../Levels/LVL-0026/level.js). Production level.

### Challenge: waterModel

- State: **inactive** (authored active: false)
- anchorId: `waterModel`
- Linked rune(s): waterModel — Watermodel (objectId: waterModel)
- Linked object: waterModel — Watermodel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "waterModel",
  "anchorId": "waterModel",
  "challengeCharacterId": "leonardo-da-vinci",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "waterModel"
  }
]
```

#### Slot q1

Authored slot ID: `water-model-slot-1`.

**Variant A**

- Variant ID: `water-model-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 3 × 6 = ?
- Visual data: not authored
- Choices: [15,18,21,24]
- Correct answer: 18
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 3 × 6 = 18.

**Variant B**

- Variant ID: `water-model-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 28
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 4 × 7 = 28.

#### Slot q2

Authored slot ID: `water-model-slot-2`.

**Variant A**

- Variant ID: `water-model-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 × 7 = ?
- Visual data: not authored
- Choices: [30,35,40,45]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 5 × 7 = 35.

**Variant B**

- Variant ID: `water-model-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 × 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 54
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 9 = 54.

#### Slot q3

Authored slot ID: `water-model-slot-3`.

**Variant A**

- Variant ID: `water-model-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 × 8 = ?
- Visual data: not authored
- Choices: [49,56,63,70]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 8 = 56.

**Variant B**

- Variant ID: `water-model-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 80
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 10 = 80.

#### Slot q4

Authored slot ID: `water-model-slot-4`.

**Variant A**

- Variant ID: `water-model-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 × 11 = ?
- Visual data: not authored
- Choices: [90,99,108,117]
- Correct answer: 99
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 11 = 99.

**Variant B**

- Variant ID: `water-model-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 2 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 2 × 10 = 20.

### Challenge: opticalTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `opticalTable`
- Linked rune(s): opticalTable — Optische tafel (objectId: opticalTable)
- Linked object: opticalTable — Optische tafel (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "opticalTable",
  "anchorId": "opticalTable",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "opticalTable"
  }
]
```

#### Slot q1

Authored slot ID: `optical-table-slot-1`.

**Variant A**

- Variant ID: `optical-table-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 6 = ?
- Visual data: not authored
- Choices: [30,36,42,48]
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 6 = 36.

**Variant B**

- Variant ID: `optical-table-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 49
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 7 = 49.

#### Slot q2

Authored slot ID: `optical-table-slot-2`.

**Variant A**

- Variant ID: `optical-table-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 7 = ?
- Visual data: not authored
- Choices: [48,56,64,72]
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 7 = 56.

**Variant B**

- Variant ID: `optical-table-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 8 = 72.

#### Slot q3

Authored slot ID: `optical-table-slot-3`.

**Variant A**

- Variant ID: `optical-table-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 10 = ?
- Visual data: not authored
- Choices: [54,60,66,72]
- Correct answer: 60
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 10 = 60.

**Variant B**

- Variant ID: `optical-table-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 10 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 70
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 10 = 70.

#### Slot q4

Authored slot ID: `optical-table-slot-4`.

**Variant A**

- Variant ID: `optical-table-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 13 = ?
- Visual data: not authored
- Choices: [96,104,112,120]
- Correct answer: 104
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 13 = 104.

**Variant B**

- Variant ID: `optical-table-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 12 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 108
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 12 = 108.

### Challenge: centralCodex

- State: **active** (active omitted; runtime default is true)
- anchorId: `centralCodex`
- Linked rune(s): centralCodex — Centrale codex (objectId: centralCodex)
- Linked object: centralCodex — Centrale codex (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: clock_reading
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "centralCodex",
  "anchorId": "centralCodex",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "centralCodex"
  }
]
```

#### Slot q1

Authored slot ID: `central-codex-slot-1`.

**Variant A**

- Variant ID: `central-codex-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":4,"minute":0}
- Choices: ["Vier uur","Vijf uur","Kwart over vier","Half vijf"]
- Correct answer: "Vier uur"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vier uur.

**Variant B**

- Variant ID: `central-codex-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":6,"minute":15}
- Choices: ["Kwart over zes","Kwart over zeven","Half zeven","Kwart voor zeven"]
- Correct answer: "Kwart over zes"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart over zes.

#### Slot q2

Authored slot ID: `central-codex-slot-2`.

**Variant A**

- Variant ID: `central-codex-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":8,"minute":30}
- Choices: ["Half negen","Half tien","Kwart voor negen","Acht uur"]
- Correct answer: "Half negen"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Half negen.

**Variant B**

- Variant ID: `central-codex-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":10,"minute":45}
- Choices: ["Kwart voor elf","Kwart voor twaalf","Tien uur","Kwart over tien"]
- Correct answer: "Kwart voor elf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart voor elf.

#### Slot q3

Authored slot ID: `central-codex-slot-3`.

**Variant A**

- Variant ID: `central-codex-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":12,"minute":10}
- Choices: ["Tien over twaalf","Tien over een","Vijf voor half een","Tien over half een"]
- Correct answer: "Tien over twaalf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien over twaalf.

**Variant B**

- Variant ID: `central-codex-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":2,"minute":25}
- Choices: ["Vijf voor half drie","Vijf voor half vier","Tien over half drie","Vijf voor drie"]
- Correct answer: "Vijf voor half drie"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf voor half drie.

#### Slot q4

Authored slot ID: `central-codex-slot-4`.

**Variant A**

- Variant ID: `central-codex-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":5,"minute":40}
- Choices: ["Tien over half zes","Tien over half zeven","Vijf voor zes","Tien over vijf"]
- Correct answer: "Tien over half zes"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien over half zes.

**Variant B**

- Variant ID: `central-codex-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":7,"minute":55}
- Choices: ["Vijf voor acht","Vijf voor negen","Tien over zeven","Vijf voor half acht"]
- Correct answer: "Vijf voor acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf voor acht.

### Challenge: wingConstruction

- State: **inactive** (authored active: false)
- anchorId: `wingConstruction`
- Linked rune(s): wingConstruction — Vleugelconstructie (objectId: wingConstruction)
- Linked object: wingConstruction — Vleugelconstructie (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: bare_multiplication
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "wingConstruction",
  "anchorId": "wingConstruction",
  "challengeCharacterId": "leonardo-da-vinci",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "wingConstruction"
  }
]
```

#### Slot q1

Authored slot ID: `wing-construction-slot-1`.

**Variant A**

- Variant ID: `wing-construction-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 7 = ?
- Visual data: not authored
- Choices: [36,42,48,54]
- Correct answer: 42
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 7 = 42.

**Variant B**

- Variant ID: `wing-construction-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 2 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 14
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 2 = 14.

#### Slot q2

Authored slot ID: `wing-construction-slot-2`.

**Variant A**

- Variant ID: `wing-construction-2a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 3 = ?
- Visual data: not authored
- Choices: [16,24,32,40]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 3 = 24.

**Variant B**

- Variant ID: `wing-construction-2b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 4 = 36.

#### Slot q3

Authored slot ID: `wing-construction-slot-3`.

**Variant A**

- Variant ID: `wing-construction-3a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 × 13 = ?
- Visual data: not authored
- Choices: [72,78,84,90]
- Correct answer: 78
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 × 13 = 78.

**Variant B**

- Variant ID: `wing-construction-3b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 × 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 21
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 × 3 = 21.

#### Slot q4

Authored slot ID: `wing-construction-slot-4`.

**Variant A**

- Variant ID: `wing-construction-4a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 × 6 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 × 6 = 48.

**Variant B**

- Variant ID: `wing-construction-4b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 × 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 × 7 = 63.

### Challenge: designBoard

- State: **active** (active omitted; runtime default is true)
- anchorId: `designBoard`
- Linked rune(s): designBoard — Ontwerpbord (objectId: designBoard)
- Linked object: designBoard — Ontwerpbord (type: rune)
- challengeCharacterId: `leonardo-da-vinci`
- Families: clock_reading
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "designBoard",
  "anchorId": "designBoard",
  "challengeCharacterId": "leonardo-da-vinci"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "designBoard"
  }
]
```

#### Slot q1

Authored slot ID: `design-board-slot-1`.

**Variant A**

- Variant ID: `design-board-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":9,"minute":0}
- Choices: ["Negen uur","Tien uur","Kwart over negen","Half tien"]
- Correct answer: "Negen uur"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Negen uur.

**Variant B**

- Variant ID: `design-board-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":11,"minute":15}
- Choices: ["Kwart over elf","Kwart over twaalf","Half twaalf","Kwart voor twaalf"]
- Correct answer: "Kwart over elf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart over elf.

#### Slot q2

Authored slot ID: `design-board-slot-2`.

**Variant A**

- Variant ID: `design-board-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":1,"minute":30}
- Choices: ["Half twee","Half drie","Kwart voor twee","Een uur"]
- Correct answer: "Half twee"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Half twee.

**Variant B**

- Variant ID: `design-board-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":3,"minute":45}
- Choices: ["Kwart voor vier","Kwart voor vijf","Drie uur","Kwart over drie"]
- Correct answer: "Kwart voor vier"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart voor vier.

#### Slot q3

Authored slot ID: `design-board-slot-3`.

**Variant A**

- Variant ID: `design-board-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":5,"minute":5}
- Choices: ["Vijf over vijf","Vijf over zes","Tien voor half zes","Vijf over half zes"]
- Correct answer: "Vijf over vijf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over vijf.

**Variant B**

- Variant ID: `design-board-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":7,"minute":20}
- Choices: ["Tien voor half acht","Tien voor half negen","Vijf over half acht","Tien voor acht"]
- Correct answer: "Tien voor half acht"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor half acht.

#### Slot q4

Authored slot ID: `design-board-slot-4`.

**Variant A**

- Variant ID: `design-board-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":10,"minute":35}
- Choices: ["Vijf over half elf","Vijf over half twaalf","Tien voor elf","Vijf over tien"]
- Correct answer: "Vijf over half elf"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over half elf.

**Variant B**

- Variant ID: `design-board-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":12,"minute":50}
- Choices: ["Tien voor een","Tien voor twee","Vijf over twaalf","Tien voor half een"]
- Correct answer: "Tien voor een"
- hintMinnie: Kijk eerst naar de grote wijzer.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor een.

<a id="level-lvl-0027"></a>

## LVL-0027 — Cairo Museum

Source: [Levels/LVL-0027/level.js](../../Levels/LVL-0027/level.js). Production level.

### Challenge: anubisStatue

- State: **inactive** (authored active: false)
- anchorId: `anubisStatue`
- Linked rune(s): anubisStatue — Anubisbeeld (objectId: anubisStatue)
- Linked object: anubisStatue — Anubisbeeld (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "anubisStatue",
  "anchorId": "anubisStatue",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "anubisStatue"
  }
]
```

#### Slot q1

Authored slot ID: `anubis-statue-slot-1`.

**Variant A**

- Variant ID: `anubis-statue-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 x 5 = ?
- Visual data: not authored
- Choices: [8,10,12,14]
- Correct answer: 10
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Twee groepjes van vijf kun je ook verdubbelen.
- Explanation: 2 x 5 = 10.

**Variant B**

- Variant ID: `anubis-statue-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 x 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 7 x 8 = 56.

#### Slot q2

Authored slot ID: `anubis-statue-slot-2`.

**Variant A**

- Variant ID: `anubis-statue-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het Anubisbeeld liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 5 x 6 = 30.

**Variant B**

- Variant ID: `anubis-statue-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 4 vakken met 6 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 4 x 6 = 24.

#### Slot q3

Authored slot ID: `anubis-statue-slot-3`.

**Variant A**

- Variant ID: `anubis-statue-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 42 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 42 : 7 = 6, want 7 x 6 = 42.

**Variant B**

- Variant ID: `anubis-statue-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 56 steentjes bij het Anubisbeeld in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 56 : 7 = 8, want 7 x 8 = 56.

#### Slot q4

Authored slot ID: `anubis-statue-slot-4`.

**Variant A**

- Variant ID: `anubis-statue-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Anubis","Anubise","Anubin","An-ubis"]
- Correct answer: "Anubis"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Anubis is de juiste spelling.

**Variant B**

- Variant ID: `anubis-statue-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Sarcofaag","Sarkofaag","Sarcofhaag","Sarcofag"]
- Correct answer: "Sarcofaag"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Sarcofaag is de juiste spelling.

### Challenge: tabletCase

- State: **active** (active omitted; runtime default is true)
- anchorId: `tabletCase`
- Linked rune(s): tabletCase — Tabletvitrine (objectId: tabletCase)
- Linked object: tabletCase — Tabletvitrine (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "tabletCase",
  "anchorId": "tabletCase",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "tabletCase"
  }
]
```

#### Slot q1

Authored slot ID: `tablet-case-slot-1`.

**Variant A**

- Variant ID: `tablet-case-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 x 5 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 x 5 = 35.

**Variant B**

- Variant ID: `tablet-case-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 3 x 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 3.
- hintMoose: Tel drie groepjes van vier bij elkaar.
- Explanation: 3 x 4 = 12.

#### Slot q2

Authored slot ID: `tablet-case-slot-2`.

**Variant A**

- Variant ID: `tablet-case-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de tabletvitrine liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 4 x 7 = 28.

**Variant B**

- Variant ID: `tablet-case-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 5 vakken met 7 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 35
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 5 x 7 = 35.

#### Slot q3

Authored slot ID: `tablet-case-slot-3`.

**Variant A**

- Variant ID: `tablet-case-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 48 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 48 : 8 = 6, want 8 x 6 = 48.

**Variant B**

- Variant ID: `tablet-case-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 72 steentjes bij de tabletvitrine in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 72 : 8 = 9, want 8 x 9 = 72.

#### Slot q4

Authored slot ID: `tablet-case-slot-4`.

**Variant A**

- Variant ID: `tablet-case-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Hiëroglief","Hieroglief","Hiëroglyf","Hieroeglief"]
- Correct answer: "Hiëroglief"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Hiëroglief is de juiste spelling.

**Variant B**

- Variant ID: `tablet-case-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Tablet","Tablett","Tabelet","Tabblet"]
- Correct answer: "Tablet"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Tablet is de juiste spelling.

### Challenge: modelBoat

- State: **active** (active omitted; runtime default is true)
- anchorId: `modelBoat`
- Linked rune(s): modelBoat — Modelboot (objectId: modelBoat)
- Linked object: modelBoat — Modelboot (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "modelBoat",
  "anchorId": "modelBoat",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "modelBoat"
  }
]
```

#### Slot q1

Authored slot ID: `model-boat-slot-1`.

**Variant A**

- Variant ID: `model-boat-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 x 6 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 x 6 = 48.

**Variant B**

- Variant ID: `model-boat-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 x 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 9 x 5 = 45.

#### Slot q2

Authored slot ID: `model-boat-slot-2`.

**Variant A**

- Variant ID: `model-boat-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de modelboot liggen 10 rijen met 8 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [72,80,88,96]
- Correct answer: 80
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 10 x 8 = 80.

**Variant B**

- Variant ID: `model-boat-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 6 vakken met 8 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 6 x 8 = 48.

#### Slot q3

Authored slot ID: `model-boat-slot-3`.

**Variant A**

- Variant ID: `model-boat-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 20 : 4 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 5
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek hoeveel keer 4 in 20 past.
- Explanation: 20 : 4 = 5, want 4 x 5 = 20.

**Variant B**

- Variant ID: `model-boat-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 45 steentjes bij de modelboot in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 45 : 9 = 5, want 9 x 5 = 45.

#### Slot q4

Authored slot ID: `model-boat-slot-4`.

**Variant A**

- Variant ID: `model-boat-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Papyrus","Papirus","Pappyrus","Papyrys"]
- Correct answer: "Papyrus"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Papyrus is de juiste spelling.

**Variant B**

- Variant ID: `model-boat-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Boot","Bood","Bootte","Boott"]
- Correct answer: "Boot"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Boot is de juiste spelling.

### Challenge: reliefPanel

- State: **inactive** (authored active: false)
- anchorId: `reliefPanel`
- Linked rune(s): reliefPanel — Wandreliëf (objectId: reliefPanel)
- Linked object: reliefPanel — Wandreliëf (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "reliefPanel",
  "anchorId": "reliefPanel",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "reliefPanel"
  }
]
```

#### Slot q1

Authored slot ID: `relief-panel-slot-1`.

**Variant A**

- Variant ID: `relief-panel-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 x 7 = ?
- Visual data: not authored
- Choices: [54,63,72,81]
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 x 7 = 63.

**Variant B**

- Variant ID: `relief-panel-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 x 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 6 x 6 = 36.

#### Slot q2

Authored slot ID: `relief-panel-slot-2`.

**Variant A**

- Variant ID: `relief-panel-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het wandrelief liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [18,27,36,45]
- Correct answer: 27
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 3 x 9 = 27.

**Variant B**

- Variant ID: `relief-panel-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 7 vakken met 9 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 7 x 9 = 63.

#### Slot q3

Authored slot ID: `relief-panel-slot-3`.

**Variant A**

- Variant ID: `relief-panel-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 63 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 63 : 9 = 7, want 9 x 7 = 63.

**Variant B**

- Variant ID: `relief-panel-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 30 steentjes bij het wandrelief in 5 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 6
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 30 : 5 = 6, want 5 x 6 = 30.

#### Slot q4

Authored slot ID: `relief-panel-slot-4`.

**Variant A**

- Variant ID: `relief-panel-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Reliëf","Relief","Reliëff","Reliéf"]
- Correct answer: "Reliëf"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Reliëf is de juiste spelling.

**Variant B**

- Variant ID: `relief-panel-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Farao","Farau","Farrao","Fa-rao"]
- Correct answer: "Farao"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Farao is de juiste spelling.

<a id="level-lvl-0028"></a>

## LVL-0028 — Pyramid Build at Giza

Source: [Levels/LVL-0028/level.js](../../Levels/LVL-0028/level.js). Production level.

### Challenge: tripodInstrument

- State: **active** (active omitted; runtime default is true)
- anchorId: `tripodInstrument`
- Linked rune(s): tripodInstrument — Meetinstrument (objectId: tripodInstrument)
- Linked object: tripodInstrument — Meetinstrument (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: clock_reading
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "tripodInstrument",
  "anchorId": "tripodInstrument",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "tripodInstrument"
  }
]
```

#### Slot q1

Authored slot ID: `tripod-instrument-slot-1`.

**Variant A**

- Variant ID: `tripod-instrument-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":0}
- Choices: ["Half drie","Drie uur","Half vier","Vier uur"]
- Correct answer: "Drie uur"
- hintMinnie: De grote wijzer staat op de 12.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Drie uur.

**Variant B**

- Variant ID: `tripod-instrument-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":6,"minute":15}
- Choices: ["Kwart over zes","Kwart over zeven","Half zeven","Kwart voor zeven"]
- Correct answer: "Kwart over zes"
- hintMinnie: De grote wijzer staat op de 3.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart over zes.

#### Slot q2

Authored slot ID: `tripod-instrument-slot-2`.

**Variant A**

- Variant ID: `tripod-instrument-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":7,"minute":30}
- Choices: ["Zeven uur","Half zeven","Half acht","Acht uur"]
- Correct answer: "Half acht"
- hintMinnie: De grote wijzer staat op de 6.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Half acht.

**Variant B**

- Variant ID: `tripod-instrument-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":4,"minute":45}
- Choices: ["Kwart voor vier","Kwart over vier","Half vijf","Kwart voor vijf"]
- Correct answer: "Kwart voor vijf"
- hintMinnie: De grote wijzer staat op de 9.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart voor vijf.

#### Slot q3

Authored slot ID: `tripod-instrument-slot-3`.

**Variant A**

- Variant ID: `tripod-instrument-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":2,"minute":20}
- Choices: ["Tien over twee","Tien voor half drie","Half drie","Tien over half drie"]
- Correct answer: "Tien voor half drie"
- hintMinnie: De grote wijzer staat op de 4.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor half drie.

**Variant B**

- Variant ID: `tripod-instrument-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":8,"minute":35}
- Choices: ["Vijf over acht","Vijf voor half negen","Vijf over half negen","Tien over half negen"]
- Correct answer: "Vijf over half negen"
- hintMinnie: De grote wijzer staat op de 7.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over half negen.

#### Slot q4

Authored slot ID: `tripod-instrument-slot-4`.

**Variant A**

- Variant ID: `tripod-instrument-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":10,"minute":50}
- Choices: ["Tien voor elf","Tien over tien","Vijf voor elf","Elf uur"]
- Correct answer: "Tien voor elf"
- hintMinnie: De grote wijzer staat op de 10.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor elf.

**Variant B**

- Variant ID: `tripod-instrument-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":12,"minute":5}
- Choices: ["Vijf voor twaalf","Vijf over twaalf","Tien over twaalf","Twaalf uur"]
- Correct answer: "Vijf over twaalf"
- hintMinnie: De grote wijzer staat op de 1.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over twaalf.

### Challenge: planningTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `planningTable`
- Linked rune(s): planningTable — Bouwtafel (objectId: planningTable)
- Linked object: planningTable — Bouwtafel (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "planningTable",
  "anchorId": "planningTable",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "planningTable"
  }
]
```

#### Slot q1

Authored slot ID: `planning-table-slot-1`.

**Variant A**

- Variant ID: `planning-table-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 10 x 5 = ?
- Visual data: not authored
- Choices: [40,45,50,60]
- Correct answer: 50
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Bij keer 10 komt er een nul achter het getal.
- Explanation: 10 x 5 = 50.

**Variant B**

- Variant ID: `planning-table-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 x 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 7 x 8 = 56.

#### Slot q2

Authored slot ID: `planning-table-slot-2`.

**Variant A**

- Variant ID: `planning-table-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de bouwtafel liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 5 x 6 = 30.

**Variant B**

- Variant ID: `planning-table-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 4 vakken met 6 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 4 x 6 = 24.

#### Slot q3

Authored slot ID: `planning-table-slot-3`.

**Variant A**

- Variant ID: `planning-table-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 42 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 42 : 7 = 6, want 7 x 6 = 42.

**Variant B**

- Variant ID: `planning-table-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 56 steentjes bij de bouwtafel in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 56 : 7 = 8, want 7 x 8 = 56.

#### Slot q4

Authored slot ID: `planning-table-slot-4`.

**Variant A**

- Variant ID: `planning-table-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Piramide","Pyramide","Piramiede","Pirramide"]
- Correct answer: "Piramide"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Piramide is de juiste spelling.

**Variant B**

- Variant ID: `planning-table-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Bouwplan","Bouwplaan","Bouplan","Bouw-plan"]
- Correct answer: "Bouwplan"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Bouwplan is de juiste spelling.

### Challenge: stoneSled

- State: **active** (active omitted; runtime default is true)
- anchorId: `stoneSled`
- Linked rune(s): stoneSled — Steenslede (objectId: stoneSled)
- Linked object: stoneSled — Steenslede (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "stoneSled",
  "anchorId": "stoneSled",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "stoneSled"
  }
]
```

#### Slot q1

Authored slot ID: `stone-sled-slot-1`.

**Variant A**

- Variant ID: `stone-sled-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 x 5 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 x 5 = 35.

**Variant B**

- Variant ID: `stone-sled-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 4 x 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 20
- hintMinnie: Denk aan de tafel van 4.
- hintMoose: Vier groepjes van vijf is hetzelfde als 5 + 5 + 5 + 5.
- Explanation: 4 x 5 = 20.

#### Slot q2

Authored slot ID: `stone-sled-slot-2`.

**Variant A**

- Variant ID: `stone-sled-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de steenslede liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 4 x 7 = 28.

**Variant B**

- Variant ID: `stone-sled-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 5 vakken met 7 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 35
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 5 x 7 = 35.

#### Slot q3

Authored slot ID: `stone-sled-slot-3`.

**Variant A**

- Variant ID: `stone-sled-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 48 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 48 : 8 = 6, want 8 x 6 = 48.

**Variant B**

- Variant ID: `stone-sled-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 72 steentjes bij de steenslede in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 72 : 8 = 9, want 8 x 9 = 72.

#### Slot q4

Authored slot ID: `stone-sled-slot-4`.

**Variant A**

- Variant ID: `stone-sled-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Slede","Sleede","Sledde","Sleedeh"]
- Correct answer: "Slede"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Slede is de juiste spelling.

**Variant B**

- Variant ID: `stone-sled-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Steenblok","Steenblock","Steen-blok","Steenblokk"]
- Correct answer: "Steenblok"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Steenblok is de juiste spelling.

### Challenge: craneFrame

- State: **inactive** (authored active: false)
- anchorId: `craneFrame`
- Linked rune(s): craneFrame — Houten kraan (objectId: craneFrame)
- Linked object: craneFrame — Houten kraan (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "craneFrame",
  "anchorId": "craneFrame",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "craneFrame"
  }
]
```

#### Slot q1

Authored slot ID: `crane-frame-slot-1`.

**Variant A**

- Variant ID: `crane-frame-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 x 6 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 x 6 = 48.

**Variant B**

- Variant ID: `crane-frame-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 x 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 9 x 5 = 45.

#### Slot q2

Authored slot ID: `crane-frame-slot-2`.

**Variant A**

- Variant ID: `crane-frame-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de houten kraan liggen 3 rijen met 5 touwen. Hoeveel touwen zijn dat samen?
- Visual data: not authored
- Choices: [12,15,18,20]
- Correct answer: 15
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 3 x 5 = 15.

**Variant B**

- Variant ID: `crane-frame-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 6 vakken met 8 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 6 x 8 = 48.

#### Slot q3

Authored slot ID: `crane-frame-slot-3`.

**Variant A**

- Variant ID: `crane-frame-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 56 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 56 : 7 = 8, want 7 x 8 = 56.

**Variant B**

- Variant ID: `crane-frame-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 45 steentjes bij de houten kraan in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 45 : 9 = 5, want 9 x 5 = 45.

#### Slot q4

Authored slot ID: `crane-frame-slot-4`.

**Variant A**

- Variant ID: `crane-frame-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Hijsbalk","Heisbalk","Hijsbalck","Hijs-balk"]
- Correct answer: "Hijsbalk"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Hijsbalk is de juiste spelling.

**Variant B**

- Variant ID: `crane-frame-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Touw","Tauw","Tou","Toew"]
- Correct answer: "Touw"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Touw is de juiste spelling.

<a id="level-lvl-0029"></a>

## LVL-0029 — Tutanchamon Tomb

Source: [Levels/LVL-0029/level.js](../../Levels/LVL-0029/level.js). Production level.

### Challenge: paintedRelief

- State: **inactive** (authored active: false)
- anchorId: `paintedRelief`
- Linked rune(s): paintedRelief — Geschilderd relief (objectId: paintedRelief)
- Linked object: paintedRelief — Geschilderd relief (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "paintedRelief",
  "anchorId": "paintedRelief",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "paintedRelief"
  }
]
```

#### Slot q1

Authored slot ID: `painted-relief-slot-1`.

**Variant A**

- Variant ID: `painted-relief-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 5 x 5 = ?
- Visual data: not authored
- Choices: [20,25,30,35]
- Correct answer: 25
- hintMinnie: Denk aan de tafel van 5.
- hintMoose: Vijf groepjes van vijf vormen samen 25.
- Explanation: 5 x 5 = 25.

**Variant B**

- Variant ID: `painted-relief-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 x 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 6 x 6 = 36.

#### Slot q2

Authored slot ID: `painted-relief-slot-2`.

**Variant A**

- Variant ID: `painted-relief-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het geschilderde relief liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [18,27,36,45]
- Correct answer: 27
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 3 x 9 = 27.

**Variant B**

- Variant ID: `painted-relief-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 7 vakken met 9 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 7 x 9 = 63.

#### Slot q3

Authored slot ID: `painted-relief-slot-3`.

**Variant A**

- Variant ID: `painted-relief-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 63 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 63 : 9 = 7, want 9 x 7 = 63.

**Variant B**

- Variant ID: `painted-relief-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 36 steentjes bij het geschilderde relief in 6 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 36 : 6 = 6, want 6 x 6 = 36.

#### Slot q4

Authored slot ID: `painted-relief-slot-4`.

**Variant A**

- Variant ID: `painted-relief-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Farao","Farau","Farrao","Fa-rao"]
- Correct answer: "Farao"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Farao is de juiste spelling.

**Variant B**

- Variant ID: `painted-relief-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Reliëf","Relief","Reliëff","Reliéf"]
- Correct answer: "Reliëf"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Reliëf is de juiste spelling.

### Challenge: canopicJars

- State: **active** (active omitted; runtime default is true)
- anchorId: `canopicJars`
- Linked rune(s): canopicJars — Rituele kruiken (objectId: canopicJars)
- Linked object: canopicJars — Rituele kruiken (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "canopicJars",
  "anchorId": "canopicJars",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "canopicJars"
  }
]
```

#### Slot q1

Authored slot ID: `canopic-jars-slot-1`.

**Variant A**

- Variant ID: `canopic-jars-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 x 4 = ?
- Visual data: not authored
- Choices: [18,24,30,36]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 x 4 = 24.

**Variant B**

- Variant ID: `canopic-jars-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 x 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 7 x 8 = 56.

#### Slot q2

Authored slot ID: `canopic-jars-slot-2`.

**Variant A**

- Variant ID: `canopic-jars-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de rituele kruiken liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 5 x 6 = 30.

**Variant B**

- Variant ID: `canopic-jars-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 4 vakken met 6 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 4 x 6 = 24.

#### Slot q3

Authored slot ID: `canopic-jars-slot-3`.

**Variant A**

- Variant ID: `canopic-jars-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 18 : 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek hoeveel keer 3 in 18 past.
- Explanation: 18 : 3 = 6, want 3 x 6 = 18.

**Variant B**

- Variant ID: `canopic-jars-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 56 steentjes bij de rituele kruiken in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 56 : 7 = 8, want 7 x 8 = 56.

#### Slot q4

Authored slot ID: `canopic-jars-slot-4`.

**Variant A**

- Variant ID: `canopic-jars-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Kruik","Kruijk","Kruiq","Kr-uik"]
- Correct answer: "Kruik"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Kruik is de juiste spelling.

**Variant B**

- Variant ID: `canopic-jars-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Kruiken","Kruikenn","Kruijken","Krui-ken"]
- Correct answer: "Kruiken"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Kruiken is de juiste spelling.

### Challenge: treasureChest

- State: **inactive** (authored active: false)
- anchorId: `treasureChest`
- Linked rune(s): treasureChest — Schatkist (objectId: treasureChest)
- Linked object: treasureChest — Schatkist (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "treasureChest",
  "anchorId": "treasureChest",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "treasureChest"
  }
]
```

#### Slot q1

Authored slot ID: `treasure-chest-slot-1`.

**Variant A**

- Variant ID: `treasure-chest-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 x 5 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 x 5 = 35.

**Variant B**

- Variant ID: `treasure-chest-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 x 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 8 x 9 = 72.

#### Slot q2

Authored slot ID: `treasure-chest-slot-2`.

**Variant A**

- Variant ID: `treasure-chest-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de schatkist liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 4 x 7 = 28.

**Variant B**

- Variant ID: `treasure-chest-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 5 vakken met 7 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 35
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 5 x 7 = 35.

#### Slot q3

Authored slot ID: `treasure-chest-slot-3`.

**Variant A**

- Variant ID: `treasure-chest-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 48 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 48 : 8 = 6, want 8 x 6 = 48.

**Variant B**

- Variant ID: `treasure-chest-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 72 steentjes bij de schatkist in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 72 : 8 = 9, want 8 x 9 = 72.

#### Slot q4

Authored slot ID: `treasure-chest-slot-4`.

**Variant A**

- Variant ID: `treasure-chest-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Schat","Schad","Schatte","Sc-hat"]
- Correct answer: "Schat"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Schat is de juiste spelling.

**Variant B**

- Variant ID: `treasure-chest-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Goud","Gout","Goudt","Go-ud"]
- Correct answer: "Goud"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Goud is de juiste spelling.

### Challenge: altarTable

- State: **active** (active omitted; runtime default is true)
- anchorId: `altarTable`
- Linked rune(s): altarTable — Altaartafel (objectId: altarTable)
- Linked object: altarTable — Altaartafel (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "altarTable",
  "anchorId": "altarTable",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "altarTable"
  }
]
```

#### Slot q1

Authored slot ID: `altar-table-slot-1`.

**Variant A**

- Variant ID: `altar-table-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 x 6 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 x 6 = 48.

**Variant B**

- Variant ID: `altar-table-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 x 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 9 x 5 = 45.

#### Slot q2

Authored slot ID: `altar-table-slot-2`.

**Variant A**

- Variant ID: `altar-table-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de altaartafel liggen 10 rijen met 8 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [72,80,88,96]
- Correct answer: 80
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 10 x 8 = 80.

**Variant B**

- Variant ID: `altar-table-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 6 vakken met 8 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 6 x 8 = 48.

#### Slot q3

Authored slot ID: `altar-table-slot-3`.

**Variant A**

- Variant ID: `altar-table-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 56 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 56 : 7 = 8, want 7 x 8 = 56.

**Variant B**

- Variant ID: `altar-table-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 45 steentjes bij de altaartafel in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 45 : 9 = 5, want 9 x 5 = 45.

#### Slot q4

Authored slot ID: `altar-table-slot-4`.

**Variant A**

- Variant ID: `altar-table-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Altaar","Altar","Althaar","Al-taar"]
- Correct answer: "Altaar"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Altaar is de juiste spelling.

**Variant B**

- Variant ID: `altar-table-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Sarcofaag","Sarkofaag","Sarcofhaag","Sarcofag"]
- Correct answer: "Sarcofaag"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Sarcofaag is de juiste spelling.

<a id="level-lvl-0030"></a>

## LVL-0030 — Abu Simbel

Source: [Levels/LVL-0030/level.js](../../Levels/LVL-0030/level.js). Production level.

### Challenge: offeringTable

- State: **inactive** (authored active: false)
- anchorId: `offeringTable`
- Linked rune(s): offeringTable — Offertafel (objectId: offeringTable)
- Linked object: offeringTable — Offertafel (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "offeringTable",
  "anchorId": "offeringTable",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "offeringTable"
  }
]
```

#### Slot q1

Authored slot ID: `offering-table-slot-1`.

**Variant A**

- Variant ID: `offering-table-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 9 x 7 = ?
- Visual data: not authored
- Choices: [54,63,72,81]
- Correct answer: 63
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 9 x 7 = 63.

**Variant B**

- Variant ID: `offering-table-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 10 x 3 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 30
- hintMinnie: Denk aan de tafel van 10.
- hintMoose: Bij keer 10 komt er een nul achter het getal.
- Explanation: 10 x 3 = 30.

#### Slot q2

Authored slot ID: `offering-table-slot-2`.

**Variant A**

- Variant ID: `offering-table-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de offertafel liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [18,27,36,45]
- Correct answer: 27
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 3 x 9 = 27.

**Variant B**

- Variant ID: `offering-table-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 7 vakken met 9 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 7 x 9 = 63.

#### Slot q3

Authored slot ID: `offering-table-slot-3`.

**Variant A**

- Variant ID: `offering-table-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 63 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 63 : 9 = 7, want 9 x 7 = 63.

**Variant B**

- Variant ID: `offering-table-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 36 steentjes bij de offertafel in 6 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 36 : 6 = 6, want 6 x 6 = 36.

#### Slot q4

Authored slot ID: `offering-table-slot-4`.

**Variant A**

- Variant ID: `offering-table-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Offer","Ofer","Offur","Of-fer"]
- Correct answer: "Offer"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Offer is de juiste spelling.

**Variant B**

- Variant ID: `offering-table-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Offergave","Offergaave","Ofergave","Offer-gave"]
- Correct answer: "Offergave"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Offergave is de juiste spelling.

### Challenge: sundial

- State: **active** (active omitted; runtime default is true)
- anchorId: `sundial`
- Linked rune(s): sundial — Zonnewijzer (objectId: sundial)
- Linked object: sundial — Zonnewijzer (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: clock_reading
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "sundial",
  "anchorId": "sundial",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "sundial"
  }
]
```

#### Slot q1

Authored slot ID: `sundial-slot-1`.

**Variant A**

- Variant ID: `sundial-1a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":3,"minute":0}
- Choices: ["Half drie","Drie uur","Half vier","Vier uur"]
- Correct answer: "Drie uur"
- hintMinnie: De grote wijzer staat op de 12.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Drie uur.

**Variant B**

- Variant ID: `sundial-1b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":6,"minute":15}
- Choices: ["Kwart over zes","Kwart over zeven","Half zeven","Kwart voor zeven"]
- Correct answer: "Kwart over zes"
- hintMinnie: De grote wijzer staat op de 3.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart over zes.

#### Slot q2

Authored slot ID: `sundial-slot-2`.

**Variant A**

- Variant ID: `sundial-2a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":7,"minute":30}
- Choices: ["Zeven uur","Half zeven","Half acht","Acht uur"]
- Correct answer: "Half acht"
- hintMinnie: De grote wijzer staat op de 6.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Half acht.

**Variant B**

- Variant ID: `sundial-2b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":4,"minute":45}
- Choices: ["Kwart voor vier","Kwart over vier","Half vijf","Kwart voor vijf"]
- Correct answer: "Kwart voor vijf"
- hintMinnie: De grote wijzer staat op de 9.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Kwart voor vijf.

#### Slot q3

Authored slot ID: `sundial-slot-3`.

**Variant A**

- Variant ID: `sundial-3a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":2,"minute":20}
- Choices: ["Tien over twee","Tien voor half drie","Half drie","Tien over half drie"]
- Correct answer: "Tien voor half drie"
- hintMinnie: De grote wijzer staat op de 4.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor half drie.

**Variant B**

- Variant ID: `sundial-3b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":8,"minute":35}
- Choices: ["Vijf over acht","Vijf voor half negen","Vijf over half negen","Tien over half negen"]
- Correct answer: "Vijf over half negen"
- hintMinnie: De grote wijzer staat op de 7.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over half negen.

#### Slot q4

Authored slot ID: `sundial-slot-4`.

**Variant A**

- Variant ID: `sundial-4a`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Hoe laat is het?
- Visual data: {"type":"clock","hour":10,"minute":50}
- Choices: ["Tien voor elf","Tien over tien","Vijf voor elf","Elf uur"]
- Correct answer: "Tien voor elf"
- hintMinnie: De grote wijzer staat op de 10.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Tien voor elf.

**Variant B**

- Variant ID: `sundial-4b`
- Domain: math
- School band: E5-intended
- Family: clock_reading
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welke tijd staat op de klok?
- Visual data: {"type":"clock","hour":12,"minute":5}
- Choices: ["Vijf voor twaalf","Vijf over twaalf","Tien over twaalf","Twaalf uur"]
- Correct answer: "Vijf over twaalf"
- hintMinnie: De grote wijzer staat op de 1.
- hintMoose: Gebruik daarna de kleine wijzer om het uur te vinden.
- Explanation: De wijzers tonen Vijf over twaalf.

### Challenge: carvedRelief

- State: **inactive** (authored active: false)
- anchorId: `carvedRelief`
- Linked rune(s): carvedRelief — Gekerfd relief (objectId: carvedRelief)
- Linked object: carvedRelief — Gekerfd relief (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "carvedRelief",
  "anchorId": "carvedRelief",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "carvedRelief"
  }
]
```

#### Slot q1

Authored slot ID: `carved-relief-slot-1`.

**Variant A**

- Variant ID: `carved-relief-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 x 4 = ?
- Visual data: not authored
- Choices: [18,24,30,36]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 x 4 = 24.

**Variant B**

- Variant ID: `carved-relief-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 x 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 7 x 8 = 56.

#### Slot q2

Authored slot ID: `carved-relief-slot-2`.

**Variant A**

- Variant ID: `carved-relief-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het gekerfde relief liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 5 x 6 = 30.

**Variant B**

- Variant ID: `carved-relief-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 4 vakken met 6 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 4 x 6 = 24.

#### Slot q3

Authored slot ID: `carved-relief-slot-3`.

**Variant A**

- Variant ID: `carved-relief-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 42 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 42 : 7 = 6, want 7 x 6 = 42.

**Variant B**

- Variant ID: `carved-relief-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 16 steentjes bij het gekerfde relief in 2 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [6,7,8,9]
- Correct answer: 8
- hintMinnie: Verdeel het totaal in twee gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom met de deler.
- Explanation: 16 : 2 = 8, want 2 x 8 = 16.

#### Slot q4

Authored slot ID: `carved-relief-slot-4`.

**Variant A**

- Variant ID: `carved-relief-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Tempel","Temppel","Tepmel","Te-mpel"]
- Correct answer: "Tempel"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Tempel is de juiste spelling.

**Variant B**

- Variant ID: `carved-relief-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Reliëf","Relief","Reliëff","Reliéf"]
- Correct answer: "Reliëf"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Reliëf is de juiste spelling.

### Challenge: templePanel

- State: **active** (active omitted; runtime default is true)
- anchorId: `templePanel`
- Linked rune(s): templePanel — Tempelpaneel (objectId: templePanel)
- Linked object: templePanel — Tempelpaneel (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "templePanel",
  "anchorId": "templePanel",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "templePanel"
  }
]
```

#### Slot q1

Authored slot ID: `temple-panel-slot-1`.

**Variant A**

- Variant ID: `temple-panel-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 x 5 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 x 5 = 35.

**Variant B**

- Variant ID: `temple-panel-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 x 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 8 x 9 = 72.

#### Slot q2

Authored slot ID: `temple-panel-slot-2`.

**Variant A**

- Variant ID: `temple-panel-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het tempelpaneel liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 4 x 7 = 28.

**Variant B**

- Variant ID: `temple-panel-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 5 vakken met 7 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 35
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 5 x 7 = 35.

#### Slot q3

Authored slot ID: `temple-panel-slot-3`.

**Variant A**

- Variant ID: `temple-panel-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 48 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 48 : 8 = 6, want 8 x 6 = 48.

**Variant B**

- Variant ID: `temple-panel-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 72 steentjes bij het tempelpaneel in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 72 : 8 = 9, want 8 x 9 = 72.

#### Slot q4

Authored slot ID: `temple-panel-slot-4`.

**Variant A**

- Variant ID: `temple-panel-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Scarabee","Skarabee","Scarabe","Scarrabee"]
- Correct answer: "Scarabee"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Scarabee is de juiste spelling.

**Variant B**

- Variant ID: `temple-panel-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Zonnewijzer","Zonneweizer","Zonnewyzer","Zonne-wijzer"]
- Correct answer: "Zonnewijzer"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Zonnewijzer is de juiste spelling.

<a id="level-lvl-0031"></a>

## LVL-0031 — Cairo Museum Return

Source: [Levels/LVL-0031/level.js](../../Levels/LVL-0031/level.js). Production level.

### Challenge: scarabDisplay

- State: **active** (active omitted; runtime default is true)
- anchorId: `scarabDisplay`
- Linked rune(s): scarabDisplay — Scarabeevitrine (objectId: scarabDisplay)
- Linked object: scarabDisplay — Scarabeevitrine (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "scarabDisplay",
  "anchorId": "scarabDisplay",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "scarabDisplay"
  }
]
```

#### Slot q1

Authored slot ID: `scarab-display-slot-1`.

**Variant A**

- Variant ID: `scarab-display-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 8 x 6 = ?
- Visual data: not authored
- Choices: [40,48,56,64]
- Correct answer: 48
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 8 x 6 = 48.

**Variant B**

- Variant ID: `scarab-display-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 9 x 5 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 45
- hintMinnie: Denk aan de tafel van 9.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 9 x 5 = 45.

#### Slot q2

Authored slot ID: `scarab-display-slot-2`.

**Variant A**

- Variant ID: `scarab-display-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de scarabeevitrine liggen 10 rijen met 8 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [72,80,88,96]
- Correct answer: 80
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 10 x 8 = 80.

**Variant B**

- Variant ID: `scarab-display-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 6 vakken met 8 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 48
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 6 x 8 = 48.

#### Slot q3

Authored slot ID: `scarab-display-slot-3`.

**Variant A**

- Variant ID: `scarab-display-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 56 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 8
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 56 : 7 = 8, want 7 x 8 = 56.

**Variant B**

- Variant ID: `scarab-display-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 45 steentjes bij de scarabeevitrine in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [4,5,6,7]
- Correct answer: 5
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 45 : 9 = 5, want 9 x 5 = 45.

#### Slot q4

Authored slot ID: `scarab-display-slot-4`.

**Variant A**

- Variant ID: `scarab-display-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Scarabee","Skarabee","Scarabe","Scarrabee"]
- Correct answer: "Scarabee"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Scarabee is de juiste spelling.

**Variant B**

- Variant ID: `scarab-display-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Sarcofaag","Sarkofaag","Sarcofhaag","Sarcofag"]
- Correct answer: "Sarcofaag"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Sarcofaag is de juiste spelling.

### Challenge: centralCase

- State: **inactive** (authored active: false)
- anchorId: `centralCase`
- Linked rune(s): centralCase — Middenvitrine (objectId: centralCase)
- Linked object: centralCase — Middenvitrine (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "centralCase",
  "anchorId": "centralCase",
  "challengeCharacterId": "CHR-EGYPT-NEBU",
  "active": false
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "centralCase"
  }
]
```

#### Slot q1

Authored slot ID: `central-case-slot-1`.

**Variant A**

- Variant ID: `central-case-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 2 x 6 = ?
- Visual data: not authored
- Choices: [8,10,12,14]
- Correct answer: 12
- hintMinnie: Denk aan de tafel van 2.
- hintMoose: Twee groepjes van zes kun je verdubbelen.
- Explanation: 2 x 6 = 12.

**Variant B**

- Variant ID: `central-case-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 6 x 6 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 36
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 6 x 6 = 36.

#### Slot q2

Authored slot ID: `central-case-slot-2`.

**Variant A**

- Variant ID: `central-case-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij de middenvitrine liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [18,27,36,45]
- Correct answer: 27
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 3 x 9 = 27.

**Variant B**

- Variant ID: `central-case-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 7 vakken met 9 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 63
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 7 x 9 = 63.

#### Slot q3

Authored slot ID: `central-case-slot-3`.

**Variant A**

- Variant ID: `central-case-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 63 : 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 7
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 63 : 9 = 7, want 9 x 7 = 63.

**Variant B**

- Variant ID: `central-case-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 36 steentjes bij de middenvitrine in 6 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [5,6,7,8]
- Correct answer: 6
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 36 : 6 = 6, want 6 x 6 = 36.

#### Slot q4

Authored slot ID: `central-case-slot-4`.

**Variant A**

- Variant ID: `central-case-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Vitrine","Vitriene","Vittrine","Vi-trine"]
- Correct answer: "Vitrine"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Vitrine is de juiste spelling.

**Variant B**

- Variant ID: `central-case-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Museum","Museüm","Muzeum","Mu-seum"]
- Correct answer: "Museum"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Museum is de juiste spelling.

### Challenge: boatDisplay

- State: **active** (active omitted; runtime default is true)
- anchorId: `boatDisplay`
- Linked rune(s): boatDisplay — Bootdisplay (objectId: boatDisplay)
- Linked object: boatDisplay — Bootdisplay (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "boatDisplay",
  "anchorId": "boatDisplay",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "boatDisplay"
  }
]
```

#### Slot q1

Authored slot ID: `boat-display-slot-1`.

**Variant A**

- Variant ID: `boat-display-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 6 x 4 = ?
- Visual data: not authored
- Choices: [18,24,30,36]
- Correct answer: 24
- hintMinnie: Denk aan de tafel van 6.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 6 x 4 = 24.

**Variant B**

- Variant ID: `boat-display-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 7 x 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 56
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 7 x 8 = 56.

#### Slot q2

Authored slot ID: `boat-display-slot-2`.

**Variant A**

- Variant ID: `boat-display-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het bootdisplay liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [24,30,36,42]
- Correct answer: 30
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 5 x 6 = 30.

**Variant B**

- Variant ID: `boat-display-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 4 vakken met 6 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 24
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 4 x 6 = 24.

#### Slot q3

Authored slot ID: `boat-display-slot-3`.

**Variant A**

- Variant ID: `boat-display-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 42 : 7 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 42 : 7 = 6, want 7 x 6 = 42.

**Variant B**

- Variant ID: `boat-display-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 56 steentjes bij het bootdisplay in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [7,8,9,10]
- Correct answer: 8
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 56 : 7 = 8, want 7 x 8 = 56.

#### Slot q4

Authored slot ID: `boat-display-slot-4`.

**Variant A**

- Variant ID: `boat-display-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Museum","Museüm","Muzeum","Mu-seum"]
- Correct answer: "Museum"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Museum is de juiste spelling.

**Variant B**

- Variant ID: `boat-display-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Papyrus","Papirus","Pappyrus","Papyrys"]
- Correct answer: "Papyrus"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Papyrus is de juiste spelling.

### Challenge: seatedStatue

- State: **active** (active omitted; runtime default is true)
- anchorId: `seatedStatue`
- Linked rune(s): seatedStatue — Zittend beeld (objectId: seatedStatue)
- Linked object: seatedStatue — Zittend beeld (type: rune)
- challengeCharacterId: `CHR-EGYPT-NEBU`
- Families: bare_multiplication, story_multiplication, bare_division, story_division, spelling
- Complete authored challenge metadata (including any presentation, NPC, progression and prerequisite fields):

```json
{
  "id": "seatedStatue",
  "anchorId": "seatedStatue",
  "challengeCharacterId": "CHR-EGYPT-NEBU"
}
```

- Rune binding / progression fields:

```json
[
  {
    "challengeId": "seatedStatue"
  }
]
```

#### Slot q1

Authored slot ID: `seated-statue-slot-1`.

**Variant A**

- Variant ID: `seated-statue-1a`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: 7 x 5 = ?
- Visual data: not authored
- Choices: [28,35,42,49]
- Correct answer: 35
- hintMinnie: Denk aan de tafel van 7.
- hintMoose: Splits de keersom in twee makkelijke stukken.
- Explanation: 7 x 5 = 35.

**Variant B**

- Variant ID: `seated-statue-1b`
- Domain: math
- School band: E5-intended
- Family: bare_multiplication
- Presentation: bare
- Answer mode: open
- Prompt: 8 x 9 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 72
- hintMinnie: Denk aan de tafel van 8.
- hintMoose: Reken in groepjes en controleer je antwoord.
- Explanation: 8 x 9 = 72.

#### Slot q2

Authored slot ID: `seated-statue-slot-2`.

**Variant A**

- Variant ID: `seated-statue-2a`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Bij het zittende beeld liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?
- Visual data: not authored
- Choices: [21,28,35,42]
- Correct answer: 28
- hintMinnie: Zoek groepjes van hetzelfde aantal.
- hintMoose: Maak er eerst een keersom van.
- Explanation: 4 x 7 = 28.

**Variant B**

- Variant ID: `seated-statue-2b`
- Domain: math
- School band: E5-intended
- Family: story_multiplication
- Presentation: story
- Answer mode: open
- Prompt: Nebu tekent 5 vakken met 7 tekens per vak. Hoeveel tekens tekent hij?
- Visual data: not authored
- Choices: not authored
- Correct answer: 35
- hintMinnie: Zoek hoeveel groepjes er zijn.
- hintMoose: Vermenigvuldig het aantal vakken met het aantal tekens.
- Explanation: 5 x 7 = 35.

#### Slot q3

Authored slot ID: `seated-statue-slot-3`.

**Variant A**

- Variant ID: `seated-statue-3a`
- Domain: math
- School band: E5-intended
- Family: bare_division
- Presentation: bare
- Answer mode: open
- Prompt: 48 : 8 = ?
- Visual data: not authored
- Choices: not authored
- Correct answer: 6
- hintMinnie: Welke tafel hoort hierbij?
- hintMoose: Zoek welk getal keer de deler het totaal maakt.
- Explanation: 48 : 8 = 6, want 8 x 6 = 48.

**Variant B**

- Variant ID: `seated-statue-3b`
- Domain: math
- School band: E5-intended
- Family: story_division
- Presentation: story
- Answer mode: multipleChoice
- Prompt: Sven verdeelt 72 steentjes bij het zittende beeld in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?
- Visual data: not authored
- Choices: [8,9,10,11]
- Correct answer: 9
- hintMinnie: Verdeel het totaal in gelijke groepjes.
- hintMoose: Gebruik de omgekeerde keersom.
- Explanation: 72 : 8 = 9, want 8 x 9 = 72.

#### Slot q4

Authored slot ID: `seated-statue-slot-4`.

**Variant A**

- Variant ID: `seated-statue-4a`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Beeld","Beelt","Beeldt","Be-eld"]
- Correct answer: "Beeld"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Beeld is de juiste spelling.

**Variant B**

- Variant ID: `seated-statue-4b`
- Domain: math
- School band: E5-intended
- Family: spelling
- Presentation: bare
- Answer mode: multipleChoice
- Prompt: Welk woord is goed gespeld?
- Visual data: not authored
- Choices: ["Farao","Farau","Farrao","Fa-rao"]
- Correct answer: "Farao"
- hintMinnie: Lees het woord rustig van links naar rechts.
- hintMoose: Kijk naar de klanken en kies de spelling die klopt.
- Explanation: Farao is de juiste spelling.

## Legacy rune.questions

None. Every current level definition, including the developer fixture, was checked for the presence of `rune.questions`; none exists.

## Factual analysis

The following is descriptive analysis of the snapshot. Inactive challenges are included unless explicitly stated. Automated text classifications are review flags, not complete linguistic or pedagogical judgments.

### 1. Distribution versus canonical guidance

| Category | Answer mode | Guidance | All non-clock count | Actual % | Difference (percentage points) | Active-only % |
| --- | --- | --- | --- | --- | --- | --- |
| bare_multiplication | open | 25% | 172 | 22.63% | -2.37 | 22.60% |
| bare_multiplication | multipleChoice | 25% | 172 | 22.63% | -2.37 | 23.40% |
| story_multiplication | open | 10% | 80 | 10.53% | 0.53 | 10.58% |
| story_multiplication | multipleChoice | 10% | 80 | 10.53% | 0.53 | 10.42% |
| bare_division | open | 5% | 50 | 6.58% | 1.58 | 6.25% |
| bare_division | multipleChoice | 10% | 62 | 8.16% | -1.84 | 8.81% |
| story_division | open | 5% | 30 | 3.95% | -1.05 | 4.49% |
| story_division | multipleChoice | 5% | 48 | 6.32% | 1.32 | 5.93% |
| applied | all | 5% | 30 | 3.95% | -1.05 | 4.33% |
| other | all | 0% | 36 | 4.74% | 4.74 | 3.21% |

Denominator: 760 non-clock variants, including spelling. The guidance lists no spelling allocation; its 0% table entry means “not specified,” not a runtime prohibition. Applied math and spelling are separate to avoid silently calling spelling route/money practice. Targets are approximate authoring guidance, not enforced percentages.

### 2. Table-group distribution

| Group | Count | Share | Active-only count |
| --- | --- | --- | --- |
| Tables 2–5 | 210 | 30.26% | 176 |
| Tables 6–9 | 447 | 64.41% | 367 |
| Table 10 | 37 | 5.33% | 34 |
| Other / unknown | 0 | 0.00% | 0 |

Preferred-table share under the stated convention is 64.41% versus approximately 60% guidance. Explicit hint evidence: 456; equation-operand convention: 238; unknown: 0. Per-adventure scope is shown below, using manifest connectedFrom chains; menu/world enabled status is not used to exclude authored levels.

| Manifest adventure root | Math variants | Tables 6–9 | Share |
| --- | --- | --- | --- |
| LVL-0001 | 76 | 46 | 60.53% |
| LVL-0004 | 92 | 56 | 60.87% |
| LVL-0008 | 114 | 69 | 60.53% |
| LVL-0013 | 144 | 88 | 61.11% |
| LVL-0021 | 160 | 92 | 57.50% |
| LVL-0027 | 108 | 96 | 88.89% |

### 3–5. Answer mode, presentation and operation balance

| Dimension | Value | All variants | All share | Non-clock variants | Non-clock share |
| --- | --- | --- | --- | --- | --- |
| answer_mode | open | 362 | 41.90% | 362 | 47.63% |
| answer_mode | multipleChoice | 502 | 58.10% | 398 | 52.37% |
| presentation | bare | 556 | 64.35% | 492 | 64.74% |
| presentation | story | 308 | 35.65% | 268 | 35.26% |
| analysis_category | multiplication | 504 | 58.33% | 504 | 66.32% |
| analysis_category | division | 190 | 21.99% | 190 | 25.00% |
| analysis_category | applied | 30 | 3.47% | 30 | 3.95% |
| analysis_category | clock | 104 | 12.04% | 0 | 0.00% |
| analysis_category | other | 36 | 4.17% | 36 | 4.74% |

### 6. Clock coverage and time values

| Level/challenge | State | Clock slots | Clock variants | Other variants |
| --- | --- | --- | --- | --- |
| LVL-0003/shipCompass | active | 4 | 8 | 0 |
| LVL-0013/canalClock | active | 4 | 8 | 0 |
| LVL-0014/clockTower | active | 4 | 8 | 0 |
| LVL-0015/villageClock | active | 4 | 8 | 0 |
| LVL-0017/clockHouse | active | 4 | 8 | 0 |
| LVL-0019/harborClock | active | 4 | 8 | 0 |
| LVL-0023/waterClock | active | 4 | 8 | 0 |
| LVL-0024/flightControls | active | 4 | 8 | 0 |
| LVL-0025/pulleyPanel | active | 4 | 8 | 0 |
| LVL-0026/centralCodex | active | 4 | 8 | 0 |
| LVL-0026/designBoard | active | 4 | 8 | 0 |
| LVL-0028/tripodInstrument | active | 4 | 8 | 0 |
| LVL-0030/sundial | active | 4 | 8 | 0 |

| Minute value | Variants | Share of clocks |
| --- | --- | --- |
| 0 | 10 | 9.62% |
| 5 | 8 | 7.69% |
| 10 | 6 | 5.77% |
| 15 | 10 | 9.62% |
| 20 | 9 | 8.65% |
| 25 | 7 | 6.73% |
| 30 | 14 | 13.46% |
| 35 | 8 | 7.69% |
| 40 | 7 | 6.73% |
| 45 | 10 | 9.62% |
| 50 | 9 | 8.65% |
| 55 | 6 | 5.77% |

| Authored hour:minute | Variants | Authored correct answer(s) |
| --- | --- | --- |
| 01:10 | 1 | Tien over een |
| 01:15 | 1 | Kwart over één |
| 01:20 | 1 | Tien voor half twee |
| 01:25 | 1 | Vijf voor half twee |
| 01:30 | 2 | Half twee |
| 01:50 | 1 | Tien voor twee |
| 01:55 | 1 | Vijf voor twee |
| 02:00 | 1 | Twee uur |
| 02:15 | 1 | Kwart over twee |
| 02:20 | 2 | Tien voor half drie |
| 02:25 | 1 | Vijf voor half drie |
| 02:40 | 1 | Tien over half drie |
| 02:55 | 2 | Vijf voor drie |
| 03:00 | 4 | Drie uur |
| 03:10 | 1 | Tien over drie |
| 03:20 | 1 | Tien voor half vier |
| 03:25 | 1 | Vijf voor half vier |
| 03:30 | 1 | Half vier |
| 03:35 | 1 | Vijf over half vier |
| 03:45 | 1 | Kwart voor vier |
| 04:00 | 1 | Vier uur |
| 04:15 | 2 | Kwart over vier |
| 04:20 | 1 | Tien voor half vijf |
| 04:30 | 1 | Half vijf |
| 04:35 | 1 | Vijf over half vijf |
| 04:45 | 2 | Kwart voor vijf |
| 05:05 | 1 | Vijf over vijf |
| 05:15 | 2 | Kwart over vijf |
| 05:20 | 1 | Tien voor half zes |
| 05:40 | 3 | Tien over half zes |
| 05:50 | 1 | Tien voor zes |
| 06:00 | 1 | Zes uur |
| 06:05 | 2 | Vijf over zes |
| 06:15 | 3 | Kwart over zes |
| 06:25 | 1 | Vijf voor half zeven |
| 06:30 | 2 | Half zeven |
| 06:45 | 1 | Kwart voor zeven |
| 06:50 | 1 | Tien voor zeven |
| 07:20 | 1 | Tien voor half acht |
| 07:25 | 1 | Vijf voor half acht |
| 07:30 | 4 | Half acht |
| 07:35 | 1 | Vijf over half acht |
| 07:50 | 1 | Tien voor acht |
| 07:55 | 1 | Vijf voor acht |
| 08:10 | 2 | Tien over acht |
| 08:20 | 1 | Tien voor half negen |
| 08:30 | 2 | Half negen |
| 08:35 | 2 | Vijf over half negen |
| 08:45 | 2 | Kwart voor negen |
| 09:00 | 2 | Negen uur |
| 09:10 | 1 | Tien over negen |
| 09:25 | 1 | Vijf voor half tien |
| 09:35 | 1 | Vijf over half tien |
| 09:40 | 1 | Tien over half tien |
| 09:45 | 2 | Kwart voor tien |
| 10:05 | 1 | Vijf over tien |
| 10:25 | 1 | Vijf voor half elf |
| 10:30 | 1 | Half elf |
| 10:35 | 2 | Vijf over half elf |
| 10:40 | 1 | Tien over half elf |
| 10:45 | 1 | Kwart voor elf |
| 10:50 | 2 | Tien voor elf |
| 11:05 | 2 | Vijf over elf |
| 11:15 | 1 | Kwart over elf |
| 11:45 | 1 | Kwart voor twaalf |
| 11:50 | 1 | Tien voor twaalf |
| 11:55 | 2 | Vijf voor twaalf |
| 12:00 | 1 | Twaalf uur |
| 12:05 | 2 | Vijf over twaalf |
| 12:10 | 1 | Tien over twaalf |
| 12:20 | 1 | Tien voor half een |
| 12:30 | 1 | Half één |
| 12:40 | 1 | Tien over half een |
| 12:50 | 2 | Tien voor één; Tien voor een |

Digital hour:minute strings above are analysis keys only; the exported authored answers remain Dutch text. The hour is authored 1–12, with no AM/PM inference.

### 7. Repeated and near-duplicate prompts

106 exact prompt groups cover 545 variants (439 occurrences beyond the first). Exact prompt equality is not question equality: clock visuals, choices and answers may differ. No items were deduplicated.

| Exact authored prompt | Occurrences | Variant references |
| --- | --- | --- |
| Hoe laat is het? | 76 | LVL-0003/shipCompass/shipCompass-slot-1/shipCompass-1a; LVL-0003/shipCompass/shipCompass-slot-1/shipCompass-1b; LVL-0003/shipCompass/shipCompass-slot-2/shipCompass-2a; LVL-0003/shipCompass/shipCompass-slot-2/shipCompass-2b; LVL-0003/shipCompass/shipCompass-slot-3/shipCompass-3a; LVL-0003/shipCompass/shipCompass-slot-3/shipCompass-3b; LVL-0003/shipCompass/shipCompass-slot-4/shipCompass-4a; LVL-0003/shipCompass/shipCompass-slot-4/shipCompass-4b; LVL-0013/canalClock/canal-clock-slot-1/nl-clock-1a; LVL-0013/canalClock/canal-clock-slot-1/nl-clock-1b; LVL-0013/canalClock/canal-clock-slot-2/nl-clock-2a; LVL-0013/canalClock/canal-clock-slot-2/nl-clock-2b; LVL-0013/canalClock/canal-clock-slot-3/nl-clock-3a; LVL-0013/canalClock/canal-clock-slot-3/nl-clock-3b; LVL-0013/canalClock/canal-clock-slot-4/nl-clock-4a; LVL-0013/canalClock/canal-clock-slot-4/nl-clock-4b; LVL-0014/clockTower/clock-tower-slot-1/uk-clock-1a; LVL-0014/clockTower/clock-tower-slot-1/uk-clock-1b; LVL-0014/clockTower/clock-tower-slot-2/uk-clock-2a; LVL-0014/clockTower/clock-tower-slot-2/uk-clock-2b; LVL-0014/clockTower/clock-tower-slot-3/uk-clock-3a; LVL-0014/clockTower/clock-tower-slot-3/uk-clock-3b; LVL-0014/clockTower/clock-tower-slot-4/uk-clock-4a; LVL-0014/clockTower/clock-tower-slot-4/uk-clock-4b; LVL-0015/villageClock/village-clock-slot-1/fr-clock-1a; LVL-0015/villageClock/village-clock-slot-1/fr-clock-1b; LVL-0015/villageClock/village-clock-slot-2/fr-clock-2a; LVL-0015/villageClock/village-clock-slot-2/fr-clock-2b; LVL-0015/villageClock/village-clock-slot-3/fr-clock-3a; LVL-0015/villageClock/village-clock-slot-3/fr-clock-3b; LVL-0015/villageClock/village-clock-slot-4/fr-clock-4a; LVL-0015/villageClock/village-clock-slot-4/fr-clock-4b; LVL-0017/clockHouse/clock-house-slot-1/at-clock-1a; LVL-0017/clockHouse/clock-house-slot-1/at-clock-1b; LVL-0017/clockHouse/clock-house-slot-2/at-clock-2a; LVL-0017/clockHouse/clock-house-slot-2/at-clock-2b; LVL-0017/clockHouse/clock-house-slot-3/at-clock-3a; LVL-0017/clockHouse/clock-house-slot-3/at-clock-3b; LVL-0017/clockHouse/clock-house-slot-4/at-clock-4a; LVL-0017/clockHouse/clock-house-slot-4/at-clock-4b; LVL-0019/harborClock/harbor-clock-slot-1/se-clock-1a; LVL-0019/harborClock/harbor-clock-slot-1/se-clock-1b; LVL-0019/harborClock/harbor-clock-slot-2/se-clock-2a; LVL-0019/harborClock/harbor-clock-slot-2/se-clock-2b; LVL-0019/harborClock/harbor-clock-slot-3/se-clock-3a; LVL-0019/harborClock/harbor-clock-slot-3/se-clock-3b; LVL-0019/harborClock/harbor-clock-slot-4/se-clock-4a; LVL-0019/harborClock/harbor-clock-slot-4/se-clock-4b; LVL-0023/waterClock/water-clock-slot-1/water-clock-1a; LVL-0023/waterClock/water-clock-slot-2/water-clock-2a; LVL-0023/waterClock/water-clock-slot-3/water-clock-3a; LVL-0023/waterClock/water-clock-slot-4/water-clock-4a; LVL-0024/flightControls/flight-controls-slot-1/flight-controls-1a; LVL-0024/flightControls/flight-controls-slot-2/flight-controls-2a; LVL-0024/flightControls/flight-controls-slot-3/flight-controls-3a; LVL-0024/flightControls/flight-controls-slot-4/flight-controls-4a; LVL-0025/pulleyPanel/pulley-panel-slot-1/pulley-panel-1a; LVL-0025/pulleyPanel/pulley-panel-slot-2/pulley-panel-2a; LVL-0025/pulleyPanel/pulley-panel-slot-3/pulley-panel-3a; LVL-0025/pulleyPanel/pulley-panel-slot-4/pulley-panel-4a; LVL-0026/centralCodex/central-codex-slot-1/central-codex-1a; LVL-0026/centralCodex/central-codex-slot-2/central-codex-2a; LVL-0026/centralCodex/central-codex-slot-3/central-codex-3a; LVL-0026/centralCodex/central-codex-slot-4/central-codex-4a; LVL-0026/designBoard/design-board-slot-1/design-board-1a; LVL-0026/designBoard/design-board-slot-2/design-board-2a; LVL-0026/designBoard/design-board-slot-3/design-board-3a; LVL-0026/designBoard/design-board-slot-4/design-board-4a; LVL-0028/tripodInstrument/tripod-instrument-slot-1/tripod-instrument-1a; LVL-0028/tripodInstrument/tripod-instrument-slot-2/tripod-instrument-2a; LVL-0028/tripodInstrument/tripod-instrument-slot-3/tripod-instrument-3a; LVL-0028/tripodInstrument/tripod-instrument-slot-4/tripod-instrument-4a; LVL-0030/sundial/sundial-slot-1/sundial-1a; LVL-0030/sundial/sundial-slot-2/sundial-2a; LVL-0030/sundial/sundial-slot-3/sundial-3a; LVL-0030/sundial/sundial-slot-4/sundial-4a |
| Welk woord is goed gespeld? | 36 | LVL-0027/anubisStatue/anubis-statue-slot-4/anubis-statue-4a; LVL-0027/anubisStatue/anubis-statue-slot-4/anubis-statue-4b; LVL-0027/tabletCase/tablet-case-slot-4/tablet-case-4a; LVL-0027/tabletCase/tablet-case-slot-4/tablet-case-4b; LVL-0027/modelBoat/model-boat-slot-4/model-boat-4a; LVL-0027/modelBoat/model-boat-slot-4/model-boat-4b; LVL-0027/reliefPanel/relief-panel-slot-4/relief-panel-4a; LVL-0027/reliefPanel/relief-panel-slot-4/relief-panel-4b; LVL-0028/planningTable/planning-table-slot-4/planning-table-4a; LVL-0028/planningTable/planning-table-slot-4/planning-table-4b; LVL-0028/stoneSled/stone-sled-slot-4/stone-sled-4a; LVL-0028/stoneSled/stone-sled-slot-4/stone-sled-4b; LVL-0028/craneFrame/crane-frame-slot-4/crane-frame-4a; LVL-0028/craneFrame/crane-frame-slot-4/crane-frame-4b; LVL-0029/paintedRelief/painted-relief-slot-4/painted-relief-4a; LVL-0029/paintedRelief/painted-relief-slot-4/painted-relief-4b; LVL-0029/canopicJars/canopic-jars-slot-4/canopic-jars-4a; LVL-0029/canopicJars/canopic-jars-slot-4/canopic-jars-4b; LVL-0029/treasureChest/treasure-chest-slot-4/treasure-chest-4a; LVL-0029/treasureChest/treasure-chest-slot-4/treasure-chest-4b; LVL-0029/altarTable/altar-table-slot-4/altar-table-4a; LVL-0029/altarTable/altar-table-slot-4/altar-table-4b; LVL-0030/offeringTable/offering-table-slot-4/offering-table-4a; LVL-0030/offeringTable/offering-table-slot-4/offering-table-4b; LVL-0030/carvedRelief/carved-relief-slot-4/carved-relief-4a; LVL-0030/carvedRelief/carved-relief-slot-4/carved-relief-4b; LVL-0030/templePanel/temple-panel-slot-4/temple-panel-4a; LVL-0030/templePanel/temple-panel-slot-4/temple-panel-4b; LVL-0031/scarabDisplay/scarab-display-slot-4/scarab-display-4a; LVL-0031/scarabDisplay/scarab-display-slot-4/scarab-display-4b; LVL-0031/centralCase/central-case-slot-4/central-case-4a; LVL-0031/centralCase/central-case-slot-4/central-case-4b; LVL-0031/boatDisplay/boat-display-slot-4/boat-display-4a; LVL-0031/boatDisplay/boat-display-slot-4/boat-display-4b; LVL-0031/seatedStatue/seated-statue-slot-4/seated-statue-4a; LVL-0031/seatedStatue/seated-statue-slot-4/seated-statue-4b |
| Welke tijd staat op de klok? | 28 | LVL-0023/waterClock/water-clock-slot-1/water-clock-1b; LVL-0023/waterClock/water-clock-slot-2/water-clock-2b; LVL-0023/waterClock/water-clock-slot-3/water-clock-3b; LVL-0023/waterClock/water-clock-slot-4/water-clock-4b; LVL-0024/flightControls/flight-controls-slot-1/flight-controls-1b; LVL-0024/flightControls/flight-controls-slot-2/flight-controls-2b; LVL-0024/flightControls/flight-controls-slot-3/flight-controls-3b; LVL-0024/flightControls/flight-controls-slot-4/flight-controls-4b; LVL-0025/pulleyPanel/pulley-panel-slot-1/pulley-panel-1b; LVL-0025/pulleyPanel/pulley-panel-slot-2/pulley-panel-2b; LVL-0025/pulleyPanel/pulley-panel-slot-3/pulley-panel-3b; LVL-0025/pulleyPanel/pulley-panel-slot-4/pulley-panel-4b; LVL-0026/centralCodex/central-codex-slot-1/central-codex-1b; LVL-0026/centralCodex/central-codex-slot-2/central-codex-2b; LVL-0026/centralCodex/central-codex-slot-3/central-codex-3b; LVL-0026/centralCodex/central-codex-slot-4/central-codex-4b; LVL-0026/designBoard/design-board-slot-1/design-board-1b; LVL-0026/designBoard/design-board-slot-2/design-board-2b; LVL-0026/designBoard/design-board-slot-3/design-board-3b; LVL-0026/designBoard/design-board-slot-4/design-board-4b; LVL-0028/tripodInstrument/tripod-instrument-slot-1/tripod-instrument-1b; LVL-0028/tripodInstrument/tripod-instrument-slot-2/tripod-instrument-2b; LVL-0028/tripodInstrument/tripod-instrument-slot-3/tripod-instrument-3b; LVL-0028/tripodInstrument/tripod-instrument-slot-4/tripod-instrument-4b; LVL-0030/sundial/sundial-slot-1/sundial-1b; LVL-0030/sundial/sundial-slot-2/sundial-2b; LVL-0030/sundial/sundial-slot-3/sundial-3b; LVL-0030/sundial/sundial-slot-4/sundial-4b |
| 7 × 8 = ? | 11 | LVL-0002/mapTable/mapTable-slot-3/mapTable-3a; LVL-0004/nautilusLight/nautilusLight-slot-1/nautilusLight-1b; LVL-0006/divingSuit/divingSuit-slot-1/divingSuit-1b; LVL-0011/netherOrb/netherOrb-slot-3/netherOrb-3b; LVL-0012/enchantTable/enchantTable-slot-3/enchantTable-3b; LVL-0012/purplePortal/purplePortal-slot-3/purplePortal-3b; LVL-0013/windmill/windmill-slot-1/windmill-1a; LVL-0013/cheeseCart/cheese-cart-slot-1/cheese-cart-1b; LVL-0016/gelatoCart/gelato-cart-slot-1/gelato-cart-1b; LVL-0017/alpineFountain/alpine-fountain-slot-1/alpine-fountain-1b; LVL-0026/waterModel/water-model-slot-3/water-model-3a |
| 4 × 8 = ? | 9 | LVL-0001/zon/zon-slot-1/zon-1b; LVL-0003/harborMap/harborMap-slot-1/harborMap-1b; LVL-0003/mooringRope/mooringRope-slot-1/mooringRope-1b; LVL-0008/diamondSword/diamondSword-slot-2/diamondSword-2a; LVL-0009/openBook/openBook-slot-2/openBook-2a; LVL-0013/cheeseCart/cheese-cart-slot-4/cheese-cart-4a; LVL-0017/cableCar/cable-car-slot-4/cable-car-4a; LVL-0018/staveChurch/stave-church-slot-4/stave-church-4a; LVL-0018/vikingShip/viking-ship-slot-4/viking-ship-4a |
| 6 × 8 = ? | 8 | LVL-0001/steen/steen-slot-2/steen-2b; LVL-0002/mapTable/mapTable-slot-2/mapTable-2b; LVL-0007/escapeBoat/escapeBoat-slot-1/escapeBoat-1a; LVL-0012/enchantTable/enchantTable-slot-3/enchantTable-3a; LVL-0013/cheeseCart/cheese-cart-slot-1/cheese-cart-1a; LVL-0018/staveChurch/stave-church-slot-1/stave-church-1a; LVL-0018/vikingShip/viking-ship-slot-1/viking-ship-1a; LVL-0023/valveWheel/valve-wheel-slot-4/valve-wheel-4a |
| 9 × 6 = ? | 8 | LVL-0002/fireBowl/fireBowl-slot-1/fireBowl-1a; LVL-0008/creeperMask/creeperMask-slot-1/creeperMask-1b; LVL-0008/enderPortal/enderPortal-slot-1/enderPortal-1b; LVL-0010/woodenBoat/woodenBoat-slot-1/woodenBoat-1b; LVL-0013/windmill/windmill-slot-3/windmill-3b; LVL-0015/marketStall/market-stall-slot-3/market-stall-3b; LVL-0019/maypole/maypole-slot-3/maypole-3b; LVL-0025/pigmentTable/pigment-table-slot-3/pigment-table-3b |
| 5 × 5 = ? | 7 | LVL-0001/zon/zon-slot-3/zon-3b; LVL-0007/islandWheel/islandWheel-slot-2/islandWheel-2a; LVL-0009/worldMap/worldMap-slot-4/worldMap-4a; LVL-0011/netherMap/netherMap-slot-4/netherMap-4a; LVL-0016/romanFountain/roman-fountain-slot-2/roman-fountain-2a; LVL-0018/staveChurch/stave-church-slot-2/stave-church-2a; LVL-0025/pigmentTable/pigment-table-slot-1/pigment-table-1b |
| 8 × 8 = ? | 7 | LVL-0001/steen/steen-slot-3/steen-3b; LVL-0006/divingSuit/divingSuit-slot-2/divingSuit-2a; LVL-0006/miniSub/miniSub-slot-2/miniSub-2a; LVL-0009/openBook/openBook-slot-4/openBook-4a; LVL-0017/alpineFountain/alpine-fountain-slot-2/alpine-fountain-2a; LVL-0020/deerStatue/deer-statue-slot-2/deer-statue-2a; LVL-0024/counterweights/counterweights-slot-1/counterweights-1a |
| 6 × 3 = ? | 7 | LVL-0003/mooringRope/mooringRope-slot-1/mooringRope-1a; LVL-0008/diamondSword/diamondSword-slot-1/diamondSword-1b; LVL-0009/openBook/openBook-slot-1/openBook-1b; LVL-0010/sandCastle/sandCastle-slot-1/sandCastle-1b; LVL-0014/telescope/telescope-slot-3/telescope-3b; LVL-0020/deerStatue/deer-statue-slot-3/deer-statue-3b; LVL-0025/pigmentTable/pigment-table-slot-2/pigment-table-2a |
| 48 : 8 = ? | 7 | LVL-0006/controlPanel/controlPanel-slot-1/controlPanel-1a; LVL-0022/bridgeModel/bridge-model-slot-4/bridge-model-4b; LVL-0027/tabletCase/tablet-case-slot-3/tablet-case-3a; LVL-0028/stoneSled/stone-sled-slot-3/stone-sled-3a; LVL-0029/treasureChest/treasure-chest-slot-3/treasure-chest-3a; LVL-0030/templePanel/temple-panel-slot-3/temple-panel-3a; LVL-0031/seatedStatue/seated-statue-slot-3/seated-statue-3a |
| 2 × 4 = ? | 6 | LVL-0001/zon/zon-slot-2/zon-2b; LVL-0003/mooringRope/mooringRope-slot-2/mooringRope-2b; LVL-0009/crystalCase/crystalCase-slot-3/crystalCase-3a; LVL-0012/homeMap/homeMap-slot-3/homeMap-3a; LVL-0019/maypole/maypole-slot-1/maypole-1a; LVL-0022/wellWinch/well-winch-slot-4/well-winch-4b |
| 9 × 7 = ? | 6 | LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4b; LVL-0002/shipModel/shipModel-slot-4/shipModel-4b; LVL-0006/miniSub/miniSub-slot-3/miniSub-3a; LVL-0008/diamondSword/diamondSword-slot-1/diamondSword-1a; LVL-0016/gelatoCart/gelato-cart-slot-3/gelato-cart-3a; LVL-0026/wingConstruction/wing-construction-slot-4/wing-construction-4b |
| 7 × 4 = ? | 6 | LVL-0002/shipModel/shipModel-slot-1/shipModel-1a; LVL-0005/captainChart/captainChart-slot-3/captainChart-3b; LVL-0005/logbookDesk/logbookDesk-slot-3/logbookDesk-3b; LVL-0014/postbox/postbox-slot-3/postbox-3b; LVL-0016/colosseum/colosseum-slot-3/colosseum-3b; LVL-0024/wingRack/wing-rack-slot-4/wing-rack-4b |
| 5 × 6 = ? | 6 | LVL-0002/shipModel/shipModel-slot-3/shipModel-3a; LVL-0007/escapeBoat/escapeBoat-slot-1/escapeBoat-1b; LVL-0008/enderPortal/enderPortal-slot-3/enderPortal-3b; LVL-0013/windmill/windmill-slot-1/windmill-1b; LVL-0019/dalaHorse/dala-horse-slot-1/dala-horse-1b; LVL-0023/valveWheel/valve-wheel-slot-1/valve-wheel-1b |
| 5 × 3 = ? | 6 | LVL-0003/harborMap/harborMap-slot-4/harborMap-4b; LVL-0005/mainPorthole/mainPorthole-slot-3/mainPorthole-3a; LVL-0007/islandWheel/islandWheel-slot-3/islandWheel-3a; LVL-0015/marketStall/market-stall-slot-3/market-stall-3a; LVL-0019/dalaHorse/dala-horse-slot-3/dala-horse-3a; LVL-0022/measuringTable/measuring-table-slot-3/measuring-table-3a |
| 63 : 9 = ? | 6 | LVL-0004/harborMap/harborMap-slot-1/harborMap-1a; LVL-0021/engineeringTable/engineering-table-slot-3/engineering-table-3b; LVL-0027/reliefPanel/relief-panel-slot-3/relief-panel-3a; LVL-0029/paintedRelief/painted-relief-slot-3/painted-relief-3a; LVL-0030/offeringTable/offering-table-slot-3/offering-table-3a; LVL-0031/centralCase/central-case-slot-3/central-case-3a |
| 6 × 7 = ? | 6 | LVL-0006/controlPanel/controlPanel-slot-1/controlPanel-1b; LVL-0007/islandWheel/islandWheel-slot-1/islandWheel-1b; LVL-0018/lighthouse/lighthouse-slot-1/lighthouse-1b; LVL-0020/mapBoard/map-board-slot-1/map-board-1b; LVL-0020/telescope/telescope-slot-1/telescope-1b; LVL-0026/wingConstruction/wing-construction-slot-1/wing-construction-1a |
| 7 × 6 = ? | 6 | LVL-0007/escapeBoat/escapeBoat-slot-2/escapeBoat-2b; LVL-0009/openBook/openBook-slot-4/openBook-4b; LVL-0015/fountain/fountain-slot-2/fountain-2b; LVL-0016/colosseum/colosseum-slot-2/colosseum-2b; LVL-0018/staveChurch/stave-church-slot-2/stave-church-2b; LVL-0025/pigmentTable/pigment-table-slot-2/pigment-table-2b |
| 4 × 7 = ? | 6 | LVL-0007/escapeBoat/escapeBoat-slot-4/escapeBoat-4b; LVL-0012/purplePortal/purplePortal-slot-2/purplePortal-2b; LVL-0015/marketStall/market-stall-slot-4/market-stall-4b; LVL-0018/lighthouse/lighthouse-slot-4/lighthouse-4b; LVL-0018/vikingShip/viking-ship-slot-4/viking-ship-4b; LVL-0026/waterModel/water-model-slot-1/water-model-1b |
| 5 × 7 = ? | 6 | LVL-0007/islandMap/islandMap-slot-1/islandMap-1a; LVL-0010/sandCastle/sandCastle-slot-3/sandCastle-3a; LVL-0015/marketStall/market-stall-slot-1/market-stall-1a; LVL-0016/colosseum/colosseum-slot-1/colosseum-1a; LVL-0017/alpineFountain/alpine-fountain-slot-1/alpine-fountain-1a; LVL-0026/waterModel/water-model-slot-2/water-model-2a |
| 5 × 10 = ? | 5 | LVL-0001/zon/zon-slot-1/zon-1a; LVL-0004/harborMap/harborMap-slot-3/harborMap-3b; LVL-0007/islandMap/islandMap-slot-3/islandMap-3b; LVL-0018/staveChurch/stave-church-slot-3/stave-church-3b; LVL-0020/telescope/telescope-slot-3/telescope-3b |
| 8 × 7 = ? | 5 | LVL-0001/zon/zon-slot-4/zon-4a; LVL-0003/harborMap/harborMap-slot-4/harborMap-4a; LVL-0008/diamondSword/diamondSword-slot-4/diamondSword-4b; LVL-0010/treasureMap/treasureMap-slot-4/treasureMap-4b; LVL-0026/opticalTable/optical-table-slot-2/optical-table-2a |
| 6 × 2 = ? | 5 | LVL-0001/wind/wind-slot-1/wind-1b; LVL-0007/islandMap/islandMap-slot-4/islandMap-4a; LVL-0010/treasureMap/treasureMap-slot-2/treasureMap-2a; LVL-0012/purplePortal/purplePortal-slot-2/purplePortal-2a; LVL-0024/wingRack/wing-rack-slot-2/wing-rack-2b |
| 9 × 9 = ? | 5 | LVL-0002/fireBowl/fireBowl-slot-3/fireBowl-3b; LVL-0003/gateShield/gateShield-slot-3/gateShield-3b; LVL-0012/enchantTable/enchantTable-slot-4/enchantTable-4a; LVL-0017/cableCar/cable-car-slot-2/cable-car-2a; LVL-0021/mechanicalModel/mechanical-model-slot-2/mechanical-model-2a |
| 9 × 4 = ? | 5 | LVL-0002/shipModel/shipModel-slot-2/shipModel-2a; LVL-0005/mainPorthole/mainPorthole-slot-4/mainPorthole-4b; LVL-0012/homeMap/homeMap-slot-2/homeMap-2b; LVL-0018/staveChurch/stave-church-slot-4/stave-church-4b; LVL-0026/wingConstruction/wing-construction-slot-2/wing-construction-2b |
| 2 × 3 = ? | 5 | LVL-0003/harborMap/harborMap-slot-3/harborMap-3a; LVL-0007/islandMap/islandMap-slot-1/islandMap-1b; LVL-0015/fountain/fountain-slot-1/fountain-1b; LVL-0019/maypole/maypole-slot-1/maypole-1b; LVL-0021/centralCodex/central-codex-slot-2/central-codex-2a |
| 9 × 8 = ? | 5 | LVL-0003/gateShield/gateShield-slot-4/gateShield-4a; LVL-0004/brassTelescope/brassTelescope-slot-2/brassTelescope-2b; LVL-0015/marketStall/market-stall-slot-2/market-stall-2b; LVL-0019/dalaHorse/dala-horse-slot-2/dala-horse-2b; LVL-0026/opticalTable/optical-table-slot-2/optical-table-2b |
| 7 × 7 = ? | 5 | LVL-0004/harborMap/harborMap-slot-2/harborMap-2a; LVL-0008/enderPortal/enderPortal-slot-4/enderPortal-4a; LVL-0009/crystalCase/crystalCase-slot-4/crystalCase-4a; LVL-0019/maypole/maypole-slot-2/maypole-2a; LVL-0026/opticalTable/optical-table-slot-1/optical-table-1b |
| 5 × 9 = ? | 5 | LVL-0005/captainChart/captainChart-slot-4/captainChart-4a; LVL-0005/logbookDesk/logbookDesk-slot-4/logbookDesk-4a; LVL-0007/escapeBoat/escapeBoat-slot-4/escapeBoat-4a; LVL-0016/romanFountain/roman-fountain-slot-4/roman-fountain-4a; LVL-0020/deerStatue/deer-statue-slot-4/deer-statue-4a |
| 3 × 3 = ? | 5 | LVL-0008/diamondSword/diamondSword-slot-4/diamondSword-4a; LVL-0008/creeperMask/creeperMask-slot-4/creeperMask-4a; LVL-0014/telescope/telescope-slot-2/telescope-2a; LVL-0016/gelatoCart/gelato-cart-slot-2/gelato-cart-2a; LVL-0021/engineeringTable/engineering-table-slot-2/engineering-table-2b |
| 6 × 4 = ? | 5 | LVL-0010/sandCastle/sandCastle-slot-1/sandCastle-1a; LVL-0011/potionTable/potionTable-slot-1/potionTable-1a; LVL-0012/homeMap/homeMap-slot-1/homeMap-1a; LVL-0012/purplePortal/purplePortal-slot-1/purplePortal-1a; LVL-0022/measuringTable/measuring-table-slot-3/measuring-table-3b |
| 42 : 7 = ? | 5 | LVL-0021/opticsTable/optics-table-slot-3/optics-table-3b; LVL-0027/anubisStatue/anubis-statue-slot-3/anubis-statue-3a; LVL-0028/planningTable/planning-table-slot-3/planning-table-3a; LVL-0030/carvedRelief/carved-relief-slot-3/carved-relief-3a; LVL-0031/boatDisplay/boat-display-slot-3/boat-display-3a |
| 7 x 8 = ? | 5 | LVL-0027/anubisStatue/anubis-statue-slot-1/anubis-statue-1b; LVL-0028/planningTable/planning-table-slot-1/planning-table-1b; LVL-0029/canopicJars/canopic-jars-slot-1/canopic-jars-1b; LVL-0030/carvedRelief/carved-relief-slot-1/carved-relief-1b; LVL-0031/boatDisplay/boat-display-slot-1/boat-display-1b |
| Nebu tekent 4 vakken met 6 tekens per vak. Hoeveel tekens tekent hij? | 5 | LVL-0027/anubisStatue/anubis-statue-slot-2/anubis-statue-2b; LVL-0028/planningTable/planning-table-slot-2/planning-table-2b; LVL-0029/canopicJars/canopic-jars-slot-2/canopic-jars-2b; LVL-0030/carvedRelief/carved-relief-slot-2/carved-relief-2b; LVL-0031/boatDisplay/boat-display-slot-2/boat-display-2b |
| 7 x 5 = ? | 5 | LVL-0027/tabletCase/tablet-case-slot-1/tablet-case-1a; LVL-0028/stoneSled/stone-sled-slot-1/stone-sled-1a; LVL-0029/treasureChest/treasure-chest-slot-1/treasure-chest-1a; LVL-0030/templePanel/temple-panel-slot-1/temple-panel-1a; LVL-0031/seatedStatue/seated-statue-slot-1/seated-statue-1a |
| Nebu tekent 5 vakken met 7 tekens per vak. Hoeveel tekens tekent hij? | 5 | LVL-0027/tabletCase/tablet-case-slot-2/tablet-case-2b; LVL-0028/stoneSled/stone-sled-slot-2/stone-sled-2b; LVL-0029/treasureChest/treasure-chest-slot-2/treasure-chest-2b; LVL-0030/templePanel/temple-panel-slot-2/temple-panel-2b; LVL-0031/seatedStatue/seated-statue-slot-2/seated-statue-2b |
| 2 × 9 = ? | 4 | LVL-0001/steen/steen-slot-4/steen-4a; LVL-0007/islandMap/islandMap-slot-2/islandMap-2b; LVL-0009/worldMap/worldMap-slot-4/worldMap-4b; LVL-0023/paddleWheel/paddle-wheel-slot-1/paddle-wheel-1a |
| 3 × 6 = ? | 4 | LVL-0002/shieldWall/shieldWall-slot-2/shieldWall-2a; LVL-0005/captainChart/captainChart-slot-4/captainChart-4b; LVL-0013/cheeseCart/cheese-cart-slot-4/cheese-cart-4b; LVL-0026/waterModel/water-model-slot-1/water-model-1a |
| 7 × 9 = ? | 4 | LVL-0002/shieldWall/shieldWall-slot-2/shieldWall-2b; LVL-0003/gateShield/gateShield-slot-2/gateShield-2b; LVL-0016/gelatoCart/gelato-cart-slot-1/gelato-cart-1a; LVL-0023/valveWheel/valve-wheel-slot-4/valve-wheel-4b |
| 4 × 3 = ? | 4 | LVL-0002/mapTable/mapTable-slot-4/mapTable-4a; LVL-0004/nautilusLight/nautilusLight-slot-2/nautilusLight-2b; LVL-0006/miniSub/miniSub-slot-2/miniSub-2b; LVL-0021/engineeringTable/engineering-table-slot-3/engineering-table-3a |
| 27 : 9 = ? | 4 | LVL-0002/mapTable/mapTable-slot-4/mapTable-4b; LVL-0008/creeperMask/creeperMask-slot-1/creeperMask-1a; LVL-0011/netherMap/netherMap-slot-1/netherMap-1a; LVL-0024/wingFrame/wing-frame-slot-2/wing-frame-2b |
| 42 : 6 = ? | 4 | LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4a; LVL-0005/logbookDesk/logbookDesk-slot-2/logbookDesk-2b; LVL-0014/telescope/telescope-slot-2/telescope-2b; LVL-0023/lockChambers/lock-chambers-slot-1/lock-chambers-1a |
| 5 × 4 = ? | 4 | LVL-0002/shipModel/shipModel-slot-4/shipModel-4a; LVL-0010/woodenBoat/woodenBoat-slot-4/woodenBoat-4b; LVL-0012/homeMap/homeMap-slot-4/homeMap-4b; LVL-0025/geometricFloor/geometric-floor-slot-1/geometric-floor-1a |
| 2 × 7 = ? | 4 | LVL-0003/harborMap/harborMap-slot-1/harborMap-1a; LVL-0007/escapeBoat/escapeBoat-slot-3/escapeBoat-3b; LVL-0009/worldMap/worldMap-slot-1/worldMap-1b; LVL-0015/fountain/fountain-slot-3/fountain-3b |
| 5 × 8 = ? | 4 | LVL-0003/gateShield/gateShield-slot-2/gateShield-2a; LVL-0009/worldMap/worldMap-slot-2/worldMap-2b; LVL-0009/crystalCase/crystalCase-slot-2/crystalCase-2b; LVL-0013/windmill/windmill-slot-4/windmill-4b |
| 63 : 7 = ? | 4 | LVL-0004/harborMap/harborMap-slot-3/harborMap-3a; LVL-0005/captainChart/captainChart-slot-3/captainChart-3a; LVL-0020/mapBoard/map-board-slot-3/map-board-3a; LVL-0023/lockChambers/lock-chambers-slot-3/lock-chambers-3b |
| 4 × 6 = ? | 4 | LVL-0004/brassTelescope/brassTelescope-slot-1/brassTelescope-1a; LVL-0007/islandWheel/islandWheel-slot-1/islandWheel-1a; LVL-0010/woodenBoat/woodenBoat-slot-3/woodenBoat-3a; LVL-0016/romanFountain/roman-fountain-slot-1/roman-fountain-1a |
| 3 × 4 = ? | 4 | LVL-0004/brassTelescope/brassTelescope-slot-1/brassTelescope-1b; LVL-0005/captainChart/captainChart-slot-1/captainChart-1b; LVL-0010/treasureMap/treasureMap-slot-3/treasureMap-3b; LVL-0018/vikingShip/viking-ship-slot-1/viking-ship-1b |
| 3 × 7 = ? | 4 | LVL-0004/nautilusLight/nautilusLight-slot-4/nautilusLight-4a; LVL-0006/divingSuit/divingSuit-slot-4/divingSuit-4a; LVL-0011/netherMap/netherMap-slot-2/netherMap-2a; LVL-0025/geometricFloor/geometric-floor-slot-4/geometric-floor-4b |
| 36 : 9 = ? | 4 | LVL-0006/miniSub/miniSub-slot-3/miniSub-3b; LVL-0012/homeMap/homeMap-slot-1/homeMap-1b; LVL-0012/purplePortal/purplePortal-slot-1/purplePortal-1b; LVL-0023/waterLevelPost/water-level-post-slot-3/water-level-post-3a |
| 8 × 6 = ? | 4 | LVL-0009/openBook/openBook-slot-1/openBook-1a; LVL-0012/enchantTable/enchantTable-slot-1/enchantTable-1a; LVL-0013/cheeseCart/cheese-cart-slot-3/cheese-cart-3a; LVL-0026/wingConstruction/wing-construction-slot-4/wing-construction-4a |
| 2 × 10 = ? | 4 | LVL-0010/treasureMap/treasureMap-slot-4/treasureMap-4a; LVL-0011/netherOrb/netherOrb-slot-4/netherOrb-4a; LVL-0020/telescope/telescope-slot-2/telescope-2a; LVL-0026/waterModel/water-model-slot-4/water-model-4b |
| 56 : 7 = ? | 4 | LVL-0011/netherOrb/netherOrb-slot-4/netherOrb-4b; LVL-0028/craneFrame/crane-frame-slot-3/crane-frame-3a; LVL-0029/altarTable/altar-table-slot-3/altar-table-3a; LVL-0031/scarabDisplay/scarab-display-slot-3/scarab-display-3a |
| 8 x 6 = ? | 4 | LVL-0027/modelBoat/model-boat-slot-1/model-boat-1a; LVL-0028/craneFrame/crane-frame-slot-1/crane-frame-1a; LVL-0029/altarTable/altar-table-slot-1/altar-table-1a; LVL-0031/scarabDisplay/scarab-display-slot-1/scarab-display-1a |
| 9 x 5 = ? | 4 | LVL-0027/modelBoat/model-boat-slot-1/model-boat-1b; LVL-0028/craneFrame/crane-frame-slot-1/crane-frame-1b; LVL-0029/altarTable/altar-table-slot-1/altar-table-1b; LVL-0031/scarabDisplay/scarab-display-slot-1/scarab-display-1b |
| Nebu tekent 6 vakken met 8 tekens per vak. Hoeveel tekens tekent hij? | 4 | LVL-0027/modelBoat/model-boat-slot-2/model-boat-2b; LVL-0028/craneFrame/crane-frame-slot-2/crane-frame-2b; LVL-0029/altarTable/altar-table-slot-2/altar-table-2b; LVL-0031/scarabDisplay/scarab-display-slot-2/scarab-display-2b |
| Nebu tekent 7 vakken met 9 tekens per vak. Hoeveel tekens tekent hij? | 4 | LVL-0027/reliefPanel/relief-panel-slot-2/relief-panel-2b; LVL-0029/paintedRelief/painted-relief-slot-2/painted-relief-2b; LVL-0030/offeringTable/offering-table-slot-2/offering-table-2b; LVL-0031/centralCase/central-case-slot-2/central-case-2b |
| 7 × 10 = ? | 3 | LVL-0001/steen/steen-slot-2/steen-2a; LVL-0016/gelatoCart/gelato-cart-slot-4/gelato-cart-4b; LVL-0026/opticalTable/optical-table-slot-3/optical-table-3b |
| 20 : 5 = ? | 3 | LVL-0001/steen/steen-slot-3/steen-3a; LVL-0015/marketStall/market-stall-slot-1/market-stall-1b; LVL-0022/measuringTable/measuring-table-slot-4/measuring-table-4a |
| 24 : 6 = ? | 3 | LVL-0001/wind/wind-slot-2/wind-2b; LVL-0014/telescope/telescope-slot-1/telescope-1a; LVL-0021/opticsTable/optics-table-slot-2/optics-table-2a |
| 18 : 3 = ? | 3 | LVL-0002/shieldWall/shieldWall-slot-1/shieldWall-1a; LVL-0017/cableCar/cable-car-slot-3/cable-car-3b; LVL-0029/canopicJars/canopic-jars-slot-3/canopic-jars-3a |
| 7 × 3 = ? | 3 | LVL-0002/shipModel/shipModel-slot-1/shipModel-1b; LVL-0012/enchantTable/enchantTable-slot-2/enchantTable-2a; LVL-0026/wingConstruction/wing-construction-slot-3/wing-construction-3b |
| 2 × 5 = ? | 3 | LVL-0004/harborMap/harborMap-slot-4/harborMap-4b; LVL-0017/alpineFountain/alpine-fountain-slot-4/alpine-fountain-4b; LVL-0025/pigmentTable/pigment-table-slot-4/pigment-table-4a |
| 2 × 8 = ? | 3 | LVL-0004/brassTelescope/brassTelescope-slot-3/brassTelescope-3a; LVL-0011/netherOrb/netherOrb-slot-1/netherOrb-1a; LVL-0018/lighthouse/lighthouse-slot-3/lighthouse-3a |
| 64 : 8 = ? | 3 | LVL-0004/nautilusLight/nautilusLight-slot-2/nautilusLight-2a; LVL-0010/sandCastle/sandCastle-slot-4/sandCastle-4a; LVL-0024/counterweights/counterweights-slot-4/counterweights-4a |
| 45 : 5 = ? | 3 | LVL-0005/mainPorthole/mainPorthole-slot-4/mainPorthole-4a; LVL-0008/creeperMask/creeperMask-slot-2/creeperMask-2a; LVL-0009/worldMap/worldMap-slot-2/worldMap-2a |
| 4 × 5 = ? | 3 | LVL-0005/logbookDesk/logbookDesk-slot-1/logbookDesk-1b; LVL-0006/miniSub/miniSub-slot-1/miniSub-1b; LVL-0023/valveWheel/valve-wheel-slot-1/valve-wheel-1a |
| 9 × 3 = ? | 3 | LVL-0006/divingSuit/divingSuit-slot-1/divingSuit-1a; LVL-0009/worldMap/worldMap-slot-3/worldMap-3a; LVL-0023/lockChambers/lock-chambers-slot-3/lock-chambers-3a |
| 6 × 9 = ? | 3 | LVL-0006/miniSub/miniSub-slot-4/miniSub-4b; LVL-0007/islandWheel/islandWheel-slot-4/islandWheel-4b; LVL-0026/waterModel/water-model-slot-2/water-model-2b |
| 16 : 8 = ? | 3 | LVL-0007/escapeBoat/escapeBoat-slot-3/escapeBoat-3a; LVL-0007/islandMap/islandMap-slot-3/islandMap-3a; LVL-0017/alpineFountain/alpine-fountain-slot-3/alpine-fountain-3a |
| 3 × 2 = ? | 3 | LVL-0008/creeperMask/creeperMask-slot-4/creeperMask-4b; LVL-0012/enchantTable/enchantTable-slot-4/enchantTable-4b; LVL-0025/perspectiveFrame/perspective-frame-slot-4/perspective-frame-4a |
| 3 × 9 = ? | 3 | LVL-0008/enderPortal/enderPortal-slot-1/enderPortal-1a; LVL-0016/colosseum/colosseum-slot-3/colosseum-3a; LVL-0018/vikingShip/viking-ship-slot-3/viking-ship-3a |
| 3 × 8 = ? | 3 | LVL-0010/treasureMap/treasureMap-slot-1/treasureMap-1b; LVL-0019/dalaHorse/dala-horse-slot-3/dala-horse-3b; LVL-0023/waterLevelPost/water-level-post-slot-1/water-level-post-1a |
| 8 × 4 = ? | 3 | LVL-0011/potionTable/potionTable-slot-2/potionTable-2a; LVL-0018/lighthouse/lighthouse-slot-4/lighthouse-4a; LVL-0025/pigmentTable/pigment-table-slot-3/pigment-table-3a |
| 8 × 3 = ? | 3 | LVL-0012/enchantTable/enchantTable-slot-2/enchantTable-2b; LVL-0014/postbox/postbox-slot-4/postbox-4b; LVL-0026/wingConstruction/wing-construction-slot-2/wing-construction-2a |
| 6 x 6 = ? | 3 | LVL-0027/reliefPanel/relief-panel-slot-1/relief-panel-1b; LVL-0029/paintedRelief/painted-relief-slot-1/painted-relief-1b; LVL-0031/centralCase/central-case-slot-1/central-case-1b |
| 6 x 4 = ? | 3 | LVL-0029/canopicJars/canopic-jars-slot-1/canopic-jars-1a; LVL-0030/carvedRelief/carved-relief-slot-1/carved-relief-1a; LVL-0031/boatDisplay/boat-display-slot-1/boat-display-1a |
| 8 x 9 = ? | 3 | LVL-0029/treasureChest/treasure-chest-slot-1/treasure-chest-1b; LVL-0030/templePanel/temple-panel-slot-1/temple-panel-1b; LVL-0031/seatedStatue/seated-statue-slot-1/seated-statue-1b |
| 8 × 9 = ? | 2 | LVL-0001/zon/zon-slot-3/zon-3a; LVL-0021/mechanicalModel/mechanical-model-slot-1/mechanical-model-1b |
| 2 × 6 = ? | 2 | LVL-0001/steen/steen-slot-1/steen-1b; LVL-0025/geometricFloor/geometric-floor-slot-3/geometric-floor-3b |
| 14 : 7 = ? | 2 | LVL-0001/wind/wind-slot-1/wind-1a; LVL-0017/alpineFountain/alpine-fountain-slot-3/alpine-fountain-3b |
| 32 : 4 = ? | 2 | LVL-0002/mapTable/mapTable-slot-1/mapTable-1b; LVL-0020/telescope/telescope-slot-4/telescope-4a |
| 9 × 2 = ? | 2 | LVL-0002/fireBowl/fireBowl-slot-3/fireBowl-3a; LVL-0022/wellWinch/well-winch-slot-4/well-winch-4a |
| 3 × 5 = ? | 2 | LVL-0003/harborMap/harborMap-slot-2/harborMap-2b; LVL-0014/postbox/postbox-slot-1/postbox-1a |
| 32 : 8 = ? | 2 | LVL-0003/gateShield/gateShield-slot-1/gateShield-1b; LVL-0023/paddleWheel/paddle-wheel-slot-2/paddle-wheel-2a |
| 49 : 7 = ? | 2 | LVL-0004/brassTelescope/brassTelescope-slot-2/brassTelescope-2a; LVL-0024/counterweights/counterweights-slot-1/counterweights-1b |
| 4 × 4 = ? | 2 | LVL-0005/mainPorthole/mainPorthole-slot-2/mainPorthole-2a; LVL-0025/perspectiveFrame/perspective-frame-slot-4/perspective-frame-4b |
| 27 : 3 = ? | 2 | LVL-0006/miniSub/miniSub-slot-1/miniSub-1a; LVL-0009/openBook/openBook-slot-3/openBook-3a |
| 18 : 9 = ? | 2 | LVL-0006/controlPanel/controlPanel-slot-2/controlPanel-2b; LVL-0023/valveWheel/valve-wheel-slot-3/valve-wheel-3b |
| 6 × 6 = ? | 2 | LVL-0007/escapeBoat/escapeBoat-slot-2/escapeBoat-2a; LVL-0026/opticalTable/optical-table-slot-1/optical-table-1a |
| 2 × 2 = ? | 2 | LVL-0007/islandMap/islandMap-slot-2/islandMap-2a; LVL-0015/fountain/fountain-slot-2/fountain-2a |
| 70 : 10 = ? | 2 | LVL-0008/diamondSword/diamondSword-slot-2/diamondSword-2b; LVL-0015/fountain/fountain-slot-4/fountain-4b |
| 8 × 5 = ? | 2 | LVL-0009/crystalCase/crystalCase-slot-1/crystalCase-1b; LVL-0025/geometricFloor/geometric-floor-slot-2/geometric-floor-2b |
| 21 : 7 = ? | 2 | LVL-0010/woodenBoat/woodenBoat-slot-2/woodenBoat-2a; LVL-0012/homeMap/homeMap-slot-2/homeMap-2a |
| 28 : 7 = ? | 2 | LVL-0011/potionTable/potionTable-slot-2/potionTable-2b; LVL-0020/telescope/telescope-slot-4/telescope-4b |
| 5 × 2 = ? | 2 | LVL-0011/netherOrb/netherOrb-slot-1/netherOrb-1b; LVL-0024/wingFrame/wing-frame-slot-4/wing-frame-4b |
| 36 : 6 = ? | 2 | LVL-0012/purplePortal/purplePortal-slot-4/purplePortal-4a; LVL-0021/centralCodex/central-codex-slot-4/central-codex-4b |
| 6 × 10 = ? | 2 | LVL-0013/windmill/windmill-slot-4/windmill-4a; LVL-0026/opticalTable/optical-table-slot-3/optical-table-3a |
| 6 × 5 = ? | 2 | LVL-0014/postbox/postbox-slot-2/postbox-2b; LVL-0025/geometricFloor/geometric-floor-slot-1/geometric-floor-1b |
| 7 × 5 = ? | 2 | LVL-0014/postbox/postbox-slot-3/postbox-3a; LVL-0025/geometricFloor/geometric-floor-slot-2/geometric-floor-2a |
| 54 : 9 = ? | 2 | LVL-0016/colosseum/colosseum-slot-4/colosseum-4b; LVL-0022/wellWinch/well-winch-slot-2/well-winch-2a |
| 30 : 5 = ? | 2 | LVL-0016/gelatoCart/gelato-cart-slot-2/gelato-cart-2b; LVL-0018/lighthouse/lighthouse-slot-2/lighthouse-2b |
| 8 × 10 = ? | 2 | LVL-0017/cableCar/cable-car-slot-1/cable-car-1a; LVL-0026/waterModel/water-model-slot-3/water-model-3b |
| 14 : 2 = ? | 2 | LVL-0020/mapBoard/map-board-slot-4/map-board-4b; LVL-0021/mechanicalModel/mechanical-model-slot-2/mechanical-model-2b |
| 9 x 7 = ? | 2 | LVL-0027/reliefPanel/relief-panel-slot-1/relief-panel-1a; LVL-0030/offeringTable/offering-table-slot-1/offering-table-1a |

Near-duplicate screen: lower-case, whitespace normalization, digit runs replaced with #, ×/* normalized to x. 44 groups contain more than one distinct exact prompt. This catches numeric templates, not all semantic paraphrases; it can overlap exact groups above.

| Normalized template (derived) | Occurrences | Distinct prompts | Variant references |
| --- | --- | --- | --- |
| # x # = ? | 344 | 111 | LVL-0001/zon/zon-slot-1/zon-1a; LVL-0001/zon/zon-slot-1/zon-1b; LVL-0001/zon/zon-slot-2/zon-2b; LVL-0001/zon/zon-slot-3/zon-3a; LVL-0001/zon/zon-slot-3/zon-3b; LVL-0001/zon/zon-slot-4/zon-4a; LVL-0001/steen/steen-slot-1/steen-1b; LVL-0001/steen/steen-slot-2/steen-2a; LVL-0001/steen/steen-slot-2/steen-2b; LVL-0001/steen/steen-slot-3/steen-3b; LVL-0001/steen/steen-slot-4/steen-4a; LVL-0001/wind/wind-slot-1/wind-1b; LVL-0002/shieldWall/shieldWall-slot-2/shieldWall-2a; LVL-0002/shieldWall/shieldWall-slot-2/shieldWall-2b; LVL-0002/mapTable/mapTable-slot-2/mapTable-2b; LVL-0002/mapTable/mapTable-slot-3/mapTable-3a; LVL-0002/mapTable/mapTable-slot-4/mapTable-4a; LVL-0002/fireBowl/fireBowl-slot-1/fireBowl-1a; LVL-0002/fireBowl/fireBowl-slot-3/fireBowl-3a; LVL-0002/fireBowl/fireBowl-slot-3/fireBowl-3b; LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4b; LVL-0002/shipModel/shipModel-slot-1/shipModel-1a; LVL-0002/shipModel/shipModel-slot-1/shipModel-1b; LVL-0002/shipModel/shipModel-slot-2/shipModel-2a; LVL-0002/shipModel/shipModel-slot-3/shipModel-3a; LVL-0002/shipModel/shipModel-slot-4/shipModel-4a; LVL-0002/shipModel/shipModel-slot-4/shipModel-4b; LVL-0003/harborMap/harborMap-slot-1/harborMap-1a; LVL-0003/harborMap/harborMap-slot-1/harborMap-1b; LVL-0003/harborMap/harborMap-slot-2/harborMap-2b; LVL-0003/harborMap/harborMap-slot-3/harborMap-3a; LVL-0003/harborMap/harborMap-slot-4/harborMap-4a; LVL-0003/harborMap/harborMap-slot-4/harborMap-4b; LVL-0003/mooringRope/mooringRope-slot-1/mooringRope-1a; LVL-0003/mooringRope/mooringRope-slot-1/mooringRope-1b; LVL-0003/mooringRope/mooringRope-slot-2/mooringRope-2b; LVL-0003/gateShield/gateShield-slot-2/gateShield-2a; LVL-0003/gateShield/gateShield-slot-2/gateShield-2b; LVL-0003/gateShield/gateShield-slot-3/gateShield-3b; LVL-0003/gateShield/gateShield-slot-4/gateShield-4a; LVL-0004/harborMap/harborMap-slot-2/harborMap-2a; LVL-0004/harborMap/harborMap-slot-3/harborMap-3b; LVL-0004/harborMap/harborMap-slot-4/harborMap-4b; LVL-0004/brassTelescope/brassTelescope-slot-1/brassTelescope-1a; LVL-0004/brassTelescope/brassTelescope-slot-1/brassTelescope-1b; LVL-0004/brassTelescope/brassTelescope-slot-2/brassTelescope-2b; LVL-0004/brassTelescope/brassTelescope-slot-3/brassTelescope-3a; LVL-0004/nautilusLight/nautilusLight-slot-1/nautilusLight-1b; LVL-0004/nautilusLight/nautilusLight-slot-2/nautilusLight-2b; LVL-0004/nautilusLight/nautilusLight-slot-4/nautilusLight-4a; LVL-0005/captainChart/captainChart-slot-1/captainChart-1b; LVL-0005/captainChart/captainChart-slot-3/captainChart-3b; LVL-0005/captainChart/captainChart-slot-4/captainChart-4a; LVL-0005/captainChart/captainChart-slot-4/captainChart-4b; LVL-0005/mainPorthole/mainPorthole-slot-2/mainPorthole-2a; LVL-0005/mainPorthole/mainPorthole-slot-3/mainPorthole-3a; LVL-0005/mainPorthole/mainPorthole-slot-4/mainPorthole-4b; LVL-0005/logbookDesk/logbookDesk-slot-1/logbookDesk-1b; LVL-0005/logbookDesk/logbookDesk-slot-3/logbookDesk-3b; LVL-0005/logbookDesk/logbookDesk-slot-4/logbookDesk-4a; LVL-0006/divingSuit/divingSuit-slot-1/divingSuit-1a; LVL-0006/divingSuit/divingSuit-slot-1/divingSuit-1b; LVL-0006/divingSuit/divingSuit-slot-2/divingSuit-2a; LVL-0006/divingSuit/divingSuit-slot-4/divingSuit-4a; LVL-0006/miniSub/miniSub-slot-1/miniSub-1b; LVL-0006/miniSub/miniSub-slot-2/miniSub-2a; LVL-0006/miniSub/miniSub-slot-2/miniSub-2b; LVL-0006/miniSub/miniSub-slot-3/miniSub-3a; LVL-0006/miniSub/miniSub-slot-4/miniSub-4b; LVL-0006/controlPanel/controlPanel-slot-1/controlPanel-1b; LVL-0007/escapeBoat/escapeBoat-slot-1/escapeBoat-1a; LVL-0007/escapeBoat/escapeBoat-slot-1/escapeBoat-1b; LVL-0007/escapeBoat/escapeBoat-slot-2/escapeBoat-2a; LVL-0007/escapeBoat/escapeBoat-slot-2/escapeBoat-2b; LVL-0007/escapeBoat/escapeBoat-slot-3/escapeBoat-3b; LVL-0007/escapeBoat/escapeBoat-slot-4/escapeBoat-4a; LVL-0007/escapeBoat/escapeBoat-slot-4/escapeBoat-4b; LVL-0007/islandWheel/islandWheel-slot-1/islandWheel-1a; LVL-0007/islandWheel/islandWheel-slot-1/islandWheel-1b; LVL-0007/islandWheel/islandWheel-slot-2/islandWheel-2a; LVL-0007/islandWheel/islandWheel-slot-3/islandWheel-3a; LVL-0007/islandWheel/islandWheel-slot-4/islandWheel-4b; LVL-0007/islandMap/islandMap-slot-1/islandMap-1a; LVL-0007/islandMap/islandMap-slot-1/islandMap-1b; LVL-0007/islandMap/islandMap-slot-2/islandMap-2a; LVL-0007/islandMap/islandMap-slot-2/islandMap-2b; LVL-0007/islandMap/islandMap-slot-3/islandMap-3b; LVL-0007/islandMap/islandMap-slot-4/islandMap-4a; LVL-0008/diamondSword/diamondSword-slot-1/diamondSword-1a; LVL-0008/diamondSword/diamondSword-slot-1/diamondSword-1b; LVL-0008/diamondSword/diamondSword-slot-2/diamondSword-2a; LVL-0008/diamondSword/diamondSword-slot-4/diamondSword-4a; LVL-0008/diamondSword/diamondSword-slot-4/diamondSword-4b; LVL-0008/creeperMask/creeperMask-slot-1/creeperMask-1b; LVL-0008/creeperMask/creeperMask-slot-4/creeperMask-4a; LVL-0008/creeperMask/creeperMask-slot-4/creeperMask-4b; LVL-0008/enderPortal/enderPortal-slot-1/enderPortal-1a; LVL-0008/enderPortal/enderPortal-slot-1/enderPortal-1b; LVL-0008/enderPortal/enderPortal-slot-3/enderPortal-3b; LVL-0008/enderPortal/enderPortal-slot-4/enderPortal-4a; LVL-0009/worldMap/worldMap-slot-1/worldMap-1b; LVL-0009/worldMap/worldMap-slot-2/worldMap-2b; LVL-0009/worldMap/worldMap-slot-3/worldMap-3a; LVL-0009/worldMap/worldMap-slot-4/worldMap-4a; LVL-0009/worldMap/worldMap-slot-4/worldMap-4b; LVL-0009/openBook/openBook-slot-1/openBook-1a; LVL-0009/openBook/openBook-slot-1/openBook-1b; LVL-0009/openBook/openBook-slot-2/openBook-2a; LVL-0009/openBook/openBook-slot-4/openBook-4a; LVL-0009/openBook/openBook-slot-4/openBook-4b; LVL-0009/crystalCase/crystalCase-slot-1/crystalCase-1b; LVL-0009/crystalCase/crystalCase-slot-2/crystalCase-2b; LVL-0009/crystalCase/crystalCase-slot-3/crystalCase-3a; LVL-0009/crystalCase/crystalCase-slot-4/crystalCase-4a; LVL-0010/treasureMap/treasureMap-slot-1/treasureMap-1b; LVL-0010/treasureMap/treasureMap-slot-2/treasureMap-2a; LVL-0010/treasureMap/treasureMap-slot-3/treasureMap-3b; LVL-0010/treasureMap/treasureMap-slot-4/treasureMap-4a; LVL-0010/treasureMap/treasureMap-slot-4/treasureMap-4b; LVL-0010/sandCastle/sandCastle-slot-1/sandCastle-1a; LVL-0010/sandCastle/sandCastle-slot-1/sandCastle-1b; LVL-0010/sandCastle/sandCastle-slot-3/sandCastle-3a; LVL-0010/woodenBoat/woodenBoat-slot-1/woodenBoat-1b; LVL-0010/woodenBoat/woodenBoat-slot-3/woodenBoat-3a; LVL-0010/woodenBoat/woodenBoat-slot-4/woodenBoat-4b; LVL-0011/potionTable/potionTable-slot-1/potionTable-1a; LVL-0011/potionTable/potionTable-slot-2/potionTable-2a; LVL-0011/netherOrb/netherOrb-slot-1/netherOrb-1a; LVL-0011/netherOrb/netherOrb-slot-1/netherOrb-1b; LVL-0011/netherOrb/netherOrb-slot-3/netherOrb-3b; LVL-0011/netherOrb/netherOrb-slot-4/netherOrb-4a; LVL-0011/netherMap/netherMap-slot-2/netherMap-2a; LVL-0011/netherMap/netherMap-slot-4/netherMap-4a; LVL-0012/homeMap/homeMap-slot-1/homeMap-1a; LVL-0012/homeMap/homeMap-slot-2/homeMap-2b; LVL-0012/homeMap/homeMap-slot-3/homeMap-3a; LVL-0012/homeMap/homeMap-slot-4/homeMap-4b; LVL-0012/enchantTable/enchantTable-slot-1/enchantTable-1a; LVL-0012/enchantTable/enchantTable-slot-2/enchantTable-2a; LVL-0012/enchantTable/enchantTable-slot-2/enchantTable-2b; LVL-0012/enchantTable/enchantTable-slot-3/enchantTable-3a; LVL-0012/enchantTable/enchantTable-slot-3/enchantTable-3b; LVL-0012/enchantTable/enchantTable-slot-4/enchantTable-4a; LVL-0012/enchantTable/enchantTable-slot-4/enchantTable-4b; LVL-0012/purplePortal/purplePortal-slot-1/purplePortal-1a; LVL-0012/purplePortal/purplePortal-slot-2/purplePortal-2a; LVL-0012/purplePortal/purplePortal-slot-2/purplePortal-2b; LVL-0012/purplePortal/purplePortal-slot-3/purplePortal-3b; LVL-0013/windmill/windmill-slot-1/windmill-1a; LVL-0013/windmill/windmill-slot-1/windmill-1b; LVL-0013/windmill/windmill-slot-3/windmill-3b; LVL-0013/windmill/windmill-slot-4/windmill-4a; LVL-0013/windmill/windmill-slot-4/windmill-4b; LVL-0013/cheeseCart/cheese-cart-slot-1/cheese-cart-1a; LVL-0013/cheeseCart/cheese-cart-slot-1/cheese-cart-1b; LVL-0013/cheeseCart/cheese-cart-slot-3/cheese-cart-3a; LVL-0013/cheeseCart/cheese-cart-slot-4/cheese-cart-4a; LVL-0013/cheeseCart/cheese-cart-slot-4/cheese-cart-4b; LVL-0014/telescope/telescope-slot-2/telescope-2a; LVL-0014/telescope/telescope-slot-3/telescope-3b; LVL-0014/postbox/postbox-slot-1/postbox-1a; LVL-0014/postbox/postbox-slot-2/postbox-2b; LVL-0014/postbox/postbox-slot-3/postbox-3a; LVL-0014/postbox/postbox-slot-3/postbox-3b; LVL-0014/postbox/postbox-slot-4/postbox-4b; LVL-0015/marketStall/market-stall-slot-1/market-stall-1a; LVL-0015/marketStall/market-stall-slot-2/market-stall-2b; LVL-0015/marketStall/market-stall-slot-3/market-stall-3a; LVL-0015/marketStall/market-stall-slot-3/market-stall-3b; LVL-0015/marketStall/market-stall-slot-4/market-stall-4b; LVL-0015/fountain/fountain-slot-1/fountain-1b; LVL-0015/fountain/fountain-slot-2/fountain-2a; LVL-0015/fountain/fountain-slot-2/fountain-2b; LVL-0015/fountain/fountain-slot-3/fountain-3b; LVL-0016/colosseum/colosseum-slot-1/colosseum-1a; LVL-0016/colosseum/colosseum-slot-2/colosseum-2b; LVL-0016/colosseum/colosseum-slot-3/colosseum-3a; LVL-0016/colosseum/colosseum-slot-3/colosseum-3b; LVL-0016/romanFountain/roman-fountain-slot-1/roman-fountain-1a; LVL-0016/romanFountain/roman-fountain-slot-2/roman-fountain-2a; LVL-0016/romanFountain/roman-fountain-slot-4/roman-fountain-4a; LVL-0016/gelatoCart/gelato-cart-slot-1/gelato-cart-1a; LVL-0016/gelatoCart/gelato-cart-slot-1/gelato-cart-1b; LVL-0016/gelatoCart/gelato-cart-slot-2/gelato-cart-2a; LVL-0016/gelatoCart/gelato-cart-slot-3/gelato-cart-3a; LVL-0016/gelatoCart/gelato-cart-slot-4/gelato-cart-4b; LVL-0017/alpineFountain/alpine-fountain-slot-1/alpine-fountain-1a; LVL-0017/alpineFountain/alpine-fountain-slot-1/alpine-fountain-1b; LVL-0017/alpineFountain/alpine-fountain-slot-2/alpine-fountain-2a; LVL-0017/alpineFountain/alpine-fountain-slot-4/alpine-fountain-4b; LVL-0017/cableCar/cable-car-slot-1/cable-car-1a; LVL-0017/cableCar/cable-car-slot-2/cable-car-2a; LVL-0017/cableCar/cable-car-slot-4/cable-car-4a; LVL-0018/staveChurch/stave-church-slot-1/stave-church-1a; LVL-0018/staveChurch/stave-church-slot-2/stave-church-2a; LVL-0018/staveChurch/stave-church-slot-2/stave-church-2b; LVL-0018/staveChurch/stave-church-slot-3/stave-church-3b; LVL-0018/staveChurch/stave-church-slot-4/stave-church-4a; LVL-0018/staveChurch/stave-church-slot-4/stave-church-4b; LVL-0018/lighthouse/lighthouse-slot-1/lighthouse-1b; LVL-0018/lighthouse/lighthouse-slot-3/lighthouse-3a; LVL-0018/lighthouse/lighthouse-slot-4/lighthouse-4a; LVL-0018/lighthouse/lighthouse-slot-4/lighthouse-4b; LVL-0018/vikingShip/viking-ship-slot-1/viking-ship-1a; LVL-0018/vikingShip/viking-ship-slot-1/viking-ship-1b; LVL-0018/vikingShip/viking-ship-slot-3/viking-ship-3a; LVL-0018/vikingShip/viking-ship-slot-3/viking-ship-3b; LVL-0018/vikingShip/viking-ship-slot-4/viking-ship-4a; LVL-0018/vikingShip/viking-ship-slot-4/viking-ship-4b; LVL-0019/dalaHorse/dala-horse-slot-1/dala-horse-1b; LVL-0019/dalaHorse/dala-horse-slot-2/dala-horse-2b; LVL-0019/dalaHorse/dala-horse-slot-3/dala-horse-3a; LVL-0019/dalaHorse/dala-horse-slot-3/dala-horse-3b; LVL-0019/maypole/maypole-slot-1/maypole-1a; LVL-0019/maypole/maypole-slot-1/maypole-1b; LVL-0019/maypole/maypole-slot-2/maypole-2a; LVL-0019/maypole/maypole-slot-3/maypole-3b; LVL-0020/mapBoard/map-board-slot-1/map-board-1b; LVL-0020/telescope/telescope-slot-1/telescope-1b; LVL-0020/telescope/telescope-slot-2/telescope-2a; LVL-0020/telescope/telescope-slot-3/telescope-3b; LVL-0020/deerStatue/deer-statue-slot-2/deer-statue-2a; LVL-0020/deerStatue/deer-statue-slot-3/deer-statue-3b; LVL-0020/deerStatue/deer-statue-slot-4/deer-statue-4a; LVL-0021/opticsTable/optics-table-slot-1/optics-table-1a; LVL-0021/opticsTable/optics-table-slot-1/optics-table-1b; LVL-0021/mechanicalModel/mechanical-model-slot-1/mechanical-model-1b; LVL-0021/mechanicalModel/mechanical-model-slot-2/mechanical-model-2a; LVL-0021/centralCodex/central-codex-slot-2/central-codex-2a; LVL-0021/centralCodex/central-codex-slot-2/central-codex-2b; LVL-0021/engineeringTable/engineering-table-slot-2/engineering-table-2b; LVL-0021/engineeringTable/engineering-table-slot-3/engineering-table-3a; LVL-0022/measuringTable/measuring-table-slot-3/measuring-table-3a; LVL-0022/measuringTable/measuring-table-slot-3/measuring-table-3b; LVL-0022/bridgeModel/bridge-model-slot-3/bridge-model-3b; LVL-0022/bridgeModel/bridge-model-slot-4/bridge-model-4a; LVL-0022/wellWinch/well-winch-slot-4/well-winch-4a; LVL-0022/wellWinch/well-winch-slot-4/well-winch-4b; LVL-0022/gateMechanism/gate-mechanism-slot-4/gate-mechanism-4b; LVL-0023/waterLevelPost/water-level-post-slot-1/water-level-post-1a; LVL-0023/valveWheel/valve-wheel-slot-1/valve-wheel-1a; LVL-0023/valveWheel/valve-wheel-slot-1/valve-wheel-1b; LVL-0023/valveWheel/valve-wheel-slot-4/valve-wheel-4a; LVL-0023/valveWheel/valve-wheel-slot-4/valve-wheel-4b; LVL-0023/lockChambers/lock-chambers-slot-2/lock-chambers-2b; LVL-0023/lockChambers/lock-chambers-slot-3/lock-chambers-3a; LVL-0023/paddleWheel/paddle-wheel-slot-1/paddle-wheel-1a; LVL-0023/paddleWheel/paddle-wheel-slot-1/paddle-wheel-1b; LVL-0023/paddleWheel/paddle-wheel-slot-3/paddle-wheel-3b; LVL-0023/paddleWheel/paddle-wheel-slot-4/paddle-wheel-4a; LVL-0024/wingRack/wing-rack-slot-2/wing-rack-2a; LVL-0024/wingRack/wing-rack-slot-2/wing-rack-2b; LVL-0024/wingRack/wing-rack-slot-4/wing-rack-4b; LVL-0024/counterweights/counterweights-slot-1/counterweights-1a; LVL-0024/counterweights/counterweights-slot-3/counterweights-3a; LVL-0024/counterweights/counterweights-slot-3/counterweights-3b; LVL-0024/wingFrame/wing-frame-slot-1/wing-frame-1b; LVL-0024/wingFrame/wing-frame-slot-2/wing-frame-2a; LVL-0024/wingFrame/wing-frame-slot-4/wing-frame-4a; LVL-0024/wingFrame/wing-frame-slot-4/wing-frame-4b; LVL-0025/perspectiveFrame/perspective-frame-slot-1/perspective-frame-1a; LVL-0025/perspectiveFrame/perspective-frame-slot-1/perspective-frame-1b; LVL-0025/perspectiveFrame/perspective-frame-slot-2/perspective-frame-2a; LVL-0025/perspectiveFrame/perspective-frame-slot-2/perspective-frame-2b; LVL-0025/perspectiveFrame/perspective-frame-slot-3/perspective-frame-3a; LVL-0025/perspectiveFrame/perspective-frame-slot-3/perspective-frame-3b; LVL-0025/perspectiveFrame/perspective-frame-slot-4/perspective-frame-4a; LVL-0025/perspectiveFrame/perspective-frame-slot-4/perspective-frame-4b; LVL-0025/geometricFloor/geometric-floor-slot-1/geometric-floor-1a; LVL-0025/geometricFloor/geometric-floor-slot-1/geometric-floor-1b; LVL-0025/geometricFloor/geometric-floor-slot-2/geometric-floor-2a; LVL-0025/geometricFloor/geometric-floor-slot-2/geometric-floor-2b; LVL-0025/geometricFloor/geometric-floor-slot-3/geometric-floor-3a; LVL-0025/geometricFloor/geometric-floor-slot-3/geometric-floor-3b; LVL-0025/geometricFloor/geometric-floor-slot-4/geometric-floor-4a; LVL-0025/geometricFloor/geometric-floor-slot-4/geometric-floor-4b; LVL-0025/pigmentTable/pigment-table-slot-1/pigment-table-1a; LVL-0025/pigmentTable/pigment-table-slot-1/pigment-table-1b; LVL-0025/pigmentTable/pigment-table-slot-2/pigment-table-2a; LVL-0025/pigmentTable/pigment-table-slot-2/pigment-table-2b; LVL-0025/pigmentTable/pigment-table-slot-3/pigment-table-3a; LVL-0025/pigmentTable/pigment-table-slot-3/pigment-table-3b; LVL-0025/pigmentTable/pigment-table-slot-4/pigment-table-4a; LVL-0025/pigmentTable/pigment-table-slot-4/pigment-table-4b; LVL-0026/waterModel/water-model-slot-1/water-model-1a; LVL-0026/waterModel/water-model-slot-1/water-model-1b; LVL-0026/waterModel/water-model-slot-2/water-model-2a; LVL-0026/waterModel/water-model-slot-2/water-model-2b; LVL-0026/waterModel/water-model-slot-3/water-model-3a; LVL-0026/waterModel/water-model-slot-3/water-model-3b; LVL-0026/waterModel/water-model-slot-4/water-model-4a; LVL-0026/waterModel/water-model-slot-4/water-model-4b; LVL-0026/opticalTable/optical-table-slot-1/optical-table-1a; LVL-0026/opticalTable/optical-table-slot-1/optical-table-1b; LVL-0026/opticalTable/optical-table-slot-2/optical-table-2a; LVL-0026/opticalTable/optical-table-slot-2/optical-table-2b; LVL-0026/opticalTable/optical-table-slot-3/optical-table-3a; LVL-0026/opticalTable/optical-table-slot-3/optical-table-3b; LVL-0026/opticalTable/optical-table-slot-4/optical-table-4a; LVL-0026/opticalTable/optical-table-slot-4/optical-table-4b; LVL-0026/wingConstruction/wing-construction-slot-1/wing-construction-1a; LVL-0026/wingConstruction/wing-construction-slot-1/wing-construction-1b; LVL-0026/wingConstruction/wing-construction-slot-2/wing-construction-2a; LVL-0026/wingConstruction/wing-construction-slot-2/wing-construction-2b; LVL-0026/wingConstruction/wing-construction-slot-3/wing-construction-3a; LVL-0026/wingConstruction/wing-construction-slot-3/wing-construction-3b; LVL-0026/wingConstruction/wing-construction-slot-4/wing-construction-4a; LVL-0026/wingConstruction/wing-construction-slot-4/wing-construction-4b; LVL-0027/anubisStatue/anubis-statue-slot-1/anubis-statue-1a; LVL-0027/anubisStatue/anubis-statue-slot-1/anubis-statue-1b; LVL-0027/tabletCase/tablet-case-slot-1/tablet-case-1a; LVL-0027/tabletCase/tablet-case-slot-1/tablet-case-1b; LVL-0027/modelBoat/model-boat-slot-1/model-boat-1a; LVL-0027/modelBoat/model-boat-slot-1/model-boat-1b; LVL-0027/reliefPanel/relief-panel-slot-1/relief-panel-1a; LVL-0027/reliefPanel/relief-panel-slot-1/relief-panel-1b; LVL-0028/planningTable/planning-table-slot-1/planning-table-1a; LVL-0028/planningTable/planning-table-slot-1/planning-table-1b; LVL-0028/stoneSled/stone-sled-slot-1/stone-sled-1a; LVL-0028/stoneSled/stone-sled-slot-1/stone-sled-1b; LVL-0028/craneFrame/crane-frame-slot-1/crane-frame-1a; LVL-0028/craneFrame/crane-frame-slot-1/crane-frame-1b; LVL-0029/paintedRelief/painted-relief-slot-1/painted-relief-1a; LVL-0029/paintedRelief/painted-relief-slot-1/painted-relief-1b; LVL-0029/canopicJars/canopic-jars-slot-1/canopic-jars-1a; LVL-0029/canopicJars/canopic-jars-slot-1/canopic-jars-1b; LVL-0029/treasureChest/treasure-chest-slot-1/treasure-chest-1a; LVL-0029/treasureChest/treasure-chest-slot-1/treasure-chest-1b; LVL-0029/altarTable/altar-table-slot-1/altar-table-1a; LVL-0029/altarTable/altar-table-slot-1/altar-table-1b; LVL-0030/offeringTable/offering-table-slot-1/offering-table-1a; LVL-0030/offeringTable/offering-table-slot-1/offering-table-1b; LVL-0030/carvedRelief/carved-relief-slot-1/carved-relief-1a; LVL-0030/carvedRelief/carved-relief-slot-1/carved-relief-1b; LVL-0030/templePanel/temple-panel-slot-1/temple-panel-1a; LVL-0030/templePanel/temple-panel-slot-1/temple-panel-1b; LVL-0031/scarabDisplay/scarab-display-slot-1/scarab-display-1a; LVL-0031/scarabDisplay/scarab-display-slot-1/scarab-display-1b; LVL-0031/centralCase/central-case-slot-1/central-case-1a; LVL-0031/centralCase/central-case-slot-1/central-case-1b; LVL-0031/boatDisplay/boat-display-slot-1/boat-display-1a; LVL-0031/boatDisplay/boat-display-slot-1/boat-display-1b; LVL-0031/seatedStatue/seated-statue-slot-1/seated-statue-1a; LVL-0031/seatedStatue/seated-statue-slot-1/seated-statue-1b |
| # : # = ? | 112 | 57 | LVL-0001/zon/zon-slot-4/zon-4b; LVL-0001/steen/steen-slot-3/steen-3a; LVL-0001/wind/wind-slot-1/wind-1a; LVL-0001/wind/wind-slot-2/wind-2a; LVL-0001/wind/wind-slot-2/wind-2b; LVL-0002/shieldWall/shieldWall-slot-1/shieldWall-1a; LVL-0002/shieldWall/shieldWall-slot-4/shieldWall-4a; LVL-0002/mapTable/mapTable-slot-1/mapTable-1b; LVL-0002/mapTable/mapTable-slot-4/mapTable-4b; LVL-0002/fireBowl/fireBowl-slot-2/fireBowl-2b; LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4a; LVL-0003/gateShield/gateShield-slot-1/gateShield-1b; LVL-0004/harborMap/harborMap-slot-1/harborMap-1a; LVL-0004/harborMap/harborMap-slot-1/harborMap-1b; LVL-0004/harborMap/harborMap-slot-3/harborMap-3a; LVL-0004/brassTelescope/brassTelescope-slot-2/brassTelescope-2a; LVL-0004/nautilusLight/nautilusLight-slot-2/nautilusLight-2a; LVL-0004/nautilusLight/nautilusLight-slot-4/nautilusLight-4b; LVL-0005/captainChart/captainChart-slot-3/captainChart-3a; LVL-0005/mainPorthole/mainPorthole-slot-4/mainPorthole-4a; LVL-0005/logbookDesk/logbookDesk-slot-2/logbookDesk-2b; LVL-0006/miniSub/miniSub-slot-1/miniSub-1a; LVL-0006/miniSub/miniSub-slot-3/miniSub-3b; LVL-0006/controlPanel/controlPanel-slot-1/controlPanel-1a; LVL-0006/controlPanel/controlPanel-slot-2/controlPanel-2b; LVL-0007/escapeBoat/escapeBoat-slot-3/escapeBoat-3a; LVL-0007/islandMap/islandMap-slot-3/islandMap-3a; LVL-0008/diamondSword/diamondSword-slot-2/diamondSword-2b; LVL-0008/creeperMask/creeperMask-slot-1/creeperMask-1a; LVL-0008/creeperMask/creeperMask-slot-2/creeperMask-2a; LVL-0008/creeperMask/creeperMask-slot-3/creeperMask-3a; LVL-0009/worldMap/worldMap-slot-2/worldMap-2a; LVL-0009/openBook/openBook-slot-3/openBook-3a; LVL-0009/crystalCase/crystalCase-slot-2/crystalCase-2a; LVL-0010/sandCastle/sandCastle-slot-4/sandCastle-4a; LVL-0010/woodenBoat/woodenBoat-slot-2/woodenBoat-2a; LVL-0011/potionTable/potionTable-slot-2/potionTable-2b; LVL-0011/potionTable/potionTable-slot-3/potionTable-3b; LVL-0011/potionTable/potionTable-slot-4/potionTable-4b; LVL-0011/netherOrb/netherOrb-slot-4/netherOrb-4b; LVL-0011/netherMap/netherMap-slot-1/netherMap-1a; LVL-0012/homeMap/homeMap-slot-1/homeMap-1b; LVL-0012/homeMap/homeMap-slot-2/homeMap-2a; LVL-0012/purplePortal/purplePortal-slot-1/purplePortal-1b; LVL-0012/purplePortal/purplePortal-slot-4/purplePortal-4a; LVL-0014/telescope/telescope-slot-1/telescope-1a; LVL-0014/telescope/telescope-slot-2/telescope-2b; LVL-0014/telescope/telescope-slot-3/telescope-3a; LVL-0014/postbox/postbox-slot-2/postbox-2a; LVL-0015/marketStall/market-stall-slot-1/market-stall-1b; LVL-0015/fountain/fountain-slot-3/fountain-3a; LVL-0015/fountain/fountain-slot-4/fountain-4b; LVL-0016/colosseum/colosseum-slot-4/colosseum-4b; LVL-0016/romanFountain/roman-fountain-slot-3/roman-fountain-3a; LVL-0016/gelatoCart/gelato-cart-slot-2/gelato-cart-2b; LVL-0017/alpineFountain/alpine-fountain-slot-3/alpine-fountain-3a; LVL-0017/alpineFountain/alpine-fountain-slot-3/alpine-fountain-3b; LVL-0017/cableCar/cable-car-slot-3/cable-car-3b; LVL-0018/staveChurch/stave-church-slot-1/stave-church-1b; LVL-0018/lighthouse/lighthouse-slot-2/lighthouse-2a; LVL-0018/lighthouse/lighthouse-slot-2/lighthouse-2b; LVL-0018/vikingShip/viking-ship-slot-2/viking-ship-2a; LVL-0019/maypole/maypole-slot-4/maypole-4b; LVL-0020/mapBoard/map-board-slot-3/map-board-3a; LVL-0020/mapBoard/map-board-slot-3/map-board-3b; LVL-0020/mapBoard/map-board-slot-4/map-board-4b; LVL-0020/telescope/telescope-slot-4/telescope-4a; LVL-0020/telescope/telescope-slot-4/telescope-4b; LVL-0021/opticsTable/optics-table-slot-2/optics-table-2a; LVL-0021/opticsTable/optics-table-slot-3/optics-table-3b; LVL-0021/mechanicalModel/mechanical-model-slot-2/mechanical-model-2b; LVL-0021/mechanicalModel/mechanical-model-slot-4/mechanical-model-4a; LVL-0021/centralCodex/central-codex-slot-3/central-codex-3a; LVL-0021/centralCodex/central-codex-slot-4/central-codex-4b; LVL-0021/engineeringTable/engineering-table-slot-3/engineering-table-3b; LVL-0022/measuringTable/measuring-table-slot-1/measuring-table-1a; LVL-0022/measuringTable/measuring-table-slot-4/measuring-table-4a; LVL-0022/bridgeModel/bridge-model-slot-1/bridge-model-1b; LVL-0022/bridgeModel/bridge-model-slot-4/bridge-model-4b; LVL-0022/wellWinch/well-winch-slot-2/well-winch-2a; LVL-0022/gateMechanism/gate-mechanism-slot-1/gate-mechanism-1a; LVL-0022/gateMechanism/gate-mechanism-slot-2/gate-mechanism-2b; LVL-0023/waterLevelPost/water-level-post-slot-1/water-level-post-1b; LVL-0023/waterLevelPost/water-level-post-slot-3/water-level-post-3a; LVL-0023/valveWheel/valve-wheel-slot-2/valve-wheel-2a; LVL-0023/valveWheel/valve-wheel-slot-3/valve-wheel-3b; LVL-0023/lockChambers/lock-chambers-slot-1/lock-chambers-1a; LVL-0023/lockChambers/lock-chambers-slot-3/lock-chambers-3b; LVL-0023/paddleWheel/paddle-wheel-slot-2/paddle-wheel-2a; LVL-0023/paddleWheel/paddle-wheel-slot-4/paddle-wheel-4b; LVL-0024/wingRack/wing-rack-slot-3/wing-rack-3a; LVL-0024/counterweights/counterweights-slot-1/counterweights-1b; LVL-0024/counterweights/counterweights-slot-4/counterweights-4a; LVL-0024/wingFrame/wing-frame-slot-2/wing-frame-2b; LVL-0027/anubisStatue/anubis-statue-slot-3/anubis-statue-3a; LVL-0027/tabletCase/tablet-case-slot-3/tablet-case-3a; LVL-0027/modelBoat/model-boat-slot-3/model-boat-3a; LVL-0027/reliefPanel/relief-panel-slot-3/relief-panel-3a; LVL-0028/planningTable/planning-table-slot-3/planning-table-3a; LVL-0028/stoneSled/stone-sled-slot-3/stone-sled-3a; LVL-0028/craneFrame/crane-frame-slot-3/crane-frame-3a; LVL-0029/paintedRelief/painted-relief-slot-3/painted-relief-3a; LVL-0029/canopicJars/canopic-jars-slot-3/canopic-jars-3a; LVL-0029/treasureChest/treasure-chest-slot-3/treasure-chest-3a; LVL-0029/altarTable/altar-table-slot-3/altar-table-3a; LVL-0030/offeringTable/offering-table-slot-3/offering-table-3a; LVL-0030/carvedRelief/carved-relief-slot-3/carved-relief-3a; LVL-0030/templePanel/temple-panel-slot-3/temple-panel-3a; LVL-0031/scarabDisplay/scarab-display-slot-3/scarab-display-3a; LVL-0031/centralCase/central-case-slot-3/central-case-3a; LVL-0031/boatDisplay/boat-display-slot-3/boat-display-3a; LVL-0031/seatedStatue/seated-statue-slot-3/seated-statue-3a |
| nebu tekent # vakken met # tekens per vak. hoeveel tekens tekent hij? | 18 | 4 | LVL-0027/anubisStatue/anubis-statue-slot-2/anubis-statue-2b; LVL-0027/tabletCase/tablet-case-slot-2/tablet-case-2b; LVL-0027/modelBoat/model-boat-slot-2/model-boat-2b; LVL-0027/reliefPanel/relief-panel-slot-2/relief-panel-2b; LVL-0028/planningTable/planning-table-slot-2/planning-table-2b; LVL-0028/stoneSled/stone-sled-slot-2/stone-sled-2b; LVL-0028/craneFrame/crane-frame-slot-2/crane-frame-2b; LVL-0029/paintedRelief/painted-relief-slot-2/painted-relief-2b; LVL-0029/canopicJars/canopic-jars-slot-2/canopic-jars-2b; LVL-0029/treasureChest/treasure-chest-slot-2/treasure-chest-2b; LVL-0029/altarTable/altar-table-slot-2/altar-table-2b; LVL-0030/offeringTable/offering-table-slot-2/offering-table-2b; LVL-0030/carvedRelief/carved-relief-slot-2/carved-relief-2b; LVL-0030/templePanel/temple-panel-slot-2/temple-panel-2b; LVL-0031/scarabDisplay/scarab-display-slot-2/scarab-display-2b; LVL-0031/centralCase/central-case-slot-2/central-case-2b; LVL-0031/boatDisplay/boat-display-slot-2/boat-display-2b; LVL-0031/seatedStatue/seated-statue-slot-2/seated-statue-2b |
| leonardo tekent # vakken met # lijnen per vak. hoeveel lijnen tekent hij? | 13 | 13 | LVL-0021/opticsTable/optics-table-slot-3/optics-table-3a; LVL-0021/mechanicalModel/mechanical-model-slot-3/mechanical-model-3b; LVL-0021/centralCodex/central-codex-slot-4/central-codex-4a; LVL-0021/engineeringTable/engineering-table-slot-4/engineering-table-4b; LVL-0022/bridgeModel/bridge-model-slot-1/bridge-model-1a; LVL-0022/wellWinch/well-winch-slot-1/well-winch-1b; LVL-0022/gateMechanism/gate-mechanism-slot-2/gate-mechanism-2a; LVL-0023/waterLevelPost/water-level-post-slot-2/water-level-post-2b; LVL-0023/valveWheel/valve-wheel-slot-3/valve-wheel-3a; LVL-0023/lockChambers/lock-chambers-slot-4/lock-chambers-4b; LVL-0024/wingRack/wing-rack-slot-1/wing-rack-1b; LVL-0024/counterweights/counterweights-slot-2/counterweights-2b; LVL-0024/wingFrame/wing-frame-slot-3/wing-frame-3b |
| het bedieningspaneel heeft # rijen met elk # schakelaars. hoeveel schakelaars zijn dat samen? | 5 | 5 | LVL-0006/controlPanel/controlPanel-slot-2/controlPanel-2a; LVL-0006/controlPanel/controlPanel-slot-3/controlPanel-3a; LVL-0006/controlPanel/controlPanel-slot-3/controlPanel-3b; LVL-0006/controlPanel/controlPanel-slot-4/controlPanel-4a; LVL-0006/controlPanel/controlPanel-slot-4/controlPanel-4b |
| op de kaarttafel liggen # rijen met elk # houten pionnen. hoeveel pionnen liggen er? | 3 | 3 | LVL-0002/mapTable/mapTable-slot-1/mapTable-1a; LVL-0002/mapTable/mapTable-slot-2/mapTable-2a; LVL-0002/mapTable/mapTable-slot-3/mapTable-3b |
| op # poortschilden staan elk # runentekens. hoeveel runentekens zijn dat samen? | 3 | 3 | LVL-0003/gateShield/gateShield-slot-1/gateShield-1a; LVL-0003/gateShield/gateShield-slot-3/gateShield-3a; LVL-0003/gateShield/gateShield-slot-4/gateShield-4b |
| nemo bekijkt # sterrenbeelden met elk # heldere sterren. hoeveel sterren ziet hij? | 3 | 3 | LVL-0004/brassTelescope/brassTelescope-slot-3/brassTelescope-3b; LVL-0004/brassTelescope/brassTelescope-slot-4/brassTelescope-4a; LVL-0004/brassTelescope/brassTelescope-slot-4/brassTelescope-4b |
| voor de donkere poort bouwt job # rijen van # portaalstenen. hoeveel portaalstenen gebruikt hij? | 3 | 3 | LVL-0008/enderPortal/enderPortal-slot-2/enderPortal-2a; LVL-0008/enderPortal/enderPortal-slot-2/enderPortal-2b; LVL-0008/enderPortal/enderPortal-slot-3/enderPortal-3a |
| het zandkasteel heeft # torens met elk # zandblokken. hoeveel blokken zijn dat samen? | 3 | 3 | LVL-0010/sandCastle/sandCastle-slot-2/sandCastle-2b; LVL-0010/sandCastle/sandCastle-slot-3/sandCastle-3b; LVL-0010/sandCastle/sandCastle-slot-4/sandCastle-4b |
| voor de houten boot maakt job # stapels van # bouwplanken. hoeveel planken zijn dat samen? | 3 | 3 | LVL-0010/woodenBoat/woodenBoat-slot-1/woodenBoat-1a; LVL-0010/woodenBoat/woodenBoat-slot-2/woodenBoat-2b; LVL-0010/woodenBoat/woodenBoat-slot-3/woodenBoat-3b |
| job verdeelt # routeblokken eerlijk over # routes op de lavakaart. hoeveel blokken krijgt iedere route? | 3 | 3 | LVL-0011/netherMap/netherMap-slot-1/netherMap-1b; LVL-0011/netherMap/netherMap-slot-3/netherMap-3b; LVL-0011/netherMap/netherMap-slot-4/netherMap-4b |
| er rijden # kabelbaancabines met elk # reizigers. hoeveel reizigers zijn dat samen? | 3 | 3 | LVL-0017/cableCar/cable-car-slot-2/cable-car-2b; LVL-0017/cableCar/cable-car-slot-3/cable-car-3a; LVL-0017/cableCar/cable-car-slot-4/cable-car-4b |
| aan de meiboom hangen # bloemenkransen met elk # bloemen. hoeveel bloemen zijn dat samen? | 3 | 3 | LVL-0019/maypole/maypole-slot-2/maypole-2b; LVL-0019/maypole/maypole-slot-3/maypole-3a; LVL-0019/maypole/maypole-slot-4/maypole-4a |
| op de posbankkaart staan # wandelroutes met elk # routepunten. hoeveel routepunten zijn dat samen? | 3 | 3 | LVL-0020/mapBoard/map-board-slot-2/map-board-2a; LVL-0020/mapBoard/map-board-slot-2/map-board-2b; LVL-0020/mapBoard/map-board-slot-4/map-board-4a |
| bij het hertenbeeld staan # informatieborden met elk # wandeltekens. hoeveel wandeltekens zijn dat samen? | 3 | 3 | LVL-0020/deerStatue/deer-statue-slot-1/deer-statue-1a; LVL-0020/deerStatue/deer-statue-slot-2/deer-statue-2b; LVL-0020/deerStatue/deer-statue-slot-4/deer-statue-4b |
| aan # vlaggenmasten hangen elk # linten. hoeveel linten hangen er in totaal? | 2 | 2 | LVL-0001/wind/wind-slot-4/wind-4a; LVL-0001/wind/wind-slot-4/wind-4b |
| de viking verdeelt # schilden eerlijk over # wachters. hoeveel schilden krijgt iedere wachter? | 2 | 2 | LVL-0002/shieldWall/shieldWall-slot-3/shieldWall-3a; LVL-0002/shieldWall/shieldWall-slot-3/shieldWall-3b |
| naast de vuurschaal liggen # stapels van # houtblokken. hoeveel houtblokken zijn dat samen? | 2 | 2 | LVL-0002/fireBowl/fireBowl-slot-1/fireBowl-1b; LVL-0002/fireBowl/fireBowl-slot-2/fireBowl-2a |
| de viking maakt # bundels van # touwlussen. hoeveel touwlussen zijn dat samen? | 2 | 2 | LVL-0003/mooringRope/mooringRope-slot-2/mooringRope-2a; LVL-0003/mooringRope/mooringRope-slot-4/mooringRope-4b |
| de viking verdeelt # touwlussen eerlijk over # boten. hoeveel touwlussen krijgt iedere boot? | 2 | 2 | LVL-0003/mooringRope/mooringRope-slot-3/mooringRope-3b; LVL-0003/mooringRope/mooringRope-slot-4/mooringRope-4a |
| op de havenkaart staan # routes met elk # meetpunten. hoeveel meetpunten staan er in totaal? | 2 | 2 | LVL-0004/harborMap/harborMap-slot-2/harborMap-2b; LVL-0004/harborMap/harborMap-slot-4/harborMap-4a |
| op de kapiteinskaart staan # routes met elk # koerspunten. hoeveel koerspunten staan er in totaal? | 2 | 2 | LVL-0005/captainChart/captainChart-slot-1/captainChart-1a; LVL-0005/captainChart/captainChart-slot-2/captainChart-2b |
| door het grote raam zwemmen # scholen met elk # vissen. hoeveel vissen zijn dat samen? | 2 | 2 | LVL-0005/mainPorthole/mainPorthole-slot-1/mainPorthole-1a; LVL-0005/mainPorthole/mainPorthole-slot-2/mainPorthole-2b |
| door het grote raam zwemmen # vissen in # even grote scholen. hoeveel vissen zitten in iedere school? | 2 | 2 | LVL-0005/mainPorthole/mainPorthole-slot-1/mainPorthole-1b; LVL-0005/mainPorthole/mainPorthole-slot-3/mainPorthole-3b |
| nemo verdeelt # aantekeningen over # pagina's. op iedere pagina komen er evenveel. hoeveel aantekeningen komen op één pagina? | 2 | 2 | LVL-0005/logbookDesk/logbookDesk-slot-1/logbookDesk-1a; LVL-0005/logbookDesk/logbookDesk-slot-2/logbookDesk-2a |
| in het logboek staan # pagina's met elk # aantekeningen. hoeveel aantekeningen zijn dat samen? | 2 | 2 | LVL-0005/logbookDesk/logbookDesk-slot-3/logbookDesk-3a; LVL-0005/logbookDesk/logbookDesk-slot-4/logbookDesk-4b |
| aan # duikpakken zitten elk # koperen sluitingen. hoeveel sluitingen zijn dat samen? | 2 | 2 | LVL-0006/divingSuit/divingSuit-slot-2/divingSuit-2b; LVL-0006/divingSuit/divingSuit-slot-4/divingSuit-4b |
| nemo verdeelt # koperen sluitingen eerlijk over # duikpakken. hoeveel sluitingen krijgt ieder pak? | 2 | 2 | LVL-0006/divingSuit/divingSuit-slot-3/divingSuit-3a; LVL-0006/divingSuit/divingSuit-slot-3/divingSuit-3b |
| nemo verdeelt # koerskaarten eerlijk over # reddingsboten. hoeveel kaarten krijgt iedere boot? | 2 | 2 | LVL-0007/islandWheel/islandWheel-slot-3/islandWheel-3b; LVL-0007/islandWheel/islandWheel-slot-4/islandWheel-4a |
| job verdeelt # diamantblokken eerlijk over # kisten. hoeveel blokken gaan in iedere kist? | 2 | 2 | LVL-0008/diamondSword/diamondSword-slot-3/diamondSword-3a; LVL-0008/diamondSword/diamondSword-slot-3/diamondSword-3b |
| job bouwt # creepermaskers met elk # groene blokken. hoeveel blokken gebruikt hij? | 2 | 2 | LVL-0008/creeperMask/creeperMask-slot-2/creeperMask-2b; LVL-0008/creeperMask/creeperMask-slot-3/creeperMask-3b |
| in de kristalkast staan # bakjes met elk # kristalscherven. hoeveel scherven zijn dat samen? | 2 | 2 | LVL-0009/crystalCase/crystalCase-slot-3/crystalCase-3b; LVL-0009/crystalCase/crystalCase-slot-4/crystalCase-4b |
| op de schatkaart staan # routes met elk # routeblokjes. hoeveel routeblokjes zijn dat samen? | 2 | 2 | LVL-0010/treasureMap/treasureMap-slot-2/treasureMap-2b; LVL-0010/treasureMap/treasureMap-slot-3/treasureMap-3a |
| rond de netherbol staan # ringen met elk # gloeiblokken. hoeveel blokken zijn dat samen? | 2 | 2 | LVL-0011/netherOrb/netherOrb-slot-2/netherOrb-2a; LVL-0011/netherOrb/netherOrb-slot-3/netherOrb-3a |
| op de lavakaart markeert job # routes met elk # routeblokken. hoeveel routeblokken gebruikt hij? | 2 | 2 | LVL-0011/netherMap/netherMap-slot-2/netherMap-2b; LVL-0011/netherMap/netherMap-slot-3/netherMap-3a |
| de molenaar vult # zakken met elk # scheppen graan. hoeveel scheppen graan zijn dat samen? | 2 | 2 | LVL-0013/windmill/windmill-slot-2/windmill-2a; LVL-0013/windmill/windmill-slot-2/windmill-2b |
| de kaasboer verdeelt # kaasjes eerlijk over # planken. hoeveel kaasjes liggen op iedere plank? | 2 | 2 | LVL-0013/cheeseCart/cheese-cart-slot-2/cheese-cart-2a; LVL-0013/cheeseCart/cheese-cart-slot-3/cheese-cart-3b |
| op # sterrenkaarten staan elk # sterren. hoeveel sterren zijn dat samen? | 2 | 2 | LVL-0014/telescope/telescope-slot-4/telescope-4a; LVL-0014/telescope/telescope-slot-4/telescope-4b |
| de dorpsfontein heeft # bakken met samen # waterlelies. in iedere bak liggen er evenveel. hoeveel waterlelies liggen in één bak? | 2 | 2 | LVL-0015/fountain/fountain-slot-1/fountain-1a; LVL-0015/fountain/fountain-slot-4/fountain-4a |
| het colosseum heeft # rijen met elk # bogen. hoeveel bogen zijn dat samen? | 2 | 2 | LVL-0016/colosseum/colosseum-slot-1/colosseum-1b; LVL-0016/colosseum/colosseum-slot-4/colosseum-4a |
| rond de romeinse fontein liggen # mozaïekstroken met elk # tegels. hoeveel tegels zijn dat samen? | 2 | 2 | LVL-0016/romanFountain/roman-fountain-slot-2/roman-fountain-2b; LVL-0016/romanFountain/roman-fountain-slot-4/roman-fountain-4b |
| de schilder verdeelt # verfstrepen over # banen op het dalapaard. op iedere baan komen er evenveel. hoeveel strepen per baan? | 2 | 2 | LVL-0019/dalaHorse/dala-horse-slot-1/dala-horse-1a; LVL-0019/dalaHorse/dala-horse-slot-4/dala-horse-4b |
| het dalapaard heeft # banen met elk # verfstrepen. hoeveel verfstrepen zijn dat samen? | 2 | 2 | LVL-0019/dalaHorse/dala-horse-slot-2/dala-horse-2a; LVL-0019/dalaHorse/dala-horse-slot-4/dala-horse-4a |

### 8–9. Repetition and variety by challenge and level

All levels are shown. Review flags: one family, one presentation, one answer mode, or at most two normalized prompt templates within an eight-variant challenge. These are transparent screening thresholds, not a claim that intentional clock or table practice is defective.

| Level | Variants | Families | Presentations | Answer modes | Exact prompts | Numeric templates |
| --- | --- | --- | --- | --- | --- | --- |
| LVL-0001 | 24 | 5 | 2 | 2 | 24 | 8 |
| LVL-0002 | 32 | 5 | 2 | 2 | 31 | 9 |
| LVL-0003 | 32 | 7 | 2 | 2 | 24 | 9 |
| LVL-0004 | 24 | 5 | 2 | 2 | 24 | 7 |
| LVL-0005 | 24 | 4 | 2 | 2 | 22 | 8 |
| LVL-0006 | 24 | 5 | 2 | 2 | 23 | 6 |
| LVL-0007 | 24 | 5 | 2 | 2 | 23 | 5 |
| LVL-0008 | 24 | 4 | 2 | 2 | 22 | 6 |
| LVL-0009 | 24 | 5 | 2 | 2 | 23 | 8 |
| LVL-0010 | 24 | 6 | 2 | 2 | 24 | 8 |
| LVL-0011 | 24 | 5 | 2 | 2 | 24 | 9 |
| LVL-0012 | 24 | 6 | 2 | 2 | 21 | 7 |
| LVL-0013 | 24 | 5 | 2 | 2 | 16 | 6 |
| LVL-0014 | 24 | 5 | 2 | 2 | 17 | 7 |
| LVL-0015 | 24 | 6 | 2 | 2 | 17 | 6 |
| LVL-0016 | 24 | 6 | 2 | 2 | 24 | 9 |
| LVL-0017 | 24 | 6 | 2 | 2 | 17 | 7 |
| LVL-0018 | 24 | 4 | 2 | 2 | 21 | 6 |
| LVL-0019 | 24 | 5 | 2 | 2 | 17 | 6 |
| LVL-0020 | 24 | 6 | 2 | 2 | 23 | 10 |
| LVL-0021 | 32 | 5 | 2 | 2 | 32 | 16 |
| LVL-0022 | 32 | 5 | 2 | 2 | 32 | 18 |
| LVL-0023 | 40 | 6 | 2 | 2 | 34 | 15 |
| LVL-0024 | 32 | 4 | 2 | 2 | 26 | 12 |
| LVL-0025 | 32 | 2 | 2 | 2 | 26 | 3 |
| LVL-0026 | 40 | 2 | 2 | 2 | 26 | 3 |
| LVL-0027 | 32 | 5 | 2 | 2 | 25 | 12 |
| LVL-0028 | 32 | 6 | 2 | 2 | 21 | 12 |
| LVL-0029 | 32 | 5 | 2 | 2 | 25 | 12 |
| LVL-0030 | 32 | 6 | 2 | 2 | 21 | 12 |
| LVL-0031 | 32 | 5 | 2 | 2 | 25 | 12 |

| Challenge | State | Families | Presentations | Answer modes | Exact prompts | Numeric templates |
| --- | --- | --- | --- | --- | --- | --- |
| LVL-0003/shipCompass | active | 1 | 1 | 1 | 1 | 1 |
| LVL-0007/escapeBoat | active | 2 | 1 | 2 | 8 | 2 |
| LVL-0012/enchantTable | active | 2 | 2 | 2 | 8 | 2 |
| LVL-0013/canalClock | active | 1 | 1 | 1 | 1 | 1 |
| LVL-0014/clockTower | active | 1 | 1 | 1 | 1 | 1 |
| LVL-0015/villageClock | active | 1 | 1 | 1 | 1 | 1 |
| LVL-0017/clockHouse | active | 1 | 1 | 1 | 1 | 1 |
| LVL-0019/harborClock | active | 1 | 1 | 1 | 1 | 1 |
| LVL-0023/waterClock | active | 1 | 1 | 1 | 2 | 2 |
| LVL-0024/flightControls | active | 1 | 1 | 1 | 2 | 2 |
| LVL-0025/perspectiveFrame | active | 1 | 1 | 2 | 8 | 1 |
| LVL-0025/geometricFloor | active | 1 | 1 | 2 | 8 | 1 |
| LVL-0025/pigmentTable | active | 1 | 1 | 2 | 8 | 1 |
| LVL-0025/pulleyPanel | active | 1 | 1 | 1 | 2 | 2 |
| LVL-0026/waterModel | inactive | 1 | 1 | 2 | 8 | 1 |
| LVL-0026/opticalTable | active | 1 | 1 | 2 | 8 | 1 |
| LVL-0026/centralCodex | active | 1 | 1 | 1 | 2 | 2 |
| LVL-0026/wingConstruction | inactive | 1 | 1 | 2 | 8 | 1 |
| LVL-0026/designBoard | active | 1 | 1 | 1 | 2 | 2 |
| LVL-0028/tripodInstrument | active | 1 | 1 | 1 | 2 | 2 |
| LVL-0030/sundial | active | 1 | 1 | 1 | 2 | 2 |

### 10. Minnie and Moose hints

Hint flags overlap. “Generic/template” means an exact hint reused at least eight times, with no digits and no explicit answer-reveal match. “Strategy cue” means it mentions grouping, a table, splitting, doubling, inverse operations, operations, reading clock hands or spelling/sounds. “Explicit answer-reveal” matches an equation result equal to the numeric answer or the full textual answer in the hint. It is a conservative lower bound: indirect disclosure, number words and reconstructed clock wording can reveal answers without matching. These flags are reproducible text screens; they are not exhaustive human classifications. Instructional and answer-revealing learning hints are permitted by the canonical document.

#### hint_minnie: recurring exact hints

| Exact hint | Count | Flags | Example references |
| --- | --- | --- | --- |
| Denk aan de tafel van 8. | 64 | strategy cue | LVL-0001/zon/zon-slot-1/zon-1b; LVL-0001/steen/steen-slot-2/steen-2b; LVL-0001/steen/steen-slot-3/steen-3b |
| Denk aan de tafel van 7. | 57 | strategy cue | LVL-0001/zon/zon-slot-4/zon-4a; LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4b; LVL-0002/shipModel/shipModel-slot-4/shipModel-4b |
| Kijk eerst naar de grote wijzer. | 52 | generic/template, strategy cue | LVL-0003/shipCompass/shipCompass-slot-1/shipCompass-1a; LVL-0003/shipCompass/shipCompass-slot-1/shipCompass-1b; LVL-0003/shipCompass/shipCompass-slot-2/shipCompass-2a |
| Denk aan de tafel van 6. | 47 | strategy cue | LVL-0001/steen/steen-slot-1/steen-1b; LVL-0002/shieldWall/shieldWall-slot-2/shieldWall-2a; LVL-0002/fireBowl/fireBowl-slot-1/fireBowl-1a |
| Denk aan de tafel van 9. | 40 | strategy cue | LVL-0001/zon/zon-slot-3/zon-3a; LVL-0001/steen/steen-slot-4/steen-4a; LVL-0002/shieldWall/shieldWall-slot-2/shieldWall-2b |
| Denk aan de tafel van 4. | 36 | strategy cue | LVL-0001/zon/zon-slot-2/zon-2b; LVL-0002/shipModel/shipModel-slot-1/shipModel-1a; LVL-0002/shipModel/shipModel-slot-2/shipModel-2a |
| Denk aan de tafel van 3. | 36 | strategy cue | LVL-0002/mapTable/mapTable-slot-4/mapTable-4a; LVL-0002/shipModel/shipModel-slot-1/shipModel-1b; LVL-0003/harborMap/harborMap-slot-3/harborMap-3a |
| Lees het woord rustig van links naar rechts. | 36 | generic/template | LVL-0027/anubisStatue/anubis-statue-slot-4/anubis-statue-4a; LVL-0027/anubisStatue/anubis-statue-slot-4/anubis-statue-4b; LVL-0027/tabletCase/tablet-case-slot-4/tablet-case-4a |
| Welke keersom hoort hier omgekeerd bij? | 26 | generic/template, strategy cue | LVL-0021/opticsTable/optics-table-slot-2/optics-table-2a; LVL-0021/opticsTable/optics-table-slot-3/optics-table-3b; LVL-0021/mechanicalModel/mechanical-model-slot-2/mechanical-model-2b |
| Denk aan de tafel van 5. | 23 | strategy cue | LVL-0001/zon/zon-slot-3/zon-3b; LVL-0003/harborMap/harborMap-slot-2/harborMap-2b; LVL-0004/harborMap/harborMap-slot-4/harborMap-4b |
| Denk aan de tafel van 10. | 21 | strategy cue | LVL-0001/zon/zon-slot-1/zon-1a; LVL-0001/steen/steen-slot-2/steen-2a; LVL-0004/harborMap/harborMap-slot-3/harborMap-3b |
| Denk aan de tafel van 2. | 20 | strategy cue | LVL-0001/wind/wind-slot-1/wind-1b; LVL-0002/fireBowl/fireBowl-slot-3/fireBowl-3a; LVL-0007/islandMap/islandMap-slot-2/islandMap-2a |
| Zoek groepjes van hetzelfde aantal. | 18 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-2/anubis-statue-2a; LVL-0027/tabletCase/tablet-case-slot-2/tablet-case-2a; LVL-0027/modelBoat/model-boat-slot-2/model-boat-2a |
| Zoek hoeveel groepjes er zijn. | 18 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-2/anubis-statue-2b; LVL-0027/tabletCase/tablet-case-slot-2/tablet-case-2b; LVL-0027/modelBoat/model-boat-slot-2/model-boat-2b |
| Welke tafel hoort hierbij? | 18 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-3/anubis-statue-3a; LVL-0027/tabletCase/tablet-case-slot-3/tablet-case-3a; LVL-0027/modelBoat/model-boat-slot-3/model-boat-3a |
| Verdeel het totaal in gelijke groepjes. | 17 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-3/anubis-statue-3b; LVL-0027/tabletCase/tablet-case-slot-3/tablet-case-3b; LVL-0027/modelBoat/model-boat-slot-3/model-boat-3b |
| Verdeel het totaal in even grote groepen. | 16 | generic/template, strategy cue | LVL-0021/opticsTable/optics-table-slot-4/optics-table-4b; LVL-0021/mechanicalModel/mechanical-model-slot-1/mechanical-model-1a; LVL-0021/centralCodex/central-codex-slot-1/central-codex-1a |
| Welke som uit de tafel van 7 helpt? | 11 | strategy cue | LVL-0001/wind/wind-slot-1/wind-1a; LVL-0004/harborMap/harborMap-slot-3/harborMap-3a; LVL-0004/brassTelescope/brassTelescope-slot-2/brassTelescope-2a |
| Welke som uit de tafel van 9 helpt? | 11 | strategy cue | LVL-0002/mapTable/mapTable-slot-4/mapTable-4b; LVL-0004/harborMap/harborMap-slot-1/harborMap-1a; LVL-0006/miniSub/miniSub-slot-3/miniSub-3b |
| Welke som uit de tafel van 5 helpt? | 10 | strategy cue | LVL-0001/zon/zon-slot-4/zon-4b; LVL-0001/steen/steen-slot-3/steen-3a; LVL-0002/fireBowl/fireBowl-slot-2/fireBowl-2b |
| Welke som uit de tafel van 8 helpt? | 9 | strategy cue | LVL-0003/gateShield/gateShield-slot-1/gateShield-1b; LVL-0004/harborMap/harborMap-slot-1/harborMap-1b; LVL-0004/nautilusLight/nautilusLight-slot-2/nautilusLight-2a |
| Welke som uit de tafel van 6 helpt? | 8 | strategy cue | LVL-0001/wind/wind-slot-2/wind-2b; LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4a; LVL-0005/logbookDesk/logbookDesk-slot-2/logbookDesk-2b |

#### hint_minnie: explicit answer-reveal matches

| Variant | Exact hint |
| --- | --- |

#### hint_moose: recurring exact hints

| Exact hint | Count | Flags | Example references |
| --- | --- | --- | --- |
| Splits de keersom in twee makkelijke stukken. | 98 | generic/template, strategy cue | LVL-0021/opticsTable/optics-table-slot-1/optics-table-1a; LVL-0021/opticsTable/optics-table-slot-1/optics-table-1b; LVL-0021/mechanicalModel/mechanical-model-slot-1/mechanical-model-1b |
| Gebruik daarna de kleine wijzer om het uur te vinden. | 56 | generic/template, strategy cue | LVL-0023/waterClock/water-clock-slot-1/water-clock-1a; LVL-0023/waterClock/water-clock-slot-1/water-clock-1b; LVL-0023/waterClock/water-clock-slot-2/water-clock-2a |
| Zoek welk getal keer de deler het totaal maakt. | 42 | generic/template | LVL-0021/opticsTable/optics-table-slot-2/optics-table-2a; LVL-0021/opticsTable/optics-table-slot-3/optics-table-3b; LVL-0021/mechanicalModel/mechanical-model-slot-2/mechanical-model-2b |
| Kijk naar de klanken en kies de spelling die klopt. | 36 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-4/anubis-statue-4a; LVL-0027/anubisStatue/anubis-statue-slot-4/anubis-statue-4b; LVL-0027/tabletCase/tablet-case-slot-4/tablet-case-4a |
| Maak er eerst een keersom van en reken die rustig uit. | 34 | generic/template, strategy cue | LVL-0021/opticsTable/optics-table-slot-2/optics-table-2b; LVL-0021/opticsTable/optics-table-slot-3/optics-table-3a; LVL-0021/mechanicalModel/mechanical-model-slot-3/mechanical-model-3a |
| Gebruik de omgekeerde keersom met de deler. | 18 | generic/template, strategy cue | LVL-0021/opticsTable/optics-table-slot-4/optics-table-4b; LVL-0021/mechanicalModel/mechanical-model-slot-1/mechanical-model-1a; LVL-0021/centralCodex/central-codex-slot-1/central-codex-1a |
| Maak er eerst een keersom van. | 18 | generic/template | LVL-0027/anubisStatue/anubis-statue-slot-2/anubis-statue-2a; LVL-0027/tabletCase/tablet-case-slot-2/tablet-case-2a; LVL-0027/modelBoat/model-boat-slot-2/model-boat-2a |
| Vermenigvuldig het aantal vakken met het aantal tekens. | 18 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-2/anubis-statue-2b; LVL-0027/tabletCase/tablet-case-slot-2/tablet-case-2b; LVL-0027/modelBoat/model-boat-slot-2/model-boat-2b |
| Gebruik de omgekeerde keersom. | 16 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-3/anubis-statue-3b; LVL-0027/tabletCase/tablet-case-slot-3/tablet-case-3b; LVL-0027/modelBoat/model-boat-slot-3/model-boat-3b |
| Reken in groepjes en controleer je antwoord. | 15 | generic/template, strategy cue | LVL-0027/anubisStatue/anubis-statue-slot-1/anubis-statue-1b; LVL-0027/modelBoat/model-boat-slot-1/model-boat-1b; LVL-0027/reliefPanel/relief-panel-slot-1/relief-panel-1b |
| Reken 4 × 4 en verdubbel dat. | 9 | strategy cue | LVL-0001/zon/zon-slot-1/zon-1b; LVL-0003/harborMap/harborMap-slot-1/harborMap-1b; LVL-0003/mooringRope/mooringRope-slot-1/mooringRope-1b |
| Reken 4 × 7 en verdubbel dat. | 9 | strategy cue | LVL-0002/mapTable/mapTable-slot-3/mapTable-3a; LVL-0004/nautilusLight/nautilusLight-slot-1/nautilusLight-1b; LVL-0006/divingSuit/divingSuit-slot-1/divingSuit-1b |

#### hint_moose: explicit answer-reveal matches

| Variant | Exact hint |
| --- | --- |
| LVL-0001/zon/zon-slot-4/zon-4b | Omdat 5 × 7 = 35, is 35 : 5 = 7. |
| LVL-0001/steen/steen-slot-3/steen-3a | Omdat 5 × 4 = 20, is 20 : 5 = 4. |
| LVL-0001/wind/wind-slot-1/wind-1a | Omdat 7 × 2 = 14, is 14 : 7 = 2. |
| LVL-0001/wind/wind-slot-2/wind-2a | Omdat 4 × 9 = 36, is 36 : 4 = 9. |
| LVL-0001/wind/wind-slot-2/wind-2b | Omdat 6 × 4 = 24, is 24 : 6 = 4. |
| LVL-0002/shieldWall/shieldWall-slot-1/shieldWall-1a | Omdat 3 × 6 = 18, is 18 : 3 = 6. |
| LVL-0002/shieldWall/shieldWall-slot-4/shieldWall-4a | Omdat 2 × 3 = 6, is 6 : 2 = 3. |
| LVL-0002/mapTable/mapTable-slot-1/mapTable-1b | Omdat 4 × 8 = 32, is 32 : 4 = 8. |
| LVL-0002/mapTable/mapTable-slot-4/mapTable-4b | Omdat 9 × 3 = 27, is 27 : 9 = 3. |
| LVL-0002/fireBowl/fireBowl-slot-2/fireBowl-2b | Omdat 5 × 3 = 15, is 15 : 5 = 3. |
| LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4a | Omdat 6 × 7 = 42, is 42 : 6 = 7. |
| LVL-0003/gateShield/gateShield-slot-1/gateShield-1b | Omdat 8 × 4 = 32, is 32 : 8 = 4. |
| LVL-0004/harborMap/harborMap-slot-1/harborMap-1a | Omdat 9 × 7 = 63, is 63 : 9 = 7. |
| LVL-0004/harborMap/harborMap-slot-1/harborMap-1b | Omdat 8 × 7 = 56, is 56 : 8 = 7. |
| LVL-0004/harborMap/harborMap-slot-3/harborMap-3a | Omdat 7 × 9 = 63, is 63 : 7 = 9. |
| LVL-0004/brassTelescope/brassTelescope-slot-2/brassTelescope-2a | Omdat 7 × 7 = 49, is 49 : 7 = 7. |
| LVL-0004/nautilusLight/nautilusLight-slot-2/nautilusLight-2a | Omdat 8 × 8 = 64, is 64 : 8 = 8. |
| LVL-0004/nautilusLight/nautilusLight-slot-4/nautilusLight-4b | Omdat 8 × 5 = 40, is 40 : 8 = 5. |
| LVL-0005/captainChart/captainChart-slot-3/captainChart-3a | Omdat 7 × 9 = 63, is 63 : 7 = 9. |
| LVL-0005/mainPorthole/mainPorthole-slot-4/mainPorthole-4a | Omdat 5 × 9 = 45, is 45 : 5 = 9. |
| LVL-0005/logbookDesk/logbookDesk-slot-2/logbookDesk-2b | Omdat 6 × 7 = 42, is 42 : 6 = 7. |
| LVL-0006/miniSub/miniSub-slot-1/miniSub-1a | Omdat 3 × 9 = 27, is 27 : 3 = 9. |
| LVL-0006/miniSub/miniSub-slot-3/miniSub-3b | Omdat 9 × 4 = 36, is 36 : 9 = 4. |
| LVL-0006/controlPanel/controlPanel-slot-1/controlPanel-1a | Omdat 8 × 6 = 48, is 48 : 8 = 6. |
| LVL-0006/controlPanel/controlPanel-slot-2/controlPanel-2b | Omdat 9 × 2 = 18, is 18 : 9 = 2. |
| LVL-0007/escapeBoat/escapeBoat-slot-3/escapeBoat-3a | Omdat 8 × 2 = 16, is 16 : 8 = 2. |
| LVL-0007/islandMap/islandMap-slot-3/islandMap-3a | Omdat 8 × 2 = 16, is 16 : 8 = 2. |
| LVL-0008/diamondSword/diamondSword-slot-2/diamondSword-2b | Omdat 10 × 7 = 70, is 70 : 10 = 7. |
| LVL-0008/creeperMask/creeperMask-slot-1/creeperMask-1a | Omdat 9 × 3 = 27, is 27 : 9 = 3. |
| LVL-0008/creeperMask/creeperMask-slot-2/creeperMask-2a | Omdat 5 × 9 = 45, is 45 : 5 = 9. |
| LVL-0008/creeperMask/creeperMask-slot-3/creeperMask-3a | Omdat 10 × 8 = 80, is 80 : 10 = 8. |
| LVL-0009/worldMap/worldMap-slot-2/worldMap-2a | Omdat 5 × 9 = 45, is 45 : 5 = 9. |
| LVL-0009/openBook/openBook-slot-3/openBook-3a | Omdat 3 × 9 = 27, is 27 : 3 = 9. |
| LVL-0009/crystalCase/crystalCase-slot-2/crystalCase-2a | Omdat 9 × 5 = 45, is 45 : 9 = 5. |
| LVL-0010/sandCastle/sandCastle-slot-4/sandCastle-4a | Omdat 8 × 8 = 64, is 64 : 8 = 8. |
| LVL-0010/woodenBoat/woodenBoat-slot-2/woodenBoat-2a | Omdat 7 × 3 = 21, is 21 : 7 = 3. |
| LVL-0011/potionTable/potionTable-slot-2/potionTable-2b | Omdat 7 × 4 = 28, is 28 : 7 = 4. |
| LVL-0011/potionTable/potionTable-slot-3/potionTable-3b | Omdat 3 × 2 = 6, is 6 : 3 = 2. |
| LVL-0011/potionTable/potionTable-slot-4/potionTable-4b | Omdat 3 × 4 = 12, is 12 : 3 = 4. |
| LVL-0011/netherOrb/netherOrb-slot-4/netherOrb-4b | Omdat 7 × 8 = 56, is 56 : 7 = 8. |
| LVL-0011/netherMap/netherMap-slot-1/netherMap-1a | Omdat 9 × 3 = 27, is 27 : 9 = 3. |
| LVL-0012/homeMap/homeMap-slot-1/homeMap-1b | Omdat 9 × 4 = 36, is 36 : 9 = 4. |
| LVL-0012/homeMap/homeMap-slot-2/homeMap-2a | Omdat 7 × 3 = 21, is 21 : 7 = 3. |
| LVL-0012/purplePortal/purplePortal-slot-1/purplePortal-1b | Omdat 9 × 4 = 36, is 36 : 9 = 4. |
| LVL-0012/purplePortal/purplePortal-slot-4/purplePortal-4a | Omdat 6 × 6 = 36, is 36 : 6 = 6. |
| LVL-0013/canalClock/canal-clock-slot-4/nl-clock-4a | De kleine wijzer staat bijna bij de 7, dus het is kwart voor zeven. |
| LVL-0014/telescope/telescope-slot-1/telescope-1a | Omdat 6 × 4 = 24, is 24 : 6 = 4. |
| LVL-0014/telescope/telescope-slot-2/telescope-2b | Omdat 6 × 7 = 42, is 42 : 6 = 7. |
| LVL-0014/telescope/telescope-slot-3/telescope-3a | Omdat 6 × 8 = 48, is 48 : 6 = 8. |
| LVL-0014/postbox/postbox-slot-2/postbox-2a | Omdat 10 × 2 = 20, is 20 : 10 = 2. |
| LVL-0015/marketStall/market-stall-slot-1/market-stall-1b | Omdat 5 × 4 = 20, is 20 : 5 = 4. |
| LVL-0015/villageClock/village-clock-slot-2/fr-clock-2b | Vijf minuten voor het halve uur zeg je vijf voor half twee. |
| LVL-0015/fountain/fountain-slot-3/fountain-3a | Omdat 3 × 5 = 15, is 15 : 3 = 5. |
| LVL-0015/fountain/fountain-slot-4/fountain-4b | Omdat 10 × 7 = 70, is 70 : 10 = 7. |
| LVL-0016/colosseum/colosseum-slot-4/colosseum-4b | Omdat 9 × 6 = 54, is 54 : 9 = 6. |
| LVL-0016/romanFountain/roman-fountain-slot-3/roman-fountain-3a | Omdat 4 × 6 = 24, is 24 : 4 = 6. |
| LVL-0016/gelatoCart/gelato-cart-slot-2/gelato-cart-2b | Omdat 5 × 6 = 30, is 30 : 5 = 6. |
| LVL-0017/alpineFountain/alpine-fountain-slot-3/alpine-fountain-3a | Omdat 8 × 2 = 16, is 16 : 8 = 2. |
| LVL-0017/alpineFountain/alpine-fountain-slot-3/alpine-fountain-3b | Omdat 7 × 2 = 14, is 14 : 7 = 2. |
| LVL-0017/cableCar/cable-car-slot-3/cable-car-3b | Omdat 3 × 6 = 18, is 18 : 3 = 6. |
| LVL-0018/staveChurch/stave-church-slot-1/stave-church-1b | Omdat 4 × 3 = 12, is 12 : 4 = 3. |
| LVL-0018/lighthouse/lighthouse-slot-2/lighthouse-2a | Omdat 9 × 9 = 81, is 81 : 9 = 9. |
| LVL-0018/lighthouse/lighthouse-slot-2/lighthouse-2b | Omdat 5 × 6 = 30, is 30 : 5 = 6. |
| LVL-0018/vikingShip/viking-ship-slot-2/viking-ship-2a | Omdat 4 × 4 = 16, is 16 : 4 = 4. |
| LVL-0019/maypole/maypole-slot-4/maypole-4b | Omdat 5 × 2 = 10, is 10 : 5 = 2. |
| LVL-0019/harborClock/harbor-clock-slot-1/se-clock-1a | De grote wijzer op de 2 betekent tien over negen. |
| LVL-0020/mapBoard/map-board-slot-3/map-board-3a | Omdat 7 × 9 = 63, is 63 : 7 = 9. |
| LVL-0020/mapBoard/map-board-slot-3/map-board-3b | Omdat 6 × 9 = 54, is 54 : 6 = 9. |
| LVL-0020/mapBoard/map-board-slot-4/map-board-4b | Omdat 2 × 7 = 14, is 14 : 2 = 7. |
| LVL-0020/telescope/telescope-slot-4/telescope-4a | Omdat 4 × 8 = 32, is 32 : 4 = 8. |
| LVL-0020/telescope/telescope-slot-4/telescope-4b | Omdat 7 × 4 = 28, is 28 : 7 = 4. |

| Hint | Generic/template flags | Strategy flags | Explicit answer-reveal flags | Unclassified by these screens |
| --- | --- | --- | --- | --- |
| hint_minnie | 201 | 807 | 0 | 21 |
| hint_moose | 351 | 717 | 71 | 18 |

### 11. Content-guidance inconsistencies and review flags

- **Spelling inside the math contract:** 36 variants use family spelling and domain math, across LVL-0027, LVL-0028, LVL-0029, LVL-0030, LVL-0031. This is outside the documented non-clock content mix, but passes the current validator (family is not a closed math-family enum).
- **Approximate distribution guidance:** measured differences from the stated targets are listed above; they are not validator failures.
- **Clock and hint language:** answer-revealing learning hints are explicitly allowed. No ambient/narrative companion dialogue was classified as a learning hint.

Clock challenge purity: 0 challenges mix clock and non-clock variants or do not have four slots.

Story prompts with more than two punctuation-delimited sentences: 15. The guidance itself gives a three-sentence positive example, so this is a review flag rather than a hard contradiction.

| Variant | Exact prompt |
| --- | --- |
| LVL-0003/mooringRope/mooringRope-slot-3/mooringRope-3a | Een meertouw is 18 meter lang. De Viking snijdt het in 2 gelijke stukken. Hoe lang is ieder stuk? |
| LVL-0004/nautilusLight/nautilusLight-slot-3/nautilusLight-3a | Een kabel naar de Nautiluslamp is 16 meter lang. Hij wordt in 8 gelijke stukken verdeeld. Hoe lang is ieder stuk? |
| LVL-0005/logbookDesk/logbookDesk-slot-1/logbookDesk-1a | Nemo verdeelt 8 aantekeningen over 4 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina? |
| LVL-0005/logbookDesk/logbookDesk-slot-2/logbookDesk-2a | Nemo verdeelt 36 aantekeningen over 6 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina? |
| LVL-0006/miniSub/miniSub-slot-4/miniSub-4a | Nemo koopt 2 reserveonderdelen voor de minisub. Elk onderdeel kost 6 munten. Hoeveel munten betaalt hij? |
| LVL-0007/islandWheel/islandWheel-slot-2/islandWheel-2b | Een touw bij het stuurwiel is 20 meter lang. Nemo verdeelt het in 4 gelijke stukken. Hoe lang is ieder stuk? |
| LVL-0009/openBook/openBook-slot-2/openBook-2b | Job verdeelt 36 betovertekens over 4 pagina's. Op iedere pagina komen er evenveel. Hoeveel tekens per pagina? |
| LVL-0014/telescope/telescope-slot-1/telescope-1b | Atlas verdeelt 30 sterrenstickers over 6 sterrenkaarten. Op iedere kaart komen er evenveel. Hoeveel stickers per kaart? |
| LVL-0015/fountain/fountain-slot-1/fountain-1a | De dorpsfontein heeft 3 bakken met samen 27 waterlelies. In iedere bak liggen er evenveel. Hoeveel waterlelies liggen in één bak? |
| LVL-0015/fountain/fountain-slot-4/fountain-4a | De dorpsfontein heeft 8 bakken met samen 32 waterlelies. In iedere bak liggen er evenveel. Hoeveel waterlelies liggen in één bak? |
| LVL-0016/gelatoCart/gelato-cart-slot-3/gelato-cart-3b | De ijsverkoper verdeelt 54 ijsbekers over 6 dienbladen. Op ieder blad komen er evenveel. Hoeveel bekers per dienblad? |
| LVL-0017/alpineFountain/alpine-fountain-slot-2/alpine-fountain-2b | Rond de Alpenfontein staan 4 bloembakken met samen 20 bloemen. In iedere bak staan er evenveel. Hoeveel bloemen per bak? |
| LVL-0018/lighthouse/lighthouse-slot-1/lighthouse-1a | De vuurtoren heeft 8 ramen met samen 48 lichtjes. In ieder raam branden er evenveel. Hoeveel lichtjes per raam? |
| LVL-0019/dalaHorse/dala-horse-slot-1/dala-horse-1a | De schilder verdeelt 24 verfstrepen over 6 banen op het Dalapaard. Op iedere baan komen er evenveel. Hoeveel strepen per baan? |
| LVL-0019/dalaHorse/dala-horse-slot-4/dala-horse-4b | De schilder verdeelt 18 verfstrepen over 6 banen op het Dalapaard. Op iedere baan komen er evenveel. Hoeveel strepen per baan? |

Multiple-choice variants with lowercase-leading textual choices: 0.

| Variant | Choices |
| --- | --- |

Simple explicit equation/answer discrepancies: 0. This check covers only parseable first integer binary equations; it is not a proof of story semantics or distractor quality.

| Variant | Answer | Explanation |
| --- | --- | --- |

Clock answers differing from the canonical five-minute Dutch wording pattern: 0. Accented één and unaccented een are treated as equivalent for this check; their exact authored spelling remains unchanged in the catalog.

| Variant | Visual | Authored answer | Preferred wording (derived) |
| --- | --- | --- | --- |

## Recommendations for later discussion — no edits performed

- Review the measured mix and per-adventure table coverage against the intended learner goals before changing any questions.
- Decide whether the spelling content is intentional and whether the canonical guidance should explicitly describe it; do not silently remove or relabel it.
- Review repeated templates together with their visuals, answers, active state and adventure role; a repeated clock prompt alone does not imply duplicate learning content.
- Use the complete hints and flagged rows to discuss the desired balance of general prompts, concrete strategies and permitted answer assistance.
- Treat automatic flags as a review queue. This export does not establish scene-image accuracy, every distractor’s plausibility, or a comprehensive linguistic judgment.

## Export validation and provenance

Current validator: PASS — 31 production levels and 1 developer level. All 108 production challenges have exactly four slots and two variants in every slot. Count identity: 108 × 4 = 432; 432 × 2 = 864. Inactive coverage: 17 challenges and 136 variants.

Structural/linkage export anomalies: 0. None.

Every CSV raw variant is round-trip compared with a fresh evaluation of its exact source level. Challenge metadata, slot metadata, rune links, object data and all individual text/answer fields are also checked. Markdown level/challenge/slot/variant heading counts are asserted. Source SHA-256 values are recorded below; tracked level/runtime/script/canonical input files are checked unchanged after generation.

| Source | SHA-256 | Challenges | Slots | Variants |
| --- | --- | --- | --- | --- |
| Levels/LVL-0000/level.js | 00612eae69d14d8609c10d8c243c4d131c0f2563f415b4e8acaa01716beec097 | 0 | 0 | 0 |
| Levels/LVL-0001/level.js | b8d457268146a1d7efb5496e267c340e33f9a6ebcb48fd6d47bb4a3b3f8e5c58 | 3 | 12 | 24 |
| Levels/LVL-0002/level.js | 1c0ef1a662599b88aa3f6aee7569adda1242952d6c4ab3a6333a9eb5c78ab053 | 4 | 16 | 32 |
| Levels/LVL-0003/level.js | 4ab23ad11c36ab9ebee7965c21076be00659cc2c39579ddeaf9f0e0d55d0ae82 | 4 | 16 | 32 |
| Levels/LVL-0004/level.js | 69a43c6b2ed78856dcb2991b53b6eeac4f09a4658f5995ae79148bbace3d4f65 | 3 | 12 | 24 |
| Levels/LVL-0005/level.js | e482ab02f02150ca6d85601c90be9753a541d2d4ff8545cb04266144ff1c69db | 3 | 12 | 24 |
| Levels/LVL-0006/level.js | 6569e50308e463e2a4115ae57e6e9cedac60dc68694a9ea140be634e4ead4063 | 3 | 12 | 24 |
| Levels/LVL-0007/level.js | 60e31542f326b6f04e96d08c7c5483b18c2675d8f4cfc23f66031ba3c714012c | 3 | 12 | 24 |
| Levels/LVL-0008/level.js | 63666b04c4e8e86e5e68fe0d66e81b2a663107c9f77919b48002e16cfb9fe226 | 3 | 12 | 24 |
| Levels/LVL-0009/level.js | b3524f1eccbfd1f1aac2897660c85d8674ef8864595f64d326bf574f41b9188d | 3 | 12 | 24 |
| Levels/LVL-0010/level.js | 605bb2329c91603041e0a90da764cbc9a5bdf5a9a6cc05dc99ec8fe35106b083 | 3 | 12 | 24 |
| Levels/LVL-0011/level.js | 0a1369bec646993b20f90b66bc5a69866eda6b982c8885da523a56f79e56796d | 3 | 12 | 24 |
| Levels/LVL-0012/level.js | 3a90f4c40aa8348db4a1bbdfc30c0f4a689cd64b8c979f84fc46eb9ab199dc2b | 3 | 12 | 24 |
| Levels/LVL-0013/level.js | 0268d757bd0228d281b3ef2a9916698be617403d12e1445917605fff1eae9d23 | 3 | 12 | 24 |
| Levels/LVL-0014/level.js | eab7faef4cdf27b06dc045aa849b2d0d73a2cdfd6440407a3e2d809fbcb11a24 | 3 | 12 | 24 |
| Levels/LVL-0015/level.js | 71d382b900a2012ccf9e9c5fefc620f73fad4e62713e083d52031cdc5b943a11 | 3 | 12 | 24 |
| Levels/LVL-0016/level.js | 0e00fb826ef30254584fee1fac90d45905e2dc0e758a39f5f7aaa0fbcf9c8539 | 3 | 12 | 24 |
| Levels/LVL-0017/level.js | 6ffbe59c3ccf5809162fdcc8349ef26b1576dde9a74631bc6424ac330dc17782 | 3 | 12 | 24 |
| Levels/LVL-0018/level.js | 400471fd24a648bb87263e106231a93a4949b626c23560f8784feb7db53c08d2 | 3 | 12 | 24 |
| Levels/LVL-0019/level.js | fad820f40e17de56522713cc1ced7c951636a40d8273e01efc72879eea6b9fc5 | 3 | 12 | 24 |
| Levels/LVL-0020/level.js | ae7b3b1bf60c160f6836051b9f63bb8dd64d450f5768c2565403a39ec82005e1 | 3 | 12 | 24 |
| Levels/LVL-0021/level.js | 1af80154a0cc9da026a9ecfdde606a85403ed25bdd203eea98cf84f4766b17ba | 4 | 16 | 32 |
| Levels/LVL-0022/level.js | a220f38f767d35797fbf58d9684beb1373ccc66197404e7926c8254fda4bb401 | 4 | 16 | 32 |
| Levels/LVL-0023/level.js | 409c828dea0c9be8ce265ad01b73cb101945ca2971b5c4ff5c4ec60157897fd1 | 5 | 20 | 40 |
| Levels/LVL-0024/level.js | 702bc42d195d7461f880f0ffd7e5cfe92dcccc95ffa56b15f33722d1f0e3d793 | 4 | 16 | 32 |
| Levels/LVL-0025/level.js | 5c6c2e0057630742f69124b7b7677abf6de724a9edf3ab7db9763cf9323c6dac | 4 | 16 | 32 |
| Levels/LVL-0026/level.js | c016a916c07129cb9e5f905a783248144e49a5412137196121977365fd42af3b | 5 | 20 | 40 |
| Levels/LVL-0027/level.js | 6d4997e13a98dc20f7b7ed0e2055c7247a7ee5db426e03c06db36b7ebf98da0a | 4 | 16 | 32 |
| Levels/LVL-0028/level.js | 03a6687343e075b21f9c350793f5391fa0082f0523674b3ccb2d13b6c1813899 | 4 | 16 | 32 |
| Levels/LVL-0029/level.js | 54e2482ecebb4ffd97990e1c8ce9dce9bfa277997eff9d7e11b1969903f223e8 | 4 | 16 | 32 |
| Levels/LVL-0030/level.js | cecfa2cac6dc207fbde3bb4f445c425d52f0f6fa0a22c3ed1175149d67935276 | 4 | 16 | 32 |
| Levels/LVL-0031/level.js | 79e79d4934c6566a208ce9962574140350a94f4897e408ba0fd9e1cd0448ddba | 4 | 16 | 32 |
