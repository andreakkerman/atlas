// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const editorUrl = `${gameUrl}?dev=editor`;

async function startItaly(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(async () => {
    await window.eval("selectLevel")("LVL-0016", { startImmediately: true });
    window.eval("render")();
  });
  await expect(page.locator("[data-ambient-flyby='italyCommonSwift']")).toHaveAttribute("data-ready", "true");
}

test.describe("ambient flyby runtime", () => {
  test("Italy swift uses a smooth outside-to-outside path with stable flap geometry", async ({ page }) => {
    await startItaly(page);
    const result = await page.evaluate(async () => {
      const flyby = window.eval("level.ambientFlybys[0]");
      const runtime = window.eval("ambientFlybyRuntime");
      const cache = runtime.cacheFor(flyby);
      const shell = document.querySelector("[data-ambient-flyby='italyCommonSwift']");
      const frameA = shell.querySelector(".ambientFlybyFrameA");
      const frameB = shell.querySelector(".ambientFlybyFrameB");
      const rect = (node) => {
        const box = node.getBoundingClientRect();
        return [box.width, box.height].map((value) => Math.round(value * 100) / 100);
      };
      const before = { a: rect(frameA), b: rect(frameB), questions: window.AtlasSessionReport.getCurrent()?.questions.length || 0 };
      runtime.preview(flyby.id);
      await new Promise((resolve) => setTimeout(resolve, 180));
      const during = {
        active: shell.dataset.active,
        frame: shell.dataset.frame,
        progress: Number(shell.dataset.progress),
        rotation: Number(shell.dataset.rotation),
        pointerEvents: getComputedStyle(shell).pointerEvents,
        a: rect(frameA),
        b: rect(frameB),
        activeCount: runtime.active.size
      };
      return {
        config: flyby,
        first: cache.samples[0],
        last: cache.samples.at(-1),
        totalLength: cache.totalLength,
        sampleCount: cache.samples.length,
        before,
        during,
        questionsAfter: window.AtlasSessionReport.getCurrent()?.questions.length || 0
      };
    });

    expect(result.config).toMatchObject({
      intervalMinMs: 10000,
      intervalMaxMs: 25000,
      faceFlightDirection: true,
      rotateAlongPath: true
    });
    expect(result.first.x).toBeLessThan(0);
    expect(result.last.x).toBeGreaterThan(2172);
    expect(result.sampleCount).toBeGreaterThan(result.config.path.length);
    expect(result.totalLength).toBeGreaterThan(2172);
    expect(result.before.a).toEqual(result.before.b);
    expect(result.during.a).toEqual(result.during.b);
    expect(result.during.active).toBe("true");
    expect(result.during.progress).toBeGreaterThan(0);
    expect(Math.abs(result.during.rotation)).toBeLessThanOrEqual(result.config.maxRotationDeg);
    expect(result.during.pointerEvents).toBe("none");
    expect(result.during.activeCount).toBe(1);
    expect(result.questionsAfter).toBe(result.before.questions);
  });

  test("distance integration is frame-rate independent and cleanup removes RAF/audio", async ({ page }) => {
    await startItaly(page);
    const result = await page.evaluate(() => {
      const build = window.AtlasAmbientSystem.buildPathCache;
      const point = window.AtlasAmbientSystem.pointAtDistance;
      const cache = build([{ x: 0, y: 0 }, { x: 1000, y: 100 }]);
      const simulate = (fps) => {
        let distance = 0;
        for (let index = 0; index < fps * 2; index += 1) distance += 300 * (1 / fps);
        return point(cache, distance).progress;
      };
      const runtime = window.eval("ambientFlybyRuntime");
      runtime.preview("italyCommonSwift");
      runtime.stopAll();
      return {
        p30: simulate(30),
        p60: simulate(60),
        p120: simulate(120),
        active: runtime.active.size,
        timers: runtime.timers.size,
        audio: runtime.activeAudio.size
      };
    });
    expect(result.p30).toBeCloseTo(result.p60, 8);
    expect(result.p60).toBeCloseTo(result.p120, 8);
    expect(result).toMatchObject({ active: 0, timers: 0, audio: 0 });
  });

  test("reduced motion suppresses automatic scheduling", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await startItaly(page);
    const timers = await page.evaluate(() => {
      window.eval("ambientFlybyRuntime.sync")();
      return window.eval("ambientFlybyRuntime.timers.size");
    });
    expect(timers).toBe(0);
  });
});

test.describe("ambient editor usability", () => {
  test("panel scrolls, sections collapse, and flight points remain editable off-screen", async ({ page }) => {
    await startItaly(page, editorUrl);
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Selecteer Gierzwaluw", exact: true }).click();
    const panel = page.locator("[data-developer-tools]");
    const scroll = await panel.evaluate((node) => {
      node.scrollTop = node.scrollHeight;
      return { top: node.scrollTop, height: node.clientHeight, total: node.scrollHeight, overflow: getComputedStyle(node).overflowY };
    });
    expect(scroll.total).toBeGreaterThan(scroll.height);
    expect(scroll.top).toBeGreaterThan(0);
    expect(scroll.overflow).toBe("auto");

    await page.getByRole("button", { name: "Edit flight path" }).click();
    await expect(page.locator("[data-flight-path-workspace]")).toBeVisible();
    await expect(page.locator("[data-flyby-point]")).toHaveCount(4);
    const authored = await page.evaluate(() => window.eval("level.ambientFlybys[0].path"));
    expect(authored[0].x).toBeLessThan(0);
    expect(authored.at(-1).x).toBeGreaterThan(2172);

    await page.locator("[data-flyby-point='0']").click({ force: true });
    await page.locator("[data-flight-point-coordinate='x']").fill("-260");
    await page.locator("[data-flight-point-coordinate='x']").dispatchEvent("change");
    expect(await page.evaluate(() => window.eval("level.ambientFlybys[0].path[0].x"))).toBe(-260);
    await page.getByRole("button", { name: "Reverse path" }).click();
    expect(await page.evaluate(() => window.eval("level.ambientFlybys[0].path[0].x"))).toBeGreaterThan(2172);
    await page.getByRole("button", { name: "Fit flight path" }).click();
    await page.getByRole("button", { name: "Fit level" }).click();
    await page.getByRole("button", { name: "Done" }).click();
    await expect(page.locator("[data-flight-path-workspace]")).toHaveCount(0);
  });
});

test.describe("guide blink fallback", () => {
  test("missing optional Minnie and Moose blink files keep normal portraits and purr controls", async ({ page }) => {
    await startItaly(page);
    const state = await page.evaluate(() => ({
      minnieReady: window.eval("guideBlinkRuntime.minnie.ready"),
      mooseReady: window.eval("guideBlinkRuntime.moose.ready"),
      portraits: [...document.querySelectorAll("[data-guide-image]")].map((image) => image.getAttribute("src")),
      purrControls: document.querySelectorAll("[data-purr-guide]").length
    }));
    expect(state).toEqual({
      minnieReady: false,
      mooseReady: false,
      portraits: ["assets/guides/minnie.png", "assets/guides/moose.png"],
      purrControls: 2
    });
  });
});
