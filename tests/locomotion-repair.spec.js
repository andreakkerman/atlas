// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();

async function enterLevel(page) {
  await page.goto(gameUrl);
  await page.evaluate(async () => window.eval("selectLevel")("LVL-0001", { startImmediately: true }));
  await expect.poll(() => page.evaluate(() => window.eval("locomotion.snapshot().state"))).toBe("idle");
}

async function runMove(page, distance) {
  return page.evaluate(async (requestedDistance) => {
    const game = window.eval("state");
    const target = { x: game.worldX + requestedDistance, y: game.worldY };
    const samples = [];
    window.eval("walkRoute")([target], () => {}, window.eval("replaceMovementIntent")({ type: "test" }));
    const deadline = performance.now() + 12000;
    while (performance.now() < deadline && window.eval("state.movement")) {
      const current = window.eval("state");
      const movement = current.movement;
      samples.push({
        x: current.worldX,
        state: window.eval("locomotion.snapshot().state"),
        remaining: movement ? window.eval("remainingRouteDistance")(movement) : 0,
        stopping: Boolean(movement?.stopping),
        shortMove: Boolean(movement?.shortMove),
        stopTravel: movement?.stopDistanceTravelled || 0,
        stopMax: movement?.stopMaxDistance || 0
      });
      await new Promise((resolve) => setTimeout(resolve, 25));
    }
    return { target, finalX: window.eval("state.worldX"), finalState: window.eval("locomotion.snapshot().state"), samples, active: Boolean(window.eval("state.movement")) };
  }, distance);
}

test.describe("state-coupled Sven locomotion", () => {
  test.setTimeout(60_000);

  for (const [name, distance] of [["very short", 20], ["moderate", 180], ["moderate left", -180], ["long", 520]]) {
    test(`${name} move keeps idle stationary and arrives coherently`, async ({ page }) => {
      await enterLevel(page);
      const result = await runMove(page, distance);
      expect(result.active, JSON.stringify(result.samples.slice(-5), null, 2)).toBe(false);
      expect(result.finalState).toBe("idle");
      expect(result.finalX).toBeCloseTo(result.target.x, 1);
      for (let index = 1; index < result.samples.length; index += 1) {
        const previous = result.samples[index - 1];
        const current = result.samples[index];
        if (["idle", "idleBlink"].includes(previous.state)) expect(current.x).toBeCloseTo(previous.x, 4);
      }
      const stops = result.samples.filter((sample) => sample.state.endsWith("ToIdle"));
      if (stops.length) {
        expect(Math.max(...stops.map((sample) => sample.stopTravel))).toBeLessThanOrEqual(46.6);
        expect(stops[0].remaining).toBeLessThanOrEqual(56.6);
      }
      if (name === "very short") {
        expect(result.samples.some((sample) => sample.shortMove)).toBe(true);
        expect(result.samples.some((sample) => sample.state.endsWith("Loop"))).toBe(false);
      }
      if (name === "long") {
        const travelledInLoop = result.samples.filter((sample) => sample.state.endsWith("Loop"));
        expect(travelledInLoop.length).toBeGreaterThan(3);
      }
    });
  }

  test("reverses through authored turns without idle or to-idle", async ({ page }) => {
    await enterLevel(page);
    const result = await page.evaluate(async () => {
      const game = window.eval("state");
      const right = { x: game.worldX + 600, y: game.worldY };
      window.eval("beginFreeWalk")(right);
      while (!window.eval("locomotion.snapshot().state").endsWith("Loop")) await new Promise((resolve) => setTimeout(resolve, 20));
      const before = window.eval("state.worldX");
      const left = { x: before - 360, y: game.worldY };
      window.eval("walkRoute")([left], () => {}, window.eval("replaceMovementIntent")({ type: "reversal-test" }));
      const states = [];
      const positions = [];
      const deadline = performance.now() + 4000;
      while (performance.now() < deadline && !states.includes("walkLeftLoop")) {
        states.push(window.eval("locomotion.snapshot().state"));
        positions.push(window.eval("state.worldX"));
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      const secondStart = window.eval("state.worldX");
      window.eval("walkRoute")([{ x: secondStart + 360, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "reverse-back-test" }));
      const reverseStates = [];
      const secondDeadline = performance.now() + 4000;
      while (performance.now() < secondDeadline && !reverseStates.includes("walkRightLoop")) {
        reverseStates.push(window.eval("locomotion.snapshot().state"));
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      return { states, positions, reverseStates };
    });
    expect(result.states).toContain("turnRightToLeft");
    expect(result.states).not.toContain("walkRightToIdle");
    expect(result.states).not.toContain("idle");
    expect(result.states).toContain("walkLeftLoop");
    expect(result.reverseStates).toContain("turnLeftToRight");
    expect(result.reverseStates).not.toContain("walkLeftToIdle");
    expect(result.reverseStates).not.toContain("idle");
    expect(result.reverseStates).toContain("walkRightLoop");
  });

  test("global phase controls materially change runtime movement and timing", async ({ page }) => {
    await enterLevel(page);
    const result = await page.evaluate(async () => {
      const resolver = window.eval("worldResolver");
      const game = window.eval("state");
      const measureFromIdle = async (multiplier) => {
        window.eval("stopMovement")({ invalidateIntent: true });
        window.eval("locomotion.completeArrival")();
        game.worldX = 200;
        resolver.updateLocomotionSettings({ fromIdleMovement: multiplier, fromIdleAnimationSpeed: 0.25, shortMoveThreshold: 1 });
        window.eval("walkRoute")([{ x: 700, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "tuning" }));
        await new Promise((resolve) => setTimeout(resolve, 600));
        const travelled = game.worldX - 200;
        window.eval("stopMovement")({ invalidateIntent: true });
        window.eval("locomotion.completeArrival")();
        return travelled;
      };
      const lowTravel = await measureFromIdle(0.4);
      const highTravel = await measureFromIdle(1.2);
      resolver.updateLocomotionSettings({ fromIdleAnimationSpeed: 0.5 });
      const slowDuration = window.eval("locomotion.stateDuration")("walkRightFromIdle");
      resolver.updateLocomotionSettings({ fromIdleAnimationSpeed: 2 });
      const fastDuration = window.eval("locomotion.stateDuration")("walkRightFromIdle");
      resolver.updateLocomotionSettings({ shortMoveThreshold: 20 });
      window.eval("walkRoute")([{ x: game.worldX + 30, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "threshold-low" }));
      const lowThresholdShort = game.movement.shortMove;
      window.eval("stopMovement")({ invalidateIntent: true });
      window.eval("locomotion.completeArrival")();
      resolver.updateLocomotionSettings({ shortMoveThreshold: 40 });
      window.eval("walkRoute")([{ x: game.worldX + 30, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "threshold-high" }));
      const highThresholdShort = game.movement.shortMove;
      window.eval("stopMovement")({ invalidateIntent: true });
      window.eval("locomotion.completeArrival")();
      return { lowTravel, highTravel, slowDuration, fastDuration, lowThresholdShort, highThresholdShort };
    });
    expect(result.highTravel).toBeGreaterThan(result.lowTravel * 2);
    expect(result.fastDuration).toBeLessThan(result.slowDuration / 3);
    expect(result.lowThresholdShort).toBe(false);
    expect(result.highThresholdShort).toBe(true);
  });

  test("To Idle Max Distance is an enforced runtime cap", async ({ page }) => {
    await enterLevel(page);
    await page.evaluate(() => window.eval("worldResolver.updateLocomotionSettings")({
      toIdleMaxDistance: 12,
      stopEntryDistance: 100,
      shortMoveThreshold: 1
    }));
    const result = await runMove(page, 300);
    const stops = result.samples.filter((sample) => sample.state.endsWith("ToIdle"));
    expect(result.active).toBe(false);
    expect(stops.length).toBeGreaterThan(0);
    expect(stops[0].remaining).toBeLessThanOrEqual(12.6);
    expect(Math.max(...stops.map((sample) => sample.stopTravel))).toBeLessThanOrEqual(12.6);
  });
});

test("level editor keeps tuning panels, scroll, focus, scope and persistence stable", async ({ page }) => {
  test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
  test.setTimeout(60_000);
  const configPath = path.join(__dirname, "..", "Levels", "world-config.js");
  const originalConfig = fs.readFileSync(configPath, "utf8");
  try {
    await page.goto(process.env.ATLAS_EDITOR_URL);
    await page.evaluate(async () => window.eval("selectLevel")("LVL-0001", { startImmediately: true }));
    await page.keyboard.press("Control+Shift+D");
    const panel = page.locator("[data-developer-tools]");
    await expect(panel).toBeVisible();

    await panel.getByRole("button", { name: "Graphics", exact: true }).click();
    const graphicsVisual = panel.locator('[data-editor-panel-key="simple-visual-controls"]');
    await graphicsVisual.evaluate((element) => { element.open = true; });
    await panel.evaluate((element) => { element.scrollTop = 420; });
    const scrollBefore = await panel.evaluate((element) => element.scrollTop);

    for (const [key, value] of [["backgroundBrightness", "1.1"], ["backgroundContrast", "1.15"], ["backgroundWarmth", "0.1"]]) {
      const input = panel.locator(`[data-level-setting="${key}"]`);
      await input.fill(value);
      await expect(graphicsVisual).toHaveAttribute("open", "");
    }
    await panel.getByRole("button", { name: "Characters", exact: true }).click();
    const characterVisual = panel.locator('[data-character-visuals="sven"]');
    const locomotionPanel = panel.locator('[data-editor-panel-key="sven-locomotion"]');
    await characterVisual.evaluate((element) => { element.open = true; });
    await locomotionPanel.evaluate((element) => { element.open = true; });
    const movement = panel.locator('[data-level-setting="movementSpeed"]');
    await movement.fill("310");
    await expect(movement).toBeFocused();
    await expect(locomotionPanel).toHaveAttribute("open", "");

    await expect(panel.locator('[data-locomotion-setting="fromIdleMovement"]')).toHaveAttribute("min", "0");
    await expect(panel.locator('[data-locomotion-setting="toIdleMovement"]')).toHaveAttribute("min", "0");
    for (const [key, value] of [
      ["fromIdleMovement", "0"], ["toIdleMovement", "0"], ["toIdleMaxDistance", "49"],
      ["stopEntryDistance", "61"], ["loopAnimationSpeed", "1.1"], ["shortMoveThreshold", "95"],
      ["shortMoveAnimationSpeed", "2.4"], ["shortMoveStartFrame", "20"], ["shortMoveMaxFromIdleAnimation", "35"]
    ]) {
      const input = panel.locator(`[data-locomotion-setting="${key}"]`);
      await input.focus();
      const scrollBeforeChange = await panel.evaluate((element) => element.scrollTop);
      await input.fill(value);
      await expect(input).toBeFocused();
      await expect(locomotionPanel).toHaveAttribute("open", "");
      const scrollAfterChange = await panel.evaluate((element) => element.scrollTop);
      expect(Math.abs(scrollAfterChange - scrollBeforeChange)).toBeLessThan(8);
    }
    await page.screenshot({ path: path.join(__dirname, "..", "test-results", "atlas-sven-locomotion-editor.png"), fullPage: false });

    await panel.getByRole("button", { name: "Apply" }).click();
    await expect(panel).toContainText("Applied", { timeout: 15_000 });
    await expect(characterVisual).toHaveAttribute("open", "");
    await expect(locomotionPanel).toHaveAttribute("open", "");

    await page.reload();
    await page.evaluate(async () => window.eval("selectLevel")("LVL-0002", { startImmediately: true }));
    await page.keyboard.press("Control+Shift+D");
    const otherPanel = page.locator("[data-developer-tools]");
    await otherPanel.locator('[data-editor-panel-key="sven-locomotion"] summary').click();
    await expect(otherPanel.locator('[data-locomotion-setting="toIdleMaxDistance"]')).toHaveValue("49");
    await expect(otherPanel.locator('[data-locomotion-setting="fromIdleMovement"]')).toHaveValue("0");
    await expect(otherPanel.locator('[data-locomotion-setting="toIdleMovement"]')).toHaveValue("0");
    await expect(otherPanel.locator('[data-locomotion-setting="shortMoveThreshold"]')).toHaveValue("95");
    await expect(otherPanel.locator('[data-locomotion-setting="shortMoveMovement"]')).toHaveCount(0);
    await expect(otherPanel.locator('[data-locomotion-setting="shortMoveAnimationSpeed"]')).toHaveValue("2.40");
    await expect(otherPanel.locator('[data-locomotion-setting="shortMoveStartFrame"]')).toHaveValue("20");
    await expect(otherPanel.locator('[data-locomotion-setting="shortMoveMaxFromIdleAnimation"]')).toHaveValue("35");
    await expect(otherPanel.locator('[data-level-setting="movementSpeed"]')).not.toHaveValue("310");

    const migration = await page.evaluate(async () => {
      const config = await fetch("/__dev/world-config").then((response) => response.json());
      config.locomotion.shortMoveMovement = 1.75;
      const response = await fetch("/__dev/world-config", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(config)
      });
      const payload = await response.json();
      return { status: response.status, hasOldSetting: Object.hasOwn(payload.config.locomotion, "shortMoveMovement") };
    });
    expect(migration).toEqual({ status: 200, hasOldSetting: false });
  } finally {
    fs.writeFileSync(configPath, originalConfig);
  }
});
