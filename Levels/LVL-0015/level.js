window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0015/assets/frankrijk.png";
  const challengerAsset = "Levels/LVL-0015/assets/atlas-de-reiziger.png";
  const learningChallenges = [
    {
      id: "fr-market-01", anchorId: "marketStall", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "story", answerMode: "open",
      prompt: "De marktkoopman zet 8 kratten neer met elk 7 appels. Hoeveel appels zijn dat?",
      answer: 56,
      hintMinnie: "Het zijn 8 gelijke groepjes van 7.",
      hintMoose: "Reken 8 × 7.",
      explanation: "8 × 7 = 56 appels."
    },
    {
      id: "fr-market-02", anchorId: "marketStall", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "delen",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "Er worden 54 peren verdeeld over 6 manden. Hoeveel peren gaan in elke mand?",
      answer: 9, choices: [7, 8, 9, 10],
      hintMinnie: "Alle 6 manden krijgen evenveel.",
      hintMoose: "Welke tafel van 6 geeft 54?",
      explanation: "54 ÷ 6 = 9 peren per mand."
    },
    {
      id: "fr-market-03", anchorId: "marketStall", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "optellen",
      presentation: "bare", answerMode: "open",
      prompt: "58 + 27 = ?",
      answer: 85,
      hintMinnie: "Tel eerst 20 bij 58.",
      hintMoose: "58 + 20 = 78; tel daarna 7.",
      explanation: "58 + 27 = 85."
    },
    {
      id: "fr-market-04", anchorId: "marketStall", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "aftrekken",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "De kraam heeft 96 sinaasappels. Er worden 38 verkocht. Hoeveel zijn er nog?",
      answer: 58, choices: [48, 56, 58, 68],
      hintMinnie: "Haal eerst 30 van 96 af.",
      hintMoose: "96 − 30 = 66; haal daarna nog 8 weg.",
      explanation: "96 − 38 = 58 sinaasappels."
    },
    {
      id: "fr-clock-01", anchorId: "villageClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "De dorpsklok luidt 8 keer per dag, 7 dagen lang. Hoe vaak luidt hij?",
      answer: 56, choices: [48, 54, 56, 64],
      hintMinnie: "Elke dag klinkt hetzelfde aantal slagen.",
      hintMoose: "Gebruik 7 × 8.",
      explanation: "7 × 8 = 56 klokslagen."
    },
    {
      id: "fr-clock-02", anchorId: "villageClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "delen",
      presentation: "story", answerMode: "open",
      prompt: "Een feest duurt 72 minuten en heeft 8 gelijke rondes. Hoeveel minuten duurt elke ronde?",
      answer: 9,
      hintMinnie: "Verdeel 72 in 8 gelijke stukken.",
      hintMoose: "Draai de som om: 8 × ? = 72.",
      explanation: "72 ÷ 8 = 9 minuten per ronde."
    },
    {
      id: "fr-clock-03", anchorId: "villageClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "bare", answerMode: "multipleChoice",
      prompt: "7 × 9 = ?",
      answer: 63, choices: [56, 61, 63, 72],
      hintMinnie: "Denk aan 7 × 10 en haal 7 weg.",
      hintMoose: "70 − 7.",
      explanation: "7 × 9 = 63."
    },
    {
      id: "fr-clock-04", anchorId: "villageClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "optellen",
      presentation: "story", answerMode: "open",
      prompt: "Voor de ochtendmarkt komen 29 mensen. Later komen er 36 bij. Hoeveel mensen zijn er?",
      answer: 65,
      hintMinnie: "Tel eerst 30 bij 29 en daarna nog 6.",
      hintMoose: "29 + 36 is bijna 30 + 36; haal daarna 1 weg.",
      explanation: "29 + 36 = 65 mensen."
    },
    {
      id: "fr-fountain-01", anchorId: "fountain", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "story", answerMode: "open",
      prompt: "De fontein spuit uit 6 openingen, 9 keer per minuut. Hoeveel waterbogen zijn dat?",
      answer: 54,
      hintMinnie: "Het zijn 6 gelijke groepjes van 9.",
      hintMoose: "Reken 6 × 9 als 60 − 6.",
      explanation: "6 × 9 = 54 waterbogen."
    },
    {
      id: "fr-fountain-02", anchorId: "fountain", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "delen",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "Rond de fontein staan 48 bloemen in 8 gelijke bakken. Hoeveel bloemen staan in elke bak?",
      answer: 6, choices: [5, 6, 7, 8],
      hintMinnie: "Verdeel 48 eerlijk over 8 bakken.",
      hintMoose: "Welke keer-som met 8 geeft 48?",
      explanation: "48 ÷ 8 = 6 bloemen per bak."
    },
    {
      id: "fr-fountain-03", anchorId: "fountain", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "aftrekken",
      presentation: "bare", answerMode: "open",
      prompt: "91 − 47 = ?",
      answer: 44,
      hintMinnie: "Haal eerst 40 van 91 af.",
      hintMoose: "91 − 40 = 51; haal daarna nog 7 weg.",
      explanation: "91 − 47 = 44."
    },
    {
      id: "fr-fountain-04", anchorId: "fountain", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "optellen",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "Bij de fontein staan 34 rode en 28 gele bloemen. Hoeveel bloemen zijn dat samen?",
      answer: 62, choices: [52, 60, 62, 72],
      hintMinnie: "Tel eerst de tientallen en dan de losse bloemen.",
      hintMoose: "34 + 20 = 54; tel daarna 8.",
      explanation: "34 + 28 = 62 bloemen."
    }
  ];
  const challenges = [
    {
      id: "marketStall", name: "Marktkraam", shortName: "Markt", center: { x: 450, y: 430 }, radius: 104,
      approachNode: "market-approach", intro: "Groente en fruit liggen in kleurige rijen.",
      prompt: "Tel de kratten op de markt.", solved: "Mooi! De marktkoopwaar staat goed.",
      attention: "Die markt is bijna een regenboog van groente. Een eetbare regenboog.",
      already: "De kratten staan al netjes. Ik keur deze markt praktisch goed."
    },
    {
      id: "villageClock", name: "Dorpsklok", shortName: "Klok", center: { x: 700, y: 260 }, radius: 70,
      approachNode: "clock-approach", intro: "De dorpsklok luidt boven het plein.",
      prompt: "Tel de slagen van de dorpsklok.", solved: "Goed zo! De klok wijst naar het zuiden.",
      attention: "Die klok kan het hele plein zien. Misschien zag hij onze route ook.",
      already: "De dorpsklok heeft zijn antwoord al. Hij luidt er niet nog eens voor."
    },
    {
      id: "fountain", name: "Dorpsfontein", shortName: "Fontein", center: { x: 940, y: 425 }, radius: 105,
      approachNode: "fountain-approach", intro: "Water danst rond de stenen fontein.",
      prompt: "Tel de waterbogen.", solved: "Sterk! De fontein laat de route glinsteren.",
      attention: "Het water springt precies in patronen. Dat doet een fontein niet zomaar.",
      already: "De fontein stroomt al precies goed. Natte sokken voegen niets toe."
    }
  ];
  const exit = {
    id: "villageGate", type: "gate", center: { x: 2040, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Dorpspoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0015"] = {
    id: "LVL-0015",
    title: "Frankrijk — Het Zonnige Dorpsplein",
    subtitle: "Een zonnig plein vol bloemen, marktgeuren en water.",
    description: "Sven vindt op een Frans dorpsplein de route naar Italië.",
    storageKey: "atlas-europa-frankrijk-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Italië",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Een zonnig plein tussen bloemen en marktkramen" },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    challengeArt: challengerAsset,
    learningChallenges,
    player: { startNode: "left-start", start: { x: 151, y: 615 } },
    interactiveObjects: [
    {
      id: "marketStall",
      type: "rune",
      center: { x: 446, y: 457 },
      radius: 104,
      approachNode: "market-approach",
      label: "Marktkraam"
    },
    {
      id: "villageClock",
      type: "rune",
      center: { x: 728, y: 267 },
      radius: 31,
      approachNode: "clock-approach",
      label: "Dorpsklok"
    },
    {
      id: "fountain",
      type: "rune",
      center: { x: 950, y: 429 },
      radius: 64,
      approachNode: "fountain-approach",
      label: "Dorpsfontein"
    },
    {
      id: "villageGate",
      type: "gate",
      center: { x: 2035, y: 504 },
      radius: 84,
      approachNode: "gate-approach",
      label: "Dorpspoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 151, y: 615 },
    { id: "market-approach", x: 451, y: 596, role: "approach" },
    { id: "clock-approach", x: 697, y: 607, role: "approach" },
    { id: "fountain-approach", x: 937, y: 621, role: "approach" },
    { id: "square-path", x: 1459, y: 628 },
    { id: "gate-approach", x: 2033, y: 605, role: "approach" }
  ],
    intro: ["Frankrijk ligt te stralen.", "Op het plein wachten drie reistekens.", "De dorpspoort leidt naar Italië."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom op het zonnige dorpsplein.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "Het plein ligt open.",
      allRunes: "De dorpspoort is klaar.",
      reward: "Italië wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "Bloemen, fruit en fonteinen. Dit plein pronkt een beetje." },
      moving: { speaker: "moose", text: "Brede stenen en weinig modder. Uitstekend plein." },
      square: { speaker: "minnie", text: "De route verstopt zich tussen alle kleuren." },
      allRunes: { speaker: "moose", text: "De dorpspoort is open. Italië ligt achter de heuvels." },
      reward: { speaker: "minnie", text: "Op naar oude stenen en gelato!" }
    },
    levelSemantics: {
      setting: "een zonnig Frans dorpsplein met markt, klok en fontein",
      mood: "vrolijk, kleurrijk en zomers",
      companionFocus: {
        minnie: "bloemen, waterbogen en kleurige marktkramen",
        moose: "de brede pleinstenen, overzichtelijke route en dorpspoort"
      }
    },
    companionMoments: [
      { id: "fr-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Dit plein heeft bloemen op bijna elke vrije steen. Knap werk." },
      ...challenges.map((item) => ({
        id: `fr-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `fr-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "fr-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De route glinstert nu tussen de bloemen door." },
      { id: "fr-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De dorpspoort mist nog {remaining} reistekens. Hij blijft koppig Frans dicht." },
      { id: "fr-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De dorpspoort is open. Italië ligt achter de heuvels." },
      { id: "fr-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Au revoir, zonnig plein. Italië komt eraan!" }
    ],
    areas: [{ id: "square", name: "Frankrijk", start: 0, end: 2172, guideLine: "square" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Dorpspoort",
      defaultAction: "activate", look: "De poort leidt naar Italië.", activate: "De route naar Italië opent."
    }],
    runes: challenges.map((item) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved,
      challengeIds: learningChallenges.filter((challenge) => challenge.anchorId === item.id).map((challenge) => challenge.id)
    })),
    reward: {
      title: "Het plein geeft de route prijs!",
      badge: "Dorpspleinzoeker",
      line: "Sven vond tussen markt en fontein de weg naar Italië.",
      art: asset, nextLevelId: "LVL-0016", nextLabel: "Naar Italië"
    }
  };
})();
