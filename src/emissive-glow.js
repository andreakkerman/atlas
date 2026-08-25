(function initAtlasEmissiveGlow(global) {
  "use strict";

  const DEFAULT_SETTINGS = Object.freeze({ enabled: false, intensity: 0.7, radius: 8, sensitivity: 0.5 });
  const VERTEX_SHADER = `#version 300 es
    precision highp float;
    out vec2 vUv;
    void main() {
      vec2 position = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
      vUv = position;
      gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
    }
  `;
  const FRAGMENT_SHADER = `#version 300 es
    precision highp float;
    uniform sampler2D uColor;
    uniform vec2 uTextureSize;
    uniform float uIntensity;
    uniform float uRadius;
    uniform float uSensitivity;
    in vec2 vUv;
    out vec4 outColor;

    float emissionMask(vec3 color) {
      float high = max(color.r, max(color.g, color.b));
      float low = min(color.r, min(color.g, color.b));
      float chroma = high - low;
      float bias = (uSensitivity - 0.5) * 0.24;
      float warm = smoothstep(0.48 + bias, 0.92 + bias, color.r)
        * smoothstep(0.08 + bias, 0.42 + bias, color.r - color.b);
      float cyan = smoothstep(0.36 + bias, 0.90 + bias, color.b)
        * smoothstep(0.04 + bias, 0.34 + bias, color.g - color.r * 0.72);
      return max(warm, cyan)
        * smoothstep(0.08 + bias, 0.42 + bias, chroma)
        * smoothstep(0.26 + bias, 0.78 + bias, high);
    }

    vec3 sampleGlow(vec2 uv) {
      vec2 texel = 1.0 / uTextureSize;
      vec3 glow = vec3(0.0);
      float weight = 0.0;
      for (int index = 0; index < 8; index += 1) {
        float angle = float(index) * 0.78539816339;
        vec2 offset = vec2(cos(angle), sin(angle)) * texel * uRadius;
        vec3 sampleColor = texture(uColor, clamp(uv + offset, vec2(0.001), vec2(0.999))).rgb;
        float mask = emissionMask(sampleColor);
        glow += sampleColor * mask;
        weight += mask;
      }
      return glow / max(1.0, weight) * min(1.0, weight * 0.28);
    }

    void main() {
      vec2 uv = vUv;
      vec3 source = texture(uColor, uv).rgb;
      float sourceEmission = emissionMask(source);
      vec3 contribution = source * sourceEmission * uIntensity * 0.26;
      contribution += sampleGlow(uv) * uIntensity * 0.30;
      outColor = vec4(contribution, 1.0);
    }
  `;

  function clamp(value, min, max) {
    return Math.max(min, Math.min(max, Number(value)));
  }

  function normalizeSettings(value) {
    const input = value && typeof value === "object" ? value : {};
    return {
      enabled: input.enabled === true,
      intensity: clamp(input.intensity ?? DEFAULT_SETTINGS.intensity, 0, 1.25),
      radius: clamp(input.radius ?? DEFAULT_SETTINGS.radius, 2, 24),
      sensitivity: clamp(input.sensitivity ?? DEFAULT_SETTINGS.sensitivity, 0, 1)
    };
  }

  function compileShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Emissive Glow shader compile failed.");
    return shader;
  }

  function createProgram(gl) {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
    gl.attachShader(program, compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Emissive Glow shader link failed.");
    return program;
  }

  function loadImage(path) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Emissive Glow background could not be loaded: ${path}`));
      image.src = path;
    });
  }

  function createRuntime(options = {}) {
    let canvas = null;
    let gl = null;
    let program = null;
    let texture = null;
    let image = null;
    let sourcePath = null;
    let loadToken = 0;

    function disposeGraphics() {
      if (gl && texture) gl.deleteTexture(texture);
      if (gl && program) gl.deleteProgram(program);
      gl = null;
      program = null;
      texture = null;
      image = null;
      sourcePath = null;
    }

    function draw() {
      const level = options.getLevel?.();
      const settings = normalizeSettings(options.getSettings?.(level?.id));
      if (!canvas || !gl || !program || !texture || !image || !settings.enabled || options.getRenderer?.() !== "illustrated") return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.useProgram(program);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.uniform1i(gl.getUniformLocation(program, "uColor"), 0);
      gl.uniform2f(gl.getUniformLocation(program, "uTextureSize"), image.naturalWidth, image.naturalHeight);
      gl.uniform1f(gl.getUniformLocation(program, "uIntensity"), settings.intensity);
      gl.uniform1f(gl.getUniformLocation(program, "uRadius"), settings.radius);
      gl.uniform1f(gl.getUniformLocation(program, "uSensitivity"), settings.sensitivity);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    async function prepare(nextCanvas, level) {
      const token = ++loadToken;
      canvas = nextCanvas;
      disposeGraphics();
      canvas = nextCanvas;
      gl = canvas.getContext("webgl2", { alpha: true, antialias: false, depth: false, premultipliedAlpha: false });
      if (!gl) throw new Error("Emissive Glow requires WebGL 2.");
      program = createProgram(gl);
      const path = level.world.background;
      const loaded = await loadImage(path);
      if (token !== loadToken || canvas !== nextCanvas) return;
      image = loaded;
      sourcePath = path;
      canvas.width = loaded.naturalWidth;
      canvas.height = loaded.naturalHeight;
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, loaded);
      draw();
    }

    function sync() {
      const level = options.getLevel?.();
      const settings = normalizeSettings(options.getSettings?.(level?.id));
      const nextCanvas = document.querySelector("[data-emissive-glow-canvas]");
      const active = Boolean(nextCanvas && level && settings.enabled && options.getRenderer?.() === "illustrated");
      if (nextCanvas) nextCanvas.hidden = !active;
      if (!active) return;
      if (nextCanvas !== canvas || level.world.background !== sourcePath) {
        prepare(nextCanvas, level).catch((error) => console.warn(`[Atlas Emissive Glow] ${error.message}`));
      } else {
        draw();
      }
    }

    function dispose() {
      loadToken += 1;
      disposeGraphics();
      canvas = null;
    }

    return { sync, draw, dispose, normalizeSettings };
  }

  global.AtlasEmissiveGlow = { DEFAULT_SETTINGS, normalizeSettings, createRuntime };
})(window);
