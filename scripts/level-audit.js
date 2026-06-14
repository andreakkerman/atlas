const {
  loadAllLevels,
  distance,
  getWalkGraph,
  buildNodeMap,
  buildObjectMap
} = require("./level-utils");

const MIN_OBJECT_DISTANCE = 56;
const SMALL_RADIUS = 24;
const LARGE_RADIUS = 120;
const APPROACH_DISTANCE_WARN = 430;
const LONG_EDGE_WARN = 185;
const STEEP_EDGE_WARN = 70;
const LOCAL_Y_SPIKE_WARN = 70;
const ANSWER_REPEAT_WARN = 3;
const COMMUTATIVE_PAIR_WARN = 2;

function addWarning(warnings, levelId, message) {
  warnings.push(`[${levelId}] ${message}`);
}

function connectedNodeIds(level) {
  const graph = getWalkGraph(level);
  const nodes = new Set(graph.nodes.map((node) => node.id));
  const adjacency = new Map([...nodes].map((id) => [id, []]));
  graph.edges.forEach(([from, to]) => {
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
  const graph = getWalkGraph(level);
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
      const overlapAllowed =
        left.allowOverlapWith?.includes(right.id) ||
        right.allowOverlapWith?.includes(left.id);
      if (!overlapAllowed && centerDistance < MIN_OBJECT_DISTANCE) {
        addWarning(
          warnings,
          level.id,
          `objects "${left.id}" and "${right.id}" are extremely close (${Math.round(centerDistance)}px apart).`
        );
      }
    }
  }

  const referencedNodes = new Set();
  graph.edges.forEach(([from, to]) => {
    referencedNodes.add(from);
    referencedNodes.add(to);

    const fromNode = nodeMap.get(from);
    const toNode = nodeMap.get(to);
    if (!fromNode || !toNode) return;

    const edgeLength = distance(fromNode, toNode);
    const yDelta = Math.abs(fromNode.y - toNode.y);
    if (edgeLength > LONG_EDGE_WARN) {
      addWarning(warnings, level.id, `walk edge "${from}" -> "${to}" is long (${Math.round(edgeLength)}px).`);
    }
    if (yDelta > STEEP_EDGE_WARN) {
      addWarning(warnings, level.id, `walk edge "${from}" -> "${to}" has a steep y jump (${Math.round(yDelta)}px).`);
    }
  });
  graph.nodes.forEach((node, index) => {
    if (!referencedNodes.has(node.id)) {
      addWarning(warnings, level.id, `walk node "${node.id}" is isolated.`);
    }
    if (!reachableNodes.has(node.id)) {
      addWarning(warnings, level.id, `walk node "${node.id}" is disconnected from the main graph.`);
    }
    const previous = graph.nodes[index - 1];
    const next = graph.nodes[index + 1];
    if (previous && next) {
      const neighborAverageY = (previous.y + next.y) / 2;
      if (Math.abs(node.y - neighborAverageY) > LOCAL_Y_SPIKE_WARN) {
        addWarning(warnings, level.id, `walk node "${node.id}" y=${node.y} is far from neighboring path y-values.`);
      }
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

  const exactQuestions = new Set();
  const answerCounts = new Map();
  const commutativeCounts = new Map();
  (level.runes || []).forEach((rune) => {
    (rune.questions || []).forEach((question) => {
      if (!Number.isInteger(question.a) || !Number.isInteger(question.b)) return;

      const exactKey = `${question.a}x${question.b}`;
      const commutativeKey = `${Math.min(question.a, question.b)}x${Math.max(question.a, question.b)}`;
      const answer = question.a * question.b;
      if (exactQuestions.has(exactKey)) {
        addWarning(warnings, level.id, `duplicate exact multiplication question "${exactKey}".`);
      }
      exactQuestions.add(exactKey);
      answerCounts.set(answer, (answerCounts.get(answer) || 0) + 1);
      commutativeCounts.set(commutativeKey, (commutativeCounts.get(commutativeKey) || 0) + 1);
    });
  });

  answerCounts.forEach((count, answer) => {
    if (count > ANSWER_REPEAT_WARN) {
      addWarning(warnings, level.id, `answer "${answer}" appears ${count} times across challenges.`);
    }
  });
  commutativeCounts.forEach((count, pair) => {
    if (count > COMMUTATIVE_PAIR_WARN) {
      addWarning(warnings, level.id, `commutative pair "${pair}" appears ${count} times across challenges.`);
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
