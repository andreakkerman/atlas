# v152: bounded preparation of actual shadow pipelines

The physical iPad retest reached warm-up 3/3 and timed out after 90 seconds, with warm-up 2/3 recorded as complete. It did not establish which GPU operation failed. The previous UI/movement fixes remain intact.

## Measured defect

The compact path's `worldPass.compileAsync()` batches did not exercise the actual shadow render path. Real WebGPU tracing counted late `ShadowMaterial` pipeline creation of **796, 702, and 73** in warm-up views 1, 2, and 3. The displayed completion of all 103 compilation batches therefore did not mean shadows were prepared. Merely setting `sun.shadow.needsUpdate` before compilation did not change these counts; that approach was discarded.

## Correction

Compact preparation now processes the same 16-object batches through the existing world's `PassNode.updateBefore()` render path, requests the real static shadow refresh, and waits for GPU completion before starting the next batch. It uses the same render target, sample count, materials, lights, shadow map and object culling restoration. This replaces the previous compile-only call; it does not add camera views or change gameplay rendering. Each batch GPU boundary now has the same timeout/cancellation recovery guard as the later warm-up views.

All three original compact warm-up views and the full-resolution first playable frame remain required. Texture upload/pixel release, native touch input, UI isolation and explicit device cleanup remain unchanged. Desktop preparation retains its existing compile path and 18 views. No assets, shader sources, vendor dependency or quality settings changed.

## Measured result

The corrected run created **zero shadow pipelines in all three warm-up views**. View 3 created **zero new pipelines of any kind**. View 2 created only the existing GTAO/blur variants (two pipelines). Total pipelines after views 1/2/3 were 3300/3302/3302, compared with 2472/3176/3249 before the change; the bounded pass now also covers previously unvisited shadow casters. Desktop-GPU compact preparation completed in 63.9 seconds, with full-resolution readiness and native touch movement/look passing. This is not an iPad timing claim.

The regression now requires shadow pipelines to appear only in compile batches of at most 16 and forbids any new pipeline in the third view. The validation run measured 1,640 shadow pipelines across 103 batches, with a maximum of 16 per batch. First movement created no additional pipeline. Recovery coverage includes an injected batch GPU stall as well as later warm-up failures and cancellation.

Physical iPad success remains to be confirmed. The measured late shadow compilation burst is corrected; desktop testing cannot prove WebKit's exact internal timeout cause or certify the physical device.

## Completed QA

- 22 WebKit checks passed across portrait and landscape: normal Atlas navigation, forms, Graphics, native touch identifiers, loading isolation, recovery and preserved player position.
- Nine Chromium preparation/cleanup checks passed: bounded shadow counts, full-resolution readiness, native movement/look, production diagnostics hidden, injected failures/cancellation/stalls and Cinematic recovery.
- Three final Chromium checks passed: batch-stall recovery, desktop route/challenge/gate progression, and round-trip switching between 3D, Illustrated, Voxel and Cinematic with unsupported-level fallback.
- Syntax and diff checks passed. The compact runtime screenshot was inspected at readiness.

Changes are local, with cache version v152. This pass did not commit or deploy them.
