const fs = require("fs");
const http = require("http");
const path = require("path");
const { URL } = require("url");

const rootDir = path.resolve(__dirname, "..");
const port = Number(process.env.PORT || 4173);

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

function validateAmbientAnimals(value) {
  if (!Array.isArray(value)) throw new Error("ambientAnimals must be an array.");
  const requiredStrings = ["id", "type", "openFrame", "closedFrame", "sound"];
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
    const next = {
      id: animal.id,
      type: animal.type,
      openFrame: animal.openFrame,
      closedFrame: animal.closedFrame,
      sound: animal.sound,
      x: Math.round(animal.x),
      y: Math.round(animal.y),
      scale: Number(animal.scale),
      blinkMinMs: Math.round(animal.blinkMinMs),
      blinkMaxMs: Math.round(animal.blinkMaxMs),
      blinkDurationMs: Math.round(animal.blinkDurationMs),
      doubleBlinkChance: Number(animal.doubleBlinkChance),
      soundCooldownMs: Math.round(animal.soundCooldownMs)
    };
    if (animal.softness !== undefined) next.softness = Number(animal.softness);
    if (animal.saturation !== undefined) next.saturation = Number(animal.saturation);
    if (animal.soundVolume !== undefined) next.soundVolume = Number(animal.soundVolume);
    return next;
  });
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

function applyLevelDraft(levelId, draft) {
  const filePath = levelPath(levelId);
  let source = fs.readFileSync(filePath, "utf8");
  if (draft.interactiveObjects) {
    const range = findArrayPropertyRange(source, "interactiveObjects");
    source = `${source.slice(0, range.start)}${formatInteractiveObjects(draft.interactiveObjects)}${source.slice(range.end)}`;
  }
  if (draft.ambientAnimals) {
    const range = findArrayPropertyRange(source, "ambientAnimals");
    source = `${source.slice(0, range.start)}${formatAmbientAnimals(draft.ambientAnimals)}${source.slice(range.end)}`;
  }
  if (draft.walkPath) {
    const range = findArrayPropertyRange(source, "walkPath");
    source = `${source.slice(0, range.start)}${formatWalkPath(draft.walkPath)}${source.slice(range.end)}`;
  }
  const updated = source;
  fs.writeFileSync(filePath, updated);
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

  const match = url.pathname.match(/^\/__dev\/levels\/([^/]+)\/(editor-draft|apply-editor)$/);
  if (!match) return false;

  const [, levelId, action] = match;
  const folder = levelDir(levelId);
  if (!folder.startsWith(path.join(rootDir, "Levels") + path.sep) || !fs.existsSync(folder)) {
    sendJson(response, 404, { error: "Level not found." });
    return true;
  }

  try {
    if (request.method === "GET" && action === "editor-draft") {
      const filePath = draftPath(levelId);
      if (!fs.existsSync(filePath)) {
        sendJson(response, 200, { walkPath: null, interactiveObjects: null, ambientAnimals: null, audioConfig: null });
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
        draft.ambientAnimals = validateAmbientAnimals(body.ambientAnimals);
      }
      if (body.audioConfig !== undefined) draft.audioConfig = validateAudioConfig(body.audioConfig);
      if (!draft.walkPath && !draft.interactiveObjects && !draft.ambientAnimals && !draft.audioConfig) {
        throw new Error("Request must include walkPath, interactiveObjects, ambientAnimals or audioConfig.");
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
        if (draft.walkPath || draft.interactiveObjects || draft.ambientAnimals) applyLevelDraft(levelId, draft);
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
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
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
