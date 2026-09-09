# v150: restore the physically verified iPad loading path

Baseline: `1416884` (the memory-pressure fix), followed by the user's physical report of successful full-world loading in approximately 232 seconds and approximately 30 FPS after settling. Touch movement was the outstanding problem in that build.

## Restored

- The complete `warmup()` function, unchanged from that commit: sequential image uploads and pixel release, 16-object compile batches, three representative small renders, original camera samples and full-resolution first playable frame.
- The original preparation-pass instrumentation and world partition/add order.
- The byte-identical vendored `three.webgpu.min.js` dependency. The later TextureSizeNode shader patch is reverted as part of restoring the actual baseline. Its documented validation issue remains known; this recovery prioritizes the physically verified implementation, not a claim that that implementation has no renderer defects.
- Ordinary `debug3d=1` no longer installs later GPU error scopes, shader/typed-array wrappers or the first-visible GPU profiler. Those capabilities remain separately opt-in with `debug3dgpu=1`, and are excluded from baseline acceptance testing.

## Retained independently

- The native iPad TouchEvent controller, stable identifiers, simultaneous move/look, contextual interaction, and idempotent attachment across UI redraws.
- Menu/Terug fixes, gameplay-only gesture suppression, normal Atlas UI, five-stage loading cover and recovery control.
- Explicit owned-device destruction, late-resource cleanup, cancellation, failure-state latching and renderer-switch ordering. A 90-second outer warm-up-operation watchdog remains around the baseline task; it does not add renders, GPU waits or error scopes.
- Correct frame-based performance measurements. No world asset, material setting, texture size or shadow quality setting changed.

Source verification: normalized `warmup()` SHA-256 `0281d7653fb4b2a255f6003ef2ccaa934131af002abb5708ff523061fbeaeb65`; exact function comparison with `1416884` passed. Vendored renderer byte comparison passed. All other vendor and LVL-0001 3D assets are unchanged from that baseline.

Physical acceptance is ordinary 3D loading followed by native movement/look and interaction on the same iPad. Do not enable `debug3dgpu=1` for that baseline acceptance run. Browser QA cannot certify the physical GPU.

## Completed validation

All 18 Chromium/WebGPU regressions passed (13.1 minutes), including baseline loading, full-resolution readiness, retained native-touch movement across redraws, simultaneous touch look, interaction, desktop walking, three challenges/gate progression, all graphics modes, and failure/cancellation/stall recovery into Cinematic. All 18 WebKit checks passed across iPad portrait and landscape, covering normal navigation, forms, startup recovery and the native touch controller.

The compact run completed in 63.2 seconds on the desktop GPU, rendered the three original views at 512×318, released 978,586,968 decoded image bytes, and remained playable after movement and resize. No extended GPU instrumentation was installed. This timing is not a physical iPad measurement.

Source comparison, syntax and diff checks passed. Changes are local; this pass did not commit or deploy them.
