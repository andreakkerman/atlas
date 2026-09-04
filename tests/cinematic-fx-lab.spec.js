const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { pathToFileURL } = require("url");
const cinematic = require("../src/cinematic-settings");

const root = path.join(__dirname, "..");
const runtimeUrl = process.env.ATLAS_EDITOR_URL || `${pathToFileURL(path.join(root, "index.html"))}?dev=editor`;
const labId = "LVL-0000";

function runScript(relativePath, context) {
  vm.runInNewContext(fs.readFileSync(path.join(root, relativePath), "utf8"), context, { filename: relativePath });
}

function pngDimensions(relativePath) {
  const bytes = fs.readFileSync(path.join(root, relativePath));
  expect(bytes.subarray(1, 4).toString("ascii")).toBe("PNG");
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

function decodePNG(buffer) {
  let offset = 8, width, height, channels; const chunks = [];
  while (offset < buffer.length) { const length = buffer.readUInt32BE(offset), type = buffer.toString("ascii", offset + 4, offset + 8), data = buffer.subarray(offset + 8, offset + 8 + length); if (type === "IHDR") { width = data.readUInt32BE(0); height = data.readUInt32BE(4); channels = data[9] === 6 ? 4 : 3; } if (type === "IDAT") chunks.push(data); offset += length + 12; }
  const raw = require("zlib").inflateSync(Buffer.concat(chunks)), stride = width * channels, output = Buffer.alloc(height * stride); let cursor = 0;
  for (let y = 0; y < height; y++) { const filter = raw[cursor++]; for (let x = 0; x < stride; x++) { const at = y * stride + x, a = x >= channels ? output[at - channels] : 0, b = y ? output[at - stride] : 0, c = y && x >= channels ? output[at - stride - channels] : 0, p = a + b - c, pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c); output[at] = (raw[cursor++] + (filter === 1 ? a : filter === 2 ? b : filter === 3 ? Math.floor((a + b) / 2) : filter === 4 ? (pa <= pb && pa <= pc ? a : pb <= pc ? b : c) : 0)) & 255; } }
  return { data: output, channels, width, height };
}

function regionDelta(before, after, box) {
  before = decodePNG(before); after = decodePNG(after); let sum = 0, count = 0;
  for (let y = Math.max(0, Math.floor(box.y)); y < Math.min(before.height, Math.ceil(box.y + box.height)); y++) for (let x = Math.max(0, Math.floor(box.x)); x < Math.min(before.width, Math.ceil(box.x + box.width)); x++) { const at = (y * before.width + x) * before.channels; for (let channel = 0; channel < 3; channel++) { sum += Math.abs(before.data[at + channel] - after.data[at + channel]); count++; } }
  return sum / Math.max(1, count);
}

function differenceCoverage(before, after, box, threshold = 2) {
  before = decodePNG(before); after = decodePNG(after); let changed = 0, count = 0;
  for (let y = Math.max(0, Math.floor(box.y)); y < Math.min(before.height, Math.ceil(box.y + box.height)); y++) for (let x = Math.max(0, Math.floor(box.x)); x < Math.min(before.width, Math.ceil(box.x + box.width)); x++) { const at = (y * before.width + x) * before.channels; let peak = 0; for (let channel = 0; channel < 3; channel++) peak = Math.max(peak, Math.abs(before.data[at + channel] - after.data[at + channel])); changed += peak > threshold ? 1 : 0; count++; }
  return changed / Math.max(1, count);
}

function darkDifferenceCoverage(before, after, box, threshold = 2, maxLuminance = 90) {
  before = decodePNG(before); after = decodePNG(after); let changed = 0, dark = 0;
  for (let y = Math.max(0, Math.floor(box.y)); y < Math.min(before.height, Math.ceil(box.y + box.height)); y++) for (let x = Math.max(0, Math.floor(box.x)); x < Math.min(before.width, Math.ceil(box.x + box.width)); x++) {
    const at = (y * before.width + x) * before.channels;
    const luminance = before.data[at] * 0.2126 + before.data[at + 1] * 0.7152 + before.data[at + 2] * 0.0722;
    if (luminance > maxLuminance) continue;
    let lift = 0; for (let channel = 0; channel < 3; channel++) lift = Math.max(lift, after.data[at + channel] - before.data[at + channel]);
    changed += lift > threshold ? 1 : 0; dark++;
  }
  return changed / Math.max(1, dark);
}

function translatedEffectError(beforeA, afterA, beforeB, afterB, box, shiftBX = 0) {
  beforeA = decodePNG(beforeA); afterA = decodePNG(afterA); beforeB = decodePNG(beforeB); afterB = decodePNG(afterB);
  let error = 0, signal = 0, count = 0;
  for (let y = Math.max(0, Math.floor(box.y)); y < Math.min(beforeA.height, Math.ceil(box.y + box.height)); y++) {
    for (let x = Math.max(0, Math.floor(box.x)); x < Math.min(beforeA.width, Math.ceil(box.x + box.width)); x++) {
      const bx = x + shiftBX;
      if (bx < 0 || bx >= beforeB.width) continue;
      const atA = (y * beforeA.width + x) * beforeA.channels, atB = (y * beforeB.width + bx) * beforeB.channels;
      for (let channel = 0; channel < 3; channel++) {
        const deltaA = afterA.data[atA + channel] - beforeA.data[atA + channel];
        const deltaB = afterB.data[atB + channel] - beforeB.data[atB + channel];
        error += Math.abs(deltaA - deltaB); signal += Math.abs(deltaA); count++;
      }
    }
  }
  return { error: error / Math.max(1, count), signal: signal / Math.max(1, count) };
}

function fractionalTranslatedEffectError(beforeA, afterA, beforeB, afterB, box, shiftBX) {
  beforeA = decodePNG(beforeA); afterA = decodePNG(afterA); beforeB = decodePNG(beforeB); afterB = decodePNG(afterB);
  const deltaAt = (before, after, x, y, channel) => {
    const x0 = Math.floor(x), x1 = Math.min(before.width - 1, x0 + 1), mix = x - x0;
    const at0 = (y * before.width + x0) * before.channels + channel, at1 = (y * before.width + x1) * before.channels + channel;
    return (after.data[at0] - before.data[at0]) * (1 - mix) + (after.data[at1] - before.data[at1]) * mix;
  };
  let error = 0, signal = 0, count = 0;
  for (let y = Math.max(0, Math.floor(box.y)); y < Math.min(beforeA.height, Math.ceil(box.y + box.height)); y++) {
    for (let x = Math.max(0, Math.floor(box.x)); x < Math.min(beforeA.width, Math.ceil(box.x + box.width)); x++) {
      const bx = x + shiftBX;
      if (bx < 0 || bx >= beforeB.width - 1) continue;
      for (let channel = 0; channel < 3; channel++) {
        const deltaA = afterA.data[(y * beforeA.width + x) * beforeA.channels + channel] - beforeA.data[(y * beforeA.width + x) * beforeA.channels + channel];
        const deltaB = deltaAt(beforeB, afterB, bx, y, channel);
        error += Math.abs(deltaA - deltaB); signal += Math.abs(deltaA); count++;
      }
    }
  }
  return { error: error / Math.max(1, count), signal: signal / Math.max(1, count) };
}

function differenceMaskOverlap(before, afterA, afterB, box, threshold = 3) {
  before = decodePNG(before); afterA = decodePNG(afterA); afterB = decodePNG(afterB); let aCount = 0, bCount = 0, shared = 0;
  for (let y = Math.max(0, Math.floor(box.y)); y < Math.min(before.height, Math.ceil(box.y + box.height)); y++) for (let x = Math.max(0, Math.floor(box.x)); x < Math.min(before.width, Math.ceil(box.x + box.width)); x++) {
    const at = (y * before.width + x) * before.channels; let deltaA = 0, deltaB = 0;
    for (let channel = 0; channel < 3; channel++) { deltaA = Math.max(deltaA, afterA.data[at + channel] - before.data[at + channel]); deltaB = Math.max(deltaB, afterB.data[at + channel] - before.data[at + channel]); }
    const activeA = deltaA > threshold, activeB = deltaB > threshold; aCount += activeA ? 1 : 0; bCount += activeB ? 1 : 0; shared += activeA && activeB ? 1 : 0;
  }
  return { overlap: shared / Math.max(1, Math.min(aCount, bCount)), aCount, bCount };
}

async function loadLab(page) {
  await page.route("**/__dev/levels/*/editor-draft", route => route.fulfill({ json: {} }));
  await page.goto(runtimeUrl);
  await page.evaluate(async id => {
    await window.eval("selectLevel")(id, { startImmediately: true, recordStart: false });
  }, labId);
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
}

test("LVL-0000 is a valid authored renderer scene while production remains 31 levels", () => {
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {} } };
  runScript("Levels/manifest.js", context);
  runScript("Levels/LVL-0000/level.js", context);
  runScript("Levels/world-config.js", context);

  const manifest = context.window.SVEN_LEVEL_MANIFEST;
  const entry = manifest.levels.find(item => item.id === labId);
  const level = context.window.SVEN_LEVEL_DEFINITIONS[labId];
  const settings = context.window.SVEN_WORLD_CONFIG.levels[labId]?.cinematicLighting;
  const normalized = cinematic.normalize(settings);

  expect(manifest.levels.filter(item => !item.developerOnly)).toHaveLength(31);
  expect(manifest.levels.filter(item => item.developerOnly).map(item => item.id)).toEqual([labId]);
  expect(entry).toMatchObject({ developerOnly: true, script: "Levels/LVL-0000/level.js" });
  expect(level.world).toMatchObject({
    width: 2172,
    height: 724,
    background: "Levels/LVL-0000/assets/AtlasTestLevel.png",
    depthmap: "Levels/LVL-0000/assets/depthmap.png"
  });
  expect(pngDimensions(level.world.background)).toEqual([level.world.width, level.world.height]);
  expect(pngDimensions(level.world.depthmap)).toEqual([level.world.width, level.world.height]);
  expect(level.walkPath.length).toBeGreaterThanOrEqual(8);
  expect(level.walkPath[0]).toMatchObject({ id: "bright-day", x: level.player.start.x, y: level.player.start.y });
  expect(level.walkPath.every((point, index, points) => !index || point.x > points[index - 1].x)).toBe(true);
  expect(normalized.depth.enabled).toBe(true);
  expect(normalized.characters).toMatchObject({ groundingShadow: true, shadowStrength: 5, shadowLocalLightInfluence: 2 });
  expect(normalized.godRays.items).toHaveLength(1);
  expect(normalized.areaLights.items).toHaveLength(2);
  expect(normalized.localLights.items).toHaveLength(4);
  expect(normalized.atmosphere.items).toHaveLength(2);
  expect(normalized.shafts.items).toHaveLength(1);
  expect(normalized.particles.items).toHaveLength(1);
  expect(normalized.waterSurface.items).toHaveLength(2);
  expect(normalized.waterSparkles.items.every(item => item.shape === "polygon" && item.points.length >= 6 && item.points.length <= 8)).toBe(true);
  expect(normalized.waterSurface.items.every(item => item.shape === "polygon" && item.points.length >= 6 && item.points.length <= 8)).toBe(true);
  expect(normalized.waterSurface.items.every(item => !Object.hasOwn(item, "motionStrength") && !Object.hasOwn(item, "motionScale") && !Object.hasOwn(item, "motionSpeed"))).toBe(true);
  expect(normalized.waterSurface.items.every(item => Object.values(item).flatMap(value => typeof value === "object" ? [] : [value]).filter(value => typeof value === "number").every(Number.isFinite))).toBe(true);
  expect(JSON.stringify(settings)).not.toMatch(/reflection|caustic|bubbles|spray|foam|starField/i);
});

test("Water Surface v1 has a bounded finite native organic-field contract", () => {
  const context = { window: { AtlasCinematicSettings: cinematic } };
  runScript("src/cinematic-renderer.js", context);
  const renderer = context.window.AtlasCinematicRenderer;
  const shader = fs.readFileSync(path.join(root, "src/cinematic-shaders.js"), "utf8");
  const malformed = cinematic.normalize({ waterSurface: { enabled: true, items: [{
    enabled: true, shape: "polygon", x: NaN, width: Infinity,
    shimmerStrength: 99, shimmerCoverage: 99, sparkleSize: 99, anisotropy: Infinity,
    shimmerSoftness: -5, evolutionSpeed: -5, shimmerDirection: Infinity, highlightContrast: 99, depthOcclusion: Infinity,
    points: [{ x: -9, y: 9 }, { x: 0, y: -0.4 }, { x: 9, y: 9 }]
  }] } });
  const water = malformed.waterSurface.items[0];
  const packed = renderer.packEffects(malformed)[0];

  expect(cinematic.systems.waterSurface).toMatchObject({ type: 7, layer: "environment" });
  expect(water).toMatchObject({ x: 800, width: 800, shimmerStrength: 8, shimmerCoverage: 1, sparkleSize: 40, anisotropy: 6, shimmerSoftness: 0.01, evolutionSpeed: 0, shimmerDirection: 0, highlightContrast: 5, depthOcclusion: 1 });
  expect(cinematic.systems.waterSurface.fields).toMatchObject({
    shimmerStrength: { min: 0, max: 8 }, shimmerCoverage: { min: 0, max: 1 },
    sparkleSize: { min: 2, max: 40 }, anisotropy: { min: 1, max: 14 },
    shimmerSoftness: { min: 0.01, max: 0.25 }, evolutionSpeed: { min: 0, max: 4 },
    shimmerDirection: { min: -45, max: 45 }, highlightContrast: { min: 0.25, max: 5 }
  });
  expect(water.points).toEqual([{ x: -1, y: 1 }, { x: 0, y: -0.4 }, { x: 1, y: 1 }]);
  expect(Array.from(packed.data).every(Number.isFinite)).toBe(true);
  expect(packed.data[0]).toBe(7);
  expect(packed.data[24]).toBeCloseTo(water.depth);
  expect(packed.data[25]).toBeCloseTo(water.depthOcclusion);
  expect(packed.data[27]).toBeCloseTo(0);
  expect(shader).toContain("fn waterSurface(");
  expect(shader).toContain("region(e,p)*visibility(e,z)");
  const waterShader = shader.slice(shader.indexOf("fn waterSurface("), shader.indexOf("fn waterSparkles("));
  expect(shader).toContain("fn paintedWaveStructure(");
  const waveGuideShader = shader.slice(shader.indexOf("fn paintedWaveStructure("), shader.indexOf("fn organicSpecularField("));
  expect(waveGuideShader).toContain("textureSampleLevel(auxiliary");
  expect(waveGuideShader).not.toContain("textureSampleLevel(source");
  expect(waveGuideShader).not.toContain("viewportUV(");
  expect(shader).toContain("fn viewportUV(");
  expect(shader).toContain("fn organicSpecularField(");
  expect(shader).toContain("let waveStructure=paintedWaveStructure");
  expect(shader).toContain("let brightRidge=");
  expect(shader).toContain("let darkTrough=");
  expect(shader).toContain("let darkEligibility=");
  expect(shader).toContain("let darkWaveMask=");
  expect(shader).toContain("let darkShimmer=");
  expect(shader).toContain("let darkPeak=");
  expect(shader).toContain("let clusterEnvelope=");
  expect(shader).toContain("let baseShimmer=");
  expect(shader).toContain("let localShimmer=");
  expect(shader).toContain("let temporalPeak=");
  expect(shader).toContain("let rarePeak=");
  expect(waterShader).not.toMatch(/waterStreakLayer|waterGlintClusters|cellSpan|pieceEnds|rowDistance/);
  expect(waterShader).toContain("return painted+allowed*e.v[4].x");
  expect(waterShader).toContain("highlightColor*subtle");
  expect(waterShader).toContain("peakColor*rarePeak");
  expect(waterShader).toContain("darkHighlightColor*darkShimmer");
  expect(waterShader).toContain("peakColor*darkPeak");
  expect(waterShader).not.toMatch(/sampleUV|displacement|\bmoved\b|mix\(painted|broadHighlight|lightField/i);
  expect(shader).not.toMatch(/reflection|caustic|foam|bubble|spray/i);
});

test("Water Sparkles has a bounded native world-space specular contract", () => {
  const context = { window: { AtlasCinematicSettings: cinematic } };
  runScript("src/cinematic-renderer.js", context);
  const renderer = context.window.AtlasCinematicRenderer;
  const shader = fs.readFileSync(path.join(root, "src/cinematic-shaders.js"), "utf8");
  const normalized = cinematic.normalize({ waterSparkles: { enabled: true, items: [{
    enabled: true, shape: "polygon", sparkleStrength: 99, sparkleDensity: 99, sparkleSize: 99,
    sizeVariation: -5, twinkleSpeed: 99, twinkleVariation: 99, clusterScale: -5,
    clusterAmount: 99, peakIntensity: 99, anisotropy: 99, artworkInfluence: 99,
    depth: 99, depthOcclusion: 99, depthSoftness: -5,
    points: [{ x: -9, y: 9 }, { x: 0, y: -0.4 }, { x: 9, y: 9 }]
  }] } });
  const sparkle = normalized.waterSparkles.items[0];
  const packed = renderer.packEffects(normalized).find(item => item.key === "waterSparkles");

  expect(cinematic.systems.waterSparkles).toMatchObject({ type: 8, layer: "environment" });
  expect(sparkle).toMatchObject({ sparkleStrength: 8, sparkleDensity: 1, sparkleSize: 8, sizeVariation: 0, twinkleSpeed: 5, twinkleVariation: 1, clusterScale: 20, clusterAmount: 1, peakIntensity: 4, anisotropy: 5, artworkInfluence: 1, depth: 1, depthOcclusion: 1, depthSoftness: 0.005 });
  expect(Array.from(packed.data).every(Number.isFinite)).toBe(true);
  expect(packed.data[0]).toBe(8);
  expect(packed.data[16]).toBeCloseTo(sparkle.sparkleStrength);
  expect(packed.data[17]).toBeCloseTo(sparkle.sparkleDensity);
  expect(packed.data[24]).toBeCloseTo(sparkle.depth);
  expect(packed.data[27]).toBeCloseTo(sparkle.artworkInfluence);
  expect(packed.data[28]).toBeCloseTo(sparkle.peakIntensity);
  expect(shader).toContain("fn waterSparkles(");
  const sparkleShader = shader.slice(shader.indexOf("fn waterSparkles("), shader.indexOf("fn spriteLight("));
  expect(sparkleShader).toContain("let baseCell=floor(q/cellSpan)");
  expect(sparkleShader).toContain("let center=(cell+");
  expect(sparkleShader).toContain("let twinkle=");
  expect(sparkleShader).toContain("let rare=");
  expect(sparkleShader).toContain("paintedWaveStructure(p,");
  expect(sparkleShader).not.toMatch(/viewportUV\(p\).*time|screenUV|cameraOffset/i);
  expect(shader).toContain("if(e.v[0].x==8.0){base=waterSparkles(e,p,z,base);}");
});

test("developer visibility is hostname-driven and excluded from adventure progression", () => {
  const make = hostname => {
    const context = { window: { location: { hostname }, localStorage: { getItem: () => null, setItem: () => {} } } };
    runScript("Levels/manifest.js", context);
    runScript("Levels/world-config.js", context);
    runScript("src/atlas-world.js", context);
    return context.window.AtlasWorld.createWorldResolver(
      context.window.SVEN_LEVEL_MANIFEST.levels,
      context.window.SVEN_WORLD_CONFIG
    );
  };

  for (const hostname of ["localhost", "127.0.0.1"]) {
    const resolver = make(hostname);
    expect(resolver.rootEntries().map(entry => entry.id)).toContain(labId);
    expect(resolver.allEnabledIds()).toHaveLength(31);
    expect(resolver.allEnabledIds()).not.toContain(labId);
    expect(resolver.nextEnabled(labId)).toBeNull();
  }

  const production = make("atlas.example");
  expect(production.rootEntries().map(entry => entry.id)).not.toContain(labId);
  expect(production.entryIsAvailable({ developerOnly: true })).toBe(false);
  expect(production.allEnabledIds()).toHaveLength(31);
});

test("localhost menu exposes the FX Lab and the normal level pipeline loads it", async ({ page }) => {
  test.skip(!runtimeUrl.startsWith("http"), "HTTP local-development host required");
  await page.goto(runtimeUrl);
  await page.getByRole("button", { name: "Start avontuur" }).click();
  const tile = page.locator('[data-menu-tile="LVL-0000"]');
  await expect(tile).toBeVisible();
  await expect(tile).toContainText("Cinematic FX Lab");
  await tile.click();
  await expect(page.getByRole("heading", { name: "Cinematic FX Lab" })).toBeVisible();
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
  expect(await page.evaluate(() => window.eval("level").id)).toBe(labId);
  expect(await page.evaluate(() => window.eval("resolvedNextLevelId")())).toBeNull();
  await page.keyboard.press("Control+Shift+D");
  await page.locator('[data-editor-mode="graphics"]').click();
  await expect(page.locator("[data-cinematic-editor]")).toBeVisible();
  await expect(page.locator('[data-cinematic-group="depth"]')).toContainText("Scene depth");
  await page.locator('[data-cinematic-layer="environment"]').click();
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).toContainText("Water Surface");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).toContainText("Evolution Speed");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).toContainText("Shimmer Coverage");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).toContainText("Sparkle Size");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).toContainText("Anisotropy");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).toContainText("Shimmer Softness");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).toContainText("Highlight Contrast");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).not.toContainText("Shimmer Length");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).not.toContainText("Glint Cluster Size");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).not.toContainText("Shimmer Threshold");
  await expect(page.locator('[data-cinematic-group="waterSurface"]')).not.toContainText("Motion Strength");
  const sparkleGroup = page.locator('[data-cinematic-group="waterSparkles"]');
  await expect(sparkleGroup).toContainText("Water Sparkles");
  await sparkleGroup.evaluate(element => { element.open = true; });
  if (await sparkleGroup.getByText("No instances.").count()) await sparkleGroup.getByRole("button", { name: "Add", exact: true }).click();
  await expect(sparkleGroup).toContainText("Sparkle Strength");
  await expect(sparkleGroup).toContainText("Sparkle Density");
  await expect(sparkleGroup).toContainText("Twinkle Speed");
  await expect(sparkleGroup).toContainText("Cluster Scale");
  await expect(sparkleGroup).toContainText("Peak Intensity");
});

test("GPU FX Lab uses scene depth and captures five benchmark positions", async ({ page }, info) => {
  test.skip(!process.env.ATLAS_WEBGPU_QA || info.project.name !== "desktop-chromium", "HTTP Chromium WebGPU run required");
  test.setTimeout(120000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1280, height: 720 });
  await loadLab(page);
  await page.evaluate(() => {
    window.eval("voxelRenderer").updateSettings({ renderer: "cinematic" });
    window.eval("render")();
  });
  await expect.poll(async () => (await page.evaluate(() => window.eval("cinematicRenderer").snapshot())).status, { timeout: 25000 }).toBe("ready");
  await expect.poll(async () => (await page.evaluate(() => window.eval("cinematicRenderer").snapshot())).depthStatus, { timeout: 25000 }).toBe("ready");

  const positions = [
    ["A-bright-day", 145, 620],
    ["B-shallow-deep-water", 470, 625],
    ["C-waterfall", 1010, 662],
    ["D-dark-cave", 1395, 652],
    ["E-night-moon-sky", 1845, 610]
  ];
  for (const [name, x, y] of positions) {
    await page.evaluate(({ x, y }) => {
      const state = window.eval("state");
      state.worldX = x;
      state.worldY = y;
      state.cameraX = window.eval("getDesiredCameraX")();
      window.eval("render")();
    }, { x, y });
    await expect.poll(async () => (await page.locator('[data-actor="sven"]').getAttribute("data-world-x"))).toBe(String(x));
    await page.waitForTimeout(250);
    await page.screenshot({ path: info.outputPath(`${name}.png`) });
  }

  const snapshot = await page.evaluate(() => window.eval("cinematicRenderer").snapshot());
  const authoredWaterCounts = await page.evaluate(() => {
    const settings = window.eval("cinematicRenderer").getSettings();
    return {
      waterSurfaces: settings.layers.environment && settings.waterSurface.enabled ? settings.waterSurface.items.filter(item => item.enabled).length : 0,
      waterSparkles: settings.layers.environment && settings.waterSparkles.enabled ? settings.waterSparkles.items.filter(item => item.enabled).length : 0
    };
  });
  expect(snapshot).toMatchObject({ status: "ready", error: null, depthStatus: "ready", depthPath: "Levels/LVL-0000/assets/depthmap.png", ...authoredWaterCounts });
  expect(snapshot.fps).toBeGreaterThan(45);
  expect(snapshot.drawCalls).toBeGreaterThan(0);
  expect(snapshot.shadowDraws).toBeGreaterThan(0);
  expect(snapshot.particles).toBe(260);
  expect(errors).toEqual([]);
  console.log("FX_LAB_GPU_QA", { fps: snapshot.fps, drawCalls: snapshot.drawCalls, shadowDraws: snapshot.shadowDraws, particles: snapshot.particles, waterSurfaces: snapshot.waterSurfaces, waterSparkles: snapshot.waterSparkles, depthStatus: snapshot.depthStatus });
});

test("GPU Water Surface evolves one wave-guided specular field and respects scene depth", async ({ page }, info) => {
  test.skip(!process.env.ATLAS_WEBGPU_QA || info.project.name !== "desktop-chromium", "HTTP Chromium WebGPU run required");
  test.setTimeout(90000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1280, height: 720 });
  await loadLab(page);
  await page.evaluate(() => { window.eval("voxelRenderer").updateSettings({ renderer: "cinematic" }); window.eval("render")(); });
  await expect.poll(async () => (await page.evaluate(() => window.eval("cinematicRenderer").snapshot())).status, { timeout: 25000 }).toBe("ready");
  await expect.poll(async () => (await page.evaluate(() => window.eval("cinematicRenderer").snapshot())).depthStatus, { timeout: 25000 }).toBe("ready");
  await page.addStyleTag({ content: '[data-actor="sven"]{visibility:hidden!important}' });
  await page.evaluate(() => {
    window.__waterQaTime = 17.25;
    const write = GPUQueue.prototype.writeBuffer;
    GPUQueue.prototype.writeBuffer = function(buffer, offset, data, ...rest) {
      if (data instanceof Float32Array && data.length === 128) { data = data.slice(); data[5] = window.__waterQaTime; }
      return write.call(this, buffer, offset, data, ...rest);
    };
  });
  const canvas = page.locator(".cinematicViewportCanvas");
  const output = process.env.WATER_QA_OUTPUT;
  if (output) fs.mkdirSync(output, { recursive: true });
  const setState = async ({ cameraWorldX, water, depth }) => {
    await page.evaluate(({ cameraWorldX, water, depth }) => {
      const state = window.eval("state"), runtime = window.eval("cinematicRenderer"), resolver = window.eval("worldResolver"), id = window.eval("level").id, settings = runtime.getSettings();
      state.worldX = cameraWorldX; state.worldY = 620; state.cameraX = window.eval("getDesiredCameraX")();
      settings.waterSurface.enabled = water; settings.waterSparkles.enabled = false; settings.depth.enabled = depth;
      for (const item of settings.waterSurface.items) item.enabled = true;
      resolver.updateLevelSettings(id, { cinematicLighting: settings }); runtime.sync(); window.eval("render")();
    }, { cameraWorldX, water, depth });
    const frame = await page.evaluate(() => window.eval("cinematicRenderer").snapshot().frame);
    await expect.poll(() => page.evaluate(() => window.eval("cinematicRenderer").snapshot().frame)).toBeGreaterThan(frame + 2);
  };
  const capture = async (cameraWorldX, water, depth, name, time = 17.25) => {
    await page.evaluate(value => { window.__waterQaTime = value; }, time);
    await setState({ cameraWorldX, water, depth });
    return canvas.screenshot({ path: output ? path.join(output, name) : undefined });
  };

  const leftBefore = await capture(145, false, true, "water-left-before.png");
  const leftAfter = await capture(145, true, true, "water-left-after.png");
  const leftNoDepth = await capture(145, true, false, "water-left-depth-disabled.png");
  const runtime = await page.evaluate(() => ({ cameraX: window.eval("state").cameraX, height: window.eval("level").world.height }));
  const image = decodePNG(leftAfter);
  runtime.viewport = runtime.height * image.width / image.height;
  const box = (x, y, width, height) => ({ x: (x - runtime.cameraX) / runtime.viewport * image.width, y: y / runtime.height * image.height, width: width / runtime.viewport * image.width, height: height / runtime.height * image.height });
  const visibleWaterField = box(780, 320, 500, 210);
  const openWater = regionDelta(leftBefore, leftAfter, box(980, 385, 95, 65));
  const authoredWater = regionDelta(leftBefore, leftAfter, visibleWaterField);
  const authoredCoverage = differenceCoverage(leftBefore, leftAfter, visibleWaterField, 2);
  const authoredBrightCoverage = differenceCoverage(leftBefore, leftAfter, visibleWaterField, 12);
  const darkAuthoredCoverage = darkDifferenceCoverage(leftBefore, leftAfter, visibleWaterField, 2, 100);
  const darkPeakCoverage = darkDifferenceCoverage(leftBefore, leftAfter, visibleWaterField, 12, 100);
  const nonWaterSky = regionDelta(leftBefore, leftAfter, box(850, 105, 120, 75));
  const foregroundWithDepth = regionDelta(leftBefore, leftAfter, box(675, 350, 80, 115));
  const foregroundWithoutDepth = regionDelta(leftBefore, leftNoDepth, box(675, 350, 80, 115));
  await page.evaluate(() => {
    const runtime = window.eval("cinematicRenderer"), settings = runtime.getSettings();
    window.__waterQaAuthoredItems = structuredClone(settings.waterSurface.items);
  });
  const setCoverage = async value => page.evaluate(value => {
    const runtime = window.eval("cinematicRenderer"), resolver = window.eval("worldResolver"), id = window.eval("level").id, settings = runtime.getSettings();
    for (const item of settings.waterSurface.items) item.shimmerCoverage = value;
    resolver.updateLevelSettings(id, { cinematicLighting: settings }); runtime.sync(); window.eval("render")();
  }, value);
  const coverageFrames = [];
  for (const [name, value] of [["low", 0], ["medium", 0.45], ["high", 0.75], ["maximum", 1]]) {
    await setCoverage(value);
    coverageFrames.push([name, await capture(145, true, true, `water-coverage-${name}.png`)]);
  }
  const coverageActivity = Object.fromEntries(coverageFrames.map(([name, frame]) => [name, differenceCoverage(leftBefore, frame, visibleWaterField, 2)]));
  const coverageBrightness = Object.fromEntries(coverageFrames.map(([name, frame]) => [name, regionDelta(leftBefore, frame, visibleWaterField)]));
  await page.evaluate(() => {
    const runtime = window.eval("cinematicRenderer"), resolver = window.eval("worldResolver"), id = window.eval("level").id, settings = runtime.getSettings(), fields = window.AtlasCinematicSettings.systems.waterSurface.fields;
    settings.waterSurface.items = structuredClone(window.__waterQaAuthoredItems);
    for (const item of settings.waterSurface.items) Object.assign(item, { shimmerStrength: fields.shimmerStrength.max, shimmerCoverage: 0.32, sparkleSize: 18, anisotropy: 8, shimmerSoftness: 0.05, evolutionSpeed: fields.evolutionSpeed.max, shimmerDirection: 6, highlightContrast: fields.highlightContrast.max });
    resolver.updateLevelSettings(id, { cinematicLighting: settings }); runtime.sync(); window.eval("render")();
  });
  const leftStrong = await capture(145, true, true, "water-left-strong.png");
  const strongWater = regionDelta(leftBefore, leftStrong, visibleWaterField);
  const strongCoverage = differenceCoverage(leftBefore, leftStrong, visibleWaterField, 2);
  const strongBrightCoverage = differenceCoverage(leftBefore, leftStrong, visibleWaterField, 12);
  await page.evaluate(() => {
    const runtime = window.eval("cinematicRenderer"), resolver = window.eval("worldResolver"), id = window.eval("level").id, settings = runtime.getSettings();
    settings.waterSurface.items = window.__waterQaAuthoredItems; resolver.updateLevelSettings(id, { cinematicLighting: settings }); runtime.sync(); window.eval("render")();
  });
  const nightBefore = await capture(1845, false, true, "water-night-before.png");
  const nightAfter = await capture(1845, true, true, "water-night-after.png");
  const nightRuntime = await page.evaluate(() => ({ cameraX: window.eval("state").cameraX, height: window.eval("level").world.height }));
  const nightImage = decodePNG(nightAfter), nightViewport = nightRuntime.height * nightImage.width / nightImage.height;
  const nightWaterBox = { x: (1515 - nightRuntime.cameraX) / nightViewport * nightImage.width, y: 345 / nightRuntime.height * nightImage.height, width: 475 / nightViewport * nightImage.width, height: 185 / nightRuntime.height * nightImage.height };
  const nightDarkCoverage = darkDifferenceCoverage(nightBefore, nightAfter, nightWaterBox, 2, 85);
  const nightDarkPeakCoverage = darkDifferenceCoverage(nightBefore, nightAfter, nightWaterBox, 12, 85);
  const snapshot = await page.evaluate(() => window.eval("cinematicRenderer").snapshot());

  await page.evaluate(() => {
    const api = window.AtlasCinematicSettings, runtime = window.eval("cinematicRenderer"), resolver = window.eval("worldResolver"), id = window.eval("level").id, settings = runtime.getSettings();
    for (const [key, definition] of Object.entries(api.systems)) if (definition.type && key !== "waterSurface") settings[key].enabled = false;
    settings.characters.groundingShadow = false; settings.bloom.enabled = false; settings.autoExposure.enabled = false;
    resolver.updateLevelSettings(id, { cinematicLighting: settings }); runtime.sync();
  });
  const temporalA = await capture(145, true, true, "water-temporal-a.png", 17.25);
  const temporalB = await capture(145, true, true, "water-temporal-b.png", 47.25);
  const temporalWater = regionDelta(temporalA, temporalB, box(980, 385, 95, 65));
  const temporalSky = regionDelta(temporalA, temporalB, box(850, 105, 120, 75));
  console.log("WATER_SURFACE_QA", { openWater, authoredWater, authoredCoverage, authoredBrightCoverage, darkAuthoredCoverage, darkPeakCoverage, nightDarkCoverage, nightDarkPeakCoverage, coverageActivity, coverageBrightness, strongWater, strongCoverage, strongBrightCoverage, nonWaterSky, temporalWater, temporalSky, foregroundWithDepth, foregroundWithoutDepth, fps: snapshot.fps, drawCalls: snapshot.drawCalls });
  expect(openWater).toBeGreaterThan(0.12);
  expect(authoredCoverage).toBeGreaterThan(0.005);
  expect(authoredCoverage).toBeLessThan(0.2);
  expect(authoredBrightCoverage).toBeGreaterThan(0.0002);
  expect(authoredBrightCoverage).toBeLessThan(authoredCoverage * 0.8);
  expect(darkAuthoredCoverage).toBeGreaterThan(0.002);
  expect(darkPeakCoverage).toBeGreaterThan(0.00005);
  expect(darkPeakCoverage).toBeLessThan(darkAuthoredCoverage * 0.75);
  expect(nightDarkCoverage).toBeGreaterThan(0.001);
  expect(nightDarkPeakCoverage).toBeGreaterThan(0.00002);
  expect(nightDarkPeakCoverage).toBeLessThan(nightDarkCoverage * 0.75);
  expect(coverageActivity.medium).toBeGreaterThan(coverageActivity.low * 1.15);
  expect(coverageActivity.high).toBeGreaterThan(coverageActivity.medium * 1.08);
  expect(coverageActivity.maximum).toBeGreaterThan(coverageActivity.high * 1.03);
  expect(coverageActivity.maximum).toBeGreaterThan(0.04);
  expect(coverageActivity.maximum).toBeLessThan(0.85);
  expect(coverageBrightness.maximum).toBeLessThan(coverageBrightness.low * 6 + 12);
  expect(strongWater).toBeGreaterThan(authoredWater * 1.5);
  expect(strongCoverage).toBeGreaterThan(0.01);
  expect(strongCoverage).toBeLessThan(0.8);
  expect(strongBrightCoverage).toBeLessThan(0.6);
  expect(nonWaterSky).toBeLessThan(0.02);
  expect(temporalWater).toBeGreaterThan(0.04);
  expect(temporalSky).toBeLessThan(0.02);
  expect(foregroundWithoutDepth).toBeGreaterThan(foregroundWithDepth * 1.25 + 0.01);
  expect(snapshot).toMatchObject({ status: "ready", error: null, depthStatus: "ready", waterSurfaces: 2 });
  expect(snapshot.drawCalls).toBe(9);
  expect(snapshot.fps).toBeGreaterThan(45);
  expect(errors).toEqual([]);
});

test("GPU Water Sparkles clusters discrete world-space points with independent twinkle and depth", async ({ page }, info) => {
  test.skip(!process.env.ATLAS_WEBGPU_QA || info.project.name !== "desktop-chromium", "HTTP Chromium WebGPU run required");
  test.setTimeout(90000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1280, height: 720 });
  await loadLab(page);
  await page.evaluate(() => {
    window.eval("voxelRenderer").updateSettings({ renderer: "cinematic" }); window.eval("render")(); window.__sparkleQaTime = 17.25;
    const write = GPUQueue.prototype.writeBuffer;
    GPUQueue.prototype.writeBuffer = function(buffer, offset, data, ...rest) {
      if (data instanceof Float32Array && data.length === 128) { data = data.slice(); data[5] = window.__sparkleQaTime; }
      return write.call(this, buffer, offset, data, ...rest);
    };
  });
  await expect.poll(async () => (await page.evaluate(() => window.eval("cinematicRenderer").snapshot())).status, { timeout: 25000 }).toBe("ready");
  await expect.poll(async () => (await page.evaluate(() => window.eval("cinematicRenderer").snapshot())).depthStatus, { timeout: 25000 }).toBe("ready");
  await page.addStyleTag({ content: '[data-actor="sven"]{visibility:hidden!important}' });
  const canvas = page.locator(".cinematicViewportCanvas"), output = process.env.SPARKLE_QA_OUTPUT;
  if (output) fs.mkdirSync(output, { recursive: true });
  const dimensions = await page.evaluate(() => ({ height: window.eval("level").world.height, viewport: window.eval("state").viewportWorldWidth }));
  const configure = async ({ cameraX = 0, enabled = true, depth = true, time = 17.25, density, strength }) => {
    await page.evaluate(({ cameraX, enabled, depth, time, density, strength, viewport }) => {
      const state = window.eval("state"), runtime = window.eval("cinematicRenderer"), resolver = window.eval("worldResolver"), id = window.eval("level").id, settings = runtime.getSettings(), api = window.AtlasCinematicSettings;
      state.worldX = cameraX + viewport * 0.5; state.worldY = 620; state.cameraX = cameraX; window.__sparkleQaTime = time;
      for (const [key, definition] of Object.entries(api.systems)) if (definition.type && key !== "waterSparkles") settings[key].enabled = false;
      settings.characters.groundingShadow = false; settings.bloom.enabled = false; settings.autoExposure.enabled = false;
      if (!settings.waterSparkles.items.length) {
        const waterRegion = settings.waterSurface.items[0];
        settings.waterSparkles.items = [api.instance("waterSparkles", {
          enabled: true, id: "qa-water-sparkles", name: "QA Water Sparkles", x: waterRegion.x, y: waterRegion.y,
          width: waterRegion.width, height: waterRegion.height, shape: waterRegion.shape, points: waterRegion.points,
          sparkleStrength: 2.7, sparkleDensity: 0.44, sparkleSize: 1.45, sizeVariation: 0.78,
          twinkleSpeed: 1.25, twinkleVariation: 0.88, clusterScale: 130, clusterAmount: 0.9,
          peakIntensity: 2.35, anisotropy: 1.65, artworkInfluence: 0.7, depth: 0.87,
          depthOcclusion: 1, depthSoftness: 0.018
        })];
      }
      settings.waterSparkles.enabled = enabled; settings.depth.enabled = depth;
      for (const item of settings.waterSparkles.items) { if (density !== undefined) item.sparkleDensity = density; if (strength !== undefined) item.sparkleStrength = strength; }
      resolver.updateLevelSettings(id, { cinematicLighting: settings }); runtime.sync(); window.eval("render")();
    }, { cameraX, enabled, depth, time, density, strength, viewport: dimensions.viewport });
    const frame = await page.evaluate(() => window.eval("cinematicRenderer").snapshot().frame);
    await expect.poll(() => page.evaluate(() => window.eval("cinematicRenderer").snapshot().frame)).toBeGreaterThan(frame + 2);
  };
  const capture = async (state, name) => { await configure(state); return canvas.screenshot({ path: output ? path.join(output, name) : undefined }); };
  const before = await capture({ enabled: false }, "sparkles-off.png");
  const authoredA = await capture({ enabled: true, time: 17.25 }, "sparkles-authored-a.png");
  const authoredB = await capture({ enabled: true, time: 31.75 }, "sparkles-authored-b.png");
  const noDepth = await capture({ enabled: true, depth: false, time: 17.25 }, "sparkles-depth-disabled.png");
  const lowDensity = await capture({ enabled: true, time: 17.25, density: 0.08 }, "sparkles-density-low.png");
  const highDensity = await capture({ enabled: true, time: 17.25, density: 0.85 }, "sparkles-density-high.png");
  const image = decodePNG(authoredA);
  const box = (x, y, width, height) => ({ x: x / dimensions.viewport * image.width, y: y / dimensions.height * image.height, width: width / dimensions.viewport * image.width, height: height / dimensions.height * image.height });
  const waterBox = box(700, 315, 560, 220), skyBox = box(820, 90, 160, 90), foregroundBox = box(675, 350, 80, 115);
  const authoredCoverage = differenceCoverage(before, authoredA, waterBox, 3);
  const brightCoverage = differenceCoverage(before, authoredA, waterBox, 18);
  const densityLowCoverage = differenceCoverage(before, lowDensity, waterBox, 3);
  const densityHighCoverage = differenceCoverage(before, highDensity, waterBox, 3);
  const temporal = regionDelta(authoredA, authoredB, waterBox);
  const support = differenceMaskOverlap(before, authoredA, authoredB, waterBox, 1);
  const skyDelta = regionDelta(before, authoredA, skyBox);
  const foregroundWithDepth = regionDelta(before, authoredA, foregroundBox);
  const foregroundWithoutDepth = regionDelta(before, noDepth, foregroundBox);
  const pixelShift = 160, cameraShift = pixelShift / image.width * dimensions.viewport;
  const cameraAOff = await capture({ cameraX: 0, enabled: false }, "sparkles-camera-a-off.png");
  const cameraAOn = await capture({ cameraX: 0, enabled: true, time: 17.25 }, "sparkles-camera-a-on.png");
  const cameraBOff = await capture({ cameraX: cameraShift, enabled: false }, "sparkles-camera-b-off.png");
  const cameraBOn = await capture({ cameraX: cameraShift, enabled: true, time: 17.25 }, "sparkles-camera-b-on.png");
  const registrationBox = { x: 700, y: 315 / dimensions.height * image.height, width: 500, height: 220 / dimensions.height * image.height };
  const worldAligned = translatedEffectError(cameraAOff, cameraAOn, cameraBOff, cameraBOn, registrationBox, -pixelShift);
  const screenAligned = translatedEffectError(cameraAOff, cameraAOn, cameraBOff, cameraBOn, registrationBox, 0);
  const snapshot = await page.evaluate(() => window.eval("cinematicRenderer").snapshot());
  console.log("WATER_SPARKLES_QA", { authoredCoverage, brightCoverage, densityLowCoverage, densityHighCoverage, temporal, support, skyDelta, foregroundWithDepth, foregroundWithoutDepth, worldAligned, screenAligned, fps: snapshot.fps });
  expect(authoredCoverage).toBeGreaterThan(0.003);
  expect(authoredCoverage).toBeLessThan(0.28);
  expect(brightCoverage).toBeGreaterThan(0.0002);
  expect(brightCoverage).toBeLessThan(authoredCoverage * 0.75);
  expect(densityHighCoverage).toBeGreaterThan(densityLowCoverage * 1.8);
  expect(temporal).toBeGreaterThan(0.04);
  expect(support.overlap).toBeGreaterThan(0.32);
  expect(skyDelta).toBeLessThan(0.02);
  expect(foregroundWithoutDepth).toBeGreaterThan(foregroundWithDepth * 1.2 + 0.01);
  expect(worldAligned.signal).toBeGreaterThan(0.03);
  expect(worldAligned.error).toBeLessThan(screenAligned.error * 0.5);
  expect(snapshot).toMatchObject({ status: "ready", error: null, depthStatus: "ready", waterSparkles: 1 });
  expect(snapshot.fps).toBeGreaterThan(45);
  expect(errors).toEqual([]);
});

test("GPU Water Surface remains registered to world pixels through forward and reverse camera motion", async ({ page }, info) => {
  test.skip(!process.env.ATLAS_WEBGPU_QA || info.project.name !== "desktop-chromium", "HTTP Chromium WebGPU run required");
  test.setTimeout(90000);
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  await page.setViewportSize({ width: 1280, height: 720 });
  await loadLab(page);
  await page.evaluate(() => {
    window.eval("voxelRenderer").updateSettings({ renderer: "cinematic" });
    const runtime = window.eval("cinematicRenderer"); window.eval("render")();
    window.__waterQaTime = 17.25;
    const write = GPUQueue.prototype.writeBuffer;
    GPUQueue.prototype.writeBuffer = function(buffer, offset, data, ...rest) {
      if (data instanceof Float32Array && data.length === 128) { data = data.slice(); data[5] = window.__waterQaTime; }
      return write.call(this, buffer, offset, data, ...rest);
    };
  });
  await expect.poll(async () => (await page.evaluate(() => window.eval("cinematicRenderer").snapshot())).depthStatus, { timeout: 25000 }).toBe("ready");
  await page.addStyleTag({ content: '[data-actor="sven"]{visibility:hidden!important}' });
  const canvas = page.locator(".cinematicViewportCanvas"), output = process.env.WATER_QA_OUTPUT;
  if (output) fs.mkdirSync(output, { recursive: true });
  const dimensions = await page.evaluate(() => ({ height: window.eval("level").world.height, viewport: window.eval("state").viewportWorldWidth }));
  const initial = decodePNG(await canvas.screenshot());
  const pixelShift = 160, cameraShift = pixelShift / initial.width * dimensions.viewport;
  const captureAt = async (cameraX, water, name) => {
    await page.evaluate(({ cameraX, water, viewport }) => {
      const state = window.eval("state"), runtime = window.eval("cinematicRenderer"), resolver = window.eval("worldResolver"), id = window.eval("level").id, settings = runtime.getSettings();
      state.worldX = cameraX + viewport * 0.5; state.worldY = 620; state.cameraX = cameraX;
      settings.waterSurface.enabled = water; settings.waterSparkles.enabled = false; settings.depth.enabled = true;
      for (const item of settings.waterSurface.items) item.enabled = true;
      resolver.updateLevelSettings(id, { cinematicLighting: settings }); runtime.sync(); window.eval("render")();
    }, { cameraX, water, viewport: dimensions.viewport });
    const frame = await page.evaluate(() => window.eval("cinematicRenderer").snapshot().frame);
    await expect.poll(() => page.evaluate(() => window.eval("cinematicRenderer").snapshot().frame)).toBeGreaterThan(frame + 2);
    return canvas.screenshot({ path: output ? path.join(output, name) : undefined });
  };
  const aOff = await captureAt(0, false, "water-camera-a-off.png");
  const aOn = await captureAt(0, true, "water-camera-a-on.png");
  const bOff = await captureAt(cameraShift, false, "water-camera-b-off.png");
  const bOn = await captureAt(cameraShift, true, "water-camera-b-on.png");
  const microPixelShift = 0.5, microCameraShift = microPixelShift / initial.width * dimensions.viewport;
  const microOff = await captureAt(microCameraShift, false, "water-camera-micro-off.png");
  const microOn = await captureAt(microCameraShift, true, "water-camera-micro-on.png");
  const reverseOff = await captureAt(0, false, "water-camera-reverse-off.png");
  const reverseOn = await captureAt(0, true, "water-camera-reverse-on.png");
  const comparisonBox = { x: 760, y: 320 / dimensions.height * initial.height, width: 420, height: 210 / dimensions.height * initial.height };
  const worldAligned = translatedEffectError(aOff, aOn, bOff, bOn, comparisonBox, -pixelShift);
  const screenAligned = translatedEffectError(aOff, aOn, bOff, bOn, comparisonBox, 0);
  const microAligned = fractionalTranslatedEffectError(aOff, aOn, microOff, microOn, comparisonBox, -microPixelShift);
  const reverseAligned = translatedEffectError(aOff, aOn, reverseOff, reverseOn, comparisonBox, 0);
  const snapshot = await page.evaluate(() => window.eval("cinematicRenderer").snapshot());
  console.log("WATER_CAMERA_REGISTRATION_QA", { cameraShift, pixelShift, worldAligned, screenAligned, microAligned, reverseAligned, depthStatus: snapshot.depthStatus });
  expect(worldAligned.signal).toBeGreaterThan(0.08);
  expect(worldAligned.error).toBeLessThan(screenAligned.error * 0.45);
  expect(microAligned.error).toBeLessThan(microAligned.signal * 0.22);
  expect(reverseAligned.error).toBeLessThan(worldAligned.error * 0.35 + 0.03);
  expect(snapshot).toMatchObject({ status: "ready", error: null, depthStatus: "ready", waterSurfaces: 2 });
  expect(errors).toEqual([]);
});
