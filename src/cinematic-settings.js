(function (global) {
  "use strict";
  // This contract is also loaded by the editor server: one set of bounds for disk, UI and GPU.
  const n = (value, min, max, step = 0.01) => ({ value, min, max, step });
  const common = { enabled: true, x: n(800, -8000, 16000, 1), y: n(500, -8000, 16000, 1), color: "#ffe3bc" };
  const region = { shape: ["ellipse", "rectangle", "polygon"], width: n(800, 1, 16000, 1), height: n(400, 1, 16000, 1), softness: n(0.6, 0.01, 1), direction: n(0, -180, 180, 1) };
  const systems = {
    grading: { label: "Global grading", fields: { enabled: false, exposure: n(0, -3, 3), contrast: n(1, 0.5, 1.8), highlights: n(0, -1, 1), shadows: n(0, -1, 1), saturation: n(1, 0, 2), warmth: n(0, -1, 1), tint: n(0, -1, 1), blackPoint: n(0, 0, 0.2) } },
    localLights: { label: "Local lights", type: 1, fields: { ...common, radius: n(300, 1, 4000, 1), intensity: n(0.6, 0, 6), falloff: n(2, 0.25, 6), aspect: n(1, 0.1, 5), softness: n(0.7, 0.01, 1), behavior: ["steady", "fire", "slowPulse", "arcane"], flickerAmount: n(0.18, 0, 1), flickerSpeed: n(2, 0, 12), randomness: n(0.8, 0, 1), colorSpill: n(0.6, 0, 1), characterInfluence: n(1, 0, 2), atmosphereInfluence: n(1, 0, 3) } },
    areaLights: { label: "Area / directional lights", type: 2, fields: { ...common, ...region, intensity: n(0.3, 0, 4), falloff: n(1.5, 0.25, 5) } },
    shafts: { label: "Light shafts", type: 3, fields: { ...common, direction: n(65, -180, 180, 1), length: n(900, 1, 8000, 1), width: n(180, 1, 3000, 1), intensity: n(0.4, 0, 4), softness: n(0.7, 0.01, 1), density: n(0.5, 0, 3), decay: n(1.5, 0, 6), noiseAmount: n(0.65, 0, 1), noiseScale: n(1, 0.1, 8), noiseSpeed: n(0.15, 0, 3) } },
    atmosphere: { label: "Atmospheric volumes / illuminated haze", type: 4, fields: { ...common, ...region, color: "#a6b9c2", density: n(0.2, 0, 2), scale: n(1, 0.1, 5), driftSpeed: n(10, 0, 150), driftDirection: n(0, -180, 180, 1), turbulence: n(0.4, 0, 2), noiseScale: n(1, 0.1, 8), noiseDetail: n(4, 1, 5, 1) } },
    bloom: { label: "Emissive / bloom", fields: { enabled: false, intensity: n(0.25, 0, 2), threshold: n(0.8, 0.1, 3), softKnee: n(0.2, 0.01, 1), radius: n(8, 1, 40, 1), falloff: n(1.5, 0.5, 4), colorInfluence: n(0.8, 0, 1), localContribution: n(0.3, 0, 1) } },
    particles: { label: "Particle fields", type: 5, fields: { ...common, ...region, count: n(600, 1, 20000, 1), size: n(1.3, 0.2, 12), sizeVariation: n(0.6, 0, 1), speed: n(12, 0, 300), turbulence: n(0.5, 0, 3), lifetime: n(12, 0.5, 60), opacity: n(0.3, 0, 1), glow: n(0.4, 0, 3), gravity: n(-0.5, -100, 100), randomness: n(0.8, 0, 1) } },
    characters: { label: "Character relighting", fields: { enabled: false, groundingShadow: true, showShadowContactDebug: false, shadowLightSourceX: n(161, -8000, 16000, 1), shadowLightSourceY: n(202, -8000, 16000, 1), shadowShape: ["silhouette", "tapered", "oval", "capsule", "wideSoft"], shadowGroundlineOffset: n(0, -30, 30, 1), shadowStrength: n(5, 0, 10), shadowOpacity: n(100, 0, 100, 1), shadowSoftness: n(0.72, 0, 6), shadowWidth: n(1, 0.25, 4), shadowLength: n(1, 0.25, 3), shadowScale: n(1.2, 0.5, 3), shadowOffsetX: n(0, -160, 160, 1), shadowOffsetY: n(0, -120, 120, 1), shadowDirection: n(-10, -180, 180, 1), shadowGlobalLightInfluence: n(1, 0, 2), shadowLocalLightInfluence: n(2, 0, 5), shadowDirectionSmoothing: n(0.08, 0, 4), shadowDarkBackgroundSuppression: n(0.85, 0, 1), shadowAtmosphereSuppression: n(1, 0, 1), ambientInfluence: n(0.15, 0, 2), localInfluence: n(0.7, 0, 2), colorSpill: n(0.65, 0, 1), intensityResponse: n(0.6, 0, 2) } },
    wrap: { label: "Light wrap", fields: { enabled: false, strength: n(0.1, 0, 1), radius: n(2, 0.5, 8), colorInfluence: n(0.7, 0, 1) } },
    rim: { label: "Rim / edge lighting", fields: { enabled: false, strength: n(0.1, 0, 1), width: n(1.5, 0.5, 6), colorResponse: n(0.8, 0, 1), localInfluence: n(0.8, 0, 2), ambientInfluence: n(0.1, 0, 1) } },
    autoExposure: { label: "Auto exposure (experimental)", fields: { enabled: false, minExposure: n(-0.5, -3, 3), maxExposure: n(0.5, -3, 3), adaptationSpeed: n(0.25, 0.01, 2), strength: n(0.4, 0, 1) } },
    finishing: { label: "Vignette / finishing", fields: { enabled: false, intensity: n(0.15, 0, 0.8), softness: n(0.7, 0.05, 1), finalExposure: n(0, -2, 2), finalContrast: n(1, 0.5, 1.5) } }
  };
  const layers = {
    environment: { label: "Environment", help: "Air and weather across the scene. Use volumes for haze and fields for drifting or falling particles." },
    globalLighting: { label: "Global Lighting", help: "The scene's main light and color composition: sun, moon, god rays and grading." },
    effects: { label: "Effects", help: "Local sources such as torches, runes, embers and bloom. Keep their influence close to the artwork's sources." },
    characters: { label: "Characters", help: "How Sven, NPCs and animals receive scene light and atmosphere. Does not edit character entities or their original appearance." }
  };
  const membership = { environment: ["atmosphere", "particles", "waterSurface", "waterSparkles"], globalLighting: ["grading", "areaLights", "shafts", "autoExposure", "finishing", "depth"], effects: ["localLights", "bloom"], characters: ["characters", "wrap", "rim"] };
  systems.godRays = { label: "God Rays", type: 6, layer: "globalLighting", fields: { ...common, direction:n(55,-180,180,1), spread:n(65,5,150,1), rayCount:n(12,3,32,1), rayWidth:n(0.45,0.08,0.9), widthVariation:n(0.65,0,1), spacingVariation:n(0.5,0,1), rayMotion:n(0,0,1), motionSpeed:n(0.14,0.02,1), fadeVariation:n(0.25,0,0.8), length:n(1250,50,8000,1), intensity:n(1.5,0,5), softness:n(0.65,0.05,1), feather:n(0.35,0.05,0.9), decay:n(0.8,0,4), breakup:n(0.55,0,1), noiseScale:n(1,0.1,8), noiseAmount:n(0.4,0,1), noiseSpeed:n(0.12,0,2), atmosphereInfluence:n(1.2,0,3) } };
  systems.waterSurface = { label: "Water Surface", type: 7, layer: "environment", fields: { ...common, ...region, color: "#d9f5ff", shimmerStrength:n(2.5,0,8), shimmerCoverage:n(0.5,0,1), sparkleSize:n(10,2,40,0.5), anisotropy:n(6,1,14,0.1), shimmerSoftness:n(0.08,0.01,0.25), evolutionSpeed:n(0.8,0,4,0.05), highlightContrast:n(2.2,0.25,5,0.05), shimmerDirection:n(0,-45,45,1), depth:n(0.88,0,1), depthOcclusion:n(1,0,1), depthSoftness:n(0.035,0.005,0.3) } };
  systems.waterSparkles = { label: "Water Sparkles", type: 8, layer: "environment", fields: { ...common, ...region, color: "#f4fff8", sparkleStrength:n(2.2,0,8), sparkleDensity:n(0.45,0,1), sparkleSize:n(2.2,0.5,8,0.1), sizeVariation:n(0.72,0,1), twinkleSpeed:n(1.15,0,5,0.05), twinkleVariation:n(0.82,0,1), clusterScale:n(140,20,600,1), clusterAmount:n(0.68,0,1), peakIntensity:n(1.8,0,4,0.05), anisotropy:n(1.55,0.5,5,0.05), artworkInfluence:n(0.65,0,1), depth:n(0.88,0,1), depthOcclusion:n(1,0,1), depthSoftness:n(0.035,0.005,0.3) } };
  systems.gameplayCues = { label: "Challenge / exit cues", layer:"effects", fields:{ enabled:true, intensity:n(1,0,2), characterInfluence:n(1,0,2) } };
  systems.depth = { label: "Scene depth", fields: { enabled: true, filterRadius: n(1.5, 0.5, 5), perspective: n(0, 0, 0.3) } };
  for (const [layer, keys] of Object.entries(membership)) for (const key of keys) systems[key].layer = layer;
  const depthFields = { depth: n(0.65, 0, 1), depthInfluence: n(1, 0, 1), depthSoftness: n(0.12, 0.02, 0.4) };
  for (const key of ["localLights", "areaLights", "shafts", "particles", "godRays"]) Object.assign(systems[key].fields, depthFields);
  Object.assign(systems.shafts.fields, { atmosphereInfluence: n(1, 0, 3) });
  Object.assign(systems.atmosphere.fields, { depthInfluence: n(1, 0, 1), nearClear: n(0.88, 0.1, 1), farDensity: n(1.4, 0, 3), depthCurve: n(1.3, 0.25, 4), floorBias: n(0, -1, 1) });
  Object.assign(systems.localLights.fields, { depthBias: n(0.06, -0.4, 0.4) });
  Object.assign(systems.atmosphere.fields, { depthBias: n(0.06, -0.4, 0.4) });
  Object.assign(systems.particles.fields, { layer: ["environment", "effects"], wind: n(0, -250, 250), streak: n(1, 1, 35), pulse: n(0, 0, 1), depthSpread: n(0.3, 0, 1), distribution: ["volume", "source"] });
  systems.particles.fields.speed = n(12, 0, 900);
  systems.shafts.fields.layer = ["globalLighting", "effects"];
  Object.assign(systems.characters.fields, { directionalInfluence: n(0.7, 0, 2), atmosphereInfluence: n(0.65, 0, 2), depthTint: n(0.18, 0, 1), grounding: n(0.12, 0, 0.5), sideLighting:n(0.7,0,1), frontAtmosphere:n(0.45,0,1) });
  const presets = {
    localLights: {
      Steady: { behavior: "steady", color: "#ffe3bc", intensity: 1.4, radius: 300 },
      Fire: { behavior: "fire", color: "#ff9b3d", intensity: 2.3, radius: 280, falloff: 1.1, flickerAmount: 0.2, flickerSpeed: 2.5, atmosphereInfluence: 1.4 },
      Arcane: { behavior: "arcane", color: "#60ebdc", intensity: 2, radius: 240, flickerAmount: 0.28, flickerSpeed: 1.1 },
      Beacon: { behavior: "slowPulse", color: "#ffd890", intensity: 2.2, radius: 420, flickerAmount: 0.5, flickerSpeed: 0.7 }
    },
    areaLights: { Sunlight: { color: "#ffdb88", intensity: 0.7, width: 1800, height: 950, direction: 35 }, Moonlight: { color: "#7cafff", intensity: 0.65, width: 2100, height: 1100, direction: 25 } },
    particles: {
      Pollen: { color: "#ffe6a2", count: 450, size: 2.25, speed: 8, direction: -15, gravity: -0.08, turbulence: 0.8, wind: 3, lifetime: 24, streak: 1, glow: 0.25, opacity: 0.5, depth: 0.7, depthSpread: 0.5 },
      Dust: { color: "#d5bd8c", count: 800, size: 0.8, speed: 4, direction: 0, gravity: 0, turbulence: 0.45, wind: 1, lifetime: 30, streak: 1, glow: 0, opacity: 0.25, depth: 0.65, depthSpread: 0.35 },
      Embers: { layer: "effects", color: "#ff8331", count: 140, size: 1.05, sizeVariation:0.95, speed: 40, direction: -90, gravity: -1.5, turbulence: 1.2, wind: 3, lifetime: 5, streak: 1.8, glow: 1.6, opacity: 0.65, distribution: "source", depth: 0.85, depthSpread: 0.15 },
      Snow: { color: "#e2efff", count: 1600, size: 2.2, sizeVariation: 0.9, speed: 65, direction: 90, gravity: 0.6, turbulence: 1, wind: 18, lifetime: 18, streak: 1, glow: 0, opacity: 0.7, depth: 0.7, depthSpread: 0.6 },
      Drizzle: { color: "#b4cfe2", count: 2400, size: 0.45, speed: 300, direction: 90, gravity: 3, turbulence: 0.04, wind: 22, lifetime: 4, streak: 7, glow: 0, opacity: 0.25, depth: 0.75, depthSpread: 0.45 },
      "Heavy Rain": { color: "#bacfe7", count: 7500, size: 0.7, speed: 720, direction: 90, gravity: 8, turbulence: 0.08, wind: 120, lifetime: 2.2, streak: 23, glow: 0, opacity: 0.45, depth: 0.75, depthSpread: 0.5 },
      "Magic Motes": { layer: "effects", color: "#7de9e8", count: 250, size: 2.1, speed: 6, direction: -90, gravity: 0, turbulence: 2, wind: 0, lifetime: 14, streak: 1, glow: 1.4, opacity: 0.6, pulse: 0.65, depth: 0.8, depthSpread: 0.35 }
    },
    waterSparkles: {
      "Sun Glitter": { color: "#fff9df", sparkleStrength: 2.6, sparkleDensity: 0.56, sparkleSize: 2.15, sizeVariation: 0.78, twinkleSpeed: 1.3, twinkleVariation: 0.86, clusterScale: 125, clusterAmount: 0.72, peakIntensity: 2.15, anisotropy: 1.65, artworkInfluence: 0.7 },
      "Moon Sparkles": { color: "#d9eeff", sparkleStrength: 2.15, sparkleDensity: 0.36, sparkleSize: 1.85, sizeVariation: 0.7, twinkleSpeed: 0.82, twinkleVariation: 0.76, clusterScale: 175, clusterAmount: 0.8, peakIntensity: 1.7, anisotropy: 1.8, artworkInfluence: 0.78 }
    }
  };
  const clone = value => JSON.parse(JSON.stringify(value));
  function fields(schema, value = {}) {
    return Object.fromEntries(Object.entries(schema).map(([key, def]) => {
      let v = value?.[key];
      if (Array.isArray(def)) v = def.includes(v) ? v : def[0];
      else if (typeof def === "boolean") v = typeof v === "boolean" ? v : def;
      else if (typeof def === "string") v = /^#[0-9a-f]{6}$/i.test(v) ? v : def;
      else { v = Number(v ?? def.value); v = Number.isFinite(v) ? Math.max(def.min, Math.min(def.max, v)) : def.value; if (def.step === 1) v = Math.round(v); }
      return [key, v];
    }));
  }
  function instance(key, value = {}, index = 0) {
    const result = { ...fields(systems[key].fields, value), id: String(value.id || `${key}-${index + 1}`).replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80) || `${key}-${index + 1}` };
    result.layer ||= systems[key].layer;
    result.name = String(value.name || result.id).replace(/[<>"&]/g, "").slice(0, 100);
    if (result.shape === "polygon") {
      const points = Array.isArray(value.points) ? value.points : [{ x: -0.5, y: -0.4 }, { x: 0.5, y: -0.3 }, { x: 0.4, y: 0.5 }, { x: -0.4, y: 0.5 }];
      result.points = points.slice(0, 8).map(p => ({ x: Number.isFinite(Number(p?.x)) ? Math.max(-1, Math.min(1, Number(p.x))) : 0, y: Number.isFinite(Number(p?.y)) ? Math.max(-1, Math.min(1, Number(p.y))) : 0 }));
      if (result.points.length < 3) result.shape = "ellipse";
    }
    return result;
  }
  const strengthResponse = 0.505145;
  function migrateLegacyShadowStrength(value) {
    const strength=Math.max(0,Math.min(12,Number(value)||0));
    const opacityAtTwo=1-Math.exp(-0.56);
    const oldOpacity=strength<=2?1-Math.exp(-strength*.28):opacityAtTwo+Math.pow(Math.max(0,Math.min(1,(strength-2)/10)),.9)*(.92-opacityAtTwo);
    return Math.min(5,-Math.log(Math.max(.08,1-oldOpacity))/strengthResponse);
  }
  function normalize(value = {}) {
    const result = { version: 3, layers: Object.fromEntries(Object.keys(layers).map(key => [key, value?.layers?.[key] !== false])) };
    for (const [key, def] of Object.entries(systems)) {
      const input = value?.[key];
      result[key] = def.type ? { enabled: input?.enabled === true, items: (Array.isArray(input?.items) ? input.items : []).slice(0, 12).map((item, i) => instance(key, item, i)) } : fields(def.fields, input);
      // Version 2 used a 0..12 response. Invert its authored-opacity curve into
      // the compact version 3 curve so existing levels retain the same strength.
      if(key==="characters"&&value?.version===2&&Object.hasOwn(input||{},"shadowStrength"))result[key].shadowStrength=migrateLegacyShadowStrength(input.shadowStrength);
      if (def.type) { const ids = new Set(); result[key].items.forEach((item, i) => { if (ids.has(item.id)) item.id = `${key}-${i}-${item.id}`; ids.add(item.id); }); }
    }
    result.autoExposure.maxExposure = Math.max(result.autoExposure.minExposure, result.autoExposure.maxExposure);
    return result;
  }
  // Explicit effect classes only. Water particles, water shimmer, glints, stars and animals stay.
  const replacedPresets = new Set(["light-source-enhancement", "sun-presence", "magical-glow", "ambient-floating-particles", "sparks-and-embers", "living-lights", "atmospheric-fog", "focused-fog", "smoke-and-steam", "light-beam"]);
  function effective(value) {
    const result = clone(value);
    if(value.layers.globalLighting === false) result.depth.perspective=0;
    for (const [key, def] of Object.entries(systems)) {
      if (def.type) result[key].items.forEach(item => { item.enabled &&= value.layers[item.layer] !== false; });
      // Depth is shared spatial guidance, not a light contribution. Its explicit
      // A/B switch is independent of the Global Lighting authoring pane's master.
      else if(key !== "depth") result[key].enabled &&= value.layers[def.layer] !== false;
    }
    return result;
  }
  function preset(key, name, item) {
    // Reset behavioral fields to the primitive defaults so switching rain -> pollen
    // does not leave gravity, streaks or pulsing from the previous preset behind.
    const defaults = instance(key);
    const behavior = Object.fromEntries(Object.keys(presets[key]?.[name] || {}).map(field => [field, defaults[field]]));
    if (key === "particles") for (const field of ["layer", "pulse", "distribution", "sizeVariation", "randomness"]) behavior[field] = defaults[field];
    return instance(key, { ...item, ...behavior, ...presets[key]?.[name] });
  }
  const api = { systems, layers, presets, preset, effective, normalize, instance, clone, replacedPresets };
  global.AtlasCinematicSettings = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
