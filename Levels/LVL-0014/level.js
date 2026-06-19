window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0014/assets/engeland.png";
  const challengerAsset = "Levels/LVL-0014/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 1, b: 3 }, { a: 2, b: 4 }, { a: 3, b: 5 }, { a: 4, b: 6 }, { a: 5, b: 7 }, { a: 6, b: 8 }],
    [{ a: 1, b: 4 }, { a: 2, b: 5 }, { a: 3, b: 6 }, { a: 4, b: 7 }, { a: 5, b: 8 }, { a: 6, b: 9 }],
    [{ a: 1, b: 5 }, { a: 2, b: 6 }, { a: 3, b: 7 }, { a: 4, b: 8 }, { a: 5, b: 9 }, { a: 6, b: 10 }]
  ];
  const challenges = [
    {
      id: "clockTower", name: "Oude klokkentoren", shortName: "Klok", center: { x: 535, y: 300 }, radius: 78,
      approachNode: "clock-approach", intro: "De klok tikt boven de stenen poort.",
      prompt: "Tel de slagen van de klok.", solved: "Mooi! De torenklok loopt weer gelijk.",
      attention: "Die klok heeft vast al duizend reizigers gezien. En nu ons.",
      already: "De oude klok loopt al goed. Nog eens rekenen maakt hem niet jonger."
    },
    {
      id: "telescope", name: "Koperen telescoop", shortName: "Kijker", center: { x: 725, y: 420 }, radius: 76,
      approachNode: "telescope-approach", intro: "De telescoop wijst over de brug.",
      prompt: "Tel de verre torens.", solved: "Goed zo! De telescoop vindt Frankrijk.",
      attention: "Door die koperen kijker kunnen we misschien Frankrijk al zien.",
      already: "De telescoop staat al scherp. Ik zie vooral dat hij zwaar is."
    },
    {
      id: "postbox", name: "Rode brievenbus", shortName: "Post", center: { x: 1640, y: 430 }, radius: 70,
      approachNode: "postbox-approach", intro: "De rode brievenbus rammelt zacht.",
      prompt: "Tel de reisbrieven.", solved: "Sterk! De brievenbus geeft de route door.",
      attention: "Zo rood kun je bijna niet verdwalen. Handig voor een brievenbus.",
      already: "De post is al gesorteerd. Zelfs de brieven weten waarheen."
    }
  ];
  const exit = {
    id: "collegeGate", type: "gate", center: { x: 2035, y: 365 }, radius: 116,
    approachNode: "gate-approach", label: "Collegepoort"
  };
  const crystal = {
    id: "travelCrystal", type: "ambient", center: { x: 1305, y: 425 }, radius: 72,
    approachNode: "crystal-approach", label: "Reiskristal"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0014"] = {
    id: "LVL-0014",
    title: "Engeland — De Oude Klokkenstad",
    subtitle: "Een oude stad van klokken, bruggen en hoge torens.",
    description: "Sven zoekt in Engeland de route naar Frankrijk.",
    storageKey: "atlas-europa-engeland-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Frankrijk",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Een oude klokkenstad aan het water" },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    challengeArt: challengerAsset,
    player: { startNode: "left-start", start: { x: 220, y: 590 } },
    interactiveObjects: [
    {
      id: "clockTower",
      type: "rune",
      center: { x: 565, y: 347 },
      radius: 40,
      approachNode: "clock-approach",
      label: "Oude klokkentoren"
    },
    {
      id: "telescope",
      type: "rune",
      center: { x: 763, y: 448 },
      radius: 76,
      approachNode: "telescope-approach",
      label: "Koperen telescoop"
    },
    {
      id: "postbox",
      type: "rune",
      center: { x: 1713, y: 460 },
      radius: 45,
      approachNode: "postbox-approach",
      label: "Rode brievenbus"
    },
    {
      id: "travelCrystal",
      type: "ambient",
      center: { x: 1349, y: 447 },
      radius: 54,
      approachNode: "crystal-approach",
      label: "Reiskristal"
    },
    {
      id: "collegeGate",
      type: "gate",
      center: { x: 2035, y: 531 },
      radius: 91,
      approachNode: "gate-approach",
      label: "Collegepoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 221, y: 637 },
    { id: "clock-approach", x: 522, y: 627, role: "approach" },
    { id: "telescope-approach", x: 753, y: 629, role: "approach" },
    { id: "bridge-path", x: 1128, y: 629 },
    { id: "crystal-approach", x: 1305, y: 628, role: "approach" },
    { id: "postbox-approach", x: 1669, y: 632, role: "approach" },
    { id: "gate-approach", x: 2011, y: 640, role: "approach" }
  ],
    intro: [
      "Engeland gloeit in de avondzon.",
      "Drie voorwerpen wijzen naar Frankrijk.",
      "De collegepoort bewaakt de volgende route."
    ],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom in de oude klokkenstad.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "De stenen kade ligt open.",
      allRunes: "De collegepoort is klaar.",
      reward: "Frankrijk wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "Alles tikt en glanst hier. Zelfs de brug lijkt oud en wijs." },
      moving: { speaker: "moose", text: "Stevige kade. Goede brug. We kunnen verder." },
      city: { speaker: "minnie", text: "Tussen de torens verstopt de stad haar route." },
      allRunes: { speaker: "moose", text: "De collegepoort is open. Frankrijk ligt voor ons." },
      reward: { speaker: "minnie", text: "Volgende halte: zon en bloemen!" }
    },
    levelSemantics: {
      setting: "een Engelse klokkenstad met brug, torens en een rode brievenbus",
      mood: "statig, warm en een tikje geheimzinnig",
      companionFocus: {
        minnie: "de klok, glanzende telescoop en rode brievenbus",
        moose: "de stenen kade, stevige brug en collegepoort"
      }
    },
    companionMoments: [
      { id: "uk-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "De hele stad lijkt van goud. Zelfs de klok doet plechtig." },
      ...challenges.map((item) => ({
        id: `uk-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      { id: "uk-crystal-attention", event: "AMBIENT_ATTENTION_FIRST", objectId: crystal.id, speaker: "minnie", text: "Dat kristal vangt alle kleuren van de stad. Een klein stukje avondlicht in steen." },
      ...challenges.map((item) => ({
        id: `uk-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "uk-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De klokkenstad geeft haar route stukje voor stukje prijs." },
      { id: "uk-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De collegepoort mist nog {remaining} reistekens. Oude poorten haasten zich nooit." },
      { id: "uk-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De collegepoort is open. Frankrijk ligt voor ons." },
      { id: "uk-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Tot ziens, klokkenstad. Op naar het zonnige plein!" }
    ],
    areas: [{ id: "city", name: "Engeland", start: 0, end: 2172, guideLine: "city" }],
    hotspots: [
      {
        id: crystal.id, objectId: crystal.id, type: "ambient", name: "Reiskristal",
        defaultAction: "look", look: "Een helder kristal dat het avondlicht vangt."
      },
      {
        id: exit.id, objectId: exit.id, type: "gate", name: "Collegepoort",
        defaultAction: "activate", look: "De poort leidt verder naar Frankrijk.", activate: "De route naar Frankrijk opent."
      }
    ],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, questions: questions[index]
    })),
    reward: {
      title: "De klokkenstad wijst de weg!",
      badge: "Klokkenkenner",
      line: "Sven vond tussen de Engelse torens de route naar Frankrijk.",
      art: asset,
      nextLevelId: "LVL-0015",
      nextLabel: "Naar Frankrijk"
    }
  };
})();
