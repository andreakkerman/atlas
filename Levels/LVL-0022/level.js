window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0022"] = {
  "id": "LVL-0022",
  "title": "Proceno",
  "subtitle": "Meten en bouwen",
  "backgroundSize": {
    "width": 2173,
    "height": 724
  },
  "world": {
    "width": 2173,
    "height": 724,
    "aspectRatio": 3.001381215469613,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0022/assets/proceno.png"
  },
  "player": {
    "start": {
      "x": 101,
      "y": 637
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 110,
    "maxX": 2070,
    "minY": 515,
    "maxY": 610
  },
  "challengeLabel": "Bouwproef",
  "challengeCharacter": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0022/assets/leonardo-da-vinci.png",
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
      "id": "measuringTable",
      "anchorId": "measuringTable",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "measuring-table-slot-1",
          "variants": [
            {
              "id": "measuring-table-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 10,
              "prompt": "20 : 2 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "20 : 2 = 10, want 2 × 10 = 20."
            },
            {
              "id": "measuring-table-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 63,
              "prompt": "Leonardo heeft 90 gram materiaal bij de latten en gebruikt 27 gram. Hoeveel gram blijft over?",
              "hintMinnie": "Kijk wat er van het eerste aantal afgaat.",
              "hintMoose": "Trek eerst de tientallen af en daarna de lossen.",
              "explanation": "90 - 27 = 63."
            }
          ]
        },
        {
          "id": "measuring-table-slot-2",
          "variants": [
            {
              "id": "measuring-table-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 10,
              "prompt": "Bij de latten maakt Sven van 30 meetkaartjes 3 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "30 : 3 = 10, want 3 × 10 = 30.",
              "choices": [
                9,
                10,
                11,
                12
              ]
            },
            {
              "id": "measuring-table-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 3,
              "prompt": "Bij de latten verdeelt Sven 12 onderdelen over 4 gelijke bakken. Hoeveel onderdelen komen in elke bak?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "12 : 4 = 3, want 4 × 3 = 12."
            }
          ]
        },
        {
          "id": "measuring-table-slot-3",
          "variants": [
            {
              "id": "measuring-table-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 15,
              "prompt": "5 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "5 × 3 = 15.",
              "choices": [
                10,
                15,
                20,
                25
              ]
            },
            {
              "id": "measuring-table-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 24,
              "prompt": "6 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 4 = 24."
            }
          ]
        },
        {
          "id": "measuring-table-slot-4",
          "variants": [
            {
              "id": "measuring-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 4,
              "prompt": "20 : 5 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "20 : 5 = 4, want 5 × 4 = 20.",
              "choices": [
                3,
                4,
                5,
                6
              ]
            },
            {
              "id": "measuring-table-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 100,
              "prompt": "Bij de latten liggen 10 rijen met 10 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 10 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "10 × 10 = 100.",
              "choices": [
                90,
                100,
                110,
                120
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "bridgeModel",
      "anchorId": "bridgeModel",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "bridge-model-slot-1",
          "variants": [
            {
              "id": "bridge-model-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 42,
              "prompt": "Leonardo tekent 6 vakken met 7 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 6 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "6 × 7 = 42."
            },
            {
              "id": "bridge-model-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 3,
              "prompt": "30 : 10 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "30 : 10 = 3, want 10 × 3 = 30."
            }
          ]
        },
        {
          "id": "bridge-model-slot-2",
          "variants": [
            {
              "id": "bridge-model-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 43,
              "prompt": "De proef bij de brugliggers duurt eerst 18 minuten en daarna nog 25 minuten. Hoeveel minuten duurt het samen?",
              "hintMinnie": "Kijk welke twee aantallen je samenneemt.",
              "hintMoose": "Tel eerst de tientallen en daarna de lossen.",
              "explanation": "18 + 25 = 43."
            },
            {
              "id": "bridge-model-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 8,
              "prompt": "Bij de brugliggers verdeelt Sven 48 onderdelen over 6 gelijke bakken. Hoeveel onderdelen komen in elke bak?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "48 : 6 = 8, want 6 × 8 = 48.",
              "choices": [
                7,
                8,
                9,
                10
              ]
            }
          ]
        },
        {
          "id": "bridge-model-slot-3",
          "variants": [
            {
              "id": "bridge-model-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 10,
              "prompt": "Leonardo verdeelt 70 stukjes bij de brugliggers in 7 gelijke groepen. Hoeveel stukjes krijgt elke groep?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "70 : 7 = 10, want 7 × 10 = 70."
            },
            {
              "id": "bridge-model-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 77,
              "prompt": "7 × 11 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 11 = 77.",
              "choices": [
                70,
                77,
                84,
                91
              ]
            }
          ]
        },
        {
          "id": "bridge-model-slot-4",
          "variants": [
            {
              "id": "bridge-model-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 88,
              "prompt": "8 × 11 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 11 = 88."
            },
            {
              "id": "bridge-model-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 6,
              "prompt": "48 : 8 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "48 : 8 = 6, want 8 × 6 = 48.",
              "choices": [
                5,
                6,
                7,
                8
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "wellWinch",
      "anchorId": "wellWinch",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "well-winch-slot-1",
          "variants": [
            {
              "id": "well-winch-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 14,
              "prompt": "Bij de emmers liggen 7 rijen met 2 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 7 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "7 × 2 = 14.",
              "choices": [
                7,
                14,
                21,
                28
              ]
            },
            {
              "id": "well-winch-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 32,
              "prompt": "Leonardo tekent 8 vakken met 4 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 8 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "8 × 4 = 32."
            }
          ]
        },
        {
          "id": "well-winch-slot-2",
          "variants": [
            {
              "id": "well-winch-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 6,
              "prompt": "54 : 9 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "54 : 9 = 6, want 9 × 6 = 54."
            },
            {
              "id": "well-winch-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 34,
              "prompt": "Bij de emmers ligt 72 cm lat en Sven zaagt 38 cm af. Hoeveel cm blijft over?",
              "hintMinnie": "Kijk wat er van het eerste aantal afgaat.",
              "hintMoose": "Trek eerst de tientallen af en daarna de lossen.",
              "explanation": "72 - 38 = 34."
            }
          ]
        },
        {
          "id": "well-winch-slot-3",
          "variants": [
            {
              "id": "well-winch-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 8,
              "prompt": "Leonardo verdeelt 16 stukjes bij de emmers in 2 gelijke groepen. Hoeveel stukjes krijgt elke groep?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "16 : 2 = 8, want 2 × 8 = 16.",
              "choices": [
                7,
                8,
                9,
                10
              ]
            },
            {
              "id": "well-winch-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 10,
              "prompt": "Bij de emmers maakt Sven van 30 meetkaartjes 3 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "30 : 3 = 10, want 3 × 10 = 30."
            }
          ]
        },
        {
          "id": "well-winch-slot-4",
          "variants": [
            {
              "id": "well-winch-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 18,
              "prompt": "9 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 2 = 18.",
              "choices": [
                9,
                18,
                27,
                36
              ]
            },
            {
              "id": "well-winch-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 8,
              "prompt": "2 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 4 = 8."
            }
          ]
        }
      ]
    },
    {
      "id": "gateMechanism",
      "anchorId": "gateMechanism",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "gate-mechanism-slot-1",
          "variants": [
            {
              "id": "gate-mechanism-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 2,
              "prompt": "8 : 4 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "8 : 4 = 2, want 4 × 2 = 8.",
              "choices": [
                1,
                2,
                3,
                4
              ]
            },
            {
              "id": "gate-mechanism-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 72,
              "prompt": "Bij de kettingen liggen 9 rijen met 8 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 9 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "9 × 8 = 72.",
              "choices": [
                63,
                72,
                81,
                90
              ]
            }
          ]
        },
        {
          "id": "gate-mechanism-slot-2",
          "variants": [
            {
              "id": "gate-mechanism-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 4,
              "prompt": "Leonardo tekent 2 vakken met 2 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 2 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "2 × 2 = 4."
            },
            {
              "id": "gate-mechanism-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 5,
              "prompt": "25 : 5 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "25 : 5 = 5, want 5 × 5 = 25."
            }
          ]
        },
        {
          "id": "gate-mechanism-slot-3",
          "variants": [
            {
              "id": "gate-mechanism-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 75,
              "prompt": "Leonardo telt bij de kettingen 46 markeringen en voegt er 29 toe. Hoeveel markeringen zijn er samen?",
              "hintMinnie": "Kijk welke twee aantallen je samenneemt.",
              "hintMoose": "Tel eerst de tientallen en daarna de lossen.",
              "explanation": "46 + 29 = 75."
            },
            {
              "id": "gate-mechanism-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 7,
              "prompt": "Bij de kettingen maakt Sven van 42 meetkaartjes 6 gelijke stapels. Hoeveel kaartjes liggen op elke stapel?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "42 : 6 = 7, want 6 × 7 = 42.",
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
          "id": "gate-mechanism-slot-4",
          "variants": [
            {
              "id": "gate-mechanism-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 9,
              "prompt": "Bij de kettingen verdeelt Sven 63 onderdelen over 7 gelijke bakken. Hoeveel onderdelen komen in elke bak?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "63 : 7 = 9, want 7 × 9 = 63."
            },
            {
              "id": "gate-mechanism-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 120,
              "prompt": "10 × 12 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "10 × 12 = 120.",
              "choices": [
                110,
                120,
                130,
                140
              ]
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "measuringTable",
      "type": "challenge",
      "name": "Meettafel",
      "x": 391,
      "y": 481,
      "radius": 51,
      "approach": {
        "x": 369,
        "y": 634
      }
    },
    {
      "id": "bridgeModel",
      "type": "challenge",
      "name": "Brugmodel",
      "x": 729,
      "y": 472,
      "radius": 67,
      "approach": {
        "x": 711,
        "y": 606
      }
    },
    {
      "id": "wellWinch",
      "type": "challenge",
      "name": "Put en lier",
      "x": 1060,
      "y": 417,
      "radius": 67,
      "approach": {
        "x": 1084,
        "y": 601
      }
    },
    {
      "id": "gateMechanism",
      "type": "challenge",
      "name": "Poortmechanisme",
      "x": 1635,
      "y": 440,
      "radius": 53,
      "approach": {
        "x": 1576,
        "y": 633
      }
    },
    {
      "id": "umbriaGate",
      "type": "exit",
      "name": "Pad naar Umbrië",
      "x": 1994,
      "y": 506,
      "radius": 108,
      "approach": {
        "x": 1948,
        "y": 639
      },
      "targetLevel": "LVL-0023",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "umbriaGate",
      "targetLevel": "LVL-0023",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [
    {
      "id": "SwiftProceno1",
      "label": "SwiftProceno1",
      "frameA": "assets/ambient/flybys/common-swift/common-swift-a.png",
      "frameB": "assets/ambient/flybys/common-swift/common-swift-b.png",
      "sound": "assets/ambient/flybys/common-swift/common-swift-call.mp3",
      "path": [
        {
          "x": 340,
          "y": 136
        },
        {
          "x": 909,
          "y": 56
        },
        {
          "x": 1666,
          "y": -12
        }
      ],
      "scale": 0.05,
      "speed": 420,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 20000,
      "syncKey": "SwiftGroupProceno",
      "startDelayMs": 0,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8
    },
    {
      "id": "SwiftProceno1-copy",
      "label": "SwiftProceno1 kopie",
      "frameA": "assets/ambient/flybys/common-swift/common-swift-a.png",
      "frameB": "assets/ambient/flybys/common-swift/common-swift-b.png",
      "sound": "assets/ambient/flybys/common-swift/common-swift-call.mp3",
      "path": [
        {
          "x": 337,
          "y": 120
        },
        {
          "x": 913,
          "y": 88
        },
        {
          "x": 1714,
          "y": -15
        }
      ],
      "scale": 0.04,
      "speed": 420,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 20000,
      "syncKey": "SwiftGroupProceno",
      "startDelayMs": 50,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8
    },
    {
      "id": "SwiftProceno1-copy-copy",
      "label": "SwiftProceno1 kopie kopie",
      "frameA": "assets/ambient/flybys/common-swift/common-swift-a.png",
      "frameB": "assets/ambient/flybys/common-swift/common-swift-b.png",
      "sound": "assets/ambient/flybys/common-swift/common-swift-call.mp3",
      "path": [
        {
          "x": 339,
          "y": 103
        },
        {
          "x": 909,
          "y": 52
        },
        {
          "x": 1714,
          "y": -15
        }
      ],
      "scale": 0.04,
      "speed": 420,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 20000,
      "syncKey": "SwiftGroupProceno",
      "startDelayMs": 50,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8
    }
  ],
  "description": "Proceno: Meten en bouwen.",
  "storageKey": "lvl-0022-progress",
  "progressKey": "lvl-0022-completed",
  "challengeArt": "Levels/LVL-0022/assets/leonardo-da-vinci.png",
  "spiritName": "Leonardo da Vinci",
  "walkPath": [
    {
      "id": "start",
      "x": 101,
      "y": 637
    },
    {
      "id": "measuringTable-approach",
      "x": 369,
      "y": 634,
      "role": "approach"
    },
    {
      "id": "bridgeModel-approach",
      "x": 711,
      "y": 606,
      "role": "approach"
    },
    {
      "id": "wellWinch-approach",
      "x": 1084,
      "y": 601,
      "role": "approach"
    },
    {
      "id": "gateMechanism-approach",
      "x": 1576,
      "y": 633,
      "role": "approach"
    },
    {
      "id": "umbriaGate-approach",
      "x": 1948,
      "y": 639,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "measuringTable",
      "type": "rune",
      "center": {
        "x": 391,
        "y": 481
      },
      "radius": 51,
      "approachNode": "measuringTable-approach",
      "label": "Meettafel"
    },
    {
      "id": "bridgeModel",
      "type": "rune",
      "center": {
        "x": 729,
        "y": 472
      },
      "radius": 67,
      "approachNode": "bridgeModel-approach",
      "label": "Brugmodel"
    },
    {
      "id": "wellWinch",
      "type": "rune",
      "center": {
        "x": 1060,
        "y": 417
      },
      "radius": 67,
      "approachNode": "wellWinch-approach",
      "label": "Put en lier"
    },
    {
      "id": "gateMechanism",
      "type": "rune",
      "center": {
        "x": 1635,
        "y": 440
      },
      "radius": 53,
      "approachNode": "gateMechanism-approach",
      "label": "Poortmechanisme"
    },
    {
      "id": "umbriaGate",
      "type": "exit",
      "center": {
        "x": 1994,
        "y": 506
      },
      "radius": 108,
      "approachNode": "umbriaGate-approach",
      "label": "Pad naar Umbrië"
    }
  ],
  "hotspots": [
    {
      "id": "umbriaGate",
      "objectId": "umbriaGate",
      "type": "exit",
      "name": "Pad naar Umbrië",
      "defaultAction": "activate",
      "prompt": "Ga naar de volgende Leonardo-plek.",
      "solved": "De volgende plek is open."
    }
  ],
  "runes": [
    {
      "id": "measuringTable",
      "objectId": "measuringTable",
      "name": "Meettafel",
      "shortName": "Meettafel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar meettafel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "measuringTable"
    },
    {
      "id": "bridgeModel",
      "objectId": "bridgeModel",
      "name": "Brugmodel",
      "shortName": "Brugmodel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar brugmodel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "bridgeModel"
    },
    {
      "id": "wellWinch",
      "objectId": "wellWinch",
      "name": "Put en lier",
      "shortName": "Put en lier",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar put en lier.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "wellWinch"
    },
    {
      "id": "gateMechanism",
      "objectId": "gateMechanism",
      "name": "Poortmechanisme",
      "shortName": "Poortmechanisme",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar poortmechanisme.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "gateMechanism"
    }
  ],
  "areas": [
    {
      "id": "measuringTable",
      "name": "Meettafel",
      "description": "Onderzoek meettafel met Leonardo."
    },
    {
      "id": "bridgeModel",
      "name": "Brugmodel",
      "description": "Onderzoek brugmodel met Leonardo."
    },
    {
      "id": "wellWinch",
      "name": "Put en lier",
      "description": "Onderzoek put en lier met Leonardo."
    },
    {
      "id": "gateMechanism",
      "name": "Poortmechanisme",
      "description": "Onderzoek poortmechanisme met Leonardo."
    }
  ],
  "companion": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0022/assets/leonardo-da-vinci.png"
  },
  "reward": {
    "title": "Proceno afgerond",
    "line": "De volgende Italiaanse werkplaats is bereikbaar.",
    "art": "Levels/LVL-0022/assets/leonardo-da-vinci.png",
    "badge": "Werkplaats afgerond",
    "nextLevelId": "LVL-0023",
    "nextLabel": "Ga verder"
  },
  "spiritLines": {
    "welcome": "Welkom in mijn werkplaats. Kijk rustig, meet precies en probeer opnieuw.",
    "moving": "Ik loop met je mee in gedachten: observeren, meten, maken.",
    "allRunes": "Alle proeven zijn opgelost. De route is vrij.",
    "reward": "Prachtig werk. Je hebt als een jonge uitvinder gedacht."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Minnie en Moose blijven bij Sven voor hints."
    },
    "moving": {
      "speaker": "moose",
      "text": "Stap voor stap. Eerst kijken, dan rekenen."
    },
    "allRunes": {
      "speaker": "minnie",
      "text": "Alle Leonardo-proeven zijn klaar."
    },
    "reward": {
      "speaker": "moose",
      "text": "Dat is netjes ontworpen."
    }
  },
  "levelSemantics": {
    "setting": "Proceno, meten en bouwen",
    "mood": "warm, onderzoekend en avontuurlijk",
    "companionFocus": {
      "minnie": "vriendelijke taalhint en aanmoediging",
      "moose": "rustige rekenstrategie en controle"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0022-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Nieuwe plek, nieuwe uitvindersogen."
    },
    {
      "id": "LVL-0022-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Kijk naar de vorm, maat en bedoeling."
    },
    {
      "id": "LVL-0022-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Mooi, weer een idee scherper."
    },
    {
      "id": "LVL-0022-exit",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alle proeven kloppen. De route is vrij."
    },
    {
      "id": "LVL-0022-exit-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De doorgang blijft nog dicht. Los eerst alle opdrachten in deze werkplaats op."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0022/assets/proceno.png",
    "badge": "Verbonden gebied",
    "detail": "Proceno, meten en bouwen"
  },
  "intro": [
    "Meten en bouwen. Leonardo laat Sven onderzoeken wat deze plek bijzonder maakt.",
    "Minnie en Moose helpen met hints als een opdracht lastig wordt."
  ],
  "exitHotspotId": "umbriaGate",
  "theme": "Meten en bouwen",
  "progressLabelPlural": "opdrachten"
};
