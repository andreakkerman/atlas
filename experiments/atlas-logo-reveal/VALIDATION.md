# Validation — 27 September 2026, centered wordmark

Final command, against the isolated server on port 4186:

```powershell
npx.cmd playwright test --config experiments/atlas-logo-reveal/playwright.config.cjs --workers=1
```

**14 passed in 1.1 minutes.** Chromium and WebKit ran sequentially. No Atlas application source, shared graphics code, world assets, presets, level content or drafts were modified; the application renderer acceptance gate is unaffected by this independent lab.

## Wordmark placement

The underline ornament and center diamond were removed from the sampled wordmark region, and the letters were centered between the unchanged emblem and Start anchors. Settled-frame pixel comparisons against `captures/before-wordmark-position/` confirm identical emblem and Start regions in Chromium and WebKit. At 1440×900, all changed pixels lie within the wordmark/ornament band (y=590–717). Desktop and portrait captures were inspected. The existing whole-word fade measurement now follows the new wordmark offset; all original opacity bounds remain intact. The full 14-check suite passes.

## Approved defaults and Edit mode

Current and Restore Defaults now use the exact 72 values supplied by the user. An independent object comparison confirmed that both `defaults` and `normalize({...defaults})` match that JSON without any changed values. The renderer and transparent asset are unchanged. Existing locally saved experiments remain available; `?baseline` previews the new defaults without applying saved overrides.

Arrival now begins at zero seconds. Glyph peak is 1 and final brightness is 1.3, so the final glyph is intentionally brighter than its ignition cue. The corresponding tests now check the empty opening at t=0 and require the settled glyph to exceed the ignition-cue brightness; the remaining assertions are unchanged.

The earlier Edit-only pass had zero changed pixels in all 18 comparisons against its preceding baseline. That historical report remains in `captures/controls-baseline-comparison.json`; it does not describe this deliberately changed, user-approved preset. Current captures were regenerated, and formation and final frames were reviewed.

There are 72 controls in nine groups, all connected to the existing settings object and renderer. Edit workflow tests exercise numeric/slider synchronization, live rendered changes from each visual group, byte-identical reset to Current, localStorage round-trip, malformed-storage fallback, same-frame A/B comparison, JSON copying/export contents, total-duration scaling to eight seconds, phase jumps, keyboard shortcuts and shortcut isolation inside fields. Closing Edit hides both panel and launcher; E/H restores access. Desktop and portrait panel captures are `captures/<browser>-edit-desktop.png` and `captures/<browser>-edit-tablet.png`; the existing touch and both-orientation checks also pass.

Initial regression runs caught floating-point cue sums extending the five-second endpoint by a fractional bit and a one-level color difference from neutral saturation processing. The endpoint is now explicitly rounded to microseconds, and neutral saturation bypasses the color operation. Original deterministic-capture and exact five-second completion assertions were preserved and pass.

The new `assets/atlas-transparent.png` is byte-identical to the supplied `AtlasLogoTransparant.png` (SHA-256 `BE3F5477482BA9FA938BEDFCC6B582FCD4D8193DE80CEE39286775EA77BC82FB`). It is RGBA, 1254×1254. Its authored alpha now exclusively defines the emblem silhouette. The previous JPEG extraction, unmatting and backing plate are removed from the emblem path. The existing wordmark retains its previous source and unified fade.

## Visual evidence

Deterministic captures were generated in both engines and inspected during the polish iterations:

| Capture suffix | Time | Review |
| --- | --- | --- |
| `empty` | 0.00 s | Empty opening frame; arrival begins immediately |
| `arrival` | 0.90 s | Layered cyan material entering from the left |
| `formation` | 1.65 s | Gold deposition follows the carrier; compass points seat from their roots |
| `emblem` | 2.34 s | Complete emblem with a quieter central glyph |
| `glyph` | 2.53 s | Ignition cue; approved final brightness is higher |
| `wordmark` | 3.35 s | All letters halfway through the same fade |
| `continuation` | 3.95 s | Existing carrier curves through the wordmark toward Start |
| `start` | 4.40 s | Centered enamel/gold button receiving residual light |
| `settled` | 5.00 s | Calm final composition, no construction ribbons or dust |

Files are `captures/chromium-<suffix>.png` and `captures/webkit-<suffix>.png`. Additional contour/deposition crops at DPR 1 and 2, landscape, portrait and Retina captures are in the same directory. Mid-formation, complete emblem and settled captures were inspected in both engines, including enlarged contour crops. The former mask-driven stairsteps and cutout fringes are resolved at the tested sizes. Premultiplied upload, mipmaps, four-sample contour filtering and premultiplied compositing preserve the transparent source's coverage. The PNG itself is not blurred, eroded or recolored. Review also exposed a synthetic inner-circle timing boundary and a premature tick fragment; both were corrected before final validation.

Automated image checks cover the green opening, arrival cyan, progressive gold coverage and quieter settled effects. In Chromium, each letter's normalized midpoint intensity was 49.51–50.25%, confirming a unified fade. Mean green-channel values within the fixed glyph region were 58.94 before ignition, 129.94 at the ignition cue and 144.92 settled. These are image-channel statistics, not photometric brightness measurements. The continuation region contains more cyan at 4.25 seconds than in the settled frame. Start is hidden at 4.1, halfway visible at 4.4 and fully visible at 4.6 seconds.

A new regression substitutes transparent, half-covered and opaque texture fixtures, then checks two rendered sites against the expected source-over color. This catches discarded alpha, RGB-derived coverage and double application of alpha. Both engines reproduce the expected composite within two channel levels.

Seeking away and back produces a byte-identical canvas capture. Replay, pause, scrubbing, controls, reduced-motion startup, touch actions, centered-button layout and both tablet orientations pass. Playback finishes at exactly five timeline seconds. GPU/context and browser errors fail validation.

## Measured playback

Local automated-browser measurements during playback, sampled at approximately 2.25 seconds. Frame cadence includes browser presentation; CPU submission time is not GPU execution time. These are not physical iPad benchmarks.

| Runtime | CSS viewport / DPR | Mean fps | Frame p95 | Mean CPU submission |
| --- | --- | ---: | ---: | ---: |
| Chromium, RTX 5090 / ANGLE D3D11 | 1440×900 / 1 | 60.0 | 16.8 ms | 2.59 ms |
| Chromium, RTX 5090 / ANGLE D3D11 | 1180×734 / 2 | 60.0 | 16.8 ms | 2.62 ms |
| Chromium, RTX 5090 / ANGLE D3D11 | 820×1180 / 2 | 60.0 | 16.8 ms | 2.79 ms |
| Playwright WebKit on Windows | 1440×900 / 1 | 57.8 | 21.0 ms | 2.27 ms |
| Playwright WebKit on Windows | 1180×734 / 2 | 25.8 | 44.0 ms | 2.50 ms |
| Playwright WebKit on Windows | 820×1180 / 2 | 19.8 | 55.0 ms | 2.52 ms |

At the two Retina sizes, a same-sized clear-only WebGL canvas measured 47.3 and 41.9 fps in WebKit. The test runtime has significant presentation overhead, and the scene adds further cost. This does not establish the root cause of the remaining scene cost or excuse the low Retina frame rate. The table measures Current with the Edit panel open. Heavier development presets and extreme settings are not covered by these performance figures. Adaptive sampling restricts extra contour work to changing coverage boundaries; the foreground resolution and 13-ribbon count are unchanged, while the approved default particle density is now 1.4.

Raw reports: `captures/<browser>-performance.json` and `captures/<browser>-polish.json`. The WebKit renderer string says “Apple GPU”; that string is not evidence of a physical Apple device.

## Current limits

- WebKit Retina playback remains below the desired smooth cadence. Physical iPad Safari performance and GPU behavior remain unverified.
- Metal lighting is preserved from the supplied reference, not recomputed from an extruded 3D mesh. This preserves the frontal identity but does not support large camera rotations or new light directions.
- The transparent emblem and source B are 1254×1254. Very large/high-DPR displays can expose their resolution limit even with the corrected contour sampling. Reviewed DPR 1/2 views do not show the prior extraction artifacts; this is not a claim of resolution-independent vector artwork.
- Flow remains layered ribbon/sprite material with procedural motion and filtered light, rather than a volumetric fluid simulation.
- Start intentionally performs no navigation. There is no sound or application integration.

The browser holds the final image indefinitely and submits no further WebGL draws until replay, scrubbing, tuning or resizing. Start breathing animates only the HTML button during that hold; the approved Current strength is 0.95. GPU targets are recreated on resize and released on non-cached page exit; a lost context is reported visibly.
