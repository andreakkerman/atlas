# Runenpoort M6 Pilot — Importcontract

**Status:** approved pilot contract  
**Scope:** LVL-0001 De Runenpoort, LVL-0002 De Tempelzaal, LVL-0003 De Vikinghaven  
**Content:** 24 fixed M6 questions authored and approved in ChatGPT  
**Principle:** Codex integrates; Codex does not author educational content.

## 1. Source of truth

The four approved content packages appended to this document are the only source of truth for the 24 M6 pilot questions.

The older status text inside those source packages ("concept", "ter beoordeling") reflects the moment each file was created. For this combined bundle, all 24 questions are approved for the Runenpoort pilot.

Do not rewrite, paraphrase, shorten, "improve", regenerate, template, or replace:
- question text;
- answer options;
- Minnie text;
- Moose text;
- full explanations;
- learning objective;
- reporting label;
- answer contract;
- visual-stage instructions.

If a technical conflict is found, preserve the content and report the conflict. Do not solve technical problems by changing pedagogy or wording.

## 2. Existing learning-level framework

Use the learning-level framework already present in the local Atlas working tree. Preserve its existing E5/M6 slider and fallback model.

M6 questions explicitly use `learningLevel: "M6"`. Existing production questions without a learningLevel remain E5 according to the current framework.

The slider controls only the E5/M6 curriculum mix. Difficulty is a separate dimension.

Default product setting remains:
- 90% E5
- 10% M6

Do not modify existing E5 question content, E5 answer grading, the existing E5 hint resolver, progression, rewards, routes, or world content unless a minimal shared-infrastructure change is required for the M6 pilot.

## 3. Difficulty contract

Every M6 pilot question has:
- `difficulty: 1` = Instap
- `difficulty: 2` = Normaal
- `difficulty: 3` = Uitdagend

For the pilot, use one centrally configurable M6 difficulty policy:
- 50% Instap
- 35% Normaal
- 15% Uitdagend

This is a selection policy, not a content-generation rule.

Requirements:
- do not expose a second difficulty slider;
- the existing E5/M6 slider remains the only parent-facing level control;
- show the M6 difficulty policy as explanatory information near the level setting;
- do not claim E5 difficulty percentages because the existing E5 bank has not been classified;
- keep the policy easy to change later without editing question content.

When an M6 question is requested:
1. choose the target M6 difficulty using the configured policy;
2. choose an available M6 variant for that question position;
3. avoid immediate repetition where practical;
4. if the requested difficulty is unavailable but another M6 difficulty exists at that position, deliver the nearest available M6 difficulty and record requested vs delivered difficulty;
5. in an equal-distance tie, prefer the easier available difficulty;
6. if no M6 variant exists at that position, use the existing learning-level fallback to E5 and record requested M6 vs delivered E5;
7. do not create catch-up/debt requests after fallback.

The percentages describe the target policy over repeated M6 selections, not a promise that every short session exactly contains those percentages. Progress reporting must show the actual delivered questions.

## 4. M6 educational-support contract

M6 support is authored content, not generated resolver copy.

For these 24 questions:
- Minnie uses the exact approved Minnie text;
- Moose uses the exact approved Moose text;
- the full explanation uses the exact approved explanation steps;
- visual states reveal only the information specified for that support stage.

The existing reusable E5 hint resolver remains intact. Prefer an authored-support path for questions that contain explicit M6 support; fall back to the existing resolver only for content that does not provide authored support.

### Help flow

Keep the existing automatic learning flow:
- first wrong answer -> Minnie;
- second wrong answer -> Moose;
- third wrong answer -> full explanation/assistance.

Also make the full explanation reachable directly through a clear but secondary **Leg uit** action. Sven must not be forced to answer incorrectly three times to learn a new concept.

Reporting rules:
- opening full explanation is recorded immediately;
- a later correct answer after full explanation is never counted as independent/direct;
- `explanationShown` is not the same as "understood";
- if explanation is shown and the question is later completed correctly, classify it as completed after full explanation;
- if explanation is shown but the question is left unfinished, retain that fact without inventing a success result.

## 5. Generic challenge visuals

Build four reusable, content-driven challenge visual components. Do not make Runenpoort-specific one-off components.

### `fractionStrip`
For the six fraction questions.
- equal segments;
- selected/remaining segments;
- optional item symbols where the content specification requires them;
- labels and values by help stage;
- no answer leakage before the relevant stage.

### `calculationSteps`
For the six addition questions and where other content explicitly uses step cards.
- clear grouping of the authored decomposition;
- arrows show sequence, not physical scale;
- support vertical layout;
- no horizontal scrolling required on iPad;
- only reveal authored intermediate results for the current help stage.

### `moneyReceipt`
For money/change.
- compact item/price/payment display;
- optional receipt-like presentation;
- do not calculate a two-item total at question stage;
- show the exact authored top-up/calculation stages;
- distinguish purchase total from requested change.

### `timeLine`
For duration/start/end-time questions.
- start/end/unknown time;
- authored intermediate whole-hour markers;
- forward and backward steps;
- duration labels;
- support question, Minnie, Moose and explanation states without changing strategy.

The visuals are instructional UI inside the existing challenge presentation, not separate minigames. They must work with normal challenge and NPC presentation paths and remain legible on iPad.

All information required to solve the question must be inside the challenge UI. Never rely on counting objects in the painted level background.

## 6. Answer grading

Implement only the answer behavior explicitly required by the content bundle.

### Whole-number answers
Use the per-question allowed forms from the source package.
For the specified four-digit whole-number answers, allow the documented Dutch thousands formatting and space grouping only for those whole-number answer types.

Do not globally strip punctuation or weaken spelling grading.

### Euro answers
Use a dedicated euro answer mode.
- fixed € prefix in the UI;
- visible label: `Bedrag in euro’s`;
- canonical technical representation in cents;
- comma is the normal decimal separator;
- dot may be accepted as the explicitly documented keyboard alternative;
- `50` means €50, not €0.50;
- do not guess cents from the expected answer;
- retain raw input and interpreted amount for reporting where practical;
- invalid/unparseable input receives input feedback rather than being counted as a mathematical wrong answer.

Do not change existing E5 money grading.

### Time
The first four time questions use integer minute answers.
The final two use the exact authored multiple-choice options.
Do not build a free-form clock parser for this pilot.

## 7. Mapping into Runenpoort

The source packages contain proposed level/object placements. Inspect the current local LVL-0001, LVL-0002 and LVL-0003 definitions and map the questions to the intended compatible challenge objects/slots.

Rules:
- preserve all 24 question IDs;
- preserve the semantic context of each question;
- do not rewrite a question to fit a different object;
- do not add new world objects merely to host a question;
- do not change paths, progression or challenge counts unless the existing data model requires a minimal non-player-visible content-slot extension;
- M6 is an alternative question layer, not 24 additional mandatory challenges.

If an exact suggested slot cannot technically host its question, use another existing slot only when the question context still fits exactly. Otherwise report the mapping conflict rather than inventing replacement content.

## 8. Settings UI

Keep the single level slider.

The settings UI must make the meaning understandable to a parent:
- endpoint labels: E5 / Eind groep 5 and M6 / Midden groep 6;
- current mix, e.g. `90% E5 · 10% M6`;
- plain-language sentence describing approximately how many questions come from each level;
- when M6 > 0, show its difficulty policy:
  `50% instap · 35% normaal · 15% uitdagend`;
- explain in short copy that difficulty is within M6, so moving the E5/M6 slider does not simply make every individual question "harder";
- do not imply that the configured mix equals the delivered mix when fallback occurs.

Use the existing visual language of Atlas. Do not build a separate parent dashboard.

## 9. Progress reporting

Extend the existing **Voortgang** session reports rather than creating a separate reporting product.

### Per session: summary
Show:
- adventure/date/active time as today;
- configured E5/M6 setting for that session;
- requested vs actually delivered E5/M6 counts;
- actual M6 difficulty counts: Instap / Normaal / Uitdagend;
- result counts:
  - Direct goed
  - Goed na Minnie
  - Goed na Moose
  - Met volledige uitleg afgerond
  - Niet afgerond

Use counts as primary information, especially for small samples. Percentages may be secondary but never imply formal mastery.

### Per learning objective
Group delivered questions using the exact authored `reportLabel`, e.g.:
- Breuken · Eén gelijk deel berekenen
- Geld · Twee aankopen en wisselgeld
- Tijd · Tijdsduur over het hele uur

Show level, difficulty and outcome in understandable Dutch.

### Expandable question detail
For each played question preserve/display, where available:
- question ID and content version;
- exact prompt snapshot;
- learning objective/report label;
- requested and delivered learning level;
- requested and delivered difficulty;
- raw answer history;
- interpreted answer where answer parsing is relevant;
- whether/when Minnie was shown;
- whether/when Moose was shown;
- whether full explanation was shown;
- final outcome;
- response timing already collected by the existing report;
- correct-answer display value;
- snapshots of support text actually shown, or enough versioned information to reproduce it exactly.

Do not diagnose why Sven made an error. Report observable behavior only.

### Outcome semantics
Preserve old reports and make new semantics explicit:
- `direct`: first valid mathematical attempt correct, no prior hint/explanation;
- `afterMinnie`: correct after Minnie, before Moose/explanation;
- `afterMoose`: correct after Moose, before full explanation;
- `afterExplanation`: full explanation was shown before correct completion;
- `incomplete`: no completed correct result before the session ends.

If legacy `assisted` data exists, keep it readable as legacy assisted/full-help behavior rather than rewriting history.

An invalid input format is not a mathematical attempt.

### Historical compatibility
Existing stored session reports must remain readable.
Do not fabricate learning level, difficulty or answer history for older data that did not record it. Display an honest `niet geregistreerd`/equivalent state.

Keep the current local-only/no-backend behavior and existing retention policy unless migration requires a compatible schema bump.

## 10. Content schema / validation

Fit this into Atlas's existing question schema instead of creating a parallel engine. Add the minimum declarative metadata necessary, conceptually including:

- stable question id;
- content version;
- learningLevel;
- difficulty;
- learningObjective;
- reportLabel;
- answer specification;
- authored Minnie support;
- authored Moose support;
- authored full explanation;
- visual type and per-stage visual data.

Names may follow existing Atlas conventions after inspection.

Validator requirements:
- learningLevel is valid;
- difficulty is 1, 2 or 3 for these M6 questions;
- question IDs are unique;
- required authored support exists for all 24;
- answer contract is complete;
- report label exists;
- visual config is valid for questions that use it;
- no stage reveals content marked for a later stage;
- exact 24 approved IDs are present after import.

## 11. Testing expectations

Add/extend automated tests around the behavior, not just snapshots.

Cover at minimum:
- all 24 content IDs load and validate;
- their fixed correct answers are correct;
- M6 exact support text is used instead of the E5 resolver;
- E5 resolver behavior is unchanged;
- difficulty target selection and fallback;
- requested vs delivered level/difficulty;
- no fallback debt;
- fraction visual stages;
- calculation-step visual stages;
- money receipt does not reveal totals early;
- euro parsing, including `50` != `0,50`;
- time-line forward/backward stages;
- final two time MC questions;
- direct `Leg uit`;
- outcome classification after Minnie/Moose/explanation;
- raw answer history;
- invalid input not counted as a mathematical error;
- old progress sessions remain readable;
- new progress summary and drilldown;
- iPad/touch layout and no horizontal overflow in long explanation states;
- production E5 questions, progression and challenge flow remain unchanged.

Run the relevant existing regression suite as well.

## 12. Definition of done

The pilot is done when:
1. all 24 approved questions are selectable in Runenpoort as M6 alternatives;
2. exact authored Minnie/Moose/explanation content appears at the correct help stage;
3. the four generic visual components render the authored stages correctly;
4. answer grading follows the per-question contracts;
5. the slider explains learning level and M6 difficulty clearly;
6. the actual delivered level/difficulty is logged;
7. Voortgang reports what Sven actually attempted and how much help was used;
8. old E5 behavior still works;
9. no educational content was generated or rewritten by Codex;
10. tests pass and Codex reports any remaining coverage/fallback limitations honestly.

## 13. Final implementation report from Codex

At completion, report:
- architecture used;
- files changed;
- mapping of the 24 question IDs to actual Runenpoort slots;
- any requested-vs-delivered fallback still possible and why;
- new/changed validation rules;
- new UI components;
- session-report schema changes/migration behavior;
- tests run and results;
- any educational-content conflict that was left unchanged rather than improvised.

Do not include speculative future features in the implementation.


---

# APPROVED SOURCE PACKAGE — Runenpoort-M6-proefpakket-01-breuken.md

# Runenpoort — M6-proefpakket 01: breuken

**Status:** redactioneel concept, versie 0.1. Nog niet goedgekeurd voor productie of geïmporteerd.

## Pilot

Runenpoort vervangt ARC als pilotwereld. Het beoogde proefpakket omvat 24 hier geschreven vragen: zes breukenvragen, zes optelvragen met grotere getallen, zes geld-/wisselgeldvragen en zes tijdsduurvragen. Dit document bevat alleen de eerste zes breukenvragen.

De drie locaties zijn LVL-0001 (De Runenpoort), LVL-0002 (De Tempelzaal) en LVL-0003 (De Vikinghaven). Objectkoppelingen hieronder zijn voorgestelde contentkoppelingen op basis van GitHub master, geen wijzigingen aan de levelbestanden. Codex controleert vóór import de actuele lokale bron en de vraagposities. De verhaalsituaties zijn nieuwe opgaven, geen claims over objecten die al in de achtergrond zichtbaar zijn.

## Afbakening en moeilijkheid

Alle zes vragen krijgen learningLevel M6 als Atlas-oefenlaag. De instapvragen oefenen noodzakelijke basisbegrippen en kunnen overlappen met de E5-leerstof; dit is geen Cito-gekalibreerde classificatie.

- **1 — Instap:** één deel van een hoeveelheid bepalen, met een eenvoudige breuk en een visueel model.
- **2 — Normaal:** meerdere gelijke delen nemen; eerst één deel berekenen, daarna vermenigvuldigen.
- **3 — Uitdagend:** het gebruikte/verplaatste deel berekenen en daarna de resterende hoeveelheid bepalen.

Moeilijkheid neemt hier toe door de gevraagde denkstappen, niet alleen door grotere getallen. De vragen zijn zelfstandig bruikbaar; willekeurige selectie mag niet veronderstellen dat een eerdere vraag al is gespeeld. De drie moeilijkheden zijn geen vaste verdeling over de drie levels.

## Antwoord en uitleg

Alle zes gebruiken een open getalantwoord. Toon de eenheid zichtbaar naast het invoerveld; Sven hoeft het woord niet te typen. Het juiste getal is hieronder exact vastgelegd. Eventuele invoertolerantie wordt expliciet in het importcontract bepaald; niet stilzwijgend door de importeur.

De vraag, Minnie-hint, Moose-hint en uitleg zijn vaste redactionele teksten. Codex mag ze niet herformuleren of vervangen door generieke resolvertekst. Programmacode mag antwoorden, metadata en weergave controleren; geen nieuwe inhoud genereren.

De volledige uitleg bestaat uit afzonderlijke leesbare stappen. Gebruik hetzelfde visuele model tijdens de vraag, hints en uitleg. Laat geen antwoordlabels vóór de bedoelde hulpstap zien. Afbeeldingen zijn instructie, geen aftelanimatie of extra minigame; alle benodigde gegevens staan in het vraagvenster.

Voor dit prototype is een breukenstrook de enige nieuwe visuele basis. Er is geen noodzaak om de levelachtergronden of sprites te veranderen. Symbolen per voorwerp zijn optioneel behalve waar de hulptekst expliciet de verdeling voordoet.

## Rapportagecontract

Bewaar per gespeelde vraag de vraag-ID, contentversie, het werkelijk aangeboden niveau, difficulty, leerdoel/rapportagelabel, ingevoerde antwoorden en getoonde hulp. Registreer de sliderinstelling en gevraagd/geleverd niveau afzonderlijk. Uitleg getoond is niet hetzelfde als begrepen; een antwoord na volledige uitleg is geen zelfstandig resultaat. Geen heropening gebruiken om eerdere fouten of hulp uit te wissen. Geen cijfers of beheersingsclaims afleiden uit deze zes conceptvragen.

De zes vragen vullen nog niet alle Runenpoort-vraagposities. Zolang M6-dekking onvolledig is, moet de bestaande fallback eerlijk worden gerapporteerd. De 90/10-productdefault blijft ongewijzigd; in een gerichte test kan beschikbare M6-content expliciet gekozen worden.

## Overzicht

| ID | Voorgestelde plek | Moeilijkheid | Vraagkern | Antwoord |
|---|---|---|---|---|
| RP-M6-BR-001 | LVL-0002 — De Tempelzaal / shieldWall — Schildenmuur | 1 — Instap | ½ van 12 | 6 schilden |
| RP-M6-BR-002 | LVL-0001 — De Runenpoort / steen — Steenrune | 1 — Instap | ¼ van 20 | 5 stenen |
| RP-M6-BR-003 | LVL-0002 — De Tempelzaal / shieldWall — Schildenmuur | 2 — Normaal | ¾ van 20 | 15 schilden |
| RP-M6-BR-004 | LVL-0003 — De Vikinghaven / mooringRope — Touwrol | 2 — Normaal | ⅔ van 18 meter | 12 meter |
| RP-M6-BR-005 | LVL-0003 — De Vikinghaven / harborMap — Havenkaart | 3 — Uitdagend | ⅖ van 35 ingeladen: hoeveel over? | 21 kratten |
| RP-M6-BR-006 | LVL-0002 — De Tempelzaal / fireBowl — Vuurschaal | 3 — Uitdagend | ⅜ van 40 gebruikt: hoeveel over? | 25 houtblokken |

## RP-M6-BR-001 — 1 — Instap

**Niveau:** M6  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / `shieldWall — Schildenmuur`  
**Leerdoel:** De helft van een hoeveelheid bepalen.  
**Rapportagelabel:** Breuken · Eén gelijk deel berekenen  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 6 schilden

### Vraag — exacte tekst

Er liggen 12 schilden klaar. De helft krijgt een rode rand. Hoeveel schilden krijgen een rode rand?

### Minnie — exacte tekst

De helft betekent één van twee gelijke delen. Verdeel de 12 schilden eerlijk over twee groepjes.

### Moose — exacte tekst

Verdeel eerst 10 schilden: 5 in elk groepje. Verdeel daarna de laatste 2 schilden ook eerlijk. Hoeveel schilden zitten er dan in elk groepje?

### Volledige uitleg — exacte tekst, per stap

We zoeken de helft van 12. Daarom maken we twee even grote groepjes.

Van de eerste 10 schilden krijgt elk groepje er 5: 10 : 2 = 5.

Van de laatste 2 schilden krijgt elk groepje er nog 1: 2 : 2 = 1.

Elk groepje heeft dus 5 + 1 = 6 schilden. Dat is één helft van de 12.

6 schilden krijgen een rode rand.

### Visuele specificatie

**Bij de vraag:** Een breukenstrook met twee even grote vakken; één vak gemarkeerd als "rode rand". Onder de volledige strook staat "12 schilden samen". Geen aantal per vak.

**Bij Minnie:** Behoud dezelfde strook. Label de vakken als twee gelijke delen; benadruk dat één deel wordt gezocht.

**Bij Moose:** Toon in beide vakken 5 schildsymbolen als verdeling van de eerste 10. Toon de laatste 2 symbolen nog buiten de vakken. Geen eindtotaal per vak.

**Bij de volledige uitleg:** Plaats de laatste twee symbolen, één in elk vak. Beide vakken bevatten 6 schilden. Markeer één vak als het gezochte deel.


## RP-M6-BR-002 — 1 — Instap

**Niveau:** M6  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0001 — De Runenpoort / `steen — Steenrune`  
**Leerdoel:** Een kwart van een hoeveelheid bepalen.  
**Rapportagelabel:** Breuken · Eén gelijk deel berekenen  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 5 stenen

### Vraag — exacte tekst

Een bouwer heeft 20 stenen. Hij gebruikt een kwart van de stenen voor een muurtje. Hoeveel stenen gebruikt hij?

### Minnie — exacte tekst

Een kwart betekent één van vier gelijke delen. Verdeel de 20 stenen in vier even grote groepjes.

### Moose — exacte tekst

Je zoekt hoeveel stenen in één groepje komen. Reken 20 : 4. Welke keersom met 4 komt uit op 20?

### Volledige uitleg — exacte tekst, per stap

Een kwart schrijven we als ¼. De 4 vertelt dat we vier gelijke delen maken. De 1 vertelt dat we één deel nemen.

We verdelen de 20 stenen over vier gelijke groepjes: 20 : 4 = 5.

Dat klopt, want vier groepjes van 5 zijn samen 20: 4 × 5 = 20.

De bouwer gebruikt één groepje. Hij gebruikt dus 5 stenen.

### Visuele specificatie

**Bij de vraag:** Een breukenstrook met vier even grote vakken; één vak gemarkeerd als "voor het muurtje". Onder de volledige strook staat "20 stenen samen". Geen aantal per vak.

**Bij Minnie:** Behoud dezelfde strook en benadruk de vier gelijke delen en het ene gekozen deel.

**Bij Moose:** Toon onder de strook "20 : 4 = ?". De vier vakken blijven even groot; geen aantallen per vak.

**Bij de volledige uitleg:** Toon in elk vak 5 steensymbolen. Markeer één vak als "5 stenen voor het muurtje"; alle vier samen blijven zichtbaar.


## RP-M6-BR-003 — 2 — Normaal

**Niveau:** M6  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / `shieldWall — Schildenmuur`  
**Leerdoel:** Driekwart van een hoeveelheid bepalen via één kwart.  
**Rapportagelabel:** Breuken · Meerdere gelijke delen berekenen  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 15 schilden

### Vraag — exacte tekst

Voor de schildenmuur zijn 20 schilden gemaakt. Driekwart krijgt een blauwe rand. Hoeveel schilden krijgen een blauwe rand?

### Minnie — exacte tekst

Driekwart betekent drie van vier gelijke delen. Reken eerst uit hoeveel schilden in één van die vier delen zitten.

### Moose — exacte tekst

20 : 4 = 5, dus één kwart is 5 schilden. Je hebt drie van die delen nodig. Reken nu 3 × 5.

### Volledige uitleg — exacte tekst, per stap

We zoeken ¾ van 20 schilden. De 4 vertelt dat we vier gelijke delen maken; de 3 vertelt dat we drie delen nemen.

Eerst één deel: 20 : 4 = 5 schilden.

Daarna drie delen: 3 × 5 = 15 schilden.

15 schilden krijgen een blauwe rand.

### Visuele specificatie

**Bij de vraag:** Een breukenstrook met vier gelijke vakken. Drie vakken zijn gemarkeerd als "blauwe rand". Onder de hele strook staat "20 schilden samen". Geen aantallen per vak.

**Bij Minnie:** Licht één van de vier delen uit als eerste rekenstap; de oorspronkelijke drie gekozen delen blijven herkenbaar.

**Bij Moose:** Label één deel met "5 schilden". Markeer de drie gevraagde delen samen; toon nog geen eindtotaal.

**Bij de volledige uitleg:** Label alle delen met 5 en zet bij de drie gekozen delen samen "15 schilden".


## RP-M6-BR-004 — 2 — Normaal

**Niveau:** M6  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / `mooringRope — Touwrol`  
**Leerdoel:** Twee derde van een lengte bepalen via één derde.  
**Rapportagelabel:** Breuken · Meerdere gelijke delen berekenen  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 12 meter

### Vraag — exacte tekst

Een touw is 18 meter lang. Eivar gebruikt twee derde van het touw om het schip vast te maken. Hoeveel meter touw gebruikt hij?

### Minnie — exacte tekst

Twee derde betekent twee van drie gelijke delen. Verdeel de 18 meter eerst in drie stukken die even lang zijn.

### Moose — exacte tekst

18 : 3 = 6, dus elk stuk is 6 meter. Eivar gebruikt twee van die stukken. Reken nu 2 × 6.

### Volledige uitleg — exacte tekst, per stap

We zoeken ⅔ van 18 meter. De 3 vertelt dat we drie gelijke delen maken. De 2 vertelt dat we twee delen nemen.

Eerst de lengte van één deel: 18 : 3 = 6 meter.

Daarna de lengte van twee delen: 2 × 6 = 12 meter.

Eivar gebruikt 12 meter touw.

### Visuele specificatie

**Bij de vraag:** Een rechte touwstrook verdeeld in drie gelijke segmenten. Twee segmenten zijn gemarkeerd als "gebruikt". Een haak onder de hele strook geeft "18 meter" aan. Geen lengtes per deel.

**Bij Minnie:** Behoud dezelfde segmenten en benadruk dat alle drie even lang zijn.

**Bij Moose:** Label één segment met "6 meter" en markeer de twee gebruikte segmenten samen. Geen totale gebruikte lengte tonen.

**Bij de volledige uitleg:** Label ieder segment met "6 meter" en de twee gebruikte segmenten samen met "12 meter".


## RP-M6-BR-005 — 3 — Uitdagend

**Niveau:** M6  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / `harborMap — Havenkaart`  
**Leerdoel:** Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft.  
**Rapportagelabel:** Breuken · Resterende hoeveelheid berekenen  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 21 kratten

### Vraag — exacte tekst

Er moeten 35 kratten aan boord. Twee vijfde van de kratten is al ingeladen. Hoeveel kratten staan nog op de kade?

### Minnie — exacte tekst

Je zoekt de kratten die nog op de kade staan. Reken eerst uit hoeveel er al aan boord zijn: twee van vijf gelijke delen van 35.

### Moose — exacte tekst

35 : 5 = 7 kratten per deel. Twee delen zijn 2 × 7 = 14 kratten aan boord. Trek die 14 af van de 35 kratten.

### Volledige uitleg — exacte tekst, per stap

Van de 35 kratten is ⅖ al aan boord. We zoeken de kratten die nog niet zijn ingeladen.

Eerst één vijfde: 35 : 5 = 7 kratten.

Twee vijfde is 2 × 7 = 14 kratten. Die zijn al aan boord.

Trek de ingeladen kratten van het totaal af: 35 − 14 = 21.

Er staan nog 21 kratten op de kade.

### Visuele specificatie

**Bij de vraag:** Een breukenstrook met vijf gelijke vakken en "35 kratten samen" onder de hele strook. Twee vakken dragen het label "aan boord"; drie vakken samen het label "nog op de kade". Geen aantallen per vak.

**Bij Minnie:** Benadruk eerst de twee delen "aan boord" en behoud het onderscheid met de gevraagde resterende delen.

**Bij Moose:** Label elk deel met 7 en de twee ingeladen delen samen met 14. Geen totaal voor de kade tonen.

**Bij de volledige uitleg:** Behoud de ingeladen 14 en label de resterende drie delen samen met "21 kratten op de kade".


## RP-M6-BR-006 — 3 — Uitdagend

**Niveau:** M6  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / `fireBowl — Vuurschaal`  
**Leerdoel:** Een breuk van een hoeveelheid berekenen en bepalen hoeveel overblijft.  
**Rapportagelabel:** Breuken · Resterende hoeveelheid berekenen  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 25 houtblokken

### Vraag — exacte tekst

Voor de vuurschaal liggen 40 houtblokken klaar. De tempelwachter gebruikt drie achtste van de houtblokken. Hoeveel houtblokken blijven over?

### Minnie — exacte tekst

Drie achtste betekent drie van acht gelijke delen. Zoek eerst hoeveel houtblokken worden gebruikt. Daarna kun je bepalen hoeveel er overblijven.

### Moose — exacte tekst

40 : 8 = 5 houtblokken per deel. Er worden 3 × 5 = 15 houtblokken gebruikt. Trek die 15 af van de 40 houtblokken.

### Volledige uitleg — exacte tekst, per stap

De tempelwachter gebruikt ⅜ van de 40 houtblokken. We zoeken hoeveel houtblokken daarna overblijven.

Eerst één achtste: 40 : 8 = 5 houtblokken.

Drie achtste is 3 × 5 = 15 houtblokken. Die worden gebruikt.

Trek het gebruikte aantal van het totaal af: 40 − 15 = 25.

Er blijven 25 houtblokken over.

### Visuele specificatie

**Bij de vraag:** Een breukenstrook met acht gelijke vakken en "40 houtblokken samen" onder de hele strook. Drie vakken gemarkeerd als "gebruikt"; de andere vijf als "over". Geen aantallen per vak.

**Bij Minnie:** Benadruk het onderscheid tussen de drie gebruikte delen en de gevraagde resterende delen.

**Bij Moose:** Label één deel met 5 en de drie gebruikte delen samen met 15. Geen totaal voor de resterende delen tonen.

**Bij de volledige uitleg:** Label alle delen met 5 en de vijf resterende delen samen met "25 houtblokken over".

## Redactionele review vóór import

Controleer de gekozen moeilijkheid, natuurlijke formuleringen, bruikbare tussenstappen en het visuele geheel. De twee opgaven per moeilijkheid zijn bedoeld als oefenvariatie, niet als garantie op leerwinst of een formele toets. Na goedkeuring wordt dit in één importpakket samengebracht met de overige 18 proefvragen en het technische contract voor weergave, selectie en Voortgang.


---

# APPROVED SOURCE PACKAGE — Runenpoort-M6-proefpakket-02-optellen.md

# Runenpoort — M6-proefpakket 02: optellen

**Status:** redactioneel concept, versie 0.1. Ter beoordeling; nog niet goedgekeurd voor productie of geïmporteerd.

## Plaats in de pilot

Het proefpakket voor De Runenpoort omvat 24 hier geschreven vragen: zes over breuken, zes over optellen, zes over geld/wisselgeld en zes over tijdsduur. De breukenreeks is door André in de chat inhoudelijk goedgekeurd. Dit bestand bevat de volgende zes, nieuw geschreven optelvragen. De breukenvragen zijn niet gewijzigd.

De wereld omvat LVL-0001 (De Runenpoort), LVL-0002 (De Tempelzaal) en LVL-0003 (De Vikinghaven). Objectkoppelingen hieronder zijn voorstellen op basis van eerder in de chat gelezen levelgegevens, geen huidige broncodecontrole of import. Codex controleert de actuele lokale bron en geschikte vraagposities vóór integratie. Verhaalsituaties zijn nieuwe opgaven; ze doen geen uitspraak over aantallen die in de levelachtergrond zichtbaar zouden moeten zijn.

## Niveau, moeilijkheid en inhoud

Alle zes krijgen learningLevel M6 als afgesproken Atlas-oefenlaag. Dit is een redactionele moeilijkheidsindeling, geen Cito-gekalibreerde classificatie. Instapvragen mogen noodzakelijke voorkennis herhalen en overlappen met E5.

- **1 — Instap:** ronde tientallen en honderdtallen optellen, zonder overschrijding binnen de gekozen stappen.
- **2 — Normaal:** driecijferige getallen optellen; de stappen kunnen over een tiental of honderdtal gaan.
- **3 — Uitdagend:** een driecijferig getal bij een viercijferig getal optellen, met stappen over duizendtallen en andere getalgrenzen.

Er zijn drie kale sommen en drie korte verhaalsommen. De moeilijkheid komt uit de benodigde rekenstappen, niet uit lange of dubbelzinnige taal. Elke vraag is zelfstandig bruikbaar; geen hint mag aannemen dat Sven een voorgaande vraag heeft gezien.

De gezamenlijke aanpak is: begin met het eerste getal en tel de stukken van het tweede getal één voor één erbij. Waar een grens lastig is, wordt dezelfde stap verder opgesplitst. Dat is geen wisseling naar cijferend optellen of een andere truc. De gegeven aanpak is een hulpmiddel, niet de enige correcte manier om het antwoord te vinden.

## Exacte content en presentatie

Vraagtekst, Minnie, Moose en uitleg hieronder zijn vaste, hier geschreven content. Codex mag alleen importeren, technisch weergeven en valideren; niet herformuleren of door generieke hints vervangen. Code mag de vastgelegde antwoorden en sommen controleren, maar geen nieuwe opgaven bedenken.

Voor deze reeks is geen extra interactieve afbeelding nodig. Een eenvoudige verticale rekenstappenkaart met de exact beschreven getallen en pijlen volstaat. Pijlen tonen de volgorde van rekenstappen; ze zijn geen getallenlijn op schaal. Op de kale vraagweergave worden nog geen oplossingsstappen gegeven. Bij hints en uitleg verschijnen alleen de informatie en tussenantwoorden die voor die hulpstap zijn vastgelegd.

Toon de volledige uitleg in korte opeenvolgende stappen binnen de bestaande challengepresentatie, ook bij NPC-vragen. Een volgende uitlegstap of ‘Leg uit’-functie mag nooit door het verslag als zelfstandig rekenen worden geïnterpreteerd. Er worden in dit document geen nieuwe beloningen, hintschema's, selectiepercentages of levelroutes vastgesteld.

## Antwoordcontract

Alle zes gebruiken een open getalantwoord. Bij een verhaalsom staat de eenheid zichtbaar naast het invoerveld; Sven hoeft die niet te typen. Het canonieke antwoord is telkens een geheel getal.

De expliciet toegestane invoervormen staan per vraag vermeld. Bij de twee viercijferige antwoorden worden ook de hieronder genoemde Nederlandse duizendtalscheiding en groepering met een spatie geaccepteerd. Een punt betekent in deze specifieke, als geheel getal gedefinieerde antwoorden dus niet een decimaalteken. Dit geeft geen toestemming om globaal punten, komma's of accenten te verwijderen uit andere antwoordtypen. Spelling- en geldbeoordeling blijven ongewijzigd. Gebruikelijke witruimte vóór/na de invoer mag worden genegeerd.

## Rapportagecontract

Registreer de exacte vraag-ID en versie, werkelijk aangeboden learningLevel, difficulty, leerdoel en rapportagelabel. Bewaar pogingen en daadwerkelijk getoonde hulp; heropenen mag die voorgeschiedenis niet uitwissen. Volledige uitleg getoond is niet hetzelfde als begrepen of afgerond. Een daarna goed ingevoerd antwoord is geen zelfstandig resultaat. Rapporteer de ingestelde niveauverhouding los van gevraagd/geleverd niveau en eventuele fallback.

Moeilijkheidspercentages voor selectie zijn nog niet vastgesteld. De zes vragen bevatten twee voorbeelden per moeilijkheid om de content te beoordelen, niet om een 33/33/33-speelmix voor te schrijven. Ze vullen ook niet alle Runenpoort-vraagposities; geen volledige M6-dekking claimen.

## Overzicht

| ID | Vorm | Moeilijkheid | Vraagkern | Antwoord |
|---|---|---|---|---|
| RP-M6-OP-001 | kale som | 1 — Instap | 240 + 130 | 370 |
| RP-M6-OP-002 | verhaalsom | 1 — Instap | 320 + 250 | 570 planken |
| RP-M6-OP-003 | kale som | 2 — Normaal | 368 + 247 | 615 |
| RP-M6-OP-004 | verhaalsom | 2 — Normaal | 475 + 168 | 643 spijkers |
| RP-M6-OP-005 | kale som | 3 — Uitdagend | 1.475 + 638 | 2.113 |
| RP-M6-OP-006 | verhaalsom | 3 — Uitdagend | 2.687 + 756 | 3.443 stenen |

## RP-M6-OP-001 — Honderd en dertig erbij

**Niveau:** M6  
**Moeilijkheid:** 1 — Instap  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0001 — De Runenpoort / zon — Zonrune  
**Leerdoel:** Honderdtallen en tientallen optellen zonder een tiental of honderdtal te overschrijden.  
**Rapportagelabel:** Optellen · Honderdtallen en tientallen  
**Vorm:** kale som  
**Antwoordmodus:** open getalantwoord  
**Canoniek antwoord:** 370  
**Antwoord voor weergave:** 370  
**Eenheid naast het invoerveld:** geen  
**Toegestane invoervormen:** `370`

### Vraag — exacte tekst

240 + 130 = ?

### Minnie — exacte tekst

Je hoeft 130 niet in één keer erbij te tellen. Splits 130 in 100 en 30. Begin met de 100.

### Moose — exacte tekst

240 + 100 = 340. Er moeten nog 30 bij. Dat zijn drie tientallen. Tel vanaf 340 drie keer 10 verder.

### Volledige uitleg — exacte tekst, per stap

130 bestaat uit 100 en 30. We tellen die twee stukken na elkaar bij 240 op.

Eerst 100 erbij: 240 + 100 = 340.

Dan 30 erbij, in drie sprongen van 10: 340 → 350 → 360 → 370.

We hebben precies 130 toegevoegd: eerst 100 en daarna 30. Dus 240 + 130 = 370.

### Weergavespecificatie

**Bij de vraag:** Toon alleen de som en het lege getalveld. Geen tussenstappen of antwoordlabels.

**Bij Minnie:** Toon op een rekenstappenkaart: ‘130 = 100 + 30’. Maak met de volgorde duidelijk dat eerst +100 en daarna +30 volgt.

**Bij Moose:** Behoud de splitsing. Toon ‘240 + 100 = 340’ en daaronder ‘340 → ? → ? → ?’, met +10 bij elk van de drie pijlen. Toon nog niet 350, 360 of 370.

**Bij de volledige uitleg:** Vul dezelfde drie pijlen in met 350, 360 en 370. Toon onderaan ‘240 + 130 = 370’.


## RP-M6-OP-002 — Planken op de kade

**Niveau:** M6  
**Moeilijkheid:** 1 — Instap  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / harborMap — Havenkaart  
**Leerdoel:** Een eenvoudige toevoegingssituatie vertalen naar optellen en het tweede getal opdelen in honderdtallen en tientallen.  
**Rapportagelabel:** Optellen · Honderdtallen en tientallen  
**Vorm:** verhaalsom  
**Antwoordmodus:** open getalantwoord  
**Canoniek antwoord:** 570  
**Antwoord voor weergave:** 570 planken  
**Eenheid naast het invoerveld:** planken  
**Toegestane invoervormen:** `570`

### Vraag — exacte tekst

Op de kade liggen 320 planken. Een schip brengt nog 250 planken. Hoeveel planken liggen er nu op de kade?

### Minnie — exacte tekst

Er komen planken bij, dus je telt op. Je hoeft 250 niet in één keer erbij te doen: splits het in 200 en 50.

### Moose — exacte tekst

320 + 200 = 520. Van de 250 nieuwe planken zijn er nu 200 meegeteld. Tel de laatste 50 erbij.

### Volledige uitleg — exacte tekst, per stap

We zoeken hoeveel planken er samen liggen. Daarom rekenen we 320 + 250.

Verdeel de 250 nieuwe planken in 200 en 50.

Tel eerst 200 erbij: 320 + 200 = 520.

Tel daarna de laatste 50 erbij: 520 + 50 = 570.

Er liggen nu 570 planken op de kade.

### Weergavespecificatie

**Bij de vraag:** Toon alleen de volledige vraag en het lege getalveld met de eenheid ‘planken’ ernaast. De levelachtergrond is geen telplaat.

**Bij Minnie:** Toon ‘250 = 200 + 50’ op de rekenstappenkaart. Benoem de splitsing als ‘nieuwe planken’.

**Bij Moose:** Toon ‘320 + 200 = 520’. De volgende regel is ‘520 + 50 = ?’. Het eindtotaal blijft verborgen.

**Bij de volledige uitleg:** Vul de laatste regel in als ‘520 + 50 = 570’ en toon ‘570 planken samen’.


## RP-M6-OP-003 — Voorbij het volgende honderdtal

**Niveau:** M6  
**Moeilijkheid:** 2 — Normaal  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / shieldWall — Schildenmuur  
**Leerdoel:** Een driecijferig getal optellen door het tweede getal te splitsen en bij een deelsprong het volgende honderdtal te passeren.  
**Rapportagelabel:** Optellen · Over een tiental of honderdtal  
**Vorm:** kale som  
**Antwoordmodus:** open getalantwoord  
**Canoniek antwoord:** 615  
**Antwoord voor weergave:** 615  
**Eenheid naast het invoerveld:** geen  
**Toegestane invoervormen:** `615`

### Vraag — exacte tekst

368 + 247 = ?

### Minnie — exacte tekst

Je kunt 247 opdelen in 200, 40 en 7. Tel die stukken één voor één bij 368 op.

### Moose — exacte tekst

368 + 200 = 568. Tel 40 erbij in vier sprongen van 10: 578, 588, 598, 608. Tel nu nog de laatste 7 erbij.

### Volledige uitleg — exacte tekst, per stap

We splitsen 247 in 200, 40 en 7. Zo tellen we steeds één stuk erbij.

Eerst 200 erbij: 368 + 200 = 568.

Dan 40 erbij. Dat zijn vier tientallen: 568 → 578 → 588 → 598 → 608.

Nu nog 7. Van 608 naar 610 is 2. Van de 7 blijven dan nog 5 over: 610 + 5 = 615.

We hebben alle stukken van 247 toegevoegd. Dus 368 + 247 = 615.

### Weergavespecificatie

**Bij de vraag:** Toon alleen de som en het lege getalveld.

**Bij Minnie:** Toon ‘247 = 200 + 40 + 7’. Houd deze drie hoofddelen gedurende alle hulpstappen zichtbaar.

**Bij Moose:** Toon ‘368 + 200 = 568’. Werk +40 uit als vier opeenvolgende sprongen van +10: 568 → 578 → 588 → 598 → 608. Zet daarna apart ‘608 + 7 = ?’. Groepeer de vier sprongen onder +40; geen eindantwoord tonen.

**Bij de volledige uitleg:** Behoud de +200- en +40-stappen. Toon bij de laatste +7 eerst ‘608 + 2 = 610’ en daarna ‘610 + 5 = 615’. Groepeer die twee sprongen onder +7. Toon de volledige som met antwoord.


## RP-M6-OP-004 — Spijkers voor het schip

**Niveau:** M6  
**Moeilijkheid:** 2 — Normaal  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / shipModel — Scheepsmodel  
**Leerdoel:** Een driecijferige optelsom oplossen met afzonderlijke stappen over een honderdtal en een tiental.  
**Rapportagelabel:** Optellen · Over een tiental of honderdtal  
**Vorm:** verhaalsom  
**Antwoordmodus:** open getalantwoord  
**Canoniek antwoord:** 643  
**Antwoord voor weergave:** 643 spijkers  
**Eenheid naast het invoerveld:** spijkers  
**Toegestane invoervormen:** `643`

### Vraag — exacte tekst

De scheepsbouwer heeft 475 spijkers. Hij krijgt er nog 168 bij. Hoeveel spijkers heeft hij nu?

### Minnie — exacte tekst

Je telt de spijkers bij elkaar op. Splits de 168 nieuwe spijkers in 100, 60 en 8.

### Moose — exacte tekst

475 + 100 = 575. Met 60 erbij kom je op 635. Nu nog 8: tel eerst 5 tot 640 en daarna de overige 3.

### Volledige uitleg — exacte tekst, per stap

Er komen 168 spijkers bij. We delen 168 op in 100, 60 en 8.

Tel eerst 100 erbij: 475 + 100 = 575.

Tel dan 60 erbij. Dat zijn zes tientallen: 575 → 585 → 595 → 605 → 615 → 625 → 635.

Nu de laatste 8. Tel eerst 5 tot 640 en daarna nog 3: 635 + 5 = 640 en 640 + 3 = 643.

De scheepsbouwer heeft nu 643 spijkers.

### Weergavespecificatie

**Bij de vraag:** Toon alleen de volledige vraag en het lege getalveld met ‘spijkers’ ernaast.

**Bij Minnie:** Toon de splitsing ‘168 = 100 + 60 + 8’.

**Bij Moose:** Toon ‘475 + 100 = 575’ en ‘575 + 60 = 635’. Splits de laatste +8 zichtbaar in +5 en +3. Toon ‘635 + 5 = 640’ en ‘640 + 3 = ?’. Geen eindtotaal.

**Bij de volledige uitleg:** Behoud alle hoofdstappen. Toon bij +60 de zes sprongen van +10: 575 → 585 → 595 → 605 → 615 → 625 → 635. Vul bij de laatste +8 de uitkomst 643 in. De kaart moet duidelijk maken welke kleine stappen bij +60 en welke bij +8 horen. Lange stappenreeksen mogen verticaal worden weergegeven zonder een horizontaal scrollvlak.


## RP-M6-OP-005 — Optellen voorbij tweeduizend

**Niveau:** M6  
**Moeilijkheid:** 3 — Uitdagend  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / mapTable — Kaarttafel  
**Leerdoel:** Een viercijferig en driecijferig getal optellen, met stappen voorbij een duizendtal en een honderdtal.  
**Rapportagelabel:** Optellen · Duizendtallen en overschrijdingen  
**Vorm:** kale som  
**Antwoordmodus:** open getalantwoord  
**Canoniek antwoord:** 2113  
**Antwoord voor weergave:** 2.113  
**Eenheid naast het invoerveld:** geen  
**Toegestane invoervormen:** `2113`, `2.113`, `2 113`

### Vraag — exacte tekst

1.475 + 638 = ?

### Minnie — exacte tekst

Je hoeft 638 niet in één keer toe te voegen. Splits 638 in 600, 30 en 8 en begin met de 600.

### Moose — exacte tekst

Reken eerst 1.475 + 500 = 1.975 en tel nog 100 erbij: 2.075. Daarmee heb je 600 toegevoegd. Tel nu nog 30 en 8 erbij.

### Volledige uitleg — exacte tekst, per stap

We splitsen 638 in 600, 30 en 8.

Voeg 600 toe in twee sprongen: 1.475 + 500 = 1.975 en 1.975 + 100 = 2.075. Die 500 en 100 zijn samen 600.

Dan 30 erbij: 2.075 + 30 = 2.105. Je telt daarbij verder voorbij 2.100.

Ten slotte 8 erbij: 2.105 + 8 = 2.113.

We hebben alle 638 toegevoegd. Dus 1.475 + 638 = 2.113.

### Weergavespecificatie

**Bij de vraag:** Toon alleen ‘1.475 + 638 = ?’ en het lege getalveld. De punt in 1.475 is Nederlandse duizendtalscheiding.

**Bij Minnie:** Toon ‘638 = 600 + 30 + 8’ en benadruk eerst het deel 600.

**Bij Moose:** Toon binnen de +600-stap ‘600 = 500 + 100’, ‘1.475 + 500 = 1.975’ en ‘1.975 + 100 = 2.075’. Toon vervolgens twee onuitgerekende vervolgstappen: ‘2.075 + 30 = ?’ en ‘Daarna nog +8’.

**Bij de volledige uitleg:** Vul de vervolgstappen in met 2.105 en 2.113. Behoud de groepering van 500 en 100 onder de ene stap +600. Toon de volledige som met antwoord.


## RP-M6-OP-006 — Stenen voor de tempel

**Niveau:** M6  
**Moeilijkheid:** 3 — Uitdagend  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0001 — De Runenpoort / steen — Steenrune  
**Leerdoel:** Een toevoegingssituatie met duizendtallen oplossen door het tweede getal te splitsen en het totaal over getalgrenzen heen bij te houden.  
**Rapportagelabel:** Optellen · Duizendtallen en overschrijdingen  
**Vorm:** verhaalsom  
**Antwoordmodus:** open getalantwoord  
**Canoniek antwoord:** 3443  
**Antwoord voor weergave:** 3.443 stenen  
**Eenheid naast het invoerveld:** stenen  
**Toegestane invoervormen:** `3443`, `3.443`, `3 443`

### Vraag — exacte tekst

Voor de tempel zijn al 2.687 stenen geleverd. Er komen nog 756 stenen bij. Hoeveel stenen zijn er dan in totaal geleverd?

### Minnie — exacte tekst

Je telt de nieuwe stenen bij de al geleverde stenen op. Verdeel 756 in 700, 50 en 6.

### Moose — exacte tekst

2.687 + 700 = 3.387. Met 50 erbij kom je op 3.437. Je moet nog 6 erbij tellen. Ga eerst 3 verder tot 3.440 en tel daarna de laatste 3 erbij.

### Volledige uitleg — exacte tekst, per stap

We tellen de 756 nieuwe stenen bij 2.687 op. Splits 756 in 700, 50 en 6.

Eerst 700 erbij: 2.687 + 700 = 3.387. Zevenhonderd erbij brengt je dus voorbij 3.000.

Daarna 50 erbij: 3.387 + 50 = 3.437.

Nu nog 6. Van 3.437 naar 3.440 is 3. Tel daarna de laatste 3 erbij: 3.440 + 3 = 3.443.

Er zijn in totaal 3.443 stenen geleverd.

### Weergavespecificatie

**Bij de vraag:** Toon alleen de volledige vraag en het lege getalveld met ‘stenen’ ernaast. De punt in 2.687 is Nederlandse duizendtalscheiding.

**Bij Minnie:** Toon ‘756 = 700 + 50 + 6’. Maak geen letterlijk beeld met duizenden stenen.

**Bij Moose:** Toon ‘2.687 + 700 = 3.387’ en ‘3.387 + 50 = 3.437’. Werk de laatste +6 uit als +3 en +3. Toon ‘3.437 + 3 = 3.440’ en ‘3.440 + 3 = ?’.

**Bij de volledige uitleg:** Vul dezelfde rekenstappenkaart aan met 3.443 en het antwoord ‘3.443 stenen’. Behoud de splitsing van 756 en de groepering van de laatste twee sprongen onder +6.

## Review vóór import

Deze zes optelvragen zijn nieuw redactioneel concept. Controleer vooral de begrijpelijkheid van de grensoverschrijdingen en of Moose een bruikbare stap voordoet zonder het volledige antwoord te tonen. De uitleg gaat bewust verder dan alleen een uitkomst of een algemeen advies.

Na inhoudelijke goedkeuring komt deze reeks samen met breuken, geld/wisselgeld en tijdsduur in het vaste importpakket. Codex kiest niet zelf vervangende content, moeilijkheid of uitleg. Er is nog geen Atlas-code aangepast of runtime-integratie getest voor deze zes vragen.


---

# APPROVED SOURCE PACKAGE — Runenpoort-M6-proefpakket-03-geld-wisselgeld.md

# Runenpoort — M6-proefpakket 03: geld en wisselgeld

**Status:** redactioneel concept, versie 0.1. Ter beoordeling; nog niet goedgekeurd voor productie of geïmporteerd.

## Plaats in de pilot

Het Runenpoort-proefpakket omvat 24 hier geschreven vragen: zes over breuken, zes over optellen, zes over geld/wisselgeld en zes over tijdsduur. De breuken- en optelreeks zijn door André in de chat inhoudelijk goedgekeurd. Dit bestand bevat de volgende zes vragen, over geld en wisselgeld. Eerdere goedgekeurde teksten zijn niet gewijzigd.

De locaties en objectkoppelingen zijn voorstellen op basis van de eerder in de chat gelezen Runenpoort-gegevens. Er is voor dit pakket geen nieuwe broncodecontrole of import uitgevoerd. Codex controleert de actuele lokale objecten en geschikte vraagposities vóór integratie. Deze zes vragen schrijven geen wijzigingen aan winkels, NPC’s, levelachtergronden of routes voor.

## Context: euro’s en centen

Deze geldvragen zijn moderne oefensituaties rond een Vikinguitje: kaartjes, souvenirs en knutselmateriaal. De bedragen zijn fictieve, bewust gekozen oefenprijzen. De vragen stellen niet dat historische Vikingen euro’s gebruikten en veranderen het verhaal van Runenpoort niet. De exacte aankopen staan in het vraagvenster; een winkel hoeft niet zichtbaar of aanwezig te zijn in het level.

Deze keuze oefent echte euro-/centnotatie, in plaats van willekeurige komma’s aan fictieve ‘munten’ toe te voegen. De context ondersteunt het leerdoel, maar voegt geen extra informatie toe die Sven voor de berekening nodig heeft.

## Niveau en moeilijkheid

Alle zes hebben `learningLevel: M6` als afgesproken Atlas-oefenlaag. Dit is een redactionele indeling binnen de pilot, geen Cito-gekalibreerde classificatie. Instapvragen mogen voorkennis herhalen en met E5 overlappen.

- **1 — Instap:** één prijs aanvullen tot de volgende hele euro; het antwoord bestaat uit centen.
- **2 — Normaal:** eerst aanvullen tot de volgende hele euro, daarna verder tot het betaalde bedrag; euro’s en centen combineren.
- **3 — Uitdagend:** eerst twee prijzen optellen, inclusief een overschrijding van een hele euro, daarna het wisselgeld bepalen.

Elke vraag is zelfstandig bruikbaar. De moeilijkheid wordt niet afgeleid uit het level. Twee vragen per moeilijkheid is een redactionele proefverdeling, geen voorschrift voor een 33/33/33-selectiemix.

## De vaste aanpak

Wisselgeld bepalen we hier door vanaf de prijs aan te vullen tot de betaling. Bij twee aankopen bepalen we eerst de totale prijs. Minnie legt de aanpak uit. Moose rekent een concrete tussenstap voor en laat Sven een haalbare vervolgstap maken. De volledige uitleg volgt dezelfde aanpak en eindigt met een controle: prijs plus wisselgeld is gelijk aan de betaling.

Moose mag tussenantwoorden geven. Geen geautomatiseerde voorkeur voor ‘zo weinig mogelijk antwoordcijfers’ als dat de hulp onbegrijpelijk maakt. De sommen, tussenantwoorden en alle teksten zijn hier redactioneel vastgelegd; code mag ze controleren, niet vervangen of nieuwe opgaven bedenken.

Dit is wisselgeld, niet de bestaande `money`-strategie voor aantal × prijs. Codex moet de goedgekeurde teksten importeren en de juiste technische representatie gebruiken; niet op basis van het thema geld automatisch de huidige vermenigvuldig-hints kiezen. De definitieve schema-mapping hoort in het latere importcontract.

## Antwoordcontract — open eurobedrag

Alle vragen hebben een invoerveld met een vaste **€** ervoor. Het zichtbare label is **‘Bedrag in euro’s’**. Een euroteken hoeft dus niet te worden getypt. Toon in vraag en uitleg Nederlandse bedragnotatie, met een komma en bij uitkomsten twee centcijfers.

De canonieke antwoorden hieronder zijn gehele aantallen **centen** voor technische controle; het door Sven gebruikte antwoordveld is in **euro’s**. Die twee mogen niet worden verwisseld. Iedere vraag vermeldt exact welke invoervormen voor het juiste bedrag worden geaccepteerd.

Een komma is de normale decimale scheiding. Een punt mag binnen uitsluitend dit euro-antwoordtype dezelfde functie hebben om toetsenbordinvoer op verschillende apparaten mogelijk te maken. Waar het juiste bedrag op nul cent-eenheden eindigt, worden de expliciet vermelde één-decimaalvormen ook geaccepteerd, bijvoorbeeld `7,6` en `7,60`. Trim alleen buitenste witruimte. Deze afspraken geven geen toestemming om globaal punten, komma’s, spaties of accenten te verwijderen.

Invoer `50` betekent in dit veld €50, niet 50 cent. Invoer `325` betekent €325, niet €3,25. Geen stilzwijgende cent-/euro-omrekening op basis van het correcte antwoord. Verander bestaande E5-invoer of spellingbeoordeling niet. Niet-genoemde extra toleranties worden niet op eigen initiatief toegevoegd. Een vaste veldnotitie luidt **‘Vul het bedrag in euro’s in.’**

Een lege of niet als bedrag te lezen invoer krijgt invoerfeedback, niet een onterecht rekenfoutlabel. Een geldig maar onjuist bedrag volgt de afgesproken Minnie → Moose → uitleg-flow. Technische implementatie en tests volgen in het integratiecontract; dit bestand verandert geen runtime.

## Weergave en hulpstappen

Gebruik een compacte prijs-/betalingskaart en daarna een aanvulkaart. Die aanvulkaart is een reeks gelabelde bedragen en rekenstappen, **geen getallenlijn op schaal**. Pijlen geven de volgorde aan, niet de relatieve grootte van bedragen. Op iPad mogen de stappen verticaal worden gestapeld; geen horizontaal scrollen voor een lange uitleg.

Toon bij de eerste vraagweergave alleen gegeven prijzen en betaald bedrag. Reken bij twee aankopen het totaal niet alvast uit. Open alleen de tussenresultaten die bij de daadwerkelijk getoonde hulpstap horen. Maak geen extra interactieve muntensorteer-minigame en beeld €4 niet af als een niet-bestaand bankbiljet; een tekstvak ‘Betaald — €4,00’ volstaat.

Alle vraagteksten, hints en uitlegstappen hieronder zijn exacte redactionele content. Volledige uitleg wordt leesbaar in stappen aangeboden, ook bij een NPC-panel. ‘Leg uit’ hoeft niet op drie fouten te wachten. Het tonen van die uitleg moet in het verslag worden geregistreerd en mag een later juist antwoord niet als zelfstandig resultaat laten tellen.

## Rapportage en dekking

Bewaar vraag-ID, contentversie, werkelijk aangeboden niveau, difficulty, leerdoel/rapportagelabel, antwoorden en getoonde hulp. Bewaar waar mogelijk zowel de ruwe euro-invoer als het geïnterpreteerde bedrag, zodat het onderscheid tussen 50 en 0,50 terug te zien is. Het verslag mag daaruit niet zelfstandig een diagnose over Svens denken afleiden.

Bewaar voorkeur, gevraagd niveau en geleverd niveau afzonderlijk. Een geopende uitleg is niet automatisch begrepen of een afgeronde opgave. Heropenen wist eerdere hulp niet uit. Een juist antwoord na de volledige oplossing is geen zelfstandig resultaat.

Dit pakket dekt niet alle Runenpoort-vraagposities. De bestaande 90/10-default blijft intact; geen volledige M6-dekking of exacte moeilijkheidsverdeling claimen voordat het hele pakket is gekoppeld en de selectie is getest.

## Overzicht

| ID | Moeilijkheid | Gegeven prijzen | Betaald | Wisselgeld |
|---|---|---|---|---|
| RP-M6-GE-001 | 1 — Instap | €1,50 | €2,00 | €0,50 |
| RP-M6-GE-002 | 1 — Instap | €3,20 | €4,00 | €0,80 |
| RP-M6-GE-003 | 2 — Normaal | €6,75 | €10,00 | €3,25 |
| RP-M6-GE-004 | 2 — Normaal | €12,40 | €20,00 | €7,60 |
| RP-M6-GE-005 | 3 — Uitdagend | €4,75 + €3,50 | €10,00 | €1,75 |
| RP-M6-GE-006 | 3 — Uitdagend | €6,80 + €7,65 | €20,00 | €5,55 |

## RP-M6-GE-001 — Een kaartje met een Vikingtekening

**Niveau:** M6  
**Moeilijkheid:** 1 — Instap  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0001 — De Runenpoort / zon — Zonrune  
**Leerdoel:** Wisselgeld bepalen door een prijs met halve euro’s aan te vullen tot de volgende hele euro.  
**Rapportagelabel:** Geld · Aanvullen tot de volgende euro  
**Vorm:** verhaalsom  
**Antwoordmodus:** open eurobedrag  
**Canoniek antwoord in centen:** 50  
**Antwoord voor weergave:** €0,50  
**Veldlabel:** Bedrag in euro’s  
**Vaste prefix:** €  
**Toegestane juiste invoervormen:** `0,50`, `0,5`, `0.50`, `0.5`  
**Rekenkundige controle:** 200 − (150) = 50 cent  

### Vraag — exacte tekst

Een kaartje met een Vikingtekening kost €1,50. Je betaalt met €2. Hoeveel geld krijg je terug?

### Minnie — exacte tekst

Wisselgeld is het bedrag dat je terugkrijgt omdat je meer betaalt dan iets kost. Vul de prijs van €1,50 aan tot €2.

### Moose — exacte tekst

€1,50 is 1 euro en 50 cent. Een hele euro is 100 cent. Hoeveel cent moet er bij die 50 cent om bij €2 te komen? Reken 100 − 50.

### Volledige uitleg — exacte tekst, per stap

Je betaalt meer dan de prijs. Het verschil tussen €1,50 en €2 krijg je terug.

Vul €1,50 aan tot €2. Daarvoor vul je de 50 cent aan tot een hele euro van 100 cent.

Er moet 100 − 50 = 50 cent bij.

50 cent schrijf je als €0,50. Je krijgt dus €0,50 terug.

Controle: €1,50 + €0,50 = €2,00. De prijs en het wisselgeld zijn samen precies wat je betaalde.

### Weergavespecificatie

**Bij de vraag:** Toon een prijskaartje met ‘Vikingkaartje — €1,50’ en een apart vak ‘Betaald — €2,00’. Toon geen wisselgeld of oplossingsstappen. Onder de vraag staat het lege euro-invoerveld.

**Bij Minnie:** Toon een aanvulkaart ‘€1,50 → €2,00’ met ‘+ ?’ bij de pijl. Label het begin als ‘prijs’ en het einde als ‘betaald’.

**Bij Moose:** Behoud de aanvulkaart. Voeg ‘1 euro = 100 cent’ en ‘100 − 50 = ? cent’ toe. Het antwoordveld blijft in euro’s; vul het niet automatisch in en toon nog geen €0,50.

**Bij de volledige uitleg:** Vul de pijl in met ‘+ 50 cent’. Toon daarnaast ‘50 cent = €0,50’ en de controle ‘€1,50 + €0,50 = €2,00’.

### Controlepunt voor review/import

De leerling zoekt het verschil tussen prijs en betaling, niet de prijs zelf. Een invoer van 50 in het euroveld betekent €50 en is dus niet correct.

## RP-M6-GE-002 — Runenstickers

**Niveau:** M6  
**Moeilijkheid:** 1 — Instap  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0001 — De Runenpoort / wind — Freya / Windrune  
**Leerdoel:** Wisselgeld in tientallen centen bepalen door aan te vullen tot de volgende hele euro.  
**Rapportagelabel:** Geld · Aanvullen tot de volgende euro  
**Vorm:** verhaalsom  
**Antwoordmodus:** open eurobedrag  
**Canoniek antwoord in centen:** 80  
**Antwoord voor weergave:** €0,80  
**Veldlabel:** Bedrag in euro’s  
**Vaste prefix:** €  
**Toegestane juiste invoervormen:** `0,80`, `0,8`, `0.80`, `0.8`  
**Rekenkundige controle:** 400 − (320) = 80 cent  

### Vraag — exacte tekst

Een vel runenstickers kost €3,20. Je betaalt met €4. Hoeveel geld krijg je terug?

### Minnie — exacte tekst

Wisselgeld vind je door de prijs aan te vullen tot wat je betaalt. Vul €3,20 aan tot €4.

### Moose — exacte tekst

€3,20 is 3 euro en 20 cent. Om bij €4 te komen, vul je de 20 cent aan tot een hele euro van 100 cent. Reken 100 − 20.

### Volledige uitleg — exacte tekst, per stap

We zoeken het verschil tussen de prijs van €3,20 en de betaling van €4.

Vul de 20 cent aan tot een hele euro van 100 cent: 100 − 20 = 80 cent. Zo kom je van €3,20 bij €4.

80 cent schrijf je als €0,80. Je krijgt dus €0,80 terug.

Controle: €3,20 + €0,80 = €4,00.

### Weergavespecificatie

**Bij de vraag:** Toon ‘Runenstickers — €3,20’ en ‘Betaald — €4,00’. Toon een bedrag als tekst, geen fictief bankbiljet van vier euro. Geen oplossingsstappen.

**Bij Minnie:** Toon ‘€3,20 → €4,00’ met ‘+ ?’ bij de pijl, van ‘prijs’ naar ‘betaald’.

**Bij Moose:** Voeg ‘1 euro = 100 cent’ en ‘100 − 20 = ? cent’ toe. Nog geen 80 cent of €0,80 als uitkomst tonen.

**Bij de volledige uitleg:** Vul de pijl in met ‘+ 80 cent’, toon ‘80 cent = €0,80’ en de controle ‘€3,20 + €0,80 = €4,00’.

### Controlepunt voor review/import

Deze vraag is zelfstandig begrijpelijk; geen verwijzing naar de eerdere kaartjesvraag. 80 in het euroveld wordt niet stilzwijgend als 80 cent opgevat.

## RP-M6-GE-003 — Een klein Vikingschip

**Niveau:** M6  
**Moeilijkheid:** 2 — Normaal  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / shipModel — Scheepsmodel  
**Leerdoel:** Wisselgeld bepalen in twee stukken: centen tot de volgende hele euro en daarna hele euro’s tot het betaalde bedrag.  
**Rapportagelabel:** Geld · Wisselgeld met euro’s en centen  
**Vorm:** verhaalsom  
**Antwoordmodus:** open eurobedrag  
**Canoniek antwoord in centen:** 325  
**Antwoord voor weergave:** €3,25  
**Veldlabel:** Bedrag in euro’s  
**Vaste prefix:** €  
**Toegestane juiste invoervormen:** `3,25`, `3.25`  
**Rekenkundige controle:** 1000 − (675) = 325 cent  

### Vraag — exacte tekst

Een klein Vikingschip als souvenir kost €6,75. Je betaalt met €10. Hoeveel geld krijg je terug?

### Minnie — exacte tekst

Vul €6,75 eerst aan tot €7 en daarna tot €10. Alles wat je erbij telt, is samen je wisselgeld.

### Moose — exacte tekst

Van €6,75 naar €7 is 25 cent, want 75 + 25 = 100. Reken nu hoeveel euro er nog bij moet van €7 tot €10 en tel beide stukken samen.

### Volledige uitleg — exacte tekst, per stap

We vullen de prijs van €6,75 aan tot de betaling van €10. De bedragen die we erbij tellen, vormen samen het wisselgeld.

Eerst naar €7: 100 − 75 = 25 cent. Dus €6,75 + €0,25 = €7,00.

Daarna van €7 naar €10: €10 − €7 = €3.

Samen is dat 3 euro en 25 cent: €3 + €0,25 = €3,25.

Je krijgt €3,25 terug. Controle: €6,75 + €3,25 = €10,00.

### Weergavespecificatie

**Bij de vraag:** Toon ‘Vikingschip — €6,75’ en ‘Betaald — €10,00’. Geen tussentotaal, hulplijn of wisselgeld tonen.

**Bij Minnie:** Toon ‘€6,75 → €7,00 → €10,00’, met ‘+ ?’ bij beide pijlen. De twee sprongen staan voor centen en vervolgens hele euro’s.

**Bij Moose:** Vul alleen de eerste pijl in: ‘+ €0,25’. Toon de tweede als ‘+ ? euro’. Onder de kaart staat ‘Wisselgeld = beide sprongen samen’; toon nog niet €3 of €3,25.

**Bij de volledige uitleg:** Vul de tweede pijl in met ‘+ €3’. Toon ‘€0,25 + €3 = €3,25’ en de controle. Behoud dezelfde tussenstop €7.

### Controlepunt voor review/import

De twee aanvullingen moeten worden opgeteld. Niet alleen het aantal hele euro’s of alleen het aantal centen als antwoord accepteren.

## RP-M6-GE-004 — Een kaartje voor de boottocht

**Niveau:** M6  
**Moeilijkheid:** 2 — Normaal  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / harborMap — Havenkaart  
**Leerdoel:** Wisselgeld met euro’s en centen berekenen door via de volgende hele euro aan te vullen.  
**Rapportagelabel:** Geld · Wisselgeld met euro’s en centen  
**Vorm:** verhaalsom  
**Antwoordmodus:** open eurobedrag  
**Canoniek antwoord in centen:** 760  
**Antwoord voor weergave:** €7,60  
**Veldlabel:** Bedrag in euro’s  
**Vaste prefix:** €  
**Toegestane juiste invoervormen:** `7,60`, `7,6`, `7.60`, `7.6`  
**Rekenkundige controle:** 2000 − (1240) = 760 cent  

### Vraag — exacte tekst

Een kaartje voor een boottocht kost €12,40. Je betaalt met €20. Hoeveel geld krijg je terug?

### Minnie — exacte tekst

Vul €12,40 eerst aan tot €13 en daarna tot €20. Tel de twee bedragen die erbij moeten bij elkaar op.

### Moose — exacte tekst

Van €12,40 naar €13 is 60 cent: 40 + 60 = 100. Reken nu het verschil tussen €13 en €20. Die euro’s en de 60 cent krijg je samen terug.

### Volledige uitleg — exacte tekst, per stap

Je krijgt het verschil tussen €12,40 en €20 terug. We rekenen eerst tot €13 en daarna tot €20.

Van €12,40 naar €13 is 100 − 40 = 60 cent. Dat is €0,60.

Van €13 naar €20 is €20 − €13 = €7.

Tel de twee stukken samen: €7 + €0,60 = €7,60.

Je krijgt €7,60 terug. Controle: €12,40 + €7,60 = €20,00.

### Weergavespecificatie

**Bij de vraag:** Toon ‘Boottocht — €12,40’ en ‘Betaald — €20,00’. Geen wisselgeld of berekening tonen.

**Bij Minnie:** Toon ‘€12,40 → €13,00 → €20,00’, met twee oningevulde sprongen.

**Bij Moose:** Toon ‘+ €0,60’ bij de eerste pijl en ‘+ ? euro’ bij de tweede. Toon nog niet €7 of €7,60.

**Bij de volledige uitleg:** Toon bij de tweede pijl ‘+ €7’. Voeg ‘€0,60 + €7 = €7,60’ en de controle toe.

### Controlepunt voor review/import

De 60 cent moeten worden meegenomen nadat het verschil in hele euro’s is berekend. De visualisatie zegt niet dat 60 cent €60 is.

## RP-M6-GE-005 — Een boekje en stickers

**Niveau:** M6  
**Moeilijkheid:** 3 — Uitdagend  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / mapTable — Kaarttafel  
**Leerdoel:** Twee prijzen met centen optellen en vervolgens het wisselgeld bepalen.  
**Rapportagelabel:** Geld · Twee aankopen en wisselgeld  
**Vorm:** verhaalsom  
**Antwoordmodus:** open eurobedrag  
**Canoniek antwoord in centen:** 175  
**Antwoord voor weergave:** €1,75  
**Veldlabel:** Bedrag in euro’s  
**Vaste prefix:** €  
**Toegestane juiste invoervormen:** `1,75`, `1.75`  
**Rekenkundige controle:** 1000 − (475 + 350) = 175 cent  

### Vraag — exacte tekst

Je koopt een boekje over Vikingen voor €4,75 en een vel runenstickers voor €3,50. Je betaalt met €10. Hoeveel geld krijg je terug?

### Minnie — exacte tekst

Je koopt twee dingen. Tel eerst de twee prijzen op. Vul het totaal daarna aan tot de €10 waarmee je betaalt.

### Moose — exacte tekst

€4,75 + €3,50 = €8,25. Van €8,25 naar €9 is 75 cent. Reken nu hoeveel er nog bij moet tot €10 en tel dat bij die 75 cent.

### Volledige uitleg — exacte tekst, per stap

Eerst zoeken we wat het boekje en de stickers samen kosten. Pas daarna rekenen we het wisselgeld uit.

Tel bij €4,75 eerst de 3 euro van €3,50 op: €4,75 + €3 = €7,75.

Nu nog 50 cent. Met 25 cent erbij kom je op €8. Met de andere 25 cent erbij kom je op €8,25. De twee aankopen kosten samen €8,25.

Vul €8,25 aan tot €9: dat is 75 cent. Van €9 tot €10 moet er nog €1 bij.

Het wisselgeld is €0,75 + €1 = €1,75. Je krijgt dus €1,75 terug.

Controle: de totale prijs van €8,25 en het wisselgeld van €1,75 zijn samen €10,00.

### Weergavespecificatie

**Bij de vraag:** Toon twee afzonderlijke prijsregels: ‘Boekje — €4,75’ en ‘Runenstickers — €3,50’, plus ‘Betaald — €10,00’. Toon géén uitgerekend totaal op een kassabon. Beide prijzen moeten door de leerling worden meegenomen.

**Bij Minnie:** Toon twee duidelijk gescheiden onderdelen op de stappenkaart: ‘1. Samen: €4,75 + €3,50 = ?’ en ‘2. Vul het totaal aan tot €10’. Nog geen tussenantwoord tonen.

**Bij Moose:** Vul het prijstotaal in als €8,25. Toon daarna ‘€8,25 → €9,00 → €10,00’ met ‘+ €0,75’ bij de eerste pijl en ‘+ ?’ bij de tweede. Geen €1,75 tonen.

**Bij de volledige uitleg:** Werk eerst het prijstotaal uit: €4,75 + €3 = €7,75, daarna +€0,25 naar €8,00 en +€0,25 naar €8,25. Groepeer die laatste twee sprongen onder de ene stap +€0,50. Behoud vervolgens de aparte wisselgeldkaart met +€0,75 en +€1. Toon als eindantwoord €1,75, niet het prijstotaal €8,25.

### Controlepunt voor review/import

Er zijn twee verschillende totalen: aankoopprijs (€8,25) en gevraagd wisselgeld (€1,75). Het aankoopbedrag mag vóór Moose niet als antwoordhulp zichtbaar worden.

## RP-M6-GE-006 — Een bouwpakket en verf

**Niveau:** M6  
**Moeilijkheid:** 3 — Uitdagend  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / shipModel — Scheepsmodel  
**Leerdoel:** Twee bedragen met euro’s en centen optellen, over een hele euro gaan en het wisselgeld berekenen.  
**Rapportagelabel:** Geld · Twee aankopen en wisselgeld  
**Vorm:** verhaalsom  
**Antwoordmodus:** open eurobedrag  
**Canoniek antwoord in centen:** 555  
**Antwoord voor weergave:** €5,55  
**Veldlabel:** Bedrag in euro’s  
**Vaste prefix:** €  
**Toegestane juiste invoervormen:** `5,55`, `5.55`  
**Rekenkundige controle:** 2000 − (680 + 765) = 555 cent  

### Vraag — exacte tekst

Je koopt een bouwpakket van een Vikingschip voor €6,80 en verf voor €7,65. Je betaalt met €20. Hoeveel geld krijg je terug?

### Minnie — exacte tekst

Tel eerst de prijs van het bouwpakket en de prijs van de verf bij elkaar op. Vul dat totaal daarna aan tot €20.

### Moose — exacte tekst

€6,80 + €7,65 = €14,45. Vul €14,45 aan tot €15: dat is 55 cent. Hoeveel euro moet er daarna nog bij tot €20? Tel beide stukken samen.

### Volledige uitleg — exacte tekst, per stap

We zoeken eerst de totale prijs van het bouwpakket en de verf.

Tel bij €6,80 eerst 7 euro op: €6,80 + €7 = €13,80.

Nu nog 65 cent. Tel eerst 20 cent tot €14. Van de 65 cent blijven dan nog 45 cent over. Met die 45 cent erbij is de totale prijs €14,45.

Vul €14,45 aan tot €15. Er moet 100 − 45 = 55 cent bij, dus €0,55.

Van €15 naar €20 moet er nog €5 bij. Het wisselgeld is €0,55 + €5 = €5,55.

Je krijgt €5,55 terug. Controle: €14,45 + €5,55 = €20,00.

### Weergavespecificatie

**Bij de vraag:** Toon ‘Bouwpakket — €6,80’, ‘Verf — €7,65’ en ‘Betaald — €20,00’. Het prijstotaal wordt niet voorgerekend.

**Bij Minnie:** Toon ‘1. Samen: €6,80 + €7,65 = ?’ en ‘2. Vul het totaal aan tot €20’. Beide onderdelen blijven als afzonderlijke stappen herkenbaar.

**Bij Moose:** Toon het berekende prijstotaal €14,45 en de wisselgeldkaart ‘€14,45 → €15,00 → €20,00’. Eerste sprong: +€0,55. Tweede sprong: +? euro. Nog geen €5 of €5,55 tonen.

**Bij de volledige uitleg:** Werk de totale prijs uit met +€7 tot €13,80, +€0,20 tot €14,00 en +€0,45 tot €14,45. Groepeer de laatste twee sprongen onder +€0,65. Toon op de aparte wisselgeldkaart +€0,55 en +€5. De einduitkomst is €5,55; bewaar de controle met de totale prijs.

### Controlepunt voor review/import

De leerling moet zowel beide prijzen als beide stukken wisselgeld combineren. De route via de volgende hele euro blijft dezelfde als in Minnie en Moose.

## Review vóór import

Deze zes vragen zijn concept. Beoordeel de helderheid van de euro-/centnotatie, de bruikbaarheid van de tussenstappen en de opbouw van één aanvulling naar twee aankopen plus wisselgeld. Het antwoord na de volledige uitleg is expliciet, zoals bedoeld voor die hulpstap. De andere rekenaanpakken die een leerling zelf kiest, zijn niet verboden; de gegeven aanvulaanpak is het vaste uitlegaanbod.

Alle zes antwoorden en de expliciet toegestane numerieke antwoordvormen zijn programmatisch gecontroleerd tegen de hier vastgelegde prijzen en betalingen. Deze controle genereert geen vraaginhoud en vervangt geen inhoudelijke review of latere integratietest. De feiten over winkels/prijzen zijn fictieve oefencontext, geen opgezochte retailgegevens.

Na inhoudelijke goedkeuring wordt deze reeks samen met breuken, optellen en tijdsduur opgenomen in het importpakket, inclusief technische afspraken voor difficulty-selectie, hulpweergave en Voortgang. Geen bestaande Atlas-content, goedgekeurde teksten of broncode is door deze uitwerking aangepast.


---

# APPROVED SOURCE PACKAGE — Runenpoort-M6-proefpakket-04-tijdsduur.md

# Runenpoort — M6-proefpakket 04: tijdsduur

**Status:** redactioneel concept, versie 0.1. Ter beoordeling; nog niet goedgekeurd voor productie of geïmporteerd.

## Plaats in de pilot

Dit document bevat de laatste zes vragen van het Runenpoort M6-pilotpakket: tijdsduur. De eerdere drie reeksen (breuken, optellen, geld/wisselgeld) zijn in de chat inhoudelijk goedgekeurd.

## Niveau en moeilijkheid

Alle zes krijgen `learningLevel: "M6"`.

- **1 — Instap:** tijdsduur binnen hetzelfde uur bepalen.
- **2 — Normaal:** tijdsduur bepalen terwijl de periode over een heel uur heen gaat.
- **3 — Uitdagend:** een onbekende eindtijd of begintijd bepalen bij een gegeven duur van meer dan een uur.

De moeilijkheid komt uit de denkstappen, niet uit langere vraagteksten. Elke vraag is zelfstandig bruikbaar.

## Didactische aanpak

Voor tijd rekenen we zichtbaar via logische tussenpunten:

1. naar het volgende hele uur;
2. hele uren;
3. resterende minuten.

Bij terugrekenen gebruiken we dezelfde structuur in omgekeerde richting.

Een uur bestaat uit 60 minuten. Atlas behandelt tijd dus nooit alsof `14:50 + 20 minuten` gelijk is aan `14:70`.

Minnie maakt de eerste bruikbare stap duidelijk. Moose werkt een relevante tussenstap concreet uit en laat nog een haalbare stap over. De volledige uitleg gebruikt dezelfde aanpak en legt uit waarom de deelstappen samen de totale tijd vormen.

## Antwoordcontract

Vragen 1–4 gebruiken een open getalantwoord in **minuten**. De eenheid staat naast het invoerveld.

Vragen 5–6 zijn meerkeuzevragen met vier bewust gekozen tijdstippen. Daarmee hoeft voor deze pilot geen nieuwe vrije invoerparser voor kloktijden te worden gebouwd.

Vraagtekst, Minnie, Moose, uitleg en antwoordopties zijn vaste redactionele content. Codex mag ze niet herformuleren, vervangen of aanvullen.

## Rapportagecontract

Bewaar vraag-ID, contentversie, werkelijk aangeboden niveau, difficulty, leerdoel/rapportagelabel, antwoorden, gebruikte hints en volledige uitleg. Het verslag onderscheidt direct goed, goed na Minnie, goed na Moose en met volledige uitleg afgerond.

## Overzicht

| ID | Moeilijkheid | Vraagkern | Antwoord |
|---|---|---|---|
| RP-M6-TI-001 | 1 — Instap | 09:20 → 09:50 | 30 minuten |
| RP-M6-TI-002 | 1 — Instap | 10:10 → 10:35 | 25 minuten |
| RP-M6-TI-003 | 2 — Normaal | 14:35 → 15:10 | 35 minuten |
| RP-M6-TI-004 | 2 — Normaal | 11:45 → 12:25 | 40 minuten |
| RP-M6-TI-005 | 3 — Uitdagend | 13:50 + 1 uur 25 min | 15:15 |
| RP-M6-TI-006 | 3 — Uitdagend | aankomst 16:20, duur 1 uur 35 min | vertrek 14:45 |

---

## RP-M6-TI-001 — Het schip laden

**Niveau:** M6  
**Moeilijkheid:** 1 — Instap  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / `shipCompass — Scheepsklok`  
**Leerdoel:** Een tijdsduur binnen hetzelfde uur bepalen.  
**Rapportagelabel:** Tijd · Tijdsduur binnen één uur  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 30 minuten  
**Eenheid naast het invoerveld:** minuten  
**Toegestane invoervorm:** `30`

### Vraag — exacte tekst

Het laden van het schip begint om 09:20 en is klaar om 09:50. Hoeveel minuten duurt het laden?

### Minnie — exacte tekst

Begin bij 09:20 en tel vooruit naar 09:50. Je kunt dat in stappen van 10 minuten doen.

### Moose — exacte tekst

Van 09:20 tot 09:40 zijn twee stappen van 10 minuten, dus 20 minuten. Hoeveel minuten komen er daarna nog bij tot 09:50?

### Volledige uitleg — exacte tekst, per stap

We zoeken hoeveel tijd er ligt tussen **09:20 en 09:50**.

Van 09:20 naar 09:30 is **10 minuten**.

Van 09:30 naar 09:40 is nog **10 minuten**.

Van 09:40 naar 09:50 is nog **10 minuten**.

Samen is dat **10 + 10 + 10 = 30 minuten**.

**Het laden duurt 30 minuten.**

### Weergavespecificatie

**Bij de vraag:** Toon een eenvoudige horizontale tijdlijn met alleen 09:20 links en 09:50 rechts. Geen tussenpunten of duur.

**Bij Minnie:** Voeg markeringen voor 09:30 en 09:40 toe. Toon nog geen totalen.

**Bij Moose:** Markeer het stuk 09:20 → 09:40 als 20 minuten. Laat 09:40 → 09:50 nog als oningevulde laatste stap zichtbaar.

**Bij volledige uitleg:** Label de drie sprongen elk als 10 minuten en het totaal als 30 minuten.

---

## RP-M6-TI-002 — De vuurschaal

**Niveau:** M6  
**Moeilijkheid:** 1 — Instap  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / `fireBowl — Vuurschaal`  
**Leerdoel:** Een tijdsduur binnen hetzelfde uur bepalen met een combinatie van tientallen en vijf minuten.  
**Rapportagelabel:** Tijd · Tijdsduur binnen één uur  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 25 minuten  
**Eenheid naast het invoerveld:** minuten  
**Toegestane invoervorm:** `25`

### Vraag — exacte tekst

De vuurschaal wordt aangestoken om 10:10. Om 10:35 wordt het vuur gedoofd. Hoeveel minuten brandt de vuurschaal?

### Minnie — exacte tekst

Reken vooruit vanaf 10:10. Ga eerst naar 10:30 en kijk daarna hoeveel minuten er nog over zijn tot 10:35.

### Moose — exacte tekst

Van 10:10 tot 10:30 is 20 minuten. Van 10:30 tot 10:35 komt er nog een klein stukje bij. Hoeveel minuten is dat?

### Volledige uitleg — exacte tekst, per stap

We zoeken de tijd van **10:10 tot 10:35**.

Van 10:10 naar 10:30 is **20 minuten**.

Van 10:30 naar 10:35 is **5 minuten**.

Tel de twee stukken bij elkaar op: **20 + 5 = 25 minuten**.

**De vuurschaal brandt 25 minuten.**

### Weergavespecificatie

**Bij de vraag:** Tijdlijn van 10:10 naar 10:35, zonder tussentijden.

**Bij Minnie:** Voeg 10:30 als handig tussenpunt toe.

**Bij Moose:** Label 10:10 → 10:30 als 20 minuten. Laat het laatste stuk tot 10:35 zonder duur.

**Bij volledige uitleg:** Label het laatste stuk als 5 minuten en toon 20 + 5 = 25 minuten.

---

## RP-M6-TI-003 — Terug van de rivier

**Niveau:** M6  
**Moeilijkheid:** 2 — Normaal  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / `harborMap — Havenkaart`  
**Leerdoel:** Een tijdsduur berekenen die over een heel uur heen gaat.  
**Rapportagelabel:** Tijd · Tijdsduur over het hele uur  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 35 minuten  
**Eenheid naast het invoerveld:** minuten  
**Toegestane invoervorm:** `35`

### Vraag — exacte tekst

Een boot vertrekt om 14:35 en komt om 15:10 terug. Hoeveel minuten duurt de tocht?

### Minnie — exacte tekst

De tocht gaat over 15:00 heen. Reken daarom eerst van 14:35 tot 15:00 en daarna van 15:00 tot 15:10.

### Moose — exacte tekst

Een uur heeft 60 minuten. Van 14:35 tot 15:00 is 60 − 35 = 25 minuten. Tel daar de minuten na 15:00 nog bij.

### Volledige uitleg — exacte tekst, per stap

We delen de tocht op bij het hele uur **15:00**.

Van 14:35 tot 15:00 is **25 minuten**, want **60 − 35 = 25**.

Van 15:00 tot 15:10 is nog **10 minuten**.

Samen duurt de tocht **25 + 10 = 35 minuten**.

**De tocht duurt 35 minuten.**

### Weergavespecificatie

**Bij de vraag:** Tijdlijn met 14:35 links en 15:10 rechts. 15:00 staat nog niet als rekenstap uitgelicht.

**Bij Minnie:** Voeg 15:00 als duidelijk tussenpunt toe en splits de lijn daar visueel.

**Bij Moose:** Label het eerste stuk 14:35 → 15:00 als 25 minuten. Laat het tweede stuk nog zonder uitkomst.

**Bij volledige uitleg:** Label het tweede stuk als 10 minuten en toon 25 + 10 = 35 minuten.

---

## RP-M6-TI-004 — Wachtdienst bij de tempel

**Niveau:** M6  
**Moeilijkheid:** 2 — Normaal  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0002 — De Tempelzaal / `shieldWall — Schildenmuur`  
**Leerdoel:** Een tijdsduur over het middaguur berekenen.  
**Rapportagelabel:** Tijd · Tijdsduur over het hele uur  
**Antwoordmodus:** open getalantwoord  
**Correct antwoord:** 40 minuten  
**Eenheid naast het invoerveld:** minuten  
**Toegestane invoervorm:** `40`

### Vraag — exacte tekst

De wachtdienst bij de tempel begint om 11:45 en eindigt om 12:25. Hoeveel minuten duurt de wachtdienst?

### Minnie — exacte tekst

Reken eerst van 11:45 tot 12:00. Reken daarna van 12:00 tot 12:25. Tel die twee tijden bij elkaar op.

### Moose — exacte tekst

Van 11:45 tot 12:00 is 15 minuten. Na 12:00 duurt de wachtdienst nog 25 minuten. Welke optelsom geeft de totale duur?

### Volledige uitleg — exacte tekst, per stap

We gebruiken **12:00** als handig tussenpunt.

Van 11:45 tot 12:00 duurt **15 minuten**.

Van 12:00 tot 12:25 duurt **25 minuten**.

Tel beide stukken op: **15 + 25 = 40 minuten**.

**De wachtdienst duurt 40 minuten.**

### Weergavespecificatie

**Bij de vraag:** Tijdlijn 11:45 → 12:25.

**Bij Minnie:** Voeg 12:00 als tussenpunt toe.

**Bij Moose:** Toon 15 minuten vóór 12:00 en 25 minuten na 12:00, maar laat de totale duur als `15 + 25 = ?`.

**Bij volledige uitleg:** Vul het totaal in als 40 minuten.

---

## RP-M6-TI-005 — Wanneer komt Eivar terug?

**Niveau:** M6  
**Moeilijkheid:** 3 — Uitdagend  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / `shipCompass — Scheepsklok`  
**Leerdoel:** Een eindtijd bepalen bij een gegeven begintijd en duur van meer dan een uur.  
**Rapportagelabel:** Tijd · Eindtijd berekenen  
**Antwoordmodus:** meerkeuze  
**Correct antwoord:** `15:15`

**Antwoordopties:**

- `14:25`
- `15:05`
- `15:15`
- `15:25`

### Vraag — exacte tekst

Eivar vertrekt om 13:50. De tocht duurt 1 uur en 25 minuten. Hoe laat komt hij terug?

### Minnie — exacte tekst

Tel de duur in handige stukken op. Ga eerst van 13:50 naar het hele uur 14:00. Houd daarna bij hoeveel tijd van de 1 uur en 25 minuten nog over is.

### Moose — exacte tekst

Van 13:50 tot 14:00 gebruik je 10 minuten. Van de 1 uur en 25 minuten blijven dan 1 uur en 15 minuten over. Tel eerst dat hele uur vanaf 14:00 erbij.

### Volledige uitleg — exacte tekst, per stap

De tocht duurt **1 uur en 25 minuten** en begint om **13:50**.

Ga eerst 10 minuten vooruit naar het volgende hele uur: **13:50 → 14:00**.

Van de 1 uur en 25 minuten hebben we nu 10 minuten gebruikt. Er blijft **1 uur en 15 minuten** over.

Tel eerst het hele uur erbij: **14:00 → 15:00**.

Daarna nog 15 minuten: **15:00 → 15:15**.

**Eivar komt om 15:15 terug.**

### Weergavespecificatie

**Bij de vraag:** Tijdlijn startend op 13:50, zonder eindpunt. Toon daarnaast `duur: 1 uur 25 minuten`.

**Bij Minnie:** Voeg 14:00 als eerste tussenpunt toe en markeer de eerste sprong van 10 minuten. Toon `resterend: 1 uur 15 minuten`.

**Bij Moose:** Voeg de sprong 14:00 → 15:00 toe als 1 uur. Laat de laatste 15 minuten nog open en toon nog geen eindtijd.

**Bij volledige uitleg:** Voeg 15:15 toe als eindtijd en label de laatste sprong met 15 minuten.

**Afleiders:** 14:25 vertegenwoordigt alleen 25 minuten bij de starttijd optellen; 15:05 en 15:25 zijn nabije fouten rond de minutencomponent. Atlas presenteert de afleiders zonder foutdiagnose.

---

## RP-M6-TI-006 — Wanneer vertrok het schip?

**Niveau:** M6  
**Moeilijkheid:** 3 — Uitdagend  
**Versie:** 0.1  
**Voorgestelde plek:** LVL-0003 — De Vikinghaven / `harborMap — Havenkaart`  
**Leerdoel:** Een begintijd bepalen door een duur van meer dan een uur terug te rekenen vanaf een eindtijd.  
**Rapportagelabel:** Tijd · Begintijd berekenen  
**Antwoordmodus:** meerkeuze  
**Correct antwoord:** `14:45`

**Antwoordopties:**

- `14:45`
- `14:55`
- `15:05`
- `15:45`

### Vraag — exacte tekst

Het schip komt om 16:20 terug in de haven. De tocht duurde 1 uur en 35 minuten. Hoe laat vertrok het schip?

### Minnie — exacte tekst

Nu reken je terug vanaf 16:20. Ga eerst terug naar het hele uur 16:00 en houd bij hoeveel van de 1 uur en 35 minuten daarna nog terug moet.

### Moose — exacte tekst

Van 16:20 terug naar 16:00 is 20 minuten. Van de 1 uur en 35 minuten blijft nog 1 uur en 15 minuten over. Ga eerst dat hele uur terug naar 15:00.

### Volledige uitleg — exacte tekst, per stap

Het schip komt om **16:20** terug en de tocht duurde **1 uur en 35 minuten**.

Reken eerst 20 minuten terug: **16:20 → 16:00**.

Van de totale duur blijft dan **1 uur en 15 minuten** over.

Ga één heel uur terug: **16:00 → 15:00**.

Ga daarna nog 15 minuten terug: **15:00 → 14:45**.

**Het schip vertrok om 14:45.**

### Weergavespecificatie

**Bij de vraag:** Tijdlijn met 16:20 als vast eindpunt en `duur: 1 uur 35 minuten`. Begintijd ontbreekt.

**Bij Minnie:** Voeg 16:00 toe links van 16:20 en label de teruggaande sprong als 20 minuten. Toon `nog terug: 1 uur 15 minuten`.

**Bij Moose:** Voeg 15:00 toe met een sprong van 1 uur terug. Laat de laatste 15 minuten als oningevulde teruggaande stap zien.

**Bij volledige uitleg:** Vul 14:45 als begintijd in en label de laatste sprong als 15 minuten.

**Afleiders:** 15:45 trekt alleen 35 minuten af; 15:05 en 14:55 zijn nabije fouten bij de minutenstappen. Geen diagnose tijdens het beantwoorden.

---

## Voortgang

| Vragen | Onderdeel |
|---|---|
| 1–2 | **Tijd · Tijdsduur binnen één uur** |
| 3–4 | **Tijd · Tijdsduur over het hele uur** |
| 5 | **Tijd · Eindtijd berekenen** |
| 6 | **Tijd · Begintijd berekenen** |

Een sessieverslag kan bijvoorbeeld tonen:

> **Tijd · Tijdsduur over het hele uur — M6 · Normaal**  
> 2 vragen · 1 direct goed · 1 goed na Minnie.

Dat is informatiever dan deze vragen alleen onder `Klokkijken` te plaatsen.

## Review vóór import

Controleer vooral of de tijdlijnhulp natuurlijk voelt, of de moeilijke vragen voldoende denkwerk overlaten na Moose en of de afleiders geloofwaardige fouten representeren zonder de opgave kunstmatig verwarrend te maken.

Na inhoudelijke goedkeuring zijn de 24 Runenpoort-pilotvragen compleet. Codex importeert daarna uitsluitend het goedgekeurde contentpakket en bouwt de benodigde presentatie-, selectie- en Voortgang-ondersteuning zonder nieuwe leerinhoud te schrijven.
