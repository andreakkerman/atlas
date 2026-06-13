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
      center: { x: 1384, y: 172 },
      radius: 46,
      approachNode: "sun-rune-approach",
      label: "Zonrune"
    },
    {
      id: "steen",
      type: "rune",
      center: { x: 1849, y: 343 },
      radius: 70,
      approachNode: "gate-step-upper",
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
  walkGraph: {
    nodes: [
      { id: "forest-start", x: 170, y: 610 },
      { id: "forest-rune-approach", x: 285, y: 600 },
      { id: "forest-path-low", x: 430, y: 594 },
      { id: "forest-bend", x: 610, y: 590 },
      { id: "forest-lower-stones", x: 780, y: 608 },
      { id: "forest-exit", x: 940, y: 596 },
      { id: "trail-rise-1", x: 1080, y: 560 },
      { id: "trail-rise-2", x: 1210, y: 510 },
      { id: "sun-rune-approach", x: 1365, y: 468 },
      { id: "temple-entry", x: 1490, y: 462 },
      { id: "temple-path-left", x: 1588, y: 500 },
      { id: "gate-step-low", x: 1680, y: 548 },
      { id: "gate-step-mid-1", x: 1765, y: 526 },
      { id: "gate-step-mid-2", x: 1838, y: 503 },
      { id: "gate-step-upper", x: 1860, y: 476 },
      { id: "gate-step-center", x: 1935, y: 510 },
      { id: "wind-rune-approach", x: 2070, y: 548 }
    ],
    edges: [
      ["forest-start", "forest-rune-approach"],
      ["forest-rune-approach", "forest-path-low"],
      ["forest-path-low", "forest-bend"],
      ["forest-bend", "forest-lower-stones"],
      ["forest-lower-stones", "forest-exit"],
      ["forest-exit", "trail-rise-1"],
      ["trail-rise-1", "trail-rise-2"],
      ["trail-rise-2", "sun-rune-approach"],
      ["sun-rune-approach", "temple-entry"],
      ["temple-entry", "temple-path-left"],
      ["temple-path-left", "gate-step-low"],
      ["gate-step-low", "gate-step-mid-1"],
      ["gate-step-mid-1", "gate-step-mid-2"],
      ["gate-step-mid-2", "gate-step-upper"],
      ["gate-step-upper", "gate-step-center"],
      ["gate-step-center", "wind-rune-approach"]
    ]
  },
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
