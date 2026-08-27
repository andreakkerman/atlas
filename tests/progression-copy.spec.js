// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const gameUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(__dirname, "..", "index.html")).toString();

test.beforeEach(async ({ page }) => {
  await page.route("**/__dev/levels/*/editor-draft", (route) => route.fulfill({ json: {} }));
});
test.afterEach(async ({ page }) => { await page.goto("about:blank"); });

async function start(page, levelId) {
  await page.goto(gameUrl);
  await page.evaluate(async (id) => {
    localStorage.clear();
    await window.eval("selectLevel")(id, { startImmediately: true });
    window.eval("walkPathEditor.apiAvailable = false");
  }, levelId);
}

async function completeChallenge(page, id, finalLabel) {
  await page.evaluate((id) => window.eval("openRuneChallenge")(id), id);
  const count = await page.evaluate(() => window.eval("currentChallengeQuestions")().length);
  for (let index = 0; index < count; index++) {
    const question = await page.evaluate(() => {
      const question = window.eval("currentChallengeQuestions")()[window.eval("state.questionIndex")];
      return { answer: String(window.eval("answerFor")(question)), open: question.answerMode === "open" };
    });
    if (question.open) {
      await page.getByRole("textbox", { name: "Jouw antwoord" }).fill(question.answer);
      await page.getByRole("button", { name: "Controleer", exact: true }).click();
    } else await page.locator(`[data-choice='${question.answer}']`).click();
    await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
    await page.getByRole("button", { name: index === count - 1 ? finalLabel : "Volgende vraag", exact: true }).click();
  }
}

for (const fixture of [
  { levelId: "LVL-0001", npc: "wind", finalLabel: "Opdracht afronden", next: "LVL-0002" },
  { levelId: "LVL-0002", npc: null, finalLabel: "Rond de proef af", next: "LVL-0003" },
  { levelId: "LVL-0003", npc: "gateShield", finalLabel: "Opdracht afronden", next: null }
]) test(`${fixture.levelId}: copy stays correct through prerequisites, completion and progression`, async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  await start(page, fixture.levelId);
  const ids = await page.evaluate(() => window.eval("activeRunes")().map((rune) => rune.id));
  const order = [...ids.filter((id) => id !== fixture.npc), ...ids.filter((id) => id === fixture.npc)];
  const exit = page.locator("[data-exit-hotspot]");
  await expect(exit).toHaveAttribute("data-exit-ready", "false");
  await page.evaluate(() => window.eval("finishInteraction")(window.eval("hotspotById")(window.eval('level.exitHotspotId || "templeGate"')), "hotspot", "activate"));
  await expect(page.locator(".teamMessage")).toContainText(`${ids.length} opdrachten`);
  if (fixture.npc) {
    await page.evaluate((id) => window.eval("openRuneChallenge")(id), fixture.npc);
    await expect(page.locator("[data-challenge-locked]")).toContainText("Rond eerst de andere opdrachten hier af.");
    await expect(page.locator("[data-open-answer], [data-choice]")).toHaveCount(0);
    await page.getByRole("button", { name: "Sluiten", exact: true }).click();
  }
  for (const [index, id] of order.entries()) {
    await completeChallenge(page, id, fixture.finalLabel);
    await expect(page.locator(".teamMeta")).toContainText(`${index + 1}/${ids.length} opdrachten voltooid`);
    const final = index === order.length - 1;
    await expect(exit).toHaveAttribute("data-exit-ready", String(final));
    if (!final) {
      await expect(page.locator(".teamMeta")).not.toContainText("Je kunt verder");
      await expect(page.locator(".teamMessage")).toContainText(`${index + 1} van de ${ids.length}`);
      if (index === order.length - 2) await expect(page.locator(".teamMessage")).toContainText("Nog 1 opdracht te doen.");
    } else {
      await expect(page.locator(".teamMessage")).toContainText("Je kunt verder!");
      await expect(page.locator(".teamMeta")).toContainText("Je kunt verder");
    }
  }
  await page.evaluate(() => window.eval("finishInteraction")(window.eval("hotspotById")(window.eval('level.exitHotspotId || "templeGate"')), "hotspot", "activate"));
  await expect(page.locator(".rewardScreen")).toBeVisible();
  await expect(page.locator(".stats")).toContainText(`${ids.length * 4} vragen beantwoord`);
  await expect(page.locator(".stats")).not.toContainText("opdrachten");
  if (fixture.next) {
    await page.locator('[data-action="next-level"]').click();
    await expect(page.locator("[data-world-stage]")).toBeVisible();
    await expect(page.locator(".teamMeta")).toContainText("0/");
    expect(await page.evaluate(() => window.eval("level.id"))).toBe(fixture.next);
  } else await expect(page.locator('[data-action="next-level"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

for (const presentationType of ["standard", "npc"]) test(`${presentationType}: route-ready is distinct from all-complete and ignores inactive challenges`, async ({ page }) => {
  await start(page, "LVL-0001");
  await page.evaluate((presentationType) => {
    const challenge = window.eval("learningChallengeById")("wind");
    challenge.presentationType = presentationType;
    challenge.requiresAllOtherChallenges = false;
    window.eval("learningChallengeById")("zon").active = false;
    window.eval("state.completedRunes").add("zon");
    if (presentationType === "standard") window.eval("level.companionMoments = []");
    window.eval("render")();
  }, presentationType);
  await expect(page.locator(".teamMeta")).toContainText("0/2 opdrachten voltooid");
  expect(await page.evaluate(() => window.eval("formatCompanionText")("{completed}/{total}; {remainingChallenges}"))).toBe("0/2; 2 opdrachten");
  await page.evaluate(() => {
    window.eval("emitCompanionEvent")("PATH_UNLOCKED");
    window.eval("render")();
  });
  await expect(page.locator(".teamMessage")).not.toContainText("Je kunt verder");
  await page.evaluate(() => {
    window.eval("emitCompanionEvent")("EXIT_BLOCKED");
    window.eval("render")();
  });
  await expect(page.locator(".teamMessage")).toContainText("Eerst nog 1 opdracht afronden.");
  await completeChallenge(page, "wind", "Opdracht afronden");
  await expect(page.locator("[data-exit-hotspot]")).toHaveAttribute("data-exit-ready", "true");
  await expect(page.locator(".teamMeta")).toContainText("1/2 opdrachten voltooid · Je kunt verder");
  await expect(page.locator(".teamMessage")).toHaveText("Je kunt verder. Hier kun je nog 1 opdracht doen.");
  await completeChallenge(page, "steen", "Opdracht afronden");
  await expect(page.locator(".teamMessage")).toHaveText(presentationType === "standard"
    ? "Alle opdrachten zijn voltooid. Je kunt verder!" : "Je kunt verder! Op naar de tempel.");
});

test("Standard prerequisites show a locked message and next-level labels follow configured routes", async ({ page }) => {
  await start(page, "LVL-0001");
  await page.evaluate(() => {
    window.eval("learningChallengeById")("wind").presentationType = "standard";
    window.eval("openRuneChallenge")("wind");
  });
  await expect(page.locator("[data-challenge-locked]")).toContainText("Daarna kun je met deze opdracht beginnen.");
  await expect(page.locator("[data-open-answer], [data-choice]")).toHaveCount(0);
  await page.evaluate(() => {
    window.eval('level.reward.nextLevelId = "LVL-9999"');
    window.eval('state.screen = "reward"');
    window.eval("render")();
  });
  await expect(page.locator('[data-action="next-level"]')).toHaveText("Naar het volgende gebied");
});
