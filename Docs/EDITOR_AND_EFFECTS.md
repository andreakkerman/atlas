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

## Playable character sprite sets

Characters → General includes **Playable character**: Sven (`sven`) and ARC Sven (`sven_arc`). Switching decodes the selected set before replacing the preview, resets the shared animation controller and restores that character's saved tuning. General scale/movement speed/animation speed and Visual controls operate on the selected character's per-level settings bank; scene/Cinematic character lighting and shadows also remain per level. **Player Locomotion (Character / Global)** edits `world-config.js` → `characterLocomotion[characterId]`, affecting every level using that sprite set. The 18 detailed movement, transition timing, short-move and blink controls belong to that global profile; they remain separate from the level's Movement Speed and Animation Speed controls. Stale per-level locomotion fields are ignored. Apply uses the existing world-config save endpoint. No separate controller or ARC-specific level check is used.

`src/playable-characters.js` defines the required animation folders and supported IDs. `scripts/generate-character-manifest.js` discovers and numerically sorts each folder's actual frames in `assets/characters/<id>/`, producing `ATLAS_CHARACTER_MANIFEST.playableCharacters`. Run the normal manifest generation after changing assets. Required folders are idle, idle_blink, turn_from_left_to_right, turn_from_right_to_left, and walk_left/right_from_idle, walk_left/right_loop, walk_left/right_to_idle. Frame counts may differ independently; transitions and loops use the selected list at the existing 24 FPS, while world movement stays time-based. Missing required sets fail validation/loading explicitly rather than borrowing standard Sven frames.

## Ambient animals and flybys

Instances reuse central `assets/ambient/` libraries. The local discovery endpoint validates asset sets for self-service add/duplicate flows. Preserve supplied dimensions/aspect ratios; do not crop/rewrite assets or impose the obsolete fixed Sven sprite intake on ambient art. Missing/invalid sets must not create broken partial entries.

The shared asset-readiness layer preloads/decodes configured frames and retains valid fallbacks. Do not swap to an undecoded alternate frame or hide a character while its next frame loads. Optional Minnie/Moose blink frames use independent timing and static fallback; ordinary UI rerenders must not reset their timing.

Flybys use shared path interpolation, precomputed geometry and time-based progress/wing animation, not pixels per frame. Movement is transform-based. Authored paths may extend outside level bounds; the path-edit workspace exposes that extra area without changing gameplay coordinates. Use existing direction/mirroring behavior to avoid rapid facing flips around small curve changes.

`syncKey` groups configured flybys for one schedule; it is not a separate authored group object. Group members do not also get independent timers. `startDelayMs` offsets members within a trigger; zero gives simultaneous starts. The editor synchronizes interval settings among members, while the scheduler reads the first member's interval; preserve that shared-interval invariant. A running instance does not overlap itself. Startup waits for configured readiness and a delay; visibility resume schedules fresh work rather than replaying a backlog. Playback stops outside supported gameplay screens or while the document is hidden; automatic flybys are suppressed for reduced motion. Explicit editor previews use existing preview controls.

Optional flyby sound uses existing audio handling; failed audio must not block flight. Cancel timers/audio and clear active instances on level changes/disposal. No inactive flyby RAF loop should remain running. Asset reuse and service-worker behavior must follow the existing cache/loading system rather than hardcoded new per-level runtime branches.

The Flyby editor accepts **1–2000 px/s** (previously 20–2000); the existing time-based runtime and server minimum remain 1 px/s, with authored speeds/defaults unchanged. Discovery accepts either the existing A/B image pair or one static image, with optional sound. Selecting a discovered set immediately fills Frame A, Frame B and Sound. A single image produces `frameB: null` and a disabled **N/A** selector in the Add form; the instance editor also allows selecting N/A. Runtime accepts absent/null Frame B, loads/renders only A, and skips all A/B frame updates. Movement still uses the shared RAF; no flap timer is created. Two-frame flybys retain their original switching formula and flap Hz. `arc_wasp/awc_wasp.png` with `arc_wasp/arc_wasp.mp3` is a valid single-frame set without renaming art or placing it in any level. Existing authored configurations are not rewritten.

Each authored ID is reserved from trigger time (including `startDelayMs`) through full path completion. Only then does the configured recurrence delay begin; synchronized groups wait for all pending and active members to finish. Different authored IDs can coexist. Starting a preview cancels its queued recurrence, and repeated previews of an active/pending ID are ignored. Hide/level exit clears reservations, starts, recurrence timers and active instances. This prevents stale automatic timers from restarting long previews or delayed flights. Sound Trigger semantics apply equally to single- and two-frame flybys.

**Sound** has independent **During Flyby** and **On Tap** checkboxes. The normal draft/Apply path saves `soundTriggers: ["during", "tap"]`; either one-element array or an empty array is valid. The new array takes precedence. Legacy `soundTrigger: "during"` / `"tap"` resolves to the corresponding single enabled checkbox, and omitted configuration retains During Flyby only. Toggling a checkbox writes the new representation for that instance; existing levels are not bulk-migrated. Runtime, editor, dev server and level validation share the resolver/validator in `ambient-system.js`.

During Flyby retains trigger-time one-shot playback and the smooth fade using the greater of flight progress and media playback progress, so short calls remain audible on slow flights. On Tap flies silently unless During is also enabled. Both sources use the same active-audio ownership, master × instance volume and cleanup: a currently playing path is ignored, and ended/error/rejected playback releases ownership so a later tap can play again. No ARC-specific audio channel is used.

Gameplay uses the rendered sprite's native transformed hit bounds, including mirror/rotation and camera offset. Pointer capture retains the pressed flyby until release, preventing movement from redirecting its click to the world. The runtime still rejects inactive/offscreen/despawned instances. Taps are disabled while editor tools are open (including minimized tools), but closing tools enables gameplay taps even on `?dev=editor`; editing capability alone does not block input. Non-interactive renderer status banners remain pointer-transparent.

All four sound combinations work for single- and two-frame flybys. `assets/ambient/flybys/arc_snitch/` is discovered generically as Frame A `arc_snitch.png`, Frame B **N/A** (null), and Sound `arc_snitch.mp3`. It has no second-frame load or flap animation, and is available for manual placement only. Selecting Wasp, Snitch or a two-frame set immediately fills the same Add form. No Snitch placement is added to an authored level.

## Cinematic integration

Cinematic is the current **Renderer -> Cinematic** mode, not a separate experimental level engine. Its shared WebGPU compositor renders the painted world, authored depth, lighting/effects and participating sprites. The editor groups systems into Environment, Global Lighting, Effects and Characters; settings normalization and layer membership belong to `cinematic-settings.js`.

Placeable local/area lights, shafts, dedicated God Rays, atmosphere and particles use existing shared buffers/pipelines. God Rays are a shared effect primitive, not a renderer per ray. Source geometry, direction, spread and occlusion settings must agree with visible editor guides. Radius means radius, not diameter. Depth maps are authored image data with near/far interpretation, caching and a missing/undecodable fallback; this is not reconstructed 3D geometry or physically exact transport.

Cinematic guide filters apply within the active layer: Selected keeps compact selectable markers for authored placeables (including disabled instances) and full guides for the selection; All expands guides; Hidden removes these guides. Selection follows marker clicks. The walking route remains governed by editor-active state as specified above.

Challenge/exit cues project current active/completed/prerequisite/exit state. They never change progression. Sven, NPCs and animals receive configured light/atmosphere using their existing position and appearance, preserving decoded animation frames. Emission brightness must not inflate a particle's geometric size. Retained Illustrated effect classes are composed through existing mode integration; do not stack a duplicate lighting system over a Cinematic replacement.

Cinematic settings are authored per level through world configuration. Renderer switching must release/recreate resources through the shared ownership policy in [Renderer Specification](renderer-current-spec.md), preserving gameplay and editor data. No historical showcase settings or old laboratory FPS count is a current acceptance promise.

Particle Fields are shared by Illustrated and Cinematic through the existing `cinematicLighting.particles` configuration and Graphics editor. All presets (Pollen, Dust, Embers, Snow, Drizzle, Heavy Rain, Magic Motes), controls and depth settings apply identically to both. Illustrated exposes the same particle placement guides and uses the same GPU depthmap sampling/occlusion, without enabling other Cinematic lighting. There is no separate Illustrated particle configuration or persistence path.

Particle Fields use a world-space center (`x`, `y`) and local `width`/`height`, rotated by Direction, matching the editor guide. Spawn/wrap coordinates and the region mask use that same rotated rectangle; camera movement only projects it into the viewport. At Drizzle's 90-degree direction, local Height controls horizontal coverage. Presets preserve authored dimensions. **Scale Count With Area** uses `Count × Width × Height / (800 × 400)`, rounded and bounded to 1–20,000 particles per field. The cap reduces density, never coverage. New/reapplied Drizzle and Heavy Rain presets enable this option; existing saved fields default to fixed counts, preserving their performance budget. Apply/reload uses the normal shared world-config path in both modes. Focused GPU coordinate, editor persistence and desktop/tablet viewport coverage lives in `tests/cinematic-particle-bounds.spec.js`; emulated tablet checks do not replace physical iPad performance verification.

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

## Illustrated God Rays

Classic Illustrated God Rays are the existing `sun-presence` preset, labeled **God Rays (Sun Presence)** in the library. LVL-0001 uses `golden-hour-sun`, source (163, 199), radius 134, seed 2011289740 and `rayEndAngle: 98`. Its unchanged `drawSunPresence` Canvas2D renderer draws bloom, animated rays, dust and heat shimmer on `worldLight`. Instances live in `level.sceneEffects`, with point-radius source geometry, sparse overrides and optional masks. Selection, move/radius handles, coordinates, duplicate/delete, preview and Apply all use the generic scene-effect editor; no migration is needed. The canvas shares the world track camera translation and scale, without separate ray parallax. Cinematic filters out this preset and uses only its separate `cinematicLighting.godRays` GPU implementation. Illustrated never reads that config.

## Illustrated challenge cue glow

Illustrated circular challenge hotspots keep their existing CSS pulse and add a transient `magical-glow` / `rune` instance on the shared `worldLight` canvas. The inner effect uses the Rune particle defaults, omits both the central radial light field and solid core, and uses a clipped radius inside the existing 20 CSS-pixel ring inset. It follows world coordinates, viewport size and stable level/rune seeds. NPC sprite hotspots retain their existing presentation.

These are built-in gameplay decorations, not authored `sceneEffects`: no level writes, editor entries or extra settings are introduced. They share the existing scheduler, quality/reduced-motion handling and pause/visibility lifecycle. Inactive/completed hotspots have no inner glow. Other rendering modes and authored Rune presets are unchanged. Editor effect isolation applies to authored effects; gameplay cues remain present until the shared preview is paused.
