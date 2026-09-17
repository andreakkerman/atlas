(function (global) {
  "use strict";
  // Atlas foreground gameplay cadence, NOT GPU-presented FPS. Both 2D modes
  // feed this same RAF stream; intentional subsystem update rates are unrelated.
  function createSampler() {
    let start, previous, intervals, expected;
    function reset() { start = previous = null; intervals = []; expected = null; }
    reset();
    function frame(now) {
      if (previous === null) { start = previous = now; return null; }
      const dt = now - previous;
      previous = now;
      if (dt <= 0) return null;
      intervals.push(dt);
      if (now - start < 1000) return null;
      // Estimate the available cadence from the faster fifth of observed frames.
      // Retain that baseline until lifecycle reset so sustained load is not
      // mistaken for a slower display. Sort only once per reporting window.
      const sorted = intervals.slice().sort((a, b) => a - b);
      const observed = sorted[Math.floor((sorted.length - 1) * 0.2)];
      expected = expected === null ? observed : Math.min(expected, observed);
      const missed = intervals.reduce((sum, dt) => sum + (dt > expected * 1.5 ? Math.max(1, Math.round(dt / expected) - 1) : 0), 0);
      const sample = { fps: intervals.length * 1000 / (now - start), worstMs: sorted.at(-1), missed,
        missedPercent: missed * 100 / (intervals.length + missed), expectedMs: expected };
      start = now; intervals = [];
      return sample;
    }
    return { reset, frame };
  }
  global.AtlasGameplayCadence = { createSampler };
  if (typeof module !== "undefined") module.exports = global.AtlasGameplayCadence;
})(typeof window !== "undefined" ? window : globalThis);
