(function () {
  "use strict";

  const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp"]);
  const AUDIO_EXTENSIONS = new Set([".mp3", ".ogg", ".wav"]);

  function normalizedAssetPath(value) {
    return String(value || "").trim().replace(/\\/g, "/").replace(/^\.\//, "");
  }

  function extensionFor(value) {
    const path = normalizedAssetPath(value).split(/[?#]/)[0];
    const dot = path.lastIndexOf(".");
    return dot === -1 ? "" : path.slice(dot).toLowerCase();
  }

  function createAssetCache(options = {}) {
    const images = new Map();
    const audio = new Map();
    const warn = options.warn || (() => {});

    function image(path) {
      const key = normalizedAssetPath(path);
      if (!key) return Promise.reject(new Error("Missing image path."));
      if (!IMAGE_EXTENSIONS.has(extensionFor(key))) {
        return Promise.reject(new Error(`Unsupported image: ${key}`));
      }
      if (images.has(key)) return images.get(key);
      const promise = new Promise((resolve, reject) => {
        const element = new Image();
        let settled = false;
        const fail = () => {
          if (settled) return;
          settled = true;
          reject(new Error(`Image failed: ${key}`));
        };
        const finish = async () => {
          if (settled) return;
          try {
            if (typeof element.decode === "function") await element.decode();
            settled = true;
            resolve(element);
          } catch {
            if (element.complete && element.naturalWidth) {
              settled = true;
              resolve(element);
            } else {
              fail();
            }
          }
        };
        element.decoding = "sync";
        element.addEventListener("load", finish, { once: true });
        element.addEventListener("error", fail, { once: true });
        element.src = key;
        if (element.complete && element.naturalWidth) finish();
      }).catch((error) => {
        warn(error.message);
        throw error;
      });
      images.set(key, promise);
      return promise;
    }

    function sound(path) {
      const key = normalizedAssetPath(path);
      if (!key) return Promise.resolve(null);
      if (!AUDIO_EXTENSIONS.has(extensionFor(key))) {
        return Promise.reject(new Error(`Unsupported audio: ${key}`));
      }
      if (audio.has(key)) return audio.get(key);
      const promise = new Promise((resolve, reject) => {
        const element = new Audio();
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          resolve(element);
        };
        const fail = () => {
          if (settled) return;
          settled = true;
          reject(new Error(`Audio failed: ${key}`));
        };
        element.preload = "auto";
        element.addEventListener("canplaythrough", finish, { once: true });
        element.addEventListener("loadeddata", finish, { once: true });
        element.addEventListener("error", fail, { once: true });
        element.src = key;
        if (typeof element.load === "function") element.load();
        window.setTimeout(finish, 1800);
      }).catch((error) => {
        warn(error.message);
        throw error;
      });
      audio.set(key, promise);
      return promise;
    }

    function invalidate(paths = []) {
      paths.map(normalizedAssetPath).filter(Boolean).forEach((path) => {
        images.delete(path);
        audio.delete(path);
      });
    }

    return { images, audio, image, sound, invalidate, normalize: normalizedAssetPath };
  }

  function smoothControlPoints(points, iterations = 3) {
    let route = (points || []).map((point) => ({ x: Number(point.x), y: Number(point.y) }));
    if (route.length < 2) return route;
    for (let pass = 0; pass < iterations; pass += 1) {
      const next = [route[0]];
      for (let index = 0; index < route.length - 1; index += 1) {
        const from = route[index];
        const to = route[index + 1];
        next.push(
          { x: from.x * 0.75 + to.x * 0.25, y: from.y * 0.75 + to.y * 0.25 },
          { x: from.x * 0.25 + to.x * 0.75, y: from.y * 0.25 + to.y * 0.75 }
        );
      }
      next.push(route[route.length - 1]);
      route = next;
    }
    return route;
  }

  function buildPathCache(points) {
    const samples = smoothControlPoints(points);
    const cumulative = [0];
    let totalLength = 0;
    for (let index = 1; index < samples.length; index += 1) {
      totalLength += Math.hypot(
        samples[index].x - samples[index - 1].x,
        samples[index].y - samples[index - 1].y
      );
      cumulative.push(totalLength);
    }
    return { samples, cumulative, totalLength };
  }

  function pointAtDistance(cache, distance) {
    if (!cache?.samples?.length) return { x: 0, y: 0, angle: 0, progress: 0 };
    if (cache.samples.length === 1 || cache.totalLength <= 0) {
      return { ...cache.samples[0], angle: 0, progress: 1 };
    }
    const target = Math.max(0, Math.min(cache.totalLength, distance));
    let low = 1;
    let high = cache.cumulative.length - 1;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (cache.cumulative[mid] < target) low = mid + 1;
      else high = mid;
    }
    const index = low;
    const from = cache.samples[index - 1];
    const to = cache.samples[index];
    const segmentStart = cache.cumulative[index - 1];
    const segmentLength = Math.max(0.0001, cache.cumulative[index] - segmentStart);
    const t = (target - segmentStart) / segmentLength;
    return {
      x: from.x + (to.x - from.x) * t,
      y: from.y + (to.y - from.y) * t,
      angle: Math.atan2(to.y - from.y, to.x - from.x) * 180 / Math.PI,
      progress: target / cache.totalLength
    };
  }

  function volumeEnvelope(progress) {
    const smooth = (value) => value * value * (3 - 2 * value);
    if (progress <= 0.2) return smooth(progress / 0.2);
    if (progress >= 0.8) return smooth((1 - progress) / 0.2);
    return 1;
  }

  function createFlybyRuntime(options) {
    const getLevel = options.getLevel;
    const getScreen = options.getScreen;
    const assetCache = options.assetCache;
    const warn = options.warn || (() => {});
    const getAudioUnlocked = options.getAudioUnlocked || (() => false);
    const getMasterVolume = options.getMasterVolume || (() => 1);
    const readiness = new Map();
    const pathCaches = new Map();
    const timers = new Map();
    const active = new Map();
    const activeAudio = new Map();
    let levelId = null;
    let rafId = null;
    let triggerSequence = 0;

    function keyFor(id) {
      return `${levelId || getLevel()?.id}:${id}`;
    }

    function configById(id) {
      return (getLevel()?.ambientFlybys || []).find((item) => item.id === id);
    }

    function cacheFor(config) {
      const key = keyFor(config.id);
      const signature = JSON.stringify(config.path || []);
      const cached = pathCaches.get(key);
      if (cached?.signature === signature) return cached.value;
      const value = buildPathCache(config.path || []);
      pathCaches.set(key, { signature, value });
      return value;
    }

    function invalidatePath(id) {
      pathCaches.delete(keyFor(id));
    }

    async function prepareOne(config) {
      const key = keyFor(config.id);
      const state = { frameA: false, frameB: false, sound: false, ready: false };
      readiness.set(key, state);
      try {
        await assetCache.image(config.frameA);
        state.frameA = true;
      } catch {
        warn(`[Atlas] ${levelId} flyby "${config.id}" failed asset ${config.frameA}`);
        return state;
      }
      try {
        await assetCache.image(config.frameB);
        state.frameB = true;
      } catch {
        warn(`[Atlas] ${levelId} flyby "${config.id}" flap frame disabled: ${config.frameB}`);
      }
      if (config.sound) {
        assetCache.sound(config.sound).then(() => {
          state.sound = true;
        }).catch(() => {
          warn(`[Atlas] ${levelId} flyby "${config.id}" sound disabled: ${config.sound}`);
        });
      }
      state.ready = true;
      const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(config.id)}"]`);
      if (shell) shell.dataset.ready = "true";
      sync();
      return state;
    }

    function prepareLevel(selectedLevel) {
      stopAll();
      levelId = selectedLevel?.id || null;
      readiness.clear();
      pathCaches.clear();
      return Promise.all((selectedLevel?.ambientFlybys || []).map(prepareOne));
    }

    function clearTimer(key) {
      window.clearTimeout(timers.get(key));
      timers.delete(key);
    }

    function groups() {
      const result = new Map();
      for (const config of getLevel()?.ambientFlybys || []) {
        const key = String(config.syncKey || "").trim();
        if (!key) continue;
        if (!result.has(key)) result.set(key, []);
        result.get(key).push(config);
      }
      return result;
    }

    function randomDelay(config) {
      const min = Math.max(0, Number(config.intervalMinMs) || 18000);
      const max = Math.max(min, Number(config.intervalMaxMs) || min);
      return min + Math.round(Math.random() * (max - min));
    }

    function canRun() {
      return Boolean(
        getLevel() &&
        getLevel().id === levelId &&
        ["scene", "challenge", "correct"].includes(getScreen()) &&
        !document.hidden &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }

    function scheduleIndependent(config) {
      const key = `one:${config.id}`;
      if (timers.has(key) || active.has(config.id) || !readiness.get(keyFor(config.id))?.ready) return;
      timers.set(key, window.setTimeout(() => {
        timers.delete(key);
        if (!canRun()) return;
        startTrigger([config], false);
      }, randomDelay(config)));
    }

    function scheduleGroup(syncKey, members) {
      const key = `sync:${syncKey}`;
      if (timers.has(key) || members.some((item) => active.has(item.id))) return;
      if (!members.every((item) => readiness.get(keyFor(item.id))?.ready)) return;
      timers.set(key, window.setTimeout(() => {
        timers.delete(key);
        if (!canRun()) return;
        startTrigger(members, false);
      }, randomDelay(members[0])));
    }

    function scheduleAll() {
      if (!canRun()) return;
      const syncGroups = groups();
      for (const config of getLevel().ambientFlybys || []) {
        if (!String(config.syncKey || "").trim()) scheduleIndependent(config);
      }
      syncGroups.forEach((members, syncKey) => scheduleGroup(syncKey, members));
    }

    function playTriggerAudio(members, triggerId) {
      if (!getAudioUnlocked()) return;
      const byPath = new Map();
      for (const config of members) {
        const ready = readiness.get(keyFor(config.id));
        if (!config.sound || !ready?.sound) continue;
        const path = assetCache.normalize(config.sound);
        const previous = byPath.get(path);
        if (!previous || Number(config.soundVolume || 0) > Number(previous.soundVolume || 0)) {
          byPath.set(path, config);
        }
      }
      byPath.forEach((config, path) => {
        const audio = new Audio(path);
        audio.volume = 0;
        const key = `${triggerId}:${path}`;
        activeAudio.set(key, { audio, path, triggerId, maxVolume: Number(config.soundVolume ?? 1) });
        const finish = () => activeAudio.delete(key);
        audio.addEventListener("ended", finish, { once: true });
        audio.addEventListener("error", finish, { once: true });
        audio.play().catch(finish);
      });
    }

    function startTrigger(members, preview) {
      const triggerId = `flyby-${++triggerSequence}`;
      members.forEach((config) => {
        const previous = active.get(config.id);
        cancelActive(config.id);
        if (previous) finishTriggerIfDone(previous.triggerId, previous.preview);
        const delay = Math.max(0, Number(config.startDelayMs) || 0);
        const start = () => startOne(config, triggerId, preview);
        if (delay) {
          const key = `start:${triggerId}:${config.id}`;
          timers.set(key, window.setTimeout(() => {
            timers.delete(key);
            start();
          }, delay));
        } else {
          start();
        }
      });
      playTriggerAudio(members, triggerId);
      return triggerId;
    }

    function startOne(config, triggerId, preview) {
      if (!preview && !canRun()) return false;
      if (!readiness.get(keyFor(config.id))?.ready) return false;
      const cache = cacheFor(config);
      if (cache.totalLength <= 0) return false;
      active.set(config.id, {
        id: config.id,
        triggerId,
        preview,
        distance: 0,
        lastTime: 0,
        progress: 0,
        scaleX: (document.querySelector(".worldTrack")?.getBoundingClientRect().width || getLevel().world.width) / getLevel().world.width,
        scaleY: (document.querySelector(".worldTrack")?.getBoundingClientRect().height || getLevel().world.height) / getLevel().world.height
      });
      const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(config.id)}"]`);
      if (shell) {
        shell.dataset.active = "true";
        shell.style.willChange = "transform";
      }
      ensureRaf();
      return true;
    }

    function preview(id) {
      const config = configById(id);
      if (!config) return false;
      return Boolean(startTrigger([config], true));
    }

    function previewSync(syncKey) {
      const members = groups().get(syncKey) || [];
      if (!members.length) return false;
      startTrigger(members, true);
      return true;
    }

    function cancelActive(id) {
      active.delete(id);
      const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(id)}"]`);
      if (shell) {
        shell.dataset.active = "false";
        shell.style.willChange = "";
      }
    }

    function finishTriggerIfDone(triggerId, preview) {
      if ([...active.values()].some((item) => item.triggerId === triggerId)) return;
      for (const [key, state] of activeAudio) {
        if (state.triggerId !== triggerId) continue;
        state.audio.pause();
        activeAudio.delete(key);
      }
      if (!preview) scheduleAll();
    }

    function updateAudio() {
      for (const state of activeAudio.values()) {
        const progresses = [...active.values()]
          .filter((item) => item.triggerId === state.triggerId)
          .map((item) => item.progress);
        const progress = progresses.length ? Math.max(...progresses) : 1;
        state.audio.volume = Math.max(0, Math.min(1,
          getMasterVolume() * state.maxVolume * volumeEnvelope(progress)
        ));
      }
    }

    function tick(timestamp) {
      rafId = null;
      const completed = [];
      for (const [id, runtime] of active) {
        const config = configById(id);
        if (!config) {
          completed.push([runtime, id]);
          continue;
        }
        if (!runtime.lastTime) runtime.lastTime = timestamp;
        const delta = Math.max(0, Math.min(0.1, (timestamp - runtime.lastTime) / 1000));
        runtime.lastTime = timestamp;
        runtime.distance += Math.max(1, Number(config.speed) || 260) * delta;
        const cache = cacheFor(config);
        const point = pointAtDistance(cache, runtime.distance);
        runtime.progress = point.progress;
        const shell = document.querySelector(`[data-ambient-flyby="${CSS.escape(id)}"]`);
        if (shell) {
          shell.dataset.active = "true";
          shell.style.willChange = "transform";
          const overallDirection = cache.samples.at(-1).x >= cache.samples[0].x ? 1 : -1;
          const facing = config.faceFlightDirection === false
            ? (config.mirrorX ? -1 : 1)
            : overallDirection;
          const rotation = config.rotateAlongPath
            ? Math.max(-Math.abs(Number(config.maxRotationDeg) || 0), Math.min(Math.abs(Number(config.maxRotationDeg) || 0), point.angle))
            : 0;
          shell.style.transform =
            `translate3d(${point.x * runtime.scaleX}px, ${point.y * runtime.scaleY}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${Number(config.scale) || 0.2}) scaleX(${facing})`;
          const ready = readiness.get(keyFor(id));
          const flapHz = Math.max(0, Number(config.flapFrequencyHz) || 0);
          const frame = ready?.frameB && flapHz > 0
            ? (Math.floor((runtime.distance / Math.max(1, Number(config.speed) || 260)) * flapHz * 2) % 2 ? "b" : "a")
            : "a";
          shell.dataset.frame = frame;
          shell.dataset.progress = point.progress.toFixed(4);
          shell.dataset.rotation = rotation.toFixed(3);
        }
        if (runtime.distance >= cache.totalLength) completed.push([runtime, id]);
      }
      updateAudio();
      completed.forEach(([runtime, id]) => {
        cancelActive(id);
        finishTriggerIfDone(runtime.triggerId, runtime.preview);
      });
      if (active.size) ensureRaf();
    }

    function ensureRaf() {
      if (!rafId && active.size) rafId = window.requestAnimationFrame(tick);
    }

    function stopAll() {
      timers.forEach((timer) => window.clearTimeout(timer));
      timers.clear();
      active.forEach((_, id) => cancelActive(id));
      active.clear();
      activeAudio.forEach(({ audio }) => audio.pause());
      activeAudio.clear();
      if (rafId) window.cancelAnimationFrame(rafId);
      rafId = null;
    }

    function sync() {
      if (!canRun()) {
        stopAll();
        return;
      }
      scheduleAll();
    }

    return {
      readiness,
      pathCaches,
      timers,
      active,
      activeAudio,
      prepareLevel,
      cacheFor,
      invalidatePath,
      preview,
      previewSync,
      sync,
      stopAll,
      buildPathCache,
      pointAtDistance
    };
  }

  window.AtlasAmbientSystem = {
    IMAGE_EXTENSIONS,
    AUDIO_EXTENSIONS,
    normalizedAssetPath,
    extensionFor,
    createAssetCache,
    smoothControlPoints,
    buildPathCache,
    pointAtDistance,
    volumeEnvelope,
    createFlybyRuntime
  };
})();
