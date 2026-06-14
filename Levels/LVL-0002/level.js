window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0002"] = {
  id: "LVL-0002",
  title: "De Tempelzaal",
  subtitle: "Binnen in de Vikingtempel wachten oude proeven.",
  description: "Sven stapt de Vikingtempel binnen en onderzoekt vier oude voorwerpen om de weg naar de haven te openen.",
  storageKey: "svenadventure-tempelzaal-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "harborDoor",
  exitActionLabel: "Naar de haven",
  challengeLabel: "Proef",
  challengeCompleteLabel: "Rond de proef af",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "proeven",
  menu: {
    illustration: "Levels/LVL-0002/assets/temple-interior.png",
    badge: "Verbonden gebied",
    detail: "Tempelzaal, vuur en oude Vikingtekens"
  },
  companion: {
    name: "Steenpriester",
    portrait: "Levels/LVL-0002/assets/steenpriester.png"
  },
  challengeCharacter: {
    id: "steenpriester",
    name: "Steenpriester",
    portrait: "Levels/LVL-0002/assets/steenpriester.png",
    role: "tempelwachter"
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
    background: "Levels/LVL-0002/assets/temple-interior.png"
  },
  challengeArt: "Levels/LVL-0002/assets/steenpriester.png",
  player: {
    start: { x: 170, y: 575 }
  },
  interactiveObjects: [
    {
      id: "shieldWall",
      type: "rune",
      center: { x: 475, y: 312 },
      radius: 68,
      approachNode: "shield-approach",
      label: "Schildenmuur"
    },
    {
      id: "mapTable",
      type: "rune",
      center: { x: 715, y: 410 },
      radius: 74,
      approachNode: "map-approach",
      label: "Kaarttafel"
    },
    {
      id: "fireBowl",
      type: "rune",
      center: { x: 1094, y: 376 },
      radius: 84,
      approachNode: "fire-approach",
      label: "Vuurschaal"
    },
    {
      id: "shipModel",
      type: "rune",
      center: { x: 1453, y: 352 },
      radius: 86,
      approachNode: "ship-model-approach",
      label: "Scheepsmodel"
    },
    {
      id: "harborDoor",
      type: "gate",
      center: { x: 1999, y: 477 },
      radius: 104,
      approachNode: "right-door-approach",
      label: "Havendeur"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 160, y: 580 },
    { id: "shield-approach", x: 442, y: 588, role: "approach" },
    { id: "map-approach", x: 688, y: 535, role: "approach" },
    { id: "fire-approach", x: 1086, y: 511, role: "approach" },
    { id: "right-floor", x: 1344, y: 521 },
    { id: "ship-model-approach", x: 1461, y: 529, role: "approach" },
    { id: "right-door-approach", x: 1970, y: 613, role: "approach" }
  ],
  intro: [
    "Sven stapt de tempelzaal binnen.",
    "Overal branden fakkels.",
    "Vier oude voorwerpen wachten op slimme sommen."
  ],
  spiritName: "Steenpriester",
  spiritLines: {
    welcome: "Welkom in de tempelzaal.",
    chooseRune: "Kies een proef.",
    moving: "De stenen vloer kraakt zacht.",
    allRunes: "Alle tempelproeven kloppen. De havendeur kan open.",
    reward: "De tempel laat Sven verder gaan."
  },
  guideLines: {
    welcome: {
      speaker: "minnie",
      text: "Oeh... het ruikt naar rook en geheimen."
    },
    start: {
      speaker: "minnie",
      text: "Ik zie schilden, een kaart en een klein schip."
    },
    moving: {
      speaker: "moose",
      text: "Stap rustig. Oude zalen houden niet van haast."
    },
    interior: {
      speaker: "moose",
      text: "Vuur, schilden en kaarten. Alles heeft hier een doel."
    },
    object: {
      speaker: "minnie",
      text: "Oeh, dit lijkt ouder dan de hele tempel."
    },
    allRunes: {
      speaker: "moose",
      text: "Alle tempelproeven kloppen. De havendeur kan open."
    },
    reward: {
      speaker: "moose",
      text: "Goed gedaan. De tempel laat ons naar buiten."
    }
  },
  areas: [
    { id: "interior", name: "Tempelzaal", start: 0, end: 2172, guideLine: "interior" }
  ],
  hotspots: [
    {
      id: "harborDoor",
      objectId: "harborDoor",
      type: "gate",
      name: "Havendeur",
      defaultAction: "activate",
      look: "Een zware deur naar buiten. Hij wacht op vier opgeloste proeven.",
      activate: "De deur opent naar de Vikinghaven."
    }
  ],
  runes: [
    {
      id: "shieldWall",
      objectId: "shieldWall",
      name: "Schildenmuur",
      shortName: "Schilden",
      defaultAction: "activate",
      intro: "De schilden hangen in nette rijen.",
      prompt: "Tel de schilden in groepen.",
      solved: "Goed zo! De schilden klikken op hun plek.",
      questions: [
        { a: 3, b: 8 },
        { a: 4, b: 6 },
        { a: 5, b: 4 },
        { a: 2, b: 9 }
      ]
    },
    {
      id: "mapTable",
      objectId: "mapTable",
      name: "Kaarttafel",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "Op de kaart staan routes in groepjes.",
      prompt: "Vind het juiste aantal routes.",
      solved: "Mooi! De kaart wijst naar de haven.",
      questions: [
        { a: 4, b: 7 },
        { a: 6, b: 5 },
        { a: 8, b: 2 },
        { a: 3, b: 9 }
      ]
    },
    {
      id: "fireBowl",
      objectId: "fireBowl",
      name: "Vuurschaal",
      shortName: "Vuur",
      defaultAction: "activate",
      intro: "De vlammen springen in groepjes omhoog.",
      prompt: "Tel de vonken van het vuur.",
      solved: "Sterk! Het vuur brandt helder.",
      questions: [
        { a: 7, b: 3 },
        { a: 5, b: 9 },
        { a: 6, b: 6 },
        { a: 4, b: 8 }
      ]
    },
    {
      id: "shipModel",
      objectId: "shipModel",
      name: "Scheepsmodel",
      shortName: "Schip",
      defaultAction: "activate",
      intro: "Het kleine Vikingschip staat klaar op de tafel.",
      prompt: "Tel de riemen van het schip.",
      solved: "Goed zo! Het schip wijst naar buiten.",
      questions: [
        { a: 4, b: 8 },
        { a: 6, b: 7 },
        { a: 9, b: 4 },
        { a: 5, b: 5 }
      ]
    }
  ],
  reward: {
    title: "De havendeur opent!",
    badge: "Vriend van de Tempelzaal",
    line: "Sven loste de vier tempelproeven op. Nu mag hij naar de Vikinghaven.",
    art: "Levels/LVL-0002/assets/temple-interior.png",
    nextLevelId: "LVL-0003",
    nextLabel: "Naar de haven"
  }
};
