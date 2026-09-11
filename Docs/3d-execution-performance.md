# Atlas / Real 3D execution performance investigation

2026-09-11. Local changes only; no commit or deployment. The static cache key is advanced to `v160-desktop-execution` for a future approved deployment; source worlds are untouched. The physically reported iPad result remains approximately 17 FPS; this investigation does not claim 30 FPS on Safari.

## Finding and delivered correction

Atlas was selecting `compact=true` from **world identity**, even on desktop. Its visible loop submitted a frame, awaited `renderer.waitForGPU()` (`queue.onSubmittedWorkDone()`), and only then requested the next animation frame. Real used the normal asynchronous desktop loop. Atlas also used one Draco worker and sequential dependency decoding on desktop.

The delivered change separates those execution choices from canonical visual settings. Desktop Atlas now uses normal asynchronous rAF scheduling and two Draco workers / concurrent GLTF dependencies. Tablets retain one in-flight frame and sequential dependencies. Texture resizing still applies to Atlas on every device, independent of dependency concurrency. Device classification stays session-stable and unchanged.

**Atlas batched GPU preparation is deliberately retained on both devices.** A full-world `compileAsync` experiment first failed with a real depth-attachment validation error. A temporary correction of that context produced faster startup but changed the shadow image (mean RGB differences about 19.8/19.7/16.3 levels in the reference region). That experiment is not delivered. The current batched uploads, 16-object world/shadow batches, three small views and final fenced frame preserve the existing image. There is no new renderer architecture or quality adjustment.

## Matched local measurements

Real Chromium/WebGPU on the same Windows machine and NVIDIA Blackwell adapter (exact model withheld by the browser), one GPU test at a time, 1180×734 CSS viewport, DPR 1, LVL-0001, initial Atlas route X=175; camera `[0,1.58,0]`, yaw −0.08, pitch 0.015. Each capture contains 15 seconds stationary and 10 seconds walking. Rates below use the stationary samples after discarding the first 20 frames, rather than a single HUD reading. The presets intentionally have different internal resolutions; viewport and route are identical.

| Metric | Real reference | Atlas before | Atlas final |
|---|---:|---:|---:|
| Preparation | 55.57 s | 78.42 s | 54.05 s |
| Mean FPS | 32.12 | 19.90 | 57.34 |
| CPU frame time | 30.22 ms | 28.26 ms | 9.45 ms |
| rAF interval | 31.14 ms | 50.24 ms | 17.44 ms |
| Explicit visible GPU-completion wait | none | 13.17 ms/frame | none |
| Render buffer | 1180×734 | 885×551 | 885×551 |
| Non-shadow draws/frame | 1,316 | 1,314 | 1,314 |
| Visible submitted mesh triangles | 45,452,992 | 2,278,822 | 2,278,822 |
| Unique visible mesh objects | 1,294 | 1,307 | 1,307 |
| Unique visible materials | 36 | 16 | 16 |
| GPU submissions/frame, stationary | 18 | 2 | 2 |
| Scene matrix update | 0.59 ms | 0.26 ms | 0.19 ms |
| Traversal including culling | 0.57 ms | 0.47 ms | 0.29 ms |

A second unchanged Real capture measured 42.34 seconds load / 38.55 FPS / 25.21 ms CPU. A scheduler-only ablation retained original Atlas preparation but removed only the desktop visible-frame fence: 57.17 FPS, 9.65 ms CPU, with identical reference pixels. This preserves geometry and quality, but separate-run cache/warm-state differences still affect the absolute speedup. The final concurrency change reduced GLB dependency preparation from 8.66 s in that ablation to 0.425 s.

A final **same-scene, same-device A/B/A** removes that confound for the scheduler itself:

| Existing visible-frame fence | FPS | CPU | Completion wait |
|---|---:|---:|---:|
| On | 45.35 | 9.61 ms | 6.89 ms |
| Off | 57.10 | 9.47 ms | none |
| On again | 45.02 | 9.93 ms | 7.06 ms |

Every phase submitted the same 1,314 draws and 2,278,822 visible triangles. The controlled scheduling benefit is approximately **26%** on this warmed desktop scene. The larger initial 19.9→57.3 FPS change includes other run-state effects and must not be sold as a pure threefold scheduler improvement. In the original matched baseline CPU costs were similar for Real and Atlas, while only Atlas added the completion wait and another frame-registration boundary; this explains why the much lighter world could still be slower.

These are local samples, not universal performance promises. Run-state differences consistent with compiler/driver caches and CPU warm-up affect load times: the scheduler-only ablation loaded in 62.12 s despite unchanged preparation. The exact subsystem responsible for all cross-run CPU variation was not isolated. Thus the entire observed 78→54 second improvement must **not** be attributed to source changes. Likewise the CPU improvement is an observed execution-path result, not a claim that a 13 ms promise wait alone accounts for every millisecond.

Queue wait is wall time to completion notification, including scheduling; it is **not** timestamp-query GPU execution duration. Desktop no longer waits explicitly, but can still experience driver backpressure. The normal desktop renderer has no application-imposed frame-in-flight limit; the browser's exact in-flight count is not exposed by these measurements. Tablet retains the enforced limit of one. Separate culling time and pure hardware GPU time are unavailable; no extra GPU fences or readback targets were introduced for profiling.

The reference image comparison covers 770×260 world pixels at `(230,310)`, excluding UI and animated NPC portraits. Before versus final: **zero differing RGB values**. The scheduler-only ablation is also pixel-identical. This verifies the tested view, not every possible camera angle.

## Instancing, materials and shadows

| Resident scene inventory | Real | Atlas |
|---|---:|---:|
| Mesh objects after partitioning | 1,831 | 1,609 |
| InstancedMesh groups | 1,822 | 1,601 |
| Instances | 18,059 | 17,115 |
| Unique geometries / geometry-material pairs | 448 / 448 | 433 / 433 |
| Active scene materials | 37 | 16 |
| Material-referenced textures (excludes environment/targets) | 78 | 20 |
| Explicit node materials | 9 | 1 |
| Double-sided materials | 35 | 15 |
| Alpha-tested materials | 14 | 2 |
| Transparent materials | 2 | 1 |
| Mesh objects marked as shadow casters | 1,823 | 1,007 |
| Active lights | 9 | 9 |
| Shader-module creations through preparation + stationary capture | 3,339 | 2,635 |
| Render-pipeline creations | 3,302 | 2,619 |

Both worlds use the same 12-unit X/Z partitioning key: geometry, material and spatial cell. Spatial groups per geometry-material pair are approximately 4.07 Real versus 3.70 Atlas. Simplification did **not** increase total geometry fragmentation, material count or instance groups. Nevertheless, it barely changes the draw workload in the starting view: about 1,300 draws remain. The 95% triangle reduction cannot eliminate per-draw CPU binding/pipeline work. Render-object pipeline transitions in that view remain approximately 1,310 Real / 1,314 Atlas; native creation counters, rather than material counts, show the much larger per-object pipeline population. These numbers are pipeline objects, not a count of unique WGSL source programs or shader complexity.

There is one shadow-casting directional sun. The other lights are a hemisphere, a non-shadow directional fill, four landmark point lights and two fire point lights. Shadow maps are cached while stationary/turning. Movement recenters after squared distance exceeds 0.16 (about 0.4 world units). During the 10-second walking captures: Real 62 shadow refreshes, Atlas final 63; **not every frame**. Shadow draws per refresh were approximately 811–1,085 Real and 469–604 Atlas along the traveled section. Atlas final CPU on shadow-refresh frames averaged 22.35 ms versus 9.45 ms stationary. These are total frame CPU values, not isolated GPU shadow-pass times.

Real runs world/shadows, GTAO, quarter-resolution volume, volume blur, bloom and final presentation (18 queue submissions in the stationary sample). Atlas runs world/shadows and final presentation, without GTAO, volume or bloom (2 submissions). Both share the same camera/route updates, lighting setup, instancing algorithm and material conversion function. Moss replacements are cached per original material, not cloned per object: eight explicit replacements in Real, none in Atlas; source materials retained for disposal are not counted as active scene materials. Atlas faceted materials bypass the named scanned-rock/bark moss replacement paths; its one explicit node material is the flame material. Ordinary standard materials are still internally converted to Three node shader state, so the explicit node count is not the number of shaders.

## Preparation accounting

Inclusive wall times; rows nested inside GLB or GPU work must not be added twice.

| Operation | Real reference | Atlas before | Atlas final |
|---|---:|---:|---:|
| GLB fetch + dependencies / decode | 2.043 s | 8.562 s | 0.425 s |
| Sequential texture decode/resize, inside GLB | not sequential | 1.178 s / 18 | concurrent, inside GLB |
| Sequential mesh dependency preparation, inside GLB | not sequential | 7.100 s / 425 | concurrent, 2 workers |
| Spatial instance partitioning | 0.039 s | 0.027 s | 0.020 s |
| Explicit texture GPU uploads | inside compile/render | 0.392 s / 21 | 0.397 s / 21 |
| World + shadow pipeline preparation | 51.056 s async | 68.705 s / 101 batches | 52.608 s / 101 batches |
| Hidden view chain | 1.800 s / 18 | 0.246 s / 3 | 0.184 s / 3 |
| Final playable frame + fence | 0.112 s | 0.090 s | 0.065 s |
| HDR load/setup | 0.122 s | 0.157 s | 0.124 s |
| Lights/material-node/effect setup | 0.025 s | 0.022 s | 0.013 s |
| GPU fence wall time, included above | 0.641 s / 19 | 31.116 s / 126 | 22.712 s / 126 |

Mesh dependency preparation includes yielding, parser work and Draco; it is not pure decoder CPU time. The old compact loader yielded to rAF before each of 425 mesh dependencies: at 60 Hz those yields alone are on the order of seven seconds, consistent with the measured 7.10 seconds. Removing that desktop-only serialization matters more than merely describing the file as smaller. Standard material assignment is within the small uninstrumented synchronous setup between partition and HDR; named node-material work is in the lights/material/effect operation. GPU upload, shadow pipeline compilation and actual batch rendering overlap within the same batch operation. These are not separately timed hardware passes. The initial browser ResourceTiming buffer filled with earlier app assets, so those captures do not provide a defensible fetch-only number. The final confirmation increased the buffer: local GLB fetch took 126.9 ms Real versus 40.5 ms Atlas; HDR fetch was 10.2 versus 8.6 ms. GLB fetch+dependencies in that confirmation took 1.255 s versus 0.428 s. This confirms that network transfer is not the source of the tens-of-seconds difference on this local asset server; it does not measure production network latency.

## Remaining physical iPad ~17 FPS: ranked hypotheses

1. **Per-draw CPU/pipeline/binding overhead**: about 1,314 visible draws survive the simplification, with over 2,600 prepared pipeline objects. This is strong local evidence for substantial fixed draw cost, but the physical Safari CPU share is not measured here.
2. **GPU completion plus display scheduling under the required single-frame policy**: at 17 FPS the total interval is about 59 ms. CPU submission, actual GPU execution, completion notification and the next display callback all contribute. Local compact capture showed a 13 ms completion wait plus rAF quantization. This is not a measurement of the M3 GPU itself. Do not remove the tablet fence based on desktop results.
3. **Movement shadow refresh spikes**: hundreds of extra caster draws approximately 6 times/second increase CPU and GPU cost. Stationary snapshots alone miss this load.
4. **Double-sided vegetation overdraw / many pipeline and uniform updates**: lower triangle count does not remove fragment overlap or per-instance data/binding work. Expensive GTAO/volume/bloom are already absent. Source texture size and GLB bytes are mainly preparation concerns here, not demonstrated steady-state bottlenecks.
5. **Traversal/update overhead** is a lower-ranked candidate locally (well below 1 ms stationary). Safari may differ; no evidence justifies rewriting it now.

Recommended next optimization: first capture `?debug3d=1&profile3d=1` on the physical tablet to obtain actual CPU frame, fence, draw and shadow-refresh samples. Then evaluate coarser spatial grouping of the largest repeated opaque-vegetation/stone instance groups and their per-object pipeline bindings, preserving every instance transform and material. Atlas expands 433 geometry/material pairs into 1,601 spatial groups while the starting view still submits 2.279 million of the GLB’s 2.615 million instance-weighted triangles. That makes excessive cell fragmentation a concrete next candidate: fewer groups could remove many draw calls with a comparatively modest culling tradeoff. Measure it rather than globally merging everything. Reducing draw overhead can help both CPU submission and single-frame completion without lowering quality. No materials/geometries are merged in this task. Keep tablet fencing and the stable preparation baseline until a separate physical test proves any change safe. Stable 30 FPS has not been achieved or measured on iPad by this task.

## Diagnostics and reproducibility

`debug3d=1&profile3d=1` enables opt-in bounded samples in `threeRenderer.snapshot().performanceProfile`. It records backend draws, shadow draws, visible mesh triangle counts, material/object sets, actual pipeline transitions, queue submissions, existing waitForGPU durations and traversal/matrix CPU time. `operationTimings` records real initialization boundaries. No profile hooks are installed in production. Diagnostic snapshot samples are capped at 2,400 frames; hooks restore on disposal. Existing device-loss, RangeError and recovery evidence remains. Use the performance capture separately from `debug3dgpu=1`; that existing detailed shader tracer takes precedence when both are specified, preventing overlapping hook restoration.

Run the matched benchmark sequentially:

```powershell
$env:ATLAS_WEBGPU_QA='1'
$env:ATLAS_PERFORMANCE_QA='1'
npx.cmd playwright test tests/three-performance.spec.js --project=desktop-chromium --workers=1 --output=test-results/performance-capture
```

`ATLAS_PC_ABLATION=scheduler-only` is a test-only desktop experiment reproducing compact preparation and removing the visible fence after readiness. It never alters the product registry on disk or the physical tablet preset. Raw captures are in `test-results/performance-before`, `performance-after`, `performance-scheduler-only` and `performance-final`. The rejected full-compilation experiment is in `performance-after-fixed`. Extracted measurements accompany this document in `3d-performance-measurements.json`.

## Validation status

- **34 distinct Chromium scenarios passed across resumed sequential GPU runs**: `performance-final-regression` contains 11 completed passing cases; `performance-remaining-gpu` completed all remaining 23 in 22.9 minutes. This includes both mandatory tablet acceptances (1180×734 and 1180×689, DPR 2, two entries each), separate 1770×1101 preparation, all hidden views and the final playable frame, sustained input/rendering, Desktop High, injected failures/stalls/device loss, mode switching, full challenge progression and recovery. No test watchdog was extended and no actual GPU work was skipped to obtain these passes.
- The new actual desktop/tablet world-pixel comparison and desktop Atlas device-loss→Illustrated→Cinematic test passed. A first version of that test timed out because it toggled an already-open Graphics panel closed; the fixture now checks menu visibility before toggling. This was a test-navigation error, not an engine correction. Two older tablet fixtures were also updated to select supported Atlas rather than the now-disabled Real world; their assertions remain.
- **72 WebKit checks passed**, covering navigation, forms, native touch IDs, persistence, startup failure diagnostics, lifecycle and cleanup (`performance-webkit`). These use mocked GPU boundaries where appropriate and are not physical Safari GPU execution.
- **8 desktop menu/persistence checks passed** (`performance-desktop-menu`). **21 configuration/diagnostic guard checks and 3 texture-budget checks passed**, including unchanged world hashes and canonical quality. The diagnostic unit was rerun after its tracer-precedence guard and passed.
- Matched real-GPU benchmark captures and the before/final pixel comparison passed. The final confirmation and same-device A/B/A passed on the validated tree (`performance-confirmation`, `performance-aba`). The confirmation measured both worlds: Real 34.75 s / 56.98 FPS / 12.17 ms CPU; Atlas 54.80 s / 57.22 FPS / 9.55 ms CPU. This sizeable improvement in unchanged Real reinforces the cache/warm-up caveat. Native GPU pipeline transitions confirmed 1,310 Real / 1,314 Atlas. Evidence: `performance-confirmation`.
- JavaScript syntax and `git diff --check` pass. No commit or deployment was performed.

The GPU suites ran one worker at a time against the existing local asset server with `ATLAS_WEBGPU_QA=1`. The completed local checks are not physical Safari acceptance or a claim of 30 FPS on iPad.

## Changed files

- `src/graphics-modes.js`: device-based execution policy, independently fixed presentation settings and shared Atlas batched warm-up.
- `src/three-renderer.js`: apply those policies, keep Atlas image resizing independent of concurrency, optional preparation/frame instrumentation and disposal.
- `src/three-presets.js`: expose actual execution policy in diagnostics.
- `src/three-runtime-diagnostics.js`: opt-in performance capture, with existing shader diagnostics taking precedence.
- `service-worker.js`: next-deployment cache key only.
- `tests/graphics-modes.spec.js`, `tests/graphics-world-switch.spec.js`: execution/quality separation, zero desktop frame fences, actual image comparison and recovery.
- `tests/three-renderer.spec.js`: tablet test fixtures select the supported Atlas world rather than disabled Real 3D; original assertions remain.
- `tests/three-performance.spec.js`, `tests/three-performance-diagnostics.spec.js`: reproducible matched benchmark and diagnostic correctness.
- This report, `Docs/3d-performance-measurements.json`, `Docs/renderer-current-spec.md` and `Docs/3d-world-modes.md`: measurements and current specification.

No GLB, texture, material asset, Blender source, route, world layout or foliage content was changed.
