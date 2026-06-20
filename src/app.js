const app = document.querySelector("#app");
const levelCatalog = window.SVEN_LEVEL_MANIFEST?.levels || [];
const visibleLevelCatalog = () => levelCatalog.filter((item) => !item.hiddenFromMenu);
window.SVEN_LEVEL_DEFINITIONS = window.SVEN_LEVEL_DEFINITIONS || {};
let level = null;
let walkNodesById = new Map();
let debugOverlayEnabled = false;

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

function setLevelWalkPath(walkPath) {
  level.walkPath = cloneWalkPath(walkPath);
  level.walkGraph = deriveWalkGraph(level);
  walkNodesById = new Map(level.walkGraph.nodes.map((node) => [node.id, node]));
}

function setLevelInteractiveObjects(objects) {
  level.interactiveObjects = cloneInteractiveObjects(objects);
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
    originalAudioConfig: cloneAudioConfig(audioConfig),
    draggingIndex: null,
    draggingObjectId: null,
    draggingObjectMode: null,
    currentPoint: null,
    currentObject: null,
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
    if (draft.audioConfig) {
      setAudioConfig(draft.audioConfig);
    }
    if (Array.isArray(draft.walkPath) || Array.isArray(draft.interactiveObjects) || draft.audioConfig) {
      walkPathEditor.status = "Modified";
      walkPathEditor.modified = true;
      walkPathEditor.message = "Draft geladen. Test veilig verder.";
    }
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
    selectedLevel.challengeArt,
    selectedLevel.reward?.art
  ]
    .filter(Boolean)
    .forEach((src) => {
      const image = new Image();
      image.src = src;
    });
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

  stopMovement();
  await prepareWalkPathEditorForLevel(selectedLevel);
  level = normalizeLevel(selectedLevel);
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

function returnToMenu() {
  stopMovement();
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
  const center = worldToScreen(object.center, "track");
  const size = worldDiameterToTrackSize(object.radius * 2);
  return `left:${center.x}%; top:${center.y}%; width:${size.width}%; height:${size.height}%`;
}

function objectScreenAnchor(object) {
  return worldToScreen(object.center, "viewport");
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
        audioConfig
      })
    });
    walkPathEditor.originalWalkPath = cloneWalkPath(authoredWalkPathPoints(level));
    walkPathEditor.originalInteractiveObjects = cloneInteractiveObjects(level.interactiveObjects);
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
    setAudioConfig(walkPathEditor.originalAudioConfig);
    walkPathEditor.currentPoint = null;
    walkPathEditor.currentObject = null;
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
  if (Array.isArray(rune.challengeIds)) {
    return rune.challengeIds
      .map((id) => level.learningChallenges?.find((challenge) => challenge.id === id))
      .filter(Boolean);
  }
  return shuffleQuestions(rune.questions).slice(0, 4);
}

function currentChallengeQuestions() {
  return state.activeQuestions?.length ? state.activeQuestions : runeById(state.activeRuneId).questions;
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
  const action = actionForTarget(target, kind);
  const interactionToken = ++state.interactionToken;

  state.justCompletedRuneId = null;
  walkRoute(routeTo(target), () => {
    if (state.interactionToken !== interactionToken) return;
    arriveAtInteraction(target, kind, action, interactionToken);
  });
}

function selectChallenge(target) {
  if (!target || state.screen !== "scene") return;
  if (state.completedRunes.has(target.id)) {
    emitCompanionEvent("CHALLENGE_SUCCESS", {
      objectId: target.objectId || target.id,
      challengeId: target.id
    });
    render();
    return;
  }

  state.selectedChallengeId = target.id;
  emitCompanionEvent("HOTSPOT_ATTENTION_FIRST", {
    objectId: target.objectId || target.id,
    challengeId: target.id
  });
  beginInteraction(target, "rune");
}

function inspectAmbientTarget(target) {
  if (!target || state.moving || state.screen !== "scene") return;
  state.selectedChallengeId = null;
  const objectId = target.objectId || target.id;
  const firstLook = !state.seenObjects.has(objectId);
  if (firstLook) state.seenObjects.add(objectId);
  const firstAttention = firstLook && authoredCompanionMoments("AMBIENT_ATTENTION_FIRST", { objectId }).length > 0;
  emitCompanionEvent(firstAttention ? "AMBIENT_ATTENTION_FIRST" : "AMBIENT_ATTENTION", { objectId });
  render();
}

function completeCurrentSceneChallenges() {
  if (!level || !["scene", "challenge", "correct"].includes(state.screen)) return;
  stopMovement();
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
    if (!state.moving || state.interactionToken !== interactionToken) return;
    state.svenMood = action === "look" ? "looking" : action === "talk" ? "talking" : "activating";
    render();

    window.setTimeout(() => {
      if (!state.moving || state.interactionToken !== interactionToken) return;
      finishInteraction(target, kind, action);
    }, action === "activate" || action === "travel" ? 820 : 560);
  }, 180);
}

function finishInteraction(target, kind, action) {
  const exitHotspotId = level.exitHotspotId || "templeGate";

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

  state.interactionToken += 1;
  state.justCompletedRuneId = null;
  state.selectedChallengeId = null;
  walkRoute(routeToPoint(point), () => {
    state.moving = false;
    state.svenMood = "idle";
    playQueuedCompanionMoment();
    render();
  });
}

function openRuneChallenge(id) {
  const rune = runeById(id);
  const authored = Array.isArray(rune.challengeIds);
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

  if (submitted !== correct) {
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
      setGuideMessage({ speaker: "minnie", text: question.hintMinnie }, "minnie");
      state.feedback = "";
    } else if (authored && failureCount === 2) {
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
    if (questions[state.questionIndex].answerMode) {
      if (state.challengeGuideMessage) setGuideMessage(state.challengeGuideMessage, state.challengeGuideMessage.speaker);
      state.feedback = "";
    } else {
      state.feedback = "De rune wil nog een som.";
    }
    state.screen = "challenge";
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

  stopMovement();
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
  stopMovement();
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

function renderDeveloperToolsPanel() {
  if (!debugOverlayEnabled || state.screen === "menu" || state.screen === "loading" || !level) return "";

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
        <li>Adjust audio volumes</li>
        <li>Test movement</li>
        <li>Apply saves level and audio files</li>
        <li>Revert restores the saved path, objects and audio</li>
      </ol>
      <p>Real files change only when Apply is pressed.</p>
      <span>${
        object
          ? `${object.id}: ${object.center.x}, ${object.center.y}, radius ${object.radius}`
          : point
            ? `${point.id}: ${point.x}, ${point.y}`
            : "Drag a path point or object."
      }</span>
      ${renderAudioEditorControls()}
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
  const selected = state.selectedChallengeId === rune.id;
  const disabled = state.screen !== "scene" || (state.moving && !VIKING_LEVEL_IDS.has(level.id));
  const object = interactiveObjectForTarget(rune);
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
      <img src="${guide.portrait}" alt="${guide.name}" />
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
      <div class="challengeBox runeChallengeBox">
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
  if (state.screen === "launch") {
    app.innerHTML = renderLaunch();
  } else if (state.screen === "menu") {
    app.innerHTML = renderMenu();
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
}

app.addEventListener("click", (event) => {
  ensureAudioUnlocked();
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
    return;
  }

  const purrTarget = event.target.closest("[data-purr-guide]");
  if (purrTarget) {
    event.preventDefault();
    event.stopPropagation();
    playGuidePurr(purrTarget.dataset.purrGuide);
    return;
  }

  const levelTarget = event.target.closest("[data-level]");
  if (levelTarget) {
    playSfx("uiClick");
    selectLevel(levelTarget.dataset.level);
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
    answerQuestion(Number(choiceTarget.dataset.choice));
    return;
  }

  const stageTarget = event.target.closest("[data-world-stage]");
  if (stageTarget) {
    beginFreeWalk(pointFromViewportEvent(event, stageTarget));
  }
});

app.addEventListener("input", (event) => {
  const input = event.target.closest("[data-audio-path]");
  if (!input) return;
  updateAudioDraft(input.dataset.audioPath, input.value);
});

app.addEventListener("pointerdown", (event) => {
  ensureAudioUnlocked();
  const objectTarget = event.target.closest("[data-object-drag]");
  if (objectTarget && walkPathEditor.enabled && debugOverlayEnabled) {
    event.preventDefault();
    walkPathEditor.draggingObjectId = objectTarget.dataset.objectId;
    walkPathEditor.draggingObjectMode = objectTarget.dataset.objectDrag;
    walkPathEditor.draggingIndex = null;
    updateDraggedInteractiveObject(event);
    return;
  }

  const pointTarget = event.target.closest("[data-walkpath-index]");
  if (!pointTarget || !walkPathEditor.enabled || !debugOverlayEnabled) return;
  event.preventDefault();
  walkPathEditor.draggingIndex = Number(pointTarget.dataset.walkpathIndex);
  walkPathEditor.draggingObjectId = null;
  walkPathEditor.draggingObjectMode = null;
  updateDraggedWalkPathPoint(event);
});

window.addEventListener("pointermove", (event) => {
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
});

window.addEventListener("resize", updateWorldDom);

window.addEventListener("keydown", (event) => {
  ensureAudioUnlocked();
  if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "c") {
    event.preventDefault();
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
registerServiceWorker();
render();
