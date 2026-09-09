# v151: isolate preparation from Illustrated movement and scene redraws

## Physical evidence

The latest iPad screenshots show 103/103 compilation batches completed, warm-up view 1 completed, then view 2 waiting for GPU completion until the existing 90-second watchdog fires. The user also observed a brief Illustrated flash and found Sven near Freya after recovery. This is still a failed physical startup; v150 did not resolve it.

## Reproduced application defects and corrections

The loader lives inside the legacy 2D click-to-walk stage. Its background/heading clicks fell through to `beginFreeWalk()`. An existing walk also continued after selecting 3D. Both cases reproduced in WebKit before this change: the new isolation tests failed because `state.movement` remained active. A long frame can advance that walk substantially and its arrival callback can rebuild the scene.

- Loader clicks no longer enter the world-click handler; its recovery button is handled first.
- Selecting 3D cancels a pending legacy walk. The animation callback also refuses legacy movement before 3D readiness. Ready-state contextual interactions retain their existing approach movement.
- Free ground walking cannot start behind the 3D surface.
- Redundant renders of the same preparing scene update the existing DOM/runtime instead of removing and reinserting the GPU canvas. MutationObserver assertions check actual ancestor removal, not merely final canvas identity. Menu, level changes, Graphics panel changes and recovery still render normally.
- The actual 3D stage hides its underlying Illustrated world throughout preparation and failure, rather than only after readiness. Illustrated recovery restores it. This is independent of the five-stage loading cover.

No world assets, GPU rendering strategy, warm-up views, resource sizes, touch controller, shader code, or visual quality settings changed. The cache version is v151.

## Validation and limits

WebKit portrait/landscape: 22 checks passed, including loader-tap isolation with and without a pre-existing walk, no canvas detachment during redundant preparation renders, position preservation on Illustrated recovery, Menu/Terug/level start, forms, Graphics, cancellation and native touch identifiers.

Chromium real WebGPU: the initial 11-check preparation/recovery run passed, including compact preparation at final resolution, native move/look, GPU failure/cancellation/timeout cleanup and subsequent Cinematic startup. Compact preparation took 61.9 seconds on the desktop GPU, released 978,586,968 decoded image bytes and finished at 1280×795. These are not iPad measurements.

The final gameplay/recovery run passed 15 checks, including loader taps and canvas ancestor preservation at an injected view-2 GPU stall, desktop progression through three challenges and the gate, all Graphics modes, cancellation, and simultaneous touch movement/look/interaction. Its last check expected Illustrated artwork to be visible underneath the 3D failure cover. That obsolete assertion was updated to require the cover and hidden artwork, then actual recovery to visible Illustrated; the focused rerun passed. No runtime code changed after that run. Together with the initial preparation/isolation checks, all 20 distinct Chromium checks passed. Syntax and diff checks passed.

Changes are local; this pass did not commit or deploy them.

The repeated-render and movement bugs are reproduced and corrected. The screenshots alone do not prove that either caused Safari's GPU queue stall. Desktop WebGPU and injected stalled fences cannot certify physical iPad GPU recovery or successful physical startup. No claim of physical resolution is made here.
