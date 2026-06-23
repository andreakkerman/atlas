# ATLAS PROCEDURAL SCENE EFFECTS AND EDITOR SPEC

**Status:** Normative implementation specification  
**Repository:** `D:\DevProjects\SvenAdventure`  
**Target:** Atlas browser game, desktop and iPad  
**Primary goal:** Add high-quality, engine-generated visual enhancements to existing painted level artwork, with a preset-first editor workflow that is easy for novices and deeply customizable for experts.

---

## 1. Product direction

Atlas level images remain the visual foundation.

The first version of the effects system must **enhance existing painted objects and environments**, not replace them.

Examples:

- keep a painted torch flame and add animated flicker, glow, light spill, smoke and optional sparks;
- keep painted glowing runes and add pulse, bloom and motes;
- keep painted water and add precisely masked shimmer;
- keep painted fountains and add sparkle, mist and surface movement;
- keep painted sun or moon and add halo, haze or light shafts;
- enhance roads, skies, trees and architecture with subtle atmospheric movement.

The system must avoid:

- generic browser-particle visuals;
- visibly repetitive motion;
- harsh rectangular effect boundaries;
- excessive glow;
- noisy or distracting animation;
- arbitrary per-effect z-index values;
- replacing painted objects in Phase 1;
- large external rendering frameworks unless repository analysis proves one is required.

The intended quality level is modern, premium 2D game presentation that remains visually compatible with Atlas’s illustrated storybook artwork.

---

## 2. Core UX principle

The editor must support three levels of control:

### 2.1 Preset-first

A novice chooses a named high-quality effect preset, places it in the level and immediately gets a polished result.

Examples:

- Torch enhancement
- Harbor water
- Warm pollen
- Chimney smoke
- Low ground mist
- Blue rune glow

The editor must not require the user to understand internal renderer names.

### 2.2 Quick customization

The most useful controls remain immediately visible:

- intensity;
- amount or density;
- speed;
- size;
- direction;
- color;
- glow;
- softness;
- placement geometry.

### 2.3 Advanced and expert customization

Relevant controls are available in collapsed sections:

- lifetime;
- variance;
- turbulence or noise;
- acceleration or gravity;
- oscillation;
- fade behavior;
- depth bands;
- glow falloff;
- secondary color;
- blend mode;
- seed;
- particle cap;
- quality tier;
- type-specific shaping controls.

A user must be able to reset:

- one field;
- one section;
- the whole effect instance;

back to the selected preset defaults.

---

## 3. Editor information architecture

Add two top-level editor modes:

- **Objects**
- **Effects**

The existing object-oriented editor remains under **Objects**.

The new **Effects** mode contains:

1. effect preset library;
2. level effect instance list;
3. scene canvas with effect guides;
4. selected effect property panel;
5. preview controls;
6. Draft / Apply persistence using existing Atlas patterns.

### 3.1 Effect library categories

Organize the preset picker by user-facing category:

- Light and fire
- Magic
- Atmosphere
- Smoke and steam
- Water
- Nature
- Surfaces
- Weather
- Shadows

Do not expose renderer-family names as the primary choice.

### 3.2 Effect cards

Each preset card should show:

- name;
- compact animated or representative preview where practical;
- short use description;
- supported geometry type;
- performance indication;
- available variants.

Example:

> **Torch enhancement**  
> Enhances an existing painted flame with controlled flicker, warm glow, light spill and optional sparks.  
> Placement: point / ellipse  
> Performance: Low

---

## 4. Internal architecture

Use a small number of generic renderer families.

Recommended families:

1. `glowField`
2. `particleField`
3. `fogField`
4. `plumeEmitter`
5. `lightBeam`
6. `surfaceShimmer`
7. `surfaceGlint`
8. `shadowField`

The architecture may refine these names after repository inspection, but the behavioral separation must remain.

### 4.1 Why `plumeEmitter` is separate

Smoke and steam must not be implemented as ordinary fog variants.

Fog and haze are broad zone effects with slow scene-level drift.

Smoke and steam are source-driven plume effects with:

- a clear origin;
- vertical rise;
- widening over time;
- directional wind response;
- evolving opacity;
- pulse or burst emission;
- local turbulence.

### 4.2 Shared engine requirements

All effect renderers should share:

- one coordinated animation lifecycle;
- deterministic seeded randomness;
- pause/resume behavior;
- visibility checks;
- quality-tier handling;
- editor/runtime configuration resolving;
- safe cleanup on level changes;
- no independent uncontrolled RAF loop per effect.

Prefer Canvas2D for animated procedural visuals. Use DOM/SVG only where it materially simplifies editor guides, handles or accessible controls.

---

## 5. Preset registry

Presets must be defined centrally in a versioned registry.

Each preset contains a complete quality recipe:

- renderer family;
- variant definitions;
- default geometry;
- default layer slot;
- colors;
- motion profile;
- fade profile;
- glow behavior;
- compositing;
- recommended and hard parameter ranges;
- performance budget;
- reduced-motion behavior;
- editor-visible quick controls;
- advanced controls;
- preset version.

Level instances should store:

- preset ID;
- variant ID;
- preset version;
- placement geometry;
- explicit user overrides;
- optional group ID;
- deterministic seed;
- enabled state.

Do not duplicate the entire resolved preset configuration into every level unless required for backward compatibility.

---

## 6. Phase 1 preset families

Implement the following preset families at production quality.

### 6.1 Light Source Enhancement

Purpose: enhance existing painted light sources.

Variants:

- Wall torch
- Large brazier
- Candle
- Lantern
- Window glow
- Beacon

Components may include:

- painted-flame enhancement;
- animated core flicker;
- outer glow;
- local light spill;
- optional rare sparks;
- optional smoke attachment;
- warm color variation.

Default behavior must be subtle and artwork-compatible.

### 6.2 Magical Glow

Purpose: enhance runes, crystals, portals, altars and magical objects.

Variants:

- Rune
- Crystal
- Sacred
- Arcane
- Warning
- Portal

Components:

- emissive core;
- outer glow;
- controlled pulse;
- optional motes;
- optional expanding soft ring for event use later.

Color customization must support:

- primary color picker;
- secondary color picker or automatic derived color;
- glow color picker or automatic derived color;
- visible hex values;
- reset to preset.

### 6.3 Ambient Floating Particles

Purpose: soft, environmental particles.

Variants:

- Warm pollen
- Sun dust
- Fine ancient dust
- Spores
- Magic motes
- Ash drift

Quality requirements:

- depth bands;
- controlled size distribution;
- smooth drift;
- no linear identical trajectories;
- soft fade-in and fade-out;
- deterministic variation;
- low visual density by default.

### 6.4 Sparks and Embers

Purpose: fire-associated particles.

Variants:

- Rising sparks
- Floating embers
- Forge sparks
- Magical sparks

Must differ materially from ambient particles through:

- shorter lifetime;
- stronger glow;
- upward acceleration;
- occasional bursts;
- higher speed variation;
- controlled rare larger particles.

### 6.5 Living Lights

Purpose: fireflies, wisps and slow autonomous glowing points.

Variants:

- Forest fireflies
- Golden wisps
- Blue spirit lights
- Cave glow insects

Motion should feel alive rather than like windblown dust:

- gentle wandering;
- local attraction bounds;
- irregular glow pulses;
- occasional direction changes;
- low density.

### 6.6 Atmospheric Fog

Purpose: broad mist, haze and atmospheric depth.

Variants:

- Low ground mist
- Harbor haze
- Forest mist
- Cold temple fog
- Distant atmospheric haze
- Moonlit fog

Must use layered, soft, non-repeating fields rather than visible moving circles.

Support:

- vertical falloff;
- layered drift;
- tint;
- density;
- edge feathering;
- depth impression;
- optional polygon and cutout masks.

### 6.7 Smoke and Steam

Purpose: source-bound plume effects.

Presets and variants:

- Chimney smoke
- Thin torch smoke
- Harbor smoke
- Steam vent
- Warm steam plume
- Fountain mist plume

Must support:

- emitter point;
- initial width;
- rise direction;
- wind direction;
- plume expansion;
- pulse rate;
- turbulence;
- fade over lifetime;
- color and opacity;
- burst versus continuous mode.

Smoke and steam need distinct defaults:

- smoke: darker, slower, more persistent;
- steam: lighter, faster fade, softer expansion;
- fountain mist: fine, short-lived, bright and localized.

### 6.8 Light Beam

Purpose: directional atmospheric light.

Variants:

- Window beam
- Forest sun rays
- Temple shaft
- Sacred beam
- Moon beam

Support:

- origin;
- direction;
- length;
- start width;
- end width;
- color;
- intensity;
- softness;
- optional dust participation;
- polygon or trapezoid geometry.

### 6.9 Water Surface

Purpose: enhance visible painted water.

Variants:

- Calm water
- Harbor water
- Moonlit water
- Sunlit water
- Fountain basin
- Dark canal water

Must support several independently shaped instances per level.

Quality requirements:

- non-uniform highlight bands;
- directional shimmer;
- controlled sparkle;
- local color tint;
- subtle speed variation;
- edge feathering;
- no visible tiling;
- no hard clipping edges.

### 6.10 Surface Glint

Purpose: animate highlights on non-water surfaces.

Variants:

- Wet stone
- Glass sweep
- Metal glint
- Crystal shimmer
- Marble sheen

Must be visually distinct from water shimmer:

- shorter or more localized highlights;
- less continuous motion;
- material-specific timing;
- lower density;
- optional one-shot or repeating sweep.

### 6.11 Bubbles and Spray

Purpose: water-related particles.

Variants:

- Rising bubbles
- Underwater microbubbles
- Fountain sparkle
- Fountain spray
- Fine splash mist

Support source emitters and bounded regions.

---

## 7. Future preset families

Design the architecture so these can be added later without schema redesign:

- Weather
  - light snow;
  - dense snow;
  - drizzle;
  - rain;
  - windblown ash.
- Moving Shadows
  - leaf-shadow drift;
  - cloud shadow;
  - firelight shadow;
  - water reflection bands.
- Distortion
  - heat haze;
  - magical distortion;
  - underwater distortion.

Do not implement expensive distortion effects in Phase 1 unless they are clearly low-risk in the current architecture.

---

## 8. Color system

Where color is relevant, use an actual color picker.

Each applicable effect supports the relevant combination of:

- primary color;
- secondary color;
- glow color;
- tint color;
- opacity.

Requirements:

- native or suitable visual color picker;
- visible editable hex value;
- reset button;
- recent colors if practical;
- auto-derived secondary color;
- auto-derived glow color;
- option to unlink and customize derived colors;
- preset-specific safe saturation and brightness ranges;
- no forced restriction that prevents expert use.

Quick mode should generally expose one main color and automatic linked colors.

Advanced mode exposes all color roles.

---

## 9. Precise placement geometry

Effect placement is a first-class feature.

Support:

1. point;
2. point plus radius;
3. rectangle;
4. ellipse;
5. polygon;
6. polygon with cutouts/exclusion polygons;
7. directional emitter;
8. directional beam.

### 9.1 Required scene editing interactions

In Effects mode, support:

- drag whole effect;
- resize rectangle and ellipse;
- resize radius;
- drag polygon vertices;
- add vertex by clicking an edge;
- delete selected vertex;
- create and edit cutout polygons;
- drag emitter origin;
- drag direction handle;
- duplicate;
- delete;
- copy/paste;
- keyboard nudge;
- Shift + keyboard nudge for larger steps;
- numeric coordinate editing;
- zoom;
- pan;
- fit level;
- fit selected effect;
- toggle all guides;
- isolate selected effect;
- hide effect preview;
- restart preview;
- pause preview;
- generate a new seed variation.

Reuse the proven interaction patterns from ambient flyby path editing where appropriate.

### 9.2 Water use case

A harbor level may contain water in several separated visible regions.

The editor must support:

- adding multiple `Water Surface` instances;
- drawing a polygon around each visible water region;
- drawing around ships, piers and walls;
- using cutouts where simpler than complex outer polygons;
- duplicating an existing water effect and reshaping it;
- grouping several regions so shared properties can be adjusted together.

Example shared group properties:

- color;
- speed;
- intensity;
- shimmer direction;
- highlight density.

Geometry remains per instance.

---

## 10. Effect grouping

Support optional `groupId`.

A group may share selected properties while retaining independent placement.

Group behavior must be explicit, not implicit.

Recommended shared-property options:

- visual profile;
- color;
- intensity;
- speed;
- direction;
- density;
- variant.

The editor must clearly indicate whether a field is:

- instance-specific;
- inherited from a group;
- overridden locally.

Avoid building a complex general-purpose inheritance system. Keep grouping focused on practical scene editing.

---

## 11. Example level-data schema

The final schema may be adapted to existing Atlas conventions, but it should resemble:

```js
sceneEffects: [
  {
    id: "harbor-water-left",
    label: "Harbor water left",
    presetId: "water-surface",
    variantId: "harbor-water",
    presetVersion: 1,
    enabled: true,
    seed: 18427,
    layerSlot: "worldAtmosphere",
    groupId: "viking-harbor-water",
    geometry: {
      type: "polygon",
      points: [
        { x: 120, y: 440 },
        { x: 580, y: 430 },
        { x: 620, y: 610 },
        { x: 90, y: 620 }
      ],
      cutouts: []
    },
    overrides: {
      intensity: 0.72,
      speed: 0.85,
      directionDeg: 6,
      primaryColor: "#A7C8D8",
      edgeFeatherPx: 18
    }
  }
]
```

Example torch enhancement:

```js
{
  id: "left-brazier-enhancement",
  label: "Left brazier",
  presetId: "light-source-enhancement",
  variantId: "large-brazier",
  presetVersion: 1,
  enabled: true,
  seed: 9031,
  layerSlot: "worldAtmosphere",
  geometry: {
    type: "pointRadius",
    x: 330,
    y: 340,
    radius: 125
  },
  overrides: {
    intensity: 0.82,
    warmth: 0.7,
    flickerAmount: 0.22,
    sparkAmount: 0.15
  }
}
```

Example chimney smoke:

```js
{
  id: "harbor-chimney-smoke",
  label: "Main chimney smoke",
  presetId: "smoke-and-steam",
  variantId: "chimney-smoke",
  presetVersion: 1,
  enabled: true,
  seed: 6612,
  layerSlot: "backgroundAtmosphere",
  geometry: {
    type: "directionalEmitter",
    x: 810,
    y: 185,
    directionDeg: -82,
    spreadDeg: 14,
    width: 22
  },
  overrides: {
    intensity: 0.65,
    riseSpeed: 0.8,
    windStrength: 0.18,
    plumeExpansion: 0.55
  }
}
```

---

## 12. Render-layer integration

Respect the fixed Atlas layer map:

1. Background — 10
2. Ambient flybys — 20
3. Ambient animals — 30
4. Sven — 40
5. Markers/world UI — 50
6. Companion bar/modals — 60
7. Editor workspace — 70
8. Editor controls — 80
9. Transitions — 90

Effects must use controlled semantic slots, not arbitrary z-index values.

Recommended effect slots:

- `backgroundAtmosphere`
  - above background;
  - below flybys.
- `worldAtmosphere`
  - above flybys;
  - below ambient animals and Sven.
- `foregroundAtmosphere`
  - above Sven;
  - below markers/world UI.
- `worldLight`
  - define a consistent position based on the current architecture, but do not allow per-instance arbitrary z-index.

The implementation must document the exact numeric mapping chosen.

Gameplay effects are pointer-transparent.

Editor guides and handles are interactive only in editor mode and use editor workspace/control layers.

---

## 13. Runtime rendering

### 13.1 Shared lifecycle

Use one coordinated animation scheduler for procedural effects.

Requirements:

- no independent RAF per effect;
- pause when the document is hidden;
- pause or reduce activity during transitions;
- cleanly dispose effects during level changes;
- support editor preview restart;
- support deterministic seed reset;
- avoid stale callbacks after level changes.

### 13.2 Deterministic randomness

Every effect instance has a seed.

The same:

- preset;
- geometry;
- overrides;
- seed;

must produce repeatable motion structure for editing and tests.

A `Generate variation` command changes the seed.

Determinism does not require every frame to be bit-identical across browsers, but preview and runtime behavior must be stable enough for authoring and automated tests.

### 13.3 Rendering quality

Use:

- smooth alpha fades;
- layered motion;
- bounded randomness;
- subpixel movement;
- non-linear interpolation;
- compositing appropriate to effect type;
- limited blur;
- pre-rendered procedural primitives where useful;
- reusable buffers and object pools where appropriate.

Avoid:

- one DOM node per particle;
- synchronous allocation per frame;
- visible hard clipping;
- identical repeating paths;
- excessive additive blending;
- full-screen expensive filters.

---

## 14. Performance strategy

Target:

- desktop;
- iPad landscape;
- iPad portrait.

Provide quality tiers:

- High
- Balanced
- Reduced

The default iPad tier should preserve visual character while reducing:

- particle count;
- fog layer count;
- blur radius;
- shimmer segment count;
- update frequency for low-priority effects.

Each preset defines:

- recommended budget;
- hard cap;
- quality-tier scaling;
- estimated performance impact.

The editor should show a simple indicator:

- Low
- Medium
- High

Warn when the current level exceeds recommended iPad budgets.

Do not silently change authored geometry or game logic.

---

## 15. Reduced motion

Respect `prefers-reduced-motion`.

Reduced-motion behavior should be preset-specific.

Examples:

- glow remains but flicker amplitude is reduced;
- fog becomes nearly static;
- particles reduce in count and speed;
- shimmer becomes a slow low-amplitude highlight;
- light beams retain static presence;
- no essential interaction depends on motion.

---

## 16. Preview behavior

Editor and runtime must use the same renderer and resolved configuration.

Required preview controls:

- Play
- Pause
- Restart
- Generate variation
- Show/hide guides
- Show/hide effect
- Isolate selected effect
- Show all effects
- Background only

Changing a Quick or Advanced field should update the preview immediately where safe.

Draft changes must not alter live level source until Apply follows the existing editor persistence model.

---

## 17. Validation and error handling

Add validation for:

- known preset ID;
- known variant ID;
- supported preset version;
- valid semantic layer slot;
- geometry compatible with preset;
- minimum polygon point count;
- valid cutout polygons;
- finite numeric coordinates;
- valid color values;
- safe numeric ranges;
- unique effect IDs within a level;
- valid group references;
- particle caps;
- unsupported expert fields;
- invalid direction or radius values.

Invalid effects must fail gracefully:

- do not crash the level;
- log a clear warning;
- skip or clamp only the invalid instance;
- preserve unrelated effects and gameplay.

---

## 18. Backward compatibility

Levels without `sceneEffects` must behave exactly as before.

Do not migrate unrelated level data.

Do not alter existing ambient animals, flybys, Sven, challenge, exit or companion behavior except where required for clean render-layer integration.

Preserve:

- current editor Draft / Apply workflow;
- current service-worker behavior;
- current offline behavior;
- existing level validation;
- existing render-layer tests.

---

## 19. First authoring validation

Do not add permanent scene-effect configurations to existing production levels as part of this implementation.

Codex must build and test the complete authoring workflow, but the first artistic placement of effects in an existing Atlas level will be performed manually by the user through the Effects editor.

For automated and technical validation, use one or more of these approaches:

1. a dedicated synthetic test fixture or test-only level;
2. temporary test-only effect data;
3. an existing level loaded with non-persistent editor draft data during Playwright tests.

The validation setup must demonstrate:

- adding a Light Source Enhancement effect;
- adding a polygon-based Water Surface effect;
- adding a directional Smoke and Steam emitter;
- moving and resizing effects;
- editing polygon vertices;
- creating and editing polygon cutouts;
- changing colors through the color picker;
- synchronizing color picker and hex values;
- applying Quick overrides;
- applying Advanced or Expert overrides;
- resetting fields and complete effects to preset defaults;
- duplicating and deleting effects;
- grouping multiple water regions;
- changing shared group properties while retaining independent geometry;
- Draft / Apply behavior;
- persistence and reload;
- runtime rendering from saved configuration;
- preview pause, restart and seed regeneration.

Do not rely on Codex to infer exact artistic placement from a painted production-level image.

Do not permanently modify existing production-level effect data unless explicitly requested later.

The intended first real-world pilot after implementation is a manually authored Viking harbor scene, configured entirely through the new Effects editor by the user.

The implementation is successful only if that manual authoring workflow can be completed without editing source code.


## 20. Testing requirements

Add focused tests for:

### Runtime

- level without effects remains unchanged;
- preset resolving;
- deterministic seed behavior;
- effects mount/unmount across level changes;
- pause/resume lifecycle;
- semantic layer ordering;
- pointer transparency;
- reduced-motion behavior;
- quality-tier scaling.

### Editor

- switch Objects / Effects mode;
- add effect from preset;
- select, move, resize and delete;
- duplicate;
- color picker and hex synchronization;
- Quick overrides;
- Advanced overrides;
- reset to preset;
- polygon creation;
- vertex insertion/deletion;
- cutout editing;
- directional handle;
- keyboard nudging;
- group shared-property behavior;
- Draft / Apply;
- persistence reload;
- preview pause/restart;
- seed regeneration.

### Authoring validation fixture

- test-only water regions remain inside their configured polygon and cutout geometry;
- grouped regions retain independent geometry;
- saved effects reload with the same preset, variant, overrides and seed;
- effects remain below markers and UI according to semantic layer slots;
- ambient animals remain clickable where relevant;
- no permanent production-level scene-effect data is required;
- iPad landscape;
- iPad portrait;
- desktop.


Use robust structural assertions rather than fragile pixel-perfect screenshots unless a visual snapshot approach already exists in the repository.

Run:

- syntax checks;
- `git diff --check`;
- level validation;
- relevant existing audit/report scripts;
- targeted Playwright suites;
- broader regressions affected by editor and render-layer changes.

---

## 21. Implementation quality bar

The implementation is not complete if it contains:

- placeholder preset cards;
- controls that do not affect runtime output;
- a separate fake editor renderer;
- technically present but visually unfinished presets;
- arbitrary free-form z-index controls;
- hardcoded pilot-only special cases;
- one-off logic tied to a specific level ID;
- duplicate animation loops;
- unsupported mobile-only omissions;
- incomplete cleanup on level changes.

A smaller set of polished presets is preferable to a larger set of shallow presets.

---

## 22. Recommended implementation scope

Implement the full foundation and editor mode in one coherent Codex run, including:

- `sceneEffects` level data;
- central versioned preset registry;
- shared renderer lifecycle;
- all required placement geometries;
- effect grouping;
- color picker controls;
- Quick / Advanced / Expert sections;
- Draft / Apply;
- validation;
- performance safeguards;
- desktop and iPad support;
- test fixtures or temporary non-persistent validation data;
- automated tests.

Prioritize production-ready delivery of these renderer/preset areas:

1. Light Source Enhancement
2. Magical Glow
3. Ambient Floating Particles
4. Sparks and Embers
5. Atmospheric Fog
6. Smoke and Steam
7. Light Beam
8. Water Surface
9. Bubbles and Spray

Implement Surface Glint and Living Lights if the shared foundation makes them low-risk and they can meet the same quality bar. Otherwise document them as the immediate next extension rather than delivering a weak implementation.

---

## 23. Codex execution instructions

Before coding:

1. inspect the current repository;
2. identify existing reusable patterns;
3. inspect editor mode/state handling;
4. inspect ambient animal and flyby renderers;
5. inspect Draft / Apply persistence;
6. inspect fixed render layers;
7. inspect level validators;
8. inspect service worker and cache behavior;
9. inspect relevant Playwright tests.

Treat this specification as normative.

Do not silently reduce scope.

When a requirement conflicts directly with the current architecture:

- implement the strongest maintainable alternative;
- document the conflict;
- document the chosen solution;
- document any consequence.

Do not commit or push.

Final report must include:

- architecture implemented;
- files changed;
- exact renderer families;
- exact presets and variants;
- editor functionality;
- validation fixtures and temporary test configuration;
- layer mapping;
- performance strategy;
- validation added;
- exact test results;
- justified deviations;
- remaining limitations.
