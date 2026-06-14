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
    start: { x: 180, y: 590 }
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
      center: { x: 1080, y: 314 },
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
        { a: 8, b: 3 }
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
        { a: 7, b: 5 },
        { a: 9, b: 2 }
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
        { a: 8, b: 7 }
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
