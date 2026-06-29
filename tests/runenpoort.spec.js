// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const gameUrl = pathToFileURL(path.join(__dirname, "..", "index.html")).toString();
const devGameUrl = `${gameUrl}?dev=editor`;
const editorRuntimeUrl = process.env.ATLAS_EDITOR_URL || devGameUrl;

const runes = [
  { name: "Zonrune" },
  { name: "Steenrune" },
  { name: "Windrune" }
];

const templeChallenges = [
  { name: "Schildenmuur" },
  { name: "Kaarttafel" },
  { name: "Vuurschaal" },
  { name: "Scheepsmodel" }
];

const harborChallenges = [
  { name: "Havenkaart" },
  { name: "Scheepsklok" },
  { name: "Touwrol" },
  { name: "Poortschild" }
];

const nautilusHarborChallenges = [
  { name: "Havenkaart" },
  { name: "Koperen kijker" },
  { name: "Nautiluslamp" }
];

const nautilusSalonChallenges = [
  { name: "Kapiteinskaart" },
  { name: "Groot raam" },
  { name: "Logboektafel" }
];

const nautilusMiniSubChallenges = [
  { name: "Duikpak" },
  { name: "Minisub" },
  { name: "Drukpaneel" }
];

const nautilusIslandChallenges = [
  { name: "Sloep" },
  { name: "Stuurwiel" },
  { name: "Eilandkaart" }
];

const blokkenpoortScenes = [
  {
    levelId: "LVL-0008",
    title: "De Blokkenpoort",
    startButton: /De Blokkenpoort/,
    challenges: ["Diamantzwaard", "Creepermasker", "Donkere poort"],
    finalButton: "Maak het teken wakker",
    unlockLine: "De rechterpoort reageert. Nu netjes verder.",
    exitName: "Rechterpoort",
    rewardHeading: "De kamer ontwaakt!",
    nextButton: "Verder",
    expectedMusic: "minecraft",
    expectedAmbience: "minecraftTunnelWind1"
  },
  {
    levelId: "LVL-0009",
    title: "De Ontwaakte Kamer",
    challenges: ["Wereldkaart", "Open boek", "Kristalkast"],
    finalButton: "Maak het teken wakker",
    unlockLine: "De deur geeft mee. Voorzichtig door.",
    exitName: "IJzeren deur",
    rewardHeading: "De ijzeren deur opent!",
    nextButton: "Naar het strand",
    expectedMusic: "minecraft",
    expectedAmbience: "minecraftTunnelWind2"
  },
  {
    levelId: "LVL-0010",
    title: "De Strandkamer",
    challenges: ["Schatkaart", "Zandkasteel", "Houten boot"],
    finalButton: "Maak het strandteken wakker",
    unlockLine: "De stenen deur is klaar. Warm wordt het wel.",
    exitName: "Stenen deur",
    rewardHeading: "De stranddeur opent!",
    nextButton: "Naar de Nether",
    expectedMusic: "minecraft",
    expectedAmbience: "minecraftBeach"
  },
  {
    levelId: "LVL-0011",
    title: "De Netherproef",
    challenges: ["Brouwtafel", "Netherbol", "Lavakaart"],
    finalButton: "Maak het teken wakker",
    unlockLine: "De deur naar boven opent. Mooi moment om te gaan.",
    exitName: "Oppervlaktedeur",
    rewardHeading: "De deur naar boven opent!",
    nextButton: "Naar boven",
    expectedMusic: "minecraft",
    expectedAmbience: "minecraftLava"
  },
  {
    levelId: "LVL-0012",
    title: "De Weg Naar Huis",
    challenges: ["Thuiskaart", "Betovertafel", "Paars portaal"],
    finalButton: "Maak het laatste teken wakker",
    unlockLine: "De uitgang is klaar. Tijd om naar huis te gaan.",
    exitName: "Uitgang naar huis",
    rewardHeading: "Sven is terug!",
    nextButton: null,
    expectedMusic: "minecraft",
    expectedAmbience: "minecraftBirds"
  }
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

async function enterFromLaunch(page) {
  await expect(page.getByRole("heading", { name: "Atlas" })).toBeVisible();
  await expect(page.getByText("Wat ga je vandaag ontdekken?")).toBeVisible();
  await tap(page.getByRole("button", { name: "Start avontuur" }));
  await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
}

async function expectSpawnAtStartNode(page, levelId) {
  const spawn = await page.evaluate((id) => {
    const level = window.SVEN_LEVEL_DEFINITIONS[id];
    const startNode = level.walkPath.find((node) => node.id === level.player.startNode);
    const actor = document.querySelector("[data-actor='sven']");
    return {
      expectedX: startNode.x,
      expectedY: startNode.y,
      worldX: Number(actor?.getAttribute("data-world-x")),
      worldY: Number(actor?.getAttribute("data-world-y"))
    };
  }, levelId);

  expect(spawn.worldX).toBe(spawn.expectedX);
  expect(spawn.worldY).toBe(spawn.expectedY);
}

async function startAdventure(page, url = gameUrl) {
  await page.goto(url);
  await page.evaluate(() => localStorage.clear());
  await waitForImages(page);
  await enterFromLaunch(page);
  await tap(page.locator(".heroLevelTile"));
  await waitForImages(page);
  await expect(page.getByRole("heading", { name: "De Runenpoort" })).toBeVisible();
  await tap(page.getByRole("button", { name: "Start avontuur" }));
  await waitForImages(page);
  await expectSpawnAtStartNode(page, "LVL-0001");
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
  await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();
  await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "minnie");
  await expect(page.locator("[data-challenge-character='runewachter']")).toHaveCount(0);
  await expect(page.locator(".teamPortraits")).toHaveAttribute("aria-label", "Avonturenteam");
  await expect(page.locator("[data-adventure-team-bar]")).toContainText("Minnie");
  await expect(page.locator("[data-adventure-team-bar]")).toContainText("Moose");
  await expect(page.locator("[data-adventure-team-bar]")).not.toContainText("Sven loopt");
  await expect(page.locator("[data-adventure-team-bar]")).not.toContainText("Runewachter");
  await expect(page.locator(".teamMeta")).toContainText("Bos");
  await expect(page.locator(".teamMeta")).toContainText("0/3 runen");
  await expect(page.locator('[data-guide="minnie"] img')).toBeVisible();
  await expect(page.locator('[data-guide="moose"] img')).toBeVisible();
  await expect(page.locator('[data-guide="minnie"]')).toHaveAttribute("data-active", "true");
  const activePortrait = await page.locator(".teamPortraitActive").boundingBox();
  const inactivePortrait = await page.locator(".teamPortraitInactive").boundingBox();
  const teamCard = await page.locator("[data-adventure-team-bar]").boundingBox();
  expect(Math.abs(activePortrait.width - inactivePortrait.width)).toBeLessThan(8);
  expect(Math.abs(activePortrait.height - inactivePortrait.height)).toBeLessThan(8);
  expect(activePortrait.x).toBeLessThan(inactivePortrait.x);
  expect(teamCard.height).toBeLessThan(100);
  await expect(page.locator(".runeHotspot")).toHaveText(["", "", ""]);
  await expect(page.locator("[data-world-stage]")).toBeVisible();
}

async function travelToTemple(page) {
  await tap(page.getByRole("button", { name: "Bosrune" }));
  await expect(page.getByText("Deze bossteen wijst naar de tempel. Handig, zo'n stenen wegwijzer.")).toBeVisible();

  await walkTowardTemple(page);
  await expect(page.getByText("Sven loopt")).toHaveCount(0);
  await expect(page.getByText("Klik op")).toHaveCount(0);
  await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();
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

async function clickWorldPoint(page, worldX, worldY) {
  const stage = page.locator("[data-world-stage]");
  await expect(stage).toBeVisible();
  const box = await stage.boundingBox();
  if (!box) throw new Error("World stage was not measurable");
  const screen = await page.evaluate(
    ({ x, y }) => {
      const viewportWidth = window.eval("state.viewportWorldWidth");
      const cameraX = window.eval("getCameraX()");
      const currentLevel = window.eval("level");
      return {
        xRatio: (x - cameraX) / viewportWidth,
        yRatio: y / currentLevel.world.height
      };
    },
    { x: worldX, y: worldY }
  );
  await page.mouse.click(box.x + box.width * screen.xRatio, box.y + box.height * screen.yRatio);
}

async function beginFreeWalkToWorldPoint(page, worldX, worldY) {
  await page.evaluate(
    ({ x, y }) => {
      window.eval("beginFreeWalk")({ x, y });
    },
    { x: worldX, y: worldY }
  );
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

async function triggerWorldExit(page, objectName, expectedRewardHeading, options = {}) {
  const target = page.getByRole("button", { name: objectName, exact: true });
  await expect(target).toHaveCount(1);
  await target.dispatchEvent("click");
  await expect(page.getByRole("heading", { name: expectedRewardHeading })).toHaveCount(0);

  if (options.verifyIris) {
    const overlay = page.locator(".exitIrisOverlay");
    await expect(overlay).toBeVisible({ timeout: 22000 });
    await expect(overlay).toHaveAttribute("data-exit-transition", options.exitId);

    const transitionGeometry = await page.evaluate((exitId) => {
      const currentLevel = window.eval("level");
      const currentState = window.eval("state");
      const object = currentLevel.interactiveObjects.find((item) => item.id === exitId);
      const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
      const stageRect = document.querySelector(".stageViewport").getBoundingClientRect();
      const appRect = document.querySelector("#app").getBoundingClientRect();
      const overlayNode = document.querySelector(".exitIrisOverlay");
      const expectedX =
        stageRect.left - appRect.left +
        ((object.center.x - currentState.cameraX) / currentState.viewportWorldWidth) * stageRect.width;
      const expectedY =
        stageRect.top - appRect.top +
        (object.center.y / currentLevel.world.height) * stageRect.height;
      return {
        actorX: currentState.worldX,
        actorY: currentState.worldY,
        approachX: approach.x,
        approachY: approach.y,
        focusX: parseFloat(overlayNode.style.getPropertyValue("--exit-focus-x")),
        focusY: parseFloat(overlayNode.style.getPropertyValue("--exit-focus-y")),
        expectedX,
        expectedY
      };
    }, options.exitId);

    expect(transitionGeometry.actorX).toBeCloseTo(transitionGeometry.approachX, 0);
    expect(transitionGeometry.actorY).toBeCloseTo(transitionGeometry.approachY, 0);
    expect(transitionGeometry.focusX).toBeCloseTo(transitionGeometry.expectedX, 1);
    expect(transitionGeometry.focusY).toBeCloseTo(transitionGeometry.expectedY, 1);
  }

  await expect(page.getByRole("heading", { name: expectedRewardHeading })).toBeVisible({ timeout: 22000 });
}

async function expectBlockedWorldExit(page, { exitName, exitId, blockedText }) {
  const target = page.getByRole("button", { name: exitName, exact: true });
  const actor = page.locator("[data-actor='sven']");
  await expect(target).toBeVisible();

  await target.dispatchEvent("click");
  await expect(actor).toHaveAttribute("data-animation", "walk");
  await expect(page.getByText(blockedText)).toHaveCount(0);

  await expect(page.getByText(blockedText)).toBeVisible({ timeout: 22000 });
  const arrival = await page.evaluate((id) => {
    const currentLevel = window.eval("level");
    const currentState = window.eval("state");
    const object = currentLevel.interactiveObjects.find((item) => item.id === id);
    const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
    return {
      actorX: currentState.worldX,
      actorY: currentState.worldY,
      approachX: approach.x,
      approachY: approach.y,
      screen: currentState.screen
    };
  }, exitId);

  expect(arrival.actorX).toBeCloseTo(arrival.approachX, 0);
  expect(arrival.actorY).toBeCloseTo(arrival.approachY, 0);
  expect(arrival.screen).toBe("scene");
  await expect(page.locator(".exitIrisOverlay")).toHaveCount(0);
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

async function walkRightUntil(page, threshold) {
  const actor = page.locator("[data-actor='sven']");

  for (let step = 0; step < 8; step += 1) {
    const beforeX = Number(await actor.getAttribute("data-world-x"));
    if (beforeX >= threshold) return;

    await clickWalkableGround(page, 0.9);
    await expect(actor).toHaveAttribute("data-animation", "walk");
    await waitForIdle(page);
  }

  await expect
    .poll(async () => Number(await actor.getAttribute("data-world-x")), {
      timeout: 18000,
      message: `Sven should walk right to at least ${threshold}`
    })
    .toBeGreaterThan(threshold);
}

async function getCurrentQuestion(page) {
  return page.evaluate(() => {
    const question = window.eval("currentChallengeQuestions()[state.questionIndex]");
    return {
      prompt: question.prompt || `Hoeveel is ${question.a} x ${question.b}?`,
      correct: question.answer ?? question.a * question.b,
      answerMode: question.answerMode || "multipleChoice",
      authored: Boolean(question.answerMode)
    };
  });
}

async function answerCurrentQuestion(page, options = {}) {
  const { prompt, correct, answerMode, authored } = await getCurrentQuestion(page);
  await expect(page.getByText(prompt)).toBeVisible();

  if (options.answerWrongFirst) {
    if (answerMode === "open") {
      await page.locator("[data-open-answer]").fill(String(Number(correct) + 1));
      await tap(page.getByRole("button", { name: "Controleer" }));
    } else {
      const wrongChoice = await page.locator(".choices button").evaluateAll((buttons, correctValue) => {
        return buttons.map((button) => button.textContent.trim()).find((value) => value !== String(correctValue));
      }, correct);
      await tap(page.locator(`button[data-choice="${wrongChoice}"]`));
    }
    await expect(page.getByText(prompt)).toBeVisible();
    await expect(page.locator(".feedback")).toHaveCount(0);
  }

  if (answerMode === "open") {
    await page.locator("[data-open-answer]").fill(String(correct));
    await tap(page.getByRole("button", { name: "Controleer" }));
  } else {
    await tap(page.locator(`button[data-choice="${correct}"]`));
  }
  await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
  if (authored) {
    await expect(page.getByText(`Ja! Het antwoord is ${correct}.`)).toBeVisible();
  }
  await expect(page.locator("[data-challenge-character]")).toHaveCount(0);
}

async function openChallengePoint(page, challengeName) {
  const target = page.getByRole("button", { name: challengeName });
  await tap(target);
  await expect(page.getByRole("heading", { name: challengeName })).toBeVisible({ timeout: 22000 });
}

async function solveChallengeSet(page, challenge, finalButtonName, challengerName, options = {}) {
  await openChallengePoint(page, challenge.name);
  await expect(page.getByRole("heading", { name: challenge.name })).toBeVisible();
  await expect(page.locator("[data-challenge-character]")).toContainText(challengerName);

  for (let questionIndex = 0; questionIndex < 4; questionIndex += 1) {
    await answerCurrentQuestion(page, {
      answerWrongFirst: options.answerWrongFirst && questionIndex === 0
    });

    const isLastQuestion = questionIndex === 3;
    const nextButton = page.getByRole("button", { name: isLastQuestion ? finalButtonName : "Volgende som" });
    await nextButton.scrollIntoViewIfNeeded();
    await tap(nextButton);
  }
}

async function expectAudioState(page, expectedMusic, expectedAmbience) {
  const audioStatus = await page.evaluate(() => ({
    unlocked: window.eval("audioState.unlocked"),
    musicKey: window.eval("audioState.currentMusicKey"),
    ambienceKey: window.eval("audioState.currentAmbienceKey")
  }));
  expect(audioStatus).toEqual({
    unlocked: true,
    musicKey: expectedMusic,
    ambienceKey: expectedAmbience
  });
}

async function playFullAdventure(page) {
  await startAdventure(page);
  await travelToTemple(page);

  for (const [runeIndex, rune] of runes.entries()) {
    await openChallengePoint(page, rune.name);
    await expect(page.getByRole("heading", { name: rune.name })).toBeVisible();
    await expect(page.locator("[data-challenge-character='runewachter']")).toBeVisible();
    await expect(page.locator("[data-challenge-character='runewachter']")).toContainText("Runewachter");
    await expect(page.locator("[data-challenge-character='runewachter'] img")).toHaveAttribute("src", /viking-spirit\.png/);
    await expect(page.getByText(`Laat de ${rune.name} ontwaken.`)).toHaveCount(0);
    await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();

    for (let questionIndex = 0; questionIndex < 4; questionIndex += 1) {
      await answerCurrentQuestion(page, {
        answerWrongFirst: runeIndex === 0 && questionIndex === 0
      });

      const isLastQuestion = questionIndex === 3;
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
        const expected = await page.evaluate(() => {
          const object = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].interactiveObjects.find((item) => item.id === "zon");
          return { x: object.center.x, y: object.center.y, radius: object.radius };
        });
        expect(coordinates.worldX).toBe(expected.x);
        expect(coordinates.worldY).toBe(expected.y);
        expect(coordinates.radius).toBe(expected.radius);
        expect(coordinates.left).toBeCloseTo((expected.x / 2172) * 100, 3);
        expect(coordinates.top).toBeCloseTo((expected.y / 724) * 100, 3);
      }
    }
  }

  await expect(page.getByText("Alle drie de runen gloeien! De poort kan nu open.")).toBeVisible();
  await expect(page.locator('[data-object="templeGate"]')).toBeVisible();
  await expect(page.locator('[data-adventure-team-bar] [data-action="reward"]')).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await triggerWorldExit(page, "Runenpoort", "De poort gaat open!", {
    verifyIris: true,
    exitId: "templeGate"
  });
  await expect(page.getByText("Bewaker van de Runenpoort")).toBeVisible();
  await expect(page.locator("[data-adventure-team-bar]")).toHaveCount(0);
  await expect(page.locator("[data-challenge-character='runewachter']")).toHaveCount(0);
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

test.describe("SvenAdventure", () => {
  test.setTimeout(180000);

  test("loads the adventure", async ({ page }) => {
    await page.goto(gameUrl);
    await expect(page).toHaveTitle("Atlas");
    await expect(page.getByRole("heading", { name: "Atlas" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Start avontuur" })).toBeVisible();
    await enterFromLaunch(page);
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await expect(page.locator(".heroStartButton")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByText("SVENADVENTURE")).toHaveCount(0);
    await expect(page.getByText("Wat ga je vandaag ontdekken?")).toBeVisible();
    await expect(page.locator('[data-menu-tile="LVL-0001"]')).toBeVisible();
    await expect(page.locator(".heroLevelTile")).toContainText("Verken een vergeten Vikingtempel");
    await expect(page.getByRole("button", { name: /De Nautilus/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Duik in een geheim avontuur/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /De Blokkenpoort/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Ontdek vijf blokkenkamers/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /De Reis door Europa/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Reis door zeven Europese landen/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Leonardo/ })).toBeVisible();
    await expect(page.getByRole("button", { name: /Reis door Italië/ })).toBeVisible();
    await expect(page.locator(".supportingAdventureGrid").getByText("3 plekken", { exact: true })).toBeVisible();
    await expect(page.locator(".supportingAdventureGrid").getByText("4 plekken", { exact: true })).toBeVisible();
    await expect(page.locator(".supportingAdventureGrid").getByText("5 plekken", { exact: true })).toBeVisible();
    await expect(page.locator(".supportingAdventureGrid").getByText("6 plekken", { exact: true })).toBeVisible();
    await expect(page.locator(".supportingAdventureGrid").getByText("8 plekken", { exact: true })).toBeVisible();
    await expect(page.getByRole("button", { name: /De Tempelzaal/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /De Vikinghaven/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Aan boord/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /De Minisub/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /Het Tropische Eiland/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /De Ontwaakte Kamer/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /De Strandkamer/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /De Netherproef/ })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /De Weg Naar Huis/ })).toHaveCount(0);
    await expect(page.locator(".heroLevelTile")).toHaveCount(1);
    await expect(page.locator(".supportingLevelTile")).toHaveCount(5);
    await expect(page.locator(".activeSupportingLevelTile")).toHaveAttribute("data-menu-tile", "LVL-0001");
    await expect(page.locator(".menuCarouselDot")).toHaveCount(5);
    await expect(page.getByRole("button", { name: "Vorig avontuur" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Volgend avontuur" })).toBeVisible();
    const layout = await page.locator(".levelGrid").evaluate((grid) => {
      const hero = grid.querySelector(".heroLevelTile").getBoundingClientRect();
      const cards = [...grid.querySelectorAll(".supportingLevelTile")].map((node) => {
        const box = node.getBoundingClientRect();
        return { id: node.dataset.menuTile, x: box.x, y: box.y, width: box.width, height: box.height };
      });
      return {
        hero: { x: hero.x, y: hero.y, width: hero.width, height: hero.height },
        cards,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth
      };
    });
    expect(layout.hero.width).toBeGreaterThan(layout.cards[0].width * 1.8);
    expect(layout.hero.height).toBeGreaterThan(layout.cards[0].height);
    expect(Math.abs(layout.cards[0].y - layout.cards[1].y)).toBeLessThan(2);
    expect(layout.cards[1].x).toBeGreaterThan(layout.cards[0].x + layout.cards[0].width - 2);
    expect(layout.cards[2].y).toBeGreaterThan(layout.cards[0].y + layout.cards[0].height - 2);
    expect(layout.cards[2].width).toBeGreaterThan(layout.cards[0].width * 1.8);
    expect(layout.scrollWidth).toBeLessThanOrEqual(layout.clientWidth);
    expect(layout.cards.map((card) => card.id)).toEqual(["LVL-0001", "LVL-0004", "LVL-0008", "LVL-0013", "LVL-0021"]);
    await page.getByRole("button", { name: "Volgend avontuur" }).click();
    await expect(page.locator(".heroLevelTile")).toContainText("De Nautilus");
    await expect(page.locator(".activeSupportingLevelTile")).toHaveAttribute("data-menu-tile", "LVL-0004");
    await expect(page.locator(".heroLevelTile")).toHaveClass(/heroLevelTileTransition/);
    const orderAfterNext = await page.locator(".supportingLevelTile").evaluateAll((nodes) => nodes.map((node) => node.dataset.menuTile));
    expect(orderAfterNext).toEqual(layout.cards.map((card) => card.id));
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await page.locator('.menuCarouselDot[data-menu-index="4"]').click();
    await expect(page.locator(".heroLevelTile")).toContainText("Leonardo");
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await expect(page.locator(".levelTile")).toHaveCount(6);
  });

  test("starts adventures directly from hero and supporting menu tiles", async ({ page }) => {
    await page.goto(gameUrl);
    await enterFromLaunch(page);
    await expect(page.locator(".heroStartButton")).toHaveCount(0);

    await tap(page.locator(".heroLevelTile"));
    await expect(page.getByRole("heading", { name: "De Runenpoort" })).toBeVisible();

    await page.getByRole("button", { name: "Terug" }).click();
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await tap(page.locator('[data-menu-tile="LVL-0008"]'));
    await expect(page.getByRole("heading", { name: "De Blokkenpoort" })).toBeVisible();
  });

  test("auto-rotates only the hero while keeping adventure tiles stable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(gameUrl);
    await enterFromLaunch(page);
    await expect(page.locator(".heroLevelTile")).toContainText("De Runenpoort");
    const initialOrder = await page.locator(".supportingLevelTile").evaluateAll((nodes) => nodes.map((node) => node.dataset.menuTile));
    await page.mouse.move(4, 4);

    await page.waitForTimeout(6300);

    await expect(page.locator(".heroLevelTile")).toContainText("De Runenpoort");

    await page.waitForTimeout(4100);

    await expect(page.locator(".heroLevelTile")).toContainText("De Nautilus");
    await expect(page.locator(".activeSupportingLevelTile")).toHaveAttribute("data-menu-tile", "LVL-0004");
    const orderAfterRotate = await page.locator(".supportingLevelTile").evaluateAll((nodes) => nodes.map((node) => node.dataset.menuTile));
    expect(orderAfterRotate).toEqual(initialOrder);
    await expect(page.locator(".heroLevelTile")).toHaveClass(/heroLevelTileTransition/);
  });

  test("unlocks audio on the launch screen and does not show launch again on menu return", async ({ page }) => {
    await page.goto(gameUrl);
    await expect(page.getByRole("heading", { name: "Atlas" })).toBeVisible();

    await tap(page.getByRole("button", { name: "Start avontuur" }));

    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Atlas" })).toHaveCount(0);

    const audioStatus = await page.evaluate(() => ({
      unlocked: window.eval("audioState.unlocked"),
      musicKey: window.eval("audioState.currentMusicKey")
    }));
    expect(audioStatus).toEqual({
      unlocked: true,
      musicKey: "menu"
    });

    await tap(page.locator(".heroLevelTile"));
    await expect(page.getByRole("heading", { name: "De Runenpoort" })).toBeVisible();
    await tap(page.getByRole("button", { name: "Terug" }));
    await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Atlas" })).toHaveCount(0);
  });

  test("includes the core PWA shell metadata", async ({ page }) => {
    await page.goto(gameUrl);
    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute("href", "manifest.webmanifest");
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#10201d");
    await expect(page.locator('meta[name="apple-mobile-web-app-capable"]')).toHaveAttribute("content", "yes");
    await expect(page.locator('meta[name="apple-mobile-web-app-title"]')).toHaveAttribute("content", "Atlas");
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute("href", "assets/branding/icon-180.png");
    const manifest = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "manifest.webmanifest"), "utf8"));
    expect(manifest.name).toBe("Atlas");
    expect(manifest.short_name).toBe("Atlas");
  });

  test("companion portrait space does not advertise dialogue clickability", async ({ page }) => {
    await startAdventure(page);
    const cursorState = await page.evaluate(() => {
      const portraits = document.querySelector(".teamPortraits");
      const speech = document.querySelector(".teamSpeech");
      const bar = document.querySelector("[data-adventure-team-bar]");
      return {
        portraitsCursor: getComputedStyle(portraits).cursor,
        portraitsPointerEvents: getComputedStyle(portraits).pointerEvents,
        speechCursor: getComputedStyle(speech).cursor,
        barCursor: getComputedStyle(bar).cursor
      };
    });
    expect(cursorState).toEqual({
      portraitsCursor: "default",
      portraitsPointerEvents: "auto",
      speechCursor: "pointer",
      barCursor: "default"
    });

    await page.evaluate(() => {
      window.eval("queueCompanionMoment")({ speaker: "moose", text: "Even opletten.", priority: 99 });
    });
    await page.locator(".teamSpeech").click();
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Even opletten.");
  });

  test("plays through the full adventure and persists completion", async ({ page }) => {
    await playFullAdventure(page);

    const completion = await page.evaluate(() => JSON.parse(localStorage.getItem("svenadventure-runenpoort-v1")));
    expect(completion).toMatchObject({
      levelId: "LVL-0001",
      answered: 12,
      firstTryCorrect: 11,
      attempts: 13
    });

    await page.reload();
    const completionAfterReload = await page.evaluate(() => localStorage.getItem("svenadventure-runenpoort-v1"));
    expect(completionAfterReload).toBeTruthy();
  });

  test("continues through the temple interior and Viking harbor", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "The full connected-area chain is covered once on desktop.");

    await playFullAdventure(page);
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const transitionStartedAt = Date.now();
    await tap(page.getByRole("button", { name: "De tempel in" }));

    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Schildenmuur" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0002");
    expect(Date.now() - transitionStartedAt).toBeLessThan(800);
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Minnie");
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Moose");
    await expect(page.locator("[data-adventure-team-bar]")).not.toContainText("Steenpriester");

    for (const challenge of templeChallenges) {
      await solveChallengeSet(page, challenge, "Rond de proef af", "Steenpriester");
    }

    await expect(page.getByText("Alle proeven zijn klaar! De havendeur kan nu open.")).toBeVisible();
    await triggerWorldExit(page, "Havendeur", "De havendeur opent!");
    await expect(page.getByRole("heading", { name: "De havendeur opent!" })).toBeVisible();
    await tap(page.getByRole("button", { name: "Naar de haven" }));

    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Touwrol" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0003");
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Minnie");
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Moose");
    await expect(page.locator("[data-adventure-team-bar]")).not.toContainText("Havenmeester Eivar");

    for (const challenge of harborChallenges) {
      await solveChallengeSet(page, challenge, "Maak de haven klaar", "Havenmeester Eivar");
    }

    await expect(page.getByText("Alles staat klaar! De vertrekpoort kan nu open.")).toBeVisible();
    await triggerWorldExit(page, "Vertrekpoort", "Het schip vertrekt!");
    await expect(page.getByRole("heading", { name: "Het schip vertrekt!" })).toBeVisible();
    await expect(page.getByText("Vikinghaven Helper")).toBeVisible();
    await expect(page.locator("[data-adventure-team-bar]")).toHaveCount(0);
    await expect(page.locator("[data-challenge-character]")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Menu" })).toHaveClass(/primaryButton/);
    await expect(page.getByRole("button", { name: "Speel nog een keer" })).toHaveClass(/secondaryButton/);
  });

  test("plays through the connected Nautilus adventure", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "The full Nautilus chain is covered once on desktop.");

    await page.goto(gameUrl);
    await page.evaluate(() => localStorage.clear());
    await waitForImages(page);
    await enterFromLaunch(page);
    await tap(page.locator('[data-menu-tile="LVL-0004"]'));
    await expect(page.getByRole("heading", { name: "De Nautilus" })).toBeVisible();
    await tap(page.getByRole("button", { name: "Start avontuur" }));
    await expectSpawnAtStartNode(page, "LVL-0004");
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Minnie");
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Moose");
    await expect(page.locator("[data-adventure-team-bar]")).not.toContainText("Kapitein Nemo");

    for (const challenge of nautilusHarborChallenges) {
      await solveChallengeSet(page, challenge, "Maak de toegang klaar", "Kapitein Nemo");
    }

    await expect(page.getByText("Alles klopt. Sven mag naar de Nautilus.")).toBeVisible();
    await triggerWorldExit(page, "Steigerpoort", "De poort naar de Nautilus opent!");
    await expect(page.getByRole("heading", { name: "De poort naar de Nautilus opent!" })).toBeVisible();
    await tap(page.getByRole("button", { name: "Aan boord" }));

    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Kapiteinskaart" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0005");
    for (const challenge of nautilusSalonChallenges) {
      await solveChallengeSet(page, challenge, "Rond de salonproef af", "Kapitein Nemo");
    }

    await expect(page.getByText("De salon is klaar. De ronde deur kan open.")).toBeVisible();
    await triggerWorldExit(page, "Ronde deur", "De ronde deur opent!");
    await expect(page.getByRole("heading", { name: "De ronde deur opent!" })).toBeVisible();
    await tap(page.getByRole("button", { name: "Naar de minisub" }));

    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Duikpak" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0006");
    for (const challenge of nautilusMiniSubChallenges) {
      await solveChallengeSet(page, challenge, "Maak het luik klaar", "Kapitein Nemo");
    }

    await expect(page.getByText("De druk klopt. Het luik kan veilig open.")).toBeVisible();
    await triggerWorldExit(page, "Ontsnappingsluik", "Het luik opent!");
    await expect(page.getByRole("heading", { name: "Het luik opent!" })).toBeVisible();
    await tap(page.getByRole("button", { name: "Naar het eiland" }));

    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Sloep" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0007");
    for (const challenge of nautilusIslandChallenges) {
      await solveChallengeSet(page, challenge, "Maak de route klaar", "Kapitein Nemo");
    }

    await expect(page.getByText("De route klopt. Sven kan naar buiten.")).toBeVisible();
    await triggerWorldExit(page, "Eilandpoort", "Sven bereikt het eiland!");
    await expect(page.getByRole("heading", { name: "Sven bereikt het eiland!" })).toBeVisible();
    await expect(page.getByText("Nautilus Ontsnapper")).toBeVisible();
    await expect(page.locator("[data-adventure-team-bar]")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Menu" })).toHaveClass(/primaryButton/);
    await expect(page.getByRole("button", { name: "Speel nog een keer" })).toHaveClass(/secondaryButton/);

    const completion = await page.evaluate(() => JSON.parse(localStorage.getItem("svenadventure-tropisch-eiland-v1")));
    expect(completion).toMatchObject({
      levelId: "LVL-0007",
      answered: 12,
      firstTryCorrect: 12,
      attempts: 12
    });
  });

  test("plays through the connected Blokkenpoort adventure", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop-chromium", "The full Blokkenpoort chain is covered once on desktop.");

    await page.goto(gameUrl);
    await page.evaluate(() => localStorage.clear());
    await waitForImages(page);
    await enterFromLaunch(page);
    await tap(page.getByRole("button", { name: blokkenpoortScenes[0].startButton }));

    for (const [sceneIndex, scene] of blokkenpoortScenes.entries()) {
      if (sceneIndex === 0) {
        await expect(page.getByRole("heading", { name: scene.title })).toBeVisible();
        await tap(page.getByRole("button", { name: "Start avontuur" }));
      } else {
        await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
      }
      await expectSpawnAtStartNode(page, scene.levelId);
      await expectAudioState(page, scene.expectedMusic, scene.expectedAmbience);
      await expect(page.locator("[data-adventure-team-bar]")).toContainText("Minnie");
      await expect(page.locator("[data-adventure-team-bar]")).toContainText("Moose");
      await expect(page.locator("[data-adventure-team-bar]")).not.toContainText("Dutchtuber Job");

      for (const challengeName of scene.challenges) {
        await solveChallengeSet(page, { name: challengeName }, scene.finalButton, "Dutchtuber Job");
      }

      await expect(page.getByText(scene.unlockLine)).toBeVisible();
      await triggerWorldExit(page, scene.exitName, scene.rewardHeading);
      await expect(page.getByRole("heading", { name: scene.rewardHeading })).toBeVisible();
      await expect(page.locator("[data-adventure-team-bar]")).toHaveCount(0);

      if (sceneIndex < blokkenpoortScenes.length - 1) {
        await expect(page.getByRole("button", { name: scene.nextButton })).toBeVisible();
        const musicBeforeNext = await page.evaluate(() => window.eval("audioState.currentMusicKey"));
        expect(musicBeforeNext).toBe("minecraft");
        await tap(page.getByRole("button", { name: scene.nextButton }));
        const nextScene = blokkenpoortScenes[sceneIndex + 1];
        await expect(page.getByRole("button", { name: nextScene.challenges[0] })).toBeVisible();
        await expectSpawnAtStartNode(page, nextScene.levelId);
        await expectAudioState(page, "minecraft", nextScene.expectedAmbience);
      }
    }

    await expect(page.getByText("Blokkenpoort Held")).toBeVisible();
    await expect(page.getByRole("button", { name: "Menu" })).toHaveClass(/primaryButton/);
    await expect(page.getByRole("button", { name: "Speel nog een keer" })).toHaveClass(/secondaryButton/);

    const completion = await page.evaluate(() => JSON.parse(localStorage.getItem("atlas-blokkenpoort-weg-naar-huis-v1")));
    expect(completion).toMatchObject({
      levelId: "LVL-0012",
      answered: 12,
      firstTryCorrect: 12,
      attempts: 12
    });
  });

  test("all challenge sources contain at least four available questions", async ({ page }) => {
    await page.goto(gameUrl);
    await waitForImages(page);
    const levels = await page.evaluate(async () => {
      for (const entry of window.SVEN_LEVEL_MANIFEST.levels) {
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
      return Object.values(window.SVEN_LEVEL_DEFINITIONS).map((level) => {
        const authoredById = new Map((level.learningChallenges || []).map((challenge) => [challenge.id, challenge]));
        return {
          id: level.id,
          runes: level.runes.map((rune) => ({
            id: rune.id,
            count: rune.challengeId
              ? authoredById.get(rune.challengeId)?.questions?.length || 0
              : rune.challengeIds?.length || rune.questions?.length || 0,
            questions: rune.questions || null
          }))
        };
      });
    });

    for (const loadedLevel of levels) {
      const exactQuestions = new Set();
      for (const rune of loadedLevel.runes) {
        expect(rune.count, `${loadedLevel.id}.${rune.id}`).toBeGreaterThanOrEqual(4);
        for (const question of rune.questions || []) {
          expect(Number.isInteger(question.a), `${loadedLevel.id}.${rune.id} a`).toBe(true);
          expect(Number.isInteger(question.b), `${loadedLevel.id}.${rune.id} b`).toBe(true);
          expect(question.a, `${loadedLevel.id}.${rune.id} a range`).toBeGreaterThanOrEqual(1);
          expect(question.a, `${loadedLevel.id}.${rune.id} a range`).toBeLessThanOrEqual(10);
          expect(question.b, `${loadedLevel.id}.${rune.id} b range`).toBeGreaterThanOrEqual(1);
          expect(question.b, `${loadedLevel.id}.${rune.id} b range`).toBeLessThanOrEqual(10);
          const key = `${question.a}x${question.b}`;
          expect(exactQuestions.has(key), `${loadedLevel.id} duplicate ${key}`).toBe(false);
          exactQuestions.add(key);
        }
      }
    }
  });

  test("levels use authored companion moments instead of status narration", async ({ page }) => {
    await page.goto(gameUrl);
    await waitForImages(page);
    const levels = await page.evaluate(async () => {
      for (const entry of window.SVEN_LEVEL_MANIFEST.levels) {
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
      return Object.values(window.SVEN_LEVEL_DEFINITIONS).map((level) => ({
        id: level.id,
        levelSemantics: level.levelSemantics,
        companionMoments: level.companionMoments,
        objectIds: level.interactiveObjects.map((object) => object.id),
        ambientIds: level.interactiveObjects.filter((object) => object.type === "ambient").map((object) => object.id),
        challengeIds: level.runes.map((rune) => rune.id)
      }));
    });

    const allowedEvents = new Set([
      "LEVEL_ENTER",
      "OBJECT_FIRST_LOOK",
      "AMBIENT_ATTENTION",
      "AMBIENT_ATTENTION_FIRST",
      "HOTSPOT_ATTENTION_FIRST",
      "CHALLENGE_OPEN",
      "LEVEL_PROGRESS_MILESTONE",
      "EXIT_BLOCKED",
      "CHALLENGE_FAIL_1",
      "CHALLENGE_FAIL_2",
      "CHALLENGE_SUCCESS",
      "PATH_UNLOCKED",
      "ADVENTURE_COMPLETE",
      "COMPANION_CONVERSATION"
    ]);

    for (const loadedLevel of levels) {
      expect(loadedLevel.levelSemantics?.setting, `${loadedLevel.id} setting`).toBeTruthy();
      expect(loadedLevel.levelSemantics?.companionFocus?.minnie, `${loadedLevel.id} Minnie focus`).toBeTruthy();
      expect(loadedLevel.levelSemantics?.companionFocus?.moose, `${loadedLevel.id} Moose focus`).toBeTruthy();
      expect(loadedLevel.companionMoments.length, `${loadedLevel.id} moments`).toBeGreaterThanOrEqual(4);
      expect(loadedLevel.companionMoments.length, `${loadedLevel.id} moments`).toBeLessThanOrEqual(12);

      for (const moment of loadedLevel.companionMoments) {
        expect(allowedEvents.has(moment.event), `${loadedLevel.id}.${moment.id} event`).toBe(true);
        expect(["minnie", "moose"]).toContain(moment.speaker);
        expect(moment.text).not.toMatch(/Sven loopt|Klik op|Je moet/i);
        if (moment.objectId) expect(loadedLevel.objectIds).toContain(moment.objectId);
        if (moment.challengeId) expect(loadedLevel.challengeIds).toContain(moment.challengeId);
      }

      for (const challengeId of loadedLevel.challengeIds) {
        expect(
          loadedLevel.companionMoments.some(
            (moment) => moment.event === "HOTSPOT_ATTENTION_FIRST" && moment.challengeId === challengeId
          ),
          `${loadedLevel.id}.${challengeId} challenge attention`
        ).toBe(true);
      }
      for (const ambientId of loadedLevel.ambientIds) {
        expect(
          loadedLevel.companionMoments.some(
            (moment) =>
              ["AMBIENT_ATTENTION", "AMBIENT_ATTENTION_FIRST"].includes(moment.event) &&
              moment.objectId === ambientId
          ),
          `${loadedLevel.id}.${ambientId} ambient attention`
        ).toBe(true);
      }
      if (Number(loadedLevel.id.slice(-4)) >= 4) {
        for (const event of [
          "LEVEL_ENTER",
          "CHALLENGE_SUCCESS",
          "LEVEL_PROGRESS_MILESTONE",
          "EXIT_BLOCKED",
          "PATH_UNLOCKED",
          "ADVENTURE_COMPLETE"
        ]) {
          expect(
            loadedLevel.companionMoments.some((moment) => moment.event === event),
            `${loadedLevel.id}.${event}`
          ).toBe(true);
        }
      }
    }
  });

  test("authors the legacy adventures with Atlas Learning slots and variants", async ({ page }) => {
    await page.goto(gameUrl);
    const levels = await page.evaluate(async () => {
      const ids = Array.from({ length: 12 }, (_, index) => `LVL-${String(index + 1).padStart(4, "0")}`);
      for (const id of ids) {
        if (window.SVEN_LEVEL_DEFINITIONS[id]) continue;
        const entry = window.SVEN_LEVEL_MANIFEST.levels.find((item) => item.id === id);
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = entry.script;
          script.onload = resolve;
          script.onerror = reject;
          document.head.append(script);
        });
      }
      return ids.map((id) => {
        const selected = window.SVEN_LEVEL_DEFINITIONS[id];
        return {
          id,
          characterId: selected.challengeCharacter.id,
          challenges: selected.learningChallenges,
          runes: selected.runes,
          clockLabel: selected.interactiveObjects.find((item) => item.id === "shipCompass")?.label
        };
      });
    });

    const required = [
      "id", "domain", "schoolBand", "family", "presentation",
      "answerMode", "prompt", "answer", "hintMinnie", "hintMoose", "explanation"
    ];
    const challenges = levels.flatMap((level) => level.challenges);
    const slots = challenges.flatMap((challenge) => challenge.questions);
    const variants = slots.flatMap((slot) => slot.variants);

    expect(challenges).toHaveLength(38);
    expect(slots).toHaveLength(152);
    expect(variants).toHaveLength(304);
    expect(variants.filter((variant) => variant.family === "clock_reading_five_minutes")).toHaveLength(8);
    expect(variants.filter((variant) => variant.family.includes("multiplication"))).toHaveLength(208);
    expect(variants.filter((variant) => variant.family.includes("division"))).toHaveLength(74);

    for (const level of levels) {
      expect(level.challenges).toHaveLength(level.runes.length);
      expect(level.runes.map((rune) => rune.challengeId)).toEqual(level.challenges.map((challenge) => challenge.id));
      for (const challenge of level.challenges) {
        expect(challenge.anchorId).toBe(challenge.id);
        expect(challenge.challengeCharacterId).toBe(level.characterId);
        expect(challenge.questions).toHaveLength(4);
        for (const slot of challenge.questions) {
          expect(slot.variants).toHaveLength(2);
          for (const variant of slot.variants) {
            for (const field of required) expect(variant[field], `${level.id}.${variant.id}.${field}`).toBeDefined();
            expect(variant.domain).toBe("math");
            expect(variant.schoolBand).toBe("E5-intended");
            if (variant.answerMode === "multipleChoice") {
              expect(variant.choices).toContain(variant.answer);
              expect(new Set(variant.choices.map(String)).size).toBe(variant.choices.length);
            }
          }
        }
      }
    }

    expect(levels.find((level) => level.id === "LVL-0003").clockLabel).toBe("Scheepsklok");
  });

  test("keeps the Scheepsklok variant stable through hints, rerenders, and assisted completion", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      Math.random = () => 0;
      await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
      window.eval("render")();
    });
    await page.getByRole("button", { name: "Scheepsklok", exact: true }).dispatchEvent("click");
    await expect(page.getByText("Hoe laat is het?")).toBeVisible({ timeout: 30000 });
    await expect(page.locator("[data-clock-visual]")).toHaveAttribute("data-clock-hour", "8");
    await expect(page.locator("[data-clock-visual]")).toHaveAttribute("data-clock-minute", "10");
    await expect(page.getByRole("button", { name: "Tien over acht", exact: true })).toBeVisible();

    const before = await page.evaluate(() => ({
      id: window.eval("state.activeQuestions[0].id"),
      prompt: window.eval("state.activeQuestions[0].prompt"),
      answer: window.eval("state.activeQuestions[0].answer")
    }));
    for (const wrongAnswer of ["Vijf over acht", "Tien voor acht", "Kwart over acht"]) {
      await tap(page.getByRole("button", { name: wrongAnswer, exact: true }));
      await page.evaluate(() => {
        Math.random = () => 0.999;
        window.eval("render")();
      });
      const current = await page.evaluate(() => ({
        id: window.eval("state.activeQuestions[0].id"),
        prompt: window.eval("state.activeQuestions[0].prompt"),
        answer: window.eval("state.activeQuestions[0].answer")
      }));
      expect(current).toEqual(before);
    }
    await expect(page.getByRole("button", { name: "Samen afronden" })).toBeVisible();
    await tap(page.getByRole("button", { name: "Samen afronden" }));
    await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
  });

  test("challenge shortcut completes an old scene without learning evidence", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      localStorage.clear();
      await window.eval("selectLevel")("LVL-0003", { startImmediately: true });
      window.eval("render")();
    });
    const before = await page.evaluate(() => ({
      answered: window.eval("state.answered"),
      attempts: window.eval("state.attempts"),
      completion: localStorage.getItem("svenadventure-vikinghaven-v1")
    }));
    await page.keyboard.press("Control+Shift+L");
    const after = await page.evaluate(() => ({
      completed: window.eval("state.completedRunes.size"),
      total: window.eval("level.runes.length"),
      answered: window.eval("state.answered"),
      attempts: window.eval("state.attempts"),
      completion: localStorage.getItem("svenadventure-vikinghaven-v1")
    }));
    expect(after).toEqual({
      completed: 4,
      total: 4,
      answered: before.answered,
      attempts: before.attempts,
      completion: before.completion
    });
  });

  test("editor shortcut transition from LVL-0001 renders LVL-0002", async ({ page }) => {
    const pageErrors = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await startAdventure(page, editorRuntimeUrl);
    await page.keyboard.press("Control+Shift+L");
    await triggerWorldExit(page, "Runenpoort", "De poort gaat open!");
    await tap(page.getByRole("button", { name: "De tempel in" }));

    await expect(page.getByRole("heading", { name: "De Tempelzaal" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Schildenmuur" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Wandfakkel" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Havendeur" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0002");
    expect(pageErrors).toEqual([]);
  });

  test("missing optional tracked hotspot warns and leaves the scene renderable", async ({ page }) => {
    const warnings = [];
    page.on("console", (message) => {
      if (message.type() === "warning") warnings.push(message.text());
    });
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0002", { startImmediately: true });
      window.eval("level.interactiveObjects = level.interactiveObjects.filter((object) => object.id !== 'templeTorch')");
      window.eval("render")();
    });

    await expect(page.getByRole("button", { name: "Schildenmuur" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Havendeur" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Wandfakkel" })).toHaveCount(0);
    expect(warnings.some((warning) =>
      warning.includes('hotspot "templeTorch"') &&
      warning.includes('interactiveObject "templeTorch"')
    )).toBe(true);
  });

  test("direct LVL-0002 load continues to LVL-0003", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0002", { startImmediately: true });
      window.eval("render")();
    });
    await expect(page.getByRole("button", { name: "Schildenmuur" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Wandfakkel" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0002");

    await page.keyboard.press("Control+Shift+L");
    await triggerWorldExit(page, "Havendeur", "De havendeur opent!");
    await tap(page.getByRole("button", { name: "Naar de haven" }));

    await expect(page.getByRole("button", { name: "Touwrol" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Raaf" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0003");
  });

  test("shows challenge attention while walking and opens on one tap", async ({ page }) => {
    await startAdventure(page);
    await travelToTemple(page);

    const sun = page.getByRole("button", { name: "Zonrune" });
    await tap(sun);
    await expect(sun).toHaveClass(/runeSelected/);
    await expect(page.getByText("De Zonrune voelt warm. Welke som laat haar feller gloeien?")).toBeVisible();
    await expect(page.locator("[data-actor='sven']")).toHaveAttribute("data-animation", "walk");
    await expect(page.locator(".teamMessage")).toHaveText("De Zonrune voelt warm. Welke som laat haar feller gloeien?");
    await expect(page.getByRole("heading", { name: "Zonrune" })).toBeVisible({ timeout: 22000 });
    await expect(page.locator("[data-adventure-team-bar]")).toBeVisible();
  });

  test("shows authored first attention in Nautilus and Blokkenpoort scenes", async ({ page }) => {
    await page.goto(gameUrl);
    await waitForImages(page);
    await enterFromLaunch(page);
    await tap(page.locator('[data-menu-tile="LVL-0004"]'));
    await tap(page.getByRole("button", { name: "Start avontuur" }));

    const harborMap = page.getByRole("button", { name: "Havenkaart" });
    await tap(harborMap);
    await expect(page.locator(".teamMessage")).toHaveText(
      "Die havenkaart zit vol lijnen. Welke route hoort bij de Nautilus?"
    );
    await expect(page.locator("[data-actor='sven']")).toHaveAttribute("data-animation", "walk");
    await expect(page.getByRole("heading", { name: "Havenkaart" })).toBeVisible({ timeout: 22000 });

    await page.reload();
    await waitForImages(page);
    await enterFromLaunch(page);
    await tap(page.locator('[data-menu-tile="LVL-0008"]'));
    await tap(page.getByRole("button", { name: "Start avontuur" }));

    const sword = page.getByRole("button", { name: "Diamantzwaard" });
    await tap(sword);
    await expect(page.locator(".teamMessage")).toHaveText(
      "Dat diamantzwaard glimt veel te trots. Er zit vast een patroon in."
    );
    await expect(page.locator("[data-actor='sven']")).toHaveAttribute("data-animation", "walk");
    await expect(page.getByRole("heading", { name: "Diamantzwaard" })).toBeVisible({ timeout: 22000 });
  });

  test("keeps ambient points separate from challenges", async ({ page }) => {
    await startAdventure(page);

    await tap(page.getByRole("button", { name: "Bosrune" }));
    await expect(page.getByText("Deze bossteen wijst naar de tempel. Handig, zo'n stenen wegwijzer.")).toBeVisible();
    await expect(page.locator("[data-challenge-character]")).toHaveCount(0);
    expect(await page.evaluate(() => window.eval("state.selectedChallengeId"))).toBeNull();
    expect(await page.evaluate(() => window.eval("state.activeRuneId"))).toBeNull();
  });

  test("opens the Viking harbour rope challenge on one tap", async ({ page }) => {
    await startAdventure(page);
    await travelToTemple(page);

    for (const challenge of runes) {
      await solveChallengeSet(page, challenge, "Maak de rune wakker", "Runewachter");
    }
    await triggerWorldExit(page, "Runenpoort", "De poort gaat open!");
    await tap(page.getByRole("button", { name: "De tempel in" }));
    await waitForImages(page);
    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Schildenmuur" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0002");

    for (const challenge of templeChallenges) {
      await solveChallengeSet(page, challenge, "Rond de proef af", "Steenpriester");
    }
    await triggerWorldExit(page, "Havendeur", "De havendeur opent!");
    await tap(page.getByRole("button", { name: "Naar de haven" }));
    await waitForImages(page);
    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Touwrol" })).toBeVisible();
    await expectSpawnAtStartNode(page, "LVL-0003");

    const rope = page.getByRole("button", { name: "Touwrol" });
    await tap(rope);
    await expect(rope).toHaveClass(/runeSelected/);
    await expect(page.getByText("Een nette rol touw. In een haven is dat bijna verdacht netjes.")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Touwrol" })).toBeVisible({ timeout: 22000 });
    await expect(page.locator("[data-challenge-character='havenmeester-eivar']")).toBeVisible();
  });

  test("cancels a pending challenge when the player walks elsewhere", async ({ page }) => {
    await startAdventure(page);
    await travelToTemple(page);

    await tap(page.getByRole("button", { name: "Windrune" }));
    await expect(page.getByText("De Windrune suist zacht. Ik denk dat ze op een antwoord wacht.")).toBeVisible();
    await clickWalkableGround(page, 0.35);
    await waitForIdle(page);
    await expect(page.getByRole("heading", { name: "Windrune" })).toHaveCount(0);
    expect(await page.evaluate(() => window.eval("state.selectedChallengeId"))).toBeNull();
  });

  test("guide portraits play non-overlapping purr audio without changing dialogue", async ({ page }) => {
    await startAdventure(page);
    await page.evaluate(() => {
      Math.random = () => 0;
      window.eval("guideBlinkRuntime.minnie.ready = true");
      window.eval("guideBlinkRuntime.moose.ready = true");
    });

    const before = await page.locator(".teamMessage").textContent();
    await page.evaluate(() => window.eval("runGuideBlink")("minnie", { doubleBlink: true }));
    await expect(page.locator('[data-guide-image="minnie"]')).toHaveAttribute("src", "assets/guides/minnie_blink.png");
    await tap(page.locator('[data-purr-guide="minnie"]'));
    await expect(page.locator('[data-purr-guide="minnie"]')).toHaveClass(/teamPortraitPurring/);
    await expect(page.locator('[data-guide-image="minnie"]')).toHaveAttribute("src", "assets/guides/minnie.png");
    const first = await page.evaluate(() => ({
      guide: window.eval("audioState.purringGuide"),
      key: window.eval("audioState.lastPurrByGuide.minnie"),
      message: window.eval("state.guideMessage.text"),
      blinking: window.eval("guideBlinkRuntime.minnie.blinking"),
      pendingFrames: window.eval("guideBlinkRuntime.minnie.sequenceTimers.size")
    }));
    expect(first).toEqual({ guide: "minnie", key: "minnie1", message: before, blinking: false, pendingFrames: 0 });

    await tap(page.locator('[data-purr-guide="moose"]'));
    expect(await page.evaluate(() => window.eval("audioState.purringGuide"))).toBe("minnie");
    await expect(page.locator(".teamMessage")).toHaveText(before);

    await page.evaluate(() => window.eval("audioState.purr").dispatchEvent(new Event("ended")));
    await expect(page.locator('[data-purr-guide="minnie"]')).not.toHaveClass(/teamPortraitPurring/);
    await tap(page.locator('[data-purr-guide="minnie"]'));
    expect(await page.evaluate(() => window.eval("audioState.lastPurrByGuide.minnie"))).toBe("minnie2");
    await page.evaluate(() => window.eval("audioState.purr").dispatchEvent(new Event("ended")));

    await page.evaluate(() => window.eval("runGuideBlink")("moose", { doubleBlink: true }));
    await expect(page.locator('[data-guide-image="moose"]')).toHaveAttribute("src", "assets/guides/moose_blink.png");
    await tap(page.locator('[data-purr-guide="moose"]'));
    await expect(page.locator('[data-purr-guide="moose"]')).toHaveClass(/teamPortraitPurring/);
    await expect(page.locator('[data-guide-image="moose"]')).toHaveAttribute("src", "assets/guides/moose.png");
    expect(await page.evaluate(() => window.eval("audioState.lastPurrByGuide.moose"))).toBe("moose1");
    await page.evaluate(() => window.eval("audioState.purr").dispatchEvent(new Event("ended")));
    await expect(page.locator('[data-purr-guide="moose"]')).not.toHaveClass(/teamPortraitPurring/);
  });

  test("keeps Minnie left and Moose right when the active speaker changes", async ({ page }) => {
    await startAdventure(page);

    const positionsBefore = await page.evaluate(() => ({
      minnie: document.querySelector('[data-guide="minnie"]').getBoundingClientRect().x,
      moose: document.querySelector('[data-guide="moose"]').getBoundingClientRect().x,
      height: document.querySelector("[data-adventure-team-bar]").getBoundingClientRect().height
    }));
    expect(positionsBefore.minnie).toBeLessThan(positionsBefore.moose);
    expect(positionsBefore.height).toBeLessThan(100);

    await page.evaluate(() => {
      window.eval("setGuideMessage")({ speaker: "moose", text: "Touw vast, dan varen." }, "moose");
      window.eval("render")();
    });
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "moose");
    await expect(page.locator('[data-guide="moose"]')).toHaveClass(/teamPortraitActive/);
    await expect(page.locator('[data-guide="minnie"]')).toHaveClass(/teamPortraitInactive/);

    const positionsAfter = await page.evaluate(() => ({
      minnie: document.querySelector('[data-guide="minnie"]').getBoundingClientRect().x,
      moose: document.querySelector('[data-guide="moose"]').getBoundingClientRect().x
    }));
    expect(positionsAfter.minnie).toBeLessThan(positionsAfter.moose);
  });

  test("shows reliable locked exit, progress and unlocked feedback", async ({ page }) => {
    await startAdventure(page);

    await expectBlockedWorldExit(page, {
      exitName: "Runenpoort",
      exitId: "templeGate",
      blockedText: "De poort zit dicht. Eerst nog 3 runen."
    });

    await startAdventure(page);
    await travelToTemple(page);
    await solveChallengeSet(page, { name: "Zonrune" }, "Maak de rune wakker", "Runewachter");
    await expect(page.getByText("1 van de 3 runen klaar. Nog 2 te gaan.")).toBeVisible();

    await solveChallengeSet(page, { name: "Steenrune" }, "Maak de rune wakker", "Runewachter");
    await solveChallengeSet(page, { name: "Windrune" }, "Maak de rune wakker", "Runewachter");
    await expect(page.getByText("Alle drie de runen gloeien! De poort kan nu open.")).toBeVisible();
  });

  test("keeps Nautilus and Blokkenpoort exits visible and blocks them on arrival", async ({ page }) => {
    await page.goto(gameUrl);
    await waitForImages(page);
    await enterFromLaunch(page);
    await tap(page.locator('[data-menu-tile="LVL-0004"]'));
    await tap(page.getByRole("button", { name: "Start avontuur" }));
    await expectBlockedWorldExit(page, {
      exitName: "Steigerpoort",
      exitId: "boardingGate",
      blockedText: "De steigerpoort blijft dicht. Eerst nog 3 havenproeven."
    });

    await page.goto(gameUrl);
    await waitForImages(page);
    await enterFromLaunch(page);
    await tap(page.locator('[data-menu-tile="LVL-0008"]'));
    await tap(page.getByRole("button", { name: "Start avontuur" }));
    await expectBlockedWorldExit(page, {
      exitName: "Rechterpoort",
      exitId: "rightGate",
      blockedText: "De rechterpoort blijft dicht. Eerst nog 3 bloktekens."
    });
  });

  test("challenge overlay only keeps challenger, title, question and answers", async ({ page }) => {
    await startAdventure(page);
    await travelToTemple(page);
    await openChallengePoint(page, "Zonrune");

    await expect(page.locator("[data-challenge-character='runewachter'] img")).toBeVisible();
    await expect(page.getByText(/Runewachter - Rune 1\/4/)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Zonrune" })).toBeVisible();
    await expect(page.locator(".sum")).toBeVisible();
    await expect(page.locator(".choices button")).toHaveCount(4);
    await expect(page.locator(".feedback")).toHaveCount(0);
    await expect(page.locator(".runeWhisper")).toHaveCount(0);
    await expect(page.getByText("Laat de Zonrune ontwaken.")).toHaveCount(0);
    await expect(page.locator("[data-adventure-team-bar]")).toHaveCount(0);
  });

  test("requires four correct answers before a challenge completes", async ({ page }) => {
    await startAdventure(page);
    await travelToTemple(page);

    await openChallengePoint(page, "Zonrune");
    await expect(page.getByText(/Runewachter - Rune 1\/4/)).toBeVisible();

    for (let index = 1; index <= 3; index += 1) {
      await answerCurrentQuestion(page);
      await expect(page.getByRole("button", { name: "Volgende som" })).toBeVisible();
      await tap(page.getByRole("button", { name: "Volgende som" }));
      await expect(page.getByText(new RegExp(`Runewachter - Rune ${index + 1}/4`))).toBeVisible();
    }

    await answerCurrentQuestion(page);
    await expect(page.getByRole("button", { name: "Maak de rune wakker" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Volgende som" })).toHaveCount(0);
  });

  test("randomizes question order between fresh challenge sessions", async ({ page }) => {
    async function openFirstZonQuestion(randomValue) {
      await startAdventure(page);
      await travelToTemple(page);
      await page.evaluate((value) => {
        Math.random = () => value;
      }, randomValue);
      await openChallengePoint(page, "Zonrune");
      const question = await getCurrentQuestion(page);
      return `${question.a}x${question.b}`;
    }

    const lowRandomFirstQuestion = await openFirstZonQuestion(0);
    await page.reload();
    const highRandomFirstQuestion = await openFirstZonQuestion(0.99);

    expect(lowRandomFirstQuestion).not.toBe(highRandomFirstQuestion);
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
    expect(alignment.targets.length).toBe(5);
    expect(alignment.stepRange).toBeGreaterThan(70);

    await page.keyboard.press("Control+Shift+D");
    await expect(page.locator("[data-debug-overlay]")).toBeVisible();
    await expect(page.locator("[data-developer-tools]")).toBeVisible();
    await expect(page.getByText("Developer Tools")).toBeVisible();
    await expect(page.getByText("Current Mode: Runtime")).toBeVisible();
    await expect(page.getByText("Level Editing: Unavailable")).toBeVisible();
    await expect(page.getByText("Status: Read-only mode")).toBeVisible();
    await expect(page.getByText("Run npm run dev:editor")).toBeVisible();
    await expect(page.getByText("Open http://127.0.0.1:4173/?dev=editor")).toBeVisible();
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
    await expect(page.getByRole("button", { name: /De Runenpoort/ })).toBeVisible();
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
    await expect(page.getByText("Current Mode: Level Editing")).toBeVisible();
    await expect(page.getByText("Draft Status: Clean")).toBeVisible();
    await expect(page.getByText("How to use:")).toBeVisible();
    await expect(page.getByText("Drag walkPath points")).toBeVisible();
    await expect(page.getByText("Drag object centers or radius handles")).toBeVisible();
    await expect(page.getByText("Adjust audio volumes")).toBeVisible();
    await expect(page.getByText("Test movement")).toBeVisible();
    await expect(page.getByText("Apply saves level and audio files")).toBeVisible();
    await expect(page.getByText("Revert restores the saved path, objects and audio")).toBeVisible();
    await expect(page.getByText("Real files change only when Apply is pressed.")).toBeVisible();
    await expect(page.locator("[data-audio-editor]")).toBeVisible();
    await expect(page.locator('[data-audio-path="levels.LVL-0001.musicVolume"]')).toBeVisible();
    await expect(page.locator('[data-audio-path="levels.LVL-0001.ambienceVolume"]')).toBeVisible();
    await expect(page.locator('[data-audio-path="volumes.companionPurr"]')).toBeVisible();
    await expect(page.getByText("Companion purr volume")).toBeVisible();
    await expect(page.locator("[data-sfx-test]")).toHaveCount(7);
    await expect(page.getByRole("button", { name: "Apply" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Revert" })).toBeEnabled();

    const before = await page.evaluate(() => {
      const point = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].walkPath[6];
      return { x: point.x, y: point.y };
    });
    const point = page.locator('[data-walkpath-index="6"] circle');
    const box = await point.boundingBox();
    if (!box) throw new Error("walkPath point was not measurable");

    await point.evaluate((node) => {
      const box = node.getBoundingClientRect();
      const startX = box.x + box.width / 2;
      const startY = box.y + box.height / 2;
      node.dispatchEvent(new PointerEvent("pointerdown", {
        bubbles: true,
        clientX: startX,
        clientY: startY,
        pointerId: 1
      }));
      window.dispatchEvent(new PointerEvent("pointermove", {
        bubbles: true,
        clientX: startX + 24,
        clientY: startY - 12,
        pointerId: 1
      }));
      window.dispatchEvent(new PointerEvent("pointerup", {
        bubbles: true,
        clientX: startX + 24,
        clientY: startY - 12,
        pointerId: 1
      }));
    });

    const after = await page.evaluate(() => {
      const level = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"];
      const point = level.walkPath[6];
      return {
        x: point.x,
        y: point.y,
        derivedNodeCount: level.walkGraph.nodes.length,
        authoredNodeCount: level.walkPath.length
      };
    });
    expect(after.x !== before.x || after.y !== before.y).toBe(true);
    expect(after.derivedNodeCount).toBeGreaterThan(after.authoredNodeCount);
    await expect(page.getByText("Draft Status: Modified")).toBeVisible();

    const objectBefore = await page.evaluate(() => {
      const object = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].interactiveObjects.find((item) => item.id === "forestRune");
      return { x: object.center.x, y: object.center.y, radius: object.radius };
    });
    const objectCenter = page.locator('[data-object-id="forestRune"][data-object-drag="center"]');
    const objectCenterBox = await objectCenter.boundingBox();
    if (!objectCenterBox) throw new Error("interactive object center was not measurable");

    await page.mouse.move(objectCenterBox.x + objectCenterBox.width / 2, objectCenterBox.y + objectCenterBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(objectCenterBox.x + objectCenterBox.width / 2 + 18, objectCenterBox.y + objectCenterBox.height / 2 + 10);
    await page.mouse.up();

    const objectAfterMove = await page.evaluate(() => {
      const object = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].interactiveObjects.find((item) => item.id === "forestRune");
      const hotspot = document.querySelector('[data-object="forestRune"]');
      return {
        x: object.center.x,
        y: object.center.y,
        radius: object.radius,
        hotspotX: Number(hotspot.getAttribute("data-world-center-x")),
        hotspotY: Number(hotspot.getAttribute("data-world-center-y"))
      };
    });
    expect(objectAfterMove.x !== objectBefore.x || objectAfterMove.y !== objectBefore.y).toBe(true);
    expect(objectAfterMove.hotspotX).toBe(objectAfterMove.x);
    expect(objectAfterMove.hotspotY).toBe(objectAfterMove.y);
    await expect(page.getByText(/forestRune: x/)).toBeVisible();

    const radiusHandle = page.locator('[data-object-id="forestRune"][data-object-drag="radius"]');
    const radiusBox = await radiusHandle.boundingBox();
    if (!radiusBox) throw new Error("interactive object radius handle was not measurable");

    await page.mouse.move(radiusBox.x + radiusBox.width / 2, radiusBox.y + radiusBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(radiusBox.x + radiusBox.width / 2 + 22, radiusBox.y + radiusBox.height / 2);
    await page.mouse.up();

    const objectAfterRadius = await page.evaluate(() => {
      const object = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].interactiveObjects.find((item) => item.id === "forestRune");
      const hotspot = document.querySelector('[data-object="forestRune"]');
      return {
        radius: object.radius,
        hotspotRadius: Number(hotspot.getAttribute("data-radius"))
      };
    });
    expect(objectAfterRadius.radius).toBeGreaterThan(objectAfterMove.radius);
    expect(objectAfterRadius.hotspotRadius).toBe(objectAfterRadius.radius);

    const audioBefore = await page.evaluate(() => {
      return {
        master: window.SVEN_AUDIO_CONFIG.volumes.master,
        music: window.SVEN_AUDIO_CONFIG.levels["LVL-0001"].musicVolume,
        companionPurr: window.SVEN_AUDIO_CONFIG.volumes.companionPurr
      };
    });
    await page.locator('[data-audio-path="volumes.master"]').fill("0.37");
    await page.locator('[data-audio-path="levels.LVL-0001.musicVolume"]').fill("0.33");
    await page.locator('[data-audio-path="volumes.companionPurr"]').fill("0.44");
    const audioAfter = await page.evaluate(() => {
      return {
        master: window.SVEN_AUDIO_CONFIG.volumes.master,
        music: window.SVEN_AUDIO_CONFIG.levels["LVL-0001"].musicVolume,
        companionPurr: window.SVEN_AUDIO_CONFIG.volumes.companionPurr
      };
    });
    expect(audioAfter).toEqual({ master: 0.37, music: 0.33, companionPurr: 0.44 });
    await expect(page.getByText("Draft Status: Modified")).toBeVisible();

    await tap(page.getByRole("button", { name: "Revert" }));
    await expect(page.getByText("Draft Status: Reverted")).toBeVisible();
    const objectAfterRevert = await page.evaluate(() => {
      const object = window.SVEN_LEVEL_DEFINITIONS["LVL-0001"].interactiveObjects.find((item) => item.id === "forestRune");
      return { x: object.center.x, y: object.center.y, radius: object.radius };
    });
    expect(objectAfterRevert).toEqual(objectBefore);
    const audioAfterRevert = await page.evaluate(() => {
      return {
        master: window.SVEN_AUDIO_CONFIG.volumes.master,
        music: window.SVEN_AUDIO_CONFIG.levels["LVL-0001"].musicVolume,
        companionPurr: window.SVEN_AUDIO_CONFIG.volumes.companionPurr
      };
    });
    expect(audioAfterRevert).toEqual(audioBefore);
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
    await expect(page.locator("[data-adventure-team-bar]")).not.toContainText("Sven loopt");
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

    await expect(page.getByText("Sven loopt")).toHaveCount(0);
    await expect(page.getByText("Klik op")).toHaveCount(0);
    await expect
      .poll(async () => {
        return page.locator(".worldTrack").evaluate((node) => Number(node.style.getPropertyValue("--camera-percent")));
      })
      .toBeGreaterThan(20);

    const templeX = Number(await actor.getAttribute("data-world-x"));
    const cameraBeforeReverse = await page.locator(".worldTrack").evaluate((node) =>
      Number(node.style.getPropertyValue("--camera-x"))
    );
    const leftTarget = await page.evaluate(() => Math.max(window.eval("getCameraX()") + 40, window.eval("state.worldX") - 420));
    await beginFreeWalkToWorldPoint(page, leftTarget, 600);
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

    await openChallengePoint(page, "Steenrune");
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
    await expect(page.locator("[data-challenge-character='runewachter']")).toBeVisible();
    await expect(page.getByText("Laat de Zonrune ontwaken.")).toHaveCount(0);

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
