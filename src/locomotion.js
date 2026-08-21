(function initAtlasLocomotion(global) {
  "use strict";

  const BASE_FPS = 24;
  const FRAME_MS = 1000 / BASE_FPS;
  const ANIMATIONS = {
    idle: { folder: "idle", frames: 1, loop: true },
    idleBlink: { folder: "idle_blink", frames: 13, loop: false },
    turnLeftToRight: { folder: "turn_from_left_to_right", frames: 12, loop: false, direction: "right" },
    turnRightToLeft: { folder: "turn_from_right_to_left", frames: 19, loop: false, direction: "left" },
    walkLeftFromIdle: { folder: "walk_left_from_idle", frames: 22, loop: false, direction: "left" },
    walkLeftLoop: { folder: "walk_left_loop", frames: 13, loop: true, direction: "left" },
    walkLeftToIdle: { folder: "walk_left_to_idle", frames: 18, loop: false, direction: "left" },
    walkRightFromIdle: { folder: "walk_right_from_idle", frames: 16, loop: false, direction: "right" },
    walkRightLoop: { folder: "walk_right_loop", frames: 13, loop: true, direction: "right" },
    walkRightToIdle: { folder: "walk_right_to_idle", frames: 16, loop: false, direction: "right" }
  };
  const BASE_PATH = "assets/characters/sven";
  const DEFAULT_CONFIG = Object.freeze({
    fromIdleMovement: 0.72,
    loopMovement: 1,
    toIdleMovement: 0.36,
    toIdleMaxDistance: 46,
    turnMovement: 0.78,
    stopEntryDistance: 56,
    shortMoveThreshold: 90,
    fromIdleAnimationSpeed: 1.1,
    loopAnimationSpeed: 1,
    toIdleAnimationSpeed: 1.15,
    turnAnimationSpeed: 1.15,
    arrivalDynamicSpeedMin: 0.85,
    arrivalDynamicSpeedMax: 1.2,
    blinkMinimumInterval: 3000,
    blinkMaximumInterval: 8000
  });

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

  function frameUrl(state, frameIndex) {
    const animation = ANIMATIONS[state] || ANIMATIONS.idle;
    return `${BASE_PATH}/${animation.folder}/frame_${String(frameIndex + 1).padStart(3, "0")}.png`;
  }

  function allFrameUrls() {
    return Object.keys(ANIMATIONS).flatMap((state) =>
      Array.from({ length: ANIMATIONS[state].frames }, (_, index) => frameUrl(state, index))
    );
  }

  function animationDuration(state, animationSpeed = 1, stateSpeed = 1) {
    const animation = ANIMATIONS[state] || ANIMATIONS.idle;
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

  let preloadPromise = null;
  const decodedImages = new Map();
  function preloadAll(options = {}) {
    if (preloadPromise && !options.force) return preloadPromise;
    const loader = options.loader || ((src) => loadDecodedImage(src, options.ImageCtor));
    preloadPromise = Promise.all(allFrameUrls().map(async (src) => {
      try {
        const image = await loader(src);
        decodedImages.set(src, image);
        return image;
      } catch (error) {
        console.error(error.message || error);
        throw error;
      }
    }));
    return preloadPromise;
  }

  function directionState(prefix, direction) {
    return `${prefix}${direction === "left" ? "Left" : "Right"}`;
  }

  function createController(options = {}) {
    let state = "idle";
    let desiredDirection = null;
    let facing = "right";
    let startedAt = 0;
    let lastFrame = -1;
    let stateSpeed = 1;
    let rafId = null;
    let blinkTimer = null;
    const idleListeners = new Set();

    const getConfig = () => ({ ...DEFAULT_CONFIG, ...(options.getConfig?.() || {}) });
    const getAnimationSpeed = () => Math.max(0.1, Number(options.getAnimationSpeed?.() || 1));
    const effectiveAnimationSpeed = (forState = state) => Math.max(
      0.1,
      getAnimationSpeed() * phaseAnimationSpeed(getConfig(), forState) * stateSpeed
    );
    const emitState = () => options.onState?.(state, facing);
    const emitFrame = (frame) => options.onFrame?.(state, frame, frameUrl(state, frame));

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

    function transition(next, speed = 1, timestamp = global.performance?.now?.() || Date.now()) {
      if (!ANIMATIONS[next]) next = "idle";
      state = next;
      stateSpeed = Math.max(0.1, Number(speed) || 1);
      startedAt = timestamp;
      lastFrame = -1;
      const direction = ANIMATIONS[state].direction;
      if (direction) facing = direction;
      if (state !== "idle") clearBlinkTimer();
      emitState();
      emitFrame(0);
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
      const frame = animation.loop
        ? Math.floor(frameFloat) % animation.frames
        : Math.min(animation.frames - 1, Math.floor(frameFloat));
      if (frame !== lastFrame) {
        lastFrame = frame;
        emitFrame(frame);
      }
      if (!animation.loop && frameFloat >= animation.frames) complete(timestamp);
      ensureRunning();
    }

    function ensureRunning() {
      if (!rafId && state !== "idle") rafId = global.requestAnimationFrame(tick);
    }

    function setIntent(direction, intentOptions = {}) {
      desiredDirection = direction === "left" || direction === "right" ? direction : null;
      if (desiredDirection) {
        clearBlinkTimer();
        if (state === "idle" || state === "idleBlink") return transition(directionState("walk", desiredDirection) + "FromIdle", intentOptions.playbackSpeed || 1);
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
        playbackSpeed
      );
    }

    return {
      setIntent,
      attach,
      reset,
      transition,
      completeArrival,
      onIdle(listener) { idleListeners.add(listener); return () => idleListeners.delete(listener); },
      snapshot: () => {
        const elapsed = Math.max(0, (global.performance?.now?.() || Date.now()) - startedAt);
        const duration = stateDuration(state);
        return {
          state,
          phase: phaseForState(state),
          desiredDirection,
          facing,
          frameIndex: Math.max(0, lastFrame),
          stateSpeed,
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
