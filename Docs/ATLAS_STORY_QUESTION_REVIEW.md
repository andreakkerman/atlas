# Atlas Story Question Review

Exact language-and-context revision specification for all authored variants in `ATLAS_STORY_QUESTION_AUDIT.md` where `presentation = "story"`.

## Review baseline

- Target: Dutch end of group 5 / `E5-intended`, age 8–9.
- All 156 reviewed variants are arithmetically correct and use an appropriate one-step calculation.
- No answers, tables, divisors, answer modes, choices, IDs, slot structure or overall distribution need to change.
- The main quality issue is language and context: repeated `legt bij ... groepjes`, artificial nouns such as `routefiches` and `waterfiches`, thin story wrappers and several implausible route situations.
- This review specifies an exact replacement prompt plus exact Minnie and Moose hints for every story variant. Explanations are replaced only where the changed context or unit requires it.

## Codex application rules

1. Locate each variant by its unique `Variant ID`.
2. Replace `prompt` exactly with the replacement shown below.
3. Replace `hintMinnie` and `hintMoose` exactly with the replacements shown below.
4. Replace `explanation` only where explicitly listed.
5. Keep all omitted fields unchanged, including `answer`, `choices`, `family`, `presentation`, `answerMode`, IDs and visual data.
6. Do not add, remove or reorder challenges, slots or variants.
7. Do not change bare questions or clock questions.

## Summary

- Story variants reviewed: 156
- Exact prompt replacements: 156
- Variants with exact Minnie and Moose replacements: 156
- Variants with additional explanation replacements: 19
- Arithmetic blockers: 0
- E5-level blockers: 0

# De Runenpoort

## LVL-0001 — De Runenpoort

### `zon-2a`

- **Current prompt:** De Viking legt bij zonneteken 4 groepjes van 7 gouden schijfjes. Hoeveel gouden schijfjes zijn dat samen?
- **Replacement prompt:** Rond het zonneteken liggen 4 kringen met elk 7 gouden schijfjes. Hoeveel schijfjes zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `steen-1a`

- **Current prompt:** De Viking legt bij steenteken 3 groepjes van 8 steenblokken. Hoeveel steenblokken zijn dat samen?
- **Replacement prompt:** Voor het steenteken bouwt de Viking 3 stapels van 8 stenen. Hoeveel stenen gebruikt hij?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 3 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `steen-4b`

- **Current prompt:** De Viking verdeelt bij steenteken 63 steenblokken over 7 gelijke groepen. Hoeveel steenblokken krijgt elke groep?
- **Replacement prompt:** De Viking verdeelt 63 stenen eerlijk over 7 bouwers. Hoeveel stenen krijgt iedere bouwer?
- **Replacement hintMinnie:** Verdeel 63 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 63.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `wind-3a`

- **Current prompt:** De Viking koopt 5 Vikingkaarten voor 6 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Op de havenmarkt koopt de Viking 5 vlaggen voor 6 munten per stuk. Hoeveel munten betaalt hij?
- **Replacement hintMinnie:** Er zijn 5 gelijke bedragen van 6 munten.
- **Replacement hintMoose:** Reken 5 × 5 en tel er nog 5 bij op.
- **Replacement explanation:** 5 × 6 = 30 munten.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `wind-3b`

- **Current prompt:** De Viking verdeelt bij windteken 25 Vikinglinten over 5 gelijke groepen. Hoeveel Vikinglinten krijgt elke groep?
- **Replacement prompt:** De Viking verdeelt 25 gekleurde linten eerlijk over 5 vlaggenmasten. Hoeveel linten komen aan iedere mast?
- **Replacement hintMinnie:** Verdeel 25 eerlijk over 5 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 5 welk getal uitkomt op 25.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `wind-4a`

- **Current prompt:** De Viking legt bij windteken 8 groepjes van 7 Vikinglinten. Hoeveel Vikinglinten zijn dat samen?
- **Replacement prompt:** Aan 8 vlaggenmasten hangen elk 7 linten. Hoeveel linten hangen er in totaal?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `wind-4b`

- **Current prompt:** De Viking legt bij windteken 6 groepjes van 4 Vikinglinten. Hoeveel Vikinglinten zijn dat samen?
- **Replacement prompt:** Aan 6 vlaggenmasten hangen elk 4 linten. Hoeveel linten hangen er in totaal?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 6 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0002 — De Tempelzaal

### `shieldWall-1b`

- **Current prompt:** De Viking legt bij Schildenmuur 7 groepjes van 3 ronde schilden. Hoeveel ronde schilden zijn dat samen?
- **Replacement prompt:** Aan de schildenmuur hangen 7 rijen met elk 3 schilden. Hoeveel schilden hangen er?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 3.
- **Replacement hintMoose:** Verdubbel 7 en tel er nog 7 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `shieldWall-3a`

- **Current prompt:** De Viking verdeelt bij Schildenmuur 30 ronde schilden over 6 gelijke groepen. Hoeveel ronde schilden krijgt elke groep?
- **Replacement prompt:** De Viking verdeelt 30 schilden eerlijk over 6 wachters. Hoeveel schilden krijgt iedere wachter?
- **Replacement hintMinnie:** Verdeel 30 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 30.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `shieldWall-3b`

- **Current prompt:** De Viking verdeelt bij Schildenmuur 36 ronde schilden over 6 gelijke groepen. Hoeveel ronde schilden krijgt elke groep?
- **Replacement prompt:** De Viking verdeelt 36 schilden eerlijk over 6 wachters. Hoeveel schilden krijgt iedere wachter?
- **Replacement hintMinnie:** Verdeel 36 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 36.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `shieldWall-4b`

- **Current prompt:** De Viking legt bij Schildenmuur 2 groepjes van 8 ronde schilden. Hoeveel ronde schilden zijn dat samen?
- **Replacement prompt:** Tegen de schildenmuur staan 2 rekken met elk 8 schilden. Hoeveel schilden zijn dat samen?
- **Replacement hintMinnie:** Er zijn 2 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 2 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mapTable-1a`

- **Current prompt:** De Viking legt bij Kaarttafel 3 groepjes van 8 routefiches. Hoeveel routefiches zijn dat samen?
- **Replacement prompt:** Op de kaarttafel liggen 3 rijen met elk 8 houten pionnen. Hoeveel pionnen liggen er?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 3 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mapTable-2a`

- **Current prompt:** De Viking legt bij Kaarttafel 9 groepjes van 4 routefiches. Hoeveel routefiches zijn dat samen?
- **Replacement prompt:** Op de kaarttafel liggen 9 rijen met elk 4 houten pionnen. Hoeveel pionnen liggen er?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 9 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mapTable-3b`

- **Current prompt:** De Viking legt bij Kaarttafel 7 groepjes van 7 routefiches. Hoeveel routefiches zijn dat samen?
- **Replacement prompt:** Op de kaarttafel liggen 7 rijen met elk 7 houten pionnen. Hoeveel pionnen liggen er?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 7 × 5 en 7 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `fireBowl-1b`

- **Current prompt:** De Viking legt bij Vuurschaal 6 groepjes van 10 houtblokken. Hoeveel houtblokken zijn dat samen?
- **Replacement prompt:** Naast de vuurschaal liggen 6 stapels van 10 houtblokken. Hoeveel houtblokken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 10.
- **Replacement hintMoose:** Vermenigvuldig 6 met 10: zet een nul achter 6.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `fireBowl-2a`

- **Current prompt:** De Viking legt bij Vuurschaal 7 groepjes van 10 houtblokken. Hoeveel houtblokken zijn dat samen?
- **Replacement prompt:** Naast de vuurschaal liggen 7 stapels van 10 houtblokken. Hoeveel houtblokken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 10.
- **Replacement hintMoose:** Vermenigvuldig 7 met 10: zet een nul achter 7.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `shipModel-2b`

- **Current prompt:** De Viking verdeelt bij Scheepsmodel 35 scheepsplanken over 7 gelijke groepen. Hoeveel scheepsplanken krijgt elke groep?
- **Replacement prompt:** De Viking verdeelt 35 planken eerlijk over 7 scheepsbouwers. Hoeveel planken krijgt iedere scheepsbouwer?
- **Replacement hintMinnie:** Verdeel 35 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 35.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `shipModel-3b`

- **Current prompt:** De route bij Scheepsmodel is 9 meter lang en heeft 3 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** Een touw van 9 meter wordt in 3 gelijke stukken geknipt. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 3 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 3 welk getal uitkomt op 9.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0003 — De Vikinghaven

### `harborMap-2a`

- **Current prompt:** De Viking koopt 4 Vikingkaarten voor 7 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** In de haven koopt de Viking 4 zeekaarten voor 7 munten per stuk. Hoeveel munten betaalt hij?
- **Replacement hintMinnie:** Er zijn 4 gelijke bedragen van 7 munten.
- **Replacement hintMoose:** Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- **Replacement explanation:** 4 × 7 = 28 munten.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `harborMap-3b`

- **Current prompt:** De Viking verdeelt bij Havenkaart 49 routefiches over 7 gelijke groepen. Hoeveel routefiches krijgt elke groep?
- **Replacement prompt:** De havenmeester verdeelt 49 houten routepionnen eerlijk over 7 zeekaarten. Hoeveel pionnen komen op iedere kaart?
- **Replacement hintMinnie:** Verdeel 49 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 49.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mooringRope-2a`

- **Current prompt:** De Viking legt bij Touwrol 3 groepjes van 6 touwlussen. Hoeveel touwlussen zijn dat samen?
- **Replacement prompt:** De Viking maakt 3 bundels van 6 touwlussen. Hoeveel touwlussen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 3 × 5 en tel er nog 3 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mooringRope-3a`

- **Current prompt:** De route bij Touwrol is 18 meter lang en heeft 2 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** Een meertouw is 18 meter lang. De Viking snijdt het in 2 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 2 welk getal uitkomt op 18.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mooringRope-3b`

- **Current prompt:** De Viking verdeelt bij Touwrol 49 touwlussen over 7 gelijke groepen. Hoeveel touwlussen krijgt elke groep?
- **Replacement prompt:** De Viking verdeelt 49 touwlussen eerlijk over 7 boten. Hoeveel touwlussen krijgt iedere boot?
- **Replacement hintMinnie:** Verdeel 49 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 49.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mooringRope-4a`

- **Current prompt:** De Viking verdeelt bij Touwrol 42 touwlussen over 6 gelijke groepen. Hoeveel touwlussen krijgt elke groep?
- **Replacement prompt:** De Viking verdeelt 42 touwlussen eerlijk over 6 boten. Hoeveel touwlussen krijgt iedere boot?
- **Replacement hintMinnie:** Verdeel 42 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 42.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mooringRope-4b`

- **Current prompt:** De Viking legt bij Touwrol 8 groepjes van 6 touwlussen. Hoeveel touwlussen zijn dat samen?
- **Replacement prompt:** De Viking maakt 8 bundels van 6 touwlussen. Hoeveel touwlussen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 8 × 5 en tel er nog 8 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `gateShield-1a`

- **Current prompt:** De Viking legt bij Poortschild 4 groepjes van 9 schildtekens. Hoeveel schildtekens zijn dat samen?
- **Replacement prompt:** Op 4 poortschilden staan elk 9 runentekens. Hoeveel runentekens zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 4 × 10 en haal er daarna 4 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `gateShield-3a`

- **Current prompt:** De Viking legt bij Poortschild 7 groepjes van 8 schildtekens. Hoeveel schildtekens zijn dat samen?
- **Replacement prompt:** Op 7 poortschilden staan elk 8 runentekens. Hoeveel runentekens zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 7 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `gateShield-4b`

- **Current prompt:** De Viking legt bij Poortschild 4 groepjes van 2 schildtekens. Hoeveel schildtekens zijn dat samen?
- **Replacement prompt:** Op 4 poortschilden staan elk 2 runentekens. Hoeveel runentekens zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 2.
- **Replacement hintMoose:** Verdubbel 4.
- **Keep unchanged:** all other fields not explicitly replaced above.

# De Nautilus

## LVL-0004 — De Nautilus

### `harborMap-2b`

- **Current prompt:** Nemo legt bij Havenkaart 7 groepjes van 6 routefiches. Hoeveel routefiches zijn dat samen?
- **Replacement prompt:** Op de havenkaart staan 7 routes met elk 6 meetpunten. Hoeveel meetpunten staan er in totaal?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 7 × 5 en tel er nog 7 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `harborMap-4a`

- **Current prompt:** Nemo legt bij Havenkaart 9 groepjes van 5 routefiches. Hoeveel routefiches zijn dat samen?
- **Replacement prompt:** Op de havenkaart staan 9 routes met elk 5 meetpunten. Hoeveel meetpunten staan er in totaal?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 5.
- **Replacement hintMoose:** Tel 9 sprongen van 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `brassTelescope-3b`

- **Current prompt:** Nemo legt bij Koperen kijker 5 groepjes van 10 kijkkaarten. Hoeveel kijkkaarten zijn dat samen?
- **Replacement prompt:** Nemo bekijkt 5 sterrenbeelden met elk 10 heldere sterren. Hoeveel sterren ziet hij?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 10.
- **Replacement hintMoose:** Vermenigvuldig 5 met 10: zet een nul achter 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `brassTelescope-4a`

- **Current prompt:** Nemo legt bij Koperen kijker 9 groepjes van 5 kijkkaarten. Hoeveel kijkkaarten zijn dat samen?
- **Replacement prompt:** Nemo bekijkt 9 sterrenbeelden met elk 5 heldere sterren. Hoeveel sterren ziet hij?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 5.
- **Replacement hintMoose:** Tel 9 sprongen van 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `brassTelescope-4b`

- **Current prompt:** Nemo legt bij Koperen kijker 3 groepjes van 6 kijkkaarten. Hoeveel kijkkaarten zijn dat samen?
- **Replacement prompt:** Nemo bekijkt 3 sterrenbeelden met elk 6 heldere sterren. Hoeveel sterren ziet hij?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 3 × 5 en tel er nog 3 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `nautilusLight-1a`

- **Current prompt:** Nemo koopt 8 havenkaarten voor 10 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Nemo koopt 8 reservelampen voor 10 munten per stuk. Hoeveel munten betaalt hij?
- **Replacement hintMinnie:** Er zijn 8 gelijke bedragen van 10 munten.
- **Replacement hintMoose:** Vermenigvuldig 8 met 10: zet een nul achter 8.
- **Replacement explanation:** 8 × 10 = 80 munten.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `nautilusLight-3a`

- **Current prompt:** De route bij Nautiluslamp is 16 meter lang en heeft 8 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** Een kabel naar de Nautiluslamp is 16 meter lang. Hij wordt in 8 gelijke stukken verdeeld. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 8 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 8 welk getal uitkomt op 16.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `nautilusLight-3b`

- **Current prompt:** Nemo legt bij Nautiluslamp 9 groepjes van 6 lichtfiches. Hoeveel lichtfiches zijn dat samen?
- **Replacement prompt:** De Nautiluslamp heeft 9 ringen met elk 6 lichtpunten. Hoeveel lichtpunten zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 9 × 5 en tel er nog 9 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0005 — Aan boord

### `captainChart-1a`

- **Current prompt:** Nemo legt bij Kapiteinskaart 8 groepjes van 10 koersfiches. Hoeveel koersfiches zijn dat samen?
- **Replacement prompt:** Op de kapiteinskaart staan 8 routes met elk 10 koerspunten. Hoeveel koerspunten staan er in totaal?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 10.
- **Replacement hintMoose:** Vermenigvuldig 8 met 10: zet een nul achter 8.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `captainChart-2a`

- **Current prompt:** Nemo verdeelt bij Kapiteinskaart 36 koersfiches over 6 gelijke groepen. Hoeveel koersfiches krijgt elke groep?
- **Replacement prompt:** Nemo verdeelt 36 koerspunten eerlijk over 6 routes. Hoeveel koerspunten krijgt iedere route?
- **Replacement hintMinnie:** Verdeel 36 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 36.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `captainChart-2b`

- **Current prompt:** Nemo legt bij Kapiteinskaart 4 groepjes van 3 koersfiches. Hoeveel koersfiches zijn dat samen?
- **Replacement prompt:** Op de kapiteinskaart staan 4 routes met elk 3 koerspunten. Hoeveel koerspunten staan er in totaal?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 3.
- **Replacement hintMoose:** Verdubbel 4 en tel er nog 4 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mainPorthole-1a`

- **Current prompt:** Nemo legt bij Groot raam 4 groepjes van 6 raamfiches. Hoeveel raamfiches zijn dat samen?
- **Replacement prompt:** Door het grote raam zwemmen 4 scholen met elk 6 vissen. Hoeveel vissen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 4 × 5 en tel er nog 4 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mainPorthole-1b`

- **Current prompt:** Nemo verdeelt bij Groot raam 42 raamfiches over 7 gelijke groepen. Hoeveel raamfiches krijgt elke groep?
- **Replacement prompt:** Door het grote raam zwemmen 42 vissen in 7 even grote scholen. Hoeveel vissen zitten in iedere school?
- **Replacement hintMinnie:** Verdeel 42 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 42.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mainPorthole-2b`

- **Current prompt:** Nemo legt bij Groot raam 9 groepjes van 8 raamfiches. Hoeveel raamfiches zijn dat samen?
- **Replacement prompt:** Door het grote raam zwemmen 9 scholen met elk 8 vissen. Hoeveel vissen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 9 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `mainPorthole-3b`

- **Current prompt:** Nemo verdeelt bij Groot raam 36 raamfiches over 9 gelijke groepen. Hoeveel raamfiches krijgt elke groep?
- **Replacement prompt:** Door het grote raam zwemmen 36 vissen in 9 even grote scholen. Hoeveel vissen zitten in iedere school?
- **Replacement hintMinnie:** Verdeel 36 eerlijk over 9 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 9 welk getal uitkomt op 36.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `logbookDesk-1a`

- **Current prompt:** Nemo verdeelt bij Logboektafel 8 logboekkaarten over 4 gelijke groepen. Hoeveel logboekkaarten krijgt elke groep?
- **Replacement prompt:** Nemo verdeelt 8 aantekeningen over 4 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina?
- **Replacement hintMinnie:** Verdeel 8 eerlijk over 4 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 4 welk getal uitkomt op 8.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `logbookDesk-2a`

- **Current prompt:** Nemo verdeelt bij Logboektafel 36 logboekkaarten over 6 gelijke groepen. Hoeveel logboekkaarten krijgt elke groep?
- **Replacement prompt:** Nemo verdeelt 36 aantekeningen over 6 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina?
- **Replacement hintMinnie:** Verdeel 36 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 36.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `logbookDesk-3a`

- **Current prompt:** Nemo legt bij Logboektafel 2 groepjes van 8 logboekkaarten. Hoeveel logboekkaarten zijn dat samen?
- **Replacement prompt:** In het logboek staan 2 pagina's met elk 8 aantekeningen. Hoeveel aantekeningen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 2 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 2 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `logbookDesk-4b`

- **Current prompt:** Nemo legt bij Logboektafel 4 groepjes van 7 logboekkaarten. Hoeveel logboekkaarten zijn dat samen?
- **Replacement prompt:** In het logboek staan 4 pagina's met elk 7 aantekeningen. Hoeveel aantekeningen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0006 — De Minisub

### `divingSuit-2b`

- **Current prompt:** Nemo legt bij Duikpak 5 groepjes van 4 koperen sluitingen. Hoeveel koperen sluitingen zijn dat samen?
- **Replacement prompt:** Aan 5 duikpakken zitten elk 4 koperen sluitingen. Hoeveel sluitingen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 5 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `divingSuit-3a`

- **Current prompt:** Nemo verdeelt bij Duikpak 15 koperen sluitingen over 3 gelijke groepen. Hoeveel koperen sluitingen krijgt elke groep?
- **Replacement prompt:** Nemo verdeelt 15 koperen sluitingen eerlijk over 3 duikpakken. Hoeveel sluitingen krijgt ieder pak?
- **Replacement hintMinnie:** Verdeel 15 eerlijk over 3 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 3 welk getal uitkomt op 15.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `divingSuit-3b`

- **Current prompt:** Nemo verdeelt bij Duikpak 10 koperen sluitingen over 2 gelijke groepen. Hoeveel koperen sluitingen krijgt elke groep?
- **Replacement prompt:** Nemo verdeelt 10 koperen sluitingen eerlijk over 2 duikpakken. Hoeveel sluitingen krijgt ieder pak?
- **Replacement hintMinnie:** Verdeel 10 eerlijk over 2 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 2 welk getal uitkomt op 10.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `divingSuit-4b`

- **Current prompt:** Nemo legt bij Duikpak 6 groepjes van 9 koperen sluitingen. Hoeveel koperen sluitingen zijn dat samen?
- **Replacement prompt:** Aan 6 duikpakken zitten elk 9 koperen sluitingen. Hoeveel sluitingen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 6 × 10 en haal er daarna 6 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `miniSub-4a`

- **Current prompt:** Nemo koopt 2 havenkaarten voor 6 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Nemo koopt 2 reserveonderdelen voor de minisub. Elk onderdeel kost 6 munten. Hoeveel munten betaalt hij?
- **Replacement hintMinnie:** Er zijn 2 gelijke bedragen van 6 munten.
- **Replacement hintMoose:** Reken 2 × 5 en tel er nog 2 bij op.
- **Replacement explanation:** 2 × 6 = 12 munten.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `controlPanel-2a`

- **Current prompt:** Nemo legt bij Drukpaneel 4 groepjes van 4 controlefiches. Hoeveel controlefiches zijn dat samen?
- **Replacement prompt:** Het bedieningspaneel heeft 4 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 4 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `controlPanel-3a`

- **Current prompt:** Nemo legt bij Drukpaneel 9 groepjes van 7 controlefiches. Hoeveel controlefiches zijn dat samen?
- **Replacement prompt:** Het bedieningspaneel heeft 9 rijen met elk 7 schakelaars. Hoeveel schakelaars zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 9 × 5 en 9 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `controlPanel-3b`

- **Current prompt:** Nemo legt bij Drukpaneel 5 groepjes van 2 controlefiches. Hoeveel controlefiches zijn dat samen?
- **Replacement prompt:** Het bedieningspaneel heeft 5 rijen met elk 2 schakelaars. Hoeveel schakelaars zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 2.
- **Replacement hintMoose:** Verdubbel 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `controlPanel-4a`

- **Current prompt:** Nemo legt bij Drukpaneel 5 groepjes van 9 controlefiches. Hoeveel controlefiches zijn dat samen?
- **Replacement prompt:** Het bedieningspaneel heeft 5 rijen met elk 9 schakelaars. Hoeveel schakelaars zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 5 × 10 en haal er daarna 5 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `controlPanel-4b`

- **Current prompt:** Nemo legt bij Drukpaneel 9 groepjes van 4 controlefiches. Hoeveel controlefiches zijn dat samen?
- **Replacement prompt:** Het bedieningspaneel heeft 9 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 9 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0007 — Het Tropische Eiland

### `islandWheel-2b`

- **Current prompt:** De route bij Stuurwiel is 20 meter lang en heeft 4 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** Een touw bij het stuurwiel is 20 meter lang. Nemo verdeelt het in 4 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 4 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 4 welk getal uitkomt op 20.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `islandWheel-3b`

- **Current prompt:** Nemo verdeelt bij Stuurwiel 18 koersfiches over 3 gelijke groepen. Hoeveel koersfiches krijgt elke groep?
- **Replacement prompt:** Nemo verdeelt 18 koerskaarten eerlijk over 3 reddingsboten. Hoeveel kaarten krijgt iedere boot?
- **Replacement hintMinnie:** Verdeel 18 eerlijk over 3 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 3 welk getal uitkomt op 18.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `islandWheel-4a`

- **Current prompt:** Nemo verdeelt bij Stuurwiel 21 koersfiches over 7 gelijke groepen. Hoeveel koersfiches krijgt elke groep?
- **Replacement prompt:** Nemo verdeelt 21 koerskaarten eerlijk over 7 reddingsboten. Hoeveel kaarten krijgt iedere boot?
- **Replacement hintMinnie:** Verdeel 21 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 21.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `islandMap-4b`

- **Current prompt:** Nemo legt bij Eilandkaart 7 groepjes van 2 routefiches. Hoeveel routefiches zijn dat samen?
- **Replacement prompt:** Op de eilandkaart staan 7 routes met elk 2 herkenningspunten. Hoeveel herkenningspunten zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 2.
- **Replacement hintMoose:** Verdubbel 7.
- **Keep unchanged:** all other fields not explicitly replaced above.

# De Blokkenpoort

## LVL-0008 — De Blokkenpoort

### `diamondSword-3a`

- **Current prompt:** Dutchtuber Job verdeelt bij Diamantzwaard 35 diamantblokken over 7 gelijke groepen. Hoeveel diamantblokken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 35 diamantblokken eerlijk over 7 kisten. Hoeveel blokken gaan in iedere kist?
- **Replacement hintMinnie:** Verdeel 35 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 35.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `diamondSword-3b`

- **Current prompt:** Dutchtuber Job verdeelt bij Diamantzwaard 30 diamantblokken over 6 gelijke groepen. Hoeveel diamantblokken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 30 diamantblokken eerlijk over 6 kisten. Hoeveel blokken gaan in iedere kist?
- **Replacement hintMinnie:** Verdeel 30 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 30.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `creeperMask-2b`

- **Current prompt:** Dutchtuber Job legt bij Creepermasker 6 groepjes van 9 groene blokken. Hoeveel groene blokken zijn dat samen?
- **Replacement prompt:** Job bouwt 6 creepermaskers met elk 9 groene blokken. Hoeveel blokken gebruikt hij?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 6 × 10 en haal er daarna 6 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `creeperMask-3b`

- **Current prompt:** Dutchtuber Job legt bij Creepermasker 5 groepjes van 6 groene blokken. Hoeveel groene blokken zijn dat samen?
- **Replacement prompt:** Job bouwt 5 creepermaskers met elk 6 groene blokken. Hoeveel blokken gebruikt hij?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 5 × 5 en tel er nog 5 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `enderPortal-2a`

- **Current prompt:** Dutchtuber Job legt bij Donkere poort 6 groepjes van 10 portaalstenen. Hoeveel portaalstenen zijn dat samen?
- **Replacement prompt:** Voor de donkere poort bouwt Job 6 rijen van 10 portaalstenen. Hoeveel portaalstenen gebruikt hij?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 10.
- **Replacement hintMoose:** Vermenigvuldig 6 met 10: zet een nul achter 6.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `enderPortal-2b`

- **Current prompt:** Dutchtuber Job legt bij Donkere poort 3 groepjes van 6 portaalstenen. Hoeveel portaalstenen zijn dat samen?
- **Replacement prompt:** Voor de donkere poort bouwt Job 3 rijen van 6 portaalstenen. Hoeveel portaalstenen gebruikt hij?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 3 × 5 en tel er nog 3 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `enderPortal-3a`

- **Current prompt:** Dutchtuber Job legt bij Donkere poort 7 groepjes van 9 portaalstenen. Hoeveel portaalstenen zijn dat samen?
- **Replacement prompt:** Voor de donkere poort bouwt Job 7 rijen van 9 portaalstenen. Hoeveel portaalstenen gebruikt hij?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 7 × 10 en haal er daarna 7 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `enderPortal-4b`

- **Current prompt:** Dutchtuber Job verdeelt bij Donkere poort 42 portaalstenen over 6 gelijke groepen. Hoeveel portaalstenen krijgt elke groep?
- **Replacement prompt:** Job verdeelt 42 portaalstenen eerlijk over 6 rijen. Hoeveel stenen komen in iedere rij?
- **Replacement hintMinnie:** Verdeel 42 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 42.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0009 — De Ontwaakte Kamer

### `worldMap-1a`

- **Current prompt:** Dutchtuber Job legt bij Wereldkaart 8 groepjes van 6 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- **Replacement prompt:** Op de wereldkaart markeert Job 8 routes met elk 6 routeblokjes. Hoeveel routeblokjes gebruikt hij?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 8 × 5 en tel er nog 8 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `worldMap-3b`

- **Current prompt:** Dutchtuber Job verdeelt bij Wereldkaart 72 routeblokjes over 9 gelijke groepen. Hoeveel routeblokjes krijgt elke groep?
- **Replacement prompt:** Job verdeelt 72 routeblokjes eerlijk over 9 routes. Hoeveel blokjes krijgt iedere route?
- **Replacement hintMinnie:** Verdeel 72 eerlijk over 9 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 9 welk getal uitkomt op 72.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `openBook-2b`

- **Current prompt:** Dutchtuber Job verdeelt bij Open boek 36 betovertekens over 4 gelijke groepen. Hoeveel betovertekens krijgt elke groep?
- **Replacement prompt:** Job verdeelt 36 betovertekens over 4 pagina's. Op iedere pagina komen er evenveel. Hoeveel tekens per pagina?
- **Replacement hintMinnie:** Verdeel 36 eerlijk over 4 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 4 welk getal uitkomt op 36.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `openBook-3b`

- **Current prompt:** Dutchtuber Job legt bij Open boek 7 groepjes van 8 betovertekens. Hoeveel betovertekens zijn dat samen?
- **Replacement prompt:** In het open boek staan 7 pagina's met elk 8 betovertekens. Hoeveel tekens zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 7 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `crystalCase-1a`

- **Current prompt:** Dutchtuber Job koopt 4 bouwkaarten voor 10 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Job koopt 4 kristaldozen voor 10 munten per stuk. Hoeveel munten betaalt hij?
- **Replacement hintMinnie:** Er zijn 4 gelijke bedragen van 10 munten.
- **Replacement hintMoose:** Vermenigvuldig 4 met 10: zet een nul achter 4.
- **Replacement explanation:** 4 × 10 = 40 munten.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `crystalCase-3b`

- **Current prompt:** Dutchtuber Job legt bij Kristalkast 4 groepjes van 5 kristalscherven. Hoeveel kristalscherven zijn dat samen?
- **Replacement prompt:** In de kristalkast staan 4 bakjes met elk 5 kristalscherven. Hoeveel scherven zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 5.
- **Replacement hintMoose:** Tel 4 sprongen van 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `crystalCase-4b`

- **Current prompt:** Dutchtuber Job legt bij Kristalkast 6 groepjes van 5 kristalscherven. Hoeveel kristalscherven zijn dat samen?
- **Replacement prompt:** In de kristalkast staan 6 bakjes met elk 5 kristalscherven. Hoeveel scherven zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 5.
- **Replacement hintMoose:** Tel 6 sprongen van 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0010 — De Strandkamer

### `treasureMap-1a`

- **Current prompt:** De route bij Schatkaart is 8 meter lang en heeft 2 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** De schatroute is 8 meter lang en bestaat uit 2 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 2 welk getal uitkomt op 8.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `treasureMap-2b`

- **Current prompt:** Dutchtuber Job legt bij Schatkaart 4 groepjes van 7 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- **Replacement prompt:** Op de schatkaart staan 4 routes met elk 7 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `treasureMap-3a`

- **Current prompt:** Dutchtuber Job legt bij Schatkaart 7 groepjes van 9 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- **Replacement prompt:** Op de schatkaart staan 7 routes met elk 9 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 7 × 10 en haal er daarna 7 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `sandCastle-2a`

- **Current prompt:** Dutchtuber Job koopt 2 bouwkaarten voor 6 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Job koopt 2 bouwscheppen voor 6 munten per stuk. Hoeveel munten betaalt hij?
- **Replacement hintMinnie:** Er zijn 2 gelijke bedragen van 6 munten.
- **Replacement hintMoose:** Reken 2 × 5 en tel er nog 2 bij op.
- **Replacement explanation:** 2 × 6 = 12 munten.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `sandCastle-2b`

- **Current prompt:** Dutchtuber Job legt bij Zandkasteel 9 groepjes van 4 zandblokken. Hoeveel zandblokken zijn dat samen?
- **Replacement prompt:** Het zandkasteel heeft 9 torens met elk 4 zandblokken. Hoeveel blokken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 9 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `sandCastle-3b`

- **Current prompt:** Dutchtuber Job legt bij Zandkasteel 7 groepjes van 8 zandblokken. Hoeveel zandblokken zijn dat samen?
- **Replacement prompt:** Het zandkasteel heeft 7 torens met elk 8 zandblokken. Hoeveel blokken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 7 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `sandCastle-4b`

- **Current prompt:** Dutchtuber Job legt bij Zandkasteel 2 groepjes van 9 zandblokken. Hoeveel zandblokken zijn dat samen?
- **Replacement prompt:** Het zandkasteel heeft 2 torens met elk 9 zandblokken. Hoeveel blokken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 2 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 2 × 10 en haal er daarna 2 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `woodenBoat-1a`

- **Current prompt:** Dutchtuber Job legt bij Houten boot 9 groepjes van 7 bouwplanken. Hoeveel bouwplanken zijn dat samen?
- **Replacement prompt:** Voor de houten boot maakt Job 9 stapels van 7 bouwplanken. Hoeveel planken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 9 × 5 en 9 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `woodenBoat-2b`

- **Current prompt:** Dutchtuber Job legt bij Houten boot 8 groepjes van 3 bouwplanken. Hoeveel bouwplanken zijn dat samen?
- **Replacement prompt:** Voor de houten boot maakt Job 8 stapels van 3 bouwplanken. Hoeveel planken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 3.
- **Replacement hintMoose:** Verdubbel 8 en tel er nog 8 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `woodenBoat-3b`

- **Current prompt:** Dutchtuber Job legt bij Houten boot 7 groepjes van 8 bouwplanken. Hoeveel bouwplanken zijn dat samen?
- **Replacement prompt:** Voor de houten boot maakt Job 7 stapels van 8 bouwplanken. Hoeveel planken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 7 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `woodenBoat-4a`

- **Current prompt:** Dutchtuber Job verdeelt bij Houten boot 25 bouwplanken over 5 gelijke groepen. Hoeveel bouwplanken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 25 bouwplanken eerlijk over 5 bouwers. Hoeveel planken krijgt iedere bouwer?
- **Replacement hintMinnie:** Verdeel 25 eerlijk over 5 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 5 welk getal uitkomt op 25.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0011 — De Netherproef

### `potionTable-1b`

- **Current prompt:** Dutchtuber Job legt bij Brouwtafel 2 groepjes van 7 drankflesjes. Hoeveel drankflesjes zijn dat samen?
- **Replacement prompt:** Op de brouwtafel staan 2 rekken met elk 7 drankflesjes. Hoeveel flesjes zijn dat samen?
- **Replacement hintMinnie:** Er zijn 2 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 2 × 5 en 2 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `potionTable-3a`

- **Current prompt:** De route bij Brouwtafel is 63 meter lang en heeft 9 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** De veilige route vanaf de brouwtafel is 63 meter lang en bestaat uit 9 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 9 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 9 welk getal uitkomt op 63.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `potionTable-4a`

- **Current prompt:** Dutchtuber Job verdeelt bij Brouwtafel 25 drankflesjes over 5 gelijke groepen. Hoeveel drankflesjes krijgt elke groep?
- **Replacement prompt:** Job verdeelt 25 drankflesjes eerlijk over 5 rekken. Hoeveel flesjes komen in ieder rek?
- **Replacement hintMinnie:** Verdeel 25 eerlijk over 5 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 5 welk getal uitkomt op 25.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherOrb-2a`

- **Current prompt:** Dutchtuber Job legt bij Netherbol 3 groepjes van 7 gloeiblokken. Hoeveel gloeiblokken zijn dat samen?
- **Replacement prompt:** Rond de Netherbol staan 3 ringen met elk 7 gloeiblokken. Hoeveel blokken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 3 × 5 en 3 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherOrb-2b`

- **Current prompt:** Dutchtuber Job verdeelt bij Netherbol 54 gloeiblokken over 9 gelijke groepen. Hoeveel gloeiblokken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 54 gloeiblokken eerlijk over 9 ringen rond de Netherbol. Hoeveel blokken komen in iedere ring?
- **Replacement hintMinnie:** Verdeel 54 eerlijk over 9 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 9 welk getal uitkomt op 54.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherOrb-3a`

- **Current prompt:** Dutchtuber Job legt bij Netherbol 4 groepjes van 6 gloeiblokken. Hoeveel gloeiblokken zijn dat samen?
- **Replacement prompt:** Rond de Netherbol staan 4 ringen met elk 6 gloeiblokken. Hoeveel blokken zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 4 × 5 en tel er nog 4 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherMap-1b`

- **Current prompt:** Dutchtuber Job verdeelt bij Lavakaart 24 routeblokken over 8 gelijke groepen. Hoeveel routeblokken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 24 routeblokken eerlijk over 8 routes op de lavakaart. Hoeveel blokken krijgt iedere route?
- **Replacement hintMinnie:** Verdeel 24 eerlijk over 8 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 8 welk getal uitkomt op 24.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherMap-2b`

- **Current prompt:** Dutchtuber Job legt bij Lavakaart 4 groepjes van 7 routeblokken. Hoeveel routeblokken zijn dat samen?
- **Replacement prompt:** Op de lavakaart markeert Job 4 routes met elk 7 routeblokken. Hoeveel routeblokken gebruikt hij?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherMap-3a`

- **Current prompt:** Dutchtuber Job legt bij Lavakaart 6 groepjes van 8 routeblokken. Hoeveel routeblokken zijn dat samen?
- **Replacement prompt:** Op de lavakaart markeert Job 6 routes met elk 8 routeblokken. Hoeveel routeblokken gebruikt hij?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 6 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherMap-3b`

- **Current prompt:** Dutchtuber Job verdeelt bij Lavakaart 56 routeblokken over 8 gelijke groepen. Hoeveel routeblokken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 56 routeblokken eerlijk over 8 routes op de lavakaart. Hoeveel blokken krijgt iedere route?
- **Replacement hintMinnie:** Verdeel 56 eerlijk over 8 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 8 welk getal uitkomt op 56.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `netherMap-4b`

- **Current prompt:** Dutchtuber Job verdeelt bij Lavakaart 56 routeblokken over 7 gelijke groepen. Hoeveel routeblokken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 56 routeblokken eerlijk over 7 routes op de lavakaart. Hoeveel blokken krijgt iedere route?
- **Replacement hintMinnie:** Verdeel 56 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 56.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0012 — De Weg Naar Huis

### `homeMap-3b`

- **Current prompt:** Dutchtuber Job koopt 7 bouwkaarten voor 8 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Job koopt 7 bouwkaarten voor 8 munten per stuk. Hoeveel munten betaalt hij?
- **Replacement hintMinnie:** Er zijn 7 gelijke bedragen van 8 munten.
- **Replacement hintMoose:** Verdubbel 7 drie keer.
- **Replacement explanation:** 7 × 8 = 56 munten.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `homeMap-4a`

- **Current prompt:** Dutchtuber Job legt bij Thuiskaart 8 groepjes van 8 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- **Replacement prompt:** Op de thuiskaart staan 8 routes met elk 8 routeblokjes. Hoeveel routeblokjes zijn dat samen?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 8 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `enchantTable-1b`

- **Current prompt:** Dutchtuber Job verdeelt bij Betovertafel 54 betoverboeken over 6 gelijke groepen. Hoeveel betoverboeken krijgt elke groep?
- **Replacement prompt:** Job verdeelt 54 betoverboeken eerlijk over 6 boekenkisten. Hoeveel boeken gaan in iedere kist?
- **Replacement hintMinnie:** Verdeel 54 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 54.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `purplePortal-3a`

- **Current prompt:** De route bij Paars portaal is 80 meter lang en heeft 10 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** De tunnel door het paarse portaal is 80 meter lang en bestaat uit 10 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 10 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 10 welk getal uitkomt op 80.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `purplePortal-4b`

- **Current prompt:** Dutchtuber Job legt bij Paars portaal 3 groepjes van 2 portaalblokken. Hoeveel portaalblokken zijn dat samen?
- **Replacement prompt:** Job bouwt 3 ringen met elk 2 portaalblokken. Hoeveel blokken gebruikt hij?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 2.
- **Replacement hintMoose:** Verdubbel 3.
- **Keep unchanged:** all other fields not explicitly replaced above.

# De Reis door Europa

## LVL-0013 — Nederland — Het Begin van de Reis

### `windmill-2a`

- **Current prompt:** Atlas legt bij Windmolen 9 groepjes van 9 molenfiches. Hoeveel molenfiches zijn dat samen?
- **Replacement prompt:** De molenaar vult 9 zakken met elk 9 scheppen graan. Hoeveel scheppen graan zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 9 × 10 en haal er daarna 9 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `windmill-2b`

- **Current prompt:** Atlas legt bij Windmolen 6 groepjes van 5 molenfiches. Hoeveel molenfiches zijn dat samen?
- **Replacement prompt:** De molenaar vult 6 zakken met elk 5 scheppen graan. Hoeveel scheppen graan zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 5.
- **Replacement hintMoose:** Tel 6 sprongen van 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `windmill-3a`

- **Current prompt:** Atlas koopt 3 routekaarten voor 9 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Atlas koopt 3 zakjes meel voor 9 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement hintMinnie:** Er zijn 3 gelijke bedragen van 9 euro.
- **Replacement hintMoose:** Reken 3 × 10 en haal er daarna 3 af.
- **Replacement explanation:** 3 × 9 = 27 euro.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `cheese-cart-2a`

- **Current prompt:** Atlas verdeelt bij Kaaswagen 16 kaasjes over 4 gelijke groepen. Hoeveel kaasjes krijgt elke groep?
- **Replacement prompt:** De kaasboer verdeelt 16 kaasjes eerlijk over 4 planken. Hoeveel kaasjes liggen op iedere plank?
- **Replacement hintMinnie:** Verdeel 16 eerlijk over 4 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 4 welk getal uitkomt op 16.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `cheese-cart-2b`

- **Current prompt:** Atlas legt bij Kaaswagen 2 groepjes van 9 kaasjes. Hoeveel kaasjes zijn dat samen?
- **Replacement prompt:** Op 2 planken liggen elk 9 kaasjes. Hoeveel kaasjes zijn dat samen?
- **Replacement hintMinnie:** Er zijn 2 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 2 × 10 en haal er daarna 2 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `cheese-cart-3b`

- **Current prompt:** Atlas verdeelt bij Kaaswagen 14 kaasjes over 7 gelijke groepen. Hoeveel kaasjes krijgt elke groep?
- **Replacement prompt:** De kaasboer verdeelt 14 kaasjes eerlijk over 7 planken. Hoeveel kaasjes liggen op iedere plank?
- **Replacement hintMinnie:** Verdeel 14 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 14.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0014 — Engeland — De Oude Klokkenstad

### `telescope-1b`

- **Current prompt:** Atlas verdeelt bij Koperen telescoop 30 kijkpunten over 6 gelijke groepen. Hoeveel kijkpunten krijgt elke groep?
- **Replacement prompt:** Atlas verdeelt 30 sterrenstickers over 6 sterrenkaarten. Op iedere kaart komen er evenveel. Hoeveel stickers per kaart?
- **Replacement hintMinnie:** Verdeel 30 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 30.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `telescope-4a`

- **Current prompt:** Atlas legt bij Koperen telescoop 2 groepjes van 6 kijkpunten. Hoeveel kijkpunten zijn dat samen?
- **Replacement prompt:** Op 2 sterrenkaarten staan elk 6 sterren. Hoeveel sterren zijn dat samen?
- **Replacement hintMinnie:** Er zijn 2 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 2 × 5 en tel er nog 2 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `telescope-4b`

- **Current prompt:** Atlas legt bij Koperen telescoop 5 groepjes van 8 kijkpunten. Hoeveel kijkpunten zijn dat samen?
- **Replacement prompt:** Op 5 sterrenkaarten staan elk 8 sterren. Hoeveel sterren zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 5 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `postbox-1b`

- **Current prompt:** Atlas verdeelt bij Rode brievenbus 72 postkaarten over 9 gelijke groepen. Hoeveel postkaarten krijgt elke groep?
- **Replacement prompt:** De postbode verdeelt 72 postkaarten eerlijk over 9 postzakken. Hoeveel kaarten gaan in iedere zak?
- **Replacement hintMinnie:** Verdeel 72 eerlijk over 9 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 9 welk getal uitkomt op 72.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `postbox-4a`

- **Current prompt:** Atlas legt bij Rode brievenbus 6 groepjes van 2 postkaarten. Hoeveel postkaarten zijn dat samen?
- **Replacement prompt:** In 6 postzakken zitten elk 2 postkaarten. Hoeveel postkaarten zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 2.
- **Replacement hintMoose:** Verdubbel 6.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0015 — Frankrijk — Het Zonnige Dorpsplein

### `market-stall-2a`

- **Current prompt:** De route bij Marktkraam is 4 meter lang en heeft 2 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** Een lint van 4 meter wordt in 2 gelijke stukken geknipt voor de marktkraam. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 2 welk getal uitkomt op 4.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `market-stall-4a`

- **Current prompt:** Atlas legt bij Marktkraam 5 groepjes van 9 marktkistjes. Hoeveel marktkistjes zijn dat samen?
- **Replacement prompt:** Bij de marktkraam staan 5 kisten met elk 9 appels. Hoeveel appels zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 5 × 10 en haal er daarna 5 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `fountain-1a`

- **Current prompt:** Atlas verdeelt bij Dorpsfontein 27 waterfiches over 3 gelijke groepen. Hoeveel waterfiches krijgt elke groep?
- **Replacement prompt:** De dorpsfontein heeft 3 bakken met samen 27 waterlelies. In iedere bak liggen er evenveel. Hoeveel waterlelies liggen in één bak?
- **Replacement hintMinnie:** Verdeel 27 eerlijk over 3 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 3 welk getal uitkomt op 27.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `fountain-4a`

- **Current prompt:** Atlas verdeelt bij Dorpsfontein 32 waterfiches over 8 gelijke groepen. Hoeveel waterfiches krijgt elke groep?
- **Replacement prompt:** De dorpsfontein heeft 8 bakken met samen 32 waterlelies. In iedere bak liggen er evenveel. Hoeveel waterlelies liggen in één bak?
- **Replacement hintMinnie:** Verdeel 32 eerlijk over 8 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 8 welk getal uitkomt op 32.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0016 — Italië — De Romeinse Route

### `colosseum-1b`

- **Current prompt:** Atlas legt bij Colosseum 2 groepjes van 3 boogfiches. Hoeveel boogfiches zijn dat samen?
- **Replacement prompt:** Het Colosseum heeft 2 rijen met elk 3 bogen. Hoeveel bogen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 2 gelijke groepjes. In elk groepje zitten er 3.
- **Replacement hintMoose:** Verdubbel 2 en tel er nog 2 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `colosseum-2a`

- **Current prompt:** Atlas verdeelt bij Colosseum 81 boogfiches over 9 gelijke groepen. Hoeveel boogfiches krijgt elke groep?
- **Replacement prompt:** In het Colosseum zijn 81 zitplaatsen verdeeld over 9 rijen. Hoeveel zitplaatsen zijn er per rij?
- **Replacement hintMinnie:** Verdeel 81 eerlijk over 9 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 9 welk getal uitkomt op 81.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `colosseum-4a`

- **Current prompt:** Atlas legt bij Colosseum 5 groepjes van 9 boogfiches. Hoeveel boogfiches zijn dat samen?
- **Replacement prompt:** Het Colosseum heeft 5 rijen met elk 9 bogen. Hoeveel bogen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 5 × 10 en haal er daarna 5 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `roman-fountain-1b`

- **Current prompt:** Atlas koopt 3 routekaarten voor 4 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Atlas koopt 3 ansichtkaarten van de fontein voor 4 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement hintMinnie:** Er zijn 3 gelijke bedragen van 4 euro.
- **Replacement hintMoose:** Verdubbel 3 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `roman-fountain-2b`

- **Current prompt:** Atlas legt bij Romeinse fontein 7 groepjes van 6 waterfiches. Hoeveel waterfiches zijn dat samen?
- **Replacement prompt:** Rond de Romeinse fontein liggen 7 mozaïekstroken met elk 6 tegels. Hoeveel tegels zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 7 × 5 en tel er nog 7 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `roman-fountain-3b`

- **Current prompt:** De route bij Romeinse fontein is 14 meter lang en heeft 7 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** De rand van de Romeinse fontein is 14 meter lang en verdeeld in 7 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 7 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 14.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `roman-fountain-4b`

- **Current prompt:** Atlas legt bij Romeinse fontein 5 groepjes van 8 waterfiches. Hoeveel waterfiches zijn dat samen?
- **Replacement prompt:** Rond de Romeinse fontein liggen 5 mozaïekstroken met elk 8 tegels. Hoeveel tegels zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 5 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `gelato-cart-3b`

- **Current prompt:** Atlas verdeelt bij Gelatokar 54 ijsbekers over 6 gelijke groepen. Hoeveel ijsbekers krijgt elke groep?
- **Replacement prompt:** De ijsverkoper verdeelt 54 ijsbekers over 6 dienbladen. Op ieder blad komen er evenveel. Hoeveel bekers per dienblad?
- **Replacement hintMinnie:** Verdeel 54 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 54.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `gelato-cart-4a`

- **Current prompt:** Atlas legt bij Gelatokar 5 groepjes van 9 ijsbekers. Hoeveel ijsbekers zijn dat samen?
- **Replacement prompt:** De ijsverkoper zet 5 dienbladen klaar met elk 9 ijsbekers. Hoeveel bekers zijn dat samen?
- **Replacement hintMinnie:** Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 5 × 10 en haal er daarna 5 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0017 — Oostenrijk — De Alpenpoort

### `alpine-fountain-2b`

- **Current prompt:** Atlas verdeelt bij Alpenfontein 20 waterfiches over 4 gelijke groepen. Hoeveel waterfiches krijgt elke groep?
- **Replacement prompt:** Rond de Alpenfontein staan 4 bloembakken met samen 20 bloemen. In iedere bak staan er evenveel. Hoeveel bloemen per bak?
- **Replacement hintMinnie:** Verdeel 20 eerlijk over 4 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 4 welk getal uitkomt op 20.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `alpine-fountain-4a`

- **Current prompt:** Atlas legt bij Alpenfontein 9 groepjes van 5 waterfiches. Hoeveel waterfiches zijn dat samen?
- **Replacement prompt:** Rond de Alpenfontein staan 9 bloembakken met elk 5 bloemen. Hoeveel bloemen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 5.
- **Replacement hintMoose:** Tel 9 sprongen van 5.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `cable-car-1b`

- **Current prompt:** Atlas koopt 8 routekaarten voor 9 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Atlas koopt 8 kabelbaankaartjes voor 9 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement hintMinnie:** Er zijn 8 gelijke bedragen van 9 euro.
- **Replacement hintMoose:** Reken 8 × 10 en haal er daarna 8 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `cable-car-2b`

- **Current prompt:** Atlas legt bij Rode kabelbaan 4 groepjes van 3 kabelbaankaartjes. Hoeveel kabelbaankaartjes zijn dat samen?
- **Replacement prompt:** Er rijden 4 kabelbaancabines met elk 3 reizigers. Hoeveel reizigers zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 3.
- **Replacement hintMoose:** Verdubbel 4 en tel er nog 4 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `cable-car-3a`

- **Current prompt:** Atlas legt bij Rode kabelbaan 6 groepjes van 4 kabelbaankaartjes. Hoeveel kabelbaankaartjes zijn dat samen?
- **Replacement prompt:** Er rijden 6 kabelbaancabines met elk 4 reizigers. Hoeveel reizigers zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 6 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `cable-car-4b`

- **Current prompt:** Atlas legt bij Rode kabelbaan 4 groepjes van 7 kabelbaankaartjes. Hoeveel kabelbaankaartjes zijn dat samen?
- **Replacement prompt:** Er rijden 4 kabelbaancabines met elk 7 reizigers. Hoeveel reizigers zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0018 — Noorwegen — Het Fjordlicht

### `stave-church-3a`

- **Current prompt:** Atlas verdeelt bij Houten staafkerk 15 houten plankjes over 3 gelijke groepen. Hoeveel houten plankjes krijgt elke groep?
- **Replacement prompt:** De timmerman verdeelt 15 houten plankjes eerlijk over 3 deuren. Hoeveel plankjes gebruikt hij per deur?
- **Replacement hintMinnie:** Verdeel 15 eerlijk over 3 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 3 welk getal uitkomt op 15.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `lighthouse-1a`

- **Current prompt:** Atlas verdeelt bij Fjordvuurtoren 48 lichtfiches over 8 gelijke groepen. Hoeveel lichtfiches krijgt elke groep?
- **Replacement prompt:** De vuurtoren heeft 8 ramen met samen 48 lichtjes. In ieder raam branden er evenveel. Hoeveel lichtjes per raam?
- **Replacement hintMinnie:** Verdeel 48 eerlijk over 8 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 8 welk getal uitkomt op 48.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `lighthouse-3b`

- **Current prompt:** Atlas legt bij Fjordvuurtoren 7 groepjes van 4 lichtfiches. Hoeveel lichtfiches zijn dat samen?
- **Replacement prompt:** De vuurtoren heeft 7 ringen met elk 4 lampen. Hoeveel lampen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 4.
- **Replacement hintMoose:** Verdubbel 7 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `viking-ship-2b`

- **Current prompt:** Atlas legt bij Vikingschip 8 groepjes van 7 scheepskisten. Hoeveel scheepskisten zijn dat samen?
- **Replacement prompt:** Op het Vikingschip staan 8 rijen met elk 7 scheepskisten. Hoeveel kisten zijn dat samen?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0019 — Zweden — Het Dorp aan het Water

### `dala-horse-1a`

- **Current prompt:** Atlas verdeelt bij Dalapaard 24 verfkaartjes over 6 gelijke groepen. Hoeveel verfkaartjes krijgt elke groep?
- **Replacement prompt:** De schilder verdeelt 24 verfstrepen over 6 banen op het Dalapaard. Op iedere baan komen er evenveel. Hoeveel strepen per baan?
- **Replacement hintMinnie:** Verdeel 24 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 24.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `dala-horse-2a`

- **Current prompt:** Atlas legt bij Dalapaard 7 groepjes van 7 verfkaartjes. Hoeveel verfkaartjes zijn dat samen?
- **Replacement prompt:** Het Dalapaard heeft 7 banen met elk 7 verfstrepen. Hoeveel verfstrepen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 7 × 5 en 7 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `dala-horse-4a`

- **Current prompt:** Atlas legt bij Dalapaard 6 groepjes van 2 verfkaartjes. Hoeveel verfkaartjes zijn dat samen?
- **Replacement prompt:** Het Dalapaard heeft 6 banen met elk 2 verfstrepen. Hoeveel verfstrepen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 2.
- **Replacement hintMoose:** Verdubbel 6.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `dala-horse-4b`

- **Current prompt:** Atlas verdeelt bij Dalapaard 18 verfkaartjes over 6 gelijke groepen. Hoeveel verfkaartjes krijgt elke groep?
- **Replacement prompt:** De schilder verdeelt 18 verfstrepen over 6 banen op het Dalapaard. Op iedere baan komen er evenveel. Hoeveel strepen per baan?
- **Replacement hintMinnie:** Verdeel 18 eerlijk over 6 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 6 welk getal uitkomt op 18.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `maypole-2b`

- **Current prompt:** Atlas legt bij Zweedse meiboom 8 groepjes van 7 bloemenlinten. Hoeveel bloemenlinten zijn dat samen?
- **Replacement prompt:** Aan de meiboom hangen 8 bloemenkransen met elk 7 bloemen. Hoeveel bloemen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `maypole-3a`

- **Current prompt:** Atlas legt bij Zweedse meiboom 9 groepjes van 7 bloemenlinten. Hoeveel bloemenlinten zijn dat samen?
- **Replacement prompt:** Aan de meiboom hangen 9 bloemenkransen met elk 7 bloemen. Hoeveel bloemen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 9 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 9 × 5 en 9 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `maypole-4a`

- **Current prompt:** Atlas legt bij Zweedse meiboom 3 groepjes van 7 bloemenlinten. Hoeveel bloemenlinten zijn dat samen?
- **Replacement prompt:** Aan de meiboom hangen 3 bloemenkransen met elk 7 bloemen. Hoeveel bloemen zijn dat samen?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 3 × 5 en 3 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

## LVL-0020 — Rheden — Terug naar de Posbank

### `map-board-1a`

- **Current prompt:** Atlas verdeelt bij Posbankkaart 35 routepunten over 7 gelijke groepen. Hoeveel routepunten krijgt elke groep?
- **Replacement prompt:** Op de Posbankkaart zijn 35 routepunten verdeeld over 7 wandelroutes. Hoeveel routepunten staan er per route?
- **Replacement hintMinnie:** Verdeel 35 eerlijk over 7 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 7 welk getal uitkomt op 35.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `map-board-2a`

- **Current prompt:** Atlas legt bij Posbankkaart 6 groepjes van 6 routepunten. Hoeveel routepunten zijn dat samen?
- **Replacement prompt:** Op de Posbankkaart staan 6 wandelroutes met elk 6 routepunten. Hoeveel routepunten zijn dat samen?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 6.
- **Replacement hintMoose:** Reken 6 × 5 en tel er nog 6 bij op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `map-board-2b`

- **Current prompt:** Atlas legt bij Posbankkaart 8 groepjes van 7 routepunten. Hoeveel routepunten zijn dat samen?
- **Replacement prompt:** Op de Posbankkaart staan 8 wandelroutes met elk 7 routepunten. Hoeveel routepunten zijn dat samen?
- **Replacement hintMinnie:** Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.
- **Replacement hintMoose:** Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `map-board-4a`

- **Current prompt:** Atlas legt bij Posbankkaart 4 groepjes van 8 routepunten. Hoeveel routepunten zijn dat samen?
- **Replacement prompt:** Op de Posbankkaart staan 4 wandelroutes met elk 8 routepunten. Hoeveel routepunten zijn dat samen?
- **Replacement hintMinnie:** Er zijn 4 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 4 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `telescope-1a`

- **Current prompt:** Atlas legt bij Heidekijker 6 groepjes van 8 kijkpunten. Hoeveel kijkpunten zijn dat samen?
- **Replacement prompt:** Door de heidekijker ziet Atlas 6 zwermen met elk 8 vogels. Hoeveel vogels ziet hij?
- **Replacement hintMinnie:** Er zijn 6 gelijke groepjes. In elk groepje zitten er 8.
- **Replacement hintMoose:** Verdubbel 6 drie keer.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `telescope-2b`

- **Current prompt:** De route bij Heidekijker is 6 meter lang en heeft 2 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** Het pad naar de heidekijker is 6 meter lang en bestaat uit 2 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 2 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 2 welk getal uitkomt op 6.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `telescope-3a`

- **Current prompt:** Atlas koopt 6 routekaarten voor 4 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement prompt:** Atlas koopt 6 wandelkaarten voor 4 euro per stuk. Hoeveel euro betaalt hij?
- **Replacement hintMinnie:** Er zijn 6 gelijke bedragen van 4 euro.
- **Replacement hintMoose:** Verdubbel 6 en verdubbel de uitkomst nog eens.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `deer-statue-1a`

- **Current prompt:** Atlas legt bij Hertenbeeld 7 groepjes van 9 wandelkaartjes. Hoeveel wandelkaartjes zijn dat samen?
- **Replacement prompt:** Bij het hertenbeeld staan 7 informatieborden met elk 9 wandeltekens. Hoeveel wandeltekens zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 9.
- **Replacement hintMoose:** Reken 7 × 10 en haal er daarna 7 af.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `deer-statue-1b`

- **Current prompt:** Atlas verdeelt bij Hertenbeeld 18 wandelkaartjes over 2 gelijke groepen. Hoeveel wandelkaartjes krijgt elke groep?
- **Replacement prompt:** Atlas verdeelt 18 wandelkaartjes eerlijk over 2 groepen wandelaars. Hoeveel kaartjes krijgt iedere groep?
- **Replacement hintMinnie:** Verdeel 18 eerlijk over 2 gelijke groepen.
- **Replacement hintMoose:** Zoek in de tafel van 2 welk getal uitkomt op 18.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `deer-statue-2b`

- **Current prompt:** Atlas legt bij Hertenbeeld 3 groepjes van 10 wandelkaartjes. Hoeveel wandelkaartjes zijn dat samen?
- **Replacement prompt:** Bij het hertenbeeld staan 3 informatieborden met elk 10 wandeltekens. Hoeveel wandeltekens zijn dat samen?
- **Replacement hintMinnie:** Er zijn 3 gelijke groepjes. In elk groepje zitten er 10.
- **Replacement hintMoose:** Vermenigvuldig 3 met 10: zet een nul achter 3.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `deer-statue-3a`

- **Current prompt:** De route bij Hertenbeeld is 24 meter lang en heeft 4 gelijke stukken. Hoeveel meter is elk stuk?
- **Replacement prompt:** Het pad naar het hertenbeeld is 24 meter lang en verdeeld in 4 gelijke stukken. Hoe lang is ieder stuk?
- **Replacement hintMinnie:** Verdeel de totale lengte eerlijk over 4 gelijke stukken.
- **Replacement hintMoose:** Zoek in de tafel van 4 welk getal uitkomt op 24.
- **Keep unchanged:** all other fields not explicitly replaced above.

### `deer-statue-4b`

- **Current prompt:** Atlas legt bij Hertenbeeld 7 groepjes van 2 wandelkaartjes. Hoeveel wandelkaartjes zijn dat samen?
- **Replacement prompt:** Bij het hertenbeeld staan 7 informatieborden met elk 2 wandeltekens. Hoeveel wandeltekens zijn dat samen?
- **Replacement hintMinnie:** Er zijn 7 gelijke groepjes. In elk groepje zitten er 2.
- **Replacement hintMoose:** Verdubbel 7.
- **Keep unchanged:** all other fields not explicitly replaced above.
