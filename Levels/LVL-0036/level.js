window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0036"] = {
  "id": "LVL-0036",
  "title": "Frozen Railway",
  "subtitle": "Volg het besneeuwde spoor naar de bergpas.",
  "description": "Onderzoek met Niva de drie plekken in Frozen Railway.",
  "storageKey": "lvl-0036-frozen-progress",
  "progressKey": "lvl-0036-frozen-completed",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0036/frozenrailway.png",
    "depthmap": "Levels/LVL-0036/depthmap.png",
    "depthMap": "Levels/LVL-0036/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 110,
      "y": 580
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 75,
    "maxX": 2100,
    "minY": 480,
    "maxY": 690
  },
  "challengeLabel": "Uitdaging",
  "challengeCompleteLabel": "Opdracht afronden",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "ontdekkingen",
  "challengeCharacter": {
    "id": "CHR-FROZEN-NIVA",
    "name": "Niva",
    "portrait": "Levels/LVL-0036/Niva.png",
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
    "id": "CHR-FROZEN-NIVA",
    "name": "Niva",
    "portrait": "Levels/LVL-0036/Niva.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0036/Niva.png",
  "spiritName": "Niva",
  "walkPath": [
    {
      "id": "start",
      "x": 110,
      "y": 580
    },
    {
      "id": "stationClock-approach",
      "x": 620,
      "y": 580,
      "role": "approach"
    },
    {
      "id": "illuminatedBooth-approach",
      "x": 1026,
      "y": 592,
      "role": "approach"
    },
    {
      "id": "serviceBooth-approach",
      "x": 1507,
      "y": 585,
      "role": "approach"
    },
    {
      "id": "bridge-bend",
      "x": 1770,
      "y": 578
    },
    {
      "id": "exit-approach",
      "x": 1862,
      "y": 552,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "stationClock",
      "type": "rune",
      "center": {
        "x": 680,
        "y": 265
      },
      "radius": 42,
      "approachNode": "stationClock-approach",
      "label": "Stationsklok"
    },
    {
      "id": "illuminatedBooth",
      "type": "rune",
      "center": {
        "x": 1090,
        "y": 510
      },
      "radius": 49,
      "approachNode": "illuminatedBooth-approach",
      "label": "Verlicht diensthuisje"
    },
    {
      "id": "serviceBooth",
      "type": "rune",
      "center": {
        "x": 1568,
        "y": 513
      },
      "radius": 59,
      "approachNode": "serviceBooth-approach",
      "label": "Diensthuisje bij de brug"
    },
    {
      "id": "bridgePassage",
      "type": "exit",
      "center": {
        "x": 1899,
        "y": 469
      },
      "radius": 66,
      "approachNode": "exit-approach",
      "label": "Doorgang bij de brug"
    }
  ],
  "learningChallenges": [
    {
      "id": "stationClock",
      "anchorId": "stationClock",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "stationClock-slot-1",
          "variants": [
            {
              "id": "stationClock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Kwart over zeven",
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 15
              },
              "explanation": "De grote wijzer staat op de 3 en de kleine wijzer net na de 7. Het is kwart over zeven.",
              "choices": [
                "Kwart over zeven",
                "Kwart voor zeven",
                "Kwart over acht",
                "Half acht"
              ]
            },
            {
              "id": "stationClock-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Half negen",
              "visual": {
                "type": "digitalClock",
                "hour": 8,
                "minute": 30
              },
              "explanation": "Om 8:30 is het een half uur voor negen: half negen.",
              "choices": [
                "Half acht",
                "Half negen",
                "Negen uur",
                "Kwart over acht"
              ]
            }
          ]
        },
        {
          "id": "stationClock-slot-2",
          "variants": [
            {
              "id": "stationClock-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Kwart voor tien",
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 45
              },
              "explanation": "De grote wijzer staat op de 9. De kleine wijzer gaat naar de 10. Het is kwart voor tien.",
              "choices": [
                "Kwart over negen",
                "Kwart voor negen",
                "Half tien",
                "Kwart voor tien"
              ]
            },
            {
              "id": "stationClock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Vijf over zes",
              "visual": {
                "type": "digitalClock",
                "hour": 6,
                "minute": 5
              },
              "explanation": "Om 6:05 zijn vijf minuten na zes voorbij: vijf over zes.",
              "choices": [
                "Vijf voor zes",
                "Vijf over zes",
                "Vijf over zeven",
                "Zes uur"
              ]
            }
          ]
        },
        {
          "id": "stationClock-slot-3",
          "variants": [
            {
              "id": "stationClock-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Tien voor half elf",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 20
              },
              "explanation": "De grote wijzer staat op de 4: twintig minuten over tien. Dat is tien voor half elf.",
              "choices": [
                "Tien over tien",
                "Tien voor half tien",
                "Tien voor half elf",
                "Tien over half elf"
              ]
            },
            {
              "id": "stationClock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Vijf over half twaalf",
              "visual": {
                "type": "digitalClock",
                "hour": 11,
                "minute": 35
              },
              "explanation": "Om 11:35 zijn vijf minuten na half twaalf voorbij: vijf over half twaalf.",
              "choices": [
                "Vijf voor half twaalf",
                "Vijf over half elf",
                "Vijf over half twaalf",
                "Vijf voor twaalf"
              ]
            }
          ]
        },
        {
          "id": "stationClock-slot-4",
          "variants": [
            {
              "id": "stationClock-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Vijf voor één",
              "visual": {
                "type": "clock",
                "hour": 12,
                "minute": 55
              },
              "explanation": "De grote wijzer staat op de 11. Over vijf minuten is het één uur: vijf voor één.",
              "choices": [
                "Vijf over twaalf",
                "Vijf voor twaalf",
                "Vijf voor één",
                "Vijf over één"
              ]
            },
            {
              "id": "stationClock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Tien over half zes",
              "visual": {
                "type": "digitalClock",
                "hour": 5,
                "minute": 40
              },
              "explanation": "Om 5:40 zijn tien minuten na half zes voorbij: tien over half zes.",
              "choices": [
                "Tien voor half zes",
                "Tien over half vijf",
                "Tien over zes",
                "Tien over half zes"
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "illuminatedBooth",
      "anchorId": "illuminatedBooth",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "illuminatedBooth-slot-1",
          "variants": [
            {
              "id": "illuminatedBooth-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "4 × 5 = ?",
              "answer": 20,
              "hintParameters": {
                "a": 4,
                "b": 5
              },
              "explanation": "4 × 5 = 20."
            },
            {
              "id": "illuminatedBooth-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "3 × 10 = ?",
              "answer": 30,
              "hintParameters": {
                "a": 3,
                "b": 10
              },
              "explanation": "3 × 10 = 30.",
              "choices": [
                13,
                20,
                30,
                40
              ]
            }
          ]
        },
        {
          "id": "illuminatedBooth-slot-2",
          "variants": [
            {
              "id": "illuminatedBooth-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "hintParameters": {
                "a": 7,
                "b": 8
              },
              "explanation": "7 × 8 = 56.",
              "choices": [
                48,
                54,
                56,
                64
              ]
            },
            {
              "id": "illuminatedBooth-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 6 = ?",
              "answer": 54,
              "hintParameters": {
                "a": 9,
                "b": 6
              },
              "explanation": "9 × 6 = 54."
            }
          ]
        },
        {
          "id": "illuminatedBooth-slot-3",
          "variants": [
            {
              "id": "illuminatedBooth-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "In het diensthuisje liggen 4 dozen met elk 5 lampen. Hoeveel lampen zijn dat samen?",
              "answer": 20,
              "hintParameters": {
                "a": 4,
                "b": 5,
                "unit": "lampen"
              },
              "explanation": "4 × 5 = 20. Het antwoord is 20 lampen."
            },
            {
              "id": "illuminatedBooth-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Een monteur heeft 7 zakjes met elk 9 schroeven. Hoeveel schroeven heeft hij?",
              "answer": 63,
              "hintParameters": {
                "a": 7,
                "b": 9,
                "unit": "schroeven"
              },
              "explanation": "7 × 9 = 63. Het antwoord is 63 schroeven.",
              "choices": [
                56,
                63,
                72,
                49
              ]
            }
          ]
        },
        {
          "id": "illuminatedBooth-slot-4",
          "variants": [
            {
              "id": "illuminatedBooth-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "48 : 6 = ?",
              "answer": 8,
              "hintParameters": {
                "a": 48,
                "b": 6
              },
              "explanation": "48 : 6 = 8.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            },
            {
              "id": "illuminatedBooth-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "De monteur verdeelt 56 batterijen eerlijk over 7 bakken. Hoeveel batterijen komen in elke bak?",
              "answer": 8,
              "hintParameters": {
                "a": 56,
                "b": 7,
                "unit": "batterijen"
              },
              "explanation": "56 : 7 = 8. Het antwoord is 8 batterijen."
            }
          ]
        }
      ]
    },
    {
      "id": "serviceBooth",
      "anchorId": "serviceBooth",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "serviceBooth-slot-1",
          "variants": [
            {
              "id": "serviceBooth-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 6 = ?",
              "answer": 48,
              "hintParameters": {
                "a": 8,
                "b": 6
              },
              "explanation": "8 × 6 = 48."
            },
            {
              "id": "serviceBooth-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "7 × 9 = ?",
              "answer": 63,
              "hintParameters": {
                "a": 7,
                "b": 9
              },
              "explanation": "7 × 9 = 63.",
              "choices": [
                54,
                56,
                63,
                72
              ]
            }
          ]
        },
        {
          "id": "serviceBooth-slot-2",
          "variants": [
            {
              "id": "serviceBooth-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "5 × 2 = ?",
              "answer": 10,
              "hintParameters": {
                "a": 5,
                "b": 2
              },
              "explanation": "5 × 2 = 10.",
              "choices": [
                7,
                10,
                12,
                15
              ]
            },
            {
              "id": "serviceBooth-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 7 = ?",
              "answer": 56,
              "hintParameters": {
                "a": 8,
                "b": 7
              },
              "explanation": "8 × 7 = 56."
            }
          ]
        },
        {
          "id": "serviceBooth-slot-3",
          "variants": [
            {
              "id": "serviceBooth-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Bij de installatie liggen 8 bundels met elk 7 kabels. Hoeveel kabels zijn dat samen?",
              "answer": 56,
              "hintParameters": {
                "a": 8,
                "b": 7,
                "unit": "kabels"
              },
              "explanation": "8 × 7 = 56. Het antwoord is 56 kabels."
            },
            {
              "id": "serviceBooth-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 3 gereedschapskisten met elk 5 sleutels. Hoeveel sleutels zijn dat samen?",
              "answer": 15,
              "hintParameters": {
                "a": 3,
                "b": 5,
                "unit": "sleutels"
              },
              "explanation": "3 × 5 = 15. Het antwoord is 15 sleutels.",
              "choices": [
                8,
                10,
                15,
                20
              ]
            }
          ]
        },
        {
          "id": "serviceBooth-slot-4",
          "variants": [
            {
              "id": "serviceBooth-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "63 : 9 = ?",
              "answer": 7,
              "hintParameters": {
                "a": 63,
                "b": 9
              },
              "explanation": "63 : 9 = 7.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            },
            {
              "id": "serviceBooth-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Een monteur verdeelt 20 bouten eerlijk over 4 zakjes. Hoeveel bouten komen in elk zakje?",
              "answer": 5,
              "hintParameters": {
                "a": 20,
                "b": 4,
                "unit": "bouten"
              },
              "explanation": "20 : 4 = 5. Het antwoord is 5 bouten.",
              "choices": [
                4,
                5,
                6,
                8
              ]
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "stationClock",
      "objectId": "stationClock",
      "name": "Stationsklok",
      "shortName": "Stationsklok",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt de stationsklok met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "stationClock"
    },
    {
      "id": "illuminatedBooth",
      "objectId": "illuminatedBooth",
      "name": "Verlicht diensthuisje",
      "shortName": "Verlicht diensthuisje",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt het verlichte diensthuisje met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "illuminatedBooth"
    },
    {
      "id": "serviceBooth",
      "objectId": "serviceBooth",
      "name": "Diensthuisje bij de brug",
      "shortName": "Diensthuisje bij de brug",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt het diensthuisje bij de brug met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "serviceBooth"
    }
  ],
  "hotspots": [
    {
      "id": "bridgePassage",
      "objectId": "bridgePassage",
      "type": "exit",
      "name": "Doorgang bij de brug",
      "defaultAction": "activate",
      "prompt": "Via de doorgang bij de brug gaat de reis verder.",
      "solved": "De verkenning van Frozen Railway is klaar."
    }
  ],
  "exitHotspotId": "bridgePassage",
  "exitActionLabel": "Ga verder",
  "exits": [
    {
      "id": "bridgePassage",
      "targetLevel": "LVL-0037",
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "stationClock",
      "name": "Stationsklok",
      "description": "Onderzoek de stationsklok met Niva."
    },
    {
      "id": "illuminatedBooth",
      "name": "Verlicht diensthuisje",
      "description": "Onderzoek het verlichte diensthuisje met Niva."
    },
    {
      "id": "serviceBooth",
      "name": "Diensthuisje bij de brug",
      "description": "Onderzoek het diensthuisje bij de brug met Niva."
    }
  ],
  "intro": [
    "De trein staat stil tussen sneeuw en bergen. Verderop ligt een doorgang onder de brug.",
    "Onderzoek de drie plekken. Daarna kun je verder via de doorgang bij de brug."
  ],
  "theme": "Frozen Atlas",
  "menu": {
    "illustration": "Levels/LVL-0036/frozenrailway.png",
    "badge": "3 opdrachten",
    "detail": "Stationsklok, verlicht diensthuisje en diensthuisje bij de brug"
  },
  "reward": {
    "title": "Frozen Railway voltooid",
    "line": "Samen met Niva heeft Sven alle drie de plekken in Frozen Railway onderzocht.",
    "art": "Levels/LVL-0036/Niva.png",
    "badge": "Frozen Atlas"
  },
  "spiritLines": {
    "welcome": "Welkom in Frozen Railway, Sven.",
    "moving": "Het pad loopt verder door de sneeuw.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De reis door Frozen Atlas gaat verder."
  },
  "levelSemantics": {
    "setting": "Volg het besneeuwde spoor naar de bergpas.",
    "mood": "koud, stil en geheimzinnig",
    "companionFocus": {
      "minnie": "Stationsklok",
      "moose": "Doorgang bij de brug"
    }
  },
  "companionPolicy": {
    "disabledEvents": [
      "CHALLENGE_OPEN",
      "CHALLENGE_SUCCESS",
      "LEVEL_PROGRESS_MILESTONE"
    ],
    "attentionOncePerVisit": true
  },
  "companionMoments": [
    {
      "id": "frozen-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Die trein... die gaat niet meer op tijd aankomen."
    },
    {
      "id": "frozen-stationClock",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "stationClock",
      "text": "Die stationsklok hangt hoog boven het spoor."
    },
    {
      "id": "frozen-illuminatedBooth",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "challengeId": "illuminatedBooth",
      "text": "Er brandt nog licht in dat huisje."
    },
    {
      "id": "frozen-serviceBooth",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "serviceBooth",
      "text": "Dit diensthuisje staat vlak bij de brug."
    },
    {
      "id": "frozen-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Nog {remainingChallenges} te gaan. Daarna kunnen we verder."
    },
    {
      "id": "frozen-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alles klaar. We kunnen naar de bergpas."
    },
    {
      "id": "frozen-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Een stukje dichter bij de Gondola."
    }
  ],
  "ambientFlybys": [
    {
      "id": "bully-1",
      "label": "bully",
      "frameA": "assets/ambient/flybys/bully/frame_001.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/bully/bully.mp3",
      "path": [
        {
          "x": 707,
          "y": 474
        },
        {
          "x": 1134,
          "y": 475
        },
        {
          "x": 2119,
          "y": 477
        }
      ],
      "scale": 0.62,
      "speed": 100,
      "flapFrequencyHz": 7,
      "faceFlightDirection": false,
      "mirrorX": true,
      "intervalMinMs": 5000,
      "intervalMaxMs": 15000,
      "syncKey": "",
      "startDelayMs": 0,
      "softness": 0.75,
      "saturation": 1,
      "soundVolume": 0.4,
      "rotateAlongPath": false,
      "maxRotationDeg": 8,
      "frames": [
        "assets/ambient/flybys/bully/frame_001.png",
        "assets/ambient/flybys/bully/frame_002.png",
        "assets/ambient/flybys/bully/frame_003.png",
        "assets/ambient/flybys/bully/frame_004.png",
        "assets/ambient/flybys/bully/frame_005.png",
        "assets/ambient/flybys/bully/frame_006.png",
        "assets/ambient/flybys/bully/frame_007.png",
        "assets/ambient/flybys/bully/frame_008.png",
        "assets/ambient/flybys/bully/frame_009.png",
        "assets/ambient/flybys/bully/frame_010.png",
        "assets/ambient/flybys/bully/frame_011.png",
        "assets/ambient/flybys/bully/frame_012.png",
        "assets/ambient/flybys/bully/frame_013.png",
        "assets/ambient/flybys/bully/frame_014.png",
        "assets/ambient/flybys/bully/frame_015.png",
        "assets/ambient/flybys/bully/frame_016.png",
        "assets/ambient/flybys/bully/frame_017.png",
        "assets/ambient/flybys/bully/frame_018.png",
        "assets/ambient/flybys/bully/frame_019.png",
        "assets/ambient/flybys/bully/frame_020.png",
        "assets/ambient/flybys/bully/frame_021.png",
        "assets/ambient/flybys/bully/frame_022.png",
        "assets/ambient/flybys/bully/frame_023.png",
        "assets/ambient/flybys/bully/frame_024.png",
        "assets/ambient/flybys/bully/frame_025.png",
        "assets/ambient/flybys/bully/frame_026.png",
        "assets/ambient/flybys/bully/frame_027.png",
        "assets/ambient/flybys/bully/frame_028.png",
        "assets/ambient/flybys/bully/frame_029.png",
        "assets/ambient/flybys/bully/frame_030.png",
        "assets/ambient/flybys/bully/frame_031.png",
        "assets/ambient/flybys/bully/frame_032.png",
        "assets/ambient/flybys/bully/frame_033.png",
        "assets/ambient/flybys/bully/frame_034.png",
        "assets/ambient/flybys/bully/frame_035.png",
        "assets/ambient/flybys/bully/frame_036.png",
        "assets/ambient/flybys/bully/frame_037.png",
        "assets/ambient/flybys/bully/frame_038.png",
        "assets/ambient/flybys/bully/frame_039.png",
        "assets/ambient/flybys/bully/frame_040.png",
        "assets/ambient/flybys/bully/frame_041.png",
        "assets/ambient/flybys/bully/frame_042.png",
        "assets/ambient/flybys/bully/frame_043.png",
        "assets/ambient/flybys/bully/frame_044.png",
        "assets/ambient/flybys/bully/frame_045.png",
        "assets/ambient/flybys/bully/frame_046.png",
        "assets/ambient/flybys/bully/frame_047.png",
        "assets/ambient/flybys/bully/frame_048.png",
        "assets/ambient/flybys/bully/frame_049.png",
        "assets/ambient/flybys/bully/frame_050.png",
        "assets/ambient/flybys/bully/frame_051.png",
        "assets/ambient/flybys/bully/frame_052.png",
        "assets/ambient/flybys/bully/frame_053.png",
        "assets/ambient/flybys/bully/frame_054.png",
        "assets/ambient/flybys/bully/frame_055.png",
        "assets/ambient/flybys/bully/frame_056.png",
        "assets/ambient/flybys/bully/frame_057.png",
        "assets/ambient/flybys/bully/frame_058.png",
        "assets/ambient/flybys/bully/frame_059.png",
        "assets/ambient/flybys/bully/frame_060.png",
        "assets/ambient/flybys/bully/frame_061.png",
        "assets/ambient/flybys/bully/frame_062.png",
        "assets/ambient/flybys/bully/frame_063.png",
        "assets/ambient/flybys/bully/frame_064.png",
        "assets/ambient/flybys/bully/frame_065.png"
      ],
      "playback": "loop",
      "animationFps": 24,
      "endBehavior": "despawn",
      "depthOcclusion": true,
      "depthBias": -0.342,
      "depthMode": "fixed",
      "fixedDepth": 0.627,
      "brightness": 0.73,
      "motionProfile": "smooth",
      "wobble": 14,
      "speedVariation": 0.14,
      "flutterFrequency": 2.1
    },
    {
      "id": "hornet-1",
      "label": "hornet",
      "frameA": "assets/ambient/flybys/hornet/hornet.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/hornet/hornet.mp3",
      "path": [
        {
          "x": 1991,
          "y": -27
        },
        {
          "x": 1846,
          "y": 112
        },
        {
          "x": 1226,
          "y": 115
        },
        {
          "x": 488,
          "y": 108
        },
        {
          "x": 234,
          "y": -45
        }
      ],
      "scale": 0.22,
      "speed": 100,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 8000,
      "intervalMaxMs": 16000,
      "syncKey": "",
      "startDelayMs": 0,
      "softness": 1.5,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": false,
      "maxRotationDeg": 7,
      "soundTriggers": [
        "during",
        "tap"
      ],
      "motionProfile": "smooth",
      "wobble": 14,
      "speedVariation": 0.14,
      "flutterFrequency": 2.1
    }
  ]
};
