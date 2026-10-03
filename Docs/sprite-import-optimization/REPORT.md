# Full-scene Illustrated sprite import optimization

The verified position-dependent raster/upload waste is removed. **This does not establish or fix the separate reported 20–35 FPS collapse. Reproduction on the affected configuration is still required.**

## Change

Only `illustratedSprite()` in `src/cinematic-renderer.js` changed in production. Its filtered Canvas now uses sprite-local coordinates. Fractional screen X/Y remains in the draw rectangle, so movement updates geometry/uniforms without changing the image revision. No movement coordinates are rounded or quantized.

The image revision still includes decoded source, local dimensions, image/owner filters, DPR and mirroring. A source-frame or visual change updates the current filtered texture. Existing texture reuse handles unchanged dimensions; existing release/generation ownership handles device recreation and navigation. This remains one current filtered texture per character, not an animation-frame cache or new resource system.

Measured translated DOMRect width noise was 0.0000305176 pixel (1/32768), despite identical layout. The current raster extent is retained when the reported size differs by less than 1/1024 **device pixel**. This rejects arithmetic noise without changing position, movement smoothness, animation cadence or the displayed size materially. Genuine scale/size and filter changes still invalidate the image and are covered by tests.

The same local correction applies to the existing NPC import helper. Cinematic does not call it. No shader, graphics default, authored content/effect, grounding calculation, particle setting, legacy producer or Scene Depth optimization changed.

## Structural regression

`tests/illustrated-sprite-import.spec.js` measures native Canvas/GPU work while the production controller displays real animation images. Five fractional translations per pose must produce exactly:

- 0 detached sprite Canvas draw calls (therefore 0 rasterizations)
- 0 sprite image uploads
- 0 texture allocations or destructions
- unchanged fractional displacement, checked against the requested geometry

The preserved old renderer fails this test with **10 Canvas draws, 5 uploads, 3 allocations and 3 destructions** on the first five translations (`regression-before.log`). The optimized renderer passes at DPR 1 and 2, including the visible LVL-0001 NPC. Source, filter and actual size changes must still cause uploads; these assertions also pass.

Coverage includes frozen idle/blink/walk/turn/arrival poses, both walking directions, genuine timed blink completion, timed walking reversals and two repeated walk-to-idle cycles, level transition, menu return/re-entry and zero live textures after teardown. Existing compositor tests additionally cover OFF → ON → OFF, resource recreation and stable resource counts across repeated recipes.

## Paired production measurements

Same production LVL-0004, authored effects, 1180×734 viewport, DPR 1/2, full-scene Grading + Area Lights + nonzero authored Scene Depth, same `beginFreeWalk` destination 1400 world units right of the authored start. Five-second samples begin after 700 ms of walking. The unchanged diagnostic profiler was extended only to accept a preserved renderer source, allowing old/current runs back-to-back. Native WebGPU uses the NVIDIA adapter.

Primary evidence: `paired-before/` and `paired-after/`, including every measured frame, source dimensions, counters, environment and source hashes. Initial `before/` and `after/` runs are retained too; their host RAF pacing shifted from ~60 to ~57 Hz, so the paired runs provide the cleaner timing comparison.

| Walking measurement | DPR 1 before → after | DPR 2 before → after |
| --- | ---: | ---: |
| Measured frames | 284 → 286 | 285 → 285 |
| Sprite rasterizations / uploads | 279 → 121 | 281 → 121 |
| Sprite rasterizations per second | 56.07 → 24.19 | 56.33 → 24.26 |
| Filtered-texture replacements | 95 → **0** | 116 → **0** |
| Total texture allocations, including newly encountered source images | 100 → 5 | 121 → 4 |
| Logical filtered-image data, MiB per sample | 123.42 → 53.28 | 489.33 → 210.62 |
| Logical filtered-image MiB/s | 24.80 → 10.65 | **98.09 → 42.23** |
| FPS | 57.08 → 57.17 | 57.13 → 57.14 |
| Median interval, ms | 17.5 → 17.5 | 17.5 → 17.5 |
| p95 interval, ms | 18.1 → 18.1 | 18.1 → 18.1 |
| p99 interval, ms | 18.6 → 18.5 | 18.5 → 18.4 |
| Mean renderer CPU/encoding, ms | 0.790 → 0.712 | 0.810 → 0.684 |

Logical sprite update volume fell approximately **57%**. The remaining walking updates correspond to animation source changes at the existing ~24-FPS cadence. Every recorded post-fix raster invalidation in these walking samples was a source change; none was a screen-phase or size change. The few remaining allocations are initial source-image imports, not filtered-texture replacements. MiB means width×height×4/2²⁰, not measured physical bus traffic. API CPU time and RAF cadence are not GPU completion or physical presentation measurements.

Stationary measurements with the **natural randomized blink schedule**:

| Stationary measurement | DPR 1 before → after | DPR 2 before → after |
| --- | ---: | ---: |
| Rasterizations / uploads over five seconds | 28 → 42 | 28 → 42 |
| Filtered-texture replacements | 0 → 0 | 0 → 0 |
| FPS | 57.04 → 57.05 | 57.20 → 56.98 |
| Median / p95, ms | 17.5 / 18.2 → 17.5 / 18.1 | 17.5 / 18.1 → 17.5 / 18.1 |

These stationary samples contain different numbers of blink cycles; all their raster invalidations are actual source changes. They are not evidence of increased position work. The deterministic unchanged-idle regression separately proves **zero** raster/upload/allocation work. Blink images are deliberately still updated.

Full-scene passes remain **5** in every paired frame. Stationary draws remain **8**; walking draws average about **9.41** both before and after as an additional sprite enters the same route. Both active legacy Canvases upload once per frame in these paired samples (**2 total**), unchanged by this fix. The fixed Stage 1 fixture still verifies **5 passes / 8 draws / 2 animated Canvas uploads / 0 unchanged frozen-producer uploads / 2 HDR targets**.

There is no demonstrated FPS improvement in this configuration: both versions were already near its observed RAF cadence. The structural reduction is the result, not a claim about the original collapse.

## Visual correctness

`visual.cjs` serves the preserved old renderer and the new renderer in separate identical contexts. Production animation frames and effect time are frozen; identical fractional translations are used. PNG pairs and JSON retain 22 Sven/grounding-shadow comparisons across idle, blink, walking left/right, turns and arrival, plus two visible NPC comparisons.

- Sven/shadow regional RGB mean differences: **0.171–0.370 / 255** across DPR 1/2.
- NPC regional differences: **0.834 / 255** at DPR 1; **0.387 / 255** at DPR 2. The diagnostic places the existing NPC fully inside the viewport identically in both versions; it does not persist an authored position change. An initial edge-only crop was rejected during visual inspection and replaced with this full-character comparison.
- Existing Stage 2 whole-scene mean <1 and actor-region mean <4 assertions pass unchanged. Whole-scene results are about 0.430/0.440 for LVL-0004 and 0.326/0.341 for LVL-0001 at DPR 1/2, slightly below the previous results.
- Representative before/after captures were visually inspected. Sprite size, source frame, placement and grounding/shadow relationship remain consistent.

The captures are not bit-identical: rasterizing in local coordinates then sampling at a fractional position shifts low-level edge interpolation compared with baking screen phase into Canvas pixels. Differences are concentrated at those edges (Sven comparison maximum 72 in a sparse channel), with no authored tuning, reduced raster scale, changed animation rate or weakened filters. The correction remains within the existing Illustrated parity tolerances; no assertion was relaxed.

## Validation and scope

- **14 Chromium tests passed** (`validation.log`): new sprite import regressions, existing compositor regressions, Cinematic sharpness/route overlays, and both required real-WebGPU tablet acceptance cases, sequentially. This includes the existing 1770×1101 preparation coverage.
- **8 WebKit/iPad fallback tests passed, 5 expected native-WebGPU tests skipped** (`webkit.log`). The final explicit on-screen NPC placement was also checked by rerunning both native sprite tests (`final-sprite.log`).
- Syntax checks for the changed renderer, new regression and profiling/capture scripts passed. `git diff --check` passed.

Files changed by this task:

- `src/cinematic-renderer.js`: local-coordinate sprite raster/cache correction only.
- `Docs/renderer-current-spec.md`: owning sprite-image/position contract.
- `tests/illustrated-sprite-import.spec.js`: permanent structural, animation, NPC and lifecycle regression.
- `Docs/movement-performance/profile.cjs`: optional preserved-source profiling input and accurate source hashing.
- `Docs/sprite-import-optimization/`: preserved pre-change source, captures, raw profiles, diagnostics and this report.

Earlier working-tree changes remain intact. No changes were made to Cinematic shader/render behavior, gameplay/progression, asset/audio recovery, service workers, authored levels, graphics defaults or Scene Depth behavior.

**The real-machine performance issue still requires reproduction on the affected desktop configuration. Physical iPad/Safari GPU behavior is also unverified; Chromium tablet acceptance and WebKit fallback checks do not establish it.**
