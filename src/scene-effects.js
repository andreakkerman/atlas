(function () {
  "use strict";

  const VERSION = 1;
  const LAYER_SLOTS = Object.freeze([
    "backgroundAtmosphere",
    "worldAtmosphere",
    "worldLight",
    "foregroundAtmosphere"
  ]);
  const GEOMETRY_TYPES = Object.freeze([
    "point",
    "pointRadius",
    "rectangle",
    "ellipse",
    "polygon",
    "directionalEmitter",
    "directionalBeam"
  ]);
  const QUALITY = Object.freeze({
    high: { particles: 1, layers: 1, blur: 1, segments: 1, updateFps: 60 },
    balanced: { particles: 0.68, layers: 0.72, blur: 0.72, segments: 0.72, updateFps: 40 },
    reduced: { particles: 0.38, layers: 0.45, blur: 0.48, segments: 0.45, updateFps: 24 }
  });
  const CONTROL_DEFS = Object.freeze({
    intensity: { label: "Intensity", min: 0, max: 1.5, step: 0.01, section: "quick" },
    amount: { label: "Amount / density", min: 0, max: 2, step: 0.01, section: "quick" },
    speed: { label: "Speed", min: 0, max: 3, step: 0.01, section: "quick" },
    size: { label: "Size", min: 0.1, max: 3, step: 0.01, section: "quick" },
    directionDeg: { label: "Direction", min: -180, max: 360, step: 1, section: "quick" },
    glow: { label: "Glow", min: 0, max: 2, step: 0.01, section: "quick" },
    softness: { label: "Softness", min: 0, max: 2, step: 0.01, section: "quick" },
    opacity: { label: "Opacity", min: 0, max: 1, step: 0.01, section: "quick" },
    lifetime: { label: "Lifetime", min: 0.1, max: 20, step: 0.1, section: "advanced" },
    variance: { label: "Variance", min: 0, max: 2, step: 0.01, section: "advanced" },
    turbulence: { label: "Turbulence", min: 0, max: 3, step: 0.01, section: "advanced" },
    acceleration: { label: "Acceleration / gravity", min: -3, max: 3, step: 0.01, section: "advanced" },
    oscillation: { label: "Oscillation", min: 0, max: 3, step: 0.01, section: "advanced" },
    fadeIn: { label: "Fade in", min: 0, max: 1, step: 0.01, section: "advanced" },
    fadeOut: { label: "Fade out", min: 0, max: 1, step: 0.01, section: "advanced" },
    edgeFeatherPx: { label: "Edge feather", min: 0, max: 160, step: 1, section: "advanced" },
    pulseAmount: { label: "Pulse amount", min: 0, max: 1, step: 0.01, section: "advanced" },
    pulseRate: { label: "Pulse rate", min: 0, max: 6, step: 0.01, section: "advanced" },
    windStrength: { label: "Wind strength", min: -2, max: 2, step: 0.01, section: "advanced" },
    plumeExpansion: { label: "Plume expansion", min: 0, max: 3, step: 0.01, section: "advanced" },
    startWidth: { label: "Start width", min: 1, max: 600, step: 1, section: "advanced" },
    endWidth: { label: "End width", min: 1, max: 1200, step: 1, section: "advanced" },
    particleCap: { label: "Particle cap", min: 1, max: 500, step: 1, section: "expert" },
    depthBands: { label: "Depth bands", min: 1, max: 6, step: 1, section: "expert" },
    highlightDensity: { label: "Highlight density", min: 0, max: 2, step: 0.01, section: "expert" },
    burstiness: { label: "Burstiness", min: 0, max: 1, step: 0.01, section: "expert" },
    flickerAmount: { label: "Flicker amount", min: 0, max: 1, step: 0.01, section: "advanced" },
    sparkAmount: { label: "Spark amount", min: 0, max: 1, step: 0.01, section: "advanced" },
    warmth: { label: "Warmth", min: 0, max: 1, step: 0.01, section: "advanced" },
    bloomStrength: { label: "Bloom strength", min: 0, max: 2, step: 0.01, section: "quick" },
    rayStrength: { label: "Ray strength", min: 0, max: 2, step: 0.01, section: "quick" },
    rayCount: { label: "Ray count", min: 4, max: 24, step: 1, section: "advanced" },
    rayStartAngle: { label: "Ray start angle", min: -360, max: 360, step: 1, section: "quick" },
    rayEndAngle: { label: "Ray end angle", min: -360, max: 360, step: 1, section: "quick" },
    rayAnimationAmount: { label: "Ray animation amount", min: 0, max: 3, step: 0.01, section: "advanced" },
    rayDriftSpeed: { label: "Ray drift speed", min: 0, max: 3, step: 0.01, section: "advanced" },
    rayPulseSpeed: { label: "Ray pulse speed", min: 0, max: 3, step: 0.01, section: "advanced" },
    raySpreadBreathing: { label: "Ray spread breathing", min: 0, max: 3, step: 0.01, section: "advanced" },
    rayWobbleAmount: { label: "Ray wobble amount", min: 0, max: 3, step: 0.01, section: "advanced" },
    dustAmount: { label: "Dust amount", min: 0, max: 1.5, step: 0.01, section: "advanced" },
    heatShimmerStrength: { label: "Heat shimmer", min: 0, max: 1.5, step: 0.01, section: "advanced" },
    animationSpeed: { label: "Animation speed", min: 0, max: 3, step: 0.01, section: "advanced" }
  });

  const CATEGORIES = Object.freeze([
    "Light and fire", "Magic", "Atmosphere", "Smoke and steam", "Water",
    "Nature", "Surfaces", "Weather", "Shadows"
  ]);

  function variant(id, name, overrides = {}) {
    return { id, name, overrides };
  }

  function preset(config) {
    const controls = [...new Set(config.controls || [])];
    const definition = {
      version: VERSION,
      performance: "Low",
      recommendedBudget: 80,
      hardCap: 160,
      layerSlot: "worldAtmosphere",
      blendMode: "source-over",
      colors: {
        primaryColor: "#FFF0B0",
        secondaryColor: "#F5A13A",
        glowColor: "#FFD36A",
        tintColor: "#FFFFFF"
      },
      defaults: {
        intensity: 0.65, amount: 0.6, speed: 0.7, size: 1, directionDeg: -90,
        glow: 0.55, softness: 0.65, opacity: 0.7, lifetime: 4, variance: 0.45,
        turbulence: 0.35, acceleration: 0, oscillation: 0.3, fadeIn: 0.18,
        fadeOut: 0.28, edgeFeatherPx: 22, pulseAmount: 0.12, pulseRate: 0.7,
        windStrength: 0.12, plumeExpansion: 0.55, startWidth: 40, endWidth: 150,
        particleCap: 80, depthBands: 3, highlightDensity: 0.65, burstiness: 0.2,
        flickerAmount: 0.18, sparkAmount: 0.08, warmth: 0.7,
        particleShape: "softDot", motionProfile: "windDrift", emissive: false,
        glowProfile: "soft"
      },
      bestFor: "General atmospheric detail.",
      avoidFor: "Scenes where a more specific effect communicates better.",
      visualSignature: "Soft marks with gentle motion.",
      qualityScale: { high: 1, balanced: 0.68, reduced: 0.38 },
      reducedMotion: { speed: 0.18, amount: 0.48, pulseAmount: 0.22, flickerAmount: 0.2 },
      geometryTypes: ["pointRadius"],
      defaultGeometry: { type: "pointRadius", x: 500, y: 350, radius: 120 },
      controls,
      ...config
    };
    definition.hardRanges = Object.fromEntries(controls
      .filter((field) => CONTROL_DEFS[field])
      .map((field) => [field, { min: CONTROL_DEFS[field].min, max: CONTROL_DEFS[field].max }]));
    definition.recommendedRanges = Object.fromEntries(controls
      .filter((field) => CONTROL_DEFS[field] && Number.isFinite(definition.defaults[field]))
      .map((field) => {
        const range = CONTROL_DEFS[field];
        const value = definition.defaults[field];
        const span = Math.max(range.step, (range.max - range.min) * 0.18);
        return [field, {
          min: Math.max(range.min, Number((value - span).toFixed(3))),
          max: Math.min(range.max, Number((value + span).toFixed(3)))
        }];
      }));
    return Object.freeze(definition);
  }

  const PRESETS = Object.freeze({
    "light-source-enhancement": preset({
      id: "light-source-enhancement", name: "Light source enhancement", category: "Light and fire",
      description: "Flicker, warm glow, light spill and restrained sparks for painted lights.",
      bestFor: "Torches, candles, lanterns, braziers, warm windows and beacons.",
      avoidFor: "Magical runes, broad fog, water, or effects that should move freely.",
      visualSignature: "Warm object-bound glow with controlled flicker and rare upward sparks.",
      renderer: "glowField", layerSlot: "worldLight", geometryTypes: ["point", "pointRadius", "ellipse"],
      variants: [
        variant("wall-torch", "Wall torch", { intensity: 1.05, size: 0.9, glow: 1.05, flickerAmount: 0.3, sparkAmount: 0.14, pulseRate: 1.0 }),
        variant("large-brazier", "Large brazier", { intensity: 1.08, size: 1.42, glow: 1.05, sparkAmount: 0.24, pulseRate: 0.8 }),
        variant("candle", "Candle", { intensity: 0.58, size: 0.5, flickerAmount: 0.16, sparkAmount: 0.025, glow: 0.52 }),
        variant("lantern", "Lantern", { intensity: 0.78, flickerAmount: 0.08, sparkAmount: 0, pulseAmount: 0.055, softness: 0.72, glow: 0.68 }),
        variant("window-glow", "Window glow", { intensity: 0.72, softness: 0.95, glow: 0.55, sparkAmount: 0, pulseAmount: 0.04 }),
        variant("beacon", "Beacon", { intensity: 1.12, size: 1.72, glow: 1.08, sparkAmount: 0.14, pulseRate: 0.35, pulseAmount: 0.2 })
      ],
      defaults: { ...preset({}).defaults, intensity: 0.88, amount: 0.72, glow: 0.88, softness: 0.52, opacity: 0.86, particleCap: 92, glowProfile: "warmFlicker", emissive: true, particleShape: "ember", motionProfile: "upwardEmber" },
      controls: ["intensity", "amount", "speed", "size", "glow", "softness", "flickerAmount", "sparkAmount", "warmth", "pulseRate", "particleCap"]
    }),
    "sun-presence": preset({
      id: "sun-presence", name: "Sun Presence", category: "Light and fire",
      description: "Cinematic sun bloom with soft core, broad rays, warm air glow, shimmer and quiet sun dust.",
      bestFor: "Visible sky suns, off-frame daylight sources, golden-hour scenes and warm atmospheric light.",
      avoidFor: "Torches, magical runes, sparks, smoke, fireflies or tiny object-bound glow.",
      visualSignature: "Readable warm sun source with directional soft rays, organic shimmer and fine drifting dust.",
      renderer: "sunPresence", layerSlot: "worldLight", blendMode: "screen", geometryTypes: ["pointRadius"],
      defaultGeometry: { type: "pointRadius", x: 260, y: 120, radius: 250 },
      variants: [
        variant("warm-day-sun", "Warm day sun", { intensity: 0.98, bloomStrength: 0.9, rayStrength: 1.24, rayCount: 10, rayStartAngle: -38, rayEndAngle: 34, rayAnimationAmount: 2, rayDriftSpeed: 1.85, rayPulseSpeed: 1.75, raySpreadBreathing: 2, rayWobbleAmount: 1.9, dustAmount: 0.28, heatShimmerStrength: 0.26, warmth: 0.62, animationSpeed: 0.92 }),
        variant("golden-hour-sun", "Golden hour sun", { primaryColor: "#FFF0B2", secondaryColor: "#FFC45E", glowColor: "#FF8C3E", intensity: 1.12, bloomStrength: 1.06, rayStrength: 1.58, rayCount: 9, rayStartAngle: -24, rayEndAngle: 54, rayAnimationAmount: 2.35, rayDriftSpeed: 1.55, rayPulseSpeed: 1.65, raySpreadBreathing: 2.4, rayWobbleAmount: 2.2, dustAmount: 0.38, heatShimmerStrength: 0.34, warmth: 0.94, directionDeg: 14, animationSpeed: 0.86 }),
        variant("soft-evening-sun", "Soft evening sun", { primaryColor: "#FFE1B0", secondaryColor: "#FFB16E", glowColor: "#FF7A68", intensity: 0.78, bloomStrength: 0.72, rayStrength: 0.92, rayCount: 8, rayStartAngle: -30, rayEndAngle: 42, rayAnimationAmount: 1.35, rayDriftSpeed: 1.05, rayPulseSpeed: 1.12, raySpreadBreathing: 1.28, rayWobbleAmount: 1.2, dustAmount: 0.18, heatShimmerStrength: 0.16, warmth: 0.84, opacity: 0.7, directionDeg: 8, animationSpeed: 0.68 })
      ],
      defaults: {
        ...preset({}).defaults,
        intensity: 0.98, amount: 0.62, speed: 0.42, size: 1, directionDeg: -3,
        glow: 1.08, softness: 0.9, opacity: 0.82, lifetime: 13, variance: 0.55,
        turbulence: 0.28, oscillation: 0.24, fadeIn: 0.22, fadeOut: 0.28,
        particleCap: 64, depthBands: 3, bloomStrength: 0.9, rayStrength: 1.24,
        rayCount: 10, rayStartAngle: -38, rayEndAngle: 34, rayAnimationAmount: 2,
        rayDriftSpeed: 1.85, rayPulseSpeed: 1.75, raySpreadBreathing: 2, rayWobbleAmount: 1.9,
        dustAmount: 0.28, heatShimmerStrength: 0.26, animationSpeed: 0.92,
        particleShape: "dustSpeck", motionProfile: "windDrift", emissive: false, glowProfile: "sunPresence"
      },
      colors: {
        primaryColor: "#FFF3B7",
        secondaryColor: "#FFD06B",
        glowColor: "#FF9B42",
        tintColor: "#FFE2A0"
      },
      performance: "Medium",
      recommendedBudget: 96,
      hardCap: 150,
      qualityScale: { high: 1, balanced: 0.8, reduced: 0.58 },
      reducedMotion: {
        speed: 0.1, amount: 0.35, dustAmount: 0.24, heatShimmerStrength: 0,
        rayStrength: 0.82, animationSpeed: 0.08, pulseAmount: 0.22,
        rayAnimationAmount: 0.18, rayDriftSpeed: 0.24, rayPulseSpeed: 0.2,
        raySpreadBreathing: 0.24, rayWobbleAmount: 0.32
      },
      controls: [
        "intensity", "bloomStrength", "rayStrength", "rayStartAngle", "rayEndAngle",
        "rayCount", "rayAnimationAmount", "rayDriftSpeed", "rayPulseSpeed",
        "raySpreadBreathing", "rayWobbleAmount", "dustAmount", "heatShimmerStrength",
        "warmth", "animationSpeed", "opacity", "particleCap"
      ]
    }),
    "magical-glow": preset({
      id: "magical-glow", name: "Magical glow", category: "Magic",
      description: "Emissive core, soft bloom, controlled pulse and optional motes.",
      bestFor: "Runes, crystals, portals, altars and magical locks.",
      avoidFor: "Natural insects, dust, smoke, fire sources or generic water sparkle.",
      visualSignature: "Cool object-bound pulse with small orbiting energy flecks.",
      renderer: "glowField", layerSlot: "worldLight", geometryTypes: ["pointRadius", "ellipse", "polygon"],
      variants: [
        variant("rune", "Rune", { primaryColor: "#65E7FF", secondaryColor: "#B7F9FF", glowColor: "#4A8EFF", pulseRate: 0.58, pulseAmount: 0.2, particleShape: "sparkle" }),
        variant("crystal", "Crystal", { primaryColor: "#BDEEFF", glowColor: "#8C86FF", pulseRate: 0.46, particleShape: "sparkle", amount: 0.5, glow: 1.16 }),
        variant("sacred", "Sacred", { primaryColor: "#FFF2A6", secondaryColor: "#FFFFFF", glowColor: "#9CF2E9", pulseRate: 0.34, pulseAmount: 0.08 }),
        variant("arcane", "Arcane", { primaryColor: "#A98BFF", secondaryColor: "#8DEAFF", glowColor: "#735BFF", pulseRate: 0.58, pulseAmount: 0.18 }),
        variant("warning", "Warning", { primaryColor: "#FF695C", glowColor: "#D72B3F", pulseRate: 0.85, pulseAmount: 0.16 }),
        variant("portal", "Portal", { intensity: 1.05, pulseAmount: 0.28, pulseRate: 0.32, size: 1.4, amount: 0.65 })
      ],
      defaults: { ...preset({}).defaults, intensity: 0.88, amount: 0.46, speed: 0.45, glow: 1.08, opacity: 0.86, sparkAmount: 0, particleCap: 38, particleShape: "sparkle", motionProfile: "orbitFocus", emissive: true, glowProfile: "magicalPulse" },
      controls: ["intensity", "amount", "speed", "size", "glow", "softness", "pulseAmount", "pulseRate", "particleCap"]
    }),
    "ambient-floating-particles": preset({
      id: "ambient-floating-particles", name: "Ambient floating particles", category: "Atmosphere",
      description: "Layered environmental particles with organic drift and soft fades.",
      bestFor: "Sunlit forests, meadows, old ruins, dusty interiors and soft air movement.",
      avoidFor: "Fire sources, living insects, magical objects, bubbles or smoke plumes.",
      visualSignature: "Non-glowing flecks drifting with wind and depth.",
      renderer: "particleField", geometryTypes: ["rectangle", "ellipse", "polygon"],
      defaultGeometry: { type: "rectangle", x: 500, y: 340, width: 620, height: 300 },
      variants: [
        variant("warm-pollen", "Warm pollen", { primaryColor: "#FFE08A", secondaryColor: "#FFF6C7", particleShape: "elongatedMote", amount: 0.68, speed: 0.4, size: 0.78, glow: 0, opacity: 0.66 }),
        variant("sun-dust", "Sun dust", { primaryColor: "#FFF1C8", secondaryColor: "#FFF8DD", particleShape: "dustSpeck", amount: 0.48, size: 0.64, speed: 0.24, glow: 0, opacity: 0.58 }),
        variant("fine-ancient-dust", "Fine ancient dust", { primaryColor: "#D2C8B6", secondaryColor: "#F2E7D5", particleShape: "dustSpeck", amount: 0.38, size: 0.54, speed: 0.18, glow: 0, opacity: 0.46, turbulence: 0.2 }),
        variant("spores", "Spores", { primaryColor: "#D8F6AD", secondaryColor: "#F4FFD0", particleShape: "softDot", amount: 0.46, speed: 0.28, size: 0.96, glow: 0.06, opacity: 0.62 }),
        variant("magic-motes", "Magic motes", { primaryColor: "#8DEAFF", secondaryColor: "#D8FBFF", glowColor: "#7D8CFF", particleShape: "sparkle", motionProfile: "orbitFocus", emissive: true, amount: 0.36, speed: 0.38, glow: 1.12, opacity: 0.84, particleCap: 42 }),
        variant("ash-drift", "Ash drift", { primaryColor: "#9A918A", secondaryColor: "#C2B5AA", particleShape: "ashFlake", motionProfile: "ashDrift", acceleration: 0.24, directionDeg: 112, amount: 0.46, speed: 0.3, glow: 0, opacity: 0.54 })
      ],
      defaults: { ...preset({}).defaults, amount: 0.58, speed: 0.32, size: 0.74, glow: 0, opacity: 0.62, lifetime: 8, turbulence: 0.28, acceleration: 0, particleCap: 72, particleShape: "dustSpeck", motionProfile: "windDrift", emissive: false },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "softness", "lifetime", "variance", "turbulence", "acceleration", "oscillation", "fadeIn", "fadeOut", "particleCap", "depthBands"]
    }),
    "sparks-and-embers": preset({
      id: "sparks-and-embers", name: "Sparks and embers", category: "Light and fire",
      description: "Short-lived bright fire particles with lift, bursts and speed variation.",
      bestFor: "Torches, braziers, forges, campfires and magical fire sources.",
      avoidFor: "Fireflies, pollen, steady magical glows or broad atmosphere.",
      visualSignature: "Source-bound hot sparks that rise, burst, dim and disappear quickly.",
      renderer: "particleField", blendMode: "lighter", geometryTypes: ["point", "pointRadius", "directionalEmitter"],
      variants: [
        variant("rising-sparks", "Rising sparks", { particleShape: "sparkle", lifetime: 1.35, speed: 1.12, amount: 0.62, burstiness: 0.38 }),
        variant("floating-embers", "Floating embers", { particleShape: "ember", lifetime: 3.8, speed: 0.48, amount: 0.44, size: 0.95, burstiness: 0.1 }),
        variant("forge-sparks", "Forge sparks", { particleShape: "sparkle", speed: 1.9, amount: 0.58, burstiness: 0.82, directionDeg: -25, lifetime: 0.95, acceleration: -0.15 }),
        variant("magical-sparks", "Magical sparks", { primaryColor: "#76E8FF", secondaryColor: "#FFFFFF", glowColor: "#A98BFF", particleShape: "sparkle", burstiness: 0.45 })
      ],
      defaults: { ...preset({}).defaults, amount: 0.58, speed: 1.0, lifetime: 1.65, acceleration: -0.42, glow: 1.18, opacity: 0.82, particleCap: 66, particleShape: "ember", motionProfile: "upwardEmber", emissive: true, fadeIn: 0.03, fadeOut: 0.48 },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "lifetime", "variance", "turbulence", "acceleration", "fadeIn", "fadeOut", "burstiness", "particleCap"]
    }),
    "living-lights": preset({
      id: "living-lights", name: "Living lights", category: "Nature",
      description: "Autonomous glowing points with wandering paths and irregular pulses.",
      bestFor: "Fireflies, wisps, cave insects and gentle spirit lights.",
      avoidFor: "Pollen, dust, embers, sparks, bubbles or object-bound rune magic.",
      visualSignature: "Few individual glowing cores that pause, wander and pulse like living lights.",
      renderer: "particleField", blendMode: "lighter", geometryTypes: ["ellipse", "polygon", "rectangle"],
      defaultGeometry: { type: "ellipse", x: 500, y: 340, width: 520, height: 260 },
      variants: [
        variant("forest-fireflies", "Forest fireflies", { primaryColor: "#EDFF7A", secondaryColor: "#FFF9B8", particleShape: "fireflyCore", amount: 0.26, size: 1.08 }),
        variant("golden-wisps", "Golden wisps", { primaryColor: "#FFD36A", secondaryColor: "#FFF0A6", size: 1.45, amount: 0.24, oscillation: 1.6 }),
        variant("blue-spirit-lights", "Blue spirit lights", { primaryColor: "#73E9FF", secondaryColor: "#D8FBFF", glowColor: "#6C87FF", size: 1.28, pulseAmount: 0.22 }),
        variant("cave-glow-insects", "Cave glow insects", { primaryColor: "#9CF2E9", secondaryColor: "#E4FFF9", amount: 0.24, size: 0.82 })
      ],
      defaults: { ...preset({}).defaults, amount: 0.24, speed: 0.3, size: 1.08, opacity: 0.88, lifetime: 12, oscillation: 1.4, particleCap: 30, glow: 1.35, pulseAmount: 0.28, pulseRate: 0.46, particleShape: "fireflyCore", motionProfile: "livingWander", emissive: true },
      controls: ["intensity", "amount", "speed", "size", "glow", "softness", "lifetime", "variance", "turbulence", "oscillation", "pulseAmount", "pulseRate", "particleCap"]
    }),
    "atmospheric-fog": preset({
      id: "atmospheric-fog", name: "Atmospheric fog", category: "Atmosphere",
      description: "Layered non-repeating mist fields with falloff, drift and feathered masks.",
      bestFor: "Forest mist, harbor haze, cold temple fog, moonlit fog and distant haze.",
      avoidFor: "Chimneys, torches, vents, steam sources or any source-bound plume.",
      visualSignature: "Broad soft horizontal fields with slow layered drift and vertical falloff.",
      renderer: "fogField", layerSlot: "backgroundAtmosphere", geometryTypes: ["rectangle", "ellipse", "polygon"],
      defaultGeometry: { type: "rectangle", x: 500, y: 420, width: 760, height: 260 },
      variants: [
        variant("low-ground-mist", "Low ground mist", { opacity: 0.52, depthBands: 4, speed: 0.12 }),
        variant("harbor-haze", "Harbor haze", { tintColor: "#C6D6D7", directionDeg: -8, speed: 0.18, opacity: 0.55 }),
        variant("forest-mist", "Forest mist", { tintColor: "#B8CCB0", opacity: 0.52, softness: 0.88 }),
        variant("cold-temple-fog", "Cold temple fog", { tintColor: "#B6C9DE", opacity: 0.5, speed: 0.1 }),
        variant("distant-atmospheric-haze", "Distant atmospheric haze", { intensity: 0.35, softness: 1.2, amount: 0.48, depthBands: 2 }),
        variant("moonlit-fog", "Moonlit fog", { tintColor: "#A7BCE3", opacity: 0.48, speed: 0.12 })
      ],
      defaults: { ...preset({}).defaults, amount: 0.72, speed: 0.14, softness: 0.92, opacity: 0.54, turbulence: 0.2, oscillation: 0.16, edgeFeatherPx: 30, depthBands: 4 },
      performance: "Medium",
      recommendedBudget: 96,
      hardCap: 180,
      qualityScale: { high: 1, balanced: 0.78, reduced: 0.5 },
      controls: ["intensity", "amount", "speed", "directionDeg", "softness", "opacity", "variance", "turbulence", "oscillation", "edgeFeatherPx", "depthBands"]
    }),
    "smoke-and-steam": preset({
      id: "smoke-and-steam", name: "Smoke and steam", category: "Smoke and steam",
      hiddenFromLibrary: true,
      description: "Source-driven plumes with rise, widening, wind, turbulence and pulse emission.",
      bestFor: "Chimneys, torch smoke, harbor smoke, steam vents, fountain mist and source plumes.",
      avoidFor: "Broad ground fog, pollen, fireflies, water shimmer or object glow.",
      visualSignature: "Emitter-based plume blobs that rise from a source, widen and fade.",
      renderer: "plumeEmitter", geometryTypes: ["directionalEmitter"],
      defaultGeometry: { type: "directionalEmitter", x: 500, y: 420, directionDeg: -90, spreadDeg: 18, width: 26 },
      variants: [
        variant("chimney-smoke", "Chimney smoke", { primaryColor: "#625D58", secondaryColor: "#9A948C", lifetime: 7, speed: 0.46, opacity: 0.66, plumeExpansion: 0.98, endWidth: 280 }),
        variant("thin-torch-smoke", "Thin torch smoke", { primaryColor: "#AAA39A", secondaryColor: "#DAD2C8", amount: 0.38, startWidth: 10, endWidth: 104, opacity: 0.46, lifetime: 3.4, plumeExpansion: 0.54 }),
        variant("harbor-smoke", "Harbor smoke", { primaryColor: "#707474", secondaryColor: "#B6BDBB", opacity: 0.62, windStrength: 0.44, plumeExpansion: 0.92, directionDeg: -76 }),
        variant("steam-vent", "Steam vent", { primaryColor: "#ECF6F6", secondaryColor: "#FFFFFF", speed: 1.22, lifetime: 2.2, opacity: 0.48, plumeExpansion: 1.22, softness: 0.95 }),
        variant("warm-steam-plume", "Warm steam plume", { primaryColor: "#F6E8D3", secondaryColor: "#FFF8EB", speed: 0.88, lifetime: 2.8, opacity: 0.5, plumeExpansion: 1.0 }),
        variant("fountain-mist-plume", "Fountain mist plume", { primaryColor: "#E6FAFF", secondaryColor: "#FFFFFF", amount: 0.56, lifetime: 1.35, size: 0.66, opacity: 0.54, plumeExpansion: 0.78 })
      ],
      defaults: { ...preset({}).defaults, amount: 0.68, speed: 0.62, size: 1.08, softness: 0.78, opacity: 0.58, lifetime: 4.8, turbulence: 0.62, fadeIn: 0.06, fadeOut: 0.56, windStrength: 0.18, plumeExpansion: 0.86, pulseRate: 0.24, burstiness: 0.18, particleCap: 92 },
      performance: "Medium",
      recommendedBudget: 90,
      hardCap: 180,
      qualityScale: { high: 1, balanced: 0.74, reduced: 0.46 },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "softness", "opacity", "lifetime", "variance", "turbulence", "fadeIn", "fadeOut", "windStrength", "plumeExpansion", "pulseRate", "burstiness", "particleCap"]
    }),
    "light-beam": preset({
      id: "light-beam", name: "Light beam", category: "Light and fire",
      description: "Directional atmospheric light with soft trapezoid shaping and dust participation.",
      bestFor: "Window beams, forest sun rays, temple shafts, sacred beams and moon beams.",
      avoidFor: "Point light glow, smoke, water bands or sharp material glints.",
      visualSignature: "Directional soft beam body with restrained dust in the light.",
      renderer: "lightBeam", layerSlot: "worldLight", geometryTypes: ["directionalBeam", "polygon"],
      recommendedBudget: 42,
      hardCap: 80,
      defaultGeometry: { type: "directionalBeam", x: 420, y: 80, directionDeg: 70, length: 520, startWidth: 45, endWidth: 260 },
      variants: [
        variant("window-beam", "Window beam", { opacity: 0.52, glow: 0.7 }), variant("forest-sun-rays", "Forest sun rays", { opacity: 0.46, amount: 0.78 }),
        variant("temple-shaft", "Temple shaft", { primaryColor: "#FFF0B0" }), variant("sacred-beam", "Sacred beam", { primaryColor: "#FFF7C7", glow: 0.8 }),
        variant("moon-beam", "Moon beam", { primaryColor: "#B8D1FF", glowColor: "#879EEA" })
      ],
      defaults: { ...preset({}).defaults, intensity: 0.78, amount: 0.72, glow: 0.68, softness: 0.72, opacity: 0.5, particleCap: 54 },
      controls: ["intensity", "amount", "speed", "directionDeg", "glow", "softness", "opacity", "startWidth", "endWidth", "turbulence", "edgeFeatherPx", "particleCap"]
    }),
    "water-surface": preset({
      id: "water-surface", name: "Water surface", category: "Water",
      hiddenFromLibrary: true,
      description: "Masked directional shimmer, highlight bands, tint and restrained sparkle.",
      bestFor: "Harbor water, lakes, canals, basins, fountains and painted water regions.",
      avoidFor: "Wet stone, glass, metal, crystal sparkle or rare material glints.",
      visualSignature: "Continuous masked surface-following bands with subtle directional shimmer.",
      renderer: "surfaceShimmer", geometryTypes: ["rectangle", "ellipse", "polygon"],
      defaultGeometry: { type: "polygon", points: [{ x: 200, y: 430 }, { x: 800, y: 430 }, { x: 800, y: 650 }, { x: 200, y: 650 }], cutouts: [] },
      variants: [
        variant("calm-water", "Calm water", { speed: 0.38, highlightDensity: 0.7, opacity: 0.6 }),
        variant("harbor-water", "Harbor water", { directionDeg: 6, primaryColor: "#B7DEEC", glowColor: "#F0FBFF", speed: 0.6, highlightDensity: 0.82, opacity: 0.7 }),
        variant("moonlit-water", "Moonlit water", { primaryColor: "#BCD6FF", glowColor: "#F0F6FF", opacity: 0.68, highlightDensity: 0.66, size: 0.82 }),
        variant("sunlit-water", "Sunlit water", { primaryColor: "#C7F2F0", glowColor: "#FFF3B0", speed: 0.68, highlightDensity: 0.92, size: 1.14, opacity: 0.72 }),
        variant("fountain-basin", "Fountain basin", { speed: 1.12, highlightDensity: 1.0, size: 0.86, opacity: 0.78 }),
        variant("dark-canal-water", "Dark canal water", { primaryColor: "#6B9DA6", glowColor: "#A8D0D2", intensity: 0.62, highlightDensity: 0.62, opacity: 0.56 })
      ],
      defaults: { ...preset({}).defaults, intensity: 0.82, amount: 0.9, speed: 0.58, size: 0.98, glow: 0.52, softness: 0.72, opacity: 0.68, variance: 0.62, turbulence: 0.28, edgeFeatherPx: 22, highlightDensity: 0.78, particleCap: 82 },
      performance: "Medium",
      recommendedBudget: 72,
      hardCap: 140,
      qualityScale: { high: 1, balanced: 0.76, reduced: 0.48 },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "softness", "opacity", "variance", "turbulence", "edgeFeatherPx", "highlightDensity", "particleCap"]
    }),
    "surface-glint": preset({
      id: "surface-glint", name: "Surface glint", category: "Surfaces",
      hiddenFromLibrary: true,
      description: "Localized material-aware highlight sweeps for stone, glass, metal and crystal.",
      bestFor: "Wet stone, glass, metal, crystal and marble highlights.",
      avoidFor: "Open water surfaces, broad shimmer, bubbles, mist or fog.",
      visualSignature: "Rare short material sweeps and pin glints rather than continuous bands.",
      renderer: "surfaceGlint", geometryTypes: ["rectangle", "ellipse", "polygon", "directionalBeam"],
      defaultGeometry: { type: "rectangle", x: 500, y: 380, width: 420, height: 150 },
      variants: [
        variant("wet-stone", "Wet stone", { amount: 0.42, speed: 0.9, opacity: 0.72, directionDeg: 4, size: 0.62, glow: 1.05, highlightDensity: 0.72 }),
        variant("glass-sweep", "Glass sweep", { speed: 1.25, amount: 0.38, size: 1.0, softness: 0.32, opacity: 0.72 }),
        variant("metal-glint", "Metal glint", { amount: 0.28, glow: 1.12, size: 0.66, opacity: 0.86, highlightDensity: 0.58 }),
        variant("crystal-shimmer", "Crystal shimmer", { primaryColor: "#C8F4FF", glowColor: "#FFFFFF", amount: 0.38, size: 0.58, opacity: 0.82, highlightDensity: 0.72 }),
        variant("marble-sheen", "Marble sheen", { opacity: 0.5, softness: 0.86, amount: 0.34, size: 1.2 })
      ],
      defaults: { ...preset({}).defaults, intensity: 0.92, amount: 0.38, speed: 0.96, size: 0.72, glow: 0.92, softness: 0.36, opacity: 0.72, variance: 0.72, edgeFeatherPx: 8, highlightDensity: 0.66 },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "softness", "opacity", "variance", "edgeFeatherPx", "highlightDensity"]
    }),
    "bubbles-and-spray": preset({
      id: "bubbles-and-spray", name: "Bubbles and spray", category: "Water",
      description: "Bounded bubbles, fountain sparkle, spray and fine splash mist.",
      bestFor: "Fountains, water machines, pipes, underwater regions and local splash points.",
      avoidFor: "Fireflies, magic motes, pollen, smoke, fog or broad water shimmer.",
      visualSignature: "Round rising bubbles, bright impact sparkles, arcing droplets or fine mist.",
      renderer: "particleField", geometryTypes: ["pointRadius", "rectangle", "ellipse", "polygon", "directionalEmitter"],
      variants: [
        variant("rising-bubbles", "Rising bubbles", { primaryColor: "#DDF8FF", secondaryColor: "#FFFFFF", particleShape: "bubble", motionProfile: "risingBubble", acceleration: -0.18, amount: 0.58, size: 0.95, glow: 0, opacity: 0.78 }),
        variant("underwater-microbubbles", "Underwater microbubbles", { primaryColor: "#DDF8FF", particleShape: "bubble", motionProfile: "risingBubble", amount: 0.9, size: 0.42, speed: 0.5, glow: 0, opacity: 0.72 }),
        variant("fountain-sparkle", "Fountain sparkle", { particleShape: "sparkle", motionProfile: "fountainSpray", emissive: true, glow: 1.0, lifetime: 1.2, amount: 0.52, size: 0.72, speed: 0.92, opacity: 0.9 }),
        variant("fountain-spray", "Fountain spray", { particleShape: "droplet", motionProfile: "fountainSpray", directionDeg: -90, acceleration: 0.48, speed: 1.26, amount: 0.7, glow: 0.08, opacity: 0.76 }),
        variant("fine-splash-mist", "Fine splash mist", { particleShape: "softDot", motionProfile: "fountainSpray", amount: 0.72, size: 0.42, softness: 0.95, lifetime: 1.2, opacity: 0.56, glow: 0 })
      ],
      defaults: { ...preset({}).defaults, amount: 0.62, speed: 0.68, size: 0.86, directionDeg: -90, glow: 0, softness: 0.44, opacity: 0.76, lifetime: 3.0, variance: 0.52, turbulence: 0.42, acceleration: -0.16, fadeIn: 0.04, fadeOut: 0.38, particleCap: 88, particleShape: "bubble", motionProfile: "risingBubble", emissive: false },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "softness", "lifetime", "variance", "turbulence", "acceleration", "fadeIn", "fadeOut", "edgeFeatherPx", "particleCap"]
    })
  });

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  function hash(seed, index = 0) {
    let value = (Number(seed) || 1) ^ Math.imul(index + 1, 0x9e3779b1);
    value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
    value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
    return ((value ^ (value >>> 15)) >>> 0) / 4294967296;
  }

  function color(value, fallback = "#FFFFFF") {
    return /^#[0-9A-F]{6}$/i.test(String(value || "")) ? String(value).toUpperCase() : fallback;
  }

  function rgba(hex, alpha) {
    const safe = color(hex);
    return `rgba(${parseInt(safe.slice(1, 3), 16)},${parseInt(safe.slice(3, 5), 16)},${parseInt(safe.slice(5, 7), 16)},${clamp(alpha, 0, 1)})`;
  }

  function mixColor(first, second, amount) {
    const left = color(first);
    const right = color(second);
    const channel = (offset) => Math.round(
      parseInt(left.slice(offset, offset + 2), 16) * (1 - amount) +
      parseInt(right.slice(offset, offset + 2), 16) * amount
    ).toString(16).padStart(2, "0");
    return `#${channel(1)}${channel(3)}${channel(5)}`.toUpperCase();
  }

  function normalizeAngleRange(startDeg, endDeg) {
    let start = Number.isFinite(startDeg) ? startDeg : -38;
    let end = Number.isFinite(endDeg) ? endDeg : 34;
    while (end <= start) end += 360;
    while (end - start > 360) end -= 360;
    return { start, end };
  }

  function sunAnimationControl(value, fallback = 1) {
    return Number.isFinite(value) ? clamp(value, 0, 3) : fallback;
  }

  function presetById(id) {
    return PRESETS[id] || null;
  }

  function variantById(presetValue, id) {
    return presetValue?.variants?.find((item) => item.id === id) || null;
  }

  function groupFor(level, id) {
    return (level?.sceneEffectGroups || []).find((item) => item.id === id) || null;
  }

  function resolve(instance, level, options = {}) {
    const selectedPreset = presetById(instance?.presetId);
    if (!selectedPreset) return null;
    const selectedVariant = variantById(selectedPreset, instance.variantId) || selectedPreset.variants[0];
    const group = groupFor(level, instance.groupId);
    const shared = {};
    for (const field of group?.sharedProperties || []) {
      if (Object.hasOwn(group.overrides || {}, field) && !Object.hasOwn(instance.overrides || {}, field)) {
        shared[field] = group.overrides[field];
      }
    }
    const resolved = {
      ...selectedPreset.defaults,
      ...selectedPreset.colors,
      ...(selectedVariant?.overrides || {}),
      ...shared,
      ...(instance.overrides || {})
    };
    if (Object.hasOwn(instance.overrides || {}, "primaryColor")) {
      if (!Object.hasOwn(instance.overrides || {}, "secondaryColor")) resolved.secondaryColor = mixColor(resolved.primaryColor, "#FFFFFF", 0.18);
      if (!Object.hasOwn(instance.overrides || {}, "glowColor")) resolved.glowColor = mixColor(resolved.primaryColor, "#FFFFFF", 0.36);
    }
    const reducedMotion = options.reducedMotion;
    if (reducedMotion) {
      Object.entries(selectedPreset.reducedMotion || {}).forEach(([field, scale]) => {
        if (Number.isFinite(resolved[field])) resolved[field] *= scale;
      });
    }
    return {
      preset: selectedPreset,
      variant: selectedVariant,
      instance,
      group,
      overriddenFields: [...new Set([...Object.keys(shared), ...Object.keys(instance.overrides || {})])],
      geometry: clone(instance.geometry || selectedPreset.defaultGeometry),
      mask: normalizeMask(instance.mask),
      layerSlot: LAYER_SLOTS.includes(instance.layerSlot) ? instance.layerSlot : selectedPreset.layerSlot,
      quality: ["high", "balanced", "reduced"].includes(instance.qualityTier) ? instance.qualityTier : (options.quality || "high"),
      ...resolved,
      primaryColor: color(resolved.primaryColor, selectedPreset.colors.primaryColor),
      secondaryColor: color(resolved.secondaryColor, selectedPreset.colors.secondaryColor),
      glowColor: color(resolved.glowColor, selectedPreset.colors.glowColor),
      tintColor: color(resolved.tintColor, selectedPreset.colors.tintColor)
    };
  }

  function finitePoint(point) {
    return point && Number.isFinite(point.x) && Number.isFinite(point.y);
  }

  function normalizePolygon(points) {
    return Array.isArray(points)
      ? points.filter(finitePoint).map((point) => ({ x: Number(point.x), y: Number(point.y) }))
      : [];
  }

  function normalizeMask(mask) {
    if (!mask || typeof mask !== "object" || Array.isArray(mask)) return null;
    const includes = Array.isArray(mask.includes)
      ? mask.includes.map(normalizePolygon).filter((points) => points.length >= 3)
      : [];
    const cutouts = Array.isArray(mask.cutouts)
      ? mask.cutouts.map(normalizePolygon).filter((points) => points.length >= 3)
      : [];
    if (!includes.length && !cutouts.length) return null;
    return { includes, cutouts };
  }

  function orientation(a, b, c) {
    const value = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
    if (Math.abs(value) < 0.00001) return 0;
    return value > 0 ? 1 : 2;
  }

  function onSegment(a, b, c) {
    return b.x <= Math.max(a.x, c.x) + 0.00001 &&
      b.x + 0.00001 >= Math.min(a.x, c.x) &&
      b.y <= Math.max(a.y, c.y) + 0.00001 &&
      b.y + 0.00001 >= Math.min(a.y, c.y);
  }

  function segmentsIntersect(a, b, c, d) {
    const o1 = orientation(a, b, c);
    const o2 = orientation(a, b, d);
    const o3 = orientation(c, d, a);
    const o4 = orientation(c, d, b);
    if (o1 !== o2 && o3 !== o4) return true;
    return (o1 === 0 && onSegment(a, c, b)) ||
      (o2 === 0 && onSegment(a, d, b)) ||
      (o3 === 0 && onSegment(c, a, d)) ||
      (o4 === 0 && onSegment(c, b, d));
  }

  function polygonSelfIntersects(points) {
    if (!Array.isArray(points) || points.length < 4) return false;
    for (let index = 0; index < points.length; index += 1) {
      const a = points[index];
      const b = points[(index + 1) % points.length];
      for (let next = index + 1; next < points.length; next += 1) {
        if (Math.abs(index - next) <= 1) continue;
        if (index === 0 && next === points.length - 1) continue;
        const c = points[next];
        const d = points[(next + 1) % points.length];
        if (segmentsIntersect(a, b, c, d)) return true;
      }
    }
    return false;
  }

  function validatePolygon(points, label) {
    const errors = [];
    if (!Array.isArray(points) || points.length < 3 || points.some((point) => !finitePoint(point))) {
      errors.push(`${label} needs at least three finite points.`);
    } else if (polygonSelfIntersects(points)) {
      errors.push(`${label} must not self-intersect.`);
    }
    return errors;
  }

  function validateMask(mask) {
    const errors = [];
    if (mask === undefined || mask === null) return errors;
    if (typeof mask !== "object" || Array.isArray(mask)) return ["mask must be an object."];
    if (mask.spawnMask !== undefined || mask.renderMask !== undefined) {
      errors.push("spawnMask/renderMask are reserved for a future schema version; use mask.includes and mask.cutouts in this version.");
    }
    const includes = Array.isArray(mask.includes) ? mask.includes : [];
    const cutouts = Array.isArray(mask.cutouts) ? mask.cutouts : [];
    if (!Array.isArray(mask.includes)) errors.push("mask.includes must be an array.");
    if (!Array.isArray(mask.cutouts)) errors.push("mask.cutouts must be an array.");
    includes.forEach((polygon, index) => errors.push(...validatePolygon(polygon, `mask.includes[${index}]`)));
    cutouts.forEach((polygon, index) => {
      errors.push(...validatePolygon(polygon, `mask.cutouts[${index}]`));
      if (Array.isArray(polygon) && polygon.length >= 3 && includes.length) {
        const contained = polygon.every((point) => includes.some((include) => insidePolygon(point, include)));
        if (!contained) errors.push(`mask.cutouts[${index}] must stay inside an include polygon.`);
      }
    });
    return errors;
  }

  function validateGeometry(geometry, supportedTypes) {
    const errors = [];
    if (!geometry || !GEOMETRY_TYPES.includes(geometry.type)) return ["geometry.type is unknown."];
    if (!supportedTypes.includes(geometry.type)) errors.push(`geometry "${geometry.type}" is unsupported by this preset.`);
    if (["point", "pointRadius", "rectangle", "ellipse", "directionalEmitter", "directionalBeam"].includes(geometry.type) && !finitePoint(geometry)) {
      errors.push("geometry origin must have finite x/y.");
    }
    if (geometry.type === "pointRadius" && (!Number.isFinite(geometry.radius) || geometry.radius <= 0)) errors.push("radius must be greater than zero.");
    if (["rectangle", "ellipse"].includes(geometry.type) && (!Number.isFinite(geometry.width) || geometry.width <= 0 || !Number.isFinite(geometry.height) || geometry.height <= 0)) {
      errors.push("rectangle/ellipse width and height must be greater than zero.");
    }
    if (geometry.type === "polygon") {
      errors.push(...validatePolygon(geometry.points, "polygon"));
      for (const [index, cutout] of (geometry.cutouts || []).entries()) {
        const polygonErrors = validatePolygon(cutout, `cutout ${index + 1}`);
        if (polygonErrors.length) errors.push(...polygonErrors);
        else if (cutout.some((point) => !insidePolygon(point, geometry.points))) errors.push(`cutout ${index + 1} must stay inside the outer polygon.`);
      }
    }
    if (["directionalEmitter", "directionalBeam"].includes(geometry.type) && (!Number.isFinite(geometry.directionDeg) || geometry.directionDeg < -360 || geometry.directionDeg > 360)) errors.push("directionDeg must be between -360 and 360.");
    if (geometry.type === "directionalEmitter") {
      if (!Number.isFinite(geometry.width) || geometry.width <= 0) errors.push("emitter width must be greater than zero.");
      if (!Number.isFinite(geometry.spreadDeg) || geometry.spreadDeg < 0 || geometry.spreadDeg > 180) errors.push("emitter spreadDeg must be between 0 and 180.");
    }
    if (geometry.type === "directionalBeam") {
      if (!Number.isFinite(geometry.length) || geometry.length <= 0) errors.push("beam length must be greater than zero.");
      if (!Number.isFinite(geometry.startWidth) || geometry.startWidth <= 0 || !Number.isFinite(geometry.endWidth) || geometry.endWidth <= 0) errors.push("beam widths must be greater than zero.");
    }
    return errors;
  }

  function validateInstance(instance, level, options = {}) {
    const errors = [];
    const warnings = [];
    if (!instance || typeof instance !== "object" || Array.isArray(instance)) return { valid: false, errors: ["effect must be an object."], warnings };
    if (!String(instance.id || "").trim()) errors.push("id is required.");
    const selectedPreset = presetById(instance.presetId);
    if (!selectedPreset) errors.push(`unknown presetId "${instance.presetId}".`);
    const selectedVariant = selectedPreset && variantById(selectedPreset, instance.variantId);
    if (selectedPreset && !selectedVariant) errors.push(`unknown variantId "${instance.variantId}".`);
    if (selectedPreset && instance.presetVersion !== selectedPreset.version) errors.push(`unsupported presetVersion "${instance.presetVersion}".`);
    if (!LAYER_SLOTS.includes(instance.layerSlot || selectedPreset?.layerSlot)) errors.push(`invalid semantic layer slot "${instance.layerSlot}".`);
    if (selectedPreset) errors.push(...validateGeometry(instance.geometry || selectedPreset.defaultGeometry, selectedPreset.geometryTypes));
    errors.push(...validateMask(instance.mask));
    if (!Number.isInteger(instance.seed) || instance.seed < 0 || instance.seed > 2147483647) errors.push("seed must be an integer from 0 to 2147483647.");
    if (instance.enabled !== undefined && typeof instance.enabled !== "boolean") errors.push("enabled must be boolean.");
    if (instance.qualityTier !== undefined && !["auto", "high", "balanced", "reduced"].includes(instance.qualityTier)) errors.push("qualityTier is invalid.");
    if (instance.groupId && !groupFor(level, instance.groupId)) errors.push(`groupId "${instance.groupId}" does not exist.`);
    if (instance.overrides && (typeof instance.overrides !== "object" || Array.isArray(instance.overrides))) errors.push("overrides must be an object.");
    if (selectedPreset) {
      for (const [field, value] of Object.entries(instance.overrides || {})) {
        if (!selectedPreset.controls.includes(field) && !["primaryColor", "secondaryColor", "glowColor", "tintColor", "blendMode", "edgeFeatherPx"].includes(field)) {
          errors.push(`unsupported expert field "${field}".`);
          continue;
        }
        if (/Color$/.test(field) && !/^#[0-9A-F]{6}$/i.test(String(value))) errors.push(`${field} must be a six-digit hex color.`);
        if (field === "blendMode" && !["source-over", "lighter", "screen", "soft-light"].includes(value)) errors.push("blendMode is invalid.");
        const range = selectedPreset.hardRanges[field] || CONTROL_DEFS[field];
        if (range && (!Number.isFinite(value) || value < range.min || value > range.max)) errors.push(`${field} must be between ${range.min} and ${range.max}.`);
      }
      const cap = Number(instance.overrides?.particleCap ?? selectedPreset.defaults.particleCap);
      if (cap > selectedPreset.hardCap) errors.push(`particleCap exceeds preset hard cap ${selectedPreset.hardCap}.`);
    }
    if (options.ids?.has(instance.id)) errors.push(`duplicate effect id "${instance.id}".`);
    return { valid: errors.length === 0, errors, warnings };
  }

  function validateLevel(level) {
    const errors = [];
    const warnings = [];
    const ids = new Set();
    const groups = new Set();
    for (const [index, group] of (level?.sceneEffectGroups || []).entries()) {
      if (!group?.id || groups.has(group.id)) errors.push(`sceneEffectGroups[${index}] has a missing or duplicate id.`);
      groups.add(group?.id);
      if (!Array.isArray(group?.sharedProperties)) errors.push(`sceneEffectGroups[${index}].sharedProperties must be an array.`);
      for (const field of group?.sharedProperties || []) {
        if (!CONTROL_DEFS[field] && !["variantId", "primaryColor", "secondaryColor", "glowColor", "tintColor"].includes(field)) {
          errors.push(`sceneEffectGroups[${index}] has unsupported shared property "${field}".`);
        }
      }
      for (const [field, value] of Object.entries(group?.overrides || {})) {
        if (!group.sharedProperties?.includes(field)) errors.push(`sceneEffectGroups[${index}].overrides.${field} is not declared in sharedProperties.`);
        if (/Color$/.test(field) && !/^#[0-9A-F]{6}$/i.test(String(value))) errors.push(`sceneEffectGroups[${index}].overrides.${field} must be a six-digit hex color.`);
        const definition = CONTROL_DEFS[field];
        if (definition && (!Number.isFinite(value) || value < definition.min || value > definition.max)) {
          errors.push(`sceneEffectGroups[${index}].overrides.${field} must be between ${definition.min} and ${definition.max}.`);
        }
      }
    }
    for (const [index, effect] of (level?.sceneEffects || []).entries()) {
      const result = validateInstance(effect, level, { ids });
      result.errors.forEach((message) => errors.push(`sceneEffects[${index}] ${message}`));
      result.warnings.forEach((message) => warnings.push(`sceneEffects[${index}] ${message}`));
      ids.add(effect?.id);
    }
    return { valid: errors.length === 0, errors, warnings };
  }

  function geometryBounds(geometry) {
    if (!geometry) return { x: 0, y: 0, width: 1, height: 1 };
    if (geometry.type === "point") return { x: geometry.x - 30, y: geometry.y - 30, width: 60, height: 60 };
    if (geometry.type === "pointRadius") return { x: geometry.x - geometry.radius, y: geometry.y - geometry.radius, width: geometry.radius * 2, height: geometry.radius * 2 };
    if (["rectangle", "ellipse"].includes(geometry.type)) return { x: geometry.x - geometry.width / 2, y: geometry.y - geometry.height / 2, width: geometry.width, height: geometry.height };
    if (geometry.type === "directionalEmitter") {
      const reach = Math.max(120, geometry.width * 8);
      return { x: geometry.x - reach, y: geometry.y - reach, width: reach * 2, height: reach * 2 };
    }
    if (geometry.type === "directionalBeam") {
      const angle = geometry.directionDeg * Math.PI / 180;
      const end = { x: geometry.x + Math.cos(angle) * geometry.length, y: geometry.y + Math.sin(angle) * geometry.length };
      const width = Math.max(geometry.startWidth || 1, geometry.endWidth || 1);
      return { x: Math.min(geometry.x, end.x) - width, y: Math.min(geometry.y, end.y) - width, width: Math.abs(end.x - geometry.x) + width * 2, height: Math.abs(end.y - geometry.y) + width * 2 };
    }
    const points = geometry.points || [];
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    return { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
  }

  function maskBounds(mask) {
    const normalized = normalizeMask(mask);
    if (!normalized) return null;
    const points = [...normalized.includes.flat(), ...normalized.cutouts.flat()];
    const xs = points.map((point) => point.x);
    const ys = points.map((point) => point.y);
    return { x: Math.min(...xs), y: Math.min(...ys), width: Math.max(...xs) - Math.min(...xs), height: Math.max(...ys) - Math.min(...ys) };
  }

  function pathGeometry(ctx, geometry) {
    ctx.beginPath();
    if (geometry.type === "point" || geometry.type === "pointRadius") {
      ctx.arc(geometry.x, geometry.y, geometry.radius || 28, 0, Math.PI * 2);
    } else if (geometry.type === "rectangle") {
      ctx.rect(geometry.x - geometry.width / 2, geometry.y - geometry.height / 2, geometry.width, geometry.height);
    } else if (geometry.type === "ellipse") {
      ctx.ellipse(geometry.x, geometry.y, geometry.width / 2, geometry.height / 2, 0, 0, Math.PI * 2);
    } else if (geometry.type === "polygon") {
      geometry.points.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
      ctx.closePath();
      for (const cutout of geometry.cutouts || []) {
        [...cutout].reverse().forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
        ctx.closePath();
      }
    } else {
      ctx.arc(geometry.x, geometry.y, Math.max(20, geometry.width || 24), 0, Math.PI * 2);
    }
  }

  function pathMask(ctx, mask) {
    const normalized = normalizeMask(mask);
    if (!normalized) return false;
    ctx.beginPath();
    for (const polygon of normalized.includes) {
      polygon.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
      ctx.closePath();
    }
    for (const polygon of normalized.cutouts) {
      [...polygon].reverse().forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
      ctx.closePath();
    }
    return true;
  }

  function insidePolygon(point, polygon) {
    let inside = false;
    for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
      const a = polygon[index];
      const b = polygon[previous];
      if (((a.y > point.y) !== (b.y > point.y)) && point.x < (b.x - a.x) * (point.y - a.y) / ((b.y - a.y) || 0.0001) + a.x) inside = !inside;
    }
    return inside;
  }

  function pointInsideGeometry(point, geometry) {
    if (geometry.type === "point" || geometry.type === "pointRadius") return Math.hypot(point.x - geometry.x, point.y - geometry.y) <= (geometry.radius || 28);
    if (geometry.type === "rectangle") return Math.abs(point.x - geometry.x) <= geometry.width / 2 && Math.abs(point.y - geometry.y) <= geometry.height / 2;
    if (geometry.type === "ellipse") return ((point.x - geometry.x) / (geometry.width / 2)) ** 2 + ((point.y - geometry.y) / (geometry.height / 2)) ** 2 <= 1;
    if (geometry.type === "polygon") return insidePolygon(point, geometry.points) && !(geometry.cutouts || []).some((cutout) => insidePolygon(point, cutout));
    return true;
  }

  function pointInsideMask(point, mask) {
    const normalized = normalizeMask(mask);
    if (!normalized) return true;
    const insideInclude = normalized.includes.length
      ? normalized.includes.some((polygon) => insidePolygon(point, polygon))
      : true;
    const insideCutout = normalized.cutouts.some((polygon) => insidePolygon(point, polygon));
    return insideInclude && !insideCutout;
  }

  function samplePoint(resolved, index) {
    const geometry = resolved.geometry;
    const bounds = geometryBounds(geometry);
    if (geometry?.type === "directionalEmitter") {
      const direction = (geometry.directionDeg ?? resolved.directionDeg) * Math.PI / 180;
      const side = direction + Math.PI / 2;
      const offset = (hash(resolved.instance.seed, index * 17) - 0.5) * (geometry.width || resolved.startWidth || 24);
      const jitter = (hash(resolved.instance.seed, index * 17 + 1) - 0.5) * 8;
      return {
        x: geometry.x + Math.cos(side) * offset + Math.cos(direction) * jitter,
        y: geometry.y + Math.sin(side) * offset + Math.sin(direction) * jitter
      };
    }
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const x = bounds.x + hash(resolved.instance.seed, index * 31 + attempt * 2) * bounds.width;
      const y = bounds.y + hash(resolved.instance.seed, index * 31 + attempt * 2 + 1) * bounds.height;
      if (pointInsideGeometry({ x, y }, geometry) && pointInsideMask({ x, y }, resolved.mask)) return { x, y };
    }
    return { x: geometry.x ?? bounds.x + bounds.width / 2, y: geometry.y ?? bounds.y + bounds.height / 2 };
  }

  function particleOrigin(resolved, index) {
    resolved._particleOrigins ||= [];
    if (!resolved._particleOrigins[index]) resolved._particleOrigins[index] = samplePoint(resolved, index);
    return resolved._particleOrigins[index];
  }

  function fade(progress, fadeIn, fadeOut) {
    const enter = clamp(progress / Math.max(0.001, fadeIn), 0, 1);
    const leave = clamp((1 - progress) / Math.max(0.001, fadeOut), 0, 1);
    return enter * enter * (3 - 2 * enter) * leave * leave * (3 - 2 * leave);
  }

  function particleCount(resolved) {
    const q = QUALITY[resolved.quality] || QUALITY.high;
    const scale = resolved.preset.qualityScale?.[resolved.quality] ?? q.particles;
    return Math.max(1, Math.floor(Math.min(resolved.particleCap, resolved.preset.hardCap) * resolved.amount * scale));
  }

  function drawWithFeatheredMask(ctx, resolved, paint) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    if (!resolved._maskCanvas || resolved._maskCanvas.width !== width || resolved._maskCanvas.height !== height) {
      resolved._maskCanvas = document.createElement("canvas");
      resolved._maskCanvas.width = width;
      resolved._maskCanvas.height = height;
    }
    const buffer = resolved._maskCanvas.getContext("2d");
    buffer.setTransform(1, 0, 0, 1, 0, 0);
    buffer.clearRect(0, 0, width, height);
    paint(buffer);
    buffer.save();
    buffer.globalCompositeOperation = "destination-in";
    buffer.fillStyle = "#FFFFFF";
    const feather = Math.max(0, resolved.edgeFeatherPx * (QUALITY[resolved.quality]?.blur || 1));
    const mask = resolved.mask;
    buffer.filter = `blur(${feather}px)`;
    if (!mask || !pathMask(buffer, mask)) pathGeometry(buffer, resolved.geometry);
    buffer.fill("evenodd");
    buffer.restore();
    ctx.save();
    ctx.globalCompositeOperation = resolved.blendMode || resolved.preset.blendMode || "source-over";
    ctx.drawImage(resolved._maskCanvas, 0, 0);
    ctx.restore();
  }

  function drawWithOptionalMask(ctx, resolved, paint) {
    if (!resolved.mask) {
      paint(ctx);
      return;
    }
    drawWithFeatheredMask(ctx, resolved, paint);
  }

  function drawGlow(ctx, resolved, time) {
    const geometry = resolved.geometry;
    const bounds = geometryBounds(geometry);
    const center = { x: geometry.x ?? bounds.x + bounds.width / 2, y: geometry.y ?? bounds.y + bounds.height / 2 };
    const radius = Math.max(25, geometry.radius || Math.max(bounds.width, bounds.height) / 2) * resolved.size * (0.84 + resolved.softness * 0.12);
    const pulse = 1 + Math.sin(time * resolved.pulseRate * Math.PI * 2 + hash(resolved.instance.seed) * 6.28) * resolved.pulseAmount;
    const flicker = 1 + Math.sin(time * 11.7 + hash(resolved.instance.seed, 3) * 8) * resolved.flickerAmount * 0.35;
    const coreColor = resolved.preset.id === "light-source-enhancement"
      ? mixColor(resolved.primaryColor, "#FF9F43", resolved.warmth * 0.24)
      : resolved.primaryColor;
    const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius * pulse);
    gradient.addColorStop(0, rgba(coreColor, resolved.opacity * resolved.intensity * 1.0 * flicker));
    gradient.addColorStop(clamp(0.1 + resolved.softness * 0.07, 0.1, 0.28), rgba(resolved.secondaryColor, resolved.opacity * resolved.intensity * 0.58));
    gradient.addColorStop(clamp(0.42 + resolved.softness * 0.1, 0.42, 0.7), rgba(resolved.glowColor, resolved.opacity * resolved.glow * 0.32));
    gradient.addColorStop(1, rgba(resolved.glowColor, 0));
    ctx.globalCompositeOperation = resolved.blendMode || resolved.preset.blendMode;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius * pulse, 0, Math.PI * 2);
    ctx.fill();
    const coreRadius = Math.max(5, radius * (resolved.preset.id === "light-source-enhancement" ? 0.12 : 0.09));
    ctx.fillStyle = rgba(coreColor, resolved.opacity * resolved.intensity * (resolved.preset.id === "light-source-enhancement" ? 0.95 : 0.78));
    ctx.beginPath();
    if (resolved.preset.id === "light-source-enhancement") {
      ctx.ellipse(center.x, center.y - coreRadius * 0.35, coreRadius * 0.62, coreRadius * 1.25, 0, 0, Math.PI * 2);
    } else {
      ctx.arc(center.x, center.y, coreRadius, 0, Math.PI * 2);
    }
    ctx.fill();
    if (resolved.sparkAmount > 0) {
      resolved._sparkResolved ||= {
        ...resolved,
        amount: resolved.sparkAmount * Math.max(0.32, resolved.amount) * 1.22,
        particleCap: Math.min(resolved.particleCap, 52),
        lifetime: 1.45,
        speed: Math.max(0.55, resolved.speed),
        acceleration: -0.38,
        particleShape: "ember",
        motionProfile: "upwardEmber",
        emissive: true,
        fadeIn: 0.04,
        fadeOut: 0.58
      };
      drawParticles(ctx, resolved._sparkResolved, time);
    }
    if (resolved.preset.id === "magical-glow" && resolved.amount > 0.05) {
      resolved._moteResolved ||= {
        ...resolved,
        amount: Math.min(0.46, resolved.amount * 0.75),
        particleCap: Math.min(26, resolved.particleCap),
        lifetime: 8,
        speed: Math.max(0.16, resolved.speed * 0.72),
        particleShape: resolved.particleShape || "sparkle",
        motionProfile: "orbitFocus",
        emissive: true,
        geometry: resolved.geometry,
        fadeIn: 0.28,
        fadeOut: 0.34
      };
      drawParticles(ctx, resolved._moteResolved, time);
    }
  }

  function particlePosition(resolved, origin, index, progress, depth, time, angle, life) {
    const profile = resolved.motionProfile || "windDrift";
    const side = angle + Math.PI / 2;
    const distance = progress * life * 34 * resolved.speed;
    const wander = Math.sin(progress * Math.PI * 2 * (1 + resolved.oscillation) + hash(resolved.instance.seed, index + 300) * 10) * 24 * resolved.turbulence;
    if (profile === "livingWander") {
      const pause = 0.72 + 0.28 * Math.max(0, Math.sin(time * 0.8 + index * 1.9));
      return {
        x: origin.x + Math.sin(time * (0.24 + depth * 0.12) + index * 3.1) * 38 * resolved.oscillation * pause +
          Math.sin(time * 0.73 + index) * 8 * resolved.turbulence,
        y: origin.y + Math.cos(time * (0.2 + depth * 0.08) + index * 2.7) * 26 * resolved.oscillation * pause +
          Math.cos(time * 0.61 + index * 1.3) * 6 * resolved.turbulence
      };
    }
    if (profile === "orbitFocus") {
      const bounds = geometryBounds(resolved.geometry);
      const center = {
        x: resolved.geometry.x ?? bounds.x + bounds.width / 2,
        y: resolved.geometry.y ?? bounds.y + bounds.height / 2
      };
      const orbit = Math.max(22, Math.min(bounds.width || 120, bounds.height || 120) * (0.28 + hash(resolved.instance.seed, index + 60) * 0.24));
      const phase = time * resolved.speed * (0.45 + depth * 0.25) + index * 2.4 + hash(resolved.instance.seed, index + 90) * 6.28;
      return {
        x: center.x + Math.cos(phase) * orbit + Math.sin(phase * 1.7) * 8 * resolved.turbulence,
        y: center.y + Math.sin(phase) * orbit * 0.58 + Math.cos(phase * 1.3) * 7 * resolved.turbulence
      };
    }
    if (profile === "upwardEmber") {
      const heat = 1 - progress;
      return {
        x: origin.x + Math.cos(angle) * distance * 0.78 + Math.cos(side) * wander * (0.55 + heat * 0.45),
        y: origin.y + Math.sin(angle) * distance * 0.86 + Math.sin(side) * wander * 0.52 + resolved.acceleration * progress * progress * 80
      };
    }
    if (profile === "risingBubble") {
      const rise = progress * life * 26 * Math.max(0.35, resolved.speed);
      return {
        x: origin.x + Math.sin(progress * Math.PI * 5 + index) * (7 + resolved.turbulence * 8) + Math.cos(side) * wander * 0.18,
        y: origin.y - rise + resolved.acceleration * progress * progress * 30
      };
    }
    if (profile === "fountainSpray") {
      const spray = progress * life * 42 * Math.max(0.3, resolved.speed);
      return {
        x: origin.x + Math.cos(angle) * spray + Math.cos(side) * wander * 0.48,
        y: origin.y + Math.sin(angle) * spray + Math.sin(side) * wander * 0.32 + Math.abs(resolved.acceleration) * progress * progress * 90
      };
    }
    if (profile === "ashDrift") {
      return {
        x: origin.x + Math.cos(angle) * distance * 0.75 + Math.cos(side) * wander * 0.65,
        y: origin.y + Math.sin(angle) * distance * 0.75 + Math.sin(side) * wander * 0.65 + Math.abs(resolved.acceleration) * progress * progress * 70
      };
    }
    return {
      x: origin.x + Math.cos(angle) * distance + Math.cos(side) * wander,
      y: origin.y + Math.sin(angle) * distance + Math.sin(side) * wander + resolved.acceleration * progress * progress * 80
    };
  }

  function drawParticleMark(ctx, resolved, x, y, radius, alpha, index, progress, angle) {
    const shape = resolved.particleShape || "softDot";
    const primary = index % 4 ? resolved.primaryColor : resolved.secondaryColor;
    ctx.save();
    ctx.translate(x, y);
    if (shape === "dustSpeck") {
      ctx.rotate(angle + (hash(resolved.instance.seed, index + 470) - 0.5) * 1.2);
      ctx.fillStyle = rgba(primary, alpha * 0.95);
      ctx.fillRect(-radius * 0.65, -radius * 0.25, radius * 1.3, Math.max(0.7, radius * 0.5));
    } else if (shape === "elongatedMote") {
      ctx.rotate(angle + 0.25 + Math.sin(progress * Math.PI * 2 + index) * 0.35);
      ctx.strokeStyle = rgba(primary, alpha * 0.92);
      ctx.lineWidth = Math.max(0.85, radius * 0.5);
      ctx.beginPath();
      ctx.moveTo(-radius * 1.25, 0);
      ctx.lineTo(radius * 1.25, 0);
      ctx.stroke();
    } else if (shape === "ember") {
      ctx.rotate(angle + Math.sin(index) * 0.35);
      const ember = ctx.createRadialGradient(0, -radius * 0.25, 0, 0, 0, radius * 1.7);
      ember.addColorStop(0, rgba("#FFF4B8", alpha));
      ember.addColorStop(0.35, rgba(primary, alpha * 0.95));
      ember.addColorStop(1, rgba(resolved.glowColor, 0));
      ctx.fillStyle = ember;
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.72, radius * 1.35, 0, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "sparkle") {
      ctx.strokeStyle = rgba(primary, alpha);
      ctx.lineWidth = Math.max(0.9, radius * 0.36);
      ctx.beginPath();
      ctx.moveTo(-radius * 1.5, 0);
      ctx.lineTo(radius * 1.5, 0);
      ctx.moveTo(0, -radius * 1.5);
      ctx.lineTo(0, radius * 1.5);
      ctx.stroke();
      ctx.fillStyle = rgba(resolved.glowColor, alpha * 0.78);
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.7, radius * 0.45), 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "bubble") {
      ctx.strokeStyle = rgba(primary, alpha * 0.95);
      ctx.lineWidth = Math.max(0.9, radius * 0.32);
      ctx.beginPath();
      ctx.arc(0, 0, radius * 1.15, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = rgba("#FFFFFF", alpha * 0.52);
      ctx.beginPath();
      ctx.arc(-radius * 0.36, -radius * 0.42, Math.max(0.45, radius * 0.28), 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "fireflyCore") {
      const pulse = 0.75 + Math.sin(progress * Math.PI * 2 + index) * 0.25;
      const firefly = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * (4.8 + resolved.glow));
      firefly.addColorStop(0, rgba("#FFFFFF", alpha));
      firefly.addColorStop(0.16, rgba(primary, alpha * Math.min(1.12, pulse + 0.12)));
      firefly.addColorStop(1, rgba(resolved.glowColor, 0));
      ctx.fillStyle = firefly;
      ctx.beginPath();
      ctx.arc(0, 0, radius * (2.8 + resolved.glow), 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = rgba(primary, alpha);
      ctx.beginPath();
      ctx.arc(0, 0, Math.max(0.9, radius * 0.64), 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === "ashFlake") {
      ctx.rotate(angle + Math.sin(progress * Math.PI * 4 + index));
      ctx.fillStyle = rgba(primary, alpha * 0.86);
      ctx.fillRect(-radius * 0.75, -radius * 0.3, radius * 1.5, Math.max(0.7, radius * 0.6));
    } else if (shape === "droplet") {
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillStyle = rgba(primary, alpha * 0.98);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 0.5, radius * 1.3, 0, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = rgba(primary, alpha);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawParticles(ctx, resolved, time) {
    const count = particleCount(resolved);
    const angle = resolved.directionDeg * Math.PI / 180;
    ctx.globalCompositeOperation = resolved.blendMode || resolved.preset.blendMode;
    for (let index = 0; index < count; index += 1) {
      const life = Math.max(0.2, resolved.lifetime * (0.7 + hash(resolved.instance.seed, index + 800) * resolved.variance));
      const burstOffset = Math.floor(index / 5) * resolved.burstiness * life * 0.37;
      const progress = ((time * resolved.speed + hash(resolved.instance.seed, index + 100) * life + burstOffset) % life) / life;
      const origin = particleOrigin(resolved, index);
      const rawDepth = hash(resolved.instance.seed, index + 200);
      const bands = Math.max(1, Math.round(resolved.depthBands));
      const bandedDepth = bands === 1 ? rawDepth : Math.round(rawDepth * (bands - 1)) / (bands - 1);
      const depth = 0.45 + bandedDepth * 0.8;
      const position = particlePosition(resolved, origin, index, progress, depth, time, angle, life);
      const x = position.x;
      const y = position.y;
      const burstGate = resolved.burstiness > 0
        ? 0.25 + 0.75 * Math.max(0, Math.sin(time * resolved.speed * 3.2 + Math.floor(index / 5) * 1.7))
        : 1;
      const visibilityBoost = resolved.emissive ? 1.18 : 1.08;
      const alpha = clamp(fade(progress, resolved.fadeIn, resolved.fadeOut) * resolved.opacity * resolved.intensity * (0.46 + depth * 0.38) * burstGate * visibilityBoost, 0, 1);
      const radius = Math.max(0.7, resolved.size * depth * (1.1 + hash(resolved.instance.seed, index + 400) * 2.4));
      if (resolved.emissive && resolved.glow > 0 && resolved.particleShape !== "fireflyCore") {
        ctx.fillStyle = rgba(resolved.glowColor, alpha * 0.28 * resolved.glow);
        ctx.beginPath();
        ctx.arc(x, y, radius * (2.4 + resolved.glow + resolved.softness * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      drawParticleMark(ctx, resolved, x, y, radius, alpha, index, progress, angle);
    }
  }

  function drawFog(ctx, resolved, time) {
    const bounds = geometryBounds(resolved.geometry);
    const q = QUALITY[resolved.quality] || QUALITY.high;
    const layers = Math.max(1, Math.round(resolved.depthBands * (resolved.preset.qualityScale?.[resolved.quality] ?? q.layers)));
    drawWithFeatheredMask(ctx, resolved, (buffer) => {
      for (let layer = 0; layer < layers; layer += 1) {
        const phase = hash(resolved.instance.seed, layer) * Math.PI * 2;
        const layerVariance = 1 + (hash(resolved.instance.seed, layer + 90) - 0.5) * resolved.variance;
        const drift = time * resolved.speed * (6 + layer * 2.5) * layerVariance;
        const angle = resolved.directionDeg * Math.PI / 180;
        const bandTop = bounds.y + bounds.height * (0.18 + layer / Math.max(1, layers) * 0.44);
        const bandHeight = bounds.height * (0.38 + hash(resolved.instance.seed, layer + 40) * 0.28);
        const gradient = buffer.createLinearGradient(bounds.x, bandTop - bandHeight * 0.5, bounds.x, bandTop + bandHeight * 0.5);
        gradient.addColorStop(0, rgba(resolved.tintColor, 0));
        gradient.addColorStop(0.38, rgba(resolved.tintColor, resolved.opacity * resolved.intensity * resolved.amount * (0.055 + layer * 0.014)));
        gradient.addColorStop(0.75, rgba(resolved.tintColor, resolved.opacity * resolved.intensity * resolved.amount * (0.16 + layer * 0.025)));
        gradient.addColorStop(1, rgba(resolved.tintColor, 0));
        buffer.fillStyle = gradient;
        buffer.filter = `blur(${Math.max(4, resolved.softness * 14 * q.blur)}px)`;
        const wave = phase + drift * 0.01 * Math.max(0.1, resolved.oscillation);
        const x = bounds.x - bounds.width * 0.12 +
          Math.cos(angle) * Math.sin(phase + drift * 0.006) * bounds.width * 0.08 +
          Math.sin(wave) * bounds.width * 0.04 * resolved.turbulence;
        const y = bandTop +
          Math.sin(angle) * Math.sin(phase + drift * 0.005) * bounds.height * 0.05 +
          Math.cos(wave * 0.8) * bounds.height * 0.025 * resolved.turbulence;
        buffer.beginPath();
        buffer.moveTo(x, y);
        buffer.bezierCurveTo(
          x + bounds.width * 0.32, y - bandHeight * 0.18 + Math.sin(wave) * 18,
          x + bounds.width * 0.72, y + bandHeight * 0.2 + Math.cos(wave * 0.7) * 14,
          x + bounds.width * 1.24, y + Math.sin(wave * 0.6) * 10
        );
        buffer.lineTo(x + bounds.width * 1.24, y + bandHeight);
        buffer.bezierCurveTo(
          x + bounds.width * 0.74, y + bandHeight * 0.78 + Math.cos(wave) * 16,
          x + bounds.width * 0.3, y + bandHeight * 1.08 + Math.sin(wave * 0.8) * 12,
          x, y + bandHeight
        );
        buffer.closePath();
        buffer.fill();
      }
    });
  }

  function drawPlume(ctx, resolved, time) {
    const geometry = resolved.geometry;
    const count = particleCount(resolved);
    const directionDeg = resolved.overriddenFields.includes("directionDeg") ? resolved.directionDeg : (geometry.directionDeg ?? resolved.directionDeg);
    const angle = directionDeg * Math.PI / 180;
    ctx.globalCompositeOperation = resolved.blendMode || "source-over";
    for (let index = 0; index < count; index += 1) {
      const life = resolved.lifetime * (0.65 + hash(resolved.instance.seed, index + 3) * 0.7);
      const progress = ((time * resolved.speed + hash(resolved.instance.seed, index + 8) * life) % life) / life;
      const sourceWidth = Math.max(2, geometry.width || resolved.startWidth);
      const targetWidth = Math.max(sourceWidth, resolved.endWidth || sourceWidth * 5);
      const sourceOffset = (hash(resolved.instance.seed, index + 13) - 0.5) * sourceWidth;
      const spreadDeg = ((geometry.spreadDeg || 18) * Math.PI / 180) * (hash(resolved.instance.seed, index + 17) - 0.5);
      const travel = progress * life * (34 + resolved.speed * 10);
      const plumeAngle = angle + spreadDeg * (0.25 + progress * 0.75);
      const width = sourceWidth + (targetWidth - sourceWidth) * progress * resolved.plumeExpansion;
      const side = sourceOffset * (1 - progress) + (hash(resolved.instance.seed, index + 11) - 0.5) * width +
        Math.sin(progress * 9 + index) * resolved.turbulence * (7 + progress * 16);
      const x = geometry.x + Math.cos(plumeAngle) * travel + Math.cos(angle + Math.PI / 2) * side + progress * resolved.windStrength * 92;
      const y = geometry.y + Math.sin(plumeAngle) * travel + Math.sin(angle + Math.PI / 2) * side;
      const radius = resolved.size * (sourceWidth * 0.12 + progress * targetWidth * 0.07 + 3);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const pulse = resolved.pulseRate > 0
        ? 0.45 + 0.55 * Math.max(0, Math.sin(time * resolved.pulseRate * Math.PI * 2 - index * resolved.burstiness))
        : 1;
      const alpha = clamp(fade(progress, resolved.fadeIn, resolved.fadeOut) * resolved.opacity * resolved.intensity * (0.18 + (1 - progress) * 0.13) * pulse, 0, 1);
      gradient.addColorStop(0, rgba(resolved.primaryColor, alpha));
      gradient.addColorStop(clamp(0.45 + resolved.softness * 0.12, 0.45, 0.75), rgba(resolved.secondaryColor, alpha * 0.45));
      gradient.addColorStop(1, rgba(resolved.primaryColor, 0));
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawBeam(ctx, resolved, time) {
    const geometry = resolved.geometry;
    const directionDeg = resolved.overriddenFields.includes("directionDeg") ? resolved.directionDeg : (geometry.directionDeg ?? resolved.directionDeg);
    const angle = directionDeg * Math.PI / 180;
    const length = geometry.length || 500;
    const startWidth = resolved.overriddenFields.includes("startWidth") ? resolved.startWidth : (geometry.startWidth || resolved.startWidth);
    const endWidth = resolved.overriddenFields.includes("endWidth") ? resolved.endWidth : (geometry.endWidth || resolved.endWidth);
    const sideX = Math.cos(angle + Math.PI / 2);
    const sideY = Math.sin(angle + Math.PI / 2);
    const end = { x: geometry.x + Math.cos(angle) * length, y: geometry.y + Math.sin(angle) * length };
    const gradient = ctx.createLinearGradient(geometry.x, geometry.y, end.x, end.y);
    gradient.addColorStop(0, rgba(resolved.primaryColor, resolved.opacity * resolved.intensity * (0.58 + resolved.glow * 0.16)));
    gradient.addColorStop(0.65, rgba(resolved.primaryColor, resolved.opacity * resolved.intensity * 0.26));
    gradient.addColorStop(1, rgba(resolved.primaryColor, 0));
    ctx.fillStyle = gradient;
    ctx.filter = `blur(${resolved.softness * 5 + resolved.edgeFeatherPx * 0.09}px)`;
    ctx.beginPath();
    ctx.moveTo(geometry.x + sideX * startWidth / 2, geometry.y + sideY * startWidth / 2);
    ctx.lineTo(end.x + sideX * endWidth / 2, end.y + sideY * endWidth / 2);
    ctx.lineTo(end.x - sideX * endWidth / 2, end.y - sideY * endWidth / 2);
    ctx.lineTo(geometry.x - sideX * startWidth / 2, geometry.y - sideY * startWidth / 2);
    ctx.closePath();
    ctx.fill();
    if (resolved.amount > 0) {
      resolved._beamDust ||= {
        ...resolved,
        amount: resolved.amount * 0.28,
        particleCap: resolved.particleCap,
        glow: 0,
        geometry: { type: "polygon", points: [
          { x: geometry.x + sideX * startWidth / 2, y: geometry.y + sideY * startWidth / 2 },
          { x: end.x + sideX * endWidth / 2, y: end.y + sideY * endWidth / 2 },
          { x: end.x - sideX * endWidth / 2, y: end.y - sideY * endWidth / 2 },
          { x: geometry.x - sideX * startWidth / 2, y: geometry.y - sideY * startWidth / 2 }
        ], cutouts: [] }
      };
      drawParticles(ctx, resolved._beamDust, time);
    }
  }

  function drawSurface(ctx, resolved, time, glintOnly = false) {
    const bounds = geometryBounds(resolved.geometry);
    const count = Math.max(2, Math.round((glintOnly ? 7 : 22) * resolved.highlightDensity * resolved.amount *
      (resolved.preset.qualityScale?.[resolved.quality] ?? QUALITY[resolved.quality]?.segments ?? 1)));
    drawWithFeatheredMask(ctx, resolved, (buffer) => {
      buffer.globalCompositeOperation = resolved.blendMode || (glintOnly ? "lighter" : "screen");
      buffer.filter = `blur(${glintOnly ? resolved.softness * 0.35 : resolved.softness * 1.1}px)`;
      const angle = resolved.directionDeg * Math.PI / 180;
      for (let index = 0; index < count; index += 1) {
        const speedVariance = 1 + (hash(resolved.instance.seed, index + 120) - 0.5) * resolved.variance;
        const phase = (time * resolved.speed * speedVariance * (glintOnly ? 0.14 : 0.09) + hash(resolved.instance.seed, index)) % 1;
        if (glintOnly && phase > 0.36 + hash(resolved.instance.seed, index + 91) * 0.12) continue;
        const localPhase = glintOnly ? phase / 0.36 : phase;
        const x = bounds.x + localPhase * bounds.width + (hash(resolved.instance.seed, index + 90) - 0.5) * bounds.width * (glintOnly ? 0.12 : 0.24);
        const y = bounds.y + hash(resolved.instance.seed, index + 40) * bounds.height + Math.sin(time * resolved.speed + index) * resolved.turbulence * 3;
        const length = (glintOnly ? 16 : 54) * resolved.size * (0.4 + hash(resolved.instance.seed, index + 60) * (1 + resolved.variance));
        const glowScale = index % 4 ? 1 : (0.6 + resolved.glow * 0.5);
        const alpha = clamp(resolved.opacity * resolved.intensity * (glintOnly ? 0.72 : 0.3) * Math.sin(localPhase * Math.PI) * glowScale, 0, 1);
        buffer.strokeStyle = rgba(index % 4 ? resolved.primaryColor : resolved.glowColor, alpha);
        buffer.lineWidth = glintOnly ? Math.max(1, resolved.size * 1.35) : 1.4 + hash(resolved.instance.seed, index + 70) * 3.8;
        buffer.beginPath();
        if (glintOnly) {
          buffer.moveTo(x - Math.cos(angle) * length / 2, y - Math.sin(angle) * length / 2);
          buffer.lineTo(x + Math.cos(angle) * length / 2, y + Math.sin(angle) * length / 2);
        } else {
          const bow = Math.sin(index * 1.7) * 6 * resolved.turbulence;
          buffer.moveTo(x - Math.cos(angle) * length / 2, y - Math.sin(angle) * length / 2);
          buffer.quadraticCurveTo(
            x + Math.cos(angle + Math.PI / 2) * bow,
            y + Math.sin(angle + Math.PI / 2) * bow,
            x + Math.cos(angle) * length / 2,
            y + Math.sin(angle) * length / 2
          );
        }
        buffer.stroke();
      }
    });
  }

  function drawSunPresence(ctx, resolved, time) {
    const geometry = resolved.geometry;
    const q = QUALITY[resolved.quality] || QUALITY.high;
    const center = { x: geometry.x, y: geometry.y };
    const radius = Math.max(80, geometry.radius || 220) * resolved.size;
    const speed = resolved.animationSpeed * Math.max(0.05, resolved.speed);
    const pulse = 1 + Math.sin(time * speed * 0.36 + hash(resolved.instance.seed, 4) * Math.PI * 2) * 0.026 * resolved.bloomStrength;
    const bloomRadius = radius * (1.72 + resolved.softness * 0.22) * pulse;
    const coreRadius = radius * (0.35 + resolved.glow * 0.04) * pulse;
    const warmCore = mixColor(resolved.primaryColor, "#FFFFFF", 0.22 - resolved.warmth * 0.08);
    const warmBloom = mixColor(resolved.secondaryColor, resolved.glowColor, resolved.warmth * 0.36);

    ctx.globalCompositeOperation = resolved.blendMode || "screen";

    const bloom = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, bloomRadius);
    bloom.addColorStop(0, rgba(warmCore, resolved.intensity * resolved.opacity * resolved.bloomStrength * 0.36));
    bloom.addColorStop(0.18, rgba(resolved.secondaryColor, resolved.intensity * resolved.opacity * resolved.bloomStrength * 0.2));
    bloom.addColorStop(0.48, rgba(warmBloom, resolved.intensity * resolved.opacity * resolved.bloomStrength * 0.052));
    bloom.addColorStop(1, rgba(resolved.glowColor, 0));
    ctx.fillStyle = bloom;
    ctx.beginPath();
    ctx.arc(center.x, center.y, bloomRadius, 0, Math.PI * 2);
    ctx.fill();

    if (resolved.rayStrength > 0.01) {
      const rayCount = Math.max(4, Math.min(24, Math.round(resolved.rayCount * (resolved.preset.qualityScale?.[resolved.quality] ?? q.layers))));
      const baseLength = radius * (4.25 + resolved.glow * 0.95);
      const rayRange = normalizeAngleRange(resolved.rayStartAngle, resolved.rayEndAngle);
      const startAngle = rayRange.start * Math.PI / 180;
      const fanWidth = (rayRange.end - rayRange.start) * Math.PI / 180;
      const animationAmount = sunAnimationControl(resolved.rayAnimationAmount);
      const driftSpeed = sunAnimationControl(resolved.rayDriftSpeed) * animationAmount;
      const pulseSpeed = sunAnimationControl(resolved.rayPulseSpeed) * animationAmount;
      const spreadBreathing = sunAnimationControl(resolved.raySpreadBreathing) * animationAmount;
      const wobbleAmount = sunAnimationControl(resolved.rayWobbleAmount) * animationAmount;
      for (let index = 0; index < rayCount; index += 1) {
        const spreadSeed = hash(resolved.instance.seed, index + 110);
        const phase = hash(resolved.instance.seed, index + 120) * Math.PI * 2;
        const breathe = Math.sin(time * speed * (0.16 + spreadSeed * 0.1) * driftSpeed + phase);
        const opacityPulse = Math.sin(time * speed * (0.22 + hash(resolved.instance.seed, index + 130) * 0.12) * pulseSpeed + phase * 1.7);
        const angle = startAngle + index * (fanWidth / Math.max(1, rayCount - 1)) +
          Math.sin(time * speed * 0.14 * driftSpeed + index * 1.7 + phase) * 0.048 * wobbleAmount;
        const spread = 0.038 + hash(resolved.instance.seed, index + 140) * 0.072 * (0.45 + wobbleAmount * 0.55) +
          breathe * 0.016 * spreadBreathing;
        const length = baseLength * (0.86 + spreadSeed * 0.58 + Math.max(0, breathe) * 0.08 * animationAmount);
        const emphasis = index % 3 === 1 ? 1.34 : (index % 3 === 2 ? 0.82 : 1.06);
        const alpha = resolved.opacity * resolved.intensity * resolved.rayStrength *
          (0.082 + hash(resolved.instance.seed, index + 170) * 0.076 + opacityPulse * 0.022 * animationAmount) * emphasis;
        const ray = ctx.createRadialGradient(center.x, center.y, radius * 0.08, center.x, center.y, length);
        ray.addColorStop(0, rgba(resolved.primaryColor, alpha * 1.28));
        ray.addColorStop(0.18, rgba(resolved.primaryColor, alpha * 0.96));
        ray.addColorStop(0.48, rgba(resolved.secondaryColor, alpha * 0.64));
        ray.addColorStop(1, rgba(resolved.glowColor, 0));
        ctx.fillStyle = ray;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(center.x + Math.cos(angle - spread) * length, center.y + Math.sin(angle - spread) * length);
        ctx.lineTo(center.x + Math.cos(angle + spread) * length, center.y + Math.sin(angle + spread) * length);
        ctx.closePath();
        ctx.fill();
      }
    }

    const cloudCount = Math.max(2, Math.round(5 * (resolved.preset.qualityScale?.[resolved.quality] ?? q.layers)));
    for (let index = 0; index < cloudCount; index += 1) {
      const phase = hash(resolved.instance.seed, index + 220) * Math.PI * 2;
      const cx = center.x + radius * (0.62 + index * 0.28) + Math.sin(time * speed * 0.08 + phase) * radius * 0.035;
      const cy = center.y + radius * (0.18 + hash(resolved.instance.seed, index + 230) * 0.18) + Math.cos(time * speed * 0.07 + phase) * radius * 0.026;
      const cloudRadius = radius * (0.54 + hash(resolved.instance.seed, index + 240) * 0.18);
      const cloud = ctx.createRadialGradient(cx, cy, 0, cx, cy, cloudRadius);
      cloud.addColorStop(0, rgba(resolved.tintColor, resolved.opacity * resolved.intensity * resolved.bloomStrength * 0.048));
      cloud.addColorStop(1, rgba(resolved.tintColor, 0));
      ctx.fillStyle = cloud;
      ctx.beginPath();
      ctx.arc(cx, cy, cloudRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (resolved.heatShimmerStrength > 0.01) {
      const rings = Math.max(2, Math.round(7 * (resolved.preset.qualityScale?.[resolved.quality] ?? q.segments)));
      ctx.lineWidth = Math.max(0.75, resolved.heatShimmerStrength * 1.25);
      for (let ring = 0; ring < rings; ring += 1) {
        const ringRadius = radius * (0.28 + ring * 0.16) +
          Math.sin(time * speed * 0.55 + ring) * radius * 0.018;
        const alpha = resolved.opacity * resolved.intensity * resolved.heatShimmerStrength * (0.035 - ring * 0.0032);
        ctx.strokeStyle = rgba(resolved.primaryColor, alpha);
        ctx.beginPath();
        for (let step = 0; step <= 64; step += 1) {
          const angle = step / 64 * Math.PI * 2;
          const wobble = Math.sin(angle * 5 + time * speed * 0.8 + ring) * radius * 0.012 +
            Math.sin(angle * 9 - time * speed * 0.55 + ring * 0.4) * radius * 0.006;
          const x = center.x + Math.cos(angle) * (ringRadius + wobble);
          const y = center.y + Math.sin(angle) * (ringRadius * 0.72 + wobble);
          if (step === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    }

    const core = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, coreRadius);
    core.addColorStop(0, rgba("#FFFFFF", resolved.opacity * resolved.intensity * 0.42));
    core.addColorStop(0.24, rgba(warmCore, resolved.opacity * resolved.intensity * 0.38));
    core.addColorStop(0.66, rgba(resolved.secondaryColor, resolved.opacity * resolved.intensity * 0.14));
    core.addColorStop(1, rgba(resolved.secondaryColor, 0));
    ctx.fillStyle = core;
    ctx.beginPath();
    ctx.arc(center.x, center.y, coreRadius, 0, Math.PI * 2);
    ctx.fill();

    if (resolved.dustAmount > 0.01) {
      const dustCount = Math.max(0, Math.floor(Math.min(resolved.particleCap, resolved.preset.hardCap) *
        resolved.dustAmount * (resolved.preset.qualityScale?.[resolved.quality] ?? q.particles)));
      const dustWidth = radius * 3.3;
      const dustHeight = radius * 1.7;
      const drift = time * speed * radius * 0.045;
      for (let index = 0; index < dustCount; index += 1) {
        const depth = 0.45 + hash(resolved.instance.seed, index + 310) * 0.8;
        const cycle = hash(resolved.instance.seed, index + 320);
        const localX = ((cycle * dustWidth + drift * (0.45 + depth * 0.4)) % dustWidth) - dustWidth * 0.42;
        const localY = (hash(resolved.instance.seed, index + 330) - 0.5) * dustHeight +
          Math.sin(time * speed * 0.5 + hash(resolved.instance.seed, index + 340) * Math.PI * 2) * radius * 0.018;
        const x = center.x + localX;
        const y = center.y + radius * 0.2 + localY;
        const distanceFade = clamp(1 - Math.hypot(x - center.x, (y - center.y) * 1.35) / (radius * 2.45), 0, 1);
        const alpha = resolved.opacity * resolved.intensity * resolved.dustAmount *
          (0.032 + hash(resolved.instance.seed, index + 350) * 0.05) * (0.3 + distanceFade * 0.7);
        const dustRadius = Math.max(0.55, resolved.size * (0.7 + depth * 1.7));
        ctx.fillStyle = rgba(index % 3 ? resolved.primaryColor : resolved.secondaryColor, alpha);
        ctx.beginPath();
        ctx.arc(x, y, dustRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  function drawResolved(ctx, resolved, time) {
    ctx.save();
    ctx.globalAlpha = clamp(resolved.opacity, 0, 1);
    if (resolved.preset.renderer === "glowField") drawWithOptionalMask(ctx, resolved, (target) => drawGlow(target, resolved, time));
    if (resolved.preset.renderer === "particleField") drawWithOptionalMask(ctx, resolved, (target) => drawParticles(target, resolved, time));
    if (resolved.preset.renderer === "fogField") drawFog(ctx, resolved, time);
    if (resolved.preset.renderer === "plumeEmitter") drawWithOptionalMask(ctx, resolved, (target) => drawPlume(target, resolved, time));
    if (resolved.preset.renderer === "lightBeam") drawWithOptionalMask(ctx, resolved, (target) => drawBeam(target, resolved, time));
    if (resolved.preset.renderer === "surfaceShimmer") drawSurface(ctx, resolved, time, false);
    if (resolved.preset.renderer === "surfaceGlint") drawSurface(ctx, resolved, time, true);
    if (resolved.preset.renderer === "sunPresence") drawWithOptionalMask(ctx, resolved, (target) => drawSunPresence(target, resolved, time));
    ctx.restore();
  }

  function detectQuality() {
    const forced = document.documentElement.dataset.effectsQuality;
    if (QUALITY[forced]) return forced;
    const ipad = /iPad/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    return ipad ? "balanced" : "high";
  }

  function createRuntime(options) {
    const getLevel = options.getLevel;
    const getScreen = options.getScreen;
    const warn = options.warn || console.warn;
    let levelId = null;
    let rafId = null;
    let paused = false;
    let previewEpoch = performance.now();
    let lastFrame = 0;
    let resolved = [];
    let visibility = { mode: "all", selectedId: null };

    function canvases() {
      return [...document.querySelectorAll("[data-scene-effects-canvas]")];
    }

    function prepareLevel(selectedLevel) {
      const changedLevel = selectedLevel?.id !== levelId;
      stop();
      if (changedLevel) {
        paused = false;
        visibility = { mode: "all", selectedId: null };
        previewEpoch = performance.now();
      }
      levelId = selectedLevel?.id || null;
      const validation = validateLevel(selectedLevel || {});
      validation.errors.forEach((message) => warn(`[Atlas effects] ${levelId || "unknown"}: ${message}`));
      syncResolved();
      sync();
      return validation;
    }

    function syncResolved() {
      const current = getLevel();
      const quality = detectQuality();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      resolved = (current?.sceneEffects || [])
        .filter((effect) => effect?.enabled !== false && validateInstance(effect, current).valid)
        .filter((effect) => {
          if (visibility.mode === "selectedHidden") return effect.id !== visibility.selectedId;
          if (visibility.mode === "isolate") return effect.id === visibility.selectedId;
          if (visibility.mode === "backgroundOnly") return false;
          return true;
        })
        .map((effect) => resolve(effect, current, { quality, reducedMotion }))
        .filter(Boolean);
      return resolved;
    }

    function canRun() {
      return Boolean(getLevel()?.id === levelId && ["scene", "challenge", "correct"].includes(getScreen()) && !document.hidden && !paused && resolved.length);
    }

    function sizeCanvas(canvas) {
      const current = getLevel();
      if (!current) return false;
      if (canvas.width !== current.world.width) canvas.width = current.world.width;
      if (canvas.height !== current.world.height) canvas.height = current.world.height;
      return true;
    }

    function draw(timestamp, force = false) {
      rafId = null;
      if (!canRun() && !force) return;
      const quality = detectQuality();
      const fps = QUALITY[quality].updateFps;
      if (!force && timestamp - lastFrame < 1000 / fps) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = timestamp;
      const time = Math.max(0, timestamp - previewEpoch) / 1000;
      for (const canvas of canvases()) {
        if (!sizeCanvas(canvas)) continue;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        resolved.filter((effect) => effect.layerSlot === canvas.dataset.sceneEffectsCanvas).forEach((effect) => drawResolved(ctx, effect, time));
      }
      if (canRun()) rafId = requestAnimationFrame(draw);
    }

    function sync() {
      syncResolved();
      canvases().forEach(sizeCanvas);
      if (!canRun()) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        return;
      }
      if (resolved.some((effect) => effect.preset.renderer === "sunPresence")) {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        draw(performance.now(), true);
      }
      if (!rafId) rafId = requestAnimationFrame(draw);
    }

    function stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      canvases().forEach((canvas) => canvas.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height));
    }

    function pause() {
      paused = true;
      stop();
    }

    function play() {
      paused = false;
      sync();
    }

    function restart() {
      previewEpoch = performance.now();
      syncResolved();
      draw(previewEpoch, true);
      sync();
    }

    function generateSeed(id) {
      const current = getLevel();
      const effect = current?.sceneEffects?.find((item) => item.id === id);
      if (!effect) return null;
      effect.seed = Math.floor(Math.random() * 2147483647);
      restart();
      return effect.seed;
    }

    function setVisibility(mode, selectedId = null) {
      visibility = { mode, selectedId };
      restart();
    }

    function dispose() {
      stop();
      resolved = [];
      levelId = null;
    }

    return {
      prepareLevel, syncResolved, sync, stop, pause, play, restart, generateSeed, setVisibility, dispose,
      get paused() { return paused; },
      get resolved() { return resolved; },
      get rafId() { return rafId; }
    };
  }

  function defaultInstance(presetId, variantId, world, index = 0) {
    const selectedPreset = presetById(presetId);
    const selectedVariant = variantById(selectedPreset, variantId) || selectedPreset?.variants?.[0];
    if (!selectedPreset || !selectedVariant) return null;
    const geometry = clone(selectedPreset.defaultGeometry);
    const centerX = Math.round((world?.width || 1000) * 0.5 + index * 24);
    const centerY = Math.round((world?.height || 700) * 0.5 + index * 18);
    if (Number.isFinite(geometry.x)) geometry.x = centerX;
    if (Number.isFinite(geometry.y)) geometry.y = centerY;
    if (geometry.type === "polygon") {
      const width = Math.min(520, (world?.width || 1000) * 0.35);
      const height = Math.min(220, (world?.height || 700) * 0.26);
      geometry.points = [
        { x: centerX - width / 2, y: centerY - height / 2 }, { x: centerX + width / 2, y: centerY - height / 2 },
        { x: centerX + width / 2, y: centerY + height / 2 }, { x: centerX - width / 2, y: centerY + height / 2 }
      ].map((point) => ({ x: Math.round(point.x), y: Math.round(point.y) }));
      geometry.cutouts = [];
    }
    return {
      id: `${presetId}-${String(index + 1).padStart(2, "0")}`,
      label: `${selectedVariant.name} ${index + 1}`,
      presetId,
      variantId: selectedVariant.id,
      presetVersion: selectedPreset.version,
      enabled: true,
      seed: Math.floor(hash(Date.now(), index) * 2147483647),
      qualityTier: "auto",
      layerSlot: selectedPreset.layerSlot,
      groupId: "",
      geometry,
      overrides: {}
    };
  }

  window.AtlasSceneEffects = {
    VERSION,
    CATEGORIES,
    LAYER_SLOTS,
    GEOMETRY_TYPES,
    QUALITY,
    CONTROL_DEFS,
    PRESETS,
    clone,
    hash,
    color,
    rgba,
    presetById,
    variantById,
    resolve,
    validateGeometry,
    validateMask,
    validateInstance,
    validateLevel,
    geometryBounds,
    maskBounds,
    pointInsideGeometry,
    pointInsideMask,
    polygonSelfIntersects,
    defaultInstance,
    createRuntime
  };
})();
