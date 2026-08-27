(function initAtlasVoxelRenderer(global) {
  "use strict";

  const STORAGE_KEY = "atlas.graphics.v1";
  const VERSION = 60;
  const BASE_PRESETS = Object.freeze({
    low: Object.freeze({ voxelSize: 16, renderScale: 0.72, depthStrength: 0.24, parallax: 0.028, perspective: 0.022, ambientOcclusion: 0.2, fog: 0.1, saturation: 1.02, exposure: 1.04, effectRate: 3, spriteVoxelScale: 0.86 }),
    medium: Object.freeze({ voxelSize: 11, renderScale: 0.9, depthStrength: 0.3, parallax: 0.035, perspective: 0.028, ambientOcclusion: 0.3, fog: 0.12, saturation: 1.04, exposure: 1.08, effectRate: 2, spriteVoxelScale: 1 }),
    high: Object.freeze({ voxelSize: 7, renderScale: 1, depthStrength: 0.36, parallax: 0.042, perspective: 0.034, ambientOcclusion: 0.38, fog: 0.14, saturation: 1.06, exposure: 1.12, effectRate: 1, spriteVoxelScale: 1.16 }),
    ultra: Object.freeze({ voxelSize: 5, renderScale: 1.18, depthStrength: 0.42, parallax: 0.05, perspective: 0.04, ambientOcclusion: 0.46, fog: 0.16, saturation: 1.08, exposure: 1.16, effectRate: 1, spriteVoxelScale: 1.3 })
  });
  const VOXEL_PRESETS = Object.freeze({
    low: Object.freeze({ ...BASE_PRESETS.low, voxelSize: 9, renderScale: 0.75, blockGap: 0.4, spriteVoxelScale: 1, effectGlow: 0.3 }),
    medium: Object.freeze({ ...BASE_PRESETS.medium, voxelSize: 7, renderScale: 1, blockGap: 0.4, spriteVoxelScale: 1.4, effectGlow: 0.4 }),
    high: Object.freeze({ ...BASE_PRESETS.high, voxelSize: 5, renderScale: 1.5, blockGap: 0.4, spriteVoxelScale: 1.8, effectGlow: 0.5 }),
    ultra: Object.freeze({ ...BASE_PRESETS.ultra, voxelSize: 3, renderScale: 2.25, blockGap: 0.4, spriteVoxelScale: 3.2, effectGlow: 0.7 })
  });
  const PRESETS = VOXEL_PRESETS;
  const DEFAULT_SETTINGS = Object.freeze({
    version: VERSION,
    renderer: "illustrated",
    quality: "high",
    debugView: "final",
    blockGap: 0.012,
    lightAzimuth: -0.62,
    lightElevation: 0.78,
    lightIntensity: 1.16,
    ambientLight: 0.62,
    effectGlow: 0.5,
    ...VOXEL_PRESETS.high
  });

  const CUBE_SHADER = /* wgsl */`
    struct Uniforms {
      p0: vec4f,
      p1: vec4f,
      p2: vec4f,
      p3: vec4f,
      p4: vec4f,
      p5: vec4f,
      p6: vec4f,
      p7: vec4f,
      p8: vec4f,
    };
    @group(0) @binding(0) var<uniform> u: Uniforms;
    @group(0) @binding(1) var colorTexture: texture_2d<f32>;
    @group(0) @binding(2) var depthTexture: texture_2d<f32>;
    @group(0) @binding(3) var atlasSampler: sampler;

    struct VertexOut {
      @builtin(position) position: vec4f,
      @location(0) uv: vec2f,
      @location(1) normal: vec3f,
      @location(2) depth: f32,
      @location(3) edge: vec2f,
    };

    fn cubePosition(index: u32) -> vec3f {
      let face = index / 6u;
      let vertex = index % 6u;
      let a = array<vec2f, 6>(vec2f(-1.0,-1.0), vec2f(1.0,-1.0), vec2f(-1.0,1.0), vec2f(-1.0,1.0), vec2f(1.0,-1.0), vec2f(1.0,1.0));
      let q = a[vertex];
      if (face == 0u) { return vec3f(q.x, q.y, 1.0); }
      if (face == 1u) { return vec3f(-q.x, q.y, -1.0); }
      if (face == 2u) { return vec3f(-1.0, q.y, q.x); }
      if (face == 3u) { return vec3f(1.0, q.y, -q.x); }
      if (face == 4u) { return vec3f(q.x, -1.0, -q.y); }
      return vec3f(q.x, 1.0, q.y);
    }

    fn cubeNormal(index: u32) -> vec3f {
      let face = index / 6u;
      if (face == 0u) { return vec3f(0.0, 0.0, 1.0); }
      if (face == 1u) { return vec3f(0.0, 0.0, -1.0); }
      if (face == 2u) { return vec3f(-1.0, 0.0, 0.0); }
      if (face == 3u) { return vec3f(1.0, 0.0, 0.0); }
      if (face == 4u) { return vec3f(0.0, -1.0, 0.0); }
      return vec3f(0.0, 1.0, 0.0);
    }

    @vertex fn vertexMain(@builtin(vertex_index) vertexIndex: u32, @builtin(instance_index) instanceIndex: u32) -> VertexOut {
      let grid = vec2u(u32(max(1.0, u.p0.z)), u32(max(1.0, u.p0.w)));
      let cell = vec2u(instanceIndex % grid.x, instanceIndex / grid.x);
      let cellUv = (vec2f(cell) + vec2f(0.5)) / vec2f(grid);
      let sampleUv = u.p5.xy + cellUv * u.p5.zw;
      let sampledDepth = textureSampleLevel(depthTexture, atlasSampler, sampleUv, 0.0).r;
      let isSprite = select(0.0, 1.0, u.p7.x == 1.0);
      let sceneDepth = mix(sampledDepth, u.p8.x, isSprite);
      let local = cubePosition(vertexIndex);
      let normal = cubeNormal(vertexIndex);
      let gap = 1.0 - u.p2.w;
      let cellSize = u.p4.zw / vec2f(grid);
      let thickness = mix(0.012, 0.021, sceneDepth) * u.p2.x;
      let center = u.p4.xy + cellUv * u.p4.zw;
      let relief = (sceneDepth - 0.5) * u.p2.x;
      var position = vec3f(
        -1.0 + center.x * 2.0 + local.x * cellSize.x * gap,
        1.0 - center.y * 2.0 - local.y * cellSize.y * gap,
        0.78 - sceneDepth * 0.48 + local.z * thickness
      );
      let cameraRelief = (u.p1.x - 0.22) * (sceneDepth - 0.5) * u.p2.y * 2.4;
      position.x += relief * u.p2.y + cameraRelief + local.z * thickness * u.p2.y;
      position.y += relief * u.p2.z + local.z * thickness * u.p2.z;
      if (isSprite > 0.5) {
        position.z = 0.18 - u.p8.x * 0.035 + local.z * thickness;
      }
      var out: VertexOut;
      out.position = vec4f(position, 1.0);
      out.uv = sampleUv;
      out.normal = normal;
      out.depth = sceneDepth;
      out.edge = abs(local.xy);
      return out;
    }

    fn luminance(c: vec3f) -> f32 { return dot(c, vec3f(0.2126, 0.7152, 0.0722)); }

    @fragment fn fragmentMain(input: VertexOut) -> @location(0) vec4f {
      let source = textureSample(colorTexture, atlasSampler, input.uv);
      if (u.p7.x > 0.5 && source.a < u.p7.w) { discard; }
      if (u.p7.z == 1.0) { return source; }
      if (u.p7.z == 2.0) { return vec4f(vec3f(input.depth), 1.0); }

      let lightDirection = normalize(u.p6.xyz);
      let diffuse = max(0.0, dot(normalize(input.normal), lightDirection));
      let sideShade = 0.82 + 0.18 * max(0.0, input.normal.z);
      let depthEdge = abs(dpdx(input.depth)) + abs(dpdy(input.depth));
      let occlusion = 1.0 - clamp(depthEdge * 11.0 * u.p3.y, 0.0, 0.42);
      let spriteLift = select(1.0, 1.24, u.p7.x == 1.0);
      let lighting = (u.p6.w + diffuse * u.p8.y) * sideShade * occlusion * spriteLift;
      if (u.p7.z == 3.0) { return vec4f(vec3f(lighting), 1.0); }
      if (u.p7.z == 4.0) { return vec4f(input.normal * 0.35 + 0.5, 1.0); }

      var graded = source.rgb * lighting;
      let grey = vec3f(luminance(graded));
      graded = mix(grey, graded, u.p3.z);
      graded *= u.p3.w;
      graded = graded / (graded + vec3f(0.38));
      graded = (graded - vec3f(0.5)) * 1.045 + vec3f(0.5);
      let atmospheric = clamp((1.0 - input.depth) * u.p3.x, 0.0, 0.32);
      graded = mix(graded, vec3f(0.43, 0.55, 0.58), atmospheric);
      let bevel = 1.0 - smoothstep(0.8, 1.0, max(input.edge.x, input.edge.y)) * 0.055;
      let screenUv = input.position.xy / u.p0.xy;
      let vignette = 1.0 - smoothstep(0.38, 0.78, distance(screenUv, vec2f(0.5))) * 0.14;
      graded *= bevel * vignette;
      let layerAlpha = select(source.a, source.a * 0.56, u.p7.x == 2.0);
      return vec4f(graded, layerAlpha);
    }
  `;

  // The production renderer is deliberately V1 plus one scoped feature:
  // authored effect layers can add emission. World and sprite material paths
  // otherwise compile from the unchanged V1 shader.
  const VOXEL_SHADER = CUBE_SHADER
    .replace("let gap = 1.0 - u.p2.w;", "let gap = 1.0 - u.p2.w * 0.10;")
    .replace(
      "      graded *= u.p3.w;",
      "      graded *= u.p3.w;\n      let emissionMask = select(0.0, smoothstep(0.18, 0.92, luminance(source.rgb)) * u.p8.w, u.p7.x == 2.0);\n      graded += source.rgb * emissionMask * 0.72;"
    );
  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, Number(value)));
  }

  function isVoxelRenderer(renderer) {
    return renderer === "voxel";
  }

  function presetsFor() {
    return VOXEL_PRESETS;
  }

  function normalizeSettings(value) {
    const input = value && typeof value === "object" ? value : {};
    const renderer = ["voxel", "voxel-v1", "voxel-v2", "voxel-v3"].includes(input.renderer)
      ? "voxel"
      : "illustrated";
    const presetTable = presetsFor(renderer);
    const quality = input.quality === "custom" || presetTable[input.quality] ? input.quality : "high";
    const base = { ...DEFAULT_SETTINGS, ...(presetTable[quality] || presetTable.high), ...input, renderer };
    return {
      version: VERSION,
      renderer,
      quality,
      voxelSize: clamp(base.voxelSize, 1, 10),
      renderScale: clamp(base.renderScale, 0.5, 3),
      depthStrength: clamp(base.depthStrength, 0, 0.9),
      parallax: clamp(base.parallax, 0, 0.14),
      perspective: clamp(base.perspective, -0.02, 0.14),
      blockGap: clamp(base.blockGap, 0, 0.8),
      ambientOcclusion: clamp(base.ambientOcclusion, 0, 1),
      fog: clamp(base.fog, 0, 0.65),
      saturation: clamp(base.saturation, 0.5, 1.5),
      exposure: clamp(base.exposure, 0.55, 1.6),
      lightAzimuth: clamp(base.lightAzimuth, -3.14, 3.14),
      lightElevation: clamp(base.lightElevation, 0.05, 1.5),
      lightIntensity: clamp(base.lightIntensity, 0, 2.5),
      ambientLight: clamp(base.ambientLight, 0.1, 1.5),
      effectRate: Math.round(clamp(base.effectRate, 1, 4)),
      spriteVoxelScale: clamp(base.spriteVoxelScale, 0.5, 4),
      effectGlow: clamp(base.effectGlow, 0, 1.5),
      debugView: ["final", "original", "depth", "lighting", "geometry"].includes(base.debugView) ? base.debugView : "final"
    };
  }

  function loadSettings(storage = global.localStorage) {
    try {
      return normalizeSettings(JSON.parse(storage.getItem(STORAGE_KEY)));
    } catch {
      return normalizeSettings();
    }
  }

  function saveSettings(settings, storage = global.localStorage) {
    const normalized = normalizeSettings(settings);
    try { storage.setItem(STORAGE_KEY, JSON.stringify(normalized)); } catch {}
    return normalized;
  }

  function depthCandidates(level) {
    const root = `Levels/${level.id}/assets/`;
    return [level.world?.depthMap, `${root}depthmap.png`].filter(Boolean);
  }

  async function fetchBitmap(path) {
    const response = await fetch(path, { cache: "force-cache" });
    if (!response.ok) throw new Error(`${response.status} ${path}`);
    return createImageBitmap(await response.blob(), { premultiplyAlpha: "none", colorSpaceConversion: "default" });
  }

  async function loadFirstBitmap(paths) {
    for (const path of paths) {
      try { return { bitmap: await fetchBitmap(path), path }; } catch {}
    }
    return null;
  }

  function createRuntime(options = {}) {
    let settings = loadSettings(options.storage);
    let adapter = null;
    let device = null;
    let devicePromise = null;
    let sampler = null;
    let pipelines = null;
    let context = null;
    let canvas = null;
    let msaaTexture = null;
    let depthBuffer = null;
    let uniformBuffers = [];
    let uniformCursor = 0;
    let currentLevelId = null;
    let background = null;
    let depth = null;
    let fallbackDepth = null;
    let loadToken = 0;
    let rafId = 0;
    let frameIndex = 0;
    let lastFrameAt = 0;
    let ready = false;
    let presented = false;
    let presentationPending = false;
    let status = "idle";
    let error = null;
    let spriteTextures = new Map();
    let pendingSpriteTextures = new Map();
    let spriteFallbacks = new Map();
    let effectTextures = new Map();
    let frameTimes = new Float32Array(120);
    let frameTimeIndex = 0;
    let frameTimeCount = 0;
    let cadenceTimes = new Float32Array(120);
    let cadenceIndex = 0;
    let cadenceCount = 0;
    let lastGrid = [0, 0];
    let lastSpriteCount = 0;
    const gpuCapabilities = global.AtlasWebGPUCapabilities;

    const debugIndex = () => ({ final: 0, original: 1, depth: 2, lighting: 3, geometry: 4 })[settings.debugView] || 0;
    const gpuUsage = global.GPUTextureUsage || { TEXTURE_BINDING: 4, COPY_DST: 2, RENDER_ATTACHMENT: 16 };
    const bufferUsage = global.GPUBufferUsage || { UNIFORM: 64, COPY_DST: 8 };

    function publishFrameTelemetry(shell = document.querySelector(".gameShell")) {
      if (!shell) return;
      shell.dataset.voxelFrame = String(frameIndex);
    }

    function report() {
      const shell = document.querySelector(".gameShell");
      if (shell) {
        shell.classList.toggle("voxelReady", ready && presented && isVoxelRenderer(settings.renderer));
        shell.dataset.voxelStatus = status;
        shell.dataset.voxelGeneration = settings.renderer;
        publishFrameTelemetry(shell);
      }
      options.onStatus?.(snapshot());
    }

    function snapshot() {
      let sum = 0;
      let worst = 0;
      for (let i = 0; i < frameTimeCount; i += 1) {
        sum += frameTimes[i];
        worst = Math.max(worst, frameTimes[i]);
      }
      const averageMs = frameTimeCount ? sum / frameTimeCount : 0;
      let cadenceTotal = 0;
      for (let i = 0; i < cadenceCount; i += 1) cadenceTotal += cadenceTimes[i];
      const cadenceMs = cadenceCount ? cadenceTotal / cadenceCount : 0;
      return {
        supported: Boolean(global.navigator?.gpu),
        failureCategory: error?.atlasWebGPUCategory || null,
        ready: ready && presented,
        status,
        error: error?.message || null,
        adapter: adapter ? "WebGPU adapter" : null,
        quality: settings.quality,
        renderer: settings.renderer,
        grid: lastGrid,
        sprites: lastSpriteCount,
        averageMs,
        worstMs: worst,
        cadenceMs,
        fps: cadenceMs ? 1000 / cadenceMs : 0,
        depthMap: depth?.path || null
      };
    }

    async function initializeDevice() {
      if (device && pipelines) return device;
      status = "requesting-adapter";
      report();
      if (!gpuCapabilities) throw new Error("Atlas WebGPU capability broker is unavailable.");
      try {
        device = await gpuCapabilities.requestDevice("voxel");
        adapter = global.__ATLAS_WEBGPU_SESSION__?.adapter || null;
      } catch (caught) {
        throw caught;
      }
      status = "compiling-pipelines";
      report();
      device.lost.then((info) => {
        error = new Error(`WebGPU device lost: ${info.message || info.reason}`);
        status = "device-lost";
        ready = false;
        gpuCapabilities.forgetDevice(device);
        device = null;
        report();
      });
      sampler = device.createSampler({ magFilter: "linear", minFilter: "linear", addressModeU: "clamp-to-edge", addressModeV: "clamp-to-edge" });
      device.addEventListener?.("uncapturederror", (event) => {
        console.error(`[Atlas Voxel] WebGPU validation: ${event.error?.message || event.error}`);
      });
      const format = global.navigator.gpu.getPreferredCanvasFormat();
      const compileModule = (code, label) => {
        const module = device.createShaderModule({ code, label });
        module.getCompilationInfo?.().then((info) => {
          const failures = info.messages.filter((message) => message.type === "error");
          if (failures.length) console.error(`[Atlas Voxel] ${label} WGSL compilation failed:\n${failures.map((message) => `${message.lineNum}:${message.linePos} ${message.message}`).join("\n")}`);
        });
        return module;
      };
      const voxelModule = compileModule(VOXEL_SHADER, "Voxel production shader");
      const blend = { color: { srcFactor: "src-alpha", dstFactor: "one-minus-src-alpha" }, alpha: { srcFactor: "one", dstFactor: "one-minus-src-alpha" } };
      const createCubePipelines = (module, label) => {
        const common = {
          layout: "auto",
          vertex: { module, entryPoint: "vertexMain" },
          primitive: { topology: "triangle-list", cullMode: "none", frontFace: "cw" },
          depthStencil: { format: "depth24plus", depthWriteEnabled: true, depthCompare: "less" },
          multisample: { count: 4 }
        };
        const opaque = device.createRenderPipeline({ ...common, label: `${label} opaque`, fragment: { module, entryPoint: "fragmentMain", targets: [{ format }] } });
        const alpha = device.createRenderPipeline({ ...common, label: `${label} atmospheric alpha`, depthStencil: { ...common.depthStencil, depthWriteEnabled: false, depthCompare: "always" }, fragment: { module, entryPoint: "fragmentMain", targets: [{ format, blend }] } });
        return { opaque, alpha };
      };
      try {
        pipelines = createCubePipelines(voxelModule, "Atlas Voxel");
      } catch (caught) {
        const pipelineError = new Error(`Voxel pipeline initialization failed: ${caught?.message || caught}`, { cause: caught });
        pipelineError.atlasWebGPUCategory = "renderer-initialization-failed";
        throw pipelineError;
      }
      return device;
    }

    function ensureDevice() {
      if (device && pipelines) return Promise.resolve(device);
      if (!devicePromise) devicePromise = initializeDevice().finally(() => { devicePromise = null; });
      return devicePromise;
    }

    function createTextureFromSource(source, label) {
      const width = Math.max(1, source.width || source.naturalWidth || 1);
      const height = Math.max(1, source.height || source.naturalHeight || 1);
      const texture = device.createTexture({ label, size: [width, height, 1], format: "rgba8unorm", usage: gpuUsage.TEXTURE_BINDING | gpuUsage.COPY_DST | gpuUsage.RENDER_ATTACHMENT });
      device.queue.copyExternalImageToTexture({ source, flipY: false }, { texture }, [width, height]);
      return { texture, view: texture.createView(), width, height };
    }

    function neutralDepthTexture() {
      if (fallbackDepth) return fallbackDepth;
      const pixels = new Uint8Array([128, 128, 128, 255]);
      const texture = device.createTexture({ label: "Atlas neutral depth", size: [1, 1, 1], format: "rgba8unorm", usage: gpuUsage.TEXTURE_BINDING | gpuUsage.COPY_DST });
      device.queue.writeTexture({ texture }, pixels, { bytesPerRow: 4 }, [1, 1]);
      fallbackDepth = { texture, view: texture.createView(), width: 1, height: 1, path: null };
      return fallbackDepth;
    }

    async function prepareLevel(level) {
      if (!level || !device) return;
      const token = ++loadToken;
      status = "loading-assets";
      ready = false;
      presented = false;
      presentationPending = false;
      report();
      const [colorResult, depthResult] = await Promise.all([
        loadFirstBitmap([level.world.background, level.__atlasDefaultBackground].filter(Boolean)),
        loadFirstBitmap(depthCandidates(level))
      ]);
      if (token !== loadToken) {
        colorResult?.bitmap?.close?.();
        depthResult?.bitmap?.close?.();
        return;
      }
      if (!colorResult) throw new Error(`Unable to load the world texture for ${level.id}.`);
      background?.texture?.destroy?.();
      if (depth && depth !== fallbackDepth) depth.texture?.destroy?.();
      background = { ...createTextureFromSource(colorResult.bitmap, `${level.id} color`), path: colorResult.path };
      depth = depthResult ? { ...createTextureFromSource(depthResult.bitmap, `${level.id} depth`), path: depthResult.path } : neutralDepthTexture();
      colorResult.bitmap.close?.();
      depthResult?.bitmap?.close?.();
      currentLevelId = level.id;
      frameTimeIndex = 0;
      frameTimeCount = 0;
      cadenceIndex = 0;
      cadenceCount = 0;
      lastFrameAt = 0;
      ready = true;
      status = "rendering-first-frame";
      error = null;
      report();
    }

    function configureCanvas(nextCanvas) {
      if (canvas === nextCanvas && context) return false;
      presented = false;
      presentationPending = false;
      status = "canvas-handoff";
      canvas = nextCanvas;
      context = canvas.getContext("webgpu");
      if (!context) throw new Error("The WebGPU canvas context could not be created.");
      context.configure({ device, format: global.navigator.gpu.getPreferredCanvasFormat(), alphaMode: "opaque" });
      report();
      return true;
    }

    function resizeTargets() {
      const dpr = Math.min(2, global.devicePixelRatio || 1);
      const scale = settings.renderScale;
      const width = Math.max(2, Math.round(canvas.clientWidth * dpr * scale));
      const height = Math.max(2, Math.round(canvas.clientHeight * dpr * scale));
      if (canvas.width === width && canvas.height === height && msaaTexture && depthBuffer) return;
      canvas.width = width;
      canvas.height = height;
      msaaTexture?.destroy?.();
      depthBuffer?.destroy?.();
      const format = global.navigator.gpu.getPreferredCanvasFormat();
      msaaTexture = device.createTexture({ label: "Atlas voxel MSAA", size: [width, height], sampleCount: 4, format, usage: gpuUsage.RENDER_ATTACHMENT });
      depthBuffer = device.createTexture({ label: "Atlas voxel depth buffer", size: [width, height], sampleCount: 4, format: "depth24plus", usage: gpuUsage.RENDER_ATTACHMENT });
    }

    function writeUniforms(config, targetBuffer) {
      const data = new Float32Array(36);
      data.set([canvas.width, canvas.height, config.gridX, config.gridY], 0);
      data.set([config.cameraStart, config.cameraSpan, config.time, 0], 4);
      data.set([settings.depthStrength, settings.parallax, settings.perspective, settings.blockGap], 8);
      data.set([settings.fog, settings.ambientOcclusion, settings.saturation, settings.exposure], 12);
      data.set(config.rect, 16);
      data.set(config.uvRect, 20);
      const azimuth = settings.lightAzimuth;
      const elevation = settings.lightElevation;
      data.set([Math.cos(azimuth) * Math.cos(elevation), -Math.sin(elevation), Math.abs(Math.sin(azimuth) * Math.cos(elevation)) + 0.3, settings.ambientLight], 24);
      data.set([config.mode, config.hasDepth ? 1 : 0, debugIndex(), config.alphaCut ?? 0.06], 28);
      data.set([config.layerDepth ?? 0.5, settings.lightIntensity, config.mirror ? -1 : 1, settings.effectGlow], 32);
      device.queue.writeBuffer(targetBuffer, 0, data);
    }

    function drawGrid(pass, config) {
      const colorResource = config.color || background;
      const depthResource = config.depth || depth || neutralDepthTexture();
      if (!colorResource?.view || !depthResource?.view) return;
      let targetBuffer = uniformBuffers[uniformCursor];
      if (!targetBuffer) {
        targetBuffer = device.createBuffer({ size: 16 * 16, usage: bufferUsage.UNIFORM | bufferUsage.COPY_DST });
        uniformBuffers.push(targetBuffer);
      }
      uniformCursor += 1;
      writeUniforms(config, targetBuffer);
      const pipeline = config.alpha ? pipelines.alpha : pipelines.opaque;
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: targetBuffer } },
          { binding: 1, resource: colorResource.view },
          { binding: 2, resource: depthResource.view },
          { binding: 3, resource: sampler }
        ]
      }));
      pass.draw(36, config.gridX * config.gridY, 0, 0);
    }

    function textureForImage(image, fallbackKey) {
      if (!image?.complete || !image.naturalWidth) return null;
      const assetPath = image.dataset?.assetPath || image.getAttribute?.("src") || "";
      const decodedFrame = assetPath ? global.AtlasLocomotion?.decodedImages?.get(assetPath) : null;
      const sourceImage = decodedFrame?.complete && decodedFrame.naturalWidth ? decodedFrame : image;
      const key = sourceImage.currentSrc || sourceImage.src;
      let resource = spriteTextures.get(key);
      if (!resource && !pendingSpriteTextures.has(key)) {
        const pending = createImageBitmap(sourceImage, { premultiplyAlpha: "none", colorSpaceConversion: "default" })
          .then((bitmap) => {
            const created = createTextureFromSource(bitmap, `Atlas voxel sprite ${key.split("/").pop()}`);
            bitmap.close?.();
            spriteTextures.set(key, created);
            if (fallbackKey) spriteFallbacks.set(fallbackKey, created);
            pendingSpriteTextures.delete(key);
            schedule();
            return created;
          })
          .catch((caught) => {
            pendingSpriteTextures.delete(key);
            console.warn(`[Atlas Voxel] Sprite upload failed for ${key}: ${caught?.message || caught}`);
            return null;
          });
        pendingSpriteTextures.set(key, pending);
      }
      if (resource && fallbackKey) spriteFallbacks.set(fallbackKey, resource);
      return resource || spriteFallbacks.get(fallbackKey) || null;
    }

    function visibleSpriteEntries(stageRect) {
      const entries = [];
      const add = (image, boundsElement, layerDepth, mirror = false, fallbackKey = "") => {
        if (!image || !boundsElement) return;
        const rect = boundsElement.getBoundingClientRect();
        if (rect.width < 1 || rect.height < 1 || rect.right < stageRect.left || rect.left > stageRect.right || rect.bottom < stageRect.top || rect.top > stageRect.bottom) return;
        const color = textureForImage(image, fallbackKey);
        if (!color) return;
        const normalized = [
          (rect.left - stageRect.left) / stageRect.width,
          (rect.top - stageRect.top) / stageRect.height,
          rect.width / stageRect.width,
          rect.height / stageRect.height
        ];
        entries.push({ color, rect: normalized, layerDepth, mirror, key: fallbackKey });
      };
      const actor = document.querySelector("[data-actor='sven']");
      document.querySelectorAll("[data-npc-challenge] [data-npc-sprite]").forEach((npc) => {
        const shell = npc.closest("[data-npc-challenge]");
        add(npc, shell, 0.9, Number(shell?.dataset.npcFacingScale) < 0, `npc:${shell?.dataset.npcChallenge || "unknown"}`);
      });
      // Sven's locomotion controller already resolves dedicated left/right frame assets.
      // Mirroring here used to invert the resolved visual and produced apparent moonwalking.
      add(actor, actor, 0.94, false, "actor:sven");
      document.querySelectorAll(".ambientAnimal[data-ready='true']").forEach((animal) => {
        const image = animal.dataset.frame === "closed" ? animal.querySelector(".ambientAnimalClosed") : animal.querySelector(".ambientAnimalOpen");
        add(image, animal, 0.82, animal.dataset.mirrorX === "true", `animal:${animal.dataset.ambientAnimal}`);
      });
      document.querySelectorAll(".ambientFlyby[data-active='true'][data-ready='true']").forEach((flyby) => {
        const image = flyby.dataset.frame === "b" ? flyby.querySelector(".ambientFlybyFrameB") : flyby.querySelector(".ambientFlybyFrameA");
        add(image, image, 0.72, false, `flyby:${flyby.dataset.ambientFlyby}`);
      });
      return entries;
    }

    function updateEffectTexture(effectCanvas) {
      if (!effectCanvas.width || !effectCanvas.height) return null;
      const key = effectCanvas.dataset.sceneEffectsCanvas;
      let resource = effectTextures.get(key);
      if (!resource || resource.width !== effectCanvas.width || resource.height !== effectCanvas.height) {
        resource?.texture?.destroy?.();
        resource = createTextureFromSource(effectCanvas, `Atlas voxel effects ${key}`);
        effectTextures.set(key, resource);
      } else {
        device.queue.copyExternalImageToTexture({ source: effectCanvas }, { texture: resource.texture }, [resource.width, resource.height]);
      }
      return resource;
    }

    function renderFrameUnsafe(timestamp) {
      rafId = 0;
      if (!isVoxelRenderer(settings.renderer) || !canvas?.isConnected || !device || !ready || document.hidden) return;
      const startedAt = performance.now();
      if (lastFrameAt) {
        cadenceTimes[cadenceIndex] = Math.max(0, timestamp - lastFrameAt);
        cadenceIndex = (cadenceIndex + 1) % cadenceTimes.length;
        cadenceCount = Math.min(cadenceCount + 1, cadenceTimes.length);
      }
      resizeTargets();
      const level = options.getLevel?.();
      if (!level) return;
      const stage = canvas.closest("[data-world-stage]");
      const stageRect = stage?.getBoundingClientRect();
      if (!stageRect?.width || !stageRect?.height) return schedule();
      const viewportWorldWidth = Math.max(1, options.getViewportWorldWidth?.() || level.world.viewportWidth || level.world.width);
      const cameraX = Math.max(0, options.getCameraX?.() || 0);
      const blockPx = settings.voxelSize * settings.renderScale;
      const gridX = Math.max(20, Math.ceil(canvas.width / blockPx));
      const gridY = Math.max(12, Math.ceil(canvas.height / blockPx));
      lastGrid = [gridX, gridY];
      const cameraStart = cameraX / level.world.width;
      const cameraSpan = viewportWorldWidth / level.world.width;
      const encoder = device.createCommandEncoder({ label: "Atlas voxel frame" });
      uniformCursor = 0;
      const currentTexture = context.getCurrentTexture();
      const currentView = currentTexture.createView();
      const pass = encoder.beginRenderPass({
        label: "Atlas voxel world",
        colorAttachments: [{ view: msaaTexture.createView(), resolveTarget: currentView, clearValue: { r: 0, g: 0, b: 0, a: 1 }, loadOp: "clear", storeOp: "discard" }],
        depthStencilAttachment: { view: depthBuffer.createView(), depthClearValue: 1, depthLoadOp: "clear", depthStoreOp: "discard" }
      });
      const worldRect = [0, 0, 1, 1];
      const worldUvRect = [cameraStart, 0, cameraSpan, 1];
      drawGrid(pass, { gridX, gridY, rect: worldRect, uvRect: worldUvRect, cameraStart, cameraSpan, time: timestamp / 1000, mode: 0, hasDepth: Boolean(depth?.path), layerDepth: 0.5 });

      const effectCanvases = [...document.querySelectorAll("[data-scene-effects-canvas]")];
      const shouldUploadEffects = frameIndex % settings.effectRate === 0;
      const drawEffects = (slots) => effectCanvases.filter((item) => slots.includes(item.dataset.sceneEffectsCanvas)).forEach((effectCanvas) => {
        const color = shouldUploadEffects ? updateEffectTexture(effectCanvas) : effectTextures.get(effectCanvas.dataset.sceneEffectsCanvas);
        if (color) drawGrid(pass, { color, gridX, gridY, rect: worldRect, uvRect: worldUvRect, cameraStart, cameraSpan, time: timestamp / 1000, mode: 2, alpha: true, hasDepth: true, layerDepth: 0.62, alphaCut: 0.025 });
      });
      drawEffects(["backgroundAtmosphere"]);
      drawEffects(["worldAtmosphere", "worldLight"]);

      const spriteEntries = visibleSpriteEntries(stageRect);
      lastSpriteCount = spriteEntries.length;
      spriteEntries.forEach((sprite) => {
        const spriteBlock = settings.voxelSize / settings.spriteVoxelScale;
        const spriteGridX = Math.max(3, Math.ceil(sprite.rect[2] * canvas.width / spriteBlock));
        const spriteGridY = Math.max(4, Math.ceil(sprite.rect[3] * canvas.height / spriteBlock));
        drawGrid(pass, { color: sprite.color, depth: neutralDepthTexture(), gridX: spriteGridX, gridY: spriteGridY, rect: sprite.rect, uvRect: sprite.mirror ? [1, 0, -1, 1] : [0, 0, 1, 1], cameraStart, cameraSpan, time: timestamp / 1000, mode: 1, alpha: true, hasDepth: false, layerDepth: sprite.layerDepth, mirror: sprite.mirror, alphaCut: 0.08 });
      });
      drawEffects(["foregroundAtmosphere"]);
      pass.end();
      device.queue.submit([encoder.finish()]);
      if (!presented && !presentationPending) {
        presentationPending = true;
        const submittedCanvas = canvas;
        device.queue.onSubmittedWorkDone().then(() => {
          if (canvas !== submittedCanvas || !ready || presented) return;
          presentationPending = false;
          presented = true;
          status = "ready";
          report();
          schedule();
        }).catch((caught) => {
          presentationPending = false;
          console.warn(`[Atlas Voxel] First-frame presentation check failed: ${caught?.message || caught}`);
          schedule();
        });
      }
      const frameMs = performance.now() - startedAt;
      frameTimes[frameTimeIndex] = frameMs;
      frameTimeIndex = (frameTimeIndex + 1) % frameTimes.length;
      frameTimeCount = Math.min(frameTimeCount + 1, frameTimes.length);
      lastFrameAt = timestamp;
      frameIndex += 1;
      if (frameIndex % 30 === 0) report();
      if (!presentationPending) schedule();
    }

    function renderFrame(timestamp) {
      rafId = 0;
      try {
        renderFrameUnsafe(timestamp);
      } catch (caught) {
        error = caught instanceof Error ? caught : new Error(String(caught));
        status = "frame-error";
        ready = false;
        report();
        console.error(`[Atlas Voxel] Frame failed: ${error.stack || error.message}`);
      }
    }

    function schedule() {
      if (!rafId && isVoxelRenderer(settings.renderer) && !document.hidden) rafId = requestAnimationFrame(renderFrame);
    }

    async function sync() {
      if (!isVoxelRenderer(settings.renderer)) {
        stop();
        ready = false;
        presented = false;
        presentationPending = false;
        status = "illustrated";
        report();
        return;
      }
      const level = options.getLevel?.();
      const nextCanvas = document.querySelector("[data-voxel-canvas]");
      if (!level || !nextCanvas) return;
      try {
        await ensureDevice();
        const canvasChanged = configureCanvas(nextCanvas);
        if (currentLevelId !== level.id || !background) await prepareLevel(level);
        ready = true;
        status = canvasChanged || !presented ? "rendering-first-frame" : "ready";
        report();
        schedule();
      } catch (caught) {
        error = caught instanceof Error ? caught : new Error(String(caught));
        const category = error.atlasWebGPUCategory;
        status = category === "api-unavailable"
          ? "api-unavailable"
          : category === "adapter-unavailable"
            ? "adapter-unavailable"
            : category === "device-initialization-failed"
              ? "device-initialization-failed"
              : "renderer-initialization-failed";
        ready = false;
        report();
        console.warn(`[Atlas Voxel] ${error.message}`);
      }
    }

    function stop() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
    }

    function dispose() {
      stop();
      loadToken += 1;
      background?.texture?.destroy?.();
      if (depth && depth !== fallbackDepth) depth.texture?.destroy?.();
      msaaTexture?.destroy?.();
      depthBuffer?.destroy?.();
      spriteTextures.forEach((item) => item.texture?.destroy?.());
      effectTextures.forEach((item) => item.texture?.destroy?.());
      uniformBuffers.forEach((item) => item.destroy?.());
      uniformBuffers = [];
      spriteTextures = new Map();
      pendingSpriteTextures = new Map();
      spriteFallbacks = new Map();
      effectTextures = new Map();
      background = null;
      depth = null;
      currentLevelId = null;
      context = null;
      canvas = null;
      ready = false;
      presented = false;
      presentationPending = false;
      status = "idle";
      report();
    }

    function updateSettings(patch, save = true) {
      const requestedRenderer = patch?.renderer;
      const targetRenderer = requestedRenderer || settings.renderer;
      const presetTable = presetsFor(targetRenderer);
      const presetName = patch?.quality && presetTable[patch.quality] ? patch.quality : null;
      const preset = presetName ? presetTable[presetName] : null;
      const nextSettings = { ...settings, ...(preset || {}), ...patch };
      settings = normalizeSettings(nextSettings);
      if (save) settings = saveSettings(settings, options.storage);
      report();
      if (isVoxelRenderer(settings.renderer)) sync();
      else stop();
      return { ...settings };
    }

    return {
      sync,
      stop,
      dispose,
      updateSettings,
      getSettings: () => ({ ...settings }),
      snapshot,
      invalidate: schedule,
      reset: () => updateSettings({ ...DEFAULT_SETTINGS, ...presetsFor(settings.renderer).high, renderer: settings.renderer, quality: "high" })
    };
  }

  global.AtlasVoxelRenderer = {
    STORAGE_KEY,
    PRESETS,
    VOXEL_PRESETS,
    DEFAULT_SETTINGS,
    normalizeSettings,
    loadSettings,
    saveSettings,
    depthCandidates,
    createRuntime
  };
})(window);
