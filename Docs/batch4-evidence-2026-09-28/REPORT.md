# Batch 4: Stage 1 implemented; parity remains unresolved

This is a partial batch, not a production sign-off. The scope guard stopped further implementation after a narrow colour-space experiment failed the neutral parity invariant. No experimental shader change is retained. Scene Depth, Grading and Area Lights remain OFF in the play-session defaults.

## Retained changes

- Illustrated no longer opens the Cinematic-only standalone shadow pass.
- The existing scene-effects producer publishes a WeakMap-backed content revision and active-slot flag after drawing or clearing. This is metadata only; effect drawing, timing and authored configuration are unchanged.
- Illustrated skips empty slots and uploads active slots only on producer revision, canvas identity, dimensions or resource recreation changes. Missing metadata conservatively retains the previous upload behavior. Cinematic consumption is unchanged.
- Empty textures are never drawn. A later active revision uploads before drawing; an unchanged active revision reuses its GPU texture. Existing owner disposal destroys those textures and the next owner uploads afresh.

## Controlled cost comparison

`measure-baseline.cjs` serves the original HEAD renderer through a browser route, then the working renderer, against the same current LVL-0004 assets. It does not rewrite source or authored files. `baseline-comparison.json` contains the raw samples.

| Metric | Before | After |
|---|---:|---:|
| Full-scene passes/frame, DPR 1 and 2 | 6 | 5 |
| Draws/frame, current available sprites | 10 | 8 |
| Animated legacy Canvas uploads/frame | 4 | 2 |
| Frozen active producer uploads/frame | 4 (prior audit) | 0 |
| Full-resolution HDR targets | 2 | 2 |
| Renderer buffers | 13 | 11 |
| Uploaded source diagnostics | 7 | 5 |

The earlier audit's 11 draws included a different available sprite set. The same-assets comparison here removes exactly two empty slot draws. Empty slot textures are no longer allocated. Active canvases keep their existing dimensions and cadence.

The five-variant run (`chromium.log`) used 1180×734 at DPR 1/2, global lighting/shadows/particles enabled, Canvas challenge FX. Baseline uses 3 passes/3 draws/0 uploads/1 target; each full-scene variant uses 5 passes/8 draws/2 uploads/2 targets. Tracked settled resources were 5 textures/6 buffers for baseline, 8 textures/11 buffers for full scene with that sprite set. Menu teardown reaches zero tracked textures/buffers and no scheduled compositor RAF. Newly available sprites after a level visit legitimately alter absolute counts; repeated identical post-transition recipes must remain constant.

| Variant | Encoding ms DPR 1 / 2 | RAF FPS DPR 1 / 2 |
|---|---:|---:|
| Baseline | .397 / .361 | 58.22 / 58.29 |
| Grading | .506 / .424 | 57.03 / 58.74 |
| Area lights | .508 / .412 | 57.56 / 59.00 |
| Both | .528 / .454 | 57.52 / 57.46 |
| Depth | .478 / .477 | 58.07 / 57.61 |

These short desktop, instrumented CPU/RAF samples are diagnostic, not GPU timings, thermal measurements or evidence of physical-iPad performance. Subsequent runs vary. The resource/work counts are the reliable result.

Initial-entry baseline texture counts varied across runs (5, 11 and 18), while post-toggle baseline returned to 5 and menu teardown to zero. The initial sprite/cache residency behind that variation was not conclusively characterized; the repeated-recipe checks establish stability after transition, not an invariant absolute allocation count for every entry.

## Parity investigation and stopping boundary

Confirmed code-level mismatch: the full-scene sprite shader decodes Canvas RGB to linear, premultiplies by alpha, and blends in the linear HDR target; finish converts back to sRGB. The normal browser path source-over composites the encoded Canvas output. The same semi-transparent bright effect therefore produces a different result. Upload uses straight alpha and the shader/blend pair uses premultiplied output consistently; simply changing the upload alpha flag would not correct this colour-space mismatch.

There are additional composition differences: lightweight particles are accumulated into a browser `screen` overlay, whereas full-scene particles add into HDR. The DOM `forestMist` gradients and inherited sprite CSS drop shadows are not reproduced by the full-scene sprite list. Native DOM sprite resampling also differs. These are evidence that a transfer-function-only patch cannot establish whole-scene parity.

A discarded experiment moved Illustrated layer blending into encoded colour, retained linear feature evaluation, and changed the full-scene particle blend. It reduced LVL-0004's aggregate error to 1.83/255 but still failed the <1 invariant. It was removed, not shipped as a partial visual correction. It also did not establish equivalent overlapping-particle accumulation.

Retained-code frozen captures in `parity/` reproduce MAE 11.34/255 on LVL-0004 and 10.50/255 on LVL-0001; OFF→ON→OFF restores baseline within 0.1. CSS animation is paused, particle shader time is fixed, and scene-effect producer scheduling is frozen across the switch. These captures include missing-source DOM placeholders in the current asset environment, so they cannot attribute every residual pixel to one cause. The main colour-domain mismatch is independently visible in source and consistent with the prior audit. The permanent neutral test remains failing and is not marked expected-failure or given a looser threshold.

Completing parity would require reproducing additional DOM composition/filter behavior and validating accumulation/order for every layer. That exceeded the narrow experiment's demonstrated safety; implementation stopped rather than retuning authored effects or claiming parity.

## Scene Depth and other features

No depth-specific optimization is retained. The five-pass full-scene recipe still reconstructs the scene, retains a separate pre-shadow receiver target, copies/applies the field, and performs a full-resolution finish. Depth sampling and the linear distance-colour operation belong to the feature; the full-scene ownership/copy structure is shared architecture. Aliasing the receiver and scene target would change the shadow dependency. With parity unresolved, there is no safe demonstrated shortcut to report.

Grading and area-light formulas, resource selection and authored strengths are unchanged. Their reduced shared cost is measured above; neutral visual correctness remains unresolved. No physical-device visual or performance success is claimed.

## Validation

- Chromium focused compositor/route-overlay/graphics-session run: 9 passed, 1 failed (neutral parity, both levels). See `chromium.log`.
- New producer test covers real transient empty→active→empty→restart, actual visible Canvas pixels, clear metadata, DPR 1/2, frozen/changed uploads, resource recreation, toggles and disposal. Final additional menu/level/re-entry and repeated-recipe run: 2 passed; see `final-producer.log`.
- Required real-WebGPU tablet acceptance: both 1180×734 and 1180×689 cases passed, sequentially, including repeated entries and Cinematic transitions. No unrelated pressure batch was run.
- Existing Cinematic sharpness: all four desktop/wide/tablet landscape/tablet portrait cases passed. No Cinematic shader or blend change remains.
- Existing Illustrated GPU feature/lifecycle test reached the final error-list assertion after passing its feature, recovery, renderer-switch and cleanup checks, then failed on `net::ERR_FILE_NOT_FOUND` asset errors. Assertions were preserved. See `rendering.log`.
- WebKit iPad landscape: 8 passed, 2 explicitly skipped native-WebGPU cases. See `webkit.log`.
- JavaScript syntax and `git diff --check`: passed.

Two existing test helpers were changed only to enter through the current editor deep link and await deferred bootstrap. Their behavioral assertions are unchanged. No broad harness cleanup was performed.

## Files and remaining scope

Batch-owned source: `src/cinematic-renderer.js`, `src/scene-effects.js`.
Contract: `Docs/renderer-current-spec.md`.
Tests: new `tests/illustrated-compositor.spec.js`; bootstrap-only edits to `tests/cinematic-sharpness.spec.js` and `tests/illustrated-features.spec.js`.
Evidence: this directory.

Pre-existing changes elsewhere were preserved. This batch does not change gameplay/session/replay, asset/audio recovery, service-worker ownership, authored levels, Three/Voxel implementations, defaults, shaders or effect tuning. Full neutral parity, per-layer feature visual correctness, physical Safari/PWA thermal behavior, and all possible device-loss timing permutations remain unproven. Batch 4 is not complete.

## Physical PC / iPad follow-up

Use LVL-0004 Nautilushaven, stationary Sven near X=263 and a fixed camera. Keep global lighting, character shadows and particles ON, challenge FX Canvas. Compare baseline, grading only, area only, both, and depth only, returning to baseline between each. Record FPS and visible stutter, sun-ray strength, actor/shadow edges, particles and challenge effects; keep each configuration running for 2–3 minutes to observe warmth and sustained pacing. Repeat toggles, menu/re-entry and orientation changes. Where practical repeat in browser and installed PWA, recording OS/browser version, device and screenshots. Treat the known handoff appearance change as unresolved, not an expected pass condition.
