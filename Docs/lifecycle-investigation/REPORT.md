# Atlas session-history investigation — 2026-09-29

**No accumulating level-transition slowdown was reproduced in the controlled matrix. Native background/PWA resume remains inconclusive. No production fix was made.** The measured ownership differences are principally shared caches, not additional compositor work. One small, independently proven exception is recurring locomotion blink work after returning to the menu; it does not explain the reported 20–35 FPS collapse.

The full stationary/walking timeline is in [TIMELINE.md](TIMELINE.md), numeric counters in [measurements.csv](measurements.csv), and teardown/initialization boundaries in [transitions.csv](transitions.csv). [README.md](README.md) provides the reproduction commands and real-device procedure. Raw JSON captures are gzip-compressed losslessly; `summarize.cjs` reads either format.

## Sequences and method

Each matrix sequence started a new Chromium 148.0.7778.96 process/context. Adapter: NVIDIA / Blackwell. Viewport 1180×734, DPR 2. Each entry had preparation, 1200 ms stabilization, 4 seconds stationary, then the same rightward free-walk route with 700 ms lead-in and 4 seconds measured walking. These are native RAF intervals, not physically presented or GPU-completed FPS. Scene timing, blinks and Flybys remained production-driven; the samples are not frozen-time captures.

| Sequence | Exact level order |
|---|---|
| A, repeated in a second fresh process | ARC Atlas `LVL-0032` → Runenpoort `LVL-0001` |
| B | Runenpoort → ARC Atlas → Runenpoort → ARC Atlas → Runenpoort |
| C | `LVL-0004` → RivenTides `LVL-0034` → StellaMontis `LVL-0035` → `LVL-0004` → Runenpoort |
| D | Same five entries as C, through the main menu between each |
| E | `LVL-0004` with grading/area-light/depth toggles OFF → Runenpoort with all requested toggles ON |

All other entries asserted Global Lighting, Global Grading, Area Directional Lights, Scene Depth, Character Shadows and Particle Fields ON, with challenge effects Canvas 2D. The runner uses the existing selection, graphics and movement handlers. Editor drafts were excluded and service workers blocked in the normal automated matrix. It did not modify authored effects or progression.

**Same toggles do not mean the same effective rendering work.** ARC Atlas, RivenTides and StellaMontis have neutral authored grading, no contributing area-light items and zero perspective, so they still use the lightweight shadow/particle path (3 passes). Runenpoort and `LVL-0004` select full-scene ownership (5 passes). Their authored effects were preserved. This explains why comparing ARC against Runenpoort alone is not a controlled test of history; it does not prove the cause of the manual FPS report.

The scenes include strong atmospheric effects, NPCs, shadows and particle populations ranging from 180 to 8,937. This was not exclusively a light-scene matrix.

## Performance and resource results

Across 44 matrix measurement windows, FPS was **56.848–57.286**. There was no progressive deterioration across repeats or revisits. Representative Runenpoort walking comparisons:

| History | FPS | Median ms | p95 ms | p99 ms | Textures / buffers | Cached depth maps |
|---|---:|---:|---:|---:|---|---:|
| Fresh | 57.172 | 17.5 | 18.1 | 18.5 | 63 / 13 | 1 |
| After ARC | 57.160 | 17.5 | 18.1 | 18.5 | 65 / 13 | 2 |
| After ARC, independent repeat | 57.210 | 17.5 | 18.1 | 18.5 | 65 / 13 | 2 |
| Second Runenpoort visit in B | 57.177 | 17.5 | 18.1 | 18.5 | 59 / 13 | 2 |
| Third Runenpoort visit in B | 57.186 | 17.5 | 18.1 | 18.4 | 64 / 13 | 2 |
| After three other worlds, direct transitions | 57.071 | 17.5 | 18.1 | 18.6 | 66 / 13 | 4 |
| After the same worlds through menu | 57.038 | 17.5 | 18.1 | 18.5 | 55 / 13 | 1 |
| After lightweight `LVL-0004` | 57.090 | 17.5 | 18.3 | 18.6 | 64 / 13 | 2 |

Runenpoort consistently had one active compositor, one compositor RAF, one scene-effects RAF, two HDR targets, 5 passes, about 8.93–8.97 draws, one queue submission and two legacy Canvas uploads per measured frame. Production NPC/animal draws account for the difference from the isolated 8-draw regression fixture. Walking also has the existing locomotion, movement and NPC callbacks; an active Flyby can add its own callback. No duplicated same-owner RAF chain was observed.

The eight application runtime/controller objects stayed stable: readiness, ambient, scene effects, Voxel, challenge effects, emissive glow, Cinematic/Illustrated, and Three. This is not eight active renderers. Three stayed idle; the Voxel controller reports the selected Illustrated mode. One observed MutationObserver remained at steady state. Runenpoort's DOM count stayed 160 in the matrix; a fresh-document UI difference produced 161 in some headed runs, without accumulation across revisits.

Full-scene Runenpoort renderer callback CPU averaged 0.58–0.83 ms/frame in the matrix, effects callbacks about 1.12–1.21 ms/frame. The walking samples imported 97–106 filtered actor/NPC Canvases over approximately four seconds. The instrument counts native detached-Canvas uploads; these match the filtered sprite import path in these captures (no import fallbacks reported). It also records all detached draw calls separately; those include other Canvas work and must not be called sprite rasterizations. Position/source classification samples Sven at RAF boundaries, so it is correlation data, not proof that a same-frame NPC upload was caused by Sven's position. The dedicated sprite regression supplies that invariant.

Logical uploaded volume was approximately 2,868–2,908 MiB per four-second Runenpoort walking window, dominated by two full-scene legacy Canvases. This is submitted pixel volume, not measured bus bandwidth. Texture creations during walking mostly warm source-image caches; they are not all filtered sprite reallocations. Per-frame creation/destruction/upload counts and all resource purpose/path labels are retained in the raw data. There was no history-dependent increase in the Canvas upload rate or passes.

Only two matrix intervals exceeded 25 ms: 34.5 and 34.9 ms in RivenTides, once after direct transition and once after menu return. Both coincided with a Flyby callback taking approximately 19.3 and 35.3 ms respectively; neither frame had a texture upload or texture creation. This supports an isolated Flyby-associated CPU stall, not a surviving old-level owner or accumulating renderer. No speculative Flyby change was made.

## Ownership boundaries and cache classification

Direct level changes and menu returns are different boundaries. `selectLevel()` disposes/reprepares effects, challenges and Flybys, switches asset plans and reuses the application controllers. The compositor retains old resources during preparation until its internal `releaseLevel()` handoff, then releases old artwork, sprite/effect textures, targets and draw buffers. Release snapshots isolate the retained depth maps and small reusable resources before new scene creation. This temporary overlap is not an extra steady-state compositor.

| Retained state | Evidence and classification |
|---|---|
| Per-device depth cache | Direct C sequence: 1 → 2 → 3 → 3 → 4 distinct depth maps. Revisit reuses the entry. Menu sequence D resets to 1 for each entered level. Intentional path-keyed sharing; no fixed global entry cap was proven. A much longer many-level session can retain more memory until disposal. |
| GPU sprite source cache | Counts vary with animation frames sampled, not visit number. Current `sprites()` prunes unused entries when `uploaded.size > 96`, preserving current fallbacks. Warm samples rose and later fell (e.g. 93 → 73 live total textures); no monotonic owner growth. Reusable cache with a soft pruning threshold, not a claim of a strict 96-texture total bound. |
| Decoded playable animation images | 143 Sven images / 124.4 MiB logical RGBA; after the other playable set, 267 images / 232.3 MiB. Plateaued across further visits; survives menu, resets with a new document. Intentional character/source cache, not actual measured heap/VRAM bytes. |
| Shared successful sound cache | Grows with distinct encountered sounds (up to 5 here), survives menu; no additional playing owner. Intentional cache. |
| Level plan images, targets, effect textures, Flyby ownership | Released at the appropriate boundary. Every completed matrix final menu had zero tracked GPU textures/buffers, zero active effects/Flybys/Flyby audio/timers, no active asset plan and no observed pending owner promises. Menu music remained intentionally playing. |
| Healthy device and runtime objects | Reused application owners/broker, with no active menu compositor scheduler. Intentional reusable ownership. |
| Menu locomotion blink work | Proven residual work, described below; bounded single-owner callbacks rather than a resource leak. |
| Listener/observer/GC retention | Uncertain beyond observed counts. Listener instrumentation records add/remove calls, not exact live listeners. Weak references and DOM counts do not establish full heap reachability. |

`returnToMenu()` disposes the level renderer/effects and releases the active plan. It does **not** fully quiet the shared locomotion controller: `scheduleBlink()` in `src/locomotion.js` checks idle state/direction but not the menu screen; the timer transitions to `idleBlink` and `ensureRunning()` schedules animation ticks. In an eight-second quiet-menu window: **4 blink timer callbacks, 103 locomotion RAF callbacks, about 4.4 ms total callback CPU; zero GPU creation, uploads, draws or submissions**. Snapshots can therefore show either one blink timer or one transient locomotion RAF after menu stabilization. This is a specific lifecycle cleanup opportunity, not evidence of the FPS collapse.

## Reload, reopening and background/resume

Headed Chrome 154.0.8037.58 on the same adapter tested fresh Runenpoort, 3-second and 30-second background/freeze attempts, menu → RivenTides → menu → Runenpoort, reload, and close/reopen of the Atlas tab in the same browser/context. The normal launch workflow was repeated in fresh processes. Representative headed results:

| Case | Walking FPS | Median / p95 / p99 ms |
|---|---:|---|
| Fresh document/process | 57.139 | 17.5 / 18.2 / 18.6 |
| After 3-second CDP lifecycle request | 57.023 | 17.5 / 18.2 / 18.5 |
| After 30-second CDP lifecycle request | 57.046 | 17.5 / 18.1 / 18.6 |
| Through menu and another world | 57.129 | 17.5 / 18.1 / 18.3 |
| Reload in same browser | 57.032 | 17.5 / 18.2 / 18.6 |
| Reopened tab in same browser | 57.096 | 17.5 / 18.2 / 18.3 |

**Those two CDP rows are not validated native suspension.** Another tab and window minimization still reported `visibilityState: visible`. CDP frozen/active requests changed scheduling but yielded no recorded trusted visibility/freeze/resume events in the normal automation runs. Playwright's default focus emulation is a known confounder; disabling it from a second CDP session did not establish native visibility either. `pageshow` was recorded for new documents with `persisted:false`; BFCache restoration and outgoing `pagehide` completion were not captured conclusively.

An additional independently launched Chromium process with `connectOverCDP({noDefaults:true})` began at **9.94 FPS before any transition**, still reported visible during the attempted background, and failed the readiness wait after the first freeze/restore attempt. Its partial data and error are preserved under `native-browser`; it is excluded from the matrix parity conclusion. The browser configuration and starting cadence differed, and sufficient failure-boundary telemetry was not recovered to attribute the stall to Atlas or the automation environment. The isolated browser was closed; no user browser process was terminated.

Across successful automated warm/reload/reopen samples: no duplicated compositor/effects RAF, extra targets/submissions, stale playing level audio, or outstanding observed owner promises at steady state. First-resume traces in later attempts record scheduler gaps and callback counts, but cannot establish real PWA timestamp handling because native suspension was not validated. No claim is made that timers, device invalidation or pending initialization are safe under real iOS suspension.

## Explicit answers and recommended next step

- **Do level transitions degrade performance or accumulate cost?** Not in the controlled matrix. Shared decoded images/depth maps accumulate by distinct asset, while per-frame rendering work and revisits remain equivalent within the observed variation.
- **Does menu return reset it?** Menu resets GPU/depth ownership, but there was no reproduced slowdown to reset. It retains shared decoded/audio caches and the small blink loop.
- **Does reload or process restart reset it?** New documents reset the observed document caches. No performance recovery claim is possible because the normal launch runs were already healthy. Independent fresh processes repeat the healthy matrix; the different native launch probe is explicitly inconclusive.
- **Is revisiting slower?** No in the tested sequences, including repeated ARC/Runenpoort visits.
- **Does background/foreground change ownership or duplicate producers?** Not demonstrated by the successful automation probes; true native lifecycle behavior remains unverified. Do not substitute their steady-state parity for that missing evidence.
- **Does resume cause stale async/GPU/compositor work or cost more than cold?** No such extra steady-state work appeared in successful probes, but native resume and pending-initialization suspension were not conclusively exercised. The native-launch readiness failure remains unattributed.
- **Root cause of the manual 20–35 FPS report?** Not proven. Different effective render recipes, retained cache memory and isolated Flyby CPU stalls are observations, not sufficient causal attribution.
- **Supported remediation direction:** no renderer/cache optimization on this evidence. If separately authorized, quiesce the existing locomotion controller's blink scheduling on menu exit and resume through its existing lifecycle; preserve animation behavior. First capture the affected desktop and physical PWA using [the supplied procedure](README.md), including native visibility, effective recipe, memory history and first-resume frames.

## Limits, validation and changes

The only additions for this task are this directory's opt-in diagnostics, runner, summarizer, reports, logs and compressed evidence. No production, authored-level, service-worker, graphics-default, shader, progression, recovery or canonical-contract changes were made. Prior working-tree edits were preserved.

Native allocation accounting excludes swapchain/internal browser GPU resources and cannot measure physical VRAM, driver residency or GPU completion. CPU callbacks include instrumentation overhead. Observed promise ownership is not a count of every JavaScript promise. Listener add/remove calls and observer registration flags are imperfect liveness measures; weak-reference survival does not prove a leak. Late real-device injection misses earlier creations. Normal tests block service workers and exclude saved drafts, so installed-PWA cache state is not represented. Physical iPad memory pressure, GPU loss, OS termination, longer many-level sessions and the affected machine's exact browser/display/power configuration remain unverified.

Focused validation: Chromium **13 passed**, covering compositor upload/pass reductions, DPR 1/2 neutral parity, sprite translation/animation reuse, graphics-session lifecycle and Cinematic/Illustrated route overlays. The first WebKit invocation had **7 passed, 5 skipped, 1 failed**: the command incorrectly enabled `ATLAS_WEBGPU_QA=1`, making the Cinematic route test require native GPU readiness instead of its intended WebKit layout mode. The corrected layout-only rerun **passed both route checks** (`regression-webkit-layout.log`); no test/assertion was edited. Thus all eight distinct WebKit-supported checks passed, while the five native-WebGPU cases remain outside WebKit coverage. Syntax checks for the three diagnostic scripts and `git diff --check` passed. No production GPU resource policy changed, so the unrelated Three tablet acceptance batch was not run.
