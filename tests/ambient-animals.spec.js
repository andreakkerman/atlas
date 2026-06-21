// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const editorUrl = `${gameUrl}?dev=editor`;

async function startNautilus(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await page.getByRole("button", { name: /De Nautilus/ }).click();
  await expect(page.getByRole("heading", { name: "De Nautilus" })).toBeVisible();
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await expect(page.getByRole("button", { name: "Meeuw" })).toBeVisible();
}

async function animalGeometry(page) {
  return page.locator("[data-ambient-animal='harborSeagull']").evaluate((shell) => {
    const open = shell.querySelector(".ambientAnimalOpen").getBoundingClientRect();
    const closed = shell.querySelector(".ambientAnimalClosed").getBoundingClientRect();
    const container = shell.getBoundingClientRect();
    const pick = (rect) => ({
      x: Math.round(rect.x * 100) / 100,
      y: Math.round(rect.y * 100) / 100,
      width: Math.round(rect.width * 100) / 100,
      height: Math.round(rect.height * 100) / 100
    });
    return {
      container: pick(container),
      open: pick(open),
      closed: pick(closed),
      transform: getComputedStyle(shell).transform,
      anchor: shell.dataset.anchor,
      x: Number(shell.dataset.worldX),
      y: Number(shell.dataset.worldY),
      scale: Number(shell.dataset.scale)
      ,
      softness: Number(shell.dataset.softness),
      saturation: Number(shell.dataset.saturation),
      soundVolume: Number(shell.dataset.soundVolume),
      sharedFilter: getComputedStyle(shell.querySelector(".ambientAnimalFrames")).filter,
      openFilter: getComputedStyle(shell.querySelector(".ambientAnimalOpen")).filter,
      closedFilter: getComputedStyle(shell.querySelector(".ambientAnimalClosed")).filter
    };
  });
}

test.describe("ambient animals", () => {
  test("preloads both frames and renders them in one identical shared transform", async ({ page }) => {
    await startNautilus(page);
    const state = await page.locator("[data-ambient-animal='harborSeagull']").evaluate((shell) => ({
      ready: shell.dataset.ready,
      frame: shell.dataset.frame,
      images: [...shell.querySelectorAll("img")].map((image) => ({
        complete: image.complete,
        width: image.naturalWidth,
        height: image.naturalHeight
      }))
    }));
    const geometry = await animalGeometry(page);

    expect(state).toEqual({
      ready: "true",
      frame: "open",
      images: [
        { complete: true, width: 512, height: 512 },
        { complete: true, width: 512, height: 512 }
      ]
    });
    expect(geometry.open).toEqual(geometry.closed);
    expect(geometry.open).toEqual(geometry.container);
    expect(geometry.anchor).toBe("bottom-center");
    expect(geometry.transform).not.toBe("none");
    expect(geometry.softness).toBe(0.4);
    expect(geometry.saturation).toBe(0.92);
    expect(geometry.soundVolume).toBe(0.65);
    expect(geometry.sharedFilter).toContain("blur(0.4px)");
    expect(geometry.sharedFilter).toContain("saturate(0.92)");
    expect(geometry.openFilter).toBe(geometry.closedFilter);
  });

  test("editor drag, scale and softness update both frames identically in the live preview", async ({ page }) => {
    await startNautilus(page, editorUrl);
    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator("[data-animal-editor-id='harborSeagull']")).toBeVisible();

    const before = await animalGeometry(page);
    const shell = page.locator("[data-ambient-animal='harborSeagull']");
    const box = await shell.boundingBox();
    await page.evaluate(({ clientX, clientY }) => {
      window.eval("walkPathEditor.draggingAnimalId = 'harborSeagull'");
      window.eval("updateDraggedAmbientAnimal")(new PointerEvent("pointermove", { clientX, clientY }));
      window.eval("walkPathEditor.draggingAnimalId = null");
    }, {
      clientX: box.x + box.width / 2 + 60,
      clientY: box.y + box.height / 2 + 24
    });

    const scale = page.locator("[data-animal-scale='harborSeagull']");
    await scale.fill("0.34");
    const softness = page.locator("[data-animal-setting='softness']");
    await softness.fill("0.7");
    const after = await animalGeometry(page);

    expect(after.x).not.toBe(before.x);
    expect(after.y).not.toBe(before.y);
    expect(after.scale).toBe(0.34);
    expect(after.softness).toBe(0.7);
    expect(after.sharedFilter).toContain("blur(0.7px)");
    expect(after.open).toEqual(after.closed);
    expect(after.open).toEqual(after.container);
  });

  test("softness and soundVolume persist in the authored animal schema", async ({ page }) => {
    await startNautilus(page);
    const settings = await page.evaluate(() => {
      const animal = window.eval("level.ambientAnimals[0]");
      return {
        softness: animal.softness,
        saturation: animal.saturation,
        soundVolume: animal.soundVolume
      };
    });
    expect(settings).toEqual({ softness: 0.4, saturation: 0.92, soundVolume: 0.65 });
  });

  test("blink returns open without movement and overlapping sequences are rejected", async ({ page }) => {
    await startNautilus(page);
    const before = await animalGeometry(page);
    const result = await page.evaluate(async () => {
      const animal = window.eval("level.ambientAnimals[0]");
      const first = window.eval("runAmbientAnimalBlink")(animal, { doubleBlink: false });
      const second = window.eval("runAmbientAnimalBlink")(animal, { doubleBlink: false });
      const closed = document.querySelector("[data-ambient-animal]").dataset.frame;
      await new Promise((resolve) => setTimeout(resolve, 150));
      const runtime = window.eval("ambientAnimalRuntime.animals.get('harborSeagull')");
      return {
        first,
        second,
        closed,
        final: document.querySelector("[data-ambient-animal]").dataset.frame,
        sequenceCount: runtime.sequenceCount,
        blinking: runtime.blinking
      };
    });
    const after = await animalGeometry(page);

    expect(result).toEqual({
      first: true,
      second: false,
      closed: "closed",
      final: "open",
      sequenceCount: 1,
      blinking: false
    });
    expect(after.container).toEqual(before.container);
    expect(after.open).toEqual(before.open);
  });

  test("animal audio cannot overlap or restart during cooldown", async ({ page }) => {
    await startNautilus(page);
    await page.evaluate(() => {
      window.__animalAudioPlays = 0;
      window.__animalAudios = [];
      window.Audio = class {
        constructor(src) {
          this.src = src;
          this.volume = 1;
          this.listeners = {};
          window.__animalAudios.push(this);
        }
        addEventListener(name, callback) { this.listeners[name] = callback; }
        play() {
          window.__animalAudioPlays += 1;
          return Promise.resolve();
        }
        pause() {}
        finish() { this.listeners.ended?.(); }
      };
      window.eval("ambientAnimalRuntime.sounds.clear()");
      window.eval("audioState.unlocked = true");
    });

    const animal = page.getByRole("button", { name: "Meeuw" });
    await animal.click();
    await animal.click();
    expect(await page.evaluate(() => window.__animalAudioPlays)).toBe(1);

    await page.evaluate(() => window.__animalAudios[0].finish());
    await animal.click();
    expect(await page.evaluate(() => window.__animalAudioPlays)).toBe(1);
  });

  test("runtime and editor preview sound use the stored selected animal volume without changing global audio", async ({ page }) => {
    await startNautilus(page, editorUrl);
    await page.keyboard.press("Control+Shift+D");
    const beforeGlobal = await page.evaluate(() => JSON.stringify(window.eval("audioConfig.volumes")));
    await page.evaluate(() => {
      window.__animalAudios = [];
      window.Audio = class {
        constructor(src) {
          this.src = src;
          this.volume = 1;
          this.listeners = {};
          window.__animalAudios.push(this);
        }
        addEventListener(name, callback) { this.listeners[name] = callback; }
        play() { return Promise.resolve(); }
        pause() {}
        finish() { this.listeners.ended?.(); }
      };
      window.eval("ambientAnimalRuntime.sounds.clear()");
      window.eval("audioState.unlocked = true");
    });

    const volumeSlider = page.locator("[data-animal-setting='soundVolume']");
    await volumeSlider.fill("0.4");
    await page.getByRole("button", { name: "Preview sound" }).click();
    const previewVolume = await page.evaluate(() =>
      window.__animalAudios.find((audio) => audio.src.includes("meeuw.mp3"))?.volume
    );
    expect(previewVolume).toBe(0.4);

    await page.evaluate(() => {
      const animalAudio = window.__animalAudios.find((audio) => audio.src.includes("meeuw.mp3"));
      animalAudio.finish();
      window.eval("ambientAnimalRuntime.sounds.get('harborSeagull').cooldownUntil = 0");
    });
    await page.getByRole("button", { name: "Meeuw" }).click({ force: true });
    const runtimeVolume = await page.evaluate(() =>
      window.__animalAudios.filter((audio) => audio.src.includes("meeuw.mp3")).at(-1)?.volume
    );
    const afterGlobal = await page.evaluate(() => JSON.stringify(window.eval("audioConfig.volumes")));

    expect(runtimeVolume).toBe(0.4);
    expect(afterGlobal).toBe(beforeGlobal);
    await expect(volumeSlider).toHaveValue("0.4");
    await expect(page.locator("[data-animal-editor-id='harborSeagull'] output").nth(2)).toHaveText("40%");
  });

  test("animal click is fully consumed before walking or challenge handling", async ({ page }) => {
    await startNautilus(page);
    const before = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      screen: window.eval("state.screen"),
      attempts: window.eval("state.attempts")
    }));
    await page.getByRole("button", { name: "Meeuw" }).click();
    await page.waitForTimeout(120);
    const after = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      screen: window.eval("state.screen"),
      moving: window.eval("state.moving"),
      activeRuneId: window.eval("state.activeRuneId"),
      attempts: window.eval("state.attempts"),
      sessionQuestions: window.AtlasSessionReport.getCurrent()?.questions.length || 0
    }));

    expect(after).toEqual({
      ...before,
      moving: false,
      activeRuneId: null,
      sessionQuestions: 0
    });
  });

  test("LVL-0004 animal remains inside the viewport on desktop and iPad", async ({ page }) => {
    await startNautilus(page);
    await page.evaluate(() => {
      const animalX = window.eval("level.ambientAnimals[0].x");
      window.eval(`state.worldX = ${animalX}`);
      window.eval("updateWorldDom")();
    });
    const bounds = await page.getByRole("button", { name: "Meeuw" }).evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left,
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.top).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(bounds.viewportWidth);
    expect(bounds.bottom).toBeLessThanOrEqual(bounds.viewportHeight);
  });
});
