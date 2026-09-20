const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');
const base = process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173';

function authoredWorld() {
  const context = vm.createContext({ window: {} });
  for (const file of ['Levels/manifest.js', 'Levels/world-config.js', 'src/playable-characters.js', 'src/atlas-world.js', 'src/audio-config.js', 'Levels/LVL-0032/level.js']) {
    vm.runInContext(fs.readFileSync(file, 'utf8'), context);
  }
  const w = context.window;
  return { level: w.SVEN_LEVEL_DEFINITIONS['LVL-0032'], audio: w.SVEN_AUDIO_CONFIG,
    manifest: w.SVEN_LEVEL_MANIFEST.levels, resolver: w.AtlasWorld.createWorldResolver(w.SVEN_LEVEL_MANIFEST.levels, w.SVEN_WORLD_CONFIG) };
}

test('registers stable worlds, measured assets, three anchors and complete authored question banks', () => {
  const { level, audio, manifest, resolver } = authoredWorld();
  expect(resolver.rootEntries({ includeDeveloper: false }).map(e => e.id)).toEqual([
    'LVL-0001', 'LVL-0004', 'LVL-0032', 'LVL-0013', 'LVL-0021', 'LVL-0027', 'LVL-0008'
  ]);
  expect(resolver.rootEntries({ includeDeveloper: true }).at(-1).id).toBe('LVL-0008');
  expect(resolver.authoredEntries('LVL-0008').map(e => e.id).sort()).toEqual(['LVL-0008','LVL-0009','LVL-0010','LVL-0011','LVL-0012']);
  expect(resolver.rootIdFor('LVL-0012')).toBe('LVL-0008');
  expect(resolver.enabledEntries('LVL-0032').map(e => e.id)).toEqual(['LVL-0032','LVL-0033','LVL-0034','LVL-0035']);
  expect(resolver.nextEnabled('LVL-0032').id).toBe('LVL-0033');
  expect(resolver.nextEnabled('LVL-0033').id).toBe('LVL-0034');
  expect(resolver.nextEnabled('LVL-0034').id).toBe('LVL-0035');
  expect(resolver.nextEnabled('LVL-0035')).toBeNull();
  expect(manifest.some(e => e.id === 'LVL-0036')).toBe(false);
  expect(level.title).toBe('Dam Battlegrounds');
  for (const asset of [level.world.background, level.world.depthmap]) {
    const png = fs.readFileSync(asset);
    expect([png.readUInt32BE(16), png.readUInt32BE(20)]).toEqual([2172,724]);
  }
  expect(level.world.depthMap).toBe(level.world.depthmap);
  expect(level.runes.map(r => r.name)).toEqual(['Auto', 'Loot crate', 'Raider Cache']);
  expect(level.interactiveObjects.filter(o => o.type === 'rune').map(o => o.center)).toEqual([
    {x:269,y:447}, {x:1063,y:526}, {x:1961,y:611}
  ]);
  expect(level.learningChallenges).toHaveLength(3);
  for (const challenge of level.learningChallenges) {
    expect(challenge.challengeCharacterId).toBe('CHR-ARC-VALENTE');
    expect(challenge.questions).toHaveLength(4);
    for (const slot of challenge.questions) {
      expect(slot.variants).toHaveLength(2);
      for (const variant of slot.variants) {
        expect(variant).toMatchObject({domain:'math',schoolBand:'E5-intended'});
        expect(variant.hintMinnie).toBeTruthy(); expect(variant.hintMoose).toBeTruthy();
        const equation = variant.explanation.match(/^(\d+) ([×:]) (\d+) = (\d+)/);
        expect(equation).toBeTruthy();
        expect(equation[2] === '×' ? +equation[1] * +equation[3] : +equation[1] / +equation[3]).toBe(variant.answer);
        if (variant.answerMode === 'multipleChoice') {
          expect(new Set(variant.choices).size).toBe(4); expect(variant.choices).toContain(variant.answer);
        }
      }
    }
  }
  expect(audio.levels[level.id]).toMatchObject({music:'arcAtlas',ambience:null});
  expect(audio.tracks.music.arcAtlas).toBe('assets/audio/music/arc_atlas.mp3');
  expect(fs.statSync(audio.tracks.music.arcAtlas).size).toBeGreaterThan(0);
});

async function enter(page, editor = false) {
  await page.goto(base + (editor ? '/?dev=editor' : '/?atlasSessionTest=1'));
  await page.getByRole('button', {name:'Start avontuur',exact:true}).click();
  await page.waitForFunction(() => window.eval('menuAdventureStats.loaded'));
  const card = page.locator('[data-menu-tile="LVL-0032"]');
  await expect(card).toContainText('ARC Atlas');
  await expect(card).toContainText('4 plaatsen · 12 opdrachten');
  expect(await page.locator('[data-menu-tile]').evaluateAll(nodes => nodes.map(n => n.dataset.menuTile))).toEqual([
    'LVL-0001','LVL-0004','LVL-0032','LVL-0013','LVL-0021','LVL-0027','LVL-0000','LVL-0008'
  ]);
  await card.click();
  await expect(page.getByRole('heading',{name:'Dam Battlegrounds',exact:true})).toBeVisible();
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('[data-actor="sven"]')).toBeVisible();
}

for (const variant of [0,1]) test(`menu, walking, all answers, hints and saved completion: variant ${variant+1}`, async ({ page }, info) => {
  test.setTimeout(120000);
  const errors = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if(m.type() === 'error') errors.push(m.text()); });
  page.on('response', r => { if(r.status() >= 400) errors.push(`${r.status()} ${r.url()}`); });
  await enter(page);
  await page.evaluate(v => { Math.random = () => v ? 0.999 : 0; }, variant);
  for (const [index,id] of ['car','lootCrate','raiderCache'].entries()) {
    // Exercise the shared Move To -> Arrive -> Action handler without teleporting Sven.
    await page.evaluate(id => window.eval('beginInteraction')(window.eval('runeById')(id),'rune'), id);
    await expect(page.locator('[data-challenge-character="CHR-ARC-VALENTE"]')).toBeVisible({timeout:22000});
    const arrival = await page.evaluate(id => {
      const l=window.eval('level'), s=window.eval('state');
      const o=l.interactiveObjects.find(o=>o.id===id), n=l.walkGraph.nodes.find(n=>n.id===o.approachNode);
      return Math.hypot(s.worldX-n.x,s.worldY-n.y);
    }, id);
    expect(arrival).toBeLessThan(3);
    const portrait = await page.evaluate(() => {
      const image = document.querySelector('.challengeCharacterPortrait');
      return { matches: image.src === window.eval('readyAssetSrc')('Levels/LVL-0032/Valente.png'), width:image.naturalWidth, height:image.naturalHeight };
    });
    expect(portrait).toEqual({matches:true,width:1254,height:1254});
    await page.screenshot({path:info.outputPath(`${id}-challenge.png`)});
    for (let q=0;q<4;q++) {
      const question = await page.evaluate(() => window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
      if(index===0 && q===0) {
        if(question.answerMode === 'open') {
          await page.locator('[data-open-answer]').fill('999');
          await page.getByRole('button',{name:'Controleer',exact:true}).click();
        } else {
          await page.locator(`[data-choice="${question.choices.find(c=>c!==question.answer)}"]`).click();
        }
        expect(await page.evaluate(() => window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')].id)).toBe(question.id);
        await expect(page.locator('[data-adventure-team-bar]')).toHaveAttribute('data-active-speaker','minnie');
      }
      if(question.answerMode === 'open') {
        await page.locator('[data-open-answer]').fill(String(question.answer));
        await page.getByRole('button',{name:'Controleer',exact:true}).click();
      } else await page.locator(`[data-choice="${question.answer}"]`).click();
      await page.locator('[data-action="next-question"]').click();
    }
    expect(await page.evaluate(() => [...window.eval('state.completedRunes')])).toHaveLength(index+1);
  }
  await expect(page.locator('[data-hotspot="damExit"]')).toHaveAttribute('data-exit-ready','true');
  await page.locator('[data-hotspot="damExit"]').click();
  await expect(page.getByRole('heading',{name:'Dam Battlegrounds voltooid'})).toBeVisible({timeout:22000});
  await expect(page.locator('[data-action="next-level"]')).toBeVisible();
  const saved = await page.evaluate(() => ({
    record:JSON.parse(localStorage.getItem(window.eval('level.storageKey'))),
    learning:window.AtlasSessionReport.getCurrent()?.questions,
    answered:window.eval('state.answered'), next:window.eval('resolvedNextLevelId')()
  }));
  expect(saved.answered).toBe(12); expect(saved.next).toBe('LVL-0033');
  expect(saved.record.completedAt).toBeTruthy(); expect(saved.learning).toHaveLength(12);
  expect(saved.record.completedRuneIds).toEqual(['car','lootCrate','raiderCache']);
  await page.locator('[data-action="next-level"]').click();
  await expect.poll(()=>page.evaluate(()=>window.eval('level.id'))).toBe('LVL-0033');
  await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven_arc');
  expect(await page.evaluate(()=>window.eval('locomotionTuning')().fromIdleMovement)).toBe(.25);
  await page.evaluate(()=>window.eval('returnToMenu')());
  await page.reload();
  expect(await page.evaluate(() => window.AtlasSessionReport.getSessions()[0].questions.length)).toBe(12);
  const restored = await page.evaluate(async () => {
    await window.eval('selectLevel')('LVL-0032',{startImmediately:true});
    return [...window.eval('state.completedRunes')];
  });
  expect(restored).toEqual(['car','lootCrate','raiderCache']);
  expect(errors).toEqual([]);
});

test('shared audio reuses playback, changes volume, mutes, resumes and transitions to menu', async ({page}) => {
  await enter(page);
  await expect.poll(() => page.evaluate(() => window.eval('audioState.music')?.paused)).toBe(false);
  await expect.poll(() => page.evaluate(() => window.eval('audioState.music')?.currentTime)).toBeGreaterThan(0);
  const result = await page.evaluate(async () => {
    const a=window.eval('audioState'), config=window.eval('audioConfig'), sync=window.eval('syncAudioForState');
    const first=a.music; sync(); const same=a.music===first;
    config.volumes.master=0.5; config.levels['LVL-0032'].musicVolume=0.4; sync(); const volume=a.music.volume;
    first.pause(); sync(); const resumed=a.music===first;
    config.volumes.master=0; sync(); const muted=first.paused && a.music===null;
    config.volumes.master=0.5; sync(); const active=a.music;
    const key=a.currentMusicKey, src=active.src;
    window.eval('returnToMenu')();
    return {same,volume,resumed,muted,key,src,stopped:active.paused,menuKey:a.currentMusicKey};
  });
  expect(result).toMatchObject({same:true,volume:0.2,resumed:true,muted:true,key:'arcAtlas',stopped:true,menuKey:'menu'});
  expect(result.src).toContain('/assets/audio/music/arc_atlas.mp3');
});

test('editor discovers authored path and three challenge anchors without source writes', async ({page}) => {
  await enter(page, true);
  await page.keyboard.press('Control+Shift+D');
  await expect(page.locator('[data-developer-tools]')).toBeVisible();
  await page.getByRole('button',{name:'Challenges',exact:true}).click();
  await expect(page.locator('[data-developer-tools]')).toContainText('Raider Cache');
  expect(await page.evaluate(() => window.eval('level.walkPath').length)).toBe(8);
  expect(await page.evaluate(() => window.eval('level.learningChallenges').length)).toBe(3);
});

test('Cinematic uploads and Voxel uses the supplied depth map', async ({page}) => {
  test.skip(process.env.ATLAS_WEBGPU_QA !== '1', 'Run with the repository real-WebGPU configuration');
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await enter(page);
  await page.evaluate(() => { window.eval('voxelRenderer').updateSettings({renderer:'cinematic'}); window.eval('render')(); });
  await expect.poll(() => page.evaluate(() => window.eval('cinematicRenderer').snapshot().depthStatus),{timeout:25000}).toBe('ready');
  const snap=await page.evaluate(() => window.eval('cinematicRenderer').snapshot());
  expect(snap.depthPath).toBe('Levels/LVL-0032/depthmap.png');
  expect(snap.error).toBeFalsy();
  await expect.poll(() => page.evaluate(() => window.eval('cinematicRenderer').snapshot().frame)).toBeGreaterThan(snap.frame+2);
  await page.evaluate(() => { window.eval('voxelRenderer').updateSettings({renderer:'voxel'}); window.eval('render')(); });
  await expect.poll(() => page.evaluate(() => window.eval('voxelRenderer').snapshot().ready),{timeout:25000}).toBe(true);
  const voxel=await page.evaluate(() => window.eval('voxelRenderer').snapshot());
  expect(voxel.depthMap).toBe('Levels/LVL-0032/depthmap.png');
  expect(voxel.error).toBeNull();
  expect(errors).toEqual([]);
});

test('loads every existing world with its original saved progress and music', async ({page}) => {
  await enter(page);
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const worlds=[['LVL-0001','runeCompass'],['LVL-0004','nautilus'],['LVL-0008','minecraft'],['LVL-0013','europeGrandTour'],['LVL-0021','leonardoLevel'],['LVL-0027','egyptAdventure']];
  const saved=await page.evaluate(async worlds => {
    const records={};
    for(const [id] of worlds) {
      const entry=window.SVEN_LEVEL_MANIFEST.levels.find(e=>e.id===id);
      const definition=await window.eval('loadLevelDefinition')(entry);
      const ids=window.eval('activeRunes')(definition).map(r=>r.id);
      const data=JSON.stringify({levelId:id,activeChallengeSignature:ids.join('|'),completedRuneIds:[ids[0]],answered:4});
      localStorage.setItem(definition.storageKey,data);
      records[definition.storageKey]=data;
    }
    return records;
  },worlds);
  for(const [id,music] of worlds) {
    const loaded=await page.evaluate(async id => {
      await window.eval('selectLevel')(id,{startImmediately:true});
      return {id:window.eval('level.id'),completed:[...window.eval('state.completedRunes')],first:window.eval('activeRunes')()[0].id,music:window.eval('audioState.currentMusicKey')};
    },id);
    expect(loaded).toEqual({id,completed:[loaded.first],first:loaded.first,music});
    await expect(page.locator('[data-actor="sven"]')).toBeVisible();
  }
  expect(await page.evaluate(keys => Object.fromEntries(keys.map(key=>[key,localStorage.getItem(key)])),Object.keys(saved))).toEqual(saved);
  expect(errors).toEqual([]);
});
