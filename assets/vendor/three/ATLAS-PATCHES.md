# Atlas patches to Three.js r180

## TextureSizeNode and multisampled depth (reapplied 2026-09-09)

The v150 baseline restoration reverted this fix. A real Chromium WebGPU test of v154 now reproduces two rejected fragment_GTAO shaders while Atlas nevertheless reports ready. The shader compilation messages report an invalid textureDimensions(texture_depth_multisampled_2d, 0) call. The GPU validation test failed before the correction.

In three.webgpu.min.js, TextureSizeNode.generate (minified class il) now omits the mip-level argument when the WebGPU backend reports primarySamples > 1 for the texture. Single-sample textures and WebGL retain their mip-level argument.

WGSL multisampled textureDimensions accepts only the texture argument: https://www.w3.org/TR/WGSL/#texturedimensions

This preserves MSAA, depth samples, GTAO, shadows and scene content. It does not change render target quality. Check upstream TextureSizeNode before carrying this patch to another Three.js version.

The GPU-pressure regression now checks native shader compilation messages and uncaptured GPU errors, in addition to rendered pixel changes, sustained gameplay and renderer recovery. Physical Safari stability remains a separate hardware validation requirement.
