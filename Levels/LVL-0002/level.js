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
    startNode: "left-door-start",
    start: { x: 160, y: 580 }
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
      id: "templeTorch",
      type: "ambient",
      center: { x: 1735, y: 285 },
      radius: 54,
      approachNode: "ship-model-approach",
      label: "Wandfakkel"
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
  levelSemantics: {
    setting: "een warme Vikingtempelzaal vol vuur, schilden en kaarten",
    mood: "oud, plechtig en onderzoekend",
    companionFocus: {
      minnie: "glans op metaal, geheime voorwerpen en kleine details",
      moose: "zware deuren, vuur en wat veilig aan te raken is"
    }
  },
  companionMoments: [
    {
      id: "temple-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Wat een zaal. Ik zie schilden, vuur en een klein schip."
    },
    {
      id: "temple-torch",
      event: "AMBIENT_ATTENTION",
      objectId: "templeTorch",
      speaker: "minnie",
      text: "Deze fakkel brandt zonder hout. Dat is een knap tempeltrucje."
    },
    {
      id: "temple-shields",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "shieldWall",
      speaker: "moose",
      text: "De schilden hangen in rijen. Tellen is veiliger dan ermee zwaaien."
    },
    {
      id: "temple-map",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "mapTable",
      speaker: "minnie",
      text: "Op de kaart lopen routes door elkaar. Welke som vindt de goede weg?"
    },
    {
      id: "temple-fire",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "fireBowl",
      speaker: "moose",
      text: "De vuurschaal springt in groepjes. Handen thuis, hoofd aan."
    },
    {
      id: "temple-ship",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "shipModel",
      speaker: "minnie",
      text: "Het kleine schip heeft veel riemen. Ik wil weten hoeveel precies."
    },
    {
      id: "temple-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "moose",
      text: "{completed} van de {total} tempelproeven klaar. Nog {remaining}."
    },
    {
      id: "temple-exit-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De havendeur blijft dicht. Eerst nog {remaining} proeven."
    },
    {
      id: "temple-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "moose",
      text: "De tempelproeven zijn klaar. Op naar de haven."
    },
    {
      id: "temple-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "minnie",
      text: "Alle proeven zijn klaar! De havendeur kan nu open."
    }
  ],
  areas: [
    { id: "interior", name: "Tempelzaal", start: 0, end: 2172, guideLine: "interior" }
  ],
  hotspots: [
    {
      id: "templeTorch",
      objectId: "templeTorch",
      type: "ambient",
      name: "Wandfakkel",
      defaultAction: "look",
      look: "Een oude fakkel die helder blijft branden."
    },
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
        { a: 2, b: 9 },
        { a: 7, b: 2 },
        { a: 6, b: 3 }
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
        { a: 3, b: 9 },
        { a: 10, b: 3 },
        { a: 9, b: 4 }
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
        { a: 4, b: 8 },
        { a: 8, b: 7 },
        { a: 2, b: 10 }
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
        { a: 8, b: 4 },
        { a: 6, b: 7 },
        { a: 8, b: 9 },
        { a: 5, b: 5 },
        { a: 10, b: 6 },
        { a: 7, b: 9 }
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
