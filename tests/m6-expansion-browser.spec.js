const {test,expect}=require('@playwright/test');
const {records,bank}=require('../src/content/m6');
const source=require('../scripts/m6-expansion-content.cjs');
const cap=require('../src/challenge-capabilities');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
async function start(page){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await expect(page.locator('.menuScreen')).toBeVisible();
}
async function open(page,id){
  await page.evaluate(async id=>{
    const call=n=>window.eval(n);if(call('level')?.id!=='LVL-0032')await call('selectLevel')('LVL-0032',{startImmediately:true});
    const s=call('state'),r=call('activeRunes')().find(r=>!call('learningChallengeForRune')(r).questions.some(slot=>window.AtlasLearningLevels.positionDomain(slot.variants)==='time'));
    s.suspendedLearningChallenges={};s.completedRunes=new Set(call('activeRunes')().filter(x=>x.id!==r.id).map(x=>x.id));
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank(window.AtlasM6Content.records.filter(q=>q.id===id))};call('openRuneChallenge')(r.id);
  },id);
  await expect(page.locator('.challengeWorkspace')).toBeVisible();await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
}
async function snap(page){return page.evaluate(()=>{
  const call=n=>window.eval(n),s=call('state'),r=window.AtlasSessionReport.getCurrent();
  return {q:call('currentChallengeQuestions')()[s.questionIndex],stage:s.questionSupportStage,failures:s.challengeFailureCounts[s.activeRuneId],draws:call('learningPlanner').selections,history:call('m6RecentHistory').entries,notes:s.scratchpad,draft:s.answerDraft,money:s.moneyAnswerDraft,currency:s.currencyAnswerDraft,report:r.questions.find(q=>q.key===r.currentQuestionKey)};
});}
async function reopen(page){const before=await snap(page);await page.getByRole('button',{name:'Sluit opdracht',exact:true}).click();await page.evaluate(()=>{const c=n=>window.eval(n);c('openRuneChallenge')(Object.keys(c('state').suspendedLearningChallenges).at(-1));});expect(await snap(page)).toEqual(before);}
function correct(q){
  if(q.answerSpec.type==='euro')return {euros:String(Math.floor(q.answer/100)),cents:String(q.answer%100)};
  if(q.answerSpec.type==='currency'){let rest=q.answer;return Object.fromEntries([...q.answerSpec.denominations].sort((a,b)=>b-a).map(d=>{const count=Math.floor(rest/d);rest-=count*d;return[d,String(count)];}));}
  return q.answerSpec.allowedForms?.[0]||q.answer;
}
async function enter(page,q,value){
  if(q.answerMode==='multipleChoice')await page.locator(`[data-choice=${JSON.stringify(String(value))}]`).click();
  else {
    if(q.answerSpec.type==='currency')for(const field of await page.locator('[data-currency-count]').all())await field.fill(value[await field.getAttribute('data-currency-count')]||'0');
    else if(q.answerSpec.type==='euro'){await page.locator('[data-money-part="euros"]').fill(value.euros);await page.locator('[data-money-part="cents"]').fill(value.cents);}
    else await page.locator('[data-open-answer]').fill(String(value));
    await page.getByRole('button',{name:'Controleer',exact:true}).click();
  }
}
async function geometry(page){
  if(await page.locator('.notebookSheet').count())await page.locator('.notebookSheet').evaluate(e=>Promise.all(e.getAnimations().filter(a=>a.id==='notebook-page-turn').map(a=>a.finished)));
  const g=await page.locator('.challengeWorkspace').evaluate(card=>{
    const b=card.getBoundingClientRect(),controls=[...card.querySelectorAll('.workspaceFooter button,.workspaceFooter input')];
    return {left:b.left,right:b.right,bottom:b.bottom,width:innerWidth,height:innerHeight,overflow:card.scrollWidth-card.clientWidth,contentOverflow:card.querySelector('.workspaceQuestionBody').scrollWidth-card.querySelector('.workspaceQuestionBody').clientWidth,controls:controls.map(e=>{const r=e.getBoundingClientRect();return {width:r.width,height:r.height,top:r.top,bottom:r.bottom,hit:e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))};})};
  });
  expect(g.left).toBeGreaterThanOrEqual(0);expect(g.right).toBeLessThanOrEqual(g.width);expect(g.bottom).toBeLessThanOrEqual(g.height);expect(g.overflow).toBeLessThanOrEqual(1);expect(g.contentOverflow).toBeLessThanOrEqual(1);
  for(const c of g.controls){expect(c.width).toBeGreaterThanOrEqual(44);expect(c.height).toBeGreaterThanOrEqual(44);expect(c.top).toBeGreaterThanOrEqual(0);expect(c.bottom).toBeLessThanOrEqual(g.height);expect(c.hit).toBe(true);}
}
const cases=['NS-005','AS-008','MD-002','MD-003','MD-004','MD-009','FR-001','FR-006','MO-002','MO-004','MO-008','MO-007','TI-003','TI-007','TI-018','ME-007','DP-003','DP-004','DP-005','DP-006'];
for(const suffix of cases)test(`approved ${suffix}: authored stages, real controls, stable surface and notebook layout`,async({page})=>{
  await start(page);await open(page,`M6-${suffix}`);const initial=await snap(page),q=initial.q,expected=bank.recover(q.id,q.surfaceId);
  expect(q.prompt).toBe(expected.prompt);await expect(page.locator('.workspacePrompt')).toHaveJSProperty('innerHTML',cap.richText(expected.promptParts||expected.prompt));
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);await geometry(page);
  if(q.id==='M6-FR-001')await expect(page.locator('[data-choice] .authoredFraction')).toHaveCount(4);
  if(q.visual.type==='compactDataTable'){await expect(page.locator('.workspacePrompt table')).toHaveCount(1);await expect(page.locator('.workspacePrompt th[scope="col"]')).toHaveCount(2);}
  if(q.visual.type==='analogueClock'){const c=page.locator('[data-clock-visual]');await expect(c).toHaveAttribute('data-clock-hour',String(q.visual.stages.question.hour));await expect(c.locator('.clockNumerals text')).toHaveCount(12);}
  await page.screenshot({path:test.info().outputPath(`${suffix}-question.png`),scale:'css'});
  await page.evaluate(()=>window.eval('answerQuestion')(''));expect((await snap(page)).report.attempts).toBe(0);expect((await snap(page)).stage).toBe('question');
  const wrong=q.choices?.find(c=>c!==q.answer)||(q.answerSpec.type==='euro'?{euros:'99',cents:''}:q.answerSpec.type==='currency'?{[q.answerSpec.denominations[0]]:'1'}:'99999');
  for(const stage of ['minnie','moose','explanation']){
    await enter(page,q,wrong);await expect(page.locator('[data-help-stage]')).toHaveAttribute('data-help-stage',stage);
    if(stage==='explanation'){
      await expect(page.getByRole('heading',{name:'Moose legt het uit',exact:true})).toBeVisible();
      const actual=await page.locator('.explanationStepText').allTextContents();expect(actual).toEqual(expected.authoredSupport.explanationSteps.map(step=>step.replaceAll('**','')) .map(step=>step.replace(/(\d+)\/(\d+)/g,'$1$2')));
      expect((await snap(page)).report.explanationShown).toBe(true);
    }else {await expect(page.locator('.integratedHintText')).toHaveJSProperty('innerHTML',cap.richText(expected[stage==='minnie'?'hintMinnie':'hintMoose']));expect((await snap(page)).report.explanationShown).toBe(false);}
    expect((await snap(page)).q).toEqual(q);await reopen(page);await geometry(page);
  }
  const before=await snap(page);expect(before.report.helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation']);expect(before.draws).toBe(initial.draws);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();await page.locator('[data-scratchpad-notes]').fill('Mijn notitie\n\nOp een nieuwe regel');await page.locator('[data-action="scratchpad-close"]').click();
  await reopen(page);expect((await snap(page)).report).toEqual(before.report);
  await page.locator('.notebookPaper').evaluate(p=>{p.scrollTop=p.scrollHeight;p.dispatchEvent(new Event('scroll'));});
  await geometry(page);await page.screenshot({path:test.info().outputPath(`${suffix}-explanation.png`),scale:'css'});
  await enter(page,q,correct(q));const done=await snap(page);expect(done.report.outcome).toBe('afterExplanation');expect(done.report.attempts).toBe(4);expect(done.report.surfaceId).toBe(q.surfaceId);expect(done.report.answerHistory.at(-1).correct).toBe(true);
  await expect(page.locator('.challengeNotebook')).toHaveCount(0);
  await page.getByRole('button',{name:'Volgende vraag',exact:true}).click();await expect(page.locator('[data-help-stage]')).toHaveCount(0);
});

// Every production record also completes without help. Keep each batch below the
// normal test budget; no synthetic production questions or timeout increases.
for(let batch=0;batch<5;batch++)test(`all approved new IDs complete directly, batch ${batch+1}`,async({page})=>{
  await start(page);
  for(const id of source.expectedIds.slice(batch*15,batch*15+15)){
    await open(page,id);const {q}=await snap(page);
    await page.evaluate(value=>window.eval('answerQuestion')(value),correct(q));
    const done=await snap(page);expect(done.report).toMatchObject({outcome:'direct',explanationShown:false,attempts:1,centralQuestionId:id,surfaceId:q.surfaceId,helpHistory:[]});
    await page.evaluate(()=>window.eval('closeChallenge')());
  }
});

for(const world of ['LVL-0003','LVL-0023','LVL-0033'])test(`real time challenge in ${world} draws only the central time domain`,async({page})=>{
  await start(page);await page.evaluate(async world=>{
    const c=n=>window.eval(n);await c('selectLevel')(world,{startImmediately:true});
    const r=c('activeRunes')().find(r=>c('learningChallengeForRune')(r)?.questions.every(s=>window.AtlasLearningLevels.positionDomain(s.variants)==='time'));
    if(!r)throw Error('No existing authored clock challenge');c('state').completedRunes=new Set(c('activeRunes')().filter(x=>x!==r).map(x=>x.id));c('openRuneChallenge')(r.id);
  },world);
  const seen=[];
  for(let i=0;i<4;i++){const {q}=await snap(page);expect(q.educationalDomain).toBe('time');expect(q.atlasLearningSelection.deliveredDifficulty).toBe(q.atlasLearningSelection.requestedDifficulty);seen.push(q.id);await reopen(page);await page.evaluate(value=>window.eval('answerQuestion')(value),correct(q));if(i<3)await page.getByRole('button',{name:'Volgende vraag',exact:true}).click();}
  expect(new Set(seen).size).toBe(4);
});

test('production table, notebook and answer remain usable above the keyboard',async({page})=>{
  await start(page);await open(page,'M6-DP-004');const {q}=await snap(page);await enter(page,q,'99');
  const height=await page.evaluate(()=>{const h=Math.min(Math.floor(innerHeight/2),405);Object.defineProperty(visualViewport,'height',{configurable:true,value:h});Object.defineProperty(visualViewport,'offsetTop',{configurable:true,value:0});window.eval('updateKeyboardViewportState')();return h;});
  await page.locator('[data-open-answer]').focus();await expect(page.locator('body')).toHaveClass(/keyboard-open/);await geometry(page);
  const r=await page.locator('[data-open-answer]').boundingBox();expect(r.y+r.height).toBeLessThanOrEqual(height);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();await page.locator('[data-scratchpad-notes]').fill('156 − 132');await page.locator('[data-action="scratchpad-close"]').click();await geometry(page);
});
