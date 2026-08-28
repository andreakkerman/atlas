(function initCharacterAppearance(global) {
  "use strict";

  const controls = Object.freeze([
    { key: "brightness", label: "Brightness", min: 0.5, max: 1.5, step: 0.01, neutral: 1 },
    { key: "contrast", label: "Contrast", min: 0.5, max: 1.5, step: 0.05, neutral: 1 },
    { key: "saturation", label: "Saturation", min: 0, max: 2, step: 0.05, neutral: 1 },
    { key: "warmth", label: "Warmth", min: -1, max: 1, step: 0.05, neutral: 0 },
    { key: "tint", label: "Tint", min: -1, max: 1, step: 0.05, neutral: 0 }
  ].map(Object.freeze));

  function fields(kind = "sven") {
    // Preserve the full authored NPC brightness range, including legacy extremes.
    return controls.map((control) => kind === "npc" && control.key === "brightness"
      ? { ...control, min: 0.4, max: 1.6 } : control);
  }

  function settingKey(key, prefix = "") {
    return prefix ? prefix + key[0].toUpperCase() + key.slice(1) : key;
  }

  function normalize(values = {}, kind = "sven", prefix = "") {
    return Object.fromEntries(fields(kind).map(({ key, min, max, neutral }) => {
      const value = Number(values?.[settingKey(key, prefix)] ?? neutral);
      return [key, Number.isFinite(value) ? Math.max(min, Math.min(max, value)) : neutral];
    }));
  }

  function settings(values, kind, prefix) {
    return Object.fromEntries(Object.entries(normalize(values, kind, prefix))
      .map(([key, value]) => [settingKey(key, prefix), value]));
  }

  function filterParameters(values, kind = "sven") {
    const value = normalize(values, kind);
    return [value.brightness, value.contrast, value.saturation,
      Number((Math.abs(value.warmth) * 0.14).toFixed(12)), Number((value.warmth * -12 + value.tint * 18).toFixed(12))];
  }

  function filter(values, kind = "sven") {
    const [brightness, contrast, saturation, sepia, hue] = filterParameters(values, kind);
    return `brightness(${brightness}) contrast(${contrast}) saturate(${saturation}) sepia(${sepia}) hue-rotate(${hue}deg)`;
  }

  global.AtlasCharacterAppearance = Object.freeze({ controls, fields, settingKey, normalize, settings, filterParameters, filter });
})(window);
