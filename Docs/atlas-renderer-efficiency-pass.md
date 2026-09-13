# Atlas renderer efficiency pass — 2026-09-13

Kept one small, Atlas-only CPU optimization: calculate the imported landscape's
final transforms once after partitioning, then disable automatic local/world
matrix recomputation on that subtree. No scene assets, placements, materials,
quality settings, gameplay, menu or other visual-mode behavior changed.

This does **not** establish an improvement from the reported physical-iPad
25–30 FPS. Local Chromium already runs near 60 FPS. Physical Safari FPS,
thermal behavior and startup/re-entry stability remain unverified on hardware.

## Profile and decision

Profiled the original renderer before editing production code, using the existing
real-WebGPU composition benchmark and tablet identity at 1180×734 CSS. That
benchmark exposes DPR 2 to the renderer through a JavaScript override; its browser
context remains DPR 1. The actual drawing buffer is 885×551. The separate tablet
acceptance and transform-regression tests use a real context DPR of 2.
Ran GPU suites sequentially against the
repository asset server at port 4173. The benchmark includes stationary, walking,
turning and walking while looking, with the existing compact completion fence.

The initial view submits 405 draws and 1,596,482 triangles. The scene has 459
instanced landscape meshes, 6,436 instances, 222 geometries and 30 materials.
Walking recenters shadows about 3.22 times/s; each refresh averages about 230
additional shadow draws. In the detailed baseline, shadow-refresh frames cost
7.72 ms CPU versus 3.51 ms for regular walking frames. Draw submission and shadow
refreshes are larger local costs than matrix calculation. These observations do
not identify the physical iPad's limiting GPU operation.

The canonical Atlas preset already disables GTAO, volumetrics and bloom. Its
remaining FXAA pass, spatial instancing and reused static shadow map were preserved.

The safe removable work is 700 landscape-node transform recompositions per scene
update. The landscape never moves after partitioning. Three r180 propagates forced
world updates from the scene, so disabling only `matrixAutoUpdate` is insufficient;
both local and world auto-update flags are disabled after calculating the final
matrices. The scene remains traversable and cullable. The camera, moving sky dome,
lights, flames and NPC live outside this subtree and retain automatic updates.

## Measurements

Detailed baseline → candidate, mean milliseconds per frame:

| Phase | Matrix update | Total CPU submission | FPS |
| --- | ---: | ---: | ---: |
| Stationary | 0.0785 → 0.0240 | 3.136 → 2.985 | 60.00 → 60.00 |
| Walking | 0.0913 → 0.0254 | 3.737 → 3.611 | 59.69 → 59.84 |
| Turning | 0.0892 → 0.0248 | 1.711 → 1.585 | 59.84 → 59.99 |
| Walking + looking | 0.0830 → 0.0236 | 1.995 → 1.907 | 59.84 → 60.00 |

Matrix-update cost falls 69–72%, saving roughly 0.05–0.07 ms/frame locally.
Total CPU and small FPS differences include run-to-run variation and must not be
attributed entirely to this change. The first baseline's stationary CPU was
3.209 ms; its walking CPU was 3.253 ms, illustrating that variation.

A same-scene alternating check, three baseline/candidate pairs of 1,000 updates,
measured automatic updates at 0.0469 / 0.0461 / 0.0474 ms and frozen updates at
0.0121 / 0.0121 / 0.0129 ms. Each baseline phase performed 700,000 landscape local
matrix calculations; each candidate performed zero. All world-matrix elements
matched exactly, and no instance-buffer version changed. This isolates CPU work;
it is not an end-to-end FPS or hardware GPU-time benchmark.

GPU fence wall time did not consistently improve (stationary 4.41 → 4.37 ms,
walking 5.29 → 5.38 ms). Fence latency includes scheduling; it is not GPU timestamp
data. No GPU execution-time reduction is claimed.

## Visual and resource evidence

- Initial-view draw/triangle counts match exactly.
- Four route-view image crops, each 750×570 pixels outside the changing debug HUD
  and dialogue, have zero changed pixels: 1,710,000 compared pixels in total.
  This is sampled visual coverage, not an exhaustive comparison of animations.
- Preparation: 891 shader modules, 872 pipelines, 59 fences in both runs.
- Texture budget: 23 images, 14 resized, 77,225,984 resized bytes in both runs.
  This counter is not a measurement of total or peak GPU memory.
- Preparation time: 19.409 → 19.351 seconds, effectively unchanged in these runs.
- No new uploads, buffers, render targets, cached frames, resource ownership,
  warm-up views or GPU queue concurrency. The change stores only two existing
  boolean properties per landscape node. Cleanup follows the existing path.

## Alternatives excluded

These were rejected by inspection, not benchmarked as production candidates:

- Removing the compact queue-completion fence: could accumulate in-flight work
  and trade startup/re-entry stability for desktop throughput.
- Larger instance cells, merged geometry or render bundles: could increase
  offscreen triangles, transient upload pressure, preparation complexity or
  retained GPU state. Existing spatial instancing is preserved.
- Lower DPR, fewer shadows, farther shadow recentering, reduced texture quality,
  simplified materials/lighting or disabling FXAA: violates visual parity.
- Extra warm-up, hidden views, preloading or retained worlds: violates the stated
  lifetime and pressure constraints.
- Broad per-frame DOM/input/gameplay changes: outside Atlas visual-only scope.

## Validation

All 43 sequential Chromium release checks passed (12.4 minutes):

- Static-transform regression and same-scene alternating measurement.
- Real-WebGPU tablet acceptance at 1180×734 and 1180×689 / context DPR 2,
  each with two entries, actual GPU work, touch movement and looking, sustained
  rendering, texture/sample limits and recovery to Illustrated/Cinematic.
- Separate 1770×1101 compact preparation and full pipeline coverage.
- Preset detection/settings, Desktop High and tablet GPU pressure, queue stalls,
  validation errors, device loss, cancellation and conservative cleanup.
- Page lifecycle and real navigation destroying the ready device before re-entry.

Both WebKit navigation tests passed afterward, sequentially, for the landscape
and portrait projects (9.4 seconds). Three composition-profile runs also passed:
the initial baseline, detailed baseline and candidate. `git diff --check` passed.
No test timeout, preset or acceptance threshold was weakened.

Raw local measurements, including the initial baseline, are in
`Docs/atlas-renderer-efficiency-measurements.json`. Reproduce profiling with:

```powershell
$env:ATLAS_WEBGPU_QA='1'
$env:ATLAS_PERFORMANCE_QA='1'
$env:ATLAS_PROFILE_TABLET='1'
npx.cmd playwright test tests/atlas-composition-performance.spec.js --project=desktop-chromium --workers=1
```

The regression is `tests/atlas-static-transforms.spec.js`; it checks actual
landscape transforms, eliminated work, unchanged instance versions, dynamic
objects and continued rendering after walking. Physical-iPad validation should
compare matched views and movement on the same device, then exercise cold entry,
exit, re-entry and sustained play. No physical crash fix or stable higher iPad
FPS is claimed by this pass.
