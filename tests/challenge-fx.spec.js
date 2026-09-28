const {
  test,
  expect
} = require('@playwright/test');
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';
async function start(page, levelId = 'LVL-0001') {
  await page.route('**/__dev/levels/*/editor-draft', r => r.fulfill({
    json: {}
  }));
  await page.goto(base + '/?dev=editor&level=' + levelId);
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
}
async function enable(page) {
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-challenge-fx-controls] summary').click();
  await page.locator('[data-challenge-fx="mode"]').selectOption('canvas');
  await page.locator('[data-graphics-action="close"]').click();
}
const snapshot = page => page.evaluate(() => window.eval('challengeFx').snapshot());
const hasCanvasInk = canvas => canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data.some((v,i)=>i%4===3&&v>0);
async function isolateLegacyCue(page, id) {
  await page.evaluate(id=>window.eval('sceneEffectRuntime').setVisibility('isolate',id),id);
}
async function exitFxInk(page) {
  return page.locator('[data-challenge-fx-canvas]').evaluate(canvas=>{
    const l=window.eval('level'),object=window.eval('interactiveObjectForTarget')(window.eval('hotspotById')(l.exitHotspotId||'templeGate'));
    // A particle cloud has transparent gaps at its center. Sample the actual
    // indicator footprint rather than requiring the former solid core pixel.
    const radius=window.eval('voxelRenderer').getSettings().challengeFx.exit.radius,
      x=object.center.x*canvas.width/l.world.width,y=object.center.y*canvas.height/l.world.height,
      rx=radius*canvas.width/l.world.width,ry=radius*canvas.height/l.world.height;
    const pixels=canvas.getContext('2d').getImageData(x-rx,y-ry,rx*2,ry*2).data;
    let alpha=0;for(let i=3;i<pixels.length;i+=4)alpha+=pixels[i];return alpha>1000;
  });
}
async function solve(page, id) {
  await page.evaluate(id => {
    const r = window.eval('runeById')(id),
      p = window.eval('getApproachPoint')(r),
      s = window.eval('state');
    s.worldX = p.x;
    s.worldY = p.y;
    window.eval('updateWorldDom')();
    window.eval('openRuneChallenge')(id);
  }, id);
  await answerOpenChallenge(page);
}
async function answerOpenChallenge(page) {
  const count = await page.evaluate(() => window.eval('currentChallengeQuestions')().length);
  expect(count).toBeGreaterThan(0);
  for (let i = 0; i < count; i++) {
    const answer = await page.evaluate(() => {
      const q = window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex];
      return String(window.eval('answerFor')(q));
    });
    if (await page.locator('[data-open-answer]').count()) {
      await page.locator('[data-open-answer]').fill(answer);
      await page.locator('[data-open-answer]').press('Enter');
    } else await page.locator(`[data-choice="${answer}"]`).click();
    await expect(page.locator('[data-action="next-question"]')).toBeVisible();
    await page.locator('[data-action="next-question"]').press('Enter');
  }
}

async function setFx(page, enabled) {
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-challenge-fx-controls] summary').click();
  await page.locator('[data-challenge-fx="mode"]').selectOption(enabled?'canvas':'legacy');
  await page.locator('[data-graphics-action="close"]').click();
}

async function approach(page, id) {
  await page.evaluate(id => {
    const s = window.eval('state'), point = window.eval('getApproachPoint')(window.eval('runeById')(id));
    s.worldX = point.x; s.worldY = point.y;
    window.eval('updateWorldDom')();
  }, id);
}

const cueStyles = node => {
  const css = getComputedStyle(node), after = getComputedStyle(node, '::after');
  return { background: css.backgroundImage, shadow: css.boxShadow, after: after.display, pointer: css.pointerEvents };
};

test('normal challenge visuals replace legacy cues and restore when disabled', async ({page}) => {
  await start(page);
  await approach(page, 'zon');
  const button = page.locator('[data-rune="zon"]');
  const legacy = await button.evaluate(cueStyles);
  await expect(button).toHaveAttribute('data-hotspot-cue','challenge');
  expect(legacy.background).toContain('radial-gradient');
  expect(legacy.after).not.toBe('none');
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  await setFx(page, true);
  expect((await snapshot(page)).markers).toEqual(['zon', 'steen']);
  await expect(button).toHaveAttribute('data-hotspot-cue','none');
  expect(await button.evaluate(cueStyles)).toEqual({background:'none', shadow:'none', after:'none', pointer:legacy.pointer});
  expect(await page.evaluate(()=>window.eval('illustratedChallengeGlows')())).toEqual([]);
  await setFx(page, false);
  expect(await button.evaluate(cueStyles)).toEqual(legacy);
  await expect(button).toHaveAttribute('data-hotspot-cue','challenge');
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
});

test('normal challenge hit target still works without legacy visuals and stays complete', async ({page, isMobile}, info) => {
  await start(page);
  await approach(page, 'zon');
  const button = page.locator('[data-rune="zon"]');
  await setFx(page, true);
  await page.screenshot({path:info.outputPath('runenpoort-replacement.png')});
  if(isMobile) await button.tap(); else await button.click();
  await expect(page.locator('#app')).toHaveAttribute('data-screen','challenge');
  await answerOpenChallenge(page);
  expect((await snapshot(page)).sequence.runeId).toBe('zon');
  expect((await snapshot(page)).markers).not.toContain('zon');
  await expect.poll(async()=>(await snapshot(page)).sequence).toBeNull();
  expect((await snapshot(page)).markers).not.toContain('zon');
});

async function prepareNpc(page, fixture) {
  await start(page, fixture.level);
  // Satisfy only prerequisite challenges; the NPC itself is completed through its real answer UI.
  await page.evaluate(id => {
    for(const rune of window.eval('activeRunes')()) if(rune.id !== id) window.eval('state').completedRunes.add(rune.id);
    window.eval('render')();
  }, fixture.id);
  await approach(page, fixture.id);
  const npc = page.locator(`[data-npc-challenge="${fixture.id}"]`);
  await expect(npc).toHaveAttribute('data-character-id',fixture.character);
  await expect(npc.locator('[data-npc-sprite]')).toBeAttached();
  await expect.poll(()=>npc.locator('[data-npc-sprite]').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
  return npc;
}
for (const fixture of [
  {level:'LVL-0001', id:'wind', character:'freya'},
  {level:'LVL-0003', id:'gateShield', character:'eivar'}
]) {
test(`${fixture.character}: NPC only when enabled, legacy presentation restored when off`, async ({page}, info) => {
  const npc=await prepareNpc(page, fixture);
  const legacy = await npc.evaluate(cueStyles);
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  await setFx(page, true);
  expect((await snapshot(page)).markers).toEqual([]);
  await expect(npc).toHaveAttribute('data-hotspot-cue','none');
  expect(await npc.evaluate(cueStyles)).toEqual({background:'none',shadow:'none',after:'none',pointer:legacy.pointer});
  expect((await snapshot(page)).exit).toBe(false);
  // With only the NPC incomplete, the FX canvas must be entirely transparent.
  expect(await page.locator('[data-challenge-fx-canvas]').evaluate(canvas=>{
    const pixels=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data;
    return pixels.some((value,index)=>index%4===3&&value>0);
  })).toBe(false);
  await page.screenshot({path:info.outputPath('npc-no-idle-marker.png')});
  await setFx(page, false);
  expect(await npc.evaluate(cueStyles)).toEqual(legacy);
});
test(`${fixture.character}: NPC completion transfers from its torso and absorbs with one SFX`, async ({page, isMobile}, info) => {
  const npc=await prepareNpc(page, fixture);
  await setFx(page, true);
  // Freya's upper half overlaps the authored gate hit area; tap her visible lower body.
  const box=await npc.boundingBox(),position={x:box.width*.4,y:box.height*.9};
  if(isMobile) await npc.tap({position}); else await npc.click({position});
  await expect(page.locator('#app')).toHaveAttribute('data-screen','challenge');
  await answerOpenChallenge(page);
  const fx=await snapshot(page);
  expect(fx.sequence.runeId).toBe(fixture.id);
  expect(fx.sequence.releaseMarker).toBe(false);
  expect(fx.markers).toEqual([]);
  const source=await npc.locator('[data-npc-sprite]').evaluate(sprite=>{
    const r=sprite.getBoundingClientRect(),t=document.querySelector('.worldTrack').getBoundingClientRect(),w=window.eval('level').world;
    return [(r.left+r.width*.5-t.left)*w.width/t.width,(r.top+r.height*.48-t.top)*w.height/t.height];
  });
  expect(fx.sequence.origin[0]).toBeCloseTo(source[0],0);
  expect(fx.sequence.origin[1]).toBeCloseTo(source[1],0);
  await expect.poll(async()=>(await snapshot(page)).audioStarts).toBe(1);
  await page.evaluate(id=>{for(let i=0;i<3;i++)window.eval('challengeFx').complete(id);},fixture.id);
  await expect.poll(async()=>(await snapshot(page)).sequence?.absorbing).toBe(true);
  expect((await snapshot(page)).audioStarts).toBe(1);
  await page.screenshot({path:info.outputPath('npc-absorb.png')});
  await expect.poll(async()=>(await snapshot(page)).sequence).toBeNull();
  await expect(npc).toBeEnabled();
  expect((await snapshot(page)).markers).toEqual([]);
});
}
test('Illustrated toggle and compact tuning persist without changing game data', async ({
  page
}, info) => {
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  await start(page);
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  expect((await snapshot(page)).enabled).toBe(false);
  await enable(page);
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(1);
  expect((await snapshot(page)).markers).toEqual(['zon', 'steen']);
  await page.screenshot({
    path: info.outputPath('markers.png')
  });
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-challenge-fx-controls] summary').click();
  await expect(page.locator('[data-challenge-fx]')).toHaveCount(29);
  await page.locator('[data-challenge-fx="marker.size"]').fill('1.8');
  await page.locator('[data-challenge-fx="volume"]').fill('0.25');
  await page.screenshot({
    path: info.outputPath('controls.png')
  });
  await page.reload();
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(1);
  expect(await page.evaluate(() => window.eval('voxelRenderer').getSettings().challengeFx.volume)).toBe(.25);
  await page.locator('[data-graphics-action="toggle"]').click();
  await page.locator('[data-challenge-fx-controls] summary').click();
  await page.locator('[data-challenge-fx="mode"]').selectOption('legacy');
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  expect((await snapshot(page)).sequence).toBeNull();
  expect(errors).toEqual([]);
  await page.evaluate(() => {
    window.eval('voxelRenderer').reset();
    window.eval('render')();
  });
  const defaults = await page.evaluate(() => window.eval('voxelRenderer').getSettings().challengeFx);
  expect(defaults.enabled).toBe(false);
  expect(defaults.volume).toBe(1);
  expect(defaults.marker.size).toBe(1.2);
});
test('real answers close UI, launch one SFX, follow walking Sven and absorb at live chest', async ({
  page
}, info) => {
  await start(page);
  await enable(page);
  await page.evaluate(() => {
    const v = window.eval('voxelRenderer');
    const s = v.getSettings().challengeFx;
    s.volume = .3;
    v.updateSettings({
      challengeFx: s
    });
  });
  await solve(page, 'zon');
  await expect(page.locator('#app')).toHaveAttribute('data-screen', 'scene');
  const first = await snapshot(page);
  expect(first.sequence.runeId).toBe('zon');
  expect(first.sequence.age).toBeLessThan(.3);
  expect(first.markers).not.toContain('zon');
  await expect.poll(async () => (await snapshot(page)).audioStarts).toBe(1);
  await page.evaluate(() => {
    for (let i = 0; i < 5; i++) window.eval('challengeFx').complete('zon');
    window.eval('beginFreeWalk')({
      x: window.eval('state').worldX + 230,
      y: window.eval('state').worldY
    });
  });
  await expect.poll(async () => (await snapshot(page)).sequence?.target[0]).not.toBe(first.sequence.target[0]);
  const moved = await snapshot(page);
  expect(moved.sequence.id).toBe(first.sequence.id);
  expect(moved.sequence.target[0]).not.toBe(first.sequence.target[0]);
  expect(moved.audioStarts).toBe(1);
  expect(moved.sequence.volume).toBeCloseTo(await page.evaluate(() => window.eval('audioMasterVolume')() * .3), 3);
  await expect.poll(async () => (await snapshot(page)).sequence?.age).toBeGreaterThan(.55);
  await page.screenshot({
    path: info.outputPath('transfer-moving.png')
  });
  await expect.poll(async () => (await snapshot(page)).sequence?.absorbing).toBe(true);
  expect((await snapshot(page)).audioStarts).toBe(1);
  await page.screenshot({
    path: info.outputPath('absorb.png')
  });
  await expect.poll(async () => (await snapshot(page)).sequence).toBeNull();
  await page.evaluate(() => window.eval('render')());
  expect((await snapshot(page)).markers).not.toContain('zon');
  await page.reload();
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
  expect((await snapshot(page)).markers).not.toContain('zon');
  expect((await snapshot(page)).sequence).toBeNull();
});
test('exit follows real progression condition, remains visible, resets and unloads', async ({
  page
}, info) => {
  await start(page);
  await enable(page);
  await page.evaluate(() => {
    for (const c of window.eval('level').learningChallenges) c.unlocksLevelProgression = c.id === 'zon';
  });
  expect((await snapshot(page)).exit).toBe(false);
  await solve(page, 'zon');
  expect((await snapshot(page)).exit).toBe(true);
  expect((await snapshot(page)).markers).toEqual(['steen']);
  await expect.poll(async () => (await snapshot(page)).sequence).toBeNull();
  expect((await snapshot(page)).exit).toBe(true);
  await page.evaluate(() => {
    const s = window.eval('state'),
      l = window.eval('level'),
      o = window.eval('interactiveObjectForTarget')(window.eval('hotspotById')(l.exitHotspotId || 'templeGate'));
    s.worldX = o.center.x - 160;
    s.worldY = window.eval('getApproachPoint')(window.eval('hotspotById')(l.exitHotspotId || 'templeGate')).y;
    window.eval('updateWorldDom')();
  });
  await page.screenshot({
    path: info.outputPath('exit-spiral.png')
  });
  await page.evaluate(() => window.eval('restart')());
  expect((await snapshot(page)).exit).toBe(false);
  expect((await snapshot(page)).sequence).toBeNull();
  await page.evaluate(() => window.eval('returnToMenu')());
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  expect((await snapshot(page)).sequence).toBeNull();
});
test('mode switch and OFF cancel active sequence; rendering or audio failure cannot block completion', async ({
  page
}) => {
  await page.route('**/magical-knowledge-transfer.mp3', r => r.abort());
  await start(page);
  await enable(page);
  await solve(page, 'zon');
  expect((await snapshot(page)).sequence).not.toBeNull();
  await page.evaluate(() => {
    const v = window.eval('voxelRenderer');
    v.updateSettings({
      challengeFx: {
        ...v.getSettings().challengeFx,
        enabled: false, mode: "legacy"
      }
    });
    window.eval('render')();
  });
  expect((await snapshot(page)).sequence).toBeNull();
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  await page.evaluate(() => {
    const v = window.eval('voxelRenderer');
    v.updateSettings({
      challengeFx: {
        ...v.getSettings().challengeFx,
        enabled: true, mode: "canvas"
      }
    });
    window.eval('render')();
  });
  await page.evaluate(() => {
    window.eval('voxelRenderer').updateSettings({
      renderer: 'cinematic'
    });
    window.eval('render')();
  });
  expect((await snapshot(page)).sequence).toBeNull();
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  await page.evaluate(() => {
    window.eval('voxelRenderer').updateSettings({
      renderer: 'illustrated'
    });
    window.eval('render')();
    window.AtlasChallengeFxVisuals.paint = () => {
      throw Error('test draw failure');
    };
  });
  await expect.poll(async () => (await snapshot(page)).enabled).toBe(false);
  await solve(page, 'steen');
  expect(await page.evaluate(() => window.eval('state').completedRunes.has('steen'))).toBe(true);
  await expect(page.locator('#app')).toHaveAttribute('data-screen', 'scene');
});
test('optional FX script failure preserves challenge gameplay and prior visuals', async ({
  page
}) => {
  await page.route('**/src/challenge-fx.js', r => r.abort());
  await start(page);
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  await solve(page, 'zon');
  expect(await page.evaluate(() => window.eval('state').completedRunes.has('zon'))).toBe(true);
  await expect(page.locator('#app')).toHaveAttribute('data-screen', 'scene');
});
test('the real exit still blocks before readiness and saves progression after activation', async ({
  page
}) => {
  await start(page);
  await enable(page);
  await page.evaluate(() => {
    for (const c of window.eval('level').learningChallenges) c.unlocksLevelProgression = c.id === 'zon';
    const exit = window.eval('hotspotById')(window.eval('level').exitHotspotId || 'templeGate');
    window.eval('finishInteraction')(exit, 'hotspot', 'activate');
  });
  await expect(page.locator('#app')).toHaveAttribute('data-screen', 'scene');
  expect((await snapshot(page)).exit).toBe(false);
  await solve(page, 'zon');
  await page.evaluate(() => {
    const exit = window.eval('hotspotById')(window.eval('level').exitHotspotId || 'templeGate');
    window.eval('finishInteraction')(exit, 'hotspot', 'activate');
  });
  await expect(page.locator('#app')).toHaveAttribute('data-screen', 'reward');
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  expect((await snapshot(page)).sequence).toBeNull();
  expect(await page.evaluate(() => window.eval('storedLevelIsComplete')(window.eval('level')))).toBe(true);
});

test('legacy plus-bubble canvas output is suppressed live for every Runenpoort interaction cue', async ({page}) => {
  await start(page);
  const authored=await page.evaluate(()=>JSON.stringify(window.eval('level').sceneEffects));
  const canvas=page.locator('[data-scene-effects-canvas="worldLight"]');
  // These authored Rune instances produce the visible blue pluses, including the forest hint and gate.
  const ids=['magical-glow-02','magical-glow-03','magical-glow-04','magical-glow-06'];
  for(const id of ids){await isolateLegacyCue(page,id);expect(await canvas.evaluate(hasCanvasInk)).toBe(true);}
  await setFx(page,true);
  for(const id of ids){await isolateLegacyCue(page,id);expect(await canvas.evaluate(hasCanvasInk)).toBe(false);}
  // Suppression is semantic/spatial, not a global ban on decorative magic or unrelated lighting.
  expect(await page.evaluate(()=>{
    const cue=window.eval('level').sceneEffects.find(e=>e.id==='magical-glow-03'),classify=window.eval('isLegacyInteractionCue');
    return [classify(cue),classify({...cue,id:'renamed-legacy-cue'}),classify({...cue,geometry:{...cue.geometry,x:-500,y:-500}}),classify({...cue,presetId:'light-source-enhancement'})];
  })).toEqual([true,true,false,false]);
  await setFx(page,false);
  for(const id of ids){await isolateLegacyCue(page,id);expect(await canvas.evaluate(hasCanvasInk)).toBe(true);}
  expect(await page.evaluate(()=>JSON.stringify(window.eval('level').sceneEffects))).toBe(authored);
});

test('locked exit has no DOM or canvas indicator with FX on and restores legacy visuals when off', async ({page},info) => {
  await start(page);
  const exit=page.locator('[data-exit-hotspot="true"]'),legacy=await exit.evaluate(cueStyles);
  expect(legacy.background).toContain('radial-gradient');
  await setFx(page,true);
  await approach(page,'wind');
  await expect(exit).toBeEnabled();
  await expect(exit).toHaveAttribute('data-exit-ready','false');
  await expect(exit).toHaveAttribute('data-hotspot-cue','none');
  expect(await exit.evaluate(cueStyles)).toEqual({background:'none',shadow:'none',after:'none',pointer:legacy.pointer});
  expect((await snapshot(page)).exit).toBe(false);
  expect(await exitFxInk(page)).toBe(false);
  await isolateLegacyCue(page,'magical-glow-06');
  expect(await page.locator('[data-scene-effects-canvas="worldLight"]').evaluate(hasCanvasInk)).toBe(false);
  await page.evaluate(()=>window.eval('sceneEffectRuntime').setVisibility('all'));
  await page.waitForTimeout(600);
  await page.screenshot({path:info.outputPath('runenpoort-locked-no-legacy.png')});
  await setFx(page,false);
  expect(await exit.evaluate(cueStyles)).toEqual(legacy);
  await expect(page.locator('[data-challenge-fx-canvas]')).toHaveCount(0);
  await isolateLegacyCue(page,'magical-glow-06');
  expect(await page.locator('[data-scene-effects-canvas="worldLight"]').evaluate(hasCanvasInk)).toBe(true);
});

test('real NPC completion shows only the Enchanted cloud at the ready exit, with no legacy canvas underneath', async ({page},info) => {
  await start(page);
  await setFx(page,true);
  await page.evaluate(()=>{
    for(const rune of window.eval('activeRunes')())if(rune.id!=='wind')window.eval('state').completedRunes.add(rune.id);
    window.eval('render')();
  });
  expect((await snapshot(page)).exit).toBe(false);
  await solve(page,'wind');
  await expect.poll(async()=>(await snapshot(page)).sequence).toBeNull();
  expect((await snapshot(page)).exit).toBe(true);
  expect((await snapshot(page)).markers).toEqual([]);
  const exit=page.locator('[data-exit-hotspot="true"]');
  await expect(exit).toHaveAttribute('data-exit-ready','true');
  await expect(exit).toHaveAttribute('data-hotspot-cue','none');
  expect(await exit.evaluate(cueStyles)).toMatchObject({background:'none',shadow:'none',after:'none'});
  expect(await exitFxInk(page)).toBe(true);
  // Both completed normal challenge cues and the exit's old plus renderer stay blank.
  for(const id of ['magical-glow-03','magical-glow-04','magical-glow-06']){
    await isolateLegacyCue(page,id);
    expect(await page.locator('[data-scene-effects-canvas="worldLight"]').evaluate(hasCanvasInk)).toBe(false);
  }
  await page.evaluate(()=>window.eval('sceneEffectRuntime').setVisibility('all'));
  await page.waitForTimeout(1500);
  expect(await exitFxInk(page)).toBe(true);
  await page.screenshot({path:info.outputPath('runenpoort-ready-cloud-only.png')});
});
