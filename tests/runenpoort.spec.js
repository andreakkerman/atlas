// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const devGameUrl = `${gameUrl}?dev=walkpath`;

const runes = [
  { name: "Zonrune", questions: [[3, 4], [5, 6], [2, 8], [4, 7]] },
  { name: "Steenrune", questions: [[6, 4], [8, 3], [7, 5], [9, 2]] },
  { name: "Windrune", questions: [[4, 9], [6, 8], [10, 7], [8, 5]] }
];

async function waitForImages(page) {
  await page.waitForFunction(() => {
    return [...document.images].every((image) => image.complete && image.naturalWidth > 0);
  });
}

async function tap(locator) {
  await expect(locator).toBeVisible();
  await expect(locator).toBeEnabled();
  await locator.click({ force: true });
}

async function startAdventure(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await waitForImages(page);
  await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
  await tap(page.getByRole("button", { name: /Sven en de Runenpoort/ }));
  await waitForImages(page);
  await expect(page.getByRole("heading", { name: "Sven en de Runenpoort" })).toBeVisible();
  await tap(page.getByRole("button", { name: "Start avontuur" }));
  await waitForImages(page);
  await expect(page.getByRole("button", { name: "Bosrune" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Verder" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Het bos in" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Kijk" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Praat" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Activeer" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Pad naar de tempel" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Runewachter" })).toHaveCount(0);
  await expect(page.getByText("Tik in de wereld")).toHaveCount(0);
  await expect(page.locator(".svenBlink")).toHaveCount(0);
  await expect(page.locator("[data-debug-overlay]")).toHaveCount(0);
  await expect(page.locator(".runeHotspot")).toHaveText(["", "", ""]);
  await expect(page.locator("[data-world-stage]")).toBeVisible();
}

async function travelToTemple(page) {
  await tap(page.getByRole("button", { name: "Bosrune" }));
  await expect(page.getByText("Een oude steen. Hij wijst naar de tempel.")).toBeVisible();

  await walkTowardTemple(page);
  await expect(page.getByText("Daar is de tempel. Maak de drie runen wakker.")).toBeVisible();
  await expect(page.getByRole("button", { name: "Zonrune" })).toBeVisible();
}

async function clickWalkableGround(page, xRatio = 0.55) {
  await clickStageAt(page, xRatio, 0.78);
}

async function clickStageAt(page, xRatio, yRatio) {
  const stage = page.locator("[data-world-stage]");
  await expect(stage).toBeVisible();
  const box = await stage.boundingBox();
  if (!box) throw new Error("World stage was not measurable");
  await page.mouse.click(box.x + box.width * xRatio, box.y + box.height * yRatio);
}

async function waitForIdle(page) {
  const actor = page.locator("[data-actor='sven']");
  await expect
    .poll(async () => actor.getAttribute("data-animation"), {
      timeout: 18000,
      message: "Sven should finish walking and return to idle"
    })
    .toBe("idle");
}

async function walkTowardTemple(page, ySamples = []) {
  const actor = page.locator("[data-actor='sven']");

  for (let step = 0; step < 5; step += 1) {
    const beforeX = Number(await actor.getAttribute("data-world-x"));
    ySamples.push(Number(await actor.getAttribute("data-world-y")));
    if (beforeX > 1300) break;

    await clickWalkableGround(page, 0.9);
    await expect(actor).toHaveAttribute("data-animation", "walk");
    if (step === 0) {
      await expectActorFrameChanges(page, "walk");
    }
    await expect
      .poll(async () => Number(await actor.getAttribute("data-world-x")), {
        timeout: 18000,
        message: "Sven should keep walking right through the wide world"
      })
      .toBeGreaterThan(beforeX + 120);
    await waitForIdle(page);
    ySamples.push(Number(await actor.getAttribute("data-world-y")));
  }

  await expect
    .poll(async () => Number(await actor.getAttribute("data-world-x")), {
      message: "Sven should reach the temple area by free walking"
    })
    .toBeGreaterThan(1120);
}

async function answerQuestion(page, a, b, options = {}) {
  const correct = a * b;
  await expect(page.getByText(`Hoeveel is ${a} x ${b}?`)).toBeVisible();

  if (options.answerWrongFirst) {
    const wrongChoice = await page.locator(".choices button").evaluateAll((buttons, correctValue) => {
      return buttons.map((button) => button.textContent.trim()).find((value) => value !== String(correctValue));
    }, correct);

    await tap(page.locator(`button[data-choice="${wrongChoice}"]`));
    await expect(page.getByText("Bijna. 4 groepjes van 3 mag ook. Dat is dezelfde som.")).toBeVisible();
  }

  await tap(page.locator(`button[data-choice="${correct}"]`));
  await expect(page.getByText(`Ja! ${a} x ${b} = ${correct}.`)).toBeVisible();
}

async function playFullAdventure(page) {
  await startAdventure(page);
  await travelToTemple(page);

  for (const [runeIndex, rune] of runes.entries()) {
    await tap(page.getByRole("button", { name: rune.name }));
    await expect(page.getByRole("heading", { name: rune.name })).toBeVisible();

    for (const [questionIndex, [a, b]] of rune.questions.entries()) {
      await answerQuestion(page, a, b, {
        answerWrongFirst: runeIndex === 0 && questionIndex === 0
      });

      const isLastQuestion = questionIndex === rune.questions.length - 1;
      const nextButton = page.getByRole("button", { name: isLastQuestion ? "Maak de rune wakker" : "Volgende som" });
      await nextButton.scrollIntoViewIfNeeded();
      await tap(nextButton);

      if (runeIndex === 0 && isLastQuestion) {
        const marker = page.locator('[data-rune="zon"]');
        await expect(marker).toHaveClass(/runeDone/);
        const coordinates = await marker.evaluate((node) => ({
          worldX: Number(node.getAttribute("data-world-center-x")),
          worldY: Number(node.getAttribute("data-world-center-y")),
          radius: Number(node.getAttribute("data-radius")),
          left: parseFloat(node.style.left),
          top: parseFloat(node.style.top)
        }));
        expect(coordinates.worldX).toBe(1384);
        expect(coordinates.worldY).toBe(160);
        expect(coordinates.radius).toBe(46);
        expect(coordinates.left).toBeCloseTo((1384 / 2172) * 100, 3);
        expect(coordinates.top).toBeCloseTo((160 / 724) * 100, 3);
      }
    }
  }

  await expect(page.getByText("Alle runen gloeien. De tempel wordt wakker!")).toBeVisible();
  await expect(page.locator('[data-object="templeGate"]')).toBeVisible();
  await tap(page.getByRole("button", { name: "Ga naar binnen" }));
  await expect(page.getByText("Bewaker van de Runenpoort")).toBeVisible();
}

async function expectActorFrameChanges(page, animationName) {
  const actor = page.locator("[data-actor='sven']");
  await expect(actor).toHaveAttribute("data-animation", animationName);
  const firstFrame = await actor.getAttribute("data-frame");

  await expect
    .poll(async () => actor.getAttribute("data-frame"), {
      message: `${animationName} animation should advance frames`
    })
    .not.toBe(firstFrame);
}

async function expectStableActorAnchor(page) {
  const actor = page.locator("[data-actor='sven']");
  const samples = [];

  for (let index = 0; index < 4; index += 1) {
    samples.push(await actor.boundingBox());
    await page.waitForTimeout(160);
  }

  const tops = samples.map((box) => box.y);
  const lefts = samples.map((box) => box.x);
  expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(1);
  expect(Math.max(...lefts) - Math.min(...lefts)).toBeLessThan(1);
}

test.describe("Sven en de Runenpoort", () => {
  test.setTimeout(90000);

  test("loads the adventure", async ({ page }) => {
    await page.goto(gameUrl);
    await expect(page).toHaveTitle("SvenAdventure");
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sven en de Runenpoort/ })).toBeVisible();
  });

  test("plays through the full adventure and persists progress", async ({ page }) => {
    await playFullAdventure(page);

    const completion = await page.evaluate(() => JSON.parse(localStorage.getItem("svenadventure-runenpoort-v1")));
    expect(completion).toMatchObject({
      levelId: "LVL-0001",
      answered: 12,
      firstTryCorrect: 11,
      attempts: 13
    });

    const tableProgress = await page.evaluate(() => JSON.parse(localStorage.getItem("svenadventure-table-progress-v1")));
    expect(tableProgress.tables["3"]).toMatchObject({
      questionsAsked: 1,
      attempts: 2,
      mistakes: 1,
      firstTryCorrect: 0
    });
    expect(tableProgress.tables["5"]).toMatchObject({
      questionsAsked: 1,
      attempts: 1,
      mistakes: 0,
      firstTryCorrect: 1
    });

    await page.reload();
    const completionAfterReload = await page.evaluate(() => localStorage.getItem("svenadventure-runenpoort-v1"));
    const progressAfterReload = await page.evaluate(() => localStorage.getItem("svenadventure-table-progress-v1"));
    expect(completionAfterReload).toBeTruthy();
    expect(progressAfterReload).toBeTruthy();
  });

  test("uses the interactive object registry for round world-aligned circles", async ({ page }) => {
    await startAdventure(page);

    const alignment = await page.evaluate(() => {
      const level = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"];
      const objectById = new Map(level.interactiveObjects.map((object) => [object.id, object]));
      const pathYs = level.walkGraph.nodes.map((node) => node.y);
      const stepYs = level.walkGraph.nodes
        .filter((node) => node.id.startsWith("gate-step"))
        .map((node) => node.y);
      const visibleNodes = [...document.querySelectorAll("[data-object]")];

      return {
        objectIds: level.interactiveObjects.map((object) => object.id),
        pathRange: Math.max(...pathYs) - Math.min(...pathYs),
        stepRange: Math.max(...stepYs) - Math.min(...stepYs),
        targets: visibleNodes.map((node) => {
          const object = objectById.get(node.getAttribute("data-object"));
          const box = node.getBoundingClientRect();
          const expectedDiameter = object.radius * 2;
          return {
            id: object.id,
            worldX: Number(node.getAttribute("data-world-center-x")),
            worldY: Number(node.getAttribute("data-world-center-y")),
            radius: Number(node.getAttribute("data-radius")),
            left: parseFloat(node.style.left),
            top: parseFloat(node.style.top),
            width: parseFloat(node.style.width),
            height: parseFloat(node.style.height),
            renderedWidth: box.width,
            renderedHeight: box.height,
            expectedLeft: (object.center.x / level.world.width) * 100,
            expectedTop: (object.center.y / level.world.height) * 100,
            expectedWidth: (expectedDiameter / level.world.width) * 100,
            expectedHeight: (expectedDiameter / level.world.height) * 100
          };
        })
      };
    });

    expect(alignment.objectIds).toEqual(["forestRune", "zon", "steen", "wind", "templeGate"]);
    expect(alignment.pathRange).toBeGreaterThan(120);
    expect(alignment.targets.length).toBe(4);
    expect(alignment.stepRange).toBeGreaterThan(70);

    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator("[data-debug-overlay]")).toBeVisible();
    await expect(page.locator("[data-developer-tools]")).toBeVisible();
    await expect(page.getByText("Developer Tools")).toBeVisible();
    await expect(page.getByText("Current Mode: Runtime")).toBeVisible();
    await expect(page.getByText("WalkPath Editing: Unavailable")).toBeVisible();
    await expect(page.getByText("Status: Read-only mode")).toBeVisible();
    await expect(page.getByText("Run npm run dev:walkpath")).toBeVisible();
    await expect(page.getByText("Open http://127.0.0.1:4173/?dev=walkpath")).toBeVisible();
    await expect(page.getByRole("button", { name: "Apply" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Revert" })).toHaveCount(0);
    const debugOverlay = await page.evaluate(() => {
      const level = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"];
      return {
        nodeCount: document.querySelectorAll("[data-debug-node]").length,
        objectCount: document.querySelectorAll("[data-debug-object]").length,
        edgeCount: document.querySelectorAll(".debugPathEdge").length,
        expectedNodeCount: level.walkPath.length,
        expectedObjectCount: level.interactiveObjects.length,
        expectedEdgeCount: level.walkPath.length - 1,
        derivedNodeCount: level.walkGraph.nodes.length,
        hasWalkPath: Array.isArray(level.walkPath)
      };
    });
    expect(debugOverlay.hasWalkPath).toBe(true);
    expect(debugOverlay.nodeCount).toBe(debugOverlay.expectedNodeCount);
    expect(debugOverlay.objectCount).toBe(debugOverlay.expectedObjectCount);
    expect(debugOverlay.edgeCount).toBe(debugOverlay.expectedEdgeCount);
    expect(debugOverlay.derivedNodeCount).toBeGreaterThan(debugOverlay.expectedNodeCount);
    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator("[data-debug-overlay]")).toHaveCount(0);
    await expect(page.locator("[data-developer-tools]")).toHaveCount(0);

    for (const item of alignment.targets) {
      expect(item.worldX, `${item.id} center x`).toBeGreaterThan(0);
      expect(item.worldY, `${item.id} center y`).toBeGreaterThan(0);
      expect(item.left, `${item.id} left`).toBeCloseTo(item.expectedLeft, 3);
      expect(item.top, `${item.id} top`).toBeCloseTo(item.expectedTop, 3);
      expect(item.width, `${item.id} width`).toBeCloseTo(item.expectedWidth, 3);
      expect(item.height, `${item.id} height`).toBeCloseTo(item.expectedHeight, 3);
      expect(item.radius, `${item.id} radius`).toBeGreaterThan(0);
      expect(Math.abs(item.renderedWidth - item.renderedHeight), `${item.id} rendered circle`).toBeLessThan(1.2);
    }
  });

  test("returns from the world to the main menu", async ({ page }) => {
    await startAdventure(page);
    await tap(page.getByRole("button", { name: "Terug naar menu" }));
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await expect(page.getByRole("button", { name: /Sven en de Runenpoort/ })).toBeVisible();
  });

  test("supports simplified walkPath debug editing fallback", async ({ page }) => {
    await startAdventure(page, devGameUrl);
    await expect(page.locator("[data-developer-tools]")).toHaveCount(0);
    await expect(page.locator("[data-debug-overlay]")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Save Draft" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Copy walkPath" })).toHaveCount(0);

    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator("[data-debug-overlay]")).toBeVisible();
    await expect(page.locator("[data-developer-tools]")).toBeVisible();
    await expect(page.getByText("Developer Tools")).toBeVisible();
    await expect(page.getByText("Current Mode: WalkPath Editing")).toBeVisible();
    await expect(page.getByText("Draft Status: Clean")).toBeVisible();
    await expect(page.getByText("How to use:")).toBeVisible();
    await expect(page.getByText("Drag walkPath points")).toBeVisible();
    await expect(page.getByText("Test movement")).toBeVisible();
    await expect(page.getByText("Apply saves to the level file")).toBeVisible();
    await expect(page.getByText("Revert restores the saved path")).toBeVisible();
    await expect(page.getByText("The real level file changes only when Apply is pressed.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Apply" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Revert" })).toBeEnabled();

    const before = await page.evaluate(() => {
      const point = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].walkPath[1];
      return { x: point.x, y: point.y };
    });
    const point = page.locator('[data-walkpath-index="1"] circle');
    const box = await point.boundingBox();
    if (!box) throw new Error("walkPath point was not measurable");

    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 24, box.y + box.height / 2 - 12);
    await page.mouse.up();

    const after = await page.evaluate(() => {
      const level = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"];
      const point = level.walkPath[1];
      return {
        x: point.x,
        y: point.y,
        derivedNodeCount: level.walkGraph.nodes.length,
        authoredNodeCount: level.walkPath.length
      };
    });
    expect(after.x).not.toBe(before.x);
    expect(after.y).not.toBe(before.y);
    expect(after.derivedNodeCount).toBeGreaterThan(after.authoredNodeCount);
    await expect(page.getByText("Draft Status: Modified")).toBeVisible();

    await tap(page.getByRole("button", { name: "Revert" }));
    await expect(page.getByText("Draft Status: Reverted")).toBeVisible();
  });

  test("animates Sven as an actor", async ({ page }) => {
    await startAdventure(page);

    const actor = page.locator("[data-actor='sven']");
    const actorShell = page.locator("[data-actor-shell='sven']");
    await expect(actor).toBeVisible();
    await expect(actor).toHaveAttribute("src", /assets\/characters\/sven\/idle-right\/frame-\d+\.png/);
    await expect(actor).toHaveAttribute("data-animation", "idle");
    await expect(page.locator(".svenBlink")).toHaveCount(0);
    await expectStableActorAnchor(page);

    const startX = Number(await actor.getAttribute("data-world-x"));
    const pathYSamples = [];

    await clickStageAt(page, 0.5, 0.2);
    await expect(actor).toHaveAttribute("data-animation", "walk");
    await waitForIdle(page);
    await expect
      .poll(async () => Number(await actor.getAttribute("data-world-y")), {
        message: "Free clicks should project Sven onto the valid path graph"
      })
      .toBeGreaterThan(560);
    await expect
      .poll(async () => Number(await actor.getAttribute("data-world-y")), {
        message: "Free clicks should stay inside the painted lower path"
      })
      .toBeLessThan(640);

    await walkTowardTemple(page, pathYSamples);
    await expect
      .poll(async () => Number(await actor.getAttribute("data-world-x")), {
        message: "Sven should walk through world coordinates instead of teleporting"
      })
      .toBeGreaterThan(startX + 80);
    expect(Math.max(...pathYSamples) - Math.min(...pathYSamples)).toBeGreaterThan(15);
    await expect(actorShell).toHaveClass(/sven-facing-right/);

    await expect(page.getByText("Daar is de tempel. Maak de drie runen wakker.")).toBeVisible();
    await expect
      .poll(async () => {
        return page.locator(".worldTrack").evaluate((node) => Number(node.style.getPropertyValue("--camera-percent")));
      })
      .toBeGreaterThan(20);

    const templeX = Number(await actor.getAttribute("data-world-x"));
    const cameraBeforeReverse = await page.locator(".worldTrack").evaluate((node) =>
      Number(node.style.getPropertyValue("--camera-x"))
    );
    await clickWalkableGround(page, 0.12);
    await expect(actorShell).toHaveClass(/sven-facing-left/);
    const cameraAfterReverse = await page.locator(".worldTrack").evaluate((node) =>
      Number(node.style.getPropertyValue("--camera-x"))
    );
    expect(Math.abs(cameraAfterReverse - cameraBeforeReverse)).toBeLessThan(260);
    await expect
      .poll(async () => Number(await actor.getAttribute("data-world-x")), {
        message: "Sven should move left when walking left"
      })
      .toBeLessThan(templeX - 80);
    await waitForIdle(page);
    await expect(actorShell).toHaveClass(/sven-facing-left/);

    await clickWalkableGround(page, 0.9);
    await expect(actorShell).toHaveClass(/sven-facing-right/);
    await waitForIdle(page);
    await expect(actorShell).toHaveClass(/sven-facing-right/);

    await tap(page.getByRole("button", { name: "Steenrune" }));
    await expect
      .poll(async () => Number(await actor.getAttribute("data-world-y")), {
        message: "Sven should climb the temple steps toward the stone rune"
      })
      .toBeLessThan(760);
    await expect(page.getByRole("heading", { name: "Steenrune" })).toBeVisible();
  });

  test("opens rune challenges from object-aligned hotspots", async ({ page }) => {
    await startAdventure(page);
    await travelToTemple(page);

    await tap(page.getByRole("button", { name: "Zonrune" }));
    await expect(page.locator('[data-rune="zon"]')).toHaveAttribute("data-approach-node", "sun-rune-approach");
    await expect
      .poll(async () => page.locator("[data-actor='sven']").getAttribute("data-animation"), {
        message: "Sven should visibly interact before the rune challenge opens"
      })
      .toBe("interact");
    await expect(page.getByRole("heading", { name: "Zonrune" })).toBeVisible();

    const anchorAlignment = await page.evaluate(() => {
      const rune = document.querySelector('[data-rune="zon"]');
      const focus = document.querySelector(".runeFocusSpark");
      const runeBox = rune.getBoundingClientRect();
      const focusBox = focus.getBoundingClientRect();
      return {
        runeCenterX: runeBox.left + runeBox.width / 2,
        runeCenterY: runeBox.top + runeBox.height / 2,
        focusCenterX: focusBox.left + focusBox.width / 2,
        focusCenterY: focusBox.top + focusBox.height / 2,
        focusWidth: focusBox.width,
        focusHeight: focusBox.height
      };
    });
    expect(Math.abs(anchorAlignment.runeCenterX - anchorAlignment.focusCenterX)).toBeLessThan(2);
    expect(Math.abs(anchorAlignment.runeCenterY - anchorAlignment.focusCenterY)).toBeLessThan(2);
    expect(Math.abs(anchorAlignment.focusWidth - anchorAlignment.focusHeight)).toBeLessThan(1);
  });
});
