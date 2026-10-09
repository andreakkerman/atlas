// Approved authored content, including atlas-m6-quality-approved.md corrections.
(function (global) {
  const records = [
  {
    "id": "RP-M6-TI-001",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.3",
    "difficulty": 1,
    "family": "seconds_to_minutes_exact",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "seconds_to_minutes_exact",
    "reportLabel": "Tijd · Seconden naar minuten",
    "educationalDomain": "time",
    "educationalCore": {
      "values": {
        "operation": "secondsToMinutes",
        "seconds": 240
      },
      "question": {
        "answer": 4,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "4"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Hoeveel minuten zijn **240 seconden**?",
        "answerDisplay": "4 minuten",
        "hintMinnie": "Eén minuut is **60 seconden**. Kijk hoeveel groepjes van 60 in 240 passen.",
        "hintMoose": "Reken **240 : 60**. De uitkomst is het aantal minuten.",
        "explanation": "Eén minuut is **60 seconden**.\n\nWe rekenen:\n\n**240 : 60 = 4**.\n\nDus **240 seconden = 4 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "Eén minuut is **60 seconden**.",
            "We rekenen:",
            "**240 : 60 = 4**.",
            "Dus **240 seconden = 4 minuten**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": [
                {
                  "lines": [
                    "240 seconden = ? minuten"
                  ]
                }
              ]
            },
            "minnie": {
              "groups": [
                {
                  "lines": [
                    "1 minuut = 60 seconden"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "240 : 60 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "240 : 60 = 4",
                    "240 seconden = 4 minuten"
                  ]
                }
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-TI-002",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.3",
    "difficulty": 1,
    "family": "minutes_to_seconds_exact",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "minutes_to_seconds_exact",
    "reportLabel": "Tijd · Minuten naar seconden",
    "educationalDomain": "time",
    "educationalCore": {
      "values": {
        "operation": "minutesToSeconds",
        "minutes": 3
      },
      "question": {
        "answer": 180,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "180"
          ],
          "unit": "seconden"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Hoeveel seconden zijn **3 minuten**?",
        "answerDisplay": "180 seconden",
        "hintMinnie": "Eén minuut is **60 seconden**. Je hebt 3 van zulke minuten.",
        "hintMoose": "Reken **3 × 60**.",
        "explanation": "Eén minuut is **60 seconden**.\n\nDaarom rekenen we:\n\n**3 × 60 = 180**.\n\nDus **3 minuten = 180 seconden**.",
        "authoredSupport": {
          "explanationSteps": [
            "Eén minuut is **60 seconden**.",
            "Daarom rekenen we:",
            "**3 × 60 = 180**.",
            "Dus **3 minuten = 180 seconden**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": [
                {
                  "lines": [
                    "3 minuten = ? seconden"
                  ]
                }
              ]
            },
            "minnie": {
              "groups": [
                {
                  "lines": [
                    "1 minuut = 60 seconden"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "3 × 60 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "3 × 60 = 180",
                    "3 minuten = 180 seconden"
                  ]
                }
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-TI-003",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.3",
    "difficulty": 2,
    "family": "seconds_to_minutes_with_remainder",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "learningObjective": "seconds_to_minutes_with_remainder",
    "reportLabel": "Tijd · Minuten en seconden",
    "educationalDomain": "time",
    "educationalCore": {
      "values": {
        "operation": "secondsToMinutesRemainder",
        "seconds": 430
      },
      "question": {
        "answer": "7 minuten 10 seconden",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "6 minuten 10 seconden",
          "7 minuten 10 seconden",
          "7 minuten 30 seconden",
          "8 minuten 10 seconden"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Hoeveel minuten en seconden zijn **430 seconden**?",
        "answerDisplay": "7 minuten 10 seconden",
        "hintMinnie": "Zoek eerst hoeveel **hele minuten van 60 seconden** in 430 seconden passen.",
        "hintMoose": "7 minuten zijn **7 × 60 = 420 seconden**.\nHoeveel seconden blijven er dan nog over?",
        "explanation": "7 minuten zijn:\n\n**7 × 60 = 420 seconden**.\n\nVan 430 seconden blijven dan:\n\n**430 − 420 = 10 seconden**.\n\nDus:\n\n**430 seconden = 7 minuten en 10 seconden**.",
        "authoredSupport": {
          "explanationSteps": [
            "7 minuten zijn:",
            "**7 × 60 = 420 seconden**.",
            "Van 430 seconden blijven dan:",
            "**430 − 420 = 10 seconden**.",
            "Dus:",
            "**430 seconden = 7 minuten en 10 seconden**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": [
                {
                  "lines": [
                    "430 seconden = ? minuten en seconden"
                  ]
                }
              ]
            },
            "minnie": {
              "groups": [
                {
                  "lines": [
                    "1 minuut = 60 seconden"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "7 × 60 = 420 seconden",
                    "430 − 420 = ? seconden"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "7 × 60 = 420 seconden",
                    "430 − 420 = 10 seconden",
                    "430 seconden = 7 minuten en 10 seconden"
                  ]
                }
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-TI-004",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.3",
    "difficulty": 2,
    "family": "mixed_minutes_seconds_to_seconds",
    "presentation": "story",
    "answerMode": "open",
    "learningObjective": "mixed_minutes_seconds_to_seconds",
    "reportLabel": "Tijd · Minuten en seconden",
    "educationalDomain": "time",
    "educationalCore": {
      "values": {
        "operation": "mixedTimeToSeconds",
        "minutes": 5,
        "seconds": 20
      },
      "question": {
        "answer": 320,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "320"
          ],
          "unit": "seconden"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Hoeveel seconden zijn **5 minuten en 20 seconden**?",
        "answerDisplay": "320 seconden",
        "hintMinnie": "Zet eerst de 5 minuten om naar seconden.",
        "hintMoose": "5 minuten zijn **5 × 60 = 300 seconden**.\nTel daar nog 20 seconden bij.",
        "explanation": "**5 × 60 = 300 seconden**.\n\n**300 + 20 = 320 seconden**.\n\nDus **5 minuten en 20 seconden = 320 seconden**.",
        "authoredSupport": {
          "explanationSteps": [
            "**5 × 60 = 300 seconden**.",
            "**300 + 20 = 320 seconden**.",
            "Dus **5 minuten en 20 seconden = 320 seconden**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": [
                {
                  "lines": [
                    "5 minuten en 20 seconden = ? seconden"
                  ]
                }
              ]
            },
            "minnie": {
              "groups": [
                {
                  "lines": [
                    "5 × 60 = ? seconden"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "5 × 60 = 300 seconden",
                    "300 + 20 = ? seconden"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "5 × 60 = 300 seconden",
                    "300 + 20 = 320 seconden",
                    "5 minuten en 20 seconden = 320 seconden"
                  ]
                }
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-TI-005",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "time_duration",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "learningObjective": "find_end_time_hours_minutes",
    "reportLabel": "Tijd · Eindtijd berekenen",
    "educationalDomain": "time",
    "educationalCore": {
      "values": {
        "start": "13:50",
        "durationMinutes": 85
      },
      "question": {
        "answer": "15:15",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "14:25",
          "15:05",
          "15:15",
          "15:25"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit begint om **13:50** en duurt **1 uur en 25 minuten**. Hoe laat eindigt de activiteit?",
        "answerDisplay": "15:15",
        "hintMinnie": "Tel de duur in handige stukken op. Ga eerst van 13:50 naar het hele uur 14:00. Houd daarna bij hoeveel tijd van de 1 uur en 25 minuten nog over is.",
        "hintMoose": "Van 13:50 tot 14:00 gebruik je 10 minuten. Van de 1 uur en 25 minuten blijven dan 1 uur en 15 minuten over. Tel eerst dat hele uur vanaf 14:00 erbij.",
        "explanation": "De activiteit duurt **1 uur en 25 minuten** en begint om **13:50**.\n\nGa eerst 10 minuten vooruit naar het volgende hele uur: **13:50 → 14:00**.\n\nVan de 1 uur en 25 minuten hebben we nu 10 minuten gebruikt. Er blijft **1 uur en 15 minuten** over.\n\nTel eerst het hele uur erbij: **14:00 → 15:00**.\n\nDaarna nog 15 minuten: **15:00 → 15:15**.\n\n**De activiteit eindigt om 15:15.**",
        "authoredSupport": {
          "explanationSteps": [
            "De activiteit duurt **1 uur en 25 minuten** en begint om **13:50**.",
            "Ga eerst 10 minuten vooruit naar het volgende hele uur: **13:50 → 14:00**.",
            "Van de 1 uur en 25 minuten hebben we nu 10 minuten gebruikt. Er blijft **1 uur en 15 minuten** over.",
            "Tel eerst het hele uur erbij: **14:00 → 15:00**.",
            "Daarna nog 15 minuten: **15:00 → 15:15**.",
            "**De activiteit eindigt om 15:15.**"
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "13:50",
                "?"
              ],
              "jumps": [],
              "notes": [
                "duur: 1 uur 25 minuten"
              ],
              "direction": "forward"
            },
            "minnie": {
              "nodes": [
                "13:50",
                "14:00",
                "?"
              ],
              "jumps": [
                "10 minuten",
                ""
              ],
              "notes": [
                "duur: 1 uur 25 minuten",
                "resterend: 1 uur 15 minuten"
              ],
              "direction": "forward"
            },
            "moose": {
              "nodes": [
                "13:50",
                "14:00",
                "15:00",
                "?"
              ],
              "jumps": [
                "10 minuten",
                "1 uur",
                "15 minuten"
              ],
              "notes": [
                "duur: 1 uur 25 minuten"
              ],
              "direction": "forward"
            },
            "explanation": {
              "nodes": [
                "13:50",
                "14:00",
                "15:00",
                "15:15"
              ],
              "jumps": [
                "10 minuten",
                "1 uur",
                "15 minuten"
              ],
              "notes": [
                "duur: 1 uur 25 minuten"
              ],
              "direction": "forward"
            }
          },
          "instructions": {
            "question": "Tijdlijn startend op 13:50, zonder eindpunt. Toon daarnaast `duur: 1 uur 25 minuten`.",
            "minnie": "Voeg 14:00 als eerste tussenpunt toe en markeer de eerste sprong van 10 minuten. Toon `resterend: 1 uur 15 minuten`.",
            "moose": "Voeg de sprong 14:00 → 15:00 toe als 1 uur. Laat de laatste 15 minuten nog open en toon nog geen eindtijd.",
            "explanation": "Voeg 15:15 toe als eindtijd en label de laatste sprong met 15 minuten."
          }
        }
      }
    ]
  },
  {
    "id": "RP-M6-TI-006",
    "domain": "math",
    "schoolBand": "M6-intended",
    "learningLevel": "M6",
    "contentVersion": "0.2",
    "difficulty": 3,
    "family": "time_duration",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "learningObjective": "find_start_time_hours_minutes",
    "reportLabel": "Tijd · Begintijd berekenen",
    "educationalDomain": "time",
    "educationalCore": {
      "values": {
        "end": "16:20",
        "durationMinutes": 95
      },
      "question": {
        "answer": "14:45",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "14:45",
          "14:55",
          "15:05",
          "15:45"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit eindigt om **16:20** en duurde **1 uur en 35 minuten**. Hoe laat begon de activiteit?",
        "answerDisplay": "14:45",
        "hintMinnie": "Nu reken je terug vanaf 16:20. Ga eerst terug naar het hele uur 16:00 en houd bij hoeveel van de 1 uur en 35 minuten daarna nog terug moet.",
        "hintMoose": "Van 16:20 terug naar 16:00 is 20 minuten. Van de 1 uur en 35 minuten blijft nog 1 uur en 15 minuten over. Ga eerst dat hele uur terug naar 15:00.",
        "explanation": "De activiteit eindigt om **16:20** en duurde **1 uur en 35 minuten**.\n\nReken eerst 20 minuten terug: **16:20 → 16:00**.\n\nVan de totale duur blijft dan **1 uur en 15 minuten** over.\n\nGa één heel uur terug: **16:00 → 15:00**.\n\nGa daarna nog 15 minuten terug: **15:00 → 14:45**.\n\n**De activiteit begon om 14:45.**",
        "authoredSupport": {
          "explanationSteps": [
            "De activiteit eindigt om **16:20** en duurde **1 uur en 35 minuten**.",
            "Reken eerst 20 minuten terug: **16:20 → 16:00**.",
            "Van de totale duur blijft dan **1 uur en 15 minuten** over.",
            "Ga één heel uur terug: **16:00 → 15:00**.",
            "Ga daarna nog 15 minuten terug: **15:00 → 14:45**.",
            "**De activiteit begon om 14:45.**"
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "?",
                "16:20"
              ],
              "jumps": [],
              "notes": [
                "duur: 1 uur 35 minuten"
              ],
              "direction": "backward"
            },
            "minnie": {
              "nodes": [
                "?",
                "16:00",
                "16:20"
              ],
              "jumps": [
                "",
                "20 minuten"
              ],
              "notes": [
                "duur: 1 uur 35 minuten",
                "nog terug: 1 uur 15 minuten"
              ],
              "direction": "backward"
            },
            "moose": {
              "nodes": [
                "?",
                "15:00",
                "16:00",
                "16:20"
              ],
              "jumps": [
                "15 minuten",
                "1 uur",
                "20 minuten"
              ],
              "notes": [
                "duur: 1 uur 35 minuten"
              ],
              "direction": "backward"
            },
            "explanation": {
              "nodes": [
                "14:45",
                "15:00",
                "16:00",
                "16:20"
              ],
              "jumps": [
                "15 minuten",
                "1 uur",
                "20 minuten"
              ],
              "notes": [
                "duur: 1 uur 35 minuten"
              ],
              "direction": "backward"
            }
          },
          "instructions": {
            "question": "Tijdlijn met 16:20 als vast eindpunt en `duur: 1 uur 35 minuten`. Begintijd ontbreekt.",
            "minnie": "Voeg 16:00 toe links van 16:20 en label de teruggaande sprong als 20 minuten. Toon `nog terug: 1 uur 15 minuten`.",
            "moose": "Voeg 15:00 toe met een sprong van 1 uur terug. Laat de laatste 15 minuten als oningevulde teruggaande stap zien.",
            "explanation": "Vul 14:45 als begintijd in en label de laatste sprong als 15 minuten."
          }
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) module.exports = records;
  (global.AtlasM6Modules ||= {})['time'] = records;
})(typeof window !== 'undefined' ? window : globalThis);
