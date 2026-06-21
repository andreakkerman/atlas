window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0014/assets/engeland.png";
  const challengerAsset = "Levels/LVL-0014/assets/atlas-de-reiziger.png";
  const learningChallenges = [
  {
    "id": "clockTower",
    "anchorId": "clockTower",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "clock-tower-slot-1",
        "variants": [
          {
            "id": "uk-clock-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half acht",
            "choices": [
              "Half zeven",
              "Zeven uur",
              "Half acht",
              "Acht uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 7,
              "minute": 30
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer op de 6 betekent half. De kleine wijzer staat tussen de 7 en de 8.",
            "explanation": "Het is half acht."
          },
          {
            "id": "uk-clock-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half vijf",
            "choices": [
              "Vier uur",
              "Half vier",
              "Half vijf",
              "Vijf uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 4,
              "minute": 30
            },
            "hintMinnie": "De grote wijzer staat op de 6.",
            "hintMoose": "De kleine wijzer staat tussen de 4 en de 5. In het Nederlands kijk je vooruit.",
            "explanation": "Het is half vijf."
          }
        ]
      },
      {
        "id": "clock-tower-slot-2",
        "variants": [
          {
            "id": "uk-clock-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half vier",
            "choices": [
              "Drie uur",
              "Half drie",
              "Half vier",
              "Vier uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 3,
              "minute": 30
            },
            "hintMinnie": "Zoek de grote wijzer op de 6.",
            "hintMoose": "De kleine wijzer staat tussen de 3 en de 4.",
            "explanation": "Het is half vier."
          },
          {
            "id": "uk-clock-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half negen",
            "choices": [
              "Acht uur",
              "Half acht",
              "Half negen",
              "Negen uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 8,
              "minute": 30
            },
            "hintMinnie": "Bij een half uur wijst de grote wijzer omlaag.",
            "hintMoose": "Kijk naar het uur waar de kleine wijzer naartoe gaat.",
            "explanation": "Het is half negen."
          }
        ]
      },
      {
        "id": "clock-tower-slot-3",
        "variants": [
          {
            "id": "uk-clock-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half elf",
            "choices": [
              "Tien uur",
              "Half tien",
              "Half elf",
              "Elf uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 10,
              "minute": 30
            },
            "hintMinnie": "De grote wijzer staat op de 6.",
            "hintMoose": "De kleine wijzer staat tussen de 10 en de 11.",
            "explanation": "Het is half elf."
          },
          {
            "id": "uk-clock-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half één",
            "choices": [
              "Twaalf uur",
              "Half twaalf",
              "Half één",
              "Eén uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 12,
              "minute": 30
            },
            "hintMinnie": "De kleine wijzer staat tussen 12 en 1.",
            "hintMoose": "Bij half noem je het uur dat eraan komt.",
            "explanation": "Het is half één."
          }
        ]
      },
      {
        "id": "clock-tower-slot-4",
        "variants": [
          {
            "id": "uk-clock-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half twee",
            "choices": [
              "Eén uur",
              "Half één",
              "Half twee",
              "Twee uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 1,
              "minute": 30
            },
            "hintMinnie": "De grote wijzer staat recht naar beneden.",
            "hintMoose": "De kleine wijzer staat tussen de 1 en de 2.",
            "explanation": "Het is half twee."
          },
          {
            "id": "uk-clock-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_half_hour",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Half zeven",
            "choices": [
              "Zes uur",
              "Half zes",
              "Half zeven",
              "Zeven uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 6,
              "minute": 30
            },
            "hintMinnie": "Kijk naar het volgende hele uur.",
            "hintMoose": "De kleine wijzer staat tussen de 6 en de 7.",
            "explanation": "Het is half zeven."
          }
        ]
      }
    ]
  },
  {
    "id": "telescope",
    "anchorId": "telescope",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "telescope-slot-1",
        "variants": [
          {
            "id": "telescope-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "24 : 6 = ?",
            "answer": 4,
            "choices": [
              3,
              4,
              5,
              6
            ],
            "hintMinnie": "Welke som uit de tafel van 6 helpt?",
            "hintMoose": "Omdat 6 × 4 = 24, is 24 : 6 = 4.",
            "explanation": "24 : 6 = 4."
          },
          {
            "id": "telescope-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas verdeelt 30 sterrenstickers over 6 sterrenkaarten. Op iedere kaart komen er evenveel. Hoeveel stickers per kaart?",
            "answer": 5,
            "hintMinnie": "Verdeel 30 eerlijk over 6 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 6 welk getal uitkomt op 30.",
            "explanation": "30 : 6 = 5."
          }
        ]
      },
      {
        "id": "telescope-slot-2",
        "variants": [
          {
            "id": "telescope-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "3 × 3 = ?",
            "answer": 9,
            "choices": [
              6,
              9,
              12,
              15
            ],
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 3 en tel nog 3 erbij.",
            "explanation": "3 × 3 = 9."
          },
          {
            "id": "telescope-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "42 : 6 = ?",
            "answer": 7,
            "choices": [
              6,
              7,
              8,
              9
            ],
            "hintMinnie": "Welke som uit de tafel van 6 helpt?",
            "hintMoose": "Omdat 6 × 7 = 42, is 42 : 6 = 7.",
            "explanation": "42 : 6 = 7."
          }
        ]
      },
      {
        "id": "telescope-slot-3",
        "variants": [
          {
            "id": "telescope-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "48 : 6 = ?",
            "answer": 8,
            "choices": [
              7,
              8,
              9,
              10
            ],
            "hintMinnie": "Welke som uit de tafel van 6 helpt?",
            "hintMoose": "Omdat 6 × 8 = 48, is 48 : 6 = 8.",
            "explanation": "48 : 6 = 8."
          },
          {
            "id": "telescope-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "6 × 3 = ?",
            "answer": 18,
            "choices": [
              15,
              18,
              21,
              24
            ],
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 6 en tel nog 6 erbij.",
            "explanation": "6 × 3 = 18."
          }
        ]
      },
      {
        "id": "telescope-slot-4",
        "variants": [
          {
            "id": "telescope-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Op 2 sterrenkaarten staan elk 6 sterren. Hoeveel sterren zijn dat samen?",
            "answer": 12,
            "hintMinnie": "Er zijn 2 gelijke groepjes. In elk groepje zitten er 6.",
            "hintMoose": "Reken 2 × 5 en tel er nog 2 bij op.",
            "explanation": "2 × 6 = 12."
          },
          {
            "id": "telescope-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Op 5 sterrenkaarten staan elk 8 sterren. Hoeveel sterren zijn dat samen?",
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
    "id": "postbox",
    "anchorId": "postbox",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "postbox-slot-1",
        "variants": [
          {
            "id": "postbox-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "3 × 5 = ?",
            "answer": 15,
            "choices": [
              10,
              15,
              20,
              25
            ],
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 3 sprongen van 5.",
            "explanation": "3 × 5 = 15."
          },
          {
            "id": "postbox-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De postbode verdeelt 72 postkaarten eerlijk over 9 postzakken. Hoeveel kaarten gaan in iedere zak?",
            "answer": 8,
            "choices": [
              7,
              8,
              9,
              10
            ],
            "hintMinnie": "Verdeel 72 eerlijk over 9 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 9 welk getal uitkomt op 72.",
            "explanation": "72 : 9 = 8."
          }
        ]
      },
      {
        "id": "postbox-slot-2",
        "variants": [
          {
            "id": "postbox-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "20 : 10 = ?",
            "answer": 2,
            "choices": [
              1,
              2,
              3,
              4
            ],
            "hintMinnie": "Welke som uit de tafel van 10 helpt?",
            "hintMoose": "Omdat 10 × 2 = 20, is 20 : 10 = 2.",
            "explanation": "20 : 10 = 2."
          },
          {
            "id": "postbox-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "6 × 5 = ?",
            "answer": 30,
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 6 sprongen van 5.",
            "explanation": "6 × 5 = 30."
          }
        ]
      },
      {
        "id": "postbox-slot-3",
        "variants": [
          {
            "id": "postbox-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "7 × 5 = ?",
            "answer": 35,
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 7 sprongen van 5.",
            "explanation": "7 × 5 = 35."
          },
          {
            "id": "postbox-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "7 × 4 = ?",
            "answer": 28,
            "choices": [
              24,
              28,
              32,
              36
            ],
            "hintMinnie": "Denk aan de tafel van 4.",
            "hintMoose": "Verdubbel 7 twee keer.",
            "explanation": "7 × 4 = 28."
          }
        ]
      },
      {
        "id": "postbox-slot-4",
        "variants": [
          {
            "id": "postbox-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "In 6 postzakken zitten elk 2 postkaarten. Hoeveel postkaarten zijn dat samen?",
            "answer": 12,
            "choices": [
              10,
              12,
              14,
              16
            ],
            "hintMinnie": "Er zijn 6 gelijke groepjes. In elk groepje zitten er 2.",
            "hintMoose": "Verdubbel 6.",
            "explanation": "6 × 2 = 12."
          },
          {
            "id": "postbox-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "8 × 3 = ?",
            "answer": 24,
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 8 en tel nog 8 erbij.",
            "explanation": "8 × 3 = 24."
          }
        ]
      }
    ]
  }
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
    learningChallenges,
    player: { startNode: "left-start", start: { x: 221, y: 637 } },
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
    runes: challenges.map((item) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, challengeId: item.id
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
