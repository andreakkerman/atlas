window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0034"] = {
  "id": "LVL-0034",
  "title": "Riven Tides",
  "subtitle": "Verken het strand onder de donkere avondlucht.",
  "description": "Sven onderzoekt de blauwe zeecontainer, de Raider Cache en de blauwe koffer met Valente.",
  "storageKey": "lvl-0034-arc-progress",
  "progressKey": "lvl-0034-arc-completed",
  "backgroundSize": {
    "width": 2171,
    "height": 724
  },
  "world": {
    "width": 2171,
    "height": 724,
    "aspectRatio": 2.998618784530387,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0034/riventides.png",
    "depthmap": "Levels/LVL-0034/depthmap.png",
    "depthMap": "Levels/LVL-0034/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 159,
      "y": 554
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 90,
    "maxX": 2040,
    "minY": 510,
    "maxY": 640
  },
  "challengeLabel": "Uitdaging",
  "challengeCompleteLabel": "Opdracht afronden",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "ontdekkingen",
  "challengeCharacter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0034/Valente.png",
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
    "portrait": "Levels/LVL-0034/Valente.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0034/Valente.png",
  "spiritName": "Valente",
  "walkPath": [
    {
      "id": "start",
      "x": 159,
      "y": 554
    },
    {
      "id": "seaContainer-approach",
      "x": 268,
      "y": 559,
      "role": "approach"
    },
    {
      "id": "shore-bend",
      "x": 655,
      "y": 583
    },
    {
      "id": "raiderCache-approach",
      "x": 763,
      "y": 587,
      "role": "approach"
    },
    {
      "id": "chairs-front",
      "x": 1106,
      "y": 591
    },
    {
      "id": "blueSuitcase-approach",
      "x": 1383,
      "y": 581,
      "role": "approach"
    },
    {
      "id": "beach-bend",
      "x": 1762,
      "y": 582
    },
    {
      "id": "exit-approach",
      "x": 1938,
      "y": 568,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "seaContainer",
      "type": "rune",
      "center": {
        "x": 360,
        "y": 460
      },
      "radius": 70,
      "approachNode": "seaContainer-approach",
      "label": "Blauwe zeecontainer"
    },
    {
      "id": "raiderCache",
      "type": "rune",
      "center": {
        "x": 838,
        "y": 552
      },
      "radius": 46,
      "approachNode": "raiderCache-approach",
      "label": "Raider Cache"
    },
    {
      "id": "blueSuitcase",
      "type": "rune",
      "center": {
        "x": 1471,
        "y": 517
      },
      "radius": 48,
      "approachNode": "blueSuitcase-approach",
      "label": "Blauwe koffer"
    },
    {
      "id": "hotelExit",
      "type": "exit",
      "center": {
        "x": 1963,
        "y": 496
      },
      "radius": 60,
      "approachNode": "exit-approach",
      "label": "Hoteltrap"
    }
  ],
  "learningChallenges": [
    {
      "id": "seaContainer",
      "anchorId": "seaContainer",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "seaContainer-slot-1",
          "variants": [
            {
              "id": "seaContainer-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "hintParameters": {"a":7,"b":8},
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "seaContainer-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "9 × 6 = ?",
              "answer": 54,
              "choices": [
                54,
                60,
                66,
                48
              ],
              "hintParameters": {"a":9,"b":6},
              "explanation": "9 × 6 = 54."
            }
          ]
        },
        {
          "id": "seaContainer-slot-2",
          "variants": [
            {
              "id": "seaContainer-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 7 = ?",
              "answer": 28,
              "choices": [
                28,
                35,
                42,
                21
              ],
              "hintParameters": {"a":4,"b":7},
              "explanation": "4 × 7 = 28."
            },
            {
              "id": "seaContainer-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 3 = ?",
              "answer": 24,
              "hintParameters": {"a":8,"b":3},
              "explanation": "8 × 3 = 24."
            }
          ]
        },
        {
          "id": "seaContainer-slot-3",
          "variants": [
            {
              "id": "seaContainer-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "In de container staan 6 kratten met elk 4 flessen water. Hoeveel flessen zijn dat samen?",
              "answer": 24,
              "hintParameters": {"a":6,"b":4},
              "explanation": "6 × 4 = 24."
            },
            {
              "id": "seaContainer-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 5 dozen met elk 8 zaklampen. Hoeveel zaklampen zijn dat samen?",
              "answer": 40,
              "choices": [
                56,
                32,
                40,
                48
              ],
              "hintParameters": {"a":5,"b":8},
              "explanation": "5 × 8 = 40."
            }
          ]
        },
        {
          "id": "seaContainer-slot-4",
          "variants": [
            {
              "id": "seaContainer-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "63 : 7 = ?",
              "answer": 9,
              "hintParameters": {"a":63,"b":7},
              "explanation": "63 : 7 = 9."
            },
            {
              "id": "seaContainer-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "48 : 6 = ?",
              "answer": 8,
              "choices": [
                7,
                9,
                8,
                10
              ],
              "hintParameters": {"a":48,"b":6},
              "explanation": "48 : 6 = 8."
            }
          ]
        }
      ]
    },
    {
      "id": "raiderCache",
      "anchorId": "raiderCache",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "raiderCache-slot-1",
          "variants": [
            {
              "id": "raiderCache-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 7 = ?",
              "answer": 42,
              "hintParameters": {"a":6,"b":7},
              "explanation": "6 × 7 = 42."
            },
            {
              "id": "raiderCache-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 9 = ?",
              "answer": 72,
              "choices": [
                72,
                81,
                90,
                63
              ],
              "hintParameters": {"a":8,"b":9},
              "explanation": "8 × 9 = 72."
            }
          ]
        },
        {
          "id": "raiderCache-slot-2",
          "variants": [
            {
              "id": "raiderCache-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "3 × 9 = ?",
              "answer": 27,
              "choices": [
                27,
                36,
                45,
                18
              ],
              "hintParameters": {"a":3,"b":9},
              "explanation": "3 × 9 = 27."
            },
            {
              "id": "raiderCache-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 4 = ?",
              "answer": 28,
              "hintParameters": {"a":7,"b":4},
              "explanation": "7 × 4 = 28."
            }
          ]
        },
        {
          "id": "raiderCache-slot-3",
          "variants": [
            {
              "id": "raiderCache-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Valente vindt 4 zakjes met elk 5 schroeven. Hoeveel schroeven zijn dat samen?",
              "answer": 20,
              "hintParameters": {"a":4,"b":5},
              "explanation": "4 × 5 = 20."
            },
            {
              "id": "raiderCache-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 8 pakjes met elk 6 batterijen. Hoeveel batterijen zijn dat samen?",
              "answer": 48,
              "choices": [
                60,
                42,
                48,
                54
              ],
              "hintParameters": {"a":8,"b":6},
              "explanation": "8 × 6 = 48."
            }
          ]
        },
        {
          "id": "raiderCache-slot-4",
          "variants": [
            {
              "id": "raiderCache-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "72 : 8 = ?",
              "answer": 9,
              "choices": [
                11,
                8,
                10,
                9
              ],
              "hintParameters": {"a":72,"b":8},
              "explanation": "72 : 8 = 9."
            },
            {
              "id": "raiderCache-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Valente verdeelt 42 bouten eerlijk over 6 doosjes. Hoeveel bouten komen in elk doosje?",
              "answer": 7,
              "hintParameters": {"a":42,"b":6},
              "explanation": "42 : 6 = 7."
            }
          ]
        }
      ]
    },
    {
      "id": "blueSuitcase",
      "anchorId": "blueSuitcase",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "blueSuitcase-slot-1",
          "variants": [
            {
              "id": "blueSuitcase-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 7 = ?",
              "answer": 63,
              "hintParameters": {"a":9,"b":7},
              "explanation": "9 × 7 = 63."
            },
            {
              "id": "blueSuitcase-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 8 = ?",
              "answer": 48,
              "choices": [
                48,
                56,
                64,
                40
              ],
              "hintParameters": {"a":6,"b":8},
              "explanation": "6 × 8 = 48."
            }
          ]
        },
        {
          "id": "blueSuitcase-slot-2",
          "variants": [
            {
              "id": "blueSuitcase-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "5 × 7 = ?",
              "answer": 35,
              "choices": [
                35,
                42,
                49,
                28
              ],
              "hintParameters": {"a":5,"b":7},
              "explanation": "5 × 7 = 35."
            },
            {
              "id": "blueSuitcase-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "4 × 8 = ?",
              "answer": 32,
              "hintParameters": {"a":4,"b":8},
              "explanation": "4 × 8 = 32."
            }
          ]
        },
        {
          "id": "blueSuitcase-slot-3",
          "variants": [
            {
              "id": "blueSuitcase-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 3 koffers met elk 6 handdoeken. Hoeveel handdoeken zijn dat samen?",
              "answer": 18,
              "hintParameters": {"a":3,"b":6},
              "explanation": "3 × 6 = 18."
            },
            {
              "id": "blueSuitcase-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Op elke plank liggen 5 strandlakens. Er zijn 7 planken. Hoeveel strandlakens zijn dat samen?",
              "answer": 35,
              "choices": [
                45,
                30,
                35,
                40
              ],
              "hintParameters": {"a":7,"b":5},
              "explanation": "7 × 5 = 35."
            }
          ]
        },
        {
          "id": "blueSuitcase-slot-4",
          "variants": [
            {
              "id": "blueSuitcase-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 32 flesjes water voor 4 gelijke tassen. Hoeveel flesjes gaan in elke tas?",
              "answer": 8,
              "choices": [
                10,
                7,
                9,
                8
              ],
              "hintParameters": {"a":32,"b":4},
              "explanation": "32 : 4 = 8."
            },
            {
              "id": "blueSuitcase-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een fles water kost 3 euro. Sven koopt 5 flessen. Hoeveel euro betaalt hij?",
              "answer": 15,
              "hintParameters": {"a":5,"b":3,"currency":"euro"},
              "explanation": "5 × 3 = 15."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "seaContainer",
      "objectId": "seaContainer",
      "name": "Blauwe zeecontainer",
      "shortName": "Blauwe zeecontainer",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "seaContainer"
    },
    {
      "id": "raiderCache",
      "objectId": "raiderCache",
      "name": "Raider Cache",
      "shortName": "Raider Cache",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "raiderCache"
    },
    {
      "id": "blueSuitcase",
      "objectId": "blueSuitcase",
      "name": "Blauwe koffer",
      "shortName": "Blauwe koffer",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt deze plek met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "blueSuitcase"
    }
  ],
  "hotspots": [
    {
      "id": "hotelExit",
      "objectId": "hotelExit",
      "type": "exit",
      "name": "Hoteltrap",
      "defaultAction": "activate",
      "prompt": "De verlichte trap leidt vanaf het strand naar het hotel.",
      "solved": "De verkenning van Riven Tides is klaar."
    }
  ],
  "exitHotspotId": "hotelExit",
  "exitActionLabel": "Rond de verkenning af",
  "exits": [
    {
      "id": "hotelExit",
      "targetLevel": "LVL-0035",
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "seaContainer",
      "name": "Blauwe zeecontainer",
      "description": "Onderzoek Blauwe zeecontainer met Valente."
    },
    {
      "id": "raiderCache",
      "name": "Raider Cache",
      "description": "Onderzoek Raider Cache met Valente."
    },
    {
      "id": "blueSuitcase",
      "name": "Blauwe koffer",
      "description": "Onderzoek Blauwe koffer met Valente."
    }
  ],
  "intro": [
    "Valente wacht bij het strand. De havenkranen steken af tegen de donkere lucht.",
    "Onderzoek de zeecontainer, de Raider Cache en de blauwe koffer. De hoteltrap ligt aan het einde van het strand."
  ],
  "theme": "ARC Atlas",
  "menu": {
    "illustration": "Levels/LVL-0034/riventides.png",
    "badge": "3 opdrachten",
    "detail": "Zeecontainer, Raider Cache en blauwe koffer"
  },
  "sceneEffects": [],
  "reward": {
    "title": "Riven Tides voltooid",
    "line": "Samen met Valente heeft Sven alle drie de plekken aan het strand onderzocht.",
    "art": "Levels/LVL-0034/Valente.png",
    "badge": "Riven Tides verkend",
    "nextLevelId": "LVL-0035",
    "nextLabel": "Naar Stella Montis"
  },
  "spiritLines": {
    "welcome": "Welkom in Riven Tides, Sven.",
    "moving": "De golven rollen zachtjes over het strand.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De verkenning van Riven Tides is klaar."
  },
  "levelSemantics": {
    "setting": "een verlaten kusthotel naast een haven en een strand",
    "mood": "donker, warm verlicht en nieuwsgierig",
    "companionFocus": {
      "minnie": "de achtergelaten bagage en de zee",
      "moose": "de havenkranen en de verlichte hoteltrap"
    }
  },
  "companionPolicy": {
    "disabledEvents": ["CHALLENGE_OPEN", "CHALLENGE_SUCCESS", "LEVEL_PROGRESS_MILESTONE"],
    "attentionOncePerVisit": true
  },
  "companionMoments": [
    {
      "id": "riven-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Riven Tides, een prachtige vakantiebestemming... voor ARC."
    },
    {
      "id": "riven-container",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "moose",
      "text": "Die container heeft vast een lange zeereis gemaakt.",
      "challengeId": "seaContainer"
    },
    {
      "id": "riven-cache",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "text": "Daar tussen de strandstoelen ligt een Raider Cache.",
      "challengeId": "raiderCache"
    },
    {
      "id": "riven-suitcase",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "speaker": "minnie",
      "text": "Die blauwe koffer valt wel erg op.",
      "challengeId": "blueSuitcase"
    },
    {
      "id": "riven-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Nog {remainingChallenges} te gaan. Daarna kunnen we naar het hotel."
    },
    {
      "id": "riven-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De weg naar het hotel is vrij. We kunnen verder."
    },
    {
      "id": "riven-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Dag, strand. Misschien komen hier ooit weer vakantiegangers."
    }
  ],
  "ambientFlybys": [
    {
      "id": "bastionwalk1",
      "label": "bastionwalk1",
      "frameA": "assets/ambient/flybys/bastion_walk/frame_001.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/bastion_walk/bastion.mp3",
      "path": [
        {
          "x": 338,
          "y": 493
        },
        {
          "x": 462,
          "y": 461
        },
        {
          "x": 814,
          "y": 466
        },
        {
          "x": 1081,
          "y": 452
        },
        {
          "x": 1753,
          "y": 440
        }
      ],
      "scale": 1,
      "speed": 85,
      "flapFrequencyHz": 7,
      "faceFlightDirection": false,
      "mirrorX": true,
      "intervalMinMs": 5000,
      "intervalMaxMs": 10000,
      "syncKey": "",
      "startDelayMs": 0,
      "softness": 0.5,
      "saturation": 1,
      "soundVolume": 0.4,
      "rotateAlongPath": false,
      "maxRotationDeg": 8,
      "frames": [
        "assets/ambient/flybys/bastion_walk/frame_001.png",
        "assets/ambient/flybys/bastion_walk/frame_002.png",
        "assets/ambient/flybys/bastion_walk/frame_003.png",
        "assets/ambient/flybys/bastion_walk/frame_004.png",
        "assets/ambient/flybys/bastion_walk/frame_005.png",
        "assets/ambient/flybys/bastion_walk/frame_006.png",
        "assets/ambient/flybys/bastion_walk/frame_007.png",
        "assets/ambient/flybys/bastion_walk/frame_008.png",
        "assets/ambient/flybys/bastion_walk/frame_009.png",
        "assets/ambient/flybys/bastion_walk/frame_010.png",
        "assets/ambient/flybys/bastion_walk/frame_011.png",
        "assets/ambient/flybys/bastion_walk/frame_012.png",
        "assets/ambient/flybys/bastion_walk/frame_013.png",
        "assets/ambient/flybys/bastion_walk/frame_014.png",
        "assets/ambient/flybys/bastion_walk/frame_015.png",
        "assets/ambient/flybys/bastion_walk/frame_016.png",
        "assets/ambient/flybys/bastion_walk/frame_017.png",
        "assets/ambient/flybys/bastion_walk/frame_018.png",
        "assets/ambient/flybys/bastion_walk/frame_019.png",
        "assets/ambient/flybys/bastion_walk/frame_020.png",
        "assets/ambient/flybys/bastion_walk/frame_021.png",
        "assets/ambient/flybys/bastion_walk/frame_022.png",
        "assets/ambient/flybys/bastion_walk/frame_023.png",
        "assets/ambient/flybys/bastion_walk/frame_024.png",
        "assets/ambient/flybys/bastion_walk/frame_025.png",
        "assets/ambient/flybys/bastion_walk/frame_026.png",
        "assets/ambient/flybys/bastion_walk/frame_027.png",
        "assets/ambient/flybys/bastion_walk/frame_028.png",
        "assets/ambient/flybys/bastion_walk/frame_029.png",
        "assets/ambient/flybys/bastion_walk/frame_030.png",
        "assets/ambient/flybys/bastion_walk/frame_031.png",
        "assets/ambient/flybys/bastion_walk/frame_032.png",
        "assets/ambient/flybys/bastion_walk/frame_033.png",
        "assets/ambient/flybys/bastion_walk/frame_034.png",
        "assets/ambient/flybys/bastion_walk/frame_035.png",
        "assets/ambient/flybys/bastion_walk/frame_036.png",
        "assets/ambient/flybys/bastion_walk/frame_037.png",
        "assets/ambient/flybys/bastion_walk/frame_038.png",
        "assets/ambient/flybys/bastion_walk/frame_039.png",
        "assets/ambient/flybys/bastion_walk/frame_040.png",
        "assets/ambient/flybys/bastion_walk/frame_041.png",
        "assets/ambient/flybys/bastion_walk/frame_042.png",
        "assets/ambient/flybys/bastion_walk/frame_043.png",
        "assets/ambient/flybys/bastion_walk/frame_044.png",
        "assets/ambient/flybys/bastion_walk/frame_045.png",
        "assets/ambient/flybys/bastion_walk/frame_046.png",
        "assets/ambient/flybys/bastion_walk/frame_047.png",
        "assets/ambient/flybys/bastion_walk/frame_048.png",
        "assets/ambient/flybys/bastion_walk/frame_049.png",
        "assets/ambient/flybys/bastion_walk/frame_050.png",
        "assets/ambient/flybys/bastion_walk/frame_051.png",
        "assets/ambient/flybys/bastion_walk/frame_052.png",
        "assets/ambient/flybys/bastion_walk/frame_053.png",
        "assets/ambient/flybys/bastion_walk/frame_054.png",
        "assets/ambient/flybys/bastion_walk/frame_055.png",
        "assets/ambient/flybys/bastion_walk/frame_056.png",
        "assets/ambient/flybys/bastion_walk/frame_057.png",
        "assets/ambient/flybys/bastion_walk/frame_058.png",
        "assets/ambient/flybys/bastion_walk/frame_059.png",
        "assets/ambient/flybys/bastion_walk/frame_060.png",
        "assets/ambient/flybys/bastion_walk/frame_061.png",
        "assets/ambient/flybys/bastion_walk/frame_062.png",
        "assets/ambient/flybys/bastion_walk/frame_063.png",
        "assets/ambient/flybys/bastion_walk/frame_064.png",
        "assets/ambient/flybys/bastion_walk/frame_065.png",
        "assets/ambient/flybys/bastion_walk/frame_066.png",
        "assets/ambient/flybys/bastion_walk/frame_067.png",
        "assets/ambient/flybys/bastion_walk/frame_068.png",
        "assets/ambient/flybys/bastion_walk/frame_069.png",
        "assets/ambient/flybys/bastion_walk/frame_070.png",
        "assets/ambient/flybys/bastion_walk/frame_071.png",
        "assets/ambient/flybys/bastion_walk/frame_072.png",
        "assets/ambient/flybys/bastion_walk/frame_073.png"
      ],
      "playback": "loop",
      "animationFps": 24,
      "endBehavior": "despawn",
      "depthOcclusion": true,
      "depthBias": -0.12,
      "brightness": 0.45,
      "contrast": 0.98,
      "warmth": 0,
      "tint": 0,
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
