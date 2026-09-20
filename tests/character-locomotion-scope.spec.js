const { test, expect } = require('@playwright/test');
const fs = require('fs'), path = require('path'), vm = require('vm');
const root = path.join(__dirname, '..');
const registry = require('../src/playable-characters');
require('./editor-draft-fixture').preserveEditorDrafts(test, root);
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0].replace(/\/$/, '');

test('global profiles preserve calibrated values and import legacy Sven only', () => {
  const window = {};
  vm.runInNewContext(fs.readFileSync(path.join(root, 'Levels/world-config.js'), 'utf8'), { window });
  const config = window.SVEN_WORLD_CONFIG;
  expect(config.characterLocomotion).toEqual(registry.defaultLocomotion);
  expect(config.characterLocomotion.sven_arc).toMatchObject({ fromIdleMovement: .25, blinkMinimumInterval: 1000, blinkMaximumInterval: 5000 });
  expect(config.characterLocomotion.sven).toMatchObject({ fromIdleMovement: .15, blinkMinimumInterval: 1000, blinkMaximumInterval: 3000 });
  expect(config.levels['LVL-0032'].mainCharacterSettings.sven_arc).toEqual({ spriteScale: 1.15 });
  const migrated = registry.locomotionProfiles(undefined, { fromIdleMovement: .31, shortMoveMovement: 1.75 });
  expect(migrated.sven.fromIdleMovement).toBe(.31);
  expect(migrated.sven).not.toHaveProperty('shortMoveMovement');
  expect(migrated.sven_arc).toEqual(registry.defaultLocomotion.sven_arc);
  expect(registry.locomotionProfiles({ sven: { fromIdleMovement: .19 } }, { fromIdleMovement: .72 }).sven.fromIdleMovement).toBe(.19);
  expect(() => registry.locomotionProfiles({ sven_arc: { blinkMinimumInterval: 10000 } })).toThrow();
  expect(() => registry.locomotionProfiles({ unknown: {} })).toThrow();
});

test('global edits follow each character across levels while presentation and selection stay local', async ({ page }) => {
  const file = path.join(root, 'Levels/world-config.js'), original = fs.readFileSync(file), errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const open = async id => {
    await page.evaluate(id => window.eval('selectLevel')(id, { startImmediately: true, recordStart: false }), id);
    await expect(page.locator('[data-actor="sven"]')).toBeVisible();
  };
  const choose = id => page.evaluate(id => window.eval('selectMainCharacter')(window.eval('level').id, id), id);
  const profile = () => page.evaluate(() => window.eval('locomotionTuning')());
  const save = async () => {
    if (!await page.locator('[data-developer-tools]').count()) await page.keyboard.press('Control+Shift+D');
    await page.locator('[data-debug-action="apply-walkpath"]').click();
    await expect.poll(() => page.evaluate(() => window.eval('walkPathEditor').status)).toBe('Applied');
  };
  try {
    await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({ json: {} }));
    await page.goto(base + '/?dev=editor');
    await open('LVL-0032');
    await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id', 'sven_arc');
    const arc = await profile();
    expect(arc).toEqual(registry.defaultLocomotion.sven_arc);
    await open('LVL-0001');
    const sven = await profile();
    expect(sven).toEqual(registry.defaultLocomotion.sven);
    await choose('sven_arc');
    expect(await profile()).toEqual(arc);
    // A stale bank from the previous ownership model must never override globals.
    await page.evaluate(() => {
      const resolver = window.eval('worldResolver');
      resolver.updateLevelSettings('LVL-0001', { mainCharacterSettings: { sven_arc: { locomotion: { fromIdleMovement: .72 } } } });
    });
    expect(await profile()).toEqual(arc);
    const presentations = [
      { spriteScale: 1.25, movementSpeed: 250, animationSpeed: 1, svenBrightness: .8, svenContrast: .9, svenSaturation: .7, svenWarmth: -.2, svenTint: -.1 },
      { spriteScale: 1.1, movementSpeed: 220, animationSpeed: .8, svenBrightness: 1.2, svenContrast: 1.1, svenSaturation: 1.3, svenWarmth: .2, svenTint: .1 }
    ];
    for (const [index, id] of ['LVL-0032', 'LVL-0001'].entries()) {
      await open(id); await choose('sven_arc');
      await page.evaluate(({ id, values, index }) => {
        for (const [key, value] of Object.entries(values)) window.eval('updateLevelSetting')(id, key, value);
        const resolver = window.eval('worldResolver');
        const cinematic = window.AtlasCinematicSettings.normalize(resolver.levelSettings(id).cinematicLighting);
        cinematic.characters.shadowOpacity = index ? 70 : 30;
        cinematic.characters.colorSpill = index ? .4 : .2;
        resolver.updateLevelSettings(id, { cinematicLighting: cinematic });
      }, { id, values: presentations[index], index });
    }
    await open('LVL-0032');
    await page.keyboard.press('Control+Shift+D');
    await page.locator('[data-editor-mode="characters"]').click();
    const panel = page.locator('[data-editor-panel-key="sven-locomotion"]');
    await panel.locator('summary').click();
    await expect(panel).toContainText('Character / Global');
    const fromIdle = panel.locator('[data-locomotion-setting="fromIdleMovement"]');
    await expect(fromIdle).toHaveValue('25');
    await fromIdle.fill('27'); await fromIdle.dispatchEvent('change');
    await save();
    await page.reload();
    for (const [index, id] of ['LVL-0032', 'LVL-0001'].entries()) {
      await open(id);
      expect(await profile()).toEqual({ ...arc, fromIdleMovement: .27 });
      expect(await page.evaluate(() => window.eval('levelTuning')())).toMatchObject(presentations[index]);
      expect(await page.evaluate(() => window.eval('worldResolver').levelSettings(window.eval('level').id).cinematicLighting.characters))
        .toMatchObject({ shadowOpacity: index ? 70 : 30, colorSpill: index ? .4 : .2 });
    }
    await choose('sven');
    expect(await profile()).toEqual(sven);
    await page.evaluate(() => window.eval('updateLocomotionSetting')('fromIdleMovement', .17));
    await save();
    await page.reload();
    await open('LVL-0001');
    await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id', 'sven');
    expect(await profile()).toEqual({ ...sven, fromIdleMovement: .17 });
    await open('LVL-0032');
    await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id', 'sven_arc');
    expect(await profile()).toEqual({ ...arc, fromIdleMovement: .27 });
    await choose('sven');
    expect(await profile()).toEqual({ ...sven, fromIdleMovement: .17 });
    await choose('sven_arc');
    expect(await profile()).toEqual({ ...arc, fromIdleMovement: .27 });
    expect(errors).toEqual([]);
  } finally { await page.close(); fs.writeFileSync(file, original); }
});
