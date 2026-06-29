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
            "answer": "Drie uur",
            "choices": [
              "Half drie",
              "Drie uur",
              "Half vier",
              "Vier uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 3,
              "minute": 0
            },
            "hintMinnie": "De grote wijzer staat op de 12.",
            "hintMoose": "Als de grote wijzer op de 12 staat, kijk je welk uur de kleine wijzer aanwijst.",
            "explanation": "De grote wijzer staat op de 12 en de kleine wijzer op de 3. Het is drie uur."
          },
          {
            "id": "at-clock-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Twaalf uur",
            "choices": [
              "Half twaalf",
              "Twaalf uur",
              "Half één",
              "Eén uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 12,
              "minute": 0
            },
            "hintMinnie": "De grote wijzer staat op de 12.",
            "hintMoose": "Beide wijzers wijzen naar de 12.",
            "explanation": "De grote en de kleine wijzer staan op de 12. Het is twaalf uur."
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
            "answer": "Zes uur",
            "choices": [
              "Half zes",
              "Zes uur",
              "Half zeven",
              "Zeven uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 6,
              "minute": 0
            },
            "hintMinnie": "De grote wijzer staat op de 12.",
            "hintMoose": "Kijk nu naar het cijfer dat de kleine wijzer aanwijst.",
            "explanation": "De grote wijzer staat op de 12 en de kleine wijzer op de 6. Het is zes uur."
          },
          {
            "id": "at-clock-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Negen uur",
            "choices": [
              "Half negen",
              "Negen uur",
              "Half tien",
              "Tien uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 9,
              "minute": 0
            },
            "hintMinnie": "De grote wijzer staat op de 12.",
            "hintMoose": "De kleine wijzer wijst precies naar de 9.",
            "explanation": "De grote wijzer staat op de 12 en de kleine wijzer op de 9. Het is negen uur."
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
            "answer": "Tien voor half vier",
            "choices": [
              "Kwart over drie",
              "Tien voor half vier",
              "Tien over half drie",
              "Half vier"
            ],
            "visual": {
              "type": "clock",
              "hour": 3,
              "minute": 20
            },
            "hintMinnie": "De grote wijzer staat op de 4.",
            "hintMoose": "Op de 4 zijn twintig minuten voorbij. Dat is tien minuten voor half vier.",
            "explanation": "De grote wijzer staat op de 4 en de kleine wijzer tussen de 3 en de 4. Het is tien voor half vier."
          },
          {
            "id": "at-clock-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Tien over half zes",
            "choices": [
              "Tien voor half zes",
              "Half zes",
              "Tien over half zes",
              "Tien voor zes"
            ],
            "visual": {
              "type": "clock",
              "hour": 5,
              "minute": 40
            },
            "hintMinnie": "De grote wijzer staat op de 8.",
            "hintMoose": "Op de 8 zijn veertig minuten voorbij. Dat is tien minuten na half zes.",
            "explanation": "De grote wijzer staat op de 8 en de kleine wijzer tussen de 5 en de 6. Het is tien over half zes."
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
            "answer": "Vijf voor half tien",
            "choices": [
              "Vijf over negen",
              "Vijf voor half tien",
              "Half tien",
              "Vijf over half tien"
            ],
            "visual": {
              "type": "clock",
              "hour": 9,
              "minute": 25
            },
            "hintMinnie": "De grote wijzer staat op de 5.",
            "hintMoose": "Op de 5 zijn vijfentwintig minuten voorbij. Dat is vijf minuten voor half tien.",
            "explanation": "De grote wijzer staat op de 5 en de kleine wijzer tussen de 9 en de 10. Het is vijf voor half tien."
          },
          {
            "id": "at-clock-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "clock_reading_five_minutes",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "Hoe laat is het?",
            "answer": "Tien voor één",
            "choices": [
              "Tien over twaalf",
              "Vijf voor één",
              "Tien voor één",
              "Eén uur"
            ],
            "visual": {
              "type": "clock",
              "hour": 12,
              "minute": 50
            },
            "hintMinnie": "De grote wijzer staat op de 10.",
            "hintMoose": "Vanaf de 10 zijn het nog tien minuten tot het volgende hele uur.",
            "explanation": "De grote wijzer staat op de 10 en de kleine wijzer bijna op de 1. Het is tien voor één."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "5 × 7 = ?",
            "answer": 35,
            "choices": [
              28,
              35,
              42,
              49
            ],
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 5 en 2 × 5.",
            "explanation": "5 × 7 = 35."
          },
          {
            "id": "alpine-fountain-1b",
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
        "id": "alpine-fountain-slot-2",
        "variants": [
          {
            "id": "alpine-fountain-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "8 × 8 = ?",
            "answer": 64,
            "choices": [
              56,
              64,
              72,
              80
            ],
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 8 en verdubbel dat.",
            "explanation": "8 × 8 = 64."
          },
          {
            "id": "alpine-fountain-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Rond de Alpenfontein staan 4 bloembakken met samen 20 bloemen. In iedere bak staan er evenveel. Hoeveel bloemen per bak?",
            "answer": 5,
            "hintMinnie": "Verdeel 20 eerlijk over 4 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 4 welk getal uitkomt op 20.",
            "explanation": "20 : 4 = 5."
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
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "16 : 8 = ?",
            "answer": 2,
            "hintMinnie": "Welke som uit de tafel van 8 helpt?",
            "hintMoose": "Omdat 8 × 2 = 16, is 16 : 8 = 2.",
            "explanation": "16 : 8 = 2."
          },
          {
            "id": "alpine-fountain-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "14 : 7 = ?",
            "answer": 2,
            "choices": [
              1,
              2,
              3,
              4
            ],
            "hintMinnie": "Welke som uit de tafel van 7 helpt?",
            "hintMoose": "Omdat 7 × 2 = 14, is 14 : 7 = 2.",
            "explanation": "14 : 7 = 2."
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
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Rond de Alpenfontein staan 9 bloembakken met elk 5 bloemen. Hoeveel bloemen zijn dat samen?",
            "answer": 45,
            "hintMinnie": "Er zijn 9 gelijke groepjes. In elk groepje zitten er 5.",
            "hintMoose": "Tel 9 sprongen van 5.",
            "explanation": "9 × 5 = 45."
          },
          {
            "id": "alpine-fountain-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "2 × 5 = ?",
            "answer": 10,
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 2 sprongen van 5.",
            "explanation": "2 × 5 = 10."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "8 × 10 = ?",
            "answer": 80,
            "choices": [
              70,
              80,
              90,
              100
            ],
            "hintMinnie": "Denk aan de tafel van 10.",
            "hintMoose": "8 groepjes van 10 eindigen op nul.",
            "explanation": "8 × 10 = 80."
          },
          {
            "id": "cable-car-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "money",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas koopt 8 kabelbaankaartjes voor 9 euro per stuk. Hoeveel euro betaalt hij?",
            "answer": 72,
            "hintMinnie": "Er zijn 8 gelijke bedragen van 9 euro.",
            "hintMoose": "Reken 8 × 10 en haal er daarna 8 af.",
            "explanation": "8 × 9 = 72 euro."
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
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "9 × 9 = ?",
            "answer": 81,
            "choices": [
              72,
              81,
              90,
              99
            ],
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 9 en haal 9 eraf.",
            "explanation": "9 × 9 = 81."
          },
          {
            "id": "cable-car-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Er rijden 4 kabelbaancabines met elk 3 reizigers. Hoeveel reizigers zijn dat samen?",
            "answer": 12,
            "hintMinnie": "Er zijn 4 gelijke groepjes. In elk groepje zitten er 3.",
            "hintMoose": "Verdubbel 4 en tel er nog 4 bij op.",
            "explanation": "4 × 3 = 12."
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
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Er rijden 6 kabelbaancabines met elk 4 reizigers. Hoeveel reizigers zijn dat samen?",
            "answer": 24,
            "choices": [
              20,
              24,
              28,
              32
            ],
            "hintMinnie": "Er zijn 6 gelijke groepjes. In elk groepje zitten er 4.",
            "hintMoose": "Verdubbel 6 en verdubbel de uitkomst nog eens.",
            "explanation": "6 × 4 = 24."
          },
          {
            "id": "cable-car-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "18 : 3 = ?",
            "answer": 6,
            "choices": [
              5,
              6,
              7,
              8
            ],
            "hintMinnie": "Welke som uit de tafel van 3 helpt?",
            "hintMoose": "Omdat 3 × 6 = 18, is 18 : 3 = 6.",
            "explanation": "18 : 3 = 6."
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
            "prompt": "4 × 8 = ?",
            "answer": 32,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 4 en verdubbel dat.",
            "explanation": "4 × 8 = 32."
          },
          {
            "id": "cable-car-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Er rijden 4 kabelbaancabines met elk 7 reizigers. Hoeveel reizigers zijn dat samen?",
            "answer": 28,
            "choices": [
              21,
              28,
              35,
              42
            ],
            "hintMinnie": "Er zijn 4 gelijke groepjes. In elk groepje zitten er 7.",
            "hintMoose": "Reken 4 × 5 en 4 × 2 en tel de uitkomsten op.",
            "explanation": "4 × 7 = 28."
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
    player: { startNode: "left-start", start: { x: 198, y: 633 } },
    interactiveObjects: [
    {
      id: "clockHouse",
      type: "rune",
      center: { x: 654, y: 225 },
      radius: 53,
      approachNode: "clock-approach",
      label: "Alpenklokhuis"
    },
    {
      id: "alpineFountain",
      type: "rune",
      center: { x: 924, y: 453 },
      radius: 81,
      approachNode: "fountain-approach",
      label: "Alpenfontein"
    },
    {
      id: "cableCar",
      type: "rune",
      center: { x: 1349, y: 320 },
      radius: 61,
      approachNode: "cable-approach",
      label: "Rode kabelbaan"
    },
    {
      id: "mountainGate",
      type: "gate",
      center: { x: 1901, y: 498 },
      radius: 93,
      approachNode: "gate-approach",
      label: "Alpenpoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 198, y: 633 },
    { id: "clock-approach", x: 613, y: 626, role: "approach" },
    { id: "fountain-approach", x: 903, y: 623, role: "approach" },
    { id: "cable-approach", x: 1342, y: 621, role: "approach" },
    { id: "village-path", x: 1653, y: 618 },
    { id: "gate-approach", x: 1906, y: 607, role: "approach" }
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
    sceneEffects: [
        {
              id: "bubbles-and-spray-01",
              label: "Fountain spray 1",
              presetId: "bubbles-and-spray",
              variantId: "fountain-spray",
              presetVersion: 1,
              enabled: true,
              seed: 938891233,
              qualityTier: "auto",
              layerSlot: "worldAtmosphere",
              groupId: "",
              geometry: {
                    type: "pointRadius",
                    x: 929,
                    y: 447,
                    radius: 120
              },
              overrides: {
                    directionDeg: 90
              }
        }
  ],
    reward: {
      title: "De Alpenpoort opent!",
      badge: "Alpenreiziger",
      line: "Sven vond door het bergdorp de route naar Noorwegen.",
      art: asset, nextLevelId: "LVL-0018", nextLabel: "Naar Noorwegen"
    }
  };
})();
