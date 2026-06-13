const path = require("path");
const {
  rootDir,
  resolveProjectPath,
  loadAllLevels,
  readImageDimensions
} = require("./level-utils");

function relative(filePath) {
  return path.relative(rootDir, filePath).replace(/\\/g, "/");
}

function plural(count, label) {
  return `${count} ${label}${count === 1 ? "" : "s"}`;
}

function collectWarnings(level, imageDimensions) {
  const warnings = [];
  if (imageDimensions && (level.world.width !== imageDimensions.width || level.world.height !== imageDimensions.height)) {
    warnings.push(
      `declared world dimensions ${level.world.width}x${level.world.height} do not match image ${imageDimensions.width}x${imageDimensions.height}`
    );
  }
  if (!level.interactiveObjects?.length) warnings.push("no interactive objects");
  if (!level.walkGraph?.nodes?.length) warnings.push("no walk graph nodes");
  if (!level.walkGraph?.edges?.length) warnings.push("no walk graph edges");
  return warnings;
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
  const challengeCount = (level.runes || []).reduce((sum, rune) => sum + (rune.questions?.length || 0), 0);
  const warnings = collectWarnings(level, imageDimensions);

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
  console.log(`* node count: ${level.walkGraph?.nodes?.length || 0}`);
  console.log(`* edge count: ${level.walkGraph?.edges?.length || 0}`);
  console.log("");
  console.log("Challenges:");
  console.log(`* rune count: ${level.runes?.length || 0}`);
  console.log(`* question count: ${challengeCount}`);
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
