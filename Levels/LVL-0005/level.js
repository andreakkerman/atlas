window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0005"] = {
  "id": "LVL-0005",
  "title": "Aan boord",
  "subtitle": "In de salon van de Nautilus liggen oude kaarten en raadsels.",
  "description": "Sven onderzoekt de salon van de Nautilus en maakt de weg naar de minisub vrij.",
  "storageKey": "svenadventure-nautilus-salon-v1",
  "progressKey": "svenadventure-table-progress-v1",
  "exitHotspotId": "miniSubDoor",
  "exitActionLabel": "Naar de minisub",
  "challengeLabel": "Salonproef",
  "challengeCompleteLabel": "Rond de salonproef af",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "salonproeven",
  "menu": {
    "illustration": "Levels/LVL-0005/assets/nautilus-salon.png",
    "badge": "Verbonden gebied",
    "detail": "Salon, patrijspoorten en kapiteinskaarten"
  },
  "companion": {
    "name": "Kapitein Nemo",
    "portrait": "Levels/LVL-0005/assets/captain-nemo.png"
  },
  "challengeCharacter": {
    "id": "captain-nemo",
    "name": "Kapitein Nemo",
    "portrait": "Levels/LVL-0005/assets/captain-nemo.png",
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
    "background": "Levels/LVL-0005/assets/nautilus-salon.png"
  },
  "challengeArt": "Levels/LVL-0005/assets/captain-nemo.png",
  "player": {
    "startNode": "left-door-start",
    "start": {
      "x": 336,
      "y": 626
    }
  },
  "interactiveObjects": [
    {
      "id": "captainChart",
      "type": "rune",
      "center": {
        "x": 595,
        "y": 297
      },
      "radius": 82,
      "approachNode": "chart-approach",
      "label": "Kapiteinskaart"
    },
    {
      "id": "mainPorthole",
      "type": "rune",
      "center": {
        "x": 1079,
        "y": 312
      },
      "radius": 104,
      "approachNode": "porthole-approach",
      "label": "Groot raam"
    },
    {
      "id": "logbookDesk",
      "type": "rune",
      "center": {
        "x": 1551,
        "y": 415
      },
      "radius": 86,
      "approachNode": "desk-approach",
      "label": "Logboektafel"
    },
    {
      "id": "miniSubDoor",
      "type": "gate",
      "center": {
        "x": 1884,
        "y": 489
      },
      "radius": 108,
      "approachNode": "right-door-approach",
      "label": "Ronde deur"
    }
  ],
  "walkPath": [
    {
      "id": "left-door-start",
      "x": 336,
      "y": 626
    },
    {
      "id": "chart-approach",
      "x": 787,
      "y": 574,
      "role": "approach"
    },
    {
      "id": "salon-center-left",
      "x": 883,
      "y": 590
    },
    {
      "id": "porthole-approach",
      "x": 1082,
      "y": 591,
      "role": "approach"
    },
    {
      "id": "desk-approach",
      "x": 1513,
      "y": 596,
      "role": "approach"
    },
    {
      "id": "right-door-approach",
      "x": 1835,
      "y": 641,
      "role": "approach"
    }
  ],
  "intro": [
    "Sven stapt de Nautilus binnen.",
    "Door de ramen glijdt blauw water voorbij.",
    "Kapitein Nemo wijst naar de salonproeven."
  ],
  "spiritName": "Kapitein Nemo",
  "spiritLines": {
    "welcome": "Welkom aan boord.",
    "chooseRune": "Onderzoek de salon.",
    "moving": "De Nautilus bromt diep onder ons.",
    "allRunes": "De deur naar de minisub is klaar.",
    "reward": "De ronde deur schuift open."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Wauw. We zijn echt onder zee."
    },
    "start": {
      "speaker": "minnie",
      "text": "Kijk, vissen achter het raam."
    },
    "moving": {
      "speaker": "moose",
      "text": "Voorzichtig. Metaal kan glad zijn."
    },
    "salon": {
      "speaker": "moose",
      "text": "Kaarten, meters en ramen. Nemo mist niets."
    },
    "object": {
      "speaker": "minnie",
      "text": "Dit glimt alsof de zee erdoor fluistert."
    },
    "allRunes": {
      "speaker": "moose",
      "text": "De salon is klaar. De ronde deur kan open."
    },
    "reward": {
      "speaker": "moose",
      "text": "Verder de Nautilus in. Blijf bij het pad."
    }
  },
  "levelSemantics": {
    "setting": "de salon van de Nautilus met ramen, kaarten en instrumenten",
    "mood": "stil, diepzeeachtig en wonderlijk",
    "companionFocus": {
      "minnie": "vissen achter het glas en glimmende instrumenten",
      "moose": "druk, glad metaal en Nemo's precieze orde"
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
      "id": "salon-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Hoor je dat? Alles galmt hier."
    },
    {
      "id": "salon-chart-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "captainChart",
      "speaker": "moose",
      "text": "De kapiteinskaart ligt precies recht. Natuurlijk."
    },
    {
      "id": "salon-porthole-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "mainPorthole",
      "speaker": "minnie",
      "text": "Dat grote raam zit vol blauw licht en voorbijzwemmende schaduwen."
    },
    {
      "id": "salon-logbook-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "logbookDesk",
      "speaker": "moose",
      "text": "Nemo's logboek ligt precies op zijn plek."
    },
    {
      "id": "salon-solved",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "moose",
      "text": "Afgerond. Het schip bromt tevreden."
    },
    {
      "id": "salon-progress",
      "event": "LEVEL_PROGRESS_MILESTONE",
      "speaker": "minnie",
      "text": "Weer een opdracht voltooid. De salon voelt minder geheimzinnig."
    },
    {
      "id": "salon-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Nog {remainingChallenges} te gaan. Daarna kan de ronde deur open."
    },
    {
      "id": "salon-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De ronde deur is open. We kunnen verder."
    },
    {
      "id": "salon-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Verder naar binnen. Dit schip zit vol geheimen."
    }
  ],
  "areas": [
    {
      "id": "salon",
      "name": "Salon",
      "start": 0,
      "end": 2172,
      "guideLine": "salon"
    }
  ],
  "hotspots": [
    {
      "id": "miniSubDoor",
      "objectId": "miniSubDoor",
      "type": "gate",
      "name": "Ronde deur",
      "defaultAction": "activate",
      "look": "Een zware ronde deur. Hij wacht op drie salonproeven.",
      "activate": "De deur naar de minisub gaat open."
    }
  ],
  "learningChallenges": [
    {
      "id": "captainChart",
      "anchorId": "captainChart",
      "challengeCharacterId": "captain-nemo",
      "questions": [
        {
          "id": "captainChart-slot-1",
          "variants": [
            {
              "id": "captainChart-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Op de kapiteinskaart staan 8 routes met elk 10 koerspunten. Hoeveel koerspunten staan er in totaal?",
              "answer": 80,
              "hintParameters": {"a":8,"b":10},
              "explanation": "8 × 10 = 80."
            },
            {
              "id": "captainChart-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "3 × 4 = ?",
              "answer": 12,
              "hintParameters": {"a":3,"b":4},
              "explanation": "3 × 4 = 12."
            }
          ]
        },
        {
          "id": "captainChart-slot-2",
          "variants": [
            {
              "id": "captainChart-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Nemo verdeelt 36 koerspunten eerlijk over 6 routes. Hoeveel koerspunten krijgt iedere route?",
              "answer": 6,
              "choices": [
                5,
                6,
                7,
                8
              ],
              "hintParameters": {"a":36,"b":6},
              "explanation": "36 : 6 = 6."
            },
            {
              "id": "captainChart-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Op de kapiteinskaart staan 4 routes met elk 3 koerspunten. Hoeveel koerspunten staan er in totaal?",
              "answer": 12,
              "hintParameters": {"a":4,"b":3},
              "explanation": "4 × 3 = 12."
            }
          ]
        },
        {
          "id": "captainChart-slot-3",
          "variants": [
            {
              "id": "captainChart-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "63 : 7 = ?",
              "answer": 9,
              "choices": [
                8,
                9,
                10,
                11
              ],
              "hintParameters": {"a":63,"b":7},
              "explanation": "63 : 7 = 9."
            },
            {
              "id": "captainChart-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "7 × 4 = ?",
              "answer": 28,
              "choices": [
                24,
                28,
                32,
                36
              ],
              "hintParameters": {"a":7,"b":4},
              "explanation": "7 × 4 = 28."
            }
          ]
        },
        {
          "id": "captainChart-slot-4",
          "variants": [
            {
              "id": "captainChart-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 9 = ?",
              "answer": 45,
              "hintParameters": {"a":5,"b":9},
              "explanation": "5 × 9 = 45."
            },
            {
              "id": "captainChart-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "3 × 6 = ?",
              "answer": 18,
              "hintParameters": {"a":3,"b":6},
              "explanation": "3 × 6 = 18."
            }
          ]
        }
      ]
    },
    {
      "id": "mainPorthole",
      "anchorId": "mainPorthole",
      "challengeCharacterId": "captain-nemo",
      "questions": [
        {
          "id": "mainPorthole-slot-1",
          "variants": [
            {
              "id": "mainPorthole-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Door het grote raam zwemmen 4 scholen met elk 6 vissen. Hoeveel vissen zijn dat samen?",
              "answer": 24,
              "hintParameters": {"a":4,"b":6},
              "explanation": "4 × 6 = 24."
            },
            {
              "id": "mainPorthole-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Door het grote raam zwemmen 42 vissen in 7 even grote scholen. Hoeveel vissen zitten in iedere school?",
              "answer": 6,
              "hintParameters": {"a":42,"b":7},
              "explanation": "42 : 7 = 6."
            }
          ]
        },
        {
          "id": "mainPorthole-slot-2",
          "variants": [
            {
              "id": "mainPorthole-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 4 = ?",
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
              "id": "mainPorthole-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Door het grote raam zwemmen 9 scholen met elk 8 vissen. Hoeveel vissen zijn dat samen?",
              "answer": 72,
              "choices": [
                64,
                72,
                80,
                88
              ],
              "hintParameters": {"a":9,"b":8},
              "explanation": "9 × 8 = 72."
            }
          ]
        },
        {
          "id": "mainPorthole-slot-3",
          "variants": [
            {
              "id": "mainPorthole-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 3 = ?",
              "answer": 15,
              "hintParameters": {"a":5,"b":3},
              "explanation": "5 × 3 = 15."
            },
            {
              "id": "mainPorthole-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Door het grote raam zwemmen 36 vissen in 9 even grote scholen. Hoeveel vissen zitten in iedere school?",
              "answer": 4,
              "hintParameters": {"a":36,"b":9},
              "explanation": "36 : 9 = 4."
            }
          ]
        },
        {
          "id": "mainPorthole-slot-4",
          "variants": [
            {
              "id": "mainPorthole-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "45 : 5 = ?",
              "answer": 9,
              "choices": [
                8,
                9,
                10,
                11
              ],
              "hintParameters": {"a":45,"b":5},
              "explanation": "45 : 5 = 9."
            },
            {
              "id": "mainPorthole-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 4 = ?",
              "answer": 36,
              "hintParameters": {"a":9,"b":4},
              "explanation": "9 × 4 = 36."
            }
          ]
        }
      ]
    },
    {
      "id": "logbookDesk",
      "anchorId": "logbookDesk",
      "challengeCharacterId": "captain-nemo",
      "questions": [
        {
          "id": "logbookDesk-slot-1",
          "variants": [
            {
              "id": "logbookDesk-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Nemo verdeelt 8 aantekeningen over 4 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina?",
              "answer": 2,
              "choices": [
                1,
                2,
                3,
                4
              ],
              "hintParameters": {"a":8,"b":4},
              "explanation": "8 : 4 = 2."
            },
            {
              "id": "logbookDesk-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 5 = ?",
              "answer": 20,
              "choices": [
                15,
                20,
                25,
                30
              ],
              "hintParameters": {"a":4,"b":5},
              "explanation": "4 × 5 = 20."
            }
          ]
        },
        {
          "id": "logbookDesk-slot-2",
          "variants": [
            {
              "id": "logbookDesk-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Nemo verdeelt 36 aantekeningen over 6 pagina's. Op iedere pagina komen er evenveel. Hoeveel aantekeningen komen op één pagina?",
              "answer": 6,
              "choices": [
                5,
                6,
                7,
                8
              ],
              "hintParameters": {"a":36,"b":6},
              "explanation": "36 : 6 = 6."
            },
            {
              "id": "logbookDesk-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "42 : 6 = ?",
              "answer": 7,
              "choices": [
                6,
                7,
                8,
                9
              ],
              "hintParameters": {"a":42,"b":6},
              "explanation": "42 : 6 = 7."
            }
          ]
        },
        {
          "id": "logbookDesk-slot-3",
          "variants": [
            {
              "id": "logbookDesk-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "In het logboek staan 2 pagina's met elk 8 aantekeningen. Hoeveel aantekeningen zijn dat samen?",
              "answer": 16,
              "choices": [
                8,
                16,
                24,
                32
              ],
              "hintParameters": {"a":2,"b":8},
              "explanation": "2 × 8 = 16."
            },
            {
              "id": "logbookDesk-3b",
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
          "id": "logbookDesk-slot-4",
          "variants": [
            {
              "id": "logbookDesk-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 9 = ?",
              "answer": 45,
              "hintParameters": {"a":5,"b":9},
              "explanation": "5 × 9 = 45."
            },
            {
              "id": "logbookDesk-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "In het logboek staan 4 pagina's met elk 7 aantekeningen. Hoeveel aantekeningen zijn dat samen?",
              "answer": 28,
              "hintParameters": {"a":4,"b":7},
              "explanation": "4 × 7 = 28."
            }
          ]
        }
      ]
    }
  ],
  "runes": [
    {
      "id": "captainChart",
      "objectId": "captainChart",
      "name": "Kapiteinskaart",
      "shortName": "Kaart",
      "defaultAction": "activate",
      "intro": "De kaart toont routes door diepe zeeen.",
      "prompt": "Tel de zeelijnen op de kaart.",
      "solved": "Mooi! De route is duidelijk.",
      "challengeId": "captainChart"
    },
    {
      "id": "mainPorthole",
      "objectId": "mainPorthole",
      "name": "Groot raam",
      "shortName": "Raam",
      "defaultAction": "activate",
      "intro": "Achter het raam zwemmen vissen in groepjes.",
      "prompt": "Tel de vissen achter het glas.",
      "solved": "Goed zo! Het raam licht blauw op.",
      "challengeId": "mainPorthole"
    },
    {
      "id": "logbookDesk",
      "objectId": "logbookDesk",
      "name": "Logboektafel",
      "shortName": "Logboek",
      "defaultAction": "activate",
      "intro": "Het logboek ligt open op de tafel.",
      "prompt": "Tel de dagen in het logboek.",
      "solved": "Sterk! Het logboek klapt dicht.",
      "challengeId": "logbookDesk"
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
      "seed": 168566107,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 481,
        "y": 288,
        "radius": 85
      },
      "overrides": {}
    },
    {
      "id": "light-source-enhancement-02",
      "label": "Lantern 2",
      "presetId": "light-source-enhancement",
      "variantId": "lantern",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1057533377,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 1087,
        "y": 124,
        "radius": 106
      },
      "overrides": {}
    },
    {
      "id": "bubbles-and-spray-03",
      "label": "Underwater microbubbles 3",
      "presetId": "bubbles-and-spray",
      "variantId": "underwater-microbubbles",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1994892232,
      "qualityTier": "auto",
      "layerSlot": "worldAtmosphere",
      "groupId": "",
      "geometry": {
        "type": "ellipse",
        "x": 1078,
        "y": 324,
        "width": 216,
        "height": 188
      },
      "overrides": {}
    }
  ],
  "reward": {
    "title": "De ronde deur opent!",
    "badge": "Nautilus Gast",
    "line": "Sven loste de salonproeven op. De weg naar de minisub is vrij.",
    "art": "Levels/LVL-0005/assets/nautilus-salon.png",
    "nextLevelId": "LVL-0006",
    "nextLabel": "Naar de minisub"
  }
};
