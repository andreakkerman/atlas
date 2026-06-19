window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0016/assets/italie.png";
  const challengerAsset = "Levels/LVL-0016/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 1, b: 9 }, { a: 2, b: 10 }, { a: 3, b: 2 }, { a: 4, b: 3 }, { a: 5, b: 4 }, { a: 6, b: 5 }],
    [{ a: 1, b: 10 }, { a: 2, b: 2 }, { a: 3, b: 3 }, { a: 4, b: 4 }, { a: 5, b: 5 }, { a: 6, b: 6 }],
    [{ a: 2, b: 3 }, { a: 3, b: 4 }, { a: 4, b: 5 }, { a: 5, b: 6 }, { a: 6, b: 7 }, { a: 7, b: 8 }]
  ];
  const challenges = [
    {
      id: "colosseum", name: "Colosseum", shortName: "Arena", center: { x: 445, y: 300 }, radius: 116,
      approachNode: "colosseum-approach", intro: "De oude bogen staan sterk in de zon.",
      prompt: "Tel de rijen Romeinse bogen.", solved: "Mooi! Het Colosseum onthult een route.",
      attention: "Zoveel bogen boven elkaar. Oude Romeinen hielden duidelijk van tellen.",
      already: "Het Colosseum staat al eeuwen goed. Vandaag hoeft er niets bij."
    },
    {
      id: "romanFountain", name: "Romeinse fontein", shortName: "Fontein", center: { x: 610, y: 455 }, radius: 96,
      approachNode: "fountain-approach", intro: "Helder water stroomt langs de oude stenen.",
      prompt: "Tel de stralen van de fontein.", solved: "Goed zo! Het water wijst naar de wijngaard.",
      attention: "De fontein kabbelt alsof hij een oud verhaal in stukjes vertelt.",
      already: "De fontein kent zijn patroon al. En ja, het blijft nat."
    },
    {
      id: "gelatoCart", name: "Gelatokar", shortName: "Gelato", center: { x: 1050, y: 465 }, radius: 100,
      approachNode: "gelato-approach", intro: "Kleurige ijsjes staan onder het luifeltje.",
      prompt: "Tel de hoorntjes gelato.", solved: "Sterk! De gelatokar rolt richting Alpen.",
      attention: "Ik zie ijs in vijf kleuren. Onderzoek is nu dringend nodig.",
      already: "De ijsjes zijn al geteld. Moose noemt dat voorraadbeheer."
    }
  ];
  const exit = {
    id: "romanGate", type: "gate", center: { x: 2040, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Romeinse poort"
  };
  const grapePress = {
    id: "grapePress", type: "ambient", center: { x: 1580, y: 455 }, radius: 88,
    approachNode: "press-approach", label: "Druivenpers"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0016"] = {
    id: "LVL-0016",
    title: "Italië — De Romeinse Route",
    subtitle: "Oude bogen, helder water en gelato langs de route.",
    description: "Sven volgt in Italië de Romeinse route naar de Alpen.",
    storageKey: "atlas-europa-italie-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Oostenrijk",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Romeinse stenen, druiven en gelato" },
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
      ...challenges.map((item) => ({
        id: item.id, type: "rune", center: item.center, radius: item.radius,
        approachNode: item.approachNode, label: item.name
      })),
      grapePress,
      exit
    ],
    walkPath: [
      { id: "left-start", x: 220, y: 600 },
      { id: "colosseum-approach", x: 440, y: 580, role: "approach" },
      { id: "fountain-approach", x: 620, y: 585, role: "approach" },
      { id: "gelato-approach", x: 1050, y: 585, role: "approach" },
      { id: "vineyard-path", x: 1400, y: 590 },
      { id: "press-approach", x: 1580, y: 585, role: "approach" },
      { id: "gate-approach", x: 1980, y: 580, role: "approach" }
    ],
    intro: ["Italië ligt onder een blauwe hemel.", "Drie reistekens staan langs de Romeinse route.", "De rechterpoort leidt naar de Alpen."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom op de Romeinse route.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "De zonnige stenen liggen open.",
      allRunes: "De Romeinse poort is klaar.",
      reward: "Oostenrijk wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "Oude bogen, druiven en ijs. Italië pakt flink uit." },
      moving: { speaker: "moose", text: "De stenen zijn oud maar stevig. Netjes blijven lopen." },
      route: { speaker: "minnie", text: "De route slingert tussen Rome en de wijngaard." },
      allRunes: { speaker: "moose", text: "De Romeinse poort is open. De Alpen wachten." },
      reward: { speaker: "minnie", text: "Ciao Italië! Op naar de bergen." }
    },
    levelSemantics: {
      setting: "een Italiaanse route met Colosseum, fontein, wijngaard en gelatokar",
      mood: "zonnig, oud en feestelijk",
      companionFocus: {
        minnie: "Romeinse bogen, helder water en kleurrijke gelato",
        moose: "stevige stenen, de wijngaardroute en rechterpoort"
      }
    },
    companionMoments: [
      { id: "it-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Het Colosseum links en heuvels vooruit. Wat een route." },
      ...challenges.map((item) => ({
        id: `it-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      { id: "it-press-attention", event: "AMBIENT_ATTENTION_FIRST", objectId: grapePress.id, speaker: "moose", text: "Een druivenpers. Veel draaien voor een klein glas sap. Degelijk werk." },
      ...challenges.map((item) => ({
        id: `it-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "it-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De Romeinse route licht op tussen de druiven." },
      { id: "it-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De Romeinse poort mist nog {remaining} reistekens. Oude bouw, strenge regels." },
      { id: "it-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De Romeinse poort is open. De Alpen wachten." },
      { id: "it-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Ciao Italië! Ik zie de bergen al." }
    ],
    areas: [{ id: "route", name: "Italië", start: 0, end: 2172, guideLine: "route" }],
    hotspots: [
      {
        id: grapePress.id, objectId: grapePress.id, type: "ambient", name: "Druivenpers",
        defaultAction: "look", look: "Een houten pers tussen de druivenranken."
      },
      {
        id: exit.id, objectId: exit.id, type: "gate", name: "Romeinse poort",
        defaultAction: "activate", look: "De poort leidt naar Oostenrijk.", activate: "De route naar Oostenrijk opent."
      }
    ],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, questions: questions[index]
    })),
    reward: {
      title: "De Romeinse route is gevonden!",
      badge: "Romeinseroutezoeker",
      line: "Sven vond langs oude bogen en gelato de weg naar Oostenrijk.",
      art: asset, nextLevelId: "LVL-0017", nextLabel: "Naar Oostenrijk"
    }
  };
})();
