# Frozen Atlas — Read-only content and architecture audit

Snapshot: 2026-10-12T18:49:48.440Z. Current working tree, including pre-existing uncommitted authored changes. Sole deliverable: this Markdown file. No production files, assets, questions, support, routing, preferences or existing documentation were changed. Temporary audit/test evidence is outside the deliverable.

Scope: enabled manifest-connected LVL-0036–0039, active challenges, every local E5 variant. Production resolver scope excludes developer content, editor drafts and browser-local overrides. Exact strings are preserved in text/JSON fences, including capitalization and punctuation. JSON escapes represent exact string characters; they are not editorial rewrites. Runtime and authored-but-unused text are labeled separately. Central M6 is inventoried by IDs, not re-exported as full records.

## 1. World / level structure

Authored world config (`Levels/world-config.js#worlds.LVL-0036`):

```json
{
  "order": [],
  "enabled": {},
  "isNew": true
}
```

Empty order/enabled overrides inherit the manifest order and enabled defaults. Root-only menu card: Frozen Atlas. Connected levels are hidden from the main menu, not disabled. `isNew` is true. No separate Frozen-only world-intro text exists: selecting the world opens Frozen Railway’s shared level-intro screen.

| Order | Level | Title | Enabled | Menu hidden | Challenges / E5 slots / variants | Next |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | LVL-0036 | Frozen Railway | true | false | 3 / 12 / 24 | LVL-0037 |
| 2 | LVL-0037 | Mountain Outpost | true | true | 3 / 12 / 24 | LVL-0038 |
| 3 | LVL-0038 | Old Town | true | true | 3 / 12 / 24 | LVL-0039 |
| 4 | LVL-0039 | Fallen Emperor | true | true | 3 / 12 / 24 | none; finale |

### LVL-0036 — Frozen Railway

Sources: `Levels/manifest.js`, `Levels/world-config.js`, `Levels/LVL-0036/level.js`. Authored metadata (not substitute learner prose):

```json
{
  "manifest": {
    "id": "LVL-0036",
    "title": "Frozen Atlas",
    "subtitle": "Verken Frozen Railway, Mountain Outpost, Old Town en Fallen Emperor.",
    "script": "Levels/LVL-0036/level.js",
    "menu": {
      "illustration": "Levels/LVL-0036/frozenrailway.png",
      "badge": "12 opdrachten",
      "detail": "Frozen Railway, Mountain Outpost, Old Town en Fallen Emperor"
    }
  },
  "levelSettings": {
    "cinematicLighting": {
      "version": 3,
      "layers": {
        "environment": true,
        "globalLighting": true,
        "effects": true,
        "characters": true
      },
      "grading": {
        "enabled": false,
        "exposure": 0,
        "contrast": 1,
        "highlights": 0,
        "shadows": 0,
        "saturation": 1,
        "warmth": 0,
        "tint": 0,
        "blackPoint": 0
      },
      "localLights": {
        "enabled": false,
        "items": []
      },
      "areaLights": {
        "enabled": false,
        "items": []
      },
      "shafts": {
        "enabled": false,
        "items": []
      },
      "atmosphere": {
        "enabled": false,
        "items": []
      },
      "bloom": {
        "enabled": false,
        "intensity": 0.25,
        "threshold": 0.8,
        "softKnee": 0.2,
        "radius": 8,
        "falloff": 1.5,
        "colorInfluence": 0.8,
        "localContribution": 0.3
      },
      "particles": {
        "enabled": true,
        "items": [
          {
            "enabled": true,
            "x": 1045,
            "y": 322,
            "color": "#e2efff",
            "shape": "rectangle",
            "width": 2069,
            "height": 580,
            "softness": 0.6,
            "direction": 88,
            "count": 1600,
            "size": 2.2,
            "sizeVariation": 0.9,
            "speed": 65,
            "turbulence": 1,
            "lifetime": 18,
            "opacity": 0.7,
            "glow": 0,
            "gravity": 0.6,
            "randomness": 0.8,
            "depth": 0.7,
            "depthInfluence": 1,
            "depthSoftness": 0.12,
            "layer": "environment",
            "wind": 18,
            "streak": 1,
            "pulse": 0,
            "depthSpread": 0.6,
            "distribution": "volume",
            "scaleCountWithArea": false,
            "boundsRotation": -2,
            "id": "particles-mv5a12fz",
            "name": "particles-mv5a12fz"
          }
        ]
      },
      "characters": {
        "enabled": false,
        "groundingShadow": true,
        "showShadowContactDebug": false,
        "shadowLightSourceX": 161,
        "shadowLightSourceY": 202,
        "shadowShape": "silhouette",
        "shadowGroundlineOffset": 0,
        "shadowStrength": 5,
        "shadowOpacity": 100,
        "shadowSoftness": 0.72,
        "shadowWidth": 1,
        "shadowLength": 1,
        "shadowScale": 1.2,
        "shadowOffsetX": 0,
        "shadowOffsetY": 0,
        "shadowDirection": -10,
        "shadowGlobalLightInfluence": 1,
        "shadowLocalLightInfluence": 2,
        "shadowDirectionSmoothing": 0.08,
        "shadowDarkBackgroundSuppression": 0.85,
        "shadowAtmosphereSuppression": 1,
        "ambientInfluence": 0.15,
        "localInfluence": 0.7,
        "colorSpill": 0.65,
        "intensityResponse": 0.6,
        "directionalInfluence": 0.7,
        "atmosphereInfluence": 0.65,
        "depthTint": 0.18,
        "grounding": 0.12,
        "sideLighting": 0.7,
        "frontAtmosphere": 0.45
      },
      "wrap": {
        "enabled": false,
        "strength": 0.1,
        "radius": 2,
        "colorInfluence": 0.7
      },
      "rim": {
        "enabled": false,
        "strength": 0.1,
        "width": 1.5,
        "colorResponse": 0.8,
        "localInfluence": 0.8,
        "ambientInfluence": 0.1
      },
      "autoExposure": {
        "enabled": false,
        "minExposure": -0.5,
        "maxExposure": 0.5,
        "adaptationSpeed": 0.25,
        "strength": 0.4
      },
      "finishing": {
        "enabled": false,
        "intensity": 0.15,
        "softness": 0.7,
        "finalExposure": 0,
        "finalContrast": 1
      },
      "godRays": {
        "enabled": false,
        "items": []
      },
      "waterSurface": {
        "enabled": false,
        "items": []
      },
      "waterSparkles": {
        "enabled": false,
        "items": []
      },
      "gameplayCues": {
        "enabled": true,
        "intensity": 1,
        "characterInfluence": 1
      },
      "depth": {
        "enabled": true,
        "filterRadius": 1.5,
        "perspective": 0
      }
    },
    "mainCharacterSettings": {
      "sven_arc": {
        "spriteScale": 0.9
      }
    }
  },
  "storageKey": "lvl-0036-frozen-progress",
  "progressKey": "lvl-0036-frozen-completed",
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 110,
      "y": 580
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "presenter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0036/Valente.png",
    "role": "verkenner"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/ARC_minnie.png",
      "blink": false,
      "purrSounds": [
        "minnie1",
        "minnie2"
      ]
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/ARC_moose.png",
      "blink": false,
      "purrSounds": [
        "moose1",
        "moose2"
      ]
    }
  },
  "exits": [
    {
      "id": "bridgePassage",
      "targetLevel": "LVL-0037",
      "lockedUntilComplete": true
    }
  ],
  "companionPolicy": {
    "disabledEvents": [
      "CHALLENGE_OPEN",
      "CHALLENGE_SUCCESS",
      "LEVEL_PROGRESS_MILESTONE"
    ],
    "attentionOncePerVisit": true
  }
}
```

| Challenge / object | Active | Presenter | Slot IDs | Exit requirement |
| --- | --- | --- | --- | --- |
| stationClock | true | CHR-ARC-VALENTE | stationClock-slot-1, stationClock-slot-2, stationClock-slot-3, stationClock-slot-4 | all 4 positions; one selected question each |
| illuminatedBooth | true | CHR-ARC-VALENTE | illuminatedBooth-slot-1, illuminatedBooth-slot-2, illuminatedBooth-slot-3, illuminatedBooth-slot-4 | all 4 positions; one selected question each |
| serviceBooth | true | CHR-ARC-VALENTE | serviceBooth-slot-1, serviceBooth-slot-2, serviceBooth-slot-3, serviceBooth-slot-4 | all 4 positions; one selected question each |

### LVL-0037 — Mountain Outpost

Sources: `Levels/manifest.js`, `Levels/world-config.js`, `Levels/LVL-0037/level.js`. Authored metadata (not substitute learner prose):

```json
{
  "manifest": {
    "id": "LVL-0037",
    "title": "Mountain Outpost",
    "subtitle": "Volg het bergpad naar de afgelegen buitenpost.",
    "script": "Levels/LVL-0037/level.js",
    "hiddenFromMenu": true,
    "connectedFrom": "LVL-0036",
    "menu": {
      "illustration": "Levels/LVL-0037/mountainoutpost.png",
      "badge": "Verbonden gebied",
      "detail": "Expeditiemarkering, steenmannetje en technische installatie"
    }
  },
  "levelSettings": {},
  "storageKey": "lvl-0037-frozen-progress",
  "progressKey": "lvl-0037-frozen-completed",
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 106,
      "y": 555
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "presenter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0037/Valente.png",
    "role": "verkenner"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/ARC_minnie.png",
      "blink": false,
      "purrSounds": [
        "minnie1",
        "minnie2"
      ]
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/ARC_moose.png",
      "blink": false,
      "purrSounds": [
        "moose1",
        "moose2"
      ]
    }
  },
  "exits": [
    {
      "id": "outpostBridge",
      "targetLevel": "LVL-0038",
      "lockedUntilComplete": true
    }
  ],
  "companionPolicy": {
    "disabledEvents": [
      "CHALLENGE_OPEN",
      "CHALLENGE_SUCCESS",
      "LEVEL_PROGRESS_MILESTONE"
    ],
    "attentionOncePerVisit": true
  }
}
```

| Challenge / object | Active | Presenter | Slot IDs | Exit requirement |
| --- | --- | --- | --- | --- |
| expeditionMarker | true | CHR-ARC-VALENTE | expeditionMarker-slot-1, expeditionMarker-slot-2, expeditionMarker-slot-3, expeditionMarker-slot-4 | all 4 positions; one selected question each |
| stoneCairn | true | CHR-ARC-VALENTE | stoneCairn-slot-1, stoneCairn-slot-2, stoneCairn-slot-3, stoneCairn-slot-4 | all 4 positions; one selected question each |
| technicalInstallation | true | CHR-ARC-VALENTE | technicalInstallation-slot-1, technicalInstallation-slot-2, technicalInstallation-slot-3, technicalInstallation-slot-4 | all 4 positions; one selected question each |

### LVL-0038 — Old Town

Sources: `Levels/manifest.js`, `Levels/world-config.js`, `Levels/LVL-0038/level.js`. Authored metadata (not substitute learner prose):

```json
{
  "manifest": {
    "id": "LVL-0038",
    "title": "Old Town",
    "subtitle": "Onderzoek het besneeuwde dorpsplein van Almatera.",
    "script": "Levels/LVL-0038/level.js",
    "hiddenFromMenu": true,
    "connectedFrom": "LVL-0037",
    "menu": {
      "illustration": "Levels/LVL-0038/oldtown.png",
      "badge": "Verbonden gebied",
      "detail": "Welkomstbord, standbeeld en kerkklok"
    }
  },
  "levelSettings": {
    "playerDepthOcclusion": {
      "enabled": true,
      "offset": -0.016
    }
  },
  "storageKey": "lvl-0038-frozen-progress",
  "progressKey": "lvl-0038-frozen-completed",
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 110,
      "y": 580
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "presenter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0038/Valente.png",
    "role": "verkenner"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/ARC_minnie.png",
      "blink": false,
      "purrSounds": [
        "minnie1",
        "minnie2"
      ]
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/ARC_moose.png",
      "blink": false,
      "purrSounds": [
        "moose1",
        "moose2"
      ]
    }
  },
  "exits": [
    {
      "id": "villagePassage",
      "targetLevel": "LVL-0039",
      "lockedUntilComplete": true
    }
  ],
  "companionPolicy": {
    "disabledEvents": [
      "CHALLENGE_OPEN",
      "CHALLENGE_SUCCESS",
      "LEVEL_PROGRESS_MILESTONE"
    ],
    "attentionOncePerVisit": true
  }
}
```

| Challenge / object | Active | Presenter | Slot IDs | Exit requirement |
| --- | --- | --- | --- | --- |
| welcomeSign | true | CHR-ARC-VALENTE | welcomeSign-slot-1, welcomeSign-slot-2, welcomeSign-slot-3, welcomeSign-slot-4 | all 4 positions; one selected question each |
| statue | true | CHR-ARC-VALENTE | statue-slot-1, statue-slot-2, statue-slot-3, statue-slot-4 | all 4 positions; one selected question each |
| churchClock | true | CHR-ARC-VALENTE | churchClock-slot-1, churchClock-slot-2, churchClock-slot-3, churchClock-slot-4 | all 4 positions; one selected question each |

### LVL-0039 — Fallen Emperor

Sources: `Levels/manifest.js`, `Levels/world-config.js`, `Levels/LVL-0039/level.js`. Authored metadata (not substitute learner prose):

```json
{
  "manifest": {
    "id": "LVL-0039",
    "title": "Fallen Emperor",
    "subtitle": "Verken het wrak en bereik de rode Ballistic Gondola.",
    "script": "Levels/LVL-0039/level.js",
    "hiddenFromMenu": true,
    "connectedFrom": "LVL-0038",
    "menu": {
      "illustration": "Levels/LVL-0039/fallenemperor.png",
      "badge": "Finale",
      "detail": "ARC-wrakstuk, schakelkasten en signaalmast"
    }
  },
  "levelSettings": {},
  "storageKey": "lvl-0039-frozen-progress",
  "progressKey": "lvl-0039-frozen-completed",
  "player": {
    "characterId": "sven_arc",
    "start": {
      "x": 237,
      "y": 583
    },
    "scale": 0.47,
    "startNode": "start"
  },
  "presenter": {
    "id": "CHR-ARC-VALENTE",
    "name": "Valente",
    "portrait": "Levels/LVL-0039/Valente.png",
    "role": "verkenner"
  },
  "guides": {
    "minnie": {
      "name": "Minnie",
      "portrait": "assets/guides/ARC_minnie.png",
      "blink": false,
      "purrSounds": [
        "minnie1",
        "minnie2"
      ]
    },
    "moose": {
      "name": "Moose",
      "portrait": "assets/guides/ARC_moose.png",
      "blink": false,
      "purrSounds": [
        "moose1",
        "moose2"
      ]
    }
  },
  "exits": [
    {
      "id": "ballisticGondola",
      "targetLevel": null,
      "lockedUntilComplete": true
    }
  ],
  "companionPolicy": {
    "disabledEvents": [
      "CHALLENGE_OPEN",
      "CHALLENGE_SUCCESS",
      "LEVEL_PROGRESS_MILESTONE"
    ],
    "attentionOncePerVisit": true
  }
}
```

| Challenge / object | Active | Presenter | Slot IDs | Exit requirement |
| --- | --- | --- | --- | --- |
| machineryFragment | true | CHR-ARC-VALENTE | machineryFragment-slot-1, machineryFragment-slot-2, machineryFragment-slot-3, machineryFragment-slot-4 | all 4 positions; one selected question each |
| controlCabinets | true | CHR-ARC-VALENTE | controlCabinets-slot-1, controlCabinets-slot-2, controlCabinets-slot-3, controlCabinets-slot-4 | all 4 positions; one selected question each |
| signalMast | true | CHR-ARC-VALENTE | signalMast-slot-1, signalMast-slot-2, signalMast-slot-3, signalMast-slot-4 | all 4 positions; one selected question each |

Shared runtime: `activeRunes`, `learningChallengeForRune`, `isLevelExitReady` (src/app.js) use all three active challenges here: none supplies an explicit alternative progression subset. Every exit has `lockedUntilComplete:true`; all 12 question positions must be completed, including permitted E5 assisted completion. `nextQuestion` marks each challenge complete; `transitionToReward` / `showReward` display level reward and save run completion. `resolvedNextLevelId` uses the world resolver. Finale has no next-level button, with Menu and replay instead. The same progression is used for central M6 selections; no separate M6 exit flow.

## 2. Exact learner-facing and authored narrative text

The following source inventory deliberately retains potentially dormant authored copy. Runtime observations: `renderIntro` displays **intro[0] only**, theme/title and shared buttons; `continueIntro` enters the scene immediately. intro[1] is authored but not displayed by this flow. For these authored challenges `openRuneChallenge` clears feedback, and `renderChallenge` displays question text, presenter, challenge name and “Vraag N van 4”; rune intro/prompt/solved strings are not shown as a separate introduction/completion dialogue. Exit activation uses the blocked companion moment or reward transition; hotspot prompt/solved is not a separate exit dialogue. `spiritLines.welcome` initializes Minnie’s guide message, then LEVEL_ENTER replaces it. Other spiritLines are retained authored legacy copy without a current direct consumer. Metadata such as levelSemantics is not automatically displayed dialogue. ADVENTURE_COMPLETE resolves its companion event, but showReward immediately switches to a reward screen without a companion bar; its moment text is exported as resolved event copy, not claimed visible on that screen. No text is silently omitted merely because it is dormant.

### LVL-0036 — exact authored strings

Source: `Levels/LVL-0036/level.js#title` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Frozen Railway
```

Source: `Levels/LVL-0036/level.js#subtitle` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Volg het besneeuwde spoor naar de bergpas.
```

Source: `Levels/LVL-0036/level.js#description` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiZGVzY3JpcHRpb24iXX0= -->
```text
Onderzoek met Valente de drie plekken in Frozen Railway.
```

Source: `Levels/LVL-0036/level.js#challengeLabel` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY2hhbGxlbmdlTGFiZWwiXX0= -->
```text
Uitdaging
```

Source: `Levels/LVL-0036/level.js#challengeCompleteLabel` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY2hhbGxlbmdlQ29tcGxldGVMYWJlbCJdfQ== -->
```text
Opdracht afronden
```

Source: `Levels/LVL-0036/level.js#choiceHint` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY2hvaWNlSGludCJdfQ== -->
```text
Kies het juiste antwoord.
```

Source: `Levels/LVL-0036/level.js#progressLabelPlural` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicHJvZ3Jlc3NMYWJlbFBsdXJhbCJdfQ== -->
```text
ontdekkingen
```

Source: `Levels/LVL-0036/level.js#challengeCharacter.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0036/level.js#challengeCharacter.role` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0036/level.js#guides.minnie.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiZ3VpZGVzIiwibWlubmllIiwibmFtZSJdfQ== -->
```text
Minnie
```

Source: `Levels/LVL-0036/level.js#guides.moose.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiZ3VpZGVzIiwibW9vc2UiLCJuYW1lIl19 -->
```text
Moose
```

Source: `Levels/LVL-0036/level.js#companion.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0036/level.js#companion.role` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0036/level.js#spiritName` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsic3Bpcml0TmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0036/level.js#walkPath.1.role` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsid2Fsa1BhdGgiLDEsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0036/level.js#walkPath.2.role` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsid2Fsa1BhdGgiLDIsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0036/level.js#walkPath.3.role` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsid2Fsa1BhdGgiLDMsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0036/level.js#walkPath.5.role` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsid2Fsa1BhdGgiLDUsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0036/level.js#interactiveObjects.0.label` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwwLCJsYWJlbCJdfQ== -->
```text
Stationsklok
```

Source: `Levels/LVL-0036/level.js#interactiveObjects.1.label` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwxLCJsYWJlbCJdfQ== -->
```text
Verlicht diensthuisje
```

Source: `Levels/LVL-0036/level.js#interactiveObjects.2.label` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwyLCJsYWJlbCJdfQ== -->
```text
Diensthuisje
```

Source: `Levels/LVL-0036/level.js#interactiveObjects.3.label` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwzLCJsYWJlbCJdfQ== -->
```text
Doorgang bij de brug
```

Source: `Levels/LVL-0036/level.js#runes.0.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDAsIm5hbWUiXX0= -->
```text
Stationsklok
```

Source: `Levels/LVL-0036/level.js#runes.0.shortName` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDAsInNob3J0TmFtZSJdfQ== -->
```text
Stationsklok
```

Source: `Levels/LVL-0036/level.js#runes.0.intro` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDAsImludHJvIl19 -->
```text
Valente onderzoekt de stationsklok met Sven.
```

Source: `Levels/LVL-0036/level.js#runes.0.prompt` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDAsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0036/level.js#runes.0.solved` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDAsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0036/level.js#runes.1.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDEsIm5hbWUiXX0= -->
```text
Verlicht diensthuisje
```

Source: `Levels/LVL-0036/level.js#runes.1.shortName` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDEsInNob3J0TmFtZSJdfQ== -->
```text
Verlicht diensthuisje
```

Source: `Levels/LVL-0036/level.js#runes.1.intro` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDEsImludHJvIl19 -->
```text
Valente onderzoekt het verlichte diensthuisje met Sven.
```

Source: `Levels/LVL-0036/level.js#runes.1.prompt` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDEsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0036/level.js#runes.1.solved` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDEsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0036/level.js#runes.2.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDIsIm5hbWUiXX0= -->
```text
Diensthuisje
```

Source: `Levels/LVL-0036/level.js#runes.2.shortName` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDIsInNob3J0TmFtZSJdfQ== -->
```text
Diensthuisje
```

Source: `Levels/LVL-0036/level.js#runes.2.intro` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDIsImludHJvIl19 -->
```text
Valente onderzoekt het diensthuisje met Sven.
```

Source: `Levels/LVL-0036/level.js#runes.2.prompt` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDIsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0036/level.js#runes.2.solved` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicnVuZXMiLDIsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0036/level.js#hotspots.0.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaG90c3BvdHMiLDAsIm5hbWUiXX0= -->
```text
Doorgang bij de brug
```

Source: `Levels/LVL-0036/level.js#hotspots.0.prompt` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaG90c3BvdHMiLDAsInByb21wdCJdfQ== -->
```text
Via de doorgang bij de brug gaat de reis verder.
```

Source: `Levels/LVL-0036/level.js#hotspots.0.solved` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaG90c3BvdHMiLDAsInNvbHZlZCJdfQ== -->
```text
De verkenning van Frozen Railway is klaar.
```

Source: `Levels/LVL-0036/level.js#exitActionLabel` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiZXhpdEFjdGlvbkxhYmVsIl19 -->
```text
Ga verder
```

Source: `Levels/LVL-0036/level.js#areas.0.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiYXJlYXMiLDAsIm5hbWUiXX0= -->
```text
Stationsklok
```

Source: `Levels/LVL-0036/level.js#areas.0.description` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiYXJlYXMiLDAsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek de stationsklok met Valente.
```

Source: `Levels/LVL-0036/level.js#areas.1.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiYXJlYXMiLDEsIm5hbWUiXX0= -->
```text
Verlicht diensthuisje
```

Source: `Levels/LVL-0036/level.js#areas.1.description` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiYXJlYXMiLDEsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek het verlichte diensthuisje met Valente.
```

Source: `Levels/LVL-0036/level.js#areas.2.name` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiYXJlYXMiLDIsIm5hbWUiXX0= -->
```text
Diensthuisje
```

Source: `Levels/LVL-0036/level.js#areas.2.description` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiYXJlYXMiLDIsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek het diensthuisje met Valente.
```

Source: `Levels/LVL-0036/level.js#intro.0` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaW50cm8iLDBdfQ== -->
```text
De trein staat stil tussen sneeuw en bergen. Verderop ligt een doorgang onder de brug.
```

Source: `Levels/LVL-0036/level.js#intro.1` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiaW50cm8iLDFdfQ== -->
```text
Onderzoek de drie plekken. Daarna kun je verder via de doorgang bij de brug.
```

Source: `Levels/LVL-0036/level.js#theme` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsidGhlbWUiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/LVL-0036/level.js#menu.badge` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
3 opdrachten
```

Source: `Levels/LVL-0036/level.js#menu.detail` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
Stationsklok, verlicht diensthuisje en diensthuisje
```

Source: `Levels/LVL-0036/level.js#reward.title` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicmV3YXJkIiwidGl0bGUiXX0= -->
```text
Frozen Railway voltooid
```

Source: `Levels/LVL-0036/level.js#reward.line` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicmV3YXJkIiwibGluZSJdfQ== -->
```text
Samen met Valente heeft Sven alle drie de plekken in Frozen Railway onderzocht.
```

Source: `Levels/LVL-0036/level.js#reward.badge` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsicmV3YXJkIiwiYmFkZ2UiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/LVL-0036/level.js#spiritLines.welcome` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJ3ZWxjb21lIl19 -->
```text
Welkom in Frozen Railway, Sven.
```

Source: `Levels/LVL-0036/level.js#spiritLines.moving` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJtb3ZpbmciXX0= -->
```text
Het pad loopt verder door de sneeuw.
```

Source: `Levels/LVL-0036/level.js#spiritLines.allRunes` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJhbGxSdW5lcyJdfQ== -->
```text
We hebben alle drie de plekken onderzocht.
```

Source: `Levels/LVL-0036/level.js#spiritLines.reward` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJyZXdhcmQiXX0= -->
```text
De reis door Frozen Atlas gaat verder.
```

Source: `Levels/LVL-0036/level.js#levelSemantics.setting` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJzZXR0aW5nIl19 -->
```text
Volg het besneeuwde spoor naar de bergpas.
```

Source: `Levels/LVL-0036/level.js#levelSemantics.mood` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJtb29kIl19 -->
```text
koud, stil en geheimzinnig
```

Source: `Levels/LVL-0036/level.js#levelSemantics.companionFocus.minnie` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1pbm5pZSJdfQ== -->
```text
Stationsklok
```

Source: `Levels/LVL-0036/level.js#levelSemantics.companionFocus.moose` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1vb3NlIl19 -->
```text
Doorgang bij de brug
```

Source: `Levels/LVL-0036/level.js#companionMoments.0.text` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMCwidGV4dCJdfQ== -->
```text
Zelfs de trein heeft hier een sneeuwmuts.
```

Source: `Levels/LVL-0036/level.js#companionMoments.1.text` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMSwidGV4dCJdfQ== -->
```text
Die stationsklok hangt hoog boven het spoor.
```

Source: `Levels/LVL-0036/level.js#companionMoments.2.text` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMiwidGV4dCJdfQ== -->
```text
Er brandt nog licht in dat huisje.
```

Source: `Levels/LVL-0036/level.js#companionMoments.3.text` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMywidGV4dCJdfQ== -->
```text
Dit huisje staat vlak bij de brug.
```

Source: `Levels/LVL-0036/level.js#companionMoments.4.text` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNCwidGV4dCJdfQ== -->
```text
Nog {remainingChallenges} te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0036/level.js#companionMoments.5.text` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNSwidGV4dCJdfQ== -->
```text
Alles klaar. We kunnen naar de bergpas.
```

Source: `Levels/LVL-0036/level.js#companionMoments.6.text` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM2L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNiwidGV4dCJdfQ== -->
```text
Een stukje dichter bij de Gondola.
```

Source: `Levels/manifest.js#title` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/manifest.js#subtitle` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Verken Frozen Railway, Mountain Outpost, Old Town en Fallen Emperor.
```

Source: `Levels/manifest.js#menu.badge` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
12 opdrachten
```

Source: `Levels/manifest.js#menu.detail` (level LVL-0036).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNiIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
Frozen Railway, Mountain Outpost, Old Town en Fallen Emperor
```

### LVL-0036 — actual shared runtime render / contextual resolution

Sources: `src/app.js#renderIntro`, `renderReward`, `createLevelState`, `formatCompanionText`; authored fields above. Reward statistics are run-dependent; zero-state probe statistics are omitted here, not presented as completed-run facts.

```json
{
  "introDisplayed": [
    "LVL-0036",
    "Frozen Railway",
    "Frozen Atlas",
    "De trein staat stil tussen sneeuw en bergen. Verderop ligt een doorgang onder de brug.",
    "Terug",
    "Start avontuur"
  ],
  "rewardDisplayed": [
    "LVL-0036",
    "Frozen Railway voltooid",
    "Samen met Valente heeft Sven alle drie de plekken in Frozen Railway onderzocht.",
    "Frozen Atlas",
    "Naar het volgende gebied",
    "Menu"
  ],
  "initialGuide": {
    "speaker": "minnie",
    "text": "Welkom in Frozen Railway, Sven."
  }
}
```

Source: `Levels/LVL-0036/level.js#companionMoments[0]` via `src/app.js#formatCompanionText`; minnie / LEVEL_ENTER.

```text
Zelfs de trein heeft hier een sneeuwmuts.
```

Source: `Levels/LVL-0036/level.js#companionMoments[1]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge stationClock.

```text
Die stationsklok hangt hoog boven het spoor.
```

Source: `Levels/LVL-0036/level.js#companionMoments[2]` via `src/app.js#formatCompanionText`; moose / HOTSPOT_ATTENTION_FIRST / challenge illuminatedBooth.

```text
Er brandt nog licht in dat huisje.
```

Source: `Levels/LVL-0036/level.js#companionMoments[3]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge serviceBooth.

```text
Dit huisje staat vlak bij de brug.
```

Source: `Levels/LVL-0036/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 3.

```text
Nog 3 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0036/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 2.

```text
Nog 2 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0036/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 1.

```text
Nog 1 opdracht te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0036/level.js#companionMoments[5]` via `src/app.js#formatCompanionText`; moose / PATH_UNLOCKED.

```text
Alles klaar. We kunnen naar de bergpas.
```

Source: `Levels/LVL-0036/level.js#companionMoments[6]` via `src/app.js#formatCompanionText`; minnie / ADVENTURE_COMPLETE.

```text
Een stukje dichter bij de Gondola.
```

### LVL-0037 — exact authored strings

Source: `Levels/LVL-0037/level.js#title` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Mountain Outpost
```

Source: `Levels/LVL-0037/level.js#subtitle` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Volg het bergpad naar de afgelegen buitenpost.
```

Source: `Levels/LVL-0037/level.js#description` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiZGVzY3JpcHRpb24iXX0= -->
```text
Onderzoek met Valente de drie plekken in Mountain Outpost.
```

Source: `Levels/LVL-0037/level.js#challengeLabel` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY2hhbGxlbmdlTGFiZWwiXX0= -->
```text
Uitdaging
```

Source: `Levels/LVL-0037/level.js#challengeCompleteLabel` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY2hhbGxlbmdlQ29tcGxldGVMYWJlbCJdfQ== -->
```text
Opdracht afronden
```

Source: `Levels/LVL-0037/level.js#choiceHint` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY2hvaWNlSGludCJdfQ== -->
```text
Kies het juiste antwoord.
```

Source: `Levels/LVL-0037/level.js#progressLabelPlural` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicHJvZ3Jlc3NMYWJlbFBsdXJhbCJdfQ== -->
```text
ontdekkingen
```

Source: `Levels/LVL-0037/level.js#challengeCharacter.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0037/level.js#challengeCharacter.role` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0037/level.js#guides.minnie.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiZ3VpZGVzIiwibWlubmllIiwibmFtZSJdfQ== -->
```text
Minnie
```

Source: `Levels/LVL-0037/level.js#guides.moose.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiZ3VpZGVzIiwibW9vc2UiLCJuYW1lIl19 -->
```text
Moose
```

Source: `Levels/LVL-0037/level.js#companion.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0037/level.js#companion.role` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0037/level.js#spiritName` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsic3Bpcml0TmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0037/level.js#walkPath.1.role` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsid2Fsa1BhdGgiLDEsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0037/level.js#walkPath.2.role` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsid2Fsa1BhdGgiLDIsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0037/level.js#walkPath.5.role` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsid2Fsa1BhdGgiLDUsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0037/level.js#walkPath.7.role` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsid2Fsa1BhdGgiLDcsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0037/level.js#interactiveObjects.0.label` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwwLCJsYWJlbCJdfQ== -->
```text
Houten expeditiemarkering
```

Source: `Levels/LVL-0037/level.js#interactiveObjects.1.label` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwxLCJsYWJlbCJdfQ== -->
```text
Steenmannetje
```

Source: `Levels/LVL-0037/level.js#interactiveObjects.2.label` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwyLCJsYWJlbCJdfQ== -->
```text
Technische installatie
```

Source: `Levels/LVL-0037/level.js#interactiveObjects.3.label` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwzLCJsYWJlbCJdfQ== -->
```text
Brug naar de buitenpost
```

Source: `Levels/LVL-0037/level.js#runes.0.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDAsIm5hbWUiXX0= -->
```text
Houten expeditiemarkering
```

Source: `Levels/LVL-0037/level.js#runes.0.shortName` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDAsInNob3J0TmFtZSJdfQ== -->
```text
Houten expeditiemarkering
```

Source: `Levels/LVL-0037/level.js#runes.0.intro` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDAsImludHJvIl19 -->
```text
Valente onderzoekt de houten expeditiemarkering met Sven.
```

Source: `Levels/LVL-0037/level.js#runes.0.prompt` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDAsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0037/level.js#runes.0.solved` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDAsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0037/level.js#runes.1.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDEsIm5hbWUiXX0= -->
```text
Steenmannetje
```

Source: `Levels/LVL-0037/level.js#runes.1.shortName` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDEsInNob3J0TmFtZSJdfQ== -->
```text
Steenmannetje
```

Source: `Levels/LVL-0037/level.js#runes.1.intro` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDEsImludHJvIl19 -->
```text
Valente onderzoekt het steenmannetje met Sven.
```

Source: `Levels/LVL-0037/level.js#runes.1.prompt` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDEsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0037/level.js#runes.1.solved` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDEsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0037/level.js#runes.2.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDIsIm5hbWUiXX0= -->
```text
Technische installatie
```

Source: `Levels/LVL-0037/level.js#runes.2.shortName` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDIsInNob3J0TmFtZSJdfQ== -->
```text
Technische installatie
```

Source: `Levels/LVL-0037/level.js#runes.2.intro` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDIsImludHJvIl19 -->
```text
Valente onderzoekt de technische installatie met Sven.
```

Source: `Levels/LVL-0037/level.js#runes.2.prompt` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDIsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0037/level.js#runes.2.solved` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicnVuZXMiLDIsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0037/level.js#hotspots.0.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaG90c3BvdHMiLDAsIm5hbWUiXX0= -->
```text
Brug naar de buitenpost
```

Source: `Levels/LVL-0037/level.js#hotspots.0.prompt` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaG90c3BvdHMiLDAsInByb21wdCJdfQ== -->
```text
Via de brug naar de buitenpost gaat de reis verder.
```

Source: `Levels/LVL-0037/level.js#hotspots.0.solved` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaG90c3BvdHMiLDAsInNvbHZlZCJdfQ== -->
```text
De verkenning van Mountain Outpost is klaar.
```

Source: `Levels/LVL-0037/level.js#exitActionLabel` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiZXhpdEFjdGlvbkxhYmVsIl19 -->
```text
Ga verder
```

Source: `Levels/LVL-0037/level.js#areas.0.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiYXJlYXMiLDAsIm5hbWUiXX0= -->
```text
Houten expeditiemarkering
```

Source: `Levels/LVL-0037/level.js#areas.0.description` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiYXJlYXMiLDAsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek de houten expeditiemarkering met Valente.
```

Source: `Levels/LVL-0037/level.js#areas.1.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiYXJlYXMiLDEsIm5hbWUiXX0= -->
```text
Steenmannetje
```

Source: `Levels/LVL-0037/level.js#areas.1.description` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiYXJlYXMiLDEsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek het steenmannetje met Valente.
```

Source: `Levels/LVL-0037/level.js#areas.2.name` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiYXJlYXMiLDIsIm5hbWUiXX0= -->
```text
Technische installatie
```

Source: `Levels/LVL-0037/level.js#areas.2.description` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiYXJlYXMiLDIsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek de technische installatie met Valente.
```

Source: `Levels/LVL-0037/level.js#intro.0` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaW50cm8iLDBdfQ== -->
```text
Een houten markering wijst langs de berghelling. Achter de kloof ligt de buitenpost.
```

Source: `Levels/LVL-0037/level.js#intro.1` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiaW50cm8iLDFdfQ== -->
```text
Onderzoek de drie plekken. Daarna kun je verder via de brug naar de buitenpost.
```

Source: `Levels/LVL-0037/level.js#theme` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsidGhlbWUiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/LVL-0037/level.js#menu.badge` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
3 opdrachten
```

Source: `Levels/LVL-0037/level.js#menu.detail` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
Expeditiemarkering, steenmannetje en technische installatie
```

Source: `Levels/LVL-0037/level.js#reward.title` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicmV3YXJkIiwidGl0bGUiXX0= -->
```text
Mountain Outpost voltooid
```

Source: `Levels/LVL-0037/level.js#reward.line` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicmV3YXJkIiwibGluZSJdfQ== -->
```text
Samen met Valente heeft Sven alle drie de plekken in Mountain Outpost onderzocht.
```

Source: `Levels/LVL-0037/level.js#reward.badge` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsicmV3YXJkIiwiYmFkZ2UiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/LVL-0037/level.js#spiritLines.welcome` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJ3ZWxjb21lIl19 -->
```text
Welkom in Mountain Outpost, Sven.
```

Source: `Levels/LVL-0037/level.js#spiritLines.moving` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJtb3ZpbmciXX0= -->
```text
Het pad loopt verder door de sneeuw.
```

Source: `Levels/LVL-0037/level.js#spiritLines.allRunes` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJhbGxSdW5lcyJdfQ== -->
```text
We hebben alle drie de plekken onderzocht.
```

Source: `Levels/LVL-0037/level.js#spiritLines.reward` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJyZXdhcmQiXX0= -->
```text
De reis door Frozen Atlas gaat verder.
```

Source: `Levels/LVL-0037/level.js#levelSemantics.setting` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJzZXR0aW5nIl19 -->
```text
Volg het bergpad naar de afgelegen buitenpost.
```

Source: `Levels/LVL-0037/level.js#levelSemantics.mood` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJtb29kIl19 -->
```text
koud, stil en geheimzinnig
```

Source: `Levels/LVL-0037/level.js#levelSemantics.companionFocus.minnie` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1pbm5pZSJdfQ== -->
```text
Houten expeditiemarkering
```

Source: `Levels/LVL-0037/level.js#levelSemantics.companionFocus.moose` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1vb3NlIl19 -->
```text
Brug naar de buitenpost
```

Source: `Levels/LVL-0037/level.js#companionMoments.0.text` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMCwidGV4dCJdfQ== -->
```text
Die buitenpost staat bijna tussen de wolken.
```

Source: `Levels/LVL-0037/level.js#companionMoments.1.text` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMSwidGV4dCJdfQ== -->
```text
De linten hangen aan een hoge houten paal.
```

Source: `Levels/LVL-0037/level.js#companionMoments.2.text` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMiwidGV4dCJdfQ== -->
```text
Iemand heeft de stenen netjes opgestapeld.
```

Source: `Levels/LVL-0037/level.js#companionMoments.3.text` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMywidGV4dCJdfQ== -->
```text
Dat kastje hoort vast bij de buitenpost.
```

Source: `Levels/LVL-0037/level.js#companionMoments.4.text` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNCwidGV4dCJdfQ== -->
```text
Nog {remainingChallenges} te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0037/level.js#companionMoments.5.text` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNSwidGV4dCJdfQ== -->
```text
Alles klaar. De brug brengt ons verder.
```

Source: `Levels/LVL-0037/level.js#companionMoments.6.text` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM3L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNiwidGV4dCJdfQ== -->
```text
Een stukje dichter bij de Gondola.
```

Source: `Levels/manifest.js#title` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Mountain Outpost
```

Source: `Levels/manifest.js#subtitle` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Volg het bergpad naar de afgelegen buitenpost.
```

Source: `Levels/manifest.js#menu.badge` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
Verbonden gebied
```

Source: `Levels/manifest.js#menu.detail` (level LVL-0037).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzNyIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
Expeditiemarkering, steenmannetje en technische installatie
```

### LVL-0037 — actual shared runtime render / contextual resolution

Sources: `src/app.js#renderIntro`, `renderReward`, `createLevelState`, `formatCompanionText`; authored fields above. Reward statistics are run-dependent; zero-state probe statistics are omitted here, not presented as completed-run facts.

```json
{
  "introDisplayed": [
    "LVL-0037",
    "Mountain Outpost",
    "Frozen Atlas",
    "Een houten markering wijst langs de berghelling. Achter de kloof ligt de buitenpost.",
    "Terug",
    "Start avontuur"
  ],
  "rewardDisplayed": [
    "LVL-0037",
    "Mountain Outpost voltooid",
    "Samen met Valente heeft Sven alle drie de plekken in Mountain Outpost onderzocht.",
    "Frozen Atlas",
    "Naar het volgende gebied",
    "Menu"
  ],
  "initialGuide": {
    "speaker": "minnie",
    "text": "Welkom in Mountain Outpost, Sven."
  }
}
```

Source: `Levels/LVL-0037/level.js#companionMoments[0]` via `src/app.js#formatCompanionText`; minnie / LEVEL_ENTER.

```text
Die buitenpost staat bijna tussen de wolken.
```

Source: `Levels/LVL-0037/level.js#companionMoments[1]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge expeditionMarker.

```text
De linten hangen aan een hoge houten paal.
```

Source: `Levels/LVL-0037/level.js#companionMoments[2]` via `src/app.js#formatCompanionText`; moose / HOTSPOT_ATTENTION_FIRST / challenge stoneCairn.

```text
Iemand heeft de stenen netjes opgestapeld.
```

Source: `Levels/LVL-0037/level.js#companionMoments[3]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge technicalInstallation.

```text
Dat kastje hoort vast bij de buitenpost.
```

Source: `Levels/LVL-0037/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 3.

```text
Nog 3 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0037/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 2.

```text
Nog 2 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0037/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 1.

```text
Nog 1 opdracht te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0037/level.js#companionMoments[5]` via `src/app.js#formatCompanionText`; moose / PATH_UNLOCKED.

```text
Alles klaar. De brug brengt ons verder.
```

Source: `Levels/LVL-0037/level.js#companionMoments[6]` via `src/app.js#formatCompanionText`; minnie / ADVENTURE_COMPLETE.

```text
Een stukje dichter bij de Gondola.
```

### LVL-0038 — exact authored strings

Source: `Levels/LVL-0038/level.js#title` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Old Town
```

Source: `Levels/LVL-0038/level.js#subtitle` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Onderzoek het besneeuwde dorpsplein van Almatera.
```

Source: `Levels/LVL-0038/level.js#description` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiZGVzY3JpcHRpb24iXX0= -->
```text
Onderzoek met Valente de drie plekken in Old Town.
```

Source: `Levels/LVL-0038/level.js#challengeLabel` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY2hhbGxlbmdlTGFiZWwiXX0= -->
```text
Uitdaging
```

Source: `Levels/LVL-0038/level.js#challengeCompleteLabel` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY2hhbGxlbmdlQ29tcGxldGVMYWJlbCJdfQ== -->
```text
Opdracht afronden
```

Source: `Levels/LVL-0038/level.js#choiceHint` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY2hvaWNlSGludCJdfQ== -->
```text
Kies het juiste antwoord.
```

Source: `Levels/LVL-0038/level.js#progressLabelPlural` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicHJvZ3Jlc3NMYWJlbFBsdXJhbCJdfQ== -->
```text
ontdekkingen
```

Source: `Levels/LVL-0038/level.js#challengeCharacter.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0038/level.js#challengeCharacter.role` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0038/level.js#guides.minnie.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiZ3VpZGVzIiwibWlubmllIiwibmFtZSJdfQ== -->
```text
Minnie
```

Source: `Levels/LVL-0038/level.js#guides.moose.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiZ3VpZGVzIiwibW9vc2UiLCJuYW1lIl19 -->
```text
Moose
```

Source: `Levels/LVL-0038/level.js#companion.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0038/level.js#companion.role` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0038/level.js#spiritName` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsic3Bpcml0TmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0038/level.js#walkPath.1.role` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsid2Fsa1BhdGgiLDEsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0038/level.js#walkPath.3.role` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsid2Fsa1BhdGgiLDMsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0038/level.js#walkPath.5.role` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsid2Fsa1BhdGgiLDUsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0038/level.js#walkPath.7.role` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsid2Fsa1BhdGgiLDcsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0038/level.js#interactiveObjects.0.label` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwwLCJsYWJlbCJdfQ== -->
```text
Welkomstbord van Almatera
```

Source: `Levels/LVL-0038/level.js#interactiveObjects.1.label` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwxLCJsYWJlbCJdfQ== -->
```text
Standbeeld
```

Source: `Levels/LVL-0038/level.js#interactiveObjects.2.label` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwyLCJsYWJlbCJdfQ== -->
```text
Kerkklok
```

Source: `Levels/LVL-0038/level.js#interactiveObjects.3.label` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwzLCJsYWJlbCJdfQ== -->
```text
Doorgang voorbij het plein
```

Source: `Levels/LVL-0038/level.js#runes.0.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDAsIm5hbWUiXX0= -->
```text
Welkomstbord van Almatera
```

Source: `Levels/LVL-0038/level.js#runes.0.shortName` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDAsInNob3J0TmFtZSJdfQ== -->
```text
Welkomstbord van Almatera
```

Source: `Levels/LVL-0038/level.js#runes.0.intro` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDAsImludHJvIl19 -->
```text
Valente onderzoekt het welkomstbord van Almatera met Sven.
```

Source: `Levels/LVL-0038/level.js#runes.0.prompt` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDAsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0038/level.js#runes.0.solved` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDAsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0038/level.js#runes.1.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDEsIm5hbWUiXX0= -->
```text
Standbeeld
```

Source: `Levels/LVL-0038/level.js#runes.1.shortName` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDEsInNob3J0TmFtZSJdfQ== -->
```text
Standbeeld
```

Source: `Levels/LVL-0038/level.js#runes.1.intro` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDEsImludHJvIl19 -->
```text
Valente onderzoekt het standbeeld met Sven.
```

Source: `Levels/LVL-0038/level.js#runes.1.prompt` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDEsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0038/level.js#runes.1.solved` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDEsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0038/level.js#runes.2.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDIsIm5hbWUiXX0= -->
```text
Kerkklok
```

Source: `Levels/LVL-0038/level.js#runes.2.shortName` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDIsInNob3J0TmFtZSJdfQ== -->
```text
Kerkklok
```

Source: `Levels/LVL-0038/level.js#runes.2.intro` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDIsImludHJvIl19 -->
```text
Valente onderzoekt de kerkklok met Sven.
```

Source: `Levels/LVL-0038/level.js#runes.2.prompt` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDIsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0038/level.js#runes.2.solved` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicnVuZXMiLDIsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0038/level.js#hotspots.0.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaG90c3BvdHMiLDAsIm5hbWUiXX0= -->
```text
Doorgang voorbij het plein
```

Source: `Levels/LVL-0038/level.js#hotspots.0.prompt` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaG90c3BvdHMiLDAsInByb21wdCJdfQ== -->
```text
Via de doorgang voorbij het plein gaat de reis verder.
```

Source: `Levels/LVL-0038/level.js#hotspots.0.solved` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaG90c3BvdHMiLDAsInNvbHZlZCJdfQ== -->
```text
De verkenning van Old Town is klaar.
```

Source: `Levels/LVL-0038/level.js#exitActionLabel` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiZXhpdEFjdGlvbkxhYmVsIl19 -->
```text
Ga verder
```

Source: `Levels/LVL-0038/level.js#areas.0.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiYXJlYXMiLDAsIm5hbWUiXX0= -->
```text
Welkomstbord van Almatera
```

Source: `Levels/LVL-0038/level.js#areas.0.description` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiYXJlYXMiLDAsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek het welkomstbord van Almatera met Valente.
```

Source: `Levels/LVL-0038/level.js#areas.1.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiYXJlYXMiLDEsIm5hbWUiXX0= -->
```text
Standbeeld
```

Source: `Levels/LVL-0038/level.js#areas.1.description` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiYXJlYXMiLDEsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek het standbeeld met Valente.
```

Source: `Levels/LVL-0038/level.js#areas.2.name` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiYXJlYXMiLDIsIm5hbWUiXX0= -->
```text
Kerkklok
```

Source: `Levels/LVL-0038/level.js#areas.2.description` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiYXJlYXMiLDIsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek de kerkklok met Valente.
```

Source: `Levels/LVL-0038/level.js#intro.0` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaW50cm8iLDBdfQ== -->
```text
Het welkomstbord noemt dit dorp Almatera. Het standbeeld en de kerk kijken uit over het stille plein.
```

Source: `Levels/LVL-0038/level.js#intro.1` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiaW50cm8iLDFdfQ== -->
```text
Onderzoek de drie plekken. Daarna kun je verder via de doorgang voorbij het plein.
```

Source: `Levels/LVL-0038/level.js#theme` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsidGhlbWUiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/LVL-0038/level.js#menu.badge` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
3 opdrachten
```

Source: `Levels/LVL-0038/level.js#menu.detail` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
Welkomstbord, standbeeld en kerkklok
```

Source: `Levels/LVL-0038/level.js#reward.title` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicmV3YXJkIiwidGl0bGUiXX0= -->
```text
Old Town voltooid
```

Source: `Levels/LVL-0038/level.js#reward.line` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicmV3YXJkIiwibGluZSJdfQ== -->
```text
Samen met Valente heeft Sven alle drie de plekken in Old Town onderzocht.
```

Source: `Levels/LVL-0038/level.js#reward.badge` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsicmV3YXJkIiwiYmFkZ2UiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/LVL-0038/level.js#spiritLines.welcome` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJ3ZWxjb21lIl19 -->
```text
Welkom in Old Town, Sven.
```

Source: `Levels/LVL-0038/level.js#spiritLines.moving` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJtb3ZpbmciXX0= -->
```text
Het pad loopt verder door de sneeuw.
```

Source: `Levels/LVL-0038/level.js#spiritLines.allRunes` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJhbGxSdW5lcyJdfQ== -->
```text
We hebben alle drie de plekken onderzocht.
```

Source: `Levels/LVL-0038/level.js#spiritLines.reward` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJyZXdhcmQiXX0= -->
```text
De reis door Frozen Atlas gaat verder.
```

Source: `Levels/LVL-0038/level.js#levelSemantics.setting` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJzZXR0aW5nIl19 -->
```text
Onderzoek het besneeuwde dorpsplein van Almatera.
```

Source: `Levels/LVL-0038/level.js#levelSemantics.mood` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJtb29kIl19 -->
```text
koud, stil en geheimzinnig
```

Source: `Levels/LVL-0038/level.js#levelSemantics.companionFocus.minnie` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1pbm5pZSJdfQ== -->
```text
Welkomstbord van Almatera
```

Source: `Levels/LVL-0038/level.js#levelSemantics.companionFocus.moose` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1vb3NlIl19 -->
```text
Doorgang voorbij het plein
```

Source: `Levels/LVL-0038/level.js#companionMoments.0.text` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMCwidGV4dCJdfQ== -->
```text
Almatera. Het hele plein ligt onder een witte deken.
```

Source: `Levels/LVL-0038/level.js#companionMoments.1.text` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMSwidGV4dCJdfQ== -->
```text
Op het bord staat een kaart van het dorp.
```

Source: `Levels/LVL-0038/level.js#companionMoments.2.text` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMiwidGV4dCJdfQ== -->
```text
Dat standbeeld kijkt over het plein.
```

Source: `Levels/LVL-0038/level.js#companionMoments.3.text` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMywidGV4dCJdfQ== -->
```text
De klok zit hoog in de kerktoren.
```

Source: `Levels/LVL-0038/level.js#companionMoments.4.text` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNCwidGV4dCJdfQ== -->
```text
Nog {remainingChallenges} te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0038/level.js#companionMoments.5.text` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNSwidGV4dCJdfQ== -->
```text
Alles klaar. Achter het plein loopt de weg verder.
```

Source: `Levels/LVL-0038/level.js#companionMoments.6.text` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM4L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNiwidGV4dCJdfQ== -->
```text
Een stukje dichter bij de Gondola.
```

Source: `Levels/manifest.js#title` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Old Town
```

Source: `Levels/manifest.js#subtitle` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Onderzoek het besneeuwde dorpsplein van Almatera.
```

Source: `Levels/manifest.js#menu.badge` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
Verbonden gebied
```

Source: `Levels/manifest.js#menu.detail` (level LVL-0038).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOCIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
Welkomstbord, standbeeld en kerkklok
```

### LVL-0038 — actual shared runtime render / contextual resolution

Sources: `src/app.js#renderIntro`, `renderReward`, `createLevelState`, `formatCompanionText`; authored fields above. Reward statistics are run-dependent; zero-state probe statistics are omitted here, not presented as completed-run facts.

```json
{
  "introDisplayed": [
    "LVL-0038",
    "Old Town",
    "Frozen Atlas",
    "Het welkomstbord noemt dit dorp Almatera. Het standbeeld en de kerk kijken uit over het stille plein.",
    "Terug",
    "Start avontuur"
  ],
  "rewardDisplayed": [
    "LVL-0038",
    "Old Town voltooid",
    "Samen met Valente heeft Sven alle drie de plekken in Old Town onderzocht.",
    "Frozen Atlas",
    "Naar het volgende gebied",
    "Menu"
  ],
  "initialGuide": {
    "speaker": "minnie",
    "text": "Welkom in Old Town, Sven."
  }
}
```

Source: `Levels/LVL-0038/level.js#companionMoments[0]` via `src/app.js#formatCompanionText`; minnie / LEVEL_ENTER.

```text
Almatera. Het hele plein ligt onder een witte deken.
```

Source: `Levels/LVL-0038/level.js#companionMoments[1]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge welcomeSign.

```text
Op het bord staat een kaart van het dorp.
```

Source: `Levels/LVL-0038/level.js#companionMoments[2]` via `src/app.js#formatCompanionText`; moose / HOTSPOT_ATTENTION_FIRST / challenge statue.

```text
Dat standbeeld kijkt over het plein.
```

Source: `Levels/LVL-0038/level.js#companionMoments[3]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge churchClock.

```text
De klok zit hoog in de kerktoren.
```

Source: `Levels/LVL-0038/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 3.

```text
Nog 3 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0038/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 2.

```text
Nog 2 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0038/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 1.

```text
Nog 1 opdracht te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0038/level.js#companionMoments[5]` via `src/app.js#formatCompanionText`; moose / PATH_UNLOCKED.

```text
Alles klaar. Achter het plein loopt de weg verder.
```

Source: `Levels/LVL-0038/level.js#companionMoments[6]` via `src/app.js#formatCompanionText`; minnie / ADVENTURE_COMPLETE.

```text
Een stukje dichter bij de Gondola.
```

### LVL-0039 — exact authored strings

Source: `Levels/LVL-0039/level.js#title` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Fallen Emperor
```

Source: `Levels/LVL-0039/level.js#subtitle` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Verken het wrak en bereik de rode Ballistic Gondola.
```

Source: `Levels/LVL-0039/level.js#description` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiZGVzY3JpcHRpb24iXX0= -->
```text
Onderzoek met Valente de drie plekken in Fallen Emperor.
```

Source: `Levels/LVL-0039/level.js#challengeLabel` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY2hhbGxlbmdlTGFiZWwiXX0= -->
```text
Uitdaging
```

Source: `Levels/LVL-0039/level.js#challengeCompleteLabel` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY2hhbGxlbmdlQ29tcGxldGVMYWJlbCJdfQ== -->
```text
Opdracht afronden
```

Source: `Levels/LVL-0039/level.js#choiceHint` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY2hvaWNlSGludCJdfQ== -->
```text
Kies het juiste antwoord.
```

Source: `Levels/LVL-0039/level.js#progressLabelPlural` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicHJvZ3Jlc3NMYWJlbFBsdXJhbCJdfQ== -->
```text
ontdekkingen
```

Source: `Levels/LVL-0039/level.js#challengeCharacter.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0039/level.js#challengeCharacter.role` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY2hhbGxlbmdlQ2hhcmFjdGVyIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0039/level.js#guides.minnie.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiZ3VpZGVzIiwibWlubmllIiwibmFtZSJdfQ== -->
```text
Minnie
```

Source: `Levels/LVL-0039/level.js#guides.moose.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiZ3VpZGVzIiwibW9vc2UiLCJuYW1lIl19 -->
```text
Moose
```

Source: `Levels/LVL-0039/level.js#companion.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uIiwibmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0039/level.js#companion.role` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uIiwicm9sZSJdfQ== -->
```text
verkenner
```

Source: `Levels/LVL-0039/level.js#spiritName` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsic3Bpcml0TmFtZSJdfQ== -->
```text
Valente
```

Source: `Levels/LVL-0039/level.js#walkPath.1.role` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsid2Fsa1BhdGgiLDEsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0039/level.js#walkPath.2.role` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsid2Fsa1BhdGgiLDIsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0039/level.js#walkPath.3.role` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsid2Fsa1BhdGgiLDMsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0039/level.js#walkPath.6.role` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsid2Fsa1BhdGgiLDYsInJvbGUiXX0= -->
```text
approach
```

Source: `Levels/LVL-0039/level.js#interactiveObjects.0.label` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwwLCJsYWJlbCJdfQ== -->
```text
Beschadigd ARC-wrakstuk
```

Source: `Levels/LVL-0039/level.js#interactiveObjects.1.label` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwxLCJsYWJlbCJdfQ== -->
```text
Elektrische schakelkasten
```

Source: `Levels/LVL-0039/level.js#interactiveObjects.2.label` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwyLCJsYWJlbCJdfQ== -->
```text
Signaalmast met waarschuwingslicht
```

Source: `Levels/LVL-0039/level.js#interactiveObjects.3.label` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaW50ZXJhY3RpdmVPYmplY3RzIiwzLCJsYWJlbCJdfQ== -->
```text
Ballistic Gondola
```

Source: `Levels/LVL-0039/level.js#runes.0.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDAsIm5hbWUiXX0= -->
```text
Beschadigd ARC-wrakstuk
```

Source: `Levels/LVL-0039/level.js#runes.0.shortName` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDAsInNob3J0TmFtZSJdfQ== -->
```text
Beschadigd ARC-wrakstuk
```

Source: `Levels/LVL-0039/level.js#runes.0.intro` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDAsImludHJvIl19 -->
```text
Valente onderzoekt het beschadigde ARC-wrakstuk met Sven.
```

Source: `Levels/LVL-0039/level.js#runes.0.prompt` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDAsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0039/level.js#runes.0.solved` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDAsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0039/level.js#runes.1.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDEsIm5hbWUiXX0= -->
```text
Elektrische schakelkasten
```

Source: `Levels/LVL-0039/level.js#runes.1.shortName` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDEsInNob3J0TmFtZSJdfQ== -->
```text
Elektrische schakelkasten
```

Source: `Levels/LVL-0039/level.js#runes.1.intro` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDEsImludHJvIl19 -->
```text
Valente onderzoekt de elektrische schakelkasten met Sven.
```

Source: `Levels/LVL-0039/level.js#runes.1.prompt` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDEsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0039/level.js#runes.1.solved` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDEsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0039/level.js#runes.2.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDIsIm5hbWUiXX0= -->
```text
Signaalmast met waarschuwingslicht
```

Source: `Levels/LVL-0039/level.js#runes.2.shortName` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDIsInNob3J0TmFtZSJdfQ== -->
```text
Signaalmast met waarschuwingslicht
```

Source: `Levels/LVL-0039/level.js#runes.2.intro` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDIsImludHJvIl19 -->
```text
Valente onderzoekt de signaalmast met het waarschuwingslicht met Sven.
```

Source: `Levels/LVL-0039/level.js#runes.2.prompt` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDIsInByb21wdCJdfQ== -->
```text
Los de vier vragen op.
```

Source: `Levels/LVL-0039/level.js#runes.2.solved` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicnVuZXMiLDIsInNvbHZlZCJdfQ== -->
```text
Deze plek is onderzocht!
```

Source: `Levels/LVL-0039/level.js#hotspots.0.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaG90c3BvdHMiLDAsIm5hbWUiXX0= -->
```text
Ballistic Gondola
```

Source: `Levels/LVL-0039/level.js#hotspots.0.prompt` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaG90c3BvdHMiLDAsInByb21wdCJdfQ== -->
```text
De rode Ballistic Gondola is het vertrekpunt uit deze vallei.
```

Source: `Levels/LVL-0039/level.js#hotspots.0.solved` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaG90c3BvdHMiLDAsInNvbHZlZCJdfQ== -->
```text
De verkenning van Fallen Emperor is klaar.
```

Source: `Levels/LVL-0039/level.js#exitActionLabel` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiZXhpdEFjdGlvbkxhYmVsIl19 -->
```text
Stap in de Ballistic Gondola
```

Source: `Levels/LVL-0039/level.js#areas.0.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiYXJlYXMiLDAsIm5hbWUiXX0= -->
```text
Beschadigd ARC-wrakstuk
```

Source: `Levels/LVL-0039/level.js#areas.0.description` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiYXJlYXMiLDAsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek het beschadigde ARC-wrakstuk met Valente.
```

Source: `Levels/LVL-0039/level.js#areas.1.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiYXJlYXMiLDEsIm5hbWUiXX0= -->
```text
Elektrische schakelkasten
```

Source: `Levels/LVL-0039/level.js#areas.1.description` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiYXJlYXMiLDEsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek de elektrische schakelkasten met Valente.
```

Source: `Levels/LVL-0039/level.js#areas.2.name` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiYXJlYXMiLDIsIm5hbWUiXX0= -->
```text
Signaalmast met waarschuwingslicht
```

Source: `Levels/LVL-0039/level.js#areas.2.description` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiYXJlYXMiLDIsImRlc2NyaXB0aW9uIl19 -->
```text
Onderzoek de signaalmast met het waarschuwingslicht met Valente.
```

Source: `Levels/LVL-0039/level.js#intro.0` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaW50cm8iLDBdfQ== -->
```text
Een gevallen Emperor vult de vallei. Tussen de rotsen ligt een los ARC-wrakstuk; rechts wacht de rode Ballistic Gondola.
```

Source: `Levels/LVL-0039/level.js#intro.1` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiaW50cm8iLDFdfQ== -->
```text
Onderzoek de drie plekken. Daarna kun je vertrekken met de rode Ballistic Gondola.
```

Source: `Levels/LVL-0039/level.js#theme` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsidGhlbWUiXX0= -->
```text
Frozen Atlas
```

Source: `Levels/LVL-0039/level.js#menu.badge` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
3 opdrachten
```

Source: `Levels/LVL-0039/level.js#menu.detail` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
ARC-wrakstuk, schakelkasten en signaalmast
```

Source: `Levels/LVL-0039/level.js#reward.title` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicmV3YXJkIiwidGl0bGUiXX0= -->
```text
Fallen Emperor voltooid
```

Source: `Levels/LVL-0039/level.js#reward.line` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicmV3YXJkIiwibGluZSJdfQ== -->
```text
Samen met Valente heeft Sven alle drie de plekken in Fallen Emperor onderzocht.
```

Source: `Levels/LVL-0039/level.js#reward.badge` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsicmV3YXJkIiwiYmFkZ2UiXX0= -->
```text
Frozen Atlas voltooid
```

Source: `Levels/LVL-0039/level.js#spiritLines.welcome` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJ3ZWxjb21lIl19 -->
```text
Welkom in Fallen Emperor, Sven.
```

Source: `Levels/LVL-0039/level.js#spiritLines.moving` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJtb3ZpbmciXX0= -->
```text
Het pad loopt verder door de sneeuw.
```

Source: `Levels/LVL-0039/level.js#spiritLines.allRunes` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJhbGxSdW5lcyJdfQ== -->
```text
We hebben alle drie de plekken onderzocht.
```

Source: `Levels/LVL-0039/level.js#spiritLines.reward` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsic3Bpcml0TGluZXMiLCJyZXdhcmQiXX0= -->
```text
De Ballistic Gondola is klaar voor vertrek.
```

Source: `Levels/LVL-0039/level.js#levelSemantics.setting` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJzZXR0aW5nIl19 -->
```text
Verken het wrak en bereik de rode Ballistic Gondola.
```

Source: `Levels/LVL-0039/level.js#levelSemantics.mood` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJtb29kIl19 -->
```text
koud, stil en geheimzinnig
```

Source: `Levels/LVL-0039/level.js#levelSemantics.companionFocus.minnie` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1pbm5pZSJdfQ== -->
```text
Beschadigd ARC-wrakstuk
```

Source: `Levels/LVL-0039/level.js#levelSemantics.companionFocus.moose` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibGV2ZWxTZW1hbnRpY3MiLCJjb21wYW5pb25Gb2N1cyIsIm1vb3NlIl19 -->
```text
Ballistic Gondola
```

Source: `Levels/LVL-0039/level.js#companionMoments.0.text` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMCwidGV4dCJdfQ== -->
```text
Wat een reusachtig wrak. De rode Gondola staat er nog.
```

Source: `Levels/LVL-0039/level.js#companionMoments.1.text` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMSwidGV4dCJdfQ== -->
```text
Dat losse stuk metaal ligt tussen de rotsen.
```

Source: `Levels/LVL-0039/level.js#companionMoments.2.text` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMiwidGV4dCJdfQ== -->
```text
De schakelkasten staan naast elkaar in de sneeuw.
```

Source: `Levels/LVL-0039/level.js#companionMoments.3.text` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsMywidGV4dCJdfQ== -->
```text
Het oranje licht bij het wrak brandt nog.
```

Source: `Levels/LVL-0039/level.js#companionMoments.4.text` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNCwidGV4dCJdfQ== -->
```text
Nog {remainingChallenges} te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0039/level.js#companionMoments.5.text` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNSwidGV4dCJdfQ== -->
```text
Alles klaar. Naar de rode Ballistic Gondola!
```

Source: `Levels/LVL-0039/level.js#companionMoments.6.text` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL0xWTC0wMDM5L2xldmVsLmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsiY29tcGFuaW9uTW9tZW50cyIsNiwidGV4dCJdfQ== -->
```text
Dat was een koude tocht. Tijd om naar huis te gaan.
```

Source: `Levels/manifest.js#title` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsidGl0bGUiXX0= -->
```text
Fallen Emperor
```

Source: `Levels/manifest.js#subtitle` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsic3VidGl0bGUiXX0= -->
```text
Verken het wrak en bereik de rode Ballistic Gondola.
```

Source: `Levels/manifest.js#menu.badge` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibWVudSIsImJhZGdlIl19 -->
```text
Finale
```

Source: `Levels/manifest.js#menu.detail` (level LVL-0039).

<!-- frozen-text:eyJmaWxlIjoiTGV2ZWxzL21hbmlmZXN0LmpzIiwibGV2ZWwiOiJMVkwtMDAzOSIsInBhdGgiOlsibWVudSIsImRldGFpbCJdfQ== -->
```text
ARC-wrakstuk, schakelkasten en signaalmast
```

### LVL-0039 — actual shared runtime render / contextual resolution

Sources: `src/app.js#renderIntro`, `renderReward`, `createLevelState`, `formatCompanionText`; authored fields above. Reward statistics are run-dependent; zero-state probe statistics are omitted here, not presented as completed-run facts.

```json
{
  "introDisplayed": [
    "LVL-0039",
    "Fallen Emperor",
    "Frozen Atlas",
    "Een gevallen Emperor vult de vallei. Tussen de rotsen ligt een los ARC-wrakstuk; rechts wacht de rode Ballistic Gondola.",
    "Terug",
    "Start avontuur"
  ],
  "rewardDisplayed": [
    "LVL-0039",
    "Fallen Emperor voltooid",
    "Samen met Valente heeft Sven alle drie de plekken in Fallen Emperor onderzocht.",
    "Frozen Atlas voltooid",
    "Menu",
    "Speel nog een keer"
  ],
  "initialGuide": {
    "speaker": "minnie",
    "text": "Welkom in Fallen Emperor, Sven."
  }
}
```

Source: `Levels/LVL-0039/level.js#companionMoments[0]` via `src/app.js#formatCompanionText`; minnie / LEVEL_ENTER.

```text
Wat een reusachtig wrak. De rode Gondola staat er nog.
```

Source: `Levels/LVL-0039/level.js#companionMoments[1]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge machineryFragment.

```text
Dat losse stuk metaal ligt tussen de rotsen.
```

Source: `Levels/LVL-0039/level.js#companionMoments[2]` via `src/app.js#formatCompanionText`; moose / HOTSPOT_ATTENTION_FIRST / challenge controlCabinets.

```text
De schakelkasten staan naast elkaar in de sneeuw.
```

Source: `Levels/LVL-0039/level.js#companionMoments[3]` via `src/app.js#formatCompanionText`; minnie / HOTSPOT_ATTENTION_FIRST / challenge signalMast.

```text
Het oranje licht bij het wrak brandt nog.
```

Source: `Levels/LVL-0039/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 3.

```text
Nog 3 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0039/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 2.

```text
Nog 2 opdrachten te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0039/level.js#companionMoments[4]` via `src/app.js#formatCompanionText`; moose / EXIT_BLOCKED / remaining 1.

```text
Nog 1 opdracht te gaan. Daarna kunnen we verder.
```

Source: `Levels/LVL-0039/level.js#companionMoments[5]` via `src/app.js#formatCompanionText`; moose / PATH_UNLOCKED.

```text
Alles klaar. Naar de rode Ballistic Gondola!
```

Source: `Levels/LVL-0039/level.js#companionMoments[6]` via `src/app.js#formatCompanionText`; minnie / ADVENTURE_COMPLETE.

```text
Dat was een koude tocht. Tijd om naar huis te gaan.
```

Shared, not Frozen-authored: menu count is “4 plaatsen · 12 opdrachten”, badge “Nieuw”; each question header uses “Vraag 1 van 4” through “Vraag 4 van 4”. Answer controls use “Jouw antwoord”, “Controleer”, “Sluit opdracht”; completion uses “Goed zo!”, “Ja! Het antwoord is [canonical answer].”, “Volgende vraag” / “Opdracht afronden”. Third-error E5 allows “Samen afronden”. Reward statistics render the current number of answered questions, first-try percentage and attempts (src/app.js#renderReward); they are player-state values, not authored Frozen prose. Exact per-variant answer and explanation are in section 3. M6 notebook labels and flow remain central/shared, section 7.

## 3. E5 — complete resolved content

| Metric | Count |
| --- | --- |
| Frozen active levels | 4 |
| Active challenges | 12 |
| E5 slots | 48 |
| E5 variants expected/exported | 96 / 96 |
| Other enabled production E5 comparison variants | 672 |
| Inactive Frozen challenges | 0 |

Families:

```json
{
  "clock_reading_five_minutes": 16,
  "bare_multiplication": 40,
  "story_multiplication": 16,
  "bare_division": 12,
  "story_division": 8,
  "money": 2,
  "route": 2
}
```

Answer modes:

```json
{
  "multipleChoice": 58,
  "open": 38
}
```

Resolution: local script + `learning-levels.resolveLevel`, `challenge-hints.resolve`, `resolveExplanation`, `resolveClockVisual` exactly as `renderChallenge` / `answerQuestion` use them. Each record contains all four resolved visual stages: null means absent; digital clock highlightHours/highlightMinutes are runtime-resolved. Descriptors are complete render inputs (type, time, highlights), not illustrative replacement images. Shared `challenge-capabilities.renderClockVisual` renders those descriptors; no artwork changes. Numeric E5 money is whole euros here, not the central M6 cents contract. Choices preserve authored order; runtime shuffles a copy once.

### LVL-0036/stationClock/stationClock-slot-1/stationClock-1a

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-1].variants[stationClock-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-1/stationClock-1a -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-1",
  "variantId": "stationClock-1a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      7,
      15,
      "kwart over zeven"
    ],
    "description": "analogue 07:15 → Kwart over zeven",
    "values": {
      "hour": 7,
      "minute": 15,
      "spokenAnswer": "Kwart over zeven"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Kwart over zeven",
  "authoredChoices": [
    "Kwart over zeven",
    "Kwart voor zeven",
    "Kwart over acht",
    "Half acht"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 3: dat is kwart over. Kijk nu naar de kleine wijzer.",
  "explanation": "De grote wijzer staat op de 3 en de kleine wijzer net na de 7. Het is kwart over zeven.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 3 en de kleine wijzer net na de 7. Het is kwart over zeven.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 7,
      "minute": 15
    },
    "minnie": {
      "type": "clock",
      "hour": 7,
      "minute": 15
    },
    "moose": {
      "type": "clock",
      "hour": 7,
      "minute": 15
    },
    "explanation": {
      "type": "clock",
      "hour": 7,
      "minute": 15
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/stationClock/stationClock-slot-1/stationClock-1b

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-1].variants[stationClock-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-1/stationClock-1b -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-1",
  "variantId": "stationClock-1b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      8,
      30,
      "half negen"
    ],
    "description": "digital 08:30 → Half negen",
    "values": {
      "hour": 8,
      "minute": 30,
      "spokenAnswer": "Half negen"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Half negen",
  "authoredChoices": [
    "Half acht",
    "Half negen",
    "Negen uur",
    "Kwart over acht"
  ],
  "minnie": "30 minuten betekent een half uur.",
  "moose": "Het is een half uur na acht. Bij 'half' noemen we het uur dat daarna komt: negen.",
  "explanation": "De digitale klok geeft 08:30 aan. 30 minuten betekent een half uur. Een half uur na acht noemen we half negen. Daarom is 08:30 half negen.",
  "assistedCompletionExplanation": "De digitale klok geeft 08:30 aan. 30 minuten betekent een half uur. Een half uur na acht noemen we half negen. Daarom is 08:30 half negen.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 8,
      "minute": 30,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 8,
      "minute": 30,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 8,
      "minute": 30,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 8,
      "minute": 30,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/stationClock/stationClock-slot-2/stationClock-2a

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-2].variants[stationClock-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-2/stationClock-2a -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-2",
  "variantId": "stationClock-2a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      9,
      45,
      "kwart voor tien"
    ],
    "description": "analogue 09:45 → Kwart voor tien",
    "values": {
      "hour": 9,
      "minute": 45,
      "spokenAnswer": "Kwart voor tien"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Kwart voor tien",
  "authoredChoices": [
    "Kwart over negen",
    "Kwart voor negen",
    "Half tien",
    "Kwart voor tien"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 9: dat is kwart voor. Kijk welk uur eraan komt.",
  "explanation": "De grote wijzer staat op de 9. De kleine wijzer gaat naar de 10. Het is kwart voor tien.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 9. De kleine wijzer gaat naar de 10. Het is kwart voor tien.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 9,
      "minute": 45
    },
    "minnie": {
      "type": "clock",
      "hour": 9,
      "minute": 45
    },
    "moose": {
      "type": "clock",
      "hour": 9,
      "minute": 45
    },
    "explanation": {
      "type": "clock",
      "hour": 9,
      "minute": 45
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/stationClock/stationClock-slot-2/stationClock-2b

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-2].variants[stationClock-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-2/stationClock-2b -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-2",
  "variantId": "stationClock-2b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      6,
      5,
      "vijf over zes"
    ],
    "description": "digital 06:05 → Vijf over zes",
    "values": {
      "hour": 6,
      "minute": 5,
      "spokenAnswer": "Vijf over zes"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Vijf over zes",
  "authoredChoices": [
    "Vijf voor zes",
    "Vijf over zes",
    "Vijf over zeven",
    "Zes uur"
  ],
  "minnie": "Kijk naar de minuten rechts van de dubbele punt. 05 betekent dat er 5 minuten voorbij het hele uur zijn.",
  "moose": "Links staat 06. Het is dus 5 minuten na zes. Hoe zeg je 5 minuten na zes in woorden?",
  "explanation": "De digitale klok geeft 06:05 aan. De 05 betekent 5 minuten na het hele uur. Het hele uur is zes uur. Daarom is 06:05 vijf over zes.",
  "assistedCompletionExplanation": "De digitale klok geeft 06:05 aan. De 05 betekent 5 minuten na het hele uur. Het hele uur is zes uur. Daarom is 06:05 vijf over zes.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 6,
      "minute": 5,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 6,
      "minute": 5,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 6,
      "minute": 5,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 6,
      "minute": 5,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/stationClock/stationClock-slot-3/stationClock-3a

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-3].variants[stationClock-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-3/stationClock-3a -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-3",
  "variantId": "stationClock-3a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      10,
      20,
      "tien voor half elf"
    ],
    "description": "analogue 10:20 → Tien voor half elf",
    "values": {
      "hour": 10,
      "minute": 20,
      "spokenAnswer": "Tien voor half elf"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Tien voor half elf",
  "authoredChoices": [
    "Tien over tien",
    "Tien voor half tien",
    "Tien voor half elf",
    "Tien over half elf"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 4: dat is tien voor half. Kijk naar welk uur de kleine wijzer onderweg is.",
  "explanation": "De grote wijzer staat op de 4: twintig minuten over tien. Dat is tien voor half elf.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 4: twintig minuten over tien. Dat is tien voor half elf.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 10,
      "minute": 20
    },
    "minnie": {
      "type": "clock",
      "hour": 10,
      "minute": 20
    },
    "moose": {
      "type": "clock",
      "hour": 10,
      "minute": 20
    },
    "explanation": {
      "type": "clock",
      "hour": 10,
      "minute": 20
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/stationClock/stationClock-slot-3/stationClock-3b

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-3].variants[stationClock-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-3/stationClock-3b -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-3",
  "variantId": "stationClock-3b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      11,
      35,
      "vijf over half twaalf"
    ],
    "description": "digital 11:35 → Vijf over half twaalf",
    "values": {
      "hour": 11,
      "minute": 35,
      "spokenAnswer": "Vijf over half twaalf"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Vijf over half twaalf",
  "authoredChoices": [
    "Vijf voor half twaalf",
    "Vijf over half elf",
    "Vijf over half twaalf",
    "Vijf voor twaalf"
  ],
  "minnie": "35 minuten is 5 minuten ná een half uur.",
  "moose": "Een half uur na elf noemen we half twaalf. Deze tijd is 5 minuten daarna.",
  "explanation": "De digitale klok geeft 11:35 aan. Een half uur na elf noemen we half twaalf. 35 minuten is 5 minuten ná dat halve uur. Daarom is 11:35 vijf over half twaalf.",
  "assistedCompletionExplanation": "De digitale klok geeft 11:35 aan. Een half uur na elf noemen we half twaalf. 35 minuten is 5 minuten ná dat halve uur. Daarom is 11:35 vijf over half twaalf.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 11,
      "minute": 35,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 11,
      "minute": 35,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 11,
      "minute": 35,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 11,
      "minute": 35,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/stationClock/stationClock-slot-4/stationClock-4a

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-4].variants[stationClock-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-4/stationClock-4a -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-4",
  "variantId": "stationClock-4a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      0,
      55,
      "vijf voor één"
    ],
    "description": "analogue 12:55 → Vijf voor één",
    "values": {
      "hour": 12,
      "minute": 55,
      "spokenAnswer": "Vijf voor één"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Vijf voor één",
  "authoredChoices": [
    "Vijf over twaalf",
    "Vijf voor twaalf",
    "Vijf voor één",
    "Vijf over één"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 11: dat is vijf voor. Kijk welk uur eraan komt.",
  "explanation": "De grote wijzer staat op de 11. Over vijf minuten is het één uur: vijf voor één.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 11. Over vijf minuten is het één uur: vijf voor één.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 12,
      "minute": 55
    },
    "minnie": {
      "type": "clock",
      "hour": 12,
      "minute": 55
    },
    "moose": {
      "type": "clock",
      "hour": 12,
      "minute": 55
    },
    "explanation": {
      "type": "clock",
      "hour": 12,
      "minute": 55
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/stationClock/stationClock-slot-4/stationClock-4b

Source: `Levels/LVL-0036/level.js#learningChallenges[stationClock].questions[stationClock-slot-4].variants[stationClock-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/stationClock/stationClock-slot-4/stationClock-4b -->
```json
{
  "level": "LVL-0036",
  "challenge": "stationClock",
  "slot": "stationClock-slot-4",
  "variantId": "stationClock-4b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      5,
      40,
      "tien over half zes"
    ],
    "description": "digital 05:40 → Tien over half zes",
    "values": {
      "hour": 5,
      "minute": 40,
      "spokenAnswer": "Tien over half zes"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Tien over half zes",
  "authoredChoices": [
    "Tien voor half zes",
    "Tien over half vijf",
    "Tien over zes",
    "Tien over half zes"
  ],
  "minnie": "40 minuten is 10 minuten ná een half uur.",
  "moose": "Een half uur na vijf noemen we half zes. Deze tijd is 10 minuten daarna.",
  "explanation": "De digitale klok geeft 05:40 aan. Een half uur na vijf noemen we half zes. 40 minuten is 10 minuten ná dat halve uur. Daarom is 05:40 tien over half zes.",
  "assistedCompletionExplanation": "De digitale klok geeft 05:40 aan. Een half uur na vijf noemen we half zes. 40 minuten is 10 minuten ná dat halve uur. Daarom is 05:40 tien over half zes.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 5,
      "minute": 40,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 5,
      "minute": 40,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 5,
      "minute": 40,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 5,
      "minute": 40,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1a

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-1].variants[illuminatedBooth-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1a -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-1",
  "variantId": "illuminatedBooth-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      7
    ],
    "description": "6 × 7 = 42",
    "values": {
      "a": 6,
      "b": 7,
      "answer": 42
    },
    "operation": "multiplication",
    "a": 6,
    "b": 7,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "6 × 7 = ?",
  "answerMode": "open",
  "canonicalAnswer": 42,
  "authoredChoices": null,
  "minnie": "Denk aan 6 groepjes van 7.",
  "moose": "Reken eerst 7 × 5 en tel er nog 7 bij.",
  "explanation": "6 × 7 = 42.",
  "assistedCompletionExplanation": "6 × 7 = 42.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 6,
    "b": 7
  }
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1b

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-1].variants[illuminatedBooth-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1b -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-1",
  "variantId": "illuminatedBooth-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      9
    ],
    "description": "8 × 9 = 72",
    "values": {
      "a": 8,
      "b": 9,
      "answer": 72
    },
    "operation": "multiplication",
    "a": 8,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "8 × 9 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 72,
  "authoredChoices": [
    64,
    72,
    63,
    81
  ],
  "minnie": "Denk aan 8 groepjes van 9.",
  "moose": "Reken eerst 8 × 10 en haal er één groepje van 8 af.",
  "explanation": "8 × 9 = 72.",
  "assistedCompletionExplanation": "8 × 9 = 72.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 8,
    "b": 9
  }
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2a

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-2].variants[illuminatedBooth-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2a -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-2",
  "variantId": "illuminatedBooth-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      8
    ],
    "description": "7 × 8 = 56",
    "values": {
      "a": 7,
      "b": 8,
      "answer": 56
    },
    "operation": "multiplication",
    "a": 7,
    "b": 8,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "7 × 8 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 56,
  "authoredChoices": [
    48,
    54,
    56,
    64
  ],
  "minnie": "Denk aan 7 groepjes van 8.",
  "moose": "Reken eerst 8 × 5 en tel er nog twee groepjes van 8 bij.",
  "explanation": "7 × 8 = 56.",
  "assistedCompletionExplanation": "7 × 8 = 56.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 7,
    "b": 8
  }
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2b

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-2].variants[illuminatedBooth-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2b -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-2",
  "variantId": "illuminatedBooth-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      6
    ],
    "description": "9 × 6 = 54",
    "values": {
      "a": 9,
      "b": 6,
      "answer": 54
    },
    "operation": "multiplication",
    "a": 9,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "9 × 6 = ?",
  "answerMode": "open",
  "canonicalAnswer": 54,
  "authoredChoices": null,
  "minnie": "Denk aan 9 groepjes van 6.",
  "moose": "Reken eerst 6 × 10 en haal er één groepje van 6 af.",
  "explanation": "9 × 6 = 54.",
  "assistedCompletionExplanation": "9 × 6 = 54.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 9,
    "b": 6
  }
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-3/illuminatedBooth-3a

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-3].variants[illuminatedBooth-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-3/illuminatedBooth-3a -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-3",
  "variantId": "illuminatedBooth-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      8,
      "lampen"
    ],
    "description": "6 × 8 = 48 lampen",
    "values": {
      "a": 6,
      "b": 8,
      "unit": "lampen",
      "answer": 48
    },
    "operation": "multiplication",
    "a": 6,
    "b": 8,
    "unit": "lampen",
    "type": "arithmetic"
  },
  "question": "In het diensthuisje liggen 6 dozen met elk 8 lampen. Hoeveel lampen zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 48,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 6 groepjes van 8. Reken 6 × 8.",
  "explanation": "6 × 8 = 48. Het antwoord is 48 lampen.",
  "assistedCompletionExplanation": "6 × 8 = 48. Het antwoord is 48 lampen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "lampen",
  "hintParameters": {
    "a": 6,
    "b": 8,
    "unit": "lampen"
  }
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-3/illuminatedBooth-3b

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-3].variants[illuminatedBooth-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-3/illuminatedBooth-3b -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-3",
  "variantId": "illuminatedBooth-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      9,
      "schroeven"
    ],
    "description": "7 × 9 = 63 schroeven",
    "values": {
      "a": 7,
      "b": 9,
      "unit": "schroeven",
      "answer": 63
    },
    "operation": "multiplication",
    "a": 7,
    "b": 9,
    "unit": "schroeven",
    "type": "arithmetic"
  },
  "question": "Een monteur heeft 7 zakjes met elk 9 schroeven. Hoeveel schroeven heeft hij?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 63,
  "authoredChoices": [
    56,
    63,
    72,
    49
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 7 groepjes van 9. Reken 7 × 9.",
  "explanation": "7 × 9 = 63. Het antwoord is 63 schroeven.",
  "assistedCompletionExplanation": "7 × 9 = 63. Het antwoord is 63 schroeven.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "schroeven",
  "hintParameters": {
    "a": 7,
    "b": 9,
    "unit": "schroeven"
  }
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-4/illuminatedBooth-4a

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-4].variants[illuminatedBooth-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-4/illuminatedBooth-4a -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-4",
  "variantId": "illuminatedBooth-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      48,
      6
    ],
    "description": "48 ÷ 6 = 8",
    "values": {
      "a": 48,
      "b": 6,
      "answer": 8
    },
    "operation": "division",
    "a": 48,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "48 : 6 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 8,
  "authoredChoices": [
    6,
    7,
    8,
    9
  ],
  "minnie": "Welke keersom met 6 helpt je bij 48 : 6?",
  "moose": "Zoek in de tafel van 6 welk getal precies op 48 uitkomt.",
  "explanation": "48 : 6 = 8.",
  "assistedCompletionExplanation": "48 : 6 = 8.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 48,
    "b": 6
  }
}
```

### LVL-0036/illuminatedBooth/illuminatedBooth-slot-4/illuminatedBooth-4b

Source: `Levels/LVL-0036/level.js#learningChallenges[illuminatedBooth].questions[illuminatedBooth-slot-4].variants[illuminatedBooth-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/illuminatedBooth/illuminatedBooth-slot-4/illuminatedBooth-4b -->
```json
{
  "level": "LVL-0036",
  "challenge": "illuminatedBooth",
  "slot": "illuminatedBooth-slot-4",
  "variantId": "illuminatedBooth-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      56,
      7,
      "batterijen"
    ],
    "description": "56 ÷ 7 = 8 batterijen",
    "values": {
      "a": 56,
      "b": 7,
      "unit": "batterijen",
      "answer": 8
    },
    "operation": "division",
    "a": 56,
    "b": 7,
    "unit": "batterijen",
    "type": "arithmetic"
  },
  "question": "De monteur verdeelt 56 batterijen eerlijk over 7 bakken. Hoeveel batterijen komen in elke bak?",
  "answerMode": "open",
  "canonicalAnswer": 8,
  "authoredChoices": null,
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 56 over 7 gelijke groepjes. Reken 56 : 7.",
  "explanation": "56 : 7 = 8. Het antwoord is 8 batterijen.",
  "assistedCompletionExplanation": "56 : 7 = 8. Het antwoord is 8 batterijen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "batterijen",
  "hintParameters": {
    "a": 56,
    "b": 7,
    "unit": "batterijen"
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1a

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-1].variants[serviceBooth-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1a -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-1",
  "variantId": "serviceBooth-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      6
    ],
    "description": "8 × 6 = 48",
    "values": {
      "a": 8,
      "b": 6,
      "answer": 48
    },
    "operation": "multiplication",
    "a": 8,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "8 × 6 = ?",
  "answerMode": "open",
  "canonicalAnswer": 48,
  "authoredChoices": null,
  "minnie": "Denk aan 8 groepjes van 6.",
  "moose": "Reken eerst 8 × 5 en tel er nog 8 bij.",
  "explanation": "8 × 6 = 48.",
  "assistedCompletionExplanation": "8 × 6 = 48.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 8,
    "b": 6
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1b

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-1].variants[serviceBooth-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1b -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-1",
  "variantId": "serviceBooth-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      9
    ],
    "description": "7 × 9 = 63",
    "values": {
      "a": 7,
      "b": 9,
      "answer": 63
    },
    "operation": "multiplication",
    "a": 7,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "7 × 9 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 63,
  "authoredChoices": [
    54,
    56,
    63,
    72
  ],
  "minnie": "Denk aan 7 groepjes van 9.",
  "moose": "Reken eerst 7 × 10 en haal er één groepje van 7 af.",
  "explanation": "7 × 9 = 63.",
  "assistedCompletionExplanation": "7 × 9 = 63.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 7,
    "b": 9
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2a

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-2].variants[serviceBooth-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2a -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-2",
  "variantId": "serviceBooth-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      9
    ],
    "description": "6 × 9 = 54",
    "values": {
      "a": 6,
      "b": 9,
      "answer": 54
    },
    "operation": "multiplication",
    "a": 6,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "6 × 9 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 54,
  "authoredChoices": [
    45,
    48,
    54,
    63
  ],
  "minnie": "Denk aan 6 groepjes van 9.",
  "moose": "Reken eerst 6 × 10 en haal er één groepje van 6 af.",
  "explanation": "6 × 9 = 54.",
  "assistedCompletionExplanation": "6 × 9 = 54.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 6,
    "b": 9
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2b

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-2].variants[serviceBooth-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2b -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-2",
  "variantId": "serviceBooth-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      7
    ],
    "description": "8 × 7 = 56",
    "values": {
      "a": 8,
      "b": 7,
      "answer": 56
    },
    "operation": "multiplication",
    "a": 8,
    "b": 7,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "8 × 7 = ?",
  "answerMode": "open",
  "canonicalAnswer": 56,
  "authoredChoices": null,
  "minnie": "Denk aan 8 groepjes van 7.",
  "moose": "Reken eerst 8 × 5 en tel er nog twee groepjes van 8 bij.",
  "explanation": "8 × 7 = 56.",
  "assistedCompletionExplanation": "8 × 7 = 56.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 8,
    "b": 7
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-3/serviceBooth-3a

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-3].variants[serviceBooth-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-3/serviceBooth-3a -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-3",
  "variantId": "serviceBooth-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      7,
      "kabels"
    ],
    "description": "8 × 7 = 56 kabels",
    "values": {
      "a": 8,
      "b": 7,
      "unit": "kabels",
      "answer": 56
    },
    "operation": "multiplication",
    "a": 8,
    "b": 7,
    "unit": "kabels",
    "type": "arithmetic"
  },
  "question": "Bij de installatie liggen 8 bundels met elk 7 kabels. Hoeveel kabels zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 56,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 8 groepjes van 7. Reken 8 × 7.",
  "explanation": "8 × 7 = 56. Het antwoord is 56 kabels.",
  "assistedCompletionExplanation": "8 × 7 = 56. Het antwoord is 56 kabels.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "kabels",
  "hintParameters": {
    "a": 8,
    "b": 7,
    "unit": "kabels"
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-3/serviceBooth-3b

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-3].variants[serviceBooth-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-3/serviceBooth-3b -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-3",
  "variantId": "serviceBooth-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      6,
      "sleutels"
    ],
    "description": "9 × 6 = 54 sleutels",
    "values": {
      "a": 9,
      "b": 6,
      "unit": "sleutels",
      "answer": 54
    },
    "operation": "multiplication",
    "a": 9,
    "b": 6,
    "unit": "sleutels",
    "type": "arithmetic"
  },
  "question": "Er zijn 9 gereedschapskisten met elk 6 sleutels. Hoeveel sleutels zijn dat samen?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 54,
  "authoredChoices": [
    45,
    54,
    56,
    63
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 9 groepjes van 6. Reken 9 × 6.",
  "explanation": "9 × 6 = 54. Het antwoord is 54 sleutels.",
  "assistedCompletionExplanation": "9 × 6 = 54. Het antwoord is 54 sleutels.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "sleutels",
  "hintParameters": {
    "a": 9,
    "b": 6,
    "unit": "sleutels"
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-4/serviceBooth-4a

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-4].variants[serviceBooth-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-4/serviceBooth-4a -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-4",
  "variantId": "serviceBooth-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      63,
      9
    ],
    "description": "63 ÷ 9 = 7",
    "values": {
      "a": 63,
      "b": 9,
      "answer": 7
    },
    "operation": "division",
    "a": 63,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "63 : 9 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 7,
  "authoredChoices": [
    6,
    7,
    8,
    9
  ],
  "minnie": "Welke keersom met 9 helpt je bij 63 : 9?",
  "moose": "Zoek in de tafel van 9 welk getal precies op 63 uitkomt.",
  "explanation": "63 : 9 = 7.",
  "assistedCompletionExplanation": "63 : 9 = 7.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 63,
    "b": 9
  }
}
```

### LVL-0036/serviceBooth/serviceBooth-slot-4/serviceBooth-4b

Source: `Levels/LVL-0036/level.js#learningChallenges[serviceBooth].questions[serviceBooth-slot-4].variants[serviceBooth-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0036/serviceBooth/serviceBooth-slot-4/serviceBooth-4b -->
```json
{
  "level": "LVL-0036",
  "challenge": "serviceBooth",
  "slot": "serviceBooth-slot-4",
  "variantId": "serviceBooth-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      72,
      8,
      "bouten"
    ],
    "description": "72 ÷ 8 = 9 bouten",
    "values": {
      "a": 72,
      "b": 8,
      "unit": "bouten",
      "answer": 9
    },
    "operation": "division",
    "a": 72,
    "b": 8,
    "unit": "bouten",
    "type": "arithmetic"
  },
  "question": "Een monteur verdeelt 72 bouten eerlijk over 8 zakjes. Hoeveel bouten komen in elk zakje?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 9,
  "authoredChoices": [
    7,
    8,
    9,
    10
  ],
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 72 over 8 gelijke groepjes. Reken 72 : 8.",
  "explanation": "72 : 8 = 9. Het antwoord is 9 bouten.",
  "assistedCompletionExplanation": "72 : 8 = 9. Het antwoord is 9 bouten.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "bouten",
  "hintParameters": {
    "a": 72,
    "b": 8,
    "unit": "bouten"
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1a

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-1].variants[expeditionMarker-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1a -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-1",
  "variantId": "expeditionMarker-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      7
    ],
    "description": "9 × 7 = 63",
    "values": {
      "a": 9,
      "b": 7,
      "answer": 63
    },
    "operation": "multiplication",
    "a": 9,
    "b": 7,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "9 × 7 = ?",
  "answerMode": "open",
  "canonicalAnswer": 63,
  "authoredChoices": null,
  "minnie": "Denk aan 9 groepjes van 7.",
  "moose": "Reken eerst 7 × 10 en haal er één groepje van 7 af.",
  "explanation": "9 × 7 = 63.",
  "assistedCompletionExplanation": "9 × 7 = 63.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 9,
    "b": 7
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1b

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-1].variants[expeditionMarker-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1b -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-1",
  "variantId": "expeditionMarker-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      8
    ],
    "description": "6 × 8 = 48",
    "values": {
      "a": 6,
      "b": 8,
      "answer": 48
    },
    "operation": "multiplication",
    "a": 6,
    "b": 8,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "6 × 8 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 48,
  "authoredChoices": [
    42,
    48,
    54,
    56
  ],
  "minnie": "Denk aan 6 groepjes van 8.",
  "moose": "Reken eerst 8 × 5 en tel er nog 8 bij.",
  "explanation": "6 × 8 = 48.",
  "assistedCompletionExplanation": "6 × 8 = 48.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 6,
    "b": 8
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2a

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-2].variants[expeditionMarker-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2a -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-2",
  "variantId": "expeditionMarker-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      8
    ],
    "description": "8 × 8 = 64",
    "values": {
      "a": 8,
      "b": 8,
      "answer": 64
    },
    "operation": "multiplication",
    "a": 8,
    "b": 8,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "8 × 8 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 64,
  "authoredChoices": [
    56,
    63,
    64,
    72
  ],
  "minnie": "Denk aan 8 groepjes van 8.",
  "moose": "Reken eerst 8 × 4 en verdubbel die uitkomst.",
  "explanation": "8 × 8 = 64.",
  "assistedCompletionExplanation": "8 × 8 = 64.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 8,
    "b": 8
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2b

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-2].variants[expeditionMarker-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2b -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-2",
  "variantId": "expeditionMarker-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      6
    ],
    "description": "7 × 6 = 42",
    "values": {
      "a": 7,
      "b": 6,
      "answer": 42
    },
    "operation": "multiplication",
    "a": 7,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "7 × 6 = ?",
  "answerMode": "open",
  "canonicalAnswer": 42,
  "authoredChoices": null,
  "minnie": "Denk aan 7 groepjes van 6.",
  "moose": "Reken eerst 7 × 5 en tel er nog 7 bij.",
  "explanation": "7 × 6 = 42.",
  "assistedCompletionExplanation": "7 × 6 = 42.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 7,
    "b": 6
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-3/expeditionMarker-3a

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-3].variants[expeditionMarker-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-3/expeditionMarker-3a -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-3",
  "variantId": "expeditionMarker-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      6,
      "haringen"
    ],
    "description": "7 × 6 = 42 haringen",
    "values": {
      "a": 7,
      "b": 6,
      "unit": "haringen",
      "answer": 42
    },
    "operation": "multiplication",
    "a": 7,
    "b": 6,
    "unit": "haringen",
    "type": "arithmetic"
  },
  "question": "De expeditie heeft 7 tassen met elk 6 haringen voor tenten. Hoeveel haringen zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 42,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 7 groepjes van 6. Reken 7 × 6.",
  "explanation": "7 × 6 = 42. Het antwoord is 42 haringen.",
  "assistedCompletionExplanation": "7 × 6 = 42. Het antwoord is 42 haringen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "haringen",
  "hintParameters": {
    "a": 7,
    "b": 6,
    "unit": "haringen"
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-3/expeditionMarker-3b

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-3].variants[expeditionMarker-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-3/expeditionMarker-3b -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-3",
  "variantId": "expeditionMarker-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      9,
      "repen"
    ],
    "description": "8 × 9 = 72 repen",
    "values": {
      "a": 8,
      "b": 9,
      "unit": "repen",
      "answer": 72
    },
    "operation": "multiplication",
    "a": 8,
    "b": 9,
    "unit": "repen",
    "type": "arithmetic"
  },
  "question": "Er zijn 8 wandelaars. Ieder draagt 9 repen. Hoeveel repen dragen ze samen?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 72,
  "authoredChoices": [
    63,
    64,
    72,
    81
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 8 groepjes van 9. Reken 8 × 9.",
  "explanation": "8 × 9 = 72. Het antwoord is 72 repen.",
  "assistedCompletionExplanation": "8 × 9 = 72. Het antwoord is 72 repen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "repen",
  "hintParameters": {
    "a": 8,
    "b": 9,
    "unit": "repen"
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-4/expeditionMarker-4a

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-4].variants[expeditionMarker-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-4/expeditionMarker-4a -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-4",
  "variantId": "expeditionMarker-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      54,
      6
    ],
    "description": "54 ÷ 6 = 9",
    "values": {
      "a": 54,
      "b": 6,
      "answer": 9
    },
    "operation": "division",
    "a": 54,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "54 : 6 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 9,
  "authoredChoices": [
    7,
    8,
    9,
    10
  ],
  "minnie": "Welke keersom met 6 helpt je bij 54 : 6?",
  "moose": "Zoek in de tafel van 6 welk getal precies op 54 uitkomt.",
  "explanation": "54 : 6 = 9.",
  "assistedCompletionExplanation": "54 : 6 = 9.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 54,
    "b": 6
  }
}
```

### LVL-0037/expeditionMarker/expeditionMarker-slot-4/expeditionMarker-4b

Source: `Levels/LVL-0037/level.js#learningChallenges[expeditionMarker].questions[expeditionMarker-slot-4].variants[expeditionMarker-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/expeditionMarker/expeditionMarker-slot-4/expeditionMarker-4b -->
```json
{
  "level": "LVL-0037",
  "challenge": "expeditionMarker",
  "slot": "expeditionMarker-slot-4",
  "variantId": "expeditionMarker-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      42,
      7,
      "linten"
    ],
    "description": "42 ÷ 7 = 6 linten",
    "values": {
      "a": 42,
      "b": 7,
      "unit": "linten",
      "answer": 6
    },
    "operation": "division",
    "a": 42,
    "b": 7,
    "unit": "linten",
    "type": "arithmetic"
  },
  "question": "Een gids verdeelt 42 linten eerlijk over 7 groepen. Hoeveel linten krijgt elke groep?",
  "answerMode": "open",
  "canonicalAnswer": 6,
  "authoredChoices": null,
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 42 over 7 gelijke groepjes. Reken 42 : 7.",
  "explanation": "42 : 7 = 6. Het antwoord is 6 linten.",
  "assistedCompletionExplanation": "42 : 7 = 6. Het antwoord is 6 linten.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "linten",
  "hintParameters": {
    "a": 42,
    "b": 7,
    "unit": "linten"
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1a

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-1].variants[stoneCairn-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1a -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-1",
  "variantId": "stoneCairn-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      7
    ],
    "description": "7 × 7 = 49",
    "values": {
      "a": 7,
      "b": 7,
      "answer": 49
    },
    "operation": "multiplication",
    "a": 7,
    "b": 7,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "7 × 7 = ?",
  "answerMode": "open",
  "canonicalAnswer": 49,
  "authoredChoices": null,
  "minnie": "Denk aan 7 groepjes van 7.",
  "moose": "Reken eerst 7 × 5 en tel er nog twee groepjes van 7 bij.",
  "explanation": "7 × 7 = 49.",
  "assistedCompletionExplanation": "7 × 7 = 49.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 7,
    "b": 7
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1b

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-1].variants[stoneCairn-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1b -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-1",
  "variantId": "stoneCairn-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      8
    ],
    "description": "9 × 8 = 72",
    "values": {
      "a": 9,
      "b": 8,
      "answer": 72
    },
    "operation": "multiplication",
    "a": 9,
    "b": 8,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "9 × 8 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 72,
  "authoredChoices": [
    63,
    64,
    72,
    81
  ],
  "minnie": "Denk aan 9 groepjes van 8.",
  "moose": "Reken eerst 8 × 10 en haal er één groepje van 8 af.",
  "explanation": "9 × 8 = 72.",
  "assistedCompletionExplanation": "9 × 8 = 72.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 9,
    "b": 8
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2a

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-2].variants[stoneCairn-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2a -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-2",
  "variantId": "stoneCairn-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      6
    ],
    "description": "6 × 6 = 36",
    "values": {
      "a": 6,
      "b": 6,
      "answer": 36
    },
    "operation": "multiplication",
    "a": 6,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "6 × 6 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 36,
  "authoredChoices": [
    30,
    36,
    42,
    48
  ],
  "minnie": "Denk aan 6 groepjes van 6.",
  "moose": "Reken eerst 6 × 5 en tel er nog 6 bij.",
  "explanation": "6 × 6 = 36.",
  "assistedCompletionExplanation": "6 × 6 = 36.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 6,
    "b": 6
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2b

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-2].variants[stoneCairn-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2b -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-2",
  "variantId": "stoneCairn-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      6
    ],
    "description": "8 × 6 = 48",
    "values": {
      "a": 8,
      "b": 6,
      "answer": 48
    },
    "operation": "multiplication",
    "a": 8,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "8 × 6 = ?",
  "answerMode": "open",
  "canonicalAnswer": 48,
  "authoredChoices": null,
  "minnie": "Denk aan 8 groepjes van 6.",
  "moose": "Reken eerst 8 × 5 en tel er nog 8 bij.",
  "explanation": "8 × 6 = 48.",
  "assistedCompletionExplanation": "8 × 6 = 48.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 8,
    "b": 6
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-3/stoneCairn-3a

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-3].variants[stoneCairn-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-3/stoneCairn-3a -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-3",
  "variantId": "stoneCairn-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      7,
      "steentjes"
    ],
    "description": "9 × 7 = 63 steentjes",
    "values": {
      "a": 9,
      "b": 7,
      "unit": "steentjes",
      "answer": 63
    },
    "operation": "multiplication",
    "a": 9,
    "b": 7,
    "unit": "steentjes",
    "type": "arithmetic"
  },
  "question": "De gids bewaart 9 zakjes met elk 7 steentjes. Hoeveel steentjes zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 63,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 9 groepjes van 7. Reken 9 × 7.",
  "explanation": "9 × 7 = 63. Het antwoord is 63 steentjes.",
  "assistedCompletionExplanation": "9 × 7 = 63. Het antwoord is 63 steentjes.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "steentjes",
  "hintParameters": {
    "a": 9,
    "b": 7,
    "unit": "steentjes"
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-3/stoneCairn-3b

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-3].variants[stoneCairn-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-3/stoneCairn-3b -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-3",
  "variantId": "stoneCairn-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      9,
      "plekken"
    ],
    "description": "6 × 9 = 54 plekken",
    "values": {
      "a": 6,
      "b": 9,
      "unit": "plekken",
      "answer": 54
    },
    "operation": "multiplication",
    "a": 6,
    "b": 9,
    "unit": "plekken",
    "type": "arithmetic"
  },
  "question": "Er zijn 6 routekaarten met elk 9 gemarkeerde plekken. Hoeveel plekken zijn dat samen?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 54,
  "authoredChoices": [
    45,
    48,
    54,
    63
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 6 groepjes van 9. Reken 6 × 9.",
  "explanation": "6 × 9 = 54. Het antwoord is 54 plekken.",
  "assistedCompletionExplanation": "6 × 9 = 54. Het antwoord is 54 plekken.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "plekken",
  "hintParameters": {
    "a": 6,
    "b": 9,
    "unit": "plekken"
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-4/stoneCairn-4a

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-4].variants[stoneCairn-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-4/stoneCairn-4a -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-4",
  "variantId": "stoneCairn-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      56,
      8
    ],
    "description": "56 ÷ 8 = 7",
    "values": {
      "a": 56,
      "b": 8,
      "answer": 7
    },
    "operation": "division",
    "a": 56,
    "b": 8,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "56 : 8 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 7,
  "authoredChoices": [
    6,
    7,
    8,
    9
  ],
  "minnie": "Welke keersom met 8 helpt je bij 56 : 8?",
  "moose": "Zoek in de tafel van 8 welk getal precies op 56 uitkomt.",
  "explanation": "56 : 8 = 7.",
  "assistedCompletionExplanation": "56 : 8 = 7.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 56,
    "b": 8
  }
}
```

### LVL-0037/stoneCairn/stoneCairn-slot-4/stoneCairn-4b

Source: `Levels/LVL-0037/level.js#learningChallenges[stoneCairn].questions[stoneCairn-slot-4].variants[stoneCairn-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/stoneCairn/stoneCairn-slot-4/stoneCairn-4b -->
```json
{
  "level": "LVL-0037",
  "challenge": "stoneCairn",
  "slot": "stoneCairn-slot-4",
  "variantId": "stoneCairn-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      48,
      6,
      "kaartjes"
    ],
    "description": "48 ÷ 6 = 8 kaartjes",
    "values": {
      "a": 48,
      "b": 6,
      "unit": "kaartjes",
      "answer": 8
    },
    "operation": "division",
    "a": 48,
    "b": 6,
    "unit": "kaartjes",
    "type": "arithmetic"
  },
  "question": "De gids verdeelt 48 kaartjes eerlijk over 6 wandelaars. Hoeveel kaartjes krijgt elke wandelaar?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 8,
  "authoredChoices": [
    6,
    7,
    8,
    9
  ],
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 48 over 6 gelijke groepjes. Reken 48 : 6.",
  "explanation": "48 : 6 = 8. Het antwoord is 8 kaartjes.",
  "assistedCompletionExplanation": "48 : 6 = 8. Het antwoord is 8 kaartjes.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "kaartjes",
  "hintParameters": {
    "a": 48,
    "b": 6,
    "unit": "kaartjes"
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1a

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-1].variants[technicalInstallation-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1a -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-1",
  "variantId": "technicalInstallation-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      9
    ],
    "description": "6 × 9 = 54",
    "values": {
      "a": 6,
      "b": 9,
      "answer": 54
    },
    "operation": "multiplication",
    "a": 6,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "6 × 9 = ?",
  "answerMode": "open",
  "canonicalAnswer": 54,
  "authoredChoices": null,
  "minnie": "Denk aan 6 groepjes van 9.",
  "moose": "Reken eerst 6 × 10 en haal er één groepje van 6 af.",
  "explanation": "6 × 9 = 54.",
  "assistedCompletionExplanation": "6 × 9 = 54.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 6,
    "b": 9
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1b

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-1].variants[technicalInstallation-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1b -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-1",
  "variantId": "technicalInstallation-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      7
    ],
    "description": "8 × 7 = 56",
    "values": {
      "a": 8,
      "b": 7,
      "answer": 56
    },
    "operation": "multiplication",
    "a": 8,
    "b": 7,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "8 × 7 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 56,
  "authoredChoices": [
    42,
    48,
    56,
    64
  ],
  "minnie": "Denk aan 8 groepjes van 7.",
  "moose": "Reken eerst 8 × 5 en tel er nog twee groepjes van 8 bij.",
  "explanation": "8 × 7 = 56.",
  "assistedCompletionExplanation": "8 × 7 = 56.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 8,
    "b": 7
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2a

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-2].variants[technicalInstallation-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2a -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-2",
  "variantId": "technicalInstallation-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      9
    ],
    "description": "9 × 9 = 81",
    "values": {
      "a": 9,
      "b": 9,
      "answer": 81
    },
    "operation": "multiplication",
    "a": 9,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "9 × 9 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 81,
  "authoredChoices": [
    72,
    80,
    81,
    90
  ],
  "minnie": "Denk aan 9 groepjes van 9.",
  "moose": "Reken eerst 9 × 10 en haal er één groepje van 9 af.",
  "explanation": "9 × 9 = 81.",
  "assistedCompletionExplanation": "9 × 9 = 81.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 9,
    "b": 9
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2b

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-2].variants[technicalInstallation-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2b -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-2",
  "variantId": "technicalInstallation-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      8
    ],
    "description": "7 × 8 = 56",
    "values": {
      "a": 7,
      "b": 8,
      "answer": 56
    },
    "operation": "multiplication",
    "a": 7,
    "b": 8,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "7 × 8 = ?",
  "answerMode": "open",
  "canonicalAnswer": 56,
  "authoredChoices": null,
  "minnie": "Denk aan 7 groepjes van 8.",
  "moose": "Reken eerst 8 × 5 en tel er nog twee groepjes van 8 bij.",
  "explanation": "7 × 8 = 56.",
  "assistedCompletionExplanation": "7 × 8 = 56.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 7,
    "b": 8
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-3/technicalInstallation-3a

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-3].variants[technicalInstallation-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-3/technicalInstallation-3a -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-3",
  "variantId": "technicalInstallation-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      7,
      "aansluitingen"
    ],
    "description": "6 × 7 = 42 aansluitingen",
    "values": {
      "a": 6,
      "b": 7,
      "unit": "aansluitingen",
      "answer": 42
    },
    "operation": "multiplication",
    "a": 6,
    "b": 7,
    "unit": "aansluitingen",
    "type": "arithmetic"
  },
  "question": "In de kast zitten 6 rijen met elk 7 aansluitingen. Hoeveel aansluitingen zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 42,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 6 groepjes van 7. Reken 6 × 7.",
  "explanation": "6 × 7 = 42. Het antwoord is 42 aansluitingen.",
  "assistedCompletionExplanation": "6 × 7 = 42. Het antwoord is 42 aansluitingen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "aansluitingen",
  "hintParameters": {
    "a": 6,
    "b": 7,
    "unit": "aansluitingen"
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-3/technicalInstallation-3b

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-3].variants[technicalInstallation-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-3/technicalInstallation-3b -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-3",
  "variantId": "technicalInstallation-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      6,
      "zekeringen"
    ],
    "description": "8 × 6 = 48 zekeringen",
    "values": {
      "a": 8,
      "b": 6,
      "unit": "zekeringen",
      "answer": 48
    },
    "operation": "multiplication",
    "a": 8,
    "b": 6,
    "unit": "zekeringen",
    "type": "arithmetic"
  },
  "question": "Een technicus heeft 8 sets met elk 6 zekeringen. Hoeveel zekeringen heeft hij?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 48,
  "authoredChoices": [
    40,
    42,
    48,
    56
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 8 groepjes van 6. Reken 8 × 6.",
  "explanation": "8 × 6 = 48. Het antwoord is 48 zekeringen.",
  "assistedCompletionExplanation": "8 × 6 = 48. Het antwoord is 48 zekeringen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "zekeringen",
  "hintParameters": {
    "a": 8,
    "b": 6,
    "unit": "zekeringen"
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-4/technicalInstallation-4a

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-4].variants[technicalInstallation-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-4/technicalInstallation-4a -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-4",
  "variantId": "technicalInstallation-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      81,
      9
    ],
    "description": "81 ÷ 9 = 9",
    "values": {
      "a": 81,
      "b": 9,
      "answer": 9
    },
    "operation": "division",
    "a": 81,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "81 : 9 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 9,
  "authoredChoices": [
    7,
    8,
    9,
    10
  ],
  "minnie": "Welke keersom met 9 helpt je bij 81 : 9?",
  "moose": "Zoek in de tafel van 9 welk getal precies op 81 uitkomt.",
  "explanation": "81 : 9 = 9.",
  "assistedCompletionExplanation": "81 : 9 = 9.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 81,
    "b": 9
  }
}
```

### LVL-0037/technicalInstallation/technicalInstallation-slot-4/technicalInstallation-4b

Source: `Levels/LVL-0037/level.js#learningChallenges[technicalInstallation].questions[technicalInstallation-slot-4].variants[technicalInstallation-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0037/technicalInstallation/technicalInstallation-slot-4/technicalInstallation-4b -->
```json
{
  "level": "LVL-0037",
  "challenge": "technicalInstallation",
  "slot": "technicalInstallation-slot-4",
  "variantId": "technicalInstallation-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      63,
      9,
      "klemmen"
    ],
    "description": "63 ÷ 9 = 7 klemmen",
    "values": {
      "a": 63,
      "b": 9,
      "unit": "klemmen",
      "answer": 7
    },
    "operation": "division",
    "a": 63,
    "b": 9,
    "unit": "klemmen",
    "type": "arithmetic"
  },
  "question": "De technicus verdeelt 63 klemmen eerlijk over 9 doosjes. Hoeveel klemmen komen in elk doosje?",
  "answerMode": "open",
  "canonicalAnswer": 7,
  "authoredChoices": null,
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 63 over 9 gelijke groepjes. Reken 63 : 9.",
  "explanation": "63 : 9 = 7. Het antwoord is 7 klemmen.",
  "assistedCompletionExplanation": "63 : 9 = 7. Het antwoord is 7 klemmen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "klemmen",
  "hintParameters": {
    "a": 63,
    "b": 9,
    "unit": "klemmen"
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1a

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-1].variants[welcomeSign-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1a -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-1",
  "variantId": "welcomeSign-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      9
    ],
    "description": "8 × 9 = 72",
    "values": {
      "a": 8,
      "b": 9,
      "answer": 72
    },
    "operation": "multiplication",
    "a": 8,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "8 × 9 = ?",
  "answerMode": "open",
  "canonicalAnswer": 72,
  "authoredChoices": null,
  "minnie": "Denk aan 8 groepjes van 9.",
  "moose": "Reken eerst 8 × 10 en haal er één groepje van 8 af.",
  "explanation": "8 × 9 = 72.",
  "assistedCompletionExplanation": "8 × 9 = 72.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 8,
    "b": 9
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1b

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-1].variants[welcomeSign-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1b -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-1",
  "variantId": "welcomeSign-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      6
    ],
    "description": "7 × 6 = 42",
    "values": {
      "a": 7,
      "b": 6,
      "answer": 42
    },
    "operation": "multiplication",
    "a": 7,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "7 × 6 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 42,
  "authoredChoices": [
    36,
    42,
    48,
    49
  ],
  "minnie": "Denk aan 7 groepjes van 6.",
  "moose": "Reken eerst 7 × 5 en tel er nog 7 bij.",
  "explanation": "7 × 6 = 42.",
  "assistedCompletionExplanation": "7 × 6 = 42.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 7,
    "b": 6
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2a

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-2].variants[welcomeSign-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2a -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-2",
  "variantId": "welcomeSign-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      7
    ],
    "description": "9 × 7 = 63",
    "values": {
      "a": 9,
      "b": 7,
      "answer": 63
    },
    "operation": "multiplication",
    "a": 9,
    "b": 7,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "9 × 7 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 63,
  "authoredChoices": [
    54,
    56,
    63,
    72
  ],
  "minnie": "Denk aan 9 groepjes van 7.",
  "moose": "Reken eerst 7 × 10 en haal er één groepje van 7 af.",
  "explanation": "9 × 7 = 63.",
  "assistedCompletionExplanation": "9 × 7 = 63.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 9,
    "b": 7
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2b

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-2].variants[welcomeSign-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2b -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-2",
  "variantId": "welcomeSign-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      8
    ],
    "description": "6 × 8 = 48",
    "values": {
      "a": 6,
      "b": 8,
      "answer": 48
    },
    "operation": "multiplication",
    "a": 6,
    "b": 8,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "6 × 8 = ?",
  "answerMode": "open",
  "canonicalAnswer": 48,
  "authoredChoices": null,
  "minnie": "Denk aan 6 groepjes van 8.",
  "moose": "Reken eerst 8 × 5 en tel er nog 8 bij.",
  "explanation": "6 × 8 = 48.",
  "assistedCompletionExplanation": "6 × 8 = 48.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 6,
    "b": 8
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-3/welcomeSign-3a

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-3].variants[welcomeSign-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-3/welcomeSign-3a -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-3",
  "variantId": "welcomeSign-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      5,
      "folders"
    ],
    "description": "4 × 5 = 20 folders",
    "values": {
      "a": 4,
      "b": 5,
      "unit": "folders",
      "answer": 20
    },
    "operation": "multiplication",
    "a": 4,
    "b": 5,
    "unit": "folders",
    "type": "arithmetic"
  },
  "question": "Bij het welkomstbord staan 4 houders met elk 5 folders. Hoeveel folders zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 20,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 4 groepjes van 5. Reken 4 × 5.",
  "explanation": "4 × 5 = 20. Het antwoord is 20 folders.",
  "assistedCompletionExplanation": "4 × 5 = 20. Het antwoord is 20 folders.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "folders",
  "hintParameters": {
    "a": 4,
    "b": 5,
    "unit": "folders"
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-3/welcomeSign-3b

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-3].variants[welcomeSign-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-3/welcomeSign-3b -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-3",
  "variantId": "welcomeSign-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      10,
      "dorpskaarten"
    ],
    "description": "3 × 10 = 30 dorpskaarten",
    "values": {
      "a": 3,
      "b": 10,
      "unit": "dorpskaarten",
      "answer": 30
    },
    "operation": "multiplication",
    "a": 3,
    "b": 10,
    "unit": "dorpskaarten",
    "type": "arithmetic"
  },
  "question": "De gids heeft 3 stapels met elk 10 dorpskaarten. Hoeveel dorpskaarten zijn dat samen?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 30,
  "authoredChoices": [
    13,
    20,
    30,
    40
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 3 groepjes van 10. Reken 3 × 10.",
  "explanation": "3 × 10 = 30. Het antwoord is 30 dorpskaarten.",
  "assistedCompletionExplanation": "3 × 10 = 30. Het antwoord is 30 dorpskaarten.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "dorpskaarten",
  "hintParameters": {
    "a": 3,
    "b": 10,
    "unit": "dorpskaarten"
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-4/welcomeSign-4a

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-4].variants[welcomeSign-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-4/welcomeSign-4a -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-4",
  "variantId": "welcomeSign-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      40,
      5
    ],
    "description": "40 ÷ 5 = 8",
    "values": {
      "a": 40,
      "b": 5,
      "answer": 8
    },
    "operation": "division",
    "a": 40,
    "b": 5,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "40 : 5 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 8,
  "authoredChoices": [
    5,
    6,
    8,
    10
  ],
  "minnie": "Welke keersom met 5 helpt je bij 40 : 5?",
  "moose": "Zoek in de tafel van 5 welk getal precies op 40 uitkomt.",
  "explanation": "40 : 5 = 8.",
  "assistedCompletionExplanation": "40 : 5 = 8.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 40,
    "b": 5
  }
}
```

### LVL-0038/welcomeSign/welcomeSign-slot-4/welcomeSign-4b

Source: `Levels/LVL-0038/level.js#learningChallenges[welcomeSign].questions[welcomeSign-slot-4].variants[welcomeSign-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/welcomeSign/welcomeSign-slot-4/welcomeSign-4b -->
```json
{
  "level": "LVL-0038",
  "challenge": "welcomeSign",
  "slot": "welcomeSign-slot-4",
  "variantId": "welcomeSign-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      20,
      4,
      "folders"
    ],
    "description": "20 ÷ 4 = 5 folders",
    "values": {
      "a": 20,
      "b": 4,
      "unit": "folders",
      "answer": 5
    },
    "operation": "division",
    "a": 20,
    "b": 4,
    "unit": "folders",
    "type": "arithmetic"
  },
  "question": "Een gids verdeelt 20 folders eerlijk over 4 gezinnen. Hoeveel folders krijgt elk gezin?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 5,
  "authoredChoices": [
    4,
    5,
    6,
    8
  ],
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 20 over 4 gelijke groepjes. Reken 20 : 4.",
  "explanation": "20 : 4 = 5. Het antwoord is 5 folders.",
  "assistedCompletionExplanation": "20 : 4 = 5. Het antwoord is 5 folders.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "folders",
  "hintParameters": {
    "a": 20,
    "b": 4,
    "unit": "folders"
  }
}
```

### LVL-0038/statue/statue-slot-1/statue-1a

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-1].variants[statue-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-1/statue-1a -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-1",
  "variantId": "statue-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      5
    ],
    "description": "4 × 5 = 20",
    "values": {
      "a": 4,
      "b": 5,
      "answer": 20
    },
    "operation": "multiplication",
    "a": 4,
    "b": 5,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "4 × 5 = ?",
  "answerMode": "open",
  "canonicalAnswer": 20,
  "authoredChoices": null,
  "minnie": "Denk aan 4 groepjes van 5.",
  "moose": "Verdubbel 5 en verdubbel de uitkomst nog een keer.",
  "explanation": "4 × 5 = 20.",
  "assistedCompletionExplanation": "4 × 5 = 20.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 4,
    "b": 5
  }
}
```

### LVL-0038/statue/statue-slot-1/statue-1b

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-1].variants[statue-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-1/statue-1b -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-1",
  "variantId": "statue-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      10
    ],
    "description": "3 × 10 = 30",
    "values": {
      "a": 3,
      "b": 10,
      "answer": 30
    },
    "operation": "multiplication",
    "a": 3,
    "b": 10,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "3 × 10 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 30,
  "authoredChoices": [
    13,
    20,
    30,
    40
  ],
  "minnie": "Denk aan 3 groepjes van 10.",
  "moose": "Bij × 10 komt er een nul achter 3.",
  "explanation": "3 × 10 = 30.",
  "assistedCompletionExplanation": "3 × 10 = 30.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 3,
    "b": 10
  }
}
```

### LVL-0038/statue/statue-slot-2/statue-2a

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-2].variants[statue-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-2/statue-2a -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-2",
  "variantId": "statue-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      2
    ],
    "description": "5 × 2 = 10",
    "values": {
      "a": 5,
      "b": 2,
      "answer": 10
    },
    "operation": "multiplication",
    "a": 5,
    "b": 2,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "5 × 2 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 10,
  "authoredChoices": [
    7,
    10,
    12,
    15
  ],
  "minnie": "Denk aan 5 groepjes van 2.",
  "moose": "Verdubbel 5.",
  "explanation": "5 × 2 = 10.",
  "assistedCompletionExplanation": "5 × 2 = 10.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 5,
    "b": 2
  }
}
```

### LVL-0038/statue/statue-slot-2/statue-2b

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-2].variants[statue-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-2/statue-2b -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-2",
  "variantId": "statue-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      4
    ],
    "description": "3 × 4 = 12",
    "values": {
      "a": 3,
      "b": 4,
      "answer": 12
    },
    "operation": "multiplication",
    "a": 3,
    "b": 4,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "3 × 4 = ?",
  "answerMode": "open",
  "canonicalAnswer": 12,
  "authoredChoices": null,
  "minnie": "Denk aan 3 groepjes van 4.",
  "moose": "Verdubbel 3 en verdubbel de uitkomst nog een keer.",
  "explanation": "3 × 4 = 12.",
  "assistedCompletionExplanation": "3 × 4 = 12.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 3,
    "b": 4
  }
}
```

### LVL-0038/statue/statue-slot-3/statue-3a

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-3].variants[statue-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-3/statue-3a -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-3",
  "variantId": "statue-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      4,
      "kaarsen"
    ],
    "description": "5 × 4 = 20 kaarsen",
    "values": {
      "a": 5,
      "b": 4,
      "unit": "kaarsen",
      "answer": 20
    },
    "operation": "multiplication",
    "a": 5,
    "b": 4,
    "unit": "kaarsen",
    "type": "arithmetic"
  },
  "question": "Bij het plein liggen 5 pakken met elk 4 kaarsen. Hoeveel kaarsen zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 20,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 5 groepjes van 4. Reken 5 × 4.",
  "explanation": "5 × 4 = 20. Het antwoord is 20 kaarsen.",
  "assistedCompletionExplanation": "5 × 4 = 20. Het antwoord is 20 kaarsen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "kaarsen",
  "hintParameters": {
    "a": 5,
    "b": 4,
    "unit": "kaarsen"
  }
}
```

### LVL-0038/statue/statue-slot-3/statue-3b

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-3].variants[statue-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-3/statue-3b -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-3",
  "variantId": "statue-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      5,
      "vlaggetjes"
    ],
    "description": "3 × 5 = 15 vlaggetjes",
    "values": {
      "a": 3,
      "b": 5,
      "unit": "vlaggetjes",
      "answer": 15
    },
    "operation": "multiplication",
    "a": 3,
    "b": 5,
    "unit": "vlaggetjes",
    "type": "arithmetic"
  },
  "question": "Voor het plein zijn 3 dozen met elk 5 vlaggetjes klaargezet. Hoeveel vlaggetjes zijn dat samen?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 15,
  "authoredChoices": [
    8,
    10,
    15,
    20
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 3 groepjes van 5. Reken 3 × 5.",
  "explanation": "3 × 5 = 15. Het antwoord is 15 vlaggetjes.",
  "assistedCompletionExplanation": "3 × 5 = 15. Het antwoord is 15 vlaggetjes.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "vlaggetjes",
  "hintParameters": {
    "a": 3,
    "b": 5,
    "unit": "vlaggetjes"
  }
}
```

### LVL-0038/statue/statue-slot-4/statue-4a

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-4].variants[statue-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-4/statue-4a -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-4",
  "variantId": "statue-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      30,
      3
    ],
    "description": "30 ÷ 3 = 10",
    "values": {
      "a": 30,
      "b": 3,
      "answer": 10
    },
    "operation": "division",
    "a": 30,
    "b": 3,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "30 : 3 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 10,
  "authoredChoices": [
    7,
    8,
    9,
    10
  ],
  "minnie": "Welke keersom met 3 helpt je bij 30 : 3?",
  "moose": "Zoek in de tafel van 3 welk getal precies op 30 uitkomt.",
  "explanation": "30 : 3 = 10.",
  "assistedCompletionExplanation": "30 : 3 = 10.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 30,
    "b": 3
  }
}
```

### LVL-0038/statue/statue-slot-4/statue-4b

Source: `Levels/LVL-0038/level.js#learningChallenges[statue].questions[statue-slot-4].variants[statue-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/statue/statue-slot-4/statue-4b -->
```json
{
  "level": "LVL-0038",
  "challenge": "statue",
  "slot": "statue-slot-4",
  "variantId": "statue-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      40,
      5,
      "bloemen"
    ],
    "description": "40 ÷ 5 = 8 bloemen",
    "values": {
      "a": 40,
      "b": 5,
      "unit": "bloemen",
      "answer": 8
    },
    "operation": "division",
    "a": 40,
    "b": 5,
    "unit": "bloemen",
    "type": "arithmetic"
  },
  "question": "Een verkoper verdeelt 40 bloemen eerlijk over 5 vazen. Hoeveel bloemen komen in elke vaas?",
  "answerMode": "open",
  "canonicalAnswer": 8,
  "authoredChoices": null,
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 40 over 5 gelijke groepjes. Reken 40 : 5.",
  "explanation": "40 : 5 = 8. Het antwoord is 8 bloemen.",
  "assistedCompletionExplanation": "40 : 5 = 8. Het antwoord is 8 bloemen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "bloemen",
  "hintParameters": {
    "a": 40,
    "b": 5,
    "unit": "bloemen"
  }
}
```

### LVL-0038/churchClock/churchClock-slot-1/churchClock-1a

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-1].variants[churchClock-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-1/churchClock-1a -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-1",
  "variantId": "churchClock-1a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      3,
      0,
      "drie uur"
    ],
    "description": "analogue 03:00 → Drie uur",
    "values": {
      "hour": 3,
      "minute": 0,
      "spokenAnswer": "Drie uur"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Drie uur",
  "authoredChoices": [
    "Twaalf uur",
    "Drie uur",
    "Half drie",
    "Kwart over drie"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 12: het is precies een heel uur. Kijk nu naar de kleine wijzer.",
  "explanation": "De grote wijzer staat op de 12 en de kleine wijzer op de 3. Het is drie uur.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 12 en de kleine wijzer op de 3. Het is drie uur.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 3,
      "minute": 0
    },
    "minnie": {
      "type": "clock",
      "hour": 3,
      "minute": 0
    },
    "moose": {
      "type": "clock",
      "hour": 3,
      "minute": 0
    },
    "explanation": {
      "type": "clock",
      "hour": 3,
      "minute": 0
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0038/churchClock/churchClock-slot-1/churchClock-1b

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-1].variants[churchClock-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-1/churchClock-1b -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-1",
  "variantId": "churchClock-1b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      4,
      15,
      "kwart over vier"
    ],
    "description": "digital 04:15 → Kwart over vier",
    "values": {
      "hour": 4,
      "minute": 15,
      "spokenAnswer": "Kwart over vier"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Kwart over vier",
  "authoredChoices": [
    "Kwart voor vier",
    "Kwart over vijf",
    "Kwart over vier",
    "Half vijf"
  ],
  "minnie": "15 minuten is een kwartier.",
  "moose": "Het is 15 minuten na vier. Dat noemen we een kwartier over het uur.",
  "explanation": "De digitale klok geeft 04:15 aan. 15 minuten is een kwartier. Het is een kwartier na vier. Daarom is 04:15 kwart over vier.",
  "assistedCompletionExplanation": "De digitale klok geeft 04:15 aan. 15 minuten is een kwartier. Het is een kwartier na vier. Daarom is 04:15 kwart over vier.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 4,
      "minute": 15,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 4,
      "minute": 15,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 4,
      "minute": 15,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 4,
      "minute": 15,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0038/churchClock/churchClock-slot-2/churchClock-2a

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-2].variants[churchClock-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-2/churchClock-2a -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-2",
  "variantId": "churchClock-2a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      5,
      30,
      "half zes"
    ],
    "description": "analogue 05:30 → Half zes",
    "values": {
      "hour": 5,
      "minute": 30,
      "spokenAnswer": "Half zes"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Half zes",
  "authoredChoices": [
    "Half vijf",
    "Vijf uur",
    "Half zes",
    "Zes uur"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 6: dat is half. Kijk naar welk uur de kleine wijzer onderweg is.",
  "explanation": "De grote wijzer staat op de 6. De kleine wijzer staat tussen de 5 en de 6. Het is half zes.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 6. De kleine wijzer staat tussen de 5 en de 6. Het is half zes.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 5,
      "minute": 30
    },
    "minnie": {
      "type": "clock",
      "hour": 5,
      "minute": 30
    },
    "moose": {
      "type": "clock",
      "hour": 5,
      "minute": 30
    },
    "explanation": {
      "type": "clock",
      "hour": 5,
      "minute": 30
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0038/churchClock/churchClock-slot-2/churchClock-2b

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-2].variants[churchClock-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-2/churchClock-2b -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-2",
  "variantId": "churchClock-2b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      7,
      45,
      "kwart voor acht"
    ],
    "description": "digital 07:45 → Kwart voor acht",
    "values": {
      "hour": 7,
      "minute": 45,
      "spokenAnswer": "Kwart voor acht"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Kwart voor acht",
  "authoredChoices": [
    "Kwart voor zeven",
    "Kwart over zeven",
    "Kwart voor acht",
    "Half acht"
  ],
  "minnie": "45 minuten betekent dat er nog 15 minuten tot het volgende hele uur zijn.",
  "moose": "15 minuten is een kwartier. Het volgende hele uur is acht.",
  "explanation": "De digitale klok geeft 07:45 aan. Er zijn nog 15 minuten tot acht uur. 15 minuten is een kwartier. Daarom is 07:45 kwart voor acht.",
  "assistedCompletionExplanation": "De digitale klok geeft 07:45 aan. Er zijn nog 15 minuten tot acht uur. 15 minuten is een kwartier. Daarom is 07:45 kwart voor acht.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 7,
      "minute": 45,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 7,
      "minute": 45,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 7,
      "minute": 45,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 7,
      "minute": 45,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0038/churchClock/churchClock-slot-3/churchClock-3a

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-3].variants[churchClock-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-3/churchClock-3a -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-3",
  "variantId": "churchClock-3a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      8,
      25,
      "vijf voor half negen"
    ],
    "description": "analogue 08:25 → Vijf voor half negen",
    "values": {
      "hour": 8,
      "minute": 25,
      "spokenAnswer": "Vijf voor half negen"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Vijf voor half negen",
  "authoredChoices": [
    "Vijf over half negen",
    "Vijf voor half acht",
    "Vijf over acht",
    "Vijf voor half negen"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 5: dat is vijf voor half. Kijk naar welk uur de kleine wijzer onderweg is.",
  "explanation": "De grote wijzer staat op de 5: vijfentwintig minuten over acht. Dat is vijf voor half negen.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 5: vijfentwintig minuten over acht. Dat is vijf voor half negen.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 8,
      "minute": 25
    },
    "minnie": {
      "type": "clock",
      "hour": 8,
      "minute": 25
    },
    "moose": {
      "type": "clock",
      "hour": 8,
      "minute": 25
    },
    "explanation": {
      "type": "clock",
      "hour": 8,
      "minute": 25
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0038/churchClock/churchClock-slot-3/churchClock-3b

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-3].variants[churchClock-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-3/churchClock-3b -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-3",
  "variantId": "churchClock-3b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      9,
      50,
      "tien voor tien"
    ],
    "description": "digital 09:50 → Tien voor tien",
    "values": {
      "hour": 9,
      "minute": 50,
      "spokenAnswer": "Tien voor tien"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Tien voor tien",
  "authoredChoices": [
    "Tien voor negen",
    "Tien over negen",
    "Tien voor tien",
    "Tien over half tien"
  ],
  "minnie": "Bij 50 minuten zijn er nog 10 minuten tot het volgende hele uur.",
  "moose": "Het volgende hele uur is tien. Hoe zeg je 10 minuten vóór dat uur?",
  "explanation": "De digitale klok geeft 09:50 aan. Er zijn nog 10 minuten tot tien uur. Daarom is 09:50 tien voor tien.",
  "assistedCompletionExplanation": "De digitale klok geeft 09:50 aan. Er zijn nog 10 minuten tot tien uur. Daarom is 09:50 tien voor tien.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 9,
      "minute": 50,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 9,
      "minute": 50,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 9,
      "minute": 50,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 9,
      "minute": 50,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0038/churchClock/churchClock-slot-4/churchClock-4a

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-4].variants[churchClock-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-4/churchClock-4a -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-4",
  "variantId": "churchClock-4a",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      11,
      40,
      "tien over half twaalf"
    ],
    "description": "analogue 11:40 → Tien over half twaalf",
    "values": {
      "hour": 11,
      "minute": 40,
      "spokenAnswer": "Tien over half twaalf"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Tien over half twaalf",
  "authoredChoices": [
    "Tien voor half twaalf",
    "Tien over half elf",
    "Tien over twaalf",
    "Tien over half twaalf"
  ],
  "minnie": "Kijk eerst naar de grote wijzer.",
  "moose": "De grote wijzer staat op de 8: dat is tien over half. Kijk naar welk uur de kleine wijzer onderweg is.",
  "explanation": "De grote wijzer staat op de 8: veertig minuten over elf. Dat is tien over half twaalf.",
  "assistedCompletionExplanation": "De grote wijzer staat op de 8: veertig minuten over elf. Dat is tien over half twaalf.",
  "visuals": {
    "question": {
      "type": "clock",
      "hour": 11,
      "minute": 40
    },
    "minnie": {
      "type": "clock",
      "hour": 11,
      "minute": 40
    },
    "moose": {
      "type": "clock",
      "hour": 11,
      "minute": 40
    },
    "explanation": {
      "type": "clock",
      "hour": 11,
      "minute": 40
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0038/churchClock/churchClock-slot-4/churchClock-4b

Source: `Levels/LVL-0038/level.js#learningChallenges[churchClock].questions[churchClock-slot-4].variants[churchClock-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0038/churchClock/churchClock-slot-4/churchClock-4b -->
```json
{
  "level": "LVL-0038",
  "challenge": "churchClock",
  "slot": "churchClock-slot-4",
  "variantId": "churchClock-4b",
  "learningLevel": "E5",
  "family": "clock_reading_five_minutes",
  "strategy": "clock_reading_five_minutes",
  "educationalCore": {
    "signature": [
      "clock-reading",
      0,
      0,
      "twaalf uur"
    ],
    "description": "digital 12:00 → Twaalf uur",
    "values": {
      "hour": 12,
      "minute": 0,
      "spokenAnswer": "Twaalf uur"
    },
    "operation": "clock-reading"
  },
  "question": "Hoe laat is het op deze digitale klok?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": "Twaalf uur",
  "authoredChoices": [
    "Elf uur",
    "Twaalf uur",
    "Eén uur",
    "Half één"
  ],
  "minnie": "00 minuten betekent dat het precies een heel uur is.",
  "moose": "Kijk naar het getal links van de dubbele punt. Welk heel uur staat daar?",
  "explanation": "De digitale klok geeft 12:00 aan. De 00 betekent dat er nog geen minuten na het hele uur voorbij zijn. Daarom is 12:00 twaalf uur.",
  "assistedCompletionExplanation": "De digitale klok geeft 12:00 aan. De 00 betekent dat er nog geen minuten na het hele uur voorbij zijn. Daarom is 12:00 twaalf uur.",
  "visuals": {
    "question": {
      "type": "digitalClock",
      "hour": 12,
      "minute": 0,
      "highlightMinutes": false,
      "highlightHours": false
    },
    "minnie": {
      "type": "digitalClock",
      "hour": 12,
      "minute": 0,
      "highlightMinutes": true,
      "highlightHours": false
    },
    "moose": {
      "type": "digitalClock",
      "hour": 12,
      "minute": 0,
      "highlightMinutes": false,
      "highlightHours": true
    },
    "explanation": {
      "type": "digitalClock",
      "hour": 12,
      "minute": 0,
      "highlightMinutes": false,
      "highlightHours": false
    }
  },
  "answerContract": {
    "type": "legacyString",
    "input": "canonical clicked choice",
    "grading": "Dutch localeCompare sensitivity=base"
  },
  "unit": null,
  "hintParameters": null
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1a

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-1].variants[machineryFragment-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1a -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-1",
  "variantId": "machineryFragment-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      2,
      5
    ],
    "description": "2 × 5 = 10",
    "values": {
      "a": 2,
      "b": 5,
      "answer": 10
    },
    "operation": "multiplication",
    "a": 2,
    "b": 5,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "2 × 5 = ?",
  "answerMode": "open",
  "canonicalAnswer": 10,
  "authoredChoices": null,
  "minnie": "Denk aan 2 groepjes van 5.",
  "moose": "Verdubbel 5.",
  "explanation": "2 × 5 = 10.",
  "assistedCompletionExplanation": "2 × 5 = 10.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 2,
    "b": 5
  }
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1b

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-1].variants[machineryFragment-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1b -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-1",
  "variantId": "machineryFragment-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      4
    ],
    "description": "4 × 4 = 16",
    "values": {
      "a": 4,
      "b": 4,
      "answer": 16
    },
    "operation": "multiplication",
    "a": 4,
    "b": 4,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "4 × 4 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 16,
  "authoredChoices": [
    8,
    12,
    16,
    20
  ],
  "minnie": "Denk aan 4 groepjes van 4.",
  "moose": "Verdubbel 4 en verdubbel de uitkomst nog een keer.",
  "explanation": "4 × 4 = 16.",
  "assistedCompletionExplanation": "4 × 4 = 16.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 4,
    "b": 4
  }
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2a

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-2].variants[machineryFragment-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2a -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-2",
  "variantId": "machineryFragment-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      5
    ],
    "description": "3 × 5 = 15",
    "values": {
      "a": 3,
      "b": 5,
      "answer": 15
    },
    "operation": "multiplication",
    "a": 3,
    "b": 5,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "3 × 5 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 15,
  "authoredChoices": [
    8,
    12,
    15,
    18
  ],
  "minnie": "Denk aan 3 groepjes van 5.",
  "moose": "Reken 3 × 10 en neem daar de helft van.",
  "explanation": "3 × 5 = 15.",
  "assistedCompletionExplanation": "3 × 5 = 15.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 3,
    "b": 5
  }
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2b

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-2].variants[machineryFragment-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2b -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-2",
  "variantId": "machineryFragment-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      10
    ],
    "description": "5 × 10 = 50",
    "values": {
      "a": 5,
      "b": 10,
      "answer": 50
    },
    "operation": "multiplication",
    "a": 5,
    "b": 10,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "5 × 10 = ?",
  "answerMode": "open",
  "canonicalAnswer": 50,
  "authoredChoices": null,
  "minnie": "Denk aan 5 groepjes van 10.",
  "moose": "Bij × 10 komt er een nul achter 5.",
  "explanation": "5 × 10 = 50.",
  "assistedCompletionExplanation": "5 × 10 = 50.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 5,
    "b": 10
  }
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-3/machineryFragment-3a

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-3].variants[machineryFragment-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-3/machineryFragment-3a -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-3",
  "variantId": "machineryFragment-3a",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      3,
      "platen"
    ],
    "description": "4 × 3 = 12 platen",
    "values": {
      "a": 4,
      "b": 3,
      "unit": "platen",
      "answer": 12
    },
    "operation": "multiplication",
    "a": 4,
    "b": 3,
    "unit": "platen",
    "type": "arithmetic"
  },
  "question": "Bij het wrak liggen 4 bakken met elk 3 metalen platen. Hoeveel platen zijn dat samen?",
  "answerMode": "open",
  "canonicalAnswer": 12,
  "authoredChoices": null,
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 4 groepjes van 3. Reken 4 × 3.",
  "explanation": "4 × 3 = 12. Het antwoord is 12 platen.",
  "assistedCompletionExplanation": "4 × 3 = 12. Het antwoord is 12 platen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "platen",
  "hintParameters": {
    "a": 4,
    "b": 3,
    "unit": "platen"
  }
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-3/machineryFragment-3b

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-3].variants[machineryFragment-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-3/machineryFragment-3b -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-3",
  "variantId": "machineryFragment-3b",
  "learningLevel": "E5",
  "family": "story_multiplication",
  "strategy": "story_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      5,
      "onderdelen"
    ],
    "description": "5 × 5 = 25 onderdelen",
    "values": {
      "a": 5,
      "b": 5,
      "unit": "onderdelen",
      "answer": 25
    },
    "operation": "multiplication",
    "a": 5,
    "b": 5,
    "unit": "onderdelen",
    "type": "arithmetic"
  },
  "question": "Er zijn 5 zakken met elk 5 losse onderdelen. Hoeveel onderdelen zijn dat samen?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 25,
  "authoredChoices": [
    10,
    20,
    25,
    30
  ],
  "minnie": "Hoeveel groepjes zijn er? En hoeveel zitten er in elk groepje?",
  "moose": "Je hebt 5 groepjes van 5. Reken 5 × 5.",
  "explanation": "5 × 5 = 25. Het antwoord is 25 onderdelen.",
  "assistedCompletionExplanation": "5 × 5 = 25. Het antwoord is 25 onderdelen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "onderdelen",
  "hintParameters": {
    "a": 5,
    "b": 5,
    "unit": "onderdelen"
  }
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-4/machineryFragment-4a

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-4].variants[machineryFragment-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-4/machineryFragment-4a -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-4",
  "variantId": "machineryFragment-4a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      20,
      2
    ],
    "description": "20 ÷ 2 = 10",
    "values": {
      "a": 20,
      "b": 2,
      "answer": 10
    },
    "operation": "division",
    "a": 20,
    "b": 2,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "20 : 2 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 10,
  "authoredChoices": [
    4,
    5,
    8,
    10
  ],
  "minnie": "Welke keersom met 2 helpt je bij 20 : 2?",
  "moose": "Zoek in de tafel van 2 welk getal precies op 20 uitkomt.",
  "explanation": "20 : 2 = 10.",
  "assistedCompletionExplanation": "20 : 2 = 10.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 20,
    "b": 2
  }
}
```

### LVL-0039/machineryFragment/machineryFragment-slot-4/machineryFragment-4b

Source: `Levels/LVL-0039/level.js#learningChallenges[machineryFragment].questions[machineryFragment-slot-4].variants[machineryFragment-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/machineryFragment/machineryFragment-slot-4/machineryFragment-4b -->
```json
{
  "level": "LVL-0039",
  "challenge": "machineryFragment",
  "slot": "machineryFragment-slot-4",
  "variantId": "machineryFragment-4b",
  "learningLevel": "E5",
  "family": "story_division",
  "strategy": "story_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      30,
      3,
      "ringen"
    ],
    "description": "30 ÷ 3 = 10 ringen",
    "values": {
      "a": 30,
      "b": 3,
      "unit": "ringen",
      "answer": 10
    },
    "operation": "division",
    "a": 30,
    "b": 3,
    "unit": "ringen",
    "type": "arithmetic"
  },
  "question": "Een monteur verdeelt 30 ringen eerlijk over 3 bakjes. Hoeveel ringen komen in elk bakje?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 10,
  "authoredChoices": [
    7,
    8,
    9,
    10
  ],
  "minnie": "Wat wordt verdeeld? En over hoeveel gelijke groepjes?",
  "moose": "Je verdeelt 30 over 3 gelijke groepjes. Reken 30 : 3.",
  "explanation": "30 : 3 = 10. Het antwoord is 10 ringen.",
  "assistedCompletionExplanation": "30 : 3 = 10. Het antwoord is 10 ringen.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "ringen",
  "hintParameters": {
    "a": 30,
    "b": 3,
    "unit": "ringen"
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1a

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-1].variants[controlCabinets-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1a -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-1",
  "variantId": "controlCabinets-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      3
    ],
    "description": "3 × 3 = 9",
    "values": {
      "a": 3,
      "b": 3,
      "answer": 9
    },
    "operation": "multiplication",
    "a": 3,
    "b": 3,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "3 × 3 = ?",
  "answerMode": "open",
  "canonicalAnswer": 9,
  "authoredChoices": null,
  "minnie": "Denk aan 3 groepjes van 3.",
  "moose": "Neem drie groepjes van 3: 3 + 3 + 3.",
  "explanation": "3 × 3 = 9.",
  "assistedCompletionExplanation": "3 × 3 = 9.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 3,
    "b": 3
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1b

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-1].variants[controlCabinets-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1b -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-1",
  "variantId": "controlCabinets-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      4
    ],
    "description": "5 × 4 = 20",
    "values": {
      "a": 5,
      "b": 4,
      "answer": 20
    },
    "operation": "multiplication",
    "a": 5,
    "b": 4,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "5 × 4 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 20,
  "authoredChoices": [
    9,
    15,
    20,
    25
  ],
  "minnie": "Denk aan 5 groepjes van 4.",
  "moose": "Verdubbel 5 en verdubbel de uitkomst nog een keer.",
  "explanation": "5 × 4 = 20.",
  "assistedCompletionExplanation": "5 × 4 = 20.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 5,
    "b": 4
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2a

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-2].variants[controlCabinets-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2a -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-2",
  "variantId": "controlCabinets-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      2,
      10
    ],
    "description": "2 × 10 = 20",
    "values": {
      "a": 2,
      "b": 10,
      "answer": 20
    },
    "operation": "multiplication",
    "a": 2,
    "b": 10,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "2 × 10 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 20,
  "authoredChoices": [
    12,
    18,
    20,
    22
  ],
  "minnie": "Denk aan 2 groepjes van 10.",
  "moose": "Bij × 10 komt er een nul achter 2.",
  "explanation": "2 × 10 = 20.",
  "assistedCompletionExplanation": "2 × 10 = 20.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 2,
    "b": 10
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2b

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-2].variants[controlCabinets-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2b -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-2",
  "variantId": "controlCabinets-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      2
    ],
    "description": "4 × 2 = 8",
    "values": {
      "a": 4,
      "b": 2,
      "answer": 8
    },
    "operation": "multiplication",
    "a": 4,
    "b": 2,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "4 × 2 = ?",
  "answerMode": "open",
  "canonicalAnswer": 8,
  "authoredChoices": null,
  "minnie": "Denk aan 4 groepjes van 2.",
  "moose": "Verdubbel 4.",
  "explanation": "4 × 2 = 8.",
  "assistedCompletionExplanation": "4 × 2 = 8.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 4,
    "b": 2
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3a

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-3].variants[controlCabinets-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3a -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-3",
  "variantId": "controlCabinets-3a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      42,
      6
    ],
    "description": "42 ÷ 6 = 7",
    "values": {
      "a": 42,
      "b": 6,
      "answer": 7
    },
    "operation": "division",
    "a": 42,
    "b": 6,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "42 : 6 = ?",
  "answerMode": "open",
  "canonicalAnswer": 7,
  "authoredChoices": null,
  "minnie": "Welke keersom met 6 helpt je bij 42 : 6?",
  "moose": "Zoek in de tafel van 6 welk getal precies op 42 uitkomt.",
  "explanation": "42 : 6 = 7.",
  "assistedCompletionExplanation": "42 : 6 = 7.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 42,
    "b": 6
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3b

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-3].variants[controlCabinets-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3b -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-3",
  "variantId": "controlCabinets-3b",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      45,
      9
    ],
    "description": "45 ÷ 9 = 5",
    "values": {
      "a": 45,
      "b": 9,
      "answer": 5
    },
    "operation": "division",
    "a": 45,
    "b": 9,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "45 : 9 = ?",
  "answerMode": "open",
  "canonicalAnswer": 5,
  "authoredChoices": null,
  "minnie": "Welke keersom met 9 helpt je bij 45 : 9?",
  "moose": "Zoek in de tafel van 9 welk getal precies op 45 uitkomt.",
  "explanation": "45 : 9 = 5.",
  "assistedCompletionExplanation": "45 : 9 = 5.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 45,
    "b": 9
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-4/controlCabinets-4a

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-4].variants[controlCabinets-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-4/controlCabinets-4a -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-4",
  "variantId": "controlCabinets-4a",
  "learningLevel": "E5",
  "family": "money",
  "strategy": "money",
  "educationalCore": {
    "signature": [
      "money-multiply",
      "multiplication",
      6,
      7,
      "euro"
    ],
    "description": "6 × 7 = 42 euro",
    "values": {
      "a": 6,
      "b": 7,
      "currency": "euro",
      "unit": "euro",
      "answer": 42
    },
    "operation": "multiplication",
    "a": 6,
    "b": 7,
    "unit": "euro",
    "type": "money-multiply"
  },
  "question": "Een monteur koopt 6 schakelaars van 7 euro per stuk. Hoeveel euro betaalt hij?",
  "answerMode": "open",
  "canonicalAnswer": 42,
  "authoredChoices": null,
  "minnie": "Hoeveel keer betaal je hetzelfde bedrag?",
  "moose": "Je betaalt 6 keer 7 euro. Reken 6 × 7.",
  "explanation": "6 × 7 = 42. Het antwoord is 42 euro.",
  "assistedCompletionExplanation": "6 × 7 = 42. Het antwoord is 42 euro.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "euro",
  "hintParameters": {
    "a": 6,
    "b": 7,
    "currency": "euro",
    "unit": "euro"
  }
}
```

### LVL-0039/controlCabinets/controlCabinets-slot-4/controlCabinets-4b

Source: `Levels/LVL-0039/level.js#learningChallenges[controlCabinets].questions[controlCabinets-slot-4].variants[controlCabinets-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/controlCabinets/controlCabinets-slot-4/controlCabinets-4b -->
```json
{
  "level": "LVL-0039",
  "challenge": "controlCabinets",
  "slot": "controlCabinets-slot-4",
  "variantId": "controlCabinets-4b",
  "learningLevel": "E5",
  "family": "route",
  "strategy": "route",
  "educationalCore": {
    "signature": [
      "length-share",
      "division",
      56,
      8,
      "meter"
    ],
    "description": "56 ÷ 8 = 7 meter",
    "values": {
      "a": 56,
      "b": 8,
      "unit": "meter",
      "answer": 7
    },
    "operation": "division",
    "a": 56,
    "b": 8,
    "unit": "meter",
    "type": "length-share"
  },
  "question": "Een kabel van 56 meter wordt in 8 even lange stukken verdeeld. Hoe lang is elk stuk in meter?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 7,
  "authoredChoices": [
    6,
    7,
    8,
    9
  ],
  "minnie": "In hoeveel gelijke stukken wordt de totale lengte verdeeld?",
  "moose": "Verdeel 56 door 8. Reken 56 : 8.",
  "explanation": "56 : 8 = 7. Het antwoord is 7 meter.",
  "assistedCompletionExplanation": "56 : 8 = 7. Het antwoord is 7 meter.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "meter",
  "hintParameters": {
    "a": 56,
    "b": 8,
    "unit": "meter"
  }
}
```

### LVL-0039/signalMast/signalMast-slot-1/signalMast-1a

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-1].variants[signalMast-1a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-1/signalMast-1a -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-1",
  "variantId": "signalMast-1a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      3
    ],
    "description": "5 × 3 = 15",
    "values": {
      "a": 5,
      "b": 3,
      "answer": 15
    },
    "operation": "multiplication",
    "a": 5,
    "b": 3,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "5 × 3 = ?",
  "answerMode": "open",
  "canonicalAnswer": 15,
  "authoredChoices": null,
  "minnie": "Denk aan 5 groepjes van 3.",
  "moose": "Reken 3 × 10 en neem daar de helft van.",
  "explanation": "5 × 3 = 15.",
  "assistedCompletionExplanation": "5 × 3 = 15.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 5,
    "b": 3
  }
}
```

### LVL-0039/signalMast/signalMast-slot-1/signalMast-1b

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-1].variants[signalMast-1b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-1/signalMast-1b -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-1",
  "variantId": "signalMast-1b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      10
    ],
    "description": "4 × 10 = 40",
    "values": {
      "a": 4,
      "b": 10,
      "answer": 40
    },
    "operation": "multiplication",
    "a": 4,
    "b": 10,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "4 × 10 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 40,
  "authoredChoices": [
    14,
    30,
    40,
    50
  ],
  "minnie": "Denk aan 4 groepjes van 10.",
  "moose": "Bij × 10 komt er een nul achter 4.",
  "explanation": "4 × 10 = 40.",
  "assistedCompletionExplanation": "4 × 10 = 40.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 4,
    "b": 10
  }
}
```

### LVL-0039/signalMast/signalMast-slot-2/signalMast-2a

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-2].variants[signalMast-2a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-2/signalMast-2a -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-2",
  "variantId": "signalMast-2a",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      2,
      4
    ],
    "description": "2 × 4 = 8",
    "values": {
      "a": 2,
      "b": 4,
      "answer": 8
    },
    "operation": "multiplication",
    "a": 2,
    "b": 4,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "2 × 4 = ?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 8,
  "authoredChoices": [
    6,
    8,
    10,
    12
  ],
  "minnie": "Denk aan 2 groepjes van 4.",
  "moose": "Verdubbel 4.",
  "explanation": "2 × 4 = 8.",
  "assistedCompletionExplanation": "2 × 4 = 8.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 2,
    "b": 4
  }
}
```

### LVL-0039/signalMast/signalMast-slot-2/signalMast-2b

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-2].variants[signalMast-2b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-2/signalMast-2b -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-2",
  "variantId": "signalMast-2b",
  "learningLevel": "E5",
  "family": "bare_multiplication",
  "strategy": "bare_multiplication",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "multiplication",
      10,
      5
    ],
    "description": "10 × 5 = 50",
    "values": {
      "a": 10,
      "b": 5,
      "answer": 50
    },
    "operation": "multiplication",
    "a": 10,
    "b": 5,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "10 × 5 = ?",
  "answerMode": "open",
  "canonicalAnswer": 50,
  "authoredChoices": null,
  "minnie": "Denk aan 10 groepjes van 5.",
  "moose": "Bij × 10 komt er een nul achter 5.",
  "explanation": "10 × 5 = 50.",
  "assistedCompletionExplanation": "10 × 5 = 50.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 10,
    "b": 5
  }
}
```

### LVL-0039/signalMast/signalMast-slot-3/signalMast-3a

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-3].variants[signalMast-3a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-3/signalMast-3a -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-3",
  "variantId": "signalMast-3a",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      20,
      5
    ],
    "description": "20 ÷ 5 = 4",
    "values": {
      "a": 20,
      "b": 5,
      "answer": 4
    },
    "operation": "division",
    "a": 20,
    "b": 5,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "20 : 5 = ?",
  "answerMode": "open",
  "canonicalAnswer": 4,
  "authoredChoices": null,
  "minnie": "Welke keersom met 5 helpt je bij 20 : 5?",
  "moose": "Zoek in de tafel van 5 welk getal precies op 20 uitkomt.",
  "explanation": "20 : 5 = 4.",
  "assistedCompletionExplanation": "20 : 5 = 4.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 20,
    "b": 5
  }
}
```

### LVL-0039/signalMast/signalMast-slot-3/signalMast-3b

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-3].variants[signalMast-3b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-3/signalMast-3b -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-3",
  "variantId": "signalMast-3b",
  "learningLevel": "E5",
  "family": "bare_division",
  "strategy": "bare_division",
  "educationalCore": {
    "signature": [
      "arithmetic",
      "division",
      12,
      3
    ],
    "description": "12 ÷ 3 = 4",
    "values": {
      "a": 12,
      "b": 3,
      "answer": 4
    },
    "operation": "division",
    "a": 12,
    "b": 3,
    "unit": null,
    "type": "arithmetic"
  },
  "question": "12 : 3 = ?",
  "answerMode": "open",
  "canonicalAnswer": 4,
  "authoredChoices": null,
  "minnie": "Welke keersom met 3 helpt je bij 12 : 3?",
  "moose": "Zoek in de tafel van 3 welk getal precies op 12 uitkomt.",
  "explanation": "12 : 3 = 4.",
  "assistedCompletionExplanation": "12 : 3 = 4.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": null,
  "hintParameters": {
    "a": 12,
    "b": 3
  }
}
```

### LVL-0039/signalMast/signalMast-slot-4/signalMast-4a

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-4].variants[signalMast-4a]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-4/signalMast-4a -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-4",
  "variantId": "signalMast-4a",
  "learningLevel": "E5",
  "family": "money",
  "strategy": "money",
  "educationalCore": {
    "signature": [
      "money-multiply",
      "multiplication",
      4,
      5,
      "euro"
    ],
    "description": "4 × 5 = 20 euro",
    "values": {
      "a": 4,
      "b": 5,
      "currency": "euro",
      "unit": "euro",
      "answer": 20
    },
    "operation": "multiplication",
    "a": 4,
    "b": 5,
    "unit": "euro",
    "type": "money-multiply"
  },
  "question": "Voor de signaalmast zijn 4 lampen nodig. Elke lamp kost 5 euro. Hoeveel euro kosten de lampen samen?",
  "answerMode": "multipleChoice",
  "canonicalAnswer": 20,
  "authoredChoices": [
    9,
    15,
    20,
    25
  ],
  "minnie": "Hoeveel keer betaal je hetzelfde bedrag?",
  "moose": "Je betaalt 4 keer 5 euro. Reken 4 × 5.",
  "explanation": "4 × 5 = 20. Het antwoord is 20 euro.",
  "assistedCompletionExplanation": "4 × 5 = 20. Het antwoord is 20 euro.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "canonical clicked choice",
    "grading": "strict numeric equality"
  },
  "unit": "euro",
  "hintParameters": {
    "a": 4,
    "b": 5,
    "currency": "euro",
    "unit": "euro"
  }
}
```

### LVL-0039/signalMast/signalMast-slot-4/signalMast-4b

Source: `Levels/LVL-0039/level.js#learningChallenges[signalMast].questions[signalMast-slot-4].variants[signalMast-4b]`; support: `src/challenge-hints.js`.

<!-- frozen-e5:LVL-0039/signalMast/signalMast-slot-4/signalMast-4b -->
```json
{
  "level": "LVL-0039",
  "challenge": "signalMast",
  "slot": "signalMast-slot-4",
  "variantId": "signalMast-4b",
  "learningLevel": "E5",
  "family": "route",
  "strategy": "route",
  "educationalCore": {
    "signature": [
      "length-share",
      "division",
      30,
      5,
      "meter"
    ],
    "description": "30 ÷ 5 = 6 meter",
    "values": {
      "a": 30,
      "b": 5,
      "unit": "meter",
      "answer": 6
    },
    "operation": "division",
    "a": 30,
    "b": 5,
    "unit": "meter",
    "type": "length-share"
  },
  "question": "Een touw van 30 meter wordt in 5 even lange stukken verdeeld. Hoe lang is elk stuk in meter?",
  "answerMode": "open",
  "canonicalAnswer": 6,
  "authoredChoices": null,
  "minnie": "In hoeveel gelijke stukken wordt de totale lengte verdeeld?",
  "moose": "Verdeel 30 door 5. Reken 30 : 5.",
  "explanation": "30 : 5 = 6. Het antwoord is 6 meter.",
  "assistedCompletionExplanation": "30 : 5 = 6. Het antwoord is 6 meter.",
  "visuals": {
    "question": null,
    "minnie": null,
    "moose": null,
    "explanation": null
  },
  "answerContract": {
    "type": "legacyNumeric",
    "input": "trim; empty/non-finite invalid; Number(raw) for numeric answers",
    "grading": "strict numeric equality"
  },
  "unit": "meter",
  "hintParameters": {
    "a": 30,
    "b": 5,
    "unit": "meter"
  }
}
```

### Exact educational-core duplicates

Existing full-learning-audit `eCore` semantics: same operation and ordered operands; money/length/measurement and units distinguished; clock uses hour modulo 12, minute and normalized spoken answer, irrespective of analogue/digital representation. Surface story, answer mode and narrative nouns do not distinguish the core. Commuted operands are NOT merged. Repeated cores are observations, not proof of defective content.

Inside Frozen Atlas (8 groups):

```json
[
  {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      9
    ],
    "variants": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1b",
      "LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      8
    ],
    "variants": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2a",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      6
    ],
    "variants": [
      "LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1a",
      "LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      9
    ],
    "variants": [
      "LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2a",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      7
    ],
    "variants": [
      "LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2b",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      7
    ],
    "variants": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1a",
      "LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      8
    ],
    "variants": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1b",
      "LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      6
    ],
    "variants": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2b",
      "LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1b"
    ]
  }
]
```

Against other currently enabled, non-developer production E5 (49 matching Frozen core groups):

```json
[
  {
    "signature": [
      "clock-reading",
      8,
      30,
      "half negen"
    ],
    "frozen": [
      "LVL-0036/stationClock/stationClock-slot-1/stationClock-1b"
    ],
    "existing": [
      "LVL-0014/clockTower/clock-tower-slot-2/uk-clock-2b",
      "LVL-0026/centralCodex/central-codex-slot-2/central-codex-2a"
    ]
  },
  {
    "signature": [
      "clock-reading",
      9,
      45,
      "kwart voor tien"
    ],
    "frozen": [
      "LVL-0036/stationClock/stationClock-slot-2/stationClock-2a"
    ],
    "existing": [
      "LVL-0013/canalClock/canal-clock-slot-2/nl-clock-2a",
      "LVL-0024/flightControls/flight-controls-slot-4/flight-controls-4b"
    ]
  },
  {
    "signature": [
      "clock-reading",
      6,
      5,
      "vijf over zes"
    ],
    "frozen": [
      "LVL-0036/stationClock/stationClock-slot-2/stationClock-2b"
    ],
    "existing": [
      "LVL-0019/harborClock/harbor-clock-slot-4/se-clock-4a"
    ]
  },
  {
    "signature": [
      "clock-reading",
      5,
      40,
      "tien over half zes"
    ],
    "frozen": [
      "LVL-0036/stationClock/stationClock-slot-4/stationClock-4b"
    ],
    "existing": [
      "LVL-0017/clockHouse/clock-house-slot-3/at-clock-3b",
      "LVL-0026/centralCodex/central-codex-slot-4/central-codex-4a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      7
    ],
    "frozen": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1a"
    ],
    "existing": [
      "LVL-0006/controlPanel/controlPanel-slot-1/controlPanel-1b",
      "LVL-0007/islandWheel/islandWheel-slot-1/islandWheel-1b",
      "LVL-0032/car/car-slot-3/car-3a",
      "LVL-0033/arcProbe/arcProbe-slot-3/arcProbe-3a",
      "LVL-0034/raiderCache/raiderCache-slot-1/raiderCache-1a",
      "LVL-0035/terminal/terminal-slot-3/terminal-3a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      9
    ],
    "frozen": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1b",
      "LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1a"
    ],
    "existing": [
      "LVL-0001/zon/zon-slot-3/zon-3a",
      "LVL-0021/mechanicalModel/mechanical-model-slot-1/mechanical-model-1b",
      "LVL-0030/templePanel/temple-panel-slot-1/temple-panel-1b",
      "LVL-0031/seatedStatue/seated-statue-slot-1/seated-statue-1b",
      "LVL-0034/raiderCache/raiderCache-slot-1/raiderCache-1b",
      "LVL-0035/crate/crate-slot-1/crate-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      8
    ],
    "frozen": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2a",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2b"
    ],
    "existing": [
      "LVL-0002/mapTable/mapTable-slot-3/mapTable-3a",
      "LVL-0003/gateShield/gateShield-slot-3/gateShield-3a",
      "LVL-0004/nautilusLight/nautilusLight-slot-1/nautilusLight-1b",
      "LVL-0006/divingSuit/divingSuit-slot-1/divingSuit-1b",
      "LVL-0009/openBook/openBook-slot-3/openBook-3b",
      "LVL-0010/sandCastle/sandCastle-slot-3/sandCastle-3b",
      "LVL-0010/woodenBoat/woodenBoat-slot-3/woodenBoat-3b",
      "LVL-0011/netherOrb/netherOrb-slot-3/netherOrb-3b",
      "LVL-0013/windmill/windmill-slot-1/windmill-1a",
      "LVL-0013/cheeseCart/cheese-cart-slot-1/cheese-cart-1b",
      "LVL-0016/gelatoCart/gelato-cart-slot-1/gelato-cart-1b",
      "LVL-0017/alpineFountain/alpine-fountain-slot-1/alpine-fountain-1b",
      "LVL-0023/lockChambers/lock-chambers-slot-2/lock-chambers-2a",
      "LVL-0028/planningTable/planning-table-slot-1/planning-table-1b",
      "LVL-0029/canopicJars/canopic-jars-slot-1/canopic-jars-1b",
      "LVL-0031/boatDisplay/boat-display-slot-1/boat-display-1b",
      "LVL-0032/car/car-slot-1/car-1a",
      "LVL-0034/seaContainer/seaContainer-slot-1/seaContainer-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      6
    ],
    "frozen": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2b"
    ],
    "existing": [
      "LVL-0002/fireBowl/fireBowl-slot-1/fireBowl-1a",
      "LVL-0004/nautilusLight/nautilusLight-slot-3/nautilusLight-3b",
      "LVL-0008/creeperMask/creeperMask-slot-1/creeperMask-1b",
      "LVL-0008/enderPortal/enderPortal-slot-1/enderPortal-1b",
      "LVL-0010/woodenBoat/woodenBoat-slot-1/woodenBoat-1b",
      "LVL-0013/windmill/windmill-slot-3/windmill-3b",
      "LVL-0019/maypole/maypole-slot-3/maypole-3b",
      "LVL-0024/wingFrame/wing-frame-slot-3/wing-frame-3b",
      "LVL-0034/seaContainer/seaContainer-slot-1/seaContainer-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      48,
      6
    ],
    "frozen": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-4/illuminatedBooth-4a"
    ],
    "existing": [
      "LVL-0014/telescope/telescope-slot-3/telescope-3a",
      "LVL-0033/arcProbe/arcProbe-slot-4/arcProbe-4a",
      "LVL-0034/seaContainer/seaContainer-slot-4/seaContainer-4b",
      "LVL-0035/crate/crate-slot-3/crate-3a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      6
    ],
    "frozen": [
      "LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1a",
      "LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2b"
    ],
    "existing": [
      "LVL-0003/mooringRope/mooringRope-slot-4/mooringRope-4b",
      "LVL-0009/worldMap/worldMap-slot-1/worldMap-1a",
      "LVL-0009/openBook/openBook-slot-1/openBook-1a",
      "LVL-0013/cheeseCart/cheese-cart-slot-3/cheese-cart-3a",
      "LVL-0027/modelBoat/model-boat-slot-1/model-boat-1a",
      "LVL-0029/altarTable/altar-table-slot-1/altar-table-1a",
      "LVL-0031/scarabDisplay/scarab-display-slot-1/scarab-display-1a",
      "LVL-0032/raiderCache/raiderCache-slot-1/raiderCache-1b",
      "LVL-0034/raiderCache/raiderCache-slot-3/raiderCache-3b",
      "LVL-0035/terminal/terminal-slot-3/terminal-3b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      9
    ],
    "frozen": [
      "LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1b"
    ],
    "existing": [
      "LVL-0002/shieldWall/shieldWall-slot-2/shieldWall-2b",
      "LVL-0003/gateShield/gateShield-slot-2/gateShield-2b",
      "LVL-0008/enderPortal/enderPortal-slot-3/enderPortal-3a",
      "LVL-0010/treasureMap/treasureMap-slot-3/treasureMap-3a",
      "LVL-0016/gelatoCart/gelato-cart-slot-1/gelato-cart-1a",
      "LVL-0033/arcProbe/arcProbe-slot-1/arcProbe-1b",
      "LVL-0035/terminal/terminal-slot-1/terminal-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      9
    ],
    "frozen": [
      "LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2a",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1a"
    ],
    "existing": [
      "LVL-0006/divingSuit/divingSuit-slot-4/divingSuit-4b",
      "LVL-0006/miniSub/miniSub-slot-4/miniSub-4b",
      "LVL-0007/islandWheel/islandWheel-slot-4/islandWheel-4b",
      "LVL-0008/creeperMask/creeperMask-slot-2/creeperMask-2b",
      "LVL-0032/car/car-slot-1/car-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      7
    ],
    "frozen": [
      "LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2b",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1b"
    ],
    "existing": [
      "LVL-0001/zon/zon-slot-4/zon-4a",
      "LVL-0001/wind/wind-slot-4/wind-4a",
      "LVL-0003/harborMap/harborMap-slot-4/harborMap-4a",
      "LVL-0008/diamondSword/diamondSword-slot-4/diamondSword-4b",
      "LVL-0010/treasureMap/treasureMap-slot-4/treasureMap-4b",
      "LVL-0019/maypole/maypole-slot-2/maypole-2b",
      "LVL-0026/opticalTable/optical-table-slot-2/optical-table-2a",
      "LVL-0033/chimney/chimney-slot-1/chimney-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      63,
      9
    ],
    "frozen": [
      "LVL-0036/serviceBooth/serviceBooth-slot-4/serviceBooth-4a"
    ],
    "existing": [
      "LVL-0004/harborMap/harborMap-slot-1/harborMap-1a",
      "LVL-0035/crate/crate-slot-3/crate-3b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      7
    ],
    "frozen": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1a",
      "LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2a"
    ],
    "existing": [
      "LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4b",
      "LVL-0002/shipModel/shipModel-slot-4/shipModel-4b",
      "LVL-0006/miniSub/miniSub-slot-3/miniSub-3a",
      "LVL-0006/controlPanel/controlPanel-slot-3/controlPanel-3a",
      "LVL-0008/diamondSword/diamondSword-slot-1/diamondSword-1a",
      "LVL-0010/woodenBoat/woodenBoat-slot-1/woodenBoat-1a",
      "LVL-0016/gelatoCart/gelato-cart-slot-3/gelato-cart-3a",
      "LVL-0019/maypole/maypole-slot-3/maypole-3a",
      "LVL-0021/mechanicalModel/mechanical-model-slot-3/mechanical-model-3b",
      "LVL-0032/raiderCache/raiderCache-slot-1/raiderCache-1a",
      "LVL-0034/blueSuitcase/blueSuitcase-slot-1/blueSuitcase-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      8
    ],
    "frozen": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1b",
      "LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2b"
    ],
    "existing": [
      "LVL-0001/steen/steen-slot-2/steen-2b",
      "LVL-0002/mapTable/mapTable-slot-2/mapTable-2b",
      "LVL-0007/escapeBoat/escapeBoat-slot-1/escapeBoat-1a",
      "LVL-0011/netherMap/netherMap-slot-3/netherMap-3a",
      "LVL-0013/cheeseCart/cheese-cart-slot-1/cheese-cart-1a",
      "LVL-0021/opticsTable/optics-table-slot-2/optics-table-2b",
      "LVL-0027/modelBoat/model-boat-slot-2/model-boat-2b",
      "LVL-0029/altarTable/altar-table-slot-2/altar-table-2b",
      "LVL-0031/scarabDisplay/scarab-display-slot-2/scarab-display-2b",
      "LVL-0033/chimney/chimney-slot-1/chimney-1b",
      "LVL-0034/blueSuitcase/blueSuitcase-slot-1/blueSuitcase-1b",
      "LVL-0035/terminal/terminal-slot-1/terminal-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      8,
      8
    ],
    "frozen": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2a"
    ],
    "existing": [
      "LVL-0001/steen/steen-slot-3/steen-3b",
      "LVL-0006/divingSuit/divingSuit-slot-2/divingSuit-2a",
      "LVL-0006/miniSub/miniSub-slot-2/miniSub-2a",
      "LVL-0009/openBook/openBook-slot-4/openBook-4a",
      "LVL-0017/alpineFountain/alpine-fountain-slot-2/alpine-fountain-2a",
      "LVL-0032/lootCrate/lootCrate-slot-1/lootCrate-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      6
    ],
    "frozen": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2b",
      "LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1b"
    ],
    "existing": [
      "LVL-0004/harborMap/harborMap-slot-2/harborMap-2b",
      "LVL-0007/escapeBoat/escapeBoat-slot-2/escapeBoat-2b",
      "LVL-0009/openBook/openBook-slot-4/openBook-4b",
      "LVL-0016/colosseum/colosseum-slot-2/colosseum-2b",
      "LVL-0016/romanFountain/roman-fountain-slot-2/roman-fountain-2b",
      "LVL-0032/lootCrate/lootCrate-slot-2/lootCrate-2a",
      "LVL-0033/chimney/chimney-slot-2/chimney-2b",
      "LVL-0035/crate/crate-slot-1/crate-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      54,
      6
    ],
    "frozen": [
      "LVL-0037/expeditionMarker/expeditionMarker-slot-4/expeditionMarker-4a"
    ],
    "existing": [
      "LVL-0016/gelatoCart/gelato-cart-slot-3/gelato-cart-3b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      7,
      7
    ],
    "frozen": [
      "LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1a"
    ],
    "existing": [
      "LVL-0002/mapTable/mapTable-slot-3/mapTable-3b",
      "LVL-0004/harborMap/harborMap-slot-2/harborMap-2a",
      "LVL-0008/enderPortal/enderPortal-slot-4/enderPortal-4a",
      "LVL-0009/crystalCase/crystalCase-slot-4/crystalCase-4a",
      "LVL-0019/dalaHorse/dala-horse-slot-2/dala-horse-2a",
      "LVL-0019/maypole/maypole-slot-2/maypole-2a",
      "LVL-0024/wingRack/wing-rack-slot-4/wing-rack-4a",
      "LVL-0026/opticalTable/optical-table-slot-1/optical-table-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      8
    ],
    "frozen": [
      "LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1b"
    ],
    "existing": [
      "LVL-0003/gateShield/gateShield-slot-4/gateShield-4a",
      "LVL-0004/brassTelescope/brassTelescope-slot-2/brassTelescope-2b",
      "LVL-0005/mainPorthole/mainPorthole-slot-2/mainPorthole-2b",
      "LVL-0019/dalaHorse/dala-horse-slot-2/dala-horse-2b",
      "LVL-0026/opticalTable/optical-table-slot-2/optical-table-2b",
      "LVL-0033/arcProbe/arcProbe-slot-1/arcProbe-1a",
      "LVL-0035/crate/crate-slot-2/crate-2b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      6,
      6
    ],
    "frozen": [
      "LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2a"
    ],
    "existing": [
      "LVL-0007/escapeBoat/escapeBoat-slot-2/escapeBoat-2a",
      "LVL-0023/lockChambers/lock-chambers-slot-1/lock-chambers-1b",
      "LVL-0026/opticalTable/optical-table-slot-1/optical-table-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      56,
      8
    ],
    "frozen": [
      "LVL-0037/stoneCairn/stoneCairn-slot-4/stoneCairn-4a"
    ],
    "existing": [
      "LVL-0004/harborMap/harborMap-slot-1/harborMap-1b",
      "LVL-0011/netherMap/netherMap-slot-3/netherMap-3b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      9,
      9
    ],
    "frozen": [
      "LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2a"
    ],
    "existing": [
      "LVL-0002/fireBowl/fireBowl-slot-3/fireBowl-3b",
      "LVL-0003/gateShield/gateShield-slot-3/gateShield-3b",
      "LVL-0013/windmill/windmill-slot-2/windmill-2a",
      "LVL-0017/cableCar/cable-car-slot-2/cable-car-2a",
      "LVL-0021/mechanicalModel/mechanical-model-slot-2/mechanical-model-2a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      81,
      9
    ],
    "frozen": [
      "LVL-0037/technicalInstallation/technicalInstallation-slot-4/technicalInstallation-4a"
    ],
    "existing": [
      "LVL-0016/colosseum/colosseum-slot-2/colosseum-2a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      40,
      5
    ],
    "frozen": [
      "LVL-0038/welcomeSign/welcomeSign-slot-4/welcomeSign-4a"
    ],
    "existing": [
      "LVL-0032/raiderCache/raiderCache-slot-4/raiderCache-4a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      5
    ],
    "frozen": [
      "LVL-0038/statue/statue-slot-1/statue-1a"
    ],
    "existing": [
      "LVL-0005/logbookDesk/logbookDesk-slot-1/logbookDesk-1b",
      "LVL-0006/miniSub/miniSub-slot-1/miniSub-1b",
      "LVL-0009/crystalCase/crystalCase-slot-3/crystalCase-3b",
      "LVL-0028/stoneSled/stone-sled-slot-1/stone-sled-1b",
      "LVL-0033/arcProbe/arcProbe-slot-3/arcProbe-3b",
      "LVL-0034/raiderCache/raiderCache-slot-3/raiderCache-3a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      2
    ],
    "frozen": [
      "LVL-0038/statue/statue-slot-2/statue-2a"
    ],
    "existing": [
      "LVL-0006/controlPanel/controlPanel-slot-3/controlPanel-3b",
      "LVL-0011/netherOrb/netherOrb-slot-1/netherOrb-1b",
      "LVL-0024/wingFrame/wing-frame-slot-4/wing-frame-4b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      4
    ],
    "frozen": [
      "LVL-0038/statue/statue-slot-2/statue-2b"
    ],
    "existing": [
      "LVL-0004/brassTelescope/brassTelescope-slot-1/brassTelescope-1b",
      "LVL-0005/captainChart/captainChart-slot-1/captainChart-1b",
      "LVL-0010/treasureMap/treasureMap-slot-3/treasureMap-3b",
      "LVL-0027/tabletCase/tablet-case-slot-1/tablet-case-1b"
    ]
  },
  {
    "signature": [
      "clock-reading",
      3,
      0,
      "drie uur"
    ],
    "frozen": [
      "LVL-0038/churchClock/churchClock-slot-1/churchClock-1a"
    ],
    "existing": [
      "LVL-0017/clockHouse/clock-house-slot-1/at-clock-1a",
      "LVL-0024/flightControls/flight-controls-slot-3/flight-controls-3a",
      "LVL-0030/sundial/sundial-slot-1/sundial-1a"
    ]
  },
  {
    "signature": [
      "clock-reading",
      4,
      15,
      "kwart over vier"
    ],
    "frozen": [
      "LVL-0038/churchClock/churchClock-slot-1/churchClock-1b"
    ],
    "existing": [
      "LVL-0013/canalClock/canal-clock-slot-1/nl-clock-1a",
      "LVL-0023/waterClock/water-clock-slot-1/water-clock-1b"
    ]
  },
  {
    "signature": [
      "clock-reading",
      8,
      25,
      "vijf voor half negen"
    ],
    "frozen": [
      "LVL-0038/churchClock/churchClock-slot-3/churchClock-3a"
    ],
    "existing": [
      "LVL-0035/roundContainer/roundContainer-slot-3/roundContainer-3a"
    ]
  },
  {
    "signature": [
      "clock-reading",
      0,
      0,
      "twaalf uur"
    ],
    "frozen": [
      "LVL-0038/churchClock/churchClock-slot-4/churchClock-4b"
    ],
    "existing": [
      "LVL-0017/clockHouse/clock-house-slot-1/at-clock-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      2,
      5
    ],
    "frozen": [
      "LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1a"
    ],
    "existing": [
      "LVL-0004/harborMap/harborMap-slot-4/harborMap-4b",
      "LVL-0017/alpineFountain/alpine-fountain-slot-4/alpine-fountain-4b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      4
    ],
    "frozen": [
      "LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1b"
    ],
    "existing": [
      "LVL-0005/mainPorthole/mainPorthole-slot-2/mainPorthole-2a",
      "LVL-0006/controlPanel/controlPanel-slot-2/controlPanel-2a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      5
    ],
    "frozen": [
      "LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2a"
    ],
    "existing": [
      "LVL-0003/harborMap/harborMap-slot-2/harborMap-2b",
      "LVL-0021/centralCodex/central-codex-slot-4/central-codex-4a",
      "LVL-0032/lootCrate/lootCrate-slot-2/lootCrate-2b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      10
    ],
    "frozen": [
      "LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2b"
    ],
    "existing": [
      "LVL-0001/zon/zon-slot-1/zon-1a",
      "LVL-0004/harborMap/harborMap-slot-3/harborMap-3b",
      "LVL-0004/brassTelescope/brassTelescope-slot-3/brassTelescope-3b",
      "LVL-0007/islandMap/islandMap-slot-3/islandMap-3b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      3,
      3
    ],
    "frozen": [
      "LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1a"
    ],
    "existing": [
      "LVL-0008/diamondSword/diamondSword-slot-4/diamondSword-4a",
      "LVL-0008/creeperMask/creeperMask-slot-4/creeperMask-4a",
      "LVL-0014/telescope/telescope-slot-2/telescope-2a",
      "LVL-0016/gelatoCart/gelato-cart-slot-2/gelato-cart-2a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      4
    ],
    "frozen": [
      "LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1b"
    ],
    "existing": [
      "LVL-0002/shipModel/shipModel-slot-4/shipModel-4a",
      "LVL-0006/divingSuit/divingSuit-slot-2/divingSuit-2b",
      "LVL-0010/woodenBoat/woodenBoat-slot-4/woodenBoat-4b",
      "LVL-0032/car/car-slot-3/car-3b",
      "LVL-0035/crate/crate-slot-2/crate-2a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      2,
      10
    ],
    "frozen": [
      "LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2a"
    ],
    "existing": [
      "LVL-0010/treasureMap/treasureMap-slot-4/treasureMap-4a",
      "LVL-0011/netherOrb/netherOrb-slot-4/netherOrb-4a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      2
    ],
    "frozen": [
      "LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2b"
    ],
    "existing": [
      "LVL-0003/gateShield/gateShield-slot-4/gateShield-4b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      42,
      6
    ],
    "frozen": [
      "LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3a"
    ],
    "existing": [
      "LVL-0002/fireBowl/fireBowl-slot-4/fireBowl-4a",
      "LVL-0003/mooringRope/mooringRope-slot-4/mooringRope-4a",
      "LVL-0005/logbookDesk/logbookDesk-slot-2/logbookDesk-2b",
      "LVL-0008/enderPortal/enderPortal-slot-4/enderPortal-4b",
      "LVL-0014/telescope/telescope-slot-2/telescope-2b",
      "LVL-0023/lockChambers/lock-chambers-slot-1/lock-chambers-1a",
      "LVL-0032/lootCrate/lootCrate-slot-3/lootCrate-3b",
      "LVL-0034/raiderCache/raiderCache-slot-4/raiderCache-4b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      45,
      9
    ],
    "frozen": [
      "LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3b"
    ],
    "existing": [
      "LVL-0009/crystalCase/crystalCase-slot-2/crystalCase-2a",
      "LVL-0021/mechanicalModel/mechanical-model-slot-1/mechanical-model-1a",
      "LVL-0027/modelBoat/model-boat-slot-3/model-boat-3b",
      "LVL-0029/altarTable/altar-table-slot-3/altar-table-3b",
      "LVL-0031/scarabDisplay/scarab-display-slot-3/scarab-display-3b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      5,
      3
    ],
    "frozen": [
      "LVL-0039/signalMast/signalMast-slot-1/signalMast-1a"
    ],
    "existing": [
      "LVL-0003/harborMap/harborMap-slot-4/harborMap-4b",
      "LVL-0005/mainPorthole/mainPorthole-slot-3/mainPorthole-3a",
      "LVL-0007/islandWheel/islandWheel-slot-3/islandWheel-3a",
      "LVL-0019/dalaHorse/dala-horse-slot-3/dala-horse-3a",
      "LVL-0024/wingRack/wing-rack-slot-1/wing-rack-1b"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      4,
      10
    ],
    "frozen": [
      "LVL-0039/signalMast/signalMast-slot-1/signalMast-1b"
    ],
    "existing": [
      "LVL-0024/wingRack/wing-rack-slot-1/wing-rack-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      2,
      4
    ],
    "frozen": [
      "LVL-0039/signalMast/signalMast-slot-2/signalMast-2a"
    ],
    "existing": [
      "LVL-0001/zon/zon-slot-2/zon-2b",
      "LVL-0003/mooringRope/mooringRope-slot-2/mooringRope-2b",
      "LVL-0009/crystalCase/crystalCase-slot-3/crystalCase-3a",
      "LVL-0019/maypole/maypole-slot-1/maypole-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "multiplication",
      10,
      5
    ],
    "frozen": [
      "LVL-0039/signalMast/signalMast-slot-2/signalMast-2b"
    ],
    "existing": [
      "LVL-0028/planningTable/planning-table-slot-1/planning-table-1a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      20,
      5
    ],
    "frozen": [
      "LVL-0039/signalMast/signalMast-slot-3/signalMast-3a"
    ],
    "existing": [
      "LVL-0001/steen/steen-slot-3/steen-3a"
    ]
  },
  {
    "signature": [
      "arithmetic",
      "division",
      12,
      3
    ],
    "frozen": [
      "LVL-0039/signalMast/signalMast-slot-3/signalMast-3b"
    ],
    "existing": [
      "LVL-0011/potionTable/potionTable-slot-4/potionTable-4b"
    ]
  }
]
```

## 4. E5 support-quality signals

Candidate counts below are grouped review issues, not claims that every affected record is wrong. No corrections made. Exact text, nouns, units and visual frames are in section 3.

```json
[
  {
    "id": "E01",
    "category": "Moose nearly supplies the answer",
    "scope": [
      "LVL-0036/stationClock/stationClock-slot-1/stationClock-1b",
      "LVL-0038/churchClock/churchClock-slot-1/churchClock-1b"
    ],
    "finding": "Manual review: half-hour hint supplies both half and the next hour; quarter-past hint supplies the hour and quarter-over relation. Neither literally contains the canonical answer, but the remaining learner step may be very small. Exact hints are in the records; these are shared digital-clock support, not Frozen overrides."
  },
  {
    "id": "E02",
    "category": "Full explanation scaffolding",
    "scope": [
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1a",
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-1/illuminatedBooth-1b",
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2a",
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-2/illuminatedBooth-2b",
      "LVL-0036/illuminatedBooth/illuminatedBooth-slot-4/illuminatedBooth-4a",
      "LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1a",
      "LVL-0036/serviceBooth/serviceBooth-slot-1/serviceBooth-1b",
      "LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2a",
      "LVL-0036/serviceBooth/serviceBooth-slot-2/serviceBooth-2b",
      "LVL-0036/serviceBooth/serviceBooth-slot-4/serviceBooth-4a",
      "LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1a",
      "LVL-0037/expeditionMarker/expeditionMarker-slot-1/expeditionMarker-1b",
      "LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2a",
      "LVL-0037/expeditionMarker/expeditionMarker-slot-2/expeditionMarker-2b",
      "LVL-0037/expeditionMarker/expeditionMarker-slot-4/expeditionMarker-4a",
      "LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1a",
      "LVL-0037/stoneCairn/stoneCairn-slot-1/stoneCairn-1b",
      "LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2a",
      "LVL-0037/stoneCairn/stoneCairn-slot-2/stoneCairn-2b",
      "LVL-0037/stoneCairn/stoneCairn-slot-4/stoneCairn-4a",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1a",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-1/technicalInstallation-1b",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2a",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-2/technicalInstallation-2b",
      "LVL-0037/technicalInstallation/technicalInstallation-slot-4/technicalInstallation-4a",
      "LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1a",
      "LVL-0038/welcomeSign/welcomeSign-slot-1/welcomeSign-1b",
      "LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2a",
      "LVL-0038/welcomeSign/welcomeSign-slot-2/welcomeSign-2b",
      "LVL-0038/welcomeSign/welcomeSign-slot-4/welcomeSign-4a",
      "LVL-0038/statue/statue-slot-1/statue-1a",
      "LVL-0038/statue/statue-slot-1/statue-1b",
      "LVL-0038/statue/statue-slot-2/statue-2a",
      "LVL-0038/statue/statue-slot-2/statue-2b",
      "LVL-0038/statue/statue-slot-4/statue-4a",
      "LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1a",
      "LVL-0039/machineryFragment/machineryFragment-slot-1/machineryFragment-1b",
      "LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2a",
      "LVL-0039/machineryFragment/machineryFragment-slot-2/machineryFragment-2b",
      "LVL-0039/machineryFragment/machineryFragment-slot-4/machineryFragment-4a",
      "LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1a",
      "LVL-0039/controlCabinets/controlCabinets-slot-1/controlCabinets-1b",
      "LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2a",
      "LVL-0039/controlCabinets/controlCabinets-slot-2/controlCabinets-2b",
      "LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3a",
      "LVL-0039/controlCabinets/controlCabinets-slot-3/controlCabinets-3b",
      "LVL-0039/signalMast/signalMast-slot-1/signalMast-1a",
      "LVL-0039/signalMast/signalMast-slot-1/signalMast-1b",
      "LVL-0039/signalMast/signalMast-slot-2/signalMast-2a",
      "LVL-0039/signalMast/signalMast-slot-2/signalMast-2b",
      "LVL-0039/signalMast/signalMast-slot-3/signalMast-3a",
      "LVL-0039/signalMast/signalMast-slot-3/signalMast-3b"
    ],
    "finding": "These full explanations state only the solved equation. They are present and arithmetically consistent; review whether the third-error/assisted-completion stage needs more reasoning than the result."
  },
  {
    "id": "E06",
    "category": "Repeated educational cores",
    "scope": [
      "Section 3 duplicate inventories"
    ],
    "finding": "8 repeated core groups inside Frozen Atlas; 49 Frozen core groups also occur in other enabled production E5. Repetition may be intended table practice. Exact operands/operation comparison follows the existing full audit; no automatic pedagogical conclusion."
  }
]
```

| Signal | Result / evidence |
| --- | --- |
| Minnie literal final answer | 0; canonical clock phrase or complete solved-equation result not found in Minnie |
| Moose literal final answer | 0 exact canonical clock-phrase matches; near-answer reasoning flagged E01 |
| Missing question / Minnie / Moose / explanation | {"question":0,"minnie":0,"moose":0,"explanation":0,"canonicalAnswer":0} |
| Explanation arithmetic or clock inconsistency | 0 detected; all 96 arithmetic/clock/support checks pass |
| Wrong context noun | No concrete mismatch found in the 26 applied stories and their resolved explanations; generic hints intentionally use groups |
| Unresolved template markers | 0 |
| Combined alternative wording X of Y | No candidate in resolved Frozen support; no automatic treatment of grammatical Dutch “of” as a defect |
| Visual/text contradiction | No clock-time/answer discrepancy detected in 16 clock variants; visual pixel appearance not editorially assessed |
| MC answer absent / duplicate choices | 0 / 0 |
| Unit mismatch | No concrete mismatch found; euro/meter contracts and story nouns exported. E5 answer has no numeric input unit enforcement beyond its legacy contract. |

## 5. M6 architecture proof

**PASS**: all 48 Frozen positions route an M6 request through the existing world-independent bank. Zero local M6 variants, no Frozen M6 bank, no Frozen-specific domain or difficulty filter. `positionDomain` uses E5 clock visual/family semantics; generic excludes time. Selection receives only difficulty/domain, used-question history and global recency—not a Frozen world whitelist. IDs remain the central `centralQuestionId` with `surfaceId`; recovering the same ID/surface yields the original central question.

Central bank metadata only:

```json
{
  "total": 159,
  "difficulty": {
    "1": 64,
    "2": 58,
    "3": 37
  },
  "domains": {
    "fractionsRatios": 28,
    "additionSubtraction": 20,
    "money": 20,
    "time": 30,
    "numberSense": 14,
    "multiplicationDivision": 16,
    "measurementGeometry": 16,
    "dataPatterns": 15
  },
  "FrozenRoutingPositions": {
    "explicit time position": 8,
    "generic / non-time": 40
  },
  "localM6": 0,
  "plannerSelectionsChecked": 10560
}
```

| Level | Challenge | Slot | Routing class | M6 central | Local M6 |
| --- | --- | --- | --- | --- | --- |
| LVL-0036 | stationClock | stationClock-slot-1 | explicit time position | true | 0 |
| LVL-0036 | stationClock | stationClock-slot-2 | explicit time position | true | 0 |
| LVL-0036 | stationClock | stationClock-slot-3 | explicit time position | true | 0 |
| LVL-0036 | stationClock | stationClock-slot-4 | explicit time position | true | 0 |
| LVL-0036 | illuminatedBooth | illuminatedBooth-slot-1 | generic / non-time | true | 0 |
| LVL-0036 | illuminatedBooth | illuminatedBooth-slot-2 | generic / non-time | true | 0 |
| LVL-0036 | illuminatedBooth | illuminatedBooth-slot-3 | generic / non-time | true | 0 |
| LVL-0036 | illuminatedBooth | illuminatedBooth-slot-4 | generic / non-time | true | 0 |
| LVL-0036 | serviceBooth | serviceBooth-slot-1 | generic / non-time | true | 0 |
| LVL-0036 | serviceBooth | serviceBooth-slot-2 | generic / non-time | true | 0 |
| LVL-0036 | serviceBooth | serviceBooth-slot-3 | generic / non-time | true | 0 |
| LVL-0036 | serviceBooth | serviceBooth-slot-4 | generic / non-time | true | 0 |
| LVL-0037 | expeditionMarker | expeditionMarker-slot-1 | generic / non-time | true | 0 |
| LVL-0037 | expeditionMarker | expeditionMarker-slot-2 | generic / non-time | true | 0 |
| LVL-0037 | expeditionMarker | expeditionMarker-slot-3 | generic / non-time | true | 0 |
| LVL-0037 | expeditionMarker | expeditionMarker-slot-4 | generic / non-time | true | 0 |
| LVL-0037 | stoneCairn | stoneCairn-slot-1 | generic / non-time | true | 0 |
| LVL-0037 | stoneCairn | stoneCairn-slot-2 | generic / non-time | true | 0 |
| LVL-0037 | stoneCairn | stoneCairn-slot-3 | generic / non-time | true | 0 |
| LVL-0037 | stoneCairn | stoneCairn-slot-4 | generic / non-time | true | 0 |
| LVL-0037 | technicalInstallation | technicalInstallation-slot-1 | generic / non-time | true | 0 |
| LVL-0037 | technicalInstallation | technicalInstallation-slot-2 | generic / non-time | true | 0 |
| LVL-0037 | technicalInstallation | technicalInstallation-slot-3 | generic / non-time | true | 0 |
| LVL-0037 | technicalInstallation | technicalInstallation-slot-4 | generic / non-time | true | 0 |
| LVL-0038 | welcomeSign | welcomeSign-slot-1 | generic / non-time | true | 0 |
| LVL-0038 | welcomeSign | welcomeSign-slot-2 | generic / non-time | true | 0 |
| LVL-0038 | welcomeSign | welcomeSign-slot-3 | generic / non-time | true | 0 |
| LVL-0038 | welcomeSign | welcomeSign-slot-4 | generic / non-time | true | 0 |
| LVL-0038 | statue | statue-slot-1 | generic / non-time | true | 0 |
| LVL-0038 | statue | statue-slot-2 | generic / non-time | true | 0 |
| LVL-0038 | statue | statue-slot-3 | generic / non-time | true | 0 |
| LVL-0038 | statue | statue-slot-4 | generic / non-time | true | 0 |
| LVL-0038 | churchClock | churchClock-slot-1 | explicit time position | true | 0 |
| LVL-0038 | churchClock | churchClock-slot-2 | explicit time position | true | 0 |
| LVL-0038 | churchClock | churchClock-slot-3 | explicit time position | true | 0 |
| LVL-0038 | churchClock | churchClock-slot-4 | explicit time position | true | 0 |
| LVL-0039 | machineryFragment | machineryFragment-slot-1 | generic / non-time | true | 0 |
| LVL-0039 | machineryFragment | machineryFragment-slot-2 | generic / non-time | true | 0 |
| LVL-0039 | machineryFragment | machineryFragment-slot-3 | generic / non-time | true | 0 |
| LVL-0039 | machineryFragment | machineryFragment-slot-4 | generic / non-time | true | 0 |
| LVL-0039 | controlCabinets | controlCabinets-slot-1 | generic / non-time | true | 0 |
| LVL-0039 | controlCabinets | controlCabinets-slot-2 | generic / non-time | true | 0 |
| LVL-0039 | controlCabinets | controlCabinets-slot-3 | generic / non-time | true | 0 |
| LVL-0039 | controlCabinets | controlCabinets-slot-4 | generic / non-time | true | 0 |
| LVL-0039 | signalMast | signalMast-slot-1 | generic / non-time | true | 0 |
| LVL-0039 | signalMast | signalMast-slot-2 | generic / non-time | true | 0 |
| LVL-0039 | signalMast | signalMast-slot-3 | generic / non-time | true | 0 |
| LVL-0039 | signalMast | signalMast-slot-4 | generic / non-time | true | 0 |

### Eligible central IDs — generic / non-time

All slider-eligible possibilities by difficulty. Default 10% M6 only enables D1. Higher slider settings expand according to section 6; recency, used IDs, selected difficulty and objective balancing choose among these.

```json
{
  "total": 129,
  "difficultyCounts": {
    "1": 55,
    "2": 44,
    "3": 30
  },
  "defaultD1Eligible": 55,
  "idsByDifficulty": {
    "1": [
      "RP-M6-BR-001",
      "RP-M6-BR-002",
      "RP-M6-OP-001",
      "RP-M6-OP-002",
      "RP-M6-GE-001",
      "RP-M6-GE-002",
      "M6-NS-001",
      "M6-NS-002",
      "M6-NS-003",
      "M6-NS-004",
      "M6-NS-008",
      "M6-AS-001",
      "M6-AS-002",
      "M6-AS-003",
      "M6-MD-001",
      "M6-MD-002",
      "M6-MD-003",
      "M6-MD-004",
      "M6-MD-005",
      "M6-FR-001",
      "M6-FR-002",
      "M6-FR-003",
      "M6-FR-004",
      "M6-FR-005",
      "M6-MO-001",
      "M6-MO-002",
      "M6-MO-003",
      "M6-MO-004",
      "M6-ME-001",
      "M6-ME-002",
      "M6-ME-003",
      "M6-ME-004",
      "M6-DP-001",
      "M6-DP-002",
      "M6-DP-003",
      "M6-ME-008",
      "M6-ME-009",
      "M6-DP-007",
      "M6-DP-008",
      "M6-MD-011",
      "M6-MD-012",
      "M6-NS-009",
      "M6-NS-010",
      "M6-FR-011",
      "M6-FR-012",
      "M6-FR-013",
      "M6-FR-014",
      "M6-MO-009",
      "M6-MO-010",
      "M6-AS-009",
      "M6-AS-010",
      "M6-AS-011",
      "M6-ME-014",
      "M6-ME-015",
      "M6-DP-013"
    ],
    "2": [
      "RP-M6-BR-003",
      "RP-M6-BR-004",
      "RP-M6-OP-003",
      "RP-M6-OP-004",
      "RP-M6-GE-003",
      "RP-M6-GE-004",
      "M6-NS-005",
      "M6-NS-006",
      "M6-NS-007",
      "M6-AS-004",
      "M6-AS-005",
      "M6-AS-006",
      "M6-MD-006",
      "M6-MD-007",
      "M6-MD-008",
      "M6-FR-006",
      "M6-FR-007",
      "M6-FR-010",
      "M6-MO-005",
      "M6-MO-006",
      "M6-ME-005",
      "M6-ME-006",
      "M6-DP-004",
      "M6-DP-005",
      "M6-DP-006",
      "M6-ME-010",
      "M6-ME-011",
      "M6-DP-009",
      "M6-DP-010",
      "M6-DP-012",
      "M6-MD-013",
      "M6-MD-014",
      "M6-NS-011",
      "M6-NS-012",
      "M6-FR-015",
      "M6-FR-016",
      "M6-FR-017",
      "M6-FR-018",
      "M6-MO-011",
      "M6-MO-012",
      "M6-AS-012",
      "M6-AS-013",
      "M6-ME-016",
      "M6-DP-014"
    ],
    "3": [
      "RP-M6-BR-005",
      "RP-M6-BR-006",
      "RP-M6-OP-005",
      "RP-M6-OP-006",
      "RP-M6-GE-005",
      "RP-M6-GE-006",
      "M6-AS-007",
      "M6-AS-008",
      "M6-MD-009",
      "M6-MD-010",
      "M6-FR-008",
      "M6-FR-009",
      "M6-MO-007",
      "M6-MO-008",
      "M6-ME-007",
      "M6-ME-012",
      "M6-ME-013",
      "M6-DP-011",
      "M6-MD-015",
      "M6-MD-016",
      "M6-NS-013",
      "M6-NS-014",
      "M6-FR-019",
      "M6-FR-020",
      "M6-FR-021",
      "M6-FR-022",
      "M6-MO-013",
      "M6-MO-014",
      "M6-AS-014",
      "M6-DP-015"
    ]
  }
}
```

### Eligible central IDs — explicit time position

All slider-eligible possibilities by difficulty. Default 10% M6 only enables D1. Higher slider settings expand according to section 6; recency, used IDs, selected difficulty and objective balancing choose among these.

```json
{
  "total": 30,
  "difficultyCounts": {
    "1": 9,
    "2": 14,
    "3": 7
  },
  "defaultD1Eligible": 9,
  "idsByDifficulty": {
    "1": [
      "RP-M6-TI-001",
      "RP-M6-TI-002",
      "M6-TI-001",
      "M6-TI-002",
      "M6-TI-009",
      "M6-TI-010",
      "M6-TI-013",
      "M6-TI-019",
      "M6-TI-020"
    ],
    "2": [
      "RP-M6-TI-003",
      "RP-M6-TI-004",
      "M6-TI-003",
      "M6-TI-004",
      "M6-TI-005",
      "M6-TI-006",
      "M6-TI-007",
      "M6-TI-008",
      "M6-TI-011",
      "M6-TI-012",
      "M6-TI-015",
      "M6-TI-017",
      "M6-TI-021",
      "M6-TI-022"
    ],
    "3": [
      "RP-M6-TI-005",
      "RP-M6-TI-006",
      "M6-TI-014",
      "M6-TI-016",
      "M6-TI-018",
      "M6-TI-023",
      "M6-TI-024"
    ]
  }
}
```

## 6. Learning planner / level mix

Production facts: `DEFAULT_M6_PERCENTAGE=10` (90% E5 / 10% M6); storage key `atlas.learning.m6Percentage`. `createPlanner` uses a 20-request balanced deck and slider difficulty weights. Frozen source contains no preference override or generator. All 48 positions were exercised for 20 selections at each of 0,10,…,100%: 10560 selections, no level fallback and no out-of-domain/difficulty result. Fallback has no repayment debt; planner advances one request. Standard same-domain nearest-eligible difficulty/reuse logic remains available. There is no Frozen-specific random generator: randomness selects authored local E5 or existing central ID/surface.

`currentChallengeQuestions` selects once when `atlasLearningSelection` is absent, stores the selected question and shuffles an MC copy once with Fisher–Yates. Slot order is the four authored positions; local variant is selected at slot entry. Retries/hints/render/reopening reuse that object and choice order. New runs/reload reset active challenge progress, not the saved user preference. Browser probes verified no extra planner draw through three wrong answers and reopen in E5/M6 on all four levels.

Exact shared difficulty weights (% within M6):

```json
{
  "0": {
    "1": 0,
    "2": 0,
    "3": 0
  },
  "10": {
    "1": 100,
    "2": 0,
    "3": 0
  },
  "20": {
    "1": 100,
    "2": 0,
    "3": 0
  },
  "30": {
    "1": 100,
    "2": 0,
    "3": 0
  },
  "40": {
    "1": 85,
    "2": 15,
    "3": 0
  },
  "50": {
    "1": 75,
    "2": 25,
    "3": 0
  },
  "60": {
    "1": 65,
    "2": 35,
    "3": 0
  },
  "70": {
    "1": 65,
    "2": 30,
    "3": 5
  },
  "80": {
    "1": 60,
    "2": 30,
    "3": 10
  },
  "90": {
    "1": 55,
    "2": 35,
    "3": 10
  },
  "100": {
    "1": 50,
    "2": 35,
    "3": 15
  }
}
```

## 7. Minnie / Moose / explanation flow

Shared `answerQuestion` / `showAuthoredHelp`: first valid wrong answer → Minnie; second → Moose; third → full explanation. Invalid/empty input is not a valid wrong answer. Failure count resets on the next question. E5 hints use the companion bar; full resolved explanation appears as feedback and unlocks “Samen afronden”. M6 uses the current right-hand notebook; it requires a correct answer after explanation and does not offer E5 assisted completion. `renderScene({hideTeamBar:m6 || completed})` suppresses the companion bar while M6 is open. Scratchpad is separate `state.scratchpad` text, not a source of help; new help stage returns notebook to support without erasing notes. No direct “Leg uit” control/handler exists in gameplay; the legacy phrase in session-history display describes historical events only. No Frozen-specific support branch or override was found.

Browser evidence: first actual challenge in each Frozen level at 0% and 100% M6; all three stages, unchanged selected question/planner count, no direct button, M6 notebook/bar condition and stable close/reopen. Existing central presentation tests additionally exercise authored text/visual fidelity for multiple central surfaces.

```json
[
  {
    "id": "LVL-0036",
    "percentage": 0,
    "question": "stationClock-1b",
    "mode": "E5",
    "presenter": "Valente",
    "draws": 1,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 1,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 1,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 1,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      }
    ],
    "assisted": true,
    "reopenStable": true
  },
  {
    "id": "LVL-0037",
    "percentage": 0,
    "question": "expeditionMarker-1b",
    "mode": "E5",
    "presenter": "Valente",
    "draws": 2,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 2,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 2,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 2,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      }
    ],
    "assisted": true,
    "reopenStable": true
  },
  {
    "id": "LVL-0038",
    "percentage": 0,
    "question": "welcomeSign-1a",
    "mode": "E5",
    "presenter": "Valente",
    "draws": 3,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 3,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 3,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 3,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      }
    ],
    "assisted": true,
    "reopenStable": true
  },
  {
    "id": "LVL-0039",
    "percentage": 0,
    "question": "machineryFragment-1b",
    "mode": "E5",
    "presenter": "Valente",
    "draws": 4,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 4,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 4,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 4,
        "teamBar": true,
        "notebook": false,
        "directExplain": false
      }
    ],
    "assisted": true,
    "reopenStable": true
  },
  {
    "id": "LVL-0036",
    "percentage": 100,
    "question": "M6-TI-003",
    "mode": "M6",
    "presenter": "Valente",
    "draws": 1,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 1,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 1,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 1,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      }
    ],
    "assisted": false,
    "reopenStable": true
  },
  {
    "id": "LVL-0037",
    "percentage": 100,
    "question": "M6-FR-005",
    "mode": "M6",
    "presenter": "Valente",
    "draws": 2,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 2,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 2,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 2,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      }
    ],
    "assisted": false,
    "reopenStable": true
  },
  {
    "id": "LVL-0038",
    "percentage": 100,
    "question": "M6-AS-002",
    "mode": "M6",
    "presenter": "Valente",
    "draws": 3,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 3,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 3,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 3,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      }
    ],
    "assisted": false,
    "reopenStable": true
  },
  {
    "id": "LVL-0039",
    "percentage": 100,
    "question": "M6-NS-012",
    "mode": "M6",
    "presenter": "Valente",
    "draws": 4,
    "stages": [
      {
        "stage": "minnie",
        "stable": true,
        "draws": 4,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "moose",
        "stable": true,
        "draws": 4,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      },
      {
        "stage": "explanation",
        "stable": true,
        "draws": 4,
        "teamBar": false,
        "notebook": true,
        "directExplain": false
      }
    ],
    "assisted": false,
    "reopenStable": true
  }
]
```

## 8. Frozen-specific narrative consistency

```json
[
  {
    "id": "E03",
    "category": "Repeated narrative boilerplate",
    "scope": [
      "Levels/LVL-0036/level.js#runes,description,reward.line,spiritLines",
      "Levels/LVL-0037/level.js#runes,description,reward.line,spiritLines",
      "Levels/LVL-0038/level.js#runes,description,reward.line,spiritLines",
      "Levels/LVL-0039/level.js#runes,description,reward.line,spiritLines"
    ],
    "finding": "Across all four places, three-place exploration descriptions/rewards, four-question prompts, and “Deze plek is onderzocht!” repeat closely. Review voice and variety. Some authored rune copy is dormant in the current challenge renderer; see section 2."
  },
  {
    "id": "E04",
    "category": "Similar challenge labels",
    "scope": [
      "Levels/LVL-0036/level.js#runes[1]",
      "Levels/LVL-0036/level.js#runes[2]"
    ],
    "finding": "“Verlicht diensthuisje” and “Diensthuisje” are distinct adjacent challenge objects. Review whether these names distinguish them clearly enough for the learner; no binding ambiguity was found."
  },
  {
    "id": "E05",
    "category": "Awkward repeated preposition",
    "scope": [
      "Levels/LVL-0039/level.js#runes[2].intro",
      "Levels/LVL-0039/level.js#areas[2].description"
    ],
    "finding": "Exact authored copy includes “Valente onderzoekt de signaalmast met het waarschuwingslicht met Sven.” and “Onderzoek de signaalmast met het waarschuwingslicht met Valente.” Review the repeated “met”. These are authored/context strings, not the current question prompt."
  }
]
```

No wrong Frozen location name, Egypt/Runenpoort carryover, or mismatched story-answer noun was identified. The four English place titles and “Almatera” in Old Town are authored naming choices. “ARC-wrakstuk”, ARC Sven/guide assets and Valente are explicit Frozen content, not automatically classified as accidental ARC Atlas leftovers. Singular/plural in the runtime blocked-exit copy was verified for 3 opdrachten, 2 opdrachten and 1 opdracht. Visual/spatial claims such as “rechts”, “hoog boven”, or a colored light are exported exactly; this text audit does not independently establish agreement with every background pixel. Repeated-copy observations are E03, not automatic rewrites.

## 9. Technical integrity

One technical finding (existing regression mismatch):

```json
[
  {
    "id": "T01",
    "source": "tests/frozen-atlas.spec.js:53; Levels/LVL-0039/level.js#player.start",
    "finding": "Existing registration regression fails: expected player.start.x < 200, current Fallen Emperor start is x=237 (y=583). This is a test/content expectation mismatch, not proof of a broken exit or route. Full E5 and M6 adventure tests pass. No source or test changed."
  }
]
```

Checks: four manifest scripts resolve; world root and next order resolve; no developer/test IDs in Frozen content; all 12 challenge IDs unique within level (and across this world), all 48 slot IDs and 96 variant IDs unique in their required scope; every active challenge has four nonempty slots; every rune resolves to its challenge and existing object; every required exit resolves to hotspot/object and the intended next level (or null finale). Standard validator passes 39 production + 1 developer level. Full Frozen E5 and M6 adventures pass all 12 challenges, earned exits and finale. No debug completion shortcut used.

Inactive authored learning inventory: no disabled Frozen level/challenge/slot/variant. Menu-hidden connected levels remain active. Dormant narrative fields are inventoried in section 2 rather than counted as active question content. Disabled renderer features remain in the authored world configuration in section 1; they do not create disabled learning variants.

## 10. Export integrity and validation

```json
{
  "expected": {
    "levels": 4,
    "challenges": 12,
    "slots": 48,
    "e5Variants": 96
  },
  "exported": {
    "levels": 4,
    "challenges": 12,
    "slots": 48,
    "e5Variants": 96
  },
  "missing": {
    "question": [],
    "minnie": [],
    "moose": [],
    "explanation": [],
    "canonicalAnswer": []
  },
  "unresolvedMarkers": [],
  "resolverFailures": [],
  "duplicateScopedIds": [],
  "technicalFindings": 1,
  "editorialSupportCandidateGroups": 6,
  "insideDuplicateCoreGroups": 8,
  "crossProductionDuplicateCoreGroups": 49
}
```

Validation status: PASS — 96 complete E5 records freshly re-resolved, 296 exact narrative fields reloaded, 2195 pre-existing non-output files byte-identical; 96/96 variants exported; 10560 planner selections verified. Existing browser regression run: **31 passed / 1 failed** (desktop Chromium, frozen-atlas + m6-presentation-browser); failure is T01, not suppressed. Standard level validation: PASS. Frozen runtime narrative/help probe: PASS (8 cases). No production-source writes are part of these commands; no npm pretest/generation hook was used.

Reproduction from repository root: evaluate manifest/world config with `AtlasWorld.createWorldResolver`; use `scripts/level-utils.loadAllLevels`, include enabled non-developer levels and `challenge.active !== false`; for each Frozen E5 variant call `learning-levels.resolveLevel`, `challenge-hints.resolve(levelId,q,"minnie"/"moose")`, `resolveExplanation`, and `resolveClockVisual` for all four stages. Export authored choices without shuffling. Core comparison reuses `eCore` from `output/full-learning-audit-20261009/export.cjs`; the exact signatures and method are retained in this document, so interpretation does not depend on that ignored historical script. Narrative markers encode source file, level and JSON path in base64. E5 markers encode level/challenge/slot/variant. Fresh verification parses every marked block after writing and reloads current production source/resolvers; it also compares expected and exported record order/count, core metadata and all support/visual/answer fields.

Limitations: manual editorial candidates are heuristic/reviewer prompts, not exhaustive pedagogical verdicts. Visuals are exact resolved declarative clock frames, not screenshots; no pixel-based scenery consistency or physical-iPad audit is claimed. Runtime-dependent statistics are parameterized values and cannot be exhaustively enumerated over all play histories. The central M6 bank is intentionally not repeated in full. None of these prevents complete export of the 96 active E5 variants and authored Frozen narrative. The failing pre-existing registration assertion remains unresolved because this is audit-only.

### Source files inspected / evaluated and SHA-256

Production-level files outside Frozen are loaded only for duplicate comparisons. Central module files are evaluated by the production bank. Hashes identify this working-tree snapshot, not HEAD.

| Source | SHA-256 |
| --- | --- |
| Docs/ATLAS_LEARNING_CONTENT_RULES.md | bc5ebafd473b9672248e671645564a97a9e46ffc3b49ce347346edc63bc03947 |
| Docs/DEV_TOOLS.md | a5edec657147a02e0dde0a50c3c45ed1ea6560ab0ffbcfcfb9f7f47c0785a460 |
| Docs/EDITOR_AND_EFFECTS.md | 6551b5e10a651d7fd089ea3d9f0dda27b22669b623b609bb2ecccbe68f41caea |
| Docs/LEVEL_CONTRACT.md | 59b836aa9e28998a943ecaf5c2a04a65b09b6ec9df9145fb008c76f4cddc46cc |
| Docs/renderer-current-spec.md | 8d1ba250137b462178d45652a35ba6110c3243eea75fc567693b2bacc2118134 |
| Levels/LVL-0001/level.js | 48a1884698ebd69489bf49bc1be8b9c734a04aea8c2e4bf6d67b57d95dc126d1 |
| Levels/LVL-0002/level.js | 7c09bb9776a1c363642f014eaa2303a731579c0042ca7d3aed2fba90a807bb19 |
| Levels/LVL-0003/level.js | 02810162fd58a0209158bfb6b10cadbc81840cb9048c52630cc3c9519902557f |
| Levels/LVL-0004/level.js | 771a6d3c3b4dd6230a0e37c0fb0aa71d291004ff4d49b7faf933614d8f2fda57 |
| Levels/LVL-0005/level.js | abc4add2acd77eb667445d2585c3b89ae7d18e6b950d0c1168784c26511bd34e |
| Levels/LVL-0006/level.js | ce2691e796878c73bc9049c48f6f14d35ff422e1442129acc88262adead06bd0 |
| Levels/LVL-0007/level.js | ef42b213737390452140239c607a906005cb57b378033d0f4fef0dcb44dab0cb |
| Levels/LVL-0008/level.js | d383218379151e541a4df9d661adb826e0bd86cfd676e955782dfaeb3e69bf35 |
| Levels/LVL-0009/level.js | 0d09f38fe2af5e6f5ac4a9cece035f091d6b117b84ae31ab5986a982138b6346 |
| Levels/LVL-0010/level.js | 7a27b254ce81111b0d9988869a59dee4c986db9f9879029eb4b6eebff1869333 |
| Levels/LVL-0011/level.js | 3ffbfb89c2af84c09517856bc761d9e1c5581306ee3a0a0bbdb5865e2c416315 |
| Levels/LVL-0012/level.js | 586436f59307703bbe9d4df364a519b47a2f85eb6ef0bf560e09d61b4c91f102 |
| Levels/LVL-0013/level.js | 2dd7786db7c10633c5305391e5d9f47b33b6f3307051579b277ed5d5c12fc961 |
| Levels/LVL-0014/level.js | 7481d86c72625823cb8700070f08a9d13981fdc8c49cf27050485315905e7575 |
| Levels/LVL-0015/level.js | 15132e5713571d8720a91c9e5303328e77f4bebb3b62893d156c505d88dc99cd |
| Levels/LVL-0016/level.js | e9041500d7a68e11e10ea6885eff4ed3a8d098f25ef3c72257a0bb436afc1eed |
| Levels/LVL-0017/level.js | dedd189a0bc4a3ee6d246270002a6ea0479590113faf3a404eeb29605e8934ec |
| Levels/LVL-0018/level.js | 80cc15d8a43380d0b396babbf34112763cb20c3bf8ec19cbd554267915b8d4f0 |
| Levels/LVL-0019/level.js | 9fe7eaaa9bc09818ed60cbf984349be9cf10ad4b350c603381f5b59ce7ef46ab |
| Levels/LVL-0020/level.js | 0fdf41bccd50890a09feec51b7408e7c3396bb8da26d56701068ab1b18059c72 |
| Levels/LVL-0021/level.js | dbfeb7f17cac41efa011fb12f10377369bf96c46d7ef66d6586dba81bbc9d36f |
| Levels/LVL-0022/level.js | 8cc08edb081e8f504f89831fc53ce8ffba1cfa767090f4870c58b9928ec712ba |
| Levels/LVL-0023/level.js | 157f15cc024bddf10fa4426737150fa984727768f843c530864e848a33f7faf2 |
| Levels/LVL-0024/level.js | d5288d87bcee87ca8aef13e7207da114d44dcf423509df36a9978d24fccf6ba8 |
| Levels/LVL-0025/level.js | 394ede5073475d8659267ca1449f18a9d2cec8cc6ada57745c493013642f1303 |
| Levels/LVL-0026/level.js | 369e81f3b6342293351c91777703f99a085e0f1843a11379ccb861478b852374 |
| Levels/LVL-0027/level.js | 39101835fe3f27a4ff41ae5e97b04369f863a592663702a19c4e82c090596ad2 |
| Levels/LVL-0028/level.js | 4f591b40b4fc96e1f7aa43a7230a031b0aef72fc851f2959d62b7b6745ee4570 |
| Levels/LVL-0029/level.js | 97931c47d8c457d7fcd3cf9a92169fea8485731c5f60d4651025b3225607aa0c |
| Levels/LVL-0030/level.js | f26c69e0340e443e10d0222ba4e178a2cab5f7fe54fd55d8c2b37672d7af2dc4 |
| Levels/LVL-0031/level.js | f581e864c01be08ee4343aabb27eb21bc9639f360b7481c633a1958738e1aa82 |
| Levels/LVL-0032/level.js | 68a4df8704ac3e5e5e44fd18adcb15b5bd9661acbb3989d4a825da5325edce73 |
| Levels/LVL-0033/level.js | 55b8daa0ef09bb9b7c7ac2d7726866ca882f58b6e59d5fe07ca7950ca3cb96b3 |
| Levels/LVL-0034/level.js | 17c37e4fa3e2b4d8ff8378cc6e05e76d379b805918136a121d734c3b979cdd00 |
| Levels/LVL-0035/level.js | ac058c745fd91ba9ce49111e7144084f1a2bc4de2a84fbca1492cb01ade63dc0 |
| Levels/LVL-0036/level.js | 4261e352e0e4f6c43e46c0b6af8b765b142a67a908cae5ef6840684a4be11728 |
| Levels/LVL-0037/level.js | 401992aa974e20b91b6342d9338a925f4edf4a1bf0171467e427d0868939ee8e |
| Levels/LVL-0038/level.js | 63bf5cc6ec82f8301b536fad540165f73171ea844d2eb9824338c6d12bcd7bf2 |
| Levels/LVL-0039/level.js | 501915460d8a0230fe454acef3a8304c68150d20c23c63c164f62753fb82ab27 |
| Levels/manifest.js | 5c11acf319ae2d0ce7c234fcb202f5bd181532e63cceccaa1619cf9a5045c1c3 |
| Levels/world-config.js | e8f08ce9bf6944f6fa353d9cc6136162e2c4b4519acd92b7a66a6eb2ba5ae46c |
| assets/characters/manifest.js | c46bb6c2845ceb1030ec9f111cc28238a9e80223a1b10fa4b93cecb562a8b1cb |
| output/full-learning-audit-20261009/collect.cjs | 2b24ee3e924d673966f12e09b1f313d6dde498df8a0b53c9293f82074915733d |
| output/full-learning-audit-20261009/export.cjs | def1bf954378ac010aa57dfe2560158de409bd5d4ac707b75123840087733e67 |
| scripts/audit-m6.cjs | a0e5999ad5cf520862f64481735bce669bec6ed01064844070dcd887a32e8dee |
| scripts/level-utils.js | 660ef33d56f1d6ef13829eb1bdadeb37b4e82d6a84b90ffcffd25eaafb7de6e2 |
| scripts/validate-levels.js | 2e3c81aa8dc721b58915236ccf113e25488b0cbf3e238cd53b1aeb03133bba68 |
| src/app.js | ca7d48348cf12aaf0e5f2bda8739334bc57f5b325696d3eb2f8c8fd9beaaa97c |
| src/atlas-world.js | bd94f187bda8a54e1d1fc30e519f7a3e0cf113b455c0a90354dd4709965be171 |
| src/audio-config.js | 2a36f7f0ee5da0a0acb346dfbd7b80b476b249a50d8883e0615f07f2effd4212 |
| src/challenge-capabilities.js | 879adb0c4b1950c41b5554dc8ba2afc5cfba31fe4db82d54ccf0f076ba7b8386 |
| src/challenge-explanation-layouts.js | 51561aa6ec7e275fcdc629d624b2cf9ff015a1b018b6c86248b2b01010a590f3 |
| src/challenge-hints.js | 16e83dddc2d67fab307d93a951e636ae96b335b15100914d1e6fa1f41b82be20 |
| src/challenge-support.js | 80f5fb3f0781fa1ce34d8bd4c70b8cb50317de6b922d7b8744197fcd80127ab2 |
| src/content/m6/addition-subtraction.js | 18102bd282ad27aea53d5b0cb59cae8c56cc28cd4f3b65b74919a021d87faf6a |
| src/content/m6/expansion-20261010.js | 923d54f5e9c1d43756e599414ef184e5ef1823fd7a72da91af50ab55f81e3bb6 |
| src/content/m6/expansion/addition-subtraction.js | 6ccebcd168ce2c618f31842b3c24694c0b0299ba6156e402e62be9c7925d69d0 |
| src/content/m6/expansion/data-patterns.js | 9ef3f1085889280a72c3bdcce55eafc4d69cda2a82eed739d6a14f57644c1f74 |
| src/content/m6/expansion/fractions-ratios.js | fdb00c1b7d09686ceea64a84ff5c1a1a2f16510b9b3f033fbf9c6fad87a8694b |
| src/content/m6/expansion/measurement.js | 8a2d91cf77b1324830a7ff2d85100103e13dca2b92112257073fd872ae62b383 |
| src/content/m6/expansion/money.js | dae1b194ebe189eeaf1a8cb5b58bd2f69816467a22e7e11fe6dedeb9b1ce11bc |
| src/content/m6/expansion/multiplication-division.js | fd73cd58663806708e87fe80a0ea2b217ae3f004cccbdc06f2ae7b519b1e262a |
| src/content/m6/expansion/number-sense.js | 20cdee103c78a0f9ed50618b4e01d11dbda1b21c389a11e422ffc7ae9c395a53 |
| src/content/m6/expansion/time.js | 72e5f22326e7e1cd9518eac464a6ee2a0cfa59894b0319f6e41fe6bfe215bbed |
| src/content/m6/fractions-ratios.js | fefd0af61e7150fc964c4c70f21c08c0e880db21b6abd6ddde4825786c0a0f4f |
| src/content/m6/index.js | d0fec188b6a0ccc96a4f6a28832daaacefd7ab83dc046734f9f9fc82aca1c550 |
| src/content/m6/money.js | c84ac95b3bf240ea4d904b993a4cc08140ca463dd48c6d39094e9fa7250ce729 |
| src/content/m6/time.js | 723271e940c42ee0098a3f1efa387362db7af0ebbdd6816e79e959e93175293e |
| src/learning-levels.js | 5aef69b9f69f0cc1a6cf5b699f60f82338ba21c2a247b0f35ca12278a4e2a4ef |
| src/m6-bank.js | 8248f565f645255fb57ec8ce4da67ca1c07e53f3a2a930f33e7543af05872465 |
| src/playable-characters.js | dc777f99f2989368b34a0cdb5ce2a4780bca905e797262fef15058b86c62fbae |
| tests/frozen-atlas.spec.js | ca511c75780d07dabe12e83ba9c35b7a18099569634dabcad04a01fa12533728 |
| tests/m6-presentation-browser.spec.js | dd9934d431b1d5fa11385945a6a47ddac9c44a59fcbea9ce6e1dbcb45d82fc7c |

### Standalone read-only content re-verifier

This copyable check re-resolves exported teaching text/visuals and narrative without writing any file. Run against the source hashes above; changed source should produce a failed assertion. The original export additionally checked full record/core metadata, scope/counts, all planner percentages, runtime narrative twice and protected-file hashes.

```javascript
// Save outside production source, then run with node from the repository root.
const fs=require('fs'),assert=require('assert/strict'),path=require('path');
const root=process.cwd(),load=p=>require(path.join(root,p));
const levels=load('scripts/level-utils').loadAllLevels();
const hints=load('src/challenge-hints'),learning=load('src/learning-levels');
const doc=fs.readFileSync('Docs/qa/FROZEN_ATLAS_CONTENT_AUDIT.md','utf8');
const fields=[...doc.matchAll(/<!-- frozen-e5:(.+) -->\n\x60\x60\x60json\n([\s\S]*?)\n\x60\x60\x60/g)];
assert.equal(fields.length,96);assert.equal(new Set(fields.map(m=>m[1])).size,96);
for(const m of fields){
 const [levelId,challengeId,slotId,id]=m[1].split('/'),r=JSON.parse(m[2]);
 const l=levels.find(x=>x.entry.id===levelId).level;
 const q=l.learningChallenges.find(c=>c.id===challengeId).questions.find(s=>s.id===slotId).variants.find(q=>q.id===id);
 assert.equal(r.learningLevel,learning.resolveLevel(q));
 assert.equal(r.question,q.prompt);assert.equal(r.family,q.family);
 assert.deepEqual(r.canonicalAnswer,q.answer);assert.equal(r.answerMode,q.answerMode);
 assert.deepEqual(r.authoredChoices,JSON.parse(JSON.stringify(q.choices||null)));
 assert.equal(r.minnie,hints.resolve(levelId,q,'minnie'));
 assert.equal(r.moose,hints.resolve(levelId,q,'moose'));
 assert.equal(r.explanation,hints.resolveExplanation(levelId,q));
 assert.equal(r.assistedCompletionExplanation,r.explanation);
 for(const stage of ['question','minnie','moose','explanation'])assert.deepEqual(r.visuals[stage],JSON.parse(JSON.stringify(hints.resolveClockVisual(levelId,q,stage)||null)));
}
let narrative=0;
for(const m of doc.matchAll(/<!-- frozen-text:([^ ]+) -->\n\x60\x60\x60text\n([\s\S]*?)\n\x60\x60\x60/g)){
 const f=JSON.parse(Buffer.from(m[1],'base64').toString()),l=levels.find(x=>x.entry.id===f.level);
 let value=f.file==='Levels/manifest.js'?l.entry:l.level;
 for(const key of f.path)value=value[key];assert.equal(m[2],value);narrative++;
}
assert.equal(narrative,296);
console.log('PASS: 96 E5 records and 296 exact authored narrative fields match current production resolution.');
```

Final runtime narrative re-resolution: **PASS** — a second independent browser load matched every captured intro, reward-label and contextual-event block exactly; 8 Frozen E5/M6 staged-help/reopen probes passed again.
