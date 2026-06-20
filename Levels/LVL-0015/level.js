window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0015/assets/frankrijk.png";
  const challengerAsset = "Levels/LVL-0015/assets/atlas-de-reiziger.png";
  const learningChallenges = [
    {
      "id": "marketStall",
      "anchorId": "marketStall",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "market-stall-slot-1",
          "variants": [
            {
              "id": "market-stall-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "6 kratten hebben elk 8 sinaasappels. Hoeveel sinaasappels zijn dat samen?",
              "answer": 48,
              "hintMinnie": "Zoek 6 gelijke groepjes van 8.",
              "hintMoose": "Reken 6 × 8 stap voor stap.",
              "explanation": "6 × 8 = 48."
            },
            {
              "id": "market-stall-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 7 rijen met telkens 7 sinaasappels. Hoeveel sinaasappels zijn dat?",
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
          "id": "market-stall-slot-2",
          "variants": [
            {
              "id": "market-stall-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "56 sinaasappels worden eerlijk verdeeld over 7 kratten. Hoeveel krijgt elke groep?",
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
              "id": "market-stall-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 63 sinaasappels. In elke groep passen er 9. Hoeveel groepen zijn nodig?",
              "answer": 7,
              "hintMinnie": "Maak groepjes van 9.",
              "hintMoose": "Reken 63 gedeeld door 9.",
              "explanation": "63 : 9 = 7."
            }
          ]
        },
        {
          "id": "market-stall-slot-3",
          "variants": [
            {
              "id": "market-stall-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 5 fruitmandjes voor €6 per stuk. Hoeveel euro betaalt hij?",
              "answer": 30,
              "hintMinnie": "Elk stuk kost €6.",
              "hintMoose": "Reken 5 × 6.",
              "explanation": "5 × €6 = €30."
            },
            {
              "id": "market-stall-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Marktkraam is 72 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "market-stall-slot-4",
          "variants": [
            {
              "id": "market-stall-4a",
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
              "id": "market-stall-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_division",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "64 : 8 = ?",
              "answer": 8,
              "choices": [
                5,
                8,
                11,
                14
              ],
              "hintMinnie": "Zoek welk getal keer 8 gelijk is aan 64.",
              "hintMoose": "Verdeel 64 in groepjes van 8.",
              "explanation": "64 : 8 = 8."
            }
          ]
        }
      ]
    },
    {
      "id": "villageClock",
      "anchorId": "villageClock",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "village-clock-slot-1",
          "variants": [
            {
              "id": "fr-clock-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Tien over drie",
              "choices": [
                "Vijf over drie",
                "Tien over drie",
                "Tien voor drie",
                "Kwart over drie"
              ],
              "visual": {
                "type": "clock",
                "hour": 3,
                "minute": 10
              },
              "hintMinnie": "Kijk eerst naar de grote wijzer.",
              "hintMoose": "De grote wijzer op de 2 betekent tien over. De kleine wijzer staat net na de 3.",
              "explanation": "Het is tien over drie."
            },
            {
              "id": "fr-clock-1b",
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
              "hintMinnie": "Elk cijfer is vijf minuten.",
              "hintMoose": "De grote wijzer staat op de 1: vijf minuten na zes.",
              "explanation": "Het is vijf over zes."
            }
          ]
        },
        {
          "id": "village-clock-slot-2",
          "variants": [
            {
              "id": "fr-clock-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Twintig over acht",
              "choices": [
                "Twintig voor acht",
                "Kwart over acht",
                "Twintig over acht",
                "Half negen"
              ],
              "visual": {
                "type": "clock",
                "hour": 8,
                "minute": 20
              },
              "hintMinnie": "De grote wijzer staat op de 4.",
              "hintMoose": "Vier keer vijf minuten is twintig over.",
              "explanation": "Het is twintig over acht."
            },
            {
              "id": "fr-clock-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf voor half twee",
              "choices": [
                "Vijf over één",
                "Vijf voor half twee",
                "Vijf over half twee",
                "Half twee"
              ],
              "visual": {
                "type": "clock",
                "hour": 1,
                "minute": 25
              },
              "hintMinnie": "De grote wijzer staat op de 5.",
              "hintMoose": "Vijf minuten voor het halve uur zeg je vijf voor half twee.",
              "explanation": "Het is vijf voor half twee."
            }
          ]
        },
        {
          "id": "village-clock-slot-3",
          "variants": [
            {
              "id": "fr-clock-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Twintig voor zes",
              "choices": [
                "Twintig over vijf",
                "Half zes",
                "Twintig voor zes",
                "Tien voor zes"
              ],
              "visual": {
                "type": "clock",
                "hour": 5,
                "minute": 40
              },
              "hintMinnie": "De grote wijzer staat op de 8.",
              "hintMoose": "Vanaf de 8 zijn het nog twintig minuten tot zes.",
              "explanation": "Het is twintig voor zes."
            },
            {
              "id": "fr-clock-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf over half tien",
              "choices": [
                "Vijf voor half tien",
                "Half tien",
                "Vijf over half tien",
                "Vijf voor tien"
              ],
              "visual": {
                "type": "clock",
                "hour": 9,
                "minute": 35
              },
              "hintMinnie": "De grote wijzer is net voorbij de 6.",
              "hintMoose": "Op de 7 is het vijf minuten na half tien.",
              "explanation": "Het is vijf over half tien."
            }
          ]
        },
        {
          "id": "village-clock-slot-4",
          "variants": [
            {
              "id": "fr-clock-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Tien voor twaalf",
              "choices": [
                "Tien over elf",
                "Vijf voor twaalf",
                "Tien voor twaalf",
                "Twaalf uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 11,
                "minute": 50
              },
              "hintMinnie": "De grote wijzer staat op de 10.",
              "hintMoose": "Vanaf de 10 zijn het nog tien minuten tot twaalf.",
              "explanation": "Het is tien voor twaalf."
            },
            {
              "id": "fr-clock-4b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "clock_reading_five_minutes",
              "presentation": "bare",
              "answerMode": "multipleChoice",
              "prompt": "Hoe laat is het?",
              "answer": "Vijf voor drie",
              "choices": [
                "Vijf over twee",
                "Tien voor drie",
                "Vijf voor drie",
                "Drie uur"
              ],
              "visual": {
                "type": "clock",
                "hour": 2,
                "minute": 55
              },
              "hintMinnie": "De grote wijzer staat op de 11.",
              "hintMoose": "Vanaf de 11 duurt het nog vijf minuten tot drie.",
              "explanation": "Het is vijf voor drie."
            }
          ]
        }
      ]
    },
    {
      "id": "fountain",
      "anchorId": "fountain",
      "challengeCharacterId": "atlas-de-reiziger",
      "questions": [
        {
          "id": "fountain-slot-1",
          "variants": [
            {
              "id": "fountain-1a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "6 waterstralen hebben elk 9 druppels. Hoeveel druppels zijn dat samen?",
              "answer": 54,
              "hintMinnie": "Zoek 6 gelijke groepjes van 9.",
              "hintMoose": "Reken 6 × 9 stap voor stap.",
              "explanation": "6 × 9 = 54."
            },
            {
              "id": "fountain-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 8 rijen met telkens 7 druppels. Hoeveel druppels zijn dat?",
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
          "id": "fountain-slot-2",
          "variants": [
            {
              "id": "fountain-2a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "54 druppels worden eerlijk verdeeld over 6 waterstralen. Hoeveel krijgt elke groep?",
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
              "id": "fountain-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 64 druppels. In elke groep passen er 8. Hoeveel groepen zijn nodig?",
              "answer": 8,
              "hintMinnie": "Maak groepjes van 8.",
              "hintMoose": "Reken 64 gedeeld door 8.",
              "explanation": "64 : 8 = 8."
            }
          ]
        },
        {
          "id": "fountain-slot-3",
          "variants": [
            {
              "id": "fountain-3a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 4 fonteinmunten voor €5 per stuk. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Elk stuk kost €5.",
              "hintMoose": "Reken 4 × 5.",
              "explanation": "4 × €5 = €20."
            },
            {
              "id": "fountain-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Dorpsfontein is 63 meter en heeft 7 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "fountain-slot-4",
          "variants": [
            {
              "id": "fountain-4a",
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
              "id": "fountain-4b",
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
    }
  ];
  const challenges = [
    {
      id: "marketStall", name: "Marktkraam", shortName: "Markt", center: { x: 450, y: 430 }, radius: 104,
      approachNode: "market-approach", intro: "Groente en fruit liggen in kleurige rijen.",
      prompt: "Tel de kratten op de markt.", solved: "Mooi! De marktkoopwaar staat goed.",
      attention: "Die markt is bijna een regenboog van groente. Een eetbare regenboog.",
      already: "De kratten staan al netjes. Ik keur deze markt praktisch goed."
    },
    {
      id: "villageClock", name: "Dorpsklok", shortName: "Klok", center: { x: 700, y: 260 }, radius: 70,
      approachNode: "clock-approach", intro: "De dorpsklok luidt boven het plein.",
      prompt: "Tel de slagen van de dorpsklok.", solved: "Goed zo! De klok wijst naar het zuiden.",
      attention: "Die klok kan het hele plein zien. Misschien zag hij onze route ook.",
      already: "De dorpsklok heeft zijn antwoord al. Hij luidt er niet nog eens voor."
    },
    {
      id: "fountain", name: "Dorpsfontein", shortName: "Fontein", center: { x: 940, y: 425 }, radius: 105,
      approachNode: "fountain-approach", intro: "Water danst rond de stenen fontein.",
      prompt: "Tel de waterbogen.", solved: "Sterk! De fontein laat de route glinsteren.",
      attention: "Het water springt precies in patronen. Dat doet een fontein niet zomaar.",
      already: "De fontein stroomt al precies goed. Natte sokken voegen niets toe."
    }
  ];
  const exit = {
    id: "villageGate", type: "gate", center: { x: 2040, y: 405 }, radius: 116,
    approachNode: "gate-approach", label: "Dorpspoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0015"] = {
    id: "LVL-0015",
    title: "Frankrijk — Het Zonnige Dorpsplein",
    subtitle: "Een zonnig plein vol bloemen, marktgeuren en water.",
    description: "Sven vindt op een Frans dorpsplein de route naar Italië.",
    storageKey: "atlas-europa-frankrijk-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Italië",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: { illustration: asset, badge: "Verbonden gebied", detail: "Een zonnig plein tussen bloemen en marktkramen" },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    challengeArt: challengerAsset,
    learningChallenges,
    player: { startNode: "left-start", start: { x: 151, y: 615 } },
    interactiveObjects: [
    {
      id: "marketStall",
      type: "rune",
      center: { x: 446, y: 457 },
      radius: 104,
      approachNode: "market-approach",
      label: "Marktkraam"
    },
    {
      id: "villageClock",
      type: "rune",
      center: { x: 728, y: 267 },
      radius: 31,
      approachNode: "clock-approach",
      label: "Dorpsklok"
    },
    {
      id: "fountain",
      type: "rune",
      center: { x: 950, y: 429 },
      radius: 64,
      approachNode: "fountain-approach",
      label: "Dorpsfontein"
    },
    {
      id: "villageGate",
      type: "gate",
      center: { x: 2035, y: 504 },
      radius: 84,
      approachNode: "gate-approach",
      label: "Dorpspoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 151, y: 615 },
    { id: "market-approach", x: 451, y: 596, role: "approach" },
    { id: "clock-approach", x: 697, y: 607, role: "approach" },
    { id: "fountain-approach", x: 937, y: 621, role: "approach" },
    { id: "square-path", x: 1459, y: 628 },
    { id: "gate-approach", x: 2033, y: 605, role: "approach" }
  ],
    intro: ["Frankrijk ligt te stralen.", "Op het plein wachten drie reistekens.", "De dorpspoort leidt naar Italië."],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "Welkom op het zonnige dorpsplein.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "Het plein ligt open.",
      allRunes: "De dorpspoort is klaar.",
      reward: "Italië wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "Bloemen, fruit en fonteinen. Dit plein pronkt een beetje." },
      moving: { speaker: "moose", text: "Brede stenen en weinig modder. Uitstekend plein." },
      square: { speaker: "minnie", text: "De route verstopt zich tussen alle kleuren." },
      allRunes: { speaker: "moose", text: "De dorpspoort is open. Italië ligt achter de heuvels." },
      reward: { speaker: "minnie", text: "Op naar oude stenen en gelato!" }
    },
    levelSemantics: {
      setting: "een zonnig Frans dorpsplein met markt, klok en fontein",
      mood: "vrolijk, kleurrijk en zomers",
      companionFocus: {
        minnie: "bloemen, waterbogen en kleurige marktkramen",
        moose: "de brede pleinstenen, overzichtelijke route en dorpspoort"
      }
    },
    companionMoments: [
      { id: "fr-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Dit plein heeft bloemen op bijna elke vrije steen. Knap werk." },
      ...challenges.map((item) => ({
        id: `fr-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `fr-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "fr-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De route glinstert nu tussen de bloemen door." },
      { id: "fr-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De dorpspoort mist nog {remaining} reistekens. Hij blijft koppig Frans dicht." },
      { id: "fr-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De dorpspoort is open. Italië ligt achter de heuvels." },
      { id: "fr-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Au revoir, zonnig plein. Italië komt eraan!" }
    ],
    areas: [{ id: "square", name: "Frankrijk", start: 0, end: 2172, guideLine: "square" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Dorpspoort",
      defaultAction: "activate", look: "De poort leidt naar Italië.", activate: "De route naar Italië opent."
    }],
    runes: challenges.map((item) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, challengeId: item.id
    })),
    reward: {
      title: "Het plein geeft de route prijs!",
      badge: "Dorpspleinzoeker",
      line: "Sven vond tussen markt en fontein de weg naar Italië.",
      art: asset, nextLevelId: "LVL-0016", nextLabel: "Naar Italië"
    }
  };
})();
