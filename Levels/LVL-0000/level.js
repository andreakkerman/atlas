window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};

window.SVEN_LEVEL_DEFINITIONS["LVL-0000"] = {
  "id": "LVL-0000",
  "title": "Cinematic FX Lab",
  "subtitle": "Atlas developer renderer-validation scene",
  "description": "Een permanente benchmarkscene voor bestaande Atlas Cinematic/WebGPU-effecten.",
  "storageKey": "atlas-dev-cinematic-fx-lab-v1",
  "progressKey": "atlas-dev-cinematic-fx-lab-progress-v1",
  "menu": {
    "illustration": "Levels/LVL-0000/assets/AtlasTestLevel.png",
    "badge": "Developer Lab",
    "detail": "Daglicht, water, waterval, grot en nacht"
  },
  "companion": {
    "name": "FX Lab",
    "portrait": "Levels/LVL-0000/assets/AtlasTestLevel.png"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/minnie.png"
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/moose.png"
    }
  },
  "world": {
    "width": 2172,
    "height": 724,
    "aspectRatio": 3,
    "viewportWidth": 1000,
    "background": "Levels/LVL-0000/assets/AtlasTestLevel.png",
    "depthmap": "Levels/LVL-0000/assets/depthmap.png"
  },
  "challengeArt": "Levels/LVL-0000/assets/AtlasTestLevel.png",
  "player": {
    "startNode": "bright-day",
    "start": {
      "x": 155,
      "y": 368
    }
  },
  "walkPath": [
    {
      "id": "bright-day",
      "x": 155,
      "y": 368
    },
    {
      "id": "sunlit-ruins",
      "x": 357,
      "y": 451
    },
    {
      "id": "shallow-water",
      "x": 567,
      "y": 539
    },
    {
      "id": "deep-water",
      "x": 798,
      "y": 591
    },
    {
      "id": "waterfall",
      "x": 1011,
      "y": 602
    },
    {
      "id": "cave-entry",
      "x": 1258,
      "y": 598
    },
    {
      "id": "dark-cave",
      "x": 1356,
      "y": 580
    },
    {
      "id": "moon-water",
      "x": 1626,
      "y": 554
    },
    {
      "id": "night-ruins",
      "x": 1800,
      "y": 510
    },
    {
      "id": "foreground-occlusion",
      "x": 2020,
      "y": 386
    }
  ],
  "interactiveObjects": [
    {
      "id": "qa-day",
      "type": "ambient",
      "center": {
        "x": 452,
        "y": 292
      },
      "radius": 52,
      "approachNode": "sunlit-ruins",
      "label": "Bright Day"
    },
    {
      "id": "qa-shallow",
      "type": "ambient",
      "center": {
        "x": 725,
        "y": 311
      },
      "radius": 52,
      "approachNode": "shallow-water",
      "label": "Shallow Water"
    },
    {
      "id": "qa-waterfall",
      "type": "ambient",
      "center": {
        "x": 1074,
        "y": 212
      },
      "radius": 52,
      "approachNode": "waterfall",
      "label": "Waterfall"
    },
    {
      "id": "qa-cave",
      "type": "ambient",
      "center": {
        "x": 1358,
        "y": 257
      },
      "radius": 42,
      "approachNode": "dark-cave",
      "label": "Dark Cave"
    },
    {
      "id": "qa-night",
      "type": "ambient",
      "center": {
        "x": 1811,
        "y": 110
      },
      "radius": 31,
      "approachNode": "night-ruins",
      "label": "Night Sky"
    },
    {
      "id": "qa-foreground",
      "type": "ambient",
      "center": {
        "x": 2051,
        "y": 288
      },
      "radius": 52,
      "approachNode": "foreground-occlusion",
      "label": "Foreground Occlusion"
    }
  ],
  "ambientAnimals": [],
  "ambientFlybys": [],
  "sceneEffects": [],
  "sceneEffectGroups": [],
  "hotspots": [],
  "runes": [],
  "learningChallenges": [],
  "intro": [
    "Welkom in het Cinematic FX Lab.",
    "Loop van het zonlicht links naar de maannacht rechts.",
    "Deze scène gebruikt dezelfde renderer en authoring als de productielevels."
  ],
  "spiritName": "FX Lab",
  "spiritLines": {
    "welcome": "Loop naar rechts om alle licht- en depthcondities te controleren.",
    "moving": "Van helder daglicht naar diepe schaduw en maanlicht.",
    "allRunes": "Alle benchmarkregio's blijven vrij toegankelijk.",
    "reward": "De Cinematic benchmarkpass is compleet."
  },
  "guideLines": {
    "welcome": {
      "speaker": "minnie",
      "text": "Dit is ons vaste Cinematic FX Lab."
    },
    "start": {
      "speaker": "minnie",
      "text": "Loop naar rechts: dag, water, waterval, grot en nacht."
    },
    "moving": {
      "speaker": "moose",
      "text": "Let op Sven, zijn schaduw en de diepte rond hem."
    },
    "bright": {
      "speaker": "minnie",
      "text": "Helder zonlicht en lichte ontvangers."
    },
    "water": {
      "speaker": "moose",
      "text": "Turkoois en diep water blijven onderdeel van het schilderij."
    },
    "waterfall": {
      "speaker": "minnie",
      "text": "Hier testen we mist en depth-occlusie."
    },
    "cave": {
      "speaker": "moose",
      "text": "Warme lokale lichten tegenover een donkere ontvanger."
    },
    "night": {
      "speaker": "minnie",
      "text": "Koel maanlicht en vrije ruimte voor toekomstige sterren."
    }
  },
  "areas": [
    {
      "id": "bright",
      "name": "Bright Day",
      "start": 0,
      "end": 470,
      "guideLine": "bright"
    },
    {
      "id": "water",
      "name": "Shallow & Deep Water",
      "start": 471,
      "end": 885,
      "guideLine": "water"
    },
    {
      "id": "waterfall",
      "name": "Waterfall",
      "start": 886,
      "end": 1150,
      "guideLine": "waterfall"
    },
    {
      "id": "cave",
      "name": "Dark Cave",
      "start": 1151,
      "end": 1510,
      "guideLine": "cave"
    },
    {
      "id": "night",
      "name": "Moonlit Ruins",
      "start": 1511,
      "end": 2172,
      "guideLine": "night"
    }
  ],
  "levelSemantics": {
    "setting": "developer cinematic benchmark",
    "mood": "day-to-night renderer validation",
    "companionFocus": {
      "minnie": "licht, kleur en atmosfeer",
      "moose": "grounding, schaduw en diepte"
    }
  },
  "companionMoments": [],
  "reward": {
    "title": "FX Lab-pass voltooid",
    "line": "Alle bestaande Cinematic-systemen zijn langs dezelfde productiecode bekeken.",
    "art": "Levels/LVL-0000/assets/AtlasTestLevel.png"
  }
};
