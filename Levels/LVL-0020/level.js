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
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "7 kaartvakken hebben elk 8 routepunten. Hoeveel routepunten zijn dat samen?",
              "answer": 56,
              "hintMinnie": "Zoek 7 gelijke groepjes van 8.",
              "hintMoose": "Reken 7 × 8 stap voor stap.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "map-board-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 9 rijen met telkens 6 routepunten. Hoeveel routepunten zijn dat?",
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
          "id": "map-board-slot-2",
          "variants": [
            {
              "id": "map-board-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "56 routepunten worden eerlijk verdeeld over 7 kaartvakken. Hoeveel krijgt elke groep?",
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
              "id": "map-board-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 72 routepunten. In elke groep passen er 8. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 8.",
              "hintMoose": "Reken 72 gedeeld door 8.",
              "explanation": "72 : 8 = 9."
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
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 5 wandelkaarten voor €4 per stuk. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Elk stuk kost €4.",
              "hintMoose": "Reken 5 × 4.",
              "explanation": "5 × €4 = €20."
            },
            {
              "id": "map-board-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Posbankkaart is 63 meter en heeft 7 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "map-board-slot-4",
          "variants": [
            {
              "id": "map-board-4a",
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
              "id": "map-board-4b",
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
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "6 uitkijkrondes hebben elk 9 uitzichtpunten. Hoeveel uitzichtpunten zijn dat samen?",
              "answer": 54,
              "hintMinnie": "Zoek 6 gelijke groepjes van 9.",
              "hintMoose": "Reken 6 × 9 stap voor stap.",
              "explanation": "6 × 9 = 54."
            },
            {
              "id": "telescope-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 8 rijen met telkens 7 uitzichtpunten. Hoeveel uitzichtpunten zijn dat?",
              "answer": 56,
              "choices": [
                52,
                56,
                60,
                64
              ],
              "hintMinnie": "Denk aan 8 groepjes van 7.",
              "hintMoose": "Vermenigvuldig 8 met 7.",
              "explanation": "8 × 7 = 56."
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
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "54 uitzichtpunten worden eerlijk verdeeld over 6 uitkijkrondes. Hoeveel krijgt elke groep?",
              "answer": 9,
              "choices": [
                7,
                9,
                11,
                13
              ],
              "hintMinnie": "Verdeel 54 in 6 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 6 precies 54 is.",
              "explanation": "54 : 6 = 9."
            },
            {
              "id": "telescope-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 64 uitzichtpunten. In elke groep passen er 8. Hoeveel groepen zijn nodig?",
              "answer": 8,
              "hintMinnie": "Maak groepjes van 8.",
              "hintMoose": "Reken 64 gedeeld door 8.",
              "explanation": "64 : 8 = 8."
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
              "prompt": "Atlas koopt 4 kijkkaarten voor €6 per stuk. Hoeveel euro betaalt hij?",
              "answer": 24,
              "hintMinnie": "Elk stuk kost €6.",
              "hintMoose": "Reken 4 × 6.",
              "explanation": "4 × €6 = €24."
            },
            {
              "id": "telescope-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Heidekijker is 72 meter en heeft 9 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "telescope-slot-4",
          "variants": [
            {
              "id": "telescope-4a",
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
              "id": "telescope-4b",
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
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "8 wandelgroepen hebben elk 8 wandelaars. Hoeveel wandelaars zijn dat samen?",
              "answer": 64,
              "hintMinnie": "Zoek 8 gelijke groepjes van 8.",
              "hintMoose": "Reken 8 × 8 stap voor stap.",
              "explanation": "8 × 8 = 64."
            },
            {
              "id": "deer-statue-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 7 rijen met telkens 9 wandelaars. Hoeveel wandelaars zijn dat?",
              "answer": 63,
              "choices": [
                59,
                63,
                67,
                71
              ],
              "hintMinnie": "Denk aan 7 groepjes van 9.",
              "hintMoose": "Vermenigvuldig 7 met 9.",
              "explanation": "7 × 9 = 63."
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
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "72 wandelaars worden eerlijk verdeeld over 8 wandelgroepen. Hoeveel krijgt elke groep?",
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
              "id": "deer-statue-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 56 wandelaars. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 8,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 56 gedeeld door 7.",
              "explanation": "56 : 7 = 8."
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
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 6 hertenkaarten voor €5 per stuk. Hoeveel euro betaalt hij?",
              "answer": 30,
              "hintMinnie": "Elk stuk kost €5.",
              "hintMoose": "Reken 6 × 5.",
              "explanation": "6 × €5 = €30."
            },
            {
              "id": "deer-statue-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs het Hertenbeeld is 64 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "deer-statue-slot-4",
          "variants": [
            {
              "id": "deer-statue-4a",
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
              "id": "deer-statue-4b",
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
    player: { startNode: "left-start", start: { x: 220, y: 600 } },
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
