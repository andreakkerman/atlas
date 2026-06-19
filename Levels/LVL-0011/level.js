window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0011"] = {
  id: "LVL-0011",
  title: "De Netherproef",
  subtitle: "Lava en paarse gloed blokkeren de weg.",
  description: "Sven stapt een hete blokkenkamer binnen en zoekt de veilige uitgang.",
  storageKey: "atlas-blokkenpoort-netherproef-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "surfaceDoor",
  exitActionLabel: "Naar boven",
  challengeLabel: "Netherproef",
  challengeCompleteLabel: "Maak het teken wakker",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "nethertokens",
  menu: {
    illustration: "Levels/LVL-0011/assets/blokkenpoort-nether-trial.png",
    badge: "Verbonden gebied",
    detail: "Nethersteen, lava en een gevaarlijke poort"
  },
  companion: {
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0011/assets/dutchtuber-job.png"
  },
  challengeCharacter: {
    id: "dutchtuber-job",
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0011/assets/dutchtuber-job.png",
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
    background: "Levels/LVL-0011/assets/blokkenpoort-nether-trial.png"
  },
  challengeArt: "Levels/LVL-0011/assets/dutchtuber-job.png",
  player: {
    startNode: "left-door-start",
    start: { x: 245, y: 535 }
  },
  interactiveObjects: [
    {
      id: "potionTable",
      type: "rune",
      center: { x: 673, y: 412 },
      radius: 94,
      approachNode: "potion-approach",
      label: "Brouwtafel"
    },
    {
      id: "netherOrb",
      type: "rune",
      center: { x: 1077, y: 237 },
      radius: 45,
      approachNode: "orb-approach",
      label: "Netherbol"
    },
    {
      id: "netherMap",
      type: "rune",
      center: { x: 1471, y: 295 },
      radius: 74,
      approachNode: "map-approach",
      label: "Lavakaart"
    },
    {
      id: "surfaceDoor",
      type: "gate",
      center: { x: 1958, y: 402 },
      radius: 116,
      approachNode: "right-door-approach",
      label: "Oppervlaktedeur"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 245, y: 535 },
    { id: "potion-approach", x: 633, y: 598, role: "approach" },
    { id: "orb-approach", x: 1064, y: 589, role: "approach" },
    { id: "nether-center", x: 1279, y: 566 },
    { id: "map-approach", x: 1450, y: 561, role: "approach" },
    { id: "right-door-approach", x: 1928, y: 559, role: "approach" }
  ],
  intro: [
    "De kamer wordt rood en warm.",
    "Lava stroomt achter de stenen.",
    "Dutchtuber Job blijft verrassend rustig."
  ],
  spiritName: "Dutchtuber Job",
  spiritLines: {
    welcome: "Welkom in de Netherproef.",
    chooseRune: "Onderzoek de nethertokens.",
    moving: "De vloer straalt warmte uit.",
    allRunes: "De deur naar boven opent.",
    reward: "De hete kamer laat Sven gaan."
  },
  guideLines: {
    welcome: { speaker: "moose", text: "Warm. Heel warm. Geen rare sprongen." },
    start: { speaker: "minnie", text: "Dat paarse licht is prachtig en een beetje eng." },
    moving: { speaker: "moose", text: "Voeten op steen. Niet op lava." },
    nether: { speaker: "moose", text: "Hier wint rustig kijken van stoer doen." },
    object: { speaker: "minnie", text: "Dat blok pulseert alsof het ademt." },
    allRunes: { speaker: "moose", text: "De deur naar boven opent. Mooi moment om te gaan." },
    reward: { speaker: "moose", text: "Weg uit de hitte. Prima plan." }
  },
  levelSemantics: {
    setting: "een hete Netherkamer met lava, paarse kristallen en gesloten deuren",
    mood: "spannend, warm en gevaarlijk",
    companionFocus: {
      minnie: "paarse gloed, rare kristallen en vonken",
      moose: "lava, veilige steen en snel maar rustig vertrekken"
    }
  },
  companionMoments: [
    {
      id: "nether-enter",
      event: "LEVEL_ENTER",
      speaker: "moose",
      text: "Warm. Heel warm. Vandaag geen heldhaftige sprongen."
    },
    {
      id: "nether-potion-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "potionTable",
      speaker: "minnie",
      text: "Die brouwtafel borrelt zonder pan. Dat wil ik begrijpen."
    },
    {
      id: "nether-orb-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "netherOrb",
      speaker: "moose",
      text: "Die bol gloeit. Niet aanklikken met je neus."
    },
    {
      id: "nether-map-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "netherMap",
      speaker: "minnie",
      text: "De lavakaart heeft koele lijnen. Gelukkig maar."
    },
    {
      id: "nether-solved",
      event: "CHALLENGE_SUCCESS",
      speaker: "moose",
      text: "Dat teken is klaar. De lava mag rustig blijven."
    },
    {
      id: "nether-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "minnie",
      text: "De paarse gloed wijst steeds duidelijker omhoog."
    },
    {
      id: "nether-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De deur naar boven blijft dicht. Hier wachten is warm."
    },
    {
      id: "nether-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De deur naar boven opent. Mooi moment om te gaan."
    },
    {
      id: "nether-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "moose",
      text: "Weg uit de hitte. Uitstekend avontuurbeleid."
    }
  ],
  areas: [
    { id: "nether", name: "Netherproef", start: 0, end: 2172, guideLine: "nether" }
  ],
  hotspots: [
    {
      id: "surfaceDoor",
      objectId: "surfaceDoor",
      type: "gate",
      name: "Oppervlaktedeur",
      defaultAction: "activate",
      look: "Een zware deur naar boven. Hij opent na drie nethertokens.",
      activate: "De deur naar boven gaat open."
    }
  ],
  runes: [
    {
      id: "potionTable",
      objectId: "potionTable",
      name: "Brouwtafel",
      shortName: "Brouwsel",
      defaultAction: "activate",
      intro: "Flesjes borrelen op de brouwtafel.",
      prompt: "Tel de borrelende flesjes.",
      solved: "Mooi! De flesjes stoppen met pruttelen.",
      questions: [
        { a: 3, b: 9 },
        { a: 4, b: 7 },
        { a: 5, b: 8 },
        { a: 6, b: 5 },
        { a: 8, b: 2 },
        { a: 9, b: 4 }
      ]
    },
    {
      id: "netherOrb",
      objectId: "netherOrb",
      name: "Netherbol",
      shortName: "Bol",
      defaultAction: "activate",
      intro: "De paarse bol draait in vuurlicht.",
      prompt: "Tel de paarse pulsen.",
      solved: "Goed zo! De bol blijft in balans.",
      questions: [
        { a: 6, b: 7 },
        { a: 8, b: 4 },
        { a: 7, b: 5 },
        { a: 10, b: 3 },
        { a: 9, b: 6 },
        { a: 5, b: 9 }
      ]
    },
    {
      id: "netherMap",
      objectId: "netherMap",
      name: "Lavakaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "De kaart toont veilige stenen tussen lava.",
      prompt: "Tel de veilige stenen.",
      solved: "Sterk! De kaart vindt de deur.",
      questions: [
        { a: 8, b: 8 },
        { a: 7, b: 9 },
        { a: 10, b: 6 },
        { a: 6, b: 8 },
        { a: 9, b: 7 },
        { a: 10, b: 8 }
      ]
    }
  ],
  reward: {
    title: "De deur naar boven opent!",
    badge: "Netherdurver",
    line: "Sven hield zijn hoofd koel in de hete Netherproef.",
    art: "Levels/LVL-0011/assets/blokkenpoort-nether-trial.png",
    nextLevelId: "LVL-0012",
    nextLabel: "Naar boven"
  }
};
