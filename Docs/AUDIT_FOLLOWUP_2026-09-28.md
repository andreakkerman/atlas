## Executive summary

Audit-only follow-up on commit `2626f7fad41b277827345075add3e4b51da394dd` and the pre-existing working-tree changes, 28 September 2026. No remediation was implemented.

| Area | Status | Result |
| --- | --- | --- |
| Global Grading | **ISSUE VERIFIED** | Real grading works, but enabling it inherits redundant full-scene compositor work. No FPS collapse or toggle leak reproduced. |
| Area Directional Lights | **ISSUE VERIFIED** | Authored lighting contributes; it shares the same overhead. Combining it with grading does not double the pass count. |
| Scene Depth | **ISSUE VERIFIED** | Heavy path switch confirmed at DPR 1 and 2. It also changes legacy-effect appearance independently of the intended subtle depth tint. The reported 30-versus-60 FPS collapse was not reproduced here. |
| Flyby audio reliability | **ISSUE VERIFIED** | A transient preload failure can permanently silence that sound for the page session, including after re-entry. Healthy native playback and teardown passed the tested repetitions. |

**Verified severity: Medium 3; High/Critical 0.** These are shared compositor waste, compositor appearance discontinuity, and sticky Flyby sound failure. Browser/device coverage limitations are separate from defects.

## Graphics comparison

Production `LVL-0004` (Nautilushaven), stationary Sven at world X=263, unchanged camera, 1180×734 CSS viewport. Illustrated; Global Lighting, Character Shadows and Particle Fields ON; Challenge Effects at the production Canvas setting. Each variant uses the same authored scene: exposure −0.02, contrast 1.05 and warmth 0.05; enabled tropical sunlight intensity 0.62; depth perspective 0.035; 180 pollen particles. Features therefore contribute rather than being neutral switches. Animation continued during performance samples; a separate frozen-time comparison controls appearance.

Real Chromium WebGPU, sequential runs. Values below are steady-state counts per GPU frame. FPS and p95 RAF interval are **DPR 1 / DPR 2**. Draw counts include instanced draws as one call.

| Variant | Ownership/path | Passes / draws / Canvas uploads | Viewport HDR targets | FPS; p95 interval | Conclusion / hidden work |
| --- | --- | --- | --- | --- | --- |
| Baseline | DOM artwork/actors + shadow/particle overlays | 3 / 3 / 0 | 1 | 57.46 / 57.03; 18.3 / 18.3 ms | Existing Canvas producer remains visible; background receiver supports shadows. |
| Grading | Full-scene WebGPU | 6 / 11 / 4 | 2 | 57.16 / 57.11; 18.2 / 18.3 ms | Finish grading plus shared compositor overhead; hidden Canvas producer feeds GPU. |
| Area Lights | Full-scene WebGPU | 6 / 11 / 4 | 2 | 57.26 / 57.22; 18.1 / 18.1 ms | Field shader replaces the copy pass; same shared overhead. |
| Grading + Area Lights | Full-scene WebGPU | 6 / 11 / 4 | 2 | 56.92 / 56.96; 18.1 / 18.2 ms | Shared path; costs are not additive in pass/target count. |
| Scene Depth | Full-scene WebGPU | 6 / 11 / 4 | 2 | 57.48 / 57.15; 18.1 / 18.1 ms | Copy + full-resolution finish for a subtle distance-colour operation. |

The full recipe is: background/legacy background → copy or light field → **empty load pass** → actors/shadows/remaining legacy layers → particles → finish/presentation. All attachments have viewport device-pixel dimensions; shadows and particles do not shade every pixel merely because their attachments are full-resolution. No Illustrated bloom or auto-exposure passes were present.

HDR targets are `rgba16float`: 1180×734 at DPR 1, 2360×1468 at DPR 2. Two targets represent about **13.22 / 52.86 MiB** of texel storage, excluding presentation buffers, other textures and driver overhead. DPR 2 quadruples their pixels. The four legacy textures remain **2172×724 `rgba8unorm`** at either DPR: about **24 MiB of logical RGBA8 source data per frame**, not a measured bus-transfer rate.

Recurring CPU work includes settings-key serialization, geometry/style reads for sprites, uniform/bind updates, Canvas clear/draw work and external-source uploads. Renderer CPU encoding averages were 0.247–0.272 ms baseline versus 0.322–0.391 ms full-scene; these exclude much browser work and are **not GPU execution times**. GPU work adds scene reconstruction, field/copy, layer blending and finish processing. Active hidden Canvas producers are necessary inputs in this implementation, not duplicate visible layers. Empty slots and unchanged uploads are the waste described below.

**Transitions:** each feature went OFF→ON→OFF, followed by three additional cycles at each DPR. Every OFF sample returned to three passes, three draws, zero legacy uploads and one HDR target. Four legacy Canvas elements remained; no doubled GPU-frame cadence or monotonic resource accumulation was observed. Sprite-frame texture counts fluctuated with animation/cache warm-up, rather than growing per toggle. Menu exit left **zero tracked live GPU textures and buffers**, no scheduled renderer and no Canvas-producer RAF. Separate frozen-time OFF→Depth→OFF screenshots were pixel-identical at the two OFF endpoints. Normal-animation OFF captures also restored DOM ownership and Canvas opacity.

**Other browsers:** Windows Playwright WebKit exposed no WebGPU, so it exercised DOM fallback and transitions, not this compositor; its roughly 5 Hz RAF results are not a comparable feature-cost benchmark. Firefox was installed and launched, but reported `adapter-unavailable: WebGPU could not provide a compatible adapter`. The initial graphics runner timed out because its readiness predicate omitted that terminal status; a separate capability probe confirmed the cause. Neither result establishes physical Safari/iPad GPU performance.

## Verified findings

### 1. Full-scene Illustrated work includes empty passes and unconditional Canvas uploads

**Severity: Medium. Confidence: high; native counters and source agree.**

At either DPR, enabling any tested feature produced one zero-draw pass and four Canvas uploads per frame. `backgroundAtmosphere` and `worldAtmosphere` had no active effects and were confirmed transparent. Together they account for two unnecessary full-world uploads and draws. With the producer explicitly paused/cleared for diagnosis, uploads continued for every GPU frame: 70 frames at DPR 1 and 69 at DPR 2, with subsequent uploads reading unchanged canvases. Active `worldLight` and foreground effects legitimately continue generating inputs while their DOM canvases have opacity zero.

Root cause: [drawLegacy](D:/DevProjects/SvenAdventure/src/cinematic-renderer.js:538) treats every Illustrated slot as retained and calls `uploadDynamicCanvas` without content/revision gating. The pass at [line 559](D:/DevProjects/SvenAdventure/src/cinematic-renderer.js:559) opens for both modes but draws only in Cinematic. [Scene-effects draw](D:/DevProjects/SvenAdventure/src/scene-effects.js:2035) clears every slot, including empty ones. Impact is recurring avoidable CPU/upload/fill work, amplified by full-scene ownership; measured FPS remained near the local RAF ceiling.

**Smallest direction:** omit the empty Illustrated pass, skip genuinely empty slots while accounting for transients, and upload changed Canvas revisions only. Preserve active producers and authored effects. Verify native upload/pass counters, a transient entering/leaving an otherwise empty slot, DPR 1/2 image parity and repeated teardown. This requires no renderer rewrite.

### 2. Scene Depth's path switch changes existing effects beyond its depth tint

**Severity: Medium. Confidence: high for the reproduced discontinuity and path attribution.**

With identical frozen Canvas pixel hashes, enabling Depth visibly strengthens the authored sun-ray wedges. OFF→ON→OFF returns exactly to the original image. A second diagnostic retained the full-scene path but zeroed only the depth-perspective uniform: the large difference remained. Mean absolute RGB difference on the 0–255 scale was **11.07** for baseline→full-scene with depth tint zeroed, versus **0.16** when restoring the authored depth tint inside that same path. Thus the large visual change is not the intended distance-colour adjustment. This diagnostic was separate from all timing measurements.

Root cause boundary: [sync](D:/DevProjects/SvenAdventure/src/cinematic-renderer.js:605) selects full-scene ownership when effective grading is enabled, an enabled area-light item exists, **or effective depth is enabled and perspective > 0**. [forIllustrated](D:/DevProjects/SvenAdventure/src/cinematic-settings.js:141) gates perspective with Global Lighting and Scene Depth. DOM effect composition is replaced by the shared [linear-light sprite/alpha composite](D:/DevProjects/SvenAdventure/src/cinematic-shaders.js:399), using [HDR alpha blending](D:/DevProjects/SvenAdventure/src/cinematic-renderer.js:210). Transfer/blend parity of this handoff needs a focused regression; the neutral-depth experiment proves the handoff causes the difference, without claiming every differing pixel has one cause. Grading and Area Lights select the same importing path.

The actual [depth shader](D:/DevProjects/SvenAdventure/src/cinematic-shaders.js:467) performs `c * (1 + distance * 0.12) + tint * distance`, with five filtered depth taps; it does not displace geometry or create parallax. Its full-resolution finish is intentional in the current design. Two scene targets, reconstruction and copying are implementation consequences, not intrinsic requirements of this affine colour effect. The pre-shadow target is also sampled by shadows, so simply aliasing the two targets is unsafe.

**Smallest direction:** first remove finding 1's waste and establish Illustrated effect-composition parity at the ownership boundary. Then assess a narrowly scoped depth-only composition path, preserving the operation's linear-light multiplication/addition, layer ordering and treatment of actors/effects. A CSS tint or background-only adjustment is not proven equivalent. Do not lower DPR or weaken presets as a substitute. Verify neutral-path pixel parity, authored depth/lighting combinations, moving actors/effects, and the original failing desktop/device configuration before claiming the 30 FPS issue fixed.

### 3. A rejected Flyby sound preload remains sticky across re-entry

**Severity: Medium. Confidence: high; reproduced with native media in Chromium and WebKit.**

Use production `LVL-0016` Swift definitions; fail the first sound load with HTTP 503 before the 1.8-second fallback resolves, then restore successful responses. Images prepare and groups appear, but readiness stays `sound:false`; no native `play()` attempt occurs. Leaving and re-entering does not retry the asset. Chromium also reproduced this on the **first unmodified, naturally scheduled flight after network recovery**, with visible birds captured. WebKit received real 503 responses through a disposable loopback proxy because its native media requests bypassed Playwright routing. Its four initial media requests were all failed; neither subsequent groups nor re-entry added a request after recovery.

Root cause: [assetCache.sound](D:/DevProjects/SvenAdventure/src/ambient-system.js:163) caches a rejecting promise and never evicts it. [prepareOne](D:/DevProjects/SvenAdventure/src/ambient-system.js:610) marks visuals ready separately, while [playTriggerAudio](D:/DevProjects/SvenAdventure/src/ambient-system.js:714) skips unready sound. [releaseLevel](D:/DevProjects/SvenAdventure/src/ambient-system.js:1069) clears runtime readiness but retains the shared sound cache. Impact is loss of that optional ambient sound until a new page/cache owner, despite a recovered network; gameplay remains usable.

**Smallest direction:** evict rejected sound-cache entries and define a bounded retry/readiness policy for subsequent valid flights or preparation. Preserve group/path deduplication and cancellation ownership. Avoid allowing late readiness callbacks to start audio for finished flights. Verify real HTTP/decode failure→recovery both within a level and after re-entry, then cancellation while a retry/native play is pending. Native playback rejection already clears ownership; do not conflate that with the permanently rejected preload cache.

## Flyby audio conclusion

The owner chain is authored `level.ambientFlybys` → shared asset-cache promise → per-level `readiness`/preparation generation → group/independent timers and `pendingStarts` → `active` instances with a trigger ID → `activeAudio` media elements → RAF volume envelope → completion/`stopAll`/`releaseLevel`. Playback creates a fresh native Audio element; the preload element is not reused. During-flight sound is shared once per group/path, and an already-active path suppresses overlapping duplicate playback. “One attempt per visual instance” is therefore not the contract.

1. **Visible without intended sound? Yes.** The recovered-network failure above is the verified defect. A delayed-load diagnostic with compressed 300 ms idle gaps also skipped the first flight while sound was unready, with no mid-flight retry; the next flight recovered. Those compressed gaps are not the authored Swift timing. At natural timing with the network held, the 1.8-second timeout marked readiness true despite pending media, and a visible flight had a pending, silent native play. That pending-network case alone is not classified as a defect.
2. **Stale/orphan audio? Not reproduced.** Menu, restart, level transition, synthetic hidden state and delayed-start cancellation released active ownership. In the natural pending-play case, leaving before network release produced `pause`/`AbortError` at time zero, no later `playing`; re-entry successfully played after recovery. Late preload completion only changes readiness, not playback.
3. **Repeated flights reliable? Healthy assets: yes in the tested scope.** Each browser completed 18 successful native starts: two untouched natural Swift groups, twelve more with shortened idle gaps, re-entry/restart, and Wasp level-transition/visibility-resume starts. Four simultaneous Swift members intentionally shared one clip. No degradation appeared in these bounded sessions; this is not an hours-long soak or proof for every authored combination.
4. **Navigation/re-entry?** Healthy cached sound recovered normally. A rejected preload remained silent across re-entry. No stale-generation audio was observed.
5. **Mute/volume/readiness?** Master volume zeroed active playback and live unmute/volume changes restored its envelope. Readiness exposed the verified sticky failure and the timing behavior above. A short one-shot clip ending while a slow Wasp remains visible is intentional, not missing continuous audio. Autoplay/play rejection can drop that flight's attempt; the tested cleanup permits later attempts, not an automatic retry within the same flight.
6. **Browsers exercised?** Chromium and Windows Playwright WebKit native audio, including real HTTP faults, scheduling, playback events/current-time and teardown. Firefox was exercised only for graphics availability. Playback success is browser/media evidence, not a physical-speaker listening test.
7. **Physical iPad?** Safari user-activation policy, actual audible output, background/foreground OS suspension and interruption recovery remain unverified. Synthetic visibility and an iPad WebKit test profile cannot establish those properties.

## Test-quality observations

The main diagnostics entered through Start/menu, retained production reporting (`atlasSessionTest=1` prevents webdriver suppression), used real preparation/scheduling and delegated to native `HTMLMediaElement.play()`. Faults were injected at HTTP responses, not by replacing playback. Only idle gaps and one cancellation delay were compressed in labeled stress checks; authored paths, speeds, grouping and sound files were retained.

Existing VM tests that fail before lifecycle assertions remain unsuitable evidence. A disposable copy of `tests/flyby-audio.spec.js` repaired only the deferred Start/menu bootstrap, leaving assertions intact and excluding the Apply-writing test: **11 passed, 5 failed** across desktop Chromium and iPad-profile WebKit. Passing coverage includes actual scheduled During playback, short-clip gain, native decoding/non-silent PCM and Swift During playback. Its previews, `recordStart:false`, modified Wasp path/timing and injected autoplay denial have narrower scope than the main production-scheduler diagnostics.

A four-test diagnostic rerun kept the assertions and added hit logging: both Wasp tap cases passed; both Swift tap cases still failed with **`hitTest` returning null at the test's bounding-box centre**. They do not establish a lost playback attempt after a valid tap. The first Chromium Wasp/retry failures occurred before successful playback; their timing/input setup is not reliable evidence of an audio defect. WebKit reached the rejection/retry, mute and media-error assertions, then failed the expectation that settings replacement immediately cancels audio. The test mutates the live definition before passing it to `setLevelAmbientFlybys`; current `updateLevel` preserves compatible active instances. That assertion does not demonstrate orphan audio from navigation. These failures remain visible in the retained logs; no assertion was weakened and no permanent suite change was made.

Graphics samples are approximately 2.5 seconds each after settling, with shorter OFF/resource samples. They establish recurring work and bounded transition behavior, not GPU timestamp timings, sustained thermal performance or the reported failing machine. Browser-native counters, frozen appearance controls, source tracing and existing assertions answer different parts of the audit.

## Recommended next actions

1. Repair failed sound-cache recovery with a native failure→recovery regression that also checks cancellation.
2. Remove the verified empty pass/empty and unchanged Canvas uploads; preserve transients and active producers.
3. Add a neutral full-scene handoff pixel regression, then correct Illustrated effect-composition parity before choosing a depth-only optimization.
4. Re-measure on the originally failing desktop and physical iPad at matching DPR, authored effects and viewport. Keep the confirmed path cost separate from an unconfirmed 30 FPS root-cause claim.
5. Update stale Flyby bootstrap/lifecycle harnesses as a separate implementation task, retaining real scheduling/readiness and native media coverage.

## Evidence and cleanup

Raw graphics counters, pass recipes, resource snapshots, browser capability results, audio event/readiness logs, selected screenshots and test logs are intentionally retained in [followup-evidence-2026-09-28](D:/DevProjects/SvenAdventure/Docs/followup-evidence-2026-09-28). Disposable scripts, test copies and prototype instrumentation were removed. No permanent test changes were made. Cleanup verification records source/world-config/service-worker hashes and final Git checks; pre-existing edits and the earlier audit artifacts were preserved.
