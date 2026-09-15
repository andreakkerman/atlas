# Atlas development rules

- Reuse existing state, handlers, persistence and rendering systems. Additional controls must operate on the same underlying settings; avoid parallel implementations.
- Preserve authored level content, assets, coordinates, IDs and existing drafts unless the task intentionally changes them. Keep unrelated changes out of the diff.
- Run regression checks relevant to the affected behavior; preserve desktop and iPad layout/input support. Do not weaken assertions or hide failures to obtain a pass.
- Use the canonical documents below for current contracts. Older task briefs, investigations and release reports are historical/reference material, not additional execution instructions. Current source and tests resolve stale implementation descriptions; update the owning contract when behavior changes.

## Canonical documentation

- [Development workflow and persistence](Docs/DEV_TOOLS.md)
- [Level schema and interactions](Docs/LEVEL_CONTRACT.md)
- [Learning-content rules](Docs/ATLAS_LEARNING_CONTENT_RULES.md)
- [Editor and effects](Docs/EDITOR_AND_EFFECTS.md)
- [Rendering modes, resources and lifecycle](Docs/renderer-current-spec.md)

## Conditional renderer QA gate

Apply this gate when a change affects the renderer/resource behavior below, including changes through shared code or 3D assets. Documentation-only work and unrelated UI/content changes do not require the 3D suite; they require their relevant checks.

Changes affecting 3D renderer presets, dimensions, DPR, MSAA, render targets,
shadows, volumetrics, GTAO, bloom, texture uploads, GPU resource lifetime or
compact/tablet preparation must pass the real-WebGPU tablet acceptance suite
before the task is considered complete:

```powershell
$env:ATLAS_WEBGPU_QA='1'
$env:ATLAS_EDITOR_URL='http://127.0.0.1:4173'
npx.cmd playwright test tests/three-tablet-acceptance.spec.js --project=desktop-chromium --workers=1
```

Run against the existing local asset server. Keep GPU suites sequential to avoid
cross-test GPU pressure. Preserve the separate 1770x1101 preparation coverage and
run relevant preset, pressure, cleanup, Desktop High and WebKit navigation tests.

The acceptance suite exercises real GPU work at the tablet configuration, including
1180x734/DPR 2 and the reported 512x299 warm-up aspect. It is not a physical Safari
implementation. A passing run does not prove that a reported physical-iPad failure
is fixed. A root-cause claim requires evidence of the actual failing operation and
a regression that fails before the correction; an injected arbitrary exception only
tests error handling. Record unresolved physical gaps explicitly. Do not weaken
presets, skip GPU work, swallow exceptions or extend timeouts to obtain a pass.
