# Atlas development workflow

This is the current local development and persistence guide. See [Level Contract](LEVEL_CONTRACT.md), [Learning Content Rules](ATLAS_LEARNING_CONTENT_RULES.md), [Editor and Effects](EDITOR_AND_EFFECTS.md), and [Renderer Specification](renderer-current-spec.md) for system contracts. Historical implementation briefs do not prescribe new work.

## Start locally

From the repository root in PowerShell:

```powershell
npm.cmd run dev:editor
```

This runs the character-manifest generation prehook, then `scripts/dev-server.js`. Reuse an existing server when available. The normal editor URL is `http://127.0.0.1:4173/?dev=editor`; choose a level and start it. `Ctrl+Shift+D` toggles Developer Tools. Without the editor query/API, tools cannot apply source changes. `dev:walkpath` is a legacy alias for the same server, not a separate workflow.

The main-menu world editor edits adventure ordering/visibility and level settings through the existing world-config API. In-level Developer Tools has **Characters**, **Challenges**, and **Graphics** tabs. Graphics contains Cinematic tooling, level rendering, flybys, audio and Illustrated effects; Audio/Effects are not additional top-level tabs.

`Ctrl+Shift+L` is a development completion shortcut, not evidence of learning success. Do not use it to validate answers or earned learning records.

## Persistence boundaries

The implementation authorities are [app editor handlers](../src/app.js) and [dev-server endpoints](../scripts/dev-server.js).

| Operation | Persistence and scope |
| --- | --- |
| Edit geometry/challenges/ambient/effects | Live in-memory preview; the changed-section payload goes to the dev draft endpoint when available. It does not apply level source. |
| Ordinary draft save | Writes `Levels/<id>/editor.draft.json`, containing changed sections and metadata, not a complete replacement level. |
| Effect-only level draft | The server keeps this in its `transientSceneEffectDrafts` map. It can survive a page reload while that server lives, but not a server restart; it does not overwrite an existing on-disk draft. |
| Apply level content | Applies changed path/object/challenge/ambient/effect sections to `level.js`. General Apply uses an atomic level serialization and synchronizes start/legacy geometry. Effect-only Apply patches only the effect sections. |
| Apply audio | Writes shared `src/audio-config.js`; audio is not isolated to one level file. |
| Change level tuning/Cinematic/emissive settings | Updates the shared world resolver in memory. These settings are not covered by the level-draft JSON guarantee. |
| Apply with dirty world settings / world-editor Save | Writes `Levels/world-config.js` through the shared API. This can include other staged world settings; inspect scope before saving. |
| Revert in-level editor | Deletes the applicable draft and restores captured level/audio baselines plus tracked Cinematic/emissive originals. It does not reload every source file or universally undo unrelated world-editor settings. |
| Background upload | Creates a new level asset through the upload endpoint before the world-setting save; this is a deliberate file-writing operation separate from Apply. |
| Play, answer, reset local data | Uses existing browser storage/progress handlers; does not rewrite authored level files. |

The server's effect-only distinction considers the changed level sections; an accompanying audio payload retains its own Apply behavior. Ordinary Apply clears its disk draft; effect-only Apply clears the transient draft without discarding a separate disk draft.

Opening a level captures its original editor baseline before overlaying an available draft. Successful Apply refreshes those baselines; errors remain visible. Mixed level/audio/world-config saves are separate operations, not one cross-file atomic transaction. Inspect an error and the resulting diff before retrying; do not assume all writes rolled back.

Keep existing drafts intact during unrelated development. Browser preview, draft persistence, Apply and gameplay progress are different states. Closing/minimizing tools is not Apply. A browser reload is not a guaranteed recovery mechanism for unsaved world settings or a server-restarted transient effect draft.

## Editing and asset workflow

- Characters: Sven tuning, shared NPC General/Visual controls and ambient animals. NPC discovery reads the generated character manifest; run `npm.cmd run generate:characters` after library changes. Do not edit generated manifest entries by hand or normalize source image sizes as an incidental edit.
- Challenges: select existing anchors, edit their geometry and active state, and preview authored questions/clock data. Keep IDs, variants and progression references intact unless intentionally changing them.
- Graphics: use the existing Cinematic layers, procedural preset library, geometry/mask controls, flyby paths and shared audio controls. [Editor and Effects](EDITOR_AND_EFFECTS.md) defines their invariants.
- Minimize preserves editing state; fully closing the editor removes editable route tooling. Maintain selection, focus, panel scroll and camera alignment during live edits.
- Use measured artwork dimensions, valid approach nodes and contextual interactions. New artwork/concepts should be reviewed before being promoted into playable content; generated content is authored before gameplay, not by runtime AI. There is no operational `world-metadata.json` compiler.

FPS and Debug controls in the main-menu gear area and Graphics share the same handlers/state. They are session flags (Debug can start from `debug3d=1`), not independently persisted preferences. The reset action uses its existing confirmation and Atlas-owned storage cleanup. Do not duplicate or change these semantics when adding access points.

## Validation and tests

```powershell
npm.cmd run validate:levels
npm.cmd run audit:levels
npm.cmd run report:levels
```

These check current level definitions, assets/references and level reports. Human review still checks painted-ground alignment, coherent questions and playable progression. The learning-audit generator `scripts/leonardo-question-audit.js` writes report files; it is not a read-only validator.

Use focused existing Playwright suites appropriate to the change. For example, against the local server:

```powershell
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
npx.cmd playwright test tests/editor-interactions.spec.js tests/challenge-active.spec.js --project=desktop-chromium --workers=1
```

Test files supply their editor navigation; inspect a fixture before changing the base URL or appending a second query string. The configured projects are `desktop-chromium`, `ipad-landscape`, and `ipad-portrait`. `npm.cmd run test:e2e` also regenerates the character manifest via its prehook; direct Playwright invocation does not. Browser traces/reports are local work products. The shared test config blocks service workers, so those runs alone do not validate an installed PWA cache upgrade.

| Change | Relevant existing coverage |
| --- | --- |
| Editor geometry/persistence | `editor-interactions.spec.js`, `cinematic-route-overlay.spec.js` |
| Learning/active state | `challenge-active.spec.js`, `npc-challenges.spec.js`, existing adventure progression tests |
| Character discovery/appearance | `character-discovery.spec.js`, `npc-challenges.spec.js`, locomotion and Voxel tests |
| Ambient library/instances | `ambient-library.spec.js`, `ambient-animals.spec.js`, `ambient-flybys.spec.js` |
| Procedural layers/effects | `scene-effects.spec.js`, `render-layers.spec.js` |
| Cinematic | `cinematic-lighting.spec.js`, `cinematic-fx-lab.spec.js`, route-overlay tests |
| Menu controls/carousel | `menu-settings.spec.js`, `menu-carousel.spec.js` |
| 3D/resources | Conditional gate and suite selection in [Renderer Specification](renderer-current-spec.md) |

Persistence tests must use the repository's draft/source-restoration fixtures. Do not run competing persistence or GPU suites against shared mutable files/devices. Check desktop and both iPad orientations for affected layout/input; emulation does not certify physical Safari GPU behavior.

For documentation-only work, validate links, implementation claims and the diff; do not run GPU suites or asset-generating commands without a relevant change. Finish with `git diff --check` and inspect `git status`/the diff for unintended source, asset or draft modifications. Report pre-existing failures separately from regressions caused by the change.
