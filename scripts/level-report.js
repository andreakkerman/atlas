const path = require("path");
const {
  rootDir,
  resolveProjectPath,
  loadAllLevels,
  readImageDimensions,
  distance,
  getWalkGraph,
  loadSceneEffectsApi
} = require("./level-utils");

function relative(filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, "/");
}

function plural(count, label) {
  return `${count} ${label}${count === 1 ? "" : "s"}`;
}

function collectWarnings(level, imageDimensions) {
  const warnings = [];
  const graph = getWalkGraph(level);
  if (imageDimensions && (level.world.width !== imageDimensions.width || level.world.height !== imageDimensions.height)) {
    warnings.push(
      `declared world dimensions ${level.world.width}x${level.world.height} do not match image ${imageDimensions.width}x${imageDimensions.height}`
    );
  }
  if (!level.interactiveObjects?.length) warnings.push("no interactive objects");
  if (!graph.nodes.length) warnings.push("no walk graph nodes");
  if (!graph.edges.length) warnings.push("no walk graph edges");
  return warnings;
}

function summarizeWalkGraph(level) {
  const graph = getWalkGraph(level);
  const nodeMap = new Map(graph.nodes.map((node) => [node.id, node]));
  const lengths = graph.edges.map(([from, to]) => {
    const fromNode = nodeMap.get(from);
    const toNode = nodeMap.get(to);
    return fromNode && toNode ? distance(fromNode, toNode) : 0;
  });
  const yValues = graph.nodes.map((node) => node.y);
  const approachNodes = new Set(
    (level.interactiveObjects || [])
      .map((object) => object.approachNode)
      .filter(Boolean)
  );

  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    longestEdge: lengths.length ? Math.max(...lengths) : 0,
    yMin: yValues.length ? Math.min(...yValues) : 0,
    yMax: yValues.length ? Math.max(...yValues) : 0,
    approachNodes: [...approachNodes]
  };
}

function reportLevel(loaded) {
  const { entry, level } = loaded;
  const backgroundPath = resolveProjectPath(level.world.background);
  let imageDimensions = null;
  try {
    imageDimensions = readImageDimensions(backgroundPath);
  } catch (error) {
    imageDimensions = null;
  }

  const objects = level.interactiveObjects || [];
  const typeCounts = objects.reduce((counts, object) => {
    counts[object.type] = (counts[object.type] || 0) + 1;
    return counts;
  }, {});
  const authoredById = new Map((level.learningChallenges || []).map((challenge) => [challenge.id, challenge]));
  const challengeCount = (level.runes || []).reduce((sum, rune) => {
    if (rune.challengeId) return sum + (authoredById.get(rune.challengeId)?.questions?.length || 0);
    return sum + (rune.challengeIds?.length || rune.questions?.length || 0);
  }, 0);
  const variantCount = (level.learningChallenges || []).reduce(
    (sum, challenge) => sum + (challenge.questions || []).reduce(
      (slotSum, slot) => slotSum + (slot.variants?.length || 0),
      0
    ),
    0
  );
  const warnings = collectWarnings(level, imageDimensions);
  const walkSummary = summarizeWalkGraph(level);

  console.log(`Level: ${level.id}`);
  console.log(`Title: ${level.title}`);
  console.log("");
  console.log("World:");
  console.log(`* image: ${relative(backgroundPath)}`);
  console.log(`* declared dimensions: ${level.world.width}x${level.world.height}`);
  console.log(`* actual dimensions: ${imageDimensions ? `${imageDimensions.width}x${imageDimensions.height} (${imageDimensions.format})` : "unknown"}`);
  console.log("");
  console.log("Interactive Objects:");
  console.log(`* count: ${objects.length}`);
  console.log(`* ids: ${objects.map((object) => object.id).join(", ") || "none"}`);
  console.log(`* types: ${
    Object.keys(typeCounts).length
      ? Object.entries(typeCounts).map(([type, count]) => `${type}=${count}`).join(", ")
      : "none"
  }`);
  console.log("");
  console.log("Walk Graph:");
  console.log(`* node count: ${walkSummary.nodeCount}`);
  console.log(`* edge count: ${walkSummary.edgeCount}`);
  console.log(`* longest edge: ${Math.round(walkSummary.longestEdge)}px`);
  console.log(`* y-range: ${walkSummary.yMin}-${walkSummary.yMax}`);
  console.log(`* approach nodes: ${walkSummary.approachNodes.join(", ") || "none"}`);
  console.log("");
  console.log("Challenges:");
  console.log(`* rune count: ${level.runes?.length || 0}`);
  console.log(`* question count: ${challengeCount}`);
  if (variantCount) console.log(`* authored variant count: ${variantCount}`);
  console.log("");
  console.log("Scene Effects:");
  console.log(`* effect count: ${level.sceneEffects?.length || 0}`);
  console.log(`* group count: ${level.sceneEffectGroups?.length || 0}`);
  console.log(`* presets: ${[...new Set((level.sceneEffects || []).map((effect) => effect.presetId))].join(", ") || "none"}`);
  if (level.sceneEffects?.length) {
    const api = loadSceneEffectsApi();
    const estimatedParticles = level.sceneEffects.reduce((sum, effect) => {
      const resolved = api.resolve(effect, level, { quality: "balanced", reducedMotion: false });
      return sum + Number(resolved?.particleCap || 0) * Number(resolved?.amount || 0) * api.QUALITY.balanced.particles;
    }, 0);
    console.log(`* balanced estimated particles: ${Math.round(estimatedParticles)}`);
  }
  console.log("");
  console.log("Warnings:");
  if (warnings.length) {
    warnings.forEach((warning) => console.log(`* ${warning}`));
  } else {
    console.log("* none");
  }
  console.log("");

  if (entry.id !== level.id) {
    console.log(`Manifest warning: entry id ${entry.id} differs from level id ${level.id}`);
    console.log("");
  }
}

function main() {
  const levels = loadAllLevels();
  levels.forEach(reportLevel);
  console.log(`Reported ${plural(levels.length, "level")}.`);
}

main();
