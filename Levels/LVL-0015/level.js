window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0015/assets/frankrijk.png";
  const challengerAsset = "Levels/LVL-0015/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 2, b: 2 }, { a: 3, b: 3 }, { a: 4, b: 4 }, { a: 5, b: 5 }, { a: 6, b: 6 }, { a: 7, b: 7 }],
    [{ a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 8 }],
    [{ a: 2, b: 4 }, { a: 3, b: 5 }, { a: 4, b: 6 }, { a: 5, b: 7 }, { a: 6, b: 8 }, { a: 7, b: 9 }]
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
    player: { startNode: "left-start", start: { x: 215, y: 600 } },
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
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, questions: questions[index]
    })),
    reward: {
      title: "Het plein geeft de route prijs!",
      badge: "Dorpspleinzoeker",
      line: "Sven vond tussen markt en fontein de weg naar Italië.",
      art: asset, nextLevelId: "LVL-0016", nextLabel: "Naar Italië"
    }
  };
})();
