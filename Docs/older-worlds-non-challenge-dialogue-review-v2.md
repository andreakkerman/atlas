# Older Atlas worlds — non-challenge companion dialogue review

Editorial baseline: the approved ARC Atlas companion model. Challenge hints are intentionally out of scope for this document.

## Summary

- Reviewed: **238** active non-challenge companion entries across **31 older levels**.
- **37 KEEP**, **126 REWRITE**, **75 REMOVE / SUPPRESS**.
- Suppress `CHALLENGE_SUCCESS` revisit chatter, `CHALLENGE_OPEN` chatter, and `LEVEL_PROGRESS_MILESTONE` chatter by default, as in ARC.
- Enable the ARC-style once-per-visit attention policy for migrated older levels so first-attention lines do not repeat on reselect.
- Keep `EXIT_BLOCKED` because it provides useful state feedback; use the progression-aware remaining count.
- Keep `PATH_UNLOCKED` because it communicates a real state change and next step.
- Leave compatibility welcomes, legacy unused guide text, and hidden `ADVENTURE_COMPLETE` copy untouched in this pass.

## Writing rules

- First test: would Minnie or Moose naturally say this out loud at this exact moment?
- Prefer one plain, concrete observation over a clever or decorative line.
- No narrator voice, pseudo-poetry, forced metaphors, or jokes added just to give a line personality.
- Avoid personifying ordinary objects unless the object is genuinely magical/animated in the scene.
- Do not claim knowledge the companions cannot reasonably have from what is visible or from established level context.
- Do not have one companion narrate the other in the third person just to create a joke.
- No decorative second sentence unless it adds useful context or genuinely natural character.
- Minnie: curious, observant, direct. Moose: practical, concise, dry only when the setup naturally supports it.
- Progression lines communicate progression. Hotspot lines react to the hotspot. Do not mix the two.
- When a simple sentence works, stop there.

## De Runenpoort

### LVL-0001 — De Runenpoort

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0011 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Kijk, blauwe tekens tussen de oude bomen. | Kijk, blauwe tekens tussen de oude bomen. |
| D0012 | AMBIENT_ATTENTION | Minnie | Bosrune | **KEEP** | Deze bossteen wijst naar de tempel. Handig, zo'n stenen wegwijzer. | Deze bossteen wijst naar de tempel. Handig, zo'n stenen wegwijzer. |
| D0013 | HOTSPOT_ATTENTION_FIRST | Minnie | Zonrune | **KEEP** | De Zonrune voelt warm. Welke som laat haar feller gloeien? | De Zonrune voelt warm. Welke som laat haar feller gloeien? |
| D0014 | HOTSPOT_ATTENTION_FIRST | Moose | Steenrune | **KEEP** | De Steenrune is zwaar en stil. Net als een steen, verrassend genoeg. | De Steenrune is zwaar en stil. Net als een steen, verrassend genoeg. |
| D0015 | HOTSPOT_ATTENTION_FIRST | Minnie | Freya | **REWRITE** | Ik ben benieuwd wat we bij deze opdracht ontdekken. | Freya staat bij de tempel. Laten we naar haar toe gaan. |
| D0016 | LEVEL_PROGRESS_MILESTONE | Moose | Level-wide event | **REMOVE / SUPPRESS** | {completed} van de {total} opdrachten voltooid. Nog {remainingChallenges} te doen. | — |
| D0017 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De poort wacht nog. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de tempelpoort open. |
| D0019 | PATH_UNLOCKED | Minnie | Level-wide event | **REWRITE** | Je kunt verder! Op naar de tempel. | De tempelpoort is open. Op naar de tempel. |
### LVL-0002 — De Tempelzaal

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0075 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Wat een zaal. Ik zie schilden, vuur en een klein schip. | Wat een zaal. Ik zie schilden, vuur en een klein schip. |
| D0076 | AMBIENT_ATTENTION | Minnie | Wandfakkel | **KEEP** | Deze fakkel brandt zonder hout. Dat is een knap tempeltrucje. | Deze fakkel brandt zonder hout. Dat is een knap tempeltrucje. |
| D0077 | HOTSPOT_ATTENTION_FIRST | Moose | Schildenmuur | **KEEP** | De schilden hangen in rijen. Tellen is veiliger dan ermee zwaaien. | De schilden hangen in rijen. Tellen is veiliger dan ermee zwaaien. |
| D0078 | HOTSPOT_ATTENTION_FIRST | Minnie | Kaarttafel | **REWRITE** | Op de kaart lopen routes door elkaar. Welke som vindt de goede weg? | Op de kaart lopen allerlei routes door elkaar. |
| D0079 | HOTSPOT_ATTENTION_FIRST | Moose | Vuurschaal | **REWRITE** | De vuurschaal springt in groepjes. Handen thuis, hoofd aan. | Die vuurschaal brandt flink. Niet te dichtbij. |
| D0080 | HOTSPOT_ATTENTION_FIRST | Minnie | Scheepsmodel | **KEEP** | Het kleine schip heeft veel riemen. Ik wil weten hoeveel precies. | Het kleine schip heeft veel riemen. Ik wil weten hoeveel precies. |
| D0081 | LEVEL_PROGRESS_MILESTONE | Moose | Level-wide event | **REMOVE / SUPPRESS** | {completed} van de {total} tempelproeven voltooid. Nog {remainingChallenges} te doen. | — |
| D0082 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De havendeur wacht nog. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de havendeur open. |
| D0084 | PATH_UNLOCKED | Minnie | Level-wide event | **REWRITE** | Je kunt verder! De havendeur kan nu open. | De havendeur is open. Op naar de Vikinghaven. |
### LVL-0003 — De Vikinghaven

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0154 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Ik hoor water, touwen en een schip dat wil vertrekken. | Water, touwen en een schip bij de steiger. We zijn in de haven. |
| D0155 | HOTSPOT_ATTENTION_FIRST | Moose | Touwrol | **KEEP** | Een nette rol touw. In een haven is dat bijna verdacht netjes. | Een nette rol touw. In een haven is dat bijna verdacht netjes. |
| D0156 | HOTSPOT_ATTENTION_FIRST | Minnie | Havenkaart | **REWRITE** | De havenkaart staat vol steigers. Welke som maakt de route duidelijk? | Die havenkaart staat vol steigers en routes. |
| D0157 | HOTSPOT_ATTENTION_FIRST | Minnie | Scheepsklok | **KEEP** | De scheepsklok toont de vertrektijd. Kun jij hem lezen? | De scheepsklok toont de vertrektijd. Kun jij hem lezen? |
| D0158 | HOTSPOT_ATTENTION_FIRST | Minnie | Eivar | **REWRITE** | Deze havenproef vraagt om een scherp oog. We kijken samen. | Eivar staat bij de steiger. Laten we naar hem toe gaan. |
| D0159 | LEVEL_PROGRESS_MILESTONE | Moose | Level-wide event | **REMOVE / SUPPRESS** | {completed} van de {total} havenproeven voltooid. Nog {remainingChallenges} te doen. | — |
| D0160 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De vertrekpoort wacht nog. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de vertrekpoort open. |
| D0162 | PATH_UNLOCKED | Minnie | Level-wide event | **REWRITE** | Je kunt verder! Op naar de vertrekpoort. | De vertrekpoort is open. We kunnen gaan. |
## De Nautilus

### LVL-0004 — De Nautilus

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0224 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Oeh, de Nautilus glanst alsof hij ons al ziet. | Daar ligt de Nautilus. Je ziet hem al van ver. |
| D0225 | HOTSPOT_ATTENTION_FIRST | Minnie | Havenkaart | **KEEP** | Die havenkaart zit vol lijnen. Welke route hoort bij de Nautilus? | Die havenkaart zit vol lijnen. Welke route hoort bij de Nautilus? |
| D0226 | HOTSPOT_ATTENTION_FIRST | Moose | Koperen kijker | **REWRITE** | Een koperen kijker. Handig, zolang niemand naar meeuwen telt. | Met die koperen kijker zie je een heel eind over het water. |
| D0227 | HOTSPOT_ATTENTION_FIRST | Minnie | Nautiluslamp | **REWRITE** | Dat blauwe licht knippert in een patroon. Ik wil het weten. | Dat blauwe licht knippert. Kijk, steeds hetzelfde patroon. |
| D0228 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Die is geregeld. Nemo houdt van netjes. | — |
| D0229 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Mooi! De Nautilus geeft steeds meer licht. | — |
| D0230 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De steigerpoort blijft dicht. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kunnen we aan boord. |
| D0231 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Alles klopt. Sven mag naar de Nautilus. | Alles klaar. Op naar de Nautilus. |
### LVL-0005 — Aan boord

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0287 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Wauw, zelfs de muren klinken alsof we onder zee zijn. | Hoor je dat? Alles galmt hier. |
| D0288 | HOTSPOT_ATTENTION_FIRST | Moose | Kapiteinskaart | **KEEP** | De kapiteinskaart ligt precies recht. Natuurlijk. | De kapiteinskaart ligt precies recht. Natuurlijk. |
| D0289 | HOTSPOT_ATTENTION_FIRST | Minnie | Groot raam | **KEEP** | Dat grote raam zit vol blauw licht en voorbijzwemmende schaduwen. | Dat grote raam zit vol blauw licht en voorbijzwemmende schaduwen. |
| D0290 | HOTSPOT_ATTENTION_FIRST | Moose | Logboektafel | **REWRITE** | Een logboek op een vaste plek. Nemo verrast niemand. | Nemo's logboek ligt precies op zijn plek. |
| D0291 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Afgerond. Het schip bromt tevreden. | — |
| D0292 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Weer een opdracht voltooid. De salon voelt minder geheimzinnig. | — |
| D0293 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De ronde deur blijft dicht. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kan de ronde deur open. |
| D0294 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De salon is klaar. De ronde deur kan open. | De ronde deur is open. We kunnen verder. |
### LVL-0006 — De Minisub

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0350 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Een kleine duikboot in een grote duikboot. Perfect. | Een kleine duikboot in een grote duikboot. Perfect. |
| D0351 | HOTSPOT_ATTENTION_FIRST | Moose | Duikpak | **REWRITE** | Dat duikpak ziet er zwaar uit. Gelukkig hoeft Minnie er niet in. | Dat duikpak ziet er zwaar uit. Ik pas. |
| D0352 | HOTSPOT_ATTENTION_FIRST | Minnie | Minisub | **REWRITE** | De minisub wacht echt op ons. Kijk naar die koperen buik! | Kijk, daar is de minisub. Je ziet alle koperen platen. |
| D0353 | HOTSPOT_ATTENTION_FIRST | Moose | Drukpaneel | **REWRITE** | Veel meters. Eén nette oplossing. Dat scheelt gedoe. | Dat paneel staat vol meters. Even kijken wat ze aangeven. |
| D0354 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Die staat goed. De druk blijft waar hij hoort. | — |
| D0355 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | We komen dichter bij het luik. Ik voel het. | — |
| D0356 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | Het luik blijft dicht. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kan het luik open. |
| D0357 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De druk klopt. Het luik kan veilig open. | De meters staan goed. We kunnen het luik openen. |
### LVL-0007 — Het Tropische Eiland

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0414 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Zonlicht! Deze grot heeft eindelijk goede manieren. | Zonlicht! We zijn bijna buiten. |
| D0415 | HOTSPOT_ATTENTION_FIRST | Moose | Sloep | **KEEP** | Die sloep drijft nog. Dat is alvast één goed teken. | Die sloep drijft nog. Dat is alvast één goed teken. |
| D0416 | HOTSPOT_ATTENTION_FIRST | Minnie | Stuurwiel | **REWRITE** | Een stuurwiel in een grot. Daar zit een route achter. | Een stuurwiel in een grot. Die valt wel op. |
| D0417 | HOTSPOT_ATTENTION_FIRST | Moose | Eilandkaart | **REWRITE** | De eilandkaart is droog. Iemand dacht vooruit. | De kaart is nog goed leesbaar. Handig. |
| D0418 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Die route staat vast. Niet uitglijden bij het vieren. | — |
| D0419 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Het zonlicht komt dichterbij. Bijna buiten! | — |
| D0420 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De eilandpoort wacht nog. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kunnen we naar buiten. |
| D0421 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De route klopt. Sven kan naar buiten. | De route is vrij. We kunnen naar buiten. |
## De Reis door Europa

### LVL-0013 — Nederland — Het Begin van de Reis

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0784 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Tulpen, water en een molen. De reis begint meteen mooi. | Tulpen, water en een molen. De reis begint meteen mooi. |
| D0785 | HOTSPOT_ATTENTION_FIRST | Minnie | Windmolen | **REWRITE** | Die molen zwaait met vier grote armen. Volgens mij telt hij mee. | Kijk hoe groot die vier wieken zijn. |
| D0786 | HOTSPOT_ATTENTION_FIRST | Minnie | Kaaswagen | **REWRITE** | Al die kazen staan in keurige stapels. Daar verstopt zich vast een som. | Al die kazen liggen in keurige stapels. |
| D0787 | HOTSPOT_ATTENTION_FIRST | Minnie | Grachtenklok | **REWRITE** | Die klok kijkt over de gracht alsof hij precies weet wanneer we weggaan. | Die klok is vanaf de hele gracht te zien. |
| D0788 | CHALLENGE_SUCCESS | Moose | Windmolen | **REMOVE / SUPPRESS** | De molen draait al keurig. Nog een zetje wordt vooral veel wind. | — |
| D0789 | CHALLENGE_SUCCESS | Moose | Kaaswagen | **REMOVE / SUPPRESS** | De kaas ligt al op volgorde. Zelfs Moose zou niets meer verschuiven. | — |
| D0790 | CHALLENGE_SUCCESS | Moose | Grachtenklok | **REMOVE / SUPPRESS** | De klok loopt al op tijd. Dat gebeurt niet vaak op een groot avontuur. | — |
| D0791 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De route krijgt kleur. Engeland komt dichterbij. | — |
| D0792 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De reispoort wacht nog op {remainingChallenges}. De poort is geduldig. Ik ook. | Nog {remainingChallenges} te gaan. Daarna kan de reispoort open. |
| D0793 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De reispoort is klaar. Engeland is de volgende halte. | De reispoort is open. Engeland is de volgende halte. |
### LVL-0014 — Engeland — De Oude Klokkenstad

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0842 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | De hele stad lijkt van goud. Zelfs de klok doet plechtig. | Wat een gouden licht. Die oude klokkentoren valt meteen op. |
| D0843 | HOTSPOT_ATTENTION_FIRST | Minnie | Oude klokkentoren | **REWRITE** | Die klok heeft vast al duizend reizigers gezien. En nu ons. | Die oude klok hangt hier al heel lang. |
| D0844 | HOTSPOT_ATTENTION_FIRST | Minnie | Koperen telescoop | **REWRITE** | Door die koperen kijker kunnen we misschien Frankrijk al zien. | Door die koperen kijker zie je een heel eind. |
| D0845 | HOTSPOT_ATTENTION_FIRST | Minnie | Rode brievenbus | **REWRITE** | Zo rood kun je bijna niet verdwalen. Handig voor een brievenbus. | Die rode brievenbus valt niet te missen. |
| D0846 | AMBIENT_ATTENTION_FIRST | Minnie | Reiskristal | **REWRITE** | Dat kristal vangt alle kleuren van de stad. Een klein stukje avondlicht in steen. | Dat kristal vangt alle kleuren van de stad. |
| D0847 | CHALLENGE_SUCCESS | Moose | Oude klokkentoren | **REMOVE / SUPPRESS** | De oude klok loopt al goed. Nog eens rekenen maakt hem niet jonger. | — |
| D0848 | CHALLENGE_SUCCESS | Moose | Koperen telescoop | **REMOVE / SUPPRESS** | De telescoop staat al scherp. Ik zie vooral dat hij zwaar is. | — |
| D0849 | CHALLENGE_SUCCESS | Moose | Rode brievenbus | **REMOVE / SUPPRESS** | De post is al gesorteerd. Zelfs de brieven weten waarheen. | — |
| D0850 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De klokkenstad geeft haar route stukje voor stukje prijs. | — |
| D0851 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De collegepoort wacht nog op {remainingChallenges}. Oude poorten haasten zich nooit. | Nog {remainingChallenges} te gaan. Daarna kan de collegepoort open. |
| D0852 | PATH_UNLOCKED | Moose | Level-wide event | **KEEP** | De collegepoort is open. Frankrijk ligt voor ons. | De collegepoort is open. Frankrijk ligt voor ons. |
### LVL-0015 — Frankrijk — Het Zonnige Dorpsplein

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0902 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Dit plein heeft bloemen op bijna elke vrije steen. Knap werk. | Dit plein staat vol bloemen. Zelfs tussen de stenen. |
| D0903 | HOTSPOT_ATTENTION_FIRST | Minnie | Marktkraam | **REWRITE** | Die markt is bijna een regenboog van groente. Een eetbare regenboog. | Die marktkraam zit vol kleur. |
| D0904 | HOTSPOT_ATTENTION_FIRST | Minnie | Dorpsklok | **REWRITE** | Die klok kan het hele plein zien. Misschien zag hij onze route ook. | Die dorpsklok is vanaf het hele plein te zien. |
| D0905 | HOTSPOT_ATTENTION_FIRST | Minnie | Dorpsfontein | **REWRITE** | Het water springt precies in patronen. Dat doet een fontein niet zomaar. | Het water springt steeds in hetzelfde patroon. |
| D0906 | CHALLENGE_SUCCESS | Moose | Marktkraam | **REMOVE / SUPPRESS** | De kratten staan al netjes. Ik keur deze markt praktisch goed. | — |
| D0907 | CHALLENGE_SUCCESS | Moose | Dorpsklok | **REMOVE / SUPPRESS** | De dorpsklok heeft zijn antwoord al. Hij luidt er niet nog eens voor. | — |
| D0908 | CHALLENGE_SUCCESS | Moose | Dorpsfontein | **REMOVE / SUPPRESS** | De fontein stroomt al precies goed. Natte sokken voegen niets toe. | — |
| D0909 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De route glinstert nu tussen de bloemen door. | — |
| D0910 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De dorpspoort wacht nog op {remainingChallenges}. Hij blijft koppig Frans dicht. | Nog {remainingChallenges} te gaan. Daarna kan de dorpspoort open. |
| D0911 | PATH_UNLOCKED | Moose | Level-wide event | **KEEP** | De dorpspoort is open. Italië ligt achter de heuvels. | De dorpspoort is open. Italië ligt achter de heuvels. |
### LVL-0016 — Italië — De Romeinse Route

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0966 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Het Colosseum links en heuvels vooruit. Wat een route. | Het Colosseum links en heuvels vooruit. Wat een route. |
| D0967 | HOTSPOT_ATTENTION_FIRST | Minnie | Colosseum | **REWRITE** | Zoveel bogen boven elkaar. Oude Romeinen hielden duidelijk van tellen. | Kijk hoeveel bogen er boven elkaar staan. |
| D0968 | HOTSPOT_ATTENTION_FIRST | Minnie | Romeinse fontein | **REWRITE** | De fontein kabbelt alsof hij een oud verhaal in stukjes vertelt. | Die Romeinse fontein zit vol kleine details. |
| D0969 | HOTSPOT_ATTENTION_FIRST | Minnie | Gelatokar | **REWRITE** | Ik zie ijs in vijf kleuren. Onderzoek is nu dringend nodig. | Kijk hoeveel kleuren ijs! |
| D0970 | AMBIENT_ATTENTION_FIRST | Moose | Druivenpers | **REWRITE** | Een druivenpers. Veel draaien voor een klein glas sap. Degelijk werk. | Een druivenpers. Daar moet je flink voor draaien. |
| D0971 | CHALLENGE_SUCCESS | Moose | Colosseum | **REMOVE / SUPPRESS** | Het Colosseum staat al eeuwen goed. Vandaag hoeft er niets bij. | — |
| D0972 | CHALLENGE_SUCCESS | Moose | Romeinse fontein | **REMOVE / SUPPRESS** | De fontein kent zijn patroon al. En ja, het blijft nat. | — |
| D0973 | CHALLENGE_SUCCESS | Moose | Gelatokar | **REMOVE / SUPPRESS** | De ijsjes zijn al geteld. Moose noemt dat voorraadbeheer. | — |
| D0974 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De Romeinse route licht op tussen de druiven. | — |
| D0975 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De Romeinse poort wacht nog op {remainingChallenges}. Oude bouw, strenge regels. | Nog {remainingChallenges} te gaan. Daarna kan de Romeinse poort open. |
| D0976 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De Romeinse poort is open. De Alpen wachten. | De Romeinse poort is open. Op naar de Alpen. |
### LVL-0017 — Oostenrijk — De Alpenpoort

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1032 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | De bergen zijn enorm. Zelfs Moose kijkt een beetje omhoog. | Die bergen zijn enorm. Ik moet helemaal omhoog kijken. |
| D1033 | HOTSPOT_ATTENTION_FIRST | Minnie | Alpenklokhuis | **REWRITE** | Die klok is bijna zo groot als het huis. Te laat komen lijkt hier lastig. | Die klok is bijna zo groot als het huis. |
| D1034 | HOTSPOT_ATTENTION_FIRST | Minnie | Alpenfontein | **REWRITE** | Dat bergwater ziet er ijskoud uit. Mijn snor voelt het al. | Dat bergwater ziet er ijskoud uit. |
| D1035 | HOTSPOT_ATTENTION_FIRST | Minnie | Rode kabelbaan | **KEEP** | Een huisje aan een draad! Ik wil weten hoe het boven blijft. | Een huisje aan een draad! Ik wil weten hoe het boven blijft. |
| D1036 | CHALLENGE_SUCCESS | Moose | Alpenklokhuis | **REMOVE / SUPPRESS** | De Alpenklok loopt al precies. Bergen houden blijkbaar van stiptheid. | — |
| D1037 | CHALLENGE_SUCCESS | Moose | Alpenfontein | **REMOVE / SUPPRESS** | De fontein stroomt al goed. Mijn poten blijven graag droog. | — |
| D1038 | CHALLENGE_SUCCESS | Moose | Rode kabelbaan | **REMOVE / SUPPRESS** | De kabelbaan kent de route al. Ik geef de voorkeur aan vaste grond. | — |
| D1039 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De noordroute klimt steeds helderder langs de bergen. | — |
| D1040 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De Alpenpoort wacht nog op {remainingChallenges}. Bergen geven niets cadeau. | Nog {remainingChallenges} te gaan. Daarna kan de Alpenpoort open. |
| D1041 | PATH_UNLOCKED | Moose | Level-wide event | **KEEP** | De Alpenpoort is open. Tijd voor het fjord. | De Alpenpoort is open. Tijd voor het fjord. |
### LVL-0018 — Noorwegen — Het Fjordlicht

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1093 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Het fjord glanst alsof de zon hier nog even wil blijven. | Wat een uitzicht. Het fjord glanst nog in het avondlicht. |
| D1094 | HOTSPOT_ATTENTION_FIRST | Minnie | Houten staafkerk | **REWRITE** | Dat houten dak heeft daken op daken. Alsof de kerk een berg nadoet. | Kijk hoeveel lagen dat houten dak heeft. |
| D1095 | HOTSPOT_ATTENTION_FIRST | Minnie | Fjordvuurtoren | **REWRITE** | Dat licht veegt over het hele fjord. Misschien pakt het onze route mee. | Die vuurtoren is van ver over het fjord te zien. |
| D1096 | HOTSPOT_ATTENTION_FIRST | Minnie | Vikingschip | **REWRITE** | Die drakenkop kijkt alsof hij de hele overtocht al gepland heeft. | Die drakenkop voorop valt meteen op. |
| D1097 | CHALLENGE_SUCCESS | Moose | Houten staafkerk | **REMOVE / SUPPRESS** | De kerk staat stevig en de som is klaar. Geen plank meer nodig. | — |
| D1098 | CHALLENGE_SUCCESS | Moose | Fjordvuurtoren | **REMOVE / SUPPRESS** | De vuurtoren schijnt al goed. Meer licht wordt gewoon verblindend. | — |
| D1099 | CHALLENGE_SUCCESS | Moose | Vikingschip | **REMOVE / SUPPRESS** | Het schip is al klaar. De draak hoeft niet nóg trotser te kijken. | — |
| D1100 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Het fjordlicht tekent de route steeds verder over het water. | — |
| D1101 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De fjordpoort wacht nog op {remainingChallenges}. De rode deur blijft nors. | Nog {remainingChallenges} te gaan. Daarna kan de fjordpoort open. |
| D1102 | PATH_UNLOCKED | Moose | Level-wide event | **KEEP** | De fjordpoort is open. Zweden ligt verderop. | De fjordpoort is open. Zweden ligt verderop. |
### LVL-0019 — Zweden — Het Dorp aan het Water

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1154 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Dit dorp lijkt een ansichtkaart met extra veel bloemen. | Wat een kleurrijk dorp. Overal bloemen. |
| D1155 | HOTSPOT_ATTENTION_FIRST | Minnie | Dalapaard | **REWRITE** | Dat rode paard staat zó stil dat het vast iets geheimhoudt. | Dat rode Dalapaard valt meteen op. |
| D1156 | HOTSPOT_ATTENTION_FIRST | Minnie | Zweedse meiboom | **REWRITE** | Die bloemencirkels hangen precies gelijk. Dat ruikt naar een patroon. | Die bloemencirkels hangen heel netjes en gelijk. |
| D1157 | HOTSPOT_ATTENTION_FIRST | Minnie | Havenklok | **REWRITE** | Die klok houdt de boten én de tijd in de gaten. Druk beroep. | Die havenklok is vanaf het water goed te zien. |
| D1158 | CHALLENGE_SUCCESS | Moose | Dalapaard | **REMOVE / SUPPRESS** | Het Dalapaard is al klaar. Rennen was toch niet zijn plan. | — |
| D1159 | CHALLENGE_SUCCESS | Moose | Zweedse meiboom | **REMOVE / SUPPRESS** | De kransen hangen al netjes. Meer draaien maakt iedereen duizelig. | — |
| D1160 | CHALLENGE_SUCCESS | Moose | Havenklok | **REMOVE / SUPPRESS** | De havenklok loopt al goed. De boten hoeven niet nog eens te wachten. | — |
| D1161 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De thuisroute schittert al tussen de Zweedse vlaggen. | — |
| D1162 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De havenpoort wacht nog op {remainingChallenges}. Thuis loopt niet weg. | Nog {remainingChallenges} te gaan. Daarna kan de havenpoort open. |
| D1163 | PATH_UNLOCKED | Moose | Level-wide event | **KEEP** | De havenpoort is open. Nu terug naar Rheden. | De havenpoort is open. Nu terug naar Rheden. |
### LVL-0020 — Rheden — Terug naar de Posbank

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1218 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Paarse heide en bekende bomen. We zijn weer op de Posbank! | Paarse heide en bekende bomen. We zijn weer op de Posbank! |
| D1219 | HOTSPOT_ATTENTION_FIRST | Minnie | Posbankkaart | **REWRITE** | Deze kaart kent elk paadje. Misschien tekent hij onze hele reis erbij. | Op deze kaart staan al die bekende paadjes. We zijn echt weer thuis. |
| D1220 | HOTSPOT_ATTENTION_FIRST | Minnie | Heidekijker | **REWRITE** | Door deze kijker zie je vast waar we allemaal zijn geweest. Bijna dan. | Met deze kijker zie je een flink stuk van de heide. |
| D1221 | HOTSPOT_ATTENTION_FIRST | Minnie | Hertenbeeld | **REWRITE** | Dat hert kijkt alsof het precies wist dat we vandaag terugkwamen. | Dat hertenbeeld staat hier nog. We zijn echt weer terug. |
| D1222 | CHALLENGE_SUCCESS | Moose | Posbankkaart | **REMOVE / SUPPRESS** | De Posbankkaart klopt al. Verdwalen zou nu echt extra werk zijn. | — |
| D1223 | CHALLENGE_SUCCESS | Moose | Heidekijker | **REMOVE / SUPPRESS** | De kijker staat al scherp. Ik zie vooral heel veel heide. | — |
| D1224 | CHALLENGE_SUCCESS | Moose | Hertenbeeld | **REMOVE / SUPPRESS** | Het hert heeft ons al gezien. Nog eens rekenen maakt het niet minder houten. | — |
| D1225 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Onze hele reis verschijnt tussen de heidevelden. | — |
| D1226 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | Het bospad wacht nog op {remainingChallenges}. Thuis heeft geen haast. | Nog {remainingChallenges} te gaan. Daarna kunnen we naar huis. |
| D1227 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Alles klopt. Het bospad brengt ons naar huis. | Alles klaar. We kunnen naar huis. |
## Leonardo’s onvoltooide atlas

### LVL-0021 — Rome

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1281 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Rome glinstert alsof de muren geheime tekeningen bewaren. | Rome. Overal liggen tekeningen en modellen van Leonardo. |
| D1282 | HOTSPOT_ATTENTION_FIRST | Moose | Optiektafel | **REWRITE** | Let op waar het licht valt. Schaduw is ook informatie. | Kijk hoe het licht door die lenzen valt. |
| D1283 | HOTSPOT_ATTENTION_FIRST | Minnie | Mechanisch model | **REWRITE** | Dat mechanische model lijkt klaar om zijn geheim te laten zien. | Dat mechanische model heeft nogal wat bewegende delen. |
| D1284 | HOTSPOT_ATTENTION_FIRST | Moose | Centrale codex | **REWRITE** | De codex ligt open. Kijk goed hoe Leonardo zijn ideeën ordende. | De codex ligt open. Leonardo heeft hier van alles in getekend. |
| D1285 | HOTSPOT_ATTENTION_FIRST | Minnie | Bouwtafel | **REWRITE** | Op die bouwtafel wacht een ontwerp dat nog afgemaakt wil worden. | Op die bouwtafel ligt een half afgemaakt ontwerp. |
| D1286 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Ha, dat vonkje snapte jij sneller dan de zon verschoof. | — |
| D1287 | LEVEL_PROGRESS_MILESTONE | Moose | Level-wide event | **REMOVE / SUPPRESS** | De atlas krijgt vorm. Nog even nauwkeurig verder onderzoeken. | — |
| D1288 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Alle tekens staan goed. Door naar de volgende poort. | Alles klaar. Door naar Proceno. |
| D1289 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De Romeinse poort wacht nog. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de Romeinse poort open. |
### LVL-0022 — Proceno

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1350 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Proceno voelt als een kasteel dat heel lang heeft nagedacht. | Kijk naar die muren en die hoge poort. Proceno is stevig gebouwd. |
| D1351 | HOTSPOT_ATTENTION_FIRST | Moose | Level-wide event | **REMOVE / SUPPRESS** | Meet met je ogen: breedte, hoogte, dan pas de sprong. | — |
| D1352 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Mooi! Er klikt bijna een steentje tevreden op zijn plek. | — |
| D1353 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Brug getest, poort vrij. Doorlopen. | De brug is klaar. Door naar Umbrie. |
| D1354 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De poortbalk blijft liggen. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de poortbalk omhoog. |
### LVL-0023 — Umbrie

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1415 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Umbrie glanst nat en stil. Die kist weet iets. | Umbrie is nat en stil. Daar staat een kist bij het water. |
| D1416 | HOTSPOT_ATTENTION_FIRST | Moose | Level-wide event | **REMOVE / SUPPRESS** | Volg de stroomrichting. Water verklapt volgorde. | — |
| D1417 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Plons, weer een geheim boven water. | — |
| D1418 | PATH_UNLOCKED | Moose | Level-wide event | **KEEP** | Sluizen klaar. We varen door. | Sluizen klaar. We varen door. |
| D1419 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De sluis blijft dicht. Hier moet nog iets op niveau komen. | Nog {remainingChallenges} te gaan. Daarna kan de sluis open. |
### LVL-0024 — Marche

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1478 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | De lucht ruikt hier naar wind, veren en een beetje durf. | Overal zie ik vleugels en vliegmachines. |
| D1479 | HOTSPOT_ATTENTION_FIRST | Moose | Level-wide event | **REMOVE / SUPPRESS** | Kijk naar de vleugelstand. Een kleine scheefstand maakt veel uit. | — |
| D1480 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Yes, dat klapte bijna als een echte testvleugel. | — |
| D1481 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Vluchtplan klopt. Naar Florence. | Alles klaar voor vertrek. Op naar Florence. |
| D1482 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De windpoort blijft dicht. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de windpoort open. |
### LVL-0025 — Florence

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1531 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Het atelier ruikt naar verfpotjes, hout en bijna-af tekeningen. | Het atelier staat vol verfpotjes, hout en half afgemaakte tekeningen. |
| D1532 | HOTSPOT_ATTENTION_FIRST | Moose | Level-wide event | **REMOVE / SUPPRESS** | Let op herhaling. Patronen zijn handige wegwijzers. | — |
| D1533 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Dat kreeg ineens kleur. Mooi gedaan, Sven. | — |
| D1534 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Perspectief klopt. Door naar Vinci. | Alles klaar in het atelier. Door naar Vinci. |
| D1535 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De atelierdeur wacht nog. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de atelierdeur open. |
### LVL-0026 — Vinci

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1572 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Vinci is stil, maar overal liggen ideeën te wachten. | Vinci is stil. Overal liggen schetsen en modellen. |
| D1573 | HOTSPOT_ATTENTION_FIRST | Moose | Level-wide event | **REMOVE / SUPPRESS** | Gebruik wat je al vond. Een finale houdt van overzicht. | — |
| D1574 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Daar gaat weer een lampje aan in de werkplaats. | — |
| D1575 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Laatste sluiting open. Netjes gedaan. | Alles klaar. We kunnen verder. |
| D1576 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De werkplaatsdeur wacht nog. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kan de werkplaatsdeur open. |
## Cairo Museum

### LVL-0027 — Cairo Museum

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1609 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Deze zaal fluistert bijna. Zie je die gouden rand? | Wat een zaal. Overal oude vondsten en gouden details. |
| D1610 | CHALLENGE_OPEN | Moose | Level-wide event | **REMOVE / SUPPRESS** | Nebu klinkt kalm. Dat helpt in een museum vol geheimen. | — |
| D1611 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Daar licht weer een oud detail op. | — |
| D1612 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | Alles klopt. De sarcofaag wacht nu op ons. | Alles klaar. We kunnen naar de sarcofaag. |
| D1613 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | Nog niet instappen. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kunnen we naar de sarcofaag. |
### LVL-0028 — Pyramid Build at Giza

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1683 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Sven, we staan echt naast een piramide in aanbouw. | Sven, we staan echt naast een piramide in aanbouw. |
| D1684 | CHALLENGE_OPEN | Moose | Level-wide event | **REMOVE / SUPPRESS** | Nebu weet waarom meten hier geen bijzaak is. | — |
| D1685 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Dat stukje bouwplan ligt nu netjes recht. | — |
| D1686 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De werkroute is vrij. Loop waar geen blok schuift. | De werkroute is vrij. We kunnen verder. |
| D1687 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | Die route blijft nog dicht. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna is de werkroute vrij. |
### LVL-0029 — Tutanchamon Tomb

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1750 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Deze kamer bewaart haar geheimen heel zacht. | Wat is het stil hier. Overal goud en oude tekens. |
| D1751 | CHALLENGE_OPEN | Moose | Level-wide event | **REMOVE / SUPPRESS** | Nebu vraagt rustig. Dat past bij deze plek. | — |
| D1752 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Een gouden detail lijkt nu net iets helderder. | — |
| D1753 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De sarcofaag geeft ruimte. Voorzichtig verder. | De doorgang is vrij. Voorzichtig verder. |
| D1754 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | Nog even niet. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kunnen we verder in de tombe. |
### LVL-0030 — Abu Simbel

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1824 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Abu Simbel voelt als het grote einde van oud Egypte. | Abu Simbel is enorm. Kijk hoe hoog die beelden zijn. |
| D1825 | CHALLENGE_OPEN | Moose | Level-wide event | **REMOVE / SUPPRESS** | Nebu leest de schaduw alsof het een regel tekst is. | — |
| D1826 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Daar schittert weer een tempelteken. | — |
| D1827 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De scarabee is klaar. Dat klinkt als thuiswerk voor een kever. | De terugweg is vrij. Tijd om naar Cairo te gaan. |
| D1828 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De scarabee blijft stil. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kunnen we terug naar Cairo. |
### LVL-0031 — Cairo Museum Return

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D1891 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Sven, dezelfde zaal. Maar nu voelt hij vriendelijker. | We zijn terug in dezelfde zaal. Alles is weer rustig. |
| D1892 | CHALLENGE_OPEN | Moose | Level-wide event | **REMOVE / SUPPRESS** | Nebu helpt nog een laatste keer. Netjes afronden. | — |
| D1893 | CHALLENGE_SUCCESS | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Dat museumdetail valt nu mooi op zijn plek. | — |
| D1894 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De uitgang is vrij. Geen oude magie meer in de weg. | De uitgang is vrij. We kunnen naar buiten. |
| D1896 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De deur wacht nog. Eerst nog {remainingChallenges} afronden. | Nog {remainingChallenges} te gaan. Daarna kunnen we naar de uitgang. |
## De Blokkenpoort

### LVL-0008 — De Blokkenpoort

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0475 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Deze blokkenkamer houdt zijn adem in. Ik hoor het bijna. | Wat een vreemde blokkenkamer. Rechts gloeit iets paars. |
| D0476 | HOTSPOT_ATTENTION_FIRST | Minnie | Diamantzwaard | **REWRITE** | Dat diamantzwaard glimt veel te trots. Er zit vast een patroon in. | Dat diamantzwaard glimt behoorlijk. |
| D0477 | HOTSPOT_ATTENTION_FIRST | Moose | Creepermasker | **KEEP** | Een Creepermasker. Ik blijf voor de zekerheid hier. | Een Creepermasker. Ik blijf voor de zekerheid hier. |
| D0478 | HOTSPOT_ATTENTION_FIRST | Minnie | Donkere poort | **KEEP** | Die donkere poort heeft paarse randjes. Heel normaal. Vast. | Die donkere poort heeft paarse randjes. Heel normaal. Vast. |
| D0479 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Deze opdracht is voltooid. De kamer kraakt goedkeurend. | — |
| D0480 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Weer een opdracht voltooid. Het paarse licht groeit. | — |
| D0481 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De rechterpoort blijft dicht. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kan de rechterpoort open. |
| D0482 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De rechterpoort reageert. Nu netjes verder. | De rechterpoort gaat open. We kunnen verder. |
### LVL-0009 — De Ontwaakte Kamer

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0537 | LEVEL_ENTER | Minnie | Level-wide event | **REWRITE** | Deze kamer leeft echt. De kristallen knipperen naar ons. | Overal knipperen kristallen. Wat een verschil. |
| D0538 | HOTSPOT_ATTENTION_FIRST | Minnie | Wereldkaart | **REWRITE** | Die wereldkaart heeft blokken én geheimen. Goede combinatie. | Die wereldkaart bestaat helemaal uit blokken. |
| D0539 | HOTSPOT_ATTENTION_FIRST | Moose | Open boek | **KEEP** | Een open boek. Scheelt weer één stap. | Een open boek. Scheelt weer één stap. |
| D0540 | HOTSPOT_ATTENTION_FIRST | Minnie | Kristalkast | **REWRITE** | De kristalkast gloeit van binnen. Alsof hij een antwoord bewaart. | De kristalkast gloeit van binnen. Die valt meteen op. |
| D0541 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Opgelost. De kettingen klinken al minder koppig. | — |
| D0542 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De kamer wordt helderder. We zitten goed. | — |
| D0543 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De ijzeren deur blijft dicht. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kan de ijzeren deur open. |
| D0544 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De deur geeft mee. Voorzichtig door. | De ijzeren deur gaat open. Voorzichtig verder. |
### LVL-0010 — De Strandkamer

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0600 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Een strand in een blokkenkamer. Iemand kon niet kiezen. | Een strand in een blokkenkamer. Iemand kon niet kiezen. |
| D0601 | HOTSPOT_ATTENTION_FIRST | Minnie | Schatkaart | **REWRITE** | Een schatkaart! Zelfs de vouwen lijken iets te vertellen. | Een schatkaart! Die moeten we bekijken. |
| D0602 | HOTSPOT_ATTENTION_FIRST | Moose | Zandkasteel | **KEEP** | Net zandkasteel. Verdacht net, eerlijk gezegd. | Net zandkasteel. Verdacht net, eerlijk gezegd. |
| D0603 | HOTSPOT_ATTENTION_FIRST | Minnie | Houten boot | **KEEP** | Dat houten bootje wijst precies naar de stenen deur. | Dat houten bootje wijst precies naar de stenen deur. |
| D0604 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Klaar. Geen zand tussen de tandwielen. | — |
| D0605 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | Weer een stap verder. Het strand heeft nog meer te ontdekken. | — |
| D0606 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De stenen deur blijft dicht. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kan de stenen deur open. |
| D0607 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De stenen deur is klaar. Warm wordt het wel. | De stenen deur is open. Op naar de Netherproef. |
### LVL-0011 — De Netherproef

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0664 | LEVEL_ENTER | Moose | Level-wide event | **KEEP** | Warm. Heel warm. Vandaag geen heldhaftige sprongen. | Warm. Heel warm. Vandaag geen heldhaftige sprongen. |
| D0665 | HOTSPOT_ATTENTION_FIRST | Minnie | Brouwtafel | **KEEP** | Die brouwtafel borrelt zonder pan. Dat wil ik begrijpen. | Die brouwtafel borrelt zonder pan. Dat wil ik begrijpen. |
| D0666 | HOTSPOT_ATTENTION_FIRST | Moose | Netherbol | **KEEP** | Die bol gloeit. Niet aanklikken met je neus. | Die bol gloeit. Niet aanklikken met je neus. |
| D0667 | HOTSPOT_ATTENTION_FIRST | Minnie | Lavakaart | **REWRITE** | De lavakaart heeft koele lijnen. Gelukkig maar. | Op die lavakaart zie je precies waar het heet wordt. |
| D0668 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Deze opdracht is voltooid. De lava mag rustig blijven. | — |
| D0669 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De paarse gloed wijst steeds duidelijker omhoog. | — |
| D0670 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De deur naar boven blijft dicht. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kunnen we naar boven. |
| D0671 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De deur naar boven opent. Mooi moment om te gaan. | De deur naar boven is open. Tijd om hier weg te gaan. |
### LVL-0012 — De Weg Naar Huis

| Ref | Event | Speaker | Context | Decision | Current | Final |
|---|---|---|---|---|---|---|
| D0726 | LEVEL_ENTER | Minnie | Level-wide event | **KEEP** | Zon, bloemen en de straat! We zijn bijna echt thuis. | Zon, bloemen en de straat! We zijn bijna echt thuis. |
| D0727 | HOTSPOT_ATTENTION_FIRST | Minnie | Thuiskaart | **REWRITE** | De thuiskaart kent de laatste bocht. Kijk hoe hij glanst. | Op die thuiskaart staat de laatste route naar huis. |
| D0728 | HOTSPOT_ATTENTION_FIRST | Moose | Betovertafel | **KEEP** | Die betovertafel fluistert. Ik doe alsof ik niets hoor. | Die betovertafel fluistert. Ik doe alsof ik niets hoor. |
| D0729 | HOTSPOT_ATTENTION_FIRST | Minnie | Paars portaal | **REWRITE** | Het paarse portaal laat de buitenlucht al schitteren. | Door dat paarse portaal zie je de buitenlucht al. |
| D0730 | CHALLENGE_SUCCESS | Moose | Level-wide event | **REMOVE / SUPPRESS** | Klaar. Nog één stap dichter bij gewone stoeptegels. | — |
| D0731 | LEVEL_PROGRESS_MILESTONE | Minnie | Level-wide event | **REMOVE / SUPPRESS** | De uitgang wordt helderder. Ik zie de straat al! | — |
| D0732 | EXIT_BLOCKED | Moose | Level-wide event | **REWRITE** | De uitgang wacht nog. Eerst nog {remainingChallenges}. | Nog {remainingChallenges} te gaan. Daarna kunnen we naar huis. |
| D0733 | PATH_UNLOCKED | Moose | Level-wide event | **REWRITE** | De uitgang is klaar. Tijd om naar huis te gaan. | De uitgang is vrij. Tijd om naar huis te gaan. |

## Implementation notes for the later Codex pass

1. Reuse the existing declarative `companionPolicy` architecture introduced for ARC; do not add world-ID branches in shared runtime.
2. Older-world `CHALLENGE_SUCCESS`, `CHALLENGE_OPEN`, and `LEVEL_PROGRESS_MILESTONE` suppression should happen before shared fallback selection, exactly as with ARC.
3. Apply once-per-visit attention consistently to the migrated attention events. If the current policy only covers a subset of attention event types, extend it minimally and test non-migrated behavior.
4. Preserve question content and challenge hints in this pass; the hint migration comes later, world by world.
5. Before applying any proposed line that names a destination or visible object, verify it against the current level source. If source reality conflicts with this editorial proposal, report the mismatch rather than improvising copy.
