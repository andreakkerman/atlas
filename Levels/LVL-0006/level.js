window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0006"] = {
  "id": "LVL-0006",
  "title": "De Minisub",
  "subtitle": "Diep in de Nautilus wacht de kleine onderzeeer.",
  "description": "Sven vindt de minisub en maakt het ontsnappingsluik klaar.",
  "storageKey": "svenadventure-nautilus-minisub-v1",
  "progressKey": "svenadventure-table-progress-v1",
  "exitHotspotId": "escapeHatch",
  "exitActionLabel": "Ontsnappen",
  "challengeLabel": "Hangarproef",
  "challengeCompleteLabel": "Opdracht afronden",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "hangarproeven",
  "menu": {
    "illustration": "Levels/LVL-0006/assets/nautilus-mini-sub.png",
    "badge": "Verbonden gebied",
    "detail": "Hangar, drukmeters en ontsnappingsluik"
  },
  "companion": {
    "name": "Kapitein Nemo",
    "portrait": "Levels/LVL-0006/assets/captain-nemo.png"
  },
  "challengeCharacter": {
    "id": "captain-nemo",
    "name": "Kapitein Nemo",
    "portrait": "Levels/LVL-0006/assets/captain-nemo.png",
    "role": "kapitein van de Nautilus"
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
    "background": "Levels/LVL-0006/assets/nautilus-mini-sub.png"
  },
  "challengeArt": "Levels/LVL-0006/assets/captain-nemo.png",
  "player": {
    "startNode": "left-door-start",
    "start": {
      "x": 202,
      "y": 532
    }
  },
  "interactiveObjects": [
    {
      "id": "divingSuit",
      "type": "rune",
      "center": {
        "x": 565,
        "y": 328
      },
      "radius": 78,
      "approachNode": "suit-approach",
      "label": "Duikpak"
    },
    {
      "id": "miniSub",
      "type": "rune",
      "center": {
        "x": 972,
        "y": 311
      },
      "radius": 118,
      "approachNode": "mini-sub-approach",
      "label": "Minisub"
    },
    {
      "id": "controlPanel",
      "type": "rune",
      "center": {
        "x": 1613,
        "y": 326
      },
      "radius": 82,
      "approachNode": "control-panel-approach",
      "label": "Drukpaneel"
    },
    {
      "id": "escapeHatch",
      "type": "gate",
      "center": {
        "x": 1953,
        "y": 353
      },
      "radius": 112,
      "approachNode": "hatch-approach",
      "label": "Ontsnappingsluik"
    }
  ],
  "walkPath": [
    {
      "id": "left-door-start",
      "x": 202,
      "y": 532
    },
    {
      "id": "suit-approach",
      "x": 527,
      "y": 490,
      "role": "approach"
    },
    {
      "id": "hangar-center-left",
      "x": 783,
      "y": 503
    },
    {
      "id": "mini-sub-approach",
      "x": 975,
      "y": 508,
      "role": "approach"
    },
    {
      "id": "hangar-center-right",
      "x": 1368,
      "y": 493
    },
    {
      "id": "control-panel-approach",
      "x": 1571,
      "y": 513,
      "role": "approach"
    },
    {
      "id": "hatch-approach",
      "x": 1847,
      "y": 524,
      "role": "approach"
    }
  ],
  "intro": [
    "Sven komt in de hangar van de Nautilus.",
    "In het midden ligt een kleine onderzeeer.",
    "Het ontsnappingsluik zit nog vast."
  ],
  "spiritName": "Kapitein Nemo",
  "spiritLines": {
    "welcome": "De minisub wacht.",
    "chooseRune": "Maak de hangar klaar.",
    "moving": "De machines tikken en sissen.",
    "allRunes": "Het ontsnappingsluik is veilig.",
    "reward": "De minisub kan vertrekken."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Oeh, een kleine duikboot in een grote duikboot."
    },
    "start": {
      "speaker": "minnie",
      "text": "Daar staan meters, pakken en hendels."
    },
    "moving": {
      "speaker": "moose",
      "text": "Niet rennen. Ik hoor druk in de leidingen."
    },
    "hangar": {
      "speaker": "moose",
      "text": "Eerst druk, luik en minisub. Dan pas naar buiten."
    },
    "object": {
      "speaker": "minnie",
      "text": "Oeh, dit lijkt op een geheime ontsnapping."
    },
    "allRunes": {
      "speaker": "moose",
      "text": "De druk klopt. Het luik kan veilig open."
    },
    "reward": {
      "speaker": "moose",
      "text": "Naar buiten. Rustig en precies."
    }
  },
  "levelSemantics": {
    "setting": "de hangar van de Nautilus met een minisub, drukmeters en een ontsnappingsluik",
    "mood": "gespannen, technisch en avontuurlijk",
    "companionFocus": {
      "minnie": "de kleine onderzeeer, koperen meters en geheime ontsnappingen",
      "moose": "druk, luiken, machines en veilige volgorde"
    }
  },
  "companionPolicy": {
    "disabledEvents": [
      "CHALLENGE_SUCCESS",
      "LEVEL_PROGRESS_MILESTONE"
    ],
    "attentionOncePerVisit": true
  },
  "companionMoments": [
    {
      "id": "minisub-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Een kleine duikboot in een grote duikboot. Perfect."
    },
    {
      "id": "minisub-suit-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "divingSuit",
      "speaker": "moose",
      "text": "Dat duikpak ziet er zwaar uit. Ik pas."
    },
    {
      "id": "minisub-craft-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "miniSub",
      "speaker": "minnie",
      "text": "Kijk, daar is de minisub. Je ziet alle koperen platen."
    },
    {
      "id": "minisub-panel-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "controlPanel",
      "speaker": "moose",
      "text": "Dat paneel staat vol meters. Even kijken wat ze aangeven."
    },
    {
      "id": "minisub-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "moose",
      "text": "Die staat goed. De druk blijft waar hij hoort."
    },
    {
      "id": "minisub-progress",
      "event": "LEVEL_PROGRESS_MILESTONE",
      "speaker": "minnie",
      "text": "We komen dichter bij het luik. Ik voel het."
    },
    {
      "id": "minisub-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Nog {remainingChallenges} te gaan. Daarna kan het luik open."
    },
    {
      "id": "minisub-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De meters staan goed. We kunnen het luik openen."
    },
    {
      "id": "minisub-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Naar buiten! Nou ja, naar het water buiten."
    }
  ],
  "areas": [
    {
      "id": "hangar",
      "name": "Minisubhangar",
      "start": 0,
      "end": 2172,
      "guideLine": "hangar"
    }
  ],
  "hotspots": [
    {
      "id": "escapeHatch",
      "objectId": "escapeHatch",
      "type": "gate",
      "name": "Ontsnappingsluik",
      "defaultAction": "activate",
      "look": "Een rond luik naar buiten. De druk moet eerst goed zijn.",
      "activate": "Het luik opent naar een verborgen grot."
    }
  ],
  "learningChallenges": [
    {
      "id": "divingSuit",
      "anchorId": "divingSuit",
      "challengeCharacterId": "captain-nemo",
      "questions": [
        {
          "id": "divingSuit-slot-1",
          "variants": [
            {
              "id": "divingSuit-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 3 = ?",
              "answer": 27,
              "hintParameters": {"a":9,"b":3},
              "explanation": "9 × 3 = 27."
            },
            {
              "id": "divingSuit-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "choices": [
                48,
                56,
                64,
                72
              ],
              "hintParameters": {"a":7,"b":8},
              "explanation": "7 × 8 = 56."
            }
          ]
        },
        {
          "id": "divingSuit-slot-2",
          "variants": [
            {
              "id": "divingSuit-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 8 = ?",
              "answer": 64,
              "hintParameters": {"a":8,"b":8},
              "explanation": "8 × 8 = 64."
            },
            {
              "id": "divingSuit-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Aan 5 duikpakken zitten elk 4 koperen sluitingen. Hoeveel sluitingen zijn dat samen?",
              "answer": 20,
              "hintParameters": {"a":5,"b":4},
              "explanation": "5 × 4 = 20."
            }
          ]
        },
        {
          "id": "divingSuit-slot-3",
          "variants": [
            {
              "id": "divingSuit-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Nemo verdeelt 15 koperen sluitingen eerlijk over 3 duikpakken. Hoeveel sluitingen krijgt ieder pak?",
              "answer": 5,
              "hintParameters": {"a":15,"b":3},
              "explanation": "15 : 3 = 5."
            },
            {
              "id": "divingSuit-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Nemo verdeelt 10 koperen sluitingen eerlijk over 2 duikpakken. Hoeveel sluitingen krijgt ieder pak?",
              "answer": 5,
              "hintParameters": {"a":10,"b":2},
              "explanation": "10 : 2 = 5."
            }
          ]
        },
        {
          "id": "divingSuit-slot-4",
          "variants": [
            {
              "id": "divingSuit-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "3 × 7 = ?",
              "answer": 21,
              "hintParameters": {"a":3,"b":7},
              "explanation": "3 × 7 = 21."
            },
            {
              "id": "divingSuit-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Aan 6 duikpakken zitten elk 9 koperen sluitingen. Hoeveel sluitingen zijn dat samen?",
              "answer": 54,
              "choices": [
                45,
                54,
                63,
                72
              ],
              "hintParameters": {"a":6,"b":9},
              "explanation": "6 × 9 = 54."
            }
          ]
        }
      ]
    },
    {
      "id": "miniSub",
      "anchorId": "miniSub",
      "challengeCharacterId": "captain-nemo",
      "questions": [
        {
          "id": "miniSub-slot-1",
          "variants": [
            {
              "id": "miniSub-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "27 : 3 = ?",
              "answer": 9,
              "choices": [
                8,
                9,
                10,
                11
              ],
              "hintParameters": {"a":27,"b":3},
              "explanation": "27 : 3 = 9."
            },
            {
              "id": "miniSub-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "4 × 5 = ?",
              "answer": 20,
              "hintParameters": {"a":4,"b":5},
              "explanation": "4 × 5 = 20."
            }
          ]
        },
        {
          "id": "miniSub-slot-2",
          "variants": [
            {
              "id": "miniSub-2a",
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
            },
            {
              "id": "miniSub-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 3 = ?",
              "answer": 12,
              "choices": [
                9,
                12,
                15,
                18
              ],
              "hintParameters": {"a":4,"b":3},
              "explanation": "4 × 3 = 12."
            }
          ]
        },
        {
          "id": "miniSub-slot-3",
          "variants": [
            {
              "id": "miniSub-3a",
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
              "id": "miniSub-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "36 : 9 = ?",
              "answer": 4,
              "hintParameters": {"a":36,"b":9},
              "explanation": "36 : 9 = 4."
            }
          ]
        },
        {
          "id": "miniSub-slot-4",
          "variants": [
            {
              "id": "miniSub-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Nemo koopt 2 reserveonderdelen voor de minisub. Elk onderdeel kost 6 munten. Hoeveel munten betaalt hij?",
              "answer": 12,
              "hintParameters": {"a":2,"b":6,"currency":"munten"},
              "explanation": "2 × 6 = 12 munten."
            },
            {
              "id": "miniSub-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "6 × 9 = ?",
              "answer": 54,
              "choices": [
                45,
                54,
                63,
                72
              ],
              "hintParameters": {"a":6,"b":9},
              "explanation": "6 × 9 = 54."
            }
          ]
        }
      ]
    },
    {
      "id": "controlPanel",
      "anchorId": "controlPanel",
      "challengeCharacterId": "captain-nemo",
      "questions": [
        {
          "id": "controlPanel-slot-1",
          "variants": [
            {
              "id": "controlPanel-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "48 : 8 = ?",
              "answer": 6,
              "hintParameters": {"a":48,"b":8},
              "explanation": "48 : 8 = 6."
            },
            {
              "id": "controlPanel-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 7 = ?",
              "answer": 42,
              "hintParameters": {"a":6,"b":7},
              "explanation": "6 × 7 = 42."
            }
          ]
        },
        {
          "id": "controlPanel-slot-2",
          "variants": [
            {
              "id": "controlPanel-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Het bedieningspaneel heeft 4 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?",
              "answer": 16,
              "choices": [
                12,
                16,
                20,
                24
              ],
              "hintParameters": {"a":4,"b":4},
              "explanation": "4 × 4 = 16."
            },
            {
              "id": "controlPanel-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "18 : 9 = ?",
              "answer": 2,
              "choices": [
                1,
                2,
                3,
                4
              ],
              "hintParameters": {"a":18,"b":9},
              "explanation": "18 : 9 = 2."
            }
          ]
        },
        {
          "id": "controlPanel-slot-3",
          "variants": [
            {
              "id": "controlPanel-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Het bedieningspaneel heeft 9 rijen met elk 7 schakelaars. Hoeveel schakelaars zijn dat samen?",
              "answer": 63,
              "hintParameters": {"a":9,"b":7},
              "explanation": "9 × 7 = 63."
            },
            {
              "id": "controlPanel-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Het bedieningspaneel heeft 5 rijen met elk 2 schakelaars. Hoeveel schakelaars zijn dat samen?",
              "answer": 10,
              "hintParameters": {"a":5,"b":2},
              "explanation": "5 × 2 = 10."
            }
          ]
        },
        {
          "id": "controlPanel-slot-4",
          "variants": [
            {
              "id": "controlPanel-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Het bedieningspaneel heeft 5 rijen met elk 9 schakelaars. Hoeveel schakelaars zijn dat samen?",
              "answer": 45,
              "choices": [
                36,
                45,
                54,
                63
              ],
              "hintParameters": {"a":5,"b":9},
              "explanation": "5 × 9 = 45."
            },
            {
              "id": "controlPanel-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Het bedieningspaneel heeft 9 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?",
              "answer": 36,
              "choices": [
                32,
                36,
                40,
                44
              ],
              "hintParameters": {"a":9,"b":4},
              "explanation": "9 × 4 = 36."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "divingSuit",
      "objectId": "divingSuit",
      "name": "Duikpak",
      "shortName": "Pak",
      "defaultAction": "activate",
      "intro": "Het duikpak heeft koperen sluitingen.",
      "prompt": "Tel de sluitingen van het duikpak.",
      "solved": "Goed zo! Het pak is gecontroleerd.",
      "challengeId": "divingSuit"
    },
    {
      "id": "miniSub",
      "objectId": "miniSub",
      "name": "Minisub",
      "shortName": "Sub",
      "defaultAction": "activate",
      "intro": "De kleine onderzeeer borrelt zacht.",
      "prompt": "Tel de ronde raampjes van de minisub.",
      "solved": "Mooi! De minisub is wakker.",
      "challengeId": "miniSub"
    },
    {
      "id": "controlPanel",
      "objectId": "controlPanel",
      "name": "Drukpaneel",
      "shortName": "Paneel",
      "defaultAction": "activate",
      "intro": "De meters tikken in groepjes.",
      "prompt": "Tel de drukmeters op het paneel.",
      "solved": "Sterk! De druk staat goed.",
      "challengeId": "controlPanel"
    }
  ],
  "sceneEffects": [
    {
      "id": "light-source-enhancement-01",
      "label": "Lantern 1",
      "presetId": "light-source-enhancement",
      "variantId": "lantern",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1627557616,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 1754,
        "y": 236,
        "radius": 69
      },
      "overrides": {}
    },
    {
      "id": "light-source-enhancement-01-copy",
      "label": "Lantern 1 copy",
      "presetId": "light-source-enhancement",
      "variantId": "lantern",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1627557616,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 2066,
        "y": 415,
        "radius": 69
      },
      "overrides": {}
    },
    {
      "id": "light-source-enhancement-03",
      "label": "Lantern 3",
      "presetId": "light-source-enhancement",
      "variantId": "lantern",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1795836059,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 321,
        "y": 293,
        "radius": 52
      },
      "overrides": {}
    },
    {
      "id": "light-source-enhancement-03-copy",
      "label": "Lantern 3 copy",
      "presetId": "light-source-enhancement",
      "variantId": "lantern",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1795836059,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 198,
        "y": 101,
        "radius": 52
      },
      "overrides": {}
    }
  ],
  "reward": {
    "title": "Het luik opent!",
    "badge": "Minisub Piloot",
    "line": "Sven maakte de hangar klaar. De minisub ontsnapt naar een verborgen grot.",
    "art": "Levels/LVL-0006/assets/nautilus-mini-sub.png",
    "nextLevelId": "LVL-0007",
    "nextLabel": "Naar het eiland"
  }
};
