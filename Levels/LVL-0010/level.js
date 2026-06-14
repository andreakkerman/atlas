window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0010"] = {
  id: "LVL-0010",
  title: "De Strandkamer",
  subtitle: "Een kamer vol zand, water en geheime blokken.",
  description: "Sven bereikt een strandkamer waar zandkastelen, schatten en een houten boot de weg bewaken.",
  storageKey: "atlas-blokkenpoort-strandkamer-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "stoneDoor",
  exitActionLabel: "Naar de Nether",
  challengeLabel: "Strandproef",
  challengeCompleteLabel: "Maak het strandteken wakker",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "strandtekens",
  menu: {
    illustration: "Levels/LVL-0010/assets/blokkenpoort-beach-room.png",
    badge: "Verbonden gebied",
    detail: "Strand, schatten en een houten boot"
  },
  companion: {
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0010/assets/dutchtuber-job.png"
  },
  challengeCharacter: {
    id: "dutchtuber-job",
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0010/assets/dutchtuber-job.png",
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
    background: "Levels/LVL-0010/assets/blokkenpoort-beach-room.png"
  },
  challengeArt: "Levels/LVL-0010/assets/dutchtuber-job.png",
  player: {
    startNode: "left-door-start",
    start: { x: 245, y: 488 }
  },
  interactiveObjects: [
    {
      id: "treasureMap",
      type: "rune",
      center: { x: 575, y: 285 },
      radius: 92,
      approachNode: "map-approach",
      label: "Schatkaart"
    },
    {
      id: "sandCastle",
      type: "rune",
      center: { x: 1062, y: 350 },
      radius: 100,
      approachNode: "castle-approach",
      label: "Zandkasteel"
    },
    {
      id: "woodenBoat",
      type: "rune",
      center: { x: 1532, y: 290 },
      radius: 118,
      approachNode: "boat-approach",
      label: "Houten boot"
    },
    {
      id: "stoneDoor",
      type: "gate",
      center: { x: 2008, y: 360 },
      radius: 108,
      approachNode: "right-door-approach",
      label: "Stenen deur"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 245, y: 488 },
    { id: "map-approach", x: 575, y: 485, role: "approach" },
    { id: "castle-approach", x: 1060, y: 486, role: "approach" },
    { id: "beach-center", x: 1330, y: 488 },
    { id: "boat-approach", x: 1510, y: 485, role: "approach" },
    { id: "right-door-approach", x: 1900, y: 488, role: "approach" }
  ],
  intro: [
    "Achter de deur ligt een strand in een kamer.",
    "Water klotst tegen de blokkenrand.",
    "Dutchtuber Job wijst naar de strandtekens."
  ],
  spiritName: "Dutchtuber Job",
  spiritLines: {
    welcome: "Welkom in de Strandkamer.",
    chooseRune: "Onderzoek de strandtekens.",
    moving: "Zand schuift onder Svens schoenen.",
    allRunes: "De stenen deur gaat open.",
    reward: "De weg naar de Nether verschijnt."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Een strand binnen een kamer. Dat is handig." },
    start: { speaker: "minnie", text: "Ik zie schatten, zand en water." },
    moving: { speaker: "moose", text: "Niet te dicht bij het water." },
    beach: { speaker: "moose", text: "Zand lijkt zacht. De deur niet." },
    object: { speaker: "minnie", text: "Dat strandding wil vast iets vertellen." },
    allRunes: { speaker: "moose", text: "De stenen deur is klaar. Warm wordt het wel." },
    reward: { speaker: "moose", text: "Doorlopen. Ik ruik rook." }
  },
  levelSemantics: {
    setting: "een blokkenstrand met water, schatten en een houten boot",
    mood: "licht, vreemd en avontuurlijk",
    companionFocus: {
      minnie: "schelpen, schatten, zandkastelen en blauwe glans",
      moose: "waterkanten, glad zand en de deur naar een warmere kamer"
    }
  },
  companionMoments: [
    {
      id: "beach-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Een strand binnen een kamer. Dat is handig."
    },
    {
      id: "beach-look",
      event: "OBJECT_FIRST_LOOK",
      speaker: "minnie",
      text: "Dit strandding bewaart duidelijk een geheim."
    },
    {
      id: "beach-open",
      event: "CHALLENGE_OPEN",
      speaker: "moose",
      text: "Job lijkt zand serieus te nemen.",
      bridge: "Even opletten."
    },
    {
      id: "beach-fail",
      event: "CHALLENGE_FAIL_1",
      speaker: "moose",
      text: "Bijna. Geen zand in je hoofd laten waaien."
    },
    {
      id: "beach-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De stenen deur is klaar. Warm wordt het wel."
    },
    {
      id: "beach-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "moose",
      text: "Doorlopen. Ik ruik rook."
    }
  ],
  areas: [
    { id: "beach", name: "Strandkamer", start: 0, end: 2172, guideLine: "beach" }
  ],
  hotspots: [
    {
      id: "stoneDoor",
      objectId: "stoneDoor",
      type: "gate",
      name: "Stenen deur",
      defaultAction: "activate",
      look: "Een grijze deur met rode lampen. Hij wacht op drie strandtekens.",
      activate: "De stenen deur kraakt open."
    }
  ],
  runes: [
    {
      id: "treasureMap",
      objectId: "treasureMap",
      name: "Schatkaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "De kaart toont een route over het zand.",
      prompt: "Tel de strandstappen.",
      solved: "Mooi! De kaart wijst naar de boot.",
      questions: [
        { a: 2, b: 9 },
        { a: 3, b: 7 },
        { a: 4, b: 4 },
        { a: 5, b: 6 },
        { a: 8, b: 3 },
        { a: 7, b: 5 }
      ]
    },
    {
      id: "sandCastle",
      objectId: "sandCastle",
      name: "Zandkasteel",
      shortName: "Kasteel",
      defaultAction: "activate",
      intro: "Het zandkasteel heeft kleine torens.",
      prompt: "Tel de zandtorens.",
      solved: "Goed zo! Het kasteel blijft stevig staan.",
      questions: [
        { a: 4, b: 9 },
        { a: 6, b: 6 },
        { a: 8, b: 5 },
        { a: 9, b: 3 },
        { a: 7, b: 4 },
        { a: 10, b: 2 }
      ]
    },
    {
      id: "woodenBoat",
      objectId: "woodenBoat",
      name: "Houten boot",
      shortName: "Boot",
      defaultAction: "activate",
      intro: "De boot kraakt alsof hij wil vertrekken.",
      prompt: "Tel de houten planken.",
      solved: "Sterk! De boot wijst naar de deur.",
      questions: [
        { a: 6, b: 8 },
        { a: 7, b: 7 },
        { a: 9, b: 5 },
        { a: 8, b: 7 },
        { a: 10, b: 6 },
        { a: 5, b: 10 }
      ]
    }
  ],
  reward: {
    title: "De stranddeur opent!",
    badge: "Strandbouwer",
    line: "Sven maakte de strandtekens wakker. Achter de deur gloeit rood licht.",
    art: "Levels/LVL-0010/assets/blokkenpoort-beach-room.png",
    nextLevelId: "LVL-0011",
    nextLabel: "Naar de Nether"
  }
};
