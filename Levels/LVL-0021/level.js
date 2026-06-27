window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0021"] = {
  "id": "LVL-0021",
  "title": "Rome",
  "subtitle": "Observatie en licht",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0021/assets/rome.png"
  },
  "player": {
    "start": {
      "x": 309,
      "y": 565
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 120,
    "maxX": 2070,
    "minY": 515,
    "maxY": 610
  },
  "challengeLabel": "Onderzoek",
  "challengeCharacter": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0021/assets/leonardo-da-vinci.png",
    "role": "uitvinder"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/minnie.png",
      "blinkFrame": "assets/guides/minnie-blink.png",
      "purrSounds": [
        "minnie1",
        "minnie2"
      ]
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/moose.png",
      "blinkFrame": "assets/guides/moose-blink.png",
      "purrSounds": [
        "moose1",
        "moose2"
      ]
    }
  },
  "learningChallenges": [
    {
      "id": "opticsTable",
      "anchorId": "opticsTable",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "optics-table-slot-1",
          "variants": [
            {
              "id": "optics-table-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 72,
              "prompt": "6 × 12 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 12 = 72.",
              "choices": [
                66,
                72,
                78,
                84
              ]
            },
            {
              "id": "optics-table-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 91,
              "prompt": "7 × 13 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 13 = 91."
            }
          ]
        },
        {
          "id": "optics-table-slot-2",
          "variants": [
            {
              "id": "optics-table-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 4,
              "prompt": "24 : 6 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "24 : 6 = 4, want 6 × 4 = 24.",
              "choices": [
                3,
                4,
                5,
                6
              ]
            },
            {
              "id": "optics-table-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 48,
              "prompt": "Bij de spiegels liggen 6 rijen met 8 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 6 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "6 × 8 = 48.",
              "choices": [
                42,
                48,
                54,
                60
              ]
            }
          ]
        },
        {
          "id": "optics-table-slot-3",
          "variants": [
            {
              "id": "optics-table-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 70,
              "prompt": "Leonardo tekent 7 vakken met 10 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 7 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "7 × 10 = 70."
            },
            {
              "id": "optics-table-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 6,
              "prompt": "42 : 7 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "42 : 7 = 6, want 7 × 6 = 42."
            }
          ]
        },
        {
          "id": "optics-table-slot-4",
          "variants": [
            {
              "id": "optics-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 45,
              "prompt": "Bij de spiegels liggen eerst 28 onderdelen en Leonardo legt er 17 bij. Hoeveel onderdelen liggen er nu?",
              "hintMinnie": "Kijk welke twee aantallen je samenneemt.",
              "hintMoose": "Tel eerst de tientallen en daarna de lossen.",
              "explanation": "28 + 17 = 45."
            },
            {
              "id": "optics-table-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 3,
              "prompt": "Bij de spiegels maakt Sven van 24 meetkaartjes 8 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "24 : 8 = 3, want 8 × 3 = 24.",
              "choices": [
                2,
                3,
                4,
                5
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "mechanicalModel",
      "anchorId": "mechanicalModel",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "mechanical-model-slot-1",
          "variants": [
            {
              "id": "mechanical-model-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 5,
              "prompt": "Bij de wielen verdeelt Sven 45 onderdelen over 9 gelijke bakken. Hoeveel onderdelen komen in elke bak?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "45 : 9 = 5, want 9 × 5 = 45."
            },
            {
              "id": "mechanical-model-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 72,
              "prompt": "8 × 9 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 9 = 72.",
              "choices": [
                64,
                72,
                80,
                88
              ]
            }
          ]
        },
        {
          "id": "mechanical-model-slot-2",
          "variants": [
            {
              "id": "mechanical-model-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 81,
              "prompt": "9 × 9 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 9 = 81."
            },
            {
              "id": "mechanical-model-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 7,
              "prompt": "14 : 2 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "14 : 2 = 7, want 2 × 7 = 14.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            }
          ]
        },
        {
          "id": "mechanical-model-slot-3",
          "variants": [
            {
              "id": "mechanical-model-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 40,
              "prompt": "Bij de wielen liggen 8 rijen met 5 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 8 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "8 × 5 = 40.",
              "choices": [
                32,
                40,
                48,
                56
              ]
            },
            {
              "id": "mechanical-model-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 63,
              "prompt": "Leonardo tekent 9 vakken met 7 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 9 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "9 × 7 = 63."
            }
          ]
        },
        {
          "id": "mechanical-model-slot-4",
          "variants": [
            {
              "id": "mechanical-model-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 8,
              "prompt": "24 : 3 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "24 : 3 = 8, want 3 × 8 = 24."
            },
            {
              "id": "mechanical-model-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 45,
              "prompt": "Bij de wielen zijn 64 cm touw nodig en Sven gebruikt al 19 cm. Hoeveel cm blijft over?",
              "hintMinnie": "Kijk wat er van het eerste aantal afgaat.",
              "hintMoose": "Trek eerst de tientallen af en daarna de lossen.",
              "explanation": "64 - 19 = 45."
            }
          ]
        }
      ]
    },
    {
      "id": "centralCodex",
      "anchorId": "centralCodex",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "central-codex-slot-1",
          "variants": [
            {
              "id": "central-codex-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 3,
              "prompt": "Bij de codexpagina's verdeelt Sven 12 onderdelen over 4 gelijke bakken. Hoeveel onderdelen komen in elke bak?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "12 : 4 = 3, want 4 × 3 = 12.",
              "choices": [
                2,
                3,
                4,
                5
              ]
            },
            {
              "id": "central-codex-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 5,
              "prompt": "Leonardo verdeelt 25 stukjes bij de codexpagina's in 5 gelijke groepen. Hoeveel stukjes krijgt elke groep?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "25 : 5 = 5, want 5 × 5 = 25."
            }
          ]
        },
        {
          "id": "central-codex-slot-2",
          "variants": [
            {
              "id": "central-codex-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 6,
              "prompt": "2 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 3 = 6.",
              "choices": [
                4,
                6,
                8,
                10
              ]
            },
            {
              "id": "central-codex-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 40,
              "prompt": "10 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "10 × 4 = 40."
            }
          ]
        },
        {
          "id": "central-codex-slot-3",
          "variants": [
            {
              "id": "central-codex-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 4,
              "prompt": "40 : 10 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "40 : 10 = 4, want 10 × 4 = 40.",
              "choices": [
                3,
                4,
                5,
                6
              ]
            },
            {
              "id": "central-codex-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 6,
              "prompt": "Bij de codexpagina's liggen 2 rijen met 3 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 2 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "2 × 3 = 6.",
              "choices": [
                4,
                6,
                8,
                10
              ]
            }
          ]
        },
        {
          "id": "central-codex-slot-4",
          "variants": [
            {
              "id": "central-codex-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 15,
              "prompt": "Leonardo tekent 3 vakken met 5 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 3 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "3 × 5 = 15."
            },
            {
              "id": "central-codex-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 6,
              "prompt": "36 : 6 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "36 : 6 = 6, want 6 × 6 = 36."
            }
          ]
        }
      ]
    },
    {
      "id": "engineeringTable",
      "anchorId": "engineeringTable",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "engineering-table-slot-1",
          "variants": [
            {
              "id": "engineering-table-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 59,
              "prompt": "Sven meet bij de modeldelen eerst 35 cm en daarna nog 24 cm. Hoeveel cm is dat samen?",
              "hintMinnie": "Kijk welke twee aantallen je samenneemt.",
              "hintMoose": "Tel eerst de tientallen en daarna de lossen.",
              "explanation": "35 + 24 = 59."
            },
            {
              "id": "engineering-table-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 10,
              "prompt": "Leonardo verdeelt 70 stukjes bij de modeldelen in 7 gelijke groepen. Hoeveel stukjes krijgt elke groep?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "70 : 7 = 10, want 7 × 10 = 70.",
              "choices": [
                9,
                10,
                11,
                12
              ]
            }
          ]
        },
        {
          "id": "engineering-table-slot-2",
          "variants": [
            {
              "id": "engineering-table-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 3,
              "prompt": "Bij de modeldelen maakt Sven van 24 meetkaartjes 8 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "24 : 8 = 3, want 8 × 3 = 24."
            },
            {
              "id": "engineering-table-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 9,
              "prompt": "3 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "3 × 3 = 9.",
              "choices": [
                6,
                9,
                12,
                15
              ]
            }
          ]
        },
        {
          "id": "engineering-table-slot-3",
          "variants": [
            {
              "id": "engineering-table-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 12,
              "prompt": "4 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "4 × 3 = 12."
            },
            {
              "id": "engineering-table-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 7,
              "prompt": "63 : 9 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "63 : 9 = 7, want 9 × 7 = 63.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            }
          ]
        },
        {
          "id": "engineering-table-slot-4",
          "variants": [
            {
              "id": "engineering-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 36,
              "prompt": "Bij de modeldelen liggen 4 rijen met 9 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 4 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "4 × 9 = 36.",
              "choices": [
                32,
                36,
                40,
                44
              ]
            },
            {
              "id": "engineering-table-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 10,
              "prompt": "Leonardo tekent 5 vakken met 2 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 5 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "5 × 2 = 10."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "opticsTable",
      "type": "challenge",
      "name": "Optiektafel",
      "x": 458,
      "y": 407,
      "radius": 52,
      "approach": {
        "x": 520,
        "y": 548
      }
    },
    {
      "id": "mechanicalModel",
      "type": "challenge",
      "name": "Mechanisch model",
      "x": 1432,
      "y": 389,
      "radius": 74,
      "approach": {
        "x": 1360,
        "y": 548
      }
    },
    {
      "id": "centralCodex",
      "type": "challenge",
      "name": "Centrale codex",
      "x": 1068,
      "y": 418,
      "radius": 58,
      "approach": {
        "x": 1029,
        "y": 556
      }
    },
    {
      "id": "engineeringTable",
      "type": "challenge",
      "name": "Bouwtafel",
      "x": 1702,
      "y": 422,
      "radius": 48,
      "approach": {
        "x": 1660,
        "y": 573
      }
    },
    {
      "id": "procenoGate",
      "type": "exit",
      "name": "Poort naar Proceno",
      "x": 1942,
      "y": 446,
      "radius": 70,
      "approach": {
        "x": 1866,
        "y": 565
      },
      "targetLevel": "LVL-0022",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "procenoGate",
      "targetLevel": "LVL-0022",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [
    {
      "id": "SwiftRome1",
      "label": "SwiftRome1",
      "frameA": "assets/ambient/flybys/common-swift/common-swift-a.png",
      "frameB": "assets/ambient/flybys/common-swift/common-swift-b.png",
      "sound": "assets/ambient/flybys/common-swift/common-swift-call.mp3",
      "path": [
        {
          "x": 629,
          "y": 138
        },
        {
          "x": 957,
          "y": 142
        },
        {
          "x": 1403,
          "y": -13
        }
      ],
      "scale": 0.05,
      "speed": 420,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 6000,
      "intervalMaxMs": 20000,
      "syncKey": "SwiftGroupRome",
      "startDelayMs": 0,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8
    },
    {
      "id": "SwiftRome1-copy",
      "label": "SwiftRome1 kopie",
      "frameA": "assets/ambient/flybys/common-swift/common-swift-a.png",
      "frameB": "assets/ambient/flybys/common-swift/common-swift-b.png",
      "sound": "assets/ambient/flybys/common-swift/common-swift-call.mp3",
      "path": [
        {
          "x": 630,
          "y": 127
        },
        {
          "x": 955,
          "y": 123
        },
        {
          "x": 1530,
          "y": -15
        }
      ],
      "scale": 0.05,
      "speed": 420,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 6000,
      "intervalMaxMs": 20000,
      "syncKey": "SwiftGroupRome",
      "startDelayMs": 0,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8
    },
    {
      "id": "SwiftRome1-copy-copy",
      "label": "SwiftRome1 kopie kopie",
      "frameA": "assets/ambient/flybys/common-swift/common-swift-a.png",
      "frameB": "assets/ambient/flybys/common-swift/common-swift-b.png",
      "sound": "assets/ambient/flybys/common-swift/common-swift-call.mp3",
      "path": [
        {
          "x": 630,
          "y": 127
        },
        {
          "x": 955,
          "y": 123
        },
        {
          "x": 1530,
          "y": -15
        }
      ],
      "scale": 0.04,
      "speed": 420,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 6000,
      "intervalMaxMs": 20000,
      "syncKey": "SwiftGroupRome",
      "startDelayMs": 50,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8
    }
  ],
  "description": "Rome: Observatie en licht.",
  "storageKey": "lvl-0021-progress",
  "progressKey": "lvl-0021-completed",
  "challengeArt": "Levels/LVL-0021/assets/leonardo-da-vinci.png",
  "spiritName": "Leonardo da Vinci",
  "walkPath": [
    {
      "id": "start",
      "x": 309,
      "y": 565
    },
    {
      "id": "opticsTable-approach",
      "x": 520,
      "y": 548,
      "role": "approach"
    },
    {
      "id": "centralCodex-approach",
      "x": 1029,
      "y": 556,
      "role": "approach"
    },
    {
      "id": "mechanicalModel-approach",
      "x": 1360,
      "y": 548,
      "role": "approach"
    },
    {
      "id": "engineeringTable-approach",
      "x": 1660,
      "y": 573,
      "role": "approach"
    },
    {
      "id": "procenoGate-approach",
      "x": 1866,
      "y": 565,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "opticsTable",
      "type": "rune",
      "center": {
        "x": 458,
        "y": 407
      },
      "radius": 52,
      "approachNode": "opticsTable-approach",
      "label": "Optiektafel"
    },
    {
      "id": "mechanicalModel",
      "type": "rune",
      "center": {
        "x": 1432,
        "y": 389
      },
      "radius": 74,
      "approachNode": "mechanicalModel-approach",
      "label": "Mechanisch model"
    },
    {
      "id": "centralCodex",
      "type": "rune",
      "center": {
        "x": 1068,
        "y": 418
      },
      "radius": 58,
      "approachNode": "centralCodex-approach",
      "label": "Centrale codex"
    },
    {
      "id": "engineeringTable",
      "type": "rune",
      "center": {
        "x": 1702,
        "y": 422
      },
      "radius": 48,
      "approachNode": "engineeringTable-approach",
      "label": "Bouwtafel"
    },
    {
      "id": "procenoGate",
      "type": "exit",
      "center": {
        "x": 1942,
        "y": 446
      },
      "radius": 70,
      "approachNode": "procenoGate-approach",
      "label": "Poort naar Proceno"
    }
  ],
  "hotspots": [
    {
      "id": "procenoGate",
      "objectId": "procenoGate",
      "type": "exit",
      "name": "Poort naar Proceno",
      "defaultAction": "activate",
      "prompt": "Ga naar de volgende Leonardo-plek.",
      "solved": "De volgende plek is open."
    }
  ],
  "runes": [
    {
      "id": "opticsTable",
      "objectId": "opticsTable",
      "name": "Optiektafel",
      "shortName": "Optiektafel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar optiektafel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "opticsTable"
    },
    {
      "id": "mechanicalModel",
      "objectId": "mechanicalModel",
      "name": "Mechanisch model",
      "shortName": "Mechanisch model",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar mechanisch model.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "mechanicalModel"
    },
    {
      "id": "centralCodex",
      "objectId": "centralCodex",
      "name": "Centrale codex",
      "shortName": "Centrale codex",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar centrale codex.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "centralCodex"
    },
    {
      "id": "engineeringTable",
      "objectId": "engineeringTable",
      "name": "Bouwtafel",
      "shortName": "Bouwtafel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar bouwtafel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "engineeringTable"
    }
  ],
  "areas": [
    {
      "id": "opticsTable",
      "name": "Optiektafel",
      "description": "Onderzoek optiektafel met Leonardo."
    },
    {
      "id": "mechanicalModel",
      "name": "Mechanisch model",
      "description": "Onderzoek mechanisch model met Leonardo."
    },
    {
      "id": "centralCodex",
      "name": "Centrale codex",
      "description": "Onderzoek centrale codex met Leonardo."
    },
    {
      "id": "engineeringTable",
      "name": "Bouwtafel",
      "description": "Onderzoek bouwtafel met Leonardo."
    }
  ],
  "companion": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0021/assets/leonardo-da-vinci.png"
  },
  "reward": {
    "title": "Rome afgerond",
    "line": "De volgende Italiaanse werkplaats is bereikbaar.",
    "art": "Levels/LVL-0021/assets/leonardo-da-vinci.png",
    "badge": "Werkplaats afgerond",
    "nextLevelId": "LVL-0022",
    "nextLabel": "Ga verder"
  },
  "spiritLines": {
    "welcome": "Rome laat licht en schaduw overal sporen achter. Kijk rustig rond.",
    "moving": "Een eerste ontdekking begint vaak met goed kijken.",
    "allRunes": "De schaduwen wijzen de route vrij.",
    "reward": "Mooi gezien. Je eerste vondsten staan stevig."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Zie je hoe het licht langs de stenen glijdt, Sven?"
    },
    "moving": {
      "speaker": "moose",
      "text": "Rustig speuren. Eerst de plek lezen, dan pas verder."
    },
    "allRunes": {
      "speaker": "minnie",
      "text": "De schaduwplekjes geven ons nu doorgang."
    },
    "reward": {
      "speaker": "moose",
      "text": "Net begin. De route klopt."
    }
  },
  "levelSemantics": {
    "setting": "Rome, licht en observatie",
    "mood": "warm, onderzoekend en avontuurlijk",
    "companionFocus": {
      "minnie": "vriendelijke taalhint en aanmoediging",
      "moose": "rustige rekenstrategie en controle"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0021-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Rome glinstert alsof de muren geheime tekeningen bewaren."
    },
    {
      "id": "LVL-0021-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Let op waar het licht valt. Schaduw is ook informatie."
    },
    {
      "id": "LVL-0021-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Ha, dat vonkje snapte jij sneller dan de zon verschoof."
    },
    {
      "id": "LVL-0021-exit",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alle tekens staan goed. Door naar de volgende poort."
    },
    {
      "id": "LVL-0021-exit-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De Romeinse poort wacht nog. Eerst missen we hier nog een ontdekking."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0021/assets/rome.png",
    "badge": "6 plekken",
    "detail": "Rome, licht en observatie"
  },
  "intro": [
    "Observatie en licht. Leonardo laat Sven onderzoeken wat deze plek bijzonder maakt.",
    "Minnie zoekt de kleine glimmers; Moose houdt de route in de gaten."
  ],
  "exitHotspotId": "procenoGate",
  "theme": "Observatie en licht",
  "progressLabelPlural": "opdrachten"
};
