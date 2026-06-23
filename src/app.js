const app = document.querySelector("#app");
const levelCatalog = window.SVEN_LEVEL_MANIFEST?.levels || [];
const visibleLevelCatalog = () => levelCatalog.filter((item) => !item.hiddenFromMenu);
const sessionReport = window.AtlasSessionReport;
window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};
let level = null;
let walkNodesById = new Map();
let debugOverlayEnabled = false;
const missingTrackedObjectWarnings = new Set();

const ACTOR_FALLBACK_SRC = "assets/sven-stage.png";
const DERIVED_WALK_SEGMENT_LENGTH = 90;
const EDITOR_DEV_MODE = new URLSearchParams(window.location.search).get("dev") === "editor";
const VIKING_LEVEL_IDS = new Set(["LVL-0001", "LVL-0002", "LVL-0003"]);
const GUIDE_PURR_KEYS = {
  minnie: ["minnie1", "minnie2"],
  moose: ["moose1", "moose2"]
};
const SFX_LABELS = {
  uiClick: "UI click",
  challengeOpen: "Challenge open",
  correct: "Correct",
  incorrect: "Incorrect",
  challengeComplete: "Challenge complete",
  unlock: "Unlock",
  adventureComplete: "Adventure complete"
};
const COMPANION_EVENT_PRIORITY = {
  LEVEL_ENTER: 10,
  OBJECT_FIRST_LOOK: 20,
  AMBIENT_ATTENTION: 25,
  AMBIENT_ATTENTION_FIRST: 25,
  HOTSPOT_ATTENTION_FIRST: 30,
  COMPANION_CONVERSATION: 30,
  CHALLENGE_OPEN: 40,
  LEVEL_PROGRESS_MILESTONE: 50,
  EXIT_BLOCKED: 60,
  CHALLENGE_SUCCESS: 60,
  CHALLENGE_FAIL_1: 70,
  CHALLENGE_FAIL_2: 80,
  PATH_UNLOCKED: 90,
  ADVENTURE_COMPLETE: 100
};
const IMMEDIATE_COMPANION_EVENTS = new Set([
  "AMBIENT_ATTENTION",
  "AMBIENT_ATTENTION_FIRST",
  "HOTSPOT_ATTENTION_FIRST",
  "LEVEL_PROGRESS_MILESTONE",
  "EXIT_BLOCKED",
  "PATH_UNLOCKED"
]);
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
  screen: "launch"
};

let audioConfig = cloneAudioConfig(window.SVEN_AUDIO_CONFIG || {});
const audioState = {
  unlocked: false,
  music: null,
  ambience: null,
  currentMusicKey: null,
  currentAmbienceKey: null,
  sfx: new Map(),
  purr: null,
  purringGuide: null,
  lastPurrByGuide: {}
};
const ambientAnimalRuntime = {
  levelId: null,
  loaded: new Set(),
  openReady: new Set(),
  closedReady: new Set(),
  animals: new Map(),
  sounds: new Map()
};
const assetCache = window.AtlasAmbientSystem.createAssetCache({
  warn: (message) => {
    if (EDITOR_DEV_MODE) console.warn(message);
  }
});
const guideBlinkRuntime = {
  minnie: { ready: false, timer: null, sequenceTimers: new Set(), frame: "open", blinking: false },
  moose: { ready: false, timer: null, sequenceTimers: new Set(), frame: "open", blinking: false }
};
const GUIDE_BLINK_PATHS = {
  minnie: "assets/guides/minnie_blink.png",
  moose: "assets/guides/moose_blink.png"
};
const ambientFlybyRuntime = window.AtlasAmbientSystem.createFlybyRuntime({
  getLevel: () => level,
  getScreen: () => state.screen,
  assetCache,
  getAudioUnlocked: () => audioState.unlocked,
  getMasterVolume: () => audioMasterVolume(),
  warn: (message) => {
    if (EDITOR_DEV_MODE) console.warn(message);
  }
});

let walkPathEditor = {
  enabled: EDITOR_DEV_MODE,
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
  const startPoint = getPlayerStartPoint(selectedLevel);
  const initialGuideMessage = guideLineForLevel(
    selectedLevel,
    "welcome",
    selectedLevel.spiritLines?.welcome || "Welkom, Sven.",
    "minnie"
  );

  return {
    screen: "intro",
    introIndex: 0,
    worldX: startPoint.x,
    worldY: startPoint.y,
    viewportWorldWidth: selectedLevel.world.viewportWidth,
    worldScale: selectedLevel.world.width / selectedLevel.world.viewportWidth,
    cameraX: 0,
    svenMood: "idle",
    svenFacing: "right",
    moving: false,
    movement: null,
    interactionToken: 0,
    movementIntent: null,
    activeRuneId: null,
    selectedChallengeId: null,
    activeQuestions: [],
    questionIndex: 0,
    selectedWrong: false,
    questionTracked: false,
    assistedCompletionAvailable: false,
    challengeGuideMessage: null,
    completedRunes: new Set(),
    justCompletedRuneId: null,
    totalQuestions: selectedLevel.runes.reduce((sum) => sum + 4, 0),
    answered: 0,
    firstTryCorrect: 0,
    attempts: 0,
    guideMessage: initialGuideMessage,
    guidePriority: 0,
    companionQueue: [],
    seenObjects: new Set(),
    challengeFailureCounts: {},
    message: initialGuideMessage.text,
    feedback: ""
  };
}

function walkPathNodeById(selectedLevel, nodeId) {
  return authoredWalkPathPoints(selectedLevel)
    .map(normalizeWalkPoint)
    .find((point) => point.id === nodeId);
}

function getPlayerStartPoint(selectedLevel) {
  const startNodeId = selectedLevel.player?.startNode;
  if (startNodeId) {
    const startNode = walkPathNodeById(selectedLevel, startNodeId);
    if (startNode) {
      return { x: startNode.x, y: startNode.y };
    }
  }

  return {
    x: selectedLevel.player.start.x,
    y: selectedLevel.player.start.y
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

function momentMatchesContext(moment, context) {
  if (moment.objectId && moment.objectId !== context.objectId) return false;
  if (moment.challengeId && moment.challengeId !== context.challengeId) return false;
  return true;
}

function formatCompanionText(text, context = {}) {
  const completed = Number(context.completedCount ?? state.completedRunes?.size ?? 0);
  const total = Number(context.totalCount ?? level?.runes?.length ?? 0);
  const remaining = Math.max(0, total - completed);
  return String(text || "")
    .replaceAll("{completed}", String(completed))
    .replaceAll("{total}", String(total))
    .replaceAll("{remaining}", String(remaining));
}

function authoredCompanionMoments(eventName, context = {}) {
  return (level.companionMoments || [])
    .filter((moment) => moment.event === eventName && momentMatchesContext(moment, context))
    .map((moment) => ({
      ...moment,
      text: formatCompanionText(moment.text, context),
      priority: moment.priority ?? COMPANION_EVENT_PRIORITY[eventName] ?? 0
    }));
}

function playQueuedCompanionMoment() {
  if (state.moving || !state.companionQueue?.length) return;
  const next = state.companionQueue.shift();
  setGuideMessage(next, next.speaker);
  state.guidePriority = next.priority ?? 0;
}

function queueCompanionMoment(moment) {
  state.companionQueue ||= [];
  state.companionQueue.push(moment);
}

function emitCompanionEvent(eventName, context = {}) {
  const moments = authoredCompanionMoments(eventName, context);
  if (!moments.length) return;

  const priority = COMPANION_EVENT_PRIORITY[eventName] ?? 0;
  const queuedMoments = moments.map((moment) => ({ ...moment, priority }));

  if (IMMEDIATE_COMPANION_EVENTS.has(eventName)) {
    const [first, ...rest] = queuedMoments;
    state.companionQueue = rest;
    setGuideMessage(first, first.speaker);
    state.guidePriority = priority;
    return;
  }

  if (state.moving) {
    queuedMoments.forEach(queueCompanionMoment);
    return;
  }

  if ((state.guidePriority || 0) < priority) {
    state.companionQueue = (state.companionQueue || []).filter((moment) => (moment.priority ?? 0) >= priority);
    const [first, ...rest] = queuedMoments;
    if (first.bridge && state.guideMessage?.text) {
      setGuideMessage({ speaker: first.speaker, text: first.bridge }, first.speaker);
      state.guidePriority = priority;
      queueCompanionMoment(first);
    } else {
      setGuideMessage(first, first.speaker);
      state.guidePriority = priority;
    }
    rest.forEach(queueCompanionMoment);
    return;
  }

  queuedMoments.forEach(queueCompanionMoment);
}

function advanceCompanionDialogue() {
  playQueuedCompanionMoment();
  render();
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

function cloneInteractiveObjects(objects) {
  return objects.map((object) => ({
    ...object,
    center: { ...object.center },
    allowOverlapWith: object.allowOverlapWith ? [...object.allowOverlapWith] : undefined
  }));
}

function cloneAudioConfig(config) {
  return JSON.parse(JSON.stringify(config || {}));
}

function clampVolume(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return Math.min(1, Math.max(0, number));
}

function getLevelAudioConfig(levelId = level?.id) {
  return audioConfig.levels?.[levelId] || {};
}

function sfxKeys() {
  return Object.keys(audioConfig.tracks?.sfx || {});
}

function getSfxVolume(key) {
  return clampVolume(audioConfig.volumes?.sfx?.[key] ?? 0.7);
}

function setAudioConfig(nextConfig) {
  audioConfig = cloneAudioConfig(nextConfig);
  window.SVEN_AUDIO_CONFIG = cloneAudioConfig(nextConfig);
  if (audioState.purr) {
    audioState.purr.volume = audioMasterVolume() * clampVolume(audioConfig.volumes?.companionPurr ?? 0.55);
  }
  syncAudioForState();
}

function cloneAmbientFlybys(flybys) {
  return JSON.parse(JSON.stringify(flybys || []));
}

function setLevelWalkPath(walkPath) {
  level.walkPath = cloneWalkPath(walkPath);
  level.walkGraph = deriveWalkGraph(level);
  walkNodesById = new Map(level.walkGraph.nodes.map((node) => [node.id, node]));
}

function setLevelInteractiveObjects(objects) {
  level.interactiveObjects = cloneInteractiveObjects(objects);
}

function setLevelAmbientAnimals(animals) {
  level.ambientAnimals = cloneAmbientAnimals(animals);
  resetAmbientAnimalTimers();
  preloadAmbientAnimals(level);
}

function setLevelAmbientFlybys(flybys) {
  level.ambientFlybys = cloneAmbientFlybys(flybys);
  ambientFlybyRuntime.prepareLevel(level);
}

function editorApiUrl(action = "editor-draft") {
  return `/__dev/levels/${encodeURIComponent(level.id)}/${action}`;
}

async function requestEditorApi(url, options = {}) {
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
    enabled: EDITOR_DEV_MODE,
    apiAvailable: false,
    originalWalkPath: cloneWalkPath(authoredWalkPathPoints(selectedLevel)),
    originalInteractiveObjects: cloneInteractiveObjects(selectedLevel.interactiveObjects || []),
    originalAmbientAnimals: cloneAmbientAnimals(selectedLevel.ambientAnimals || []),
    originalAmbientFlybys: cloneAmbientFlybys(selectedLevel.ambientFlybys || []),
    originalAudioConfig: cloneAudioConfig(audioConfig),
    draggingIndex: null,
    draggingObjectId: null,
    draggingObjectMode: null,
    draggingAnimalId: null,
    currentPoint: null,
    currentObject: null,
    currentAnimal: null,
    currentFlyby: null,
    selectedObjectType: (selectedLevel.ambientAnimals || []).length ? "animal" : "flyby",
    selectedObjectId: selectedLevel.ambientAnimals?.[0]?.id || selectedLevel.ambientFlybys?.[0]?.id || null,
    assets: { images: [], audio: [] },
    assetMessage: "",
    pathMode: false,
    selectedPathPoint: 0,
    draggingFlybyPoint: null,
    addingFlybyPoint: false,
    pathViewBox: null,
    pathPan: null,
    openSections: new Set(["ambient-animals", "ambient-flybys"]),
    status: "Clean",
    modified: false,
    message: EDITOR_DEV_MODE ? "Gebruik Ctrl + Shift + D om levelpunten, objecten of audio te bewerken." : "",
    busy: false
  };

  if (!EDITOR_DEV_MODE || !window.location.protocol.startsWith("http")) return;

  try {
    await requestEditorApi("/__dev/status");
    walkPathEditor.apiAvailable = true;
    walkPathEditor.message = "Dev server actief.";
    const draft = await requestEditorApi(`/__dev/levels/${encodeURIComponent(selectedLevel.id)}/editor-draft`);
    if (Array.isArray(draft.walkPath)) {
      selectedLevel.walkPath = cloneWalkPath(draft.walkPath);
    }
    if (Array.isArray(draft.interactiveObjects)) {
      selectedLevel.interactiveObjects = cloneInteractiveObjects(draft.interactiveObjects);
    }
    if (Array.isArray(draft.ambientAnimals)) {
      selectedLevel.ambientAnimals = cloneAmbientAnimals(draft.ambientAnimals);
    }
    if (Array.isArray(draft.ambientFlybys)) {
      selectedLevel.ambientFlybys = cloneAmbientFlybys(draft.ambientFlybys);
    }
    if (draft.audioConfig) {
      setAudioConfig(draft.audioConfig);
    }
    if (Array.isArray(draft.walkPath) || Array.isArray(draft.interactiveObjects) || Array.isArray(draft.ambientAnimals) || Array.isArray(draft.ambientFlybys) || draft.audioConfig) {
      walkPathEditor.status = "Modified";
      walkPathEditor.modified = true;
      walkPathEditor.message = "Draft geladen. Test veilig verder.";
    }
    await refreshAmbientAssets(false, selectedLevel.id);
  } catch (error) {
    walkPathEditor.apiAvailable = false;
    walkPathEditor.message = "Geen dev server. Start npm run dev:editor.";
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
  selectedLevel.player.start = getPlayerStartPoint(selectedLevel);
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
  [
    "assets/branding/launch-hero.png",
    ...visibleLevelCatalog().map((item) => item.menu?.illustration)
  ]
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
    selectedLevel.challengeCharacter?.portrait,
    ...Object.values(selectedLevel.guides || {}).map((guide) => guide.portrait),
    ...(selectedLevel.ambientAnimals || []).flatMap((animal) => [animal.openFrame, animal.closedFrame]),
    ...(selectedLevel.ambientFlybys || []).flatMap((flyby) => [flyby.frameA, flyby.frameB]),
    selectedLevel.challengeArt,
    selectedLevel.reward?.art
  ]
    .filter(Boolean)
    .forEach((src) => {
      assetCache.image(src).catch(() => {});
    });
  (selectedLevel.ambientAnimals || []).map((animal) => animal.sound).filter(Boolean)
    .forEach((src) => assetCache.sound(src).catch(() => {}));
  (selectedLevel.ambientFlybys || []).map((flyby) => flyby.sound).filter(Boolean)
    .forEach((src) => assetCache.sound(src).catch(() => {}));
}

function loadAndDecodeImage(src) {
  return assetCache.image(src);
}

async function preloadAmbientAnimals(selectedLevel) {
  const animals = selectedLevel.ambientAnimals || [];
  ambientAnimalRuntime.levelId = selectedLevel.id;
  await Promise.all(animals.map(async (animal) => {
    const key = `${selectedLevel.id}:${animal.id}`;
    try {
      await loadAndDecodeImage(animal.openFrame);
      ambientAnimalRuntime.openReady.add(key);
    } catch {
      if (EDITOR_DEV_MODE) console.warn(`[Atlas] ${selectedLevel.id} animal "${animal.id}" failed ${animal.openFrame}`);
      return;
    }
    try {
      await loadAndDecodeImage(animal.closedFrame);
      ambientAnimalRuntime.closedReady.add(key);
      ambientAnimalRuntime.loaded.add(key);
    } catch {
      if (EDITOR_DEV_MODE) console.warn(`[Atlas] ${selectedLevel.id} animal "${animal.id}" blink disabled: ${animal.closedFrame}`);
    }
    if (animal.sound) assetCache.sound(animal.sound).catch(() => {
      if (EDITOR_DEV_MODE) console.warn(`[Atlas] ${selectedLevel.id} animal "${animal.id}" sound disabled: ${animal.sound}`);
    });
  }));
  if (level?.id === selectedLevel.id) {
    document.querySelectorAll("[data-ambient-animal]").forEach((shell) => {
      shell.dataset.ready = String(ambientAnimalRuntime.openReady.has(`${selectedLevel.id}:${shell.dataset.ambientAnimal}`));
    });
    syncAmbientAnimalTimers();
  }
}

function clearGuideBlinkState(runtime) {
  window.clearTimeout(runtime.timer);
  runtime.timer = null;
  runtime.sequenceTimers.forEach((timer) => window.clearTimeout(timer));
  runtime.sequenceTimers.clear();
  runtime.blinking = false;
  runtime.frame = "open";
}

function guideBlinkDelay(runtime, callback, delay) {
  const timer = window.setTimeout(() => {
    runtime.sequenceTimers.delete(timer);
    callback();
  }, delay);
  runtime.sequenceTimers.add(timer);
}

function setGuideBlinkFrame(guideId, frame) {
  const runtime = guideBlinkRuntime[guideId];
  runtime.frame = frame;
  const image = document.querySelector(`[data-guide-image="${guideId}"]`);
  if (image) image.src = frame === "closed" && runtime.ready
    ? GUIDE_BLINK_PATHS[guideId]
    : image.dataset.openSrc;
}

function runGuideBlink(guideId, options = {}) {
  const runtime = guideBlinkRuntime[guideId];
  if (!runtime?.ready || runtime.blinking || document.hidden || !document.querySelector(`[data-guide-image="${guideId}"]`)) return false;
  window.clearTimeout(runtime.timer);
  runtime.timer = null;
  runtime.blinking = true;
  const doubleBlink = options.doubleBlink ?? Math.random() < 0.12;
  setGuideBlinkFrame(guideId, "closed");
  guideBlinkDelay(runtime, () => {
    setGuideBlinkFrame(guideId, "open");
    if (!doubleBlink) {
      runtime.blinking = false;
      scheduleGuideBlink(guideId);
      return;
    }
    guideBlinkDelay(runtime, () => {
      setGuideBlinkFrame(guideId, "closed");
      guideBlinkDelay(runtime, () => {
        setGuideBlinkFrame(guideId, "open");
        runtime.blinking = false;
        scheduleGuideBlink(guideId);
      }, 90 + Math.round(Math.random() * 30));
    }, 90 + Math.round(Math.random() * 30));
  }, 90 + Math.round(Math.random() * 30));
  return true;
}

function scheduleGuideBlink(guideId) {
  const runtime = guideBlinkRuntime[guideId];
  if (!runtime?.ready || runtime.timer || runtime.blinking || document.hidden || !document.querySelector(`[data-guide-image="${guideId}"]`)) return;
  runtime.timer = window.setTimeout(() => {
    runtime.timer = null;
    runGuideBlink(guideId);
  }, 4000 + Math.round(Math.random() * 5000));
}

function syncGuideBlinkTimers() {
  Object.keys(guideBlinkRuntime).forEach((guideId) => {
    if (document.querySelector(`[data-guide-image="${guideId}"]`)) scheduleGuideBlink(guideId);
    else clearGuideBlinkState(guideBlinkRuntime[guideId]);
  });
}

function preloadGuideBlinkAssets() {
  Object.entries(GUIDE_BLINK_PATHS).forEach(([guideId, path]) => {
    assetCache.image(path).then(() => {
      guideBlinkRuntime[guideId].ready = true;
      syncGuideBlinkTimers();
    }).catch(() => {
      guideBlinkRuntime[guideId].ready = false;
    });
  });
}

function animalRuntimeState(animal) {
  if (!ambientAnimalRuntime.animals.has(animal.id)) {
    ambientAnimalRuntime.animals.set(animal.id, {
      timer: null,
      sequenceTimers: new Set(),
      blinking: false,
      automaticBlinking: false,
      frame: "open",
      sequenceCount: 0
    });
  }
  return ambientAnimalRuntime.animals.get(animal.id);
}

function clearAnimalTimer(runtime) {
  window.clearTimeout(runtime.timer);
  runtime.timer = null;
  runtime.sequenceTimers.forEach((timer) => window.clearTimeout(timer));
  runtime.sequenceTimers.clear();
  runtime.blinking = false;
  runtime.automaticBlinking = false;
  runtime.frame = "open";
}

function resetAmbientAnimalTimers() {
  ambientAnimalRuntime.animals.forEach(clearAnimalTimer);
  ambientAnimalRuntime.animals.clear();
}

function setAmbientAnimalFrame(animalId, frame) {
  const runtime = ambientAnimalRuntime.animals.get(animalId);
  if (runtime) runtime.frame = frame;
  const shell = document.querySelector(`[data-ambient-animal="${animalId}"]`);
  if (shell) shell.dataset.frame = frame;
}

function animalDelay(callback, delay, runtime) {
  const timer = window.setTimeout(() => {
    runtime.sequenceTimers.delete(timer);
    callback();
  }, delay);
  runtime.sequenceTimers.add(timer);
}

function runAmbientAnimalBlink(animal, options = {}) {
  const runtime = animalRuntimeState(animal);
  if (runtime.blinking && runtime.automaticBlinking && options.doubleBlink !== undefined) {
    runtime.sequenceTimers.forEach((timer) => window.clearTimeout(timer));
    runtime.sequenceTimers.clear();
    runtime.blinking = false;
    runtime.automaticBlinking = false;
    setAmbientAnimalFrame(animal.id, "open");
  }
  if (
    runtime.blinking ||
    document.hidden ||
    !ambientAnimalRuntime.loaded.has(`${level?.id}:${animal.id}`)
  ) return false;
  window.clearTimeout(runtime.timer);
  runtime.timer = null;
  runtime.blinking = true;
  runtime.automaticBlinking = options.doubleBlink === undefined;
  runtime.sequenceCount += 1;
  const doubleBlink = options.doubleBlink ?? Math.random() < animal.doubleBlinkChance;
  const firstClosedMs = doubleBlink ? 80 + Math.round(Math.random() * 10) : animal.blinkDurationMs;

  setAmbientAnimalFrame(animal.id, "closed");
  animalDelay(() => {
    setAmbientAnimalFrame(animal.id, "open");
    if (!doubleBlink) {
      runtime.blinking = false;
      runtime.automaticBlinking = false;
      scheduleAmbientAnimalBlink(animal);
      return;
    }
    const openGapMs = 90 + Math.round(Math.random() * 30);
    animalDelay(() => {
      setAmbientAnimalFrame(animal.id, "closed");
      animalDelay(() => {
        setAmbientAnimalFrame(animal.id, "open");
        runtime.blinking = false;
        runtime.automaticBlinking = false;
        scheduleAmbientAnimalBlink(animal);
      }, 80 + Math.round(Math.random() * 10), runtime);
    }, openGapMs, runtime);
  }, firstClosedMs, runtime);
  return true;
}

function scheduleAmbientAnimalBlink(animal) {
  const runtime = animalRuntimeState(animal);
  if (
    runtime.timer ||
    runtime.blinking ||
    document.hidden ||
    level?.id !== ambientAnimalRuntime.levelId ||
    !ambientAnimalRuntime.loaded.has(`${level.id}:${animal.id}`)
  ) return;
  const min = Number(animal.blinkMinMs);
  const max = Number(animal.blinkMaxMs);
  const delay = min + Math.round(Math.random() * Math.max(0, max - min));
  runtime.timer = window.setTimeout(() => {
    runtime.timer = null;
    runAmbientAnimalBlink(animal);
  }, delay);
}

function syncAmbientAnimalTimers() {
  if (!level) return;
  if (!["scene", "challenge", "correct"].includes(state.screen)) {
    pauseAmbientAnimalTimers();
    return;
  }
  ambientAnimalRuntime.levelId = level.id;
  (level.ambientAnimals || []).forEach(scheduleAmbientAnimalBlink);
}

function pauseAmbientAnimalTimers() {
  ambientAnimalRuntime.animals.forEach(clearAnimalTimer);
  document.querySelectorAll("[data-ambient-animal]").forEach((shell) => {
    shell.dataset.frame = "open";
  });
}

function playAmbientAnimalSound(animal) {
  if (!audioState.unlocked || !animal.sound) return false;
  const existing = ambientAnimalRuntime.sounds.get(animal.id);
  const timestamp = Date.now();
  if (existing?.playing || timestamp < (existing?.cooldownUntil || 0)) return false;
  const audio = new Audio(animal.sound);
  audio.volume = clampVolume(animal.soundVolume ?? 1);
  const soundState = { audio, playing: true, cooldownUntil: 0 };
  ambientAnimalRuntime.sounds.set(animal.id, soundState);
  const finish = () => {
    if (!soundState.playing) return;
    soundState.playing = false;
    soundState.cooldownUntil = Date.now() + Number(animal.soundCooldownMs || 0);
  };
  audio.addEventListener("ended", finish, { once: true });
  audio.addEventListener("error", finish, { once: true });
  audio.play().catch(finish);
  return true;
}

function audioTrackPath(type, key) {
  return audioConfig.tracks?.[type]?.[key] || "";
}

function audioMasterVolume() {
  return clampVolume(audioConfig.volumes?.master ?? 1);
}

function setLoopAudio(kind, key, src, volume) {
  const elementKey = kind === "music" ? "music" : "ambience";
  const currentKey = kind === "music" ? "currentMusicKey" : "currentAmbienceKey";
  const previous = audioState[elementKey];

  if (!src || volume <= 0) {
    if (previous) previous.pause();
    audioState[elementKey] = null;
    audioState[currentKey] = null;
    return;
  }

  if (previous && audioState[currentKey] === key) {
    previous.volume = volume;
    if (previous.paused) previous.play().catch(() => {});
    return;
  }

  if (previous) previous.pause();
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = volume;
  audioState[elementKey] = audio;
  audioState[currentKey] = key;
  audio.play().catch(() => {});
}

function stopAmbience() {
  if (audioState.ambience) audioState.ambience.pause();
  audioState.ambience = null;
  audioState.currentAmbienceKey = null;
}

function syncAudioForState() {
  if (!audioState.unlocked) return;

  const master = audioMasterVolume();
  if (state.screen === "launch") {
    stopAmbience();
    return;
  }
  if (state.screen === "menu" || !level) {
    const menuMusicKey = audioConfig.menu?.music || "menu";
    setLoopAudio("music", menuMusicKey, audioTrackPath("music", menuMusicKey), master * clampVolume(audioConfig.menu?.musicVolume ?? 0.65));
    stopAmbience();
    return;
  }

  const levelAudio = getLevelAudioConfig(level.id);
  setLoopAudio("music", levelAudio.music, audioTrackPath("music", levelAudio.music), master * clampVolume(levelAudio.musicVolume ?? 0.55));
  setLoopAudio(
    "ambience",
    levelAudio.ambience,
    audioTrackPath("ambience", levelAudio.ambience),
    master * clampVolume(levelAudio.ambienceVolume ?? 0.5)
  );
}

function ensureAudioUnlocked() {
  if (audioState.unlocked) return;
  audioState.unlocked = true;
  syncAudioForState();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  if (!window.location.protocol.startsWith("http")) return;
  if (EDITOR_DEV_MODE) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }, { once: true });
}

function playSfx(key) {
  if (!audioState.unlocked) return;
  const src = audioTrackPath("sfx", key);
  if (!src) return;
  const audio = new Audio(src);
  audio.volume = audioMasterVolume() * getSfxVolume(key);
  audioState.sfx.set(key, audio);
  audio.addEventListener("ended", () => audioState.sfx.delete(key), { once: true });
  audio.play().catch(() => {});
}

function cloneAmbientAnimals(animals) {
  return JSON.parse(JSON.stringify(animals || []));
}

function playGuidePurr(guideId) {
  const keys = GUIDE_PURR_KEYS[guideId];
  if (!audioState.unlocked || audioState.purr || !keys?.length) return;

  const previousKey = audioState.lastPurrByGuide[guideId];
  const availableKeys = keys.length > 1 ? keys.filter((key) => key !== previousKey) : keys;
  const key = availableKeys[Math.floor(Math.random() * availableKeys.length)];
  const src = audioTrackPath("guides", key);
  if (!src) return;

  const audio = new Audio(src);
  audio.volume = audioMasterVolume() * clampVolume(audioConfig.volumes?.companionPurr ?? 0.55);
  audioState.purr = audio;
  audioState.purringGuide = guideId;
  audioState.lastPurrByGuide[guideId] = key;
  document.querySelector(`[data-purr-guide="${guideId}"]`)?.classList.add("teamPortraitPurring");

  const finish = () => {
    if (audioState.purr !== audio) return;
    audioState.purr = null;
    audioState.purringGuide = null;
    document.querySelector(`[data-purr-guide="${guideId}"]`)?.classList.remove("teamPortraitPurring");
  };
  audio.addEventListener("ended", finish, { once: true });
  audio.addEventListener("error", finish, { once: true });
  audio.play().catch(finish);
}

function setNestedAudioValue(config, path, value) {
  const parts = path.split(".");
  let target = config;
  for (let index = 0; index < parts.length - 1; index += 1) {
    target[parts[index]] ||= {};
    target = target[parts[index]];
  }
  target[parts[parts.length - 1]] = clampVolume(value);
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

async function selectLevel(id, options = {}) {
  const entry = levelCatalog.find((item) => item.id === id) || levelCatalog[0];
  if (!entry) return false;

  if (!options.deferRender) {
    state = { screen: "loading", message: "Avontuur laden..." };
    render();
  }

  let selectedLevel;
  try {
    selectedLevel = await loadLevelDefinition(entry);
  } catch (error) {
    state = { screen: "menu", error: error.message };
    render();
    return false;
  }

  stopMovement({ invalidateIntent: true });
  ambientFlybyRuntime.stopAll();
  resetAmbientAnimalTimers();
  await prepareWalkPathEditorForLevel(selectedLevel);
  level = normalizeLevel(selectedLevel);
  preloadAmbientAnimals(level);
  ambientFlybyRuntime.prepareLevel(level);
  const adventure = adventureEntryFor(entry);
  sessionReport?.startOrVisitLevel({
    adventureId: adventure.id,
    adventureTitle: adventure.title,
    levelId: entry.id,
    levelTitle: level.title
  });
  walkNodesById = new Map(level.walkGraph.nodes.map((node) => [node.id, node]));
  state = createLevelState(level);
  if (options.startImmediately) {
    state.screen = "scene";
    emitCompanionEvent("LEVEL_ENTER");
  }
  document.title = level.title;
  preloadLevelAssets(level);
  if (!options.deferRender) render();
  return true;
}

function adventureEntryFor(entry) {
  let current = entry;
  const seen = new Set();
  while (current?.connectedFrom && !seen.has(current.id)) {
    seen.add(current.id);
    current = levelCatalog.find((item) => item.id === current.connectedFrom) || current;
  }
  return current || entry;
}

function returnToMenu() {
  stopMovement({ invalidateIntent: true });
  ambientFlybyRuntime.stopAll();
  resetAmbientAnimalTimers();
  ambientAnimalRuntime.levelId = null;
  sessionReport?.end("menu");
  level = null;
  walkNodesById = new Map();
  state = { screen: "menu" };
  document.title = "Atlas";
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
  const area = currentArea();
  return area?.name || "Avontuur";
}

function currentArea() {
  return level.areas.find((item) => state.worldX >= item.start && state.worldX <= item.end);
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
  if (!object) return "";
  const center = worldToScreen(object.center, "track");
  const size = worldDiameterToTrackSize(object.radius * 2);
  return `left:${center.x}%; top:${center.y}%; width:${size.width}%; height:${size.height}%`;
}

function objectScreenAnchor(object) {
  return worldToScreen(object.center, "viewport");
}

function warnMissingTrackedObject(target, targetKind) {
  const objectId = target?.objectId || target?.id || "(onbekend)";
  const warningKey = `${level?.id || "geen-level"}:${targetKind}:${target?.id || objectId}:${objectId}`;
  if (!missingTrackedObjectWarnings.has(warningKey)) {
    missingTrackedObjectWarnings.add(warningKey);
    console.warn(
      `[Atlas] ${level?.id || "Onbekend level"} ${targetKind} "${target?.id || "(zonder id)"}" ` +
      `verwijst naar ontbrekend interactiveObject "${objectId}". Het element wordt niet gerenderd.`
    );
  }
}

function objectViewportPoint(object) {
  const stage = document.querySelector(".stageViewport");
  const appRect = app.getBoundingClientRect();
  const stageRect = stage?.getBoundingClientRect() || appRect;
  const anchor = objectScreenAnchor(object);
  return {
    x: stageRect.left - appRect.left + (anchor.x / 100) * stageRect.width,
    y: stageRect.top - appRect.top + (anchor.y / 100) * stageRect.height
  };
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
    await requestEditorApi(editorApiUrl("editor-draft"), {
      method: "POST",
      body: JSON.stringify({
        walkPath: authoredWalkPathPoints(level),
        interactiveObjects: level.interactiveObjects,
        ambientAnimals: level.ambientAnimals || [],
        ambientFlybys: level.ambientFlybys || [],
        audioConfig
      })
    });
  } catch (error) {
    walkPathEditor.status = "Error";
    walkPathEditor.message = `Draft opslaan mislukt. ${error.message}`;
  }
}

async function applyWalkPathDraft() {
  if (!walkPathEditor.apiAvailable || walkPathEditor.busy) return;
  walkPathEditor.busy = true;
  walkPathEditor.message = "Editorwijzigingen toepassen...";
  render();

  try {
    await requestEditorApi(editorApiUrl("apply-editor"), {
      method: "POST",
      body: JSON.stringify({
        walkPath: authoredWalkPathPoints(level),
        interactiveObjects: level.interactiveObjects,
        ambientAnimals: level.ambientAnimals || [],
        ambientFlybys: level.ambientFlybys || [],
        audioConfig
      })
    });
    walkPathEditor.originalWalkPath = cloneWalkPath(authoredWalkPathPoints(level));
    walkPathEditor.originalInteractiveObjects = cloneInteractiveObjects(level.interactiveObjects);
    walkPathEditor.originalAmbientAnimals = cloneAmbientAnimals(level.ambientAnimals || []);
    walkPathEditor.originalAmbientFlybys = cloneAmbientFlybys(level.ambientFlybys || []);
    walkPathEditor.originalAudioConfig = cloneAudioConfig(audioConfig);
    walkPathEditor.status = "Applied";
    walkPathEditor.modified = false;
    walkPathEditor.message = "Opgeslagen in level.js en audio-config.js.";
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
      await requestEditorApi(editorApiUrl("editor-draft"), { method: "DELETE" });
    }
    setLevelWalkPath(walkPathEditor.originalWalkPath);
    setLevelInteractiveObjects(walkPathEditor.originalInteractiveObjects);
    setLevelAmbientAnimals(walkPathEditor.originalAmbientAnimals);
    setLevelAmbientFlybys(walkPathEditor.originalAmbientFlybys);
    setAudioConfig(walkPathEditor.originalAudioConfig);
    walkPathEditor.currentPoint = null;
    walkPathEditor.currentObject = null;
    walkPathEditor.currentAnimal = null;
    walkPathEditor.currentFlyby = null;
    walkPathEditor.status = "Reverted";
    walkPathEditor.modified = false;
    walkPathEditor.message = "Draft weggegooid. Opgeslagen punten, objecten en audio hersteld.";
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

function updateDraggedInteractiveObject(event) {
  if (!walkPathEditor.draggingObjectId || !walkPathEditor.draggingObjectMode || !level) return;
  const stage = document.querySelector("[data-world-stage]");
  if (!stage) return;

  const point = pointFromViewportEvent(event, stage);
  const nextObjects = cloneInteractiveObjects(level.interactiveObjects);
  const object = nextObjects.find((item) => item.id === walkPathEditor.draggingObjectId);
  if (!object) return;

  if (walkPathEditor.draggingObjectMode === "center") {
    object.center = {
      x: Math.round(point.x),
      y: Math.round(point.y)
    };
  } else if (walkPathEditor.draggingObjectMode === "radius") {
    object.radius = Math.max(12, Math.round(distanceBetween(object.center, point)));
  }

  walkPathEditor.currentObject = object;
  walkPathEditor.currentPoint = null;
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = `${object.id}: x ${object.center.x}, y ${object.center.y}, radius ${object.radius}`;
  setLevelInteractiveObjects(nextObjects);
  persistWalkPathDraft();
  render();
}

function pointFromFlightWorkspaceEvent(event) {
  const svg = document.querySelector("[data-flight-path-workspace] svg");
  if (!svg) return { x: 0, y: 0 };
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const transformed = point.matrixTransform(svg.getScreenCTM().inverse());
  return { x: transformed.x, y: transformed.y };
}

function updateDraggedAmbientAnimal(event) {
  if (!walkPathEditor.draggingAnimalId || !level) return;
  const stage = document.querySelector("[data-world-stage]");
  if (!stage) return;
  const point = pointFromViewportEvent(event, stage);
  const animals = cloneAmbientAnimals(level.ambientAnimals || []);
  const animal = animals.find((item) => item.id === walkPathEditor.draggingAnimalId);
  if (!animal) return;
  animal.x = Math.round(point.x);
  animal.y = Math.round(point.y);
  walkPathEditor.currentAnimal = animal;
  walkPathEditor.currentObject = null;
  walkPathEditor.currentPoint = null;
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = `${animal.id}: x ${animal.x}, y ${animal.y}, schaal ${animal.scale}`;
  setLevelAmbientAnimals(animals);
  persistWalkPathDraft();
  render();
}

function updateAmbientAnimalScale(animalId, value) {
  if (!walkPathEditor.enabled || !level) return;
  const animals = cloneAmbientAnimals(level.ambientAnimals || []);
  const animal = animals.find((item) => item.id === animalId);
  if (!animal) return;
  animal.scale = Math.max(0.05, Math.min(2, Number(value)));
  walkPathEditor.currentAnimal = animal;
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = `${animal.id}: x ${animal.x}, y ${animal.y}, schaal ${animal.scale.toFixed(2)}`;
  setLevelAmbientAnimals(animals);
  persistWalkPathDraft();
  render();
}

function updateAmbientAnimalSetting(animalId, field, value) {
  if (!walkPathEditor.enabled || !level || !["softness", "saturation", "soundVolume", "mirrorX"].includes(field)) return;
  const animals = cloneAmbientAnimals(level.ambientAnimals || []);
  const animal = animals.find((item) => item.id === animalId);
  if (!animal) return;
  if (field === "mirrorX") {
    animal.mirrorX = Boolean(value);
  } else {
    const numericValue = Number(value);
    animal[field] = field === "softness"
      ? Math.max(0, Math.min(1, numericValue))
      : field === "saturation"
        ? Math.max(0, Math.min(2, numericValue))
        : clampVolume(numericValue);
  }
  walkPathEditor.currentAnimal = animal;
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = `${animal.id}: ${field} ${animal[field]}`;
  setLevelAmbientAnimals(animals);
  persistWalkPathDraft();
  render();
}

function deleteAmbientAnimal(animalId) {
  if (!walkPathEditor.enabled || !level) return;
  setLevelAmbientAnimals((level.ambientAnimals || []).filter((animal) => animal.id !== animalId));
  walkPathEditor.currentAnimal = null;
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = `${animalId} verwijderd uit de draft.`;
  persistWalkPathDraft();
  render();
}

function markEditorModified(message) {
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = message;
  persistWalkPathDraft();
}

async function refreshAmbientAssets(shouldRender = true, levelId = level?.id) {
  if (!walkPathEditor.apiAvailable) return;
  const id = levelId;
  if (!id) return;
  walkPathEditor.assetMessage = "Assets vernieuwen...";
  if (shouldRender) render();
  try {
    const payload = await requestEditorApi(`/__dev/levels/${encodeURIComponent(id)}/ambient-assets`);
    walkPathEditor.assets = {
      images: payload.images || [],
      audio: payload.audio || []
    };
    walkPathEditor.assetMessage = `${walkPathEditor.assets.images.length} afbeeldingen, ${walkPathEditor.assets.audio.length} audiobestanden.`;
  } catch (error) {
    walkPathEditor.assetMessage = `Assets laden mislukt. ${error.message}`;
  }
  if (shouldRender) render();
}

function ambientObjectIdExists(id, ignoreId = "") {
  return [...(level.ambientAnimals || []), ...(level.ambientFlybys || [])]
    .some((item) => item.id === id && item.id !== ignoreId);
}

function uniqueAmbientId(base) {
  const stem = String(base || "ambient-copy").replace(/[^A-Za-z0-9_-]/g, "-") || "ambient-copy";
  let candidate = `${stem}-copy`;
  let number = 2;
  while (ambientObjectIdExists(candidate)) candidate = `${stem}-copy-${number++}`;
  return candidate;
}

async function frameDimensionWarning(frameA, frameB) {
  if (!frameA || !frameB) return "";
  try {
    const [a, b] = await Promise.all([assetCache.image(frameA), assetCache.image(frameB)]);
    if (a.naturalWidth !== b.naturalWidth || a.naturalHeight !== b.naturalHeight) {
      return `Waarschuwing: frames zijn ${a.naturalWidth}×${a.naturalHeight} en ${b.naturalWidth}×${b.naturalHeight}; dit kan zichtbare uitlijning geven.`;
    }
  } catch {
    return "";
  }
  return "";
}

async function addAmbientAnimalFromEditor() {
  const form = document.querySelector("[data-add-animal-form]");
  if (!form) return;
  const data = new FormData(form);
  const id = String(data.get("id") || "").trim();
  const label = String(data.get("label") || "").trim();
  const openFrame = String(data.get("openFrame") || "");
  const closedFrame = String(data.get("closedFrame") || "");
  const sound = String(data.get("sound") || "");
  if (!id || !label || !openFrame || !closedFrame) {
    walkPathEditor.message = "ID, label en beide frames zijn verplicht.";
    render();
    return;
  }
  if (ambientObjectIdExists(id)) {
    walkPathEditor.message = `ID "${id}" bestaat al.`;
    render();
    return;
  }
  try {
    await Promise.all([assetCache.image(openFrame), assetCache.image(closedFrame)]);
  } catch {
    walkPathEditor.message = "Een gekozen frame ontbreekt of is ongeldig.";
    render();
    return;
  }
  const animal = {
    id,
    label,
    type: "ambient",
    openFrame,
    closedFrame,
    sound,
    x: Math.round(level.world.width / 2),
    y: Math.round(level.world.height * 0.72),
    scale: 0.2,
    blinkMinMs: 4000,
    blinkMaxMs: 9000,
    blinkDurationMs: 100,
    doubleBlinkChance: 0.12,
    soundCooldownMs: 1500,
    softness: 0,
    saturation: 1,
    soundVolume: 0.65,
    mirrorX: false
  };
  setLevelAmbientAnimals([...(level.ambientAnimals || []), animal]);
  walkPathEditor.selectedObjectType = "animal";
  walkPathEditor.selectedObjectId = id;
  walkPathEditor.currentAnimal = animal;
  const warning = await frameDimensionWarning(openFrame, closedFrame);
  markEditorModified(`${label} toegevoegd.${warning ? ` ${warning}` : ""}`);
  render();
}

async function addAmbientFlybyFromEditor() {
  const form = document.querySelector("[data-add-flyby-form]");
  if (!form) return;
  const data = new FormData(form);
  const id = String(data.get("id") || "").trim();
  const label = String(data.get("label") || "").trim();
  const frameA = String(data.get("frameA") || "");
  const frameB = String(data.get("frameB") || "");
  const sound = String(data.get("sound") || "");
  if (!id || !label || !frameA || !frameB) {
    walkPathEditor.message = "ID, label en beide flybyframes zijn verplicht.";
    render();
    return;
  }
  if (ambientObjectIdExists(id)) {
    walkPathEditor.message = `ID "${id}" bestaat al.`;
    render();
    return;
  }
  try {
    await Promise.all([assetCache.image(frameA), assetCache.image(frameB)]);
  } catch {
    walkPathEditor.message = "Een gekozen flybyframe ontbreekt of is ongeldig.";
    render();
    return;
  }
  const flyby = {
    id,
    label,
    frameA,
    frameB,
    sound,
    path: [
      { x: -180, y: 190 },
      { x: Math.round(level.world.width / 2), y: 120 },
      { x: level.world.width + 180, y: 180 }
    ],
    scale: 0.22,
    speed: 420,
    flapFrequencyHz: 7,
    faceFlightDirection: true,
    mirrorX: false,
    intervalMinMs: 18000,
    intervalMaxMs: 35000,
    syncKey: "",
    startDelayMs: 0,
    softness: 0,
    saturation: 1,
    soundVolume: 0.65,
    rotateAlongPath: true,
    maxRotationDeg: 8
  };
  setLevelAmbientFlybys([...(level.ambientFlybys || []), flyby]);
  walkPathEditor.selectedObjectType = "flyby";
  walkPathEditor.selectedObjectId = id;
  walkPathEditor.currentFlyby = flyby;
  const warning = await frameDimensionWarning(frameA, frameB);
  markEditorModified(`${label} toegevoegd.${warning ? ` ${warning}` : ""}`);
  render();
}

function duplicateSelectedAmbient() {
  const type = walkPathEditor.selectedObjectType;
  const id = walkPathEditor.selectedObjectId;
  if (type === "animal") {
    const source = (level.ambientAnimals || []).find((item) => item.id === id);
    if (!source) return;
    const copy = cloneAmbientAnimals([source])[0];
    copy.id = uniqueAmbientId(source.id);
    copy.label = `${source.label || source.id} kopie`;
    copy.x += 32;
    copy.y += 20;
    setLevelAmbientAnimals([...(level.ambientAnimals || []), copy]);
    walkPathEditor.selectedObjectId = copy.id;
    markEditorModified(`${copy.label} gedupliceerd.`);
  } else {
    const source = (level.ambientFlybys || []).find((item) => item.id === id);
    if (!source) return;
    const copy = cloneAmbientFlybys([source])[0];
    copy.id = uniqueAmbientId(source.id);
    copy.label = `${source.label || source.id} kopie`;
    setLevelAmbientFlybys([...(level.ambientFlybys || []), copy]);
    walkPathEditor.selectedObjectId = copy.id;
    markEditorModified(`${copy.label} gedupliceerd.`);
  }
  render();
}

function deleteAmbientFlyby(id) {
  setLevelAmbientFlybys((level.ambientFlybys || []).filter((item) => item.id !== id));
  walkPathEditor.selectedObjectId = level.ambientFlybys?.[0]?.id || null;
  walkPathEditor.pathMode = false;
  markEditorModified(`${id} verwijderd uit de draft.`);
  render();
}

function updateAmbientFlybySetting(id, field, value) {
  const flybys = cloneAmbientFlybys(level.ambientFlybys || []);
  const flyby = flybys.find((item) => item.id === id);
  if (!flyby) return;
  const booleans = new Set(["faceFlightDirection", "mirrorX", "rotateAlongPath"]);
  const strings = new Set(["label", "frameA", "frameB", "sound", "syncKey"]);
  if (booleans.has(field)) flyby[field] = Boolean(value);
  else if (strings.has(field)) flyby[field] = String(value);
  else flyby[field] = Number(value);
  if (field === "intervalMinMs" && flyby.intervalMinMs > flyby.intervalMaxMs) flyby.intervalMaxMs = flyby.intervalMinMs;
  if (field === "intervalMaxMs" && flyby.intervalMaxMs < flyby.intervalMinMs) flyby.intervalMinMs = flyby.intervalMaxMs;
  if (["intervalMinMs", "intervalMaxMs"].includes(field) && String(flyby.syncKey || "").trim()) {
    flybys.forEach((member) => {
      if (member.syncKey === flyby.syncKey) member[field] = flyby[field];
    });
  }
  setLevelAmbientFlybys(flybys);
  walkPathEditor.currentFlyby = flyby;
  markEditorModified(`${flyby.id}: ${field} aangepast.`);
  render();
}

function updateFlybyPathPoint(id, index, point) {
  const flybys = cloneAmbientFlybys(level.ambientFlybys || []);
  const flyby = flybys.find((item) => item.id === id);
  if (!flyby || !flyby.path[index]) return;
  flyby.path[index] = { x: Math.round(Number(point.x)), y: Math.round(Number(point.y)) };
  setLevelAmbientFlybys(flybys);
  ambientFlybyRuntime.invalidatePath(id);
  walkPathEditor.selectedPathPoint = index;
  markEditorModified(`${flyby.id} punt ${index + 1}: ${flyby.path[index].x}, ${flyby.path[index].y}`);
  render();
}

function reverseFlybyPath(id) {
  const flybys = cloneAmbientFlybys(level.ambientFlybys || []);
  const flyby = flybys.find((item) => item.id === id);
  if (!flyby) return;
  flyby.path.reverse();
  setLevelAmbientFlybys(flybys);
  walkPathEditor.selectedPathPoint = Math.max(0, flyby.path.length - 1 - walkPathEditor.selectedPathPoint);
  markEditorModified(`${flyby.id} vliegrichting omgekeerd.`);
  render();
}

function deleteSelectedFlybyPoint(id) {
  const flybys = cloneAmbientFlybys(level.ambientFlybys || []);
  const flyby = flybys.find((item) => item.id === id);
  if (!flyby || flyby.path.length <= 2) {
    walkPathEditor.message = "Een vliegpad moet minstens 2 punten houden.";
    render();
    return;
  }
  flyby.path.splice(walkPathEditor.selectedPathPoint, 1);
  walkPathEditor.selectedPathPoint = Math.min(walkPathEditor.selectedPathPoint, flyby.path.length - 1);
  setLevelAmbientFlybys(flybys);
  markEditorModified(`${flyby.id}: punt verwijderd.`);
  render();
}

function addFlybyPointAt(id, point) {
  const flybys = cloneAmbientFlybys(level.ambientFlybys || []);
  const flyby = flybys.find((item) => item.id === id);
  if (!flyby) return;
  let insertAt = 1;
  let nearest = Infinity;
  for (let index = 0; index < flyby.path.length - 1; index += 1) {
    const projection = projectPointToSegment(point, {
      from: flyby.path[index],
      to: flyby.path[index + 1]
    });
    if (projection.distance < nearest) {
      nearest = projection.distance;
      insertAt = index + 1;
    }
  }
  flyby.path.splice(insertAt, 0, { x: Math.round(point.x), y: Math.round(point.y) });
  walkPathEditor.selectedPathPoint = insertAt;
  walkPathEditor.addingFlybyPoint = false;
  setLevelAmbientFlybys(flybys);
  markEditorModified(`${flyby.id}: punt ${insertAt + 1} toegevoegd.`);
  render();
}

function fitFlybyPath(id) {
  const flyby = (level.ambientFlybys || []).find((item) => item.id === id);
  if (!flyby) return;
  const xs = flyby.path.map((point) => point.x);
  const ys = flyby.path.map((point) => point.y);
  const margin = 100;
  const x = Math.min(...xs) - margin;
  const y = Math.min(...ys) - margin;
  walkPathEditor.pathViewBox = {
    x,
    y,
    width: Math.max(300, Math.max(...xs) - Math.min(...xs) + margin * 2),
    height: Math.max(240, Math.max(...ys) - Math.min(...ys) + margin * 2)
  };
  render();
}

function fitFlybyLevel() {
  walkPathEditor.pathViewBox = { x: 0, y: 0, width: level.world.width, height: level.world.height };
  render();
}

function updateAudioDraft(path, value) {
  if (!walkPathEditor.enabled || !path) return;

  const nextConfig = cloneAudioConfig(audioConfig);
  setNestedAudioValue(nextConfig, path, value);
  setAudioConfig(nextConfig);
  walkPathEditor.status = "Modified";
  walkPathEditor.modified = true;
  walkPathEditor.message = "Audio aangepast.";
  persistWalkPathDraft();
  render();
}

function stopMovement(options = {}) {
  if (state.movement?.rafId) {
    window.cancelAnimationFrame(state.movement.rafId);
  }
  state.movement = null;
  state.moving = false;
  if (options.invalidateIntent && Number.isInteger(state.interactionToken)) {
    state.interactionToken += 1;
    state.movementIntent = null;
  }
}

function replaceMovementIntent(intent) {
  stopMovement();
  const token = ++state.interactionToken;
  state.movementIntent = { ...intent, token };
  return token;
}

function movementIntentIsCurrent(token) {
  return state.interactionToken === token && state.movementIntent?.token === token;
}

function walkRoute(points, onArrive, intentToken = state.interactionToken) {
  stopMovement();
  state.moving = true;

  if (!points.length) {
    state.svenMood = "arrived";
    render();
    if (movementIntentIsCurrent(intentToken)) onArrive();
    return;
  }

  state.svenMood = "walking";
  state.movement = {
    points,
    index: 0,
    lastTime: 0,
    speed: 250,
    onArrive,
    intentToken,
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
        const intentToken = movement.intentToken;
        state.movement = null;
        updateWorldDom();
        if (movementIntentIsCurrent(intentToken)) onArrive();
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
  return question.answer ?? question.a * question.b;
}

function shuffleQuestions(questions) {
  const shuffled = [...questions];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
}

function selectChallengeQuestions(rune) {
  if (rune.challengeId) {
    const challenge = level.learningChallenges?.find((item) => item.id === rune.challengeId);
    return (challenge?.questions || []).map((slot) => ({
      ...slot,
      variants: [...(slot.variants || [])]
    }));
  }
  if (Array.isArray(rune.challengeIds)) {
    return rune.challengeIds
      .map((id) => level.learningChallenges?.find((challenge) => challenge.id === id))
      .filter(Boolean);
  }
  return shuffleQuestions(rune.questions).slice(0, 4);
}

function currentChallengeQuestions() {
  const questions = state.activeQuestions?.length ? state.activeQuestions : runeById(state.activeRuneId).questions;
  const current = questions?.[state.questionIndex];
  if (current?.variants) {
    const selected = current.variants[Math.floor(Math.random() * current.variants.length)];
    questions[state.questionIndex] = { ...selected, atlasSlotId: current.id };
  }
  return questions;
}

function trackCurrentSessionQuestion() {
  if (!level || state.screen !== "challenge") return;
  const rune = runeById(state.activeRuneId);
  const question = currentChallengeQuestions()?.[state.questionIndex];
  if (!rune || !question?.id) return;
  sessionReport?.beginQuestion(question, {
    levelId: level.id,
    levelTitle: level.title,
    challengeId: rune.id,
    challengeTitle: rune.name,
    slotId: question.atlasSlotId || question.id,
    variantId: question.id
  });
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
  if (!Number.isInteger(question.a)) return;
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
  if (question.answerMode === "multipleChoice") return [...question.choices];
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

function renderClockVisual(visual) {
  if (visual?.type !== "clock") return "";
  const hour = Number(visual.hour);
  const minute = Number(visual.minute);
  const minuteAngle = minute * 6;
  const hourAngle = ((hour % 12) + minute / 60) * 30;
  const numerals = Array.from({ length: 12 }, (_, index) => {
    const value = index + 1;
    const angle = (value * 30 * Math.PI) / 180;
    const x = 120 + Math.sin(angle) * 88;
    const y = 120 - Math.cos(angle) * 88;
    return `<text x="${x.toFixed(2)}" y="${y.toFixed(2)}">${value}</text>`;
  }).join("");

  return `
    <div
      class="authoredClock"
      data-clock-visual
      data-clock-hour="${hour}"
      data-clock-minute="${minute}"
      data-hour-angle="${hourAngle}"
      data-minute-angle="${minuteAngle}"
      role="img"
      aria-label="Analoge klok"
    >
      <svg viewBox="0 0 240 240" aria-hidden="true">
        <circle class="clockFace" cx="120" cy="120" r="112"></circle>
        <g class="clockNumerals">${numerals}</g>
        <line class="clockHand clockHourHand" x1="120" y1="120" x2="120" y2="64" transform="rotate(${hourAngle} 120 120)"></line>
        <line class="clockHand clockMinuteHand" x1="120" y1="120" x2="120" y2="34" transform="rotate(${minuteAngle} 120 120)"></line>
        <circle class="clockPin" cx="120" cy="120" r="7"></circle>
      </svg>
    </div>
  `;
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
  state.guidePriority = 0;
  state.companionQueue = [];
  emitCompanionEvent("LEVEL_ENTER");
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
  if (!target || state.screen !== "scene" || state.exitTransitionPending || state.sceneTransitionPending) return;
  const action = actionForTarget(target, kind);
  const interactionToken = replaceMovementIntent({
    type: "interactive",
    targetId: target.id,
    kind,
    action
  });

  state.justCompletedRuneId = null;
  walkRoute(routeTo(target), () => {
    if (!movementIntentIsCurrent(interactionToken)) return;
    arriveAtInteraction(target, kind, action, interactionToken);
  }, interactionToken);
}

function selectChallenge(target) {
  if (!target || state.screen !== "scene" || state.exitTransitionPending || state.sceneTransitionPending) return;
  state.selectedChallengeId = target.id;
  if (!state.completedRunes.has(target.id)) {
    emitCompanionEvent("HOTSPOT_ATTENTION_FIRST", {
      objectId: target.objectId || target.id,
      challengeId: target.id
    });
  }
  beginInteraction(target, "rune");
}

function inspectAmbientTarget(target) {
  if (!target || state.screen !== "scene" || state.exitTransitionPending || state.sceneTransitionPending) return;
  state.selectedChallengeId = null;
  beginInteraction(target, "hotspot");
}

function completeCurrentSceneChallenges() {
  if (!level || !["scene", "challenge", "correct"].includes(state.screen)) return;
  stopMovement({ invalidateIntent: true });
  state.completedRunes = new Set(level.runes.map((rune) => rune.id));
  state.screen = "scene";
  state.activeRuneId = null;
  state.selectedChallengeId = null;
  state.activeQuestions = [];
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.assistedCompletionAvailable = false;
  state.challengeGuideMessage = null;
  state.justCompletedRuneId = null;
  state.feedback = "";
  state.svenMood = "idle";
  emitCompanionEvent("PATH_UNLOCKED", {
    completedCount: state.completedRunes.size,
    totalCount: level.runes.length
  });
  render();
}

function arriveAtInteraction(target, kind, action, interactionToken = state.interactionToken) {
  const targetCenter = centerForTarget(target);
  if (Math.abs(targetCenter.x - state.worldX) > 2) {
    state.svenFacing = targetCenter.x < state.worldX ? "left" : "right";
  }
  state.svenMood = "arrived";
  render();

  const isCompletedExit =
    target.id === (level.exitHotspotId || "templeGate") &&
    action === "activate" &&
    state.completedRunes.size === level.runes.length;
  if (isCompletedExit) {
    finishInteraction(target, kind, action);
    return;
  }

  window.setTimeout(() => {
    if (!state.moving || !movementIntentIsCurrent(interactionToken)) return;
    state.svenMood = action === "look" ? "looking" : action === "talk" ? "talking" : "activating";
    render();

    window.setTimeout(() => {
      if (!state.moving || !movementIntentIsCurrent(interactionToken)) return;
      finishInteraction(target, kind, action);
    }, action === "activate" || action === "travel" ? 820 : 560);
  }, 180);
}

function finishInteraction(target, kind, action) {
  if (state.movementIntent?.type === "interactive") state.movementIntent = null;
  const exitHotspotId = level.exitHotspotId || "templeGate";
  const objectId = target.objectId || target.id;

  if (kind === "hotspot" && target.type === "ambient") {
    state.moving = false;
    state.svenMood = "idle";
    const firstLook = !state.seenObjects.has(objectId);
    if (firstLook) state.seenObjects.add(objectId);
    const firstAttention =
      firstLook && authoredCompanionMoments("AMBIENT_ATTENTION_FIRST", { objectId }).length > 0;
    emitCompanionEvent(firstAttention ? "AMBIENT_ATTENTION_FIRST" : "AMBIENT_ATTENTION", { objectId });
    render();
    return;
  }

  if (kind === "rune" && action === "look") {
    state.moving = false;
    state.svenMood = "idle";
    if (!state.seenObjects.has(target.objectId || target.id)) {
      state.seenObjects.add(target.objectId || target.id);
      emitCompanionEvent("OBJECT_FIRST_LOOK", {
        objectId: target.objectId || target.id,
        challengeId: target.id
      });
    } else {
      playQueuedCompanionMoment();
    }
    render();
    return;
  }

  if (kind === "rune" && action === "activate" && state.completedRunes.has(target.id)) {
    state.moving = false;
    state.svenMood = "idle";
    emitCompanionEvent("CHALLENGE_SUCCESS", {
      objectId: target.objectId || target.id,
      challengeId: target.id
    });
    render();
    return;
  }

  if (kind === "rune" && action === "activate") {
    state.moving = false;
    state.selectedChallengeId = null;
    openRuneChallenge(target.id);
    return;
  }

  if (target.id === exitHotspotId && action === "activate" && state.completedRunes.size === level.runes.length) {
    state.moving = false;
    state.svenMood = "idle";
    playSfx("unlock");
    transitionToReward(target);
    return;
  }

  if (target.id === exitHotspotId && action === "activate") {
    state.moving = false;
    state.svenMood = "idle";
    emitCompanionEvent("EXIT_BLOCKED", {
      objectId: target.objectId || target.id,
      completedCount: state.completedRunes.size,
      totalCount: level.runes.length
    });
    render();
    return;
  }

  state.moving = false;
  state.svenMood = "idle";
  if (!state.seenObjects.has(target.objectId || target.id)) {
    state.seenObjects.add(target.objectId || target.id);
    emitCompanionEvent("OBJECT_FIRST_LOOK", { objectId: target.objectId || target.id });
  } else {
    playQueuedCompanionMoment();
  }
  render();
}

function beginFreeWalk(point) {
  if (state.screen !== "scene") return;

  const interactionToken = replaceMovementIntent({ type: "ground", point: { ...point } });
  state.justCompletedRuneId = null;
  state.selectedChallengeId = null;
  walkRoute(routeToPoint(point), () => {
    if (!movementIntentIsCurrent(interactionToken)) return;
    state.moving = false;
    state.movementIntent = null;
    state.svenMood = "idle";
    playQueuedCompanionMoment();
    render();
  }, interactionToken);
}

function openRuneChallenge(id) {
  const rune = runeById(id);
  const authored = Boolean(rune.challengeId) || Array.isArray(rune.challengeIds);
  playSfx("challengeOpen");
  state.screen = "challenge";
  state.activeRuneId = id;
  state.activeQuestions = selectChallengeQuestions(rune);
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.svenMood = "activating";
  state.challengeFailureCounts[id] = 0;
  state.challengeGuideMessage = authored ? { speaker: "minnie", text: "" } : null;
  if (authored) {
    setGuideMessage(state.challengeGuideMessage, "minnie");
    state.guidePriority = 0;
  }
  emitCompanionEvent("CHALLENGE_OPEN", {
    objectId: rune.objectId,
    challengeId: rune.id
  });
  state.feedback = authored ? "" : rune.intro;
  trackCurrentSessionQuestion();
  render();
}

function answerQuestion(choice) {
  const question = currentChallengeQuestions()[state.questionIndex];
  const correct = answerFor(question);
  const authored = Boolean(question.answerMode);
  const submitted = typeof correct === "number" ? Number(choice) : String(choice).trim();
  if (submitted === "" || (typeof correct === "number" && !Number.isFinite(submitted))) {
    state.feedback = "Vul eerst een antwoord in.";
    render();
    return;
  }
  state.attempts += 1;

  const isCorrect = typeof correct === "string"
    ? submitted.localeCompare(correct, "nl", { sensitivity: "base" }) === 0
    : submitted === correct;
  sessionReport?.recordAttempt(isCorrect);
  if (!isCorrect) {
    playSfx("incorrect");
    updateTableProgress(question, "mistake");
    state.selectedWrong = true;
    state.svenMood = "thinking";
    state.challengeFailureCounts[state.activeRuneId] = (state.challengeFailureCounts[state.activeRuneId] || 0) + 1;
    const failureCount = state.challengeFailureCounts[state.activeRuneId];
    emitCompanionEvent(failureCount > 1 ? "CHALLENGE_FAIL_2" : "CHALLENGE_FAIL_1", {
      objectId: runeById(state.activeRuneId).objectId,
      challengeId: state.activeRuneId
    });
    if (authored && failureCount === 1) {
      sessionReport?.recordHint("minnie");
      setGuideMessage({ speaker: "minnie", text: question.hintMinnie }, "minnie");
      state.feedback = "";
    } else if (authored && failureCount === 2) {
      sessionReport?.recordHint("moose");
      setGuideMessage({ speaker: "moose", text: question.hintMoose }, "moose");
      state.feedback = "";
    } else if (authored) {
      state.feedback = question.explanation;
      state.assistedCompletionAvailable = true;
    } else {
      state.feedback = getLearningHint(question);
    }
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
  playSfx("correct");
  state.svenMood = "celebrating";
  state.assistedCompletionAvailable = false;
  state.feedback = authored ? `Ja! Het antwoord is ${correct}.` : `Ja! ${question.a} x ${question.b} = ${correct}.`;
  state.screen = "correct";
  render();
}

function completeQuestionWithHelp() {
  if (!state.assistedCompletionAvailable || state.screen !== "challenge") return;
  const question = currentChallengeQuestions()[state.questionIndex];
  sessionReport?.recordAssisted();
  state.answered += 1;
  state.assistedCompletionAvailable = false;
  state.svenMood = "celebrating";
  state.feedback = `${question.explanation} Het antwoord is ${answerFor(question)}.`;
  state.screen = "correct";
  playSfx("correct");
  render();
}

function nextQuestion() {
  const rune = runeById(state.activeRuneId);
  const questions = currentChallengeQuestions();

  if (state.questionIndex < questions.length - 1) {
    state.questionIndex += 1;
    state.selectedWrong = false;
    state.questionTracked = false;
    state.assistedCompletionAvailable = false;
    state.challengeFailureCounts[state.activeRuneId] = 0;
    state.svenMood = "idle";
    const next = currentChallengeQuestions()[state.questionIndex];
    if (next.answerMode) {
      if (state.challengeGuideMessage) setGuideMessage(state.challengeGuideMessage, state.challengeGuideMessage.speaker);
      state.feedback = "";
    } else {
      state.feedback = "De rune wil nog een som.";
    }
    state.screen = "challenge";
    trackCurrentSessionQuestion();
    render();
    return;
  }

  state.completedRunes.add(rune.id);
  playSfx("challengeComplete");
  state.justCompletedRuneId = rune.id;
  state.activeRuneId = null;
  state.activeQuestions = [];
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.assistedCompletionAvailable = false;
  state.svenMood = "celebrating";
  state.feedback = "";
  state.challengeGuideMessage = null;
  state.screen = "scene";

  if (state.completedRunes.size === level.runes.length) {
    emitCompanionEvent("PATH_UNLOCKED", {
      completedCount: state.completedRunes.size,
      totalCount: level.runes.length
    });
  } else {
    emitCompanionEvent("LEVEL_PROGRESS_MILESTONE", {
      objectId: rune.objectId,
      challengeId: rune.id,
      completedCount: state.completedRunes.size,
      totalCount: level.runes.length
    });
  }

  render();
}

function showReward() {
  playSfx("adventureComplete");
  emitCompanionEvent("ADVENTURE_COMPLETE");
  state.screen = "reward";
  sessionReport?.completeLevel(level.id);
  saveCompletion();
  render();
}

async function transitionToReward(target) {
  if (state.exitTransitionPending) return;
  state.exitTransitionPending = true;
  render();

  const object = interactiveObjectForTarget(target);
  const focus = objectViewportPoint(object);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const settleMs = reduceMotion ? 40 : 100;
  const fadeOutMs = reduceMotion ? 160 : 750;

  await new Promise((resolve) => window.setTimeout(resolve, settleMs));

  if (reduceMotion) {
    app.classList.add("exitReducedFadeOut");
  } else {
    const overlay = document.createElement("div");
    overlay.className = "exitIrisOverlay";
    overlay.dataset.exitTransition = target.id;
    overlay.style.setProperty("--exit-focus-x", `${focus.x}px`);
    overlay.style.setProperty("--exit-focus-y", `${focus.y}px`);
    app.append(overlay);
  }

  await new Promise((resolve) => window.setTimeout(resolve, fadeOutMs));
  showReward();
  app.classList.remove("exitReducedFadeOut");
  app.classList.add("exitRewardFadeIn");
  window.setTimeout(() => app.classList.remove("exitRewardFadeIn"), reduceMotion ? 180 : 300);
}

async function continueToNextLevel() {
  const nextLevelId = level.reward?.nextLevelId || level.nextLevelId;
  if (!nextLevelId || state.sceneTransitionPending) return;

  stopMovement({ invalidateIntent: true });
  state.sceneTransitionPending = true;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fadeOutMs = reduceMotion ? 0 : 220;
  app.classList.add("sceneChainFadeOut");

  const [loaded] = await Promise.all([
    selectLevel(nextLevelId, { startImmediately: true, deferRender: true }),
    new Promise((resolve) => window.setTimeout(resolve, fadeOutMs))
  ]);
  if (!loaded) {
    app.classList.remove("sceneChainFadeOut");
    return;
  }

  render();
  app.classList.remove("sceneChainFadeOut");
  if (!reduceMotion) {
    app.classList.add("sceneChainFadeIn");
    window.setTimeout(() => app.classList.remove("sceneChainFadeIn"), 280);
  }
}

function restart() {
  const startPoint = getPlayerStartPoint(level);
  state.screen = "intro";
  state.introIndex = 0;
  state.worldX = startPoint.x;
  state.worldY = startPoint.y;
  state.cameraX = 0;
  state.svenMood = "idle";
  state.svenFacing = "right";
  state.moving = false;
  stopMovement({ invalidateIntent: true });
  state.activeRuneId = null;
  state.selectedChallengeId = null;
  state.activeQuestions = [];
  state.questionIndex = 0;
  state.selectedWrong = false;
  state.questionTracked = false;
  state.assistedCompletionAvailable = false;
  state.completedRunes = new Set();
  state.seenObjects = new Set();
  state.challengeFailureCounts = {};
  state.challengeGuideMessage = null;
  state.companionQueue = [];
  state.guidePriority = 0;
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
    <g class="debugObject ${walkPathEditor.enabled ? "debugDraggableObject" : ""}" data-debug-object="${object.id}">
      <circle class="debugObjectRadius" cx="${object.center.x}" cy="${object.center.y}" r="${object.radius}" />
      <circle
        class="debugObjectCenter"
        cx="${object.center.x}"
        cy="${object.center.y}"
        r="8"
        ${walkPathEditor.enabled ? `data-object-drag="center" data-object-id="${object.id}"` : ""}
      />
      ${
        walkPathEditor.enabled
          ? `<circle
              class="debugObjectRadiusHandle"
              cx="${object.center.x + object.radius}"
              cy="${object.center.y}"
              r="8"
              data-object-drag="radius"
              data-object-id="${object.id}"
            />`
          : ""
      }
      <text x="${object.center.x + object.radius + 12}" y="${object.center.y + 4}">${object.id}</text>
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

function renderVolumeSlider(label, path, value, options = {}) {
  const numericValue = clampVolume(value);
  return `
    <label class="audioEditorRow">
      <span>${label}</span>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value="${numericValue}"
        data-audio-path="${path}"
      />
      <output>${numericValue.toFixed(2)}</output>
      ${
        options.sfxKey
          ? `<button type="button" class="audioTestButton" data-sfx-test="${options.sfxKey}">Test</button>`
          : ""
      }
    </label>
  `;
}

function renderAudioEditorControls() {
  const levelAudio = getLevelAudioConfig(level.id);
  const sfxRows = sfxKeys().map((key) => {
    return renderVolumeSlider(SFX_LABELS[key] || key, `volumes.sfx.${key}`, getSfxVolume(key), { sfxKey: key });
  }).join("");

  return `
    <section class="audioEditorSection" data-audio-editor>
      <strong>Audio</strong>
      ${renderVolumeSlider("Master", "volumes.master", audioConfig.volumes?.master ?? 1)}
      ${renderVolumeSlider("Companion purr volume", "volumes.companionPurr", audioConfig.volumes?.companionPurr ?? 0.55)}
      ${renderVolumeSlider("Music", `levels.${level.id}.musicVolume`, levelAudio.musicVolume ?? 0.55)}
      ${renderVolumeSlider("Ambience", `levels.${level.id}.ambienceVolume`, levelAudio.ambienceVolume ?? 0.5)}
      <div class="audioEditorSfx">
        <span>SFX</span>
        ${sfxRows}
      </div>
    </section>
  `;
}

function renderAmbientAnimalEditorControls() {
  const animals = level.ambientAnimals || [];
  if (!animals.length) return `
    <section class="animalEditorSection" data-animal-editor>
      <strong>Ambient animals</strong>
      <span>Geen dieren in deze scene.</span>
    </section>
  `;
  return `
    <section class="animalEditorSection" data-animal-editor>
      <strong>Ambient animals</strong>
      ${animals.map((animal) => `
        <div class="animalEditorCard" data-animal-editor-id="${animal.id}">
          <div><strong>${animal.id}</strong><span>${animal.type}</span></div>
          <label>
            <span>Schaal</span>
            <input type="range" min="0.05" max="1" step="0.01" value="${animal.scale}" data-animal-scale="${animal.id}" />
            <output>${Number(animal.scale).toFixed(2)}</output>
          </label>
          <label>
            <span>Softness</span>
            <input type="range" min="0" max="1" step="0.05" value="${Number(animal.softness ?? 0)}" data-animal-setting="softness" data-animal-id="${animal.id}" />
            <output>${Number(animal.softness ?? 0).toFixed(2)}px</output>
          </label>
          <label>
            <span>Saturation</span>
            <input type="range" min="0" max="1" step="0.05" value="${clampVolume(animal.saturation ?? 1)}" data-animal-setting="saturation" data-animal-id="${animal.id}" />
            <output>${Math.round(clampVolume(animal.saturation ?? 1) * 100)}%</output>
          </label>
          <label>
            <span>Animal sound volume</span>
            <input type="range" min="0" max="1" step="0.05" value="${clampVolume(animal.soundVolume ?? 1)}" data-animal-setting="soundVolume" data-animal-id="${animal.id}" />
            <output>${Math.round(clampVolume(animal.soundVolume ?? 1) * 100)}%</output>
          </label>
          <label class="animalEditorToggle">
            <input type="checkbox" data-animal-setting="mirrorX" data-animal-id="${animal.id}" ${animal.mirrorX ? "checked" : ""} />
            <span>Mirror horizontally</span>
          </label>
          <span>x ${animal.x}, y ${animal.y} · bottom-center</span>
          <div class="animalEditorActions">
            <button type="button" data-debug-action="preview-animal-blink" data-animal-id="${animal.id}">Preview blink</button>
            <button type="button" data-debug-action="preview-animal-sound" data-animal-id="${animal.id}">Preview sound</button>
            <button type="button" data-debug-action="delete-animal" data-animal-id="${animal.id}">Delete animal</button>
          </div>
        </div>
      `).join("")}
    </section>
  `;
}

function assetOptions(items, selected = "", optional = false) {
  return `${optional ? '<option value="">None</option>' : '<option value="">Choose asset</option>'}${
    items.map((path) => `<option value="${path}" ${path === selected ? "selected" : ""}>${path.split("/").at(-1)}</option>`).join("")
  }`;
}

function renderAmbientAddForm(type) {
  const flyby = type === "flyby";
  return `
    <form class="editorAddForm" data-add-${type}-form>
      <label><span>Unique ID</span><input name="id" required pattern="[A-Za-z0-9_-]+" /></label>
      <label><span>Label</span><input name="label" required /></label>
      <label><span>${flyby ? "Frame A" : "Open frame"}</span><select name="${flyby ? "frameA" : "openFrame"}">${assetOptions(walkPathEditor.assets.images || [])}</select></label>
      <label><span>${flyby ? "Frame B" : "Closed frame"}</span><select name="${flyby ? "frameB" : "closedFrame"}">${assetOptions(walkPathEditor.assets.images || [])}</select></label>
      <label><span>Sound</span><select name="sound">${assetOptions(walkPathEditor.assets.audio || [], "", true)}</select></label>
      <button type="button" data-debug-action="add-${type}">Add ${flyby ? "ambient flyby" : "ambient animal"}</button>
    </form>
  `;
}

function renderFlybyField(label, flyby, field, options = {}) {
  if (options.toggle) return `
    <label class="editorToggle"><input type="checkbox" data-flyby-setting="${field}" data-flyby-id="${flyby.id}" ${flyby[field] ? "checked" : ""}/><span>${label}</span></label>
  `;
  return `
    <label class="editorField"><span>${label}</span><input type="${options.type || "number"}"
      ${options.min !== undefined ? `min="${options.min}"` : ""} ${options.max !== undefined ? `max="${options.max}"` : ""}
      step="${options.step || "1"}" value="${options.display ? options.display(flyby[field]) : flyby[field]}"
      data-flyby-setting="${field}" data-flyby-id="${flyby.id}" data-value-scale="${options.scale || 1}"/></label>
  `;
}

function renderAmbientEditorControls() {
  const animals = level.ambientAnimals || [];
  const flybys = level.ambientFlybys || [];
  const animal = animals.find((item) => walkPathEditor.selectedObjectType === "animal" && item.id === walkPathEditor.selectedObjectId);
  const flyby = flybys.find((item) => walkPathEditor.selectedObjectType === "flyby" && item.id === walkPathEditor.selectedObjectId);
  const syncMembers = flyby?.syncKey ? flybys.filter((item) => item.syncKey === flyby.syncKey) : [];
  return `
    <div class="assetDiscoveryBar">
      <button type="button" data-debug-action="refresh-assets">Refresh assets</button>
      <span>${walkPathEditor.assetMessage || "Place shared files in assets/ambient/animals or assets/ambient/flybys."}</span>
    </div>
    <details class="editorSection" open>
      <summary>Ambient animals <span>${animals.length}</span></summary>
      <div class="editorObjectPicker">
        ${animals.map((item) => `<button type="button" aria-label="Selecteer ${item.label || item.id}" data-select-ambient-type="animal" data-select-ambient-id="${item.id}" class="${animal?.id === item.id ? "editorObjectSelected" : ""}">${item.label || item.id}</button>${animal?.id === item.id ? "" : `<input class="editorLegacyControl" type="checkbox" data-animal-setting="mirrorX" data-animal-id="${item.id}" ${item.mirrorX ? "checked" : ""}/>`}`).join("") || "<span>Geen dieren.</span>"}
      </div>
      ${animal ? `
        <div class="animalEditorCard" data-animal-editor-id="${animal.id}">
          <div><strong>${animal.id}</strong><span>${animal.label || animal.type}</span></div>
          <label><span>Schaal</span><input type="range" min="0.05" max="2" step="0.01" value="${animal.scale}" data-animal-scale="${animal.id}" /><output>${Number(animal.scale).toFixed(2)}</output></label>
          <label><span>Softness</span><input type="range" min="0" max="1" step="0.05" value="${Number(animal.softness ?? 0)}" data-animal-setting="softness" data-animal-id="${animal.id}" /><output>${Number(animal.softness ?? 0).toFixed(2)}</output></label>
          <label><span>Saturation</span><input type="range" min="0" max="2" step="0.05" value="${Number(animal.saturation ?? 1)}" data-animal-setting="saturation" data-animal-id="${animal.id}" /><output>${Number(animal.saturation ?? 1).toFixed(2)}</output></label>
          <label><span>Volume</span><input type="range" min="0" max="1" step="0.05" value="${clampVolume(animal.soundVolume ?? 1)}" data-animal-setting="soundVolume" data-animal-id="${animal.id}" /><output>${Math.round(clampVolume(animal.soundVolume ?? 1) * 100)}%</output></label>
          <label class="animalEditorToggle"><input type="checkbox" data-animal-setting="mirrorX" data-animal-id="${animal.id}" ${animal.mirrorX ? "checked" : ""}/><span>Mirror horizontally</span></label>
          <span>x ${animal.x}, y ${animal.y} · bottom-center</span>
          <div class="animalEditorActions">
            <button type="button" data-debug-action="preview-animal-blink" data-animal-id="${animal.id}">Preview blink</button>
            <button type="button" data-debug-action="preview-animal-sound" data-animal-id="${animal.id}">Preview sound</button>
            <button type="button" data-debug-action="duplicate-selected">Duplicate selected</button>
            <button type="button" data-debug-action="delete-animal" data-animal-id="${animal.id}">Delete</button>
          </div>
        </div>` : ""}
      <details class="editorNestedSection"><summary>Add ambient animal</summary>${renderAmbientAddForm("animal")}</details>
    </details>
    <details class="editorSection" open>
      <summary>Ambient flybys <span>${flybys.length}</span></summary>
      <div class="editorObjectPicker">
        ${flybys.map((item) => `<button type="button" aria-label="Selecteer ${item.label || item.id}" data-select-ambient-type="flyby" data-select-ambient-id="${item.id}" class="${flyby?.id === item.id ? "editorObjectSelected" : ""}">${item.label || item.id}</button>`).join("") || "<span>Geen flybys.</span>"}
      </div>
      ${flyby ? `
        <div class="flybyEditorCard" data-flyby-editor-id="${flyby.id}">
          <div class="editorCommonControls"><strong>${flyby.label}</strong><span>${flyby.id}</span>
            ${renderFlybyField("Scale", flyby, "scale", { min: 0.02, max: 2, step: 0.01 })}
            ${renderFlybyField("Speed px/s", flyby, "speed", { min: 20, max: 2000, step: 10 })}
            <div class="animalEditorActions">
              <button type="button" data-debug-action="edit-flight-path" data-flyby-id="${flyby.id}">Edit flight path</button>
              <button type="button" data-debug-action="preview-flyby" data-flyby-id="${flyby.id}">Preview flyby</button>
              <button type="button" data-debug-action="duplicate-selected">Duplicate selected</button>
              <button type="button" data-debug-action="delete-flyby" data-flyby-id="${flyby.id}">Delete</button>
            </div>
          </div>
          <details class="editorNestedSection" open><summary>Assets</summary>
            <label class="editorField"><span>Frame A</span><select data-flyby-setting="frameA" data-flyby-id="${flyby.id}">${assetOptions(walkPathEditor.assets.images || [], flyby.frameA)}</select></label>
            <label class="editorField"><span>Frame B</span><select data-flyby-setting="frameB" data-flyby-id="${flyby.id}">${assetOptions(walkPathEditor.assets.images || [], flyby.frameB)}</select></label>
          </details>
          <details class="editorNestedSection"><summary>Animation</summary>
            ${renderFlybyField("Flap Hz", flyby, "flapFrequencyHz", { min: 0, max: 20, step: 0.5 })}
            ${renderFlybyField("Face flight direction", flyby, "faceFlightDirection", { toggle: true })}
            ${renderFlybyField("Manual mirror", flyby, "mirrorX", { toggle: true })}
            ${renderFlybyField("Rotate along path", flyby, "rotateAlongPath", { toggle: true })}
            ${renderFlybyField("Max rotation", flyby, "maxRotationDeg", { min: 0, max: 45 })}
          </details>
          <details class="editorNestedSection"><summary>Timing</summary>
            ${renderFlybyField("Minimum interval (s)", flyby, "intervalMinMs", { min: 5, max: 120, display: (v) => Number(v) / 1000, scale: 1000 })}
            ${renderFlybyField("Maximum interval (s)", flyby, "intervalMaxMs", { min: 5, max: 120, display: (v) => Number(v) / 1000, scale: 1000 })}
            <label class="editorField"><span>Sync ID</span><input list="flyby-sync-keys" value="${flyby.syncKey || ""}" data-flyby-setting="syncKey" data-flyby-id="${flyby.id}"/></label>
            <datalist id="flyby-sync-keys">${[...new Set(flybys.map((item) => item.syncKey).filter(Boolean))].map((key) => `<option value="${key}"></option>`).join("")}</datalist>
            ${renderFlybyField("Start delay (ms)", flyby, "startDelayMs", { min: 0, max: 10000, step: 50 })}
            ${syncMembers.length > 1 ? `<p>Shared with: ${syncMembers.map((item) => item.label || item.id).join(", ")}</p><button type="button" data-debug-action="preview-sync-flybys" data-sync-key="${flyby.syncKey}">Preview synchronized flybys</button>` : ""}
          </details>
          <details class="editorNestedSection"><summary>Audio</summary>
            <label class="editorField"><span>Sound</span><select data-flyby-setting="sound" data-flyby-id="${flyby.id}">${assetOptions(walkPathEditor.assets.audio || [], flyby.sound, true)}</select></label>
            ${renderFlybyField("Sound volume", flyby, "soundVolume", { min: 0, max: 1, step: 0.05 })}
          </details>
          <details class="editorNestedSection"><summary>Advanced</summary>
            ${renderFlybyField("Softness", flyby, "softness", { min: 0, max: 8, step: 0.25 })}
            ${renderFlybyField("Saturation", flyby, "saturation", { min: 0, max: 2, step: 0.05 })}
          </details>
        </div>` : ""}
      <details class="editorNestedSection"><summary>Add ambient flyby</summary>${renderAmbientAddForm("flyby")}</details>
    </details>
  `;
}

function renderDeveloperToolsPanel() {
  if (!debugOverlayEnabled || state.screen === "menu" || state.screen === "loading" || !level) return "";
  if (walkPathEditor.pathMode) return "";

  if (!EDITOR_DEV_MODE) {
    return `
      <aside class="walkPathEditorPanel" data-developer-tools>
        <strong>Developer Tools</strong>
        <span class="developerToolMode">Current Mode: Runtime</span>
        <span class="developerToolUnavailable">Level Editing: Unavailable</span>
        <span>To enable Level Editing:</span>
        <ol>
          <li>Run npm run dev:editor</li>
          <li>Open http://127.0.0.1:4173/?dev=editor</li>
          <li>Start the level you want to edit</li>
          <li>Press Ctrl + Shift + D</li>
        </ol>
        <span class="developerToolReadOnly">Status: Read-only mode</span>
      </aside>
    `;
  }

  const point = walkPathEditor.currentPoint;
  const object = walkPathEditor.currentObject;
  const animal = walkPathEditor.currentAnimal;
  const serverDisabled = !walkPathEditor.apiAvailable || walkPathEditor.busy ? "disabled" : "";
  const statusClass = `walkPathStatus${walkPathEditor.status}`;

  return `
    <aside class="walkPathEditorPanel" data-developer-tools>
      <strong>Developer Tools</strong>
      <span class="developerToolMode">Current Mode: Level Editing</span>
      <span class="${statusClass}">Draft Status: ${walkPathEditor.status}</span>
      <span>How to use:</span>
      <ol>
        <li>Drag walkPath points</li>
        <li>Drag object centers or radius handles</li>
        <li>Drag animals; adjust their shared scale</li>
        <li>Preview animal blink or sound</li>
        <li>Adjust audio volumes</li>
        <li>Test movement</li>
        <li>Apply saves level and audio files</li>
        <li>Revert restores the saved path, objects and audio</li>
      </ol>
      <p>Real files change only when Apply is pressed.</p>
      <span>${
        animal
          ? `${animal.id}: ${animal.x}, ${animal.y}, schaal ${Number(animal.scale).toFixed(2)}`
          : object
          ? `${object.id}: ${object.center.x}, ${object.center.y}, radius ${object.radius}`
          : point
            ? `${point.id}: ${point.x}, ${point.y}`
            : "Drag a path point or object."
      }</span>
      ${renderAmbientEditorControls()}
      <details class="editorSection" open><summary>Audio</summary>${renderAudioEditorControls()}</details>
      <div class="walkPathEditorActions">
        <button type="button" data-debug-action="apply-walkpath" ${serverDisabled}>Apply</button>
        <button type="button" data-debug-action="revert-walkpath" ${walkPathEditor.busy ? "disabled" : ""}>Revert</button>
      </div>
      <p>${walkPathEditor.message}</p>
    </aside>
  `;
}

function renderFlightPathWorkspace() {
  if (!walkPathEditor.pathMode) return "";
  const flyby = (level.ambientFlybys || []).find((item) => item.id === walkPathEditor.selectedObjectId);
  if (!flyby) return "";
  const view = walkPathEditor.pathViewBox || {
    x: -250,
    y: -200,
    width: level.world.width + 500,
    height: level.world.height + 300
  };
  const cache = window.AtlasAmbientSystem.buildPathCache(flyby.path);
  const route = cache.samples.map((point) => `${point.x},${point.y}`).join(" ");
  return `
    <div class="flybyPathWorkspace" data-flight-path-workspace data-flyby-id="${flyby.id}">
      <svg viewBox="${view.x} ${view.y} ${view.width} ${view.height}" preserveAspectRatio="xMidYMid meet" data-flight-path-background>
        <rect class="flybyWorkspaceMargin" x="${view.x}" y="${view.y}" width="${view.width}" height="${view.height}"></rect>
        <rect class="flybyLevelBoundary" x="0" y="0" width="${level.world.width}" height="${level.world.height}"></rect>
        <image href="${level.world.background}" x="0" y="0" width="${level.world.width}" height="${level.world.height}" opacity=".42" pointer-events="none"></image>
        <polyline class="flybyPathCurve" points="${route}"></polyline>
        ${flyby.path.map((point, index) => `
          <g class="flybyPathPoint ${index === walkPathEditor.selectedPathPoint ? "flybyPathPointSelected" : ""}"
            data-flyby-point="${index}" data-flyby-id="${flyby.id}" transform="translate(${point.x} ${point.y})">
            <circle r="${index === 0 || index === flyby.path.length - 1 ? 15 : 12}"></circle>
            <text x="19" y="-16">${index === 0 ? "Start" : index === flyby.path.length - 1 ? "End" : index + 1}</text>
          </g>
        `).join("")}
      </svg>
      <div class="flybyPathToolbar">
        <strong>Edit flight path · ${flyby.label}</strong>
        <button type="button" data-debug-action="add-flight-point" class="${walkPathEditor.addingFlybyPoint ? "editorObjectSelected" : ""}">Add point</button>
        <button type="button" data-debug-action="delete-flight-point">Delete selected point</button>
        <button type="button" data-debug-action="reverse-flight-path">Reverse path</button>
        <button type="button" data-debug-action="preview-flyby" data-flyby-id="${flyby.id}">Preview flyby</button>
        <button type="button" data-debug-action="fit-flight-path">Fit flight path</button>
        <button type="button" data-debug-action="fit-flight-level">Fit level</button>
        <button type="button" data-debug-action="done-flight-path">Done</button>
        <label>X <input type="number" data-flight-point-coordinate="x" value="${flyby.path[walkPathEditor.selectedPathPoint]?.x ?? 0}"/></label>
        <label>Y <input type="number" data-flight-point-coordinate="y" value="${flyby.path[walkPathEditor.selectedPathPoint]?.y ?? 0}"/></label>
      </div>
    </div>
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
        ${(level.ambientAnimals || []).map(renderAmbientAnimal).join("")}
        ${(level.ambientFlybys || []).map(renderAmbientFlyby).join("")}
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
      ${renderFlightPathWorkspace()}
      ${renderDeveloperToolsPanel()}
    </section>
  `;
}

function renderAmbientFlyby(flyby) {
  const ready = ambientFlybyRuntime.readiness.get(`${level.id}:${flyby.id}`);
  return `
    <span class="ambientFlyby" data-ambient-flyby="${flyby.id}" data-active="false" data-frame="a"
      data-ready="${Boolean(ready?.ready)}" data-object-id="${flyby.id}"
      style="--flyby-softness:${Math.max(0, Number(flyby.softness || 0))}px; --flyby-saturation:${Math.max(0, Number(flyby.saturation ?? 1))}">
      <span class="ambientFlybyFrames">
        <img class="ambientFlybyFrame ambientFlybyFrameA" src="${flyby.frameA}" alt="" draggable="false" decoding="sync"/>
        <img class="ambientFlybyFrame ambientFlybyFrameB" src="${flyby.frameB}" alt="" draggable="false" decoding="sync"/>
      </span>
    </span>
  `;
}

function ambientAnimalTrackStyle(animal) {
  const width = (512 * animal.scale / level.world.width) * 100;
  const height = (512 * animal.scale / level.world.height) * 100;
  const softness = Math.max(0, Math.min(1, Number(animal.softness ?? 0)));
  const saturation = Math.max(0, Number(animal.saturation ?? 1));
  const mirror = animal.mirrorX ? -1 : 1;
  return `left:${(animal.x / level.world.width) * 100}%; top:${(animal.y / level.world.height) * 100}%; width:${width}%; height:${height}%; --animal-softness:${softness}px; --animal-saturation:${saturation}; --animal-mirror:${mirror};`;
}

function renderAmbientAnimal(animal) {
  const ready = ambientAnimalRuntime.loaded.has(`${level.id}:${animal.id}`);
  const runtime = animalRuntimeState(animal);
  return `
    <button
      class="ambientAnimal ${debugOverlayEnabled && walkPathEditor.enabled ? "ambientAnimalEditable" : ""}"
      style="${ambientAnimalTrackStyle(animal)}"
      type="button"
      data-ambient-animal="${animal.id}"
      data-animal-type="${animal.type}"
      data-frame="${runtime.frame}"
      data-ready="${ready}"
      data-world-x="${animal.x}"
      data-world-y="${animal.y}"
      data-scale="${animal.scale}"
      data-softness="${Number(animal.softness ?? 0)}"
      data-saturation="${Number(animal.saturation ?? 1)}"
      data-sound-volume="${clampVolume(animal.soundVolume ?? 1)}"
      data-mirror-x="${Boolean(animal.mirrorX)}"
      data-anchor="bottom-center"
      aria-label="${animal.label || "Dier"}"
    >
      <span class="ambientAnimalFrames" ${debugOverlayEnabled && walkPathEditor.enabled ? `data-animal-drag="${animal.id}"` : ""}>
        <img class="ambientAnimalFrame ambientAnimalOpen" src="${animal.openFrame}" alt="" draggable="false" decoding="sync" />
        <img class="ambientAnimalFrame ambientAnimalClosed" src="${animal.closedFrame}" alt="" draggable="false" decoding="sync" />
      </span>
      ${debugOverlayEnabled && walkPathEditor.enabled ? `<span class="ambientAnimalAnchor" aria-hidden="true"></span>` : ""}
    </button>
  `;
}

function isTargetVisible(target) {
  return true;
}

function renderHotspot(hotspot) {
  const disabled = state.screen !== "scene" || state.exitTransitionPending || state.sceneTransitionPending;
  const object = interactiveObjectForTarget(hotspot);
  if (!object) {
    warnMissingTrackedObject(hotspot, "hotspot");
    return "";
  }
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
  const selected = state.selectedChallengeId === rune.id;
  const disabled = state.screen !== "scene" || state.exitTransitionPending || state.sceneTransitionPending;
  const object = interactiveObjectForTarget(rune);
  if (!object) {
    warnMissingTrackedObject(rune, "rune");
    return "";
  }
  return `
    <button
      class="runeHotspot ${done ? "runeDone" : ""} ${selected ? "runeSelected" : ""} ${justCompleted ? "runeJustCompleted" : ""}"
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
  const gate = hotspotById(level.exitHotspotId || "templeGate");
  if (!gate) return false;
  return distanceBetween({ x: state.worldX, y: state.worldY }, getApproachPoint(gate)) < 180;
}

function renderDialogue() {
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
    </section>
  `;
}

function guideEntries(activeSpeaker = "minnie") {
  const guides = level.guides || {};
  return [
    ["minnie", guides.minnie || { name: "Minnie", portrait: "assets/guides/minnie.png" }],
    ["moose", guides.moose || { name: "Moose", portrait: "assets/guides/moose.png" }]
  ];
}

function renderGuidePortrait([id, guide], activeSpeaker) {
  const active = id === activeSpeaker;
  return `
    <figure
      class="teamPortrait ${active ? "teamPortraitActive" : "teamPortraitInactive"} ${audioState.purringGuide === id ? "teamPortraitPurring" : ""}"
      data-guide="${id}"
      data-purr-guide="${id}"
      data-active="${active}"
      role="button"
      tabindex="0"
      aria-label="${guide.name} laten spinnen"
      ${active ? 'aria-current="true"' : ""}
    >
      <img src="${guideBlinkRuntime[id]?.frame === "closed" && guideBlinkRuntime[id]?.ready ? GUIDE_BLINK_PATHS[id] : guide.portrait}"
        data-guide-image="${id}" data-open-src="${guide.portrait}" alt="${guide.name}" />
      <figcaption>${guide.name}</figcaption>
    </figure>
  `;
}

function renderAdventureTeamBar() {
  const done = state.completedRunes.size;
  const guideMessage = state.guideMessage || normalizeGuideMessage(state.message, "minnie");
  const activeGuide = (level.guides || {})[guideMessage.speaker] || { name: "Minnie" };
  return `
    <section class="adventureTeamBar" data-adventure-team-bar data-active-speaker="${guideMessage.speaker}" aria-live="polite">
      <div class="teamPortraits" aria-label="Avonturenteam">
        ${guideEntries(guideMessage.speaker).map((entry) => renderGuidePortrait(entry, guideMessage.speaker)).join("")}
      </div>
      <div class="teamSpeech">
        <p class="teamSpeaker">${activeGuide.name}</p>
        <p class="teamMessage">${guideMessage.text}</p>
        <p class="teamMeta"><span data-area-name>${getAreaName()}</span> - ${done}/${level.runes.length} ${level.progressLabelPlural || "runen"}</p>
      </div>
    </section>
  `;
}

function renderScene(options = {}) {
  return `
    <main class="gameShell ${debugOverlayEnabled ? "debugOverlayActive" : ""}">
      ${renderReturnToMenuButton()}
      ${renderWorldStage()}
      ${options.hideTeamBar ? "" : renderAdventureTeamBar()}
    </main>
  `;
}

function renderLaunch() {
  return `
    <main class="launchScreen">
      <img class="launchBackdrop" src="assets/branding/launch-hero.png" alt="" />
      <section class="launchPanel">
        <p class="eyebrow">Welkom</p>
        <h1>Atlas</h1>
        <p>Wat ga je vandaag ontdekken?</p>
        <button class="primaryButton" type="button" data-action="launch-enter">Start avontuur</button>
      </section>
    </main>
  `;
}

function renderMenu() {
  const menuLevels = visibleLevelCatalog();
  return `
    <main class="menuScreen">
      <button class="progressMenuButton" type="button" data-action="progress">Voortgang</button>
      <section class="menuHeader">
        <h1>Kies een avontuur</h1>
        <p>Wat ga je vandaag ontdekken?</p>
      </section>
      <section class="levelGrid" aria-label="Beschikbare avonturen">
        ${state.error ? `<p class="menuError">${state.error}</p>` : ""}
        ${
          menuLevels.length
            ? menuLevels.map(renderLevelTile).join("")
            : `<p class="emptyMenu">Er zijn nog geen avonturen gevonden.</p>`
        }
      </section>
    </main>
  `;
}

function formatSessionDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.round(Number(milliseconds || 0) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return minutes ? `${minutes} min ${seconds.toString().padStart(2, "0")} sec` : `${seconds} sec`;
}

function sessionSummary(session) {
  const completedQuestions = session.questions.filter((question) => question.completedAt);
  const direct = completedQuestions.filter((question) => question.outcome === "direct").length;
  return {
    completedQuestions,
    direct,
    firstTryPercentage: completedQuestions.length ? Math.round((direct / completedQuestions.length) * 100) : 0,
    completedLevels: session.levels.filter((entry) => entry.completedAt).length,
    attempts: session.questions.reduce((sum, question) => sum + question.attempts, 0)
  };
}

function renderOutcomeSplit(summary) {
  return [
    ["direct", "Direct goed"],
    ["afterMinnie", "Na Minnie"],
    ["afterMoose", "Na Moose"],
    ["assisted", "Samen afgerond"]
  ].map(([outcome, label]) => `
    <div class="sessionOutcome">
      <strong>${summary.completedQuestions.filter((question) => question.outcome === outcome).length}</strong>
      <span>${label}</span>
    </div>
  `).join("");
}

function renderCategoryDetails(session) {
  return ["Tafels", "Delen", "Verhaalsommen", "Klokkijken"].map((category) => {
    const questions = session.questions.filter((question) => question.completedAt && question.category === category);
    const details = new Map();
    questions.forEach((question) => details.set(question.detail, (details.get(question.detail) || 0) + 1));
    return `
      <details class="sessionCategory">
        <summary><span>${category}</span><strong>${questions.length}</strong></summary>
        ${
          questions.length
            ? `<ul>${[...details.entries()].map(([detail, count]) => `<li><span>${detail}</span><strong>${count}</strong></li>`).join("")}</ul>`
            : `<p>Nog geen afgeronde vragen.</p>`
        }
      </details>
    `;
  }).join("");
}

function renderHelpNeeded(session) {
  const questions = session.questions.filter((question) =>
    question.completedAt &&
    (!question.firstTryCorrect || question.minnieHint || question.mooseHint || question.assisted)
  );
  if (!questions.length) return `<p class="sessionEmptyNote">Deze keer was nergens extra hulp nodig.</p>`;
  return `
    <ul class="sessionHelpList">
      ${questions.map((question) => `
        <li>
          <div><strong>${question.challengeTitle}</strong><span>${question.prompt}</span></div>
          <span>${question.outcome === "assisted" ? "Samen afgerond" : question.mooseHint ? "Na Moose" : "Na Minnie"}</span>
        </li>
      `).join("")}
    </ul>
  `;
}

function renderSessionCard(session, index) {
  const summary = sessionSummary(session);
  const ended = new Intl.DateTimeFormat("nl-NL", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(session.endedAt));
  return `
    <article class="sessionReportCard" data-session-id="${session.id}">
      <header class="sessionReportHeader">
        <div>
          <p class="eyebrow">${index === 0 ? "Nieuwste sessie" : "Eerdere sessie"} · ${ended}</p>
          <h2>${session.adventureTitle}</h2>
        </div>
        <span class="sessionStatus">Nog te controleren</span>
      </header>
      <section class="sessionHeroStats" aria-label="Sessiesamenvatting">
        <div><strong>${formatSessionDuration(session.activeMs)}</strong><span>Actieve tijd</span></div>
        <div><strong>${formatSessionDuration(session.elapsedMs)}</strong><span>Verstreken tijd</span></div>
        <div><strong>${summary.completedLevels}/${session.levels.length}</strong><span>Plekken afgerond</span></div>
        <div><strong>${summary.completedQuestions.length}</strong><span>Vragen · ${summary.attempts} pogingen</span></div>
        <div><strong>${summary.firstTryPercentage}%</strong><span>Direct goed</span></div>
      </section>
      <section class="sessionSection">
        <h3>Uitkomst</h3>
        <div class="sessionOutcomeGrid">${renderOutcomeSplit(summary)}</div>
      </section>
      <section class="sessionSection">
        <h3>Leergebieden</h3>
        <div class="sessionCategoryGrid">${renderCategoryDetails(session)}</div>
      </section>
      <section class="sessionSection">
        <h3>Hier was wat hulp nodig</h3>
        ${renderHelpNeeded(session)}
      </section>
      <footer class="sessionCardActions">
        <button class="dangerButton" type="button" data-delete-session="${session.id}">Gecontroleerd en wissen</button>
      </footer>
    </article>
  `;
}

function renderProgress() {
  const sessions = sessionReport?.getSessions() || [];
  return `
    <main class="progressScreen">
      <header class="progressHeader">
        <div>
          <p class="eyebrow">Atlas Session Report v0.1</p>
          <h1>Voortgang</h1>
          <p>Een lokaal overzicht van de laatste avontuursessies.</p>
        </div>
        <button class="secondaryButton" type="button" data-action="menu">Terug naar menu</button>
      </header>
      <section class="sessionReports" aria-label="Sessierapporten">
        ${
          sessions.length
            ? sessions.map(renderSessionCard).join("")
            : `<div class="emptySessionReport">
                <p class="eyebrow">Nog rustig hier</p>
                <h2>Nog geen sessies om te bekijken</h2>
                <p>Na een avontuur verschijnt hier een compact overzicht.</p>
              </div>`
        }
      </section>
    </main>
  `;
}

function renderLoading() {
  return `
    <main class="menuScreen loadingScreen">
      <section class="menuHeader">
        <p class="eyebrow">Atlas</p>
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
      <img class="introBackdrop" src="${level.world.background}" alt="${level.title}" />
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
  const questions = currentChallengeQuestions();
  const question = questions[state.questionIndex];
  const choices = makeChoices(question);
  const authored = Boolean(question.answerMode);
  const number = state.questionIndex + 1;
  const total = questions.length;
  const object = interactiveObjectForTarget(rune);
  const anchor = objectScreenAnchor(object);
  const panelClass = anchor.x < 52 ? "runePanelRight" : "runePanelLeft";
  const challengeCharacter = getChallengeCharacter();
  const challengeLabel = level.challengeLabel || "Rune";
  return `
    ${renderScene({ hideTeamBar: !authored })}
    <section
      class="modalLayer runeLayer ${panelClass} ${authored ? "authoredChallengeLayer" : ""}"
      style="--rune-screen-x:${anchor.x}%; --rune-screen-y:${anchor.y}%; --rune-radius:${object.radius}px"
      role="dialog"
      aria-modal="true"
      aria-labelledby="challenge-title"
    >
      <div class="runeFocusSpark" aria-hidden="true"></div>
      <div class="challengeBox runeChallengeBox ${question.visual?.type === "clock" ? "clockChallengeBox" : ""}">
        <div class="challengeHeader" data-challenge-character="${challengeCharacter.id}">
          <img class="challengeCharacterPortrait" src="${challengeCharacter.portrait}" alt="${challengeCharacter.name}" />
          <div class="challengeCharacterSpeech">
            <p class="eyebrow">${
              authored
                ? challengeCharacter.name
                : `${challengeCharacter.name} - ${challengeLabel} ${number}/${total}`
            }</p>
            <h2 id="challenge-title">${rune.name}</h2>
          </div>
        </div>
        <p class="sum ${authored && question.presentation === "story" ? "storyPrompt" : ""}">
          ${authored ? question.prompt : `Hoeveel is ${question.a} x ${question.b}?`}
        </p>
        ${renderClockVisual(question.visual)}
        ${
          question.answerMode === "open"
            ? `<form class="openAnswerForm" data-open-answer-form>
                <label for="open-answer">Jouw antwoord</label>
                <div class="openAnswerControls">
                  <input id="open-answer" name="answer" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" data-open-answer />
                  <button class="primaryButton" type="submit">Controleer</button>
                </div>
              </form>`
            : `<div class="choices">
                ${choices.map((choice) => `<button class="answerStone" type="button" data-choice="${choice}">${choice}</button>`).join("")}
              </div>`
        }
        ${authored && state.feedback ? `<p class="feedback challengeFeedback" aria-live="polite">${state.feedback}</p>` : ""}
        ${
          state.assistedCompletionAvailable
            ? `<button class="secondaryButton assistedCompletionButton" type="button" data-action="assisted-complete">Samen afronden</button>`
            : ""
        }
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

function renderCorrect() {
  const rune = runeById(state.activeRuneId);
  const lastQuestion = state.questionIndex === currentChallengeQuestions().length - 1;
  const object = interactiveObjectForTarget(rune);
  const anchor = objectScreenAnchor(object);
  const panelClass = anchor.x < 52 ? "runePanelRight" : "runePanelLeft";

  return `
    ${renderScene({ hideTeamBar: true })}
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
          ${lastQuestion ? level.challengeCompleteLabel || "Maak de rune wakker" : level.nextQuestionLabel || "Volgende som"}
        </button>
      </div>
    </section>
  `;
}

function renderReward() {
  const nextLevelId = level.reward?.nextLevelId || level.nextLevelId;
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
        ${
          nextLevelId
            ? `<button class="primaryButton" type="button" data-action="next-level">${level.reward.nextLabel || "Verder"}</button>`
            : `<button class="primaryButton" type="button" data-action="menu">Menu</button>`
        }
        <button class="secondaryButton" type="button" data-action="${nextLevelId ? "menu" : "restart"}">${nextLevelId ? "Menu" : "Speel nog een keer"}</button>
      </section>
    </main>
  `;
}

function renderTransition() {
  return `
    <main class="transitionScreen" aria-live="polite">
      <div class="transitionMist"></div>
      <section class="transitionPanel">
        <p class="eyebrow">Atlas</p>
        <h1>${state.message || "Even verder..."}</h1>
      </section>
    </main>
  `;
}

function render() {
  const editorScrollTop = document.querySelector("[data-developer-tools]")?.scrollTop || 0;
  app.dataset.screen = state.screen;
  if (state.screen === "launch") {
    app.innerHTML = renderLaunch();
  } else if (state.screen === "menu") {
    app.innerHTML = renderMenu();
  } else if (state.screen === "progress") {
    app.innerHTML = renderProgress();
  } else if (state.screen === "loading") {
    app.innerHTML = renderLoading();
  } else if (state.screen === "transition") {
    app.innerHTML = renderTransition();
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
  syncAudioForState();
  syncAmbientAnimalTimers();
  syncGuideBlinkTimers();
  ambientFlybyRuntime.sync();
  const editorPanel = document.querySelector("[data-developer-tools]");
  if (editorPanel) editorPanel.scrollTop = editorScrollTop;
}

app.addEventListener("click", (event) => {
  ensureAudioUnlocked();
  const ambientSelector = event.target.closest("[data-select-ambient-type]");
  if (ambientSelector) {
    event.preventDefault();
    event.stopPropagation();
    walkPathEditor.selectedObjectType = ambientSelector.dataset.selectAmbientType;
    walkPathEditor.selectedObjectId = ambientSelector.dataset.selectAmbientId;
    render();
    return;
  }
  const flightPoint = event.target.closest("[data-flyby-point]");
  if (flightPoint) {
    event.preventDefault();
    event.stopPropagation();
    walkPathEditor.selectedPathPoint = Number(flightPoint.dataset.flybyPoint);
    render();
    return;
  }
  const flightBackground = event.target.closest("[data-flight-path-background]");
  if (flightBackground && walkPathEditor.addingFlybyPoint) {
    event.preventDefault();
    event.stopPropagation();
    addFlybyPointAt(walkPathEditor.selectedObjectId, pointFromFlightWorkspaceEvent(event));
    return;
  }
  if (event.target.closest("[data-flight-path-workspace]") && !event.target.closest("[data-debug-action], input, label")) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  const markerTarget = event.target.closest("[data-hotspot], [data-rune]");
  const underlyingAnimal = markerTarget && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)
    ? document.elementsFromPoint(event.clientX, event.clientY)
      .find((element) => element !== markerTarget && element.closest?.("[data-ambient-animal]"))
      ?.closest("[data-ambient-animal]")
    : null;
  const animalTarget = event.target.closest("[data-ambient-animal]") || underlyingAnimal;
  if (animalTarget) {
    event.preventDefault();
    event.stopPropagation();
    const animal = level?.ambientAnimals?.find((item) => item.id === animalTarget.dataset.ambientAnimal);
    if (animal) playAmbientAnimalSound(animal);
    return;
  }
  if (event.target.closest("[data-walkpath-index]") || event.target.closest("[data-object-drag]")) {
    event.preventDefault();
    return;
  }

  const sfxTestTarget = event.target.closest("[data-sfx-test]");
  if (sfxTestTarget) {
    event.preventDefault();
    playSfx(sfxTestTarget.dataset.sfxTest);
    return;
  }

  const debugActionTarget = event.target.closest("[data-debug-action]");
  if (debugActionTarget) {
    event.preventDefault();
    playSfx("uiClick");
    const action = debugActionTarget.dataset.debugAction;
    if (action === "apply-walkpath") applyWalkPathDraft();
    if (action === "revert-walkpath") revertWalkPathDraft();
    if (action === "preview-animal-blink") {
      const animal = level?.ambientAnimals?.find((item) => item.id === debugActionTarget.dataset.animalId);
      if (animal) runAmbientAnimalBlink(animal, { doubleBlink: false });
    }
    if (action === "preview-animal-sound") {
      const animal = level?.ambientAnimals?.find((item) => item.id === debugActionTarget.dataset.animalId);
      if (animal) playAmbientAnimalSound(animal);
    }
    if (action === "delete-animal") deleteAmbientAnimal(debugActionTarget.dataset.animalId);
    if (action === "refresh-assets") refreshAmbientAssets();
    if (action === "add-animal") addAmbientAnimalFromEditor();
    if (action === "add-flyby") addAmbientFlybyFromEditor();
    if (action === "duplicate-selected") duplicateSelectedAmbient();
    if (action === "delete-flyby") deleteAmbientFlyby(debugActionTarget.dataset.flybyId);
    if (action === "preview-flyby") ambientFlybyRuntime.preview(debugActionTarget.dataset.flybyId);
    if (action === "preview-sync-flybys") ambientFlybyRuntime.previewSync(debugActionTarget.dataset.syncKey);
    if (action === "edit-flight-path") {
      walkPathEditor.selectedObjectType = "flyby";
      walkPathEditor.selectedObjectId = debugActionTarget.dataset.flybyId;
      walkPathEditor.pathMode = true;
      walkPathEditor.pathViewBox = null;
      walkPathEditor.selectedPathPoint = 0;
      render();
    }
    if (action === "add-flight-point") {
      walkPathEditor.addingFlybyPoint = !walkPathEditor.addingFlybyPoint;
      render();
    }
    if (action === "delete-flight-point") deleteSelectedFlybyPoint(walkPathEditor.selectedObjectId);
    if (action === "reverse-flight-path") reverseFlybyPath(walkPathEditor.selectedObjectId);
    if (action === "fit-flight-path") fitFlybyPath(walkPathEditor.selectedObjectId);
    if (action === "fit-flight-level") fitFlybyLevel();
    if (action === "done-flight-path") {
      walkPathEditor.pathMode = false;
      walkPathEditor.addingFlybyPoint = false;
      render();
    }
    return;
  }

  const purrTarget = event.target.closest("[data-purr-guide]");
  if (purrTarget) {
    event.preventDefault();
    event.stopPropagation();
    playGuidePurr(purrTarget.dataset.purrGuide);
    return;
  }

  if (event.target.closest("[data-developer-tools]")) {
    return;
  }

  const levelTarget = event.target.closest("[data-level]");
  if (levelTarget) {
    playSfx("uiClick");
    selectLevel(levelTarget.dataset.level);
    return;
  }

  const deleteSessionTarget = event.target.closest("[data-delete-session]");
  if (deleteSessionTarget) {
    const confirmed = window.confirm("Deze gecontroleerde sessie definitief wissen?");
    if (confirmed) {
      sessionReport?.deleteSession(deleteSessionTarget.dataset.deleteSession);
      render();
    }
    return;
  }

  const actionTarget = event.target.closest("[data-action]");
  if (actionTarget) {
    playSfx("uiClick");
    const action = actionTarget.dataset.action;
    if (action === "launch-enter") {
      state = { screen: "menu" };
      render();
      return;
    }
    if (action === "progress") {
      state = { screen: "progress" };
      render();
      return;
    }
    if (action === "intro-next") continueIntro();
    if (action === "companion-next") advanceCompanionDialogue();
    if (action === "menu") returnToMenu();
    if (action === "next-question") nextQuestion();
    if (action === "assisted-complete") completeQuestionWithHelp();
    if (action === "reward") showReward();
    if (action === "next-level") continueToNextLevel();
    if (action === "restart") restart();
    return;
  }

  const hotspotTarget = event.target.closest("[data-hotspot]");
  if (hotspotTarget) {
    playSfx("uiClick");
    const target = hotspotById(hotspotTarget.dataset.hotspot);
    if (target.type === "ambient") {
      inspectAmbientTarget(target);
    } else {
      state.selectedChallengeId = null;
      beginInteraction(target, "hotspot");
    }
    return;
  }

  const runeTarget = event.target.closest("[data-rune]");
  if (runeTarget) {
    playSfx("uiClick");
    selectChallenge(runeById(runeTarget.dataset.rune));
    return;
  }

  const choiceTarget = event.target.closest("[data-choice]");
  if (choiceTarget) {
    answerQuestion(choiceTarget.dataset.choice);
    return;
  }

  const stageTarget = event.target.closest("[data-world-stage]");
  if (stageTarget) {
    beginFreeWalk(pointFromViewportEvent(event, stageTarget));
  }
});

app.addEventListener("input", (event) => {
  const animalSetting = event.target.closest("[data-animal-setting]");
  if (animalSetting) {
    if (animalSetting.dataset.animalSetting === "mirrorX") return;
    updateAmbientAnimalSetting(
      animalSetting.dataset.animalId,
      animalSetting.dataset.animalSetting,
      animalSetting.value
    );
    return;
  }
  const animalScale = event.target.closest("[data-animal-scale]");
  if (animalScale) {
    updateAmbientAnimalScale(animalScale.dataset.animalScale, animalScale.value);
    return;
  }
  const input = event.target.closest("[data-audio-path]");
  if (input) {
    updateAudioDraft(input.dataset.audioPath, input.value);
    return;
  }
});

app.addEventListener("change", (event) => {
  const coordinate = event.target.closest("[data-flight-point-coordinate]");
  if (coordinate) {
    const flyby = (level.ambientFlybys || []).find((item) => item.id === walkPathEditor.selectedObjectId);
    const point = { ...flyby.path[walkPathEditor.selectedPathPoint] };
    point[coordinate.dataset.flightPointCoordinate] = Number(coordinate.value);
    updateFlybyPathPoint(flyby.id, walkPathEditor.selectedPathPoint, point);
    return;
  }
  const flybySetting = event.target.closest("[data-flyby-setting]");
  if (flybySetting) {
    const value = flybySetting.type === "checkbox"
      ? flybySetting.checked
      : Number(flybySetting.dataset.valueScale || 1) !== 1
        ? Number(flybySetting.value) * Number(flybySetting.dataset.valueScale)
        : flybySetting.value;
    updateAmbientFlybySetting(flybySetting.dataset.flybyId, flybySetting.dataset.flybySetting, value);
    return;
  }
  const animalSetting = event.target.closest("[data-animal-setting='mirrorX']");
  if (!animalSetting) return;
  updateAmbientAnimalSetting(animalSetting.dataset.animalId, "mirrorX", animalSetting.checked);
});

app.addEventListener("pointerdown", (event) => {
  ensureAudioUnlocked();
  const flybyPoint = event.target.closest("[data-flyby-point]");
  if (flybyPoint && walkPathEditor.pathMode) {
    event.preventDefault();
    event.stopPropagation();
    walkPathEditor.draggingFlybyPoint = Number(flybyPoint.dataset.flybyPoint);
    walkPathEditor.selectedPathPoint = walkPathEditor.draggingFlybyPoint;
    return;
  }
  const flightWorkspace = event.target.closest("[data-flight-path-workspace]");
  if (flightWorkspace && walkPathEditor.pathMode && !walkPathEditor.addingFlybyPoint) {
    event.preventDefault();
    event.stopPropagation();
    const svg = flightWorkspace.querySelector("svg");
    const view = walkPathEditor.pathViewBox || {
      x: -250, y: -200, width: level.world.width + 500, height: level.world.height + 300
    };
    walkPathEditor.pathPan = {
      clientX: event.clientX,
      clientY: event.clientY,
      view: { ...view },
      width: svg.clientWidth,
      height: svg.clientHeight
    };
    return;
  }
  const pointerMarker = event.target.closest("[data-hotspot], [data-rune]");
  const underlyingAnimalDrag = pointerMarker && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)
    ? document.elementsFromPoint(event.clientX, event.clientY)
      .find((element) => element.closest?.("[data-animal-drag]"))
      ?.closest("[data-animal-drag]")
    : null;
  const animalTarget = event.target.closest("[data-animal-drag]") || underlyingAnimalDrag;
  if (animalTarget && walkPathEditor.enabled && debugOverlayEnabled) {
    event.preventDefault();
    event.stopPropagation();
    walkPathEditor.draggingAnimalId = animalTarget.dataset.animalDrag;
    walkPathEditor.draggingObjectId = null;
    walkPathEditor.draggingIndex = null;
    updateDraggedAmbientAnimal(event);
    return;
  }
  const objectTarget = event.target.closest("[data-object-drag]");
  if (objectTarget && walkPathEditor.enabled && debugOverlayEnabled) {
    event.preventDefault();
    walkPathEditor.draggingObjectId = objectTarget.dataset.objectId;
    walkPathEditor.draggingObjectMode = objectTarget.dataset.objectDrag;
    walkPathEditor.draggingAnimalId = null;
    walkPathEditor.draggingIndex = null;
    updateDraggedInteractiveObject(event);
    return;
  }

  const pointTarget = event.target.closest("[data-walkpath-index]");
  if (!pointTarget || !walkPathEditor.enabled || !debugOverlayEnabled) return;
  event.preventDefault();
  walkPathEditor.draggingIndex = Number(pointTarget.dataset.walkpathIndex);
  walkPathEditor.draggingAnimalId = null;
  walkPathEditor.draggingObjectId = null;
  walkPathEditor.draggingObjectMode = null;
  updateDraggedWalkPathPoint(event);
});

window.addEventListener("pointermove", (event) => {
  if (walkPathEditor.pathPan) {
    event.preventDefault();
    const pan = walkPathEditor.pathPan;
    walkPathEditor.pathViewBox = {
      ...pan.view,
      x: pan.view.x - (event.clientX - pan.clientX) * pan.view.width / Math.max(1, pan.width),
      y: pan.view.y - (event.clientY - pan.clientY) * pan.view.height / Math.max(1, pan.height)
    };
    const svg = document.querySelector("[data-flight-path-workspace] svg");
    const view = walkPathEditor.pathViewBox;
    svg?.setAttribute("viewBox", `${view.x} ${view.y} ${view.width} ${view.height}`);
    return;
  }
  if (walkPathEditor.draggingFlybyPoint !== null && walkPathEditor.draggingFlybyPoint !== undefined) {
    event.preventDefault();
    updateFlybyPathPoint(
      walkPathEditor.selectedObjectId,
      walkPathEditor.draggingFlybyPoint,
      pointFromFlightWorkspaceEvent(event)
    );
    return;
  }
  if (walkPathEditor.draggingAnimalId) {
    event.preventDefault();
    updateDraggedAmbientAnimal(event);
    return;
  }
  if (walkPathEditor.draggingObjectId) {
    event.preventDefault();
    updateDraggedInteractiveObject(event);
    return;
  }

  if (walkPathEditor.draggingIndex === null) return;
  event.preventDefault();
  updateDraggedWalkPathPoint(event);
});

window.addEventListener("pointerup", () => {
  walkPathEditor.draggingIndex = null;
  walkPathEditor.draggingObjectId = null;
  walkPathEditor.draggingObjectMode = null;
  walkPathEditor.draggingAnimalId = null;
  walkPathEditor.draggingFlybyPoint = null;
  walkPathEditor.pathPan = null;
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    pauseAmbientAnimalTimers();
    ambientFlybyRuntime.stopAll();
    Object.values(guideBlinkRuntime).forEach(clearGuideBlinkState);
  } else {
    syncAmbientAnimalTimers();
    syncGuideBlinkTimers();
    ambientFlybyRuntime.sync();
  }
});

window.addEventListener("resize", updateWorldDom);

window.addEventListener("keydown", (event) => {
  ensureAudioUnlocked();
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "l") {
    event.preventDefault();
    sessionReport?.discard();
    completeCurrentSceneChallenges();
    return;
  }
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "d") {
    event.preventDefault();
    debugOverlayEnabled = !debugOverlayEnabled;
    if (level && ["scene", "challenge", "correct"].includes(state.screen)) {
      render();
    }
  }
});

app.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-open-answer-form]");
  if (!form) return;
  event.preventDefault();
  answerQuestion(form.querySelector("[data-open-answer]")?.value ?? "");
});

preloadActorAnimations();
preloadMenuAssets();
preloadGuideBlinkAssets();
registerServiceWorker();
render();
