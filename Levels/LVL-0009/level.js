window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0009"] = {
  id: "LVL-0009",
  title: "De Ontwaakte Kamer",
  subtitle: "De Blokkenpoort begint te gloeien.",
  description: "Sven komt in een warmere kamer waar kaarten, boeken en een wakker portaal reageren.",
  storageKey: "atlas-blokkenpoort-ontwaakte-kamer-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "ironDoor",
  exitActionLabel: "Naar het strand",
  challengeLabel: "Blokkenproef",
  challengeCompleteLabel: "Maak het teken wakker",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "tekens",
  menu: {
    illustration: "Levels/LVL-0009/assets/blokkenpoort-awakened-room.png",
    badge: "Verbonden gebied",
    detail: "Kaarten, boeken en een wakker portaal"
  },
  companion: {
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0009/assets/dutchtuber-job.png"
  },
  challengeCharacter: {
    id: "dutchtuber-job",
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0009/assets/dutchtuber-job.png",
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
    background: "Levels/LVL-0009/assets/blokkenpoort-awakened-room.png"
  },
  challengeArt: "Levels/LVL-0009/assets/dutchtuber-job.png",
  player: {
    startNode: "left-gate-start",
    start: { x: 245, y: 545 }
  },
  interactiveObjects: [
    {
      id: "worldMap",
      type: "rune",
      center: { x: 638, y: 265 },
      radius: 92,
      approachNode: "map-approach",
      label: "Wereldkaart"
    },
    {
      id: "openBook",
      type: "rune",
      center: { x: 840, y: 340 },
      radius: 76,
      approachNode: "book-approach",
      label: "Open boek"
    },
    {
      id: "crystalCase",
      type: "rune",
      center: { x: 1388, y: 223 },
      radius: 94,
      approachNode: "crystal-approach",
      label: "Kristalkast"
    },
    {
      id: "ironDoor",
      type: "gate",
      center: { x: 2043, y: 389 },
      radius: 108,
      approachNode: "right-door-approach",
      label: "IJzeren deur"
    }
  ],
  walkPath: [
    { id: "left-gate-start", x: 208, y: 497 },
    { id: "map-approach", x: 593, y: 476, role: "approach" },
    { id: "book-approach", x: 829, y: 481, role: "approach" },
    { id: "portal-front", x: 1085, y: 512 },
    { id: "crystal-approach", x: 1390, y: 481, role: "approach" },
    { id: "right-door-approach", x: 1967, y: 492, role: "approach" }
  ],
  intro: [
    "De volgende kamer is wakker.",
    "Het portaal in het midden fluistert zacht.",
    "Dutchtuber Job wijst naar nieuwe bloktekens."
  ],
  spiritName: "Dutchtuber Job",
  spiritLines: {
    welcome: "De kamer is wakker.",
    chooseRune: "Onderzoek de tekens.",
    moving: "De lampen wiegen aan hun kettingen.",
    allRunes: "De ijzeren deur klikt open.",
    reward: "De strandkamer wacht."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Hier leeft de kamer echt." },
    start: { speaker: "minnie", text: "Die kristal glimt paars. Heel verdacht." },
    moving: { speaker: "moose", text: "Geen haast. Kettingen boven je hoofd." },
    chamber: { speaker: "moose", text: "Die ijzeren deur ziet er koppig uit." },
    object: { speaker: "minnie", text: "Dit teken lijkt net wakker geworden." },
    allRunes: { speaker: "moose", text: "De deur geeft mee. Voorzichtig door." },
    reward: { speaker: "minnie", text: "Ik ruik bijna frisse lucht." }
  },
  levelSemantics: {
    setting: "een ontwaakte blokkenkamer met kaarten, boeken en kristallicht",
    mood: "warm, geheimzinnig en levend",
    companionFocus: {
      minnie: "paarse kristallen, kaarten en bewegend portaallicht",
      moose: "kettingen, deuren en de veilige route door de kamer"
    }
  },
  companionMoments: [
    {
      id: "awakened-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Hier leeft de kamer echt."
    },
    {
      id: "awakened-look",
      event: "OBJECT_FIRST_LOOK",
      speaker: "minnie",
      text: "Dat teken lijkt net wakker geworden."
    },
    {
      id: "awakened-open",
      event: "CHALLENGE_OPEN",
      speaker: "moose",
      text: "Job wacht op een nette oplossing.",
      bridge: "Even opletten."
    },
    {
      id: "awakened-fail",
      event: "CHALLENGE_FAIL_1",
      speaker: "moose",
      text: "Bijna. De deur blijft nog koppig."
    },
    {
      id: "awakened-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De deur geeft mee. Voorzichtig door."
    },
    {
      id: "awakened-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "minnie",
      text: "Ik ruik bijna frisse lucht."
    }
  ],
  areas: [
    { id: "chamber", name: "Ontwaakte Kamer", start: 0, end: 2172, guideLine: "chamber" }
  ],
  hotspots: [
    {
      id: "ironDoor",
      objectId: "ironDoor",
      type: "gate",
      name: "IJzeren deur",
      defaultAction: "activate",
      look: "Een zware ijzeren deur. Hij opent na drie tekens.",
      activate: "De ijzeren deur gaat open."
    }
  ],
  runes: [
    {
      id: "worldMap",
      objectId: "worldMap",
      name: "Wereldkaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "Op de kaart verschijnen blokroutes.",
      prompt: "Tel de routeblokken.",
      solved: "Mooi! De kaart tekent een pad.",
      questions: [
        { a: 3, b: 8 },
        { a: 4, b: 5 },
        { a: 6, b: 6 },
        { a: 7, b: 2 },
        { a: 9, b: 3 },
        { a: 5, b: 7 }
      ]
    },
    {
      id: "openBook",
      objectId: "openBook",
      name: "Open boek",
      shortName: "Boek",
      defaultAction: "activate",
      intro: "Het boek slaat vanzelf een pagina om.",
      prompt: "Tel de blokregels.",
      solved: "Goed zo! Het boek stopt met ritselen.",
      questions: [
        { a: 4, b: 8 },
        { a: 6, b: 4 },
        { a: 8, b: 5 },
        { a: 10, b: 2 },
        { a: 7, b: 6 },
        { a: 9, b: 4 }
      ]
    },
    {
      id: "crystalCase",
      objectId: "crystalCase",
      name: "Kristalkast",
      shortName: "Kristal",
      defaultAction: "activate",
      intro: "De kristal zweeft in paarse damp.",
      prompt: "Tel de lichtpulsen.",
      solved: "Sterk! De kristal blijft stil hangen.",
      questions: [
        { a: 8, b: 6 },
        { a: 7, b: 7 },
        { a: 5, b: 9 },
        { a: 10, b: 4 },
        { a: 6, b: 8 },
        { a: 9, b: 6 }
      ]
    }
  ],
  reward: {
    title: "De ijzeren deur opent!",
    badge: "Blokkenzoeker",
    line: "Sven maakte de ontwaakte kamer rustig. Achter de deur klinkt water.",
    art: "Levels/LVL-0009/assets/blokkenpoort-awakened-room.png",
    nextLevelId: "LVL-0010",
    nextLabel: "Naar het strand"
  }
};
