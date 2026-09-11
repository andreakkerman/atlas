# Graphics world separation — local v159

## Product contract

Graphics groups are exactly **Renderer: Illustrated, Cinematic** and **Experimental: Voxel, Real 3D, Atlas 3D**. Cinematic keeps its existing `cinematic` identifier and implementation. No preset selector is added to this menu.

`src/graphics-modes.js` centralizes mode IDs, labels, categories, availability, normalized selection, runtime assets and rendering configuration. Real 3D retains `3d` for persistence compatibility. Atlas 3D uses `atlas-3d`.

The existing session device classifier owns device identity. Real 3D is enabled only for desktop/laptop, and is visible but disabled with “Desktop only” for tablets/phones. Both the shared settings normalizer and runtime reject unsupported direct/programmatic selections. A saved Real 3D selection on tablet becomes Illustrated before a heavy asset request. Saved Atlas 3D restores everywhere. Query-string renderer overrides cannot bypass availability or change Atlas quality. Unsupported levels retain the existing Illustrated rendering fallback.

## Verified authoring and runtime mapping

| Mode | Preserved source under Levels/LVL-0001/3d | Runtime asset | Bytes |
| --- | --- | --- | ---: |
| Real 3D | lvl0001.blend | real-3d.glb | 91,231,328 |
| Atlas 3D | lvl0001-stylized.blend | atlas-3d.glb | 26,869,972 |

Blender MCP inspected both libraries without modifying the open scene. The heavy library contains 320 detailed conifer objects and no faceted mature firs. The faceted library contains 175 faceted mature firs plus separate juvenile meshes. Retained source-library objects are not all exported; active-world budgets from the authoring pass are 18,008 objects / 49,020,935 instance-weighted polygons versus 17,114 / 2,345,171, with 248 tree placements retained.

Real 3D is restored byte-for-byte from the verified pre-faceting Git export at `362fd8a`. Atlas 3D is moved without regeneration from the validated current export. SHA-256:

- Real: `57a2e0589df616d2d91a2d40e93169bd5ffea4d5281d06414c6e3096c2d8a086`
- Atlas: `06210bcfd18c6cab583a7d0f4052fd91ff8021230faf0f60d8d6ab569d6f8129`

The obsolete ambiguous `lvl0001.glb` delivery path is removed. The two new paths cannot overwrite each other during the supported export workflow. Source checkpoints are unchanged.

## Export workflow

Use installed Blender background automation:

```text
blender --background --python scripts/export-lvl0001-blender.py -- real-3d
blender --background --python scripts/export-lvl0001-blender.py -- atlas-3d
```

The script opens the mapped preserved checkpoint itself, verifies faceted/non-faceted scene identity, and writes only its mapped GLB. It does not save over either Blender source. Draco settings and embedded WebP delivery are unchanged. The established `stylized-forest-lvl0001-blender.py` is an explicit conversion step from the original heavy checkpoint; it rejects an already-faceted input and writes only the Atlas checkpoint and Atlas runtime output. Do not rerun historical base constructors as an export command. Older authoring scripts are historical passes, not supported rebuild entry points.

## Canonical Atlas rendering

Desktop Atlas 3D is the authoritative development/QA preview for iPad Atlas 3D: **what is approved on PC uses the same content and visual configuration on iPad**. There is no desktop uplift and no Tablet Optimized/Desktop High choice within Atlas 3D. Its internal immutable configuration is `atlas-canonical`, displayed as Atlas 3D in diagnostics.

| Parameter | Atlas 3D, every device | Real 3D, desktop |
| --- | --- | --- |
| World/effect/presentation MSAA | 1 / 1 / 1 | 4 / 4 / 4 |
| DPR cap | 0.75 | 1.5 |
| Shadow resolution | 1024² | 4096² |
| Normal bias | 0.1 | 0.025 |
| Texture long edge | 1024, aspect preserved, never upscale | Original |
| Anisotropy | 2 | 8 |
| HDR / PMREM | 512×256 / 384×512 | 2048×1024 / 1536×2048 |
| GTAO / volume / bloom | Off / off / off | On / quarter-resolution 80 steps / on |
| Preparation | Both: batched uploads/compile, 3 small views + final; desktop: concurrent decode and async gameplay | Existing Desktop High, 18 views + final |

Both retain the existing width safety limit of 1920 pixels; actual drawing-buffer dimensions depend on viewport and devicePixelRatio. Atlas uses the same material path and small-groundcover shadow-caster exclusions everywhere. Platform-specific touch/lifecycle behavior remains, without quality divergence. Canonical-configuration equality tests cover desktop, desktop-style iPad Safari and Android tablet, even with a Desktop High query override.

## Ownership and caching

One Three runtime owns one active world and GPU device. World changes dispose the old scene, textures, post-processing and device, invalidate generation callbacks, and change configuration before loading. The canvas-retention and loader-isolation rules now include world identity. A cancelled in-progress GLTF decode is joined before another world's device/decode starts, so old decode resources cannot overlap the next world. Existing failure, device-loss, navigation and page lifecycle cleanup remain.

Service worker v159 includes the new metadata script. World GLBs remain fetched/cached on demand through the existing request cache; neither is preloaded in CORE_ASSETS. Selecting Atlas never requests the heavy world.

## Validation and limits

Completed locally on 2026-09-11:

- **19 distinct real-WebGPU scenarios passed.** The initial four tablet/preparation tests passed in 6.3 minutes. The main world-switch/pressure/gameplay run passed 12 of 14 in 15.0 minutes; two obsolete test assumptions were corrected as described below. The final seven-test run passed in 9.5 minutes: both corrected cases, cancelled-decode isolation, separate 1770×1101 preparation, debug isolation, and both complete tablet acceptance cases (1180×734 and 1180×689, DPR 2, three hidden views plus final frame, two entries each, movement/look, sustained rendering and Cinematic recovery). GPU suites ran sequentially with one worker and real GPU work enabled.
- **72 distinct WebKit scenarios passed after fixture corrections**, including navigation, native touch, forms, lifecycle, device-loss diagnostics, mode guards and persistence in landscape/portrait. Initial run: 64 passed / 8 failed; corrected mode/diagnostic rerun: 32 passed in 25.2 seconds. Final strengthened mode/runtime guards: 24 passed across Chromium and both WebKit projects in 20.8 seconds.
- Settings/regression selection: **32 passed**, with one unrelated existing GPU-particle test selected by the broad name filter and skipped by its pre-existing opt-in guard. This was not part of the renderer acceptance gate. Voxel/Cinematic persistence, preset and texture-budget tests passed. Final visual menu checks: **6 passed** in 18.8 seconds. Final hash/configuration/cache parity checks: **2 passed**.
- JavaScript/Python syntax and `git diff --check` passed. No timeout was extended and no world quality was changed to obtain a pass.

Test adaptations: iPad diagnostic tests now select the supported Atlas mode, and simulated desktop identity overrides the iPad user-agent as well as platform/touch fields. Canonical Atlas has no late view-2 effect shader, so shader-failure injection now occurs at its first actual warm-up shader creation; this is an error-recovery test, not a reproduction of the old Safari root cause. The former iPad/Desktop High frame-stall combination is no longer a supported product mode. Its replacement tests Real 3D's actual preparation fence and cancellation; Atlas retains the full compact in-flight frame-stall test. Real 3D's render loop was not changed to satisfy a tablet-only expectation.

Evidence folders under `test-results/`: `world-modes-tablet`, `world-modes-gpu`, `world-modes-final-gpu`, `world-modes-webkit`, `world-modes-webkit-final`, `world-modes-guards-final`, `world-modes-settings`, `world-modes-menu`, `world-modes-parity-final`. The GPU world-switch test captures both distinct worlds; menu screenshots were inspected for desktop/tablet structure and disabled state.

The user reported that the unchanged faceted/conservative baseline was stable for multiple minutes and lock/unlock on physical iPad. This separation does not redesign it, but local Chromium/WebKit QA cannot independently certify physical Safari behavior. Authoring libraries were verified with Blender MCP; exact known-good runtime binaries were preserved/restored rather than regenerated. Export mapping/source guards and script syntax were checked; no new Blender re-export was needed. No commit or deployment is included.
