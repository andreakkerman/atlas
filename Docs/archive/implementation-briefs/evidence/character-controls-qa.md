# Character editor controls — verification

## Implementation

- Sven and NPCs have separate General and Visual controls groups.
- A shared appearance module defines Brightness, Contrast, Saturation, Warmth and Tint, normalization, settings mapping and filter parameters.
- Existing Sven ranges remain intact. NPC brightness retains its existing 0.4–1.6 range; the four new fields use Sven's ranges and neutral defaults.
- One visual control renderer serves both character types. NPC values persist through the existing challenge draft/Apply path.
- Appearance is applied to the stable NPC shell in Illustrated and to per-instance shader uniforms in Voxel. Texture uploads and animation scheduling remain unchanged.
- No authored level/config changes or manual migrations remain in the working tree.

## Automated results

| Run | Pass | Fail | Skip | Notes |
| --- | ---: | ---: | ---: | --- |
| Focused desktop suite | 113 | 1 | 0 | The failure was an obsolete `state.player.x/y` reference in the existing GPU handoff test. |
| Complete GPU suite after correcting that fixture | 7 | 0 | 0 | Reverified all seven GPU tests, including the formerly failing handoff check. |
| Shared controls at both iPad viewport sizes, Chromium | 4 | 0 | 0 | Freya and Eivar, landscape and portrait. |

These runs verify **118 distinct focused checks** after corrections, with **0 unresolved failures and 0 skips** in that coverage. Six GPU tests occur in both desktop and GPU runs and are counted only once.

`npm run validate:levels`: **31 levels passed**. JavaScript syntax checks and `git diff --check` passed.

The desktop suite covered NPC discovery/UI/presentation, shared appearance, editor interactions, persistence, locomotion/short moves, ambient animals/flybys, asset readiness, render layers, active challenges, WebGPU capability handling and Voxel rendering.

The actual GPU path used full Chromium with `ATLAS_WEBGPU_QA=1` and `ATLAS_EDITOR_URL=http://127.0.0.1:4173/?dev=editor`. Default headless-shell runs without a GPU adapter were not used as evidence of GPU correctness.

WebKit landscape control checks also passed after the scroll assertion fix, but that runner stalled between projects and was interrupted. The clean four-test iPad viewport result above is Chromium, not a claim of a completed Safari/WebKit matrix.

## Live browser QA

- Sven: inspected both groups, changed all five visual values, checked live filter updates, restored neutral values.
- Freya: inspected both groups, changed all five fields and checked completed-pose appearance, then restored neutral values.
- Eivar: changed all five fields, observed `idle_animation_2` and base idle with tuning intact, switched Voxel/Illustrated and restored neutral values.
- Automated browser checks additionally exercised all discovered idle variants, return to idle, pass and completed poses for both NPCs, draft reload, panel/input identity, selection, focus, scrolling and collapsed sibling sections.
- GPU checks inspected real shader uniform writes and confirmed a live brightness edit changes NPC pixels without replacing the canvas.
- No unexpected console errors were observed in the character checks or live browser session.

## QA fixes

- Existing locomotion editor assertion still selected the removed Sven `simple-visual-controls` group. It now selects the shared Sven visual group.
- New WebKit scroll assertion measured before browser focus scrolling settled. The check now scrolls the input into view and waits one animation frame before recording the baseline; editing itself preserves scroll.
- Existing GPU handoff test used obsolete `state.player` coordinates. It now uses the runtime's `worldX/worldY`; all seven GPU checks passed afterward.
- Derived CSS filter parameters are rounded to stable decimal strings, avoiding floating-point formatting noise while retaining the existing filter formula.

## Separate legacy suite caveat

The wider `runenpoort.spec.js` probe found six failures that were reproduced using the original committed `app.js`, stylesheet and Voxel renderer, served through read-only test route overrides:

1. Loads the adventure (outdated menu count expectation).
2. Companion portrait space does not advertise dialogue clickability (cursor expectation).
3. Plays through the full adventure and persists completion (team-bar expectation during NPC UI).
4. Continues through the temple interior and Viking harbor (same team-bar expectation).
5. Plays through the connected Nautilus adventure.
6. Levels use authored companion moments instead of status narration.

The original-code baseline runs returned **1 pass, 6 failures, 0 skips** in total. The hero auto-rotation check that failed during the busy broad run passed in the controlled baseline run. These legacy tests were not rewritten as part of the character-controls task, and a repository-wide green test status is not claimed.

## Logs

- `Docs/archive/implementation-briefs/evidence/character-final.log`
- `Docs/archive/implementation-briefs/evidence/character-gpu-final.log`
- `Docs/archive/implementation-briefs/evidence/character-ipad-chromium.log`
- `Docs/archive/implementation-briefs/evidence/character-baseline.log`
- `Docs/archive/implementation-briefs/evidence/character-baseline-additional.log`

Character-control defects found and still unresolved: **0**. Pre-existing legacy-suite failures remaining: **6**.
