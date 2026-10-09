// Approved authored content, including atlas-m6-quality-approved.md corrections.
(function (global) {
  const records = [
  {
    "id": "RP-M6-OP-001",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 1,
    "family": "addition",
    "presentation": "bare",
    "answerMode": "open",
    "learningObjective": "add_hundreds_tens",
    "reportLabel": "Optellen · Honderdtallen en tientallen",
    "educationalDomain": "additionSubtraction",
    "educationalCore": {
      "values": {
        "operation": "addition",
        "operands": [
          240,
          130
        ]
      },
      "question": {
        "answer": 370,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "370"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "240 + 130 = ?",
        "answerDisplay": "370",
        "hintMinnie": "Je hoeft 130 niet in één keer erbij te tellen. Splits 130 in 100 en 30. Begin met de 100.",
        "hintMoose": "240 + 100 = 340. Er moeten nog 30 bij. Dat zijn drie tientallen. Tel vanaf 340 drie keer 10 verder.",
        "explanation": "130 bestaat uit 100 en 30. We tellen die twee stukken na elkaar bij 240 op.\n\nEerst 100 erbij: 240 + 100 = 340.\n\nDan 30 erbij, in drie sprongen van 10: 340 → 350 → 360 → 370.\n\nWe hebben precies 130 toegevoegd: eerst 100 en daarna 30. Dus 240 + 130 = 370.",
        "authoredSupport": {
          "explanationSteps": [
            "130 bestaat uit 100 en 30. We tellen die twee stukken na elkaar bij 240 op.",
            "Eerst 100 erbij: 240 + 100 = 340.",
            "Dan 30 erbij, in drie sprongen van 10: 340 → 350 → 360 → 370.",
            "We hebben precies 130 toegevoegd: eerst 100 en daarna 30. Dus 240 + 130 = 370."
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
                  "lines": [
                    "130 = 100 + 30"
                  ]
                },
                {
                  "label": "",
                  "nodes": [
                    "+100",
                    "+30"
                  ],
                  "jumps": [
                    ""
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "130 = 100 + 30"
                  ]
                },
                {
                  "lines": [
                    "240 + 100 = 340"
                  ]
                },
                {
                  "label": "+30",
                  "nodes": [
                    "340",
                    "?",
                    "?",
                    "?"
                  ],
                  "jumps": [
                    "+10",
                    "+10",
                    "+10"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "130 = 100 + 30"
                  ]
                },
                {
                  "lines": [
                    "240 + 100 = 340"
                  ]
                },
                {
                  "label": "+30",
                  "nodes": [
                    "340",
                    "350",
                    "360",
                    "370"
                  ],
                  "jumps": [
                    "+10",
                    "+10",
                    "+10"
                  ]
                },
                {
                  "lines": [
                    "240 + 130 = 370"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon alleen de som en het lege getalveld. Geen tussenstappen of antwoordlabels.",
            "minnie": "Toon op een rekenstappenkaart: ‘130 = 100 + 30’. Maak met de volgorde duidelijk dat eerst +100 en daarna +30 volgt.",
            "moose": "Behoud de splitsing. Toon ‘240 + 100 = 340’ en daaronder ‘340 → ? → ? → ?’, met +10 bij elk van de drie pijlen. Toon nog niet 350, 360 of 370.",
            "explanation": "Vul dezelfde drie pijlen in met 350, 360 en 370. Toon onderaan ‘240 + 130 = 370’."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-OP-002",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 1,
    "family": "addition",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "add_three_digit_context",
    "reportLabel": "Optellen · Honderdtallen en tientallen",
    "educationalDomain": "additionSubtraction",
    "educationalCore": {
      "values": {
        "operation": "addition",
        "operands": [
          320,
          250
        ]
      },
      "question": {
        "answer": 570,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "570"
          ],
          "unit": "onderdelen"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "In een voorraad liggen **320 onderdelen**. Er komen **250 onderdelen** bij. Hoeveel onderdelen zijn er nu?",
        "answerDisplay": "570 onderdelen",
        "hintMinnie": "Er komen onderdelen bij, dus je telt op. Je hoeft 250 niet in één keer erbij te doen: splits het in 200 en 50.",
        "hintMoose": "320 + 200 = 520. Van de 250 nieuwe onderdelen zijn er nu 200 meegeteld. Tel de laatste 50 erbij.",
        "explanation": "We zoeken hoeveel onderdelen er samen liggen. Daarom rekenen we 320 + 250.\n\nVerdeel de 250 nieuwe onderdelen in 200 en 50.\n\nTel eerst 200 erbij: 320 + 200 = 520.\n\nTel daarna de laatste 50 erbij: 520 + 50 = 570.\n\n**Er zijn nu 570 onderdelen.**",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken hoeveel onderdelen er samen liggen. Daarom rekenen we 320 + 250.",
            "Verdeel de 250 nieuwe onderdelen in 200 en 50.",
            "Tel eerst 200 erbij: 320 + 200 = 520.",
            "Tel daarna de laatste 50 erbij: 520 + 50 = 570.",
            "**Er zijn nu 570 onderdelen.**"
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
                  "label": "nieuwe onderdelen",
                  "lines": [
                    "250 = 200 + 50"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "250 = 200 + 50"
                  ]
                },
                {
                  "lines": [
                    "320 + 200 = 520"
                  ]
                },
                {
                  "lines": [
                    "520 + 50 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "250 = 200 + 50"
                  ]
                },
                {
                  "lines": [
                    "320 + 200 = 520"
                  ]
                },
                {
                  "lines": [
                    "520 + 50 = 570"
                  ]
                },
                {
                  "lines": [
                    "570 onderdelen samen"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon alleen de volledige vraag en het lege getalveld met de eenheid ‘onderdelen’ ernaast. De levelachtergrond is geen telplaat.",
            "minnie": "Toon ‘250 = 200 + 50’ op de rekenstappenkaart. Benoem de splitsing als ‘nieuwe onderdelen’.",
            "moose": "Toon ‘320 + 200 = 520’. De volgende regel is ‘520 + 50 = ?’. Het eindtotaal blijft verborgen.",
            "explanation": "Vul de laatste regel in als ‘520 + 50 = 570’ en toon ‘570 onderdelen samen’."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-OP-003",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 2,
    "family": "addition",
    "presentation": "bare",
    "answerMode": "open",
    "learningObjective": "add_three_digit_crossing",
    "reportLabel": "Optellen · Over een tiental of honderdtal",
    "educationalDomain": "additionSubtraction",
    "educationalCore": {
      "values": {
        "operation": "addition",
        "operands": [
          368,
          247
        ]
      },
      "question": {
        "answer": 615,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "615"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "368 + 247 = ?",
        "answerDisplay": "615",
        "hintMinnie": "Je kunt 247 opdelen in 200, 40 en 7. Tel die stukken één voor één bij 368 op.",
        "hintMoose": "368 + 200 = 568. Tel 40 erbij in vier sprongen van 10: 578, 588, 598, 608. Tel nu nog de laatste 7 erbij.",
        "explanation": "We splitsen 247 in 200, 40 en 7. Zo tellen we steeds één stuk erbij.\n\nEerst 200 erbij: 368 + 200 = 568.\n\nDan 40 erbij. Dat zijn vier tientallen: 568 → 578 → 588 → 598 → 608.\n\nNu nog 7. Van 608 naar 610 is 2. Van de 7 blijven dan nog 5 over: 610 + 5 = 615.\n\nWe hebben alle stukken van 247 toegevoegd. Dus 368 + 247 = 615.",
        "authoredSupport": {
          "explanationSteps": [
            "We splitsen 247 in 200, 40 en 7. Zo tellen we steeds één stuk erbij.",
            "Eerst 200 erbij: 368 + 200 = 568.",
            "Dan 40 erbij. Dat zijn vier tientallen: 568 → 578 → 588 → 598 → 608.",
            "Nu nog 7. Van 608 naar 610 is 2. Van de 7 blijven dan nog 5 over: 610 + 5 = 615.",
            "We hebben alle stukken van 247 toegevoegd. Dus 368 + 247 = 615."
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
                  "lines": [
                    "247 = 200 + 40 + 7"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "247 = 200 + 40 + 7"
                  ]
                },
                {
                  "lines": [
                    "368 + 200 = 568"
                  ]
                },
                {
                  "label": "+40",
                  "nodes": [
                    "568",
                    "578",
                    "588",
                    "598",
                    "608"
                  ],
                  "jumps": [
                    "+10",
                    "+10",
                    "+10",
                    "+10"
                  ]
                },
                {
                  "lines": [
                    "608 + 7 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "247 = 200 + 40 + 7"
                  ]
                },
                {
                  "lines": [
                    "368 + 200 = 568"
                  ]
                },
                {
                  "label": "+40",
                  "nodes": [
                    "568",
                    "578",
                    "588",
                    "598",
                    "608"
                  ],
                  "jumps": [
                    "+10",
                    "+10",
                    "+10",
                    "+10"
                  ]
                },
                {
                  "label": "+7",
                  "lines": [
                    "608 + 2 = 610",
                    "610 + 5 = 615"
                  ]
                },
                {
                  "lines": [
                    "368 + 247 = 615"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon alleen de som en het lege getalveld.",
            "minnie": "Toon ‘247 = 200 + 40 + 7’. Houd deze drie hoofddelen gedurende alle hulpstappen zichtbaar.",
            "moose": "Toon ‘368 + 200 = 568’. Werk +40 uit als vier opeenvolgende sprongen van +10: 568 → 578 → 588 → 598 → 608. Zet daarna apart ‘608 + 7 = ?’. Groepeer de vier sprongen onder +40; geen eindantwoord tonen.",
            "explanation": "Behoud de +200- en +40-stappen. Toon bij de laatste +7 eerst ‘608 + 2 = 610’ en daarna ‘610 + 5 = 615’. Groepeer die twee sprongen onder +7. Toon de volledige som met antwoord."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-OP-004",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 2,
    "family": "addition",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "add_three_digit_crossing",
    "reportLabel": "Optellen · Over een tiental of honderdtal",
    "educationalDomain": "additionSubtraction",
    "educationalCore": {
      "values": {
        "operation": "addition",
        "operands": [
          475,
          168
        ]
      },
      "question": {
        "answer": 643,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "643"
          ],
          "unit": "onderdelen"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Er zijn **475 onderdelen**. Er komen **168 onderdelen** bij. Hoeveel onderdelen zijn er nu?",
        "answerDisplay": "643 onderdelen",
        "hintMinnie": "Je telt de onderdelen bij elkaar op. Splits de 168 nieuwe onderdelen in 100, 60 en 8.",
        "hintMoose": "475 + 100 = 575. Met 60 erbij kom je op 635. Nu nog 8: tel eerst 5 tot 640 en daarna de overige 3.",
        "explanation": "Er komen 168 onderdelen bij. We delen 168 op in 100, 60 en 8.\n\nTel eerst 100 erbij: 475 + 100 = 575.\n\nTel dan 60 erbij. Dat zijn zes tientallen: 575 → 585 → 595 → 605 → 615 → 625 → 635.\n\nNu de laatste 8. Tel eerst 5 tot 640 en daarna nog 3: 635 + 5 = 640 en 640 + 3 = 643.\n\n**Er zijn nu 643 onderdelen.**",
        "authoredSupport": {
          "explanationSteps": [
            "Er komen 168 onderdelen bij. We delen 168 op in 100, 60 en 8.",
            "Tel eerst 100 erbij: 475 + 100 = 575.",
            "Tel dan 60 erbij. Dat zijn zes tientallen: 575 → 585 → 595 → 605 → 615 → 625 → 635.",
            "Nu de laatste 8. Tel eerst 5 tot 640 en daarna nog 3: 635 + 5 = 640 en 640 + 3 = 643.",
            "**Er zijn nu 643 onderdelen.**"
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
                  "lines": [
                    "168 = 100 + 60 + 8"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "168 = 100 + 60 + 8"
                  ]
                },
                {
                  "lines": [
                    "475 + 100 = 575"
                  ]
                },
                {
                  "lines": [
                    "575 + 60 = 635"
                  ]
                },
                {
                  "label": "+8 = +5 +3",
                  "lines": [
                    "635 + 5 = 640",
                    "640 + 3 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "168 = 100 + 60 + 8"
                  ]
                },
                {
                  "lines": [
                    "475 + 100 = 575"
                  ]
                },
                {
                  "label": "+60",
                  "nodes": [
                    "575",
                    "585",
                    "595",
                    "605",
                    "615",
                    "625",
                    "635"
                  ],
                  "jumps": [
                    "+10",
                    "+10",
                    "+10",
                    "+10",
                    "+10",
                    "+10"
                  ]
                },
                {
                  "label": "+8",
                  "lines": [
                    "635 + 5 = 640",
                    "640 + 3 = 643"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon alleen de volledige vraag en het lege getalveld met ‘onderdelen’ ernaast.",
            "minnie": "Toon de splitsing ‘168 = 100 + 60 + 8’.",
            "moose": "Toon ‘475 + 100 = 575’ en ‘575 + 60 = 635’. Splits de laatste +8 zichtbaar in +5 en +3. Toon ‘635 + 5 = 640’ en ‘640 + 3 = ?’. Geen eindtotaal.",
            "explanation": "Behoud alle hoofdstappen. Toon bij +60 de zes sprongen van +10: 575 → 585 → 595 → 605 → 615 → 625 → 635. Vul bij de laatste +8 de uitkomst 643 in. De kaart moet duidelijk maken welke kleine stappen bij +60 en welke bij +8 horen. Lange stappenreeksen mogen verticaal worden weergegeven zonder een horizontaal scrollvlak."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-OP-005",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "addition",
    "presentation": "bare",
    "answerMode": "open",
    "learningObjective": "add_four_digit_and_three_digit",
    "reportLabel": "Optellen · Duizendtallen en overschrijdingen",
    "educationalDomain": "additionSubtraction",
    "educationalCore": {
      "values": {
        "operation": "addition",
        "operands": [
          1475,
          638
        ]
      },
      "question": {
        "answer": 2113,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "2113",
            "2.113",
            "2 113"
          ]
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "1.475 + 638 = ?",
        "answerDisplay": "2.113",
        "hintMinnie": "Je hoeft 638 niet in één keer toe te voegen. Splits 638 in 600, 30 en 8 en begin met de 600.",
        "hintMoose": "Reken eerst 1.475 + 500 = 1.975 en tel nog 100 erbij: 2.075. Daarmee heb je 600 toegevoegd. Tel nu nog 30 en 8 erbij.",
        "explanation": "We splitsen 638 in 600, 30 en 8.\n\nVoeg 600 toe in twee sprongen: 1.475 + 500 = 1.975 en 1.975 + 100 = 2.075. Die 500 en 100 zijn samen 600.\n\nDan 30 erbij: 2.075 + 30 = 2.105. Je telt daarbij verder voorbij 2.100.\n\nTen slotte 8 erbij: 2.105 + 8 = 2.113.\n\nWe hebben alle 638 toegevoegd. Dus 1.475 + 638 = 2.113.",
        "authoredSupport": {
          "explanationSteps": [
            "We splitsen 638 in 600, 30 en 8.",
            "Voeg 600 toe in twee sprongen: 1.475 + 500 = 1.975 en 1.975 + 100 = 2.075. Die 500 en 100 zijn samen 600.",
            "Dan 30 erbij: 2.075 + 30 = 2.105. Je telt daarbij verder voorbij 2.100.",
            "Ten slotte 8 erbij: 2.105 + 8 = 2.113.",
            "We hebben alle 638 toegevoegd. Dus 1.475 + 638 = 2.113."
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
                  "label": "+600",
                  "lines": [
                    "638 = 600 + 30 + 8"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "638 = 600 + 30 + 8"
                  ]
                },
                {
                  "label": "+600",
                  "lines": [
                    "600 = 500 + 100",
                    "1.475 + 500 = 1.975",
                    "1.975 + 100 = 2.075"
                  ]
                },
                {
                  "lines": [
                    "2.075 + 30 = ?"
                  ]
                },
                {
                  "lines": [
                    "Daarna nog +8"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "638 = 600 + 30 + 8"
                  ]
                },
                {
                  "label": "+600",
                  "lines": [
                    "600 = 500 + 100",
                    "1.475 + 500 = 1.975",
                    "1.975 + 100 = 2.075"
                  ]
                },
                {
                  "lines": [
                    "2.075 + 30 = 2.105"
                  ]
                },
                {
                  "lines": [
                    "2.105 + 8 = 2.113"
                  ]
                },
                {
                  "lines": [
                    "1.475 + 638 = 2.113"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon alleen ‘1.475 + 638 = ?’ en het lege getalveld. De punt in 1.475 is Nederlandse duizendtalscheiding.",
            "minnie": "Toon ‘638 = 600 + 30 + 8’ en benadruk eerst het deel 600.",
            "moose": "Toon binnen de +600-stap ‘600 = 500 + 100’, ‘1.475 + 500 = 1.975’ en ‘1.975 + 100 = 2.075’. Toon vervolgens twee onuitgerekende vervolgstappen: ‘2.075 + 30 = ?’ en ‘Daarna nog +8’.",
            "explanation": "Vul de vervolgstappen in met 2.105 en 2.113. Behoud de groepering van 500 en 100 onder de ene stap +600. Toon de volledige som met antwoord."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-OP-006",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "addition",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "add_four_digit_and_three_digit",
    "reportLabel": "Optellen · Duizendtallen en overschrijdingen",
    "educationalDomain": "additionSubtraction",
    "educationalCore": {
      "values": {
        "operation": "addition",
        "operands": [
          2687,
          756
        ]
      },
      "question": {
        "answer": 3443,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "3443",
            "3.443",
            "3 443"
          ],
          "unit": "onderdelen"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Er zijn al **2.687 onderdelen**. Er komen nog **756 onderdelen** bij. Hoeveel onderdelen zijn er dan in totaal?",
        "answerDisplay": "3.443 onderdelen",
        "hintMinnie": "Je telt de nieuwe onderdelen bij de al aanwezige onderdelen op. Verdeel 756 in 700, 50 en 6.",
        "hintMoose": "2.687 + 700 = 3.387. Met 50 erbij kom je op 3.437. Je moet nog 6 erbij tellen. Ga eerst 3 verder tot 3.440 en tel daarna de laatste 3 erbij.",
        "explanation": "We tellen de 756 nieuwe onderdelen bij 2.687 op. Splits 756 in 700, 50 en 6.\n\nEerst 700 erbij: 2.687 + 700 = 3.387. Zevenhonderd erbij brengt je dus voorbij 3.000.\n\nDaarna 50 erbij: 3.387 + 50 = 3.437.\n\nNu nog 6. Van 3.437 naar 3.440 is 3. Tel daarna de laatste 3 erbij: 3.440 + 3 = 3.443.\n\n**Er zijn in totaal 3.443 onderdelen.**",
        "authoredSupport": {
          "explanationSteps": [
            "We tellen de 756 nieuwe onderdelen bij 2.687 op. Splits 756 in 700, 50 en 6.",
            "Eerst 700 erbij: 2.687 + 700 = 3.387. Zevenhonderd erbij brengt je dus voorbij 3.000.",
            "Daarna 50 erbij: 3.387 + 50 = 3.437.",
            "Nu nog 6. Van 3.437 naar 3.440 is 3. Tel daarna de laatste 3 erbij: 3.440 + 3 = 3.443.",
            "**Er zijn in totaal 3.443 onderdelen.**"
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
                  "lines": [
                    "756 = 700 + 50 + 6"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "756 = 700 + 50 + 6"
                  ]
                },
                {
                  "lines": [
                    "2.687 + 700 = 3.387"
                  ]
                },
                {
                  "lines": [
                    "3.387 + 50 = 3.437"
                  ]
                },
                {
                  "label": "+6",
                  "lines": [
                    "3.437 + 3 = 3.440",
                    "3.440 + 3 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "756 = 700 + 50 + 6"
                  ]
                },
                {
                  "lines": [
                    "2.687 + 700 = 3.387"
                  ]
                },
                {
                  "lines": [
                    "3.387 + 50 = 3.437"
                  ]
                },
                {
                  "label": "+6",
                  "lines": [
                    "3.437 + 3 = 3.440",
                    "3.440 + 3 = 3.443"
                  ]
                },
                {
                  "lines": [
                    "3.443 onderdelen"
                  ]
                }
              ]
            }
          },
          "instructions": {
            "question": "Toon alleen de volledige vraag en het lege getalveld met ‘onderdelen’ ernaast. De punt in 2.687 is Nederlandse duizendtalscheiding.",
            "minnie": "Toon ‘756 = 700 + 50 + 6’. Maak geen letterlijk beeld met duizenden onderdelen.",
            "moose": "Toon ‘2.687 + 700 = 3.387’ en ‘3.387 + 50 = 3.437’. Werk de laatste +6 uit als +3 en +3. Toon ‘3.437 + 3 = 3.440’ en ‘3.440 + 3 = ?’.",
            "explanation": "Vul dezelfde rekenstappenkaart aan met 3.443 en het antwoord ‘3.443 onderdelen’. Behoud de splitsing van 756 en de groepering van de laatste twee sprongen onder +6."
          }
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) module.exports = records;
  (global.AtlasM6Modules ||= {})['addition-subtraction'] = records;
})(typeof window !== 'undefined' ? window : globalThis);
