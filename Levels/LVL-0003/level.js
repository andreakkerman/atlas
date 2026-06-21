window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

const learningChallengesLVL0003 = [
  {
    "id": "harborMap",
    "anchorId": "harborMap",
    "challengeCharacterId": "havenmeester-eivar",
    "questions": [
      {
        "id": "harborMap-slot-1",
        "variants": [
          {
            "id": "harborMap-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "2 × 7 = ?",
            "answer": 14,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 2 en 2 × 2.",
            "explanation": "2 × 7 = 14."
          },
          {
            "id": "harborMap-1b",
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
          }
        ]
      },
      {
        "id": "harborMap-slot-2",
        "variants": [
          {
            "id": "harborMap-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "money",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De Viking koopt 4 Vikingkaarten voor 7 euro per stuk. Hoeveel euro betaalt hij?",
            "answer": 28,
            "hintMinnie": "Elk kaartje kost 7 euro.",
            "hintMoose": "Reken 5 × 4 en 2 × 4.",
            "explanation": "4 × 7 = 28 euro."
          },
          {
            "id": "harborMap-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "3 × 5 = ?",
            "answer": 15,
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 3 sprongen van 5.",
            "explanation": "3 × 5 = 15."
          }
        ]
      },
      {
        "id": "harborMap-slot-3",
        "variants": [
          {
            "id": "harborMap-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "2 × 3 = ?",
            "answer": 6,
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 2 en tel nog 2 erbij.",
            "explanation": "2 × 3 = 6."
          },
          {
            "id": "harborMap-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De Viking verdeelt bij Havenkaart 49 routefiches over 7 gelijke groepen. Hoeveel routefiches krijgt elke groep?",
            "answer": 7,
            "hintMinnie": "Welke som uit de tafel van 7 helpt?",
            "hintMoose": "Omdat 7 × 7 = 49, is 49 : 7 = 7.",
            "explanation": "49 : 7 = 7."
          }
        ]
      },
      {
        "id": "harborMap-slot-4",
        "variants": [
          {
            "id": "harborMap-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "8 × 7 = ?",
            "answer": 56,
            "choices": [
              49,
              56,
              63,
              70
            ],
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 8 en 2 × 8.",
            "explanation": "8 × 7 = 56."
          },
          {
            "id": "harborMap-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "5 × 3 = ?",
            "answer": 15,
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 5 en tel nog 5 erbij.",
            "explanation": "5 × 3 = 15."
          }
        ]
      }
    ]
  },
  {
    "id": "shipCompass",
    "anchorId": "shipCompass",
    "challengeCharacterId": "havenmeester-eivar",
    "questions": [
      {
        "id": "shipCompass-slot-1",
        "variants": [
          {
            "id": "shipCompass-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Tien over acht",
            "choices": [
              "Vijf over acht",
              "Tien over acht",
              "Tien voor acht",
              "Kwart over acht"
            ],
            "visual": {
              "type": "clock",
              "hour": 8,
              "minute": 10
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij tien over acht.",
            "explanation": "Het is tien over acht."
          },
          {
            "id": "shipCompass-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Tien voor half vijf",
            "choices": [
              "Kwart over vier",
              "Tien voor half vijf",
              "Tien over half vier",
              "Half vijf"
            ],
            "visual": {
              "type": "clock",
              "hour": 4,
              "minute": 20
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij tien voor half vijf.",
            "explanation": "Het is tien voor half vijf."
          }
        ]
      },
      {
        "id": "shipCompass-slot-2",
        "variants": [
          {
            "id": "shipCompass-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Vijf voor half zeven",
            "choices": [
              "Vijf over zes",
              "Vijf voor half zeven",
              "Half zeven",
              "Vijf over half zeven"
            ],
            "visual": {
              "type": "clock",
              "hour": 6,
              "minute": 25
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij vijf voor half zeven.",
            "explanation": "Het is vijf voor half zeven."
          },
          {
            "id": "shipCompass-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Vijf over half elf",
            "choices": [
              "Half elf",
              "Vijf voor half elf",
              "Vijf over half elf",
              "Vijf voor elf"
            ],
            "visual": {
              "type": "clock",
              "hour": 10,
              "minute": 35
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij vijf over half elf.",
            "explanation": "Het is vijf over half elf."
          }
        ]
      },
      {
        "id": "shipCompass-slot-3",
        "variants": [
          {
            "id": "shipCompass-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Tien over half drie",
            "choices": [
              "Tien voor half drie",
              "Half drie",
              "Tien over half drie",
              "Tien voor drie"
            ],
            "visual": {
              "type": "clock",
              "hour": 2,
              "minute": 40
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij tien over half drie.",
            "explanation": "Het is tien over half drie."
          },
          {
            "id": "shipCompass-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Tien voor acht",
            "choices": [
              "Tien over zeven",
              "Vijf voor acht",
              "Tien voor acht",
              "Acht uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 7,
              "minute": 50
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij tien voor acht.",
            "explanation": "Het is tien voor acht."
          }
        ]
      },
      {
        "id": "shipCompass-slot-4",
        "variants": [
          {
            "id": "shipCompass-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Vijf over elf",
            "choices": [
              "Vijf voor elf",
              "Vijf over elf",
              "Tien over elf",
              "Elf uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 11,
              "minute": 5
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij vijf over elf.",
            "explanation": "Het is vijf over elf."
          },
          {
            "id": "shipCompass-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Vijf voor twee",
            "choices": [
              "Vijf over één",
              "Tien voor twee",
              "Vijf voor twee",
              "Twee uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 1,
              "minute": 55
            },
            "hintMinnie": "Kijk eerst naar de grote wijzer.",
            "hintMoose": "De grote wijzer wijst de minuten aan. De kleine wijzer helpt je bij vijf voor twee.",
            "explanation": "Het is vijf voor twee."
          }
        ]
      }
    ]
  },
  {
    "id": "mooringRope",
    "anchorId": "mooringRope",
    "challengeCharacterId": "havenmeester-eivar",
    "questions": [
      {
        "id": "mooringRope-slot-1",
        "variants": [
          {
            "id": "mooringRope-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "6 × 3 = ?",
            "answer": 18,
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 6 en tel nog 6 erbij.",
            "explanation": "6 × 3 = 18."
          },
          {
            "id": "mooringRope-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "4 × 8 = ?",
            "answer": 32,
            "choices": [
              24,
              32,
              40,
              48
            ],
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 4 en verdubbel dat.",
            "explanation": "4 × 8 = 32."
          }
        ]
      },
      {
        "id": "mooringRope-slot-2",
        "variants": [
          {
            "id": "mooringRope-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De Viking legt bij Touwrol 3 groepjes van 6 touwlussen. Hoeveel touwlussen zijn dat samen?",
            "answer": 18,
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 3 en tel nog 3 erbij.",
            "explanation": "3 × 6 = 18."
          },
          {
            "id": "mooringRope-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "2 × 4 = ?",
            "answer": 8,
            "choices": [
              4,
              8,
              12,
              16
            ],
            "hintMinnie": "Denk aan de tafel van 4.",
            "hintMoose": "Verdubbel 2 twee keer.",
            "explanation": "2 × 4 = 8."
          }
        ]
      },
      {
        "id": "mooringRope-slot-3",
        "variants": [
          {
            "id": "mooringRope-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "route",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De route bij Touwrol is 18 meter lang en heeft 2 gelijke stukken. Hoeveel meter is elk stuk?",
            "answer": 9,
            "hintMinnie": "Verdeel de route in gelijke stukken.",
            "hintMoose": "Omdat 2 × 9 = 18, is 18 : 2 = 9.",
            "explanation": "18 : 2 = 9 meter."
          },
          {
            "id": "mooringRope-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De Viking verdeelt bij Touwrol 49 touwlussen over 7 gelijke groepen. Hoeveel touwlussen krijgt elke groep?",
            "answer": 7,
            "hintMinnie": "Welke som uit de tafel van 7 helpt?",
            "hintMoose": "Omdat 7 × 7 = 49, is 49 : 7 = 7.",
            "explanation": "49 : 7 = 7."
          }
        ]
      },
      {
        "id": "mooringRope-slot-4",
        "variants": [
          {
            "id": "mooringRope-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De Viking verdeelt bij Touwrol 42 touwlussen over 6 gelijke groepen. Hoeveel touwlussen krijgt elke groep?",
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
          },
          {
            "id": "mooringRope-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De Viking legt bij Touwrol 8 groepjes van 6 touwlussen. Hoeveel touwlussen zijn dat samen?",
            "answer": 48,
            "choices": [
              42,
              48,
              54,
              60
            ],
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 8 en tel nog 8 erbij.",
            "explanation": "8 × 6 = 48."
          }
        ]
      }
    ]
  },
  {
    "id": "gateShield",
    "anchorId": "gateShield",
    "challengeCharacterId": "havenmeester-eivar",
    "questions": [
      {
        "id": "gateShield-slot-1",
        "variants": [
          {
            "id": "gateShield-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De Viking legt bij Poortschild 4 groepjes van 9 schildtekens. Hoeveel schildtekens zijn dat samen?",
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
          },
          {
            "id": "gateShield-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "32 : 8 = ?",
            "answer": 4,
            "choices": [
              3,
              4,
              5,
              6
            ],
            "hintMinnie": "Welke som uit de tafel van 8 helpt?",
            "hintMoose": "Omdat 8 × 4 = 32, is 32 : 8 = 4.",
            "explanation": "32 : 8 = 4."
          }
        ]
      },
      {
        "id": "gateShield-slot-2",
        "variants": [
          {
            "id": "gateShield-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "5 × 8 = ?",
            "answer": 40,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 5 en verdubbel dat.",
            "explanation": "5 × 8 = 40."
          },
          {
            "id": "gateShield-2b",
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
          }
        ]
      },
      {
        "id": "gateShield-slot-3",
        "variants": [
          {
            "id": "gateShield-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De Viking legt bij Poortschild 7 groepjes van 8 schildtekens. Hoeveel schildtekens zijn dat samen?",
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
          },
          {
            "id": "gateShield-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "9 × 9 = ?",
            "answer": 81,
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 9 en haal 9 eraf.",
            "explanation": "9 × 9 = 81."
          }
        ]
      },
      {
        "id": "gateShield-slot-4",
        "variants": [
          {
            "id": "gateShield-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "9 × 8 = ?",
            "answer": 72,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 9 en verdubbel dat.",
            "explanation": "9 × 8 = 72."
          },
          {
            "id": "gateShield-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "De Viking legt bij Poortschild 4 groepjes van 2 schildtekens. Hoeveel schildtekens zijn dat samen?",
            "answer": 8,
            "choices": [
              6,
              8,
              10,
              12
            ],
            "hintMinnie": "Denk aan de tafel van 2.",
            "hintMoose": "Verdubbel 4.",
            "explanation": "4 × 2 = 8."
          }
        ]
      }
    ]
  }
];

window.SVEN_LEVEL_DEFINITIONS["LVL-0003"] = {
  id: "LVL-0003",
  title: "De Vikinghaven",
  subtitle: "De havenpoort opent pas als het schip klaar is.",
  description: "Sven bereikt de Vikinghaven, helpt de havenmeester met vier havenproeven en maakt het schip klaar voor vertrek.",
  storageKey: "svenadventure-vikinghaven-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "departureGate",
  exitActionLabel: "Vertrek",
  challengeLabel: "Havenproef",
  challengeCompleteLabel: "Maak de haven klaar",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "havenproeven",
  menu: {
    illustration: "Levels/LVL-0003/assets/viking-harbor.png",
    badge: "Verbonden gebied",
    detail: "Haven, scheepsklok en vertrek naar zee"
  },
  companion: {
    name: "Havenmeester Eivar",
    portrait: "Levels/LVL-0003/assets/havenmeester-eivar.png"
  },
  challengeCharacter: {
    id: "havenmeester-eivar",
    name: "Havenmeester Eivar",
    portrait: "Levels/LVL-0003/assets/havenmeester-eivar.png",
    role: "havenmeester"
  },
  guides: {
    minnie: {
      name: "Minnie",
      portrait: "assets/guides/minnie.png"
    },
    moose: {
      name: "Moose",
      portrait: "assets/guides/moose.png"
    }
  },
  world: {
    width: 2172,
    height: 724,
    aspectRatio: 3,
    viewportWidth: 1000,
    background: "Levels/LVL-0003/assets/viking-harbor.png"
  },
  challengeArt: "Levels/LVL-0003/assets/havenmeester-eivar.png",
  player: {
    startNode: "harbor-start",
    start: { x: 165, y: 586 }
  },
  interactiveObjects: [
    {
      id: "harborMap",
      type: "rune",
      center: { x: 476, y: 424 },
      radius: 72,
      approachNode: "map-stand-approach",
      label: "Havenkaart"
    },
    {
      id: "shipCompass",
      type: "rune",
      center: { x: 856, y: 358 },
      radius: 90,
      approachNode: "compass-approach",
      label: "Scheepsklok"
    },
    {
      id: "mooringRope",
      type: "rune",
      center: { x: 1190, y: 430 },
      radius: 78,
      approachNode: "dock-center",
      label: "Touwrol"
    },
    {
      id: "gateShield",
      type: "rune",
      center: { x: 1495, y: 442 },
      radius: 88,
      approachNode: "gate-shield-approach",
      label: "Poortschild"
    },
    {
      id: "departureGate",
      type: "gate",
      center: { x: 2024, y: 452 },
      radius: 104,
      approachNode: "right-gate-approach",
      label: "Vertrekpoort"
    }
  ],
  walkPath: [
    { id: "harbor-start", x: 165, y: 586 },
    { id: "map-stand-approach", x: 477, y: 588, role: "approach" },
    { id: "compass-approach", x: 817, y: 560, role: "approach" },
    { id: "dock-center", x: 1090, y: 552 },
    { id: "crate-approach", x: 1399, y: 558, role: "approach" },
    { id: "gate-shield-approach", x: 1499, y: 566, role: "approach" },
    { id: "right-gate-approach", x: 1980, y: 575, role: "approach" }
  ],
  intro: [
    "Sven komt aan bij de Vikinghaven.",
    "Het schip ligt klaar.",
    "Maar de vertrekpoort zit nog dicht."
  ],
  spiritName: "Havenmeester Eivar",
  spiritLines: {
    welcome: "Welkom in de haven.",
    chooseRune: "Maak het schip klaar.",
    moving: "De kade kraakt onder de wind.",
    allRunes: "Het schip is klaar voor vertrek.",
    reward: "Sven mag uitvaren."
  },
  guideLines: {
    welcome: {
      speaker: "minnie",
      text: "Oeh, hoor je het water?"
    },
    start: {
      speaker: "minnie",
      text: "Dat schip wacht op ons, denk ik."
    },
    moving: {
      speaker: "moose",
      text: "Rustig over de natte stenen. De haven luistert mee."
    },
    harbor: {
      speaker: "moose",
      text: "Touwen, wind en poorten. Eerst alles stevig maken."
    },
    object: {
      speaker: "minnie",
      text: "Daar glimt iets. Misschien wil het schip antwoord."
    },
    allRunes: {
      speaker: "moose",
      text: "Alles is klaar. Sven mag naar de vertrekpoort."
    },
    reward: {
      speaker: "moose",
      text: "Het schip is klaar. Tijd om te varen."
    }
  },
  levelSemantics: {
    setting: "een Vikinghaven met touwen, kranen, scheepsklokken en een gesloten vertrekpoort",
    mood: "frisse zeewind, klaar voor vertrek",
    companionFocus: {
      minnie: "glimmende scheepsklokken, kaarten en het schip",
      moose: "natte stenen, lading, touwen en veilige afvaart"
    }
  },
  companionMoments: [
    {
      id: "harbor-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Ik hoor water, touwen en een schip dat wil vertrekken."
    },
    {
      id: "harbor-rope",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "mooringRope",
      speaker: "moose",
      text: "Een nette rol touw. In een haven is dat bijna verdacht netjes."
    },
    {
      id: "harbor-map",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "harborMap",
      speaker: "minnie",
      text: "De havenkaart staat vol steigers. Welke som maakt de route duidelijk?"
    },
    {
      id: "harbor-compass",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "shipCompass",
      speaker: "minnie",
      text: "De scheepsklok toont de vertrektijd. Kun jij hem lezen?"
    },
    {
      id: "harbor-shield",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "gateShield",
      speaker: "minnie",
      text: "Het poortschild gloeit blauw. De tekens lijken op een telpatroon."
    },
    {
      id: "harbor-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "moose",
      text: "{completed} van de {total} havenproeven klaar. Nog {remaining}."
    },
    {
      id: "harbor-exit-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De vertrekpoort blijft dicht. Eerst nog {remaining} havenproeven."
    },
    {
      id: "harbor-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "moose",
      text: "De haven is klaar. Tijd om te varen."
    },
    {
      id: "harbor-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "minnie",
      text: "Alles staat klaar! De vertrekpoort kan nu open."
    }
  ],
  areas: [
    { id: "harbor", name: "Vikinghaven", start: 0, end: 2172, guideLine: "harbor" }
  ],
  hotspots: [
    {
      id: "departureGate",
      objectId: "departureGate",
      type: "gate",
      name: "Vertrekpoort",
      defaultAction: "activate",
      look: "De poort naar het schip is nog dicht.",
      activate: "De poort opent. Het schip kan vertrekken."
    }
  ],
  learningChallenges: learningChallengesLVL0003,
  runes: [
    {
      id: "harborMap",
      objectId: "harborMap",
      name: "Havenkaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "Op de kaart staan steigers in groepjes.",
      prompt: "Tel de steigers op de kaart.",
      solved: "Goed zo! De route is duidelijk.",
      challengeId: "harborMap"
    },
    {
      id: "shipCompass",
      objectId: "shipCompass",
      name: "Scheepsklok",
      shortName: "Klok",
      defaultAction: "activate",
      intro: "De scheepsklok toont de vertrektijd.",
      prompt: "Lees de tijd op de scheepsklok.",
      solved: "Mooi! De vertrektijd is duidelijk.",
      challengeId: "shipCompass"
    },
    {
      id: "mooringRope",
      objectId: "mooringRope",
      name: "Touwrol",
      shortName: "Touw",
      defaultAction: "activate",
      intro: "Het meertouw ligt in nette lussen.",
      prompt: "Tel de lussen van het touw.",
      solved: "Sterk! Het touw ligt klaar.",
      challengeId: "mooringRope"
    },
    {
      id: "gateShield",
      objectId: "gateShield",
      name: "Poortschild",
      shortName: "Schild",
      defaultAction: "activate",
      intro: "Het schild op de poort gloeit blauw.",
      prompt: "Tel de tekens op het poortschild.",
      solved: "Goed zo! Het poortschild gaat open.",
      challengeId: "gateShield"
    }
  ],
  reward: {
    title: "Het schip vertrekt!",
    badge: "Vikinghaven Helper",
    line: "Sven maakte de haven klaar. Nu vaart het schip naar het volgende avontuur.",
    art: "Levels/LVL-0003/assets/viking-harbor.png"
  }
};
