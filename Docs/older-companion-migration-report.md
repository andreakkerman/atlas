# Older-world companion migration — V2 implementation

The [approved V2 ledger](older-worlds-non-challenge-dialogue-review-v2.md) was matched against current production definitions. All 238 rows matched exactly one authored moment by event, speaker and current text before editing. The original ledger is retained verbatim.

| Decision | Reviewed | Applied | Deferred |
| --- | ---: | ---: | ---: |
| KEEP | 37 | 37 unchanged | 0 |
| REWRITE | 126 | 124 exact final strings | 2 |
| REMOVE / SUPPRESS | 75 | 75 silent through policy | 0 |
| Total | 238 | 236 | 2 |

## Current-source mismatches

Production navigation uses `resolvedNextLevelId()` in [src/app.js](../src/app.js), which delegates to `nextEnabled()` in [src/atlas-world.js](../src/atlas-world.js). The enabled/order configuration in [Levels/world-config.js](../Levels/world-config.js) takes precedence over a level's authored `reward.nextLevelId` during navigation.

Two proposed rewrites name destinations skipped by that current configuration. Per the request, the existing text is retained, with no replacement invented:

| Ref / level / moment | Approved proposal deferred | Existing text retained | Current production route |
| --- | --- | --- | --- |
| D1288 / LVL-0021 / `LVL-0021-exit` | Alles klaar. Door naar Proceno. | Alle tekens staan goed. Door naar de volgende poort. | Rome → Umbrie (LVL-0023); Proceno (LVL-0022) is disabled. Source: [Rome](../Levels/LVL-0021/level.js). |
| D1481 / LVL-0024 / `LVL-0024-exit` | Alles klaar voor vertrek. Op naar Florence. | Vluchtplan klopt. Naar Florence. | Marche → Vinci (LVL-0026); Florence (LVL-0025) is disabled. Source: [Marche](../Levels/LVL-0024/level.js). The existing line also names Florence; it remains unchanged under the explicit mismatch rule. |

Three KEEP rows already conflict with the configured route and remain unchanged as required:

| Ref / source / moment | Retained text | Current production route |
| --- | --- | --- |
| D0852 / [LVL-0014](../Levels/LVL-0014/level.js) / `uk-unlocked` | De collegepoort is open. Frankrijk ligt voor ons. | England → Italy (LVL-0016), skipping disabled France (LVL-0015). |
| D1041 / [LVL-0017](../Levels/LVL-0017/level.js) / `at-unlocked` | De Alpenpoort is open. Tijd voor het fjord. | Austria → Sweden (LVL-0019), skipping disabled Norway (LVL-0018). |
| D1163 / [LVL-0019](../Levels/LVL-0019/level.js) / `se-unlocked` | De havenpoort is open. Nu terug naar Rheden. | No next enabled level; Rheden (LVL-0020) is disabled. |

The ledger's description of 31 active levels does not match current visibility: LVL-0012, LVL-0015, LVL-0018, LVL-0020, LVL-0022 and LVL-0025 are disabled. Their explicitly requested source dialogue was still processed. Tests access them with the existing `allowDisabledForEditor` option without enabling them in production. Their authored destination copy remains applicable to their authored routes if they are restored. World ordering, visibility and level connections were not changed. The Blokkenpoort configured order also differs from authored reward links; its reviewed generic exit lines do not name a conflicting next level.

Five explicitly reviewed rows also reference currently inactive challenges: D0845/D0849 (`postbox`, LVL-0014), D0903/D0906 (`marketStall`, LVL-0015), and D1285 (`engineeringTable`, LVL-0021). Those ledger decisions were applied to the authored moments as explicitly requested; the challenges remain inactive. Unreviewed inactive dialogue remains untouched.

## Policy and runtime

All 31 older levels, LVL-0001 through LVL-0031, now declare `companionPolicy` with `attentionOncePerVisit: true`. Each `disabledEvents` list is derived only from that level's REMOVE / SUPPRESS rows. No global suppression or world-ID branches were added.

| Suppressed event | Ledger rows | Configured levels |
| --- | ---: | --- |
| LEVEL_PROGRESS_MILESTONE | 21 | LVL-0001–LVL-0021 |
| CHALLENGE_SUCCESS | 44 | LVL-0004–LVL-0031 |
| HOTSPOT_ATTENTION_FIRST | 5 | LVL-0022–LVL-0026 |
| CHALLENGE_OPEN | 5 | LVL-0027–LVL-0031 |

Suppressed records remain authored but never enter the companion queue or fallback selector. Other event types retain their previous behavior unless explicitly configured. For example, LVL-0001–LVL-0003 did not have reviewed CHALLENGE_SUCCESS rows, so this task does not disable their existing revisit fallback.

The existing `seenObjects` visit-local set now also protects AMBIENT_ATTENTION_FIRST, AMBIENT_ATTENTION and OBJECT_FIRST_LOOK when the level opts in. Both ambient event names share one namespaced key per object, preventing a second discovery through the ordinary ambient event. HOTSPOT_ATTENTION_FIRST keeps ARC's existing key. Opening, retrying and completing challenges do not clear the keys; a new visit does. No save migration was introduced.

## Preservation and validation

The regression fixture captures pre-edit full-level hashes and ledger-ref-to-moment-ID mappings. Tests normalize only approved rewritten text and the newly added policies before checking those hashes. This verifies that questions, hints, answers, choices, explanations, variants, geometry, progression, hidden/legacy text, speakers, filters, IDs and order remain unchanged. ARC source hashes ignore Git checkout line endings for portability; a separate direct comparison also confirmed all four ARC files remained byte-identical during this task. Its resolver and hint templates were not edited.

Changed production files: `Levels/LVL-0001/level.js` through `Levels/LVL-0031/level.js`, the attention guard in `src/app.js`, and the cache version in `service-worker.js`. Documentation: this report, the verbatim V2 ledger, and the companion-policy section of `Docs/LEVEL_CONTRACT.md`. Tests: the new `older-companion-dialogue.spec.js` and baseline fixture, plus focused updates to existing ARC, progression, Leonardo and Egypt regressions for the new copy/policy and current startup.

Final validation results (2026-10-03; passing results include targeted reruns after fixture corrections):

| Check | Result |
| --- | --- |
| `older-companion-dialogue.spec.js`, desktop | 32 passed: all 238 rows plus all 31 levels' runtime behavior, real final-challenge completion, fresh visits and preserved data. |
| `arc-dialogue.spec.js`, desktop | 15 passed, including all 96 variants, exact copy, suppression and omitted-policy fallback behavior. |
| `progression-copy.spec.js`, desktop | 6 passed: prerequisites, earned progression, active versus inactive challenges, remaining counts and ordinary fallbacks. |
| `service-worker-ownership.spec.js` | 1 passed. |
| Selected existing Leonardo/Egypt/replay regressions, desktop | 6 passed: two source-bank checks, two Rome progression checks, Egypt audio/exit behavior and legacy replay/history. |
| Representative iPad landscape and portrait checks | 18 checks per orientation passed: ARC's 96 variant flows and four event tests; older levels 0001, 0002, 0004, 0008, 0014, 0016, 0021, 0022 and 0027; full ledger preservation check. |
| Final portable ledger/source-hash check | Passed again in desktop, iPad landscape and iPad portrait. |
| `node scripts/validate-levels.js` | Passed: 35 production levels and 1 developer level. |
| `node --check` and `git diff --check` | Passed for changed JavaScript and the final diff. |

The existing Leonardo/Egypt checks assumed four active Rome challenges and an active Anubis challenge; those assumptions were already false in the pre-edit source. Assertions now explicitly retain the actual inactive state. Their startup helpers enter through the current intro. The Egypt audio/exit regression reuses one application session across level switches, retaining its original checks without increasing the timeout. The data-only snapshot test was rerun after normalizing Git line endings in both the fixture and assertion. No product changes were made to address these test-fixture issues.

Before a future hint migration, resolve the two deferred editorial rows and decide how the three retained destination lines should reflect configured routes. Do not automatically enable/reorder worlds or migrate any hints as part of this task.
