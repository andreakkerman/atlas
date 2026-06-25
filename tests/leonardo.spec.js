// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = pathToFileURL(path.join(root, "index.html")).toString();
const leonardoIds = ["LVL-0021", "LVL-0022", "LVL-0023", "LVL-0024", "LVL-0025", "LVL-0026"];

function loadScript(relativePath, context) {
  vm.runInContext(fs.readFileSync(path.join(root, relativePath), "utf8"), context, { filename: relativePath });
}

function loadLeonardoLevels() {
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {}, SVEN_LEVEL_MANIFEST: null, SVEN_AUDIO_CONFIG: null } };
  vm.createContext(context);
  loadScript("Levels/manifest.js", context);
  loadScript("src/audio-config.js", context);
  for (const id of leonardoIds) loadScript(`Levels/${id}/level.js`, context);
  return {
    manifest: context.window.SVEN_LEVEL_MANIFEST,
    audio: context.window.SVEN_AUDIO_CONFIG,
    levels: leonardoIds.map((id) => context.window.SVEN_LEVEL_DEFINITIONS[id])
  };
}

async function startLevel(page, levelId) {
  await page.goto(gameUrl);
  await page.evaluate(async (id) => {
    localStorage.clear();
    await window.eval("selectLevel")(id, { startImmediately: true });
  }, levelId);
  await page.waitForFunction((id) => window.eval("level").id === id, levelId);
  await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
}

async function openIntroFromMenu(page) {
  await page.goto(gameUrl);
  await page.evaluate(() => localStorage.clear());
  await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
  await page.getByRole("button", { name: "Start avontuur" }).click();
  await expect(page.getByRole("heading", { name: "Kies een avontuur" })).toBeVisible();
  await page.getByRole("button", { name: /Leonardo/ }).click();
}

async function openChallengeAtApproach(page, objectId) {
  await page.evaluate((id) => {
    const currentLevel = window.eval("level");
    const currentState = window.eval("state");
    const rune = currentLevel.runes.find((item) => item.id === id);
    const object = currentLevel.interactiveObjects.find((item) => item.id === id);
    const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
    currentState.worldX = approach.x;
    currentState.worldY = approach.y;
    currentState.cameraX = undefined;
    window.eval("render")();
    window.eval("beginInteraction")(rune, "rune");
  }, objectId);
}

async function moveCameraToObject(page, objectId) {
  await page.evaluate((id) => {
    const currentLevel = window.eval("level");
    const currentState = window.eval("state");
    const object = currentLevel.interactiveObjects.find((item) => item.id === id);
    const approach = currentLevel.walkGraph.nodes.find((node) => node.id === object.approachNode);
    currentState.worldX = approach.x;
    currentState.worldY = approach.y;
    currentState.cameraX = undefined;
    window.eval("render")();
  }, objectId);
}

async function completeWithShortcutAndExit(page, exitId, exitName, rewardHeading) {
  await page.keyboard.press("Control+Shift+L");
  await moveCameraToObject(page, exitId);
  const exit = page.getByRole("button", { name: exitName, exact: true });
  await expect(exit).toBeVisible();
  await exit.click();
  await expect(page.getByRole("heading", { name: rewardHeading })).toBeVisible({ timeout: 22000 });
  await expect(page.locator(".rewardScreen")).not.toContainText("undefined");
  await expect(page.locator(".rewardScreen")).not.toContainText("NaN");
}

test.describe("Leonardo da Vinci adventure", () => {
  test("shows the correct adventure menu identity and separated Rome intro", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(() => localStorage.clear());
    await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
    await page.getByRole("button", { name: "Start avontuur" }).click();
    const leonardoCard = page.getByRole("button", { name: /Leonardo/ });
    await expect(leonardoCard).toContainText("Leonardo’s onvoltooide atlas");
    await expect(leonardoCard).toContainText("Reis door Italië en ontdek hoe Leonardo keek, mat, onderzocht en ontwierp.");
    await expect(leonardoCard).toContainText("6 plekken");
    await expect(leonardoCard).not.toContainText("Leonardo da Vinci - Rome");

    await leonardoCard.click();
    await expect(page.getByRole("heading", { name: "Rome" })).toBeVisible();
    await expect(page.locator(".introTheme")).toHaveText("Observatie en licht");
    await expect(page.getByRole("heading", { name: /Rome - Observatie/ })).toHaveCount(0);
  });

  test("registers the six-level chain, assets, audio, anchors, variants and clocks", () => {
    const { manifest, audio, levels } = loadLeonardoLevels();
    const manifestIds = manifest.levels.map((level) => level.id);
    expect(manifestIds.slice(-6)).toEqual(leonardoIds);
    expect(manifest.levels.find((level) => level.id === "LVL-0021").hiddenFromMenu).toBeFalsy();
    for (let index = 1; index < leonardoIds.length; index += 1) {
      const entry = manifest.levels.find((level) => level.id === leonardoIds[index]);
      expect(entry.hiddenFromMenu).toBe(true);
      expect(entry.connectedFrom).toBe(leonardoIds[index - 1]);
    }

    expect(audio.tracks.music.leonardoLevel).toBe("assets/audio/music/leonardo-level.mp3");
    expect(Object.values(audio.tracks.ambience).filter((track) => track.includes("ambience/leonardo/")).length).toBe(6);
    for (const id of leonardoIds) expect(audio.levels[id].music).toBe("leonardoLevel");

    const challengeCounts = levels.map((level) => level.learningChallenges.length);
    expect(challengeCounts).toEqual([4, 4, 5, 4, 4, 5]);
    const allChallenges = levels.flatMap((level) => level.learningChallenges.map((challenge) => ({ level, challenge })));
    expect(allChallenges).toHaveLength(26);
    for (const { level, challenge } of allChallenges) {
      expect(challenge.challengeCharacterId).toBe("leonardo-da-vinci");
      expect(level.challengeCharacter.portrait).toContain("leonardo-da-vinci.png");
      expect(challenge.questions).toHaveLength(4);
      for (const question of challenge.questions) {
        expect(question.variants).toHaveLength(2);
        for (const variant of question.variants) {
          expect(variant.schoolBand).toBe("E5-intended");
          expect(variant.domain).toBe("math");
          expect(["bare", "story"]).toContain(variant.presentation);
          expect(variant.hintMinnie).toBeTruthy();
          expect(variant.hintMoose).toBeTruthy();
          expect(variant.explanation).toBeTruthy();
          if (variant.answerMode === "multipleChoice") expect(variant.choices).toContain(variant.answer);
        }
      }
    }

    const clocks = allChallenges
      .filter(({ challenge }) => challenge.questions.some((question) => question.variants.some((variant) => variant.visual?.type === "clock")))
      .map(({ level, challenge }) => `${level.id}.${challenge.id}`);
    expect(clocks).toEqual([
      "LVL-0023.waterClock",
      "LVL-0024.flightControls",
      "LVL-0025.pulleyPanel",
      "LVL-0026.centralCodex",
      "LVL-0026.designBoard"
    ]);
  });

  test("assigns Rome central codex and mechanical model approach points in route order", () => {
    const { levels } = loadLeonardoLevels();
    const rome = levels.find((item) => item.id === "LVL-0021");
    const central = rome.walkPath.find((point) => point.id === "centralCodex-approach");
    const mechanical = rome.walkPath.find((point) => point.id === "mechanicalModel-approach");
    const centralObject = rome.interactiveObjects.find((item) => item.id === "centralCodex");
    const mechanicalObject = rome.interactiveObjects.find((item) => item.id === "mechanicalModel");

    expect(rome.walkPath.map((point) => point.id)).toEqual([
      "start",
      "opticsTable-approach",
      "centralCodex-approach",
      "mechanicalModel-approach",
      "engineeringTable-approach",
      "procenoGate-approach"
    ]);
    expect(centralObject.approachNode).toBe("centralCodex-approach");
    expect(mechanicalObject.approachNode).toBe("mechanicalModel-approach");
    expect(central.x).toBe(centralObject.center.x);
    expect(mechanical.x).toBe(mechanicalObject.center.x);
    expect(central.x).toBeLessThan(mechanical.x);
  });

  test("shows Leonardo as challenger and renders a clock challenge", async ({ page }) => {
    await startLevel(page, "LVL-0023");
    await page.evaluate(() => { Math.random = () => 0; });
    await openChallengeAtApproach(page, "waterClock");
    await expect(page.getByRole("heading", { name: "Waterklok" })).toBeVisible();
    await expect(page.locator("[data-challenge-character='leonardo-da-vinci']")).toBeVisible();
    await expect(page.locator("[data-challenge-character='leonardo-da-vinci']")).toContainText("Leonardo da Vinci");
    await expect(page.locator("[data-clock-visual]")).toBeVisible();
    await expect(page.locator("[data-clock-hour='2'][data-clock-minute='0']")).toBeVisible();
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Minnie");
    await expect(page.locator("[data-adventure-team-bar]")).toContainText("Moose");
  });

  test("uses opdrachten progress wording and Moose locked-exit feedback", async ({ page }) => {
    await startLevel(page, "LVL-0021");
    await expect(page.locator(".teamMeta")).toContainText("0/4 opdrachten");
    await expect(page.locator(".teamMeta")).not.toContainText("runen");

    await moveCameraToObject(page, "procenoGate");
    await page.getByRole("button", { name: "Poort naar Proceno", exact: true }).click();
    await expect(page.getByText("De doorgang blijft nog dicht. Los eerst alle opdrachten in deze werkplaats op.")).toBeVisible({ timeout: 22000 });
    await expect(page.locator("[data-adventure-team-bar]")).toHaveAttribute("data-active-speaker", "moose");
    await expect(page.locator(".teamSpeaker")).toHaveText("Moose");
    expect(await page.evaluate(() => window.eval("level").id)).toBe("LVL-0021");
  });

  test("loads each Leonardo level with the expected music and ambience", async ({ page }) => {
    const expectedAmbience = {
      "LVL-0021": "leonardoRome",
      "LVL-0022": "leonardoProceno",
      "LVL-0023": "leonardoUmbria",
      "LVL-0024": "leonardoMarche",
      "LVL-0025": "leonardoFlorence",
      "LVL-0026": "leonardoVinci"
    };
    for (const id of leonardoIds) {
      await startLevel(page, id);
      await page.evaluate(() => {
        window.eval("audioState.unlocked = true");
        window.eval("syncAudioForState")();
      });
      const state = await page.evaluate(() => ({
        levelId: window.eval("level").id,
        musicKey: window.eval("audioState.currentMusicKey"),
        ambienceKey: window.eval("audioState.currentAmbienceKey"),
        sceneEffects: window.eval("level").sceneEffects
      }));
      expect(state).toEqual({
        levelId: id,
        musicKey: "leonardoLevel",
        ambienceKey: expectedAmbience[id],
        sceneEffects: undefined
      });
    }
  });

  test("unlocks the Rome exit after all visible challenges are complete", async ({ page }) => {
    await startLevel(page, "LVL-0021");
    const before = await page.evaluate(() => ({
      completed: window.eval("state.completedRunes.size"),
      total: window.eval("level.runes.length")
    }));
    expect(before).toEqual({ completed: 0, total: 4 });

    const after = await page.evaluate(() => {
      window.eval("completeCurrentSceneChallenges")();
      return {
        completed: window.eval("state.completedRunes.size"),
        total: window.eval("level.runes.length")
      };
    });
    expect(after).toEqual({ completed: 4, total: 4 });
    await expect(page.getByRole("button", { name: "Poort naar Proceno" })).toBeEnabled();
  });

  test("continues through the Leonardo completion chain and shows the Vinci finale", async ({ page }) => {
    const scenes = [
      { id: "LVL-0021", exitId: "procenoGate", exitName: "Poort naar Proceno", reward: "Rome afgerond", next: "LVL-0022" },
      { id: "LVL-0022", exitId: "umbriaGate", exitName: "Pad naar Umbrië", reward: "Proceno afgerond", next: "LVL-0023" },
      { id: "LVL-0023", exitId: "marcheGate", exitName: "Pad naar Marche", reward: "Umbrie afgerond", next: "LVL-0024" },
      { id: "LVL-0024", exitId: "florenceGate", exitName: "Route naar Florence", reward: "Marche afgerond", next: "LVL-0025" },
      { id: "LVL-0025", exitId: "vinciGate", exitName: "Deur naar Vinci", reward: "Florence afgerond", next: "LVL-0026" }
    ];

    await startLevel(page, "LVL-0021");
    for (const scene of scenes) {
      await expect.poll(() => page.evaluate(() => window.eval("level").id)).toBe(scene.id);
      await completeWithShortcutAndExit(page, scene.exitId, scene.exitName, scene.reward);
      await expect(page.locator(".rewardScreen")).toContainText("De volgende Italiaanse werkplaats is bereikbaar.");
      await expect(page.locator(".stats")).toContainText("opdrachten");
      await expect(page.locator(".stats")).toContainText("in één keer goed");
      await expect(page.locator(".stats")).toContainText("pogingen");
      await expect(page.locator(".stats")).not.toContainText(/^\s*0 opdrachten/m);
      await expect(page.getByRole("button", { name: "Ga verder" })).toBeVisible();
      await page.getByRole("button", { name: "Ga verder" }).click();
      await expect.poll(() => page.evaluate(() => window.eval("level").id)).toBe(scene.next);
    }

    await completeWithShortcutAndExit(page, "workshopExit", "Ontwerp afronden", "Leonardo’s atlas voltooid");
    await expect(page.locator(".rewardScreen")).toContainText("Sven heeft gekeken, gemeten, onderzocht en zijn eigen ontwerp voltooid.");
    await expect(page.getByRole("button", { name: "Ga verder" })).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Menu" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Speel nog een keer" })).toBeVisible();
  });

  test("keeps Runenpoort rune wording unchanged", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(() => localStorage.clear());
    await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
    await page.getByRole("button", { name: "Start avontuur" }).click();
    await page.getByRole("button", { name: /De Runenpoort/ }).click();
    await page.getByRole("button", { name: "Start avontuur" }).click();
    await expect(page.locator(".teamMeta")).toContainText("0/3 runen");
  });
});
