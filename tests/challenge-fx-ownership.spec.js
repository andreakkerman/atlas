const { test, expect } = require('@playwright/test');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function fixture(extra = {}) {
  const voices = [];
  const attributes = {};
  const sandbox = {
    structuredClone, performance, console: { warn() {} },
    document: { hidden: false, querySelector: () => ({ setAttribute: (k, v) => attributes[k] = v }) },
    Audio: class {
      constructor() { this.plays = 0; this.pauses = 0; voices.push(this); }
      play() { this.plays++; return Promise.resolve(); }
      pause() { this.pauses++; }
    },
    ...extra
  };
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  for (const file of ['challenge-fx-settings.js', 'challenge-fx.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '../src', file), 'utf8'), sandbox);
  }
  sandbox.AtlasChallengeFxVisuals = { paint() {} };
  const state = {
    enabled: true, master: .5,
    settings: sandbox.AtlasChallengeFx.normalize({ enabled: true, volume: .4 }),
    scene: { id: 'level-a', completed: new Set(), anchors: [{ id: 'a', x: 30, y: 40 }], markers: [], player: [90, 80], exit: null }
  };
  const runtime = sandbox.AtlasChallengeFx.createRuntime({
    enabled: () => state.enabled, settings: () => state.settings,
    screen: () => 'scene', audioUnlocked: () => true,
    masterVolume: () => state.master, audioPath: () => 'transfer.mp3', scene: () => state.scene
  });
  const ctx = { canvas: { width: 800, height: 600 }, clearRect() {} };
  return { sandbox, state, runtime, voices, ctx, attributes };
}

test('native fallback owns one play, follows live target, honors volume/mute and stops on arrival', () => {
  const { state, runtime, voices, ctx } = fixture();
  expect(runtime.complete('a')).toBe(false);
  state.scene.completed.add('a');
  expect(runtime.complete('a')).toBe(true);
  const id = runtime.snapshot().sequence.id;
  runtime.draw(ctx, 1000);
  expect(voices[0].volume).toBeCloseTo(.2);
  for (let frame = 1; frame <= 8; frame++) {
    state.scene.player = [90 + frame * 15, 80 + frame];
    expect(runtime.complete('a')).toBe(false);
    runtime.draw(ctx, 1000 + frame * 100);
    expect(runtime.snapshot().sequence.id).toBe(id);
    expect(runtime.snapshot().sequence.target).toEqual(state.scene.player);
  }
  expect(voices).toHaveLength(1);
  expect(voices[0].plays).toBe(1);
  state.master = 0;
  runtime.draw(ctx, 1900);
  expect(voices[0].volume).toBe(0);
  state.master = .8;
  state.settings.volume = .25;
  runtime.draw(ctx, 2000);
  expect(voices[0].volume).toBeCloseTo(.2);
  runtime.draw(ctx, 2750);
  expect(runtime.snapshot().sequence.absorbing).toBe(true);
  expect(voices[0].pauses).toBe(1);
  expect(voices[0].plays).toBe(1);
  runtime.draw(ctx, 5000);
  expect(runtime.snapshot().sequence).toBeNull();
  expect(runtime.complete('a')).toBe(false);
});

test('visibility cancels playback, and only actual completion reset re-enables delivery', () => {
  const { state, runtime, voices, sandbox, ctx } = fixture();
  state.scene.completed.add('a');
  runtime.complete('a');
  sandbox.document.hidden = true;
  runtime.draw(ctx, 1000);
  expect(runtime.snapshot().sequence).toBeNull();
  expect(voices[0].pauses).toBe(1);
  sandbox.document.hidden = false;
  expect(runtime.complete('a')).toBe(false);
  state.scene.completed.clear();
  runtime.sync();
  state.scene.completed.add('a');
  expect(runtime.complete('a')).toBe(true);
  expect(voices).toHaveLength(2);
  runtime.dispose();
  expect(voices[1].pauses).toBe(1);
});

test('late Web Audio loading cannot start a cancelled sequence', async () => {
  let resolveBytes, starts = 0, closes = 0;
  const { runtime, state } = fixture({
    fetch: () => new Promise(resolve => resolveBytes = resolve),
    AudioContext: class {
      resume() { return Promise.resolve(); }
      close() { closes++; return Promise.resolve(); }
      decodeAudioData() { return Promise.resolve({ duration: 3 }); }
      createBufferSource() { starts++; throw Error('stale sequence tried to create audio'); }
    }
  });
  runtime.unlockAudio();
  state.scene.completed.add('a');
  runtime.complete('a');
  runtime.dispose();
  resolveBytes({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) });
  await new Promise(resolve => setImmediate(resolve));
  expect(starts).toBe(0);
  expect(closes).toBe(1);
});

test('projection failure is contained and restores legacy cue presentation', () => {
  const { runtime, state, ctx, attributes } = fixture();
  state.scene = null;
  expect(() => runtime.draw(ctx, 1000)).not.toThrow();
  expect(runtime.enabled()).toBe(false);
  expect(attributes['data-challenge-fx-active']).toBe('false');
});

test('NPC source stays live independently of idle markers and never restarts audio', () => {
  const { state, runtime, voices, ctx } = fixture();
  Object.assign(state.scene.anchors[0], { idleMarker: false, liveSource: true });
  state.scene.completed.add('a');
  expect(state.scene.markers).toEqual([]);
  expect(runtime.complete('a')).toBe(true);
  const id = runtime.snapshot().sequence.id;
  runtime.draw(ctx, 1000);
  Object.assign(state.scene.anchors[0], { x: 70, y: 60 });
  runtime.draw(ctx, 1200);
  expect(runtime.snapshot().sequence).toMatchObject({ id, origin: [70, 60], releaseMarker: false });
  expect(voices).toHaveLength(1);
  expect(voices[0].plays).toBe(1);
});
