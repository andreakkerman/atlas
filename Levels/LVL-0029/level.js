window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0029"] = {
  "id": "LVL-0029",
  "title": "Tutanchamon Tomb",
  "subtitle": "Een mysterieuze grafkamer vol stille aanwijzingen.",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0029/assets/tutanchamon_tomb.png"
  },
  "player": {
    "start": {
      "x": 137,
      "y": 584
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
    "portrait": "Levels/LVL-0029/assets/nebu.png",
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
      "id": "paintedRelief",
      "anchorId": "paintedRelief",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "painted-relief-slot-1",
          "variants": [
            {
              "id": "painted-relief-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 25,
              "choices": [
                20,
                25,
                30,
                35
              ],
              "prompt": "5 x 5 = ?",
              "hintMinnie": "Denk aan de tafel van 5.",
              "hintMoose": "Vijf groepjes van vijf vormen samen 25.",
              "explanation": "5 x 5 = 25."
            },
            {
              "id": "painted-relief-1b",
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
          "id": "painted-relief-slot-2",
          "variants": [
            {
              "id": "painted-relief-2a",
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
              "prompt": "Bij het geschilderde relief liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "3 x 9 = 27."
            },
            {
              "id": "painted-relief-2b",
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
          "id": "painted-relief-slot-3",
          "variants": [
            {
              "id": "painted-relief-3a",
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
              "id": "painted-relief-3b",
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
              "prompt": "Sven verdeelt 36 steentjes bij het geschilderde relief in 6 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "36 : 6 = 6, want 6 x 6 = 36."
            }
          ]
        },
        {
          "id": "painted-relief-slot-4",
          "variants": [
            {
              "id": "painted-relief-4a",
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
            },
            {
              "id": "painted-relief-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Reliëf",
              "choices": [
                "Reliëf",
                "Relief",
                "Reliëff",
                "Reliéf"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Reliëf is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "canopicJars",
      "anchorId": "canopicJars",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "canopic-jars-slot-1",
          "variants": [
            {
              "id": "canopic-jars-1a",
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
              "id": "canopic-jars-1b",
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
          "id": "canopic-jars-slot-2",
          "variants": [
            {
              "id": "canopic-jars-2a",
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
              "prompt": "Bij de rituele kruiken liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "5 x 6 = 30."
            },
            {
              "id": "canopic-jars-2b",
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
          "id": "canopic-jars-slot-3",
          "variants": [
            {
              "id": "canopic-jars-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 6,
              "prompt": "18 : 3 = ?",
              "hintMinnie": "Welke tafel hoort hierbij?",
              "hintMoose": "Zoek hoeveel keer 3 in 18 past.",
              "explanation": "18 : 3 = 6, want 3 x 6 = 18."
            },
            {
              "id": "canopic-jars-3b",
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
              "prompt": "Sven verdeelt 56 steentjes bij de rituele kruiken in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "56 : 7 = 8, want 7 x 8 = 56."
            }
          ]
        },
        {
          "id": "canopic-jars-slot-4",
          "variants": [
            {
              "id": "canopic-jars-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Kruik",
              "choices": [
                "Kruik",
                "Kruijk",
                "Kruiq",
                "Kr-uik"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Kruik is de juiste spelling."
            },
            {
              "id": "canopic-jars-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Kruiken",
              "choices": [
                "Kruiken",
                "Kruikenn",
                "Kruijken",
                "Krui-ken"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Kruiken is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "treasureChest",
      "anchorId": "treasureChest",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "treasure-chest-slot-1",
          "variants": [
            {
              "id": "treasure-chest-1a",
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
              "id": "treasure-chest-1b",
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
          "id": "treasure-chest-slot-2",
          "variants": [
            {
              "id": "treasure-chest-2a",
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
              "prompt": "Bij de schatkist liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "4 x 7 = 28."
            },
            {
              "id": "treasure-chest-2b",
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
          "id": "treasure-chest-slot-3",
          "variants": [
            {
              "id": "treasure-chest-3a",
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
              "id": "treasure-chest-3b",
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
              "prompt": "Sven verdeelt 72 steentjes bij de schatkist in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "72 : 8 = 9, want 8 x 9 = 72."
            }
          ]
        },
        {
          "id": "treasure-chest-slot-4",
          "variants": [
            {
              "id": "treasure-chest-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Schat",
              "choices": [
                "Schat",
                "Schad",
                "Schatte",
                "Sc-hat"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Schat is de juiste spelling."
            },
            {
              "id": "treasure-chest-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Goud",
              "choices": [
                "Goud",
                "Gout",
                "Goudt",
                "Go-ud"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Goud is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "altarTable",
      "anchorId": "altarTable",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "altar-table-slot-1",
          "variants": [
            {
              "id": "altar-table-1a",
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
              "id": "altar-table-1b",
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
          "id": "altar-table-slot-2",
          "variants": [
            {
              "id": "altar-table-2a",
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
              "prompt": "Bij de altaartafel liggen 10 rijen met 8 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "10 x 8 = 80."
            },
            {
              "id": "altar-table-2b",
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
          "id": "altar-table-slot-3",
          "variants": [
            {
              "id": "altar-table-3a",
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
              "id": "altar-table-3b",
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
              "prompt": "Sven verdeelt 45 steentjes bij de altaartafel in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "45 : 9 = 5, want 9 x 5 = 45."
            }
          ]
        },
        {
          "id": "altar-table-slot-4",
          "variants": [
            {
              "id": "altar-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Altaar",
              "choices": [
                "Altaar",
                "Altar",
                "Althaar",
                "Al-taar"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Altaar is de juiste spelling."
            },
            {
              "id": "altar-table-4b",
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
    }
  ],
  "objects": [
    {
      "id": "paintedRelief",
      "type": "challenge",
      "name": "Geschilderd relief",
      "x": 385,
      "y": 346,
      "radius": 53,
      "approach": {
        "x": 353,
        "y": 582
      }
    },
    {
      "id": "canopicJars",
      "type": "challenge",
      "name": "Rituele kruiken",
      "x": 738,
      "y": 356,
      "radius": 86,
      "approach": {
        "x": 705,
        "y": 572
      }
    },
    {
      "id": "treasureChest",
      "type": "challenge",
      "name": "Schatkist",
      "x": 1164,
      "y": 490,
      "radius": 49,
      "approach": {
        "x": 1154,
        "y": 593
      }
    },
    {
      "id": "altarTable",
      "type": "challenge",
      "name": "Altaartafel",
      "x": 1455,
      "y": 333,
      "radius": 60,
      "approach": {
        "x": 1451,
        "y": 590
      }
    },
    {
      "id": "tombSarcophagus",
      "type": "exit",
      "name": "Sarcofaag van Tutanchamon",
      "x": 1953,
      "y": 422,
      "radius": 112,
      "approach": {
        "x": 1915,
        "y": 588
      },
      "targetLevel": "LVL-0030",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "tombSarcophagus",
      "targetLevel": "LVL-0030",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Sven onderzoekt de grafkamer van Tutanchamon zonder het avontuur eng te maken.",
  "storageKey": "lvl-0029-egypt-progress",
  "progressKey": "lvl-0029-egypt-completed",
  "challengeArt": "Levels/LVL-0029/assets/nebu.png",
  "spiritName": "Nebu",
  "walkPath": [
    {
      "id": "start",
      "x": 137,
      "y": 584
    },
    {
      "id": "paintedRelief-approach",
      "x": 353,
      "y": 582,
      "role": "approach"
    },
    {
      "id": "canopicJars-approach",
      "x": 705,
      "y": 572,
      "role": "approach"
    },
    {
      "id": "treasureChest-approach",
      "x": 1154,
      "y": 593,
      "role": "approach"
    },
    {
      "id": "altarTable-approach",
      "x": 1451,
      "y": 590,
      "role": "approach"
    },
    {
      "id": "tombSarcophagus-approach",
      "x": 1915,
      "y": 588,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "paintedRelief",
      "type": "rune",
      "center": {
        "x": 385,
        "y": 346
      },
      "radius": 53,
      "approachNode": "paintedRelief-approach",
      "label": "Geschilderd relief"
    },
    {
      "id": "canopicJars",
      "type": "rune",
      "center": {
        "x": 738,
        "y": 356
      },
      "radius": 86,
      "approachNode": "canopicJars-approach",
      "label": "Rituele kruiken"
    },
    {
      "id": "treasureChest",
      "type": "rune",
      "center": {
        "x": 1164,
        "y": 490
      },
      "radius": 49,
      "approachNode": "treasureChest-approach",
      "label": "Schatkist"
    },
    {
      "id": "altarTable",
      "type": "rune",
      "center": {
        "x": 1455,
        "y": 333
      },
      "radius": 60,
      "approachNode": "altarTable-approach",
      "label": "Altaartafel"
    },
    {
      "id": "tombSarcophagus",
      "type": "exit",
      "center": {
        "x": 1953,
        "y": 422
      },
      "radius": 112,
      "approachNode": "tombSarcophagus-approach",
      "label": "Sarcofaag van Tutanchamon"
    }
  ],
  "hotspots": [
    {
      "id": "tombSarcophagus",
      "objectId": "tombSarcophagus",
      "type": "exit",
      "name": "Sarcofaag van Tutanchamon",
      "defaultAction": "activate",
      "prompt": "De sarcofaag wijst verder door het oude Egypte.",
      "solved": "De sarcofaag geeft de volgende route vrij."
    }
  ],
  "runes": [
    {
      "id": "paintedRelief",
      "objectId": "paintedRelief",
      "name": "Geschilderd relief",
      "shortName": "Geschilderd relief",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het geschilderde relief.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "paintedRelief"
    },
    {
      "id": "canopicJars",
      "objectId": "canopicJars",
      "name": "Rituele kruiken",
      "shortName": "Rituele kruiken",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de rituele kruiken.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "canopicJars"
    },
    {
      "id": "treasureChest",
      "objectId": "treasureChest",
      "name": "Schatkist",
      "shortName": "Schatkist",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de schatkist.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "treasureChest"
    },
    {
      "id": "altarTable",
      "objectId": "altarTable",
      "name": "Altaartafel",
      "shortName": "Altaartafel",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de altaartafel.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "altarTable"
    }
  ],
  "areas": [
    {
      "id": "paintedRelief",
      "name": "Geschilderd relief",
      "description": "Onderzoek geschilderd relief met Nebu."
    },
    {
      "id": "canopicJars",
      "name": "Rituele kruiken",
      "description": "Onderzoek rituele kruiken met Nebu."
    },
    {
      "id": "treasureChest",
      "name": "Schatkist",
      "description": "Onderzoek schatkist met Nebu."
    },
    {
      "id": "altarTable",
      "name": "Altaartafel",
      "description": "Onderzoek altaartafel met Nebu."
    }
  ],
  "companion": {
    "id": "CHR-EGYPT-NEBU",
    "name": "Nebu",
    "portrait": "Levels/LVL-0029/assets/nebu.png"
  },
  sceneEffects: [
        {
              id: "light-source-enhancement-01",
              label: "Wall torch 1",
              presetId: "light-source-enhancement",
              variantId: "wall-torch",
              presetVersion: 1,
              enabled: true,
              seed: 831246026,
              qualityTier: "auto",
              layerSlot: "worldLight",
              groupId: "",
              geometry: {
                    type: "pointRadius",
                    x: 49,
                    y: 337,
                    radius: 27
              },
              overrides: {}
        },
        {
              id: "light-source-enhancement-01-copy",
              label: "Wall torch 1 copy",
              presetId: "light-source-enhancement",
              variantId: "wall-torch",
              presetVersion: 1,
              enabled: true,
              seed: 831246026,
              qualityTier: "auto",
              layerSlot: "worldLight",
              groupId: "",
              geometry: {
                    type: "pointRadius",
                    x: 339,
                    y: 385,
                    radius: 27
              },
              overrides: {}
        },
        {
              id: "light-source-enhancement-01-copy-copy",
              label: "Wall torch 1 copy copy",
              presetId: "light-source-enhancement",
              variantId: "wall-torch",
              presetVersion: 1,
              enabled: true,
              seed: 831246026,
              qualityTier: "auto",
              layerSlot: "worldLight",
              groupId: "",
              geometry: {
                    type: "pointRadius",
                    x: 927,
                    y: 313,
                    radius: 27
              },
              overrides: {}
        }
  ],
  "reward": {
    "title": "De grafkamer wijst verder",
    "line": "De gouden kamer blijft rustig terwijl Sven verder reist.",
    "art": "Levels/LVL-0029/assets/nebu.png",
    "badge": "Grafkamerlezer",
    "nextLevelId": "LVL-0030",
    "nextLabel": "Ga verder"
  },
  "spiritLines": {
    "welcome": "Deze kamer is oud, maar niet boos. Lees haar voorzichtig.",
    "moving": "In een grafkamer telt respect net zo veel als slimheid.",
    "allRunes": "De stille tekens staan in volgorde.",
    "reward": "De sarcofaag stuurt ons verder."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Het is donker, maar niet naar. Alles glanst heel zacht."
    },
    "moving": {
      "speaker": "moose",
      "text": "Rustig lopen. Oude vloeren houden niet van haast."
    },
    "allRunes": {
      "speaker": "minnie",
      "text": "De kamer lijkt opgelucht, Sven."
    },
    "reward": {
      "speaker": "moose",
      "text": "Goed. Niets aangeraakt dat boos kon worden."
    }
  },
  "levelSemantics": {
    "setting": "grafkamer van Tutanchamon",
    "mood": "mysterieus, warm en rustig",
    "companionFocus": {
      "minnie": "verborgen details in schilderingen en goud",
      "moose": "respectvol bewegen in een oude grafkamer"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0029-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Deze kamer bewaart haar geheimen heel zacht."
    },
    {
      "id": "LVL-0029-open",
      "event": "CHALLENGE_OPEN",
      "speaker": "moose",
      "text": "Nebu vraagt rustig. Dat past bij deze plek."
    },
    {
      "id": "LVL-0029-success",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Een gouden detail lijkt nu net iets helderder."
    },
    {
      "id": "LVL-0029-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De sarcofaag geeft ruimte. Voorzichtig verder."
    },
    {
      "id": "LVL-0029-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Nog even niet. De kamer houdt nog een aanwijzing vast."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0029/assets/tutanchamon_tomb.png",
    "badge": "Verbonden gebied",
    "detail": "Wandreliëf, kruiken, schat en altaar"
  },
  "intro": [
    "Sven staat in de grafkamer van Tutanchamon. Het is mysterieus, maar Nebu houdt de toon rustig.",
    "De sarcofaag rechts trekt Sven pas verder als alle aanwijzingen gevonden zijn."
  ],
  "exitHotspotId": "tombSarcophagus",
  "exitActionLabel": "Verder door de grafkamer",
  "theme": "De grafkamer van Tutanchamon"
};
