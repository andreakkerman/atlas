// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();

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

async function startAdventure(page) {
  await page.goto(gameUrl);
  await page.evaluate(() => localStorage.clear());
  await waitForImages(page);
  await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
  await tap(page.getByRole("button", { name: /Sven en de Runenpoort/ }));
  await waitForImages(page);
  await expect(page.getByRole("heading", { name: "Sven en de Runenpoort" })).toBeVisible();
  await tap(page.getByRole("button", { name: "Start avontuur" }));
  await tap(page.getByRole("button", { name: "Verder" }));
  await tap(page.getByRole("button", { name: "Het bos in" }));
  await waitForImages(page);
  await expect(page.getByRole("button", { name: "Bosrune" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Kijk" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Praat" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Activeer" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Pad naar de tempel" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Runewachter" })).toHaveCount(0);
  await expect(page.getByText("Tik in de wereld")).toHaveCount(0);
  await expect(page.locator(".svenBlink")).toHaveCount(0);
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

  for (let step = 0; step < 4; step += 1) {
    const beforeX = Number(await actor.getAttribute("data-world-x"));
    ySamples.push(Number(await actor.getAttribute("data-world-y")));
    if (beforeX > 1850) break;

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
    .toBeGreaterThan(1500);
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
    }
  }

  await expect(page.getByText("Alle runen gloeien. De tempel wordt wakker!")).toBeVisible();
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
      .toBeGreaterThan(730);

    await walkTowardTemple(page, pathYSamples);
    await expect
      .poll(async () => Number(await actor.getAttribute("data-world-x")), {
        message: "Sven should walk through world coordinates instead of teleporting"
      })
      .toBeGreaterThan(startX + 80);
    expect(Math.max(...pathYSamples) - Math.min(...pathYSamples)).toBeGreaterThan(30);
    await expect(actorShell).toHaveClass(/sven-facing-right/);

    await expect(page.getByText("Daar is de tempel. Maak de drie runen wakker.")).toBeVisible();
    await expect
      .poll(async () => {
        return page.locator(".worldTrack").evaluate((node) => Number(node.style.getPropertyValue("--camera-percent")));
      })
      .toBeGreaterThan(20);

    const templeX = Number(await actor.getAttribute("data-world-x"));
    await clickWalkableGround(page, 0.12);
    await expect(actorShell).toHaveClass(/sven-facing-left/);
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

    await tap(page.getByRole("button", { name: "Zonrune" }));
    await expect
      .poll(async () => actor.getAttribute("data-animation"), {
        message: "Sven should visibly interact before the rune challenge opens"
      })
      .toBe("interact");
    await expect(page.getByRole("heading", { name: "Zonrune" })).toBeVisible();
  });
});
