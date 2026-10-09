const {test,expect}=require('@playwright/test');
const {bank}=require('../src/content/m6'),support=require('../src/challenge-support');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
const cases=[['RP-M6-BR-001','original'],['RP-M6-GE-002','original'],['RP-M6-TI-006','original'],
  ['M6-MO-003','ticket'],['M6-MO-006','entry'],['M6-TI-009','original'],['M6-TI-010','original'],
  ['RP-M6-TI-001','original'],['M6-TI-001','original'],['M6-TI-002','original'],
  ['M6-TI-003','original'],['M6-TI-008','original'],['M6-TI-018','original'],
  ['M6-TI-014','original'],['M6-TI-016','original'],['M6-FR-008','trays'],['M6-FR-008','packages']];
const snapshot=page=>page.evaluate(()=>{
  const c=n=>window.eval(n),s=c('state'),report=AtlasSessionReport.getCurrent();
  return {question:c('currentChallengeQuestions')()[s.questionIndex],stage:s.questionSupportStage,
    draws:c('learningPlanner').selections,difficultyDraws:c('learningPlanner').difficultySelections,
    history:c('m6RecentHistory').entries,report:report.questions.find(q=>q.key===report.currentQuestionKey)};
});

for(const [id,surfaceId] of cases)test(`${id}/${surfaceId}: corrected content, visual stages, stable reopen and completion`,async({page},testInfo)=>{
  const expected=bank.recover(id,surfaceId),isTime=expected.educationalDomain==='time';
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  await page.evaluate(async({id,surfaceId,isTime})=>{
    const c=n=>window.eval(n);await c('selectLevel')(isTime?'LVL-0033':'LVL-0032',{startImmediately:true});
    const r=c('activeRunes')().find(r=>(AtlasLearningLevels.positionDomain(c('learningChallengeForRune')(r).questions[0].variants)==='time')===isTime);
    const record=AtlasM6Content.bank.get(id);
    window.AtlasM6Content={...AtlasM6Content,bank:AtlasM6Bank.createBank([{...record,surfaces:record.surfaces.filter(s=>s.id===surfaceId)}])};
    c('state').completedRunes=new Set(c('activeRunes')().filter(x=>x.id!==r.id).map(x=>x.id));c('openRuneChallenge')(r.id);
  },{id,surfaceId,isTime});
  await expect(page.locator('.challengeWorkspace')).toBeVisible();
  const initial=await snapshot(page);expect(initial.question.id).toBe(id);expect(initial.question.surfaceId).toBe(surfaceId);
  await expect(page.locator('.workspacePrompt')).toHaveJSProperty('innerHTML',support.richText(expected.promptParts||expected.prompt));
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
  await page.evaluate(value=>window.eval('answerQuestion')(value),support.usesStructuredMoney(expected)?{euros:'',cents:''}:'');
  expect((await snapshot(page)).stage).toBe(initial.stage);
  expect((await snapshot(page)).report.answerHistory.at(-1)).toMatchObject({valid:false,correct:null});

  async function answer(correct){
    if(support.usesStructuredMoney(expected)){
      const parts=correct?{euros:String(Math.floor(expected.answer/100)),cents:String(expected.answer%100)}:{euros:'50',cents:''};
      for(const part of ['euros','cents']){
        const input=page.locator(`[data-money-part="${part}"]`);
        await expect(input).toHaveAttribute('inputmode','numeric');await input.fill(parts[part]);
      }
      await page.getByRole('button',{name:'Controleer',exact:true}).click();
    }else if(expected.choices) {
      const choice=correct?expected.answer:expected.choices.find(c=>c!==expected.answer);
      await page.getByRole('button',{name:choice,exact:true}).click();
    }else {
      await page.locator('#open-answer').fill(correct?String(expected.answer):'0');
      await page.getByRole('button',{name:'Controleer',exact:true}).click();
    }
  }
  async function visible(stage){
    if(stage==='question')await expect(page.locator('[data-help-stage]')).toHaveCount(0);
    else {
      await expect(page.locator('[data-help-stage]')).toHaveAttribute('data-help-stage',stage);
      if(stage==='explanation'){
        await expect(page.getByRole('heading',{name:'Moose legt het uit',exact:true})).toHaveCount(1);
        const expectedMarkup=support.renderExplanation(expected,'Moose legt het uit');
        const html=await page.evaluate(markup=>{const el=document.createElement('div');el.innerHTML=markup;return el.firstElementChild.innerHTML;},expectedMarkup);
        // Notebook alignment adds per-step inline padding; compare all authored
        // markup/diagrams while excluding only those measured layout offsets.
        const actual=await page.locator('.authoredExplanation').evaluate(el=>{
          const copy=el.cloneNode(true);copy.querySelectorAll('.explanationStepText').forEach(step=>step.removeAttribute('style'));return copy.innerHTML;
        });
        expect(actual).toBe(html);
      }else await expect(page.locator('.integratedHintText')).toHaveJSProperty('innerHTML',support.richText(expected[stage==='minnie'?'hintMinnie':'hintMoose']));
    }
    if(stage!=='explanation'){
      const html=await page.evaluate(markup=>{const el=document.createElement('div');el.innerHTML=markup;return el.innerHTML;},support.renderVisual(expected.visual,stage));
      if(html)await expect(page.locator('.learningVisual')).toHaveJSProperty('outerHTML',html);
    }
    if(stage!=='question'){
      await expect(page.locator('.notebookPaper')).toHaveCSS('overflow-y','auto');
      await page.locator('.notebookSheet').evaluate(e=>Promise.all(e.getAnimations().filter(a=>a.id==='notebook-page-turn').map(a=>a.finished)));
      await page.locator('.notebookPaper').evaluate(e=>{e.scrollTop=e.scrollHeight;});
    }
    const bounds=await page.locator('.challengeWorkspace').evaluate(card=>{
      const answer=card.querySelector('.workspaceAnswerZone'),b=card.getBoundingClientRect(),a=answer.getBoundingClientRect();
      return {overflow:card.scrollWidth-card.clientWidth,top:b.top,bottom:b.bottom,height:innerHeight,answerBottom:a.bottom,reachable:answer.contains(document.elementFromPoint(a.left+a.width/2,a.top+a.height/2))};
    });
    expect(bounds.overflow).toBeLessThanOrEqual(1);expect(bounds.top).toBeGreaterThanOrEqual(0);
    expect(bounds.bottom).toBeLessThanOrEqual(bounds.height);expect(bounds.answerBottom).toBeLessThanOrEqual(bounds.bottom);expect(bounds.reachable).toBe(true);
  }
  for(const stage of support.STAGES){
    if(stage!=='question')await answer(false);
    await visible(stage);
    if(['M6-TI-001','M6-TI-002','M6-TI-008','M6-TI-018'].includes(id)){
      if(stage!=='question')await page.locator('.notebookPaper').evaluate(e=>{e.scrollTop=0;});
      await page.screenshot({path:`qa-screenshots/time-recalibration-20261009/${testInfo.project.name}-${id}-${stage}.png`});
    }
    const before=await snapshot(page);expect(before.question).toEqual(initial.question);
    expect(before.draws).toBe(initial.draws);expect(before.difficultyDraws).toBe(initial.difficultyDraws);
    expect(before.report.explanationShown).toBe(stage==='explanation');
    await page.evaluate(()=>{const c=n=>window.eval(n),id=c('state').activeRuneId;c('closeChallenge')();c('openRuneChallenge')(id);c('render')();});
    await visible(stage);expect(await snapshot(page)).toEqual(before);
  }
  await page.locator('.notebookPaper').evaluate(e=>{e.scrollTop=0;});
  await page.screenshot({path:testInfo.outputPath('explanation.png'),scale:'css'});
  await answer(true);
  const report=(await snapshot(page)).report;
  expect(report).toMatchObject({centralQuestionId:id,surfaceId,outcome:'afterExplanation',attempts:4,contentVersion:expected.contentVersion});
  expect(report.helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation']);
  if(support.usesStructuredMoney(expected))expect(report.answerHistory.at(-1)).toMatchObject({interpreted:expected.answer,unit:'cents',valid:true,correct:true});
});
