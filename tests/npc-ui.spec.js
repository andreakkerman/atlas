// @ts-check
const { test, expect } = require("@playwright/test");
const path = require("path");
const { pathToFileURL } = require("url");
const gameUrl = process.env.ATLAS_EDITOR_URL || pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "ipad-landscape", width: 1080, height: 810 },
  { name: "ipad-portrait", width: 810, height: 1080 }
];
const characters = [
  { level: "LVL-0001", id: "wind", name: "Freya", title: "Windrune" },
  { level: "LVL-0003", id: "gateShield", name: "Eivar", title: "Poortschild" }
];

test.beforeEach(async ({ page }) => {
  await page.route("**/__dev/levels/*/editor-draft", route => route.fulfill({ json: {} }));
});
test.afterEach(async ({ page }) => { await page.goto("about:blank"); });

async function start(page, levelId) {
  await page.goto(gameUrl);
  await page.evaluate(async id => {
    localStorage.clear();
    await window.eval("selectLevel")(id, { startImmediately: true });
    window.eval("walkPathEditor.apiAvailable = false");
  }, levelId);
}

async function inspectLayout(page, name, viewport, testInfo, label) {
  const card = page.locator(".npcEncounterCard");
  await expect(page.getByRole("dialog", { name, exact: true })).toBeVisible();
  await expect(card.locator("h2")).toHaveText(name);
  await expect(card.locator("h2")).toHaveCSS("color", "rgb(255, 255, 255)");
  await expect.poll(() => card.locator("img").evaluate(img => img.complete && img.naturalWidth > 0)).toBe(true);
  const layout = await card.evaluate(card => {
    const rect = element => { const r = element.getBoundingClientRect(); return { x: r.x, y: r.y, right: r.right, bottom: r.bottom, width: r.width, height: r.height }; };
    const img = card.querySelector("img");
    return {
      card: rect(card), portrait: rect(img), body: rect(card.querySelector(".npcEncounterBody")),
      overflow: card.scrollWidth - card.clientWidth,
      scroll: card.scrollHeight - card.clientHeight,
      pageOverflow: document.documentElement.scrollWidth - innerWidth,
      fit: getComputedStyle(img).objectFit,
      controls: [...card.querySelectorAll("button, input")].map(rect)
    };
  });
  expect(layout.overflow).toBeLessThanOrEqual(1);
  expect(layout.scroll).toBeLessThanOrEqual(1);
  expect(layout.pageOverflow).toBeLessThanOrEqual(1);
  expect(layout.card.x).toBeGreaterThanOrEqual(0);
  expect(layout.card.y).toBeGreaterThanOrEqual(0);
  expect(layout.card.right).toBeLessThanOrEqual(viewport.width);
  expect(layout.card.bottom).toBeLessThanOrEqual(viewport.height);
  expect(layout.fit).toBe("contain");
  for (const control of layout.controls) {
    expect(control.height).toBeGreaterThanOrEqual(48);
    expect(control.x).toBeGreaterThanOrEqual(layout.card.x);
    expect(control.right).toBeLessThanOrEqual(layout.card.right);
    expect(control.bottom).toBeLessThanOrEqual(layout.card.bottom);
  }
  if (viewport.height > viewport.width) expect(layout.body.y).toBeGreaterThanOrEqual(layout.portrait.bottom);
  else expect(layout.body.x).toBeGreaterThan(layout.portrait.right);
  await page.screenshot({ path: testInfo.outputPath(`${label}.png`) });
}

async function submit(page, answer) {
  const input = page.locator("[data-open-answer]");
  if (await input.count()) {
    await input.fill(String(answer));
    await page.getByRole("button", { name: "Controleer", exact: true }).click();
  } else await page.getByRole("button", { name: String(answer), exact: true }).click();
}

for (const viewport of viewports) for (const fixture of characters) {
  test(`${fixture.name}: locked, all questions, retry and feedback at ${viewport.name}`, async ({ page }, testInfo) => {
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.setViewportSize(viewport);
    await start(page, fixture.level);
    await page.evaluate(id => window.eval("openRuneChallenge")(id), fixture.id);
    await expect(page.locator("[data-npc-locked]")).toBeVisible();
    await expect(page.getByRole("heading", { name: fixture.title, exact: true })).toHaveCount(0);
    await expect(page.locator(".sum, [data-choice], [data-open-answer]")).toHaveCount(0);
    await inspectLayout(page, fixture.name, viewport, testInfo, "locked");
    await page.getByRole("button", { name: "Sluiten", exact: true }).click();
    await page.evaluate(id => {
      window.eval("state").completedRunes = new Set(window.eval("activeRunes")().filter(r => r.id !== id).map(r => r.id));
      // Deterministic selection still uses production authored question variants.
      const random = Math.random;
      Math.random = () => 0;
      try { window.eval("openRuneChallenge")(id); } finally { Math.random = random; }
    }, fixture.id);
    const count = await page.evaluate(() => window.eval("currentChallengeQuestions")().length);
    for (let index = 0; index < count; index++) {
      await expect(page.locator(".npcQuestionProgress")).toHaveText(`Vraag ${index + 1} van ${count}`);
      await expect(page.getByRole("heading", { name: fixture.title, exact: true })).toHaveCount(0);
      await inspectLayout(page, fixture.name, viewport, testInfo, `question-${index}`);
      const question = await page.evaluate(() => {
        const q = window.eval("currentChallengeQuestions")()[window.eval("state.questionIndex")];
        const answer = window.eval("answerFor")(q);
        return { answer, wrong: q.answerMode === "open" ? Number(answer) + 1 : q.choices.find(choice => String(choice) !== String(answer)) };
      });
      await submit(page, question.wrong);
      await expect(page.locator("[data-npc-answer-state]")).toHaveAttribute("data-npc-answer-state", "retry");
      await expect(page.locator(".npcRetryHint, .challengeFeedback").first()).toBeVisible();
      await inspectLayout(page, fixture.name, viewport, testInfo, `retry-${index}`);
      await submit(page, question.answer);
      await expect(page.getByRole("heading", { name: "Goed zo!", exact: true })).toBeVisible();
      await inspectLayout(page, fixture.name, viewport, testInfo, `correct-${index}`);
      await page.getByRole("button", { name: index === count - 1 ? "Opdracht afronden" : "Volgende vraag", exact: true }).click();
    }
    // Production Pass has 73 frames plus its authored idle beat (over five seconds).
    await expect(page.locator(`[data-npc-challenge='${fixture.id}']`)).toHaveAttribute("data-npc-animation", "completed", { timeout: 12000 });
    expect(errors).toEqual([]);
  });
}

for (const viewport of viewports) test(`future NPC: long name, prompt, wrapped choices and non-square portrait at ${viewport.name}`, async ({ page }, testInfo) => {
  await page.setViewportSize(viewport);
  await start(page, "LVL-0001");
  const name = "Alexandra van de Verre Eilanden";
  await page.evaluate(name => {
    const challenge = window.eval("learningChallengeById")("wind");
    challenge.npc.displayName = name;
    window.eval("openRuneChallenge")("wind");
  }, name);
  await inspectLayout(page, name, viewport, testInfo, "long-prerequisite");
  await page.getByRole("button", { name: "Sluiten" }).click();
  await page.evaluate(() => {
    window.eval("learningChallengeById")("wind").requiresAllOtherChallenges = false;
    window.eval("openRuneChallenge")("wind");
    // Test-only authored data; production questions are never rewritten.
    const q = window.eval("currentChallengeQuestions")()[0];
    Object.assign(q, { answerMode: "multipleChoice", presentation: "story", prompt: "Op de markt liggen zes manden met in iedere mand vier appels. De reizigers verdelen alle appels eerlijk over drie groepen. Hoeveel appels krijgt iedere groep?", choices: ["Acht appels voor iedere groep", "Zes appels voor iedere groep", "Vier appels voor iedere groep", "Twaalf appels voor iedere groep"], answer: "Acht appels voor iedere groep" });
    window.eval("render")();
  });
  // An intentionally non-square image verifies contain sizing, not asset dimensions.
  await page.locator(".npcPortraitFrame img").evaluate(img => { img.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="240" height="400"><rect width="240" height="400" fill="teal"/></svg>'; });
  await inspectLayout(page, name, viewport, testInfo, "long-question");
});

test("Standard headings, header and correct-state composition remain unchanged", async ({ page }) => {
  await start(page, "LVL-0003");
  await page.evaluate(() => window.eval("openRuneChallenge")("harborMap"));
  await expect(page.locator(".npcChallengeLayer, .npcEncounterCard")).toHaveCount(0);
  await expect(page.locator(".challengeHeader h2")).toHaveText("Havenkaart");
  await expect(page.locator(".challengeHeader .eyebrow")).toHaveText("Havenmeester Eivar");
  await page.evaluate(() => window.eval("answerQuestion")(window.eval("answerFor")(window.eval("currentChallengeQuestions")()[0])));
  await expect(page.locator(".successBox > h2")).toHaveText("Goed zo!");
  await expect(page.locator(".runeBurst")).toBeVisible();
  await expect(page.locator(".npcEncounterHeader")).toHaveCount(0);
});

for (const viewport of viewports) test(`NPC clock and retry layout at ${viewport.name}`, async ({ page }, testInfo) => {
  await page.setViewportSize(viewport);
  await start(page, "LVL-0003");
  await page.evaluate(() => {
    window.eval("learningChallengeById")("gateShield").requiresAllOtherChallenges = false;
    window.eval("openRuneChallenge")("gateShield");
    const clock = window.eval("level.learningChallenges").flatMap(c => c.questions.flatMap(slot => slot.variants)).find(q => q.visual?.type === "clock");
    Object.assign(window.eval("currentChallengeQuestions")()[0], structuredClone(clock));
    window.eval("render")();
  });
  await expect(page.locator(".authoredClock")).toBeVisible();
  await inspectLayout(page, "Eivar", viewport, testInfo, "clock");
  await page.evaluate(() => window.eval("answerQuestion")("wrong"));
  await expect(page.locator(".npcRetryHint")).toBeVisible();
  await inspectLayout(page, "Eivar", viewport, testInfo, "clock-retry");
});

test("NPC open input remains usable with reduced keyboard height and visible focus", async ({ page }, testInfo) => {
  const viewport = { width: 810, height: 540 };
  await page.setViewportSize(viewport);
  await start(page, "LVL-0001");
  await page.evaluate(() => {
    window.eval("learningChallengeById")("wind").requiresAllOtherChallenges = false;
    window.eval("openRuneChallenge")("wind");
    Object.assign(window.eval("currentChallengeQuestions")()[0], { answerMode: "open" });
    window.eval("render")();
    document.body.classList.add("keyboard-open");
  });
  await inspectLayout(page, "Freya", viewport, testInfo, "keyboard");
  await page.locator("[data-open-answer]").focus();
  await expect(page.locator("[data-open-answer]")).toHaveCSS("outline-style", "solid");
  await expect(page.locator("[data-open-answer]")).toHaveCSS("outline-width", "3px");
});
