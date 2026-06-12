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
  await expect(page.getByRole("heading", { name: "Sven en de Runenpoort" })).toBeVisible();
  await tap(page.getByRole("button", { name: "Start avontuur" }));
  await tap(page.getByRole("button", { name: "Verder" }));
  await tap(page.getByRole("button", { name: "Naar de tempel" }));
  await waitForImages(page);
  await expect(page.getByRole("button", { name: "Zonrune" })).toBeVisible();
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

  for (const [runeIndex, rune] of runes.entries()) {
    await tap(page.getByRole("button", { name: rune.name }));
    await expect(page.getByText(`Sven loopt naar de rune... ${rune.name} wordt wakker.`)).toBeVisible();
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

test.describe("Sven en de Runenpoort", () => {
  test("loads the adventure", async ({ page }) => {
    await page.goto(gameUrl);
    await expect(page).toHaveTitle("Sven en de Runenpoort");
    await expect(page.getByRole("button", { name: "Start avontuur" })).toBeVisible();
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
});
