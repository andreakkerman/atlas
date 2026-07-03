// @ts-check
const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { pathToFileURL } = require("url");

const root = path.join(__dirname, "..");
const gameUrl = pathToFileURL(path.join(root, "index.html")).toString();
const egyptIds = ["LVL-0027", "LVL-0028", "LVL-0029", "LVL-0030", "LVL-0031"];

function loadScript(relativePath, context) {
  vm.runInContext(fs.readFileSync(path.join(root, relativePath), "utf8"), context, { filename: relativePath });
}

function loadEgyptLevels() {
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {}, SVEN_LEVEL_MANIFEST: null, SVEN_AUDIO_CONFIG: null } };
  vm.createContext(context);
  loadScript("Levels/manifest.js", context);
  loadScript("src/audio-config.js", context);
  for (const id of egyptIds) loadScript(`Levels/${id}/level.js`, context);
  return {
    manifest: context.window.SVEN_LEVEL_MANIFEST,
    audio: context.window.SVEN_AUDIO_CONFIG,
    levels: egyptIds.map((id) => context.window.SVEN_LEVEL_DEFINITIONS[id])
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

test.describe("Egypt adventure", () => {
  test("registers the five-level chain, Nebu, audio, challenges and clock anchors", () => {
    const { manifest, audio, levels } = loadEgyptLevels();
    const manifestIds = manifest.levels.map((level) => level.id);
    expect(manifestIds.slice(-5)).toEqual(egyptIds);
    expect(manifest.levels.find((level) => level.id === "LVL-0027").hiddenFromMenu).toBeFalsy();
    for (let index = 1; index < egyptIds.length; index += 1) {
      const entry = manifest.levels.find((level) => level.id === egyptIds[index]);
      expect(entry.hiddenFromMenu).toBe(true);
      expect(entry.connectedFrom).toBe(egyptIds[index - 1]);
    }

    expect(audio.tracks.music.egyptAdventure).toBe("assets/audio/music/egypt_adventure.mp3");
    expect(audio.tracks.ambience.egyptPyramidBuild).toBe("assets/audio/ambience/egypt/pyramid_build.mp3");
    expect(audio.tracks.ambience.egyptAbuSimbel).toBe("assets/audio/ambience/egypt/abu_simbel.mp3");
    expect(audio.levels["LVL-0027"].ambience).toBeNull();
    expect(audio.levels["LVL-0028"].ambience).toBe("egyptPyramidBuild");
    expect(audio.levels["LVL-0029"].ambience).toBeNull();
    expect(audio.levels["LVL-0030"].ambience).toBe("egyptAbuSimbel");
    expect(audio.levels["LVL-0031"].ambience).toBeNull();

    for (const level of levels) {
      expect(level.challengeCharacter.id).toBe("CHR-EGYPT-NEBU");
      expect(level.challengeCharacter.name).toBe("Nebu");
      expect(level.challengeCharacter.portrait).toContain("nebu.png");
      expect(level.learningChallenges).toHaveLength(4);
      expect(level.runes).toHaveLength(4);
      expect(level.interactiveObjects.filter((object) => object.type === "exit")).toHaveLength(1);
      for (const challenge of level.learningChallenges) {
        expect(challenge.challengeCharacterId).toBe("CHR-EGYPT-NEBU");
        expect(challenge.questions).toHaveLength(4);
        for (const question of challenge.questions) {
          expect(question.variants).toHaveLength(2);
          for (const variant of question.variants) {
            expect(variant.schoolBand).toBe("E5-intended");
            expect(variant.hintMinnie).toBeTruthy();
            expect(variant.hintMoose).toBeTruthy();
            if (variant.answerMode === "multipleChoice") expect(variant.choices).toContain(variant.answer);
          }
        }
      }
    }

    const clocks = levels
      .flatMap((level) => level.learningChallenges.map((challenge) => ({ level, challenge })))
      .filter(({ challenge }) => challenge.questions.some((question) => question.variants.some((variant) => variant.visual?.type === "clock")))
      .map(({ level, challenge }) => `${level.id}.${challenge.id}`);
    expect(clocks).toEqual(["LVL-0028.tripodInstrument", "LVL-0030.sundial"]);
  });

  test("shows the menu tile and renders the Egypt clock challenges", async ({ page }) => {
    await page.goto(gameUrl);
    await page.evaluate(() => localStorage.clear());
    await page.waitForFunction(() => [...document.images].every((image) => image.complete && image.naturalWidth > 0));
    await page.getByRole("button", { name: "Start avontuur" }).click();
    const egyptCard = page.locator('[data-menu-tile="LVL-0027"]');
    await expect(egyptCard).toContainText("Cairo Museum");
    await expect(egyptCard).toContainText("5 plaatsen · 20 opdrachten");

    await startLevel(page, "LVL-0028");
    await page.evaluate(() => { Math.random = () => 0; });
    await openChallengeAtApproach(page, "tripodInstrument");
    await expect(page.getByRole("heading", { name: "Meetinstrument" })).toBeVisible();
    await expect(page.locator("[data-challenge-character='CHR-EGYPT-NEBU']")).toContainText("Nebu");
    await expect(page.locator("[data-clock-visual]")).toBeVisible();

    await startLevel(page, "LVL-0030");
    await page.evaluate(() => { Math.random = () => 0; });
    await openChallengeAtApproach(page, "sundial");
    await expect(page.getByRole("heading", { name: "Zonnewijzer" })).toBeVisible();
    await expect(page.locator("[data-clock-visual]")).toBeVisible();
  });

  test("uses Egypt music, explicit null ambience, and unlocks the Cairo sarcophagus exit", async ({ page }) => {
    const expectedAmbience = {
      "LVL-0027": null,
      "LVL-0028": "egyptPyramidBuild",
      "LVL-0029": null,
      "LVL-0030": "egyptAbuSimbel",
      "LVL-0031": null
    };

    for (const id of egyptIds) {
      await startLevel(page, id);
      await page.evaluate(() => {
        window.eval("audioState.unlocked = true");
        window.eval("syncAudioForState")();
      });
      const state = await page.evaluate(() => ({
        levelId: window.eval("level").id,
        musicKey: window.eval("audioState.currentMusicKey"),
        ambienceKey: window.eval("audioState.currentAmbienceKey")
      }));
      expect(state).toEqual({
        levelId: id,
        musicKey: "egyptAdventure",
        ambienceKey: expectedAmbience[id]
      });
    }

    await startLevel(page, "LVL-0027");
    await moveCameraToObject(page, "museumSarcophagus");
    await expect(page.getByRole("button", { name: "Gouden sarcofaag", exact: true })).toHaveAttribute("data-exit-ready", "false");
    await expect(page.getByRole("button", { name: "Anubisbeeld", exact: true })).toHaveAttribute("data-hotspot-cue", "challenge");

    await page.evaluate(() => window.eval("completeCurrentSceneChallenges")());
    await expect(page.getByRole("button", { name: "Gouden sarcofaag", exact: true })).toHaveAttribute("data-exit-ready", "true");
  });
});
