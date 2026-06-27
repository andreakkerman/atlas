// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const vm = require("vm");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const editorUrl = `${gameUrl}?dev=editor`;
const editorRuntimeUrl = process.env.ATLAS_EDITOR_URL || editorUrl;
const root = path.join(__dirname, "..");

async function openVikingEditor(page) {
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("console", (message) => {
    const text = message.text();
    if (
      message.type() === "error" &&
      !text.includes("Failed to load resource") &&
      !text.includes("Not allowed to load local resource") &&
      !text.includes("Access-Control-Allow-Origin")
    ) pageErrors.push(text);
  });
  await page.goto(editorUrl);
  await page.evaluate(async () => {
    await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
    const currentLevel = window.eval("level");
    currentLevel.sceneEffects = [];
    currentLevel.sceneEffectGroups = [];
    window.eval("state.worldX = 700");
    window.eval("state.worldY = 586");
    window.eval("sceneEffectRuntime.prepareLevel")(currentLevel);
    window.eval("render")();
  });
  await page.keyboard.press("Control+Shift+D");
  await expect(page.locator("[data-developer-tools]")).toBeVisible();
  return pageErrors;
}

async function dragLocator(page, locator, dx, dy) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("Drag target was not measurable.");
  await locator.dragTo(page.locator("body"), {
    sourcePosition: { x: box.width / 2, y: box.height / 2 },
    targetPosition: { x: box.x + box.width / 2 + dx, y: box.y + box.height / 2 + dy },
    force: true
  });
}

async function openLevelEditor(page, levelId) {
  await page.goto(editorRuntimeUrl);
  await page.evaluate(async (id) => {
    await window.eval("selectLevel")(id, { startImmediately: true });
    window.eval("render")();
  }, levelId);
  await page.keyboard.press("Control+Shift+D");
  await expect(page.locator("[data-developer-tools]")).toBeVisible();
}

function preserveFiles(levelId) {
  const levelPath = path.join(root, "Levels", levelId, "level.js");
  const audioPath = path.join(root, "src", "audio-config.js");
  const draftPath = path.join(root, "Levels", levelId, "editor.draft.json");
  return {
    levelPath,
    audioPath,
    draftPath,
    levelSource: fs.readFileSync(levelPath, "utf8"),
    audioSource: fs.readFileSync(audioPath, "utf8"),
    draftSource: fs.existsSync(draftPath) ? fs.readFileSync(draftPath, "utf8") : null
  };
}

function restoreFiles(snapshot) {
  fs.writeFileSync(snapshot.levelPath, snapshot.levelSource);
  fs.writeFileSync(snapshot.audioPath, snapshot.audioSource);
  if (snapshot.draftSource === null) {
    if (fs.existsSync(snapshot.draftPath)) fs.unlinkSync(snapshot.draftPath);
  } else {
    fs.writeFileSync(snapshot.draftPath, snapshot.draftSource);
  }
}

function clearDraft(snapshot) {
  if (fs.existsSync(snapshot.draftPath)) fs.unlinkSync(snapshot.draftPath);
}

function loadLevelFromFile(levelPath, levelId) {
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {} } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(levelPath, "utf8"), context, { filename: levelPath });
  return context.window.SVEN_LEVEL_DEFINITIONS[levelId];
}

async function applyAndReload(page, levelId) {
  await page.getByRole("button", { name: "Apply" }).click();
  await expect(page.getByText("Draft Status: Applied")).toBeVisible({ timeout: 10000 });
  await page.reload();
  await page.evaluate(async (id) => {
    await window.eval("selectLevel")(id, { startImmediately: true });
    window.eval("render")();
  }, levelId);
}

test.describe("developer editor interaction routing", () => {
  test("keeps Objects and Effects controls functional through real delegated clicks and pointer drags", async ({ page }) => {
    const pageErrors = await openVikingEditor(page);

    const stateBefore = await page.evaluate(() => ({
      movement: window.eval("state.movement"),
      svenX: window.eval("state.worldX"),
      svenY: window.eval("state.worldY")
    }));

    await page.locator("details.editorSection summary").filter({ hasText: "Ambient animals" }).first().click();
    await expect(page.locator("details.editorSection").filter({ hasText: "Ambient animals" })).not.toHaveAttribute("open", "");
    await page.locator("details.editorSection summary").filter({ hasText: "Ambient animals" }).first().click();
    await expect(page.locator("details.editorSection").filter({ hasText: "Ambient animals" })).toHaveAttribute("open", "");

    await page.evaluate(() => {
      window.__editorInteractionCounts = { blink: 0, sound: 0 };
      window.eval(`{
        const originalBlink = runAmbientAnimalBlink;
        runAmbientAnimalBlink = function(...args) {
          if (args[1]?.doubleBlink === false) window.__editorInteractionCounts.blink += 1;
          return originalBlink.apply(this, args);
        };
        const originalSound = playAmbientAnimalSound;
        playAmbientAnimalSound = function(...args) {
          window.__editorInteractionCounts.sound += 1;
          return originalSound.apply(this, args);
        };
      }`);
    });
    await page.getByRole("button", { name: "Preview blink" }).first().click();
    await page.getByRole("button", { name: "Preview sound" }).first().click();
    await expect.poll(() => page.evaluate(() => window.__editorInteractionCounts)).toEqual({ blink: 1, sound: 1 });

    const objectBefore = await page.evaluate(() => {
      const object = window.eval("level.interactiveObjects.find((item) => item.id === 'harborMap')");
      return { x: object.center.x, y: object.center.y, radius: object.radius };
    });
    await dragLocator(page, page.locator("[data-object-id='harborMap'][data-object-drag='center']").first(), 28, 18);
    await expect.poll(() => page.evaluate((before) => {
      const object = window.eval("level.interactiveObjects.find((item) => item.id === 'harborMap')");
      return {
        selected: window.eval("walkPathEditor.currentObject?.id"),
        moved: Math.hypot(object.center.x - before.x, object.center.y - before.y) > 20
      };
    }, objectBefore)).toEqual({ selected: "harborMap", moved: true });
    await dragLocator(page, page.locator("[data-object-id='harborMap'][data-object-drag='radius']").first(), 24, 0);
    await expect.poll(() => page.evaluate((before) => {
      const object = window.eval("level.interactiveObjects.find((item) => item.id === 'harborMap')");
      return object.radius > before;
    }, objectBefore.radius)).toBe(true);

    await page.getByRole("button", { name: "Effects", exact: true }).click();
    await expect(page.locator("[data-scene-effects-editor]")).toBeVisible();
    await page.locator("[data-scene-effects-editor] details.editorSection summary").filter({ hasText: "Effect preset library" }).first().click();
    await expect(page.locator("[data-scene-effects-editor] details.editorSection").filter({ hasText: "Effect preset library" })).not.toHaveAttribute("open", "");
    await page.locator("[data-scene-effects-editor] details.editorSection summary").filter({ hasText: "Effect preset library" }).first().click();
    await expect(page.locator("[data-scene-effects-editor] details.editorSection").filter({ hasText: "Effect preset library" })).toHaveAttribute("open", "");

    await page.locator("[data-effect-preset-card='light-source-enhancement'] button[data-add-effect]").first().click();
    await expect.poll(() => page.evaluate(() => window.eval("(level.sceneEffects || []).length"))).toBe(1);
    await expect(page.locator("[data-select-effect='light-source-enhancement-01']")).toHaveCount(1);
    await page.locator("[data-select-effect='light-source-enhancement-01']").click();

    await page.locator("[data-effect-override='intensity']").fill("0.74");
    await page.locator("[data-effect-override='intensity']").dispatchEvent("change");
    await expect.poll(() => page.evaluate(() => window.eval("level.sceneEffects[0].overrides.intensity"))).toBe(0.74);

    await page.evaluate(() => {
      const effect = window.eval("level.sceneEffects[0]");
      effect.geometry.x = 600;
      effect.geometry.y = 360;
      window.eval("sceneEffectRuntime.prepareLevel")(window.eval("level"));
      window.eval("render")();
    });
    const effectBefore = await page.evaluate(() => ({
      x: window.eval("level.sceneEffects[0].geometry.x"),
      y: window.eval("level.sceneEffects[0].geometry.y")
    }));
    await dragLocator(page, page.locator(".sceneEffectGuides [data-effect-handle='move']").first(), 80, 0);
    await expect.poll(() => page.evaluate((before) => {
      const geometry = window.eval("level.sceneEffects[0].geometry");
      return Math.hypot(geometry.x - before.x, geometry.y - before.y) > 30;
    }, effectBefore)).toBe(true);

    const afterGuideClick = await page.evaluate((before) => ({
      movementUnchanged: JSON.stringify(window.eval("state.movement")) === JSON.stringify(before.movement),
      svenUnchanged: window.eval("state.worldX") === before.svenX && window.eval("state.worldY") === before.svenY
    }), stateBefore);
    expect(afterGuideClick).toEqual({ movementUnchanged: true, svenUnchanged: true });

    for (let index = 0; index < 2; index += 1) {
      await page.getByRole("button", { name: "Objects", exact: true }).click();
      await expect(page.getByRole("button", { name: "Preview blink" }).first()).toBeVisible();
      await page.getByRole("button", { name: "Effects", exact: true }).click();
      await expect(page.locator("[data-scene-effects-editor]")).toBeVisible();
    }

    await page.locator("[data-effect-preset-card='light-source-enhancement'] button[data-add-effect]").first().click();
    await expect.poll(() => page.evaluate(() => window.eval("(level.sceneEffects || []).length"))).toBe(2);
    await page.getByRole("button", { name: "Objects", exact: true }).click();
    await page.getByRole("button", { name: "Preview blink" }).first().click();
    await expect.poll(() => page.evaluate(() => window.__editorInteractionCounts.blink)).toBe(2);

    await page.getByRole("button", { name: "Revert" }).click();
    await expect.poll(() => page.evaluate(() => ({
      status: window.eval("walkPathEditor.status"),
      effects: window.eval("(level.sceneEffects || []).length")
    }))).toEqual({ status: "Reverted", effects: 0 });

    expect(pageErrors).toEqual([]);
  });

  test("scene-effect-only Apply patches only scene-effect sections and remains idempotent", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const snapshot = preserveFiles("LVL-0002");
    const challengeSource = snapshot.levelSource.slice(0, snapshot.levelSource.indexOf('window.SVEN_LEVEL_DEFINITIONS["LVL-0002"]'));
    try {
      await openLevelEditor(page, "LVL-0002");
      const expected = await page.evaluate(async () => {
        window.eval("addSceneEffect")("light-source-enhancement");
        const effect = window.eval("level.sceneEffects[0]");
        effect.overrides = {
          ...(effect.overrides || {}),
          primaryColor: "#CC7733",
          intensity: 0.82
        };
        window.eval("commitSceneEffects")(`${effect.id}: persistence test.`);
        await window.eval("persistWalkPathDraft")();
        return {
          sceneEffects: window.eval("cloneSceneEffects(level.sceneEffects)"),
          sceneEffectGroups: window.eval("cloneSceneEffectGroups(level.sceneEffectGroups || [])"),
          presetId: effect.presetId,
          overrides: effect.overrides
        };
      });

      await expect.poll(async () => page.evaluate(async () => {
        const response = await fetch("/__dev/levels/LVL-0002/editor-draft");
        return Object.keys(await response.json()).sort();
      })).toEqual(["levelId", "sceneEffectGroups", "sceneEffects", "updatedAt"]);

      await applyAndReload(page, "LVL-0002");
      const firstAppliedLevel = fs.readFileSync(snapshot.levelPath, "utf8");
      expect(firstAppliedLevel).toContain(challengeSource);
      expect(firstAppliedLevel).toContain("sceneEffects:");
      expect(firstAppliedLevel).not.toContain("audioConfig");
      expect(fs.readFileSync(snapshot.audioPath, "utf8")).toBe(snapshot.audioSource);
      expect(fs.readFileSync(snapshot.draftPath, "utf8")).toBe(snapshot.draftSource);

      const parsedLevel = loadLevelFromFile(snapshot.levelPath, "LVL-0002");
      const reloaded = {
        count: (parsedLevel.sceneEffects || []).length,
        presetId: parsedLevel.sceneEffects?.[0]?.presetId,
        overrides: parsedLevel.sceneEffects?.[0]?.overrides
      };
      expect(reloaded).toEqual({
        count: 1,
        presetId: expected.presetId,
        overrides: expected.overrides
      });

      await page.evaluate(async (payload) => {
        const response = await fetch("/__dev/levels/LVL-0002/apply-editor", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error((await response.json()).error || "Apply failed");
      }, {
        sceneEffects: expected.sceneEffects,
        sceneEffectGroups: expected.sceneEffectGroups
      });
      expect(fs.readFileSync(snapshot.levelPath, "utf8")).toBe(firstAppliedLevel);
      expect(fs.readFileSync(snapshot.audioPath, "utf8")).toBe(snapshot.audioSource);
      expect(fs.readFileSync(snapshot.draftPath, "utf8")).toBe(snapshot.draftSource);

      await openLevelEditor(page, "LVL-0002");
      await page.evaluate(async () => {
        window.eval("level.sceneEffects = []");
        window.eval("level.sceneEffectGroups = []");
        window.eval("commitSceneEffects")("scene effects removed for persistence test.");
        await window.eval("persistWalkPathDraft")();
      });
      await expect.poll(async () => page.evaluate(async () => {
        const response = await fetch("/__dev/levels/LVL-0002/editor-draft");
        const draft = await response.json();
        return {
          effects: draft.sceneEffects?.length,
          groups: draft.sceneEffectGroups?.length,
          keys: Object.keys(draft).sort()
        };
      })).toEqual({
        effects: 0,
        groups: 0,
        keys: ["levelId", "sceneEffectGroups", "sceneEffects", "updatedAt"]
      });
      await applyAndReload(page, "LVL-0002");
      const removedLevel = fs.readFileSync(snapshot.levelPath, "utf8");
      expect(removedLevel).toContain(challengeSource);
      expect(removedLevel).not.toContain("sceneEffects:");
      expect(removedLevel).not.toContain("sceneEffectGroups:");
      expect(fs.readFileSync(snapshot.audioPath, "utf8")).toBe(snapshot.audioSource);
      expect(fs.readFileSync(snapshot.draftPath, "utf8")).toBe(snapshot.draftSource);
    } finally {
      restoreFiles(snapshot);
    }
  });

  test("audio-only Apply still persists a dedicated audio draft without touching the level file", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const snapshot = preserveFiles("LVL-0002");
    try {
      clearDraft(snapshot);
      await openLevelEditor(page, "LVL-0002");
      const nextVolume = await page.evaluate(async () => {
        const current = window.eval("audioConfig.levels['LVL-0002'].musicVolume");
        const next = current === 0.41 ? 0.42 : 0.41;
        window.eval("updateAudioDraft")("levels.LVL-0002.musicVolume", next);
        await window.eval("persistWalkPathDraft")();
        return next;
      });

      await expect.poll(async () => page.evaluate(async () => {
        const response = await fetch("/__dev/levels/LVL-0002/editor-draft");
        return Object.keys(await response.json()).sort();
      })).toEqual(["audioConfig", "levelId", "updatedAt"]);

      await applyAndReload(page, "LVL-0002");
      expect(fs.readFileSync(snapshot.levelPath, "utf8")).toBe(snapshot.levelSource);
      expect(fs.readFileSync(snapshot.audioPath, "utf8")).toContain(`"musicVolume": ${nextVolume}`);
    } finally {
      restoreFiles(snapshot);
    }
  });

  test("Effects tab keeps empty-world walking while effect handles remain interactive", async ({ page }) => {
    const pageErrors = await openVikingEditor(page);
    await page.getByRole("button", { name: "Effects", exact: true }).click();
    await page.locator("[data-effect-preset-card='light-source-enhancement'] button[data-add-effect]").first().click();
    await page.locator("[data-select-effect='light-source-enhancement-01']").click();
    await page.evaluate(() => {
      const effect = window.eval("level.sceneEffects[0]");
      effect.geometry.x = 1500;
      effect.geometry.y = 340;
      window.eval("sceneEffectRuntime.prepareLevel")(window.eval("level"));
      window.eval("state.worldX = 700");
      window.eval("state.worldY = 586");
      window.eval("state.cameraX = undefined");
      window.eval("render")();
    });

    const handle = page.locator(".sceneEffectGuides [data-effect-handle='move']").first();
    await expect(handle).toBeVisible();
    const handleStyle = await handle.evaluate((node) => ({
      radius: Number(node.getAttribute("r")),
      fill: getComputedStyle(node).fill
    }));
    expect(handleStyle.radius).toBeLessThanOrEqual(10);
    expect(handleStyle.fill).not.toBe("rgb(255, 87, 87)");

    const radiusHandle = page.locator(".sceneEffectGuides .effectGuideHandle[data-effect-handle='radius']").first();
    await expect(radiusHandle).toBeVisible();
    const radiusHandleStyle = await radiusHandle.evaluate((node) => ({
      radius: Number(node.getAttribute("r")),
      fill: getComputedStyle(node).fill,
      strokeWidth: getComputedStyle(node).strokeWidth
    }));
    expect(radiusHandleStyle.radius).toBeLessThanOrEqual(8);
    expect(radiusHandleStyle.fill).toBe("rgb(255, 208, 109)");
    expect(Number.parseFloat(radiusHandleStyle.strokeWidth)).toBeLessThanOrEqual(2.5);

    const radiusHitTarget = page.locator(".sceneEffectGuides .effectGuideHitTarget[data-effect-handle='radius']").first();
    await expect(radiusHitTarget).toHaveAttribute("r", "15");

    const beforeHandle = await page.evaluate(() => ({ ...window.eval("level.sceneEffects[0].geometry") }));
    await dragLocator(page, handle, 34, 0);
    await expect.poll(() => page.evaluate((before) => {
      const geometry = window.eval("level.sceneEffects[0].geometry");
      return Math.abs(geometry.x - before.x) > 15;
    }, beforeHandle)).toBe(true);

    await page.evaluate(() => {
      window.eval("stopMovement")({ invalidateIntent: true });
      window.eval("state.worldX = 700");
      window.eval("state.worldY = 586");
      window.eval("state.cameraX = undefined");
      window.eval("render")();
    });
    const stageBox = await page.locator("[data-world-stage]").boundingBox();
    if (!stageBox) throw new Error("World stage was not measurable.");
    await page.mouse.click(stageBox.x + stageBox.width * 0.22, stageBox.y + stageBox.height * 0.82);
    await expect.poll(() => page.evaluate(() => {
      const movement = window.eval("state.movement");
      return Boolean(movement || window.eval("state.movementIntent"));
    })).toBe(true);

    expect(pageErrors).toEqual([]);
  });

  test("applies Leonardo approach, exit and legacy object geometry edits then reloads", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const snapshot = preserveFiles("LVL-0021");
    try {
      clearDraft(snapshot);
      await openLevelEditor(page, "LVL-0021");
      const expected = await page.evaluate(async () => {
        const path = window.eval("authoredWalkPathPoints(level)").map((point) => ({ ...point }));
        const central = path.find((point) => point.id === "centralCodex-approach");
        const exit = path.find((point) => point.id === "procenoGate-approach");
        central.x += 9;
        central.y += 3;
        exit.x -= 11;
        exit.y += 2;
        window.eval("setLevelWalkPath")(path);
        window.eval("walkPathEditor.currentPoint = level.walkPath.find((point) => point.id === 'procenoGate-approach')");
        window.eval("markEditorModified")("walk path edited for persistence test");
        await window.eval("persistWalkPathDraft")();
        return { central, exit };
      });

      await applyAndReload(page, "LVL-0021");
      const reloaded = await page.evaluate(() => {
        const central = window.eval("level.walkPath.find((point) => point.id === 'centralCodex-approach')");
        const exit = window.eval("level.walkPath.find((point) => point.id === 'procenoGate-approach')");
        const centralLegacy = window.eval("level.objects.find((object) => object.id === 'centralCodex')");
        const exitLegacy = window.eval("level.objects.find((object) => object.id === 'procenoGate')");
        return {
          central: { x: central.x, y: central.y },
          exit: { x: exit.x, y: exit.y },
          centralLegacyApproach: centralLegacy.approach,
          exitLegacyApproach: exitLegacy.approach
        };
      });
      expect(reloaded.central).toEqual({ x: expected.central.x, y: expected.central.y });
      expect(reloaded.exit).toEqual({ x: expected.exit.x, y: expected.exit.y });
      expect(reloaded.centralLegacyApproach).toEqual(reloaded.central);
      expect(reloaded.exitLegacyApproach).toEqual(reloaded.exit);
    } finally {
      restoreFiles(snapshot);
    }
  });

  test("applies interactive object edits on an older level", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const snapshot = preserveFiles("LVL-0001");
    try {
      clearDraft(snapshot);
      await openLevelEditor(page, "LVL-0001");
      const expected = await page.evaluate(async () => {
        const objects = window.eval("cloneInteractiveObjects(level.interactiveObjects)");
        const forest = objects.find((object) => object.id === "forestRune");
        forest.center.x += 7;
        forest.center.y += 4;
        forest.radius += 5;
        window.eval("setLevelInteractiveObjects")(objects);
        window.eval("walkPathEditor.currentObject = level.interactiveObjects.find((object) => object.id === 'forestRune')");
        window.eval("markEditorModified")("object edited for persistence test");
        await window.eval("persistWalkPathDraft")();
        return forest;
      });

      await applyAndReload(page, "LVL-0001");
      const reloaded = await page.evaluate(() => {
        const object = window.eval("level.interactiveObjects.find((item) => item.id === 'forestRune')");
        const legacy = window.eval("(level.objects || []).find((item) => item.id === 'forestRune') || null");
        return { object, legacy };
      });
      expect(reloaded.object.center).toEqual(expected.center);
      expect(reloaded.object.radius).toBe(expected.radius);
      if (reloaded.legacy) {
        expect(reloaded.legacy.x).toBe(expected.center.x);
        expect(reloaded.legacy.y).toBe(expected.center.y);
        expect(reloaded.legacy.radius).toBe(expected.radius);
      }
    } finally {
      restoreFiles(snapshot);
    }
  });

  test("collapses panel so right-edge points can be moved, restores state, applies and reloads", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const snapshot = preserveFiles("LVL-0021");
    try {
      clearDraft(snapshot);
      await openLevelEditor(page, "LVL-0021");
      await page.evaluate(() => {
        window.eval("state.worldX = 1820");
        window.eval("state.worldY = 548");
        window.eval("state.cameraX = undefined");
        window.eval("render")();
      });
      await page.getByRole("button", { name: "Effects", exact: true }).click();
      await page.locator("[data-effect-preset-card='light-source-enhancement'] button[data-add-effect]").first().click();
      await page.getByRole("button", { name: "Objects", exact: true }).click();
      await page.locator('[data-debug-action="collapse-editor-panel"]').click();
      await expect(page.locator("[data-developer-tools]")).toHaveCount(0);
      await expect(page.getByRole("button", { name: "Editor" })).toBeVisible();

      const before = await page.evaluate(() => {
        const point = window.eval("level.walkPath.find((item) => item.id === 'procenoGate-approach')");
        return { x: point.x, y: point.y };
      });
      const point = page.locator('[data-debug-node="procenoGate-approach"] circle');
      const box = await point.boundingBox();
      if (!box) throw new Error("right-edge walk point was not measurable");
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width / 2 - 28, box.y + box.height / 2 - 6);
      await page.mouse.up();

      await page.getByRole("button", { name: "Editor" }).click();
      await expect(page.locator("[data-developer-tools]")).toBeVisible();
      await expect(page.locator("[data-developer-tools]")).toHaveAttribute("data-current-editor-mode", "objects");
      const restored = await page.evaluate((initial) => {
        const point = window.eval("level.walkPath.find((item) => item.id === 'procenoGate-approach')");
        return {
          currentPoint: window.eval("walkPathEditor.currentPoint?.id"),
          status: window.eval("walkPathEditor.status"),
          modified: window.eval("walkPathEditor.modified"),
          selectedEffectId: window.eval("walkPathEditor.selectedEffectId"),
          moved: point.x !== initial.x || point.y !== initial.y,
          point: { x: point.x, y: point.y }
        };
      }, before);
      expect(restored).toMatchObject({
        currentPoint: "procenoGate-approach",
        status: "Modified",
        modified: true,
        selectedEffectId: "light-source-enhancement-01",
        moved: true
      });

      await applyAndReload(page, "LVL-0021");
      const reloaded = await page.evaluate(() => {
        const point = window.eval("level.walkPath.find((item) => item.id === 'procenoGate-approach')");
        return { x: point.x, y: point.y };
      });
      expect(reloaded).toEqual(restored.point);
    } finally {
      restoreFiles(snapshot);
    }
  });
});
