window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0039"] = {
  "id": "LVL-0039",
  "title": "Fallen Emperor",
  "subtitle": "Verken het wrak en bereik de rode Ballistic Gondola.",
  "description": "Onderzoek met Niva de drie plekken in Fallen Emperor.",
  "storageKey": "lvl-0039-frozen-progress",
  "progressKey": "lvl-0039-frozen-completed",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0039/fallenemperor.png",
    "depthmap": "Levels/LVL-0039/depthmap.png",
    "depthMap": "Levels/LVL-0039/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 237,
      "y": 583
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
    "portrait": "Levels/LVL-0039/Niva.png",
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
    "portrait": "Levels/LVL-0039/Niva.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0039/Niva.png",
  "spiritName": "Niva",
  "walkPath": [
    {
      "id": "start",
      "x": 237,
      "y": 583
    },
    {
      "id": "machineryFragment-approach",
      "x": 560,
      "y": 587,
      "role": "approach"
    },
    {
      "id": "controlCabinets-approach",
      "x": 785,
      "y": 587,
      "role": "approach"
    },
    {
      "id": "signalMast-approach",
      "x": 1160,
      "y": 594,
      "role": "approach"
    },
    {
      "id": "wreck-bend",
      "x": 1460,
      "y": 604
    },
    {
      "id": "gondola-path",
      "x": 1690,
      "y": 609
    },
    {
      "id": "exit-approach",
      "x": 1918,
      "y": 603,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "machineryFragment",
      "type": "rune",
      "center": {
        "x": 595,
        "y": 461
      },
      "radius": 45,
      "approachNode": "machineryFragment-approach",
      "label": "Beschadigd ARC-wrakstuk"
    },
    {
      "id": "controlCabinets",
      "type": "rune",
      "center": {
        "x": 770,
        "y": 537
      },
      "radius": 45,
      "approachNode": "controlCabinets-approach",
      "label": "Elektrische schakelkasten"
    },
    {
      "id": "signalMast",
      "type": "rune",
      "center": {
        "x": 1170,
        "y": 405
      },
      "radius": 52,
      "approachNode": "signalMast-approach",
      "label": "Signaalmast met waarschuwingslicht"
    },
    {
      "id": "ballisticGondola",
      "type": "exit",
      "center": {
        "x": 1930,
        "y": 484
      },
      "radius": 86,
      "approachNode": "exit-approach",
      "label": "Ballistic Gondola"
    }
  ],
  "learningChallenges": [
    {
      "id": "machineryFragment",
      "anchorId": "machineryFragment",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "machineryFragment-slot-1",
          "variants": [
            {
              "id": "machineryFragment-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 7 = ?",
              "answer": 63,
              "hintParameters": {
                "a": 9,
                "b": 7
              },
              "explanation": "9 × 7 = 63."
            },
            {
              "id": "machineryFragment-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 8 = ?",
              "answer": 48,
              "hintParameters": {
                "a": 6,
                "b": 8
              },
              "explanation": "6 × 8 = 48.",
              "choices": [
                42,
                48,
                54,
                56
              ]
            }
          ]
        },
        {
          "id": "machineryFragment-slot-2",
          "variants": [
            {
              "id": "machineryFragment-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "3 × 5 = ?",
              "answer": 15,
              "hintParameters": {
                "a": 3,
                "b": 5
              },
              "explanation": "3 × 5 = 15.",
              "choices": [
                8,
                12,
                15,
                18
              ]
            },
            {
              "id": "machineryFragment-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 10 = ?",
              "answer": 50,
              "hintParameters": {
                "a": 5,
                "b": 10
              },
              "explanation": "5 × 10 = 50."
            }
          ]
        },
        {
          "id": "machineryFragment-slot-3",
          "variants": [
            {
              "id": "machineryFragment-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Bij het wrak liggen 7 bakken met elk 6 metalen platen. Hoeveel platen zijn dat samen?",
              "answer": 42,
              "hintParameters": {
                "a": 7,
                "b": 6,
                "unit": "platen"
              },
              "explanation": "7 × 6 = 42. Het antwoord is 42 platen."
            },
            {
              "id": "machineryFragment-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 8 zakken met elk 9 losse onderdelen. Hoeveel onderdelen zijn dat samen?",
              "answer": 72,
              "hintParameters": {
                "a": 8,
                "b": 9,
                "unit": "onderdelen"
              },
              "explanation": "8 × 9 = 72. Het antwoord is 72 onderdelen.",
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
          "id": "machineryFragment-slot-4",
          "variants": [
            {
              "id": "machineryFragment-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "56 : 8 = ?",
              "answer": 7,
              "hintParameters": {
                "a": 56,
                "b": 8
              },
              "explanation": "56 : 8 = 7.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            },
            {
              "id": "machineryFragment-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Een monteur verdeelt 48 ringen eerlijk over 6 bakjes. Hoeveel ringen komen in elk bakje?",
              "answer": 8,
              "hintParameters": {
                "a": 48,
                "b": 6,
                "unit": "ringen"
              },
              "explanation": "48 : 6 = 8. Het antwoord is 8 ringen.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "controlCabinets",
      "anchorId": "controlCabinets",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "controlCabinets-slot-1",
          "variants": [
            {
              "id": "controlCabinets-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 7 = ?",
              "answer": 49,
              "hintParameters": {
                "a": 7,
                "b": 7
              },
              "explanation": "7 × 7 = 49."
            },
            {
              "id": "controlCabinets-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "5 × 4 = ?",
              "answer": 20,
              "hintParameters": {
                "a": 5,
                "b": 4
              },
              "explanation": "5 × 4 = 20.",
              "choices": [
                9,
                15,
                20,
                25
              ]
            }
          ]
        },
        {
          "id": "controlCabinets-slot-2",
          "variants": [
            {
              "id": "controlCabinets-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 6 = ?",
              "answer": 36,
              "hintParameters": {
                "a": 6,
                "b": 6
              },
              "explanation": "6 × 6 = 36.",
              "choices": [
                30,
                36,
                42,
                48
              ]
            },
            {
              "id": "controlCabinets-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "4 × 2 = ?",
              "answer": 8,
              "hintParameters": {
                "a": 4,
                "b": 2
              },
              "explanation": "4 × 2 = 8."
            }
          ]
        },
        {
          "id": "controlCabinets-slot-3",
          "variants": [
            {
              "id": "controlCabinets-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "42 : 6 = ?",
              "answer": 7,
              "hintParameters": {
                "a": 42,
                "b": 6
              },
              "explanation": "42 : 6 = 7."
            },
            {
              "id": "controlCabinets-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "45 : 9 = ?",
              "answer": 5,
              "hintParameters": {
                "a": 45,
                "b": 9
              },
              "explanation": "45 : 9 = 5."
            }
          ]
        },
        {
          "id": "controlCabinets-slot-4",
          "variants": [
            {
              "id": "controlCabinets-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een monteur koopt 6 schakelaars van 7 euro per stuk. Hoeveel euro betaalt hij?",
              "answer": 42,
              "hintParameters": {
                "a": 6,
                "b": 7,
                "currency": "euro",
                "unit": "euro"
              },
              "explanation": "6 × 7 = 42. Het antwoord is 42 euro."
            },
            {
              "id": "controlCabinets-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "route",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Een kabel van 56 meter wordt in 8 even lange stukken verdeeld. Hoe lang is elk stuk in meter?",
              "answer": 7,
              "hintParameters": {
                "a": 56,
                "b": 8,
                "unit": "meter"
              },
              "explanation": "56 : 8 = 7. Het antwoord is 7 meter.",
              "choices": [
                6,
                7,
                8,
                9
              ]
            }
          ]
        }
      ]
    },
    {
      "id": "signalMast",
      "anchorId": "signalMast",
      "challengeCharacterId": "CHR-FROZEN-NIVA",
      "questions": [
        {
          "id": "signalMast-slot-1",
          "variants": [
            {
              "id": "signalMast-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 3 = ?",
              "answer": 15,
              "hintParameters": {
                "a": 5,
                "b": 3
              },
              "explanation": "5 × 3 = 15."
            },
            {
              "id": "signalMast-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 7 = ?",
              "answer": 56,
              "hintParameters": {
                "a": 8,
                "b": 7
              },
              "explanation": "8 × 7 = 56.",
              "choices": [
                42,
                48,
                56,
                64
              ]
            }
          ]
        },
        {
          "id": "signalMast-slot-2",
          "variants": [
            {
              "id": "signalMast-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "2 × 4 = ?",
              "answer": 8,
              "hintParameters": {
                "a": 2,
                "b": 4
              },
              "explanation": "2 × 4 = 8.",
              "choices": [
                6,
                8,
                10,
                12
              ]
            },
            {
              "id": "signalMast-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "hintParameters": {
                "a": 7,
                "b": 8
              },
              "explanation": "7 × 8 = 56."
            }
          ]
        },
        {
          "id": "signalMast-slot-3",
          "variants": [
            {
              "id": "signalMast-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "20 : 5 = ?",
              "answer": 4,
              "hintParameters": {
                "a": 20,
                "b": 5
              },
              "explanation": "20 : 5 = 4."
            },
            {
              "id": "signalMast-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "12 : 3 = ?",
              "answer": 4,
              "hintParameters": {
                "a": 12,
                "b": 3
              },
              "explanation": "12 : 3 = 4."
            }
          ]
        },
        {
          "id": "signalMast-slot-4",
          "variants": [
            {
              "id": "signalMast-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "money",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Voor de signaalmast zijn 4 lampen nodig. Elke lamp kost 5 euro. Hoeveel euro kosten de lampen samen?",
              "answer": 20,
              "hintParameters": {
                "a": 4,
                "b": 5,
                "currency": "euro",
                "unit": "euro"
              },
              "explanation": "4 × 5 = 20. Het antwoord is 20 euro.",
              "choices": [
                9,
                15,
                20,
                25
              ]
            },
            {
              "id": "signalMast-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "learningLevel": "E5",
              "family": "route",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een touw van 30 meter wordt in 5 even lange stukken verdeeld. Hoe lang is elk stuk in meter?",
              "answer": 6,
              "hintParameters": {
                "a": 30,
                "b": 5,
                "unit": "meter"
              },
              "explanation": "30 : 5 = 6. Het antwoord is 6 meter."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "machineryFragment",
      "objectId": "machineryFragment",
      "name": "Beschadigd ARC-wrakstuk",
      "shortName": "Beschadigd ARC-wrakstuk",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt het beschadigde ARC-wrakstuk met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "machineryFragment"
    },
    {
      "id": "controlCabinets",
      "objectId": "controlCabinets",
      "name": "Elektrische schakelkasten",
      "shortName": "Elektrische schakelkasten",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt de elektrische schakelkasten met Sven.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "controlCabinets"
    },
    {
      "id": "signalMast",
      "objectId": "signalMast",
      "name": "Signaalmast met waarschuwingslicht",
      "shortName": "Signaalmast met waarschuwingslicht",
      "defaultAction": "activate",
      "intro": "Niva onderzoekt samen met Sven de signaalmast met het waarschuwingslicht.",
      "prompt": "Los de vier vragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "signalMast"
    }
  ],
  "hotspots": [
    {
      "id": "ballisticGondola",
      "objectId": "ballisticGondola",
      "type": "exit",
      "name": "Ballistic Gondola",
      "defaultAction": "activate",
      "prompt": "De rode Ballistic Gondola is het vertrekpunt uit deze vallei.",
      "solved": "De verkenning van Fallen Emperor is klaar."
    }
  ],
  "exitHotspotId": "ballisticGondola",
  "exitActionLabel": "Stap in de Ballistic Gondola",
  "exits": [
    {
      "id": "ballisticGondola",
      "targetLevel": null,
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "machineryFragment",
      "name": "Beschadigd ARC-wrakstuk",
      "description": "Onderzoek het beschadigde ARC-wrakstuk met Niva."
    },
    {
      "id": "controlCabinets",
      "name": "Elektrische schakelkasten",
      "description": "Onderzoek de elektrische schakelkasten met Niva."
    },
    {
      "id": "signalMast",
      "name": "Signaalmast met waarschuwingslicht",
      "description": "Onderzoek samen met Niva de signaalmast met het waarschuwingslicht."
    }
  ],
  "intro": [
    "Een gevallen Emperor vult de vallei. Tussen de rotsen ligt een los ARC-wrakstuk; rechts wacht de rode Ballistic Gondola.",
    "Onderzoek de drie plekken. Daarna kun je vertrekken met de rode Ballistic Gondola."
  ],
  "theme": "Frozen Atlas",
  "menu": {
    "illustration": "Levels/LVL-0039/fallenemperor.png",
    "badge": "3 opdrachten",
    "detail": "ARC-wrakstuk, schakelkasten en signaalmast"
  },
  "reward": {
    "title": "Fallen Emperor voltooid",
    "line": "Samen met Niva heeft Sven alle drie de plekken in Fallen Emperor onderzocht.",
    "art": "Levels/LVL-0039/Niva.png",
    "badge": "Frozen Atlas voltooid"
  },
  "spiritLines": {
    "welcome": "Welkom in Fallen Emperor, Sven.",
    "moving": "Het pad loopt verder door de sneeuw.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De Ballistic Gondola is klaar voor vertrek."
  },
  "levelSemantics": {
    "setting": "Verken het wrak en bereik de rode Ballistic Gondola.",
    "mood": "koud, stil en geheimzinnig",
    "companionFocus": {
      "minnie": "Beschadigd ARC-wrakstuk",
      "moose": "Ballistic Gondola"
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
      "text": "De geruchten zijn waar. Hier ligt écht een gevallen Emperor."
    },
    {
      "id": "frozen-machineryFragment",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "machineryFragment",
      "text": "Dat losse stuk metaal ligt tussen de rotsen."
    },
    {
      "id": "frozen-controlCabinets",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "challengeId": "controlCabinets",
      "text": "De schakelkasten staan naast elkaar in de sneeuw."
    },
    {
      "id": "frozen-signalMast",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "challengeId": "signalMast",
      "text": "Het oranje licht bij het wrak brandt nog."
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
      "text": "Alles klaar. Naar de rode Ballistic Gondola!"
    },
    {
      "id": "frozen-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Dat was een koude tocht. Tijd om naar huis te gaan."
    }
  ],
  "ambientFlybys": [
    {
      "id": "ballistic-gondola",
      "label": "Ballistic Gondola",
      "frameA": "assets/ambient/exit/gondola/gondola.png",
      "frameB": null,
      "sound": "assets/ambient/exit/gondola/gondola.mp3",
      "path": [
        {
          "x": 1930,
          "y": 506
        },
        {
          "x": 1928,
          "y": 355
        },
        {
          "x": 1936,
          "y": 160
        },
        {
          "x": 1950,
          "y": -500
        }
      ],
      "scale": 0.25,
      "speed": 150,
      "flapFrequencyHz": 0,
      "faceFlightDirection": false,
      "mirrorX": false,
      "intervalMinMs": 18000,
      "intervalMaxMs": 18000,
      "syncKey": "",
      "startDelayMs": 600,
      "softness": 3.25,
      "saturation": 1,
      "soundVolume": 0.75,
      "rotateAlongPath": false,
      "maxRotationDeg": 0,
      "loopDuringFlyby": false,
      "activation": "exit",
      "postExitDelay": 2.5,
      "depthOcclusion": true,
      "depthMode": "fixed",
      "fixedDepth": 1,
      "soundTriggers": [
        "during"
      ],
      "motionProfile": "smooth"
    },
    {
      "id": "hornet-1",
      "label": "hornet",
      "frameA": "assets/ambient/flybys/hornet/hornet.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/hornet/hornet.mp3",
      "path": [
        {
          "x": 174,
          "y": -35
        },
        {
          "x": 405,
          "y": 128
        },
        {
          "x": 1109,
          "y": 144
        },
        {
          "x": 1834,
          "y": 136
        },
        {
          "x": 2173,
          "y": -30
        }
      ],
      "scale": 0.17,
      "speed": 80,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 15000,
      "syncKey": "arc_sync2",
      "startDelayMs": 700,
      "softness": 1,
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
      "id": "rocketeer-1",
      "label": "rocketeer",
      "frameA": "assets/ambient/flybys/rocketeer/rocketeer.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/rocketeer/rocketeer.mp3",
      "path": [
        {
          "x": 222,
          "y": -37
        },
        {
          "x": 554,
          "y": 54
        },
        {
          "x": 1070,
          "y": 40
        },
        {
          "x": 1931,
          "y": 53
        },
        {
          "x": 2322,
          "y": -27
        }
      ],
      "scale": 0.28,
      "speed": 80,
      "flapFrequencyHz": 7,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 10000,
      "intervalMaxMs": 25000,
      "syncKey": "",
      "startDelayMs": 0,
      "softness": 1,
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
