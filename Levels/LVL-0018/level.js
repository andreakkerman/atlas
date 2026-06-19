window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0018/assets/noorwegen.png";
  const challengerAsset = "Levels/LVL-0018/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 7, b: 1 }, { a: 7, b: 2 }, { a: 7, b: 3 }, { a: 7, b: 4 }, { a: 7, b: 5 }, { a: 7, b: 6 }],
    [{ a: 8, b: 1 }, { a: 8, b: 2 }, { a: 8, b: 3 }, { a: 8, b: 4 }, { a: 8, b: 5 }, { a: 8, b: 6 }],
    [{ a: 9, b: 1 }, { a: 9, b: 2 }, { a: 9, b: 3 }, { a: 9, b: 4 }, { a: 9, b: 5 }, { a: 9, b: 6 }]
  ];
  const challenges = [
    {
      id: "staveChurch", name: "Houten staafkerk", shortName: "Kerk", center: { x: 555, y: 330 }, radius: 110,
      approachNode: "church-approach", intro: "De houten torens wijzen naar de avondlucht.",
      prompt: "Tel de daken van de staafkerk.", solved: "Mooi! De kerk wijst naar het fjordlicht.",
      attention: "Dat houten dak heeft daken op daken. Alsof de kerk een berg nadoet.",
      already: "De kerk staat stevig en de som is klaar. Geen plank meer nodig."
    },
    {
      id: "lighthouse", name: "Fjordvuurtoren", shortName: "Vuurtoren", center: { x: 980, y: 270 }, radius: 104,
      approachNode: "lighthouse-approach", intro: "Het licht draait boven het donkere water.",
      prompt: "Tel de lichtflitsen.", solved: "Goed zo! De vuurtoren verlicht de route.",
      attention: "Dat licht veegt over het hele fjord. Misschien pakt het onze route mee.",
      already: "De vuurtoren schijnt al goed. Meer licht wordt gewoon verblindend."
    },
    {
      id: "vikingShip", name: "Vikingschip", shortName: "Schip", center: { x: 1320, y: 430 }, radius: 112,
      approachNode: "ship-approach", intro: "De drakenkop kijkt uit over het water.",
      prompt: "Tel de schilden van het schip.", solved: "Sterk! Het schip wijst naar Zweden.",
      attention: "Die drakenkop kijkt alsof hij de hele overtocht al gepland heeft.",
      already: "Het schip is al klaar. De draak hoeft niet nóg trotser te kijken."
    }
  ];
  const exit = {
    id: "fjordGate", type: "gate", center: { x: 2040, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Fjordpoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0018"] = {
    id: "LVL-0018",
    title: "Noorwegen — Het Fjordlicht",
    subtitle: "Avondlicht glanst tussen bergen, boten en houten huizen.",
    description: "Sven volgt het licht door een Noors fjord naar Zweden.",
    storageKey: "atlas-europa-noorwegen-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Zweden",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Een fjordhaven onder het avondlicht" },
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
      id: "staveChurch",
      type: "rune",
      center: { x: 629, y: 387 },
      radius: 110,
      approachNode: "church-approach",
      label: "Houten staafkerk"
    },
    {
      id: "lighthouse",
      type: "rune",
      center: { x: 1003, y: 171 },
      radius: 60,
      approachNode: "lighthouse-approach",
      label: "Fjordvuurtoren"
    },
    {
      id: "vikingShip",
      type: "rune",
      center: { x: 1326, y: 450 },
      radius: 101,
      approachNode: "ship-approach",
      label: "Vikingschip"
    },
    {
      id: "fjordGate",
      type: "gate",
      center: { x: 2008, y: 470 },
      radius: 90,
      approachNode: "gate-approach",
      label: "Fjordpoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 215, y: 600 },
    { id: "church-approach", x: 540, y: 585, role: "approach" },
    { id: "lighthouse-approach", x: 970, y: 575, role: "approach" },
    { id: "ship-approach", x: 1322, y: 582, role: "approach" },
    { id: "harbor-path", x: 1650, y: 590 },
    { id: "gate-approach", x: 1980, y: 580, role: "approach" }
  ],
    intro: ["Het fjord ligt stil in het avondlicht.", "Drie reistekens wijzen langs het water.", "De fjordpoort leidt naar Zweden."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom bij het fjordlicht.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "De havenroute ligt open.",
      allRunes: "De fjordpoort is klaar.",
      reward: "Zweden wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "De bergen houden het zonlicht vast. Prachtig." },
      moving: { speaker: "moose", text: "Water links, stevige grond onder ons. Zo houd ik van fjorden." },
      harbor: { speaker: "minnie", text: "Het licht trekt een route over de haven." },
      allRunes: { speaker: "moose", text: "De fjordpoort is open. Zweden ligt verderop." },
      reward: { speaker: "minnie", text: "Het avondlicht wijst ons naar Zweden!" }
    },
    levelSemantics: {
      setting: "een Noors fjord met staafkerk, vuurtoren, vikingschip en havenhuizen",
      mood: "groots, stil en warm in het avondlicht",
      companionFocus: {
        minnie: "gouden licht, houten daken en de drakenkop van het schip",
        moose: "de waterkant, veilige havenroute en rode fjordpoort"
      }
    },
    companionMoments: [
      { id: "no-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Het fjord glanst alsof de zon hier nog even wil blijven." },
      ...challenges.map((item) => ({
        id: `no-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `no-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "no-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "Het fjordlicht tekent de route steeds verder over het water." },
      { id: "no-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De fjordpoort mist nog {remaining} reistekens. De rode deur blijft nors." },
      { id: "no-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De fjordpoort is open. Zweden ligt verderop." },
      { id: "no-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Dag fjordlicht! Het Zweedse dorp wacht." }
    ],
    areas: [{ id: "harbor", name: "Noorwegen", start: 0, end: 2172, guideLine: "harbor" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Fjordpoort",
      defaultAction: "activate", look: "De rode poort leidt naar Zweden.", activate: "De route naar Zweden opent."
    }],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, questions: questions[index]
    })),
    reward: {
      title: "Het fjordlicht wijst de weg!",
      badge: "Fjordzoeker",
      line: "Sven vond langs vuurtoren en vikingschip de route naar Zweden.",
      art: asset, nextLevelId: "LVL-0019", nextLabel: "Naar Zweden"
    }
  };
})();
