# Current Atlas renderer implementation — local v157

Verified against source on 2026-09-10. This describes the implementation, not a proposed redesign. v157 adds renderer presets on top of the completed v156 presentation-memory work. Physical iPad stability is not yet accepted: the latest physical v156 report lost the device during warm-up 3/3 without a preceding JavaScript destroy call. GPU resource pressure is a leading hypothesis, not a proven cause.

## World mode versus renderer preset

Real 3D is the existing LVL-0001 world. Its geometry, assets, foliage, route, materials and content are unchanged by v157. Atlas 3D is a future alternative world/style and is not implemented here. Renderer presets configure rendering of Real 3D; they do not select or replace a world.

`src/three-presets.js` owns the immutable **Desktop High** and **Tablet Optimized** configurations. Desktop/laptop defaults to Desktop High; tablets default to Tablet Optimized. Phones also use the conservative Tablet Optimized configuration. Detection is evaluated once per page session, and does not respond to FPS, rotation, resizing or a subsequently connected input device.

Detection combines the following signals, in order:

- Explicit iPad user agent, or a Mac platform with more than one touch point (including iPadOS desktop-style Safari and an attached trackpad).
- Browser-reported Tablet form factor, where available.
- Android with multitouch and either a non-Mobile user agent or a screen short side of at least 600 CSS pixels.
- Other multitouch devices with a coarse primary pointer, no primary hover, and a screen short side of at least 600 CSS pixels. Viewport dimensions are the fallback if screen dimensions are unavailable.
- Handheld identifiers/mobile information distinguish phones; the remaining devices are desktops. A Windows touchscreen laptop with fine pointer/hover retains Desktop High.

Detection is heuristic: convertible devices that expose identical browser signals cannot be distinguished perfectly. The pure detector and selector are unit tested. For development, `?rendererPreset=desktop-high` or `?rendererPreset=tablet-optimized` explicitly selects a preset until the next page load; unknown values are ignored. Add `&debug3d=1` to show settings. An iPad forced to Desktop High still retains compact preparation and v156's one-sample, depth-free final presentation. Forcing Tablet Optimized on desktop enables the compact strategy for representative QA. Other graphics modes ignore this selection.

## Platform and ownership

- Existing Blender → GLB → Three.js/WebGPU pipeline. First-person 3D supports LVL-0001 only. Other levels retain their existing renderer behavior.
- Vendored Three.js r180, WebGPURenderer, TSL node materials and PostProcessing. The application requires the WebGPU backend; a WebGL fallback is not accepted as the 3D mode.
- Illustrated, Voxel and Cinematic Lighting remain separate existing modes. Cinematic/Voxel share the capability broker's device. 3D disposes their resources and relinquishes that device before requesting its own.
- 3D explicitly owns and destroys its device. Generation guards reject stale completion callbacks. Cancellation, failure and pagehide dispose resources; persisted pageshow can initialize again.

## Assets and scene

- Level model: Levels/LVL-0001/3d/lvl0001.glb; route and landmarks: route.json. GLTFLoader plus Draco WASM decoding.
- Compact devices use one Draco worker and sequential texture/mesh dependency loading. Desktop permits two workers.
- Loaded meshes are repartitioned into InstancedMesh groups by geometry, material and 12-unit X/Z cells. Frustum culling operates on the resulting spatial instances. The runtime does not stream level chunks or provide a separate iPad asset set.
- Original material textures remain at source resolution; anisotropy is requested at the preset target (8 desktop, 4 tablet). Runtime node materials retain world-space moss blending and existing material adjustments. Static decoded ImageBitmap pixels are released on compact devices after all their GPU variants upload.
- HDR environment: qwantani_sunset_puresky_2k.hdr. NPC uses a camera-facing textured plane with a persistent CanvasTexture. Flames use crossed animated translucent planes.

## Camera, route and input

- Perspective camera: 64-degree vertical FOV, near 0.06, far 220; eye height 1.58 from route.json.
- First-person route-constrained forward/back movement, nominal speed 2.7 world units/second; yaw/pitch looking. This is not a free-roaming physics or navmesh controller.
- Desktop: W/S or up/down for walking, A/D or left/right for turning, mouse drag to look, E to interact.
- Touch: left stick for forward/back movement and turning, independent drag-look finger, contextual interaction button. Compact Safari path uses native touch identifiers; movement and look can coexist.
- Input requires ready gameplay. Gesture suppression stays on gameplay surfaces/controls; ordinary Atlas navigation and challenge forms retain their handlers.

## Render targets and effects

| Setting | Desktop High | Tablet Optimized |
| --- | --- | --- |
| World MSAA | 4 samples | **1 sample** |
| Volume/effect MSAA | 4 samples | 1 sample |
| Render DPR cap | 1.5 | 1.0 |
| Directional shadow map | 4096×4096 | 2048×2048 |
| Volumetric resolution | Quarter width and height | Quarter width and height |
| Volumetric raymarch steps | 80 | 40 |
| GTAO | Enabled, half width/height, radius 0.42, blend 0.3 | Disabled; no GTAO node, targets or shaders created |
| Bloom | Enabled | Enabled, same existing mip chain |
| Texture anisotropy target | 8 | 4 |

**MSAA exception:** the requested approximate 2× world baseline cannot be represented by WebGPU. Valid texture sample counts are 1 or 4 ([WebGPU texture validation](https://www.w3.org/TR/2022/WD-webgpu-20220613/#dom-gpudevice-createtexture)); vendored Three r180 also maps counts below 4 to 1. Tablet Optimized explicitly uses and reports 1×, avoiding an invalid descriptor or hidden promotion to 4×. This can make foliage/geometry edges less smooth. Source assets remain unchanged.

Volume's quarter resolution means 25% on each axis, approximately 1/16 of full-resolution pixels. Bloom retains the existing reduced-resolution mip chain and settings; no additional bloom targets were introduced. GTAO and bloom are independently controlled by the preset, allowing later measured changes without device checks scattered through effect construction.

| Component | Current implementation |
| --- | --- |
| Resolution | Canvas CSS size multiplied by min(devicePixelRatio, preset DPR cap, 1920/CSS width); no adaptive FPS-based scale |
| Final fullscreen presentation | Compact: one sample and no default depth attachment; non-compact Desktop High: four samples with the existing depth attachment |
| World depth | Retained; compact depth sampling explicitly references the producing world render target |
| Sun shadows | Preset map resolution; static reuse with recentering after camera position changes by over 0.4 units |
| Other lighting | Hemisphere, warm directional bounce, rune and brazier point lights |
| Tone mapping | ACES filmic, exposure 1.2 |
| Scene fog | Exponential squared, colour #dbc294, density 0.009 |
| Volumetric light | VolumeNodeMaterial, preset steps/resolution, existing directional scattering and shadow sampling |
| Composition | World multiplied by AO contribution when enabled, plus Gaussian-blurred volume at 0.3 strength, then bloom when enabled |
| Bloom | Strength 0.16, radius 0.5, threshold 1.15 |

The retained Three.js TextureSizeNode patch uses a mip-free textureDimensions call for multisampled textures. v156 only removed redundant final-copy MSAA/depth attachments on compact devices; that optimization remains intact. v157 additionally reduces tablet rendering settings as listed above, while Desktop High retains the existing quality.

At a 1180×734 CSS viewport and devicePixelRatio 2, Desktop High produces a 1770×1101 buffer, while Tablet Optimized produces 1180×734. A 1770×1101 CSS viewport is also tested directly: Tablet Optimized produces a 1770×1101 buffer. The cap is not a fixed pixel size.

## Readiness and rendering loop

Five real milestones: engine startup; models/world; materials/textures; GPU/effect warm-up; first playable full-resolution frame. Progress changes after completed work, not by timer.

Compact strategy uploads static textures sequentially with GPU fences, prepares actual world/shadow passes in batches of 16 visible draw objects, and renders three route views with a maximum warm-up dimension of 512 pixels. Desktop retains compileAsync and 18 route/look samples. Both finish with a full-resolution frame and GPU completion before revealing the canvas.

Compact gameplay permits one in-flight GPU frame and schedules the next after completion. Its foreground completion watchdog is 15 seconds and defers while the document is hidden. Desktop uses its existing animation-frame loop. Important preparation GPU operations have 90-second watchdogs; waiting labels name the current operation. These are failure deadlines, not progress estimates.

## Failures and diagnostics

- Native uncapturederror and device.lost are handled during preparation and gameplay. Failure releases resources and exposes Illustrated recovery. Runtime failure preserves the five completed preparation milestones.
- The normal small HUD shows frame-rate, CPU frame time and last total preparation time; it does not intercept input. CPU time is not a GPU execution-time measurement.
- debug3d=1 enables the preparation journal and input diagnostics. The top of the overlay reports device class, preset, world/effect/presentation sample counts, DPR cap, shadow map, GTAO, volume resolution/steps, bloom and anisotropy. v156's JavaScript device.destroy tracking still distinguishes calls before loss from subsequent cleanup.
- debug3d=1 plus debug3dgpu=1 opts into heavier shader/pipeline scopes and profiling. These are not the normal production path.
- Canvas unconfiguration, Three.js resource disposal, owned-device destruction and stale-callback guards support mode recovery. The app cannot restart Safari's shared GPU process if Safari stops returning adapters.

## Acceptance status

See `3d-presentation-memory.md` for historical v156 validation. Local v157 validation completed on 2026-09-10: **74 checks passed**.

- 18 focused tests in `tests/three-presets.spec.js`: tablet/desktop detection, desktop-style iPad Safari, trackpad/split view, Android, touchscreen laptops, immutable session selection, overrides and exact preset parameters.
- 40 WebKit checks across iPad portrait/landscape: normal navigation, Menu/Terug, start/level selection, forms, native touch identifiers, isolated loading/player state, cancellation, device ownership and recovery.
- 16 Chromium/WebGPU checks: the automatic Tablet Optimized success case plus the 15-test sequential regression run. Both presets passed injected stalls, validation failures and device loss, with one live device and successful Cinematic recovery. Desktop High retained the v156 compact 1770×1101 test path; Tablet Optimized passed both 1180×734 and 1770×1101 buffers, native touch plus look, resize, hidden preparation/readiness and post-navigation re-entry. Desktop route movement completed all three challenges and unlocked the gate; Illustrated/Voxel/Cinematic switching and unsupported-level fallback passed.
- Native GPU descriptors confirmed one-sample compact presentation, 1/4 world samples, 2048/4096 shadows and 4/8 anisotropy for Tablet/High respectively. Captured tablet warm-up pipelines all used one sample; no GTAO shader was created. Actual effect nodes reported bloom enabled and volume at 25% / 40 steps. No native shader compilation or validation errors occurred in the normal pressure-test paths.
- The full-size tablet preparation retained sequential uploads, bounded shadow batches, three small hidden views, the full-size final frame gate and release of 978,586,968 bytes of decoded source images. This is released CPU image data, not a measurement of total GPU/process memory.
- Runtime screenshot inspected: preset settings remain visible at the top of the debug overlay. Production debug-disabled checks passed. JavaScript syntax checks and `git diff --check` passed.

GPU tests ran sequentially with `ATLAS_WEBGPU_QA=1`, `ATLAS_EDITOR_URL=http://127.0.0.1:4173`, project `desktop-chromium`, and one worker. Coverage is in `three-gpu-pressure`, `three-preparation`, `three-renderer`, `three-cleanup` and `three-page-lifecycle` specs. WebKit tests additionally cover `ipad-startup`, `three-native-input`, `three-loading-isolation` and `webgpu-capabilities`. Generated evidence is under `test-results/` and `qa-screenshots/usability/` (not production assets).

These checks cannot establish physical Safari GPU stability. Source textures and geometry remain substantial, and browser/GPU-process pressure may still occur. A more conservative render-target baseline reduces demand but is not proof of the cause or a guarantee of recovery from a failed Safari GPU process.

For physical acceptance, load v157 with `?debug3d=1` and no preset override. Verify **tablet · Tablet Optimized**, world/effects/presentation **1×/1×/1×**, DPR **1**, shadows **2048**, GTAO **uit**, volume **25% / 40**, bloom **aan**, anisotropy **4**. Test Illustrated → Cinematic → Real 3D, all five preparation stages, simultaneous movement/look and interaction for at least two minutes, then Illustrated → Cinematic and another 3D entry in the same Safari session. If it fails, retain the settings and operation/device-loss diagnostics in the screenshot.
