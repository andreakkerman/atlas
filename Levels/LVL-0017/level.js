window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0017/assets/oostenrijk.png";
  const challengerAsset = "Levels/LVL-0017/assets/atlas-de-reiziger.png";
  const learningChallenges = [
    {
      "id": "clockHouse",
      "anchorId": "clockHouse",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "clock-house-slot-1",
          "variants": [
            {
              "id": "at-clock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Tien over acht",
              "choices": [
                "Vijf over acht",
                "Tien over acht",
                "Tien voor acht",
                "Kwart over acht"
              ],
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 10
              },
              "hintMinnie": "Kijk naar de grote wijzer.",
              "hintMoose": "De grote wijzer op de 2 betekent tien minuten over acht.",
              "explanation": "Het is tien over acht."
            },
            {
              "id": "at-clock-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Twintig over vier",
              "choices": [
                "Kwart over vier",
                "Twintig over vier",
                "Twintig voor vier",
                "Half vijf"
              ],
              "visual": {
                "type": "clock",
                "hour": 4,
                "minute": 20
              },
              "hintMinnie": "Elk cijfer telt voor vijf minuten.",
              "hintMoose": "Vier keer vijf minuten is twintig over.",
              "explanation": "Het is twintig over vier."
            }
          ]
        },
        {
          "id": "clock-house-slot-2",
          "variants": [
            {
              "id": "at-clock-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf voor half zeven",
              "choices": [
                "Vijf over zes",
                "Vijf voor half zeven",
                "Half zeven",
                "Vijf over half zeven"
              ],
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 25
              },
              "hintMinnie": "De grote wijzer staat op de 5.",
              "hintMoose": "Dat is vijf minuten voor het halve uur.",
              "explanation": "Het is vijf voor half zeven."
            },
            {
              "id": "at-clock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf over half elf",
              "choices": [
                "Half elf",
                "Vijf voor half elf",
                "Vijf over half elf",
                "Vijf voor elf"
              ],
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 35
              },
              "hintMinnie": "De grote wijzer staat net voorbij de 6.",
              "hintMoose": "Op de 7 is het vijf minuten na half elf.",
              "explanation": "Het is vijf over half elf."
            }
          ]
        },
        {
          "id": "clock-house-slot-3",
          "variants": [
            {
              "id": "at-clock-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Twintig voor drie",
              "choices": [
                "Twintig over twee",
                "Half drie",
                "Twintig voor drie",
                "Tien voor drie"
              ],
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 40
              },
              "hintMinnie": "De grote wijzer staat op de 8.",
              "hintMoose": "Vanaf de 8 zijn het nog twintig minuten tot drie.",
              "explanation": "Het is twintig voor drie."
            },
            {
              "id": "at-clock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Tien voor acht",
              "choices": [
                "Tien over zeven",
                "Vijf voor acht",
                "Tien voor acht",
                "Acht uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 50
              },
              "hintMinnie": "De grote wijzer staat op de 10.",
              "hintMoose": "Vanaf de 10 zijn het nog tien minuten tot acht.",
              "explanation": "Het is tien voor acht."
            }
          ]
        },
        {
          "id": "clock-house-slot-4",
          "variants": [
            {
              "id": "at-clock-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf over elf",
              "choices": [
                "Vijf voor elf",
                "Vijf over elf",
                "Tien over elf",
                "Elf uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 5
              },
              "hintMinnie": "De grote wijzer staat op de 1.",
              "hintMoose": "Op de 1 zijn vijf minuten voorbij.",
              "explanation": "Het is vijf over elf."
            },
            {
              "id": "at-clock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf voor twee",
              "choices": [
                "Vijf over één",
                "Tien voor twee",
                "Vijf voor twee",
                "Twee uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 55
              },
              "hintMinnie": "De grote wijzer staat op de 11.",
              "hintMoose": "Vanaf de 11 duurt het nog vijf minuten tot twee.",
              "explanation": "Het is vijf voor twee."
            }
          ]
        }
      ]
    },
    {
      "id": "alpineFountain",
      "anchorId": "alpineFountain",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "alpine-fountain-slot-1",
          "variants": [
            {
              "id": "alpine-fountain-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "8 watergoten hebben elk 7 waterstralen. Hoeveel waterstralen zijn dat samen?",
              "answer": 56,
              "hintMinnie": "Zoek 8 gelijke groepjes van 7.",
              "hintMoose": "Reken 8 × 7 stap voor stap.",
              "explanation": "8 × 7 = 56."
            },
            {
              "id": "alpine-fountain-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 9 rijen met telkens 6 waterstralen. Hoeveel waterstralen zijn dat?",
              "answer": 54,
              "choices": [
                50,
                54,
                58,
                62
              ],
              "hintMinnie": "Denk aan 9 groepjes van 6.",
              "hintMoose": "Vermenigvuldig 9 met 6.",
              "explanation": "9 × 6 = 54."
            }
          ]
        },
        {
          "id": "alpine-fountain-slot-2",
          "variants": [
            {
              "id": "alpine-fountain-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "72 waterstralen worden eerlijk verdeeld over 8 watergoten. Hoeveel krijgt elke groep?",
              "answer": 9,
              "choices": [
                7,
                9,
                11,
                13
              ],
              "hintMinnie": "Verdeel 72 in 8 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 8 precies 72 is.",
              "explanation": "72 : 8 = 9."
            },
            {
              "id": "alpine-fountain-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 63 waterstralen. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 63 gedeeld door 7.",
              "explanation": "63 : 7 = 9."
            }
          ]
        },
        {
          "id": "alpine-fountain-slot-3",
          "variants": [
            {
              "id": "alpine-fountain-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 5 drinkbekers voor €4 per stuk. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Elk stuk kost €4.",
              "hintMoose": "Reken 5 × 4.",
              "explanation": "5 × €4 = €20."
            },
            {
              "id": "alpine-fountain-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Alpenfontein is 64 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 8,
              "choices": [
                5,
                8,
                11,
                14
              ],
              "hintMinnie": "Verdeel de hele route in 8 gelijke delen.",
              "hintMoose": "Reken 64 : 8.",
              "explanation": "64 : 8 = 8 meter."
            }
          ]
        },
        {
          "id": "alpine-fountain-slot-4",
          "variants": [
            {
              "id": "alpine-fountain-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 7 = ?",
              "answer": 63,
              "hintMinnie": "Splits 9 in handige delen.",
              "hintMoose": "Reken 9 groepjes van 7.",
              "explanation": "9 × 7 = 63."
            },
            {
              "id": "alpine-fountain-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "54 : 6 = ?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Zoek welk getal keer 6 gelijk is aan 54.",
              "hintMoose": "Verdeel 54 in groepjes van 6.",
              "explanation": "54 : 6 = 9."
            }
          ]
        }
      ]
    },
    {
      "id": "cableCar",
      "anchorId": "cableCar",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "cable-car-slot-1",
          "variants": [
            {
              "id": "cable-car-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "6 cabines hebben elk 8 reizigers. Hoeveel reizigers zijn dat samen?",
              "answer": 48,
              "hintMinnie": "Zoek 6 gelijke groepjes van 8.",
              "hintMoose": "Reken 6 × 8 stap voor stap.",
              "explanation": "6 × 8 = 48."
            },
            {
              "id": "cable-car-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 7 rijen met telkens 7 reizigers. Hoeveel reizigers zijn dat?",
              "answer": 49,
              "choices": [
                45,
                49,
                53,
                57
              ],
              "hintMinnie": "Denk aan 7 groepjes van 7.",
              "hintMoose": "Vermenigvuldig 7 met 7.",
              "explanation": "7 × 7 = 49."
            }
          ]
        },
        {
          "id": "cable-car-slot-2",
          "variants": [
            {
              "id": "cable-car-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "56 reizigers worden eerlijk verdeeld over 7 cabines. Hoeveel krijgt elke groep?",
              "answer": 8,
              "choices": [
                6,
                8,
                10,
                12
              ],
              "hintMinnie": "Verdeel 56 in 7 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 7 precies 56 is.",
              "explanation": "56 : 7 = 8."
            },
            {
              "id": "cable-car-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 64 reizigers. In elke groep passen er 8. Hoeveel groepen zijn nodig?",
              "answer": 8,
              "hintMinnie": "Maak groepjes van 8.",
              "hintMoose": "Reken 64 gedeeld door 8.",
              "explanation": "64 : 8 = 8."
            }
          ]
        },
        {
          "id": "cable-car-slot-3",
          "variants": [
            {
              "id": "cable-car-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 6 ritkaartjes voor €5 per stuk. Hoeveel euro betaalt hij?",
              "answer": 30,
              "hintMinnie": "Elk stuk kost €5.",
              "hintMoose": "Reken 6 × 5.",
              "explanation": "6 × €5 = €30."
            },
            {
              "id": "cable-car-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Rode kabelbaan is 72 meter en heeft 9 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 8,
              "choices": [
                5,
                8,
                11,
                14
              ],
              "hintMinnie": "Verdeel de hele route in 9 gelijke delen.",
              "hintMoose": "Reken 72 : 9.",
              "explanation": "72 : 9 = 8 meter."
            }
          ]
        },
        {
          "id": "cable-car-slot-4",
          "variants": [
            {
              "id": "cable-car-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 9 = ?",
              "answer": 72,
              "hintMinnie": "Splits 8 in handige delen.",
              "hintMoose": "Reken 8 groepjes van 9.",
              "explanation": "8 × 9 = 72."
            },
            {
              "id": "cable-car-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "63 : 7 = ?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Zoek welk getal keer 7 gelijk is aan 63.",
              "hintMoose": "Verdeel 63 in groepjes van 7.",
              "explanation": "63 : 7 = 9."
            }
          ]
        }
      ]
    }
  ];
  const challenges = [
    {
      id: "clockHouse", name: "Alpenklokhuis", shortName: "Klokhuis", center: { x: 620, y: 245 }, radius: 94,
      approachNode: "clock-approach", intro: "De grote klok hangt onder een houten dak.",
      prompt: "Tel de slagen van de Alpenklok.", solved: "Mooi! De klok houdt de bergtijd bij.",
      attention: "Die klok is bijna zo groot als het huis. Te laat komen lijkt hier lastig.",
      already: "De Alpenklok loopt al precies. Bergen houden blijkbaar van stiptheid."
    },
    {
      id: "alpineFountain", name: "Alpenfontein", shortName: "Fontein", center: { x: 900, y: 430 }, radius: 94,
      approachNode: "fountain-approach", intro: "Koud bergwater stroomt door de fontein.",
      prompt: "Tel de blauwe waterstralen.", solved: "Goed zo! Het water wijst naar de kabelbaan.",
      attention: "Dat bergwater ziet er ijskoud uit. Mijn snor voelt het al.",
      already: "De fontein stroomt al goed. Mijn poten blijven graag droog."
    },
    {
      id: "cableCar", name: "Rode kabelbaan", shortName: "Kabelbaan", center: { x: 1350, y: 255 }, radius: 78,
      approachNode: "cable-approach", intro: "De rode cabine zweeft boven het dorp.",
      prompt: "Tel de ritten van de kabelbaan.", solved: "Sterk! De kabelbaan vindt de noordroute.",
      attention: "Een huisje aan een draad! Ik wil weten hoe het boven blijft.",
      already: "De kabelbaan kent de route al. Ik geef de voorkeur aan vaste grond."
    }
  ];
  const exit = {
    id: "mountainGate", type: "gate", center: { x: 1960, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Alpenpoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0017"] = {
    id: "LVL-0017",
    title: "Oostenrijk — De Alpenpoort",
    subtitle: "Een bergdorp tussen klokgelui en kabels in de lucht.",
    description: "Sven zoekt in Oostenrijk de noordelijke route naar Noorwegen.",
    storageKey: "atlas-europa-oostenrijk-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Noorwegen",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Alpen, kabelbaan en een pretzelkraam" },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    learningChallenges,
    challengeArt: challengerAsset,
    player: { startNode: "left-start", start: { x: 215, y: 600 } },
    interactiveObjects: [
      ...challenges.map((item) => ({
        id: item.id, type: "rune", center: item.center, radius: item.radius,
        approachNode: item.approachNode, label: item.name
      })),
      exit
    ],
    walkPath: [
      { id: "left-start", x: 215, y: 600 },
      { id: "clock-approach", x: 610, y: 580, role: "approach" },
      { id: "fountain-approach", x: 900, y: 585, role: "approach" },
      { id: "cable-approach", x: 1340, y: 575, role: "approach" },
      { id: "village-path", x: 1640, y: 585 },
      { id: "gate-approach", x: 1920, y: 575, role: "approach" }
    ],
    intro: ["De Alpen rijzen hoog boven Sven uit.", "Drie reistekens bewaken de noordroute.", "De Alpenpoort leidt naar Noorwegen."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom bij de Alpenpoort.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "Het bergplein ligt open.",
      allRunes: "De Alpenpoort is klaar.",
      reward: "Noorwegen wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "Die bergen steken bijna gaten in de wolken." },
      moving: { speaker: "moose", text: "Rustig op het bergpad. Stenen rollen sneller dan wij." },
      village: { speaker: "minnie", text: "De noordroute loopt tussen klokhuis en kabelbaan." },
      allRunes: { speaker: "moose", text: "De Alpenpoort is open. Tijd voor het fjord." },
      reward: { speaker: "minnie", text: "Van hoge bergen naar diep water!" }
    },
    levelSemantics: {
      setting: "een Oostenrijks Alpendorp met klokhuis, fontein en kabelbaan",
      mood: "helder, fris en avontuurlijk",
      companionFocus: {
        minnie: "sneeuwtoppen, de zwevende cabine en koud bergwater",
        moose: "stevige bergstenen, veilige route en Alpenpoort"
      }
    },
    companionMoments: [
      { id: "at-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "De bergen zijn enorm. Zelfs Moose kijkt een beetje omhoog." },
      ...challenges.map((item) => ({
        id: `at-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `at-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "at-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De noordroute klimt steeds helderder langs de bergen." },
      { id: "at-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De Alpenpoort mist nog {remaining} reistekens. Bergen geven niets cadeau." },
      { id: "at-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De Alpenpoort is open. Tijd voor het fjord." },
      { id: "at-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Dag Alpen! Noorwegen ligt aan de overkant." }
    ],
    areas: [{ id: "village", name: "Oostenrijk", start: 0, end: 2172, guideLine: "village" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Alpenpoort",
      defaultAction: "activate", look: "De poort leidt naar Noorwegen.", activate: "De noordroute opent."
    }],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, challengeId: item.id
    })),
    reward: {
      title: "De Alpenpoort opent!",
      badge: "Alpenreiziger",
      line: "Sven vond door het bergdorp de route naar Noorwegen.",
      art: asset, nextLevelId: "LVL-0018", nextLabel: "Naar Noorwegen"
    }
  };
})();
