# Current Atlas renderer implementation — local v156

Verified against source on 2026-09-10. This describes the implementation, not a proposed redesign. The v156 presentation-memory change is local and uncommitted. Physical iPad stability is not yet accepted.

## Platform and ownership

- Existing Blender → GLB → Three.js/WebGPU pipeline. First-person 3D supports LVL-0001 only. Other levels retain their existing renderer behavior.
- Vendored Three.js r180, WebGPURenderer, TSL node materials and PostProcessing. The application requires the WebGPU backend; a WebGL fallback is not accepted as the 3D mode.
- Illustrated, Voxel and Cinematic Lighting remain separate existing modes. Cinematic/Voxel share the capability broker's device. 3D disposes their resources and relinquishes that device before requesting its own.
- 3D explicitly owns and destroys its device. Generation guards reject stale completion callbacks. Cancellation, failure and pagehide dispose resources; persisted pageshow can initialize again.

## Assets and scene

- Level model: Levels/LVL-0001/3d/lvl0001.glb; route and landmarks: route.json. GLTFLoader plus Draco WASM decoding.
- Compact devices use one Draco worker and sequential texture/mesh dependency loading. Desktop permits two workers.
- Loaded meshes are repartitioned into InstancedMesh groups by geometry, material and 12-unit X/Z cells. Frustum culling operates on the resulting spatial instances. The runtime does not stream level chunks or provide a separate iPad asset set.
- Original material textures remain at source resolution; anisotropy is requested at 8. Runtime node materials add world-space moss blending and existing material adjustments. Static decoded ImageBitmap pixels are released on compact devices after all their GPU variants upload.
- HDR environment: qwantani_sunset_puresky_2k.hdr. NPC uses a camera-facing textured plane with a persistent CanvasTexture. Flames use crossed animated translucent planes.

## Camera, route and input

- Perspective camera: 64-degree vertical FOV, near 0.06, far 220; eye height 1.58 from route.json.
- First-person route-constrained forward/back movement, nominal speed 2.7 world units/second; yaw/pitch looking. This is not a free-roaming physics or navmesh controller.
- Desktop: W/S or up/down for walking, A/D or left/right for turning, mouse drag to look, E to interact.
- Touch: left stick for forward/back movement and turning, independent drag-look finger, contextual interaction button. Compact Safari path uses native touch identifiers; movement and look can coexist.
- Input requires ready gameplay. Gesture suppression stays on gameplay surfaces/controls; ordinary Atlas navigation and challenge forms retain their handlers.

## Render targets and effects

| Component | Current implementation |
| --- | --- |
| Resolution | Canvas CSS size multiplied by min(devicePixelRatio, 1.5, 1920/CSS width); no adaptive FPS-based scale |
| World MSAA | Four samples on compact; desktop inherits the renderer's antialiasing default |
| Volume MSAA | Four samples on compact; desktop inherits renderer samples |
| Final fullscreen presentation | Compact: one sample and no default depth attachment; desktop defaults unchanged |
| World depth | Retained; compact depth sampling explicitly references the producing world render target |
| Sun shadows | 4096×4096 directional shadow map; static reuse with recentering after camera position changes by over 0.4 units |
| Other lighting | Hemisphere, warm directional bounce, rune and brazier point lights |
| Tone mapping | ACES filmic, exposure 1.2 |
| Scene fog | Exponential squared, colour #dbc294, density 0.009 |
| Volumetric light | VolumeNodeMaterial, 80 steps, quarter width/height render resolution, existing directional scattering and shadow sampling |
| GTAO | Half width/height resolution; radius 0.42; 0.3 blend strength |
| Composition | World multiplied by AO contribution, plus Gaussian-blurred volume at 0.3 strength, then bloom |
| Bloom | Strength 0.16, radius 0.5, threshold 1.15 |

The retained Three.js TextureSizeNode patch uses a mip-free textureDimensions call for multisampled textures. No world/effect quality was reduced in v156; only the redundant final-copy MSAA/depth attachments changed. The descriptor-sized saving at the reported 1770×1101 buffer is approximately 52 MiB, not a measured Safari process-memory saving.

## Readiness and rendering loop

Five real milestones: engine startup; models/world; materials/textures; GPU/effect warm-up; first playable full-resolution frame. Progress changes after completed work, not by timer.

Compact strategy uploads static textures sequentially with GPU fences, prepares actual world/shadow passes in batches of 16 visible draw objects, and renders three route views with a maximum warm-up dimension of 512 pixels. Desktop retains compileAsync and 18 route/look samples. Both finish with a full-resolution frame and GPU completion before revealing the canvas.

Compact gameplay permits one in-flight GPU frame and schedules the next after completion. Its foreground completion watchdog is 15 seconds and defers while the document is hidden. Desktop uses its existing animation-frame loop. Important preparation GPU operations have 90-second watchdogs; waiting labels name the current operation. These are failure deadlines, not progress estimates.

## Failures and diagnostics

- Native uncapturederror and device.lost are handled during preparation and gameplay. Failure releases resources and exposes Illustrated recovery. Runtime failure preserves the five completed preparation milestones.
- The normal small HUD shows frame-rate, CPU frame time and last total preparation time; it does not intercept input. CPU time is not a GPU execution-time measurement.
- debug3d=1 enables the preparation journal and input diagnostics. v156 also records JavaScript device.destroy calls and distinguishes whether they occurred before loss.
- debug3d=1 plus debug3dgpu=1 opts into heavier shader/pipeline scopes and profiling. These are not the normal production path.
- Canvas unconfiguration, Three.js resource disposal, owned-device destruction and stale-callback guards support mode recovery. The app cannot restart Safari's shared GPU process if Safari stops returning adapters.

## Acceptance status

The bounded v156 change has passed local real-Chromium GPU checks at the physical report's 1770×1101 buffer size, native GPU validation, continued rendering after movement, injected failure recovery, compact touch/preparation, Graphics switching and WebKit UI/cleanup tests. This is not physical iPad GPU verification. The user-reported destroyed-device failure remains unproven as resolved. See 3d-presentation-memory.md for the completed validation record.
