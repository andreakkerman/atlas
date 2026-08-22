// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();

async function enterLevel(page) {
  await page.goto(gameUrl);
  await page.evaluate(async () => window.eval("selectLevel")("LVL-0001", { startImmediately: true }));
  await expect.poll(() => page.evaluate(() => window.eval("locomotion.snapshot().state"))).toBe("idle");
}

async function shortMoveMatrix(page) {
  return page.evaluate(async () => {
    const game = window.eval("state");
    const resolver = window.eval("worldResolver");
    resolver.updateLocomotionSettings({
      shortMoveThreshold: 90,
      shortMoveAnimationSpeed: 2,
      shortMoveStartFrame: 0.2,
      shortMoveMaxFromIdleAnimation: 0.45,
      fromIdleMovement: 0.15,
      toIdleMovement: 0.05,
      toIdleMaxDistance: 5
    });
    const run = async (signedDistance) => {
      window.eval("stopMovement")({ invalidateIntent: true });
      window.eval("locomotion.completeArrival")();
      game.worldX = 500;
      window.eval("updateWorldDom")();
      let callbacks = 0;
      const targetX = 500 + signedDistance;
      window.eval("walkRoute")([{ x: targetX, y: game.worldY }], () => { callbacks += 1; }, window.eval("replaceMovementIntent")({ type: "short-matrix" }));
      const movement = game.movement;
      const start = window.eval("locomotion.snapshot")();
      const deadline = performance.now() + 6000;
      while (game.movement && performance.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 4));
      return {
        signedDistance,
        targetX,
        shortMove: movement?.shortMove,
        shortDirection: movement?.shortDirection,
        fromStart: movement?.shortFromFrameStart,
        fromLimit: movement?.shortMaxFrame,
        toLimit: movement?.shortToIdleFrameLimit,
        startState: start.state,
        startFrame: start.frameIndex,
        motion: movement?.motionHistory || [],
        phases: movement?.phaseHistory.map((sample) => sample.state) || [],
        finalX: game.worldX,
        finalState: window.eval("locomotion.snapshot().state"),
        callbacks,
        active: Boolean(game.movement)
      };
    };
    const results = [];
    for (const distance of [5, 10, 20, 40, 60, 90]) {
      results.push(await run(distance));
      results.push(await run(-distance));
    }
    return results;
  });
}

const travelled = (samples) => samples.reduce((total, sample) => total + Math.abs(sample.toX - sample.fromX), 0);

test.describe("unified short-distance locomotion phases", () => {
  test.setTimeout(120_000);

  test("5–90 world-pixel matrix uses FromIdle then ToIdle exactly in both directions", async ({ page }) => {
    await enterLevel(page);
    const results = await shortMoveMatrix(page);
    for (const result of results) {
      const direction = result.signedDistance > 0 ? "right" : "left";
      const suffix = direction === "right" ? "Right" : "Left";
      const fromState = `walk${suffix}FromIdle`;
      const toState = `walk${suffix}ToIdle`;
      const fromMotion = result.motion.filter((sample) => sample.state === fromState);
      const toMotion = result.motion.filter((sample) => sample.state === toState);
      expect(result.shortMove).toBe(true);
      expect(result.shortDirection).toBe(direction);
      expect(result.startState).toBe(fromState);
      expect(result.startFrame).toBe(result.fromStart);
      expect(result.active).toBe(false);
      expect(result.callbacks).toBe(1);
      expect(result.finalState).toBe("idle");
      expect(result.finalX).toBeCloseTo(result.targetX, 5);
      expect(fromMotion.length).toBeGreaterThan(0);
      expect(toMotion.length).toBeGreaterThan(0);
      expect(result.phases.some((phase) => phase.endsWith("Loop"))).toBe(false);
      expect(result.motion.every((sample) => sample.state === fromState || sample.state === toState)).toBe(true);
      expect(result.motion.every((sample) => sample.facing === direction)).toBe(true);
      expect(fromMotion.every((sample) => sample.frameIndex >= result.fromStart && sample.frameIndex <= result.fromLimit)).toBe(true);
      expect(toMotion.every((sample) => sample.frameIndex >= 0 && sample.frameIndex <= result.toLimit)).toBe(true);
      for (const samples of [fromMotion, toMotion]) {
        for (let index = 1; index < samples.length; index += 1) {
          expect(samples[index].frameIndex).toBeGreaterThanOrEqual(samples[index - 1].frameIndex);
        }
      }
      expect(travelled(toMotion)).toBeLessThanOrEqual(5.01);
      for (const sample of result.motion) {
        if (direction === "right") {
          expect(sample.toX).toBeGreaterThan(sample.fromX);
          expect(sample.toX).toBeLessThanOrEqual(result.targetX + 1e-6);
        } else {
          expect(sample.toX).toBeLessThan(sample.fromX);
          expect(sample.toX).toBeGreaterThanOrEqual(result.targetX - 1e-6);
        }
      }
    }
    for (const direction of [1, -1]) {
      const ten = results.find((item) => item.signedDistance === 10 * direction);
      const sixty = results.find((item) => item.signedDistance === 60 * direction);
      expect(Math.max(...ten.motion.filter((sample) => sample.state.endsWith("FromIdle")).map((sample) => sample.frameIndex))).toBeLessThan(
        Math.max(...sixty.motion.filter((sample) => sample.state.endsWith("FromIdle")).map((sample) => sample.frameIndex))
      );
    }
  });

  test("short physical distance is allocated between authoritative FromIdle and capped ToIdle phases", async ({ page }) => {
    await enterLevel(page);
    const allocations = await page.evaluate(async () => {
      const game = window.eval("state");
      const resolver = window.eval("worldResolver");
      resolver.updateLocomotionSettings({ shortMoveThreshold: 90, fromIdleMovement: 0.15, toIdleMovement: 0.05, toIdleMaxDistance: 5 });
      const values = [];
      for (const distance of [5, 5.01, 10, 25, 30, 90]) {
        window.eval("stopMovement")({ invalidateIntent: true });
        window.eval("locomotion.completeArrival")();
        game.worldX = 500;
        window.eval("walkRoute")([{ x: 500 + distance, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "allocation" }));
        const movement = game.movement;
        while (game.movement) await new Promise((resolve) => setTimeout(resolve, 4));
        const sum = (suffix) => movement.motionHistory.filter((sample) => sample.state.endsWith(suffix)).reduce((total, sample) => total + Math.abs(sample.toX - sample.fromX), 0);
        values.push({ distance, from: sum("FromIdle"), to: sum("ToIdle") });
      }
      return values;
    });
    for (const value of allocations) {
      expect(value.from + value.to).toBeCloseTo(value.distance, 4);
      expect(value.to).toBeLessThanOrEqual(5.01);
      expect(value.from).toBeGreaterThanOrEqual(value.to);
    }
    expect(allocations.find((value) => value.distance === 25)?.from).toBeCloseTo(20, 1);
    expect(allocations.find((value) => value.distance === 25)?.to).toBeCloseTo(5, 1);
    expect(allocations.find((value) => value.distance === 5)?.to).toBeLessThan(5);
    expect(allocations.find((value) => value.distance === 5.01)?.to).toBeLessThan(2);
  });

  test("start frame, visual cap and animation multiplier only crop and scale authored phase playback", async ({ page }) => {
    await enterLevel(page);
    const result = await page.evaluate(async () => {
      const game = window.eval("state");
      const resolver = window.eval("worldResolver");
      const start = (settings, distance = 60) => {
        window.eval("stopMovement")({ invalidateIntent: true });
        window.eval("locomotion.completeArrival")();
        game.worldX = 500;
        resolver.updateLocomotionSettings({ shortMoveThreshold: 90, shortMoveAnimationSpeed: 2, shortMoveMaxFromIdleAnimation: 0.45, ...settings });
        window.eval("walkRoute")([{ x: 500 + distance, y: game.worldY }], () => {}, window.eval("replaceMovementIntent")({ type: "visual-control" }));
        return { movement: game.movement, snapshot: window.eval("locomotion.snapshot")() };
      };
      const starts = [0, 0.2, 0.4].map((shortMoveStartFrame) => start({ shortMoveStartFrame }).snapshot.frameIndex);
      const low = start({ shortMoveStartFrame: 0.2, shortMoveMaxFromIdleAnimation: 0.2 }).movement.shortMaxFrame;
      const high = start({ shortMoveStartFrame: 0.2, shortMoveMaxFromIdleAnimation: 0.6 }).movement.shortMaxFrame;
      const probe = (speed) => {
        start({ shortMoveStartFrame: 0, shortMoveAnimationSpeed: speed }, 90);
        return window.eval("locomotion.snapshot().phaseSpeedMultiplier");
      };
      const slowMultiplier = probe(0.5);
      const fastMultiplier = probe(4);
      const normal = start({ shortMoveThreshold: 1, shortMoveStartFrame: 0.4, shortMoveAnimationSpeed: 4 }, 200).snapshot;
      return { starts, low, high, slowMultiplier, fastMultiplier, normal };
    });
    expect(result.starts).toEqual([0, 3, 6]);
    expect(result.low).toBeLessThan(result.high);
    expect(result.slowMultiplier).toBe(0.5);
    expect(result.fastMultiplier).toBe(4);
    expect(result.normal.state).toBe("walkRightFromIdle");
    expect(result.normal.frameIndex).toBe(0);
    expect(result.normal.phaseSpeedMultiplier).toBe(1);
    expect(result.normal.frameLimit).toBeNull();
  });

  test("zero-distance requests stay idle and call arrival exactly once", async ({ page }) => {
    await enterLevel(page);
    const result = await page.evaluate(async () => {
      const game = window.eval("state");
      let callbacks = 0;
      const x = game.worldX;
      window.eval("walkRoute")([{ x, y: game.worldY }], () => { callbacks += 1; }, window.eval("replaceMovementIntent")({ type: "zero" }));
      await new Promise((resolve) => setTimeout(resolve, 80));
      return { callbacks, startX: x, finalX: game.worldX, movement: game.movement, state: window.eval("locomotion.snapshot().state") };
    });
    expect(result).toEqual({ callbacks: 1, startX: result.startX, finalX: result.startX, movement: null, state: "idle" });
  });

  test("a nearby challenge opens after its unified short arrival finishes in idle", async ({ page }) => {
    await enterLevel(page);
    const result = await page.evaluate(async () => {
      const rune = window.eval("activeRunes()[0]");
      const approach = window.eval("getApproachPoint")(rune);
      const game = window.eval("state");
      game.worldX = approach.x - 40;
      game.worldY = approach.y;
      window.eval("render")();
      window.eval("selectChallenge")(rune);
      const movement = game.movement;
      const deadline = performance.now() + 10000;
      while (game.screen === "scene" && performance.now() < deadline) await new Promise((resolve) => setTimeout(resolve, 10));
      return { screen: game.screen, activeRuneId: game.activeRuneId, shortMove: movement?.shortMove, finalX: game.worldX, targetX: movement?.points.at(-1).x, finalState: window.eval("locomotion.snapshot().state"), movingStates: movement?.motionHistory.map((sample) => sample.state) || [] };
    });
    expect(result.screen).toBe("challenge");
    expect(result.activeRuneId).toBeTruthy();
    expect(result.shortMove).toBe(true);
    expect(result.finalX).toBeCloseTo(result.targetX, 5);
    expect(result.finalState).toBe("idle");
    expect(result.movingStates.some((state) => state.endsWith("FromIdle"))).toBe(true);
    expect(result.movingStates.some((state) => state.endsWith("ToIdle"))).toBe(true);
    expect(result.movingStates.some((state) => state.endsWith("Loop"))).toBe(false);
  });
});
