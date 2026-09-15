# Atlas documentation archive

These documents are historical and non-authoritative. Canonical current documentation lives in the active `Docs/` root and [AGENTS.md](../../AGENTS.md). Historical measurements, configurations, hashes, task instructions and test outcomes must not be treated as current behavior or pending work.

## Current contracts

- [Development workflow](../DEV_TOOLS.md)
- [Level contract](../LEVEL_CONTRACT.md)
- [Learning content](../ATLAS_LEARNING_CONTENT_RULES.md)
- [Editor and effects](../EDITOR_AND_EFFECTS.md)
- [Renderer specification](../renderer-current-spec.md)

## Historical documents

### architecture

Early architecture, authoring plans and the prior handoff.

- [DECISIONS.md](architecture/DECISIONS.md)
- [GENERATION_PIPELINE.md](architecture/GENERATION_PIPELINE.md)
- [LEVEL_METADATA.md](architecture/LEVEL_METADATA.md)
- [PREPRODUCTION.md](architecture/PREPRODUCTION.md)
- [SvenAdventure-current-state-handoff.md](architecture/SvenAdventure-current-state-handoff.md)

### renderer-investigations

Renderer investigations, device evidence and superseded baselines.

- [3d-baseline-restoration.md](renderer-investigations/3d-baseline-restoration.md)
- [3d-execution-performance.md](renderer-investigations/3d-execution-performance.md)
- [3d-gpu-ownership.md](renderer-investigations/3d-gpu-ownership.md)
- [3d-gpu-validation.md](renderer-investigations/3d-gpu-validation.md)
- [3d-ipad-shader-boundary.md](renderer-investigations/3d-ipad-shader-boundary.md)
- [3d-loading-isolation.md](renderer-investigations/3d-loading-isolation.md)
- [3d-lvl-0001.md](renderer-investigations/3d-lvl-0001.md)
- [3d-page-lifecycle.md](renderer-investigations/3d-page-lifecycle.md)
- [3d-presentation-memory.md](renderer-investigations/3d-presentation-memory.md)
- [3d-shadow-preparation.md](renderer-investigations/3d-shadow-preparation.md)
- [3d-tablet-range-investigation.md](renderer-investigations/3d-tablet-range-investigation.md)
- [3d-world-modes.md](renderer-investigations/3d-world-modes.md)
- [v158-tablet-baseline.md](renderer-investigations/v158-tablet-baseline.md)

### art-passes

Completed art/performance passes with their measurement JSON and images.

- [atlas-art-pass.md](art-passes/atlas-art-pass.md)
- [atlas-cohesion-pass.md](art-passes/atlas-cohesion-pass.md)
- [atlas-cohesion-v176-review.md](art-passes/atlas-cohesion-v176-review.md)
- [atlas-composition-performance.md](art-passes/atlas-composition-performance.md)
- [atlas-curated-foliage.md](art-passes/atlas-curated-foliage.md)
- [atlas-dual-controls-lane.md](art-passes/atlas-dual-controls-lane.md)
- [atlas-evening-pass.md](art-passes/atlas-evening-pass.md)
- [atlas-final-polish.md](art-passes/atlas-final-polish.md)
- [atlas-foliage-pass.md](art-passes/atlas-foliage-pass.md)
- [atlas-golden-hour-pass.md](art-passes/atlas-golden-hour-pass.md)
- [atlas-grass-coverage-pass.md](art-passes/atlas-grass-coverage-pass.md)
- [atlas-grass-pines.md](art-passes/atlas-grass-pines.md)
- [atlas-morning-pass.md](art-passes/atlas-morning-pass.md)
- [atlas-organic-path-pass.md](art-passes/atlas-organic-path-pass.md)
- [atlas-panorama-pass.md](art-passes/atlas-panorama-pass.md)
- [atlas-path-evening-pass.md](art-passes/atlas-path-evening-pass.md)
- [atlas-premium-pass.md](art-passes/atlas-premium-pass.md)
- [atlas-reference-ferns.md](art-passes/atlas-reference-ferns.md)
- [atlas-renderer-efficiency-pass.md](art-passes/atlas-renderer-efficiency-pass.md)
- [atlas-temple-review.md](art-passes/atlas-temple-review.md)
- [faceted-forest.md](art-passes/faceted-forest.md)

### learning-reviews

Original question exports and applied review instructions, including the old CSV.

- [ATLAS_CLOCK_QUESTION_AUDIT.md](learning-reviews/ATLAS_CLOCK_QUESTION_AUDIT.md)
- [ATLAS_CLOCK_QUESTION_REVIEW.md](learning-reviews/ATLAS_CLOCK_QUESTION_REVIEW.md)
- [ATLAS_LEONARDO_CLOCK_QUESTION_AUDIT.md](learning-reviews/ATLAS_LEONARDO_CLOCK_QUESTION_AUDIT.md)
- [ATLAS_LEONARDO_QUESTION_AUDIT.md](learning-reviews/ATLAS_LEONARDO_QUESTION_AUDIT.md)
- [ATLAS_STORY_QUESTION_AUDIT.md](learning-reviews/ATLAS_STORY_QUESTION_AUDIT.md)
- [ATLAS_STORY_QUESTION_REVIEW.md](learning-reviews/ATLAS_STORY_QUESTION_REVIEW.md)

### implementation-briefs

Completed procedural, flyby and Cinematic implementation briefs.

- [ATLAS_PROCEDURAL_SCENE_EFFECTS_AND_EDITOR_SPEC_v2.md](implementation-briefs/ATLAS_PROCEDURAL_SCENE_EFFECTS_AND_EDITOR_SPEC_v2.md)
- [ATLAS_SCENE_EFFECTS_IMPLEMENTATION.md](implementation-briefs/ATLAS_SCENE_EFFECTS_IMPLEMENTATION.md)
- [ATLAS_SCENE_EFFECTS_PRESET_QUALITY_PASS.md](implementation-briefs/ATLAS_SCENE_EFFECTS_PRESET_QUALITY_PASS.md)
- [CINEMATIC_LIGHTING_LAB.md](implementation-briefs/CINEMATIC_LIGHTING_LAB.md)
- [CODEX_AMBIENT_FLYBY_AND_EDITOR_SPEC.md](implementation-briefs/CODEX_AMBIENT_FLYBY_AND_EDITOR_SPEC.md)

## Preserved QA evidence

`renderer-investigations/evidence/` preserves the audited carousel scroll, Cinematic route stacking and sky-clipping fail-before runs, including their available JSON/screenshots. These failures describe their captured baseline only. Any embedded runner instructions or test source are evidence, not instructions to execute.

`implementation-briefs/evidence/` preserves the character-controls QA report and its available named logs, including its explicitly limited legacy-test findings. No current failure status is inferred from these snapshots.

Associated images and measurement files were relocated without changing their measured contents. Other local binary backups and raw runs remain ignored in their original output directories; they are not an instruction surface. Some historical prose still records original command/output-directory names as provenance. Future learning reports belong in [reports](../../reports/README.md), not this archive or the active Docs root.
