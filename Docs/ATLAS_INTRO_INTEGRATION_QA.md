# Atlas intro integration QA — 2026-09-27

The approved five-second logo reveal now owns normal startup until Start. Production uses its unchanged shader code, artwork and 72 approved defaults. Start disposes the intro before loading the existing application scripts. The direct editor route remains available.

## Validation

130 distinct test configurations passed across the final runs (not one combined run):

| Coverage | Passing configurations | Evidence directory |
| --- | ---: | --- |
| Real-WebGPU tablet acceptance, preparation, presets, pressure and cleanup | 40 | `output/intro-integration/gpu` |
| Intro, menu carousel, menu settings and iPad startup across Chromium and both WebKit tablet orientations | 87 | `output/intro-integration/final`, `fixtures-final`, `last-checks` |
| Service-worker cache upgrade, audio and offline startup across the same three projects | 3 | `output/intro-integration/pwa-outage` |

The GPU run used `ATLAS_WEBGPU_QA=1`, `ATLAS_EDITOR_URL=http://127.0.0.1:4173`, the existing asset server and one worker. It included 1180×734/DPR 2, the 512×299 warm-up aspect, separate 1770×1101 preparation, Desktop High and pressure/cleanup coverage. GPU suites ran sequentially.

The application run used `ATLAS_WEBGPU_QA=1` and one worker with `desktop-chromium`, `ipad-landscape` and `ipad-portrait`. Focused reruns resolved fixture failures: tests now wait for the deferred application startup; menu fixtures explicitly select their intended adventure; mocked adapter stalls target the adapter-acquisition phase. The two original adapter fixture failures were reproduced against pre-integration HEAD before correcting their scope. Existing assertions were retained.

Intro tests instrument RAF, event-listener cancellation and GL allocation/deletion, checking teardown before the first application script request. They cover natural completion, trusted pointer/touch completion without accidental Start, reduced motion, unavailable WebGL, partial initialization failure, failed/hung assets and modules, background restart and actual WebGL context loss/restoration.

The offline test stops a disposable forwarding origin, verifies the origin is unreachable, then reloads from the service worker. This exercises a real outage because Playwright WebKit's offline emulation has an upstream issue: <https://github.com/microsoft/playwright/issues/42775>. No browser assertions were skipped.

Reviewed completed-intro screenshots for desktop and both tablet orientations. Interactive browser verification reached the normal menu with keyboard Start and no console errors. In-app-browser pointer actions were inconsistent even on existing menu controls, so manual pointer verification there is inconclusive; automated trusted mouse/touch tests passed. Physical iPad Safari and a natively installed iPad PWA remain unverified. Emulated WebKit and real Chromium WebGPU results do not prove physical-iPad behavior or resolve a physical GPU failure.

`git diff --check`, module syntax checks, original application-script order comparison, production resource-path checks, approved-default comparison and artwork/shader equality checks passed.

## Cleanup

Removed confirmed obsolete `atlas-blockbuster-trailer`, `atlas-blockbuster-v4`, `atlas-cinematic-intro` and `atlas-living-atlas` experiments and their dedicated tests/infrastructure. Repository searches found no remaining references. A recovery archive was saved outside the repository before removal.

The approved `experiments/atlas-logo-reveal` lab is intentionally retained as reference; its README points to the production implementation. Its tuning controls are absent from production. Authored level content, drafts and unrelated assets were preserved.

Current lifecycle contracts are documented in `DEV_TOOLS.md` and `renderer-current-spec.md`; this file records integration evidence rather than adding execution instructions.
