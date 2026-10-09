// Approved authored content, including atlas-m6-quality-approved.md corrections.
(function (global) {
  const records = [
  {
    "id": "RP-M6-BR-001",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 1,
    "family": "fraction_quantity",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "fraction_of_quantity_half",
    "reportLabel": "Breuken · Eén gelijk deel berekenen",
    "educationalDomain": "fractionsRatios",
    "educationalCore": {
      "values": {
        "total": 12,
        "fraction": {
          "numerator": 1,
          "denominator": 2
        },
        "remainder": false
      },
      "question": {
        "answer": 6,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "6"
          ],
          "unit": "onderdelen"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Er zijn **12 onderdelen**. De helft wordt gemarkeerd. Hoeveel onderdelen worden gemarkeerd?",
        "answerDisplay": "6 onderdelen",
        "hintMinnie": "De helft betekent één van twee gelijke delen. Verdeel de 12 onderdelen eerlijk over twee groepjes.",
        "hintMoose": "Verdeel eerst 10 onderdelen: 5 in elk groepje. Verdeel daarna de laatste 2 onderdelen ook eerlijk. Hoeveel onderdelen zitten er dan in elk groepje?",
        "explanation": "We zoeken de helft van 12. Daarom maken we twee even grote groepjes.\n\nVan de eerste 10 onderdelen krijgt elk groepje er 5: 10 : 2 = 5.\n\nVan de laatste 2 onderdelen krijgt elk groepje er nog 1: 2 : 2 = 1.\n\nElk groepje heeft dus 5 + 1 = 6 onderdelen. Dat is één helft van de 12.\n\n**6 onderdelen worden gemarkeerd.**",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken de helft van 12. Daarom maken we twee even grote groepjes.",
            "Van de eerste 10 onderdelen krijgt elk groepje er 5: 10 : 2 = 5.",
            "Van de laatste 2 onderdelen krijgt elk groepje er nog 1: 2 : 2 = 1.",
            "Elk groepje heeft dus 5 + 1 = 6 onderdelen. Dat is één helft van de 12.",
            "**6 onderdelen worden gemarkeerd.**"
          ]
        },
        "visual": {
          "type": "fractionStrip",
          "stages": {
            "question": {
              "totalLabel": "12 onderdelen samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "gemarkeerd"
                }
              ]
            },
            "minnie": {
              "totalLabel": "12 onderdelen samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "gemarkeerd"
                }
              ],
              "focus": [
                0
              ],
              "notes": [
                "twee gelijke delen"
              ]
            },
            "moose": {
              "totalLabel": "12 onderdelen samen",
              "segments": [
                {
                  "selected": true,
                  "symbols": 5
                },
                {
                  "selected": false,
                  "symbols": 5
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "gemarkeerd"
                }
              ],
              "outsideSymbols": 2
            },
            "explanation": {
              "totalLabel": "12 onderdelen samen",
              "segments": [
                {
                  "selected": true,
                  "symbols": 6,
                  "label": "6 onderdelen"
                },
                {
                  "selected": false,
                  "symbols": 6,
                  "label": "6 onderdelen"
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "gemarkeerd"
                }
              ]
            }
          },
          "instructions": {
            "question": "Een breukenstrook met twee even grote vakken; één vak gemarkeerd als \"gemarkeerd\". Onder de volledige strook staat \"12 onderdelen samen\". Geen aantal per vak.",
            "minnie": "Behoud dezelfde strook. Label de vakken als twee gelijke delen; benadruk dat één deel wordt gezocht.",
            "moose": "Toon in beide vakken 5 neutrale symbolen als verdeling van de eerste 10. Toon de laatste 2 symbolen nog buiten de vakken. Geen eindtotaal per vak.",
            "explanation": "Plaats de laatste twee symbolen, één in elk vak. Beide vakken bevatten 6 onderdelen. Markeer één vak als het gezochte deel."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-BR-002",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 1,
    "family": "fraction_quantity",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "fraction_of_quantity_quarter",
    "reportLabel": "Breuken · Eén gelijk deel berekenen",
    "educationalDomain": "fractionsRatios",
    "educationalCore": {
      "values": {
        "total": 20,
        "fraction": {
          "numerator": 1,
          "denominator": 4
        },
        "remainder": false
      },
      "question": {
        "answer": 5,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "5"
          ],
          "unit": "onderdelen"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Er zijn **20 onderdelen**. Een kwart wordt gebruikt. Hoeveel onderdelen worden gebruikt?",
        "answerDisplay": "5 onderdelen",
        "hintMinnie": "Een kwart betekent één van vier gelijke delen. Verdeel de 20 onderdelen in vier even grote groepjes.",
        "hintMoose": "Je zoekt hoeveel onderdelen in één groepje komen. Reken 20 : 4. Welke keersom met 4 komt uit op 20?",
        "explanation": "Een kwart schrijven we als ¼. De 4 vertelt dat we vier gelijke delen maken. De 1 vertelt dat we één deel nemen.\n\nWe verdelen de 20 onderdelen over vier gelijke groepjes: 20 : 4 = 5.\n\nDat klopt, want vier groepjes van 5 zijn samen 20: 4 × 5 = 20.\n\nEén groepje wordt gebruikt. **Er worden 5 onderdelen gebruikt.**",
        "authoredSupport": {
          "explanationSteps": [
            "Een kwart schrijven we als ¼. De 4 vertelt dat we vier gelijke delen maken. De 1 vertelt dat we één deel nemen.",
            "We verdelen de 20 onderdelen over vier gelijke groepjes: 20 : 4 = 5.",
            "Dat klopt, want vier groepjes van 5 zijn samen 20: 4 × 5 = 20.",
            "Eén groepje wordt gebruikt. **Er worden 5 onderdelen gebruikt.**"
          ]
        },
        "visual": {
          "type": "fractionStrip",
          "stages": {
            "question": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "gebruikt"
                }
              ]
            },
            "minnie": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "gebruikt"
                }
              ],
              "focus": [
                0
              ]
            },
            "moose": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "gebruikt"
                }
              ],
              "notes": [
                "20 : 4 = ?"
              ]
            },
            "explanation": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true,
                  "symbols": 5
                },
                {
                  "selected": false,
                  "symbols": 5
                },
                {
                  "selected": false,
                  "symbols": 5
                },
                {
                  "selected": false,
                  "symbols": 5
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 1,
                  "label": "5 onderdelen gebruikt"
                }
              ]
            }
          },
          "instructions": {
            "question": "Een breukenstrook met vier even grote vakken; één vak gemarkeerd als \"gebruikt\". Onder de volledige strook staat \"20 onderdelen samen\". Geen aantal per vak.",
            "minnie": "Behoud dezelfde strook en benadruk de vier gelijke delen en het ene gekozen deel.",
            "moose": "Toon onder de strook \"20 : 4 = ?\". De vier vakken blijven even groot; geen aantallen per vak.",
            "explanation": "Toon in elk vak 5 neutrale symbolen. Markeer één vak als \"5 onderdelen gebruikt\"; alle vier samen blijven zichtbaar."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-BR-003",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 2,
    "family": "fraction_quantity",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "fraction_of_quantity_multiple_parts",
    "reportLabel": "Breuken · Meerdere gelijke delen berekenen",
    "educationalDomain": "fractionsRatios",
    "educationalCore": {
      "values": {
        "total": 20,
        "fraction": {
          "numerator": 3,
          "denominator": 4
        },
        "remainder": false
      },
      "question": {
        "answer": 15,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "15"
          ],
          "unit": "onderdelen"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Er zijn **20 onderdelen**. Driekwart wordt gemarkeerd. Hoeveel onderdelen worden gemarkeerd?",
        "answerDisplay": "15 onderdelen",
        "hintMinnie": "Driekwart betekent drie van vier gelijke delen. Reken eerst uit hoeveel onderdelen in één van die vier delen zitten.",
        "hintMoose": "20 : 4 = 5, dus één kwart is 5 onderdelen. Je hebt drie van die delen nodig. Reken nu 3 × 5.",
        "explanation": "We zoeken ¾ van 20 onderdelen. De 4 vertelt dat we vier gelijke delen maken; de 3 vertelt dat we drie delen nemen.\n\nEerst één deel: 20 : 4 = 5 onderdelen.\n\nDaarna drie delen: 3 × 5 = 15 onderdelen.\n\n**15 onderdelen worden gemarkeerd.**",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken ¾ van 20 onderdelen. De 4 vertelt dat we vier gelijke delen maken; de 3 vertelt dat we drie delen nemen.",
            "Eerst één deel: 20 : 4 = 5 onderdelen.",
            "Daarna drie delen: 3 × 5 = 15 onderdelen.",
            "**15 onderdelen worden gemarkeerd.**"
          ]
        },
        "visual": {
          "type": "fractionStrip",
          "stages": {
            "question": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "gemarkeerd"
                }
              ]
            },
            "minnie": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "gemarkeerd"
                }
              ],
              "focus": [
                0
              ]
            },
            "moose": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true,
                  "label": "5 onderdelen"
                },
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "gemarkeerd"
                }
              ]
            },
            "explanation": {
              "totalLabel": "20 onderdelen samen",
              "segments": [
                {
                  "selected": true,
                  "label": "5"
                },
                {
                  "selected": true,
                  "label": "5"
                },
                {
                  "selected": true,
                  "label": "5"
                },
                {
                  "selected": false,
                  "label": "5"
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "15 onderdelen"
                }
              ]
            }
          },
          "instructions": {
            "question": "Een breukenstrook met vier gelijke vakken. Drie vakken zijn gemarkeerd als \"gemarkeerd\". Onder de hele strook staat \"20 onderdelen samen\". Geen aantallen per vak.",
            "minnie": "Licht één van de vier delen uit als eerste rekenstap; de oorspronkelijke drie gekozen delen blijven herkenbaar.",
            "moose": "Label één deel met \"5 onderdelen\". Markeer de drie gevraagde delen samen; toon nog geen eindtotaal.",
            "explanation": "Label alle delen met 5 en zet bij de drie gekozen delen samen \"15 onderdelen\"."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-BR-004",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 2,
    "family": "fraction_quantity",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "fraction_of_quantity_multiple_parts",
    "reportLabel": "Breuken · Meerdere gelijke delen berekenen",
    "educationalDomain": "fractionsRatios",
    "educationalCore": {
      "values": {
        "total": 18,
        "fraction": {
          "numerator": 2,
          "denominator": 3
        },
        "remainder": false
      },
      "question": {
        "answer": 12,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "12"
          ],
          "unit": "meter"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een **kabel van 18 meter** wordt voor twee derde gebruikt. Hoeveel meter kabel wordt gebruikt?",
        "answerDisplay": "12 meter",
        "hintMinnie": "Twee derde betekent twee van drie gelijke delen. Verdeel de 18 meter eerst in drie stukken die even lang zijn.",
        "hintMoose": "18 : 3 = 6, dus elk stuk is 6 meter. Twee van die stukken worden gebruikt. Reken nu 2 × 6.",
        "explanation": "We zoeken ⅔ van 18 meter. De 3 vertelt dat we drie gelijke delen maken. De 2 vertelt dat we twee delen nemen.\n\nEerst de lengte van één deel: 18 : 3 = 6 meter.\n\nDaarna de lengte van twee delen: 2 × 6 = 12 meter.\n\n**Er wordt 12 meter kabel gebruikt.**",
        "authoredSupport": {
          "explanationSteps": [
            "We zoeken ⅔ van 18 meter. De 3 vertelt dat we drie gelijke delen maken. De 2 vertelt dat we twee delen nemen.",
            "Eerst de lengte van één deel: 18 : 3 = 6 meter.",
            "Daarna de lengte van twee delen: 2 × 6 = 12 meter.",
            "**Er wordt 12 meter kabel gebruikt.**"
          ]
        },
        "visual": {
          "type": "fractionStrip",
          "stages": {
            "question": {
              "totalLabel": "18 meter",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "gebruikt"
                }
              ],
              "texture": "rope"
            },
            "minnie": {
              "totalLabel": "18 meter",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "gebruikt"
                }
              ],
              "texture": "rope",
              "focus": [
                0,
                1,
                2
              ]
            },
            "moose": {
              "totalLabel": "18 meter",
              "segments": [
                {
                  "selected": true,
                  "label": "6 meter"
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "gebruikt"
                }
              ],
              "texture": "rope"
            },
            "explanation": {
              "totalLabel": "18 meter",
              "segments": [
                {
                  "selected": true,
                  "label": "6 meter"
                },
                {
                  "selected": true,
                  "label": "6 meter"
                },
                {
                  "selected": false,
                  "label": "6 meter"
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "12 meter"
                }
              ],
              "texture": "rope"
            }
          },
          "instructions": {
            "question": "Een rechte kabelstrook verdeeld in drie gelijke segmenten. Twee segmenten zijn gemarkeerd als \"gebruikt\". Een haak onder de hele strook geeft \"18 meter\" aan. Geen lengtes per deel.",
            "minnie": "Behoud dezelfde segmenten en benadruk dat alle drie even lang zijn.",
            "moose": "Label één segment met \"6 meter\" en markeer de twee gebruikte segmenten samen. Geen totale gebruikte lengte tonen.",
            "explanation": "Label ieder segment met \"6 meter\" en de twee gebruikte segmenten samen met \"12 meter\"."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-BR-005",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "fraction_quantity",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "fraction_remainder_from_quantity",
    "reportLabel": "Breuken · Resterende hoeveelheid berekenen",
    "educationalDomain": "fractionsRatios",
    "educationalCore": {
      "values": {
        "total": 35,
        "fraction": {
          "numerator": 2,
          "denominator": 5
        },
        "remainder": true
      },
      "question": {
        "answer": 21,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "21"
          ],
          "unit": "kratten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Er zijn **35 kratten**. Twee vijfde is al verplaatst. Hoeveel kratten moeten nog worden verplaatst?",
        "answerDisplay": "21 kratten",
        "hintMinnie": "Je zoekt de kratten die nog moeten worden verplaatst. Reken eerst uit hoeveel er al verplaatst zijn: twee van vijf gelijke delen van 35.",
        "hintMoose": "35 : 5 = 7 kratten per deel. Twee delen zijn 2 × 7 = 14 kratten die al zijn verplaatst. Trek die 14 af van de 35 kratten.",
        "explanation": "Van de 35 kratten is ⅖ al verplaatst. We zoeken de kratten die nog niet zijn verplaatst.\n\nEerst één vijfde: 35 : 5 = 7 kratten.\n\nTwee vijfde is 2 × 7 = 14 kratten. Die zijn al verplaatst.\n\nTrek de verplaatste kratten van het totaal af: 35 − 14 = 21.\n\n**Er moeten nog 21 kratten worden verplaatst.**",
        "authoredSupport": {
          "explanationSteps": [
            "Van de 35 kratten is ⅖ al verplaatst. We zoeken de kratten die nog niet zijn verplaatst.",
            "Eerst één vijfde: 35 : 5 = 7 kratten.",
            "Twee vijfde is 2 × 7 = 14 kratten. Die zijn al verplaatst.",
            "Trek de verplaatste kratten van het totaal af: 35 − 14 = 21.",
            "**Er moeten nog 21 kratten worden verplaatst.**"
          ]
        },
        "visual": {
          "type": "fractionStrip",
          "stages": {
            "question": {
              "totalLabel": "35 kratten samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "al verplaatst"
                },
                {
                  "from": 2,
                  "count": 3,
                  "label": "nog te verplaatsen"
                }
              ]
            },
            "minnie": {
              "totalLabel": "35 kratten samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "al verplaatst"
                },
                {
                  "from": 2,
                  "count": 3,
                  "label": "nog te verplaatsen"
                }
              ],
              "focus": [
                0,
                1
              ]
            },
            "moose": {
              "totalLabel": "35 kratten samen",
              "segments": [
                {
                  "selected": true,
                  "label": "7"
                },
                {
                  "selected": true,
                  "label": "7"
                },
                {
                  "selected": false,
                  "label": "7"
                },
                {
                  "selected": false,
                  "label": "7"
                },
                {
                  "selected": false,
                  "label": "7"
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "14"
                },
                {
                  "from": 2,
                  "count": 3,
                  "label": "nog te verplaatsen"
                }
              ]
            },
            "explanation": {
              "totalLabel": "35 kratten samen",
              "segments": [
                {
                  "selected": true,
                  "label": "7"
                },
                {
                  "selected": true,
                  "label": "7"
                },
                {
                  "selected": false,
                  "label": "7"
                },
                {
                  "selected": false,
                  "label": "7"
                },
                {
                  "selected": false,
                  "label": "7"
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 2,
                  "label": "14"
                },
                {
                  "from": 2,
                  "count": 3,
                  "label": "21 kratten nog te verplaatsen"
                }
              ]
            }
          },
          "instructions": {
            "question": "Een breukenstrook met vijf gelijke vakken en \"35 kratten samen\" onder de hele strook. Twee vakken dragen het label \"al verplaatst\"; drie vakken samen het label \"nog te verplaatsen\". Geen aantallen per vak.",
            "minnie": "Benadruk eerst de twee delen \"al verplaatst\" en behoud het onderscheid met de gevraagde resterende delen.",
            "moose": "Label elk deel met 7 en de twee verplaatste delen samen met 14. Geen totaal voor de resterende delen tonen.",
            "explanation": "Behoud de verplaatste 14 en label de resterende drie delen samen met \"21 kratten nog te verplaatsen\"."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-BR-006",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "fraction_quantity",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "fraction_remainder_from_quantity",
    "reportLabel": "Breuken · Resterende hoeveelheid berekenen",
    "educationalDomain": "fractionsRatios",
    "educationalCore": {
      "values": {
        "total": 40,
        "fraction": {
          "numerator": 3,
          "denominator": 8
        },
        "remainder": true
      },
      "question": {
        "answer": 25,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "25"
          ],
          "unit": "houtblokken"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Er liggen **40 houtblokken** klaar. Drie achtste wordt gebruikt. Hoeveel houtblokken blijven over?",
        "answerDisplay": "25 houtblokken",
        "hintMinnie": "Drie achtste betekent drie van acht gelijke delen. Zoek eerst hoeveel houtblokken worden gebruikt. Daarna kun je bepalen hoeveel er overblijven.",
        "hintMoose": "40 : 8 = 5 houtblokken per deel. Er worden 3 × 5 = 15 houtblokken gebruikt. Trek die 15 af van de 40 houtblokken.",
        "explanation": "Er wordt ⅜ van de 40 houtblokken gebruikt. We zoeken hoeveel houtblokken daarna overblijven.\n\nEerst één achtste: 40 : 8 = 5 houtblokken.\n\nDrie achtste is 3 × 5 = 15 houtblokken. Die worden gebruikt.\n\nTrek het gebruikte aantal van het totaal af: 40 − 15 = 25.\n\n**Er blijven 25 houtblokken over.**",
        "authoredSupport": {
          "explanationSteps": [
            "Er wordt ⅜ van de 40 houtblokken gebruikt. We zoeken hoeveel houtblokken daarna overblijven.",
            "Eerst één achtste: 40 : 8 = 5 houtblokken.",
            "Drie achtste is 3 × 5 = 15 houtblokken. Die worden gebruikt.",
            "Trek het gebruikte aantal van het totaal af: 40 − 15 = 25.",
            "**Er blijven 25 houtblokken over.**"
          ]
        },
        "visual": {
          "type": "fractionStrip",
          "stages": {
            "question": {
              "totalLabel": "40 houtblokken samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "gebruikt"
                },
                {
                  "from": 3,
                  "count": 5,
                  "label": "over"
                }
              ]
            },
            "minnie": {
              "totalLabel": "40 houtblokken samen",
              "segments": [
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "gebruikt"
                },
                {
                  "from": 3,
                  "count": 5,
                  "label": "over"
                }
              ],
              "focus": [
                0,
                1,
                2
              ]
            },
            "moose": {
              "totalLabel": "40 houtblokken samen",
              "segments": [
                {
                  "selected": true,
                  "label": "5"
                },
                {
                  "selected": true
                },
                {
                  "selected": true
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                },
                {
                  "selected": false
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "15"
                },
                {
                  "from": 3,
                  "count": 5,
                  "label": "over"
                }
              ]
            },
            "explanation": {
              "totalLabel": "40 houtblokken samen",
              "segments": [
                {
                  "selected": true,
                  "label": "5"
                },
                {
                  "selected": true,
                  "label": "5"
                },
                {
                  "selected": true,
                  "label": "5"
                },
                {
                  "selected": false,
                  "label": "5"
                },
                {
                  "selected": false,
                  "label": "5"
                },
                {
                  "selected": false,
                  "label": "5"
                },
                {
                  "selected": false,
                  "label": "5"
                },
                {
                  "selected": false,
                  "label": "5"
                }
              ],
              "groups": [
                {
                  "from": 0,
                  "count": 3,
                  "label": "15"
                },
                {
                  "from": 3,
                  "count": 5,
                  "label": "25 houtblokken over"
                }
              ]
            }
          },
          "instructions": {
            "question": "Een breukenstrook met acht gelijke vakken en \"40 houtblokken samen\" onder de hele strook. Drie vakken gemarkeerd als \"gebruikt\"; de andere vijf als \"over\". Geen aantallen per vak.",
            "minnie": "Benadruk het onderscheid tussen de drie gebruikte delen en de gevraagde resterende delen.",
            "moose": "Label één deel met 5 en de drie gebruikte delen samen met 15. Geen totaal voor de resterende delen tonen.",
            "explanation": "Label alle delen met 5 en de vijf resterende delen samen met \"25 houtblokken over\"."
          }
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) module.exports = records;
  (global.AtlasM6Modules ||= {})['fractions-ratios'] = records;
})(typeof window !== 'undefined' ? window : globalThis);
