# v158 conservative physical-tablet baseline

This is a renderer/resource baseline for physical Safari testing, not the final
visual target and not a proven fix for the earlier physical RangeError or device
loss. Desktop High and Real 3D world content remain unchanged. No dynamic quality
switching or model-specific iPad rules were added.

| Tablet setting | v157 | v158 |
| --- | --- | --- |
| World / effects / presentation MSAA | 1 / 1 / 1 | 1 / 1 / 1 |
| DPR cap | 1.0 | 0.75 |
| Sun shadow | 2048² | 1024² |
| GTAO | Off | Off |
| Volume | Quarter resolution, 40 steps | Off; no volume/blur resources |
| Bloom | On | Off; no bloom resources |
| Anisotropy | 4 | 2 |
| Raster texture long edge | Original | 1024 maximum, no upscaling |
| HDR input | 2048×1024 | 512×256 after linear half-float box filtering |
| Environment PMREM atlas | 1536×2048 | 384×512 |

The 1180×734/DPR 2 case now renders at 885×551 after rounding. Full-resolution
render targets contain approximately 43.75% fewer pixels than v157; shadow pixels
drop by 75%. Volume/blur/bloom targets are absent. HDR and PMREM atlas pixel counts
drop by 93.75%. Warm-up still renders three actual route views at a maximum
512-pixel long edge, including the 512×299 case, and completes GPU fences before
revealing the final playable frame. No GPU work is skipped to manufacture readiness.

## Texture and lifetime evidence

The real LVL-0001 loader reports 70 unique decoded image Sources, of which 58 are
resized. Their RGBA8 base-level estimate falls from **978,586,968 bytes** to
**283,795,456 bytes** (933.3 MiB to 270.6 MiB, about **71.0% less**). With the usual
4/3 mip-chain estimate this is approximately 1,244.3 MiB to 360.9 MiB. This is an
image-pixel estimate, not a measurement of Safari GPU memory: variants, compression,
driver allocation, source blobs, geometry and framebuffer resources differ.

Each GLTF image is resized through its shared Three Source before the next
sequential dependency is decoded. Existing texture metadata, color-space
interpretation, alpha, normal/PBR channel packing, samplers and UV transforms are
preserved. Original ImageBitmaps close after a successful replacement; cloned
material variants share that replacement. No source files are rewritten.
Resized static pixels close after all variants upload and their GPU fences finish.
The NPC canvas is also capped, but retains its live pixels for animation.

The 2K HDR still briefly decodes on CPU (approximately 16 MiB of half-float RGBA),
then its data is replaced by a 1 MiB 512×256 image before environment setup and
GPU upload. Sky/reflection textures share this smaller CPU Source. After final
GPU completion its CPU data is released too. The existing environment illumination
and sky remain active. Smaller PMREM output and scratch targets reduce coexistence;
the renderer's existing ownership and disposal paths are retained.

## Validation

- Focused presets, raster/alpha/shared-source and linear HDR tests: 63 passed
  across Chromium and both WebKit orientations.
- WebKit navigation/input/diagnostics/cleanup regression: 56 passed (3.4 minutes).
- Initial real-WebGPU tablet acceptance: 2 passed (6.2 minutes), each with two
  complete 3D entries, native movement/look, sustained frames and Cinematic recovery.
- Broad sequential GPU regression: 16 passed, one obsolete diagnostic assertion
  failed (25.4 minutes). This covered both presets' healthy/stall/validation/lost
  paths, device cleanup/Cinematic recovery, Desktop High route/progression and
  other graphics modes, and both enhanced tablet acceptance cases.
- Final acceptance rerun: both tablet cases and debug-journal coverage passed;
  the separate direct-buffer test reached readiness but exposed a second obsolete
  resize expectation (800×1000 instead of 600×750 under DPR 0.75). The corrected
  direct 1770×1101/resize test then passed independently (1.1 minutes). No production
  errors were swallowed and no workload/timeouts were weakened.
- Thus all **17 distinct GPU scenarios** have passed. Final tablet evidence contains
  zero captured errors and eight GPU-completed preparation views per case (two
  entries). Native allocations confirm 1024 maximum raster edges, 1024 shadows,
  512×256 HDR, 384×512 PMREM, and no GTAO/volume/bloom shaders.
- Final budget/preset rerun: 63 passed (5.2 seconds). JavaScript syntax, UTF-8 and
  `git diff --check` passed. Evidence is under `test-results/v158-gpu-regression`,
  `v158-final-acceptance`, `v158-direct-final`, `v158-budget-final` and `v158-webkit`.

These local checks include the requested complete preparation, first playable
frame, real movement/look, twenty seconds of sustained rendering per entry and
same-session graphics recovery/re-entry. They do not prove physical Safari
stability. No commit or deployment was performed.

## Physical acceptance

After an authorized deployment, open
[the v158 tablet acceptance URL](https://svenakkerman.nl/?debug3d=1&rendererPreset=tablet-optimized).
Until deployment this URL still serves the existing production build.

Confirm the v158 values above in diagnostics. Run Illustrated → Cinematic → 3D,
wait for all five stages, move/look/interact for at least two minutes, then switch
to Illustrated → Cinematic → 3D again in the same session. Retain original
operation/stack/device-loss evidence if a failure occurs. Local Chromium execution
does not establish physical Safari stability or recovery of Safari's shared GPU
process after a native failure.

Expected tablet differences: softer world image and textures, coarser shadows,
less sharp grazing-angle surfaces/reflections, no volumetric sun shafts and no
bloom halos. Scene fog, sunlight, environmental illumination, geometry, foliage,
route, objects and gameplay content remain present.
