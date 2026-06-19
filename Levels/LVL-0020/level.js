window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

(() => {
  const asset = "Levels/LVL-0020/assets/rheden.png";
  const challengerAsset = "Levels/LVL-0020/assets/atlas-de-reiziger.png";
  const questions = [
    [{ a: 4, b: 1 }, { a: 4, b: 2 }, { a: 4, b: 3 }, { a: 4, b: 4 }, { a: 4, b: 5 }, { a: 4, b: 6 }],
    [{ a: 5, b: 1 }, { a: 5, b: 2 }, { a: 5, b: 3 }, { a: 5, b: 4 }, { a: 5, b: 5 }, { a: 5, b: 6 }],
    [{ a: 6, b: 1 }, { a: 6, b: 2 }, { a: 6, b: 3 }, { a: 6, b: 4 }, { a: 6, b: 5 }, { a: 6, b: 6 }]
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
      solved: item.solved, questions: questions[index]
    })),
    reward: {
      title: "De Grote Reis door Europa is voltooid!",
      badge: "Meester van de Europareis",
      line: "Sven reisde door zeven landen en kwam terug op de Posbank in Rheden.",
      art: asset
    }
  };
})();
