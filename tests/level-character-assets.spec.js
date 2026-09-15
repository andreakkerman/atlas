const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { createRequire } = require('module');
const { test, expect } = require('@playwright/test');

const root = path.resolve(__dirname, '..');
const script = path.join(root, 'scripts/validate-levels.js');
const discoveryScript = path.join(root, 'scripts/generate-character-manifest.js');
const harborScript = path.join(root, 'Levels/LVL-0003/level.js');
const manifestScript = path.join(root, 'Levels/manifest.js');
const scriptRequire = createRequire(script);
const load = (file) => {
  const context = { window: { SVEN_LEVEL_DEFINITIONS: {} } };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), context);
  return context.window;
};
const harbor = load(harborScript).SVEN_LEVEL_DEFINITIONS['LVL-0003'];
const manifest = load(manifestScript).SVEN_LEVEL_MANIFEST;
const fields = ['challengeArt', 'companion.portrait', 'challengeCharacter.portrait'];

// Run the actual CLI against the real harbor, overriding reads only. No level,
// draft, manifest or character asset is written by these regression fixtures.
function validate({ field, asset, missingIdle = false } = {}) {
  const level = structuredClone(harbor);
  if (field) {
    const keys = field.split('.');
    const leaf = keys.pop();
    const owner = keys.reduce((object, key) => object[key], level);
    owner[leaf] = asset;
  }
  const files = new Map([
    [harborScript, `window.SVEN_LEVEL_DEFINITIONS['LVL-0003'] = ${JSON.stringify(level)};`],
    [manifestScript, `window.SVEN_LEVEL_MANIFEST = ${JSON.stringify({ ...manifest, levels: manifest.levels.filter(entry => entry.id === 'LVL-0003') })};`]
  ]);
  const fixtureFs = {
    ...fs,
    readFileSync(file, ...args) { return files.get(path.resolve(String(file))) ?? fs.readFileSync(file, ...args); },
    readdirSync(file, ...args) {
      if (missingIdle && path.resolve(String(file)) === path.join(root, 'assets/characters/eivar/idle')) return [];
      return fs.readdirSync(file, ...args);
    }
  };
  const discoveryModule = { exports: {} };
  vm.runInNewContext(fs.readFileSync(discoveryScript, 'utf8'), {
    __dirname: path.dirname(discoveryScript), module: discoveryModule,
    require: name => name === 'fs' ? fixtureFs : scriptRequire(name)
  }, { filename: discoveryScript });
  const errors = [];
  const exit = {};
  let code = 0;
  try {
    vm.runInNewContext(fs.readFileSync(script, 'utf8'), {
      __dirname: path.dirname(script),
      require: name => name === 'fs' ? fixtureFs : name === './generate-character-manifest' ? discoveryModule.exports : scriptRequire(name),
      console: { log() {}, error(message) { errors.push(message); } },
      process: { exit(value) { code = value; throw exit; } }
    }, { filename: script });
  } catch (error) { if (error !== exit) throw error; }
  return { code, errors: errors.join('\n') };
}

test('LVL-0003 resolves all Eivar portraits through shared character discovery', () => {
  expect(fields.map(field => field.split('.').reduce((object, key) => object[key], harbor)))
    .toEqual(fields.map(() => 'assets/characters/eivar/portrait.png'));
  const result = validate();
  expect(result.errors).toBe('');
  expect(result.code).toBe(0);
});

for (const field of fields) {
  test(`${field} accepts another discovered shared NPC portrait`, () => {
    expect(validate({ field, asset: 'assets/characters/freya/portrait.png' }).errors).toBe('');
  });
  test(`${field} preserves legacy level-local art`, () => {
    expect(validate({ field, asset: harbor.world.background }).errors).toBe('');
  });
  for (const asset of [
    'assets/characters/missing-npc/portrait.png',
    'assets/characters/eivar/missing.png',
    'assets/characters/eivar/idle/frame_001.png',
    'assets/characters/eivar',
    'assets/guides/minnie.png',
    '../outside-portrait.png'
  ]) {
    test(`${field} rejects invalid portrait ${asset}`, () => {
      const result = validate({ field, asset });
      expect(result.code).toBe(1);
      expect(result.errors).toContain(`Level LVL-0003.${field}`);
    });
  }
}

test('an existing shared portrait without discoverable idle frames is rejected', () => {
  const result = validate({ missingIdle: true });
  expect(result.code).toBe(1);
  for (const field of fields) expect(result.errors).toContain(`Level LVL-0003.${field}`);
});

test('shared character support does not loosen world-background locality', () => {
  const result = validate({ field: 'world.background', asset: 'assets/characters/eivar/portrait.png' });
  expect(result.code).toBe(1);
  expect(result.errors).toContain('world.background must be inside its level folder');
});
