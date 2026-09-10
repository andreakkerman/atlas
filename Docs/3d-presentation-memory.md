# v156: physical-resolution presentation pressure

The physical v155 retest failed twice at 4/5 stages: the first full-resolution frame (1770x1101) lost its device with reason destroyed. All three 512-pixel warm-up views had completed. The previous 1280x795 QA buffer did not reproduce the physical pixel workload. The old path also passed a new 1770x1101 Chromium test, so this workstation cannot reproduce the Safari loss.

## Bounded change

On compact devices the world and volume PassNodes explicitly retain four samples. The final PostProcessing fullscreen copy uses one sample and no default depth attachment. Its input has already been antialiased by the world pass; there are no new geometric edges in that final fullscreen copy. Scene assets, resolution, shadows, AO, bloom, volumetric settings, depth samples, texture quality and warm-up view count remain unchanged. Desktop renderer defaults remain unchanged.

Three r180 allocates a default colour buffer even with single-sample output. Reducing that buffer from four samples to one, and dropping its unnecessary four-sample depth buffer, removes approximately 52 MiB of descriptor-sized allocations at 1770x1101 (assuming four-byte colour/depth texels). This is an allocation estimate, not a physical Safari GPU-process memory measurement; Metal padding and driver allocations are not observable here.

The world depth texture is associated with its producing render target so WGSL sample declarations follow that target's four samples rather than the active fullscreen output. Bounded world compilation likewise uses the explicit world-pass samples.

## Destruction evidence

With debug3d=1 the owned device's destroy method records its call stack, operation and whether its generation is still active. A loss message says whether JavaScript had called destroy BEFORE the loss; ordinary cleanup afterward cannot change that captured message. Production without debug adds no wrapper. Tests cover both a direct JavaScript destroy and a lost promise resolving without such a call.

Atlas's own disposal invalidates the generation before destroying its owned device. Three r180 has no GPUDevice.destroy call in its vendored backend; its buffer/texture destruction is separate. No source-level proof that Atlas destroys the active device during the final frame was found.

## Limits

This is a resource-pressure mitigation plus a diagnostic distinction, not a demonstrated fix for Safari's device loss. Relevant WebKit GPU-process memory failures exist (https://bugs.webkit.org/show_bug.cgi?id=303203), but their existence does not identify this failure or establish what fixes are present in the user's iPadOS build. Do not infer that an M3 iPad cannot render the world or claim physical stability based on Chromium.

Cache version v156; changes local, not committed/deployed by this pass.

## Completion — 2026-09-10

The interruption left the five-test real-GPU regression run and final reporting unfinished; no renderer implementation was half-written. That run completed successfully: exact-resolution stalled-frame, validation-error and lost-device recovery; compact preparation/full-resolution readiness with simultaneous touch; desktop Graphics round-trip and unsupported-level fallback.

The change's 40 checks passed: 30 WebKit navigation/input/loader/device-broker checks, four destruction-evidence checks, one exact-resolution sustained-gameplay/native-validation check, and the five GPU regression checks. A final eight-case cleanup run also passed on 2026-09-10, including throwing disposal and late-device cancellation. JavaScript syntax and git diff checks passed. No further renderer changes were made when resuming; only verification and documentation were finished.

The bounded implementation task is complete locally. Physical iPad acceptance is still outstanding; the Safari device-loss cause remains unproven. No deployment or commit was performed. Current implementation specification: Docs/renderer-current-spec.md.
