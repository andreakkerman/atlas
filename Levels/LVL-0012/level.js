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
      center: { x: 713, y: 321 },
      radius: 66,
      approachNode: "map-approach",
      label: "Thuiskaart"
    },
    {
      id: "enchantTable",
      type: "rune",
      center: { x: 936, y: 432 },
      radius: 50,
      approachNode: "table-approach",
      label: "Betovertafel"
    },
    {
      id: "purplePortal",
      type: "rune",
      center: { x: 1339, y: 301 },
      radius: 49,
      approachNode: "portal-approach",
      label: "Paars portaal"
    },
    {
      id: "homeExit",
      type: "gate",
      center: { x: 1911, y: 418 },
      radius: 97,
      approachNode: "home-exit-approach",
      label: "Uitgang naar huis"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 247, y: 577 },
    { id: "map-approach", x: 602, y: 601, role: "approach" },
    { id: "table-approach", x: 911, y: 558, role: "approach" },
    { id: "portal-approach", x: 1294, y: 528, role: "approach" },
    { id: "garden-path", x: 1606, y: 587 },
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
      text: "Zon, bloemen en de straat! We zijn bijna echt thuis."
    },
    {
      id: "home-map-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "homeMap",
      speaker: "minnie",
      text: "De thuiskaart kent de laatste bocht. Kijk hoe hij glanst."
    },
    {
      id: "home-table-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "enchantTable",
      speaker: "moose",
      text: "Die betovertafel fluistert. Ik doe alsof ik niets hoor."
    },
    {
      id: "home-portal-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "purplePortal",
      speaker: "minnie",
      text: "Het paarse portaal laat de buitenlucht al schitteren."
    },
    {
      id: "home-solved",
      event: "CHALLENGE_SUCCESS",
      speaker: "moose",
      text: "Klaar. Nog één stap dichter bij gewone stoeptegels."
    },
    {
      id: "home-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "minnie",
      text: "De uitgang wordt helderder. Ik zie de straat al!"
    },
    {
      id: "home-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De uitgang wacht nog. De voordeur loopt niet weg."
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
      text: "We zijn terug! Zelfs de straat ziet er feestelijk uit."
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
