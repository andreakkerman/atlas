const {test,expect}=require('@playwright/test');
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=path.join(__dirname,'..');
require('./editor-draft-fixture').preserveEditorDrafts(test,root);
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0].replace(/\/$/,'');
const ids=['seaContainer','raiderCache','blueSuitcase'];
function authored(){const window={};vm.runInNewContext(fs.readFileSync(path.join(root,'Levels/LVL-0034/level.js'),'utf8'),{window});return window.SVEN_LEVEL_DEFINITIONS['LVL-0034'];}
test('Riven Tides has measured assets, exact anchors and complete math banks',()=>{
 const l=authored();
 expect(l.world).toMatchObject({width:2171,height:724,background:'Levels/LVL-0034/riventides.png',depthmap:'Levels/LVL-0034/depthmap.png'});
 for(const asset of [l.world.background,l.world.depthmap]){const png=fs.readFileSync(path.join(root,asset));expect([png.readUInt32BE(16),png.readUInt32BE(20)]).toEqual([2171,724]);}
 expect(l.player.characterId).toBe('sven_arc');expect(JSON.stringify(l)).not.toContain('locomotion');
 expect(l.learningChallenges.map(c=>c.id)).toEqual(ids);
 expect(l.interactiveObjects.map(o=>o.center)).toEqual([{x:360,y:460},{x:838,y:552},{x:1471,y:517},{x:1963,y:496}]);
 expect(l.walkPath[0]).toMatchObject({x:159,y:554});expect(l.walkPath.at(-1)).toMatchObject({x:1938,y:568});
 for(const o of l.interactiveObjects)expect(l.walkPath.some(p=>p.id===o.approachNode)).toBe(true);
 for(const c of l.learningChallenges){
  expect(c.questions).toHaveLength(4);
  for(const slot of c.questions){expect(slot.variants).toHaveLength(2);for(const v of slot.variants){
   expect(v).toMatchObject({domain:'math',schoolBand:'E5-intended'});expect(v.visual).toBeUndefined();
   expect(v.hintMinnie).toBeTruthy();expect(v.hintMoose).toBeTruthy();
   const equation=v.explanation.match(/^(\d+) ([×:]) (\d+) = (\d+)/);expect(equation).toBeTruthy();
   expect(equation[2]==='×'?+equation[1]*+equation[3]:+equation[1]/+equation[3]).toBe(v.answer);
   if(v.choices){expect(new Set(v.choices).size).toBe(4);expect(v.choices).toContain(v.answer);}
  }}
 }
 expect(l.exits[0].targetLevel).toBe('LVL-0035');expect(l.reward.nextLevelId).toBe('LVL-0035');
 expect(l.companionMoments.find(m=>m.event==='LEVEL_ENTER')).toMatchObject({speaker:'minnie',text:'Riven Tides, een prachtige vakantiebestemming... voor ARC.'});
});
async function enter(page,editor=false){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.goto(base+(editor?'/?dev=editor':'/?atlasSessionTest=1'));
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true}));
 await expect(page.locator('[data-actor="sven"]')).toHaveAttribute('data-character-id','sven_arc');
}
for(const variant of [0,1])test(`Riven Tides variant ${variant+1}: walk, math, guides, completion and reload`,async({page},info)=>{
 test.setTimeout(120000);
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)errors.push(r.url());});
 await enter(page);
 await expect(page.getByText('Riven Tides, een prachtige vakantiebestemming... voor ARC.',{exact:true})).toBeVisible();
 expect(await page.evaluate(()=>window.eval('locomotionTuning')().fromIdleMovement)).toBe(.25);
 await expect.poll(()=>page.evaluate(()=>window.eval('audioState.currentMusicKey'))).toBe('arcAtlas');
 for(const id of ['minnie','moose'])expect(await page.locator(`[data-guide-image="${id}"]`).evaluate((img,id)=>img.dataset.openSrc===window.eval('readyAssetSrc')(`assets/guides/ARC_${id}.png`)&&img.complete&&img.naturalWidth>0,id)).toBe(true);
 await page.screenshot({path:info.outputPath('riven-tides-entry.png')});
 await page.evaluate(v=>{Math.random=()=>v ? .999 : 0;},variant);
 for(const id of ids){
  await page.evaluate(id=>window.eval('beginInteraction')(window.eval('runeById')(id),'rune'),id);
  await expect(page.locator('[data-challenge-character="CHR-ARC-VALENTE"]')).toBeVisible({timeout:22000});
  const arrival=await page.evaluate(id=>{const l=window.eval('level'),s=window.eval('state'),o=l.interactiveObjects.find(o=>o.id===id),p=l.walkGraph.nodes.find(p=>p.id===o.approachNode);return Math.hypot(s.worldX-p.x,s.worldY-p.y);},id);
  expect(arrival).toBeLessThan(3);
  expect(await page.locator('.challengeCharacterPortrait').evaluate(img=>img.complete&&img.naturalWidth===1254)).toBe(true);
  for(let q=0;q<4;q++){
   const v=await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state.questionIndex')]);
   expect(v.id.endsWith(variant?'b':'a')).toBe(true);
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
 }
 await expect(page.locator('[data-hotspot="hotelExit"]')).toHaveAttribute('data-exit-ready','true');
 await page.locator('[data-hotspot="hotelExit"]').click();
 await expect(page.getByRole('heading',{name:'Riven Tides voltooid',exact:true})).toBeVisible({timeout:22000});
 await expect(page.locator('[data-action="next-level"]')).toHaveText('Naar Stella Montis');
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem(window.eval('level.storageKey'))));
 expect(saved.completedAt).toBeTruthy();expect(saved.completedRuneIds).toEqual(ids);
 expect(await page.evaluate(()=>window.eval('resolvedNextLevelId')())).toBe('LVL-0035');
 await page.locator('[data-action="next-level"]').click();
 await expect.poll(()=>page.evaluate(()=>window.eval('level.id'))).toBe('LVL-0035');
 expect(await page.evaluate(()=>[...window.eval('state.completedRunes')])).toEqual([]);
 await page.reload();await page.evaluate(()=>window.eval('selectLevel')('LVL-0034',{startImmediately:true}));
 expect(await page.evaluate(()=>[...window.eval('state.completedRunes')])).toEqual(ids);
 expect(errors).toEqual([]);
});
test('Riven Tides editor exposes the shared path, three challenges, local scale and global ARC profile',async({page},info)=>{
 await enter(page,true);await page.keyboard.press('Control+Shift+D');
 await page.locator('[data-editor-mode="characters"]').click();
 await expect(page.locator('[data-main-character="LVL-0034"]')).toHaveValue('sven_arc');
 await page.locator('[data-editor-panel-key="sven-locomotion"] summary').click();
 await expect(page.locator('[data-locomotion-setting="fromIdleMovement"]')).toHaveValue('25');
 await expect(page.locator('[data-editor-panel-key="sven-locomotion"]')).toContainText('Character / Global');
 await page.locator('[data-level-setting="spriteScale"]').fill('1.2');
 expect(await page.evaluate(()=>window.eval('levelTuning')().spriteScale)).toBe(1.2);
 expect(await page.evaluate(()=>window.eval('worldResolver').levelSettings('LVL-0034').mainCharacterSettings.sven_arc)).not.toHaveProperty('locomotion');
 await page.locator('[data-editor-mode="challenges"]').click();
 for(const name of ['Blauwe zeecontainer','Raider Cache','Blauwe koffer'])await expect(page.locator('[data-developer-tools]')).toContainText(name);
 await expect(page.locator('[data-walkpath-index]').first()).toBeVisible();
 await page.locator('[data-debug-action="collapse-editor-panel"]').click();
 const point=page.locator('[data-debug-node="seaContainer-approach"] circle');
 const before=await page.evaluate(()=>window.eval('level').walkPath.find(p=>p.id==='seaContainer-approach').x);
 const box=await point.boundingBox();
 expect(box).toBeTruthy();
 await page.mouse.move(box.x+box.width/2,box.y+box.height/2);
 await page.mouse.down();
 await page.mouse.move(box.x+box.width/2+20,box.y+box.height/2+5,{steps:5});
 await page.mouse.up();
 expect(await page.evaluate(()=>window.eval('level').walkPath.find(p=>p.id==='seaContainer-approach').x)).not.toBe(before);
 await page.locator('[data-debug-action="restore-editor-panel"]').click();
 await expect(page.locator('[data-developer-tools]')).toBeVisible();
 await page.screenshot({path:info.outputPath('riven-tides-editor.png')});
});
test('Riven Tides supplied depth map is used by Cinematic and Voxel',async({page})=>{
 test.skip(process.env.ATLAS_WEBGPU_QA!=='1','Requires real WebGPU');
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 await enter(page);
 for(const mode of ['cinematic','voxel']){
  await page.evaluate(mode=>{window.eval('voxelRenderer').updateSettings({renderer:mode});window.eval('render')();},mode);
  const snapshot=()=>page.evaluate(mode=>window.eval(mode==='cinematic'?'cinematicRenderer':'voxelRenderer').snapshot(),mode);
  await expect.poll(async()=>(await snapshot()).ready,{timeout:25000}).toBe(true);
  if(mode==='cinematic')await expect.poll(async()=>(await snapshot()).depthStatus).toBe('ready');
  expect((await snapshot())[mode==='cinematic'?'depthPath':'depthMap']).toBe('Levels/LVL-0034/depthmap.png');
 }
 expect(errors).toEqual([]);
});
