const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..');
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
const ids=['terminal','roundContainer','crate'];
function authored(){const window={};vm.runInNewContext(fs.readFileSync(path.join(root,'Levels/LVL-0035/level.js'),'utf8'),{window});return window.SVEN_LEVEL_DEFINITIONS['LVL-0035'];}
test('Stella Montis has measured assets, exact anchors and complete math and clock banks',()=>{
 const l=authored();
 expect(l.world).toMatchObject({width:2172,height:724,background:'Levels/LVL-0035/stellamontis.png',depthmap:'Levels/LVL-0035/depthmap.png'});
 for(const asset of [l.world.background,l.world.depthmap]){const png=fs.readFileSync(path.join(root,asset));expect([png.readUInt32BE(16),png.readUInt32BE(20)]).toEqual([2172,724]);}
 expect(l.player.characterId).toBe('sven_arc');expect(JSON.stringify(l)).not.toContain('locomotion');
 expect(l.learningChallenges.map(c=>c.id)).toEqual(ids);
 expect(l.interactiveObjects.map(o=>o.center)).toEqual([{x:475,y:505},{x:1323,y:374},{x:1500,y:546},{x:2020,y:450}]);
 expect(l.walkPath[0]).toMatchObject({x:110,y:616});expect(l.walkPath.at(-1)).toMatchObject({x:2020,y:508});
 for(const o of l.interactiveObjects)expect(l.walkPath.some(p=>p.id===o.approachNode)).toBe(true);
 for(const c of l.learningChallenges){
  expect(c.questions).toHaveLength(4);
  for(const slot of c.questions){expect(slot.variants).toHaveLength(2);for(const v of slot.variants){
   expect(v).toMatchObject({domain:'math',schoolBand:'E5-intended'});if(c.id==='roundContainer'){expect(v.family).toBe('clock_reading');expect(v.visual.type).toBe('clock');expect(v.answer).not.toMatch(/\d/);}else expect(v.visual).toBeUndefined();
   expect(v.hintMinnie).toBeTruthy();expect(v.hintMoose).toBeTruthy();
   if(c.id!=='roundContainer'){const equation=v.explanation.match(/^(\d+) ([×:]) (\d+) = (\d+)/);expect(equation).toBeTruthy();
   expect(equation[2]==='×'?+equation[1]*+equation[3]:+equation[1]/+equation[3]).toBe(v.answer);}
   if(v.choices){expect(new Set(v.choices).size).toBe(4);expect(v.choices).toContain(v.answer);}
  }}
 }
 expect(l.exits[0].targetLevel).toBeNull();expect(JSON.stringify(l)).not.toContain('LVL-0036');
 expect(l.companionMoments.find(m=>m.event==='LEVEL_ENTER')).toMatchObject({speaker:'minnie',text:'Stella Montis... één van de gevaarlijkste ARC-maps.'});
});
async function enter(page,editor=false){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+(editor?'/?dev=editor':'/?atlasSessionTest=1'));
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await page.evaluate(()=>window.eval('selectLevel')('LVL-0035',{startImmediately:true}));
 await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven_arc');
}
for(const variant of [0,1])test(`Stella Montis variant ${variant+1}: walk, math, guides, completion and reload`,async({page},info)=>{
 test.setTimeout(120000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
 await enter(page);
 await expect(page.getByText('Stella Montis... één van de gevaarlijkste ARC-maps.',{exact:true})).toBeVisible();
 expect(await page.evaluate(()=>window.eval('locomotionTuning')().fromIdleMovement)).toBe(.25);
 await expect.poll(()=>page.evaluate(()=>window.eval('audioState.currentMusicKey'))).toBe('arcAtlas');
 for(const id of ['minnie','moose'])expect(await page.locator(`[data-guide-image="${id}"]`).evaluate((img,id)=>img.dataset.openSrc===window.eval('readyAssetSrc')(`assets/guides/ARC_${id}.png`)&&img.complete&&img.naturalWidth>0,id)).toBe(true);
 await page.screenshot({path:info.outputPath('stella-montis-entry.png')});
 await page.evaluate(v=>{Math.random=()=>v ? .999 : 0;},variant);
 expect(await page.evaluate(()=>[...window.eval('state.completedRunes')])).toEqual([]);
 for(const id of ids){
  await page.evaluate(id=>window.eval('beginInteraction')(window.eval('runeById')(id),'rune'),id);
  await expect(page.locator('[data-challenge-character="CHR-ARC-VALENTE"]')).toBeVisible({timeout:22000});
  const arrival=await page.evaluate(id=>{const l=window.eval('level'),s=window.eval('state'),o=l.interactiveObjects.find(o=>o.id===id),p=l.walkGraph.nodes.find(p=>p.id===o.approachNode);return Math.hypot(s.worldX-p.x,s.worldY-p.y);},id);
  expect(arrival).toBeLessThan(3);
  expect(await page.locator('.challengeCharacterPortrait').evaluate(img=>img.complete&&img.naturalWidth===1254)).toBe(true);
  for(let q=0;q<4;q++){
   const v=await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
   expect(v.id.endsWith(variant?'b':'a')).toBe(true);
   if(id==='roundContainer'){await expect(page.locator('[data-clock-visual]')).toHaveAttribute('data-clock-hour',String(v.visual.hour));await expect(page.locator('[data-clock-visual]')).toHaveAttribute('data-clock-minute',String(v.visual.minute));await expect(page.locator('.clockNumerals text')).toHaveCount(12);}
   if(q===0){
    if(v.answerMode==='open'){await page.locator('[data-open-answer]').fill(String(v.answer+1));await page.getByRole('button',{name:'Controleer',exact:true}).click();}
    else await page.locator('[data-choice="'+v.choices.find(c=>c!==v.answer)+'"]').click();
    expect(await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')].id)).toBe(v.id);
    await page.locator('.challengeCharacterPortrait, [data-guide-image]').evaluateAll(images=>Promise.all(images.map(img=>img.decode())));
    await page.screenshot({path:info.outputPath(id+'-challenge.png')});
   }
   if(v.answerMode==='open'){await page.locator('[data-open-answer]').fill(String(v.answer));await page.getByRole('button',{name:'Controleer',exact:true}).click();}
   else await page.locator(`[data-choice="${v.answer}"]`).click();
   await page.locator('[data-action="next-question"]').click();
  }
  expect(await page.evaluate(()=>[...window.eval('state.completedRunes')])).toEqual(ids.slice(0,ids.indexOf(id)+1));
  await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0035',{startImmediately:true}));
  expect(await page.evaluate(()=>[...window.eval('state.completedRunes')])).toEqual(ids.slice(0,ids.indexOf(id)+1));
  await page.evaluate(v=>{Math.random=()=>v ? .999 : 0;},variant);
 }
 await expect(page.locator('[data-hotspot="sectorExit"]')).toHaveAttribute('data-exit-ready','true');
 await page.locator('[data-hotspot="sectorExit"]').click();
 await expect(page.getByRole('heading',{name:'Stella Montis voltooid',exact:true})).toBeVisible({timeout:22000});
 await expect(page.locator('[data-action="next-level"]')).toHaveCount(0);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(window.eval('level.storageKey'))));
 expect(saved.completedAt).toBeTruthy();expect(saved.completedRuneIds).toEqual(ids);
 expect(await page.evaluate(()=>window.eval('resolvedNextLevelId')())).toBeNull();
 await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0035',{startImmediately:true}));
 expect(await page.evaluate(()=>[...window.eval('state.completedRunes')])).toEqual(ids);
 expect(errors).toEqual([]);
});
test('Stella Montis editor exposes the shared path, three challenges, local scale and global ARC profile',async({page},info)=>{
 await enter(page,true);await page.keyboard.press('Control+Shift+D');
 await page.locator('[data-editor-mode="characters"]').click();
 await expect(page.locator('[data-main-character="LVL-0035"]')).toHaveValue('sven_arc');
 await page.locator('[data-editor-panel-key="sven-locomotion"] summary').click();
 await expect(page.locator('[data-locomotion-setting="fromIdleMovement"]')).toHaveValue('25');
 await expect(page.locator('[data-editor-panel-key="sven-locomotion"]')).toContainText('Character / Global');
 await page.locator('[data-level-setting="spriteScale"]').fill('1.2');
 expect(await page.evaluate(()=>window.eval('levelTuning')().spriteScale)).toBe(1.2);
 expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0035').mainCharacterSettings.sven_arc)).not.toHaveProperty('locomotion');
 await page.locator('[data-editor-mode="challenges"]').click();
 for(const name of ['Computerterminal','Ronde container','Voorraadkist'])await expect(page.locator('[data-developer-tools]')).toContainText(name);
 await expect(page.locator('[data-walkpath-index]').first()).toBeVisible();
 await page.locator('[data-debug-action="collapse-editor-panel"]').click();
 const point=page.locator('[data-debug-node="terminal-approach"] circle');
 const before=await page.evaluate(()=>window.eval('level').walkPath.find(p=>p.id==='terminal-approach').x);
 const box=await point.boundingBox();
 expect(box).toBeTruthy();
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
 await page.mouse.down();
 await page.mouse.move(box.x+box.width/2+20,box.y+box.height/2+5,{steps:5});
 await page.mouse.up();
 expect(await page.evaluate(()=>window.eval('level').walkPath.find(p=>p.id==='terminal-approach').x)).not.toBe(before);
 const anchor=page.locator('[data-object-drag="center"][data-object-id="terminal"]');
 const anchorBox=await anchor.boundingBox();expect(anchorBox).toBeTruthy();
 await page.mouse.move(anchorBox.x+anchorBox.width/2,anchorBox.y+anchorBox.height/2);await page.mouse.down();
 await page.mouse.move(anchorBox.x+anchorBox.width/2+18,anchorBox.y+anchorBox.height/2,{steps:5});await page.mouse.up();
 expect(await page.evaluate(()=>window.eval('level').interactiveObjects.find(o=>o.id==='terminal').center.x)).not.toBe(475);
 await page.locator('[data-debug-action="restore-editor-panel"]').click();
 await expect(page.locator('[data-developer-tools]')).toBeVisible();
 await page.screenshot({path:info.outputPath('stella-montis-editor.png')});
});
test('Stella Montis supplied depth map is used by Cinematic and Voxel',async({page})=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Requires real WebGPU');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await enter(page);
 for(const mode of ['cinematic','voxel']){
  await page.evaluate(mode=>{window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
  const snapshot=()=>page.evaluate(mode=>window.eval(mode==='cinematic'?'cinematicRenderer':'voxelRenderer').snapshot(),mode);
  await expect.poll(async()=>(await snapshot()).ready,{timeout:25000}).toBe(true);
  if(mode==='cinematic')await expect.poll(async()=>(await snapshot()).depthStatus).toBe('ready');
  expect((await snapshot())[mode==='cinematic'?'depthPath':'depthMap']).toBe('Levels/LVL-0035/depthmap.png');
 }
 expect(errors).toEqual([]);
});
