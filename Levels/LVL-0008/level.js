window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0008"] = {
  id: "LVL-0008",
  title: "De Blokkenpoort",
  subtitle: "Een verzegelde kamer vol blokken en geheimen.",
  description: "Sven vindt een blokkenkamer met een donkere poort en drie vreemde tekens.",
  storageKey: "atlas-blokkenpoort-kamer-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "rightGate",
  exitActionLabel: "Door de poort",
  challengeLabel: "Blokkenproef",
  challengeCompleteLabel: "Maak het teken wakker",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "tekens",
  menu: {
    illustration: "Levels/LVL-0008/assets/blokkenpoort-sealed-room.png",
    badge: "Nieuw avontuur",
    detail: "Blokkenkamers, portalen en Dutchtuber Job"
  },
  companion: {
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0008/assets/dutchtuber-job.png"
  },
  challengeCharacter: {
    id: "dutchtuber-job",
    name: "Dutchtuber Job",
    portrait: "Levels/LVL-0008/assets/dutchtuber-job.png",
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
    background: "Levels/LVL-0008/assets/blokkenpoort-sealed-room.png"
  },
  challengeArt: "Levels/LVL-0008/assets/dutchtuber-job.png",
  player: {
    startNode: "left-door-start",
    start: { x: 260, y: 575 }
  },
  interactiveObjects: [
    {
      id: "diamondSword",
      type: "rune",
      center: { x: 622, y: 203 },
      radius: 70,
      approachNode: "sword-approach",
      label: "Diamantzwaard"
    },
    {
      id: "creeperMask",
      type: "rune",
      center: { x: 745, y: 190 },
      radius: 68,
      approachNode: "mask-approach",
      label: "Creepermasker"
    },
    {
      id: "enderPortal",
      type: "rune",
      center: { x: 1113, y: 356 },
      radius: 112,
      approachNode: "portal-approach",
      label: "Donkere poort"
    },
    {
      id: "rightGate",
      type: "gate",
      center: { x: 1960, y: 322 },
      radius: 118,
      approachNode: "right-gate-approach",
      label: "Rechterpoort"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 272, y: 470 },
    { id: "sword-approach", x: 595, y: 566, role: "approach" },
    { id: "mask-approach", x: 791, y: 528, role: "approach" },
    { id: "portal-approach", x: 1104, y: 523, role: "approach" },
    { id: "room-center", x: 1285, y: 560 },
    { id: "right-gate-approach", x: 1917, y: 447, role: "approach" }
  ],
  intro: [
    "Sven staat in een verzegelde blokkenkamer.",
    "In het midden bromt een donkere poort.",
    "Dutchtuber Job kent de eerste blokkenproef."
  ],
  spiritName: "Dutchtuber Job",
  spiritLines: {
    welcome: "Welkom in de Blokkenpoort.",
    chooseRune: "Onderzoek de bloktekens.",
    moving: "De stenen vloer kraakt zacht.",
    allRunes: "De rechterpoort reageert.",
    reward: "De kamer ontwaakt."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Oeh, deze kamer houdt zijn adem in." },
    start: { speaker: "minnie", text: "Ik zie blokken die niet stil willen blijven." },
    moving: { speaker: "moose", text: "Rustig. Oude kamers hebben oude valstrikken." },
    chamber: { speaker: "moose", text: "Die poort is dicht, maar niet dood." },
    object: { speaker: "minnie", text: "Dat teken glimt alsof het luistert." },
    allRunes: { speaker: "moose", text: "De rechterpoort reageert. Nu netjes verder." },
    reward: { speaker: "minnie", text: "De kamer wordt wakker!" }
  },
  levelSemantics: {
    setting: "een verzegelde blokkenkamer met een donkere poort",
    mood: "stil, oud en magisch",
    companionFocus: {
      minnie: "glimmende bloktekens, paars licht en rare voorwerpen",
      moose: "gesloten deuren, veilige stenen en het zware portaal"
    }
  },
  companionMoments: [
    {
      id: "sealed-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Deze blokkenkamer houdt zijn adem in. Ik hoor het bijna."
    },
    {
      id: "sealed-sword-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "diamondSword",
      speaker: "minnie",
      text: "Dat diamantzwaard glimt veel te trots. Er zit vast een patroon in."
    },
    {
      id: "sealed-mask-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "creeperMask",
      speaker: "moose",
      text: "Een Creepermasker. Ik blijf voor de zekerheid hier."
    },
    {
      id: "sealed-portal-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "enderPortal",
      speaker: "minnie",
      text: "Die donkere poort heeft paarse randjes. Heel normaal. Vast."
    },
    {
      id: "sealed-solved",
      event: "CHALLENGE_SUCCESS",
      speaker: "moose",
      text: "Dat teken is klaar. De kamer kraakt goedkeurend."
    },
    {
      id: "sealed-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "minnie",
      text: "Nog een teken wakker. Het paarse licht groeit."
    },
    {
      id: "sealed-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De rechterpoort geeft geen millimeter mee."
    },
    {
      id: "sealed-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De rechterpoort reageert. Nu netjes verder."
    },
    {
      id: "sealed-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "minnie",
      text: "De kamer wordt wakker. En wij mogen door!"
    }
  ],
  areas: [
    { id: "chamber", name: "Verzegelde Kamer", start: 0, end: 2172, guideLine: "chamber" }
  ],
  hotspots: [
    {
      id: "rightGate",
      objectId: "rightGate",
      type: "gate",
      name: "Rechterpoort",
      defaultAction: "activate",
      look: "Een zware deur met kettingen. Hij opent pas na drie bloktekens.",
      activate: "De rechterpoort schuift open."
    }
  ],
  runes: [
    {
      id: "diamondSword",
      objectId: "diamondSword",
      name: "Diamantzwaard",
      shortName: "Zwaard",
      defaultAction: "activate",
      intro: "Het zwaard trilt in zijn lijst.",
      prompt: "Tel de diamantblokken.",
      solved: "Mooi! Het zwaard geeft blauw licht.",
      questions: [
        { a: 2, b: 6 },
        { a: 3, b: 4 },
        { a: 5, b: 5 },
        { a: 4, b: 7 },
        { a: 6, b: 3 },
        { a: 8, b: 2 }
      ]
    },
    {
      id: "creeperMask",
      objectId: "creeperMask",
      name: "Creepermasker",
      shortName: "Masker",
      defaultAction: "activate",
      intro: "Het groene masker kijkt Sven strak aan.",
      prompt: "Tel de groene vakjes.",
      solved: "Goed zo! Het masker knippert.",
      questions: [
        { a: 4, b: 6 },
        { a: 7, b: 3 },
        { a: 5, b: 8 },
        { a: 9, b: 2 },
        { a: 6, b: 5 },
        { a: 10, b: 3 }
      ]
    },
    {
      id: "enderPortal",
      objectId: "enderPortal",
      name: "Donkere poort",
      shortName: "Poort",
      defaultAction: "activate",
      intro: "In de poort draaien paarse vonken.",
      prompt: "Tel de poortstenen.",
      solved: "Sterk! De poort bromt warmer.",
      questions: [
        { a: 6, b: 7 },
        { a: 8, b: 4 },
        { a: 9, b: 5 },
        { a: 7, b: 6 },
        { a: 10, b: 4 },
        { a: 8, b: 7 }
      ]
    }
  ],
  reward: {
    title: "De kamer ontwaakt!",
    badge: "Blokkenreiziger",
    line: "Sven maakte de verzegelde kamer wakker. De volgende blokkenkamer wacht.",
    art: "Levels/LVL-0008/assets/blokkenpoort-sealed-room.png",
    nextLevelId: "LVL-0009",
    nextLabel: "Verder"
  }
};
