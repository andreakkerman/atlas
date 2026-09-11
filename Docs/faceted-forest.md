# Real 3D faceted forest — local follow-up to v158

The user's new reference authorizes simpler, angular nature in the existing Real 3D world. This was initially a shared asset update. It is now exposed as Atlas 3D; see [world-mode separation](3d-world-modes.md). No commit or deployment is included.

## Assets

- Four shared mature conifer variants and three separately built juvenile variants replace needle-heavy crowns, infill layers and scanned firs. Thick tapered trunks, irregular closed crown cores and folded branch fans use opaque vertex colors.
- All 248 tree placements remain. Young trees have their own proportions and crown structure.
- Shared faceted grass, ferns, broadleaf plants, small trees and flowers retain the authored placements and footprints.
- Generic rocks, cliffs and paving retain their authored contours and ground contact with decimated broad facets and colored moss surfaces. Duplicate moss mantle geometry is removed.
- Carved runestones, temple, NPCs, route, challenges and progression remain. The original authoring checkpoint and source assets are preserved.

Run Blender against `Levels/LVL-0001/3d/lvl0001.blend` with `scripts/stylized-forest-lvl0001-blender.py`. It saves `lvl0001-stylized.blend` and exports `lvl0001.glb` through the existing Draco/GLB pipeline. The original checkpoint is the input; do not run the base constructor or use the already-converted checkpoint as input.

## Measured budgets

| Measure | Before nature replacement | Current |
| --- | ---: | ---: |
| GLB bytes | 91,231,328 | 26,869,972 |
| Instance-weighted Blender polygons | 49,020,935 | 2,345,171 |
| Scene objects | 18,008 | 17,114 |
| Tree placements | 248 | 248 |
| Tablet resized image pixels, approximate RGBA bytes | 271 MiB | 62.65 MiB |

GLB transfer size falls about 70.5%; instance-weighted polygon count falls about 95.2%. These are not total process/GPU-memory measurements. The final runtime capture reports 232,000,856 source-image bytes, 65,691,648 resized bytes and 227,544,408 released source bytes. Texture mip chains, buffers and render targets have additional costs.

Tablet retains v158's 0.75 DPR cap, one-sample rendering, 1024 shadows/textures, anisotropy 2, reduced HDR/PMREM and disabled GTAO/volume/bloom. Compact uploads and GPU work stay sequential with one frame in flight. Small groundcover receives but does not cast separate tablet shadows. Shadow normal bias follows texel footprint; Desktop High keeps its previous value and renderer settings.

## Visual and runtime evidence

Actual Chromium/WebGPU captures: `qa-screenshots/stylized-approved/{forest,trail,temple,gate}.jpg`, with `metrics.json`. Tablet Optimized was explicitly selected on the desktop test machine. Preparation completed in 54.1 seconds with no reported errors. This timing is not an iPad prediction.

The current image is deliberately coarser than the reference. Low-resolution edges, remaining detailed landmark materials and the absence of tablet volumetric shafts remain visible differences. No new volumetric effect was enabled to imitate the reference at the expense of the conservative loading budget.

Physical Safari acceptance remains outstanding. Local GPU validation cannot establish that the earlier iPad GPU loss is resolved or measure iPad peak process memory. Test loading, several minutes of simultaneous movement/look and interaction, then Illustrated → Cinematic → Real 3D again in the same session after an authorized deployment.

## Validation

Completed on 2026-09-11 against the existing local asset server:

- **17 real Chromium/WebGPU tests passed in 20.3 minutes**, strictly sequential: both Tablet Optimized acceptance sizes (1180×734 and 1180×689 at DPR 2), separate 1770×1101 preparation coverage, Desktop High, all preparation stages, three hidden views plus final frame, movement/look and sustained rendering, same-session re-entry, route challenges, other modes, and failure/cancellation/device-loss recovery. Both acceptance cases completed two entries without captured GPU/JavaScript errors. Output: `test-results/faceted-gpu-regression`.
- **56 WebKit tests passed in 3.2 minutes**, landscape and portrait: navigation, forms, native touch IDs, input/loading isolation, lifecycle, diagnostics and recovery. Output: `test-results/faceted-webkit`.
- **21 preset and texture-budget tests passed in 1.4 seconds**. Output: `test-results/faceted-unit`.
- JavaScript syntax checks and `git diff --check` passed. The old preparation-test requirement to release more than 800 MiB of images was replaced with a 500 MiB source-image ceiling, 1024-edge check and positive release check: retaining that floor would incorrectly reject a smaller world. GPU work, timeout values and failure checks were not weakened.

The local release gate is complete. Physical Safari acceptance is not complete.
