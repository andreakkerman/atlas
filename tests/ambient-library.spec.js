// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = pathToFileURL(path.join(root, "index.html")).toString();
const editorUrl = process.env.ATLAS_EDITOR_URL || `${gameUrl}?dev=editor`;

test.describe("central ambient asset library", () => {
  test("has no level-local ambient media or references", async () => {
    const localFolders = [];
    const localReferences = [];
    for (const levelName of fs.readdirSync(path.join(root, "Levels"))) {
      const levelDir = path.join(root, "Levels", levelName);
      if (!fs.statSync(levelDir).isDirectory()) continue;
      const ambientDir = path.join(levelDir, "assets", "ambient");
      if (fs.existsSync(ambientDir)) localFolders.push(ambientDir);
      for (const fileName of ["level.js", "editor.draft.json"]) {
        const file = path.join(levelDir, fileName);
        if (fs.existsSync(file) && /Levels\/[^/]+\/assets\/ambient\//.test(fs.readFileSync(file, "utf8"))) {
          localReferences.push(file);
        }
      }
    }
    expect(localFolders).toEqual([]);
    expect(localReferences).toEqual([]);
  });

  test("reuses central swift assets while keeping England and Italy metadata independent", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      for (const id of ["LVL-0014", "LVL-0016"]) {
        await window.eval("selectLevel")(id, { startImmediately: true });
      }
      const england = window.SVEN_LEVEL_DEFINITIONS["LVL-0014"].ambientFlybys[0];
      const italy = window.SVEN_LEVEL_DEFINITIONS["LVL-0016"].ambientFlybys[0];
      return {
        england: {
          assets: [england.frameA, england.frameB, england.sound],
          path: england.path,
          speed: england.speed,
          syncKey: england.syncKey
        },
        italy: {
          assets: [italy.frameA, italy.frameB, italy.sound],
          path: italy.path,
          speed: italy.speed,
          syncKey: italy.syncKey
        }
      };
    });
    expect(result.england.assets).toEqual(result.italy.assets);
    expect(result.england.assets.every((asset) => asset.startsWith("assets/ambient/flybys/common-swift/"))).toBe(true);
    expect(result.england.path).not.toEqual(result.italy.path);
    expect({
      speed: result.england.speed,
      syncKey: result.england.syncKey
    }).not.toEqual({
      speed: result.italy.speed,
      syncKey: result.italy.syncKey
    });
  });

  test("loads and previews the migrated Netherlands butterfly from the central cache", async ({ page }) => {
    await page.goto(gameUrl);
    const result = await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0013", { startImmediately: true });
      window.eval("render")();
      const flyby = window.eval("level.ambientFlybys[0]");
      await window.eval("ambientFlybyRuntime.prepareLevel")(window.eval("level"));
      window.eval("render")();
      const started = window.eval("ambientFlybyRuntime.preview")(flyby.id);
      await new Promise((resolve) => setTimeout(resolve, 80));
      const shell = document.querySelector(`[data-ambient-flyby="${flyby.id}"]`);
      return {
        started,
        assets: [flyby.frameA, flyby.frameB],
        ready: shell.dataset.ready,
        active: shell.dataset.active,
        syncKey: flyby.syncKey
      };
    });
    expect(result).toMatchObject({
      started: true,
      assets: [
        "assets/ambient/flybys/butterfly/butterfly-a.png",
        "assets/ambient/flybys/butterfly/butterfly-b.png"
      ],
      ready: "true",
      active: "true"
    });
  });

  test("discovers the same sorted central library from every level and rejects traversal", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    await page.goto(editorUrl);
    const result = await page.evaluate(async () => {
      const read = async (levelId) => {
        const response = await fetch(`/__dev/levels/${levelId}/ambient-assets`);
        return { status: response.status, body: await response.json() };
      };
      const traversal = await fetch("/__dev/levels/..%2F..%2F/ambient-assets");
      return {
        first: await read("LVL-0001"),
        second: await read("LVL-0016"),
        traversalStatus: traversal.status
      };
    });
    expect(result.first.status).toBe(200);
    expect(result.first.body).toEqual(result.second.body);
    expect(result.first.body.images).toEqual([...result.first.body.images].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })));
    expect(result.first.body.images).toContain("assets/ambient/animals/owl/owl-open.png");
    expect(result.first.body.images).toContain("assets/ambient/flybys/butterfly/butterfly-a.png");
    expect(result.first.body.audio).toContain("assets/ambient/flybys/common-swift/common-swift-call.mp3");
    expect(result.traversalStatus).toBe(404);
  });
});
