// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");
const vm = require("vm");

const root = path.join(__dirname, "..");
const gameUrl = pathToFileURL(path.join(root, "index.html")).toString();
const editorUrl = `${gameUrl}?dev=editor`;
const editorRuntimeUrl = process.env.ATLAS_EDITOR_URL || editorUrl;

function loadManifest() {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "Levels", "manifest.js"), "utf8"), context);
  return context.window.SVEN_LEVEL_MANIFEST.levels;
}

function loadLevel(levelId) {
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {} } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync(path.join(root, "Levels", levelId, "level.js"), "utf8"), context);
  return context.window.SVEN_LEVEL_DEFINITIONS[levelId];
}

function adventureEntries(rootId) {
  const manifest = loadManifest();
  const rootEntry = manifest.find((entry) => entry.id === rootId);
  const entries = [];
  const queue = [rootEntry];
  const seen = new Set();
  while (queue.length) {
    const entry = queue.shift();
    if (!entry || seen.has(entry.id)) continue;
    seen.add(entry.id);
    entries.push(entry);
    manifest.filter((item) => item.connectedFrom === entry.id).forEach((item) => queue.push(item));
  }
  return entries;
}

function activeChallengeObjectCount(rootId) {
  return adventureEntries(rootId).reduce((sum, entry) => {
    const level = loadLevel(entry.id);
    const authored = new Map((level.learningChallenges || []).map((challenge) => [challenge.id, challenge]));
    return sum + (level.runes || []).filter((rune) => {
      if (rune.challengeId) return authored.get(rune.challengeId)?.active !== false;
      return true;
    }).length;
  }, 0);
}

async function startLevel(page, levelId) {
  await page.goto(gameUrl);
  await page.evaluate(async (id) => {
    localStorage.clear();
    await window.eval("selectLevel")(id, { startImmediately: true });
    window.eval("render")();
  }, levelId);
}

async function openEditorLevel(page, levelId) {
  await page.goto(editorRuntimeUrl);
  await page.evaluate(async (id) => {
    await window.eval("selectLevel")(id, { startImmediately: true });
    window.eval("render")();
  }, levelId);
  await page.keyboard.press("Control+Shift+D");
  await expect(page.locator("[data-developer-tools]")).toBeVisible();
}

function preserveLevel(levelId) {
  const levelPath = path.join(root, "Levels", levelId, "level.js");
  const draftPath = path.join(root, "Levels", levelId, "editor.draft.json");
  return {
    levelPath,
    draftPath,
    levelSource: fs.readFileSync(levelPath, "utf8"),
    draftSource: fs.existsSync(draftPath) ? fs.readFileSync(draftPath, "utf8") : null
  };
}

function restoreLevel(snapshot) {
  fs.writeFileSync(snapshot.levelPath, snapshot.levelSource);
  if (snapshot.draftSource === null) {
    if (fs.existsSync(snapshot.draftPath)) fs.unlinkSync(snapshot.draftPath);
  } else {
    fs.writeFileSync(snapshot.draftPath, snapshot.draftSource);
  }
}

test.describe("learning challenge active state", () => {
  test("inactive challenges do not render, cue, or block exit-ready", async ({ page }) => {
    await startLevel(page, "LVL-0001");

    await page.evaluate(() => {
      const currentLevel = window.eval("level");
      currentLevel.learningChallenges[0].active = false;
      window.eval("state.completedRunes = new Set(level.runes.slice(1).map((rune) => rune.id))");
      window.eval("render")();
    });

    await expect(page.getByRole("button", { name: "Zonrune" })).toHaveCount(0);
    await expect(page.locator('[data-rune="zon"]')).toHaveCount(0);
    await expect(page.locator('.runeHotspot[data-hotspot-cue="challenge"]')).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Runenpoort", exact: true })).toHaveAttribute("data-exit-ready", "true");
    await expect(page.getByRole("button", { name: "Runenpoort", exact: true })).toHaveAttribute("data-hotspot-cue", "exit-ready");
  });

  test("old completion state for inactive challenges neither blocks nor completes active progression", async ({ page }) => {
    await startLevel(page, "LVL-0001");

    await page.evaluate(() => {
      window.eval("level.learningChallenges[0].active = false");
      window.eval("state.completedRunes = new Set(['zon'])");
      window.eval("render")();
    });

    await expect(page.locator(".runeDone")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Runenpoort", exact: true })).toHaveAttribute("data-exit-ready", "false");

    await page.evaluate(() => {
      window.eval("state.completedRunes = new Set(['zon', 'steen', 'wind'])");
      window.eval("render")();
    });

    await expect(page.locator(".runeDone")).toHaveCount(2);
    await expect(page.getByRole("button", { name: "Runenpoort", exact: true })).toHaveAttribute("data-exit-ready", "true");
  });

  test("legacy saved level completion does not unlock a changed inactive challenge set", async ({ page }) => {
    await page.goto(gameUrl);
    const state = await page.evaluate(async () => {
      localStorage.clear();
      const entry = window.SVEN_LEVEL_MANIFEST.levels.find((item) => item.id === "LVL-0021");
      await window.eval("loadLevelDefinition")(entry);
      window.SVEN_LEVEL_DEFINITIONS["LVL-0021"].learningChallenges[0].active = false;
      localStorage.setItem("lvl-0021-progress", JSON.stringify({ completedAt: new Date().toISOString() }));
      await window.eval("selectLevel")("LVL-0021", { startImmediately: true });
      window.eval("render")();
      return {
        activeCount: window.eval("activeRunes().length"),
        savedReady: window.eval("state.levelExitReadyFromSaved"),
        exitReady: window.eval("isLevelExitReady")()
      };
    });

    expect(state).toEqual({ activeCount: 3, savedReady: false, exitReady: false });
    await expect(page.getByRole("button", { name: "Poort naar Proceno", exact: true })).toHaveAttribute("data-exit-ready", "false");
  });

  test("saved completion with matching active set does not bypass active challenge completion", async ({ page }) => {
    await page.goto(gameUrl);
    const state = await page.evaluate(async () => {
      localStorage.clear();
      const entry = window.SVEN_LEVEL_MANIFEST.levels.find((item) => item.id === "LVL-0021");
      await window.eval("loadLevelDefinition")(entry);
      window.SVEN_LEVEL_DEFINITIONS["LVL-0021"].learningChallenges[0].active = false;
      localStorage.setItem("lvl-0021-progress", JSON.stringify({
        completedAt: new Date().toISOString(),
        activeChallengeSignature: "mechanicalModel|centralCodex|engineeringTable",
        activeChallengeIds: ["mechanicalModel", "centralCodex", "engineeringTable"]
      }));
      await window.eval("selectLevel")("LVL-0021", { startImmediately: true });
      window.eval("render")();
      return {
        activeCount: window.eval("activeRunes().length"),
        savedReady: window.eval("state.levelExitReadyFromSaved"),
        exitReady: window.eval("isLevelExitReady")()
      };
    });

    expect(state).toEqual({ activeCount: 3, savedReady: true, exitReady: false });
    await expect(page.getByRole("button", { name: "Poort naar Proceno", exact: true })).toHaveAttribute("data-exit-ready", "false");
  });

  test("saved completion on an unchanged level does not bypass challenge completion", async ({ page }) => {
    await page.goto(gameUrl);
    const state = await page.evaluate(async () => {
      localStorage.clear();
      localStorage.setItem("svenadventure-runenpoort-v1", JSON.stringify({ completedAt: new Date().toISOString() }));
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true });
      window.eval("render")();
      return {
        activeCount: window.eval("activeRunes().length"),
        savedReady: window.eval("state.levelExitReadyFromSaved"),
        exitReady: window.eval("isLevelExitReady")()
      };
    });

    expect(state).toEqual({ activeCount: 3, savedReady: true, exitReady: false });
    await expect(page.getByRole("button", { name: "Runenpoort", exact: true })).toHaveAttribute("data-exit-ready", "false");
  });

  test("levels without active fields still treat challenges as active", async ({ page }) => {
    await startLevel(page, "LVL-0001");
    const counts = await page.evaluate(() => ({
      active: window.eval("activeRunes().length"),
      total: window.eval("level.runes.length")
    }));
    expect(counts.active).toBe(counts.total);
    await expect(page.locator('.runeHotspot[data-hotspot-cue="challenge"]')).toHaveCount(counts.total);
  });

  test("adventure menu counts active opdracht objects", async ({ page }) => {
    const expected = activeChallengeObjectCount("LVL-0001") - 1;
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      const entry = window.SVEN_LEVEL_MANIFEST.levels.find((item) => item.id === "LVL-0001");
      await window.eval("loadLevelDefinition")(entry);
      window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].learningChallenges[0].active = false;
    });

    await page.getByRole("button", { name: "Start avontuur" }).click();
    await expect(page.locator('[data-menu-tile="LVL-0001"] .levelBadge')).toHaveText(`3 plaatsen · ${expected} opdrachten`);
  });

  test("menu opdracht total refreshes after an editor active toggle", async ({ page }) => {
    await page.goto(editorUrl);
    await page.getByRole("button", { name: "Start avontuur" }).click();
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await expect.poll(() => page.evaluate(() => window.eval("menuAdventureStats.loaded"))).toBe(true);
    const before = await page.evaluate(() => window.eval('menuAdventureStats.byRoot["LVL-0021"].challengeCount'));

    const toggledId = await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0021", { startImmediately: true });
      const currentLevel = window.eval("level");
      const activeRune = currentLevel.runes.find((rune) =>
        currentLevel.learningChallenges.find((challenge) => challenge.id === rune.challengeId)?.active !== false
      );
      window.eval("updateLearningChallengeActive")(activeRune.challengeId, false);
      window.eval("returnToMenu")();
      return activeRune.challengeId;
    });

    expect(toggledId).toBeTruthy();
    await expect.poll(() => page.evaluate(() => window.eval('menuAdventureStats.byRoot["LVL-0021"].challengeCount'))).toBe(before - 1);
    await expect(page.locator('[data-menu-tile="LVL-0021"] .levelBadge')).toHaveText(`6 plaatsen · ${before - 1} opdrachten`);
  });

  test("editor shows selected challenge content preview and toggle", async ({ page }) => {
    await openEditorLevel(page, "LVL-0001");

    await page.locator('[data-select-challenge="zon"]').click();
    const preview = page.locator('[data-challenge-preview="zon"]');
    await expect(preview).toBeVisible();
    await expect(preview).toContainText("zon");
    await expect(preview).toContainText("Actief");
    await expect(preview).toContainText("4 vragen · 8 varianten");
    await expect(preview).toContainText("4 × 8 = ?");
    await expect(preview).toContainText("Antwoord 32");
    await expect(preview).toContainText("Keuzes 24, 32, 40, 48");
    await expect(preview).toContainText("Minnie hint");
    await expect(preview).toContainText("Moose hint");

    await preview.locator('[data-challenge-active="zon"]').setChecked(false);
    await expect(preview).toContainText("Inactief");
    await expect(page.locator('[data-select-challenge="zon"]')).toHaveClass(/editorChallengeInactive/);
  });

  test("editor preview shows clock visual hour and minute data", async ({ page }) => {
    await openEditorLevel(page, "LVL-0019");
    const clockRuneId = await page.evaluate(() => {
      const currentLevel = window.eval("level");
      const clockChallenge = currentLevel.learningChallenges.find((challenge) =>
        challenge.questions.some((slot) => slot.variants.some((variant) => variant.visual?.type === "clock"))
      );
      return currentLevel.runes.find((rune) => rune.challengeId === clockChallenge.id).id;
    });

    await page.locator(`[data-select-challenge="${clockRuneId}"]`).click();
    const preview = page.locator("[data-challenge-preview]");
    await expect(preview).toContainText("Bevat klokvisuals");
    await expect(preview).toContainText("Visual clock");
    await expect(preview).toContainText("uur");
    await expect(preview).toContainText("minuut");
  });

  test("editor toggles and persists active state through Apply", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const snapshot = preserveLevel("LVL-0001");
    const expectedMenuCount = activeChallengeObjectCount("LVL-0001") - 1;
    try {
      if (fs.existsSync(snapshot.draftPath)) fs.unlinkSync(snapshot.draftPath);
      await openEditorLevel(page, "LVL-0001");
      await page.locator('[data-select-challenge="zon"]').click();
      await page.locator('[data-challenge-active="zon"]').setChecked(false);
      await expect(page.getByText("Draft Status: Modified")).toBeVisible();

      const draft = JSON.parse(fs.readFileSync(snapshot.draftPath, "utf8"));
      expect(draft.learningChallenges.find((challenge) => challenge.id === "zon").active).toBe(false);

      await page.getByRole("button", { name: "Apply" }).click();
      await expect(page.getByText("Draft Status: Applied")).toBeVisible({ timeout: 10000 });
      const applied = loadLevel("LVL-0001");
      expect(applied.learningChallenges.find((challenge) => challenge.id === "zon").active).toBe(false);
      await page.evaluate(() => window.eval("returnToMenu")());
      await expect(page.locator('[data-menu-tile="LVL-0001"] .levelBadge')).toHaveText(`3 plaatsen · ${expectedMenuCount} opdrachten`);
    } finally {
      restoreLevel(snapshot);
    }
  });
});
