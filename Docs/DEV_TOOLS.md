# Atlas development workflow

This is the current local development and persistence guide. See [Level Contract](LEVEL_CONTRACT.md), [Learning Content Rules](ATLAS_LEARNING_CONTENT_RULES.md), [Editor and Effects](EDITOR_AND_EFFECTS.md), and [Renderer Specification](renderer-current-spec.md) for system contracts. Historical implementation briefs do not prescribe new work.

## Start locally

From the repository root in PowerShell:

```powershell
npm.cmd run dev:editor
```

This runs the character-manifest generation prehook, then `scripts/dev-server.js`. Reuse an existing server when available. The normal editor URL is `http://127.0.0.1:4173/?dev=editor`; choose a level and start it. `Ctrl+Shift+D` toggles Developer Tools. Without the editor query/API, tools cannot apply source changes. `dev:walkpath` is a legacy alias for the same server, not a separate workflow.

The main-menu world editor edits adventure ordering/visibility and level settings through the existing world-config API. In-level Developer Tools uses the persistent desktop Scene workspace and contextual inspector. Scene search (`Ctrl+K`) finds authored objects; Level settings, Environment, Shared Settings and Audio are fixed entries. Add consolidates instance creation. Focus Mode is a visible canvas-toolbar toggle (`Ctrl+Shift+F`) that restores the previous panel arrangement on exit. Tab keeps normal keyboard navigation. The editor is desktop-only; game runtime iPad support is unchanged.

`Ctrl+Shift+L` is a development completion shortcut, not evidence of learning success. Do not use it to validate answers or earned learning records.

The shortcut accepts one non-repeated keydown per press: holding it across a level transition must not complete the next level. It marks only the current scene's active challenges in memory, discards the current learning-session report, and suppresses earned completion saving at the debug-completed exit. It does not write challenge progress or learning-table records. A new level gets its own saved challenge state; a fresh key press can complete that scene for testing. Normal level-start replay history is still recorded. Reloading clears unsaved debug completion while retaining legitimate saved progress.

## Persistence boundaries

Flyby FX Editing saves only `assets/ambient/flybys/<asset>/fx.json` or `assets/ambient/exit/<asset>/fx.json` through `GET/POST /__dev/flyby-fx?asset=<discovered-key>`. The level-independent `GET /__dev/flyby-assets` uses the existing ambient discovery function. Writes validate PNG identity/dimensions, preset geometry/masks and resource limits, constrain the resolved destination to the discovered flybys/exit library, reject symbolic-link sidecars and stale content revisions, then use the existing temporary-file replacement helper. The Windows copy fallback is not a cross-file/crash-atomic guarantee. FX drafts remain in memory; explicit Save/Revert and navigation protection are independent of level drafts, audio and world Apply. Saving affects every use of the source sprite. New library assets still enter by manually creating their ordinary folder; there is no FX upload system.

The asset server returns 204 for an absent optional `fx.json` in an existing flyby folder. Static hosts returning 404 are also supported. Other request/parse/validation failures remain diagnostics. The existing ambient service-worker refresh policy covers sidecars; browser tests blocking service workers do not establish offline-update coverage.

The implementation authorities are [app editor handlers](../src/app.js) and [dev-server endpoints](../scripts/dev-server.js).

| Operation | Persistence and scope |
| --- | --- |
| Edit geometry/challenges/ambient/effects | Live in-memory preview; the changed-section payload goes to the dev draft endpoint when available. It does not apply level source. |
| Ordinary draft save | Writes `Levels/<id>/editor.draft.json`, containing changed sections and metadata, not a complete replacement level. |
| Effect-only level draft | The server keeps this in its `transientSceneEffectDrafts` map. It can survive a page reload while that server lives, but not a server restart; it does not overwrite an existing on-disk draft. |
| Apply level content | Applies changed path/object/challenge/ambient/effect sections to `level.js`. General Apply uses an atomic level serialization and synchronizes start/legacy geometry. Effect-only Apply patches only the effect sections. |
| Apply audio | Writes shared `src/audio-config.js`; audio is not isolated to one level file. |
| Change level tuning/Cinematic/emissive settings or authored Illustrated feature gates or global per-character Player Locomotion | Updates the shared world resolver in memory. These settings are not covered by the level-draft JSON guarantee. During menu-launched play, Illustrated feature toggles instead change only the temporary graphics session. |
| Apply with dirty world settings / world-editor Save | Writes `Levels/world-config.js` through the shared API. This can include other staged world settings; inspect scope before saving. |
| Revert in-level editor | Waits for queued autosaves, reads saved current-level/world/audio files, deletes only the current level draft, and restores all pending authored scopes through existing setters. Previously applied writes remain. Other levels’ drafts and uploaded assets are untouched. If saved state cannot be read, nothing is discarded. |
| Background upload | Creates a new level asset through the upload endpoint before the world-setting save; this is a deliberate file-writing operation separate from Apply. |
| Play, answer, reset local data | Uses existing browser storage/progress handlers; does not rewrite authored level files. |

The server's effect-only distinction considers the changed level sections; an accompanying audio payload retains its own Apply behavior. Ordinary Apply clears its disk draft; effect-only Apply clears the transient draft without discarding a separate disk draft.

Opening a level captures its original editor baseline before overlaying an available draft. Shared audio uses a saved baseline independent of level navigation, so a level switch cannot silently accept pending audio. Successful Apply refreshes those baselines; errors remain visible. Mixed level/audio/world-config saves are separate operations, not one cross-file atomic transaction. After a failed Apply, the editor reads `GET /__dev/levels/<id>/saved-editor` to reconcile existing baselines without replacing pending values. Changes lists remaining level-content, level-settings, world-settings, character-profile and audio scopes. If that read fails, pending values remain and the uncertainty is reported; Revert requires a successful saved-state read. Apply/Revert temporarily suspend UI input and drain queued draft writes to avoid overlapping authoring operations. No rollback transaction or new authored model is introduced.

Keep existing drafts intact during unrelated development. Browser preview, draft persistence, Apply and gameplay progress are different states. Closing/minimizing tools is not Apply. A browser reload is not a guaranteed recovery mechanism for unsaved world settings or a server-restarted transient effect draft.

## Configuration ownership audit

Storage in a shared file does not make every value global. The existing editor mutation paths and runtime consumers establish these boundaries:

| Scope / values | Storage and mutation | Runtime and saving |
| --- | --- | --- |
| Level geometry, challenges/NPC configuration, animals, flybys, procedural effects | `Levels/<id>/level.js`; existing `setLevel*` / challenge / ambient handlers and changed-section draft | Level normalization, interaction/challenge and effect runtimes consume these records. Draft then Apply; Revert restores its saved source. |
| Level playable character, per-character appearance/scale/speed, background, cinematic/environment lighting, glow and authored Illustrated gates | `Levels/world-config.js → levels[id]`; `selectMainCharacter`, `updateLevelSetting`, cinematic/emissive/feature handlers through `worldResolver.updateLevelSettings` | Character tuning and renderer projection read the current level. World-config Apply saves these overrides. Revert reloads the saved whole-world configuration, including these settings. |
| World level order, enabled levels and inherited Nieuw policy | Same file, `worlds[rootId]`; world resolver reorder/enable handlers (with per-level Nieuw override in `levels[id]`) | Menu ordering, availability, next-level and replay policy. Main-menu world editor Save / dirty world-config Apply. Not stored in a level draft; Revert restores the saved world configuration. |
| Global character locomotion | Same file, `characterLocomotion.sven` and `.sven_arc`; `updateLocomotionSetting` → `updateLocomotionSettings` | `locomotionTuning` / shared controller read the playable character's profile across worlds. Apply writes world config. Revert restores the saved profiles, preserving previously applied edits. Shared Settings selects the editing profile independently of the level's playable character; contextual controls render the identical component. |
| Global master, companion purr and SFX volumes | `src/audio-config.js → volumes`; `updateAudioDraft` → `setAudioConfig` | Master/playback/SFX consumers share the values across levels. The full audio config participates in the draft and shared-file Apply. Revert restores the saved whole-audio configuration. |
| Per-level music and ambience volumes | Same audio file, `levels[id].musicVolume/ambienceVolume`; same audio handler | `getLevelAudioConfig(id)` / audio playback resolve the level. These are level-scoped values despite sharing an audio file and Apply boundary. Audio owns both groups; Shared Settings does not duplicate them. Track libraries/menu defaults also live in audio config but are not new editor controls. |
| Browser graphics preferences and learning mix | `atlas.graphics.v1` via graphics runtime settings; `atlas.learning.m6Percentage` via `learningLevels.savePreference` | Local browser preferences, not authored world settings. Apply/Revert do not own them. Runtime/menu Illustrated gates may instead be temporary session overrides; editor gates are authored level values. |
| Editor panels, Focus Mode, search, selection, zoom and profile-selector choice | `editorWorkspace`; panel arrangement/widths alone saved to `atlas.editor.workspace.v1` | UI state. Focus, camera, inspector expansion and profile selection are not authored global configuration. FPS/debug are session flags. |

World membership itself is declared by the catalog/connected-level relationship. Lighting, character appearance and music/ambience do not become world-wide merely because levels share a world. NPC appearance is instance/level data; shared character art, procedural preset definitions and central learning banks are shared resources, not additional numeric configuration controls to move into Shared Settings.

Apply can write level content, shared audio and world config in separate operations; it is not a cross-file transaction. World-config Apply may include other pending world edits, and audio Apply writes a shared file even when only a level volume changed. These existing boundaries are preserved and labeled; no additional ownership store or universal undo semantics were introduced.

## Challenge creation boundary

There is currently no supported Add-challenge factory. Existing editor actions select existing runes and mutate their linked challenge records (active state, supported type/NPC settings, authored preview and geometry). Safe creation needs an interactive object with a valid approach node, a rune binding/progression identity and narrative strings, and a challenge with matching anchor and presentation identity. The full level validator requires exactly four local question slots with nonempty authored variants; inactive status does not exempt a record. Central M6 supplies eligible individual questions at runtime, not a complete local challenge template or replacement E5 bank.

The draft endpoint and `applyLevelDraft` accept objects and learningChallenges but do not accept new rune bindings. The endpoint's challenge validation checks IDs/active flags, not the complete cross-reference/content contract enforced by `scripts/validate-levels.js`. Consequently merely adding a challenge record would not create a valid discoverable/playable challenge after reload.

**Add → Challenge is deferred.** A separate authoring extension must establish an approved source/import mechanism for complete authored challenge content, persist and validate object + rune + challenge bindings together, and define unique IDs, route placement and progression behavior. It needs save/reload/rollback tests on a developer fixture. This UX change does not invent questions, copy production learning material, add invalid placeholders, or widen persistence contracts implicitly.

### Deferred challenge implementation path

1. Accept a complete challenge package from existing approved local content or an explicitly approved import. Preserve its questions, answers and support text. Require four valid local slots; a central M6 record alone is insufficient. Do not create empty/placeholder questions or silently duplicate production content.
2. Reuse supported challenge types and NPC conversion. Allocate unique object, rune, challenge, slot and variant IDs; bind the challenge anchor and rune object to the same interactive object, select a valid approach node, and retain presentation identity, prerequisites and progression flags. Require authored intro/solved text where the contract requires it.
3. Extend the existing changed-section draft/Apply contract to include rune bindings. Validate the complete candidate level and all cross-references/content before any write, then use the existing atomic level-file serializer. Include bindings in baseline, draft reload and Revert handling.
4. Only after that path is valid, expose Add → Challenge → approved package/type → canvas placement → existing contextual inspector. Validate save/reload/re-edit, NPC relationships, ID collisions and progression on a developer fixture; reject incomplete imports without modifying source or drafts.

## Editing and asset workflow

Application icons are generated from `assets/branding/app-icon-source.png` with
`python scripts/generate-app-icons.py` (Pillow). See the [branding guide](../assets/branding/README.md)
for provenance and maskable composition. When replacing the icon identity, update
the versioned URLs in HTML, manifest and service-worker precache together, and bump
the worker cache version. Keep intro artwork independent of application icons.

- Scene selection: playable-character tuning, shared NPC General/Visual controls and ambient animals. NPC discovery reads the generated character manifest; run `npm.cmd run generate:characters` after library changes. Do not edit generated manifest entries by hand or normalize source image sizes as an incidental edit.
- Challenge inspectors: select existing anchors, edit their geometry and active state, and preview authored questions/clock data. Keep IDs, variants and progression references intact unless intentionally changing them.
- Environment and object inspectors reuse Cinematic systems, procedural properties and geometry/mask controls. Add contains the preset library; flybys expose their existing path editor; Audio is a fixed Scene entry. [Editor and Effects](EDITOR_AND_EFFECTS.md) defines their invariants.
- Independent panel collapse and Focus Mode preserve editing state; fully closing the editor removes editable route tooling. Maintain selection, focus, panel scroll and camera alignment during live edits.
- Use measured artwork dimensions, valid approach nodes and contextual interactions. New artwork/concepts should be reviewed before being promoted into playable content; generated content is authored before gameplay, not by runtime AI. There is no operational `world-metadata.json` compiler.

FPS and Debug controls in the main-menu gear area, runtime Graphics and editor Tools share the same handlers/state. They are session flags (Debug can start from `debug3d=1`), not independently persisted preferences. The reset action uses its existing confirmation and Atlas-owned storage cleanup. Do not duplicate or change these semantics when adding access points.

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
npx.cmd playwright test tests/editor-interactions.spec.js tests/editor-workspace.spec.js tests/challenge-active.spec.js --project=desktop-chromium --workers=1
```

Test files supply their editor navigation; inspect a fixture before changing the base URL or appending a second query string. The configured projects are `desktop-chromium`, `ipad-landscape`, and `ipad-portrait`. `npm.cmd run test:e2e` also regenerates the character manifest via its prehook; direct Playwright invocation does not. Browser traces/reports are local work products. The shared test config blocks service workers, so those runs alone do not validate an installed PWA cache upgrade.

| Change | Relevant existing coverage |
| --- | --- |
| Cross-scope discard, partial writes, lost acknowledgements and autosave ordering | `editor-revert-scopes.spec.js` |
| Shared profile selection, ownership and Apply/reload; mixed Audio scope | `editor-shared-settings.spec.js` |
| Unified Add families, direct character editing, inline Environment controls/state, participation and prepared ambient assets | `editor-simplification.spec.js` |
| Desktop workspace, Focus Mode and save status | `editor-workspace.spec.js` |
| Live editor movement, scale parity, Add search, information and Illustrated production audit | `editor-review.spec.js` (desktop Chromium with `ATLAS_WEBGPU_QA=1`) |
| Editor geometry/persistence | `editor-interactions.spec.js`, `cinematic-route-overlay.spec.js` |
| Learning/active state | `challenge-active.spec.js`, `npc-challenges.spec.js`, existing adventure progression tests |
| Character discovery/appearance | `character-discovery.spec.js`, `npc-challenges.spec.js`, locomotion and Voxel tests |
| Ambient library/instances | `ambient-library.spec.js`, `ambient-animals.spec.js`, `ambient-flybys.spec.js` |
| Flyby preview ownership/appearance | `flyby-preview.spec.js`, `flyby-graphics.spec.js` |
| Procedural layers/effects | `scene-effects.spec.js`, `render-layers.spec.js` |
| Cinematic | `cinematic-lighting.spec.js`, `cinematic-fx-lab.spec.js`, route-overlay tests |
| Menu controls/carousel | `menu-settings.spec.js`, `menu-carousel.spec.js` |
| 3D/resources | Conditional gate and suite selection in [Renderer Specification](renderer-current-spec.md) |

Persistence tests must use the repository's draft/source-restoration fixtures. Do not run competing persistence or GPU suites against shared mutable files/devices. Check desktop editor workflows; check desktop and both iPad orientations for affected game-runtime layout/input. Emulation does not certify physical Safari GPU behavior.

For documentation-only work, validate links, implementation claims and the diff; do not run GPU suites or asset-generating commands without a relevant change. Finish with `git diff --check` and inspect `git status`/the diff for unintended source, asset or draft modifications. Report pre-existing failures separately from regressions caused by the change.

## Production intro and startup

Normal navigation opens the five-second Atlas reveal. The visible Start button retains the accessible name `Start avontuur`. A pointer gesture during animation completes the final frame; that same gesture cannot enter Atlas. Reduced motion uses the final frame immediately. Direct `?dev=editor&level=...` links retain their editor entry behavior.

`src/bootstrap.js` loads the intro first. Only after intro teardown, it preloads the existing application scripts in parallel and evaluates them in their original order. This overlaps network-first service-worker cache fallbacks during offline startup without changing execution order or required/optional failure handling; temporary preload links are removed after bootstrap. Atlas then opens its existing menu and audio handler. The old launch panel is retired. Tests that inspect application globals must activate Start and wait for the menu first; level-loading interception should be installed after the application scripts have loaded.

The production source is `src/intro/` with assets in `assets/intro/`. It was promoted from the approved logo-reveal lab: source artwork is unchanged, and the finalized defaults are fixed in `settings.js`. The transparent PNG supplies the emblem; the reference JPEG supplies only the approved wordmark sampling, and the magic reference supplies flow texture. The independent analytic outer circle has been removed from the logo shader; see the [renderer contract](renderer-current-spec.md#disposable-startup-reveal). Lab tuning controls, storage overrides, routes, capture files and obsolete film experiments are not production dependencies.

The intro owns one temporary WebGL2 context. Every allocation (including partial initialization), image load, RAF and listener is scoped to that instance. Start aborts pending loads/listeners, deletes resources, loses the disposable context, and removes the DOM before Atlas evaluates. Hidden documents stop work; visibility and context restoration restart from the beginning. Context loss and initialization/loading failures expose a static final screen and working Start immediately. Asset and module loads have bounded fallback deadlines. No particle/timestamp restoration is attempted.

The service worker caches all production intro modules and assets and removes only obsolete `svenadventure-static-` cache versions on activation. The current cache and unrelated applications' caches are preserved. Registration also works after the window load event, because the app now boots after Start.

Regression coverage: `tests/atlas-intro.spec.js` checks natural completion, touch/click separation, delayed loads, failure fallbacks, real context-loss events, visibility restart, and instrumented allocation/listener/RAF teardown before application loading. Run with the standard menu and iPad startup suites. Real Chromium GPU checks use `ATLAS_WEBGPU_QA=1`; WebKit emulation does not certify physical iPad Safari or installed-PWA behavior.

## Persistent learning preference

The main-menu gear settings contain Niveau, a native range control with min=0, max=100, step=10. Its value is the M6 percentage; the E5 percentage is derived. The canonical default in src/learning-levels.js is 10, displayed as 90% E5 · 10% M6.

Storage key: atlas.learning.m6Percentage (a single JSON number). Valid values are integers 0, 10, …, 100. Missing, corrupt, nonnumeric, out-of-range and non-step persisted values resolve to the canonical default without rounding. Reload, browser restart and returning to the menu retain the preference. Clearing site data (including Atlas's existing reset-local-data operation) restores the default. A storage failure leaves the in-memory setting usable. This preference is separate from temporary graphics/play settings.

The sequence itself is run-local and resets at menu return, replay/restart, reload or preference change, without resetting an already selected question. See [Learning selection contract](LEVEL_CONTRACT.md#learning-level-and-mix-selection). Tests: tests/learning-levels.spec.js, including synthetic-only M6 banks and native desktop/iPad range interaction. No renderer/resource settings are changed by this feature.

## Session reports v2 and pilot validation

The 9 October time recalibration is the final approved layer in both M6 importers (`scripts/content/atlas-time-recalibration.cjs`, exact source alongside it). Reimporting must retain all 15 replacements and their bumped versions. E5 has no per-question content version; the existing static-cache convention distributes its 60 digital representation conversions. Cache `svenadventure-static-v266-time-recalibration` refreshes levels, shared clock capability/support, hints and central content. No report migration, storage or notebook behavior changes.

Focused clock QA: `node scripts/validate-levels.js`, `node scripts/audit-m6.cjs`, `tests/time-recalibration.spec.js`, the existing bank/expansion/presentation/quality/difficulty/hint suites, and `tests/time-recalibration-browser.spec.js` plus `tests/m6-quality-browser.spec.js` on desktop and both iPad projects. Screenshot evidence is in ignored `qa-screenshots/time-recalibration-20261009/`. `tests/fixtures/time-recalibration-baseline.json` freezes all 35 complete levels and all 99 records before this task; it permits only the enumerated E5 representation edits and 15 new M6 cores. This SVG/content change does not alter renderer resources or require the 3D acceptance suite. Emulated WebKit/DPR 2 coverage does not certify a physical iPad or installed-PWA update.

The M6 Moose/money presentation correction adds optional `rawFields: {euros, cents}` and `normalizedDisplay` to existing answer-history entries. `interpreted` remains integer cents, and `raw` retains a compact `euros|cents` snapshot. Voortgang displays both field values and the normalized amount when present; older raw-only answers stay readable. This is an additive v2 field extension with no migration, storage-key or retention change. Moose presenting full explanation is rendering only: no extra Moose hint or attempt is recorded, and `afterMoose` remains distinct from `afterExplanation`.

The 4 October challenge workspace uses the selected variant's delivered learning level. E5 standard/NPC hints appear once in the existing companion bar; M6 hints appear once in its facing ruled-paper notebook and its bar is hidden throughout the question. M6 opens compactly, then expands horizontally for help or notes. `state.scratchpad.open` selects the editable notebook face; otherwise the existing help stage selects its read-only contents. Page turns respect reduced motion and add no learning events. New help stages return to the help face while keeping notes. Reporting remains independent of presentation and adds no fields/schema changes. Scratch text is private run memory: no session/editor report, local storage or sync writes. It survives same-question close/reopen but ends with the run on reload/menu/restart/level visit; recovered reports never restore notes. Ordinary and money drafts use the same suspended-question lifecycle. QA: `tests/challenge-workspace.spec.js` and `tests/runenpoort-m6.spec.js`; the latest screenshots and pre-change fingerprints are in ignored `qa-screenshots/m6-notebook-20261004/`. CSS paper uses no imported reference artwork. Static cache v246 distributes this notebook presentation; installed-PWA updates and physical iPad keyboards require separate device verification.

The scratchpad remains a free-form multiline textarea. `inputmode="decimal"` requests a calculation-friendly software keyboard; autocorrect, autocapitalization, spelling and autocomplete are disabled. These are keyboard hints, not input validation, so letters, operators and either decimal punctuation remain editable. Cache v269 distributes this and the intro-circle correction. Actual iPad keyboard choice remains an OS behavior requiring physical-device verification.

New sessions use `version: 2` inside the existing `atlas-session-report-v1` and `atlas-session-current-v1` storage keys. Retention is still three unchecked sessions, with no replacement of retained reports and no backend. Stored v1 reports are read without backfilling metadata. A recovered active v1 session is archived under the same retention rule before collecting a new session; its version and evidence stay unchanged.

V2 stores the session's configured M6 percentage and each question's content version, prompt, learning objective/report label, requested/delivered level and difficulty, correct-answer display, timestamped raw/interpreted answers (including invalid input), and timestamped snapshots of support actually shown. M6 now opens and records full explanation only after the third valid incorrect answer; preparing visual frames records nothing. Only valid answers increment attempts/first-response timing. Outcomes are direct, afterMinnie, afterMoose, afterExplanation or incomplete; existing assisted completions remain separately readable, and unhinted legacy retries use afterRetry rather than falsely claiming direct success. Historical v2 reports with explanation source `direct` still show the old `Leg uit` evidence without migration or rewriting. The flow correction requires no schema/key/retention change. Counts are primary in Voortgang. Missing historical metadata is displayed as not recorded, never inferred from today's question bank.

`node scripts/validate-levels.js` includes central-bank schema/assets, the exact 24-ID/content/stage migration gate, the earlier 75-record expansion and the approved 60-record addition (**159 total**). `npm run audit:m6` reports the complete bank and both expansion distributions, including numerical duplicate detection. `node scripts/import-runenpoort-m6.cjs` is an idempotent verifier by default; `--write` transcribes the current approved genericization into its four central modules. It cannot restore obsolete local M6 copies or touch drafts. `node scripts/import-m6-expansion.cjs` serializes only the eight earlier expansion modules from their immutable source and authorized corrections. `node scripts/m6-expansion-20261010.cjs` serializes only the new 60-record module from its separate approved source/transcription. Neither importer authors questions or writes levels. `node scripts/export-m6-expansion-20261010.cjs` writes the actual production-recovered review artifact at `Docs/qa/M6_EXPANSION_20261010_RUNTIME.json`. Run `tests/m6-expansion-20261010.spec.js` and `tests/m6-expansion-20261010-browser.spec.js` (desktop Chromium and both iPad WebKit orientations), plus the existing bank/content/notebook and planner regressions. The dated baseline freezes all prior 99 records and their rendered support plus all 960 E5 variants; historical correction tests retain their original collection scope. See [current M6 contract and capability schema](M6_CONTENT_BANK.md).


Central M6 adds optional centralQuestionId, surfaceId, domain and educationalDomain to existing v2 question snapshots. Rendered prompt/version/objective evidence remains stored independently of the bank. Currency composition adds rawCounts and targetCents alongside interpreted canonical cents. Historical reports, storage keys, report recovery and retention are unchanged. The separate atlas.learning.m6Recent key stores at most 128 recent ID/surface pairs; existing local-data reset owns it. It contains no notes or question blobs. See [M6 architecture and schemas](M6_CONTENT_BANK.md).
