One focused M6 content-quality correction run.

Use the CURRENT working tree and the current resolved production bank as source.

Do not redesign the M6 architecture, selector, notebook, routing, UI or answer systems.

This task combines five specific corrections found during the full 99-question audit:

1. recalibrate several difficulty labels;
2. replace six exact duplicate educational cores;
3. directly genericize the original 24 Runenpoort M6 questions;
4. normalize legacy educationalDomain/objective metadata;
5. fix the remaining narrative-surface wording inconsistency.

Do the implementation, focused validation and regression tests in one run.

==================================================
1. IMPORTANT CONTENT RULE
==================================================

Do NOT generate additional production questions.

The production bank remains exactly:

99 question IDs.

For the six duplicate expansion questions below:
- KEEP their existing stable question IDs;
- replace their educational core/content in place with the exact authored replacements below;
- update their visuals, answers, Minnie, Moose and explanation exactly as specified.

For the original 24:
- overwrite their old Runenpoort-specific learner-visible surface directly;
- do NOT preserve the old Viking/Runenpoort surface;
- do NOT add a legacy surface;
- do NOT create recovery compatibility for the old wording;
- no historical/recovery preservation is required.

Use the existing question IDs.

Increment contentVersion for every production record whose learner-visible content, educational core, difficulty or semantic metadata changes, following the current project version convention.

==================================================
2. DIFFICULTY RECALIBRATION
==================================================

Apply these exact difficulty changes:

M6-AS-004
D1 → D2

M6-TI-017
D1 → D2

M6-NS-008
D3 → D1

M6-AS-007
D2 → D3

M6-MO-007
D2 → D3

M6-FR-008
D2 → D3

M6-FR-010
D3 → D2

Do not reclassify any other question.

Important:
Do NOT attempt to make the raw bank question counts match 50/35/15.

The 50/35/15 concept is a PLANNER DELIVERY POLICY at 100% M6, not a required content-bank count distribution.

The default remains:

90% E5 / 10% M6

and therefore M6 at the default must still deliver D1 only.

After this reclassification, verify that the default eligible D1 pool remains healthy for:
- generic positions;
- explicit time positions.

==================================================
3. REPLACE THE SIX EXACT DUPLICATE EDUCATIONAL CORES
==================================================

The current bank has six new expansion IDs whose exact mathematical/time core duplicates one of the original 24.

Replace ONLY these six expansion records.

Do not modify the corresponding original record merely because it was duplicated.

--------------------------------------------------
3A. M6-MO-003
--------------------------------------------------

Keep ID:
M6-MO-003

Difficulty:
D1

Objective:
calculate_change_to_next_euro

Educational core:

Price €2,70
Paid €3,00
Change €0,30

Correct canonical answer:
30 cents = €0,30

Approved surfaces:

Surface `purchase`:
Iets kost **€2,70**. Je betaalt met **€3,00**. Hoeveel geld krijg je terug?

Surface `ticket`:
Een kaartje kost **€2,70**. Je betaalt met **€3,00**. Hoeveel wisselgeld krijg je?

Minnie:
Kijk hoeveel cent er bij 70 cent moeten om bij een hele euro van 100 cent te komen.

Moose:
Je gaat van €2,70 naar €3,00. Reken **100 − 70** om te bepalen hoeveel cent je erbij moet tellen.

Full explanation:
We zoeken het verschil tussen €2,70 en €3,00.

De 70 cent moet worden aangevuld tot 100 cent.

**100 − 70 = 30 cent**.

30 cent schrijf je als **€0,30**.

Je krijgt dus **€0,30 wisselgeld**.

Controle: **€2,70 + €0,30 = €3,00**.

Visual:
reuse the existing moneyReceipt capability.

Question:
price €2,70
paid €3,00

Minnie:
show price → paid, unknown jump.

Moose:
show:
100 − 70 = ? cent

Explanation:
show:
100 − 70 = 30 cent
30 cent = €0,30
€2,70 + €0,30 = €3,00

--------------------------------------------------
3B. M6-MO-006
--------------------------------------------------

Keep ID:
M6-MO-006

Difficulty:
D2

Objective:
calculate_change_mixed_euros_cents

Educational core:

Price €14,65
Paid €20,00
Change €5,35

Correct canonical answer:
535 cents = €5,35

Approved surfaces:

Surface `purchase`:
Iets kost **€14,65**. Je betaalt met **€20,00**. Hoeveel geld krijg je terug?

Surface `entry`:
Een toegangsbewijs kost **€14,65**. Je betaalt met **€20,00**. Hoeveel wisselgeld krijg je?

Minnie:
Vul €14,65 eerst aan tot **€15,00**. Reken daarna verder tot €20,00.

Moose:
Van €14,65 naar €15,00 is **€0,35**. Van €15,00 naar €20,00 is **€5,00**. Tel die twee stukken bij elkaar op.

Full explanation:
We vullen €14,65 aan tot €20,00.

Van **€14,65 naar €15,00** is **€0,35**.

Van **€15,00 naar €20,00** is **€5,00**.

Samen:

**€0,35 + €5,00 = €5,35**.

Je krijgt dus **€5,35 wisselgeld**.

Controle: **€14,65 + €5,35 = €20,00**.

Update the existing moneyReceipt stages to these exact values.

--------------------------------------------------
3C. M6-TI-009
--------------------------------------------------

Keep ID:
M6-TI-009

Difficulty:
D1

Objective:
elapsed_time_same_hour

Educational core:

08:25 → 08:50 = 25 minutes

Approved surfaces:

Surface `activity`:
Een activiteit begint om **08:25** en eindigt om **08:50**. Hoeveel minuten duurt de activiteit?

Surface `wait`:
Je begint om **08:25** te wachten. Om **08:50** kun je verder. Hoeveel minuten heb je gewacht?

Correct answer:
25

Minnie:
Beide tijden liggen in hetzelfde uur. Kijk naar het verschil tussen **25 minuten** en **50 minuten**.

Moose:
Reken **50 − 25**.

Full explanation:
De begintijd is 08:25 en de eindtijd is 08:50.

Beide tijden liggen in hetzelfde uur.

Daarom kunnen we de minuten van elkaar aftrekken:

**50 − 25 = 25**.

De tijdsduur is dus **25 minuten**.

Timeline stages:

Question:
08:25 → 08:50

Minnie:
same endpoints, visually emphasize the minute values.

Moose:
show:
50 − 25 = ?

Explanation:
show:
50 − 25 = 25 minuten

--------------------------------------------------
3D. M6-TI-010
--------------------------------------------------

Keep ID:
M6-TI-010

Difficulty:
D1

Objective:
elapsed_time_half_hour

Educational core:

11:15 → 11:45 = 30 minutes

Question:
Een activiteit begint om **11:15** en eindigt om **11:45**. Hoeveel minuten duurt de activiteit?

Correct answer:
30

Minnie:
Beide tijden liggen in hetzelfde uur. Kijk hoeveel de minuten veranderen van 15 naar 45.

Moose:
Reken **45 − 15**.

Full explanation:
De activiteit begint om 11:15 en eindigt om 11:45.

Beide tijden liggen in hetzelfde uur.

**45 − 15 = 30**.

De activiteit duurt dus **30 minuten**.

Timeline stages:

Question:
11:15 → 11:45

Minnie:
highlight both minute values.

Moose:
45 − 15 = ?

Explanation:
45 − 15 = 30 minuten

--------------------------------------------------
3E. M6-TI-014
--------------------------------------------------

Keep ID:
M6-TI-014

Difficulty:
D3

Objective:
find_end_time_hours_minutes

Educational core:

Start 08:45
Duration 1 hour 35 minutes
End 10:20

Question:
Een activiteit begint om **08:45** en duurt **1 uur en 35 minuten**. Hoe laat is de activiteit afgelopen?

Choices:
- 09:20
- 10:10
- 10:20
- 10:30

Correct:
10:20

Minnie:
Splits de duur in **1 uur** en **35 minuten**. Tel eerst het hele uur bij 08:45 op.

Moose:
08:45 + 1 uur = **09:45**. Nu moeten er nog 35 minuten bij. Ga eerst 15 minuten verder naar 10:00.

Full explanation:
Eerst tellen we 1 uur bij 08:45 op:

**08:45 + 1 uur = 09:45**.

Er moeten nog 35 minuten bij.

Van 09:45 naar 10:00 is 15 minuten.

Er blijven dan nog 20 minuten over.

**10:00 + 20 minuten = 10:20**.

De activiteit eindigt dus om **10:20**.

Timeline:

Question:
08:45 → ?
note: duur 1 uur 35 minuten

Minnie:
08:45 → 09:45 → ?
jumps:
1 uur, remaining unknown

Moose:
08:45 → 09:45 → 10:00 → ?
jumps:
1 uur, 15 minuten, 20 minuten

Explanation:
08:45 → 09:45 → 10:00 → 10:20
jumps:
1 uur, 15 minuten, 20 minuten

--------------------------------------------------
3F. M6-TI-016
--------------------------------------------------

Keep ID:
M6-TI-016

Difficulty:
D3

Objective:
find_start_time_hours_minutes

Educational core:

End 17:10
Duration 1 hour 45 minutes
Start 15:25

Question:
Een activiteit eindigt om **17:10** en duurt **1 uur en 45 minuten**. Hoe laat begon de activiteit?

Choices:
- 15:15
- 15:25
- 15:35
- 16:25

Correct:
15:25

Minnie:
Reken achteruit vanaf 17:10. Trek eerst **1 uur** af en daarna nog 45 minuten.

Moose:
17:10 − 1 uur = **16:10**. Ga daarna eerst 10 minuten terug naar 16:00. Er moeten dan nog 35 minuten af.

Full explanation:
Eerst trekken we 1 uur van 17:10 af:

**17:10 − 1 uur = 16:10**.

Er moeten nog 45 minuten af.

Van 16:10 terug naar 16:00 is 10 minuten.

Er blijven nog 35 minuten over.

**16:00 − 35 minuten = 15:25**.

De activiteit begon dus om **15:25**.

Timeline:

Question:
? → 17:10
note: duur 1 uur 45 minuten
direction backward

Minnie:
? → 16:10 → 17:10
show 1 hour backward

Moose:
? → 16:00 → 16:10 → 17:10
show 10 minutes + 1 hour and remaining 35 minutes

Explanation:
15:25 → 16:00 → 16:10 → 17:10
jumps:
35 minutes, 10 minutes, 1 hour
direction backward

==================================================
4. DIRECTLY GENERICIZE THE ORIGINAL 24 QUESTIONS
==================================================

The original 24 RP-M6-* records were authored for Runenpoort.

They are now part of a global central bank and can appear in any world.

Replace the Runenpoort/Viking-specific learner-visible surface IN PLACE.

Do not preserve the old surface.

Do not add a second surface.

Keep:
- exact mathematics;
- answers;
- difficulty;
- pedagogical strategy;
- progression Minnie → Moose → explanation;
- visual capability type.

Only genericize the context and context-dependent visual labels.

Use these exact target contexts.

--------------------------------------------------
FRACTIONS
--------------------------------------------------

RP-M6-BR-001

Question:
Er zijn **12 onderdelen**. De helft wordt gemarkeerd. Hoeveel onderdelen worden gemarkeerd?

Replace learner-visible:
schild/schilden → onderdeel/onderdelen
rode rand → gemarkeerd

Final explanation ends:
**6 onderdelen worden gemarkeerd.**

Fraction visual:
- total label: `12 onderdelen samen`
- selected group label: `gemarkeerd`
- remove the world-specific shield symbol;
- use the existing neutral/default quantity rendering.

RP-M6-BR-002

Question:
Er zijn **20 onderdelen**. Een kwart wordt gebruikt. Hoeveel onderdelen worden gebruikt?

Replace:
stenen → onderdelen
bouwer / muurtje → neutral `gebruikt`

Final:
**Er worden 5 onderdelen gebruikt.**

Visual:
`20 onderdelen samen`
selected group label `gebruikt`
neutral/default quantity rendering.

RP-M6-BR-003

Question:
Er zijn **20 onderdelen**. Driekwart wordt gemarkeerd. Hoeveel onderdelen worden gemarkeerd?

Replace:
schilden / schildenmuur → onderdelen
blauwe rand → gemarkeerd

Final:
**15 onderdelen worden gemarkeerd.**

Visual labels neutral.

RP-M6-BR-004

Question:
Een **kabel van 18 meter** wordt voor twee derde gebruikt. Hoeveel meter kabel wordt gebruikt?

Replace:
Eivar / schip / touw-specific story → kabel / gebruikt.

Keep the mathematical explanation exactly equivalent:
18 : 3 = 6
2 × 6 = 12

Final:
**Er wordt 12 meter kabel gebruikt.**

A rope/cable texture may remain if it is generic and not world-specific.

RP-M6-BR-005

Question:
Er zijn **35 kratten**. Twee vijfde is al verplaatst. Hoeveel kratten moeten nog worden verplaatst?

Replace:
aan boord → al verplaatst
op de kade → nog te verplaatsen

Final:
**Er moeten nog 21 kratten worden verplaatst.**

Visual labels:
`al verplaatst`
`nog te verplaatsen`

RP-M6-BR-006

Question:
Er liggen **40 houtblokken** klaar. Drie achtste wordt gebruikt. Hoeveel houtblokken blijven over?

Remove:
vuurschaal
tempelwachter

Keep:
houtblokken
gebruikt
over

Final:
**Er blijven 25 houtblokken over.**

--------------------------------------------------
ADDITION
--------------------------------------------------

RP-M6-OP-001

Already bare/generic.

Keep learner-visible content unchanged.

Only normalize semantic metadata as specified later.

RP-M6-OP-002

Question:
In een voorraad liggen **320 onderdelen**. Er komen **250 onderdelen** bij. Hoeveel onderdelen zijn er nu?

Replace:
planken → onderdelen
ship/kade wording → voorraad/generic addition

Answer unit/display:
onderdelen

Keep exact strategy:
250 = 200 + 50
320 + 200 = 520
520 + 50 = 570

Final:
**Er zijn nu 570 onderdelen.**

RP-M6-OP-003

Already bare/generic.

Keep learner-visible content unchanged.

RP-M6-OP-004

Question:
Er zijn **475 onderdelen**. Er komen **168 onderdelen** bij. Hoeveel onderdelen zijn er nu?

Replace:
scheepsbouwer / spijkers → onderdelen

Answer unit:
onderdelen

Keep exact arithmetic and support strategy.

Final:
**Er zijn nu 643 onderdelen.**

RP-M6-OP-005

Already bare/generic.

Keep learner-visible content unchanged.

RP-M6-OP-006

Question:
Er zijn al **2.687 onderdelen**. Er komen nog **756 onderdelen** bij. Hoeveel onderdelen zijn er dan in totaal?

Replace:
tempel / stenen → onderdelen

Answer unit:
onderdelen

Keep exact calculation strategy.

Final:
**Er zijn in totaal 3.443 onderdelen.**

--------------------------------------------------
MONEY
--------------------------------------------------

RP-M6-GE-001

Question:
Een **kaartje** kost €1,50. Je betaalt met €2. Hoeveel geld krijg je terug?

Receipt label:
Kaartje

Remove Vikingtekening.

Keep all mathematics/support.

RP-M6-GE-002

Question:
Een **stickervel** kost €3,20. Je betaalt met €4. Hoeveel geld krijg je terug?

Receipt label:
Stickervel

Remove runen terminology.

RP-M6-GE-003

Question:
Een **souvenir** kost €6,75. Je betaalt met €10. Hoeveel geld krijg je terug?

Receipt label:
Souvenir

Remove Vikingschip.

RP-M6-GE-004

Question:
Een **toegangsbewijs** kost €12,40. Je betaalt met €20. Hoeveel geld krijg je terug?

Receipt label:
Toegangsbewijs

Remove boottocht.

RP-M6-GE-005

Question:
Je koopt een **boekje voor €4,75** en een **stickervel voor €3,50**. Je betaalt met €10. Hoeveel geld krijg je terug?

Receipt labels:
Boekje
Stickervel

Remove Viking/runen wording.

RP-M6-GE-006

Question:
Je koopt een **bouwpakket voor €6,80** en **verf voor €7,65**. Je betaalt met €20. Hoeveel geld krijg je terug?

Receipt labels:
Bouwpakket
Verf

Remove Vikingschip wording.

--------------------------------------------------
TIME
--------------------------------------------------

RP-M6-TI-001

Question:
Een activiteit begint om **09:20** en eindigt om **09:50**. Hoeveel minuten duurt de activiteit?

Replace all:
schip / laden → activiteit

Final:
**De activiteit duurt 30 minuten.**

RP-M6-TI-002

Question:
Een activiteit begint om **10:10** en eindigt om **10:35**. Hoeveel minuten duurt de activiteit?

Replace:
vuurschaal → activiteit

Final:
**De activiteit duurt 25 minuten.**

RP-M6-TI-003

Question:
Een rit begint om **14:35** en eindigt om **15:10**. Hoeveel minuten duurt de rit?

Replace:
boot/tocht-specific story → generic `rit`

Final:
**De rit duurt 35 minuten.**

RP-M6-TI-004

Question:
Een dienst begint om **11:45** en eindigt om **12:25**. Hoeveel minuten duurt de dienst?

Replace:
tempel/wachtdienst-specific wording → dienst

Final:
**De dienst duurt 40 minuten.**

RP-M6-TI-005

Question:
Een activiteit begint om **13:50** en duurt **1 uur en 25 minuten**. Hoe laat eindigt de activiteit?

Remove:
Eivar / tocht / terugkomen

Correct answer remains:
15:15

Final:
**De activiteit eindigt om 15:15.**

RP-M6-TI-006

Question:
Een activiteit eindigt om **16:20** en duurde **1 uur en 35 minuten**. Hoe laat begon de activiteit?

Remove:
schip / haven / vertrek

Correct remains:
14:45

Final:
**De activiteit begon om 14:45.**

For all 24:
mechanically update Minnie, Moose, explanation and visual labels so the chosen generic context is used consistently.

Do not change the actual teaching strategy.

==================================================
5. NORMALIZE LEGACY EDUCATIONAL DOMAIN METADATA
==================================================

Canonical production educationalDomain values should be:

numberSense
additionSubtraction
multiplicationDivision
fractionsRatios
money
time
measurementGeometry
dataPatterns

Update the original 24:

`fractions`
→ `fractionsRatios`

`addition-subtraction`
→ `additionSubtraction`

money remains `money`
time remains `time`

Afterwards there must not be separate runtime domain buckets for:

`fractions`
or
`addition-subtraction`

Do not alter routing:
`time` remains time-only.

==================================================
6. NORMALIZE LEGACY OBJECTIVE METADATA
==================================================

Replace the sentence-style objective metadata of the original 24 with stable machine IDs.

Use exactly:

RP-M6-BR-001
fraction_of_quantity_half

RP-M6-BR-002
fraction_of_quantity_quarter

RP-M6-BR-003
fraction_of_quantity_multiple_parts

RP-M6-BR-004
fraction_of_quantity_multiple_parts

RP-M6-BR-005
fraction_remainder_from_quantity

RP-M6-BR-006
fraction_remainder_from_quantity

RP-M6-OP-001
add_hundreds_tens

RP-M6-OP-002
add_three_digit_context

RP-M6-OP-003
add_three_digit_crossing

RP-M6-OP-004
add_three_digit_crossing

RP-M6-OP-005
add_four_digit_and_three_digit

RP-M6-OP-006
add_four_digit_and_three_digit

RP-M6-GE-001
calculate_change_to_next_euro

RP-M6-GE-002
calculate_change_to_next_euro

RP-M6-GE-003
calculate_change_mixed_euros_cents

RP-M6-GE-004
calculate_change_mixed_euros_cents

RP-M6-GE-005
add_prices_then_calculate_change

RP-M6-GE-006
add_prices_then_calculate_change

RP-M6-TI-001
elapsed_time_half_hour

RP-M6-TI-002
elapsed_time_same_hour

RP-M6-TI-003
elapsed_time_cross_hour

RP-M6-TI-004
elapsed_time_cross_hour

RP-M6-TI-005
find_end_time_hours_minutes

RP-M6-TI-006
find_start_time_hours_minutes

Do not change reportLabel merely to match these IDs.

==================================================
7. FINAL NARRATIVE SURFACE POLISH
==================================================

M6-FR-008 currently resolves the correct selected noun in the question/Minnie, but still says generic `7 stuks` in Moose/explanation.

Fix this mechanically.

Surface `trays` must say:
- `Voor 7 schalen ...`
- `Daarna rekenen we voor 7 schalen ...`

Surface `packages` must say:
- `Voor 7 pakketten ...`
- `Daarna rekenen we voor 7 pakketten ...`

Do not change its educational core or calculation.

Audit the resolved 133 surfaces once for the same exact leftover pattern:
a selected concrete noun in the question followed by an unnecessary `stuks` or mixed-alternative noun in learner-visible support.

Only fix clear mechanical context leakage.

Do not broadly rewrite prose.

==================================================
8. DUPLICATE-CORE AUDIT AFTER CHANGES
==================================================

After the six replacements, audit the complete 99-question production bank for exact educational-core duplicates.

For arithmetic/money/time compare the actual authored numerical/time core, not wording.

Expected:
the six previously identified exact duplicates are gone.

If you find ANOTHER exact core duplicate:
- report it;
- do not invent another replacement.

Do not treat same objective with different values as a duplicate.

==================================================
9. VALIDATION
==================================================

Verify:

- exactly 99 production question IDs;
- 0 test-only IDs;
- all answers mathematically correct;
- all money uses integer cents;
- all six replacement questions have the exact new values above;
- all original 24 now have generic learner-visible context;
- no Viking/Runenpoort-specific learner-visible nouns remain in those 24;
- no Eivar references remain in the central M6 bank;
- no `fractions` educationalDomain remains;
- no `addition-subtraction` educationalDomain remains;
- all original 24 have canonical objective IDs;
- explicit time questions remain `time`;
- generic questions remain excluded from time positions as currently designed;
- default 90/10 still allows only D1 M6 questions;
- D2/D3 ceilings at the other slider settings remain unchanged.

Recalculate and report final bank difficulty counts after the explicit reclassifications.

Do NOT alter additional difficulties to make the counts prettier.

==================================================
10. FOCUSED QA
==================================================

Do not run another enormous all-day QA campaign unless a regression requires it.

Run focused automated coverage for:

1. all 99 content records load and validate;
2. the 7 explicit difficulty changes;
3. the six replacement cores;
4. the 24 genericized original questions;
5. normalized domain/objective metadata;
6. time-only routing;
7. generic non-time routing;
8. default 10% M6 → D1 only;
9. all 133 resolved surfaces contain no mixed context leakage;
10. changed visual stages do not reveal an answer early;
11. existing answer contracts still grade correctly.

Run representative browser checks on:
- desktop;
- iPad landscape;
- iPad portrait

for:
- one genericized fraction question;
- one genericized money question;
- one genericized time question;
- each of the six replacement questions if practical;
- M6-FR-008 both surfaces.

Do not increase timeouts to hide failures.

==================================================
11. DO NOT CHANGE
==================================================

Do not change:

- E5 content;
- E5 hint resolver;
- notebook design;
- learning-level slider percentages;
- progressive difficulty policy;
- time-vs-generic routing;
- challenge UI;
- level geometry/content;
- rewards/progression;
- central-bank architecture;
- answer input architecture.

No new production IDs.

No procedural educational generation.

==================================================
12. FINAL REPORT
==================================================

When done, report:

1. final production question count;
2. final difficulty counts;
3. confirmation of the seven requested reclassifications;
4. confirmation that all six duplicate cores were replaced and list their new cores;
5. count of exact duplicate cores remaining;
6. confirmation that the original 24 are now directly genericized with no legacy surface preserved;
7. final canonical domain counts;
8. confirmation that the legacy domain keys are gone;
9. confirmation that the original 24 objective metadata is normalized;
10. number of additional surface-context leaks fixed;
11. focused test results;
12. any issue you found but intentionally did not change because it was outside this specification.