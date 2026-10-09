(function (global) {
  "use strict";
  const DEFAULT_M6_PERCENTAGE = 10;
  const STORAGE_KEY = "atlas.learning.m6Percentage";
  const DECK_SIZE = 20;
  const M6_DIFFICULTY_POLICY = Object.freeze(Object.fromEntries(Object.entries({
    0: { 1: 0, 2: 0, 3: 0 },
    10: { 1: 100, 2: 0, 3: 0 },
    20: { 1: 100, 2: 0, 3: 0 },
    30: { 1: 100, 2: 0, 3: 0 },
    40: { 1: 85, 2: 15, 3: 0 },
    50: { 1: 75, 2: 25, 3: 0 },
    60: { 1: 65, 2: 35, 3: 0 },
    70: { 1: 65, 2: 30, 3: 5 },
    80: { 1: 60, 2: 30, 3: 10 },
    90: { 1: 55, 2: 35, 3: 10 },
    100: { 1: 50, 2: 35, 3: 15 }
  }).map(([percentage, policy]) => [percentage, Object.freeze(policy)])));
  const DIFFICULTY_LABELS = Object.freeze({ 1: "Instap", 2: "Normaal", 3: "Uitdagend" });
  const normalizePercentage = value => Number.isInteger(value) && value >= 0 && value <= 100 && value % 10 === 0
    ? value : DEFAULT_M6_PERCENTAGE;
  const difficultyPolicy = percentage => M6_DIFFICULTY_POLICY[normalizePercentage(percentage)];

  function readPreference(storage) {
    try { return normalizePercentage(JSON.parse((storage || global.localStorage).getItem(STORAGE_KEY))); }
    catch { return DEFAULT_M6_PERCENTAGE; }
  }
  function savePreference(value, storage) {
    const normalized = normalizePercentage(value);
    try { (storage || global.localStorage).setItem(STORAGE_KEY, JSON.stringify(normalized)); } catch { /* Memory preference remains usable. */ }
    return normalized;
  }
  function resolveLevel(variant) {
    if (!variant || typeof variant !== "object" || Array.isArray(variant)) throw new Error("Learning variant must be an object.");
    // Intentional compatibility contract, not an inferred curriculum classification.
    if (!Object.hasOwn(variant, "learningLevel")) return "E5";
    if (variant.learningLevel === "E5" || variant.learningLevel === "M6") return variant.learningLevel;
    throw new Error(`Unknown learningLevel: ${String(variant.learningLevel)}`);
  }
  function createPlanner(percentage = DEFAULT_M6_PERCENTAGE, random = Math.random) {
    const m6Percentage = normalizePercentage(percentage);
    const count = DECK_SIZE * m6Percentage / 100;
    // An evenly spaced deck with a random rotation. Repeating this rotation also
    // avoids clustering at deck boundaries; a new run gets a fresh rotation.
    const offset = Math.floor(random() * DECK_SIZE);
    const deck = Array.from({ length: DECK_SIZE }, (_, i) => {
      const position = (i + offset) % DECK_SIZE;
      return Math.floor((position + 1) * count / DECK_SIZE) > Math.floor(position * count / DECK_SIZE) ? "M6" : "E5";
    });
    const policy = difficultyPolicy(m6Percentage);
    const allowedDifficulties = Object.freeze([1, 2, 3].filter(d => policy[d] > 0));
    // Smooth weighted ordering spreads each exact 20-M6-request allocation.
    // Reuse the rotation without consuming another random draw for E5 selection.
    const scores = { 1: 0, 2: 0, 3: 0 }, difficultyDeck = [];
    for (let i = 0; i < DECK_SIZE && allowedDifficulties.length; i++) {
      allowedDifficulties.forEach(d => { scores[d] += policy[d]; });
      const difficulty = allowedDifficulties.reduce((best, d) => scores[d] > scores[best] ? d : best);
      difficultyDeck.push(difficulty);
      scores[difficulty] -= 100;
    }
    let selections = 0, difficultySelections = 0;
    return {
      m6Percentage,
      allowedDifficulties,
      lastVariants: new Map(),
      next() { return deck[selections++ % DECK_SIZE]; },
      nextDifficulty() { return difficultyDeck.length ? difficultyDeck[(difficultySelections++ + offset) % DECK_SIZE] : null; },
      get selections() { return selections; },
      get difficultySelections() { return difficultySelections; }
    };
  }
  function selectVariant(variants, planner, random = Math.random, slotKey = variants) {
    if (!Array.isArray(variants) || !variants.length) throw new Error("A question slot requires eligible learning variants.");
    const pools = { E5: [], M6: [] };
    for (const variant of variants) pools[resolveLevel(variant)].push(variant);
    if (pools.M6.some(v => Number.isInteger(v.difficulty))) {
      pools.M6 = pools.M6.filter(v => planner.allowedDifficulties.includes(v.difficulty));
    }
    const requested = planner.next();
    const delivered = pools[requested].length ? requested : requested === "M6" ? "E5" : "M6";
    const requestedDifficulty = requested === "M6" ? planner.nextDifficulty() : null;
    let pool = pools[delivered];
    if (!pool.length) throw new Error('A question slot requires eligible learning variants.');
    if (delivered === "M6" && pool.some(v => Number.isInteger(v.difficulty))) {
      const target = requestedDifficulty ?? planner.nextDifficulty();
      const nearest = [...new Set(pool.map(v => v.difficulty).filter(d => [1, 2, 3].includes(d)))]
        .sort((a, b) => Math.abs(a - target) - Math.abs(b - target) || a - b)[0];
      pool = pool.filter(v => v.difficulty === nearest);
      const alternatives = pool.filter(v => v.id !== planner.lastVariants?.get(slotKey));
      if (alternatives.length) pool = alternatives;
    }
    const variant = pool[Math.floor(random() * pool.length)];
    if (delivered === "M6") planner.lastVariants?.set(slotKey, variant.id);
    const deliveredDifficulty = variant.difficulty ?? null;
    return { variant, requested, delivered, fallback: requested !== delivered,
      requestedDifficulty, deliveredDifficulty,
      difficultyFallback: delivered === "M6" && requestedDifficulty !== null && deliveredDifficulty !== requestedDifficulty };
  }
  // Normal gameplay draws the level once. E5 keeps its local selection path;
  // M6 uses the global bank regardless of the host world's/challenge's identity.
  function positionDomain(variants) {
    // Existing authored clock data/families provide semantics, never names or world IDs.
    const local=variants.filter(v=>resolveLevel(v)==='E5');
    return local.length && local.every(v=>v.visual?.type==='clock'||/^clock_reading(?:_|$)/.test(v.family||'')) ? 'time' : undefined;
  }
  function selectPosition(variants, planner, bank, {random = Math.random, history, used = [], slotKey = variants} = {}) {
    const local = variants.filter(v => resolveLevel(v) === 'E5');
    if (!local.length && !bank?.size) throw new Error('A question position requires eligible content.');
    const requested = planner.next();
    const requestedDifficulty = requested === 'M6' ? planner.nextDifficulty() : null;
    const domain = positionDomain(variants);
    const central = requested === 'M6' || !local.length ? bank?.select(requestedDifficulty ?? planner.nextDifficulty(), {random, history, used, domain, excludeDomain:domain ? undefined : 'time', allowedDifficulties:planner.allowedDifficulties}) : null;
    if (central) return {variant:central, requested, delivered:'M6', fallback:requested !== 'M6', requestedDifficulty,
      deliveredDifficulty:central.difficulty, difficultyFallback:requestedDifficulty !== null && central.difficulty !== requestedDifficulty};
    const selection = selectVariant(local, {next:()=> 'E5', lastVariants:planner.lastVariants}, random, slotKey);
    return {...selection, requested, requestedDifficulty, fallback:requested !== 'E5'};
  }
  const api = { DEFAULT_M6_PERCENTAGE, STORAGE_KEY, DECK_SIZE, M6_DIFFICULTY_POLICY, DIFFICULTY_LABELS, difficultyPolicy, normalizePercentage, readPreference, savePreference, resolveLevel, createPlanner, selectVariant, selectPosition, positionDomain };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  global.AtlasLearningLevels = api;
})(typeof window !== "undefined" ? window : globalThis);
