// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(root, "index.html")).toString();

async function loadLevel(page, levelId) {
  await page.evaluate(async (id) => {
    await window.eval("selectLevel")(id, { startImmediately: true, allowDisabledForEditor: true });
    window.eval("render")();
  }, levelId);
}

async function completionSnapshot(page) {
  return page.evaluate(() => ({
    levelId: window.eval("level.id"),
    logicalIds: [...window.eval("state.completedRunes")],
    activeIds: window.eval("activeRunes")().map((rune) => rune.id),
    renderedDoneIds: [...document.querySelectorAll("[data-rune].runeDone")].map((node) => node.dataset.rune),
    renderedCompletedNpcs: [...document.querySelectorAll("[data-npc-animation='completed']")].map((node) => node.dataset.npcChallenge)
  }));
}

test("Ctrl+Shift+L completion stays isolated from later level logic and indicators", async ({ page }) => {
  await page.goto(gameUrl);
  await page.evaluate(() => localStorage.clear());
  await loadLevel(page, "LVL-0001");
  const before = await completionSnapshot(page);
  expect(before.logicalIds).toEqual([]);
  expect(before.renderedDoneIds).toEqual([]);

  await page.keyboard.press("Control+Shift+L");
  const completed = await completionSnapshot(page);
  expect(completed.logicalIds.sort()).toEqual([...completed.activeIds].sort());
  expect(completed.renderedDoneIds.sort()).toEqual([...completed.activeIds].sort());

  for (const levelId of ["LVL-0002", "LVL-0003"]) {
    await loadLevel(page, levelId);
    const later = await completionSnapshot(page);
    expect(later.levelId).toBe(levelId);
    expect(later.logicalIds).toEqual([]);
    expect(later.renderedDoneIds).toEqual([]);
    expect(later.renderedCompletedNpcs).toEqual([]);
  }
});

test("level and completion state switch atomically while the next level prepares", async ({ page }) => {
  await page.goto(gameUrl);
  await page.evaluate(() => localStorage.clear());
  await loadLevel(page, "LVL-0001");
  await page.keyboard.press("Control+Shift+L");

  const during = await page.evaluate(async () => {
    const runtime = window.eval("ambientFlybyRuntime");
    const originalPrepare = runtime.prepareLevel;
    let releasePrepare;
    let enteredPrepare;
    const entered = new Promise((resolve) => { enteredPrepare = resolve; });
    const release = new Promise((resolve) => { releasePrepare = resolve; });
    runtime.prepareLevel = async function(selectedLevel) {
      enteredPrepare();
      await release;
      return originalPrepare.call(this, selectedLevel);
    };
    const loading = window.eval("selectLevel")("LVL-0002", {
      startImmediately: true,
      allowDisabledForEditor: true,
      deferRender: true
    });
    await entered;
    const snapshot = {
      levelId: window.eval("level.id"),
      logicalIds: [...window.eval("state.completedRunes")],
      renderedDoneIds: [...document.querySelectorAll("[data-rune].runeDone")].map((node) => node.dataset.rune)
    };
    releasePrepare();
    await loading;
    runtime.prepareLevel = originalPrepare;
    window.eval("render")();
    return snapshot;
  });

  expect(during.levelId).toBe("LVL-0001");
  expect(during.logicalIds.length).toBeGreaterThan(0);
  expect(during.renderedDoneIds.length).toBeGreaterThan(0);
  const after = await completionSnapshot(page);
  expect(after.levelId).toBe("LVL-0002");
  expect(after.logicalIds).toEqual([]);
  expect(after.renderedDoneIds).toEqual([]);
});
