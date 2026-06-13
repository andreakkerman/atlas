const {
  loadAllLevels,
  distance,
  buildNodeMap,
  buildObjectMap
} = require("./level-utils");

const MIN_OBJECT_DISTANCE = 56;
const SMALL_RADIUS = 24;
const LARGE_RADIUS = 120;
const APPROACH_DISTANCE_WARN = 420;

function addWarning(warnings, levelId, message) {
  warnings.push(`[${levelId}] ${message}`);
}

function connectedNodeIds(level) {
  const nodes = new Set((level.walkGraph?.nodes || []).map((node) => node.id));
  const adjacency = new Map([...nodes].map((id) => [id, []]));
  (level.walkGraph?.edges || []).forEach(([from, to]) => {
    if (!adjacency.has(from) || !adjacency.has(to)) return;
    adjacency.get(from).push(to);
    adjacency.get(to).push(from);
  });

  const start = nodes.values().next().value;
  if (!start) return new Set();

  const seen = new Set([start]);
  const stack = [start];
  while (stack.length) {
    const current = stack.pop();
    adjacency.get(current).forEach((next) => {
      if (!seen.has(next)) {
        seen.add(next);
        stack.push(next);
      }
    });
  }
  return seen;
}

function auditLevel({ level }) {
  const warnings = [];
  const objects = level.interactiveObjects || [];
  const nodeMap = buildNodeMap(level);
  const objectMap = buildObjectMap(level);
  const reachableNodes = connectedNodeIds(level);

  objects.forEach((object) => {
    if (object.radius < SMALL_RADIUS) {
      addWarning(warnings, level.id, `object "${object.id}" radius ${object.radius} may be too small for touch.`);
    }
    if (object.radius > LARGE_RADIUS) {
      addWarning(warnings, level.id, `object "${object.id}" radius ${object.radius} may be too large.`);
    }
    if (!object.approachNode) {
      addWarning(warnings, level.id, `object "${object.id}" has no approachNode.`);
      return;
    }
    const approach = nodeMap.get(object.approachNode);
    if (!approach) {
      addWarning(warnings, level.id, `object "${object.id}" approachNode "${object.approachNode}" does not exist.`);
      return;
    }
    if (!reachableNodes.has(object.approachNode)) {
      addWarning(warnings, level.id, `object "${object.id}" approachNode "${object.approachNode}" is not reachable from the main graph.`);
    }
    const approachDistance = distance(object.center, approach);
    if (approachDistance > APPROACH_DISTANCE_WARN) {
      addWarning(
        warnings,
        level.id,
        `object "${object.id}" approachNode "${object.approachNode}" is ${Math.round(approachDistance)}px from the object center.`
      );
    }
  });

  for (let leftIndex = 0; leftIndex < objects.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < objects.length; rightIndex += 1) {
      const left = objects[leftIndex];
      const right = objects[rightIndex];
      const centerDistance = distance(left.center, right.center);
      if (centerDistance < MIN_OBJECT_DISTANCE) {
        addWarning(
          warnings,
          level.id,
          `objects "${left.id}" and "${right.id}" are extremely close (${Math.round(centerDistance)}px apart).`
        );
      }
    }
  }

  const referencedNodes = new Set();
  (level.walkGraph?.edges || []).forEach(([from, to]) => {
    referencedNodes.add(from);
    referencedNodes.add(to);
  });
  (level.walkGraph?.nodes || []).forEach((node) => {
    if (!referencedNodes.has(node.id)) {
      addWarning(warnings, level.id, `walk node "${node.id}" is isolated.`);
    }
    if (!reachableNodes.has(node.id)) {
      addWarning(warnings, level.id, `walk node "${node.id}" is disconnected from the main graph.`);
    }
  });

  (level.runes || []).forEach((rune) => {
    const object = objectMap.get(rune.objectId);
    if (!object) {
      addWarning(warnings, level.id, `rune "${rune.id}" references missing object "${rune.objectId}".`);
      return;
    }
    if (!object.approachNode) {
      addWarning(warnings, level.id, `challenge object "${object.id}" has no approachNode.`);
    }
  });

  return warnings;
}

function main() {
  const warnings = loadAllLevels().flatMap(auditLevel);

  console.log("Level Audit");
  console.log("");
  if (warnings.length) {
    console.log(`Warnings: ${warnings.length}`);
    warnings.forEach((warning) => console.log(`* ${warning}`));
  } else {
    console.log("Warnings: none");
  }
}

main();
