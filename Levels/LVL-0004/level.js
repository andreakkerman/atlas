window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0004"] = {
  id: "LVL-0004",
  title: "De Nautilus",
  subtitle: "Duik in een geheim avontuur met de Nautilus.",
  description: "Sven vindt de Nautilus in een tropische haven en zoekt een weg aan boord.",
  storageKey: "svenadventure-nautilus-haven-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "boardingGate",
  exitActionLabel: "Aan boord",
  challengeLabel: "Nautilusproef",
  challengeCompleteLabel: "Maak de toegang klaar",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "proeven",
  menu: {
    illustration: "Levels/LVL-0004/assets/nautilus-harbor.png",
    badge: "Nieuw avontuur",
    detail: "Een tropische haven en een mysterieuze duikboot"
  },
  companion: {
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0004/assets/captain-nemo.png"
  },
  challengeCharacter: {
    id: "captain-nemo",
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0004/assets/captain-nemo.png",
    role: "kapitein van de Nautilus"
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
    background: "Levels/LVL-0004/assets/nautilus-harbor.png"
  },
  challengeArt: "Levels/LVL-0004/assets/captain-nemo.png",
  player: {
    start: { x: 190, y: 610 }
  },
  interactiveObjects: [
    {
      id: "harborMap",
      type: "rune",
      center: { x: 690, y: 460 },
      radius: 76,
      approachNode: "map-approach",
      label: "Havenkaart"
    },
    {
      id: "brassTelescope",
      type: "rune",
      center: { x: 815, y: 360 },
      radius: 72,
      approachNode: "telescope-approach",
      label: "Koperen kijker"
    },
    {
      id: "nautilusLight",
      type: "rune",
      center: { x: 1420, y: 397 },
      radius: 84,
      approachNode: "nautilus-light-approach",
      label: "Nautiluslamp"
    },
    {
      id: "boardingGate",
      type: "gate",
      center: { x: 1611, y: 459 },
      radius: 100,
      approachNode: "boarding-gate-approach",
      label: "Steigerpoort"
    }
  ],
  walkPath: [
    { id: "harbor-start", x: 259, y: 564 },
    { id: "map-approach", x: 640, y: 600, role: "approach" },
    { id: "telescope-approach", x: 807, y: 593, role: "approach" },
    { id: "dock-center", x: 1080, y: 585 },
    { id: "nautilus-light-approach", x: 1348, y: 575, role: "approach" },
    { id: "boarding-gate-approach", x: 1608, y: 585, role: "approach" },
    { id: "right-cave-path", x: 1835, y: 620 }
  ],
  intro: [
    "Sven vindt een geheime haven.",
    "In het water ligt de Nautilus.",
    "Kapitein Nemo laat niemand zomaar aan boord."
  ],
  spiritName: "Kapitein Nemo",
  spiritLines: {
    welcome: "Welkom bij de Nautilus.",
    chooseRune: "Onderzoek de havenproeven.",
    moving: "Het water klotst tegen de steiger.",
    allRunes: "De Nautilus is klaar om Sven aan boord te laten.",
    reward: "De steigerpoort gaat open."
  },
  guideLines: {
    welcome: {
      speaker: "minnie",
      text: "Oeh, daar ligt een echte duikboot."
    },
    start: {
      speaker: "minnie",
      text: "Ik zie kaarten, koper en blauw licht."
    },
    moving: {
      speaker: "moose",
      text: "Rustig langs het water. Die steiger is oud."
    },
    harbor: {
      speaker: "moose",
      text: "Die duikboot wacht niet op slordige stappen."
    },
    object: {
      speaker: "minnie",
      text: "Oeh, koper en blauw licht. Dat moet iets doen."
    },
    allRunes: {
      speaker: "moose",
      text: "Alles klopt. Sven mag naar de Nautilus."
    },
    reward: {
      speaker: "moose",
      text: "Aan boord gaan, maar voorzichtig."
    }
  },
  areas: [
    { id: "harbor", name: "Nautilushaven", start: 0, end: 2172, guideLine: "harbor" }
  ],
  hotspots: [
    {
      id: "boardingGate",
      objectId: "boardingGate",
      type: "gate",
      name: "Steigerpoort",
      defaultAction: "activate",
      look: "Een poort naar de steiger. Hij opent pas na drie havenproeven.",
      activate: "De poort naar de Nautilus gaat open."
    }
  ],
  runes: [
    {
      id: "harborMap",
      objectId: "harborMap",
      name: "Havenkaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "Op de kaart staan routes naar de steiger.",
      prompt: "Tel de routepunten op de kaart.",
      solved: "Mooi! De kaart wijst naar de Nautilus.",
      questions: [
        { a: 4, b: 6 },
        { a: 7, b: 3 }
      ]
    },
    {
      id: "brassTelescope",
      objectId: "brassTelescope",
      name: "Koperen kijker",
      shortName: "Kijker",
      defaultAction: "activate",
      intro: "De kijker staat gericht op de duikboot.",
      prompt: "Tel de lichtjes die Sven ziet.",
      solved: "Goed zo! De kijker vindt de ingang.",
      questions: [
        { a: 5, b: 8 },
        { a: 6, b: 7 }
      ]
    },
    {
      id: "nautilusLight",
      objectId: "nautilusLight",
      name: "Nautiluslamp",
      shortName: "Lamp",
      defaultAction: "activate",
      intro: "De blauwe lamp pulseert zacht.",
      prompt: "Tel de pulsen van de Nautilus.",
      solved: "Sterk! De Nautilus geeft antwoord.",
      questions: [
        { a: 9, b: 4 },
        { a: 8, b: 6 }
      ]
    }
  ],
  reward: {
    title: "De poort naar de Nautilus opent!",
    badge: "Nautilus Verkenner",
    line: "Sven loste de havenproeven op. Nu mag hij aan boord.",
    art: "Levels/LVL-0004/assets/nautilus-harbor.png",
    nextLevelId: "LVL-0005",
    nextLabel: "Aan boord"
  }
};
