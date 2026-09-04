(function initAtlasWorld(global) {
  "use strict";

  const RECENT_STORAGE_KEY = "atlas.recent-levels.v1";
  const MAX_RECENT_LEVELS = 24;

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function normalizeConfig(value) {
    const source = value && typeof value === "object" ? value : {};
    return {
      version: 1,
      worlds: source.worlds && typeof source.worlds === "object" ? clone(source.worlds) : {},
      levels: source.levels && typeof source.levels === "object" ? clone(source.levels) : {},
      locomotion: source.locomotion && typeof source.locomotion === "object" ? clone(source.locomotion) : {}
    };
  }

  function createWorldResolver(catalog, initialConfig) {
    const entries = Array.isArray(catalog) ? catalog : [];
    const byId = new Map(entries.map((entry) => [entry.id, entry]));
    let config = normalizeConfig(initialConfig);

    function rootIdFor(levelId) {
      let current = byId.get(levelId);
      const seen = new Set();
      while (current?.connectedFrom && !seen.has(current.id)) {
        seen.add(current.id);
        current = byId.get(current.connectedFrom) || current;
      }
      return current?.id || levelId;
    }

    function entryIsAvailable(entry, options = {}) {
      if (!entry?.developerOnly) return true;
      const includeDeveloper = options.includeDeveloper ?? isDevelopmentHost(options.location);
      return includeDeveloper === true;
    }

    function rootEntries(options = {}) {
      return entries.filter((entry) => !entry.connectedFrom && entryIsAvailable(entry, options));
    }

    function authoredEntries(rootId) {
      return entries.filter((entry) => rootIdFor(entry.id) === rootId);
    }

    function orderedEntries(rootId, options = {}) {
      const authored = authoredEntries(rootId);
      const authoredById = new Map(authored.map((entry) => [entry.id, entry]));
      const configuredOrder = Array.isArray(config.worlds[rootId]?.order) ? config.worlds[rootId].order : [];
      const order = [
        ...configuredOrder.filter((id, index) => authoredById.has(id) && configuredOrder.indexOf(id) === index),
        ...authored.map((entry) => entry.id).filter((id) => !configuredOrder.includes(id))
      ];
      const resolved = order.map((id) => authoredById.get(id));
      return options.includeDisabled === false
        ? resolved.filter((entry) => config.worlds[rootId]?.enabled?.[entry.id] !== false)
        : resolved;
    }

    function isEnabled(levelId) {
      const rootId = rootIdFor(levelId);
      return config.worlds[rootId]?.enabled?.[levelId] !== false;
    }

    function enabledEntries(rootId) {
      return orderedEntries(rootId, { includeDisabled: false });
    }

    function firstEnabled(rootId) {
      return enabledEntries(rootId)[0] || null;
    }

    function nextEnabled(levelId, direction = 1) {
      const sequence = enabledEntries(rootIdFor(levelId));
      const index = sequence.findIndex((entry) => entry.id === levelId);
      if (index < 0) return null;
      return sequence[index + direction] || null;
    }

    function allEnabledIds(options = {}) {
      // Adventure/progression semantics exclude developer renderer scenes by default,
      // even while those scenes are visible on a local development host.
      const includeDeveloper = options.includeDeveloper === true;
      return rootEntries({ ...options, includeDeveloper })
        .flatMap((root) => enabledEntries(root.id).map((entry) => entry.id));
    }

    function setWorldOrder(rootId, order) {
      config.worlds[rootId] ||= {};
      config.worlds[rootId].order = orderedEntries(rootId)
        .map((entry) => entry.id)
        .sort((left, right) => order.indexOf(left) - order.indexOf(right));
    }

    function moveLevel(rootId, levelId, delta) {
      const order = orderedEntries(rootId).map((entry) => entry.id);
      const index = order.indexOf(levelId);
      const target = Math.max(0, Math.min(order.length - 1, index + delta));
      if (index < 0 || target === index) return false;
      order.splice(target, 0, order.splice(index, 1)[0]);
      config.worlds[rootId] ||= {};
      config.worlds[rootId].order = order;
      return true;
    }

    function setEnabled(rootId, levelId, enabled) {
      config.worlds[rootId] ||= {};
      config.worlds[rootId].enabled ||= {};
      if (enabled) delete config.worlds[rootId].enabled[levelId];
      else config.worlds[rootId].enabled[levelId] = false;
    }

    function levelSettings(levelId) {
      return config.levels[levelId] || {};
    }

    function updateLevelSettings(levelId, patch) {
      config.levels[levelId] = { ...config.levels[levelId] };
      Object.entries(patch || {}).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") delete config.levels[levelId][key];
        else config.levels[levelId][key] = typeof value === "object" ? clone(value) : value;
      });
      if (!Object.keys(config.levels[levelId]).length) delete config.levels[levelId];
    }

    function locomotionSettings() {
      return { ...(global.AtlasLocomotion?.DEFAULT_CONFIG || {}), ...(config.locomotion || {}) };
    }

    function updateLocomotionSettings(patch) {
      config.locomotion = { ...(config.locomotion || {}) };
      Object.entries(patch || {}).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") delete config.locomotion[key];
        else config.locomotion[key] = value;
      });
      if (!Object.keys(config.locomotion).length) delete config.locomotion;
    }

    return {
      rootIdFor,
      entryIsAvailable,
      rootEntries,
      authoredEntries,
      orderedEntries,
      enabledEntries,
      firstEnabled,
      nextEnabled,
      allEnabledIds,
      isEnabled,
      moveLevel,
      setWorldOrder,
      setEnabled,
      levelSettings,
      updateLevelSettings,
      locomotionSettings,
      updateLocomotionSettings,
      getConfig: () => clone(config),
      setConfig: (next) => { config = normalizeConfig(next); }
    };
  }

  function isDevelopmentHost(locationLike = global.location) {
    return ["localhost", "127.0.0.1", "::1"].includes(String(locationLike?.hostname || "").toLowerCase());
  }

  function readRecent(storage = global.localStorage) {
    try {
      const parsed = JSON.parse(storage.getItem(RECENT_STORAGE_KEY));
      return Array.isArray(parsed?.levels) ? parsed.levels.filter((id) => typeof id === "string") : [];
    } catch {
      return [];
    }
  }

  function recordRecent(levelId, storage = global.localStorage) {
    const levels = readRecent(storage).filter((id) => id !== levelId);
    levels.push(levelId);
    const trimmed = levels.slice(-MAX_RECENT_LEVELS);
    storage.setItem(RECENT_STORAGE_KEY, JSON.stringify({ version: 1, levels: trimmed }));
    return trimmed;
  }

  function lockedLevelIds(enabledIds, options = {}) {
    if (options.bypass ?? isDevelopmentHost(options.location)) return new Set();
    const enabled = [...new Set(enabledIds || [])];
    const recent = options.recent || readRecent(options.storage);
    const locked = new Set(recent.slice(-2).filter((id) => enabled.includes(id)));
    if (enabled.length && enabled.every((id) => locked.has(id))) {
      const oldestLocked = recent.find((id) => locked.has(id));
      if (oldestLocked) locked.delete(oldestLocked);
    }
    return locked;
  }

  global.AtlasWorld = {
    RECENT_STORAGE_KEY,
    normalizeConfig,
    createWorldResolver,
    isDevelopmentHost,
    readRecent,
    recordRecent,
    lockedLevelIds
  };
})(window);
