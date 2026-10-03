# Illustrated movement performance investigation — 2026-09-29

## Result and remediation decision

**The reported movement-specific 20–35 FPS collapse was not reproduced. Its exact root cause remains unproven. No production optimization was applied.**

There is a proven movement-dependent cost in the Stage 2 Illustrated sprite import: fractional screen-position changes invalidate the filtered display raster, and alternating rounded dimensions recreate its GPU texture. This happens even when the decoded animation image is unchanged. It is a credible candidate for investigation on the affected browser, but these measurements do not establish it as the cause of the reported collapse. Small matched scenarios stay near 57–60 FPS despite that churn. Large scenarios slow down while stationary too, and Cinematic is slower rather than remaining at 60 FPS.

Removing the subpixel phase from the cache key without changing texture placement/sampling would compromise the parity correction. A speculative rewrite was therefore not justified. Stage 1 and Stage 2 source remain intact.

## Method and evidence

`profile.cjs` drives the existing production `selectLevel`, `beginFreeWalk`, locomotion, camera-follow and renderer paths. Each mode starts the same level at its authored start, follows the same destination 1400 world units to the right, and samples five seconds after 700 ms of movement. The route remains active through the measurement. Stationary cases start at the same origin; walking camera/position follow the same production route across modes, rather than freezing movement or replaying different camera paths. Effective settings and final positions are recorded per sample.

Global Lighting, shadows and particles stay enabled. Full-scene tests select the existing authored grading, area lights and depth settings; isolation toggles only their participation flags. No authored values, resolution, animation rates or effects are retuned. LVL-0004 has nonzero authored depth perspective (0.035), so each feature independently activates full-scene ownership. LVL-0001 has zero authored depth perspective: its depth-only case correctly remains lightweight and is not used as evidence for a full-scene depth cost.

Runs were sequential against the existing server, with fresh browser contexts and blocked service workers/editor draft reads. NVIDIA Blackwell was reported by both browsers. No software renderer was requested. Chromium 148 was headless; installed Chrome 154 was also tested headed to include its native presentation path. These isolated browser profiles do not reproduce the user's existing browser profile, extensions, flags, driver settings or physical window state.

Evidence directories:

- `before/`: LVL-0004, Chromium, 1180×734, DPR 1 and 2, full feature isolation (18 samples).
- `desktop/`: LVL-0004, Chromium, 2560×1440, DPR 1 and 2 (12 samples).
- `headed-chrome/`: LVL-0004, headed Chrome, 1920×1080, DPR 1 and 2 (12 samples).
- `level1/`: LVL-0001, headed Chrome, 1180×734, DPR 2, feature isolation (9 samples).

Each `profile.json` contains every measured RAF interval, counters, upload source dimensions, callback names and CPU durations, long-animation-frame entries, CDP layout/style/task durations, renderer snapshot and summary. Browser metadata is in `environment.json` for the latter three runs. The profiler now also writes source hashes and run parameters for subsequent reproductions. Existing run logs retain the measurements from their respective instrumentation versions; detailed cache-key invalidation counters were added after the first run.

The injected renderer hook only records which revision fields changed before the existing cache decision; it does not change pixels, resources or control flow. Timing wrappers add measurement overhead. RGB upload volumes below are logical width×height×4 bytes, **not measured physical bus traffic**. RAF cadence and CPU API-call duration are not GPU-completed or physically presented FPS. No per-pass GPU timestamp queries or GPU synchronization fences were inserted.

## Matched measurements

LVL-0004 at 1180×734. Times are milliseconds; CPU is mean measured `renderFrame` callback time, including encoding and instrumentation.

| DPR | Mode/state | FPS | Median interval | p95 | p99 | CPU/frame |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| 1 | Lightweight stationary | 60.00 | 16.7 | 16.8 | 16.8 | 0.37 |
| 1 | Lightweight walking | 60.00 | 16.7 | 16.8 | 16.8 | 0.42 |
| 1 | Full-scene stationary | 60.00 | 16.7 | 16.7 | 16.8 | 0.49 |
| 1 | Full-scene walking | 60.00 | 16.7 | 16.8 | 16.8 | 0.77 |
| 1 | Cinematic stationary | 60.00 | 16.7 | 16.8 | 16.8 | 0.46 |
| 1 | Cinematic walking | 60.00 | 16.7 | 16.8 | 16.8 | 0.47 |
| 2 | Lightweight stationary | 57.06 | 17.5 | 18.1 | 18.4 | 0.35 |
| 2 | Lightweight walking | 56.88 | 17.5 | 18.2 | 18.6 | 0.46 |
| 2 | Full-scene stationary | 57.12 | 17.5 | 18.1 | 18.5 | 0.57 |
| 2 | Full-scene walking | 57.05 | 17.5 | 18.1 | 18.5 | 0.78 |
| 2 | Cinematic stationary | 56.94 | 17.5 | 18.2 | 18.6 | 0.42 |
| 2 | Cinematic walking | 57.23 | 17.5 | 18.1 | 18.5 | 0.40 |

Larger presentation checks:

| Browser/viewport/DPR | Lightweight walking | Full stationary → walking | Cinematic stationary → walking |
| --- | ---: | ---: | ---: |
| Chromium 2560×1440 / 1 | 57.1 | 57.1 → 57.1 | 57.1 → 57.2 |
| Chromium 2560×1440 / 2 | 57.2 | 36.1 → 35.8 | 26.4 → 26.2 |
| Headed Chrome 1920×1080 / 1 | 57.1 | 57.3 → 57.2 | 57.2 → 57.2 |
| Headed Chrome 1920×1080 / 2 | 57.1 | 34.4 → 33.9 | 25.4 → 25.0 |

At headed Chrome's larger DPR-2 size, full-scene p95 was 53.3 ms both stationary and walking; Cinematic p95 was about 53.3/53.2 ms. That is a resolution/presentation-load-sensitive result, not proof of a particular GPU bottleneck, and does not reproduce a movement-only collapse. No unrelated large-resolution optimization was attempted.

LVL-0001 headed DPR 2: full-scene stationary/walking **56.97/57.09 FPS**, p95 **18.2/18.1 ms**; Cinematic stationary/walking **55.49/55.50 FPS**, p95 **18.2/18.2 ms**. Walking full-scene CPU rose to 1.00 ms, including an additional visible NPC import, without a corresponding FPS collapse.

## Actor import: exact mechanism and mode differences

In `src/cinematic-renderer.js`, `sprites()` reads the displayed actor bounds and decoded source. All three modes can reuse original image textures by source path; the lightweight path needs those images for GPU grounding shadows while the browser presents Sven itself. Cinematic uses those same source textures directly for its sprite draws. It does not have a separate native character model or a cheaper animation implementation.

Only full-scene Illustrated calls `illustratedSprite()` for the known Sven/NPC images. It reproduces image/owner CSS filters and shadows using two transient display-DPR Canvases. Its revision includes image path, dimensions, fractional pixel phase `x/y`, displayed size, DPR, filters and mirror. Position uniforms and image caching are therefore **not independent**: motion changes fractional raster phase; `ceil`/`floor` can also change width/height by one pixel. On invalidation:

1. Two new Canvas elements rasterize the same decoded image and existing filters.
2. `uploadDynamicCanvas()` calls `copyExternalImageToTexture`.
3. The existing texture is reused if dimensions match; otherwise a texture is allocated and the old texture destroyed.
4. The cache retains one current filtered image per character, so changing to a previously seen animation frame still re-rasterizes it. Original source-image textures remain path-cached separately.

LVL-0004 full-scene, small viewport, per measured frame:

| Work | Stationary DPR 1 | Walking DPR 1 | Stationary DPR 2 | Walking DPR 2 |
| --- | ---: | ---: | ---: | ---: |
| Filtered sprite uploads | 0.093 | 0.980 | 0.102 | 0.982 |
| Logical filtered sprite MiB | 0.041 | 0.434 | 0.177 | 1.711 |
| All external copy calls | 1.440 | 2.321 | 2.147 | 3.004 |
| Texture creations | 0 | 0.334 | 0.046 | 0.467 |
| Renderer CPU ms | 0.489 | 0.768 | 0.566 | 0.779 |

Walking dimensions alternate among 318/319×363/364 at DPR 1 and 632/633×722/723 at DPR 2 (all exact dimensions are recorded). At the larger desktop size they alternate among 728/729×839/840. In the 2560×1440 DPR-1 case, source changes occur on 42.3% of frames, but fractional X/Y phases change on 71.0%/93.4%; dimensions change on 10.8%/28.7%. These are overlapping causes, not an additive budget. The import runs roughly at RAF cadence while walking, not just at the approximately 24-FPS sprite animation cadence.

At small DPR 2 this is about **98 MiB/s of logical filtered-sprite updates**, versus about 10 MiB/s stationary. Stationary blinking does invalidate the image periodically; ordinary unchanged stationary frames do not reveal movement's nearly continuous phase/dimension changes. That is why the prior stationary benchmark missed this cost.

The NPC path shares the same helper. In LVL-0001 walking, filtered imports rise to **1.267 per frame**, including a decoded 392×584 NPC source and display textures around 513/514×638. Camera movement can invalidate a stationary world NPC's screen phase too. The investigation does not claim that every NPC animation/state has been covered.

Cinematic walking at small DPR 1 has **zero filtered-Canvas uploads** and only about 0.013 new source-image uploads/frame during the remaining animation warm-up. Its sprite texture lifetime is source-based; position changes update draw data. It continues reading the shared DOM/locomotion representation rather than re-rasterizing CSS filters.

## Canvas bridge, reads, encoding and stalls

The active legacy producers in LVL-0004 are worldLight and foregroundAtmosphere, both 2172×724 (~6.0 MiB logical RGBA per upload). `scene-effects.js` publishes a revision on its own paced draw; active effects are animated. `stepMovement` updates world/actor DOM transforms and does not publish Canvas revisions. Empty slots remain excluded by Stage 1.

At small DPR 1, each producer uploads about **0.67/frame stationary and 0.66/frame walking**; at the measured ~57-Hz cadence, each uploads once per frame in both states. The cadence difference reflects the producer's interval threshold versus RAF timing; it is not movement dirtiness. Full-scene walking adds filtered sprite copies, not extra legacy slots or movement-triggered copies of unchanged Canvas content.

Cinematic replaces the relevant Illustrated presets with its GPU effects, so these sampled scenes have no legacy Canvas bridge and no legacy `draw` RAF. It still reconstructs the full scene every frame. In this configuration it has more passes (9) than full-scene Illustrated (5), yet avoids the CSS sprite raster and legacy imports. Pass count alone does not explain the reported symptom.

Small DPR-1 walking averages:

| Counter | Lightweight | Full-scene | Cinematic |
| --- | ---: | ---: | ---: |
| Geometry reads/frame | 3 | 5 | 5 |
| Style reads/frame | 2 | about 7.8 | about 4.8 |
| Passes/frame | 3 | 5 | 9 |
| Draws/frame | 3 | about 9.4 | about 10.4 |
| Uniform writes/frame | 4 | about 10.4 | about 11.4 |
| Queue submissions/frame | 1 | 1 | 1 |

Draws vary as another sprite enters the viewport; the authored all-feature configuration also differs from the neutral Stage 1 counter fixture. Exact binding, buffer creation/destruction and resource counters are in every row. Buffer creation is limited to a new visible draw slot; filtered texture replacement is the significant repeated resource churn. No queue completion wait/readback was found in the movement import. In the small matched run, measured external-copy CPU time is roughly 0.04–0.06 ms/frame, and geometry-read CPU time rises by only a few hundredths of a millisecond. CDP layout durations are recorded but do not expose a movement-specific long synchronous layout stall.

The active callbacks are `renderFrame`, locomotion `tick`, legacy producer `draw` for Illustrated, and `stepMovement` while walking; LVL-0001 also has `npcAnimationStep`. Per-callback counts and durations are recorded, not inferred from average FPS.

There was one 1067.5-ms RAF gap in the first DPR-1 area-only sample (average 47 FPS, p95 17.8 ms, p99 18.2 ms). Long Animation Frame reported zero blocking duration for that entry. It was not a sustained animation-cadence collapse and did not recur in the DPR-2 feature isolation. Its origin was not determined; it must not be attributed to area-light shader cost or hidden by reporting only a trimmed average.

Small-scene animation-change and position-only groups both have approximately 16.8–18.2-ms p95, despite the latter still importing filtered images. Large-scene animation-change groups sometimes have longer intervals, but long intervals themselves make an animation-frame change more likely. That correlation alone does not establish causal upload stalls. API timers do not measure deferred GPU/browser copy completion, so a driver/browser synchronization issue on the affected setup remains possible.

## Feature isolation

LVL-0004 DPR 2 walking:

| Selection | FPS | p95 ms | Filtered imports/frame | Passes |
| --- | ---: | ---: | ---: | ---: |
| Grading only | 57.01 | 18.1 | 0.982 | 5 |
| Area lights only | 57.08 | 18.1 | 0.982 | 5 |
| Depth only | 57.08 | 18.1 | 0.975 | 5 |
| All three | 57.05 | 18.1 | 0.982 | 5 |

The movement import cost is shared once any contributing feature activates full-scene ownership. No extra animation-dependent upload path appears when all three are enabled. These samples do not establish equal GPU shader cost; they show equal import behavior and no measured feature-specific motion collapse.

## Validation, files and next step

Only this new `Docs/movement-performance/` directory was added by this investigation: profiler, report, raw measurements and logs. No production source, authored asset/level, settings contract, gameplay, audio, service worker or tests were changed. Earlier dirty work remains intact.

Focused validation: **8 passed**, `tests/illustrated-compositor.spec.js` and `tests/cinematic-sharpness.spec.js`, desktop Chromium, real WebGPU, one worker. Results are in `regressions.log`; this checks neutral parity at DPR 1/2, the Stage 1 upload/pass invariants, OFF→ON→OFF restoration, teardown/resource stability and Cinematic sprite behavior. Syntax and `git diff --check` passed. A new renderer-resource change was not made, so the conditional broad tablet acceptance suite was not rerun for this documentation/instrumentation-only investigation.

There is **no before/after fix comparison**, because no fix was applied. Claiming an improvement from these unmatched symptoms would be misleading.

The narrowest next experiment, once the actual failing level/window/browser configuration is available, is to correlate this same import trace with the collapse and perform a controlled raster-cache ablation. If proven causal, a local sprite-space filtered-image cache could separate screen translation from imagery; its placement/sampling must preserve Stage 2 visual tolerance at both DPRs. Simply dropping position fields or retaining a raster at the wrong phase is not a safe correction. An animation-frame cache also needs a bounded memory budget and existing teardown ownership. Neither design was implemented speculatively.

Physical iPad/Safari GPU synchronization, native presentation, driver behavior, and the user's existing desktop profile remain unverified. The hardware Chromium/Chrome results do not close those gaps or disprove the reported issue.
