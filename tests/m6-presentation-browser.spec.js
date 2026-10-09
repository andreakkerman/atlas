const {test,expect}=require('@playwright/test');
const {bank}=require('../src/content/m6');
const support=require('../src/challenge-support');
const {surfaceEdits,expectedVisualNotes}=require('./fixtures/m6-presentation-expectations.cjs');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
const cases=Object.entries(surfaceEdits).flatMap(([id,surfaces])=>Object.keys(surfaces).map(surfaceId=>({id,surfaceId})));
cases.push(...Object.keys(expectedVisualNotes).map(id=>({id,surfaceId:bank.get(id).surfaces[0].id})));

async function snapshot(page){return page.evaluate(()=>{
  const c=n=>window.eval(n),s=c('state'),report=window.AtlasSessionReport.getCurrent();
  return {question:c('currentChallengeQuestions')()[s.questionIndex],stage:s.questionSupportStage,
    attempts:s.challengeFailureCounts[s.activeRuneId],draws:c('learningPlanner').selections,
    difficultyDraws:c('learningPlanner').difficultySelections,history:c('m6RecentHistory').entries,
    report:report.questions.find(q=>q.key===report.currentQuestionKey)};
});}

for(const {id,surfaceId} of cases)test(`${id}/${surfaceId}: exact selected context survives all help stages, rerender and reopen`,async({page})=>{
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  await page.evaluate(async({id,surfaceId})=>{
    const c=n=>window.eval(n);await c('selectLevel')('LVL-0032',{startImmediately:true});
    const r=c('activeRunes')().find(r=>!c('learningChallengeForRune')(r).questions.some(slot=>window.AtlasLearningLevels.positionDomain(slot.variants)==='time'));
    const record=window.AtlasM6Content.bank.get(id);
    // Deterministic test bank uses the real authored record/surface and real selector.
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([{...record,surfaces:record.surfaces.filter(s=>s.id===surfaceId)}])};
    c('state').completedRunes=new Set(c('activeRunes')().filter(x=>x.id!==r.id).map(x=>x.id));
    c('openRuneChallenge')(r.id);
  },{id,surfaceId});
  await expect(page.locator('.challengeWorkspace')).toBeVisible();
  const initial=await snapshot(page),q=initial.question,expected=bank.recover(id,surfaceId);
  expect(q.id).toBe(id);expect(q.surfaceId).toBe(surfaceId);
  await expect(page.locator('.workspacePrompt')).toHaveJSProperty('innerHTML',support.richText(expected.promptParts||expected.prompt));
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
  await page.evaluate(()=>window.eval('answerQuestion')(''));
  const invalid=await snapshot(page);
  expect(invalid.report.answerHistory).toHaveLength(1);
  expect(invalid.report.answerHistory[0]).toMatchObject({valid:false,correct:null,interpreted:null});
  expect({...invalid,report:{...invalid.report,answerHistory:[]}}).toEqual(initial);

  async function visible(stage){
    if(stage==='question')await expect(page.locator('[data-help-stage]')).toHaveCount(0);
    else {
      await expect(page.locator('[data-help-stage]')).toHaveAttribute('data-help-stage',stage);
      if(stage==='explanation'){
        const html=await page.locator('.explanationStepText').evaluateAll(nodes=>nodes.map(n=>n.innerHTML));
        expect(html).toEqual((expected.authoredSupport.stepParts||expected.authoredSupport.explanationSteps).map(support.richText));
      }else await expect(page.locator('.integratedHintText')).toHaveJSProperty('innerHTML',support.richText(expected[stage==='minnie'?'hintMinnie':'hintMoose']));
    }
    const visual=page.locator('.learningVisual');
    const html=support.renderVisual(expected.visual,stage);
    if(html){
      // Compare the full DOM, including images; HTML serializes void <img /> as <img>.
      const serialized=await page.evaluate(markup=>{const t=document.createElement('template');t.innerHTML=markup;return t.innerHTML;},html);
      await expect(visual).toHaveJSProperty('outerHTML',serialized);
    }
    else await expect(visual).toHaveCount(0);
  }
  for(const stage of ['question','minnie','moose','explanation']){
    if(stage!=='question'){
      const wrong=q.answerSpec.type==='currency'?{[q.answerSpec.denominations[0]]:'1'}:'0';
      await page.evaluate(value=>window.eval('answerQuestion')(value),wrong);
    }
    await visible(stage);const before=await snapshot(page);
    expect(before.question).toEqual(q);expect(before.draws).toBe(initial.draws);expect(before.difficultyDraws).toBe(initial.difficultyDraws);
    expect(before.report.explanationShown).toBe(stage==='explanation');
    await page.evaluate(()=>window.eval('render')());
    await visible(stage);expect(await snapshot(page)).toEqual(before);
    await page.getByRole('button',{name:'Sluit opdracht',exact:true}).click();
    await page.evaluate(()=>{const c=n=>window.eval(n);c('openRuneChallenge')(Object.keys(c('state').suspendedLearningChallenges).at(-1));});
    await visible(stage);expect(await snapshot(page)).toEqual(before);
  }
  expect((await snapshot(page)).report.helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation']);
  let answer=String(q.answer);
  if(q.answerSpec.type==='currency'){
    let remainder=q.answer;answer=Object.fromEntries([...q.answerSpec.denominations].sort((a,b)=>b-a).map(d=>{const n=Math.floor(remainder/d);remainder-=n*d;return[d,String(n)];}));
  }
  await page.evaluate(value=>window.eval('answerQuestion')(value),answer);
  expect((await snapshot(page)).report).toMatchObject({centralQuestionId:id,surfaceId,outcome:'afterExplanation',attempts:4});
});
