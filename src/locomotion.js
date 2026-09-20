(function initAtlasLocomotion(global) {
  "use strict";

  const BASE_FPS = 24;
  const FRAME_MS = 1000 / BASE_FPS;
  const animationSet = (id = "sven") => global.AtlasPlayableCharacters.animationSet(id);
  const ANIMATIONS = animationSet();
  const DEFAULT_CONFIG = global.AtlasPlayableCharacters.defaultLocomotion.sven;

  function phaseForState(state) {
    if (state.endsWith("FromIdle")) return "fromIdle";
    if (state.endsWith("Loop")) return "loop";
    if (state.endsWith("ToIdle")) return "toIdle";
    if (state.startsWith("turn")) return "turn";
    return "idle";
  }

  function phaseAnimationSpeed(config, state) {
    return Number(config[`${phaseForState(state)}AnimationSpeed`] ?? 1);
  }

  function isMovementState(state) {
    return ["fromIdle", "loop", "toIdle", "turn"].includes(phaseForState(state));
  }

  function frameUrl(state, frameIndex, characterId = "sven") {
    const set = animationSet(characterId), animation = set[state] || set.idle;
    return animation.urls[Math.max(0, Math.min(animation.frames - 1, frameIndex))];
  }
  function allFrameUrls(characterId = "sven") { return Object.values(animationSet(characterId)).flatMap(animation => animation.urls); }
  function animationDuration(state, animationSpeed = 1, stateSpeed = 1, characterId = "sven") {
    const set = animationSet(characterId), animation = set[state] || set.idle;
    return (animation.frames * FRAME_MS) / Math.max(0.01, animationSpeed * stateSpeed);
  }

  function loadDecodedImage(src, ImageCtor = global.Image) {
    return new Promise((resolve, reject) => {
      const image = new ImageCtor();
      let settled = false;
      const fail = () => {
        if (settled) return;
        settled = true;
        reject(new Error(`[Atlas] Sven sprite failed to load: ${src}`));
      };
      const ready = async () => {
        if (settled) return;
        try {
          if (typeof image.decode === "function") await image.decode();
          settled = true;
          resolve(image);
        } catch (error) {
          fail(error);
        }
      };
      image.onload = ready;
      image.onerror = fail;
      image.src = src;
      if (image.complete && image.naturalWidth) ready();
    });
  }

  const preloadPromises = new Map();
  const decodedImages = new Map();
  function preloadAll(options = {}) {
    const characterId = options.characterId || "sven";
    if (preloadPromises.has(characterId) && !options.force) return preloadPromises.get(characterId);
    const loader = options.loader || ((src) => loadDecodedImage(src, options.ImageCtor));
    const preloadPromise = Promise.all(allFrameUrls(characterId).map(async (src) => {
      try {
        const image = await loader(src);
        decodedImages.set(src, image);
        return image;
      } catch (error) {
        console.error(error.message || error);
        throw error;
      }
    }));
    preloadPromises.set(characterId, preloadPromise);
    preloadPromise.catch(() => preloadPromises.delete(characterId));
    return preloadPromise;
  }

  function directionState(prefix, direction) {
    return `${prefix}${direction === "left" ? "Left" : "Right"}`;
  }

  function createController(options = {}) {
    let characterId = options.characterId || "sven";
    let ANIMATIONS = animationSet(characterId);
    let state = "idle";
    let desiredDirection = null;
    let facing = "right";
    let startedAt = 0;
    let lastFrame = -1;
    let stateSpeed = 1;
    let statePhaseSpeedMultiplier = 1;
    let stateFrameStart = 0;
    let stateFrameLimit = null;
    let rafId = null;
    let blinkTimer = null;
    const idleListeners = new Set();

    const getConfig = () => ({ ...global.AtlasPlayableCharacters.defaultLocomotion[characterId], ...(options.getConfig?.() || {}) });
    const getAnimationSpeed = () => Math.max(0.1, Number(options.getAnimationSpeed?.() || 1));
    const effectiveAnimationSpeed = (forState = state) => Math.max(
      0.1,
      getAnimationSpeed() * phaseAnimationSpeed(getConfig(), forState) * statePhaseSpeedMultiplier * stateSpeed
    );
    const emitState = () => options.onState?.(state, facing);
    const emitFrame = (frame) => options.onFrame?.(state, frame, ANIMATIONS[state].urls[frame]);

    function clearBlinkTimer() {
      global.clearTimeout(blinkTimer);
      blinkTimer = null;
    }

    function scheduleBlink() {
      clearBlinkTimer();
      if (state !== "idle" || desiredDirection) return;
      const config = getConfig();
      const minimum = Math.max(250, Number(config.blinkMinimumInterval) || DEFAULT_CONFIG.blinkMinimumInterval);
      const maximum = Math.max(minimum, Number(config.blinkMaximumInterval) || DEFAULT_CONFIG.blinkMaximumInterval);
      const delay = options.blinkDelay?.() ?? minimum + Math.random() * (maximum - minimum);
      blinkTimer = global.setTimeout(() => {
        if (state === "idle" && !desiredDirection) transition("idleBlink");
      }, delay);
    }

    function transition(next, speed = 1, timestamp = global.performance?.now?.() || Date.now(), transitionOptions = {}) {
      if (!ANIMATIONS[next]) next = "idle";
      state = next;
      stateSpeed = Math.max(0.1, Number(speed) || 1);
      statePhaseSpeedMultiplier = Number.isFinite(Number(transitionOptions.phaseSpeedMultiplier))
        ? Math.max(0.1, Number(transitionOptions.phaseSpeedMultiplier))
        : 1;
      stateFrameStart = Number.isInteger(transitionOptions.frameStart)
        ? Math.max(0, Math.min(ANIMATIONS[next].frames - 1, transitionOptions.frameStart))
        : 0;
      stateFrameLimit = Number.isInteger(transitionOptions.frameLimit)
        ? Math.max(stateFrameStart, Math.min(ANIMATIONS[next].frames - 1, transitionOptions.frameLimit))
        : null;
      startedAt = timestamp;
      lastFrame = stateFrameStart;
      const direction = ANIMATIONS[state].direction;
      if (direction) facing = direction;
      if (state !== "idle") clearBlinkTimer();
      emitState();
      emitFrame(stateFrameStart);
      if (state === "idle") {
        idleListeners.forEach((listener) => listener());
        scheduleBlink();
      }
      ensureRunning();
    }

    function complete(timestamp) {
      if (state === "idleBlink") return transition(desiredDirection ? directionState("walk", desiredDirection) + "FromIdle" : "idle", 1, timestamp);
      if (state.endsWith("FromIdle")) {
        if (!desiredDirection) return transition(directionState("walk", facing) + "ToIdle", 1, timestamp);
        if (desiredDirection !== facing) return transition(facing === "left" ? "turnLeftToRight" : "turnRightToLeft", 1, timestamp);
        return transition(directionState("walk", facing) + "Loop", 1, timestamp);
      }
      if (state.startsWith("turn")) {
        if (!desiredDirection) return transition(directionState("walk", facing) + "ToIdle", 1, timestamp);
        if (desiredDirection !== facing) return transition(facing === "left" ? "turnLeftToRight" : "turnRightToLeft", 1, timestamp);
        return transition(directionState("walk", facing) + "Loop", 1, timestamp);
      }
      if (state.endsWith("ToIdle")) {
        if (desiredDirection) return transition(directionState("walk", desiredDirection) + "FromIdle", 1, timestamp);
        return transition("idle", 1, timestamp);
      }
    }

    function tick(timestamp) {
      rafId = null;
      const animation = ANIMATIONS[state];
      const elapsed = Math.max(0, timestamp - startedAt);
      const frameFloat = elapsed / (FRAME_MS / effectiveAnimationSpeed());
      const rawFrame = animation.loop
        ? Math.floor(frameFloat) % animation.frames
        : Math.min(animation.frames - 1, stateFrameStart + Math.floor(frameFloat));
      const frame = stateFrameLimit === null ? rawFrame : Math.min(rawFrame, stateFrameLimit);
      if (frame !== lastFrame) {
        lastFrame = frame;
        emitFrame(frame);
      }
      if (!animation.loop && stateFrameLimit === null && frameFloat >= animation.frames) complete(timestamp);
      ensureRunning();
    }

    function ensureRunning() {
      if (!rafId && (state !== "idle" || ANIMATIONS.idle.frames > 1)) rafId = global.requestAnimationFrame(tick);
    }

    function setIntent(direction, intentOptions = {}) {
      desiredDirection = direction === "left" || direction === "right" ? direction : null;
      if (desiredDirection) {
        clearBlinkTimer();
        if (state === "idle" || state === "idleBlink") return transition(
          directionState("walk", desiredDirection) + "FromIdle",
          intentOptions.playbackSpeed || 1,
          undefined,
          intentOptions
        );
        if (state.endsWith("ToIdle")) {
          if (facing !== desiredDirection) return transition(facing === "left" ? "turnLeftToRight" : "turnRightToLeft");
          return transition(directionState("walk", desiredDirection) + "Loop");
        }
        if (facing !== desiredDirection && !state.startsWith("turn")) {
          return transition(facing === "left" ? "turnLeftToRight" : "turnRightToLeft");
        }
        return;
      }
      if (state === "idle" || state === "idleBlink") return transition("idle");
      if (!state.endsWith("ToIdle")) transition(directionState("walk", facing) + "ToIdle", intentOptions.playbackSpeed || 1);
    }

    function startTransitionWindow(phase, direction, windowOptions = {}) {
      const normalizedDirection = direction === "left" ? "left" : "right";
      desiredDirection = phase === "fromIdle" ? normalizedDirection : null;
      clearBlinkTimer();
      transition(
        directionState("walk", normalizedDirection) + (phase === "toIdle" ? "ToIdle" : "FromIdle"),
        1,
        undefined,
        {
          phaseSpeedMultiplier: windowOptions.animationSpeedMultiplier,
          frameStart: windowOptions.frameStart,
          frameLimit: windowOptions.frameLimit
        }
      );
    }

    function attach() {
      emitState();
      emitFrame(Math.max(0, lastFrame));
      if (state === "idle") scheduleBlink();
      else ensureRunning();
    }

    function reset() {
      desiredDirection = null;
      clearBlinkTimer();
      if (rafId) global.cancelAnimationFrame(rafId);
      rafId = null;
      state = "idle";
      facing = "right";
      startedAt = 0;
      lastFrame = 0;
      stateSpeed = 1;
      statePhaseSpeedMultiplier = 1;
      stateFrameStart = 0;
      stateFrameLimit = null;
      attach();
    }

    function completeArrival() {
      desiredDirection = null;
      transition("idle");
    }

    function stateDuration(forState = state, playbackSpeed = stateSpeed) {
      return animationDuration(
        forState,
        getAnimationSpeed() * phaseAnimationSpeed(getConfig(), forState),
        playbackSpeed, characterId
      );
    }

    return {
      setCharacter(id) { const next = animationSet(id); characterId = id; ANIMATIONS = next; reset(); },
      setIntent,
      startTransitionWindow,
      attach,
      reset,
      transition,
      completeArrival,
      onIdle(listener) { idleListeners.add(listener); return () => idleListeners.delete(listener); },
      snapshot: () => {
        const elapsed = Math.max(0, (global.performance?.now?.() || Date.now()) - startedAt);
        const duration = stateDuration(state);
        return {
          characterId,
          state,
          phase: phaseForState(state),
          desiredDirection,
          facing,
          frameIndex: Math.max(0, lastFrame),
          stateSpeed,
          phaseSpeedMultiplier: statePhaseSpeedMultiplier,
          frameStart: stateFrameStart,
          frameLimit: stateFrameLimit,
          elapsed,
          duration,
          progress: ANIMATIONS[state].loop ? 0 : Math.min(1, elapsed / Math.max(1, duration))
        };
      },
      stateDuration,
      stopDuration: (direction, playbackSpeed = 1) => stateDuration(directionState("walk", direction) + "ToIdle", playbackSpeed)
    };
  }

  global.AtlasLocomotion = {
    BASE_FPS,
    FRAME_MS,
    DEFAULT_CONFIG,
    ANIMATIONS,
    animationSet,
    phaseForState,
    isMovementState,
    frameUrl,
    allFrameUrls,
    animationDuration,
    loadDecodedImage,
    preloadAll,
    decodedImages,
    createController
  };
})(window);
