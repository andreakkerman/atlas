# v154: exclusive GPU ownership and bounded compact frames

Physical device: user reports iPad Air M3 (2025), 128 GB, iPadOS 26.6.1. Four sequential tests included Cinematic before 3D. Cinematic worked before each attempt and failed to acquire an adapter afterward. Two attempts entered 3D but showed a frozen image while touch/target state continued changing. This does not establish that the world is inherently unsuitable for the device.

## Concrete defects

1. Cinematic's inactive path stopped rendering but retained its shared GPU device/resources. 3D then requested another device. The prior cleanup tests started from Illustrated and did not cover this pre-existing allocation.
2. Compact gameplay submitted another frame on every animation callback without waiting for GPU completion. A live CPU/input loop therefore did not demonstrate live rendered output and could continue accumulating GPU work behind a stalled frame.

## Changes

- Before 3D requests its device, Atlas disposes the other renderers' scene resources/contexts and releases the shared Cinematic/Voxel device. The broker waits for an in-flight device acquisition, destroys the acquired device, clears its consumed adapter, and waits for device loss before proceeding. The existing renderer loss handlers invalidate their pipelines for subsequent recreation.
- If the user cancels the handoff and returns to a shared renderer during acquisition, the stale 3D request must not destroy the reclaimed device. The release guard is checked after acquisition completes.
- Voxel explicitly unconfigures its canvas context during disposal.
- Compact gameplay permits only one in-flight frame. Another frame is scheduled only after the GPU completion fence resolves. UI synchronization cannot bypass this guard.
- A foreground GPU frame that does not finish within 15 seconds produces a visible recoverable error and disposes 3D. Hidden-tab throttling does not trigger this watchdog. Rejected fences, device loss and synchronous frame errors also clean up rather than only stopping animation.
- The page-exit cancellation journal retains the interrupted operation instead of replacing it with a generic cancellation message.

World assets, render dimensions, materials, lighting, shadows, effect settings, compact preparation batches and desktop frame scheduling are unchanged. The existing touch and Atlas navigation fixes remain intact. Cache version is v154.

## Validation scope

The new real-WebGPU tests follow Cinematic → compact 3D → Illustrated → Cinematic, count live devices, exercise movement, and inject a never-completing gameplay fence. They require a peak of one live GPU device, bounded submissions/frames while stalled, a visible error and successful Cinematic recovery. The success path additionally compares actual world pixels after turning, outside the HUD and interaction controls.

Physical Safari GPU behavior cannot be certified by Chromium or desktop WebKit. These changes correct observed ownership/scheduling defects; they are not a guarantee that all physical memory/driver limits have been eliminated. No simpler world or visual-quality reduction was introduced.

## Completed validation

- 24 WebKit checks passed across portrait/landscape, covering normal Atlas navigation/forms, native touch, loading isolation and page lifecycle.
- Compact preparation, full-resolution readiness and native move/look passed with the new frame scheduling.
- Cinematic → 3D → Illustrated → Cinematic passed with a peak of one live GPU device. The final success test additionally required over 20% of sampled world pixels to change after turning; it passed.
- An injected gameplay GPU fence stall stopped further frame/submission accumulation, surfaced a recoverable error and allowed Cinematic to start again.
- Shared-device acquisition, cancellation, cache reset and capability diagnostics passed, including late-acquisition cancellation.
- Other Graphics modes and unsupported-level fallback passed. The cancellation journal assertion was corrected for pagehide cleanup, with the interrupted operation retained; the rerun passed and normal production diagnostics remain hidden.
- The final targeted six-test suite passed. Syntax and diff checks passed. No remaining failure is present in the checks run for this change.

Changes are local; this pass did not commit or deploy them. Physical acceptance remains the user's M3 Safari sequence with actual visible movement, followed by working Cinematic recovery.
