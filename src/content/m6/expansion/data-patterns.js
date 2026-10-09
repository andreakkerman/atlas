// Approved Atlas M6 expansion. Source: scripts/content/atlas-m6-central-approved.md
// Generated representation only; edit approved source/transcription, never educational prose here.
(function (global) {
  const records = [
  {
    "id": "M6-DP-001",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "dataPatterns",
    "learningObjective": "sequence_plus_ten",
    "reportLabel": "Patronen · Reeks met vaste stap",
    "family": "sequence_plus_ten",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**2.360, 2.370, 2.380, ?, 2.400 → 2.390**"
      },
      "question": {
        "answer": 2390,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "2390",
            "2.390",
            "2 390"
          ],
          "grouping": true
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Welk getal ontbreekt?\n\n**2.360 → 2.370 → 2.380 → ? → 2.400**",
        "answerDisplay": "2.390",
        "hintMinnie": "Kijk hoeveel er steeds bij komt van het ene getal naar het volgende.",
        "hintMoose": "Van 2.360 naar 2.370 komt er **10** bij. Dezelfde stap wordt steeds herhaald.",
        "explanation": "De reeks gaat steeds met **10 omhoog**:\n\n2.360 → 2.370 → 2.380 → **2.390** → 2.400.\n\nHet ontbrekende getal is **2.390**.",
        "authoredSupport": {
          "explanationSteps": [
            "De reeks gaat steeds met **10 omhoog**:",
            "2.360 → 2.370 → 2.380 → **2.390** → 2.400.",
            "Het ontbrekende getal is **2.390**."
          ]
        },
        "visual": {
          "type": "numberLine",
          "stages": {
            "question": {
              "min": 2360,
              "max": 2400,
              "markers": [
                {
                  "value": 2360,
                  "label": "2.360",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2370,
                  "label": "2.370",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2380,
                  "label": "2.380",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2390,
                  "label": "?",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2400,
                  "label": "2.400",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [],
              "notes": []
            },
            "minnie": {
              "min": 2360,
              "max": 2400,
              "markers": [
                {
                  "value": 2360,
                  "label": "2.360",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2370,
                  "label": "2.370",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2380,
                  "label": "2.380",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2390,
                  "label": "?",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2400,
                  "label": "2.400",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [
                {
                  "from": 2360,
                  "to": 2370,
                  "label": ""
                }
              ],
              "notes": []
            },
            "moose": {
              "min": 2360,
              "max": 2400,
              "markers": [
                {
                  "value": 2360,
                  "label": "2.360",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2370,
                  "label": "2.370",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2380,
                  "label": "2.380",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2390,
                  "label": "?",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2400,
                  "label": "2.400",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [
                {
                  "from": 2360,
                  "to": 2370,
                  "label": "+10"
                },
                {
                  "from": 2370,
                  "to": 2380,
                  "label": "+10"
                },
                {
                  "from": 2380,
                  "to": 2390,
                  "label": "+10"
                }
              ],
              "notes": []
            },
            "explanation": {
              "min": 2360,
              "max": 2400,
              "markers": [
                {
                  "value": 2360,
                  "label": "2.360",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2370,
                  "label": "2.370",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2380,
                  "label": "2.380",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 2390,
                  "label": "2.390",
                  "focus": true,
                  "lane": 0
                },
                {
                  "value": 2400,
                  "label": "2.400",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [
                {
                  "from": 2360,
                  "to": 2370,
                  "label": "+10"
                },
                {
                  "from": 2370,
                  "to": 2380,
                  "label": "+10"
                },
                {
                  "from": 2380,
                  "to": 2390,
                  "label": "+10"
                },
                {
                  "from": 2390,
                  "to": 2400,
                  "label": "+10"
                }
              ],
              "notes": []
            }
          },
          "instructions": {
            "question": "reeks met één lege positie.",
            "minnie": "markeer de stap van 2.360 naar 2.370.",
            "moose": "toon `+10` boven de eerste drie sprongen; lege waarde blijft open.",
            "explanation": "vul 2.390 in en toon alle +10-stappen."
          }
        }
      }
    ]
  },
  {
    "id": "M6-DP-002",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "dataPatterns",
    "learningObjective": "sequence_plus_twenty_five",
    "reportLabel": "Patronen · Reeks met grotere stap",
    "family": "sequence_plus_twenty_five",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**1.125, 1.150, 1.175, ?, 1.225 → 1.200**"
      },
      "question": {
        "answer": 1200,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "1200"
          ],
          "grouping": true
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Welk getal ontbreekt?\n\n**1.125 → 1.150 → 1.175 → ? → 1.225**",
        "answerDisplay": "1.200",
        "hintMinnie": "Bereken eerst het verschil tussen **1.125 en 1.150**.",
        "hintMoose": "Het verschil is **25**. Controleer: 1.150 + 25 = 1.175. Doe daarna dezelfde stap nog een keer.",
        "explanation": "De stap is steeds **+25**.\n\n1.125 + 25 = 1.150.\n\n1.150 + 25 = 1.175.\n\n1.175 + 25 = **1.200**.\n\nDaarna:\n\n1.200 + 25 = 1.225.\n\nHet ontbrekende getal is **1.200**.",
        "authoredSupport": {
          "explanationSteps": [
            "De stap is steeds **+25**.",
            "1.125 + 25 = 1.150.",
            "1.150 + 25 = 1.175.",
            "1.175 + 25 = **1.200**.",
            "Daarna:",
            "1.200 + 25 = 1.225.",
            "Het ontbrekende getal is **1.200**."
          ]
        },
        "visual": {
          "type": "numberLine",
          "stages": {
            "question": {
              "min": 1125,
              "max": 1225,
              "markers": [
                {
                  "value": 1125,
                  "label": "1.125",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1150,
                  "label": "1.150",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1175,
                  "label": "1.175",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1200,
                  "label": "?",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1225,
                  "label": "1.225",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [],
              "notes": []
            },
            "minnie": {
              "min": 1125,
              "max": 1225,
              "markers": [
                {
                  "value": 1125,
                  "label": "1.125",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1150,
                  "label": "1.150",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1175,
                  "label": "1.175",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1200,
                  "label": "?",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1225,
                  "label": "1.225",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [
                {
                  "from": 1125,
                  "to": 1150,
                  "label": ""
                }
              ],
              "notes": []
            },
            "moose": {
              "min": 1125,
              "max": 1225,
              "markers": [
                {
                  "value": 1125,
                  "label": "1.125",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1150,
                  "label": "1.150",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1175,
                  "label": "1.175",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1200,
                  "label": "?",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1225,
                  "label": "1.225",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [
                {
                  "from": 1125,
                  "to": 1150,
                  "label": "+25"
                },
                {
                  "from": 1150,
                  "to": 1175,
                  "label": "+25"
                }
              ],
              "notes": []
            },
            "explanation": {
              "min": 1125,
              "max": 1225,
              "markers": [
                {
                  "value": 1125,
                  "label": "1.125",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1150,
                  "label": "1.150",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1175,
                  "label": "1.175",
                  "focus": false,
                  "lane": 0
                },
                {
                  "value": 1200,
                  "label": "1.200",
                  "focus": true,
                  "lane": 0
                },
                {
                  "value": 1225,
                  "label": "1.225",
                  "focus": false,
                  "lane": 0
                }
              ],
              "jumps": [
                {
                  "from": 1125,
                  "to": 1150,
                  "label": "+25"
                },
                {
                  "from": 1150,
                  "to": 1175,
                  "label": "+25"
                },
                {
                  "from": 1175,
                  "to": 1200,
                  "label": "+25"
                },
                {
                  "from": 1200,
                  "to": 1225,
                  "label": "+25"
                }
              ],
              "notes": []
            }
          },
          "instructions": {
            "question": "reeks met lege vierde positie.",
            "minnie": "markeer `1.125 → 1.150`.",
            "moose": "toon `+25` boven twee bekende sprongen.",
            "explanation": "vul 1.200 in en toon alle sprongen."
          }
        }
      }
    ]
  },
  {
    "id": "M6-DP-003",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "dataPatterns",
    "learningObjective": "read_single_table_value",
    "reportLabel": "Data · Tabel aflezen",
    "family": "read_single_table_value",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "Authored table:\n- Maandag: 18\n- Dinsdag: 24\n- Woensdag: 21\n- Donderdag: 27\n\nVraag naar woensdag → 21."
      },
      "question": {
        "answer": 21,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "21"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": [
          "Bekijk de tabel.\n\n",
          {
            "table": {
              "columns": [
                "Dag",
                "Aantal"
              ],
              "rows": [
                [
                  "Maandag",
                  "18"
                ],
                [
                  "Dinsdag",
                  "24"
                ],
                [
                  "Woensdag",
                  "21"
                ],
                [
                  "Donderdag",
                  "27"
                ]
              ]
            },
            "source": "| Dag | Aantal |\n|---|---:|\n| Maandag | 18 |\n| Dinsdag | 24 |\n| Woensdag | 21 |\n| Donderdag | 27 |\n"
          },
          "\nHoeveel staat er bij **woensdag**?"
        ],
        "answerDisplay": "21",
        "hintMinnie": "Zoek eerst de rij met **woensdag**.",
        "hintMoose": "Kijk in de rij woensdag naar de kolom **Aantal**.",
        "explanation": "In de tabel zoeken we de rij **Woensdag**.\n\nIn die rij staat bij `Aantal` het getal **21**.\n\nHet antwoord is dus **21**.",
        "authoredSupport": {
          "explanationSteps": [
            "In de tabel zoeken we de rij **Woensdag**.",
            "In die rij staat bij `Aantal` het getal **21**.",
            "Het antwoord is dus **21**."
          ]
        },
        "visual": {
          "type": "compactDataTable",
          "stages": {
            "question": {
              "columns": [
                "Dag",
                "Aantal"
              ],
              "rows": [
                [
                  "Maandag",
                  "18"
                ],
                [
                  "Dinsdag",
                  "24"
                ],
                [
                  "Woensdag",
                  "21"
                ],
                [
                  "Donderdag",
                  "27"
                ]
              ],
              "inPrompt": true
            },
            "minnie": {
              "columns": [
                "Dag",
                "Aantal"
              ],
              "rows": [
                [
                  "Maandag",
                  "18"
                ],
                [
                  "Dinsdag",
                  "24"
                ],
                [
                  "Woensdag",
                  "21"
                ],
                [
                  "Donderdag",
                  "27"
                ]
              ],
              "highlightRows": [
                2
              ]
            },
            "moose": {
              "columns": [
                "Dag",
                "Aantal"
              ],
              "rows": [
                [
                  "Maandag",
                  "18"
                ],
                [
                  "Dinsdag",
                  "24"
                ],
                [
                  "Woensdag",
                  "21"
                ],
                [
                  "Donderdag",
                  "27"
                ]
              ],
              "highlightCells": [
                [
                  2,
                  1
                ]
              ]
            },
            "explanation": {
              "columns": [
                "Dag",
                "Aantal"
              ],
              "rows": [
                [
                  "Maandag",
                  "18"
                ],
                [
                  "Dinsdag",
                  "24"
                ],
                [
                  "Woensdag",
                  "21"
                ],
                [
                  "Donderdag",
                  "27"
                ]
              ],
              "highlightCells": [
                [
                  2,
                  1
                ]
              ],
              "notes": [
                "Woensdag → 21"
              ]
            }
          },
          "instructions": {
            "question": "compacte authored tabel met vier rijen.",
            "minnie": "accentueer alleen de rij `Woensdag`.",
            "moose": "accentueer in die rij de kolom `Aantal`; getal blijft uiteraard zichtbaar zoals in de oorspronkelijke tabel, maar er wordt geen extra antwoordtekst toegevoegd.",
            "explanation": "toon `Woensdag → 21`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-DP-004",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "dataPatterns",
    "learningObjective": "compare_table_values_difference",
    "reportLabel": "Data · Waarden vergelijken",
    "family": "compare_table_values_difference",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "Authored table:\n- Route A: 138\n- Route B: 156\n- Route C: 149\n- Route D: 132\n\nVerschil B en D: **156 − 132 = 24**"
      },
      "question": {
        "answer": 24,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "24"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": [
          "Bekijk de tabel.\n\n",
          {
            "table": {
              "columns": [
                "Route",
                "Afstand"
              ],
              "rows": [
                [
                  "A",
                  "138"
                ],
                [
                  "B",
                  "156"
                ],
                [
                  "C",
                  "149"
                ],
                [
                  "D",
                  "132"
                ]
              ]
            },
            "source": "| Route | Afstand |\n|---|---:|\n| A | 138 |\n| B | 156 |\n| C | 149 |\n| D | 132 |\n"
          },
          "\nHoeveel groter is de waarde van **route B** dan die van **route D**?"
        ],
        "answerDisplay": "24",
        "hintMinnie": "Je hebt alleen de waarden van **B en D** nodig. Zoek die eerst op.",
        "hintMoose": "Route B heeft 156 en route D 132. Het verschil vind je met **156 − 132**.",
        "explanation": "Route B heeft de waarde **156**.\n\nRoute D heeft de waarde **132**.\n\nHet verschil is:\n\n**156 − 132 = 24**.\n\nRoute B is dus **24** groter.",
        "authoredSupport": {
          "explanationSteps": [
            "Route B heeft de waarde **156**.",
            "Route D heeft de waarde **132**.",
            "Het verschil is:",
            "**156 − 132 = 24**.",
            "Route B is dus **24** groter."
          ]
        },
        "visual": {
          "type": "compactDataTable",
          "stages": {
            "question": {
              "columns": [
                "Route",
                "Afstand"
              ],
              "rows": [
                [
                  "A",
                  "138"
                ],
                [
                  "B",
                  "156"
                ],
                [
                  "C",
                  "149"
                ],
                [
                  "D",
                  "132"
                ]
              ],
              "inPrompt": true
            },
            "minnie": {
              "columns": [
                "Route",
                "Afstand"
              ],
              "rows": [
                [
                  "A",
                  "138"
                ],
                [
                  "B",
                  "156"
                ],
                [
                  "C",
                  "149"
                ],
                [
                  "D",
                  "132"
                ]
              ],
              "highlightRows": [
                1,
                3
              ]
            },
            "moose": {
              "columns": [
                "Route",
                "Afstand"
              ],
              "rows": [
                [
                  "A",
                  "138"
                ],
                [
                  "B",
                  "156"
                ],
                [
                  "C",
                  "149"
                ],
                [
                  "D",
                  "132"
                ]
              ],
              "highlightRows": [
                1,
                3
              ],
              "notes": [
                "156 − 132 = ?"
              ]
            },
            "explanation": {
              "columns": [
                "Route",
                "Afstand"
              ],
              "rows": [
                [
                  "A",
                  "138"
                ],
                [
                  "B",
                  "156"
                ],
                [
                  "C",
                  "149"
                ],
                [
                  "D",
                  "132"
                ]
              ],
              "notes": [
                "156 − 132 = 24"
              ]
            }
          },
          "instructions": {
            "question": "tabel.",
            "minnie": "accentueer rijen B en D.",
            "moose": "toon `156 − 132 = ?`.",
            "explanation": "toon `156 − 132 = 24`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-DP-005",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "dataPatterns",
    "learningObjective": "extend_ratio_table",
    "reportLabel": "Data · Verhoudingstabel",
    "family": "extend_ratio_table",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "Authored ratio table:\n- 1 doos → 6 items\n- 2 dozen → 12\n- 3 dozen → 18\n- 5 dozen → ?\n\n**5 × 6 = 30**"
      },
      "question": {
        "answer": 30,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "30"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": [
          "Bekijk de tabel.\n\n",
          {
            "table": {
              "columns": [
                "Dozen",
                "Onderdelen"
              ],
              "rows": [
                [
                  "1",
                  "6"
                ],
                [
                  "2",
                  "12"
                ],
                [
                  "3",
                  "18"
                ],
                [
                  "5",
                  "?"
                ]
              ]
            },
            "source": "| Dozen | Onderdelen |\n|---:|---:|\n| 1 | 6 |\n| 2 | 12 |\n| 3 | 18 |\n| 5 | ? |\n"
          },
          "\nIn elke doos zitten evenveel onderdelen.\n\nHoeveel onderdelen horen bij **5 dozen**?"
        ],
        "answerDisplay": "30",
        "hintMinnie": "De eerste rij vertelt hoeveel onderdelen er in **één doos** zitten.",
        "hintMoose": "Eén doos bevat 6 onderdelen. Voor 5 dozen heb je dus **5 × 6** onderdelen.",
        "explanation": "Uit de eerste rij zien we:\n\n**1 doos = 6 onderdelen**.\n\nVoor 5 dozen rekenen we:\n\n**5 × 6 = 30**.\n\nBij 5 dozen horen dus **30 onderdelen**.",
        "authoredSupport": {
          "explanationSteps": [
            "Uit de eerste rij zien we:",
            "**1 doos = 6 onderdelen**.",
            "Voor 5 dozen rekenen we:",
            "**5 × 6 = 30**.",
            "Bij 5 dozen horen dus **30 onderdelen**."
          ]
        },
        "visual": {
          "type": "compactDataTable",
          "stages": {
            "question": {
              "columns": [
                "Dozen",
                "Onderdelen"
              ],
              "rows": [
                [
                  "1",
                  "6"
                ],
                [
                  "2",
                  "12"
                ],
                [
                  "3",
                  "18"
                ],
                [
                  "5",
                  "?"
                ]
              ],
              "inPrompt": true
            },
            "minnie": {
              "columns": [
                "Dozen",
                "Onderdelen"
              ],
              "rows": [
                [
                  "1",
                  "6"
                ],
                [
                  "2",
                  "12"
                ],
                [
                  "3",
                  "18"
                ],
                [
                  "5",
                  "?"
                ]
              ],
              "highlightRows": [
                0
              ]
            },
            "moose": {
              "columns": [
                "Dozen",
                "Onderdelen"
              ],
              "rows": [
                [
                  "1",
                  "6"
                ],
                [
                  "2",
                  "12"
                ],
                [
                  "3",
                  "18"
                ],
                [
                  "5",
                  "?"
                ]
              ],
              "notes": [
                "5 × 6 = ?"
              ]
            },
            "explanation": {
              "columns": [
                "Dozen",
                "Onderdelen"
              ],
              "rows": [
                [
                  "1",
                  "6"
                ],
                [
                  "2",
                  "12"
                ],
                [
                  "3",
                  "18"
                ],
                [
                  "5",
                  "30"
                ]
              ],
              "highlightCells": [
                [
                  3,
                  1
                ]
              ]
            }
          },
          "instructions": {
            "question": "verhoudingstabel.",
            "minnie": "accentueer de eerste rij `1 → 6`.",
            "moose": "toon `5 × 6 = ?`.",
            "explanation": "vul 30 in de tabel."
          }
        }
      }
    ]
  },
  {
    "id": "M6-DP-006",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "dataPatterns",
    "learningObjective": "sequence_increasing_step",
    "reportLabel": "Patronen · Veranderende stap",
    "family": "sequence_increasing_step",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "authored": "**20 → 25 (+5) → 35 (+10) → 50 (+15) → ? (+20) = 70**"
      },
      "question": {
        "answer": "70",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "60",
          "65",
          "70",
          "75"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Welk getal komt daarna?\n\n**20 → 25 → 35 → 50 → ?**",
        "answerDisplay": "70",
        "hintMinnie": "Kijk niet alleen naar de getallen, maar naar **hoe groot elke sprong** is.",
        "hintMoose": "De sprongen zijn:\n\n**+5, +10, +15**.\n\nElke sprong wordt 5 groter. De volgende sprong is dus **+20**.",
        "explanation": "We bekijken de verschillen:\n\n20 → 25 is **+5**.\n\n25 → 35 is **+10**.\n\n35 → 50 is **+15**.\n\nDe sprong wordt iedere keer 5 groter.\n\nDe volgende sprong is daarom:\n\n**+20**.\n\nDus:\n\n**50 + 20 = 70**.\n\nHet volgende getal is **70**.",
        "authoredSupport": {
          "explanationSteps": [
            "We bekijken de verschillen:",
            "20 → 25 is **+5**.",
            "25 → 35 is **+10**.",
            "35 → 50 is **+15**.",
            "De sprong wordt iedere keer 5 groter.",
            "De volgende sprong is daarom:",
            "**+20**.",
            "Dus:",
            "**50 + 20 = 70**.",
            "Het volgende getal is **70**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": []
            },
            "minnie": {
              "groups": [
                {
                  "nodes": [
                    "20",
                    "25",
                    "35",
                    "50",
                    "?"
                  ],
                  "jumps": [
                    "+5",
                    "+10",
                    "",
                    ""
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "nodes": [
                    "20",
                    "25",
                    "35",
                    "50",
                    "?"
                  ],
                  "jumps": [
                    "+5",
                    "+10",
                    "+15",
                    "+20"
                  ]
                }
              ],
              "notes": [
                "volgende sprong = +20"
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "50 + 20 = 70"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "alleen de reeks.",
            "minnie": "toon onder de eerste twee sprongen `+5` en `+10`.",
            "moose": "voeg bij de derde sprong `+15` toe en toon `volgende sprong = +20`.",
            "explanation": "toon `50 + 20 = 70`."
          }
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) module.exports = records;
  (global.AtlasM6Modules ||= {})['expansion-data-patterns'] = records;
})(typeof window !== 'undefined' ? window : globalThis);
