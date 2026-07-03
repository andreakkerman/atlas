window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0030"] = {
  "id": "LVL-0030",
  "title": "Abu Simbel",
  "subtitle": "De oude tempel en de scarabee die Sven terug kan brengen.",
  "backgroundSize": {
    "width": 2172,
    "height": 724
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0030/assets/abu_simbel.png"
  },
  "player": {
    "start": {
      "x": 226,
      "y": 607
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
    "portrait": "Levels/LVL-0030/assets/nebu.png",
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
      "id": "offeringTable",
      "anchorId": "offeringTable",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "offering-table-slot-1",
          "variants": [
            {
              "id": "offering-table-1a",
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
              "id": "offering-table-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "answer": 30,
              "prompt": "10 x 3 = ?",
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "Bij keer 10 komt er een nul achter het getal.",
              "explanation": "10 x 3 = 30."
            }
          ]
        },
        {
          "id": "offering-table-slot-2",
          "variants": [
            {
              "id": "offering-table-2a",
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
              "prompt": "Bij de offertafel liggen 3 rijen met 9 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "3 x 9 = 27."
            },
            {
              "id": "offering-table-2b",
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
          "id": "offering-table-slot-3",
          "variants": [
            {
              "id": "offering-table-3a",
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
              "id": "offering-table-3b",
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
              "prompt": "Sven verdeelt 36 steentjes bij de offertafel in 6 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "36 : 6 = 6, want 6 x 6 = 36."
            }
          ]
        },
        {
          "id": "offering-table-slot-4",
          "variants": [
            {
              "id": "offering-table-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Offer",
              "choices": [
                "Offer",
                "Ofer",
                "Offur",
                "Of-fer"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Offer is de juiste spelling."
            },
            {
              "id": "offering-table-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Offergave",
              "choices": [
                "Offergave",
                "Offergaave",
                "Ofergave",
                "Offer-gave"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Offergave is de juiste spelling."
            }
          ]
        }
      ],
      "active": false
    },
    {
      "id": "sundial",
      "anchorId": "sundial",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "sundial-slot-1",
          "variants": [
            {
              "id": "sundial-1a",
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
              "id": "sundial-1b",
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
          "id": "sundial-slot-2",
          "variants": [
            {
              "id": "sundial-2a",
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
              "id": "sundial-2b",
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
          "id": "sundial-slot-3",
          "variants": [
            {
              "id": "sundial-3a",
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
              "id": "sundial-3b",
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
          "id": "sundial-slot-4",
          "variants": [
            {
              "id": "sundial-4a",
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
              "id": "sundial-4b",
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
      "id": "carvedRelief",
      "anchorId": "carvedRelief",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "carved-relief-slot-1",
          "variants": [
            {
              "id": "carved-relief-1a",
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
              "id": "carved-relief-1b",
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
          "id": "carved-relief-slot-2",
          "variants": [
            {
              "id": "carved-relief-2a",
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
              "prompt": "Bij het gekerfde relief liggen 5 rijen met 6 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "5 x 6 = 30."
            },
            {
              "id": "carved-relief-2b",
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
          "id": "carved-relief-slot-3",
          "variants": [
            {
              "id": "carved-relief-3a",
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
              "id": "carved-relief-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "answer": 8,
              "choices": [
                6,
                7,
                8,
                9
              ],
              "prompt": "Sven verdeelt 16 steentjes bij het gekerfde relief in 2 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in twee gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom met de deler.",
              "explanation": "16 : 2 = 8, want 2 x 8 = 16."
            }
          ]
        },
        {
          "id": "carved-relief-slot-4",
          "variants": [
            {
              "id": "carved-relief-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Tempel",
              "choices": [
                "Tempel",
                "Temppel",
                "Tepmel",
                "Te-mpel"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Tempel is de juiste spelling."
            },
            {
              "id": "carved-relief-4b",
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
      ],
      "active": false
    },
    {
      "id": "templePanel",
      "anchorId": "templePanel",
      "challengeCharacterId": "CHR-EGYPT-NEBU",
      "questions": [
        {
          "id": "temple-panel-slot-1",
          "variants": [
            {
              "id": "temple-panel-1a",
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
              "id": "temple-panel-1b",
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
          "id": "temple-panel-slot-2",
          "variants": [
            {
              "id": "temple-panel-2a",
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
              "prompt": "Bij het tempelpaneel liggen 4 rijen met 7 kleine kaartjes. Hoeveel kaartjes zijn dat samen?",
              "hintMinnie": "Zoek groepjes van hetzelfde aantal.",
              "hintMoose": "Maak er eerst een keersom van.",
              "explanation": "4 x 7 = 28."
            },
            {
              "id": "temple-panel-2b",
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
          "id": "temple-panel-slot-3",
          "variants": [
            {
              "id": "temple-panel-3a",
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
              "id": "temple-panel-3b",
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
              "prompt": "Sven verdeelt 72 steentjes bij het tempelpaneel in 8 gelijke groepjes. Hoeveel steentjes krijgt elk groepje?",
              "hintMinnie": "Verdeel het totaal in gelijke groepjes.",
              "hintMoose": "Gebruik de omgekeerde keersom.",
              "explanation": "72 : 8 = 9, want 8 x 9 = 72."
            }
          ]
        },
        {
          "id": "temple-panel-slot-4",
          "variants": [
            {
              "id": "temple-panel-4a",
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
              "id": "temple-panel-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "spelling",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "answer": "Zonnewijzer",
              "choices": [
                "Zonnewijzer",
                "Zonneweizer",
                "Zonnewyzer",
                "Zonne-wijzer"
              ],
              "prompt": "Welk woord is goed gespeld?",
              "hintMinnie": "Lees het woord rustig van links naar rechts.",
              "hintMoose": "Kijk naar de klanken en kies de spelling die klopt.",
              "explanation": "Zonnewijzer is de juiste spelling."
            }
          ]
        }
      ]
    }
  ],
  "objects": [
    {
      "id": "offeringTable",
      "type": "challenge",
      "name": "Offertafel",
      "x": 478,
      "y": 500,
      "radius": 62,
      "approach": {
        "x": 429,
        "y": 600
      }
    },
    {
      "id": "sundial",
      "type": "challenge",
      "name": "Zonnewijzer",
      "x": 775,
      "y": 465,
      "radius": 73,
      "approach": {
        "x": 740,
        "y": 611
      }
    },
    {
      "id": "carvedRelief",
      "type": "challenge",
      "name": "Gekerfd relief",
      "x": 1123,
      "y": 463,
      "radius": 65,
      "approach": {
        "x": 1091,
        "y": 604
      }
    },
    {
      "id": "templePanel",
      "type": "challenge",
      "name": "Tempelpaneel",
      "x": 1478,
      "y": 455,
      "radius": 92,
      "approach": {
        "x": 1437,
        "y": 590
      }
    },
    {
      "id": "homeScarab",
      "type": "exit",
      "name": "Gouden scarabee",
      "x": 1920,
      "y": 378,
      "radius": 120,
      "approach": {
        "x": 1892,
        "y": 584
      },
      "targetLevel": "LVL-0031",
      "lockedUntilComplete": true
    }
  ],
  "exits": [
    {
      "id": "homeScarab",
      "targetLevel": "LVL-0031",
      "lockedUntilComplete": true
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "description": "Sven bereikt Abu Simbel, het oude Egypte-finalelevel met de scarabee als weg naar huis.",
  "storageKey": "lvl-0030-egypt-progress",
  "progressKey": "lvl-0030-egypt-completed",
  "challengeArt": "Levels/LVL-0030/assets/nebu.png",
  "spiritName": "Nebu",
  "walkPath": [
    {
      "id": "start",
      "x": 226,
      "y": 607
    },
    {
      "id": "offeringTable-approach",
      "x": 429,
      "y": 600,
      "role": "approach"
    },
    {
      "id": "sundial-approach",
      "x": 740,
      "y": 611,
      "role": "approach"
    },
    {
      "id": "carvedRelief-approach",
      "x": 1091,
      "y": 604,
      "role": "approach"
    },
    {
      "id": "templePanel-approach",
      "x": 1437,
      "y": 590,
      "role": "approach"
    },
    {
      "id": "homeScarab-approach",
      "x": 1892,
      "y": 584,
      "role": "approach"
    }
  ],
  "interactiveObjects": [
    {
      "id": "offeringTable",
      "type": "rune",
      "center": {
        "x": 478,
        "y": 500
      },
      "radius": 62,
      "approachNode": "offeringTable-approach",
      "label": "Offertafel"
    },
    {
      "id": "sundial",
      "type": "rune",
      "center": {
        "x": 775,
        "y": 465
      },
      "radius": 73,
      "approachNode": "sundial-approach",
      "label": "Zonnewijzer"
    },
    {
      "id": "carvedRelief",
      "type": "rune",
      "center": {
        "x": 1123,
        "y": 463
      },
      "radius": 65,
      "approachNode": "carvedRelief-approach",
      "label": "Gekerfd relief"
    },
    {
      "id": "templePanel",
      "type": "rune",
      "center": {
        "x": 1478,
        "y": 455
      },
      "radius": 92,
      "approachNode": "templePanel-approach",
      "label": "Tempelpaneel"
    },
    {
      "id": "homeScarab",
      "type": "exit",
      "center": {
        "x": 1920,
        "y": 378
      },
      "radius": 120,
      "approachNode": "homeScarab-approach",
      "label": "Gouden scarabee"
    }
  ],
  "hotspots": [
    {
      "id": "homeScarab",
      "objectId": "homeScarab",
      "type": "exit",
      "name": "Gouden scarabee",
      "defaultAction": "activate",
      "prompt": "De scarabee kan Sven terug naar het museum brengen.",
      "solved": "De scarabee is wakker en wijst naar huis."
    }
  ],
  "runes": [
    {
      "id": "offeringTable",
      "objectId": "offeringTable",
      "name": "Offertafel",
      "shortName": "Offertafel",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de offertafel.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "offeringTable"
    },
    {
      "id": "sundial",
      "objectId": "sundial",
      "name": "Zonnewijzer",
      "shortName": "Zonnewijzer",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar de zonnewijzer.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "sundial"
    },
    {
      "id": "carvedRelief",
      "objectId": "carvedRelief",
      "name": "Gekerfd relief",
      "shortName": "Gekerfd relief",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het gekerfde relief.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "carvedRelief"
    },
    {
      "id": "templePanel",
      "objectId": "templePanel",
      "name": "Tempelpaneel",
      "shortName": "Tempelpaneel",
      "defaultAction": "activate",
      "intro": "Nebu kijkt naar het tempelpaneel.",
      "prompt": "Los de vier Egyptische vragen op.",
      "solved": "Mooi onderzocht! Deze ontdekking is klaar.",
      "challengeId": "templePanel"
    }
  ],
  "areas": [
    {
      "id": "offeringTable",
      "name": "Offertafel",
      "description": "Onderzoek offertafel met Nebu."
    },
    {
      "id": "sundial",
      "name": "Zonnewijzer",
      "description": "Onderzoek zonnewijzer met Nebu."
    },
    {
      "id": "carvedRelief",
      "name": "Gekerfd relief",
      "description": "Onderzoek gekerfd relief met Nebu."
    },
    {
      "id": "templePanel",
      "name": "Tempelpaneel",
      "description": "Onderzoek tempelpaneel met Nebu."
    }
  ],
  "companion": {
    "id": "CHR-EGYPT-NEBU",
    "name": "Nebu",
    "portrait": "Levels/LVL-0030/assets/nebu.png"
  },
  "reward": {
    "title": "De scarabee wordt wakker",
    "line": "Gouden vleugels lichten op en de museumlucht komt terug.",
    "art": "Levels/LVL-0030/assets/nebu.png",
    "badge": "Scarabeevinder",
    "nextLevelId": "LVL-0031",
    "nextLabel": "Ga verder"
  },
  "spiritLines": {
    "welcome": "Abu Simbel is groot en oud. De scarabee kent de terugweg.",
    "moving": "Zon, steen en schaduw helpen wie goed kijkt.",
    "allRunes": "De scarabee is rustig wakker.",
    "reward": "Nu brengt hij Sven terug."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Die beelden zijn zo groot dat mijn snorharen stil worden."
    },
    "moving": {
      "speaker": "moose",
      "text": "Tempelstenen zijn stevig. Onze stappen mogen dat ook zijn."
    },
    "allRunes": {
      "speaker": "minnie",
      "text": "De scarabee glimt anders. Alsof hij ademt."
    },
    "reward": {
      "speaker": "moose",
      "text": "Dat lijkt op een route naar huis. Eindelijk praktisch."
    }
  },
  "levelSemantics": {
    "setting": "Abu Simbel voor de tempelbeelden",
    "mood": "zonnig, groots en hoopvol",
    "companionFocus": {
      "minnie": "scarabeeglans, zonlicht en tempeldetails",
      "moose": "veilige route terug naar huis"
    }
  },
  "companionMoments": [
    {
      "id": "LVL-0030-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Abu Simbel voelt als het grote einde van oud Egypte."
    },
    {
      "id": "LVL-0030-open",
      "event": "CHALLENGE_OPEN",
      "speaker": "moose",
      "text": "Nebu leest de schaduw alsof het een regel tekst is."
    },
    {
      "id": "LVL-0030-success",
      "event": "CHALLENGE_SUCCESS",
      "speaker": "minnie",
      "text": "Daar schittert weer een tempelteken."
    },
    {
      "id": "LVL-0030-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De scarabee is klaar. Dat klinkt als thuiswerk voor een kever."
    },
    {
      "id": "LVL-0030-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De scarabee blijft stil. We missen nog een tempelspoor."
    }
  ],
  "menu": {
    "illustration": "Levels/LVL-0030/assets/abu_simbel.png",
    "badge": "Verbonden gebied",
    "detail": "Tempelbeelden, zonnewijzer en scarabee"
  },
  "intro": [
    "Abu Simbel is het oude Egypte-finalelevel. De scarabee rechts kan Sven terugbrengen.",
    "De zonnewijzer is een echte klokproef; de groene route verschijnt pas als alle ontdekkingen klaar zijn."
  ],
  "exitHotspotId": "homeScarab",
  "exitActionLabel": "Terug naar het museum",
  "theme": "Abu Simbel finale",
  "sceneEffects": [
    {
      "id": "sun-presence-01",
      "label": "Warm day sun 1",
      "presetId": "sun-presence",
      "variantId": "warm-day-sun",
      "presetVersion": 1,
      "enabled": true,
      "seed": 292650125,
      "qualityTier": "auto",
      "layerSlot": "worldLight",
      "groupId": "",
      "geometry": {
        "type": "pointRadius",
        "x": 7,
        "y": 1,
        "radius": 250
      },
      "overrides": {
        "rayStartAngle": 10,
        "rayEndAngle": 82
      }
    }
  ]
};
