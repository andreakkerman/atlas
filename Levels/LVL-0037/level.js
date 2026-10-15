window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0037"] = {
  "id": "LVL-0037",
  "title": "Mountain Outpost",
  "subtitle": "Volg het bergpad naar de afgelegen buitenpost.",
  "description": "Onderzoek met Niva de drie plekken in Mountain Outpost.",
  "storageKey": "lvl-0037-frozen-progress",
  "progressKey": "lvl-0037-frozen-completed",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0037/mountainoutpost.png",
    "depthmap": "Levels/LVL-0037/depthmap.png",
    "depthMap": "Levels/LVL-0037/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 106,
      "y": 555
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
    "portrait": "Levels/LVL-0037/Niva.png",
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
    "portrait": "Levels/LVL-0037/Niva.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0037/Niva.png",
  "spiritName": "Niva",
  "walkPath": [
    {
      "id": "start",
      "x": 106,
      "y": 555
    },
    {
      "id": "expeditionMarker-approach",
      "x": 375,
      "y": 563,
      "role": "approach"
    },
    {
      "id": "stoneCairn-approach",
      "x": 772,
      "y": 570,
      "role": "approach"
    },
    {
      "id": "valley-bend",
      "x": 1220,
      "y": 592
    },
    {
      "id": "slope-bend",
      "x": 1460,
      "y": 577
    },
    {
      "id": "technicalInstallation-approach",
      "x": 1527,
      "y": 540,
      "role": "approach"
    },
    {
      "id": "bridge-start",
      "x": 1853,
      "y": 518
    },
    {
      "id": "exit-approach",
      "x": 2014,
      "y": 499,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "expeditionMarker",
      "type": "rune",
      "center": {
        "x": 319,
        "y": 432
      },
      "radius": 88,
      "approachNode": "expeditionMarker-approach",
      "label": "Houten expeditiemarkering"
    },
    {
      "id": "stoneCairn",
      "type": "rune",
      "center": {
        "x": 881,
        "y": 438
      },
      "radius": 58,
      "approachNode": "stoneCairn-approach",
      "label": "Steenmannetje"
    },
    {
      "id": "technicalInstallation",
      "type": "rune",
      "center": {
        "x": 1640,
        "y": 444
      },
      "radius": 85,
      "approachNode": "technicalInstallation-approach",
      "label": "Technische installatie"
    },
    {
      "id": "outpostBridge",
      "type": "exit",
      "center": {
        "x": 2040,
        "y": 423
      },
      "radius": 72,
      "approachNode": "exit-approach",
      "label": "Brug naar de buitenpost"
    }
  ],
  "learningChallenges": [
    {
      "id": "expeditionMarker",
      "anchorId": "expeditionMarker",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "expeditionMarker-slot-1",
          "variants": [
            {
              "id": "expeditionMarker-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "2 × 5 = ?",
              "answer": 10,
              "hintParameters": {
                "a": 2,
                "b": 5
              },
              "explanation": "2 × 5 = 10."
            },
            {
              "id": "expeditionMarker-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 4 = ?",
              "answer": 16,
              "hintParameters": {
                "a": 4,
                "b": 4
              },
              "explanation": "4 × 4 = 16.",
              "choices": [
                8,
                12,
                16,
                20
              ]
            }
          ]
        },
        {
          "id": "expeditionMarker-slot-2",
          "variants": [
            {
              "id": "expeditionMarker-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 8 = ?",
              "answer": 64,
              "hintParameters": {
                "a": 8,
                "b": 8
              },
              "explanation": "8 × 8 = 64.",
              "choices": [
                56,
                63,
                64,
                72
              ]
            },
            {
              "id": "expeditionMarker-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 6 = ?",
              "answer": 42,
              "hintParameters": {
                "a": 7,
                "b": 6
              },
              "explanation": "7 × 6 = 42."
            }
          ]
        },
        {
          "id": "expeditionMarker-slot-3",
          "variants": [
            {
              "id": "expeditionMarker-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "De expeditie heeft 4 tassen met elk 3 haringen voor tenten. Hoeveel haringen zijn dat samen?",
              "answer": 12,
              "hintParameters": {
                "a": 4,
                "b": 3,
                "unit": "haringen"
              },
              "explanation": "4 × 3 = 12. Het antwoord is 12 haringen."
            },
            {
              "id": "expeditionMarker-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 5 wandelaars. Ieder draagt 5 repen. Hoeveel repen dragen ze samen?",
              "answer": 25,
              "hintParameters": {
                "a": 5,
                "b": 5,
                "unit": "repen"
              },
              "explanation": "5 × 5 = 25. Het antwoord is 25 repen.",
              "choices": [
                10,
                20,
                25,
                30
              ]
            }
          ]
        },
        {
          "id": "expeditionMarker-slot-4",
          "variants": [
            {
              "id": "expeditionMarker-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "54 : 6 = ?",
              "answer": 9,
              "hintParameters": {
                "a": 54,
                "b": 6
              },
              "explanation": "54 : 6 = 9.",
              "choices": [
                7,
                8,
                9,
                10
              ]
            },
            {
              "id": "expeditionMarker-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een gids verdeelt 42 linten eerlijk over 7 groepen. Hoeveel linten krijgt elke groep?",
              "answer": 6,
              "hintParameters": {
                "a": 42,
                "b": 7,
                "unit": "linten"
              },
              "explanation": "42 : 7 = 6. Het antwoord is 6 linten."
            }
          ]
        }
      ]
    },
    {
      "id": "stoneCairn",
      "anchorId": "stoneCairn",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "stoneCairn-slot-1",
          "variants": [
            {
              "id": "stoneCairn-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "3 × 3 = ?",
              "answer": 9,
              "hintParameters": {
                "a": 3,
                "b": 3
              },
              "explanation": "3 × 3 = 9."
            },
            {
              "id": "stoneCairn-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "9 × 8 = ?",
              "answer": 72,
              "hintParameters": {
                "a": 9,
                "b": 8
              },
              "explanation": "9 × 8 = 72.",
              "choices": [
                63,
                64,
                72,
                81
              ]
            }
          ]
        },
        {
          "id": "stoneCairn-slot-2",
          "variants": [
            {
              "id": "stoneCairn-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "2 × 10 = ?",
              "answer": 20,
              "hintParameters": {
                "a": 2,
                "b": 10
              },
              "explanation": "2 × 10 = 20.",
              "choices": [
                12,
                18,
                20,
                22
              ]
            },
            {
              "id": "stoneCairn-2b",
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
            }
          ]
        },
        {
          "id": "stoneCairn-slot-3",
          "variants": [
            {
              "id": "stoneCairn-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "De gids bewaart 9 zakjes met elk 7 steentjes. Hoeveel steentjes zijn dat samen?",
              "answer": 63,
              "hintParameters": {
                "a": 9,
                "b": 7,
                "unit": "steentjes"
              },
              "explanation": "9 × 7 = 63. Het antwoord is 63 steentjes."
            },
            {
              "id": "stoneCairn-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 6 routekaarten met elk 9 gemarkeerde plekken. Hoeveel plekken zijn dat samen?",
              "answer": 54,
              "hintParameters": {
                "a": 6,
                "b": 9,
                "unit": "plekken"
              },
              "explanation": "6 × 9 = 54. Het antwoord is 54 plekken.",
              "choices": [
                45,
                48,
                54,
                63
              ]
            }
          ]
        },
        {
          "id": "stoneCairn-slot-4",
          "variants": [
            {
              "id": "stoneCairn-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "20 : 2 = ?",
              "answer": 10,
              "hintParameters": {
                "a": 20,
                "b": 2
              },
              "explanation": "20 : 2 = 10.",
              "choices": [
                4,
                5,
                8,
                10
              ]
            },
            {
              "id": "stoneCairn-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De gids verdeelt 30 kaartjes eerlijk over 3 wandelaars. Hoeveel kaartjes krijgt elke wandelaar?",
              "answer": 10,
              "hintParameters": {
                "a": 30,
                "b": 3,
                "unit": "kaartjes"
              },
              "explanation": "30 : 3 = 10. Het antwoord is 10 kaartjes.",
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
      "id": "technicalInstallation",
      "anchorId": "technicalInstallation",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "technicalInstallation-slot-1",
          "variants": [
            {
              "id": "technicalInstallation-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 9 = ?",
              "answer": 54,
              "hintParameters": {
                "a": 6,
                "b": 9
              },
              "explanation": "6 × 9 = 54."
            },
            {
              "id": "technicalInstallation-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 10 = ?",
              "answer": 40,
              "hintParameters": {
                "a": 4,
                "b": 10
              },
              "explanation": "4 × 10 = 40.",
              "choices": [
                14,
                30,
                40,
                50
              ]
            }
          ]
        },
        {
          "id": "technicalInstallation-slot-2",
          "variants": [
            {
              "id": "technicalInstallation-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "9 × 9 = ?",
              "answer": 81,
              "hintParameters": {
                "a": 9,
                "b": 9
              },
              "explanation": "9 × 9 = 81.",
              "choices": [
                72,
                80,
                81,
                90
              ]
            },
            {
              "id": "technicalInstallation-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "10 × 5 = ?",
              "answer": 50,
              "hintParameters": {
                "a": 10,
                "b": 5
              },
              "explanation": "10 × 5 = 50."
            }
          ]
        },
        {
          "id": "technicalInstallation-slot-3",
          "variants": [
            {
              "id": "technicalInstallation-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "In de kast zitten 6 rijen met elk 7 aansluitingen. Hoeveel aansluitingen zijn dat samen?",
              "answer": 42,
              "hintParameters": {
                "a": 6,
                "b": 7,
                "unit": "aansluitingen"
              },
              "explanation": "6 × 7 = 42. Het antwoord is 42 aansluitingen."
            },
            {
              "id": "technicalInstallation-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Een technicus heeft 8 sets met elk 6 zekeringen. Hoeveel zekeringen heeft hij?",
              "answer": 48,
              "hintParameters": {
                "a": 8,
                "b": 6,
                "unit": "zekeringen"
              },
              "explanation": "8 × 6 = 48. Het antwoord is 48 zekeringen.",
              "choices": [
                40,
                42,
                48,
                56
              ]
            }
          ]
        },
        {
          "id": "technicalInstallation-slot-4",
          "variants": [
            {
              "id": "technicalInstallation-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "81 : 9 = ?",
              "answer": 9,
              "hintParameters": {
                "a": 81,
                "b": 9
              },
              "explanation": "81 : 9 = 9.",
              "choices": [
                7,
                8,
                9,
                10
              ]
            },
            {
              "id": "technicalInstallation-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "De technicus verdeelt 63 klemmen eerlijk over 9 doosjes. Hoeveel klemmen komen in elk doosje?",
              "answer": 7,
              "hintParameters": {
                "a": 63,
                "b": 9,
                "unit": "klemmen"
              },
              "explanation": "63 : 9 = 7. Het antwoord is 7 klemmen."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "expeditionMarker",
      "objectId": "expeditionMarker",
      "name": "Houten expeditiemarkering",
      "shortName": "Houten expeditiemarkering",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt de houten expeditiemarkering met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "expeditionMarker"
    },
    {
      "id": "stoneCairn",
      "objectId": "stoneCairn",
      "name": "Steenmannetje",
      "shortName": "Steenmannetje",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt het steenmannetje met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "stoneCairn"
    },
    {
      "id": "technicalInstallation",
      "objectId": "technicalInstallation",
      "name": "Technische installatie",
      "shortName": "Technische installatie",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt de technische installatie met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "technicalInstallation"
    }
  ],
  "hotspots": [
    {
      "id": "outpostBridge",
      "objectId": "outpostBridge",
      "type": "exit",
      "name": "Brug naar de buitenpost",
      "defaultAction": "activate",
      "prompt": "Via de brug naar de buitenpost gaat de reis verder.",
      "solved": "De verkenning van Mountain Outpost is klaar."
    }
  ],
  "exitHotspotId": "outpostBridge",
  "exitActionLabel": "Ga verder",
  "exits": [
    {
      "id": "outpostBridge",
      "targetLevel": "LVL-0038",
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "expeditionMarker",
      "name": "Houten expeditiemarkering",
      "description": "Onderzoek de houten expeditiemarkering met Niva."
    },
    {
      "id": "stoneCairn",
      "name": "Steenmannetje",
      "description": "Onderzoek het steenmannetje met Niva."
    },
    {
      "id": "technicalInstallation",
      "name": "Technische installatie",
      "description": "Onderzoek de technische installatie met Niva."
    }
  ],
  "intro": [
    "Een houten markering wijst langs de berghelling. Achter de kloof ligt de buitenpost.",
    "Onderzoek de drie plekken. Daarna kun je verder via de brug naar de buitenpost."
  ],
  "theme": "Frozen Atlas",
  "menu": {
    "illustration": "Levels/LVL-0037/mountainoutpost.png",
    "badge": "3 opdrachten",
    "detail": "Expeditiemarkering, steenmannetje en technische installatie"
  },
  "reward": {
    "title": "Mountain Outpost voltooid",
    "line": "Samen met Niva heeft Sven alle drie de plekken in Mountain Outpost onderzocht.",
    "art": "Levels/LVL-0037/Niva.png",
    "badge": "Frozen Atlas"
  },
  "spiritLines": {
    "welcome": "Welkom in Mountain Outpost, Sven.",
    "moving": "Het pad loopt verder door de sneeuw.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De reis door Frozen Atlas gaat verder."
  },
  "levelSemantics": {
    "setting": "Volg het bergpad naar de afgelegen buitenpost.",
    "mood": "koud, stil en geheimzinnig",
    "companionFocus": {
      "minnie": "Houten expeditiemarkering",
      "moose": "Brug naar de buitenpost"
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
      "text": "Een sterrenwacht! Zouden ze hier de ARC hebben zien aankomen?"
    },
    {
      "id": "frozen-expeditionMarker",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "expeditionMarker",
      "text": "De linten hangen aan een hoge houten paal."
    },
    {
      "id": "frozen-stoneCairn",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "challengeId": "stoneCairn",
      "text": "Iemand heeft de stenen netjes opgestapeld."
    },
    {
      "id": "frozen-technicalInstallation",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "technicalInstallation",
      "text": "Dat kastje hoort vast bij de buitenpost."
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
      "text": "Alles klaar. De brug brengt ons verder."
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
      "id": "arc_wasp-1",
      "label": "arc_wasp",
      "frameA": "assets/ambient/flybys/arc_wasp/awc_wasp.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/arc_wasp/arc_wasp.mp3",
      "path": [
        {
          "x": 2035,
          "y": -20
        },
        {
          "x": 1555,
          "y": 73
        },
        {
          "x": 1086,
          "y": 120
        },
        {
          "x": 482,
          "y": 85
        },
        {
          "x": 68,
          "y": -27
        }
      ],
      "scale": 0.1,
      "speed": 30,
      "flapFrequencyHz": 7,
      "faceFlightDirection": false,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 15000,
      "syncKey": "",
      "startDelayMs": 0,
      "softness": 3.5,
      "saturation": 1,
      "soundVolume": 0.3,
      "rotateAlongPath": false,
      "maxRotationDeg": 8,
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
      "id": "rocketeer-1",
      "label": "rocketeer",
      "frameA": "assets/ambient/flybys/rocketeer/rocketeer.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/rocketeer/rocketeer.mp3",
      "path": [
        {
          "x": 204,
          "y": -34
        },
        {
          "x": 527,
          "y": 73
        },
        {
          "x": 1086,
          "y": 120
        },
        {
          "x": 1676,
          "y": 61
        },
        {
          "x": 1945,
          "y": -21
        }
      ],
      "scale": 0.31,
      "speed": 80,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 20000,
      "syncKey": "",
      "startDelayMs": 0,
      "softness": 2,
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
    }
  ]
};
