> Archived historical reference; not current instructions. Preserve the baseline and findings below as a record.
> Current contract: [canonical successor](../../renderer-current-spec.md).

# Atlas grass coverage — v177

Increased visible grass coverage using the existing 4,000 patches, without adding
instances, triangles, materials, textures, shadow casters or runtime work.
Only the shared Atlas grass mesh changed. All other world content and every object
placement are preserved. The preceding static-transform optimization remains intact.

## Selected change

The patch contains 16 opaque, faceted blades, totaling 256 triangles. Their thin
upper sections lose readability at the canonical 885×551 drawing-buffer size.
The selected candidate doubles the horizontal width of the two upper cross
sections of each blade. Roots, tip positions and every vertex height are unchanged;
the maximum local horizontal displacement is 1.29 cm. Normals are recalculated
offline by Blender's existing flat-shaded mesh/export path.

This makes the grass read more clearly in its existing gaps and clusters; it does
not turn deliberately bare ground into a carpet or move grass onto the path.
The authoring checkpoint was updated alongside the runtime asset. No deformation,
per-instance updates or new preparation stage was added to the renderer.

## Perceived coverage measurement

Four matched views were captured in real Chromium WebGPU at 1180×734 CSS, context
DPR 2, drawing buffer 885×551. After normal preparation, the test takes a grass-on
image and a diagnostic grass-hidden reference from the same camera. This reference
uses the existing scene and resources; it is not a production feature or hidden
preparation view. Grass does not cast shadows, so hiding it leaves the ground's
shadow map unchanged.

Each measurement covers the same 750×550 CSS crop (1,650,000 screenshot pixels).
Counted pixels differ from the reference by more than 8/255 in at least one RGB
channel. This measures visible grass contribution, including antialiasing, rather
than literal percentage of terrain planted or hardware fragment invocation count.

| View | Before | Selected | Increase |
| --- | ---: | ---: | ---: |
| Bank | 33,949 | 49,611 | 46.1% |
| Understory | 41,599 | 62,527 | 50.3% |
| Rune bank | 121,949 | 170,857 | 40.1% |
| Path | 25,335 | 39,040 | 54.1% |

At the stricter 16/255 contrast threshold, the increase is 56–70%. At 3/255 it is
30–43%. The gain is therefore not dependent on one threshold. Blade surface area
increases 63%; that is an offline geometry measurement, not a GPU-cost measurement.
Screenshots were inspected for shape, patch repetition, path readability and the
surrounding fern/flower hierarchy.

[Before](images/atlas-grass-coverage/before.png) · [After](images/atlas-grass-coverage/after.png)

## Cost and integrity

The existing sequential world benchmark profiles stationary, walking, turning and
walking while looking. It exposes tablet identity and DPR 2 through JavaScript;
its browser context is DPR 1. Its drawing buffer matches the actual-context-DPR-2
pixel and acceptance tests at 885×551. All effects and compact completion fences
remain enabled as configured in production.

| Measure | Before | Selected |
| --- | ---: | ---: |
| Grass instances | 4,000 | 4,000 |
| Shared grass triangles | 256 | 256 |
| Grass decoded vertex/index counts | 768 / 768 | 768 / 768 |
| Initial-view world draws | 405 | 405 |
| Initial-view submitted triangles | 1,596,482 | 1,596,482 |
| Scene geometries / materials / textures | 222 / 30 / 24 | 222 / 30 / 24 |
| Preparation shader modules / pipelines / fences | 891 / 872 / 59 | 891 / 872 / 59 |
| GLB bytes | 17,753,224 | 17,753,228 |

No growth in decoded attribute capacity: position, normal and color remain 768
VEC3 float values, and indices remain 768 unsigned shorts. No new alpha test,
transparency, texture upload, render target, cache or retained GPU resource.
Grass remains opaque and receives, but does not cast, shadows. Broader blades can
increase pixel shading; equal geometry counts alone do not prove equal GPU time.

Mean local frame measurements in milliseconds:

| Phase | CPU before → selected | Queue-fence wall time before → selected |
| --- | ---: | ---: |
| Stationary | 3.506 → 3.510 | 4.433 → 4.443 |
| Walking | 3.901 → 3.815 | 5.386 → 5.421 |
| Turning | 1.703 → 1.842 | 3.813 → 4.012 |
| Walking + looking | 1.944 → 1.954 | 4.123 → 4.027 |

These runs show no consistent material frame-cost increase. They do not establish
hardware GPU timing: queue completion includes CPU/driver scheduling and results
vary between runs. FPS stayed approximately 59–60 for the baseline and 59.8–60 for
the selected candidate. This is not evidence of a physical-iPad FPS improvement.

Preparation was 19.928 → 21.698 seconds in the cost runs and 19.554 → 19.301 seconds
in the separate pixel runs. The differing direction and identical preparation
inventory do not support a loading-speed claim either way. Physical iPad startup,
re-entry, thermal behavior and FPS still require hardware validation.

The export replaces only grass's existing Draco payload and its accessors. All
241 other binary buffer views are byte-identical. A protected-JSON fingerprint
verifies all nodes/transforms, materials, other meshes and texture metadata; only
grass accessors and necessary binary offsets are excluded. No whole-world re-export
was used. The recorded baseline and candidate fingerprints are in
`Levels/LVL-0001/3d/atlas-grass-coverage-ledger.json`.

All 4,000 placements were checked against paving and rune envelopes with the
broader mesh: zero conflicts. Source root vertices and all object transforms are
exactly unchanged, preserving their prior grounding. Draco retains its existing
18-bit position quantization; decoded coordinates remain subject to that precision.

## Rejected approaches

- A 3× upper-width candidate increased blade area 127% with the same counts, but
  created a new paving intersection at `Curated grass2.3591`. Rejected rather than
  moving a placement or widening the accepted path envelope.
- More instances or denser source grass would add vertex work; not pursued.
- Larger entire patches would spread roots, disturb grounding and encroach on
  existing paths/plants; not pursued.
- Alpha cards, extra ground layers, new textures, custom density shaders, LOD
  preparation and retained render bundles add complexity or pressure; not pursued.

## Validation and reproduction

Three matched cost runs and three pixel-contribution runs passed with no page/GPU
errors reported by the cost harness. All 38 release checks passed, sequentially:

- 30 budget, composition, static-transform, preset and preparation checks,
  including both real-WebGPU tablet acceptance sizes (1180×734 and 1180×689,
  true context DPR 2), two entries each, the 512×299 preparation aspect and the
  separate 1770×1101 preparation test: 4.0 minutes.
- Desktop High and tablet sustained-play/resource-pressure checks, each recovering
  to Cinematic: 2 passed, 2.5 minutes.
- Throwing disposer, warm-up cancellation, page-hide cancellation and real
  navigation/re-entry cleanup: 4 passed, 1.1 minutes.
- WebKit iPad landscape/portrait menu navigation: 2 passed, 9.5 seconds.
- Python/JavaScript syntax checks and `git diff --check`: passed.

No preset, timeout or acceptance threshold was weakened. These are local
acceptance results, not proof of physical Safari GPU stability.

Raw measurements are in `Docs/archive/art-passes/atlas-grass-coverage-measurements.json`.
The durable regression is `tests/atlas-grass-budget.spec.js`; the opt-in visual
investigation is `tests/atlas-grass-coverage.spec.js`.

To reproduce candidates, open the pre-coverage checkpoint preserved locally at
`output/grass-coverage/baseline.blend`, then run
`scripts/atlas-grass-coverage-candidates.py` in Blender. The script refuses the
already-modified checkpoint to prevent applying width twice. Run the read-only
`scripts/audit-atlas-grass-coverage.py` with `FACTOR=2` against that same checkpoint.
`scripts/patch-atlas-grass.py` patches the resulting one-mesh GLB into the baseline
world while preserving every other binary view. `scripts/atlas-grass-integrity.cjs`
records and checks the independent budget/content evidence.
