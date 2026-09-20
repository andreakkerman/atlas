const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
const lines={'LVL-0032':'Dam Battlegrounds… ooit gaf deze dam stroom. Nu wemelt het hier van de ARC.','LVL-0033':'Buried City… ooit was dit Marano. Kijken wat het zand heeft bewaard?'};
function setup(){const window={};for(const file of ['src/playable-characters.js','src/atlas-world.js','Levels/manifest.js','Levels/world-config.js'])vm.runInNewContext(fs.readFileSync(file,'utf8'),{window});const api=window.AtlasWorld,resolver=api.createWorldResolver(window.SVEN_LEVEL_MANIFEST.levels,window.SVEN_WORLD_CONFIG);return {window,api,resolver};}
test('authored world inheritance, level overrides and history-based replay have no expiry',()=>{
 const {api,resolver}=setup(),data=new Map(),storage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};
 const locked=()=>api.lockedLevelIds(resolver.allEnabledIds(),{bypass:false,storage,isNew:resolver.isNew});
 for(const id of ['LVL-0032','LVL-0033','LVL-0034','LVL-0035']){
  expect(resolver.isNew(id)).toBe(true);
  for(let i=0;i<5;i++){api.recordRecent(id,storage);expect(locked().has(id)).toBe(false);}
  const history=storage.getItem(api.RECENT_STORAGE_KEY);
  resolver.updateLevelSettings(id,{isNew:false});expect(locked().has(id)).toBe(true);
  expect(storage.getItem(api.RECENT_STORAGE_KEY)).toBe(history);
  resolver.updateLevelSettings(id,{isNew:null});expect(resolver.isNew(id)).toBe(true);
 }
 expect([...data.keys()]).toEqual([api.RECENT_STORAGE_KEY]);
 api.recordRecent('LVL-0001',storage);expect(locked().has('LVL-0001')).toBe(true);
 api.recordRecent('LVL-0004',storage);expect(locked().has('LVL-0001')).toBe(true);
 api.recordRecent('LVL-0035',storage);expect(locked().has('LVL-0001')).toBe(false);
 const config=resolver.getConfig();delete config.worlds['LVL-0032'].isNew;resolver.setConfig(config);
 expect(locked().has('LVL-0035')).toBe(true);expect(resolver.worldHasNew('LVL-0032')).toBe(false);
 resolver.updateLevelSettings('LVL-0034',{isNew:true});expect(resolver.worldHasNew('LVL-0032')).toBe(true);
 expect(resolver.isNew('LVL-0035')).toBe(false);expect(resolver.isNew('missing')).toBe(false);
 api.recordRecent('LVL-0001',storage);expect(locked().has('LVL-0001')).toBe(true);
 resolver.updateLevelSettings('LVL-0001',{isNew:true});expect(locked().has('LVL-0001')).toBe(false);
 resolver.updateLevelSettings('LVL-0001',{isNew:false});expect(locked().has('LVL-0001')).toBe(true);
});
test('world-config save normalization preserves and validates authored flags',()=>{
 const {window,resolver}=setup(),source=fs.readFileSync('scripts/dev-server.js','utf8');
 const normalize=vm.runInNewContext(source.slice(source.indexOf('function normalizeWorldConfig('),source.indexOf('function loadWorldConfig('))+';normalizeWorldConfig',{
 loadLevelCatalog:()=>window.SVEN_LEVEL_MANIFEST.levels,catalogRootId:id=>resolver.rootIdFor(id),playableCharactersApi:window.AtlasPlayableCharacters});
 const input={worlds:{'LVL-0032':{isNew:true}},levels:{'LVL-0035':{isNew:false},'LVL-0001':{isNew:true}}};
 expect(normalize(input)).toMatchObject(input);
 input.worlds['LVL-0032'].isNew='true';expect(()=>normalize(input)).toThrow('isNew must be boolean');
 input.worlds['LVL-0032'].isNew=true;input.levels['LVL-0035'].isNew=1;expect(()=>normalize(input)).toThrow('isNew must be boolean');
});
async function menu(page){await page.goto(base);await page.evaluate(()=>{const a=window.AtlasWorld,original=a.lockedLevelIds;a.lockedLevelIds=(ids,options)=>original(ids,{...options,bypass:false});});await page.getByRole('button',{name:'Start avontuur',exact:true}).click();}
test('all new worlds remain represented through carousel rotation, recomputation and reload without duplicates',async({page},info)=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await menu(page);const order=await page.locator('[data-menu-tile]').evaluateAll(nodes=>nodes.map(n=>n.dataset.menuTile));
 const tile=page.locator('[data-menu-tile="LVL-0032"]');await expect(tile.locator('.levelNewBadge')).toHaveText('Nieuw');
 expect(await page.evaluate(()=>localStorage.getItem('arcAtlasFirstSeenAt'))).toBeNull();
 await page.evaluate(()=>{const r=window.eval('worldResolver'),c=r.getConfig();c.worlds['LVL-0004']={...c.worlds['LVL-0004'],isNew:true};r.setConfig(c);window.eval('render')();});
 for(let i=0;i<order.length*2;i++){
  await page.evaluate(()=>window.eval('changeMenuHero')(1,{auto:true}));
  for(const id of ['LVL-0032','LVL-0004'])await expect(page.locator('[data-menu-tile="'+id+'"] .levelNewBadge')).toHaveText('Nieuw');
  expect(await page.locator('[data-menu-tile]').evaluateAll(nodes=>nodes.map(n=>n.dataset.menuTile))).toEqual(order);
 }
 await page.evaluate(()=>window.eval('refreshMenuAdventureStats')());
 expect(new Set(order).size).toBe(order.length);
 const geometry=await tile.evaluate(el=>{const b=el.getBoundingClientRect(),tag=el.querySelector('.levelNewBadge').getBoundingClientRect();return {right:b.right-tag.right,overlap:[...el.querySelectorAll('strong,.levelBadge,.levelLockIndicator')].some(n=>{const r=n.getBoundingClientRect();return tag.left<r.right&&tag.right>r.left&&tag.top<r.bottom&&tag.bottom>r.top;}),overflow:document.documentElement.scrollWidth>innerWidth};});
 expect(geometry.overlap).toBe(false);expect(geometry.overflow).toBe(false);expect(geometry.right).toBeGreaterThan(10);
 await tile.screenshot({path:info.outputPath('authored-nieuw.png')});
 await page.evaluate(()=>{const r=window.eval('worldResolver'),c=r.getConfig();c.worlds['LVL-0032'].isNew=false;r.setConfig(c);window.eval('render')();});
 await expect(tile.locator('.levelNewBadge')).toHaveCount(0);
 expect(await page.locator('[data-menu-tile]').evaluateAll(nodes=>nodes.map(n=>n.dataset.menuTile))).toEqual(order);
 await page.evaluate(()=>localStorage.setItem('arcAtlasFirstSeenAt','1'));
 await page.reload();await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await expect(tile.locator('.levelNewBadge')).toHaveText('Nieuw');
 await page.clock.setFixedTime(new Date('2036-01-01'));await page.evaluate(()=>window.eval('render')());await expect(tile.locator('.levelNewBadge')).toHaveText('Nieuw');
 expect(await page.evaluate(()=>localStorage.getItem('arcAtlasFirstSeenAt'))).toBe('1');expect(errors).toEqual([]);
});
test('actual replay guard permits repeated ARC plays with an obsolete timestamp and leaves later exits locked',async({page})=>{
 await menu(page);await page.evaluate(()=>localStorage.setItem('arcAtlasFirstSeenAt','1'));
 for(const id of ['LVL-0032','LVL-0033','LVL-0034','LVL-0035']){
  for(let attempt=0;attempt<3;attempt++){
   await page.evaluate(()=>window.eval('returnToMenu')());
   expect(await page.evaluate(id=>window.eval('startLevelFromMenu')(id),id)).toBe(true);
   await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
   expect(await page.evaluate(()=>window.eval('state.completedRunes').size)).toBe(0);
   expect(await page.evaluate(()=>window.eval('isLevelExitReady')())).toBe(false);
   await expect(page.locator('[data-action="next-level"]')).toHaveCount(0);
   expect(await page.evaluate(()=>window.AtlasWorld.readRecent().at(-1))).toBe(id);
  }
 }
});

test('real replay guard waives ARC cooldown, preserves earned progression and restores locks when Nieuw is removed', async ({ page }) => {
  test.setTimeout(120000);
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await menu(page);
  await page.locator('[data-menu-tile="LVL-0032"]').click();
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  await expect(page.locator('[data-action="next-level"]')).toHaveCount(0);
  expect(await page.evaluate(() => window.eval('state.completedRunes').size)).toBe(0);
  await expect(page.locator('[data-hotspot][data-exit-ready="true"]')).toHaveCount(0);
  await page.evaluate(() => window.eval('returnToMenu')());
  expect(await page.evaluate(() => window.eval('startLevelFromMenu')('LVL-0032'))).toBe(true);
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  // Earn the normal continuation through all twelve authored questions.
  for (const id of ['car', 'lootCrate', 'raiderCache']) {
    await page.evaluate(id => window.eval('selectChallenge')(window.eval('runeById')(id)), id);
    await expect(page.locator('[data-challenge-character="CHR-ARC-VALENTE"]')).toBeVisible({ timeout: 22000 });
    for (let q = 0; q < 4; q++) {
      const v = await page.evaluate(() => window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
      if (v.answerMode === 'open') {
        await page.locator('[data-open-answer]').fill(String(v.answer));
        await page.getByRole('button', { name: 'Controleer', exact: true }).click();
      } else await page.locator(`[data-choice="${v.answer}"]`).click();
      await page.locator('[data-action="next-question"]').click();
    }
  }
  await page.locator('[data-hotspot][data-exit-ready="true"]').click();
  await page.locator('[data-action="next-level"]').click({ timeout: 22000 });
  await expect(page.getByText(lines['LVL-0033'], { exact: true })).toBeVisible();
  expect(await page.evaluate(() => window.eval('level.id'))).toBe('LVL-0033');
  expect(await page.evaluate(() => window.eval('state.completedRunes').size)).toBe(0);
  await page.evaluate(() => window.eval('returnToMenu')());
  expect(await page.evaluate(() => window.eval('startLevelFromMenu')('LVL-0033'))).toBe(true);
  await page.getByRole('button', { name: 'Start avontuur', exact: true }).click();
  const history = await page.evaluate(() => window.AtlasWorld.readRecent());
  expect(history.slice(-2)).toEqual(['LVL-0032', 'LVL-0033']);
  const progress = await page.evaluate(() => [localStorage.getItem('lvl-0032-arc-progress'), localStorage.getItem('lvl-0033-arc-progress')]);
  await page.evaluate(()=>{const r=window.eval('worldResolver'),c=r.getConfig();delete c.worlds['LVL-0032'].isNew;r.setConfig(c);});
  await page.evaluate(() => window.eval('returnToMenu')());
  for (const id of Object.keys(lines)) expect(await page.evaluate(id => window.eval('startLevelFromMenu')(id), id)).toBe(false);
  expect(await page.evaluate(() => window.AtlasWorld.readRecent())).toEqual(history);
  expect(await page.evaluate(() => [localStorage.getItem('lvl-0032-arc-progress'), localStorage.getItem('lvl-0033-arc-progress')])).toEqual(progress);
  expect(await page.evaluate(()=>localStorage.getItem('arcAtlasFirstSeenAt'))).toBeNull();
  expect(errors).toEqual([]);
});
