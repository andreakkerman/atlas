// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(root, "index.html")).toString();
const editorUrl = `${gameUrl}${gameUrl.includes("?") ? "&" : "?"}dev=editor`;

test.beforeEach(async ({ page }) => {
  // Keep NPC fixtures independent of local authoring drafts, including reloads.
  await page.route("**/__dev/levels/*/editor-draft", (route) => route.fulfill({ json: {} }));
});

test.afterEach(async ({ page }) => {
  await page.goto("about:blank");
});

async function start(page, levelId = "LVL-0001", editor = false) {
  await page.goto(editor ? editorUrl : gameUrl);
  await page.evaluate(async (id) => {
    localStorage.clear();
    await window.eval("selectLevel")(id, { startImmediately: true, allowDisabledForEditor: true });
    window.eval("walkPathEditor.apiAvailable = false");
    window.eval("render")();
  }, levelId);
}

test.describe("NPC challenge presentation", () => {
  test("normalizes shared appearance without changing legacy defaults or producing invalid filters", async ({ page }) => {
    await start(page);
    const result = await page.evaluate(() => {
      const api = window.AtlasCharacterAppearance;
      return {
        neutral: api.normalize({}, "npc"),
        legacy: [0.4, 1.6].map((brightness) => api.normalize({ brightness }, "npc").brightness),
        invalid: api.normalize({ brightness: NaN, contrast: Infinity, saturation: "invalid", warmth: -Infinity, tint: undefined }, "npc"),
        extremes: api.normalize({ brightness: 999, contrast: -999, saturation: 999, warmth: -999, tint: 999 }, "npc"),
        filters: ["npc", "sven"].map((kind) => api.filter({ brightness: NaN, tint: Infinity }, kind)),
        existing: window.eval("npcConfigForChallenge")({ npc: { brightness: 1.23 } })
      };
    });
    const neutral = { brightness: 1, contrast: 1, saturation: 1, warmth: 0, tint: 0 };
    expect(result.neutral).toEqual(neutral);
    expect(result.invalid).toEqual(neutral);
    expect(result.legacy).toEqual([0.4, 1.6]);
    expect(result.existing).toMatchObject({ ...neutral, brightness: 1.23 });
    expect(result.extremes).toEqual({ brightness: 1.6, contrast: 0.5, saturation: 2, warmth: -1, tint: 1 });
    expect(result.filters).toEqual(Array(2).fill("brightness(1) contrast(1) saturate(1) sepia(0) hue-rotate(0deg)"));
  });

  for (const fixture of [
    { levelId: "LVL-0001", runeId: "wind", name: "Freya" },
    { levelId: "LVL-0003", runeId: "gateShield", name: "Eivar" }
  ]) test(`shares controls and preserves ${fixture.name} appearance, editor identity and persisted animation states`, async ({ page }) => {
    test.setTimeout(60_000);
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await start(page, fixture.levelId, true);
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Challenges", exact: true }).click();
    await page.locator(`[data-select-challenge='${fixture.runeId}']`).click();
    await page.getByRole("button", { name: "Characters", exact: true }).click();
    const panel = page.locator("[data-developer-tools]");
    const labels = ["Brightness", "Contrast", "Saturation", "Warmth", "Tint"];
    const values = [1.23, 1.25, 0.55, 0.65, -0.45];
    for (const kind of ["sven", "npc"]) {
      const group = page.locator(`[data-character-visuals='${kind}']`);
      await expect(group.locator("label > span")).toHaveText(labels);
      await expect(group.locator("input")).toHaveCount(5);
      await expect(group.getByText("Scale", { exact: true })).toHaveCount(0);
    }
    await expect(page.locator("[data-editor-panel-key='sven-general']")).toContainText("Movement Speed");
    await expect(page.locator(`[data-editor-panel-key='npc-general-${fixture.runeId}']`)).toContainText("Playback speed");
    const baseline = await page.evaluate(() => ({ ...window.eval("levelTuning")() }));
    let draft = {};
    if (process.env.ATLAS_EDITOR_URL) {
      await page.route("**/__dev/levels/*/editor-draft", async (route) => {
        if (route.request().method() === "POST") draft = route.request().postDataJSON();
        await route.fulfill({ json: draft });
      });
      await page.evaluate(() => window.eval("walkPathEditor.apiAvailable = true"));
    }
    await page.evaluate(() => {
      window.characterQaNodes = [...document.querySelectorAll("[data-developer-tools], [data-character-visuals], [data-npc-character-editor], [data-npc-challenge], [data-character-visuals] input")];
    });
    for (let index = 0; index < labels.length; index += 1) {
      for (const kind of ["sven", "npc"]) {
        const input = page.locator(`[data-character-visuals='${kind}']`).getByRole("slider", { name: labels[index], exact: true });
        // WebKit scrolls focused controls asynchronously; measure after that navigation,
        // so this assertion isolates the edit itself rather than moving between groups.
        await input.scrollIntoViewIfNeeded();
        await input.focus();
        await page.evaluate(() => new Promise(requestAnimationFrame));
        const scroll = await panel.evaluate((element) => element.scrollTop);
        await input.fill(String(values[index]));
        await expect(input).toBeFocused();
        expect(await panel.evaluate((element) => element.scrollTop)).toBe(scroll);
        await expect(input.locator("..").locator("output")).toHaveText(values[index].toFixed(2));
      }
    }
    const expected = "brightness(1.23) contrast(1.25) saturate(0.55) sepia(0.091) hue-rotate(-15.9deg)";
    const npc = page.locator(`[data-npc-challenge='${fixture.runeId}']`);
    expect(await npc.evaluate((element) => element.style.getPropertyValue("--npc-appearance"))).toBe(expected);
    expect(await page.locator("[data-actor='sven']").evaluate((element) => element.style.filter)).toBe(expected);
    expect(await page.evaluate(() => window.characterQaNodes.every((node) => node.isConnected))).toBe(true);
    await expect(panel).toHaveAttribute("data-current-editor-mode", "characters");
    expect(await page.evaluate(() => window.eval("walkPathEditor.selectedChallengeId"))).toBe(fixture.runeId);
    // A collapsed sibling remains collapsed while keyboard slider interaction continues.
    await page.locator(`[data-editor-panel-key='npc-general-${fixture.runeId}'] > summary`).click();
    const saturation = page.locator("[data-npc-setting='saturation']");
    await saturation.press("ArrowRight");
    await expect(saturation).toHaveValue("0.6");
    await saturation.press("ArrowLeft");
    await expect(page.locator(`[data-editor-panel-key='npc-general-${fixture.runeId}']`)).not.toHaveAttribute("open", "");
    const appearance = Object.fromEntries(labels.map((label, index) => [label.toLowerCase(), values[index]]));
    expect(await page.evaluate((id) => window.eval("learningChallengeById")(id).npc, fixture.runeId)).toMatchObject(appearance);
    expect(await page.evaluate(() => window.eval("levelTuning")())).toMatchObject({ spriteScale: baseline.spriteScale, movementSpeed: baseline.movementSpeed, animationSpeed: baseline.animationSpeed });

    const states = await page.evaluate(({ levelId, runeId }) => {
      const entry = window.eval("npcAnimationRuntime.entries").get(`${levelId}:${runeId}`);
      const shell = entry.element;
      const result = [];
      const capture = () => result.push({ animation: shell.dataset.npcAnimation, filter: getComputedStyle(shell).filter, connected: shell.isConnected });
      window.eval("setNpcAnimation")(entry, "idle", performance.now(), false);
      window.eval("setNpcFrame")(entry);
      capture();
      for (const name of window.eval("npcIdleVariantNames")(entry.character)) {
        window.eval("setNpcAnimation")(entry, name, performance.now(), true);
        window.eval("setNpcFrame")(entry);
        capture();
      }
      window.eval("setNpcAnimation")(entry, "idle", performance.now(), false);
      window.eval("setNpcFrame")(entry);
      capture();
      window.eval("setNpcAnimation")(entry, "idle_to_pass", performance.now(), true);
      window.eval("setNpcFrame")(entry);
      capture();
      window.eval("setNpcCompleted")(entry);
      capture();
      return result;
    }, fixture);
    expect(states[0].animation).toBe("idle");
    expect(states[1].animation).toMatch(/^idle_animation_/);
    expect(states.at(-2).animation).toBe("idle_to_pass");
    expect(states.at(-1).animation).toBe("completed");
    expect(states.every((state) => state.connected && state.filter === states[0].filter)).toBe(true);
    expect(states[0].filter).toContain(expected);
    if (process.env.ATLAS_EDITOR_URL) {
      await expect.poll(() => draft.learningChallenges?.find((item) => item.id === fixture.runeId)?.npc).toMatchObject(appearance);
      await page.reload();
      await page.evaluate(async (id) => window.eval("selectLevel")(id, { startImmediately: true }), fixture.levelId);
      expect(await page.evaluate((id) => window.eval("learningChallengeById")(id).npc, fixture.runeId)).toMatchObject(appearance);
      expect(await npc.evaluate((element) => element.style.getPropertyValue("--npc-appearance"))).toBe(expected);
    }
    expect(errors).toEqual([]);
  });

  test("keeps Standard defaults and converts both ways without moving or losing content", async ({ page }) => {
    await start(page, "LVL-0001", true);
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Challenges", exact: true }).click();
    await page.locator("[data-select-challenge='zon']").click();
    const original = await page.evaluate(() => {
      const challenge = window.eval("learningChallengeById")("zon");
      const object = window.eval("interactiveObjectById")("zon");
      document.querySelector("[data-developer-tools]").dataset.identityProbe = "preserved";
      return { position: { ...object.center }, questions: JSON.stringify(challenge.questions), type: window.eval("challengePresentationType")(challenge) };
    });
    expect(original.type).toBe("standard");
    await page.evaluate(async () => {
      await window.eval("updateChallengePresentation")("zon", "npc");
    });
    await expect(page.locator("[data-npc-challenge='zon']")).toHaveCount(1);
    await expect(page.locator("[data-developer-tools]")).toHaveAttribute("data-identity-probe", "preserved");
    await expect(page.locator(".runeHotspot:not(.npcChallengeHotspot)[data-rune='zon']")).toHaveCount(0);
    expect(await page.locator("[data-npc-challenge='zon']").evaluate((element) => ({ x: Number(element.dataset.worldCenterX), y: Number(element.dataset.worldCenterY) }))).toEqual(original.position);
    await page.evaluate(async () => window.eval("updateChallengePresentation")("zon", "standard"));
    await expect(page.locator("[data-npc-challenge='zon']")).toHaveCount(0);
    await expect(page.locator("[data-developer-tools]")).toHaveAttribute("data-identity-probe", "preserved");
    await expect(page.locator(".runeHotspot[data-rune='zon']")).toHaveCount(1);
    expect(await page.evaluate(() => JSON.stringify(window.eval("learningChallengeById")("zon").questions))).toBe(original.questions);
  });

  test("preserves editor tab, selection, scroll and live preview during NPC tuning", async ({ page }) => {
    await start(page, "LVL-0001", true);
    await page.keyboard.press("Control+Shift+D");
    await page.getByRole("button", { name: "Challenges", exact: true }).click();
    await page.getByRole("button", { name: "Selecteer opdracht Windrune", exact: true }).click();
    await page.getByRole("button", { name: "Characters", exact: true }).click();
    const panel = page.locator("[data-developer-tools]");
    await panel.evaluate((element) => { element.scrollTop = 420; });
    const before = await panel.evaluate((element) => element.scrollTop);
    const npc = page.locator("[data-npc-challenge='wind']");
    const identity = await npc.evaluate((element) => { element.dataset.regressionIdentity = "kept"; return true; });
    expect(identity).toBe(true);
    await page.locator("[data-npc-setting='brightness']").fill("1.23");
    await expect(page.locator("[data-developer-tools]")).toHaveAttribute("data-current-editor-mode", "characters");
    expect(await page.evaluate(() => window.eval("walkPathEditor.selectedChallengeId"))).toBe("wind");
    expect(Math.abs((await panel.evaluate((element) => element.scrollTop)) - before)).toBeLessThanOrEqual(2);
    await expect(page.locator("[data-npc-challenge='wind'][data-regression-identity='kept']")).toHaveCount(1);
    expect(await npc.evaluate((element) => element.style.getPropertyValue("--npc-brightness"))).toBe("1.23");
    expect(await page.evaluate(() => window.eval("learningChallengeById")("wind").npc.brightness)).toBe(1.23);
    const facing = page.locator("[data-npc-setting='facing']");
    await expect(facing).toHaveValue("native");
    await expect(facing.locator("option")).toHaveText(["Native", "Mirrored"]);
    await facing.selectOption("mirrored");
    expect(await npc.locator("[data-npc-facing-layer]").evaluate((element) => getComputedStyle(element).transform)).toBe("matrix(-1, 0, 0, 1, 0, 0)");
    await facing.selectOption("native");
    expect(await npc.locator("[data-npc-facing-layer]").evaluate((element) => getComputedStyle(element).transform)).toBe("matrix(1, 0, 0, 1, 0, 0)");
  });

  test("uses the existing approach node and opens a Dutch locked NPC dialog", async ({ page }) => {
    await start(page);
    const approach = await page.evaluate(() => {
      const rune = window.eval("runeById")("wind");
      const point = window.eval("getApproachPoint")(rune);
      window.eval(`state.worldX = getApproachPoint(runeById("wind")).x - 12`);
      window.eval(`state.worldY = getApproachPoint(runeById("wind")).y`);
      const routeLast = window.eval("routeTo")(rune).at(-1);
      window.eval("openRuneChallenge")("wind");
      return { x: point.x, y: point.y, routeLast, node: window.eval("interactiveObjectById")("wind").approachNode };
    });
    await expect(page.locator("[data-npc-locked='true']")).toBeVisible();
    await expect(page.locator("[data-npc-challenge='wind'] > span:not([data-npc-facing-layer])")).toHaveCount(0);
    await expect(page.getByText("Rond eerst de andere opdrachten hier af.")).toBeVisible();
    await expect(page.getByText("Freya", { exact: true })).toBeVisible();
    await expect(page.getByRole("img", { name: "Freya" })).toBeVisible();
    await expect(page.locator(".sum, [data-open-answer-form], [data-choice]")).toHaveCount(0);
    expect(approach.routeLast).toMatchObject({ x: approach.x, y: approach.y });
    expect(await page.evaluate(() => window.eval("interactiveObjectById")("wind").approachNode)).toBe(approach.node);
  });

  test("keeps locked NPCs clickable through real approach navigation and opens questions after unlock", async ({ page }) => {
    await start(page, "LVL-0001");
    const freya = page.getByRole("button", { name: "Praat met Freya" });
    await freya.click();
    await expect(page.locator("[data-actor='sven']")).toHaveAttribute("data-animation", /walk/, { timeout: 1500 });
    await expect(page.locator("[data-npc-locked='true']")).toBeVisible({ timeout: 12000 });
    await expect(page.getByRole("img", { name: "Freya" })).toBeVisible();
    await expect(page.getByText("Freya", { exact: true })).toBeVisible();
    await expect(page.getByText("Rond eerst de andere opdrachten hier af.")).toBeVisible();
    await expect(page.locator(".sum, [data-open-answer-form], [data-choice]")).toHaveCount(0);
    const arrival = await page.evaluate(() => ({
      current: { x: window.eval("state.worldX"), y: window.eval("state.worldY") },
      approach: window.eval("getApproachPoint")(window.eval("runeById")("wind"))
    }));
    expect(arrival.current).toMatchObject({ x: arrival.approach.x, y: arrival.approach.y });

    await page.getByRole("button", { name: "Sluiten" }).click();
    await page.evaluate(() => {
      const active = window.eval("activeRunes")();
      window.eval("state").completedRunes = new Set(active.filter((rune) => rune.id !== "wind").map((rune) => rune.id));
      window.eval("render")();
    });
    await page.getByRole("button", { name: "Praat met Freya" }).click();
    await expect(page.getByRole("heading", { name: "Freya", exact: true })).toBeVisible({ timeout: 2000 });
    await expect(page.locator("[data-npc-locked='true']")).toHaveCount(0);
    await expect(page.locator(".sum")).toBeVisible();
    await expect(page.locator("[data-open-answer-form], [data-choice]").first()).toBeVisible();
  });

  test("uses the same zero-distance locked interaction flow for Freya and Eivar", async ({ page }) => {
    for (const fixture of [
      { levelId: "LVL-0001", runeId: "wind", name: "Freya" },
      { levelId: "LVL-0003", runeId: "gateShield", name: "Eivar" }
    ]) {
      await start(page, fixture.levelId);
      await page.evaluate((runeId) => {
        const rune = window.eval("runeById")(runeId);
        const approach = window.eval("getApproachPoint")(rune);
        window.eval("state").worldX = approach.x;
        window.eval("state").worldY = approach.y;
        window.eval("render")();
      }, fixture.runeId);
      await page.getByRole("button", { name: `Praat met ${fixture.name}` }).click();
      await expect(page.locator("[data-npc-locked='true']")).toBeVisible({ timeout: 2000 });
      await expect(page.getByRole("img", { name: fixture.name })).toBeVisible();
      await expect(page.getByText(fixture.name, { exact: true })).toBeVisible();
      await page.getByRole("button", { name: "Sluiten" }).click();
    }
  });

  test("plays production Freya and Eivar idle variants and preserves their schedule through remounts", async ({ page }) => {
    for (const fixture of [
      { levelId: "LVL-0001", runeId: "wind", characterId: "freya", random: 0.999, expectedVariant: "idle_animation_2" },
      { levelId: "LVL-0003", runeId: "gateShield", characterId: "eivar", random: 0, expectedVariant: "idle_animation_1" }
    ]) {
      await start(page, fixture.levelId);
      const before = await page.evaluate(({ levelId, runeId, characterId }) => {
        const runtime = window.eval("npcAnimationRuntime");
        const entry = runtime.entries.get(`${levelId}:${runeId}`);
        const variants = window.eval("npcIdleVariantNames")(entry.character);
        cancelAnimationFrame(runtime.rafId);
        runtime.rafId = 0;
        entry.variantDueAt = performance.now() + 50;
        entry.nextFrameAt = 0;
        window.eval("render")();
        const remounted = runtime.entries.get(`${levelId}:${runeId}`);
        return {
          characterId: remounted.character.id,
          variants,
          dueBefore: entry.variantDueAt,
          dueAfter: remounted.variantDueAt
        };
      }, fixture);
      expect(before.characterId).toBe(fixture.characterId);
      expect(before.variants).toEqual(["idle_animation_1", "idle_animation_2"]);
      expect(before.dueAfter).toBe(before.dueBefore);
      const selected = await page.evaluate(({ levelId, runeId, random }) => {
        const runtime = window.eval("npcAnimationRuntime");
        const entry = runtime.entries.get(`${levelId}:${runeId}`);
        cancelAnimationFrame(runtime.rafId);
        runtime.rafId = 0;
        const originalRandom = Math.random;
        Math.random = () => random;
        entry.variantDueAt = 0;
        entry.nextFrameAt = 0;
        window.eval("npcAnimationStep")(performance.now());
        Math.random = originalRandom;
        return entry.animation;
      }, fixture);
      expect(selected).toBe(fixture.expectedVariant);
      await expect(page.locator(`[data-npc-challenge='${fixture.runeId}']`)).toHaveAttribute("data-npc-animation", fixture.expectedVariant);
      await expect(page.locator(`[data-npc-challenge='${fixture.runeId}']`)).toHaveAttribute("data-npc-animation", "idle", { timeout: 3000 });
      expect(await page.evaluate(({ levelId, runeId }) => {
        const entry = window.eval("npcAnimationRuntime.entries").get(`${levelId}:${runeId}`);
        return Number.isFinite(entry.variantDueAt) && !entry.completed;
      }, fixture)).toBe(true);
    }
  });

  for (const facing of ["native", "mirrored"]) test(`renders ${facing} NPC artwork consistently through idle, variants, pass, completed hold and reload`, async ({ page }) => {
    const scale = facing === "mirrored" ? -1 : 1;
    const transform = `matrix(${scale}, 0, 0, 1, 0, 0)`;
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    const fixtures = [
      { levelId: "LVL-0001", runeId: "wind", variants: ["idle_animation_1"], facing },
      { levelId: "LVL-0003", runeId: "gateShield", variants: ["idle_animation_1", "idle_animation_2"], facing }
    ];

    for (const fixture of fixtures) {
      await start(page, fixture.levelId);
      const beforeReload = await page.evaluate(({ levelId, runeId, variants, facing }) => {
        if (facing === "mirrored") window.eval("updateChallengeNpcSetting")(runeId, "facing", facing);
        else {
          delete window.eval("learningChallengeById")(runeId).npc.facing;
          window.eval("render")();
        }
        const runtime = window.eval("npcAnimationRuntime");
        const entry = runtime.entries.get(`${levelId}:${runeId}`);
        const snapshot = (stateName) => {
          const shell = document.querySelector(`[data-npc-challenge="${runeId}"]`);
          const layer = shell.querySelector("[data-npc-facing-layer]");
          const image = shell.querySelector("[data-npc-sprite]");
          return {
            stateName,
            animation: shell.dataset.npcAnimation,
            facing: shell.dataset.npcFacing,
            facingScale: Number(shell.dataset.npcFacingScale),
            layerTransform: getComputedStyle(layer).transform,
            imageTransform: getComputedStyle(image).transform,
            path: image.dataset.assetPath
          };
        };

        const states = [snapshot("idle")];
        for (const variant of variants) {
          window.eval("setNpcAnimation")(entry, variant, performance.now(), true);
          window.eval("setNpcFrame")(entry);
          states.push(snapshot("variant"));
        }
        window.eval("setNpcAnimation")(entry, "idle_to_pass", performance.now(), true);
        window.eval("setNpcFrame")(entry);
        states.push(snapshot("pass"));
        window.eval("setNpcCompleted")(entry);
        window.eval("state.completedRunes").add(runeId);
        window.eval("saveChallengeProgress")();
        states.push(snapshot("completed"));
        return states;
      }, fixture);

      expect(beforeReload.map((item) => item.animation)).toEqual([
        "idle",
        ...fixture.variants,
        "idle_to_pass",
        "completed"
      ]);
      expect(new Set(beforeReload.map((item) => item.layerTransform)).size).toBe(1);
      expect(beforeReload.every((item) => item.facing === facing && item.facingScale === scale)).toBe(true);
      expect(beforeReload.every((item) => item.layerTransform === transform)).toBe(true);
      expect(beforeReload.every((item) => item.imageTransform === "none")).toBe(true);
      expect(beforeReload.at(-2).path).toContain("idle_to_pass/");
      expect(beforeReload.at(-1).path).toContain("idle_to_pass/");

      await page.reload();
      await page.evaluate(async ({ levelId, runeId, facing }) => {
        await window.eval("selectLevel")(levelId, { startImmediately: true });
        window.eval("walkPathEditor.apiAvailable = false");
        // Reapply the authored instance setting without writing the repository fixture.
        if (facing === "mirrored") window.eval("updateChallengeNpcSetting")(runeId, "facing", facing);
      }, fixture);
      const reloaded = await page.locator(`[data-npc-challenge='${fixture.runeId}']`).evaluate((shell) => {
        const layer = shell.querySelector("[data-npc-facing-layer]");
        const image = shell.querySelector("[data-npc-sprite]");
        return {
          animation: shell.dataset.npcAnimation,
          facing: shell.dataset.npcFacing,
          facingScale: Number(shell.dataset.npcFacingScale),
          layerTransform: getComputedStyle(layer).transform,
          imageTransform: getComputedStyle(image).transform,
          path: image.dataset.assetPath
        };
      });
      expect(reloaded).toMatchObject({
        animation: "completed",
        facing: fixture.facing,
        facingScale: scale,
        layerTransform: beforeReload[0].layerTransform,
        imageTransform: "none"
      });
      expect(reloaded.path).toContain("idle_to_pass/");
    }

    expect(await page.evaluate(() => [undefined, "left", "right", "native"].map((facing) =>
      window.eval("npcFacingScale")({ npc: { facing } })))).toEqual([1, 1, 1, 1]);
    expect(errors).toEqual([]);
  });

  test("schedules generic zero, one, two and four-variant runtimes", async ({ page }) => {
    await start(page, "LVL-0001");
    const results = await page.evaluate(() => {
      const runtime = window.eval("npcAnimationRuntime");
      cancelAnimationFrame(runtime.rafId);
      runtime.rafId = 0;
      return [0, 1, 2, 4].map((count) => {
        const element = document.createElement("button");
        element.innerHTML = '<img data-npc-sprite src="assets/characters/freya/idle/frame_001.png">';
        document.body.append(element);
        const animations = { idle: ["assets/characters/freya/idle/frame_001.png"] };
        for (let index = 1; index <= count; index += 1) animations[`idle_animation_${index}`] = [animations.idle[0], animations.idle[0]];
        const entry = {
          element,
          challenge: { npc: { idleIntervalMinMs: 1000, idleIntervalMaxMs: 1000 } },
          character: { id: `fixture-${count}`, animations },
          animation: "idle",
          frameIndex: 0,
          once: false,
          completed: false,
          completeAfterPass: false,
          returnAfterFrame: false,
          successDueAt: null,
          variantDueAt: 0,
          nextFrameAt: 0
        };
        runtime.entries.set(`fixture:${count}`, entry);
        const originalRandom = Math.random;
        Math.random = () => 0.999;
        window.eval("npcAnimationStep")(1000);
        Math.random = originalRandom;
        const selected = entry.animation;
        window.eval("npcAnimationStep")(1100);
        window.eval("npcAnimationStep")(1200);
        const returned = entry.animation;
        runtime.entries.delete(`fixture:${count}`);
        element.remove();
        return { count, selected, returned };
      });
    });
    expect(results).toEqual([
      { count: 0, selected: "idle", returned: "idle" },
      { count: 1, selected: "idle_animation_1", returned: "idle" },
      { count: 2, selected: "idle_animation_2", returned: "idle" },
      { count: 4, selected: "idle_animation_4", returned: "idle" }
    ]);
  });

  test("unlocks the same NPC, completes through idle beat/pass/completed hold and enables progression", async ({ page }) => {
    await start(page);
    await page.evaluate(() => {
      const current = window.eval("learningChallengeById")("wind");
      // Keep the idle beat observable even when the full browser matrix is
      // competing for CPU; the runtime transition itself is covered below.
      current.npc.successIdleBeatMs = 1500;
      current.npc.playbackRate = 0.5;
      const character = window.ATLAS_CHARACTER_MANIFEST.characters.find((item) => item.id === "freya");
      character.animations.idle_to_pass = character.animations.idle_to_pass.slice(0, 6);
      window.eval("state.completedRunes = new Set(['zon', 'steen'])");
      window.eval("openRuneChallenge")("wind");
      window.eval("state.questionIndex = state.activeQuestions.length - 1");
      window.eval("nextQuestion")();
    });
    await expect(page.locator("[data-npc-challenge='wind']")).toBeVisible();
    await expect(page.locator("[data-npc-challenge='wind']")).toHaveAttribute("data-npc-animation", "idle");
    await expect(page.locator("[data-npc-challenge='wind']")).toHaveAttribute("data-npc-animation", "idle_to_pass", { timeout: 2500 });
    await expect(page.locator("[data-npc-challenge='wind']")).toHaveAttribute("data-npc-animation", "completed", { timeout: 4500 });
    const completedPose = await page.locator("[data-npc-challenge='wind'] [data-npc-sprite]").evaluate((image) => ({
      path: image.dataset.assetPath,
      frame: image.dataset.frame,
      src: image.getAttribute("src")
    }));
    expect(completedPose.path).toContain("idle_to_pass/frame_006.png");
    expect(completedPose.frame).toBe("6");
    await page.waitForTimeout(450);
    expect(await page.locator("[data-npc-challenge='wind'] [data-npc-sprite]").evaluate((image) => ({
      path: image.dataset.assetPath,
      frame: image.dataset.frame,
      src: image.getAttribute("src")
    }))).toEqual(completedPose);
    expect(await page.evaluate(() => window.eval("isLevelExitReady")())).toBe(true);
    expect(await page.evaluate(() => window.eval("state.screen"))).toBe("scene");
  });

  test("supports non-final NPCs, persists completion, does not replay pass, and loops multi-frame base idle", async ({ page }) => {
    await start(page);
    await page.evaluate(async () => {
      const challenge = window.eval("learningChallengeById")("wind");
      challenge.requiresAllOtherChallenges = false;
      challenge.unlocksLevelProgression = false;
      challenge.npc.characterId = "freya";
      challenge.npc.idleIntervalMinMs = 60000;
      challenge.npc.idleIntervalMaxMs = 60000;
      const character = window.ATLAS_CHARACTER_MANIFEST.characters.find((item) => item.id === "freya");
      character.animations.idle = character.animations.idle_animation_1.slice(0, 3);
      window.eval("render")();
    });
    const frames = new Set();
    for (let index = 0; index < 5; index += 1) {
      await page.waitForTimeout(95);
      frames.add(await page.locator("[data-npc-challenge='wind'] [data-npc-sprite]").getAttribute("data-frame"));
    }
    expect(frames.size).toBeGreaterThan(1);
    expect(await page.locator("[data-npc-challenge='wind']").getAttribute("data-npc-animation")).toBe("idle");
    await page.evaluate(() => {
      window.eval("openRuneChallenge")("wind");
      window.eval("state.questionIndex = state.activeQuestions.length - 1");
      window.eval("nextQuestion")();
    });
    expect(await page.evaluate(() => window.eval("isLevelExitReady")())).toBe(false);
    await page.reload();
    await page.evaluate(async () => window.eval("selectLevel")("LVL-0001", { startImmediately: true }));
    expect(await page.evaluate(() => window.eval("state.completedRunes.has('wind')"))).toBe(true);
    await expect(page.locator("[data-npc-challenge='wind']")).toHaveAttribute("data-npc-animation", "completed");
    const reloaded = await page.locator("[data-npc-challenge='wind'] [data-npc-sprite]").evaluate((image) => ({
      path: image.dataset.assetPath,
      frame: image.dataset.frame
    }));
    const terminal = await page.evaluate(() => {
      const entry = window.eval("npcAnimationRuntime.entries").get("LVL-0001:wind");
      return { completed: entry.completed, successDueAt: entry.successDueAt, variantDueAt: entry.variantDueAt };
    });
    expect(reloaded.path).toContain("idle_to_pass/");
    expect(terminal).toEqual({ completed: true, successDueAt: null, variantDueAt: Number.POSITIVE_INFINITY });
    await page.waitForTimeout(350);
    expect(await page.locator("[data-npc-challenge='wind'] [data-npc-sprite]").evaluate((image) => ({ path: image.dataset.assetPath, frame: image.dataset.frame }))).toEqual(reloaded);
  });

  test("schedules an arbitrarily numbered idle variant and returns to base idle", async ({ page }) => {
    await start(page, "LVL-0001");
    const selected = await page.evaluate(() => {
      const character = window.ATLAS_CHARACTER_MANIFEST.characters.find((item) => item.id === "freya");
      character.animations.idle_animation_1 = [];
      character.animations.idle_animation_2 = [];
      character.animations.idle_animation_7 = Array(6).fill(character.animations.idle[0]);
      const runtime = window.eval("npcAnimationRuntime");
      const entry = runtime.entries.get("LVL-0001:wind");
      cancelAnimationFrame(runtime.rafId);
      runtime.rafId = 0;
      entry.variantDueAt = 0;
      entry.nextFrameAt = 0;
      window.eval("npcAnimationStep")(performance.now());
      return entry.animation;
    });
    expect(selected).toBe("idle_animation_7");
    await expect(page.locator("[data-npc-challenge='wind']")).toHaveAttribute("data-npc-animation", "idle_animation_7");
    await expect(page.locator("[data-npc-challenge='wind']")).toHaveAttribute("data-npc-animation", "idle", { timeout: 2500 });
  });

  test("keeps NPC names out of both worlds while retaining them in challenge UI", async ({ page }) => {
    await start(page, "LVL-0001");
    await expect(page.locator("[data-npc-challenge='wind'] > span:not([data-npc-facing-layer])")).toHaveCount(0);
    await expect(page.locator("[data-npc-challenge='wind']")).not.toContainText("Freya");
    await page.evaluate(() => window.eval("openRuneChallenge")("wind"));
    await expect(page.getByText("Freya", { exact: true })).toBeVisible();

    await start(page, "LVL-0003");
    await expect(page.locator("[data-npc-challenge='gateShield'] > span:not([data-npc-facing-layer])")).toHaveCount(0);
    await expect(page.locator("[data-npc-challenge='gateShield']")).not.toContainText("Eivar");
    await page.evaluate(() => window.eval("openRuneChallenge")("gateShield"));
    await expect(page.getByRole("heading", { name: "Eivar", exact: true })).toBeVisible();
  });

  test("orders Freya before the exit and routes to her without visiting the exit stop", async ({ page }) => {
    await start(page, "LVL-0001");
    const route = await page.evaluate(() => {
      const points = window.eval("level.walkPath");
      const freyaIndex = points.findIndex((point) => point.id === "wind-rune-approach");
      const exitIndex = points.findIndex((point) => point.id === "gate-step-upper");
      const start = points.find((point) => point.id === "temple-approach");
      const approach = points[freyaIndex];
      const game = window.eval("state");
      game.worldX = start.x;
      game.worldY = start.y;
      const routed = window.eval("routeTo")(window.eval("runeById")("wind"));
      return { freyaIndex, exitIndex, approach, routed, exitX: points[exitIndex].x };
    });
    expect(route.freyaIndex).toBeLessThan(route.exitIndex);
    expect(Math.max(...route.routed.map((point) => point.x))).toBeLessThan(route.exitX);
    expect(route.routed.at(-1)).toMatchObject({ x: route.approach.x, y: route.approach.y });
  });

  test("places Ambient Animals only in Characters and preserves localized editing state", async ({ page }) => {
    await start(page, "LVL-0001", true);
    await page.keyboard.press("Control+Shift+D");
    const panel = page.locator("[data-developer-tools]");
    await page.getByRole("button", { name: "Characters", exact: true }).click();
    await expect(panel.getByText("Ambient animals", { exact: false })).toBeVisible();
    await expect(panel.locator("[data-editor-panel-key='ambient-animals']")).toHaveCount(1);
    await panel.evaluate((element) => { element.dataset.identityProbe = "ambient-stable"; element.scrollTop = element.scrollHeight; });
    const before = await panel.evaluate((element) => element.scrollTop);
    const scale = panel.locator("[data-animal-scale]").first();
    const animalId = await scale.getAttribute("data-animal-scale");
    await scale.fill("0.31");
    await expect(panel).toHaveAttribute("data-current-editor-mode", "characters");
    await expect(panel).toHaveAttribute("data-identity-probe", "ambient-stable");
    expect(Math.abs((await panel.evaluate((element) => element.scrollTop)) - before)).toBeLessThanOrEqual(2);
    expect(await page.evaluate((id) => window.eval("level.ambientAnimals").find((animal) => animal.id === id).scale, animalId)).toBe(0.31);
    await page.getByRole("button", { name: "Graphics", exact: true }).click();
    await expect(panel.locator("[data-editor-panel-key='ambient-animals']")).toHaveCount(0);
    await expect(panel.locator("[data-editor-panel-key='ambient-flybys']")).toHaveCount(1);
  });

  test("renders decoded natural-size assets on the semantic layer below Sven in Illustrated and Voxel inputs", async ({ page }) => {
    await start(page);
    const result = await page.locator("[data-npc-challenge='wind']").evaluate((npc) => {
      const image = npc.querySelector("img");
      const sven = document.querySelector("[data-actor-shell='sven']");
      return {
        npcZ: Number(getComputedStyle(npc).zIndex),
        svenZ: Number(getComputedStyle(sven).zIndex),
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        objectFit: getComputedStyle(image).objectFit,
        decoded: image.complete && image.naturalWidth > 0,
        order: Boolean(npc.compareDocumentPosition(sven) & Node.DOCUMENT_POSITION_FOLLOWING)
      };
    });
    expect(result).toMatchObject({ decoded: true, objectFit: "contain", order: true });
    expect(result.npcZ).toBeLessThan(result.svenZ);
    expect(result.naturalWidth).toBeGreaterThan(0);
    expect(result.naturalHeight).toBeGreaterThan(0);
  });
});
