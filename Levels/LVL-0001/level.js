window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0001"] = {
  id: "LVL-0001",
  title: "Sven en de Runenpoort",
  subtitle: "Een Vikingtempel vol runen en keersommen.",
  description: "Sven reist door een oud bos naar een Vikingtempel en opent de Runenpoort met drie magische keersom-runen.",
  storageKey: "svenadventure-runenpoort-v1",
  progressKey: "svenadventure-table-progress-v1",
  menu: {
    illustration: "Levels/LVL-0001/assets/level-1-wide-world.png",
    badge: "Eerste avontuur",
    detail: "Bos, tempel en drie magische runen"
  },
  companion: {
    name: "Runewachter",
    portrait: "Levels/LVL-0001/assets/viking-spirit.png"
  },
  guides: {
    minnie: {
      name: "Minnie",
      portrait: "assets/guides/minnie.png"
    },
    moose: {
      name: "Moose",
      portrait: "assets/guides/moose.png"
    }
  },
  world: {
    width: 2172,
    height: 724,
    aspectRatio: 3,
    viewportWidth: 1000,
    background: "Levels/LVL-0001/assets/level-1-wide-world.png"
  },
  challengeArt: "Levels/LVL-0001/assets/rune-stones.png",
  player: {
    start: { x: 210, y: 610 }
  },
  interactiveObjects: [
    {
      id: "forestRune",
      objectId: "forestRune",
      type: "object",
      center: { x: 273, y: 469 },
      radius: 48,
      approachNode: "forest-rune-approach",
      label: "Bosrune"
    },
    {
      id: "zon",
      type: "rune",
      center: { x: 1384, y: 160 },
      radius: 46,
      approachNode: "sun-rune-approach",
      label: "Zonrune"
    },
    {
      id: "steen",
      type: "rune",
      center: { x: 1465, y: 318 },
      radius: 44,
      approachNode: "stone-rune-approach",
      label: "Steenrune"
    },
    {
      id: "wind",
      type: "rune",
      center: { x: 2127, y: 407 },
      radius: 45,
      approachNode: "wind-rune-approach",
      label: "Windrune"
    },
    {
      id: "templeGate",
      objectId: "templeGate",
      type: "gate",
      center: { x: 1849, y: 343 },
      radius: 104,
      approachNode: "gate-step-upper",
      label: "Runenpoort"
    }
  ],
  walkPath: [
    { id: "forest-start", x: 170, y: 626 },
    { id: "forest-rune-approach", x: 285, y: 628, role: "approach" },
    { id: "center-trail", x: 590, y: 634 },
    { id: "lower-trail", x: 940, y: 628 },
    { id: "trail-rise-2", x: 1151, y: 569 },
    { id: "trail-top", x: 1235, y: 518 },
    { id: "sun-rune-approach", x: 1308, y: 547, role: "approach" },
    { id: "stone-rune-approach", x: 1452, y: 570, role: "approach" },
    { id: "temple-approach", x: 1620, y: 588 },
    { id: "gate-step-low", x: 1692, y: 562 },
    { id: "gate-step-upper", x: 1770, y: 483, role: "approach" },
    { id: "wind-rune-approach", x: 1888, y: 485, role: "approach" }
  ],
  intro: [
    "Sven komt aan bij een oud bos.",
    "Tussen de bomen ligt een pad naar een Vikingtempel.",
    "Daar wacht de Runenpoort."
  ],
  spiritName: "Runewachter",
  spiritLines: {
    welcome: "Welkom, Sven. Volg het pad naar de tempel.",
    chooseRune: "Kies een rune en activeer hem.",
    moving: "Sven loopt erheen...",
    allRunes: "Alle runen gloeien. De tempel wordt wakker!",
    reward: "Goed gedaan, Sven. Jij hebt de Runenpoort geopend."
  },
  guideLines: {
    welcome: {
      speaker: "minnie",
      text: "Oeh, dit bos zit vol geheimen."
    },
    start: {
      speaker: "minnie",
      text: "Volgens mij glimt daar iets. Zullen we kijken?"
    },
    moving: {
      speaker: "moose",
      text: "Rustig. Sven loopt erheen."
    },
    forest: {
      speaker: "minnie",
      text: "Ik wed dat hier ergens iets glimt."
    },
    temple: {
      speaker: "moose",
      text: "Daar is de tempel. Die poort gaat niet zomaar open."
    },
    object: {
      speaker: "minnie",
      text: "Kijk! Daar is iets bijzonders."
    },
    runeSolved: {
      speaker: "minnie",
      text: "Yes! De rune wordt wakker."
    },
    allRunes: {
      speaker: "moose",
      text: "Alle runen gloeien. Nu voorzichtig naar de poort."
    },
    reward: {
      speaker: "moose",
      text: "Goed gedaan, Sven. De poort is open."
    }
  },
  areas: [
    { id: "forest", name: "Bos", start: 0, end: 1120 },
    { id: "temple", name: "Tempel", start: 1120, end: 2172 }
  ],
  hotspots: [
    {
      id: "forestRune",
      objectId: "forestRune",
      type: "object",
      name: "Bosrune",
      defaultAction: "look",
      look: "Een oude steen. Hij wijst naar de tempel.",
      activate: "De steen gloeit zacht. Het pad voelt veilig."
    },
    {
      id: "templeGate",
      objectId: "templeGate",
      type: "gate",
      name: "Runenpoort",
      defaultAction: "activate",
      look: "De poort zit dicht. Drie runen houden hem vast.",
      activate: "De poort wacht op drie wakkere runen."
    }
  ],
  runes: [
    {
      id: "zon",
      objectId: "zon",
      name: "Zonrune",
      shortName: "Zon",
      defaultAction: "activate",
      intro: "De Zonrune voelt warm aan.",
      solved: "Goed zo! De Zonrune gloeit.",
      questions: [
        { a: 3, b: 4 },
        { a: 5, b: 6 },
        { a: 2, b: 8 },
        { a: 4, b: 7 }
      ]
    },
    {
      id: "steen",
      objectId: "steen",
      name: "Steenrune",
      shortName: "Steen",
      defaultAction: "activate",
      intro: "De Steenrune bromt zacht.",
      solved: "Sterk! De Steenrune is wakker.",
      questions: [
        { a: 6, b: 4 },
        { a: 8, b: 3 },
        { a: 7, b: 5 },
        { a: 9, b: 2 }
      ]
    },
    {
      id: "wind",
      objectId: "wind",
      name: "Windrune",
      shortName: "Wind",
      defaultAction: "activate",
      intro: "De Windrune suist in het mos.",
      solved: "Mooi! De Windrune zingt.",
      questions: [
        { a: 4, b: 9 },
        { a: 6, b: 8 },
        { a: 10, b: 7 },
        { a: 8, b: 5 }
      ]
    }
  ],
  reward: {
    title: "De poort gaat open!",
    badge: "Bewaker van de Runenpoort",
    line: "Sven reisde door het bos en opende de oude Vikingpoort.",
    art: "Levels/LVL-0001/assets/reward.png"
  }
};
