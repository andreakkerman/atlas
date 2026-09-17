# Atlas current renderer specification

This is the current mode, input, resource and lifecycle contract. It contains no release history or scene inventory. [Graphics modes](../src/graphics-modes.js), [presets](../src/three-presets.js), [Atlas world policy](../src/atlas-world-policy.js), [Three renderer](../src/three-renderer.js), and their regression tests define current implementation values. Art tuning stays in the world policy/assets rather than being repeated here.

See [Dev Tools](DEV_TOOLS.md) for workflow, [Level Contract](LEVEL_CONTRACT.md) for shared coordinates/progression, [Editor and Effects](EDITOR_AND_EFFECTS.md) for 2D/Cinematic authoring, and [Learning Content Rules](ATLAS_LEARNING_CONTENT_RULES.md) for authored questions.

## Modes and availability

| UI group | Mode / persisted ID | Behavior |
| --- | --- | --- |
| Renderer | Illustrated / `illustrated` | Default painted 2D presentation. |
| Renderer | Cinematic / `cinematic` | Shared 2D WebGPU compositor with authored depth/light/effects. |
| Experimental | Voxel / `voxel` | Existing GPU presentation of the adventure. |
| Experimental | Real 3D / `3d` | Original detailed world, desktop-only, Desktop High configuration. |
| Experimental | Atlas 3D / `atlas-3d` | Separate stylized world with one canonical quality configuration on every supported device. |

The registry centralizes labels, IDs, availability, world assets and configuration. Unsupported Real selection on tablet/phone normalizes to Illustrated before fetching its heavy world; neither saved selection nor a query override bypasses that guard. Real remains visibly desktop-only in the menu. Levels without mapped 3D support use the existing Illustrated fallback.

All modes reuse gameplay, challenge activity, progression, coordinates and settings handlers. Graphics redraws, loading updates and world switches must not accidentally reconstruct an active canvas or restart an unrelated state machine. The main-menu carousel updates only its own DOM and does not change page scroll.

FPS/Debug controls in Graphics and the menu settings area share session state. The selected renderer and graphics preferences use the existing browser-local settings loader/saver in [voxel-renderer.js](../src/voxel-renderer.js), which normalizes through the mode registry; its filename does not mean those preferences belong only to Voxel. Authored world/level tuning instead uses the world resolver and editor save path. Do not add separate state for new access points. Loading milestones follow real completion boundaries, never an estimated timer or artificial percentage.

## Real/Atlas assets and authoring

Real loads `Levels/LVL-0001/3d/real-3d.glb`; Atlas loads `atlas-3d.glb` from that directory. The preserved authoring checkpoints are respectively `lvl0001.blend` and `lvl0001-stylized.blend`. Local Blender files are ignored; runtime GLBs are versioned. The shared route and gameplay anchors must remain compatible with the level.

Use the guarded export mapping in [export-lvl0001-blender.py](../scripts/export-lvl0001-blender.py):

```text
blender --background --python scripts/export-lvl0001-blender.py -- real-3d
blender --background --python scripts/export-lvl0001-blender.py -- atlas-3d
```

The exporter opens the mapped checkpoint, verifies world identity and writes only its mapped output. Historical constructors/conversion/art-pass scripts are not a clean-room rebuild pipeline and must not be rerun against a finished checkpoint as an export shortcut. Preserve Real when changing Atlas and vice versa. [Asset provenance](../Levels/LVL-0001/3d/SOURCES.md) remains beside the assets; confirm additions against their supplied source records.

## Canonical resource policy

Atlas preview on desktop uses the same quality/content as Atlas on tablet. There is no desktop quality uplift, per-device art fork or quality selector within Atlas. The internal configuration ID is `atlas-canonical`.

| Policy | Atlas 3D | Real 3D |
| --- | --- | --- |
| World/effect/presentation samples | 1 / 1 / 1 | 4 / 4 / 4 |
| DPR cap | 0.75 | 1.5 |
| Shadow map | 1024 squared | 4096 squared |
| Texture long-edge cap | 1024, aspect preserved, never upscale | Original |
| Anisotropy | 2 | 8 |
| Environment | HDR 512x256; PMREM 384x512 | HDR 2048x1024; PMREM 1536x2048 |
| GTAO / volumetrics / bloom | Disabled; no corresponding effect targets | GTAO; quarter-resolution 80-step volume; bloom |
| Final presentation depth | No default presentation depth attachment | Existing depth-enabled presentation |
| FXAA | Enabled, existing display pass | Existing Real presentation |

Both honor the current 1920-pixel width safety bound; actual drawing buffers depend on viewport and DPR. WebGPU sample counts are 1 or 4, not an invented 2-sample middle setting. Atlas FXAA debug A/B overrides require `debug3d=1` with `atlasFxaa=0/1`; they do not change canonical production quality.

World grouping and shadow-caster exclusions belong to `atlas-world-policy.js`, identical across Atlas devices. Preserve spatial instancing, shared materials/textures, static landscape transforms and cached shadows. Dynamic actors/camera/input continue updating. Small groundcover receives shadows without becoming an expensive caster population. Current lighting/material calibration belongs to the existing Atlas branch; do not alter Real's material policy incidentally.

Keep texture resizing in shared Source handling, preserve color/alpha/channel/UV metadata, and release decoded static pixels only after all dependent uploads/fences finish. Animated canvas/frame sources retain the live data they need. Resource estimates and queue-fence wall time are not measurements of physical GPU memory or hardware execution time.

## Preparation and execution

Quality and execution policy are separate. Atlas uses batched preparation on desktop and tablet: sequential explicit uploads, bounded world/shadow preparation in 16-draw-object batches, three hidden representative views with a maximum 512-pixel long edge, then the full-size playable frame. GPU completion must precede readiness; restore visibility/culling and the player view even on cleanup paths.

Desktop Atlas uses concurrent GLTF dependencies/two Draco workers and asynchronous visible rAF scheduling. Tablet/phone Atlas uses sequential dependencies and one in-flight gameplay frame, scheduling the next frame after completion. Do not remove tablet fencing based on desktop FPS. Real retains its Desktop High compile path and 18 hidden views plus the final player frame.

The opaque loading cover represents five actual stages: initialization, world/model data, materials, GPU/lighting preparation, final playable frame. Cancel legacy walking and prevent ground interactions behind the loader. Redundant synchronization of the same preparing world must keep its canvas mounted. Recovery/menu controls remain usable during preparation or failure.

## Input and route behavior

Use [shared Three input](../src/three-input.js) and the existing renderer route mapping. W/S move along the current travel direction and A/D retain keyboard turning; arrows retain their existing aliases. Mouse dragging looks; optional pointer lock must be capability-guarded. UI/form input cannot be swallowed by gameplay handlers.

Atlas touch has independent left movement and right look sticks, with stable touch IDs and dead zones. Left-stick movement is relative to horizontal view direction, including lateral movement. World dragging remains available for looking. Diagonal input is normalized. Real retains its existing controls rather than receiving an accidental Atlas control redesign.

Atlas movement stays within the 2.4-metre lane following its existing route and endpoint bounds. The camera follows route height; this is not general terrain collision. Lateral offset is runtime-local and resets on mode re-entry or an external route-progress jump. Existing 2D progress is updated through the shared route mapping.

Atlas walks at 2.7 m/s; iPad stick input can reach 4.8 m/s proportionally, and non-iPad `ShiftLeft` temporarily enables 4.8 m/s. Releasing it restores walking. The Atlas instruction line disappears five seconds after readiness, including reduced-motion layouts. The action control remains accessible between the touch sticks.

Cancel held input on blur, cancellation, navigation, suspension and disposal. Rebinding unchanged controls must preserve a held gesture. Gesture suppression is scoped to gameplay surfaces; menus, page scrolling and challenge forms retain ordinary behavior.

## GPU ownership, lifecycle and failure

Cinematic/Voxel use the shared [WebGPU capability broker](../src/webgpu-capabilities.js). Three owns its active world/device. Before acquiring Three resources, dispose other renderer resources and release the shared device; guard late acquisition so a canceled request cannot destroy a replacement renderer's device. Join canceled GLTF preparation before starting another world to avoid overlapping decode/resource ownership.

Disposal invalidates generation callbacks, cancels pending preparation/input/animation, releases scene/material/texture/postprocessing resources, unconfigures contexts and destroys owned devices. Mode/world identity participates in canvas retention and readiness. Late callbacks must not resurrect a canceled renderer or fail a newer generation.

`pagehide` suspends/disposes Three and blocks synchronization restarts. A persisted `pageshow` resumes through a fresh readiness gate. Ordinary visibility changes use the existing pause/resume behavior. GPU errors/device loss stop rendering and expose recovery; intentional destruction after invalidation is distinguished from unexpected loss.

Preparation operations have bounded cancellation/watchdog handling. Compact visible-frame completion has its existing foreground stall watchdog; hidden-tab throttling must not masquerade as a GPU hang. Do not hide an error by merely stopping animation while the UI reports ready, or by extending timeouts until a test passes.

Detailed shader/range/performance diagnostics are opt-in and bounded. Preserve original error/operation evidence and restore temporary hooks on cleanup. Injected exceptions demonstrate recovery, not a reproduced physical Safari fault.

## Vendor dependency

The vendored Three r180 TextureSizeNode correction is documented in [ATLAS-PATCHES.md](../assets/vendor/three/ATLAS-PATCHES.md). Multisampled depth texture dimensions must use the valid WGSL overload without a mip-level argument. A vendor refresh must preserve/re-evaluate this correction and run native shader validation; an image or incrementing frame counter alone does not prove every pipeline compiled correctly.

## Validation expectations

The conditional release gate in [AGENTS](../AGENTS.md) applies to relevant 3D renderer/resource changes, including indirect shared-code or asset changes. Unrelated UI, learning-content and documentation changes require their relevant tests, not an automatic full 3D run.

Against the existing local asset server, run GPU suites sequentially:

```powershell
$env:ATLAS_WEBGPU_QA='1'
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
npx.cmd playwright test tests/three-tablet-acceptance.spec.js --project=desktop-chromium --workers=1
```

Preserve both real-WebGPU tablet cases at 1180x734 and 1180x689, DPR 2, including 512x299 hidden views and repeated entries. Preserve separate 1770x1101 preparation coverage. Select applicable `three-presets`, `three-texture-budget`, `three-preparation`, `three-gpu-pressure`, `three-cleanup`, `three-page-lifecycle`, `three-renderer`, `graphics-modes` and `graphics-world-switch` suites, plus input/world-policy tests for affected behavior. Cover Desktop High and WebKit navigation where relevant.

Require actual GPU-completed preparation, clean shader/native validation, rendered movement, sustained frames and successful cleanup/recovery. Keep resource budgets and assertions; do not skip GPU work, swallow errors or relax timeouts to obtain a pass. Use the true browser DPR when claiming DPR-specific visual evidence.

Chromium's tablet configuration and desktop WebKit navigation are not physical iPad Safari/WebGPU certification. A physical root-cause claim needs the actual failing operation and a regression failing before the fix. Preserve unresolved physical-device gaps explicitly; local FPS, historical pass counts and a synthetic injected error cannot close them.

## Illustrated / Cinematic performance HUD

The existing shared FPS toggle enables one foreground gameplay cadence sampler for both modes: RAF callbacks divided by elapsed foreground wall-clock time over approximately one second. This is main-thread callback cadence, not GPU-completed or physically presented FPS. Intentional effect/sprite rates do not replace it. The compact HUD shows FPS; Debug adds worst interval and estimated missed opportunities.

Pacing uses the faster fifth of observed intervals as the expected cadence, retaining the fastest window baseline until reset. Intervals above 1.5 times that baseline contribute rounded missing opportunities; missed percentage divides those by observed plus missing callbacks. No 60 Hz assumption is used. A consistently slow stream from startup cannot reveal a faster physical display; the estimate describes observed opportunities.

Samples reset on gameplay screen/level identity or mode changes, disable, and visibility changes, showing `— FPS` until a fresh window completes. Ordinary UI remounts retain the measurement and rebind the HUD. Sampling stops outside gameplay or while hidden/disabled. Cinematic's smoothed renderer-loop FPS and CPU statistics remain separate diagnostics and reset when its loop stops. Illustrated subsystem rates are not added to the compact HUD. Experimental Voxel/3D metrics retain their existing semantics.
