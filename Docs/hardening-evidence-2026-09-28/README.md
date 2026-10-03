# Gameplay hardening validation

Scope: fresh level-run state and earned-reward replay. Production changes are confined to `src/app.js`; canonical level/learning contracts and focused regressions were updated. Earlier working-tree graphics and service-worker edits were preserved.

- `fresh-run-before.log`: all three new desktop regressions failed before implementation, at the stale exit lock or restored completed-rune assertions.
- `fresh-run-after.log`: initial desktop + iPad-profile run of fresh-state, replay and ARC progression tests. The new regressions passed on both profiles. Four longer existing cases exceeded whole-test budgets after adding real re-answering and deferred app bootstraps; their assertions were retained for the final run.
- `fresh-run-session.log`, `fresh-run-session-after.log`: expose obsolete report-test bootstrap/default-menu assumptions. The test helpers were corrected; production reporting code was not changed.
- `fresh-run-session-final.log`: 17 session-report checks passed; the three-bootstrap iPad case exceeded its original 30-second whole-test budget and is included in the final run.
- `fresh-run-final.log`: revised Riven/replay tests, changed NPC reload expectations, and the multi-bootstrap report case, on desktop Chromium and touch/iPad WebKit. Whole-test budgets reflect the real UI workload (including 68 answers in the full ARC test); no interaction waits or assertions were weakened.

Commands use the existing local server at `http://127.0.0.1:4173`, `--workers=1`, and projects `desktop-chromium` / `ipad-landscape`. The primary command selects `fresh-level-run.spec.js`, `replay-run.spec.js` and `arc-challenge-progress.spec.js`. Session-report checks run their full file. The final command selects Riven fresh-run, full earned ARC, legacy completion, NPC artwork/reload, non-final NPC, and reporting-mode cases. No physical-iPad result is implied.

Old tests asserting partial challenge restoration or completed NPC poses after reload were changed to the clarified fresh-run contract. Earned-completion, history, cooldown, interaction and within-run NPC assertions remain. Partial play no longer overwrites the durable reward record; legacy partial fields remain on disk but are never used to initialize a run.

Final result: 48 distinct cases passed across desktop Chromium and touch/iPad-profile WebKit: 24 fresh-state/replay/ARC cases, six NPC interaction/reload cases, and 18 session-report cases. The final rerun passed all 14 selected cases. Earlier failures and their corrections remain documented above; this is the aggregate result across those runs, not a claim that every intermediate run passed. Intermediate session failure artifacts are retained in `session-intermediate-artifacts/`.

`node --check` passed for `src/app.js` and all five changed test files; `git diff --check` passed. Comparison with the recorded pre-batch hashes confirmed that ambient/cinematic/voxel renderer files, the service worker, and world configuration were preserved. No authored level or production session-report files changed. The conditional renderer QA gate does not apply to this gameplay-state-only change; no physical iPad was tested.
