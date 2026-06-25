window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0026"] = {
  "id": "LVL-0026",
  "title": "Vinci",
  "subtitle": "De onvoltooide werkplaats",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0026/assets/vinci.png"
  },
  "player": {
    "start": {
      "x": 185,
      "y": 548
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 110,
    "maxX": 2070,
    "minY": 505,
    "maxY": 610
  },
  "challengeLabel": "Ontwerpproef",
  "challengeCharacter": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0026/assets/leonardo-da-vinci.png",
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
      "id": "waterModel",
      "anchorId": "waterModel",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "water-model-slot-1",
          "variants": [
            {
              "id": "water-model-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 18,
              "prompt": "3 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "3 × 6 = 18.",
              "choices": [
                15,
                18,
                21,
                24
              ]
            },
            {
              "id": "water-model-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 28,
              "prompt": "4 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "4 × 7 = 28."
            }
          ]
        },
        {
          "id": "water-model-slot-2",
          "variants": [
            {
              "id": "water-model-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 35,
              "prompt": "5 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "5 × 7 = 35.",
              "choices": [
                30,
                35,
                40,
                45
              ]
            },
            {
              "id": "water-model-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 54,
              "prompt": "6 × 9 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 9 = 54."
            }
          ]
        },
        {
          "id": "water-model-slot-3",
          "variants": [
            {
              "id": "water-model-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 56,
              "prompt": "7 × 8 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 8 = 56.",
              "choices": [
                49,
                56,
                63,
                70
              ]
            },
            {
              "id": "water-model-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 80,
              "prompt": "8 × 10 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 10 = 80."
            }
          ]
        },
        {
          "id": "water-model-slot-4",
          "variants": [
            {
              "id": "water-model-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 99,
              "prompt": "9 × 11 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 11 = 99.",
              "choices": [
                90,
                99,
                108,
                117
              ]
            },
            {
              "id": "water-model-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 20,
              "prompt": "2 × 10 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 10 = 20."
            }
          ]
        }
      ]
    },
    {
      "id": "opticalTable",
      "anchorId": "opticalTable",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "optical-table-slot-1",
          "variants": [
            {
              "id": "optical-table-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 36,
              "prompt": "6 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 6 = 36.",
              "choices": [
                30,
                36,
                42,
                48
              ]
            },
            {
              "id": "optical-table-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 49,
              "prompt": "7 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 7 = 49."
            }
          ]
        },
        {
          "id": "optical-table-slot-2",
          "variants": [
            {
              "id": "optical-table-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 56,
              "prompt": "8 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 7 = 56.",
              "choices": [
                48,
                56,
                64,
                72
              ]
            },
            {
              "id": "optical-table-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 72,
              "prompt": "9 × 8 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 8 = 72."
            }
          ]
        },
        {
          "id": "optical-table-slot-3",
          "variants": [
            {
              "id": "optical-table-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 60,
              "prompt": "6 × 10 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 10 = 60.",
              "choices": [
                54,
                60,
                66,
                72
              ]
            },
            {
              "id": "optical-table-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 70,
              "prompt": "7 × 10 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 10 = 70."
            }
          ]
        },
        {
          "id": "optical-table-slot-4",
          "variants": [
            {
              "id": "optical-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 104,
              "prompt": "8 × 13 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 13 = 104.",
              "choices": [
                96,
                104,
                112,
                120
              ]
            },
            {
              "id": "optical-table-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 108,
              "prompt": "9 × 12 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 12 = 108."
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
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vier uur",
              "choices": [
                "Vier uur",
                "Vijf uur",
                "Kwart over vier",
                "Half vijf"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 4,
                "minute": 0
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vier uur."
            },
            {
              "id": "central-codex-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart over zes",
              "choices": [
                "Kwart over zes",
                "Kwart over zeven",
                "Half zeven",
                "Kwart voor zeven"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 15
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart over zes."
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
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Half negen",
              "choices": [
                "Half negen",
                "Half tien",
                "Kwart voor negen",
                "Acht uur"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 30
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Half negen."
            },
            {
              "id": "central-codex-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart voor elf",
              "choices": [
                "Kwart voor elf",
                "Kwart voor twaalf",
                "Tien uur",
                "Kwart over tien"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 45
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart voor elf."
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
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien over twaalf",
              "choices": [
                "Tien over twaalf",
                "Tien over een",
                "Vijf voor half een",
                "Tien over half een"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 12,
                "minute": 10
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien over twaalf."
            },
            {
              "id": "central-codex-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf voor half drie",
              "choices": [
                "Vijf voor half drie",
                "Vijf voor half vier",
                "Tien over half drie",
                "Vijf voor drie"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 25
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf voor half drie."
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
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien over half zes",
              "choices": [
                "Tien over half zes",
                "Tien over half zeven",
                "Vijf voor zes",
                "Tien over vijf"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 40
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien over half zes."
            },
            {
              "id": "central-codex-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf voor acht",
              "choices": [
                "Vijf voor acht",
                "Vijf voor negen",
                "Tien over zeven",
                "Vijf voor half acht"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 55
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf voor acht."
            }
          ]
        }
      ]
    },
    {
      "id": "wingConstruction",
      "anchorId": "wingConstruction",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "wing-construction-slot-1",
          "variants": [
            {
              "id": "wing-construction-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 42,
              "prompt": "6 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 7 = 42.",
              "choices": [
                36,
                42,
                48,
                54
              ]
            },
            {
              "id": "wing-construction-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 14,
              "prompt": "7 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 2 = 14."
            }
          ]
        },
        {
          "id": "wing-construction-slot-2",
          "variants": [
            {
              "id": "wing-construction-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 24,
              "prompt": "8 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 3 = 24.",
              "choices": [
                16,
                24,
                32,
                40
              ]
            },
            {
              "id": "wing-construction-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 36,
              "prompt": "9 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 4 = 36."
            }
          ]
        },
        {
          "id": "wing-construction-slot-3",
          "variants": [
            {
              "id": "wing-construction-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 78,
              "prompt": "6 × 13 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 13 = 78.",
              "choices": [
                72,
                78,
                84,
                90
              ]
            },
            {
              "id": "wing-construction-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 21,
              "prompt": "7 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 3 = 21."
            }
          ]
        },
        {
          "id": "wing-construction-slot-4",
          "variants": [
            {
              "id": "wing-construction-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 48,
              "prompt": "8 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 6 = 48.",
              "choices": [
                40,
                48,
                56,
                64
              ]
            },
            {
              "id": "wing-construction-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 63,
              "prompt": "9 × 7 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 7 = 63."
            }
          ]
        }
      ]
    },
    {
      "id": "designBoard",
      "anchorId": "designBoard",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "design-board-slot-1",
          "variants": [
            {
              "id": "design-board-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Negen uur",
              "choices": [
                "Negen uur",
                "Tien uur",
                "Kwart over negen",
                "Half tien"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 0
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Negen uur."
            },
            {
              "id": "design-board-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart over elf",
              "choices": [
                "Kwart over elf",
                "Kwart over twaalf",
                "Half twaalf",
                "Kwart voor twaalf"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 15
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart over elf."
            }
          ]
        },
        {
          "id": "design-board-slot-2",
          "variants": [
            {
              "id": "design-board-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Half twee",
              "choices": [
                "Half twee",
                "Half drie",
                "Kwart voor twee",
                "Een uur"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 30
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Half twee."
            },
            {
              "id": "design-board-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart voor vier",
              "choices": [
                "Kwart voor vier",
                "Kwart voor vijf",
                "Drie uur",
                "Kwart over drie"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 45
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart voor vier."
            }
          ]
        },
        {
          "id": "design-board-slot-3",
          "variants": [
            {
              "id": "design-board-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf over vijf",
              "choices": [
                "Vijf over vijf",
                "Vijf over zes",
                "Tien voor half zes",
                "Vijf over half zes"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 5
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over vijf."
            },
            {
              "id": "design-board-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien voor half acht",
              "choices": [
                "Tien voor half acht",
                "Tien voor half negen",
                "Vijf over half acht",
                "Tien voor acht"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 20
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor half acht."
            }
          ]
        },
        {
          "id": "design-board-slot-4",
          "variants": [
            {
              "id": "design-board-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf over half elf",
              "choices": [
                "Vijf over half elf",
                "Vijf over half twaalf",
                "Tien voor elf",
                "Vijf over tien"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 35
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over half elf."
            },
            {
              "id": "design-board-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien voor een",
              "choices": [
                "Tien voor een",
                "Tien voor twee",
                "Vijf over twaalf",
                "Tien voor half een"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 12,
                "minute": 50
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor een."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "waterModel",
      "type": "challenge",
      "name": "Watermodel",
      "x": 380,
      "y": 419,
      "radius": 72,
      "approach": {
        "x": 357,
        "y": 562
      }
    },
    {
      "id": "opticalTable",
      "type": "challenge",
      "name": "Optische tafel",
      "x": 649,
      "y": 400,
      "radius": 92,
      "approach": {
        "x": 620,
        "y": 548
      }
    },
    {
      "id": "centralCodex",
      "type": "challenge",
      "name": "Centrale codex",
      "x": 1000,
      "y": 403,
      "radius": 68,
      "approach": {
        "x": 984,
        "y": 564
      }
    },
    {
      "id": "wingConstruction",
      "type": "challenge",
      "name": "Vleugelconstructie",
      "x": 1349,
      "y": 380,
      "radius": 78,
      "approach": {
        "x": 1337,
        "y": 551
      }
    },
    {
      "id": "designBoard",
      "type": "challenge",
      "name": "Ontwerpbord",
      "x": 1575,
      "y": 431,
      "radius": 64,
      "approach": {
        "x": 1585,
        "y": 566
      }
    },
    {
      "id": "workshopExit",
      "type": "exit",
      "name": "Ontwerp afronden",
      "x": 1875,
      "y": 474,
      "radius": 60,
      "approach": {
        "x": 1890,
        "y": 554
      },
      "targetLevel": null,
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "workshopExit",
      "targetLevel": null,
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Vinci: De onvoltooide werkplaats.",
  "storageKey": "lvl-0026-progress",
  "progressKey": "lvl-0026-completed",
  "challengeArt": "Levels/LVL-0026/assets/leonardo-da-vinci.png",
  "spiritName": "Leonardo da Vinci",
  "walkPath": [
    {
      "id": "start",
      "x": 185,
      "y": 548
    },
    {
      "id": "waterModel-approach",
      "x": 357,
      "y": 562,
      "role": "approach"
    },
    {
      "id": "opticalTable-approach",
      "x": 620,
      "y": 548,
      "role": "approach"
    },
    {
      "id": "centralCodex-approach",
      "x": 984,
      "y": 564,
      "role": "approach"
    },
    {
      "id": "wingConstruction-approach",
      "x": 1337,
      "y": 551,
      "role": "approach"
    },
    {
      "id": "designBoard-approach",
      "x": 1585,
      "y": 566,
      "role": "approach"
    },
    {
      "id": "workshopExit-approach",
      "x": 1890,
      "y": 554,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "waterModel",
      "type": "rune",
      "center": {
        "x": 380,
        "y": 419
      },
      "radius": 72,
      "approachNode": "waterModel-approach",
      "label": "Watermodel"
    },
    {
      "id": "opticalTable",
      "type": "rune",
      "center": {
        "x": 649,
        "y": 400
      },
      "radius": 92,
      "approachNode": "opticalTable-approach",
      "label": "Optische tafel"
    },
    {
      "id": "centralCodex",
      "type": "rune",
      "center": {
        "x": 1000,
        "y": 403
      },
      "radius": 68,
      "approachNode": "centralCodex-approach",
      "label": "Centrale codex"
    },
    {
      "id": "wingConstruction",
      "type": "rune",
      "center": {
        "x": 1349,
        "y": 380
      },
      "radius": 78,
      "approachNode": "wingConstruction-approach",
      "label": "Vleugelconstructie"
    },
    {
      "id": "designBoard",
      "type": "rune",
      "center": {
        "x": 1575,
        "y": 431
      },
      "radius": 64,
      "approachNode": "designBoard-approach",
      "label": "Ontwerpbord"
    },
    {
      "id": "workshopExit",
      "type": "exit",
      "center": {
        "x": 1875,
        "y": 474
      },
      "radius": 60,
      "approachNode": "workshopExit-approach",
      "label": "Ontwerp afronden"
    }
  ],
  "hotspots": [
    {
      "id": "workshopExit",
      "objectId": "workshopExit",
      "type": "exit",
      "name": "Ontwerp afronden",
      "defaultAction": "activate",
      "prompt": "Rond het ontwerp af.",
      "solved": "Het ontwerp is klaar."
    }
  ],
  "runes": [
    {
      "id": "waterModel",
      "objectId": "waterModel",
      "name": "Watermodel",
      "shortName": "Watermodel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar watermodel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "waterModel"
    },
    {
      "id": "opticalTable",
      "objectId": "opticalTable",
      "name": "Optische tafel",
      "shortName": "Optische tafel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar optische tafel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "opticalTable"
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
      "id": "wingConstruction",
      "objectId": "wingConstruction",
      "name": "Vleugelconstructie",
      "shortName": "Vleugelconstructie",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar vleugelconstructie.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "wingConstruction"
    },
    {
      "id": "designBoard",
      "objectId": "designBoard",
      "name": "Ontwerpbord",
      "shortName": "Ontwerpbord",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar ontwerpbord.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "designBoard"
    }
  ],
  "areas": [
    {
      "id": "waterModel",
      "name": "Watermodel",
      "description": "Onderzoek watermodel met Leonardo."
    },
    {
      "id": "opticalTable",
      "name": "Optische tafel",
      "description": "Onderzoek optische tafel met Leonardo."
    },
    {
      "id": "centralCodex",
      "name": "Centrale codex",
      "description": "Onderzoek centrale codex met Leonardo."
    },
    {
      "id": "wingConstruction",
      "name": "Vleugelconstructie",
      "description": "Onderzoek vleugelconstructie met Leonardo."
    },
    {
      "id": "designBoard",
      "name": "Ontwerpbord",
      "description": "Onderzoek ontwerpbord met Leonardo."
    }
  ],
  "companion": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0026/assets/leonardo-da-vinci.png"
  },
  "reward": {
    "title": "Leonardo’s atlas voltooid",
    "line": "Sven heeft gekeken, gemeten, onderzocht en zijn eigen ontwerp voltooid.",
    "art": "Levels/LVL-0026/assets/leonardo-da-vinci.png",
    "badge": "Avontuur voltooid"
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
    "setting": "Vinci, ontwerp en uitvinding",
    "mood": "warm, onderzoekend en avontuurlijk",
    "companionFocus": {
      "minnie": "vriendelijke taalhint en aanmoediging",
      "moose": "rustige rekenstrategie en controle"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0026-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Nieuwe plek, nieuwe uitvindersogen."
    },
    {
      "id": "LVL-0026-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Kijk naar de vorm, maat en bedoeling."
    },
    {
      "id": "LVL-0026-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Mooi, weer een idee scherper."
    },
    {
      "id": "LVL-0026-exit",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alle proeven kloppen. De route is vrij."
    },
    {
      "id": "LVL-0026-exit-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De doorgang blijft nog dicht. Los eerst alle opdrachten in deze werkplaats op."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0026/assets/vinci.png",
    "badge": "Finale",
    "detail": "Vinci, ontwerp en uitvinding"
  },
  "intro": [
    "De onvoltooide werkplaats. Leonardo laat Sven onderzoeken wat deze plek bijzonder maakt.",
    "Minnie en Moose helpen met hints als een opdracht lastig wordt."
  ],
  "exitHotspotId": "workshopExit",
  "theme": "De onvoltooide werkplaats",
  "progressLabelPlural": "opdrachten"
};
