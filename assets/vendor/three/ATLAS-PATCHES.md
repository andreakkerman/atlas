# Atlas patches to Three.js r180

**v150 recovery:** the patch below is currently reverted. The renderer file is byte-identical to commit `1416884`, the last physically verified iPad-loading build. This deliberately restores the tested dependency rather than carrying a later shader change into the recovery baseline. The recorded GTAO validation issue remains known; restoring this baseline is not a claim of shader-validation cleanliness. Reassess it separately after physical loading and touch movement are verified together.

## TextureSizeNode and multisampled depth (2026-09-08)

`three.webgpu.min.js`, `TextureSizeNode.generate` (minified class `il`): omit the mip-level argument to `textureDimensions` when the WebGPU backend reports `primarySamples > 1` for the texture. Keep the existing call for single-sample textures and the WebGL backend.

The unpatched GTAO normal reconstruction emitted `textureDimensions(nodeUniform0, 0)` where `nodeUniform0` was `texture_depth_multisampled_2d`. A real Chromium GPU validation scope rejected `fragment_GTAO` during compact warm-up. WGSL's multisampled overload accepts only the texture argument: https://www.w3.org/TR/WGSL/#texturedimensions

This correction preserves MSAA, depth samples, GTAO, shadow resolution, and all scene content. It does not resolve depth by reducing the render target's sample count. When updating Three.js, check its TextureSizeNode implementation before carrying this patch forward.

The current preparation regression checks baseline loading, full-resolution readiness, texture-memory release and the retained touch controller. GPU error scopes and first-visible profiling require the separate `debug3dgpu=1` opt-in in addition to `debug3d=1`; they are not part of the restored ordinary loading path.
