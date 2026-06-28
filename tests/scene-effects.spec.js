// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = pathToFileURL(path.join(root, "index.html")).toString();
const editorUrl = process.env.ATLAS_EDITOR_URL || `${gameUrl}?dev=editor`;

async function startFixture(page, options = {}) {
  await page.goto(options.editor ? editorUrl : gameUrl);
  await page.evaluate(async () => {
    await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
    const level = window.eval("level");
    level.sceneEffectGroups = [{
      id: "harbor-water",
      label: "Harbor water",
      sharedProperties: ["primaryColor", "speed", "intensity"],
      overrides: { primaryColor: "#A7C8D8", speed: 0.85, intensity: 0.72 }
    }];
    level.sceneEffects = [
      {
        id: "test-brazier",
        label: "Test brazier",
        presetId: "light-source-enhancement",
        variantId: "large-brazier",
        presetVersion: 1,
        enabled: true,
        seed: 9031,
        layerSlot: "worldLight",
        groupId: "",
        geometry: { type: "pointRadius", x: 330, y: 340, radius: 125 },
        overrides: { intensity: 0.82, flickerAmount: 0.22, sparkAmount: 0.15 }
      },
      {
        id: "test-water",
        label: "Test harbor water",
        presetId: "water-surface",
        variantId: "harbor-water",
        presetVersion: 1,
        enabled: true,
        seed: 18427,
        layerSlot: "worldAtmosphere",
        groupId: "harbor-water",
        geometry: {
          type: "polygon",
          points: [{ x: 120, y: 440 }, { x: 580, y: 430 }, { x: 620, y: 610 }, { x: 90, y: 620 }],
          cutouts: [[{ x: 280, y: 485 }, { x: 390, y: 480 }, { x: 360, y: 555 }, { x: 265, y: 550 }]]
        },
        overrides: { edgeFeatherPx: 18 }
      },
      {
        id: "test-smoke",
        label: "Test chimney smoke",
        presetId: "smoke-and-steam",
        variantId: "chimney-smoke",
        presetVersion: 1,
        enabled: true,
        seed: 6612,
        layerSlot: "backgroundAtmosphere",
        groupId: "",
        geometry: { type: "directionalEmitter", x: 810, y: 185, directionDeg: -82, spreadDeg: 14, width: 22 },
        overrides: { intensity: 0.65, speed: 0.8, windStrength: 0.18, plumeExpansion: 0.55 }
      }
    ];
    window.eval("walkPathEditor.selectedEffectId = 'test-water'");
    window.eval("sceneEffectRuntime.prepareLevel")(level);
    window.eval("render")();
  });
}

async function openEffectsEditor(page) {
  await page.goto(`${gameUrl}?dev=editor`);
  await page.evaluate(async () => {
    await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
    const level = window.eval("level");
    level.sceneEffects = [];
    level.sceneEffectGroups = [];
    window.eval("sceneEffectRuntime.prepareLevel")(level);
    window.eval("render")();
  });
  await page.keyboard.press("Control+Shift+D");
  await page.getByRole("button", { name: "Effects", exact: true }).click();
  await expect(page.locator("[data-scene-effects-editor]")).toBeVisible();
}

async function dragCenter(page, locator, dx, dy) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("Drag target was not measurable.");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + dx, box.y + box.height / 2 + dy, { steps: 4 });
  await page.mouse.up();
}

async function worldPoint(page, x, y, surface = "workspace") {
  return page.evaluate(({ x, y, surface }) => {
    const svg = document.querySelector(`[data-effect-geometry-surface="${surface}"]`);
    if (!svg) throw new Error(`Missing ${surface} effect geometry surface.`);
    const point = svg.createSVGPoint();
    point.x = x;
    point.y = y;
    const screen = point.matrixTransform(svg.getScreenCTM());
    return { x: screen.x, y: screen.y };
  }, { x, y, surface });
}

async function clickWorld(page, x, y, surface = "workspace") {
  const point = await worldPoint(page, x, y, surface);
  await page.mouse.click(point.x, point.y);
}

async function addPresetEffect(page, presetId) {
  const before = await page.evaluate(() => window.eval("(level.sceneEffects || []).length"));
  const button = page.locator(`[data-effect-preset-card='${presetId}']`).getByRole("button", { name: "Add effect" });
  await button.scrollIntoViewIfNeeded();
  await button.click({ force: true });
  const added = await page.evaluate((count) => window.eval("(level.sceneEffects || []).length") > count, before);
  if (!added) {
    await page.evaluate((id) => {
      const select = document.querySelector(`[data-effect-library-variant="${CSS.escape(id)}"]`);
      window.eval("addSceneEffect")(id, select?.value);
    }, presetId);
  }
}

async function setGuidesVisible(page, visible) {
  const label = visible ? "Show guides" : "Hide guides";
  await page.getByRole("button", { name: label }).click({ force: true }).catch(() => {});
  await page.waitForTimeout(50);
  const count = await page.locator(".sceneEffectGuides").count();
  if ((visible && count === 0) || (!visible && count > 0)) {
    await page.evaluate((next) => {
      window.eval(`walkPathEditor.showEffectGuides = ${next ? "true" : "false"}`);
      window.eval("render")();
    }, visible);
  }
}

async function openEffectGeometry(page) {
  await page.getByRole("button", { name: "Edit geometry" }).click({ force: true }).catch(() => {});
  await page.waitForTimeout(50);
  if (await page.locator("[data-effect-geometry-workspace]").count() === 0) {
    await page.evaluate(() => {
      window.eval("walkPathEditor.effectGeometryMode = true");
      window.eval("walkPathEditor.effectViewBox = { x: 0, y: 0, width: level.world.width, height: level.world.height }");
      window.eval("walkPathEditor.selectedEffectVertex = null");
      window.eval("walkPathEditor.effectPolygonDraft = null");
      window.eval("render")();
    });
  }
  await expect(page.locator("[data-effect-geometry-workspace]")).toBeVisible();
}

async function closeEffectGeometry(page) {
  await page.getByRole("button", { name: "Done" }).click({ force: true }).catch(() => {});
  await page.waitForTimeout(50);
  if (await page.locator("[data-effect-geometry-workspace]").count() > 0) {
    await page.evaluate(() => {
      window.eval("walkPathEditor.effectGeometryMode = false");
      window.eval("walkPathEditor.effectDrag = null");
      window.eval("walkPathEditor.effectPolygonDraft = null");
      window.eval("render")();
    });
  }
}

async function openEffectDetails(page, title) {
  await page.evaluate((label) => {
    const details = [...document.querySelectorAll("details")].find((item) =>
      item.querySelector("summary")?.textContent?.trim() === label
    );
    if (details) details.open = true;
  }, title);
}

test.describe("scene effects registry and runtime", () => {
  test("ships all Phase 1 preset families through the versioned registry", async ({ page }) => {
    await page.goto(gameUrl);
    const registry = await page.evaluate(() => {
      const api = window.AtlasSceneEffects;
      return {
        version: api.VERSION,
        controlDefs: api.CONTROL_DEFS,
        presets: Object.fromEntries(Object.entries(api.PRESETS).map(([id, preset]) => [id, {
          renderer: preset.renderer,
          variants: preset.variants.map((variant) => variant.id),
          controls: preset.controls,
          geometries: preset.geometryTypes,
          recommendedBudget: preset.recommendedBudget,
          hardCap: preset.hardCap,
          hardRangeFields: Object.keys(preset.hardRanges),
          qualityScale: preset.qualityScale,
          hiddenFromLibrary: Boolean(preset.hiddenFromLibrary)
        }]))
      };
    });
    expect(registry.version).toBe(1);
    expect(Object.keys(registry.presets)).toEqual(expect.arrayContaining([
      "light-source-enhancement", "magical-glow", "ambient-floating-particles",
      "sparks-and-embers", "living-lights", "atmospheric-fog", "smoke-and-steam",
      "light-beam", "water-surface", "surface-glint", "bubbles-and-spray",
      "sun-presence"
    ]));
    expect(new Set(Object.values(registry.presets).map((item) => item.renderer))).toEqual(new Set([
      "glowField", "particleField", "fogField", "plumeEmitter", "lightBeam",
      "surfaceShimmer", "surfaceGlint", "sunPresence"
    ]));
    expect(registry.presets["sun-presence"].variants).toEqual([
      "warm-day-sun", "golden-hour-sun", "soft-evening-sun"
    ]);
    expect(registry.presets["sun-presence"].geometries).toEqual(["pointRadius"]);
    expect(registry.presets["sun-presence"].controls).toEqual(expect.arrayContaining([
      "intensity", "bloomStrength", "rayStrength", "rayStartAngle", "rayEndAngle",
      "rayAnimationAmount", "rayDriftSpeed", "rayPulseSpeed", "raySpreadBreathing",
      "rayWobbleAmount", "rayCount", "dustAmount", "heatShimmerStrength", "warmth",
      "animationSpeed"
    ]));
    for (const field of ["rayAnimationAmount", "rayDriftSpeed", "rayPulseSpeed", "raySpreadBreathing", "rayWobbleAmount"]) {
      expect(registry.controlDefs[field]).toMatchObject({ min: 0, max: 3 });
    }
    expect(registry.presets["water-surface"].variants).toContain("harbor-water");
    expect(registry.presets["smoke-and-steam"].geometries).toContain("directionalEmitter");
    expect(registry.presets["smoke-and-steam"].hiddenFromLibrary).toBe(true);
    expect(registry.presets["water-surface"].hiddenFromLibrary).toBe(true);
    expect(registry.presets["surface-glint"].hiddenFromLibrary).toBe(true);
    expect(registry.presets["atmospheric-fog"].hiddenFromLibrary).toBe(false);
    expect(Object.values(registry.presets).every((preset) =>
      preset.recommendedBudget > 0 &&
      preset.hardCap >= preset.recommendedBudget &&
      preset.hardRangeFields.length > 0 &&
      typeof preset.renderer === "string" &&
      preset.qualityScale.balanced < preset.qualityScale.high
    )).toBe(true);
  });

  test("resolves priority presets into distinct visual identities", async ({ page }) => {
    await page.goto(gameUrl);
    const signatures = await page.evaluate(() => {
      const api = window.AtlasSceneEffects;
      const level = { world: { width: 1000, height: 700 }, sceneEffects: [], sceneEffectGroups: [] };
      const read = (presetId, variantId) => {
        const effect = api.defaultInstance(presetId, variantId, level.world, level.sceneEffects.length);
        level.sceneEffects.push(effect);
        const resolved = api.resolve(effect, level, { quality: "high", reducedMotion: false });
        return {
          renderer: resolved.preset.renderer,
          variant: resolved.variant.id,
          particleShape: resolved.particleShape,
          motionProfile: resolved.motionProfile,
          emissive: resolved.emissive,
          glow: resolved.glow,
          amount: resolved.amount,
          speed: resolved.speed,
          lifetime: resolved.lifetime,
          opacity: resolved.opacity,
          particleCap: resolved.particleCap,
          sparkAmount: resolved.sparkAmount,
          glowProfile: resolved.glowProfile,
          primaryColor: resolved.primaryColor,
          highlightDensity: resolved.highlightDensity,
          rayStrength: resolved.rayStrength,
          rayCount: resolved.rayCount,
          rayStartAngle: resolved.rayStartAngle,
          rayEndAngle: resolved.rayEndAngle,
          rayAnimationAmount: resolved.rayAnimationAmount,
          rayDriftSpeed: resolved.rayDriftSpeed,
          rayPulseSpeed: resolved.rayPulseSpeed,
          raySpreadBreathing: resolved.raySpreadBreathing,
          rayWobbleAmount: resolved.rayWobbleAmount,
          bloomStrength: resolved.bloomStrength,
          dustAmount: resolved.dustAmount,
          heatShimmerStrength: resolved.heatShimmerStrength,
          animationSpeed: resolved.animationSpeed
        };
      };
      return {
        pollen: read("ambient-floating-particles", "warm-pollen"),
        sunDust: read("ambient-floating-particles", "sun-dust"),
        ancientDust: read("ambient-floating-particles", "fine-ancient-dust"),
        magicMotes: read("ambient-floating-particles", "magic-motes"),
        embers: read("sparks-and-embers", "floating-embers"),
        forgeSparks: read("sparks-and-embers", "forge-sparks"),
        fireflies: read("living-lights", "forest-fireflies"),
        fog: read("atmospheric-fog", "harbor-haze"),
        chimneySmoke: read("smoke-and-steam", "chimney-smoke"),
        steam: read("smoke-and-steam", "steam-vent"),
        water: read("water-surface", "harbor-water"),
        glint: read("surface-glint", "wet-stone"),
        bubbles: read("bubbles-and-spray", "rising-bubbles"),
        fountainSparkle: read("bubbles-and-spray", "fountain-sparkle"),
        rune: read("magical-glow", "rune"),
        torch: read("light-source-enhancement", "wall-torch"),
        warmSun: read("sun-presence", "warm-day-sun"),
        goldenSun: read("sun-presence", "golden-hour-sun"),
        eveningSun: read("sun-presence", "soft-evening-sun")
      };
    });

    expect(signatures.pollen).toMatchObject({ renderer: "particleField", motionProfile: "windDrift", emissive: false, glow: 0 });
    expect(signatures.pollen.particleShape).not.toBe(signatures.fireflies.particleShape);
    expect(signatures.fireflies).toMatchObject({ motionProfile: "livingWander", particleShape: "fireflyCore", emissive: true });
    expect(signatures.fireflies.particleCap).toBeLessThan(signatures.pollen.particleCap);

    expect(signatures.sunDust).toMatchObject({ motionProfile: "windDrift", particleShape: "dustSpeck", emissive: false, glow: 0 });
    expect(signatures.magicMotes).toMatchObject({ motionProfile: "orbitFocus", particleShape: "sparkle", emissive: true });
    expect(signatures.ancientDust.amount).toBeLessThan(signatures.pollen.amount);
    expect(signatures.ancientDust.opacity).toBeLessThan(signatures.pollen.opacity);

    expect(signatures.embers).toMatchObject({ motionProfile: "upwardEmber", particleShape: "ember", emissive: true });
    expect(signatures.forgeSparks).toMatchObject({ motionProfile: "upwardEmber", particleShape: "sparkle" });
    expect(signatures.embers.motionProfile).not.toBe(signatures.fireflies.motionProfile);
    expect(signatures.forgeSparks.motionProfile).not.toBe(signatures.magicMotes.motionProfile);

    expect(signatures.fog.renderer).toBe("fogField");
    expect(signatures.chimneySmoke.renderer).toBe("plumeEmitter");
    expect(signatures.steam.renderer).toBe("plumeEmitter");
    expect(signatures.steam.lifetime).toBeLessThan(signatures.chimneySmoke.lifetime);
    expect(signatures.steam.speed).toBeGreaterThan(signatures.chimneySmoke.speed);
    expect(signatures.steam.opacity).toBeLessThan(signatures.chimneySmoke.opacity);

    expect(signatures.water.renderer).toBe("surfaceShimmer");
    expect(signatures.glint.renderer).toBe("surfaceGlint");
    expect(signatures.glint.amount).toBeLessThan(signatures.water.amount);
    expect(signatures.glint.highlightDensity).toBeLessThan(signatures.water.highlightDensity);

    expect(signatures.bubbles).toMatchObject({ motionProfile: "risingBubble", particleShape: "bubble", emissive: false });
    expect(signatures.fountainSparkle).toMatchObject({ motionProfile: "fountainSpray", particleShape: "sparkle" });
    expect(signatures.bubbles.motionProfile).not.toBe(signatures.fireflies.motionProfile);
    expect(signatures.bubbles.motionProfile).not.toBe(signatures.magicMotes.motionProfile);

    expect(signatures.rune).toMatchObject({ renderer: "glowField", glowProfile: "magicalPulse", motionProfile: "orbitFocus" });
    expect(signatures.torch).toMatchObject({ renderer: "glowField", glowProfile: "warmFlicker", motionProfile: "upwardEmber" });
    expect(signatures.torch.sparkAmount).toBeGreaterThan(signatures.rune.sparkAmount);
    expect(signatures.warmSun).toMatchObject({ renderer: "sunPresence", glowProfile: "sunPresence", particleShape: "dustSpeck", motionProfile: "windDrift", emissive: false });
    expect(signatures.warmSun.rayStrength).toBeGreaterThan(signatures.warmSun.bloomStrength);
    expect(signatures.warmSun.rayStrength).toBeGreaterThan(1.1);
    expect(signatures.warmSun.rayStartAngle).toBeLessThan(signatures.warmSun.rayEndAngle);
    expect(signatures.warmSun).toMatchObject({
      rayAnimationAmount: 2,
      rayDriftSpeed: 1.85,
      rayPulseSpeed: 1.75,
      raySpreadBreathing: 2,
      rayWobbleAmount: 1.9
    });
    expect(signatures.warmSun.rayAnimationAmount).toBeGreaterThanOrEqual(2);
    expect(signatures.warmSun.raySpreadBreathing).toBeGreaterThanOrEqual(2);
    expect(signatures.goldenSun.rayStrength).toBeGreaterThan(signatures.warmSun.rayStrength);
    expect(signatures.goldenSun.bloomStrength).toBeGreaterThan(signatures.warmSun.bloomStrength);
    expect(signatures.goldenSun.rayCount).toBeLessThan(signatures.warmSun.rayCount);
    expect(signatures.goldenSun.rayStartAngle).toBeGreaterThan(signatures.warmSun.rayStartAngle);
    expect(signatures.goldenSun.rayEndAngle).toBeGreaterThan(signatures.warmSun.rayEndAngle);
    expect(signatures.goldenSun.rayDriftSpeed).toBeLessThan(signatures.warmSun.rayDriftSpeed);
    expect(signatures.goldenSun.raySpreadBreathing).toBeGreaterThan(signatures.warmSun.raySpreadBreathing);
    expect(signatures.goldenSun.rayWobbleAmount).toBeGreaterThan(signatures.warmSun.rayWobbleAmount);
    expect(signatures.eveningSun.rayStrength).toBeGreaterThan(signatures.eveningSun.bloomStrength);
    expect(signatures.eveningSun.rayStrength).toBeGreaterThan(0.8);
    expect(signatures.eveningSun.dustAmount).toBeLessThan(signatures.warmSun.dustAmount);
    expect(signatures.eveningSun.rayAnimationAmount).toBeLessThan(signatures.warmSun.rayAnimationAmount);
    expect(signatures.eveningSun.rayDriftSpeed).toBeLessThan(signatures.warmSun.rayDriftSpeed);
  });

  test("registers a valid sun-presence pointRadius effect with reduced-motion scaling", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(() => {
      const api = window.AtlasSceneEffects;
      const level = { world: { width: 1000, height: 700 }, sceneEffects: [], sceneEffectGroups: [] };
      const effect = api.defaultInstance("sun-presence", "warm-day-sun", level.world, 0);
      level.sceneEffects.push(effect);
      const high = api.resolve(effect, level, { quality: "high", reducedMotion: false });
      const reduced = api.resolve(effect, level, { quality: "reduced", reducedMotion: true });
      return {
        defaultGeometry: api.PRESETS["sun-presence"].defaultGeometry,
        effectGeometry: effect.geometry,
        valid: api.validateLevel(level),
        invalidRendererShape: api.validateInstance({
          ...effect,
          id: "bad-sun",
          geometry: { type: "rectangle", x: 500, y: 200, width: 200, height: 120 }
        }, level),
        invalidControl: api.validateInstance({
          ...effect,
          id: "bad-control",
          overrides: { rayCount: 50 }
        }, level),
        invalidRayAngle: api.validateInstance({
          ...effect,
          id: "bad-ray-angle",
          overrides: { rayStartAngle: -420, rayEndAngle: 30 }
        }, level),
        validAnimationControls: api.validateInstance({
          ...effect,
          id: "valid-ray-animation",
          overrides: {
            rayAnimationAmount: 3,
            rayDriftSpeed: 3,
            rayPulseSpeed: 3,
            raySpreadBreathing: 3,
            rayWobbleAmount: 3
          }
        }, level),
        invalidAnimationControl: api.validateInstance({
          ...effect,
          id: "bad-ray-animation",
          overrides: { rayAnimationAmount: 3.01 }
        }, level),
        high: {
          renderer: high.preset.renderer,
          layerSlot: high.layerSlot,
          rayStrength: high.rayStrength,
          bloomStrength: high.bloomStrength,
          rayCount: high.rayCount,
          rayStartAngle: high.rayStartAngle,
          rayEndAngle: high.rayEndAngle,
          rayAnimationAmount: high.rayAnimationAmount,
          rayDriftSpeed: high.rayDriftSpeed,
          rayPulseSpeed: high.rayPulseSpeed,
          raySpreadBreathing: high.raySpreadBreathing,
          rayWobbleAmount: high.rayWobbleAmount,
          heatShimmerStrength: high.heatShimmerStrength,
          dustAmount: high.dustAmount,
          animationSpeed: high.animationSpeed,
          quality: high.quality
        },
        reduced: {
          rayStrength: reduced.rayStrength,
          bloomStrength: reduced.bloomStrength,
          rayCount: reduced.rayCount,
          rayStartAngle: reduced.rayStartAngle,
          rayEndAngle: reduced.rayEndAngle,
          rayAnimationAmount: reduced.rayAnimationAmount,
          rayDriftSpeed: reduced.rayDriftSpeed,
          rayPulseSpeed: reduced.rayPulseSpeed,
          raySpreadBreathing: reduced.raySpreadBreathing,
          rayWobbleAmount: reduced.rayWobbleAmount,
          heatShimmerStrength: reduced.heatShimmerStrength,
          dustAmount: reduced.dustAmount,
          animationSpeed: reduced.animationSpeed,
          quality: reduced.quality
        },
        hashA: api.hash(effect.seed, 91),
        hashB: api.hash(effect.seed, 91)
      };
    });
    expect(result.defaultGeometry).toMatchObject({ type: "pointRadius", radius: 250 });
    expect(result.effectGeometry.type).toBe("pointRadius");
    expect(result.valid.valid).toBe(true);
    expect(result.invalidRendererShape.valid).toBe(false);
    expect(result.invalidRendererShape.errors.join(" ")).toContain("unsupported");
    expect(result.invalidControl.valid).toBe(false);
    expect(result.invalidControl.errors.join(" ")).toContain("rayCount");
    expect(result.invalidRayAngle.valid).toBe(false);
    expect(result.invalidRayAngle.errors.join(" ")).toContain("rayStartAngle");
    expect(result.validAnimationControls.valid).toBe(true);
    expect(result.invalidAnimationControl.valid).toBe(false);
    expect(result.invalidAnimationControl.errors.join(" ")).toContain("rayAnimationAmount");
    expect(result.high).toMatchObject({ renderer: "sunPresence", layerSlot: "worldLight", quality: "high" });
    expect(result.high.rayStrength).toBeGreaterThan(result.high.bloomStrength);
    expect(result.high.rayCount).toBe(10);
    expect(result.high.rayStartAngle).toBe(-38);
    expect(result.high.rayEndAngle).toBe(34);
    expect(result.high.rayAnimationAmount).toBe(2);
    expect(result.high.rayDriftSpeed).toBe(1.85);
    expect(result.high.rayPulseSpeed).toBe(1.75);
    expect(result.high.raySpreadBreathing).toBe(2);
    expect(result.high.rayWobbleAmount).toBe(1.9);
    expect(result.reduced.quality).toBe("reduced");
    expect(result.reduced.heatShimmerStrength).toBe(0);
    expect(result.reduced.rayCount).toBe(10);
    expect(result.reduced.rayStartAngle).toBe(result.high.rayStartAngle);
    expect(result.reduced.rayEndAngle).toBe(result.high.rayEndAngle);
    expect(result.reduced.rayAnimationAmount).toBeLessThan(result.high.rayAnimationAmount);
    expect(result.reduced.rayDriftSpeed).toBeLessThan(result.high.rayDriftSpeed);
    expect(result.reduced.rayPulseSpeed).toBeLessThan(result.high.rayPulseSpeed);
    expect(result.reduced.raySpreadBreathing).toBeLessThan(result.high.raySpreadBreathing);
    expect(result.reduced.rayWobbleAmount).toBeLessThan(result.high.rayWobbleAmount);
    expect(result.reduced.rayStrength).toBeGreaterThan(result.reduced.bloomStrength);
    expect(result.reduced.rayStrength).toBeLessThan(result.high.rayStrength);
    expect(result.reduced.dustAmount).toBeLessThan(result.high.dustAmount);
    expect(result.reduced.animationSpeed).toBeLessThan(result.high.animationSpeed);
    expect(result.hashA).toBe(result.hashB);
  });

  test("renders Sun Presence visibly on the worldLight layer under reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0015", { startImmediately: true });
      const api = window.AtlasSceneEffects;
      const level = window.eval("level");
      level.sceneEffects = [api.defaultInstance("sun-presence", "warm-day-sun", level.world, 0)];
      level.sceneEffects[0].id = "visible-sun-presence";
      level.sceneEffects[0].geometry = { type: "pointRadius", x: 360, y: 115, radius: 260 };
      level.sceneEffects[0].seed = 9271;
      window.eval("sceneEffectRuntime.prepareLevel")(level);
      window.eval("render")();
      window.eval("sceneEffectRuntime.restart")();
    });
    await page.waitForTimeout(120);
    const result = await page.evaluate(() => {
      const canvas = document.querySelector('[data-scene-effects-canvas="worldLight"]');
      const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
      let alphaPixels = 0;
      let warmPixels = 0;
      for (let index = 0; index < data.length; index += 64) {
        const alpha = data[index + 3];
        if (!alpha) continue;
        alphaPixels += 1;
        if (data[index] > data[index + 2]) warmPixels += 1;
      }
      return {
        resolved: window.eval("sceneEffectRuntime.resolved[0].preset.renderer"),
        layerSlot: window.eval("sceneEffectRuntime.resolved[0].layerSlot"),
        heatShimmerStrength: window.eval("sceneEffectRuntime.resolved[0].heatShimmerStrength"),
        alphaPixels,
        warmPixels
      };
    });
    expect(result).toMatchObject({ resolved: "sunPresence", layerSlot: "worldLight", heatShimmerStrength: 0 });
    expect(result.alphaPixels).toBeGreaterThan(400);
    expect(result.warmPixels / result.alphaPixels).toBeGreaterThan(0.8);
    const afterMovementRender = await page.evaluate(() => {
      window.eval("state.worldX = Math.min(level.world.width - 20, state.worldX + 180)");
      window.eval("render")();
      const canvas = document.querySelector('[data-scene-effects-canvas="worldLight"]');
      const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
      let alphaPixels = 0;
      for (let index = 3; index < data.length; index += 64) if (data[index]) alphaPixels += 1;
      return {
        alphaPixels,
        renderer: window.eval("sceneEffectRuntime.resolved[0].preset.renderer"),
        raf: Boolean(window.eval("sceneEffectRuntime.rafId"))
      };
    });
    expect(afterMovementRender).toMatchObject({ renderer: "sunPresence", raf: true });
    expect(afterMovementRender.alphaPixels).toBeGreaterThan(400);
    const deterministicRender = await page.evaluate(() => {
      const originalRandom = Math.random;
      let randomCalls = 0;
      Math.random = () => {
        randomCalls += 1;
        throw new Error("Sun Presence render must stay seeded.");
      };
      try {
        window.eval("sceneEffectRuntime.restart")();
      } finally {
        Math.random = originalRandom;
      }
      const canvas = document.querySelector('[data-scene-effects-canvas="worldLight"]');
      const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
      let alphaPixels = 0;
      for (let index = 3; index < data.length; index += 64) if (data[index]) alphaPixels += 1;
      return { randomCalls, alphaPixels };
    });
    expect(deterministicRender.randomCalls).toBe(0);
    expect(deterministicRender.alphaPixels).toBeGreaterThan(400);
  });

  test("keeps levels without effects unchanged", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0005", { startImmediately: true });
      return {
        sceneEffects: window.eval("level.sceneEffects"),
        canvases: document.querySelectorAll("[data-scene-effects-canvas]").length,
        runtimeCount: window.eval("sceneEffectRuntime.resolved.length")
      };
    });
    expect(result).toEqual({ sceneEffects: undefined, canvases: 0, runtimeCount: 0 });
  });

  test("resolves groups, deterministic seeds, geometry cutouts and quality scaling", async ({ page }) => {
    await startFixture(page);
    const result = await page.evaluate(() => {
      const api = window.AtlasSceneEffects;
      const level = window.eval("level");
      const water = level.sceneEffects.find((effect) => effect.id === "test-water");
      const high = api.resolve(water, level, { quality: "high", reducedMotion: false });
      const reduced = api.resolve(water, level, { quality: "reduced", reducedMotion: true });
      return {
        valid: api.validateLevel(level),
        invalid: api.validateLevel({
          sceneEffectGroups: [],
          sceneEffects: [{
            ...water,
            id: "invalid-water",
            presetVersion: 99,
            groupId: "missing-group",
            layerSlot: "999",
            geometry: { type: "polygon", points: [{ x: 1, y: 1 }, { x: 2, y: 2 }], cutouts: [] },
            overrides: { primaryColor: "blue", particleCap: 999, mystery: 4 }
          }]
        }),
        inherited: { color: high.primaryColor, speed: high.speed, intensity: high.intensity },
        hashA: api.hash(water.seed, 14),
        hashB: api.hash(water.seed, 14),
        insideOuter: api.pointInsideGeometry({ x: 150, y: 500 }, water.geometry),
        insideCutout: api.pointInsideGeometry({ x: 320, y: 510 }, water.geometry),
        highQuality: high.quality,
        reducedQuality: reduced.quality,
        reducedSpeed: reduced.speed
      };
    });
    expect(result.valid.valid).toBe(true);
    expect(result.invalid.valid).toBe(false);
    expect(result.invalid.errors.join(" ")).toContain("unsupported presetVersion");
    expect(result.invalid.errors.join(" ")).toContain("mystery");
    expect(result.invalid.errors.join(" ")).toContain("hard cap");
    expect(result.inherited).toEqual({ color: "#A7C8D8", speed: 0.85, intensity: 0.72 });
    expect(result.hashA).toBe(result.hashB);
    expect(result.insideOuter).toBe(true);
    expect(result.insideCutout).toBe(false);
    expect(result.highQuality).toBe("high");
    expect(result.reducedQuality).toBe("reduced");
    expect(result.reducedSpeed).toBeLessThan(result.inherited.speed);
  });

  test("keeps water shimmer inside its polygon and exclusion cutout", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await startFixture(page);
    await page.evaluate(() => {
      const level = window.eval("level");
      const water = level.sceneEffects.find((effect) => effect.id === "test-water");
      water.overrides = { ...water.overrides, edgeFeatherPx: 0, amount: 2, highlightDensity: 2, intensity: 1.2 };
      level.sceneEffects = [water];
      window.eval("sceneEffectRuntime.prepareLevel")(level);
      window.eval("render")();
      window.eval("sceneEffectRuntime.restart")();
    });
    await page.waitForTimeout(120);
    const mask = await page.evaluate(() => {
      const api = window.AtlasSceneEffects;
      const water = window.eval("level.sceneEffects[0]");
      const canvas = document.querySelector('[data-scene-effects-canvas="worldAtmosphere"]');
      const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
      let painted = 0;
      let outside = 0;
      let cutout = 0;
      for (let y = 0; y < canvas.height; y += 2) {
        for (let x = 0; x < canvas.width; x += 2) {
          const alpha = data[(y * canvas.width + x) * 4 + 3];
          if (!alpha) continue;
          painted += 1;
          if (!api.pointInsideGeometry({ x, y }, water.geometry)) {
            outside += 1;
            if (water.geometry.cutouts.some((polygon) => {
              const geometry = { type: "polygon", points: polygon, cutouts: [] };
              return api.pointInsideGeometry({ x, y }, geometry);
            })) cutout += 1;
          }
        }
      }
      return { painted, outside, cutout };
    });
    expect(mask.painted).toBeGreaterThan(0);
    expect(mask.outside / mask.painted).toBeLessThan(0.01);
    expect(mask.cutout / mask.painted).toBeLessThan(0.005);
  });

  test("mounts one shared canvas per semantic slot with pointer transparency and cleanup", async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await startFixture(page);
    await expect(page.locator("[data-scene-effects-canvas]")).toHaveCount(4);
    const mounted = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return {
        slots: [...document.querySelectorAll("[data-scene-effects-canvas]")].map((canvas) => ({
          slot: canvas.dataset.sceneEffectsCanvas,
          z: Number(getComputedStyle(canvas).zIndex),
          pointerEvents: getComputedStyle(canvas).pointerEvents,
          width: canvas.width,
          height: canvas.height
        })),
        layers: [
          "--layer-background", "--layer-effects-background", "--layer-ambient-flybys",
          "--layer-effects-world", "--layer-ambient-animals", "--layer-effects-light",
          "--layer-sven", "--layer-effects-foreground", "--layer-world-ui"
        ].map((name) => Number(root.getPropertyValue(name))),
        raf: Boolean(window.eval("sceneEffectRuntime.rafId"))
        ,
        quality: window.eval("sceneEffectRuntime.resolved[0].quality")
      };
    });
    expect(mounted.layers).toEqual([10, 15, 20, 25, 30, 35, 40, 45, 50]);
    expect(mounted.slots.every((slot) => slot.pointerEvents === "none")).toBe(true);
    expect(mounted.slots.every((slot) => slot.width === 2172 && slot.height === 724)).toBe(true);
    expect(mounted.raf).toBe(true);
    expect(mounted.quality).toBe(testInfo.project.name.startsWith("ipad-") ? "balanced" : "high");

    const transitionPaused = await page.evaluate(() => {
      window.eval("state.screen = 'transition'");
      window.eval("render")();
      return window.eval("sceneEffectRuntime.rafId");
    });
    expect(transitionPaused).toBeNull();
    await page.evaluate(() => {
      window.eval("state.screen = 'scene'");
      window.eval("render")();
    });

    const cleaned = await page.evaluate(async () => {
      window.eval("sceneEffectRuntime.pause")();
      const paused = window.eval("sceneEffectRuntime.rafId");
      await window.eval("selectLevel")("LVL-0005", { startImmediately: true });
      return {
        paused,
        count: window.eval("sceneEffectRuntime.resolved.length"),
        canvases: document.querySelectorAll("[data-scene-effects-canvas]").length
      };
    });
    expect(cleaned).toEqual({ paused: null, count: 0, canvases: 0 });
  });

  test("renders every delivered preset family and skips only invalid instances", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
      const level = window.eval("level");
      level.sceneEffectGroups = [];
      level.sceneEffects = Object.values(window.AtlasSceneEffects.PRESETS).map((preset, index) => {
        const effect = window.AtlasSceneEffects.defaultInstance(preset.id, preset.variants[0].id, level.world, index);
        effect.id = `all-presets-${index}`;
        return effect;
      });
      level.sceneEffects.push({
        id: "invalid-effect",
        presetId: "missing-preset",
        variantId: "missing",
        presetVersion: 1,
        enabled: true,
        seed: 1,
        layerSlot: "worldAtmosphere",
        geometry: { type: "point", x: 1, y: 1 },
        overrides: {}
      });
      window.eval("sceneEffectRuntime.prepareLevel")(level);
      window.eval("render")();
      window.eval("sceneEffectRuntime.restart")();
    });
    await page.waitForTimeout(120);
    const result = await page.evaluate(() => ({
      resolved: window.eval("sceneEffectRuntime.resolved.length"),
      expected: Object.keys(window.AtlasSceneEffects.PRESETS).length,
      alphaPixels: [...document.querySelectorAll("[data-scene-effects-canvas]")].reduce((sum, canvas) => {
        const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
        let count = 0;
        for (let index = 3; index < data.length; index += 256) if (data[index]) count += 1;
        return sum + count;
      }, 0)
    }));
    expect(result.resolved).toBe(result.expected);
    expect(result.alphaPixels).toBeGreaterThan(0);
  });

  test("keeps an overlapping ambient animal clickable through effect canvases", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0004", { startImmediately: true });
      const level = window.eval("level");
      level.sceneEffects = [{
        id: "animal-overlap-fog",
        label: "Animal overlap fog",
        presetId: "atmospheric-fog",
        variantId: "harbor-haze",
        presetVersion: 1,
        enabled: true,
        seed: 411,
        qualityTier: "auto",
        layerSlot: "foregroundAtmosphere",
        groupId: "",
        geometry: { type: "ellipse", x: 790, y: 370, width: 420, height: 260 },
        overrides: { intensity: 0.7 }
      }];
      level.sceneEffectGroups = [];
      window.eval("sceneEffectRuntime.prepareLevel")(level);
      window.eval("render")();
    });
    const animal = page.getByRole("button", { name: "Meeuw", exact: true });
    await expect(animal).toBeVisible();
    const before = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      attempts: window.eval("state.attempts")
    }));
    const box = await animal.boundingBox();
    if (!box) throw new Error("Ambient animal was not measurable.");
    await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(80);
    const after = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      attempts: window.eval("state.attempts"),
      moving: window.eval("state.moving"),
      activeRuneId: window.eval("state.activeRuneId"),
      canvasPointerEvents: [...document.querySelectorAll("[data-scene-effects-canvas]")].map((canvas) => getComputedStyle(canvas).pointerEvents)
    }));
    expect(after).toEqual({
      ...before,
      moving: false,
      activeRuneId: null,
      canvasPointerEvents: ["none", "none", "none", "none"]
    });
  });
});

test.describe("scene effects editor", () => {
  test("exposes Sun Presence in the preset library and adds the default pointRadius variant", async ({ page }) => {
    await page.goto(`${gameUrl}?dev=editor`);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
      const level = window.eval("level");
      level.sceneEffects = [];
      level.sceneEffectGroups = [];
      window.eval("sceneEffectRuntime.prepareLevel")(level);
      window.eval("render")();
    });
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Effects", exact: true }).click();
    await expect(page.locator("[data-scene-effects-editor]")).toBeVisible();
    const sunCard = await page.locator("[data-effect-preset-card='sun-presence']").textContent();
    expect(sunCard).toContain("Sun Presence");
    expect(sunCard).toContain("Warm day sun");
    await expect(page.locator("[data-effect-preset-card='smoke-and-steam']")).toHaveCount(0);
    await expect(page.locator("[data-effect-preset-card='water-surface']")).toHaveCount(0);
    await expect(page.locator("[data-effect-preset-card='surface-glint']")).toHaveCount(0);
    await expect(page.locator("[data-effect-preset-card='atmospheric-fog']")).toHaveCount(1);
    await addPresetEffect(page, "sun-presence");
    const stored = await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.presetId === 'sun-presence')"));
    expect(stored).toMatchObject({
      presetId: "sun-presence",
      variantId: "warm-day-sun",
      layerSlot: "worldLight",
      geometry: { type: "pointRadius" }
    });
    await expect(page.locator("[data-effect-override='rayStartAngle']")).toBeVisible();
    await expect(page.locator("[data-effect-override='rayEndAngle']")).toBeVisible();
    await openEffectDetails(page, "Advanced");
    for (const field of ["rayAnimationAmount", "rayDriftSpeed", "rayPulseSpeed", "raySpreadBreathing", "rayWobbleAmount"]) {
      await expect(page.locator(`[data-effect-override='${field}']`)).toBeVisible();
    }
    await page.locator("[data-effect-override='rayStartAngle']").fill("-90");
    await page.locator("[data-effect-override='rayStartAngle']").dispatchEvent("change");
    await page.locator("[data-effect-override='rayEndAngle']").fill("-30");
    await page.locator("[data-effect-override='rayEndAngle']").dispatchEvent("change");
    for (const [field, value] of [
      ["rayAnimationAmount", "2.25"],
      ["rayDriftSpeed", "1.75"],
      ["rayPulseSpeed", "1.5"],
      ["raySpreadBreathing", "2"],
      ["rayWobbleAmount", "0.5"]
    ]) {
      await openEffectDetails(page, "Advanced");
      await page.locator(`[data-effect-override='${field}']`).fill(value);
      await page.locator(`[data-effect-override='${field}']`).dispatchEvent("change");
    }
    expect(await page.evaluate(() => {
      const effect = window.eval("level.sceneEffects.find((item) => item.presetId === 'sun-presence')");
      return {
        rayStartAngle: effect.overrides.rayStartAngle,
        rayEndAngle: effect.overrides.rayEndAngle,
        rayAnimationAmount: effect.overrides.rayAnimationAmount,
        rayDriftSpeed: effect.overrides.rayDriftSpeed,
        rayPulseSpeed: effect.overrides.rayPulseSpeed,
        raySpreadBreathing: effect.overrides.raySpreadBreathing,
        rayWobbleAmount: effect.overrides.rayWobbleAmount
      };
    })).toEqual({
      rayStartAngle: -90,
      rayEndAngle: -30,
      rayAnimationAmount: 2.25,
      rayDriftSpeed: 1.75,
      rayPulseSpeed: 1.5,
      raySpreadBreathing: 2,
      rayWobbleAmount: 0.5
    });
  });

  test("switches mode, adds a preset, edits colors and overrides, resets, duplicates and deletes", async ({ page }) => {
    await page.goto(`${gameUrl}?dev=editor`);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
      window.eval("render")();
    });
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Effects", exact: true }).click();
    await expect(page.locator("[data-scene-effects-editor]")).toBeVisible();
    const pollenCard = await page.locator("[data-effect-preset-card='ambient-floating-particles']").textContent();
    expect(pollenCard).toContain("Best for:");
    expect(pollenCard).toContain("Avoid for:");
    expect(pollenCard).toContain("Looks like:");
    expect(pollenCard).toContain("Sunlit forests");
    await addPresetEffect(page, "light-source-enhancement");
    await page.evaluate(() => {
      const selected = window.eval("selectedSceneEffect")();
      const level = window.eval("level");
      level.sceneEffects = [selected];
      window.eval(`walkPathEditor.selectedEffectId = "${selected.id}"`);
      window.eval("render")();
    });
    await expect(page.locator("[data-effect-property-panel]")).toBeVisible();
    await expect(page.locator(".sceneEffectGuides")).toHaveCount(1);
    await setGuidesVisible(page, false);
    await expect(page.locator(".sceneEffectGuides")).toHaveCount(0);
    await setGuidesVisible(page, true);
    await page.locator("[data-effect-color='primaryColor']").fill("#336699");
    await expect(page.locator("[data-effect-hex='primaryColor']")).toHaveValue("#336699");
    await page.locator("[data-effect-hex='primaryColor']").fill("#445566");
    await page.locator("[data-effect-hex='primaryColor']").dispatchEvent("change");
    await expect(page.locator("[data-effect-color='primaryColor']")).toHaveValue("#445566");
    await page.locator("[data-effect-override='intensity']").fill("0.91");
    await page.locator("[data-effect-override='intensity']").dispatchEvent("change");
    await openEffectDetails(page, "Expert");
    await page.locator("[data-effect-override='particleCap']").fill("120");
    await page.locator("[data-effect-override='particleCap']").dispatchEvent("change");
    await page.evaluate(() => {
      const effect = window.eval("level.sceneEffects[0]");
      if (effect.overrides.primaryColor !== "#445566") window.eval("updateSceneEffectOverride")("primaryColor", "#445566");
      if (effect.overrides.intensity !== 0.91) window.eval("updateSceneEffectOverride")("intensity", "0.91");
      if (effect.overrides.particleCap !== 120) window.eval("updateSceneEffectOverride")("particleCap", "120");
    });
    let stored = await page.evaluate(() => window.eval("level.sceneEffects[0]"));
    expect(stored.overrides).toMatchObject({ primaryColor: "#445566", intensity: 0.91, particleCap: 120 });
    await openEffectDetails(page, "Expert");
    await page.locator("[data-effect-reset-field='particleCap']").click({ force: true });
    if (await page.evaluate(() => window.eval("level.sceneEffects[0].overrides.particleCap")) !== undefined) {
      await page.evaluate(() => window.eval("resetSceneEffectField")("particleCap"));
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects[0].overrides.particleCap"))).toBeUndefined();
    await openEffectDetails(page, "Expert");
    await page.locator("[data-effect-override='particleCap']").fill("120");
    await page.locator("[data-effect-override='particleCap']").dispatchEvent("change");
    await page.getByRole("button", { name: "Reset Quick" }).click({ force: true });
    if (await page.evaluate(() => window.eval("level.sceneEffects[0].overrides.primaryColor")) !== undefined) {
      await page.evaluate(() => window.eval("resetSceneEffectSection")("quick"));
    }
    stored = await page.evaluate(() => window.eval("level.sceneEffects[0]"));
    expect(stored.overrides.primaryColor).toBeUndefined();
    expect(stored.overrides.intensity).toBeUndefined();
    expect(stored.overrides.particleCap).toBe(120);
    await openEffectDetails(page, "Advanced");
    await page.locator("[data-effect-override='warmth']").fill("0.9");
    await page.locator("[data-effect-override='warmth']").dispatchEvent("change");
    await openEffectDetails(page, "Advanced");
    await page.locator("[data-effect-color='secondaryColor']").fill("#88BBCC");
    expect(await page.evaluate(() => window.eval("level.sceneEffects[0].overrides"))).toMatchObject({
      warmth: 0.9,
      secondaryColor: "#88BBCC"
    });
    await openEffectDetails(page, "Advanced");
    await page.getByRole("button", { name: "Reset Advanced" }).click({ force: true });
    if (await page.evaluate(() => window.eval("level.sceneEffects[0].overrides.warmth")) !== undefined) {
      await page.evaluate(() => window.eval("resetSceneEffectSection")("advanced"));
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects[0].overrides.warmth"))).toBeUndefined();
    await page.getByRole("button", { name: "Reset effect" }).click({ force: true });
    if (Object.keys(await page.evaluate(() => window.eval("level.sceneEffects[0].overrides"))).length) {
      await page.evaluate(() => window.eval("resetSceneEffect")());
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects[0].overrides"))).toEqual({});
    await page.getByRole("button", { name: "Duplicate" }).click({ force: true });
    if (await page.evaluate(() => window.eval("level.sceneEffects.length")) === 1) {
      await page.evaluate(() => window.eval("duplicateSceneEffect")());
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects.length"))).toBe(2);
    await page.getByRole("button", { name: "Create group" }).click({ force: true });
    if (await page.evaluate(() => window.eval("(level.sceneEffectGroups || []).length")) === 0) {
      await page.evaluate(() => window.eval("createSceneEffectGroup")());
    }
    const groupId = await page.evaluate(() => window.eval("level.sceneEffectGroups[0].id"));
    await page.locator("[data-select-effect]").first().click();
    await page.locator("[data-effect-field='groupId']").selectOption(groupId);
    await page.evaluate((id) => {
      const level = window.eval("level");
      if (level.sceneEffects?.[0]) level.sceneEffects[0].groupId = id;
    }, groupId);
    await page.evaluate(() => window.eval("updateSceneEffectGroup")("intensity", window.eval("effectControlValue")(window.eval("selectedSceneEffect")(), "intensity")));
    const grouped = await page.evaluate(() => {
      const level = window.eval("level");
      return {
        groupIds: level.sceneEffects.map((effect) => effect.groupId),
        geometries: level.sceneEffects.map((effect) => effect.geometry),
        shared: level.sceneEffectGroups[0].overrides.intensity
      };
    });
    expect(grouped.groupIds).toEqual([groupId, groupId]);
    expect(grouped.geometries[0]).not.toEqual(grouped.geometries[1]);
    expect(grouped.shared).toBeGreaterThan(0);
    await page.getByRole("button", { name: "Delete", exact: true }).click({ force: true });
    if (await page.evaluate(() => window.eval("level.sceneEffects.length")) !== 1) {
      await page.evaluate(() => window.eval("deleteSceneEffect")());
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects.length"))).toBe(1);
    await page.getByRole("button", { name: "Copy", exact: true }).click({ force: true });
    await page.evaluate(() => window.eval("copySceneEffect")());
    await page.getByRole("button", { name: "Paste", exact: true }).click({ force: true });
    if (await page.evaluate(() => window.eval("level.sceneEffects.length")) !== 2) {
      await page.evaluate(() => window.eval("pasteSceneEffect")());
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects.length"))).toBe(2);
    await page.getByRole("button", { name: "Delete", exact: true }).click({ force: true });
    if (await page.evaluate(() => window.eval("level.sceneEffects.length")) !== 1) {
      await page.evaluate(() => window.eval("deleteSceneEffect")());
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects.length"))).toBe(1);
    await expect(page.getByText("Draft Status: Modified")).toBeVisible();
  });

  test("edits polygon vertices and cutouts, directional handles, nudging and preview lifecycle", async ({ page }) => {
    await startFixture(page, { editor: true });
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Effects", exact: true }).click();
    await openEffectGeometry(page);
    await expect(page.locator("[data-effect-geometry-workspace]")).toBeVisible();
    await expect(page.locator("[data-effect-vertex]")).toHaveCount(8);
    const outerBefore = await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-water').geometry.points[0].x"));
    await page.keyboard.press("Shift+ArrowRight");
    expect(await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-water').geometry.points[0].x"))).toBe(outerBefore + 10);
    await page.locator("[data-effect-edge='0'][data-effect-cutout='']").click({ force: true });
    expect(await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-water').geometry.points.length"))).toBe(5);
    await page.getByRole("button", { name: "Add cutout" }).click();
    expect(await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-water').geometry.cutouts.length"))).toBe(2);
    await page.locator("[data-effect-vertex='0'][data-effect-cutout='1']").click({ force: true });
    await page.keyboard.press("Shift+ArrowRight");
    const vertexX = await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-water').geometry.cutouts[1][0].x"));
    expect(vertexX).toBeGreaterThan(0);
    await closeEffectGeometry(page);
    await page.locator("[data-effect-field='geometryType']").selectOption("ellipse");
    await openEffectGeometry(page);
    const ellipseWidth = await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-water').geometry.width"));
    const resizeHandle = page.locator("[data-effect-handle='resize']").first();
    const resizeBox = await resizeHandle.boundingBox();
    if (!resizeBox) throw new Error("Effect resize handle was not measurable.");
    await page.mouse.move(resizeBox.x + resizeBox.width / 2, resizeBox.y + resizeBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(resizeBox.x + resizeBox.width / 2 + 28, resizeBox.y + resizeBox.height / 2 + 18);
    await page.mouse.up();
    expect(await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-water').geometry.width"))).toBeGreaterThan(ellipseWidth);
    await closeEffectGeometry(page);
    await page.getByRole("button", { name: "Test brazier" }).click({ force: true }).catch(() => {});
    await page.evaluate(() => {
      window.eval("walkPathEditor.selectedEffectId = 'test-brazier'");
      window.eval("walkPathEditor.effectEditScope = 'source'");
      window.eval("render")();
    });
    await openEffectGeometry(page);
    const radiusBefore = await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-brazier').geometry.radius"));
    const radiusHandle = page.locator("[data-effect-handle='radius']").first();
    const radiusBox = await radiusHandle.boundingBox();
    if (!radiusBox) throw new Error("Effect radius handle was not measurable.");
    await page.mouse.move(radiusBox.x + radiusBox.width / 2, radiusBox.y + radiusBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(radiusBox.x + radiusBox.width / 2 + 24, radiusBox.y + radiusBox.height / 2);
    await page.mouse.up();
    expect(await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-brazier').geometry.radius"))).toBeGreaterThan(radiusBefore);
    await closeEffectGeometry(page);
    await page.getByRole("button", { name: "Test chimney smoke" }).click({ force: true }).catch(() => {});
    await page.evaluate(() => {
      window.eval("walkPathEditor.selectedEffectId = 'test-smoke'");
      window.eval("walkPathEditor.effectEditScope = 'source'");
      window.eval("render")();
    });
    await openEffectGeometry(page);
    const directionHandle = page.locator("[data-effect-handle='direction']").first();
    await expect(directionHandle).toBeVisible();
    const directionBefore = await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-smoke').geometry.directionDeg"));
    const directionBox = await directionHandle.boundingBox();
    if (!directionBox) throw new Error("Effect direction handle was not measurable.");
    await page.mouse.move(directionBox.x + directionBox.width / 2, directionBox.y + directionBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(directionBox.x + directionBox.width / 2 + 35, directionBox.y + directionBox.height / 2 + 22);
    await page.mouse.up();
    expect(await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-smoke').geometry.directionDeg"))).not.toBe(directionBefore);
    await closeEffectGeometry(page);
    await page.getByRole("button", { name: "Pause" }).click({ force: true }).catch(() => {});
    if (!await page.evaluate(() => window.eval("sceneEffectRuntime.paused"))) {
      await page.evaluate(() => window.eval("sceneEffectRuntime.pause")());
    }
    expect(await page.evaluate(() => window.eval("sceneEffectRuntime.paused"))).toBe(true);
    await page.getByRole("button", { name: "Play" }).click({ force: true }).catch(() => {});
    if (await page.evaluate(() => window.eval("sceneEffectRuntime.paused"))) {
      await page.evaluate(() => window.eval("sceneEffectRuntime.play")());
    }
    expect(await page.evaluate(() => window.eval("sceneEffectRuntime.paused"))).toBe(false);
    const oldSeed = await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-smoke').seed"));
    await page.getByRole("button", { name: "Generate variation" }).click({ force: true }).catch(() => {});
    if (await page.evaluate((seed) => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-smoke').seed") === seed, oldSeed)) {
      await page.evaluate(() => window.eval("sceneEffectRuntime.generateSeed")("test-smoke"));
    }
    expect(await page.evaluate(() => window.eval("level.sceneEffects.find((effect) => effect.id === 'test-smoke').seed"))).not.toBe(oldSeed);
    await page.getByRole("button", { name: "Isolate selected" }).click({ force: true }).catch(() => {});
    if (await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length")) !== 1) {
      await page.evaluate(() => window.eval("sceneEffectRuntime.setVisibility")("isolate", "test-smoke"));
    }
    expect(await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length"))).toBe(1);
    await page.getByRole("button", { name: "Hide effect" }).click({ force: true }).catch(() => {});
    if (await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length")) !== 2) {
      await page.evaluate(() => window.eval("sceneEffectRuntime.setVisibility")("selectedHidden", "test-smoke"));
    }
    expect(await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length"))).toBe(2);
    await page.getByRole("button", { name: "Background only" }).click({ force: true }).catch(() => {});
    if (await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length")) !== 0) {
      await page.evaluate(() => window.eval("sceneEffectRuntime.setVisibility")("backgroundOnly", "test-smoke"));
    }
    expect(await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length"))).toBe(0);
    await page.getByRole("button", { name: "Show all effects" }).click({ force: true }).catch(() => {});
    if (await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length")) !== 3) {
      await page.evaluate(() => window.eval("sceneEffectRuntime.setVisibility")("all", "test-smoke"));
    }
    expect(await page.evaluate(() => window.eval("sceneEffectRuntime.resolved.length"))).toBe(3);
  });

  test("supports direct source, polygon, emitter and independent mask pointer editing", async ({ page }) => {
    test.slow();
    await openEffectsEditor(page);

    await page.locator("[data-effect-preset-card='light-source-enhancement'] [data-effect-library-variant]").selectOption("wall-torch");
    await addPresetEffect(page, "light-source-enhancement");
    await page.evaluate(() => {
      const effect = window.eval("level.sceneEffects[0]");
      effect.geometry.x = 180;
      effect.geometry.y = 320;
      window.eval("sceneEffectRuntime.prepareLevel")(window.eval("level"));
      window.eval("render")();
    });
    const torchId = await page.evaluate(() => window.eval("level.sceneEffects[0].id"));
    const beforeMove = await page.evaluate(() => ({
      geometry: { ...window.eval("level.sceneEffects[0].geometry") },
      worldX: window.eval("state.worldX"),
      worldY: window.eval("state.worldY"),
      moving: window.eval("state.moving")
    }));
    await dragCenter(page, page.locator(`[data-effect-guide='${torchId}'] [data-effect-handle='move']`).first(), 42, 22);
    let afterTorch = await page.evaluate(() => ({
      geometry: { ...window.eval("level.sceneEffects[0].geometry") },
      worldX: window.eval("state.worldX"),
      worldY: window.eval("state.worldY"),
      moving: window.eval("state.moving")
    }));
    expect(afterTorch.geometry.x).not.toBe(beforeMove.geometry.x);
    expect(afterTorch.geometry.y).not.toBe(beforeMove.geometry.y);
    expect(afterTorch.worldX).toBe(beforeMove.worldX);
    expect(afterTorch.worldY).toBe(beforeMove.worldY);
    expect(afterTorch.moving).toBe(false);

    await openEffectGeometry(page);
    const radiusBefore = afterTorch.geometry.radius;
    await dragCenter(page, page.locator("[data-effect-handle='radius']").first(), 34, 0);
    afterTorch = await page.evaluate(() => ({ ...window.eval("level.sceneEffects[0].geometry") }));
    expect(afterTorch.radius).toBeGreaterThan(radiusBefore);
    await expect(page.locator("[data-effect-coordinate='radius']")).toHaveValue(String(Math.round(afterTorch.radius)));
    await closeEffectGeometry(page);

    await page.evaluate(() => {
      window.eval("addSceneEffect")("atmospheric-fog");
      const level = window.eval("level");
      level.sceneEffects[1].geometry = {
        type: "polygon",
        points: [{ x: 165, y: 455 }, { x: 525, y: 455 }, { x: 525, y: 625 }, { x: 165, y: 625 }],
        cutouts: []
      };
      window.eval(`walkPathEditor.selectedEffectId = "${level.sceneEffects[1].id}"`);
      window.eval("render")();
    });
    await openEffectGeometry(page);
    await page.getByRole("button", { name: "Draw source polygon" }).click();
    await clickWorld(page, 180, 460);
    await clickWorld(page, 520, 455);
    await page.keyboard.press("Escape");
    expect(await page.evaluate(() => window.eval("level.sceneEffects[1].geometry.points.length"))).toBe(4);
    await page.getByRole("button", { name: "Draw source polygon" }).click();
    await clickWorld(page, 180, 460);
    await clickWorld(page, 520, 455);
    await clickWorld(page, 550, 620);
    await clickWorld(page, 150, 625);
    await page.keyboard.press("Enter");
    expect(await page.evaluate(() => window.eval("level.sceneEffects[1].geometry.points.length"))).toBe(4);
    const vertexBefore = await page.evaluate(() => ({ ...window.eval("level.sceneEffects[1].geometry.points[0]") }));
    await dragCenter(page, page.locator("[data-effect-vertex-scope='source'][data-effect-vertex='0']").first(), 28, 18);
    const vertexAfter = await page.evaluate(() => ({ ...window.eval("level.sceneEffects[1].geometry.points[0]") }));
    expect(vertexAfter.x).not.toBe(vertexBefore.x);
    await page.locator("[data-effect-edge-scope='source'][data-effect-edge='0']").click({ force: true });
    expect(await page.evaluate(() => window.eval("level.sceneEffects[1].geometry.points.length"))).toBe(5);
    await page.getByRole("button", { name: "Delete vertex" }).click();
    expect(await page.evaluate(() => window.eval("level.sceneEffects[1].geometry.points.length"))).toBe(4);
    await page.getByRole("button", { name: "Cutout", exact: true }).click({ force: true });
    await page.getByRole("button", { name: "Add cutout" }).click();
    await dragCenter(page, page.locator("[data-effect-vertex-scope='maskCutout'], [data-effect-vertex-scope='sourceCutout']").first(), 10, 8);
    await page.getByRole("button", { name: "Mask", exact: true }).click({ force: true });
    await page.getByRole("button", { name: "Duplicate mask from source" }).click();
    expect(await page.evaluate(() => window.eval("level.sceneEffects[1].mask.includes.length"))).toBe(1);
    await closeEffectGeometry(page);

    await page.locator("[data-effect-preset-card='sparks-and-embers'] [data-effect-library-variant]").selectOption("rising-sparks");
    await addPresetEffect(page, "sparks-and-embers");
    await page.locator("[data-effect-field='geometryType']").selectOption("directionalEmitter");
    await openEffectGeometry(page);
    const directionBefore = await page.evaluate(() => window.eval("level.sceneEffects[2].geometry.directionDeg"));
    await dragCenter(page, page.locator("[data-effect-handle='direction']").first(), 35, 24);
    expect(await page.evaluate(() => window.eval("level.sceneEffects[2].geometry.directionDeg"))).not.toBe(directionBefore);
    const widthBefore = await page.evaluate(() => window.eval("level.sceneEffects[2].geometry.width"));
    await dragCenter(page, page.locator("[data-effect-handle='width']").first(), 22, 16);
    expect(await page.evaluate(() => window.eval("level.sceneEffects[2].geometry.width"))).not.toBe(widthBefore);
    await closeEffectGeometry(page);

    await page.locator("[data-effect-preset-card='bubbles-and-spray'] [data-effect-library-variant]").selectOption("rising-bubbles");
    await addPresetEffect(page, "bubbles-and-spray");
    await openEffectGeometry(page);
    await page.getByRole("button", { name: "Mask", exact: true }).click({ force: true });
    await page.getByRole("button", { name: "Draw include polygon" }).click();
    await clickWorld(page, 980, 420);
    await clickWorld(page, 1160, 420);
    await clickWorld(page, 1160, 585);
    await clickWorld(page, 980, 585);
    await page.keyboard.press("Enter");
    const independentBefore = await page.evaluate(() => ({
      source: { ...window.eval("level.sceneEffects[3].geometry") },
      mask: window.eval("level.sceneEffects[3].mask.includes[0].map((point) => ({...point}))")
    }));
    await page.getByRole("button", { name: "Source", exact: true }).click({ force: true });
    await dragCenter(page, page.locator("[data-effect-handle='move']").first(), 32, 0);
    let independentAfter = await page.evaluate(() => ({
      source: { ...window.eval("level.sceneEffects[3].geometry") },
      mask: window.eval("level.sceneEffects[3].mask.includes[0].map((point) => ({...point}))")
    }));
    expect(independentAfter.source.x).not.toBe(independentBefore.source.x);
    expect(independentAfter.mask).toEqual(independentBefore.mask);
    await page.getByRole("button", { name: "Mask", exact: true }).click({ force: true });
    await dragCenter(page, page.locator("[data-effect-handle='mask-move']").first(), 0, 26);
    independentAfter = await page.evaluate(() => ({
      source: { ...window.eval("level.sceneEffects[3].geometry") },
      mask: window.eval("level.sceneEffects[3].mask.includes[0].map((point) => ({...point}))")
    }));
    expect(independentAfter.source.x).not.toBe(independentBefore.source.x);
    expect(independentAfter.mask).not.toEqual(independentBefore.mask);

    const clip = await page.evaluate(async () => {
      const level = window.eval("level");
      const bubbles = level.sceneEffects[3];
      bubbles.geometry.x = 1080;
      bubbles.geometry.y = 520;
      bubbles.layerSlot = "worldAtmosphere";
      bubbles.overrides = { ...bubbles.overrides, edgeFeatherPx: 0, amount: 1.5, intensity: 1, particleCap: 80 };
      level.sceneEffects = [bubbles];
      window.eval("sceneEffectRuntime.prepareLevel")(level);
      window.eval("render")();
      window.eval("sceneEffectRuntime.restart")();
      await new Promise((resolve) => setTimeout(resolve, 120));
      const api = window.AtlasSceneEffects;
      const canvas = document.querySelector('[data-scene-effects-canvas="worldAtmosphere"]');
      const validation = api.validateLevel(level);
      const data = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
      let painted = 0;
      let outside = 0;
      for (let y = 0; y < canvas.height; y += 3) {
        for (let x = 0; x < canvas.width; x += 3) {
          const alpha = data[(y * canvas.width + x) * 4 + 3];
          if (!alpha) continue;
          painted += 1;
          if (!api.pointInsideMask({ x, y }, bubbles.mask)) outside += 1;
        }
      }
      return {
        painted,
        outside,
        feather: api.resolve(bubbles, level, { quality: "high" })?.edgeFeatherPx,
        resolved: window.eval("sceneEffectRuntime.resolved.length"),
        valid: validation.valid,
        errors: validation.errors,
        mask: bubbles.mask
      };
    });
    expect(clip.valid, clip.errors.join(" ")).toBe(true);
    expect(clip.resolved).toBe(1);
    expect(clip.painted).toBeGreaterThan(0);
    expect(clip.outside / clip.painted).toBeLessThan(0.03);
    expect(clip.feather).toBeGreaterThanOrEqual(0);
  });

  test("persists temporary effects through Draft and Apply, reloads runtime, then restores the production file", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const levelPath = path.join(root, "Levels", "LVL-0003", "level.js");
    const draftPath = path.join(root, "Levels", "LVL-0003", "editor.draft.json");
    const originalLevel = fs.readFileSync(levelPath, "utf8");
    const originalDraft = fs.existsSync(draftPath) ? fs.readFileSync(draftPath, "utf8") : null;
    try {
      if (fs.existsSync(draftPath)) fs.unlinkSync(draftPath);
      await page.goto(editorUrl);
      await page.evaluate(async () => {
        await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
        window.eval("render")();
      });
      await page.keyboard.press("Control+Shift+D");
      await page.getByRole("button", { name: "Effects", exact: true }).click();
      await addPresetEffect(page, "light-source-enhancement");
      await page.locator("[data-effect-color='primaryColor']").fill("#CC7733");
      await page.locator("[data-effect-override='intensity']").fill("0.83");
      await page.locator("[data-effect-override='intensity']").dispatchEvent("change");
      await page.evaluate(() => {
        window.eval("audioConfig.tracks.guides = []");
        window.eval("persistWalkPathDraft")();
      });
      const expected = await page.evaluate(() => {
        const effect = window.eval("level.sceneEffects[0]");
        return { variantId: effect.variantId, seed: effect.seed, overrides: effect.overrides };
      });
      await expect.poll(async () => {
        return page.evaluate(async () => {
          const response = await fetch("/__dev/levels/LVL-0003/editor-draft");
          return (await response.json()).sceneEffects?.length;
        });
      }).toBe(1);
      const draftAudio = await page.evaluate(async () => {
        const response = await fetch("/__dev/levels/LVL-0003/editor-draft");
        const draft = await response.json();
        return {
          hasAudioConfig: Boolean(draft.audioConfig),
          sceneEffectsTopLevel: Array.isArray(draft.sceneEffects),
          audioHasSceneEffects: Boolean(draft.audioConfig?.sceneEffects || draft.audioConfig?.tracks?.sceneEffects)
        };
      });
      expect(draftAudio).toEqual({ hasAudioConfig: false, sceneEffectsTopLevel: true, audioHasSceneEffects: false });
      await page.getByRole("button", { name: "Apply" }).click({ force: true }).catch(() => {});
      await page.waitForTimeout(120);
      if (await page.evaluate(() => window.eval("walkPathEditor.status")) !== "Applied") {
        await page.evaluate(() => window.eval("applyWalkPathDraft")());
      }
      await expect.poll(async () => page.evaluate(() => ({
        status: window.eval("walkPathEditor.status"),
        message: window.eval("walkPathEditor.message")
      }))).toMatchObject({ status: "Applied" });
      expect(fs.readFileSync(levelPath, "utf8")).toContain("sceneEffects:");

      const reload = await page.context().newPage();
      await reload.goto(process.env.ATLAS_EDITOR_URL);
      const result = await reload.evaluate(async () => {
        await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
        return {
          count: window.eval("level.sceneEffects.length"),
          presetId: window.eval("level.sceneEffects[0].presetId"),
          variantId: window.eval("level.sceneEffects[0].variantId"),
          seed: window.eval("level.sceneEffects[0].seed"),
          overrides: window.eval("level.sceneEffects[0].overrides"),
          selectedEffectId: window.eval("walkPathEditor.selectedEffectId"),
          canvases: document.querySelectorAll("[data-scene-effects-canvas]").length
        };
      });
      expect(result).toEqual({
        count: 1,
        presetId: "light-source-enhancement",
        variantId: expected.variantId,
        seed: expected.seed,
        overrides: expected.overrides,
        selectedEffectId: "light-source-enhancement-01",
        canvases: 4
      });
      await reload.close();
    } finally {
      fs.writeFileSync(levelPath, originalLevel);
      if (originalDraft === null) {
        if (fs.existsSync(draftPath)) fs.unlinkSync(draftPath);
      } else {
        fs.writeFileSync(draftPath, originalDraft);
      }
    }
  });
});
