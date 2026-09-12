# Current Atlas renderer implementation — local v168 Atlas evening delta (FXAA retained)

Verified against source on 2026-09-12. v158 is a deliberately conservative
physical-tablet stability baseline, not the final visual-quality target. It retains
the v156 compact presentation, GPU fencing, cleanup and recovery work, and the
v157 RangeError evidence capture. The user reports the unchanged faceted baseline passed physical iPad testing; the new mode separation still requires physical acceptance.
Neither device pressure nor the original physical RangeError's cause is proven.
See [the prior investigation](3d-tablet-range-investigation.md) and `AGENTS.md`.

## Graphics modes and rendering

`src/graphics-modes.js` is the product source of truth for labels, groups, availability, selected state, world asset and rendering configuration. Graphics contains:

- Renderer: Illustrated, Cinematic.
- Experimental: Voxel, Real 3D, Atlas 3D.

Real 3D (`3d`, preserving the saved identifier) is the original heavy world, desktop/laptop only, using Desktop High. Tablets/phones see a disabled button with “Desktop only”. The central settings normalizer rejects unsupported choices, including saved and programmatic selections, with Illustrated fallback before any heavy-world request. Renderer query overrides cannot bypass availability.

Atlas 3D (`atlas-3d`) is the faceted world, with the v162 art pass and [v163 calm foliage revision](atlas-foliage-pass.md). This new asset still needs physical iPad acceptance. It uses **one canonical Atlas 3D configuration** on every device, with the exact conservative values in the table below. Desktop is the authoritative visual development/QA preview for iPad Atlas 3D: no automatic desktop uplift, no device-selected quality variant, and no rendererPreset override. Desktop Atlas uses the existing asynchronous desktop scheduler, two Draco workers and concurrent dependencies. Its batched GPU warm-up, sequential uploads and three small views remain shared with tablet to preserve the verified visual output. Tablets retain sequential compact preparation, three small warm-up views and one in-flight GPU frame. Presentation remains one sample without default depth on both; world depth, texture cap and all quality values are independent of execution. Input and lifecycle behavior may still follow platform capabilities.

The existing centralized `AtlasThreePresets.detectDevice` / session device classification remains the source of truth: explicit iPad identity, touch-capable Mac platform (desktop-style iPad Safari), browser tablet form factor, Android touch/screen signals, and large coarse/no-hover touch screens. Phone signals classify handhelds; other devices are desktop. Detection remains heuristic and session-stable. Its older preset selector remains available for isolated legacy diagnostics/tests but does not select product world quality.

World mappings and export instructions: [3D world modes](3d-world-modes.md). The user reports the conservative faceted baseline worked for multiple minutes and through physical iPad lock/unlock before this separation; local WebGPU QA is not a new physical-Safari acceptance claim.

## Platform and ownership

Atlas's 16-object preparation batches order caster-only meshes before world
receivers. This keeps the NPC's lazy shadow shader in a receiver-containing
batch, rather than deferring it to a camera warm-up view. It does not add GPU
work or change the batch limit. The strict 1770×1101 pipeline test caught this
case with the v161 group count and passes after the ordering correction.

- Existing Blender → GLB → Three.js/WebGPU pipeline. First-person 3D supports LVL-0001 only. Other levels retain their existing renderer behavior.
- Vendored Three.js r180, WebGPURenderer, TSL node materials and PostProcessing. The application requires the WebGPU backend; a WebGL fallback is not accepted as the 3D mode.
- Illustrated, Voxel and Cinematic Lighting remain separate existing modes. Cinematic/Voxel share the capability broker's device. 3D disposes their resources and relinquishes that device before requesting its own.
- 3D explicitly owns and destroys its device. Generation guards reject stale completion callbacks. Cancellation, failure and pagehide dispose resources; persisted pageshow can initialize again.

## Assets and scene

- Level models: Levels/LVL-0001/3d/real-3d.glb and atlas-3d.glb (only the selected world loads); route and landmarks: route.json. GLTFLoader plus Draco WASM decoding.
- Compact devices use one Draco worker and sequential texture/mesh dependency loading. Desktop permits two workers.
- Real meshes retain 12-unit X/Z cells. Atlas uses `AtlasWorldPolicy`: 32-unit cells for repeated opaque nature, 12 for other content and alpha materials. Geometry, material and shadow eligibility form the grouping key. Bounds are recomputed for frustum culling. v166 retains the five supplied Poly Pizza foliage sources as shared meshes: 80 Pine1, 165 Fern and 90 Flower1/2/3 instances, with original materials. Grass adds 4,000 instances of one 256-triangle grass2-derived mesh with one opaque vertex-color material and no textures. Grass uses the existing 32-unit spatial groups, receives shadows, and does not cast individual shadows. See [the grass/pine report](atlas-grass-pines.md). Curated ferns and flowers follow the existing groundcover shadow exclusion; pines cast shadows. Old custom root collars are removed. The runtime does not stream level chunks or provide a separate iPad asset set.
- Real 3D retains original material textures and anisotropy 8. Atlas 3D bounds each decoded GLB image to a 1024-pixel long edge before use (sequential dependencies on tablets), preserving aspect ratio and never upscaling. Raw-channel ImageBitmap resizing preserves texture color-space metadata, alpha, packed PBR channels, samplers and UV transforms. Source assets are untouched. Shared texture Sources are resized once; original ImageBitmaps close immediately after replacement. Compact static resized pixels close after all sampler/color-space variants upload and complete their GPU fence. NPC canvas dimensions also respect the cap; live pixels remain available for animation.
- HDR environment: qwantani_sunset_puresky_2k.hdr. NPC uses a camera-facing textured plane with a persistent CanvasTexture. Flames use crossed animated translucent planes.

## Camera, route and input

- Perspective camera: 64-degree vertical FOV, near 0.06, far 220; eye height 1.58 from route.json.
- First-person route-constrained forward/back movement, nominal speed 2.7 world units/second; yaw/pitch looking. This is not a free-roaming physics or navmesh controller.
- Desktop: W/S or up/down for walking, A/D or left/right for turning, mouse drag to look, E to interact.
- Touch: left stick for forward/back movement and turning, independent drag-look finger, contextual interaction button. Compact Safari path uses native touch identifiers; movement and look can coexist.
- Input requires ready gameplay. Gesture suppression stays on gameplay surfaces/controls; ordinary Atlas navigation and challenge forms retain their handlers.

## Render targets and effects

| Setting | Real 3D / Desktop High | Atlas 3D / canonical on all devices |
| --- | --- | --- |
| World MSAA | 4 samples | **1 sample** |
| Volume/effect MSAA | 4 samples | 1 sample |
| Render DPR cap | 1.5 | 0.75 |
| Directional shadow map | 4096×4096 | 1024×1024 |
| Volumetric resolution | Quarter width and height | Off; no volume or blur targets |
| Volumetric raymarch steps | 80 | 0 |
| GTAO | Enabled, half width/height, radius 0.42, blend 0.3 | Disabled; no GTAO node, targets or shaders created |
| Bloom | Enabled | Off; no bloom nodes/targets |
| Texture anisotropy target | 8 | 2 |
| Texture long edge | Source resolution | Maximum 1024, no upscaling |
| HDR input | 2048×1024 | 512×256 linear half-float |
| Derived environment PMREM atlas | 1536×2048 | 384×512 |

**MSAA exception:** the requested approximate 2× world baseline cannot be represented by WebGPU. Valid texture sample counts are 1 or 4 ([WebGPU texture validation](https://www.w3.org/TR/2022/WD-webgpu-20220613/#dom-gpudevice-createtexture)); vendored Three r180 also maps counts below 4 to 1. Atlas 3D explicitly uses and reports 1×, avoiding an invalid descriptor or hidden promotion to 4×. This can make foliage/geometry edges less smooth. The MSAA constraint does not alter source assets.

Desktop retains the existing quarter-resolution volume, Gaussian blur, GTAO and bloom chain. Atlas 3D constructs none of these effects. Its world, lighting, shadows and tone mapping remain active. The choice is fixed by the session preset, not FPS or iPad model.

The faceted forest pass excludes small groundcover from casting separate Atlas 3D shadows; it still receives shadows. Trees, rocks and architecture retain shadow casting. Shadow normal bias scales with texel footprint (`0.025 * 4096 / shadowSize`): Real 3D remains 0.025, Atlas 3D uses 0.1 to avoid self-shadow striping on broad facets. Renderer quality settings otherwise remain unchanged.

| Component | Current implementation |
| --- | --- |
| Resolution | Canvas CSS size multiplied by min(devicePixelRatio, preset DPR cap, 1920/CSS width); no adaptive FPS-based scale |
| Final fullscreen presentation | Atlas on all devices: one sample and no default depth attachment; Real/Desktop High: four samples with the existing depth attachment |
| World depth | Retained; compact volumetric depth sampling, when enabled, references its producer |
| Sun shadows | Preset map resolution; static reuse with recentering after over 0.4 units in Real, 0.8 in Atlas. Atlas broad-leaf groundcover joins the non-casting small-plant set; trees, rocks, shrubs and architecture still cast. |
| Other lighting | Hemisphere, warm directional bounce, rune and brazier point lights |
| Tone mapping | ACES filmic, exposure 1.2 |
| Scene fog | Exponential squared, colour #dbc294, density 0.009 |
| Volumetric light | VolumeNodeMaterial, preset steps/resolution, existing directional scattering and shadow sampling |
| Composition | World multiplied by AO contribution when enabled, plus Gaussian-blurred volume at 0.3 strength, then bloom when enabled |
| Bloom | Strength 0.16, radius 0.5, threshold 1.15 |

The retained Three.js TextureSizeNode patch uses a mip-free textureDimensions call for multisampled textures. v156 only removed redundant final-copy MSAA/depth attachments on compact devices; that optimization remains intact. v158 reduces tablet rendering settings as listed above, while Desktop High retains the existing quality.

At a 1180×734 CSS viewport and devicePixelRatio 2, Desktop High produces a 1770×1101 buffer, while Atlas 3D produces 885×551 after rounding. Separate 1770×1101 buffer coverage uses a 2360×1468 CSS viewport at the 0.75 cap. The cap is not a fixed pixel size.

## Readiness and rendering loop

Five real milestones: engine startup; models/world; materials/textures; GPU/effect warm-up; first playable full-resolution frame. Progress changes after completed work, not by timer.

Atlas GPU warm-up on both device classes uploads static textures sequentially with GPU fences, prepares actual world/shadow passes in batches of 16 visible draw objects, and renders three route views with a maximum warm-up dimension of 512 pixels. Real/Desktop High retains compileAsync and 18 route/look samples. Both finish with a full-resolution frame and GPU completion before revealing the canvas.

Compact gameplay permits one in-flight GPU frame and schedules the next after completion. Its foreground completion watchdog is 15 seconds and defers while the document is hidden. Desktop uses its existing animation-frame loop. Important preparation GPU operations have 90-second watchdogs; waiting labels name the current operation. These are failure deadlines, not progress estimates.

## Failures and diagnostics

- Native uncapturederror and device.lost are handled during preparation and gameplay. Failure releases resources and exposes Illustrated recovery. Runtime failure preserves the five completed preparation milestones.
- The normal small HUD shows frame-rate, CPU frame time and last total preparation time; it does not intercept input. CPU time is not a GPU execution-time measurement.
- debug3d=1 enables the preparation journal and input diagnostics. The top of the overlay reports device class, preset, world/effect/presentation sample counts, DPR cap, shadow map, GTAO, volume resolution/steps, bloom and anisotropy. v156's JavaScript device.destroy tracking still distinguishes calls before loss from subsequent cleanup.
- debug3d=1 plus debug3dgpu=1 opts into heavier shader/pipeline scopes and profiling. These are not the normal production path.
- Canvas unconfiguration, Three.js resource disposal, owned-device destruction and stale-callback guards support mode recovery. The app cannot restart Safari's shared GPU process if Safari stops returning adapters.

## v158 acceptance

The conservative baseline and its validation evidence are documented in
[v158-tablet-baseline.md](v158-tablet-baseline.md). The dedicated real-WebGPU tablet
acceptance completes both viewport cases, all three warm-up views, final GPU
completion, native movement/look, sustained rendering, Illustrated/Cinematic
recovery and a second 3D entry. Actual raster/PMREM allocations are checked, not
only preset metadata. Physical Safari acceptance remains outstanding.

## Historical v157 acceptance

See `3d-presentation-memory.md` for historical v156 validation. Local v157 validation completed on 2026-09-10: **74 checks passed**.

- 18 focused tests in `tests/three-presets.spec.js`: tablet/desktop detection, desktop-style iPad Safari, trackpad/split view, Android, touchscreen laptops, immutable session selection, overrides and exact preset parameters.
- 40 WebKit checks across iPad portrait/landscape: normal navigation, Menu/Terug, start/level selection, forms, native touch identifiers, isolated loading/player state, cancellation, device ownership and recovery.
- 16 Chromium/WebGPU checks: the automatic Tablet Optimized success case plus the 15-test sequential regression run. Both presets passed injected stalls, validation failures and device loss, with one live device and successful Cinematic recovery. Desktop High retained the v156 compact 1770×1101 test path; Tablet Optimized passed both 1180×734 and 1770×1101 buffers, native touch plus look, resize, hidden preparation/readiness and post-navigation re-entry. Desktop route movement completed all three challenges and unlocked the gate; Illustrated/Voxel/Cinematic switching and unsupported-level fallback passed.
- Native GPU descriptors confirmed one-sample compact presentation, 1/4 world samples, 2048/4096 shadows and 4/8 anisotropy for Tablet/High respectively. Captured tablet warm-up pipelines all used one sample; no GTAO shader was created. Actual effect nodes reported bloom enabled and volume at 25% / 40 steps. No native shader compilation or validation errors occurred in the normal pressure-test paths.
- The full-size tablet preparation retained sequential uploads, bounded shadow batches, three small hidden views, the full-size final frame gate and release of 978,586,968 bytes of decoded source images. This is released CPU image data, not a measurement of total GPU/process memory.
- Runtime screenshot inspected: preset settings remain visible at the top of the debug overlay. Production debug-disabled checks passed. JavaScript syntax checks and `git diff --check` passed.

GPU tests ran sequentially with `ATLAS_WEBGPU_QA=1`, `ATLAS_EDITOR_URL=http://127.0.0.1:4173`, project `desktop-chromium`, and one worker. Coverage is in `three-gpu-pressure`, `three-preparation`, `three-renderer`, `three-cleanup` and `three-page-lifecycle` specs. WebKit tests additionally cover `ipad-startup`, `three-native-input`, `three-loading-isolation` and `webgpu-capabilities`. Generated evidence is under `test-results/` and `qa-screenshots/usability/` (not production assets).

These checks cannot establish physical Safari GPU stability. Source textures and geometry remain substantial, and browser/GPU-process pressure may still occur. A more conservative render-target baseline reduces demand but is not proof of the cause or a guarantee of recovery from a failed Safari GPU process.

For physical acceptance after deployment, use `https://svenakkerman.nl/?debug3d=1` and select **Atlas 3D**. Verify **tablet · Atlas 3D**, world/effects/presentation **1×/1×/1×**, DPR **0.75**, shadows **1024**, GTAO/volume/bloom **uit**, texture cap **1024**, anisotropy **2**, HDR **512×256**, PMREM **384×512**. Real 3D must be visibly disabled. Test Illustrated → Cinematic → Atlas 3D, all five stages, movement/look/interaction, lock/unlock, then Illustrated → Cinematic → Atlas 3D again. The production URL does not serve these local changes until authorized deployment.

## Canonical Atlas HDR and resource budget (retained from v158)

Atlas 3D still decodes the existing 2K HDR file: this small transient CPU allocation
has not been eliminated by pretending that the source file is lower resolution.
Immediately after decoding, linear box filtering creates a 512×256 half-float
image and replaces the full-resolution data. The existing sky and reflection
textures share that smaller CPU Source. The active material path derives a PMREM cube-UV atlas of 384×512 instead of
1536×2048; the actual GPU allocations are asserted in acceptance QA. Environmental lighting stays
on, with the existing intensity/rotation. After final GPU completion, the shared
HDR CPU data is released; dimensions and uploaded GPU representations remain.
Real 3D keeps its original HDR path and source lifetime.

At the same CSS viewport, 0.75² gives 56.25% of v157 full-size target pixels
(43.75% fewer before rounding). Shadows have 75% fewer pixels. Removing volume,
blur and bloom eliminates their targets and work entirely. HDR input and derived
PMREM pixels each fall by 93.75%. These are allocation estimates, not a measurement
of Safari's total GPU memory or a guarantee against device loss.

For each raster image, base-level bytes fall in proportion to
`min(1,1024/longEdge)²`, with integer aspect-ratio rounding. A 2048² map falls by
75%, a 4096² map by 93.75%; maps already at/below 1024 do not change. Uncompressed
RGBA8 mip-chain estimates use 4 bytes/pixel × 4/3. Runtime `textureBudget` records
unique decoded image bytes before/after resize and promptly released originals;
it does not pretend to measure driver overhead or exact GPU storage.

Diagnostic output reports preset DPR/MSAA/shadows, volume and bloom off, texture
cap/anisotropy and HDR/PMREM sizes. The existing debug-only original exception,
copy-range, device-loss and intentional-destruction evidence remains intact.

## Desktop execution diagnosis

See [matched performance investigation](3d-execution-performance.md). `debug3d=1&profile3d=1` opts into bounded per-frame submission/CPU/draw instrumentation exposed in `threeRenderer.snapshot().performanceProfile`; `operationTimings` contains inclusive preparation operation wall times. There are no extra profiling GPU fences or readbacks. Pure GPU execution time and separate frustum-culling time are not exposed by this capture. Production profiling is disabled.

An experiment using full-world async compilation was rejected: it initially exposed a depth-attachment mismatch, and correcting that still changed the shadow image. Atlas therefore retains its existing batched GPU preparation on both device classes. Only desktop dependency concurrency and frame scheduling change. The real-WebGPU world-switching test checks that desktop gameplay adds no queue fences; compact tablet tests retain their original three-view pipeline and GPU-frame fencing.

## Atlas-only v162 art lighting

The world policy owns art lighting independently of device presets. Atlas uses sun `#ffcf8f`, intensity 6, offset `[-32,48,35]`; hemisphere sky `#b7cce6`, ground `#283c22`, intensity 2.2; warm bounce `#edbc7c`, intensity 1.2; exposure 1.12; shadow intensity 0.75; fog `#d7c49b`, exponential density 0.014; sky tint `[0.24,0.27,0.32]`. Real retains its previous values. No new post-processing passes, sample counts, targets or texture limits are introduced. A static haze-sheet experiment was rejected and removed.

Atlas floor now uses one packed 256x256 painted soil/moss map with constant roughness 0.94, replacing the photographic floor diffuse/normal/roughness combination in this world only. Source images and the Real checkpoint are unchanged. See the art report for composition, grounding and validation evidence.

The v164 update replaces only the two Atlas fern meshes; renderer settings are unchanged. See [fern review](atlas-reference-ferns.md).

v165 supersedes that foliage with the supplied Fern, Pine1 and Flower1/2/3 assets. See [curated foliage](atlas-curated-foliage.md). Renderer presets, lights, texture budget, preparation and GPU ownership are unchanged. This is one shared world on desktop/tablet; physical iPad acceptance remains outstanding for the new content.

## v167 Atlas-only morning/FXAA integration

Atlas adds the official r180 FXAANode after explicit ACES/sRGB conversion; automatic final color conversion is disabled only on this branch. It retains 1x world and presentation rendering. Its one additional RGBA8 RTT has no depth or multisampling, follows current render dimensions, and explicitly releases its target and quad material on cleanup. FXAA defaults on everywhere; `?debug3d=1&atlasFxaa=0` disables it, `atlasFxaa=1` enables it. Real 3D is unchanged.

The main Atlas sun offset is [-10,23,-60] (20.7 degree elevation), pale gold #fff0cf. Hemisphere and bounce are cool; no additional shadow-casting light or effect is added. The existing dome uses a cheap gradient/disc shader derived from that identical sun offset; the HDR still supplies low-intensity environment lighting but no longer paints the visible Atlas sky. The disc radius is 0.65 degrees, with a controlled 4 degree halo.

The shared floor material has one embedded 512px tiling soil/moss/needle map, roughness .94, no normal/displacement/extra packed map. Geometry, foliage, UVs, route, budgets and execution/lifecycle are unchanged. Debug preparation reports FXAA, morning direction and active floor material. See [measurements and visual report](atlas-morning-pass.md).

## v168 current Atlas evening delta

Supersedes the v167 morning art settings; FXAA and renderer execution remain unchanged. Atlas uses warm sun `#ffd49a`, intensity 7, offset `[-38,24,-52]` (20.4 degrees), hemisphere `#b6c7d8` / `#403a27` at 1.9, bounce `#e7bd8c` at 0.8, exposure 1.12 and fog `#dbc5a1` at 0.0115. The same light offset drives the existing sky disc; no extra lights/effects/targets were added.

The previous striped floor is replaced by `assets/textures/atlas-evening-floor-512.png`, one embedded 512px color map, roughness .94. Four supplied rock variants share one 512px opaque palette. Foliage counts stay 80 pines, 165 ferns, 90 flower groups and 4000 grass patches; targeted rune/temple/rock contact corrections are recorded in `atlas-evening-ledger.json`. See [delta report and comparisons](atlas-evening-pass.md). Physical iPad verification remains required.

## v169 Atlas palette and sky

Retains every v168 lighting/preset/target/texture-budget value. Moss vertex colours
on shared Atlas rocks are darker olive; foliage colours and geometry are unchanged.
The existing sky-dome shader adds soft static cloud ribbons and a cooler upper-sky
gradient, with no new textures, targets, passes or lights. The sun disc still uses
the real light direction. See [cohesion review](atlas-cohesion-pass.md).
