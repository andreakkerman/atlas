window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0027"] = {
  "id": "LVL-0027",
  "title": "Cairo Museum",
  "subtitle": "Een stille zaal met een sarcofaag die niet gewoon stil blijft.",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0027/assets/cairo_museum.png"
  },
  "player": {
    "start": {
      "x": 230,
      "y": 615
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
  "challengeCompleteLabel": "Opdracht afronden",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "ontdekkingen",
  "challengeCharacter": {
    "id": "CHR-EGYPT-NEBU",
    "name": "Nebu",
    "portrait": "Levels/LVL-0027/assets/nebu.png",
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
      "id": "anubisStatue",
      "anchorId": "anubisStatue",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "anubis-statue-slot-1",
          "variants": [
            {
              "id": "anubis-statue-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 10,
              "choices": [
                8,
                10,
                12,
                14
              ],
              "prompt": "2 x 5 = ?",
              "hintMinnie": "Denk aan de tafel van 2.",
              "hintMoose": "Twee groepjes van vijf kun je ook verdubbelen.",
              "explanation": "2 x 5 = 10."
            },
            {
              "id": "anubis-statue-1b",
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
          "id": "anubis-statue-slot-2",
          "variants": [
            {
              "id": "anubis-statue-2a",
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
              "prompt": "Bij het Anubisbeeld liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "5 x 6 = 30."
            },
            {
              "id": "anubis-statue-2b",
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
          "id": "anubis-statue-slot-3",
          "variants": [
            {
              "id": "anubis-statue-3a",
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
              "id": "anubis-statue-3b",
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
              "prompt": "Sven verdeelt 56 steentjes bij het Anubisbeeld in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "56 : 7 = 8, want 7 x 8 = 56."
            }
          ]
        },
        {
          "id": "anubis-statue-slot-4",
          "variants": [
            {
              "id": "anubis-statue-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Anubis",
              "choices": [
                "Anubis",
                "Anubise",
                "Anubin",
                "An-ubis"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Anubis is de juiste spelling."
            },
            {
              "id": "anubis-statue-4b",
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
      ],
      "active": false
    },
    {
      "id": "tabletCase",
      "anchorId": "tabletCase",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "tablet-case-slot-1",
          "variants": [
            {
              "id": "tablet-case-1a",
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
              "id": "tablet-case-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 12,
              "prompt": "3 x 4 = ?",
              "hintMinnie": "Denk aan de tafel van 3.",
              "hintMoose": "Tel drie groepjes van vier bij elkaar.",
              "explanation": "3 x 4 = 12."
            }
          ]
        },
        {
          "id": "tablet-case-slot-2",
          "variants": [
            {
              "id": "tablet-case-2a",
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
              "prompt": "Bij de tabletvitrine liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "4 x 7 = 28."
            },
            {
              "id": "tablet-case-2b",
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
          "id": "tablet-case-slot-3",
          "variants": [
            {
              "id": "tablet-case-3a",
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
              "id": "tablet-case-3b",
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
              "prompt": "Sven verdeelt 72 steentjes bij de tabletvitrine in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "72 : 8 = 9, want 8 x 9 = 72."
            }
          ]
        },
        {
          "id": "tablet-case-slot-4",
          "variants": [
            {
              "id": "tablet-case-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Hiëroglief",
              "choices": [
                "Hiëroglief",
                "Hieroglief",
                "Hiëroglyf",
                "Hieroeglief"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Hiëroglief is de juiste spelling."
            },
            {
              "id": "tablet-case-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Tablet",
              "choices": [
                "Tablet",
                "Tablett",
                "Tabelet",
                "Tabblet"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Tablet is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "modelBoat",
      "anchorId": "modelBoat",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "model-boat-slot-1",
          "variants": [
            {
              "id": "model-boat-1a",
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
              "id": "model-boat-1b",
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
          "id": "model-boat-slot-2",
          "variants": [
            {
              "id": "model-boat-2a",
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
              "prompt": "Bij de modelboot liggen 10 rijen met 8 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "10 x 8 = 80."
            },
            {
              "id": "model-boat-2b",
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
          "id": "model-boat-slot-3",
          "variants": [
            {
              "id": "model-boat-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 5,
              "prompt": "20 : 4 = ?",
              "hintMinnie": "Welke tafel hoort hierbij?",
              "hintMoose": "Zoek hoeveel keer 4 in 20 past.",
              "explanation": "20 : 4 = 5, want 4 x 5 = 20."
            },
            {
              "id": "model-boat-3b",
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
              "prompt": "Sven verdeelt 45 steentjes bij de modelboot in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "45 : 9 = 5, want 9 x 5 = 45."
            }
          ]
        },
        {
          "id": "model-boat-slot-4",
          "variants": [
            {
              "id": "model-boat-4a",
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
            },
            {
              "id": "model-boat-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Boot",
              "choices": [
                "Boot",
                "Bood",
                "Bootte",
                "Boott"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Boot is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "reliefPanel",
      "anchorId": "reliefPanel",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "relief-panel-slot-1",
          "variants": [
            {
              "id": "relief-panel-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 63,
              "choices": [
                54,
                63,
                72,
                81
              ],
              "prompt": "9 x 7 = ?",
              "hintMinnie": "Denk aan de tafel van 9.",
              "hintMoose": "Splits de keersom in twee makkelijke stukken.",
              "explanation": "9 x 7 = 63."
            },
            {
              "id": "relief-panel-1b",
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
          "id": "relief-panel-slot-2",
          "variants": [
            {
              "id": "relief-panel-2a",
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
              "prompt": "Bij het wandrelief liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "3 x 9 = 27."
            },
            {
              "id": "relief-panel-2b",
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
          "id": "relief-panel-slot-3",
          "variants": [
            {
              "id": "relief-panel-3a",
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
              "id": "relief-panel-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 6,
              "choices": [
                4,
                5,
                6,
                7
              ],
              "prompt": "Sven verdeelt 30 steentjes bij het wandrelief in 5 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "30 : 5 = 6, want 5 x 6 = 30."
            }
          ]
        },
        {
          "id": "relief-panel-slot-4",
          "variants": [
            {
              "id": "relief-panel-4a",
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
            },
            {
              "id": "relief-panel-4b",
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
      ],
      "active": false
    }
  ],
  "objects": [
    {
      "id": "anubisStatue",
      "type": "challenge",
      "name": "Anubisbeeld",
      "x": 450,
      "y": 401,
      "radius": 70,
      "approach": {
        "x": 447,
        "y": 606
      }
    },
    {
      "id": "tabletCase",
      "type": "challenge",
      "name": "Tabletvitrine",
      "x": 779,
      "y": 442,
      "radius": 74,
      "approach": {
        "x": 743,
        "y": 627
      }
    },
    {
      "id": "modelBoat",
      "type": "challenge",
      "name": "Modelboot",
      "x": 1088,
      "y": 492,
      "radius": 74,
      "approach": {
        "x": 1091,
        "y": 611
      }
    },
    {
      "id": "reliefPanel",
      "type": "challenge",
      "name": "Wandreliëf",
      "x": 1308,
      "y": 342,
      "radius": 76,
      "approach": {
        "x": 1297,
        "y": 610
      }
    },
    {
      "id": "museumSarcophagus",
      "type": "exit",
      "name": "Gouden sarcofaag",
      "x": 1745,
      "y": 441,
      "radius": 112,
      "approach": {
        "x": 1645,
        "y": 632
      },
      "targetLevel": "LVL-0028",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "museumSarcophagus",
      "targetLevel": "LVL-0028",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Sven begint in het Cairo museum en ontdekt dat de sarcofaag hem naar oud Egypte trekt.",
  "storageKey": "lvl-0027-egypt-progress",
  "progressKey": "lvl-0027-egypt-completed",
  "challengeArt": "Levels/LVL-0027/assets/nebu.png",
  "spiritName": "Nebu",
  "walkPath": [
    {
      "id": "start",
      "x": 230,
      "y": 615
    },
    {
      "id": "anubisStatue-approach",
      "x": 447,
      "y": 606,
      "role": "approach"
    },
    {
      "id": "tabletCase-approach",
      "x": 743,
      "y": 627,
      "role": "approach"
    },
    {
      "id": "modelBoat-approach",
      "x": 1091,
      "y": 611,
      "role": "approach"
    },
    {
      "id": "reliefPanel-approach",
      "x": 1297,
      "y": 610,
      "role": "approach"
    },
    {
      "id": "museumSarcophagus-approach",
      "x": 1645,
      "y": 632,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "anubisStatue",
      "type": "rune",
      "center": {
        "x": 450,
        "y": 401
      },
      "radius": 70,
      "approachNode": "anubisStatue-approach",
      "label": "Anubisbeeld"
    },
    {
      "id": "tabletCase",
      "type": "rune",
      "center": {
        "x": 779,
        "y": 442
      },
      "radius": 74,
      "approachNode": "tabletCase-approach",
      "label": "Tabletvitrine"
    },
    {
      "id": "modelBoat",
      "type": "rune",
      "center": {
        "x": 1088,
        "y": 492
      },
      "radius": 74,
      "approachNode": "modelBoat-approach",
      "label": "Modelboot"
    },
    {
      "id": "reliefPanel",
      "type": "rune",
      "center": {
        "x": 1308,
        "y": 342
      },
      "radius": 76,
      "approachNode": "reliefPanel-approach",
      "label": "Wandreliëf"
    },
    {
      "id": "museumSarcophagus",
      "type": "exit",
      "center": {
        "x": 1745,
        "y": 441
      },
      "radius": 112,
      "approachNode": "museumSarcophagus-approach",
      "label": "Gouden sarcofaag"
    }
  ],
  "hotspots": [
    {
      "id": "museumSarcophagus",
      "objectId": "museumSarcophagus",
      "type": "exit",
      "name": "Gouden sarcofaag",
      "defaultAction": "activate",
      "prompt": "De sarcofaag trekt zacht naar oud Egypte.",
      "solved": "De sarcofaag is klaar om Sven mee te nemen."
    }
  ],
  "runes": [
    {
      "id": "anubisStatue",
      "objectId": "anubisStatue",
      "name": "Anubisbeeld",
      "shortName": "Anubisbeeld",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het Anubisbeeld.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "anubisStatue"
    },
    {
      "id": "tabletCase",
      "objectId": "tabletCase",
      "name": "Tabletvitrine",
      "shortName": "Tabletvitrine",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de tabletvitrine.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "tabletCase"
    },
    {
      "id": "modelBoat",
      "objectId": "modelBoat",
      "name": "Modelboot",
      "shortName": "Modelboot",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de modelboot.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "modelBoat"
    },
    {
      "id": "reliefPanel",
      "objectId": "reliefPanel",
      "name": "Wandreliëf",
      "shortName": "Wandreliëf",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het wandrelief.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "reliefPanel"
    }
  ],
  "areas": [
    {
      "id": "anubisStatue",
      "name": "Anubisbeeld",
      "description": "Onderzoek anubisbeeld met Nebu."
    },
    {
      "id": "tabletCase",
      "name": "Tabletvitrine",
      "description": "Onderzoek tabletvitrine met Nebu."
    },
    {
      "id": "modelBoat",
      "name": "Modelboot",
      "description": "Onderzoek modelboot met Nebu."
    },
    {
      "id": "reliefPanel",
      "name": "Wandreliëf",
      "description": "Onderzoek wandreliëf met Nebu."
    }
  ],
  "companion": {
    "id": "CHR-EGYPT-NEBU",
    "name": "Nebu",
    "portrait": "Levels/LVL-0027/assets/nebu.png"
  },
  "sceneEffects": [
    {
      "id": "light-source-enhancement-01",
      "label": "Wall torch 1",
      "presetId": "light-source-enhancement",
      "variantId": "wall-torch",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1877720153,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 1562,
        "y": 491,
        "radius": 21
      },
      "overrides": {}
    },
    {
      "id": "light-source-enhancement-01-copy",
      "label": "Wall torch 1 copy",
      "presetId": "light-source-enhancement",
      "variantId": "wall-torch",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1877720153,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 1894,
        "y": 501,
        "radius": 21
      },
      "overrides": {}
    }
  ],
  "reward": {
    "title": "De sarcofaag opent",
    "line": "De museumzaal vervaagt en Sven voelt warm woestijnlicht.",
    "art": "Levels/LVL-0027/assets/nebu.png",
    "badge": "Museumgeheim gevonden",
    "nextLevelId": "LVL-0028",
    "nextLabel": "Ga verder"
  },
  "spiritLines": {
    "welcome": "Welkom, Sven. Oude voorwerpen bewaren soms meer dan stof.",
    "moving": "Kijk rustig. Een schrijver leest eerst de tekens.",
    "allRunes": "De aanwijzingen kloppen. De sarcofaag luistert.",
    "reward": "De reis naar oud Egypte begint."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Het museum is stil, maar die sarcofaag voelt wakker."
    },
    "moving": {
      "speaker": "moose",
      "text": "Oude zalen kraken. Rustig kijken, niets omstoten."
    },
    "allRunes": {
      "speaker": "minnie",
      "text": "De tekens lijken nu naar rechts te wijzen."
    },
    "reward": {
      "speaker": "moose",
      "text": "Goed. Sarcofaag open, stappen klein houden."
    }
  },
  "levelSemantics": {
    "setting": "Cairo museum bij een gouden sarcofaag",
    "mood": "stil, warm en geheimzinnig",
    "companionFocus": {
      "minnie": "glimmende museumdetails en zachte verwondering",
      "moose": "voorzichtig kijken en de route bewaken"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0027-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Deze zaal fluistert bijna. Zie je die gouden rand?"
    },
    {
      "id": "LVL-0027-open",
      "event": "CHALLENGE_OPEN",
      "speaker": "moose",
      "text": "Nebu klinkt kalm. Dat helpt in een museum vol geheimen."
    },
    {
      "id": "LVL-0027-success",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Daar licht weer een oud detail op."
    },
    {
      "id": "LVL-0027-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "Alles klopt. De sarcofaag wacht nu op ons."
    },
    {
      "id": "LVL-0027-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Nog niet instappen. Eerst nog {remainingChallenges} afronden."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0027/assets/cairo_museum.png",
    "badge": "5 plekken",
    "detail": "Museum, piramidebouw, grafkamer, Abu Simbel en terugkeer"
  },
  "intro": [
    "Sven staat in het Cairo museum. Nebu merkt dat de gouden sarcofaag niet zomaar een tentoonstelling is.",
    "Minnie let op kleine glimmers; Moose houdt de stille zaal in de gaten."
  ],
  "exitHotspotId": "museumSarcophagus",
  "exitActionLabel": "Naar oud Egypte",
  "theme": "Het museum wordt wakker"
};
