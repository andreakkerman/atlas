# v153: release 3D on document exit

The physical report distinguishes closing a Private tab (subsequent attempts still fail) from terminating Safari (the next attempt loads successfully). The screenshot times out at batch 72/103, with 71 complete. Video frames at 1, 5 and 12 seconds show progress from 68/103 to a waiting 71/103, whose wait timer increases from 2 to 9 seconds. The observed debug flicker alone is not proof of a new initialization or device loss.

This suggests browser/session resource state may contribute, but does not prove retained resources or a specific WebKit GPU-process defect. Failed preparation already explicitly destroys Atlas's owned device. Atlas cannot reset Safari's GPU process or devices owned by other tabs.

Inspection found a separate lifecycle gap: visibility changes stopped the animation loop, but page exit had no explicit 3D device teardown. The app now calls `suspend()` on `pagehide`. Suspension aborts initialization, disposes scene/render resources, unconfigures the canvas and destroys the owned device. Runtime `sync()` stays blocked while suspended, so late UI updates cannot recreate a device. A cached document restored by `pageshow.persisted` explicitly resumes with a new readiness-gated initialization. Ordinary visibility-only tab switching keeps its existing behavior.

No render settings, warm-up batches, assets, visual quality, or input controls changed. The existing failure cleanup remains in place. Cache version is v153.

Validation covers cancellation of a late device, blocked restarts while suspended, cached-page restoration and normal navigation; the real WebGPU test navigates away from a fully ready world and then loads a new 3D session in the same browser context, checking that the previous device was destroyed.

This fixes an application cleanup omission. Physical repeated-tab reliability still needs verification; successful desktop navigation cannot certify Safari's process-level recovery.

QA completed: 24 WebKit checks passed across iPad portrait/landscape, including the new lifecycle case, normal navigation, forms, native touch and loading isolation. Two Chromium checks passed, including ready-world navigation away, explicit device destruction and a new successful compact 3D session in the same browser context. Syntax and diff checks passed. Changes are local and were not committed or deployed in this pass.
