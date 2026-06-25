window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0023"] = {
  "id": "LVL-0023",
  "title": "Umbrie",
  "subtitle": "Water en stroming",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0023/assets/umbria.png"
  },
  "player": {
    "start": {
      "x": 124,
      "y": 519
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 110,
    "maxX": 2070,
    "minY": 490,
    "maxY": 575
  },
  "challengeLabel": "Waterproef",
  "challengeCharacter": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0023/assets/leonardo-da-vinci.png",
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
      "id": "waterLevelPost",
      "anchorId": "waterLevelPost",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "water-level-post-slot-1",
          "variants": [
            {
              "id": "water-level-post-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 24,
              "prompt": "3 × 8 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "3 × 8 = 24."
            },
            {
              "id": "water-level-post-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 3,
              "prompt": "24 : 8 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "24 : 8 = 3, want 8 × 3 = 24.",
              "choices": [
                2,
                3,
                4,
                5
              ]
            }
          ]
        },
        {
          "id": "water-level-post-slot-2",
          "variants": [
            {
              "id": "water-level-post-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 18,
              "prompt": "Bij de meetstrepen liggen 3 rijen met 6 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 3 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "3 × 6 = 18.",
              "choices": [
                15,
                18,
                21,
                24
              ]
            },
            {
              "id": "water-level-post-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 32,
              "prompt": "Leonardo tekent 4 vakken met 8 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 4 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "4 × 8 = 32."
            }
          ]
        },
        {
          "id": "water-level-post-slot-3",
          "variants": [
            {
              "id": "water-level-post-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 4,
              "prompt": "36 : 9 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "36 : 9 = 4, want 9 × 4 = 36."
            },
            {
              "id": "water-level-post-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "measurement",
              "presentation": "story",
              "answerMode": "open",
              "answer": 69,
              "prompt": "Bij de meetstrepen staan 85 waterstrepen en Sven wist 16 proefstrepen weg. Hoeveel strepen blijven staan?",
              "hintMinnie": "Kijk wat er van het eerste aantal afgaat.",
              "hintMoose": "Trek eerst de tientallen af en daarna de lossen.",
              "explanation": "85 - 16 = 69."
            }
          ]
        },
        {
          "id": "water-level-post-slot-4",
          "variants": [
            {
              "id": "water-level-post-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 2,
              "prompt": "Bij de meetstrepen verdeelt Sven 12 onderdelen over 6 gelijke bakken. Hoeveel onderdelen komen in elke bak?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "12 : 6 = 2, want 6 × 2 = 12.",
              "choices": [
                1,
                2,
                3,
                4
              ]
            },
            {
              "id": "water-level-post-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "answer": 4,
              "prompt": "Leonardo verdeelt 28 stukjes bij de meetstrepen in 7 gelijke groepen. Hoeveel stukjes krijgt elke groep?",
              "hintMinnie": "Verdeel het totaal in even grote groepen.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "28 : 7 = 4, want 7 × 4 = 28."
            }
          ]
        }
      ]
    },
    {
      "id": "valveWheel",
      "anchorId": "valveWheel",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "valve-wheel-slot-1",
          "variants": [
            {
              "id": "valve-wheel-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 20,
              "prompt": "4 × 5 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "4 × 5 = 20.",
              "choices": [
                16,
                20,
                24,
                28
              ]
            },
            {
              "id": "valve-wheel-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 30,
              "prompt": "5 × 6 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "5 × 6 = 30."
            }
          ]
        },
        {
          "id": "valve-wheel-slot-2",
          "variants": [
            {
              "id": "valve-wheel-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 9,
              "prompt": "72 : 8 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "72 : 8 = 9, want 8 × 9 = 72.",
              "choices": [
                8,
                9,
                10,
                11
              ]
            },
            {
              "id": "valve-wheel-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 15,
              "prompt": "Bij de ventieldraaien liggen 5 rijen met 3 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 5 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "5 × 3 = 15.",
              "choices": [
                10,
                15,
                20,
                25
              ]
            }
          ]
        },
        {
          "id": "valve-wheel-slot-3",
          "variants": [
            {
              "id": "valve-wheel-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 90,
              "prompt": "Leonardo tekent 10 vakken met 9 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 10 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "10 × 9 = 90."
            },
            {
              "id": "valve-wheel-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 2,
              "prompt": "18 : 9 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "18 : 9 = 2, want 9 × 2 = 18."
            }
          ]
        },
        {
          "id": "valve-wheel-slot-4",
          "variants": [
            {
              "id": "valve-wheel-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 48,
              "prompt": "6 × 8 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 8 = 48.",
              "choices": [
                42,
                48,
                54,
                60
              ]
            },
            {
              "id": "valve-wheel-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 63,
              "prompt": "7 × 9 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 9 = 63."
            }
          ]
        }
      ]
    },
    {
      "id": "lockChambers",
      "anchorId": "lockChambers",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "lock-chambers-slot-1",
          "variants": [
            {
              "id": "lock-chambers-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 7,
              "prompt": "42 : 6 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "42 : 6 = 7, want 6 × 7 = 42.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            },
            {
              "id": "lock-chambers-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 36,
              "prompt": "Sven legt bij de boten 6 stapels met 6 kleine onderdelen. Hoeveel onderdelen liggen er samen?",
              "hintMinnie": "Zoek 6 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "6 × 6 = 36.",
              "choices": [
                30,
                36,
                42,
                48
              ]
            }
          ]
        },
        {
          "id": "lock-chambers-slot-2",
          "variants": [
            {
              "id": "lock-chambers-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 56,
              "prompt": "Op de boten staan 7 groepjes van 8. Hoeveel zijn dat samen?",
              "hintMinnie": "Zoek 7 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "lock-chambers-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 16,
              "prompt": "8 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 2 = 16.",
              "choices": [
                8,
                16,
                24,
                32
              ]
            }
          ]
        },
        {
          "id": "lock-chambers-slot-3",
          "variants": [
            {
              "id": "lock-chambers-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 27,
              "prompt": "9 × 3 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 3 = 27."
            },
            {
              "id": "lock-chambers-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 9,
              "prompt": "63 : 7 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "63 : 7 = 9, want 7 × 9 = 63.",
              "choices": [
                8,
                9,
                10,
                11
              ]
            }
          ]
        },
        {
          "id": "lock-chambers-slot-4",
          "variants": [
            {
              "id": "lock-chambers-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 80,
              "prompt": "Bij de boten liggen 8 rijen met 10 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 8 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "8 × 10 = 80.",
              "choices": [
                72,
                80,
                88,
                96
              ]
            },
            {
              "id": "lock-chambers-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 27,
              "prompt": "Leonardo tekent 9 vakken met 3 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 9 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "9 × 3 = 27."
            }
          ]
        }
      ]
    },
    {
      "id": "paddleWheel",
      "anchorId": "paddleWheel",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "paddle-wheel-slot-1",
          "variants": [
            {
              "id": "paddle-wheel-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 18,
              "prompt": "2 × 9 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 9 = 18.",
              "choices": [
                16,
                18,
                20,
                22
              ]
            },
            {
              "id": "paddle-wheel-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 100,
              "prompt": "10 × 10 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "10 × 10 = 100."
            }
          ]
        },
        {
          "id": "paddle-wheel-slot-2",
          "variants": [
            {
              "id": "paddle-wheel-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 4,
              "prompt": "32 : 8 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "32 : 8 = 4, want 8 × 4 = 32.",
              "choices": [
                3,
                4,
                5,
                6
              ]
            },
            {
              "id": "paddle-wheel-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 12,
              "prompt": "Sven legt bij de schoepen 2 stapels met 6 kleine onderdelen. Hoeveel onderdelen liggen er samen?",
              "hintMinnie": "Zoek 2 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "2 × 6 = 12.",
              "choices": [
                10,
                12,
                14,
                16
              ]
            }
          ]
        },
        {
          "id": "paddle-wheel-slot-3",
          "variants": [
            {
              "id": "paddle-wheel-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 24,
              "prompt": "Op de schoepen staan 3 groepjes van 8. Hoeveel zijn dat samen?",
              "hintMinnie": "Zoek 3 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "3 × 8 = 24."
            },
            {
              "id": "paddle-wheel-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 36,
              "prompt": "3 × 12 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "3 × 12 = 36.",
              "choices": [
                33,
                36,
                39,
                42
              ]
            }
          ]
        },
        {
          "id": "paddle-wheel-slot-4",
          "variants": [
            {
              "id": "paddle-wheel-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 48,
              "prompt": "4 × 12 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "4 × 12 = 48."
            },
            {
              "id": "paddle-wheel-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 8,
              "prompt": "72 : 9 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "72 : 9 = 8, want 9 × 8 = 72.",
              "choices": [
                7,
                8,
                9,
                10
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "waterClock",
      "anchorId": "waterClock",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "water-clock-slot-1",
          "variants": [
            {
              "id": "water-clock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Twee uur",
              "choices": [
                "Twee uur",
                "Drie uur",
                "Kwart over twee",
                "Half drie"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 0
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Twee uur."
            },
            {
              "id": "water-clock-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart over vier",
              "choices": [
                "Kwart over vier",
                "Kwart over vijf",
                "Half vijf",
                "Kwart voor vijf"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 4,
                "minute": 15
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart over vier."
            }
          ]
        },
        {
          "id": "water-clock-slot-2",
          "variants": [
            {
              "id": "water-clock-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Half zeven",
              "choices": [
                "Half zeven",
                "Half acht",
                "Kwart voor zeven",
                "Zes uur"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 30
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Half zeven."
            },
            {
              "id": "water-clock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart voor negen",
              "choices": [
                "Kwart voor negen",
                "Kwart voor tien",
                "Acht uur",
                "Kwart over acht"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 45
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart voor negen."
            }
          ]
        },
        {
          "id": "water-clock-slot-3",
          "variants": [
            {
              "id": "water-clock-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf over tien",
              "choices": [
                "Vijf over tien",
                "Vijf over elf",
                "Tien voor half elf",
                "Vijf over half elf"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 5
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over tien."
            },
            {
              "id": "water-clock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien voor half een",
              "choices": [
                "Tien voor half een",
                "Tien voor half twee",
                "Vijf over half een",
                "Tien voor een"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 12,
                "minute": 20
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor half een."
            }
          ]
        },
        {
          "id": "water-clock-slot-4",
          "variants": [
            {
              "id": "water-clock-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf over half vier",
              "choices": [
                "Vijf over half vier",
                "Vijf over half vijf",
                "Tien voor vier",
                "Vijf over drie"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 35
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over half vier."
            },
            {
              "id": "water-clock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien voor zes",
              "choices": [
                "Tien voor zes",
                "Tien voor zeven",
                "Vijf over vijf",
                "Tien voor half zes"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 50
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor zes."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "waterLevelPost",
      "type": "challenge",
      "name": "Waterstandspaal",
      "x": 431,
      "y": 370,
      "radius": 60,
      "approach": {
        "x": 443,
        "y": 525
      }
    },
    {
      "id": "valveWheel",
      "type": "challenge",
      "name": "Ventiel",
      "x": 641,
      "y": 425,
      "radius": 50,
      "approach": {
        "x": 647,
        "y": 524
      }
    },
    {
      "id": "lockChambers",
      "type": "challenge",
      "name": "Sluiskamers",
      "x": 1038,
      "y": 393,
      "radius": 78,
      "approach": {
        "x": 1084,
        "y": 531
      }
    },
    {
      "id": "paddleWheel",
      "type": "challenge",
      "name": "Waterrad",
      "x": 1370,
      "y": 426,
      "radius": 82,
      "approach": {
        "x": 1373,
        "y": 543
      }
    },
    {
      "id": "waterClock",
      "type": "challenge",
      "name": "Waterklok",
      "x": 1616,
      "y": 386,
      "radius": 58,
      "approach": {
        "x": 1653,
        "y": 553
      }
    },
    {
      "id": "marcheGate",
      "type": "exit",
      "name": "Pad naar Marche",
      "x": 2051,
      "y": 407,
      "radius": 90,
      "approach": {
        "x": 2003,
        "y": 541
      },
      "targetLevel": "LVL-0024",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "marcheGate",
      "targetLevel": "LVL-0024",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Umbrie: Water en stroming.",
  "storageKey": "lvl-0023-progress",
  "progressKey": "lvl-0023-completed",
  "challengeArt": "Levels/LVL-0023/assets/leonardo-da-vinci.png",
  "spiritName": "Leonardo da Vinci",
  "walkPath": [
    {
      "id": "start",
      "x": 124,
      "y": 519
    },
    {
      "id": "waterLevelPost-approach",
      "x": 443,
      "y": 525,
      "role": "approach"
    },
    {
      "id": "valveWheel-approach",
      "x": 647,
      "y": 524,
      "role": "approach"
    },
    {
      "id": "lockChambers-approach",
      "x": 1084,
      "y": 531,
      "role": "approach"
    },
    {
      "id": "paddleWheel-approach",
      "x": 1373,
      "y": 543,
      "role": "approach"
    },
    {
      "id": "waterClock-approach",
      "x": 1653,
      "y": 553,
      "role": "approach"
    },
    {
      "id": "marcheGate-approach",
      "x": 2003,
      "y": 541,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "waterLevelPost",
      "type": "rune",
      "center": {
        "x": 431,
        "y": 370
      },
      "radius": 60,
      "approachNode": "waterLevelPost-approach",
      "label": "Waterstandspaal"
    },
    {
      "id": "valveWheel",
      "type": "rune",
      "center": {
        "x": 641,
        "y": 425
      },
      "radius": 50,
      "approachNode": "valveWheel-approach",
      "label": "Ventiel"
    },
    {
      "id": "lockChambers",
      "type": "rune",
      "center": {
        "x": 1038,
        "y": 393
      },
      "radius": 78,
      "approachNode": "lockChambers-approach",
      "label": "Sluiskamers"
    },
    {
      "id": "paddleWheel",
      "type": "rune",
      "center": {
        "x": 1370,
        "y": 426
      },
      "radius": 82,
      "approachNode": "paddleWheel-approach",
      "label": "Waterrad"
    },
    {
      "id": "waterClock",
      "type": "rune",
      "center": {
        "x": 1616,
        "y": 386
      },
      "radius": 58,
      "approachNode": "waterClock-approach",
      "label": "Waterklok"
    },
    {
      "id": "marcheGate",
      "type": "exit",
      "center": {
        "x": 2051,
        "y": 407
      },
      "radius": 90,
      "approachNode": "marcheGate-approach",
      "label": "Pad naar Marche"
    }
  ],
  "hotspots": [
    {
      "id": "marcheGate",
      "objectId": "marcheGate",
      "type": "exit",
      "name": "Pad naar Marche",
      "defaultAction": "activate",
      "prompt": "Ga naar de volgende Leonardo-plek.",
      "solved": "De volgende plek is open."
    }
  ],
  "runes": [
    {
      "id": "waterLevelPost",
      "objectId": "waterLevelPost",
      "name": "Waterstandspaal",
      "shortName": "Waterstandspaal",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar waterstandspaal.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "waterLevelPost"
    },
    {
      "id": "valveWheel",
      "objectId": "valveWheel",
      "name": "Ventiel",
      "shortName": "Ventiel",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar ventiel.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "valveWheel"
    },
    {
      "id": "lockChambers",
      "objectId": "lockChambers",
      "name": "Sluiskamers",
      "shortName": "Sluiskamers",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar de sluiskamers.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "lockChambers"
    },
    {
      "id": "paddleWheel",
      "objectId": "paddleWheel",
      "name": "Waterrad",
      "shortName": "Waterrad",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar waterrad.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "paddleWheel"
    },
    {
      "id": "waterClock",
      "objectId": "waterClock",
      "name": "Waterklok",
      "shortName": "Waterklok",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar waterklok.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "waterClock"
    }
  ],
  "areas": [
    {
      "id": "waterLevelPost",
      "name": "Waterstandspaal",
      "description": "Onderzoek waterstandspaal met Leonardo."
    },
    {
      "id": "valveWheel",
      "name": "Ventiel",
      "description": "Onderzoek ventiel met Leonardo."
    },
    {
      "id": "paddleWheel",
      "name": "Waterrad",
      "description": "Onderzoek waterrad met Leonardo."
    },
    {
      "id": "waterClock",
      "name": "Waterklok",
      "description": "Onderzoek waterklok met Leonardo."
    }
  ],
  "companion": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0023/assets/leonardo-da-vinci.png"
  },
  "reward": {
    "title": "Umbrie afgerond",
    "line": "De volgende Italiaanse werkplaats is bereikbaar.",
    "art": "Levels/LVL-0023/assets/leonardo-da-vinci.png",
    "badge": "Werkplaats afgerond",
    "nextLevelId": "LVL-0024",
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
    "setting": "Umbrie, water en stroming",
    "mood": "warm, onderzoekend en avontuurlijk",
    "companionFocus": {
      "minnie": "vriendelijke taalhint en aanmoediging",
      "moose": "rustige rekenstrategie en controle"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0023-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Nieuwe plek, nieuwe uitvindersogen."
    },
    {
      "id": "LVL-0023-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Kijk naar de vorm, maat en bedoeling."
    },
    {
      "id": "LVL-0023-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Mooi, weer een idee scherper."
    },
    {
      "id": "LVL-0023-exit",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alle proeven kloppen. De route is vrij."
    },
    {
      "id": "LVL-0023-exit-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De doorgang blijft nog dicht. Los eerst alle opdrachten in deze werkplaats op."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0023/assets/umbria.png",
    "badge": "Verbonden gebied",
    "detail": "Umbrie, water en stroming"
  },
  "intro": [
    "Water en stroming. Leonardo laat Sven onderzoeken wat deze plek bijzonder maakt.",
    "Minnie en Moose helpen met hints als een opdracht lastig wordt."
  ],
  "exitHotspotId": "marcheGate",
  "theme": "Water en stroming",
  "progressLabelPlural": "opdrachten"
};
