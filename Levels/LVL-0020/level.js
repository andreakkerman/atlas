window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0020/assets/rheden.png";
  const challengerAsset = "Levels/LVL-0020/assets/atlas-de-reiziger.png";
  const learningChallenges = [
  {
    "id": "mapBoard",
    "anchorId": "mapBoard",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "map-board-slot-1",
        "variants": [
          {
            "id": "map-board-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas verdeelt bij Posbankkaart 35 routepunten over 7 gelijke groepen. Hoeveel routepunten krijgt elke groep?",
            "answer": 5,
            "hintMinnie": "Welke som uit de tafel van 7 helpt?",
            "hintMoose": "Omdat 7 × 5 = 35, is 35 : 7 = 5.",
            "explanation": "35 : 7 = 5."
          },
          {
            "id": "map-board-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "6 × 7 = ?",
            "answer": 42,
            "choices": [
              35,
              42,
              49,
              56
            ],
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 6 en 2 × 6.",
            "explanation": "6 × 7 = 42."
          }
        ]
      },
      {
        "id": "map-board-slot-2",
        "variants": [
          {
            "id": "map-board-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas legt bij Posbankkaart 6 groepjes van 6 routepunten. Hoeveel routepunten zijn dat samen?",
            "answer": 36,
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 6 en tel nog 6 erbij.",
            "explanation": "6 × 6 = 36."
          },
          {
            "id": "map-board-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas legt bij Posbankkaart 8 groepjes van 7 routepunten. Hoeveel routepunten zijn dat samen?",
            "answer": 56,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 8 en 2 × 8.",
            "explanation": "8 × 7 = 56."
          }
        ]
      },
      {
        "id": "map-board-slot-3",
        "variants": [
          {
            "id": "map-board-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "63 : 7 = ?",
            "answer": 9,
            "choices": [
              8,
              9,
              10,
              11
            ],
            "hintMinnie": "Welke som uit de tafel van 7 helpt?",
            "hintMoose": "Omdat 7 × 9 = 63, is 63 : 7 = 9.",
            "explanation": "63 : 7 = 9."
          },
          {
            "id": "map-board-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "54 : 6 = ?",
            "answer": 9,
            "choices": [
              8,
              9,
              10,
              11
            ],
            "hintMinnie": "Welke som uit de tafel van 6 helpt?",
            "hintMoose": "Omdat 6 × 9 = 54, is 54 : 6 = 9.",
            "explanation": "54 : 6 = 9."
          }
        ]
      },
      {
        "id": "map-board-slot-4",
        "variants": [
          {
            "id": "map-board-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Atlas legt bij Posbankkaart 4 groepjes van 8 routepunten. Hoeveel routepunten zijn dat samen?",
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
            "id": "map-board-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "14 : 2 = ?",
            "answer": 7,
            "choices": [
              6,
              7,
              8,
              9
            ],
            "hintMinnie": "Welke som uit de tafel van 2 helpt?",
            "hintMoose": "Omdat 2 × 7 = 14, is 14 : 2 = 7.",
            "explanation": "14 : 2 = 7."
          }
        ]
      }
    ]
  },
  {
    "id": "telescope",
    "anchorId": "telescope",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "telescope-slot-1",
        "variants": [
          {
            "id": "telescope-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Atlas legt bij Heidekijker 6 groepjes van 8 kijkpunten. Hoeveel kijkpunten zijn dat samen?",
            "answer": 48,
            "choices": [
              40,
              48,
              56,
              64
            ],
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 6 en verdubbel dat.",
            "explanation": "6 × 8 = 48."
          },
          {
            "id": "telescope-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "6 × 7 = ?",
            "answer": 42,
            "choices": [
              35,
              42,
              49,
              56
            ],
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 6 en 2 × 6.",
            "explanation": "6 × 7 = 42."
          }
        ]
      },
      {
        "id": "telescope-slot-2",
        "variants": [
          {
            "id": "telescope-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "2 × 10 = ?",
            "answer": 20,
            "hintMinnie": "Denk aan de tafel van 10.",
            "hintMoose": "2 groepjes van 10 eindigen op nul.",
            "explanation": "2 × 10 = 20."
          },
          {
            "id": "telescope-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "route",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De route bij Heidekijker is 6 meter lang en heeft 2 gelijke stukken. Hoeveel meter is elk stuk?",
            "answer": 3,
            "hintMinnie": "Verdeel de route in gelijke stukken.",
            "hintMoose": "Omdat 2 × 3 = 6, is 6 : 2 = 3.",
            "explanation": "6 : 2 = 3 meter."
          }
        ]
      },
      {
        "id": "telescope-slot-3",
        "variants": [
          {
            "id": "telescope-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "money",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas koopt 6 routekaarten voor 4 euro per stuk. Hoeveel euro betaalt hij?",
            "answer": 24,
            "hintMinnie": "Elk kaartje kost 4 euro.",
            "hintMoose": "Verdubbel 6 twee keer.",
            "explanation": "6 × 4 = 24 euro."
          },
          {
            "id": "telescope-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "5 × 10 = ?",
            "answer": 50,
            "choices": [
              40,
              50,
              60,
              70
            ],
            "hintMinnie": "Denk aan de tafel van 10.",
            "hintMoose": "5 groepjes van 10 eindigen op nul.",
            "explanation": "5 × 10 = 50."
          }
        ]
      },
      {
        "id": "telescope-slot-4",
        "variants": [
          {
            "id": "telescope-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "32 : 4 = ?",
            "answer": 8,
            "hintMinnie": "Welke som uit de tafel van 4 helpt?",
            "hintMoose": "Omdat 4 × 8 = 32, is 32 : 4 = 8.",
            "explanation": "32 : 4 = 8."
          },
          {
            "id": "telescope-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "28 : 7 = ?",
            "answer": 4,
            "choices": [
              3,
              4,
              5,
              6
            ],
            "hintMinnie": "Welke som uit de tafel van 7 helpt?",
            "hintMoose": "Omdat 7 × 4 = 28, is 28 : 7 = 4.",
            "explanation": "28 : 7 = 4."
          }
        ]
      }
    ]
  },
  {
    "id": "deerStatue",
    "anchorId": "deerStatue",
    "challengeCharacterId": "atlas-de-reiziger",
    "questions": [
      {
        "id": "deer-statue-slot-1",
        "variants": [
          {
            "id": "deer-statue-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Atlas legt bij Hertenbeeld 7 groepjes van 9 wandelkaartjes. Hoeveel wandelkaartjes zijn dat samen?",
            "answer": 63,
            "choices": [
              54,
              63,
              72,
              81
            ],
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 7 en haal 7 eraf.",
            "explanation": "7 × 9 = 63."
          },
          {
            "id": "deer-statue-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Atlas verdeelt bij Hertenbeeld 18 wandelkaartjes over 2 gelijke groepen. Hoeveel wandelkaartjes krijgt elke groep?",
            "answer": 9,
            "choices": [
              8,
              9,
              10,
              11
            ],
            "hintMinnie": "Welke som uit de tafel van 2 helpt?",
            "hintMoose": "Omdat 2 × 9 = 18, is 18 : 2 = 9.",
            "explanation": "18 : 2 = 9."
          }
        ]
      },
      {
        "id": "deer-statue-slot-2",
        "variants": [
          {
            "id": "deer-statue-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "8 × 8 = ?",
            "answer": 64,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 8 en verdubbel dat.",
            "explanation": "8 × 8 = 64."
          },
          {
            "id": "deer-statue-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Atlas legt bij Hertenbeeld 3 groepjes van 10 wandelkaartjes. Hoeveel wandelkaartjes zijn dat samen?",
            "answer": 30,
            "hintMinnie": "Denk aan de tafel van 10.",
            "hintMoose": "3 groepjes van 10 eindigen op nul.",
            "explanation": "3 × 10 = 30."
          }
        ]
      },
      {
        "id": "deer-statue-slot-3",
        "variants": [
          {
            "id": "deer-statue-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "route",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De route bij Hertenbeeld is 24 meter lang en heeft 4 gelijke stukken. Hoeveel meter is elk stuk?",
            "answer": 6,
            "hintMinnie": "Verdeel de route in gelijke stukken.",
            "hintMoose": "Omdat 4 × 6 = 24, is 24 : 4 = 6.",
            "explanation": "24 : 4 = 6 meter."
          },
          {
            "id": "deer-statue-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "6 × 3 = ?",
            "answer": 18,
            "choices": [
              15,
              18,
              21,
              24
            ],
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 6 en tel nog 6 erbij.",
            "explanation": "6 × 3 = 18."
          }
        ]
      },
      {
        "id": "deer-statue-slot-4",
        "variants": [
          {
            "id": "deer-statue-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "5 × 9 = ?",
            "answer": 45,
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 5 en haal 5 eraf.",
            "explanation": "5 × 9 = 45."
          },
          {
            "id": "deer-statue-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Atlas legt bij Hertenbeeld 7 groepjes van 2 wandelkaartjes. Hoeveel wandelkaartjes zijn dat samen?",
            "answer": 14,
            "choices": [
              12,
              14,
              16,
              18
            ],
            "hintMinnie": "Denk aan de tafel van 2.",
            "hintMoose": "Verdubbel 7.",
            "explanation": "7 × 2 = 14."
          }
        ]
      }
    ]
  }
];
  const challenges = [
    {
      id: "mapBoard", name: "Posbankkaart", shortName: "Kaart", center: { x: 760, y: 475 }, radius: 88,
      approachNode: "map-approach", intro: "De kaart toont paden door bos en heide.",
      prompt: "Tel de vakken op de kaart.", solved: "Mooi! De kaart herkent de hele reis.",
      attention: "Deze kaart kent elk paadje. Misschien tekent hij onze hele reis erbij.",
      already: "De Posbankkaart klopt al. Verdwalen zou nu echt extra werk zijn."
    },
    {
      id: "telescope", name: "Heidekijker", shortName: "Kijker", center: { x: 1040, y: 460 }, radius: 72,
      approachNode: "telescope-approach", intro: "De kijker staat gericht op de paarse heide.",
      prompt: "Tel de verre heidevelden.", solved: "Goed zo! De kijker vindt het eindpunt.",
      attention: "Door deze kijker zie je vast waar we allemaal zijn geweest. Bijna dan.",
      already: "De kijker staat al scherp. Ik zie vooral heel veel heide."
    },
    {
      id: "deerStatue", name: "Hertenbeeld", shortName: "Hert", center: { x: 1590, y: 375 }, radius: 108,
      approachNode: "deer-approach", intro: "Het houten hert kijkt over de Posbank.",
      prompt: "Tel de punten van het gewei.", solved: "Sterk! Het hert verwelkomt Sven thuis.",
      attention: "Dat hert kijkt alsof het precies wist dat we vandaag terugkwamen.",
      already: "Het hert heeft ons al gezien. Nog eens rekenen maakt het niet minder houten."
    }
  ];
  const finish = {
    id: "forestGate", type: "gate", center: { x: 1970, y: 375 }, radius: 112,
    approachNode: "finish-approach", label: "Bospad naar huis"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0020"] = {
    id: "LVL-0020",
    title: "Rheden — Terug naar de Posbank",
    subtitle: "De grote reis eindigt tussen heide en vertrouwde bospaden.",
    description: "Sven keert terug naar Rheden en rondt de Europese reis af.",
    storageKey: "atlas-europa-rheden-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: finish.id,
    exitActionLabel: "Rond de reis af",
    challengeLabel: "Thuiskomstproef",
    challengeCompleteLabel: "Maak de thuiskomst klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "thuiskomsttekens",
    menu: { illustration: asset, badge: "Finale", detail: "Heide, uitzicht en thuiskomen op de Posbank" },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    learningChallenges,
    challengeArt: challengerAsset,
    player: { startNode: "left-start", start: { x: 253, y: 594 } },
    interactiveObjects: [
    {
      id: "mapBoard",
      type: "rune",
      center: { x: 781, y: 507 },
      radius: 70,
      approachNode: "map-approach",
      label: "Posbankkaart"
    },
    {
      id: "telescope",
      type: "rune",
      center: { x: 1058, y: 466 },
      radius: 58,
      approachNode: "telescope-approach",
      label: "Heidekijker"
    },
    {
      id: "deerStatue",
      type: "rune",
      center: { x: 1639, y: 413 },
      radius: 81,
      approachNode: "deer-approach",
      label: "Hertenbeeld"
    },
    {
      id: "forestGate",
      type: "gate",
      center: { x: 2083, y: 482 },
      radius: 78,
      approachNode: "finish-approach",
      label: "Bospad naar huis"
    }
  ],
    walkPath: [
    { id: "left-start", x: 253, y: 594 },
    { id: "map-approach", x: 740, y: 636, role: "approach" },
    { id: "telescope-approach", x: 1046, y: 635, role: "approach" },
    { id: "bench-path", x: 1314, y: 632 },
    { id: "deer-approach", x: 1621, y: 635, role: "approach" },
    { id: "finish-approach", x: 2095, y: 583, role: "approach" }
  ],
    intro: ["Sven is terug op de Posbank.", "Drie thuiskomsttekens bewaren de herinneringen.", "Het bospad rondt de grote reis af."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom terug op de Posbank.",
      chooseRune: "Onderzoek de thuiskomsttekens.",
      moving: "Het heidepad ligt open.",
      allRunes: "Het bospad naar huis is klaar.",
      reward: "De grote reis is voltooid."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "De paarse heide! We zijn echt weer thuis." },
      moving: { speaker: "moose", text: "Bekende grond. Mijn poten herkennen het pad." },
      heath: { speaker: "minnie", text: "De Posbank bewaart het laatste stukje van onze reis." },
      allRunes: { speaker: "moose", text: "Alles klopt. Het bospad brengt ons naar huis." },
      reward: { speaker: "minnie", text: "Europa rond en weer thuis. Wat een reis!" }
    },
    levelSemantics: {
      setting: "de Posbank bij Rheden met heide, kaart, kijker en hertenbeeld",
      mood: "rustig, vertrouwd en feestelijk",
      companionFocus: {
        minnie: "paarse heide, verre uitzichten en herinneringen aan de reis",
        moose: "het bekende zandpad, de kaart en het veilige bospad naar huis"
      }
    },
    companionMoments: [
      { id: "rh-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Paarse heide en bekende bomen. We zijn weer op de Posbank!" },
      ...challenges.map((item) => ({
        id: `rh-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `rh-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "rh-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "Onze hele reis verschijnt tussen de heidevelden." },
      { id: "rh-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "Het bospad wacht nog op {remaining} thuiskomsttekens. Thuis heeft geen haast." },
      { id: "rh-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "Alles klopt. Het bospad brengt ons naar huis." },
      { id: "rh-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Van Nederland door Europa en terug naar Rheden. We hebben het gedaan!" }
    ],
    areas: [{ id: "heath", name: "Rheden", start: 0, end: 2172, guideLine: "heath" }],
    hotspots: [{
      id: finish.id, objectId: finish.id, type: "gate", name: "Bospad naar huis",
      defaultAction: "activate", look: "Dit vertrouwde pad rondt de reis af.", activate: "Sven loopt tevreden naar huis."
    }],
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, challengeId: item.id
    })),
    reward: {
      title: "De Grote Reis door Europa is voltooid!",
      badge: "Meester van de Europareis",
      line: "Sven reisde door zeven landen en kwam terug op de Posbank in Rheden.",
      art: asset
    }
  };
})();
