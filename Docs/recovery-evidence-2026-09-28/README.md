# Transient asset/audio recovery hardening

Production scope is six added lines in `src/ambient-system.js`: images and sounds evict their own rejected promise only if it is still the current entry. Pending and successful promises remain shared. Image HTTP retries remain three attempts with 250/750 ms delays; sound has no new retry timer. A later preparation/load request is the recovery boundary. There is no global flush, playback change, or required/optional reclassification.

The existing level-generation checks, readiness ownership, and menu/release/stop cleanup remain responsible for activation. A sound preload completion only updates readiness; it does not start playback. Native `play()` rejection remains separate from preload rejection, and each playback still owns a fresh Audio element. The existing 1.8-second sound fallback (including a network request still pending at that point) is unchanged.

## Permanent regression coverage

- `tests/asset-recovery.spec.js`: optional-image HTTP exhaustion and successful entry, later re-entry/image visibility within the viewport, concurrent recovery consumers, successful image reuse; real sound HTTP failure followed by later preparation and re-entry/native scheduled playback; shared recovered sound/group playback and independent playback rejection; mute/volume; pending recovery followed by menu, transition, restart, cancellation; superseded optional-image preparation; no late audio when recovery finishes after a flight has ended.
- `tests/asset-recovery-server.js`: test-only loopback proxy to the existing local asset server. Native WebKit media bypasses Playwright routing, so a real HTTP proxy is necessary to test its failure path. Media load/play operations delegate to the browser.
- Existing `tests/flyby-audio.spec.js` and `tests/ambient-flybys.spec.js` now wait for the deferred Start/menu bootstrap before accessing app globals. The ambient suite also accepts `ATLAS_EDITOR_URL`. The native metadata check additionally waits for nonzero native duration before its snapshot. Existing behavioral assertions and timeouts are unchanged.
- `tests/flyby-lifecycle.spec.js` adds the missing `querySelector` method to its simulated DOM shell, allowing the existing lifecycle assertions to execute. Its loader stub bypasses the changed asset-cache implementation.
- `Docs/EDITOR_AND_EFFECTS.md` owns the updated failure-cache contract.

## Evidence and intermediate failures

- `before.log`: the original optional-image cache reused its rejected result after network recovery, issuing no fresh request. Its first audio checks incorrectly depended on editor-only warnings and are not audio fault evidence.
- `audio-before.log`: real Chromium HTTP preload failures remained unready after both later preparation and re-entry before the fix.
- `audio-baseline-diagnostic.log`: diagnostic evidence explaining the unavailable runtime warning; replaced by native media error-event observation.
- `recovery-initial.log`: image recovery passed both browsers; WebKit native media bypassed request routing, requiring the proxy. An early audio assertion also observed a stopped earlier clip.
- `recovery-proxy.log`, `playback-diagnostic.log`: real HTTP failures reached native media in both browsers. Diagnostics confirmed successful recovered native playback, but short-clip assertions could inspect a stopped/ended earlier flight. The tests now reserve a later flight and measure mute/unmute within animation frames. One WebKit page-creation timeout occurred before application code.
- `recovery-readiness.log`: interrupted after the previously running local server stopped listening. Its connection failures are infrastructure failures, not application results. The same `node scripts/dev-server.js` server was restarted on port 4173, without regenerating assets.
- `lifecycle-diagnostic.log`: two existing VM tests stopped at a missing simulated DOM method. `lifecycle-final.log` records the minimum harness correction: delayed-group and frame-lifecycle assertions pass; the old preview-recurrence assertion still fails on both project runs. It expects automatic recurrence after a preview ends, whereas current preview ownership does not resume ordinary recurrence there. This assertion and production preview behavior were left unchanged; general preview/test-contract cleanup is outside this batch.
- `healthy-and-finished-flight.log`: 17 passes and one WebKit native metadata snapshot failure. `visibility-and-native-metadata.log` confirms image visibility in both browsers and reproduces the metadata failure. `webkit-metadata-baseline.json` demonstrates the same result with both new eviction guards removed from a test-only script response: Swift duration was zero at preload resolution, then 5.6424375 seconds 500 ms later, with no media error. `native-metadata-final.log` passes both projects after explicitly waiting for native metadata; the production cache is unchanged by this test correction.

Validation uses `ATLAS_EDITOR_URL=http://127.0.0.1:4173`, `--workers=1`, and the `desktop-chromium` / `ipad-landscape` projects. No physical iPad or installed-PWA result is implied. Service workers remain blocked by the existing test configuration.

`before-hashes.json` records the working tree before this batch, including earlier uncommitted work. Scope verification compares against that snapshot rather than attributing earlier gameplay/graphics/service-worker edits to this batch.

## Final validation result

| Coverage | Passing project cases |
| --- | ---: |
| Ten new recovery regressions, Chromium + iPad-profile WebKit | 20 |
| Existing asset-readiness and cold-start/required-asset checks | 28 |
| Selected healthy ambient motion and native Flyby audio checks | 16 |
| Existing delayed-group and frame-lifecycle VM checks | 4 |
| Total distinct passing cases across final/corrected runs | 68 |

One existing preview-recurrence VM test remains failing under both project labels (two cases), as explained above. The suite is not represented as wholly green. `recovery-readiness-rerun.log` contains 49 passes and three failures because its Chromium worker loaded the old VM harness before the one-line correction; `lifecycle-final.log` supplies the corrected frame-lifecycle result. No assertions were weakened or production preview semantics changed.

Primary validation command:

```powershell
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
npx.cmd playwright test tests/asset-recovery.spec.js tests/asset-readiness.spec.js tests/asset-cold-start.spec.js tests/flyby-lifecycle.spec.js --project=desktop-chromium --project=ipad-landscape --workers=1
```

The subsequent healthy run selected `distance integration|organic motion profile|reduced motion suppresses|During audio starts|short Wasp call|audio MIME|native during playback|finished flight` from the ambient, audio and recovery files. Visibility and native metadata corrections were rerun separately, with logs above.

Syntax checks passed for the production file and all five changed/added test and harness files. `git diff --check` passed. `changed-existing-files.json` confirms that only the ambient cache implementation, owning editor/effects contract and three existing test harnesses changed relative to the pre-batch snapshot. The new recovery test/proxy and evidence files are additional. Gameplay/replay, renderer implementations, service-worker behavior and authored levels were preserved. No image dimensions, texture-upload code, GPU ownership or rendering presets changed, so the conditional 3D renderer gate was not triggered.

Recovery deliberately requires a later preparation/load request; there is no background/per-flight automatic retry loop. Physical Safari/iPad, installed-service-worker behavior, and unbounded network stalls beyond the unchanged sound timeout are not conclusively validated by these browser-profile checks.
