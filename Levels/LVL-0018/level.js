window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0018/assets/noorwegen.png";
  const challengerAsset = "Levels/LVL-0018/assets/atlas-de-reiziger.png";
  const learningChallenges = [
  {
    "id": "staveChurch",
    "anchorId": "staveChurch",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "stave-church-slot-1",
        "variants": [
          {
            "id": "stave-church-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "6 × 8 = ?",
            "answer": 48,
            "choices": [
              40,
              48,
              56,
              64
            ],
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 6 en verdubbel dat.",
            "explanation": "6 × 8 = 48."
          },
          {
            "id": "stave-church-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "12 : 4 = ?",
            "answer": 3,
            "choices": [
              2,
              3,
              4,
              5
            ],
            "hintMinnie": "Welke som uit de tafel van 4 helpt?",
            "hintMoose": "Omdat 4 × 3 = 12, is 12 : 4 = 3.",
            "explanation": "12 : 4 = 3."
          }
        ]
      },
      {
        "id": "stave-church-slot-2",
        "variants": [
          {
            "id": "stave-church-2a",
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
            "id": "stave-church-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "7 × 6 = ?",
            "answer": 42,
            "choices": [
              36,
              42,
              48,
              54
            ],
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 7 en tel nog 7 erbij.",
            "explanation": "7 × 6 = 42."
          }
        ]
      },
      {
        "id": "stave-church-slot-3",
        "variants": [
          {
            "id": "stave-church-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De timmerman verdeelt 15 houten plankjes eerlijk over 3 deuren. Hoeveel plankjes gebruikt hij per deur?",
            "answer": 5,
            "hintMinnie": "Verdeel 15 eerlijk over 3 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 3 welk getal uitkomt op 15.",
            "explanation": "15 : 3 = 5."
          },
          {
            "id": "stave-church-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "5 × 10 = ?",
            "answer": 50,
            "choices": [
              40,
              50,
              60,
              70
            ],
            "hintMinnie": "Denk aan de tafel van 10.",
            "hintMoose": "5 groepjes van 10 eindigen op nul.",
            "explanation": "5 × 10 = 50."
          }
        ]
      },
      {
        "id": "stave-church-slot-4",
        "variants": [
          {
            "id": "stave-church-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "4 × 8 = ?",
            "answer": 32,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 4 en verdubbel dat.",
            "explanation": "4 × 8 = 32."
          },
          {
            "id": "stave-church-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "9 × 4 = ?",
            "answer": 36,
            "hintMinnie": "Denk aan de tafel van 4.",
            "hintMoose": "Verdubbel 9 twee keer.",
            "explanation": "9 × 4 = 36."
          }
        ]
      }
    ]
  },
  {
    "id": "lighthouse",
    "anchorId": "lighthouse",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "lighthouse-slot-1",
        "variants": [
          {
            "id": "lighthouse-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De vuurtoren heeft 8 ramen met samen 48 lichtjes. In ieder raam branden er evenveel. Hoeveel lichtjes per raam?",
            "answer": 6,
            "choices": [
              5,
              6,
              7,
              8
            ],
            "hintMinnie": "Verdeel 48 eerlijk over 8 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 8 welk getal uitkomt op 48.",
            "explanation": "48 : 8 = 6."
          },
          {
            "id": "lighthouse-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "6 × 7 = ?",
            "answer": 42,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 6 en 2 × 6.",
            "explanation": "6 × 7 = 42."
          }
        ]
      },
      {
        "id": "lighthouse-slot-2",
        "variants": [
          {
            "id": "lighthouse-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "81 : 9 = ?",
            "answer": 9,
            "choices": [
              8,
              9,
              10,
              11
            ],
            "hintMinnie": "Welke som uit de tafel van 9 helpt?",
            "hintMoose": "Omdat 9 × 9 = 81, is 81 : 9 = 9.",
            "explanation": "81 : 9 = 9."
          },
          {
            "id": "lighthouse-2b",
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
        "id": "lighthouse-slot-3",
        "variants": [
          {
            "id": "lighthouse-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "2 × 8 = ?",
            "answer": 16,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 2 en verdubbel dat.",
            "explanation": "2 × 8 = 16."
          },
          {
            "id": "lighthouse-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De vuurtoren heeft 7 ringen met elk 4 lampen. Hoeveel lampen zijn dat samen?",
            "answer": 28,
            "choices": [
              24,
              28,
              32,
              36
            ],
            "hintMinnie": "Er zijn 7 gelijke groepjes. In elk groepje zitten er 4.",
            "hintMoose": "Verdubbel 7 en verdubbel de uitkomst nog eens.",
            "explanation": "7 × 4 = 28."
          }
        ]
      },
      {
        "id": "lighthouse-slot-4",
        "variants": [
          {
            "id": "lighthouse-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "8 × 4 = ?",
            "answer": 32,
            "hintMinnie": "Denk aan de tafel van 4.",
            "hintMoose": "Verdubbel 8 twee keer.",
            "explanation": "8 × 4 = 32."
          },
          {
            "id": "lighthouse-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "4 × 7 = ?",
            "answer": 28,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 4 en 2 × 4.",
            "explanation": "4 × 7 = 28."
          }
        ]
      }
    ]
  },
  {
    "id": "vikingShip",
    "anchorId": "vikingShip",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "viking-ship-slot-1",
        "variants": [
          {
            "id": "viking-ship-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "6 × 8 = ?",
            "answer": 48,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 6 en verdubbel dat.",
            "explanation": "6 × 8 = 48."
          },
          {
            "id": "viking-ship-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "3 × 4 = ?",
            "answer": 12,
            "hintMinnie": "Denk aan de tafel van 4.",
            "hintMoose": "Verdubbel 3 twee keer.",
            "explanation": "3 × 4 = 12."
          }
        ]
      },
      {
        "id": "viking-ship-slot-2",
        "variants": [
          {
            "id": "viking-ship-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "16 : 4 = ?",
            "answer": 4,
            "hintMinnie": "Welke som uit de tafel van 4 helpt?",
            "hintMoose": "Omdat 4 × 4 = 16, is 16 : 4 = 4.",
            "explanation": "16 : 4 = 4."
          },
          {
            "id": "viking-ship-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Op het Vikingschip staan 8 rijen met elk 7 scheepskisten. Hoeveel kisten zijn dat samen?",
            "answer": 56,
            "choices": [
              49,
              56,
              63,
              70
            ],
            "hintMinnie": "Er zijn 8 gelijke groepjes. In elk groepje zitten er 7.",
            "hintMoose": "Reken 8 × 5 en 8 × 2 en tel de uitkomsten op.",
            "explanation": "8 × 7 = 56."
          }
        ]
      },
      {
        "id": "viking-ship-slot-3",
        "variants": [
          {
            "id": "viking-ship-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "3 × 9 = ?",
            "answer": 27,
            "choices": [
              18,
              27,
              36,
              45
            ],
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 3 en haal 3 eraf.",
            "explanation": "3 × 9 = 27."
          },
          {
            "id": "viking-ship-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "4 × 9 = ?",
            "answer": 36,
            "choices": [
              27,
              36,
              45,
              54
            ],
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 4 en haal 4 eraf.",
            "explanation": "4 × 9 = 36."
          }
        ]
      },
      {
        "id": "viking-ship-slot-4",
        "variants": [
          {
            "id": "viking-ship-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "4 × 8 = ?",
            "answer": 32,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 4 en verdubbel dat.",
            "explanation": "4 × 8 = 32."
          },
          {
            "id": "viking-ship-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "4 × 7 = ?",
            "answer": 28,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 4 en 2 × 4.",
            "explanation": "4 × 7 = 28."
          }
        ]
      }
    ]
  }
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
    learningChallenges,
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
      solved: item.solved, challengeId: item.id
    })),
    sceneEffects: [
        {
              id: "sun-presence-01",
              label: "Soft evening sun 1",
              presetId: "sun-presence",
              variantId: "soft-evening-sun",
              presetVersion: 1,
              enabled: true,
              seed: 236382945,
              qualityTier: "auto",
              layerSlot: "worldLight",
              groupId: "",
              geometry: {
                    type: "pointRadius",
                    x: 1248,
                    y: 257,
                    radius: 250
              },
              overrides: {
                    rayEndAngle: 180
              }
        },
        {
              id: "focused-fog-02",
              label: "Focused Fog 2",
              presetId: "focused-fog",
              variantId: "default-focused-fog",
              presetVersion: 1,
              enabled: true,
              seed: 425908029,
              qualityTier: "auto",
              layerSlot: "foregroundAtmosphere",
              groupId: "",
              geometry: {
                    type: "rectangle",
                    x: 1039,
                    y: 506,
                    width: 382,
                    height: 115
              },
              overrides: {}
        }
  ],
    reward: {
      title: "Het fjordlicht wijst de weg!",
      badge: "Fjordzoeker",
      line: "Sven vond langs vuurtoren en vikingschip de route naar Zweden.",
      art: asset, nextLevelId: "LVL-0019", nextLabel: "Naar Zweden"
    }
  };
})();
