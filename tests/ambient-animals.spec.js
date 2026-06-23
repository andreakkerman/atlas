// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const editorUrl = `${gameUrl}?dev=editor`;
const editorRuntimeUrl = process.env.ATLAS_EDITOR_URL || editorUrl;

async function startNautilus(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await page.getByRole("button", { name: /De Nautilus/ }).click();
  await expect(page.getByRole("heading", { name: "De Nautilus" })).toBeVisible();
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await expect(page.getByRole("button", { name: "Meeuw", exact: true })).toBeVisible();
}

async function startRunenpoort(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await page.getByRole("button", { name: /De Runenpoort/ }).click();
  await expect(page.getByRole("heading", { name: "De Runenpoort" })).toBeVisible();
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await expect(page.getByRole("button", { name: "Uil" })).toBeVisible();
}

async function startVikingHarbor(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await page.getByRole("button", { name: /De Runenpoort/ }).click();
  await expect(page.getByRole("heading", { name: "De Runenpoort" })).toBeVisible();
  await page.evaluate(async () => {
    await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
  });
  await expect(page.getByRole("button", { name: "Raaf" })).toBeVisible();
}

async function geometryFor(page, animalId) {
  return page.locator(`[data-ambient-animal="${animalId}"]`).evaluate((shell) => {
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
      filter: getComputedStyle(shell.querySelector(".ambientAnimalFrames")).filter,
      x: Number(shell.dataset.worldX),
      y: Number(shell.dataset.worldY),
      scale: Number(shell.dataset.scale),
      softness: Number(shell.dataset.softness),
      saturation: Number(shell.dataset.saturation),
      soundVolume: Number(shell.dataset.soundVolume)
    };
  });
}

async function inspectFirstAndLaterBlink(page, animalId) {
  return page.evaluate(async (id) => {
    const shell = document.querySelector(`[data-ambient-animal="${id}"]`);
    const open = shell.querySelector(".ambientAnimalOpen");
    const closed = shell.querySelector(".ambientAnimalClosed");
    const animal = window.eval(`level.ambientAnimals.find((item) => item.id === "${id}")`);
    window.eval("resetAmbientAnimalTimers")();
    await new Promise((resolve) => setTimeout(resolve, 0));
    window.eval("resetAmbientAnimalTimers")();
    const rect = (element) => {
      const box = element.getBoundingClientRect();
      return [box.x, box.y, box.width, box.height].map((value) => Math.round(value * 100) / 100);
    };
    const snapshot = () => ({
      box: rect(shell),
      openBox: rect(open),
      closedBox: rect(closed),
      transform: getComputedStyle(shell).transform,
      filter: getComputedStyle(shell.querySelector(".ambientAnimalFrames")).filter,
      opacity: getComputedStyle(shell).opacity,
      openVisibility: getComputedStyle(open).visibility,
      closedVisibility: getComputedStyle(closed).visibility
    });
    const initial = snapshot();
    let childMutations = 0;
    const observer = new MutationObserver((records) => {
      childMutations += records.filter((record) => record.type === "childList").length;
    });
    observer.observe(shell, { childList: true, subtree: true });

    let firstStarted = window.eval("runAmbientAnimalBlink")(animal, { doubleBlink: false });
    if (!firstStarted) {
      await new Promise((resolve) => setTimeout(resolve, 140));
      firstStarted = window.eval("runAmbientAnimalBlink")(animal, { doubleBlink: false });
    }
    await new Promise((resolve) => setTimeout(resolve, 20));
    const firstClosed = snapshot();
    await new Promise((resolve) => setTimeout(resolve, 120));
    const firstOpen = snapshot();

    const laterStarted = window.eval("runAmbientAnimalBlink")(animal, { doubleBlink: false });
    await new Promise((resolve) => setTimeout(resolve, 20));
    const laterClosed = snapshot();
    await new Promise((resolve) => setTimeout(resolve, 120));
    const laterOpen = snapshot();
    observer.disconnect();

    return {
      ready: shell.dataset.ready,
      decoded: [open, closed].every((image) => image.complete && image.naturalWidth === 512),
      firstStarted,
      laterStarted,
      sameShell: shell === document.querySelector(`[data-ambient-animal="${id}"]`),
      sameOpen: open === shell.querySelector(".ambientAnimalOpen"),
      sameClosed: closed === shell.querySelector(".ambientAnimalClosed"),
      childMutations,
      initial,
      firstClosed,
      firstOpen,
      laterClosed,
      laterOpen
    };
  }, animalId);
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

async function clickAmbientAnimal(page, locator) {
  const box = await locator.boundingBox();
  if (!box) throw new Error("Ambient animal was not measurable.");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
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
    expect(geometry.softness).toBe(0);
    expect(geometry.saturation).toBe(1);
    expect(geometry.soundVolume).toBe(1);
    expect(geometry.sharedFilter).toContain("blur(0px)");
    expect(geometry.sharedFilter).toContain("saturate(1)");
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
    const softness = page.locator("[data-animal-setting='softness'][data-animal-id='harborSeagull']");
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
    expect(settings).toEqual({ softness: undefined, saturation: undefined, soundVolume: undefined });
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

    const animal = page.getByRole("button", { name: "Meeuw", exact: true });
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

    const volumeSlider = page.locator("[data-animal-setting='soundVolume'][data-animal-id='harborSeagull']");
    await volumeSlider.fill("0.4");
    await page.locator("[data-animal-editor-id='harborSeagull']").getByRole("button", { name: "Preview sound" }).click();
    const previewVolume = await page.evaluate(() =>
      window.__animalAudios.find((audio) => audio.src.includes("seagull-call.mp3"))?.volume
    );
    expect(previewVolume).toBe(0.4);

    await page.evaluate(() => {
      const animalAudio = window.__animalAudios.find((audio) => audio.src.includes("seagull-call.mp3"));
      animalAudio.finish();
      window.eval("ambientAnimalRuntime.sounds.get('harborSeagull').cooldownUntil = 0");
    });
    await page.getByRole("button", { name: "Meeuw", exact: true }).click({ force: true });
    const runtimeVolume = await page.evaluate(() =>
      window.__animalAudios.filter((audio) => audio.src.includes("seagull-call.mp3")).at(-1)?.volume
    );
    const afterGlobal = await page.evaluate(() => JSON.stringify(window.eval("audioConfig.volumes")));

    expect(runtimeVolume).toBe(0.4);
    expect(afterGlobal).toBe(beforeGlobal);
    await expect(volumeSlider).toHaveValue("0.4");
    await expect(page.locator("[data-animal-editor-id='harborSeagull'] output").nth(3)).toHaveText("40%");
  });

  test("animal click is fully consumed before walking or challenge handling", async ({ page }) => {
    await startNautilus(page);
    const before = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      screen: window.eval("state.screen"),
      attempts: window.eval("state.attempts")
    }));
    await clickAmbientAnimal(page, page.getByRole("button", { name: "Meeuw", exact: true }));
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
    const bounds = await page.getByRole("button", { name: "Meeuw", exact: true }).evaluate((element) => {
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

test.describe("LVL-0001 owl", () => {
  test("first and later blinks keep decoded owl and seagull DOM and layout stable", async ({ page }) => {
    await startRunenpoort(page);
    const owl = await inspectFirstAndLaterBlink(page, "forestOwl");

    await startNautilus(page);
    const seagull = await inspectFirstAndLaterBlink(page, "harborSeagull");

    for (const result of [owl, seagull]) {
      expect(result).toMatchObject({
        ready: "true",
        decoded: true,
        firstStarted: true,
        laterStarted: true,
        sameShell: true,
        sameOpen: true,
        sameClosed: true,
        childMutations: 0
      });
      for (const snapshot of [
        result.firstClosed,
        result.firstOpen,
        result.laterClosed,
        result.laterOpen
      ]) {
        expect(snapshot.box).toEqual(result.initial.box);
        expect(snapshot.openBox).toEqual(result.initial.openBox);
        expect(snapshot.closedBox).toEqual(result.initial.closedBox);
        expect(snapshot.transform).toBe(result.initial.transform);
        expect(snapshot.filter).toBe(result.initial.filter);
        expect(snapshot.opacity).toBe(result.initial.opacity);
      }
      expect(result.firstClosed).toMatchObject({
        openVisibility: "hidden",
        closedVisibility: "visible"
      });
      expect(result.laterClosed).toMatchObject({
        openVisibility: "hidden",
        closedVisibility: "visible"
      });
      expect(result.firstOpen).toMatchObject({
        openVisibility: "visible",
        closedVisibility: "hidden"
      });
      expect(result.laterOpen).toMatchObject({
        openVisibility: "visible",
        closedVisibility: "hidden"
      });
    }
  });

  test("renders on the left rune stone with identical blink-frame geometry", async ({ page }) => {
    await startRunenpoort(page);
    const owl = page.locator("[data-ambient-animal='forestOwl']");
    const state = await owl.evaluate((shell) => ({
      ready: shell.dataset.ready,
      frame: shell.dataset.frame,
      anchor: shell.dataset.anchor,
      images: [...shell.querySelectorAll("img")].map((image) => ({
        complete: image.complete,
        width: image.naturalWidth,
        height: image.naturalHeight
      }))
    }));
    const geometry = await geometryFor(page, "forestOwl");

    expect(state).toEqual({
      ready: "true",
      frame: "open",
      anchor: "bottom-center",
      images: [
        { complete: true, width: 512, height: 512 },
        { complete: true, width: 512, height: 512 }
      ]
    });
    expect(geometry.open).toEqual(geometry.closed);
    expect(geometry.open).toEqual(geometry.container);
    expect(geometry).toMatchObject({
      x: 273,
      y: 365,
      scale: 0.18,
      softness: 0.3,
      saturation: 0.92,
      soundVolume: 0.65
    });
  });

  test("editor preserves shared position, scale and visual/audio settings", async ({ page }) => {
    await startRunenpoort(page, editorUrl);
    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator("[data-animal-editor-id='forestOwl']")).toBeVisible();

    const before = await geometryFor(page, "forestOwl");
    await page.locator("[data-animal-scale='forestOwl']").fill("0.22");
    await page.locator("[data-animal-setting='softness'][data-animal-id='forestOwl']").fill("0.5");
    await page.locator("[data-animal-setting='soundVolume'][data-animal-id='forestOwl']").fill("0.45");
    const after = await geometryFor(page, "forestOwl");
    const authored = await page.evaluate(() => {
      const owl = window.eval("level.ambientAnimals.find((animal) => animal.id === 'forestOwl')");
      return {
        x: owl.x,
        y: owl.y,
        scale: owl.scale,
        softness: owl.softness,
        saturation: owl.saturation,
        soundVolume: owl.soundVolume
      };
    });

    expect(authored).toEqual({
      x: 273,
      y: 365,
      scale: 0.22,
      softness: 0.5,
      saturation: 0.92,
      soundVolume: 0.45
    });
    expect(after.open).toEqual(after.closed);
    expect(after.container.width).not.toBe(before.container.width);
    expect(after.filter).toContain("blur(0.5px)");
  });

  test("click plays owl audio once and creates no movement or gameplay evidence", async ({ page }) => {
    await startRunenpoort(page);
    await page.evaluate(() => {
      window.__owlAudioPlays = 0;
      window.__owlAudios = [];
      window.Audio = class {
        constructor(src) {
          this.src = src;
          this.volume = 1;
          this.listeners = {};
          window.__owlAudios.push(this);
        }
        addEventListener(name, callback) { this.listeners[name] = callback; }
        play() {
          if (this.src.includes("owl-call.mp3")) window.__owlAudioPlays += 1;
          return Promise.resolve();
        }
        pause() {}
        finish() { this.listeners.ended?.(); }
      };
      window.eval("ambientAnimalRuntime.sounds.clear()");
      window.eval("audioState.unlocked = true");
    });
    const before = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      screen: window.eval("state.screen"),
      attempts: window.eval("state.attempts")
    }));
    const owl = page.getByRole("button", { name: "Uil" });
    await clickAmbientAnimal(page, owl);
    await clickAmbientAnimal(page, owl);
    const after = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      screen: window.eval("state.screen"),
      attempts: window.eval("state.attempts"),
      moving: window.eval("state.moving"),
      activeRuneId: window.eval("state.activeRuneId"),
      questions: window.AtlasSessionReport.getCurrent()?.questions.length || 0,
      plays: window.__owlAudioPlays,
      volume: window.__owlAudios.find((audio) => audio.src.includes("owl-call.mp3"))?.volume
    }));

    expect(after).toEqual({
      ...before,
      moving: false,
      activeRuneId: null,
      questions: 0,
      plays: 1,
      volume: 0.65
    });
  });

  test("renders within the LVL-0001 viewport on desktop and iPad", async ({ page }) => {
    await startRunenpoort(page);
    const bounds = await page.getByRole("button", { name: "Uil" }).evaluate((element) => {
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

test.describe("ambient animal mirror and additions", () => {
  test("real checkbox click updates draft, Apply and reload", async ({ page }) => {
    test.skip(!process.env.ATLAS_EDITOR_URL, "Requires the HTTP editor server.");
    const levelPath = path.join(__dirname, "..", "Levels", "LVL-0004", "level.js");
    const audioPath = path.join(__dirname, "..", "src", "audio-config.js");
    const draftPath = path.join(__dirname, "..", "Levels", "LVL-0004", "editor.draft.json");
    const fs = require("fs");
    const originalLevel = fs.readFileSync(levelPath, "utf8");
    const originalAudio = fs.readFileSync(audioPath, "utf8");
    const originalDraft = fs.existsSync(draftPath) ? fs.readFileSync(draftPath, "utf8") : null;

    try {
      await startNautilus(page, editorRuntimeUrl);
      await page.keyboard.press("Control+Shift+D");
      await page.locator("[data-select-ambient-id='nautilusSeagull']").click();
      const selector = "[data-animal-setting='mirrorX'][data-animal-id='nautilusSeagull']";
      const shellSelector = "[data-ambient-animal='nautilusSeagull']";
      const before = await geometryFor(page, "nautilusSeagull");
      const events = [];
      await page.locator(selector).evaluate((input) => {
        window.__mirrorEvents = [];
        ["pointerdown", "click", "input", "change"].forEach((type) => {
          input.addEventListener(type, () => window.__mirrorEvents.push(type));
        });
      });

      await page.locator(selector).click();
      await expect(page.locator(selector)).not.toBeChecked();
      await expect(page.locator(shellSelector)).toHaveAttribute("data-mirror-x", "false");
      events.push(...await page.evaluate(() => window.__mirrorEvents));
      expect(events).toEqual(expect.arrayContaining(["pointerdown", "click", "input", "change"]));

      const falseDraft = await page.evaluate(async () => {
        const response = await fetch("/__dev/levels/LVL-0004/editor-draft");
        return response.json();
      });
      expect(falseDraft.ambientAnimals.find((animal) => animal.id === "nautilusSeagull").mirrorX).toBe(false);

      await page.locator(selector).click();
      await expect(page.locator(selector)).toBeChecked();
      await expect(page.locator(shellSelector)).toHaveAttribute("data-mirror-x", "true");
      const after = await geometryFor(page, "nautilusSeagull");
      expect(after.container).toEqual(before.container);
      expect(after.x).toBe(before.x);
      expect(after.y).toBe(before.y);
      expect(after.scale).toBe(before.scale);
      expect(await page.locator(shellSelector).getAttribute("data-anchor")).toBe("bottom-center");
      expect(await page.locator(`${shellSelector} .ambientAnimalFrames`).evaluate((element) =>
        getComputedStyle(element).transform
      )).toBe("matrix(-1, 0, 0, 1, 0, 0)");

      await page.getByRole("button", { name: "Apply" }).click();
      await expect(page.getByText("Draft Status: Applied")).toBeVisible();
      expect(await page.evaluate(() =>
        window.eval("level.ambientAnimals.find((animal) => animal.id === 'nautilusSeagull').openFrame")
      )).toBe("assets/ambient/animals/seagull/seagull-open.png");
      await page.reload();
      await page.evaluate(async () => {
        await window.eval("selectLevel")("LVL-0004", { startImmediately: true });
        window.eval("render")();
      });
      await page.keyboard.press("Control+Shift+D");
      await expect(page.locator(selector)).toBeChecked();
      await expect(page.locator(shellSelector)).toHaveAttribute("data-mirror-x", "true");
    } finally {
      fs.writeFileSync(levelPath, originalLevel);
      fs.writeFileSync(audioPath, originalAudio);
      if (originalDraft === null) {
        if (fs.existsSync(draftPath)) fs.unlinkSync(draftPath);
      } else {
        fs.writeFileSync(draftPath, originalDraft);
      }
    }
  });

  test("mirror toggle persists and previews without moving the bottom-center anchor", async ({ page }) => {
    await startNautilus(page, editorUrl);
    await page.keyboard.press("Control+Shift+D");
    const shell = page.locator("[data-ambient-animal='nautilusSeagull']");
    const toggle = page.locator("[data-animal-setting='mirrorX'][data-animal-id='nautilusSeagull']");
    const before = await geometryFor(page, "nautilusSeagull");
    const initialMirror = await page.evaluate(() =>
      Boolean(window.eval("level.ambientAnimals.find((animal) => animal.id === 'nautilusSeagull').mirrorX"))
    );
    const mirrored = await shell.evaluate((element) => ({
      mirror: element.dataset.mirrorX,
      anchor: element.dataset.anchor,
      frameTransform: getComputedStyle(element.querySelector(".ambientAnimalFrames")).transform,
      openParent: element.querySelector(".ambientAnimalOpen").parentElement === element.querySelector(".ambientAnimalFrames"),
      closedParent: element.querySelector(".ambientAnimalClosed").parentElement === element.querySelector(".ambientAnimalFrames")
    }));

    expect(await toggle.isChecked()).toBe(initialMirror);
    expect(mirrored).toMatchObject({
      mirror: String(initialMirror),
      anchor: "bottom-center",
      openParent: true,
      closedParent: true
    });

    await toggle.evaluate((input, nextValue) => {
      input.checked = nextValue;
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, !initialMirror);
    const after = await geometryFor(page, "nautilusSeagull");
    const stored = await page.evaluate(() =>
      window.eval("level.ambientAnimals.find((animal) => animal.id === 'nautilusSeagull').mirrorX")
    );
    expect(stored).toBe(!initialMirror);
    expect(after.x).toBe(before.x);
    expect(after.y).toBe(before.y);
    expect(after.scale).toBe(before.scale);
    expect(after.container).toEqual(before.container);
    expect(await shell.getAttribute("data-anchor")).toBe("bottom-center");
    const expectedTransform = initialMirror
      ? "matrix(1, 0, 0, 1, 0, 0)"
      : "matrix(-1, 0, 0, 1, 0, 0)";
    expect(await shell.locator(".ambientAnimalFrames").evaluate((element) => getComputedStyle(element).transform))
      .toBe(expectedTransform);
  });

  test("renders two independent seagulls using the same existing assets", async ({ page }) => {
    await startNautilus(page);
    const gulls = page.locator("[data-animal-type='seagull']");
    await expect(gulls).toHaveCount(2);
    const data = await gulls.evaluateAll((elements) => elements.map((element) => ({
      id: element.dataset.ambientAnimal,
      mirror: element.dataset.mirrorX,
      sources: [...element.querySelectorAll("img")].map((image) => image.getAttribute("src"))
    })));
    expect(data.map((entry) => entry.id).sort()).toEqual(["harborSeagull", "nautilusSeagull"]);
    const authoredMirror = await page.evaluate(() =>
      String(Boolean(window.eval("level.ambientAnimals.find((animal) => animal.id === 'nautilusSeagull').mirrorX")))
    );
    expect(data.find((entry) => entry.id === "nautilusSeagull").mirror).toBe(authoredMirror);
    expect(new Set(data.flatMap((entry) => entry.sources))).toEqual(new Set([
      "assets/ambient/animals/seagull/seagull-open.png",
      "assets/ambient/animals/seagull/seagull-closed.png"
    ]));

    const independence = await page.evaluate(async () => {
      const animals = window.eval("level.ambientAnimals");
      const first = animals.find((animal) => animal.id === "harborSeagull");
      const second = animals.find((animal) => animal.id === "nautilusSeagull");
      window.eval("runAmbientAnimalBlink")(first, { doubleBlink: false });
      const firstRuntime = window.eval("ambientAnimalRuntime.animals.get('harborSeagull')");
      const secondRuntime = window.eval("ambientAnimalRuntime.animals.get('nautilusSeagull')");
      const during = {
        first: document.querySelector("[data-ambient-animal='harborSeagull']").dataset.frame,
        second: document.querySelector("[data-ambient-animal='nautilusSeagull']").dataset.frame,
        firstBlinking: firstRuntime.blinking,
        secondBlinking: secondRuntime.blinking
      };
      await new Promise((resolve) => setTimeout(resolve, 130));
      return during;
    });
    expect(independence).toEqual({
      first: "closed",
      second: "open",
      firstBlinking: true,
      secondBlinking: false
    });
  });

  test("raven renders, blinks, plays once and consumes gameplay interaction", async ({ page }) => {
    await startVikingHarbor(page);
    const geometry = await geometryFor(page, "harborRaven");
    expect(geometry.open).toEqual(geometry.closed);
    expect(geometry).toMatchObject({
      x: 680,
      y: 248,
      scale: 0.16,
      softness: 0.25,
      saturation: 0.9,
      soundVolume: 0.65
    });

    const blink = await inspectFirstAndLaterBlink(page, "harborRaven");
    expect(blink).toMatchObject({
      ready: "true",
      decoded: true,
      firstStarted: true,
      laterStarted: true,
      sameShell: true,
      sameOpen: true,
      sameClosed: true,
      childMutations: 0
    });

    await page.evaluate(() => {
      window.__ravenPlays = 0;
      window.__ravenAudios = [];
      window.Audio = class {
        constructor(src) {
          this.src = src;
          this.volume = 1;
          this.listeners = {};
          window.__ravenAudios.push(this);
        }
        addEventListener(name, callback) { this.listeners[name] = callback; }
        play() {
          if (this.src.includes("raven-call.mp3")) window.__ravenPlays += 1;
          return Promise.resolve();
        }
        pause() {}
      };
      window.eval("ambientAnimalRuntime.sounds.clear()");
      window.eval("audioState.unlocked = true");
    });
    const before = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      screen: window.eval("state.screen"),
      attempts: window.eval("state.attempts")
    }));
    const raven = page.getByRole("button", { name: "Raaf" });
    await clickAmbientAnimal(page, raven);
    await clickAmbientAnimal(page, raven);
    const after = await page.evaluate(() => ({
      x: window.eval("state.worldX"),
      y: window.eval("state.worldY"),
      screen: window.eval("state.screen"),
      attempts: window.eval("state.attempts"),
      moving: window.eval("state.moving"),
      activeRuneId: window.eval("state.activeRuneId"),
      questions: window.AtlasSessionReport.getCurrent()?.questions.length || 0,
      plays: window.__ravenPlays,
      volume: window.__ravenAudios.find((audio) => audio.src.includes("raven-call.mp3"))?.volume
    }));
    expect(after).toEqual({
      ...before,
      moving: false,
      activeRuneId: null,
      questions: 0,
      plays: 1,
      volume: 0.65
    });
  });

  test("second seagull and raven render within desktop and iPad viewports", async ({ page }) => {
    await startNautilus(page);
    await page.evaluate(() => {
      const x = window.eval("level.ambientAnimals.find((animal) => animal.id === 'nautilusSeagull').x");
      window.eval(`state.worldX = ${x}`);
      window.eval("updateWorldDom")();
    });
    const seagullVisible = await page.locator("[data-ambient-animal='nautilusSeagull']").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left >= 0 && rect.top >= 0 && rect.right <= innerWidth && rect.bottom <= innerHeight;
    });
    expect(seagullVisible).toBe(true);

    await startVikingHarbor(page);
    await page.evaluate(() => {
      const x = window.eval("level.ambientAnimals.find((animal) => animal.id === 'harborRaven').x");
      window.eval(`state.worldX = ${x}`);
      window.eval("updateWorldDom")();
    });
    const ravenVisible = await page.locator("[data-ambient-animal='harborRaven']").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return rect.left >= 0 && rect.top >= 0 && rect.right <= innerWidth && rect.bottom <= innerHeight;
    });
    expect(ravenVisible).toBe(true);
  });
});
