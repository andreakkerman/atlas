window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0013/assets/nederland.png";
  const challengerAsset = "Levels/LVL-0013/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 1, b: 6 }, { a: 2, b: 7 }, { a: 3, b: 8 }, { a: 4, b: 9 }, { a: 5, b: 10 }, { a: 6, b: 6 }],
    [{ a: 1, b: 7 }, { a: 2, b: 8 }, { a: 3, b: 9 }, { a: 4, b: 10 }, { a: 5, b: 5 }, { a: 6, b: 7 }],
    [{ a: 1, b: 8 }, { a: 2, b: 9 }, { a: 3, b: 10 }, { a: 4, b: 4 }, { a: 5, b: 6 }, { a: 6, b: 8 }]
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
    runes: challenges.map((item, index) => ({
      id: item.id, objectId: item.id, name: item.name, shortName: item.shortName,
      defaultAction: "activate", intro: item.intro, prompt: item.prompt,
      solved: item.solved, questions: questions[index]
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
