window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0018/assets/noorwegen.png";
  const challengerAsset = "Levels/LVL-0018/assets/atlas-de-reiziger.png";
  const learningChallenges = [
    {
      "id": "staveChurch",
      "anchorId": "staveChurch",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "stave-church-slot-1",
          "variants": [
            {
              "id": "stave-church-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "7 daklagen hebben elk 8 houten planken. Hoeveel houten planken zijn dat samen?",
              "answer": 56,
              "hintMinnie": "Zoek 7 gelijke groepjes van 8.",
              "hintMoose": "Reken 7 × 8 stap voor stap.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "stave-church-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 6 rijen met telkens 9 houten planken. Hoeveel houten planken zijn dat?",
              "answer": 54,
              "choices": [
                50,
                54,
                58,
                62
              ],
              "hintMinnie": "Denk aan 6 groepjes van 9.",
              "hintMoose": "Vermenigvuldig 6 met 9.",
              "explanation": "6 × 9 = 54."
            }
          ]
        },
        {
          "id": "stave-church-slot-2",
          "variants": [
            {
              "id": "stave-church-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "56 houten planken worden eerlijk verdeeld over 7 daklagen. Hoeveel krijgt elke groep?",
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
              "id": "stave-church-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 54 houten planken. In elke groep passen er 6. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 6.",
              "hintMoose": "Reken 54 gedeeld door 6.",
              "explanation": "54 : 6 = 9."
            }
          ]
        },
        {
          "id": "stave-church-slot-3",
          "variants": [
            {
              "id": "stave-church-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 4 houtsnijwerkjes voor €6 per stuk. Hoeveel euro betaalt hij?",
              "answer": 24,
              "hintMinnie": "Elk stuk kost €6.",
              "hintMoose": "Reken 4 × 6.",
              "explanation": "4 × €6 = €24."
            },
            {
              "id": "stave-church-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Houten staafkerk is 72 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Verdeel de hele route in 8 gelijke delen.",
              "hintMoose": "Reken 72 : 8.",
              "explanation": "72 : 8 = 9 meter."
            }
          ]
        },
        {
          "id": "stave-church-slot-4",
          "variants": [
            {
              "id": "stave-church-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 7 = ?",
              "answer": 56,
              "hintMinnie": "Splits 8 in handige delen.",
              "hintMoose": "Reken 8 groepjes van 7.",
              "explanation": "8 × 7 = 56."
            },
            {
              "id": "stave-church-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "63 : 9 = ?",
              "answer": 7,
              "choices": [
                4,
                7,
                10,
                13
              ],
              "hintMinnie": "Zoek welk getal keer 9 gelijk is aan 63.",
              "hintMoose": "Verdeel 63 in groepjes van 9.",
              "explanation": "63 : 9 = 7."
            }
          ]
        }
      ]
    },
    {
      "id": "lighthouse",
      "anchorId": "lighthouse",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "lighthouse-slot-1",
          "variants": [
            {
              "id": "lighthouse-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "8 lichtrondes hebben elk 6 lichtflitsen. Hoeveel lichtflitsen zijn dat samen?",
              "answer": 48,
              "hintMinnie": "Zoek 8 gelijke groepjes van 6.",
              "hintMoose": "Reken 8 × 6 stap voor stap.",
              "explanation": "8 × 6 = 48."
            },
            {
              "id": "lighthouse-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 9 rijen met telkens 7 lichtflitsen. Hoeveel lichtflitsen zijn dat?",
              "answer": 63,
              "choices": [
                59,
                63,
                67,
                71
              ],
              "hintMinnie": "Denk aan 9 groepjes van 7.",
              "hintMoose": "Vermenigvuldig 9 met 7.",
              "explanation": "9 × 7 = 63."
            }
          ]
        },
        {
          "id": "lighthouse-slot-2",
          "variants": [
            {
              "id": "lighthouse-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "64 lichtflitsen worden eerlijk verdeeld over 8 lichtrondes. Hoeveel krijgt elke groep?",
              "answer": 8,
              "choices": [
                6,
                8,
                10,
                12
              ],
              "hintMinnie": "Verdeel 64 in 8 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 8 precies 64 is.",
              "explanation": "64 : 8 = 8."
            },
            {
              "id": "lighthouse-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 63 lichtflitsen. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 63 gedeeld door 7.",
              "explanation": "63 : 7 = 9."
            }
          ]
        },
        {
          "id": "lighthouse-slot-3",
          "variants": [
            {
              "id": "lighthouse-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 5 havenkaarten voor €4 per stuk. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Elk stuk kost €4.",
              "hintMoose": "Reken 5 × 4.",
              "explanation": "5 × €4 = €20."
            },
            {
              "id": "lighthouse-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Fjordvuurtoren is 54 meter en heeft 6 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Verdeel de hele route in 6 gelijke delen.",
              "hintMoose": "Reken 54 : 6.",
              "explanation": "54 : 6 = 9 meter."
            }
          ]
        },
        {
          "id": "lighthouse-slot-4",
          "variants": [
            {
              "id": "lighthouse-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "9 × 8 = ?",
              "answer": 72,
              "hintMinnie": "Splits 9 in handige delen.",
              "hintMoose": "Reken 9 groepjes van 8.",
              "explanation": "9 × 8 = 72."
            },
            {
              "id": "lighthouse-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "72 : 9 = ?",
              "answer": 8,
              "choices": [
                5,
                8,
                11,
                14
              ],
              "hintMinnie": "Zoek welk getal keer 9 gelijk is aan 72.",
              "hintMoose": "Verdeel 72 in groepjes van 9.",
              "explanation": "72 : 9 = 8."
            }
          ]
        }
      ]
    },
    {
      "id": "vikingShip",
      "anchorId": "vikingShip",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "viking-ship-slot-1",
          "variants": [
            {
              "id": "viking-ship-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "7 schildrijen hebben elk 9 schilden. Hoeveel schilden zijn dat samen?",
              "answer": 63,
              "hintMinnie": "Zoek 7 gelijke groepjes van 9.",
              "hintMoose": "Reken 7 × 9 stap voor stap.",
              "explanation": "7 × 9 = 63."
            },
            {
              "id": "viking-ship-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 8 rijen met telkens 8 schilden. Hoeveel schilden zijn dat?",
              "answer": 64,
              "choices": [
                60,
                64,
                68,
                72
              ],
              "hintMinnie": "Denk aan 8 groepjes van 8.",
              "hintMoose": "Vermenigvuldig 8 met 8.",
              "explanation": "8 × 8 = 64."
            }
          ]
        },
        {
          "id": "viking-ship-slot-2",
          "variants": [
            {
              "id": "viking-ship-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "72 schilden worden eerlijk verdeeld over 8 schildrijen. Hoeveel krijgt elke groep?",
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
              "id": "viking-ship-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 56 schilden. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 8,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 56 gedeeld door 7.",
              "explanation": "56 : 7 = 8."
            }
          ]
        },
        {
          "id": "viking-ship-slot-3",
          "variants": [
            {
              "id": "viking-ship-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 6 vaartkaartjes voor €5 per stuk. Hoeveel euro betaalt hij?",
              "answer": 30,
              "hintMinnie": "Elk stuk kost €5.",
              "hintMoose": "Reken 6 × 5.",
              "explanation": "6 × €5 = €30."
            },
            {
              "id": "viking-ship-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs het Vikingschip is 63 meter en heeft 7 gelijke stukken. Hoe lang is elk stuk?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Verdeel de hele route in 7 gelijke delen.",
              "hintMoose": "Reken 63 : 7.",
              "explanation": "63 : 7 = 9 meter."
            }
          ]
        },
        {
          "id": "viking-ship-slot-4",
          "variants": [
            {
              "id": "viking-ship-4a",
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
              "id": "viking-ship-4b",
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
    }
  ];
  const challenges = [
    {
      id: "staveChurch", name: "Houten staafkerk", shortName: "Kerk", center: { x: 555, y: 330 }, radius: 110,
      approachNode: "church-approach", intro: "De houten torens wijzen naar de avondlucht.",
      prompt: "Tel de daken van de staafkerk.", solved: "Mooi! De kerk wijst naar het fjordlicht.",
      attention: "Dat houten dak heeft daken op daken. Alsof de kerk een berg nadoet.",
      already: "De kerk staat stevig en de som is klaar. Geen plank meer nodig."
    },
    {
      id: "lighthouse", name: "Fjordvuurtoren", shortName: "Vuurtoren", center: { x: 980, y: 270 }, radius: 104,
      approachNode: "lighthouse-approach", intro: "Het licht draait boven het donkere water.",
      prompt: "Tel de lichtflitsen.", solved: "Goed zo! De vuurtoren verlicht de route.",
      attention: "Dat licht veegt over het hele fjord. Misschien pakt het onze route mee.",
      already: "De vuurtoren schijnt al goed. Meer licht wordt gewoon verblindend."
    },
    {
      id: "vikingShip", name: "Vikingschip", shortName: "Schip", center: { x: 1320, y: 430 }, radius: 112,
      approachNode: "ship-approach", intro: "De drakenkop kijkt uit over het water.",
      prompt: "Tel de schilden van het schip.", solved: "Sterk! Het schip wijst naar Zweden.",
      attention: "Die drakenkop kijkt alsof hij de hele overtocht al gepland heeft.",
      already: "Het schip is al klaar. De draak hoeft niet nóg trotser te kijken."
    }
  ];
  const exit = {
    id: "fjordGate", type: "gate", center: { x: 2040, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Fjordpoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0018"] = {
    id: "LVL-0018",
    title: "Noorwegen — Het Fjordlicht",
    subtitle: "Avondlicht glanst tussen bergen, boten en houten huizen.",
    description: "Sven volgt het licht door een Noors fjord naar Zweden.",
    storageKey: "atlas-europa-noorwegen-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Zweden",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Een fjordhaven onder het avondlicht" },
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
    {
      id: "staveChurch",
      type: "rune",
      center: { x: 629, y: 387 },
      radius: 110,
      approachNode: "church-approach",
      label: "Houten staafkerk"
    },
    {
      id: "lighthouse",
      type: "rune",
      center: { x: 1003, y: 171 },
      radius: 60,
      approachNode: "lighthouse-approach",
      label: "Fjordvuurtoren"
    },
    {
      id: "vikingShip",
      type: "rune",
      center: { x: 1326, y: 450 },
      radius: 101,
      approachNode: "ship-approach",
      label: "Vikingschip"
    },
    {
      id: "fjordGate",
      type: "gate",
      center: { x: 2008, y: 470 },
      radius: 90,
      approachNode: "gate-approach",
      label: "Fjordpoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 215, y: 600 },
    { id: "church-approach", x: 540, y: 585, role: "approach" },
    { id: "lighthouse-approach", x: 970, y: 575, role: "approach" },
    { id: "ship-approach", x: 1322, y: 582, role: "approach" },
    { id: "harbor-path", x: 1650, y: 590 },
    { id: "gate-approach", x: 1980, y: 580, role: "approach" }
  ],
    intro: ["Het fjord ligt stil in het avondlicht.", "Drie reistekens wijzen langs het water.", "De fjordpoort leidt naar Zweden."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom bij het fjordlicht.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "De havenroute ligt open.",
      allRunes: "De fjordpoort is klaar.",
      reward: "Zweden wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "De bergen houden het zonlicht vast. Prachtig." },
      moving: { speaker: "moose", text: "Water links, stevige grond onder ons. Zo houd ik van fjorden." },
      harbor: { speaker: "minnie", text: "Het licht trekt een route over de haven." },
      allRunes: { speaker: "moose", text: "De fjordpoort is open. Zweden ligt verderop." },
      reward: { speaker: "minnie", text: "Het avondlicht wijst ons naar Zweden!" }
    },
    levelSemantics: {
      setting: "een Noors fjord met staafkerk, vuurtoren, vikingschip en havenhuizen",
      mood: "groots, stil en warm in het avondlicht",
      companionFocus: {
        minnie: "gouden licht, houten daken en de drakenkop van het schip",
        moose: "de waterkant, veilige havenroute en rode fjordpoort"
      }
    },
    companionMoments: [
      { id: "no-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Het fjord glanst alsof de zon hier nog even wil blijven." },
      ...challenges.map((item) => ({
        id: `no-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `no-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "no-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "Het fjordlicht tekent de route steeds verder over het water." },
      { id: "no-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De fjordpoort mist nog {remaining} reistekens. De rode deur blijft nors." },
      { id: "no-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De fjordpoort is open. Zweden ligt verderop." },
      { id: "no-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Dag fjordlicht! Het Zweedse dorp wacht." }
    ],
    areas: [{ id: "harbor", name: "Noorwegen", start: 0, end: 2172, guideLine: "harbor" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Fjordpoort",
      defaultAction: "activate", look: "De rode poort leidt naar Zweden.", activate: "De route naar Zweden opent."
    }],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, challengeId: item.id
    })),
    reward: {
      title: "Het fjordlicht wijst de weg!",
      badge: "Fjordzoeker",
      line: "Sven vond langs vuurtoren en vikingschip de route naar Zweden.",
      art: asset, nextLevelId: "LVL-0019", nextLabel: "Naar Zweden"
    }
  };
})();
