window.SVEN_CONTENT = {
  level: {
    id: "LVL-0001",
    title: "Sven en de Runenpoort",
    storageKey: "svenadventure-runenpoort-v1",
    progressKey: "svenadventure-table-progress-v1",
    player: {
      startWorldX: 8,
      ground: 8
    },
    intro: [
      "Sven komt aan bij een oud bos.",
      "Tussen de bomen ligt een pad naar een Vikingtempel.",
      "Daar wacht de Runenpoort."
    ],
    verbs: [
      { id: "look", label: "Kijk" },
      { id: "talk", label: "Praat" },
      { id: "activate", label: "Activeer" }
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
      {
        id: "forest",
        name: "Bos",
        start: 0,
        end: 50,
        background: "assets/forest-path.png"
      },
      {
        id: "temple",
        name: "Tempel",
        start: 50,
        end: 100,
        background: "assets/viking-temple.png"
      }
    ],
    hotspots: [
      {
        id: "forestRune",
        type: "object",
        name: "Bosrune",
        x: 17,
        y: 59,
        approachX: 19,
        verbs: ["look", "activate"],
        look: "Een oude steen. Hij wijst naar de tempel.",
        activate: "De steen gloeit zacht. Het pad voelt veilig."
      },
      {
        id: "spirit",
        type: "character",
        name: "Runewachter",
        x: 35,
        y: 52,
        approachX: 31,
        verbs: ["look", "talk"],
        look: "Een vriendelijke Vikinggeest wacht tussen de bomen.",
        talk: "De poort opent alleen voor slimme runen. Ga naar de tempel, Sven."
      },
      {
        id: "templePath",
        type: "path",
        name: "Pad naar de tempel",
        x: 47,
        y: 71,
        approachX: 46,
        destinationX: 56,
        verbs: ["look", "activate"],
        look: "Het pad loopt tussen de bomen naar de Vikingtempel.",
        activate: "Sven volgt het pad naar de tempel."
      },
      {
        id: "templeGate",
        type: "gate",
        name: "Runenpoort",
        x: 74,
        y: 54,
        approachX: 72,
        verbs: ["look", "activate"],
        look: "De poort zit dicht. Drie runen houden hem vast.",
        activate: "De poort wacht op drie wakkere runen."
      }
    ],
    runes: [
      {
        id: "zon",
        name: "Zonrune",
        shortName: "Zon",
        symbol: "Z",
        x: 63,
        y: 61,
        approachX: 61,
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
        symbol: "S",
        x: 75,
        y: 51,
        approachX: 73,
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
        symbol: "W",
        x: 88,
        y: 60,
        approachX: 86,
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
      line: "Sven reisde door het bos en opende de oude Vikingpoort."
    }
  }
};
