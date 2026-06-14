window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0012"] = {
  id: "LVL-0012",
  title: "De Weg Naar Huis",
  subtitle: "Achter de laatste poort wacht de echte wereld.",
  description: "Sven vindt de laatste blokkenkamer met zonlicht, een portaal en de uitgang naar huis.",
  storageKey: "atlas-blokkenpoort-weg-naar-huis-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "homeExit",
  exitActionLabel: "Naar huis",
  challengeLabel: "Thuisproef",
  challengeCompleteLabel: "Maak het laatste teken wakker",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "laatste tekens",
  menu: {
    illustration: "Levels/LVL-0012/assets/blokkenpoort-way-home.png",
    badge: "Finale",
    detail: "Zonlicht, portalen en de uitgang naar huis"
  },
  companion: {
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0012/assets/dutchtuber-job.png"
  },
  challengeCharacter: {
    id: "dutchtuber-job",
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0012/assets/dutchtuber-job.png",
    role: "blokwachter"
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
    background: "Levels/LVL-0012/assets/blokkenpoort-way-home.png"
  },
  challengeArt: "Levels/LVL-0012/assets/dutchtuber-job.png",
  player: {
    startNode: "left-door-start",
    start: { x: 238, y: 540 }
  },
  interactiveObjects: [
    {
      id: "homeMap",
      type: "rune",
      center: { x: 605, y: 350 },
      radius: 92,
      approachNode: "map-approach",
      label: "Thuiskaart"
    },
    {
      id: "enchantTable",
      type: "rune",
      center: { x: 880, y: 425 },
      radius: 92,
      approachNode: "table-approach",
      label: "Betovertafel"
    },
    {
      id: "purplePortal",
      type: "rune",
      center: { x: 1360, y: 318 },
      radius: 112,
      approachNode: "portal-approach",
      label: "Paars portaal"
    },
    {
      id: "homeExit",
      type: "gate",
      center: { x: 1990, y: 330 },
      radius: 120,
      approachNode: "home-exit-approach",
      label: "Uitgang naar huis"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 238, y: 540 },
    { id: "map-approach", x: 610, y: 520, role: "approach" },
    { id: "table-approach", x: 880, y: 530, role: "approach" },
    { id: "portal-approach", x: 1360, y: 514, role: "approach" },
    { id: "garden-path", x: 1600, y: 520 },
    { id: "home-exit-approach", x: 1908, y: 532, role: "approach" }
  ],
  intro: [
    "Boven de kamer schijnt echt zonlicht.",
    "Door de opening rechts ziet Sven de straat.",
    "Dutchtuber Job glimlacht bij de laatste proef."
  ],
  spiritName: "Dutchtuber Job",
  spiritLines: {
    welcome: "Dit is de weg naar huis.",
    chooseRune: "Onderzoek de laatste tekens.",
    moving: "Buiten fluiten vogels.",
    allRunes: "De uitgang naar huis is klaar.",
    reward: "Sven is terug."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Zon! Ik wist dat we eruit kwamen." },
    start: { speaker: "minnie", text: "Daar rechts is de echte wereld." },
    moving: { speaker: "moose", text: "Nog even netjes blijven lopen." },
    garden: { speaker: "moose", text: "Laatste kamer. Niet struikelen over de finish." },
    object: { speaker: "minnie", text: "Dit teken ruikt bijna naar buitenlucht." },
    allRunes: { speaker: "moose", text: "De uitgang is klaar. Tijd om naar huis te gaan." },
    reward: { speaker: "minnie", text: "We zijn terug! Wat een reis." }
  },
  levelSemantics: {
    setting: "een zonnige blokkenkamer met een portaal en zicht op de echte straat",
    mood: "opluchtend, helder en feestelijk",
    companionFocus: {
      minnie: "zonlicht, bloemen, portaalglans en de straat buiten",
      moose: "laatste stappen, veilige uitgang en rustig afronden"
    }
  },
  companionMoments: [
    {
      id: "home-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Zon! Ik wist dat we eruit kwamen."
    },
    {
      id: "home-look",
      event: "OBJECT_FIRST_LOOK",
      speaker: "minnie",
      text: "Dit teken ruikt bijna naar buitenlucht."
    },
    {
      id: "home-open",
      event: "CHALLENGE_OPEN",
      speaker: "moose",
      text: "Job bewaart de laatste sleutel netjes.",
      bridge: "Even opletten."
    },
    {
      id: "home-fail",
      event: "CHALLENGE_FAIL_1",
      speaker: "moose",
      text: "Bijna. De voordeur loopt niet weg."
    },
    {
      id: "home-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De uitgang is klaar. Tijd om naar huis te gaan."
    },
    {
      id: "home-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "minnie",
      text: "We zijn terug! Wat een reis."
    }
  ],
  areas: [
    { id: "garden", name: "Weg Naar Huis", start: 0, end: 2172, guideLine: "garden" }
  ],
  hotspots: [
    {
      id: "homeExit",
      objectId: "homeExit",
      type: "gate",
      name: "Uitgang naar huis",
      defaultAction: "activate",
      look: "Door de opening rechts ziet Sven de echte straat.",
      activate: "Sven stapt terug naar huis."
    }
  ],
  runes: [
    {
      id: "homeMap",
      objectId: "homeMap",
      name: "Thuiskaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "De kaart toont de laatste route.",
      prompt: "Tel de blokken naar huis.",
      solved: "Mooi! De kaart wijst naar rechts.",
      questions: [
        { a: 3, b: 6 },
        { a: 4, b: 8 },
        { a: 5, b: 7 },
        { a: 6, b: 4 },
        { a: 7, b: 3 },
        { a: 8, b: 5 }
      ]
    },
    {
      id: "enchantTable",
      objectId: "enchantTable",
      name: "Betovertafel",
      shortName: "Tafel",
      defaultAction: "activate",
      intro: "De betovertafel knispert zacht.",
      prompt: "Tel de lichtletters.",
      solved: "Goed zo! De tafel klapt dicht.",
      questions: [
        { a: 6, b: 7 },
        { a: 8, b: 3 },
        { a: 9, b: 4 },
        { a: 7, b: 8 },
        { a: 10, b: 5 },
        { a: 5, b: 9 }
      ]
    },
    {
      id: "purplePortal",
      objectId: "purplePortal",
      name: "Paars portaal",
      shortName: "Portaal",
      defaultAction: "activate",
      intro: "Het portaal zoemt tussen twee werelden.",
      prompt: "Tel de paarse blokken.",
      solved: "Sterk! Het portaal wijst naar de uitgang.",
      questions: [
        { a: 8, b: 8 },
        { a: 9, b: 6 },
        { a: 10, b: 7 },
        { a: 6, b: 9 },
        { a: 7, b: 10 },
        { a: 9, b: 8 }
      ]
    }
  ],
  reward: {
    title: "Sven is terug!",
    badge: "Blokkenpoort Held",
    line: "Sven vond de weg door alle blokkenkamers en stapte terug naar de echte wereld.",
    art: "Levels/LVL-0012/assets/blokkenpoort-way-home.png"
  }
};
