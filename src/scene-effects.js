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
    warmth: { label: "Warmth", min: 0, max: 1, step: 0.01, section: "advanced" }
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
        flickerAmount: 0.18, sparkAmount: 0.08, warmth: 0.7
      },
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
      renderer: "glowField", layerSlot: "worldLight", geometryTypes: ["point", "pointRadius", "ellipse"],
      variants: [
        variant("wall-torch", "Wall torch"), variant("large-brazier", "Large brazier", { size: 1.35, sparkAmount: 0.18 }),
        variant("candle", "Candle", { intensity: 0.38, size: 0.42 }), variant("lantern", "Lantern", { flickerAmount: 0.08 }),
        variant("window-glow", "Window glow", { intensity: 0.5, softness: 0.9 }), variant("beacon", "Beacon", { intensity: 0.9, size: 1.7 })
      ],
      controls: ["intensity", "amount", "speed", "size", "glow", "softness", "flickerAmount", "sparkAmount", "warmth", "pulseRate", "particleCap"]
    }),
    "magical-glow": preset({
      id: "magical-glow", name: "Magical glow", category: "Magic",
      description: "Emissive core, soft bloom, controlled pulse and optional motes.",
      renderer: "glowField", layerSlot: "worldLight", geometryTypes: ["pointRadius", "ellipse", "polygon"],
      variants: [
        variant("rune", "Rune"), variant("crystal", "Crystal", { pulseRate: 0.45 }),
        variant("sacred", "Sacred", { primaryColor: "#FFF2A6", secondaryColor: "#9CF2E9" }),
        variant("arcane", "Arcane", { primaryColor: "#A98BFF", glowColor: "#735BFF" }),
        variant("warning", "Warning", { primaryColor: "#FF695C", glowColor: "#D72B3F" }),
        variant("portal", "Portal", { intensity: 0.9, pulseAmount: 0.25, size: 1.4 })
      ],
      controls: ["intensity", "amount", "speed", "size", "glow", "softness", "pulseAmount", "pulseRate", "particleCap"]
    }),
    "ambient-floating-particles": preset({
      id: "ambient-floating-particles", name: "Ambient floating particles", category: "Atmosphere",
      description: "Layered environmental particles with organic drift and soft fades.",
      renderer: "particleField", geometryTypes: ["rectangle", "ellipse", "polygon"],
      defaultGeometry: { type: "rectangle", x: 500, y: 340, width: 620, height: 300 },
      variants: [
        variant("warm-pollen", "Warm pollen"), variant("sun-dust", "Sun dust", { primaryColor: "#FFF4C2" }),
        variant("fine-ancient-dust", "Fine ancient dust", { amount: 0.42, size: 0.6 }),
        variant("spores", "Spores", { primaryColor: "#C8EFA2", speed: 0.4 }),
        variant("magic-motes", "Magic motes", { primaryColor: "#8DEAFF", glow: 0.9 }),
        variant("ash-drift", "Ash drift", { primaryColor: "#B8AAA0", acceleration: 0.12 })
      ],
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "softness", "lifetime", "variance", "turbulence", "acceleration", "oscillation", "fadeIn", "fadeOut", "particleCap", "depthBands"]
    }),
    "sparks-and-embers": preset({
      id: "sparks-and-embers", name: "Sparks and embers", category: "Light and fire",
      description: "Short-lived bright fire particles with lift, bursts and speed variation.",
      renderer: "particleField", blendMode: "lighter", geometryTypes: ["point", "pointRadius", "directionalEmitter"],
      variants: [
        variant("rising-sparks", "Rising sparks"), variant("floating-embers", "Floating embers", { lifetime: 6, speed: 0.45 }),
        variant("forge-sparks", "Forge sparks", { speed: 1.8, burstiness: 0.75, directionDeg: -25 }),
        variant("magical-sparks", "Magical sparks", { primaryColor: "#76E8FF", glowColor: "#A98BFF" })
      ],
      defaults: { ...preset({}).defaults, lifetime: 2.1, acceleration: -0.4, glow: 1, particleCap: 72 },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "lifetime", "variance", "turbulence", "acceleration", "fadeIn", "fadeOut", "burstiness", "particleCap"]
    }),
    "living-lights": preset({
      id: "living-lights", name: "Living lights", category: "Nature",
      description: "Autonomous glowing points with wandering paths and irregular pulses.",
      renderer: "particleField", blendMode: "lighter", geometryTypes: ["ellipse", "polygon", "rectangle"],
      defaultGeometry: { type: "ellipse", x: 500, y: 340, width: 520, height: 260 },
      variants: [
        variant("forest-fireflies", "Forest fireflies", { primaryColor: "#E8FF73" }),
        variant("golden-wisps", "Golden wisps", { primaryColor: "#FFD36A", size: 1.5 }),
        variant("blue-spirit-lights", "Blue spirit lights", { primaryColor: "#73E9FF", glowColor: "#6C87FF" }),
        variant("cave-glow-insects", "Cave glow insects", { primaryColor: "#9CF2E9", amount: 0.35 })
      ],
      defaults: { ...preset({}).defaults, amount: 0.28, speed: 0.32, lifetime: 10, oscillation: 1.2, particleCap: 36 },
      controls: ["intensity", "amount", "speed", "size", "glow", "softness", "lifetime", "variance", "turbulence", "oscillation", "pulseAmount", "pulseRate", "particleCap"]
    }),
    "atmospheric-fog": preset({
      id: "atmospheric-fog", name: "Atmospheric fog", category: "Atmosphere",
      description: "Layered non-repeating mist fields with falloff, drift and feathered masks.",
      renderer: "fogField", layerSlot: "backgroundAtmosphere", geometryTypes: ["rectangle", "ellipse", "polygon"],
      defaultGeometry: { type: "rectangle", x: 500, y: 420, width: 760, height: 260 },
      variants: [
        variant("low-ground-mist", "Low ground mist"), variant("harbor-haze", "Harbor haze", { tintColor: "#C6D6D7" }),
        variant("forest-mist", "Forest mist", { tintColor: "#B8CCB0" }), variant("cold-temple-fog", "Cold temple fog", { tintColor: "#B6C9DE" }),
        variant("distant-atmospheric-haze", "Distant atmospheric haze", { intensity: 0.35, softness: 1.2 }),
        variant("moonlit-fog", "Moonlit fog", { tintColor: "#A7BCE3", opacity: 0.48 })
      ],
      performance: "Medium",
      recommendedBudget: 96,
      hardCap: 180,
      qualityScale: { high: 1, balanced: 0.78, reduced: 0.5 },
      controls: ["intensity", "amount", "speed", "directionDeg", "softness", "opacity", "variance", "turbulence", "oscillation", "edgeFeatherPx", "depthBands"]
    }),
    "smoke-and-steam": preset({
      id: "smoke-and-steam", name: "Smoke and steam", category: "Smoke and steam",
      description: "Source-driven plumes with rise, widening, wind, turbulence and pulse emission.",
      renderer: "plumeEmitter", geometryTypes: ["directionalEmitter"],
      defaultGeometry: { type: "directionalEmitter", x: 500, y: 420, directionDeg: -90, spreadDeg: 18, width: 26 },
      variants: [
        variant("chimney-smoke", "Chimney smoke", { primaryColor: "#7D7A76", lifetime: 7, speed: 0.5 }),
        variant("thin-torch-smoke", "Thin torch smoke", { primaryColor: "#AAA39A", amount: 0.32, startWidth: 12 }),
        variant("harbor-smoke", "Harbor smoke", { primaryColor: "#777B7B", windStrength: 0.35 }),
        variant("steam-vent", "Steam vent", { primaryColor: "#E7EFEF", speed: 1.2, lifetime: 2.4 }),
        variant("warm-steam-plume", "Warm steam plume", { primaryColor: "#F4E8D6", speed: 0.9, lifetime: 3 }),
        variant("fountain-mist-plume", "Fountain mist plume", { primaryColor: "#E6FAFF", amount: 0.46, lifetime: 1.5, size: 0.6 })
      ],
      performance: "Medium",
      recommendedBudget: 90,
      hardCap: 180,
      qualityScale: { high: 1, balanced: 0.74, reduced: 0.46 },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "softness", "opacity", "lifetime", "variance", "turbulence", "fadeIn", "fadeOut", "windStrength", "plumeExpansion", "pulseRate", "burstiness", "particleCap"]
    }),
    "light-beam": preset({
      id: "light-beam", name: "Light beam", category: "Light and fire",
      description: "Directional atmospheric light with soft trapezoid shaping and dust participation.",
      renderer: "lightBeam", layerSlot: "worldLight", geometryTypes: ["directionalBeam", "polygon"],
      recommendedBudget: 30,
      hardCap: 80,
      defaultGeometry: { type: "directionalBeam", x: 420, y: 80, directionDeg: 70, length: 520, startWidth: 45, endWidth: 260 },
      variants: [
        variant("window-beam", "Window beam"), variant("forest-sun-rays", "Forest sun rays", { opacity: 0.34 }),
        variant("temple-shaft", "Temple shaft", { primaryColor: "#FFF0B0" }), variant("sacred-beam", "Sacred beam", { primaryColor: "#FFF7C7", glow: 0.8 }),
        variant("moon-beam", "Moon beam", { primaryColor: "#B8D1FF", glowColor: "#879EEA" })
      ],
      controls: ["intensity", "amount", "speed", "directionDeg", "glow", "softness", "opacity", "startWidth", "endWidth", "turbulence", "edgeFeatherPx", "particleCap"]
    }),
    "water-surface": preset({
      id: "water-surface", name: "Water surface", category: "Water",
      description: "Masked directional shimmer, highlight bands, tint and restrained sparkle.",
      renderer: "surfaceShimmer", geometryTypes: ["rectangle", "ellipse", "polygon"],
      defaultGeometry: { type: "polygon", points: [{ x: 200, y: 430 }, { x: 800, y: 430 }, { x: 800, y: 650 }, { x: 200, y: 650 }], cutouts: [] },
      variants: [
        variant("calm-water", "Calm water"), variant("harbor-water", "Harbor water", { directionDeg: 6, primaryColor: "#A7C8D8" }),
        variant("moonlit-water", "Moonlit water", { primaryColor: "#AFC8F4", glowColor: "#DDE8FF" }),
        variant("sunlit-water", "Sunlit water", { primaryColor: "#BFE9EA", glowColor: "#FFF0A6" }),
        variant("fountain-basin", "Fountain basin", { speed: 1.2, highlightDensity: 0.9 }),
        variant("dark-canal-water", "Dark canal water", { primaryColor: "#557981", intensity: 0.45 })
      ],
      performance: "Medium",
      recommendedBudget: 72,
      hardCap: 140,
      qualityScale: { high: 1, balanced: 0.76, reduced: 0.48 },
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "softness", "opacity", "variance", "turbulence", "edgeFeatherPx", "highlightDensity", "particleCap"]
    }),
    "surface-glint": preset({
      id: "surface-glint", name: "Surface glint", category: "Surfaces",
      description: "Localized material-aware highlight sweeps for stone, glass, metal and crystal.",
      renderer: "surfaceGlint", geometryTypes: ["rectangle", "ellipse", "polygon", "directionalBeam"],
      defaultGeometry: { type: "rectangle", x: 500, y: 380, width: 420, height: 150 },
      variants: [
        variant("wet-stone", "Wet stone"), variant("glass-sweep", "Glass sweep", { speed: 1.25, amount: 0.28 }),
        variant("metal-glint", "Metal glint", { amount: 0.18, glow: 0.9 }), variant("crystal-shimmer", "Crystal shimmer", { primaryColor: "#BDEEFF" }),
        variant("marble-sheen", "Marble sheen", { opacity: 0.28, softness: 1.1 })
      ],
      controls: ["intensity", "amount", "speed", "size", "directionDeg", "glow", "softness", "opacity", "variance", "edgeFeatherPx", "highlightDensity"]
    }),
    "bubbles-and-spray": preset({
      id: "bubbles-and-spray", name: "Bubbles and spray", category: "Water",
      description: "Bounded bubbles, fountain sparkle, spray and fine splash mist.",
      renderer: "particleField", geometryTypes: ["pointRadius", "rectangle", "ellipse", "polygon", "directionalEmitter"],
      variants: [
        variant("rising-bubbles", "Rising bubbles", { primaryColor: "#DDF8FF", acceleration: -0.25 }),
        variant("underwater-microbubbles", "Underwater microbubbles", { amount: 0.8, size: 0.42 }),
        variant("fountain-sparkle", "Fountain sparkle", { glow: 0.9, lifetime: 1.8 }),
        variant("fountain-spray", "Fountain spray", { directionDeg: -90, acceleration: 0.45, speed: 1.3 }),
        variant("fine-splash-mist", "Fine splash mist", { amount: 0.7, size: 0.35, softness: 1.1 })
      ],
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
    const radius = Math.max(25, geometry.radius || Math.max(bounds.width, bounds.height) / 2) * resolved.size * (0.9 + resolved.softness * 0.16);
    const pulse = 1 + Math.sin(time * resolved.pulseRate * Math.PI * 2 + hash(resolved.instance.seed) * 6.28) * resolved.pulseAmount;
    const flicker = 1 + Math.sin(time * 11.7 + hash(resolved.instance.seed, 3) * 8) * resolved.flickerAmount * 0.35;
    const coreColor = resolved.preset.id === "light-source-enhancement"
      ? mixColor(resolved.primaryColor, "#FF9F43", resolved.warmth * 0.24)
      : resolved.primaryColor;
    const gradient = ctx.createRadialGradient(center.x, center.y, 0, center.x, center.y, radius * pulse);
    gradient.addColorStop(0, rgba(coreColor, resolved.opacity * resolved.intensity * 0.82 * flicker));
    gradient.addColorStop(clamp(0.12 + resolved.softness * 0.08, 0.12, 0.32), rgba(resolved.secondaryColor, resolved.opacity * resolved.intensity * 0.42));
    gradient.addColorStop(clamp(0.46 + resolved.softness * 0.12, 0.46, 0.78), rgba(resolved.glowColor, resolved.opacity * resolved.glow * 0.2));
    gradient.addColorStop(1, rgba(resolved.glowColor, 0));
    ctx.globalCompositeOperation = resolved.blendMode || resolved.preset.blendMode;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(center.x, center.y, radius * pulse, 0, Math.PI * 2);
    ctx.fill();
    if (resolved.sparkAmount > 0) {
      resolved._sparkResolved ||= { ...resolved, amount: resolved.sparkAmount * Math.max(0.2, resolved.amount), particleCap: resolved.particleCap, lifetime: 1.8, acceleration: -0.35 };
      drawParticles(ctx, resolved._sparkResolved, time);
    }
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
      const distance = progress * life * 34 * resolved.speed;
      const wander = Math.sin(progress * Math.PI * 2 * (1 + resolved.oscillation) + hash(resolved.instance.seed, index + 300) * 10) * 24 * resolved.turbulence;
      let x = origin.x + Math.cos(angle) * distance + Math.cos(angle + Math.PI / 2) * wander;
      let y = origin.y + Math.sin(angle) * distance + Math.sin(angle + Math.PI / 2) * wander + resolved.acceleration * progress * progress * 80;
      if (resolved.preset.id === "living-lights") {
        x = origin.x + Math.sin(time * (0.22 + depth * 0.1) + index * 3.1) * 35 * resolved.oscillation;
        y = origin.y + Math.cos(time * (0.18 + depth * 0.08) + index * 2.7) * 24 * resolved.oscillation;
      }
      const burstGate = resolved.burstiness > 0
        ? 0.25 + 0.75 * Math.max(0, Math.sin(time * resolved.speed * 3.2 + Math.floor(index / 5) * 1.7))
        : 1;
      const alpha = fade(progress, resolved.fadeIn, resolved.fadeOut) * resolved.opacity * resolved.intensity * (0.42 + depth * 0.35) * burstGate;
      const radius = Math.max(0.7, resolved.size * depth * (1.1 + hash(resolved.instance.seed, index + 400) * 2.4));
      if (resolved.glow > 0) {
        ctx.fillStyle = rgba(resolved.glowColor, alpha * 0.18 * resolved.glow);
        ctx.beginPath();
        ctx.arc(x, y, radius * (2.4 + resolved.glow + resolved.softness * 0.6), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = rgba(index % 4 ? resolved.primaryColor : resolved.secondaryColor, alpha);
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
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
        const drift = time * resolved.speed * (8 + layer * 3) * layerVariance;
        const angle = resolved.directionDeg * Math.PI / 180;
        const gradient = buffer.createLinearGradient(bounds.x, bounds.y, bounds.x, bounds.y + bounds.height);
        gradient.addColorStop(0, rgba(resolved.tintColor, 0));
        gradient.addColorStop(0.45, rgba(resolved.tintColor, resolved.opacity * resolved.intensity * resolved.amount * 0.08));
        gradient.addColorStop(1, rgba(resolved.tintColor, resolved.opacity * resolved.intensity * resolved.amount * (0.14 + layer * 0.025)));
        buffer.fillStyle = gradient;
        buffer.filter = `blur(${Math.max(3, resolved.softness * 14 * q.blur)}px)`;
        const wave = phase + drift * 0.01 * Math.max(0.1, resolved.oscillation);
        const x = bounds.x - bounds.width * 0.12 +
          Math.cos(angle) * Math.sin(phase + drift * 0.006) * bounds.width * 0.08 +
          Math.sin(wave) * bounds.width * 0.04 * resolved.turbulence;
        const y = bounds.y +
          Math.sin(angle) * Math.sin(phase + drift * 0.005) * bounds.height * 0.05 +
          Math.cos(wave * 0.8) * bounds.height * 0.025 * resolved.turbulence;
        buffer.fillRect(x, y, bounds.width * 1.24, bounds.height);
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
      const travel = progress * life * 38;
      const spread = (geometry.width || resolved.startWidth) * (0.2 + progress * resolved.plumeExpansion);
      const side = (hash(resolved.instance.seed, index + 11) - 0.5) * spread + Math.sin(progress * 9 + index) * resolved.turbulence * 9;
      const x = geometry.x + Math.cos(angle) * travel + Math.cos(angle + Math.PI / 2) * side + progress * resolved.windStrength * 80;
      const y = geometry.y + Math.sin(angle) * travel + Math.sin(angle + Math.PI / 2) * side;
      const radius = resolved.size * (4 + progress * 15 * resolved.plumeExpansion);
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      const pulse = resolved.pulseRate > 0
        ? 0.45 + 0.55 * Math.max(0, Math.sin(time * resolved.pulseRate * Math.PI * 2 - index * resolved.burstiness))
        : 1;
      const alpha = fade(progress, resolved.fadeIn, resolved.fadeOut) * resolved.opacity * resolved.intensity * 0.2 * pulse;
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
    gradient.addColorStop(0, rgba(resolved.primaryColor, resolved.opacity * resolved.intensity * (0.42 + resolved.glow * 0.12)));
    gradient.addColorStop(0.65, rgba(resolved.primaryColor, resolved.opacity * resolved.intensity * 0.18));
    gradient.addColorStop(1, rgba(resolved.primaryColor, 0));
    ctx.fillStyle = gradient;
    ctx.filter = `blur(${resolved.softness * 7 + resolved.edgeFeatherPx * 0.12}px)`;
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
    const count = Math.max(2, Math.round((glintOnly ? 9 : 20) * resolved.highlightDensity * resolved.amount *
      (resolved.preset.qualityScale?.[resolved.quality] ?? QUALITY[resolved.quality]?.segments ?? 1)));
    drawWithFeatheredMask(ctx, resolved, (buffer) => {
      buffer.globalCompositeOperation = resolved.blendMode || (glintOnly ? "lighter" : "screen");
      buffer.filter = `blur(${resolved.softness * 0.8}px)`;
      const angle = resolved.directionDeg * Math.PI / 180;
      for (let index = 0; index < count; index += 1) {
        const speedVariance = 1 + (hash(resolved.instance.seed, index + 120) - 0.5) * resolved.variance;
        const phase = (time * resolved.speed * speedVariance * (glintOnly ? 0.18 : 0.08) + hash(resolved.instance.seed, index)) % 1;
        const x = bounds.x + phase * bounds.width + (hash(resolved.instance.seed, index + 90) - 0.5) * bounds.width * 0.2;
        const y = bounds.y + hash(resolved.instance.seed, index + 40) * bounds.height + Math.sin(time * resolved.speed + index) * resolved.turbulence * 3;
        const length = (glintOnly ? 18 : 42) * resolved.size * (0.4 + hash(resolved.instance.seed, index + 60) * (1 + resolved.variance));
        const glowScale = index % 4 ? 1 : (0.6 + resolved.glow * 0.5);
        const alpha = resolved.opacity * resolved.intensity * (glintOnly ? 0.35 : 0.2) * Math.sin(phase * Math.PI) * glowScale;
        buffer.strokeStyle = rgba(index % 4 ? resolved.primaryColor : resolved.glowColor, alpha);
        buffer.lineWidth = glintOnly ? 1.4 : 1 + hash(resolved.instance.seed, index + 70) * 2.5;
        buffer.beginPath();
        buffer.moveTo(x - Math.cos(angle) * length / 2, y - Math.sin(angle) * length / 2);
        buffer.lineTo(x + Math.cos(angle) * length / 2, y + Math.sin(angle) * length / 2);
        buffer.stroke();
      }
    });
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
