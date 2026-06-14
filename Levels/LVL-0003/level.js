window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0003"] = {
  id: "LVL-0003",
  title: "De Vikinghaven",
  subtitle: "De havenpoort opent pas als het schip klaar is.",
  description: "Sven bereikt de Vikinghaven, helpt de havenmeester met vier keersom-proeven en maakt het schip klaar voor vertrek.",
  storageKey: "svenadventure-vikinghaven-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "departureGate",
  exitActionLabel: "Vertrek",
  challengeLabel: "Havenproef",
  challengeCompleteLabel: "Maak de haven klaar",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "havenproeven",
  menu: {
    illustration: "Levels/LVL-0003/assets/viking-harbor.png",
    badge: "Verbonden gebied",
    detail: "Haven, kompas en vertrek naar zee"
  },
  companion: {
    name: "Havenmeester Eivar",
    portrait: "Levels/LVL-0003/assets/havenmeester-eivar.png"
  },
  challengeCharacter: {
    id: "havenmeester-eivar",
    name: "Havenmeester Eivar",
    portrait: "Levels/LVL-0003/assets/havenmeester-eivar.png",
    role: "havenmeester"
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
    background: "Levels/LVL-0003/assets/viking-harbor.png"
  },
  challengeArt: "Levels/LVL-0003/assets/havenmeester-eivar.png",
  player: {
    start: { x: 170, y: 585 }
  },
  interactiveObjects: [
    {
      id: "harborMap",
      type: "rune",
      center: { x: 476, y: 424 },
      radius: 72,
      approachNode: "map-stand-approach",
      label: "Havenkaart"
    },
    {
      id: "shipCompass",
      type: "rune",
      center: { x: 856, y: 358 },
      radius: 90,
      approachNode: "compass-approach",
      label: "Scheepskompas"
    },
    {
      id: "cargoCrate",
      type: "rune",
      center: { x: 1493, y: 243 },
      radius: 78,
      approachNode: "crate-approach",
      label: "Ladingskist"
    },
    {
      id: "gateShield",
      type: "rune",
      center: { x: 1495, y: 442 },
      radius: 88,
      approachNode: "gate-shield-approach",
      label: "Poortschild"
    },
    {
      id: "departureGate",
      type: "gate",
      center: { x: 2024, y: 452 },
      radius: 104,
      approachNode: "right-gate-approach",
      label: "Vertrekpoort"
    }
  ],
  walkPath: [
    { id: "harbor-start", x: 165, y: 586 },
    { id: "map-stand-approach", x: 477, y: 588, role: "approach" },
    { id: "compass-approach", x: 817, y: 560, role: "approach" },
    { id: "dock-center", x: 1090, y: 552 },
    { id: "crate-approach", x: 1399, y: 558, role: "approach" },
    { id: "gate-shield-approach", x: 1499, y: 566, role: "approach" },
    { id: "right-gate-approach", x: 1980, y: 575, role: "approach" }
  ],
  intro: [
    "Sven komt aan bij de Vikinghaven.",
    "Het schip ligt klaar.",
    "Maar de vertrekpoort zit nog dicht."
  ],
  spiritName: "Havenmeester Eivar",
  spiritLines: {
    welcome: "Welkom in de haven.",
    chooseRune: "Maak het schip klaar.",
    moving: "De kade kraakt onder de wind.",
    allRunes: "Het schip is klaar voor vertrek.",
    reward: "Sven mag uitvaren."
  },
  guideLines: {
    welcome: {
      speaker: "minnie",
      text: "Oeh, hoor je het water?"
    },
    start: {
      speaker: "minnie",
      text: "Dat schip wacht op ons, denk ik."
    },
    moving: {
      speaker: "moose",
      text: "Rustig over de natte stenen. De haven luistert mee."
    },
    harbor: {
      speaker: "moose",
      text: "Touwen, wind en poorten. Eerst alles stevig maken."
    },
    object: {
      speaker: "minnie",
      text: "Daar glimt iets. Misschien wil het schip antwoord."
    },
    allRunes: {
      speaker: "moose",
      text: "Alles is klaar. Sven mag naar de vertrekpoort."
    },
    reward: {
      speaker: "moose",
      text: "Het schip is klaar. Tijd om te varen."
    }
  },
  areas: [
    { id: "harbor", name: "Vikinghaven", start: 0, end: 2172, guideLine: "harbor" }
  ],
  hotspots: [
    {
      id: "departureGate",
      objectId: "departureGate",
      type: "gate",
      name: "Vertrekpoort",
      defaultAction: "activate",
      look: "De poort naar het schip is nog dicht.",
      activate: "De poort opent. Het schip kan vertrekken."
    }
  ],
  runes: [
    {
      id: "harborMap",
      objectId: "harborMap",
      name: "Havenkaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "Op de kaart staan steigers in groepjes.",
      prompt: "Tel de steigers op de kaart.",
      solved: "Goed zo! De route is duidelijk.",
      questions: [
        { a: 3, b: 9 },
        { a: 6, b: 4 },
        { a: 8, b: 5 }
      ]
    },
    {
      id: "shipCompass",
      objectId: "shipCompass",
      name: "Scheepskompas",
      shortName: "Kompas",
      defaultAction: "activate",
      intro: "Het kompas draait langs lichtpunten.",
      prompt: "Tel de lichtpunten van het kompas.",
      solved: "Mooi! Het kompas wijst de weg.",
      questions: [
        { a: 4, b: 8 },
        { a: 7, b: 6 },
        { a: 9, b: 3 }
      ]
    },
    {
      id: "cargoCrate",
      objectId: "cargoCrate",
      name: "Ladingskist",
      shortName: "Kist",
      defaultAction: "activate",
      intro: "De kist hangt aan de kraan.",
      prompt: "Tel de voorraad voor het schip.",
      solved: "Sterk! De kist staat klaar.",
      questions: [
        { a: 5, b: 7 },
        { a: 8, b: 6 },
        { a: 10, b: 4 }
      ]
    },
    {
      id: "gateShield",
      objectId: "gateShield",
      name: "Poortschild",
      shortName: "Schild",
      defaultAction: "activate",
      intro: "Het schild op de poort gloeit blauw.",
      prompt: "Tel de tekens op het poortschild.",
      solved: "Goed zo! Het poortschild gaat open.",
      questions: [
        { a: 6, b: 9 },
        { a: 7, b: 8 },
        { a: 9, b: 5 }
      ]
    }
  ],
  reward: {
    title: "Het schip vertrekt!",
    badge: "Vikinghaven Helper",
    line: "Sven maakte de haven klaar. Nu vaart het schip naar het volgende avontuur.",
    art: "Levels/LVL-0003/assets/viking-harbor.png"
  }
};
