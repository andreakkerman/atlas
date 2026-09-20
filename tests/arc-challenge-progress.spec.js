const {test,expect}=require('@playwright/test');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
const riven=['seaContainer','raiderCache','blueSuitcase'];
async function boot(page){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.goto(base+'/?atlasSessionTest=1');
}
async function enter(page,id){await page.evaluate(id=>window.eval('selectLevel')(id,{startImmediately:true}),id);}
async function completed(page){return page.evaluate(()=>[...window.eval('state.completedRunes')]);}
async function leave(page){
  await page.evaluate(()=>window.eval('finishInteraction')(window.eval('hotspotById')(window.eval('level').exitHotspotId),'hotspot','activate'));
  await expect.poll(()=>page.evaluate(()=>window.eval('state.screen'))).toBe('reward');
}
async function snapshot(page){return page.evaluate(()=>({level:window.eval('level').id,done:[...window.eval('state.completedRunes')],debug:!!window.eval('state.devCompletionActive'),storage:Object.fromEntries(Object.entries(localStorage).filter(([key])=>/lvl-003[234]|arcAtlas|recent/.test(key)))}));}
for(const source of ['LVL-0032','LVL-0033','LVL-0034'])test(`held completion shortcut cannot complete the level after ${source}`,async({page},info)=>{
  await boot(page);await enter(page,source);
  await page.evaluate(()=>{window.shortcutRepeats=[];window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='l')window.shortcutRepeats.push(e.repeat);});});
  await page.keyboard.down('Control');await page.keyboard.down('Shift');await page.keyboard.down('l');
  expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(true);
  await leave(page);
  await page.locator('[data-action="next-level"]').click();
  await expect.poll(()=>page.evaluate(()=>window.eval('level.id'))).toBe({'LVL-0032':'LVL-0033','LVL-0033':'LVL-0034','LVL-0034':'LVL-0035'}[source]);
  // Another keydown while L remains down models the OS auto-repeat event.
  await page.keyboard.down('l');
  expect(await page.evaluate(()=>window.shortcutRepeats)).toEqual([false,true]);
  await info.attach('held-key-state.json',{body:JSON.stringify(await snapshot(page),null,2),contentType:'application/json'});
  expect(await completed(page)).toEqual([]);
  await expect(page.locator('[data-rune].runeDone')).toHaveCount(0);
  expect(await page.evaluate(()=>localStorage.getItem(window.eval('level.storageKey')))).toBeNull();
  await page.keyboard.up('l');await page.keyboard.up('Shift');await page.keyboard.up('Control');
  // A new deliberate press remains useful in the new level.
  await page.keyboard.press('Control+Shift+L');
  expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(true);
});
async function solve(page,id){
  // Enter via the ordinary arrival handler; answer every question through the UI.
  await page.evaluate(id=>window.eval('finishInteraction')(window.eval('runeById')(id),'rune','activate'),id);
  for(let i=0;i<4;i++){
    const q=await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
    if(q.answerMode==='open'){await page.locator('[data-open-answer]').fill(String(q.answer));await page.getByRole('button',{name:'Controleer',exact:true}).click();}
    else await page.locator(`[data-choice="${q.answer}"]`).click();
    await page.locator('[data-action="next-question"]').click();
  }
}
for(const scenario of ['fresh','normal','shortcut'])test(`ARC progress isolation: ${scenario}`,async({page},info)=>{
  // This flow answers 24 questions through real UI controls, as in the ARC level suites.
  if(scenario==='normal')test.setTimeout(120000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await boot(page);const trace=[],previous={};
  if(scenario==='fresh')await enter(page,'LVL-0034');
  else{
    await enter(page,'LVL-0032');
    for(const id of ['LVL-0032','LVL-0033']){
      expect(await completed(page)).toEqual([]);
      if(scenario==='shortcut')await page.keyboard.press('Control+Shift+L');
      else for(const rune of await page.evaluate(()=>window.eval('activeRunes')().map(r=>r.id)))await solve(page,rune);
      expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(true);
      trace.push(await snapshot(page));
      await leave(page);
      previous[id]=await page.evaluate(()=>localStorage.getItem(window.eval('level.storageKey')));
      if(scenario==='shortcut')expect(previous[id]).toBeNull();
      else {expect(JSON.parse(previous[id]).levelId).toBe(id);expect(JSON.parse(previous[id]).completedRuneIds).toHaveLength(3);}
      await page.locator('[data-action="next-level"]').click();
      await expect.poll(()=>page.evaluate(()=>window.eval('level.id'))).toBe(id==='LVL-0032'?'LVL-0033':'LVL-0034');
    }
  }
  trace.push(await snapshot(page));
  await info.attach('progress-trace.json',{body:JSON.stringify(trace,null,2),contentType:'application/json'});
  await page.screenshot({path:info.outputPath('riven-entry.png')});
  expect(await completed(page)).toEqual([]);
  await expect(page.locator('[data-rune].runeDone')).toHaveCount(0);
  expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(false);
  expect(await page.evaluate(()=>localStorage.getItem(window.eval('level.storageKey')))).toBeNull();
  for(const [id,value] of Object.entries(previous))expect(await page.evaluate(id=>localStorage.getItem(window.SVEN_LEVEL_DEFINITIONS[id].storageKey),id)).toBe(value);
  expect(errors).toEqual([]);
});
test('Riven Tides persists only answered challenges, including partial reloads',async({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await boot(page);await enter(page,'LVL-0034');
  for(let i=0;i<riven.length;i++){
    await solve(page,riven[i]);
    expect(await completed(page)).toEqual(riven.slice(0,i+1));
    await expect(page.locator('[data-rune].runeDone')).toHaveCount(i+1);
    await page.reload();await enter(page,'LVL-0034');
    expect(await completed(page)).toEqual(riven.slice(0,i+1));
  }
  expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(true);
  await leave(page);
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(window.eval('level.storageKey'))));
  expect(saved.completedRuneIds).toEqual(riven);expect(saved.completedAt).toBeTruthy();
  // Finishing closes this run; re-entry starts fresh while history remains earned.
  await page.reload();await enter(page,'LVL-0034');expect(await completed(page)).toEqual([]);
  expect(await page.evaluate(()=>window.eval('storedLevelIsComplete')(window.eval('level')))).toBe(true);
  expect(errors).toEqual([]);
});
