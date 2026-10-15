# Exit-triggered flyby validation — 2026-10-15

## Implementation

Fallen Emperor starts with the Ballistic Gondola at the existing exit center, (1928, 434). Completing its three challenges only unlocks the normal exit. Clicking that exit locks gameplay, fades Sven for 500 ms, starts the existing attached FX/audio for a stationary 600 ms ignition, and follows the existing flyby path with a one-second acceleration. After departure and audio/FX cleanup, the environment remains active for 2.5 seconds before the existing reward transition records completion.

`activation: "exit"` extends the existing flyby runtime; omitted activation retains ambient scheduling. Idle, preview and launch use the same prepared sprite, depth mask, path, transform, FX and audio ownership. The shared inspector adds Activation and Post-Exit Delay. Preview restores idle without saving progress. Restart/navigation abort pending waits and clear launch ownership. Missing launch assets or a failed/cancelled animation cannot hold completion indefinitely.

## Affected files

- `src/ambient-system.js`: idle/exit ownership, ignition/easing, completion callbacks, preview reset, and cached all-visible foreground masks.
- `src/app.js`, `src/styles.css`, `src/cinematic-renderer.js`: existing exit transition integration, input lock, shared player fade, inspector controls, asset selection and idle resize refresh.
- `src/asset-readiness.js`: exit assets are optional for level entry; ordinary required assets retain their failure behavior.
- `src/flyby-fx.js`, `scripts/dev-server.js`: discovery, sidecar loading/editing and normal draft/Apply serialization for the exit asset family.
- `Levels/LVL-0039/level.js`, `assets/ambient/exit/gondola/fx.json`: configurable gondola path, timing, depth, sound and two existing warm-thruster attachments.
- `service-worker.js`: cache version bump for the updated runtime.
- `tests/exit-flyby-runtime.spec.js`, `tests/exit-flyby.spec.js`: targeted lifecycle, earned completion, input, preview, failure, rendering and persistence regressions.
- `tests/atlas-intro-pwa.spec.js`: offline byte checks include the changed runtime modules. `tests/flyby-sequences.spec.js`: fixtures use the current deferred app boot and shared Add picker while preserving sequence/persistence assertions.
- `Docs/LEVEL_CONTRACT.md`, `Docs/EDITOR_AND_EFFECTS.md`, `Docs/DEV_TOOLS.md`: owning contracts updated.

The supplied PNG/MP3 assets were not rewritten. A comparison against the pre-task level definition confirms that all existing non-flyby data and both existing ambient flybys are unchanged, including walk graph, challenges, interactive objects and exit coordinates. Pre-existing workspace changes are outside this task.

## Validation

Tests run against the existing local asset server at `http://127.0.0.1:4173`, with GPU suites sequential and one Playwright worker. Real-GPU Chromium uses `ATLAS_WEBGPU_QA=1`.

- Renderer gate: **40 passed** across `three-tablet-acceptance`, `three-preparation`, `three-presets`, `three-gpu-pressure` and `three-cleanup`. Includes the real 1180×734/DPR 2 tablet configuration, warm-up aspect coverage, separate 1770×1101 preparation, Desktop High, and cleanup/recovery checks.
- Targeted runtime tests: **10 passed**.
- Desktop browser regressions: **70 passed** in the main run, then **1 passed** on a focused rerun after repairing a stale sequence-editor fixture. Its removed Add accordion and now-hidden asset-set input were replaced with the current shared creation helper and an assertion of the selected set; no assertions or timeouts were relaxed. Covers all 14 new exit tests, normal previews/sequences, fixed depth, FX/audio, ordinary completion/replay, and PWA cache upgrade/offline bytes.
- Level validation: **39 production levels plus the developer fixture passed**. Level audit reports nine existing content warnings; unrelated authored geometry and effect budgets remain unchanged.
- iPad WebKit exit coverage: **24 passed**, with four intentional skips for desktop authoring and real-WebGPU Cinematic checks, which passed on desktop. Both orientations use touchscreen exit activation and cover all three earned challenges, idle/ignition/departure/delay, single completion, restart/navigation at every phase, and missing assets/animation cancellation.
- Existing WebKit touch navigation: **1 passed** (`three-renderer.spec.js`, “keeps iPad Atlas navigation outside 3D handlers”). Final `git diff --check` passed.

## Visual review and limits

Desktop screenshots of idle, launch and the empty scene are saved under `output/gondola-*.png`. Starting values are scale 0.25, speed 320 px/s, endpoint (1950, -500), fixed depth 1, and source-pixel nozzle anchors (480, 1101) and (733, 1101). These remain adjustable in the existing level and FX editors. The screenshots show both jets attached and the sprite fully clear before the delay; final art-direction approval of scale and nozzle placement remains a manual check.

Author a departure endpoint beyond the entire sprite/FX extent; completion follows the configured path endpoint. Multiple exit flybys wait for the last flight and then use the largest configured delay. The implementation targets the existing Illustrated/Cinematic flyby renderers; it does not add a new flyby pipeline to experimental 3D modes.

Bundled WebKit has no WebGPU: its iPad runs exercise touch, layout, DOM sprite/FX fallback and lifecycle, while native composition and continuing snowfall are verified in real-GPU Chromium. WebKit iPad layouts and Chromium tablet WebGPU are emulation/desktop coverage. Physical iPad Safari and an installed iPad PWA have not been exercised, and no physical-device fix is claimed. The PWA regression verifies cache upgrade and offline delivery of the updated files; it is not an offline end-to-end gondola playthrough.
