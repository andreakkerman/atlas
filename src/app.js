const app = document.querySelector("#app");
const levelCatalog = window.SVEN_LEVEL_MANIFEST?.levels || [];
window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};
let level = null;
let walkNodesById = new Map();
let debugOverlayEnabled = false;

const ACTOR_FALLBACK_SRC = "assets/sven-stage.png";
const DERIVED_WALK_SEGMENT_LENGTH = 90;
const WALKPATH_DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "walkpath";
const ACTOR_ANIMATIONS = {
  idle: {
    folder: "assets/characters/sven/idle-right",
    frames: 1,
    fps: 1,
    loop: true
  },
  walk: {
    folder: "assets/characters/sven/walk-right",
    frames: 24,
    fps: 15,
    loop: true
  },
  interact: {
    folder: "assets/characters/sven/interact-right",
    frames: 12,
    fps: 12,
    loop: false,
    transitionTo: "idle"
  }
};

const actorPlayback = {
  requestedState: "idle",
  visualState: "idle",
  frameIndex: 0,
  lastFrameAt: 0,
  rafId: null,
  failedSources: new Set()
};

let state = {
  screen: "menu"
};

let walkPathEditor = {
  enabled: WALKPATH_DEV_MODE,
  apiAvailable: false,
  originalWalkPath: null,
  draggingIndex: null,
  currentPoint: null,
  status: "Clean",
  modified: false,
  message: "",
  busy: false
};

function createLevelState(selectedLevel) {
  const initialGuideMessage = guideLineForLevel(
    selectedLevel,
    "welcome",
    selectedLevel.spiritLines?.welcome || "Welkom, Sven.",
    "minnie"
  );

  return {
    screen: "intro",
    introIndex: 0,
    worldX: selectedLevel.player.start.x,
    worldY: selectedLevel.player.start.y,
    viewportWorldWidth: selectedLevel.world.viewportWidth,
    worldScale: selectedLevel.world.width / selectedLevel.world.viewportWidth,
    cameraX: 0,
    svenMood: "idle",
    svenFacing: "right",
    moving: false,
    movement: null,
    activeRuneId: null,
    questionIndex: 0,
    selectedWrong: false,
    questionTracked: false,
    completedRunes: new Set(),
    justCompletedRuneId: null,
    totalQuestions: selectedLevel.runes.reduce((sum, rune) => sum + rune.questions.length, 0),
    answered: 0,
    firstTryCorrect: 0,
    attempts: 0,
    guideMessage: initialGuideMessage,
    message: initialGuideMessage.text,
    feedback: ""
  };
}

function guideLineForLevel(selectedLevel, key, fallbackText, fallbackSpeaker = "minnie") {
  return normalizeGuideMessage(
    selectedLevel.guideLines?.[key] || fallbackText,
    fallbackSpeaker
  );
}

function normalizeGuideMessage(message, fallbackSpeaker = "minnie") {
  if (message && typeof message === "object") {
    return {
      speaker: ["minnie", "moose"].includes(message.speaker) ? message.speaker : fallbackSpeaker,
      text: message.text || ""
    };
  }

  return {
    speaker: fallbackSpeaker,
    text: String(message || "")
  };
}

function setGuideMessage(message, fallbackSpeaker = "minnie") {
  const guideMessage = normalizeGuideMessage(message, fallbackSpeaker);
  state.guideMessage = guideMessage;
  state.message = guideMessage.text;
}

function setGuideLine(key, fallbackText, fallbackSpeaker = "minnie") {
  setGuideMessage(guideLineForLevel(level, key, fallbackText, fallbackSpeaker), fallbackSpeaker);
}

function authoredWalkPathPoints(selectedLevel) {
  if (Array.isArray(selectedLevel.walkPath)) return selectedLevel.walkPath;
  if (Array.isArray(selectedLevel.walkPath?.main)) return selectedLevel.walkPath.main;
  return [];
}

function normalizeWalkPoint(point, index) {
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

function cloneWalkPath(walkPath) {
  return walkPath.map((point) => ({ ...point }));
}

function setLevelWalkPath(walkPath) {
  level.walkPath = cloneWalkPath(walkPath);
  level.walkGraph = deriveWalkGraph(level);
  walkNodesById = new Map(level.walkGraph.nodes.map((node) => [node.id, node]));
}

function walkPathApiUrl(action = "walkpath-draft") {
  return `/__dev/levels/${encodeURIComponent(level.id)}/${action}`;
}

async function requestWalkPathApi(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "content-type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || `Dev endpoint failed: ${response.status}`);
  }
  return payload;
}

async function prepareWalkPathEditorForLevel(selectedLevel) {
  walkPathEditor = {
    enabled: WALKPATH_DEV_MODE,
    apiAvailable: false,
    originalWalkPath: cloneWalkPath(authoredWalkPathPoints(selectedLevel)),
    draggingIndex: null,
    currentPoint: null,
    status: "Clean",
    modified: false,
    message: WALKPATH_DEV_MODE ? "Gebruik Ctrl + Shift + D om punten te slepen." : "",
    busy: false
  };

  if (!WALKPATH_DEV_MODE || !window.location.protocol.startsWith("http")) return;

  try {
    await requestWalkPathApi("/__dev/status");
    walkPathEditor.apiAvailable = true;
    walkPathEditor.message = "Dev server actief.";
    const draft = await requestWalkPathApi(`/__dev/levels/${encodeURIComponent(selectedLevel.id)}/walkpath-draft`);
    if (Array.isArray(draft.walkPath)) {
      selectedLevel.walkPath = cloneWalkPath(draft.walkPath);
      walkPathEditor.status = "Modified";
      walkPathEditor.modified = true;
      walkPathEditor.message = "Draft geladen. Test veilig verder.";
    }
  } catch (error) {
    walkPathEditor.apiAvailable = false;
    walkPathEditor.message = "Geen dev server. Start npm run dev:walkpath.";
  }
}

function deriveWalkGraph(selectedLevel) {
  const pathPoints = authoredWalkPathPoints(selectedLevel);
  if (!pathPoints.length) return selectedLevel.walkGraph;

  const nodes = pathPoints.map(normalizeWalkPoint);
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
    const segmentLength = distanceBetween(from, node);
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

function normalizeLevel(selectedLevel) {
  selectedLevel.walkGraph = deriveWalkGraph(selectedLevel);
  return selectedLevel;
}

function frameSrc(animationName, frameIndex) {
  const animation = ACTOR_ANIMATIONS[animationName] || ACTOR_ANIMATIONS.idle;
  const number = String(frameIndex + 1).padStart(2, "0");
  return `${animation.folder}/frame-${number}.png`;
}

function actorStateForMood() {
  if (state.svenMood === "walking") return "walk";
  if (["arrived", "activating", "looking", "talking"].includes(state.svenMood)) return "interact";
  return "idle";
}

function preloadActorAnimations() {
  Object.values(ACTOR_ANIMATIONS).forEach((animation) => {
    for (let index = 0; index < animation.frames; index += 1) {
      const image = new Image();
      image.src = frameSrc(Object.keys(ACTOR_ANIMATIONS).find((key) => ACTOR_ANIMATIONS[key] === animation), index);
    }
  });
}

function preloadMenuAssets() {
  levelCatalog
    .map((item) => item.menu?.illustration)
    .filter(Boolean)
    .forEach((src) => {
      const image = new Image();
      image.src = src;
    });
}

function preloadLevelAssets(selectedLevel) {
  [
    selectedLevel.world.background,
    selectedLevel.menu?.illustration,
    selectedLevel.companion?.portrait,
    ...Object.values(selectedLevel.guides || {}).map((guide) => guide.portrait),
    selectedLevel.challengeArt,
    selectedLevel.reward?.art
  ]
    .filter(Boolean)
    .forEach((src) => {
      const image = new Image();
      image.src = src;
    });
}

function loadLevelDefinition(entry) {
  if (window.SVEN_LEVEL_DEFINITIONS[entry.id]) {
    return Promise.resolve(window.SVEN_LEVEL_DEFINITIONS[entry.id]);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = entry.script;
    script.onload = () => {
      const loadedLevel = window.SVEN_LEVEL_DEFINITIONS[entry.id];
      if (loadedLevel) {
        resolve(loadedLevel);
      } else {
        reject(new Error(`Level ${entry.id} is niet goed geladen.`));
      }
    };
    script.onerror = () => reject(new Error(`Level ${entry.id} kon niet worden geladen.`));
    document.head.append(script);
  });
}

async function selectLevel(id) {
  const entry = levelCatalog.find((item) => item.id === id) || levelCatalog[0];
  if (!entry) return;

  state = { screen: "loading", message: "Avontuur laden..." };
  render();

  let selectedLevel;
  try {
    selectedLevel = await loadLevelDefinition(entry);
  } catch (error) {
    state = { screen: "menu", error: error.message };
    render();
    return;
  }

  stopMovement();
  await prepareWalkPathEditorForLevel(selectedLevel);
  level = normalizeLevel(selectedLevel);
  walkNodesById = new Map(level.walkGraph.nodes.map((node) => [node.id, node]));
  state = createLevelState(level);
  document.title = level.title;
  preloadLevelAssets(level);
  render();
}

function returnToMenu() {
  stopMovement();
  level = null;
  walkNodesById = new Map();
  state = { screen: "menu" };
  document.title = "SvenAdventure";
  render();
}

function requestActorAnimation(animationName) {
  const next = ACTOR_ANIMATIONS[animationName] ? animationName : "idle";
  actorPlayback.requestedState = next;
  if (actorPlayback.visualState !== next) {
    actorPlayback.visualState = next;
    actorPlayback.frameIndex = 0;
    actorPlayback.lastFrameAt = 0;
  }
  if (!actorPlayback.rafId) {
    actorPlayback.rafId = window.requestAnimationFrame(updateActorAnimation);
  }
}

function setActorFrame() {
  const actor = document.querySelector("[data-actor='sven']");
  if (!actor) return;

  const src = frameSrc(actorPlayback.visualState, actorPlayback.frameIndex);
  actor.dataset.animation = actorPlayback.visualState;
  actor.dataset.frame = String(actorPlayback.frameIndex + 1);
  actor.src = actorPlayback.failedSources.has(src) ? ACTOR_FALLBACK_SRC : src;
}

function updateActorAnimation(timestamp) {
  actorPlayback.rafId = null;
  if (!document.querySelector("[data-actor='sven']")) return;

  const animation = ACTOR_ANIMATIONS[actorPlayback.visualState] || ACTOR_ANIMATIONS.idle;
  const frameDuration = 1000 / animation.fps;

  if (!actorPlayback.lastFrameAt) {
    actorPlayback.lastFrameAt = timestamp;
    setActorFrame();
  } else if (timestamp - actorPlayback.lastFrameAt >= frameDuration) {
    actorPlayback.lastFrameAt = timestamp;
    if (actorPlayback.frameIndex < animation.frames - 1) {
      actorPlayback.frameIndex += 1;
    } else if (animation.loop) {
      actorPlayback.frameIndex = 0;
    } else {
      requestActorAnimation(animation.transitionTo || "idle");
      return;
    }
    setActorFrame();
  }

  actorPlayback.rafId = window.requestAnimationFrame(updateActorAnimation);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function getCameraX() {
  if (typeof state.cameraX !== "number") {
    state.cameraX = getDesiredCameraX();
  }
  return state.cameraX;
}

function getDesiredCameraX() {
  return clamp(state.worldX - state.viewportWorldWidth * 0.48, 0, level.world.width - state.viewportWorldWidth);
}

function getCameraPercent() {
  return (getCameraX() / level.world.width) * 100;
}

function worldToScreen(point, space = "viewport") {
  if (space === "track") {
    return {
      x: (point.x / level.world.width) * 100,
      y: (point.y / level.world.height) * 100
    };
  }

  return {
    x: ((point.x - getCameraX()) / state.viewportWorldWidth) * 100,
    y: (point.y / level.world.height) * 100
  };
}

function worldDiameterToTrackSize(diameter) {
  return {
    width: (diameter / level.world.width) * 100,
    height: (diameter / level.world.height) * 100
  };
}

function getAreaName() {
  const area = level.areas.find((item) => state.worldX >= item.start && state.worldX <= item.end);
  return area?.name || "Avontuur";
}

function isInArea(id) {
  const area = level.areas.find((item) => item.id === id);
  return Boolean(area && state.worldX >= area.start && state.worldX <= area.end);
}

function refreshViewportMetrics() {
  const viewport = document.querySelector(".stageViewport");
  if (!viewport) return;

  const rect = viewport.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const trackWidth = rect.height * level.world.aspectRatio;
  state.viewportWorldWidth = clamp(
    (rect.width / trackWidth) * level.world.width,
    1,
    level.world.width
  );
  state.worldScale = level.world.width / state.viewportWorldWidth;
}

function syncCamera() {
  state.cameraX = getDesiredCameraX();
}

function setSvenWorldPosition(point) {
  if (Math.abs(point.x - state.worldX) > 0.5) {
    state.svenFacing = point.x < state.worldX ? "left" : "right";
  }
  state.worldX = point.x;
  state.worldY = point.y;
}

function updateWorldDom() {
  const track = document.querySelector(".worldTrack");
  const actor = document.querySelector("[data-actor='sven']");
  const actorShell = document.querySelector("[data-actor-shell='sven']");
  const areaName = document.querySelector("[data-area-name]");

  if (!level) return;

  refreshViewportMetrics();
  syncCamera();

  if (track) {
    track.style.setProperty("--camera-percent", String(getCameraPercent()));
    track.style.setProperty("--camera-x", state.cameraX.toFixed(2));
    track.style.setProperty("--world-scale", String(state.worldScale));
  }

  if (actorShell) {
    const actorPosition = worldToScreen({ x: state.worldX, y: state.worldY }, "track");
    actorShell.style.left = `${actorPosition.x}%`;
    actorShell.style.top = `${actorPosition.y}%`;
    actorShell.classList.toggle("sven-facing-left", state.svenFacing === "left");
    actorShell.classList.toggle("sven-facing-right", state.svenFacing === "right");
  }

  if (actor) {
    actor.dataset.worldX = String(Math.round(state.worldX));
    actor.dataset.worldY = String(Math.round(state.worldY));
  }

  if (areaName) {
    areaName.textContent = getAreaName();
  }
}

function routeTo(target) {
  return routeToPoint(getApproachPoint(target));
}

function getApproachPoint(target) {
  const object = interactiveObjectForTarget(target);
  const approachNode = object?.approachNode || target.approachNode;
  if (approachNode && walkNodesById.has(approachNode)) {
    return walkNodesById.get(approachNode);
  }
  if (target.approach) return target.approach;
  return { x: object?.center.x || state.worldX, y: state.worldY };
}

function interactiveObjectById(id) {
  return level.interactiveObjects.find((object) => object.id === id);
}

function interactiveObjectForTarget(target) {
  return interactiveObjectById(target.objectId || target.id);
}

function centerForTarget(target) {
  return interactiveObjectForTarget(target)?.center || { x: state.worldX, y: state.worldY };
}

function objectTrackStyle(object) {
  const center = worldToScreen(object.center, "track");
  const size = worldDiameterToTrackSize(object.radius * 2);
  return `left:${center.x}%; top:${center.y}%; width:${size.width}%; height:${size.height}%`;
}

function objectScreenAnchor(object) {
  return worldToScreen(object.center, "viewport");
}

function distanceBetween(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function getWalkSegments() {
  return level.walkGraph.edges.map(([fromId, toId]) => {
    const from = walkNodesById.get(fromId);
    const to = walkNodesById.get(toId);
    return {
      fromId,
      toId,
      from,
      to,
      length: distanceBetween(from, to)
    };
  });
}

function projectPointToSegment(point, segment) {
  const dx = segment.to.x - segment.from.x;
  const dy = segment.to.y - segment.from.y;
  const lengthSquared = dx * dx + dy * dy;
  const t = lengthSquared === 0 ? 0 : clamp(
    ((point.x - segment.from.x) * dx + (point.y - segment.from.y) * dy) / lengthSquared,
    0,
    1
  );

  return {
    x: segment.from.x + dx * t,
    y: segment.from.y + dy * t,
    t,
    segment,
    distance: distanceBetween(point, {
      x: segment.from.x + dx * t,
      y: segment.from.y + dy * t
    })
  };
}

function projectToWalkGraph(point) {
  return getWalkSegments()
    .map((segment) => projectPointToSegment(point, segment))
    .sort((left, right) => left.distance - right.distance)[0];
}

function addGraphEdge(adjacency, fromId, toId, weight) {
  adjacency.get(fromId).push({ id: toId, weight });
  adjacency.get(toId).push({ id: fromId, weight });
}

function shortestGraphPath(startProjection, targetProjection) {
  const coordinates = new Map(level.walkGraph.nodes.map((node) => [node.id, node]));
  const adjacency = new Map([...coordinates.keys()].map((id) => [id, []]));

  level.walkGraph.edges.forEach(([fromId, toId]) => {
    addGraphEdge(adjacency, fromId, toId, distanceBetween(coordinates.get(fromId), coordinates.get(toId)));
  });

  coordinates.set("__start", startProjection);
  coordinates.set("__target", targetProjection);
  adjacency.set("__start", []);
  adjacency.set("__target", []);

  function connectProjection(id, projection) {
    const { segment, t } = projection;
    addGraphEdge(adjacency, id, segment.fromId, segment.length * t);
    addGraphEdge(adjacency, id, segment.toId, segment.length * (1 - t));
  }

  connectProjection("__start", startProjection);
  connectProjection("__target", targetProjection);

  if (startProjection.segment === targetProjection.segment) {
    addGraphEdge(
      adjacency,
      "__start",
      "__target",
      startProjection.segment.length * Math.abs(startProjection.t - targetProjection.t)
    );
  }

  const distances = new Map([...coordinates.keys()].map((id) => [id, Infinity]));
  const previous = new Map();
  const open = new Set(coordinates.keys());
  distances.set("__start", 0);

  while (open.size) {
    const current = [...open].sort((left, right) => distances.get(left) - distances.get(right))[0];
    if (current === "__target") break;
    open.delete(current);

    adjacency.get(current).forEach((neighbor) => {
      if (!open.has(neighbor.id)) return;
      const nextDistance = distances.get(current) + neighbor.weight;
      if (nextDistance < distances.get(neighbor.id)) {
        distances.set(neighbor.id, nextDistance);
        previous.set(neighbor.id, current);
      }
    });
  }

  const ids = [];
  for (let id = "__target"; id; id = previous.get(id)) {
    ids.unshift(id);
    if (id === "__start") break;
  }

  return ids.slice(1).map((id) => coordinates.get(id));
}

function routeToPoint(point) {
  const start = projectToWalkGraph({ x: state.worldX, y: state.worldY });
  const target = projectToWalkGraph(point);

  return shortestGraphPath(start, target).filter((routePoint, index, points) => {
    const previous = index === 0 ? { x: state.worldX, y: state.worldY } : points[index - 1];
    return distanceBetween(routePoint, previous) > 4;
  });
}

function pointFromViewportEvent(event, viewportElement) {
  const viewport = viewportElement.getBoundingClientRect();
  const cameraX = getCameraX();
  return {
    x: clamp(cameraX + ((event.clientX - viewport.left) / viewport.width) * state.viewportWorldWidth, 0, level.world.width),
    y: clamp(((event.clientY - viewport.top) / viewport.height) * level.world.height, 0, level.world.height)
  };
}

async function persistWalkPathDraft() {
  if (!walkPathEditor.apiAvailable || !level) return;
  try {
    await requestWalkPathApi(walkPathApiUrl("walkpath-draft"), {
      method: "POST",
      body: JSON.stringify({ walkPath: authoredWalkPathPoints(level) })
    });
  } catch (error) {
    walkPathEditor.status = "Error";
    walkPathEditor.message = `Draft opslaan mislukt. ${error.message}`;
  }
}

async function applyWalkPathDraft() {
  if (!walkPathEditor.apiAvailable || walkPathEditor.busy) return;
  walkPathEditor.busy = true;
  walkPathEditor.message = "walkPath toepassen...";
  render();

  try {
    await requestWalkPathApi(walkPathApiUrl("apply-walkpath"), {
      method: "POST",
      body: JSON.stringify({ walkPath: authoredWalkPathPoints(level) })
    });
    walkPathEditor.originalWalkPath = cloneWalkPath(authoredWalkPathPoints(level));
    walkPathEditor.status = "Applied";
    walkPathEditor.modified = false;
    walkPathEditor.message = "Opgeslagen in level.js.";
  } catch (error) {
    walkPathEditor.status = "Error";
    walkPathEditor.message = `Toepassen mislukt. ${error.message}`;
  } finally {
    walkPathEditor.busy = false;
    render();
  }
}

async function revertWalkPathDraft() {
  if (walkPathEditor.busy) return;
  walkPathEditor.busy = true;
  walkPathEditor.message = "Revert...";
  render();

  try {
    if (walkPathEditor.apiAvailable) {
      await requestWalkPathApi(walkPathApiUrl("walkpath-draft"), { method: "DELETE" });
    }
    setLevelWalkPath(walkPathEditor.originalWalkPath);
    walkPathEditor.currentPoint = null;
    walkPathEditor.status = "Reverted";
    walkPathEditor.modified = false;
    walkPathEditor.message = "Draft weggegooid. Opgeslagen pad hersteld.";
  } catch (error) {
    walkPathEditor.status = "Error";
    walkPathEditor.message = `Revert mislukt. ${error.message}`;
  } finally {
    walkPathEditor.busy = false;
    render();
  }
}

function updateDraggedWalkPathPoint(event) {
  if (walkPathEditor.draggingIndex === null || !level) return;
  const stage = document.querySelector("[data-world-stage]");
  if (!stage) return;

  const point = pointFromViewportEvent(event, stage);
  const nextWalkPath = cloneWalkPath(authoredWalkPathPoints(level));
  const nextPoint = {
    ...nextWalkPath[walkPathEditor.draggingIndex],
    x: Math.round(point.x),
    y: Math.round(point.y)
  };
  nextWalkPath[walkPathEditor.draggingIndex] = nextPoint;
  walkPathEditor.currentPoint = nextPoint;
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = `${nextPoint.id}: x ${nextPoint.x}, y ${nextPoint.y}`;
  setLevelWalkPath(nextWalkPath);
  persistWalkPathDraft();
  render();
}

function stopMovement() {
  if (state.movement?.rafId) {
    window.cancelAnimationFrame(state.movement.rafId);
  }
  state.movement = null;
}

function walkRoute(points, onArrive) {
  stopMovement();
  state.moving = true;

  if (!points.length) {
    state.svenMood = "arrived";
    render();
    onArrive();
    return;
  }

  state.svenMood = "walking";
  state.movement = {
    points,
    index: 0,
    lastTime: 0,
    speed: 250,
    onArrive,
    rafId: null
  };

  render();
  state.movement.rafId = window.requestAnimationFrame(stepMovement);
}

function stepMovement(timestamp) {
  const movement = state.movement;
  if (!movement) return;

  if (!movement.lastTime) movement.lastTime = timestamp;
  let remaining = ((timestamp - movement.lastTime) / 1000) * movement.speed;
  movement.lastTime = timestamp;

  while (remaining > 0 && state.movement) {
    const target = movement.points[movement.index];
    const dx = target.x - state.worldX;
    const dy = target.y - state.worldY;
    const distance = Math.hypot(dx, dy);

    if (distance <= remaining || distance < 0.5) {
      setSvenWorldPosition(target);
      movement.index += 1;
      remaining -= distance;

      if (movement.index >= movement.points.length) {
        const onArrive = movement.onArrive;
        state.movement = null;
        updateWorldDom();
        onArrive();
        return;
      }
    } else {
      setSvenWorldPosition({
        x: state.worldX + (dx / distance) * remaining,
        y: state.worldY + (dy / distance) * remaining
      });
      remaining = 0;
    }
  }

  updateWorldDom();
  if (state.movement) {
    state.movement.rafId = window.requestAnimationFrame(stepMovement);
  }
}

function runeById(id) {
  return level.runes.find((rune) => rune.id === id);
}

function hotspotById(id) {
  return level.hotspots.find((hotspot) => hotspot.id === id);
}

function answerFor(question) {
  return question.a * question.b;
}

function getStoredTableProgress() {
  try {
    return JSON.parse(localStorage.getItem(level.progressKey)) || { version: 1, tables: {} };
  } catch {
    return { version: 1, tables: {} };
  }
}

function saveStoredTableProgress(progress) {
  progress.updatedAt = new Date().toISOString();
  localStorage.setItem(level.progressKey, JSON.stringify(progress));
}

function updateTableProgress(question, result) {
  const table = String(question.a);
  const progress = getStoredTableProgress();
  progress.tables[table] ||= {
    questionsAsked: 0,
    attempts: 0,
    mistakes: 0,
    firstTryCorrect: 0
  };

  const stats = progress.tables[table];
  if (!state.questionTracked) {
    stats.questionsAsked += 1;
    state.questionTracked = true;
  }

  stats.attempts += 1;
  if (result === "mistake") stats.mistakes += 1;
  if (result === "firstTryCorrect") stats.firstTryCorrect += 1;
  saveStoredTableProgress(progress);
}

function getLearningHint(question) {
  const { a, b } = question;
  const low = Math.min(a, b);

  if (a === 9 || b === 9) {
    const other = a === 9 ? b : a;
    return `Bijna. 9 x ${other} is 10 x ${other} min ${other}.`;
  }

  if (a === 8 || b === 8) {
    const other = a === 8 ? b : a;
    return `Bijna. 8 x ${other}: denk aan 4 x ${other}, en dan dubbel.`;
  }

  if (low === 2) {
    return `Bijna. ${a} x ${b} is hetzelfde als ${b} x ${a}.`;
  }

  if (a === 5 || b === 5) {
    const other = a === 5 ? b : a;
    return `Bijna. Tel met sprongen van 5, ${other} keer.`;
  }

  if (a > b) {
    return `Bijna. ${a} groepjes van ${b}. Tel steeds ${b} erbij.`;
  }

  return `Bijna. ${b} groepjes van ${a} mag ook. Dat is dezelfde som.`;
}

function makeChoices(question) {
  const answer = answerFor(question);
  const raw = [
    answer,
    answer + question.a,
    Math.max(1, answer - question.b),
    answer + question.b + 2
  ];
  const unique = [...new Set(raw)].filter((value) => value > 0);

  while (unique.length < 4) {
    unique.push(answer + unique.length + 3);
  }

  return unique.sort((left, right) => {
    const leftKey = (left * 17 + question.a * 5 + question.b * 3) % 29;
    const rightKey = (right * 17 + question.a * 5 + question.b * 3) % 29;
    return leftKey - rightKey;
  });
}

function saveCompletion() {
  const payload = {
    levelId: level.id,
    completedAt: new Date().toISOString(),
    answered: state.answered,
    firstTryCorrect: state.firstTryCorrect,
    attempts: state.attempts
  };
  localStorage.setItem(level.storageKey, JSON.stringify(payload));
}

function getAccuracy() {
  if (state.totalQuestions === 0) return 0;
  return Math.round((state.firstTryCorrect / state.totalQuestions) * 100);
}

function continueIntro() {
  state.screen = "scene";
  setGuideLine("start", "Tik op het pad om te lopen. Tik op iets bijzonders.", "minnie");
  render();
}

function actionForTarget(target, kind) {
  if (kind === "rune") return "activate";
  if (target.defaultAction) return target.defaultAction;
  if (target.type === "character") return "talk";
  if (target.type === "gate") return "activate";
  return "look";
}

function beginInteraction(target, kind) {
  if (state.moving) return;

  const action = actionForTarget(target, kind);
  const movingLine = guideLineForLevel(level, "moving", level.spiritLines.moving || "Sven loopt erheen.", "moose");

  state.justCompletedRuneId = null;
  setGuideMessage({
    speaker: movingLine.speaker,
    text: `${movingLine.text} ${target.name}.`
  }, "moose");
  walkRoute(routeTo(target), () => arriveAtInteraction(target, kind, action));
}

function arriveAtInteraction(target, kind, action) {
  const targetCenter = centerForTarget(target);
  if (Math.abs(targetCenter.x - state.worldX) > 2) {
    state.svenFacing = targetCenter.x < state.worldX ? "left" : "right";
  }
  state.svenMood = "arrived";
  setGuideMessage({ speaker: "minnie", text: `${target.name}.` });
  render();

  window.setTimeout(() => {
    if (!state.moving) return;
    state.svenMood = action === "look" ? "looking" : action === "talk" ? "talking" : "activating";
    if (action === "activate" || action === "travel") {
      setGuideMessage({
        speaker: kind === "rune" ? "minnie" : "moose",
        text: kind === "rune"
          ? `Sven raakt ${target.name} aan.`
          : `Sven probeert ${target.name}.`
      });
    }
    render();

    window.setTimeout(() => {
      if (!state.moving) return;
      finishInteraction(target, kind, action);
    }, action === "activate" || action === "travel" ? 820 : 560);
  }, 180);
}

function finishInteraction(target, kind, action) {
  if (kind === "rune" && action === "look") {
    state.moving = false;
    state.svenMood = "idle";
    setGuideMessage({ speaker: "minnie", text: state.completedRunes.has(target.id) ? target.solved : target.intro });
    render();
    return;
  }

  if (kind === "rune" && action === "activate" && state.completedRunes.has(target.id)) {
    state.moving = false;
    state.svenMood = "idle";
    setGuideMessage({ speaker: "minnie", text: target.solved });
    render();
    return;
  }

  if (kind === "rune" && action === "activate") {
    state.moving = false;
    openRuneChallenge(target.id);
    return;
  }

  if (target.id === "templeGate" && action === "activate" && state.completedRunes.size === level.runes.length) {
    state.moving = false;
    setGuideLine("reward", level.spiritLines.reward || level.reward.title, "moose");
    showReward();
    return;
  }

  state.moving = false;
  state.svenMood = "idle";
  setGuideMessage({ speaker: "minnie", text: target[action] || target.look || "Sven kijkt goed." });
  render();
}

function beginFreeWalk(point) {
  if (state.screen !== "scene" || state.moving) return;

  state.justCompletedRuneId = null;
  setGuideMessage({ speaker: "moose", text: "Sven loopt." });
  walkRoute(routeToPoint(point), () => {
    state.moving = false;
    state.svenMood = "idle";
    if (isInArea("temple")) {
      setGuideLine("temple", "Daar is de tempel. Maak de drie runen wakker.", "moose");
    } else {
      setGuideLine("forest", "Volg het pad naar de tempel.", "minnie");
    }
    render();
  });
}

function openRuneChallenge(id) {
  const rune = runeById(id);
  state.screen = "challenge";
  state.activeRuneId = id;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.svenMood = "activating";
  setGuideMessage({ speaker: "minnie", text: rune.intro });
  state.feedback = rune.intro;
  render();
}

function answerQuestion(choice) {
  const rune = runeById(state.activeRuneId);
  const question = rune.questions[state.questionIndex];
  const correct = answerFor(question);
  state.attempts += 1;

  if (choice !== correct) {
    updateTableProgress(question, "mistake");
    state.selectedWrong = true;
    state.svenMood = "thinking";
    state.feedback = getLearningHint(question);
    render();
    return;
  }

  if (!state.selectedWrong) {
    state.firstTryCorrect += 1;
    updateTableProgress(question, "firstTryCorrect");
  } else {
    updateTableProgress(question, "correctAfterRetry");
  }

  state.answered += 1;
  state.svenMood = "celebrating";
  state.feedback = `Ja! ${question.a} x ${question.b} = ${correct}.`;
  state.screen = "correct";
  render();
}

function nextQuestion() {
  const rune = runeById(state.activeRuneId);

  if (state.questionIndex < rune.questions.length - 1) {
    state.questionIndex += 1;
    state.selectedWrong = false;
    state.questionTracked = false;
    state.svenMood = "idle";
    state.feedback = "De rune wil nog een som.";
    state.screen = "challenge";
    render();
    return;
  }

  state.completedRunes.add(rune.id);
  state.justCompletedRuneId = rune.id;
  state.activeRuneId = null;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.svenMood = "celebrating";
  state.feedback = "";
  state.screen = "scene";

  if (state.completedRunes.size === level.runes.length) {
    setGuideLine("allRunes", level.spiritLines.allRunes, "moose");
  } else {
    setGuideMessage({ speaker: "minnie", text: rune.solved });
  }

  render();
}

function showReward() {
  setGuideLine("reward", level.spiritLines.reward || level.reward.title, "moose");
  state.screen = "reward";
  saveCompletion();
  render();
}

function restart() {
  state.screen = "intro";
  state.introIndex = 0;
  state.worldX = level.player.start.x;
  state.worldY = level.player.start.y;
  state.cameraX = 0;
  state.svenMood = "idle";
  state.svenFacing = "right";
  state.moving = false;
  stopMovement();
  state.activeRuneId = null;
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.completedRunes = new Set();
  state.justCompletedRuneId = null;
  state.answered = 0;
  state.firstTryCorrect = 0;
  state.attempts = 0;
  setGuideLine("welcome", level.spiritLines.welcome, "minnie");
  state.feedback = "";
  render();
}

function debugWalkGraph() {
  const authoredNodes = authoredWalkPathPoints(level).map((point, index) => ({
    ...normalizeWalkPoint(point, index),
    walkPathIndex: index
  }));
  if (!authoredNodes.length) return level.walkGraph;
  return {
    nodes: authoredNodes,
    edges: authoredNodes.slice(1).map((node, index) => [authoredNodes[index].id, node.id])
  };
}

function renderDebugOverlay() {
  const approachIds = new Set(level.interactiveObjects.map((object) => object.approachNode).filter(Boolean));
  const graph = debugWalkGraph();
  const debugNodesById = new Map(graph.nodes.map((node) => [node.id, node]));
  const edges = graph.edges.map(([fromId, toId]) => {
    const from = debugNodesById.get(fromId);
    const to = debugNodesById.get(toId);
    if (!from || !to) return "";
    return `<line class="debugPathEdge" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" />`;
  });
  const nodes = graph.nodes.map((node) => `
    <g
      class="${approachIds.has(node.id) ? "debugApproachNode" : "debugWalkNode"} ${walkPathEditor.enabled ? "debugDraggableNode" : ""}"
      data-debug-node="${node.id}"
      ${Number.isInteger(node.walkPathIndex) ? `data-walkpath-index="${node.walkPathIndex}"` : ""}
    >
      <circle cx="${node.x}" cy="${node.y}" r="${approachIds.has(node.id) ? 10 : 7}" />
      <text x="${node.x + 11}" y="${node.y - 10}">${node.id}</text>
    </g>
  `);
  const objects = level.interactiveObjects.map((object) => `
    <g class="debugObject" data-debug-object="${object.id}">
      <circle cx="${object.center.x}" cy="${object.center.y}" r="${object.radius}" />
      <circle cx="${object.center.x}" cy="${object.center.y}" r="6" />
      <text x="${object.center.x + object.radius + 8}" y="${object.center.y + 4}">${object.id}</text>
    </g>
  `);

  return `
    <svg
      class="pathDebugOverlay ${walkPathEditor.enabled ? "pathDebugEditable" : ""}"
      data-debug-overlay
      viewBox="0 0 ${level.world.width} ${level.world.height}"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      ${edges.join("")}
      ${nodes.join("")}
      ${objects.join("")}
    </svg>
  `;
}

function renderDeveloperToolsPanel() {
  if (!debugOverlayEnabled || state.screen === "menu" || state.screen === "loading" || !level) return "";

  if (!WALKPATH_DEV_MODE) {
    return `
      <aside class="walkPathEditorPanel" data-developer-tools>
        <strong>Developer Tools</strong>
        <span class="developerToolMode">Current Mode: Runtime</span>
        <span class="developerToolUnavailable">WalkPath Editing: Unavailable</span>
        <span>To enable WalkPath Editing:</span>
        <ol>
          <li>Run npm run dev:walkpath</li>
          <li>Open http://127.0.0.1:4173/?dev=walkpath</li>
          <li>Start the level you want to edit</li>
          <li>Press Ctrl + Shift + D</li>
        </ol>
        <span class="developerToolReadOnly">Status: Read-only mode</span>
      </aside>
    `;
  }

  const point = walkPathEditor.currentPoint;
  const serverDisabled = !walkPathEditor.apiAvailable || walkPathEditor.busy ? "disabled" : "";
  const statusClass = `walkPathStatus${walkPathEditor.status}`;

  return `
    <aside class="walkPathEditorPanel" data-developer-tools>
      <strong>Developer Tools</strong>
      <span class="developerToolMode">Current Mode: WalkPath Editing</span>
      <span class="${statusClass}">Draft Status: ${walkPathEditor.status}</span>
      <span>How to use:</span>
      <ol>
        <li>Drag walkPath points</li>
        <li>Test movement</li>
        <li>Apply saves to the level file</li>
        <li>Revert restores the saved path</li>
      </ol>
      <p>The real level file changes only when Apply is pressed.</p>
      <span>${point ? `${point.id}: ${point.x}, ${point.y}` : "Drag a point."}</span>
      <div class="walkPathEditorActions">
        <button type="button" data-debug-action="apply-walkpath" ${serverDisabled}>Apply</button>
        <button type="button" data-debug-action="revert-walkpath" ${walkPathEditor.busy ? "disabled" : ""}>Revert</button>
      </div>
      <p>${walkPathEditor.message}</p>
    </aside>
  `;
}

function renderWorldStage() {
  const actorPosition = worldToScreen({ x: state.worldX, y: state.worldY }, "track");
  const svenClasses = [
    "svenInWorld",
    `sven-${state.svenMood}`,
    `sven-facing-${state.svenFacing}`
  ].join(" ");

  return `
    <section class="stageViewport" aria-label="Verbonden wereld" data-world-stage>
      <div
        class="worldTrack"
        style="--camera-percent:${getCameraPercent()}; --world-scale:${state.worldScale}"
      >
        <img class="worldArt" src="${level.world.background}" alt="Een doorlopend bospad naar de Vikingtempel" />
        <div class="forestMist"></div>
        ${debugOverlayEnabled ? renderDebugOverlay() : ""}
        ${level.hotspots.filter(isTargetVisible).map(renderHotspot).join("")}
        ${level.runes.map(renderRuneHotspot).join("")}
        <span
          class="${svenClasses}"
          data-actor-shell="sven"
          style="left:${actorPosition.x}%; top:${actorPosition.y}%"
        >
          <img
            class="svenSprite"
            src="${frameSrc(actorStateForMood(), 0)}"
            alt="Sven"
            data-actor="sven"
            data-animation="${actorStateForMood()}"
            data-frame="1"
            data-world-x="${Math.round(state.worldX)}"
            data-world-y="${Math.round(state.worldY)}"
          />
        </span>
      </div>
      ${renderDeveloperToolsPanel()}
    </section>
  `;
}

function isTargetVisible(target) {
  if (target.id === "templeGate") {
    return state.completedRunes.size === level.runes.length;
  }
  return true;
}

function renderHotspot(hotspot) {
  const disabled = state.moving || state.screen !== "scene";
  const object = interactiveObjectForTarget(hotspot);
  return `
    <button
      class="worldHotspot hotspot-${object?.type || hotspot.type}"
      style="${objectTrackStyle(object)}"
      type="button"
      data-hotspot="${hotspot.id}"
      data-object="${object.id}"
      data-world-center-x="${object.center.x}"
      data-world-center-y="${object.center.y}"
      data-radius="${object.radius}"
      data-approach-node="${object.approachNode || ""}"
      aria-label="${object.label || hotspot.name}"
      ${disabled ? "disabled" : ""}
    ></button>
  `;
}

function renderRuneHotspot(rune) {
  const done = state.completedRunes.has(rune.id);
  const justCompleted = state.justCompletedRuneId === rune.id;
  const disabled = state.moving || state.screen !== "scene";
  const object = interactiveObjectForTarget(rune);
  return `
    <button
      class="runeHotspot ${done ? "runeDone" : ""} ${justCompleted ? "runeJustCompleted" : ""}"
      style="${objectTrackStyle(object)}"
      type="button"
      data-rune="${rune.id}"
      data-object="${object.id}"
      data-world-center-x="${object.center.x}"
      data-world-center-y="${object.center.y}"
      data-radius="${object.radius}"
      data-approach-node="${object.approachNode || ""}"
      aria-label="${object.label || rune.name}"
      ${disabled ? "disabled" : ""}
    ></button>
  `;
}

function renderReturnToMenuButton() {
  return `
    <button class="menuReturnButton" type="button" data-action="menu" aria-label="Terug naar menu">
      Menu
    </button>
  `;
}

function canOpenTempleGate() {
  if (state.screen !== "scene" || state.completedRunes.size !== level.runes.length) return false;
  const gate = hotspotById("templeGate");
  if (!gate) return false;
  return distanceBetween({ x: state.worldX, y: state.worldY }, getApproachPoint(gate)) < 180;
}

function renderDialogue() {
  const canOpen = canOpenTempleGate();
  const done = state.completedRunes.size;
  const companionName = level.companion?.name || level.spiritName;
  const companionPortrait = level.companion?.portrait || "assets/sven-stage.png";
  return `
    <section class="dialogue" aria-live="polite">
      <img class="portrait" src="${companionPortrait}" alt="De ${companionName}" />
      <div class="speech">
        <p class="speaker">${level.spiritName} · <span data-area-name>${getAreaName()}</span> · ${done}/${level.runes.length} runen</p>
        <p>${state.message}</p>
      </div>
      ${
        canOpen
          ? `<button class="primaryButton" type="button" data-action="reward">Ga naar binnen</button>`
          : ""
      }
    </section>
  `;
}

function guideEntries(activeSpeaker = "minnie") {
  const guides = level.guides || {};
  const entries = [
    ["minnie", guides.minnie || { name: "Minnie", portrait: "assets/guides/minnie.png" }],
    ["moose", guides.moose || { name: "Moose", portrait: "assets/guides/moose.png" }]
  ];
  return entries.sort(([leftId], [rightId]) => {
    if (leftId === activeSpeaker) return -1;
    if (rightId === activeSpeaker) return 1;
    return 0;
  });
}

function renderGuidePortrait([id, guide], activeSpeaker) {
  const active = id === activeSpeaker;
  return `
    <figure class="teamPortrait ${active ? "teamPortraitActive" : "teamPortraitInactive"}" data-guide="${id}" data-active="${active}" ${active ? 'aria-current="true"' : ""}>
      <img src="${guide.portrait}" alt="${guide.name}" />
      <figcaption>${guide.name}</figcaption>
    </figure>
  `;
}

function renderAdventureTeamBar() {
  const canOpen = canOpenTempleGate();
  const done = state.completedRunes.size;
  const guideMessage = state.guideMessage || normalizeGuideMessage(state.message, "minnie");
  const activeGuide = (level.guides || {})[guideMessage.speaker] || { name: "Minnie" };
  return `
    <section class="adventureTeamBar" data-adventure-team-bar data-active-speaker="${guideMessage.speaker}" aria-live="polite">
      <div class="teamPortraits" aria-label="Avonturenteam">
        ${guideEntries(guideMessage.speaker).map((entry) => renderGuidePortrait(entry, guideMessage.speaker)).join("")}
      </div>
      <div class="teamSpeech">
        <span class="teamPaw" aria-hidden="true"></span>
        <p class="teamSpeaker">${activeGuide.name}</p>
        <p class="teamMessage">${guideMessage.text}</p>
        <p class="teamMeta"><span data-area-name>${getAreaName()}</span> - ${done}/${level.runes.length} runen</p>
      </div>
      ${
        canOpen
          ? `<button class="primaryButton" type="button" data-action="reward">Ga naar binnen</button>`
          : ""
      }
    </section>
  `;
}

function renderScene() {
  return `
    <main class="gameShell ${debugOverlayEnabled ? "debugOverlayActive" : ""}">
      ${renderReturnToMenuButton()}
      ${renderWorldStage()}
      ${renderAdventureTeamBar()}
    </main>
  `;
}

function renderMenu() {
  return `
    <main class="menuScreen">
      <section class="menuHeader">
        <p class="eyebrow">SvenAdventure</p>
        <h1>Kies een avontuur</h1>
        <p>Welke plek gaat Sven vandaag ontdekken?</p>
      </section>
      <section class="levelGrid" aria-label="Beschikbare avonturen">
        ${state.error ? `<p class="menuError">${state.error}</p>` : ""}
        ${
          levelCatalog.length
            ? levelCatalog.map(renderLevelTile).join("")
            : `<p class="emptyMenu">Er zijn nog geen avonturen gevonden.</p>`
        }
      </section>
    </main>
  `;
}

function renderLoading() {
  return `
    <main class="menuScreen loadingScreen">
      <section class="menuHeader">
        <p class="eyebrow">SvenAdventure</p>
        <h1>${state.message || "Laden..."}</h1>
      </section>
    </main>
  `;
}

function renderLevelTile(item) {
  return `
    <button class="levelTile" type="button" data-level="${item.id}">
      <img src="${item.menu?.illustration}" alt="" />
      <span class="levelTileShade"></span>
      <span class="levelTileText">
        <span class="levelBadge">${item.menu?.badge || item.id}</span>
        <strong>${item.title}</strong>
        <span>${item.subtitle || item.menu?.detail || "Nieuw avontuur"}</span>
      </span>
    </button>
  `;
}

function renderIntro() {
  return `
    <main class="introScreen">
      <img class="introBackdrop" src="${level.world.background}" alt="Een oud bos met een pad naar de tempel" />
      <section class="introPanel">
        <p class="eyebrow">${level.id}</p>
        <h1>${level.title}</h1>
        <p>${level.intro[0]}</p>
        <button class="secondaryButton" type="button" data-action="menu">Terug</button>
        <button class="primaryButton" type="button" data-action="intro-next">Start avontuur</button>
      </section>
    </main>
  `;
}

function renderChallenge() {
  const rune = runeById(state.activeRuneId);
  const question = rune.questions[state.questionIndex];
  const choices = makeChoices(question);
  const number = state.questionIndex + 1;
  const total = rune.questions.length;
  const object = interactiveObjectForTarget(rune);
  const anchor = objectScreenAnchor(object);
  const panelClass = anchor.x < 52 ? "runePanelRight" : "runePanelLeft";
  const challengeCharacter = getChallengeCharacter();
  const challengeLine = challengePromptForRune(rune);

  return `
    ${renderScene()}
    <section
      class="modalLayer runeLayer ${panelClass}"
      style="--rune-screen-x:${anchor.x}%; --rune-screen-y:${anchor.y}%; --rune-radius:${object.radius}px"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-title"
    >
      <div class="runeFocusSpark" aria-hidden="true"></div>
      <div class="challengeBox runeChallengeBox">
        <div class="challengeHeader" data-challenge-character="${challengeCharacter.id}">
          <img class="challengeCharacterPortrait" src="${challengeCharacter.portrait}" alt="${challengeCharacter.name}" />
          <div class="challengeCharacterSpeech">
            <p class="eyebrow">${challengeCharacter.name} - Rune ${number}/${total}</p>
            <h2 id="challenge-title">${rune.name}</h2>
            <p>${challengeLine}</p>
          </div>
        </div>
        <p class="feedback">${state.feedback}</p>
        <p class="sum">Hoeveel is ${question.a} x ${question.b}?</p>
        <p class="runeWhisper">Raak de juiste steen aan.</p>
        <div class="choices">
          ${choices.map((choice) => `<button class="answerStone" type="button" data-choice="${choice}">${choice}</button>`).join("")}
        </div>
      </div>
    </section>
  `;
}

function getChallengeCharacter() {
  return level.challengeCharacter || level.companion || {
    id: "runewachter",
    name: level.spiritName || "Runewachter",
    portrait: level.challengeArt || "Levels/LVL-0001/assets/viking-spirit.png"
  };
}

function challengePromptForRune(rune) {
  return `Laat de ${rune.name} ontwaken.`;
}

function renderCorrect() {
  const rune = runeById(state.activeRuneId);
  const lastQuestion = state.questionIndex === rune.questions.length - 1;
  const object = interactiveObjectForTarget(rune);
  const anchor = objectScreenAnchor(object);
  const panelClass = anchor.x < 52 ? "runePanelRight" : "runePanelLeft";

  return `
    ${renderScene()}
    <section
      class="modalLayer runeLayer ${panelClass}"
      style="--rune-screen-x:${anchor.x}%; --rune-screen-y:${anchor.y}%; --rune-radius:${object.radius}px"
      role="dialog"
      aria-modal="true"
      aria-labelledby="correct-title"
    >
      <div class="runeFocusSpark runeFocusCorrect" aria-hidden="true"></div>
      <div class="challengeBox runeChallengeBox successBox">
        <div class="runeBurst" aria-hidden="true"></div>
        <h2 id="correct-title">Goed zo!</h2>
        <p class="feedback">${state.feedback}</p>
        <button class="primaryButton" type="button" data-action="next-question">
          ${lastQuestion ? "Maak de rune wakker" : "Volgende som"}
        </button>
      </div>
    </section>
  `;
}

function renderReward() {
  return `
    <main class="rewardScreen">
      <img class="rewardArt" src="${level.reward.art}" alt="Sven voor de geopende tempelpoort" />
      <section class="rewardPanel">
        <p class="eyebrow">${level.id}</p>
        <h1>${level.reward.title}</h1>
        <p>${level.reward.line}</p>
        <div class="badge">${level.reward.badge}</div>
        <div class="stats">
          <span>${state.answered} sommen</span>
          <span>${getAccuracy()}% in een keer goed</span>
          <span>${state.attempts} pogingen</span>
        </div>
        <button class="primaryButton" type="button" data-action="restart">Speel nog een keer</button>
        <button class="secondaryButton" type="button" data-action="menu">Menu</button>
      </section>
      ${renderAdventureTeamBar()}
    </main>
  `;
}

function render() {
  if (state.screen === "menu") {
    app.innerHTML = renderMenu();
  } else if (state.screen === "loading") {
    app.innerHTML = renderLoading();
  } else if (state.screen === "intro") {
    app.innerHTML = renderIntro();
  } else if (state.screen === "challenge") {
    app.innerHTML = renderChallenge();
  } else if (state.screen === "correct") {
    app.innerHTML = renderCorrect();
  } else if (state.screen === "reward") {
    app.innerHTML = renderReward();
  } else {
    app.innerHTML = renderScene();
  }

  const actor = document.querySelector("[data-actor='sven']");
  if (actor) {
    actor.addEventListener("error", () => {
      actorPlayback.failedSources.add(actor.getAttribute("src"));
      actor.src = ACTOR_FALLBACK_SRC;
    });
    requestActorAnimation(actorStateForMood());
  } else if (actorPlayback.rafId) {
    window.cancelAnimationFrame(actorPlayback.rafId);
    actorPlayback.rafId = null;
  }

  updateWorldDom();
}

app.addEventListener("click", (event) => {
  if (event.target.closest("[data-walkpath-index]")) {
    event.preventDefault();
    return;
  }

  const debugActionTarget = event.target.closest("[data-debug-action]");
  if (debugActionTarget) {
    event.preventDefault();
    const action = debugActionTarget.dataset.debugAction;
    if (action === "apply-walkpath") applyWalkPathDraft();
    if (action === "revert-walkpath") revertWalkPathDraft();
    return;
  }

  const levelTarget = event.target.closest("[data-level]");
  if (levelTarget) {
    selectLevel(levelTarget.dataset.level);
    return;
  }

  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) {
    const action = actionTarget.dataset.action;
    if (action === "intro-next") continueIntro();
    if (action === "menu") returnToMenu();
    if (action === "next-question") nextQuestion();
    if (action === "reward") showReward();
    if (action === "restart") restart();
    return;
  }

  const hotspotTarget = event.target.closest("[data-hotspot]");
  if (hotspotTarget) {
    beginInteraction(hotspotById(hotspotTarget.dataset.hotspot), "hotspot");
    return;
  }

  const runeTarget = event.target.closest("[data-rune]");
  if (runeTarget) {
    beginInteraction(runeById(runeTarget.dataset.rune), "rune");
    return;
  }

  const choiceTarget = event.target.closest("[data-choice]");
  if (choiceTarget) {
    answerQuestion(Number(choiceTarget.dataset.choice));
    return;
  }

  const stageTarget = event.target.closest("[data-world-stage]");
  if (stageTarget) {
    beginFreeWalk(pointFromViewportEvent(event, stageTarget));
  }
});

app.addEventListener("pointerdown", (event) => {
  const pointTarget = event.target.closest("[data-walkpath-index]");
  if (!pointTarget || !walkPathEditor.enabled || !debugOverlayEnabled) return;
  event.preventDefault();
  walkPathEditor.draggingIndex = Number(pointTarget.dataset.walkpathIndex);
  updateDraggedWalkPathPoint(event);
});

window.addEventListener("pointermove", (event) => {
  if (walkPathEditor.draggingIndex === null) return;
  event.preventDefault();
  updateDraggedWalkPathPoint(event);
});

window.addEventListener("pointerup", () => {
  walkPathEditor.draggingIndex = null;
});

window.addEventListener("resize", updateWorldDom);

window.addEventListener("keydown", (event) => {
  if (!(event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d")) return;
  event.preventDefault();
  debugOverlayEnabled = !debugOverlayEnabled;
  if (level && ["scene", "challenge", "correct"].includes(state.screen)) {
    render();
  }
});

preloadActorAnimations();
preloadMenuAssets();
render();
