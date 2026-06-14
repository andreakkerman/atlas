window.SVEN_LEVEL_MANIFEST = {
  levels: [
    {
      id: "LVL-0001",
      title: "De Runenpoort",
      subtitle: "Verken een vergeten Vikingtempel en ontdek het geheim van de oude runen.",
      script: "Levels/LVL-0001/level.js",
      menu: {
        illustration: "Levels/LVL-0001/assets/level-1-wide-world.png",
        badge: "Eerste avontuur",
        detail: "Een vergeten Vikingtempel en oude runen"
      }
    },
    {
      id: "LVL-0002",
      title: "De Tempelzaal",
      subtitle: "Binnen in de Vikingtempel wachten oude proeven.",
      script: "Levels/LVL-0002/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0001",
      menu: {
        illustration: "Levels/LVL-0002/assets/temple-interior.png",
        badge: "Verbonden gebied",
        detail: "Tempelzaal, vuur en oude Vikingtekens"
      }
    },
    {
      id: "LVL-0003",
      title: "De Vikinghaven",
      subtitle: "De havenpoort opent pas als het schip klaar is.",
      script: "Levels/LVL-0003/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0002",
      menu: {
        illustration: "Levels/LVL-0003/assets/viking-harbor.png",
        badge: "Verbonden gebied",
        detail: "Haven, kompas en vertrek naar zee"
      }
    },
    {
      id: "LVL-0004",
      title: "De Nautilus",
      subtitle: "Duik in een geheim avontuur met de Nautilus.",
      script: "Levels/LVL-0004/level.js",
      menu: {
        illustration: "Levels/LVL-0004/assets/nautilus-harbor.png",
        badge: "Nieuw avontuur",
        detail: "Een tropische haven en een mysterieuze duikboot"
      }
    },
    {
      id: "LVL-0005",
      title: "Aan boord",
      subtitle: "In de salon van de Nautilus liggen oude kaarten en raadsels.",
      script: "Levels/LVL-0005/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0004",
      menu: {
        illustration: "Levels/LVL-0005/assets/nautilus-salon.png",
        badge: "Verbonden gebied",
        detail: "Salon, patrijspoorten en kapiteinskaarten"
      }
    },
    {
      id: "LVL-0006",
      title: "De Minisub",
      subtitle: "Diep in de Nautilus wacht de kleine onderzeeer.",
      script: "Levels/LVL-0006/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0005",
      menu: {
        illustration: "Levels/LVL-0006/assets/nautilus-mini-sub.png",
        badge: "Verbonden gebied",
        detail: "Hangar, drukmeters en ontsnappingsluik"
      }
    },
    {
      id: "LVL-0007",
      title: "Het Tropische Eiland",
      subtitle: "De ontsnapping eindigt bij licht, water en palmen.",
      script: "Levels/LVL-0007/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0006",
      menu: {
        illustration: "Levels/LVL-0007/assets/tropical-island-escape.png",
        badge: "Verbonden gebied",
        detail: "Grot, sloep en de weg naar buiten"
      }
    },
    {
      id: "LVL-0008",
      title: "De Blokkenpoort",
      subtitle: "Ontdek vijf blokkenkamers en vind de weg terug naar huis.",
      script: "Levels/LVL-0008/level.js",
      menu: {
        illustration: "Levels/LVL-0008/assets/blokkenpoort-sealed-room.png",
        badge: "Nieuw avontuur",
        detail: "Blokkenkamers, portalen en Dutchtuber Job"
      }
    },
    {
      id: "LVL-0009",
      title: "De Ontwaakte Kamer",
      subtitle: "De Blokkenpoort begint te gloeien.",
      script: "Levels/LVL-0009/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0008",
      menu: {
        illustration: "Levels/LVL-0009/assets/blokkenpoort-awakened-room.png",
        badge: "Verbonden gebied",
        detail: "Kaarten, boeken en een wakker portaal"
      }
    },
    {
      id: "LVL-0010",
      title: "De Strandkamer",
      subtitle: "Een kamer vol zand, water en geheime blokken.",
      script: "Levels/LVL-0010/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0009",
      menu: {
        illustration: "Levels/LVL-0010/assets/blokkenpoort-beach-room.png",
        badge: "Verbonden gebied",
        detail: "Strand, schatten en een houten boot"
      }
    },
    {
      id: "LVL-0011",
      title: "De Netherproef",
      subtitle: "Lava en paarse gloed blokkeren de weg.",
      script: "Levels/LVL-0011/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0010",
      menu: {
        illustration: "Levels/LVL-0011/assets/blokkenpoort-nether-trial.png",
        badge: "Verbonden gebied",
        detail: "Nethersteen, lava en een gevaarlijke poort"
      }
    },
    {
      id: "LVL-0012",
      title: "De Weg Naar Huis",
      subtitle: "Achter de laatste poort wacht de echte wereld.",
      script: "Levels/LVL-0012/level.js",
      hiddenFromMenu: true,
      connectedFrom: "LVL-0011",
      menu: {
        illustration: "Levels/LVL-0012/assets/blokkenpoort-way-home.png",
        badge: "Finale",
        detail: "Zonlicht, portalen en de uitgang naar huis"
      }
    }
  ]
};
