# Atlas 3D final material polish

## Selection and visual result

Inspected the current renderer, exported materials, golden-hour lighting and ray-based sky, foliage, terrain contact shading, route and temple composition. Captured 34 fixed views in each full comparison, including both travel directions, all rune/temple details, sun, zenith and azimuth wrap. The existing warm sky, cool fill, matte paving and route framing already support the artistic direction. More scene density or another atmospheric effect would be a poor use of the iPad budget.

The highest-value mismatch was material response:

- `Leaves`, `Leaves_Pine` and `Bark_NormalTree` arrived with metalness 0.4. Atlas now treats these as nonmetallic. Their diffuse response better matches the ground cover, and shaded vegetation separates more clearly while keeping the existing textures, silhouette, emissive fill and lighting. No albedo saturation or exposure boost was added.
- A shared renderer adjustment multiplied rock/stone/carving roughness by 0.46. Atlas now retains the authored roughness instead. For example, carved stone and the dragon relief return from approximately 0.423 to 0.92. This reduces glossy highlight contrast and makes the dry temple, rune stone and rock surfaces fit the matte path. The other 3D mode retains its previous adjustment. Actual brazier iron remains metallic.

These are existing material-property changes, applied during the normal scene build. They add no material instances, shader nodes, textures, objects, render passes, lights or per-frame traversal. The scene asset, route and anchor transforms are untouched. The golden-hour sky, lighting, fog distances, controls, running speeds, interactions and challenges remain unchanged. The service-worker version advances to `v180-atlas-material-polish` with the same preload list.

## Performance evidence

The tablet preset remains DPR cap 0.75, 1× world/effect samples, 1024² shadows, 1024 texture cap and 512 environment cap. Bloom, GTAO and volumetric fog remain disabled. The profiling harness now uses a real DPR-2 browser context rather than only overriding the JavaScript DPR signal; both sides of this comparison use that same configuration.

| Resource/work count | Before | After |
| --- | ---: | ---: |
| Forest stationary draws | 405 | 405 |
| Forest stationary triangles | 1,596,482 | 1,596,482 |
| Geometries / materials / textures | 222 / 30 / 24 | 222 / 30 / 24 |
| Meshes / instances / lights | 467 / 6,436 / 9 | 467 / 6,436 / 9 |
| Shader modules / pipelines created | 891 / 872 | 891 / 872 |
| Preparation fences | 59 | 59 |
| Reported resized image bytes | 77,225,984 | 77,225,984 |

The first independent runs showed a large timing discrepancy: stationary FPS 60.00 → 40.05, CPU submission 4.98 → 9.46 ms, queue-fence wall time 4.63 → 7.11 ms; preparation 22.93 → 27.12 seconds. Those numbers were not accepted as a clean comparison or hidden. A same-scene alternating test then restored the old material values between candidate blocks, without creating new resources, and reproduced the slower behavior with the original materials too.

At each of two fixed poses, six three-second blocks alternated `before, after, after, before, after, before`, with a 0.5-second sampling exclusion after each uniform change. No new shaders or pipelines were created during this test. This is QA-only instrumentation; production gains no retained resources or preparation views.

| Mean of three matched blocks | Before | After |
| --- | ---: | ---: |
| Forest CPU submission | 8.728 ms | 8.812 ms |
| Forest queue-fence wall time | 7.225 ms | 7.270 ms |
| Temple CPU submission | 4.693 ms | 4.680 ms |
| Temple queue-fence wall time | 5.794 ms | 5.832 ms |
| Forest FPS | 44.97 | 43.53 |
| Temple FPS | 59.15 | 58.93 |

The CPU/fence differences are smaller than block-to-block variation (forest CPU spans 7.98–9.61 ms across both variants). This supports no material cost regression attributable to the retained changes; it is not proof of identical physical-iPad performance or a claim of improved FPS. Queue-fence measurements include scheduling and are not hardware GPU timestamps. See the complete independent and paired results in [measurements](atlas-final-polish-measurements.json).

## What was deliberately left alone

- No additional vegetation, cloud system, bloom, volumetrics, screen-space effects or higher render/texture resolution. These would spend the limited fill, geometry or memory budget.
- No new lighting/exposure treatment: the current sky and warm/cool separation already work, and boosting saturation would not fix inconsistent material response.
- No asset replacement or route/anchor edit. Altering tree silhouettes or replacing the billboard character would be a larger art/content pass, with memory and composition implications.
- No batching rewrite, extra caching, retained devices or expanded warm-up. The baseline is already heavily instanced and conservatively prepared.

## Remaining visual ceiling

The main ceiling is the source-art mixture: broad, visibly flat pine branch tiers and repeated low-poly silhouettes sit next to detailed scanned/carved stone; the NPC remains a camera-facing image. Large terrain patches also expose the stylized ground treatment. Material calibration improves cohesion but cannot add silhouette detail or parallax.

The safe tablet resolution/texture caps limit fine foliage and carved detail. The forest view still submits about 1.60 million triangles and 405 draws; a walking shadow refresh adds around 232 draws in the baseline. A meaningful next visual step would need carefully budgeted asset authoring, rather than another expensive renderer effect.

## Images and validation

- Forest: [before](images/atlas-final-polish/before-forest.png) / [after](images/atlas-final-polish/after-forest.png)
- Temple: [before](images/atlas-final-polish/before-temple.png) / [after](images/atlas-final-polish/after-temple.png)
- Rune: [before](images/atlas-final-polish/before-rune.png) / [after](images/atlas-final-polish/after-rune.png)
- Raw runs: `output/final-polish/{before,after,paired}`.

All 54 release checks passed, with GPU suites run sequentially against the existing local asset server:

- 38 core checks: both real-WebGPU tablet sizes/DPR 2, reported 512×299 warm-up aspect, separate 1770×1101 preparation, presets, protected world/anchors, grass budget, static transforms and mode isolation.
- 2 Desktop High/tablet pressure and mode-switch checks.
- 4 disposal, preparation-cancellation, pagehide and real navigation/re-entry checks.
- 8 full-direction visual, dual-stick, lane, running and hint-dismissal checks.
- 2 WebKit landscape/portrait navigation checks.

The two independent before/after profiling runs and the alternating material-cost run also completed. No shader/pipeline/resource growth occurred in the paired test, and both independent runs recorded no JavaScript or GPU errors. Syntax checks and `git diff --check` pass. No presets, tests, error handling or timeouts were weakened.

The world GLB retains SHA-256 `c6d9a6ca1d40e7a0d7e75ada75cc29ef781e8f067a5f189fff6d99ef87e55536`; the route, lighting policy, application and input code remain unmodified. Raw release evidence is under `output/final-polish/release-*`.

Physical iPad Safari/WebGPU still requires confirmation of sustained FPS/thermals, cold entry, repeated re-entry and material appearance on the device. Chromium tablet acceptance and WebKit navigation do not prove physical Safari GPU stability.
