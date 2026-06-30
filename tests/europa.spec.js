// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const devGameUrl = `${gameUrl}?dev=editor`;

async function tap(locator) {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEnabled();
  await locator.click({ force: true });
}

async function waitForImages(page) {
  await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
}

async function startEuropeAdventure(page) {
  await page.goto(gameUrl);
  await page.evaluate(() => localStorage.clear());
  await waitForImages(page);
  await tap(page.getByRole("button", { name: "Start avontuur" }));
  await expect(page.getByRole("button", { name: /De Reis door Europa/ })).toBeVisible();
  await expect(page.getByText("Reis door zeven Europese landen")).toBeVisible();
  await tap(page.locator('[data-menu-tile="LVL-0013"]'));
  await expect(page.getByRole("heading", { name: "Nederland — Het Begin van de Reis" })).toBeVisible();
  await tap(page.getByRole("button", { name: "Start avontuur" }));
  await waitForImages(page);
  await expect(page.getByRole("button", { name: "Windmolen" })).toBeVisible();
}

async function expectAudioState(page, expectedMusic, expectedAmbience) {
  const audioState = await page.evaluate(() => ({
    musicKey: window.eval("audioState.currentMusicKey"),
    ambienceKey: window.eval("audioState.currentAmbienceKey")
  }));
  expect(audioState).toEqual({
    musicKey: expectedMusic,
    ambienceKey: expectedAmbience
  });
}

async function startVisibleRedirectWalk(page, targetId) {
  await page.goto(gameUrl);
  await page.evaluate(async (id) => {
    await window.eval("selectLevel")("LVL-0014", { startImmediately: true });
    const currentLevel = window.eval("level");
    const currentState = window.eval("state");
    const object = currentLevel.interactiveObjects.find((item) => item.id === id);
    const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
    currentState.worldX = approach.x;
    currentState.worldY = approach.y;
    currentState.cameraX = undefined;
    window.eval("render")();
    window.__oldArrivalCount = 0;
    const token = window.eval("replaceMovementIntent")({ type: "test-old-visible-walk" });
    window.eval("walkRoute")(
      [{ x: Math.min(currentLevel.world.width - 1, approach.x + 220), y: approach.y }],
      () => { window.__oldArrivalCount += 1; },
      token
    );
  }, targetId);
  await expect(page.locator("[data-actor='sven']")).toHaveAttribute("data-animation", "walk");
}

async function tapVisibleTarget(page, locator, useTouch) {
  await expect.poll(async () => {
    const box = await locator.boundingBox();
    if (!box) return null;
    const point = {
      x: box.x + box.width / 2,
      y: box.y + box.height / 2
    };
    return page.evaluate(({ x, y }) => {
      const target = document.elementFromPoint(x, y);
      return Boolean(target?.closest("[data-rune], [data-hotspot]"));
    }, point);
  }).toBe(true);

  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  if (useTouch) await page.touchscreen.tap(x, y);
  else await page.mouse.click(x, y);
}

test.describe("De Grote Reis door Europa", () => {
  test.setTimeout(90000);

  test("shows the menu tile, starts in Nederland, authors attention, and blocks the early exit", async ({ page }) => {
    await startEuropeAdventure(page);
    await expectAudioState(page, "europeGrandTour", "europeNederland");

    await page.getByRole("button", { name: "Windmolen" }).dispatchEvent("click");
    await expect(page.locator(".teamMessage")).toHaveText(
      "Die molen zwaait met vier grote armen. Volgens mij telt hij mee."
    );
    await expect(page.getByRole("heading", { name: "Windmolen" })).toBeVisible({ timeout: 30000 });
    await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();

    await startEuropeAdventure(page);
    const exit = page.getByRole("button", { name: "Reispoort", exact: true });
    const actor = page.locator("[data-actor='sven']");
    await expect(exit).toHaveAttribute("data-exit-ready", "false");
    await expect(exit).toHaveAttribute("data-hotspot-cue", "none");
    await expect(page.getByRole("button", { name: "Windmolen" })).toHaveAttribute("data-hotspot-cue", "challenge");
    await expect(page.locator(".runeDone")).toHaveCount(0);
    await exit.dispatchEvent("click");
    await expect(actor).toHaveAttribute("data-animation", "walk");
    await expect(page.getByText("De reispoort wacht nog op 3 reistekens. De poort is geduldig. Ik ook.")).toBeVisible({
      timeout: 30000
    });

    const arrival = await page.evaluate(() => {
      const currentLevel = window.eval("level");
      const currentState = window.eval("state");
      const object = currentLevel.interactiveObjects.find((item) => item.id === "travelGate");
      const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
      return {
        levelId: currentLevel.id,
        actorX: currentState.worldX,
        actorY: currentState.worldY,
        approachX: approach.x,
        approachY: approach.y,
        screen: currentState.screen
      };
    });
    expect(arrival).toMatchObject({ levelId: "LVL-0013", screen: "scene" });
    expect(arrival.actorX).toBeCloseTo(arrival.approachX, 0);
    expect(arrival.actorY).toBeCloseTo(arrival.approachY, 0);
    await expect(page.locator(".exitIrisOverlay")).toHaveCount(0);
  });

  test("continues from Nederland to Engeland through the existing reward transition", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "The scene-chain smoke runs once on desktop.");
    await startEuropeAdventure(page);

    await page.keyboard.press("Control+Shift+L");
    await expect(page.getByText("De reispoort is klaar. Engeland is de volgende halte.")).toBeVisible();
    const readyExit = page.getByRole("button", { name: "Reispoort", exact: true });
    await expect(readyExit).toHaveAttribute("data-exit-ready", "true");
    await expect(readyExit).toHaveAttribute("data-hotspot-cue", "exit-ready");
    await expect(readyExit).toHaveClass(/hotspotExitReady/);
    const exitCueStyle = await readyExit.evaluate((node) => {
      const style = getComputedStyle(node);
      const marker = getComputedStyle(node, "::after");
      return {
        border: style.getPropertyValue("--hotspot-cue-border").trim(),
        shadow: style.getPropertyValue("--hotspot-cue-shadow").trim(),
        markerBorder: marker.borderTopColor,
        pointerEvents: marker.pointerEvents
      };
    });
    expect(exitCueStyle.border).toBe("rgba(139, 245, 190, 0.22)");
    expect(exitCueStyle.shadow).toBe("rgba(92, 214, 151, 0.42)");
    expect(exitCueStyle.markerBorder).toBe("rgba(139, 245, 190, 0.22)");
    expect(exitCueStyle.pointerEvents).toBe("none");

    await page.getByRole("button", { name: "Reispoort", exact: true }).dispatchEvent("click");
    await expect(page.getByRole("heading", { name: "De reis is begonnen!" })).toBeVisible({ timeout: 30000 });
    await expect(page.locator("[data-adventure-team-bar]")).toHaveCount(0);
    await tap(page.getByRole("button", { name: "Naar Engeland" }));

    await expect(page.getByRole("button", { name: "Oude klokkentoren" })).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole("button", { name: "Collegepoort", exact: true })).toHaveAttribute("data-exit-ready", "false");
    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    const levelId = await page.evaluate(() => window.eval("level.id"));
    expect(levelId).toBe("LVL-0014");
    await expectAudioState(page, "europeGrandTour", "europeEngeland");
  });

  test("marks the exit ready when a completed level is loaded from saved progress", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      localStorage.setItem("atlas-europa-nederland-v1", JSON.stringify({
        levelId: "LVL-0013",
        completedAt: "2026-06-30T00:00:00.000Z",
        answered: 12,
        firstTryCorrect: 12,
        attempts: 12
      }));
      await window.eval("selectLevel")("LVL-0013", { startImmediately: true });
      window.eval("render")();
    });

    const exit = page.getByRole("button", { name: "Reispoort", exact: true });
    await expect(exit).toHaveAttribute("data-exit-ready", "true");
    await expect(exit).toHaveAttribute("data-hotspot-cue", "exit-ready");
    await expect(page.locator(".runeDone")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Windmolen" })).toHaveAttribute("data-hotspot-cue", "challenge");
    expect(await page.evaluate(() => window.eval("state.completedRunes.size"))).toBe(0);
  });

  test("adds flavor-only ambient objects and uses one shared challenger", async ({ page }) => {
    await page.goto(gameUrl);
    await waitForImages(page);
    const europe = await page.evaluate(async () => {
      for (const entry of window.SVEN_LEVEL_MANIFEST.levels.filter((item) => {
        const number = Number(item.id.slice(-4));
        return number >= 13 && number <= 20;
      })) {
        if (!window.SVEN_LEVEL_DEFINITIONS[entry.id]) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = entry.script;
            script.onload = resolve;
            script.onerror = reject;
            document.head.append(script);
          });
        }
      }
      return Object.values(window.SVEN_LEVEL_DEFINITIONS)
        .filter((item) => Number(item.id.slice(-4)) >= 13)
        .map((item) => ({
          id: item.id,
          runeCount: item.runes.length,
          ambientIds: item.interactiveObjects.filter((object) => object.type === "ambient").map((object) => object.id),
          challenger: item.challengeCharacter,
          challengeArt: item.challengeArt
        }));
    });

    expect(europe).toHaveLength(8);
    expect(europe.find((item) => item.id === "LVL-0014")).toMatchObject({
      runeCount: 3,
      ambientIds: ["travelCrystal"]
    });
    expect(europe.find((item) => item.id === "LVL-0016")).toMatchObject({
      runeCount: 3,
      ambientIds: ["grapePress"]
    });
    for (const scene of europe) {
      expect(scene.challenger.id).toBe("atlas-de-reiziger");
      expect(scene.challenger.name).toBe("Atlas de Reiziger");
      expect(scene.challenger.portrait).toMatch(/atlas-de-reiziger\.png$/);
      expect(scene.challengeArt).toBe(scene.challenger.portrait);
    }
  });

  test("shows authored first ambient attention without changing England progress", async ({ page }) => {
    await startEuropeAdventure(page);
    await page.keyboard.press("Control+Shift+L");
    await page.getByRole("button", { name: "Reispoort", exact: true }).dispatchEvent("click");
    await expect(page.getByRole("heading", { name: "De reis is begonnen!" })).toBeVisible({ timeout: 30000 });
    await tap(page.getByRole("button", { name: "Naar Engeland" }));
    await expect(page.getByRole("button", { name: "Oude klokkentoren" })).toBeVisible({ timeout: 30000 });

    const before = await page.evaluate(() => window.eval("state.completedRunes.size"));
    await page.getByRole("button", { name: "Reiskristal" }).dispatchEvent("click");
    await expect(page.locator(".teamMessage")).toHaveText(
      "Dat kristal vangt alle kleuren van de stad. Een klein stukje avondlicht in steen.",
      { timeout: 15000 }
    );
    const after = await page.evaluate(() => window.eval("state.completedRunes.size"));
    expect({ before, after }).toEqual({ before: 0, after: 0 });
  });

  test("redirects an active walk to a newly clicked challenge", async ({ page }, testInfo) => {
    await startVisibleRedirectWalk(page, "telescope");
    const actor = page.locator("[data-actor='sven']");

    await tapVisibleTarget(
      page,
      page.getByRole("button", { name: "Koperen telescoop", exact: true }),
      testInfo.project.name.startsWith("ipad-")
    );
    await expect(page.getByRole("heading", { name: "Koperen telescoop", exact: true })).toBeVisible({
      timeout: 30000
    });
    const arrival = await page.evaluate(() => {
      const currentLevel = window.eval("level");
      const currentState = window.eval("state");
      const object = currentLevel.interactiveObjects.find((item) => item.id === "telescope");
      const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
      return {
        actor: { x: currentState.worldX, y: currentState.worldY },
        approach: { x: approach.x, y: approach.y },
        activeRuneId: currentState.activeRuneId,
        oldArrivalCount: window.__oldArrivalCount
      };
    });
    expect(arrival.actor).toEqual(arrival.approach);
    expect(arrival.activeRuneId).toBe("telescope");
    expect(arrival.oldArrivalCount).toBe(0);
  });

  test("redirects an active walk to a newly clicked ambient object", async ({ page }, testInfo) => {
    await startVisibleRedirectWalk(page, "travelCrystal");
    const actor = page.locator("[data-actor='sven']");

    await tapVisibleTarget(
      page,
      page.getByRole("button", { name: "Reiskristal", exact: true }),
      testInfo.project.name.startsWith("ipad-")
    );
    await expect(actor).toHaveAttribute("data-animation", "walk");
    await expect(page.locator(".teamMessage")).not.toHaveText(
      "Dat kristal vangt alle kleuren van de stad. Een klein stukje avondlicht in steen."
    );
    await expect(page.locator(".teamMessage")).toHaveText(
      "Dat kristal vangt alle kleuren van de stad. Een klein stukje avondlicht in steen.",
      { timeout: 15000 }
    );
    await expect.poll(
      () => page.evaluate(() => window.eval("state.moving")),
      { timeout: 15000 }
    ).toBe(false);
    const arrival = await page.evaluate(() => {
      const currentLevel = window.eval("level");
      const currentState = window.eval("state");
      const object = currentLevel.interactiveObjects.find((item) => item.id === "travelCrystal");
      const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
      return {
        actor: { x: currentState.worldX, y: currentState.worldY },
        approach: { x: approach.x, y: approach.y },
        activeRuneId: currentState.activeRuneId,
        oldArrivalCount: window.__oldArrivalCount
      };
    });
    expect(arrival.actor).toEqual(arrival.approach);
    expect(arrival.activeRuneId).toBeNull();
    expect(arrival.oldArrivalCount).toBe(0);
  });

  test("only opens the latest object clicked during movement", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0014", { startImmediately: true });
      window.eval("beginFreeWalk")({ x: 1900, y: 640 });
    });

    await page.getByRole("button", { name: "Oude klokkentoren", exact: true }).dispatchEvent("click");
    await expect(page.locator("[data-actor='sven']")).toHaveAttribute("data-animation", "walk");
    await page.getByRole("button", { name: "Rode brievenbus", exact: true }).dispatchEvent("click");

    await expect(page.getByRole("heading", { name: "Rode brievenbus", exact: true })).toBeVisible({
      timeout: 30000
    });
    await page.waitForTimeout(1200);
    await expect(page.getByRole("heading", { name: "Oude klokkentoren", exact: true })).toHaveCount(0);
    expect(await page.evaluate(() => window.eval("state.activeRuneId"))).toBe("postbox");
  });

  test("replaces an active ground walk with an exit intent and cancels the old callback", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0014", { startImmediately: true });
      window.__oldArrivalCount = 0;
      const token = window.eval("replaceMovementIntent")({ type: "test-old-intent" });
      window.eval("walkRoute")(
        [{ x: 900, y: 640 }, { x: 1200, y: 640 }],
        () => { window.__oldArrivalCount += 1; },
        token
      );
    });
    await expect(page.locator("[data-actor='sven']")).toHaveAttribute("data-animation", "walk");

    await page.getByRole("button", { name: "Collegepoort", exact: true }).dispatchEvent("click");
    await expect(page.locator(".teamMessage")).toContainText(/collegepoort/i, { timeout: 30000 });
    const result = await page.evaluate(() => {
      const currentLevel = window.eval("level");
      const currentState = window.eval("state");
      const object = currentLevel.interactiveObjects.find((item) => item.id === "collegeGate");
      const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
      return {
        actor: { x: currentState.worldX, y: currentState.worldY },
        approach: { x: approach.x, y: approach.y },
        oldArrivalCount: window.__oldArrivalCount,
        intent: currentState.movementIntent
      };
    });
    expect(result.actor).toEqual(result.approach);
    expect(result.oldArrivalCount).toBe(0);
    expect(result.intent).toBeNull();
  });

  test("rapid repeated exit clicks produce one transition", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0014", { startImmediately: true });
      window.eval("completeCurrentSceneChallenges")();
      window.__exitTransitionCalls = 0;
      window.eval(`transitionToReward = async function () {
        window.__exitTransitionCalls += 1;
        state.exitTransitionPending = true;
        render();
      }`);
      window.eval("beginFreeWalk")({ x: 900, y: 640 });
    });
    const exit = page.getByRole("button", { name: "Collegepoort", exact: true });
    await exit.dispatchEvent("click");
    await exit.dispatchEvent("click");
    await exit.dispatchEvent("click");
    await expect.poll(() => page.evaluate(() => window.__exitTransitionCalls), { timeout: 30000 }).toBe(1);
    expect(await page.evaluate(() => window.eval("state.exitTransitionPending"))).toBe(true);
  });

  test("uses authored two-variant question slots across all Europe scenes", async ({ page }) => {
    await page.goto(gameUrl);
    await waitForImages(page);
    const pilot = await page.evaluate(async () => {
      const ids = [
        "LVL-0013", "LVL-0014", "LVL-0015", "LVL-0016",
        "LVL-0017", "LVL-0018", "LVL-0019", "LVL-0020"
      ];
      for (const id of ids) {
        const entry = window.SVEN_LEVEL_MANIFEST.levels.find((item) => item.id === id);
        if (!window.SVEN_LEVEL_DEFINITIONS[id]) {
          await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = entry.script;
            script.onload = resolve;
            script.onerror = reject;
            document.head.append(script);
          });
        }
      }
      return ids.map((id) => {
        const selected = window.SVEN_LEVEL_DEFINITIONS[id];
        return {
          id,
          challenges: selected.learningChallenges,
          runeChallengeIds: selected.runes.map((rune) => rune.challengeId)
        };
      });
    });

    const required = [
      "id", "domain", "schoolBand", "family",
      "presentation", "answerMode", "prompt", "answer", "hintMinnie", "hintMoose", "explanation"
    ];
    const allChallenges = pilot.flatMap((scene) => scene.challenges);
    const allSlots = allChallenges.flatMap((challenge) => challenge.questions);
    const allVariants = allSlots.flatMap((slot) => slot.variants);
    expect(allChallenges).toHaveLength(24);
    expect(allSlots).toHaveLength(96);
    expect(allVariants).toHaveLength(192);
    expect(allVariants.filter((variant) => variant.presentation === "story")).toHaveLength(53);
    expect(allVariants.filter((variant) => variant.presentation === "bare")).toHaveLength(139);
    expect(allVariants.filter((variant) => variant.answerMode === "open")).toHaveLength(76);
    expect(allVariants.filter((variant) => variant.answerMode === "multipleChoice")).toHaveLength(116);

    for (const scene of pilot) {
      expect(scene.challenges).toHaveLength(3);
      expect(scene.runeChallengeIds).toHaveLength(3);
      for (const challenge of scene.challenges) {
        expect(challenge.challengeCharacterId).toBe("atlas-de-reiziger");
        expect(challenge.questions).toHaveLength(4);
        for (const slot of challenge.questions) {
          expect(slot.variants).toHaveLength(2);
          for (const variant of slot.variants) {
            for (const field of required) expect(variant[field], `${scene.id}.${variant.id}.${field}`).toBeDefined();
            expect(variant.domain).toBe("math");
            expect(variant.schoolBand).toBe("E5-intended");
            expect(`${variant.prompt} ${variant.hintMinnie} ${variant.hintMoose} ${variant.explanation}`)
              .not.toMatch(/rune|runenpoort|de rune wil nog een som/i);
            if (variant.answerMode === "multipleChoice") {
              expect(variant.choices).toContain(variant.answer);
              expect(new Set(variant.choices.map((choice) => String(choice).toLocaleLowerCase("nl"))).size)
                .toBe(variant.choices.length);
            }
          }
        }
      }
    }
  });

  test("plays an open multiplication problem through Minnie, Moose, and assisted completion", async ({ page }) => {
    await startEuropeAdventure(page);
    await page.evaluate(() => { Math.random = () => 0; });
    await page.getByRole("button", { name: "Windmolen" }).dispatchEvent("click");

    await expect(page.locator("[data-challenge-character='atlas-de-reiziger']")).toContainText("Atlas de Reiziger");
    await expect(page.getByText("7 × 8 = ?")).toBeVisible();
    await expect(page.locator("[data-open-answer]")).toBeVisible();
    await expect(page.locator("[data-open-answer]")).toHaveAttribute("type", "text");
    await expect(page.locator("[data-open-answer]")).toHaveAttribute("inputmode", "numeric");
    await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();
    await expect(page.locator(".teamMessage")).toHaveText("");
    await expect(page.getByText("De wieken draaien boven de tulpen.")).toHaveCount(0);
    await expect(page.getByText("De rune wil nog een som.")).toHaveCount(0);
    await expect(page.getByText(/Reisproef 1\/4/)).toHaveCount(0);
    await expect(page.getByText("E5-intended")).toHaveCount(0);
    await expect(page.getByText("schoolBand")).toHaveCount(0);
    await expect(page.getByText("domain")).toHaveCount(0);

    const layout = await page.evaluate(() => {
      const panel = document.querySelector(".runeChallengeBox").getBoundingClientRect();
      const bar = document.querySelector("[data-adventure-team-bar]").getBoundingClientRect();
      const portraitTops = [...document.querySelectorAll(".teamPortrait")].map((node) => node.getBoundingClientRect().top);
      return { panelBottom: panel.bottom, companionTop: Math.min(bar.top, ...portraitTops) };
    });
    expect(layout.panelBottom).toBeLessThanOrEqual(layout.companionTop);

    await page.locator("[data-open-answer]").fill("50");
    await tap(page.getByRole("button", { name: "Controleer" }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "minnie");
    await expect(page.locator(".teamMessage")).toHaveText("Denk aan de tafel van 8.");
    await expect(page.locator(".runeChallengeBox").getByText("Denk aan de tafel van 8.")).toHaveCount(0);

    await page.locator("[data-open-answer]").fill("54");
    await tap(page.getByRole("button", { name: "Controleer" }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "moose");
    await expect(page.locator(".teamMessage")).toHaveText("Reken 7 groepjes van 8.");
    await expect(page.locator(".runeChallengeBox").getByText("Reken 7 groepjes van 8.")).toHaveCount(0);

    await page.locator("[data-open-answer]").fill("55");
    await tap(page.getByRole("button", { name: "Controleer" }));
    await expect(page.locator(".runeChallengeBox").getByText("7 × 8 = 56.")).toBeVisible();
    await tap(page.getByRole("button", { name: "Samen afronden" }));
    await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
    await expect(page.getByText(/Het antwoord is 56/)).toBeVisible();
  });

  test("keeps open-answer controls usable in a reduced iPad keyboard viewport", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await startEuropeAdventure(page);
    await page.evaluate(() => { Math.random = () => 0; });
    await page.getByRole("button", { name: "Windmolen" }).dispatchEvent("click");
    await expect(page.locator("[data-open-answer]")).toBeVisible();

    await page.locator("[data-open-answer]").focus();
    await page.evaluate(() => {
      document.documentElement.style.setProperty("--visual-viewport-height", "360px");
      document.documentElement.style.setProperty("--visual-viewport-offset-top", "0px");
      document.body.classList.add("keyboard-open");
      document.querySelector("#app")?.classList.add("keyboard-open");
    });

    const layout = await page.evaluate(() => {
      const panel = document.querySelector(".runeChallengeBox");
      const input = document.querySelector("[data-open-answer]");
      const submit = document.querySelector("[data-open-answer-form] button");
      const panelRect = panel.getBoundingClientRect();
      const inputRect = input.getBoundingClientRect();
      const submitRect = submit.getBoundingClientRect();
      return {
        panelTop: panelRect.top,
        panelBottom: panelRect.bottom,
        inputBottom: inputRect.bottom,
        submitBottom: submitRect.bottom,
        submitWidth: submitRect.width,
        visualHeight: 360,
        panelScrollable: panel.scrollHeight > panel.clientHeight + 1
      };
    });

    expect(layout.panelTop).toBeGreaterThanOrEqual(0);
    expect(layout.panelBottom).toBeLessThanOrEqual(layout.visualHeight);
    expect(layout.inputBottom).toBeLessThanOrEqual(layout.visualHeight);
    expect(layout.submitBottom).toBeLessThanOrEqual(layout.visualHeight);
    expect(layout.submitWidth).toBeGreaterThan(80);
  });

  test("clears hotspot attention when an authored challenge starts", async ({ page }) => {
    await startEuropeAdventure(page);
    await page.getByRole("button", { name: "Kaaswagen" }).dispatchEvent("click");

    await expect(page.getByRole("heading", { name: "Kaaswagen" })).toBeVisible({ timeout: 30000 });
    await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();
    await expect(page.locator(".teamMessage")).toHaveText("");
    await expect(page.getByText("Al die kazen staan in keurige stapels. Daar verstopt zich vast een som.")).toHaveCount(0);
  });

  test("plays a multiple-choice story problem in England", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      Math.random = () => 0;
      await window.eval("selectLevel")("LVL-0014", { startImmediately: true });
      window.eval("render")();
    });
    await page.getByRole("button", { name: "Oude klokkentoren" }).dispatchEvent("click");

    await expect(page.getByText("Hoe laat is het?")).toBeVisible();
    await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();
    await expect(page.locator("[data-open-answer]")).toHaveCount(0);
    await expect(page.locator("[data-choice]")).toHaveCount(4);
    await expect(page.locator("[data-clock-visual]")).toHaveAttribute("data-clock-hour", "7");
    await expect(page.locator("[data-clock-visual]")).toHaveAttribute("data-clock-minute", "30");
    await tap(page.getByRole("button", { name: "Half acht", exact: true }));
    await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
    await expect(page.getByText("Ja! Het antwoord is Half acht.")).toBeVisible();
  });

  test("keeps clock choices reachable above the companion bar in iPad landscape", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      Math.random = () => 0;
      await window.eval("selectLevel")("LVL-0014", { startImmediately: true });
      window.eval("render")();
    });
    await page.getByRole("button", { name: "Oude klokkentoren" }).dispatchEvent("click");
    await expect(page.locator("[data-clock-visual]")).toBeVisible();
    await expect(page.locator("[data-choice]")).toHaveCount(4);

    const initialLayout = await page.evaluate(() => {
      const panel = document.querySelector(".runeChallengeBox");
      const bar = document.querySelector("[data-adventure-team-bar]").getBoundingClientRect();
      const portraitTops = [...document.querySelectorAll(".teamPortrait")].map((node) => node.getBoundingClientRect().top);
      const panelRect = panel.getBoundingClientRect();
      return {
        panelBottom: panelRect.bottom,
        companionTop: Math.min(bar.top, ...portraitTops),
        panelClientHeight: panel.clientHeight,
        panelScrollHeight: panel.scrollHeight,
        viewportHeight: window.innerHeight
      };
    });

    expect(initialLayout.panelBottom).toBeLessThanOrEqual(initialLayout.companionTop);
    expect(initialLayout.panelBottom).toBeLessThanOrEqual(initialLayout.viewportHeight);

    const scrolledLayout = await page.evaluate(() => {
      const panel = document.querySelector(".runeChallengeBox");
      panel.scrollTop = panel.scrollHeight;
      const panelRect = panel.getBoundingClientRect();
      const buttons = [...document.querySelectorAll("[data-choice]")].map((node) => node.getBoundingClientRect());
      const lastButton = buttons[buttons.length - 1];
      return {
        lastButtonBottom: lastButton.bottom,
        panelBottom: panelRect.bottom,
        lastButtonHeight: lastButton.height
      };
    });

    expect(scrolledLayout.lastButtonHeight).toBeGreaterThanOrEqual(44);
    expect(scrolledLayout.lastButtonBottom).toBeLessThanOrEqual(scrolledLayout.panelBottom + 1);
  });

  test("matches authored text answers without case sensitivity", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      Math.random = () => 0;
      await window.eval("selectLevel")("LVL-0014", { startImmediately: true });
      window.eval("render")();
    });
    await page.getByRole("button", { name: "Oude klokkentoren" }).dispatchEvent("click");
    await expect(page.getByRole("button", { name: "Half acht", exact: true })).toBeVisible({ timeout: 30000 });
    await page.evaluate(() => window.eval("answerQuestion")("half acht"));
    await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
  });

  test("renders the five authored clock-reading challenges correctly", async ({ page }) => {
    await page.goto(gameUrl);
    const cases = [
      {
        levelId: "LVL-0013",
        objectName: "Grachtenklok",
        hour: 4,
        minute: 15,
        hourAngle: 127.5,
        minuteAngle: 90,
        answer: "Kwart over vier",
        family: "clock_reading_quarter"
      },
      {
        levelId: "LVL-0014",
        objectName: "Oude klokkentoren",
        hour: 7,
        minute: 30,
        hourAngle: 225,
        minuteAngle: 180,
        answer: "Half acht",
        family: "clock_reading_half_hour"
      },
      {
        levelId: "LVL-0015",
        objectName: "Dorpsklok",
        hour: 3,
        minute: 10,
        hourAngle: 95,
        minuteAngle: 60,
        answer: "Tien over drie",
        family: "clock_reading_five_minutes"
      },
      {
        levelId: "LVL-0017",
        objectName: "Alpenklokhuis",
        hour: 3,
        minute: 0,
        hourAngle: 90,
        minuteAngle: 0,
        answer: "Drie uur",
        family: "clock_reading_five_minutes"
      },
      {
        levelId: "LVL-0019",
        objectName: "Havenklok",
        hour: 9,
        minute: 10,
        hourAngle: 275,
        minuteAngle: 60,
        answer: "Tien over negen",
        family: "clock_reading_five_minutes"
      }
    ];

    for (const item of cases) {
      await page.evaluate(async (levelId) => {
        Math.random = () => 0;
        await window.eval("selectLevel")(levelId, { startImmediately: true });
        window.eval("render")();
      }, item.levelId);
      await page.getByRole("button", { name: item.objectName, exact: true }).dispatchEvent("click");
      await expect(page.getByText("Hoe laat is het?")).toBeVisible({ timeout: 30000 });

      const clock = page.locator("[data-clock-visual]");
      await expect(clock).toHaveAttribute("data-clock-hour", String(item.hour));
      await expect(clock).toHaveAttribute("data-clock-minute", String(item.minute));
      await expect(page.getByRole("button", { name: item.answer, exact: true })).toBeVisible();
      await expect(page.locator("[data-open-answer]")).toHaveCount(0);
      await expect(page.getByText(item.family)).toHaveCount(0);
      await expect(page.getByText("E5-intended")).toHaveCount(0);

      const geometry = await clock.evaluate((node) => {
        const numerals = [...node.querySelectorAll(".clockNumerals text")].map((text) => text.textContent);
        const rect = node.getBoundingClientRect();
        return {
          numerals,
          lineCount: node.querySelectorAll("line").length,
          hourAngle: Number(node.dataset.hourAngle),
          minuteAngle: Number(node.dataset.minuteAngle),
          width: rect.width,
          minuteTransform: node.querySelector(".clockMinuteHand").getAttribute("transform"),
          hourTransform: node.querySelector(".clockHourHand").getAttribute("transform")
        };
      });
      expect(geometry.numerals).toEqual(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]);
      expect(geometry.lineCount).toBe(2);
      expect(geometry.hourAngle).toBeCloseTo(item.hourAngle, 4);
      expect(geometry.minuteAngle).toBeCloseTo(item.minuteAngle, 4);
      expect(geometry.width).toBeGreaterThanOrEqual(190);
      expect(Number(geometry.minuteTransform.match(/rotate\(([-\d.]+)/)?.[1])).toBeCloseTo(item.minuteAngle, 4);
      expect(Number(geometry.hourTransform.match(/rotate\(([-\d.]+)/)?.[1])).toBeCloseTo(item.hourAngle, 4);
    }
  });

  test("uses authored clock hints in the companion bar", async ({ page }) => {
    await startEuropeAdventure(page);
    await page.evaluate(async () => {
      Math.random = () => 0;
      await window.eval("selectLevel")("LVL-0013", { startImmediately: true });
      window.eval("render")();
    });
    await page.getByRole("button", { name: "Grachtenklok", exact: true }).dispatchEvent("click");
    await expect(page.getByText("Hoe laat is het?")).toBeVisible({ timeout: 30000 });

    await tap(page.getByRole("button", { name: "Vier uur", exact: true }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "minnie");
    await expect(page.locator(".teamMessage")).toHaveText("Kijk eerst naar de grote wijzer.");

    await tap(page.getByRole("button", { name: "Half vijf", exact: true }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "moose");
    await expect(page.locator(".teamMessage")).toHaveText(
      "De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 4."
    );
  });

  test("keeps the chosen authored variant stable through retries and rerenders", async ({ page }) => {
    await startEuropeAdventure(page);
    await page.evaluate(() => { Math.random = () => 0; });
    await page.getByRole("button", { name: "Windmolen" }).dispatchEvent("click");
    await expect(page.getByText("7 × 8 = ?"))
      .toBeVisible({ timeout: 30000 });
    const before = await page.evaluate(() => ({
      ids: window.eval("state.activeQuestions.map((question) => question.id)"),
      prompt: window.eval("state.activeQuestions[0].prompt")
    }));

    await page.evaluate(() => {
      Math.random = () => 0.999;
      window.eval("render")();
    });
    await page.locator("[data-open-answer]").fill("1");
    await tap(page.getByRole("button", { name: "Controleer" }));
    const after = await page.evaluate(() => ({
      ids: window.eval("state.activeQuestions.map((question) => question.id)"),
      prompt: window.eval("state.activeQuestions[0].prompt")
    }));
    expect(after).toEqual(before);
  });

  test("Ctrl+Shift+L completes without evidence and Ctrl+Shift+C does nothing", async ({ page }) => {
    await startEuropeAdventure(page);
    const before = await page.evaluate(() => ({
      answered: window.eval("state.answered"),
      attempts: window.eval("state.attempts"),
      completion: localStorage.getItem("atlas-europa-nederland-v1")
    }));

    await page.keyboard.press("Control+Shift+C");
    const afterOldShortcut = await page.evaluate(() => ({
      completed: window.eval("state.completedRunes.size"),
      answered: window.eval("state.answered"),
      attempts: window.eval("state.attempts"),
      completion: localStorage.getItem("atlas-europa-nederland-v1")
    }));
    expect(afterOldShortcut).toEqual({
      completed: 0,
      answered: before.answered,
      attempts: before.attempts,
      completion: before.completion
    });

    await page.keyboard.press("Control+Shift+L");
    await expect(page.getByText("De reispoort is klaar. Engeland is de volgende halte.")).toBeVisible();
    const after = await page.evaluate(() => ({
      completed: window.eval("state.completedRunes.size"),
      total: window.eval("level.runes.length"),
      answered: window.eval("state.answered"),
      attempts: window.eval("state.attempts"),
      screen: window.eval("state.screen"),
      completion: localStorage.getItem("atlas-europa-nederland-v1")
    }));
    expect(after).toEqual({
      completed: 3,
      total: 3,
      answered: before.answered,
      attempts: before.attempts,
      screen: "scene",
      completion: before.completion
    });
  });

  test("Rheden starts left and completes toward the right", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0020", { startImmediately: true });
      window.eval("render")();
    });
    await expect(page.getByRole("button", { name: "Bospad naar huis" })).toBeVisible();
    const geometry = await page.evaluate(() => {
      const currentLevel = window.eval("level");
      const currentState = window.eval("state");
      const exit = currentLevel.interactiveObjects.find((object) => object.id === currentLevel.exitHotspotId);
      return {
        startX: currentState.worldX,
        declaredStartX: currentLevel.player.start.x,
        exitX: exit.center.x,
        challengeCount: currentLevel.runes.length
      };
    });
    expect(geometry.startX).toBe(geometry.declaredStartX);
    expect(geometry.startX).toBeLessThan(400);
    expect(geometry.exitX).toBeGreaterThan(1800);
    expect(geometry.challengeCount).toBe(3);
  });

  test("normal gameplay follows the authored Sweden and Rheden start routes", async ({ page }) => {
    await page.goto(gameUrl);
    const cases = [
      { levelId: "LVL-0019", objectName: "Dalapaard", objectId: "dalaHorse" },
      { levelId: "LVL-0020", objectName: "Posbankkaart", objectId: "mapBoard" }
    ];

    for (const item of cases) {
      await page.evaluate(async (levelId) => {
        await window.eval("selectLevel")(levelId, { startImmediately: true });
        window.eval("render")();
      }, item.levelId);

      const start = await page.evaluate(() => {
        const currentLevel = window.eval("level");
        const currentState = window.eval("state");
        const startNode = currentLevel.walkGraph.nodes.find(
          (node) => node.id === currentLevel.player.startNode
        );
        return {
          playerStart: currentLevel.player.start,
          startNode: { x: startNode.x, y: startNode.y },
          actor: { x: currentState.worldX, y: currentState.worldY }
        };
      });
      expect(start.playerStart).toEqual(start.startNode);
      expect(start.actor).toEqual(start.startNode);

      const actor = page.locator("[data-actor='sven']");
      await page.getByRole("button", { name: item.objectName, exact: true }).dispatchEvent("click");
      await expect(actor).toHaveAttribute("data-animation", "walk");
      await expect(page.getByRole("heading", { name: item.objectName, exact: true })).toBeVisible({
        timeout: 30000
      });

      const arrival = await page.evaluate((objectId) => {
        const currentLevel = window.eval("level");
        const currentState = window.eval("state");
        const object = currentLevel.interactiveObjects.find((entry) => entry.id === objectId);
        const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
        return {
          actor: { x: currentState.worldX, y: currentState.worldY },
          approach: { x: approach.x, y: approach.y }
        };
      }, item.objectId);
      expect(arrival.actor).toEqual(arrival.approach);
    }
  });

  test("editor mode uses the same Sweden and Rheden authored starts", async ({ page }) => {
    await page.goto(devGameUrl);
    for (const levelId of ["LVL-0019", "LVL-0020"]) {
      const geometry = await page.evaluate(async (id) => {
        await window.eval("selectLevel")(id, { startImmediately: true });
        const currentLevel = window.eval("level");
        const currentState = window.eval("state");
        const startNode = currentLevel.walkGraph.nodes.find(
          (node) => node.id === currentLevel.player.startNode
        );
        return {
          playerStart: currentLevel.player.start,
          startNode: { x: startNode.x, y: startNode.y },
          actor: { x: currentState.worldX, y: currentState.worldY }
        };
      }, levelId);
      expect(geometry.playerStart).toEqual(geometry.startNode);
      expect(geometry.actor).toEqual(geometry.startNode);
    }
  });

  test("shows the standard per-level music and ambience controls in editor mode", async ({ page }) => {
    await page.goto(devGameUrl);
    await page.evaluate(() => localStorage.clear());
    await waitForImages(page);
    await tap(page.getByRole("button", { name: "Start avontuur" }));
    await tap(page.locator('[data-menu-tile="LVL-0013"]'));
    await tap(page.getByRole("button", { name: "Start avontuur" }));
    await page.keyboard.press("Control+Shift+D");

    await expect(page.locator("[data-audio-editor]")).toBeVisible();
    await expect(page.locator('[data-audio-path="volumes.master"]')).toBeVisible();
    await expect(page.locator('[data-audio-path="levels.LVL-0013.musicVolume"]')).toBeVisible();
    await expect(page.locator('[data-audio-path="levels.LVL-0013.ambienceVolume"]')).toBeVisible();
    await page.keyboard.press("Control+Shift+L");
    await expect(page.getByText("De reispoort is klaar. Engeland is de volgende halte.")).toBeVisible();

    const mapping = await page.evaluate(() => ({
      music: window.SVEN_AUDIO_CONFIG.levels["LVL-0013"].music,
      ambience: window.SVEN_AUDIO_CONFIG.levels["LVL-0013"].ambience,
      musicPath: window.SVEN_AUDIO_CONFIG.tracks.music.europeGrandTour,
      ambiencePath: window.SVEN_AUDIO_CONFIG.tracks.ambience.europeNederland
    }));
    expect(mapping).toEqual({
      music: "europeGrandTour",
      ambience: "europeNederland",
      musicPath: "assets/audio/music/europe_grand_tour.mp3",
      ambiencePath: "assets/audio/ambience/europe/nederland.mp3"
    });

    await page.locator('[data-audio-path="levels.LVL-0013.musicVolume"]').fill("0.41");
    await page.locator('[data-audio-path="levels.LVL-0013.ambienceVolume"]').fill("0.37");
    const volumes = await page.evaluate(() => ({
      music: window.SVEN_AUDIO_CONFIG.levels["LVL-0013"].musicVolume,
      ambience: window.SVEN_AUDIO_CONFIG.levels["LVL-0013"].ambienceVolume
    }));
    expect(volumes).toEqual({ music: 0.41, ambience: 0.37 });
  });
});
