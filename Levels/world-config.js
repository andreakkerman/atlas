window.SVEN_WORLD_CONFIG = {
  "version": 1,
  "worlds": {
    "LVL-0013": {
      "order": [],
      "enabled": {
        "LVL-0018": false,
        "LVL-0020": false,
        "LVL-0015": false
      }
    },
    "LVL-0008": {
      "order": [],
      "enabled": {
        "LVL-0012": false
      }
    },
    "LVL-0021": {
      "order": [],
      "enabled": {
        "LVL-0022": false,
        "LVL-0025": false
      }
    }
  },
  "levels": {
    "LVL-0000": {
      "spriteScale": 1.2,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.03,
          "contrast": 1.06,
          "highlights": -0.12,
          "shadows": 0.04,
          "saturation": 1.04,
          "warmth": 0.01,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 351,
              "y": 433,
              "color": "#ffb85f",
              "radius": 135,
              "intensity": 0.7,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2.1,
              "randomness": 0.82,
              "colorSpill": 0.66,
              "characterInfluence": 0.85,
              "atmosphereInfluence": 1,
              "depth": 0.72,
              "depthInfluence": 1,
              "depthSoftness": 0.13,
              "depthBias": 0.05,
              "id": "lab-left-brazier",
              "layer": "effects",
              "name": "lab-left-brazier"
            },
            {
              "enabled": true,
              "x": 1241,
              "y": 351,
              "color": "#ff9d43",
              "radius": 190,
              "intensity": 1.15,
              "falloff": 1.5,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.2,
              "flickerSpeed": 2.2,
              "randomness": 0.84,
              "colorSpill": 0.72,
              "characterInfluence": 1.2,
              "atmosphereInfluence": 1.05,
              "depth": 0.75,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.04,
              "id": "lab-cave-left",
              "layer": "effects",
              "name": "lab-cave-left"
            },
            {
              "enabled": true,
              "x": 1342,
              "y": 350,
              "color": "#ffaf52",
              "radius": 175,
              "intensity": 1.05,
              "falloff": 1.5,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.22,
              "flickerSpeed": 2.35,
              "randomness": 0.86,
              "colorSpill": 0.7,
              "characterInfluence": 1.15,
              "atmosphereInfluence": 1.05,
              "depth": 0.75,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.04,
              "id": "lab-cave-right",
              "layer": "effects",
              "name": "lab-cave-right"
            },
            {
              "enabled": true,
              "x": 1918,
              "y": 464,
              "color": "#ffc06b",
              "radius": 170,
              "intensity": 0.95,
              "falloff": 1.5,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.2,
              "flickerSpeed": 2.15,
              "randomness": 0.84,
              "colorSpill": 0.68,
              "characterInfluence": 1.1,
              "atmosphereInfluence": 1,
              "depth": 0.74,
              "depthInfluence": 1,
              "depthSoftness": 0.13,
              "depthBias": 0.05,
              "id": "lab-night-brazier",
              "layer": "effects",
              "name": "lab-night-brazier"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 390,
              "y": 175,
              "color": "#ffe1a4",
              "shape": "ellipse",
              "width": 980,
              "height": 850,
              "softness": 0.82,
              "direction": 57,
              "intensity": 0.42,
              "falloff": 1.3,
              "depth": 0.5,
              "depthInfluence": 0.76,
              "depthSoftness": 0.18,
              "id": "lab-daylight",
              "layer": "globalLighting",
              "name": "lab-daylight"
            },
            {
              "enabled": true,
              "x": 1785,
              "y": 200,
              "color": "#8ebcff",
              "shape": "ellipse",
              "width": 900,
              "height": 800,
              "softness": 0.84,
              "direction": 118,
              "intensity": 0.32,
              "falloff": 1.35,
              "depth": 0.55,
              "depthInfluence": 0.78,
              "depthSoftness": 0.18,
              "id": "lab-moonlight",
              "layer": "globalLighting",
              "name": "lab-moonlight"
            }
          ]
        },
        "shafts": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1004,
              "y": 138,
              "color": "#d8ebf2",
              "direction": 90,
              "length": 505,
              "width": 155,
              "intensity": 0.16,
              "softness": 0.8,
              "density": 0.48,
              "decay": 1.35,
              "noiseAmount": 0.3,
              "noiseScale": 1.25,
              "noiseSpeed": 0.08,
              "depth": 0.62,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "atmosphereInfluence": 1.1,
              "layer": "effects",
              "id": "lab-waterfall-shaft",
              "name": "lab-waterfall-shaft"
            }
          ]
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1010,
              "y": 356,
              "color": "#c6e5e7",
              "shape": "ellipse",
              "width": 560,
              "height": 285,
              "softness": 0.84,
              "direction": 0,
              "density": 0.105,
              "scale": 1.05,
              "driftSpeed": 5,
              "driftDirection": 4,
              "turbulence": 0.32,
              "noiseScale": 1.35,
              "noiseDetail": 4,
              "depthInfluence": 0.9,
              "nearClear": 0.92,
              "farDensity": 1.35,
              "depthCurve": 1.35,
              "floorBias": -0.05,
              "depthBias": 0.04,
              "id": "lab-waterfall-mist",
              "layer": "environment",
              "name": "lab-waterfall-mist"
            },
            {
              "enabled": true,
              "x": 1740,
              "y": 360,
              "color": "#7395c9",
              "shape": "ellipse",
              "width": 850,
              "height": 340,
              "softness": 0.86,
              "direction": 0,
              "density": 0.06,
              "scale": 1.12,
              "driftSpeed": 3,
              "driftDirection": -4,
              "turbulence": 0.22,
              "noiseScale": 1.4,
              "noiseDetail": 4,
              "depthInfluence": 0.86,
              "nearClear": 0.94,
              "farDensity": 1.25,
              "depthCurve": 1.4,
              "floorBias": -0.18,
              "depthBias": 0.04,
              "id": "lab-night-haze",
              "layer": "environment",
              "name": "lab-night-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.22,
          "threshold": 0.86,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.5
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1069,
              "y": 233,
              "color": "#e2f3f4",
              "shape": "rectangle",
              "width": 242,
              "height": 105,
              "softness": 0.72,
              "direction": 89,
              "count": 260,
              "size": 0.9,
              "sizeVariation": 0.7,
              "speed": 7,
              "turbulence": 0.9,
              "lifetime": 15,
              "opacity": 0.18,
              "glow": 0.08,
              "gravity": -0.08,
              "randomness": 0.86,
              "depth": 0.7,
              "depthInfluence": 0.9,
              "depthSoftness": 0.13,
              "layer": "environment",
              "wind": 5,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.42,
              "distribution": "volume",
              "id": "lab-waterfall-air-mist",
              "name": "lab-waterfall-air-mist"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 111,
          "shadowLightSourceY": 91,
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
          "localInfluence": 0.72,
          "colorSpill": 0.65,
          "intensityResponse": 0.6,
          "directionalInfluence": 0.74,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.16,
          "grounding": 0.12,
          "sideLighting": 0.68,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.11,
          "radius": 2.2,
          "colorInfluence": 0.68
        },
        "rim": {
          "enabled": true,
          "strength": 0.1,
          "width": 1.6,
          "colorResponse": 0.72,
          "localInfluence": 0.78,
          "ambientInfluence": 0.12
        },
        "autoExposure": {
          "enabled": false,
          "minExposure": -0.5,
          "maxExposure": 0.5,
          "adaptationSpeed": 0.25,
          "strength": 0.4
        },
        "finishing": {
          "enabled": true,
          "intensity": 0.07,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 104,
              "y": 82,
              "color": "#ffe4a8",
              "direction": 60,
              "spread": 62,
              "rayCount": 8,
              "rayWidth": 0.4,
              "widthVariation": 0.58,
              "spacingVariation": 0.48,
              "rayMotion": 0,
              "motionSpeed": 0.12,
              "fadeVariation": 0.2,
              "length": 1050,
              "intensity": 0.38,
              "softness": 0.74,
              "feather": 0.44,
              "decay": 1.05,
              "breakup": 0.45,
              "noiseScale": 1.2,
              "noiseAmount": 0.34,
              "noiseSpeed": 0.08,
              "atmosphereInfluence": 1.12,
              "depth": 0.45,
              "depthInfluence": 0.82,
              "depthSoftness": 0.18,
              "id": "lab-sun-rays",
              "layer": "globalLighting",
              "name": "lab-sun-rays"
            }
          ]
        },
        "waterSurface": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 928,
              "y": 402,
              "color": "#d8fff0",
              "shape": "polygon",
              "width": 510,
              "height": 205,
              "softness": 0.14,
              "direction": -4,
              "shimmerStrength": 2.35,
              "shimmerCoverage": 1,
              "sparkleSize": 11,
              "anisotropy": 7,
              "shimmerSoftness": 0.07,
              "evolutionSpeed": 1,
              "highlightContrast": 3.4,
              "shimmerDirection": -1,
              "depth": 0.87,
              "depthOcclusion": 1,
              "depthSoftness": 0.018,
              "id": "lab-water-shallows",
              "layer": "environment",
              "name": "Bright turquoise shallows",
              "points": [
                {
                  "x": -0.5656986568927178,
                  "y": -0.2772613023382868
                },
                {
                  "x": -0.162366993790093,
                  "y": -0.29876749576334427
                },
                {
                  "x": 1,
                  "y": 0.07989875547790967
                },
                {
                  "x": 1,
                  "y": 0.7148549616211644
                },
                {
                  "x": 0.31021275152028327,
                  "y": 0.7800088734898445
                },
                {
                  "x": -0.8238369577572484,
                  "y": -0.027490341062497824
                }
              ]
            },
            {
              "enabled": true,
              "x": 1565,
              "y": 395,
              "color": "#a9d8ff",
              "shape": "polygon",
              "width": 690,
              "height": 224,
              "softness": 0.13,
              "direction": -3,
              "shimmerStrength": 2.4,
              "shimmerCoverage": 0.56,
              "sparkleSize": 10,
              "anisotropy": 7.8,
              "shimmerSoftness": 0.06,
              "evolutionSpeed": 0.75,
              "highlightContrast": 3.5,
              "shimmerDirection": -3,
              "depth": 0.9,
              "depthOcclusion": 1,
              "depthSoftness": 0.028,
              "id": "lab-water-night",
              "layer": "environment",
              "name": "Dark moonlit water",
              "points": [
                {
                  "x": -0.010403553699026718,
                  "y": 0.052537170700424594
                },
                {
                  "x": 0.06781862473356476,
                  "y": 0.04775773034507835
                },
                {
                  "x": 0.24912969929582843,
                  "y": -0.030042617464019566
                },
                {
                  "x": 0.40332309340011485,
                  "y": -0.08323870116097723
                },
                {
                  "x": 0.3941628821475901,
                  "y": 0.06966839538655119
                },
                {
                  "x": 0.3005806374080965,
                  "y": 0.2014344304997788
                },
                {
                  "x": 0.19447692813824927,
                  "y": 0.2098116126241573
                }
              ]
            }
          ]
        },
        "waterSparkles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1053,
              "y": 398,
              "color": "#f4fff8",
              "shape": "polygon",
              "width": 800,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "sparkleStrength": 0.65,
              "sparkleDensity": 0.45,
              "sparkleSize": 0.5,
              "sizeVariation": 0.72,
              "twinkleSpeed": 0.55,
              "twinkleVariation": 0.82,
              "clusterScale": 140,
              "clusterAmount": 0.68,
              "peakIntensity": 1.8,
              "anisotropy": 1.55,
              "artworkInfluence": 0.65,
              "depth": 0.88,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSparkles-mtln2gor",
              "layer": "environment",
              "name": "waterSparkles-mtln2gor",
              "points": [
                {
                  "x": -0.30574216425418854,
                  "y": -0.13227061858724481
                },
                {
                  "x": 0.49773522743631476,
                  "y": -0.023283588886260986
                },
                {
                  "x": 0.3291617207820309,
                  "y": 0.3688661468927967
                },
                {
                  "x": -0.6848497354759547,
                  "y": 0.09792628875326045
                }
              ]
            }
          ]
        },
        "gameplayCues": {
          "enabled": true,
          "intensity": 0,
          "characterInfluence": 0
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0001": {
      "spriteScale": 1.2,
      "emissiveGlow": {
        "enabled": true,
        "intensity": 0.69,
        "radius": 8,
        "sensitivity": 0.5
      },
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0,
          "contrast": 1.045,
          "highlights": 0,
          "shadows": 0,
          "saturation": 1.06,
          "warmth": 0,
          "tint": 0,
          "blackPoint": 0
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 273,
              "y": 468,
              "color": "#5ed9d4",
              "radius": 270,
              "intensity": 2.62,
              "falloff": 1.2,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.16,
              "flickerSpeed": 0.8,
              "randomness": 0.8,
              "colorSpill": 1,
              "characterInfluence": 1.6,
              "atmosphereInfluence": 1.14,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "rune-spill",
              "layer": "effects",
              "name": "rune-spill"
            },
            {
              "enabled": true,
              "x": 182,
              "y": 208,
              "color": "#ffdda0",
              "radius": 490,
              "intensity": 1.33,
              "falloff": 1.4,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.6,
              "characterInfluence": 1,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "canopy-sun",
              "layer": "effects",
              "name": "canopy-sun"
            },
            {
              "enabled": true,
              "x": 1466,
              "y": 319,
              "color": "#44eeea",
              "radius": 44,
              "intensity": 4,
              "falloff": 2,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "slowPulse",
              "flickerAmount": 0.43,
              "flickerSpeed": 4.28,
              "randomness": 0.8,
              "colorSpill": 0.6,
              "characterInfluence": 1,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "localLights-mtdbrkol",
              "layer": "effects",
              "name": "localLights-mtdbrkol"
            },
            {
              "enabled": true,
              "x": 1385,
              "y": 155,
              "color": "#ffe3bc",
              "radius": 56,
              "intensity": 4,
              "falloff": 2,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "slowPulse",
              "flickerAmount": 0.43,
              "flickerSpeed": 4.99,
              "randomness": 0.8,
              "colorSpill": 0.6,
              "characterInfluence": 1,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "localLights-mtdbsuwm",
              "layer": "effects",
              "name": "localLights-mtdbsuwm"
            },
            {
              "enabled": true,
              "x": 1849,
              "y": 355,
              "color": "#60e5d8",
              "radius": 155,
              "intensity": 1.7,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "steady",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "gate-carved-rune",
              "layer": "effects",
              "name": "gate-carved-rune"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1100,
              "y": 410,
              "color": "#d6ddb0",
              "shape": "ellipse",
              "width": 1950,
              "height": 650,
              "softness": 0.9,
              "direction": 0,
              "intensity": 0.42,
              "falloff": 1.5,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "id": "forest-bounce",
              "layer": "globalLighting",
              "name": "forest-bounce"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": [
            {
              "enabled": true,
              "x": 115,
              "y": 25,
              "color": "#ffd57d",
              "direction": 49,
              "length": 1110,
              "width": 205,
              "intensity": 1.85,
              "softness": 0.65,
              "density": 1.35,
              "decay": 0.85,
              "noiseAmount": 0.55,
              "noiseScale": 0.8,
              "noiseSpeed": 0.1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "atmosphereInfluence": 1,
              "layer": "globalLighting",
              "id": "canopy-shaft",
              "name": "canopy-shaft"
            },
            {
              "enabled": true,
              "x": 425,
              "y": 0,
              "color": "#ffe1b2",
              "direction": 64,
              "length": 1040,
              "width": 125,
              "intensity": 1.6,
              "softness": 0.7,
              "density": 1.25,
              "decay": 0.9,
              "noiseAmount": 0.55,
              "noiseScale": 1,
              "noiseSpeed": 0.06,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "atmosphereInfluence": 1,
              "layer": "globalLighting",
              "id": "path-shaft",
              "name": "path-shaft"
            }
          ]
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 809,
              "y": 539,
              "color": "#bfc599",
              "shape": "ellipse",
              "width": 766,
              "height": 144,
              "softness": 0.61,
              "direction": 1,
              "density": 0.52,
              "scale": 1.2,
              "driftSpeed": 34.33,
              "driftDirection": 0,
              "turbulence": 0.4,
              "noiseScale": 1.2,
              "noiseDetail": 3,
              "depthInfluence": 1,
              "nearClear": 0.88,
              "farDensity": 1.4,
              "depthCurve": 1.3,
              "floorBias": 0,
              "depthBias": 0.06,
              "id": "forest-ground-haze",
              "layer": "environment",
              "name": "forest-ground-haze"
            },
            {
              "enabled": true,
              "x": 1105,
              "y": 398,
              "color": "#a6b9c2",
              "shape": "ellipse",
              "width": 800,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "density": 0.2,
              "scale": 1,
              "driftSpeed": 10,
              "driftDirection": 0,
              "turbulence": 0.4,
              "noiseScale": 1,
              "noiseDetail": 4,
              "depthInfluence": 1,
              "nearClear": 0.88,
              "farDensity": 1.4,
              "depthCurve": 1.3,
              "floorBias": 0,
              "depthBias": 0.06,
              "id": "atmosphere-mtetpy6q",
              "layer": "environment",
              "name": "atmosphere-mtetpy6q"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.3,
          "threshold": 0.95,
          "softKnee": 0.2,
          "radius": 5,
          "falloff": 1.5,
          "colorInfluence": 0.8,
          "localContribution": 0.15
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 460,
              "y": 360,
              "color": "#ffe6a2",
              "shape": "ellipse",
              "width": 2620,
              "height": 1164,
              "softness": 0.6,
              "direction": -10,
              "count": 900,
              "size": 2.36,
              "sizeVariation": 0.6,
              "speed": 8,
              "turbulence": 0.8,
              "lifetime": 24,
              "opacity": 0.5,
              "glow": 0.25,
              "gravity": -0.08,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "canopy-dust",
              "name": "canopy-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 161,
          "shadowLightSourceY": 202,
          "shadowShape": "silhouette",
          "shadowGroundlineOffset": 0,
          "shadowStrength": 5,
          "shadowOpacity": 84,
          "shadowSoftness": 4.05,
          "shadowWidth": 0.69,
          "shadowLength": 0.75,
          "shadowScale": 1.2,
          "shadowOffsetX": -1,
          "shadowOffsetY": -6,
          "shadowDirection": 0,
          "shadowGlobalLightInfluence": 1,
          "shadowLocalLightInfluence": 2,
          "shadowDirectionSmoothing": 0.08,
          "shadowDarkBackgroundSuppression": 1,
          "shadowAtmosphereSuppression": 1,
          "ambientInfluence": 0.2,
          "localInfluence": 1.35,
          "colorSpill": 0.9,
          "intensityResponse": 1.05,
          "directionalInfluence": 0.7,
          "atmosphereInfluence": 0.65,
          "depthTint": 0.18,
          "grounding": 0.12,
          "sideLighting": 0.7,
          "frontAtmosphere": 0.45
        },
        "wrap": {
          "enabled": true,
          "strength": 0.12,
          "radius": 1.5,
          "colorInfluence": 0.79
        },
        "rim": {
          "enabled": true,
          "strength": 0.12,
          "width": 1.25,
          "colorResponse": 0.8,
          "localInfluence": 0.8,
          "ambientInfluence": 0.06
        },
        "autoExposure": {
          "enabled": false,
          "minExposure": -0.53,
          "maxExposure": 0.99,
          "adaptationSpeed": 0.25,
          "strength": 0.4
        },
        "finishing": {
          "enabled": true,
          "intensity": 0.13,
          "softness": 0.85,
          "finalExposure": 0,
          "finalContrast": 1
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 161,
              "y": 202,
              "color": "#ffe3bc",
              "direction": 48,
              "spread": 126,
              "rayCount": 5,
              "rayWidth": 0.36,
              "widthVariation": 0.16,
              "spacingVariation": 0.5,
              "rayMotion": 0.33,
              "motionSpeed": 0.65,
              "fadeVariation": 0.72,
              "length": 1250,
              "intensity": 1.5,
              "softness": 0.65,
              "feather": 0.35,
              "decay": 0.8,
              "breakup": 0.55,
              "noiseScale": 1,
              "noiseAmount": 0.72,
              "noiseSpeed": 1.62,
              "atmosphereInfluence": 1.2,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "id": "godRays-mte4gvon",
              "layer": "globalLighting",
              "name": "godRays-mte4gvon"
            }
          ]
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
      }
    },
    "LVL-0002": {
      "spriteScale": 1.25,
      "emissiveGlow": {
        "enabled": true,
        "intensity": 0.77,
        "radius": 8,
        "sensitivity": 0.5
      },
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.04,
          "contrast": 1.06,
          "highlights": -0.05,
          "shadows": 0,
          "saturation": 1.08,
          "warmth": 0.1,
          "tint": 0,
          "blackPoint": 0
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 350,
              "y": 350,
              "color": "#ff983b",
              "radius": 304,
              "intensity": 2.4,
              "falloff": 0.9,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.16,
              "flickerSpeed": 1.4,
              "randomness": 0.8,
              "colorSpill": 0.8,
              "characterInfluence": 1.6,
              "atmosphereInfluence": 1.5,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "left-brazier",
              "layer": "effects",
              "name": "left-brazier"
            },
            {
              "enabled": true,
              "x": 1090,
              "y": 380,
              "color": "#ffc36a",
              "radius": 330,
              "intensity": 1.8,
              "falloff": 0.9,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.12,
              "flickerSpeed": 1.1,
              "randomness": 0.8,
              "colorSpill": 0.8,
              "characterInfluence": 1.6,
              "atmosphereInfluence": 1.5,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "altar-fire",
              "layer": "effects",
              "name": "altar-fire"
            },
            {
              "enabled": true,
              "x": 1810,
              "y": 350,
              "color": "#ff983b",
              "radius": 330,
              "intensity": 2.4,
              "falloff": 0.9,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.15,
              "flickerSpeed": 1.6,
              "randomness": 0.8,
              "colorSpill": 0.8,
              "characterInfluence": 1.6,
              "atmosphereInfluence": 1.5,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "right-brazier",
              "layer": "effects",
              "name": "right-brazier"
            },
            {
              "enabled": true,
              "x": 70,
              "y": 357,
              "color": "#ffab50",
              "radius": 250,
              "intensity": 2,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "entry-wall-torch",
              "layer": "effects",
              "name": "entry-wall-torch"
            },
            {
              "enabled": true,
              "x": 1571,
              "y": 340,
              "color": "#ffab50",
              "radius": 190,
              "intensity": 2,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "rear-wall-torch",
              "layer": "effects",
              "name": "rear-wall-torch"
            },
            {
              "enabled": true,
              "x": 2100,
              "y": 365,
              "color": "#ffab50",
              "radius": 270,
              "intensity": 2,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "exit-wall-torch",
              "layer": "effects",
              "name": "exit-wall-torch"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1090,
              "y": 280,
              "color": "#b57840",
              "shape": "ellipse",
              "width": 1920,
              "height": 530,
              "softness": 0.85,
              "direction": 0,
              "intensity": 0.28,
              "falloff": 1.5,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "id": "cool-roof-bounce",
              "layer": "globalLighting",
              "name": "cool-roof-bounce"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1100,
              "y": 330,
              "color": "#a96b36",
              "shape": "ellipse",
              "width": 2200,
              "height": 720,
              "softness": 0.65,
              "direction": 0,
              "density": 0.52,
              "scale": 1.2,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.5,
              "noiseScale": 1,
              "noiseDetail": 4,
              "depthInfluence": 1,
              "nearClear": 0.88,
              "farDensity": 1.4,
              "depthCurve": 1.3,
              "floorBias": 0,
              "depthBias": 0.06,
              "id": "temple-haze",
              "layer": "environment",
              "name": "temple-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.35,
          "threshold": 0.85,
          "softKnee": 0.15,
          "radius": 6,
          "falloff": 1.5,
          "colorInfluence": 0.8,
          "localContribution": 0.2
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 358,
              "y": 337,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 120,
              "height": 82,
              "softness": 0.6,
              "direction": -90,
              "count": 100,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "brazier-embers",
              "name": "brazier-embers"
            },
            {
              "enabled": true,
              "x": 63,
              "y": 339,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 120,
              "height": 82,
              "softness": 0.6,
              "direction": -90,
              "count": 100,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-a8929fb0-3831-4077-bea3-9e2e7e75e7c6",
              "name": "particles-a8929fb0-3831-4077-bea3-9e2e7e75e7c6"
            },
            {
              "enabled": true,
              "x": 1092,
              "y": 330,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 170,
              "height": 122,
              "softness": 0.6,
              "direction": -90,
              "count": 100,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-962ab503-da3e-4bfd-870c-44502f2b6281",
              "name": "particles-962ab503-da3e-4bfd-870c-44502f2b6281"
            },
            {
              "enabled": true,
              "x": 606,
              "y": 324,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 76,
              "height": 43,
              "softness": 0.6,
              "direction": -90,
              "count": 100,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-232dc7eb-1d23-4d9a-93a7-b84a68886a5f",
              "name": "particles-232dc7eb-1d23-4d9a-93a7-b84a68886a5f"
            },
            {
              "enabled": true,
              "x": 1572,
              "y": 325,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 76,
              "height": 43,
              "softness": 0.6,
              "direction": -90,
              "count": 100,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-72c61f27-cc0a-43ca-89af-76c50973846e",
              "name": "particles-232dc7eb-1d23-4d9a-93a7-b84a68886a5f copy"
            },
            {
              "enabled": true,
              "x": 1812,
              "y": 337,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 76,
              "height": 43,
              "softness": 0.6,
              "direction": -90,
              "count": 100,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-bb05775a-4f3a-4658-a275-63f1971a832b",
              "name": "particles-232dc7eb-1d23-4d9a-93a7-b84a68886a5f copy copy"
            },
            {
              "enabled": true,
              "x": 2101,
              "y": 363,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 76,
              "height": 43,
              "softness": 0.6,
              "direction": -90,
              "count": 100,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-35d09ac9-543f-4b49-88d3-cec507bd1d55",
              "name": "particles-232dc7eb-1d23-4d9a-93a7-b84a68886a5f copy copy copy"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1094,
          "shadowLightSourceY": 373,
          "shadowShape": "silhouette",
          "shadowGroundlineOffset": 0,
          "shadowStrength": 5,
          "shadowOpacity": 100,
          "shadowSoftness": 0.78,
          "shadowWidth": 1,
          "shadowLength": 1,
          "shadowScale": 1.2,
          "shadowOffsetX": 0,
          "shadowOffsetY": 0,
          "shadowDirection": -10,
          "shadowGlobalLightInfluence": 1,
          "shadowLocalLightInfluence": 2,
          "shadowDirectionSmoothing": 0.08,
          "shadowDarkBackgroundSuppression": 0.9,
          "shadowAtmosphereSuppression": 1,
          "ambientInfluence": 0.18,
          "localInfluence": 1.35,
          "colorSpill": 0.9,
          "intensityResponse": 1.05,
          "directionalInfluence": 0.7,
          "atmosphereInfluence": 0.65,
          "depthTint": 0.18,
          "grounding": 0.12,
          "sideLighting": 0.7,
          "frontAtmosphere": 0.45
        },
        "wrap": {
          "enabled": true,
          "strength": 0.065,
          "radius": 1.5,
          "colorInfluence": 0.7
        },
        "rim": {
          "enabled": true,
          "strength": 0.05,
          "width": 1,
          "colorResponse": 0.8,
          "localInfluence": 0.8,
          "ambientInfluence": 0.03
        },
        "autoExposure": {
          "enabled": false,
          "minExposure": -0.5,
          "maxExposure": 0.5,
          "adaptationSpeed": 0.25,
          "strength": 0.4
        },
        "finishing": {
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.85,
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
          "intensity": 0.21,
          "characterInfluence": 1
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0
        }
      }
    },
    "LVL-0003": {
      "spriteScale": 1.4,
      "emissiveGlow": {
        "enabled": true,
        "intensity": 0.74,
        "radius": 8,
        "sensitivity": 0.5
      },
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.03,
          "contrast": 1.04,
          "highlights": 0,
          "shadows": 0,
          "saturation": 1.08,
          "warmth": -0.12,
          "tint": 0,
          "blackPoint": 0
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 71,
              "y": 335,
              "color": "#ff9b3d",
              "radius": 350,
              "intensity": 2.6,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.16,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.85,
              "characterInfluence": 1.1,
              "atmosphereInfluence": 1.4,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "harbor-torch-1",
              "layer": "effects",
              "name": "harbor-torch-1"
            },
            {
              "enabled": true,
              "x": 338,
              "y": 335,
              "color": "#ff9b3d",
              "radius": 350,
              "intensity": 2.6,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.16,
              "flickerSpeed": 2.13,
              "randomness": 0.8,
              "colorSpill": 0.85,
              "characterInfluence": 1.1,
              "atmosphereInfluence": 1.4,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "harbor-torch-2",
              "layer": "effects",
              "name": "harbor-torch-2"
            },
            {
              "enabled": true,
              "x": 1909,
              "y": 335,
              "color": "#ff9b3d",
              "radius": 350,
              "intensity": 2.6,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.16,
              "flickerSpeed": 2.26,
              "randomness": 0.8,
              "colorSpill": 0.85,
              "characterInfluence": 1.1,
              "atmosphereInfluence": 1.4,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "harbor-torch-3",
              "layer": "effects",
              "name": "harbor-torch-3"
            },
            {
              "enabled": true,
              "x": 2133,
              "y": 335,
              "color": "#ff9b3d",
              "radius": 350,
              "intensity": 2.6,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.16,
              "flickerSpeed": 2.39,
              "randomness": 0.8,
              "colorSpill": 0.85,
              "characterInfluence": 1.1,
              "atmosphereInfluence": 1.4,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "harbor-torch-4",
              "layer": "effects",
              "name": "harbor-torch-4"
            },
            {
              "enabled": true,
              "x": 874,
              "y": 360,
              "color": "#40c9ff",
              "radius": 180,
              "intensity": 1.8,
              "falloff": 2,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "slowPulse",
              "flickerAmount": 0.12,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.6,
              "characterInfluence": 1,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "compass-spill",
              "layer": "effects",
              "name": "compass-spill"
            },
            {
              "enabled": true,
              "x": 407,
              "y": 420,
              "color": "#ffab50",
              "radius": 225,
              "intensity": 2,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "dock-lantern",
              "layer": "effects",
              "name": "dock-lantern"
            },
            {
              "enabled": true,
              "x": 1360,
              "y": 443,
              "color": "#ffab50",
              "radius": 180,
              "intensity": 2,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "fire",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "far-lantern",
              "layer": "effects",
              "name": "far-lantern"
            },
            {
              "enabled": true,
              "x": 692,
              "y": 383,
              "color": "#57dfd5",
              "radius": 90,
              "intensity": 1.5,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "steady",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "rope-rune",
              "layer": "effects",
              "name": "rope-rune"
            },
            {
              "enabled": true,
              "x": 1757,
              "y": 397,
              "color": "#57dfd5",
              "radius": 85,
              "intensity": 1.5,
              "falloff": 1.1,
              "aspect": 1,
              "softness": 0.7,
              "behavior": "steady",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "gate-rune",
              "layer": "effects",
              "name": "gate-rune"
            },
            {
              "enabled": true,
              "x": 1824,
              "y": 383,
              "color": "#57dfd5",
              "radius": 105,
              "intensity": 1.4,
              "falloff": 1.1,
              "aspect": 0.35,
              "softness": 0.7,
              "behavior": "steady",
              "flickerAmount": 0.15,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.95,
              "characterInfluence": 1.5,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "door-runes",
              "layer": "effects",
              "name": "door-runes"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1140,
              "y": 360,
              "color": "#77a9ff",
              "shape": "ellipse",
              "width": 3100,
              "height": 1800,
              "softness": 0.6,
              "direction": 65,
              "intensity": 0.9,
              "falloff": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "id": "harbor-moonlight",
              "layer": "globalLighting",
              "name": "harbor-moonlight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": [
            {
              "enabled": true,
              "x": 1220,
              "y": -80,
              "color": "#85b6ee",
              "direction": 106,
              "length": 870,
              "width": 245,
              "intensity": 0.85,
              "softness": 0.9,
              "density": 0.85,
              "decay": 1.2,
              "noiseAmount": 0.6,
              "noiseScale": 1,
              "noiseSpeed": 0.06,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "atmosphereInfluence": 1,
              "layer": "globalLighting",
              "id": "moon-break",
              "name": "moon-break"
            }
          ]
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1105,
              "y": 431,
              "color": "#658ba4",
              "shape": "ellipse",
              "width": 2550,
              "height": 850,
              "softness": 0.75,
              "direction": 0,
              "density": 0.75,
              "scale": 1,
              "driftSpeed": 10,
              "driftDirection": 0,
              "turbulence": 0.45,
              "noiseScale": 1.2,
              "noiseDetail": 4,
              "depthInfluence": 1,
              "nearClear": 0.88,
              "farDensity": 1.4,
              "depthCurve": 1.3,
              "floorBias": 0,
              "depthBias": 0.06,
              "id": "harbor-mist",
              "layer": "environment",
              "name": "harbor-mist"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.3,
          "threshold": 0.9,
          "softKnee": 0.2,
          "radius": 5,
          "falloff": 1.5,
          "colorInfluence": 0.8,
          "localContribution": 0.3
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 337,
              "y": 308,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 137,
              "height": 79,
              "softness": 0.6,
              "direction": -90,
              "count": 140,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "harbor-embers",
              "name": "harbor-embers"
            },
            {
              "enabled": true,
              "x": 71,
              "y": 305,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 137,
              "height": 79,
              "softness": 0.6,
              "direction": -90,
              "count": 140,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-167b223c-a15c-467b-afba-93f17ab57747",
              "name": "harbor-embers copy"
            },
            {
              "enabled": true,
              "x": 2131,
              "y": 298,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 117,
              "height": 49,
              "softness": 0.6,
              "direction": -90,
              "count": 140,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-f98bb590-a27d-427c-af6c-bdb7b2a3e79d",
              "name": "harbor-embers copy 2"
            },
            {
              "enabled": true,
              "x": 1908,
              "y": 310,
              "color": "#ff8331",
              "shape": "ellipse",
              "width": 140,
              "height": 56,
              "softness": 0.6,
              "direction": -90,
              "count": 140,
              "size": 1.05,
              "sizeVariation": 0.95,
              "speed": 40,
              "turbulence": 1.2,
              "lifetime": 5,
              "opacity": 0.65,
              "glow": 1.6,
              "gravity": -1.5,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "environment",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-eb74d083-74b5-4982-8fca-3e84819ff125",
              "name": "harbor-embers copy 3"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1173,
          "shadowLightSourceY": 4,
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
          "ambientInfluence": 0.2,
          "localInfluence": 1.35,
          "colorSpill": 0.9,
          "intensityResponse": 1.05,
          "directionalInfluence": 0.7,
          "atmosphereInfluence": 0.65,
          "depthTint": 0.18,
          "grounding": 0.12,
          "sideLighting": 0.7,
          "frontAtmosphere": 0.45
        },
        "wrap": {
          "enabled": true,
          "strength": 0.1,
          "radius": 1.7,
          "colorInfluence": 0.7
        },
        "rim": {
          "enabled": true,
          "strength": 0.09,
          "width": 1.3,
          "colorResponse": 0.8,
          "localInfluence": 0.8,
          "ambientInfluence": 0.05
        },
        "autoExposure": {
          "enabled": false,
          "minExposure": -0.5,
          "maxExposure": 0.5,
          "adaptationSpeed": 0.25,
          "strength": 0.4
        },
        "finishing": {
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.85,
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
      }
    },
    "LVL-0004": {
      "spriteScale": 1.4,
      "emissiveGlow": {
        "enabled": true,
        "intensity": 0.7,
        "radius": 8,
        "sensitivity": 0.5
      },
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.02,
          "contrast": 1.05,
          "highlights": -0.1,
          "shadows": 0.03,
          "saturation": 1.02,
          "warmth": 0.05,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 137,
              "y": 292,
              "color": "#ffc477",
              "radius": 72,
              "intensity": 2.48,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "left-lantern",
              "layer": "effects",
              "name": "left-lantern"
            },
            {
              "enabled": true,
              "x": 1794,
              "y": 368,
              "color": "#ffc477",
              "radius": 145,
              "intensity": 0.9,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "right-lantern",
              "layer": "effects",
              "name": "right-lantern"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 498,
              "y": 115,
              "color": "#ffe0a0",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 48,
              "intensity": 0.62,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "tropical-sunlight",
              "layer": "globalLighting",
              "name": "tropical-sunlight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1080,
              "y": 320,
              "color": "#9ec9c2",
              "shape": "ellipse",
              "width": 1150,
              "height": 420,
              "softness": 0.82,
              "direction": 0,
              "density": 0.05,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.3,
              "farDensity": 0,
              "depthCurve": 1.44,
              "floorBias": 1,
              "depthBias": -0.4,
              "id": "lagoon-haze",
              "layer": "environment",
              "name": "lagoon-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.24,
          "threshold": 0.9,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 320,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1900,
              "height": 470,
              "softness": 0.6,
              "direction": -15,
              "count": 180,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.25,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "tropical-pollen",
              "name": "tropical-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 460,
          "shadowLightSourceY": 96,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 498,
              "y": 115,
              "color": "#ffe3a4",
              "direction": 57,
              "spread": 142,
              "rayCount": 7,
              "rayWidth": 0.7,
              "widthVariation": 0.32,
              "spacingVariation": 0.48,
              "rayMotion": 0.71,
              "motionSpeed": 0.94,
              "fadeVariation": 0.27,
              "length": 1394,
              "intensity": 0.34,
              "softness": 0.72,
              "feather": 0.39,
              "decay": 1,
              "breakup": 0.43,
              "noiseScale": 1.2,
              "noiseAmount": 0.94,
              "noiseSpeed": 0.32,
              "atmosphereInfluence": 1.15,
              "depth": 0.88,
              "depthInfluence": 0.7,
              "depthSoftness": 0.27,
              "id": "canopy-sun-rays",
              "layer": "globalLighting",
              "name": "canopy-sun-rays"
            }
          ]
        },
        "waterSurface": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1029,
              "y": 398,
              "color": "#d9f5ff",
              "shape": "polygon",
              "width": 800,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "shimmerStrength": 8,
              "shimmerCoverage": 1,
              "sparkleSize": 20,
              "anisotropy": 6,
              "shimmerSoftness": 0.08,
              "evolutionSpeed": 1.45,
              "highlightContrast": 2.3,
              "shimmerDirection": 0,
              "depth": 0.78,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSurface-mtmnzsh6",
              "layer": "environment",
              "name": "waterSurface-mtmnzsh6",
              "points": [
                {
                  "x": -0.4263801007243546,
                  "y": -0.008314694410055381
                },
                {
                  "x": -0.21593646812166298,
                  "y": -0.03600464606830428
                },
                {
                  "x": 0.24556274026632308,
                  "y": 0.3405786964838808
                },
                {
                  "x": -0.38530664426361,
                  "y": 0.16797796964645387
                }
              ]
            },
            {
              "enabled": true,
              "x": 1523,
              "y": 382,
              "color": "#d9f5ff",
              "shape": "polygon",
              "width": 800,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "shimmerStrength": 8,
              "shimmerCoverage": 1,
              "sparkleSize": 20,
              "anisotropy": 6,
              "shimmerSoftness": 0.08,
              "evolutionSpeed": 1.45,
              "highlightContrast": 2.2,
              "shimmerDirection": 0,
              "depth": 0.78,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSurface-ee53ec84-77d0-4a9e-92a0-278ac39c2633",
              "layer": "environment",
              "name": "waterSurface-mtmnzsh6 copy",
              "points": [
                {
                  "x": -0.09578519439151932,
                  "y": -0.05138454938480209
                },
                {
                  "x": 0.0768155324459076,
                  "y": -0.05323060249736954
                },
                {
                  "x": 0.2397247762029474,
                  "y": 0.36396472548893144
                },
                {
                  "x": -0.0824016895890236,
                  "y": 0.12306214606216599
                }
              ]
            }
          ]
        },
        "waterSparkles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1029,
              "y": 398,
              "color": "#f4fff8",
              "shape": "polygon",
              "width": 800,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "sparkleStrength": 2.2,
              "sparkleDensity": 0.45,
              "sparkleSize": 0.5,
              "sizeVariation": 0.72,
              "twinkleSpeed": 0.25,
              "twinkleVariation": 0.82,
              "clusterScale": 140,
              "clusterAmount": 0.68,
              "peakIntensity": 1.8,
              "anisotropy": 1.55,
              "artworkInfluence": 0.65,
              "depth": 0.88,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSparkles-mtmo3i3d",
              "layer": "environment",
              "name": "waterSparkles-mtmo3i3d",
              "points": [
                {
                  "x": -0.42268807900224603,
                  "y": -0.013852684741705161
                },
                {
                  "x": -0.16101807808330704,
                  "y": -0.014775711297988891
                },
                {
                  "x": 0.1994128490035837,
                  "y": 0.322118672376364
                },
                {
                  "x": -0.3276192590594292,
                  "y": 0.1818229454755783
                }
              ]
            },
            {
              "enabled": true,
              "x": 1055,
              "y": 412,
              "color": "#f4fff8",
              "shape": "polygon",
              "width": 745,
              "height": 374,
              "softness": 0.6,
              "direction": 0,
              "sparkleStrength": 8,
              "sparkleDensity": 0.65,
              "sparkleSize": 0.8,
              "sizeVariation": 0.72,
              "twinkleSpeed": 0.7,
              "twinkleVariation": 0.82,
              "clusterScale": 140,
              "clusterAmount": 0.68,
              "peakIntensity": 1.8,
              "anisotropy": 1.55,
              "artworkInfluence": 0.65,
              "depth": 0.71,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSparkles-b1dadde2-2c30-4a76-8640-c763a12606a8",
              "layer": "environment",
              "name": "waterSparkles-mtmo3i3d copy",
              "points": [
                {
                  "x": -0.05999951996844834,
                  "y": -0.16478556261288876
                },
                {
                  "x": 0.03614092283386459,
                  "y": -0.16675995096857588
                },
                {
                  "x": -0.10856537146856321,
                  "y": -0.0038778823906411653
                },
                {
                  "x": -0.25128941759967166,
                  "y": -0.02954411761645965
                }
              ]
            },
            {
              "enabled": true,
              "x": 1635,
              "y": 438,
              "color": "#f4fff8",
              "shape": "polygon",
              "width": 745,
              "height": 374,
              "softness": 0.6,
              "direction": 0,
              "sparkleStrength": 4.27,
              "sparkleDensity": 0.65,
              "sparkleSize": 0.5,
              "sizeVariation": 0.72,
              "twinkleSpeed": 0.7,
              "twinkleVariation": 0.82,
              "clusterScale": 140,
              "clusterAmount": 0.68,
              "peakIntensity": 1.8,
              "anisotropy": 1.55,
              "artworkInfluence": 0.65,
              "depth": 0.42,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSparkles-7a22a1d7-5d02-421d-98c8-fc27526168ce",
              "layer": "environment",
              "name": "waterSparkles-mtmo3i3d copy copy",
              "points": [
                {
                  "x": -0.24823639851074036,
                  "y": -0.2303556832341911
                },
                {
                  "x": -0.036628207584355504,
                  "y": -0.22048401258846018
                },
                {
                  "x": 0.06347682230210092,
                  "y": 0.1358822403048773
                },
                {
                  "x": -0.25128941759967166,
                  "y": -0.02954411761645965
                }
              ]
            }
          ]
        },
        "gameplayCues": {
          "enabled": true,
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0005": {
      "spriteScale": 1.65,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0,
          "contrast": 1.08,
          "highlights": -0.08,
          "shadows": 0.05,
          "saturation": 1.04,
          "warmth": 0,
          "tint": -0.04,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 481,
              "y": 288,
              "color": "#ffbd72",
              "radius": 220,
              "intensity": 1.15,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "salon-lantern",
              "layer": "effects",
              "name": "salon-lantern"
            },
            {
              "enabled": true,
              "x": 1087,
              "y": 124,
              "color": "#55bce8",
              "radius": 300,
              "intensity": 1.1,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "slowPulse",
              "flickerAmount": 0.05,
              "flickerSpeed": 0.35,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "salon-blue-window",
              "layer": "effects",
              "name": "salon-blue-window"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1090,
              "y": 280,
              "color": "#69b8d8",
              "shape": "ellipse",
              "width": 2300,
              "height": 900,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.28,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "underwater-ambient",
              "layer": "globalLighting",
              "name": "underwater-ambient"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#5c9fb5",
              "shape": "ellipse",
              "width": 1900,
              "height": 520,
              "softness": 0.82,
              "direction": 0,
              "density": 0.12,
              "scale": 1.15,
              "driftSpeed": 2,
              "driftDirection": 0,
              "turbulence": 0.12,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "salon-underwater-haze",
              "layer": "environment",
              "name": "salon-underwater-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.36,
          "threshold": 0.68,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": false,
          "items": []
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1086,
          "shadowLightSourceY": 122,
          "shadowShape": "silhouette",
          "shadowGroundlineOffset": -9,
          "shadowStrength": 6.96,
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
          "ambientInfluence": 0.16,
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.41
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.14,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0006": {
      "spriteScale": 1.5,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.03,
          "contrast": 1.1,
          "highlights": -0.1,
          "shadows": 0.04,
          "saturation": 1.05,
          "warmth": 0,
          "tint": -0.05,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 321,
              "y": 293,
              "color": "#4fc9f2",
              "radius": 205,
              "intensity": 1.2,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "slowPulse",
              "flickerAmount": 0.04,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "left-blue-port",
              "layer": "effects",
              "name": "left-blue-port"
            },
            {
              "enabled": true,
              "x": 198,
              "y": 101,
              "color": "#67d6f4",
              "radius": 180,
              "intensity": 0.9,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "upper-blue-port",
              "layer": "effects",
              "name": "upper-blue-port"
            },
            {
              "enabled": true,
              "x": 1754,
              "y": 236,
              "color": "#4fc9f2",
              "radius": 210,
              "intensity": 1.15,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "slowPulse",
              "flickerAmount": 0.04,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "right-blue-port",
              "layer": "effects",
              "name": "right-blue-port"
            },
            {
              "enabled": true,
              "x": 2066,
              "y": 415,
              "color": "#ffc574",
              "radius": 150,
              "intensity": 0.85,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "right-lantern",
              "layer": "effects",
              "name": "right-lantern"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 270,
              "color": "#397fa6",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.22,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "submarine-cool-fill",
              "layer": "globalLighting",
              "name": "submarine-cool-fill"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#4b879c",
              "shape": "ellipse",
              "width": 2000,
              "height": 520,
              "softness": 0.82,
              "direction": 0,
              "density": 0.1,
              "scale": 1.15,
              "driftSpeed": 1.5,
              "driftDirection": 0,
              "turbulence": 0.1,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "submarine-haze",
              "layer": "environment",
              "name": "submarine-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.4,
          "threshold": 0.62,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": false,
          "items": []
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1076,
          "shadowLightSourceY": 44,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": true,
          "strength": 0.07,
          "width": 1.5,
          "colorResponse": 0.85,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0007": {
      "spriteScale": 1.55,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.03,
          "contrast": 1.06,
          "highlights": -0.12,
          "shadows": 0.05,
          "saturation": 1.04,
          "warmth": 0.04,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1120,
              "y": 150,
              "color": "#d8f0dc",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 78,
              "intensity": 0.48,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "island-daylight",
              "layer": "globalLighting",
              "name": "island-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#83b9ad",
              "shape": "ellipse",
              "width": 1800,
              "height": 500,
              "softness": 0.82,
              "direction": 0,
              "density": 0.13,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.18,
              "depthBias": 0.05,
              "id": "island-cave-haze",
              "layer": "environment",
              "name": "island-cave-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.2,
          "threshold": 1.05,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1800,
              "height": 460,
              "softness": 0.6,
              "direction": -15,
              "count": 220,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.3,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "island-pollen",
              "name": "island-pollen"
            },
            {
              "enabled": true,
              "x": 935,
              "y": 344,
              "color": "#ffe3bc",
              "shape": "polygon",
              "width": 198,
              "height": 111,
              "softness": 0.6,
              "direction": 89,
              "count": 600,
              "size": 0.84,
              "sizeVariation": 0.6,
              "speed": 127.33,
              "turbulence": 1.24,
              "lifetime": 12,
              "opacity": 0.3,
              "glow": 0.23,
              "gravity": 0.29,
              "randomness": 0.8,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "layer": "effects",
              "wind": 0,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.3,
              "distribution": "volume",
              "id": "particles-mtmr2l65",
              "name": "particles-mtmr2l65",
              "points": [
                {
                  "x": -0.6931414634702926,
                  "y": -0.16528673364575738
                },
                {
                  "x": 0.8318216656387254,
                  "y": -0.31302151320096394
                },
                {
                  "x": 0.856060965900424,
                  "y": 0.5910512133095809
                },
                {
                  "x": -0.6833189133589753,
                  "y": -0.06083067197681389
                }
              ]
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 947,
          "shadowLightSourceY": 31,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 945,
              "y": 23,
              "color": "#d7f3e4",
              "direction": 90,
              "spread": 130,
              "rayCount": 5,
              "rayWidth": 0.81,
              "widthVariation": 0.6,
              "spacingVariation": 0.48,
              "rayMotion": 0.83,
              "motionSpeed": 0.14,
              "fadeVariation": 0.25,
              "length": 1050,
              "intensity": 0.36,
              "softness": 0.72,
              "feather": 0.42,
              "decay": 1,
              "breakup": 0.48,
              "noiseScale": 1.2,
              "noiseAmount": 0.38,
              "noiseSpeed": 0.1,
              "atmosphereInfluence": 1.15,
              "depth": 0.45,
              "depthInfluence": 0.7,
              "depthSoftness": 0.2,
              "id": "cave-opening-rays",
              "layer": "globalLighting",
              "name": "cave-opening-rays"
            },
            {
              "enabled": true,
              "x": 1936,
              "y": 204,
              "color": "#ffe5ae",
              "direction": 135,
              "spread": 87,
              "rayCount": 5,
              "rayWidth": 0.85,
              "widthVariation": 0.6,
              "spacingVariation": 0.48,
              "rayMotion": 0,
              "motionSpeed": 0.14,
              "fadeVariation": 0.25,
              "length": 760,
              "intensity": 0.22,
              "softness": 0.72,
              "feather": 0.42,
              "decay": 1,
              "breakup": 0.48,
              "noiseScale": 1.2,
              "noiseAmount": 0.38,
              "noiseSpeed": 0.1,
              "atmosphereInfluence": 1.15,
              "depth": 0.45,
              "depthInfluence": 0.7,
              "depthSoftness": 0.2,
              "id": "right-opening-rays",
              "layer": "globalLighting",
              "name": "right-opening-rays"
            }
          ]
        },
        "waterSurface": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 881,
              "y": 398,
              "color": "#d9f5ff",
              "shape": "polygon",
              "width": 800,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "shimmerStrength": 8,
              "shimmerCoverage": 1,
              "sparkleSize": 33,
              "anisotropy": 6,
              "shimmerSoftness": 0.08,
              "evolutionSpeed": 0.95,
              "highlightContrast": 4.5,
              "shimmerDirection": 0,
              "depth": 0.68,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSurface-mtmqww7j",
              "layer": "environment",
              "name": "waterSurface-mtmqww7j",
              "points": [
                {
                  "x": -0.3266805167225448,
                  "y": 0.0018382596969604493
                },
                {
                  "x": 0.2949588557536299,
                  "y": -0.0018537620251481712
                },
                {
                  "x": 0.20404357081106356,
                  "y": 0.144902981763571
                },
                {
                  "x": -0.09593093365430833,
                  "y": 0.2122818922996521
                }
              ]
            }
          ]
        },
        "waterSparkles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 881,
              "y": 398,
              "color": "#f4fff8",
              "shape": "polygon",
              "width": 800,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "sparkleStrength": 7.53,
              "sparkleDensity": 0.45,
              "sparkleSize": 0.5,
              "sizeVariation": 0.72,
              "twinkleSpeed": 1.15,
              "twinkleVariation": 0.82,
              "clusterScale": 140,
              "clusterAmount": 0.68,
              "peakIntensity": 1.8,
              "anisotropy": 1.55,
              "artworkInfluence": 0.65,
              "depth": 0.65,
              "depthOcclusion": 1,
              "depthSoftness": 0.035,
              "id": "waterSparkles-mtmqz7br",
              "layer": "environment",
              "name": "waterSparkles-mtmqz7br",
              "points": [
                {
                  "x": -0.306374566257,
                  "y": 0.00922221863815139
                },
                {
                  "x": 0.2631154113466437,
                  "y": 0.01199121380397628
                },
                {
                  "x": 0.23588701521804978,
                  "y": 0.11259806632995606
                },
                {
                  "x": -0.09177744090557098,
                  "y": 0.19012993097305297
                }
              ]
            }
          ]
        },
        "gameplayCues": {
          "enabled": true,
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0008": {
      "spriteScale": 1.1,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.01,
          "contrast": 1.11,
          "highlights": -0.04,
          "shadows": 0.04,
          "saturation": 1.06,
          "warmth": -0.03,
          "tint": 0,
          "blackPoint": 0.018
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1113,
              "y": 345,
              "color": "#59f2db",
              "radius": 285,
              "intensity": 2.15,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "arcane",
              "flickerAmount": 0.2,
              "flickerSpeed": 0.9,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "sealed-crystal",
              "layer": "effects",
              "name": "sealed-crystal"
            },
            {
              "enabled": true,
              "x": 118,
              "y": 249,
              "color": "#ff7938",
              "radius": 120,
              "intensity": 0.75,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "left-ember-source",
              "layer": "effects",
              "name": "left-ember-source"
            },
            {
              "enabled": true,
              "x": 1950,
              "y": 228,
              "color": "#ff7938",
              "radius": 185,
              "intensity": 0.72,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "right-ember-source",
              "layer": "effects",
              "name": "right-ember-source"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 320,
              "color": "#435767",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.18,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "sealed-room-fill",
              "layer": "globalLighting",
              "name": "sealed-room-fill"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 410,
              "color": "#776b5d",
              "shape": "ellipse",
              "width": 2000,
              "height": 420,
              "softness": 0.82,
              "direction": 0,
              "density": 0.1,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.28,
              "depthBias": 0.05,
              "id": "sealed-room-dust",
              "layer": "environment",
              "name": "sealed-room-dust"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.52,
          "threshold": 0.55,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 118,
              "y": 249,
              "color": "#ff8331",
              "shape": "rectangle",
              "width": 90,
              "height": 130,
              "softness": 0.6,
              "direction": -90,
              "count": 42,
              "size": 1.05,
              "sizeVariation": 0.9,
              "speed": 34,
              "turbulence": 1.1,
              "lifetime": 5,
              "opacity": 0.58,
              "glow": 1.35,
              "gravity": -1.4,
              "randomness": 0.82,
              "depth": 0.82,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "effects",
              "wind": 3,
              "streak": 1.7,
              "pulse": 0,
              "depthSpread": 0.16,
              "distribution": "source",
              "id": "sealed-left-embers",
              "name": "sealed-left-embers"
            },
            {
              "enabled": true,
              "x": 1950,
              "y": 228,
              "color": "#ff8331",
              "shape": "rectangle",
              "width": 260,
              "height": 150,
              "softness": 0.6,
              "direction": -90,
              "count": 68,
              "size": 1.05,
              "sizeVariation": 0.9,
              "speed": 34,
              "turbulence": 1.1,
              "lifetime": 5,
              "opacity": 0.58,
              "glow": 1.35,
              "gravity": -1.4,
              "randomness": 0.82,
              "depth": 0.82,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "effects",
              "wind": 3,
              "streak": 1.7,
              "pulse": 0,
              "depthSpread": 0.16,
              "distribution": "source",
              "id": "sealed-right-embers",
              "name": "sealed-right-embers"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 964,
          "shadowLightSourceY": 181,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": true,
          "strength": 0.1,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.95,
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
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0013": {
      "spriteScale": 1.6,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.05,
          "contrast": 1.05,
          "highlights": -0.16,
          "shadows": 0.04,
          "saturation": 1.03,
          "warmth": 0.08,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1606,
              "y": 212,
              "color": "#ffd88d",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 35,
              "intensity": 0.6,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "netherlands-golden-sun",
              "layer": "globalLighting",
              "name": "netherlands-golden-sun"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1150,
              "y": 300,
              "color": "#d1c5a4",
              "shape": "ellipse",
              "width": 1900,
              "height": 420,
              "softness": 0.82,
              "direction": 0,
              "density": 0.08,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.18,
              "depthBias": 0.05,
              "id": "netherlands-distance-haze",
              "layer": "environment",
              "name": "netherlands-distance-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.2,
          "threshold": 0.95,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1900,
              "height": 420,
              "softness": 0.6,
              "direction": -15,
              "count": 190,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.26,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "netherlands-pollen",
              "name": "netherlands-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.07,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1606,
              "y": 212,
              "color": "#ffe2a2",
              "direction": 86,
              "spread": 76,
              "rayCount": 9,
              "rayWidth": 0.42,
              "widthVariation": 0.6,
              "spacingVariation": 0.48,
              "rayMotion": 0,
              "motionSpeed": 0.14,
              "fadeVariation": 0.25,
              "length": 1350,
              "intensity": 0.46,
              "softness": 0.72,
              "feather": 0.42,
              "decay": 1,
              "breakup": 0.48,
              "noiseScale": 1.2,
              "noiseAmount": 0.38,
              "noiseSpeed": 0.1,
              "atmosphereInfluence": 1.15,
              "depth": 0.45,
              "depthInfluence": 0.7,
              "depthSoftness": 0.2,
              "id": "netherlands-rays",
              "layer": "globalLighting",
              "name": "netherlands-rays"
            }
          ]
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0016": {
      "spriteScale": 1.3,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.07,
          "contrast": 1.04,
          "highlights": -0.2,
          "shadows": 0.03,
          "saturation": 1.03,
          "warmth": 0.05,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 100,
              "color": "#ffe4b2",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 58,
              "intensity": 0.5,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "italy-daylight",
              "layer": "globalLighting",
              "name": "italy-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 320,
              "color": "#d9d0b6",
              "shape": "ellipse",
              "width": 2050,
              "height": 390,
              "softness": 0.82,
              "direction": 0,
              "density": 0.055,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.2,
              "depthBias": 0.05,
              "id": "italy-distance-air",
              "layer": "environment",
              "name": "italy-distance-air"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.13,
          "threshold": 1.1,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#d5bd8c",
              "shape": "rectangle",
              "width": 1950,
              "height": 430,
              "softness": 0.6,
              "direction": 0,
              "count": 190,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.15,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "italy-dust",
              "name": "italy-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.05,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0017": {
      "spriteScale": 1.45,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.06,
          "contrast": 1.05,
          "highlights": -0.2,
          "shadows": 0.05,
          "saturation": 1.03,
          "warmth": -0.01,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 90,
              "color": "#e5eeea",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 56,
              "intensity": 0.5,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "alpine-daylight",
              "layer": "globalLighting",
              "name": "alpine-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 280,
              "color": "#bdced2",
              "shape": "ellipse",
              "width": 2050,
              "height": 360,
              "softness": 0.82,
              "direction": 0,
              "density": 0.075,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.35,
              "depthCurve": 1.35,
              "floorBias": -0.25,
              "depthBias": 0.05,
              "id": "alpine-depth-haze",
              "layer": "environment",
              "name": "alpine-depth-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.12,
          "threshold": 1.12,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#eff1df",
              "shape": "rectangle",
              "width": 1900,
              "height": 390,
              "softness": 0.6,
              "direction": -15,
              "count": 95,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.16,
              "glow": 0,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "alpine-air",
              "name": "alpine-air"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.05,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0020": {
      "spriteScale": 1.65,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.05,
          "contrast": 1.05,
          "highlights": -0.18,
          "shadows": 0.04,
          "saturation": 1.04,
          "warmth": 0.04,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 100,
              "color": "#f0e1bd",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 52,
              "intensity": 0.47,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "posbank-daylight",
              "layer": "globalLighting",
              "name": "posbank-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1320,
              "y": 270,
              "color": "#c5cec2",
              "shape": "ellipse",
              "width": 1750,
              "height": 330,
              "softness": 0.82,
              "direction": 0,
              "density": 0.085,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.45,
              "depthCurve": 1.35,
              "floorBias": -0.28,
              "depthBias": 0.05,
              "id": "posbank-valley-haze",
              "layer": "environment",
              "name": "posbank-valley-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.1,
          "threshold": 1.15,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1950,
              "height": 410,
              "softness": 0.6,
              "direction": -10,
              "count": 230,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.28,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 7,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "posbank-pollen",
              "name": "posbank-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.04,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0021": {
      "spriteScale": 1.55,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.02,
          "contrast": 1.07,
          "highlights": -0.12,
          "shadows": 0.04,
          "saturation": 1.03,
          "warmth": 0.11,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1221,
              "y": 229,
              "color": "#ffc77d",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 28,
              "intensity": 0.58,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "rome-golden-sun",
              "layer": "globalLighting",
              "name": "rome-golden-sun"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1180,
              "y": 320,
              "color": "#c89f7a",
              "shape": "ellipse",
              "width": 1950,
              "height": 430,
              "softness": 0.82,
              "direction": 0,
              "density": 0.1,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.1,
              "depthBias": 0.05,
              "id": "rome-golden-haze",
              "layer": "environment",
              "name": "rome-golden-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.2,
          "threshold": 0.92,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#e2bd84",
              "shape": "rectangle",
              "width": 1950,
              "height": 420,
              "softness": 0.6,
              "direction": 0,
              "count": 330,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.22,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "rome-dust",
              "name": "rome-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1227,
          "shadowLightSourceY": 228,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.09,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.03
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1221,
              "y": 229,
              "color": "#ffd391",
              "direction": 108,
              "spread": 150,
              "rayCount": 6,
              "rayWidth": 0.72,
              "widthVariation": 0.6,
              "spacingVariation": 0.48,
              "rayMotion": 0,
              "motionSpeed": 0.14,
              "fadeVariation": 0.25,
              "length": 1150,
              "intensity": 0.42,
              "softness": 0.72,
              "feather": 0.42,
              "decay": 1,
              "breakup": 0.48,
              "noiseScale": 1.2,
              "noiseAmount": 0.38,
              "noiseSpeed": 0.1,
              "atmosphereInfluence": 1.15,
              "depth": 0.45,
              "depthInfluence": 0.7,
              "depthSoftness": 0.2,
              "id": "rome-golden-rays",
              "layer": "globalLighting",
              "name": "rome-golden-rays"
            }
          ]
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0024": {
      "spriteScale": 1.5,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.02,
          "contrast": 1.09,
          "highlights": -0.08,
          "shadows": 0.05,
          "saturation": 1.04,
          "warmth": 0.04,
          "tint": 0.02,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 249,
              "y": 268,
              "color": "#ffc36d",
              "radius": 205,
              "intensity": 1.25,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.12,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "marche-lantern",
              "layer": "effects",
              "name": "marche-lantern"
            },
            {
              "enabled": true,
              "x": 1768,
              "y": 522,
              "color": "#ff7839",
              "radius": 155,
              "intensity": 1.1,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "marche-forge",
              "layer": "effects",
              "name": "marche-forge"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 160,
              "color": "#8f84b2",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 72,
              "intensity": 0.25,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "marche-dusk",
              "layer": "globalLighting",
              "name": "marche-dusk"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#756f87",
              "shape": "ellipse",
              "width": 2050,
              "height": 470,
              "softness": 0.82,
              "direction": 0,
              "density": 0.13,
              "scale": 1.15,
              "driftSpeed": 10,
              "driftDirection": -12,
              "turbulence": 0.4,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "marche-dusk-haze",
              "layer": "environment",
              "name": "marche-dusk-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.42,
          "threshold": 0.65,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1768,
              "y": 500,
              "color": "#ff8331",
              "shape": "rectangle",
              "width": 180,
              "height": 230,
              "softness": 0.6,
              "direction": -105,
              "count": 85,
              "size": 1.05,
              "sizeVariation": 0.9,
              "speed": 34,
              "turbulence": 1.1,
              "lifetime": 5,
              "opacity": 0.58,
              "glow": 1.35,
              "gravity": -1.4,
              "randomness": 0.82,
              "depth": 0.82,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "effects",
              "wind": 14,
              "streak": 1.7,
              "pulse": 0,
              "depthSpread": 0.16,
              "distribution": "source",
              "id": "marche-forge-embers",
              "name": "marche-forge-embers"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": true,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.13,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0029": {
      "spriteScale": 1.4,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.03,
          "contrast": 1.12,
          "highlights": -0.06,
          "shadows": 0.04,
          "saturation": 1.04,
          "warmth": 0.09,
          "tint": 0,
          "blackPoint": 0.022
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 49,
              "y": 337,
              "color": "#ff9340",
              "radius": 160,
              "intensity": 1.25,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "tomb-entry-torch",
              "layer": "effects",
              "name": "tomb-entry-torch"
            },
            {
              "enabled": true,
              "x": 339,
              "y": 385,
              "color": "#ff9340",
              "radius": 175,
              "intensity": 1.4,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "tomb-left-torch",
              "layer": "effects",
              "name": "tomb-left-torch"
            },
            {
              "enabled": true,
              "x": 927,
              "y": 313,
              "color": "#ff9b49",
              "radius": 185,
              "intensity": 1.45,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "tomb-center-torch",
              "layer": "effects",
              "name": "tomb-center-torch"
            },
            {
              "enabled": true,
              "x": 1540,
              "y": 360,
              "color": "#ffc06c",
              "radius": 360,
              "intensity": 0.55,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "tomb-sanctum-warmth",
              "layer": "effects",
              "name": "tomb-sanctum-warmth"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#74553e",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.18,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "tomb-ambient",
              "layer": "globalLighting",
              "name": "tomb-ambient"
            }
          ]
        },
        "shafts": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1050,
              "y": 65,
              "color": "#e6b978",
              "direction": 82,
              "length": 720,
              "width": 170,
              "intensity": 0.24,
              "softness": 0.82,
              "density": 0.46,
              "decay": 1.6,
              "noiseAmount": 0.38,
              "noiseScale": 1.35,
              "noiseSpeed": 0.05,
              "depth": 0.42,
              "depthInfluence": 0.82,
              "depthSoftness": 0.2,
              "atmosphereInfluence": 1.2,
              "layer": "globalLighting",
              "id": "tomb-dust-shaft",
              "name": "tomb-dust-shaft"
            }
          ]
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 360,
              "color": "#836447",
              "shape": "ellipse",
              "width": 2050,
              "height": 500,
              "softness": 0.82,
              "direction": 0,
              "density": 0.16,
              "scale": 1.15,
              "driftSpeed": 2,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.18,
              "depthBias": 0.05,
              "id": "tomb-ancient-haze",
              "layer": "environment",
              "name": "tomb-ancient-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.46,
          "threshold": 0.58,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#d2ad78",
              "shape": "rectangle",
              "width": 2000,
              "height": 450,
              "softness": 0.6,
              "direction": 0,
              "count": 520,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.25,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "tomb-dust",
              "name": "tomb-dust"
            },
            {
              "enabled": true,
              "x": 520,
              "y": 330,
              "color": "#ff8331",
              "shape": "rectangle",
              "width": 1050,
              "height": 300,
              "softness": 0.6,
              "direction": -90,
              "count": 115,
              "size": 1.05,
              "sizeVariation": 0.9,
              "speed": 34,
              "turbulence": 1.1,
              "lifetime": 5,
              "opacity": 0.46,
              "glow": 1.35,
              "gravity": -1.4,
              "randomness": 0.82,
              "depth": 0.82,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "effects",
              "wind": 3,
              "streak": 1.7,
              "pulse": 0,
              "depthSpread": 0.16,
              "distribution": "volume",
              "id": "tomb-embers",
              "name": "tomb-embers"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.18,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.04
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0019": {
      "spriteScale": 1.25,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.06,
          "contrast": 1.04,
          "highlights": -0.2,
          "shadows": 0.04,
          "saturation": 1.03,
          "warmth": 0.01,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 90,
              "color": "#e5ebd8",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 58,
              "intensity": 0.48,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "sweden-daylight",
              "layer": "globalLighting",
              "name": "sweden-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 320,
              "color": "#b9cfd0",
              "shape": "ellipse",
              "width": 2050,
              "height": 400,
              "softness": 0.82,
              "direction": 0,
              "density": 0.065,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.18,
              "depthBias": 0.05,
              "id": "sweden-lake-air",
              "layer": "environment",
              "name": "sweden-lake-air"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.12,
          "threshold": 1.12,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1900,
              "height": 400,
              "softness": 0.6,
              "direction": -15,
              "count": 120,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.18,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "sweden-pollen",
              "name": "sweden-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.045,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0027": {
      "spriteScale": 1.25,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.02,
          "contrast": 1.09,
          "highlights": -0.07,
          "shadows": 0.05,
          "saturation": 1.02,
          "warmth": 0.07,
          "tint": 0,
          "blackPoint": 0.016
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1562,
              "y": 491,
              "color": "#ff9a48",
              "radius": 175,
              "intensity": 1.3,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "museum-left-torch",
              "layer": "effects",
              "name": "museum-left-torch"
            },
            {
              "enabled": true,
              "x": 1894,
              "y": 501,
              "color": "#ff9a48",
              "radius": 175,
              "intensity": 1.3,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "museum-right-torch",
              "layer": "effects",
              "name": "museum-right-torch"
            },
            {
              "enabled": true,
              "x": 900,
              "y": 390,
              "color": "#ffd198",
              "radius": 380,
              "intensity": 0.5,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "museum-gallery-warmth",
              "layer": "effects",
              "name": "museum-gallery-warmth"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 300,
              "color": "#8a735e",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.2,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "museum-ambient",
              "layer": "globalLighting",
              "name": "museum-ambient"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 360,
              "color": "#8e765f",
              "shape": "ellipse",
              "width": 2050,
              "height": 470,
              "softness": 0.82,
              "direction": 0,
              "density": 0.12,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.15,
              "depthBias": 0.05,
              "id": "museum-dust-haze",
              "layer": "environment",
              "name": "museum-dust-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.4,
          "threshold": 0.62,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#d9b98a",
              "shape": "rectangle",
              "width": 1950,
              "height": 430,
              "softness": 0.6,
              "direction": 0,
              "count": 420,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.23,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "museum-dust",
              "name": "museum-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.14,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0031": {
      "spriteScale": 1.1,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.01,
          "contrast": 1.08,
          "highlights": -0.08,
          "shadows": 0.05,
          "saturation": 1.01,
          "warmth": 0.05,
          "tint": 0,
          "blackPoint": 0.014
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 430,
              "y": 360,
              "color": "#ffc983",
              "radius": 250,
              "intensity": 0.72,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "return-left-gallery",
              "layer": "effects",
              "name": "return-left-gallery"
            },
            {
              "enabled": true,
              "x": 1086,
              "y": 340,
              "color": "#ffd096",
              "radius": 280,
              "intensity": 0.68,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "return-center-gallery",
              "layer": "effects",
              "name": "return-center-gallery"
            },
            {
              "enabled": true,
              "x": 1740,
              "y": 360,
              "color": "#ffc983",
              "radius": 250,
              "intensity": 0.72,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "return-right-gallery",
              "layer": "effects",
              "name": "return-right-gallery"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 300,
              "color": "#88786a",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.18,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "return-museum-ambient",
              "layer": "globalLighting",
              "name": "return-museum-ambient"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#8d8174",
              "shape": "ellipse",
              "width": 2050,
              "height": 460,
              "softness": 0.82,
              "direction": 0,
              "density": 0.085,
              "scale": 1.15,
              "driftSpeed": 1.5,
              "driftDirection": 0,
              "turbulence": 0.12,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "return-museum-air",
              "layer": "environment",
              "name": "return-museum-air"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.3,
          "threshold": 0.72,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#d5bea0",
              "shape": "rectangle",
              "width": 1950,
              "height": 420,
              "softness": 0.6,
              "direction": 0,
              "count": 260,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.16,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "return-museum-dust",
              "name": "return-museum-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.12,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0009": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.02,
          "contrast": 1.1,
          "highlights": -0.04,
          "shadows": 0.05,
          "saturation": 1.06,
          "warmth": 0.05,
          "tint": 0,
          "blackPoint": 0.016
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1103,
              "y": 324,
              "color": "#a6fff1",
              "radius": 300,
              "intensity": 2.25,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "slowPulse",
              "flickerAmount": 0.18,
              "flickerSpeed": 0.55,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "awakened-sacred-core",
              "layer": "effects",
              "name": "awakened-sacred-core"
            },
            {
              "enabled": true,
              "x": 610,
              "y": 400,
              "color": "#ff8b3d",
              "radius": 155,
              "intensity": 0.9,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "awakened-left-fire",
              "layer": "effects",
              "name": "awakened-left-fire"
            },
            {
              "enabled": true,
              "x": 1980,
              "y": 330,
              "color": "#ff7838",
              "radius": 230,
              "intensity": 0.82,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "awakened-edge-fires",
              "layer": "effects",
              "name": "awakened-edge-fires"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#6d5575",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.2,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "awakened-room-fill",
              "layer": "globalLighting",
              "name": "awakened-room-fill"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1100,
              "y": 360,
              "color": "#7b6b85",
              "shape": "ellipse",
              "width": 1250,
              "height": 430,
              "softness": 0.82,
              "direction": 0,
              "density": 0.14,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.38,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "awakened-magic-haze",
              "layer": "environment",
              "name": "awakened-magic-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.58,
          "threshold": 0.5,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#ff8331",
              "shape": "rectangle",
              "width": 2050,
              "height": 330,
              "softness": 0.6,
              "direction": -90,
              "count": 135,
              "size": 1.05,
              "sizeVariation": 0.9,
              "speed": 22,
              "turbulence": 1.1,
              "lifetime": 5,
              "opacity": 0.46,
              "glow": 1.35,
              "gravity": -1.4,
              "randomness": 0.82,
              "depth": 0.82,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "effects",
              "wind": 3,
              "streak": 1.7,
              "pulse": 0,
              "depthSpread": 0.16,
              "distribution": "volume",
              "id": "awakened-embers",
              "name": "awakened-embers"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1134,
          "shadowLightSourceY": 136,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": true,
          "strength": 0.12,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 1.05,
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
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0010": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.04,
          "contrast": 1.04,
          "highlights": -0.15,
          "shadows": 0.04,
          "saturation": 1.03,
          "warmth": 0.04,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 130,
              "color": "#ffe2a7",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 65,
              "intensity": 0.5,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "beach-room-daylight",
              "layer": "globalLighting",
              "name": "beach-room-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 360,
              "color": "#c6d9ce",
              "shape": "ellipse",
              "width": 2000,
              "height": 480,
              "softness": 0.82,
              "direction": 0,
              "density": 0.07,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.12,
              "depthBias": 0.05,
              "id": "beach-room-air",
              "layer": "environment",
              "name": "beach-room-air"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.16,
          "threshold": 1.05,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1900,
              "height": 430,
              "softness": 0.6,
              "direction": -15,
              "count": 150,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.22,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "beach-room-pollen",
              "name": "beach-room-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 968,
          "shadowLightSourceY": 12,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.06,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0011": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.03,
          "contrast": 1.12,
          "highlights": -0.08,
          "shadows": 0.03,
          "saturation": 1.08,
          "warmth": 0.08,
          "tint": 0,
          "blackPoint": 0.025
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 632,
              "y": 227,
              "color": "#ba68ff",
              "radius": 185,
              "intensity": 1.8,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "arcane",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "nether-left-crystal",
              "layer": "effects",
              "name": "nether-left-crystal"
            },
            {
              "enabled": true,
              "x": 1077,
              "y": 238,
              "color": "#b85cff",
              "radius": 205,
              "intensity": 2,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "arcane",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "nether-center-crystal",
              "layer": "effects",
              "name": "nether-center-crystal"
            },
            {
              "enabled": true,
              "x": 1232,
              "y": 378,
              "color": "#f05cff",
              "radius": 180,
              "intensity": 1.65,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "arcane",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "nether-right-crystal",
              "layer": "effects",
              "name": "nether-right-crystal"
            },
            {
              "enabled": true,
              "x": 1275,
              "y": 210,
              "color": "#ff4d27",
              "radius": 260,
              "intensity": 1.35,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "nether-fire-field",
              "layer": "effects",
              "name": "nether-fire-field"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 340,
              "color": "#9b2f33",
              "shape": "ellipse",
              "width": 2300,
              "height": 900,
              "softness": 0.88,
              "direction": 90,
              "intensity": 0.32,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "nether-red-fill",
              "layer": "globalLighting",
              "name": "nether-red-fill"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 360,
              "color": "#7b3031",
              "shape": "ellipse",
              "width": 2100,
              "height": 520,
              "softness": 0.82,
              "direction": 0,
              "density": 0.2,
              "scale": 1.15,
              "driftSpeed": 9,
              "driftDirection": 0,
              "turbulence": 0.52,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "nether-smolder",
              "layer": "environment",
              "name": "nether-smolder"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.68,
          "threshold": 0.46,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 300,
              "color": "#ff8331",
              "shape": "rectangle",
              "width": 2100,
              "height": 430,
              "softness": 0.6,
              "direction": -90,
              "count": 230,
              "size": 1.05,
              "sizeVariation": 0.9,
              "speed": 28,
              "turbulence": 1.1,
              "lifetime": 5,
              "opacity": 0.62,
              "glow": 1.35,
              "gravity": -1.4,
              "randomness": 0.82,
              "depth": 0.82,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "effects",
              "wind": 3,
              "streak": 1.7,
              "pulse": 0,
              "depthSpread": 0.16,
              "distribution": "volume",
              "id": "nether-embers",
              "name": "nether-embers"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1078,
          "shadowLightSourceY": 236,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": true,
          "strength": 0.16,
          "width": 1.8,
          "colorResponse": 0.72,
          "localInfluence": 1.2,
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
          "enabled": true,
          "intensity": 0.18,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.04
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0012": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0,
          "contrast": 1.07,
          "highlights": -0.08,
          "shadows": 0.05,
          "saturation": 1.04,
          "warmth": 0.03,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 245,
              "y": 327,
              "color": "#ff9d4f",
              "radius": 260,
              "intensity": 1.35,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "home-left-torches",
              "layer": "effects",
              "name": "home-left-torches"
            },
            {
              "enabled": true,
              "x": 2076,
              "y": 313,
              "color": "#ff9d4f",
              "radius": 165,
              "intensity": 1.05,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "home-right-torch",
              "layer": "effects",
              "name": "home-right-torch"
            },
            {
              "enabled": true,
              "x": 1339,
              "y": 300,
              "color": "#8a78ff",
              "radius": 270,
              "intensity": 2,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "arcane",
              "flickerAmount": 0.16,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "home-crystal",
              "layer": "effects",
              "name": "home-crystal"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1100,
              "y": 120,
              "color": "#d9e7c8",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 65,
              "intensity": 0.34,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "home-daylight",
              "layer": "globalLighting",
              "name": "home-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1339,
              "y": 210,
              "color": "#b6a2ff",
              "direction": 90,
              "length": 520,
              "width": 150,
              "intensity": 0.32,
              "softness": 0.78,
              "density": 0.5,
              "decay": 1.4,
              "noiseAmount": 0.34,
              "noiseScale": 1.2,
              "noiseSpeed": 0.08,
              "depth": 0.5,
              "depthInfluence": 0.7,
              "depthSoftness": 0.16,
              "atmosphereInfluence": 1.1,
              "layer": "effects",
              "id": "portal-shaft",
              "name": "portal-shaft"
            }
          ]
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 390,
              "color": "#aabda7",
              "shape": "ellipse",
              "width": 1900,
              "height": 420,
              "softness": 0.82,
              "direction": 0,
              "density": 0.08,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "home-garden-haze",
              "layer": "environment",
              "name": "home-garden-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.46,
          "threshold": 0.58,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": false,
          "items": []
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 1808,
          "shadowLightSourceY": 77,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": true,
          "strength": 0.09,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.1,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0014": {
      "spriteScale": 1.15,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.04,
          "contrast": 1.05,
          "highlights": -0.14,
          "shadows": 0.04,
          "saturation": 1.02,
          "warmth": 0.03,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1349,
              "y": 447,
              "color": "#6cdff2",
              "radius": 255,
              "intensity": 1.55,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "arcane",
              "flickerAmount": 0.12,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "oxford-crystal",
              "layer": "effects",
              "name": "oxford-crystal"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1080,
              "y": 120,
              "color": "#e0e7d2",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 58,
              "intensity": 0.48,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "england-daylight",
              "layer": "globalLighting",
              "name": "england-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#b9c9c4",
              "shape": "ellipse",
              "width": 2000,
              "height": 430,
              "softness": 0.82,
              "direction": 0,
              "density": 0.08,
              "scale": 1.15,
              "driftSpeed": 4,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "england-soft-haze",
              "layer": "environment",
              "name": "england-soft-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.3,
          "threshold": 0.72,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 320,
              "color": "#e8e1bd",
              "shape": "rectangle",
              "width": 1900,
              "height": 410,
              "softness": 0.6,
              "direction": -15,
              "count": 125,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.2,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "england-pollen",
              "name": "england-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.06,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0015": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.06,
          "contrast": 1.04,
          "highlights": -0.18,
          "shadows": 0.03,
          "saturation": 1.03,
          "warmth": 0.05,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 110,
              "color": "#ffe2aa",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 52,
              "intensity": 0.5,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "france-daylight",
              "layer": "globalLighting",
              "name": "france-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#d7d0b3",
              "shape": "ellipse",
              "width": 2000,
              "height": 430,
              "softness": 0.82,
              "direction": 0,
              "density": 0.06,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.15,
              "depthBias": 0.05,
              "id": "france-square-air",
              "layer": "environment",
              "name": "france-square-air"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.14,
          "threshold": 1.08,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 320,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1900,
              "height": 400,
              "softness": 0.6,
              "direction": -15,
              "count": 130,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.2,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "france-pollen",
              "name": "france-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.05,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0018": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.03,
          "contrast": 1.07,
          "highlights": -0.13,
          "shadows": 0.04,
          "saturation": 1.02,
          "warmth": 0.07,
          "tint": 0.02,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1248,
              "y": 257,
              "color": "#ffbd82",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 24,
              "intensity": 0.52,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "fjord-evening-sun",
              "layer": "globalLighting",
              "name": "fjord-evening-sun"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1039,
              "y": 506,
              "color": "#9eb7bc",
              "shape": "rectangle",
              "width": 900,
              "height": 250,
              "softness": 0.82,
              "direction": 0,
              "density": 0.18,
              "scale": 1.15,
              "driftSpeed": 7,
              "driftDirection": -8,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.4,
              "depthBias": 0.05,
              "id": "fjord-ground-mist",
              "layer": "environment",
              "name": "fjord-ground-mist"
            },
            {
              "enabled": true,
              "x": 1086,
              "y": 275,
              "color": "#aebbc4",
              "shape": "ellipse",
              "width": 2050,
              "height": 380,
              "softness": 0.82,
              "direction": 0,
              "density": 0.08,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.2,
              "depthBias": 0.05,
              "id": "fjord-distance-haze",
              "layer": "environment",
              "name": "fjord-distance-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.2,
          "threshold": 0.92,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#d7d7cf",
              "shape": "rectangle",
              "width": 1950,
              "height": 400,
              "softness": 0.6,
              "direction": 0,
              "count": 110,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.13,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "fjord-air",
              "name": "fjord-air"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.09,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1248,
              "y": 257,
              "color": "#ffc990",
              "direction": 112,
              "spread": 68,
              "rayCount": 6,
              "rayWidth": 0.34,
              "widthVariation": 0.6,
              "spacingVariation": 0.48,
              "rayMotion": 0,
              "motionSpeed": 0.14,
              "fadeVariation": 0.25,
              "length": 1050,
              "intensity": 0.28,
              "softness": 0.72,
              "feather": 0.42,
              "decay": 1,
              "breakup": 0.48,
              "noiseScale": 1.2,
              "noiseAmount": 0.38,
              "noiseSpeed": 0.1,
              "atmosphereInfluence": 1.15,
              "depth": 0.45,
              "depthInfluence": 0.7,
              "depthSoftness": 0.2,
              "id": "fjord-evening-rays",
              "layer": "globalLighting",
              "name": "fjord-evening-rays"
            }
          ]
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0022": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.04,
          "contrast": 1.05,
          "highlights": -0.16,
          "shadows": 0.04,
          "saturation": 1.01,
          "warmth": 0.06,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 100,
              "color": "#edd5aa",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 48,
              "intensity": 0.46,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "proceno-daylight",
              "layer": "globalLighting",
              "name": "proceno-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1280,
              "y": 280,
              "color": "#bfc5b5",
              "shape": "ellipse",
              "width": 1800,
              "height": 340,
              "softness": 0.82,
              "direction": 0,
              "density": 0.075,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": -0.24,
              "depthBias": 0.05,
              "id": "proceno-valley-haze",
              "layer": "environment",
              "name": "proceno-valley-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.1,
          "threshold": 1.12,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 390,
              "color": "#d5bd8c",
              "shape": "rectangle",
              "width": 1900,
              "height": 360,
              "softness": 0.6,
              "direction": -4,
              "count": 310,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.23,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 8,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "proceno-work-dust",
              "name": "proceno-work-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
          "groundingShadow": true,
          "showShadowContactDebug": false,
          "shadowLightSourceX": 18,
          "shadowLightSourceY": 221,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.055,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0023": {
      "spriteScale": 1.65,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.05,
          "contrast": 1.04,
          "highlights": -0.18,
          "shadows": 0.04,
          "saturation": 1.02,
          "warmth": 0.03,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 90,
              "color": "#e7e2c4",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 54,
              "intensity": 0.48,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "umbria-daylight",
              "layer": "globalLighting",
              "name": "umbria-daylight"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 255,
              "color": "#aebfc0",
              "shape": "ellipse",
              "width": 2050,
              "height": 300,
              "softness": 0.82,
              "direction": 0,
              "density": 0.085,
              "scale": 1.15,
              "driftSpeed": 5,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.42,
              "depthCurve": 1.35,
              "floorBias": -0.25,
              "depthBias": 0.05,
              "id": "umbria-lake-haze",
              "layer": "environment",
              "name": "umbria-lake-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.12,
          "threshold": 1.08,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#ffe6a2",
              "shape": "rectangle",
              "width": 1950,
              "height": 390,
              "softness": 0.6,
              "direction": -15,
              "count": 145,
              "size": 1.8,
              "sizeVariation": 0.58,
              "speed": 7,
              "turbulence": 0.75,
              "lifetime": 24,
              "opacity": 0.2,
              "glow": 0.18,
              "gravity": -0.08,
              "randomness": 0.84,
              "depth": 0.7,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 3,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.5,
              "distribution": "volume",
              "id": "umbria-pollen",
              "name": "umbria-pollen"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.05,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0025": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.01,
          "contrast": 1.08,
          "highlights": -0.08,
          "shadows": 0.05,
          "saturation": 1.02,
          "warmth": 0.07,
          "tint": 0.01,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 310,
              "y": 430,
              "color": "#ffc276",
              "radius": 180,
              "intensity": 0.82,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "florence-left-lamp",
              "layer": "effects",
              "name": "florence-left-lamp"
            },
            {
              "enabled": true,
              "x": 1080,
              "y": 432,
              "color": "#ffc276",
              "radius": 195,
              "intensity": 0.92,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "florence-center-lamp",
              "layer": "effects",
              "name": "florence-center-lamp"
            },
            {
              "enabled": true,
              "x": 1840,
              "y": 420,
              "color": "#ffc276",
              "radius": 180,
              "intensity": 0.82,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "florence-right-lamp",
              "layer": "effects",
              "name": "florence-right-lamp"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 130,
              "color": "#a995ad",
              "shape": "ellipse",
              "width": 2100,
              "height": 1050,
              "softness": 0.88,
              "direction": 76,
              "intensity": 0.24,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "florence-evening",
              "layer": "globalLighting",
              "name": "florence-evening"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 330,
              "color": "#887d8c",
              "shape": "ellipse",
              "width": 2050,
              "height": 450,
              "softness": 0.82,
              "direction": 0,
              "density": 0.1,
              "scale": 1.15,
              "driftSpeed": 3,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.08,
              "depthBias": 0.05,
              "id": "florence-evening-haze",
              "layer": "environment",
              "name": "florence-evening-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.32,
          "threshold": 0.72,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 360,
              "color": "#d5bd8c",
              "shape": "rectangle",
              "width": 1950,
              "height": 420,
              "softness": 0.6,
              "direction": 0,
              "count": 170,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.14,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "florence-air-dust",
              "name": "florence-air-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.12,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0026": {
      "spriteScale": 1.5,
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": 0.02,
          "contrast": 1.1,
          "highlights": -0.08,
          "shadows": 0.05,
          "saturation": 1.02,
          "warmth": 0.03,
          "tint": -0.02,
          "blackPoint": 0.018
        },
        "localLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 470,
              "y": 445,
              "color": "#ffb968",
              "radius": 220,
              "intensity": 1.05,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "fire",
              "flickerAmount": 0.08,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "vinci-desk-lamp",
              "layer": "effects",
              "name": "vinci-desk-lamp"
            },
            {
              "enabled": true,
              "x": 1160,
              "y": 430,
              "color": "#ffc477",
              "radius": 190,
              "intensity": 0.82,
              "falloff": 1.45,
              "aspect": 1,
              "softness": 0.72,
              "behavior": "steady",
              "flickerAmount": 0.18,
              "flickerSpeed": 2,
              "randomness": 0.8,
              "colorSpill": 0.62,
              "characterInfluence": 0.9,
              "atmosphereInfluence": 1,
              "depth": 0.65,
              "depthInfluence": 1,
              "depthSoftness": 0.12,
              "depthBias": 0.06,
              "id": "vinci-workshop-lamp",
              "layer": "effects",
              "name": "vinci-workshop-lamp"
            }
          ]
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1880,
              "y": 150,
              "color": "#789fd1",
              "shape": "ellipse",
              "width": 1750,
              "height": 900,
              "softness": 0.88,
              "direction": 112,
              "intensity": 0.34,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "vinci-moonlight",
              "layer": "globalLighting",
              "name": "vinci-moonlight"
            }
          ]
        },
        "shafts": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1900,
              "y": 120,
              "color": "#9dbce2",
              "direction": 132,
              "length": 920,
              "width": 210,
              "intensity": 0.28,
              "softness": 0.82,
              "density": 0.42,
              "decay": 1.5,
              "noiseAmount": 0.3,
              "noiseScale": 1.2,
              "noiseSpeed": 0.06,
              "depth": 0.45,
              "depthInfluence": 0.8,
              "depthSoftness": 0.2,
              "atmosphereInfluence": 1.1,
              "layer": "globalLighting",
              "id": "vinci-moon-shaft",
              "name": "vinci-moon-shaft"
            }
          ]
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#6f7682",
              "shape": "ellipse",
              "width": 2000,
              "height": 470,
              "softness": 0.82,
              "direction": 0,
              "density": 0.13,
              "scale": 1.15,
              "driftSpeed": 3,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.18,
              "depthCurve": 1.35,
              "floorBias": 0.12,
              "depthBias": 0.05,
              "id": "vinci-workshop-haze",
              "layer": "environment",
              "name": "vinci-workshop-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.34,
          "threshold": 0.66,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 350,
              "color": "#d5bd8c",
              "shape": "rectangle",
              "width": 1950,
              "height": 430,
              "softness": 0.6,
              "direction": 0,
              "count": 300,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.45,
              "lifetime": 30,
              "opacity": 0.2,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 1,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "vinci-dust",
              "name": "vinci-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": true,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.9,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.15,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0028": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.08,
          "contrast": 1.05,
          "highlights": -0.22,
          "shadows": 0.04,
          "saturation": 1.01,
          "warmth": 0.12,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 120,
              "y": 80,
              "color": "#ffe1a0",
              "shape": "ellipse",
              "width": 2400,
              "height": 1050,
              "softness": 0.72,
              "direction": 42,
              "intensity": 0.62,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "giza-hard-sun",
              "layer": "globalLighting",
              "name": "giza-hard-sun"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1200,
              "y": 245,
              "color": "#d7b982",
              "shape": "ellipse",
              "width": 2050,
              "height": 300,
              "softness": 0.82,
              "direction": 0,
              "density": 0.08,
              "scale": 1.15,
              "driftSpeed": 4,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.48,
              "depthCurve": 1.35,
              "floorBias": -0.28,
              "depthBias": 0.05,
              "id": "giza-dry-distance",
              "layer": "environment",
              "name": "giza-dry-distance"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.14,
          "threshold": 1.08,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 360,
              "color": "#d8b270",
              "shape": "rectangle",
              "width": 2100,
              "height": 430,
              "softness": 0.6,
              "direction": -5,
              "count": 560,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.62,
              "lifetime": 30,
              "opacity": 0.2,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 10,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "giza-dust",
              "name": "giza-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.055,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 2,
              "y": 3,
              "color": "#ffe1a0",
              "direction": 48,
              "spread": 54,
              "rayCount": 7,
              "rayWidth": 0.42,
              "widthVariation": 0.6,
              "spacingVariation": 0.48,
              "rayMotion": 0,
              "motionSpeed": 0.14,
              "fadeVariation": 0.25,
              "length": 1050,
              "intensity": 0.38,
              "softness": 0.78,
              "feather": 0.42,
              "decay": 1,
              "breakup": 0.48,
              "noiseScale": 1.2,
              "noiseAmount": 0.38,
              "noiseSpeed": 0.1,
              "atmosphereInfluence": 1.15,
              "depth": 0.45,
              "depthInfluence": 0.7,
              "depthSoftness": 0.2,
              "id": "giza-sun-rays",
              "layer": "globalLighting",
              "name": "giza-sun-rays"
            }
          ]
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    },
    "LVL-0030": {
      "cinematicLighting": {
        "version": 3,
        "layers": {
          "environment": true,
          "globalLighting": true,
          "effects": true,
          "characters": true
        },
        "grading": {
          "enabled": true,
          "exposure": -0.07,
          "contrast": 1.06,
          "highlights": -0.2,
          "shadows": 0.04,
          "saturation": 1.01,
          "warmth": 0.11,
          "tint": 0,
          "blackPoint": 0.01
        },
        "localLights": {
          "enabled": false,
          "items": []
        },
        "areaLights": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 120,
              "y": 75,
              "color": "#ffdfa0",
              "shape": "ellipse",
              "width": 2400,
              "height": 1050,
              "softness": 0.74,
              "direction": 44,
              "intensity": 0.6,
              "falloff": 1.25,
              "depth": 0.62,
              "depthInfluence": 0.72,
              "depthSoftness": 0.18,
              "id": "abu-simbel-sun",
              "layer": "globalLighting",
              "name": "abu-simbel-sun"
            }
          ]
        },
        "shafts": {
          "enabled": false,
          "items": []
        },
        "atmosphere": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1180,
              "y": 250,
              "color": "#d4b47d",
              "shape": "ellipse",
              "width": 2100,
              "height": 310,
              "softness": 0.82,
              "direction": 0,
              "density": 0.085,
              "scale": 1.15,
              "driftSpeed": 4,
              "driftDirection": 0,
              "turbulence": 0.24,
              "noiseScale": 1.25,
              "noiseDetail": 4,
              "depthInfluence": 0.82,
              "nearClear": 0.9,
              "farDensity": 1.5,
              "depthCurve": 1.35,
              "floorBias": -0.28,
              "depthBias": 0.05,
              "id": "abu-simbel-dry-haze",
              "layer": "environment",
              "name": "abu-simbel-dry-haze"
            }
          ]
        },
        "bloom": {
          "enabled": true,
          "intensity": 0.14,
          "threshold": 1.08,
          "softKnee": 0.24,
          "radius": 8,
          "falloff": 1.5,
          "colorInfluence": 0.82,
          "localContribution": 0.45
        },
        "particles": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 1086,
              "y": 360,
              "color": "#d6ad6b",
              "shape": "rectangle",
              "width": 2100,
              "height": 430,
              "softness": 0.6,
              "direction": -4,
              "count": 500,
              "size": 0.8,
              "sizeVariation": 0.6,
              "speed": 4,
              "turbulence": 0.58,
              "lifetime": 30,
              "opacity": 0.19,
              "glow": 0,
              "gravity": 0,
              "randomness": 0.82,
              "depth": 0.65,
              "depthInfluence": 0.82,
              "depthSoftness": 0.14,
              "layer": "environment",
              "wind": 9,
              "streak": 1,
              "pulse": 0,
              "depthSpread": 0.35,
              "distribution": "volume",
              "id": "abu-simbel-dust",
              "name": "abu-simbel-dust"
            }
          ]
        },
        "characters": {
          "enabled": true,
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
          "localInfluence": 0.68,
          "colorSpill": 0.62,
          "intensityResponse": 0.58,
          "directionalInfluence": 0.72,
          "atmosphereInfluence": 0.55,
          "depthTint": 0.14,
          "grounding": 0.12,
          "sideLighting": 0.66,
          "frontAtmosphere": 0.4
        },
        "wrap": {
          "enabled": true,
          "strength": 0.08,
          "radius": 2,
          "colorInfluence": 0.64
        },
        "rim": {
          "enabled": false,
          "strength": 0.08,
          "width": 1.5,
          "colorResponse": 0.72,
          "localInfluence": 0.72,
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
          "enabled": true,
          "intensity": 0.06,
          "softness": 0.78,
          "finalExposure": 0,
          "finalContrast": 1.02
        },
        "godRays": {
          "enabled": true,
          "items": [
            {
              "enabled": true,
              "x": 7,
              "y": 1,
              "color": "#ffe2a6",
              "direction": 48,
              "spread": 55,
              "rayCount": 7,
              "rayWidth": 0.42,
              "widthVariation": 0.6,
              "spacingVariation": 0.48,
              "rayMotion": 0,
              "motionSpeed": 0.14,
              "fadeVariation": 0.25,
              "length": 1080,
              "intensity": 0.4,
              "softness": 0.72,
              "feather": 0.42,
              "decay": 1,
              "breakup": 0.48,
              "noiseScale": 1.2,
              "noiseAmount": 0.38,
              "noiseSpeed": 0.1,
              "atmosphereInfluence": 1.15,
              "depth": 0.45,
              "depthInfluence": 0.7,
              "depthSoftness": 0.2,
              "id": "abu-simbel-rays",
              "layer": "globalLighting",
              "name": "abu-simbel-rays"
            }
          ]
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
          "intensity": 0.9,
          "characterInfluence": 0.9
        },
        "depth": {
          "enabled": true,
          "filterRadius": 1.5,
          "perspective": 0.035
        }
      }
    }
  },
  "locomotion": {
    "fromIdleMovement": 0.15,
    "toIdleMovement": 0.05,
    "toIdleMaxDistance": 5,
    "stopEntryDistance": 35,
    "shortMoveThreshold": 25,
    "shortMoveAnimationSpeed": 3,
    "shortMoveStartFrame": 0.25,
    "shortMoveMaxFromIdleAnimation": 0.35,
    "fromIdleAnimationSpeed": 2,
    "blinkMinimumInterval": 1000,
    "blinkMaximumInterval": 3000
  }
};
