(function initAtlasAssetReadiness(global) {
  "use strict";

  function normalize(path) {
    return String(path || "").trim().replace(/\\/g, "/").replace(/^\.\//, "");
  }

  function collectCriticalAssets(level, options = {}) {
    const assets = new Map();
    const add = (path, kind, required = false, owner = level?.id || "level") => {
      const normalized = normalize(path);
      if (!normalized) return;
      const current = assets.get(normalized);
      if (current) {
        current.required ||= required;
        if (!current.kinds.includes(kind)) current.kinds.push(kind);
        return;
      }
      assets.set(normalized, { path: normalized, kinds: [kind], required, owner });
    };

    add(level?.world?.background, "background", true);
    add(level?.companion?.portrait, "companion-portrait", true);
    Object.values(level?.guides || {}).forEach((guide) => add(guide?.portrait, "guide-portrait", true));
    Object.entries(options.guideBlinkPaths || {}).forEach(([guideId, path]) => add(path, "guide-blink", false, guideId));
    (level?.ambientAnimals || []).forEach((animal) => {
      add(animal.openFrame, "ambient-animal-open", false, animal.id);
      add(animal.closedFrame, "ambient-animal-closed", false, animal.id);
    });
    (level?.ambientFlybys || []).forEach((flyby) => {
      add(flyby.frameA, "ambient-flyby-a", false, flyby.id);
      add(flyby.frameB, "ambient-flyby-b", false, flyby.id);
    });
    add(level?.challengeCharacter?.portrait, "challenge-portrait", true);
    add(level?.challengeArt, "challenge-art", true);
    const characters = new Map((global.ATLAS_CHARACTER_MANIFEST?.characters || []).map((character) => [character.id, character]));
    (level?.learningChallenges || []).forEach((challenge) => {
      const presentationType = String(challenge?.presentationType || challenge?.type || "standard").toLowerCase();
      if (presentationType !== "npc") return;
      const character = characters.get(challenge.npc?.characterId || challenge.characterId);
      if (!character) return;
      add(character.portrait, "npc-portrait", true, challenge.id);
      Object.values(character.animations || {}).flat().forEach((frame) => add(frame, "npc-animation", true, challenge.id));
    });
    add(level?.reward?.art, "reward-art", true);
    return [...assets.values()];
  }

  function createCoordinator(options = {}) {
    const loadImage = options.loadImage;
    const preloadSven = options.preloadSven || (() => Promise.resolve());
    const releaseImages = options.releaseImages || (() => {});
    const persistentPaths = new Set((options.persistentPaths || []).map(normalize));
    let active = null;
    let prepareSequence = 0;

    async function mapConcurrent(items, limit, operation) {
      const results = new Array(items.length);
      let cursor = 0;
      const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
        while (cursor < items.length) {
          const index = cursor++;
          results[index] = await operation(items[index], index);
        }
      });
      await Promise.all(workers);
      return results;
    }

    async function prepare(level, prepareOptions = {}) {
      const sequence = ++prepareSequence;
      const assets = collectCriticalAssets(level, prepareOptions);
      await preloadSven();
      const results = await mapConcurrent(assets, Math.max(1, Number(options.imageDecodeConcurrency || 16)), async (asset) => {
        try {
          const image = await loadImage(asset.path);
          if (!image || !image.complete || !image.naturalWidth) throw new Error(`Image is not render-ready: ${asset.path}`);
          return { ...asset, image, ready: true };
        } catch (error) {
          if (asset.required) throw new Error(`Critical image failed: ${asset.path}. ${error.message || error}`);
          return { ...asset, image: null, ready: false, error: error.message || String(error) };
        }
      });
      const images = new Map(results.filter((item) => item.ready).map((item) => [item.path, item.image]));
      return {
        sequence,
        levelId: level?.id || null,
        assets,
        results,
        images,
        failed: results.filter((item) => !item.ready),
        ready: true
      };
    }

    function activate(plan) {
      if (!plan?.ready) throw new Error("Cannot activate an unprepared level asset plan.");
      const nextPaths = new Set(plan.images.keys());
      if (active) {
        releaseImages([...active.images.keys()].filter((path) => !nextPaths.has(path) && !persistentPaths.has(path)));
      }
      active = plan;
      return active;
    }

    function releaseActive() {
      if (!active) return;
      releaseImages([...active.images.keys()].filter((path) => !persistentPaths.has(path)));
      active = null;
    }

    function discard(plan) {
      if (!plan?.images) return;
      const activePaths = new Set(active?.images?.keys?.() || []);
      releaseImages([...plan.images.keys()].filter((path) => !activePaths.has(path) && !persistentPaths.has(path)));
    }

    function supersede() {
      prepareSequence += 1;
      return prepareSequence;
    }

    return {
      prepare,
      activate,
      discard,
      releaseActive,
      supersede,
      snapshot: () => active,
      isCurrent: (plan) => Boolean(plan && plan.sequence === prepareSequence)
    };
  }

  global.AtlasAssetReadiness = { normalize, collectCriticalAssets, createCoordinator };
})(window);
