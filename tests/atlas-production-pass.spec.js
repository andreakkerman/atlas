// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = pathToFileURL(path.join(root, "index.html")).toString();
const animationFolders = {
  idle: 1,
  idle_blink: 13,
  turn_from_left_to_right: 12,
  turn_from_right_to_left: 19,
  walk_left_from_idle: 22,
  walk_left_loop: 13,
  walk_left_to_idle: 18,
  walk_right_from_idle: 16,
  walk_right_loop: 13,
  walk_right_to_idle: 16
};

test.describe("Atlas production pass architecture", () => {
  test("discovers the complete authored 432x528 locomotion set in deterministic order", async () => {
    let total = 0;
    for (const [folder, expectedCount] of Object.entries(animationFolders)) {
      const directory = path.join(root, "assets", "characters", "sven", folder);
      const names = fs.readdirSync(directory).filter((name) => name.endsWith(".png")).sort();
      expect(names).toHaveLength(expectedCount);
      expect(names[0]).toBe("frame_001.png");
      expect(names.at(-1)).toBe(`frame_${String(expectedCount).padStart(3, "0")}.png`);
      for (const name of names) {
        const bytes = fs.readFileSync(path.join(directory, name));
        expect(bytes.readUInt32BE(16)).toBe(432);
        expect(bytes.readUInt32BE(20)).toBe(528);
      }
      total += names.length;
    }
    expect(total).toBe(143);
  });

  test("resolves one authoritative enabled and reordered world composition", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(() => {
      const catalog = [
        { id: "A" },
        { id: "B", connectedFrom: "A" },
        { id: "C", connectedFrom: "B" }
      ];
      const resolver = window.AtlasWorld.createWorldResolver(catalog, {
        worlds: { A: { order: ["C", "A", "B"], enabled: { B: false } } }
      });
      return {
        all: resolver.orderedEntries("A").map((entry) => entry.id),
        enabled: resolver.enabledEntries("A").map((entry) => entry.id),
        first: resolver.firstEnabled("A")?.id,
        next: resolver.nextEnabled("C")?.id,
        contentStillPresent: resolver.orderedEntries("A").some((entry) => entry.id === "B")
      };
    });
    expect(result).toEqual({ all: ["C", "A", "B"], enabled: ["C", "A"], first: "C", next: "A", contentStillPresent: true });
  });

  test("locks the two latest distinct levels, persists refresh state, bypasses local hosts and avoids deadlock", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(() => {
      const values = new Map();
      const storage = {
        getItem: (key) => values.get(key) || null,
        setItem: (key, value) => values.set(key, value)
      };
      const locked = () => [...window.AtlasWorld.lockedLevelIds(["A", "B", "C"], { storage, bypass: false })].sort();
      window.AtlasWorld.recordRecent("A", storage);
      const afterA = locked();
      window.AtlasWorld.recordRecent("B", storage);
      window.AtlasWorld.recordRecent("B", storage);
      const afterRepeatedB = locked();
      window.AtlasWorld.recordRecent("C", storage);
      const afterC = locked();
      return {
        afterA,
        afterRepeatedB,
        afterC,
        refreshed: [...window.AtlasWorld.lockedLevelIds(["A", "B", "C"], { storage, bypass: false })].sort(),
        local: [...window.AtlasWorld.lockedLevelIds(["A", "B", "C"], { storage, location: { hostname: "127.0.0.1" } })],
        deadlock: [...window.AtlasWorld.lockedLevelIds(["B", "C"], { storage, bypass: false })]
      };
    });
    expect(result.afterA).toEqual(["A"]);
    expect(result.afterRepeatedB).toEqual(["A", "B"]);
    expect(result.afterC).toEqual(["B", "C"]);
    expect(result.refreshed).toEqual(["B", "C"]);
    expect(result.local).toEqual([]);
    expect(result.deadlock).toHaveLength(1);
  });

  test("uses 24 FPS time-based authored states without mirroring", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(() => {
      const states = [];
      const controller = window.AtlasLocomotion.createController({
        getAnimationSpeed: () => 1.5,
        onState: (state) => states.push(state),
        blinkDelay: () => 60_000
      });
      controller.setIntent("right");
      controller.transition("walkRightLoop");
      controller.setIntent("left");
      controller.transition("walkLeftLoop");
      controller.setIntent("right");
      return {
        fps: window.AtlasLocomotion.BASE_FPS,
        frameMs: window.AtlasLocomotion.FRAME_MS,
        urls: window.AtlasLocomotion.allFrameUrls(),
        states,
        stopDuration: controller.stopDuration("right"),
        cssMirrorsSven: [...document.styleSheets].some((sheet) => {
          try { return [...sheet.cssRules].some((rule) => String(rule.cssText).includes("--sven-direction")); } catch { return false; }
        })
      };
    });
    expect(result.fps).toBe(24);
    expect(result.frameMs).toBeCloseTo(41.6667, 3);
    expect(result.urls).toHaveLength(143);
    expect(result.urls.some((url) => url.includes("walk_left_loop"))).toBe(true);
    expect(result.urls.some((url) => url.includes("walk_right_loop"))).toBe(true);
    expect(result.states).toContain("walkRightFromIdle");
    expect(result.states).toContain("turnRightToLeft");
    expect(result.states).toContain("turnLeftToRight");
    expect(result.stopDuration).toBeCloseTo((16 / 24 / 1.5 / 1.15) * 1000, 0);
    expect(result.cssMirrorsSven).toBe(false);
  });
});

test.describe("Atlas locomotion in the real game", () => {
  test.setTimeout(90_000);

  test("waits for all decoded sprites and synchronizes a destination stop into idle", async ({ page }) => {
    const criticalFailures = [];
    page.on("requestfailed", (request) => {
      if (request.url().includes("/assets/characters/sven/")) criticalFailures.push(request.url());
    });
    await page.goto(gameUrl);
    const target = await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true });
      const current = window.eval("state");
      const route = window.eval("routeToPoint")({ x: current.worldX + 420, y: current.worldY });
      const destination = route.at(-1);
      window.eval("beginFreeWalk")(destination);
      window.__atlasTestMovement = window.eval("state.movement");
      return destination;
    });
    await expect.poll(() => page.evaluate(() => window.AtlasLocomotion.decodedImages.size), { timeout: 30_000 }).toBe(143);
    await expect.poll(() => page.evaluate(() => window.eval("state.movement === null")), { timeout: 15_000 }).toBe(true);
    const stop = await page.evaluate(() => ({
      speed: window.__atlasTestMovement.stopPlaybackSpeed,
      states: window.__atlasTestMovement.phaseHistory.map((sample) => sample.state),
      distance: window.__atlasTestMovement.stopDistanceTravelled,
      cap: window.eval("locomotionTuning().toIdleMaxDistance")
    }));
    const stopSpeed = stop.speed;
    expect(stopSpeed).toBeGreaterThanOrEqual(0.85);
    expect(stopSpeed).toBeLessThanOrEqual(1.2);
    expect(stop.states.some((state) => state.endsWith("ToIdle"))).toBe(true);
    expect(stop.distance).toBeLessThanOrEqual(stop.cap + 0.6);
    const final = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      locomotion: window.eval("locomotion.snapshot().state"),
      animation: document.querySelector("[data-actor='sven']")?.dataset.animation,
      mirror: getComputedStyle(document.querySelector("[data-actor-shell='sven']")).transform
    }));
    expect(Math.hypot(final.x - target.x, final.y - target.y)).toBeLessThan(1);
    expect(final.locomotion).toBe("idle");
    expect(final.animation).toBe("idle");
    expect(criticalFailures).toEqual([]);
  });

  test("opens a challenge only after idle arrival and cancels stale interaction intent", async ({ page }) => {
    await page.goto(gameUrl);
    const challengeId = await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true });
      const rune = window.eval("activeRunes()[0]");
      const approach = window.eval("getApproachPoint")(rune);
      const state = window.eval("state");
      state.worldX = approach.x - 150;
      state.worldY = approach.y;
      window.eval("render")();
      window.eval("selectChallenge")(rune);
      return rune.id;
    });
    expect(await page.evaluate(() => window.eval("state.screen"))).toBe("scene");
    await expect.poll(() => page.evaluate(() => window.eval("state.screen")), { timeout: 15_000 }).toBe("challenge");
    expect(await page.evaluate(() => ({
      active: window.eval("state.activeRuneId"),
      locomotion: window.eval("locomotion.snapshot().state")
    }))).toEqual({ active: challengeId, locomotion: "idle" });

    await page.evaluate(() => {
      window.eval("state.screen = 'scene'");
      window.eval("state.activeRuneId = null");
      window.eval("state.worldX -= 220");
      const runes = window.eval("activeRunes()");
      window.eval("selectChallenge")(runes[0]);
      window.eval("beginFreeWalk")({ x: window.eval("state.worldX") + 80, y: window.eval("state.worldY") });
    });
    await expect.poll(() => page.evaluate(() => window.eval("state.movement === null")), { timeout: 15_000 }).toBe(true);
    expect(await page.evaluate(() => window.eval("state.screen"))).toBe("scene");
  });

  test("renders and functionally guards recent locks on carousel and supporting cards without changing counters", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(() => {
      localStorage.clear();
      window.AtlasWorld.recordRecent("LVL-0001", localStorage);
      window.AtlasWorld.recordRecent("LVL-0004", localStorage);
      window.eval("state = { screen: 'menu', menuHeroIndex: 0 }");
      window.eval("render")();
    });
    const supporting = page.locator('[data-menu-tile="LVL-0001"]');
    const hero = page.locator('[data-featured-level="LVL-0001"]');
    await expect(supporting).toHaveClass(/levelTileLocked/);
    await expect(hero).toHaveClass(/levelTileLocked/);
    await expect(supporting.locator(".levelBadge")).toContainText("opdrachten");
    await page.screenshot({ path: path.join(root, "test-results", "atlas-locked-menu.png"), fullPage: false });
    const counter = await supporting.locator(".levelBadge").textContent();
    await page.evaluate(() => window.eval("startLevelFromMenu")("LVL-0001"));
    await expect(page.locator("#app")).toHaveAttribute("data-screen", "menu");
    await expect(page.locator(".menuError")).toContainText("Speel eerst twee andere plekken");
    expect(await supporting.locator(".levelBadge").textContent()).toBe(counter);
  });
});

test("main-menu world editor opens through the existing shortcut on the HTTP dev server", async ({ page }) => {
  test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
  await page.goto(process.env.ATLAS_EDITOR_URL);
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await page.keyboard.press("Control+Shift+D");
  await expect(page.locator("[data-world-editor]")).toBeVisible();
  await expect(page.getByRole("heading", { name: "World & Level Management" })).toBeVisible();
  await expect(page.locator("[data-world-enabled]")).not.toHaveCount(0);
  await expect(page.getByText("Sprite Scale").first()).toBeVisible();
  await expect(page.getByText("Animation Speed").first()).toBeVisible();
});

test("world composition, tuning and imported background persist without mutating level content", async ({ page }) => {
  test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
  test.setTimeout(90_000);
  const configPath = path.join(root, "Levels", "world-config.js");
  const originalConfig = fs.readFileSync(configPath, "utf8");
  let importedPath = "";
  try {
    await page.goto(process.env.ATLAS_EDITOR_URL);
    await page.getByRole("button", { name: "Start avontuur" }).click();
    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator("[data-world-editor]")).toBeVisible();
    await expect(page.locator(".worldEditorFooter")).toContainText("geladen");
    await page.locator('[data-config-action="select-world-level"][data-level-id="LVL-0002"]').click();

    await page.locator('[data-background-file="LVL-0002"]').setInputFiles(path.join(root, "Levels", "LVL-0002", "assets", "temple-interior.png"));
    await expect(page.locator(".worldEditorFooter")).toContainText("achtergrond geïmporteerd", { timeout: 30_000 });
    importedPath = await page.locator('[data-level-tuning="LVL-0002"] .atlasCurrentAsset').textContent() || "";
    expect(importedPath).toContain("-atlas-");

    const scale = page.locator('[data-level-id="LVL-0002"][data-level-setting="spriteScale"]');
    await scale.fill("1.15");
    await scale.dispatchEvent("change");
    await page.locator('[data-world-enabled="LVL-0003"]').uncheck();
    await page.getByRole("button", { name: "De Tempelzaal omhoog" }).click();
    await page.getByRole("button", { name: "Save world configuration" }).click();
    await expect(page.locator(".worldEditorFooter")).toContainText("opgeslagen", { timeout: 10_000 });

    await page.reload();
    await page.getByRole("button", { name: "Start avontuur" }).click();
    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator('[data-world-enabled="LVL-0003"]')).not.toBeChecked();
    expect(await page.evaluate(() => window.eval("worldResolver.orderedEntries('LVL-0001').map((entry) => entry.id)"))).toEqual(["LVL-0002", "LVL-0001", "LVL-0003"]);
    await page.screenshot({ path: path.join(root, "test-results", "atlas-world-editor.png"), fullPage: false });

    const preserved = await page.evaluate(async () => {
      window.eval("worldEditor.open = false");
      await window.eval("selectLevel")("LVL-0002", { startImmediately: true });
      return {
        background: window.eval("level.world.background"),
        scale: window.eval("levelTuning().spriteScale"),
        runes: window.eval("level.runes.length"),
        effects: window.eval("(level.sceneEffects || []).length"),
        animals: window.eval("(level.ambientAnimals || []).length")
      };
    });
    expect(preserved.background).toBe(importedPath);
    expect(preserved.scale).toBe(1.15);
    expect(preserved.runes).toBeGreaterThan(0);
    await page.screenshot({ path: path.join(root, "test-results", "atlas-background-override.png"), fullPage: false });

    await page.evaluate(() => window.eval("returnToMenu")());
    await page.keyboard.press("Control+Shift+D");
    await page.locator('[data-config-action="select-world-level"][data-level-id="LVL-0002"]').click();
    await page.getByRole("button", { name: "Reset to default" }).click();
    await page.getByRole("button", { name: "Save world configuration" }).click();
    await expect(page.locator(".worldEditorFooter")).toContainText("opgeslagen", { timeout: 10_000 });
    expect(await page.evaluate(() => window.eval("worldResolver.levelSettings('LVL-0002').backgroundOverride"))).toBeUndefined();
  } finally {
    fs.writeFileSync(configPath, originalConfig);
    if (importedPath.startsWith("Levels/LVL-0002/assets/") && importedPath.includes("-atlas-")) {
      const importedFile = path.join(root, ...importedPath.split("/"));
      if (fs.existsSync(importedFile)) fs.unlinkSync(importedFile);
    }
  }
});
