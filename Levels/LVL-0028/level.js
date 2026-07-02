window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0028"] = {
  "id": "LVL-0028",
  "title": "Pyramid Build at Giza",
  "subtitle": "Meten, slepen en bouwen bij de Grote Piramide.",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0028/assets/pyramid_build.png"
  },
  "player": {
    "start": {
      "x": 121,
      "y": 667
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
    "portrait": "Levels/LVL-0028/assets/nebu.png",
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
      "id": "tripodInstrument",
      "anchorId": "tripodInstrument",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "tripod-instrument-slot-1",
          "variants": [
            {
              "id": "tripod-instrument-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Drie uur",
              "choices": [
                "Half drie",
                "Drie uur",
                "Half vier",
                "Vier uur"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 0
              },
              "hintMinnie": "De grote wijzer staat op de 12.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Drie uur."
            },
            {
              "id": "tripod-instrument-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Kwart over zes",
              "choices": [
                "Kwart over zes",
                "Kwart over zeven",
                "Half zeven",
                "Kwart voor zeven"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 15
              },
              "hintMinnie": "De grote wijzer staat op de 3.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart over zes."
            }
          ]
        },
        {
          "id": "tripod-instrument-slot-2",
          "variants": [
            {
              "id": "tripod-instrument-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Half acht",
              "choices": [
                "Zeven uur",
                "Half zeven",
                "Half acht",
                "Acht uur"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 30
              },
              "hintMinnie": "De grote wijzer staat op de 6.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Half acht."
            },
            {
              "id": "tripod-instrument-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Kwart voor vijf",
              "choices": [
                "Kwart voor vier",
                "Kwart over vier",
                "Half vijf",
                "Kwart voor vijf"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 4,
                "minute": 45
              },
              "hintMinnie": "De grote wijzer staat op de 9.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Kwart voor vijf."
            }
          ]
        },
        {
          "id": "tripod-instrument-slot-3",
          "variants": [
            {
              "id": "tripod-instrument-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Tien voor half drie",
              "choices": [
                "Tien over twee",
                "Tien voor half drie",
                "Half drie",
                "Tien over half drie"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 20
              },
              "hintMinnie": "De grote wijzer staat op de 4.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor half drie."
            },
            {
              "id": "tripod-instrument-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Vijf over half negen",
              "choices": [
                "Vijf over acht",
                "Vijf voor half negen",
                "Vijf over half negen",
                "Tien over half negen"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 35
              },
              "hintMinnie": "De grote wijzer staat op de 7.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over half negen."
            }
          ]
        },
        {
          "id": "tripod-instrument-slot-4",
          "variants": [
            {
              "id": "tripod-instrument-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Tien voor elf",
              "choices": [
                "Tien voor elf",
                "Tien over tien",
                "Vijf voor elf",
                "Elf uur"
              ],
              "prompt": "Hoe laat is het?",
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 50
              },
              "hintMinnie": "De grote wijzer staat op de 10.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Tien voor elf."
            },
            {
              "id": "tripod-instrument-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Vijf over twaalf",
              "choices": [
                "Vijf voor twaalf",
                "Vijf over twaalf",
                "Tien over twaalf",
                "Twaalf uur"
              ],
              "prompt": "Welke tijd staat op de klok?",
              "visual": {
                "type": "clock",
                "hour": 12,
                "minute": 5
              },
              "hintMinnie": "De grote wijzer staat op de 1.",
              "hintMoose": "Gebruik daarna de kleine wijzer om het uur te vinden.",
              "explanation": "De wijzers tonen Vijf over twaalf."
            }
          ]
        }
      ]
    },
    {
      "id": "planningTable",
      "anchorId": "planningTable",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "planning-table-slot-1",
          "variants": [
            {
              "id": "planning-table-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": 50,
              "choices": [
                40,
                45,
                50,
                60
              ],
              "prompt": "10 x 5 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Bij keer 10 komt er een nul achter het getal.",
              "explanation": "10 x 5 = 50."
            },
            {
              "id": "planning-table-1b",
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
          "id": "planning-table-slot-2",
          "variants": [
            {
              "id": "planning-table-2a",
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
              "prompt": "Bij de bouwtafel liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "5 x 6 = 30."
            },
            {
              "id": "planning-table-2b",
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
          "id": "planning-table-slot-3",
          "variants": [
            {
              "id": "planning-table-3a",
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
              "id": "planning-table-3b",
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
              "prompt": "Sven verdeelt 56 steentjes bij de bouwtafel in 7 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "56 : 7 = 8, want 7 x 8 = 56."
            }
          ]
        },
        {
          "id": "planning-table-slot-4",
          "variants": [
            {
              "id": "planning-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Piramide",
              "choices": [
                "Piramide",
                "Pyramide",
                "Piramiede",
                "Pirramide"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Piramide is de juiste spelling."
            },
            {
              "id": "planning-table-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Bouwplan",
              "choices": [
                "Bouwplan",
                "Bouwplaan",
                "Bouplan",
                "Bouw-plan"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Bouwplan is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "stoneSled",
      "anchorId": "stoneSled",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "stone-sled-slot-1",
          "variants": [
            {
              "id": "stone-sled-1a",
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
              "id": "stone-sled-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 20,
              "prompt": "4 x 5 = ?",
              "hintMinnie": "Denk aan de tafel van 4.",
              "hintMoose": "Vier groepjes van vijf is hetzelfde als 5 + 5 + 5 + 5.",
              "explanation": "4 x 5 = 20."
            }
          ]
        },
        {
          "id": "stone-sled-slot-2",
          "variants": [
            {
              "id": "stone-sled-2a",
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
              "prompt": "Bij de steenslede liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "4 x 7 = 28."
            },
            {
              "id": "stone-sled-2b",
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
          "id": "stone-sled-slot-3",
          "variants": [
            {
              "id": "stone-sled-3a",
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
              "id": "stone-sled-3b",
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
              "prompt": "Sven verdeelt 72 steentjes bij de steenslede in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "72 : 8 = 9, want 8 x 9 = 72."
            }
          ]
        },
        {
          "id": "stone-sled-slot-4",
          "variants": [
            {
              "id": "stone-sled-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Slede",
              "choices": [
                "Slede",
                "Sleede",
                "Sledde",
                "Sleedeh"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Slede is de juiste spelling."
            },
            {
              "id": "stone-sled-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Steenblok",
              "choices": [
                "Steenblok",
                "Steenblock",
                "Steen-blok",
                "Steenblokk"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Steenblok is de juiste spelling."
            }
          ]
        }
      ]
    },
    {
      "id": "craneFrame",
      "anchorId": "craneFrame",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "crane-frame-slot-1",
          "variants": [
            {
              "id": "crane-frame-1a",
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
              "id": "crane-frame-1b",
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
          "id": "crane-frame-slot-2",
          "variants": [
            {
              "id": "crane-frame-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 15,
              "choices": [
                12,
                15,
                18,
                20
              ],
              "prompt": "Bij de houten kraan liggen 3 rijen met 5 touwen. Hoeveel touwen zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "3 x 5 = 15."
            },
            {
              "id": "crane-frame-2b",
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
          "id": "crane-frame-slot-3",
          "variants": [
            {
              "id": "crane-frame-3a",
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
              "id": "crane-frame-3b",
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
              "prompt": "Sven verdeelt 45 steentjes bij de houten kraan in 9 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "45 : 9 = 5, want 9 x 5 = 45."
            }
          ]
        },
        {
          "id": "crane-frame-slot-4",
          "variants": [
            {
              "id": "crane-frame-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Hijsbalk",
              "choices": [
                "Hijsbalk",
                "Heisbalk",
                "Hijsbalck",
                "Hijs-balk"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Hijsbalk is de juiste spelling."
            },
            {
              "id": "crane-frame-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Touw",
              "choices": [
                "Touw",
                "Tauw",
                "Tou",
                "Toew"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Touw is de juiste spelling."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "tripodInstrument",
      "type": "challenge",
      "name": "Meetinstrument",
      "x": 213,
      "y": 396,
      "radius": 41,
      "approach": {
        "x": 201,
        "y": 648
      }
    },
    {
      "id": "planningTable",
      "type": "challenge",
      "name": "Bouwtafel",
      "x": 460,
      "y": 497,
      "radius": 50,
      "approach": {
        "x": 412,
        "y": 654
      }
    },
    {
      "id": "stoneSled",
      "type": "challenge",
      "name": "Steenslede",
      "x": 1127,
      "y": 529,
      "radius": 58,
      "approach": {
        "x": 1059,
        "y": 651
      }
    },
    {
      "id": "craneFrame",
      "type": "challenge",
      "name": "Houten kraan",
      "x": 1374,
      "y": 360,
      "radius": 112,
      "approach": {
        "x": 1353,
        "y": 652
      }
    },
    {
      "id": "blockedRoute",
      "type": "exit",
      "name": "Bouwroute",
      "x": 1900,
      "y": 505,
      "radius": 94,
      "approach": {
        "x": 1884,
        "y": 634
      },
      "targetLevel": "LVL-0029",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "blockedRoute",
      "targetLevel": "LVL-0029",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Sven komt terecht op de bouwplaats van de Grote Piramide bij Giza.",
  "storageKey": "lvl-0028-egypt-progress",
  "progressKey": "lvl-0028-egypt-completed",
  "challengeArt": "Levels/LVL-0028/assets/nebu.png",
  "spiritName": "Nebu",
  "walkPath": [
    {
      "id": "start",
      "x": 121,
      "y": 667
    },
    {
      "id": "tripodInstrument-approach",
      "x": 201,
      "y": 648,
      "role": "approach"
    },
    {
      "id": "planningTable-approach",
      "x": 412,
      "y": 654,
      "role": "approach"
    },
    {
      "id": "stoneSled-approach",
      "x": 1059,
      "y": 651,
      "role": "approach"
    },
    {
      "id": "craneFrame-approach",
      "x": 1353,
      "y": 652,
      "role": "approach"
    },
    {
      "id": "blockedRoute-approach",
      "x": 1884,
      "y": 634,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "tripodInstrument",
      "type": "rune",
      "center": {
        "x": 213,
        "y": 396
      },
      "radius": 41,
      "approachNode": "tripodInstrument-approach",
      "label": "Meetinstrument"
    },
    {
      "id": "planningTable",
      "type": "rune",
      "center": {
        "x": 460,
        "y": 497
      },
      "radius": 50,
      "approachNode": "planningTable-approach",
      "label": "Bouwtafel"
    },
    {
      "id": "stoneSled",
      "type": "rune",
      "center": {
        "x": 1127,
        "y": 529
      },
      "radius": 58,
      "approachNode": "stoneSled-approach",
      "label": "Steenslede"
    },
    {
      "id": "craneFrame",
      "type": "rune",
      "center": {
        "x": 1374,
        "y": 360
      },
      "radius": 112,
      "approachNode": "craneFrame-approach",
      "label": "Houten kraan"
    },
    {
      "id": "blockedRoute",
      "type": "exit",
      "center": {
        "x": 1900,
        "y": 505
      },
      "radius": 94,
      "approachNode": "blockedRoute-approach",
      "label": "Bouwroute"
    }
  ],
  "hotspots": [
    {
      "id": "blockedRoute",
      "objectId": "blockedRoute",
      "type": "exit",
      "name": "Bouwroute",
      "defaultAction": "activate",
      "prompt": "De werkroute door de stenen komt vrij.",
      "solved": "De bouwroute is veilig open."
    }
  ],
  "runes": [
    {
      "id": "tripodInstrument",
      "objectId": "tripodInstrument",
      "name": "Meetinstrument",
      "shortName": "Meetinstrument",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het meetinstrument.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "tripodInstrument"
    },
    {
      "id": "planningTable",
      "objectId": "planningTable",
      "name": "Bouwtafel",
      "shortName": "Bouwtafel",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de bouwtafel.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "planningTable"
    },
    {
      "id": "stoneSled",
      "objectId": "stoneSled",
      "name": "Steenslede",
      "shortName": "Steenslede",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de steenslede.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "stoneSled"
    },
    {
      "id": "craneFrame",
      "objectId": "craneFrame",
      "name": "Houten kraan",
      "shortName": "Houten kraan",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de houten kraan.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "craneFrame"
    }
  ],
  "areas": [
    {
      "id": "tripodInstrument",
      "name": "Meetinstrument",
      "description": "Onderzoek meetinstrument met Nebu."
    },
    {
      "id": "planningTable",
      "name": "Bouwtafel",
      "description": "Onderzoek bouwtafel met Nebu."
    },
    {
      "id": "stoneSled",
      "name": "Steenslede",
      "description": "Onderzoek steenslede met Nebu."
    },
    {
      "id": "craneFrame",
      "name": "Houten kraan",
      "description": "Onderzoek houten kraan met Nebu."
    }
  ],
  "companion": {
    "id": "CHR-EGYPT-NEBU",
    "name": "Nebu",
    "portrait": "Levels/LVL-0028/assets/nebu.png"
  },
  "reward": {
    "title": "De bouwroute is vrij",
    "line": "Tussen de stenen opent een pad naar de volgende ontdekking.",
    "art": "Levels/LVL-0028/assets/nebu.png",
    "badge": "Piramidemeter",
    "nextLevelId": "LVL-0029",
    "nextLabel": "Ga verder"
  },
  "spiritLines": {
    "welcome": "Giza vraagt precies werk. Meten gaat voor tillen.",
    "moving": "Een rechte lijn begint met een rustig oog.",
    "allRunes": "De bouwtekens staan goed. Het pad is vrij.",
    "reward": "Mooi gemeten. De piramide wijst verder."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Die piramide is enorm. Zelfs de schaduwen werken mee."
    },
    "moving": {
      "speaker": "moose",
      "text": "Waar stenen bewegen, hou ik graag mijn tenen heel."
    },
    "allRunes": {
      "speaker": "minnie",
      "text": "De bouwplaats lijkt ineens veel minder rommelig."
    },
    "reward": {
      "speaker": "moose",
      "text": "Route vrij. Geen steen op ons hoofd, graag."
    }
  },
  "levelSemantics": {
    "setting": "bouwplaats bij de Grote Piramide",
    "mood": "zonnig, druk en precies",
    "companionFocus": {
      "minnie": "verwondering over meten, schaduw en bouwsporen",
      "moose": "veilig werken tussen stenen, touw en kraan"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0028-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Sven, we staan echt naast een piramide in aanbouw."
    },
    {
      "id": "LVL-0028-open",
      "event": "CHALLENGE_OPEN",
      "speaker": "moose",
      "text": "Nebu weet waarom meten hier geen bijzaak is."
    },
    {
      "id": "LVL-0028-success",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Dat stukje bouwplan ligt nu netjes recht."
    },
    {
      "id": "LVL-0028-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De werkroute is vrij. Loop waar geen blok schuift."
    },
    {
      "id": "LVL-0028-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "Die route blijft nog dicht. Eerst klopt de bouwplaats nog niet."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0028/assets/pyramid_build.png",
    "badge": "Verbonden gebied",
    "detail": "Meetinstrument, bouwtafel, sleden en kraan"
  },
  "intro": [
    "De sarcofaag heeft Sven bij Giza gebracht. Nebu wijst naar de bouwplaats waar elke maat telt.",
    "Het driepoot-instrument links meet tijd en schaduw; de route rechts blijft dicht tot alles klopt."
  ],
  "exitHotspotId": "blockedRoute",
  "exitActionLabel": "Naar de grafkamer",
  "theme": "Piramidebouw bij Giza",
  "sceneEffects": [
    {
      "id": "sun-presence-01",
      "label": "Warm day sun 1",
      "presetId": "sun-presence",
      "variantId": "warm-day-sun",
      "presetVersion": 1,
      "enabled": true,
      "seed": 1959294690,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 2,
        "y": 3,
        "radius": 134
      },
      "overrides": {
        "rayStartAngle": 10,
        "rayEndAngle": 83
      }
    }
  ]
};
