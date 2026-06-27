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
const originalAudioTracks = cloneAudioConfig(window.SVEN_AUDIO_CONFIG?.tracks || {});
const audioState = {
  unlocked: false,
  music: null,
  ambience: null,
  currentMusicKey: null,
  currentAmbienceKey: null,
  sfx: new Map(),
  purr: null,
  purringGuide: null,
  lastPurrByGuide: {},
  purrPulseTimer: null
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
const sceneEffectRuntime = window.AtlasSceneEffects.createRuntime({
  getLevel: () => level,
  getScreen: () => state.screen,
  warn: (message) => console.warn(message)
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
  busy: false,
  panelCollapsed: false,
  audioDirty: false
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

function editorValuesEqual(left, right) {
  return JSON.stringify(left ?? null) === JSON.stringify(right ?? null);
}

function persistedAudioConfigFrom(config) {
  const current = cloneAudioConfig(config || {});
  return {
    tracks: cloneAudioConfig(originalAudioTracks || current.tracks || {}),
    menu: cloneAudioConfig(current.menu || {}),
    levels: cloneAudioConfig(current.levels || {}),
    volumes: cloneAudioConfig(current.volumes || {})
  };
}

function persistedAudioConfig() {
  return persistedAudioConfigFrom(audioConfig);
}

function persistedLevelEditorPayload() {
  const payload = {};
  const currentWalkPath = authoredWalkPathPoints(level);
  const currentInteractiveObjects = cloneInteractiveObjects(level.interactiveObjects || []);
  const currentAmbientAnimals = cloneAmbientAnimals(level.ambientAnimals || []);
  const currentAmbientFlybys = cloneAmbientFlybys(level.ambientFlybys || []);
  const currentSceneEffects = cloneSceneEffects(level.sceneEffects || []);
  const currentSceneEffectGroups = cloneSceneEffectGroups(level.sceneEffectGroups || []);
  const currentAudioConfig = persistedAudioConfig();
  const originalAudioConfig = persistedAudioConfigFrom(walkPathEditor?.originalAudioConfig || {});

  if (!editorValuesEqual(currentWalkPath, walkPathEditor?.originalWalkPath || [])) payload.walkPath = currentWalkPath;
  if (!editorValuesEqual(currentInteractiveObjects, walkPathEditor?.originalInteractiveObjects || [])) payload.interactiveObjects = currentInteractiveObjects;
  if (!editorValuesEqual(currentAmbientAnimals, walkPathEditor?.originalAmbientAnimals || [])) payload.ambientAnimals = currentAmbientAnimals;
  if (!editorValuesEqual(currentAmbientFlybys, walkPathEditor?.originalAmbientFlybys || [])) payload.ambientFlybys = currentAmbientFlybys;
  if (
    !editorValuesEqual(currentSceneEffects, walkPathEditor?.originalSceneEffects || []) ||
    !editorValuesEqual(currentSceneEffectGroups, walkPathEditor?.originalSceneEffectGroups || [])
  ) {
    payload.sceneEffects = currentSceneEffects;
    payload.sceneEffectGroups = currentSceneEffectGroups;
  }
  if (walkPathEditor?.audioDirty && !editorValuesEqual(currentAudioConfig, originalAudioConfig)) payload.audioConfig = currentAudioConfig;
  return payload;
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

function cloneSceneEffects(effects) {
  return window.AtlasSceneEffects.clone(effects || []);
}

function cloneSceneEffectGroups(groups) {
  return window.AtlasSceneEffects.clone(groups || []);
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

function setLevelSceneEffects(effects, groups = level.sceneEffectGroups || []) {
  level.sceneEffects = cloneSceneEffects(effects);
  level.sceneEffectGroups = cloneSceneEffectGroups(groups);
  sceneEffectRuntime.prepareLevel(level);
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
    originalSceneEffects: cloneSceneEffects(selectedLevel.sceneEffects || []),
    originalSceneEffectGroups: cloneSceneEffectGroups(selectedLevel.sceneEffectGroups || []),
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
    editorMode: "objects",
    selectedEffectId: selectedLevel.sceneEffects?.[0]?.id || null,
    effectGeometryMode: false,
    effectEditScope: "source",
    selectedEffectVertex: null,
    selectedCutoutIndex: null,
    effectTool: "select",
    effectLinkedMaskMovement: false,
    effectPolygonDraft: null,
    effectViewBox: null,
    effectPan: null,
    effectDrag: null,
    showEffectGuides: true,
    effectVisibility: "all",
    assets: { images: [], audio: [], animals: [], flybys: [], warnings: [] },
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
    busy: false,
    panelCollapsed: false,
    audioDirty: false
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
    if (Array.isArray(draft.sceneEffects)) {
      selectedLevel.sceneEffects = cloneSceneEffects(draft.sceneEffects);
      if (!walkPathEditor.selectedEffectId) {
        walkPathEditor.selectedEffectId = selectedLevel.sceneEffects[0]?.id || null;
      }
    }
    if (Array.isArray(draft.sceneEffectGroups)) {
      selectedLevel.sceneEffectGroups = cloneSceneEffectGroups(draft.sceneEffectGroups);
    }
    if (draft.audioConfig) {
      setAudioConfig(draft.audioConfig);
    }
    if (Array.isArray(draft.walkPath) || Array.isArray(draft.interactiveObjects) || Array.isArray(draft.ambientAnimals) || Array.isArray(draft.ambientFlybys) || Array.isArray(draft.sceneEffects) || Array.isArray(draft.sceneEffectGroups) || draft.audioConfig) {
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

function interruptGuideBlink(guideId) {
  const runtime = guideBlinkRuntime[guideId];
  if (!runtime) return;
  clearGuideBlinkState(runtime);
  setGuideBlinkFrame(guideId, "open");
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
  interruptGuideBlink(guideId);

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
  const portrait = document.querySelector(`[data-purr-guide="${guideId}"]`);
  portrait?.classList.remove("teamPortraitPurring");
  portrait?.getBoundingClientRect();
  portrait?.classList.add("teamPortraitPurring");
  window.clearTimeout(audioState.purrPulseTimer);
  audioState.purrPulseTimer = window.setTimeout(() => {
    document.querySelector(`[data-purr-guide="${guideId}"]`)?.classList.remove("teamPortraitPurring");
    audioState.purrPulseTimer = null;
    scheduleGuideBlink(guideId);
  }, 680);

  const finish = () => {
    if (audioState.purr !== audio) return;
    window.clearTimeout(audioState.purrPulseTimer);
    audioState.purrPulseTimer = null;
    audioState.purr = null;
    audioState.purringGuide = null;
    document.querySelector(`[data-purr-guide="${guideId}"]`)?.classList.remove("teamPortraitPurring");
    scheduleGuideBlink(guideId);
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
  sceneEffectRuntime.dispose();
  resetAmbientAnimalTimers();
  await prepareWalkPathEditorForLevel(selectedLevel);
  level = normalizeLevel(selectedLevel);
  preloadAmbientAnimals(level);
  ambientFlybyRuntime.prepareLevel(level);
  sceneEffectRuntime.prepareLevel(level);
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
  sceneEffectRuntime.dispose();
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
    const payload = persistedLevelEditorPayload();
    if (!Object.keys(payload).length) {
      await requestEditorApi(editorApiUrl("editor-draft"), { method: "DELETE" });
      return;
    }
    await requestEditorApi(editorApiUrl("editor-draft"), {
      method: "POST",
      body: JSON.stringify(payload)
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
    const payload = persistedLevelEditorPayload();
    if (!Object.keys(payload).length) {
      await requestEditorApi(editorApiUrl("editor-draft"), { method: "DELETE" });
      walkPathEditor.status = "Applied";
      walkPathEditor.modified = false;
      walkPathEditor.message = "Geen wijzigingen om toe te passen.";
      return;
    }
    await requestEditorApi(editorApiUrl("apply-editor"), {
      method: "POST",
      body: JSON.stringify(payload)
    });
    walkPathEditor.originalWalkPath = cloneWalkPath(authoredWalkPathPoints(level));
    walkPathEditor.originalInteractiveObjects = cloneInteractiveObjects(level.interactiveObjects);
    walkPathEditor.originalAmbientAnimals = cloneAmbientAnimals(level.ambientAnimals || []);
    walkPathEditor.originalAmbientFlybys = cloneAmbientFlybys(level.ambientFlybys || []);
    walkPathEditor.originalSceneEffects = cloneSceneEffects(level.sceneEffects || []);
    walkPathEditor.originalSceneEffectGroups = cloneSceneEffectGroups(level.sceneEffectGroups || []);
    walkPathEditor.originalAudioConfig = cloneAudioConfig(audioConfig);
    walkPathEditor.audioDirty = false;
    walkPathEditor.status = "Applied";
    walkPathEditor.modified = false;
    walkPathEditor.message = "Editorwijzigingen opgeslagen.";
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
    setLevelSceneEffects(walkPathEditor.originalSceneEffects, walkPathEditor.originalSceneEffectGroups);
    setAudioConfig(walkPathEditor.originalAudioConfig);
    walkPathEditor.audioDirty = false;
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
      audio: payload.audio || [],
      animals: payload.animals || [],
      flybys: payload.flybys || [],
      warnings: payload.warnings || []
    };
    const completeSets = walkPathEditor.assets.animals.length + walkPathEditor.assets.flybys.length;
    const warningCount = walkPathEditor.assets.warnings.length;
    walkPathEditor.assetMessage = `${walkPathEditor.assets.images.length} afbeeldingen, ${walkPathEditor.assets.audio.length} audiobestanden, ${completeSets} complete sets${warningCount ? `, ${warningCount} waarschuwingen` : ""}.`;
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
  const assetSet = discoveredAssetSetByKey("animal", String(data.get("assetSet") || ""));
  const openFrame = String(data.get("openFrame") || assetSet?.openFrame || "");
  const closedFrame = String(data.get("closedFrame") || assetSet?.closedFrame || "");
  const sound = String(data.get("sound") || assetSet?.sound || "");
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
  const assetSet = discoveredAssetSetByKey("flyby", String(data.get("assetSet") || ""));
  const frameA = String(data.get("frameA") || assetSet?.frameA || "");
  const frameB = String(data.get("frameB") || assetSet?.frameB || "");
  const sound = String(data.get("sound") || assetSet?.sound || "");
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
    maxRotationDeg: 8,
    motionProfile: "smooth",
    wobble: 14,
    speedVariation: 0.14,
    flutterFrequency: 2.1
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
  const strings = new Set(["label", "frameA", "frameB", "sound", "syncKey", "motionProfile"]);
  if (booleans.has(field)) flyby[field] = Boolean(value);
  else if (field === "motionProfile") flyby[field] = String(value) === "organic" ? "organic" : "smooth";
  else if (strings.has(field)) flyby[field] = String(value);
  else flyby[field] = Number(value);
  if (field === "wobble") flyby.wobble = Math.max(0, Number(flyby.wobble) || 0);
  if (field === "speedVariation") flyby.speedVariation = Math.max(0, Math.min(0.45, Number(flyby.speedVariation) || 0));
  if (field === "flutterFrequency") flyby.flutterFrequency = Math.max(0.1, Number(flyby.flutterFrequency) || 2.1);
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
  walkPathEditor.audioDirty = true;
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

function discoveredAssetSets(type) {
  const key = type === "flyby" ? "flybys" : "animals";
  return walkPathEditor.assets[key] || [];
}

function discoveredAssetSetByKey(type, key) {
  return discoveredAssetSets(type).find((set) => set.key === key) || null;
}

function renderAssetSetOptions(type) {
  const sets = discoveredAssetSets(type);
  return `<option value="">Manual frames</option>${sets.map((set) => (
    `<option value="${set.key}">${set.label || set.key}${set.sound ? " + sound" : ""}</option>`
  )).join("")}`;
}

function renderAssetWarnings() {
  const warnings = walkPathEditor.assets.warnings || [];
  if (!warnings.length) return "";
  return `<ul class="assetWarningList">${warnings.map((warning) => `<li>${warning}</li>`).join("")}</ul>`;
}

function renderAmbientAddForm(type) {
  const flyby = type === "flyby";
  const imagePrefix = flyby ? "assets/ambient/flybys/" : "assets/ambient/animals/";
  const audioPrefix = imagePrefix;
  const images = (walkPathEditor.assets.images || []).filter((path) => path.startsWith(imagePrefix));
  const audio = (walkPathEditor.assets.audio || []).filter((path) => path.startsWith(audioPrefix));
  return `
    <form class="editorAddForm" data-add-${type}-form>
      <label><span>Unique ID</span><input name="id" required pattern="[A-Za-z0-9_-]+" /></label>
      <label><span>Label</span><input name="label" required /></label>
      <label><span>Discovered set</span><select name="assetSet">${renderAssetSetOptions(type)}</select></label>
      <label><span>${flyby ? "Frame A" : "Open frame"}</span><select name="${flyby ? "frameA" : "openFrame"}">${assetOptions(images)}</select></label>
      <label><span>${flyby ? "Frame B" : "Closed frame"}</span><select name="${flyby ? "frameB" : "closedFrame"}">${assetOptions(images)}</select></label>
      <label><span>Sound</span><select name="sound">${assetOptions(audio, "", true)}</select></label>
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

function renderFlybyMotionProfile(flyby) {
  const profile = String(flyby.motionProfile || "smooth");
  return `
    <label class="editorField"><span>Motion profile</span><select data-flyby-setting="motionProfile" data-flyby-id="${flyby.id}">
      <option value="smooth" ${profile === "smooth" ? "selected" : ""}>Smooth</option>
      <option value="organic" ${profile === "organic" ? "selected" : ""}>Organic</option>
    </select></label>
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
    ${renderAssetWarnings()}
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
          <details class="editorNestedSection" open><summary>Animation</summary>
            ${renderFlybyMotionProfile(flyby)}
            ${renderFlybyField("Wobble", flyby, "wobble", { min: 0, max: 80, step: 1, display: (v) => Number(v ?? 14) })}
            ${renderFlybyField("Speed variation", flyby, "speedVariation", { min: 0, max: 0.45, step: 0.01, display: (v) => Number(v ?? 0.14) })}
            ${renderFlybyField("Flutter frequency", flyby, "flutterFrequency", { min: 0.1, max: 8, step: 0.1, display: (v) => Number(v ?? 2.1) })}
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

function selectedSceneEffect() {
  return (level.sceneEffects || []).find((effect) => effect.id === walkPathEditor.selectedEffectId) || null;
}

function sceneEffectPreset(effect = selectedSceneEffect()) {
  return window.AtlasSceneEffects.presetById(effect?.presetId);
}

function uniqueSceneEffectId(base) {
  const stem = String(base || "scene-effect").replace(/[^A-Za-z0-9_-]/g, "-") || "scene-effect";
  const ids = new Set((level.sceneEffects || []).map((effect) => effect.id));
  if (!ids.has(stem)) return stem;
  let index = 2;
  while (ids.has(`${stem}-${index}`)) index += 1;
  return `${stem}-${index}`;
}

function commitSceneEffects(message, options = {}) {
  sceneEffectRuntime.prepareLevel(level);
  markEditorModified(message);
  if (options.render !== false) render();
}

function addSceneEffect(presetId, variantId) {
  const instance = window.AtlasSceneEffects.defaultInstance(
    presetId,
    variantId,
    level.world,
    (level.sceneEffects || []).length
  );
  if (!instance) return;
  instance.id = uniqueSceneEffectId(instance.id);
  level.sceneEffects = [...(level.sceneEffects || []), instance];
  walkPathEditor.selectedEffectId = instance.id;
  walkPathEditor.editorMode = "effects";
  walkPathEditor.effectEditScope = "source";
  walkPathEditor.selectedEffectVertex = null;
  walkPathEditor.effectPolygonDraft = null;
  commitSceneEffects(`${instance.label} toegevoegd.`);
}

function duplicateSceneEffect() {
  const source = selectedSceneEffect();
  if (!source) return;
  const copy = cloneSceneEffects([source])[0];
  copy.id = uniqueSceneEffectId(`${source.id}-copy`);
  copy.label = `${source.label || source.id} copy`;
  const geometry = copy.geometry;
  if (Number.isFinite(geometry.x)) geometry.x += 24;
  if (Number.isFinite(geometry.y)) geometry.y += 18;
  (geometry.points || []).forEach((point) => { point.x += 24; point.y += 18; });
  (geometry.cutouts || []).flat().forEach((point) => { point.x += 24; point.y += 18; });
  if (copy.mask) translateEffectMask(copy.mask, 24, 18);
  level.sceneEffects.push(copy);
  walkPathEditor.selectedEffectId = copy.id;
  commitSceneEffects(`${copy.label} duplicated.`);
}

function deleteSceneEffect() {
  const selected = selectedSceneEffect();
  if (!selected) return;
  level.sceneEffects = (level.sceneEffects || []).filter((effect) => effect.id !== selected.id);
  walkPathEditor.selectedEffectId = level.sceneEffects[0]?.id || null;
  commitSceneEffects(`${selected.label || selected.id} deleted.`);
}

function copySceneEffect() {
  const selected = selectedSceneEffect();
  if (!selected) return;
  walkPathEditor.effectClipboard = cloneSceneEffects([selected])[0];
  walkPathEditor.message = `${selected.label || selected.id} copied.`;
  render();
}

function pasteSceneEffect() {
  if (!walkPathEditor.effectClipboard) return;
  const copy = cloneSceneEffects([walkPathEditor.effectClipboard])[0];
  copy.id = uniqueSceneEffectId(`${copy.id}-copy`);
  copy.label = `${copy.label || copy.id} copy`;
  if (Number.isFinite(copy.geometry?.x)) copy.geometry.x += 24;
  if (Number.isFinite(copy.geometry?.y)) copy.geometry.y += 18;
  (copy.geometry?.points || []).forEach((point) => { point.x += 24; point.y += 18; });
  (copy.geometry?.cutouts || []).flat().forEach((point) => { point.x += 24; point.y += 18; });
  if (copy.mask) translateEffectMask(copy.mask, 24, 18);
  level.sceneEffects ||= [];
  level.sceneEffects.push(copy);
  walkPathEditor.selectedEffectId = copy.id;
  commitSceneEffects(`${copy.label} pasted.`);
}

function updateSceneEffectField(field, value) {
  const effect = selectedSceneEffect();
  if (!effect) return;
  if (field === "geometryType") {
    convertSceneEffectGeometry(effect, String(value));
  } else if (["label", "variantId", "layerSlot", "groupId", "qualityTier"].includes(field)) effect[field] = String(value);
  else if (field === "enabled") effect.enabled = Boolean(value);
  else if (field === "seed") effect.seed = Math.max(0, Math.min(2147483647, Math.round(Number(value))));
  commitSceneEffects(`${effect.label || effect.id}: ${field} updated.`);
}

function convertSceneEffectGeometry(effect, type) {
  const preset = sceneEffectPreset(effect);
  if (!preset?.geometryTypes.includes(type) || effect.geometry.type === type) return;
  const center = effectGeometryCenter(effect.geometry);
  const bounds = window.AtlasSceneEffects.geometryBounds(effect.geometry);
  const width = Math.max(80, bounds.width || 220);
  const height = Math.max(60, bounds.height || 140);
  if (type === "point") effect.geometry = { type, x: Math.round(center.x), y: Math.round(center.y) };
  if (type === "pointRadius") effect.geometry = { type, x: Math.round(center.x), y: Math.round(center.y), radius: Math.round(Math.max(width, height) / 2) };
  if (type === "rectangle" || type === "ellipse") effect.geometry = { type, x: Math.round(center.x), y: Math.round(center.y), width: Math.round(width), height: Math.round(height) };
  if (type === "polygon") effect.geometry = {
    type,
    points: [
      { x: Math.round(center.x - width / 2), y: Math.round(center.y - height / 2) },
      { x: Math.round(center.x + width / 2), y: Math.round(center.y - height / 2) },
      { x: Math.round(center.x + width / 2), y: Math.round(center.y + height / 2) },
      { x: Math.round(center.x - width / 2), y: Math.round(center.y + height / 2) }
    ],
    cutouts: []
  };
  if (type === "directionalEmitter") effect.geometry = { type, x: Math.round(center.x), y: Math.round(center.y), directionDeg: -90, spreadDeg: 18, width: 24 };
  if (type === "directionalBeam") effect.geometry = { type, x: Math.round(center.x), y: Math.round(center.y), directionDeg: 45, length: Math.round(Math.max(180, width)), startWidth: 45, endWidth: Math.round(Math.max(120, height)) };
}

function updateSceneEffectOverride(field, value) {
  const effect = selectedSceneEffect();
  const preset = sceneEffectPreset(effect);
  if (!effect || !preset) return;
  effect.overrides ||= {};
  if (/Color$/.test(field)) {
    if (!/^#[0-9A-F]{6}$/i.test(String(value))) return;
    effect.overrides[field] = String(value).toUpperCase();
  } else {
    const definition = window.AtlasSceneEffects.CONTROL_DEFS[field];
    const number = Number(value);
    if (!Number.isFinite(number)) return;
    effect.overrides[field] = definition ? Math.max(definition.min, Math.min(definition.max, number)) : number;
  }
  commitSceneEffects(`${effect.label || effect.id}: ${field} override updated.`);
}

function resetSceneEffectField(field) {
  const effect = selectedSceneEffect();
  if (!effect) return;
  delete effect.overrides?.[field];
  commitSceneEffects(`${effect.label || effect.id}: ${field} reset.`);
}

function resetSceneEffectSection(section) {
  const effect = selectedSceneEffect();
  const preset = sceneEffectPreset(effect);
  if (!effect || !preset) return;
  for (const field of preset.controls) {
    if (window.AtlasSceneEffects.CONTROL_DEFS[field]?.section === section) delete effect.overrides?.[field];
  }
  if (section === "quick") delete effect.overrides?.primaryColor;
  if (section === "advanced") {
    delete effect.overrides?.secondaryColor;
    delete effect.overrides?.glowColor;
    delete effect.overrides?.tintColor;
    delete effect.overrides?.blendMode;
  }
  commitSceneEffects(`${effect.label || effect.id}: ${section} reset.`);
}

function resetSceneEffect() {
  const effect = selectedSceneEffect();
  if (!effect) return;
  effect.overrides = {};
  effect.layerSlot = sceneEffectPreset(effect)?.layerSlot || "worldAtmosphere";
  commitSceneEffects(`${effect.label || effect.id} reset to preset.`);
}

function createSceneEffectGroup() {
  const selected = selectedSceneEffect();
  if (!selected) return;
  level.sceneEffectGroups ||= [];
  const base = `${selected.presetId}-group`;
  let id = base;
  let number = 2;
  while (level.sceneEffectGroups.some((group) => group.id === id)) id = `${base}-${number++}`;
  level.sceneEffectGroups.push({
    id,
    label: `${sceneEffectPreset(selected)?.name || "Effect"} group`,
    sharedProperties: ["primaryColor", "intensity", "speed", "directionDeg"],
    overrides: {}
  });
  selected.groupId = id;
  commitSceneEffects(`Group ${id} created.`);
}

function updateSceneEffectGroup(field, value) {
  const effect = selectedSceneEffect();
  const group = (level.sceneEffectGroups || []).find((item) => item.id === effect?.groupId);
  if (!group) return;
  group.overrides ||= {};
  group.overrides[field] = /Color$/.test(field) ? String(value).toUpperCase() : Number(value);
  group.sharedProperties ||= [];
  if (!group.sharedProperties.includes(field)) group.sharedProperties.push(field);
  for (const member of level.sceneEffects || []) {
    if (member.groupId === group.id) delete member.overrides?.[field];
  }
  commitSceneEffects(`Group ${group.id}: ${field} shared.`);
}

function effectControlValue(effect, field) {
  return window.AtlasSceneEffects.resolve(effect, level, {
    quality: document.documentElement.dataset.effectsQuality || "high",
    reducedMotion: false
  })?.[field];
}

function renderEffectNumberControl(effect, field, inherited = false) {
  const definition = window.AtlasSceneEffects.CONTROL_DEFS[field];
  if (!definition) return "";
  const preset = sceneEffectPreset(effect);
  const maximum = field === "particleCap" ? preset.hardCap : definition.max;
  const overridden = Object.hasOwn(effect.overrides || {}, field);
  const value = effectControlValue(effect, field);
  return `
    <label class="effectEditorField ${inherited && !overridden ? "effectFieldInherited" : ""}">
      <span>${definition.label}${inherited && !overridden ? " · group" : ""}</span>
      <input type="number" min="${definition.min}" max="${maximum}" step="${definition.step}" value="${Number(value).toFixed(definition.step < 1 ? 2 : 0)}"
        data-effect-override="${field}" />
      <button type="button" title="Reset field" data-effect-reset-field="${field}" ${overridden ? "" : "disabled"}>↺</button>
    </label>
  `;
}

function renderEffectColorControl(effect, field, label, inherited = false) {
  const value = effectControlValue(effect, field);
  const overridden = Object.hasOwn(effect.overrides || {}, field);
  const automatic = ["secondaryColor", "glowColor"].includes(field) && !overridden;
  return `
    <label class="effectColorField ${inherited && !overridden ? "effectFieldInherited" : ""}">
      <span>${label}${inherited && !overridden ? " · group" : automatic ? " · auto" : ""}</span>
      <input type="color" value="${value}" data-effect-color="${field}" />
      <input type="text" value="${value}" pattern="#[0-9A-Fa-f]{6}" maxlength="7" data-effect-hex="${field}" />
      <button type="button" title="Reset color" data-effect-reset-field="${field}" ${overridden ? "" : "disabled"}>↺</button>
    </label>
  `;
}

function renderEffectControlSection(effect, preset, section, title, open = false) {
  const group = (level.sceneEffectGroups || []).find((item) => item.id === effect.groupId);
  const fields = preset.controls.filter((field) => window.AtlasSceneEffects.CONTROL_DEFS[field]?.section === section);
  const colors = section === "quick"
    ? renderEffectColorControl(effect, "primaryColor", "Main color", group?.sharedProperties?.includes("primaryColor"))
    : section === "advanced"
      ? [
          renderEffectColorControl(effect, "secondaryColor", "Secondary color", group?.sharedProperties?.includes("secondaryColor")),
          renderEffectColorControl(effect, "glowColor", "Glow color", group?.sharedProperties?.includes("glowColor")),
          renderEffectColorControl(effect, "tintColor", "Tint color", group?.sharedProperties?.includes("tintColor"))
        ].join("")
      : "";
  if (!fields.length && !colors) return "";
  return `
    <details class="editorNestedSection effectControlSection" ${open ? "open" : ""}>
      <summary>${title}</summary>
      ${colors}
      ${fields.map((field) => renderEffectNumberControl(effect, field, group?.sharedProperties?.includes(field))).join("")}
      <button type="button" data-effect-reset-section="${section}">Reset ${title}</button>
    </details>
  `;
}

function sceneEffectBalancedEstimate(effect) {
  const resolved = window.AtlasSceneEffects.resolve(effect, level, { quality: "balanced", reducedMotion: false });
  if (!resolved) return 0;
  const quality = window.AtlasSceneEffects.QUALITY.balanced;
  const particleCost = Number(resolved.particleCap || 0) * Number(resolved.amount || 0) * quality.particles;
  const bounds = window.AtlasSceneEffects.geometryBounds(resolved.geometry);
  const areaFactor = Math.min(2.4, Math.max(0.35, (bounds.width * bounds.height) / 180000));
  if (resolved.preset.renderer === "particleField") return particleCost;
  if (resolved.preset.renderer === "glowField") {
    return 18 + Number(resolved.glow || 0) * 16 + Number(resolved.sparkAmount || 0) * particleCost;
  }
  if (resolved.preset.renderer === "fogField") {
    return areaFactor * 32 + Number(resolved.depthBands || 1) * quality.layers * 24 * Number(resolved.amount || 0) * Number(resolved.softness || 1);
  }
  if (resolved.preset.renderer === "plumeEmitter") {
    return particleCost * 0.9 + Number(resolved.plumeExpansion || 0) * 18 + Number(resolved.turbulence || 0) * 8;
  }
  if (resolved.preset.renderer === "lightBeam") {
    return 26 + particleCost * 0.2 + Number(resolved.softness || 0) * 10;
  }
  if (resolved.preset.renderer === "surfaceShimmer") {
    return areaFactor * 22 + Number(resolved.highlightDensity || 0) * Number(resolved.amount || 0) * quality.segments * 62;
  }
  if (resolved.preset.renderer === "surfaceGlint") {
    return areaFactor * 10 + Number(resolved.highlightDensity || 0) * Number(resolved.amount || 0) * quality.segments * 38;
  }
  return particleCost;
}

function renderEffectLibrary() {
  return window.AtlasSceneEffects.CATEGORIES.map((category) => {
    const presets = Object.values(window.AtlasSceneEffects.PRESETS).filter((preset) => preset.category === category);
    if (!presets.length) return "";
    return `
      <details class="effectLibraryCategory" ${["Light and fire", "Water"].includes(category) ? "open" : ""}>
        <summary>${category}</summary>
        <div class="effectPresetGrid">
          ${presets.map((preset) => `
            <article class="effectPresetCard" data-effect-preset-card="${preset.id}">
              <span class="effectPresetSwatch" style="--effect-card-color:${preset.colors.primaryColor}"></span>
              <strong>${preset.name}</strong>
              <p>${preset.description}</p>
              <p><b>Best for:</b> ${preset.bestFor}</p>
              <p><b>Avoid for:</b> ${preset.avoidFor}</p>
              <p><b>Looks like:</b> ${preset.visualSignature}</p>
              <small>Placement: ${preset.geometryTypes.join(" / ")} · Performance: ${preset.performance}</small>
              <label>Variant
                <select data-effect-library-variant="${preset.id}">
                  ${preset.variants.map((item) => `<option value="${item.id}">${item.name}</option>`).join("")}
                </select>
              </label>
              <button type="button" data-add-effect="${preset.id}">Add effect</button>
            </article>
          `).join("")}
        </div>
      </details>
    `;
  }).join("");
}

function renderSceneEffectsEditorControls() {
  const effects = level.sceneEffects || [];
  const effect = selectedSceneEffect();
  const preset = sceneEffectPreset(effect);
  const variant = preset && window.AtlasSceneEffects.variantById(preset, effect.variantId);
  const group = (level.sceneEffectGroups || []).find((item) => item.id === effect?.groupId);
  const totalBudget = effects.reduce((sum, item) => sum + sceneEffectBalancedEstimate(item), 0);
  const budgetLevel = totalBudget > 220 ? "High" : totalBudget > 155 ? "Medium" : "Low";
  return `
    <section class="sceneEffectsEditor" data-scene-effects-editor>
      <details class="editorSection effectLibrary" open>
        <summary>Effect preset library</summary>
        ${renderEffectLibrary()}
      </details>
      <details class="editorSection" open>
        <summary>Level effects <span>${effects.length}</span></summary>
        <div class="effectBudget effectBudget${budgetLevel}">iPad budget: ${budgetLevel} · balanced estimate ${Math.round(totalBudget)} cost</div>
        <div class="editorObjectPicker">
          ${effects.map((item) => `<button type="button" data-select-effect="${item.id}" class="${item.id === effect?.id ? "editorObjectSelected" : ""}">${item.label || item.id}</button>`).join("") || "<span>No effects yet.</span>"}
        </div>
      </details>
      ${effect && preset ? `
        <section class="effectPropertyPanel" data-effect-property-panel="${effect.id}">
          <div class="effectHeading">
            <strong>${preset.name} · ${variant?.name || effect.variantId}</strong>
            <span>${effect.id}</span>
          </div>
          <label class="editorField"><span>Label</span><input value="${effect.label || effect.id}" data-effect-field="label" /></label>
          <label class="editorField"><span>Variant</span><select data-effect-field="variantId">${preset.variants.map((item) => `<option value="${item.id}" ${item.id === effect.variantId ? "selected" : ""}>${item.name}</option>`).join("")}</select></label>
          <label class="editorField"><span>Layer slot</span><select data-effect-field="layerSlot">${window.AtlasSceneEffects.LAYER_SLOTS.map((slot) => `<option value="${slot}" ${slot === effect.layerSlot ? "selected" : ""}>${slot}</option>`).join("")}</select></label>
          <label class="editorField"><span>Geometry</span><select data-effect-field="geometryType">${preset.geometryTypes.map((type) => `<option value="${type}" ${type === effect.geometry.type ? "selected" : ""}>${type}</option>`).join("")}</select></label>
          <label class="editorField"><span>Quality tier</span><select data-effect-field="qualityTier">${["auto", "high", "balanced", "reduced"].map((tier) => `<option value="${tier}" ${(effect.qualityTier || "auto") === tier ? "selected" : ""}>${tier}</option>`).join("")}</select></label>
          <label class="editorField"><span>Group</span><select data-effect-field="groupId"><option value="">None</option>${(level.sceneEffectGroups || []).map((item) => `<option value="${item.id}" ${item.id === effect.groupId ? "selected" : ""}>${item.label || item.id}</option>`).join("")}</select></label>
          <label class="editorToggle"><input type="checkbox" data-effect-field="enabled" ${effect.enabled !== false ? "checked" : ""}/><span>Enabled</span></label>
          ${renderEffectControlSection(effect, preset, "quick", "Quick", true)}
          ${renderEffectControlSection(effect, preset, "advanced", "Advanced")}
          <label class="editorField"><span>Blend mode</span><select data-effect-blend-mode>
            ${["source-over", "lighter", "screen", "soft-light"].map((mode) => `<option value="${mode}" ${(effect.overrides?.blendMode || preset.blendMode) === mode ? "selected" : ""}>${mode}</option>`).join("")}
          </select></label>
          ${renderEffectControlSection(effect, preset, "expert", "Expert")}
          ${group ? `
            <details class="editorNestedSection"><summary>Group sharing · ${group.label || group.id}</summary>
              ${["primaryColor", "intensity", "speed", "directionDeg"].map((field) => /Color$/.test(field)
                ? `<button type="button" data-share-group-field="${field}">Share current color</button>`
                : `<button type="button" data-share-group-field="${field}">Share current ${field}</button>`).join("")}
            </details>` : ""}
          <div class="effectActions">
            <button type="button" data-debug-action="edit-effect-geometry">Edit geometry</button>
            <button type="button" data-debug-action="duplicate-effect">Duplicate</button>
            <button type="button" data-debug-action="copy-effect">Copy</button>
            <button type="button" data-debug-action="paste-effect" ${walkPathEditor.effectClipboard ? "" : "disabled"}>Paste</button>
            <button type="button" data-debug-action="create-effect-group">Create group</button>
            <button type="button" data-debug-action="reset-effect">Reset effect</button>
            <button type="button" data-debug-action="delete-effect">Delete</button>
          </div>
        </section>
      ` : ""}
      <section class="effectPreviewControls">
        <strong>Preview</strong>
        <button type="button" data-debug-action="effect-play">Play</button>
        <button type="button" data-debug-action="effect-pause">Pause</button>
        <button type="button" data-debug-action="effect-restart">Restart</button>
        <button type="button" data-debug-action="effect-new-seed">Generate variation</button>
        <button type="button" data-debug-action="effect-toggle-guides">${walkPathEditor.showEffectGuides ? "Hide guides" : "Show guides"}</button>
        <button type="button" data-debug-action="effect-toggle-selected">${walkPathEditor.effectVisibility === "selectedHidden" ? "Show effect" : "Hide effect"}</button>
        <button type="button" data-debug-action="effect-isolate">Isolate selected</button>
        <button type="button" data-debug-action="effect-show-all">Show all effects</button>
        <button type="button" data-debug-action="effect-background-only">Background only</button>
      </section>
    </section>
  `;
}

function effectGeometryCenter(geometry) {
  const bounds = window.AtlasSceneEffects.geometryBounds(geometry);
  if (["point", "pointRadius", "rectangle", "ellipse", "directionalEmitter", "directionalBeam"].includes(geometry?.type) &&
      Number.isFinite(geometry.x) && Number.isFinite(geometry.y)) {
    return { x: geometry.x, y: geometry.y };
  }
  return { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 };
}

function translateEffectGeometry(geometry, dx, dy) {
  if (Number.isFinite(geometry.x)) geometry.x = Math.round(geometry.x + dx);
  if (Number.isFinite(geometry.y)) geometry.y = Math.round(geometry.y + dy);
  (geometry.points || []).forEach((point) => { point.x = Math.round(point.x + dx); point.y = Math.round(point.y + dy); });
  (geometry.cutouts || []).flat().forEach((point) => { point.x = Math.round(point.x + dx); point.y = Math.round(point.y + dy); });
}

function ensureEffectMask(effect) {
  effect.mask ||= { includes: [], cutouts: [] };
  effect.mask.includes ||= [];
  effect.mask.cutouts ||= [];
  return effect.mask;
}

function polygonFromBounds(bounds) {
  return [
    { x: Math.round(bounds.x), y: Math.round(bounds.y) },
    { x: Math.round(bounds.x + bounds.width), y: Math.round(bounds.y) },
    { x: Math.round(bounds.x + bounds.width), y: Math.round(bounds.y + bounds.height) },
    { x: Math.round(bounds.x), y: Math.round(bounds.y + bounds.height) }
  ];
}

function ellipseToPolygon(geometry, segments = 16) {
  return Array.from({ length: segments }, (_, index) => {
    const angle = (index / segments) * Math.PI * 2;
    return {
      x: Math.round(geometry.x + Math.cos(angle) * geometry.width / 2),
      y: Math.round(geometry.y + Math.sin(angle) * geometry.height / 2)
    };
  });
}

function geometryToPolygon(geometry) {
  if (geometry.type === "polygon") return cloneSceneEffects([{ geometry }])[0].geometry.points;
  if (geometry.type === "ellipse") return ellipseToPolygon(geometry);
  return polygonFromBounds(window.AtlasSceneEffects.geometryBounds(geometry));
}

function maskAllPoints(mask) {
  return [...(mask?.includes || []).flat(), ...(mask?.cutouts || []).flat()];
}

function translateEffectMask(mask, dx, dy) {
  maskAllPoints(mask).forEach((point) => {
    point.x = Math.round(point.x + dx);
    point.y = Math.round(point.y + dy);
  });
}

function translatePolygon(points, dx, dy) {
  (points || []).forEach((point) => {
    point.x = Math.round(point.x + dx);
    point.y = Math.round(point.y + dy);
  });
}

function selectedEffectPolygonRef(effect, selection = walkPathEditor.selectedEffectVertex) {
  if (!effect || !selection) return null;
  if (!selection.target || selection.target === "source") return effect.geometry.points || null;
  if (selection.target === "sourceCutout") return effect.geometry.cutouts?.[selection.cutoutIndex] || null;
  if (selection.target === "maskInclude") return effect.mask?.includes?.[selection.polygonIndex] || null;
  if (selection.target === "maskCutout") return effect.mask?.cutouts?.[selection.polygonIndex] || null;
  return null;
}

function validClosedPolygon(points) {
  return Array.isArray(points) &&
    points.length >= 3 &&
    points.every((point) => Number.isFinite(point.x) && Number.isFinite(point.y)) &&
    !window.AtlasSceneEffects.polygonSelfIntersects(points);
}

function duplicateSourceMask(effect) {
  if (!effect) return;
  const mask = ensureEffectMask(effect);
  mask.includes = [geometryToPolygon(effect.geometry)];
  mask.cutouts = cloneSceneEffects([{ geometry: effect.geometry }])[0].geometry.cutouts || [];
  walkPathEditor.effectEditScope = "mask";
  walkPathEditor.selectedEffectVertex = { target: "maskInclude", polygonIndex: 0, vertexIndex: 0 };
  updateEffectGeometry(`${effect.label || effect.id}: mask duplicated from source.`);
}

function resetEffectMask(effect = selectedSceneEffect()) {
  if (!effect) return;
  delete effect.mask;
  walkPathEditor.selectedEffectVertex = null;
  updateEffectGeometry(`${effect.label || effect.id}: mask reset.`);
}

function reverseSelectedPolygon() {
  const effect = selectedSceneEffect();
  const polygon = selectedEffectPolygonRef(effect);
  if (!polygon) return;
  polygon.reverse();
  walkPathEditor.selectedEffectVertex = { ...walkPathEditor.selectedEffectVertex, vertexIndex: 0 };
  updateEffectGeometry(`${effect.label || effect.id}: polygon order reversed.`);
}

function centerSourceInMask(effect = selectedSceneEffect()) {
  const maskBounds = window.AtlasSceneEffects.maskBounds(effect?.mask);
  if (!effect || !maskBounds) return;
  const source = effectGeometryCenter(effect.geometry);
  const target = { x: maskBounds.x + maskBounds.width / 2, y: maskBounds.y + maskBounds.height / 2 };
  translateEffectGeometry(effect.geometry, target.x - source.x, target.y - source.y);
  updateEffectGeometry(`${effect.label || effect.id}: source centered in mask.`);
}

function startEffectPolygonDraft(target) {
  walkPathEditor.effectPolygonDraft = { target, points: [] };
  walkPathEditor.message = "Click/tap points. Close with first point or Enter. Escape cancels.";
  render();
}

function cancelEffectPolygonDraft() {
  walkPathEditor.effectPolygonDraft = null;
  render();
}

function commitEffectPolygonDraft() {
  const effect = selectedSceneEffect();
  const draft = walkPathEditor.effectPolygonDraft;
  if (!effect || !draft) return;
  if (!validClosedPolygon(draft.points)) {
    walkPathEditor.message = "Polygon rejected: use at least three finite, non-intersecting points.";
    walkPathEditor.effectPolygonDraft = null;
    render();
    return;
  }
  if (draft.target === "source") {
    effect.geometry = { type: "polygon", points: cloneSceneEffects([{ points: draft.points }])[0].points, cutouts: [] };
    walkPathEditor.selectedEffectVertex = { target: "source", cutoutIndex: null, vertexIndex: 0 };
  } else {
    const mask = ensureEffectMask(effect);
    const list = draft.target === "maskCutout" ? mask.cutouts : mask.includes;
    list.push(cloneSceneEffects([{ points: draft.points }])[0].points);
    walkPathEditor.effectEditScope = draft.target === "maskCutout" ? "cutout" : "mask";
    walkPathEditor.selectedEffectVertex = {
      target: draft.target === "maskCutout" ? "maskCutout" : "maskInclude",
      polygonIndex: list.length - 1,
      vertexIndex: 0
    };
  }
  walkPathEditor.effectPolygonDraft = null;
  updateEffectGeometry(`${effect.label || effect.id}: polygon drawn.`);
}

function addEffectDraftPoint(point) {
  const draft = walkPathEditor.effectPolygonDraft;
  if (!draft) return false;
  if (draft.points.length >= 3 && Math.hypot(point.x - draft.points[0].x, point.y - draft.points[0].y) < 18) {
    commitEffectPolygonDraft();
    return true;
  }
  draft.points.push(point);
  syncEffectDraftDom();
  return true;
}

function syncEffectDraftDom() {
  const draft = walkPathEditor.effectPolygonDraft;
  document.querySelectorAll("[data-effect-draft-path]").forEach((path) => {
    path.setAttribute("d", draft?.points?.length ? geometryPathData(draft.points).replace(" Z", "") : "");
  });
  document.querySelectorAll("[data-effect-draft-points]").forEach((group) => {
    group.innerHTML = (draft?.points || []).map((point, index) =>
      `<circle class="effectGuideVertex effectGuideDraftVertex" cx="${point.x}" cy="${point.y}" r="${index ? 11 : 15}"></circle>`
    ).join("");
  });
}

function updateEffectGeometry(message, renderNow = true) {
  sceneEffectRuntime.prepareLevel(level);
  markEditorModified(message);
  if (renderNow) render();
}

function geometryPathData(points) {
  return (points || []).map((point, index) => `${index ? "L" : "M"} ${point.x} ${point.y}`).join(" ") + " Z";
}

function renderEffectGuideHandle(x, y, handle, options = {}) {
  const className = options.className ? ` ${options.className}` : "";
  const hitRadius = options.hitRadius ?? 15;
  const visualRadius = options.visualRadius ?? 8;
  return `<circle class="effectGuideHitTarget${className}" cx="${x}" cy="${y}" r="${hitRadius}" data-effect-handle="${handle}"></circle>
    <circle class="effectGuideHandle${className}" cx="${x}" cy="${y}" r="${visualRadius}" data-effect-handle="${handle}"></circle>`;
}

function renderEffectPolygonControls(points, target, options = {}) {
  const selectedVertex = walkPathEditor.selectedEffectVertex;
  const polygonIndex = options.polygonIndex;
  const cutoutIndex = options.cutoutIndex;
  const editable = options.editable !== false;
  const targetMatches = (vertexIndex) => {
    if (!selectedVertex) return false;
    if (target === "source") return (!selectedVertex.target || selectedVertex.target === "source") && selectedVertex.vertexIndex === vertexIndex;
    if (target === "sourceCutout") return selectedVertex.target === "sourceCutout" && selectedVertex.cutoutIndex === cutoutIndex && selectedVertex.vertexIndex === vertexIndex;
    return selectedVertex.target === target && selectedVertex.polygonIndex === polygonIndex && selectedVertex.vertexIndex === vertexIndex;
  };
  const vertices = editable ? points.map((point, index) => `<circle class="effectGuideVertex ${targetMatches(index) ? "effectGuideVertexSelected" : ""}" cx="${point.x}" cy="${point.y}" r="15"
    data-effect-vertex="${index}" data-effect-vertex-scope="${target}" data-effect-polygon-index="${polygonIndex ?? ""}" data-effect-cutout="${cutoutIndex ?? ""}"></circle>`).join("") : "";
  const edges = editable ? points.map((point, index) => {
    const next = points[(index + 1) % points.length];
    return `<circle class="effectGuideEdge" cx="${(point.x + next.x) / 2}" cy="${(point.y + next.y) / 2}" r="11"
      data-effect-edge="${index}" data-effect-edge-scope="${target}" data-effect-polygon-index="${polygonIndex ?? ""}" data-effect-cutout="${cutoutIndex ?? ""}"></circle>`;
  }).join("") : "";
  return `${vertices}${edges}`;
}

function renderMaskGuide(effect, options = {}) {
  const mask = effect.mask;
  const scope = walkPathEditor.effectEditScope || "source";
  if (!mask || (!mask.includes?.length && !mask.cutouts?.length)) return "";
  const includeEditable = scope === "mask";
  const cutoutEditable = scope === "cutout";
  const includes = (mask.includes || []).map((points, polygonIndex) => {
    const center = polygonCenter(points);
    return `<g data-effect-mask-include="${polygonIndex}">
      <path class="effectGuideMaskInclude" data-effect-mask-shape="include" data-effect-polygon-index="${polygonIndex}" d="${geometryPathData(points)}"></path>
      ${includeEditable ? `<circle class="effectGuideCenter effectGuideMaskMove" cx="${center.x}" cy="${center.y}" r="10" data-effect-handle="mask-move" data-effect-polygon-index="${polygonIndex}"></circle>` : ""}
      ${renderEffectPolygonControls(points, "maskInclude", { polygonIndex, editable: includeEditable })}
    </g>`;
  }).join("");
  const cutouts = (mask.cutouts || []).map((points, polygonIndex) => {
    const center = polygonCenter(points);
    return `<g data-effect-mask-cutout="${polygonIndex}">
      <path class="effectGuideMaskCutout" data-effect-mask-shape="cutout" data-effect-polygon-index="${polygonIndex}" d="${geometryPathData(points)}"></path>
      ${cutoutEditable ? `<circle class="effectGuideCenter effectGuideMaskCutoutMove" cx="${center.x}" cy="${center.y}" r="10" data-effect-handle="mask-cutout-move" data-effect-polygon-index="${polygonIndex}"></circle>` : ""}
      ${renderEffectPolygonControls(points, "maskCutout", { polygonIndex, editable: cutoutEditable })}
    </g>`;
  }).join("");
  return `<g class="effectGuideMaskLayer" data-effect-mask-layer>${includes}${cutouts}</g>`;
}

function polygonCenter(points) {
  const xs = (points || []).map((point) => point.x);
  const ys = (points || []).map((point) => point.y);
  if (!xs.length) return { x: 0, y: 0 };
  return {
    x: Math.round((Math.min(...xs) + Math.max(...xs)) / 2),
    y: Math.round((Math.min(...ys) + Math.max(...ys)) / 2)
  };
}

function renderEffectGeometryShape(effect, options = {}) {
  const geometry = effect.geometry;
  const sourceEditable = options.editable !== false && (walkPathEditor.effectEditScope || "source") === "source";
  const mask = options.includeMask === false ? "" : renderMaskGuide(effect, options);
  const center = effectGeometryCenter(geometry);
  if (geometry.type === "polygon") {
    const outer = `<path class="effectGuideShape" data-effect-shape="source" d="${geometryPathData(geometry.points)}"></path>`;
    const cutouts = (geometry.cutouts || []).map((points, cutoutIndex) => `<path class="effectGuideCutout" data-effect-source-cutout-shape="${cutoutIndex}" d="${geometryPathData(points)}"></path>${
      renderEffectPolygonControls(points, "sourceCutout", { cutoutIndex, editable: sourceEditable })
    }`).join("");
    return `${outer}${cutouts}${renderEffectPolygonControls(geometry.points, "source", { editable: sourceEditable })}${mask}`;
  }
  if (geometry.type === "ellipse") return `
    <ellipse class="effectGuideShape" data-effect-shape="source" cx="${geometry.x}" cy="${geometry.y}" rx="${geometry.width / 2}" ry="${geometry.height / 2}"></ellipse>
    ${sourceEditable ? `${renderEffectGuideHandle(geometry.x + geometry.width / 2, geometry.y, "resize-x")}
    ${renderEffectGuideHandle(geometry.x, geometry.y + geometry.height / 2, "resize-y")}
    ${renderEffectGuideHandle(geometry.x + geometry.width / 2, geometry.y + geometry.height / 2, "resize")}` : ""}${mask}`;
  if (geometry.type === "rectangle") return `
    <rect class="effectGuideShape" data-effect-shape="source" x="${geometry.x - geometry.width / 2}" y="${geometry.y - geometry.height / 2}" width="${geometry.width}" height="${geometry.height}"></rect>
    ${sourceEditable ? `${renderEffectGuideHandle(geometry.x + geometry.width / 2, geometry.y, "resize-x")}
    ${renderEffectGuideHandle(geometry.x, geometry.y + geometry.height / 2, "resize-y")}
    ${renderEffectGuideHandle(geometry.x + geometry.width / 2, geometry.y + geometry.height / 2, "resize")}` : ""}${mask}`;
  if (geometry.type === "pointRadius" || geometry.type === "point") return `
    <circle class="effectGuideShape" data-effect-shape="source" cx="${geometry.x}" cy="${geometry.y}" r="${geometry.radius || 28}"></circle>
    ${sourceEditable && geometry.type === "pointRadius" ? renderEffectGuideHandle(geometry.x + geometry.radius, geometry.y, "radius") : ""}${mask}`;
  if (geometry.type === "directionalEmitter" || geometry.type === "directionalBeam") {
    const length = geometry.type === "directionalBeam" ? geometry.length : Math.max(120, (geometry.width || 20) * 6);
    const angle = geometry.directionDeg * Math.PI / 180;
    const x = geometry.x + Math.cos(angle) * length;
    const y = geometry.y + Math.sin(angle) * length;
    const sideX = Math.cos(angle + Math.PI / 2);
    const sideY = Math.sin(angle + Math.PI / 2);
    const width = geometry.type === "directionalBeam" ? geometry.startWidth : geometry.width;
    return `
      <line class="effectGuideDirection" data-effect-direction-line x1="${geometry.x}" y1="${geometry.y}" x2="${x}" y2="${y}"></line>
      ${sourceEditable ? `${renderEffectGuideHandle(x, y, "direction")}
      ${renderEffectGuideHandle(geometry.x + sideX * width, geometry.y + sideY * width, geometry.type === "directionalBeam" ? "start-width" : "width", { className: "effectGuideWidthHandle" })}
      ${geometry.type === "directionalBeam" ? renderEffectGuideHandle(x + sideX * geometry.endWidth, y + sideY * geometry.endWidth, "end-width", { className: "effectGuideWidthHandle" }) : ""}
      ${geometry.type === "directionalEmitter" ? renderEffectGuideHandle(geometry.x + Math.cos(angle - (geometry.spreadDeg || 0) * Math.PI / 360) * length * 0.55, geometry.y + Math.sin(angle - (geometry.spreadDeg || 0) * Math.PI / 360) * length * 0.55, "spread", { className: "effectGuideSpreadHandle" }) : ""}` : ""}${mask}`;
  }
  return mask;
}

function renderEffectGeometryWorkspace() {
  if (!walkPathEditor.effectGeometryMode) return "";
  const effect = selectedSceneEffect();
  if (!effect) return "";
  const view = walkPathEditor.effectViewBox || { x: 0, y: 0, width: level.world.width, height: level.world.height };
  const center = effectGeometryCenter(effect.geometry);
  const selectedVertex = walkPathEditor.selectedEffectVertex;
  const selectedPolygon = selectedEffectPolygonRef(effect, selectedVertex);
  const vertex = selectedPolygon?.[selectedVertex?.vertexIndex];
  const scope = walkPathEditor.effectEditScope || "source";
  const draft = walkPathEditor.effectPolygonDraft;
  return `
    <div class="effectGeometryWorkspace" data-effect-geometry-workspace>
      <svg viewBox="${view.x} ${view.y} ${view.width} ${view.height}" preserveAspectRatio="xMidYMid meet" data-effect-geometry-background data-effect-geometry-surface="workspace">
        <rect class="effectWorkspaceBackground" x="${view.x}" y="${view.y}" width="${view.width}" height="${view.height}"></rect>
        <image href="${level.world.background}" x="0" y="0" width="${level.world.width}" height="${level.world.height}" opacity="${walkPathEditor.effectVisibility === "backgroundOnly" ? 1 : .62}" pointer-events="none"></image>
        ${walkPathEditor.effectVisibility === "backgroundOnly" ? "" : `<g data-effect-guide="${effect.id}">
          ${renderEffectGeometryShape(effect, { includeMask: true })}
          ${scope === "source" ? `<circle class="effectGuideCenter" cx="${center.x}" cy="${center.y}" r="10" data-effect-handle="move"></circle>` : ""}
          <text class="effectGuideLabel" x="${center.x + 24}" y="${center.y - 28}">${effect.label || effect.id}</text>
        </g>`}
        <path class="effectGuideDraftPath" data-effect-draft-path d="${draft?.points?.length ? geometryPathData(draft.points).replace(" Z", "") : ""}"></path>
        <g data-effect-draft-points>${(draft?.points || []).map((point, index) => `<circle class="effectGuideVertex effectGuideDraftVertex" cx="${point.x}" cy="${point.y}" r="${index ? 11 : 15}"></circle>`).join("")}</g>
      </svg>
      <div class="effectGeometryToolbar">
        <strong>Edit effect geometry · ${effect.label || effect.id}</strong>
        <div class="effectGeometryModeTabs" role="group" aria-label="Effect geometry scope">
          ${["source", "mask", "cutout"].map((item) => `<button type="button" data-debug-action="effect-edit-${item}" class="${scope === item ? "editorObjectSelected" : ""}">${item === "source" ? "Source" : item === "mask" ? "Mask" : "Cutout"}</button>`).join("")}
          <label><input type="checkbox" data-effect-linked-mask ${walkPathEditor.effectLinkedMaskMovement ? "checked" : ""}/> Link source+mask movement</label>
        </div>
        <button type="button" data-debug-action="effect-fit-level">Fit level</button>
        <button type="button" data-debug-action="effect-fit-selected">Fit selected effect</button>
        <button type="button" data-debug-action="effect-zoom-in">Zoom in</button>
        <button type="button" data-debug-action="effect-zoom-out">Zoom out</button>
        ${scope === "source" ? `
          <button type="button" data-debug-action="effect-draw-source-polygon">${draft?.target === "source" ? "Drawing source..." : "Draw source polygon"}</button>
          ${effect.geometry.type === "polygon" ? `<button type="button" data-debug-action="effect-add-cutout">Add cutout</button>` : ""}
          ${["rectangle", "ellipse"].includes(effect.geometry.type) ? `<button type="button" data-debug-action="effect-convert-polygon">Convert to polygon</button>` : ""}
        ` : ""}
        ${scope === "mask" ? `
          <button type="button" data-debug-action="effect-duplicate-mask">Duplicate mask from source</button>
          <button type="button" data-debug-action="effect-draw-mask-polygon">${draft?.target === "maskInclude" ? "Drawing mask..." : "Draw include polygon"}</button>
          <button type="button" data-debug-action="effect-reset-mask">Reset mask</button>
        ` : ""}
        ${scope === "cutout" ? `
          <button type="button" data-debug-action="effect-draw-cutout-polygon">${draft?.target === "maskCutout" ? "Drawing cutout..." : "Draw mask cutout"}</button>
          <button type="button" data-debug-action="effect-add-cutout">Add cutout</button>
        ` : ""}
        <button type="button" data-debug-action="effect-reverse-polygon" ${selectedPolygon ? "" : "disabled"}>Reverse point order</button>
        <button type="button" data-debug-action="effect-center-source-mask" ${effect.mask ? "" : "disabled"}>Center source in mask</button>
        <button type="button" data-debug-action="effect-delete-vertex" ${vertex ? "" : "disabled"}>Delete vertex</button>
        ${draft ? `<button type="button" data-debug-action="effect-commit-polygon">Close polygon</button><button type="button" data-debug-action="effect-cancel-polygon">Cancel polygon</button>` : ""}
        <button type="button" data-debug-action="done-effect-geometry">Done</button>
        <label>X <input type="number" data-effect-coordinate="x" value="${Math.round(vertex?.x ?? center.x)}"/></label>
        <label>Y <input type="number" data-effect-coordinate="y" value="${Math.round(vertex?.y ?? center.y)}"/></label>
        ${effect.geometry.type === "pointRadius" ? `<label>Radius <input type="number" data-effect-coordinate="radius" value="${Math.round(effect.geometry.radius)}"/></label>` : ""}
        ${["rectangle", "ellipse"].includes(effect.geometry.type) ? `<label>Width <input type="number" data-effect-coordinate="width" value="${Math.round(effect.geometry.width)}"/></label><label>Height <input type="number" data-effect-coordinate="height" value="${Math.round(effect.geometry.height)}"/></label>` : ""}
        ${effect.geometry.type === "directionalEmitter" ? `<label>Spread <input type="number" data-effect-coordinate="spreadDeg" value="${Math.round(effect.geometry.spreadDeg)}"/></label><label>Width <input type="number" data-effect-coordinate="width" value="${Math.round(effect.geometry.width)}"/></label>` : ""}
        ${effect.geometry.type === "directionalBeam" ? `<label>Length <input type="number" data-effect-coordinate="length" value="${Math.round(effect.geometry.length)}"/></label><label>Start width <input type="number" data-effect-coordinate="startWidth" value="${Math.round(effect.geometry.startWidth)}"/></label><label>End width <input type="number" data-effect-coordinate="endWidth" value="${Math.round(effect.geometry.endWidth)}"/></label>` : ""}
      </div>
    </div>
  `;
}

function pointFromEffectWorkspaceEvent(event) {
  const svg = event.target?.closest?.("svg[data-effect-geometry-surface]") ||
    document.querySelector("[data-effect-geometry-workspace] svg") ||
    document.querySelector(".sceneEffectGuides");
  if (!svg) return { x: 0, y: 0 };
  const point = svg.createSVGPoint();
  point.x = event.clientX;
  point.y = event.clientY;
  const worldPoint = point.matrixTransform(svg.getScreenCTM().inverse());
  return {
    x: Math.round(Math.max(-2000, Math.min(level.world.width + 2000, worldPoint.x))),
    y: Math.round(Math.max(-2000, Math.min(level.world.height + 2000, worldPoint.y)))
  };
}

function setEffectViewZoom(scale) {
  const current = walkPathEditor.effectViewBox || { x: 0, y: 0, width: level.world.width, height: level.world.height };
  const center = { x: current.x + current.width / 2, y: current.y + current.height / 2 };
  const width = Math.max(120, Math.min(level.world.width * 2, current.width * scale));
  const height = width * (current.height / current.width);
  walkPathEditor.effectViewBox = { x: center.x - width / 2, y: center.y - height / 2, width, height };
  render();
}

function fitSelectedEffectGeometry() {
  const effect = selectedSceneEffect();
  if (!effect) return;
  const bounds = window.AtlasSceneEffects.geometryBounds(effect.geometry);
  const padding = Math.max(60, Math.max(bounds.width, bounds.height) * 0.3);
  const width = Math.max(180, bounds.width + padding * 2);
  const height = Math.max(140, bounds.height + padding * 2);
  walkPathEditor.effectViewBox = { x: bounds.x - padding, y: bounds.y - padding, width, height };
  render();
}

function addEffectCutout() {
  const effect = selectedSceneEffect();
  if (!effect) return;
  const targetMask = (walkPathEditor.effectEditScope || "source") === "cutout";
  if (!targetMask && effect.geometry.type !== "polygon") return;
  const bounds = targetMask && window.AtlasSceneEffects.maskBounds(effect.mask)
    ? window.AtlasSceneEffects.maskBounds(effect.mask)
    : window.AtlasSceneEffects.geometryBounds(effect.geometry);
  const center = targetMask && window.AtlasSceneEffects.maskBounds(effect.mask)
    ? { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 }
    : effectGeometryCenter(effect.geometry);
  const radius = Math.max(24, Math.min(bounds.width, bounds.height) * 0.14);
  const polygon = [
    { x: Math.round(center.x - radius), y: Math.round(center.y + radius * .7) },
    { x: Math.round(center.x), y: Math.round(center.y - radius) },
    { x: Math.round(center.x + radius), y: Math.round(center.y + radius * .7) }
  ];
  if (targetMask) {
    const mask = ensureEffectMask(effect);
    mask.cutouts.push(polygon);
    walkPathEditor.selectedEffectVertex = { target: "maskCutout", polygonIndex: mask.cutouts.length - 1, vertexIndex: 0 };
  } else {
    effect.geometry.cutouts ||= [];
    effect.geometry.cutouts.push(polygon);
    walkPathEditor.selectedEffectVertex = { target: "sourceCutout", cutoutIndex: effect.geometry.cutouts.length - 1, vertexIndex: 0 };
  }
  updateEffectGeometry(`${effect.label}: cutout added.`);
}

function deleteSelectedEffectVertex() {
  const effect = selectedSceneEffect();
  const selected = walkPathEditor.selectedEffectVertex;
  if (!effect || !selected) return;
  const points = selectedEffectPolygonRef(effect, selected);
  if (!points || points.length <= 3) return;
  points.splice(selected.vertexIndex, 1);
  walkPathEditor.selectedEffectVertex = null;
  updateEffectGeometry(`${effect.label}: vertex deleted.`);
}

function insertEffectVertex(edgeIndex, selection = {}) {
  const effect = selectedSceneEffect();
  if (!effect) return;
  const points = selectedEffectPolygonRef(effect, selection);
  if (!points?.length) return;
  const from = points[edgeIndex];
  const to = points[(edgeIndex + 1) % points.length];
  const point = { x: Math.round((from.x + to.x) / 2), y: Math.round((from.y + to.y) / 2) };
  points.splice(edgeIndex + 1, 0, point);
  walkPathEditor.selectedEffectVertex = { ...selection, vertexIndex: edgeIndex + 1 };
  updateEffectGeometry(`${effect.label}: vertex inserted.`);
}

function updateEffectCoordinate(axis, value) {
  const effect = selectedSceneEffect();
  if (!effect || !Number.isFinite(Number(value))) return;
  const selected = walkPathEditor.selectedEffectVertex;
  if (selected && ["x", "y"].includes(axis)) {
    const points = selectedEffectPolygonRef(effect, selected);
    if (points?.[selected.vertexIndex]) points[selected.vertexIndex][axis] = Math.round(Number(value));
  } else if (["radius", "width", "height", "length", "startWidth", "endWidth", "spreadDeg"].includes(axis)) {
    effect.geometry[axis] = Math.max(axis === "spreadDeg" ? 0 : 1, Math.round(Number(value)));
  } else {
    const center = effectGeometryCenter(effect.geometry);
    translateEffectGeometry(effect.geometry, axis === "x" ? Number(value) - center.x : 0, axis === "y" ? Number(value) - center.y : 0);
  }
  updateEffectGeometry(`${effect.label}: ${axis} updated.`);
}

function updateEffectDrag(event) {
  const drag = walkPathEditor.effectDrag;
  const effect = selectedSceneEffect();
  if (!drag || !effect) return;
  const point = pointFromEffectWorkspaceEvent(event);
  const geometry = effect.geometry;
  if (drag.type === "move") {
    const dx = point.x - drag.last.x;
    const dy = point.y - drag.last.y;
    translateEffectGeometry(geometry, dx, dy);
    if (walkPathEditor.effectLinkedMaskMovement && effect.mask) translateEffectMask(effect.mask, dx, dy);
    drag.last = point;
  } else if (drag.type === "mask-move") {
    const points = effect.mask?.includes?.[drag.polygonIndex];
    if (points) translatePolygon(points, point.x - drag.last.x, point.y - drag.last.y);
    drag.last = point;
  } else if (drag.type === "mask-cutout-move") {
    const points = effect.mask?.cutouts?.[drag.polygonIndex];
    if (points) translatePolygon(points, point.x - drag.last.x, point.y - drag.last.y);
    drag.last = point;
  } else if (drag.type === "vertex") {
    const points = selectedEffectPolygonRef(effect, drag);
    if (points?.[drag.vertexIndex]) points[drag.vertexIndex] = point;
  } else if (drag.type === "radius") {
    geometry.radius = Math.max(1, Math.round(Math.hypot(point.x - geometry.x, point.y - geometry.y)));
  } else if (drag.type === "resize" || drag.type === "resize-x" || drag.type === "resize-y") {
    if (drag.type !== "resize-y") geometry.width = Math.max(2, Math.round(Math.abs(point.x - geometry.x) * 2));
    if (drag.type !== "resize-x") geometry.height = Math.max(2, Math.round(Math.abs(point.y - geometry.y) * 2));
  } else if (drag.type === "width") {
    const angle = (geometry.directionDeg || 0) * Math.PI / 180 + Math.PI / 2;
    geometry.width = Math.max(1, Math.round(Math.abs((point.x - geometry.x) * Math.cos(angle) + (point.y - geometry.y) * Math.sin(angle))));
  } else if (drag.type === "start-width" || drag.type === "end-width") {
    const angle = (geometry.directionDeg || 0) * Math.PI / 180;
    const end = { x: geometry.x + Math.cos(angle) * geometry.length, y: geometry.y + Math.sin(angle) * geometry.length };
    const origin = drag.type === "start-width" ? geometry : end;
    const side = angle + Math.PI / 2;
    geometry[drag.type === "start-width" ? "startWidth" : "endWidth"] = Math.max(1, Math.round(Math.abs((point.x - origin.x) * Math.cos(side) + (point.y - origin.y) * Math.sin(side))));
  } else if (drag.type === "spread") {
    const base = Math.atan2(point.y - geometry.y, point.x - geometry.x) * 180 / Math.PI;
    geometry.spreadDeg = Math.max(0, Math.min(180, Math.round(Math.abs(base - (geometry.directionDeg || 0)) * 2)));
  } else if (drag.type === "resize") {
    geometry.width = Math.max(2, Math.round(Math.abs(point.x - geometry.x) * 2));
    geometry.height = Math.max(2, Math.round(Math.abs(point.y - geometry.y) * 2));
  } else if (drag.type === "direction") {
    geometry.directionDeg = Math.round(Math.atan2(point.y - geometry.y, point.x - geometry.x) * 180 / Math.PI);
    if (geometry.type === "directionalBeam") geometry.length = Math.max(1, Math.round(Math.hypot(point.x - geometry.x, point.y - geometry.y)));
  } else if (drag.type === "pan") {
    const svg = document.querySelector("[data-effect-geometry-workspace] svg");
    const view = drag.view;
    walkPathEditor.effectViewBox = {
      ...view,
      x: view.x - (event.clientX - drag.clientX) * view.width / Math.max(1, svg.clientWidth),
      y: view.y - (event.clientY - drag.clientY) * view.height / Math.max(1, svg.clientHeight)
    };
    const next = walkPathEditor.effectViewBox;
    svg.setAttribute("viewBox", `${next.x} ${next.y} ${next.width} ${next.height}`);
    return;
  }
  sceneEffectRuntime.restart();
  syncEffectGuideDom(effect);
}

function setSvgPoint(element, x, y) {
  if (!element) return;
  element.setAttribute("cx", String(Math.round(x)));
  element.setAttribute("cy", String(Math.round(y)));
}

function syncEffectGuideDom(effect) {
  if (!effect) return;
  const geometry = effect.geometry;
  const center = effectGeometryCenter(geometry);
  document.querySelectorAll(`[data-effect-guide="${CSS.escape(effect.id)}"]`).forEach((guide) => {
    const source = guide.querySelector("[data-effect-shape='source']");
    if (source) {
      if (geometry.type === "polygon") source.setAttribute("d", geometryPathData(geometry.points));
      if (geometry.type === "ellipse") {
        source.setAttribute("cx", geometry.x);
        source.setAttribute("cy", geometry.y);
        source.setAttribute("rx", geometry.width / 2);
        source.setAttribute("ry", geometry.height / 2);
      }
      if (geometry.type === "rectangle") {
        source.setAttribute("x", geometry.x - geometry.width / 2);
        source.setAttribute("y", geometry.y - geometry.height / 2);
        source.setAttribute("width", geometry.width);
        source.setAttribute("height", geometry.height);
      }
      if (geometry.type === "point" || geometry.type === "pointRadius") {
        source.setAttribute("cx", geometry.x);
        source.setAttribute("cy", geometry.y);
        source.setAttribute("r", geometry.radius || 28);
      }
    }
    guide.querySelectorAll("[data-effect-vertex-scope='source']").forEach((node) => {
      const point = geometry.points?.[Number(node.dataset.effectVertex)];
      if (point) setSvgPoint(node, point.x, point.y);
    });
    guide.querySelectorAll("[data-effect-vertex-scope='sourceCutout']").forEach((node) => {
      const point = geometry.cutouts?.[Number(node.dataset.effectCutout)]?.[Number(node.dataset.effectVertex)];
      if (point) setSvgPoint(node, point.x, point.y);
    });
    guide.querySelectorAll("[data-effect-mask-shape='include']").forEach((node) => {
      const points = effect.mask?.includes?.[Number(node.dataset.effectPolygonIndex)];
      if (points) node.setAttribute("d", geometryPathData(points));
    });
    guide.querySelectorAll("[data-effect-mask-shape='cutout']").forEach((node) => {
      const points = effect.mask?.cutouts?.[Number(node.dataset.effectPolygonIndex)];
      if (points) node.setAttribute("d", geometryPathData(points));
    });
    guide.querySelectorAll("[data-effect-vertex-scope='maskInclude']").forEach((node) => {
      const point = effect.mask?.includes?.[Number(node.dataset.effectPolygonIndex)]?.[Number(node.dataset.effectVertex)];
      if (point) setSvgPoint(node, point.x, point.y);
    });
    guide.querySelectorAll("[data-effect-vertex-scope='maskCutout']").forEach((node) => {
      const point = effect.mask?.cutouts?.[Number(node.dataset.effectPolygonIndex)]?.[Number(node.dataset.effectVertex)];
      if (point) setSvgPoint(node, point.x, point.y);
    });
    guide.querySelector("[data-effect-handle='move']") && setSvgPoint(guide.querySelector("[data-effect-handle='move']"), center.x, center.y);
    const label = guide.querySelector(".effectGuideLabel");
    if (label) {
      label.setAttribute("x", String(center.x + 24));
      label.setAttribute("y", String(center.y - 28));
    }
  });
  document.querySelectorAll("[data-effect-coordinate='x']").forEach((input) => { input.value = Math.round(center.x); });
  document.querySelectorAll("[data-effect-coordinate='y']").forEach((input) => { input.value = Math.round(center.y); });
}

function nudgeSelectedEffect(dx, dy) {
  const effect = selectedSceneEffect();
  if (!effect) return;
  const selected = walkPathEditor.selectedEffectVertex;
  if (selected) {
    const points = selectedEffectPolygonRef(effect, selected);
    if (points?.[selected.vertexIndex]) {
      points[selected.vertexIndex].x += dx;
      points[selected.vertexIndex].y += dy;
    }
  } else {
    translateEffectGeometry(effect.geometry, dx, dy);
    if (walkPathEditor.effectLinkedMaskMovement && effect.mask) translateEffectMask(effect.mask, dx, dy);
  }
  updateEffectGeometry(`${effect.label}: nudged ${dx}, ${dy}.`);
}

function renderDeveloperToolsPanel() {
  if (!debugOverlayEnabled || state.screen === "menu" || state.screen === "loading" || !level) return "";
  if (walkPathEditor.pathMode || walkPathEditor.effectGeometryMode) return "";

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

  if (walkPathEditor.panelCollapsed) {
    return `
      <button
        type="button"
        class="walkPathEditorRestore"
        data-debug-action="restore-editor-panel"
        aria-label="Editorpaneel herstellen"
      >
        Editor
      </button>
    `;
  }

  const point = walkPathEditor.currentPoint;
  const object = walkPathEditor.currentObject;
  const animal = walkPathEditor.currentAnimal;
  const serverDisabled = !walkPathEditor.apiAvailable || walkPathEditor.busy ? "disabled" : "";
  const statusClass = `walkPathStatus${walkPathEditor.status}`;

  return `
    <aside class="walkPathEditorPanel" data-developer-tools data-current-editor-mode="${walkPathEditor.editorMode}">
      <div class="walkPathEditorHeader">
        <strong>Developer Tools</strong>
        <button type="button" data-debug-action="collapse-editor-panel" aria-label="Editorpaneel inklappen">Minimize</button>
      </div>
      <span class="developerToolMode">Current Mode: Level Editing</span>
      <span class="${statusClass}">Draft Status: ${walkPathEditor.status}</span>
      <nav class="editorModeTabs" aria-label="Editor mode">
        <button type="button" data-editor-mode="objects" class="${walkPathEditor.editorMode === "objects" ? "editorObjectSelected" : ""}">Objects</button>
        <button type="button" data-editor-mode="effects" class="${walkPathEditor.editorMode === "effects" ? "editorObjectSelected" : ""}">Effects</button>
      </nav>
      <p>Real files change only when Apply is pressed.</p>
      ${walkPathEditor.editorMode === "objects" ? `
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
      <details class="editorSection" open><summary>Audio</summary>${renderAudioEditorControls()}</details>` : renderSceneEffectsEditorControls()}
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
        ${renderSceneEffectCanvases()}
        ${(level.ambientAnimals || []).map(renderAmbientAnimal).join("")}
        ${(level.ambientFlybys || []).map(renderAmbientFlyby).join("")}
        ${debugOverlayEnabled ? renderDebugOverlay() : ""}
        ${renderSceneEffectGuides()}
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
      ${renderEffectGeometryWorkspace()}
      ${renderDeveloperToolsPanel()}
    </section>
  `;
}

function renderSceneEffectCanvases() {
  if (!(level.sceneEffects || []).some((effect) => effect?.enabled !== false)) return "";
  return window.AtlasSceneEffects.LAYER_SLOTS.map((slot) => `
    <canvas class="sceneEffectsCanvas" data-scene-effects-canvas="${slot}" aria-hidden="true"></canvas>
  `).join("");
}

function renderSceneEffectGuides() {
  if (!EDITOR_DEV_MODE || !debugOverlayEnabled || walkPathEditor.editorMode !== "effects" || walkPathEditor.effectGeometryMode || !walkPathEditor.showEffectGuides) return "";
  const effects = (level.sceneEffects || []).filter((effect) => effect.enabled !== false);
  return `
    <svg class="sceneEffectGuides" viewBox="0 0 ${level.world.width} ${level.world.height}" preserveAspectRatio="none" data-effect-geometry-surface="scene" aria-hidden="true">
      ${effects.map((effect) => {
        const geometry = effect.geometry;
        const isSelected = effect.id === walkPathEditor.selectedEffectId;
        const selected = isSelected ? " sceneEffectGuideSelected" : "";
        if (isSelected) {
          const center = effectGeometryCenter(geometry);
          return `<g data-effect-guide="${effect.id}" class="sceneEffectGuideInteractive">
            ${renderEffectGeometryShape(effect, { includeMask: true })}
            ${(walkPathEditor.effectEditScope || "source") === "source" ? `<circle class="effectGuideCenter" cx="${center.x}" cy="${center.y}" r="10" data-effect-handle="move"></circle>` : ""}
            <text class="effectGuideLabel" x="${center.x + 24}" y="${center.y - 28}">${effect.label || effect.id}</text>
          </g>`;
        }
        if (geometry.type === "polygon") return `<path class="sceneEffectGuide${selected}" d="${geometryPathData(geometry.points)}"></path>`;
        if (geometry.type === "ellipse") return `<ellipse class="sceneEffectGuide${selected}" cx="${geometry.x}" cy="${geometry.y}" rx="${geometry.width / 2}" ry="${geometry.height / 2}"></ellipse>`;
        if (geometry.type === "rectangle") return `<rect class="sceneEffectGuide${selected}" x="${geometry.x - geometry.width / 2}" y="${geometry.y - geometry.height / 2}" width="${geometry.width}" height="${geometry.height}"></rect>`;
        if (geometry.type === "point" || geometry.type === "pointRadius") return `<circle class="sceneEffectGuide${selected}" cx="${geometry.x}" cy="${geometry.y}" r="${geometry.radius || 28}"></circle>`;
        const length = geometry.type === "directionalBeam" ? geometry.length : Math.max(120, (geometry.width || 20) * 6);
        const angle = geometry.directionDeg * Math.PI / 180;
        return `<line class="sceneEffectGuide${selected}" x1="${geometry.x}" y1="${geometry.y}" x2="${geometry.x + Math.cos(angle) * length}" y2="${geometry.y + Math.sin(angle) * length}"></line>`;
      }).join("")}
    </svg>
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
      ${debugOverlayEnabled && walkPathEditor.enabled ? `data-animal-drag="${animal.id}"` : ""}
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
  const theme = level.theme || level.subtitle;
  return `
    <main class="introScreen">
      <img class="introBackdrop" src="${level.world.background}" alt="${level.title}" />
      <section class="introPanel">
        <p class="eyebrow">${level.id}</p>
        <h1>${level.title}</h1>
        ${theme ? `<p class="introTheme">${theme}</p>` : ""}
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
  const progressLabel = level.progressLabelPlural || "runen";
  const rewardBadge = level.reward?.badge || `${state.completedRunes.size}/${level.runes.length} ${progressLabel}`;
  return `
    <main class="rewardScreen">
      <img class="rewardArt" src="${level.reward.art}" alt="Sven voor de geopende tempelpoort" />
      <section class="rewardPanel">
        <p class="eyebrow">${level.id}</p>
        <h1>${level.reward.title}</h1>
        <p>${level.reward.line}</p>
        <div class="badge">${rewardBadge}</div>
        <div class="stats">
          <span>${state.answered} opdrachten</span>
          <span>${getAccuracy()}% in één keer goed</span>
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
  sceneEffectRuntime.sync();
  const editorPanel = document.querySelector("[data-developer-tools]");
  if (editorPanel) editorPanel.scrollTop = editorScrollTop;
}

app.addEventListener("click", (event) => {
  ensureAudioUnlocked();
  const editorMode = event.target.closest(".editorModeTabs button[data-editor-mode]");
  if (editorMode) {
    event.preventDefault();
    event.stopPropagation();
    walkPathEditor.editorMode = editorMode.dataset.editorMode;
    render();
    return;
  }
  const effectSelector = event.target.closest("[data-select-effect]");
  if (effectSelector) {
    event.preventDefault();
    event.stopPropagation();
    walkPathEditor.selectedEffectId = effectSelector.dataset.selectEffect;
    sceneEffectRuntime.setVisibility("all", walkPathEditor.selectedEffectId);
    walkPathEditor.effectVisibility = "all";
    render();
    return;
  }
  const addEffectTarget = event.target.closest("[data-add-effect]");
  if (addEffectTarget) {
    event.preventDefault();
    event.stopPropagation();
    const select = document.querySelector(`[data-effect-library-variant="${CSS.escape(addEffectTarget.dataset.addEffect)}"]`);
    addSceneEffect(addEffectTarget.dataset.addEffect, select?.value);
    return;
  }
  const resetEffectFieldTarget = event.target.closest("[data-effect-reset-field]");
  if (resetEffectFieldTarget) {
    event.preventDefault();
    resetSceneEffectField(resetEffectFieldTarget.dataset.effectResetField);
    return;
  }
  const resetEffectSectionTarget = event.target.closest("[data-effect-reset-section]");
  if (resetEffectSectionTarget) {
    event.preventDefault();
    resetSceneEffectSection(resetEffectSectionTarget.dataset.effectResetSection);
    return;
  }
  const shareGroupFieldTarget = event.target.closest("[data-share-group-field]");
  if (shareGroupFieldTarget) {
    event.preventDefault();
    const field = shareGroupFieldTarget.dataset.shareGroupField;
    updateSceneEffectGroup(field, effectControlValue(selectedSceneEffect(), field));
    return;
  }
  const effectVertex = event.target.closest("[data-effect-vertex]");
  if (effectVertex) {
    event.preventDefault();
    event.stopPropagation();
    walkPathEditor.selectedEffectVertex = {
      target: effectVertex.dataset.effectVertexScope || "source",
      polygonIndex: effectVertex.dataset.effectPolygonIndex === "" ? undefined : Number(effectVertex.dataset.effectPolygonIndex),
      cutoutIndex: effectVertex.dataset.effectCutout === "" ? null : Number(effectVertex.dataset.effectCutout),
      vertexIndex: Number(effectVertex.dataset.effectVertex)
    };
    render();
    return;
  }
  const effectEdge = event.target.closest("[data-effect-edge]");
  if (effectEdge) {
    event.preventDefault();
    event.stopPropagation();
    insertEffectVertex(Number(effectEdge.dataset.effectEdge), {
      target: effectEdge.dataset.effectEdgeScope || "source",
      polygonIndex: effectEdge.dataset.effectPolygonIndex === "" ? undefined : Number(effectEdge.dataset.effectPolygonIndex),
      cutoutIndex: effectEdge.dataset.effectCutout === "" ? null : Number(effectEdge.dataset.effectCutout)
    });
    return;
  }
  const effectHandleClick = event.target.closest("[data-effect-handle]");
  if (effectHandleClick && walkPathEditor.editorMode === "effects") {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (event.target.closest(".sceneEffectGuides") && walkPathEditor.editorMode === "effects") {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  if (event.target.closest("[data-effect-geometry-workspace]") && !event.target.closest("[data-debug-action], input, label, [data-effect-handle], [data-effect-vertex], [data-effect-edge]")) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
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
    if (action === "collapse-editor-panel") {
      walkPathEditor.panelCollapsed = true;
      render();
    }
    if (action === "restore-editor-panel") {
      walkPathEditor.panelCollapsed = false;
      render();
    }
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
    if (action === "edit-effect-geometry") {
      walkPathEditor.effectGeometryMode = true;
      walkPathEditor.effectViewBox = { x: 0, y: 0, width: level.world.width, height: level.world.height };
      walkPathEditor.selectedEffectVertex = null;
      walkPathEditor.effectPolygonDraft = null;
      render();
    }
    if (action === "done-effect-geometry") {
      walkPathEditor.effectGeometryMode = false;
      walkPathEditor.effectDrag = null;
      walkPathEditor.effectPolygonDraft = null;
      render();
    }
    if (action === "effect-edit-source" || action === "effect-edit-mask" || action === "effect-edit-cutout") {
      walkPathEditor.effectEditScope = action.replace("effect-edit-", "");
      walkPathEditor.selectedEffectVertex = null;
      walkPathEditor.effectPolygonDraft = null;
      render();
    }
    if (action === "duplicate-effect") duplicateSceneEffect();
    if (action === "delete-effect") deleteSceneEffect();
    if (action === "copy-effect") copySceneEffect();
    if (action === "paste-effect") pasteSceneEffect();
    if (action === "create-effect-group") createSceneEffectGroup();
    if (action === "reset-effect") resetSceneEffect();
    if (action === "effect-play") sceneEffectRuntime.play();
    if (action === "effect-pause") sceneEffectRuntime.pause();
    if (action === "effect-restart") sceneEffectRuntime.restart();
    if (action === "effect-new-seed") {
      const seed = sceneEffectRuntime.generateSeed(walkPathEditor.selectedEffectId);
      if (seed !== null) {
        markEditorModified(`${walkPathEditor.selectedEffectId}: seed ${seed}.`);
        render();
      }
    }
    if (action === "effect-toggle-guides") {
      walkPathEditor.showEffectGuides = !walkPathEditor.showEffectGuides;
      render();
    }
    if (action === "effect-toggle-selected") {
      walkPathEditor.effectVisibility = walkPathEditor.effectVisibility === "selectedHidden" ? "all" : "selectedHidden";
      sceneEffectRuntime.setVisibility(walkPathEditor.effectVisibility, walkPathEditor.selectedEffectId);
      render();
    }
    if (action === "effect-isolate") {
      walkPathEditor.effectVisibility = "isolate";
      sceneEffectRuntime.setVisibility("isolate", walkPathEditor.selectedEffectId);
      render();
    }
    if (action === "effect-show-all") {
      walkPathEditor.effectVisibility = "all";
      sceneEffectRuntime.setVisibility("all", walkPathEditor.selectedEffectId);
      render();
    }
    if (action === "effect-background-only") {
      walkPathEditor.effectVisibility = "backgroundOnly";
      sceneEffectRuntime.setVisibility("backgroundOnly", walkPathEditor.selectedEffectId);
      render();
    }
    if (action === "effect-fit-level") {
      walkPathEditor.effectViewBox = { x: 0, y: 0, width: level.world.width, height: level.world.height };
      render();
    }
    if (action === "effect-fit-selected") fitSelectedEffectGeometry();
    if (action === "effect-zoom-in") setEffectViewZoom(0.75);
    if (action === "effect-zoom-out") setEffectViewZoom(1.33);
    if (action === "effect-add-cutout") addEffectCutout();
    if (action === "effect-delete-vertex") deleteSelectedEffectVertex();
    if (action === "effect-convert-polygon") updateSceneEffectField("geometryType", "polygon");
    if (action === "effect-duplicate-mask") duplicateSourceMask(selectedSceneEffect());
    if (action === "effect-reset-mask") resetEffectMask();
    if (action === "effect-reverse-polygon") reverseSelectedPolygon();
    if (action === "effect-center-source-mask") centerSourceInMask();
    if (action === "effect-draw-source-polygon") startEffectPolygonDraft("source");
    if (action === "effect-draw-mask-polygon") startEffectPolygonDraft("maskInclude");
    if (action === "effect-draw-cutout-polygon") startEffectPolygonDraft("maskCutout");
    if (action === "effect-commit-polygon") commitEffectPolygonDraft();
    if (action === "effect-cancel-polygon") cancelEffectPolygonDraft();
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
  const effectColor = event.target.closest("[data-effect-color]");
  if (effectColor) {
    updateSceneEffectOverride(effectColor.dataset.effectColor, effectColor.value);
    return;
  }
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
  const effectOverride = event.target.closest("[data-effect-override]");
  if (effectOverride) {
    updateSceneEffectOverride(effectOverride.dataset.effectOverride, effectOverride.value);
    return;
  }
  const effectHex = event.target.closest("[data-effect-hex]");
  if (effectHex) {
    updateSceneEffectOverride(effectHex.dataset.effectHex, effectHex.value);
    return;
  }
  const effectField = event.target.closest("[data-effect-field]");
  if (effectField) {
    updateSceneEffectField(
      effectField.dataset.effectField,
      effectField.type === "checkbox" ? effectField.checked : effectField.value
    );
    return;
  }
  const linkedMask = event.target.closest("[data-effect-linked-mask]");
  if (linkedMask) {
    walkPathEditor.effectLinkedMaskMovement = linkedMask.checked;
    return;
  }
  const effectBlendMode = event.target.closest("[data-effect-blend-mode]");
  if (effectBlendMode) {
    const effect = selectedSceneEffect();
    if (effect) {
      effect.overrides ||= {};
      effect.overrides.blendMode = effectBlendMode.value;
      commitSceneEffects(`${effect.label || effect.id}: blend mode updated.`);
    }
    return;
  }
  const effectCoordinate = event.target.closest("[data-effect-coordinate]");
  if (effectCoordinate) {
    updateEffectCoordinate(effectCoordinate.dataset.effectCoordinate, effectCoordinate.value);
    return;
  }
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
  const effectHandle = event.target.closest("[data-effect-handle]");
  if (effectHandle && (walkPathEditor.effectGeometryMode || walkPathEditor.editorMode === "effects")) {
    event.preventDefault();
    event.stopPropagation();
    effectHandle.setPointerCapture?.(event.pointerId);
    walkPathEditor.effectDrag = {
      type: effectHandle.dataset.effectHandle,
      polygonIndex: effectHandle.dataset.effectPolygonIndex === "" ? undefined : Number(effectHandle.dataset.effectPolygonIndex),
      last: pointFromEffectWorkspaceEvent(event)
    };
    return;
  }
  const effectVertex = event.target.closest("[data-effect-vertex]");
  if (effectVertex && (walkPathEditor.effectGeometryMode || walkPathEditor.editorMode === "effects")) {
    event.preventDefault();
    event.stopPropagation();
    effectVertex.setPointerCapture?.(event.pointerId);
    const cutoutIndex = effectVertex.dataset.effectCutout === "" ? null : Number(effectVertex.dataset.effectCutout);
    const vertexIndex = Number(effectVertex.dataset.effectVertex);
    const polygonIndex = effectVertex.dataset.effectPolygonIndex === "" ? undefined : Number(effectVertex.dataset.effectPolygonIndex);
    const target = effectVertex.dataset.effectVertexScope || "source";
    walkPathEditor.selectedEffectVertex = { target, polygonIndex, cutoutIndex, vertexIndex };
    walkPathEditor.effectDrag = { type: "vertex", target, polygonIndex, cutoutIndex, vertexIndex };
    return;
  }
  const effectWorkspace = event.target.closest("[data-effect-geometry-workspace]");
  if (effectWorkspace && walkPathEditor.effectGeometryMode) {
    event.preventDefault();
    event.stopPropagation();
    if (walkPathEditor.effectPolygonDraft) {
      addEffectDraftPoint(pointFromEffectWorkspaceEvent(event));
      return;
    }
    walkPathEditor.effectDrag = {
      type: "pan",
      clientX: event.clientX,
      clientY: event.clientY,
      view: { ...(walkPathEditor.effectViewBox || { x: 0, y: 0, width: level.world.width, height: level.world.height }) }
    };
    return;
  }
  if (event.target.closest(".sceneEffectGuides") && walkPathEditor.editorMode === "effects") {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
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
  const topEditorDragTarget = event.target.closest("[data-object-drag], [data-walkpath-index]");
  const underlyingAnimalDrag = !topEditorDragTarget && Number.isFinite(event.clientX) && Number.isFinite(event.clientY)
    ? document.elementsFromPoint(event.clientX, event.clientY)
      .find((element) => element.closest?.("[data-animal-drag]"))
      ?.closest("[data-animal-drag]")
    : null;
  const animalTarget = (!topEditorDragTarget && event.target.closest("[data-animal-drag]")) || underlyingAnimalDrag;
  if (animalTarget && walkPathEditor.enabled && debugOverlayEnabled) {
    event.preventDefault();
    event.stopPropagation();
    animalTarget.setPointerCapture?.(event.pointerId);
    walkPathEditor.draggingAnimalId = animalTarget.dataset.animalDrag;
    walkPathEditor.selectedObjectType = "animal";
    walkPathEditor.selectedObjectId = animalTarget.dataset.animalDrag;
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
  if (walkPathEditor.effectDrag) {
    event.preventDefault();
    updateEffectDrag(event);
    return;
  }
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
  if (walkPathEditor.effectDrag && walkPathEditor.effectDrag.type !== "pan") {
    const effect = selectedSceneEffect();
    if (effect) {
      sceneEffectRuntime.prepareLevel(level);
      markEditorModified(`${effect.label || effect.id}: geometry updated.`);
      render();
    }
  }
  walkPathEditor.effectDrag = null;
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
    sceneEffectRuntime.stop();
    Object.values(guideBlinkRuntime).forEach(clearGuideBlinkState);
  } else {
    syncAmbientAnimalTimers();
    syncGuideBlinkTimers();
    ambientFlybyRuntime.sync();
    sceneEffectRuntime.sync();
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
    return;
  }
  const editingText = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement;
  if (!editingText && walkPathEditor.effectPolygonDraft && ["Enter", "Escape", "Backspace"].includes(event.key)) {
    event.preventDefault();
    if (event.key === "Enter") commitEffectPolygonDraft();
    if (event.key === "Escape") cancelEffectPolygonDraft();
    if (event.key === "Backspace") {
      walkPathEditor.effectPolygonDraft.points.pop();
      syncEffectDraftDom();
    }
    return;
  }
  if (!editingText && walkPathEditor.effectGeometryMode && ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) {
    event.preventDefault();
    const amount = event.shiftKey ? 10 : 1;
    nudgeSelectedEffect(
      event.key === "ArrowLeft" ? -amount : event.key === "ArrowRight" ? amount : 0,
      event.key === "ArrowUp" ? -amount : event.key === "ArrowDown" ? amount : 0
    );
    return;
  }
  if (!editingText && walkPathEditor.editorMode === "effects" && event.ctrlKey && event.key.toLowerCase() === "c") {
    event.preventDefault();
    copySceneEffect();
    return;
  }
  if (!editingText && walkPathEditor.editorMode === "effects" && event.ctrlKey && event.key.toLowerCase() === "v") {
    event.preventDefault();
    pasteSceneEffect();
    return;
  }
  if (!editingText && walkPathEditor.effectGeometryMode && (event.key === "Delete" || event.key === "Backspace") && walkPathEditor.selectedEffectVertex) {
    event.preventDefault();
    deleteSelectedEffectVertex();
    return;
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
