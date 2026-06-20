window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0013/assets/nederland.png";
  const challengerAsset = "Levels/LVL-0013/assets/atlas-de-reiziger.png";
  const learningChallenges = [
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
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "4 wieken hebben elk 8 linten. Hoeveel linten zijn dat samen?",
              "answer": 32,
              "hintMinnie": "Zoek 4 gelijke groepjes van 8.",
              "hintMoose": "Reken 4 × 8 stap voor stap.",
              "explanation": "4 × 8 = 32."
            },
            {
              "id": "windmill-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 6 rijen met telkens 5 linten. Hoeveel linten zijn dat?",
              "answer": 30,
              "choices": [
                26,
                30,
                34,
                38
              ],
              "hintMinnie": "Denk aan 6 groepjes van 5.",
              "hintMoose": "Vermenigvuldig 6 met 5.",
              "explanation": "6 × 5 = 30."
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
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "48 linten worden eerlijk verdeeld over 6 wieken. Hoeveel krijgt elke groep?",
              "answer": 8,
              "choices": [
                6,
                8,
                10,
                12
              ],
              "hintMinnie": "Verdeel 48 in 6 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 6 precies 48 is.",
              "explanation": "48 : 6 = 8."
            },
            {
              "id": "windmill-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 56 linten. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 8,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 56 gedeeld door 7.",
              "explanation": "56 : 7 = 8."
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
              "prompt": "Atlas koopt 5 zakjes tulpenbollen voor €4 per stuk. Hoeveel euro betaalt hij?",
              "answer": 20,
              "hintMinnie": "Elk stuk kost €4.",
              "hintMoose": "Reken 5 × 4.",
              "explanation": "5 × €4 = €20."
            },
            {
              "id": "windmill-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Windmolen is 72 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "windmill-slot-4",
          "variants": [
            {
              "id": "windmill-4a",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "bare_multiplication",
              "presentation": "bare",
              "answerMode": "open",
              "prompt": "7 × 8 = ?",
              "answer": 56,
              "hintMinnie": "Splits 7 in handige delen.",
              "hintMoose": "Reken 7 groepjes van 8.",
              "explanation": "7 × 8 = 56."
            },
            {
              "id": "windmill-4b",
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
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "6 planken hebben elk 9 kazen. Hoeveel kazen zijn dat samen?",
              "answer": 54,
              "hintMinnie": "Zoek 6 gelijke groepjes van 9.",
              "hintMoose": "Reken 6 × 9 stap voor stap.",
              "explanation": "6 × 9 = 54."
            },
            {
              "id": "cheese-cart-1b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "multiplication",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "Atlas ziet 7 rijen met telkens 6 kazen. Hoeveel kazen zijn dat?",
              "answer": 42,
              "choices": [
                38,
                42,
                46,
                50
              ],
              "hintMinnie": "Denk aan 7 groepjes van 6.",
              "hintMoose": "Vermenigvuldig 7 met 6.",
              "explanation": "7 × 6 = 42."
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
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "48 kazen worden eerlijk verdeeld over 6 planken. Hoeveel krijgt elke groep?",
              "answer": 8,
              "choices": [
                6,
                8,
                10,
                12
              ],
              "hintMinnie": "Verdeel 48 in 6 gelijke groepjes.",
              "hintMoose": "Zoek welk getal keer 6 precies 48 is.",
              "explanation": "48 : 6 = 8."
            },
            {
              "id": "cheese-cart-2b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "division_grouping",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Er zijn 63 kazen. In elke groep passen er 7. Hoeveel groepen zijn nodig?",
              "answer": 9,
              "hintMinnie": "Maak groepjes van 7.",
              "hintMoose": "Reken 63 gedeeld door 7.",
              "explanation": "63 : 7 = 9."
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
              "family": "money",
              "presentation": "story",
              "answerMode": "open",
              "prompt": "Atlas koopt 4 stukken kaas voor €6 per stuk. Hoeveel euro betaalt hij?",
              "answer": 24,
              "hintMinnie": "Elk stuk kost €6.",
              "hintMoose": "Reken 4 × 6.",
              "explanation": "4 × €6 = €24."
            },
            {
              "id": "cheese-cart-3b",
              "domain": "math",
              "schoolBand": "E5-intended",
              "family": "route_division",
              "presentation": "story",
              "answerMode": "multipleChoice",
              "prompt": "De route langs de Kaaswagen is 64 meter en heeft 8 gelijke stukken. Hoe lang is elk stuk?",
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
          "id": "cheese-cart-slot-4",
          "variants": [
            {
              "id": "cheese-cart-4a",
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
              "id": "cheese-cart-4b",
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
  ];
  const challenges = [
    {
      id: "windmill", name: "Windmolen", shortName: "Molen", center: { x: 505, y: 215 }, radius: 92,
      approachNode: "windmill-approach", intro: "De wieken draaien boven de tulpen.",
      prompt: "Tel de slagen van de wieken.", solved: "Mooi! De molen draait precies goed.",
      attention: "Die molen zwaait met vier grote armen. Volgens mij telt hij mee.",
      already: "De molen draait al keurig. Nog een zetje wordt vooral veel wind."
    },
    {
      id: "cheeseCart", name: "Kaaswagen", shortName: "Kaas", center: { x: 835, y: 430 }, radius: 88,
      approachNode: "cheese-approach", intro: "Gele kazen liggen netjes opgestapeld.",
      prompt: "Tel de rijen kaas.", solved: "Goed zo! De kaaswagen is klaar voor vertrek.",
      attention: "Al die kazen staan in keurige stapels. Daar verstopt zich vast een som.",
      already: "De kaas ligt al op volgorde. Zelfs Moose zou niets meer verschuiven."
    },
    {
      id: "canalClock", name: "Grachtenklok", shortName: "Klok", center: { x: 1575, y: 285 }, radius: 66,
      approachNode: "clock-approach", intro: "De groene klok tikt naast het water.",
      prompt: "Tel de tikken van de klok.", solved: "Sterk! De klok wijst de reisroute aan.",
      attention: "Die klok kijkt over de gracht alsof hij precies weet wanneer we weggaan.",
      already: "De klok loopt al op tijd. Dat gebeurt niet vaak op een groot avontuur."
    }
  ];
  const exit = {
    id: "travelGate", type: "gate", center: { x: 2035, y: 390 }, radius: 112,
    approachNode: "gate-approach", label: "Reispoort"
  };

  window.SVEN_LEVEL_DEFINITIONS["LVL-0013"] = {
    id: "LVL-0013",
    title: "Nederland — Het Begin van de Reis",
    subtitle: "De Europese reis begint tussen molens, kaas en grachten.",
    description: "Sven vertrekt uit Nederland voor een grote reis door Europa.",
    storageKey: "atlas-europa-nederland-v1",
    progressKey: "svenadventure-table-progress-v1",
    exitHotspotId: exit.id,
    exitActionLabel: "Naar Engeland",
    challengeLabel: "Reisproef",
    challengeCompleteLabel: "Maak de route klaar",
    choiceHint: "Kies het juiste antwoord.",
    progressLabelPlural: "reistekens",
    menu: {
      illustration: asset,
      badge: "Nieuw avontuur",
      detail: "Molens, wereldsteden, fjorden en de Posbank"
    },
    companion: { name: "Europakaart", portrait: asset },
    challengeCharacter: { id: "atlas-de-reiziger", name: "Atlas de Reiziger", portrait: challengerAsset, role: "reisgids" },
    guides: {
      minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
      moose: { name: "Moose", portrait: "assets/guides/moose.png" }
    },
    world: { width: 2172, height: 724, aspectRatio: 3, viewportWidth: 1000, background: asset },
    challengeArt: challengerAsset,
    learningChallenges,
    player: { startNode: "left-start", start: { x: 225, y: 600 } },
    interactiveObjects: [
    {
      id: "windmill",
      type: "rune",
      center: { x: 540, y: 210 },
      radius: 92,
      approachNode: "windmill-approach",
      label: "Windmolen"
    },
    {
      id: "cheeseCart",
      type: "rune",
      center: { x: 869, y: 435 },
      radius: 88,
      approachNode: "cheese-approach",
      label: "Kaaswagen"
    },
    {
      id: "canalClock",
      type: "rune",
      center: { x: 1663, y: 296 },
      radius: 44,
      approachNode: "clock-approach",
      label: "Grachtenklok"
    },
    {
      id: "travelGate",
      type: "gate",
      center: { x: 2018, y: 468 },
      radius: 86,
      approachNode: "gate-approach",
      label: "Reispoort"
    }
  ],
    walkPath: [
    { id: "left-start", x: 225, y: 600 },
    { id: "windmill-approach", x: 518, y: 597, role: "approach" },
    { id: "cheese-approach", x: 840, y: 606, role: "approach" },
    { id: "bridge-path", x: 1150, y: 590 },
    { id: "clock-approach", x: 1638, y: 595, role: "approach" },
    { id: "gate-approach", x: 2001, y: 580, role: "approach" }
  ],
    intro: [
      "De reis begint in Nederland.",
      "Langs de gracht wachten drie reistekens.",
      "Achter de poort ligt Engeland."
    ],
    spiritName: "Europakaart",
    spiritLines: {
      welcome: "De grote reis begint.",
      chooseRune: "Onderzoek de reistekens.",
      moving: "De straat langs de gracht ligt open.",
      allRunes: "De reispoort is klaar.",
      reward: "Engeland wacht."
    },
    guideLines: {
      welcome: { speaker: "minnie", text: "We beginnen tussen tulpen en water. Dat voelt meteen als reizen." },
      moving: { speaker: "moose", text: "Droge stenen, duidelijke poort. Prima vertrekpunt." },
      route: { speaker: "minnie", text: "De gracht wijst ons dwars door de stad." },
      allRunes: { speaker: "moose", text: "De reispoort is klaar. Engeland is de volgende halte." },
      reward: { speaker: "minnie", text: "De eerste grens komt eraan!" }
    },
    levelSemantics: {
      setting: "een Nederlandse gracht met molen, kaaswagen en tulpen",
      mood: "warm, nieuwsgierig en klaar voor vertrek",
      companionFocus: {
        minnie: "draaiende wieken, tulpen en spiegelend grachtenwater",
        moose: "de stevige brug, de route en de reispoort"
      }
    },
    companionMoments: [
      { id: "nl-enter", event: "LEVEL_ENTER", speaker: "minnie", text: "Tulpen, water en een molen. De reis begint meteen mooi." },
      ...challenges.map((item) => ({
        id: `nl-${item.id}-attention`, event: "HOTSPOT_ATTENTION_FIRST",
        challengeId: item.id, speaker: "minnie", text: item.attention
      })),
      ...challenges.map((item) => ({
        id: `nl-${item.id}-solved`, event: "CHALLENGE_SUCCESS",
        challengeId: item.id, speaker: "moose", text: item.already
      })),
      { id: "nl-progress", event: "LEVEL_PROGRESS_MILESTONE", speaker: "minnie", text: "De route krijgt kleur. Engeland komt dichterbij." },
      { id: "nl-blocked", event: "EXIT_BLOCKED", speaker: "moose", text: "De reispoort wacht nog op {remaining} reistekens. De poort is geduldig. Ik ook." },
      { id: "nl-unlocked", event: "PATH_UNLOCKED", speaker: "moose", text: "De reispoort is klaar. Engeland is de volgende halte." },
      { id: "nl-complete", event: "ADVENTURE_COMPLETE", speaker: "minnie", text: "Dag Nederland! Op naar de oude klokkenstad." }
    ],
    areas: [{ id: "route", name: "Nederland", start: 0, end: 2172, guideLine: "route" }],
    hotspots: [{
      id: exit.id, objectId: exit.id, type: "gate", name: "Reispoort",
      defaultAction: "activate", look: "De poort leidt naar Engeland.", activate: "De reis naar Engeland begint."
    }],
    runes: challenges.map((item) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, challengeId: item.id
    })),
    reward: {
      title: "De reis is begonnen!",
      badge: "Europareiziger",
      line: "Sven vond de eerste route en kan door naar Engeland.",
      art: asset,
      nextLevelId: "LVL-0014",
      nextLabel: "Naar Engeland"
    }
  };
})();
