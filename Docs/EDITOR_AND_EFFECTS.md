# Atlas editor and effects contract

This document owns current editor behavior and optional visual-system integration. It replaces the execution instructions in earlier procedural/flyby task briefs and Cinematic investigation reports. [Dev Tools](DEV_TOOLS.md) owns commands and exact write boundaries; [Level Contract](LEVEL_CONTRACT.md) owns level/route/challenge data; [Learning Content Rules](ATLAS_LEARNING_CONTENT_RULES.md) owns question guidance; [Renderer Specification](renderer-current-spec.md) owns mode availability and GPU lifecycle.

Implementation authorities: [app editor integration](../src/app.js), [scene effects](../src/scene-effects.js), [ambient runtime](../src/ambient-system.js), [Cinematic settings](../src/cinematic-settings.js), [Cinematic editor](../src/cinematic-editor.js), [Cinematic renderer](../src/cinematic-renderer.js), and [dev-server validation/persistence](../scripts/dev-server.js).

## Editor ownership and persistence

There is one level editor with Characters, Challenges and Graphics sections. Reuse its selection, changed-section payload, Apply/Revert handlers and world resolver. Do not introduce a second editor, challenge state, effect preview implementation or per-renderer appearance setting for an existing property.

Drafts preview live without applying level source. Ordinary level drafts can be persisted to `editor.draft.json`; effect-only level drafts are server-transient. Cinematic/level-tuning changes are staged in world configuration, not guaranteed by the level-draft file. Apply can write level content, shared audio and world configuration through separate endpoints; Revert restores captured baselines, not every unrelated world change. Background upload is separately file-writing. See [persistence boundaries](DEV_TOOLS.md#persistence-boundaries).

Adding/duplicating an instance creates a unique instance ID while reusing asset/preset references. Removing an instance must not delete source art or library assets. Preserve unrelated authored fields and existing drafts. Minimize only collapses the panel; it is not editor close, Apply or Revert.

Editor controls consume their pointer/keyboard input without triggering walking or gameplay interactions. Maintain usable panel scrolling, focus, selection and collapse state across previews and ordinary updates. Keep the world usable on desktop and iPad in both orientations.

## Route and world overlays

**Editable route controls must be visible and interactive together. Hidden route controls must be non-interactive.** The full walking path and all editable points remain visible while the 2D editor is active, including Cinematic Mode. Fully closing the editor removes their visuals and hit targets; closing during a drag must stop route mutation. Reopening uses the same authored/draft coordinates. Minimizing the panel retains the active editor.

The existing route SVG is hosted in `.editorWorldTrack`, an editor overlay sibling above the Cinematic presentation canvas. It shares camera translation, world width and scale with `.worldTrack`; there is no second route model. Cinematic filters/visibility cannot suppress editor tooling. Ordinary gameplay presentation must not show editor routes when the editor is closed.

Use the existing circle/handle hit targets and drag constraints. Labels and empty SVG regions must not intercept unrelated world clicks. Do not make an entire guide group pointer-active merely to enable its handles. Route visibility is distinct from Cinematic's selected-layer guide filter; that filter governs Cinematic placeables, not whether the walking route is editable.

[Cinematic route regressions](../tests/cinematic-route-overlay.spec.js), [editor interaction regressions](../tests/editor-interactions.spec.js), and [layer regressions](../tests/render-layers.spec.js) cover alignment, interaction and lifecycle. The 2D route overlay is not a 3D route editor.

## Procedural scene effects

`src/scene-effects.js` owns the versioned preset registry, validation/ranges, preset/group resolution, seeded variation, geometry/masks, quality/reduced-motion policy and shared Canvas2D runtime. Preset-first authoring exposes descriptive library cards, variants and Quick/Advanced/Expert controls. Internal renderer-family names are not the primary user choices.

The shared families are `glowField`, `particleField`, `fogField`, `plumeEmitter`, `lightBeam`, `surfaceShimmer` and `surfaceGlint`. Smoke/steam use a directed plume, not a broad fog field. Presets have meaningful visual distinctions: source-bound light versus rune glow; dust without glowing cores versus living lights; directional embers versus floating particles; water shimmer versus sparse glints. Registry defaults, supported variants, control ranges and caps are authoritative in code rather than duplicated numerical inventories here. Invalid instances are reported and skipped by the effect resolver without crashing gameplay; authoring validation should still catch and correct them.

The library enhances authored artwork. Preserve the distinction between a light source, its spill, its particles and its visibility region. Do not replace painted objects or add production placements as an incidental engine change.

An instance references `presetId`, `variantId`, `presetVersion`, `id`, `seed`, `enabled`, `layerSlot`, optional `groupId`, `geometry`, optional `mask` and `overrides`. Save sparse authored overrides rather than a copied fully resolved preset. Optional `sceneEffectGroups` share only properties named in `sharedProperties`; a local instance override wins over a group override.

Geometry supports point, point-radius, rectangle, ellipse, polygon, directional emitter and directional beam forms. `geometry` defines the source/emitter; `mask.includes` and `mask.cutouts` define independent visibility polygons. Current masks also constrain spawning where practical. Separate future spawn/render-mask fields are not an implemented authoring requirement. `edgeFeatherPx` controls feathering; zero is hard clipping. Preview and runtime use the same resolving/rendering code.

The geometry workspace supports source/mask/cutout editing and optional linked movement. Polygon drawing closes at its first point or Enter, Escape cancels, and Backspace removes the latest uncommitted point. Move/resize guides through existing world-coordinate helpers; cutouts exclude pixels rather than changing gameplay geometry.

## Effect lifecycle, layers and quality

The scene-effect runtime uses one coordinated scheduler and at most one scene-effect canvas per semantic slot, not a canvas/animation loop per instance. Prepare a fresh resolved list for a new level; cancel prior animation and release runtime caches on disposal. Seeded instance variation is stable across ordinary rerenders. Pause/restart/isolate/hide/new-seed preview controls use this same runtime. Hidden/inactive scenes must not retain unnecessary animation work.

The fixed CSS stack is:

| Layer | CSS level |
| --- | ---: |
| Background | 10 |
| Background atmosphere | 15 |
| Ambient flybys | 20 |
| World atmosphere | 25 |
| Ambient animals | 30 |
| World light | 35 |
| Sven | 40 |
| Foreground atmosphere | 45 |
| World markers/UI | 50 |
| Companion/modals | 60 |
| Editor workspace | 70 |
| Editor controls | 80 |
| Transitions | 90 |

Effect instances select semantic slots, not arbitrary z-index values. Presentation canvases are pointer-transparent; the shared app routes gameplay interactions and editor overlays provide their own visible handles. Cinematic's compositor integration must preserve the effective stacking order, not merely an SVG descendant's nominal z-index.

Canvas2D effect tiers target High 60 Hz, Balanced 40 Hz and Reduced 24 Hz. Automatic detection selects Balanced for iPad and High otherwise; the existing document `data-effects-quality` override selects a runtime tier, and an instance's `qualityTier` can select its own resolving tier. Tiers reduce particles/layers/blur/shimmer segments through registry scaling and caps; these are targets, not measured FPS guarantees. Reduced motion separately applies preset-specific amount/speed/pulse/flicker scaling while retaining appropriate static presence; it does not automatically select the Reduced tier. Budget estimates/warnings are authoring aids; they do not silently alter route geometry or progression. These tiers are distinct from the 3D presets.

## Ambient animals and flybys

Instances reuse central `assets/ambient/` libraries. The local discovery endpoint validates asset sets for self-service add/duplicate flows. Preserve supplied dimensions/aspect ratios; do not crop/rewrite assets or impose the obsolete fixed Sven sprite intake on ambient art. Missing/invalid sets must not create broken partial entries.

The shared asset-readiness layer preloads/decodes configured frames and retains valid fallbacks. Do not swap to an undecoded alternate frame or hide a character while its next frame loads. Optional Minnie/Moose blink frames use independent timing and static fallback; ordinary UI rerenders must not reset their timing.

Flybys use shared path interpolation, precomputed geometry and time-based progress/wing animation, not pixels per frame. Movement is transform-based. Authored paths may extend outside level bounds; the path-edit workspace exposes that extra area without changing gameplay coordinates. Use existing direction/mirroring behavior to avoid rapid facing flips around small curve changes.

`syncKey` groups configured flybys for one schedule; it is not a separate authored group object. Group members do not also get independent timers. `startDelayMs` offsets members within a trigger; zero gives simultaneous starts. The editor synchronizes interval settings among members, while the scheduler reads the first member's interval; preserve that shared-interval invariant. A running instance does not overlap itself. Startup waits for configured readiness and a delay; visibility resume schedules fresh work rather than replaying a backlog. Playback stops outside supported gameplay screens or while the document is hidden; automatic flybys are suppressed for reduced motion. Explicit editor previews use existing preview controls.

Optional flyby sound uses existing audio handling; failed audio must not block flight. Cancel timers/audio and clear active instances on level changes/disposal. No inactive flyby RAF loop should remain running. Asset reuse and service-worker behavior must follow the existing cache/loading system rather than hardcoded new per-level runtime branches.

## Cinematic integration

Cinematic is the current **Renderer -> Cinematic** mode, not a separate experimental level engine. Its shared WebGPU compositor renders the painted world, authored depth, lighting/effects and participating sprites. The editor groups systems into Environment, Global Lighting, Effects and Characters; settings normalization and layer membership belong to `cinematic-settings.js`.

Placeable local/area lights, shafts, dedicated God Rays, atmosphere and particles use existing shared buffers/pipelines. God Rays are a shared effect primitive, not a renderer per ray. Source geometry, direction, spread and occlusion settings must agree with visible editor guides. Radius means radius, not diameter. Depth maps are authored image data with near/far interpretation, caching and a missing/undecodable fallback; this is not reconstructed 3D geometry or physically exact transport.

Cinematic guide filters apply within the active layer: Selected keeps compact selectable markers for authored placeables (including disabled instances) and full guides for the selection; All expands guides; Hidden removes these guides. Selection follows marker clicks. The walking route remains governed by editor-active state as specified above.

Challenge/exit cues project current active/completed/prerequisite/exit state. They never change progression. Sven, NPCs and animals receive configured light/atmosphere using their existing position and appearance, preserving decoded animation frames. Emission brightness must not inflate a particle's geometric size. Retained Illustrated effect classes are composed through existing mode integration; do not stack a duplicate lighting system over a Cinematic replacement.

Cinematic settings are authored per level through world configuration. Renderer switching must release/recreate resources through the shared ownership policy in [Renderer Specification](renderer-current-spec.md), preserving gameplay and editor data. No historical showcase settings or old laboratory FPS count is a current acceptance promise.

## Validation and migrated ownership

Use the relevant suites listed in [Dev Tools](DEV_TOOLS.md). Verify controls change actual output, Apply/reload preserves intentional edits, Revert retains unrelated data, source/geometry/mask behavior agrees between preview and runtime, and desktop/iPad overlays remain visible and correctly interactive.

| Former reference material | Canonical owner |
| --- | --- |
| Procedural spec + implementation + preset-quality brief | This document: registry/geometry/lifecycle/layers; Dev Tools: persistence; Level Contract: optional schema. |
| Ambient flyby/editor brief | This document: discovery, timing, paths, readiness, interaction isolation; Dev Tools: authoring and persistence. |
| Cinematic Lighting Lab | This document: shared compositor/authoring/overlays; Renderer Specification: ownership and validation. |
| Decisions, Preproduction, Generation Pipeline | Level Contract: coordinates/registration/assets; Dev Tools: authoring and validation; Vision: product principles. |
| World modes and dual-controls report | Renderer Specification: supported modes, export boundaries, input and resources. |

Task-specific bans, rollout plans, fixed historic inventories and prescribed final reports are not migrated as permanent rules. Detailed parameter schemas remain in their shared source registries; unimplemented future features do not become requirements merely by appearing in an old brief.
