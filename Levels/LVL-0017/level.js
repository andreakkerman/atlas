window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0017/assets/oostenrijk.png";
  const challengerAsset = "Levels/LVL-0017/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 8, b: 1 }, { a: 8, b: 2 }, { a: 8, b: 3 }, { a: 8, b: 4 }, { a: 8, b: 5 }, { a: 8, b: 6 }],
    [{ a: 9, b: 1 }, { a: 9, b: 2 }, { a: 9, b: 3 }, { a: 9, b: 4 }, { a: 9, b: 5 }, { a: 9, b: 6 }],
    [{ a: 10, b: 1 }, { a: 10, b: 2 }, { a: 10, b: 3 }, { a: 10, b: 4 }, { a: 10, b: 5 }, { a: 10, b: 6 }]
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
    challengeArt: challengerAsset,
    player: { startNode: "left-start", start: { x: 215, y: 600 } },
    interactiveObjects: [
      ...challenges.map((item) => ({
        id: item.id, type: "rune", center: item.center, radius: item.radius,
        approachNode: item.approachNode, label: item.name
      })),
      exit
    ],
    walkPath: [
      { id: "left-start", x: 215, y: 600 },
      { id: "clock-approach", x: 610, y: 580, role: "approach" },
      { id: "fountain-approach", x: 900, y: 585, role: "approach" },
      { id: "cable-approach", x: 1340, y: 575, role: "approach" },
      { id: "village-path", x: 1640, y: 585 },
      { id: "gate-approach", x: 1920, y: 575, role: "approach" }
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
      solved: item.solved, questions: questions[index]
    })),
    reward: {
      title: "De Alpenpoort opent!",
      badge: "Alpenreiziger",
      line: "Sven vond door het bergdorp de route naar Noorwegen.",
      art: asset, nextLevelId: "LVL-0018", nextLabel: "Naar Noorwegen"
    }
  };
})();
