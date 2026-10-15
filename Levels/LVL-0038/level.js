window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0038"] = {
  "id": "LVL-0038",
  "title": "Old Town",
  "subtitle": "Onderzoek het besneeuwde dorpsplein van Almatera.",
  "description": "Onderzoek met Niva de drie plekken in Old Town.",
  "storageKey": "lvl-0038-frozen-progress",
  "progressKey": "lvl-0038-frozen-completed",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0038/oldtown.png",
    "depthmap": "Levels/LVL-0038/depthmap.png",
    "depthMap": "Levels/LVL-0038/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 180,
      "y": 578
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
    "portrait": "Levels/LVL-0038/Niva.png",
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
    "portrait": "Levels/LVL-0038/Niva.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0038/Niva.png",
  "spiritName": "Niva",
  "walkPath": [
    {
      "id": "start",
      "x": 180,
      "y": 578
    },
    {
      "id": "welcomeSign-approach",
      "x": 390,
      "y": 626,
      "role": "approach"
    },
    {
      "id": "square-left",
      "x": 690,
      "y": 651
    },
    {
      "id": "statue-approach",
      "x": 985,
      "y": 666,
      "role": "approach"
    },
    {
      "id": "square-right",
      "x": 1260,
      "y": 646
    },
    {
      "id": "churchClock-approach",
      "x": 1500,
      "y": 623,
      "role": "approach"
    },
    {
      "id": "street-bend",
      "x": 1760,
      "y": 610
    },
    {
      "id": "exit-approach",
      "x": 1878,
      "y": 599,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "welcomeSign",
      "type": "rune",
      "center": {
        "x": 251,
        "y": 355
      },
      "radius": 139,
      "approachNode": "welcomeSign-approach",
      "label": "Welkomstbord van Almatera"
    },
    {
      "id": "statue",
      "type": "rune",
      "center": {
        "x": 965,
        "y": 396
      },
      "radius": 100,
      "approachNode": "statue-approach",
      "label": "Standbeeld"
    },
    {
      "id": "churchClock",
      "type": "rune",
      "center": {
        "x": 1478,
        "y": 350
      },
      "radius": 43,
      "approachNode": "churchClock-approach",
      "label": "Kerkklok"
    },
    {
      "id": "villagePassage",
      "type": "exit",
      "center": {
        "x": 1902,
        "y": 483
      },
      "radius": 79,
      "approachNode": "exit-approach",
      "label": "Doorgang voorbij het plein"
    }
  ],
  "learningChallenges": [
    {
      "id": "welcomeSign",
      "anchorId": "welcomeSign",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "welcomeSign-slot-1",
          "variants": [
            {
              "id": "welcomeSign-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 9 = ?",
              "answer": 72,
              "hintParameters": {
                "a": 8,
                "b": 9
              },
              "explanation": "8 × 9 = 72."
            },
            {
              "id": "welcomeSign-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "7 × 6 = ?",
              "answer": 42,
              "hintParameters": {
                "a": 7,
                "b": 6
              },
              "explanation": "7 × 6 = 42.",
              "choices": [
                36,
                42,
                48,
                49
              ]
            }
          ]
        },
        {
          "id": "welcomeSign-slot-2",
          "variants": [
            {
              "id": "welcomeSign-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "9 × 7 = ?",
              "answer": 63,
              "hintParameters": {
                "a": 9,
                "b": 7
              },
              "explanation": "9 × 7 = 63.",
              "choices": [
                54,
                56,
                63,
                72
              ]
            },
            {
              "id": "welcomeSign-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 8 = ?",
              "answer": 48,
              "hintParameters": {
                "a": 6,
                "b": 8
              },
              "explanation": "6 × 8 = 48."
            }
          ]
        },
        {
          "id": "welcomeSign-slot-3",
          "variants": [
            {
              "id": "welcomeSign-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Bij het welkomstbord staan 6 houders met elk 8 folders. Hoeveel folders zijn dat samen?",
              "answer": 48,
              "hintParameters": {
                "a": 6,
                "b": 8,
                "unit": "folders"
              },
              "explanation": "6 × 8 = 48. Het antwoord is 48 folders."
            },
            {
              "id": "welcomeSign-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De gids heeft 3 stapels met elk 10 dorpskaarten. Hoeveel dorpskaarten zijn dat samen?",
              "answer": 30,
              "hintParameters": {
                "a": 3,
                "b": 10,
                "unit": "dorpskaarten"
              },
              "explanation": "3 × 10 = 30. Het antwoord is 30 dorpskaarten.",
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
          "id": "welcomeSign-slot-4",
          "variants": [
            {
              "id": "welcomeSign-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "40 : 5 = ?",
              "answer": 8,
              "hintParameters": {
                "a": 40,
                "b": 5
              },
              "explanation": "40 : 5 = 8.",
              "choices": [
                5,
                6,
                8,
                10
              ]
            },
            {
              "id": "welcomeSign-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Een gids verdeelt 72 folders eerlijk over 8 gezinnen. Hoeveel folders krijgt elk gezin?",
              "answer": 9,
              "hintParameters": {
                "a": 72,
                "b": 8,
                "unit": "folders"
              },
              "explanation": "72 : 8 = 9. Het antwoord is 9 folders.",
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
      "id": "statue",
      "anchorId": "statue",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "statue-slot-1",
          "variants": [
            {
              "id": "statue-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 7 = ?",
              "answer": 42,
              "hintParameters": {
                "a": 6,
                "b": 7
              },
              "explanation": "6 × 7 = 42."
            },
            {
              "id": "statue-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 9 = ?",
              "answer": 72,
              "hintParameters": {
                "a": 8,
                "b": 9
              },
              "explanation": "8 × 9 = 72.",
              "choices": [
                64,
                72,
                63,
                81
              ]
            }
          ]
        },
        {
          "id": "statue-slot-2",
          "variants": [
            {
              "id": "statue-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 9 = ?",
              "answer": 54,
              "hintParameters": {
                "a": 6,
                "b": 9
              },
              "explanation": "6 × 9 = 54.",
              "choices": [
                45,
                48,
                54,
                63
              ]
            },
            {
              "id": "statue-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "3 × 4 = ?",
              "answer": 12,
              "hintParameters": {
                "a": 3,
                "b": 4
              },
              "explanation": "3 × 4 = 12."
            }
          ]
        },
        {
          "id": "statue-slot-3",
          "variants": [
            {
              "id": "statue-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Bij het plein liggen 5 pakken met elk 4 kaarsen. Hoeveel kaarsen zijn dat samen?",
              "answer": 20,
              "hintParameters": {
                "a": 5,
                "b": 4,
                "unit": "kaarsen"
              },
              "explanation": "5 × 4 = 20. Het antwoord is 20 kaarsen."
            },
            {
              "id": "statue-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Voor het plein zijn 9 dozen met elk 6 vlaggetjes klaargezet. Hoeveel vlaggetjes zijn dat samen?",
              "answer": 54,
              "hintParameters": {
                "a": 9,
                "b": 6,
                "unit": "vlaggetjes"
              },
              "explanation": "9 × 6 = 54. Het antwoord is 54 vlaggetjes.",
              "choices": [
                45,
                54,
                56,
                63
              ]
            }
          ]
        },
        {
          "id": "statue-slot-4",
          "variants": [
            {
              "id": "statue-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "30 : 3 = ?",
              "answer": 10,
              "hintParameters": {
                "a": 30,
                "b": 3
              },
              "explanation": "30 : 3 = 10.",
              "choices": [
                7,
                8,
                9,
                10
              ]
            },
            {
              "id": "statue-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een verkoper verdeelt 40 bloemen eerlijk over 5 vazen. Hoeveel bloemen komen in elke vaas?",
              "answer": 8,
              "hintParameters": {
                "a": 40,
                "b": 5,
                "unit": "bloemen"
              },
              "explanation": "40 : 5 = 8. Het antwoord is 8 bloemen."
            }
          ]
        }
      ]
    },
    {
      "id": "churchClock",
      "anchorId": "churchClock",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "churchClock-slot-1",
          "variants": [
            {
              "id": "churchClock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Drie uur",
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 0
              },
              "explanation": "De grote wijzer staat op de 12 en de kleine wijzer op de 3. Het is drie uur.",
              "choices": [
                "Twaalf uur",
                "Drie uur",
                "Half drie",
                "Kwart over drie"
              ]
            },
            {
              "id": "churchClock-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Kwart over vier",
              "visual": {
                "type": "digitalClock",
                "hour": 4,
                "minute": 15
              },
              "explanation": "Om 4:15 is een kwartier na vier voorbij: kwart over vier.",
              "choices": [
                "Kwart voor vier",
                "Kwart over vijf",
                "Kwart over vier",
                "Half vijf"
              ]
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
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Half zes",
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 30
              },
              "explanation": "De grote wijzer staat op de 6. De kleine wijzer staat tussen de 5 en de 6. Het is half zes.",
              "choices": [
                "Half vijf",
                "Vijf uur",
                "Half zes",
                "Zes uur"
              ]
            },
            {
              "id": "churchClock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Kwart voor acht",
              "visual": {
                "type": "digitalClock",
                "hour": 7,
                "minute": 45
              },
              "explanation": "Om 7:45 is het een kwartier voor acht: kwart voor acht.",
              "choices": [
                "Kwart voor zeven",
                "Kwart over zeven",
                "Kwart voor acht",
                "Half acht"
              ]
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
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Vijf voor half negen",
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 25
              },
              "explanation": "De grote wijzer staat op de 5: vijfentwintig minuten over acht. Dat is vijf voor half negen.",
              "choices": [
                "Vijf over half negen",
                "Vijf voor half acht",
                "Vijf over acht",
                "Vijf voor half negen"
              ]
            },
            {
              "id": "churchClock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Tien voor tien",
              "visual": {
                "type": "digitalClock",
                "hour": 9,
                "minute": 50
              },
              "explanation": "Om 9:50 is het nog tien minuten tot tien: tien voor tien.",
              "choices": [
                "Tien voor negen",
                "Tien over negen",
                "Tien voor tien",
                "Tien over half tien"
              ]
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
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze klok?",
              "answer": "Tien over half twaalf",
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 40
              },
              "explanation": "De grote wijzer staat op de 8: veertig minuten over elf. Dat is tien over half twaalf.",
              "choices": [
                "Tien voor half twaalf",
                "Tien over half elf",
                "Tien over twaalf",
                "Tien over half twaalf"
              ]
            },
            {
              "id": "churchClock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het op deze digitale klok?",
              "answer": "Twaalf uur",
              "visual": {
                "type": "digitalClock",
                "hour": 12,
                "minute": 0
              },
              "explanation": "Om 12:00 zijn er geen minuten na twaalf voorbij: twaalf uur.",
              "choices": [
                "Elf uur",
                "Twaalf uur",
                "Eén uur",
                "Half één"
              ]
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "welcomeSign",
      "objectId": "welcomeSign",
      "name": "Welkomstbord van Almatera",
      "shortName": "Welkomstbord van Almatera",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt het welkomstbord van Almatera met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "welcomeSign"
    },
    {
      "id": "statue",
      "objectId": "statue",
      "name": "Standbeeld",
      "shortName": "Standbeeld",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt het standbeeld met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "statue"
    },
    {
      "id": "churchClock",
      "objectId": "churchClock",
      "name": "Kerkklok",
      "shortName": "Kerkklok",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt de kerkklok met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "churchClock"
    }
  ],
  "hotspots": [
    {
      "id": "villagePassage",
      "objectId": "villagePassage",
      "type": "exit",
      "name": "Doorgang voorbij het plein",
      "defaultAction": "activate",
      "prompt": "Via de doorgang voorbij het plein gaat de reis verder.",
      "solved": "De verkenning van Old Town is klaar."
    }
  ],
  "exitHotspotId": "villagePassage",
  "exitActionLabel": "Ga verder",
  "exits": [
    {
      "id": "villagePassage",
      "targetLevel": "LVL-0039",
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "welcomeSign",
      "name": "Welkomstbord van Almatera",
      "description": "Onderzoek het welkomstbord van Almatera met Niva."
    },
    {
      "id": "statue",
      "name": "Standbeeld",
      "description": "Onderzoek het standbeeld met Niva."
    },
    {
      "id": "churchClock",
      "name": "Kerkklok",
      "description": "Onderzoek de kerkklok met Niva."
    }
  ],
  "intro": [
    "Het welkomstbord noemt dit dorp Almatera. Het standbeeld en de kerk kijken uit over het stille plein.",
    "Onderzoek de drie plekken. Daarna kun je verder via de doorgang voorbij het plein."
  ],
  "theme": "Frozen Atlas",
  "menu": {
    "illustration": "Levels/LVL-0038/oldtown.png",
    "badge": "3 opdrachten",
    "detail": "Welkomstbord, standbeeld en kerkklok"
  },
  "reward": {
    "title": "Old Town voltooid",
    "line": "Samen met Niva heeft Sven alle drie de plekken in Old Town onderzocht.",
    "art": "Levels/LVL-0038/Niva.png",
    "badge": "Frozen Atlas"
  },
  "spiritLines": {
    "welcome": "Welkom in Old Town, Sven.",
    "moving": "Het pad loopt verder door de sneeuw.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De reis door Frozen Atlas gaat verder."
  },
  "levelSemantics": {
    "setting": "Onderzoek het besneeuwde dorpsplein van Almatera.",
    "mood": "koud, stil en geheimzinnig",
    "companionFocus": {
      "minnie": "Welkomstbord van Almatera",
      "moose": "Doorgang voorbij het plein"
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
      "text": "Almatera. Ooit een mooi dorp. Nu overal ARC."
    },
    {
      "id": "frozen-welcomeSign",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "welcomeSign",
      "text": "Op het bord staat een kaart van het dorp."
    },
    {
      "id": "frozen-statue",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "challengeId": "statue",
      "text": "Dat standbeeld kijkt over het plein."
    },
    {
      "id": "frozen-churchClock",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "churchClock",
      "text": "De klok zit hoog in de kerktoren."
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
      "text": "Alles klaar. Achter het plein loopt de weg verder."
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
      "id": "hornet-1",
      "label": "hornet",
      "frameA": "assets/ambient/flybys/hornet/hornet.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/hornet/hornet.mp3",
      "path": [
        {
          "x": 10,
          "y": -37
        },
        {
          "x": 1086,
          "y": 120
        },
        {
          "x": 2297,
          "y": 6
        }
      ],
      "scale": 0.22,
      "speed": 80,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 6000,
      "intervalMaxMs": 15000,
      "syncKey": "arc_sync",
      "startDelayMs": 0,
      "softness": 1.25,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 2,
      "soundTriggers": [
        "during",
        "tap"
      ],
      "motionProfile": "smooth",
      "wobble": 14,
      "speedVariation": 0.14,
      "flutterFrequency": 2.1
    },
    {
      "id": "arc_wasp-1",
      "label": "arc_wasp",
      "frameA": "assets/ambient/flybys/arc_wasp/awc_wasp.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/arc_wasp/arc_wasp.mp3",
      "path": [
        {
          "x": -180,
          "y": 190
        },
        {
          "x": 1086,
          "y": 120
        },
        {
          "x": 2352,
          "y": 180
        }
      ],
      "scale": 0.16,
      "speed": 79,
      "flapFrequencyHz": 7,
      "faceFlightDirection": false,
      "mirrorX": true,
      "intervalMinMs": 6000,
      "intervalMaxMs": 15000,
      "syncKey": "arc_sync",
      "startDelayMs": 150,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 2,
      "motionProfile": "smooth",
      "wobble": 14,
      "speedVariation": 0.14,
      "flutterFrequency": 2.1
    }
  ]
};
