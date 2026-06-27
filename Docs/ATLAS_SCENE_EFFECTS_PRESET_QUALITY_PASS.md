# Atlas Scene Effects Preset Quality Pass

**Repository:** `D:\DevProjects\SvenAdventure`  
**Primary files:**  
- `src/scene-effects.js`
- `src/app.js`
- `src/styles.css`
- `scripts/validate-levels.js`
- `scripts/dev-server.js`
- `tests/scene-effects.spec.js`
- relevant editor/render-layer/ambient tests

**Related specifications:**  
- `ATLAS_PROCEDURAL_SCENE_EFFECTS_AND_EDITOR_SPEC_v2.md`
- `ATLAS_SCENE_EFFECTS_IMPLEMENTATION.md`

**Goal:**  
Improve the existing Atlas procedural scene-effects library so that the default presets are visually polished, clearly distinct, storybook-compatible, child-readable for an 8–9 year old, and broadly usable across the current 26 Atlas levels.

This is a **quality and differentiation pass**, not a system rewrite.

---

## 1. Context

Atlas is a premium illustrated 2D side-view adventure game for Sven, age 8–9.

The painted level artwork remains the visual foundation. Procedural effects should make the existing scenes feel alive, magical and polished without replacing the painted artwork.

The current system already has:

- a scene-effects runtime;
- a preset-first Effects editor;
- renderer families;
- geometry editing;
- semantic layer slots;
- deterministic seeds;
- Draft / Apply persistence;
- validation;
- Playwright tests.

Do not rebuild the system from scratch.

The problem to solve is visual quality and visual differentiation.

Previous iterations had a failure mode where different effects, such as pollen and fireflies, looked too similar: small vague glowing particles. This must be fixed.

---

## 2. Non-negotiable constraints

### 2.1 Do not change production content

Do **not** add permanent `sceneEffects` or `sceneEffectGroups` to existing production levels.

Do **not** artistically place effects in production levels.

The user will manually author the first real production scene through the Effects editor after this run.

Allowed:

- synthetic test fixtures;
- temporary Playwright-injected effect data;
- draft-only data during tests;
- documentation examples.

Not allowed:

- permanent effect configs in `Levels/`;
- hardcoded pilot effects for Runenpoort, Viking harbor, Umbria, Oostenrijk, Leonardo, or any other production level.

### 2.2 Do not touch learning/challenge content

Do **not** modify:

- challenge prompts;
- answers;
- choices;
- explanations;
- `hintMinnie`;
- `hintMoose`;
- clock visuals;
- learning metadata;
- Leonardo question content;
- story/challenge variants.

### 2.3 Do not rewrite architecture

Do **not**:

- replace Canvas2D;
- introduce WebGL, Pixi, Three, or other heavy rendering frameworks;
- create one animation loop per effect;
- create one canvas per effect;
- add arbitrary per-effect z-index;
- create a fake editor-only renderer;
- mass-refactor `src/app.js`;
- mass-format production level files;
- change service-worker/offline behavior unless a direct bug requires it.

### 2.4 Do not commit or push

Do not commit.  
Do not push.

Final output should be a report with files changed, tests run, limitations and deviations.

---

## 3. Current architecture to preserve

Preserve the existing design:

- `src/scene-effects.js` owns the preset registry, resolving, validation, seeded variation, renderer families, quality/reduced-motion resolving and the coordinated scheduler.
- Runtime and editor preview use the same resolver and renderer families.
- The runtime uses at most one canvas per semantic effect slot.
- Gameplay canvases use `pointer-events: none`.
- Smoke and steam use `plumeEmitter`, not broad-zone `fogField`.
- Fog/haze use `fogField`, not smoke plumes.
- Effects use semantic layer slots:
  - `backgroundAtmosphere`
  - `worldAtmosphere`
  - `worldLight`
  - `foregroundAtmosphere`

---

## 4. Primary objective

Perform a **Preset Visual Identity Pass**.

Every user-facing preset and important variant must have a distinct visual identity based on:

1. **Shape signature**  
   What the visible marks look like: dust specks, soft motes, glowing cores, sparks, bubbles, shimmer bands, glints, plume blobs, beam haze.

2. **Motion signature**  
   How it moves: wind drift, living wander, upward ember rise, source plume rise, surface shimmer, material sweep, bubble rise, fountain spray.

3. **Timing signature**  
   How it appears and disappears: soft fade, pulse, flicker, burst, decay, intermittent sweep, breathing glow.

4. **Context signature**  
   Where it belongs: sunlit forest, dark harbor, magical rune, water basin, fountain, metal gear, wet stone, old ruin, candle, lantern.

5. **Child readability**  
   A child of 8–9 should be able to recognize the intended effect category when used at normal default settings.

The defaults must be immediately useful after adding a preset in the Effects editor.

Advanced tweaking should improve placement-specific fit, not be required to make the effect look acceptable.

---

## 5. Required similarity audit

Before coding, inspect the current presets and variants and produce a short audit table in the final report:

```text
preset / variant | renderer | current visual signature | similarity risk | planned adjustment
```

Specifically compare and fix similarity risks between:

| Effects | Must differ by |
|---|---|
| warm pollen vs forest fireflies | non-emissive wind drift vs living glowing wander |
| sun dust vs magic motes | passive atmosphere vs object-bound magical motion |
| ancient dust vs pollen | muted indoor/ruin dust vs warm outdoor sunlight |
| embers vs fireflies | upward fire decay vs autonomous living motion |
| sparks vs magic motes | burst/fire source vs magical orbit/attraction |
| fog vs smoke | broad layered field vs source-bound rising plume |
| steam vs smoke | lighter/faster/softer vs darker/slower/persistent |
| water shimmer vs surface glint | continuous masked water bands vs short material highlights |
| fountain sparkle vs bubbles | bright spray/glints vs round rising bubbles |
| rune glow vs torch glow | cool magical pulse/motes vs warm flicker/sparks |

Do not mark presets as acceptable merely because they have different names or colors. They must differ in visible behavior.

---

## 6. Priority presets and required visual signatures

Prioritize improving existing presets over adding new ones.

### 6.1 Light Source Enhancement

**Use cases:** torches, braziers, candles, lanterns, beacons, warm windows.

Must feel like enhancement of an existing painted light source.

Required differentiation:

| Variant | Signature |
|---|---|
| Wall torch | warm asymmetric flicker, small flame glow, rare upward sparks |
| Large brazier | wider glow, stronger spill, occasional ember bursts |
| Candle | small soft flicker, very low sparks, intimate glow |
| Lantern | steadier glow, smaller flicker, warm halo |
| Window glow | broad soft interior glow, almost no particles |
| Beacon | larger stronger light, slower pulse/flicker, controlled bloom |

Avoid:

- generic orange circles;
- excessive additive glow;
- too many particles;
- flicker that feels like UI blinking.

Default should be clearly visible in dark scenes, controlled in bright scenes.

---

### 6.2 Magical Glow

**Use cases:** runes, crystals, portals, altars, magical locks.

Required signature:

- cool or saturated emissive core;
- soft outer glow;
- slow controlled pulse;
- small nearby motes or energy flecks;
- motion tied to the object, not drifting across the whole scene.

Variants must differ:

| Variant | Signature |
|---|---|
| Rune | compact glow, glyph/object-bound, cyan/blue default |
| Crystal | sharper highlight, occasional sparkle/glint |
| Sacred | softer gold/white pulse, calm |
| Arcane | purple/blue, slightly irregular magical pulse |
| Warning | warmer/redder, more alert but not flashing aggressively |
| Portal | larger field, subtle ring/breathing motion if supported |

Avoid:

- looking like fireflies;
- looking like generic pollen;
- excessive neon bloom.

---

### 6.3 Ambient Floating Particles

**Use cases:** sunlit forest, meadow, old ruins, dusty rooms.

These are passive atmosphere effects. They should not look alive or magical unless explicitly a magic variant.

Required differentiation:

| Variant | Signature |
|---|---|
| Warm pollen | non-emissive cream/gold flecks, slow wind drift, visible in sunlit zones |
| Sun dust | smaller, softer, lower density, more vertical depth feel |
| Fine ancient dust | gray/cream, very low opacity, slow indoor/ruin drift |
| Spores | organic, slightly larger, muted green/cream, gentle float |
| Magic motes | should be more object-bound/orbiting than normal dust; do not make it look like pollen |
| Ash drift | darker, downward or diagonal drift, non-emissive or barely glowing |

Critical rule:

`Warm pollen`, `sun dust`, and `ancient dust` must not have glowing cores.

They may be softly lit by scene color, but they are not little lamps.

---

### 6.4 Sparks and Embers

**Use cases:** torch, brazier, forge, campfire, magical fire.

Required signature:

- source-bound;
- upward acceleration or burst;
- short lifetime;
- warm color decay;
- occasional larger sparks;
- fade/dim as they rise.

Must differ from fireflies:

- no wandering;
- no hovering;
- no living pauses;
- no autonomous direction changes.

Must differ from pollen:

- more emissive;
- faster;
- shorter-lived;
- source-driven.

---

### 6.5 Living Lights

**Use cases:** fireflies, wisps, cave insects, spirit lights.

Required signature:

- low count;
- distinct individual points;
- emissive core;
- irregular glow pulse;
- gentle wandering;
- occasional direction changes;
- occasional pause/hover;
- local attraction bounds.

Must differ from pollen:

- alive, not wind-driven;
- fewer but more recognizable;
- stronger glow core;
- non-linear paths.

Must differ from magic motes:

- living, free-moving behavior;
- not necessarily bound tightly to a rune/crystal.

Default count should be low. Five recognizable fireflies are better than fifty vague dots.

---

### 6.6 Atmospheric Fog

**Use cases:** forest mist, harbor haze, cold temple fog, moonlit fog, distant haze.

Required signature:

- broad layered fields;
- soft non-repeating movement;
- vertical falloff;
- no visible circles;
- no particle swarm look;
- soft mask edges.

Must differ from smoke:

- fog is area-based and slow;
- smoke is source-bound and plume-shaped.

Reduced motion should make fog nearly static while preserving soft atmosphere.

---

### 6.7 Smoke and Steam

**Use cases:** chimney smoke, torch smoke, harbor smoke, steam vent, fountain mist.

Required signature:

- clear emitter/source;
- rise direction;
- widening plume;
- wind response;
- turbulence;
- fade over lifetime;
- continuous or pulsed emission.

Required differentiation:

| Variant | Signature |
|---|---|
| Chimney smoke | darker, slower, wider, persistent |
| Thin torch smoke | subtle, narrow, low opacity |
| Harbor smoke | broader and wind-influenced |
| Steam vent | lighter, faster fade, softer expansion |
| Warm steam plume | warm tint, soft rise |
| Fountain mist plume | fine, short-lived, bright/localized |

Must not look like generic fog.

---

### 6.8 Light Beam

**Use cases:** forest sun rays, window beams, temple shafts, moon beams.

Required signature:

- directional beam body;
- soft edges;
- length/width control;
- optional dust participation;
- low-frequency motion only;
- no harsh polygon boundaries.

Variants:

| Variant | Signature |
|---|---|
| Window beam | controlled rectangular/trapezoid beam, warm dust |
| Forest sun rays | wider, softer, broken by atmosphere |
| Temple shaft | stronger vertical/sacred feel |
| Sacred beam | calm glow, subtle particles |
| Moon beam | cool, dim, gentle |

---

### 6.9 Water Surface

**Use cases:** harbor, lake, basin, canal, fountain water.

Required signature:

- masked surface highlights;
- non-uniform horizontal/curved bands;
- directional shimmer;
- local tint;
- subtle speed variation;
- controlled sparkle;
- edge feathering.

Must not:

- create a blue overlay over the whole water region;
- show hard polygon edges;
- tile visibly;
- look like surface glint.

Variants:

| Variant | Signature |
|---|---|
| Calm water | soft slow bands |
| Harbor water | darker, deeper, occasional glints |
| Moonlit water | cool narrow highlights |
| Sunlit water | warmer broader shimmer |
| Fountain basin | smaller/local brighter motion |
| Dark canal water | low intensity, sparse highlights |

---

### 6.10 Surface Glint

**Use cases:** wet stone, glass, metal, crystal, marble.

Required signature:

- short localized highlight sweeps;
- lower density than water shimmer;
- material-specific timing;
- less continuous than water;
- often rare/intermittent.

Variants:

| Variant | Signature |
|---|---|
| Wet stone | low horizontal glints on cobbles/ground |
| Glass sweep | cleaner smooth sweep |
| Metal glint | sharper, rarer, brighter |
| Crystal shimmer | small sharp sparkle plus soft shine |
| Marble sheen | broad subtle soft sweep |

Must not look like water shimmer.

---

### 6.11 Bubbles and Spray

**Use cases:** fountains, water machines, underwater, pipes, splash mist.

Required differentiation:

| Variant | Signature |
|---|---|
| Rising bubbles | round/ring-like bubbles rising with wobble |
| Underwater microbubbles | tiny dense upward bubbles |
| Fountain sparkle | bright short glints near water impact |
| Fountain spray | directional droplets, arc/spread |
| Fine splash mist | soft local mist, short-lived |

Must not look like magic motes or fireflies.

If the current library lacks a good way to author small falling water/trickle effects for water machines, consider adding a narrow, low-risk variant under `bubbles-and-spray`, for example:

```text
small-water-trickle
```

Only add it if it can be implemented without architectural changes.

---

## 7. Renderer guidance

Prefer small renderer/preset improvements over new architecture.

### 7.1 Canvas2D remains the rendering technique

Keep Canvas2D.

Do not introduce a new rendering engine.

### 7.2 Particle renderer differentiation

If needed, extend or use existing renderer config fields so `particleField` can produce distinct looks.

Useful concepts:

```text
particleShape:
- softDot
- dustSpeck
- elongatedMote
- ember
- sparkle
- bubble
- fireflyCore
- ashFlake

emissive:
- false for pollen/dust/ash unless intentionally glowing
- true for fireflies/embers/magic

motionProfile:
- windDrift
- livingWander
- upwardEmber
- orbitFocus
- fountainSpray
- risingBubble
- ashDrift
```

Do not overbuild. Add only what is needed to clearly differentiate current presets.

### 7.3 Fog renderer

Fog should be layered fields, not a particle cloud.

Improve:

- soft bands/layers;
- vertical falloff;
- mask feathering;
- slow non-repeating drift;
- reduced-motion near-static state.

### 7.4 Plume renderer

Smoke/steam should clearly rise from a source.

Improve:

- widening over lifetime;
- wind response;
- turbulence;
- opacity decay;
- variant-specific smoke/steam/mist defaults.

### 7.5 Shimmer and glint renderers

Water shimmer and surface glint must not be interchangeable.

Water:

- more continuous;
- surface-following;
- banded;
- masked.

Glint:

- shorter;
- sharper;
- rarer;
- material-like;
- less continuous.

---

## 8. Editor library improvements

Improve preset cards so the user can choose effects by intent, not renderer knowledge.

Each preset card should include, where practical:

- user-facing name;
- short description;
- `Best for`;
- `Avoid for`;
- placement geometry;
- performance indicator;
- variants;
- one-sentence visual signature.

Example:

```text
Warm pollen
Best for: sunlit forests, meadows, warm outdoor scenes.
Avoid for: night scenes, magical objects, fire sources.
Looks like: soft non-glowing dust/pollen drifting through sunlight.
Placement: rectangle / ellipse / polygon.
Performance: Low.
```

Do not expose renderer family names as the primary decision model.

---

## 9. Defaults and child readability

The default for each preset should be:

- visible within 2 seconds;
- visually recognizable;
- not noisy;
- not dominant over painted artwork;
- usable before advanced tweaking;
- safe on iPad Balanced tier;
- still present under reduced motion.

For Atlas, “subtle” does not mean invisible.

Some effects should be clearly readable by default:

| Effect type | Default visibility |
|---|---|
| rune glow | medium-clear |
| torch/flame | clear |
| fountain sparkle | medium-clear |
| water shimmer | medium |
| fireflies | low count but individually clear |
| pollen/dust | subtle |
| fog/haze | subtle |
| surface glint | subtle/intermittent |
| smoke/steam | subtle-medium |

---

## 10. Performance and reduced motion

Preserve existing performance tiers:

- High
- Balanced
- Reduced

Balanced remains the default iPad tier.

Improve the editor’s iPad budget estimate if it is too particle-only. It should account, at least roughly, for:

- particle count;
- fog layer count;
- blur/softness;
- shimmer/glint segment count;
- mask/polygon area;
- beam dust participation.

Do not build a profiler.

Reduced motion must preserve static visual presence:

| Renderer | Reduced-motion expectation |
|---|---|
| glowField | glow remains, flicker/pulse reduced |
| particleField | lower count/speed, still visible |
| fogField | nearly static field |
| plumeEmitter | lower emission/speed, source presence remains |
| lightBeam | beam remains, dust/motion reduced |
| surfaceShimmer | slower/lower-amplitude shimmer |
| surfaceGlint | rarer/slower sweeps |

---

## 11. Validation requirements

Tighten validation only where needed.

Ensure validation catches:

- unknown `presetId`;
- unknown `variantId`;
- unsupported `presetVersion`;
- invalid `layerSlot`;
- geometry type incompatible with preset;
- minimum polygon point count;
- invalid/self-intersecting cutouts where supported;
- non-finite coordinates;
- invalid hex colors;
- numeric range violations;
- duplicate effect IDs;
- invalid group references;
- unsupported overrides;
- group overrides not declared in `sharedProperties`;
- particle caps above hard limits.

Invalid effects should fail gracefully at runtime:

- warn clearly;
- skip or clamp only the invalid instance;
- do not crash the level;
- do not affect unrelated gameplay.

---

## 12. Tests to add or adjust

Use robust structural tests. Do not add fragile pixel-perfect screenshots unless the repository already uses stable visual snapshots.

Add or adjust tests for:

### 12.1 Visual identity / differentiation

Test resolved preset configs so visually similar presets are structurally distinct.

At minimum assert:

- pollen/dust variants are non-emissive or materially less emissive than fireflies/magic/embers;
- fireflies use living/wander-like motion, not wind drift;
- embers/sparks use source/upward/burst-like behavior, not living wander;
- magic motes are more object-bound/orbit/attraction-like than pollen;
- fog uses `fogField`;
- smoke/steam uses `plumeEmitter`;
- water uses `surfaceShimmer`;
- surface glint uses `surfaceGlint`;
- bubbles/spray are distinct from magic/fireflies.

### 12.2 Editor usability

Where practical, test:

- preset cards expose user-facing descriptions / best-for information;
- adding a priority preset still works;
- quick controls still affect resolved output;
- reset actions preserve or reset geometry according to their label;
- Draft / Apply still writes `sceneEffects` top-level, not under `audioConfig`.

### 12.3 Runtime and regression

Keep or strengthen:

- levels without effects remain unchanged;
- semantic layer ordering;
- pointer transparency;
- effects mount/unmount across level changes;
- reduced motion changes resolved config;
- quality-tier scaling;
- ambient animals/flybys remain functional;
- no permanent production `sceneEffects` are added.

---

## 13. Commands to run

Inspect package scripts first:

```powershell
node -e "console.log(require('./package.json').scripts)"
```

Run the applicable validation/audit commands present in the repo.

Expected important commands include:

```powershell
npm run validate:levels
npm run audit:levels
npm run report:levels
git diff --check
```

Run targeted Playwright tests. Adjust project names based on `playwright.config`.

Recommended set:

```powershell
npx playwright test tests/scene-effects.spec.js --project=desktop-chromium
npx playwright test tests/scene-effects.spec.js --project=ipad-landscape
npx playwright test tests/scene-effects.spec.js --project=ipad-portrait
npx playwright test tests/editor-interactions.spec.js --project=desktop-chromium
npx playwright test tests/render-layers.spec.js --project=desktop-chromium
npx playwright test tests/ambient-animals.spec.js --project=desktop-chromium
npx playwright test tests/ambient-flybys.spec.js --project=desktop-chromium
npx playwright test tests/leonardo.spec.js --project=desktop-chromium
```

If a test cannot run, report why.

---

## 14. Priority order for low remaining Codex budget

The user has limited Codex credits. Optimize for a high chance of a successful single run.

If time or complexity becomes an issue, prioritize in this order:

1. Similarity audit and preset recipe fixes for existing presets.
2. Particle differentiation: pollen/dust/fireflies/embers/magic/bubbles.
3. Water vs glint differentiation.
4. Smoke vs fog vs steam differentiation.
5. Preset card descriptions / best-for metadata.
6. Reduced-motion and iPad estimate hardening.
7. Validator/test coverage for the changed behavior.
8. Documentation update.

Do not spend time on:

- new renderer families;
- weather;
- shadows;
- distortion;
- production placement;
- large editor refactors;
- new heavy dependencies;
- visual snapshot infrastructure.

---

## 15. Acceptance criteria

The run is successful when:

### Visual quality

- Default presets are visibly better and more distinct.
- Pollen, dust, fireflies, embers, magic motes and bubbles no longer feel like the same small glowing particles with different colors.
- Fog does not look like smoke.
- Smoke/steam does not look like fog.
- Water shimmer does not look like surface glint.
- Torch/rune/window/lantern glows have distinct behavior.
- Defaults are immediately usable from the editor.

### Architecture

- Existing Canvas2D architecture is preserved.
- Runtime and editor preview still share the same resolver/renderers.
- One coordinated scheduler remains.
- No one-canvas-per-effect pattern is introduced.
- No arbitrary z-index controls are introduced.
- Semantic layer slots are preserved.

### Editor

- Effects editor still works.
- Objects editor still works.
- Preset cards are clearer and more user-facing.
- Quick controls remain useful.
- Advanced controls remain available where relevant.
- Draft / Apply behavior is preserved.
- Reset behavior is clear and does not unexpectedly destroy carefully authored geometry.

### Data safety

- No permanent production `sceneEffects` or `sceneEffectGroups` are added.
- No challenge/learning content is modified.
- No large unrelated reformatting.
- No commit or push.

### Tests

- Relevant validation passes.
- Targeted Playwright tests pass or failures are explicitly explained.
- `git diff --check` passes.
- Final report documents changed files, tests run, deviations and remaining limitations.

---

## 16. Final report requirements

At the end, report:

1. Current preset inventory inspected.
2. Similarity risks found.
3. Preset/renderer changes made.
4. Editor card/metadata changes made.
5. Validation changes made.
6. Tests added or updated.
7. Exact commands run and results.
8. Files changed.
9. Confirm no production level effect placements were added.
10. Confirm no challenge/learning content was modified.
11. Confirm no commit/push was performed.
12. Remaining limitations and recommended next step.

The recommended next step after this run is manual authoring of one pilot scene through the Effects editor, likely Viking harbor or Umbria water-machine, without source-code editing.
