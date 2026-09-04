// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const fs = require("fs");
const vm = require("vm");

const fileUrl = `${pathToFileURL(path.join(__dirname, "..", "index.html"))}?dev=editor`;
const runtimeUrl = process.env.ATLAS_EDITOR_URL || fileUrl;
require("./editor-draft-fixture").preserveEditorDrafts(test, path.join(__dirname, ".."));

async function restoreWorldConfig(page, source) {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context);
  const response = await page.request.post(new URL("/__dev/world-config", runtimeUrl).toString(), {
    data: context.window.SVEN_WORLD_CONFIG
  });
  if (!response.ok()) throw new Error(`World-config restoration failed: ${response.status()} ${await response.text()}`);
}

test.describe("Illustrated Emissive Glow", () => {
  test.describe.configure({ mode: "serial" });
  test.beforeEach(async ({ page }) => {
    // Emissive tests exercise world settings only. Do not let an unrelated,
    // real walk-path draft become part of their Apply payload.
    await page.route("**/__dev/levels/*/editor-draft", route => {
      if (route.request().method() === "GET") return route.fulfill({ json: {} });
      return route.continue();
    });
  });
  test("normalizes the authored contract without any depth input", async ({ page }) => {
    await page.goto(runtimeUrl);
    const result = await page.evaluate(() => ({
      defaults: window.AtlasEmissiveGlow.normalizeSettings(),
      limits: window.AtlasEmissiveGlow.normalizeSettings({ enabled: true, intensity: 9, radius: 99, sensitivity: -2 }),
      firstThree: ["LVL-0001", "LVL-0002", "LVL-0003"].map((id) => window.SVEN_WORLD_CONFIG.levels[id].emissiveGlow)
    }));
    expect(result.defaults).toEqual({ enabled: false, intensity: 0.7, radius: 8, sensitivity: 0.5 });
    expect(result.limits).toEqual({ enabled: true, intensity: 1.25, radius: 24, sensitivity: 0 });
    expect(result.firstThree).toEqual([
      { enabled: true, intensity: 0.69, radius: 8, sensitivity: 0.5 },
      { enabled: true, intensity: 0.77, radius: 8, sensitivity: 0.5 },
      { enabled: true, intensity: 0.74, radius: 8, sensitivity: 0.5 }
    ]);
  });

  test("runs on depthmap-free LVL-0004 and remains an Illustrated overlay", async ({ page }) => {
    const depthRequests = [];
    const runtimeErrors = [];
    page.on("request", (request) => {
      if (request.url().toLowerCase().includes("depthmap")) depthRequests.push(request.url());
    });
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });
    await page.goto(runtimeUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0004", { startImmediately: true, recordStart: false });
      window.eval("worldResolver.updateLevelSettings")("LVL-0004", {
        emissiveGlow: { enabled: true, intensity: 0.8, radius: 10, sensitivity: 0.4 }
      });
      window.eval("render")();
    });
    const canvas = page.locator("[data-emissive-glow-canvas]");
    await expect(page.locator(".gameShell")).toHaveAttribute("data-active-renderer", "illustrated");
    await expect(page.locator(".worldArt")).toBeVisible();
    await expect(canvas).toBeVisible();
    await expect.poll(() => canvas.evaluate((node) => ({ width: node.width, height: node.height }))).toMatchObject({ width: expect.any(Number), height: expect.any(Number) });
    expect(await canvas.evaluate((node) => node.width > 0 && node.height > 0)).toBe(true);
    expect(depthRequests).toEqual([]);
    expect(runtimeErrors).toEqual([]);
  });

  test("level editor controls update live and persist per level", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const configPath = path.join(__dirname, "..", "Levels", "world-config.js");
    const originalConfig = fs.readFileSync(configPath, "utf8");
    try {
      await page.goto(process.env.ATLAS_EDITOR_URL);
      await page.evaluate(async () => window.eval("selectLevel")("LVL-0004", { startImmediately: true, recordStart: false }));
      await page.keyboard.press("Control+Shift+D");
      const panel = page.locator("[data-developer-tools]");
      await panel.locator('[data-editor-mode="graphics"]').click();
      const configBeforeEdit = await page.evaluate(() => fetch("/__dev/world-config").then((response) => response.json()));
      const controls = panel.locator('[data-editor-panel-key="emissive-glow"]');
      await expect(controls).toBeVisible();
      await controls.locator('[data-emissive-setting="enabled"]').check();
      await controls.locator('[data-emissive-setting="intensity"]').fill("0.83");
      await controls.locator('[data-emissive-setting="radius"]').fill("11.5");
      await controls.locator('[data-emissive-setting="sensitivity"]').fill("0.37");
      await expect(page.locator("[data-emissive-glow-canvas]")).toBeVisible();
      await expect(panel.locator(".walkPathStatusModified")).toHaveText("Draft Status: Modified");
      expect(await page.evaluate(() => window.eval("worldResolver.levelSettings")("LVL-0004").emissiveGlow)).toEqual({
        enabled: true, intensity: 0.83, radius: 11.5, sensitivity: 0.37
      });
      const persistedBeforeApply = await page.evaluate(() => fetch("/__dev/world-config").then((response) => response.json()));
      expect(persistedBeforeApply.levels["LVL-0004"]?.emissiveGlow).toEqual(configBeforeEdit.levels["LVL-0004"]?.emissiveGlow);
      await panel.getByRole("button", { name: "Apply" }).click();
      await expect(panel.locator(".walkPathStatusApplied")).toHaveText("Draft Status: Applied", { timeout: 15_000 });
      await expect(panel.getByText("Editorwijzigingen opgeslagen.", { exact: true })).toBeVisible();
      await panel.getByRole("button", { name: "Apply" }).click();
      await expect(panel.getByText("Geen wijzigingen om toe te passen.", { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Terug naar menu" }).click();
      await expect(page.locator(".levelGrid")).toBeVisible();
      await page.locator('[data-level="LVL-0004"]').first().click();
      await page.getByRole("button", { name: "Start avontuur" }).click();
      await expect(page.locator(".gameShell")).toBeVisible();
      await page.locator('[data-editor-mode="graphics"]').click();
      expect(await page.evaluate(() => window.eval("worldResolver.levelSettings")("LVL-0004").emissiveGlow)).toEqual({
        enabled: true, intensity: 0.83, radius: 11.5, sensitivity: 0.37
      });
      await expect(page.locator('[data-emissive-setting="enabled"]')).toBeChecked();
      await expect(page.locator('[data-emissive-setting="intensity"]')).toHaveValue("0.83");
      await expect(page.locator('[data-emissive-setting="radius"]')).toHaveValue("11.5");
      await expect(page.locator('[data-emissive-setting="sensitivity"]')).toHaveValue("0.37");
      await expect(page.locator("[data-emissive-glow-canvas]")).toBeVisible();
    } finally {
      await restoreWorldConfig(page, originalConfig);
      await page.close();
    }
  });

  test("LVL-0001 preserves Revert and menu re-entry semantics", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const configPath = path.join(__dirname, "..", "Levels", "world-config.js");
    const originalConfig = fs.readFileSync(configPath, "utf8");
    try {
      await page.goto(process.env.ATLAS_EDITOR_URL);
      await page.evaluate(async () => window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false }));
      await page.keyboard.press("Control+Shift+D");
      let panel = page.locator("[data-developer-tools]");
      await panel.locator('[data-editor-mode="graphics"]').click();
      let controls = panel.locator('[data-editor-panel-key="emissive-glow"]');
      await controls.locator('[data-emissive-setting="enabled"]').uncheck();
      await expect(page.locator("[data-emissive-glow-canvas]")).toBeHidden();
      await panel.getByRole("button", { name: "Revert" }).click();
      await expect(controls.locator('[data-emissive-setting="enabled"]')).toBeChecked();
      await expect(page.locator("[data-emissive-glow-canvas]")).toBeVisible();

      await controls.locator('[data-emissive-setting="enabled"]').uncheck();
      await controls.locator('[data-emissive-setting="intensity"]').fill("0.61");
      await controls.locator('[data-emissive-setting="radius"]').fill("9.5");
      await controls.locator('[data-emissive-setting="sensitivity"]').fill("0.44");
      await panel.getByRole("button", { name: "Apply" }).click();
      await expect(panel.getByText("Editorwijzigingen opgeslagen.", { exact: true })).toBeVisible();
      const persisted = await page.evaluate(() => fetch("/__dev/world-config").then((response) => response.json()));
      expect(persisted.levels["LVL-0001"].emissiveGlow).toEqual({ enabled: false, intensity: 0.61, radius: 9.5, sensitivity: 0.44 });

      await page.getByRole("button", { name: "Terug naar menu" }).click();
      await page.locator('[data-level="LVL-0001"]').first().click();
      await page.getByRole("button", { name: "Start avontuur" }).click();
      panel = page.locator("[data-developer-tools]");
      await panel.locator('[data-editor-mode="graphics"]').click();
      controls = panel.locator('[data-editor-panel-key="emissive-glow"]');
      await expect(controls.locator('[data-emissive-setting="enabled"]')).not.toBeChecked();
      await expect(controls.locator('[data-emissive-setting="intensity"]')).toHaveValue("0.61");
      await expect(controls.locator('[data-emissive-setting="radius"]')).toHaveValue("9.5");
      await expect(controls.locator('[data-emissive-setting="sensitivity"]')).toHaveValue("0.44");
      await expect(page.locator("[data-emissive-glow-canvas]")).toBeHidden();
    } finally {
      await restoreWorldConfig(page, originalConfig);
      await page.close();
    }
  });
});
