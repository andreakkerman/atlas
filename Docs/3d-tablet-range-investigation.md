# v157 tablet RangeError — investigation and QA gate

## Status

The physical failure is **not yet located or fixed**. Do not present this change as
a renderer correctness fix or physical acceptance. The reported operation is
warm-up 1/3 after volumetric work was submitted. The original physical JavaScript
stack and source/destination ranges are missing from the supplied journal.

The unmodified v157 renderer completed both new real-Chromium acceptance cases:
1180×734/DPR 2 and 1180×689/DPR 2. Each performed two complete 3D preparations in
one page, with movement/look, sustained frames and Illustrated/Cinematic recovery.
The latter produced exactly 512×299 hidden warm-up frames. Neither reproduced the
reported RangeError. This pre-change run passed 2/2 tests in 6.4 minutes.

## Findings and limits

- `instrumentPreparationPass()` in `src/three-renderer.js` prints the **canvas**
  dimensions. Its “Volumetrisch licht … (512×299)” message does not identify the
  internal volume target size or prove which subsequent operation failed.
- Vendored Three r180 `PassNode.setSize()` multiplies dimensions by its resolution
  scale; GaussianBlurNode rounds its own output target sizes. At quarter scale,
  the 299-pixel canvas height yields fractional target metadata (74.75). Native
  GPU extent conversion and downstream target sizing are exercised by the new
  acceptance case; they did not produce an out-of-range copy locally. Rounding
  these values without a reproducer would be a speculative change, not a proven
  fix for the physical exception.
- The investigated buffer paths include Three's `UniformsGroup.updateMatrix4()`
  (`Float32Array.set`), attribute creation (`getMappedRange()` followed by a typed
  copy), uniform/attribute `GPUQueue.writeBuffer()`, and texture uploads. The error
  text alone does not distinguish those paths or identify their invalid operand.
- [WebKit's typed-array implementation](https://github.com/WebKit/WebKit/blob/main/Source/JavaScriptCore/runtime/JSGenericTypedArrayViewInlines.h)
  emits this wording from range validation used by typed-array copies. This
  supports capturing `TypedArray.set` operands, but does not identify the failing
  Atlas/Three call or establish why its destination range became invalid.
- The previous default debug journal retained a generic outer-operation message,
  but dropped the original exception stack. Detailed copy instrumentation existed
  only behind the heavier `debug3dgpu=1` option, which the baseline retests avoided.
- Real Chromium at matching viewport/preset values is not WebKit/JavaScriptCore
  using Apple's native GPU implementation. A passing Chromium test cannot prove
  that this browser/device-specific failure is corrected.

## Implemented evidence capture

With `debug3d=1`, original preparation exceptions now retain a bounded stack in
`atlas3d-debug-preparation-v1.failure`. During first-size effect preparation only,
`AtlasThreeGpuDiagnostics.captureRangeFailure()` temporarily wraps typed-array
`set`, queue writes and `GPUBuffer.getMappedRange`. On failure it records the API,
source/destination sizes, offsets and any mapping associated with the destination
ArrayBuffer, along with pass and target/input dimensions. The overlay puts this
evidence before ordinary input traces. The full record survives recovery/reload in
the journal until a new preparation overwrites it.

These wrappers perform no extra GPU work, copies, scopes or shader profiling. They
restore synchronously in `finally`, forward the original arguments and rethrow the
same exception. Production without `debug3d=1` installs none of these hooks. No
preset, asset, target allocation, render order or error-recovery policy changed.

The native invalid-copy tests in `three-gpu-diagnostics.spec.js` prove capture,
mapping correlation and restoration. They are explicitly **diagnostic fixtures**,
not reproductions of the physical application's unidentified bug. There is not yet
a regression test that fails on v157 because of that exact physical cause.

## Durable acceptance path

`tests/three-tablet-acceptance.spec.js` forces Tablet Optimized on the real renderer.
It checks actual samples/targets, absent GTAO shaders, effect settings, native GPU
completion behind all three warm-up views and the final full-size frame, native
touch movement/look, continued completed frames, graphics recovery and second
preparation in the same page. It rejects exceptions, shader/validation errors,
unexpected device loss, readiness timeouts and incomplete GPU work. Intentional
device destruction during normal cleanup is distinguished from unexpected loss.

Both 1180×734/DPR 2 and the reported 512×299 warm-up aspect are mandatory. The
existing direct 1770×1101 coverage remains separate. `AGENTS.md` makes this suite
a completion gate for renderer-affecting changes. Evidence JSON is saved in each
test's output directory, including failed runs.

## Validation results (2026-09-10)

- Broad sequential Chromium/WebGPU regression: **35 passed** (23.7 minutes).
  This includes preset/detection cases, both presets under GPU pressure and
  injected failure conditions, compact 1770×1101 preparation, cleanup/recovery,
  Desktop High route/progression, graphics modes, and the initial acceptance cases.
- WebKit landscape/portrait regression: **54 passed** (3.5 minutes), covering
  navigation, native touch, loading isolation, page lifecycle, device cleanup,
  capability handling and diagnostic capture. This is not physical Safari GPU QA.
- Original-exception journal integration: **3 passed** (Chromium and both WebKit
  orientations). Its deliberately invalid native copy tests evidence retention,
  not the physical renderer bug.
- JavaScript syntax checks and `git diff --check` passed.

- Final tightened acceptance rerun: **2 passed** (6.5 minutes), at 1180×734 and
  1180×689, both DPR 2. This additionally requires nonempty effect-pipeline
  observations, changing world pixels after input, restored temporary hooks, and
  saved native GPU evidence. Each evidence file records eight completed preparation
  views (two entries × three warm-up views plus the final full-size frame), zero
  captured GPU/runtime errors, no GTAO shaders, and one-sample effect pipelines.
  The second case confirms all three 512×299 warm-up views complete twice.
  Evidence is under `test-results/tablet-range-acceptance-final/`.

The interrupted rerun initially encountered an unavailable local asset server and
then a sandbox browser-launch restriction; neither reached renderer execution.
After restarting the existing server and obtaining the normal browser-launch
escalation, the unchanged suite passed. GPU tests were run sequentially.

These results validate the expanded local acceptance path and diagnostic changes.
They do **not** demonstrate a correction for the physical RangeError: the same
real-renderer path also passed before these changes, and its physical failing
call/operands remain unknown. No renderer workaround was introduced. Nothing was
committed or deployed.

## Next evidence needed

After an explicitly authorized deployment of this diagnostic change, a failure
with ordinary `?debug3d=1` should expose “Foutbron”, the original stack and copy
ranges. Preserve that overlay or export
`localStorage.getItem('atlas3d-debug-preparation-v1')` before retrying. This is the
missing evidence needed to identify the actual bad allocation/copy and create a
pre-fix failing regression. Do not claim the root-cause task complete until then.
