window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0001"] = {
  "id": "LVL-0001",
  "title": "De Runenpoort",
  "subtitle": "Verken een vergeten Vikingtempel en ontdek het geheim van de oude runen.",
  "description": "Sven reist door een oud bos naar een vergeten Vikingtempel en ontdekt het geheim van de oude runen.",
  "storageKey": "svenadventure-runenpoort-v1",
  "progressKey": "svenadventure-table-progress-v1",
  "menu": {
    "illustration": "Levels/LVL-0001/assets/level-1-wide-world.png",
    "badge": "3 plekken",
    "detail": "Een vergeten Vikingtempel en oude runen"
  },
  "companion": {
    "name": "Runewachter",
    "portrait": "Levels/LVL-0001/assets/viking-spirit.png"
  },
  "challengeCharacter": {
    "id": "runewachter",
    "name": "Runewachter",
    "portrait": "Levels/LVL-0001/assets/viking-spirit.png",
    "role": "runenwachter"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/minnie.png"
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/moose.png"
    }
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0001/assets/level-1-wide-world.png"
  },
  "challengeArt": "Levels/LVL-0001/assets/rune-stones.png",
  "player": {
    "startNode": "forest-start",
    "start": {
      "x": 175,
      "y": 635
    }
  },
  "ambientAnimals": [
    {
      "id": "forestOwl",
      "type": "owl",
      "openFrame": "assets/ambient/animals/owl/owl-open.png",
      "closedFrame": "assets/ambient/animals/owl/owl-closed.png",
      "sound": "assets/ambient/animals/owl/owl-call.mp3",
      "x": 274,
      "y": 123,
      "scale": 0.18,
      "blinkMinMs": 4000,
      "blinkMaxMs": 9000,
      "blinkDurationMs": 90,
      "doubleBlinkChance": 0.15,
      "soundCooldownMs": 750,
      "label": "Uil",
      "softness": 0.3,
      "saturation": 0.92,
      "soundVolume": 0.65
    }
  ],
  "interactiveObjects": [
    {
      "id": "forestRune",
      "type": "ambient",
      "center": {
        "x": 273,
        "y": 468
      },
      "radius": 48,
      "objectId": "forestRune",
      "approachNode": "forest-rune-approach",
      "label": "Bosrune"
    },
    {
      "id": "zon",
      "type": "rune",
      "center": {
        "x": 1384,
        "y": 153
      },
      "radius": 46,
      "approachNode": "sun-rune-approach",
      "label": "Zonrune"
    },
    {
      "id": "steen",
      "type": "rune",
      "center": {
        "x": 1467,
        "y": 317
      },
      "radius": 44,
      "approachNode": "stone-rune-approach",
      "label": "Steenrune"
    },
    {
      "id": "wind",
      "type": "rune",
      "center": {
        "x": 1750,
        "y": 485
      },
      "radius": 45,
      "approachNode": "wind-rune-approach",
      "label": "Windrune"
    },
    {
      "id": "templeGate",
      "type": "gate",
      "center": {
        "x": 1849,
        "y": 354
      },
      "radius": 104,
      "objectId": "templeGate",
      "approachNode": "gate-step-upper",
      "label": "Runenpoort"
    }
  ],
  "walkPath": [
    {
      "id": "forest-start",
      "x": 175,
      "y": 635
    },
    {
      "id": "forest-rune-approach",
      "x": 322,
      "y": 625,
      "role": "approach"
    },
    {
      "id": "center-trail",
      "x": 885,
      "y": 609
    },
    {
      "id": "lower-trail",
      "x": 1017,
      "y": 615
    },
    {
      "id": "trail-rise-2",
      "x": 1155,
      "y": 575
    },
    {
      "id": "trail-top",
      "x": 1231,
      "y": 532
    },
    {
      "id": "sun-rune-approach",
      "x": 1322,
      "y": 565,
      "role": "approach"
    },
    {
      "id": "stone-rune-approach",
      "x": 1454,
      "y": 601,
      "role": "approach"
    },
    {
      "id": "temple-approach",
      "x": 1617,
      "y": 594
    },
    {
      "id": "gate-step-low",
      "x": 1679,
      "y": 579
    },
    {
      "id": "wind-rune-approach",
      "x": 1697,
      "y": 536,
      "role": "approach"
    },
    {
      "id": "gate-step-upper",
      "x": 1847,
      "y": 481,
      "role": "approach"
    }
  ],
  "intro": [
    "Sven komt aan bij een oud bos.",
    "Tussen de bomen ligt een pad naar een Vikingtempel.",
    "Daar wacht de Runenpoort."
  ],
  "spiritName": "Runewachter",
  "spiritLines": {
    "welcome": "Welkom, Sven. Volg het pad naar de tempel.",
    "chooseRune": "Kies een opdracht om te beginnen.",
    "moving": "Let op het pad tussen de wortels.",
    "allRunes": "Je kunt verder. De tempel wacht op je!",
    "reward": "Goed gedaan, Sven. Jij hebt de Runenpoort geopend."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Oeh, dit bos zit vol geheimen."
    },
    "start": {
      "speaker": "minnie",
      "text": "Volgens mij glimt daar iets. Zullen we kijken?"
    },
    "moving": {
      "speaker": "moose",
      "text": "Rustig langs de stenen. Ik zie de poort al."
    },
    "forest": {
      "speaker": "minnie",
      "text": "Tussen die bomen zit vast iets verstopt."
    },
    "temple": {
      "speaker": "moose",
      "text": "Daar is de tempel. Die poort gaat niet zomaar open."
    },
    "object": {
      "speaker": "minnie",
      "text": "Kijk! Een steen met een geheim teken."
    },
    "runeSolved": {
      "speaker": "minnie",
      "text": "Yes! Weer een opdracht voltooid."
    },
    "allRunes": {
      "speaker": "moose",
      "text": "Je kunt verder. Nu voorzichtig naar de poort."
    },
    "reward": {
      "speaker": "moose",
      "text": "Goed gedaan, Sven. De poort is open."
    }
  },
  "levelSemantics": {
    "setting": "een vergeten Vikingbos met een tempelpoort",
    "mood": "mysterieus, warm en verwachtingsvol",
    "companionFocus": {
      "minnie": "glimmende runen, mos en verborgen tekens",
      "moose": "oude stenen, veilige stappen en de zware poort"
    }
  },
  "companionPolicy": {
    "disabledEvents": [
      "LEVEL_PROGRESS_MILESTONE"
    ],
    "attentionOncePerVisit": true
  },
  "companionMoments": [
    {
      "id": "runenpoort-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Kijk, blauwe tekens tussen de oude bomen."
    },
    {
      "id": "runenpoort-forest-rune",
      "event": "AMBIENT_ATTENTION",
      "objectId": "forestRune",
      "speaker": "minnie",
      "text": "Deze bossteen wijst naar de tempel. Handig, zo'n stenen wegwijzer."
    },
    {
      "id": "runenpoort-zon",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "zon",
      "speaker": "minnie",
      "text": "De Zonrune voelt warm. Welke som laat haar feller gloeien?"
    },
    {
      "id": "runenpoort-steen",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "steen",
      "speaker": "moose",
      "text": "De Steenrune is zwaar en stil. Net als een steen, verrassend genoeg."
    },
    {
      "id": "runenpoort-wind",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "wind",
      "speaker": "minnie",
      "text": "Freya staat bij de tempel. Laten we naar haar toe gaan."
    },
    {
      "id": "runenpoort-progress",
      "event": "LEVEL_PROGRESS_MILESTONE",
      "speaker": "moose",
      "text": "{completed} van de {total} opdrachten voltooid. Nog {remainingChallenges} te doen."
    },
    {
      "id": "runenpoort-exit-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Nog {remainingChallenges} te gaan. Daarna kan de tempelpoort open."
    },
    {
      "id": "runenpoort-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "moose",
      "text": "De Runenpoort is open. Mooi werk, Sven."
    },
    {
      "id": "runenpoort-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "minnie",
      "text": "De tempelpoort is open. Op naar de tempel."
    }
  ],
  "areas": [
    {
      "id": "forest",
      "name": "Bos",
      "start": 0,
      "end": 1120
    },
    {
      "id": "temple",
      "name": "Tempel",
      "start": 1120,
      "end": 2172
    }
  ],
  "hotspots": [
    {
      "id": "forestRune",
      "objectId": "forestRune",
      "type": "ambient",
      "name": "Bosrune",
      "defaultAction": "look",
      "look": "Een oude steen. Hij wijst naar de tempel.",
      "activate": "De steen gloeit zacht. Het pad voelt veilig."
    },
    {
      "id": "templeGate",
      "objectId": "templeGate",
      "type": "gate",
      "name": "Runenpoort",
      "defaultAction": "activate",
      "look": "Achter deze oude poort ligt de tempel.",
      "activate": "Hier gaat de route naar de tempel verder."
    }
  ],
  "learningChallenges": [
    {
      "id": "zon",
      "anchorId": "zon",
      "challengeCharacterId": "runewachter",
      "questions": [
        {
          "id": "zon-slot-1",
          "variants": [
            {
              "id": "zon-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 10 = ?",
              "answer": 50,
              "hintParameters": {"a":5,"b":10},
              "explanation": "5 × 10 = 50."
            },
            {
              "id": "zon-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 8 = ?",
              "answer": 32,
              "choices": [
                24,
                32,
                40,
                48
              ],
              "hintParameters": {"a":4,"b":8},
              "explanation": "4 × 8 = 32."
            }
          ]
        },
        {
          "id": "zon-slot-2",
          "variants": [
            {
              "id": "zon-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Rond het zonneteken liggen 4 kringen met elk 7 gouden schijfjes. Hoeveel schijfjes zijn dat samen?",
              "answer": 28,
              "hintParameters": {"a":4,"b":7},
              "explanation": "4 × 7 = 28."
            },
            {
              "id": "zon-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "2 × 4 = ?",
              "answer": 8,
              "hintParameters": {"a":2,"b":4},
              "explanation": "2 × 4 = 8."
            }
          ]
        },
        {
          "id": "zon-slot-3",
          "variants": [
            {
              "id": "zon-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 9 = ?",
              "answer": 72,
              "choices": [
                63,
                72,
                81,
                90
              ],
              "hintParameters": {"a":8,"b":9},
              "explanation": "8 × 9 = 72."
            },
            {
              "id": "zon-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 5 = ?",
              "answer": 25,
              "hintParameters": {"a":5,"b":5},
              "explanation": "5 × 5 = 25."
            }
          ]
        },
        {
          "id": "zon-slot-4",
          "variants": [
            {
              "id": "zon-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 7 = ?",
              "answer": 56,
              "choices": [
                49,
                56,
                63,
                70
              ],
              "hintParameters": {"a":8,"b":7},
              "explanation": "8 × 7 = 56."
            },
            {
              "id": "zon-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "35 : 5 = ?",
              "answer": 7,
              "choices": [
                6,
                7,
                8,
                9
              ],
              "hintParameters": {"a":35,"b":5},
              "explanation": "35 : 5 = 7."
            }
          ]
        }
      ]
    },
    {
      "id": "steen",
      "anchorId": "steen",
      "challengeCharacterId": "runewachter",
      "questions": [
        {
          "id": "steen-slot-1",
          "variants": [
            {
              "id": "steen-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Voor het steenteken bouwt de Viking 3 stapels van 8 stenen. Hoeveel stenen gebruikt hij?",
              "answer": 24,
              "hintParameters": {"a":3,"b":8},
              "explanation": "3 × 8 = 24."
            },
            {
              "id": "steen-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "2 × 6 = ?",
              "answer": 12,
              "choices": [
                6,
                12,
                18,
                24
              ],
              "hintParameters": {"a":2,"b":6},
              "explanation": "2 × 6 = 12."
            }
          ]
        },
        {
          "id": "steen-slot-2",
          "variants": [
            {
              "id": "steen-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 10 = ?",
              "answer": 70,
              "hintParameters": {"a":7,"b":10},
              "explanation": "7 × 10 = 70."
            },
            {
              "id": "steen-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 8 = ?",
              "answer": 48,
              "choices": [
                40,
                48,
                56,
                64
              ],
              "hintParameters": {"a":6,"b":8},
              "explanation": "6 × 8 = 48."
            }
          ]
        },
        {
          "id": "steen-slot-3",
          "variants": [
            {
              "id": "steen-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "20 : 5 = ?",
              "answer": 4,
              "choices": [
                3,
                4,
                5,
                6
              ],
              "hintParameters": {"a":20,"b":5},
              "explanation": "20 : 5 = 4."
            },
            {
              "id": "steen-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "8 × 8 = ?",
              "answer": 64,
              "choices": [
                56,
                64,
                72,
                80
              ],
              "hintParameters": {"a":8,"b":8},
              "explanation": "8 × 8 = 64."
            }
          ]
        },
        {
          "id": "steen-slot-4",
          "variants": [
            {
              "id": "steen-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "2 × 9 = ?",
              "answer": 18,
              "hintParameters": {"a":2,"b":9},
              "explanation": "2 × 9 = 18."
            },
            {
              "id": "steen-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De Viking verdeelt 63 stenen eerlijk over 7 bouwers. Hoeveel stenen krijgt iedere bouwer?",
              "answer": 9,
              "choices": [
                8,
                9,
                10,
                11
              ],
              "hintParameters": {"a":63,"b":7},
              "explanation": "63 : 7 = 9."
            }
          ]
        }
      ]
    },
    {
      "id": "wind",
      "anchorId": "wind",
      "challengeCharacterId": "runewachter",
      "presentationType": "npc",
      "requiresAllOtherChallenges": true,
      "unlocksLevelProgression": true,
      "npc": {
        "characterId": "freya",
        "displayName": "Freya",
        "scale": 1.23,
        "facing": "native",
        "brightness": 1,
        "idleIntervalMinMs": 2500,
        "idleIntervalMaxMs": 4500,
        "playbackRate": 1,
        "successIdleBeatMs": 650
      },
      "questions": [
        {
          "id": "wind-slot-1",
          "variants": [
            {
              "id": "wind-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "14 : 7 = ?",
              "answer": 2,
              "choices": [
                1,
                2,
                3,
                4
              ],
              "hintParameters": {"a":14,"b":7},
              "explanation": "14 : 7 = 2."
            },
            {
              "id": "wind-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 2 = ?",
              "answer": 12,
              "hintParameters": {"a":6,"b":2},
              "explanation": "6 × 2 = 12."
            }
          ]
        },
        {
          "id": "wind-slot-2",
          "variants": [
            {
              "id": "wind-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "36 : 4 = ?",
              "answer": 9,
              "choices": [
                8,
                9,
                10,
                11
              ],
              "hintParameters": {"a":36,"b":4},
              "explanation": "36 : 4 = 9."
            },
            {
              "id": "wind-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "24 : 6 = ?",
              "answer": 4,
              "choices": [
                3,
                4,
                5,
                6
              ],
              "hintParameters": {"a":24,"b":6},
              "explanation": "24 : 6 = 4."
            }
          ]
        },
        {
          "id": "wind-slot-3",
          "variants": [
            {
              "id": "wind-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Op de havenmarkt koopt de Viking 5 vlaggen voor 6 munten per stuk. Hoeveel munten betaalt hij?",
              "answer": 30,
              "hintParameters": {"a":5,"b":6,"currency":"munten"},
              "explanation": "5 × 6 = 30 munten."
            },
            {
              "id": "wind-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De Viking verdeelt 25 gekleurde linten eerlijk over 5 vlaggenmasten. Hoeveel linten komen aan iedere mast?",
              "answer": 5,
              "choices": [
                4,
                5,
                6,
                7
              ],
              "hintParameters": {"a":25,"b":5},
              "explanation": "25 : 5 = 5."
            }
          ]
        },
        {
          "id": "wind-slot-4",
          "variants": [
            {
              "id": "wind-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Aan 8 vlaggenmasten hangen elk 7 linten. Hoeveel linten hangen er in totaal?",
              "answer": 56,
              "choices": [
                49,
                56,
                63,
                70
              ],
              "hintParameters": {"a":8,"b":7},
              "explanation": "8 × 7 = 56."
            },
            {
              "id": "wind-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Aan 6 vlaggenmasten hangen elk 4 linten. Hoeveel linten hangen er in totaal?",
              "answer": 24,
              "hintParameters": {"a":6,"b":4},
              "explanation": "6 × 4 = 24."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "zon",
      "objectId": "zon",
      "name": "Zonrune",
      "shortName": "Zon",
      "defaultAction": "activate",
      "intro": "De Zonrune voelt warm aan.",
      "solved": "Goed zo! De Zonrune gloeit.",
      "challengeId": "zon"
    },
    {
      "id": "steen",
      "objectId": "steen",
      "name": "Steenrune",
      "shortName": "Steen",
      "defaultAction": "activate",
      "intro": "De Steenrune bromt zacht.",
      "solved": "Sterk! De Steenrune is wakker.",
      "challengeId": "steen"
    },
    {
      "id": "wind",
      "objectId": "wind",
      "name": "Windrune",
      "shortName": "Wind",
      "defaultAction": "activate",
      "intro": "De Windrune suist in het mos.",
      "solved": "Mooi! De Windrune zingt.",
      "challengeId": "wind"
    }
  ],
  "sceneEffects": [
    {
      "id": "focused-fog-01",
      "label": "Focused Fog 1",
      "presetId": "focused-fog",
      "variantId": "default-focused-fog",
      "presetVersion": 1,
      "enabled": true,
      "seed": 630476710,
      "qualityTier": "auto",
      "layerSlot": "foregroundAtmosphere",
      "groupId": "",
      "geometry": {
        "type": "rectangle",
        "x": 1009,
        "y": 395,
        "width": 458,
        "height": 94
      },
      "overrides": {
        "primaryColor": "#F1F9D2"
      }
    },
    {
      "id": "magical-glow-02",
      "label": "Rune 2",
      "presetId": "magical-glow",
      "variantId": "rune",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1223284576,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 273,
        "y": 467,
        "radius": 69
      },
      "overrides": {}
    },
    {
      "id": "magical-glow-03",
      "label": "Rune 3",
      "presetId": "magical-glow",
      "variantId": "rune",
      "presetVersion": 1,
      "enabled": true,
      "seed": 143671633,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 1384,
        "y": 153,
        "radius": 69
      },
      "overrides": {}
    },
    {
      "id": "magical-glow-04",
      "label": "Rune 4",
      "presetId": "magical-glow",
      "variantId": "rune",
      "presetVersion": 1,
      "enabled": true,
      "seed": 45844646,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 1469,
        "y": 316,
        "radius": 73
      },
      "overrides": {}
    },
    {
      "id": "magical-glow-05",
      "label": "Rune 5",
      "presetId": "magical-glow",
      "variantId": "rune",
      "presetVersion": 1,
      "enabled": false,
      "seed": 300417825,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 2126,
        "y": 407,
        "radius": 66
      },
      "overrides": {}
    },
    {
      "id": "magical-glow-06",
      "label": "Rune 6",
      "presetId": "magical-glow",
      "variantId": "rune",
      "presetVersion": 1,
      "enabled": true,
      "seed": 2049802268,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 1849,
        "y": 355,
        "radius": 135
      },
      "overrides": {}
    },
    {
      "id": "sun-presence-07",
      "label": "Golden hour sun 7",
      "presetId": "sun-presence",
      "variantId": "golden-hour-sun",
      "presetVersion": 1,
      "enabled": true,
      "seed": 2011289740,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 163,
        "y": 199,
        "radius": 134
      },
      "overrides": {
        "rayEndAngle": 98
      }
    }
  ],
  "reward": {
    "title": "De poort gaat open!",
    "badge": "Bewaker van de Runenpoort",
    "line": "Sven reisde door het bos en opende de oude Vikingpoort.",
    "art": "Levels/LVL-0001/assets/reward.png",
    "nextLevelId": "LVL-0002",
    "nextLabel": "De tempel in"
  }
};
