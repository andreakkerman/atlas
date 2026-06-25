window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0024"] = {
  "id": "LVL-0024",
  "title": "Marche",
  "subtitle": "Vlucht en wind",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0024/assets/marche.png"
  },
  "player": {
    "start": {
      "x": 97,
      "y": 616
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 110,
    "maxX": 2070,
    "minY": 505,
    "maxY": 600
  },
  "challengeLabel": "Vluchtproef",
  "challengeCharacter": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0024/assets/leonardo-da-vinci.png",
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
      "id": "wingRack",
      "anchorId": "wingRack",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "wing-rack-slot-1",
          "variants": [
            {
              "id": "wing-rack-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 40,
              "prompt": "Bij de ribben liggen 4 rijen met 10 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 4 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "4 × 10 = 40.",
              "choices": [
                36,
                40,
                44,
                48
              ]
            },
            {
              "id": "wing-rack-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 15,
              "prompt": "Leonardo tekent 5 vakken met 3 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 5 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "5 × 3 = 15."
            }
          ]
        },
        {
          "id": "wing-rack-slot-2",
          "variants": [
            {
              "id": "wing-rack-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 65,
              "prompt": "5 × 13 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "5 × 13 = 65.",
              "choices": [
                60,
                65,
                70,
                75
              ]
            },
            {
              "id": "wing-rack-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 12,
              "prompt": "6 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 × 2 = 12."
            }
          ]
        },
        {
          "id": "wing-rack-slot-3",
          "variants": [
            {
              "id": "wing-rack-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 5,
              "prompt": "30 : 6 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "30 : 6 = 5, want 6 × 5 = 30.",
              "choices": [
                4,
                5,
                6,
                7
              ]
            },
            {
              "id": "wing-rack-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 30,
              "prompt": "Sven legt bij de ribben 6 stapels met 5 kleine onderdelen. Hoeveel onderdelen liggen er samen?",
              "hintMinnie": "Zoek 6 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "6 × 5 = 30.",
              "choices": [
                24,
                30,
                36,
                42
              ]
            }
          ]
        },
        {
          "id": "wing-rack-slot-4",
          "variants": [
            {
              "id": "wing-rack-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 49,
              "prompt": "Op de ribben staan 7 groepjes van 7. Hoeveel zijn dat samen?",
              "hintMinnie": "Zoek 7 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "7 × 7 = 49."
            },
            {
              "id": "wing-rack-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 28,
              "prompt": "7 × 4 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 × 4 = 28.",
              "choices": [
                21,
                28,
                35,
                42
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "counterweights",
      "anchorId": "counterweights",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "counterweights-slot-1",
          "variants": [
            {
              "id": "counterweights-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 64,
              "prompt": "8 × 8 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 × 8 = 64."
            },
            {
              "id": "counterweights-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 7,
              "prompt": "49 : 7 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "49 : 7 = 7, want 7 × 7 = 49.",
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
          "id": "counterweights-slot-2",
          "variants": [
            {
              "id": "counterweights-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 72,
              "prompt": "Bij de gewichten liggen 8 rijen met 9 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 8 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "8 × 9 = 72.",
              "choices": [
                64,
                72,
                80,
                88
              ]
            },
            {
              "id": "counterweights-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 18,
              "prompt": "Leonardo tekent 9 vakken met 2 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 9 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "9 × 2 = 18."
            }
          ]
        },
        {
          "id": "counterweights-slot-3",
          "variants": [
            {
              "id": "counterweights-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 90,
              "prompt": "9 × 10 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 × 10 = 90.",
              "choices": [
                81,
                90,
                99,
                108
              ]
            },
            {
              "id": "counterweights-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 22,
              "prompt": "2 × 11 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "2 × 11 = 22."
            }
          ]
        },
        {
          "id": "counterweights-slot-4",
          "variants": [
            {
              "id": "counterweights-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 8,
              "prompt": "64 : 8 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "64 : 8 = 8, want 8 × 8 = 64.",
              "choices": [
                7,
                8,
                9,
                10
              ]
            },
            {
              "id": "counterweights-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 54,
              "prompt": "Sven legt bij de gewichten 6 stapels met 9 kleine onderdelen. Hoeveel onderdelen liggen er samen?",
              "hintMinnie": "Zoek 6 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "6 × 9 = 54.",
              "choices": [
                48,
                54,
                60,
                66
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "flightControls",
      "anchorId": "flightControls",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "flight-controls-slot-1",
          "variants": [
            {
              "id": "flight-controls-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien over een",
              "choices": [
                "Tien over een",
                "Tien over twee",
                "Vijf voor half twee",
                "Tien over half twee"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 10
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien over een."
            },
            {
              "id": "flight-controls-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf voor half acht",
              "choices": [
                "Vijf voor half acht",
                "Vijf voor half negen",
                "Tien over half acht",
                "Vijf voor acht"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 25
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf voor half acht."
            }
          ]
        },
        {
          "id": "flight-controls-slot-2",
          "variants": [
            {
              "id": "flight-controls-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Tien over half tien",
              "choices": [
                "Tien over half tien",
                "Tien over half elf",
                "Vijf voor tien",
                "Tien over negen"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 40
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien over half tien."
            },
            {
              "id": "flight-controls-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Vijf voor twaalf",
              "choices": [
                "Vijf voor twaalf",
                "Vijf voor een",
                "Tien over elf",
                "Vijf voor half twaalf"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 55
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf voor twaalf."
            }
          ]
        },
        {
          "id": "flight-controls-slot-3",
          "variants": [
            {
              "id": "flight-controls-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Drie uur",
              "choices": [
                "Drie uur",
                "Vier uur",
                "Kwart over drie",
                "Half vier"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 0
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Drie uur."
            },
            {
              "id": "flight-controls-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart over vijf",
              "choices": [
                "Kwart over vijf",
                "Kwart over zes",
                "Half zes",
                "Kwart voor zes"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 15
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart over vijf."
            }
          ]
        },
        {
          "id": "flight-controls-slot-4",
          "variants": [
            {
              "id": "flight-controls-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Half acht",
              "choices": [
                "Half acht",
                "Half negen",
                "Kwart voor acht",
                "Zeven uur"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 30
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Half acht."
            },
            {
              "id": "flight-controls-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": "Kwart voor tien",
              "choices": [
                "Kwart voor tien",
                "Kwart voor elf",
                "Negen uur",
                "Kwart over negen"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 45
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart voor tien."
            }
          ]
        }
      ]
    },
    {
      "id": "wingFrame",
      "anchorId": "wingFrame",
      "challengeCharacterId": "leonardo-da-vinci",
      "questions": [
        {
          "id": "wing-frame-slot-1",
          "variants": [
            {
              "id": "wing-frame-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 14,
              "prompt": "Op de vleugelsecties staan 7 groepjes van 2. Hoeveel zijn dat samen?",
              "hintMinnie": "Zoek 7 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "7 × 2 = 14."
            },
            {
              "id": "wing-frame-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 110,
              "prompt": "10 × 11 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "10 × 11 = 110.",
              "choices": [
                100,
                110,
                120,
                130
              ]
            }
          ]
        },
        {
          "id": "wing-frame-slot-2",
          "variants": [
            {
              "id": "wing-frame-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 33,
              "prompt": "3 × 11 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "3 × 11 = 33."
            },
            {
              "id": "wing-frame-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 3,
              "prompt": "27 : 9 = ?",
              "hintMinnie": "Welke keersom hoort hier omgekeerd bij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "27 : 9 = 3, want 9 × 3 = 27.",
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
          "id": "wing-frame-slot-3",
          "variants": [
            {
              "id": "wing-frame-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 32,
              "prompt": "Bij de vleugelsecties liggen 8 rijen met 4 delen. Hoeveel delen zijn dat samen?",
              "hintMinnie": "Zoek 8 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "8 × 4 = 32.",
              "choices": [
                24,
                32,
                40,
                48
              ]
            },
            {
              "id": "wing-frame-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 54,
              "prompt": "Leonardo tekent 9 vakken met 6 lijnen per vak. Hoeveel lijnen tekent hij?",
              "hintMinnie": "Zoek 9 groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van en reken die rustig uit.",
              "explanation": "9 × 6 = 54."
            }
          ]
        },
        {
          "id": "wing-frame-slot-4",
          "variants": [
            {
              "id": "wing-frame-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 52,
              "prompt": "4 × 13 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "4 × 13 = 52.",
              "choices": [
                48,
                52,
                56,
                60
              ]
            },
            {
              "id": "wing-frame-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 10,
              "prompt": "5 × 2 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "5 × 2 = 10."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "wingRack",
      "type": "challenge",
      "name": "Vleugelmeetrek",
      "x": 440,
      "y": 481,
      "radius": 82,
      "approach": {
        "x": 421,
        "y": 613
      }
    },
    {
      "id": "counterweights",
      "type": "challenge",
      "name": "Tegengewichten",
      "x": 766,
      "y": 476,
      "radius": 82,
      "approach": {
        "x": 738,
        "y": 621
      }
    },
    {
      "id": "flightControls",
      "type": "challenge",
      "name": "Testbediening",
      "x": 1043,
      "y": 437,
      "radius": 68,
      "approach": {
        "x": 1035,
        "y": 625
      }
    },
    {
      "id": "wingFrame",
      "type": "challenge",
      "name": "Vleugelframe",
      "x": 1407,
      "y": 372,
      "radius": 110,
      "approach": {
        "x": 1404,
        "y": 623
      }
    },
    {
      "id": "florenceGate",
      "type": "exit",
      "name": "Route naar Florence",
      "x": 2075,
      "y": 506,
      "radius": 90,
      "approach": {
        "x": 2057,
        "y": 616
      },
      "targetLevel": "LVL-0025",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "florenceGate",
      "targetLevel": "LVL-0025",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Marche: Vlucht en wind.",
  "storageKey": "lvl-0024-progress",
  "progressKey": "lvl-0024-completed",
  "challengeArt": "Levels/LVL-0024/assets/leonardo-da-vinci.png",
  "spiritName": "Leonardo da Vinci",
  "walkPath": [
    {
      "id": "start",
      "x": 97,
      "y": 616
    },
    {
      "id": "wingRack-approach",
      "x": 421,
      "y": 613,
      "role": "approach"
    },
    {
      "id": "counterweights-approach",
      "x": 738,
      "y": 621,
      "role": "approach"
    },
    {
      "id": "flightControls-approach",
      "x": 1035,
      "y": 625,
      "role": "approach"
    },
    {
      "id": "wingFrame-approach",
      "x": 1404,
      "y": 623,
      "role": "approach"
    },
    {
      "id": "florenceGate-approach",
      "x": 2057,
      "y": 616,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "wingRack",
      "type": "rune",
      "center": {
        "x": 440,
        "y": 481
      },
      "radius": 82,
      "approachNode": "wingRack-approach",
      "label": "Vleugelmeetrek"
    },
    {
      "id": "counterweights",
      "type": "rune",
      "center": {
        "x": 766,
        "y": 476
      },
      "radius": 82,
      "approachNode": "counterweights-approach",
      "label": "Tegengewichten"
    },
    {
      "id": "flightControls",
      "type": "rune",
      "center": {
        "x": 1043,
        "y": 437
      },
      "radius": 68,
      "approachNode": "flightControls-approach",
      "label": "Testbediening"
    },
    {
      "id": "wingFrame",
      "type": "rune",
      "center": {
        "x": 1407,
        "y": 372
      },
      "radius": 110,
      "approachNode": "wingFrame-approach",
      "label": "Vleugelframe"
    },
    {
      "id": "florenceGate",
      "type": "exit",
      "center": {
        "x": 2075,
        "y": 506
      },
      "radius": 90,
      "approachNode": "florenceGate-approach",
      "label": "Route naar Florence"
    }
  ],
  "hotspots": [
    {
      "id": "florenceGate",
      "objectId": "florenceGate",
      "type": "exit",
      "name": "Route naar Florence",
      "defaultAction": "activate",
      "prompt": "Ga naar de volgende Leonardo-plek.",
      "solved": "De volgende plek is open."
    }
  ],
  "runes": [
    {
      "id": "wingRack",
      "objectId": "wingRack",
      "name": "Vleugelmeetrek",
      "shortName": "Vleugelmeetrek",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar vleugelmeetrek.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "wingRack"
    },
    {
      "id": "counterweights",
      "objectId": "counterweights",
      "name": "Tegengewichten",
      "shortName": "Tegengewichten",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar tegengewichten.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "counterweights"
    },
    {
      "id": "flightControls",
      "objectId": "flightControls",
      "name": "Testbediening",
      "shortName": "Testbediening",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar testbediening.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "flightControls"
    },
    {
      "id": "wingFrame",
      "objectId": "wingFrame",
      "name": "Vleugelframe",
      "shortName": "Vleugelframe",
      "defaultAction": "activate",
      "intro": "Leonardo wijst naar vleugelframe.",
      "prompt": "Los de vier ontwerpvragen op.",
      "solved": "Mooi onderzocht! Deze proef is klaar.",
      "challengeId": "wingFrame"
    }
  ],
  "areas": [
    {
      "id": "wingRack",
      "name": "Vleugelmeetrek",
      "description": "Onderzoek vleugelmeetrek met Leonardo."
    },
    {
      "id": "counterweights",
      "name": "Tegengewichten",
      "description": "Onderzoek tegengewichten met Leonardo."
    },
    {
      "id": "flightControls",
      "name": "Testbediening",
      "description": "Onderzoek testbediening met Leonardo."
    },
    {
      "id": "wingFrame",
      "name": "Vleugelframe",
      "description": "Onderzoek vleugelframe met Leonardo."
    }
  ],
  "companion": {
    "id": "leonardo-da-vinci",
    "name": "Leonardo da Vinci",
    "portrait": "Levels/LVL-0024/assets/leonardo-da-vinci.png"
  },
  "reward": {
    "title": "Marche afgerond",
    "line": "De volgende Italiaanse werkplaats is bereikbaar.",
    "art": "Levels/LVL-0024/assets/leonardo-da-vinci.png",
    "badge": "Werkplaats afgerond",
    "nextLevelId": "LVL-0025",
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
    "setting": "Marche, vlucht en wind",
    "mood": "warm, onderzoekend en avontuurlijk",
    "companionFocus": {
      "minnie": "vriendelijke taalhint en aanmoediging",
      "moose": "rustige rekenstrategie en controle"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0024-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Nieuwe plek, nieuwe uitvindersogen."
    },
    {
      "id": "LVL-0024-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Kijk naar de vorm, maat en bedoeling."
    },
    {
      "id": "LVL-0024-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Mooi, weer een idee scherper."
    },
    {
      "id": "LVL-0024-exit",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alle proeven kloppen. De route is vrij."
    },
    {
      "id": "LVL-0024-exit-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De doorgang blijft nog dicht. Los eerst alle opdrachten in deze werkplaats op."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0024/assets/marche.png",
    "badge": "Verbonden gebied",
    "detail": "Marche, vlucht en wind"
  },
  "intro": [
    "Vlucht en wind. Leonardo laat Sven onderzoeken wat deze plek bijzonder maakt.",
    "Minnie en Moose helpen met hints als een opdracht lastig wordt."
  ],
  "exitHotspotId": "florenceGate",
  "theme": "Vlucht en wind",
  "progressLabelPlural": "opdrachten"
};
