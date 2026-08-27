// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { pathToFileURL } = require("url");
const { discoverCharacters } = require("../scripts/generate-character-manifest");

const root = path.join(__dirname, "..");
const baseUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(root, "index.html")).toString();
const gameUrl = `${baseUrl}${baseUrl.includes("?") ? "&" : "?"}dev=editor`;

test("discovers a convention-only fixture and exposes it to the editor without an application registry", async ({ page }) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "atlas-character-discovery-"));
  const id = "hovering-test-guide";
  try {
    const base = path.join(fixtureRoot, id);
    for (const folder of ["idle", "idle_animation_1", "idle_animation_2", "idle_to_pass"]) {
      fs.mkdirSync(path.join(base, folder), { recursive: true });
    }
    fs.writeFileSync(path.join(base, "portrait.png"), "fixture");
    fs.writeFileSync(path.join(base, "idle", "frame_010.png"), "fixture");
    fs.writeFileSync(path.join(base, "idle", "frame_002.png"), "fixture");
    fs.writeFileSync(path.join(base, "idle", "frame_001.png"), "fixture");
    const [discovered] = discoverCharacters(fixtureRoot);
    expect(discovered.id).toBe(id);
    expect(discovered.animations.idle.map((frame) => path.basename(frame.split("?")[0]))).toEqual(["frame_001.png", "frame_002.png", "frame_010.png"]);

    await page.goto(gameUrl);
    await page.evaluate(async ({ fixture }) => {
      await window.eval("selectLevel")("LVL-0001", { startImmediately: true });
      window.eval("walkPathEditor.apiAvailable = false");
      window.ATLAS_CHARACTER_MANIFEST.characters.push(fixture);
      window.eval("walkPathEditor.selectedChallengeId = 'wind'");
      window.eval("walkPathEditor.editorMode = 'challenges'");
      window.eval("debugOverlayEnabled = true");
      window.eval("render")();
    }, { fixture: discovered });
    await expect(page.locator("[data-npc-character='wind'] option")).toContainText(["Eivar", "Freya", "Hovering Test Guide"]);

    const applicationSource = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
    expect(applicationSource).not.toMatch(/\[(?:\s*["']freya["']\s*,\s*["']eivar["']|\s*["']eivar["']\s*,\s*["']freya["'])\s*\]/i);
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
});

test("discovers zero through many idle variants and versions replaced artwork at the same filename", async ({ page }) => {
  const fixtureRoot = fs.mkdtempSync(path.join(os.tmpdir(), "atlas-character-variants-"));
  try {
    const definitions = [
      ["variant-zero", []],
      ["variant-one", [1]],
      ["variant-two", [1, 2]],
      ["variant-many", [1, 2, 3, 10]]
    ];
    for (const [id, variants] of definitions) {
      const base = path.join(fixtureRoot, id);
      for (const folder of ["idle", "idle_to_pass", ...variants.map((index) => `idle_animation_${index}`)]) {
        fs.mkdirSync(path.join(base, folder), { recursive: true });
        fs.writeFileSync(path.join(base, folder, "frame_001.png"), `${id}:${folder}:v1`);
      }
      fs.writeFileSync(path.join(base, "portrait.png"), `${id}:portrait`);
    }

    const first = discoverCharacters(fixtureRoot);
    const variantsFor = (id, characters = first) => Object.keys(characters.find((item) => item.id === id).animations)
      .filter((name) => name.startsWith("idle_animation_"));
    expect(variantsFor("variant-zero")).toEqual([]);
    expect(variantsFor("variant-one")).toEqual(["idle_animation_1"]);
    expect(variantsFor("variant-two")).toEqual(["idle_animation_1", "idle_animation_2"]);
    expect(variantsFor("variant-many")).toEqual(["idle_animation_1", "idle_animation_2", "idle_animation_3", "idle_animation_10"]);

    const replacedFile = path.join(fixtureRoot, "variant-many", "idle_to_pass", "frame_001.png");
    const before = first.find((item) => item.id === "variant-many").animations.idle_to_pass[0];
    fs.writeFileSync(replacedFile, "variant-many:idle_to_pass:updated-artwork");
    const second = discoverCharacters(fixtureRoot);
    const after = second.find((item) => item.id === "variant-many").animations.idle_to_pass[0];
    expect(after.split("?")[0]).toBe(before.split("?")[0]);
    expect(after).not.toBe(before);

    await page.goto(gameUrl);
    const runtimeOrder = await page.evaluate(() => window.eval("npcIdleVariantNames")({ animations: {
      idle: ["idle.png"],
      idle_animation_10: ["ten.png"],
      idle_animation_2: ["two.png"],
      idle_animation_1: ["one.png"],
      idle_animation_3: [],
      idle_to_pass: ["pass.png"]
    } }));
    expect(runtimeOrder).toEqual(["idle_animation_1", "idle_animation_2", "idle_animation_10"]);

    const applicationSource = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
    expect(applicationSource).not.toContain('["idle_animation_1", "idle_animation_2"]');
    const workerSource = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
    expect(workerSource).toContain('fetch(event.request, { cache: "no-store" })');
    expect(workerSource).toMatch(/idle\(\?:_animation_\[1-9\]\\d\*/);
  } finally {
    fs.rmSync(fixtureRoot, { recursive: true, force: true });
  }
});
