const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.join(rootDir, "Levels", "manifest.js");
const DERIVED_WALK_SEGMENT_LENGTH = 90;

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

function authoredWalkPathPoints(level) {
  if (Array.isArray(level.walkPath)) return level.walkPath;
  if (Array.isArray(level.walkPath?.main)) return level.walkPath.main;
  return [];
}

function normalizeWalkPathPoint(point, index) {
  if (Array.isArray(point)) {
    return {
      id: `path-${String(index + 1).padStart(2, "0")}`,
      x: point[0],
      y: point[1]
    };
  }

  return {
    ...point,
    id: point.id || `path-${String(index + 1).padStart(2, "0")}`
  };
}

function deriveWalkGraph(level) {
  const pathPoints = authoredWalkPathPoints(level);
  if (!pathPoints.length) return level.walkGraph;

  const nodes = pathPoints.map(normalizeWalkPathPoint);
  return densifyWalkGraph(nodes);
}

function densifyWalkGraph(authoredNodes) {
  const nodes = [];
  const edges = [];

  authoredNodes.forEach((node, index) => {
    if (index === 0) {
      nodes.push(node);
      return;
    }

    const from = authoredNodes[index - 1];
    const segmentLength = distance(from, node);
    const insertedCount = Math.max(0, Math.ceil(segmentLength / DERIVED_WALK_SEGMENT_LENGTH) - 1);
    let previousId = from.id;

    for (let insertIndex = 1; insertIndex <= insertedCount; insertIndex += 1) {
      const t = insertIndex / (insertedCount + 1);
      const derivedNode = {
        id: `${from.id}--${node.id}--${insertIndex}`,
        x: Math.round(from.x + (node.x - from.x) * t),
        y: Math.round(from.y + (node.y - from.y) * t),
        derived: true
      };
      nodes.push(derivedNode);
      edges.push([previousId, derivedNode.id]);
      previousId = derivedNode.id;
    }

    nodes.push(node);
    edges.push([previousId, node.id]);
  });

  return { nodes, edges };
}

function getWalkGraph(level) {
  return deriveWalkGraph(level) || { nodes: [], edges: [] };
}

function buildNodeMap(level) {
  return new Map(getWalkGraph(level).nodes.map((node) => [node.id, node]));
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
  authoredWalkPathPoints,
  deriveWalkGraph,
  getWalkGraph,
  buildNodeMap,
  buildObjectMap
};
