# Atlas M6 — Central Content Bank

**Status:** working editorial master  
**Purpose:** single source bundle for the new centrally selected M6 production content  
**Current scope:** Batch 01 + Batch 02 + Batch 03 + Batch 04 + Batch 05 + Batch 06 — 75 questions  
**Target first expansion:** 75 new questions

## Editorial workflow

This is the single growing master file for the M6 central content-bank expansion.

Rules:
- New production questions are authored and reviewed in ChatGPT.
- Approved content is appended to this file; do not create separate batch files as the source of truth.
- Codex imports approved content from this master file later.
- Codex does not invent, rewrite, shorten, template, or replace educational content.
- Numerical educational cores are fixed authored content; no procedural generation of numbers, operators, fractions, answers, hints, or explanations.
- Approved narrative surfaces may vary wording/context while preserving the exact educational core.
- Narrative variants are complete authored bundles, not random word replacement.
- M6 difficulty remains:
  - 1 — Instap
  - 2 — Normaal
  - 3 — Uitdagend
- Target M6 selection mix remains approximately 50% Instap / 35% Normaal / 15% Uitdagend.
- Question selection is central and level-independent.
- Existing E5 content remains separate.
- All questions must retain exact Minnie, Moose and full-explanation content after approval.
- Visual stages are authored and must not leak later-stage answers early.

## Current review state

- **Batch 01 — M6-NS-001 through M6-AS-002:** approved in chat.
- **Batch 02 — M6-AS-003 through M6-MD-004:** approved in chat.
- **Batch 03 — M6-MD-005 through M6-FR-004:** approved in chat.
- **Batch 04 — M6-FR-005 through M6-MO-004:** approved in chat.
- **Batch 05 — M6-MO-005 through M6-TI-006:** approved in chat.
- **Batch 06 — M6-TI-007 through M6-DP-006:** current complete draft for final review.

---

# Batch 01 — Getalbegrip (8) + Optellen/Aftrekken (2)

## M6-NS-001 — Getalwoorden herkennen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** numberSense  
**objective:** spoken_number_to_digits  
**reportLabel:** Getalbegrip · Getalwoorden  
**answerMode:** multipleChoice  
**visual:** geen

### Vraag

Welk getal wordt bedoeld met **zesduizend tweehonderd zevenenveertig**?

### Antwoordopties

- 6.247
- 6.274
- 6.427
- 6.240

**Correct antwoord:** 6.247

### Minnie

Zoek eerst hoeveel duizenden en honderden je hoort. Kijk daarna naar het laatste getal: zevenenveertig.

### Moose

Zesduizend is 6.000 en tweehonderd is 200. Zevenenveertig is 47. Welk getal krijg je als je die delen samenvoegt?

### Volledige uitleg

Het getal bestaat uit drie delen.

**Zesduizend = 6.000.**

**Tweehonderd = 200.**

**Zevenenveertig = 47.**

Samen is dat **6.000 + 200 + 47 = 6.247**.

Dus het juiste getal is **6.247**.

---

## M6-NS-002 — Grootste getal maken

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** numberSense  
**objective:** order_digits_largest_number  
**reportLabel:** Getalbegrip · Cijfers ordenen  
**answerMode:** multipleChoice  
**visual:** geen

### Vraag

Je mag de cijfers **3, 8, 5 en 7** elk één keer gebruiken. Welk is het grootste getal dat je kunt maken?

### Antwoordopties

- 8.753
- 8.735
- 7.853
- 8.573

**Correct antwoord:** 8.753

### Minnie

Voor het grootste getal zet je het grootste cijfer op de plek met de grootste waarde: helemaal links.

### Moose

Van 3, 8, 5 en 7 is 8 het grootst. Daarna komt 7, daarna 5 en daarna 3. Zet ze in die volgorde.

### Volledige uitleg

Bij een viercijferig getal is de eerste plek het belangrijkst.

Het grootste cijfer is **8**, dus dat wordt het duizendtal.

Daarna komt **7** bij de honderdtallen, **5** bij de tientallen en **3** bij de eenheden.

Zo krijg je **8.753**.

Dus **8.753** is het grootste getal dat je met deze vier cijfers kunt maken.

---

## M6-NS-003 — Waarde van een cijfer

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** numberSense  
**objective:** place_value  
**reportLabel:** Getalbegrip · Plaatswaarde  
**answerMode:** multipleChoice  
**visual:** geen

### Vraag

Kijk naar het getal **5.684**. Welke waarde heeft de **6**?

### Antwoordopties

- 6
- 60
- 600
- 6.000

**Correct antwoord:** 600

### Minnie

Kijk op welke plek de 6 staat. Van rechts naar links heb je eenheden, tientallen, honderdtallen en duizendtallen.

### Moose

In 5.684 staat de 4 bij de eenheden, de 8 bij de tientallen en de 6 bij de honderdtallen. Wat is 6 honderdtallen waard?

### Volledige uitleg

Het getal is **5.684**.

De **4** betekent 4 eenheden.

De **8** betekent 8 tientallen: 80.

De **6** staat bij de honderdtallen. Zes honderdtallen zijn **6 × 100 = 600**.

Dus de 6 heeft de waarde **600**.

---

## M6-NS-004 — Getallenreeks met sprongen van tien

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** numberSense  
**objective:** number_sequence_constant_step  
**reportLabel:** Getalbegrip · Getallenreeksen  
**answerMode:** openWholeNumber  
**visual:** numberLine, ordinal/step representation

### Vraag

Welk getal ontbreekt?

**7.420 → 7.430 → ? → 7.450 → 7.460**

**Correct antwoord:** 7.440  
**Toegestane invoer:** `7440`, `7.440`, `7 440`

### Visual stages

**Vraag:** vijf gelijk verdeelde posities met 7.420, 7.430, ?, 7.450 en 7.460.  
**Minnie:** markeer alleen de eerste sprong 7.420 → 7.430.  
**Moose:** label die eerste sprong met `+10` en toon een `+10`-pijl van 7.430 naar ?.  
**Uitleg:** vul 7.440 in en toon +10 boven alle sprongen.

### Minnie

Vergelijk de eerste twee getallen. Hoeveel komt er bij van 7.420 naar 7.430?

### Moose

Van 7.420 naar 7.430 komt er **10** bij. Doe vanaf 7.430 precies dezelfde sprong.

### Volledige uitleg

De reeks gaat steeds met **10 omhoog**.

7.420 + 10 = **7.430**.

Daarna komt weer 10 erbij:

7.430 + 10 = **7.440**.

Dan volgen 7.450 en 7.460.

Het ontbrekende getal is dus **7.440**.

---

## M6-NS-005 — Afronden op honderdtallen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** numberSense  
**objective:** round_to_nearest_hundred  
**reportLabel:** Getalbegrip · Afronden  
**answerMode:** multipleChoice  
**visual:** numberLine

### Vraag

Rond **6.451** af op het dichtstbijzijnde honderdtal.

### Antwoordopties

- 6.400
- 6.450
- 6.500
- 6.600

**Correct antwoord:** 6.500

### Visual stages

**Vraag:** getallenlijn van 6.400 tot 6.500 met een marker bij 6.451; het middenpunt is nog niet gelabeld.  
**Minnie:** voeg het middenpunt 6.450 toe.  
**Moose:** benadruk dat 6.451 één boven het middenpunt ligt.  
**Uitleg:** markeer 6.500 als dichtstbijzijnde honderdtal.

### Minnie

6.451 ligt tussen 6.400 en 6.500. Kijk waar het midden tussen die twee honderdtallen ligt.

### Moose

Het midden is **6.450**. Het getal 6.451 ligt net boven dat middenpunt en dus aan de kant van 6.500.

### Volledige uitleg

6.451 ligt tussen **6.400** en **6.500**.

Precies in het midden ligt **6.450**.

Getallen van 6.450 en hoger ronden we bij deze twee honderdtallen naar **6.500** af.

6.451 ligt één boven het middenpunt.

Daarom wordt **6.451 afgerond naar 6.500**.

---

## M6-NS-006 — Afronden op duizendtallen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** numberSense  
**objective:** round_to_nearest_thousand  
**reportLabel:** Getalbegrip · Afronden  
**answerMode:** openWholeNumber  
**visual:** numberLine

### Vraag

Rond **8.620** af op het dichtstbijzijnde duizendtal.

**Correct antwoord:** 9.000  
**Toegestane invoer:** `9000`, `9.000`, `9 000`

### Visual stages

**Vraag:** getallenlijn van 8.000 tot 9.000 met marker bij 8.620.  
**Minnie:** toon het middenpunt 8.500.  
**Moose:** markeer 8.620 rechts van 8.500 en laat de twee afstanden nog zonder eindantwoord zien.  
**Uitleg:** markeer 9.000 als dichtstbij.

### Minnie

8.620 ligt tussen 8.000 en 9.000. Zoek eerst het midden tussen die twee duizendtallen.

### Moose

Het midden is **8.500**. 8.620 ligt boven 8.500, dus het ligt aan de kant van 9.000.

### Volledige uitleg

Het dichtstbijzijnde lagere duizendtal is **8.000**.

Het dichtstbijzijnde hogere duizendtal is **9.000**.

Het midden is **8.500**.

Omdat **8.620 groter is dan 8.500**, ligt het dichter bij 9.000.

Dus **8.620 rond je af naar 9.000**.

---

## M6-NS-007 — Dichtst bij 10.000

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** numberSense  
**objective:** closest_value_to_target  
**reportLabel:** Getalbegrip · Afstand tot doelgetal  
**answerMode:** multipleChoice  
**visual:** numberLine

### Vraag

Welk getal ligt het dichtst bij **10.000**?

### Antwoordopties

- 9.760
- 10.140
- 9.590
- 10.420

**Correct antwoord:** 10.140

### Visual stages

**Vraag:** 10.000 als opvallend doelpunt; de vier antwoordwaarden als gemarkeerde punten.  
**Minnie:** benadruk dat je de afstand tot 10.000 moet vergelijken.  
**Moose:** toon `10.140 → 140 boven 10.000` en `9.760 → 240 onder 10.000`; andere twee blijven alleen zichtbaar.  
**Uitleg:** toon alle vier afstanden.

### Minnie

Kijk niet alleen of een getal boven of onder 10.000 ligt. Vergelijk hoeveel het van 10.000 verschilt.

### Moose

10.140 ligt **140** boven 10.000.  
9.760 ligt **240** onder 10.000.  
Welke van deze twee ligt dichterbij?

### Volledige uitleg

We vergelijken de afstand van ieder getal tot 10.000.

9.760 ligt **240** van 10.000 af.

10.140 ligt **140** van 10.000 af.

9.590 ligt **410** van 10.000 af.

10.420 ligt **420** van 10.000 af.

De kleinste afstand is **140**.

Dus **10.140** ligt het dichtst bij 10.000.

---

## M6-NS-008 — Plaatswaarden samenvoegen

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** numberSense  
**objective:** compose_number_from_place_values  
**reportLabel:** Getalbegrip · Plaatswaarde  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Vraag

Welk getal bestaat uit:

**5 duizendtallen, 2 honderdtallen, 7 tientallen en 4 eenheden?**

**Correct antwoord:** 5.274  
**Toegestane invoer:** `5274`, `5.274`, `5 274`

### Visual stages

**Vraag:** vier regels: 5 duizendtallen, 2 honderdtallen, 7 tientallen, 4 eenheden.  
**Minnie:** voeg achter iedere regel de plaatswaardenaam toe, zonder uitgerekende waarde.  
**Moose:** toon `5.000 + 200 + 70 + 4 = ?`.  
**Uitleg:** vul 5.274 in.

### Minnie

Zet elk deel eerst om naar zijn echte waarde: duizendtallen, honderdtallen, tientallen en eenheden.

### Moose

5 duizendtallen zijn 5.000, 2 honderdtallen zijn 200, 7 tientallen zijn 70 en 4 eenheden zijn 4. Zet die vier waarden bij elkaar.

### Volledige uitleg

5 duizendtallen zijn **5.000**.

2 honderdtallen zijn **200**.

7 tientallen zijn **70**.

4 eenheden zijn **4**.

Samen krijg je:

**5.000 + 200 + 70 + 4 = 5.274**.

Het gezochte getal is dus **5.274**.

---

## M6-AS-001 — Honderdtallen en tientallen optellen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** additionSubtraction  
**objective:** add_hundreds_tens  
**reportLabel:** Optellen · Honderdtallen en tientallen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**430 + 260 = 690**

### Approved surfaces

**Surface `bare`**  
430 + 260 = ?

**Surface `supplies`**  
In een voorraad liggen 430 onderdelen. Er komen 260 onderdelen bij. Hoeveel onderdelen zijn er nu?

**Correct antwoord:** 690

### Visual stages

**Vraag:** alleen de gekozen surface en het antwoordveld.  
**Minnie:** toon `260 = 200 + 60`.  
**Moose:** toon `430 + 200 = 630` en daarna `630 + 60 = ?`.  
**Uitleg:** vul 690 in.

### Minnie

Splits 260 in **200 en 60**. Tel die twee stukken één voor één bij 430 op.

### Moose

430 + 200 = **630**. Er moet nog 60 bij. Dat zijn zes tientallen.

### Volledige uitleg

We splitsen **260 in 200 en 60**.

Eerst tellen we 200 bij 430 op:

**430 + 200 = 630**.

Daarna tellen we nog 60 erbij:

**630 + 60 = 690**.

Dus **430 + 260 = 690**.

Bij de voorraadvariant zijn er dus **690 onderdelen**.

---

## M6-AS-002 — Verschil tussen twee waarden

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** additionSubtraction  
**objective:** find_difference  
**reportLabel:** Aftrekken · Verschil bepalen  
**answerMode:** openWholeNumber  
**visual:** numberLine

### Educational core

**1.642 − 1.633 = 9**

### Approved surfaces

**Surface `scores`**  
Twee spelers halen 1.642 en 1.633 punten. Hoeveel punten verschil is er?

**Surface `counters`**  
Twee tellers staan op 1.642 en 1.633. Hoe groot is het verschil tussen de twee waarden?

**Correct antwoord:** 9

### Visual stages

**Vraag:** toon beide waarden; op de getallenlijn staan 1.633 en 1.642 zonder sprongen.  
**Minnie:** voeg 1.640 als handig tussenpunt toe.  
**Moose:** toon 1.633 → 1.640 als +7 en 1.640 → 1.642 als +2, maar nog geen totaal.  
**Uitleg:** toon `7 + 2 = 9`.

### Minnie

Bij een verschil kun je van het kleinste getal naar het grootste tellen. Zoek eerst een handig tussenpunt.

### Moose

Van 1.633 naar 1.640 is **7**. Van 1.640 naar 1.642 is nog **2**. Tel die twee stukjes bij elkaar op.

### Volledige uitleg

We zoeken het verschil tussen **1.633 en 1.642**.

Van 1.633 naar 1.640 is **7**.

Van 1.640 naar 1.642 is **2**.

Samen:

**7 + 2 = 9**.

Het verschil is dus **9**.

---

# Batch 02 — Optellen/Aftrekken (6) + Vermenigvuldigen/Delen (4)

## M6-AS-003 — Aanvullen tot een rond getal

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** additionSubtraction  
**objective:** bridge_to_round_number  
**reportLabel:** Optellen · Aanvullen tot rond getal  
**answerMode:** openWholeNumber  
**visual:** numberLine

### Educational core

**3.760 + ? = 4.000**

### Approved surfaces

**Surface `bare`**  
Hoeveel moet er bij **3.760** om op **4.000** te komen?

**Surface `counter`**  
Een teller staat op **3.760**. Hoeveel moet er nog bij om **4.000** te bereiken?

**Correct antwoord:** 240

### Visual stages

**Vraag:** getallenlijn van 3.760 naar 4.000 zonder tussenpunten.  
**Minnie:** voeg 3.800 als handig tussenpunt toe.  
**Moose:** toon 3.760 → 3.800 als +40 en 3.800 → 4.000 als +200; totaalsom blijft open.  
**Uitleg:** toon `40 + 200 = 240`.

### Minnie

Ga eerst van 3.760 naar een handig rond getal. **3.800** ligt dichtbij.

### Moose

Van 3.760 naar 3.800 is **40**. Van 3.800 naar 4.000 is nog **200**. Tel die twee stukken bij elkaar op.

### Volledige uitleg

We vullen 3.760 aan tot 4.000.

Van **3.760 naar 3.800** is **40**.

Van **3.800 naar 4.000** is **200**.

Samen is dat:

**40 + 200 = 240**.

Er moet dus **240** bij.

---

## M6-AS-004 — Twee voorraden samen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** additionSubtraction  
**objective:** add_three_digit_context  
**reportLabel:** Optellen · Hoeveelheden samenvoegen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**728 + 742 = 1.470**

### Approved surfaces

**Surface `supplies`**  
In twee voorraden liggen **728** en **742** onderdelen. Hoeveel onderdelen zijn dat samen?

**Surface `visitors`**  
Op twee momenten komen **728** en **742** bezoekers binnen. Hoeveel bezoekers zijn dat samen?

**Correct antwoord:** 1.470  
**Toegestane invoer:** `1470`, `1.470`, `1 470`

### Visual stages

**Vraag:** alleen beide hoeveelheden.  
**Minnie:** toon `742 = 700 + 40 + 2`.  
**Moose:** toon `728 + 700 = 1.428`, daarna `+40` en `+2` nog als open vervolgstappen.  
**Uitleg:** vul 1.468 en 1.470 in.

### Minnie

Splits 742 in **700, 40 en 2**. Tel die delen één voor één bij 728 op.

### Moose

728 + 700 = **1.428**. Tel daarna eerst 40 erbij en daarna nog 2.

### Volledige uitleg

We splitsen **742 in 700, 40 en 2**.

Eerst:

**728 + 700 = 1.428**.

Daarna:

**1.428 + 40 = 1.468**.

En ten slotte:

**1.468 + 2 = 1.470**.

Samen zijn het dus **1.470**.

---

## M6-AS-005 — Optellen met overschrijding

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** additionSubtraction  
**objective:** add_three_digit_crossing  
**reportLabel:** Optellen · Over honderdtallen heen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**468 + 257 = 725**

### Approved surfaces

**Surface `bare`**  
**468 + 257 = ?**

**Surface `parts`**  
Er zijn **468** onderdelen. Er komen **257** onderdelen bij. Hoeveel zijn er dan?

**Correct antwoord:** 725

### Visual stages

**Vraag:** alleen de som/surface.  
**Minnie:** toon `257 = 200 + 50 + 7`.  
**Moose:** toon `468 + 200 = 668`, `668 + 50 = 718`, laatste `+7 = ?`.  
**Uitleg:** splits +7 via +2 naar 720 en +5 naar 725.

### Minnie

Splits 257 in **200, 50 en 7**. Tel eerst de grootste stukken op.

### Moose

468 + 200 = **668**.  
668 + 50 = **718**.  
Nu moet er nog 7 bij.

### Volledige uitleg

We splitsen 257 in **200, 50 en 7**.

**468 + 200 = 668**.

**668 + 50 = 718**.

Nu nog 7. Eerst 2 erbij tot 720:

**718 + 2 = 720**.

Van de 7 blijven dan nog 5 over:

**720 + 5 = 725**.

Dus **468 + 257 = 725**.

---

## M6-AS-006 — Aftrekken met overschrijding

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** additionSubtraction  
**objective:** subtract_three_digit_crossing  
**reportLabel:** Aftrekken · Over honderdtallen heen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**624 − 178 = 446**

### Approved surfaces

**Surface `bare`**  
**624 − 178 = ?**

**Surface `remaining`**  
Er zijn **624** onderdelen. Er worden **178** gebruikt. Hoeveel blijven er over?

**Correct antwoord:** 446

### Visual stages

**Vraag:** alleen de som/surface.  
**Minnie:** toon `178 = 100 + 70 + 8`.  
**Moose:** toon `624 − 100 = 524`, `524 − 70 = 454`, laatste `−8 = ?`.  
**Uitleg:** splits −8 via −4 naar 450 en −4 naar 446.

### Minnie

Splits 178 in **100, 70 en 8**. Trek die stukken één voor één af.

### Moose

624 − 100 = **524**.  
524 − 70 = **454**.  
Nu moet er nog 8 af.

### Volledige uitleg

We splitsen 178 in **100, 70 en 8**.

**624 − 100 = 524**.

**524 − 70 = 454**.

Nu nog 8 eraf. Eerst 4 eraf tot 450:

**454 − 4 = 450**.

Dan nog 4:

**450 − 4 = 446**.

Dus **624 − 178 = 446**.

---

## M6-AS-007 — Viercijferig optellen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** additionSubtraction  
**objective:** add_four_digit_and_three_digit  
**reportLabel:** Optellen · Duizendtallen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**1.836 + 475 = 2.311**

### Approved surfaces

**Surface `bare`**  
**1.836 + 475 = ?**

**Surface `distance`**  
Een route is al **1.836 meter** lang. Er komt **475 meter** bij. Hoe lang is de route daarna?

**Correct antwoord:** 2.311  
**Toegestane invoer:** `2311`, `2.311`, `2 311`

### Visual stages

**Vraag:** alleen de surface.  
**Minnie:** toon `475 = 400 + 70 + 5`.  
**Moose:** toon `1.836 + 400 = 2.236`, daarna `+70 = 2.306`; `+5` blijft open.  
**Uitleg:** toon 2.311.

### Minnie

Splits 475 in **400, 70 en 5**. Zo hoef je niet alles tegelijk op te tellen.

### Moose

1.836 + 400 = **2.236**.  
2.236 + 70 = **2.306**.  
Tel nu nog 5 erbij.

### Volledige uitleg

We splitsen 475 in **400, 70 en 5**.

**1.836 + 400 = 2.236**.

**2.236 + 70 = 2.306**.

**2.306 + 5 = 2.311**.

Dus **1.836 + 475 = 2.311**.

Bij de routevariant is de route daarna **2.311 meter** lang.

---

## M6-AS-008 — Viercijferig aftrekken

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** additionSubtraction  
**objective:** subtract_four_digit_crossing  
**reportLabel:** Aftrekken · Duizendtallen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**3.203 − 1.487 = 1.716**

### Approved surfaces

**Surface `bare`**  
**3.203 − 1.487 = ?**

**Surface `stock`**  
Er zijn **3.203** onderdelen opgeslagen. **1.487** worden meegenomen. Hoeveel blijven er achter?

**Correct antwoord:** 1.716  
**Toegestane invoer:** `1716`, `1.716`, `1 716`

### Visual stages

**Vraag:** alleen de surface.  
**Minnie:** toon `1.487 = 1.000 + 400 + 80 + 7`.  
**Moose:** toon `3.203 − 1.000 = 2.203`, `−400 = 1.803`, `−80 = 1.723`; laatste `−7 = ?`.  
**Uitleg:** splits −7 via −3 naar 1.720 en −4 naar 1.716.

### Minnie

Splits 1.487 in **1.000, 400, 80 en 7**. Trek die delen stap voor stap af.

### Moose

3.203 − 1.000 = **2.203**.  
2.203 − 400 = **1.803**.  
1.803 − 80 = **1.723**.  
Nu moet er nog 7 af.

### Volledige uitleg

We splitsen 1.487 in **1.000, 400, 80 en 7**.

**3.203 − 1.000 = 2.203**.

**2.203 − 400 = 1.803**.

**1.803 − 80 = 1.723**.

Nu nog 7 eraf. Eerst 3:

**1.723 − 3 = 1.720**.

Daarna nog 4:

**1.720 − 4 = 1.716**.

Dus **3.203 − 1.487 = 1.716**.

---

## M6-MD-001 — Vermenigvuldigen via splitsen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** multiplicationDivision  
**objective:** multiply_one_digit_two_digit  
**reportLabel:** Vermenigvuldigen · Tientallen en eenheden splitsen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**6 × 24 = 144**

### Approved surfaces

**Surface `bare`**  
**6 × 24 = ?**

**Surface `groups`**  
Er zijn **6 dozen** met elk **24 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Correct antwoord:** 144

### Visual stages

**Vraag:** alleen de surface.  
**Minnie:** toon `24 = 20 + 4`.  
**Moose:** toon `6 × 20 = 120`; `6 × 4 = ?` blijft open.  
**Uitleg:** toon `6 × 4 = 24` en `120 + 24 = 144`.

### Minnie

Splits 24 in **20 en 4**. Reken eerst 6 × 20 en daarna 6 × 4.

### Moose

6 × 20 = **120**. Reken nu 6 × 4 en tel dat antwoord bij 120 op.

### Volledige uitleg

We splitsen 24 in **20 en 4**.

**6 × 20 = 120**.

**6 × 4 = 24**.

Tel die twee uitkomsten bij elkaar op:

**120 + 24 = 144**.

Dus **6 × 24 = 144**.

---

## M6-MD-002 — Groeperend delen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** multiplicationDivision  
**objective:** division_grouping  
**reportLabel:** Delen · Groepjes maken  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**160 ÷ 16 = 10 groepen**

### Approved surfaces

**Surface `pages`**  
Een boek heeft **160 pagina’s**. Je leest steeds **16 pagina’s**. Hoeveel keer moet je 16 pagina’s lezen om het boek uit te krijgen?

**Surface `packs`**  
Er zijn **160 onderdelen**. In elk pakket gaan **16 onderdelen**. Hoeveel pakketten kun je maken?

**Correct antwoord:** 10

### Minnie

Je zoekt niet hoeveel er in één groep komt. Je weet al dat elke groep 16 bevat. Je zoekt **hoeveel groepjes van 16** er in 160 passen.

### Moose

Denk aan de keersom **16 × ? = 160**. Tien groepjes van 16 kun je controleren met 16 × 10.

### Volledige uitleg

We zoeken hoeveel groepjes van 16 in 160 passen.

Dat is dezelfde vraag als:

**16 × ? = 160**.

**16 × 10 = 160**.

Er passen dus **10 groepjes van 16** in 160.

Het antwoord is **10**.

---

## M6-MD-003 — Twintig gelijke groepen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** multiplicationDivision  
**objective:** multiply_by_twenty_context  
**reportLabel:** Vermenigvuldigen · Veel gelijke groepen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**20 × 18 = 360**

### Approved surfaces

**Surface `tickets`**  
Er worden **20 kaartjes** verkocht voor **18 euro per stuk**. Hoeveel euro is dat samen?

**Surface `boxes`**  
Er zijn **20 dozen** met elk **18 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Correct antwoord:** 360

### Minnie

20 is twee keer 10. Reken eerst **10 × 18**.

### Moose

10 × 18 = **180**. Twintig groepjes zijn twee keer zoveel als tien groepjes. Verdubbel 180.

### Volledige uitleg

Eerst rekenen we met 10 groepjes:

**10 × 18 = 180**.

Maar we hebben **20 groepjes**. Dat is twee keer zoveel.

**180 + 180 = 360**.

Dus **20 × 18 = 360**.

---

## M6-MD-004 — Gelijk verdelen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** multiplicationDivision  
**objective:** division_sharing  
**reportLabel:** Delen · Gelijk verdelen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**84 ÷ 7 = 12**

### Approved surfaces

**Surface `boxes`**  
Verdeel **84 onderdelen** eerlijk over **7 bakken**. Hoeveel onderdelen komen in elke bak?

**Surface `teams`**  
Verdeel **84 kaartjes** eerlijk over **7 teams**. Hoeveel kaartjes krijgt elk team?

**Correct antwoord:** 12

### Minnie

Je verdeelt 84 eerlijk over 7 gelijke groepen. Zoek dus hoeveel er in **één groep** komt.

### Moose

Gebruik de omgekeerde keersom: **7 × ? = 84**. Denk eerst aan 7 × 10 = 70. Hoeveel moet er daarna nog bij?

### Volledige uitleg

We verdelen 84 over 7 gelijke groepen.

**7 × 10 = 70**.

Van 70 naar 84 ontbreken nog **14**.

**7 × 2 = 14**.

Dus:

**7 × 12 = 84**.

Daarom is:

**84 ÷ 7 = 12**.

Elke groep krijgt **12**.

---

# Batch 03 — Vermenigvuldigen/Delen (6) + Breuken/Verhoudingen (4)

**Batch difficulty:** 5 Instap · 3 Normaal · 2 Uitdagend

## M6-MD-005 — Vermenigvuldigen met tientallen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** multiplicationDivision  
**objective:** multiply_by_multiple_of_ten  
**reportLabel:** Vermenigvuldigen · Tientallen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**7 × 40 = 280**

### Approved surfaces

**Surface `bare`**  
**7 × 40 = ?**

**Surface `bundles`**  
Er zijn **7 bundels** met elk **40 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Correct antwoord:** 280

### Visual stages

**Vraag:** alleen de gekozen surface.  
**Minnie:** toon `40 = 4 tientallen`.  
**Moose:** toon `7 × 4 = 28` en daarnaast `28 tientallen = ?`.  
**Uitleg:** toon `28 tientallen = 280`.

### Minnie

Denk bij 40 aan **4 tientallen**. Reken eerst 7 × 4.

### Moose

7 × 4 = **28**. Maar je rekent met tientallen: het zijn dus **28 tientallen**. Hoeveel is dat?

### Volledige uitleg

40 is hetzelfde als **4 tientallen**.

Eerst rekenen we:

**7 × 4 = 28**.

Dat zijn **28 tientallen**.

28 tientallen zijn:

**28 × 10 = 280**.

Dus **7 × 40 = 280**.

---

## M6-MD-006 — Grotere deelsom

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** multiplicationDivision  
**objective:** divide_three_digit_by_one_digit  
**reportLabel:** Delen · Grotere deelsom  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**168 ÷ 7 = 24**

### Approved surfaces

**Surface `bare`**  
**168 : 7 = ?**

**Surface `sharing`**  
Verdeel **168 onderdelen** eerlijk over **7 groepen**. Hoeveel krijgt elke groep?

**Correct antwoord:** 24

### Visual stages

**Vraag:** alleen de gekozen surface.  
**Minnie:** toon `168 = 140 + 28`.  
**Moose:** toon `140 : 7 = 20` en `28 : 7 = ?`.  
**Uitleg:** toon `28 : 7 = 4` en `20 + 4 = 24`.

### Minnie

Splits 168 in twee stukken die makkelijk door 7 te delen zijn. **140 en 28** werken goed.

### Moose

140 : 7 = **20**.  
Er blijft nog 28 over. Reken 28 : 7 en tel dat bij 20 op.

### Volledige uitleg

We splitsen 168 in **140 en 28**.

**140 : 7 = 20**.

**28 : 7 = 4**.

Samen:

**20 + 4 = 24**.

Dus **168 : 7 = 24**.

---

## M6-MD-007 — Grotere vermenigvuldiging

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** multiplicationDivision  
**objective:** multiply_one_digit_two_digit_crossing  
**reportLabel:** Vermenigvuldigen · Grotere keersom  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**8 × 38 = 304**

### Approved surfaces

**Surface `bare`**  
**8 × 38 = ?**

**Surface `crates`**  
Er staan **8 kratten** met elk **38 onderdelen**. Hoeveel onderdelen zijn dat samen?

**Correct antwoord:** 304

### Visual stages

**Vraag:** alleen de gekozen surface.  
**Minnie:** toon `38 = 30 + 8`.  
**Moose:** toon `8 × 30 = 240` en `8 × 8 = 64`; totaalsom blijft open.  
**Uitleg:** toon `240 + 64 = 304`.

### Minnie

Splits 38 in **30 en 8**. Reken beide stukken apart uit.

### Moose

8 × 30 = **240**.  
8 × 8 = **64**.  
Tel 240 en 64 bij elkaar op.

### Volledige uitleg

We splitsen 38 in **30 en 8**.

**8 × 30 = 240**.

**8 × 8 = 64**.

Daarna tellen we de twee uitkomsten op:

**240 + 64 = 304**.

Dus **8 × 38 = 304**.

---

## M6-MD-008 — Hoeveel groepen kun je maken?

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** multiplicationDivision  
**objective:** division_grouping_context  
**reportLabel:** Delen · Aantal groepen bepalen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**400 ÷ 40 = 10**

### Approved surfaces

**Surface `budget`**  
Er is **€400** beschikbaar. Elk pakket kost **€40**. Hoeveel pakketten kunnen er worden gekocht?

**Surface `length`**  
Er is **400 meter** kabel. Voor één traject is **40 meter** nodig. Voor hoeveel trajecten is er genoeg kabel?

**Correct antwoord:** 10

### Visual stages

**Vraag:** alleen de gekozen surface.  
**Minnie:** benadruk `40 × ? = 400`.  
**Moose:** toon `4 × ? = 40` als vereenvoudigde gedachte; eindantwoord blijft open.  
**Uitleg:** toon `40 × 10 = 400` en `400 : 40 = 10`.

### Minnie

Je weet hoeveel één groep kost of gebruikt. Zoek hoeveel groepjes van **40** er in **400** passen.

### Moose

Denk aan de omgekeerde keersom: **40 × ? = 400**. Je kunt eerst de nullen even wegdenken en 4 × ? = 40 gebruiken.

### Volledige uitleg

We zoeken hoeveel groepen van 40 in 400 passen.

De omgekeerde keersom is:

**40 × ? = 400**.

Omdat:

**40 × 10 = 400**,

geldt ook:

**400 : 40 = 10**.

Er kunnen dus **10 groepen** worden gemaakt.

---

## M6-MD-009 — Delen met een betekenisvolle rest

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** multiplicationDivision  
**objective:** division_remainder_round_up_context  
**reportLabel:** Delen · Rest betekenis geven  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**29 items, maximaal 6 per doos → 5 dozen nodig**

### Approved surfaces

**Surface `boxes`**  
Er moeten **29 onderdelen** worden ingepakt. In één doos passen maximaal **6 onderdelen**. Hoeveel dozen zijn er minimaal nodig?

**Surface `vehicles`**  
Er moeten **29 mensen** mee. In één voertuig passen maximaal **6 mensen**. Hoeveel voertuigen zijn er minimaal nodig?

**Correct antwoord:** 5

### Visual stages

**Vraag:** toon 29 en capaciteit 6, zonder groepen te tekenen.  
**Minnie:** toon `6 × 4 = 24`.  
**Moose:** toon `29 − 24 = 5` en een lege vijfde groep; eindantwoord blijft open.  
**Uitleg:** toon vier volle groepen van 6 plus één groep met 5.

### Minnie

Kijk eerst hoeveel je met **4 groepen van 6** kunt meenemen of inpakken.

### Moose

4 × 6 = **24**.  
Van de 29 blijven dan **5** over. Die 5 hebben nog steeds een plek nodig.

### Volledige uitleg

Met 4 dozen of voertuigen kun je kwijt:

**4 × 6 = 24**.

Maar er zijn 29 onderdelen of mensen.

Er blijven dus over:

**29 − 24 = 5**.

Voor die 5 is nog één extra doos of voertuig nodig.

Dus zijn er minimaal:

**4 + 1 = 5**.

Het antwoord is **5**.

---

## M6-MD-010 — Meerstaps vermenigvuldigen

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** multiplicationDivision  
**objective:** multiply_two_layers_context  
**reportLabel:** Vermenigvuldigen · Meerstaps context  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**7 groepen × 6 rijen × 8 items = 336**

### Approved surfaces

**Surface `storage`**  
Er staan **7 rekken**. Elk rek heeft **6 rijen** met **8 onderdelen per rij**. Hoeveel onderdelen zijn dat samen?

**Surface `seating`**  
Er zijn **7 vakken**. Elk vak heeft **6 rijen** met **8 plaatsen per rij**. Hoeveel plaatsen zijn dat samen?

**Correct antwoord:** 336

### Visual stages

**Vraag:** toon `7 × 6 × 8`, zonder tussenuitkomst.  
**Minnie:** benadruk dat eerst één rek/vak kan worden uitgerekend: `6 × 8`.  
**Moose:** toon `6 × 8 = 48` en daarna `7 × 48 = ?`.  
**Uitleg:** splits `7 × 48` in `7 × 40 + 7 × 8` en toon 336.

### Minnie

Reken eerst uit hoeveel onderdelen of plaatsen er in **één rek of vak** zitten. Daarvoor gebruik je 6 × 8.

### Moose

6 × 8 = **48**.  
Eén rek of vak heeft dus 48 onderdelen of plaatsen. Er zijn er 7. Reken nu **7 × 48**.

### Volledige uitleg

Eerst rekenen we één rek of vak uit:

**6 × 8 = 48**.

Er zijn **7** van zulke rekken of vakken.

Dus rekenen we:

**7 × 48**.

Splits 48 in 40 en 8:

**7 × 40 = 280**.

**7 × 8 = 56**.

Samen:

**280 + 56 = 336**.

Het totaal is dus **336**.

---

## M6-FR-001 — Breuk uit een afbeelding herkennen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** fractionsRatios  
**objective:** identify_fraction_from_visual  
**reportLabel:** Breuken · Breuk herkennen  
**answerMode:** multipleChoice  
**visual:** fractionStrip + proper fraction renderer

### Educational core

**3 van 8 gelijke delen gekleurd → 3/8**

### Vraag

De strook is verdeeld in **8 gelijke delen**. **3 delen** zijn gekleurd.

Welke breuk hoort daarbij?

### Antwoordopties

- 3/8
- 5/8
- 3/5
- 8/3

**Correct antwoord:** 3/8

### Visual stages

**Vraag:** fractionStrip met 8 gelijke vakken waarvan 3 gekleurd; antwoorden worden met gestapelde breuken weergegeven.  
**Minnie:** markeer de 8 gelijke delen subtiel en label alleen `8 delen in totaal`.  
**Moose:** voeg `3 gekleurd` toe en accentueer de drie gekleurde delen.  
**Uitleg:** toon gestapeld `3/8` naast de strook, met teller- en noemerlabels.

### Minnie

De **noemer** vertelt in hoeveel gelijke delen het geheel is verdeeld. Tel eerst hoeveel delen er in totaal zijn.

### Moose

Er zijn **8 delen in totaal** en **3 daarvan zijn gekleurd**. Het aantal gekleurde delen komt boven de breukstreep.

### Volledige uitleg

De strook is verdeeld in **8 gelijke delen**.

Daarvan zijn **3 delen gekleurd**.

Bij een breuk staat het aantal gekozen of gekleurde delen bovenaan en het totaal aantal gelijke delen onderaan.

Dus de breuk is **3/8**.

---

## M6-FR-002 — De helft van een hoeveelheid

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** fractionsRatios  
**objective:** fraction_of_quantity_half  
**reportLabel:** Breuken · Helft van een hoeveelheid  
**answerMode:** openWholeNumber  
**visual:** fractionStrip

### Educational core

**1/2 van 18 = 9**

### Approved surfaces

**Surface `items`**  
Er zijn **18 onderdelen**. De helft wordt gebruikt. Hoeveel onderdelen is dat?

**Surface `group`**  
Een groep bestaat uit **18 kinderen**. De helft staat aan één kant. Hoeveel kinderen zijn dat?

**Correct antwoord:** 9

### Visual stages

**Vraag:** toon een hoeveelheid van 18 als één geheel, zonder individuele 18 objecten verplicht te tekenen; toon daarnaast een lege 1/2-indicatie.  
**Minnie:** verdeel de visual in 2 gelijke delen.  
**Moose:** toon `18 : 2 = ?`.  
**Uitleg:** toon 9 in elk deel en markeer één helft.

### Minnie

Een helft betekent dat je het geheel in **2 gelijke delen** verdeelt.

### Moose

Verdeel 18 in 2 gelijke delen. Reken dus **18 : 2**.

### Volledige uitleg

Een helft is **1 van 2 gelijke delen**.

Daarom delen we 18 door 2:

**18 : 2 = 9**.

De helft van 18 is dus **9**.

---

## M6-FR-003 — Een kwart van een hoeveelheid

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** fractionsRatios  
**objective:** fraction_of_quantity_quarter  
**reportLabel:** Breuken · Kwart van een hoeveelheid  
**answerMode:** openWholeNumber  
**visual:** fractionStrip

### Educational core

**1/4 van 28 = 7**

### Approved surfaces

**Surface `supplies`**  
Er zijn **28 onderdelen**. Een kwart wordt apart gelegd. Hoeveel onderdelen zijn dat?

**Surface `tickets`**  
Er zijn **28 kaartjes**. Een kwart is al uitgedeeld. Hoeveel kaartjes zijn dat?

**Correct antwoord:** 7

### Visual stages

**Vraag:** toon 28 als één hoeveelheid met een gestapelde 1/4 ernaast; geen antwoord.  
**Minnie:** verdeel de hoeveelheid visueel in 4 gelijke delen.  
**Moose:** toon `28 : 4 = ?`.  
**Uitleg:** toon vier gelijke groepen van 7 en markeer één groep.

### Minnie

Een kwart betekent **1 van 4 gelijke delen**. Verdeel 28 dus eerst in 4 gelijke groepen.

### Moose

Reken **28 : 4**. Eén van die vier gelijke groepen is het kwart dat je zoekt.

### Volledige uitleg

Een kwart is **1 van 4 gelijke delen**.

We verdelen 28 daarom in 4 gelijke groepen:

**28 : 4 = 7**.

Eén kwart van 28 is dus **7**.

---

## M6-FR-004 — Eenvoudige verhouding opschalen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** fractionsRatios  
**objective:** scale_ratio_double  
**reportLabel:** Verhoudingen · Opschalen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**2 eenheden → 12 items; 4 eenheden → 24 items**

### Approved surfaces

**Surface `boxes`**  
In **2 dozen** zitten samen **12 lampen**. Elke doos bevat evenveel. Hoeveel lampen zitten er samen in **4 dozen**?

**Surface `tables`**  
Voor **2 tafels** zijn samen **12 stoelen** nodig. Elke tafel krijgt evenveel stoelen. Hoeveel stoelen zijn nodig voor **4 tafels**?

**Correct antwoord:** 24

### Visual stages

**Vraag:** toon `2 → 12` en `4 → ?`.  
**Minnie:** benadruk dat 4 precies twee keer zoveel is als 2.  
**Moose:** toon een ×2-pijl van 2 naar 4 en dezelfde ×2-pijl bij 12 naar ?.  
**Uitleg:** toon `12 × 2 = 24`.

### Minnie

Vergelijk eerst 2 met 4. Hoeveel keer zo groot is 4?

### Moose

Van 2 naar 4 doe je **×2**. Bij een gelijke verhouding moet je aan de andere kant hetzelfde doen: **12 × 2**.

### Volledige uitleg

4 is precies **2 keer zoveel** als 2.

Daarom moet de andere hoeveelheid ook 2 keer zo groot worden.

**12 × 2 = 24**.

Dus bij 4 dozen of tafels horen **24** lampen of stoelen.

---

# Batch 04 — Breuken/Verhoudingen (6) + Geld (4)

**Batch difficulty:** 5 Instap · 3 Normaal · 2 Uitdagend

## M6-FR-005 — Van meerdere gelijke groepen naar één groep

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** fractionsRatios  
**objective:** ratio_find_unit  
**reportLabel:** Verhoudingen · Eén groep bepalen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**3 gelijke groepen → 18 items; 1 groep → 6 items**

### Approved surfaces

**Surface `boxes`**  
In **3 gelijke dozen** zitten samen **18 lampen**. In elke doos zitten evenveel lampen. Hoeveel lampen zitten in **1 doos**?

**Surface `tables`**  
Bij **3 gelijke tafels** staan samen **18 stoelen**. Bij elke tafel staan evenveel stoelen. Hoeveel stoelen staan bij **1 tafel**?

**Correct antwoord:** 6

### Visual stages

**Vraag:** toon `3 groepen → 18` en `1 groep → ?`.  
**Minnie:** benadruk dat de 18 eerlijk over 3 gelijke groepen verdeeld zijn.  
**Moose:** toon `18 : 3 = ?`.  
**Uitleg:** toon drie gelijke groepen van 6 en `18 : 3 = 6`.

### Minnie

Je weet hoeveel er in **3 gelijke groepen samen** zitten. Verdeel 18 daarom eerlijk over die 3 groepen.

### Moose

Reken **18 : 3**. De uitkomst vertelt hoeveel er in één groep zitten.

### Volledige uitleg

De 18 lampen of stoelen zijn verdeeld over **3 gelijke groepen**.

Daarom rekenen we:

**18 : 3 = 6**.

In één doos of bij één tafel horen dus **6** lampen of stoelen.

---

## M6-FR-006 — Twee derde van een hoeveelheid

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** fractionsRatios  
**objective:** fraction_of_quantity_multiple_parts  
**reportLabel:** Breuken · Meerdere delen van een hoeveelheid  
**answerMode:** openWholeNumber  
**visual:** fractionStrip + proper fraction renderer

### Educational core

**2/3 van 60 = 40**

### Approved surfaces

**Surface `supplies`**  
Er zijn **60 onderdelen**. **Twee derde** wordt gebruikt. Hoeveel onderdelen zijn dat?

**Surface `tickets`**  
Er zijn **60 kaartjes**. **Twee derde** is al uitgedeeld. Hoeveel kaartjes zijn dat?

**Correct antwoord:** 40

### Visual stages

**Vraag:** toon 60 als geheel met gestapelde `2/3`, zonder verdeling.  
**Minnie:** verdeel het geheel visueel in 3 gelijke delen.  
**Moose:** toon `60 : 3 = 20` en markeer twee van de drie delen; eindtotaal blijft open.  
**Uitleg:** toon `20 + 20 = 40` of `2 × 20 = 40`.

### Minnie

Bij twee derde verdeel je het geheel eerst in **3 gelijke delen**. Zoek dus eerst hoeveel **één derde** van 60 is.

### Moose

60 : 3 = **20**. Dat is één derde. Je hebt **twee** van die delen nodig.

### Volledige uitleg

Eerst zoeken we één derde van 60:

**60 : 3 = 20**.

Twee derde bestaat uit twee van zulke delen:

**20 + 20 = 40**.

Dus **2/3 van 60 = 40**.

---

## M6-FR-007 — Het geheel vinden vanuit één derde

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** fractionsRatios  
**objective:** find_whole_from_unit_fraction  
**reportLabel:** Breuken · Geheel terugvinden  
**answerMode:** openWholeNumber  
**visual:** fractionStrip + proper fraction renderer

### Educational core

**12 is 1/3 van het geheel → geheel = 36**

### Approved surfaces

**Surface `crates`**  
**12 onderdelen** vormen **één derde** van de hele voorraad. Hoeveel onderdelen zitten er in de hele voorraad?

**Surface `visitors`**  
**12 bezoekers** vormen **één derde** van de hele groep. Hoeveel bezoekers zijn er in totaal?

**Correct antwoord:** 36

### Visual stages

**Vraag:** toon één gevuld deel met `12` en daarnaast twee lege gelijke delen.  
**Minnie:** benadruk dat één derde betekent dat het geheel uit 3 even grote delen bestaat.  
**Moose:** kopieer `12` naar de twee lege delen en toon `12 + 12 + 12 = ?`.  
**Uitleg:** toon `3 × 12 = 36`.

### Minnie

Als 12 **één derde** is, bestaat het hele aantal uit **3 even grote delen** van 12.

### Moose

Je hebt drie delen van 12 nodig. Reken **12 + 12 + 12** of **3 × 12**.

### Volledige uitleg

12 is **één derde** van het geheel.

Een geheel bestaat uit **3 derden**.

Daarom nemen we 12 drie keer:

**3 × 12 = 36**.

Het hele aantal is dus **36**.

---

## M6-FR-008 — Verhouding via één eenheid

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** fractionsRatios  
**objective:** ratio_scale_via_unit  
**reportLabel:** Verhoudingen · Via één eenheid opschalen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**3 eenheden → 450 gram; 1 → 150 gram; 7 → 1.050 gram**

### Approved surfaces

**Surface `trays`**  
Voor **3 schalen** is samen **450 gram** materiaal nodig. Elke schaal gebruikt evenveel. Hoeveel gram is nodig voor **7 schalen**?

**Surface `packages`**  
Voor **3 pakketten** is samen **450 gram** materiaal nodig. Elk pakket gebruikt evenveel. Hoeveel gram is nodig voor **7 pakketten**?

**Correct antwoord:** 1.050  
**Toegestane invoer:** `1050`, `1.050`, `1 050`

### Visual stages

**Vraag:** toon `3 → 450 g` en `7 → ?`.  
**Minnie:** voeg tussenstap `1 → ?` toe.  
**Moose:** toon `450 : 3 = 150 g` en daarna `7 × 150 = ?`.  
**Uitleg:** toon `7 × 150 = 1.050 g`.

### Minnie

Ga eerst terug naar **1 schaal of pakket**. Verdeel 450 gram daarvoor door 3.

### Moose

450 : 3 = **150 gram** per schaal of pakket. Voor 7 stuks heb je dus **7 × 150** gram nodig.

### Volledige uitleg

Eerst zoeken we hoeveel één schaal of pakket nodig heeft:

**450 : 3 = 150 gram**.

Daarna rekenen we voor 7 stuks:

**7 × 150 = 1.050 gram**.

Er is dus **1.050 gram** nodig.

---

## M6-FR-009 — Het geheel vinden vanuit twee vijfde

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** fractionsRatios  
**objective:** find_whole_from_nonunit_fraction  
**reportLabel:** Breuken · Geheel vanuit meerdere breukdelen  
**answerMode:** openWholeNumber  
**visual:** fractionStrip + proper fraction renderer

### Educational core

**14 is 2/5 van het geheel → 1/5 = 7 → geheel = 35**

### Approved surfaces

**Surface `supplies`**  
**14 onderdelen** zijn **twee vijfde** van de hele voorraad. Hoeveel onderdelen zitten er in de hele voorraad?

**Surface `route`**  
**14 kilometer** is **twee vijfde** van de hele route. Hoeveel kilometer is de hele route?

**Correct antwoord:** 35

### Visual stages

**Vraag:** fractionStrip met 5 gelijke delen; twee aangrenzende delen samen gelabeld `14`; overige drie delen leeg.  
**Minnie:** scheid de twee gevulde vijfden zichtbaar van elkaar.  
**Moose:** toon `14 : 2 = 7` bij één vijfde; eindtotaal blijft open.  
**Uitleg:** label alle vijf delen met 7 en toon `5 × 7 = 35`.

### Minnie

De 14 hoort bij **2 gelijke delen**. Zoek eerst hoeveel **één vijfde** is.

### Moose

Twee vijfden zijn samen 14. Dus één vijfde is:

**14 : 2 = 7**.

Het hele aantal bestaat uit **5** van zulke delen.

### Volledige uitleg

14 is **2/5** van het geheel.

Eerst zoeken we één vijfde:

**14 : 2 = 7**.

Het hele aantal bestaat uit 5 vijfden:

**5 × 7 = 35**.

Het geheel is dus **35**.

---

## M6-FR-010 — Verhouding opschalen via de eenheidswaarde

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** fractionsRatios  
**objective:** ratio_scale_via_unit_multistep  
**reportLabel:** Verhoudingen · Meerstaps opschalen  
**answerMode:** openWholeNumber  
**visual:** calculationSteps

### Educational core

**4 eenheden → 28 items; 1 → 7 items; 9 → 63 items**

### Approved surfaces

**Surface `trays`**  
Op **4 schalen** liggen samen **28 flesjes**. Op elke schaal liggen evenveel flesjes. Hoeveel flesjes liggen er samen op **9 schalen**?

**Surface `shelves`**  
Op **4 planken** staan samen **28 boeken**. Op elke plank staan evenveel boeken. Hoeveel boeken staan er samen op **9 planken**?

**Correct antwoord:** 63

### Visual stages

**Vraag:** toon `4 → 28` en `9 → ?`.  
**Minnie:** voeg `1 → ?` als noodzakelijke tussenstap toe.  
**Moose:** toon `28 : 4 = 7` en daarna `9 × 7 = ?`.  
**Uitleg:** toon `9 × 7 = 63`.

### Minnie

Van 4 naar 9 kun je niet in één eenvoudige verdubbelstap gaan. Zoek daarom eerst hoeveel er bij **1 schaal of plank** horen.

### Moose

28 : 4 = **7** per schaal of plank. Voor 9 schalen of planken moet je nu **9 × 7** rekenen.

### Volledige uitleg

Eerst rekenen we terug naar één schaal of plank:

**28 : 4 = 7**.

Daarna schalen we op naar 9:

**9 × 7 = 63**.

Er zijn dus **63** flesjes of boeken.

---

## M6-MO-001 — Geld tellen met biljetten en munten

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** money  
**objective:** count_currency_visual  
**reportLabel:** Geld · Bedrag tellen  
**answerMode:** structuredMoney  
**visual:** currency/count

### Educational core

**€20 + €5 + €2 + €0,50 = €27,50**

### Vraag

Hoeveel geld zie je in totaal?

### Currency visual

- 1 × 2000 cent
- 1 × 500 cent
- 1 × 200 cent
- 1 × 50 cent

**Correct antwoord:** 2.750 cent = **€27,50**

### Answer contract

Gebruik de bestaande gestructureerde euro/cent-invoer.  
Geldige invoer is bijvoorbeeld `27` euro en `50` cent.  
Lege/ongeldige invoer telt niet als inhoudelijke fout.

### Visual stages

**Vraag:** toon de vier echte currency-assets zonder bedragen op te tellen.  
**Minnie:** groepeer visueel de drie hele-eurobedragen apart van de 50 cent.  
**Moose:** toon `€20 + €5 + €2 = €27`; 50 cent blijft als laatste stap zichtbaar.  
**Uitleg:** toon `€27 + €0,50 = €27,50`.

### Minnie

Tel eerst de **hele euro’s** bij elkaar op. Kijk daarna pas naar de centen.

### Moose

€20 + €5 + €2 = **€27**. Er ligt ook nog **50 cent**.

### Volledige uitleg

Eerst tellen we de hele euro’s:

**€20 + €5 + €2 = €27**.

Daar komt nog **€0,50** bij.

Dus:

**€27 + €0,50 = €27,50**.

Het totale bedrag is **€27,50**.

---

## M6-MO-002 — Geld tellen met euro’s en centen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** money  
**objective:** count_currency_visual_mixed_cents  
**reportLabel:** Geld · Euro’s en centen tellen  
**answerMode:** structuredMoney  
**visual:** currency/count

### Educational core

**€10 + €2 + €1 + €0,50 + €0,10 + €0,05 = €13,65**

### Vraag

Hoeveel geld zie je in totaal?

### Currency visual

- 1 × 1000 cent
- 1 × 200 cent
- 1 × 100 cent
- 1 × 50 cent
- 1 × 10 cent
- 1 × 5 cent

**Correct antwoord:** 1.365 cent = **€13,65**

### Answer contract

Gebruik de bestaande gestructureerde euro/cent-invoer.  
Geldige invoer: `13` euro en `65` cent.  
Lege/ongeldige invoer telt niet als inhoudelijke fout.

### Visual stages

**Vraag:** toon alle echte currency-assets.  
**Minnie:** groepeer euro’s en centen visueel in twee rijen.  
**Moose:** toon `€10 + €2 + €1 = €13` en `50 + 10 + 5 = 65 cent`; eindbedrag blijft open.  
**Uitleg:** combineer naar `€13,65`.

### Minnie

Maak twee groepjes: **hele euro’s** en **centen**. Tel die apart.

### Moose

De hele euro’s zijn samen **€13**.  
De centen zijn **50 + 10 + 5 = 65 cent**.  
Zet die twee delen nu samen.

### Volledige uitleg

De hele euro’s:

**€10 + €2 + €1 = €13**.

De centen:

**50 + 10 + 5 = 65 cent**.

Samen is dat:

**€13,65**.

---

## M6-MO-003 — Wisselgeld berekenen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** money  
**objective:** calculate_change_to_next_euro  
**reportLabel:** Geld · Wisselgeld  
**answerMode:** structuredMoney  
**visual:** moneyReceipt

### Educational core

**Prijs €3,20; betaald €4,00 → wisselgeld €0,80**

### Approved surfaces

**Surface `purchase`**  
Iets kost **€3,20**. Je betaalt met **€4,00**. Hoeveel geld krijg je terug?

**Surface `ticket`**  
Een kaartje kost **€3,20**. Je betaalt met **€4,00**. Hoeveel wisselgeld krijg je?

**Correct antwoord:** 80 cent = **€0,80**

### Answer contract

Gebruik de bestaande gestructureerde euro/cent-invoer.  
`0 euro, 80 cent` is correct.  
Leeg euroveld + `80` cent mag volgens de bestaande money-inputregels eveneens naar €0,80 normaliseren.

### Visual stages

**Vraag:** receipt met prijs €3,20 en betaald €4,00; wisselgeldregel `?`.  
**Minnie:** toon tussenpunt €3,50.  
**Moose:** toon `€3,20 → €3,50 = €0,30` en `€3,50 → €4,00 = €0,50`; totaal blijft open.  
**Uitleg:** toon `€0,30 + €0,50 = €0,80`.

### Minnie

Tel vanaf €3,20 omhoog naar €4,00. Een tussenstap via **€3,50** kan helpen.

### Moose

Van €3,20 naar €3,50 is **€0,30**.  
Van €3,50 naar €4,00 is **€0,50**.  
Tel die twee bedragen bij elkaar op.

### Volledige uitleg

We tellen vanaf de prijs omhoog naar het betaalde bedrag.

Van **€3,20 naar €3,50** is **€0,30**.

Van **€3,50 naar €4,00** is **€0,50**.

Samen:

**€0,30 + €0,50 = €0,80**.

Je krijgt dus **€0,80 wisselgeld**.

---

## M6-MO-004 — Een exact bedrag samenstellen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** money  
**objective:** compose_exact_currency_amount  
**reportLabel:** Geld · Bedrag samenstellen  
**answerMode:** currencyCompose  
**visual:** currency/compose

### Educational core

**Stel exact €8,50 samen**

### Vraag

Maak precies **€8,50** met de munten en biljetten.

### Currency interaction

**targetCents:** 850

**Beschikbare denominaties:**
- 500 cent
- 200 cent
- 100 cent
- 50 cent

De leerling mag van iedere beschikbare denominatie meerdere exemplaren kiezen.

### Answer contract

Iedere combinatie is correct als:

**Σ denomination × count = 850 cent**

Voorbeeld van één correcte combinatie:

**€5 + €2 + €1 + €0,50 = €8,50**

Dit voorbeeld wordt niet getoond in de vraagfase.

Geen selectie / totaal 0 bij controleren is invoerfeedback en telt niet als inhoudelijke fout.

### Visual stages

**Vraag:** currency-compose interface met target €8,50 en vier beschikbare echte currency-assets.  
**Minnie:** benadruk alleen het doelbedrag en de grootste beschikbare denominatie; nog geen gekozen aantallen.  
**Moose:** toon als strategie `Begin bijvoorbeeld met €5. Dan moet je nog €3,50 maken.` zonder verdere oplossing.  
**Uitleg:** toon één geldige route: `€5 + €2 + €1 + €0,50 = €8,50`, met expliciete melding dat andere combinaties ook goed kunnen zijn.

### Minnie

Begin met een groot bedrag dat **niet over €8,50 heen gaat**. Kijk daarna hoeveel er nog ontbreekt.

### Moose

Je kunt bijvoorbeeld beginnen met **€5**. Dan moet je nog **€3,50** samenstellen met de andere bedragen.

### Volledige uitleg

Er zijn meerdere goede combinaties mogelijk.

Eén mogelijkheid is:

**€5 + €2 + €1 + €0,50 = €8,50**.

Controle:

**€5 + €2 = €7**.

**€7 + €1 = €8**.

**€8 + €0,50 = €8,50**.

Elke andere gekozen combinatie die precies **€8,50** vormt, is ook correct.

---

# Batch 05 — Geld (4) + Tijd/Klok (6)

**Batch difficulty:** 5 Instap · 4 Normaal · 1 Uitdagend

## M6-MO-005 — Exact bedrag samenstellen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** money  
**objective:** compose_exact_currency_amount  
**reportLabel:** Geld · Bedrag samenstellen  
**answerMode:** currencyCompose  
**visual:** currency/compose

### Educational core

**Stel exact €24,50 samen**

### Vraag

Maak precies **€24,50** met de munten en biljetten.

### Currency interaction

**targetCents:** 2450

**Beschikbare denominaties:**
- 2000 cent
- 1000 cent
- 500 cent
- 200 cent
- 100 cent
- 50 cent

De leerling mag van iedere beschikbare denominatie meerdere exemplaren kiezen.

### Answer contract

Iedere combinatie is correct als:

**Σ denomination × count = 2450 cent**

Voorbeeld van één correcte combinatie:

**€20 + €2 + €2 + €0,50 = €24,50**

Dit voorbeeld wordt niet getoond in de vraagfase.

Geen selectie / totaal 0 bij controleren is invoerfeedback en telt niet als inhoudelijke fout.

### Visual stages

**Vraag:** currency-compose interface met target €24,50 en de beschikbare echte currency-assets.  
**Minnie:** benadruk dat een groot biljet handig kan zijn en dat het gekozen totaal niet boven €24,50 mag uitkomen.  
**Moose:** toon als strategie `Begin bijvoorbeeld met €20. Dan ontbreekt nog €4,50.` zonder verdere oplossing.  
**Uitleg:** toon één geldige route: `€20 + €2 + €2 + €0,50 = €24,50`, met expliciete melding dat andere exacte combinaties ook correct zijn.

### Minnie

Begin met een groot bedrag dat onder **€24,50** blijft. Kijk daarna hoeveel er nog ontbreekt.

### Moose

Je kunt bijvoorbeeld beginnen met **€20**. Dan moet je nog **€4,50** samenstellen.

### Volledige uitleg

Er zijn meerdere goede combinaties mogelijk.

Eén mogelijkheid is:

**€20 + €2 + €2 + €0,50 = €24,50**.

Controle:

**€20 + €2 + €2 = €24**.

**€24 + €0,50 = €24,50**.

Elke andere combinatie die precies **€24,50** vormt, is ook correct.

---

## M6-MO-006 — Wisselgeld met euro's en centen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** money  
**objective:** calculate_change_mixed_euros_cents  
**reportLabel:** Geld · Wisselgeld berekenen  
**answerMode:** structuredMoney  
**visual:** moneyReceipt

### Educational core

**Prijs €12,40; betaald €20,00 → wisselgeld €7,60**

### Approved surfaces

**Surface `purchase`**  
Iets kost **€12,40**. Je betaalt met **€20,00**. Hoeveel geld krijg je terug?

**Surface `entry`**  
Een toegangsbewijs kost **€12,40**. Je betaalt met **€20,00**. Hoeveel wisselgeld krijg je?

**Correct antwoord:** 760 cent = **€7,60**

### Answer contract

Gebruik de bestaande gestructureerde euro/cent-invoer.

Correct:
- euro: `7`
- cent: `60`

Lege of ongeldige invoer telt niet als inhoudelijke fout.

### Visual stages

**Vraag:** moneyReceipt met prijs €12,40, betaald €20,00, wisselgeld `?`.  
**Minnie:** toon het handige tussenpunt €13,00.  
**Moose:** toon `€12,40 → €13,00 = €0,60` en `€13,00 → €20,00 = €7,00`; totaal blijft open.  
**Uitleg:** toon `€0,60 + €7,00 = €7,60`.

### Minnie

Tel vanaf **€12,40** omhoog naar €20,00. Ga eerst naar een heel eurobedrag.

### Moose

Van €12,40 naar €13,00 is **€0,60**.  
Van €13,00 naar €20,00 is **€7,00**.  
Tel die twee bedragen bij elkaar op.

### Volledige uitleg

We tellen vanaf de prijs omhoog naar €20,00.

Van **€12,40 naar €13,00** is **€0,60**.

Van **€13,00 naar €20,00** is **€7,00**.

Samen:

**€0,60 + €7,00 = €7,60**.

Je krijgt dus **€7,60 wisselgeld**.

---

## M6-MO-007 — Twee aankopen en wisselgeld

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** money  
**objective:** add_prices_then_calculate_change  
**reportLabel:** Geld · Meerstaps betalen  
**answerMode:** structuredMoney  
**visual:** moneyReceipt + calculationSteps

### Educational core

**€7,35 + €4,80 = €12,15; betaald €20,00 → wisselgeld €7,85**

### Approved surfaces

**Surface `shop`**  
Je koopt iets van **€7,35** en iets van **€4,80**. Je betaalt met **€20,00**. Hoeveel geld krijg je terug?

**Surface `tickets`**  
Twee kaartjes kosten **€7,35** en **€4,80**. Je betaalt samen met **€20,00**. Hoeveel wisselgeld krijg je?

**Correct antwoord:** 785 cent = **€7,85**

### Answer contract

Gebruik de bestaande gestructureerde euro/cent-invoer.

Correct:
- euro: `7`
- cent: `85`

### Visual stages

**Vraag:** receipt met twee prijzen, betaalbedrag €20,00 en wisselgeld `?`.  
**Minnie:** benadruk eerst de twee prijzen; toon `€7,35 + €4,80 = ?`.  
**Moose:** toon het totaal `€12,15` en daarna `€12,15 → €13,00 = €0,85` en `€13,00 → €20,00 = €7,00`; eindantwoord blijft open.  
**Uitleg:** toon `€0,85 + €7,00 = €7,85`.

### Minnie

Reken eerst uit wat de **twee aankopen samen** kosten. Pas daarna kun je het wisselgeld bepalen.

### Moose

€7,35 + €4,80 = **€12,15**.

Tel nu vanaf €12,15 omhoog naar €20,00. Van €12,15 naar €13,00 is **€0,85**.

### Volledige uitleg

Eerst tellen we de twee prijzen op:

**€7,35 + €4,80 = €12,15**.

Je betaalt €20,00.

Van **€12,15 naar €13,00** is **€0,85**.

Van **€13,00 naar €20,00** is **€7,00**.

Samen:

**€0,85 + €7,00 = €7,85**.

Je krijgt dus **€7,85 wisselgeld**.

---

## M6-MO-008 — Wisselgeld samenstellen

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** money  
**objective:** compose_change_amount  
**reportLabel:** Geld · Wisselgeld samenstellen  
**answerMode:** currencyCompose  
**visual:** currency/change

### Educational core

**Prijs €36,75; betaald €50,00 → wisselgeld €13,25**

### Vraag

Een aankoop kost **€36,75**. Er wordt betaald met **€50,00**.

Stel het juiste **wisselgeld** samen.

### Currency interaction

**priceCents:** 3675  
**paidCents:** 5000  
**targetCents:** 1325

**Beschikbare denominaties:**
- 1000 cent
- 500 cent
- 200 cent
- 100 cent
- 50 cent
- 10 cent
- 5 cent

De leerling mag meerdere exemplaren van een denominatie kiezen.

### Answer contract

Iedere combinatie is correct als:

**Σ denomination × count = 1325 cent**

Voorbeeld van één correcte combinatie:

**€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25**

Dit voorbeeld wordt niet getoond in de vraagfase.

Geen selectie / totaal 0 is invoerfeedback en telt niet als inhoudelijke fout.

### Visual stages

**Vraag:** toon prijs en betaald bedrag plus currency/change-interface, zonder doelbedrag expliciet als antwoord te tonen.  
**Minnie:** laat als tussenstap zien dat je eerst moet bepalen hoeveel geld van €36,75 tot €50,00 ontbreekt; nog geen uitkomst.  
**Moose:** toon `€36,75 → €40,00 = €3,25` en `€40,00 → €50,00 = €10,00`; totaal blijft voor de leerling om samen te stellen.  
**Uitleg:** toon `€3,25 + €10,00 = €13,25` en één geldige samenstelling.

### Minnie

Bepaal eerst **hoeveel wisselgeld** nodig is. Tel vanaf €36,75 omhoog naar €50,00.

### Moose

Van €36,75 naar €40,00 is **€3,25**.  
Van €40,00 naar €50,00 is **€10,00**.  
Gebruik die twee stukken om het totale wisselgeld te bepalen.

### Volledige uitleg

We tellen vanaf €36,75 omhoog naar €50,00.

Van **€36,75 naar €40,00** is **€3,25**.

Van **€40,00 naar €50,00** is **€10,00**.

Samen:

**€3,25 + €10,00 = €13,25**.

Het wisselgeld moet dus precies **€13,25** zijn.

Eén mogelijke samenstelling is:

**€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25**.

Andere combinaties die exact €13,25 vormen zijn ook correct.

---

# Tijd en klok

## M6-TI-001 — Kwart over op een analoge klok

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** analogue_clock_to_spoken_time_quarter_past  
**reportLabel:** Tijd · Analoge klok lezen  
**answerMode:** multipleChoice  
**visual:** analogueClock

### Educational core

**Analoge klok 08:15 → kwart over acht**

### Vraag

Hoe laat is het?

### Clock visual

**hour:** 8  
**minute:** 15

### Antwoordopties

- kwart over acht
- kwart voor acht
- half negen
- vijf over acht

**Correct antwoord:** kwart over acht

### Visual stages

**Vraag:** analoge klok op 08:15.  
**Minnie:** accentueer de minutenwijzer en de `3`-positie, zonder tekstuele tijd te geven.  
**Moose:** toon `15 minuten na 8 uur`; antwoordtekst blijft open.  
**Uitleg:** toon `08:15 = kwart over acht`.

### Minnie

Kijk eerst naar de lange wijzer. Die staat op de **3**. Dat betekent dat er 15 minuten voorbij zijn.

### Moose

Het is **15 minuten na acht uur**. Vijftien minuten noemen we ook een kwartier.

### Volledige uitleg

De lange wijzer staat op de 3.

Dat betekent **15 minuten**.

De korte wijzer staat net voorbij de 8.

Het is dus **15 minuten over acht**.

15 minuten is een kwartier.

Daarom is het **kwart over acht**.

---

## M6-TI-002 — Half op een analoge klok

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** analogue_clock_to_spoken_time_half  
**reportLabel:** Tijd · Analoge klok lezen  
**answerMode:** multipleChoice  
**visual:** analogueClock

### Educational core

**Analoge klok 16:30 → half vijf**

### Vraag

Hoe laat is het?

### Clock visual

**hour:** 16  
**minute:** 30

### Antwoordopties

- half vier
- half vijf
- vier uur
- vijf uur

**Correct antwoord:** half vijf

### Visual stages

**Vraag:** analoge klok op 16:30.  
**Minnie:** accentueer dat de minutenwijzer op de 6 staat.  
**Moose:** laat zien dat de korte wijzer halverwege 4 en 5 staat; nog geen geschreven antwoord.  
**Uitleg:** toon `16:30 = half vijf`.

### Minnie

De lange wijzer staat op de **6**. Dan is er een half uur voorbij.

### Moose

De korte wijzer staat halverwege **4 en 5**. In het Nederlands noemen we een half uur na vier: **half vijf**.

### Volledige uitleg

De lange wijzer op de 6 betekent **30 minuten**.

Het is dus 30 minuten na vier uur.

De korte wijzer staat daarom halverwege de 4 en de 5.

In het Nederlands zeggen we dan **half vijf**.

Dus **16:30 = half vijf**.

---

## M6-TI-003 — Vijf voor half op een analoge klok

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** analogue_clock_to_spoken_time_before_half  
**reportLabel:** Tijd · Analoge klok lezen  
**answerMode:** multipleChoice  
**visual:** analogueClock

### Educational core

**Analoge klok 10:25 → vijf voor half elf**

### Vraag

Hoe laat is het?

### Clock visual

**hour:** 10  
**minute:** 25

### Antwoordopties

- vijf over half elf
- vijf voor half elf
- vijf voor tien
- half elf

**Correct antwoord:** vijf voor half elf

### Visual stages

**Vraag:** analoge klok op 10:25.  
**Minnie:** accentueer de 25 minuten.  
**Moose:** toon een subtiele marker bij 10:30 en `nog 5 minuten tot half elf`; antwoordtekst blijft open.  
**Uitleg:** toon `10:25 = vijf voor half elf`.

### Minnie

De klok staat op **25 minuten over tien**. Kijk hoeveel minuten het nog duurt tot 10:30.

### Moose

Van 10:25 naar 10:30 is nog **5 minuten**. 10:30 noemen we **half elf**.

### Volledige uitleg

De tijd is **10:25**.

Een half uur na tien is **10:30**. Dat noemen we in het Nederlands **half elf**.

Van 10:25 tot 10:30 zijn nog **5 minuten**.

Daarom zeggen we:

**vijf voor half elf**.

---

## M6-TI-004 — Tien over half op een analoge klok

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** time  
**objective:** analogue_clock_to_spoken_time_after_half  
**reportLabel:** Tijd · Analoge klok lezen  
**answerMode:** multipleChoice  
**visual:** analogueClock

### Educational core

**Analoge klok 13:40 → tien over half twee**

### Vraag

Hoe laat is het?

### Clock visual

**hour:** 13  
**minute:** 40

### Antwoordopties

- tien voor half twee
- tien over half twee
- twintig voor één
- tien over één

**Correct antwoord:** tien over half twee

### Visual stages

**Vraag:** analoge klok op 13:40.  
**Minnie:** markeer 13:30 als referentiepunt, zonder naam te geven.  
**Moose:** toon `13:30 → 13:40 = 10 minuten`; antwoordtekst blijft open.  
**Uitleg:** toon `13:30 = half twee` en `13:40 = tien over half twee`.

### Minnie

Gebruik **13:30** als handig herkenningspunt. De klok staat daar 10 minuten voorbij.

### Moose

13:30 noemen we **half twee**. De klok staat op 13:40, dus dat is 10 minuten later.

### Volledige uitleg

13:30 is **half twee**.

De klok staat op 13:40.

Van 13:30 naar 13:40 is **10 minuten**.

Daarom is 13:40:

**tien over half twee**.

---

## M6-TI-005 — Digitale klok: kwart over

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** digital_clock_to_spoken_time_quarter_past  
**reportLabel:** Tijd · Digitale klok lezen  
**answerMode:** multipleChoice  
**visual:** digitalClock

### Educational core

**14:15 → kwart over twee**

### Vraag

Hoe zeg je deze tijd?

### Digital clock

**hour:** 14  
**minute:** 15

### Antwoordopties

- kwart over twee
- kwart voor twee
- half drie
- kwart over drie

**Correct antwoord:** kwart over twee

### Visual stages

**Vraag:** digitalClock toont `14:15`.  
**Minnie:** accentueer alleen `:15`.  
**Moose:** toon `15 minuten na 14:00` en `14:00 = twee uur 's middags`; antwoord blijft open.  
**Uitleg:** toon `14:15 = kwart over twee`.

### Minnie

Kijk eerst naar de minuten. **:15** betekent dat er 15 minuten na het hele uur voorbij zijn.

### Moose

14:00 is twee uur in de middag. 14:15 is **15 minuten later**. Vijftien minuten is een kwartier.

### Volledige uitleg

De digitale klok toont **14:15**.

14:00 is twee uur in de middag.

De `15` betekent dat er 15 minuten voorbij zijn.

15 minuten is een kwartier.

Dus **14:15 = kwart over twee**.

---

## M6-TI-006 — Digitale klok: half

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** digital_clock_to_spoken_time_half  
**reportLabel:** Tijd · Digitale klok lezen  
**answerMode:** multipleChoice  
**visual:** digitalClock

### Educational core

**09:30 → half tien**

### Vraag

Hoe zeg je deze tijd?

### Digital clock

**hour:** 9  
**minute:** 30

### Antwoordopties

- half negen
- half tien
- negen uur
- tien voor half tien

**Correct antwoord:** half tien

### Visual stages

**Vraag:** digitalClock toont `09:30`.  
**Minnie:** accentueer `:30`.  
**Moose:** toon `30 minuten na 9 uur` en een pijl naar het volgende hele uur 10:00; antwoord blijft open.  
**Uitleg:** toon `09:30 = half tien`.

### Minnie

**:30** betekent dat er een half uur voorbij is. Kijk ook naar het volgende hele uur.

### Moose

09:30 is 30 minuten na negen en 30 minuten vóór tien. In het Nederlands noemen we dat **half tien**.

### Volledige uitleg

De digitale klok toont **09:30**.

Dat is een half uur na negen uur.

Het volgende hele uur is tien uur.

In het Nederlands noemen we deze tijd daarom **half tien**.

Dus **09:30 = half tien**.

---

# Batch 06 — Tijd/Klok (12) + Meten/Eenheden (7) + Data/Patronen (6)

**Batch difficulty:** 11 Instap · 10 Normaal · 4 Uitdagend

---

# Tijd en klok — vervolg

## M6-TI-007 — Digitale klok: vijf voor half

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** time  
**objective:** digital_clock_to_spoken_time_before_half  
**reportLabel:** Tijd · Digitale klok lezen  
**answerMode:** multipleChoice  
**visual:** digitalClock

### Educational core

**22:25 → vijf voor half elf**

### Vraag

Hoe zeg je deze tijd?

### Digital clock

**hour:** 22  
**minute:** 25

### Antwoordopties

- vijf over half elf
- vijf voor half elf
- vijf voor tien
- vijf over tien

**Correct antwoord:** vijf voor half elf

### Visual stages

**Vraag:** digitalClock toont `22:25`.  
**Minnie:** accentueer alleen `:25`.  
**Moose:** toon `22:25 → 22:30 = 5 minuten` en `22:30 = half elf`; antwoord blijft open.  
**Uitleg:** toon `22:25 = vijf voor half elf`.

### Minnie

Kijk hoeveel minuten het nog duurt tot **22:30**.

### Moose

Van 22:25 naar 22:30 is **5 minuten**. 22:30 noemen we in het Nederlands **half elf**.

### Volledige uitleg

De klok toont **22:25**.

Een half uur na tien uur 's avonds is **22:30**. In het Nederlands zeggen we dan **half elf**.

Van 22:25 tot 22:30 zijn nog **5 minuten**.

Daarom is **22:25 = vijf voor half elf**.

---

## M6-TI-008 — Digitale klok: tien over half

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** time  
**objective:** digital_clock_to_spoken_time_after_half  
**reportLabel:** Tijd · Digitale klok lezen  
**answerMode:** multipleChoice  
**visual:** digitalClock

### Educational core

**17:40 → tien over half zes**

### Vraag

Hoe zeg je deze tijd?

### Digital clock

**hour:** 17  
**minute:** 40

### Antwoordopties

- tien voor half zes
- tien over half zes
- twintig voor vijf
- tien over vijf

**Correct antwoord:** tien over half zes

### Visual stages

**Vraag:** digitalClock toont `17:40`.  
**Minnie:** markeer 17:30 als herkenningspunt.  
**Moose:** toon `17:30 → 17:40 = 10 minuten` en `17:30 = half zes`.  
**Uitleg:** toon `17:40 = tien over half zes`.

### Minnie

Gebruik **17:30** als herkenningspunt. Hoeveel minuten is 17:40 later?

### Moose

17:30 is **half zes**. Van 17:30 naar 17:40 is **10 minuten**.

### Volledige uitleg

17:30 noemen we **half zes**.

De klok staat op 17:40.

Dat is **10 minuten na half zes**.

Dus **17:40 = tien over half zes**.

---

## M6-TI-009 — Tijdsduur binnen hetzelfde uur

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** elapsed_time_same_hour  
**reportLabel:** Tijd · Tijdsduur  
**answerMode:** openWholeNumber  
**answerUnit:** minuten  
**visual:** timeLine

### Educational core

**10:10 → 10:35 = 25 minuten**

### Approved surfaces

**Surface `activity`**  
Een activiteit begint om **10:10** en eindigt om **10:35**. Hoeveel minuten duurt de activiteit?

**Surface `wait`**  
Je begint om **10:10** te wachten. Om **10:35** kun je verder. Hoeveel minuten heb je gewacht?

**Correct antwoord:** 25

### Visual stages

**Vraag:** timeLine van 10:10 naar 10:35 zonder duur.  
**Minnie:** toon een marker op 10:30.  
**Moose:** toon `10:10 → 10:30 = 20 min` en `10:30 → 10:35 = 5 min`; totaal blijft open.  
**Uitleg:** toon `20 + 5 = 25 minuten`.

### Minnie

Je kunt de tijd in twee makkelijke stukken verdelen. Ga eerst van 10:10 naar **10:30**.

### Moose

Van 10:10 naar 10:30 is **20 minuten**. Van 10:30 naar 10:35 is nog **5 minuten**.

### Volledige uitleg

Van **10:10 naar 10:30** zijn 20 minuten.

Van **10:30 naar 10:35** zijn 5 minuten.

Samen:

**20 + 5 = 25 minuten**.

De tijdsduur is dus **25 minuten**.

---

## M6-TI-010 — Tijdsduur van een half uur

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** elapsed_time_half_hour  
**reportLabel:** Tijd · Tijdsduur  
**answerMode:** openWholeNumber  
**answerUnit:** minuten  
**visual:** timeLine

### Educational core

**09:20 → 09:50 = 30 minuten**

### Vraag

Een activiteit begint om **09:20** en eindigt om **09:50**.

Hoeveel minuten duurt de activiteit?

**Correct antwoord:** 30

### Visual stages

**Vraag:** timeLine van 09:20 naar 09:50.  
**Minnie:** accentueer dat de minuten van 20 naar 50 gaan binnen hetzelfde uur.  
**Moose:** toon `50 − 20 = ?`.  
**Uitleg:** toon `50 − 20 = 30 minuten`.

### Minnie

Beide tijden liggen in hetzelfde uur. Je kunt daarom naar het verschil tussen de minuten kijken.

### Moose

De begintijd heeft **20 minuten** en de eindtijd **50 minuten**. Reken **50 − 20**.

### Volledige uitleg

De activiteit begint om 09:20 en eindigt om 09:50.

Omdat beide tijden in hetzelfde uur liggen, rekenen we:

**50 − 20 = 30**.

De activiteit duurt dus **30 minuten**.

---

## M6-TI-011 — Tijdsduur over een heel uur heen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** time  
**objective:** elapsed_time_cross_hour  
**reportLabel:** Tijd · Tijdsduur over het uur  
**answerMode:** openWholeNumber  
**answerUnit:** minuten  
**visual:** timeLine

### Educational core

**14:31 → 15:20 = 49 minuten**

### Vraag

Een activiteit begint om **14:31** en eindigt om **15:20**.

Hoeveel minuten duurt de activiteit?

**Correct antwoord:** 49

### Visual stages

**Vraag:** timeLine van 14:31 naar 15:20.  
**Minnie:** voeg 15:00 als tussenpunt toe.  
**Moose:** toon `14:31 → 15:00 = 29 min` en `15:00 → 15:20 = 20 min`; totaal blijft open.  
**Uitleg:** toon `29 + 20 = 49 minuten`.

### Minnie

Ga eerst van 14:31 naar het volgende hele uur: **15:00**.

### Moose

Van 14:31 naar 15:00 is **29 minuten**. Daarna is het van 15:00 naar 15:20 nog **20 minuten**.

### Volledige uitleg

We splitsen de tijd in twee stukken.

Van **14:31 naar 15:00**:

**29 minuten**.

Van **15:00 naar 15:20**:

**20 minuten**.

Samen:

**29 + 20 = 49 minuten**.

De activiteit duurt **49 minuten**.

---

## M6-TI-012 — Tijdsduur met twee niet-ronde tijden

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** time  
**objective:** elapsed_time_cross_hour_nonround  
**reportLabel:** Tijd · Tijdsduur over het uur  
**answerMode:** openWholeNumber  
**answerUnit:** minuten  
**visual:** timeLine

### Educational core

**15:42 → 16:39 = 57 minuten**

### Vraag

Een activiteit begint om **15:42** en eindigt om **16:39**.

Hoeveel minuten duurt de activiteit?

**Correct antwoord:** 57

### Visual stages

**Vraag:** timeLine van 15:42 naar 16:39.  
**Minnie:** voeg 16:00 als tussenpunt toe.  
**Moose:** toon `15:42 → 16:00 = 18 min` en `16:00 → 16:39 = 39 min`; totaal blijft open.  
**Uitleg:** toon `18 + 39 = 57 minuten`.

### Minnie

Gebruik **16:00** als tussenpunt. Zo krijg je twee overzichtelijke stukken.

### Moose

Van 15:42 naar 16:00 is **18 minuten**. Van 16:00 naar 16:39 is **39 minuten**.

### Volledige uitleg

Van **15:42 naar 16:00** zijn 18 minuten.

Van **16:00 naar 16:39** zijn 39 minuten.

Samen:

**18 + 39 = 57 minuten**.

De activiteit duurt dus **57 minuten**.

---

## M6-TI-013 — Eindtijd na 30 minuten

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** find_end_time_simple  
**reportLabel:** Tijd · Eindtijd bepalen  
**answerMode:** multipleChoice  
**visual:** timeLine + digitalClock

### Educational core

**Start 13:20 + 30 minuten = 13:50**

### Vraag

Een activiteit begint om **13:20** en duurt **30 minuten**.

Hoe laat is de activiteit afgelopen?

### Antwoordopties

- 13:40
- 13:50
- 14:00
- 14:20

**Correct antwoord:** 13:50

### Visual stages

**Vraag:** digitalClock `13:20` plus `+30 minuten`; lege eindklok.  
**Minnie:** timeLine markeert een sprong van 10 minuten naar 13:30 en nog 20 minuten te verdelen.  
**Moose:** toon `13:20 + 20 min = 13:40`; daarna nog `+10 min = ?`.  
**Uitleg:** toon `13:50`.

### Minnie

Tel de 30 minuten stap voor stap bij 13:20 op.

### Moose

Na 20 minuten is het **13:40**. Er moeten dan nog **10 minuten** bij.

### Volledige uitleg

De activiteit begint om 13:20.

Na 20 minuten is het:

**13:40**.

Er moeten nog 10 minuten bij:

**13:40 + 10 minuten = 13:50**.

De eindtijd is dus **13:50**.

---

## M6-TI-014 — Eindtijd na 1 uur en 25 minuten

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** time  
**objective:** find_end_time_hours_minutes  
**reportLabel:** Tijd · Eindtijd bepalen  
**answerMode:** multipleChoice  
**visual:** timeLine + digitalClock

### Educational core

**Start 13:50 + 1 uur 25 minuten = 15:15**

### Vraag

Een activiteit begint om **13:50** en duurt **1 uur en 25 minuten**.

Hoe laat is de activiteit afgelopen?

### Antwoordopties

- 14:15
- 14:55
- 15:05
- 15:15

**Correct antwoord:** 15:15

### Visual stages

**Vraag:** `13:50 + 1 uur 25 minuten`; eindtijd verborgen.  
**Minnie:** splits de duur visueel in `1 uur` en `25 minuten`.  
**Moose:** toon `13:50 + 1 uur = 14:50`; daarna `+25 min = ?`.  
**Uitleg:** splits de laatste 25 minuten in `+10 → 15:00` en `+15 → 15:15`.

### Minnie

Splits de duur in **1 uur** en **25 minuten**. Tel eerst het hele uur erbij.

### Moose

13:50 + 1 uur = **14:50**. Nu moeten er nog 25 minuten bij.

### Volledige uitleg

Eerst tellen we 1 uur bij 13:50 op:

**13:50 + 1 uur = 14:50**.

Daarna nog 25 minuten.

Van 14:50 naar 15:00 is 10 minuten.

Er blijven nog 15 minuten over:

**15:00 + 15 minuten = 15:15**.

De eindtijd is dus **15:15**.

---

## M6-TI-015 — Begintijd terugrekenen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** time  
**objective:** find_start_time_minutes  
**reportLabel:** Tijd · Begintijd bepalen  
**answerMode:** multipleChoice  
**visual:** timeLine + digitalClock

### Educational core

**Einde 15:10; duur 35 minuten → start 14:35**

### Vraag

Een activiteit eindigt om **15:10** en duurt **35 minuten**.

Hoe laat begon de activiteit?

### Antwoordopties

- 14:25
- 14:35
- 14:45
- 15:35

**Correct antwoord:** 14:35

### Visual stages

**Vraag:** eindklok 15:10, duur 35 minuten, starttijd verborgen.  
**Minnie:** voeg 15:00 als handig terugrekenpunt toe.  
**Moose:** toon `15:10 − 10 min = 15:00`; er moeten nog 25 minuten af.  
**Uitleg:** toon `15:00 − 25 min = 14:35`.

### Minnie

Reken achteruit vanaf 15:10. Ga eerst **10 minuten terug naar 15:00**.

### Moose

Van de 35 minuten heb je dan 10 minuten teruggeteld. Er moeten nog **25 minuten** af van 15:00.

### Volledige uitleg

We rekenen 35 minuten terug vanaf 15:10.

Eerst 10 minuten terug:

**15:10 → 15:00**.

Er blijven nog 25 minuten over.

**15:00 − 25 minuten = 14:35**.

De activiteit begon dus om **14:35**.

---

## M6-TI-016 — Begintijd met uren en minuten

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** time  
**objective:** find_start_time_hours_minutes  
**reportLabel:** Tijd · Begintijd bepalen  
**answerMode:** multipleChoice  
**visual:** timeLine + digitalClock

### Educational core

**Einde 16:20; duur 1 uur 35 minuten → start 14:45**

### Vraag

Een activiteit eindigt om **16:20** en duurt **1 uur en 35 minuten**.

Hoe laat begon de activiteit?

### Antwoordopties

- 14:35
- 14:45
- 15:05
- 15:45

**Correct antwoord:** 14:45

### Visual stages

**Vraag:** eindtijd 16:20 en duur 1u35; start verborgen.  
**Minnie:** splits de duur in `1 uur` en `35 minuten`.  
**Moose:** toon `16:20 − 1 uur = 15:20`; daarna `−35 min = ?`.  
**Uitleg:** splits terugrekenen in `15:20 − 20 = 15:00` en `−15 = 14:45`.

### Minnie

Trek eerst **1 uur** van 16:20 af. Daarna moet je nog 35 minuten terug.

### Moose

16:20 − 1 uur = **15:20**. Trek nu nog 35 minuten af. Je kunt eerst naar 15:00 teruggaan.

### Volledige uitleg

Eerst trekken we 1 uur af:

**16:20 − 1 uur = 15:20**.

Daarna nog 35 minuten.

Van 15:20 naar 15:00 is 20 minuten.

Er moeten dan nog 15 minuten af:

**15:00 − 15 minuten = 14:45**.

De activiteit begon dus om **14:45**.

---

## M6-TI-017 — Wachten tot een begintijd

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** time  
**objective:** time_until_event  
**reportLabel:** Tijd · Wachten tot een tijdstip  
**answerMode:** openWholeNumber  
**answerUnit:** minuten  
**visual:** timeLine

### Educational core

**13:42 → 14:05 = 23 minuten**

### Vraag

Het is **13:42**. Een activiteit begint om **14:05**.

Hoeveel minuten moet je nog wachten?

**Correct antwoord:** 23

### Visual stages

**Vraag:** timeLine van 13:42 naar 14:05.  
**Minnie:** voeg 14:00 als tussenpunt toe.  
**Moose:** toon `13:42 → 14:00 = 18 min` en `14:00 → 14:05 = 5 min`; totaal blijft open.  
**Uitleg:** toon `18 + 5 = 23 minuten`.

### Minnie

Ga eerst van 13:42 naar het hele uur **14:00**.

### Moose

Van 13:42 naar 14:00 is **18 minuten**. Daarna is het nog **5 minuten** tot 14:05.

### Volledige uitleg

Van **13:42 naar 14:00** zijn 18 minuten.

Van **14:00 naar 14:05** zijn 5 minuten.

Samen:

**18 + 5 = 23 minuten**.

Je moet dus **23 minuten** wachten.

---

## M6-TI-018 — Twee activiteiten met een pauze

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** time  
**objective:** multistep_schedule_end_time  
**reportLabel:** Tijd · Meerstaps planning  
**answerMode:** multipleChoice  
**visual:** timeLine

### Educational core

**Start 10:35 + 45 min + 20 min pauze + 55 min = 12:35**

### Vraag

De eerste activiteit begint om **10:35** en duurt **45 minuten**.

Daarna is er **20 minuten pauze**.

De tweede activiteit duurt **55 minuten**.

Hoe laat is alles afgelopen?

### Antwoordopties

- 12:15
- 12:25
- 12:35
- 12:45

**Correct antwoord:** 12:35

### Visual stages

**Vraag:** timeLine met drie nog niet ingevulde segmenten: 45 min, 20 min pauze, 55 min.  
**Minnie:** vul alleen het einde van de eerste activiteit in: `10:35 + 45 min = 11:20`.  
**Moose:** voeg einde pauze toe: `11:20 + 20 min = 11:40`; tweede activiteit blijft open.  
**Uitleg:** toon `11:40 + 55 min = 12:35` en complete tijdlijn.

### Minnie

Reken de onderdelen één voor één. Begin met de eerste activiteit van **45 minuten**.

### Moose

10:35 + 45 minuten = **11:20**.

Na 20 minuten pauze is het **11:40**.

Nu hoef je alleen de tweede activiteit van 55 minuten nog toe te voegen.

### Volledige uitleg

De eerste activiteit:

**10:35 + 45 minuten = 11:20**.

Daarna 20 minuten pauze:

**11:20 + 20 minuten = 11:40**.

De tweede activiteit duurt 55 minuten.

Van 11:40 naar 12:00 is 20 minuten.

Er blijven 35 minuten over:

**12:00 + 35 minuten = 12:35**.

Alles is dus afgelopen om **12:35**.

---

# Meten en eenheden

## M6-ME-001 — Centimeter naar meter

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** measurementGeometry  
**objective:** convert_cm_to_m_exact  
**reportLabel:** Meten · Centimeter naar meter  
**answerMode:** openWholeNumber  
**answerUnit:** m  
**visual:** measurement

### Educational core

**300 cm = 3 m**

### Vraag

Hoeveel meter is **300 centimeter**?

**Correct antwoord:** 3

### Visual stages

**Vraag:** measurement toont `300 cm → ? m`.  
**Minnie:** toon `100 cm = 1 m` als authored hulpregel.  
**Moose:** splits 300 cm visueel in drie stukken van 100 cm.  
**Uitleg:** toon `300 : 100 = 3 m`.

### Minnie

Eén meter is **100 centimeter**. Kijk hoeveel groepjes van 100 er in 300 zitten.

### Moose

300 centimeter kun je verdelen in:

**100 + 100 + 100 centimeter**.

Hoeveel meters zijn dat?

### Volledige uitleg

**100 centimeter = 1 meter**.

300 centimeter bestaat uit 3 groepjes van 100 centimeter:

**300 : 100 = 3**.

Dus **300 cm = 3 m**.

---

## M6-ME-002 — Meter naar decimeter

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** measurementGeometry  
**objective:** convert_m_to_dm  
**reportLabel:** Meten · Meter naar decimeter  
**answerMode:** openWholeNumber  
**answerUnit:** dm  
**visual:** measurement

### Educational core

**18 m = 180 dm**

### Vraag

Hoeveel decimeter is **18 meter**?

**Correct antwoord:** 180

### Visual stages

**Vraag:** `18 m → ? dm`.  
**Minnie:** toon `1 m = 10 dm`.  
**Moose:** toon `18 × 10 = ?`.  
**Uitleg:** toon `18 × 10 = 180 dm`.

### Minnie

Eén meter bestaat uit **10 decimeter**.

### Moose

Je hebt 18 meter en iedere meter is 10 decimeter. Reken daarom **18 × 10**.

### Volledige uitleg

**1 meter = 10 decimeter**.

Voor 18 meter rekenen we:

**18 × 10 = 180**.

Dus **18 m = 180 dm**.

---

## M6-ME-003 — Meter naar millimeter

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** measurementGeometry  
**objective:** convert_m_to_mm_unit_fact  
**reportLabel:** Meten · Meter naar millimeter  
**answerMode:** multipleChoice  
**visual:** measurement

### Educational core

**1 m = 1.000 mm**

### Vraag

Hoeveel millimeter is **1 meter**?

### Antwoordopties

- 10 mm
- 100 mm
- 1.000 mm
- 10.000 mm

**Correct antwoord:** 1.000 mm

### Visual stages

**Vraag:** measurement toont `1 m → ? mm`.  
**Minnie:** toon de keten `1 m = 100 cm` maar nog niet cm→mm.  
**Moose:** voeg `1 cm = 10 mm` toe en toon `100 × 10 = ?`.  
**Uitleg:** toon `1 m = 100 cm = 1.000 mm`.

### Minnie

Eén meter is **100 centimeter**. Nu moet je nog bedenken hoeveel millimeter er in één centimeter zitten.

### Moose

**1 cm = 10 mm**. Een meter heeft 100 centimeter, dus reken **100 × 10**.

### Volledige uitleg

**1 meter = 100 centimeter**.

**1 centimeter = 10 millimeter**.

Daarom:

**100 × 10 = 1.000 millimeter**.

Dus **1 m = 1.000 mm**.

---

## M6-ME-004 — Twee halve kilo's

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** measurementGeometry  
**objective:** combine_grams_to_kilogram  
**reportLabel:** Meten · Gram en kilogram  
**answerMode:** openWholeNumber  
**answerUnit:** kg  
**visual:** measurement

### Educational core

**500 g + 500 g = 1 kg**

### Approved surfaces

**Surface `packages`**  
Twee pakketten wegen elk **500 gram**. Hoeveel kilogram wegen ze samen?

**Surface `bags`**  
Twee zakken wegen elk **500 gram**. Hoeveel kilogram wegen ze samen?

**Correct antwoord:** 1

### Visual stages

**Vraag:** twee blokken van 500 g met `samen = ? kg`.  
**Minnie:** toon `500 g + 500 g = ? g`.  
**Moose:** toon `500 + 500 = 1.000 g` en `1.000 g = ? kg`.  
**Uitleg:** toon `1.000 g = 1 kg`.

### Minnie

Tel eerst de twee gewichten in **grammen** bij elkaar op.

### Moose

500 g + 500 g = **1.000 g**. Hoeveel kilogram is 1.000 gram?

### Volledige uitleg

De twee pakketten wegen samen:

**500 g + 500 g = 1.000 g**.

**1.000 gram = 1 kilogram**.

Samen wegen ze dus **1 kg**.

---

## M6-ME-005 — Meter en centimeter naar centimeter

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** measurementGeometry  
**objective:** convert_mixed_length_to_cm  
**reportLabel:** Meten · Meter en centimeter combineren  
**answerMode:** openWholeNumber  
**answerUnit:** cm  
**visual:** measurement + calculationSteps

### Educational core

**2 m 35 cm = 235 cm**

### Vraag

Hoeveel centimeter is **2 meter en 35 centimeter**?

**Correct antwoord:** 235

### Visual stages

**Vraag:** toon `2 m 35 cm → ? cm`.  
**Minnie:** toon `2 m = 200 cm`.  
**Moose:** toon `200 cm + 35 cm = ?`.  
**Uitleg:** toon `235 cm`.

### Minnie

Zet eerst de **2 meter** om naar centimeters.

### Moose

2 meter is **200 centimeter**. Tel daar de extra 35 centimeter bij op.

### Volledige uitleg

**1 meter = 100 centimeter**.

Dus:

**2 meter = 200 centimeter**.

Daar komt nog 35 centimeter bij:

**200 + 35 = 235**.

Dus **2 m 35 cm = 235 cm**.

---

## M6-ME-006 — Meerdere gewichten samen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** measurementGeometry  
**objective:** multiply_equal_weights  
**reportLabel:** Meten · Gewichten samenrekenen  
**answerMode:** openWholeNumber  
**answerUnit:** g  
**visual:** measurement + calculationSteps

### Educational core

**6 × 250 g = 1.500 g**

### Approved surfaces

**Surface `packages`**  
Er zijn **6 pakketten** van elk **250 gram**. Hoeveel gram wegen ze samen?

**Surface `containers`**  
Er zijn **6 bakjes** van elk **250 gram**. Hoeveel gram wegen ze samen?

**Correct antwoord:** 1.500  
**Toegestane invoer:** `1500`, `1.500`, `1 500`

### Visual stages

**Vraag:** zes gelijke `250 g`-eenheden of compacte aanduiding `6 × 250 g`.  
**Minnie:** splits 250 in `200 + 50`.  
**Moose:** toon `6 × 200 = 1.200` en `6 × 50 = 300`; totaal blijft open.  
**Uitleg:** toon `1.200 + 300 = 1.500 g`.

### Minnie

Je kunt 250 splitsen in **200 en 50**.

### Moose

6 × 200 = **1.200**.

6 × 50 = **300**.

Tel die twee gewichten bij elkaar op.

### Volledige uitleg

We splitsen 250 gram in 200 gram en 50 gram.

**6 × 200 = 1.200**.

**6 × 50 = 300**.

Samen:

**1.200 + 300 = 1.500 gram**.

De zes pakketten wegen dus **1.500 g**.

---

## M6-ME-007 — Twee lengtes met verschillende eenheden

**learningLevel:** M6  
**difficulty:** 3 — Uitdagend  
**domain:** measurementGeometry  
**objective:** add_mixed_lengths_convert_to_cm  
**reportLabel:** Meten · Meerstaps lengte  
**answerMode:** openWholeNumber  
**answerUnit:** cm  
**visual:** measurement + calculationSteps

### Educational core

**2 m 35 cm + 1 m 80 cm = 415 cm**

### Approved surfaces

**Surface `cables`**  
Een kabel is **2 meter 35 centimeter** lang. Een tweede kabel is **1 meter 80 centimeter** lang. Hoeveel centimeter zijn de kabels samen?

**Surface `routes`**  
Een eerste stuk route is **2 meter 35 centimeter**. Een tweede stuk is **1 meter 80 centimeter**. Hoeveel centimeter zijn beide stukken samen?

**Correct antwoord:** 415

### Visual stages

**Vraag:** toon beide gemengde lengtes en target `? cm`.  
**Minnie:** zet alleen `2 m 35 cm` om naar `235 cm`.  
**Moose:** toon ook `1 m 80 cm = 180 cm` en daarna `235 + 180 = ?`.  
**Uitleg:** toon `235 + 180 = 415 cm`.

### Minnie

Zet beide lengtes eerst helemaal om naar **centimeters**.

### Moose

2 m 35 cm = **235 cm**.

1 m 80 cm = **180 cm**.

Tel nu 235 en 180 op.

### Volledige uitleg

Eerst zetten we beide lengtes om.

**2 m 35 cm = 235 cm**.

**1 m 80 cm = 180 cm**.

Daarna tellen we ze op:

**235 + 180 = 415**.

Samen zijn de twee lengtes **415 cm**.

---

# Data, tabellen en patronen

## M6-DP-001 — Reeks met sprongen van tien

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** dataPatterns  
**objective:** sequence_plus_ten  
**reportLabel:** Patronen · Reeks met vaste stap  
**answerMode:** openWholeNumber  
**visual:** numberLine

### Educational core

**2.360, 2.370, 2.380, ?, 2.400 → 2.390**

### Vraag

Welk getal ontbreekt?

**2.360 → 2.370 → 2.380 → ? → 2.400**

**Correct antwoord:** 2.390  
**Toegestane invoer:** `2390`, `2.390`, `2 390`

### Visual stages

**Vraag:** reeks met één lege positie.  
**Minnie:** markeer de stap van 2.360 naar 2.370.  
**Moose:** toon `+10` boven de eerste drie sprongen; lege waarde blijft open.  
**Uitleg:** vul 2.390 in en toon alle +10-stappen.

### Minnie

Kijk hoeveel er steeds bij komt van het ene getal naar het volgende.

### Moose

Van 2.360 naar 2.370 komt er **10** bij. Dezelfde stap wordt steeds herhaald.

### Volledige uitleg

De reeks gaat steeds met **10 omhoog**:

2.360 → 2.370 → 2.380 → **2.390** → 2.400.

Het ontbrekende getal is **2.390**.

---

## M6-DP-002 — Reeks met sprongen van vijfentwintig

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** dataPatterns  
**objective:** sequence_plus_twenty_five  
**reportLabel:** Patronen · Reeks met grotere stap  
**answerMode:** openWholeNumber  
**visual:** numberLine

### Educational core

**1.125, 1.150, 1.175, ?, 1.225 → 1.200**

### Vraag

Welk getal ontbreekt?

**1.125 → 1.150 → 1.175 → ? → 1.225**

**Correct antwoord:** 1.200

### Visual stages

**Vraag:** reeks met lege vierde positie.  
**Minnie:** markeer `1.125 → 1.150`.  
**Moose:** toon `+25` boven twee bekende sprongen.  
**Uitleg:** vul 1.200 in en toon alle sprongen.

### Minnie

Bereken eerst het verschil tussen **1.125 en 1.150**.

### Moose

Het verschil is **25**. Controleer: 1.150 + 25 = 1.175. Doe daarna dezelfde stap nog een keer.

### Volledige uitleg

De stap is steeds **+25**.

1.125 + 25 = 1.150.

1.150 + 25 = 1.175.

1.175 + 25 = **1.200**.

Daarna:

1.200 + 25 = 1.225.

Het ontbrekende getal is **1.200**.

---

## M6-DP-003 — Een waarde uit een tabel aflezen

**learningLevel:** M6  
**difficulty:** 1 — Instap  
**domain:** dataPatterns  
**objective:** read_single_table_value  
**reportLabel:** Data · Tabel aflezen  
**answerMode:** openWholeNumber  
**visual:** compactDataTable

### Educational core

Authored table:
- Maandag: 18
- Dinsdag: 24
- Woensdag: 21
- Donderdag: 27

Vraag naar woensdag → 21.

### Vraag

Bekijk de tabel.

| Dag | Aantal |
|---|---:|
| Maandag | 18 |
| Dinsdag | 24 |
| Woensdag | 21 |
| Donderdag | 27 |

Hoeveel staat er bij **woensdag**?

**Correct antwoord:** 21

### Visual stages

**Vraag:** compacte authored tabel met vier rijen.  
**Minnie:** accentueer alleen de rij `Woensdag`.  
**Moose:** accentueer in die rij de kolom `Aantal`; getal blijft uiteraard zichtbaar zoals in de oorspronkelijke tabel, maar er wordt geen extra antwoordtekst toegevoegd.  
**Uitleg:** toon `Woensdag → 21`.

### Minnie

Zoek eerst de rij met **woensdag**.

### Moose

Kijk in de rij woensdag naar de kolom **Aantal**.

### Volledige uitleg

In de tabel zoeken we de rij **Woensdag**.

In die rij staat bij `Aantal` het getal **21**.

Het antwoord is dus **21**.

---

## M6-DP-004 — Verschil tussen twee tabelwaarden

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** dataPatterns  
**objective:** compare_table_values_difference  
**reportLabel:** Data · Waarden vergelijken  
**answerMode:** openWholeNumber  
**visual:** compactDataTable + calculationSteps

### Educational core

Authored table:
- Route A: 138
- Route B: 156
- Route C: 149
- Route D: 132

Verschil B en D: **156 − 132 = 24**

### Vraag

Bekijk de tabel.

| Route | Afstand |
|---|---:|
| A | 138 |
| B | 156 |
| C | 149 |
| D | 132 |

Hoeveel groter is de waarde van **route B** dan die van **route D**?

**Correct antwoord:** 24

### Visual stages

**Vraag:** tabel.  
**Minnie:** accentueer rijen B en D.  
**Moose:** toon `156 − 132 = ?`.  
**Uitleg:** toon `156 − 132 = 24`.

### Minnie

Je hebt alleen de waarden van **B en D** nodig. Zoek die eerst op.

### Moose

Route B heeft 156 en route D 132. Het verschil vind je met **156 − 132**.

### Volledige uitleg

Route B heeft de waarde **156**.

Route D heeft de waarde **132**.

Het verschil is:

**156 − 132 = 24**.

Route B is dus **24** groter.

---

## M6-DP-005 — Een patroon in een verhoudingstabel

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** dataPatterns  
**objective:** extend_ratio_table  
**reportLabel:** Data · Verhoudingstabel  
**answerMode:** openWholeNumber  
**visual:** compactDataTable + calculationSteps

### Educational core

Authored ratio table:
- 1 doos → 6 items
- 2 dozen → 12
- 3 dozen → 18
- 5 dozen → ?

**5 × 6 = 30**

### Vraag

Bekijk de tabel.

| Dozen | Onderdelen |
|---:|---:|
| 1 | 6 |
| 2 | 12 |
| 3 | 18 |
| 5 | ? |

In elke doos zitten evenveel onderdelen.

Hoeveel onderdelen horen bij **5 dozen**?

**Correct antwoord:** 30

### Visual stages

**Vraag:** verhoudingstabel.  
**Minnie:** accentueer de eerste rij `1 → 6`.  
**Moose:** toon `5 × 6 = ?`.  
**Uitleg:** vul 30 in de tabel.

### Minnie

De eerste rij vertelt hoeveel onderdelen er in **één doos** zitten.

### Moose

Eén doos bevat 6 onderdelen. Voor 5 dozen heb je dus **5 × 6** onderdelen.

### Volledige uitleg

Uit de eerste rij zien we:

**1 doos = 6 onderdelen**.

Voor 5 dozen rekenen we:

**5 × 6 = 30**.

Bij 5 dozen horen dus **30 onderdelen**.

---

## M6-DP-006 — Patroon met steeds grotere sprongen

**learningLevel:** M6  
**difficulty:** 2 — Normaal  
**domain:** dataPatterns  
**objective:** sequence_increasing_step  
**reportLabel:** Patronen · Veranderende stap  
**answerMode:** multipleChoice  
**visual:** calculationSteps

### Educational core

**20 → 25 (+5) → 35 (+10) → 50 (+15) → ? (+20) = 70**

### Vraag

Welk getal komt daarna?

**20 → 25 → 35 → 50 → ?**

### Antwoordopties

- 60
- 65
- 70
- 75

**Correct antwoord:** 70

### Visual stages

**Vraag:** alleen de reeks.  
**Minnie:** toon onder de eerste twee sprongen `+5` en `+10`.  
**Moose:** voeg bij de derde sprong `+15` toe en toon `volgende sprong = +20`.  
**Uitleg:** toon `50 + 20 = 70`.

### Minnie

Kijk niet alleen naar de getallen, maar naar **hoe groot elke sprong** is.

### Moose

De sprongen zijn:

**+5, +10, +15**.

Elke sprong wordt 5 groter. De volgende sprong is dus **+20**.

### Volledige uitleg

We bekijken de verschillen:

20 → 25 is **+5**.

25 → 35 is **+10**.

35 → 50 is **+15**.

De sprong wordt iedere keer 5 groter.

De volgende sprong is daarom:

**+20**.

Dus:

**50 + 20 = 70**.

Het volgende getal is **70**.

---

# Editorial completion summary — first 75-question expansion

The first planned central M6 expansion is now fully authored.

## New questions by domain

| Domain | New questions |
|---|---:|
| Getalbegrip / afronden / reeksen | 8 |
| Optellen / aftrekken | 8 |
| Vermenigvuldigen / delen / rest | 10 |
| Breuken / verhoudingen | 10 |
| Geld | 8 |
| Tijd / klok | 18 |
| Meten / eenheden | 7 |
| Data / tabellen / patronen | 6 |
| **Total** | **75** |

## Difficulty distribution

| Difficulty | Count |
|---|---:|
| 1 — Instap | 38 |
| 2 — Normaal | 26 |
| 3 — Uitdagend | 11 |
| **Total** | **75** |

This is approximately:

- **50.7% Instap**
- **34.7% Normaal**
- **14.7% Uitdagend**

which matches the intended 50 / 35 / 15 M6 difficulty policy as closely as possible with 75 whole questions.

## Production import rule

These 75 questions are authored production content.

Codex may:
- map this content to the existing central M6 schema;
- implement a missing generic presentation primitive if required by an approved question;
- validate arithmetic, IDs, assets, answer contracts, layout and stage progression;
- import the approved narrative surfaces.

Codex must not:
- change the educational core;
- change numbers or correct answers;
- rewrite Minnie, Moose or explanation text;
- create additional production questions;
- procedurally generate variants;
- silently replace an unsupported visual with a different pedagogical presentation.

If a required presentation primitive is not yet implemented, report it explicitly and implement the smallest generic reusable capability needed rather than changing the question.

