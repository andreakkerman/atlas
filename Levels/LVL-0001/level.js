window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0001"] = {
  id: "LVL-0001",
  title: "Sven en de Runenpoort",
  subtitle: "Een Vikingtempel vol runen en keersommen.",
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
    width: 3000,
    height: 1000,
    aspectRatio: 3,
    viewportWidth: 1000,
    background: "Levels/LVL-0001/assets/level-1-wide-world.png"
  },
  challengeArt: "Levels/LVL-0001/assets/rune-stones.png",
  player: {
    start: { x: 250, y: 825 }
  },
  walkGraph: {
    nodes: [
      { id: "forest-start", x: 190, y: 838 },
      { id: "forest-rune", x: 320, y: 818 },
      { id: "forest-bend", x: 500, y: 792 },
      { id: "forest-low", x: 690, y: 812 },
      { id: "forest-exit", x: 910, y: 832 },
      { id: "path-rise", x: 1120, y: 804 },
      { id: "upper-stones", x: 1320, y: 768 },
      { id: "temple-approach", x: 1540, y: 746 },
      { id: "temple-left", x: 1760, y: 782 },
      { id: "sun-rune", x: 1990, y: 804 },
      { id: "gate-left", x: 2220, y: 802 },
      { id: "gate-center", x: 2460, y: 794 },
      { id: "wind-rune", x: 2700, y: 810 }
    ],
    edges: [
      ["forest-start", "forest-rune"],
      ["forest-rune", "forest-bend"],
      ["forest-bend", "forest-low"],
      ["forest-low", "forest-exit"],
      ["forest-exit", "path-rise"],
      ["path-rise", "upper-stones"],
      ["upper-stones", "temple-approach"],
      ["temple-approach", "temple-left"],
      ["temple-left", "sun-rune"],
      ["sun-rune", "gate-left"],
      ["gate-left", "gate-center"],
      ["gate-center", "wind-rune"]
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
    { id: "forest", name: "Bos", start: 0, end: 1450 },
    { id: "temple", name: "Tempel", start: 1450, end: 3000 }
  ],
  hotspots: [
    {
      id: "forestRune",
      type: "object",
      name: "Bosrune",
      x: 360,
      y: 575,
      approach: { x: 305, y: 825 },
      defaultAction: "look",
      look: "Een oude steen. Hij wijst naar de tempel.",
      activate: "De steen gloeit zacht. Het pad voelt veilig."
    },
    {
      id: "templeGate",
      type: "gate",
      name: "Runenpoort",
      x: 2505,
      y: 450,
      approach: { x: 2340, y: 795 },
      defaultAction: "activate",
      look: "De poort zit dicht. Drie runen houden hem vast.",
      activate: "De poort wacht op drie wakkere runen."
    }
  ],
  runes: [
    {
      id: "zon",
      name: "Zonrune",
      shortName: "Zon",
      x: 2100,
      y: 540,
      approach: { x: 1990, y: 800 },
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
      name: "Steenrune",
      shortName: "Steen",
      x: 2480,
      y: 455,
      approach: { x: 2320, y: 795 },
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
      name: "Windrune",
      shortName: "Wind",
      x: 2880,
      y: 570,
      approach: { x: 2700, y: 810 },
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
