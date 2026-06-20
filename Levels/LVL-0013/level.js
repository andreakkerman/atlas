window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0013/assets/nederland.png";
  const challengerAsset = "Levels/LVL-0013/assets/atlas-de-reiziger.png";
  const learningChallenges = [
    {
      id: "nl-wind-01", anchorId: "windmill", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "story", answerMode: "open",
      prompt: "Aan elke van de 4 wieken hangen 8 linten. Hoeveel linten zijn dat samen?",
      answer: 32,
      hintMinnie: "Kijk naar 4 gelijke groepjes van 8 linten.",
      hintMoose: "Reken 4 × 8 als 2 × 8 en nog eens 2 × 8.",
      explanation: "4 × 8 = 32, dus er hangen 32 linten."
    },
    {
      id: "nl-wind-02", anchorId: "windmill", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "De molenaar vult 8 zakken met elk 4 kilo meel. Hoeveel kilo meel is dat?",
      answer: 32, choices: [24, 28, 32, 36],
      hintMinnie: "Elke zak bevat 4 kilo meel.",
      hintMoose: "Gebruik 8 × 4.",
      explanation: "8 × 4 = 32, dus er is 32 kilo meel."
    },
    {
      id: "nl-wind-03", anchorId: "windmill", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "bare", answerMode: "open",
      prompt: "9 × 6 = ?",
      answer: 54,
      hintMinnie: "Denk aan 10 groepjes van 6, maar dan eentje minder.",
      hintMoose: "60 − 6 geeft hetzelfde antwoord.",
      explanation: "9 × 6 = 54."
    },
    {
      id: "nl-wind-04", anchorId: "windmill", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "delen",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "De molenaar verdeelt 48 zakken meel over 6 karren. Hoeveel zakken krijgt elke kar?",
      answer: 8, choices: [6, 7, 8, 9],
      hintMinnie: "Verdeel 48 in 6 gelijke groepjes.",
      hintMoose: "Welke keer-som met 6 geeft 48?",
      explanation: "48 ÷ 6 = 8, dus elke kar krijgt 8 zakken."
    },
    {
      id: "nl-cheese-01", anchorId: "cheeseCart", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "story", answerMode: "multipleChoice",
      prompt: "Op de kaaswagen staan 5 planken met elk 8 kazen. Hoeveel kazen zijn dat?",
      answer: 40, choices: [35, 40, 45, 48],
      hintMinnie: "Elke plank heeft evenveel kazen.",
      hintMoose: "Reken 5 × 8.",
      explanation: "5 × 8 = 40, dus er liggen 40 kazen."
    },
    {
      id: "nl-cheese-02", anchorId: "cheeseCart", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "delen",
      presentation: "story", answerMode: "open",
      prompt: "Er gaan 63 kazen in 7 gelijke kratten. Hoeveel kazen gaan in elk krat?",
      answer: 9,
      hintMinnie: "Zoek 7 gelijke groepjes die samen 63 zijn.",
      hintMoose: "Welke tafel van 7 eindigt bij 63?",
      explanation: "63 ÷ 7 = 9, dus elk krat krijgt 9 kazen."
    },
    {
      id: "nl-cheese-03", anchorId: "cheeseCart", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "bare", answerMode: "multipleChoice",
      prompt: "7 × 7 = ?",
      answer: 49, choices: [42, 47, 49, 56],
      hintMinnie: "Tel zeven sprongen van 7.",
      hintMoose: "7 × 5 is 35; tel nog 14 erbij.",
      explanation: "7 × 7 = 49."
    },
    {
      id: "nl-cheese-04", anchorId: "cheeseCart", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "vermenigvuldigen",
      presentation: "story", answerMode: "open",
      prompt: "Zes grote kazen wegen elk 9 kilo. Hoeveel kilo wegen ze samen?",
      answer: 54,
      hintMinnie: "Het zijn 6 gelijke gewichten van 9 kilo.",
      hintMoose: "Reken 6 × 9 als 6 × 10 min 6.",
      explanation: "6 × 9 = 54, dus de kazen wegen samen 54 kilo."
    },
    {
      id: "nl-clock-01", anchorId: "canalClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "clock_reading_quarter",
      presentation: "bare", answerMode: "multipleChoice",
      prompt: "Hoe laat is het?",
      answer: "kwart over vier",
      choices: ["kwart voor vier", "kwart over vier", "half vijf", "vier uur"],
      visual: { type: "clock", hour: 4, minute: 15 },
      hintMinnie: "Kijk eerst naar de grote wijzer.",
      hintMoose: "De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 4.",
      explanation: "De grote wijzer staat op de 3 en de kleine wijzer net na de 4. Het is kwart over vier."
    },
    {
      id: "nl-clock-02", anchorId: "canalClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "clock_reading_quarter",
      presentation: "bare", answerMode: "multipleChoice",
      prompt: "Hoe laat is het?",
      answer: "kwart voor tien",
      choices: ["kwart over negen", "half tien", "kwart voor tien", "tien uur"],
      visual: { type: "clock", hour: 9, minute: 45 },
      hintMinnie: "De grote wijzer staat op de 9.",
      hintMoose: "De grote wijzer op de 9 betekent kwart voor. De kleine wijzer staat bijna bij de 10.",
      explanation: "De grote wijzer staat op de 9 en de kleine wijzer bijna op de 10. Het is kwart voor tien."
    },
    {
      id: "nl-clock-03", anchorId: "canalClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "clock_reading_quarter",
      presentation: "bare", answerMode: "multipleChoice",
      prompt: "Hoe laat is het?",
      answer: "kwart over twee",
      choices: ["twee uur", "kwart over twee", "half drie", "kwart voor drie"],
      visual: { type: "clock", hour: 2, minute: 15 },
      hintMinnie: "Kijk waar de grote wijzer staat.",
      hintMoose: "De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 2.",
      explanation: "De grote wijzer staat op de 3 en de kleine wijzer net na de 2. Het is kwart over twee."
    },
    {
      id: "nl-clock-04", anchorId: "canalClock", challengeCharacterId: "atlas-de-reiziger",
      domain: "math", schoolBand: "E5-intended", family: "clock_reading_quarter",
      presentation: "bare", answerMode: "multipleChoice",
      prompt: "Hoe laat is het?",
      answer: "kwart voor zeven",
      choices: ["kwart over zes", "half zeven", "kwart voor zeven", "zeven uur"],
      visual: { type: "clock", hour: 6, minute: 45 },
      hintMinnie: "De grote wijzer wijst naar de 9.",
      hintMoose: "De grote wijzer op de 9 betekent kwart voor. De kleine wijzer staat bijna bij de 7.",
      explanation: "De grote wijzer staat op de 9 en de kleine wijzer bijna op de 7. Het is kwart voor zeven."
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
      solved: item.solved,
      challengeIds: learningChallenges.filter((challenge) => challenge.anchorId === item.id).map((challenge) => challenge.id)
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
