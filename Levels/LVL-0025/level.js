window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0025"] = {
  "id": "LVL-0025",
  "title": "Florence",
  "subtitle": "Perspectief en kleur",
  "backgroundSize": {
    "width": 2171,
    "height": 724
  },
  "world": {
    "width": 2171,
    "height": 724,
    "aspectRatio": 2.998618784530387,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0025/assets/florence.png"
  },
  "player": {
    "start": {
      "x": 199,
      "y": 593
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 110,
    "maxX": 2065,
    "minY": 540,
    "maxY": 625
  },
  "challengeLabel": "Atelierproef",
  "challengeCharacter": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0025/assets/leonardo-da-vinci.png",
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
      "id": "perspectiveFrame",
      "anchorId": "perspectiveFrame",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "perspective-frame-slot-1",
          "variants": [
            {
              "id": "perspective-frame-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 66,
              "prompt": "6 × 11 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 11 = 66.",
              "choices": [
                60,
                66,
                72,
                78
              ]
            },
            {
              "id": "perspective-frame-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 84,
              "prompt": "7 × 12 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 12 = 84."
            }
          ]
        },
        {
          "id": "perspective-frame-slot-2",
          "variants": [
            {
              "id": "perspective-frame-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 96,
              "prompt": "8 × 12 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 12 = 96.",
              "choices": [
                88,
                96,
                104,
                112
              ]
            },
            {
              "id": "perspective-frame-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 117,
              "prompt": "9 × 13 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 13 = 117."
            }
          ]
        },
        {
          "id": "perspective-frame-slot-3",
          "variants": [
            {
              "id": "perspective-frame-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 26,
              "prompt": "2 × 13 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 13 = 26.",
              "choices": [
                24,
                26,
                28,
                30
              ]
            },
            {
              "id": "perspective-frame-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 20,
              "prompt": "10 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "10 × 2 = 20."
            }
          ]
        },
        {
          "id": "perspective-frame-slot-4",
          "variants": [
            {
              "id": "perspective-frame-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 6,
              "prompt": "3 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "3 × 2 = 6.",
              "choices": [
                3,
                6,
                9,
                12
              ]
            },
            {
              "id": "perspective-frame-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 16,
              "prompt": "4 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "4 × 4 = 16."
            }
          ]
        }
      ]
    },
    {
      "id": "geometricFloor",
      "anchorId": "geometricFloor",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "geometric-floor-slot-1",
          "variants": [
            {
              "id": "geometric-floor-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 20,
              "prompt": "5 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "5 × 4 = 20.",
              "choices": [
                15,
                20,
                25,
                30
              ]
            },
            {
              "id": "geometric-floor-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 30,
              "prompt": "6 × 5 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 5 = 30."
            }
          ]
        },
        {
          "id": "geometric-floor-slot-2",
          "variants": [
            {
              "id": "geometric-floor-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 35,
              "prompt": "7 × 5 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 5 = 35.",
              "choices": [
                28,
                35,
                42,
                49
              ]
            },
            {
              "id": "geometric-floor-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 40,
              "prompt": "8 × 5 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 5 = 40."
            }
          ]
        },
        {
          "id": "geometric-floor-slot-3",
          "variants": [
            {
              "id": "geometric-floor-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 45,
              "prompt": "9 × 5 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 5 = 45.",
              "choices": [
                36,
                45,
                54,
                63
              ]
            },
            {
              "id": "geometric-floor-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 12,
              "prompt": "2 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 6 = 12."
            }
          ]
        },
        {
          "id": "geometric-floor-slot-4",
          "variants": [
            {
              "id": "geometric-floor-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 60,
              "prompt": "10 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "10 × 6 = 60.",
              "choices": [
                50,
                60,
                70,
                80
              ]
            },
            {
              "id": "geometric-floor-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 21,
              "prompt": "3 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "3 × 7 = 21."
            }
          ]
        }
      ]
    },
    {
      "id": "pigmentTable",
      "anchorId": "pigmentTable",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "pigment-table-slot-1",
          "variants": [
            {
              "id": "pigment-table-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 8,
              "prompt": "4 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "4 × 2 = 8.",
              "choices": [
                4,
                8,
                12,
                16
              ]
            },
            {
              "id": "pigment-table-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 25,
              "prompt": "5 × 5 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "5 × 5 = 25."
            }
          ]
        },
        {
          "id": "pigment-table-slot-2",
          "variants": [
            {
              "id": "pigment-table-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 18,
              "prompt": "6 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 3 = 18.",
              "choices": [
                12,
                18,
                24,
                30
              ]
            },
            {
              "id": "pigment-table-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 42,
              "prompt": "7 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 6 = 42."
            }
          ]
        },
        {
          "id": "pigment-table-slot-3",
          "variants": [
            {
              "id": "pigment-table-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 32,
              "prompt": "8 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 4 = 32.",
              "choices": [
                24,
                32,
                40,
                48
              ]
            },
            {
              "id": "pigment-table-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 54,
              "prompt": "9 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 6 = 54."
            }
          ]
        },
        {
          "id": "pigment-table-slot-4",
          "variants": [
            {
              "id": "pigment-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 10,
              "prompt": "2 × 5 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 5 = 10.",
              "choices": [
                8,
                10,
                12,
                14
              ]
            },
            {
              "id": "pigment-table-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 70,
              "prompt": "10 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "10 × 7 = 70."
            }
          ]
        }
      ]
    },
    {
      "id": "pulleyPanel",
      "anchorId": "pulleyPanel",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "pulley-panel-slot-1",
          "variants": [
            {
              "id": "pulley-panel-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf over elf",
              "choices": [
                "Vijf over elf",
                "Vijf over twaalf",
                "Tien voor half twaalf",
                "Vijf over half twaalf"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 5
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over elf."
            },
            {
              "id": "pulley-panel-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien voor half twee",
              "choices": [
                "Tien voor half twee",
                "Tien voor half drie",
                "Vijf over half twee",
                "Tien voor twee"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 20
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor half twee."
            }
          ]
        },
        {
          "id": "pulley-panel-slot-2",
          "variants": [
            {
              "id": "pulley-panel-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf over half vijf",
              "choices": [
                "Vijf over half vijf",
                "Vijf over half zes",
                "Tien voor vijf",
                "Vijf over vier"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 4,
                "minute": 35
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over half vijf."
            },
            {
              "id": "pulley-panel-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien voor zeven",
              "choices": [
                "Tien voor zeven",
                "Tien voor acht",
                "Vijf over zes",
                "Tien voor half zeven"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 50
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor zeven."
            }
          ]
        },
        {
          "id": "pulley-panel-slot-3",
          "variants": [
            {
              "id": "pulley-panel-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien over acht",
              "choices": [
                "Tien over acht",
                "Tien over negen",
                "Vijf voor half negen",
                "Tien over half negen"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 10
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien over acht."
            },
            {
              "id": "pulley-panel-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf voor half elf",
              "choices": [
                "Vijf voor half elf",
                "Vijf voor half twaalf",
                "Tien over half elf",
                "Vijf voor elf"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 25
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf voor half elf."
            }
          ]
        },
        {
          "id": "pulley-panel-slot-4",
          "variants": [
            {
              "id": "pulley-panel-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien over half een",
              "choices": [
                "Tien over half een",
                "Tien over half twee",
                "Vijf voor een",
                "Tien over twaalf"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 12,
                "minute": 40
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien over half een."
            },
            {
              "id": "pulley-panel-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf voor drie",
              "choices": [
                "Vijf voor drie",
                "Vijf voor vier",
                "Tien over twee",
                "Vijf voor half drie"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 55
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf voor drie."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "perspectiveFrame",
      "type": "challenge",
      "name": "Perspectiefraam",
      "x": 448,
      "y": 425,
      "radius": 88,
      "approach": {
        "x": 445,
        "y": 589
      }
    },
    {
      "id": "geometricFloor",
      "type": "challenge",
      "name": "Geometrische vloer",
      "x": 794,
      "y": 531,
      "radius": 48,
      "approach": {
        "x": 741,
        "y": 583
      }
    },
    {
      "id": "pigmentTable",
      "type": "challenge",
      "name": "Pigmenttafel",
      "x": 1092,
      "y": 475,
      "radius": 65,
      "approach": {
        "x": 1088,
        "y": 621
      }
    },
    {
      "id": "pulleyPanel",
      "type": "challenge",
      "name": "Katrolpaneel",
      "x": 1533,
      "y": 444,
      "radius": 69,
      "approach": {
        "x": 1513,
        "y": 608
      }
    },
    {
      "id": "vinciGate",
      "type": "exit",
      "name": "Deur naar Vinci",
      "x": 1966,
      "y": 491,
      "radius": 86,
      "approach": {
        "x": 1971,
        "y": 598
      },
      "targetLevel": "LVL-0026",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "vinciGate",
      "targetLevel": "LVL-0026",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Florence: Perspectief en kleur.",
  "storageKey": "lvl-0025-progress",
  "progressKey": "lvl-0025-completed",
  "challengeArt": "Levels/LVL-0025/assets/leonardo-da-vinci.png",
  "spiritName": "Leonardo da Vinci",
  "walkPath": [
    {
      "id": "start",
      "x": 199,
      "y": 593
    },
    {
      "id": "perspectiveFrame-approach",
      "x": 445,
      "y": 589,
      "role": "approach"
    },
    {
      "id": "geometricFloor-approach",
      "x": 741,
      "y": 583,
      "role": "approach"
    },
    {
      "id": "pigmentTable-approach",
      "x": 1088,
      "y": 621,
      "role": "approach"
    },
    {
      "id": "pulleyPanel-approach",
      "x": 1513,
      "y": 608,
      "role": "approach"
    },
    {
      "id": "vinciGate-approach",
      "x": 1971,
      "y": 598,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "perspectiveFrame",
      "type": "rune",
      "center": {
        "x": 448,
        "y": 425
      },
      "radius": 88,
      "approachNode": "perspectiveFrame-approach",
      "label": "Perspectiefraam"
    },
    {
      "id": "geometricFloor",
      "type": "rune",
      "center": {
        "x": 794,
        "y": 531
      },
      "radius": 48,
      "approachNode": "geometricFloor-approach",
      "label": "Geometrische vloer"
    },
    {
      "id": "pigmentTable",
      "type": "rune",
      "center": {
        "x": 1092,
        "y": 475
      },
      "radius": 65,
      "approachNode": "pigmentTable-approach",
      "label": "Pigmenttafel"
    },
    {
      "id": "pulleyPanel",
      "type": "rune",
      "center": {
        "x": 1533,
        "y": 444
      },
      "radius": 69,
      "approachNode": "pulleyPanel-approach",
      "label": "Katrolpaneel"
    },
    {
      "id": "vinciGate",
      "type": "exit",
      "center": {
        "x": 1966,
        "y": 491
      },
      "radius": 86,
      "approachNode": "vinciGate-approach",
      "label": "Deur naar Vinci"
    }
  ],
  "hotspots": [
    {
      "id": "vinciGate",
      "objectId": "vinciGate",
      "type": "exit",
      "name": "Deur naar Vinci",
      "defaultAction": "activate",
      "prompt": "Ga naar de volgende Leonardo-plek.",
      "solved": "De volgende plek is open."
    }
  ],
  "runes": [
    {
      "id": "perspectiveFrame",
      "objectId": "perspectiveFrame",
      "name": "Perspectiefraam",
      "shortName": "Perspectiefraam",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar perspectiefraam.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "perspectiveFrame"
    },
    {
      "id": "geometricFloor",
      "objectId": "geometricFloor",
      "name": "Geometrische vloer",
      "shortName": "Geometrische vloer",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar geometrische vloer.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "geometricFloor"
    },
    {
      "id": "pigmentTable",
      "objectId": "pigmentTable",
      "name": "Pigmenttafel",
      "shortName": "Pigmenttafel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar pigmenttafel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "pigmentTable"
    },
    {
      "id": "pulleyPanel",
      "objectId": "pulleyPanel",
      "name": "Katrolpaneel",
      "shortName": "Katrolpaneel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar katrolpaneel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "pulleyPanel"
    }
  ],
  "areas": [
    {
      "id": "perspectiveFrame",
      "name": "Perspectiefraam",
      "description": "Onderzoek perspectiefraam met Leonardo."
    },
    {
      "id": "geometricFloor",
      "name": "Geometrische vloer",
      "description": "Onderzoek geometrische vloer met Leonardo."
    },
    {
      "id": "pigmentTable",
      "name": "Pigmenttafel",
      "description": "Onderzoek pigmenttafel met Leonardo."
    },
    {
      "id": "pulleyPanel",
      "name": "Katrolpaneel",
      "description": "Onderzoek katrolpaneel met Leonardo."
    }
  ],
  "companion": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0025/assets/leonardo-da-vinci.png"
  },
  "reward": {
    "title": "Florence afgerond",
    "line": "De volgende Italiaanse werkplaats is bereikbaar.",
    "art": "Levels/LVL-0025/assets/leonardo-da-vinci.png",
    "badge": "Werkplaats afgerond",
    "nextLevelId": "LVL-0026",
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
    "setting": "Florence, perspectief en kleur",
    "mood": "warm, onderzoekend en avontuurlijk",
    "companionFocus": {
      "minnie": "vriendelijke taalhint en aanmoediging",
      "moose": "rustige rekenstrategie en controle"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0025-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Nieuwe plek, nieuwe uitvindersogen."
    },
    {
      "id": "LVL-0025-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Kijk naar de vorm, maat en bedoeling."
    },
    {
      "id": "LVL-0025-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Mooi, weer een idee scherper."
    },
    {
      "id": "LVL-0025-exit",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alle proeven kloppen. De route is vrij."
    },
    {
      "id": "LVL-0025-exit-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De doorgang blijft nog dicht. Los eerst alle opdrachten in deze werkplaats op."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0025/assets/florence.png",
    "badge": "Verbonden gebied",
    "detail": "Florence, perspectief en kleur"
  },
  "intro": [
    "Perspectief en kleur. Leonardo laat Sven onderzoeken wat deze plek bijzonder maakt.",
    "Minnie en Moose helpen met hints als een opdracht lastig wordt."
  ],
  "exitHotspotId": "vinciGate",
  "theme": "Perspectief en kleur",
  "progressLabelPlural": "opdrachten"
};
