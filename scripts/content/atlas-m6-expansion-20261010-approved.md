# Atlas — M6 Expansion Authoring

**Status:** APPROVED AUTHORING SOURCE — 60 nieuwe M6-vragen; inhoudelijke auditcorrecties verwerkt en mechanische eindcontrole geslaagd; klaar voor Codex-import  
**Doel:** dit bestand wordt per batch uitgebreid en bevat de door ChatGPT en André geschreven en beoordeelde nieuwe M6-content vóór Codex-import.

## 1. Vaste uitgangspunten

- E5 blijft volledig onaangetast.
- De bestaande 99 M6-educational cores blijven behouden.
- Nieuwe M6-content wordt toegevoegd; bestaande content wordt niet vervangen tenzij later expliciet besloten.
- M6 behoudt drie moeilijkheidsniveaus:
  - **D1 — Instap:** laagdrempelig, veilige overgang vanuit E5; noodzakelijke voorkennis mag worden herhaald of overlappen met E5.
  - **D2 — Normaal:** representatieve M6-opgave, zelfstandig toepassen, vaak twee betekenisvolle denkstappen of minder vriendelijke waarden.
  - **D3 — Uitdagend:** meerdere afhankelijke stappen, terugrekenen, combineren of plannen, maar nog steeds passend voor groep 6.
- De moeilijkheid komt uit de denkstappen, niet uit lange formuleringen of kunstmatig grote getallen.
- De Redactiesommen M6-werkbladen zijn de praktische referentie voor niveau en gevoel.
- SLO gebruiken we vooral om dekking en ontbrekende leerdoelen te controleren, niet om E5-overlap uit M6 te verbieden.

## 2. Supportcontract per vraag

Elke nieuwe vraag wordt als compleet onderwijsbundeltje authored:

1. **Vraag** — probleem + benodigde gegevens; geen oplossing.
2. **Minnie** — geeft richting/strategie; geen eindantwoord.
3. **Moose** — werkt een relevante tussenstap concreet uit, maar laat nog een betekenisvolle laatste stap over.
4. **Volledige uitleg** — volledige methode + eindantwoord.
5. **Visuals** — volgen dezelfde disclosure-grenzen als de tekst en mogen geen latere stap voortijdig weggeven.

Codex mag deze content later importeren, technisch valideren en renderen, maar niet zelfstandig herformuleren, aanvullen of nieuwe onderwijsinhoud verzinnen.


## 2A. Auditcorrecties verwerkt

De volledige set van 60 nieuwe vragen is na Batch 5 gezamenlijk beoordeeld. Deze versie verwerkt alleen de expliciet goedgekeurde correcties uit die audit:

- `M6-DP-012`: difficulty **D3 → D2**.
- `M6-NS-014`: blijft **D3** en wordt bewust als **stretch-D3** behouden.
- `M6-FR-014`: Moose-visual geeft het eindpunt niet langer impliciet prijs.
- Batch 1 heeft nu expliciete `Objective`, `Answer mode` en `Visual` metadata.
- `M6-DP-007` gebruikt expliciete multiple-choice antwoorden in plaats van vrije tekstinvoer.
- `M6-MO-011` t/m `M6-MO-014` gebruiken het bestaande Atlas M6-eurocontract: `answerMode: open`, canonical answer in centen en `answerSpec.type: euro`.
- `M6-ME-008` t/m `M6-ME-013` gebruiken één gedeelde, nieuwe `geometryDiagram`-capability in plaats van zes eenmalige visual-oplossingen.
- `M6-DP-009` gebruikt alleen `compactDataTable`; de berekenstappen worden stage-specifiek als notes in diezelfde visual opgenomen.

Geen andere educational core, vraag, Minnie-, Moose- of einduitlegtekst is in deze correctieronde gewijzigd.

## 3. Expansion roadmap

De uitbreiding gebeurt in kleine batches zodat difficulty, Minnie/Moose en visuals per batch inhoudelijk kunnen worden beoordeeld.

### Batch 1
**Meten & meetkunde + data/patronen**  
Reden: dit zijn momenteel twee van de dunste M6-domeinen.

### Batch 2
**Vermenigvuldigen/delen + getalbegrip**

### Batch 3
**Breuken/verhoudingen + overige ontbrekende M6-leerdoelen**

### Batch 4
**Gerichte aanvulling geld/tijd**

### Batch 5
**Laatste coverage/balans-batch: optellen/aftrekken + meten/data**

Geld en tijd worden dus bewust niet uitgesloten. Ze krijgen gerichte uitbreiding waar nieuwe leerdoelen of duidelijk andere vraagvormen waarde toevoegen, in plaats van alleen extra varianten van al goed vertegenwoordigde typen. Batch 5 sluit de eerste uitbreiding af en is bewust iets lichter gewogen naar D1/D2.

---

# Batch 1 — 12 nieuwe M6-vragen

**Status:** inhoudelijk geaudit en opgenomen in de approved 60-vragen expansion source  
**Domeinen:** measurementGeometry + dataPatterns  
**Verdeling:** 4× D1, 5× D2, 3× D3

## A. Meten & meetkunde

### Gedeelde visual capability voor M6-ME-008 t/m M6-ME-013

**Visual type:** `geometryDiagram`

Deze zes vragen gebruiken één herbruikbare geometrievisual. Codex mag hiervoor geen losse question-specific renderers bouwen.

Minimaal authored frame-contract:

```text
type: geometryDiagram
frame:
  shape: square | rectangle
  sideLabels:
    top?: string
    right?: string
    bottom?: string
    left?: string
  grid?:
    rows: integer
    columns: integer
  opening?:
    side: top | right | bottom | left
    label: string
  unknownSides?: [top | right | bottom | left, ...]
  highlightSides?: [top | right | bottom | left, ...]
  highlightRegion?: string
  notes?: [string, ...]
```

Regels:
- de vorm is schematisch en hoeft niet op fysieke schaal te zijn;
- vraag/Minnie/Moose/uitleg gebruiken dezelfde geometrie;
- alleen de voor de actieve hulpstap goedgekeurde labels/highlights zijn zichtbaar;
- een opening in een omtrek wordt als echte onderbreking van de rand getekend;
- grid wordt alleen gebruikt waar de vakjes/rijen didactisch relevant zijn;
- geen eindantwoord vóór de volledige uitleg;
- geen decoratieve 3D/perspectiefweergave.

### M6-ME-008 — D1 Instap — Omtrek vierkant

**Objective:** `perimeter_square_from_side`  
**Answer mode:** open  
**Visual:** `geometryDiagram`

**Vraag**  
Een vierkant speelveld heeft zijden van **6 meter**. Hoeveel meter hek is nodig om helemaal rondom het veld te staan?

**Antwoord:** `24` meter

**Minnie**  
Omtrek betekent dat je **alle zijden rondom** bij elkaar optelt.

**Moose**  
Een vierkant heeft vier even lange zijden. Reken dus **6 + 6 + 6 + 6**.

**Volledige uitleg**  
Het veld heeft vier zijden van 6 meter.  
`6 + 6 + 6 + 6 = 24`  
Er is **24 meter hek** nodig.

**Visual**
- Vraag: vierkant met `6 m` bij één zijde.
- Minnie: alle vier buitenzijden accentueren.
- Moose: alle vier zijden label `6 m`, geen totaal.
- Uitleg: `4 × 6 = 24 m`.

---

### M6-ME-009 — D1 Instap — Oppervlakte als vakjes

**Objective:** `rectangular_array_tile_count`  
**Answer mode:** open  
**Visual:** `geometryDiagram`

**Vraag**  
Een rechthoekige vloer bestaat uit **4 rijen van 5 gelijke tegels**. Hoeveel tegels liggen er in totaal?

**Antwoord:** `20` tegels

**Minnie**  
Je hoeft de tegels niet één voor één te tellen. Kijk naar het aantal **rijen** en het aantal tegels **per rij**.

**Moose**  
Er zijn 4 rijen met steeds 5 tegels. Gebruik **4 × 5**.

**Volledige uitleg**  
Elke rij heeft 5 tegels en er zijn 4 rijen.  
`4 × 5 = 20`  
Er liggen **20 tegels**.

**Visual**
- Vraag: raster 4 × 5 zonder nummers in de vakjes.
- Minnie: één rij markeren.
- Moose: label `4 rijen × 5`.
- Uitleg: alle 20 vakjes + `4 × 5 = 20`.

---

### M6-ME-010 — D2 Normaal — Omtrek rechthoek

**Objective:** `perimeter_rectangle`  
**Answer mode:** open  
**Visual:** `geometryDiagram`

**Vraag**  
Een rechthoekige tuin is **12 meter lang** en **7 meter breed**. Hoeveel meter hek is nodig om de hele tuin?

**Antwoord:** `38` meter

**Minnie**  
Een rechthoek heeft twee lange zijden en twee korte zijden.

**Moose**  
De lange zijden samen zijn **12 + 12 = 24 meter**.  
De korte zijden samen zijn **7 + 7 = 14 meter**.  
Tel die twee stukken nu bij elkaar op.

**Volledige uitleg**  
Twee lange zijden: `12 + 12 = 24`.  
Twee korte zijden: `7 + 7 = 14`.  
`24 + 14 = 38`.  
Er is **38 meter hek** nodig.

**Visual**
- Rechthoek met zijden `12 m` en `7 m`.
- Moose toont `24 m` bij lange-zijdenpaar en `14 m` bij korte-zijdenpaar.
- Pas uitleg toont `38 m`.

---

### M6-ME-011 — D2 Normaal — Oppervlakte rechthoek

**Objective:** `area_rectangle_length_width`  
**Answer mode:** open  
**Visual:** `geometryDiagram`

**Vraag**  
Een rechthoekige ruimte is **12 meter lang** en **7 meter breed**. Hoe groot is de vloer?

**Antwoord:** `84` m²

**Minnie**  
Bij oppervlakte kijk je hoeveel vierkante meters er in **rijen en kolommen** passen.

**Moose**  
Reken **12 × 7**. Je kunt 12 splitsen in **10 + 2**.

**Volledige uitleg**  
`10 × 7 = 70`  
`2 × 7 = 14`  
`70 + 14 = 84`  
De vloer is **84 m²** groot.

**Visual**
- Rechthoek `12 m × 7 m`.
- Minnie: lichte rasterstructuur.
- Moose: lengte visueel splitsen in `10 m + 2 m`.
- Uitleg: `70 m² + 14 m² = 84 m²`.

---

### M6-ME-012 — D3 Uitdagend — Omtrek met opening

**Objective:** `perimeter_rectangle_with_opening`  
**Answer mode:** open  
**Visual:** `geometryDiagram`

**Vraag**  
Een rechthoekig dierenverblijf is **14 meter lang** en **9 meter breed**. Rondom komt een hek, maar bij de ingang blijft een opening van **2 meter** zonder hek.

Hoeveel meter hek is nodig?

**Antwoord:** `44` meter

**Minnie**  
Bereken eerst hoeveel meter hek nodig zou zijn als er **geen opening** was.

**Moose**  
De twee lange zijden zijn samen **28 meter** en de twee korte zijden samen **18 meter**. Bereken eerst de volledige omtrek en haal daarna de opening van 2 meter eraf.

**Volledige uitleg**  
Lange zijden: `14 + 14 = 28`.  
Korte zijden: `9 + 9 = 18`.  
Hele omtrek: `28 + 18 = 46`.  
Bij de ingang ontbreekt 2 meter hek: `46 − 2 = 44`.  
Er is **44 meter hek** nodig.

**Visual**
- Rechthoek met een duidelijk gat van `2 m`.
- Moose toont `28 m` en `18 m`, maar geen omtrektotaal.
- Uitleg toont `46 − 2 = 44`.

---

### M6-ME-013 — D3 Uitdagend — Ontbrekende zijde

**Objective:** `find_missing_side_from_perimeter`  
**Answer mode:** open  
**Visual:** `geometryDiagram`

**Vraag**  
Een rechthoekig veld heeft een omtrek van **50 meter**. De twee lange zijden zijn ieder **16 meter**.

Hoe lang is **één korte zijde**?

**Antwoord:** `9` meter

**Minnie**  
Van de 50 meter omtrek wordt een deel al gebruikt door de twee lange zijden.

**Moose**  
De lange zijden samen zijn `2 × 16 = 32 meter`.  
`50 − 32 = 18 meter` blijft over voor **de twee korte zijden samen**. Hoeveel is dan één korte zijde?

**Volledige uitleg**  
De twee lange zijden zijn samen `16 + 16 = 32 meter`.  
Voor de korte zijden blijft `50 − 32 = 18 meter` over.  
Die 18 meter wordt verdeeld over twee gelijke zijden: `18 : 2 = 9`.  
Eén korte zijde is **9 meter**.

**Visual**
- Rechthoek; lange zijden `16 m`, korte zijden `?`.
- Moose: `50 − 32 = 18` bij beide korte zijden samen.
- Uitleg: beide korte zijden `9 m`.

---

## B. Data, tabellen & patronen

### M6-DP-007 — D1 Instap — Kleinste waarde uit tabel

**Objective:** `find_minimum_table_value`  
**Answer mode:** multipleChoice  
**Visual:** `compactDataTable`

| Route | Markeringen |
|---|---:|
| A | 145 |
| B | 160 |
| C | 138 |
| D | 152 |

**Vraag**  
Welke route heeft het **kleinste aantal markeringen**?

**Antwoordopties**
- Route A
- Route B
- Route C **(correct)**
- Route D

**Correct antwoord:** `Route C`

**Minnie**  
Je zoekt niet het grootste getal, maar juist het **kleinste getal** in de tabel.

**Moose**  
160 en 152 zijn groter. Vergelijk nu **145 en 138**.

**Volledige uitleg**  
De aantallen zijn 145, 160, 138 en 152.  
Het kleinste daarvan is **138**.  
Dat hoort bij **Route C**.

**Visual**
- Bestaande `compactDataTable`.
- Pas in de uitleg rij C markeren.

---

### M6-DP-008 — D1 Instap — Getallenreeks

**Objective:** `number_sequence_plus_hundred`  
**Answer mode:** open  
**Visual:** `numberLine`

**Vraag**  
Welk getal ontbreekt?

`2.450 → 2.550 → 2.650 → ? → 2.850`

**Antwoord:** `2.750`

**Minnie**  
Kijk hoeveel er van 2.450 naar 2.550 bijkomt.

**Moose**  
Er komt steeds **100** bij. Tel dus 100 op bij **2.650**.

**Volledige uitleg**  
Elke stap is `+100`.  
`2.650 + 100 = 2.750`.  
Het ontbrekende getal is **2.750**.

**Visual**
- Number line met stappen `+100`.
- Antwoord pas in uitleg ingevuld.

---

### M6-DP-009 — D2 Normaal — Waarden uit tabel optellen

**Objective:** `sum_table_values`  
**Answer mode:** open  
**Visual:** `compactDataTable`

| Moment | Bezoekers |
|---|---:|
| Ochtend | 125 |
| Middag | 148 |

**Vraag**  
Hoeveel bezoekers waren er in totaal?

**Antwoord:** `273`

**Minnie**  
Voor het totaal heb je **beide getallen uit de tabel** nodig.

**Moose**  
Splits 148 in 100 en 48.  
`125 + 100 = 225`.  
Tel nu de resterende 48 erbij.

**Volledige uitleg**  
`125 + 100 = 225`  
`225 + 48 = 273`  
Er waren in totaal **273 bezoekers**.

**Visual**
- Gebruik uitsluitend `compactDataTable`.
- Vraag: toon de tabel ongewijzigd.
- Minnie: highlight beide rijen.
- Moose: behoud de tabel en voeg als notes toe: `125 + 100 = 225` en `225 + 48 = ?`.
- Uitleg: note `125 + 148 = 273`; geen tweede visualtype nodig.

---

### M6-DP-010 — D2 Normaal — Afwisselend patroon

**Objective:** `sequence_alternating_steps`  
**Answer mode:** open  
**Visual:** `numberLine`

**Vraag**  
Welk getal komt daarna?

`100 → 120 → 160 → 180 → 220 → ?`

**Antwoord:** `240`

**Minnie**  
De sprongen zijn niet steeds hetzelfde. Kijk naar de eerste vier sprongen.

**Moose**  
Het patroon wisselt tussen **+20 en +40**. Na `180 → 220` was de stap +40. Welke stap komt nu?

**Volledige uitleg**  
De stappen zijn:  
`+20, +40, +20, +40`.  
Daarna komt weer `+20`.  
`220 + 20 = 240`.  
Het volgende getal is **240**.

**Visual**
- Number line met de reeds bekende sprongen.
- `?` blijft tot uitleg.

---

### M6-DP-011 — D3 Uitdagend — Twee totalen vergelijken

**Objective:** `compare_two_table_totals`  
**Answer mode:** open  
**Visual:** `compactDataTable`

| Dag | Ochtend | Middag |
|---|---:|---:|
| A | 145 | 128 |
| B | 132 | 156 |

**Vraag**  
Hoeveel meer bezoekers waren er op **dag B** dan op **dag A**?

**Antwoord:** `15`

**Minnie**  
Bereken eerst voor beide dagen het **dagtotaal**.

**Moose**  
Dag A heeft `145 + 128 = 273` bezoekers.  
Dag B heeft `132 + 156 = 288` bezoekers.  
Bereken nu het verschil tussen die twee totalen.

**Volledige uitleg**  
Dag A: `145 + 128 = 273`.  
Dag B: `132 + 156 = 288`.  
`288 − 273 = 15`.  
Op dag B waren er **15 bezoekers meer**.

**Visual**
- Tabel.
- Moose voegt beide dagtotalen toe.
- Uitleg toont het verschil.

---

### M6-DP-012 — D2 Normaal — Twee regels afwisselen

**Objective:** `sequence_alternating_operations`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Welk getal komt daarna?

`5 → 10 → 13 → 26 → 29 → 58 → ?`

**Antwoord:** `61`

**Minnie**  
Er worden **twee verschillende rekenregels** om en om gebruikt.

**Moose**  
Kijk: `5 × 2 = 10`, daarna `10 + 3 = 13`.  
Dat herhaalt zich: `×2`, daarna `+3`.  
Van 29 naar 58 was `×2`. Welke stap komt nu?

**Volledige uitleg**  
Het patroon wisselt steeds af:  
`×2, +3, ×2, +3, ×2, +3`.  
Na 58 komt dus `58 + 3 = 61`.  
Het volgende getal is **61**.

**Visual**
- `calculationSteps` met de bewerkingen boven de pijlen.
- Uitkomst 61 pas in uitleg.

---

## 4. Reviewstatus batch 1

Nog te beoordelen vóór productie-import:

- voelt D1 voldoende veilig bij standaard 90/10 E5/M6;
- zijn D2-vragen representatief voor de Redactiesommen-M6-referentie;
- zijn D3-vragen uitdagend zonder richting E6 te schuiven;
- laten Moose-hints overal een echte laatste stap over;
- sluiten de voorgestelde visuals aan op bestaande Atlas-renderers/capabilities;
- geen onbedoelde answer leakage in vraag/Minnie/Moose of visuals;
- geen ongewenste overlap/duplicatie met de bestaande 99 M6-cores.

**Auditstatus:** opgenomen in deze gezamenlijk geaudite approved expansion source.

---

# Batch 2 — 12 nieuwe M6-vragen

**Status:** inhoudelijk geaudit en opgenomen in de approved 60-vragen expansion source  
**Domeinen:** multiplicationDivision + numberSense  
**Verdeling:** 4× D1, 4× D2, 4× D3

Deze batch vergroot de variatie zonder de moeilijkheid plotseling op te trekken. De D1-vragen gebruiken vriendelijke waarden en één duidelijke uitbreiding; D2 vraagt zelfstandiger strategiegebruik; D3 combineert stappen of vraagt om terugredeneren.

## A. Vermenigvuldigen & delen

### M6-MD-011 — D1 Instap — Vermenigvuldigen met 25

**Objective:** `multiply_by_25_friendly_structure`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
In elk doosje zitten **25 kaarten**. Er zijn **6 doosjes**. Hoeveel kaarten zijn dat samen?

**Antwoord:** `150` kaarten

**Minnie**  
Denk eerst aan een handig groepje: **4 × 25 = 100**.

**Moose**  
Vier doosjes zijn samen **100 kaarten**. Er blijven nog twee doosjes over: **2 × 25 = 50**. Tel nu 100 en 50 bij elkaar op.

**Volledige uitleg**  
Vier doosjes van 25 zijn samen `4 × 25 = 100` kaarten.  
De andere twee doosjes zijn `2 × 25 = 50` kaarten.  
`100 + 50 = 150`.  
Samen zijn het **150 kaarten**.

**Visual**
- Vraag: zes gelijke groepjes met `25` per groep; geen totaal.
- Minnie: eerste vier groepjes samen als `100` markeren.
- Moose: overige twee groepjes samen als `50` markeren en `100 + 50 = ?` tonen.
- Uitleg: `100 + 50 = 150`.

---

### M6-MD-012 — D1 Instap — Delen met tientallen

**Objective:** `divide_multiple_of_ten_by_one_digit`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
**240 kralen** worden eerlijk verdeeld over **6 bakjes**. Hoeveel kralen komen er in elk bakje?

**Antwoord:** `40` kralen

**Minnie**  
Denk aan **240 als 24 tientallen**. Verdeel eerst die tientallen over 6 bakjes.

**Moose**  
`24 : 6 = 4`, dus elk bakje krijgt **4 tientallen**. Welk gewoon getal is 4 tientallen?

**Volledige uitleg**  
240 is hetzelfde als **24 tientallen**.  
`24 : 6 = 4`, dus elk bakje krijgt 4 tientallen.  
4 tientallen zijn `4 × 10 = 40`.  
In elk bakje komen **40 kralen**.

**Visual**
- Vraag: `240 totaal → 6 gelijke bakjes → ? per bakje`.
- Minnie: `240 = 24 tientallen`.
- Moose: `24 tientallen : 6 = 4 tientallen`.
- Uitleg: `4 tientallen = 40`.

---

### M6-MD-013 — D2 Normaal — Splitsend vermenigvuldigen

**Objective:** `multiply_one_digit_two_digit_decompose`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Er staan **7 rekken**. Op elk rek passen **46 boeken**. Hoeveel boeken passen er in totaal op de rekken?

**Antwoord:** `322` boeken

**Minnie**  
Splits **46** in **40 en 6**. Reken de twee stukken apart uit.

**Moose**  
`7 × 40 = 280`. Bereken nu `7 × 6` en tel dat resultaat bij 280 op.

**Volledige uitleg**  
We splitsen 46 in 40 en 6.  
`7 × 40 = 280`  
`7 × 6 = 42`  
`280 + 42 = 322`  
Op de rekken passen samen **322 boeken**.

**Visual**
- Vraag: `7 × 46 = ?`.
- Minnie: `46 = 40 + 6`.
- Moose: `7 × 40 = 280`, `7 × 6 = ?`, daarna `280 + ?`.
- Uitleg: beide deelproducten en `280 + 42 = 322`.

---

### M6-MD-014 — D2 Normaal — Delen door slim te splitsen

**Objective:** `divide_three_digit_decompose`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
**252 onderdelen** worden eerlijk verdeeld over **6 teams**. Hoeveel onderdelen krijgt elk team?

**Antwoord:** `42` onderdelen

**Minnie**  
Splits 252 in twee stukken die allebei makkelijk door 6 te delen zijn: **240 en 12**.

**Moose**  
`240 : 6 = 40`. Er blijven nog 12 onderdelen om te verdelen. Deel ook 12 door 6 en tel dat bij 40 op.

**Volledige uitleg**  
We splitsen 252 in 240 en 12.  
`240 : 6 = 40`  
`12 : 6 = 2`  
`40 + 2 = 42`  
Elk team krijgt **42 onderdelen**.

**Visual**
- Vraag: `252 : 6 = ?`.
- Minnie: `252 = 240 + 12`.
- Moose: `240 : 6 = 40` en `12 : 6 = ?`.
- Uitleg: `40 + 2 = 42`.

---

### M6-MD-015 — D3 Uitdagend — Vermenigvuldigen en daarna aftrekken

**Objective:** `multiply_then_subtract_context`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Er zijn **6 dozen** met elk **24 onderdelen**. Daarna worden **38 onderdelen gebruikt**. Hoeveel onderdelen blijven er over?

**Antwoord:** `106` onderdelen

**Minnie**  
Bereken eerst hoeveel onderdelen er **in totaal** in de 6 dozen zitten.

**Moose**  
`6 × 24 = 144`. Daar moeten 38 onderdelen vanaf. Trek eerst 30 af: `144 − 30 = 114`. Trek daarna nog 8 af.

**Volledige uitleg**  
Eerst berekenen we het totaal:  
`6 × 24 = 144` onderdelen.  
Daar worden 38 onderdelen van gebruikt.  
`144 − 30 = 114`  
`114 − 8 = 106`  
Er blijven **106 onderdelen** over.

**Visual**
- Vraag: `6 × 24`, daarna `−38`, zonder uitkomsten.
- Minnie: eerste stap `6 × 24 = ?` benadrukken.
- Moose: `6 × 24 = 144`, `144 − 30 = 114`, `114 − 8 = ?`.
- Uitleg: volledige keten eindigend op `106`.

---

### M6-MD-016 — D3 Uitdagend — Eerst per groep, daarna resterende groepen

**Objective:** `equal_groups_remove_groups`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
In **8 bakken** liggen samen **56 onderdelen**, evenveel in elke bak. Drie bakken worden weggehaald. Hoeveel onderdelen blijven er over?

**Antwoord:** `35` onderdelen

**Minnie**  
Zoek eerst hoeveel onderdelen er in **één bak** liggen.

**Moose**  
`56 : 8 = 7` onderdelen per bak. Van de 8 bakken blijven er **5** over. Bereken nu hoeveel onderdelen in die 5 bakken zitten.

**Volledige uitleg**  
Eerst bepalen we hoeveel er in één bak zit:  
`56 : 8 = 7`.  
Er worden 3 van de 8 bakken weggehaald, dus er blijven `8 − 3 = 5` bakken over.  
`5 × 7 = 35`.  
Er blijven **35 onderdelen** over.

**Visual**
- Vraag: 8 gelijke bakken, `56 samen`, 3 bakken gemarkeerd als weggehaald.
- Minnie: `56 : 8 = ? per bak`.
- Moose: `56 : 8 = 7`, `8 − 3 = 5`, `5 × 7 = ?`.
- Uitleg: `5 × 7 = 35`.

---

## B. Getalbegrip

### M6-NS-009 — D1 Instap — Twee grotere getallen vergelijken

**Objective:** `compare_close_five_digit_numbers`  
**Answer mode:** open  
**Visual:** geen

**Vraag**  
Welk getal is het grootst: **24.680** of **24.608**?

**Antwoord:** `24.680`

**Minnie**  
Vergelijk de cijfers van links naar rechts. Zolang de cijfers gelijk zijn, ga je één plaats verder.

**Moose**  
Bij beide getallen zijn de tienduizendtallen, duizendtallen en honderdtallen gelijk. Kijk nu naar de tientallen: het ene getal heeft **8 tientallen**, het andere **0 tientallen**. Welk getal is dan groter?

**Volledige uitleg**  
We vergelijken van links naar rechts.  
Beide getallen beginnen met 24 duizend en hebben daarna 6 honderdtallen.  
Bij de tientallen verschillen ze: 24.680 heeft **8 tientallen** en 24.608 heeft **0 tientallen**.  
Daarom is **24.680** het grootste getal.

**Visual**
- Geen apart visual nodig; de plaatswaarderedenering staat volledig in de tekst.

---

### M6-NS-010 — D1 Instap — Duizend meer

**Objective:** `add_thousand_place_value`  
**Answer mode:** open  
**Visual:** `numberLine`

**Vraag**  
Welk getal is **1.000 meer dan 7.650**?

**Antwoord:** `8.650`

**Minnie**  
Als je 1.000 erbij doet, verandert vooral het aantal **duizendtallen**.

**Moose**  
7 duizendtallen worden 8 duizendtallen. De **650** blijft hetzelfde. Zet die delen nu weer samen tot één getal.

**Volledige uitleg**  
`7.650 = 7.000 + 650`.  
We tellen 1.000 bij de duizenden op: `7.000 + 1.000 = 8.000`.  
De 650 blijft staan.  
`8.000 + 650 = 8.650`.  
Het antwoord is **8.650**.

**Visual**
- Vraag: number line vanaf `7.650` met een sprong `+1.000` naar `?`.
- Minnie: de sprong van duizend benadrukken.
- Moose: `7.000 + 1.000 = 8.000` en `+650`, maar nog geen eindgetal.
- Uitleg: eindpunt `8.650` tonen.

---

### M6-NS-011 — D2 Normaal — Vijf-cijferige getallen ordenen

**Objective:** `order_five_digit_numbers`  
**Answer mode:** multipleChoice  
**Visual:** geen

**Vraag**  
Welke volgorde zet deze getallen van **klein naar groot**?

`31.450   30.950   31.405   31.540`

**Antwoordopties**
- `30.950 → 31.405 → 31.450 → 31.540` **(correct)**
- `30.950 → 31.450 → 31.405 → 31.540`
- `31.405 → 30.950 → 31.450 → 31.540`
- `30.950 → 31.405 → 31.540 → 31.450`

**Correct antwoord:** `30.950 → 31.405 → 31.450 → 31.540`

**Minnie**  
Kijk eerst naar de duizendtallen. Eén getal begint met **30 duizend** en de andere drie met **31 duizend**.

**Moose**  
**30.950** is dus het kleinst. Vergelijk daarna bij 31.405, 31.450 en 31.540 de cijfers van links naar rechts om de laatste drie op volgorde te zetten.

**Volledige uitleg**  
30.950 is kleiner dan alle getallen die met 31 duizend beginnen.  
Daarna vergelijken we 31.405, 31.450 en 31.540.  
31.405 is kleiner dan 31.450, en 31.450 is kleiner dan 31.540.  
De juiste volgorde is:  
**30.950 → 31.405 → 31.450 → 31.540**.

**Visual**
- Geen apart visual nodig; de vier waarden en antwoordopties zijn voldoende.

---

### M6-NS-012 — D2 Normaal — Waardeverandering van één cijfer

**Objective:** `place_value_change_difference`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Het getal **36.482** verandert in **39.482**. Hoeveel groter is het nieuwe getal?

**Antwoord:** `3.000`

**Minnie**  
Kijk welk cijfer is veranderd en welke **plaatswaarde** dat cijfer heeft.

**Moose**  
De 6 bij de duizendtallen wordt een 9. Dat zijn **3 duizendtallen meer**. Reken uit hoeveel 3 duizendtallen samen zijn.

**Volledige uitleg**  
Alle cijfers blijven hetzelfde, behalve het cijfer bij de duizendtallen.  
Dat verandert van 6 duizendtallen naar 9 duizendtallen.  
Het verschil is `9 − 6 = 3` duizendtallen.  
`3 × 1.000 = 3.000`.  
Het nieuwe getal is **3.000 groter**.

**Visual**
- Vraag: `36.482 → 39.482`, met de veranderde cijfers subtiel benadrukt.
- Minnie: label `duizendtallen` bij 6 en 9.
- Moose: `9 − 6 = 3 duizendtallen`, `3 × 1.000 = ?`.
- Uitleg: `3 × 1.000 = 3.000`.

---

### M6-NS-013 — D3 Uitdagend — Grootste getal onder een grens

**Objective:** `construct_largest_below_limit`  
**Answer mode:** multipleChoice  
**Visual:** geen

**Vraag**  
Gebruik de cijfers **4, 8, 1, 9 en 6** elk precies één keer. Welk is het **grootste getal dat kleiner is dan 50.000**?

**Antwoordopties**
- `49.861` **(correct)**
- `49.816`
- `48.961`
- `46.981`

**Correct antwoord:** `49.861`

**Minnie**  
Kijk eerst naar het eerste cijfer. Het getal moet onder 50.000 blijven, maar je wilt het wel zo groot mogelijk maken.

**Moose**  
Een eerste cijfer van 6, 8 of 9 maakt het getal groter dan 50.000. Daarom moet **4** vooraan staan. Maak daarna de overige plaatsen zo groot mogelijk met de cijfers die nog over zijn.

**Volledige uitleg**  
Om onder 50.000 te blijven kan 6, 8 of 9 niet vooraan staan.  
Van de overgebleven mogelijkheden is 4 het grootste eerste cijfer, dus het getal begint met **4**.  
Daarna zetten we de overgebleven cijfers van groot naar klein: **9, 8, 6, 1**.  
Zo krijgen we **49.861**.  
Dat is het grootste mogelijke getal onder 50.000.

**Visual**
- Geen apart visual nodig; de cijferkeuze en grens staan in de vraag.

---

### M6-NS-014 — D3 Uitdagend — Terugredeneren bij afronden

**Objective:** `reverse_rounding_interval_thousand`  
**Answer mode:** multipleChoice  
**Visual:** `numberLine`

**Auditnotitie:** bewust behouden als **stretch-D3**. Deze vraag is abstracter dan de meeste M6-opgaven, maar blijft binnen D3 omdat de leerling vanuit een afrondingsdoel het volledige geldige interval moet terugredeneren.

**Vraag**  
Welke reeks bevat **alle hele getallen** die bij afronden op het dichtstbijzijnde duizendtal **8.000** worden?

**Antwoordopties**
- `7.500 t/m 8.499` **(correct)**
- `7.499 t/m 8.500`
- `8.000 t/m 8.999`
- `7.000 t/m 7.999`

**Correct antwoord:** `7.500 t/m 8.499`

**Minnie**  
Zoek eerst de grens waarop getallen van 7.000 naar **8.000** gaan afronden. Zoek daarna de grens waarop ze naar **9.000** gaan afronden.

**Moose**  
**7.500** is het eerste hele getal dat naar 8.000 afrondt. **8.500** rondt al naar 9.000 af. Welk hele getal vlak vóór 8.500 is dus het laatste dat nog naar 8.000 afrondt?

**Volledige uitleg**  
Bij afronden op duizendtallen ligt de eerste grens precies halverwege 7.000 en 8.000: **7.500**.  
Vanaf 7.500 rond je dus naar 8.000.  
De volgende grens ligt bij **8.500**. Vanaf 8.500 rond je naar 9.000.  
Het laatste hele getal vóór 8.500 is **8.499**.  
Daarom is de volledige reeks **7.500 t/m 8.499**.

**Visual**
- Vraag: number line van `7.000` tot `9.000` met 8.000 als centraal referentiepunt.
- Minnie: middenpunten `7.500` en `8.500` zichtbaar maken, zonder het juiste antwoordbereik te kleuren.
- Moose: `7.500` markeren als eerste grens en `8.500` als volgende grens; interval nog niet als antwoord labelen.
- Uitleg: gebied `7.500 t/m 8.499` als antwoordbereik markeren.

---

## 5. Reviewstatus batch 2

Nog te beoordelen vóór productie-import:

- voelt `M6-MD-011`/`012` en `M6-NS-009`/`010` veilig genoeg voor de D1-pool bij standaard 90/10;
- zijn `M6-MD-013`/`014` en `M6-NS-011`/`012` representatief voor normaal M6-werkbladniveau;
- blijven `M6-MD-015`/`016` en `M6-NS-013`/`014` binnen M6 ondanks de extra redeneerstappen;
- laat Moose bij iedere vraag nog een echte laatste stap over;
- lekken visuals geen eindantwoord vóór de uitleg;
- zijn de nieuwe educational cores voldoende verschillend van de bestaande M6-MD-001..010 en M6-NS-001..008;
- passen de voorgestelde visuals binnen bestaande Atlas-capabilities zonder nieuwe rendererfunctionaliteit te vereisen.

**Auditstatus:** opgenomen in deze gezamenlijk geaudite approved expansion source.


---

# Batch 3 — 12 nieuwe M6-vragen

**Status:** inhoudelijk geaudit en opgenomen in de approved 60-vragen expansion source  
**Domein:** fractionsRatios  
**Verdeling:** 4× D1, 4× D2, 4× D3

Deze batch verdiept breuken en verhoudingen zonder de moeilijkheid plotseling op te trekken. De nadruk ligt op ontbrekende leerdoelen binnen het bestaande domein: gelijkwaardige breuken, breuken vergelijken, breuken op een getallenlijn, deel-deelverhoudingen en terugredeneren. Brede nieuwe onderwerpen zoals procenten of formele decimaalrekening worden in deze batch bewust nog niet toegevoegd; die kunnen later pas na een afzonderlijke niveaucheck worden overwogen.

## A. D1 — Instap

### M6-FR-011 — D1 Instap — Gelijkwaardige breuk herkennen

**Objective:** `equivalent_fraction_half_to_quarters`  
**Answer mode:** multipleChoice  
**Visual:** `fractionStrip`

**Vraag**  
Welke breuk is even groot als **1/2**?

**Antwoordopties**
- `2/4` **(correct)**
- `1/4`
- `3/4`
- `2/3`

**Correct antwoord:** `2/4`

**Minnie**  
Denk aan één geheel dat eerst in **2 gelijke delen** is verdeeld. Stel je daarna voor dat elk van die delen nog eens in tweeën wordt gesplitst.

**Moose**  
Door elk half deel in twee gelijke stukken te verdelen krijg je **4 gelijke delen** in totaal. De teller moet met dezelfde factor veranderen als de noemer. Wat gebeurt er dan met de 1?

**Volledige uitleg**  
Bij `1/2` is één van de twee gelijke delen gekozen.  
Als we elk half deel nog eens in tweeën splitsen, krijgen we vier gelijke delen.  
Het gekozen halve deel bestaat dan uit **2 van die 4 delen**.  
Daarom geldt: **1/2 = 2/4**.

**Visual**
- Vraag: één breukenstrook met `1/2` gemarkeerd; antwoordopties staan apart.
- Minnie: laat zien dat beide helften elk in twee kleinere stukken kunnen worden verdeeld, zonder het gekozen aantal kwartdelen te labelen.
- Moose: toon vier gelijke vakken en de oorspronkelijke helftgrens; geen `2/4`-label.
- Uitleg: markeer twee van de vier vakken en toon `1/2 = 2/4`.

---

### M6-FR-012 — D1 Instap — Breuken met dezelfde noemer vergelijken

**Objective:** `compare_fractions_same_denominator`  
**Answer mode:** multipleChoice  
**Visual:** `fractionStrip`

**Vraag**  
Welke breuk is groter: **3/8** of **5/8**?

**Antwoordopties**
- `3/8`
- `5/8` **(correct)**
- Ze zijn even groot

**Correct antwoord:** `5/8`

**Minnie**  
Beide breuken zijn verdeeld in **achtsten**. De stukken zijn dus even groot. Kijk daarom naar hoeveel stukken er gekozen zijn.

**Moose**  
Je vergelijkt nu alleen de tellers: **3** en **5**. Welke breuk gebruikt meer van dezelfde achtste delen?

**Volledige uitleg**  
Bij beide breuken is het geheel in 8 gelijke delen verdeeld.  
`3/8` gebruikt 3 van die delen.  
`5/8` gebruikt 5 van die delen.  
Omdat 5 delen meer zijn dan 3 delen, is **5/8 groter dan 3/8**.

**Visual**
- Vraag: twee even lange stroken, beide verdeeld in 8 delen; bij de ene 3, bij de andere 5 delen gemarkeerd.
- Minnie/Moose: benadruk dat de vakken even groot zijn; geen winnaarlabel.
- Uitleg: markeer `5/8` als grootste.

---

### M6-FR-013 — D1 Instap — Deel-deelverhouding verdubbelen

**Objective:** `part_to_part_ratio_double`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Bij elke **2 rode vlaggen** horen **3 blauwe vlaggen**. Er zijn **4 rode vlaggen**. Hoeveel blauwe vlaggen horen daarbij?

**Antwoord:** `6` blauwe vlaggen

**Minnie**  
Kijk hoe vaak 2 rode vlaggen in 4 rode vlaggen passen.

**Moose**  
Van 2 rode vlaggen naar 4 rode vlaggen is **keer 2**. De blauwe vlaggen moeten met dezelfde factor meegaan. Reken nu `3 × 2`.

**Volledige uitleg**  
De verhouding is 2 rode vlaggen bij 3 blauwe vlaggen.  
4 rode vlaggen is twee keer zoveel als 2.  
Daarom moet het aantal blauwe vlaggen ook twee keer zo groot worden: `3 × 2 = 6`.  
Er horen **6 blauwe vlaggen** bij.

**Visual**
- Vraag: verhouding `2 rood → 3 blauw` en `4 rood → ? blauw`.
- Minnie: toon `2 → 4` met factor `×2`.
- Moose: toon dezelfde `×2` bij blauw, met `3 × 2 = ?`.
- Uitleg: vul `6` in.

---

### M6-FR-014 — D1 Instap — Breuk op een getallenlijn

**Objective:** `locate_fraction_on_unit_number_line`  
**Answer mode:** multipleChoice  
**Visual:** `numberLine`

**Vraag**  
Een getallenlijn van **0 tot 1** is verdeeld in **4 gelijke stukken**. Welk punt hoort bij **3/4**?

**Antwoordopties**
- Eerste streepje na 0
- Tweede streepje na 0
- Derde streepje na 0 **(correct)**
- Punt 1

**Correct antwoord:** Derde streepje na 0

**Minnie**  
De noemer 4 betekent dat de afstand van 0 tot 1 in **4 gelijke stappen** is verdeeld.

**Moose**  
De teller 3 vertelt hoeveel van die gelijke stappen je vanaf 0 moet nemen. Tel drie stappen, maar kies zelf bij welk punt je uitkomt.

**Volledige uitleg**  
Van 0 tot 1 zijn vier gelijke stappen.  
`3/4` betekent dat je vanaf 0 **drie van die vier stappen** neemt.  
Je komt dan uit bij het **derde streepje na 0**.  
Dat punt stelt **3/4** voor.

**Visual**
- Vraag: number line `0 — | — | — | — 1` met de drie tussenpunten A/B/C of neutrale markeringen.
- Minnie: vier gelijke intervallen benadrukken.
- Moose: benadruk de vier gelijke intervallen en toon alleen de instructie/annotatie `3 stappen vanaf 0`; teken **niet** de volledige drie-sprongenroute tot het derde tussenpunt en markeer geen eindpunt.
- Uitleg: derde tussenpunt labelen als `3/4`.

---

## B. D2 — Normaal

### M6-FR-015 — D2 Normaal — Gelijkwaardige breuk aanvullen

**Objective:** `equivalent_fraction_scale_denominator`  
**Answer mode:** multipleChoice  
**Visual:** `fractionStrip`

**Vraag**  
Welke teller hoort op de lege plek?

**3/5 = ?/10**

**Antwoordopties**
- `5`
- `6` **(correct)**
- `8`
- `10`

**Correct antwoord:** `6`

**Minnie**  
Kijk eerst wat er met de noemer gebeurt: van **5 naar 10**.

**Moose**  
De noemer is met **2 vermenigvuldigd**. Om de breuk even groot te houden moet je de teller met dezelfde factor vermenigvuldigen. Reken `3 × 2`.

**Volledige uitleg**  
Van 5 naar 10 is `×2`.  
Bij gelijkwaardige breuken veranderen teller en noemer met dezelfde factor.  
Daarom rekenen we `3 × 2 = 6`.  
Dus **3/5 = 6/10**.

**Visual**
- Vraag: strook met 5 gelijke delen waarvan 3 gemarkeerd; daarnaast een strook met 10 lege deelmarkeringen.
- Minnie: laat de verdubbeling van 5 naar 10 zien.
- Moose: toon `3 × 2 = ?`, maar kleur nog niet de volledige tweede strook in.
- Uitleg: kleur 6 van 10 delen en toon `3/5 = 6/10`.

---

### M6-FR-016 — D2 Normaal — Breuken met verschillende noemers vergelijken

**Objective:** `compare_fractions_via_equivalent_denominator`  
**Answer mode:** multipleChoice  
**Visual:** `fractionStrip`

**Vraag**  
Welke breuk is groter: **3/4** of **5/8**?

**Antwoordopties**
- `3/4` **(correct)**
- `5/8`
- Ze zijn even groot

**Correct antwoord:** `3/4`

**Minnie**  
De noemers zijn verschillend. Maak de stukken eerst vergelijkbaar door **3/4** in achtsten te denken.

**Moose**  
Als je elk kwart in tweeën splitst, wordt `3/4` gelijk aan **6/8**. Vergelijk nu `6/8` met `5/8`.

**Volledige uitleg**  
We maken de noemers gelijk.  
`3/4 = 6/8`.  
Nu vergelijken we `6/8` en `5/8`.  
Zes achtsten is meer dan vijf achtsten.  
Dus **3/4 is groter dan 5/8**.

**Visual**
- Vraag: twee even lange stroken met `3/4` en `5/8`.
- Minnie: splits de kwartstrook visueel in achtsten.
- Moose: toon `3/4 = 6/8`, zonder winnaarlabel.
- Uitleg: markeer `6/8 > 5/8`.

---

### M6-FR-017 — D2 Normaal — Deel-deelverhouding opschalen

**Objective:** `part_to_part_ratio_scale_factor`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Voor elke **3 groene stenen** worden **2 blauwe stenen** gebruikt. Er zijn **9 groene stenen**. Hoeveel blauwe stenen zijn nodig?

**Antwoord:** `6` blauwe stenen

**Minnie**  
Zoek eerst met welke factor je van 3 groene stenen naar 9 groene stenen gaat.

**Moose**  
`3 × 3 = 9`. De groene hoeveelheid is dus **keer 3** gegaan. Gebruik dezelfde factor bij de 2 blauwe stenen.

**Volledige uitleg**  
De verhouding is 3 groen bij 2 blauw.  
Van 3 naar 9 is `×3`.  
Daarom doen we bij blauw hetzelfde: `2 × 3 = 6`.  
Er zijn **6 blauwe stenen** nodig.

**Visual**
- Vraag: `3 groen → 2 blauw`, `9 groen → ? blauw`.
- Minnie: toon factor `×3` aan de groene kant.
- Moose: zet dezelfde factor aan de blauwe kant met `2 × 3 = ?`.
- Uitleg: toon `6 blauw`.

---

### M6-FR-018 — D2 Normaal — Vijf zesde van een hoeveelheid

**Objective:** `fraction_of_quantity_five_sixths`  
**Answer mode:** open  
**Visual:** `fractionStrip`

**Vraag**  
Er zijn **42 kaarten**. **5/6** daarvan wordt gebruikt. Hoeveel kaarten zijn dat?

**Antwoord:** `35` kaarten

**Minnie**  
Zoek eerst hoeveel **1/6 van 42** is.

**Moose**  
`42 : 6 = 7`. Eén zesde is dus 7 kaarten. Je hebt **5 van zulke delen** nodig. Reken `5 × 7`.

**Volledige uitleg**  
Eerst berekenen we één zesde: `42 : 6 = 7`.  
Vijf zesde bestaat uit vijf van zulke delen.  
`5 × 7 = 35`.  
Dus **5/6 van 42 is 35 kaarten**.

**Visual**
- Vraag: strook in 6 gelijke delen met `42 kaarten samen`; 5 delen gemarkeerd.
- Minnie: focus op één van de zes delen, `42 : 6 = ?`.
- Moose: label één deel `7` en toon `5 × 7 = ?`.
- Uitleg: label de vijf gekozen delen samen als `35`.

---

## C. D3 — Uitdagend

### M6-FR-019 — D3 Uitdagend — Drie breuken vergelijken

**Objective:** `compare_three_fractions_with_visual_reasoning`  
**Answer mode:** multipleChoice  
**Visual:** `fractionStrip`

**Vraag**  
Welke breuk is het grootst?

**2/3   ·   3/4   ·   3/6**

**Antwoordopties**
- `2/3`
- `3/4` **(correct)**
- `3/6`

**Correct antwoord:** `3/4`

**Minnie**  
Begin met een makkelijke vergelijking: **3/6 is precies de helft**. De andere twee zijn groter dan een helft.

**Moose**  
Vergelijk nu alleen `2/3` en `3/4`. Denk aan even grote stroken: bij `2/3` blijft één derde over, bij `3/4` blijft één kwart over. Welke breuk laat het kleinste stuk over?

**Volledige uitleg**  
`3/6` is gelijk aan `1/2`, dus die is niet het grootst.  
Bij `2/3` ontbreekt nog `1/3` tot een heel.  
Bij `3/4` ontbreekt nog maar `1/4` tot een heel.  
Een kwart is kleiner dan een derde, dus `3/4` ligt dichter bij 1.  
Daarom is **3/4 de grootste breuk**.

**Visual**
- Vraag: drie even lange fraction strips voor `2/3`, `3/4` en `3/6`.
- Minnie: markeer `3/6 = 1/2` zonder winnaarlabel.
- Moose: benadruk alleen de resterende stukken `1/3` en `1/4` bij de twee kandidaten.
- Uitleg: markeer `3/4` als grootste.

---

### M6-FR-020 — D3 Uitdagend — Geheel terugvinden uit drie achtste

**Objective:** `find_whole_from_nonunit_fraction_three_eighths`  
**Answer mode:** open  
**Visual:** `fractionStrip`

**Vraag**  
**24 onderdelen** zijn **3/8 van het geheel**. Hoeveel onderdelen zijn er in totaal?

**Antwoord:** `64` onderdelen

**Minnie**  
De 24 onderdelen horen bij **3 gelijke delen**. Zoek eerst hoeveel **1/8** is.

**Moose**  
`24 : 3 = 8`. Eén achtste is dus 8 onderdelen. Het hele aantal bestaat uit **8 van zulke delen**. Reken nu `8 × 8`.

**Volledige uitleg**  
24 onderdelen zijn drie achtsten.  
Eerst zoeken we één achtste: `24 : 3 = 8`.  
Het geheel bestaat uit acht achtsten.  
`8 × 8 = 64`.  
Er zijn in totaal **64 onderdelen**.

**Visual**
- Vraag: strook met 8 delen; eerste 3 delen samen gelabeld `24`, totaal onbekend.
- Minnie: focus op de drie bekende delen.
- Moose: label één deel `8`, overige delen nog zonder totaal.
- Uitleg: alle 8 delen labelen en totaal `64` tonen.

---

### M6-FR-021 — D3 Uitdagend — Verhouding via één eenheid opschalen

**Objective:** `ratio_scale_via_unit_larger_target`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
**6 dozen** bevatten samen **270 kaarten**. In elke doos zitten evenveel kaarten. Hoeveel kaarten zitten er samen in **10 dozen**?

**Antwoord:** `450` kaarten

**Minnie**  
Van 6 dozen naar 10 dozen kun je niet met één eenvoudige verdubbeling. Zoek eerst hoeveel kaarten er in **1 doos** zitten.

**Moose**  
`270 : 6 = 45` kaarten per doos. Voor 10 dozen moet je nu `10 × 45` berekenen.

**Volledige uitleg**  
Eerst rekenen we terug naar één doos: `270 : 6 = 45`.  
Daarna schalen we op naar 10 dozen: `10 × 45 = 450`.  
In 10 dozen zitten samen **450 kaarten**.

**Visual**
- Vraag: `6 dozen → 270`, `10 dozen → ?`.
- Minnie: voeg `1 doos → ?` toe als tussenstap.
- Moose: toon `270 : 6 = 45` en `10 × 45 = ?`.
- Uitleg: toon `10 × 45 = 450`.

---

### M6-FR-022 — D3 Uitdagend — Twee breukstappen na elkaar

**Objective:** `multistep_fraction_remainder_then_half`  
**Answer mode:** open  
**Visual:** `fractionStrip`

**Vraag**  
Er zijn **50 onderdelen**. Eerst wordt **3/5** gebruikt. Daarna wordt **de helft van wat nog over is** gebruikt. Hoeveel onderdelen blijven uiteindelijk over?

**Antwoord:** `10` onderdelen

**Minnie**  
Werk in twee stappen. Bereken eerst hoeveel **3/5 van 50** is en bepaal daarna hoeveel er nog overblijft.

**Moose**  
`50 : 5 = 10`, dus `3/5 van 50 = 30`. Na de eerste stap blijven `50 − 30 = 20` onderdelen over. Van die 20 wordt daarna de helft gebruikt. Hoeveel blijft dan over?

**Volledige uitleg**  
Eerst berekenen we `3/5 van 50`.  
`50 : 5 = 10`, dus `3 × 10 = 30`.  
Na de eerste stap blijven `50 − 30 = 20` onderdelen over.  
Daarna wordt de helft van die 20 gebruikt: `20 : 2 = 10`.  
Er wordt dus nog 10 gebruikt en er blijven **10 onderdelen** over.

**Visual**
- Vraag: eerste strook met 5 gelijke delen voor de 50 onderdelen; 3 delen gemarkeerd als eerste gebruik. Tweede stap alleen tekstueel aangekondigd.
- Minnie: eerste breukstap benadrukken, geen aantallen per deel.
- Moose: toon eerste resultaat `30 gebruikt` en `20 over`; tweede strook verdeelt die 20 in twee gelijke helften zonder eindantwoordlabel.
- Uitleg: markeer één helft als opnieuw gebruikt en de andere helft als `10 over`.

---

## 6. Reviewstatus batch 3

Nog te beoordelen vóór productie-import:

- voelen `M6-FR-011` t/m `014` veilig genoeg voor de D1-pool bij standaard 90/10;
- zijn gelijkwaardige breuken en breuken op de getallenlijn qua formulering voldoende laagdrempelig;
- zijn `M6-FR-015` t/m `018` representatief voor normaal M6-werkbladniveau;
- blijven `M6-FR-019` t/m `022` duidelijk binnen M6 en schuiven ze niet richting E6;
- laat Moose bij iedere vraag nog een betekenisvolle laatste stap over;
- lekken fractionStrip/numberLine/calculationSteps-visuals geen eindantwoord vóór de uitleg;
- zijn de nieuwe educational cores voldoende verschillend van RP-M6-BR-001..006 en M6-FR-001..010;
- passen alle voorgestelde visuals binnen bestaande Atlas-capabilities zonder nieuwe rendererfunctionaliteit te vereisen;
- procenten en formele decimaalrekening blijven bewust buiten deze batch totdat daar afzonderlijk een niveau- en curriculumcheck voor is gedaan.

**Auditstatus:** opgenomen in deze gezamenlijk geaudite approved expansion source.

---

# Batch 4 — 12 nieuwe M6-vragen

**Status:** inhoudelijk geaudit en opgenomen in de approved 60-vragen expansion source  
**Domeinen:** money + time  
**Verdeling:** 4× D1, 4× D2, 4× D3

Deze batch voegt bewust geen extra gewone klokleesvragen of extra varianten van bestaand wisselgeldwerk toe. De nieuwe vragen richten zich op nog weinig gebruikte toepassingen binnen geld en tijd: euro/cent-conversies, prijsverschillen, herhaalde prijzen en budgetteren; plus uren/minuten omrekenen, tijdsduren combineren/vergelijken en resterende tijd binnen een planning.

## A. Geld

### M6-MO-009 — D1 Instap — Euro's en centen naar centen

**Objective:** `money_euros_cents_to_total_cents`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Een bedrag is **€3,75**. Hoeveel cent is dat?

**Antwoord:** `375` cent

**Minnie**  
Eén euro is **100 cent**. Zet eerst de 3 euro om naar centen.

**Moose**  
`3 euro = 300 cent`. Er hoort ook nog **75 cent** bij. Tel 300 en 75 bij elkaar op.

**Volledige uitleg**  
Drie euro is `3 × 100 = 300` cent.  
Daar komt nog 75 cent bij: `300 + 75 = 375`.  
**€3,75 is 375 cent.**

**Visual**
- Vraag: `€3,75 → ? cent`.
- Minnie: `€1 = 100 cent`.
- Moose: `€3 = 300 cent` en `300 + 75 = ?`.
- Uitleg: `300 + 75 = 375 cent`.

---

### M6-MO-010 — D1 Instap — Centen naar euro's

**Objective:** `money_total_cents_to_euros_cents`  
**Answer mode:** multipleChoice  
**Visual:** `calculationSteps`

**Vraag**  
**460 cent** is hoeveel euro?

**Antwoordopties**
- €4,06
- €4,60
- €46,00
- €0,46

**Correct antwoord:** `€4,60`

**Minnie**  
Elke **100 cent** vormt één hele euro. Zoek eerst hoeveel hele honderden er in 460 zitten.

**Moose**  
In 460 cent zitten **4 hele honderden = 4 euro**. Daarna blijven **60 cent** over. Welke bedragnotatie hoort daarbij?

**Volledige uitleg**  
`400 cent = €4,00`.  
Er blijft `460 − 400 = 60` cent over.  
Samen is dat **€4,60**.

**Visual**
- Vraag: `460 cent → € ?`.
- Minnie: groepeer 4 blokken van `100 cent`.
- Moose: toon `400 cent = €4,00` en `60 cent over`, maar niet de samengestelde eindnotatie.
- Uitleg: `€4,00 + €0,60 = €4,60`.

---

### M6-MO-011 — D2 Normaal — Prijsverschil

**Objective:** `money_compare_prices_difference`  
**Answer mode:** open  
**Visual:** `moneyReceipt`

**Answer contract:** bestaand M6-eurocontract; canonical answer `335` cent; `answerSpec.type: euro`; authored allowed form `3,35`; runtime gebruikt de bestaande gestructureerde euro/cent-invoer.

**Vraag**  
Een rugzak kost **€12,80**. Een andere rugzak kost **€9,45**. Hoeveel euro is het prijsverschil?

**Antwoord:** `€3,35`

**Minnie**  
Je zoekt hoeveel je vanaf **€9,45** moet aanvullen om bij **€12,80** te komen.

**Moose**  
Van `€9,45` naar `€10,00` is **€0,55**. Van `€10,00` naar `€12,80` is **€2,80**. Tel die twee verschillen bij elkaar op.

**Volledige uitleg**  
Eerst vullen we aan tot €10,00:  
`€10,00 − €9,45 = €0,55`.

Daarna van €10,00 naar €12,80:  
`€12,80 − €10,00 = €2,80`.

`€0,55 + €2,80 = €3,35`.

Het prijsverschil is **€3,35**.

**Visual**
- Vraag: twee prijskaartjes `€12,80` en `€9,45`.
- Minnie: aanvulroute van `€9,45` naar `€12,80`.
- Moose: toon tussenstappen `+€0,55` en `+€2,80`, totaal nog open.
- Uitleg: `€3,35 verschil`.

---

### M6-MO-012 — D2 Normaal — Meerdere keren dezelfde prijs

**Objective:** `money_multiply_equal_price`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Answer contract:** bestaand M6-eurocontract; canonical answer `1100` cent; `answerSpec.type: euro`; authored allowed form `11,00`; runtime gebruikt de bestaande gestructureerde euro/cent-invoer.

**Vraag**  
Een kaartje kost **€2,75**. Je koopt **4 kaartjes**. Hoeveel betaal je samen?

**Antwoord:** `€11,00`

**Minnie**  
Splits €2,75 in een handig eurodeel en centdeel. Reken beide delen vier keer.

**Moose**  
`4 × €2,00 = €8,00`.  
`4 × €0,75 = €3,00`.  
Tel die twee bedragen bij elkaar op.

**Volledige uitleg**  
We splitsen €2,75 in €2,00 en €0,75.

`4 × €2,00 = €8,00`.  
`4 × €0,75 = €3,00`.

`€8,00 + €3,00 = €11,00`.

Vier kaartjes kosten samen **€11,00**.

**Visual**
- Vraag: vier gelijke kaartjes met `€2,75` per kaartje.
- Minnie: `€2,75 = €2,00 + €0,75`.
- Moose: toon `€8,00` en `€3,00`, maar nog geen totaal.
- Uitleg: `€8,00 + €3,00 = €11,00`.

---

### M6-MO-013 — D3 Uitdagend — Budget na meerdere gelijke aankopen

**Objective:** `money_budget_after_repeated_price`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Answer contract:** bestaand M6-eurocontract; canonical answer `475` cent; `answerSpec.type: euro`; authored allowed form `4,75`; runtime gebruikt de bestaande gestructureerde euro/cent-invoer.

**Vraag**  
Je hebt **€25,00**. Je koopt **3 spellen** van **€6,75** per stuk. Hoeveel geld houd je over?

**Antwoord:** `€4,75`

**Minnie**  
Bereken eerst hoeveel de **3 spellen samen** kosten. Kijk pas daarna hoeveel van €25,00 overblijft.

**Moose**  
`3 × €6,00 = €18,00` en `3 × €0,75 = €2,25`.  
Samen kosten de spellen **€20,25**. Bereken nu hoeveel er van €25,00 overblijft.

**Volledige uitleg**  
Eerst berekenen we de totale prijs:

`3 × €6,00 = €18,00`.  
`3 × €0,75 = €2,25`.  
`€18,00 + €2,25 = €20,25`.

Daarna trekken we dat af van het budget:

`€25,00 − €20,25 = €4,75`.

Je houdt **€4,75** over.

**Visual**
- Vraag: budget `€25,00`, drie gelijke aankopen van `€6,75`.
- Minnie: eerste stap `3 × €6,75 = ?`.
- Moose: totaal aankopen `€20,25`, daarna `€25,00 − €20,25 = ?`.
- Uitleg: toon `€4,75 over`.

---

### M6-MO-014 — D3 Uitdagend — Twee aanbiedingen vergelijken

**Objective:** `money_compare_multi_item_offers`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Answer contract:** bestaand M6-eurocontract; canonical answer `30` cent; `answerSpec.type: euro`; authored allowed form `0,30`; runtime gebruikt de bestaande gestructureerde euro/cent-invoer.

**Vraag**  
Je wilt **4 schriften** kopen.

- Winkel A: **3 schriften voor €8,40** en één extra schrift kost **€3,10**.
- Winkel B: elk schrift kost **€2,95**.

Hoeveel euro goedkoper is de goedkoopste keuze voor 4 schriften?

**Antwoord:** `€0,30`

**Minnie**  
Bereken eerst bij **beide winkels** wat 4 schriften kosten. Vergelijk daarna de twee totalen.

**Moose**  
Bij winkel A kost 4 schriften `€8,40 + €3,10 = €11,50`.  
Bij winkel B moet je nog `4 × €2,95` berekenen. Vergelijk daarna beide bedragen.

**Volledige uitleg**  
Winkel A:

`€8,40 + €3,10 = €11,50`.

Winkel B:

`4 × €2,95 = €11,80`.

Het verschil is:

`€11,80 − €11,50 = €0,30`.

Winkel A is dus **€0,30 goedkoper**.

**Visual**
- Vraag: twee duidelijke aanbodkaarten A en B.
- Minnie: twee lege totalen `A = ?`, `B = ?`.
- Moose: toon `A = €11,50` en `B = 4 × €2,95 = ?`.
- Uitleg: toon `B = €11,80` en `€11,80 − €11,50 = €0,30`.

---

## B. Tijd

### M6-TI-019 — D1 Instap — Uren en minuten naar minuten

**Objective:** `hours_minutes_to_total_minutes`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Hoeveel minuten zijn **1 uur en 20 minuten**?

**Antwoord:** `80` minuten

**Minnie**  
Eén uur is **60 minuten**. Zet het uur eerst om naar minuten.

**Moose**  
`1 uur = 60 minuten`. Tel daar de **20 minuten** bij op.

**Volledige uitleg**  
Eén uur is 60 minuten.  
`60 + 20 = 80`.  
**1 uur en 20 minuten is 80 minuten.**

**Visual**
- Vraag: `1 uur 20 min → ? min`.
- Minnie: `1 uur = 60 min`.
- Moose: `60 + 20 = ?`.
- Uitleg: `80 min`.

---

### M6-TI-020 — D1 Instap — Minuten naar uren en minuten

**Objective:** `total_minutes_to_hours_minutes`  
**Answer mode:** multipleChoice  
**Visual:** `calculationSteps`

**Vraag**  
**95 minuten** is hoeveel uur en minuten?

**Antwoordopties**
- 1 uur 25 minuten
- 1 uur 35 minuten
- 1 uur 45 minuten
- 2 uur 5 minuten

**Correct antwoord:** `1 uur 35 minuten`

**Minnie**  
Haal eerst één heel uur van 95 minuten af. Eén uur is **60 minuten**.

**Moose**  
Na één uur blijft `95 − 60 = 35` minuten over. Welke antwoordoptie combineert **1 uur** met die resterende minuten?

**Volledige uitleg**  
`95 minuten = 60 minuten + 35 minuten`.  
60 minuten is 1 uur.  
Dus **95 minuten = 1 uur en 35 minuten**.

**Visual**
- Vraag: balk van `95 min`.
- Minnie: eerste blok `60 min = 1 uur`.
- Moose: resterend blok `35 min`, zonder eindantwoordzin.
- Uitleg: `1 uur 35 min`.

---

### M6-TI-021 — D2 Normaal — Tijdsduur vergelijken

**Objective:** `compare_mixed_time_durations`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Activiteit A duurt **1 uur en 10 minuten**. Activiteit B duurt **75 minuten**. Hoeveel minuten duurt activiteit B langer?

**Antwoord:** `5` minuten

**Minnie**  
Zet beide tijdsduren eerst in **dezelfde eenheid**.

**Moose**  
`1 uur en 10 minuten = 60 + 10 = 70 minuten`. Vergelijk nu 70 minuten met 75 minuten.

**Volledige uitleg**  
Activiteit A duurt `60 + 10 = 70` minuten.  
Activiteit B duurt 75 minuten.  
`75 − 70 = 5`.  
Activiteit B duurt **5 minuten langer**.

**Visual**
- Vraag: twee duur-balken met `1 u 10 min` en `75 min`.
- Minnie: label `zelfde eenheid`.
- Moose: eerste balk wordt `70 min`; tweede blijft `75 min`.
- Uitleg: verschil `5 min`.

---

### M6-TI-022 — D2 Normaal — Twee tijdsduren optellen

**Objective:** `add_mixed_time_durations`  
**Answer mode:** multipleChoice  
**Visual:** `calculationSteps`

**Vraag**  
Een reis duurt eerst **2 uur en 15 minuten** en daarna nog **50 minuten**. Hoe lang duurt de reis samen?

**Antwoordopties**
- 2 uur 55 minuten
- 3 uur 5 minuten
- 3 uur 15 minuten
- 3 uur 25 minuten

**Correct antwoord:** `3 uur 5 minuten`

**Minnie**  
Tel eerst de minuten bij elkaar op: **15 + 50**. Kijk daarna wat je met een totaal van meer dan 60 minuten doet.

**Moose**  
`15 + 50 = 65 minuten`. Dat is **1 uur en 5 minuten**. Combineer dat met de 2 hele uren die er al waren.

**Volledige uitleg**  
De minuten samen zijn:

`15 + 50 = 65 minuten`.

65 minuten is `1 uur en 5 minuten`.

Daar komt de oorspronkelijke 2 uur nog bij:

`2 uur + 1 uur 5 minuten = 3 uur 5 minuten`.

De reis duurt **3 uur en 5 minuten**.

**Visual**
- Vraag: twee duurblokken `2 u 15 min` en `50 min`.
- Minnie: minuten `15 + 50`.
- Moose: `65 min = 1 u 5 min`, eindtotaal nog open.
- Uitleg: `3 u 5 min`.

---

### M6-TI-023 — D3 Uitdagend — Verschil tussen gemengde tijdsduren

**Objective:** `subtract_mixed_time_durations`  
**Answer mode:** multipleChoice  
**Visual:** `calculationSteps`

**Vraag**  
Een lange activiteit duurt **3 uur en 10 minuten**. Een korte activiteit duurt **1 uur en 45 minuten**. Hoeveel langer duurt de lange activiteit?

**Antwoordopties**
- 1 uur 15 minuten
- 1 uur 25 minuten
- 1 uur 35 minuten
- 2 uur 25 minuten

**Correct antwoord:** `1 uur 25 minuten`

**Minnie**  
Je kunt beide tijdsduren eerst omzetten naar minuten, zodat je ze makkelijk kunt vergelijken.

**Moose**  
`3 uur en 10 minuten = 190 minuten`.  
`1 uur en 45 minuten = 105 minuten`.  
Bereken nu het verschil en zet dat verschil daarna terug naar uren en minuten.

**Volledige uitleg**  
`3 uur 10 minuten = 3 × 60 + 10 = 190 minuten`.  
`1 uur 45 minuten = 1 × 60 + 45 = 105 minuten`.

`190 − 105 = 85 minuten`.

85 minuten is `60 + 25`, dus **1 uur en 25 minuten**.

De lange activiteit duurt **1 uur en 25 minuten langer**.

**Visual**
- Vraag: twee duurblokken.
- Minnie: omzetpijlen naar minuten.
- Moose: `190 min` en `105 min`, daarna `190 − 105 = ?`.
- Uitleg: `85 min = 1 u 25 min`.

---

### M6-TI-024 — D3 Uitdagend — Resterende tijd in een planning

**Objective:** `find_remaining_time_in_schedule`  
**Answer mode:** open  
**Visual:** `timeLine`

**Vraag**  
Je hebt van **13:25 tot 15:00** de tijd.

Een opdracht duurt **35 minuten** en een tweede opdracht duurt **40 minuten**. De rest van de tijd is pauze.

Hoeveel minuten pauze zijn er?

**Antwoord:** `20` minuten

**Minnie**  
Bereken eerst hoeveel minuten er in totaal zitten tussen **13:25 en 15:00**.

**Moose**  
Van 13:25 tot 14:00 is **35 minuten** en van 14:00 tot 15:00 is **60 minuten**. Samen is dat **95 minuten**. De twee opdrachten duren samen `35 + 40 = 75` minuten. Bereken hoeveel tijd dan nog overblijft.

**Volledige uitleg**  
Eerst bepalen we de beschikbare tijd:

13:25 → 14:00 = 35 minuten.  
14:00 → 15:00 = 60 minuten.

`35 + 60 = 95 minuten`.

De opdrachten duren samen:

`35 + 40 = 75 minuten`.

De resterende tijd is:

`95 − 75 = 20 minuten`.

Er zijn **20 minuten pauze**.

**Visual**
- Vraag: tijdlijn `13:25 → 15:00` met twee nog ongelabelde activiteiten van `35 min` en `40 min`.
- Minnie: splits beschikbare tijd bij `14:00`.
- Moose: toon `95 min beschikbaar` en `75 min opdrachten`, maar geen rest.
- Uitleg: resterend segment `20 min pauze`.

---

## 7. Reviewstatus batch 4

Nog te beoordelen vóór productie-import:

- voelen `M6-MO-009`/`010` en `M6-TI-019`/`020` veilig genoeg voor de D1-pool;
- zijn euro↔cent en uur/minuut-conversies passend als laagdrempelige M6-uitbreiding;
- zijn `M6-MO-011`/`012` en `M6-TI-021`/`022` representatief voor normaal M6-werkbladniveau;
- blijven `M6-MO-013`/`014` en `M6-TI-023`/`024` binnen M6 en worden ze niet te veelstaps;
- laten alle Moose-hints nog een betekenisvolle laatste stap over;
- geven moneyReceipt/calculationSteps/timeLine-visuals geen eindantwoord te vroeg prijs;
- overlappen de nieuwe money-cores niet inhoudelijk met alleen wisselgeld tellen/samenstellen uit de bestaande bank;
- overlappen de nieuwe time-cores niet inhoudelijk met alleen kloklezen, eenvoudige elapsed-time of bestaande start/eindtijd-vragen;
- kunnen alle vragen met bestaande Atlas-capabilities worden weergegeven zonder nieuwe rendererfunctionaliteit;
- accepteert de bestaande geldinvoer de bedoelde Nederlandse bedragnotatie voor de nieuwe open-euro-antwoorden.

**Auditstatus:** opgenomen in deze gezamenlijk geaudite approved expansion source.

---

# Batch 5 — 12 nieuwe M6-vragen

**Status:** inhoudelijk geaudit en opgenomen in de approved 60-vragen expansion source  
**Domeinen:** additionSubtraction + measurementGeometry + dataPatterns  
**Verdeling:** 6× D1, 4× D2, 2× D3

Deze laatste batch is bewust iets lichter gewogen dan de eerdere batches. De bank heeft al een ruime uitdagende D3-laag; voor de overgang vanuit E5 is extra variatie in Instap en Normaal waardevoller. De batch vult vooral optellen/aftrekken aan en voegt enkele nog ontbrekende toepassingen toe bij meten en gegevens verwerken.

## A. Optellen & aftrekken

### M6-AS-009 — D1 Instap — Aftrekken vanaf een rond duizendtal

**Objective:** `subtract_hundreds_tens_from_round_thousand`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
In een magazijn liggen **5.000 onderdelen**. Er worden **350 onderdelen** gebruikt. Hoeveel onderdelen blijven er over?

**Antwoord:** `4.650` onderdelen

**Minnie**  
Splits **350** in **300 en 50**. Trek die stukken één voor één van 5.000 af.

**Moose**  
`5.000 − 300 = 4.700`. Trek nu nog **50** af.

**Volledige uitleg**  
We splitsen 350 in 300 en 50.

`5.000 − 300 = 4.700`.  
`4.700 − 50 = 4.650`.

Er blijven **4.650 onderdelen** over.

**Visual**
- Vraag: `5.000 − 350 = ?`.
- Minnie: `350 = 300 + 50`.
- Moose: `5.000 − 300 = 4.700`, daarna `4.700 − 50 = ?`.
- Uitleg: `4.650`.

---

### M6-AS-010 — D1 Instap — Aanvullen tot het volgende duizendtal

**Objective:** `bridge_to_next_thousand`  
**Answer mode:** open  
**Visual:** `numberLine`

**Vraag**  
Hoeveel moet je bij **4.680** optellen om **5.000** te krijgen?

**Antwoord:** `320`

**Minnie**  
Ga eerst van **4.680 naar 4.700**. Ga daarna verder naar 5.000.

**Moose**  
Van 4.680 naar 4.700 is **20**.  
Van 4.700 naar 5.000 is **300**.  
Tel die twee sprongen bij elkaar op.

**Volledige uitleg**  
Eerst:

`4.680 + 20 = 4.700`.

Daarna:

`4.700 + 300 = 5.000`.

Samen is dat:

`20 + 300 = 320`.

Je moet **320** optellen.

**Visual**
- Vraag: number line `4.680 → 5.000`.
- Minnie: tussenpunt `4.700`.
- Moose: sprongen `+20` en `+300`, totaalsprong nog open.
- Uitleg: totaalsprong `+320`.

---

### M6-AS-011 — D1 Instap — Duizenden en honderden aftrekken

**Objective:** `subtract_thousands_hundreds_friendly`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Een voorraad bevat **12.500 onderdelen**. Er worden **2.300 onderdelen** weggehaald. Hoeveel blijven er over?

**Antwoord:** `10.200` onderdelen

**Minnie**  
Splits **2.300** in **2.000 en 300**.

**Moose**  
`12.500 − 2.000 = 10.500`. Trek nu nog **300** af.

**Volledige uitleg**  
We trekken eerst 2.000 af:

`12.500 − 2.000 = 10.500`.

Daarna nog 300:

`10.500 − 300 = 10.200`.

Er blijven **10.200 onderdelen** over.

**Visual**
- Vraag: `12.500 − 2.300 = ?`.
- Minnie: `2.300 = 2.000 + 300`.
- Moose: eerste stap `10.500`, tweede stap nog open.
- Uitleg: `10.200`.

---

### M6-AS-012 — D2 Normaal — Aftrekken over meerdere grenzen

**Objective:** `subtract_four_digit_multi_boundary`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Bereken:

**5.203 − 487 = ?**

**Antwoord:** `4.716`

**Minnie**  
Splits **487** in **400, 80 en 7** en trek die delen na elkaar af.

**Moose**  
`5.203 − 400 = 4.803`.  
`4.803 − 80 = 4.723`.  
Trek nu nog **7** af.

**Volledige uitleg**  
We splitsen 487 in 400, 80 en 7.

`5.203 − 400 = 4.803`.  
`4.803 − 80 = 4.723`.  
`4.723 − 7 = 4.716`.

Dus **5.203 − 487 = 4.716**.

**Visual**
- Vraag: alleen `5.203 − 487`.
- Minnie: `487 = 400 + 80 + 7`.
- Moose: eerste twee aftrekstappen en `4.723 − 7 = ?`.
- Uitleg: volledige keten met `4.716`.

---

### M6-AS-013 — D2 Normaal — Onbekende aanvulling over een duizendtal

**Objective:** `find_missing_addend_to_round_thousand`  
**Answer mode:** open  
**Visual:** `numberLine`

**Vraag**  
**2.875 + ? = 4.000**

Welk getal hoort op de plek van het vraagteken?

**Antwoord:** `1.125`

**Minnie**  
Vul eerst aan van **2.875 naar 3.000** en daarna van 3.000 naar 4.000.

**Moose**  
Van 2.875 naar 3.000 is **125**.  
Van 3.000 naar 4.000 is **1.000**.  
Tel die twee aanvullingen bij elkaar op.

**Volledige uitleg**  
`2.875 + 125 = 3.000`.  
Daarna is nog 1.000 nodig om 4.000 te bereiken.

`125 + 1.000 = 1.125`.

Dus:

**2.875 + 1.125 = 4.000**.

**Visual**
- Vraag: number line `2.875 → 4.000`.
- Minnie: tussenpunt `3.000`.
- Moose: sprongen `+125` en `+1.000`, totaalsprong nog open.
- Uitleg: `+1.125`.

---

### M6-AS-014 — D3 Uitdagend — Voorraad neemt toe en daarna af

**Objective:** `add_then_subtract_inventory_multistep`  
**Answer mode:** open  
**Visual:** `calculationSteps`

**Vraag**  
Er zijn eerst **3.250 onderdelen**. Er komen **875 onderdelen** bij. Daarna worden **640 onderdelen** gebruikt.

Hoeveel onderdelen zijn er dan nog?

**Antwoord:** `3.485` onderdelen

**Minnie**  
Werk in de volgorde van het verhaal: bereken eerst hoeveel er zijn **nadat 875 erbij komt**.

**Moose**  
`3.250 + 875 = 4.125`.  
Trek daarna 640 af. Je kunt beginnen met `4.125 − 600 = 3.525`. Trek vervolgens het resterende deel van 640 af.

**Volledige uitleg**  
Eerst komt er 875 bij:

`3.250 + 875 = 4.125`.

Daarna gaan er 640 af. We splitsen 640 in 600 en 40:

`4.125 − 600 = 3.525`.  
`3.525 − 40 = 3.485`.

Er zijn **3.485 onderdelen** over.

**Visual**
- Vraag: `3.250 → +875 → −640 → ?`.
- Minnie: eerste pijl benadrukken.
- Moose: toon `4.125` en daarna `3.525 − 40 = ?`.
- Uitleg: volledige keten tot `3.485`.

---

## B. Meten

### M6-ME-014 — D1 Instap — Deciliter naar centiliter

**Objective:** `convert_deciliters_to_centiliters`  
**Answer mode:** open  
**Visual:** `measurement`

**Vraag**  
Hoeveel centiliter is **3 deciliter**?

**Antwoord:** `30` centiliter

**Minnie**  
Eén deciliter is **10 centiliter**.

**Moose**  
Je hebt 3 keer 10 centiliter. Reken **3 × 10**.

**Volledige uitleg**  
`1 dl = 10 cl`.

Dus:

`3 × 10 = 30`.

**3 dl = 30 cl.**

**Visual**
- Vraag: `3 dl → ? cl`.
- Minnie: `1 dl = 10 cl`.
- Moose: `3 × 10 = ?`.
- Uitleg: `30 cl`.

---

### M6-ME-015 — D1 Instap — Kilogram en gram samen omzetten

**Objective:** `convert_mixed_weight_to_grams`  
**Answer mode:** open  
**Visual:** `measurement`

**Vraag**  
Hoeveel gram is **2 kilogram en 500 gram**?

**Antwoord:** `2.500` gram

**Minnie**  
Eén kilogram is **1.000 gram**. Zet eerst de 2 kilogram om.

**Moose**  
`2 kilogram = 2.000 gram`. Tel daar de **500 gram** bij op.

**Volledige uitleg**  
`2 kg = 2.000 g`.

Daar komt 500 gram bij:

`2.000 + 500 = 2.500`.

Dus **2 kg 500 g = 2.500 g**.

**Visual**
- Vraag: `2 kg 500 g → ? g`.
- Minnie: `1 kg = 1.000 g`.
- Moose: `2.000 g + 500 g = ?`.
- Uitleg: `2.500 g`.

---

### M6-ME-016 — D2 Normaal — Inhoud optellen en omzetten

**Objective:** `add_milliliters_then_convert_to_liters`  
**Answer mode:** open  
**Visual:** `measurement`

**Vraag**  
Er zijn twee flessen van **750 milliliter** en één fles van **500 milliliter**.

Hoeveel **liter** is dat samen?

**Antwoord:** `2` liter

**Minnie**  
Bereken eerst hoeveel **milliliter** er in totaal is. Zet het totaal daarna om naar liter.

**Moose**  
`750 + 750 = 1.500 ml`.  
Met de derde fles erbij is dat `1.500 + 500 = 2.000 ml`.  
Zet 2.000 milliliter nu om naar liter.

**Volledige uitleg**  
De twee flessen van 750 ml zijn samen:

`750 + 750 = 1.500 ml`.

Daar komt 500 ml bij:

`1.500 + 500 = 2.000 ml`.

`1.000 ml = 1 liter`, dus:

`2.000 ml = 2 liter`.

Samen is het **2 liter**.

**Visual**
- Vraag: twee flessen `750 ml` en één fles `500 ml`.
- Minnie: `totaal in ml → daarna liter`.
- Moose: `2.000 ml → ? liter`.
- Uitleg: `2.000 ml = 2 l`.

---

## C. Gegevens & patronen

### M6-DP-013 — D1 Instap — Grootste waarde uit een tabel

**Objective:** `find_maximum_table_value`  
**Answer mode:** multipleChoice  
**Visual:** `compactDataTable`

**Tabel**

| Dag | Aantal |
|---|---:|
| Maandag | 36 |
| Dinsdag | 42 |
| Woensdag | 39 |
| Donderdag | 47 |

**Vraag**  
Op welke dag is het aantal het **grootst**?

**Antwoordopties**
- Maandag
- Dinsdag
- Woensdag
- Donderdag

**Correct antwoord:** `Donderdag`

**Minnie**  
Vergelijk de vier aantallen en zoek het **hoogste getal**.

**Moose**  
36 en 39 zijn kleiner dan 42. Vergelijk nu **42 en 47**. Bij welke dag hoort het grootste van die twee?

**Volledige uitleg**  
De aantallen zijn 36, 42, 39 en 47.

Het grootste getal is **47**.

47 hoort bij **Donderdag**.

Dus het antwoord is **Donderdag**.

**Visual**
- Vraag: volledige tabel, geen markering.
- Minnie: kolom `Aantal` benadrukken.
- Moose: 42 en 47 subtiel als laatste vergelijking markeren.
- Uitleg: rij Donderdag / 47 markeren.

---

### M6-DP-014 — D2 Normaal — Ontbrekende tabelwaarde uit totaal

**Objective:** `find_missing_table_value_from_total`  
**Answer mode:** open  
**Visual:** `compactDataTable`

**Tabel**

| Route | Aantal |
|---|---:|
| A | 125 |
| B | 138 |
| C | ? |
| D | 117 |

**Vraag**  
Samen is het aantal van de vier routes **500**. Welk aantal hoort bij **route C**?

**Antwoord:** `120`

**Minnie**  
Tel eerst de drie aantallen op die je al weet. Trek dat totaal daarna van 500 af.

**Moose**  
`125 + 138 + 117 = 380`.  
Er moeten samen 500 zijn. Bereken dus **500 − 380**.

**Volledige uitleg**  
De bekende aantallen zijn:

`125 + 138 + 117 = 380`.

Het totaal moet 500 zijn:

`500 − 380 = 120`.

Bij route C hoort dus **120**.

**Visual**
- Vraag: tabel met `?` bij C en `Totaal = 500`.
- Minnie: bekende rijen A/B/D markeren.
- Moose: onder tabel `bekend samen = 380`, `500 − 380 = ?`.
- Uitleg: C invullen met `120`.

---

### M6-DP-015 — D3 Uitdagend — Totalen vergelijken met een doelverschil

**Objective:** `compare_two_table_totals_to_target_difference`  
**Answer mode:** open  
**Visual:** `compactDataTable`

**Tabel**

| Team | Ochtend | Middag |
|---|---:|---:|
| A | 128 | 147 |
| B | 136 | 152 |

**Vraag**  
Team B krijgt een bonus als het over de hele dag **20 meer** heeft dan team A.

Hoeveel komt team B nog tekort voor die bonus?

**Antwoord:** `7`

**Minnie**  
Bereken eerst het **dagtotaal van beide teams**.

**Moose**  
Team A heeft `128 + 147 = 275`.  
Team B heeft `136 + 152 = 288`.  
Team B heeft dus **13 meer** dan team A. Vergelijk dat verschil nu met de benodigde 20.

**Volledige uitleg**  
Eerst de dagtotalen:

Team A: `128 + 147 = 275`.  
Team B: `136 + 152 = 288`.

Het huidige verschil is:

`288 − 275 = 13`.

Voor de bonus is een verschil van 20 nodig:

`20 − 13 = 7`.

Team B komt nog **7** tekort.

**Visual**
- Vraag: volledige tabel + klein label `bonus bij +20`.
- Minnie: lege dagtotaalvelden naast beide teams.
- Moose: dagtotalen `275` en `288` plus `verschil = 13`; geen antwoord op het tekort.
- Uitleg: `20 − 13 = 7 tekort`.

---

## 8. Reviewstatus batch 5

Nog te beoordelen vóór productie-import:

- voelt de bewust lichtere verdeling van **6× D1 / 4× D2 / 2× D3** passend bij de eerdere zorg dat M6 niet plotseling te moeilijk wordt;
- zijn `M6-AS-009` t/m `011`, `M6-ME-014`/`015` en `M6-DP-013` veilige Instap-opgaven zonder slechts triviale E5-herhaling te worden;
- zijn `M6-AS-012`/`013`, `M6-ME-016` en `M6-DP-014` representatief voor normaal M6-werkbladniveau;
- blijven `M6-AS-014` en `M6-DP-015` uitdagend maar duidelijk binnen M6;
- laten alle Moose-hints nog een echte laatste stap over;
- lekken visuals geen eindantwoord vóór de uitleg;
- zijn alle nieuwe educational cores verschillend van de bestaande 99 en batches 1–4;
- passen de voorgestelde `calculationSteps`, `numberLine`, `measurement` en `compactDataTable`-visuals binnen bestaande Atlas-capabilities;
- blijven decimalen/procenten buiten deze eerste uitbreiding totdat ze afzonderlijk qua niveau zijn beoordeeld.

**Auditstatus:** opgenomen in deze gezamenlijk geaudite approved expansion source.

---

# Eerste uitbreiding — geprojecteerde eindstand na batch 1 t/m 5

Als alle vijf batches inhoudelijk worden goedgekeurd en exact worden geïmporteerd:

- bestaande M6-bank: **99 vragen**
- nieuwe vragen: **60**
- geprojecteerde M6-bank: **159 vragen**

## Geprojecteerde domeindekking

| Domein | Bestaand | Nieuw | Totaal |
|---|---:|---:|---:|
| additionSubtraction | 14 | 6 | 20 |
| dataPatterns | 6 | 9 | 15 |
| fractionsRatios | 16 | 12 | 28 |
| measurementGeometry | 7 | 9 | 16 |
| money | 14 | 6 | 20 |
| multiplicationDivision | 10 | 6 | 16 |
| numberSense | 8 | 6 | 14 |
| time | 24 | 6 | 30 |
| **Totaal** | **99** | **60** | **159** |

## Geprojecteerde difficulty-inventaris

Uitgaande van de reeds gecorrigeerde productie-baseline van 42× D1 / 37× D2 / 20× D3:

| Difficulty | Bestaand | Nieuw | Geprojecteerd |
|---|---:|---:|---:|
| D1 — Instap | 42 | 22 | 64 |
| D2 — Normaal | 37 | 21 | 58 |
| D3 — Uitdagend | 20 | 17 | 37 |
| **Totaal** | **99** | **60** | **159** |

Dit is een **content-inventaris**, geen runtime-selectieverdeling. De bestaande slider/difficulty-policy blijft bepalen hoe vaak D1/D2/D3 daadwerkelijk worden aangeboden. Bij de standaard 90/10 E5/M6 blijft M6 beperkt tot D1.

## Auditstatus na correctieronde

Deze authoring-versie is inhoudelijk gecorrigeerd en heeft de laatste mechanische authoring-file controle doorstaan.

Gecontroleerd:
- exact 60 unieke nieuwe IDs;
- geen ID-collision met de bestaande 99;
- difficulty nieuw = **22× D1 / 21× D2 / 17× D3**;
- geprojecteerde productie-bank = **159**;
- alle 60 hebben Objective + Answer mode + Visual;
- geen verouderde custom geld-answerMode resteert;
- alle vier nieuwe open geldvragen gebruiken het bestaande euro-answercontract;
- `M6-FR-014` Moose-visual onthult het derde tussenpunt niet;
- `M6-DP-012` staat op D2;
- `M6-NS-014` blijft expliciet stretch-D3;
- `M6-ME-008..013` gebruiken alleen `geometryDiagram`;
- geen educational-core duplicaat met bestaande 99 of binnen de nieuwe 60;
- rekenkundige antwoorden, choices en Minnie/Moose/einduitleg blijven onderling consistent.

Deze volledige file is hiermee vastgezet als één **approved authoring/import source**. Codex mag de inhoud mechanisch importeren en technisch valideren, maar niet pedagogisch herschrijven.

