One focused Atlas time-learning recalibration + digital-clock visualization task.

Use the CURRENT working tree.

This is an educational-content and presentation correction based on the reviewed
End Group 5 and Mid Group 6 time worksheets.

The key conclusion is:

ANALOGUE vs DIGITAL IS A REPRESENTATION DIFFERENCE,
NOT THE E5/M6 LEVEL BOUNDARY.

End Group 5 already includes:
- analogue clock reading;
- digital clock reading;
- analogue ↔ digital interpretation;
- Dutch spoken clock language;
- simple minute addition;
- simple elapsed-time reasoning.

Mid Group 6 increases complexity mainly through:
- irregular minutes;
- hour-boundary calculations;
- start/end-time reasoning;
- minutes ↔ seconds;
- mixed minutes + seconds;
- longer and multistep durations.

Implement this in one coherent pass.

Do NOT alter unrelated maths content, levels, challenge layout, learning-level percentages,
or the generic/time routing model.

==================================================
1. BUILD / UPGRADE THE REUSABLE DIGITAL CLOCK VISUAL
==================================================

Atlas already has a `digitalClock` M6 visual capability.

Do NOT create a second parallel digital-clock renderer.

Upgrade/refactor the existing capability into a reusable Atlas digital-clock visualization
that can also be used by E5 clock questions.

The supplied reference image is visual inspiration only.
Do NOT copy it exactly and do not embed/copy the source image.

Desired visual character:

- recognisable physical digital alarm/display clock;
- dark graphite/black rounded casing;
- slightly inset dark display;
- bright red seven-segment digits;
- subtle inactive/dim segments if visually useful;
- subtle red glow only, not excessive bloom;
- static colon;
- no blinking animation;
- no brand/logo;
- clean enough for educational use;
- visually compatible with Atlas;
- crisp at iPad DPR;
- scalable rather than raster-dependent.

Prefer a programmatic SVG/CSS/DOM implementation or the most appropriate existing
Atlas rendering architecture.

Do not introduce an external font solely for the seven-segment digits.

Support at minimum:

HH:MM

with:
- 24-hour times;
- leading zero where appropriate;
- hour and minute supplied independently;
- optional visual emphasis of hours or minutes for hint stages;
- normal / compact sizing;
- use in question presentation;
- use inside the M6 notebook;
- use in E5 challenge presentation.

The clock must remain clearly readable on:
- desktop;
- iPad landscape;
- iPad portrait.

Add an accessible textual label such as:
`Digitale klok: 19:55`

Do not make the visual itself reveal any answer beyond the time it is supposed to display.

==================================================
2. E5 — BALANCE ANALOGUE AND DIGITAL REPRESENTATION
==================================================

Current production has:

60 explicit E5 time positions
120 E5 clock variants

The current audit found those 120 variants to be analogue.

First verify the current working tree still has exactly two E5 variants for every explicit
time position.

If that invariant is not true, stop and report the exceptions rather than inventing content.

For every explicit E5 time position:

- keep the FIRST currently listed variant analogue;
- convert the SECOND currently listed variant to digital presentation.

Do not create new E5 variant IDs.
Do not delete variants.

Expected result:

60 analogue E5 variants
60 digital E5 variants
120 total E5 time variants

The two variants may retain their existing different authored times/answers.

For each converted digital variant:

- preserve its exact time;
- preserve its correct answer;
- preserve its answer choices;
- preserve difficulty / E5 status;
- preserve question ID;
- preserve challenge slot;
- preserve reporting metadata;
- change only representation-specific content where necessary.

If its learner-visible question is already generic, e.g.

`Hoe laat is het?`

keep it.

If wording explicitly refers to analogue hands / wijzers / clock face,
change only that representation-specific wording.

==================================================
3. E5 DIGITAL SUPPORT / HINT BEHAVIOR
==================================================

Use the existing shared E5 hint/support architecture.

Do not fork the E5 hint system.

Digital variants must never receive analogue-specific help such as:
- "lange wijzer";
- "korte wijzer";
- "kijk waar de wijzer staat".

Use this approved digital support pattern where representation-specific support is needed.

Minnie:

`Kijk eerst naar de minuten rechts van de dubbele punt. Die helpen je om de tijd in woorden te herkennen.`

Moose:

`De digitale klok geeft {HH:MM} aan. Vergelijk die tijd met de antwoordopties en kies dezelfde tijd in woorden.`

Only use these when compatible with the existing question form.
Do not replace better existing generic support unnecessarily.

This is a representation adaptation, not new procedural educational content.

==================================================
4. TIME ROUTING MUST REMAIN SEMANTIC
==================================================

Converting an E5 variant from analogue to digital must NOT stop the containing position
from being recognized as an explicit time position.

Do not let `positionDomain()` depend on analogue rendering alone.

Preserve or minimally strengthen semantic time metadata so:

explicit time position
→ time

generic position
→ time excluded

remains true for all 60 production time positions.

Do not broaden the definition of time positions beyond the current explicit production set.

==================================================
5. RECALIBRATE THE CENTRAL M6 TIME BANK
==================================================

The central M6 time bank remains exactly:

24 production time question IDs.

Do not add or remove M6 time IDs.

Keep the current overall M6 time difficulty count:

D1 = 10
D2 = 9
D3 = 5

The following current M6 questions are actually E5-level or too close to E5 after comparison
with the reviewed worksheets.

Replace their educational core IN PLACE, keeping the stable ID.

Replace exactly these 15 IDs:

RP-M6-TI-001
RP-M6-TI-002
RP-M6-TI-003
RP-M6-TI-004

M6-TI-001
M6-TI-002
M6-TI-003
M6-TI-004
M6-TI-005
M6-TI-006
M6-TI-007
M6-TI-008
M6-TI-009
M6-TI-010
M6-TI-013

Do NOT change these nine questions except where required to use the upgraded renderer:

RP-M6-TI-005
RP-M6-TI-006

M6-TI-011
M6-TI-012
M6-TI-014
M6-TI-015
M6-TI-016
M6-TI-017
M6-TI-018

They already represent useful M6 time reasoning.

==================================================
6. EXACT REPLACEMENT CONTENT — D1
==================================================

Keep the stated IDs and difficulty.

--------------------------------------------------
RP-M6-TI-001
--------------------------------------------------

Difficulty:
D1

Objective:
seconds_to_minutes_exact

Report label:
Tijd · Seconden naar minuten

Question:

Hoeveel minuten zijn **240 seconden**?

Answer:
4

Answer mode:
open wholeNumber

Unit:
minuten

Minnie:

Eén minuut is **60 seconden**. Kijk hoeveel groepjes van 60 in 240 passen.

Moose:

Reken **240 : 60**. De uitkomst is het aantal minuten.

Explanation:

Eén minuut is **60 seconden**.

We rekenen:

**240 : 60 = 4**.

Dus **240 seconden = 4 minuten**.

Visual type:
calculationSteps

Question:
`240 seconden = ? minuten`

Minnie:
`1 minuut = 60 seconden`

Moose:
`240 : 60 = ?`

Explanation:
`240 : 60 = 4`
`240 seconden = 4 minuten`

--------------------------------------------------
RP-M6-TI-002
--------------------------------------------------

Difficulty:
D1

Objective:
minutes_to_seconds_exact

Report label:
Tijd · Minuten naar seconden

Question:

Hoeveel seconden zijn **3 minuten**?

Answer:
180

Unit:
seconden

Minnie:

Eén minuut is **60 seconden**. Je hebt 3 van zulke minuten.

Moose:

Reken **3 × 60**.

Explanation:

Eén minuut is **60 seconden**.

Daarom rekenen we:

**3 × 60 = 180**.

Dus **3 minuten = 180 seconden**.

Visual type:
calculationSteps

Question:
`3 minuten = ? seconden`

Minnie:
`1 minuut = 60 seconden`

Moose:
`3 × 60 = ?`

Explanation:
`3 × 60 = 180`
`3 minuten = 180 seconden`

--------------------------------------------------
M6-TI-001
--------------------------------------------------

Difficulty:
D1

Objective:
add_minutes_cross_hour_small

Report label:
Tijd · Minuten over het uur

Question:

Op een digitale klok is het **15:58**.
Over **4 minuten** begint een activiteit.

Hoe laat is het dan?

Choices:

15:02
15:54
16:02
16:04

Correct:
16:02

Minnie:

Ga eerst van **15:58 naar 16:00**. Hoeveel van de 4 minuten heb je dan gebruikt?

Moose:

Van 15:58 naar 16:00 zijn **2 minuten**.
Van de 4 minuten blijven daarna nog **2 minuten** over.

Explanation:

We beginnen om **15:58**.

Na 2 minuten is het **16:00**.

Er blijven nog 2 minuten over.

**16:00 + 2 minuten = 16:02**.

Dus na 4 minuten is het **16:02**.

Visual:
digitalClock

Question stage:
15:58

Minnie stage:
16:00
note: `2 minuten verder`

Moose stage:
16:00
notes:
`2 van 4 minuten gebruikt`
`nog 2 minuten`

Explanation stage:
16:02
note:
`15:58 + 4 minuten = 16:02`

--------------------------------------------------
M6-TI-002
--------------------------------------------------

Difficulty:
D1

Objective:
add_minutes_cross_hour

Report label:
Tijd · Minuten over het uur

Question:

Het is **08:57**.
Over **8 minuten** vertrekt een bus.

Hoe laat vertrekt de bus?

Choices:

08:49
09:03
09:05
09:15

Correct:
09:05

Minnie:

Ga eerst van **08:57 naar 09:00**.

Moose:

Van 08:57 naar 09:00 zijn **3 minuten**.
Van de 8 minuten blijven dan nog **5 minuten** over.

Explanation:

Van **08:57 naar 09:00** zijn 3 minuten.

Er blijven nog:

**8 − 3 = 5 minuten**.

**09:00 + 5 minuten = 09:05**.

De bus vertrekt dus om **09:05**.

Visual:
digitalClock

Question:
08:57

Minnie:
09:00
note `3 minuten verder`

Moose:
09:00
notes:
`3 minuten gebruikt`
`nog 5 minuten`

Explanation:
09:05
note:
`08:57 + 8 minuten = 09:05`

--------------------------------------------------
M6-TI-003
--------------------------------------------------

Difficulty:
D1

Objective:
elapsed_time_cross_hour_irregular

Report label:
Tijd · Tijdsduur over het uur

Question:

Een activiteit begint om **14:51** en eindigt om **15:32**.

Hoeveel minuten duurt de activiteit?

Answer:
41

Unit:
minuten

Minnie:

Ga eerst van **14:51 naar 15:00**.

Moose:

Van 14:51 naar 15:00 zijn **9 minuten**.
Van 15:00 naar 15:32 zijn **32 minuten**.

Explanation:

We splitsen de tijd bij 15:00.

**14:51 → 15:00 = 9 minuten**.

**15:00 → 15:32 = 32 minuten**.

Samen:

**9 + 32 = 41 minuten**.

De activiteit duurt **41 minuten**.

Visual:
timeLine

Question:
14:51 → 15:32

Minnie:
14:51 → 15:00 → 15:32

Moose:
jumps 9 min / 32 min

Explanation:
note `9 + 32 = 41 minuten`

--------------------------------------------------
M6-TI-005
--------------------------------------------------

Difficulty:
D1

Objective:
elapsed_time_cross_hour_irregular

Question:

Een training begint om **15:29** en eindigt om **16:12**.

Hoeveel minuten duurt de training?

Answer:
43

Unit:
minuten

Minnie:

Reken eerst van **15:29 naar 16:00**.

Moose:

Van 15:29 naar 16:00 zijn **31 minuten**.
Daarna zijn het nog **12 minuten** tot 16:12.

Explanation:

**15:29 → 16:00 = 31 minuten**.

**16:00 → 16:12 = 12 minuten**.

**31 + 12 = 43 minuten**.

De training duurt **43 minuten**.

Visual:
timeLine with the same progression.

--------------------------------------------------
M6-TI-006
--------------------------------------------------

Difficulty:
D1

Objective:
elapsed_time_cross_hour_irregular

Question:

Een activiteit begint om **08:50** en eindigt om **09:34**.

Hoeveel minuten duurt de activiteit?

Answer:
44

Unit:
minuten

Minnie:

Ga eerst van **08:50 naar 09:00**.

Moose:

Dat eerste stuk duurt **10 minuten**.
Van 09:00 tot 09:34 zijn nog **34 minuten**.

Explanation:

**08:50 → 09:00 = 10 minuten**.

**09:00 → 09:34 = 34 minuten**.

**10 + 34 = 44 minuten**.

De activiteit duurt **44 minuten**.

Visual:
timeLine.

--------------------------------------------------
M6-TI-009
--------------------------------------------------

Difficulty:
D1

Objective:
seconds_to_minutes_context

Question:

Lijm moet **300 seconden** drogen.

Hoeveel minuten is dat?

Answer:
5

Unit:
minuten

Minnie:

Eén minuut duurt 60 seconden.

Moose:

Reken hoeveel keer **60 seconden** in 300 seconden passen.

Explanation:

**300 : 60 = 5**.

Dus **300 seconden = 5 minuten**.

Visual:
calculationSteps

--------------------------------------------------
M6-TI-010
--------------------------------------------------

Difficulty:
D1

Objective:
minutes_to_seconds_context

Question:

Een timer staat op **4 minuten**.

Hoeveel seconden is dat?

Answer:
240

Unit:
seconden

Minnie:

Eén minuut is 60 seconden.

Moose:

Reken **4 × 60**.

Explanation:

**4 × 60 = 240**.

Dus **4 minuten = 240 seconden**.

Visual:
calculationSteps

--------------------------------------------------
M6-TI-013
--------------------------------------------------

Difficulty:
D1

Objective:
mixed_minutes_seconds_to_seconds

Report label:
Tijd · Minuten en seconden

Question:

Een timer staat op **2 minuten en 30 seconden**.

Hoeveel seconden is dat samen?

Answer:
150

Unit:
seconden

Minnie:

Zet eerst de **2 minuten** om naar seconden.

Moose:

2 minuten zijn **2 × 60 = 120 seconden**.
Tel daar de 30 seconden nog bij.

Explanation:

2 minuten zijn:

**2 × 60 = 120 seconden**.

Daar komen nog 30 seconden bij:

**120 + 30 = 150 seconden**.

Dus **2 minuten en 30 seconden = 150 seconden**.

Visual:
calculationSteps

Question:
`2 min 30 sec = ? sec`

Minnie:
`2 min = 2 × 60 sec`

Moose:
`120 + 30 = ?`

Explanation:
`120 + 30 = 150`
`2 min 30 sec = 150 sec`

==================================================
7. EXACT REPLACEMENT CONTENT — D2
==================================================

--------------------------------------------------
RP-M6-TI-003
--------------------------------------------------

Difficulty:
D2

Objective:
seconds_to_minutes_with_remainder

Report label:
Tijd · Minuten en seconden

Question:

Hoeveel minuten en seconden zijn **430 seconden**?

Choices:

6 minuten 10 seconden
7 minuten 10 seconden
7 minuten 30 seconden
8 minuten 10 seconden

Correct:
7 minuten 10 seconden

Minnie:

Zoek eerst hoeveel **hele minuten van 60 seconden** in 430 seconden passen.

Moose:

7 minuten zijn **7 × 60 = 420 seconden**.
Hoeveel seconden blijven er dan nog over?

Explanation:

7 minuten zijn:

**7 × 60 = 420 seconden**.

Van 430 seconden blijven dan:

**430 − 420 = 10 seconden**.

Dus:

**430 seconden = 7 minuten en 10 seconden**.

Visual:
calculationSteps

--------------------------------------------------
RP-M6-TI-004
--------------------------------------------------

Difficulty:
D2

Objective:
mixed_minutes_seconds_to_seconds

Question:

Hoeveel seconden zijn **5 minuten en 20 seconden**?

Answer:
320

Unit:
seconden

Minnie:

Zet eerst de 5 minuten om naar seconden.

Moose:

5 minuten zijn **5 × 60 = 300 seconden**.
Tel daar nog 20 seconden bij.

Explanation:

**5 × 60 = 300 seconden**.

**300 + 20 = 320 seconden**.

Dus **5 minuten en 20 seconden = 320 seconden**.

Visual:
calculationSteps

--------------------------------------------------
M6-TI-004
--------------------------------------------------

Difficulty:
D2

Objective:
elapsed_time_cross_hour_irregular

Question:

Een bus vertrekt om **19:43** en komt om **20:28** aan.

Hoeveel minuten duurt de rit?

Answer:
45

Unit:
minuten

Minnie:

Splits de rit bij **20:00**.

Moose:

Van 19:43 naar 20:00 zijn **17 minuten**.
Van 20:00 naar 20:28 zijn **28 minuten**.

Explanation:

**19:43 → 20:00 = 17 minuten**.

**20:00 → 20:28 = 28 minuten**.

**17 + 28 = 45 minuten**.

De rit duurt **45 minuten**.

Visual:
timeLine.

--------------------------------------------------
M6-TI-007
--------------------------------------------------

Difficulty:
D2

Objective:
find_end_time_cross_hour_irregular

Question:

Een activiteit begint om **17:36** en duurt **48 minuten**.

Hoe laat eindigt de activiteit?

Choices:

18:14
18:22
18:24
18:34

Correct:
18:24

Minnie:

Ga eerst van **17:36 naar 18:00**.

Moose:

Van 17:36 naar 18:00 zijn **24 minuten**.
Van de 48 minuten blijven dan nog **24 minuten** over.

Explanation:

**17:36 → 18:00 = 24 minuten**.

Van de totale 48 minuten blijven nog:

**48 − 24 = 24 minuten**.

**18:00 + 24 minuten = 18:24**.

De activiteit eindigt om **18:24**.

Visual:
timeLine

Question:
17:36 → ?
jump `+48 minuten`

Minnie:
17:36 → 18:00 → ?

Moose:
jumps `24 min`, `24 min`

Explanation:
17:36 → 18:00 → 18:24

--------------------------------------------------
M6-TI-008
--------------------------------------------------

Difficulty:
D2

Objective:
find_start_time_cross_hour_irregular

Question:

Een activiteit eindigt om **20:13** en duurde **47 minuten**.

Hoe laat begon de activiteit?

Choices:

19:16
19:26
19:34
19:36

Correct:
19:26

Minnie:

Reken terug vanaf **20:13**.
Ga eerst terug naar **20:00**.

Moose:

Van 20:13 terug naar 20:00 zijn **13 minuten**.
Van de 47 minuten moeten daarna nog **34 minuten** terug.

Explanation:

We rekenen terug vanaf 20:13.

**20:13 → 20:00 = 13 minuten terug**.

Van de 47 minuten blijven nog:

**47 − 13 = 34 minuten**.

**20:00 − 34 minuten = 19:26**.

De activiteit begon om **19:26**.

Visual:
timeLine
direction backward

Question:
? → 20:13
duration `47 minuten`

Minnie:
? → 20:00 → 20:13

Moose:
show 13 min and remaining 34 min

Explanation:
19:26 → 20:00 → 20:13

==================================================
8. M6 QUESTIONS THAT MUST REMAIN
==================================================

Do not pedagogically rewrite:

RP-M6-TI-005
RP-M6-TI-006
M6-TI-011
M6-TI-012
M6-TI-014
M6-TI-015
M6-TI-016
M6-TI-017
M6-TI-018

These already contain useful Mid Group 6 complexity such as:

- irregular elapsed time;
- backwards time reasoning;
- hour + minute duration;
- multistep schedules.

Only adapt them if a technical renderer change is required.

==================================================
9. CONTENT VERSIONING
==================================================

Increment contentVersion for every M6 record whose educational core changes.

For E5 variants, follow the existing E5 version/cache convention.

Do not create compatibility aliases for the replaced M6 educational cores.
The stable question IDs remain the identity.

==================================================
10. NO PROCEDURAL PRODUCTION CONTENT
==================================================

Do not generate additional question values, word problems or answer choices.

All new production M6 content is explicitly authored above.

The E5 change is a mechanical visual representation conversion of existing approved content.

Synthetic/generated values remain allowed only in tests.

==================================================
11. DIGITAL CLOCK VISUAL QA
==================================================

Add focused visual regression coverage for the new/upgraded clock renderer.

Check at least:

00:05
08:57
09:05
15:58
16:02
19:35
21:55
23:59

Verify:

- every digit uses correct seven-segment geometry;
- `0` cannot look like `8`;
- `1` remains clearly readable;
- colon alignment;
- leading zero;
- red segments remain legible on the dark display;
- no clipping;
- no layout shift;
- device bezel scales correctly;
- notebook and question versions remain sharp at DPR 2.

No animated blinking colon.

==================================================
12. EDUCATIONAL / ROUTING QA
==================================================

Verify after implementation:

E5:
- 60 explicit time positions;
- 120 E5 time variants;
- exactly 60 analogue and 60 digital;
- every explicit time position has one of each;
- no E5 digital variant receives analogue/wijzer-specific hints;
- all remain E5;
- all remain explicit time positions.

M6:
- exactly 24 time questions;
- D1 = 10;
- D2 = 9;
- D3 = 5;
- all 15 specified cores replaced exactly;
- all nine retained cores unchanged educationally;
- no exact duplicate educational cores;
- no M6 D1 question is merely basic analogue/digital clock recognition;
- minutes/seconds questions grade correctly;
- all time arithmetic is mathematically correct.

Planner:
- default remains 90% E5 / 10% M6;
- default M6 still D1 only;
- 40/50/60/etc difficulty policy unchanged;
- explicit time position still selects only time;
- generic position still excludes time;
- no difficulty debt;
- no time/non-time fallback crossing.

==================================================
13. BROWSER QA
==================================================

Run focused browser checks on:

Desktop
iPad landscape
iPad portrait

Include:

- an E5 analogue time variant;
- the paired E5 digital variant in the same slot;
- one M6 D1 seconds/minutes conversion;
- M6-TI-001 at 15:58 + 4;
- M6-TI-003 irregular elapsed time;
- one D2 backwards-time question;
- one retained D3 multistep question;
- Minnie;
- Moose;
- full explanation;
- reopen/rerender where supported.

Check both ARC time challenges and at least one non-ARC production time challenge.

Do not increase timeouts merely to hide a regression.

==================================================
14. DO NOT CHANGE
==================================================

Do not change:

- total E5 time variant count;
- total M6 question count;
- total M6 time question count;
- E5/M6 percentage planner;
- M6 difficulty percentage policy;
- notebook layout;
- companion behavior;
- challenge UI structure;
- level geometry;
- rewards;
- progress/session reporting;
- unrelated content domains.

Do not introduce a separate E5 digital-clock implementation if the shared renderer can be used.

==================================================
15. FINAL REPORT
==================================================

Report briefly:

1. final E5 analogue/digital time-variant counts;
2. confirmation that each explicit E5 time slot now has one analogue and one digital variant;
3. files/components used for the shared digital-clock renderer;
4. screenshots / visual QA locations;
5. final M6 time count and D1/D2/D3 counts;
6. confirmation of all 15 replacement IDs;
7. exact educational cores left unchanged;
8. duplicate-core audit result;
9. routing/planner regression result;
10. desktop + both iPad browser-test results;
11. any issue intentionally left unchanged because it was outside this specification.