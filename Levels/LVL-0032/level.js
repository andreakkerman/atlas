window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0032"] = {
  "id": "LVL-0032",
  "title": "Dam Battlegrounds",
  "subtitle": "Verken de oude dam met Valente.",
  "description": "Sven onderzoekt de auto, de buitkist en de Raider Cache bij de oude dam.",
  "storageKey": "lvl-0032-arc-progress",
  "progressKey": "lvl-0032-arc-completed",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0032/DamBattlegrounds.png",
    "depthmap": "Levels/LVL-0032/depthmap.png",
    "depthMap": "Levels/LVL-0032/depthmap.png"
  },
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 100,
      "y": 529
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 80,
    "maxX": 2160,
    "minY": 495,
    "maxY": 600
  },
  "challengeLabel": "Rekenuitdaging",
  "challengeCompleteLabel": "Opdracht afronden",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "ontdekkingen",
  "challengeCharacter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0032/Valente.png",
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
    "portrait": "Levels/LVL-0032/Valente.png",
    "role": "verkenner"
  },
  "challengeArt": "Levels/LVL-0032/Valente.png",
  "spiritName": "Valente",
  "walkPath": [
    {
      "id": "start",
      "x": 100,
      "y": 529
    },
    {
      "id": "car-approach",
      "x": 231,
      "y": 538,
      "role": "approach"
    },
    {
      "id": "pavement-bend",
      "x": 649,
      "y": 574
    },
    {
      "id": "lootCrate-approach",
      "x": 1068,
      "y": 600,
      "role": "approach"
    },
    {
      "id": "pavement-middle",
      "x": 1413,
      "y": 594
    },
    {
      "id": "pavement-rise",
      "x": 1749,
      "y": 586
    },
    {
      "id": "raiderCache-approach",
      "x": 1891,
      "y": 573,
      "role": "approach"
    },
    {
      "id": "exit-approach",
      "x": 2089,
      "y": 499,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "car",
      "type": "rune",
      "center": {
        "x": 269,
        "y": 447
      },
      "radius": 57,
      "approachNode": "car-approach",
      "label": "Auto"
    },
    {
      "id": "lootCrate",
      "type": "rune",
      "center": {
        "x": 1063,
        "y": 526
      },
      "radius": 47,
      "approachNode": "lootCrate-approach",
      "label": "Loot crate"
    },
    {
      "id": "raiderCache",
      "type": "rune",
      "center": {
        "x": 1961,
        "y": 611
      },
      "radius": 50,
      "approachNode": "raiderCache-approach",
      "label": "Raider Cache"
    },
    {
      "id": "damExit",
      "type": "exit",
      "center": {
        "x": 2092,
        "y": 418
      },
      "radius": 53,
      "approachNode": "exit-approach",
      "label": "Vertrek bij de dam"
    }
  ],
  "learningChallenges": [
    {
      "id": "car",
      "anchorId": "car",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "car-slot-1",
          "variants": [
            {
              "id": "car-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "hintMinnie": "Denk aan 7 groepjes van 8.",
              "hintMoose": "Reken eerst 6 × 8 = 48. Tel er nog 8 bij.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "car-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 9 = ?",
              "answer": 54,
              "choices": [
                45,
                63,
                54,
                72
              ],
              "hintMinnie": "Denk aan 6 groepjes van 9.",
              "hintMoose": "Reken eerst 5 × 9 = 45. Tel er nog 9 bij.",
              "explanation": "6 × 9 = 54."
            }
          ]
        },
        {
          "id": "car-slot-2",
          "variants": [
            {
              "id": "car-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 6 = ?",
              "answer": 24,
              "choices": [
                18,
                30,
                24,
                36
              ],
              "hintMinnie": "Denk aan 4 groepjes van 6.",
              "hintMoose": "Reken eerst 3 × 6 = 18. Tel er nog 6 bij.",
              "explanation": "4 × 6 = 24."
            },
            {
              "id": "car-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 3 = ?",
              "answer": 24,
              "hintMinnie": "Denk aan 8 groepjes van 3.",
              "hintMoose": "Reken eerst 7 × 3 = 21. Tel er nog 3 bij.",
              "explanation": "8 × 3 = 24."
            }
          ]
        },
        {
          "id": "car-slot-3",
          "variants": [
            {
              "id": "car-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Valente heeft 6 doosjes met elk 7 bouten. Hoeveel bouten zijn dat samen?",
              "answer": 42,
              "hintMinnie": "Denk aan 6 groepjes van 7.",
              "hintMoose": "Reken eerst 5 × 7 = 35. Tel er nog 7 bij.",
              "explanation": "6 × 7 = 42."
            },
            {
              "id": "car-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Er zijn 5 zakjes met elk 4 moeren. Hoeveel moeren zijn dat samen?",
              "answer": 20,
              "choices": [
                16,
                24,
                20,
                28
              ],
              "hintMinnie": "Denk aan 5 groepjes van 4.",
              "hintMoose": "Reken eerst 4 × 4 = 16. Tel er nog 4 bij.",
              "explanation": "5 × 4 = 20."
            }
          ]
        },
        {
          "id": "car-slot-4",
          "variants": [
            {
              "id": "car-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "56 : 7 = ?",
              "answer": 8,
              "hintMinnie": "Hoeveel keer 7 past in 56?",
              "hintMoose": "Gebruik de keersom: 8 × 7 = 56.",
              "explanation": "56 : 7 = 8, want 8 × 7 = 56."
            },
            {
              "id": "car-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "54 : 9 = ?",
              "answer": 6,
              "choices": [
                8,
                5,
                7,
                6
              ],
              "hintMinnie": "Hoeveel keer 9 past in 54?",
              "hintMoose": "Gebruik de keersom: 6 × 9 = 54.",
              "explanation": "54 : 9 = 6, want 6 × 9 = 54."
            }
          ]
        }
      ]
    },
    {
      "id": "lootCrate",
      "anchorId": "lootCrate",
      "challengeCharacterId": "CHR-ARC-VALENTE",
      "questions": [
        {
          "id": "lootCrate-slot-1",
          "variants": [
            {
              "id": "lootCrate-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 8 = ?",
              "answer": 64,
              "hintMinnie": "Denk aan 8 groepjes van 8.",
              "hintMoose": "Reken eerst 7 × 8 = 56. Tel er nog 8 bij.",
              "explanation": "8 × 8 = 64."
            },
            {
              "id": "lootCrate-1b",
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
                44
              ],
              "hintMinnie": "Denk aan 9 groepjes van 4.",
              "hintMoose": "Reken eerst 8 × 4 = 32. Tel er nog 4 bij.",
              "explanation": "9 × 4 = 36."
            }
          ]
        },
        {
          "id": "lootCrate-slot-2",
          "variants": [
            {
              "id": "lootCrate-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "7 × 6 = ?",
              "answer": 42,
              "choices": [
                36,
                48,
                42,
                54
              ],
              "hintMinnie": "Denk aan 7 groepjes van 6.",
              "hintMoose": "Reken eerst 6 × 6 = 36. Tel er nog 6 bij.",
              "explanation": "7 × 6 = 42."
            },
            {
              "id": "lootCrate-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "3 × 5 = ?",
              "answer": 15,
              "hintMinnie": "Denk aan 3 groepjes van 5.",
              "hintMoose": "Reken eerst 2 × 5 = 10. Tel er nog 5 bij.",
              "explanation": "3 × 5 = 15."
            }
          ]
        },
        {
          "id": "lootCrate-slot-3",
          "variants": [
            {
              "id": "lootCrate-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "In de kist zitten 4 pakjes met elk 8 batterijen. Hoeveel batterijen zijn dat samen?",
              "answer": 32,
              "choices": [
                24,
                40,
                32,
                48
              ],
              "hintMinnie": "Denk aan 4 groepjes van 8.",
              "hintMoose": "Reken eerst 3 × 8 = 24. Tel er nog 8 bij.",
              "explanation": "4 × 8 = 32."
            },
            {
              "id": "lootCrate-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Valente verdeelt 42 batterijen gelijk over 6 tasjes. Hoeveel batterijen krijgt elk tasje?",
              "answer": 7,
              "hintMinnie": "Hoeveel keer 6 past in 42?",
              "hintMoose": "Gebruik de keersom: 7 × 6 = 42.",
              "explanation": "42 : 6 = 7, want 7 × 6 = 42."
            }
          ]
        },
        {
          "id": "lootCrate-slot-4",
          "variants": [
            {
              "id": "lootCrate-4a",
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
              "hintMinnie": "Hoeveel keer 8 past in 72?",
              "hintMoose": "Gebruik de keersom: 9 × 8 = 72.",
              "explanation": "72 : 8 = 9, want 9 × 8 = 72."
            },
            {
              "id": "lootCrate-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "24 : 4 = ?",
              "answer": 6,
              "hintMinnie": "Hoeveel keer 4 past in 24?",
              "hintMoose": "Gebruik de keersom: 6 × 4 = 24.",
              "explanation": "24 : 4 = 6, want 6 × 4 = 24."
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
              "prompt": "9 × 7 = ?",
              "answer": 63,
              "hintMinnie": "Denk aan 9 groepjes van 7.",
              "hintMoose": "Reken eerst 8 × 7 = 56. Tel er nog 7 bij.",
              "explanation": "9 × 7 = 63."
            },
            {
              "id": "raiderCache-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 6 = ?",
              "answer": 48,
              "choices": [
                42,
                54,
                48,
                60
              ],
              "hintMinnie": "Denk aan 8 groepjes van 6.",
              "hintMoose": "Reken eerst 7 × 6 = 42. Tel er nog 6 bij.",
              "explanation": "8 × 6 = 48."
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
              "prompt": "10 × 3 = ?",
              "answer": 30,
              "choices": [
                27,
                33,
                30,
                36
              ],
              "hintMinnie": "Denk aan 10 groepjes van 3.",
              "hintMoose": "Reken eerst 9 × 3 = 27. Tel er nog 3 bij.",
              "explanation": "10 × 3 = 30."
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
              "hintMinnie": "Denk aan 7 groepjes van 4.",
              "hintMoose": "Reken eerst 6 × 4 = 24. Tel er nog 4 bij.",
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
              "prompt": "In de voorraad liggen 3 dozen met elk 6 lampen. Hoeveel lampen zijn dat samen?",
              "answer": 18,
              "hintMinnie": "Denk aan 3 groepjes van 6.",
              "hintMoose": "Reken eerst 2 × 6 = 12. Tel er nog 6 bij.",
              "explanation": "3 × 6 = 18."
            },
            {
              "id": "raiderCache-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Valente pakt 5 bundels met elk 9 kabels. Hoeveel kabels zijn dat samen?",
              "answer": 45,
              "choices": [
                36,
                54,
                45,
                63
              ],
              "hintMinnie": "Denk aan 5 groepjes van 9.",
              "hintMoose": "Reken eerst 4 × 9 = 36. Tel er nog 9 bij.",
              "explanation": "5 × 9 = 45."
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
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Valente verdeelt 40 flesjes gelijk over 5 kratten. Hoeveel flesjes komen in elk krat?",
              "answer": 8,
              "choices": [
                10,
                7,
                9,
                8
              ],
              "hintMinnie": "Hoeveel keer 5 past in 40?",
              "hintMoose": "Gebruik de keersom: 8 × 5 = 40.",
              "explanation": "40 : 5 = 8, want 8 × 5 = 40."
            },
            {
              "id": "raiderCache-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Een fles water kost 2 euro. Valente koopt 6 flessen. Hoeveel euro betaalt hij?",
              "answer": 12,
              "hintMinnie": "Denk aan 6 groepjes van 2.",
              "hintMoose": "Reken eerst 5 × 2 = 10. Tel er nog 2 bij.",
              "explanation": "6 × 2 = 12."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "car",
      "objectId": "car",
      "name": "Auto",
      "shortName": "Auto",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt de auto met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "car"
    },
    {
      "id": "lootCrate",
      "objectId": "lootCrate",
      "name": "Loot crate",
      "shortName": "Loot crate",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt de buitkist met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "lootCrate"
    },
    {
      "id": "raiderCache",
      "objectId": "raiderCache",
      "name": "Raider Cache",
      "shortName": "Raider Cache",
      "defaultAction": "activate",
      "intro": "Valente onderzoekt de Raider Cache met Sven.",
      "prompt": "Los de vier rekenvragen op.",
      "solved": "Deze plek is onderzocht!",
      "challengeId": "raiderCache"
    }
  ],
  "hotspots": [
    {
      "id": "damExit",
      "objectId": "damExit",
      "type": "exit",
      "name": "Vertrek bij de dam",
      "defaultAction": "activate",
      "prompt": "Valente wacht aan het einde van het pad.",
      "solved": "De verkenning van de dam is klaar."
    }
  ],
  "exitHotspotId": "damExit",
  "exitActionLabel": "Rond de verkenning af",
  "exits": [
    {
      "id": "damExit",
      "targetLevel": "LVL-0033",
      "lockedUntilComplete": true
    }
  ],
  "areas": [
    {
      "id": "car",
      "name": "Auto",
      "description": "Onderzoek de auto met Valente."
    },
    {
      "id": "lootCrate",
      "name": "Loot crate",
      "description": "Onderzoek Loot crate met Valente."
    },
    {
      "id": "raiderCache",
      "name": "Raider Cache",
      "description": "Onderzoek Raider Cache met Valente."
    }
  ],
  "intro": [
    "Bij de oude dam wacht Valente. Tussen het beton en de planten liggen nog bruikbare spullen.",
    "Onderzoek de auto, de buitkist en de Raider Cache. Daarna kunnen jullie de verkenning afronden."
  ],
  "theme": "ARC Atlas",
  "menu": {
    "illustration": "Levels/LVL-0032/DamBattlegrounds.png",
    "badge": "3 opdrachten",
    "detail": "Auto, Loot crate en Raider Cache"
  },
  "sceneEffects": [
    {
      "id": "sun-presence-01",
      "label": "Warm day sun 1",
      "presetId": "sun-presence",
      "variantId": "warm-day-sun",
      "presetVersion": 1,
      "enabled": true,
      "seed": 824390327,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 177,
        "y": 140,
        "radius": 250
      },
      "overrides": {
        "rayEndAngle": 110,
        "intensity": 0.8,
        "rayDriftSpeed": 1,
        "rayAnimationAmount": 1.36,
        "animationSpeed": 0.79,
        "opacity": 0.76
      }
    }
  ],
  "reward": {
    "title": "Dam Battlegrounds voltooid",
    "line": "Samen met Valente heeft Sven alle drie de plekken bij de dam onderzocht.",
    "art": "Levels/LVL-0032/Valente.png",
    "badge": "Dam Battlegrounds verkend",
    "nextLevelId": "LVL-0033",
    "nextLabel": "Naar Buried City"
  },
  "spiritLines": {
    "welcome": "Welkom bij de dam, Sven.",
    "moving": "Er is hier nog veel te ontdekken.",
    "allRunes": "We hebben alle drie de plekken onderzocht.",
    "reward": "De verkenning is klaar."
  },
  "levelSemantics": {
    "setting": "een verlaten dam met overwoekerde gebouwen",
    "mood": "avontuurlijk, zonnig en nieuwsgierig",
    "companionFocus": {
      "minnie": "planten tussen het beton en verborgen voorraden",
      "moose": "stevige bestrating en de oude dam"
    }
  },
  "companionMoments": [
    {
      "id": "arc-car-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "car",
      "speaker": "minnie",
      "text": "Er groeien plantjes naast die auto. Misschien ook op de achterbank?"
    },
    {
      "id": "arc-crate-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "lootCrate",
      "speaker": "moose",
      "text": "Die kist heeft het hier lang uitgehouden. Stevig spul."
    },
    {
      "id": "arc-cache-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "raiderCache",
      "speaker": "minnie",
      "text": "Dat rode lampje brandt nog. Zou hier nog stroom zijn?"
    },
    {
      "id": "arc-milestone",
      "event": "LEVEL_PROGRESS_MILESTONE",
      "speaker": "moose",
      "text": "Vanaf hier zie je pas hoe groot die dam is."
    },
    {
      "id": "arc-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Valente blijft nog even bij de dam. Ik blijf bij Valente."
    },
    {
      "id": "arc-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Dam Battlegrounds… ooit gaf deze dam stroom. Nu wemelt het hier van de ARC."
    },
    {
      "id": "arc-open",
      "event": "CHALLENGE_OPEN",
      "speaker": "moose",
      "text": "Valente kent deze plek. Dat stelt me gerust."
    },
    {
      "id": "arc-success",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Zo krijgt dit verlaten plekje weer een verhaal."
    },
    {
      "id": "arc-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Een stevige dam. En een stevige wandeling achter de rug."
    },
    {
      "id": "arc-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Dag, oude dam. Zorg goed voor je kleine plantjes."
    }
  ],
  "ambientFlybys": [
    {
      "id": "arc_wasp2",
      "label": "arc_wasp2",
      "frameA": "assets/ambient/flybys/arc_wasp/awc_wasp.png",
      "frameB": null,
      "sound": "assets/ambient/flybys/arc_wasp/arc_wasp.mp3",
      "path": [
        {
          "x": 2291,
          "y": 28
        },
        {
          "x": 874,
          "y": 153
        },
        {
          "x": 99,
          "y": -57
        }
      ],
      "scale": 0.22,
      "speed": 50,
      "flapFrequencyHz": 7,
      "faceFlightDirection": false,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 15000,
      "syncKey": "",
      "startDelayMs": 0,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": false,
      "maxRotationDeg": 8,
      "motionProfile": "smooth",
      "wobble": 14,
      "speedVariation": 0.14,
      "flutterFrequency": 2.1
    }
  ]
};
