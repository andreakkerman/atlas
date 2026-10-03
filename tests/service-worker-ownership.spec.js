const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');

test('activation deletes only obsolete Atlas caches and preserves current and unrelated caches', async () => {
  const handlers = new Map(), entries = new Map();
  let claimed = false, activation;
  const context = vm.createContext({
    self: { addEventListener: (type, handler) => handlers.set(type, handler), clients: { claim: async () => { claimed = true; } } },
    caches: { keys: async () => [...entries.keys()], delete: async key => entries.delete(key) }
  });
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../service-worker.js'), 'utf8'), context);
  const current = vm.runInContext('CACHE_NAME', context);
  for (const name of [current, 'svenadventure-static-v1', 'svenadventure-static-v230', 'other-app-sentinel', 'svenadventure-staticity-sentinel']) entries.set(name, { sentinel: name });
  const retained = entries.get(current), unrelated = entries.get('other-app-sentinel');
  handlers.get('activate')({ waitUntil: promise => { activation = promise; } });
  await activation;
  expect([...entries.keys()].sort()).toEqual([current, 'other-app-sentinel', 'svenadventure-staticity-sentinel'].sort());
  expect(entries.get(current)).toBe(retained);
  expect(entries.get('other-app-sentinel')).toBe(unrelated);
  expect(claimed).toBe(true);
});
