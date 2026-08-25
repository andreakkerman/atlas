// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const zlib = require("zlib");

const fileUrl = `${pathToFileURL(path.join(__dirname, "..", "index.html"))}?dev=editor`;
const runtimeUrl = process.env.ATLAS_EDITOR_URL || fileUrl;

function pngLuminance(buffer) {
  let offset = 8;
  let width = 0;
  let height = 0;
  let channels = 0;
  const chunks = [];
  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.toString("ascii", offset + 4, offset + 8);
    const data = buffer.subarray(offset + 8, offset + 8 + length);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      expect(data[8]).toBe(8);
      channels = data[9] === 6 ? 4 : data[9] === 2 ? 3 : 0;
    } else if (type === "IDAT") chunks.push(data);
    else if (type === "IEND") break;
    offset += length + 12;
  }
  expect(channels).toBeGreaterThan(0);
  const packed = zlib.inflateSync(Buffer.concat(chunks));
  const stride = width * channels;
  const decoded = Buffer.alloc(stride * height);
  let sourceOffset = 0;
  const paeth = (a, b, c) => {
    const p = a + b - c;
    const pa = Math.abs(p - a);
    const pb = Math.abs(p - b);
    const pc = Math.abs(p - c);
    return pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
  };
  for (let y = 0; y < height; y += 1) {
    const filter = packed[sourceOffset++];
    const rowOffset = y * stride;
    for (let x = 0; x < stride; x += 1) {
      const raw = packed[sourceOffset++];
      const left = x >= channels ? decoded[rowOffset + x - channels] : 0;
      const up = y > 0 ? decoded[rowOffset - stride + x] : 0;
      const upperLeft = y > 0 && x >= channels ? decoded[rowOffset - stride + x - channels] : 0;
      const correction = filter === 1 ? left
        : filter === 2 ? up
          : filter === 3 ? Math.floor((left + up) / 2)
            : filter === 4 ? paeth(left, up, upperLeft) : 0;
      decoded[rowOffset + x] = (raw + correction) & 255;
    }
  }
  let luminance = 0;
  let blackPixels = 0;
  const pixelCount = width * height;
  for (let i = 0; i < decoded.length; i += channels) {
    const value = (decoded[i] * 0.2126 + decoded[i + 1] * 0.7152 + decoded[i + 2] * 0.0722) / 255;
    luminance += value;
    if (value < 0.012) blackPixels += 1;
  }
  return { mean: luminance / pixelCount, blackShare: blackPixels / pixelCount };
}

test.describe("Atlas WebGPU voxel presentation", () => {
  test("publishes accepted Voxel presets with deterministic two-renderer migration", async ({ page }) => {
    await page.goto(fileUrl);
    const api = await page.evaluate(() => {
      const renderer = window.AtlasVoxelRenderer;
      const migrationInputs = ["classic", "illustrated", "showcase", "experimental", "voxel-v1", "voxel-v2", "voxel-v3", "voxel"];
      return {
        voxelPresets: Object.keys(renderer.VOXEL_PRESETS),
        voxelHigh: renderer.normalizeSettings({ renderer: "voxel", quality: "high" }),
        voxelLimits: renderer.normalizeSettings({ renderer: "voxel", quality: "custom", voxelSize: 0, renderScale: 9, blockGap: 0.4, spriteVoxelScale: 9 }),
        migrations: Object.fromEntries(migrationInputs.map((id) => [id, renderer.normalizeSettings({ renderer: id, quality: "custom", voxelSize: 6, exposure: 1.23, motionResponse: 1.5 })])),
        depthCandidates: renderer.depthCandidates({ id: "LVL-0002", world: {} })
      };
    });
    expect(api.voxelPresets).toEqual(["low", "medium", "high", "ultra"]);
    expect(api.voxelHigh).toMatchObject({ renderer: "voxel", quality: "high", version: 60, voxelSize: 5, renderScale: 1.5, blockGap: 0.4, spriteVoxelScale: 1.8, effectGlow: 0.5 });
    expect(api.voxelLimits).toMatchObject({ voxelSize: 1, renderScale: 3, blockGap: 0.4, spriteVoxelScale: 4 });
    expect(api.migrations.classic).toMatchObject({ renderer: "illustrated", quality: "custom", voxelSize: 6, exposure: 1.23 });
    expect(api.migrations.illustrated).toMatchObject({ renderer: "illustrated", quality: "custom", voxelSize: 6, exposure: 1.23 });
    expect(api.migrations.showcase).toMatchObject({ renderer: "illustrated", quality: "custom", voxelSize: 6, exposure: 1.23 });
    expect(api.migrations.experimental).toMatchObject({ renderer: "illustrated", quality: "custom", voxelSize: 6, exposure: 1.23 });
    for (const id of ["voxel-v1", "voxel-v2", "voxel-v3", "voxel"]) {
      expect(api.migrations[id]).toMatchObject({ renderer: "voxel", quality: "custom", voxelSize: 6, exposure: 1.23 });
      expect(Object.hasOwn(api.migrations[id], "motionResponse")).toBe(false);
    }
    expect(api.depthCandidates).toEqual(["Levels/LVL-0002/assets/depthmap.png"]);
  });

  test("switches Illustrated and Voxel while persisting production settings", async ({ page }) => {
    await page.goto(fileUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false });
    });
    await page.getByRole("button", { name: "Grafische instellingen" }).click();
    await expect(page.getByRole("button", { name: "Illustrated", exact: true })).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Voxel", exact: true })).toHaveCount(1);
    await expect(page.getByRole("button", { name: "Showcase", exact: true })).toHaveCount(0);
    await expect(page.locator('[data-renderer-choice]')).toHaveCount(2);
    await expect(page.getByText(/Classic|Voxel V1|Voxel V2|Voxel V3/)).toHaveCount(0);
    await page.getByRole("button", { name: "Voxel", exact: true }).click();
    await expect(page.locator(".gameShell")).toHaveAttribute("data-active-renderer", "voxel");
    await page.getByLabel("Graphics quality").selectOption("medium");
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.graphics.v1") || "null"));
    expect(stored).toMatchObject({ version: 60, renderer: "voxel", quality: "medium", voxelSize: 7, renderScale: 1, blockGap: 0.4, spriteVoxelScale: 1.4 });

    await page.keyboard.press("Control+Shift+V");
    await expect(page.locator("[data-voxel-tuning-panel]")).toBeVisible();
    await page.locator('[data-voxel-setting="effectGlow"]').fill("0.25");
    expect((await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.graphics.v1") || "null"))).effectGlow).toBe(0.25);
    await expect(page.getByLabel("Graphics quality")).toHaveValue("custom");

    await page.getByRole("button", { name: "Illustrated", exact: true }).click();
    await expect(page.locator("[data-voxel-canvas]")).toHaveCount(0);
    await expect(page.locator(".worldArt")).toBeVisible();
    await page.getByRole("button", { name: "Voxel", exact: true }).click();
    await expect(page.locator(".gameShell")).toHaveAttribute("data-active-renderer", "voxel");
    await page.getByRole("button", { name: "Illustrated", exact: true }).click();
    await expect(page.locator("[data-voxel-canvas]")).toHaveCount(0);
  });

  test("exposes only effective production controls with the required full ranges", async ({ page }) => {
    await page.goto(fileUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false });
      window.eval("voxelRenderer.updateSettings")({ renderer: "voxel", quality: "high" });
    });
    await page.keyboard.press("Control+Shift+V");
    const voxelSize = page.locator('[data-voxel-setting="voxelSize"]');
    const density = page.locator('[data-voxel-setting="spriteVoxelScale"]');
    const spacing = page.locator('[data-voxel-setting="blockGap"]');
    const scale = page.locator('[data-voxel-setting="renderScale"]');
    await expect(voxelSize).toHaveAttribute("min", "1");
    await expect(voxelSize).toHaveAttribute("max", "10");
    await expect(voxelSize).toHaveValue("5");
    await expect(density).toHaveAttribute("min", "0.5");
    await expect(density).toHaveAttribute("max", "4");
    await expect(density).toHaveValue("1.8");
    await expect(spacing).toHaveValue("0.4");
    await expect(scale).toHaveAttribute("min", "0.5");
    await expect(scale).toHaveAttribute("max", "3");
    await expect(scale).toHaveValue("1.5");
    await expect(page.locator('[data-voxel-setting="effectGlow"]')).toHaveValue("0.5");
    await expect(page.locator('[data-voxel-setting="motionResponse"], [data-voxel-setting="guardBand"], [data-voxel-setting="worldExtrusion"]')).toHaveCount(0);

    const voxelHelp = page.getByRole("button", { name: "Info over Voxel size" });
    await voxelHelp.click();
    await expect(voxelHelp).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("tooltip")).toContainText("Lower values preserve finer artwork");

    await voxelSize.fill("1");
    await density.fill("4");
    await spacing.fill("0.8");
    await scale.fill("3");
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem("atlas.graphics.v1") || "null"));
    expect(stored).toMatchObject({ renderer: "voxel", quality: "custom", voxelSize: 1, spriteVoxelScale: 4, blockGap: 0.8, renderScale: 3 });
  });

  test("publishes the locomotion controller's resolved direction without a second visual flip", async ({ page }) => {
    await page.goto(fileUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false });
      window.eval("locomotion.transition")("walkLeftLoop");
    });
    const actor = page.locator('[data-actor="sven"]');
    await expect(actor).toHaveAttribute("data-resolved-facing", "left");
    await expect(actor).toHaveAttribute("data-asset-path", /walk_left_loop/);
    await expect(page.locator('[data-actor-shell="sven"]')).toHaveClass(/sven-facing-left/);
  });

  test("renders supplied-depth and neutral-depth scenes through production Voxel", async ({ page }, testInfo) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server for WebGPU.");
    test.skip(testInfo.project.name !== "desktop-chromium", "Desktop WebGPU visual integration run.");
    const gpuMessages = [];
    page.on("console", (message) => {
      if (/Atlas Voxel|WebGPU/i.test(message.text()) && message.type() === "error") gpuMessages.push(message.text());
    });
    await page.goto(runtimeUrl);
    test.skip(!(await page.evaluate(() => Boolean(navigator.gpu))), "WebGPU is unavailable in this Chromium runtime.");
    await page.evaluate(() => window.eval("voxelRenderer.updateSettings")({ renderer: "voxel", quality: "high", debugView: "final" }));

    for (const levelId of ["LVL-0001", "LVL-0002", "LVL-0003", "LVL-0004"]) {
      await page.evaluate(async (id) => {
        await window.eval("selectLevel")(id, { startImmediately: true, recordStart: false });
      }, levelId);
      await expect.poll(
        () => page.evaluate(() => window.eval("voxelRenderer.snapshot")().status),
        { timeout: 20_000 }
      ).toMatch(/ready|unavailable/);
      const capability = await page.evaluate(() => window.eval("voxelRenderer.snapshot")());
      test.skip(capability.status === "unavailable", capability.error || "No WebGPU adapter is available in headless Chromium.");
      await expect(page.locator(".gameShell.voxelReady")).toBeVisible();
      await page.waitForTimeout(700);
      const snapshot = await page.evaluate(() => window.eval("voxelRenderer.snapshot")());
      expect(snapshot).toMatchObject({ status: "ready", renderer: "voxel" });
      expect(snapshot.grid[0]).toBeGreaterThan(150);
      expect(snapshot.grid[1]).toBeGreaterThan(80);
      expect(snapshot.sprites).toBeGreaterThan(0);
      if (levelId === "LVL-0004") expect(snapshot.depthMap).toBeNull();
      else expect(snapshot.depthMap).toContain("depthmap.png");
      await page.screenshot({ path: testInfo.outputPath(`${levelId}-voxel.png`) });
    }
    expect(gpuMessages).toEqual([]);
  });

  test("never presents a black viewport during production Voxel idle/walk handoffs", async ({ page }, testInfo) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server for WebGPU.");
    test.skip(testInfo.project.name !== "desktop-chromium", "Desktop WebGPU pixel regression run.");
    await page.goto(runtimeUrl);
    test.skip(!(await page.evaluate(() => Boolean(navigator.gpu))), "WebGPU is unavailable in this Chromium runtime.");
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false });
    });
    await page.getByRole("button", { name: "Grafische instellingen" }).click();
    await page.getByRole("button", { name: "Voxel", exact: true }).click();
    await page.getByLabel("Graphics quality").selectOption("high");
    await page.locator('[data-graphics-action="close"]').click();
    await expect.poll(
      () => page.evaluate(() => window.eval("voxelRenderer.snapshot")().status),
      { timeout: 20_000 }
    ).toMatch(/ready|unavailable/);
    const capability = await page.evaluate(() => window.eval("voxelRenderer.snapshot")());
    test.skip(capability.status !== "ready", capability.error || "No WebGPU adapter is available in headless Chromium.");
    await page.locator("[data-voxel-canvas]").evaluate((canvas) => { canvas.dataset.transitionIdentity = "preserved"; });

    const baseline = pngLuminance(await page.screenshot());
    await page.evaluate(() => {
      const state = window.eval("state");
      window.eval("walkRoute")([{ x: state.player.x + 84, y: state.player.y }], () => {});
    });
    const frames = [];
    for (let index = 0; index < 18; index += 1) frames.push(pngLuminance(await page.screenshot()));
    await page.waitForTimeout(500);
    for (let index = 0; index < 8; index += 1) frames.push(pngLuminance(await page.screenshot()));

    const darkest = frames.reduce((lowest, frame) => frame.mean < lowest.mean ? frame : lowest, frames[0]);
    expect(darkest.mean).toBeGreaterThan(baseline.mean * 0.7);
    expect(darkest.blackShare).toBeLessThan(0.25);
    await expect(page.locator('[data-voxel-canvas][data-transition-identity="preserved"]')).toHaveCount(1);
  });
});
