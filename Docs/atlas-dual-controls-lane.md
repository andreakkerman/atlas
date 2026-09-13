# Atlas 3D: twee touchsticks en vrij bewegen op het pad

Alleen Atlas 3D krijgt een rechter kijkstick. De linker stick beweegt vooruit, achteruit en zijwaarts ten opzichte van de horizontale kijkrichting. De rechter stick draait continu zolang hij uit het midden gehouden wordt, inclusief omhoog/omlaag kijken. Beide sticks hebben een dode zone en gebruiken onafhankelijke touch-ID's. Loslaten stopt alleen de betreffende stick; annuleren, achtergrond, menu/invoerguards en opruimen stoppen de invoer veilig. Slepen op de wereld blijft beschikbaar. De bestaande toetsen blijven behouden (W/S lopen, A/D draaien). Andere 3D-modi behouden hun bestaande draaien en bediening.

De beweegbare strook is 2,4 meter breed en volgt de bestaande route naar de tempel. Dat blijft binnen het ongeveer 3 meter brede stenen pad. De speler kan langs de randen blijven lopen, maar kan niet het bos in of voorbij de bestaande route-einden. De camera volgt de bestaande routehoogte; er zijn geen nieuwe botsingsmeshes, physics, raycasts of GPU-resources. Dit is een begrensde wandelstrook, geen algemene terrein- of objectbotsing. Diagonaal bewegen verhoogt de loopsnelheid niet.

De routevoortgang blijft teruggekoppeld naar de bestaande Atlas-spelerpositie, zodat de bestaande interacties en voortgangssystemen blijven werken. Zijwaartse positie is alleen lokaal in de 3D-runtime aanwezig en vervalt bij verlaten/opnieuw laden van die modus. Een externe sprong in routevoortgang zet de camera op de nieuwe middenlijn. De bestaande wereld, routegegevens, belichting en GPU-voorbereiding zijn niet aangepast.

De actieknop staat in Atlas-touchmodus tussen de sticks, zodat de rechter stick hem niet bedekt. De bediening wordt gecontroleerd in liggende en staande weergave.

De bestaande service-worker-cacheversie is verhoogd naar `v178-atlas-dual-controls`; de preloadlijst is ongewijzigd. De hashcontrole voor de wereld in `graphics-modes.spec.js` is bijgewerkt naar het eerder gecontroleerde grasbestand, dat tijdens deze bedieningswijziging ongewijzigd blijft.

- [Liggende weergave](images/atlas-controls/landscape.png)
- [Staande weergave en actieknop](images/atlas-controls/portrait.png)

Validatie: 45 controles geslaagd (herhaalde ontwikkelruns niet meegeteld):

- 22 preset-, voorbereiding- en echte WebGPU-tabletcontroles, inclusief beide tabletmaten/DPR 2, 512×299 warm-up-aspect en afzonderlijke 1770×1101 voorbereiding.
- 2 druk-/moduswisselcontroles voor Desktop High en tablet, achtereenvolgens uitgevoerd.
- 4 opruim-/levenscycluscontroles, inclusief annuleren, pagehide en navigatie/opnieuw instappen.
- 6 WebKit-controles voor bestaande en dubbele touchinvoer en menu/navigatie, liggend en staand.
- 11 eindcontroles: echte tweevigermultitouch in WebGPU, toetsenbordcompatibiliteit, strookgrenzen/bochten/hoogtes/loopsnelheid en isolatie/opslag van grafische modi.

De eerste tweevigertestrun stuurde bij het loslaten het verkeerde vinger-ID via CDP. De simulatie is gecorrigeerd; de eindtest controleert expliciet dat rechts loslaten links actief laat. De nieuwe strook en twee sticks zijn zowel met echte Chromium-touch-events als met gecontroleerde WebKit-touchreeksen getest. Syntax- en whitespacecontroles slagen. Screenshots zijn visueel gecontroleerd.

Alle GPU-suites liepen achtereenvolgens tegen de bestaande lokale assetserver. Browseremulatie is geen fysieke iPad/Safari-test; bediening en stabiliteit op het apparaat zelf blijven nog te verifiëren.

## Gerichte vervolgfix: rennen en tijdelijke uitleg

De maximale snelheid van de iPad-loopstick is verhoogd van 2,7 naar 4,8 m/s. De uitslag blijft proportioneel: een kleinere uitslag geeft een lagere snelheid. Op niet-iPads schakelt uitsluitend de linker Shift-toets tijdelijk naar 4,8 m/s; loslaten herstelt 2,7 m/s. De bestaande lanegrenzen, diagonale normalisatie, kijkbediening en overige modi blijven behouden.

De instructieregel verdwijnt vijf seconden nadat Atlas 3D gereed is. Dit gebruikt alleen een vertraagde CSS-zichtbaarheidswijziging, ook bij verminderde beweging; er zijn geen extra timers of GPU-resources. De cacheversie is `v179-atlas-running`, met dezelfde preloadlijst.

Deze vervolgfix is gecontroleerd met 27 geslaagde tests: 15 gerichte Chromium-controles (inclusief echte WebGPU-invoer), beide WebGPU-tabletacceptatietests en 10 WebKit-controles in liggende/staande weergave. Een aanvankelijke CSS-eindframefout bij verminderde beweging is gecorrigeerd en opnieuw getest. Syntax en `git diff --check` slagen. Fysieke iPad-validatie blijft apart nodig.
