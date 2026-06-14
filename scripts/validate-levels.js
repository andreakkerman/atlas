const fs = require("fs");
const path = require("path");
const vm = require("vm");

const rootDir = path.resolve(__dirname, "..");
const manifestPath = path.join(rootDir, "Levels", "manifest.js");

const errors = [];

function fail(message) {
  errors.push(message);
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function isPositiveNumber(value) {
  return isFiniteNumber(value) && value > 0;
}

function readScript(filePath, label) {
  if (!fs.existsSync(filePath)) {
    fail(`${label} does not exist: ${path.relative(rootDir, filePath)}`);
    return null;
  }

  return fs.readFileSync(filePath, "utf8");
}

function runScript(filePath, context, label) {
  const source = readScript(filePath, label);
  if (!source) return false;

  try {
    vm.runInNewContext(source, context, {
      filename: filePath,
      timeout: 1000
    });
    return true;
  } catch (error) {
    fail(`${label} failed to execute: ${error.message}`);
    return false;
  }
}

function resolveProjectPath(relativePath, ownerLabel) {
  if (!isNonEmptyString(relativePath)) {
    fail(`${ownerLabel} path must be a non-empty string.`);
    return null;
  }

  const resolved = path.resolve(rootDir, relativePath);
  if (!resolved.startsWith(rootDir + path.sep)) {
    fail(`${ownerLabel} path escapes the project root: ${relativePath}`);
    return null;
  }

  return resolved;
}

function assertAssetExists(relativePath, ownerLabel, levelFolder) {
  const resolved = resolveProjectPath(relativePath, ownerLabel);
  if (!resolved) return null;

  if (!fs.existsSync(resolved)) {
    fail(`${ownerLabel} asset does not exist: ${relativePath}`);
    return resolved;
  }

  if (!resolved.startsWith(levelFolder + path.sep)) {
    fail(`${ownerLabel} must be inside its level folder: ${relativePath}`);
  }

  return resolved;
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
      const isStartOfFrame = marker >= 0xc0 && marker <= 0xc3;
      if (isStartOfFrame) {
        return {
          width: buffer.readUInt16BE(offset + 7),
          height: buffer.readUInt16BE(offset + 5),
          format: "jpeg"
        };
      }
      offset += 2 + length;
    }
  }

  throw new Error("unsupported image format; expected PNG or JPEG");
}

function validateRequiredString(value, label) {
  if (!isNonEmptyString(value)) fail(`${label} must be a non-empty string.`);
}

function validatePoint(point, label, world) {
  if (!isObject(point)) {
    fail(`${label} must be an object with x and y.`);
    return;
  }
  if (!isFiniteNumber(point.x)) fail(`${label}.x must be a finite number.`);
  if (!isFiniteNumber(point.y)) fail(`${label}.y must be a finite number.`);
  if (isFiniteNumber(point.x) && (point.x < 0 || point.x > world.width)) {
    fail(`${label}.x is outside world bounds: ${point.x}`);
  }
  if (isFiniteNumber(point.y) && (point.y < 0 || point.y > world.height)) {
    fail(`${label}.y is outside world bounds: ${point.y}`);
  }
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

function getEffectiveWalkGraph(level) {
  const pathPoints = authoredWalkPathPoints(level);
  if (pathPoints.length) {
    const nodes = pathPoints.map(normalizeWalkPathPoint);
    const edges = nodes.slice(1).map((node, index) => [nodes[index].id, node.id]);
    return { nodes, edges };
  }

  return level.walkGraph || { nodes: [], edges: [] };
}

function validateManifest() {
  const context = { window: {} };
  if (!runScript(manifestPath, context, "Level manifest")) return null;

  const manifest = context.window.SVEN_LEVEL_MANIFEST;
  if (!isObject(manifest)) {
    fail("Levels/manifest.js must define window.SVEN_LEVEL_MANIFEST.");
    return null;
  }

  if (!Array.isArray(manifest.levels) || manifest.levels.length === 0) {
    fail("Level manifest must contain a non-empty levels array.");
    return null;
  }

  const ids = new Set();
  manifest.levels.forEach((entry, index) => {
    const label = `manifest.levels[${index}]`;
    if (!isObject(entry)) {
      fail(`${label} must be an object.`);
      return;
    }
    validateRequiredString(entry.id, `${label}.id`);
    validateRequiredString(entry.title, `${label}.title`);
    validateRequiredString(entry.script, `${label}.script`);
    if (ids.has(entry.id)) fail(`${label}.id is duplicated: ${entry.id}`);
    ids.add(entry.id);

    const scriptPath = resolveProjectPath(entry.script, `${label}.script`);
    if (scriptPath && !fs.existsSync(scriptPath)) {
      fail(`${label}.script does not exist: ${entry.script}`);
    }

    validateRequiredString(entry.menu?.illustration, `${label}.menu.illustration`);
  });

  return manifest;
}

function loadLevel(entry) {
  const scriptPath = resolveProjectPath(entry.script, `${entry.id}.script`);
  if (!scriptPath || !fs.existsSync(scriptPath)) return null;

  const context = {
    window: {
      SVEN_LEVEL_DEFINITIONS: {}
    }
  };
  if (!runScript(scriptPath, context, `Level ${entry.id}`)) return null;

  const level = context.window.SVEN_LEVEL_DEFINITIONS[entry.id];
  if (!isObject(level)) {
    fail(`Level ${entry.id} must register window.SVEN_LEVEL_DEFINITIONS["${entry.id}"].`);
    return null;
  }

  return { level, scriptPath, levelFolder: path.dirname(scriptPath) };
}

function validateWorld(level, levelFolder, label) {
  if (!isObject(level.world)) {
    fail(`${label}.world must be an object.`);
    return null;
  }

  if (!isPositiveNumber(level.world.width)) fail(`${label}.world.width must be greater than zero.`);
  if (!isPositiveNumber(level.world.height)) fail(`${label}.world.height must be greater than zero.`);
  validateRequiredString(level.world.background, `${label}.world.background`);

  const backgroundPath = assertAssetExists(level.world.background, `${label}.world.background`, levelFolder);
  if (backgroundPath && fs.existsSync(backgroundPath)) {
    try {
      const dimensions = readImageDimensions(backgroundPath);
      if (level.world.width !== dimensions.width || level.world.height !== dimensions.height) {
        fail(
          `${label}.world dimensions do not match image. Declared ${level.world.width}x${level.world.height}, actual ${dimensions.width}x${dimensions.height}.`
        );
      }
      if (isPositiveNumber(level.world.aspectRatio)) {
        const expectedRatio = dimensions.width / dimensions.height;
        if (Math.abs(level.world.aspectRatio - expectedRatio) > 0.02) {
          fail(`${label}.world.aspectRatio should be close to ${expectedRatio.toFixed(4)}.`);
        }
      }
    } catch (error) {
      fail(`${label}.world.background could not be measured: ${error.message}`);
    }
  }

  return level.world;
}

function validateWalkGraph(level, world, label) {
  const hasWalkPath = authoredWalkPathPoints(level).length > 0;
  const hasWalkGraph = isObject(level.walkGraph);
  const graph = getEffectiveWalkGraph(level);

  if (hasWalkPath && hasWalkGraph) {
    fail(`${label} should use either walkPath or walkGraph, not both.`);
  }

  if (!hasWalkPath && !hasWalkGraph) {
    fail(`${label} must define walkPath or walkGraph.`);
    return { nodeIds: new Set() };
  }

  if (!Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    fail(`${label}.walkGraph.nodes must be a non-empty array after path normalization.`);
  }
  if (!Array.isArray(graph.edges) || graph.edges.length === 0) {
    fail(`${label}.walkGraph.edges must be a non-empty array after path normalization.`);
  }

  const nodeIds = new Set();
  (graph.nodes || []).forEach((node, index) => {
    const nodeLabel = hasWalkPath ? `${label}.walkPath[${index}]` : `${label}.walkGraph.nodes[${index}]`;
    if (!isObject(node)) {
      fail(`${nodeLabel} must be an object.`);
      return;
    }
    validateRequiredString(node.id, `${nodeLabel}.id`);
    if (nodeIds.has(node.id)) fail(`${nodeLabel}.id is duplicated: ${node.id}`);
    nodeIds.add(node.id);
    validatePoint({ x: node.x, y: node.y }, nodeLabel, world);
  });

  (graph.edges || []).forEach((edge, index) => {
    const edgeLabel = `${label}.walkGraph.edges[${index}]`;
    if (!Array.isArray(edge) || edge.length !== 2) {
      fail(`${edgeLabel} must be a [fromId, toId] pair.`);
      return;
    }
    edge.forEach((nodeId) => {
      if (!nodeIds.has(nodeId)) fail(`${edgeLabel} references missing node: ${nodeId}`);
    });
  });

  return { nodeIds };
}

function validateInteractiveObjects(level, world, nodeIds, label) {
  if (!Array.isArray(level.interactiveObjects) || level.interactiveObjects.length === 0) {
    fail(`${label}.interactiveObjects must be a non-empty array.`);
    return new Map();
  }

  const objects = new Map();
  level.interactiveObjects.forEach((object, index) => {
    const objectLabel = `${label}.interactiveObjects[${index}]`;
    if (!isObject(object)) {
      fail(`${objectLabel} must be an object.`);
      return;
    }
    validateRequiredString(object.id, `${objectLabel}.id`);
    validateRequiredString(object.type, `${objectLabel}.type`);
    validateRequiredString(object.label, `${objectLabel}.label`);
    validatePoint(object.center, `${objectLabel}.center`, world);
    if (!isPositiveNumber(object.radius)) fail(`${objectLabel}.radius must be greater than zero.`);
    validateRequiredString(object.approachNode, `${objectLabel}.approachNode`);
    if (isNonEmptyString(object.approachNode) && !nodeIds.has(object.approachNode)) {
      fail(`${objectLabel}.approachNode references missing node: ${object.approachNode}`);
    }
    if (objects.has(object.id)) fail(`${objectLabel}.id is duplicated: ${object.id}`);
    objects.set(object.id, object);
  });

  return objects;
}

function validateAssets(level, entry, levelFolder, label) {
  assertAssetExists(entry.menu?.illustration, `${label}.manifest.menu.illustration`, levelFolder);
  assertAssetExists(level.menu?.illustration, `${label}.menu.illustration`, levelFolder);
  assertAssetExists(level.challengeArt, `${label}.challengeArt`, levelFolder);
  assertAssetExists(level.companion?.portrait, `${label}.companion.portrait`, levelFolder);
  if (level.challengeCharacter?.portrait) {
    assertAssetExists(level.challengeCharacter.portrait, `${label}.challengeCharacter.portrait`, levelFolder);
  }
  assertAssetExists(level.reward?.art, `${label}.reward.art`, levelFolder);
}

function validateReferences(level, objects, nodeIds, label) {
  if (!Array.isArray(level.hotspots)) fail(`${label}.hotspots must be an array.`);
  if (!Array.isArray(level.runes) || level.runes.length === 0) fail(`${label}.runes must be a non-empty array.`);

  (level.hotspots || []).forEach((hotspot, index) => {
    const hotspotLabel = `${label}.hotspots[${index}]`;
    validateRequiredString(hotspot.id, `${hotspotLabel}.id`);
    validateRequiredString(hotspot.objectId, `${hotspotLabel}.objectId`);
    validateRequiredString(hotspot.type, `${hotspotLabel}.type`);
    validateRequiredString(hotspot.name, `${hotspotLabel}.name`);
    validateRequiredString(hotspot.defaultAction, `${hotspotLabel}.defaultAction`);
    if (isNonEmptyString(hotspot.objectId) && !objects.has(hotspot.objectId)) {
      fail(`${hotspotLabel}.objectId references missing interactive object: ${hotspot.objectId}`);
    }
  });

  (level.runes || []).forEach((rune, index) => {
    const runeLabel = `${label}.runes[${index}]`;
    validateRequiredString(rune.id, `${runeLabel}.id`);
    validateRequiredString(rune.objectId, `${runeLabel}.objectId`);
    validateRequiredString(rune.name, `${runeLabel}.name`);
    validateRequiredString(rune.defaultAction, `${runeLabel}.defaultAction`);
    validateRequiredString(rune.intro, `${runeLabel}.intro`);
    validateRequiredString(rune.solved, `${runeLabel}.solved`);

    const object = objects.get(rune.objectId);
    if (!object) {
      fail(`${runeLabel}.objectId references missing interactive object: ${rune.objectId}`);
    } else if (object.type !== "rune") {
      fail(`${runeLabel}.objectId should reference an interactive object with type "rune".`);
    }

    if (!Array.isArray(rune.questions) || rune.questions.length === 0) {
      fail(`${runeLabel}.questions must be a non-empty array.`);
    }
    (rune.questions || []).forEach((question, questionIndex) => {
      const questionLabel = `${runeLabel}.questions[${questionIndex}]`;
      if (!isObject(question)) {
        fail(`${questionLabel} must be an object.`);
        return;
      }
      if (!isPositiveNumber(question.a)) fail(`${questionLabel}.a must be greater than zero.`);
      if (!isPositiveNumber(question.b)) fail(`${questionLabel}.b must be greater than zero.`);
    });
  });

  [...objects.values()].forEach((object) => {
    if (object.approachNode && !nodeIds.has(object.approachNode)) {
      fail(`${label}.interactiveObjects.${object.id}.approachNode references missing node: ${object.approachNode}`);
    }
  });
}

function validateTopLevel(level, entry, label) {
  if (level.id !== entry.id) fail(`${label}.id must match manifest id ${entry.id}.`);
  validateRequiredString(level.id, `${label}.id`);
  validateRequiredString(level.title, `${label}.title`);
  validateRequiredString(level.description, `${label}.description`);
  validateRequiredString(level.storageKey, `${label}.storageKey`);
  validateRequiredString(level.progressKey, `${label}.progressKey`);
  validateRequiredString(level.challengeArt, `${label}.challengeArt`);
  validateRequiredString(level.spiritName, `${label}.spiritName`);
  if (!Array.isArray(level.intro) || level.intro.length === 0) fail(`${label}.intro must be a non-empty array.`);
  if (!Array.isArray(level.areas) || level.areas.length === 0) fail(`${label}.areas must be a non-empty array.`);
  if (!isObject(level.companion)) fail(`${label}.companion must be an object.`);
  if (!isObject(level.reward)) fail(`${label}.reward must be an object.`);
  validateRequiredString(level.reward?.title, `${label}.reward.title`);
  validateRequiredString(level.reward?.line, `${label}.reward.line`);
  validateRequiredString(level.reward?.art, `${label}.reward.art`);
  validateRequiredString(level.spiritLines?.welcome, `${label}.spiritLines.welcome`);
  validateRequiredString(level.spiritLines?.moving, `${label}.spiritLines.moving`);
  validateRequiredString(level.spiritLines?.allRunes, `${label}.spiritLines.allRunes`);
  validateRequiredString(level.spiritLines?.reward, `${label}.spiritLines.reward`);
}

function validatePlayer(level, world, label) {
  if (!isObject(level.player)) {
    fail(`${label}.player must be an object.`);
    return;
  }
  validatePoint(level.player.start, `${label}.player.start`, world);
}

function validateLevel(entry) {
  const loaded = loadLevel(entry);
  if (!loaded) return;

  const { level, levelFolder } = loaded;
  const label = `Level ${entry.id}`;

  validateTopLevel(level, entry, label);
  const world = validateWorld(level, levelFolder, label) || { width: 0, height: 0 };
  const { nodeIds } = validateWalkGraph(level, world, label);
  const objects = validateInteractiveObjects(level, world, nodeIds, label);
  validatePlayer(level, world, label);
  validateReferences(level, objects, nodeIds, label);
  validateAssets(level, entry, levelFolder, label);
}

function main() {
  const manifest = validateManifest();
  if (manifest) {
    manifest.levels.forEach(validateLevel);
  }

  if (errors.length) {
    console.error(`Level validation failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }

  console.log(`Level validation passed for ${manifest.levels.length} level(s).`);
}

main();
