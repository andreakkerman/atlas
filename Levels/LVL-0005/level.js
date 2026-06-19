window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0005"] = {
  id: "LVL-0005",
  title: "Aan boord",
  subtitle: "In de salon van de Nautilus liggen oude kaarten en raadsels.",
  description: "Sven onderzoekt de salon van de Nautilus en maakt de weg naar de minisub vrij.",
  storageKey: "svenadventure-nautilus-salon-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "miniSubDoor",
  exitActionLabel: "Naar de minisub",
  challengeLabel: "Salonproef",
  challengeCompleteLabel: "Rond de salonproef af",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "salonproeven",
  menu: {
    illustration: "Levels/LVL-0005/assets/nautilus-salon.png",
    badge: "Verbonden gebied",
    detail: "Salon, patrijspoorten en kapiteinskaarten"
  },
  companion: {
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0005/assets/captain-nemo.png"
  },
  challengeCharacter: {
    id: "captain-nemo",
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0005/assets/captain-nemo.png",
    role: "kapitein van de Nautilus"
  },
  guides: {
    minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
    moose: { name: "Moose", portrait: "assets/guides/moose.png" }
  },
  world: {
    width: 2172,
    height: 724,
    aspectRatio: 3,
    viewportWidth: 1000,
    background: "Levels/LVL-0005/assets/nautilus-salon.png"
  },
  challengeArt: "Levels/LVL-0005/assets/captain-nemo.png",
  player: {
    startNode: "left-door-start",
    start: { x: 327, y: 612 }
  },
  interactiveObjects: [
    {
      id: "captainChart",
      type: "rune",
      center: { x: 595, y: 297 },
      radius: 82,
      approachNode: "chart-approach",
      label: "Kapiteinskaart"
    },
    {
      id: "mainPorthole",
      type: "rune",
      center: { x: 1079, y: 312 },
      radius: 104,
      approachNode: "porthole-approach",
      label: "Groot raam"
    },
    {
      id: "logbookDesk",
      type: "rune",
      center: { x: 1551, y: 415 },
      radius: 86,
      approachNode: "desk-approach",
      label: "Logboektafel"
    },
    {
      id: "miniSubDoor",
      type: "gate",
      center: { x: 1884, y: 489 },
      radius: 108,
      approachNode: "right-door-approach",
      label: "Ronde deur"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 327, y: 612 },
    { id: "chart-approach", x: 652, y: 564, role: "approach" },
    { id: "salon-center-left", x: 872, y: 582 },
    { id: "porthole-approach", x: 1088, y: 570, role: "approach" },
    { id: "desk-approach", x: 1498, y: 574, role: "approach" },
    { id: "right-door-approach", x: 1809, y: 604, role: "approach" }
  ],
  intro: [
    "Sven stapt de Nautilus binnen.",
    "Door de ramen glijdt blauw water voorbij.",
    "Kapitein Nemo wijst naar de salonproeven."
  ],
  spiritName: "Kapitein Nemo",
  spiritLines: {
    welcome: "Welkom aan boord.",
    chooseRune: "Onderzoek de salon.",
    moving: "De Nautilus bromt diep onder ons.",
    allRunes: "De deur naar de minisub is klaar.",
    reward: "De ronde deur schuift open."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Wauw. We zijn echt onder zee." },
    start: { speaker: "minnie", text: "Kijk, vissen achter het raam." },
    moving: { speaker: "moose", text: "Voorzichtig. Metaal kan glad zijn." },
    salon: { speaker: "moose", text: "Kaarten, meters en ramen. Nemo mist niets." },
    object: { speaker: "minnie", text: "Dit glimt alsof de zee erdoor fluistert." },
    allRunes: { speaker: "moose", text: "De salon is klaar. De ronde deur kan open." },
    reward: { speaker: "moose", text: "Verder de Nautilus in. Blijf bij het pad." }
  },
  levelSemantics: {
    setting: "de salon van de Nautilus met ramen, kaarten en instrumenten",
    mood: "stil, diepzeeachtig en wonderlijk",
    companionFocus: {
      minnie: "vissen achter het glas en glimmende instrumenten",
      moose: "druk, glad metaal en Nemo's precieze orde"
    }
  },
  companionMoments: [
    {
      id: "salon-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Wauw, zelfs de muren klinken alsof we onder zee zijn."
    },
    {
      id: "salon-chart-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "captainChart",
      speaker: "moose",
      text: "De kapiteinskaart ligt precies recht. Natuurlijk."
    },
    {
      id: "salon-porthole-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "mainPorthole",
      speaker: "minnie",
      text: "Dat grote raam zit vol blauw licht en voorbijzwemmende schaduwen."
    },
    {
      id: "salon-logbook-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "logbookDesk",
      speaker: "moose",
      text: "Een logboek op een vaste plek. Nemo verrast niemand."
    },
    {
      id: "salon-solved",
      event: "CHALLENGE_SUCCESS",
      speaker: "moose",
      text: "Afgerond. Het schip bromt tevreden."
    },
    {
      id: "salon-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "minnie",
      text: "Nog eentje wakker. De salon voelt minder geheimzinnig."
    },
    {
      id: "salon-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De ronde deur blijft rond én dicht."
    },
    {
      id: "salon-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De salon is klaar. De ronde deur kan open."
    },
    {
      id: "salon-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "minnie",
      text: "Verder naar binnen. Dit schip zit vol geheimen."
    }
  ],
  areas: [
    { id: "salon", name: "Salon", start: 0, end: 2172, guideLine: "salon" }
  ],
  hotspots: [
    {
      id: "miniSubDoor",
      objectId: "miniSubDoor",
      type: "gate",
      name: "Ronde deur",
      defaultAction: "activate",
      look: "Een zware ronde deur. Hij wacht op drie salonproeven.",
      activate: "De deur naar de minisub gaat open."
    }
  ],
  runes: [
    {
      id: "captainChart",
      objectId: "captainChart",
      name: "Kapiteinskaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "De kaart toont routes door diepe zeeen.",
      prompt: "Tel de zeelijnen op de kaart.",
      solved: "Mooi! De route is duidelijk.",
      questions: [
        { a: 6, b: 4 },
        { a: 8, b: 3 },
        { a: 7, b: 2 },
        { a: 9, b: 2 },
        { a: 3, b: 8 },
        { a: 10, b: 4 }
      ]
    },
    {
      id: "mainPorthole",
      objectId: "mainPorthole",
      name: "Groot raam",
      shortName: "Raam",
      defaultAction: "activate",
      intro: "Achter het raam zwemmen vissen in groepjes.",
      prompt: "Tel de vissen achter het glas.",
      solved: "Goed zo! Het raam licht blauw op.",
      questions: [
        { a: 5, b: 7 },
        { a: 2, b: 9 },
        { a: 4, b: 8 },
        { a: 6, b: 3 },
        { a: 8, b: 5 },
        { a: 7, b: 4 }
      ]
    },
    {
      id: "logbookDesk",
      objectId: "logbookDesk",
      name: "Logboektafel",
      shortName: "Logboek",
      defaultAction: "activate",
      intro: "Het logboek ligt open op de tafel.",
      prompt: "Tel de dagen in het logboek.",
      solved: "Sterk! Het logboek klapt dicht.",
      questions: [
        { a: 5, b: 9 },
        { a: 8, b: 7 },
        { a: 6, b: 6 },
        { a: 10, b: 3 },
        { a: 9, b: 6 },
        { a: 4, b: 10 }
      ]
    }
  ],
  reward: {
    title: "De ronde deur opent!",
    badge: "Nautilus Gast",
    line: "Sven loste de salonproeven op. De weg naar de minisub is vrij.",
    art: "Levels/LVL-0005/assets/nautilus-salon.png",
    nextLevelId: "LVL-0006",
    nextLabel: "Naar de minisub"
  }
};
