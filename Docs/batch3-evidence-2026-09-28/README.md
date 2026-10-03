# Hardening batch 3

Two production changes only:

- `service-worker.js`: activation now deletes obsolete names beginning with the existing `svenadventure-static-` prefix, preserving the current cache and unrelated caches. The cache version moves from v231 to v232 so installed clients receive the CSS change. Installation/fetch/update ownership otherwise stays unchanged.
- `src/styles.css`: the legacy `.runeFocusSpark` circle is hidden in the existing `challenge` and `correct` screen states. It previously remained above the unchanged Canvas particles when the dialog opened. No Canvas code, marker list, styling dimensions, authored geometry or gameplay state logic changed.

The owning contracts were updated in `Docs/DEV_TOOLS.md` and `Docs/EDITOR_AND_EFFECTS.md`. Added tests are `tests/service-worker-ownership.spec.js` and `tests/challenge-indicator-open.spec.js`.

## Results

- `before.log`: the production activation handler deleted unrelated sentinel caches. The first indicator harness incorrectly expected a close button on standard questions; this is not visibility evidence.
- `indicator-before.log`: after using the actual dialog and existing close handler, the regression failed because `.runeFocusSpark` remained visible.
- `focused.log`: six cases passed: production activation-handler ownership (VM/cache API fixture), indicator open/close/completion/retry/transition, and the existing normal challenge hit-target/completion check, under desktop Chromium and iPad-profile WebKit. Canvas paint is delegated unchanged and marker identities remain unchanged while opening/closing.
- Two existing NPC approach-click cases failed before opening a challenge: the Runenpoort exit intercepted the Freya hit target. Their assertions and input behavior were not changed. `npc-baseline-hit.json` checks with the new CSS rule removed from a test-only response; iPad still hits Runenpoort. The desktop diagnostic did not identify a top button. Both actual test failures occurred on `screen=scene`, where the new rule does not apply.
- `locked-dialog.log`: the adjacent existing locked-dialog/approach-point check passed on both profiles.

Aggregate: **8 passing project cases, 2 unrelated NPC approach-click failures**, with no assertions weakened. Syntax checks passed for the worker and both new tests. `git diff --check` passed. No large GPU or full-suite batch was run; these changes do not affect renderer resources.

The focused command used `ATLAS_EDITOR_URL=http://127.0.0.1:4173`, `--workers=1`, `--project=desktop-chromium --project=ipad-landscape`, and selected `activation deletes|open indicator hides|normal challenge hit target|keeps locked NPCs clickable` from the new tests, `challenge-fx.spec.js` and `npc-challenges.spec.js`. The additional NPC command selected `uses the existing approach node and opens a Dutch locked NPC dialog`.

The activation test invokes the real worker handler in an isolated VM; it is not an installed-PWA upgrade test. The iPad profile validates WebKit layout/touch behavior, not a physical device.

`before-hashes.json` and `changed-existing-files.json` confirm only the two production files and two owning documents changed relative to the start of this batch. Earlier uncommitted changes were preserved. In particular, `src/app.js`, asset/audio recovery, all Canvas/compositor implementations and authored levels were unchanged.
