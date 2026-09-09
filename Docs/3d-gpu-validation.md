# v155: reject invalid GPU work and preserve runtime failure state

## Physical evidence

The v154 physical iPad Air M3 retest entered 3D and moved Sven to approximately x=310, then hit the 15-second GPU completion watchdog. Illustrated remained usable; Cinematic could not get an adapter afterward. This proves the watchdog caught a gameplay stall, not that it fixed its cause.

## Reproduced defect

The pre-change Chromium WebGPU regression reported ready despite two rejected fragment_GTAO modules. Native GPUShaderModule.getCompilationInfo identified textureDimensions(texture_depth_multisampled_2d, 0) as invalid WGSL. Prior tests checked JavaScript errors, frame counters and pixel changes but did not require clean native GPU validation. An image can change even when one effect pipeline is invalid.

The restored Three.js baseline had reintroduced this known TextureSizeNode defect. The correction uses the same backend utils.getTextureSampleData(texture).primarySamples decision used by the WGSL texture declaration, and omits the mip-level argument for multisampled textures. The initial local attempt incorrectly read the backend resource record directly; validation caught that and it was corrected before release. See assets/vendor/three/ATLAS-PATCHES.md.

## Runtime changes

- Native uncapturederror is monitored in normal production, without shader wrappers or per-frame error scopes. Validation, out-of-memory and internal GPU errors abort preparation or immediately stop gameplay and release the owned device. Detailed debug instrumentation remains opt-in.
- Device loss now stops gameplay immediately even if no completion fence rejects. Deliberate Atlas disposal increments its generation before destroying the device, so the stale loss callback cannot fail a replacement runtime.
- Gameplay errors retain all five completed preparation milestones and report that 3D stopped during play. The debug journal records the failure rather than retaining '3D gereed'. Recovery instructions no longer promise automatic continuation.
- Cache version v155 includes the vendor fix. No models, textures, render dimensions, MSAA, lighting, effects, warm-up views or timeout durations were reduced or increased.

## Validation and limits

The regression now checks native shader compilation messages and uncaptured GPU errors, rendered world pixel changes, 45 seconds of additional walking, one-device ownership and Cinematic recovery. Separate cases inject a stalled fence, a real GPU validation error and device destruction. Normal navigation/touch and full preparation/desktop progression are also checked.

Physical Safari is not available in this workspace. The invalid shader is a demonstrated defect; whether it fully explains the Safari process-level hangs and adapter refusal is not established by Chromium results. Atlas cannot forcibly restart Safari's shared GPU process if that process stops providing adapters. No physical-stability guarantee or claim of a successful iPad retest is made.

## Measured preparation

Compact-strategy Chromium run: 63.5 seconds preparation, three 512x318 warm-up views, 1280x795 first playable frame. Pipeline counts were 3300 / 3302 / 3302 at the three views, and remained 3302 after movement. Released decoded image storage remained 978,586,968 bytes. These are workstation QA measurements, not expected iPad timings.

## Final QA result

39 checks passed: 32 WebKit portrait/landscape navigation, forms, native touch, loader isolation, lifecycle and device broker checks; 4 real Chromium GPU-pressure/validation/recovery cases; compact preparation and simultaneous touch; desktop route with all three challenges and exit; round-trip across 3D, Illustrated, Voxel and Cinematic plus unsupported-level fallback. Two GPU-only lifecycle cases were explicitly skipped in WebKit. The sustained-gameplay case checked actual rendered pixel changes and continued frames for 45 additional seconds with zero shader or uncaptured GPU errors.

The pre-fix native shader-validation test failed as expected. An initial local correction and a status-callback placement mistake were caught and corrected during QA; the final suites above passed. Changes are local and have not been committed or deployed by this pass.
