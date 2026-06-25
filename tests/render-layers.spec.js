// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const editorUrl = `${gameUrl}?dev=editor`;

async function startLayerScene(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(async () => {
    await window.eval("selectLevel")("LVL-0016", { startImmediately: true });
    const currentLevel = window.eval("level");
    currentLevel.ambientAnimals = [{
      id: "layerTestAnimal",
      type: "seagull",
      label: "Layer test animal",
      openFrame: "assets/ambient/animals/seagull/seagull-open.png",
      closedFrame: "assets/ambient/animals/seagull/seagull-closed.png",
      sound: "",
      x: 900,
      y: 410,
      scale: 0.12,
      blinkMinMs: 4000,
      blinkMaxMs: 9000,
      blinkDurationMs: 100,
      doubleBlinkChance: 0.12,
      soundCooldownMs: 1000,
      softness: 0,
      saturation: 1,
      soundVolume: 0.65,
      mirrorX: false
    }];
    window.eval("ambientAnimalRuntime.openReady").add("LVL-0016:layerTestAnimal");
    window.eval("ambientAnimalRuntime.closedReady").add("LVL-0016:layerTestAnimal");
    window.eval("ambientAnimalRuntime.loaded").add("LVL-0016:layerTestAnimal");
    window.eval("render")();
  });
}

test.describe("global render layers", () => {
  test("uses the fixed computed z-index order independent of DOM order", async ({ page }) => {
    await startLayerScene(page);
    const layers = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const z = (selector) => Number(getComputedStyle(document.querySelector(selector)).zIndex);
      return {
        constants: {
          background: Number(root.getPropertyValue("--layer-background")),
          flybys: Number(root.getPropertyValue("--layer-ambient-flybys")),
          animals: Number(root.getPropertyValue("--layer-ambient-animals")),
          sven: Number(root.getPropertyValue("--layer-sven")),
          worldUi: Number(root.getPropertyValue("--layer-world-ui")),
          overlays: Number(root.getPropertyValue("--layer-overlays"))
        },
        effective: {
          background: z(".worldArt"),
          flyby: z("[data-ambient-flyby]"),
          animal: z("[data-ambient-animal='layerTestAnimal']"),
          sven: z("[data-actor-shell='sven']"),
          marker: z("[data-rune]"),
          companion: z("[data-adventure-team-bar]")
        },
        flybyPointerEvents: getComputedStyle(document.querySelector("[data-ambient-flyby]")).pointerEvents,
        animalPointerEvents: getComputedStyle(document.querySelector("[data-ambient-animal='layerTestAnimal']")).pointerEvents,
        domOrder: [
          ...document.querySelector(".worldTrack").children
        ].map((node) => node.className || node.tagName)
      };
    });

    expect(layers.constants).toEqual({
      background: 10,
      flybys: 20,
      animals: 30,
      sven: 40,
      worldUi: 50,
      overlays: 60
    });
    expect(layers.effective).toEqual({
      background: 10,
      flyby: 20,
      animal: 30,
      sven: 40,
      marker: 50,
      companion: 60
    });
    expect(Object.values(layers.effective)).toEqual([10, 20, 30, 40, 50, 60]);
    expect(layers.flybyPointerEvents).toBe("none");
    expect(layers.animalPointerEvents).not.toBe("none");
    expect(layers.domOrder.length).toBeGreaterThan(6);
  });

  test("keeps modal overlays and editor path handles above every world layer", async ({ page }) => {
    await startLayerScene(page);
    await page.getByRole("button", { name: "Colosseum", exact: true }).dispatchEvent("click");
    await expect(page.locator(".modalLayer")).toBeVisible({ timeout: 30000 });
    expect(await page.locator(".modalLayer").evaluate((node) => Number(getComputedStyle(node).zIndex))).toBe(60);

    await startLayerScene(page, editorUrl);
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Selecteer Gierzwaluw", exact: true }).click({ force: true }).catch(() => {});
    await page.getByRole("button", { name: "Edit flight path" }).click({ force: true }).catch(() => {});
    if (await page.locator("[data-flight-path-workspace]").count() === 0) {
      await page.evaluate(() => {
        const flyby = (level.ambientFlybys || []).find((item) => (item.label || item.id) === "Gierzwaluw") || level.ambientFlybys?.[0];
        walkPathEditor.selectedObjectType = "flyby";
        walkPathEditor.selectedObjectId = flyby?.id || null;
        walkPathEditor.pathMode = true;
        walkPathEditor.pathViewBox = null;
        walkPathEditor.selectedPathPoint = 0;
        render();
      });
    }
    const editorLayers = await page.evaluate(() => ({
      workspace: Number(getComputedStyle(document.querySelector("[data-flight-path-workspace]")).zIndex),
      toolbar: Number(getComputedStyle(document.querySelector(".flybyPathToolbar")).zIndex),
      pointPointerEvents: getComputedStyle(document.querySelector("[data-flyby-point] circle")).pointerEvents
    }));
    expect(editorLayers).toEqual({
      workspace: 70,
      toolbar: 80,
      pointPointerEvents: "all"
    });
    await page.locator("[data-flyby-point='0']").click({ force: true });
    await expect(page.locator("[data-flight-point-coordinate='x']")).toBeVisible();
  });
});
