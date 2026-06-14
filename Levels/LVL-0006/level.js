window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0006"] = {
  id: "LVL-0006",
  title: "De Minisub",
  subtitle: "Diep in de Nautilus wacht de kleine onderzeeer.",
  description: "Sven vindt de minisub en maakt het ontsnappingsluik klaar.",
  storageKey: "svenadventure-nautilus-minisub-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "escapeHatch",
  exitActionLabel: "Ontsnappen",
  challengeLabel: "Hangarproef",
  challengeCompleteLabel: "Maak het luik klaar",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "hangarproeven",
  menu: {
    illustration: "Levels/LVL-0006/assets/nautilus-mini-sub.png",
    badge: "Verbonden gebied",
    detail: "Hangar, drukmeters en ontsnappingsluik"
  },
  companion: {
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0006/assets/captain-nemo.png"
  },
  challengeCharacter: {
    id: "captain-nemo",
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0006/assets/captain-nemo.png",
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
    background: "Levels/LVL-0006/assets/nautilus-mini-sub.png"
  },
  challengeArt: "Levels/LVL-0006/assets/captain-nemo.png",
  player: {
    start: { x: 180, y: 590 }
  },
  interactiveObjects: [
    {
      id: "divingSuit",
      type: "rune",
      center: { x: 565, y: 328 },
      radius: 78,
      approachNode: "suit-approach",
      label: "Duikpak"
    },
    {
      id: "miniSub",
      type: "rune",
      center: { x: 972, y: 311 },
      radius: 118,
      approachNode: "mini-sub-approach",
      label: "Minisub"
    },
    {
      id: "controlPanel",
      type: "rune",
      center: { x: 1613, y: 326 },
      radius: 82,
      approachNode: "control-panel-approach",
      label: "Drukpaneel"
    },
    {
      id: "escapeHatch",
      type: "gate",
      center: { x: 1953, y: 353 },
      radius: 112,
      approachNode: "hatch-approach",
      label: "Ontsnappingsluik"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 219, y: 522 },
    { id: "suit-approach", x: 555, y: 475, role: "approach" },
    { id: "hangar-center-left", x: 783, y: 503 },
    { id: "mini-sub-approach", x: 972, y: 494, role: "approach" },
    { id: "hangar-center-right", x: 1368, y: 493 },
    { id: "control-panel-approach", x: 1571, y: 513, role: "approach" },
    { id: "hatch-approach", x: 1851, y: 516, role: "approach" }
  ],
  intro: [
    "Sven komt in de hangar van de Nautilus.",
    "In het midden ligt een kleine onderzeeer.",
    "Het ontsnappingsluik zit nog vast."
  ],
  spiritName: "Kapitein Nemo",
  spiritLines: {
    welcome: "De minisub wacht.",
    chooseRune: "Maak de hangar klaar.",
    moving: "Sven loopt langs de machines...",
    allRunes: "Het ontsnappingsluik is veilig.",
    reward: "De minisub kan vertrekken."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Oeh, een kleine duikboot in een grote duikboot." },
    start: { speaker: "minnie", text: "Daar staan meters, pakken en hendels." },
    moving: { speaker: "moose", text: "Niet rennen. Hier is alles glad." },
    hangar: { speaker: "moose", text: "Controleer eerst de druk. Dan pas naar buiten." },
    object: { speaker: "minnie", text: "Dit ziet eruit als een echte ontsnapping." },
    allRunes: { speaker: "moose", text: "De druk klopt. Het luik kan veilig open." },
    reward: { speaker: "moose", text: "Naar buiten. Rustig en precies." }
  },
  areas: [
    { id: "hangar", name: "Minisubhangar", start: 0, end: 2172, guideLine: "hangar" }
  ],
  hotspots: [
    {
      id: "escapeHatch",
      objectId: "escapeHatch",
      type: "gate",
      name: "Ontsnappingsluik",
      defaultAction: "activate",
      look: "Een rond luik naar buiten. De druk moet eerst goed zijn.",
      activate: "Het luik opent naar een verborgen grot."
    }
  ],
  runes: [
    {
      id: "divingSuit",
      objectId: "divingSuit",
      name: "Duikpak",
      shortName: "Pak",
      defaultAction: "activate",
      intro: "Het duikpak heeft koperen sluitingen.",
      prompt: "Tel de sluitingen van het duikpak.",
      solved: "Goed zo! Het pak is gecontroleerd.",
      questions: [
        { a: 3, b: 7 },
        { a: 4, b: 9 }
      ]
    },
    {
      id: "miniSub",
      objectId: "miniSub",
      name: "Minisub",
      shortName: "Sub",
      defaultAction: "activate",
      intro: "De kleine onderzeeer borrelt zacht.",
      prompt: "Tel de ronde raampjes van de minisub.",
      solved: "Mooi! De minisub is wakker.",
      questions: [
        { a: 6, b: 6 },
        { a: 8, b: 4 }
      ]
    },
    {
      id: "controlPanel",
      objectId: "controlPanel",
      name: "Drukpaneel",
      shortName: "Paneel",
      defaultAction: "activate",
      intro: "De meters tikken in groepjes.",
      prompt: "Tel de drukmeters op het paneel.",
      solved: "Sterk! De druk staat goed.",
      questions: [
        { a: 7, b: 8 },
        { a: 9, b: 5 }
      ]
    }
  ],
  reward: {
    title: "Het luik opent!",
    badge: "Minisub Piloot",
    line: "Sven maakte de hangar klaar. De minisub ontsnapt naar een verborgen grot.",
    art: "Levels/LVL-0006/assets/nautilus-mini-sub.png",
    nextLevelId: "LVL-0007",
    nextLabel: "Naar het eiland"
  }
};
