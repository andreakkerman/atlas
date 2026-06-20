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
  await tap(page.getByRole("button", { name: /De Reis door Europa/ }));
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

    await page.keyboard.press("Control+Shift+C");
    await expect(page.getByText("De reispoort is klaar. Engeland is de volgende halte.")).toBeVisible();

    await page.getByRole("button", { name: "Reispoort", exact: true }).dispatchEvent("click");
    await expect(page.getByRole("heading", { name: "De reis is begonnen!" })).toBeVisible({ timeout: 30000 });
    await expect(page.locator("[data-adventure-team-bar]")).toHaveCount(0);
    await tap(page.getByRole("button", { name: "Naar Engeland" }));

    await expect(page.getByRole("button", { name: "Oude klokkentoren" })).toBeVisible({ timeout: 30000 });
    await expect(page.getByRole("button", { name: "Start avontuur" })).toHaveCount(0);
    const levelId = await page.evaluate(() => window.eval("level.id"));
    expect(levelId).toBe("LVL-0014");
    await expectAudioState(page, "europeGrandTour", "europeEngeland");
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
    await page.keyboard.press("Control+Shift+C");
    await page.getByRole("button", { name: "Reispoort", exact: true }).dispatchEvent("click");
    await expect(page.getByRole("heading", { name: "De reis is begonnen!" })).toBeVisible({ timeout: 30000 });
    await tap(page.getByRole("button", { name: "Naar Engeland" }));
    await expect(page.getByRole("button", { name: "Oude klokkentoren" })).toBeVisible({ timeout: 30000 });

    const before = await page.evaluate(() => window.eval("state.completedRunes.size"));
    await page.getByRole("button", { name: "Reiskristal" }).dispatchEvent("click");
    await expect(page.locator(".teamMessage")).toHaveText(
      "Dat kristal vangt alle kleuren van de stad. Een klein stukje avondlicht in steen."
    );
    const after = await page.evaluate(() => window.eval("state.completedRunes.size"));
    expect({ before, after }).toEqual({ before: 0, after: 0 });
  });

  test("uses authored Atlas Learning challenge schema for the three pilot scenes", async ({ page }) => {
    await page.goto(gameUrl);
    await waitForImages(page);
    const pilot = await page.evaluate(async () => {
      const ids = ["LVL-0013", "LVL-0014", "LVL-0015"];
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
          runeChallengeIds: selected.runes.map((rune) => rune.challengeIds)
        };
      });
    });

    const required = [
      "id", "anchorId", "challengeCharacterId", "domain", "schoolBand", "family",
      "presentation", "answerMode", "prompt", "answer", "hintMinnie", "hintMoose", "explanation"
    ];
    const allChallenges = pilot.flatMap((scene) => scene.challenges);
    expect(allChallenges).toHaveLength(36);
    expect(allChallenges.filter((challenge) => challenge.presentation === "story")).toHaveLength(18);
    expect(allChallenges.filter((challenge) => challenge.presentation === "bare")).toHaveLength(18);
    expect(allChallenges.filter((challenge) => challenge.answerMode === "open")).toHaveLength(12);
    expect(allChallenges.filter((challenge) => challenge.answerMode === "multipleChoice")).toHaveLength(24);

    for (const scene of pilot) {
      expect(scene.challenges).toHaveLength(12);
      expect(scene.runeChallengeIds).toEqual(expect.arrayContaining([
        expect.arrayContaining([expect.any(String), expect.any(String), expect.any(String), expect.any(String)])
      ]));
      for (const challenge of scene.challenges) {
        for (const field of required) expect(challenge[field], `${scene.id}.${challenge.id}.${field}`).toBeDefined();
        expect(challenge.challengeCharacterId).toBe("atlas-de-reiziger");
        expect(challenge.domain).toBe("math");
        expect(challenge.schoolBand).toBe("E5-intended");
        if (challenge.answerMode === "multipleChoice") expect(challenge.choices).toContain(challenge.answer);
      }
    }
  });

  test("plays an open story problem through Minnie, Moose, and assisted completion", async ({ page }) => {
    await startEuropeAdventure(page);
    await page.getByRole("button", { name: "Windmolen" }).dispatchEvent("click");

    await expect(page.locator("[data-challenge-character='atlas-de-reiziger']")).toContainText("Atlas de Reiziger");
    await expect(page.getByText("Aan elke van de 4 wieken hangen 8 linten. Hoeveel linten zijn dat samen?")).toBeVisible();
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

    await page.locator("[data-open-answer]").fill("30");
    await tap(page.getByRole("button", { name: "Controleer" }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "minnie");
    await expect(page.locator(".teamMessage")).toHaveText("Kijk naar 4 gelijke groepjes van 8 linten.");
    await expect(page.locator(".runeChallengeBox").getByText("Kijk naar 4 gelijke groepjes van 8 linten.")).toHaveCount(0);

    await page.locator("[data-open-answer]").fill("31");
    await tap(page.getByRole("button", { name: "Controleer" }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "moose");
    await expect(page.locator(".teamMessage")).toHaveText("Reken 4 × 8 als 2 × 8 en nog eens 2 × 8.");
    await expect(page.locator(".runeChallengeBox").getByText("Reken 4 × 8 als 2 × 8 en nog eens 2 × 8.")).toHaveCount(0);

    await page.locator("[data-open-answer]").fill("33");
    await tap(page.getByRole("button", { name: "Controleer" }));
    await expect(page.locator(".runeChallengeBox").getByText("4 × 8 = 32, dus er hangen 32 linten.")).toBeVisible();
    await tap(page.getByRole("button", { name: "Samen afronden" }));
    await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
    await expect(page.getByText(/Het antwoord is 32/)).toBeVisible();
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
    await tap(page.getByRole("button", { name: "half acht", exact: true }));
    await expect(page.getByRole("heading", { name: "Goed zo!" })).toBeVisible();
    await expect(page.getByText("Ja! Het antwoord is half acht.")).toBeVisible();
  });

  test("renders the three authored clock-reading pilots correctly", async ({ page }) => {
    await page.goto(gameUrl);
    const cases = [
      {
        levelId: "LVL-0013",
        objectName: "Grachtenklok",
        hour: 4,
        minute: 15,
        hourAngle: 127.5,
        minuteAngle: 90,
        answer: "kwart over vier",
        family: "clock_reading_quarter"
      },
      {
        levelId: "LVL-0014",
        objectName: "Oude klokkentoren",
        hour: 7,
        minute: 30,
        hourAngle: 225,
        minuteAngle: 180,
        answer: "half acht",
        family: "clock_reading_half_hour"
      },
      {
        levelId: "LVL-0015",
        objectName: "Dorpsklok",
        hour: 3,
        minute: 10,
        hourAngle: 95,
        minuteAngle: 60,
        answer: "tien over drie",
        family: "clock_reading_five_minutes"
      }
    ];

    for (const item of cases) {
      await page.evaluate(async (levelId) => {
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
      expect(geometry.minuteTransform).toContain(`rotate(${item.minuteAngle}`);
      expect(geometry.hourTransform).toContain(`rotate(${item.hourAngle}`);
    }
  });

  test("uses authored clock hints in the companion bar", async ({ page }) => {
    await startEuropeAdventure(page);
    await page.evaluate(async () => {
      await window.eval("selectLevel")("LVL-0013", { startImmediately: true });
      window.eval("render")();
    });
    await page.getByRole("button", { name: "Grachtenklok", exact: true }).dispatchEvent("click");
    await expect(page.getByText("Hoe laat is het?")).toBeVisible({ timeout: 30000 });

    await tap(page.getByRole("button", { name: "vier uur", exact: true }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "minnie");
    await expect(page.locator(".teamMessage")).toHaveText("Kijk eerst naar de grote wijzer.");

    await tap(page.getByRole("button", { name: "half vijf", exact: true }));
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "moose");
    await expect(page.locator(".teamMessage")).toHaveText(
      "De grote wijzer op de 3 betekent kwart over. De kleine wijzer staat net na de 4."
    );
  });

  test("challenge-complete shortcut unlocks a scene without changing score or persistence", async ({ page }) => {
    await startEuropeAdventure(page);
    const before = await page.evaluate(() => ({
      answered: window.eval("state.answered"),
      attempts: window.eval("state.attempts"),
      completion: localStorage.getItem("atlas-europa-nederland-v1")
    }));

    await page.keyboard.press("Control+Shift+C");
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

  test("shows the standard per-level music and ambience controls in editor mode", async ({ page }) => {
    await page.goto(devGameUrl);
    await page.evaluate(() => localStorage.clear());
    await waitForImages(page);
    await tap(page.getByRole("button", { name: "Start avontuur" }));
    await tap(page.getByRole("button", { name: /De Reis door Europa/ }));
    await tap(page.getByRole("button", { name: "Start avontuur" }));
    await page.keyboard.press("Control+Shift+D");

    await expect(page.locator("[data-audio-editor]")).toBeVisible();
    await expect(page.locator('[data-audio-path="volumes.master"]')).toBeVisible();
    await expect(page.locator('[data-audio-path="levels.LVL-0013.musicVolume"]')).toBeVisible();
    await expect(page.locator('[data-audio-path="levels.LVL-0013.ambienceVolume"]')).toBeVisible();
    await page.keyboard.press("Control+Shift+C");
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
