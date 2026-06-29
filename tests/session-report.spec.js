// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const testUrl = `${gameUrl}?atlasSessionTest=1`;

async function cleanOpen(page, url = testUrl) {
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await page.reload();
}

async function enterMenu(page) {
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
}

async function startHeroAdventure(page) {
  await page.locator(".heroLevelTile").click();
}

async function createSyntheticSession(page, start, title = "De Runenpoort") {
  return page.evaluate(({ start, title }) => {
    const report = window.AtlasSessionReport;
    report.setNowForTest(start);
    report.startOrVisitLevel({
      adventureId: "LVL-0001",
      adventureTitle: title,
      levelId: `LVL-${start}`,
      levelTitle: "Testplek"
    });
    report.setNowForTest(start + 1000);
    return report.end("menu").id;
  }, { start, title });
}

test.describe("Atlas Session Report v0.1", () => {
  test("starts on adventure selection and ends on return to menu", async ({ page }) => {
    await cleanOpen(page);
    await enterMenu(page);
    await startHeroAdventure(page);
    await expect(page.getByRole("heading", { name: "De Runenpoort" })).toBeVisible();

    const active = await page.evaluate(() => window.AtlasSessionReport.getCurrent());
    expect(active.adventureId).toBe("LVL-0001");
    expect(active.levels.map((entry) => entry.id)).toEqual(["LVL-0001"]);

    await page.getByRole("button", { name: "Terug" }).click();
    const result = await page.evaluate(() => ({
      current: window.AtlasSessionReport.getCurrent(),
      sessions: window.AtlasSessionReport.getSessions()
    }));
    expect(result.current).toBeNull();
    expect(result.sessions).toHaveLength(1);
    expect(result.sessions[0].endReason).toBe("menu");
  });

  test("pauses active time after two minutes without activity", async ({ page }) => {
    await cleanOpen(page);
    const timing = await page.evaluate(() => {
      const report = window.AtlasSessionReport;
      report.setNowForTest(0);
      report.startOrVisitLevel({
        adventureId: "LVL-0001",
        adventureTitle: "De Runenpoort",
        levelId: "LVL-0001",
        levelTitle: "De Runenpoort"
      });
      report.setNowForTest(60_000);
      report.activity();
      report.setNowForTest(300_000);
      report.activity();
      report.setNowForTest(600_000);
      const session = report.end("menu");
      return { activeMs: session.activeMs, elapsedMs: session.elapsedMs };
    });

    expect(timing).toEqual({ activeMs: 300_000, elapsedMs: 600_000 });
  });

  test("maps tables, division, stories and clocks to the four report categories", async ({ page }) => {
    await cleanOpen(page);
    const categories = await page.evaluate(() => {
      const classify = window.AtlasSessionReport.classifyQuestion;
      return [
        classify({ family: "bare_multiplication", presentation: "bare", prompt: "7 × 8 = ?" }),
        classify({ family: "bare_division", presentation: "bare", prompt: "56 : 8 = ?" }),
        classify({ family: "story_division", presentation: "story", prompt: "Een route heeft 4 stukken." }),
        classify({ family: "money", presentation: "story", prompt: "Wat kost het samen?" }),
        classify({ family: "clock_reading", presentation: "bare", prompt: "Hoe laat?", visual: { type: "clock", minute: 45 } })
      ];
    });

    expect(categories).toEqual([
      { category: "Tafels", detail: "Tafel van 8" },
      { category: "Delen", detail: "Delen door 8" },
      { category: "Verhaalsommen", detail: "Delen" },
      { category: "Verhaalsommen", detail: "Vermenigvuldigen" },
      { category: "Klokkijken", detail: "Kwartieren" }
    ]);
  });

  test("records attempts, hints, assistance and response time from the learning flow", async ({ page }) => {
    await cleanOpen(page);
    const question = await page.evaluate(() => {
      const report = window.AtlasSessionReport;
      report.setNowForTest(1000);
      report.startOrVisitLevel({
        adventureId: "LVL-0001",
        adventureTitle: "De Runenpoort",
        levelId: "LVL-0001",
        levelTitle: "De Runenpoort"
      });
      report.beginQuestion(
        { id: "v1", family: "story_division", presentation: "story", answerMode: "open", prompt: "Verdeel 24 runen over 6 schilden." },
        { levelId: "LVL-0001", levelTitle: "De Runenpoort", challengeId: "zon", challengeTitle: "Zonrune", slotId: "s1", variantId: "v1" }
      );
      report.setNowForTest(4000);
      report.recordAttempt(false);
      report.recordHint("minnie");
      report.setNowForTest(7000);
      report.recordAttempt(false);
      report.recordHint("moose");
      report.setNowForTest(9000);
      report.recordAssisted();
      report.setNowForTest(10_000);
      return report.end("menu").questions[0];
    });

    expect(question).toMatchObject({
      attempts: 2,
      firstTryCorrect: false,
      minnieHint: true,
      mooseHint: true,
      assisted: true,
      outcome: "assisted",
      responseMs: 3000,
      category: "Verhaalsommen",
      detail: "Delen"
    });
  });

  test("keeps three unchecked sessions and never overwrites them", async ({ page }) => {
    await cleanOpen(page);
    const firstIds = [];
    for (const start of [1000, 3000, 5000]) firstIds.push(await createSyntheticSession(page, start));
    const before = await page.evaluate(() => window.AtlasSessionReport.getSessions().map((session) => session.id));
    await createSyntheticSession(page, 7000);
    const after = await page.evaluate(() => window.AtlasSessionReport.getSessions().map((session) => session.id));

    expect(before).toHaveLength(3);
    expect(new Set(after)).toEqual(new Set(firstIds));
  });

  test("deletes only the confirmed session", async ({ page }) => {
    await cleanOpen(page);
    const firstId = await createSyntheticSession(page, 1000, "Eerste sessie");
    const secondId = await createSyntheticSession(page, 3000, "Tweede sessie");
    await enterMenu(page);
    await page.getByRole("button", { name: "Voortgang" }).click();
    await expect(page.locator("[data-session-id]")).toHaveCount(2);

    page.once("dialog", (dialog) => dialog.accept());
    await page.locator(`[data-session-id="${secondId}"]`).getByRole("button", { name: "Gecontroleerd en wissen" }).click();

    await expect(page.locator(`[data-session-id="${secondId}"]`)).toHaveCount(0);
    await expect(page.locator(`[data-session-id="${firstId}"]`)).toHaveCount(1);
  });

  test("does not collect in ordinary Playwright, editor, or debug completion", async ({ page }) => {
    await cleanOpen(page, gameUrl);
    await enterMenu(page);
    await startHeroAdventure(page);
    await page.getByRole("button", { name: "Terug" }).click();
    expect(await page.evaluate(() => localStorage.getItem("atlas-session-report-v1"))).toBeNull();

    await cleanOpen(page, `${gameUrl}?dev=editor&atlasSessionTest=1`);
    await enterMenu(page);
    await startHeroAdventure(page);
    await page.getByRole("button", { name: "Terug" }).click();
    expect(await page.evaluate(() => localStorage.getItem("atlas-session-report-v1"))).toBeNull();

    await cleanOpen(page);
    await enterMenu(page);
    await startHeroAdventure(page);
    await page.getByRole("button", { name: "Start avontuur" }).click();
    await page.keyboard.press("Control+Shift+L");
    await page.getByRole("button", { name: "Terug naar menu" }).click();
    const debugResult = await page.evaluate(() => ({
      current: localStorage.getItem("atlas-session-current-v1"),
      completed: localStorage.getItem("atlas-session-report-v1")
    }));
    expect(debugResult).toEqual({ current: null, completed: null });
  });

  test("lays out the menu control and progress report within the viewport", async ({ page }) => {
    await cleanOpen(page);
    await createSyntheticSession(page, 1000);
    await enterMenu(page);
    const progressButton = page.getByRole("button", { name: "Voortgang" });
    await expect(progressButton).toBeVisible();
    await progressButton.click();

    await expect(page.getByRole("heading", { name: "Voortgang" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Terug naar menu" })).toBeVisible();
    await expect(page.getByText("Actieve tijd")).toBeVisible();
    await expect(page.getByText("Direct goed", { exact: true }).first()).toBeVisible();

    const bounds = await page.locator(".sessionReportCard").evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { left: rect.left, right: rect.right, width: rect.width, viewport: window.innerWidth };
    });
    expect(bounds.left).toBeGreaterThanOrEqual(0);
    expect(bounds.right).toBeLessThanOrEqual(bounds.viewport);
    expect(bounds.width).toBeGreaterThan(280);
  });

  test("scrolls a long report to the real bottom without making the page itself scrollable", async ({ page }) => {
    await cleanOpen(page);
    for (const start of [1000, 3000, 5000]) await createSyntheticSession(page, start, `Sessie ${start}`);
    await enterMenu(page);
    await page.getByRole("button", { name: "Voortgang" }).click();
    const result = await page.locator(".progressScreen").evaluate((screen) => {
      screen.scrollTop = screen.scrollHeight;
      const lastButton = screen.querySelector("[data-session-id]:last-child [data-delete-session]").getBoundingClientRect();
      return {
        scrollTop: screen.scrollTop,
        max: screen.scrollHeight - screen.clientHeight,
        buttonBottom: lastButton.bottom,
        viewport: innerHeight,
        bodyOverflow: getComputedStyle(document.body).overflow,
        pageScrollable: document.documentElement.scrollHeight > innerHeight
      };
    });
    expect(result.scrollTop).toBeCloseTo(result.max, 0);
    expect(result.buttonBottom).toBeLessThanOrEqual(result.viewport);
    expect(result.bodyOverflow).toBe("hidden");
    expect(result.pageScrollable).toBe(false);
  });
});
