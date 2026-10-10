const {test,expect}=require('@playwright/test');
const {bank}=require('../src/content/m6');
const entry=require('../scripts/runenpoort-m6-content.cjs').readApproved().find(e=>e.question.id==='RP-M6-OP-001');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
async function start(page,id){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await expect(page.locator('.menuScreen')).toBeVisible();
  await page.evaluate(async({entry,id})=>{
    const call=n=>window.eval(n);await call('selectLevel')(entry.levelId,{startImmediately:true});
    if(window.AtlasM6Content.records.length!==159)throw Error('Browser asset graph omitted content');
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank(window.AtlasM6Content.records.filter(r=>r.id===id))};
    const s=call('state');s.suspendedLearningChallenges={};s.completedRunes=new Set(call('activeRunes')().filter(r=>r.id!==entry.challengeId).map(r=>r.id));
    call('openRuneChallenge')(entry.challengeId);call('render')();
  },{entry,id});
  await expect(page.locator('.challengeWorkspace')).toBeVisible();
  expect(await snapshot(page)).toMatchObject({id,stage:'question'});
}
async function snapshot(page){return page.evaluate(()=>{const s=window.eval('state'),q=window.eval('currentChallengeQuestions')()[s.questionIndex];return {id:q.id,surface:q.surfaceId,choices:q.choices,stage:s.questionSupportStage,attempts:s.attempts,draws:window.eval('learningPlanner').selections,notes:s.scratchpad};});}
async function wrong(page){await page.evaluate(()=>{const q=window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex];window.eval('answerQuestion')(q.answerSpec.type==='euro'?{euros:'99',cents:''}:q.choices?.find(c=>c!==q.answer)||'9999');});}
async function reopen(page){const before=await snapshot(page);await page.getByRole('button',{name:'Sluit opdracht',exact:true}).click();await page.evaluate(()=>{const s=window.eval('state');window.eval('openRuneChallenge')(Object.keys(s.suspendedLearningChallenges).at(-1));});expect(await snapshot(page)).toEqual(before);}
async function layout(page){
  await page.evaluate(()=>document.fonts.ready);
  if(await page.locator('.notebookSheet').count())await page.locator('.notebookSheet').evaluate(e=>Promise.all(e.getAnimations().filter(a=>a.id==='notebook-page-turn').map(a=>a.finished)));
  const dimensions=await page.locator('.challengeWorkspace').evaluate(card=>{
    const r=card.getBoundingClientRect(),paper=card.querySelector('.notebookPaper');
    return{right:r.right,bottom:r.bottom,width:innerWidth,height:innerHeight,overflow:card.scrollWidth-card.clientWidth,paperOverflow:paper?paper.scrollWidth-paper.clientWidth:0,
      svg:[...card.querySelectorAll('.geometryShape')].map(e=>{const a=e.getBoundingClientRect(),p=e.parentElement.getBoundingClientRect();return{width:a.width,height:a.height,right:a.right,parentRight:p.right};}),
      controls:[...card.querySelectorAll('[data-open-answer],[data-money-euros],[data-money-cents],button[type=submit],[data-choice]')].map(e=>{const a=e.getBoundingClientRect();return{width:a.width,height:a.height,bottom:a.bottom};})};
  });
  expect(dimensions.right).toBeLessThanOrEqual(dimensions.width+1);expect(dimensions.bottom).toBeLessThanOrEqual(dimensions.height+1);expect(dimensions.overflow).toBeLessThanOrEqual(1);expect(dimensions.paperOverflow).toBeLessThanOrEqual(1);
  for(const s of dimensions.svg){expect(s.width).toBeGreaterThan(180);expect(s.height).toBeGreaterThan(100);expect(s.right).toBeLessThanOrEqual(s.parentRight+1);}
  for(const c of dimensions.controls){expect(c.width).toBeGreaterThanOrEqual(44);expect(c.height).toBeGreaterThanOrEqual(44);expect(c.bottom).toBeLessThanOrEqual(dimensions.height+1);}
}
for(const id of ['M6-ME-008','M6-ME-009','M6-ME-012','M6-ME-013','M6-FR-014'])test(`${id}: authored stages, notebook, reopening and responsive geometry`,async({page},info)=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));await start(page,id);
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
  await page.evaluate(()=>window.eval('answerQuestion')(''));expect((await snapshot(page)).stage).toBe('question');
  const original=await page.locator('.compactChallengeHeader').innerText();
  let shape;
  for(const stage of ['question','minnie','moose','explanation']){
    if(stage!=='question')await wrong(page);
    expect((await snapshot(page)).stage).toBe(stage);
    await expect(page.locator('[data-adventure-team-bar]')).toHaveCount(0);
    await layout(page);
    if(id.startsWith('M6-ME')){
      const lines=await page.locator('.geometryDiagram .geometrySide').evaluateAll(es=>es.map(e=>['x1','y1','x2','y2'].map(k=>e.getAttribute(k))));
      shape??=lines;expect(lines).toEqual(shape);
      if(id==='M6-ME-012'){
        await expect(page.locator('[data-geometry-opening="bottom"] line')).toHaveCount(2);
        expect(await page.locator('[data-geometry-opening] line').evaluateAll(es=>Number(es[0].getAttribute('x2'))<Number(es[1].getAttribute('x1')))).toBe(true);
      }
    }
    if(stage==='minnie'||stage==='moose')await expect(page.locator('.integratedHelpHeader')).toContainText(stage==='minnie'?'Minnie':'Moose');
    if(stage==='moose'&&id==='M6-FR-014'){
      await expect(page.locator('.numberLineInterval')).toHaveCount(4);await expect(page.locator('.numberLineJumps,.numberLineFocus')).toHaveCount(0);await expect(page.locator('.learningVisualNote')).toHaveText('3 stappen vanaf 0');
    }
    if(stage==='explanation'){
      await expect(page.locator('.integratedHelpHeader')).toContainText('Moose legt het uit');
      const text=await page.locator('.authoredExplanation').innerText();expect(text).toContain(bank.recover(id).explanation.split('\n')[0].replaceAll('**',''));
      await reopen(page);
    }
    if(stage==='moose'){
      await page.getByRole('button',{name:'Kladblok',exact:true}).click();await page.getByRole('textbox',{name:'Eigen kladwerk'}).fill('6 + 6\n12 + 12');
      await page.getByRole('button',{name:'Terug naar tip',exact:true}).click();await reopen(page);
      await page.getByRole('button',{name:'Kladblok',exact:true}).click();await expect(page.getByRole('textbox',{name:'Eigen kladwerk'})).toHaveValue('6 + 6\n12 + 12');
      await page.getByRole('button',{name:'Terug naar tip',exact:true}).click();
    }
    await layout(page);
    await page.screenshot({path:`qa-screenshots/m6-expansion-20261010/${info.project.name}-${id}-${stage}.png`});
  }
  expect(await page.locator('.compactChallengeHeader').innerText()).toBe(original);
  await page.evaluate(()=>{const q=window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex];window.eval('answerQuestion')(q.answer);});
  await expect(page.locator('.challengeNotebook')).toHaveCount(0);expect(errors).toEqual([]);
});

test('new euro record uses the existing structured control and attempt/help/report semantics',async({page})=>{
  await start(page,'M6-MO-011');
  const euro=page.locator('[data-money-part="euros"]'),cent=page.locator('[data-money-part="cents"]');
  await expect(euro).toHaveAttribute('inputmode','numeric');await expect(cent).toHaveAttribute('inputmode','numeric');
  await page.getByRole('button',{name:'Controleer',exact:true}).click();expect((await snapshot(page)).stage).toBe('question');
  await euro.fill('5');await cent.fill('5');await page.getByRole('button',{name:'Controleer',exact:true}).click();expect((await snapshot(page)).stage).toBe('minnie');
  await reopen(page);await expect(euro).toHaveValue('5');await expect(cent).toHaveValue('5');
  await euro.fill('3');await cent.fill('35');await page.getByRole('button',{name:'Controleer',exact:true}).click();
  const report=await page.evaluate(()=>window.AtlasSessionReport.getCurrent());
  expect(JSON.stringify(report)).toContain('afterMinnie');expect(JSON.stringify(report)).toContain('505');expect(JSON.stringify(report)).toContain('335');
});

for(const id of ['M6-AS-010','M6-FR-019'])test(`${id}: comparison labels and shared diagrams remain readable`,async({page},info)=>{
  await start(page,id);await wrong(page);await wrong(page);await layout(page);
  await page.screenshot({path:`qa-screenshots/m6-expansion-20261010/${info.project.name}-${id}-moose.png`});
  if(id==='M6-AS-010'){
    const labels=await page.locator('.numberLineMarker > span').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,right:r.right,bottom:r.bottom};}));
    for(let i=0;i<labels.length;i++)for(let j=i+1;j<labels.length;j++){const a=labels[i],b=labels[j];expect(a.right<=b.x||b.right<=a.x||a.bottom<=b.y||b.bottom<=a.y,JSON.stringify(labels)).toBe(true);}
  }else{
    await expect(page.locator('.fractionStrip')).toHaveCount(3);
    const widths=await page.locator('.fractionStrip').evaluateAll(es=>es.map(e=>e.getBoundingClientRect().width));expect(Math.max(...widths)-Math.min(...widths)).toBeLessThan(1);
  }
  await page.screenshot({path:`qa-screenshots/m6-expansion-20261010/${info.project.name}-${id}-moose.png`});
});
