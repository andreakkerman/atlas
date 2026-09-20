window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0033"] = {
  "id": "LVL-0033",
  "title": "Buried City",
  "subtitle": "Volg het zandpad door de verlaten stad.",
  "description": "Sven verkent de kerkklok, de schoorsteen en de ARC Probe met Valente.",
  "storageKey": "lvl-0033-arc-progress",
  "progressKey": "lvl-0033-arc-completed",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0033/buriedcity.png",
    "depthmap": "Levels/LVL-0033/depthmap.png",
    "depthMap": "Levels/LVL-0033/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 231,
      "y": 439
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 90,
    "maxX": 2020,
    "minY": 430,
    "maxY": 580
  },
  "challengeLabel": "Uitdaging",
  "challengeCompleteLabel": "Opdracht afronden",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "ontdekkingen",
  "challengeCharacter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0033/Valente.png",
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
    "portrait": "Levels/LVL-0033/Valente.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0033/Valente.png",
  "spiritName": "Valente",
  "walkPath": [
    {
      "id": "start",
      "x": 231,
      "y": 439
    },
    {
      "id": "sandy-bend",
      "x": 347,
      "y": 488
    },
    {
      "id": "churchClock-approach",
      "x": 459,
      "y": 502,
      "role": "approach"
    },
    {
      "id": "chimney-approach",
      "x": 800,
      "y": 538,
      "role": "approach"
    },
    {
      "id": "sandy-middle",
      "x": 1208,
      "y": 564
    },
    {
      "id": "arcProbe-approach",
      "x": 1450,
      "y": 576,
      "role": "approach"
    },
    {
      "id": "metro-bend",
      "x": 1680,
      "y": 550
    },
    {
      "id": "exit-approach",
      "x": 1784,
      "y": 531,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "churchClock",
      "type": "rune",
      "center": {
        "x": 503,
        "y": 269
      },
      "radius": 48,
      "approachNode": "churchClock-approach",
      "label": "Kerkklok"
    },
    {
      "id": "chimney",
      "type": "rune",
      "center": {
        "x": 873,
        "y": 240
      },
      "radius": 50,
      "approachNode": "chimney-approach",
      "label": "Schoorsteen"
    },
    {
      "id": "arcProbe",
      "type": "rune",
      "center": {
        "x": 1448,
        "y": 375
      },
      "radius": 42,
      "approachNode": "arcProbe-approach",
      "label": "ARC Probe"
    },
    {
      "id": "metroExit",
      "type": "exit",
      "center": {
        "x": 1847,
        "y": 478
      },
      "radius": 53,
      "approachNode": "exit-approach",
      "label": "Metro-ingang"
    }
  ],
  "learningChallenges": [
    {
      "id": "churchClock",
      "anchorId": "churchClock",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "churchClock-slot-1",
          "variants": [
            {
              "id": "churchClock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 15
              },
              "answer": "Kwart over drie",
              "choices": [
                "Kwart voor drie",
                "Half vier",
                "Kwart over drie",
                "Kwart over vier"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 3.",
              "hintMoose": "De grote wijzer staat op de 3. Dat is kwart over. De kleine wijzer staat net na de 3.",
              "explanation": "De grote wijzer staat op de 3. Dat is kwart over. De kleine wijzer staat net na de 3."
            },
            {
              "id": "churchClock-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 30
              },
              "answer": "Half acht",
              "choices": [
                "Half zeven",
                "Half acht",
                "Zeven uur",
                "Acht uur"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 6.",
              "hintMoose": "De grote wijzer staat op de 6. De kleine wijzer staat tussen 7 en 8. Dat heet half acht.",
              "explanation": "De grote wijzer staat op de 6. De kleine wijzer staat tussen 7 en 8. Dat heet half acht."
            }
          ]
        },
        {
          "id": "churchClock-slot-2",
          "variants": [
            {
              "id": "churchClock-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 20
              },
              "answer": "Tien voor half drie",
              "choices": [
                "Tien over twee",
                "Tien voor half drie",
                "Tien over half drie",
                "Half drie"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 4.",
              "hintMoose": "De grote wijzer staat op de 4: tien minuten voor half. De kleine wijzer staat tussen 2 en 3, dus tien voor half drie.",
              "explanation": "De grote wijzer staat op de 4: tien minuten voor half. De kleine wijzer staat tussen 2 en 3, dus tien voor half drie."
            },
            {
              "id": "churchClock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 35
              },
              "answer": "Vijf over half negen",
              "choices": [
                "Vijf over acht",
                "Vijf voor half negen",
                "Half negen",
                "Vijf over half negen"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 7.",
              "hintMoose": "De grote wijzer staat op de 7: vijf minuten na half. De kleine wijzer staat tussen 8 en 9, dus vijf over half negen.",
              "explanation": "De grote wijzer staat op de 7: vijf minuten na half. De kleine wijzer staat tussen 8 en 9, dus vijf over half negen."
            }
          ]
        },
        {
          "id": "churchClock-slot-3",
          "variants": [
            {
              "id": "churchClock-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 4,
                "minute": 25
              },
              "answer": "Vijf voor half vijf",
              "choices": [
                "Vijf voor half vijf",
                "Vijf over half vijf",
                "Half vijf",
                "Vijf voor vijf"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 5.",
              "hintMoose": "De grote wijzer staat op de 5: vijf minuten voor half. De kleine wijzer staat tussen 4 en 5, dus vijf voor half vijf.",
              "explanation": "De grote wijzer staat op de 5: vijf minuten voor half. De kleine wijzer staat tussen 4 en 5, dus vijf voor half vijf."
            },
            {
              "id": "churchClock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 40
              },
              "answer": "Tien over half zeven",
              "choices": [
                "Tien voor half zeven",
                "Kwart voor zeven",
                "Tien over half zeven",
                "Tien over zes"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 8.",
              "hintMoose": "De grote wijzer staat op de 8: tien minuten na half. De kleine wijzer staat tussen 6 en 7, dus tien over half zeven.",
              "explanation": "De grote wijzer staat op de 8: tien minuten na half. De kleine wijzer staat tussen 6 en 7, dus tien over half zeven."
            }
          ]
        },
        {
          "id": "churchClock-slot-4",
          "variants": [
            {
              "id": "churchClock-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 50
              },
              "answer": "Tien voor elf",
              "choices": [
                "Tien over tien",
                "Tien voor elf",
                "Vijf voor elf",
                "Elf uur"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 10.",
              "hintMoose": "De grote wijzer staat op de 10. Het duurt nog tien minuten tot elf uur.",
              "explanation": "De grote wijzer staat op de 10. Het duurt nog tien minuten tot elf uur."
            },
            {
              "id": "churchClock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "visual": {
                "type": "clock",
                "hour": 12,
                "minute": 5
              },
              "answer": "Vijf over twaalf",
              "choices": [
                "Vijf voor twaalf",
                "Tien over twaalf",
                "Vijf over twaalf",
                "Vijf over één"
              ],
              "hintMinnie": "Kijk eerst naar de grote wijzer. Die staat op de 1.",
              "hintMoose": "De grote wijzer staat op de 1: vijf minuten over. De kleine wijzer staat net na de 12.",
              "explanation": "De grote wijzer staat op de 1: vijf minuten over. De kleine wijzer staat net na de 12."
            }
          ]
        }
      ]
    },
    {
      "id": "chimney",
      "anchorId": "chimney",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "chimney-slot-1",
          "variants": [
            {
              "id": "chimney-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 7 = ?",
              "answer": 56,
              "hintMinnie": "Denk aan 8 groepjes van 7.",
              "hintMoose": "Reken eerst 7 × 7 = 49. Tel er nog 7 bij.",
              "explanation": "8 × 7 = 56."
            },
            {
              "id": "chimney-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 8 = ?",
              "answer": 48,
              "choices": [
                42,
                48,
                54,
                56
              ],
              "hintMinnie": "Denk aan 6 groepjes van 8.",
              "hintMoose": "Reken eerst 5 × 8 = 40. Tel er nog 8 bij.",
              "explanation": "6 × 8 = 48."
            }
          ]
        },
        {
          "id": "chimney-slot-2",
          "variants": [
            {
              "id": "chimney-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "9 × 4 = ?",
              "answer": 36,
              "choices": [
                32,
                40,
                36,
                45
              ],
              "hintMinnie": "Denk aan 9 groepjes van 4.",
              "hintMoose": "Reken eerst 8 × 4 = 32. Tel er nog 4 bij.",
              "explanation": "9 × 4 = 36."
            },
            {
              "id": "chimney-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 6 = ?",
              "answer": 42,
              "hintMinnie": "Denk aan 7 groepjes van 6.",
              "hintMoose": "Reken eerst 6 × 6 = 36. Tel er nog 6 bij.",
              "explanation": "7 × 6 = 42."
            }
          ]
        },
        {
          "id": "chimney-slot-3",
          "variants": [
            {
              "id": "chimney-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er staan 3 dozen met elk 8 dakpannen. Hoeveel dakpannen zijn dat samen?",
              "answer": 24,
              "hintMinnie": "Denk aan 3 groepjes van 8.",
              "hintMoose": "Reken eerst 2 × 8 = 16. Tel er nog 8 bij.",
              "explanation": "3 × 8 = 24."
            },
            {
              "id": "chimney-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er liggen 5 rijen met elk 6 bakstenen. Hoeveel bakstenen zijn dat samen?",
              "answer": 30,
              "choices": [
                25,
                35,
                30,
                36
              ],
              "hintMinnie": "Denk aan 5 groepjes van 6.",
              "hintMoose": "Reken eerst 4 × 6 = 24. Tel er nog 6 bij.",
              "explanation": "5 × 6 = 30."
            }
          ]
        },
        {
          "id": "chimney-slot-4",
          "variants": [
            {
              "id": "chimney-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "54 : 9 = ?",
              "answer": 6,
              "hintMinnie": "Welke keersom met 9 geeft 54?",
              "hintMoose": "9 × 6 = 54. Er passen dus 6 groepjes van 9 in 54.",
              "explanation": "54 : 9 = 6."
            },
            {
              "id": "chimney-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "56 : 7 = ?",
              "answer": 8,
              "choices": [
                6,
                7,
                9,
                8
              ],
              "hintMinnie": "Welke keersom met 7 geeft 56?",
              "hintMoose": "7 × 8 = 56. Er passen dus 8 groepjes van 7 in 56.",
              "explanation": "56 : 7 = 8."
            }
          ]
        }
      ]
    },
    {
      "id": "arcProbe",
      "anchorId": "arcProbe",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "arcProbe-slot-1",
          "variants": [
            {
              "id": "arcProbe-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 8 = ?",
              "answer": 72,
              "hintMinnie": "Denk aan 9 groepjes van 8.",
              "hintMoose": "Reken eerst 8 × 8 = 64. Tel er nog 8 bij.",
              "explanation": "9 × 8 = 72."
            },
            {
              "id": "arcProbe-1b",
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
                56
              ],
              "hintMinnie": "Denk aan 7 groepjes van 9.",
              "hintMoose": "Reken eerst 6 × 9 = 54. Tel er nog 9 bij.",
              "explanation": "7 × 9 = 63."
            }
          ]
        },
        {
          "id": "arcProbe-slot-2",
          "variants": [
            {
              "id": "arcProbe-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 4 = ?",
              "answer": 24,
              "choices": [
                20,
                28,
                24,
                32
              ],
              "hintMinnie": "Denk aan 6 groepjes van 4.",
              "hintMoose": "Reken eerst 5 × 4 = 20. Tel er nog 4 bij.",
              "explanation": "6 × 4 = 24."
            },
            {
              "id": "arcProbe-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 5 = ?",
              "answer": 40,
              "hintMinnie": "Denk aan 8 groepjes van 5.",
              "hintMoose": "Reken eerst 7 × 5 = 35. Tel er nog 5 bij.",
              "explanation": "8 × 5 = 40."
            }
          ]
        },
        {
          "id": "arcProbe-slot-3",
          "variants": [
            {
              "id": "arcProbe-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Valente heeft 6 pakjes met elk 7 batterijen. Hoeveel batterijen zijn dat samen?",
              "answer": 42,
              "choices": [
                42,
                36,
                48,
                49
              ],
              "hintMinnie": "Denk aan 6 groepjes van 7.",
              "hintMoose": "Reken eerst 5 × 7 = 35. Tel er nog 7 bij.",
              "explanation": "6 × 7 = 42."
            },
            {
              "id": "arcProbe-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 4 doosjes met elk 5 schroeven. Hoeveel schroeven zijn dat samen?",
              "answer": 20,
              "hintMinnie": "Denk aan 4 groepjes van 5.",
              "hintMoose": "Reken eerst 3 × 5 = 15. Tel er nog 5 bij.",
              "explanation": "4 × 5 = 20."
            }
          ]
        },
        {
          "id": "arcProbe-slot-4",
          "variants": [
            {
              "id": "arcProbe-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Valente verdeelt 48 batterijen eerlijk over 6 dozen. Hoeveel batterijen komen in elke doos?",
              "answer": 8,
              "choices": [
                6,
                7,
                8,
                9
              ],
              "hintMinnie": "Welke keersom met 6 geeft 48?",
              "hintMoose": "6 × 8 = 48. Er passen dus 8 groepjes van 6 in 48.",
              "explanation": "48 : 6 = 8."
            },
            {
              "id": "arcProbe-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een pad van 72 meter wordt verdeeld in 8 gelijke stukken. Hoeveel meter is elk stuk?",
              "answer": 9,
              "hintMinnie": "Welke keersom met 8 geeft 72?",
              "hintMoose": "8 × 9 = 72. Er passen dus 9 groepjes van 8 in 72.",
              "explanation": "72 : 8 = 9."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "churchClock",
      "objectId": "churchClock",
      "name": "Kerkklok",
      "shortName": "Kerkklok",
      "defaultAction": "activate",
      "intro": "Valente heeft een klok om samen te bekijken.",
      "prompt": "Lees de vier klokken.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "churchClock"
    },
    {
      "id": "chimney",
      "objectId": "chimney",
      "name": "Schoorsteen",
      "shortName": "Schoorsteen",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "chimney"
    },
    {
      "id": "arcProbe",
      "objectId": "arcProbe",
      "name": "ARC Probe",
      "shortName": "ARC Probe",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "arcProbe"
    }
  ],
  "hotspots": [
    {
      "id": "metroExit",
      "objectId": "metroExit",
      "type": "exit",
      "name": "Metro-ingang",
      "defaultAction": "activate",
      "prompt": "De trap naar de metro ligt aan het einde van het zandpad.",
      "solved": "De verkenning van Buried City is klaar."
    }
  ],
  "exitHotspotId": "metroExit",
  "exitActionLabel": "Rond de verkenning af",
  "exits": [
    {
      "id": "metroExit",
      "targetLevel": "LVL-0034",
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "churchClock",
      "name": "Kerkklok",
      "description": "Onderzoek de kerkklok met Valente."
    },
    {
      "id": "chimney",
      "name": "Schoorsteen",
      "description": "Onderzoek de schoorsteen met Valente."
    },
    {
      "id": "arcProbe",
      "name": "ARC Probe",
      "description": "Onderzoek de arc probe met Valente."
    }
  ],
  "intro": [
    "Valente wacht bij de verlaten stad. Zand ligt tussen de huizen en palmen.",
    "Bekijk de kerkklok, de schoorsteen en de blauwe ARC Probe. Bij de metro-ingang eindigt jullie verkenning."
  ],
  "theme": "ARC Atlas",
  "menu": {
    "illustration": "Levels/LVL-0033/buriedcity.png",
    "badge": "3 opdrachten",
    "detail": "Kerkklok, schoorsteen en ARC Probe"
  },
  "sceneEffects": [
    {
      "id": "sun-presence-01",
      "label": "Warm day sun 1",
      "presetId": "sun-presence",
      "variantId": "warm-day-sun",
      "presetVersion": 1,
      "enabled": true,
      "seed": 833553467,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 248,
        "y": 189,
        "radius": 94
      },
      "overrides": {
        "rayEndAngle": 90
      }
    }
  ],
  "reward": {
    "title": "Buried City voltooid",
    "line": "Samen met Valente heeft Sven alle drie de plekken in de verlaten stad onderzocht.",
    "art": "Levels/LVL-0033/Valente.png",
    "badge": "Buried City verkend",
    "nextLevelId": "LVL-0034",
    "nextLabel": "Naar Riven Tides"
  },
  "spiritLines": {
    "welcome": "Welkom in Buried City, Sven.",
    "moving": "Tussen deze huizen ligt nog een oud zandpad.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De verkenning van Buried City is klaar."
  },
  "levelSemantics": {
    "setting": "een verlaten stad met zand, palmen en een metro-ingang",
    "mood": "warm, stil en nieuwsgierig",
    "companionFocus": {
      "minnie": "de kerkklok en planten tussen de huizen",
      "moose": "stevige muren en de schaduw bij de metro"
    }
  },
  "companionMoments": [
    {
      "id": "buried-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Buried City… ooit was dit Marano. Kijken wat het zand heeft bewaard?"
    },
    {
      "id": "buried-clock",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "text": "Die klok is vanaf bijna de hele straat te zien.",
      "challengeId": "churchClock"
    },
    {
      "id": "buried-chimney",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Die schoorsteen staat nog recht. Dat huis is stevig gebouwd.",
      "challengeId": "chimney"
    },
    {
      "id": "buried-probe",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "text": "Dat blauwe rondje steekt mooi boven het zand uit.",
      "challengeId": "arcProbe"
    },
    {
      "id": "buried-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Het is daar beneden vast koeler. Ik wacht hier bij Valente."
    },
    {
      "id": "buried-open",
      "event": "CHALLENGE_OPEN",
      "speaker": "moose",
      "text": "Hier in de schaduw is het best prettig."
    },
    {
      "id": "buried-success",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Misschien heeft iemand hier vroeger elke dag gewoond."
    },
    {
      "id": "buried-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Daar is de metrotrap. De leuning staat nog stevig."
    },
    {
      "id": "buried-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Dag, stille stad. Ik hoop dat de palmen blijven groeien."
    }
  ]
};
