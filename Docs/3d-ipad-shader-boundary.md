# iPad shader-module boundary investigation — v148

The physical screenshot establishes one completed compact warm-up view and an `InvalidStateError` from `GPUDevice.createShaderModule` during view 2. It does not identify the shader or prove device loss. Physical Safari is unavailable in this QA environment.

## Identified and corrected

GPU validation scopes exposed an invalid GTAO shader in the existing runtime: the vendored r180 TextureSizeNode passed a mip-level argument to `textureDimensions` for multisampled depth. The real compact GPU run failed in `fragment_GTAO` before the correction and completed after it. The local vendor patch emits the valid overload while preserving MSAA and every quality setting. This is a confirmed shader defect, **not yet a confirmed explanation of the physical iPad's later InvalidStateError**.

An already-aborted preparation operation also used to invoke its task while racing an already-rejected cancellation promise. The operation now checks the abort signal before invoking work, including after the status callback. The regression injects known device loss at that boundary and requires zero subsequent renderer initialization calls and complete device destruction.

## Evidence available on the next physical test

With `?debug3d=1`, `src/three-gpu-diagnostics.js` records:

- `device.lost` reason/message and whether Atlas had already requested cleanup; a missing notification is explicitly not evidence that the device is valid.
- Uncaptured errors and validation/internal/out-of-memory error scopes around initialization, compilation and warm-up rendering.
- The exact shader label, source fingerprint, first-seen operation, object/material, and requesting pass immediately before shader creation; synchronous failures preserve that entry.
- Pipeline labels, module labels and object/material context, including asynchronous rejection.
- Representative per-label compilation information and per-view counts by pass/shader label. Full shader sources, GPU resources and unbounded histories are not retained.

The bounded journal is stored in `localStorage['atlas3d-gpu-preparation-v1']`; the existing milestone journal remains unchanged. The current diagnostic is shown first in the debug overlay. Normal production installs none of these hooks or overlays. Cleanup-requested device destruction is recorded separately from spontaneous loss, including loss notifications delivered after cleanup begins.

The first corrected compact run completed in 65.1 seconds on the local desktop GPU (not an iPad timing). It released 978,586,968 decoded image bytes, used the same three small views plus full-resolution playable frame, and reported no scoped GPU error/device loss. Shader counts were 1,692 before view 1, 2,507 after view 1, 3,214 after view 2 and 3,287 after view 3. Thus the bulk compile counter is not a count of all eventual shader modules. The new per-view journal identifies which passes account for the remaining work; source fingerprints indicate exact source equality, not semantic equivalence.

The subsequent per-pass run isolated view 2's 707 modules: 702 shadow vertex modules, one shadow fragment module, and four repeated GTAO/Gaussian-blur modules. The first new shadow vertex request was for `Masonry_rooted_creeper018_1`. No loss or validation error occurred in that run. The bulk compilation label now explicitly says that shadow variants follow during warm-up; it does not imply that 99/103 covers every eventual pipeline.

## Source interpretation

WebKit's [GPUDevice implementation](https://github.com/WebKit/WebKit/blob/main/Source/WebCore/Modules/WebGPU/GPUDevice.cpp) uses this InvalidStateError when it cannot obtain a backing shader module. Its [remote device proxy](https://github.com/WebKit/WebKit/blob/main/Source/WebKit/WebProcess/GPU/graphics/WebGPU/RemoteDeviceProxy.cpp) can return no module after failed descriptor conversion or IPC submission. These current-source paths support collecting device/backend evidence; they do not establish which path the installed physical Safari version took.

No warm-up views, resource dimensions, scene content, touch behavior, or normal Atlas navigation were changed. A physical retest remains necessary to determine whether correcting GTAO also resolves Safari's reported boundary, or whether the retained loss/pass diagnostics identify an additional driver/resource failure.

## Completed QA

- Nine existing desktop/WebGPU gameplay regressions passed, covering real loading milestones, navigation, keyboard/mouse movement, touch move/look/interaction, challenges/progression, renderer switching and unsupported-level fallback.
- Both compact preparation/journal regressions passed. The real GPU run completed all views with no captured validation error or device loss, preserved the memory-release checks, and restored full runtime resolution before readiness.
- Twenty-two WebKit checks passed across iPad portrait/landscape for navigation, forms, startup recovery, diagnostics and native touch input. The final six diagnostic checks also passed in WebKit after adding uncaptured-error and already-lost-device coverage.
- The final Chromium recovery/diagnostic run passed all ten checks, including the exact injected view-2 shader-module InvalidStateError followed by successful Cinematic initialization. Failure, cancellation, GPU stall, stall cancellation, throwing disposal, and late device acquisition all released the owned device.

The first broad run exposed a test injection defect: its shortened timeout applied to real view-2 compilation, and its queue stub could then capture Cinematic's queue instead of the original 3D queue. The fixture now binds the stall to the original device and accelerates only the deliberately stalled queue-wait boundary. Both corrected cases passed in the final run. No production timeout was increased to make these tests pass.

These are local browser results, not a physical Safari certification. Changes have not been committed or deployed by this pass.

## Physical retest: RangeError in view 1 — v149

The next physical screenshot reports `Range consisting of offset and length are out of bounds` at warm-up 1/3, zero completed views, 2,533 shader modules and 2,505 pipelines. The last completed pass submitted world/shadow work at 512×318. The displayed last shader is not evidence that it threw. Device loss is reported as `destroyed` after Atlas requested cleanup, so this screenshot does not establish spontaneous device loss.

WebKit's [typed-array implementation](https://github.com/WebKit/WebKit/blob/main/Source/JavaScriptCore/runtime/JSGenericTypedArrayViewInlines.h) emits this exact wording for an invalid `TypedArray.set` range. The previous journal discarded JavaScript error stacks and could not identify that call. The debug trace now retains bounded stacks and records exceptions from typed-array copies and GPU queue uploads, including array types/lengths/byte sizes, offsets, pass and object context. It forwards the original arguments and exception; it does not clamp, pad, retry or otherwise alter a failing copy. The shared typed-array hook is installed only during debug preparation and restored on completion/cleanup. Normal production never installs it.

The debug overlay puts the failing API, copy dimensions and stack before the last-shader record, and explicitly labels the latter as not necessarily the fault source. This is an evidence improvement, not a claim that the physical range bug has been fixed. The call stack and dimensions from the next physical failure are needed to correct the responsible allocation/copy rather than guessing at an asset or GPU failure.

Validation: all 12 diagnostic checks passed across Chromium and both WebKit iPad orientations, including a native invalid typed-array copy and hook restoration. All three focused real-GPU checks passed: range-error cleanup followed by Cinematic startup, complete compact preparation at the non-round screenshot aspect ratio, and debug-journal/clean-production behavior. The physical application's failing copy is still unlocated; these tests do not certify iPad startup. v149 changes remain local and undeployed.
