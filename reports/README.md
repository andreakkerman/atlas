# Generated reports

Reports are review work products, not current development instructions. Canonical contracts live in [AGENTS](../AGENTS.md) and the active `Docs/` root.

Run `node scripts/leonardo-question-audit.js` from the repository root to regenerate the two Leonardo Markdown audits and question-variant CSV under `reports/learning/`. The script creates that directory if needed. These outputs describe the current authored levels at generation time; later source edits can make them stale. They do not establish editorial quality or replace level validation.

Earlier snapshots are preserved in [archived learning reviews](../Docs/archive/learning-reviews/). Regeneration must not overwrite that historical evidence.

The historical `scripts/audit-atlas-cohesion.cjs` comparison writes to `reports/renderer/atlas-cohesion-integrity.json` and creates the destination directory. It still requires its original comparison baseline; it must not overwrite archived measurements.
