# Atlas Learning Content Rules

## Purpose

This document defines the authored challenge-content rules for Atlas Learning.

Atlas is an adventure-first browser game for Sven. Learning content should support confident E5 practice and gradual M6 learning without making the game feel like a school test. Multiplication-table automation remains an important part of the E5 baseline.

Runtime content is authored ahead of time. Atlas does not use runtime AI or a runtime question generator.

This is the canonical learning-content document. It owns educational authoring principles, difficulty meaning, support quality, visual-learning principles and editorial audit expectations. [Level Contract](LEVEL_CONTRACT.md) owns schema, runtime selection, routing and lifecycle; [Dev Tools](DEV_TOOLS.md) owns tooling and validation workflow; [Central M6 Bank](M6_CONTENT_BANK.md) owns the technical bank contract and current implementation inventory; [Editor and Effects](EDITOR_AND_EFFECTS.md) owns editing. Unless explicitly labeled below, language, difficulty and distribution rules are authoring guidance, not runtime rejection rules.

## Target learner

* Dutch child, age 8–9
* Transitioning from End Group 5 towards Mid Group 6
* Runtime language: Dutch
* E5 is the established practice baseline: multiplication-table automation, inverse division facts, clock reading and familiar applied problems
* M6 introduces and teaches Mid Group 6 concepts gradually through the central bank

Atlas is not a static E5-only bank. The default runtime mix is 90% E5 / 10% M6, with delivered M6 restricted to Instap. Increasing the M6 slider increases M6 frequency and progressively opens higher M6 difficulty levels according to the existing [runtime selection contract](LEVEL_CONTRACT.md#learning-level-and-mix-selection). The policy table belongs to that runtime contract, not to this authoring guide.

## E5 versus M6 content progression

Representation does **not** determine learning level. Analogue versus digital clocks, multiple choice versus open answers, story versus bare arithmetic, the presence of a visual, and large-looking numbers alone are presentation or task-form properties. None automatically classifies a question as E5 or M6.

Classify the actual educational demand:

| E5 — established End Group 5 practice | M6 — Mid Group 6 learning |
| --- | --- |
| Fluent retrieval and application of established knowledge | New or less-established concepts and learning targets |
| Familiar representations and straightforward use of known concepts | More flexible application, including familiar representations |
| Mostly one-step reasoning | Combinations of known skills and multi-step work where pedagogically appropriate |
| Familiar numerical relationships | Less regular values/relationships and reasoning across boundaries |

A question must not be labeled M6 merely because its numbers are larger, its clock is digital, it has a story or rich visual, or it takes longer to read. Conversely, M6 may reuse familiar representations while increasing the actual reasoning demand. Review the learning objective and method, not visual complexity or reading length.

## M6 difficulty: Instap, Normaal, Uitdagend

These labels describe difficulty **within Mid Group 6 content**. They are not E5/M6 labels. Classification is an editorial judgment about the learning objective and required reasoning.

### Difficulty 1 — Instap

Purpose: a safe introduction to a genuine M6 concept.

- One clear new idea or extension, with low incidental complexity.
- Friendly numbers where possible and usually one main reasoning path.
- Two short substeps are appropriate when they directly teach the new concept.
- Approachable with Minnie/Moose support for a learner just entering M6.

Instap must still be meaningfully M6. Do not relabel an ordinary E5 task as Instap to fill the D1 pool. Suitable structures include a first simple application of a new conversion, crossing an hour boundary with manageable values, introductory ratio/fraction reasoning, or a new place-value/application concept with simple numbers. These describe structures to review, not approval to generate production questions.

### Difficulty 2 — Normaal

Purpose: independent application of M6 learning after some exposure to the concept.

- Less friendly values, crossing a boundary or combining familiar subskills.
- Two meaningful reasoning steps.
- Choosing or applying a strategy rather than merely following a direct cue.

### Difficulty 3 — Uitdagend

Purpose: deepen and combine M6 learning without moving beyond the intended M6 curriculum.

- Multiple dependent steps or reverse reasoning.
- Non-unit or indirect relationships and a larger cognitive load.
- Selecting intermediate results or interpreting a remainder in context.
- Planning or combining several quantities or time intervals.

Difficulty must come from mathematical reasoning. Do not manufacture it through verbose wording, trick distractors, irrelevant information, obscure vocabulary or unnecessarily large numbers.

## Pedagogical meaning of the default 90/10 mix

At 90% E5 / 10% M6, the occasional M6 question is a **safe introduction** to M6. Only Difficulty 1 is allowed at this setting. Curating the D1 pool is therefore a content-quality commitment, not merely assigning metadata.

The intended experience is “mostly confident E5 practice, with occasional carefully scaffolded new M6 learning,” not “mostly E5, with a random hard Group 6 question.” The exact slider-dependent policy, selection and fallback rules remain owned by [Level Contract](LEVEL_CONTRACT.md#runenpoort-m6-authored-support); this section does not define a second percentage table.

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

Each local authored `learningChallenges` entry (including Europe content) has:

* 4 question slots
* A nonempty bank of local E5 alternatives per question slot (the original E5 bank has two)

The 4 question slots are not variants.
Each slot represents a required question position inside the challenge.
At entry to a slot, the existing planner selects E5/M6. E5 uses the slot's local alternatives; M6 uses an eligible authored record and surface from the world-independent central bank. An individual central M6 record is not a local four-slot challenge. Eligibility and selection are owned by [Level Contract](LEVEL_CONTRACT.md#learning-level-and-mix-selection).

The selected variant remains stable for the current question. Wrong answers, hints and rerenders do not reselect it; assisted completion resolves that same selected variant before advancing.

Authored multiple-choice order is not gameplay presentation order. After selecting a variant, the runtime copies its choices and applies Fisher–Yates once, storing that order on the active question. Retries, hints, rerenders and responsive layout changes retain the same order. New question instances, including replays, receive a fresh shuffle (which may coincidentally repeat an order). Correctness uses the canonical answer value, independent of position. Open-answer questions are unaffected, and editor/authored arrays retain their original order.

Active challenge progress is run-local. Reloading and starting a level again resets all challenges, counters, help state and question instances; it never resumes completed challenges or a live question/variant/choice order. Earned completion history, learning-table records and session reports remain durable through their existing handlers.

The restrictions on companions acting as teachers apply to ambient/narrative `companionMoments`. Authored `hintMinnie` and `hintMoose` learning hints intentionally teach strategies and useful intermediate steps; the complete solution belongs to full explanation. Keep these roles distinct; see [Companion Authoring Guide](COMPANION_AUTHORING_GUIDE.md). Existing approved wording is preserved until an explicit editorial correction is approved, even when an audit finds that it reveals too much.

The player-facing principles above do not prohibit the existing separate Voortgang/session report or developer previews. Keep internal metadata out of the ordinary challenge presentation.

## E5 baseline content mix for non-clock questions

Clock questions are excluded from this E5 percentage mix. A local E5 clock challenge has four clock-reading positions. When M6 is selected at an explicit clock/time position, the central time domain supplies the eligible question; it need not be an E5-style clock-reading task.

For local E5 non-clock question variants, aim roughly for this balance:

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

This is E5 content guidance, not a strict runtime rule. These percentages **do not define the central M6 bank**. Curate M6 for curriculum/objective coverage, difficulty progression, conceptual diversity and adequate repetition without exact educational-core duplicates. There is no prescribed M6 domain-percentage target.

## E5 multiplication focus

Prioritize multiplication-table automation within the E5 baseline.

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

Across a full adventure, aim for approximately 60% of E5 multiplication and division practice to target tables 6–9. The remaining E5 practice should regularly revisit tables 2–5 and 10 so that Atlas supports mixed retrieval rather than only repeated practice of the harder tables. This does not constrain M6 domain or objective coverage.

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
```

The following historical worked-answer example belongs at full explanation, not as a model for an answer-withholding Moose hint:

```text
7 × 8 is 56, dus het antwoord is 56.
```

## E5 division focus

Use E5 division mainly as inverse table practice. Central M6 division is governed by its objective and reasoning demand, not this practice mix.

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
```

Historical worked-answer example, appropriate at full explanation:

```text
Omdat 7 × 8 = 56, is 56 ÷ 7 = 8.
```

## Story problem rules

Story problems should be short and concrete.

### E5 story problems

- Short and concrete, with a low reading burden.
- Normally one main calculation step using established concepts.
- Aim for one or two short sentences where possible; clarity matters more than a rigid sentence count.

### M6 story problems

- Still concise and concrete.
- May contain multiple dependent calculation steps when the M6 objective requires them.
- Every sentence must contribute to the mathematical situation.
- Do not make the task difficult through reading complexity.

Multi-step M6 reasoning is a normal supported authoring pattern when appropriate for the objective and difficulty. It is not an exception limited to Runenpoort.

### Rules shared by E5 and M6

* Dutch
* explicit numbers
* concrete, understandable objects and situations; world-specific E5 stories should fit their scene, while central M6 surfaces must work independently of the world
* no filler lines
* no unnecessary narrative decoration
* no Runenpoort/rune wording in Europe levels
* do not ask Sven to count exact objects in the background image
* keep the selected context consistent through the question, hints, explanation and visual labels

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

## Authored M6 support: Minnie → Moose → full explanation

This quality contract applies to production M6 content. Support is authored and approved with the question, not invented during play. The existing sequence follows the first, second and third **valid but incorrect** answers; empty or malformed input does not advance it. No direct explanation action bypasses the sequence. Presentation, completion and reporting behavior remain owned by [Level Contract](LEVEL_CONTRACT.md#runenpoort-m6-authored-support).

### Minnie — first wrong answer

Purpose: orient the learner.

- Identify the useful concept or strategy.
- Reduce the problem to a manageable first step and direct attention to relevant information.
- Avoid giving the final answer.
- Usually avoid completing a major intermediate result when the learner can still derive it.

### Moose — second wrong answer

Purpose: provide a concrete next step.

- Build directly on Minnie and make the strategy operational.
- Provide a useful intermediate result when appropriate.
- Leave a meaningful final step for the learner whenever possible.

Avoid weak hints that merely repeat the question, read the visual aloud without interpretation, or say “compare the options and choose the right one.” Existing E5 digital-clock support follows the same teaching principle through its approved shared templates; this section does not replace the E5 resolver.

### Full explanation — third wrong answer

Purpose: teach the complete method.

- Explain the reasoning in understandable steps.
- Show how the answer follows and end with the correct answer.
- Be complete enough for Sven to learn the method, not merely see the result.

The third-stage explanation may fully solve the problem. These quality requirements guide authoring and editorial review; they do not authorize an importer or audit to rewrite previously approved support. Report weaknesses and obtain a separate content correction.

## Visual support and multimodal explanation

Atlas intentionally combines explanatory prose with diagrams, equations, structured calculation blocks, clocks, number lines, fraction strips, tables, currency and measurement visuals. Text and visual content may reinforce the same learning step. Do not remove repeated mathematical information merely because it appears in both forms.

For a fully unlocked worked explanation, this reinforcement is valid:

Text: “Twintig groepjes zijn twee keer zoveel als tien groepjes.”

Visual calculation block:

```text
10 × 18 = 180
180 + 180 = 360
20 × 18 = 360
```

The visual supplies structure, chunking, spatial organization, worked-example anchoring and easier scanning/recall. A `calculationSteps` frame containing equations is legitimate visual support even though its elements are text and mathematical symbols.

Prefer prose for meaning, reasoning and strategy, and visuals for relationships, structure, intermediate states and worked examples. Avoid literally duplicating a full prose sentence in both places, decorative visuals without a learning function, unnecessary clutter, and any visual that reveals a withheld answer too early. Each stage must retain its approved disclosure boundary; a useful complete worked example is not permission to reveal it at Minnie or Moose.

### Question-stage visuals

A question-stage visual should add useful representation or structure: an analogue or digital clock, a table to read, a fraction strip, currency assets, a number line, `20 × 18 = ?` extracted from a story, or a place-value layout.

A large visual block that merely repeats the exact question wording without adding structure is less useful. This is editorial guidance, not a blanket runtime rejection rule. Evaluate the visual's learning function rather than whether its contents include text or repeat mathematical values.

## Clock-reading rules

Analogue versus digital is a representation difference, not the E5/M6 boundary. E5 includes both clock-reading representations and Dutch spoken-time interpretation; M6 focuses on irregular durations, crossing hours, start/end reasoning and minutes/seconds conversion.

The current 60 explicit production E5 time positions each retain exactly two existing variants: the first analogue, the second digital (60 + 60 = 120). The representation/support corrections preserved IDs, times, answers, choices and positions. Both use the shared `src/challenge-capabilities.js` clock renderer.

Do not ask Sven to read the background image clock.

Analogue clock visual rules:

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
// Digital representation: integer hour 0–23, minute 0–59.
visual: { type: "digitalClock", hour, minute }
```

E5 clock-reading answers should use Dutch time language, not digital notation. The displayed digital time is zero-padded HH:MM; M6 calculation questions may have authored HH:MM answers.

Digital clocks use programmatic seven-segment SVG digits, a dark inset display, red segments and a static colon; no external digit font, blinking or raster clock image. Optional `compact`, `highlightHours` and `highlightMinutes` change presentation only. The accessible label is `Digitale klok: HH:MM`. The same renderer handles flat E5 data and authored M6 stage frames.

The existing `src/challenge-hints.js` resolver chooses representation-specific support from `visual.type`. Digital E5 clocks use authored minute-pattern templates: Minnie explains the minutes; Moose connects those minutes to the relevant spoken hour while leaving the final answer combination to the learner; the third wrong attempt supplies the full interpretation and canonical spoken answer. The 60 digital variants contain `:00` (2), `:05` (4), `:15` (8), `:20` (5), `:25` (4), `:30` (6), `:35` (7), `:40` (3), `:45` (9), `:50` (6), and `:55` (6). The user separately approved the `:00` template. There are no production `:10` or 24-hour E5 examples; no unused `:10` template is introduced. Unsupported minute patterns require author review rather than generic fallback.

`resolveExplanation` supplies the digital explanation at display/recording time, preserving the level data and the existing answer's vocabulary, including `een`/`één`. Half-hour wording refers to the next spoken hour; the templates bridge 24-hour notation when needed without adding a day period. `resolveClockVisual` supplies existing `highlightMinutes` at Minnie, `highlightHours` at Moose, and a normal full clock at question/explanation. The hour relation is explained in Moose's text; no second clock, geometry change or added UI is needed. These functions leave M6 and analogue questions untouched. Explicit hint overrides retain precedence. The existing companion, attempt, assisted-completion and report paths remain authoritative.

Focused coverage: `tests/e5-digital-support.spec.js` freezes the 60 digital questions/support, all other E5 hints and protected source files; tests next-hour boundaries and the approved `:00` addition; and rejects unapproved patterns. `tests/e5-digital-support-browser.spec.js` checks real production `:05`, `:25`, `:30`, `:35`, `:45`, `:55` questions, visible emphasis, companion text, full explanations, reopening, stable choices and reporting on desktop and both iPad orientations.

For E5 clock-reading **spoken answer labels**, do not substitute bare digital notation such as:

* `04:15`
* `16:40`
* 24-hour notation

This restriction concerns the E5 answer vocabulary, not the clock visual. Digital E5 displays may use HH:MM, and M6 may use an explicitly authored digital-time answer contract. Use Dutch school-style time language for E5 answers:

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

The following are historical analogue teaching examples, not the literal current hint-resolver output and not digital-clock templates. They preserve earlier reasoning examples. Lines that state the complete spoken answer belong at full explanation, not as recommended answer-withholding first/second hints. Current representation-specific behavior is defined above and in [Reusable hint strategies](#reusable-hint-strategies-lvl-0001lvl-0035).

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

In the E5 baseline, these provide limited variety alongside table practice, following the E5 mix above.

This limit does not apply to central M6. Its applied questions are curated for their learning objectives, curriculum relevance and difficulty progression.

Examples:

```text
Een kaartje kost 4 euro. Sven koopt 5 kaartjes. Hoeveel euro betaalt hij?
```

```text
De route is 72 meter lang. Sven verdeelt hem in 8 gelijke stukken. Hoeveel meter is elk stuk?
```

## Enforcement boundaries

### Runtime behavior

The existing [challenge runtime](../src/app.js) selects an authored variant for the current question and reuses it through attempts/hints/redraws. It handles authored answer contracts and renders SVG clocks from authored hour/minute data. Active-state filtering, completion and exit readiness use the shared rules in [Level Contract](LEVEL_CONTRACT.md#active-challenges-and-progression). The runtime applies the documented E5/M6 selection policy; it does not rewrite the bank, generate exercises, or rebalance its authored domain/content mix to meet editorial guidance.

### Authoring validation

[`scripts/validate-levels.js`](../scripts/validate-levels.js) checks authored challenge data before release; these checks are not a claim that the browser performs the same complete schema validation on load:

- Exactly four slots per authored challenge and at least one variant per slot, unique slot/variant IDs within the challenge, required fields and valid anchor/character references.
- `domain: "math"`, `schoolBand` of `E5-intended` or `M6-intended`, optional strict `learningLevel` (`E5`/`M6`, missing means E5), supported presentation/answer modes, and finite numeric or nonempty string answers.
- Multiple-choice sets with at least two options, the exact answer included, and no case-insensitive duplicate choices.
- Flat E5 clock visuals with integer hour 1–12 (analogue) or 0–23 (digital), minute 0–59, multiple-choice mode, and capitalized string answers/choices. The validator rejects digital notation in the E5 clock-reading answer; editorial review must also check every choice and the actual Dutch wording. M6 staged clock/calculation questions use their explicit answer contracts.
- Optional boolean challenge `active` and Europe-specific forbidden rune/filler wording.

The validator does not establish arithmetic/story plausibility, exact Dutch time-language correctness, scene relevance, educational level, pedagogical difficulty, E5 percentage targets or the E5 60% preferred-table mix. Check those through content review and targeted audits. Four-choice clock examples and historical review totals are not universal runtime schema requirements. Central M6 record validation and capability contracts are owned by [Central M6 Bank](M6_CONTENT_BANK.md); the local four-slot schema above does not make M6 records local level content.

### Review and regression evidence

Verify the E5 practice mix or M6 objective/difficulty coverage as appropriate, level-appropriate reasoning steps and reading burden, correct arithmetic, fair distractors, source-independent clock reading and useful hints/visuals. For implementation or content changes, test stable variants, active-state progression, answer handling and actual visual output with relevant existing checks. Audit findings alone do not authorize changes. Generated question audit documents are snapshots, not additional rules; regenerate only deliberately through the workflow in [Dev Tools](DEV_TOOLS.md#validation-and-tests).

## Reusable hint strategies (LVL-0001–LVL-0035)

The ARC E5 question bank uses structured hintParameters and the shared challenge-hints resolver described in [Level Contract](LEVEL_CONTRACT.md#companion-policy-and-reusable-hint-parameters). The original hint migration preserved all 96 active variants' prompts, answers, choices, answer modes and explanations. The later digital-clock support correction supersedes only the digital interpretation support described above. There are seven strategies: bare multiplication, bare division, multiplication story, sharing-division story, money multiplication, route/length division, and clock reading. Grouping-style division is not present in the current ARC story bank; future grouping questions need a reviewed strategy/override rather than sharing wording.

Attempt one gives Minnie’s structure cue; attempt two gives Moose’s concrete next step without calculating the final answer. Attempt three uses the approved full explanation and existing E5 assisted completion; digital clocks obtain their explanation through the shared resolver. Selection/shuffling, retry stability and learning records are unchanged. Bare multiplication treats the operands commutatively and prefers ×10, ×2, ×4, ×11, ×12, ×5, ×9, ×6, ×7, ×8, then ×3. All current operands have an approved strategy. Unsupported future operands require an explicit reviewed override; do not improvise a clever decomposition. ×5 uses half of ×10, whose intermediate totals are within 100 for this bank.

Analogue clock hints explain the minute hand; half-hour wording asks which hour the small hand is approaching (6:30 → half zeven), without naming the answer. ARC’s other analogue five-minute positions use counting by fives. Its money metadata preserves euro amounts. Route hints omit units rather than inventing units not present in metadata. Minnie and Moose are distinct stages, not two versions of the same cue. Historical migration inventory: Runenpoort (LVL-0001–LVL-0003) also uses these strategies: 88 active variants, replacing 176 explicit hint strings with structured operands and zero overrides. Its two money problems use the authored unit “munten”. Its eight clock_reading_five_minutes variants use specific Dutch minute relationships, including tien voor half, vijf voor half, vijf over half and tien over half; analogue questions leave the small-hand hour for the learner. Analogue ARC clock_reading wording is unchanged; digital variants use the approved digital support above. Batch 1 added 392 active variants in Nautilus (96), Blokkenpoort (120) and Europa (176), removing 784 explicit strings with zero overrides. The 88 active variants in disabled levels are included; 16 variants in inactive challenges remained authored. Quarter-hour and half-hour family names share the clock logic. No new units, strategies or family corrections were needed in those migrations. Batch 2 migrated all 152 active Leonardo and 88 active Egypt variants with zero text overrides. Its 128 inactive variants retained their authored hints. The later representation conversion removed four hands-specific overrides in the inactive LVL-0013 clock bank so those digital variants use the same approved resolver.

Focused coverage: tests/batch1-hints.spec.js checks every migrated Batch 1 variant through all three wrong attempts, clock visuals, answer modes, frozen retry choices, inactive banks, complete non-hint level fingerprints and unchanged ARC/Runenpoort output. tests/runenpoort-hints.spec.js exhaustively checks all Runenpoort variants, unchanged non-hint data, five-minute clock semantics and byte-identical unmigrated-world sources; tests/arc-dialogue.spec.js checks source-bank fingerprints, every ARC variant through all three wrong attempts, stable variants/choices, arithmetic strategies, clock inputs, once-per-visit attention, event suppression, counted exits, exact unlock text and legacy-world compatibility. The dialogue-review export is a historical pre-overhaul audit; current source is authoritative.

Batch 2 keeps measurement as a broad family and specifies hintParameters.strategy as addition, subtraction or duration_addition, with a/b operand roles and authored unit. Moose splits the second quantity into tens/ones, omits zero steps and never states the result; duration preserves its unit. Spelling uses generic recognition/comparison without reading the answer or inventing phonics rules. ×11 uses ×10 plus one group; ×12 uses ×10 plus ×2, while ×10/×2/×4 keep simpler priority. Existing generated output is frozen by tests/batch2-hints.spec.js, which also checks all 240 variants through three wrong attempts, inactive banks and complete non-hint level preservation. See [Batch 2 report](batch2-hint-migration.md).

Spelling-family answer grading compares NFC-normalized, Dutch-lowercased strings exactly. Canonically equivalent Unicode forms and case differences remain accepted, while accents, diaeresis, letters and punctuation remain significant. Other string families retain Dutch localeCompare with sensitivity: base; numeric grading and the three-attempt flow are unchanged. Covered by tests/spelling-grading.spec.js and the Batch 2 exhaustive flow.

## E5/M6 learning model and support compatibility

E5 and M6 are learning-level labels, separate from arithmetic/spelling family or teaching strategy. Existing local E5 content uses the documented missing-learningLevel compatibility default where needed. All central M6 production records must explicitly specify learningLevel: "M6", a fixed educational core and authored support. No particular operation, operand size or curriculum is inferred from the label alone; the educational demand must justify it. Do not generate M6 content merely to satisfy the slider.

E5 remains local; production M6 comes from the world-independent central bank. The default and its safe-introduction purpose are defined above. Runtime slider percentages, difficulty eligibility, time-only routing, fallback and stable selection are owned by [Level Contract](LEVEL_CONTRACT.md#learning-level-and-mix-selection) and [Central M6 Bank](M6_CONTENT_BANK.md). Changing the requested mix does not authorize changes to a question's authored hints, answers, distractors or grading contract.

### Historical Runenpoort provenance

The approved [Runenpoort M6 source bundle](../scripts/content/runenpoort-m6-approved.md) introduced the first 24 M6 IDs. It predates the central production architecture; its local placements and pilot framing are historical, not current authoring limitations. Multi-step work and explicit digital-time answer contracts are ordinary supported M6 forms when appropriate to the objective and difficulty, while a digital clock alone does not make a task M6.

The approved [6 October content-quality correction](../scripts/content/atlas-m6-quality-approved.md) genericized those surfaces and normalized semantic metadata. The [9 October time recalibration](../scripts/content/atlas-time-recalibration-approved.md) subsequently superseded the specified time cores/support. Preserve the exact currently approved content, with dated addenda taking precedence only for their stated fields; do not substitute extra questions or teaching text. Generic visuals disclose only their approved stage information, without counting painted world objects.

### Current support and answer compatibility

The user's 3 October 2026 flow correction explicitly retires direct `Leg uit` access. The 4 October presentation correction additionally moves M6 Minnie/Moose support into one integrated help section and hides the companion bar throughout the open M6 question. E5, including NPC questions and fallback, retains the existing bottom companion hints and assisted completion. Actual selected learning level controls presentation. First/second/third valid wrong answers still unlock Minnie/Moose/complete explanation; no UI action bypasses this. Moose's compact portrait accompanies **Moose legt het uit** within help while the original presenter/title remains context. Declarative step indices place exact existing visual groups with exact explanation text; runtime never interprets prose or shortens it. Complete fraction/time geometry can remain a single shared visual. Personal M6 scratch notes are separate, ungraded run-local text, never help or report content.

The facing-notebook refinement places those same exact hints/explanations and progressive visuals on ruled paper to the right of the question. Guide and original presenter portraits use equal dimensions. The notebook can turn to Sven's private notes and back only to already unlocked help; it never prepares a hidden future explanation. Flips do not count as help or attempts. The educational source and stage data remain unchanged.

M6 open-euro entry retains separate digit-only euro/cent fields with permanent labels. Source-bundle answer text and historical accepted-form strings remain immutable provenance; explicitly approved later answer contracts supersede only their specified fields. Runtime grading compares canonical cents and does not grade entered punctuation. Importing content must not restore direct explanation, free-form M6 euro input or the superseded M6 companion-bar presentation. The [current runtime contract](LEVEL_CONTRACT.md#runenpoort-m6-authored-support) governs reopening and reporting; [Central M6 Bank](M6_CONTENT_BANK.md) owns the supported answer/grading contracts, including currency composition and time conversions.


## Central M6 ownership and content quality

The [Central M6 Bank contract](M6_CONTENT_BANK.md) supersedes earlier local M6 authoring/placement descriptions. The central bank is the production architecture, not a transitional pilot. M6 production records belong only in `src/content/m6`; they are world-independent. Do not attach them to world/level/challenge IDs, local pools or `allowedChallenges`/`allowedLevels` filters. Existing challenge positions own progression and routing eligibility, not the educational bank.

Every production M6 question must have:

- A stable unique ID and explicit `learningLevel: "M6"`.
- A canonical `educationalDomain` and stable objective ID in `learningObjective`.
- Explicit difficulty `1`, `2` or `3`, justified by the difficulty principles above.
- A fixed educational core with authored values, operations and reasoning target.
- A correct canonical answer and an explicit supported answer/grading contract.
- Authored Minnie support, Moose support and full explanation.
- Authored visual stages when a useful visual capability exists; do not add decoration merely to fill a visual field.
- At least one approved narrative surface.

The technical schema, versions, report labels and capability fields remain owned by [Central M6 Bank](M6_CONTENT_BANK.md). These editorial requirements do not claim that every current record has passed a new pedagogical review.

### Narrative surfaces

Surfaces may vary scenario wording but must preserve exactly the same educational core. Each is a complete approved bundle, optionally using explicitly supplied literal tokens; never independently randomize words or generate numerical tasks. The selected context must stay consistent through the question, Minnie, Moose, full explanation and contextual visual labels. Mixed alternatives such as “schaal of pakket” must never appear to the learner.

A different surface remains the same question ID, including for anti-repeat. Generic visuals expose only the authored information for the active stage. Additions require separately approved central content, validation and editorial review, not level-specific content copies.

### Current inventory and historical approvals

The 5 October architecture migration moved the 24 original Runenpoort IDs into the central bank. The approved 75-question expansion brought the bank to **99 questions**. This is the current documented inventory, not a permanent maximum or a limit on future approved expansion. The bank should grow through new approved educational cores as coverage needs become clear.

The expansion source is preserved in [atlas-m6-central-approved.md](../scripts/content/atlas-m6-central-approved.md); the separately approved [visual addendum](../scripts/content/atlas-m6-visual-addendum.md) supplies M6-MD-002/003/004 visual stages. The approved 6 October quality correction replaced six expansion cores and seven difficulty labels in place without adding IDs. The 9 October time recalibration subsequently replaced 15 time cores/support bundles across the original and expansion records, retaining their IDs and difficulties; nine other time records remained exact. These approvals are provenance, not permission to infer further steps or rewrite support.

The current 24 M6 time questions include minutes/seconds conversion, irregular elapsed time, hour-boundary reasoning and start/end or reverse reasoning. These are valid M6 learning targets when their educational demand and difficulty are appropriate. Shared visual capabilities support them multimodally; digital representation alone is not a classification criterion. See the [time recalibration inventory and contracts](M6_CONTENT_BANK.md) for exact versions, counts and answer modes.

Tables, fractions and clocks use explicit reusable presentation data while reports retain their approved source snapshots. Some existing approved Moose prose already names a result. Preserve it pending explicit editorial correction, flag the issue during review, and never use it to disclose a withheld visual result early. Arithmetic or quality validation reports conflicts rather than rewriting approved content.

## No exact educational-core duplicates

The production M6 bank should not contain two different question IDs with the exact same educational core. For audit purposes, compare actual operands and operations, money values, times/durations, fraction/ratio values and the required reasoning target, not merely scenario wording or raw field spelling.

Different narrative surfaces of the **same ID** are not duplicates. Sharing an objective while using different numerical cores is not automatically duplication. Exact duplicates discovered during an audit require explicit editorial action; an audit does not silently delete, merge or replace records.

## Objective coverage and variety

A large question count alone is not sufficient. Audit the M6 bank for:

- Domain, objective and difficulty coverage.
- Overrepresented and underrepresented objectives.
- Exact-core duplicates and excessive surface-only variation.
- Repeated identical strategy/value patterns.

Prefer genuinely different educational cores over cosmetic variants. Allow adequate practice and repetition, but distinguish repetition of a learning objective from duplicate production IDs for the same core. Do not force equal question counts across domains: curriculum relevance and actual Atlas challenge availability matter. Report gaps first; new content requires separate authoring and approval. No arbitrary M6 domain-percentage target is implied.

## Authored-content ownership and Codex boundary

Production educational content is authored and approved explicitly. The runtime does not invent questions, numerical cores, teaching strategies, hints or explanations. Resolving approved E5 hint templates or approved M6 surface tokens is mechanical use of authored material, not permission to generate new pedagogy.

Codex may:

- Import approved content and transform it mechanically without changing its educational meaning.
- Normalize metadata when explicitly instructed.
- Validate arithmetic and answer/schema contracts.
- Audit or inventory existing content, and render/test it.

Codex must not independently invent production questions or numerical cores, rewrite Minnie/Moose pedagogy, create explanations, substitute supposedly equivalent content, or fill coverage gaps with generated production questions. A mechanical transformation is not a writing or pedagogical revision.

When an audit identifies a gap, **report the gap**. New or revised educational content must be authored and approved separately before integration. Preserve approved source material; explicitly approved addenda supersede only their stated scope. Synthetic content remains allowed for tests, isolated from the production bank and imports.

## Full-bank content audits

A full E5/M6 audit must distinguish technical findings from editorial/pedagogical judgments. A technically valid record is not automatically appropriate teaching content, and an editorial guideline is not automatically a runtime rejection rule.

### Technical audit

May be automated: IDs, counts, domains/objectives, learning-level labels, difficulty metadata, answers/arithmetic, choices, visual types, surfaces, hint presence, exact duplicate cores, routing eligibility and malformed metadata. Compare educational cores semantically rather than treating different wording or surface names as proof of distinct mathematics. Preserve uncertainty for review where automated comparison cannot establish equivalence.

### Editorial/pedagogical audit

Requires explicit review: whether a question is genuinely E5 or M6, whether D1/D2/D3 is appropriate, Minnie/Moose quality, explanation clarity, distractor fairness, whether visuals actually help, curriculum gaps and whether the concept should be taught at all.

Do not auto-correct pedagogical findings during an audit. Create a report first, distinguish evidence from judgment, and obtain explicit editorial approval before changing content. The audit should use current production data and report its coverage, rather than treating historical counts or approved source bundles as permanent limits. Tooling and export workflow remain owned by [Dev Tools](DEV_TOOLS.md#validation-and-tests).
