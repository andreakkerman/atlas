> Archived historical reference; not current instructions. Preserve the baseline and findings below as a record.
> Current contract: [canonical successor](../../renderer-current-spec.md).

# Atlas 3D golden-hour polish

## Retained art direction

The existing sky dome now has a richer apricot/orange lower band and a broader honey-gold transition, fading into a restrained blue zenith. The same distant ridge silhouettes receive warmer colors. The gradient remains altitude-based; the existing integer azimuth harmonics and geometry are unchanged, with no panorama seam or texture upload introduced.

The existing sun disc has a brighter ivory-gold core. Its analytic halo grows from 5 to 7.5 degrees and receives a warmer tint; this is arithmetic already present in the sky material, not bloom. Disc diameter and sun direction remain unchanged.

The directional light changes from `#ffe0b0` / 5.1 to `#ffd29c` / 5.6. Hemisphere ground bounce becomes warm neutral (`#756e64`), with a slightly less blue sky fill (`#c1cbd2`). The separate cool bounce light remains unchanged, preserving separation in shaded rocks and foliage. Exposure stays 1.02. Existing linear distance-fog tint changes to `#c8b59d`; its 22–155 distance range remains unchanged. No volumetric fog is added.

These values apply only through the existing Atlas-specific branches. World geometry, cameras, sun direction, shadow settings, other visual modes, menus, gameplay and challenge logic are untouched by this pass. Earlier grass-coverage and static-transform work is preserved.

The world GLB retains SHA-256 `c6d9a6ca1d40e7a0d7e75ada75cc29ef781e8f067a5f189fff6d99ef87e55536` from before this polish. A 200×230 unobstructed sky crop across yaw `π−0.001` / `−π+0.001` differs by at most one 8-bit value per channel, consistent with a continuous gradient under the small camera change.

## Comparison and cost

Inspected the current renderer before editing. Captured the baseline, retained palette and optional cloud trial sequentially with the existing composition benchmark. Each run includes stationary, walking, turning and walking/looking phases plus fixed views of the trail, bank, rune, hill, temple, sun, opposite sky, zenith and both sides of the azimuth wrap.

| Metric | Before | Retained |
| --- | ---: | ---: |
| Stationary draw calls | 405 | 405 |
| Stationary triangles | 1,596,482 | 1,596,482 |
| Stationary CPU frame submission | 5.93 ms | 5.43 ms |
| Stationary queue-fence wall time | 4.759 ms | 4.760 ms |
| Walking queue-fence wall time | 5.623 ms | 5.571 ms |
| Stationary FPS | 60.00 | 60.00 |
| Walking FPS | 56.93 | 57.23 |
| Preparation duration | 24.02 s | 23.35 s |
| Created shader modules / pipelines | 891 / 872 | 891 / 872 |
| Preparation fences | 59 | 59 |
| Geometries / materials / textures / lights | 222 / 30 / 24 / 9 | 222 / 30 / 24 / 9 |
| Reported resized image bytes | 77,225,984 | 77,225,984 |

This is desktop Chromium using the tablet preset at 1180×734, with an 885×551 drawing buffer. The composition harness identifies the device as an iPad but uses a DPR-1 browser context; the separate acceptance suite covers actual DPR-2 configuration. Queue-fence wall time includes scheduling and is not a hardware GPU timestamp. One run per variant is sufficient to check gross cost/resource parity, but timing differences are not evidence of a speedup. No physical-iPad FPS or Safari stability claim follows from these numbers.

The retained sky modifies numerical constants only: no added shader operations, render passes, objects, textures, render targets or lights. Texture upload, preparation, disposal, device lifetime and re-entry code remain unchanged. Resource counts and observed local cost match the baseline. This preserves the existing iPad resource envelope structurally; physical Safari acceptance remains an unresolved device-validation gap.

## Rejected alternatives

Two faint static analytic cloud wisps were tried only in an output-directory variant. They used the existing dome without textures, animation or extra passes, but looked like weak pale bands and contributed little to the scene. Their extra dot products, lengths and smoothsteps were not justified by the image improvement. No clouds are retained. The cloud trial's stationary fence time was 4.861 ms; this single noisy measurement does not establish a regression.

Bloom, volumetric fog, full-screen color grading, cloud textures, additional preparation and retained GPU caches were excluded. Richer color comes from the existing sky and light parameters, rather than an exposure or global saturation increase.

## Evidence

- [Full measurements](atlas-golden-hour-measurements.json)
- [Sun before](images/atlas-golden-hour/before-sun.png) / [after](images/atlas-golden-hour/after-sun.png)
- [Forest before](images/atlas-golden-hour/before-hill.png) / [after](images/atlas-golden-hour/after-hill.png)
- Local raw captures: `output/golden-hour/{baseline,honey,clouds}-profile/`.

## Release checks

All GPU suites ran sequentially against the existing asset server at `http://127.0.0.1:4173`, with `ATLAS_WEBGPU_QA=1`. No tests, timeouts, presets or error handling were weakened.

- 30 passed: `three-tablet-acceptance`, `three-preparation`, `three-presets`, `atlas-world-policy`, `atlas-grass-budget`, `atlas-static-transforms`. This includes both real-WebGPU tablet sizes at DPR 2, the 512×299 warm-up aspect, and separate 1770×1101 preparation coverage.
- 2 passed: `three-gpu-pressure`, successful Desktop High and tablet cycles (`failure none`).
- 4 passed: selected `three-cleanup` / `three-page-lifecycle` checks covering disposer exceptions, preparation cancellation, page hiding and real navigation/re-entry. Injected exceptions validate cleanup only, not a physical-device root cause.
- 2 passed: WebKit landscape/portrait Atlas navigation remains outside 3D handlers.
- 1 passed: `atlas-premium-visual` full-direction scene and sky audit, with `ATLAS_PERFORMANCE_QA=1`.
- 3 profiling/comparison runs passed (baseline, retained palette, rejected clouds), with no recorded JavaScript or GPU errors.
- JavaScript syntax checks and `git diff --check` passed.

Total: 39 release checks plus 3 comparison runs. Raw release evidence is in `output/golden-hour/release-*`. Physical iPad Safari/WebGPU performance, thermal behavior and repeated long-session stability have not been measured here.
