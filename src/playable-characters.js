(function (global) {
  "use strict";
  const characters = { sven: "Sven", sven_arc: "ARC Sven" };
  const animations = {
    idle: { folder: "idle", loop: true },
    idleBlink: { folder: "idle_blink", loop: false },
    turnLeftToRight: { folder: "turn_from_left_to_right", loop: false, direction: "right" },
    turnRightToLeft: { folder: "turn_from_right_to_left", loop: false, direction: "left" },
    walkLeftFromIdle: { folder: "walk_left_from_idle", loop: false, direction: "left" },
    walkLeftLoop: { folder: "walk_left_loop", loop: true, direction: "left" },
    walkLeftToIdle: { folder: "walk_left_to_idle", loop: false, direction: "left" },
    walkRightFromIdle: { folder: "walk_right_from_idle", loop: false, direction: "right" },
    walkRightLoop: { folder: "walk_right_loop", loop: true, direction: "right" },
    walkRightToIdle: { folder: "walk_right_to_idle", loop: false, direction: "right" }
  };
  const tuningRanges = {
    spriteScale: [0.5, 1.8], movementSpeed: [80, 520], animationSpeed: [0.5, 1.8],
    svenBrightness: [0.5, 1.5], svenContrast: [0.5, 1.5], svenSaturation: [0, 2], svenWarmth: [-1, 1], svenTint: [-1, 1]
  };
  const locomotionRanges = {
    fromIdleMovement: [0, 2], loopMovement: [0.1, 2], toIdleMovement: [0, 1.5],
    toIdleMaxDistance: [1, 200], turnMovement: [0.1, 2], stopEntryDistance: [1, 250],
    shortMoveThreshold: [1, 300], shortMoveAnimationSpeed: [0.25, 4], shortMoveStartFrame: [0, 0.8],
    shortMoveMaxFromIdleAnimation: [0.05, 1], fromIdleAnimationSpeed: [0.25, 3], loopAnimationSpeed: [0.25, 3],
    toIdleAnimationSpeed: [0.25, 3], turnAnimationSpeed: [0.25, 3], arrivalDynamicSpeedMin: [0.25, 2],
    arrivalDynamicSpeedMax: [0.25, 3], blinkMinimumInterval: [250, 30000], blinkMaximumInterval: [250, 60000]
  };
  const svenLocomotion = Object.freeze({
    fromIdleMovement: 0.15, loopMovement: 1, toIdleMovement: 0.05, toIdleMaxDistance: 5,
    turnMovement: 0.78, stopEntryDistance: 35, shortMoveThreshold: 25,
    shortMoveAnimationSpeed: 3, shortMoveStartFrame: 0.25, shortMoveMaxFromIdleAnimation: 0.35,
    fromIdleAnimationSpeed: 2, loopAnimationSpeed: 1, toIdleAnimationSpeed: 1.15,
    turnAnimationSpeed: 1.15, arrivalDynamicSpeedMin: 0.85, arrivalDynamicSpeedMax: 1.2,
    blinkMinimumInterval: 1000, blinkMaximumInterval: 3000
  });
  const defaultLocomotion = Object.freeze({
    sven: svenLocomotion,
    sven_arc: Object.freeze({ ...svenLocomotion, fromIdleMovement: 0.25, blinkMaximumInterval: 5000 })
  });
  function locomotionProfiles(value = {}, legacy = {}) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid characterLocomotion.');
    Object.keys(value).forEach(validateId);
    const legacySven = Object.fromEntries(Object.keys(locomotionRanges).filter(key => legacy?.[key] !== undefined).map(key => [key, legacy[key]]));
    return Object.fromEntries(Object.keys(characters).map(id => {
      const profile = value[id] ?? (id === 'sven' ? legacySven : {});
      const validated = validateBank({ [id]: { locomotion: profile } })[id].locomotion;
      return [id, validateBank({ [id]: { locomotion: { ...defaultLocomotion[id], ...validated } } })[id].locomotion];
    }));
  }
  function validateId(id) {
    if (!Object.hasOwn(characters, id)) throw new Error(`Unknown playable character: ${id}`);
    return id;
  }
  function selected(level, settings = {}) {
    return validateId(settings.mainCharacter ?? level?.player?.characterId ?? "sven");
  }
  function animationSet(id = "sven") {
    validateId(id);
    const entry = global.ATLAS_CHARACTER_MANIFEST?.playableCharacters?.find(item => item.id === id);
    return Object.fromEntries(Object.entries(animations).map(([state, definition]) => {
      const urls = entry?.animations?.[definition.folder];
      if (!urls?.length) throw new Error(`Playable character ${id}: missing required animation ${definition.folder}. Regenerate the character manifest.`);
      return [state, { ...definition, urls, frames: urls.length }];
    }));
  }
  function tuning(settings, id) {
    const legacy = id === "sven" ? Object.fromEntries(Object.keys(tuningRanges).filter(key => settings[key] !== undefined).map(key => [key, settings[key]])) : {};
    const { locomotion, ...presentation } = settings.mainCharacterSettings?.[id] || {};
    return { ...legacy, ...presentation };
  }
  function validateBank(value) {
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid mainCharacterSettings.");
    const ranges = (values, schema) => Object.fromEntries(Object.entries(values).map(([key, raw]) => {
      const range = schema[key], number = Number(raw);
      if (!range || !Number.isFinite(number) || number < range[0] || number > range[1]) throw new Error(`Invalid playable character setting ${key}.`);
      return [key, number];
    }));
    return Object.fromEntries(Object.entries(value).map(([id, settings]) => {
      validateId(id);
      if (!settings || typeof settings !== "object" || Array.isArray(settings)) throw new Error(`Invalid settings for ${id}.`);
      const { locomotion, ...visual } = settings;
      const result = ranges(visual, tuningRanges);
      if (locomotion !== undefined) {
        if (!locomotion || typeof locomotion !== "object" || Array.isArray(locomotion)) throw new Error(`Invalid locomotion for ${id}.`);
        result.locomotion = ranges(locomotion, locomotionRanges);
        for (const [min, max] of [["blinkMinimumInterval", "blinkMaximumInterval"], ["arrivalDynamicSpeedMin", "arrivalDynamicSpeedMax"]]) {
          if ((locomotion[min] ?? 0) > (locomotion[max] ?? Infinity)) throw new Error(`${id}: ${min} exceeds ${max}.`);
        }
      }
      return [id, result];
    }));
  }
  const api = { characters, animations, tuningRanges, locomotionRanges, defaultLocomotion, locomotionProfiles, validateId, selected, animationSet, tuning, validateBank };
  global.AtlasPlayableCharacters = api;
  if (typeof module !== "undefined") module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
