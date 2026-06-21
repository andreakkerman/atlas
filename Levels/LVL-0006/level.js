window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

const learningChallengesLVL0006 = [
  {
    "id": "divingSuit",
    "anchorId": "divingSuit",
    "challengeCharacterId": "captain-nemo",
    "questions": [
      {
        "id": "divingSuit-slot-1",
        "variants": [
          {
            "id": "divingSuit-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "9 × 3 = ?",
            "answer": 27,
            "hintMinnie": "Denk aan de tafel van 3.",
            "hintMoose": "Reken eerst 2 × 9 en tel nog 9 erbij.",
            "explanation": "9 × 3 = 27."
          },
          {
            "id": "divingSuit-1b",
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
        "id": "divingSuit-slot-2",
        "variants": [
          {
            "id": "divingSuit-2a",
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
            "id": "divingSuit-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Aan 5 duikpakken zitten elk 4 koperen sluitingen. Hoeveel sluitingen zijn dat samen?",
            "answer": 20,
            "hintMinnie": "Er zijn 5 gelijke groepjes. In elk groepje zitten er 4.",
            "hintMoose": "Verdubbel 5 en verdubbel de uitkomst nog eens.",
            "explanation": "5 × 4 = 20."
          }
        ]
      },
      {
        "id": "divingSuit-slot-3",
        "variants": [
          {
            "id": "divingSuit-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Nemo verdeelt 15 koperen sluitingen eerlijk over 3 duikpakken. Hoeveel sluitingen krijgt ieder pak?",
            "answer": 5,
            "hintMinnie": "Verdeel 15 eerlijk over 3 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 3 welk getal uitkomt op 15.",
            "explanation": "15 : 3 = 5."
          },
          {
            "id": "divingSuit-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_division",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Nemo verdeelt 10 koperen sluitingen eerlijk over 2 duikpakken. Hoeveel sluitingen krijgt ieder pak?",
            "answer": 5,
            "hintMinnie": "Verdeel 10 eerlijk over 2 gelijke groepen.",
            "hintMoose": "Zoek in de tafel van 2 welk getal uitkomt op 10.",
            "explanation": "10 : 2 = 5."
          }
        ]
      },
      {
        "id": "divingSuit-slot-4",
        "variants": [
          {
            "id": "divingSuit-4a",
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
            "id": "divingSuit-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Aan 6 duikpakken zitten elk 9 koperen sluitingen. Hoeveel sluitingen zijn dat samen?",
            "answer": 54,
            "choices": [
              45,
              54,
              63,
              72
            ],
            "hintMinnie": "Er zijn 6 gelijke groepjes. In elk groepje zitten er 9.",
            "hintMoose": "Reken 6 × 10 en haal er daarna 6 af.",
            "explanation": "6 × 9 = 54."
          }
        ]
      }
    ]
  },
  {
    "id": "miniSub",
    "anchorId": "miniSub",
    "challengeCharacterId": "captain-nemo",
    "questions": [
      {
        "id": "miniSub-slot-1",
        "variants": [
          {
            "id": "miniSub-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "27 : 3 = ?",
            "answer": 9,
            "choices": [
              8,
              9,
              10,
              11
            ],
            "hintMinnie": "Welke som uit de tafel van 3 helpt?",
            "hintMoose": "Omdat 3 × 9 = 27, is 27 : 3 = 9.",
            "explanation": "27 : 3 = 9."
          },
          {
            "id": "miniSub-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "4 × 5 = ?",
            "answer": 20,
            "hintMinnie": "Denk aan de tafel van 5.",
            "hintMoose": "Tel 4 sprongen van 5.",
            "explanation": "4 × 5 = 20."
          }
        ]
      },
      {
        "id": "miniSub-slot-2",
        "variants": [
          {
            "id": "miniSub-2a",
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
            "id": "miniSub-2b",
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
        "id": "miniSub-slot-3",
        "variants": [
          {
            "id": "miniSub-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "9 × 7 = ?",
            "answer": 63,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 9 en 2 × 9.",
            "explanation": "9 × 7 = 63."
          },
          {
            "id": "miniSub-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "36 : 9 = ?",
            "answer": 4,
            "hintMinnie": "Welke som uit de tafel van 9 helpt?",
            "hintMoose": "Omdat 9 × 4 = 36, is 36 : 9 = 4.",
            "explanation": "36 : 9 = 4."
          }
        ]
      },
      {
        "id": "miniSub-slot-4",
        "variants": [
          {
            "id": "miniSub-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "money",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Nemo koopt 2 reserveonderdelen voor de minisub. Elk onderdeel kost 6 munten. Hoeveel munten betaalt hij?",
            "answer": 12,
            "hintMinnie": "Er zijn 2 gelijke bedragen van 6 munten.",
            "hintMoose": "Reken 2 × 5 en tel er nog 2 bij op.",
            "explanation": "2 × 6 = 12 munten."
          },
          {
            "id": "miniSub-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "6 × 9 = ?",
            "answer": 54,
            "choices": [
              45,
              54,
              63,
              72
            ],
            "hintMinnie": "Denk aan de tafel van 9.",
            "hintMoose": "Reken 10 × 6 en haal 6 eraf.",
            "explanation": "6 × 9 = 54."
          }
        ]
      }
    ]
  },
  {
    "id": "controlPanel",
    "anchorId": "controlPanel",
    "challengeCharacterId": "captain-nemo",
    "questions": [
      {
        "id": "controlPanel-slot-1",
        "variants": [
          {
            "id": "controlPanel-1a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "48 : 8 = ?",
            "answer": 6,
            "hintMinnie": "Welke som uit de tafel van 8 helpt?",
            "hintMoose": "Omdat 8 × 6 = 48, is 48 : 8 = 6.",
            "explanation": "48 : 8 = 6."
          },
          {
            "id": "controlPanel-1b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_multiplication",
            "presentation": "bare",
            "answerMode": "open",
            "prompt": "6 × 7 = ?",
            "answer": 42,
            "hintMinnie": "Denk aan de tafel van 7.",
            "hintMoose": "Reken 5 × 6 en 2 × 6.",
            "explanation": "6 × 7 = 42."
          }
        ]
      },
      {
        "id": "controlPanel-slot-2",
        "variants": [
          {
            "id": "controlPanel-2a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Het bedieningspaneel heeft 4 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?",
            "answer": 16,
            "choices": [
              12,
              16,
              20,
              24
            ],
            "hintMinnie": "Er zijn 4 gelijke groepjes. In elk groepje zitten er 4.",
            "hintMoose": "Verdubbel 4 en verdubbel de uitkomst nog eens.",
            "explanation": "4 × 4 = 16."
          },
          {
            "id": "controlPanel-2b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "bare_division",
            "presentation": "bare",
            "answerMode": "multipleChoice",
            "prompt": "18 : 9 = ?",
            "answer": 2,
            "choices": [
              1,
              2,
              3,
              4
            ],
            "hintMinnie": "Welke som uit de tafel van 9 helpt?",
            "hintMoose": "Omdat 9 × 2 = 18, is 18 : 9 = 2.",
            "explanation": "18 : 9 = 2."
          }
        ]
      },
      {
        "id": "controlPanel-slot-3",
        "variants": [
          {
            "id": "controlPanel-3a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Het bedieningspaneel heeft 9 rijen met elk 7 schakelaars. Hoeveel schakelaars zijn dat samen?",
            "answer": 63,
            "hintMinnie": "Er zijn 9 gelijke groepjes. In elk groepje zitten er 7.",
            "hintMoose": "Reken 9 × 5 en 9 × 2 en tel de uitkomsten op.",
            "explanation": "9 × 7 = 63."
          },
          {
            "id": "controlPanel-3b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "open",
            "prompt": "Het bedieningspaneel heeft 5 rijen met elk 2 schakelaars. Hoeveel schakelaars zijn dat samen?",
            "answer": 10,
            "hintMinnie": "Er zijn 5 gelijke groepjes. In elk groepje zitten er 2.",
            "hintMoose": "Verdubbel 5.",
            "explanation": "5 × 2 = 10."
          }
        ]
      },
      {
        "id": "controlPanel-slot-4",
        "variants": [
          {
            "id": "controlPanel-4a",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Het bedieningspaneel heeft 5 rijen met elk 9 schakelaars. Hoeveel schakelaars zijn dat samen?",
            "answer": 45,
            "choices": [
              36,
              45,
              54,
              63
            ],
            "hintMinnie": "Er zijn 5 gelijke groepjes. In elk groepje zitten er 9.",
            "hintMoose": "Reken 5 × 10 en haal er daarna 5 af.",
            "explanation": "5 × 9 = 45."
          },
          {
            "id": "controlPanel-4b",
            "domain": "math",
            "schoolBand": "E5-intended",
            "family": "story_multiplication",
            "presentation": "story",
            "answerMode": "multipleChoice",
            "prompt": "Het bedieningspaneel heeft 9 rijen met elk 4 schakelaars. Hoeveel schakelaars zijn dat samen?",
            "answer": 36,
            "choices": [
              32,
              36,
              40,
              44
            ],
            "hintMinnie": "Er zijn 9 gelijke groepjes. In elk groepje zitten er 4.",
            "hintMoose": "Verdubbel 9 en verdubbel de uitkomst nog eens.",
            "explanation": "9 × 4 = 36."
          }
        ]
      }
    ]
  }
];

window.SVEN_LEVEL_DEFINITIONS["LVL-0006"] = {
  id: "LVL-0006",
  title: "De Minisub",
  subtitle: "Diep in de Nautilus wacht de kleine onderzeeer.",
  description: "Sven vindt de minisub en maakt het ontsnappingsluik klaar.",
  storageKey: "svenadventure-nautilus-minisub-v1",
  progressKey: "svenadventure-table-progress-v1",
  exitHotspotId: "escapeHatch",
  exitActionLabel: "Ontsnappen",
  challengeLabel: "Hangarproef",
  challengeCompleteLabel: "Maak het luik klaar",
  choiceHint: "Kies het juiste antwoord.",
  progressLabelPlural: "hangarproeven",
  menu: {
    illustration: "Levels/LVL-0006/assets/nautilus-mini-sub.png",
    badge: "Verbonden gebied",
    detail: "Hangar, drukmeters en ontsnappingsluik"
  },
  companion: {
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0006/assets/captain-nemo.png"
  },
  challengeCharacter: {
    id: "captain-nemo",
    name: "Kapitein Nemo",
    portrait: "Levels/LVL-0006/assets/captain-nemo.png",
    role: "kapitein van de Nautilus"
  },
  guides: {
    minnie: { name: "Minnie", portrait: "assets/guides/minnie.png" },
    moose: { name: "Moose", portrait: "assets/guides/moose.png" }
  },
  world: {
    width: 2172,
    height: 724,
    aspectRatio: 3,
    viewportWidth: 1000,
    background: "Levels/LVL-0006/assets/nautilus-mini-sub.png"
  },
  challengeArt: "Levels/LVL-0006/assets/captain-nemo.png",
  player: {
    startNode: "left-door-start",
    start: { x: 219, y: 522 }
  },
  interactiveObjects: [
    {
      id: "divingSuit",
      type: "rune",
      center: { x: 565, y: 328 },
      radius: 78,
      approachNode: "suit-approach",
      label: "Duikpak"
    },
    {
      id: "miniSub",
      type: "rune",
      center: { x: 972, y: 311 },
      radius: 118,
      approachNode: "mini-sub-approach",
      label: "Minisub"
    },
    {
      id: "controlPanel",
      type: "rune",
      center: { x: 1613, y: 326 },
      radius: 82,
      approachNode: "control-panel-approach",
      label: "Drukpaneel"
    },
    {
      id: "escapeHatch",
      type: "gate",
      center: { x: 1953, y: 353 },
      radius: 112,
      approachNode: "hatch-approach",
      label: "Ontsnappingsluik"
    }
  ],
  walkPath: [
    { id: "left-door-start", x: 219, y: 522 },
    { id: "suit-approach", x: 555, y: 475, role: "approach" },
    { id: "hangar-center-left", x: 783, y: 503 },
    { id: "mini-sub-approach", x: 972, y: 494, role: "approach" },
    { id: "hangar-center-right", x: 1368, y: 493 },
    { id: "control-panel-approach", x: 1571, y: 513, role: "approach" },
    { id: "hatch-approach", x: 1851, y: 516, role: "approach" }
  ],
  intro: [
    "Sven komt in de hangar van de Nautilus.",
    "In het midden ligt een kleine onderzeeer.",
    "Het ontsnappingsluik zit nog vast."
  ],
  spiritName: "Kapitein Nemo",
  spiritLines: {
    welcome: "De minisub wacht.",
    chooseRune: "Maak de hangar klaar.",
    moving: "De machines tikken en sissen.",
    allRunes: "Het ontsnappingsluik is veilig.",
    reward: "De minisub kan vertrekken."
  },
  guideLines: {
    welcome: { speaker: "minnie", text: "Oeh, een kleine duikboot in een grote duikboot." },
    start: { speaker: "minnie", text: "Daar staan meters, pakken en hendels." },
    moving: { speaker: "moose", text: "Niet rennen. Ik hoor druk in de leidingen." },
    hangar: { speaker: "moose", text: "Eerst druk, luik en minisub. Dan pas naar buiten." },
    object: { speaker: "minnie", text: "Oeh, dit lijkt op een geheime ontsnapping." },
    allRunes: { speaker: "moose", text: "De druk klopt. Het luik kan veilig open." },
    reward: { speaker: "moose", text: "Naar buiten. Rustig en precies." }
  },
  levelSemantics: {
    setting: "de hangar van de Nautilus met een minisub, drukmeters en een ontsnappingsluik",
    mood: "gespannen, technisch en avontuurlijk",
    companionFocus: {
      minnie: "de kleine onderzeeer, koperen meters en geheime ontsnappingen",
      moose: "druk, luiken, machines en veilige volgorde"
    }
  },
  companionMoments: [
    {
      id: "minisub-enter",
      event: "LEVEL_ENTER",
      speaker: "minnie",
      text: "Een kleine duikboot in een grote duikboot. Perfect."
    },
    {
      id: "minisub-suit-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "divingSuit",
      speaker: "moose",
      text: "Dat duikpak ziet er zwaar uit. Gelukkig hoeft Minnie er niet in."
    },
    {
      id: "minisub-craft-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "miniSub",
      speaker: "minnie",
      text: "De minisub wacht echt op ons. Kijk naar die koperen buik!"
    },
    {
      id: "minisub-panel-attention",
      event: "HOTSPOT_ATTENTION_FIRST",
      challengeId: "controlPanel",
      speaker: "moose",
      text: "Veel meters. Eén nette oplossing. Dat scheelt gedoe."
    },
    {
      id: "minisub-solved",
      event: "CHALLENGE_SUCCESS",
      speaker: "moose",
      text: "Die staat goed. De druk blijft waar hij hoort."
    },
    {
      id: "minisub-progress",
      event: "LEVEL_PROGRESS_MILESTONE",
      speaker: "minnie",
      text: "We komen dichter bij het luik. Ik voel het."
    },
    {
      id: "minisub-blocked",
      event: "EXIT_BLOCKED",
      speaker: "moose",
      text: "Het luik blijft dicht. Eerst nog {remaining} controles."
    },
    {
      id: "minisub-unlocked",
      event: "PATH_UNLOCKED",
      speaker: "moose",
      text: "De druk klopt. Het luik kan veilig open."
    },
    {
      id: "minisub-complete",
      event: "ADVENTURE_COMPLETE",
      speaker: "minnie",
      text: "Naar buiten! Nou ja, naar het water buiten."
    }
  ],
  areas: [
    { id: "hangar", name: "Minisubhangar", start: 0, end: 2172, guideLine: "hangar" }
  ],
  hotspots: [
    {
      id: "escapeHatch",
      objectId: "escapeHatch",
      type: "gate",
      name: "Ontsnappingsluik",
      defaultAction: "activate",
      look: "Een rond luik naar buiten. De druk moet eerst goed zijn.",
      activate: "Het luik opent naar een verborgen grot."
    }
  ],
  learningChallenges: learningChallengesLVL0006,
  runes: [
    {
      id: "divingSuit",
      objectId: "divingSuit",
      name: "Duikpak",
      shortName: "Pak",
      defaultAction: "activate",
      intro: "Het duikpak heeft koperen sluitingen.",
      prompt: "Tel de sluitingen van het duikpak.",
      solved: "Goed zo! Het pak is gecontroleerd.",
      challengeId: "divingSuit"
    },
    {
      id: "miniSub",
      objectId: "miniSub",
      name: "Minisub",
      shortName: "Sub",
      defaultAction: "activate",
      intro: "De kleine onderzeeer borrelt zacht.",
      prompt: "Tel de ronde raampjes van de minisub.",
      solved: "Mooi! De minisub is wakker.",
      challengeId: "miniSub"
    },
    {
      id: "controlPanel",
      objectId: "controlPanel",
      name: "Drukpaneel",
      shortName: "Paneel",
      defaultAction: "activate",
      intro: "De meters tikken in groepjes.",
      prompt: "Tel de drukmeters op het paneel.",
      solved: "Sterk! De druk staat goed.",
      challengeId: "controlPanel"
    }
  ],
  reward: {
    title: "Het luik opent!",
    badge: "Minisub Piloot",
    line: "Sven maakte de hangar klaar. De minisub ontsnapt naar een verborgen grot.",
    art: "Levels/LVL-0006/assets/nautilus-mini-sub.png",
    nextLevelId: "LVL-0007",
    nextLabel: "Naar het eiland"
  }
};
