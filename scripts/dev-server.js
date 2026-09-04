const fs = require("fs");
const http = require("http");
const path = require("path");
const vm = require("vm");
const { URL } = require("url");
const { writeManifest: writeCharacterManifest } = require("./generate-character-manifest");

const rootDir = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);
const transientSceneEffectDrafts = new Map();

function loadSceneEffectsApi() {
  const context = { window: {}, console, performance: { now: () => 0 } };
  vm.runInNewContext(fs.readFileSync(path.join(rootDir, "src", "scene-effects.js"), "utf8"), context, {
    filename: "src/scene-effects.js"
  });
  return context.window.AtlasSceneEffects;
}

const sceneEffectsApi = loadSceneEffectsApi();
const cinematicSettingsApi = require("../src/cinematic-settings.js");

function sendJson(response, status, payload) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  response.end(JSON.stringify(payload, null, 2));
}

function sendText(response, status, text, contentType = "text/plain; charset=utf-8") {
  response.writeHead(status, { "content-type": contentType });
  response.end(text);
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = "";
    request.on("data", (chunk) => {
      body += chunk;
      if (body.length > 30_000_000) {
        reject(new Error("Request body is too large."));
        request.destroy();
      }
    });
    request.on("end", () => resolve(body));
    request.on("error", reject);
  });
}

function levelDir(levelId) {
  const safeId = String(levelId || "").replace(/[^A-Za-z0-9_-]/g, "");
  return path.join(rootDir, "Levels", safeId);
}

function draftPath(levelId) {
  return path.join(levelDir(levelId), "editor.draft.json");
}

function levelPath(levelId) {
  return path.join(levelDir(levelId), "level.js");
}

function audioConfigPath() {
  return path.join(rootDir, "src", "audio-config.js");
}

function validateWalkPath(value) {
  if (!Array.isArray(value) || value.length < 2) {
    throw new Error("walkPath must be an array with at least two points.");
  }

  return value.map((point, index) => {
    if (!point || typeof point !== "object" || Array.isArray(point)) {
      throw new Error(`walkPath[${index}] must be an object.`);
    }
    if (typeof point.id !== "string" || !point.id.trim()) {
      throw new Error(`walkPath[${index}].id must be a non-empty string.`);
    }
    if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) {
      throw new Error(`walkPath[${index}] must have numeric x and y.`);
    }

    const next = {
      id: point.id,
      x: Math.round(point.x),
      y: Math.round(point.y)
    };
    if (point.role) next.role = String(point.role);
    return next;
  });
}

function validateInteractiveObjects(value) {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("interactiveObjects must be a non-empty array.");
  }

  return value.map((object, index) => {
    if (!object || typeof object !== "object" || Array.isArray(object)) {
      throw new Error(`interactiveObjects[${index}] must be an object.`);
    }
    if (typeof object.id !== "string" || !object.id.trim()) {
      throw new Error(`interactiveObjects[${index}].id must be a non-empty string.`);
    }
    if (typeof object.type !== "string" || !object.type.trim()) {
      throw new Error(`interactiveObjects[${index}].type must be a non-empty string.`);
    }
    if (!object.center || !Number.isFinite(object.center.x) || !Number.isFinite(object.center.y)) {
      throw new Error(`interactiveObjects[${index}].center must have numeric x and y.`);
    }
    if (!Number.isFinite(object.radius) || object.radius <= 0) {
      throw new Error(`interactiveObjects[${index}].radius must be greater than zero.`);
    }

    const next = {
      id: object.id,
      type: object.type,
      center: {
        x: Math.round(object.center.x),
        y: Math.round(object.center.y)
      },
      radius: Math.round(object.radius)
    };
    if (object.objectId) next.objectId = String(object.objectId);
    if (object.approachNode) next.approachNode = String(object.approachNode);
    if (object.label) next.label = String(object.label);
    if (Array.isArray(object.allowOverlapWith)) {
      next.allowOverlapWith = object.allowOverlapWith.map(String);
    }
    return next;
  });
}

function worldConfigPath() {
  return path.join(rootDir, "Levels", "world-config.js");
}

function loadLevelCatalog() {
  const manifestPath = path.join(rootDir, "Levels", "manifest.js");
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(manifestPath, "utf8"), context, { filename: manifestPath });
  return context.window.SVEN_LEVEL_MANIFEST?.levels || [];
}

function catalogRootId(levelId, catalog) {
  const byId = new Map(catalog.map((entry) => [entry.id, entry]));
  let current = byId.get(levelId);
  const seen = new Set();
  while (current?.connectedFrom && !seen.has(current.id)) {
    seen.add(current.id);
    current = byId.get(current.connectedFrom);
  }
  return current?.id || null;
}

function normalizeWorldConfig(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("World config must be an object.");
  const result = { version: 1, worlds: {}, levels: {}, locomotion: {} };
  const catalog = loadLevelCatalog();
  const catalogById = new Map(catalog.map((entry) => [entry.id, entry]));
  Object.entries(value.worlds || {}).forEach(([worldId, world]) => {
    if (!catalogById.has(worldId) || catalogById.get(worldId).connectedFrom) throw new Error(`Unknown world: ${worldId}`);
    const order = Array.isArray(world.order) ? world.order : [];
    const uniqueOrder = [...new Set(order.map(String))];
    uniqueOrder.forEach((levelId) => {
      if (catalogRootId(levelId, catalog) !== worldId) throw new Error(`Level ${levelId} does not belong to ${worldId}.`);
    });
    const enabled = {};
    Object.entries(world.enabled || {}).forEach(([levelId, isEnabled]) => {
      if (catalogRootId(levelId, catalog) !== worldId) throw new Error(`Level ${levelId} does not belong to ${worldId}.`);
      if (isEnabled === false) enabled[levelId] = false;
    });
    result.worlds[worldId] = { order: uniqueOrder, enabled };
  });
  Object.entries(value.levels || {}).forEach(([levelId, settings]) => {
    if (!catalogById.has(levelId)) throw new Error(`Unknown level settings: ${levelId}`);
    if (!settings || typeof settings !== "object" || Array.isArray(settings)) throw new Error(`Invalid settings for ${levelId}`);
    const next = {};
    const ranges = {
      spriteScale: [0.5, 1.8], movementSpeed: [80, 520], animationSpeed: [0.5, 1.8],
      backgroundBrightness: [0.5, 1.5], backgroundContrast: [0.5, 1.5], backgroundSaturation: [0, 2],
      backgroundWarmth: [-1, 1], backgroundTint: [-1, 1], svenBrightness: [0.5, 1.5],
      svenContrast: [0.5, 1.5], svenSaturation: [0, 2], svenWarmth: [-1, 1], svenTint: [-1, 1]
    };
    Object.entries(ranges).forEach(([key, [min, max]]) => {
      if (settings[key] === undefined) return;
      const number = Number(settings[key]);
      if (!Number.isFinite(number) || number < min || number > max) throw new Error(`${levelId}.${key} is out of range.`);
      next[key] = number;
    });
    if (settings.backgroundOverride !== undefined) {
      const background = String(settings.backgroundOverride).replace(/\\/g, "/");
      if (!background.startsWith(`Levels/${levelId}/assets/`) || background.includes("..")) {
        throw new Error(`${levelId}.backgroundOverride must reference its level assets folder.`);
      }
      next.backgroundOverride = background;
    }
    if (settings.emissiveGlow !== undefined) {
      const glow = settings.emissiveGlow;
      if (!glow || typeof glow !== "object" || Array.isArray(glow)) throw new Error(`${levelId}.emissiveGlow must be an object.`);
      const intensity = Number(glow.intensity);
      const radius = Number(glow.radius);
      const sensitivity = Number(glow.sensitivity);
      if (typeof glow.enabled !== "boolean") throw new Error(`${levelId}.emissiveGlow.enabled must be boolean.`);
      if (!Number.isFinite(intensity) || intensity < 0 || intensity > 1.25) throw new Error(`${levelId}.emissiveGlow.intensity is out of range.`);
      if (!Number.isFinite(radius) || radius < 2 || radius > 24) throw new Error(`${levelId}.emissiveGlow.radius is out of range.`);
      if (!Number.isFinite(sensitivity) || sensitivity < 0 || sensitivity > 1) throw new Error(`${levelId}.emissiveGlow.sensitivity is out of range.`);
      next.emissiveGlow = { enabled: glow.enabled, intensity, radius, sensitivity };
    }
    if (settings.cinematicLighting !== undefined) {
      if (!settings.cinematicLighting || typeof settings.cinematicLighting !== "object" || Array.isArray(settings.cinematicLighting)) throw new Error(`${levelId}.cinematicLighting must be an object.`);
      next.cinematicLighting = cinematicSettingsApi.normalize(settings.cinematicLighting);
    }
    result.levels[levelId] = next;
  });
  const locomotionRanges = {
    fromIdleMovement: [0, 2], loopMovement: [0.1, 2], toIdleMovement: [0, 1.5],
    toIdleMaxDistance: [1, 200], turnMovement: [0.1, 2], stopEntryDistance: [1, 250],
    shortMoveThreshold: [1, 300], shortMoveAnimationSpeed: [0.25, 4], shortMoveStartFrame: [0, 0.8],
    shortMoveMaxFromIdleAnimation: [0.05, 1], fromIdleAnimationSpeed: [0.25, 3], loopAnimationSpeed: [0.25, 3],
    toIdleAnimationSpeed: [0.25, 3], turnAnimationSpeed: [0.25, 3],
    arrivalDynamicSpeedMin: [0.25, 2], arrivalDynamicSpeedMax: [0.25, 3],
    blinkMinimumInterval: [250, 30000], blinkMaximumInterval: [250, 60000]
  };
  Object.entries(locomotionRanges).forEach(([key, [min, max]]) => {
    if (value.locomotion?.[key] === undefined) return;
    const number = Number(value.locomotion[key]);
    if (!Number.isFinite(number) || number < min || number > max) throw new Error(`locomotion.${key} is out of range.`);
    result.locomotion[key] = number;
  });
  if ((result.locomotion.arrivalDynamicSpeedMin ?? 0) > (result.locomotion.arrivalDynamicSpeedMax ?? Infinity)) {
    throw new Error("Arrival Dynamic Speed Min cannot exceed Max.");
  }
  if ((result.locomotion.blinkMinimumInterval ?? 0) > (result.locomotion.blinkMaximumInterval ?? Infinity)) {
    throw new Error("Blink Minimum Interval cannot exceed Max.");
  }
  return result;
}

function loadWorldConfig() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(worldConfigPath(), "utf8"), context, { filename: worldConfigPath() });
  return normalizeWorldConfig(context.window.SVEN_WORLD_CONFIG || {});
}

function writeWorldConfig(config) {
  const source = `window.SVEN_WORLD_CONFIG = ${JSON.stringify(config, null, 2)};\n`;
  writeTextAtomic(worldConfigPath(), source);
}

function validateLearningChallenges(value) {
  if (!Array.isArray(value)) throw new Error("learningChallenges must be an array.");
  const ids = new Set();
  return value.map((challenge, index) => {
    if (!challenge || typeof challenge !== "object" || Array.isArray(challenge)) {
      throw new Error(`learningChallenges[${index}] must be an object.`);
    }
    if (typeof challenge.id !== "string" || !challenge.id.trim()) {
      throw new Error(`learningChallenges[${index}].id must be a non-empty string.`);
    }
    if (ids.has(challenge.id)) throw new Error(`Duplicate learningChallenges id: ${challenge.id}`);
    ids.add(challenge.id);
    if (challenge.active !== undefined && typeof challenge.active !== "boolean") {
      throw new Error(`learningChallenges[${index}].active must be boolean when provided.`);
    }
    return JSON.parse(JSON.stringify(challenge));
  });
}

function ambientLibraryDir() {
  return path.join(rootDir, "assets", "ambient");
}

function validateAmbientAsset(levelId, value, label, extensions, optional = false) {
  if (optional && !value) return "";
  if (typeof value !== "string" || !value.trim()) throw new Error(`${label} must be a non-empty path.`);
  const normalized = value.replace(/\\/g, "/");
  const prefix = "assets/ambient/";
  if (!normalized.startsWith(prefix) || normalized.includes("..")) {
    throw new Error(`${label} must stay inside ${prefix}`);
  }
  if (!extensions.has(path.extname(normalized).toLowerCase())) throw new Error(`${label} has an unsupported extension.`);
  const resolved = path.resolve(rootDir, normalized);
  const ambientDir = path.resolve(ambientLibraryDir());
  if (!resolved.startsWith(ambientDir + path.sep) || !fs.existsSync(resolved)) throw new Error(`${label} does not exist.`);
  return normalized;
}

const ambientImageExtensions = new Set([".png", ".jpg", ".jpeg", ".webp"]);
const ambientAudioExtensions = new Set([".mp3", ".ogg", ".wav"]);
const flybyMotionProfiles = new Set(["smooth", "organic"]);

function baseNameWithoutExtension(relativePath) {
  return path.basename(relativePath, path.extname(relativePath)).toLowerCase();
}

function assetRole(relativePath, roles) {
  const name = baseNameWithoutExtension(relativePath).replace(/[_\s]+/g, "-");
  for (const role of roles) {
    if (name === role || name.endsWith(`-${role}`) || name.includes(`-${role}-`)) return role;
  }
  return "";
}

function discoverAmbientAssetSets(files) {
  const groups = new Map();
  for (const relativePath of files) {
    const parts = relativePath.split("/");
    const kind = parts[0];
    if (!["animals", "flybys"].includes(kind) || parts.length < 3) continue;
    const folder = parts.slice(0, -1).join("/");
    if (!groups.has(folder)) groups.set(folder, { kind, folder, images: [], audio: [] });
    const group = groups.get(folder);
    const extension = path.extname(relativePath).toLowerCase();
    if (ambientImageExtensions.has(extension)) group.images.push(relativePath);
    if (ambientAudioExtensions.has(extension)) group.audio.push(relativePath);
  }

  const result = { animals: [], flybys: [], warnings: [] };
  const relative = (name) => `assets/ambient/${name}`;
  const roleFor = (group, roles) => {
    const byRole = new Map(group.images.map((image) => [assetRole(image, roles), image]).filter(([role]) => role));
    return byRole;
  };

  [...groups.values()]
    .sort((left, right) => left.folder.localeCompare(right.folder, "en", { sensitivity: "base" }))
    .forEach((group) => {
      const label = group.folder.split("/").at(-1);
      const sound = group.audio[0] ? relative(group.audio[0]) : "";
      if (group.kind === "animals") {
        const roles = roleFor(group, ["open", "closed", "framea", "frame-a", "a", "frameb", "frame-b", "b"]);
        const openFrame = roles.get("open") || roles.get("framea") || roles.get("frame-a") || roles.get("a") || "";
        const closedFrame = roles.get("closed") || roles.get("frameb") || roles.get("frame-b") || roles.get("b") || "";
        if (openFrame && closedFrame) {
          result.animals.push({ key: group.folder, label, openFrame: relative(openFrame), closedFrame: relative(closedFrame), sound });
        } else {
          result.warnings.push(`${group.folder}: expected two animal image frames named open/closed or frame-a/frame-b.`);
        }
      } else {
        const roles = roleFor(group, ["a", "b", "framea", "frame-a", "frameb", "frame-b"]);
        const frameA = roles.get("a") || roles.get("framea") || roles.get("frame-a") || "";
        const frameB = roles.get("b") || roles.get("frameb") || roles.get("frame-b") || "";
        if (frameA && frameB) {
          result.flybys.push({ key: group.folder, label, frameA: relative(frameA), frameB: relative(frameB), sound });
        } else {
          result.warnings.push(`${group.folder}: expected two flyby image frames named a/b or frame-a/frame-b.`);
        }
      }
    });
  return result;
}

function validateAmbientAnimals(value, levelId) {
  if (!Array.isArray(value)) throw new Error("ambientAnimals must be an array.");
  const requiredStrings = ["id", "type", "openFrame", "closedFrame"];
  const requiredNumbers = [
    "x", "y", "scale", "blinkMinMs", "blinkMaxMs", "blinkDurationMs",
    "doubleBlinkChance", "soundCooldownMs"
  ];
  return value.map((animal, index) => {
    if (!animal || typeof animal !== "object" || Array.isArray(animal)) {
      throw new Error(`ambientAnimals[${index}] must be an object.`);
    }
    requiredStrings.forEach((field) => {
      if (typeof animal[field] !== "string" || !animal[field].trim()) {
        throw new Error(`ambientAnimals[${index}].${field} must be a non-empty string.`);
      }
    });
    requiredNumbers.forEach((field) => {
      if (!Number.isFinite(animal[field])) {
        throw new Error(`ambientAnimals[${index}].${field} must be numeric.`);
      }
    });
    if (animal.scale <= 0) throw new Error(`ambientAnimals[${index}].scale must be greater than zero.`);
    if (animal.blinkMinMs > animal.blinkMaxMs) {
      throw new Error(`ambientAnimals[${index}] blinkMinMs must not exceed blinkMaxMs.`);
    }
    if (animal.doubleBlinkChance < 0 || animal.doubleBlinkChance > 1) {
      throw new Error(`ambientAnimals[${index}].doubleBlinkChance must be between 0 and 1.`);
    }
    if (animal.softness !== undefined && (!Number.isFinite(animal.softness) || animal.softness < 0 || animal.softness > 1)) {
      throw new Error(`ambientAnimals[${index}].softness must be between 0 and 1.`);
    }
    if (animal.saturation !== undefined && (!Number.isFinite(animal.saturation) || animal.saturation < 0)) {
      throw new Error(`ambientAnimals[${index}].saturation must be zero or greater.`);
    }
    if (animal.soundVolume !== undefined && (!Number.isFinite(animal.soundVolume) || animal.soundVolume < 0 || animal.soundVolume > 1)) {
      throw new Error(`ambientAnimals[${index}].soundVolume must be between 0 and 1.`);
    }
    if (animal.mirrorX !== undefined && typeof animal.mirrorX !== "boolean") {
      throw new Error(`ambientAnimals[${index}].mirrorX must be boolean.`);
    }
    const next = {
      id: animal.id,
      type: animal.type,
      openFrame: validateAmbientAsset(levelId, animal.openFrame, `ambientAnimals[${index}].openFrame`, ambientImageExtensions),
      closedFrame: validateAmbientAsset(levelId, animal.closedFrame, `ambientAnimals[${index}].closedFrame`, ambientImageExtensions),
      sound: validateAmbientAsset(levelId, animal.sound, `ambientAnimals[${index}].sound`, ambientAudioExtensions, true),
      x: Math.round(animal.x),
      y: Math.round(animal.y),
      scale: Number(animal.scale),
      blinkMinMs: Math.round(animal.blinkMinMs),
      blinkMaxMs: Math.round(animal.blinkMaxMs),
      blinkDurationMs: Math.round(animal.blinkDurationMs),
      doubleBlinkChance: Number(animal.doubleBlinkChance),
      soundCooldownMs: Math.round(animal.soundCooldownMs)
    };
    if (animal.label !== undefined) {
      if (typeof animal.label !== "string" || !animal.label.trim()) {
        throw new Error(`ambientAnimals[${index}].label must be a non-empty string.`);
      }
      next.label = animal.label;
    }
    if (animal.softness !== undefined) next.softness = Number(animal.softness);
    if (animal.saturation !== undefined) next.saturation = Number(animal.saturation);
    if (animal.soundVolume !== undefined) next.soundVolume = Number(animal.soundVolume);
    if (animal.mirrorX !== undefined) next.mirrorX = animal.mirrorX;
    return next;
  });
}

function validateAmbientFlybys(value, levelId) {
  if (!Array.isArray(value)) throw new Error("ambientFlybys must be an array.");
  const ids = new Set();
  return value.map((flyby, index) => {
    if (!flyby || typeof flyby !== "object" || Array.isArray(flyby)) throw new Error(`ambientFlybys[${index}] must be an object.`);
    if (typeof flyby.id !== "string" || !flyby.id.trim()) throw new Error(`ambientFlybys[${index}].id is required.`);
    if (ids.has(flyby.id)) throw new Error(`Duplicate ambientFlybys id: ${flyby.id}`);
    ids.add(flyby.id);
    if (typeof flyby.label !== "string" || !flyby.label.trim()) throw new Error(`ambientFlybys[${index}].label is required.`);
    if (!Array.isArray(flyby.path) || flyby.path.length < 2) throw new Error(`ambientFlybys[${index}].path needs at least 2 points.`);
    const pathPoints = flyby.path.map((point, pointIndex) => {
      if (!Number.isFinite(point?.x) || !Number.isFinite(point?.y)) throw new Error(`ambientFlybys[${index}].path[${pointIndex}] needs numeric x/y.`);
      return { x: Math.round(point.x), y: Math.round(point.y) };
    });
    const number = (field, min = -Infinity, max = Infinity) => {
      const result = Number(flyby[field]);
      if (!Number.isFinite(result) || result < min || result > max) throw new Error(`ambientFlybys[${index}].${field} is invalid.`);
      return result;
    };
    const result = {
      id: flyby.id,
      label: flyby.label,
      frameA: validateAmbientAsset(levelId, flyby.frameA, `ambientFlybys[${index}].frameA`, ambientImageExtensions),
      frameB: validateAmbientAsset(levelId, flyby.frameB, `ambientFlybys[${index}].frameB`, ambientImageExtensions),
      sound: validateAmbientAsset(levelId, flyby.sound, `ambientFlybys[${index}].sound`, ambientAudioExtensions, true),
      path: pathPoints,
      scale: number("scale", 0.001),
      speed: number("speed", 1),
      flapFrequencyHz: number("flapFrequencyHz", 0),
      faceFlightDirection: flyby.faceFlightDirection !== false,
      mirrorX: Boolean(flyby.mirrorX),
      intervalMinMs: Math.round(number("intervalMinMs", 0)),
      intervalMaxMs: Math.round(number("intervalMaxMs", 0)),
      syncKey: String(flyby.syncKey || ""),
      startDelayMs: Math.round(number("startDelayMs", 0)),
      softness: number("softness", 0),
      saturation: number("saturation", 0),
      soundVolume: number("soundVolume", 0, 1),
      rotateAlongPath: Boolean(flyby.rotateAlongPath),
      maxRotationDeg: number("maxRotationDeg", 0, 180)
    };
    const motionProfile = flybyMotionProfiles.has(String(flyby.motionProfile || "smooth"))
      ? String(flyby.motionProfile || "smooth")
      : "smooth";
    if (flyby.motionProfile !== undefined || motionProfile === "organic") result.motionProfile = motionProfile;
    if (flyby.wobble !== undefined || motionProfile === "organic") result.wobble = flyby.wobble === undefined ? 14 : number("wobble", 0, 120);
    if (flyby.speedVariation !== undefined || motionProfile === "organic") result.speedVariation = flyby.speedVariation === undefined ? 0.14 : number("speedVariation", 0, 0.45);
    if (flyby.flutterFrequency !== undefined || motionProfile === "organic") result.flutterFrequency = flyby.flutterFrequency === undefined ? 2.1 : number("flutterFrequency", 0.1, 12);
    if (result.intervalMinMs > result.intervalMaxMs) throw new Error(`ambientFlybys[${index}] minimum interval exceeds maximum.`);
    return result;
  });
}

function validateSceneEffectPayload(sceneEffects, sceneEffectGroups) {
  if (!Array.isArray(sceneEffects)) throw new Error("sceneEffects must be an array.");
  if (!Array.isArray(sceneEffectGroups)) throw new Error("sceneEffectGroups must be an array.");
  const payload = JSON.parse(JSON.stringify({ sceneEffects, sceneEffectGroups }));
  const result = sceneEffectsApi.validateLevel(payload);
  if (!result.valid) throw new Error(result.errors.join(" "));
  return payload;
}

function validateVolume(value, label) {
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    throw new Error(`${label} must be a number between 0 and 1.`);
  }
  return Math.round(value * 100) / 100;
}

function assertProjectAsset(relativePath, label) {
  if (typeof relativePath !== "string" || !relativePath.trim()) {
    throw new Error(`${label} must be a non-empty asset path.`);
  }

  const resolved = path.resolve(rootDir, relativePath);
  if (!resolved.startsWith(rootDir + path.sep)) {
    throw new Error(`${label} escapes the project root: ${relativePath}`);
  }
  if (!fs.existsSync(resolved)) {
    throw new Error(`${label} asset does not exist: ${relativePath}`);
  }
  return relativePath;
}

function validateTrackGroup(group, label) {
  if (!group || typeof group !== "object" || Array.isArray(group)) {
    throw new Error(`${label} must be an object.`);
  }

  return Object.fromEntries(Object.entries(group).map(([key, asset]) => {
    return [key, assertProjectAsset(asset, `${label}.${key}`)];
  }));
}

function validateAudioConfig(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("audioConfig must be an object.");
  }

  const tracks = value.tracks || {};
  const music = validateTrackGroup(tracks.music, "audioConfig.tracks.music");
  const ambience = validateTrackGroup(tracks.ambience, "audioConfig.tracks.ambience");
  const sfx = validateTrackGroup(tracks.sfx, "audioConfig.tracks.sfx");
  const guides = validateTrackGroup(tracks.guides, "audioConfig.tracks.guides");

  const menuMusic = String(value.menu?.music || "");
  if (!music[menuMusic]) throw new Error(`audioConfig.menu.music references missing music track: ${menuMusic}`);

  const levels = {};
  Object.entries(value.levels || {}).forEach(([levelId, config]) => {
    if (!config || typeof config !== "object" || Array.isArray(config)) {
      throw new Error(`audioConfig.levels.${levelId} must be an object.`);
    }
    if (!music[config.music]) throw new Error(`audioConfig.levels.${levelId}.music references missing track: ${config.music}`);
    if (config.ambience !== null && !ambience[config.ambience]) {
      throw new Error(`audioConfig.levels.${levelId}.ambience references missing track: ${config.ambience}`);
    }
    levels[levelId] = {
      music: String(config.music),
      ambience: config.ambience === null ? null : String(config.ambience),
      musicVolume: validateVolume(config.musicVolume, `audioConfig.levels.${levelId}.musicVolume`),
      ambienceVolume: validateVolume(config.ambienceVolume, `audioConfig.levels.${levelId}.ambienceVolume`)
    };
  });

  const sfxVolumes = {};
  Object.keys(sfx).forEach((key) => {
    sfxVolumes[key] = validateVolume(value.volumes?.sfx?.[key] ?? 0.7, `audioConfig.volumes.sfx.${key}`);
  });

  return {
    tracks: { music, ambience, sfx, guides },
    menu: {
      music: menuMusic,
      musicVolume: validateVolume(value.menu?.musicVolume, "audioConfig.menu.musicVolume")
    },
    levels,
    volumes: {
      master: validateVolume(value.volumes?.master, "audioConfig.volumes.master"),
      companionPurr: validateVolume(value.volumes?.companionPurr ?? 0.55, "audioConfig.volumes.companionPurr"),
      sfx: sfxVolumes
    }
  };
}

function escapeString(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatWalkPath(walkPath) {
  const lines = walkPath.map((point) => {
    const role = point.role ? `, role: "${escapeString(point.role)}"` : "";
    return `    { id: "${escapeString(point.id)}", x: ${point.x}, y: ${point.y}${role} }`;
  });
  return `walkPath: [\n${lines.join(",\n")}\n  ]`;
}

function formatValue(value) {
  return JSON.stringify(value, null, 6)
    .replace(/"([^"]+)":/g, "$1:")
    .replace(/\n/g, "\n  ");
}

function formatInteractiveObjects(interactiveObjects) {
  const lines = interactiveObjects.map((object) => {
    const fields = [];
    fields.push(`      id: "${escapeString(object.id)}"`);
    if (object.objectId) fields.push(`      objectId: "${escapeString(object.objectId)}"`);
    fields.push(`      type: "${escapeString(object.type)}"`);
    fields.push(`      center: { x: ${object.center.x}, y: ${object.center.y} }`);
    fields.push(`      radius: ${object.radius}`);
    if (object.approachNode) fields.push(`      approachNode: "${escapeString(object.approachNode)}"`);
    if (object.label) fields.push(`      label: "${escapeString(object.label)}"`);
    if (object.allowOverlapWith) fields.push(`      allowOverlapWith: ${formatValue(object.allowOverlapWith)}`);
    return `    {\n${fields.join(",\n")}\n    }`;
  });
  return `interactiveObjects: [\n${lines.join(",\n")}\n  ]`;
}

function formatAmbientAnimals(ambientAnimals) {
  return `ambientAnimals: ${formatValue(ambientAnimals)}`;
}

function formatAmbientFlybys(ambientFlybys) {
  return `ambientFlybys: ${formatValue(ambientFlybys)}`;
}

function formatSceneEffects(sceneEffects) {
  return `sceneEffects: ${formatValue(sceneEffects)}`;
}

function formatSceneEffectGroups(groups) {
  return `sceneEffectGroups: ${formatValue(groups)}`;
}

function findArrayPropertyRange(source, propertyName) {
  const keyIndex = source.indexOf(`${propertyName}:`);
  if (keyIndex === -1) throw new Error(`level.js does not contain ${propertyName}.`);

  const start = source.indexOf("[", keyIndex);
  if (start === -1) throw new Error(`${propertyName} does not contain an array.`);

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) {
        return { start: keyIndex, end: index + 1 };
      }
    }
  }

  throw new Error(`${propertyName} array was not closed.`);
}

function loadLevelDefinition(levelId) {
  const filePath = levelPath(levelId);
  const source = fs.readFileSync(filePath, "utf8");
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {} } };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: filePath });
  const level = context.window.SVEN_LEVEL_DEFINITIONS?.[levelId];
  if (!level || typeof level !== "object") {
    throw new Error(`level.js does not define ${levelId}.`);
  }
  return level;
}

function replaceFileAtomic(tempPath, filePath) {
  try {
    fs.renameSync(tempPath, filePath);
  } catch (error) {
    if (!['EPERM', 'EEXIST'].includes(error?.code)) throw error;
    fs.copyFileSync(tempPath, filePath);
    fs.unlinkSync(tempPath);
  }
}

function writeLevelDefinitionAtomic(levelId, level) {
  const filePath = levelPath(levelId);
  const source = `window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};\n\nwindow.SVEN_LEVEL_DEFINITIONS[${JSON.stringify(levelId)}] = ${JSON.stringify(level, null, 2)};\n`;
  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tempPath, source);
  replaceFileAtomic(tempPath, filePath);
}

function writeTextAtomic(filePath, source) {
  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tempPath, source);
  replaceFileAtomic(tempPath, filePath);
}

function syncLegacyObjectsGeometry(level) {
  if (!Array.isArray(level.objects)) return;
  const walkNodes = new Map((Array.isArray(level.walkPath) ? level.walkPath : []).map((point) => [point.id, point]));
  const interactiveById = new Map((level.interactiveObjects || []).map((object) => [object.id, object]));
  level.objects = level.objects.map((object) => {
    const interactive = interactiveById.get(object.id);
    if (!interactive) return object;
    const approach = interactive.approachNode ? walkNodes.get(interactive.approachNode) : null;
    return {
      ...object,
      x: interactive.center.x,
      y: interactive.center.y,
      radius: interactive.radius,
      approach: approach ? { x: approach.x, y: approach.y } : object.approach
    };
  });
}

function syncPlayerStart(level) {
  const startNodeId = level.player?.startNode;
  if (!startNodeId || !Array.isArray(level.walkPath)) return;
  const startNode = level.walkPath.find((point) => point.id === startNodeId);
  if (!startNode) return;
  level.player = {
    ...level.player,
    start: { x: startNode.x, y: startNode.y }
  };
}

function findMatchingBracket(source, start, openChar, closeChar) {
  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;
  let inLineComment = false;
  let inBlockComment = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (inLineComment) {
      if (char === "\n") inLineComment = false;
      continue;
    }

    if (inBlockComment) {
      if (char === "*" && next === "/") {
        inBlockComment = false;
        index += 1;
      }
      continue;
    }

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        inString = false;
      }
      continue;
    }

    if (char === "/" && next === "/") {
      inLineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      inBlockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      quote = char;
      continue;
    }

    if (char === openChar) depth += 1;
    if (char === closeChar) {
      depth -= 1;
      if (depth === 0) return index;
    }
  }

  throw new Error(`Could not find closing ${closeChar}.`);
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function levelObjectRange(source, levelId) {
  const assignment = `window.SVEN_LEVEL_DEFINITIONS[${JSON.stringify(levelId)}]`;
  const assignmentIndex = source.indexOf(assignment);
  if (assignmentIndex === -1) throw new Error(`level.js does not define ${levelId}.`);
  const start = source.indexOf("{", assignmentIndex);
  if (start === -1) throw new Error("Could not find the start of the level definition.");
  return { start, end: findMatchingBracket(source, start, "{", "}") };
}

function levelRootIndent(source, range) {
  const match = /\n([ \t]+)(?:"?[A-Za-z_$][\w$-]*"?\s*:)/.exec(source.slice(range.start, range.end));
  return match?.[1] || "  ";
}

function findRootPropertyLine(source, levelId, propertyName) {
  const range = levelObjectRange(source, levelId);
  const indent = levelRootIndent(source, range);
  const pattern = new RegExp(`^${escapeRegExp(indent)}(?:"${propertyName}"|${propertyName})\\s*:`, "m");
  const scopedSource = source.slice(range.start, range.end);
  const match = pattern.exec(scopedSource);
  if (!match) return null;
  return {
    start: range.start + match.index,
    keyStart: range.start + match.index + indent.length,
    indent,
    objectEnd: range.end
  };
}

function findSceneEffectPropertyRange(source, levelId, propertyName) {
  const match = findRootPropertyLine(source, levelId, propertyName);
  if (!match) return null;

  const arrayStart = source.indexOf("[", match.keyStart);
  if (arrayStart === -1) throw new Error(`${propertyName} does not contain an array.`);
  const arrayEnd = findMatchingBracket(source, arrayStart, "[", "]");
  let end = arrayEnd + 1;
  while (source[end] === " " || source[end] === "\t") end += 1;
  if (source[end] === ",") end += 1;
  if (source[end] === "\r" && source[end + 1] === "\n") end += 2;
  else if (source[end] === "\n") end += 1;

  return {
    start: match.start,
    end,
    indent: match.indent
  };
}

function formatSceneEffectProperty(propertyName, value, indent) {
  const formatter = propertyName === "sceneEffectGroups" ? formatSceneEffectGroups : formatSceneEffects;
  return `${indent}${formatter(value)},\n`;
}

function removeSceneEffectProperty(source, levelId, propertyName) {
  const range = findSceneEffectPropertyRange(source, levelId, propertyName);
  if (!range) return source;
  return `${source.slice(0, range.start)}${source.slice(range.end)}`;
}

function replaceSceneEffectProperty(source, levelId, propertyName, value) {
  const range = findSceneEffectPropertyRange(source, levelId, propertyName);
  if (!range) return source;
  return `${source.slice(0, range.start)}${formatSceneEffectProperty(propertyName, value, range.indent)}${source.slice(range.end)}`;
}

function sceneEffectInsertionPoint(source, levelId) {
  const rewardMatch = findRootPropertyLine(source, levelId, "reward");
  if (rewardMatch) {
    return { index: rewardMatch.start, indent: rewardMatch.indent, beforeObjectEnd: false };
  }

  const range = levelObjectRange(source, levelId);
  return { index: range.end, indent: levelRootIndent(source, range), beforeObjectEnd: true };
}

function insertSceneEffectProperties(source, levelId, entries) {
  if (!entries.length) return source;
  const insertion = sceneEffectInsertionPoint(source, levelId);
  const block = entries
    .map((entry) => formatSceneEffectProperty(entry.propertyName, entry.value, insertion.indent))
    .join("");

  if (!insertion.beforeObjectEnd) {
    return `${source.slice(0, insertion.index)}${block}${source.slice(insertion.index)}`;
  }

  const before = source.slice(0, insertion.index).replace(/[ \t]*$/, "");
  const needsComma = before.trimEnd().endsWith(",");
  const comma = needsComma ? "" : ",";
  return `${before}${comma}\n${block}${source.slice(insertion.index)}`;
}

function applySceneEffectSections(levelId, draft) {
  const filePath = levelPath(levelId);
  let source = fs.readFileSync(filePath, "utf8");
  const missing = [];

  for (const entry of [
    { propertyName: "sceneEffectGroups", value: draft.sceneEffectGroups || [] },
    { propertyName: "sceneEffects", value: draft.sceneEffects || [] }
  ]) {
    if (!entry.value.length) {
      source = removeSceneEffectProperty(source, levelId, entry.propertyName);
    } else if (findSceneEffectPropertyRange(source, levelId, entry.propertyName)) {
      source = replaceSceneEffectProperty(source, levelId, entry.propertyName, entry.value);
    } else {
      missing.push(entry);
    }
  }

  source = insertSceneEffectProperties(source, levelId, missing);
  writeTextAtomic(filePath, source);
}

function isSceneEffectsOnlyDraft(draft) {
  const levelKeys = ["walkPath", "interactiveObjects", "learningChallenges", "ambientAnimals", "ambientFlybys", "sceneEffects", "sceneEffectGroups"];
  const changedKeys = Object.keys(draft).filter((key) => levelKeys.includes(key));
  return changedKeys.length > 0 && changedKeys.every((key) => key === "sceneEffects" || key === "sceneEffectGroups");
}

function applyLevelDraft(levelId, draft) {
  if (isSceneEffectsOnlyDraft(draft)) {
    applySceneEffectSections(levelId, draft);
    return;
  }

  const level = loadLevelDefinition(levelId);

  if (draft.walkPath) level.walkPath = draft.walkPath;
  if (draft.interactiveObjects) level.interactiveObjects = draft.interactiveObjects;
  if (draft.learningChallenges) level.learningChallenges = draft.learningChallenges;
  if (draft.ambientAnimals) level.ambientAnimals = draft.ambientAnimals;
  if (draft.ambientFlybys) level.ambientFlybys = draft.ambientFlybys;
  if (draft.sceneEffects) {
    if (draft.sceneEffects.length) level.sceneEffects = draft.sceneEffects;
    else delete level.sceneEffects;
  }
  if (draft.sceneEffectGroups) {
    if (draft.sceneEffectGroups.length) level.sceneEffectGroups = draft.sceneEffectGroups;
    else delete level.sceneEffectGroups;
  }

  syncPlayerStart(level);
  syncLegacyObjectsGeometry(level);
  writeLevelDefinitionAtomic(levelId, level);
}

function upsertArrayProperty(source, propertyName, formatted) {
  if (source.includes(`${propertyName}:`)) {
    const range = findArrayPropertyRange(source, propertyName);
    return `${source.slice(0, range.start)}${formatted}${source.slice(range.end)}`;
  }
  const objectEnd = source.lastIndexOf("\n};");
  if (objectEnd === -1) throw new Error("Could not find the end of the level definition.");
  return `${source.slice(0, objectEnd)},\n    ${formatted}${source.slice(objectEnd)}`;
}

function applyAudioConfigDraft(audioConfig) {
  const source = `window.SVEN_AUDIO_CONFIG = ${JSON.stringify(audioConfig, null, 2)};\n`;
  fs.writeFileSync(audioConfigPath(), source);
}

async function handleDevRequest(request, response, url) {
  if (url.pathname === "/__dev/status") {
    sendJson(response, 200, { ok: true, feature: "level-editor" });
    return true;
  }

  if (url.pathname === "/__dev/world-config") {
    try {
      if (request.method === "GET") {
        sendJson(response, 200, loadWorldConfig());
        return true;
      }
      if (request.method === "POST") {
        const config = normalizeWorldConfig(JSON.parse(await readBody(request) || "{}"));
        writeWorldConfig(config);
        sendJson(response, 200, { ok: true, config });
        return true;
      }
      sendJson(response, 405, { error: "Method not allowed." });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return true;
  }

  const backgroundMatch = url.pathname.match(/^\/__dev\/levels\/([^/]+)\/background$/);
  if (backgroundMatch) {
    const levelId = String(backgroundMatch[1]).replace(/[^A-Za-z0-9_-]/g, "");
    try {
      if (request.method !== "POST" || !fs.existsSync(levelDir(levelId))) throw new Error("Level not found or method not allowed.");
      const body = JSON.parse(await readBody(request) || "{}");
      const extension = path.extname(String(body.filename || "")).toLowerCase();
      if (![".png", ".jpg", ".jpeg", ".webp"].includes(extension)) throw new Error("Choose a PNG, JPG, or WebP image.");
      const match = String(body.data || "").match(/^data:image\/(?:png|jpeg|webp);base64,(.+)$/);
      if (!match) throw new Error("Invalid image upload.");
      const bytes = Buffer.from(match[1], "base64");
      if (!bytes.length || bytes.length > 20_000_000) throw new Error("Image must be between 1 byte and 20 MB.");
      const base = path.basename(String(body.filename), extension).replace(/[^A-Za-z0-9_-]+/g, "-").replace(/^-|-$/g, "") || "background";
      const filename = `${base}-atlas-${Date.now()}${extension === ".jpeg" ? ".jpg" : extension}`;
      const assetsDir = path.join(levelDir(levelId), "assets");
      fs.mkdirSync(assetsDir, { recursive: true });
      fs.writeFileSync(path.join(assetsDir, filename), bytes, { flag: "wx" });
      sendJson(response, 200, { ok: true, path: `Levels/${levelId}/assets/${filename}` });
    } catch (error) {
      sendJson(response, 400, { error: error.message });
    }
    return true;
  }

  const match = url.pathname.match(/^\/__dev\/levels\/([^/]+)\/(editor-draft|apply-editor|ambient-assets)$/);
  if (!match) return false;

  const [, levelId, action] = match;
  const folder = levelDir(levelId);
  if (!folder.startsWith(path.join(rootDir, "Levels") + path.sep) || !fs.existsSync(folder)) {
    sendJson(response, 404, { error: "Level not found." });
    return true;
  }

  try {
    if (request.method === "GET" && action === "ambient-assets") {
      const ambientDir = ambientLibraryDir();
      if (!fs.existsSync(ambientDir)) {
        sendJson(response, 200, { images: [], audio: [] });
        return true;
      }
      const files = fs.readdirSync(ambientDir, { recursive: true, withFileTypes: true })
        .filter((entry) => entry.isFile())
        .map((entry) => path.relative(ambientDir, path.join(entry.parentPath || entry.path, entry.name)).replace(/\\/g, "/"))
        .sort((left, right) => left.localeCompare(right, "en", { sensitivity: "base" }));
      const relative = (name) => `assets/ambient/${name}`;
      const discovered = discoverAmbientAssetSets(files);
      sendJson(response, 200, {
        images: files.filter((name) => ambientImageExtensions.has(path.extname(name).toLowerCase())).map(relative),
        audio: files.filter((name) => ambientAudioExtensions.has(path.extname(name).toLowerCase())).map(relative),
        animals: discovered.animals,
        flybys: discovered.flybys,
        warnings: discovered.warnings
      });
      return true;
    }
    if (request.method === "GET" && action === "editor-draft") {
      if (transientSceneEffectDrafts.has(levelId)) {
        sendJson(response, 200, transientSceneEffectDrafts.get(levelId));
        return true;
      }
      const filePath = draftPath(levelId);
      if (!fs.existsSync(filePath)) {
        sendJson(response, 200, { walkPath: null, interactiveObjects: null, learningChallenges: null, ambientAnimals: null, ambientFlybys: null, sceneEffects: null, sceneEffectGroups: null, audioConfig: null });
        return true;
      }
      sendJson(response, 200, JSON.parse(fs.readFileSync(filePath, "utf8")));
      return true;
    }

    if (request.method === "DELETE" && action === "editor-draft") {
      transientSceneEffectDrafts.delete(levelId);
      const filePath = draftPath(levelId);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      sendJson(response, 200, { ok: true });
      return true;
    }

    if (request.method === "POST") {
      const body = JSON.parse(await readBody(request) || "{}");
      const draft = {};
      if (body.walkPath !== undefined) draft.walkPath = validateWalkPath(body.walkPath);
      if (body.interactiveObjects !== undefined) {
        draft.interactiveObjects = validateInteractiveObjects(body.interactiveObjects);
      }
      if (body.learningChallenges !== undefined) {
        draft.learningChallenges = validateLearningChallenges(body.learningChallenges);
      }
      if (body.ambientAnimals !== undefined) {
        draft.ambientAnimals = validateAmbientAnimals(body.ambientAnimals, levelId);
      }
      if (body.ambientFlybys !== undefined) draft.ambientFlybys = validateAmbientFlybys(body.ambientFlybys, levelId);
      if (body.sceneEffects !== undefined || body.sceneEffectGroups !== undefined) {
        const validated = validateSceneEffectPayload(body.sceneEffects || [], body.sceneEffectGroups || []);
        draft.sceneEffects = validated.sceneEffects;
        draft.sceneEffectGroups = validated.sceneEffectGroups;
      }
      if (draft.ambientAnimals || draft.ambientFlybys) {
        const ids = [...(draft.ambientAnimals || body.ambientAnimals || []), ...(draft.ambientFlybys || body.ambientFlybys || [])]
          .map((item) => item.id);
        if (new Set(ids).size !== ids.length) throw new Error("Configured ambient instance IDs must be unique.");
      }
      if (body.audioConfig !== undefined) draft.audioConfig = validateAudioConfig(body.audioConfig);
      if (!draft.walkPath && !draft.interactiveObjects && !draft.learningChallenges && !draft.ambientAnimals && !draft.ambientFlybys && !draft.sceneEffects && !draft.sceneEffectGroups && !draft.audioConfig) {
        throw new Error("Request must include level editor data.");
      }

      if (action === "editor-draft") {
        const draftDocument = {
          levelId,
          updatedAt: new Date().toISOString(),
          ...draft
        };
        if (isSceneEffectsOnlyDraft(draft)) {
          transientSceneEffectDrafts.set(levelId, draftDocument);
        } else {
          transientSceneEffectDrafts.delete(levelId);
          fs.writeFileSync(draftPath(levelId), JSON.stringify(draftDocument, null, 2));
        }
        sendJson(response, 200, { ok: true, draft: true });
        return true;
      }

      if (action === "apply-editor") {
        const sceneEffectsOnly = isSceneEffectsOnlyDraft(draft);
        if (draft.walkPath || draft.interactiveObjects || draft.learningChallenges || draft.ambientAnimals || draft.ambientFlybys || draft.sceneEffects || draft.sceneEffectGroups) applyLevelDraft(levelId, draft);
        if (draft.audioConfig) applyAudioConfigDraft(draft.audioConfig);
        transientSceneEffectDrafts.delete(levelId);
        if (!sceneEffectsOnly) {
          const filePath = draftPath(levelId);
          if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        }
        sendJson(response, 200, { ok: true, applied: true });
        return true;
      }
    }

    sendJson(response, 405, { error: "Method not allowed." });
  } catch (error) {
    sendJson(response, 400, { error: error.message });
  }
  return true;
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".html") return "text/html; charset=utf-8";
  if (ext === ".js") return "text/javascript; charset=utf-8";
  if (ext === ".css") return "text/css; charset=utf-8";
  if (ext === ".json") return "application/json; charset=utf-8";
  if (ext === ".mp3") return "audio/mpeg";
  if (ext === ".ogg") return "audio/ogg";
  if (ext === ".wav") return "audio/wav";
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

function serveStatic(response, url) {
  const decoded = decodeURIComponent(url.pathname);
  const relative = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
  if (relative.replace(/\\/g, "/") === "assets/characters/manifest.js") writeCharacterManifest();
  const filePath = path.resolve(rootDir, relative);
  if (!filePath.startsWith(rootDir + path.sep)) {
    sendText(response, 403, "Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    sendText(response, 404, "Not found");
    return;
  }
  response.writeHead(200, {
    "content-type": contentType(filePath),
    "cache-control": "no-store"
  });
  fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, `http://${request.headers.host}`);
  if (await handleDevRequest(request, response, url)) return;
  if (request.method !== "GET" && request.method !== "HEAD") {
    sendText(response, 405, "Method not allowed");
    return;
  }
  serveStatic(response, url);
});

server.listen(port, "127.0.0.1", () => {
  writeCharacterManifest();
  console.log(`SvenAdventure dev server: http://127.0.0.1:${port}/?dev=editor`);
});
