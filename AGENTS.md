# Renderer QA release gate

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
