window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0031"] = {
  "id": "LVL-0031",
  "title": "Cairo Museum Return",
  "subtitle": "Sven is terug in de rustige museumzaal.",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0031/assets/cairo_museum_return.png"
  },
  "player": {
    "start": {
      "x": 258,
      "y": 583
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "boundaries": {
    "minX": 100,
    "maxX": 2070,
    "minY": 500,
    "maxY": 635
  },
  "challengeLabel": "Egyptische proef",
  "challengeCompleteLabel": "Maak de route klaar",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "ontdekkingen",
  "challengeCharacter": {
    "id": "CHR-EGYPT-NEBU",
    "name": "Nebu",
    "portrait": "Levels/LVL-0031/assets/nebu.png",
    "role": "leerling-schrijver"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/minnie.png",
      "blinkFrame": "assets/guides/minnie-blink.png",
      "purrSounds": [
        "minnie1",
        "minnie2"
      ]
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/moose.png",
      "blinkFrame": "assets/guides/moose-blink.png",
      "purrSounds": [
        "moose1",
        "moose2"
      ]
    }
  },
  "learningChallenges": [
    {
      "id": "scarabDisplay",
      "anchorId": "scarabDisplay",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "scarab-display-slot-1",
          "variants": [
            {
              "id": "scarab-display-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 48,
              "choices": [
                40,
                48,
                56,
                64
              ],
              "prompt": "8 x 6 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "8 x 6 = 48."
            },
            {
              "id": "scarab-display-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 45,
              "prompt": "9 x 5 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Reken in groepjes en controleer je antwoord.",
              "explanation": "9 x 5 = 45."
            }
          ]
        },
        {
          "id": "scarab-display-slot-2",
          "variants": [
            {
              "id": "scarab-display-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 80,
              "choices": [
                72,
                80,
                88,
                96
              ],
              "prompt": "Bij de scarabeevitrine liggen 10 rijen met 8 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "10 x 8 = 80."
            },
            {
              "id": "scarab-display-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 48,
              "prompt": "Nebu tekent 6 vakken met 8 tekens per vak. Hoeveel tekens tekent hij?",
              "hintMinnie": "Zoek hoeveel groepjes er zijn.",
              "hintMoose": "Vermenigvuldig het aantal vakken met het aantal tekens.",
              "explanation": "6 x 8 = 48."
            }
          ]
        },
        {
          "id": "scarab-display-slot-3",
          "variants": [
            {
              "id": "scarab-display-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 8,
              "prompt": "56 : 7 = ?",
              "hintMinnie": "Welke tafel hoort hierbij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "56 : 7 = 8, want 7 x 8 = 56."
            },
            {
              "id": "scarab-display-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 5,
              "choices": [
                4,
                5,
                6,
                7
              ],
              "prompt": "Sven verdeelt 45 steentjes bij de scarabeevitrine in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "45 : 9 = 5, want 9 x 5 = 45."
            }
          ]
        },
        {
          "id": "scarab-display-slot-4",
          "variants": [
            {
              "id": "scarab-display-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Scarabee",
              "choices": [
                "Scarabee",
                "Skarabee",
                "Scarabe",
                "Scarrabee"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Scarabee is de juiste spelling."
            },
            {
              "id": "scarab-display-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Sarcofaag",
              "choices": [
                "Sarcofaag",
                "Sarkofaag",
                "Sarcofhaag",
                "Sarcofag"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Sarcofaag is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "centralCase",
      "anchorId": "centralCase",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "central-case-slot-1",
          "variants": [
            {
              "id": "central-case-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 12,
              "choices": [
                8,
                10,
                12,
                14
              ],
              "prompt": "2 x 6 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Twee groepjes van zes kun je verdubbelen.",
              "explanation": "2 x 6 = 12."
            },
            {
              "id": "central-case-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 36,
              "prompt": "6 x 6 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Reken in groepjes en controleer je antwoord.",
              "explanation": "6 x 6 = 36."
            }
          ]
        },
        {
          "id": "central-case-slot-2",
          "variants": [
            {
              "id": "central-case-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 27,
              "choices": [
                18,
                27,
                36,
                45
              ],
              "prompt": "Bij de middenvitrine liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "3 x 9 = 27."
            },
            {
              "id": "central-case-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 63,
              "prompt": "Nebu tekent 7 vakken met 9 tekens per vak. Hoeveel tekens tekent hij?",
              "hintMinnie": "Zoek hoeveel groepjes er zijn.",
              "hintMoose": "Vermenigvuldig het aantal vakken met het aantal tekens.",
              "explanation": "7 x 9 = 63."
            }
          ]
        },
        {
          "id": "central-case-slot-3",
          "variants": [
            {
              "id": "central-case-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 7,
              "prompt": "63 : 9 = ?",
              "hintMinnie": "Welke tafel hoort hierbij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "63 : 9 = 7, want 9 x 7 = 63."
            },
            {
              "id": "central-case-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 6,
              "choices": [
                5,
                6,
                7,
                8
              ],
              "prompt": "Sven verdeelt 36 steentjes bij de middenvitrine in 6 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "36 : 6 = 6, want 6 x 6 = 36."
            }
          ]
        },
        {
          "id": "central-case-slot-4",
          "variants": [
            {
              "id": "central-case-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Vitrine",
              "choices": [
                "Vitrine",
                "Vitriene",
                "Vittrine",
                "Vi-trine"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Vitrine is de juiste spelling."
            },
            {
              "id": "central-case-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Museum",
              "choices": [
                "Museum",
                "Museüm",
                "Muzeum",
                "Mu-seum"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Museum is de juiste spelling."
            }
          ]
        }
      ],
      "active": false
    },
    {
      "id": "boatDisplay",
      "anchorId": "boatDisplay",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "boat-display-slot-1",
          "variants": [
            {
              "id": "boat-display-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 24,
              "choices": [
                18,
                24,
                30,
                36
              ],
              "prompt": "6 x 4 = ?",
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "6 x 4 = 24."
            },
            {
              "id": "boat-display-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 56,
              "prompt": "7 x 8 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Reken in groepjes en controleer je antwoord.",
              "explanation": "7 x 8 = 56."
            }
          ]
        },
        {
          "id": "boat-display-slot-2",
          "variants": [
            {
              "id": "boat-display-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 30,
              "choices": [
                24,
                30,
                36,
                42
              ],
              "prompt": "Bij het bootdisplay liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "5 x 6 = 30."
            },
            {
              "id": "boat-display-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 24,
              "prompt": "Nebu tekent 4 vakken met 6 tekens per vak. Hoeveel tekens tekent hij?",
              "hintMinnie": "Zoek hoeveel groepjes er zijn.",
              "hintMoose": "Vermenigvuldig het aantal vakken met het aantal tekens.",
              "explanation": "4 x 6 = 24."
            }
          ]
        },
        {
          "id": "boat-display-slot-3",
          "variants": [
            {
              "id": "boat-display-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 6,
              "prompt": "42 : 7 = ?",
              "hintMinnie": "Welke tafel hoort hierbij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "42 : 7 = 6, want 7 x 6 = 42."
            },
            {
              "id": "boat-display-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 8,
              "choices": [
                7,
                8,
                9,
                10
              ],
              "prompt": "Sven verdeelt 56 steentjes bij het bootdisplay in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "56 : 7 = 8, want 7 x 8 = 56."
            }
          ]
        },
        {
          "id": "boat-display-slot-4",
          "variants": [
            {
              "id": "boat-display-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Museum",
              "choices": [
                "Museum",
                "Museüm",
                "Muzeum",
                "Mu-seum"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Museum is de juiste spelling."
            },
            {
              "id": "boat-display-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Papyrus",
              "choices": [
                "Papyrus",
                "Papirus",
                "Pappyrus",
                "Papyrys"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Papyrus is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "seatedStatue",
      "anchorId": "seatedStatue",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "seated-statue-slot-1",
          "variants": [
            {
              "id": "seated-statue-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 35,
              "choices": [
                28,
                35,
                42,
                49
              ],
              "prompt": "7 x 5 = ?",
              "hintMinnie": "Denk aan de tafel van 7.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "7 x 5 = 35."
            },
            {
              "id": "seated-statue-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 72,
              "prompt": "8 x 9 = ?",
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Reken in groepjes en controleer je antwoord.",
              "explanation": "8 x 9 = 72."
            }
          ]
        },
        {
          "id": "seated-statue-slot-2",
          "variants": [
            {
              "id": "seated-statue-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 28,
              "choices": [
                21,
                28,
                35,
                42
              ],
              "prompt": "Bij het zittende beeld liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "4 x 7 = 28."
            },
            {
              "id": "seated-statue-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "answer": 35,
              "prompt": "Nebu tekent 5 vakken met 7 tekens per vak. Hoeveel tekens tekent hij?",
              "hintMinnie": "Zoek hoeveel groepjes er zijn.",
              "hintMoose": "Vermenigvuldig het aantal vakken met het aantal tekens.",
              "explanation": "5 x 7 = 35."
            }
          ]
        },
        {
          "id": "seated-statue-slot-3",
          "variants": [
            {
              "id": "seated-statue-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 6,
              "prompt": "48 : 8 = ?",
              "hintMinnie": "Welke tafel hoort hierbij?",
              "hintMoose": "Zoek welk getal keer de deler het totaal maakt.",
              "explanation": "48 : 8 = 6, want 8 x 6 = 48."
            },
            {
              "id": "seated-statue-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 9,
              "choices": [
                8,
                9,
                10,
                11
              ],
              "prompt": "Sven verdeelt 72 steentjes bij het zittende beeld in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "72 : 8 = 9, want 8 x 9 = 72."
            }
          ]
        },
        {
          "id": "seated-statue-slot-4",
          "variants": [
            {
              "id": "seated-statue-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Beeld",
              "choices": [
                "Beeld",
                "Beelt",
                "Beeldt",
                "Be-eld"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Beeld is de juiste spelling."
            },
            {
              "id": "seated-statue-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Farao",
              "choices": [
                "Farao",
                "Farau",
                "Farrao",
                "Fa-rao"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Farao is de juiste spelling."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "scarabDisplay",
      "type": "challenge",
      "name": "Scarabeevitrine",
      "x": 329,
      "y": 347,
      "radius": 95,
      "approach": {
        "x": 342,
        "y": 579
      }
    },
    {
      "id": "centralCase",
      "type": "challenge",
      "name": "Middenvitrine",
      "x": 745,
      "y": 357,
      "radius": 82,
      "approach": {
        "x": 719,
        "y": 557
      }
    },
    {
      "id": "boatDisplay",
      "type": "challenge",
      "name": "Bootdisplay",
      "x": 1028,
      "y": 436,
      "radius": 82,
      "approach": {
        "x": 1021,
        "y": 565
      }
    },
    {
      "id": "seatedStatue",
      "type": "challenge",
      "name": "Zittend beeld",
      "x": 1889,
      "y": 352,
      "radius": 74,
      "approach": {
        "x": 1839,
        "y": 570
      }
    },
    {
      "id": "museumExit",
      "type": "exit",
      "name": "Museumuitgang",
      "x": 2092,
      "y": 396,
      "radius": 104,
      "approach": {
        "x": 2106,
        "y": 524
      },
      "targetLevel": null,
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "museumExit",
      "targetLevel": null,
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Sven keert terug naar het Cairo museum en kan na de laatste ontdekkingen naar buiten.",
  "storageKey": "lvl-0031-egypt-progress",
  "progressKey": "lvl-0031-egypt-completed",
  "challengeArt": "Levels/LVL-0031/assets/nebu.png",
  "spiritName": "Nebu",
  "walkPath": [
    {
      "id": "start",
      "x": 258,
      "y": 583
    },
    {
      "id": "scarabDisplay-approach",
      "x": 342,
      "y": 579,
      "role": "approach"
    },
    {
      "id": "centralCase-approach",
      "x": 719,
      "y": 557,
      "role": "approach"
    },
    {
      "id": "boatDisplay-approach",
      "x": 1021,
      "y": 565,
      "role": "approach"
    },
    {
      "id": "seatedStatue-approach",
      "x": 1839,
      "y": 570,
      "role": "approach"
    },
    {
      "id": "museumExit-approach",
      "x": 2106,
      "y": 524,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "scarabDisplay",
      "type": "rune",
      "center": {
        "x": 329,
        "y": 347
      },
      "radius": 95,
      "approachNode": "scarabDisplay-approach",
      "label": "Scarabeevitrine"
    },
    {
      "id": "centralCase",
      "type": "rune",
      "center": {
        "x": 745,
        "y": 357
      },
      "radius": 82,
      "approachNode": "centralCase-approach",
      "label": "Middenvitrine"
    },
    {
      "id": "boatDisplay",
      "type": "rune",
      "center": {
        "x": 1028,
        "y": 436
      },
      "radius": 82,
      "approachNode": "boatDisplay-approach",
      "label": "Bootdisplay"
    },
    {
      "id": "seatedStatue",
      "type": "rune",
      "center": {
        "x": 1889,
        "y": 352
      },
      "radius": 74,
      "approachNode": "seatedStatue-approach",
      "label": "Zittend beeld"
    },
    {
      "id": "museumExit",
      "type": "exit",
      "center": {
        "x": 2092,
        "y": 396
      },
      "radius": 104,
      "approachNode": "museumExit-approach",
      "label": "Museumuitgang"
    }
  ],
  "hotspots": [
    {
      "id": "museumExit",
      "objectId": "museumExit",
      "type": "exit",
      "name": "Museumuitgang",
      "defaultAction": "activate",
      "prompt": "De museumuitgang staat klaar.",
      "solved": "De uitgang naar huis is vrij."
    }
  ],
  "runes": [
    {
      "id": "scarabDisplay",
      "objectId": "scarabDisplay",
      "name": "Scarabeevitrine",
      "shortName": "Scarabeevitrine",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de scarabeevitrine.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "scarabDisplay"
    },
    {
      "id": "centralCase",
      "objectId": "centralCase",
      "name": "Middenvitrine",
      "shortName": "Middenvitrine",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de middenvitrine.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "centralCase"
    },
    {
      "id": "boatDisplay",
      "objectId": "boatDisplay",
      "name": "Bootdisplay",
      "shortName": "Bootdisplay",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het bootdisplay.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "boatDisplay"
    },
    {
      "id": "seatedStatue",
      "objectId": "seatedStatue",
      "name": "Zittend beeld",
      "shortName": "Zittend beeld",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het zittende beeld.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "seatedStatue"
    }
  ],
  "areas": [
    {
      "id": "scarabDisplay",
      "name": "Scarabeevitrine",
      "description": "Onderzoek scarabeevitrine met Nebu."
    },
    {
      "id": "centralCase",
      "name": "Middenvitrine",
      "description": "Onderzoek middenvitrine met Nebu."
    },
    {
      "id": "boatDisplay",
      "name": "Bootdisplay",
      "description": "Onderzoek bootdisplay met Nebu."
    },
    {
      "id": "seatedStatue",
      "name": "Zittend beeld",
      "description": "Onderzoek zittend beeld met Nebu."
    }
  ],
  "companion": {
    "id": "CHR-EGYPT-NEBU",
    "name": "Nebu",
    "portrait": "Levels/LVL-0031/assets/nebu.png"
  },
  "reward": {
    "title": "Terug uit Egypte",
    "line": "Sven stapt rustig het museum uit met een verhaal dat niemand zomaar gelooft.",
    "art": "Levels/LVL-0031/assets/nebu.png",
    "badge": "Egypte-avontuur voltooid"
  },
  "spiritLines": {
    "welcome": "We zijn terug. De scarabee is stil en vriendelijk.",
    "moving": "Een laatste ronde maakt het verhaal af.",
    "allRunes": "De museumdeur is vrij.",
    "reward": "Sven kan naar buiten."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "We zijn terug. Het museum klinkt ineens heel normaal."
    },
    "moving": {
      "speaker": "moose",
      "text": "Normaal is prima. Ik waardeer normale vloeren."
    },
    "allRunes": {
      "speaker": "minnie",
      "text": "De scarabee is rustig. Volgens mij is de deur klaar."
    },
    "reward": {
      "speaker": "moose",
      "text": "Museum uit. Avontuur netjes afgerond."
    }
  },
  "levelSemantics": {
    "setting": "Cairo museum na de terugkeer",
    "mood": "kalm, warm en opgelucht",
    "companionFocus": {
      "minnie": "rustige herkenning en laatste glimmers",
      "moose": "afronden en veilig naar buiten"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0031-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Sven, dezelfde zaal. Maar nu voelt hij vriendelijker."
    },
    {
      "id": "LVL-0031-open",
      "event": "CHALLENGE_OPEN",
      "speaker": "moose",
      "text": "Nebu helpt nog een laatste keer. Netjes afronden."
    },
    {
      "id": "LVL-0031-success",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Dat museumdetail valt nu mooi op zijn plek."
    },
    {
      "id": "LVL-0031-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De uitgang is vrij. Geen oude magie meer in de weg."
    },
    {
      "id": "LVL-0031-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Wat een reis, Sven. De scarabee slaapt weer."
    },
    {
      "id": "LVL-0031-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De deur wacht nog. Eerst de laatste aanwijzing."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0031/assets/cairo_museum_return.png",
    "badge": "Finale",
    "detail": "Rustige museumzaal, scarabee en uitgang"
  },
  "intro": [
    "De scarabee heeft Sven teruggebracht naar het Cairo museum. Alles is rustiger dan aan het begin.",
    "Nog een paar ontdekkingen en Sven kan door de uitgang rechts het avontuur afronden."
  ],
  "exitHotspotId": "museumExit",
  "exitActionLabel": "Verlaat het museum",
  "theme": "Terug in het museum"
};
