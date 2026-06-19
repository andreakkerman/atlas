window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0007"] = {
  id: "LVL-0007",
  title: "Het Tropische Eiland",
  subtitle: "De ontsnapping eindigt bij licht, water en palmen.",
  description: "Sven bereikt een tropische grot en opent de weg naar het eiland.",
  storageKey: "svenadventure-tropisch-eiland-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "surfaceGate",
  exitActionLabel: "Naar buiten",
  challengeLabel: "Eilandproef",
  challengeCompleteLabel: "Maak de route klaar",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "eilandproeven",
  menu: {
    illustration: "Levels/LVL-0007/assets/tropical-island-escape.png",
    badge: "Verbonden gebied",
    detail: "Grot, sloep en de weg naar buiten"
  },
  companion: {
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0007/assets/captain-nemo.png"
  },
  challengeCharacter: {
    id: "captain-nemo",
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0007/assets/captain-nemo.png",
    role: "kapitein van de Nautilus"
  },
  guides: {
    minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
    moose: { name: "Moose", portrait: "assets/guides/moose.png" }
  },
  world: {
    width: 2172,
    height: 724,
    aspectRatio: 3,
    viewportWidth: 1000,
    background: "Levels/LVL-0007/assets/tropical-island-escape.png"
  },
  challengeArt: "Levels/LVL-0007/assets/captain-nemo.png",
  player: {
    startNode: "left-hatch-start",
    start: { x: 252, y: 539 }
  },
  interactiveObjects: [
    {
      id: "escapeBoat",
      type: "rune",
      center: { x: 680, y: 440 },
      radius: 108,
      approachNode: "boat-approach",
      label: "Sloep"
    },
    {
      id: "islandWheel",
      type: "rune",
      center: { x: 1071, y: 256 },
      radius: 80,
      approachNode: "wheel-approach",
      label: "Stuurwiel"
    },
    {
      id: "islandMap",
      type: "rune",
      center: { x: 1377, y: 296 },
      radius: 88,
      approachNode: "map-approach",
      label: "Eilandkaart"
    },
    {
      id: "surfaceGate",
      type: "gate",
      center: { x: 1870, y: 367 },
      radius: 116,
      approachNode: "surface-gate-approach",
      label: "Eilandpoort"
    }
  ],
  walkPath: [
    { id: "left-hatch-start", x: 252, y: 539 },
    { id: "boat-approach", x: 700, y: 575, role: "approach" },
    { id: "grotto-center", x: 930, y: 570 },
    { id: "wheel-approach", x: 1072, y: 555, role: "approach" },
    { id: "map-approach", x: 1340, y: 555, role: "approach" },
    { id: "surface-gate-approach", x: 1782, y: 546, role: "approach" }
  ],
  intro: [
    "De minisub komt uit in een verborgen grot.",
    "Zonlicht valt op het water.",
    "De weg naar het eiland is nog geblokkeerd."
  ],
  spiritName: "Kapitein Nemo",
  spiritLines: {
    welcome: "De grot brengt jullie naar boven.",
    chooseRune: "Maak de eilandroute klaar.",
    moving: "Water drupt tussen de stenen.",
    allRunes: "De weg naar het eiland is vrij.",
    reward: "Sven bereikt het tropische eiland."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Oeh, ik zie zonlicht!" },
    start: { speaker: "minnie", text: "Daar is een sloep. En een weg naar buiten." },
    moving: { speaker: "moose", text: "Let op de natte stenen. Het licht is dichtbij." },
    grotto: { speaker: "moose", text: "Water links, rotsen rechts. Kies rustig je route." },
    object: { speaker: "minnie", text: "Ik voel zonlicht. Dit hoort bij de uitgang." },
    allRunes: { speaker: "moose", text: "De route klopt. Sven kan naar buiten." },
    reward: { speaker: "minnie", text: "We zijn buiten! Wat een avontuur." }
  },
  levelSemantics: {
    setting: "een verborgen grot met water, zonlicht en een uitgang naar een tropisch eiland",
    mood: "opluchting, avontuur en frisse lucht",
    companionFocus: {
      minnie: "zonlicht, water en het eiland buiten",
      moose: "natte stenen, routekeuzes en de veilige uitgang"
    }
  },
  companionMoments: [
    {
      id: "island-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Zonlicht! Deze grot heeft eindelijk goede manieren."
    },
    {
      id: "island-boat-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "escapeBoat",
      speaker: "moose",
      text: "Die sloep drijft nog. Dat is alvast één goed teken."
    },
    {
      id: "island-wheel-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "islandWheel",
      speaker: "minnie",
      text: "Een stuurwiel in een grot. Daar zit een route achter."
    },
    {
      id: "island-map-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "islandMap",
      speaker: "moose",
      text: "De eilandkaart is droog. Iemand dacht vooruit."
    },
    {
      id: "island-solved",
      event: "CHALLENGE_SUCCESS",
      speaker: "moose",
      text: "Die route staat vast. Niet uitglijden bij het vieren."
    },
    {
      id: "island-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "minnie",
      text: "Het zonlicht komt dichterbij. Bijna buiten!"
    },
    {
      id: "island-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De eilandpoort wacht nog. Eerst nog {remaining} routeproeven."
    },
    {
      id: "island-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De route klopt. Sven kan naar buiten."
    },
    {
      id: "island-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "minnie",
      text: "Frisse lucht! En een heel eiland om te bekijken."
    }
  ],
  areas: [
    { id: "grotto", name: "Eilandgrot", start: 0, end: 2172, guideLine: "grotto" }
  ],
  hotspots: [
    {
      id: "surfaceGate",
      objectId: "surfaceGate",
      type: "gate",
      name: "Eilandpoort",
      defaultAction: "activate",
      look: "De uitgang naar het eiland is geblokkeerd.",
      activate: "De uitgang gaat open. Sven stapt het eiland op."
    }
  ],
  runes: [
    {
      id: "escapeBoat",
      objectId: "escapeBoat",
      name: "Sloep",
      shortName: "Sloep",
      defaultAction: "activate",
      intro: "De sloep dobbert in het blauwe water.",
      prompt: "Tel de planken van de sloep.",
      solved: "Goed zo! De sloep ligt klaar.",
      questions: [
        { a: 4, b: 7 },
        { a: 6, b: 8 },
        { a: 5, b: 5 },
        { a: 3, b: 9 },
        { a: 8, b: 3 },
        { a: 10, b: 2 }
      ]
    },
    {
      id: "islandWheel",
      objectId: "islandWheel",
      name: "Stuurwiel",
      shortName: "Wiel",
      defaultAction: "activate",
      intro: "Het stuurwiel staat in het licht.",
      prompt: "Tel de spaken van het wiel.",
      solved: "Mooi! Het wiel draait naar buiten.",
      questions: [
        { a: 5, b: 6 },
        { a: 9, b: 3 },
        { a: 8, b: 4 },
        { a: 7, b: 2 },
        { a: 6, b: 7 },
        { a: 4, b: 9 }
      ]
    },
    {
      id: "islandMap",
      objectId: "islandMap",
      name: "Eilandkaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "De kaart toont de route naar palmen.",
      prompt: "Tel de stappen naar het eiland.",
      solved: "Sterk! De eilandroute is vrij.",
      questions: [
        { a: 8, b: 8 },
        { a: 10, b: 6 },
        { a: 7, b: 6 },
        { a: 9, b: 4 },
        { a: 6, b: 10 },
        { a: 5, b: 8 }
      ]
    }
  ],
  reward: {
    title: "Sven bereikt het eiland!",
    badge: "Nautilus Ontsnapper",
    line: "Sven ontsnapte uit de Nautilus en vond het tropische eiland.",
    art: "Levels/LVL-0007/assets/tropical-island-escape.png"
  }
};
