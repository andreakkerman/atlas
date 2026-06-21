window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

const learningChallengesLVL0004 = [
  {
    "id": "harborMap",
    "anchorId": "harborMap",
    "challengeCharacterId": "captain-nemo",
    "questions": [
      {
        "id": "harborMap-slot-1",
        "variants": [
          {
            "id": "harborMap-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "63 : 9 = ?",
            "answer": 7,
            "hintMinnie": "Welke som uit de tafel van 9 helpt?",
            "hintMoose": "Omdat 9 × 7 = 63, is 63 : 9 = 7.",
            "explanation": "63 : 9 = 7."
          },
          {
            "id": "harborMap-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "56 : 8 = ?",
            "answer": 7,
            "choices": [
              6,
              7,
              8,
              9
            ],
            "hintMinnie": "Welke som uit de tafel van 8 helpt?",
            "hintMoose": "Omdat 8 × 7 = 56, is 56 : 8 = 7.",
            "explanation": "56 : 8 = 7."
          }
        ]
      },
      {
        "id": "harborMap-slot-2",
        "variants": [
          {
            "id": "harborMap-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "7 × 7 = ?",
            "answer": 49,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 7 en 2 × 7.",
            "explanation": "7 × 7 = 49."
          },
          {
            "id": "harborMap-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Nemo legt bij Havenkaart 7 groepjes van 6 routefiches. Hoeveel routefiches zijn dat samen?",
            "answer": 42,
            "choices": [
              36,
              42,
              48,
              54
            ],
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 7 en tel nog 7 erbij.",
            "explanation": "7 × 6 = 42."
          }
        ]
      },
      {
        "id": "harborMap-slot-3",
        "variants": [
          {
            "id": "harborMap-3a",
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
            "id": "harborMap-3b",
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
        "id": "harborMap-slot-4",
        "variants": [
          {
            "id": "harborMap-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Nemo legt bij Havenkaart 9 groepjes van 5 routefiches. Hoeveel routefiches zijn dat samen?",
            "answer": 45,
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 9 sprongen van 5.",
            "explanation": "9 × 5 = 45."
          },
          {
            "id": "harborMap-4b",
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
    "id": "brassTelescope",
    "anchorId": "brassTelescope",
    "challengeCharacterId": "captain-nemo",
    "questions": [
      {
        "id": "brassTelescope-slot-1",
        "variants": [
          {
            "id": "brassTelescope-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "4 × 6 = ?",
            "answer": 24,
            "choices": [
              18,
              24,
              30,
              36
            ],
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 4 en tel nog 4 erbij.",
            "explanation": "4 × 6 = 24."
          },
          {
            "id": "brassTelescope-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "3 × 4 = ?",
            "answer": 12,
            "hintMinnie": "Denk aan de tafel van 4.",
            "hintMoose": "Verdubbel 3 twee keer.",
            "explanation": "3 × 4 = 12."
          }
        ]
      },
      {
        "id": "brassTelescope-slot-2",
        "variants": [
          {
            "id": "brassTelescope-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "49 : 7 = ?",
            "answer": 7,
            "hintMinnie": "Welke som uit de tafel van 7 helpt?",
            "hintMoose": "Omdat 7 × 7 = 49, is 49 : 7 = 7.",
            "explanation": "49 : 7 = 7."
          },
          {
            "id": "brassTelescope-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "9 × 8 = ?",
            "answer": 72,
            "choices": [
              64,
              72,
              80,
              88
            ],
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 9 en verdubbel dat.",
            "explanation": "9 × 8 = 72."
          }
        ]
      },
      {
        "id": "brassTelescope-slot-3",
        "variants": [
          {
            "id": "brassTelescope-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "2 × 8 = ?",
            "answer": 16,
            "choices": [
              8,
              16,
              24,
              32
            ],
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 2 en verdubbel dat.",
            "explanation": "2 × 8 = 16."
          },
          {
            "id": "brassTelescope-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Nemo legt bij Koperen kijker 5 groepjes van 10 kijkkaarten. Hoeveel kijkkaarten zijn dat samen?",
            "answer": 50,
            "hintMinnie": "Denk aan de tafel van 10.",
            "hintMoose": "5 groepjes van 10 eindigen op nul.",
            "explanation": "5 × 10 = 50."
          }
        ]
      },
      {
        "id": "brassTelescope-slot-4",
        "variants": [
          {
            "id": "brassTelescope-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Nemo legt bij Koperen kijker 9 groepjes van 5 kijkkaarten. Hoeveel kijkkaarten zijn dat samen?",
            "answer": 45,
            "choices": [
              40,
              45,
              50,
              55
            ],
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 9 sprongen van 5.",
            "explanation": "9 × 5 = 45."
          },
          {
            "id": "brassTelescope-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Nemo legt bij Koperen kijker 3 groepjes van 6 kijkkaarten. Hoeveel kijkkaarten zijn dat samen?",
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
    "id": "nautilusLight",
    "anchorId": "nautilusLight",
    "challengeCharacterId": "captain-nemo",
    "questions": [
      {
        "id": "nautilusLight-slot-1",
        "variants": [
          {
            "id": "nautilusLight-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "money",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Nemo koopt 8 havenkaarten voor 10 euro per stuk. Hoeveel euro betaalt hij?",
            "answer": 80,
            "hintMinnie": "Elk kaartje kost 10 euro.",
            "hintMoose": "8 groepjes van 10 eindigen op nul.",
            "explanation": "8 × 10 = 80 euro."
          },
          {
            "id": "nautilusLight-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "7 × 8 = ?",
            "answer": 56,
            "hintMinnie": "Denk aan de tafel van 8.",
            "hintMoose": "Reken 4 × 7 en verdubbel dat.",
            "explanation": "7 × 8 = 56."
          }
        ]
      },
      {
        "id": "nautilusLight-slot-2",
        "variants": [
          {
            "id": "nautilusLight-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "64 : 8 = ?",
            "answer": 8,
            "hintMinnie": "Welke som uit de tafel van 8 helpt?",
            "hintMoose": "Omdat 8 × 8 = 64, is 64 : 8 = 8.",
            "explanation": "64 : 8 = 8."
          },
          {
            "id": "nautilusLight-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "4 × 3 = ?",
            "answer": 12,
            "choices": [
              9,
              12,
              15,
              18
            ],
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 4 en tel nog 4 erbij.",
            "explanation": "4 × 3 = 12."
          }
        ]
      },
      {
        "id": "nautilusLight-slot-3",
        "variants": [
          {
            "id": "nautilusLight-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "route",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "De route bij Nautiluslamp is 16 meter lang en heeft 8 gelijke stukken. Hoeveel meter is elk stuk?",
            "answer": 2,
            "hintMinnie": "Verdeel de route in gelijke stukken.",
            "hintMoose": "Omdat 8 × 2 = 16, is 16 : 8 = 2.",
            "explanation": "16 : 8 = 2 meter."
          },
          {
            "id": "nautilusLight-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Nemo legt bij Nautiluslamp 9 groepjes van 6 lichtfiches. Hoeveel lichtfiches zijn dat samen?",
            "answer": 54,
            "hintMinnie": "Denk aan de tafel van 6.",
            "hintMoose": "Reken 5 × 9 en tel nog 9 erbij.",
            "explanation": "9 × 6 = 54."
          }
        ]
      },
      {
        "id": "nautilusLight-slot-4",
        "variants": [
          {
            "id": "nautilusLight-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "3 × 7 = ?",
            "answer": 21,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 3 en 2 × 3.",
            "explanation": "3 × 7 = 21."
          },
          {
            "id": "nautilusLight-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "40 : 8 = ?",
            "answer": 5,
            "choices": [
              4,
              5,
              6,
              7
            ],
            "hintMinnie": "Welke som uit de tafel van 8 helpt?",
            "hintMoose": "Omdat 8 × 5 = 40, is 40 : 8 = 5.",
            "explanation": "40 : 8 = 5."
          }
        ]
      }
    ]
  }
];

window.SVEN_LEVEL_DEFINITIONS["LVL-0004"] = {
  id: "LVL-0004",
  title: "De Nautilus",
  subtitle: "Duik in een geheim avontuur met de Nautilus.",
  description: "Sven vindt de Nautilus in een tropische haven en zoekt een weg aan boord.",
  storageKey: "svenadventure-nautilus-haven-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "boardingGate",
  exitActionLabel: "Aan boord",
  challengeLabel: "Nautilusproef",
  challengeCompleteLabel: "Maak de toegang klaar",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "proeven",
  menu: {
    illustration: "Levels/LVL-0004/assets/nautilus-harbor.png",
    badge: "4 plekken",
    detail: "Een tropische haven en een mysterieuze duikboot"
  },
  companion: {
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0004/assets/captain-nemo.png"
  },
  challengeCharacter: {
    id: "captain-nemo",
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0004/assets/captain-nemo.png",
    role: "kapitein van de Nautilus"
  },
  guides: {
    minnie: {
      name: "Minnie",
      portrait: "assets/guides/minnie.png"
    },
    moose: {
      name: "Moose",
      portrait: "assets/guides/moose.png"
    }
  },
  world: {
    width: 2172,
    height: 724,
    aspectRatio: 3,
    viewportWidth: 1000,
    background: "Levels/LVL-0004/assets/nautilus-harbor.png"
  },
  challengeArt: "Levels/LVL-0004/assets/captain-nemo.png",
  player: {
    startNode: "harbor-start",
    start: { x: 259, y: 564 }
  },
  interactiveObjects: [
    {
      id: "harborMap",
      type: "rune",
      center: { x: 690, y: 460 },
      radius: 76,
      approachNode: "map-approach",
      label: "Havenkaart"
    },
    {
      id: "brassTelescope",
      type: "rune",
      center: { x: 815, y: 360 },
      radius: 72,
      approachNode: "telescope-approach",
      label: "Koperen kijker"
    },
    {
      id: "nautilusLight",
      type: "rune",
      center: { x: 1420, y: 397 },
      radius: 84,
      approachNode: "nautilus-light-approach",
      label: "Nautiluslamp"
    },
    {
      id: "boardingGate",
      type: "gate",
      center: { x: 1611, y: 459 },
      radius: 100,
      approachNode: "boarding-gate-approach",
      label: "Steigerpoort"
    }
  ],
  walkPath: [
    { id: "harbor-start", x: 259, y: 564 },
    { id: "map-approach", x: 640, y: 600, role: "approach" },
    { id: "telescope-approach", x: 807, y: 593, role: "approach" },
    { id: "dock-center", x: 1080, y: 585 },
    { id: "nautilus-light-approach", x: 1348, y: 575, role: "approach" },
    { id: "boarding-gate-approach", x: 1608, y: 585, role: "approach" },
    { id: "right-cave-path", x: 1835, y: 620 }
  ],
  intro: [
    "Sven vindt een geheime haven.",
    "In het water ligt de Nautilus.",
    "Kapitein Nemo laat niemand zomaar aan boord."
  ],
  spiritName: "Kapitein Nemo",
  spiritLines: {
    welcome: "Welkom bij de Nautilus.",
    chooseRune: "Onderzoek de havenproeven.",
    moving: "Het water klotst tegen de steiger.",
    allRunes: "De Nautilus is klaar om Sven aan boord te laten.",
    reward: "De steigerpoort gaat open."
  },
  guideLines: {
    welcome: {
      speaker: "minnie",
      text: "Oeh, daar ligt een echte duikboot."
    },
    start: {
      speaker: "minnie",
      text: "Ik zie kaarten, koper en blauw licht."
    },
    moving: {
      speaker: "moose",
      text: "Rustig langs het water. Die steiger is oud."
    },
    harbor: {
      speaker: "moose",
      text: "Die duikboot wacht niet op slordige stappen."
    },
    object: {
      speaker: "minnie",
      text: "Oeh, koper en blauw licht. Dat moet iets doen."
    },
    allRunes: {
      speaker: "moose",
      text: "Alles klopt. Sven mag naar de Nautilus."
    },
    reward: {
      speaker: "moose",
      text: "Aan boord gaan, maar voorzichtig."
    }
  },
  levelSemantics: {
    setting: "een tropische haven met de Nautilus aan de steiger",
    mood: "zonnig, geheimzinnig en technisch",
    companionFocus: {
      minnie: "blauw licht, koper, kaarten en de duikboot",
      moose: "oude steigers, diep water en veilige toegang"
    }
  },
  companionMoments: [
    {
      id: "nautilus-harbor-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Oeh, de Nautilus glanst alsof hij ons al ziet."
    },
    {
      id: "nautilus-harbor-map-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "harborMap",
      speaker: "minnie",
      text: "Die havenkaart zit vol lijnen. Welke route hoort bij de Nautilus?"
    },
    {
      id: "nautilus-telescope-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "brassTelescope",
      speaker: "moose",
      text: "Een koperen kijker. Handig, zolang niemand naar meeuwen telt."
    },
    {
      id: "nautilus-light-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "nautilusLight",
      speaker: "minnie",
      text: "Dat blauwe licht knippert in een patroon. Ik wil het weten."
    },
    {
      id: "nautilus-harbor-solved",
      event: "CHALLENGE_SUCCESS",
      speaker: "moose",
      text: "Die is geregeld. Nemo houdt van netjes."
    },
    {
      id: "nautilus-harbor-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "minnie",
      text: "Mooi! De Nautilus geeft steeds meer licht."
    },
    {
      id: "nautilus-harbor-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "De steigerpoort blijft dicht. Eerst nog {remaining} havenproeven."
    },
    {
      id: "nautilus-harbor-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "Alles klopt. Sven mag naar de Nautilus."
    },
    {
      id: "nautilus-harbor-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "minnie",
      text: "Aan boord! Ik wil elk raam zien."
    }
  ],
  areas: [
    { id: "harbor", name: "Nautilushaven", start: 0, end: 2172, guideLine: "harbor" }
  ],
  hotspots: [
    {
      id: "boardingGate",
      objectId: "boardingGate",
      type: "gate",
      name: "Steigerpoort",
      defaultAction: "activate",
      look: "Een poort naar de steiger. Hij opent pas na drie havenproeven.",
      activate: "De poort naar de Nautilus gaat open."
    }
  ],
  learningChallenges: learningChallengesLVL0004,
  runes: [
    {
      id: "harborMap",
      objectId: "harborMap",
      name: "Havenkaart",
      shortName: "Kaart",
      defaultAction: "activate",
      intro: "Op de kaart staan routes naar de steiger.",
      prompt: "Tel de routepunten op de kaart.",
      solved: "Mooi! De kaart wijst naar de Nautilus.",
      challengeId: "harborMap"
    },
    {
      id: "brassTelescope",
      objectId: "brassTelescope",
      name: "Koperen kijker",
      shortName: "Kijker",
      defaultAction: "activate",
      intro: "De kijker staat gericht op de duikboot.",
      prompt: "Tel de lichtjes die Sven ziet.",
      solved: "Goed zo! De kijker vindt de ingang.",
      challengeId: "brassTelescope"
    },
    {
      id: "nautilusLight",
      objectId: "nautilusLight",
      name: "Nautiluslamp",
      shortName: "Lamp",
      defaultAction: "activate",
      intro: "De blauwe lamp pulseert zacht.",
      prompt: "Tel de pulsen van de Nautilus.",
      solved: "Sterk! De Nautilus geeft antwoord.",
      challengeId: "nautilusLight"
    }
  ],
  reward: {
    title: "De poort naar de Nautilus opent!",
    badge: "Nautilus Verkenner",
    line: "Sven loste de havenproeven op. Nu mag hij aan boord.",
    art: "Levels/LVL-0004/assets/nautilus-harbor.png",
    nextLevelId: "LVL-0005",
    nextLabel: "Aan boord"
  }
};
