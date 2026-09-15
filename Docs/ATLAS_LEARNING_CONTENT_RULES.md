# Atlas Learning Content Rules

## Purpose

This document defines the authored challenge-content rules for Atlas Learning.

Atlas is an adventure-first browser game for Sven. Learning content should support practice, especially multiplication-table automation, without making the game feel like a school test.

Runtime content is authored ahead of time. Atlas does not use runtime AI or a runtime question generator.

This is the canonical learning-content document. [Level Contract](LEVEL_CONTRACT.md) owns schema/linkage and active challenges; [Dev Tools](DEV_TOOLS.md) owns validation workflow; [Editor and Effects](EDITOR_AND_EFFECTS.md) owns editing. Unless explicitly labeled below, language, difficulty and distribution rules are authoring guidance, not runtime rejection rules.

## Target learner

* Dutch child, age 8–9
* End group 5 / E5-intended level
* Runtime language: Dutch
* Main current learning focus: multiplication-table automation, inverse division facts, clock reading, and simple applied story problems

## Core principle

Atlas should feel like an adventure game.

Sven should see:

* objects
* characters
* short challenges
* hints from Minnie and Moose
* progress through the scene

Sven should not see:

* schoolBand labels
* skill metadata
* formal scores
* Cito/AVI claims
* dashboards
* visible internal IDs

## Challenge structure

Each authored `learningChallenges` entry (including Europe content) has:

* 4 question slots
* 2 authored variants per question slot

The 4 question slots are not variants.
Each slot represents a required question position inside the challenge.
Each slot may randomly select one authored variant when the question starts.

The selected variant remains stable for the current question. Wrong answers, hints and rerenders do not reselect it; assisted completion resolves that same selected variant before advancing.

The restrictions on companions acting as teachers apply to ambient/narrative `companionMoments`. Authored `hintMinnie` and `hintMoose` learning hints intentionally may explain a strategy or answer. Keep these roles distinct; see [Companion Authoring Guide](COMPANION_AUTHORING_GUIDE.md).

The player-facing principles above do not prohibit the existing separate Voortgang/session report or developer previews. Keep internal metadata out of the ordinary challenge presentation.

## Content mix for non-clock questions

Clock questions are excluded from this percentage mix. If a level has a clock challenge, that clock challenge should contain 4 clock-reading questions.

For non-clock question variants, aim roughly for this balance:

| Question type                            | Target |
| ---------------------------------------- | -----: |
| Bare multiplication, open answer         |    25% |
| Bare multiplication, multiple choice     |    25% |
| Story multiplication, open answer        |    10% |
| Story multiplication, multiple choice    |    10% |
| Bare division, open answer               |     5% |
| Bare division, multiple choice           |    10% |
| Story division, open answer              |     5% |
| Story division, multiple choice          |     5% |
| Route, money, or other applied questions |     5% |

This is a content-guidance target, not a strict runtime rule.

## Multiplication focus

Prioritize multiplication-table automation.

Preferred tables:

6
7
8
9

Also include regular mixed review of:

2
3
4
5
10

Across a full adventure, aim for approximately 60% of multiplication and division practice to target tables 6–9. The remaining practice should regularly revisit tables 2–5 and 10 so that Atlas supports mixed retrieval rather than only repeated practice of the harder tables.

Good bare multiplication examples:

7 × 8 = ?
6 × 9 = ?
8 × 4 = ?
9 × 5 = ?

Good Minnie hints:

```text
Denk aan de tafel van 8.
Kijk naar 7 groepjes van 8.
```

Good Moose hints:

```text
Splits het op: 5 × 8 en 2 × 8.
7 × 8 is 56, dus het antwoord is 56.
```

## Division focus

Use division mainly as inverse table practice.

Good bare division examples:

```text
56 ÷ 7 = ?
63 ÷ 9 = ?
48 ÷ 8 = ?
42 ÷ 6 = ?
```

Good Minnie hints:

```text
Welke tafel hoort hierbij?
Zoek het tafelantwoord dat bij 56 past.
```

Good Moose hints:

```text
Zoek hoeveel keer 7 in 56 past.
Omdat 7 × 8 = 56, is 56 ÷ 7 = 8.
```

## Story problem rules

Story problems should be short and concrete.

Rules:

* Dutch
* 1 or 2 short sentences
* one calculation step
* explicit numbers
* concrete objects from the scene
* no filler lines
* no unnecessary narrative decoration
* no Runenpoort/rune wording in Europe levels
* do not ask Sven to count exact objects in the background image

Good:

```text
Op elke plank liggen 8 kazen. Er zijn 5 planken. Hoeveel kazen zijn dat samen?
```

Avoid:

```text
De wieken draaien boven de tulpen.
De rune wil nog een som.
Tel alle dingen die je in het plaatje ziet.
```

## Multiple choice rules

Multiple choice options must:

* include the correct answer exactly
* have no duplicate choices
* be plausible but not unfair
* not rely on trick wording

Textual answer labels shown to the player should start with a capital letter.

Examples:

```text
Kwart over vier
Half acht
Tien over drie
```

Numeric choices may remain numeric.

## Clock-reading rules

Clock questions use a code-rendered SVG clock visual.

Do not ask Sven to read the background image clock.

Clock visual rules:

* use Arabic numerals 1–12
* no minute tick marks
* no Roman numerals
* no decorative marks that look like ticks
* correct minute hand rotation
* proportional hour hand rotation
* large enough for iPad

Clock challenge data uses:

```js
visual: { type: "clock", hour, minute }
```

Clock answers should use Dutch time language, not digital notation.

Do not use:

* `04:15`
* `16:40`
* 24-hour notation

Use Dutch school-style time language:

| Time | Preferred answer    |
| ---- | ------------------- |
| 3:00 | Drie uur            |
| 3:05 | Vijf over drie      |
| 3:10 | Tien over drie      |
| 3:15 | Kwart over drie     |
| 3:20 | Tien voor half vier |
| 3:25 | Vijf voor half vier |
| 3:30 | Half vier           |
| 3:35 | Vijf over half vier |
| 3:40 | Tien over half vier |
| 3:45 | Kwart voor vier     |
| 3:50 | Tien voor vier      |
| 3:55 | Vijf voor vier      |

Example:

```text
16:40 = Tien over half vijf
```

Prefer this over:

```text
Twintig voor vijf
```

## Clock hint examples

For `Kwart over vier`:

```text
Minnie: Kijk eerst naar de grote wijzer.
Moose: De grote wijzer staat op de 3. Dat betekent kwart over. De kleine wijzer staat net na de 4.
```

For `Half acht`:

```text
Minnie: De grote wijzer staat op de 6. Dat betekent half.
Moose: De kleine wijzer staat tussen 7 en 8. In het Nederlands zeg je dan half acht.
```

For `Tien over half vijf`:

```text
Minnie: De grote wijzer staat op de 8.
Moose: De grote wijzer op de 8 betekent tien minuten na half. De kleine wijzer staat tussen 4 en 5, dus het is tien over half vijf.
```

## Route, money, and other applied questions

These are allowed, but should stay limited.

Use them to keep the adventure varied, not to replace table practice.

Examples:

```text
Een kaartje kost 4 euro. Sven koopt 5 kaartjes. Hoeveel euro betaalt hij?
```

```text
De route is 72 meter lang. Sven verdeelt hem in 8 gelijke stukken. Hoeveel meter is elk stuk?
```

## Enforcement boundaries

### Runtime behavior

The existing [challenge runtime](../src/app.js) selects an authored variant for the current question and reuses it through attempts/hints/redraws. It handles open versus multiple-choice answers and renders SVG clocks from authored hour/minute data. Active-state filtering, completion and exit readiness use the shared rules in [Level Contract](LEVEL_CONTRACT.md#active-challenges-and-progression). The runtime does not rebalance content percentages or rewrite language to meet guidance.

### Authoring validation

[`scripts/validate-levels.js`](../scripts/validate-levels.js) checks authored challenge data before release; these checks are not a claim that the browser performs the same complete schema validation on load:

- Exactly four slots per authored challenge and two variants per slot, unique slot/variant IDs within the challenge, required fields and valid anchor/character references.
- `domain: "math"`, `schoolBand: "E5-intended"`, supported presentation/answer modes, and finite numeric or nonempty string answers.
- Multiple-choice sets with at least two options, the exact answer included, and no case-insensitive duplicate choices.
- Clock visuals with integer hour 1-12 and minute 0-59, multiple-choice mode, and capitalized string answers/choices. The validator explicitly rejects digital notation in the clock answer; editorial review must also check every choice and the actual Dutch wording.
- Optional boolean challenge `active` and Europe-specific forbidden rune/filler wording.

The validator does not establish arithmetic/story plausibility, exact Dutch time-language correctness, scene relevance, percentage targets or the 60% preferred-table mix. Check those through content review and targeted audits. Four-choice clock examples and historical review totals are not universal runtime schema requirements.

### Review and regression evidence

Verify the intended content mix, one-step wording, correct arithmetic, plausible distractors, source-independent clock reading and useful hints. Test stable variants, active-state progression, answer handling and actual SVG output with relevant existing browser tests. Generated question audit documents are snapshots, not additional rules; regenerate only deliberately because their script writes reports.
