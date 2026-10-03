# Opt-in lifecycle investigation

This directory is diagnostic tooling and evidence, not part of Atlas startup. It does not change assets, authored settings, production source, persistence or service-worker behavior. Reload removes the injected wrappers. Read [REPORT.md](REPORT.md) before interpreting the results.

## Desktop reproduction

Use the existing asset server at `http://127.0.0.1:4173`. From the repository root:

```powershell
node Docs/lifecycle-investigation/run.cjs

$env:ATLAS_SEQUENCES='lifecycle'
$env:ATLAS_CHANNEL='chrome'
$env:ATLAS_HEADED='1'
$env:ATLAS_NATIVE_VISIBILITY='1'
$env:ATLAS_MINIMIZE='1'
$env:ATLAS_LIFECYCLE_OUT='Docs/lifecycle-investigation/native-visibility'
node Docs/lifecycle-investigation/run.cjs
node Docs/lifecycle-investigation/summarize.cjs --pack
```

Do not run these browsers alongside another GPU suite. Each matrix sequence launches a separate browser process; reload and tab reopening deliberately retain the lifecycle run's browser/context. The runner blocks service workers and routes editor drafts to an empty response. It selects production levels through the existing handler and applies the requested feature flags after preparation. No authored effects are retuned. Check `renderer.illustratedScene` as well as the toggles: neutral authored settings can still select the lightweight path.

`ATLAS_WIDTH`, `ATLAS_HEIGHT`, `ATLAS_DPR` and `ATLAS_SAMPLE_MS` override the default 1180×734, DPR 2, 4000 ms per stationary/walking sample. The route starts at the existing player start and requests an existing free-walk destination 1400 world units to the right; measurement begins 700 ms after starting movement. Ambient timing and random blinks remain production-driven. Samples are comparable but not pixel/time-frozen scenes.

The lifecycle command is an attempted browser probe, not guaranteed native suspension. Validate trusted visibility events in its results. These runs remained visible and used CDP requests; see the report's explicit limitations. `ATLAS_NATIVE_BROWSER=1` optionally uses an owned isolated Chromium process attached without focus defaults; that experiment did not complete successfully in this environment. It is preserved for diagnosis, not recommended as a passing acceptance test.

The runner's HTTP response instrumentation adds cache sizes, texture-purpose labels and an internal release snapshot to the existing renderer only in that test page. `diagnostics.js` wraps native calls and observes existing runtime snapshots. It delegates native operations and holds weak references to resources. It is not a shipping telemetry system.

`matrix/*.json.gz` contains losslessly compressed per-frame counters and transition snapshots. New runs initially write `.json`; `summarize.cjs --pack` replaces those with gzip files and regenerates the tables. `measurements.csv` and `TIMELINE.md` contain every stationary/walking result; `transitions.csv` contains the ownership boundaries. `summary.json` contains additional actor, Canvas, upload, particle, timer, media, cache and slow-frame aggregates. The timeline includes preliminary and failed probes with their directory labels; only the `matrix` rows support the level-history conclusion. Native GPU calls measure logical traffic and CPU submission work, not GPU completion time or physical VRAM use.

## Physical iPad / affected desktop capture

Use Safari's remote Web Inspector for the actual installed iPad PWA, or DevTools on the affected desktop. Serve this diagnostic file from the same reachable app origin in a diagnostic build. The iPad's `127.0.0.1` is not the desktop server. No PWA installation or cache changes are required by this script.

At the main menu, before entering the first level, evaluate:

```js
await fetch('/Docs/lifecycle-investigation/diagnostics.js', {cache:'no-store'})
  .then(r => { if (!r.ok) throw Error(r.status); return r.text(); })
  .then(code => (0, eval)(code));
AtlasLifecycleAudit.capture('A-menu-before-entry');
```

If loaded after app initialization, the export says `preloaded:false`: resources created before injection are not in the native allocation ledger. Existing renderer snapshots remain useful. For complete creation history, inject the same file before app scripts using the diagnostic server/test harness. Do not add it to normal production startup.

For each steady-state capture, stand at the same place and run:

```js
await AtlasLifecycleAudit.measure('A-stationary', 5000);
// Schedule the sample, then walk the same route during the delay and sample.
setTimeout(() => AtlasLifecycleAudit.measure('A-walking', 5000), 3000);
// After the sample finishes:
AtlasLifecycleAudit.download();
```

Keep viewport, orientation, DPR, graphics toggles and route unchanged. Record hardware, OS/browser version, battery/power state and whether connected inspection changes the symptom. All six Illustrated features should be ON and challenge effects Canvas 2D; export records the effective compositor mode. Do not force full-scene ownership by changing authored effects.

1. **A — cold:** terminate the PWA, cold launch, inject at menu, enter Runenpoort (or the affected level), enable the requested toggles, capture stationary/walking and download.
2. **B — 30-second background:** `AtlasLifecycleAudit.capture('B-before-background')`; background the PWA for approximately 30 seconds, resume, immediately capture `B-after-resume`, then repeat stationary/walking measurements with B labels and download. Native visibility/page lifecycle events are captured automatically.
3. **C — another app:** capture before leaving, use another app briefly, return, capture immediately and after stabilization, repeat measurements and download. Do not substitute synthetic DOM events.
4. **D — menu/levels:** capture before menu, return to menu, capture after teardown; enter another production world and measure; return through menu to the original world and repeat the original route. Capture each boundary and download.
5. **E — hard kill:** download before termination, hard-kill the PWA, relaunch, reinject at menu and repeat A. Compare with B/C; hard kill and suspension are different cases. Absence of a `pagehide` event does not prove that termination failed.

For the affected desktop also compare a normal reload and closing/reopening only the Atlas tab while leaving the browser process open. Reinject after every new document. Download before reload/close because the old in-memory report is lost. Keep labels explicit about cold process, fresh document, same document and PWA standalone mode.

The compact download retains at most 400 snapshots, 40 measured windows and 1500 events. `AtlasLifecycleAudit.download(true)` includes expanded snapshots. Late injection cannot reconstruct old listener registrations, allocations, pending promises or earlier ownership. The wrappers add measurement overhead; use the same instrumentation on both sides of a comparison.
