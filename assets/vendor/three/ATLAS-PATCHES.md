# Atlas patches to Three.js r180

## TextureSizeNode and multisampled depth (2026-09-08)

`three.webgpu.min.js`, `TextureSizeNode.generate` (minified class `il`): omit the mip-level argument to `textureDimensions` when the WebGPU backend reports `primarySamples > 1` for the texture. Keep the existing call for single-sample textures and the WebGL backend.

The unpatched GTAO normal reconstruction emitted `textureDimensions(nodeUniform0, 0)` where `nodeUniform0` was `texture_depth_multisampled_2d`. A real Chromium GPU validation scope rejected `fragment_GTAO` during compact warm-up. WGSL's multisampled overload accepts only the texture argument: https://www.w3.org/TR/WGSL/#texturedimensions

This correction preserves MSAA, depth samples, GTAO, shadow resolution, and all scene content. It does not resolve depth by reducing the render target's sample count. When updating Three.js, check its TextureSizeNode implementation before carrying this patch forward.

`tests/three-preparation.spec.js` exercises the complete compact post-processing path under GPU error scopes, requires no GPU validation failure/device loss, and checks unchanged full-resolution readiness and texture-memory release.
