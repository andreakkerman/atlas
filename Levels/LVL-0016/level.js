window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0016/assets/italie.png";
  const challengerAsset = "Levels/LVL-0016/assets/atlas-de-reiziger.png";
  const learningChallenges = [
    {
      "id": "colosseum",
      "anchorId": "colosseum",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "colosseum-slot-1",
          "variants": [
            {
              "id": "colosseum-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "8 bogenrijen hebben elk 7 zitplaatsen. Hoeveel zitplaatsen zijn dat samen?",
              "answer": 56,
              "hintMinnie": "Zoek 8 gelijke groepjes van 7.",
              "hintMoose": "Reken 8 × 7 stap voor stap.",
              "explanation": "8 × 7 = 56."
            },
            {
              "id": "colosseum-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 9 rijen met telkens 6 zitplaatsen. Hoeveel zitplaatsen zijn dat?",
              "answer": 54,
              "choices": [
                50,
                54,
                58,
                62
              ],
              "hintMinnie": "Denk aan 9 groepjes van 6.",
              "hintMoose": "Vermenigvuldig 9 met 6.",
              "explanation": "9 × 6 = 54."
            }
          ]
        },
        {
          "id": "colosseum-slot-2",
          "variants": [
            {
              "id": "colosseum-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "72 zitplaatsen worden eerlijk verdeeld over 8 bogenrijen. Hoeveel krijgt elke groep?",
              "answer": 9,
              "choices": [
                7,
                9,
                11,
                13
              ],
              "hintMinnie": "Verdeel 72 in 8 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 8 precies 72 is.",
              "explanation": "72 : 8 = 9."
            },
            {
              "id": "colosseum-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 63 zitplaatsen. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 63 gedeeld door 7.",
              "explanation": "63 : 7 = 9."
            }
          ]
        },
        {
          "id": "colosseum-slot-3",
          "variants": [
            {
              "id": "colosseum-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 5 toegangskaartjes voor €6 per stuk. Hoeveel euro betaalt hij?",
              "answer": 30,
              "hintMinnie": "Elk stuk kost €6.",
              "hintMoose": "Reken 5 × 6.",
              "explanation": "5 × €6 = €30."
            },
            {
              "id": "colosseum-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs het Colosseum is 64 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 8,
              "choices": [
                5,
                8,
                11,
                14
              ],
              "hintMinnie": "Verdeel de hele route in 8 gelijke delen.",
              "hintMoose": "Reken 64 : 8.",
              "explanation": "64 : 8 = 8 meter."
            }
          ]
        },
        {
          "id": "colosseum-slot-4",
          "variants": [
            {
              "id": "colosseum-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 8 = ?",
              "answer": 72,
              "hintMinnie": "Splits 9 in handige delen.",
              "hintMoose": "Reken 9 groepjes van 8.",
              "explanation": "9 × 8 = 72."
            },
            {
              "id": "colosseum-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "54 : 6 = ?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Zoek welk getal keer 6 gelijk is aan 54.",
              "hintMoose": "Verdeel 54 in groepjes van 6.",
              "explanation": "54 : 6 = 9."
            }
          ]
        }
      ]
    },
    {
      "id": "romanFountain",
      "anchorId": "romanFountain",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "roman-fountain-slot-1",
          "variants": [
            {
              "id": "roman-fountain-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "7 waterstralen hebben elk 8 waterbogen. Hoeveel waterbogen zijn dat samen?",
              "answer": 56,
              "hintMinnie": "Zoek 7 gelijke groepjes van 8.",
              "hintMoose": "Reken 7 × 8 stap voor stap.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "roman-fountain-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 6 rijen met telkens 9 waterbogen. Hoeveel waterbogen zijn dat?",
              "answer": 54,
              "choices": [
                50,
                54,
                58,
                62
              ],
              "hintMinnie": "Denk aan 6 groepjes van 9.",
              "hintMoose": "Vermenigvuldig 6 met 9.",
              "explanation": "6 × 9 = 54."
            }
          ]
        },
        {
          "id": "roman-fountain-slot-2",
          "variants": [
            {
              "id": "roman-fountain-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "56 waterbogen worden eerlijk verdeeld over 7 waterstralen. Hoeveel krijgt elke groep?",
              "answer": 8,
              "choices": [
                6,
                8,
                10,
                12
              ],
              "hintMinnie": "Verdeel 56 in 7 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 7 precies 56 is.",
              "explanation": "56 : 7 = 8."
            },
            {
              "id": "roman-fountain-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 54 waterbogen. In elke groep passen er 6. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 6.",
              "hintMoose": "Reken 54 gedeeld door 6.",
              "explanation": "54 : 6 = 9."
            }
          ]
        },
        {
          "id": "roman-fountain-slot-3",
          "variants": [
            {
              "id": "roman-fountain-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 4 fonteinmunten voor €5 per stuk. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Elk stuk kost €5.",
              "hintMoose": "Reken 4 × 5.",
              "explanation": "4 × €5 = €20."
            },
            {
              "id": "roman-fountain-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Romeinse fontein is 72 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Verdeel de hele route in 8 gelijke delen.",
              "hintMoose": "Reken 72 : 8.",
              "explanation": "72 : 8 = 9 meter."
            }
          ]
        },
        {
          "id": "roman-fountain-slot-4",
          "variants": [
            {
              "id": "roman-fountain-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 9 = ?",
              "answer": 72,
              "hintMinnie": "Splits 8 in handige delen.",
              "hintMoose": "Reken 8 groepjes van 9.",
              "explanation": "8 × 9 = 72."
            },
            {
              "id": "roman-fountain-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "63 : 7 = ?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Zoek welk getal keer 7 gelijk is aan 63.",
              "hintMoose": "Verdeel 63 in groepjes van 7.",
              "explanation": "63 : 7 = 9."
            }
          ]
        }
      ]
    },
    {
      "id": "gelatoCart",
      "anchorId": "gelatoCart",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "gelato-cart-slot-1",
          "variants": [
            {
              "id": "gelato-cart-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "8 ijsbakken hebben elk 6 bolletjes. Hoeveel bolletjes zijn dat samen?",
              "answer": 48,
              "hintMinnie": "Zoek 8 gelijke groepjes van 6.",
              "hintMoose": "Reken 8 × 6 stap voor stap.",
              "explanation": "8 × 6 = 48."
            },
            {
              "id": "gelato-cart-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 7 rijen met telkens 9 bolletjes. Hoeveel bolletjes zijn dat?",
              "answer": 63,
              "choices": [
                59,
                63,
                67,
                71
              ],
              "hintMinnie": "Denk aan 7 groepjes van 9.",
              "hintMoose": "Vermenigvuldig 7 met 9.",
              "explanation": "7 × 9 = 63."
            }
          ]
        },
        {
          "id": "gelato-cart-slot-2",
          "variants": [
            {
              "id": "gelato-cart-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "64 bolletjes worden eerlijk verdeeld over 8 ijsbakken. Hoeveel krijgt elke groep?",
              "answer": 8,
              "choices": [
                6,
                8,
                10,
                12
              ],
              "hintMinnie": "Verdeel 64 in 8 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 8 precies 64 is.",
              "explanation": "64 : 8 = 8."
            },
            {
              "id": "gelato-cart-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 63 bolletjes. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 63 gedeeld door 7.",
              "explanation": "63 : 7 = 9."
            }
          ]
        },
        {
          "id": "gelato-cart-slot-3",
          "variants": [
            {
              "id": "gelato-cart-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 6 ijsjes voor €4 per stuk. Hoeveel euro betaalt hij?",
              "answer": 24,
              "hintMinnie": "Elk stuk kost €4.",
              "hintMoose": "Reken 6 × 4.",
              "explanation": "6 × €4 = €24."
            },
            {
              "id": "gelato-cart-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Gelatokar is 54 meter en heeft 6 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Verdeel de hele route in 6 gelijke delen.",
              "hintMoose": "Reken 54 : 6.",
              "explanation": "54 : 6 = 9 meter."
            }
          ]
        },
        {
          "id": "gelato-cart-slot-4",
          "variants": [
            {
              "id": "gelato-cart-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "hintMinnie": "Splits 7 in handige delen.",
              "hintMoose": "Reken 7 groepjes van 8.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "gelato-cart-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "72 : 9 = ?",
              "answer": 8,
              "choices": [
                5,
                8,
                11,
                14
              ],
              "hintMinnie": "Zoek welk getal keer 9 gelijk is aan 72.",
              "hintMoose": "Verdeel 72 in groepjes van 9.",
              "explanation": "72 : 9 = 8."
            }
          ]
        }
      ]
    }
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
    learningChallenges,
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
      solved: item.solved, challengeId: item.id
    })),
    reward: {
      title: "De Romeinse route is gevonden!",
      badge: "Romeinseroutezoeker",
      line: "Sven vond langs oude bogen en gelato de weg naar Oostenrijk.",
      art: asset, nextLevelId: "LVL-0017", nextLabel: "Naar Oostenrijk"
    }
  };
})();
