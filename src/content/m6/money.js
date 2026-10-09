// Approved authored content, including atlas-m6-quality-approved.md corrections.
(function (global) {
  const records = [
  {
    "id": "RP-M6-GE-001",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 1,
    "family": "money_change",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "calculate_change_to_next_euro",
    "reportLabel": "Geld · Aanvullen tot de volgende euro",
    "educationalDomain": "money",
    "educationalCore": {
      "values": {
        "pricesCents": [
          150
        ],
        "paidCents": 200
      },
      "question": {
        "answer": 50,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "0,50",
            "0,5",
            "0.50",
            "0.5"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een **kaartje** kost €1,50. Je betaalt met €2. Hoeveel geld krijg je terug?",
        "answerDisplay": "€0,50",
        "hintMinnie": "Wisselgeld is het bedrag dat je terugkrijgt omdat je meer betaalt dan iets kost. Vul de prijs van €1,50 aan tot €2.",
        "hintMoose": "€1,50 is 1 euro en 50 cent. Een hele euro is 100 cent. Hoeveel cent moet er bij die 50 cent om bij €2 te komen? Reken 100 − 50.",
        "explanation": "Je betaalt meer dan de prijs. Het verschil tussen €1,50 en €2 krijg je terug.\n\nVul €1,50 aan tot €2. Daarvoor vul je de 50 cent aan tot een hele euro van 100 cent.\n\nEr moet 100 − 50 = 50 cent bij.\n\n50 cent schrijf je als €0,50. Je krijgt dus €0,50 terug.\n\nControle: €1,50 + €0,50 = €2,00. De prijs en het wisselgeld zijn samen precies wat je betaalde.",
        "authoredSupport": {
          "explanationSteps": [
            "Je betaalt meer dan de prijs. Het verschil tussen €1,50 en €2 krijg je terug.",
            "Vul €1,50 aan tot €2. Daarvoor vul je de 50 cent aan tot een hele euro van 100 cent.",
            "Er moet 100 − 50 = 50 cent bij.",
            "50 cent schrijf je als €0,50. Je krijgt dus €0,50 terug.",
            "Controle: €1,50 + €0,50 = €2,00. De prijs en het wisselgeld zijn samen precies wat je betaalde."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Kaartje",
                  "amount": "€1,50"
                }
              ],
              "paid": "€2,00"
            },
            "minnie": {
              "items": [
                {
                  "label": "Kaartje",
                  "amount": "€1,50"
                }
              ],
              "paid": "€2,00",
              "groups": [
                {
                  "label": "prijs → betaald",
                  "nodes": [
                    "€1,50",
                    "€2,00"
                  ],
                  "jumps": [
                    "+ ?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Kaartje",
                  "amount": "€1,50"
                }
              ],
              "paid": "€2,00",
              "groups": [
                {
                  "label": "prijs → betaald",
                  "nodes": [
                    "€1,50",
                    "€2,00"
                  ],
                  "jumps": [
                    "+ ?"
                  ]
                },
                {
                  "lines": [
                    "1 euro = 100 cent"
                  ]
                },
                {
                  "lines": [
                    "100 − 50 = ? cent"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Kaartje",
                  "amount": "€1,50"
                }
              ],
              "paid": "€2,00",
              "groups": [
                {
                  "label": "prijs → betaald",
                  "nodes": [
                    "€1,50",
                    "€2,00"
                  ],
                  "jumps": [
                    "+ 50 cent"
                  ]
                },
                {
                  "lines": [
                    "50 cent = €0,50"
                  ]
                },
                {
                  "lines": [
                    "€1,50 + €0,50 = €2,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon een prijskaartje met ‘Kaartje — €1,50’ en een apart vak ‘Betaald — €2,00’. Toon geen wisselgeld of oplossingsstappen. Onder de vraag staat het lege euro-invoerveld.",
            "minnie": "Toon een aanvulkaart ‘€1,50 → €2,00’ met ‘+ ?’ bij de pijl. Label het begin als ‘prijs’ en het einde als ‘betaald’.",
            "moose": "Behoud de aanvulkaart. Voeg ‘1 euro = 100 cent’ en ‘100 − 50 = ? cent’ toe. Het antwoordveld blijft in euro’s; vul het niet automatisch in en toon nog geen €0,50.",
            "explanation": "Vul de pijl in met ‘+ 50 cent’. Toon daarnaast ‘50 cent = €0,50’ en de controle ‘€1,50 + €0,50 = €2,00’."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-GE-002",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 1,
    "family": "money_change",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "calculate_change_to_next_euro",
    "reportLabel": "Geld · Aanvullen tot de volgende euro",
    "educationalDomain": "money",
    "educationalCore": {
      "values": {
        "pricesCents": [
          320
        ],
        "paidCents": 400
      },
      "question": {
        "answer": 80,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "0,80",
            "0,8",
            "0.80",
            "0.8"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een **stickervel** kost €3,20. Je betaalt met €4. Hoeveel geld krijg je terug?",
        "answerDisplay": "€0,80",
        "hintMinnie": "Wisselgeld vind je door de prijs aan te vullen tot wat je betaalt. Vul €3,20 aan tot €4.",
        "hintMoose": "€3,20 is 3 euro en 20 cent. Om bij €4 te komen, vul je de 20 cent aan tot een hele euro van 100 cent. Reken 100 − 20.",
        "explanation": "We zoeken het verschil tussen de prijs van €3,20 en de betaling van €4.\n\nVul de 20 cent aan tot een hele euro van 100 cent: 100 − 20 = 80 cent. Zo kom je van €3,20 bij €4.\n\n80 cent schrijf je als €0,80. Je krijgt dus €0,80 terug.\n\nControle: €3,20 + €0,80 = €4,00.",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken het verschil tussen de prijs van €3,20 en de betaling van €4.",
            "Vul de 20 cent aan tot een hele euro van 100 cent: 100 − 20 = 80 cent. Zo kom je van €3,20 bij €4.",
            "80 cent schrijf je als €0,80. Je krijgt dus €0,80 terug.",
            "Controle: €3,20 + €0,80 = €4,00."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Stickervel",
                  "amount": "€3,20"
                }
              ],
              "paid": "€4,00"
            },
            "minnie": {
              "items": [
                {
                  "label": "Stickervel",
                  "amount": "€3,20"
                }
              ],
              "paid": "€4,00",
              "groups": [
                {
                  "label": "prijs → betaald",
                  "nodes": [
                    "€3,20",
                    "€4,00"
                  ],
                  "jumps": [
                    "+ ?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Stickervel",
                  "amount": "€3,20"
                }
              ],
              "paid": "€4,00",
              "groups": [
                {
                  "label": "prijs → betaald",
                  "nodes": [
                    "€3,20",
                    "€4,00"
                  ],
                  "jumps": [
                    "+ ?"
                  ]
                },
                {
                  "lines": [
                    "1 euro = 100 cent"
                  ]
                },
                {
                  "lines": [
                    "100 − 20 = ? cent"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Stickervel",
                  "amount": "€3,20"
                }
              ],
              "paid": "€4,00",
              "groups": [
                {
                  "label": "prijs → betaald",
                  "nodes": [
                    "€3,20",
                    "€4,00"
                  ],
                  "jumps": [
                    "+ 80 cent"
                  ]
                },
                {
                  "lines": [
                    "80 cent = €0,80"
                  ]
                },
                {
                  "lines": [
                    "€3,20 + €0,80 = €4,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon ‘Stickervel — €3,20’ en ‘Betaald — €4,00’. Toon een bedrag als tekst, geen fictief bankbiljet van vier euro. Geen oplossingsstappen.",
            "minnie": "Toon ‘€3,20 → €4,00’ met ‘+ ?’ bij de pijl, van ‘prijs’ naar ‘betaald’.",
            "moose": "Voeg ‘1 euro = 100 cent’ en ‘100 − 20 = ? cent’ toe. Nog geen 80 cent of €0,80 als uitkomst tonen.",
            "explanation": "Vul de pijl in met ‘+ 80 cent’, toon ‘80 cent = €0,80’ en de controle ‘€3,20 + €0,80 = €4,00’."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-GE-003",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 2,
    "family": "money_change",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "calculate_change_mixed_euros_cents",
    "reportLabel": "Geld · Wisselgeld met euro’s en centen",
    "educationalDomain": "money",
    "educationalCore": {
      "values": {
        "pricesCents": [
          675
        ],
        "paidCents": 1000
      },
      "question": {
        "answer": 325,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "3,25",
            "3.25"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een **souvenir** kost €6,75. Je betaalt met €10. Hoeveel geld krijg je terug?",
        "answerDisplay": "€3,25",
        "hintMinnie": "Vul €6,75 eerst aan tot €7 en daarna tot €10. Alles wat je erbij telt, is samen je wisselgeld.",
        "hintMoose": "Van €6,75 naar €7 is 25 cent, want 75 + 25 = 100. Reken nu hoeveel euro er nog bij moet van €7 tot €10 en tel beide stukken samen.",
        "explanation": "We vullen de prijs van €6,75 aan tot de betaling van €10. De bedragen die we erbij tellen, vormen samen het wisselgeld.\n\nEerst naar €7: 100 − 75 = 25 cent. Dus €6,75 + €0,25 = €7,00.\n\nDaarna van €7 naar €10: €10 − €7 = €3.\n\nSamen is dat 3 euro en 25 cent: €3 + €0,25 = €3,25.\n\nJe krijgt €3,25 terug. Controle: €6,75 + €3,25 = €10,00.",
        "authoredSupport": {
          "explanationSteps": [
            "We vullen de prijs van €6,75 aan tot de betaling van €10. De bedragen die we erbij tellen, vormen samen het wisselgeld.",
            "Eerst naar €7: 100 − 75 = 25 cent. Dus €6,75 + €0,25 = €7,00.",
            "Daarna van €7 naar €10: €10 − €7 = €3.",
            "Samen is dat 3 euro en 25 cent: €3 + €0,25 = €3,25.",
            "Je krijgt €3,25 terug. Controle: €6,75 + €3,25 = €10,00."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Souvenir",
                  "amount": "€6,75"
                }
              ],
              "paid": "€10,00"
            },
            "minnie": {
              "items": [
                {
                  "label": "Souvenir",
                  "amount": "€6,75"
                }
              ],
              "paid": "€10,00",
              "groups": [
                {
                  "label": "",
                  "nodes": [
                    "€6,75",
                    "€7,00",
                    "€10,00"
                  ],
                  "jumps": [
                    "+ ?",
                    "+ ?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Souvenir",
                  "amount": "€6,75"
                }
              ],
              "paid": "€10,00",
              "groups": [
                {
                  "label": "",
                  "nodes": [
                    "€6,75",
                    "€7,00",
                    "€10,00"
                  ],
                  "jumps": [
                    "+ €0,25",
                    "+ ? euro"
                  ]
                },
                {
                  "lines": [
                    "Wisselgeld = beide sprongen samen"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Souvenir",
                  "amount": "€6,75"
                }
              ],
              "paid": "€10,00",
              "groups": [
                {
                  "label": "",
                  "nodes": [
                    "€6,75",
                    "€7,00",
                    "€10,00"
                  ],
                  "jumps": [
                    "+ €0,25",
                    "+ €3"
                  ]
                },
                {
                  "lines": [
                    "€0,25 + €3 = €3,25"
                  ]
                },
                {
                  "lines": [
                    "€6,75 + €3,25 = €10,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon ‘Souvenir — €6,75’ en ‘Betaald — €10,00’. Geen tussentotaal, hulplijn of wisselgeld tonen.",
            "minnie": "Toon ‘€6,75 → €7,00 → €10,00’, met ‘+ ?’ bij beide pijlen. De twee sprongen staan voor centen en vervolgens hele euro’s.",
            "moose": "Vul alleen de eerste pijl in: ‘+ €0,25’. Toon de tweede als ‘+ ? euro’. Onder de kaart staat ‘Wisselgeld = beide sprongen samen’; toon nog niet €3 of €3,25.",
            "explanation": "Vul de tweede pijl in met ‘+ €3’. Toon ‘€0,25 + €3 = €3,25’ en de controle. Behoud dezelfde tussenstop €7."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-GE-004",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 2,
    "family": "money_change",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "calculate_change_mixed_euros_cents",
    "reportLabel": "Geld · Wisselgeld met euro’s en centen",
    "educationalDomain": "money",
    "educationalCore": {
      "values": {
        "pricesCents": [
          1240
        ],
        "paidCents": 2000
      },
      "question": {
        "answer": 760,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "7,60",
            "7,6",
            "7.60",
            "7.6"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een **toegangsbewijs** kost €12,40. Je betaalt met €20. Hoeveel geld krijg je terug?",
        "answerDisplay": "€7,60",
        "hintMinnie": "Vul €12,40 eerst aan tot €13 en daarna tot €20. Tel de twee bedragen die erbij moeten bij elkaar op.",
        "hintMoose": "Van €12,40 naar €13 is 60 cent: 40 + 60 = 100. Reken nu het verschil tussen €13 en €20. Die euro’s en de 60 cent krijg je samen terug.",
        "explanation": "Je krijgt het verschil tussen €12,40 en €20 terug. We rekenen eerst tot €13 en daarna tot €20.\n\nVan €12,40 naar €13 is 100 − 40 = 60 cent. Dat is €0,60.\n\nVan €13 naar €20 is €20 − €13 = €7.\n\nTel de twee stukken samen: €7 + €0,60 = €7,60.\n\nJe krijgt €7,60 terug. Controle: €12,40 + €7,60 = €20,00.",
        "authoredSupport": {
          "explanationSteps": [
            "Je krijgt het verschil tussen €12,40 en €20 terug. We rekenen eerst tot €13 en daarna tot €20.",
            "Van €12,40 naar €13 is 100 − 40 = 60 cent. Dat is €0,60.",
            "Van €13 naar €20 is €20 − €13 = €7.",
            "Tel de twee stukken samen: €7 + €0,60 = €7,60.",
            "Je krijgt €7,60 terug. Controle: €12,40 + €7,60 = €20,00."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Toegangsbewijs",
                  "amount": "€12,40"
                }
              ],
              "paid": "€20,00"
            },
            "minnie": {
              "items": [
                {
                  "label": "Toegangsbewijs",
                  "amount": "€12,40"
                }
              ],
              "paid": "€20,00",
              "groups": [
                {
                  "label": "",
                  "nodes": [
                    "€12,40",
                    "€13,00",
                    "€20,00"
                  ],
                  "jumps": [
                    "+ ?",
                    "+ ?"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Toegangsbewijs",
                  "amount": "€12,40"
                }
              ],
              "paid": "€20,00",
              "groups": [
                {
                  "label": "",
                  "nodes": [
                    "€12,40",
                    "€13,00",
                    "€20,00"
                  ],
                  "jumps": [
                    "+ €0,60",
                    "+ ? euro"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Toegangsbewijs",
                  "amount": "€12,40"
                }
              ],
              "paid": "€20,00",
              "groups": [
                {
                  "label": "",
                  "nodes": [
                    "€12,40",
                    "€13,00",
                    "€20,00"
                  ],
                  "jumps": [
                    "+ €0,60",
                    "+ €7"
                  ]
                },
                {
                  "lines": [
                    "€0,60 + €7 = €7,60"
                  ]
                },
                {
                  "lines": [
                    "€12,40 + €7,60 = €20,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon ‘Toegangsbewijs — €12,40’ en ‘Betaald — €20,00’. Geen wisselgeld of berekening tonen.",
            "minnie": "Toon ‘€12,40 → €13,00 → €20,00’, met twee oningevulde sprongen.",
            "moose": "Toon ‘+ €0,60’ bij de eerste pijl en ‘+ ? euro’ bij de tweede. Toon nog niet €7 of €7,60.",
            "explanation": "Toon bij de tweede pijl ‘+ €7’. Voeg ‘€0,60 + €7 = €7,60’ en de controle toe."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-GE-005",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "money_change",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "add_prices_then_calculate_change",
    "reportLabel": "Geld · Twee aankopen en wisselgeld",
    "educationalDomain": "money",
    "educationalCore": {
      "values": {
        "pricesCents": [
          475,
          350
        ],
        "paidCents": 1000
      },
      "question": {
        "answer": 175,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "1,75",
            "1.75"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Je koopt een **boekje voor €4,75** en een **stickervel voor €3,50**. Je betaalt met €10. Hoeveel geld krijg je terug?",
        "answerDisplay": "€1,75",
        "hintMinnie": "Je koopt twee dingen. Tel eerst de twee prijzen op. Vul het totaal daarna aan tot de €10 waarmee je betaalt.",
        "hintMoose": "€4,75 + €3,50 = €8,25. Van €8,25 naar €9 is 75 cent. Reken nu hoeveel er nog bij moet tot €10 en tel dat bij die 75 cent.",
        "explanation": "Eerst zoeken we wat het boekje en het stickervel samen kosten. Pas daarna rekenen we het wisselgeld uit.\n\nTel bij €4,75 eerst de 3 euro van €3,50 op: €4,75 + €3 = €7,75.\n\nNu nog 50 cent. Met 25 cent erbij kom je op €8. Met de andere 25 cent erbij kom je op €8,25. De twee aankopen kosten samen €8,25.\n\nVul €8,25 aan tot €9: dat is 75 cent. Van €9 tot €10 moet er nog €1 bij.\n\nHet wisselgeld is €0,75 + €1 = €1,75. Je krijgt dus €1,75 terug.\n\nControle: de totale prijs van €8,25 en het wisselgeld van €1,75 zijn samen €10,00.",
        "authoredSupport": {
          "explanationSteps": [
            "Eerst zoeken we wat het boekje en het stickervel samen kosten. Pas daarna rekenen we het wisselgeld uit.",
            "Tel bij €4,75 eerst de 3 euro van €3,50 op: €4,75 + €3 = €7,75.",
            "Nu nog 50 cent. Met 25 cent erbij kom je op €8. Met de andere 25 cent erbij kom je op €8,25. De twee aankopen kosten samen €8,25.",
            "Vul €8,25 aan tot €9: dat is 75 cent. Van €9 tot €10 moet er nog €1 bij.",
            "Het wisselgeld is €0,75 + €1 = €1,75. Je krijgt dus €1,75 terug.",
            "Controle: de totale prijs van €8,25 en het wisselgeld van €1,75 zijn samen €10,00."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Boekje",
                  "amount": "€4,75"
                },
                {
                  "label": "Stickervel",
                  "amount": "€3,50"
                }
              ],
              "paid": "€10,00"
            },
            "minnie": {
              "items": [
                {
                  "label": "Boekje",
                  "amount": "€4,75"
                },
                {
                  "label": "Stickervel",
                  "amount": "€3,50"
                }
              ],
              "paid": "€10,00",
              "groups": [
                {
                  "lines": [
                    "1. Samen: €4,75 + €3,50 = ?"
                  ]
                },
                {
                  "lines": [
                    "2. Vul het totaal aan tot €10"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Boekje",
                  "amount": "€4,75"
                },
                {
                  "label": "Stickervel",
                  "amount": "€3,50"
                }
              ],
              "paid": "€10,00",
              "groups": [
                {
                  "label": "Samen",
                  "lines": [
                    "€4,75 + €3,50 = €8,25"
                  ]
                },
                {
                  "label": "Wisselgeld",
                  "nodes": [
                    "€8,25",
                    "€9,00",
                    "€10,00"
                  ],
                  "jumps": [
                    "+ €0,75",
                    "+ ?"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Boekje",
                  "amount": "€4,75"
                },
                {
                  "label": "Stickervel",
                  "amount": "€3,50"
                }
              ],
              "paid": "€10,00",
              "groups": [
                {
                  "label": "Samen",
                  "lines": [
                    "€4,75 + €3 = €7,75"
                  ]
                },
                {
                  "label": "+€0,50",
                  "nodes": [
                    "€7,75",
                    "€8,00",
                    "€8,25"
                  ],
                  "jumps": [
                    "+€0,25",
                    "+€0,25"
                  ]
                },
                {
                  "label": "Wisselgeld",
                  "nodes": [
                    "€8,25",
                    "€9,00",
                    "€10,00"
                  ],
                  "jumps": [
                    "+€0,75",
                    "+€1"
                  ]
                },
                {
                  "lines": [
                    "€1,75"
                  ]
                },
                {
                  "lines": [
                    "€8,25 + €1,75 = €10,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon twee afzonderlijke prijsregels: ‘Boekje — €4,75’ en ‘Stickervel — €3,50’, plus ‘Betaald — €10,00’. Toon géén uitgerekend totaal op een kassabon. Beide prijzen moeten door de leerling worden meegenomen.",
            "minnie": "Toon twee duidelijk gescheiden onderdelen op de stappenkaart: ‘1. Samen: €4,75 + €3,50 = ?’ en ‘2. Vul het totaal aan tot €10’. Nog geen tussenantwoord tonen.",
            "moose": "Vul het prijstotaal in als €8,25. Toon daarna ‘€8,25 → €9,00 → €10,00’ met ‘+ €0,75’ bij de eerste pijl en ‘+ ?’ bij de tweede. Geen €1,75 tonen.",
            "explanation": "Werk eerst het prijstotaal uit: €4,75 + €3 = €7,75, daarna +€0,25 naar €8,00 en +€0,25 naar €8,25. Groepeer die laatste twee sprongen onder de ene stap +€0,50. Behoud vervolgens de aparte wisselgeldkaart met +€0,75 en +€1. Toon als eindantwoord €1,75, niet het prijstotaal €8,25."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-GE-006",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "money_change",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "add_prices_then_calculate_change",
    "reportLabel": "Geld · Twee aankopen en wisselgeld",
    "educationalDomain": "money",
    "educationalCore": {
      "values": {
        "pricesCents": [
          680,
          765
        ],
        "paidCents": 2000
      },
      "question": {
        "answer": 555,
        "answerSpec": {
          "type": "euro",
          "allowedForms": [
            "5,55",
            "5.55"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Je koopt een **bouwpakket voor €6,80** en **verf voor €7,65**. Je betaalt met €20. Hoeveel geld krijg je terug?",
        "answerDisplay": "€5,55",
        "hintMinnie": "Tel eerst de prijs van het bouwpakket en de prijs van de verf bij elkaar op. Vul dat totaal daarna aan tot €20.",
        "hintMoose": "€6,80 + €7,65 = €14,45. Vul €14,45 aan tot €15: dat is 55 cent. Hoeveel euro moet er daarna nog bij tot €20? Tel beide stukken samen.",
        "explanation": "We zoeken eerst de totale prijs van het bouwpakket en de verf.\n\nTel bij €6,80 eerst 7 euro op: €6,80 + €7 = €13,80.\n\nNu nog 65 cent. Tel eerst 20 cent tot €14. Van de 65 cent blijven dan nog 45 cent over. Met die 45 cent erbij is de totale prijs €14,45.\n\nVul €14,45 aan tot €15. Er moet 100 − 45 = 55 cent bij, dus €0,55.\n\nVan €15 naar €20 moet er nog €5 bij. Het wisselgeld is €0,55 + €5 = €5,55.\n\nJe krijgt €5,55 terug. Controle: €14,45 + €5,55 = €20,00.",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken eerst de totale prijs van het bouwpakket en de verf.",
            "Tel bij €6,80 eerst 7 euro op: €6,80 + €7 = €13,80.",
            "Nu nog 65 cent. Tel eerst 20 cent tot €14. Van de 65 cent blijven dan nog 45 cent over. Met die 45 cent erbij is de totale prijs €14,45.",
            "Vul €14,45 aan tot €15. Er moet 100 − 45 = 55 cent bij, dus €0,55.",
            "Van €15 naar €20 moet er nog €5 bij. Het wisselgeld is €0,55 + €5 = €5,55.",
            "Je krijgt €5,55 terug. Controle: €14,45 + €5,55 = €20,00."
          ]
        },
        "visual": {
          "type": "moneyReceipt",
          "stages": {
            "question": {
              "items": [
                {
                  "label": "Bouwpakket",
                  "amount": "€6,80"
                },
                {
                  "label": "Verf",
                  "amount": "€7,65"
                }
              ],
              "paid": "€20,00"
            },
            "minnie": {
              "items": [
                {
                  "label": "Bouwpakket",
                  "amount": "€6,80"
                },
                {
                  "label": "Verf",
                  "amount": "€7,65"
                }
              ],
              "paid": "€20,00",
              "groups": [
                {
                  "lines": [
                    "1. Samen: €6,80 + €7,65 = ?"
                  ]
                },
                {
                  "lines": [
                    "2. Vul het totaal aan tot €20"
                  ]
                }
              ]
            },
            "moose": {
              "items": [
                {
                  "label": "Bouwpakket",
                  "amount": "€6,80"
                },
                {
                  "label": "Verf",
                  "amount": "€7,65"
                }
              ],
              "paid": "€20,00",
              "groups": [
                {
                  "label": "Samen",
                  "lines": [
                    "€6,80 + €7,65 = €14,45"
                  ]
                },
                {
                  "label": "Wisselgeld",
                  "nodes": [
                    "€14,45",
                    "€15,00",
                    "€20,00"
                  ],
                  "jumps": [
                    "+€0,55",
                    "+? euro"
                  ]
                }
              ]
            },
            "explanation": {
              "items": [
                {
                  "label": "Bouwpakket",
                  "amount": "€6,80"
                },
                {
                  "label": "Verf",
                  "amount": "€7,65"
                }
              ],
              "paid": "€20,00",
              "groups": [
                {
                  "label": "Samen",
                  "lines": [
                    "€6,80 + €7 = €13,80"
                  ]
                },
                {
                  "label": "+€0,65",
                  "nodes": [
                    "€13,80",
                    "€14,00",
                    "€14,45"
                  ],
                  "jumps": [
                    "+€0,20",
                    "+€0,45"
                  ]
                },
                {
                  "label": "Wisselgeld",
                  "nodes": [
                    "€14,45",
                    "€15,00",
                    "€20,00"
                  ],
                  "jumps": [
                    "+€0,55",
                    "+€5"
                  ]
                },
                {
                  "lines": [
                    "€5,55"
                  ]
                },
                {
                  "lines": [
                    "€14,45 + €5,55 = €20,00"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon ‘Bouwpakket — €6,80’, ‘Verf — €7,65’ en ‘Betaald — €20,00’. Het prijstotaal wordt niet voorgerekend.",
            "minnie": "Toon ‘1. Samen: €6,80 + €7,65 = ?’ en ‘2. Vul het totaal aan tot €20’. Beide onderdelen blijven als afzonderlijke stappen herkenbaar.",
            "moose": "Toon het berekende prijstotaal €14,45 en de wisselgeldkaart ‘€14,45 → €15,00 → €20,00’. Eerste sprong: +€0,55. Tweede sprong: +? euro. Nog geen €5 of €5,55 tonen.",
            "explanation": "Werk de totale prijs uit met +€7 tot €13,80, +€0,20 tot €14,00 en +€0,45 tot €14,45. Groepeer de laatste twee sprongen onder +€0,65. Toon op de aparte wisselgeldkaart +€0,55 en +€5. De einduitkomst is €5,55; bewaar de controle met de totale prijs."
          }
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) module.exports = records;
  (global.AtlasM6Modules ||= {})['money'] = records;
})(typeof window !== 'undefined' ? window : globalThis);
