const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.join(rootDir, "Levels", "manifest.js");

function runScript(filePath, context) {
  const source = fs.readFileSync(filePath, "utf8");
  vm.runInNewContext(source, context, {
    filename: filePath,
    timeout: 1000
  });
}

function resolveProjectPath(relativePath) {
  return path.resolve(rootDir, relativePath);
}

function loadManifest() {
  const context = { window: {} };
  runScript(manifestPath, context);
  if (!context.window.SVEN_LEVEL_MANIFEST?.levels) {
    throw new Error("Levels/manifest.js did not define window.SVEN_LEVEL_MANIFEST.levels.");
  }
  return context.window.SVEN_LEVEL_MANIFEST;
}

function loadLevel(entry) {
  const scriptPath = resolveProjectPath(entry.script);
  const context = {
    window: {
      SVEN_LEVEL_DEFINITIONS: {}
    }
  };
  runScript(scriptPath, context);

  const level = context.window.SVEN_LEVEL_DEFINITIONS[entry.id];
  if (!level) {
    throw new Error(`Level ${entry.id} did not register itself.`);
  }

  return {
    entry,
    level,
    scriptPath,
    levelFolder: path.dirname(scriptPath)
  };
}

function loadAllLevels() {
  const manifest = loadManifest();
  return manifest.levels.map(loadLevel);
}

function readImageDimensions(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20),
      format: "png"
    };
  }

  if (buffer.length >= 4 && buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xc3) {
        return {
          width: buffer.readUInt16BE(offset + 7),
          height: buffer.readUInt16BE(offset + 5),
          format: "jpeg"
        };
      }
      offset += 2 + length;
    }
  }

  throw new Error("Unsupported image format; expected PNG or JPEG.");
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function buildNodeMap(level) {
  return new Map((level.walkGraph?.nodes || []).map((node) => [node.id, node]));
}

function buildObjectMap(level) {
  return new Map((level.interactiveObjects || []).map((object) => [object.id, object]));
}

module.exports = {
  rootDir,
  resolveProjectPath,
  loadAllLevels,
  readImageDimensions,
  distance,
  buildNodeMap,
  buildObjectMap
};
