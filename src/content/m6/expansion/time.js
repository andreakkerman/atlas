// Approved Atlas M6 expansion. Source: scripts/content/atlas-m6-central-approved.md
// Generated representation only; edit approved source/transcription, never educational prose here.
(function (global) {
  const records = [
  {
    "id": "M6-TI-001",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "add_minutes_cross_hour_small",
    "reportLabel": "Tijd · Minuten over het uur",
    "family": "add_minutes_cross_hour_small",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "start": "15:58",
        "durationMinutes": 4
      },
      "question": {
        "answer": "16:02",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "15:02",
          "15:54",
          "16:02",
          "16:04"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Op een digitale klok is het **15:58**.\nOver **4 minuten** begint een activiteit.\n\nHoe laat is het dan?",
        "answerDisplay": "16:02",
        "hintMinnie": "Ga eerst van **15:58 naar 16:00**. Hoeveel van de 4 minuten heb je dan gebruikt?",
        "hintMoose": "Van 15:58 naar 16:00 zijn **2 minuten**.\nVan de 4 minuten blijven daarna nog **2 minuten** over.",
        "explanation": "We beginnen om **15:58**.\n\nNa 2 minuten is het **16:00**.\n\nEr blijven nog 2 minuten over.\n\n**16:00 + 2 minuten = 16:02**.\n\nDus na 4 minuten is het **16:02**.",
        "authoredSupport": {
          "explanationSteps": [
            "We beginnen om **15:58**.",
            "Na 2 minuten is het **16:00**.",
            "Er blijven nog 2 minuten over.",
            "**16:00 + 2 minuten = 16:02**.",
            "Dus na 4 minuten is het **16:02**."
          ]
        },
        "visual": {
          "type": "digitalClock",
          "stages": {
            "question": {
              "hour": 15,
              "minute": 58
            },
            "minnie": {
              "hour": 16,
              "minute": 0,
              "notes": [
                "2 minuten verder"
              ]
            },
            "moose": {
              "hour": 16,
              "minute": 0,
              "notes": [
                "2 van 4 minuten gebruikt",
                "nog 2 minuten"
              ]
            },
            "explanation": {
              "hour": 16,
              "minute": 2,
              "notes": [
                "15:58 + 4 minuten = 16:02"
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-002",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "add_minutes_cross_hour",
    "reportLabel": "Tijd · Minuten over het uur",
    "family": "add_minutes_cross_hour",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "start": "08:57",
        "durationMinutes": 8
      },
      "question": {
        "answer": "09:05",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "08:49",
          "09:03",
          "09:05",
          "09:15"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Het is **08:57**.\nOver **8 minuten** vertrekt een bus.\n\nHoe laat vertrekt de bus?",
        "answerDisplay": "09:05",
        "hintMinnie": "Ga eerst van **08:57 naar 09:00**.",
        "hintMoose": "Van 08:57 naar 09:00 zijn **3 minuten**.\nVan de 8 minuten blijven dan nog **5 minuten** over.",
        "explanation": "Van **08:57 naar 09:00** zijn 3 minuten.\n\nEr blijven nog:\n\n**8 − 3 = 5 minuten**.\n\n**09:00 + 5 minuten = 09:05**.\n\nDe bus vertrekt dus om **09:05**.",
        "authoredSupport": {
          "explanationSteps": [
            "Van **08:57 naar 09:00** zijn 3 minuten.",
            "Er blijven nog:",
            "**8 − 3 = 5 minuten**.",
            "**09:00 + 5 minuten = 09:05**.",
            "De bus vertrekt dus om **09:05**."
          ]
        },
        "visual": {
          "type": "digitalClock",
          "stages": {
            "question": {
              "hour": 8,
              "minute": 57
            },
            "minnie": {
              "hour": 9,
              "minute": 0,
              "notes": [
                "3 minuten verder"
              ]
            },
            "moose": {
              "hour": 9,
              "minute": 0,
              "notes": [
                "3 minuten gebruikt",
                "nog 5 minuten"
              ]
            },
            "explanation": {
              "hour": 9,
              "minute": 5,
              "notes": [
                "08:57 + 8 minuten = 09:05"
              ]
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-003",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "elapsed_time_cross_hour_irregular",
    "reportLabel": "Tijd · Tijdsduur over het uur",
    "family": "elapsed_time_cross_hour_irregular",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "start": "14:51",
        "end": "15:32"
      },
      "question": {
        "answer": 41,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "41"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit begint om **14:51** en eindigt om **15:32**.\n\nHoeveel minuten duurt de activiteit?",
        "answerDisplay": "41 minuten",
        "hintMinnie": "Ga eerst van **14:51 naar 15:00**.",
        "hintMoose": "Van 14:51 naar 15:00 zijn **9 minuten**.\nVan 15:00 naar 15:32 zijn **32 minuten**.",
        "explanation": "We splitsen de tijd bij 15:00.\n\n**14:51 → 15:00 = 9 minuten**.\n\n**15:00 → 15:32 = 32 minuten**.\n\nSamen:\n\n**9 + 32 = 41 minuten**.\n\nDe activiteit duurt **41 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "We splitsen de tijd bij 15:00.",
            "**14:51 → 15:00 = 9 minuten**.",
            "**15:00 → 15:32 = 32 minuten**.",
            "Samen:",
            "**9 + 32 = 41 minuten**.",
            "De activiteit duurt **41 minuten**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "14:51",
                "15:32"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "minnie": {
              "nodes": [
                "14:51",
                "15:00",
                "15:32"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "moose": {
              "nodes": [
                "14:51",
                "15:00",
                "15:32"
              ],
              "jumps": [
                "9 min",
                "32 min"
              ],
              "notes": [],
              "direction": "forward"
            },
            "explanation": {
              "nodes": [
                "14:51",
                "15:00",
                "15:32"
              ],
              "jumps": [
                "9 min",
                "32 min"
              ],
              "notes": [
                "9 + 32 = 41 minuten"
              ],
              "direction": "forward"
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-004",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "time",
    "learningObjective": "elapsed_time_cross_hour_irregular",
    "reportLabel": "Tijd · Tijdsduur over het uur",
    "family": "elapsed_time_cross_hour_irregular",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "start": "19:43",
        "end": "20:28"
      },
      "question": {
        "answer": 45,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "45"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een bus vertrekt om **19:43** en komt om **20:28** aan.\n\nHoeveel minuten duurt de rit?",
        "answerDisplay": "45 minuten",
        "hintMinnie": "Splits de rit bij **20:00**.",
        "hintMoose": "Van 19:43 naar 20:00 zijn **17 minuten**.\nVan 20:00 naar 20:28 zijn **28 minuten**.",
        "explanation": "**19:43 → 20:00 = 17 minuten**.\n\n**20:00 → 20:28 = 28 minuten**.\n\n**17 + 28 = 45 minuten**.\n\nDe rit duurt **45 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "**19:43 → 20:00 = 17 minuten**.",
            "**20:00 → 20:28 = 28 minuten**.",
            "**17 + 28 = 45 minuten**.",
            "De rit duurt **45 minuten**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "19:43",
                "20:28"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "minnie": {
              "nodes": [
                "19:43",
                "20:00",
                "20:28"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "moose": {
              "nodes": [
                "19:43",
                "20:00",
                "20:28"
              ],
              "jumps": [
                "17 min",
                "28 min"
              ],
              "notes": [],
              "direction": "forward"
            },
            "explanation": {
              "nodes": [
                "19:43",
                "20:00",
                "20:28"
              ],
              "jumps": [
                "17 min",
                "28 min"
              ],
              "notes": [
                "17 + 28 = 45 minuten"
              ],
              "direction": "forward"
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-005",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "elapsed_time_cross_hour_irregular",
    "reportLabel": "Tijd · Tijdsduur over het uur",
    "family": "elapsed_time_cross_hour_irregular",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "start": "15:29",
        "end": "16:12"
      },
      "question": {
        "answer": 43,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "43"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een training begint om **15:29** en eindigt om **16:12**.\n\nHoeveel minuten duurt de training?",
        "answerDisplay": "43 minuten",
        "hintMinnie": "Reken eerst van **15:29 naar 16:00**.",
        "hintMoose": "Van 15:29 naar 16:00 zijn **31 minuten**.\nDaarna zijn het nog **12 minuten** tot 16:12.",
        "explanation": "**15:29 → 16:00 = 31 minuten**.\n\n**16:00 → 16:12 = 12 minuten**.\n\n**31 + 12 = 43 minuten**.\n\nDe training duurt **43 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "**15:29 → 16:00 = 31 minuten**.",
            "**16:00 → 16:12 = 12 minuten**.",
            "**31 + 12 = 43 minuten**.",
            "De training duurt **43 minuten**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "15:29",
                "16:12"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "minnie": {
              "nodes": [
                "15:29",
                "16:00",
                "16:12"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "moose": {
              "nodes": [
                "15:29",
                "16:00",
                "16:12"
              ],
              "jumps": [
                "31 min",
                "12 min"
              ],
              "notes": [],
              "direction": "forward"
            },
            "explanation": {
              "nodes": [
                "15:29",
                "16:00",
                "16:12"
              ],
              "jumps": [
                "31 min",
                "12 min"
              ],
              "notes": [
                "31 + 12 = 43 minuten"
              ],
              "direction": "forward"
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-006",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "elapsed_time_cross_hour_irregular",
    "reportLabel": "Tijd · Tijdsduur over het uur",
    "family": "elapsed_time_cross_hour_irregular",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "start": "08:50",
        "end": "09:34"
      },
      "question": {
        "answer": 44,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "44"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit begint om **08:50** en eindigt om **09:34**.\n\nHoeveel minuten duurt de activiteit?",
        "answerDisplay": "44 minuten",
        "hintMinnie": "Ga eerst van **08:50 naar 09:00**.",
        "hintMoose": "Dat eerste stuk duurt **10 minuten**.\nVan 09:00 tot 09:34 zijn nog **34 minuten**.",
        "explanation": "**08:50 → 09:00 = 10 minuten**.\n\n**09:00 → 09:34 = 34 minuten**.\n\n**10 + 34 = 44 minuten**.\n\nDe activiteit duurt **44 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "**08:50 → 09:00 = 10 minuten**.",
            "**09:00 → 09:34 = 34 minuten**.",
            "**10 + 34 = 44 minuten**.",
            "De activiteit duurt **44 minuten**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "08:50",
                "09:34"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "minnie": {
              "nodes": [
                "08:50",
                "09:00",
                "09:34"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "moose": {
              "nodes": [
                "08:50",
                "09:00",
                "09:34"
              ],
              "jumps": [
                "10 min",
                "34 min"
              ],
              "notes": [],
              "direction": "forward"
            },
            "explanation": {
              "nodes": [
                "08:50",
                "09:00",
                "09:34"
              ],
              "jumps": [
                "10 min",
                "34 min"
              ],
              "notes": [
                "10 + 34 = 44 minuten"
              ],
              "direction": "forward"
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-007",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "time",
    "learningObjective": "find_end_time_cross_hour_irregular",
    "reportLabel": "Tijd · Eindtijd bepalen",
    "family": "find_end_time_cross_hour_irregular",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "start": "17:36",
        "durationMinutes": 48
      },
      "question": {
        "answer": "18:24",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "18:14",
          "18:22",
          "18:24",
          "18:34"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit begint om **17:36** en duurt **48 minuten**.\n\nHoe laat eindigt de activiteit?",
        "answerDisplay": "18:24",
        "hintMinnie": "Ga eerst van **17:36 naar 18:00**.",
        "hintMoose": "Van 17:36 naar 18:00 zijn **24 minuten**.\nVan de 48 minuten blijven dan nog **24 minuten** over.",
        "explanation": "**17:36 → 18:00 = 24 minuten**.\n\nVan de totale 48 minuten blijven nog:\n\n**48 − 24 = 24 minuten**.\n\n**18:00 + 24 minuten = 18:24**.\n\nDe activiteit eindigt om **18:24**.",
        "authoredSupport": {
          "explanationSteps": [
            "**17:36 → 18:00 = 24 minuten**.",
            "Van de totale 48 minuten blijven nog:",
            "**48 − 24 = 24 minuten**.",
            "**18:00 + 24 minuten = 18:24**.",
            "De activiteit eindigt om **18:24**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "17:36",
                "?"
              ],
              "jumps": [
                "+48 minuten"
              ],
              "notes": [],
              "direction": "forward"
            },
            "minnie": {
              "nodes": [
                "17:36",
                "18:00",
                "?"
              ],
              "jumps": [],
              "notes": [],
              "direction": "forward"
            },
            "moose": {
              "nodes": [
                "17:36",
                "18:00",
                "?"
              ],
              "jumps": [
                "24 min",
                "24 min"
              ],
              "notes": [],
              "direction": "forward"
            },
            "explanation": {
              "nodes": [
                "17:36",
                "18:00",
                "18:24"
              ],
              "jumps": [
                "24 min",
                "24 min"
              ],
              "notes": [],
              "direction": "forward"
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-008",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "time",
    "learningObjective": "find_start_time_cross_hour_irregular",
    "reportLabel": "Tijd · Begintijd bepalen",
    "family": "find_start_time_cross_hour_irregular",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "end": "20:13",
        "durationMinutes": 47
      },
      "question": {
        "answer": "19:26",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "19:16",
          "19:26",
          "19:34",
          "19:36"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit eindigt om **20:13** en duurde **47 minuten**.\n\nHoe laat begon de activiteit?",
        "answerDisplay": "19:26",
        "hintMinnie": "Reken terug vanaf **20:13**.\nGa eerst terug naar **20:00**.",
        "hintMoose": "Van 20:13 terug naar 20:00 zijn **13 minuten**.\nVan de 47 minuten moeten daarna nog **34 minuten** terug.",
        "explanation": "We rekenen terug vanaf 20:13.\n\n**20:13 → 20:00 = 13 minuten terug**.\n\nVan de 47 minuten blijven nog:\n\n**47 − 13 = 34 minuten**.\n\n**20:00 − 34 minuten = 19:26**.\n\nDe activiteit begon om **19:26**.",
        "authoredSupport": {
          "explanationSteps": [
            "We rekenen terug vanaf 20:13.",
            "**20:13 → 20:00 = 13 minuten terug**.",
            "Van de 47 minuten blijven nog:",
            "**47 − 13 = 34 minuten**.",
            "**20:00 − 34 minuten = 19:26**.",
            "De activiteit begon om **19:26**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "nodes": [
                "?",
                "20:13"
              ],
              "jumps": [],
              "notes": [
                "47 minuten"
              ],
              "direction": "backward"
            },
            "minnie": {
              "nodes": [
                "?",
                "20:00",
                "20:13"
              ],
              "jumps": [],
              "notes": [],
              "direction": "backward"
            },
            "moose": {
              "nodes": [
                "?",
                "20:00",
                "20:13"
              ],
              "jumps": [
                "34 min",
                "13 min"
              ],
              "notes": [],
              "direction": "backward"
            },
            "explanation": {
              "nodes": [
                "19:26",
                "20:00",
                "20:13"
              ],
              "jumps": [
                "34 min",
                "13 min"
              ],
              "notes": [],
              "direction": "backward"
            }
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-009",
    "learningLevel": "M6",
    "contentVersion": 3,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "seconds_to_minutes_context",
    "reportLabel": "Tijd · Seconden naar minuten",
    "family": "seconds_to_minutes_context",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "operation": "secondsToMinutes",
        "seconds": 300
      },
      "question": {
        "answer": 5,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "5"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Lijm moet **300 seconden** drogen.\n\nHoeveel minuten is dat?",
        "answerDisplay": "5 minuten",
        "hintMinnie": "Eén minuut duurt 60 seconden.",
        "hintMoose": "Reken hoeveel keer **60 seconden** in 300 seconden passen.",
        "explanation": "**300 : 60 = 5**.\n\nDus **300 seconden = 5 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "**300 : 60 = 5**.",
            "Dus **300 seconden = 5 minuten**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": [
                {
                  "lines": [
                    "300 seconden = ? minuten"
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
                    "300 : 60 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "300 : 60 = 5",
                    "300 seconden = 5 minuten"
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
    "id": "M6-TI-010",
    "learningLevel": "M6",
    "contentVersion": 3,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "minutes_to_seconds_context",
    "reportLabel": "Tijd · Minuten naar seconden",
    "family": "minutes_to_seconds_context",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "operation": "minutesToSeconds",
        "minutes": 4
      },
      "question": {
        "answer": 240,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "240"
          ],
          "unit": "seconden"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een timer staat op **4 minuten**.\n\nHoeveel seconden is dat?",
        "answerDisplay": "240 seconden",
        "hintMinnie": "Eén minuut is 60 seconden.",
        "hintMoose": "Reken **4 × 60**.",
        "explanation": "**4 × 60 = 240**.\n\nDus **4 minuten = 240 seconden**.",
        "authoredSupport": {
          "explanationSteps": [
            "**4 × 60 = 240**.",
            "Dus **4 minuten = 240 seconden**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": [
                {
                  "lines": [
                    "4 minuten = ? seconden"
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
                    "4 × 60 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "4 × 60 = 240",
                    "4 minuten = 240 seconden"
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
    "id": "M6-TI-011",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "time",
    "learningObjective": "elapsed_time_cross_hour",
    "reportLabel": "Tijd · Tijdsduur over het uur",
    "family": "elapsed_time_cross_hour",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**14:31 → 15:20 = 49 minuten**"
      },
      "question": {
        "answer": 49,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "49"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit begint om **14:31** en eindigt om **15:20**.\n\nHoeveel minuten duurt de activiteit?",
        "answerDisplay": "49",
        "hintMinnie": "Ga eerst van 14:31 naar het volgende hele uur: **15:00**.",
        "hintMoose": "Van 14:31 naar 15:00 is **29 minuten**. Daarna is het van 15:00 naar 15:20 nog **20 minuten**.",
        "explanation": "We splitsen de tijd in twee stukken.\n\nVan **14:31 naar 15:00**:\n\n**29 minuten**.\n\nVan **15:00 naar 15:20**:\n\n**20 minuten**.\n\nSamen:\n\n**29 + 20 = 49 minuten**.\n\nDe activiteit duurt **49 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "We splitsen de tijd in twee stukken.",
            "Van **14:31 naar 15:00**:",
            "**29 minuten**.",
            "Van **15:00 naar 15:20**:",
            "**20 minuten**.",
            "Samen:",
            "**29 + 20 = 49 minuten**.",
            "De activiteit duurt **49 minuten**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "direction": "forward",
              "nodes": [
                "14:31",
                "15:20"
              ],
              "jumps": []
            },
            "minnie": {
              "direction": "forward",
              "nodes": [
                "14:31",
                "15:00",
                "15:20"
              ],
              "jumps": []
            },
            "moose": {
              "direction": "forward",
              "nodes": [
                "14:31",
                "15:00",
                "15:20"
              ],
              "jumps": [
                "29 min",
                "20 min"
              ]
            },
            "explanation": {
              "direction": "forward",
              "nodes": [
                "14:31",
                "15:00",
                "15:20"
              ],
              "jumps": [
                "29 min",
                "20 min"
              ],
              "notes": [
                "29 + 20 = 49 minuten"
              ]
            }
          },
          "instructions": {
            "question": "timeLine van 14:31 naar 15:20.",
            "minnie": "voeg 15:00 als tussenpunt toe.",
            "moose": "toon `14:31 → 15:00 = 29 min` en `15:00 → 15:20 = 20 min`; totaal blijft open.",
            "explanation": "toon `29 + 20 = 49 minuten`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-012",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "time",
    "learningObjective": "elapsed_time_cross_hour_nonround",
    "reportLabel": "Tijd · Tijdsduur over het uur",
    "family": "elapsed_time_cross_hour_nonround",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**15:42 → 16:39 = 57 minuten**"
      },
      "question": {
        "answer": 57,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "57"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit begint om **15:42** en eindigt om **16:39**.\n\nHoeveel minuten duurt de activiteit?",
        "answerDisplay": "57",
        "hintMinnie": "Gebruik **16:00** als tussenpunt. Zo krijg je twee overzichtelijke stukken.",
        "hintMoose": "Van 15:42 naar 16:00 is **18 minuten**. Van 16:00 naar 16:39 is **39 minuten**.",
        "explanation": "Van **15:42 naar 16:00** zijn 18 minuten.\n\nVan **16:00 naar 16:39** zijn 39 minuten.\n\nSamen:\n\n**18 + 39 = 57 minuten**.\n\nDe activiteit duurt dus **57 minuten**.",
        "authoredSupport": {
          "explanationSteps": [
            "Van **15:42 naar 16:00** zijn 18 minuten.",
            "Van **16:00 naar 16:39** zijn 39 minuten.",
            "Samen:",
            "**18 + 39 = 57 minuten**.",
            "De activiteit duurt dus **57 minuten**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "direction": "forward",
              "nodes": [
                "15:42",
                "16:39"
              ],
              "jumps": []
            },
            "minnie": {
              "direction": "forward",
              "nodes": [
                "15:42",
                "16:00",
                "16:39"
              ],
              "jumps": []
            },
            "moose": {
              "direction": "forward",
              "nodes": [
                "15:42",
                "16:00",
                "16:39"
              ],
              "jumps": [
                "18 min",
                "39 min"
              ]
            },
            "explanation": {
              "direction": "forward",
              "nodes": [
                "15:42",
                "16:00",
                "16:39"
              ],
              "jumps": [
                "18 min",
                "39 min"
              ],
              "notes": [
                "18 + 39 = 57 minuten"
              ]
            }
          },
          "instructions": {
            "question": "timeLine van 15:42 naar 16:39.",
            "minnie": "voeg 16:00 als tussenpunt toe.",
            "moose": "toon `15:42 → 16:00 = 18 min` en `16:00 → 16:39 = 39 min`; totaal blijft open.",
            "explanation": "toon `18 + 39 = 57 minuten`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-013",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 1,
    "educationalDomain": "time",
    "learningObjective": "mixed_minutes_seconds_to_seconds",
    "reportLabel": "Tijd · Minuten en seconden",
    "family": "mixed_minutes_seconds_to_seconds",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "operation": "mixedTimeToSeconds",
        "minutes": 2,
        "seconds": 30
      },
      "question": {
        "answer": 150,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "150"
          ],
          "unit": "seconden"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een timer staat op **2 minuten en 30 seconden**.\n\nHoeveel seconden is dat samen?",
        "answerDisplay": "150 seconden",
        "hintMinnie": "Zet eerst de **2 minuten** om naar seconden.",
        "hintMoose": "2 minuten zijn **2 × 60 = 120 seconden**.\nTel daar de 30 seconden nog bij.",
        "explanation": "2 minuten zijn:\n\n**2 × 60 = 120 seconden**.\n\nDaar komen nog 30 seconden bij:\n\n**120 + 30 = 150 seconden**.\n\nDus **2 minuten en 30 seconden = 150 seconden**.",
        "authoredSupport": {
          "explanationSteps": [
            "2 minuten zijn:",
            "**2 × 60 = 120 seconden**.",
            "Daar komen nog 30 seconden bij:",
            "**120 + 30 = 150 seconden**.",
            "Dus **2 minuten en 30 seconden = 150 seconden**."
          ]
        },
        "visual": {
          "type": "calculationSteps",
          "stages": {
            "question": {
              "groups": [
                {
                  "lines": [
                    "2 min 30 sec = ? sec"
                  ]
                }
              ]
            },
            "minnie": {
              "groups": [
                {
                  "lines": [
                    "2 min = 2 × 60 sec"
                  ]
                }
              ]
            },
            "moose": {
              "groups": [
                {
                  "lines": [
                    "120 + 30 = ?"
                  ]
                }
              ]
            },
            "explanation": {
              "groups": [
                {
                  "lines": [
                    "120 + 30 = 150",
                    "2 min 30 sec = 150 sec"
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
    "id": "M6-TI-014",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 3,
    "educationalDomain": "time",
    "learningObjective": "find_end_time_hours_minutes",
    "reportLabel": "Tijd · Eindtijd bepalen",
    "family": "find_end_time_hours_minutes",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "authored": "Start 08:45\nDuration 1 hour 35 minutes\nEnd 10:20"
      },
      "question": {
        "answer": "10:20",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "09:20",
          "10:10",
          "10:20",
          "10:30"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit begint om **08:45** en duurt **1 uur en 35 minuten**. Hoe laat is de activiteit afgelopen?",
        "answerDisplay": "10:20",
        "hintMinnie": "Splits de duur in **1 uur** en **35 minuten**. Tel eerst het hele uur bij 08:45 op.",
        "hintMoose": "08:45 + 1 uur = **09:45**. Nu moeten er nog 35 minuten bij. Ga eerst 15 minuten verder naar 10:00.",
        "explanation": "Eerst tellen we 1 uur bij 08:45 op:\n\n**08:45 + 1 uur = 09:45**.\n\nEr moeten nog 35 minuten bij.\n\nVan 09:45 naar 10:00 is 15 minuten.\n\nEr blijven dan nog 20 minuten over.\n\n**10:00 + 20 minuten = 10:20**.\n\nDe activiteit eindigt dus om **10:20**.",
        "authoredSupport": {
          "explanationSteps": [
            "Eerst tellen we 1 uur bij 08:45 op:",
            "**08:45 + 1 uur = 09:45**.",
            "Er moeten nog 35 minuten bij.",
            "Van 09:45 naar 10:00 is 15 minuten.",
            "Er blijven dan nog 20 minuten over.",
            "**10:00 + 20 minuten = 10:20**.",
            "De activiteit eindigt dus om **10:20**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "direction": "forward",
              "nodes": [
                "08:45",
                "?"
              ],
              "jumps": [],
              "notes": [
                "duur 1 uur 35 minuten"
              ]
            },
            "minnie": {
              "direction": "forward",
              "nodes": [
                "08:45",
                "09:45",
                "?"
              ],
              "jumps": [
                "1 uur",
                "?"
              ]
            },
            "moose": {
              "direction": "forward",
              "nodes": [
                "08:45",
                "09:45",
                "10:00",
                "?"
              ],
              "jumps": [
                "1 uur",
                "15 minuten",
                "20 minuten"
              ]
            },
            "explanation": {
              "direction": "forward",
              "nodes": [
                "08:45",
                "09:45",
                "10:00",
                "10:20"
              ],
              "jumps": [
                "1 uur",
                "15 minuten",
                "20 minuten"
              ]
            }
          },
          "instructions": {
            "question": "08:45 → ?\nnote: duur 1 uur 35 minuten",
            "minnie": "08:45 → 09:45 → ?\njumps: 1 uur, remaining unknown",
            "moose": "08:45 → 09:45 → 10:00 → ?\njumps: 1 uur, 15 minuten, 20 minuten",
            "explanation": "08:45 → 09:45 → 10:00 → 10:20\njumps: 1 uur, 15 minuten, 20 minuten"
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-015",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "time",
    "learningObjective": "find_start_time_minutes",
    "reportLabel": "Tijd · Begintijd bepalen",
    "family": "find_start_time_minutes",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "authored": "**Einde 15:10; duur 35 minuten → start 14:35**"
      },
      "question": {
        "answer": "14:35",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "14:25",
          "14:35",
          "14:45",
          "15:35"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit eindigt om **15:10** en duurt **35 minuten**.\n\nHoe laat begon de activiteit?",
        "answerDisplay": "14:35",
        "hintMinnie": "Reken achteruit vanaf 15:10. Ga eerst **10 minuten terug naar 15:00**.",
        "hintMoose": "Van de 35 minuten heb je dan 10 minuten teruggeteld. Er moeten nog **25 minuten** af van 15:00.",
        "explanation": "We rekenen 35 minuten terug vanaf 15:10.\n\nEerst 10 minuten terug:\n\n**15:10 → 15:00**.\n\nEr blijven nog 25 minuten over.\n\n**15:00 − 25 minuten = 14:35**.\n\nDe activiteit begon dus om **14:35**.",
        "authoredSupport": {
          "explanationSteps": [
            "We rekenen 35 minuten terug vanaf 15:10.",
            "Eerst 10 minuten terug:",
            "**15:10 → 15:00**.",
            "Er blijven nog 25 minuten over.",
            "**15:00 − 25 minuten = 14:35**.",
            "De activiteit begon dus om **14:35**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "direction": "backward",
              "nodes": [
                "15:10",
                "?"
              ],
              "jumps": [
                "−35 minuten"
              ],
              "digital": true
            },
            "minnie": {
              "direction": "backward",
              "nodes": [
                "15:10",
                "15:00",
                "?"
              ],
              "jumps": []
            },
            "moose": {
              "direction": "backward",
              "nodes": [
                "15:10",
                "15:00",
                "?"
              ],
              "jumps": [
                "−10 min",
                "−25 min"
              ]
            },
            "explanation": {
              "direction": "backward",
              "nodes": [
                "15:10",
                "15:00",
                "14:35"
              ],
              "jumps": [
                "−10 min",
                "−25 min"
              ],
              "digital": true
            }
          },
          "instructions": {
            "question": "eindklok 15:10, duur 35 minuten, starttijd verborgen.",
            "minnie": "voeg 15:00 als handig terugrekenpunt toe.",
            "moose": "toon `15:10 − 10 min = 15:00`; er moeten nog 25 minuten af.",
            "explanation": "toon `15:00 − 25 min = 14:35`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-016",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 3,
    "educationalDomain": "time",
    "learningObjective": "find_start_time_hours_minutes",
    "reportLabel": "Tijd · Begintijd bepalen",
    "family": "find_start_time_hours_minutes",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "authored": "End 17:10\nDuration 1 hour 45 minutes\nStart 15:25"
      },
      "question": {
        "answer": "15:25",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "15:15",
          "15:25",
          "15:35",
          "16:25"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Een activiteit eindigt om **17:10** en duurt **1 uur en 45 minuten**. Hoe laat begon de activiteit?",
        "answerDisplay": "15:25",
        "hintMinnie": "Reken achteruit vanaf 17:10. Trek eerst **1 uur** af en daarna nog 45 minuten.",
        "hintMoose": "17:10 − 1 uur = **16:10**. Ga daarna eerst 10 minuten terug naar 16:00. Er moeten dan nog 35 minuten af.",
        "explanation": "Eerst trekken we 1 uur van 17:10 af:\n\n**17:10 − 1 uur = 16:10**.\n\nEr moeten nog 45 minuten af.\n\nVan 16:10 terug naar 16:00 is 10 minuten.\n\nEr blijven nog 35 minuten over.\n\n**16:00 − 35 minuten = 15:25**.\n\nDe activiteit begon dus om **15:25**.",
        "authoredSupport": {
          "explanationSteps": [
            "Eerst trekken we 1 uur van 17:10 af:",
            "**17:10 − 1 uur = 16:10**.",
            "Er moeten nog 45 minuten af.",
            "Van 16:10 terug naar 16:00 is 10 minuten.",
            "Er blijven nog 35 minuten over.",
            "**16:00 − 35 minuten = 15:25**.",
            "De activiteit begon dus om **15:25**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "direction": "backward",
              "nodes": [
                "?",
                "17:10"
              ],
              "jumps": [],
              "notes": [
                "duur 1 uur 45 minuten"
              ]
            },
            "minnie": {
              "direction": "backward",
              "nodes": [
                "?",
                "16:10",
                "17:10"
              ],
              "jumps": [
                "?",
                "1 uur"
              ]
            },
            "moose": {
              "direction": "backward",
              "nodes": [
                "?",
                "16:00",
                "16:10",
                "17:10"
              ],
              "jumps": [
                "35 minuten",
                "10 minuten",
                "1 uur"
              ]
            },
            "explanation": {
              "direction": "backward",
              "nodes": [
                "15:25",
                "16:00",
                "16:10",
                "17:10"
              ],
              "jumps": [
                "35 minuten",
                "10 minuten",
                "1 uur"
              ]
            }
          },
          "instructions": {
            "question": "? → 17:10\nnote: duur 1 uur 45 minuten\ndirection backward",
            "minnie": "? → 16:10 → 17:10\nshow 1 hour backward",
            "moose": "? → 16:00 → 16:10 → 17:10\nshow 10 minutes + 1 hour and remaining 35 minutes",
            "explanation": "15:25 → 16:00 → 16:10 → 17:10\njumps: 35 minutes, 10 minutes, 1 hour\ndirection backward"
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-017",
    "learningLevel": "M6",
    "contentVersion": 2,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 2,
    "educationalDomain": "time",
    "learningObjective": "time_until_event",
    "reportLabel": "Tijd · Wachten tot een tijdstip",
    "family": "time_until_event",
    "presentation": "story",
    "answerMode": "open",
    "educationalCore": {
      "values": {
        "authored": "**13:42 → 14:05 = 23 minuten**"
      },
      "question": {
        "answer": 23,
        "answerSpec": {
          "type": "wholeNumber",
          "allowedForms": [
            "23"
          ],
          "unit": "minuten"
        }
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "Het is **13:42**. Een activiteit begint om **14:05**.\n\nHoeveel minuten moet je nog wachten?",
        "answerDisplay": "23",
        "hintMinnie": "Ga eerst van 13:42 naar het hele uur **14:00**.",
        "hintMoose": "Van 13:42 naar 14:00 is **18 minuten**. Daarna is het nog **5 minuten** tot 14:05.",
        "explanation": "Van **13:42 naar 14:00** zijn 18 minuten.\n\nVan **14:00 naar 14:05** zijn 5 minuten.\n\nSamen:\n\n**18 + 5 = 23 minuten**.\n\nJe moet dus **23 minuten** wachten.",
        "authoredSupport": {
          "explanationSteps": [
            "Van **13:42 naar 14:00** zijn 18 minuten.",
            "Van **14:00 naar 14:05** zijn 5 minuten.",
            "Samen:",
            "**18 + 5 = 23 minuten**.",
            "Je moet dus **23 minuten** wachten."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "direction": "forward",
              "nodes": [
                "13:42",
                "14:05"
              ],
              "jumps": []
            },
            "minnie": {
              "direction": "forward",
              "nodes": [
                "13:42",
                "14:00",
                "14:05"
              ],
              "jumps": []
            },
            "moose": {
              "direction": "forward",
              "nodes": [
                "13:42",
                "14:00",
                "14:05"
              ],
              "jumps": [
                "18 min",
                "5 min"
              ]
            },
            "explanation": {
              "direction": "forward",
              "nodes": [
                "13:42",
                "14:00",
                "14:05"
              ],
              "jumps": [
                "18 min",
                "5 min"
              ],
              "notes": [
                "18 + 5 = 23 minuten"
              ]
            }
          },
          "instructions": {
            "question": "timeLine van 13:42 naar 14:05.",
            "minnie": "voeg 14:00 als tussenpunt toe.",
            "moose": "toon `13:42 → 14:00 = 18 min` en `14:00 → 14:05 = 5 min`; totaal blijft open.",
            "explanation": "toon `18 + 5 = 23 minuten`."
          }
        }
      }
    ]
  },
  {
    "id": "M6-TI-018",
    "learningLevel": "M6",
    "contentVersion": 1,
    "domain": "math",
    "schoolBand": "M6-intended",
    "difficulty": 3,
    "educationalDomain": "time",
    "learningObjective": "multistep_schedule_end_time",
    "reportLabel": "Tijd · Meerstaps planning",
    "family": "multistep_schedule_end_time",
    "presentation": "story",
    "answerMode": "multipleChoice",
    "educationalCore": {
      "values": {
        "authored": "**Start 10:35 + 45 min + 20 min pauze + 55 min = 12:35**"
      },
      "question": {
        "answer": "12:35",
        "answerSpec": {
          "type": "choice"
        },
        "choices": [
          "12:15",
          "12:25",
          "12:35",
          "12:45"
        ]
      }
    },
    "surfaces": [
      {
        "id": "original",
        "prompt": "De eerste activiteit begint om **10:35** en duurt **45 minuten**.\n\nDaarna is er **20 minuten pauze**.\n\nDe tweede activiteit duurt **55 minuten**.\n\nHoe laat is alles afgelopen?",
        "answerDisplay": "12:35",
        "hintMinnie": "Reken de onderdelen één voor één. Begin met de eerste activiteit van **45 minuten**.",
        "hintMoose": "10:35 + 45 minuten = **11:20**.\n\nNa 20 minuten pauze is het **11:40**.\n\nNu hoef je alleen de tweede activiteit van 55 minuten nog toe te voegen.",
        "explanation": "De eerste activiteit:\n\n**10:35 + 45 minuten = 11:20**.\n\nDaarna 20 minuten pauze:\n\n**11:20 + 20 minuten = 11:40**.\n\nDe tweede activiteit duurt 55 minuten.\n\nVan 11:40 naar 12:00 is 20 minuten.\n\nEr blijven 35 minuten over:\n\n**12:00 + 35 minuten = 12:35**.\n\nAlles is dus afgelopen om **12:35**.",
        "authoredSupport": {
          "explanationSteps": [
            "De eerste activiteit:",
            "**10:35 + 45 minuten = 11:20**.",
            "Daarna 20 minuten pauze:",
            "**11:20 + 20 minuten = 11:40**.",
            "De tweede activiteit duurt 55 minuten.",
            "Van 11:40 naar 12:00 is 20 minuten.",
            "Er blijven 35 minuten over:",
            "**12:00 + 35 minuten = 12:35**.",
            "Alles is dus afgelopen om **12:35**."
          ]
        },
        "visual": {
          "type": "timeLine",
          "stages": {
            "question": {
              "direction": "forward",
              "nodes": [
                "10:35",
                "?",
                "?",
                "?"
              ],
              "jumps": [
                "45 min",
                "20 min pauze",
                "55 min"
              ]
            },
            "minnie": {
              "direction": "forward",
              "nodes": [
                "10:35",
                "11:20",
                "?",
                "?"
              ],
              "jumps": [
                "45 min",
                "20 min pauze",
                "55 min"
              ]
            },
            "moose": {
              "direction": "forward",
              "nodes": [
                "10:35",
                "11:20",
                "11:40",
                "?"
              ],
              "jumps": [
                "45 min",
                "20 min pauze",
                "55 min"
              ]
            },
            "explanation": {
              "direction": "forward",
              "nodes": [
                "10:35",
                "11:20",
                "11:40",
                "12:35"
              ],
              "jumps": [
                "45 min",
                "20 min pauze",
                "55 min"
              ]
            }
          },
          "instructions": {
            "question": "timeLine met drie nog niet ingevulde segmenten: 45 min, 20 min pauze, 55 min.",
            "minnie": "vul alleen het einde van de eerste activiteit in: `10:35 + 45 min = 11:20`.",
            "moose": "voeg einde pauze toe: `11:20 + 20 min = 11:40`; tweede activiteit blijft open.",
            "explanation": "toon `11:40 + 55 min = 12:35` en complete tijdlijn."
          }
        }
      }
    ]
  }
];
  if (typeof module !== 'undefined' && module.exports) module.exports = records;
  (global.AtlasM6Modules ||= {})['expansion-time'] = records;
})(typeof window !== 'undefined' ? window : globalThis);
