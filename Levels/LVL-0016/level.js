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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "5 × 7 = ?",
            "answer": 35,
            "choices": [
              28,
              35,
              42,
              49
            ],
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 5 en 2 × 5.",
            "explanation": "5 × 7 = 35."
          },
          {
            "id": "colosseum-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Het Colosseum heeft 2 rijen met elk 3 bogen. Hoeveel bogen zijn dat samen?",
            "answer": 6,
            "choices": [
              3,
              6,
              9,
              12
            ],
            "hintMinnie": "Er zijn 2 gelijke groepjes. In elk groepje zitten er 3.",
            "hintMoose": "Verdubbel 2 en tel er nog 2 bij op.",
            "explanation": "2 × 3 = 6."
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
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "In het Colosseum zijn 81 zitplaatsen verdeeld over 9 rijen. Hoeveel zitplaatsen zijn er per rij?",
            "answer": 9,
            "hintMinnie": "Verdeel 81 eerlijk over 9 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 9 welk getal uitkomt op 81.",
            "explanation": "81 : 9 = 9."
          },
          {
            "id": "colosseum-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "7 × 6 = ?",
            "answer": 42,
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 7 en tel nog 7 erbij.",
            "explanation": "7 × 6 = 42."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "3 × 9 = ?",
            "answer": 27,
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 3 en haal 3 eraf.",
            "explanation": "3 × 9 = 27."
          },
          {
            "id": "colosseum-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "7 × 4 = ?",
            "answer": 28,
            "hintMinnie": "Denk aan de tafel van 4.",
            "hintMoose": "Verdubbel 7 twee keer.",
            "explanation": "7 × 4 = 28."
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
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Het Colosseum heeft 5 rijen met elk 9 bogen. Hoeveel bogen zijn dat samen?",
            "answer": 45,
            "hintMinnie": "Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.",
            "hintMoose": "Reken 5 × 10 en haal er daarna 5 af.",
            "explanation": "5 × 9 = 45."
          },
          {
            "id": "colosseum-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "54 : 9 = ?",
            "answer": 6,
            "hintMinnie": "Welke som uit de tafel van 9 helpt?",
            "hintMoose": "Omdat 9 × 6 = 54, is 54 : 9 = 6.",
            "explanation": "54 : 9 = 6."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "4 × 6 = ?",
            "answer": 24,
            "choices": [
              18,
              24,
              30,
              36
            ],
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 4 en tel nog 4 erbij.",
            "explanation": "4 × 6 = 24."
          },
          {
            "id": "roman-fountain-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "money",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas koopt 3 ansichtkaarten van de fontein voor 4 euro per stuk. Hoeveel euro betaalt hij?",
            "answer": 12,
            "hintMinnie": "Er zijn 3 gelijke bedragen van 4 euro.",
            "hintMoose": "Verdubbel 3 en verdubbel de uitkomst nog eens.",
            "explanation": "3 × 4 = 12 euro."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "5 × 5 = ?",
            "answer": 25,
            "choices": [
              20,
              25,
              30,
              35
            ],
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 5 sprongen van 5.",
            "explanation": "5 × 5 = 25."
          },
          {
            "id": "roman-fountain-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Rond de Romeinse fontein liggen 7 mozaïekstroken met elk 6 tegels. Hoeveel tegels zijn dat samen?",
            "answer": 42,
            "hintMinnie": "Er zijn 7 gelijke groepjes. In elk groepje zitten er 6.",
            "hintMoose": "Reken 7 × 5 en tel er nog 7 bij op.",
            "explanation": "7 × 6 = 42."
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
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "24 : 4 = ?",
            "answer": 6,
            "hintMinnie": "Welke som uit de tafel van 4 helpt?",
            "hintMoose": "Omdat 4 × 6 = 24, is 24 : 4 = 6.",
            "explanation": "24 : 4 = 6."
          },
          {
            "id": "roman-fountain-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "route",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De rand van de Romeinse fontein is 14 meter lang en verdeeld in 7 gelijke stukken. Hoe lang is ieder stuk?",
            "answer": 2,
            "hintMinnie": "Verdeel de totale lengte eerlijk over 7 gelijke stukken.",
            "hintMoose": "Zoek in de tafel van 7 welk getal uitkomt op 14.",
            "explanation": "14 : 7 = 2 meter."
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
            "prompt": "5 × 9 = ?",
            "answer": 45,
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 5 en haal 5 eraf.",
            "explanation": "5 × 9 = 45."
          },
          {
            "id": "roman-fountain-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Rond de Romeinse fontein liggen 5 mozaïekstroken met elk 8 tegels. Hoeveel tegels zijn dat samen?",
            "answer": 40,
            "hintMinnie": "Er zijn 5 gelijke groepjes. In elk groepje zitten er 8.",
            "hintMoose": "Verdubbel 5 drie keer.",
            "explanation": "5 × 8 = 40."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "7 × 9 = ?",
            "answer": 63,
            "choices": [
              54,
              63,
              72,
              81
            ],
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 7 en haal 7 eraf.",
            "explanation": "7 × 9 = 63."
          },
          {
            "id": "gelato-cart-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "7 × 8 = ?",
            "answer": 56,
            "choices": [
              48,
              56,
              64,
              72
            ],
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 7 en verdubbel dat.",
            "explanation": "7 × 8 = 56."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "3 × 3 = ?",
            "answer": 9,
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 3 en tel nog 3 erbij.",
            "explanation": "3 × 3 = 9."
          },
          {
            "id": "gelato-cart-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "30 : 5 = ?",
            "answer": 6,
            "choices": [
              5,
              6,
              7,
              8
            ],
            "hintMinnie": "Welke som uit de tafel van 5 helpt?",
            "hintMoose": "Omdat 5 × 6 = 30, is 30 : 5 = 6.",
            "explanation": "30 : 5 = 6."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "9 × 7 = ?",
            "answer": 63,
            "choices": [
              56,
              63,
              70,
              77
            ],
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 9 en 2 × 9.",
            "explanation": "9 × 7 = 63."
          },
          {
            "id": "gelato-cart-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De ijsverkoper verdeelt 54 ijsbekers over 6 dienbladen. Op ieder blad komen er evenveel. Hoeveel bekers per dienblad?",
            "answer": 9,
            "choices": [
              8,
              9,
              10,
              11
            ],
            "hintMinnie": "Verdeel 54 eerlijk over 6 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 6 welk getal uitkomt op 54.",
            "explanation": "54 : 6 = 9."
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
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De ijsverkoper zet 5 dienbladen klaar met elk 9 ijsbekers. Hoeveel bekers zijn dat samen?",
            "answer": 45,
            "hintMinnie": "Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.",
            "hintMoose": "Reken 5 × 10 en haal er daarna 5 af.",
            "explanation": "5 × 9 = 45."
          },
          {
            "id": "gelato-cart-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "7 × 10 = ?",
            "answer": 70,
            "choices": [
              60,
              70,
              80,
              90
            ],
            "hintMinnie": "Denk aan de tafel van 10.",
            "hintMoose": "7 groepjes van 10 eindigen op nul.",
            "explanation": "7 × 10 = 70."
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
    player: { startNode: "left-start", start: { x: 184, y: 645 } },
    interactiveObjects: [
    {
      id: "colosseum",
      type: "rune",
      center: { x: 450, y: 314 },
      radius: 88,
      approachNode: "colosseum-approach",
      label: "Colosseum"
    },
    {
      id: "romanFountain",
      type: "rune",
      center: { x: 613, y: 461 },
      radius: 59,
      approachNode: "fountain-approach",
      label: "Romeinse fontein"
    },
    {
      id: "gelatoCart",
      type: "rune",
      center: { x: 1085, y: 510 },
      radius: 73,
      approachNode: "gelato-approach",
      label: "Gelatokar"
    },
    {
      id: "grapePress",
      type: "ambient",
      center: { x: 1617, y: 521 },
      radius: 69,
      approachNode: "press-approach",
      label: "Druivenpers"
    },
    {
      id: "romanGate",
      type: "gate",
      center: { x: 2020, y: 539 },
      radius: 89,
      approachNode: "gate-approach",
      label: "Romeinse poort"
    }
  ],
    ambientFlybys: [
        {
              id: "italyCommonSwift",
              label: "Gierzwaluw",
              frameA: "assets/ambient/flybys/common-swift/common-swift-a.png",
              frameB: "assets/ambient/flybys/common-swift/common-swift-b.png",
              sound: "assets/ambient/flybys/common-swift/common-swift-call.mp3",
              path: [
                    {
                          x: -220,
                          y: 115
                    },
                    {
                          x: 620,
                          y: 190
                    },
                    {
                          x: 1270,
                          y: 160
                    },
                    {
                          x: 2390,
                          y: 95
                    }
              ],
              scale: 0.14,
              speed: 820,
              flapFrequencyHz: 8,
              faceFlightDirection: true,
              mirrorX: false,
              intervalMinMs: 10000,
              intervalMaxMs: 25000,
              syncKey: "italy-swift-pair",
              startDelayMs: 0,
              softness: 0.15,
              saturation: 0.95,
              soundVolume: 0.62,
              rotateAlongPath: true,
              maxRotationDeg: 8
        },
        {
              id: "italyCommonSwift-copy",
              label: "Gierzwaluw kopie",
              frameA: "assets/ambient/flybys/common-swift/common-swift-a.png",
              frameB: "assets/ambient/flybys/common-swift/common-swift-b.png",
              sound: "assets/ambient/flybys/common-swift/common-swift-call.mp3",
              path: [
                    {
                          x: -205,
                          y: 82
                    },
                    {
                          x: 620,
                          y: 150
                    },
                    {
                          x: 1272,
                          y: 131
                    },
                    {
                          x: 2373,
                          y: 41
                    }
              ],
              scale: 0.12,
              speed: 800,
              flapFrequencyHz: 8,
              faceFlightDirection: true,
              mirrorX: false,
              intervalMinMs: 10000,
              intervalMaxMs: 25000,
              syncKey: "italy-swift-pair",
              startDelayMs: 0,
              softness: 0.15,
              saturation: 0.95,
              soundVolume: 0.62,
              rotateAlongPath: true,
              maxRotationDeg: 8
        },
        {
              id: "italyCommonSwift-copy-copy",
              label: "Gierzwaluw kopie kopie",
              frameA: "assets/ambient/flybys/common-swift/common-swift-a.png",
              frameB: "assets/ambient/flybys/common-swift/common-swift-b.png",
              sound: "assets/ambient/flybys/common-swift/common-swift-call.mp3",
              path: [
                    {
                          x: -187,
                          y: 53
                    },
                    {
                          x: 622,
                          y: 112
                    },
                    {
                          x: 1277,
                          y: 103
                    },
                    {
                          x: 2368,
                          y: 7
                    }
              ],
              scale: 0.1,
              speed: 790,
              flapFrequencyHz: 8,
              faceFlightDirection: true,
              mirrorX: false,
              intervalMinMs: 10000,
              intervalMaxMs: 25000,
              syncKey: "italy-swift-pair",
              startDelayMs: 0,
              softness: 0.15,
              saturation: 0.95,
              soundVolume: 0.62,
              rotateAlongPath: true,
              maxRotationDeg: 8
        },
        {
              id: "italyCommonSwift-copy-2",
              label: "Gierzwaluw kopie",
              frameA: "assets/ambient/flybys/common-swift/common-swift-a.png",
              frameB: "assets/ambient/flybys/common-swift/common-swift-b.png",
              sound: "assets/ambient/flybys/common-swift/common-swift-call.mp3",
              path: [
                    {
                          x: -201,
                          y: 154
                    },
                    {
                          x: 618,
                          y: 230
                    },
                    {
                          x: 1277,
                          y: 190
                    },
                    {
                          x: 2390,
                          y: 95
                    }
              ],
              scale: 0.09,
              speed: 810,
              flapFrequencyHz: 8,
              faceFlightDirection: true,
              mirrorX: false,
              intervalMinMs: 10000,
              intervalMaxMs: 25000,
              syncKey: "italy-swift-pair",
              startDelayMs: 0,
              softness: 0.15,
              saturation: 0.95,
              soundVolume: 0.62,
              rotateAlongPath: true,
              maxRotationDeg: 8
        }
  ],
    walkPath: [
    { id: "left-start", x: 184, y: 645 },
    { id: "colosseum-approach", x: 443, y: 636, role: "approach" },
    { id: "fountain-approach", x: 625, y: 640, role: "approach" },
    { id: "gelato-approach", x: 1046, y: 642, role: "approach" },
    { id: "vineyard-path", x: 1394, y: 640 },
    { id: "press-approach", x: 1612, y: 644, role: "approach" },
    { id: "gate-approach", x: 2017, y: 645, role: "approach" }
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
    },
    ambientAnimals: []
  };
})();
