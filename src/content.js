window.SVEN_CONTENT = {
  level: {
    id: "LVL-0001",
    title: "Sven en de Runenpoort",
    storageKey: "svenadventure-runenpoort-v1",
    progressKey: "svenadventure-table-progress-v1",
    player: {
      startPosition: { x: 14, bottom: 2 }
    },
    intro: [
      "Sven komt bij een oude Vikingtempel.",
      "De poort zit dicht. Drie runen slapen.",
      "Maak de runen wakker met keersommen."
    ],
    spiritName: "Runewachter",
    spiritLines: {
      welcome: "Hoi Sven. De poort luistert naar slimme antwoorden.",
      chooseRune: "Tik op een rune. Sven loopt erheen.",
      approaching: "Sven loopt naar de rune...",
      allRunes: "Alle runen gloeien. De tempel wordt wakker!",
      reward: "Goed gedaan, Sven. Jij hebt de Runenpoort geopend."
    },
    runes: [
      {
        id: "zon",
        name: "Zonrune",
        shortName: "Zon",
        symbol: "Z",
        position: { x: 26, y: 61 },
        approachPosition: { x: 20, bottom: 2 },
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
        position: { x: 50, y: 51 },
        approachPosition: { x: 43, bottom: 2 },
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
        position: { x: 75, y: 60 },
        approachPosition: { x: 70, bottom: 2 },
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
      line: "Sven heeft de oude Vikingpoort geopend met keersommen."
    }
  }
};
