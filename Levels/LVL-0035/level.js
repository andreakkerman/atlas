window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0035"] = {
  "id": "LVL-0035",
  "title": "Stella Montis",
  "subtitle": "Verken het besneeuwde complex tussen de bergen.",
  "description": "Onderzoek met Valente de computerterminal, de ronde container en de voorraadkist.",
  "storageKey": "lvl-0035-arc-progress",
  "progressKey": "lvl-0035-arc-completed",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0035/stellamontis.png",
    "depthmap": "Levels/LVL-0035/depthmap.png",
    "depthMap": "Levels/LVL-0035/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 110,
      "y": 616
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 75,
    "maxX": 2050,
    "minY": 495,
    "maxY": 640
  },
  "challengeLabel": "Uitdaging",
  "challengeCompleteLabel": "Opdracht afronden",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "ontdekkingen",
  "challengeCharacter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0035/Valente.png",
    "role": "verkenner"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/ARC_minnie.png",
      "blink": false,
      "purrSounds": [
        "minnie1",
        "minnie2"
      ]
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/ARC_moose.png",
      "blink": false,
      "purrSounds": [
        "moose1",
        "moose2"
      ]
    }
  },
  "companion": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0035/Valente.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0035/Valente.png",
  "spiritName": "Valente",
  "walkPath": [
    {
      "id": "start",
      "x": 110,
      "y": 616
    },
    {
      "id": "terminal-approach",
      "x": 475,
      "y": 616,
      "role": "approach"
    },
    {
      "id": "platform-bend",
      "x": 870,
      "y": 618
    },
    {
      "id": "roundContainer-approach",
      "x": 1323,
      "y": 616,
      "role": "approach"
    },
    {
      "id": "crate-approach",
      "x": 1500,
      "y": 615,
      "role": "approach"
    },
    {
      "id": "stairs-foot",
      "x": 1825,
      "y": 611
    },
    {
      "id": "stairs-middle",
      "x": 1930,
      "y": 557
    },
    {
      "id": "exit-approach",
      "x": 2020,
      "y": 508,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "terminal",
      "type": "rune",
      "center": {
        "x": 475,
        "y": 505
      },
      "radius": 48,
      "approachNode": "terminal-approach",
      "label": "Computerterminal"
    },
    {
      "id": "roundContainer",
      "type": "rune",
      "center": {
        "x": 1323,
        "y": 374
      },
      "radius": 77,
      "approachNode": "roundContainer-approach",
      "label": "Ronde container"
    },
    {
      "id": "crate",
      "type": "rune",
      "center": {
        "x": 1500,
        "y": 546
      },
      "radius": 55,
      "approachNode": "crate-approach",
      "label": "Voorraadkist"
    },
    {
      "id": "sectorExit",
      "type": "exit",
      "center": {
        "x": 2020,
        "y": 450
      },
      "radius": 65,
      "approachNode": "exit-approach",
      "label": "Sector 3"
    }
  ],
  "learningChallenges": [
    {
      "id": "terminal",
      "anchorId": "terminal",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "terminal-slot-1",
          "variants": [
            {
              "id": "terminal-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 9 = ?",
              "answer": 63,
              "hintMinnie": "Denk aan 7 groepjes van 9.",
              "hintMoose": "Reken eerst 6 × 9 = 54. Tel er 9 bij.",
              "explanation": "7 × 9 = 63."
            },
            {
              "id": "terminal-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 8 = ?",
              "answer": 48,
              "hintMinnie": "Denk aan 6 groepjes van 8.",
              "hintMoose": "Reken eerst 5 × 8 = 40. Tel er 8 bij.",
              "explanation": "6 × 8 = 48.",
              "choices": [
                56,
                47,
                48,
                49
              ]
            }
          ]
        },
        {
          "id": "terminal-slot-2",
          "variants": [
            {
              "id": "terminal-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 8 = ?",
              "answer": 32,
              "hintMinnie": "Denk aan 4 groepjes van 8.",
              "hintMoose": "Reken eerst 3 × 8 = 24. Tel er 8 bij.",
              "explanation": "4 × 8 = 32.",
              "choices": [
                32,
                40,
                31,
                33
              ]
            },
            {
              "id": "terminal-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 3 = ?",
              "answer": 27,
              "hintMinnie": "Denk aan 9 groepjes van 3.",
              "hintMoose": "Reken eerst 8 × 3 = 24. Tel er 3 bij.",
              "explanation": "9 × 3 = 27."
            }
          ]
        },
        {
          "id": "terminal-slot-3",
          "variants": [
            {
              "id": "terminal-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Op het scherm staan 6 rijen met elk 7 vakjes. Hoeveel vakjes zijn dat samen?",
              "answer": 42,
              "hintMinnie": "Denk aan 6 groepjes van 7.",
              "hintMoose": "Reken eerst 5 × 7 = 35. Tel er 7 bij.",
              "explanation": "6 × 7 = 42."
            },
            {
              "id": "terminal-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 8 kabelbundels met elk 6 kabels. Hoeveel kabels zijn dat samen?",
              "answer": 48,
              "hintMinnie": "Denk aan 8 groepjes van 6.",
              "hintMoose": "Reken eerst 7 × 6 = 42. Tel er 6 bij.",
              "explanation": "8 × 6 = 48.",
              "choices": [
                54,
                47,
                48,
                49
              ]
            }
          ]
        },
        {
          "id": "terminal-slot-4",
          "variants": [
            {
              "id": "terminal-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "56 : 7 = ?",
              "answer": 8,
              "hintMinnie": "Welke vermenigvuldiging met 7 komt uit op 56?",
              "hintMoose": "7 × 8 = 56, dus 56 : 7 = 8.",
              "explanation": "56 : 7 = 8."
            },
            {
              "id": "terminal-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "72 : 8 = ?",
              "answer": 9,
              "hintMinnie": "Welke vermenigvuldiging met 8 komt uit op 72?",
              "hintMoose": "8 × 9 = 72, dus 72 : 8 = 9.",
              "explanation": "72 : 8 = 9.",
              "choices": [
                17,
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
      "id": "roundContainer",
      "anchorId": "roundContainer",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "roundContainer-slot-1",
          "variants": [
            {
              "id": "roundContainer-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 15
              },
              "answer": "Kwart over één",
              "choices": [
                "Kwart voor één",
                "Half twee",
                "Kwart over één",
                "Kwart over twee"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 3.",
              "hintMoose": "De grote wijzer staat op de 3. Dat betekent kwart over. De kleine wijzer staat net na de 1.",
              "explanation": "De grote wijzer staat op de 3. Dat betekent kwart over. De kleine wijzer staat net na de 1. Het is kwart over één."
            },
            {
              "id": "roundContainer-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 30
              },
              "answer": "Half tien",
              "choices": [
                "Half negen",
                "Half tien",
                "Negen uur",
                "Tien uur"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 6.",
              "hintMoose": "De grote wijzer staat op de 6. De kleine wijzer staat tussen 9 en 10. Dat heet half tien.",
              "explanation": "De grote wijzer staat op de 6. De kleine wijzer staat tussen 9 en 10. Dat heet half tien. Het is half tien."
            }
          ]
        },
        {
          "id": "roundContainer-slot-2",
          "variants": [
            {
              "id": "roundContainer-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 20
              },
              "answer": "Tien voor half zes",
              "choices": [
                "Tien over vijf",
                "Half zes",
                "Tien over half zes",
                "Tien voor half zes"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 4.",
              "hintMoose": "De grote wijzer staat op de 4: tien minuten voor half. De kleine wijzer staat tussen 5 en 6.",
              "explanation": "De grote wijzer staat op de 4: tien minuten voor half. De kleine wijzer staat tussen 5 en 6. Het is tien voor half zes."
            },
            {
              "id": "roundContainer-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 35
              },
              "answer": "Vijf over half drie",
              "choices": [
                "Vijf over half drie",
                "Vijf voor half drie",
                "Vijf over twee",
                "Half drie"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 7.",
              "hintMoose": "De grote wijzer staat op de 7: vijf minuten na half. De kleine wijzer staat tussen 2 en 3.",
              "explanation": "De grote wijzer staat op de 7: vijf minuten na half. De kleine wijzer staat tussen 2 en 3. Het is vijf over half drie."
            }
          ]
        },
        {
          "id": "roundContainer-slot-3",
          "variants": [
            {
              "id": "roundContainer-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 25
              },
              "answer": "Vijf voor half negen",
              "choices": [
                "Half negen",
                "Vijf over half negen",
                "Vijf voor half negen",
                "Vijf voor negen"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 5.",
              "hintMoose": "De grote wijzer staat op de 5: vijf minuten voor half. De kleine wijzer staat tussen 8 en 9.",
              "explanation": "De grote wijzer staat op de 5: vijf minuten voor half. De kleine wijzer staat tussen 8 en 9. Het is vijf voor half negen."
            },
            {
              "id": "roundContainer-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 40
              },
              "answer": "Tien over half elf",
              "choices": [
                "Tien voor half elf",
                "Tien over half elf",
                "Kwart voor elf",
                "Tien over tien"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 8.",
              "hintMoose": "De grote wijzer staat op de 8: tien minuten na half. De kleine wijzer staat tussen 10 en 11.",
              "explanation": "De grote wijzer staat op de 8: tien minuten na half. De kleine wijzer staat tussen 10 en 11. Het is tien over half elf."
            }
          ]
        },
        {
          "id": "roundContainer-slot-4",
          "variants": [
            {
              "id": "roundContainer-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 50
              },
              "answer": "Tien voor zeven",
              "choices": [
                "Tien over zes",
                "Vijf voor zeven",
                "Zeven uur",
                "Tien voor zeven"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 10.",
              "hintMoose": "De grote wijzer staat op de 10. Het duurt nog tien minuten tot zeven uur.",
              "explanation": "De grote wijzer staat op de 10. Het duurt nog tien minuten tot zeven uur. Het is tien voor zeven."
            },
            {
              "id": "roundContainer-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 45
              },
              "answer": "Kwart voor twaalf",
              "choices": [
                "Kwart voor twaalf",
                "Kwart over elf",
                "Half twaalf",
                "Kwart voor elf"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 9.",
              "hintMoose": "De grote wijzer staat op de 9. Het duurt nog een kwartier tot twaalf uur.",
              "explanation": "De grote wijzer staat op de 9. Het duurt nog een kwartier tot twaalf uur. Het is kwart voor twaalf."
            }
          ]
        }
      ]
    },
    {
      "id": "crate",
      "anchorId": "crate",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "crate-slot-1",
          "variants": [
            {
              "id": "crate-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 9 = ?",
              "answer": 72,
              "hintMinnie": "Denk aan 8 groepjes van 9.",
              "hintMoose": "Reken eerst 7 × 9 = 63. Tel er 9 bij.",
              "explanation": "8 × 9 = 72.",
              "choices": [
                72,
                81,
                71,
                73
              ]
            },
            {
              "id": "crate-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 6 = ?",
              "answer": 42,
              "hintMinnie": "Denk aan 7 groepjes van 6.",
              "hintMoose": "Reken eerst 6 × 6 = 36. Tel er 6 bij.",
              "explanation": "7 × 6 = 42."
            }
          ]
        },
        {
          "id": "crate-slot-2",
          "variants": [
            {
              "id": "crate-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 4 = ?",
              "answer": 20,
              "hintMinnie": "Denk aan 5 groepjes van 4.",
              "hintMoose": "Reken eerst 4 × 4 = 16. Tel er 4 bij.",
              "explanation": "5 × 4 = 20."
            },
            {
              "id": "crate-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "9 × 8 = ?",
              "answer": 72,
              "hintMinnie": "Denk aan 9 groepjes van 8.",
              "hintMoose": "Reken eerst 8 × 8 = 64. Tel er 8 bij.",
              "explanation": "9 × 8 = 72.",
              "choices": [
                80,
                71,
                72,
                73
              ]
            }
          ]
        },
        {
          "id": "crate-slot-3",
          "variants": [
            {
              "id": "crate-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "48 : 6 = ?",
              "answer": 8,
              "hintMinnie": "Welke vermenigvuldiging met 6 komt uit op 48?",
              "hintMoose": "6 × 8 = 48, dus 48 : 6 = 8.",
              "explanation": "48 : 6 = 8.",
              "choices": [
                8,
                14,
                7,
                9
              ]
            },
            {
              "id": "crate-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "63 : 9 = ?",
              "answer": 7,
              "hintMinnie": "Welke vermenigvuldiging met 9 komt uit op 63?",
              "hintMoose": "9 × 7 = 63, dus 63 : 9 = 7.",
              "explanation": "63 : 9 = 7."
            }
          ]
        },
        {
          "id": "crate-slot-4",
          "variants": [
            {
              "id": "crate-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Valente verdeelt 42 batterijen over 7 gelijke doosjes. Hoeveel batterijen gaan in elk doosje?",
              "answer": 6,
              "hintMinnie": "Welke vermenigvuldiging met 7 komt uit op 42?",
              "hintMoose": "7 × 6 = 42, dus 42 : 7 = 6.",
              "explanation": "42 : 7 = 6.",
              "choices": [
                6,
                13,
                5,
                7
              ]
            },
            {
              "id": "crate-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een zaklamp kost 4 euro. Valente koopt 5 zaklampen. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Denk aan 4 groepjes van 5.",
              "hintMoose": "Reken eerst 3 × 5 = 15. Tel er 5 bij.",
              "explanation": "4 × 5 = 20."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "terminal",
      "objectId": "terminal",
      "name": "Computerterminal",
      "shortName": "Computerterminal",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "terminal"
    },
    {
      "id": "roundContainer",
      "objectId": "roundContainer",
      "name": "Ronde container",
      "shortName": "Ronde container",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Lees de vier klokken af.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "roundContainer"
    },
    {
      "id": "crate",
      "objectId": "crate",
      "name": "Voorraadkist",
      "shortName": "Voorraadkist",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "crate"
    }
  ],
  "hotspots": [
    {
      "id": "sectorExit",
      "objectId": "sectorExit",
      "type": "exit",
      "name": "Sector 3",
      "defaultAction": "activate",
      "prompt": "De trap leidt naar de verlichte deur van Sector 3.",
      "solved": "De verkenning van Stella Montis is klaar."
    }
  ],
  "exitHotspotId": "sectorExit",
  "exitActionLabel": "Rond de verkenning af",
  "exits": [
    {
      "id": "sectorExit",
      "targetLevel": null,
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "terminal",
      "name": "Computerterminal",
      "description": "Onderzoek computerterminal met Valente."
    },
    {
      "id": "roundContainer",
      "name": "Ronde container",
      "description": "Onderzoek ronde container met Valente."
    },
    {
      "id": "crate",
      "name": "Voorraadkist",
      "description": "Onderzoek voorraadkist met Valente."
    }
  ],
  "intro": [
    "Sneeuw waait tussen de muren van Stella Montis. Valente wacht bij de terminal.",
    "Onderzoek de terminal, de ronde container en de voorraadkist. Rechts leidt een trap naar Sector 3."
  ],
  "theme": "ARC Atlas",
  "menu": {
    "illustration": "Levels/LVL-0035/stellamontis.png",
    "badge": "3 opdrachten",
    "detail": "Computerterminal, ronde container en voorraadkist"
  },
  "sceneEffects": [],
  "reward": {
    "title": "Stella Montis voltooid",
    "line": "Samen met Valente heeft Sven alle drie de plekken in Stella Montis onderzocht.",
    "art": "Levels/LVL-0035/Valente.png",
    "badge": "ARC Atlas voltooid"
  },
  "spiritLines": {
    "welcome": "Welkom in Stella Montis, Sven.",
    "moving": "De sneeuw ligt tot aan de rand van het platform.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De verkenning van Stella Montis is klaar."
  },
  "levelSemantics": {
    "setting": "een besneeuwd industrieel complex tussen hoge bergen",
    "mood": "koud, verlaten en geheimzinnig",
    "companionFocus": {
      "minnie": "het verlichte scherm en de sneeuw",
      "moose": "de hangende container en de trap naar Sector 3"
    }
  },
  "companionMoments": [
    {
      "id": "stella-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Stella Montis... één van de gevaarlijkste ARC-maps."
    },
    {
      "id": "stella-terminal",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "terminal",
      "text": "Dat scherm geeft nog licht. Zelfs in deze kou."
    },
    {
      "id": "stella-container",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "challengeId": "roundContainer",
      "text": "Die container hangt behoorlijk hoog."
    },
    {
      "id": "stella-crate",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "crate",
      "text": "Onder dat zeil blijft de voorraad vast droog."
    },
    {
      "id": "stella-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Die treden zien er glad uit."
    },
    {
      "id": "stella-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Ik zou nu best een warm plekje kunnen gebruiken."
    }
  ]
};
