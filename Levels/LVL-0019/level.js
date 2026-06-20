window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0019/assets/zweden.png";
  const challengerAsset = "Levels/LVL-0019/assets/atlas-de-reiziger.png";
  const learningChallenges = [
    {
      "id": "dalaHorse",
      "anchorId": "dalaHorse",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "dala-horse-slot-1",
          "variants": [
            {
              "id": "dala-horse-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "6 verfstroken hebben elk 8 kleurvormen. Hoeveel kleurvormen zijn dat samen?",
              "answer": 48,
              "hintMinnie": "Zoek 6 gelijke groepjes van 8.",
              "hintMoose": "Reken 6 × 8 stap voor stap.",
              "explanation": "6 × 8 = 48."
            },
            {
              "id": "dala-horse-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 7 rijen met telkens 7 kleurvormen. Hoeveel kleurvormen zijn dat?",
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
          "id": "dala-horse-slot-2",
          "variants": [
            {
              "id": "dala-horse-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "56 kleurvormen worden eerlijk verdeeld over 7 verfstroken. Hoeveel krijgt elke groep?",
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
              "id": "dala-horse-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 54 kleurvormen. In elke groep passen er 6. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 6.",
              "hintMoose": "Reken 54 gedeeld door 6.",
              "explanation": "54 : 6 = 9."
            }
          ]
        },
        {
          "id": "dala-horse-slot-3",
          "variants": [
            {
              "id": "dala-horse-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 5 houten paardjes voor €6 per stuk. Hoeveel euro betaalt hij?",
              "answer": 30,
              "hintMinnie": "Elk stuk kost €6.",
              "hintMoose": "Reken 5 × 6.",
              "explanation": "5 × €6 = €30."
            },
            {
              "id": "dala-horse-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs het Dalapaard is 64 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "dala-horse-slot-4",
          "variants": [
            {
              "id": "dala-horse-4a",
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
              "id": "dala-horse-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "72 : 8 = ?",
              "answer": 9,
              "choices": [
                6,
                9,
                12,
                15
              ],
              "hintMinnie": "Zoek welk getal keer 8 gelijk is aan 72.",
              "hintMoose": "Verdeel 72 in groepjes van 8.",
              "explanation": "72 : 8 = 9."
            }
          ]
        }
      ]
    },
    {
      "id": "maypole",
      "anchorId": "maypole",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "maypole-slot-1",
          "variants": [
            {
              "id": "maypole-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "8 bloemenkransen hebben elk 7 bloemen. Hoeveel bloemen zijn dat samen?",
              "answer": 56,
              "hintMinnie": "Zoek 8 gelijke groepjes van 7.",
              "hintMoose": "Reken 8 × 7 stap voor stap.",
              "explanation": "8 × 7 = 56."
            },
            {
              "id": "maypole-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 6 rijen met telkens 9 bloemen. Hoeveel bloemen zijn dat?",
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
          "id": "maypole-slot-2",
          "variants": [
            {
              "id": "maypole-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "64 bloemen worden eerlijk verdeeld over 8 bloemenkransen. Hoeveel krijgt elke groep?",
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
              "id": "maypole-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 63 bloemen. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 63 gedeeld door 7.",
              "explanation": "63 : 7 = 9."
            }
          ]
        },
        {
          "id": "maypole-slot-3",
          "variants": [
            {
              "id": "maypole-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 4 bloemenslingers voor €5 per stuk. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Elk stuk kost €5.",
              "hintMoose": "Reken 4 × 5.",
              "explanation": "4 × €5 = €20."
            },
            {
              "id": "maypole-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Zweedse meiboom is 72 meter en heeft 9 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "maypole-slot-4",
          "variants": [
            {
              "id": "maypole-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "8 × 8 = ?",
              "answer": 64,
              "hintMinnie": "Splits 8 in handige delen.",
              "hintMoose": "Reken 8 groepjes van 8.",
              "explanation": "8 × 8 = 64."
            },
            {
              "id": "maypole-4b",
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
      "id": "harborClock",
      "anchorId": "harborClock",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "harbor-clock-slot-1",
          "variants": [
            {
              "id": "se-clock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Tien over negen",
              "choices": [
                "Vijf over negen",
                "Tien over negen",
                "Tien voor negen",
                "Kwart over negen"
              ],
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 10
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "De grote wijzer op de 2 betekent tien over negen.",
              "explanation": "Het is tien over negen."
            },
            {
              "id": "se-clock-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Twintig over vijf",
              "choices": [
                "Kwart over vijf",
                "Twintig over vijf",
                "Twintig voor vijf",
                "Half zes"
              ],
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 20
              },
              "hintMinnie": "Elk cijfer is vijf minuten.",
              "hintMoose": "Vier keer vijf minuten is twintig over.",
              "explanation": "Het is twintig over vijf."
            }
          ]
        },
        {
          "id": "harbor-clock-slot-2",
          "variants": [
            {
              "id": "se-clock-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf voor half vier",
              "choices": [
                "Vijf over drie",
                "Vijf voor half vier",
                "Half vier",
                "Vijf over half vier"
              ],
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 25
              },
              "hintMinnie": "De grote wijzer staat op de 5.",
              "hintMoose": "Dat is vijf minuten voor half vier.",
              "explanation": "Het is vijf voor half vier."
            },
            {
              "id": "se-clock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf over half acht",
              "choices": [
                "Half acht",
                "Vijf voor half acht",
                "Vijf over half acht",
                "Vijf voor acht"
              ],
              "visual": {
                "type": "clock",
                "hour": 7,
                "minute": 35
              },
              "hintMinnie": "De grote wijzer staat op de 7.",
              "hintMoose": "Dat is vijf minuten na half acht.",
              "explanation": "Het is vijf over half acht."
            }
          ]
        },
        {
          "id": "harbor-clock-slot-3",
          "variants": [
            {
              "id": "se-clock-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Twintig voor elf",
              "choices": [
                "Twintig over tien",
                "Half elf",
                "Twintig voor elf",
                "Tien voor elf"
              ],
              "visual": {
                "type": "clock",
                "hour": 10,
                "minute": 40
              },
              "hintMinnie": "De grote wijzer staat op de 8.",
              "hintMoose": "Vanaf de 8 zijn het nog twintig minuten tot elf.",
              "explanation": "Het is twintig voor elf."
            },
            {
              "id": "se-clock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Tien voor twee",
              "choices": [
                "Tien over één",
                "Vijf voor twee",
                "Tien voor twee",
                "Twee uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 50
              },
              "hintMinnie": "De grote wijzer staat op de 10.",
              "hintMoose": "Vanaf de 10 zijn het nog tien minuten tot twee.",
              "explanation": "Het is tien voor twee."
            }
          ]
        },
        {
          "id": "harbor-clock-slot-4",
          "variants": [
            {
              "id": "se-clock-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf over zes",
              "choices": [
                "Vijf voor zes",
                "Vijf over zes",
                "Tien over zes",
                "Zes uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 6,
                "minute": 5
              },
              "hintMinnie": "De grote wijzer staat op de 1.",
              "hintMoose": "Op de 1 zijn vijf minuten voorbij.",
              "explanation": "Het is vijf over zes."
            },
            {
              "id": "se-clock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf voor twaalf",
              "choices": [
                "Vijf over elf",
                "Tien voor twaalf",
                "Vijf voor twaalf",
                "Twaalf uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 55
              },
              "hintMinnie": "De grote wijzer staat op de 11.",
              "hintMoose": "Vanaf de 11 duurt het nog vijf minuten tot twaalf.",
              "explanation": "Het is vijf voor twaalf."
            }
          ]
        }
      ]
    }
  ];
  const challenges = [
    {
      id: "dalaHorse", name: "Dalapaard", shortName: "Paard", center: { x: 805, y: 375 }, radius: 108,
      approachNode: "horse-approach", intro: "Het rode houten paard staat trots op zijn sokkel.",
      prompt: "Tel de geschilderde vormen.", solved: "Mooi! Het Dalapaard wijst naar de haven.",
      attention: "Dat rode paard staat zó stil dat het vast iets geheimhoudt.",
      already: "Het Dalapaard is al klaar. Rennen was toch niet zijn plan."
    },
    {
      id: "maypole", name: "Zweedse meiboom", shortName: "Meiboom", center: { x: 1110, y: 300 }, radius: 110,
      approachNode: "maypole-approach", intro: "Bloemen en kransen hangen aan de groene boom.",
      prompt: "Tel de bloemenkransen.", solved: "Goed zo! De meiboom laat de thuisroute zien.",
      attention: "Die bloemencirkels hangen precies gelijk. Dat ruikt naar een patroon.",
      already: "De kransen hangen al netjes. Meer draaien maakt iedereen duizelig."
    },
    {
      id: "harborClock", name: "Havenklok", shortName: "Klok", center: { x: 1375, y: 255 }, radius: 78,
      approachNode: "clock-approach", intro: "De witte klok kijkt uit over de boten.",
      prompt: "Tel de slagen boven de haven.", solved: "Sterk! De klok zet de koers naar huis.",
      attention: "Die klok houdt de boten én de tijd in de gaten. Druk beroep.",
      already: "De havenklok loopt al goed. De boten hoeven niet nog eens te wachten."
    }
  ];
  const exit = {
    id: "harborGate", type: "gate", center: { x: 2035, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Havenpoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0019"] = {
    id: "LVL-0019",
    title: "Zweden — Het Dorp aan het Water",
    subtitle: "Een vrolijk havendorp vol bloemen, vlaggen en boten.",
    description: "Sven vindt in Zweden de laatste route terug naar Rheden.",
    storageKey: "atlas-europa-zweden-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Terug naar Rheden",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de thuisroute klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Vlaggen, bloemen en boten aan de kade" },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    learningChallenges,
    challengeArt: challengerAsset,
    player: { startNode: "left-start", start: { x: 220, y: 600 } },
    interactiveObjects: [
    {
      id: "dalaHorse",
      type: "rune",
      center: { x: 846, y: 415 },
      radius: 88,
      approachNode: "horse-approach",
      label: "Dalapaard"
    },
    {
      id: "maypole",
      type: "rune",
      center: { x: 1174, y: 257 },
      radius: 81,
      approachNode: "maypole-approach",
      label: "Zweedse meiboom"
    },
    {
      id: "harborClock",
      type: "rune",
      center: { x: 1384, y: 277 },
      radius: 32,
      approachNode: "clock-approach",
      label: "Havenklok"
    },
    {
      id: "harborGate",
      type: "gate",
      center: { x: 2000, y: 532 },
      radius: 83,
      approachNode: "gate-approach",
      label: "Havenpoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 189, y: 625 },
    { id: "village-path", x: 522, y: 614 },
    { id: "horse-approach", x: 788, y: 608, role: "approach" },
    { id: "maypole-approach", x: 1113, y: 608, role: "approach" },
    { id: "clock-approach", x: 1373, y: 607, role: "approach" },
    { id: "gate-approach", x: 1984, y: 638, role: "approach" }
  ],
    intro: ["Zweden kleurt rood, geel en blauw.", "Drie reistekens wijzen naar huis.", "Achter de havenpoort ligt Rheden."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom in het dorp aan het water.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "De havenstraat ligt open.",
      allRunes: "De thuisroute is klaar.",
      reward: "Rheden wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "Rode huizen, blauwe lucht en overal bloemen. Gezellig." },
      moving: { speaker: "moose", text: "De kade is breed. Alleen niet achteruit het water in." },
      harbor: { speaker: "minnie", text: "De thuisroute loopt tussen paard, bloemen en klok." },
      allRunes: { speaker: "moose", text: "De havenpoort is open. Nu terug naar Rheden." },
      reward: { speaker: "minnie", text: "De Posbank komt weer dichtbij!" }
    },
    levelSemantics: {
      setting: "een Zweeds havendorp met Dalapaard, meiboom, klok en kleurige huizen",
      mood: "vrolijk, fris en bijna thuis",
      companionFocus: {
        minnie: "bloemenkransen, Zweedse vlaggen en het rode Dalapaard",
        moose: "de kade, botenroute en stevige havenpoort"
      }
    },
    companionMoments: [
      { id: "se-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Dit dorp lijkt een ansichtkaart met extra veel bloemen." },
      ...challenges.map((item) => ({
        id: `se-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `se-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "se-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De thuisroute schittert al tussen de Zweedse vlaggen." },
      { id: "se-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De havenpoort mist nog {remaining} reistekens. Thuis loopt niet weg." },
      { id: "se-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De havenpoort is open. Nu terug naar Rheden." },
      { id: "se-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Hej då, Zweden! De Posbank wacht op ons." }
    ],
    areas: [{ id: "harbor", name: "Zweden", start: 0, end: 2172, guideLine: "harbor" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Havenpoort",
      defaultAction: "activate", look: "De poort leidt terug naar Rheden.", activate: "De thuisroute opent."
    }],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, challengeId: item.id
    })),
    reward: {
      title: "De thuisroute is gevonden!",
      badge: "Noordse reiziger",
      line: "Sven vond in het Zweedse havendorp de weg terug naar Rheden.",
      art: asset, nextLevelId: "LVL-0020", nextLabel: "Terug naar Rheden"
    }
  };
})();
