window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0013"] = {
  "id": "LVL-0013",
  "title": "Nederland — Het Begin van de Reis",
  "subtitle": "De Europese reis begint tussen molens, kaas en grachten.",
  "description": "Sven vertrekt uit Nederland voor een grote reis door Europa.",
  "storageKey": "atlas-europa-nederland-v1",
  "progressKey": "svenadventure-table-progress-v1",
  "exitHotspotId": "travelGate",
  "exitActionLabel": "Naar Engeland",
  "challengeLabel": "Reisproef",
  "challengeCompleteLabel": "Maak de route klaar",
  "choiceHint": "Kies het juiste antwoord.",
  "progressLabelPlural": "reistekens",
  "menu": {
    "illustration": "Levels/LVL-0013/assets/nederland.png",
    "badge": "Nieuw avontuur",
    "detail": "Molens, wereldsteden, fjorden en de Posbank"
  },
  "companion": {
    "name": "Europakaart",
    "portrait": "Levels/LVL-0013/assets/nederland.png"
  },
  "challengeCharacter": {
    "id": "atlas-de-reiziger",
    "name": "Atlas de Reiziger",
    "portrait": "Levels/LVL-0013/assets/atlas-de-reiziger.png",
    "role": "reisgids"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/minnie.png"
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/moose.png"
    }
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0013/assets/nederland.png"
  },
  "challengeArt": "Levels/LVL-0013/assets/atlas-de-reiziger.png",
  "learningChallenges": [
    {
      "id": "windmill",
      "anchorId": "windmill",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "windmill-slot-1",
          "variants": [
            {
              "id": "windmill-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Reken 7 groepjes van 8.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "windmill-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "5 × 6 = ?",
              "answer": 30,
              "choices": [
                24,
                30,
                36,
                42
              ],
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Reken 5 × 5 en tel nog 5 erbij.",
              "explanation": "5 × 6 = 30."
            }
          ]
        },
        {
          "id": "windmill-slot-2",
          "variants": [
            {
              "id": "windmill-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "De molenaar vult 9 zakken met elk 9 scheppen graan. Hoeveel scheppen graan zijn dat samen?",
              "answer": 81,
              "hintMinnie": "Er zijn 9 gelijke groepjes. In elk groepje zitten er 9.",
              "hintMoose": "Reken 9 × 10 en haal er daarna 9 af.",
              "explanation": "9 × 9 = 81."
            },
            {
              "id": "windmill-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De molenaar vult 6 zakken met elk 5 scheppen graan. Hoeveel scheppen graan zijn dat samen?",
              "answer": 30,
              "choices": [
                25,
                30,
                35,
                40
              ],
              "hintMinnie": "Er zijn 6 gelijke groepjes. In elk groepje zitten er 5.",
              "hintMoose": "Tel 6 sprongen van 5.",
              "explanation": "6 × 5 = 30."
            }
          ]
        },
        {
          "id": "windmill-slot-3",
          "variants": [
            {
              "id": "windmill-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 3 zakjes meel voor 9 euro per stuk. Hoeveel euro betaalt hij?",
              "answer": 27,
              "hintMinnie": "Er zijn 3 gelijke bedragen van 9 euro.",
              "hintMoose": "Reken 3 × 10 en haal er daarna 3 af.",
              "explanation": "3 × 9 = 27 euro."
            },
            {
              "id": "windmill-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 6 = ?",
              "answer": 54,
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Reken 5 × 9 en tel nog 9 erbij.",
              "explanation": "9 × 6 = 54."
            }
          ]
        },
        {
          "id": "windmill-slot-4",
          "variants": [
            {
              "id": "windmill-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 10 = ?",
              "answer": 60,
              "hintMinnie": "Denk aan de tafel van 10.",
              "hintMoose": "6 groepjes van 10 eindigen op nul.",
              "explanation": "6 × 10 = 60."
            },
            {
              "id": "windmill-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "5 × 8 = ?",
              "answer": 40,
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Reken 4 × 5 en verdubbel dat.",
              "explanation": "5 × 8 = 40."
            }
          ]
        }
      ]
    },
    {
      "id": "cheeseCart",
      "anchorId": "cheeseCart",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "cheese-cart-slot-1",
          "variants": [
            {
              "id": "cheese-cart-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "6 × 8 = ?",
              "answer": 48,
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Reken 4 × 6 en verdubbel dat.",
              "explanation": "6 × 8 = 48."
            },
            {
              "id": "cheese-cart-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "choices": [
                48,
                56,
                64,
                72
              ],
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Reken 4 × 7 en verdubbel dat.",
              "explanation": "7 × 8 = 56."
            }
          ]
        },
        {
          "id": "cheese-cart-slot-2",
          "variants": [
            {
              "id": "cheese-cart-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "De kaasboer verdeelt 16 kaasjes eerlijk over 4 planken. Hoeveel kaasjes liggen op iedere plank?",
              "answer": 4,
              "hintMinnie": "Verdeel 16 eerlijk over 4 gelijke groepen.",
              "hintMoose": "Zoek in de tafel van 4 welk getal uitkomt op 16.",
              "explanation": "16 : 4 = 4."
            },
            {
              "id": "cheese-cart-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Op 2 planken liggen elk 9 kaasjes. Hoeveel kaasjes zijn dat samen?",
              "answer": 18,
              "choices": [
                9,
                18,
                27,
                36
              ],
              "hintMinnie": "Er zijn 2 gelijke groepjes. In elk groepje zitten er 9.",
              "hintMoose": "Reken 2 × 10 en haal er daarna 2 af.",
              "explanation": "2 × 9 = 18."
            }
          ]
        },
        {
          "id": "cheese-cart-slot-3",
          "variants": [
            {
              "id": "cheese-cart-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 6 = ?",
              "answer": 48,
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Reken 5 × 8 en tel nog 8 erbij.",
              "explanation": "8 × 6 = 48."
            },
            {
              "id": "cheese-cart-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "story_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De kaasboer verdeelt 14 kaasjes eerlijk over 7 planken. Hoeveel kaasjes liggen op iedere plank?",
              "answer": 2,
              "choices": [
                1,
                2,
                3,
                4
              ],
              "hintMinnie": "Verdeel 14 eerlijk over 7 gelijke groepen.",
              "hintMoose": "Zoek in de tafel van 7 welk getal uitkomt op 14.",
              "explanation": "14 : 7 = 2."
            }
          ]
        },
        {
          "id": "cheese-cart-slot-4",
          "variants": [
            {
              "id": "cheese-cart-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "4 × 8 = ?",
              "answer": 32,
              "choices": [
                24,
                32,
                40,
                48
              ],
              "hintMinnie": "Denk aan de tafel van 8.",
              "hintMoose": "Reken 4 × 4 en verdubbel dat.",
              "explanation": "4 × 8 = 32."
            },
            {
              "id": "cheese-cart-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "3 × 6 = ?",
              "answer": 18,
              "choices": [
                12,
                18,
                24,
                30
              ],
              "hintMinnie": "Denk aan de tafel van 6.",
              "hintMoose": "Reken 5 × 3 en tel nog 3 erbij.",
              "explanation": "3 × 6 = 18."
            }
          ]
        }
      ]
    },
    {
      "id": "canalClock",
      "anchorId": "canalClock",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "canal-clock-slot-1",
          "variants": [
            {
              "id": "nl-clock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart over vier",
              "choices": [
                "Kwart voor vier",
                "Kwart over vier",
                "Half vijf",
                "Vier uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 4,
                "minute": 15
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 4.",
              "explanation": "De grote wijzer staat op de 3 en de kleine wijzer net na de 4. Het is kwart over vier."
            },
            {
              "id": "nl-clock-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart voor negen",
              "choices": [
                "Kwart over acht",
                "Half negen",
                "Kwart voor negen",
                "Negen uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 45
              },
              "hintMinnie": "De grote wijzer wijst naar de 9.",
              "hintMoose": "Op de 9 betekent de grote wijzer kwart voor. De kleine wijzer staat bijna op de 9.",
              "explanation": "Het is kwart voor negen."
            }
          ]
        },
        {
          "id": "canal-clock-slot-2",
          "variants": [
            {
              "id": "nl-clock-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart voor tien",
              "choices": [
                "Kwart over negen",
                "Half tien",
                "Kwart voor tien",
                "Tien uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 45
              },
              "hintMinnie": "De grote wijzer staat op de 9.",
              "hintMoose": "Op de 9 betekent de grote wijzer kwart voor. Kijk daarna naar het volgende uur.",
              "explanation": "Het is kwart voor tien."
            },
            {
              "id": "nl-clock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart over één",
              "choices": [
                "Eén uur",
                "Kwart over één",
                "Half twee",
                "Kwart voor twee"
              ],
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 15
              },
              "hintMinnie": "De grote wijzer staat op de 3.",
              "hintMoose": "Op de 3 betekent de grote wijzer kwart over. De kleine wijzer staat net na de 1.",
              "explanation": "Het is kwart over één."
            }
          ]
        },
        {
          "id": "canal-clock-slot-3",
          "variants": [
            {
              "id": "nl-clock-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart over twee",
              "choices": [
                "Twee uur",
                "Kwart over twee",
                "Half drie",
                "Kwart voor drie"
              ],
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 15
              },
              "hintMinnie": "Kijk waar de grote wijzer staat.",
              "hintMoose": "De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 2.",
              "explanation": "Het is kwart over twee."
            },
            {
              "id": "nl-clock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart voor twaalf",
              "choices": [
                "Kwart over elf",
                "Half twaalf",
                "Kwart voor twaalf",
                "Twaalf uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 45
              },
              "hintMinnie": "De grote wijzer wijst naar de 9.",
              "hintMoose": "Kwart voor kijkt naar het uur dat bijna begint.",
              "explanation": "Het is kwart voor twaalf."
            }
          ]
        },
        {
          "id": "canal-clock-slot-4",
          "variants": [
            {
              "id": "nl-clock-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart voor zeven",
              "choices": [
                "Kwart over zes",
                "Half zeven",
                "Kwart voor zeven",
                "Zeven uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 45
              },
              "hintMinnie": "De grote wijzer wijst naar de 9.",
              "hintMoose": "De kleine wijzer staat bijna bij de 7, dus het is kwart voor zeven.",
              "explanation": "Het is kwart voor zeven."
            },
            {
              "id": "nl-clock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_quarter",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Kwart over vijf",
              "choices": [
                "Vijf uur",
                "Kwart over vijf",
                "Half zes",
                "Kwart voor zes"
              ],
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 15
              },
              "hintMinnie": "Zoek de grote wijzer op de 3.",
              "hintMoose": "De kleine wijzer staat net na de 5.",
              "explanation": "Het is kwart over vijf."
            }
          ]
        }
      ]
    }
  ],
  "player": {
    "startNode": "left-start",
    "start": {
      "x": 225,
      "y": 600
    }
  },
  "interactiveObjects": [
    {
      "id": "windmill",
      "type": "rune",
      "center": {
        "x": 540,
        "y": 210
      },
      "radius": 92,
      "approachNode": "windmill-approach",
      "label": "Windmolen"
    },
    {
      "id": "cheeseCart",
      "type": "rune",
      "center": {
        "x": 869,
        "y": 435
      },
      "radius": 88,
      "approachNode": "cheese-approach",
      "label": "Kaaswagen"
    },
    {
      "id": "canalClock",
      "type": "rune",
      "center": {
        "x": 1663,
        "y": 296
      },
      "radius": 44,
      "approachNode": "clock-approach",
      "label": "Grachtenklok"
    },
    {
      "id": "travelGate",
      "type": "gate",
      "center": {
        "x": 2018,
        "y": 468
      },
      "radius": 86,
      "approachNode": "gate-approach",
      "label": "Reispoort"
    }
  ],
  "walkPath": [
    {
      "id": "left-start",
      "x": 225,
      "y": 600
    },
    {
      "id": "windmill-approach",
      "x": 518,
      "y": 597,
      "role": "approach"
    },
    {
      "id": "cheese-approach",
      "x": 840,
      "y": 606,
      "role": "approach"
    },
    {
      "id": "bridge-path",
      "x": 1150,
      "y": 590
    },
    {
      "id": "clock-approach",
      "x": 1638,
      "y": 595,
      "role": "approach"
    },
    {
      "id": "gate-approach",
      "x": 2001,
      "y": 580,
      "role": "approach"
    }
  ],
  "intro": [
    "De reis begint in Nederland.",
    "Langs de gracht wachten drie reistekens.",
    "Achter de poort ligt Engeland."
  ],
  "spiritName": "Europakaart",
  "spiritLines": {
    "welcome": "De grote reis begint.",
    "chooseRune": "Onderzoek de reistekens.",
    "moving": "De straat langs de gracht ligt open.",
    "allRunes": "De reispoort is klaar.",
    "reward": "Engeland wacht."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "We beginnen tussen tulpen en water. Dat voelt meteen als reizen."
    },
    "moving": {
      "speaker": "moose",
      "text": "Droge stenen, duidelijke poort. Prima vertrekpunt."
    },
    "route": {
      "speaker": "minnie",
      "text": "De gracht wijst ons dwars door de stad."
    },
    "allRunes": {
      "speaker": "moose",
      "text": "De reispoort is klaar. Engeland is de volgende halte."
    },
    "reward": {
      "speaker": "minnie",
      "text": "De eerste grens komt eraan!"
    }
  },
  "levelSemantics": {
    "setting": "een Nederlandse gracht met molen, kaaswagen en tulpen",
    "mood": "warm, nieuwsgierig en klaar voor vertrek",
    "companionFocus": {
      "minnie": "draaiende wieken, tulpen en spiegelend grachtenwater",
      "moose": "de stevige brug, de route en de reispoort"
    }
  },
  "companionMoments": [
    {
      "id": "nl-enter",
      "event": "LEVEL_ENTER",
      "speaker": "minnie",
      "text": "Tulpen, water en een molen. De reis begint meteen mooi."
    },
    {
      "id": "nl-windmill-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "windmill",
      "speaker": "minnie",
      "text": "Die molen zwaait met vier grote armen. Volgens mij telt hij mee."
    },
    {
      "id": "nl-cheeseCart-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "cheeseCart",
      "speaker": "minnie",
      "text": "Al die kazen staan in keurige stapels. Daar verstopt zich vast een som."
    },
    {
      "id": "nl-canalClock-attention",
      "event": "HOTSPOT_ATTENTION_FIRST",
      "challengeId": "canalClock",
      "speaker": "minnie",
      "text": "Die klok kijkt over de gracht alsof hij precies weet wanneer we weggaan."
    },
    {
      "id": "nl-windmill-solved",
      "event": "CHALLENGE_SUCCESS",
      "challengeId": "windmill",
      "speaker": "moose",
      "text": "De molen draait al keurig. Nog een zetje wordt vooral veel wind."
    },
    {
      "id": "nl-cheeseCart-solved",
      "event": "CHALLENGE_SUCCESS",
      "challengeId": "cheeseCart",
      "speaker": "moose",
      "text": "De kaas ligt al op volgorde. Zelfs Moose zou niets meer verschuiven."
    },
    {
      "id": "nl-canalClock-solved",
      "event": "CHALLENGE_SUCCESS",
      "challengeId": "canalClock",
      "speaker": "moose",
      "text": "De klok loopt al op tijd. Dat gebeurt niet vaak op een groot avontuur."
    },
    {
      "id": "nl-progress",
      "event": "LEVEL_PROGRESS_MILESTONE",
      "speaker": "minnie",
      "text": "De route krijgt kleur. Engeland komt dichterbij."
    },
    {
      "id": "nl-blocked",
      "event": "EXIT_BLOCKED",
      "speaker": "moose",
      "text": "De reispoort wacht nog op {remaining} reistekens. De poort is geduldig. Ik ook."
    },
    {
      "id": "nl-unlocked",
      "event": "PATH_UNLOCKED",
      "speaker": "moose",
      "text": "De reispoort is klaar. Engeland is de volgende halte."
    },
    {
      "id": "nl-complete",
      "event": "ADVENTURE_COMPLETE",
      "speaker": "minnie",
      "text": "Dag Nederland! Op naar de oude klokkenstad."
    }
  ],
  "areas": [
    {
      "id": "route",
      "name": "Nederland",
      "start": 0,
      "end": 2172,
      "guideLine": "route"
    }
  ],
  "hotspots": [
    {
      "id": "travelGate",
      "objectId": "travelGate",
      "type": "gate",
      "name": "Reispoort",
      "defaultAction": "activate",
      "look": "De poort leidt naar Engeland.",
      "activate": "De reis naar Engeland begint."
    }
  ],
  "runes": [
    {
      "id": "windmill",
      "objectId": "windmill",
      "name": "Windmolen",
      "shortName": "Molen",
      "defaultAction": "activate",
      "intro": "De wieken draaien boven de tulpen.",
      "prompt": "Tel de slagen van de wieken.",
      "solved": "Mooi! De molen draait precies goed.",
      "challengeId": "windmill"
    },
    {
      "id": "cheeseCart",
      "objectId": "cheeseCart",
      "name": "Kaaswagen",
      "shortName": "Kaas",
      "defaultAction": "activate",
      "intro": "Gele kazen liggen netjes opgestapeld.",
      "prompt": "Tel de rijen kaas.",
      "solved": "Goed zo! De kaaswagen is klaar voor vertrek.",
      "challengeId": "cheeseCart"
    },
    {
      "id": "canalClock",
      "objectId": "canalClock",
      "name": "Grachtenklok",
      "shortName": "Klok",
      "defaultAction": "activate",
      "intro": "De groene klok tikt naast het water.",
      "prompt": "Tel de tikken van de klok.",
      "solved": "Sterk! De klok wijst de reisroute aan.",
      "challengeId": "canalClock"
    }
  ],
  "reward": {
    "title": "De reis is begonnen!",
    "badge": "Europareiziger",
    "line": "Sven vond de eerste route en kan door naar Engeland.",
    "art": "Levels/LVL-0013/assets/nederland.png",
    "nextLevelId": "LVL-0014",
    "nextLabel": "Naar Engeland"
  },
  "ambientAnimals": [],
  "ambientFlybys": [
    {
      "id": "NLButterfly01",
      "label": "NLVlinder",
      "frameA": "assets/ambient/flybys/butterfly/butterfly-a.png",
      "frameB": "assets/ambient/flybys/butterfly/butterfly-b.png",
      "sound": "",
      "path": [
        {
          "x": -123,
          "y": 466
        },
        {
          "x": 207,
          "y": 530
        },
        {
          "x": 367,
          "y": 448
        },
        {
          "x": 508,
          "y": 494
        },
        {
          "x": 769,
          "y": 406
        },
        {
          "x": 1021,
          "y": 494
        },
        {
          "x": 1220,
          "y": 380
        },
        {
          "x": 1350,
          "y": 466
        },
        {
          "x": 1577,
          "y": 379
        },
        {
          "x": 1802,
          "y": 452
        },
        {
          "x": 1973,
          "y": 387
        },
        {
          "x": 2250,
          "y": 427
        }
      ],
      "scale": 0.22,
      "speed": 250,
      "flapFrequencyHz": 8,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 25000,
      "syncKey": "NLvlinders",
      "startDelayMs": 0,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8,
      "motionProfile": "organic",
      "wobble": 15,
      "speedVariation": 0.15,
      "flutterFrequency": 2.1
    },
    {
      "id": "NLButterfly01-copy",
      "label": "NLVlinder kopie",
      "frameA": "assets/ambient/flybys/butterfly/butterfly-a.png",
      "frameB": "assets/ambient/flybys/butterfly/butterfly-b.png",
      "sound": "",
      "path": [
        {
          "x": -123,
          "y": 466
        },
        {
          "x": 210,
          "y": 491
        },
        {
          "x": 378,
          "y": 471
        },
        {
          "x": 514,
          "y": 447
        },
        {
          "x": 762,
          "y": 445
        },
        {
          "x": 1016,
          "y": 470
        },
        {
          "x": 1217,
          "y": 413
        },
        {
          "x": 1377,
          "y": 449
        },
        {
          "x": 1585,
          "y": 401
        },
        {
          "x": 1796,
          "y": 421
        },
        {
          "x": 1982,
          "y": 412
        },
        {
          "x": 2249,
          "y": 395
        }
      ],
      "scale": 0.22,
      "speed": 250,
      "flapFrequencyHz": 8,
      "faceFlightDirection": true,
      "mirrorX": false,
      "intervalMinMs": 5000,
      "intervalMaxMs": 25000,
      "syncKey": "NLvlinders",
      "startDelayMs": 0,
      "softness": 0,
      "saturation": 1,
      "soundVolume": 0.65,
      "rotateAlongPath": true,
      "maxRotationDeg": 8,
      "motionProfile": "organic",
      "wobble": 14,
      "speedVariation": 0.14,
      "flutterFrequency": 2.1
    }
  ]
};
