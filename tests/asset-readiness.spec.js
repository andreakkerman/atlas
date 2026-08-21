// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = pathToFileURL(path.join(root, "index.html")).toString();

test.describe("Atlas critical image readiness", () => {
  test.setTimeout(90_000);

  test("collects and deduplicates active-level critical imagery", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(() => {
      const level = {
        id: "TEST",
        world: { background: "level/background.png" },
        guides: { minnie: { portrait: "guides/minnie.png" } },
        ambientAnimals: [
          { id: "owl-1", openFrame: "animals/owl-open.png", closedFrame: "animals/owl-closed.png" },
          { id: "owl-2", openFrame: "animals/owl-open.png", closedFrame: "animals/owl-closed.png" }
        ],
        ambientFlybys: [{ id: "bird", frameA: "fly/a.png", frameB: "fly/b.png" }],
        challengeArt: "challenge/art.png"
      };
      return window.AtlasAssetReadiness.collectCriticalAssets(level, {
        guideBlinkPaths: { minnie: "guides/minnie-blink.png" }
      });
    });
    expect(result.map((item) => item.path)).toEqual([
      "level/background.png", "guides/minnie.png", "guides/minnie-blink.png",
      "animals/owl-open.png", "animals/owl-closed.png", "fly/a.png", "fly/b.png", "challenge/art.png"
    ]);
    expect(result.find((item) => item.path === "level/background.png")?.required).toBe(true);
    expect(result.filter((item) => item.path === "animals/owl-open.png")).toHaveLength(1);
  });

  test("deduplicates decode work, holds ready images, releases level scope and fails critical images", async ({ page }) => {
    await page.goto(gameUrl);
    const productionDedup = await page.evaluate(async () => {
      const cache = window.AtlasAmbientSystem.createAssetCache();
      const first = cache.image("assets/ambient/animals/owl/owl-open.png");
      const second = cache.image("./assets/ambient/animals/owl/owl-open.png");
      const [image] = await Promise.all([first, second]);
      return { samePromise: first === second, entries: cache.images.size, decoded: image.complete && image.naturalWidth > 0 };
    });
    expect(productionDedup).toEqual({ samePromise: true, entries: 1, decoded: true });
    const result = await page.evaluate(async () => {
      const calls = new Map();
      const released = [];
      const loader = async (src) => {
        calls.set(src, (calls.get(src) || 0) + 1);
        if (src.includes("missing")) throw new Error(`missing ${src}`);
        return { src, complete: true, naturalWidth: 64 };
      };
      let svenReady = false;
      const coordinator = window.AtlasAssetReadiness.createCoordinator({
        loadImage: loader,
        preloadSven: async () => { svenReady = true; },
        releaseImages: (paths) => released.push(...paths)
      });
      const sharedAnimal = [{ id: "owl", openFrame: "owl.png", closedFrame: "owl.png" }];
      const first = await coordinator.prepare({ id: "A", world: { background: "a.png" }, ambientAnimals: sharedAnimal });
      coordinator.activate(first);
      const second = await coordinator.prepare({ id: "B", world: { background: "b.png" }, ambientAnimals: sharedAnimal });
      coordinator.activate(second);
      let failure = "";
      try {
        await coordinator.prepare({ id: "C", world: { background: "missing.png" } });
      } catch (error) {
        failure = error.message;
      }
      return {
        svenReady,
        firstReady: first.ready,
        held: first.images.size,
        owlCalls: calls.get("owl.png"),
        released,
        failure
      };
    });
    expect(result.svenReady).toBe(true);
    expect(result.firstReady).toBe(true);
    expect(result.held).toBe(2);
    expect(result.owlCalls).toBe(2); // coordinator delegates; the production cache performs URL-level deduplication
    expect(result.released).toContain("a.png");
    expect(result.released).not.toContain("owl.png");
    expect(result.failure).toContain("Critical image failed: missing.png");
  });

  test("superseded asynchronous preparation cannot become current and is releasable", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      let resolveImage;
      const released = [];
      const coordinator = window.AtlasAssetReadiness.createCoordinator({
        preloadSven: async () => {},
        loadImage: () => new Promise((resolve) => { resolveImage = resolve; }),
        releaseImages: (paths) => released.push(...paths)
      });
      const pending = coordinator.prepare({ id: "slow", world: { background: "slow.png" } });
      await Promise.resolve();
      coordinator.supersede();
      resolveImage({ complete: true, naturalWidth: 20 });
      const plan = await pending;
      const current = coordinator.isCurrent(plan);
      coordinator.discard(plan);
      return { current, active: coordinator.snapshot(), released };
    });
    expect(result).toEqual({ current: false, active: null, released: ["slow.png"] });
  });

  test("real level reaches scene only after Sven and level imagery are decoded", async ({ page }) => {
    const failures = [];
    const consoleErrors = [];
    page.on("requestfailed", (request) => failures.push(request.url()));
    page.on("console", (message) => { if (message.type() === "error") consoleErrors.push(message.text()); });
    await page.goto(gameUrl);
    const loadingObserved = await page.evaluate(async () => {
      const promise = window.eval("selectLevel")("LVL-0001", { startImmediately: true });
      const during = {
        screen: window.eval("state.screen"),
        ready: document.querySelector("#app")?.dataset.criticalAssetsReady
      };
      const loaded = await promise;
      return { during, loaded };
    });
    expect(loadingObserved.during).toEqual({ screen: "loading", ready: "false" });
    expect(loadingObserved.loaded).toBe(true);
    const ready = await page.evaluate(() => {
      const plan = window.eval("assetReadiness.snapshot() ");
      return {
        screen: window.eval("state.screen"),
        stateReady: window.eval("state.criticalAssetsReady"),
        domReady: document.querySelector("#app")?.dataset.criticalAssetsReady,
        sven: window.AtlasLocomotion.decodedImages.size,
        levelId: plan?.levelId,
        planned: plan?.assets.length,
        held: plan?.images.size,
        paths: plan?.assets.map((asset) => asset.path),
        heldPaths: [...(plan?.images.keys() || [])],
        results: plan?.results.map((item) => ({ path: item.path, ready: item.ready })),
        failed: plan?.failed.length,
        animalReady: document.querySelector("[data-ambient-animal]")?.dataset.ready
      };
    });
    expect(ready.screen).toBe("scene");
    expect(ready.stateReady).toBe(true);
    expect(ready.domReady).toBe("true");
    expect(ready.sven).toBe(143);
    expect(ready.levelId).toBe("LVL-0001");
    expect(ready.held, JSON.stringify({ paths: ready.paths, heldPaths: ready.heldPaths, results: ready.results }, null, 2)).toBe(ready.planned);
    expect(ready.failed).toBe(0);
    expect(ready.animalReady).toBe("true");
    expect(failures).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });

  test("rapid first-use transitions never expose a blank or unrenderable Sven frame", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => window.eval("selectLevel")("LVL-0001", { startImmediately: true }));
    const result = await page.evaluate(async () => {
      const invalid = [];
      const observed = new Set();
      const sample = () => {
        const actor = document.querySelector("[data-actor='sven']");
        if (!actor) return invalid.push("missing-element");
        const style = getComputedStyle(actor);
        const box = actor.getBoundingClientRect();
        const state = actor.dataset.locomotionState;
        observed.add(state);
        if (!actor.getAttribute("src") || !actor.isConnected || actor.naturalWidth <= 0 || box.width <= 0 || box.height <= 0 || style.display === "none" || style.visibility === "hidden" || Number(style.opacity) === 0) {
          invalid.push(`${state}:${actor.getAttribute("src")}:${actor.naturalWidth}:${box.width}x${box.height}`);
        }
      };
      const timer = setInterval(sample, 8);
      window.eval("locomotion.transition")("idleBlink");
      await new Promise((resolve) => setTimeout(resolve, 45));
      const game = window.eval("state");
      window.eval("walkRoute")([{ x: game.worldX + 360, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "flicker-stress" }));
      await new Promise((resolve) => setTimeout(resolve, 500));
      window.eval("walkRoute")([{ x: game.worldX - 280, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "flicker-reverse" }));
      await new Promise((resolve) => setTimeout(resolve, 650));
      window.eval("walkRoute")([{ x: game.worldX + 35, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "flicker-short" }));
      await new Promise((resolve) => setTimeout(resolve, 700));
      clearInterval(timer);
      sample();
      return { invalid, observed: [...observed] };
    });
    expect(result.invalid).toEqual([]);
    expect(result.observed).toContain("idleBlink");
    expect(result.observed.some((state) => state?.startsWith("turn"))).toBe(true);
  });

  test("first Sven, animal and flyby playback discovers no new critical image request after READY", async ({ page }) => {
    let afterReady = false;
    const lateImages = [];
    page.on("request", (request) => {
      if (afterReady && request.resourceType() === "image") lateImages.push(request.url());
    });
    await page.goto(gameUrl);
    await page.evaluate(async () => window.eval("selectLevel")("LVL-0001", { startImmediately: true }));
    afterReady = true;
    const animal = await page.evaluate(async () => {
      window.eval("locomotion.transition")("idleBlink");
      await new Promise((resolve) => setTimeout(resolve, 60));
      const game = window.eval("state");
      window.eval("walkRoute")([{ x: game.worldX + 300, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "network-first-use" }));
      window.eval("runAmbientAnimalBlink")(window.eval("level.ambientAnimals[0]"), { doubleBlink: true });
      await new Promise((resolve) => setTimeout(resolve, 700));
      return [...document.querySelectorAll("[data-ambient-animal] img")].map((image) => ({
        src: image.getAttribute("src"), naturalWidth: image.naturalWidth
      }));
    });
    expect(animal.every((image) => image.src && image.naturalWidth > 0)).toBe(true);

    afterReady = false;
    await page.evaluate(async () => window.eval("selectLevel")("LVL-0016", {
      startImmediately: true,
      allowDisabledForEditor: true,
      recordStart: false
    }));
    afterReady = true;
    const flyby = await page.evaluate(async () => {
      const item = window.eval("level.ambientFlybys[0]");
      const started = window.eval("ambientFlybyRuntime.preview")(item.id);
      await new Promise((resolve) => setTimeout(resolve, 450));
      const shell = document.querySelector(`[data-ambient-flyby="${item.id}"]`);
      return {
        started,
        ready: shell?.dataset.ready,
        frames: [...(shell?.querySelectorAll("img") || [])].map((image) => ({ src: image.getAttribute("src"), naturalWidth: image.naturalWidth }))
      };
    });
    expect(flyby.started).toBe(true);
    expect(flyby.ready).toBe("true");
    expect(flyby.frames.every((image) => image.src && image.naturalWidth > 0)).toBe(true);
    expect(lateImages).toEqual([]);
  });

  test("level-scoped images are replaced while the shared Sven cache remains", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true });
      const first = window.eval("assetReadiness.snapshot()");
      const firstBackground = window.eval("level.world.background");
      await window.eval("selectLevel")("LVL-0003", { startImmediately: true, allowDisabledForEditor: true, recordStart: false });
      const second = window.eval("assetReadiness.snapshot()");
      const cache = window.eval("assetCache");
      const afterB = {
        level: second.levelId,
        oldBackgroundCached: cache.images.has(firstBackground),
        sven: window.AtlasLocomotion.decodedImages.size
      };
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true, allowDisabledForEditor: true, recordStart: false });
      return { first: first.levelId, afterB, again: window.eval("assetReadiness.snapshot().levelId") };
    });
    expect(result.first).toBe("LVL-0001");
    expect(result.afterB).toEqual({ level: "LVL-0003", oldBackgroundCached: false, sven: 143 });
    expect(result.again).toBe("LVL-0001");
  });

  test("a runtime background override is decoded before its first visible scene", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      const override = "Levels/LVL-0002/assets/temple-interior.png";
      window.eval("worldResolver.updateLevelSettings")("LVL-0001", { backgroundOverride: override });
      const loaded = await window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false });
      const image = document.querySelector(".worldArt");
      const plan = window.eval("assetReadiness.snapshot()");
      return {
        loaded,
        configured: window.eval("level.world.background"),
        rendered: image?.getAttribute("src"),
        naturalWidth: image?.naturalWidth,
        held: plan.images.has(override)
      };
    });
    expect(result).toEqual({
      loaded: true,
      configured: "Levels/LVL-0002/assets/temple-interior.png",
      rendered: "Levels/LVL-0002/assets/temple-interior.png",
      naturalWidth: 2172,
      held: true
    });
  });

  test("slow image delivery remains behind the preparing screen", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    let ready = false;
    const lateImages = [];
    await page.route(/\.(?:png|jpe?g|webp)(?:\?.*)?$/i, async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 90));
      await route.continue();
    });
    page.on("request", (request) => {
      if (ready && request.resourceType() === "image") lateImages.push(request.url());
    });
    await page.goto(process.env.ATLAS_EDITOR_URL);
    await page.evaluate(() => {
      window.__atlasSlowLoadDone = false;
      window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false })
        .then((loaded) => { window.__atlasSlowLoadDone = loaded; });
    });
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "loading");
    await expect(page.locator(".atlasLoadingSpinner")).toBeVisible();
    await expect(page.locator("[data-world-stage]")).toHaveCount(0);
    await expect.poll(() => page.evaluate(() => window.__atlasSlowLoadDone), { timeout: 30_000 }).toBe(true);
    await expect(page.locator("#app")).toHaveAttribute("data-critical-assets-ready", "true");
    ready = true;
    await page.evaluate(async () => {
      const game = window.eval("state");
      window.eval("walkRoute")([{ x: game.worldX + 250, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "slow-ready" }));
      await new Promise((resolve) => setTimeout(resolve, 500));
    });
    expect(lateImages).toEqual([]);
  });

  test("leaving during a slow prepare cannot reveal the stale level", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    await page.route("**/Levels/LVL-0001/assets/level-1-wide-world.png", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.continue();
    });
    await page.goto(process.env.ATLAS_EDITOR_URL);
    const result = await page.evaluate(async () => {
      const pending = window.eval("selectLevel")("LVL-0001", { startImmediately: true, recordStart: false });
      await new Promise((resolve) => setTimeout(resolve, 40));
      window.eval("returnToMenu")();
      const loaded = await pending;
      return {
        loaded,
        screen: window.eval("state.screen"),
        level: window.eval("level?.id || null"),
        activeAssets: window.eval("assetReadiness.snapshot()?.levelId || null")
      };
    });
    expect(result).toEqual({ loaded: false, screen: "menu", level: null, activeAssets: null });
  });
});
