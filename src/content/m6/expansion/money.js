// Approved Atlas M6 expansion. Source: scripts/content/atlas-m6-central-approved.md
// Generated representation only; edit approved source/transcription, never educational prose here.
(function (global) {
  const records = [
  {
    "id": "M6-MO-001",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "money",
    "learningObjective": "count_currency_visual",
    "reportLabel": "Geld · Bedrag tellen",
    "family": "count_currency_visual",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**€20 + €5 + €2 + €0,50 = €27,50**"
      },
      "question": {
        "answer": 2750,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "27,50"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Hoeveel geld zie je in totaal?",
        "answerDisplay": "2.750 cent = €27,50",
        "hintMinnie": "Tel eerst de **hele euro’s** bij elkaar op. Kijk daarna pas naar de centen.",
        "hintMoose": "€20 + €5 + €2 = **€27**. Er ligt ook nog **50 cent**.",
        "explanation": "Eerst tellen we de hele euro’s:\n\n**€20 + €5 + €2 = €27**.\n\nDaar komt nog **€0,50** bij.\n\nDus:\n\n**€27 + €0,50 = €27,50**.\n\nHet totale bedrag is **€27,50**.",
        "authoredSupport": {
          "explanationSteps": [
            "Eerst tellen we de hele euro’s:",
            "**€20 + €5 + €2 = €27**.",
            "Daar komt nog **€0,50** bij.",
            "Dus:",
            "**€27 + €0,50 = €27,50**.",
            "Het totale bedrag is **€27,50**."
          ]
        },
        "visual": {
          "type": "currency",
          "stages": {
            "question": {
              "mode": "count",
              "items": [
                {
                  "denomination": 2000,
                  "count": 1
                },
                {
                  "denomination": 500,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                }
              ]
            },
            "minnie": {
              "mode": "count",
              "items": [
                {
                  "denomination": 2000,
                  "count": 1
                },
                {
                  "denomination": 500,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                }
              ],
              "rows": [
                [
                  0,
                  1,
                  2
                ],
                [
                  3
                ]
              ]
            },
            "moose": {
              "mode": "count",
              "items": [
                {
                  "denomination": 2000,
                  "count": 1
                },
                {
                  "denomination": 500,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                }
              ],
              "rows": [
                [
                  0,
                  1,
                  2
                ],
                [
                  3
                ]
              ],
              "notes": [
                "€20 + €5 + €2 = €27"
              ]
            },
            "explanation": {
              "mode": "count",
              "items": [
                {
                  "denomination": 2000,
                  "count": 1
                },
                {
                  "denomination": 500,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                }
              ],
              "notes": [
                "€27 + €0,50 = €27,50"
              ]
            }
          },
          "instructions": {
            "question": "toon de vier echte currency-assets zonder bedragen op te tellen.",
            "minnie": "groepeer visueel de drie hele-eurobedragen apart van de 50 cent.",
            "moose": "toon `€20 + €5 + €2 = €27`; 50 cent blijft als laatste stap zichtbaar.",
            "explanation": "toon `€27 + €0,50 = €27,50`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-MO-002",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "money",
    "learningObjective": "count_currency_visual_mixed_cents",
    "reportLabel": "Geld · Euro’s en centen tellen",
    "family": "count_currency_visual_mixed_cents",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**€10 + €2 + €1 + €0,50 + €0,10 + €0,05 = €13,65**"
      },
      "question": {
        "answer": 1365,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "13,65"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Hoeveel geld zie je in totaal?",
        "answerDisplay": "1.365 cent = €13,65",
        "hintMinnie": "Maak twee groepjes: **hele euro’s** en **centen**. Tel die apart.",
        "hintMoose": "De hele euro’s zijn samen **€13**.  \nDe centen zijn **50 + 10 + 5 = 65 cent**.  \nZet die twee delen nu samen.",
        "explanation": "De hele euro’s:\n\n**€10 + €2 + €1 = €13**.\n\nDe centen:\n\n**50 + 10 + 5 = 65 cent**.\n\nSamen is dat:\n\n**€13,65**.",
        "authoredSupport": {
          "explanationSteps": [
            "De hele euro’s:",
            "**€10 + €2 + €1 = €13**.",
            "De centen:",
            "**50 + 10 + 5 = 65 cent**.",
            "Samen is dat:",
            "**€13,65**."
          ]
        },
        "visual": {
          "type": "currency",
          "stages": {
            "question": {
              "mode": "count",
              "items": [
                {
                  "denomination": 1000,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 100,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                },
                {
                  "denomination": 10,
                  "count": 1
                },
                {
                  "denomination": 5,
                  "count": 1
                }
              ]
            },
            "minnie": {
              "mode": "count",
              "items": [
                {
                  "denomination": 1000,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 100,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                },
                {
                  "denomination": 10,
                  "count": 1
                },
                {
                  "denomination": 5,
                  "count": 1
                }
              ],
              "rows": [
                [
                  0,
                  1,
                  2
                ],
                [
                  3,
                  4,
                  5
                ]
              ]
            },
            "moose": {
              "mode": "count",
              "items": [
                {
                  "denomination": 1000,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 100,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                },
                {
                  "denomination": 10,
                  "count": 1
                },
                {
                  "denomination": 5,
                  "count": 1
                }
              ],
              "rows": [
                [
                  0,
                  1,
                  2
                ],
                [
                  3,
                  4,
                  5
                ]
              ],
              "notes": [
                "€10 + €2 + €1 = €13",
                "50 + 10 + 5 = 65 cent"
              ]
            },
            "explanation": {
              "mode": "count",
              "items": [
                {
                  "denomination": 1000,
                  "count": 1
                },
                {
                  "denomination": 200,
                  "count": 1
                },
                {
                  "denomination": 100,
                  "count": 1
                },
                {
                  "denomination": 50,
                  "count": 1
                },
                {
                  "denomination": 10,
                  "count": 1
                },
                {
                  "denomination": 5,
                  "count": 1
                }
              ],
              "notes": [
                "€13,65"
              ]
            }
          },
          "instructions": {
            "question": "toon alle echte currency-assets.",
            "minnie": "groepeer euro’s en centen visueel in twee rijen.",
            "moose": "toon `€10 + €2 + €1 = €13` en `50 + 10 + 5 = 65 cent`; eindbedrag blijft open.",
            "explanation": "combineer naar `€13,65`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-MO-003",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "money",
    "learningObjective": "calculate_change_to_next_euro",
    "reportLabel": "Geld · Wisselgeld",
    "family": "calculate_change_to_next_euro",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "Price €2,70\nPaid €3,00\nChange €0,30"
      },
      "question": {
        "answer": 30,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "0,30"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "purchase",
        "prompt": "Iets kost **€2,70**. Je betaalt met **€3,00**. Hoeveel geld krijg je terug?",
        "answerDisplay": "30 cent = €0,30",
        "hintMinnie": "Kijk hoeveel cent er bij 70 cent moeten om bij een hele euro van 100 cent te komen.",
        "hintMoose": "Je gaat van €2,70 naar €3,00. Reken **100 − 70** om te bepalen hoeveel cent je erbij moet tellen.",
        "explanation": "We zoeken het verschil tussen €2,70 en €3,00.\n\nDe 70 cent moet worden aangevuld tot 100 cent.\n\n**100 − 70 = 30 cent**.\n\n30 cent schrijf je als **€0,30**.\n\nJe krijgt dus **€0,30 wisselgeld**.\n\nControle: **€2,70 + €0,30 = €3,00**.",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken het verschil tussen €2,70 en €3,00.",
            "De 70 cent moet worden aangevuld tot 100 cent.",
            "**100 − 70 = 30 cent**.",
            "30 cent schrijf je als **€0,30**.",
            "Je krijgt dus **€0,30 wisselgeld**.",
            "Controle: **€2,70 + €0,30 = €3,00**."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "?",
              "highlight": [],
              "groups": []
            },
            "minnie": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "nodes": [
                    "€2,70",
                    "€3,00"
                  ],
                  "jumps": [
                    "?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "100 − 70 = ? cent"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "€0,30",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "100 − 70 = 30 cent",
                    "30 cent = €0,30",
                    "€2,70 + €0,30 = €3,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "price €2,70\npaid €3,00",
            "minnie": "show price → paid, unknown jump.",
            "moose": "100 − 70 = ? cent",
            "explanation": "100 − 70 = 30 cent\n30 cent = €0,30\n€2,70 + €0,30 = €3,00"
          }
        }
      },
      {
        "id": "ticket",
        "prompt": "Een kaartje kost **€2,70**. Je betaalt met **€3,00**. Hoeveel wisselgeld krijg je?",
        "answerDisplay": "30 cent = €0,30",
        "hintMinnie": "Kijk hoeveel cent er bij 70 cent moeten om bij een hele euro van 100 cent te komen.",
        "hintMoose": "Je gaat van €2,70 naar €3,00. Reken **100 − 70** om te bepalen hoeveel cent je erbij moet tellen.",
        "explanation": "We zoeken het verschil tussen €2,70 en €3,00.\n\nDe 70 cent moet worden aangevuld tot 100 cent.\n\n**100 − 70 = 30 cent**.\n\n30 cent schrijf je als **€0,30**.\n\nJe krijgt dus **€0,30 wisselgeld**.\n\nControle: **€2,70 + €0,30 = €3,00**.",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken het verschil tussen €2,70 en €3,00.",
            "De 70 cent moet worden aangevuld tot 100 cent.",
            "**100 − 70 = 30 cent**.",
            "30 cent schrijf je als **€0,30**.",
            "Je krijgt dus **€0,30 wisselgeld**.",
            "Controle: **€2,70 + €0,30 = €3,00**."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "?",
              "highlight": [],
              "groups": []
            },
            "minnie": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "nodes": [
                    "€2,70",
                    "€3,00"
                  ],
                  "jumps": [
                    "?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "100 − 70 = ? cent"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€2,70"
                }
              ],
              "paid": "€3,00",
              "change": "€0,30",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "100 − 70 = 30 cent",
                    "30 cent = €0,30",
                    "€2,70 + €0,30 = €3,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "price €2,70\npaid €3,00",
            "minnie": "show price → paid, unknown jump.",
            "moose": "100 − 70 = ? cent",
            "explanation": "100 − 70 = 30 cent\n30 cent = €0,30\n€2,70 + €0,30 = €3,00"
          }
        }
      }
    ]
  },
  {
    "id": "M6-MO-004",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "money",
    "learningObjective": "compose_exact_currency_amount",
    "reportLabel": "Geld · Bedrag samenstellen",
    "family": "compose_exact_currency_amount",
    "presentation": "story",
    "answerMode": "currencyCompose",
    "educationalCore": {
      "values": {
        "authored": "**Stel exact €8,50 samen**"
      },
      "question": {
        "answer": 850,
        "answerSpec": {
          "type": "currency",
          "mode": "compose",
          "denominations": [
            500,
            200,
            100,
            50
          ],
          "targetCents": 850
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Maak precies **€8,50** met de munten en biljetten.",
        "answerDisplay": "€8,50",
        "hintMinnie": "Begin met een groot bedrag dat **niet over €8,50 heen gaat**. Kijk daarna hoeveel er nog ontbreekt.",
        "hintMoose": "Je kunt bijvoorbeeld beginnen met **€5**. Dan moet je nog **€3,50** samenstellen met de andere bedragen.",
        "explanation": "Er zijn meerdere goede combinaties mogelijk.\n\nEén mogelijkheid is:\n\n**€5 + €2 + €1 + €0,50 = €8,50**.\n\nControle:\n\n**€5 + €2 = €7**.\n\n**€7 + €1 = €8**.\n\n**€8 + €0,50 = €8,50**.\n\nElke andere gekozen combinatie die precies **€8,50** vormt, is ook correct.",
        "authoredSupport": {
          "explanationSteps": [
            "Er zijn meerdere goede combinaties mogelijk.",
            "Eén mogelijkheid is:",
            "**€5 + €2 + €1 + €0,50 = €8,50**.",
            "Controle:",
            "**€5 + €2 = €7**.",
            "**€7 + €1 = €8**.",
            "**€8 + €0,50 = €8,50**.",
            "Elke andere gekozen combinatie die precies **€8,50** vormt, is ook correct."
          ]
        },
        "visual": {
          "type": "currency",
          "stages": {
            "question": {
              "mode": "compose",
              "targetCents": 850,
              "denominations": [
                500,
                200,
                100,
                50
              ],
              "label": "€8,50"
            },
            "minnie": {
              "mode": "compose",
              "targetCents": 850,
              "denominations": [
                500,
                200,
                100,
                50
              ],
              "label": "€8,50",
              "highlightDenominations": [
                500
              ]
            },
            "moose": {
              "mode": "compose",
              "targetCents": 850,
              "denominations": [
                500,
                200,
                100,
                50
              ],
              "notes": [
                "€8,50 − €5,00 = €3,50 over"
              ]
            },
            "explanation": {
              "mode": "compose",
              "targetCents": 850,
              "denominations": [
                500,
                200,
                100,
                50
              ],
              "notes": [
                "€5 + €2 + €1 + €0,50 = €8,50"
              ]
            }
          },
          "instructions": {
            "question": "currency-compose interface met target €8,50 en vier beschikbare echte currency-assets.",
            "minnie": "benadruk alleen het doelbedrag en de grootste beschikbare denominatie; nog geen gekozen aantallen.",
            "moose": "toon als strategie `Begin bijvoorbeeld met €5. Dan moet je nog €3,50 maken.` zonder verdere oplossing.",
            "explanation": "toon één geldige route: `€5 + €2 + €1 + €0,50 = €8,50`, met expliciete melding dat andere combinaties ook goed kunnen zijn."
          }
        }
      }
    ]
  },
  {
    "id": "M6-MO-005",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "money",
    "learningObjective": "compose_exact_currency_amount",
    "reportLabel": "Geld · Bedrag samenstellen",
    "family": "compose_exact_currency_amount",
    "presentation": "story",
    "answerMode": "currencyCompose",
    "educationalCore": {
      "values": {
        "authored": "**Stel exact €24,50 samen**"
      },
      "question": {
        "answer": 2450,
        "answerSpec": {
          "type": "currency",
          "mode": "compose",
          "denominations": [
            2000,
            1000,
            500,
            200,
            100,
            50
          ],
          "targetCents": 2450
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Maak precies **€24,50** met de munten en biljetten.",
        "answerDisplay": "€24,50",
        "hintMinnie": "Begin met een groot bedrag dat onder **€24,50** blijft. Kijk daarna hoeveel er nog ontbreekt.",
        "hintMoose": "Je kunt bijvoorbeeld beginnen met **€20**. Dan moet je nog **€4,50** samenstellen.",
        "explanation": "Er zijn meerdere goede combinaties mogelijk.\n\nEén mogelijkheid is:\n\n**€20 + €2 + €2 + €0,50 = €24,50**.\n\nControle:\n\n**€20 + €2 + €2 = €24**.\n\n**€24 + €0,50 = €24,50**.\n\nElke andere combinatie die precies **€24,50** vormt, is ook correct.",
        "authoredSupport": {
          "explanationSteps": [
            "Er zijn meerdere goede combinaties mogelijk.",
            "Eén mogelijkheid is:",
            "**€20 + €2 + €2 + €0,50 = €24,50**.",
            "Controle:",
            "**€20 + €2 + €2 = €24**.",
            "**€24 + €0,50 = €24,50**.",
            "Elke andere combinatie die precies **€24,50** vormt, is ook correct."
          ]
        },
        "visual": {
          "type": "currency",
          "stages": {
            "question": {
              "mode": "compose",
              "targetCents": 2450,
              "denominations": [
                2000,
                1000,
                500,
                200,
                100,
                50
              ],
              "label": "€24,50"
            },
            "minnie": {
              "mode": "compose",
              "targetCents": 2450,
              "denominations": [
                2000,
                1000,
                500,
                200,
                100,
                50
              ],
              "label": "€24,50",
              "highlightDenominations": [
                2000
              ]
            },
            "moose": {
              "mode": "compose",
              "targetCents": 2450,
              "denominations": [
                2000,
                1000,
                500,
                200,
                100,
                50
              ],
              "notes": [
                "€24,50 − €20,00 = €4,50 over"
              ]
            },
            "explanation": {
              "mode": "compose",
              "targetCents": 2450,
              "denominations": [
                2000,
                1000,
                500,
                200,
                100,
                50
              ],
              "notes": [
                "€20 + €2 + €2 + €0,50 = €24,50"
              ]
            }
          },
          "instructions": {
            "question": "currency-compose interface met target €24,50 en de beschikbare echte currency-assets.",
            "minnie": "benadruk dat een groot biljet handig kan zijn en dat het gekozen totaal niet boven €24,50 mag uitkomen.",
            "moose": "toon als strategie `Begin bijvoorbeeld met €20. Dan ontbreekt nog €4,50.` zonder verdere oplossing.",
            "explanation": "toon één geldige route: `€20 + €2 + €2 + €0,50 = €24,50`, met expliciete melding dat andere exacte combinaties ook correct zijn."
          }
        }
      }
    ]
  },
  {
    "id": "M6-MO-006",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "money",
    "learningObjective": "calculate_change_mixed_euros_cents",
    "reportLabel": "Geld · Wisselgeld berekenen",
    "family": "calculate_change_mixed_euros_cents",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "Price €14,65\nPaid €20,00\nChange €5,35"
      },
      "question": {
        "answer": 535,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "5,35"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "purchase",
        "prompt": "Iets kost **€14,65**. Je betaalt met **€20,00**. Hoeveel geld krijg je terug?",
        "answerDisplay": "535 cent = €5,35",
        "hintMinnie": "Vul €14,65 eerst aan tot **€15,00**. Reken daarna verder tot €20,00.",
        "hintMoose": "Van €14,65 naar €15,00 is **€0,35**. Van €15,00 naar €20,00 is **€5,00**. Tel die twee stukken bij elkaar op.",
        "explanation": "We vullen €14,65 aan tot €20,00.\n\nVan **€14,65 naar €15,00** is **€0,35**.\n\nVan **€15,00 naar €20,00** is **€5,00**.\n\nSamen:\n\n**€0,35 + €5,00 = €5,35**.\n\nJe krijgt dus **€5,35 wisselgeld**.\n\nControle: **€14,65 + €5,35 = €20,00**.",
        "authoredSupport": {
          "explanationSteps": [
            "We vullen €14,65 aan tot €20,00.",
            "Van **€14,65 naar €15,00** is **€0,35**.",
            "Van **€15,00 naar €20,00** is **€5,00**.",
            "Samen:",
            "**€0,35 + €5,00 = €5,35**.",
            "Je krijgt dus **€5,35 wisselgeld**.",
            "Controle: **€14,65 + €5,35 = €20,00**."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": []
            },
            "minnie": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€15,00"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€14,65 → €15,00 = €0,35",
                    "€15,00 → €20,00 = €5,00"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "€5,35",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€0,35 + €5,00 = €5,35",
                    "€14,65 + €5,35 = €20,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "moneyReceipt met prijs €14,65, betaald €20,00, wisselgeld `?`.",
            "minnie": "toon het handige tussenpunt €15,00.",
            "moose": "toon `€14,65 → €15,00 = €0,35` en `€15,00 → €20,00 = €5,00`; totaal blijft open.",
            "explanation": "toon `€0,35 + €5,00 = €5,35` en `€14,65 + €5,35 = €20,00`."
          }
        }
      },
      {
        "id": "entry",
        "prompt": "Een toegangsbewijs kost **€14,65**. Je betaalt met **€20,00**. Hoeveel wisselgeld krijg je?",
        "answerDisplay": "535 cent = €5,35",
        "hintMinnie": "Vul €14,65 eerst aan tot **€15,00**. Reken daarna verder tot €20,00.",
        "hintMoose": "Van €14,65 naar €15,00 is **€0,35**. Van €15,00 naar €20,00 is **€5,00**. Tel die twee stukken bij elkaar op.",
        "explanation": "We vullen €14,65 aan tot €20,00.\n\nVan **€14,65 naar €15,00** is **€0,35**.\n\nVan **€15,00 naar €20,00** is **€5,00**.\n\nSamen:\n\n**€0,35 + €5,00 = €5,35**.\n\nJe krijgt dus **€5,35 wisselgeld**.\n\nControle: **€14,65 + €5,35 = €20,00**.",
        "authoredSupport": {
          "explanationSteps": [
            "We vullen €14,65 aan tot €20,00.",
            "Van **€14,65 naar €15,00** is **€0,35**.",
            "Van **€15,00 naar €20,00** is **€5,00**.",
            "Samen:",
            "**€0,35 + €5,00 = €5,35**.",
            "Je krijgt dus **€5,35 wisselgeld**.",
            "Controle: **€14,65 + €5,35 = €20,00**."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": []
            },
            "minnie": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€15,00"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€14,65 → €15,00 = €0,35",
                    "€15,00 → €20,00 = €5,00"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€14,65"
                }
              ],
              "paid": "€20,00",
              "change": "€5,35",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€0,35 + €5,00 = €5,35",
                    "€14,65 + €5,35 = €20,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "moneyReceipt met prijs €14,65, betaald €20,00, wisselgeld `?`.",
            "minnie": "toon het handige tussenpunt €15,00.",
            "moose": "toon `€14,65 → €15,00 = €0,35` en `€15,00 → €20,00 = €5,00`; totaal blijft open.",
            "explanation": "toon `€0,35 + €5,00 = €5,35` en `€14,65 + €5,35 = €20,00`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-MO-007",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 3,
    "educationalDomain": "money",
    "learningObjective": "add_prices_then_calculate_change",
    "reportLabel": "Geld · Meerstaps betalen",
    "family": "add_prices_then_calculate_change",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**€7,35 + €4,80 = €12,15; betaald €20,00 → wisselgeld €7,85**"
      },
      "question": {
        "answer": 785,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "7,85"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "shop",
        "prompt": "Je koopt iets van **€7,35** en iets van **€4,80**. Je betaalt met **€20,00**. Hoeveel geld krijg je terug?",
        "answerDisplay": "785 cent = €7,85",
        "hintMinnie": "Reken eerst uit wat de **twee aankopen samen** kosten. Pas daarna kun je het wisselgeld bepalen.",
        "hintMoose": "€7,35 + €4,80 = **€12,15**.\n\nTel nu vanaf €12,15 omhoog naar €20,00. Van €12,15 naar €13,00 is **€0,85**.",
        "explanation": "Eerst tellen we de twee prijzen op:\n\n**€7,35 + €4,80 = €12,15**.\n\nJe betaalt €20,00.\n\nVan **€12,15 naar €13,00** is **€0,85**.\n\nVan **€13,00 naar €20,00** is **€7,00**.\n\nSamen:\n\n**€0,85 + €7,00 = €7,85**.\n\nJe krijgt dus **€7,85 wisselgeld**.",
        "authoredSupport": {
          "explanationSteps": [
            "Eerst tellen we de twee prijzen op:",
            "**€7,35 + €4,80 = €12,15**.",
            "Je betaalt €20,00.",
            "Van **€12,15 naar €13,00** is **€0,85**.",
            "Van **€13,00 naar €20,00** is **€7,00**.",
            "Samen:",
            "**€0,85 + €7,00 = €7,85**.",
            "Je krijgt dus **€7,85 wisselgeld**."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": []
            },
            "minnie": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [
                0,
                1
              ],
              "groups": [
                {
                  "lines": [
                    "€7,35 + €4,80 = ?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€7,35 + €4,80 = €12,15",
                    "€12,15 → €13,00 = €0,85",
                    "€13,00 → €20,00 = €7,00"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "€7,85",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€7,35 + €4,80 = €12,15",
                    "€0,85 + €7,00 = €7,85"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "receipt met twee prijzen, betaalbedrag €20,00 en wisselgeld `?`.",
            "minnie": "benadruk eerst de twee prijzen; toon `€7,35 + €4,80 = ?`.",
            "moose": "toon het totaal `€12,15` en daarna `€12,15 → €13,00 = €0,85` en `€13,00 → €20,00 = €7,00`; eindantwoord blijft open.",
            "explanation": "toon `€0,85 + €7,00 = €7,85`."
          }
        }
      },
      {
        "id": "tickets",
        "prompt": "Twee kaartjes kosten **€7,35** en **€4,80**. Je betaalt samen met **€20,00**. Hoeveel wisselgeld krijg je?",
        "answerDisplay": "785 cent = €7,85",
        "hintMinnie": "Reken eerst uit wat de **twee aankopen samen** kosten. Pas daarna kun je het wisselgeld bepalen.",
        "hintMoose": "€7,35 + €4,80 = **€12,15**.\n\nTel nu vanaf €12,15 omhoog naar €20,00. Van €12,15 naar €13,00 is **€0,85**.",
        "explanation": "Eerst tellen we de twee prijzen op:\n\n**€7,35 + €4,80 = €12,15**.\n\nJe betaalt €20,00.\n\nVan **€12,15 naar €13,00** is **€0,85**.\n\nVan **€13,00 naar €20,00** is **€7,00**.\n\nSamen:\n\n**€0,85 + €7,00 = €7,85**.\n\nJe krijgt dus **€7,85 wisselgeld**.",
        "authoredSupport": {
          "explanationSteps": [
            "Eerst tellen we de twee prijzen op:",
            "**€7,35 + €4,80 = €12,15**.",
            "Je betaalt €20,00.",
            "Van **€12,15 naar €13,00** is **€0,85**.",
            "Van **€13,00 naar €20,00** is **€7,00**.",
            "Samen:",
            "**€0,85 + €7,00 = €7,85**.",
            "Je krijgt dus **€7,85 wisselgeld**."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": []
            },
            "minnie": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [
                0,
                1
              ],
              "groups": [
                {
                  "lines": [
                    "€7,35 + €4,80 = ?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "?",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€7,35 + €4,80 = €12,15",
                    "€12,15 → €13,00 = €0,85",
                    "€13,00 → €20,00 = €7,00"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Prijs",
                  "amount": "€7,35"
                },
                {
                  "label": "Prijs",
                  "amount": "€4,80"
                }
              ],
              "paid": "€20,00",
              "change": "€7,85",
              "highlight": [],
              "groups": [
                {
                  "lines": [
                    "€7,35 + €4,80 = €12,15",
                    "€0,85 + €7,00 = €7,85"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "receipt met twee prijzen, betaalbedrag €20,00 en wisselgeld `?`.",
            "minnie": "benadruk eerst de twee prijzen; toon `€7,35 + €4,80 = ?`.",
            "moose": "toon het totaal `€12,15` en daarna `€12,15 → €13,00 = €0,85` en `€13,00 → €20,00 = €7,00`; eindantwoord blijft open.",
            "explanation": "toon `€0,85 + €7,00 = €7,85`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-MO-008",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 3,
    "educationalDomain": "money",
    "learningObjective": "compose_change_amount",
    "reportLabel": "Geld · Wisselgeld samenstellen",
    "family": "compose_change_amount",
    "presentation": "story",
    "answerMode": "currencyCompose",
    "educationalCore": {
      "values": {
        "authored": "**Prijs €36,75; betaald €50,00 → wisselgeld €13,25**"
      },
      "question": {
        "answer": 1325,
        "answerSpec": {
          "type": "currency",
          "mode": "change",
          "denominations": [
            1000,
            500,
            200,
            100,
            50,
            10,
            5
          ],
          "priceCents": 3675,
          "paidCents": 5000
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een aankoop kost **€36,75**. Er wordt betaald met **€50,00**.\n\nStel het juiste **wisselgeld** samen.",
        "answerDisplay": "€13,25",
        "hintMinnie": "Bepaal eerst **hoeveel wisselgeld** nodig is. Tel vanaf €36,75 omhoog naar €50,00.",
        "hintMoose": "Van €36,75 naar €40,00 is **€3,25**.  \nVan €40,00 naar €50,00 is **€10,00**.  \nGebruik die twee stukken om het totale wisselgeld te bepalen.",
        "explanation": "We tellen vanaf €36,75 omhoog naar €50,00.\n\nVan **€36,75 naar €40,00** is **€3,25**.\n\nVan **€40,00 naar €50,00** is **€10,00**.\n\nSamen:\n\n**€3,25 + €10,00 = €13,25**.\n\nHet wisselgeld moet dus precies **€13,25** zijn.\n\nEén mogelijke samenstelling is:\n\n**€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25**.\n\nAndere combinaties die exact €13,25 vormen zijn ook correct.",
        "authoredSupport": {
          "explanationSteps": [
            "We tellen vanaf €36,75 omhoog naar €50,00.",
            "Van **€36,75 naar €40,00** is **€3,25**.",
            "Van **€40,00 naar €50,00** is **€10,00**.",
            "Samen:",
            "**€3,25 + €10,00 = €13,25**.",
            "Het wisselgeld moet dus precies **€13,25** zijn.",
            "Eén mogelijke samenstelling is:",
            "**€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25**.",
            "Andere combinaties die exact €13,25 vormen zijn ook correct."
          ]
        },
        "visual": {
          "type": "currency",
          "stages": {
            "question": {
              "mode": "change",
              "priceCents": 3675,
              "paidCents": 5000,
              "denominations": [
                1000,
                500,
                200,
                100,
                50,
                10,
                5
              ],
              "notes": [
                "€36,75 → €50,00"
              ]
            },
            "minnie": {
              "mode": "change",
              "priceCents": 3675,
              "paidCents": 5000,
              "denominations": [
                1000,
                500,
                200,
                100,
                50,
                10,
                5
              ],
              "notes": [
                "€36,75 → ? → €50,00"
              ]
            },
            "moose": {
              "mode": "change",
              "priceCents": 3675,
              "paidCents": 5000,
              "denominations": [
                1000,
                500,
                200,
                100,
                50,
                10,
                5
              ],
              "notes": [
                "€36,75 → €40,00 = €3,25",
                "€40,00 → €50,00 = €10,00"
              ]
            },
            "explanation": {
              "mode": "change",
              "priceCents": 3675,
              "paidCents": 5000,
              "denominations": [
                1000,
                500,
                200,
                100,
                50,
                10,
                5
              ],
              "notes": [
                "€3,25 + €10,00 = €13,25",
                "€10 + €2 + €1 + €0,10 + €0,10 + €0,05 = €13,25"
              ]
            }
          },
          "instructions": {
            "question": "toon prijs en betaald bedrag plus currency/change-interface, zonder doelbedrag expliciet als antwoord te tonen.",
            "minnie": "laat als tussenstap zien dat je eerst moet bepalen hoeveel geld van €36,75 tot €50,00 ontbreekt; nog geen uitkomst.",
            "moose": "toon `€36,75 → €40,00 = €3,25` en `€40,00 → €50,00 = €10,00`; totaal blijft voor de leerling om samen te stellen.",
            "explanation": "toon `€3,25 + €10,00 = €13,25` en één geldige samenstelling."
          }
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) module.exports = records;
  (global.AtlasM6Modules ||= {})['expansion-money'] = records;
})(typeof window !== 'undefined' ? window : globalThis);
