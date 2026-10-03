const {test,expect}=require('@playwright/test');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
async function boot(page){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+'/?atlasSessionTest=1');
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await expect(page.locator('.menuScreen')).toBeVisible();
 await page.evaluate(()=>{const a=window.AtlasWorld,original=a.lockedLevelIds;a.lockedLevelIds=(ids,options)=>original(ids,{...options,bypass:false});});
}
async function enter(page,id){
 expect(await page.evaluate(id=>window.eval('startLevelFromMenu')(id),id)).toBe(true);
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
}
async function done(page){return page.evaluate(()=>[...window.eval('state.completedRunes')]);}
async function snapshot(page){return page.evaluate(()=>({level:window.eval('level.id'),done:[...window.eval('state.completedRunes')],saved:JSON.parse(localStorage.getItem(window.eval('level.storageKey'))),storage:{...localStorage}}));}
async function solve(page,id){
 // Use the normal arrival handler, then answer all questions using the UI, without debug completion.
 await page.evaluate(id=>window.eval('finishInteraction')(window.eval('runeById')(id),'rune','activate'),id);
 for(let i=0;i<4;i++){
  const q=await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
  if(q.answerMode==='open'){await page.locator('[data-open-answer]').fill(String(q.answer));await page.getByRole('button',{name:'Controleer',exact:true}).click();}
  else await page.locator(`[data-choice="${q.answer}"]`).click();
  await page.locator('[data-action="next-question"]').click();
 }
}
async function finish(page){
 await page.evaluate(()=>window.eval('finishInteraction')(window.eval('hotspotById')(window.eval('level.exitHotspotId')),'hotspot','activate'));
 await expect.poll(()=>page.evaluate(()=>window.eval('state.screen'))).toBe('reward');
}
test('full earned ARC sequence returns to a fresh Dam replay without losing history',async({page},info)=>{
 test.setTimeout(300000); // 68 authored answers, including re-answering discarded partial runs on touch WebKit.
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await boot(page);await page.locator('[data-menu-tile="LVL-0032"]').click();
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 const trace=[];
 for(const id of ['LVL-0032','LVL-0033','LVL-0034','LVL-0035']){
  await expect.poll(()=>page.evaluate(()=>window.eval('level.id'))).toBe(id);
  // The ID changes before the deferred scene reveal finishes; wait before entering a challenge.
  await expect(page.locator('.sceneChainFadeOut')).toHaveCount(0);
  expect(await done(page)).toEqual([]);
  for(const rune of await page.evaluate(()=>window.eval('activeRunes')().slice().sort((a,b)=>Number(window.eval('requiresAllOtherChallenges')(window.eval('learningChallengeForRune')(a)))-Number(window.eval('requiresAllOtherChallenges')(window.eval('learningChallengeForRune')(b)))).map(r=>r.id))){
   await solve(page,rune);
   if(id==='LVL-0032'&&rune==='car'){
    expect(await done(page)).toEqual(['car']);
    await page.reload();await boot(page);await enter(page,id);
    expect(await done(page)).toEqual([]);
    await solve(page,'car');
   }
  }
  expect(await done(page)).toHaveLength(3);await finish(page);trace.push(await snapshot(page));
  if(id!=='LVL-0035')await page.locator('[data-action="next-level"]').click();
 }
 await page.locator('[data-action="menu"]').click();
 await page.locator('[data-menu-tile="LVL-0032"]').click();
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 trace.push(await snapshot(page));
 await info.attach('replay-state.json',{body:JSON.stringify(trace,null,2),contentType:'application/json'});
 expect(await done(page)).toEqual([]);
 await expect(page.locator('[data-rune].runeDone')).toHaveCount(0);
 expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(false);
 for(const previous of trace.slice(0,4)){
  expect(await page.evaluate(id=>window.eval('storedLevelIsComplete')(window.SVEN_LEVEL_DEFINITIONS[id]),previous.level)).toBe(true);
  for(const [key,value] of Object.entries(previous.storage).filter(([key])=>key.includes('lvl-003'))) {
   expect(await page.evaluate(key=>localStorage.getItem(key),key)).toBe(value);
  }
 }
 expect(await page.evaluate(()=>window.AtlasWorld.readRecent())).toEqual(['LVL-0033','LVL-0034','LVL-0035','LVL-0032']);
 const first=await page.evaluate(()=>window.eval('activeRunes')()[0].id);
 await solve(page,first);expect(await done(page)).toEqual([first]);
 expect((await snapshot(page)).saved).toEqual(trace[0].saved);
 const historical=trace[0].saved.completedAt;
 expect((await snapshot(page)).saved.completedAt).toBe(historical);
 await page.reload();await boot(page);await enter(page,'LVL-0032');
 expect(await done(page)).toEqual([]);
 for(const rune of await page.evaluate(()=>window.eval('activeRunes')().map(r=>r.id)))await solve(page,rune);
 await finish(page);expect(await done(page)).toHaveLength(3);
 expect((await snapshot(page)).saved.runCompleted).toBe(true);
 expect(errors).toEqual([]);
});


test('legacy completion and ordinary cooldown survive while unfinished runs reset',async({page})=>{
 test.setTimeout(60000); // Real answers plus three application bootstraps and menu/restart transitions.
 await boot(page);
 // A non-Nieuw level with an existing pre-fix completion record.
 await page.evaluate(async()=>{
  await window.eval('selectLevel')('LVL-0001',{startImmediately:true});
  const l=window.eval('level');
  localStorage.setItem(l.storageKey,JSON.stringify({levelId:l.id,completedAt:'2026-01-01T00:00:00.000Z',activeChallengeSignature:window.eval('activeChallengeSignature')(l),completedRuneIds:window.eval('activeRunes')().map(r=>r.id)}));
  window.eval('returnToMenu')();
 });
 expect(await page.evaluate(()=>window.eval('startLevelFromMenu')('LVL-0001'))).toBe(false);
 await page.evaluate(()=>{window.eval('recordLevelStarted')('LVL-0032');window.eval('recordLevelStarted')('LVL-0033');});
 await enter(page,'LVL-0001');expect(await done(page)).toEqual([]);
 expect(await page.evaluate(()=>window.eval('storedLevelIsComplete')(window.eval('level')))).toBe(true);
 // Seed an old partial snapshot without changing the durable completion date.
 await solve(page,(await page.evaluate(()=>window.eval('activeRunes')().map(r=>r.id)))[0]);
 expect(await done(page)).toHaveLength(1);
 // The old progress writer retained completedAt and added updatedAt, without a marker.
 await page.evaluate(()=>{
  const key=window.eval('level.storageKey'),saved=JSON.parse(localStorage.getItem(key));
  delete saved.runCompleted;saved.updatedAt='2026-01-02T00:00:00.000Z';saved.completedRuneIds=[window.eval('activeRunes')()[0].id];localStorage.setItem(key,JSON.stringify(saved));
 });
 await boot(page);
 await page.evaluate(()=>window.eval('selectLevel')('LVL-0001',{startImmediately:true}));
 expect(await done(page)).toEqual([]);
 expect((await snapshot(page)).saved.completedAt).toBe('2026-01-01T00:00:00.000Z');
 // Explicit restart also ignores the legacy partial snapshot, preserving history.
 await page.evaluate(()=>window.eval('restart')());
 await boot(page);await page.evaluate(()=>window.eval('selectLevel')('LVL-0001',{startImmediately:true}));
 expect(await done(page)).toEqual([]);
 expect((await snapshot(page)).saved.completedAt).toBe('2026-01-01T00:00:00.000Z');
});
