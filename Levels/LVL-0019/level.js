window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0019/assets/zweden.png";
  const challengerAsset = "Levels/LVL-0019/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 1, b: 2 }, { a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }],
    [{ a: 1, b: 3 }, { a: 2, b: 4 }, { a: 3, b: 5 }, { a: 4, b: 6 }, { a: 5, b: 7 }, { a: 6, b: 8 }],
    [{ a: 1, b: 4 }, { a: 2, b: 5 }, { a: 3, b: 6 }, { a: 4, b: 7 }, { a: 5, b: 8 }, { a: 6, b: 9 }]
  ];
  const challenges = [
    {
      id: "dalaHorse", name: "Dalapaard", shortName: "Paard", center: { x: 805, y: 375 }, radius: 108,
      approachNode: "horse-approach", intro: "Het rode houten paard staat trots op zijn sokkel.",
      prompt: "Tel de geschilderde vormen.", solved: "Mooi! Het Dalapaard wijst naar de haven.",
      attention: "Dat rode paard staat zó stil dat het vast iets geheimhoudt.",
      already: "Het Dalapaard is al klaar. Rennen was toch niet zijn plan."
    },
    {
      id: "maypole", name: "Zweedse meiboom", shortName: "Meiboom", center: { x: 1110, y: 300 }, radius: 110,
      approachNode: "maypole-approach", intro: "Bloemen en kransen hangen aan de groene boom.",
      prompt: "Tel de bloemenkransen.", solved: "Goed zo! De meiboom laat de thuisroute zien.",
      attention: "Die bloemencirkels hangen precies gelijk. Dat ruikt naar een patroon.",
      already: "De kransen hangen al netjes. Meer draaien maakt iedereen duizelig."
    },
    {
      id: "harborClock", name: "Havenklok", shortName: "Klok", center: { x: 1375, y: 255 }, radius: 78,
      approachNode: "clock-approach", intro: "De witte klok kijkt uit over de boten.",
      prompt: "Tel de slagen boven de haven.", solved: "Sterk! De klok zet de koers naar huis.",
      attention: "Die klok houdt de boten én de tijd in de gaten. Druk beroep.",
      already: "De havenklok loopt al goed. De boten hoeven niet nog eens te wachten."
    }
  ];
  const exit = {
    id: "harborGate", type: "gate", center: { x: 2035, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Havenpoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0019"] = {
    id: "LVL-0019",
    title: "Zweden — Het Dorp aan het Water",
    subtitle: "Een vrolijk havendorp vol bloemen, vlaggen en boten.",
    description: "Sven vindt in Zweden de laatste route terug naar Rheden.",
    storageKey: "atlas-europa-zweden-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Terug naar Rheden",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de thuisroute klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Vlaggen, bloemen en boten aan de kade" },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    challengeArt: challengerAsset,
    player: { startNode: "left-start", start: { x: 220, y: 600 } },
    interactiveObjects: [
    {
      id: "dalaHorse",
      type: "rune",
      center: { x: 846, y: 415 },
      radius: 88,
      approachNode: "horse-approach",
      label: "Dalapaard"
    },
    {
      id: "maypole",
      type: "rune",
      center: { x: 1174, y: 257 },
      radius: 81,
      approachNode: "maypole-approach",
      label: "Zweedse meiboom"
    },
    {
      id: "harborClock",
      type: "rune",
      center: { x: 1384, y: 277 },
      radius: 32,
      approachNode: "clock-approach",
      label: "Havenklok"
    },
    {
      id: "harborGate",
      type: "gate",
      center: { x: 2000, y: 532 },
      radius: 83,
      approachNode: "gate-approach",
      label: "Havenpoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 189, y: 625 },
    { id: "village-path", x: 522, y: 614 },
    { id: "horse-approach", x: 788, y: 608, role: "approach" },
    { id: "maypole-approach", x: 1113, y: 608, role: "approach" },
    { id: "clock-approach", x: 1373, y: 607, role: "approach" },
    { id: "gate-approach", x: 1984, y: 638, role: "approach" }
  ],
    intro: ["Zweden kleurt rood, geel en blauw.", "Drie reistekens wijzen naar huis.", "Achter de havenpoort ligt Rheden."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom in het dorp aan het water.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "De havenstraat ligt open.",
      allRunes: "De thuisroute is klaar.",
      reward: "Rheden wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "Rode huizen, blauwe lucht en overal bloemen. Gezellig." },
      moving: { speaker: "moose", text: "De kade is breed. Alleen niet achteruit het water in." },
      harbor: { speaker: "minnie", text: "De thuisroute loopt tussen paard, bloemen en klok." },
      allRunes: { speaker: "moose", text: "De havenpoort is open. Nu terug naar Rheden." },
      reward: { speaker: "minnie", text: "De Posbank komt weer dichtbij!" }
    },
    levelSemantics: {
      setting: "een Zweeds havendorp met Dalapaard, meiboom, klok en kleurige huizen",
      mood: "vrolijk, fris en bijna thuis",
      companionFocus: {
        minnie: "bloemenkransen, Zweedse vlaggen en het rode Dalapaard",
        moose: "de kade, botenroute en stevige havenpoort"
      }
    },
    companionMoments: [
      { id: "se-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Dit dorp lijkt een ansichtkaart met extra veel bloemen." },
      ...challenges.map((item) => ({
        id: `se-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `se-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "se-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De thuisroute schittert al tussen de Zweedse vlaggen." },
      { id: "se-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De havenpoort mist nog {remaining} reistekens. Thuis loopt niet weg." },
      { id: "se-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De havenpoort is open. Nu terug naar Rheden." },
      { id: "se-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Hej då, Zweden! De Posbank wacht op ons." }
    ],
    areas: [{ id: "harbor", name: "Zweden", start: 0, end: 2172, guideLine: "harbor" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Havenpoort",
      defaultAction: "activate", look: "De poort leidt terug naar Rheden.", activate: "De thuisroute opent."
    }],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, questions: questions[index]
    })),
    reward: {
      title: "De thuisroute is gevonden!",
      badge: "Noordse reiziger",
      line: "Sven vond in het Zweedse havendorp de weg terug naar Rheden.",
      art: asset, nextLevelId: "LVL-0020", nextLabel: "Terug naar Rheden"
    }
  };
})();
