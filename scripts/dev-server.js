const fs = require("fs");
const http = require("http");
const path = require("path");
const vm = require("vm");
const { URL } = require("url");

const rootDir = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);

function loadSceneEffectsApi() {
  const context = { window: {}, console, performance: { now: () => 0 } };
  vm.runInNewContext(fs.readFileSync(path.join(rootDir, "src", "scene-effects.js"), "utf8"), context, {
    filename: "src/scene-effects.js"
  });
  return context.window.AtlasSceneEffects;
}

const sceneEffectsApi = loadSceneEffectsApi();

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
      if (body.length > 2_000_000) {
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
    if (!ambience[config.ambience]) {
      throw new Error(`audioConfig.levels.${levelId}.ambience references missing track: ${config.ambience}`);
    }
    levels[levelId] = {
      music: String(config.music),
      ambience: String(config.ambience),
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

function writeLevelDefinitionAtomic(levelId, level) {
  const filePath = levelPath(levelId);
  const source = `window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};\n\nwindow.SVEN_LEVEL_DEFINITIONS[${JSON.stringify(levelId)}] = ${JSON.stringify(level, null, 2)};\n`;
  const tempPath = `${filePath}.tmp-${process.pid}-${Date.now()}`;
  fs.writeFileSync(tempPath, source);
  fs.renameSync(tempPath, filePath);
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

function applyLevelDraft(levelId, draft) {
  const level = loadLevelDefinition(levelId);
  const hadSceneEffects = Object.prototype.hasOwnProperty.call(level, "sceneEffects");
  const hadSceneEffectGroups = Object.prototype.hasOwnProperty.call(level, "sceneEffectGroups");

  if (draft.walkPath) level.walkPath = draft.walkPath;
  if (draft.interactiveObjects) level.interactiveObjects = draft.interactiveObjects;
  if (draft.ambientAnimals) level.ambientAnimals = draft.ambientAnimals;
  if (draft.ambientFlybys) level.ambientFlybys = draft.ambientFlybys;
  if (draft.sceneEffects && (draft.sceneEffects.length || hadSceneEffects)) level.sceneEffects = draft.sceneEffects;
  if (draft.sceneEffectGroups && (draft.sceneEffectGroups.length || hadSceneEffectGroups)) level.sceneEffectGroups = draft.sceneEffectGroups;

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
      sendJson(response, 200, {
        images: files.filter((name) => ambientImageExtensions.has(path.extname(name).toLowerCase())).map(relative),
        audio: files.filter((name) => ambientAudioExtensions.has(path.extname(name).toLowerCase())).map(relative)
      });
      return true;
    }
    if (request.method === "GET" && action === "editor-draft") {
      const filePath = draftPath(levelId);
      if (!fs.existsSync(filePath)) {
        sendJson(response, 200, { walkPath: null, interactiveObjects: null, ambientAnimals: null, ambientFlybys: null, sceneEffects: null, sceneEffectGroups: null, audioConfig: null });
        return true;
      }
      sendJson(response, 200, JSON.parse(fs.readFileSync(filePath, "utf8")));
      return true;
    }

    if (request.method === "DELETE" && action === "editor-draft") {
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
      if (!draft.walkPath && !draft.interactiveObjects && !draft.ambientAnimals && !draft.ambientFlybys && !draft.sceneEffects && !draft.sceneEffectGroups && !draft.audioConfig) {
        throw new Error("Request must include level editor data.");
      }

      if (action === "editor-draft") {
        fs.writeFileSync(draftPath(levelId), JSON.stringify({
          levelId,
          updatedAt: new Date().toISOString(),
          ...draft
        }, null, 2));
        sendJson(response, 200, { ok: true, draft: true });
        return true;
      }

      if (action === "apply-editor") {
        if (draft.walkPath || draft.interactiveObjects || draft.ambientAnimals || draft.ambientFlybys || draft.sceneEffects || draft.sceneEffectGroups) applyLevelDraft(levelId, draft);
        if (draft.audioConfig) applyAudioConfigDraft(draft.audioConfig);
        const filePath = draftPath(levelId);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
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
  console.log(`SvenAdventure dev server: http://127.0.0.1:${port}/?dev=editor`);
});
