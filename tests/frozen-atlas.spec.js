const {test, expect} = require('@playwright/test');
const fs = require('fs'), vm = require('vm');
const crypto = require('crypto');
const learning = require('../src/learning-levels');
const hints = require('../src/challenge-hints');
const {bank} = require('../src/content/m6');
const {selectSceneItem, bootEditorTest} = require('./editor-workspace-helpers');
const base = (process.env.ATLAS_EDITOR_URL || 'http://127.0.0.1:4173').split('?')[0];
const ids = ['LVL-0036','LVL-0037','LVL-0038','LVL-0039'];
const openings = [
  'Die trein... die gaat niet meer op tijd aankomen.',
  'Een sterrenwacht! Zouden ze hier de ARC hebben zien aankomen?',
  'Almatera. Ooit een mooi dorp. Nu overal ARC.',
  'De geruchten zijn waar. Hier ligt écht een gevallen Emperor.'
];
const expected = [
  ['Frozen Railway','stationClock','illuminatedBooth','serviceBooth','bridgePassage'],
  ['Mountain Outpost','expeditionMarker','stoneCairn','technicalInstallation','outpostBridge'],
  ['Old Town','welcomeSign','statue','churchClock','villagePassage'],
  ['Fallen Emperor','machineryFragment','controlCabinets','signalMast','ballisticGondola']
];
// Freeze the complete authored flyby records, including paths and appearance.
// These were added after the original empty-environment integration test.
const flybyHashes = [
  '196c8147e919a040ed84eff6768543db98da560718a35a2884b98b3d61cc5fc6',
  '2e48ecee0158a1ccbe19aa3c57793744cf2400516fe7e4c3aa8f2e8e5b59f4c6',
  'e6dab35c3ee4ffea73f57b8e320b60055d593d3a0019f49b730a26b9f76b6281',
  '424b22c9af798e9e09e8e9be93dcd5884234e1186b4896508e7eef3754fe072f'
];
function authored() {
  const window = {};
  for (const file of ['src/playable-characters.js','src/atlas-world.js','Levels/manifest.js','Levels/world-config.js','src/audio-config.js',...ids.map(id=>`Levels/${id}/level.js`)]) {
    vm.runInNewContext(fs.readFileSync(file,'utf8'),{window});
  }
  return {window, levels:ids.map(id=>window.SVEN_LEVEL_DEFINITIONS[id]), resolver:window.AtlasWorld.createWorldResolver(window.SVEN_LEVEL_MANIFEST.levels,window.SVEN_WORLD_CONFIG)};
}
const isTime = id => ['stationClock','churchClock'].includes(id);

test('the original 960 E5 variants and rendered support remain identical', () => {
  const baseline=require('./fixtures/m6-expansion-20261010-baseline.json');
  const cap=require('../src/challenge-capabilities');
  const original=require('../scripts/level-utils').loadAllLevels().filter(({entry})=>Object.hasOwn(baseline.levels,`Levels/${entry.id}/level.js`));
  const content=original.flatMap(({entry,level})=>(level.learningChallenges||[]).flatMap(c=>c.questions.flatMap(s=>s.variants.map(q=>[entry.id,c.id,s.id,q,hints.resolve(entry.id,q,'minnie'),hints.resolve(entry.id,q,'moose'),hints.resolveExplanation(entry.id,q),cap.renderClockVisual(q.visual)]))));
  const canonical=v=>v&&typeof v==='object'?Array.isArray(v)?v.map(canonical):Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
  expect(content).toHaveLength(960);
  expect(crypto.createHash('sha256').update(JSON.stringify(canonical(content))).digest('hex')).toBe(baseline.e5Hash);
});

test('Frozen registration, measured supplied artwork, bindings, audio and world-local progression', () => {
  const {window, levels, resolver} = authored();
  expect(resolver.enabledEntries(ids[0]).map(e=>e.id)).toEqual(ids);
  expect(resolver.enabledEntries('LVL-0032').map(e=>e.id)).toEqual(['LVL-0032','LVL-0033','LVL-0034','LVL-0035']);
  expect(resolver.nextEnabled('LVL-0035')).toBeNull();
  for (const entry of resolver.enabledEntries('LVL-0032')) expect(resolver.isNew(entry.id)).toBe(false);
  expect(resolver.allEnabledIds().filter(resolver.isNew)).toEqual(ids);
  for (const [i, l] of levels.entries()) {
    const [title,...objects] = expected[i];
    expect(l.title).toBe(title);
    expect(l.challengeCharacter).toEqual({id:'CHR-FROZEN-NIVA',name:'Niva',portrait:`Levels/${l.id}/Niva.png`,role:'verkenner'});
    expect(l.companion).toEqual(l.challengeCharacter);
    expect(l.challengeArt).toBe(l.challengeCharacter.portrait);
    expect(l.reward.art).toBe(l.challengeCharacter.portrait);
    expect(fs.existsSync(l.challengeCharacter.portrait)).toBe(true);
    expect(l.spiritName).toBe('Niva');
    expect(l.learningChallenges.every(c=>c.challengeCharacterId===l.challengeCharacter.id)).toBe(true);
    expect(JSON.stringify(l)).not.toMatch(/valente/i);
    expect(l.companionMoments.filter(m=>m.event==='LEVEL_ENTER')).toEqual([{id:'frozen-enter',event:'LEVEL_ENTER',speaker:'minnie',text:openings[i]}]);
    expect(resolver.rootIdFor(l.id)).toBe(ids[0]);
    expect(resolver.isNew(l.id)).toBe(true);
    expect(resolver.nextEnabled(l.id)?.id || null).toBe(ids[i+1] || null);
    expect(l.exits).toEqual([{id:objects[3],targetLevel:ids[i+1] || null,lockedUntilComplete:true}]);
    expect(l.learningChallenges.map(c=>c.id)).toEqual(objects.slice(0,3));
    expect(l.runes.map(r=>r.objectId)).toEqual(objects.slice(0,3));
    expect(l.interactiveObjects.map(o=>o.id)).toEqual(objects);
    expect(l.interactiveObjects.map(o=>o.center.x)).toEqual(l.interactiveObjects.map(o=>o.center.x).sort((a,b)=>a-b));
    expect(l.player.start).toEqual({x:l.walkPath[0].x,y:l.walkPath[0].y});
    if (l.id === 'LVL-0039') {
      // Authored start on the current path, before the first challenge approach.
      expect(l.player.start).toEqual({x:237,y:583});
      expect(l.player.startNode).toBe(l.walkPath[0].id);
      expect(l.walkPath[1]).toMatchObject({id:'machineryFragment-approach',x:560,y:587});
      for (const o of l.interactiveObjects) expect(Math.hypot(l.player.start.x-o.center.x,l.player.start.y-o.center.y)).toBeGreaterThan(o.radius);
      expect(l.player.start.y).toBeGreaterThanOrEqual(l.boundaries.minY);
      expect(l.player.start.y).toBeLessThanOrEqual(l.boundaries.maxY);
    } else expect(l.player.start.x).toBeLessThan(200);
    for (const o of l.interactiveObjects) expect(l.walkPath.some(p=>p.id===o.approachNode)).toBe(true);
    for (const file of [l.world.background,l.world.depthmap]) {
      const png = fs.readFileSync(file);
      expect([png.readUInt32BE(16),png.readUInt32BE(20)]).toEqual([2172,724]);
    }
    expect(window.SVEN_AUDIO_CONFIG.levels[l.id]).toMatchObject({music:'frozenAtlas',ambience:null});
    expect(l.ambientAnimals || []).toEqual([]);
    expect(l.ambientFlybys.map(f=>f.id)).toEqual([
      ['bully-1','hornet-1'], ['arc_wasp-1','rocketeer-1'],
      ['hornet-1','arc_wasp-1'], ['arc_wasp-1','hornet-1','rocketeer-1']
    ][i]);
    expect(crypto.createHash('sha256').update(JSON.stringify(l.ambientFlybys)).digest('hex')).toBe(flybyHashes[i]);
    expect(l.sceneEffects || []).toEqual([]); expect(l.sceneEffectGroups || []).toEqual([]);
    expect(l).not.toHaveProperty('locomotion');
  }
  expect(window.SVEN_AUDIO_CONFIG.tracks.music.frozenAtlas).toBe('assets/audio/music/frozenatlas.mp3');
  expect(levels[3].interactiveObjects[0].center).toEqual({x:595,y:461});
  expect(levels[3].interactiveObjects[3]).toMatchObject({id:'ballisticGondola',center:{x:1928,y:434},radius:145});
  // Disabling/reordering uses the existing resolver, without leaking into ARC.
  resolver.setEnabled(ids[0],ids[1],false);
  expect(resolver.nextEnabled(ids[0]).id).toBe(ids[2]);
  expect(resolver.nextEnabled('LVL-0032').id).toBe('LVL-0033');
});

test('all 96 E5 variants have valid arithmetic, Dutch clock answers and reusable staged support', () => {
  const {levels} = authored(), variants=[];
  const words=['twaalf','één','twee','drie','vier','vijf','zes','zeven','acht','negen','tien','elf'];
  for (const l of levels) for (const c of l.learningChallenges) {
    expect(c.questions).toHaveLength(4);
    for (const slot of c.questions) {
      expect(slot.variants).toHaveLength(2);
      expect(learning.positionDomain(slot.variants)).toBe(isTime(c.id)?'time':undefined);
      for (const [index,v] of slot.variants.entries()) {
        variants.push(v);
        expect(v.learningLevel).toBe('E5');
        expect(JSON.stringify([v.prompt,hints.resolve(l.id,v,'minnie'),hints.resolve(l.id,v,'moose'),hints.resolveExplanation(l.id,v)])).not.toMatch(/\{[A-Za-z]\w*\}|\b(?:undefined|NaN)\b/);
        expect(hints.resolve(l.id,v,'minnie')).toBeTruthy();
        expect(hints.resolve(l.id,v,'moose')).toBeTruthy();
        expect(hints.resolveExplanation(l.id,v) || v.explanation).toBeTruthy();
        if (isTime(c.id)) {
          expect(v.visual.type).toBe(index?'digitalClock':'clock');
          const {hour,minute}=v.visual, h=words[hour%12], next=words[(hour+1)%12];
          const answers={0:`${h} uur`,5:`vijf over ${h}`,15:`kwart over ${h}`,20:`tien voor half ${next}`,25:`vijf voor half ${next}`,30:`half ${next}`,35:`vijf over half ${next}`,40:`tien over half ${next}`,45:`kwart voor ${next}`,50:`tien voor ${next}`,55:`vijf voor ${next}`};
          expect(v.answer.toLowerCase()).toBe(answers[minute]);
          expect(v.choices.every(c=>!/[0-9]/.test(c))).toBe(true);
        } else {
          const {a,b}=v.hintParameters;
          expect(v.answer).toBe(['bare_division','story_division','route'].includes(v.family)?a/b:a*b);
          expect(Number.isInteger(v.answer)).toBe(true);
          expect(v.prompt.match(/\d+/g).map(Number)).toEqual([a,b]);
          const explanation=hints.resolveExplanation(l.id,v);
          expect(explanation.match(/\d+/g).map(Number)).toEqual([a,b,v.answer,...(v.family.startsWith('bare_')?[]:[v.answer])]);
          expect(v.visual).toBeUndefined();
        }
        if (v.answerMode==='multipleChoice') {
          expect(v.choices).toHaveLength(4);expect(new Set(v.choices).size).toBe(4);expect(v.choices.filter(choice=>choice===v.answer)).toHaveLength(1);
        }
      }
    }
  }
  expect(variants).toHaveLength(96);
  expect(variants.filter(v=>v.visual)).toHaveLength(16);
  expect(variants.filter(v=>v.family==='bare_multiplication')).toHaveLength(40);
});

test('every position preserves the 0/10/50/100 mix, approved M6 identity and strict time routing', () => {
  const {levels} = authored();
  for (const l of levels) for (const c of l.learningChallenges) for (const slot of c.questions) for (const percentage of [0,10,50,100]) {
    const planner=learning.createPlanner(percentage,()=>0.37), selected=[];
    for (let i=0;i<20;i++) {
      const result=learning.selectPosition(slot.variants,planner,bank,{random:()=>0.37,used:selected});
      expect(result.fallback).toBe(false);
      const q=result.variant;selected.push(q);
      if (result.delivered==='M6') {
        expect(q).toEqual(bank.recover(q.centralQuestionId,q.surfaceId));
        expect(q.educationalDomain==='time').toBe(isTime(c.id));
        if (percentage===10) expect(q.difficulty).toBe(1);
      } else expect(slot.variants).toContainEqual(q);
    }
    expect(selected.filter(q=>q.learningLevel==='M6')).toHaveLength(percentage/5);
  }
});

async function boot(page,percentage=0) {
  await page.addInitScript(p=>localStorage.setItem('atlas.learning.m6Percentage',String(p)),percentage);
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  await page.waitForFunction(()=>window.eval('menuAdventureStats.loaded'));
}
async function activate(locator, info) { if(info.project.name.startsWith('ipad-')) await locator.tap(); else await locator.click(); }
async function correct(page,q,info) {
  if (q.answerMode==='multipleChoice') {
    await activate(page.locator(`[data-choice=${JSON.stringify(String(q.answer))}]`),info);
  } else if (q.answerSpec?.type==='euro') {
    await page.locator('[data-money-part="euros"]').fill(String(Math.floor(q.answer/100)));
    await page.locator('[data-money-part="cents"]').fill(String(q.answer%100));
    await activate(page.getByRole('button',{name:'Controleer',exact:true}),info);
  } else if (q.answerMode==='currencyCompose') {
    let remaining=q.answer;
    for(const denomination of [...q.answerSpec.denominations].sort((a,b)=>b-a)) {
      const count=Math.floor(remaining/denomination); remaining-=count*denomination;
      await page.locator(`[data-currency-count="${denomination}"]`).fill(String(count));
    }
    expect(remaining).toBe(0);
    await activate(page.getByRole('button',{name:'Controleer',exact:true}),info);
  } else {
    await page.locator('[data-open-answer]').fill(String(q.answer));
    await activate(page.getByRole('button',{name:'Controleer',exact:true}),info);
  }
  await expect(page.locator('[data-action="next-question"]')).toBeVisible();
  await activate(page.locator('[data-action="next-question"]'),info);
}

test('Frozen menu has Nieuw, 12 challenges and independent saved progression', async ({page},info) => {
  await boot(page);
  const card=page.locator('[data-menu-tile="LVL-0036"]');
  await expect(card).toContainText('Frozen Atlas');await expect(card.locator('.levelNewBadge')).toHaveText('Nieuw');
  await expect(page.locator('[data-menu-tile="LVL-0032"] .levelNewBadge')).toHaveCount(0);
  expect(await page.locator('[data-menu-tile]:has(.levelNewBadge)').evaluateAll(es=>es.map(e=>e.dataset.menuTile))).toEqual(['LVL-0036']);
  await expect(page.locator('.heroLevelTile')).toHaveAttribute('data-featured-level','LVL-0036');
  await expect(card).toContainText('4 plaatsen · 12 opdrachten');
  expect(await page.locator('[data-menu-tile]').evaluateAll(es=>es.map(e=>e.dataset.menuTile))).toEqual(['LVL-0001','LVL-0004','LVL-0032','LVL-0036','LVL-0013','LVL-0021','LVL-0027','LVL-0000','LVL-0008']);
  await page.screenshot({path:info.outputPath('frozen-menu.png')});
  await activate(card,info);await expect(page.getByRole('heading',{name:'Frozen Railway',exact:true})).toBeVisible();
  await activate(page.getByRole('button',{name:'Start avontuur',exact:true}),info);
  await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven_arc');
  expect(await page.evaluate(()=>window.eval('level.id'))).toBe(ids[0]);
  expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(false);
  expect(await page.evaluate(()=>window.eval('resolvedNextLevelId')())).toBe(ids[1]);
  const before=await page.evaluate(()=>{const keys=['lvl-0032-arc-progress','lvl-0035-arc-completed'];keys.forEach(k=>localStorage.setItem(k,'{"preserved":true}'));return keys.map(k=>[k,localStorage.getItem(k)]);});
  await page.evaluate(()=>window.eval('returnToMenu')());
  await activate(card,info);await activate(page.getByRole('button',{name:'Start avontuur',exact:true}),info);
  expect(await page.evaluate(()=>window.eval('state.completedRunes').size)).toBe(0);
  expect(await page.evaluate(pairs=>pairs.map(([k])=>[k,localStorage.getItem(k)]),before)).toEqual(before);
});

for(const percentage of [0,100]) test(`Frozen full adventure ${percentage}% M6: twelve challenges, earned exits and Gondola finish`,async({page},info)=>{
  test.setTimeout(240000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
  await boot(page,percentage);
  await page.evaluate(()=>window.eval('selectLevel')('LVL-0036',{startImmediately:true}));
  for(const [i,id] of ids.entries()) {
    await expect.poll(()=>page.evaluate(()=>window.eval('level.id'))).toBe(id);
    await expect(page.locator('[data-actor="sven"]')).toBeVisible();
    await expect.poll(()=>page.evaluate(()=>window.eval('state.sceneTransitionPending'))).toBe(false);
    await expect(page.locator('.teamMessage')).toHaveText(openings[i]);
    const l=await page.evaluate(()=>window.eval('level'));
    expect(await page.evaluate(()=>window.eval('state.completedRunes').size)).toBe(0);
    expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(false);
    await expect.poll(()=>page.evaluate(()=>window.eval('audioState.currentMusicKey'))).toBe('frozenAtlas');
    expect(await page.evaluate(()=>window.eval('audioState.music').src)).toContain('assets/audio/music/frozenatlas.mp3');
    await expect.poll(()=>page.evaluate(()=>window.eval('audioState.music').readyState)).toBeGreaterThanOrEqual(2);
    for(const asset of [l.world.background,l.world.depthmap]) expect(await page.evaluate(async asset=>{const image=new Image();image.src=asset;await image.decode();return [image.naturalWidth,image.naturalHeight];},asset)).toEqual([2172,724]);
    await page.screenshot({path:info.outputPath(`${id}-${percentage}-entry.png`)});
    for(const [ci,c] of l.learningChallenges.entries()) {
      // This executes normal path following and arrival before opening the question.
      if(ci===0) await activate(page.locator(`[data-rune="${c.id}"]`),info);
      else await page.evaluate(id=>window.eval('beginInteraction')(window.eval('runeById')(id),'rune'),c.id);
      await expect(page.locator('.challengeWorkspace')).toBeVisible({timeout:22000});
      const presenter=page.locator('[data-challenge-character="CHR-FROZEN-NIVA"]');
      await expect(presenter.locator('.eyebrow')).toHaveText('Niva');
      await expect(presenter.locator('img')).toHaveAttribute('alt','Niva');
      expect(await presenter.locator('img').evaluate((image,path)=>image.src===window.eval('readyAssetSrc')(path)&&image.complete&&image.naturalWidth>0,`Levels/${id}/Niva.png`)).toBe(true);
      const distance=await page.evaluate(id=>{const l=window.eval('level'),s=window.eval('state'),o=l.interactiveObjects.find(o=>o.id===id),p=l.walkGraph.nodes.find(p=>p.id===o.approachNode);return Math.hypot(s.worldX-p.x,s.worldY-p.y);},c.id);
      expect(distance).toBeLessThan(3);
      for(let n=0;n<4;n++) {
        const q=await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
        expect(q.learningLevel).toBe(percentage?'M6':'E5');
        if(percentage) {expect(q.centralQuestionId).toBeTruthy();expect(q.educationalDomain==='time').toBe(isTime(c.id));expect(q).toMatchObject({prompt:bank.recover(q.centralQuestionId,q.surfaceId).prompt});}
        else expect(c.questions[n].variants.map(v=>v.id)).toContain(q.id);
        if(n===0) {
          await page.evaluate(()=>{
            const q=window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')];
            const denomination=q.answerSpec?.denominations?.[0];
            const wrong=q.answerMode==='currencyCompose'?{[denomination]:String(denomination===q.answer?2:1)}
              :q.answerSpec?.type==='euro'?{euros:'9999',cents:'99'}:q.choices?.find(v=>v!==q.answer)??9999;
            window.eval('answerQuestion')(wrong);
          });
          expect(await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')].id)).toBe(q.id);
          if(percentage) await expect(page.locator('.integratedHelpHeader')).toContainText('Minnie');
          await page.screenshot({path:info.outputPath(`${id}-${c.id}-${percentage}.png`)});
        }
        await correct(page,q,info);
      }
      expect(await page.evaluate(()=>window.eval('state.completedRunes').size)).toBe(ci+1);
      expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(ci===2);
    }
    await expect(page.locator(`[data-hotspot="${l.exitHotspotId}"]`)).toHaveAttribute('data-exit-ready','true');
    await page.evaluate(()=>window.eval('beginInteraction')(window.eval('level').hotspots.find(h=>h.id===window.eval('level').exitHotspotId),'hotspot'));
    await expect(page.getByRole('heading',{name:`${l.title} voltooid`,exact:true})).toBeVisible({timeout:22000});
    await expect(page.locator('.rewardScreen')).toContainText(`Samen met Niva heeft Sven alle drie de plekken in ${l.title} onderzocht.`);
    expect(await page.locator('.rewardArt').evaluate((image,path)=>image.src===window.eval('readyAssetSrc')(path)&&image.complete&&image.naturalWidth>0,`Levels/${id}/Niva.png`)).toBe(true);
    expect(await page.evaluate(key=>JSON.parse(localStorage.getItem(key)),l.storageKey)).toMatchObject({answered:12,runCompleted:true,completedRuneIds:l.runes.map(r=>r.id)});
    if(i<3) await activate(page.locator('[data-action="next-level"]'),info);
    else {
      await expect(page.locator('[data-action="next-level"]')).toHaveCount(0);
      await expect(page.locator('.rewardScreen')).toContainText('Frozen Atlas voltooid');
      await page.screenshot({path:info.outputPath(`gondola-finish-${percentage}.png`)});
    }
  }
  await page.evaluate(()=>window.eval('returnToMenu')());
  await page.evaluate(()=>window.eval('selectLevel')('LVL-0039',{startImmediately:true}));
  expect(await page.evaluate(()=>window.eval('state.completedRunes').size)).toBe(0);
  expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(false);
  expect(errors).toEqual([]);
});

test('Frozen anchors, approaches and local content use the existing editor',async({page},info)=>{
  test.skip(info.project.name!=='desktop-chromium','The existing editor is desktop-only.');
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await bootEditorTest(page,base+'/?dev=editor&level=LVL-0039');
  await selectSceneItem(page,'challenge','machineryFragment');
  await expect(page.locator('[data-developer-tools]')).toContainText('Beschadigd ARC-wrakstuk');
  await page.keyboard.press('Control+k');
  await expect(page.locator('[data-editor-browser]')).toContainText('Ballistic Gondola');
  await expect(page.locator('[data-debug-node="exit-approach"] circle')).toBeVisible();
  await page.screenshot({path:info.outputPath('frozen-editor.png')});
});

// Snapshot invariants from the approved pre-correction working tree: numerical
// cores may move, but no new core, position type, choice set or protected question.
test('Frozen rebalance preserves every core, slot role, protected variant and routing class',()=>{
 const {levels}=authored(),qs=levels.flatMap(l=>l.learningChallenges.flatMap(c=>c.questions.flatMap(s=>s.variants)));
 const table=q=>['bare_multiplication','story_multiplication','bare_division','story_division'].includes(q.family);
 const digest=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
 expect(digest(levels.map(l=>[l.id,l.learningChallenges.map(c=>[c.id,c.questions.map(s=>[s.id,s.variants.map(q=>[q.id,q.family,q.answerMode,q.learningLevel])])])]))).toBe('7dfc2b47fde1512f30eff35fccc519759e5984f14b56f5b40a83bfba42c4a981');
 expect(digest(qs.filter(table).map(q=>[q.family,q.answerMode,q.hintParameters.a,q.hintParameters.b,q.answer,q.choices||null]).map(JSON.stringify).sort())).toBe('c770719a3b35a70bbd1fa5d82a5d08f3e622f662b6e48d65a57917a63d4f2db0');
 expect(digest(qs.filter(q=>!table(q)))).toBe('44f17d0bffdddb15575559891037f24549c42d8c9c22648c4111279121e44720');
 expect(digest(qs.map(q=>[q.id,q.prompt.replace(/\d+/g,'#'),q.explanation.replace(/\d+/g,'#'),q.hintParameters?.unit||null,q.hintParameters?.currency||null]))).toBe('5dfa9c58d16b1caae9aa2e6d7f4b899156cc12862b146a823d4cbaa6ca4c2ccf');
 const distribution=levels.map(l=>{const q=l.learningChallenges.flatMap(c=>c.questions.flatMap(s=>s.variants)).filter(table);return [q.filter(v=>v.family.endsWith('division')?[6,7,8,9].includes(v.hintParameters.b):[v.hintParameters.a,v.hintParameters.b].some(n=>[6,7,8,9].includes(n))).length,q.length];});
 expect(distribution).toEqual([[10,16],[14,24],[10,16],[12,20]]);
 expect(qs.filter(q=>q.answerMode==='open')).toHaveLength(38);
 expect(qs.filter(q=>q.answerMode==='multipleChoice')).toHaveLength(58);
 const slots=levels.flatMap(l=>l.learningChallenges.flatMap(c=>c.questions));
 expect(slots).toHaveLength(48);expect(slots.filter(s=>learning.positionDomain(s.variants)==='time')).toHaveLength(8);
 expect(slots.filter(s=>learning.positionDomain(s.variants)===undefined)).toHaveLength(40);
 expect(bank.size).toBe(159);expect(qs.filter(q=>learning.resolveLevel(q)==='M6')).toHaveLength(0);
});
test('Frozen targeted labels and mast wording are consistent',()=>{
 const {levels}=authored(),rail=levels[0],final=levels[3],name='Diensthuisje bij de brug';
 expect(rail.interactiveObjects.find(o=>o.id==='serviceBooth').label).toBe(name);
 expect(rail.runes.find(r=>r.id==='serviceBooth')).toMatchObject({name,shortName:name,intro:'Niva onderzoekt het diensthuisje bij de brug met Sven.'});
 expect(rail.areas.find(a=>a.id==='serviceBooth')).toMatchObject({name,description:'Onderzoek het diensthuisje bij de brug met Niva.'});
 expect(rail.menu.detail).toBe('Stationsklok, verlicht diensthuisje en diensthuisje bij de brug');
 expect(rail.companionMoments.find(m=>m.challengeId==='serviceBooth').text).toBe('Dit diensthuisje staat vlak bij de brug.');
 expect(rail.runes.find(r=>r.id==='illuminatedBooth').name).toBe('Verlicht diensthuisje');
 expect(final.runes.find(r=>r.id==='signalMast')).toMatchObject({name:'Signaalmast met waarschuwingslicht',intro:'Niva onderzoekt samen met Sven de signaalmast met het waarschuwingslicht.'});
 expect(final.areas.find(a=>a.id==='signalMast').description).toBe('Onderzoek samen met Niva de signaalmast met het waarschuwingslicht.');
});
