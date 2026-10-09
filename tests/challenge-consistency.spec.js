const {test,expect}=require('@playwright/test');
const {readApproved}=require('../scripts/runenpoort-m6-content.cjs');
const entries=readApproved();
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
const evidence='qa-screenshots/challenge-notebook-finish-20261004';
async function open(page,id){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  await page.evaluate(async({entry,id})=>{
    const call=n=>window.eval(n);await call('selectLevel')(entry?.levelId||'LVL-0001',{startImmediately:true});
    const l=call('level'),s=call('state');
    const c=l.learningChallenges.find(c=>entry?c.id===entry.challengeId:c.questions.some(slot=>slot.variants.some(q=>q.id===id)));
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank(window.AtlasM6Content.records.filter(r=>entry && r.id===id))};
    const q=entry?.question||c.questions.flatMap(slot=>slot.variants).find(q=>q.id===id);
    // Exercise authored variants via the normal handler, followed by another real variant.
    const next=c.questions.flatMap(slot=>slot.variants).find(q2=>q2.id!==q.id&&q2.learningLevel===q.learningLevel)||q;
    c.questions=[{id:c.questions[0].id,variants:[q]},{id:c.questions[1].id,variants:[next]}];
    s.completedRunes=new Set(call('activeRunes')().filter(r=>r.id!==c.id).map(r=>r.id));
    call('openRuneChallenge')(c.id);
  },{entry:entries.find(e=>e.question.id===id),id});
  await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
  await page.evaluate(()=>document.fonts.ready);
}
async function record(page){return page.evaluate(()=>{
  const r=window.AtlasSessionReport.getCurrent();return r.questions.find(q=>q.key===r.currentQuestionKey);
});}
async function answer(page,correct){
  if(correct){
    const q=await page.evaluate(()=>window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex]);
    if(q.answerMode==='open'){
      if(q.answerSpec?.type==='euro'&&q.learningLevel==='M6'){
        await page.getByRole('textbox',{name:'Euro',exact:true}).fill(String(Math.floor(q.answer/100)));
        await page.getByRole('textbox',{name:'Cent',exact:true}).fill(String(q.answer%100));
      }else await page.locator('[data-open-answer]').fill(String(q.answerSpec?.allowedForms?.[0]||q.answer));
      await page.getByRole('button',{name:'Controleer',exact:true}).click();
    }else await page.locator(`[data-choice="${q.answer}"]`).click();
    return;
  }
  await page.evaluate(correct=>{
  const q=window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex];
  const amount=correct?q.answer:9999;
  window.eval('answerQuestion')(window.AtlasChallengeSupport.usesStructuredMoney(q)?{euros:String(Math.floor(amount/100)),cents:String(amount%100)}:correct?q.answerSpec?.allowedForms?.[0]||q.answer:q.choices?.find(v=>v!==q.answer)||'9999');
},correct);}
async function frame(page){return page.locator('.challengeWorkspace').evaluate(card=>{
  const box=e=>{const {x,y,width,height}=e.getBoundingClientRect();return{x,y,width,height};};
  return{card:box(card),header:box(card.querySelector('.compactChallengeHeader')),portrait:box(card.querySelector('.challengePortraitFrame')),close:box(card.querySelector('.workspaceClose')),identity:card.querySelector('[data-challenge-character]').dataset.challengeCharacter,title:card.querySelector('h2').textContent,progress:card.querySelector('.workspaceQuestionProgress').textContent};
});}
async function footer(page){
  const result=await page.locator('.workspaceFooter').evaluate(footer=>{
    const box=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height};};
    const controls=[footer.querySelector('button[type=submit]'),footer.querySelector('.scratchpadToggle')].filter(Boolean);
    const paper=document.querySelector('.notebookPaper');
    return {footer:box(footer),close:box(document.querySelector('.workspaceClose')),toggle:box(controls.at(-1)),paper:paper?box(paper):null,choices:[...footer.querySelectorAll('[data-choice]')].map(box),controls:controls.map(e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return{bottom:r.bottom,height:r.height,width:r.width,radius:s.borderRadius,padding:s.paddingTop+' '+s.paddingBottom,font:s.fontSize,line:s.lineHeight,flat:s.boxShadow==='none'||s.boxShadow.includes('inset'),visible:e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))};})};
  });
  expect(result.controls).toHaveLength(result.choices.length?1:2);
  if(result.controls.length===2)expect(result.controls[0]).toEqual(result.controls[1]);
  expect(result.controls[0].height).toBe(44);expect(result.controls[0].width).toBe(112);
  expect(result.controls[0].flat).toBe(true);expect(result.controls[0].visible).toBe(true);
  expect(result.toggle.right).toBeCloseTo(result.close.right,1);
  if(result.paper){expect(result.paper.bottom).toBeCloseTo(result.footer.bottom,1);expect(result.paper.x).toBeGreaterThan(result.toggle.right);}
  if(result.choices.length){
    expect(result.choices).toHaveLength(4);
    expect(result.choices[0].y).toBe(result.choices[1].y);expect(result.choices[2].y).toBe(result.choices[3].y);
    expect(result.choices[2].y).toBeGreaterThan(result.choices[0].y);
    for(const choice of result.choices){expect(choice.right).toBeLessThan(result.toggle.x);expect(choice.height).toBeGreaterThanOrEqual(44);}
  }
}
async function keyboard(page){
  await page.locator('[data-open-answer]').first().focus();
  await page.evaluate(()=>{
    Object.defineProperty(visualViewport,'height',{configurable:true,value:Math.min(405,Math.floor(innerHeight/2))});
    Object.defineProperty(visualViewport,'offsetTop',{configurable:true,value:0});
    window.eval('updateKeyboardViewportState')();
  });
}
async function settlePaper(page){
  await page.locator('.notebookSheet').evaluate(e=>Promise.all(e.getAnimations().filter(a=>a.id==='notebook-page-turn').map(a=>a.finished)));
}
async function completion(page,before,helped){
  await expect(page.locator('#app')).toHaveAttribute('data-screen','correct');
  const compact=await frame(page);
  for(const key of ['identity','title','progress'])expect(compact[key]).toEqual(before[key]);
  expect(compact.card.width).toBeLessThanOrEqual(650);
  expect(compact.card.height).toBeLessThan(360);
  expect(compact.card.x).toBeGreaterThanOrEqual(0);
  const viewport=await page.evaluate(()=>({width:innerWidth,height:visualViewport.height,top:visualViewport.offsetTop}));
  expect(compact.card.x+compact.card.width).toBeLessThanOrEqual(viewport.width);
  expect(compact.card.y).toBeGreaterThanOrEqual(viewport.top);
  expect(compact.card.y+compact.card.height).toBeLessThanOrEqual(viewport.top+viewport.height);
  await expect(page.locator('.challengeCompletion.notebookOpen,.challengeCompletion .notebookPaper,.challengeCompletion .notebookToolbar')).toHaveCount(0);
  await expect(page.locator('.workspaceResult h3')).toHaveText(helped?'Samen opgelost':'✓ Goed zo!');
  await expect(page.locator('.workspaceResult .feedback')).toHaveCSS('color','rgb(248, 239, 211)');
  await expect(page.locator('.compactCompletionLayer,.authoredExplanation,[data-help-speaker],[data-adventure-team-bar]')).toHaveCount(0);
  await expect(page.locator('[data-action="next-question"]')).toBeInViewport({ratio:1});
  // Suspension must retain the presentation and outcome as well as the question.
  const saved=await record(page);
  await page.getByRole('button',{name:'Sluit opdracht',exact:true}).click();
  await page.evaluate(()=>window.eval('openRuneChallenge')(Object.keys(window.eval('state').suspendedLearningChallenges).at(-1)));
  expect(await frame(page)).toEqual(compact);expect(await record(page)).toEqual(saved);
  await page.locator('.workspaceResult').evaluate(e=>Promise.all(e.getAnimations().map(a=>a.finished)));
  await page.screenshot({path:`${evidence}/${test.info().project.name}-${test.info().title.replaceAll(/[^a-zA-Z0-9-]/g,'_')}-completion.png`,scale:'css'});
  await page.locator('[data-action="next-question"]').click();
  await expect(page.locator('.challengeCompletion')).toHaveCount(0);
  await expect(page.locator('[data-challenge-character]')).toHaveAttribute('data-challenge-character',before.identity);
  await expect(page.locator('.sum')).toBeVisible();
}

for(const id of ['steen-4a','zon-4a','wind-2b'])for(const mode of ['direct','assisted','afterExplanation'])test(`E5 ${id} ${mode} compact completion with honest copy`,async({page})=>{
  await open(page,id);
  const check=page.getByRole('button',{name:'Controleer',exact:true});
  if(await check.count()){
    await expect(check).toHaveCSS('border-top-color','rgb(186, 161, 106)');
    await expect(check).toHaveCSS('background-image',/rgb\(53, 107, 94\)/);
    await expect(check).toHaveCSS('box-shadow',/inset/);
  }
  if(mode!=='direct')for(const stage of ['minnie','moose','explanation']){
    await answer(page,false);
    if(stage==='explanation'){
      await expect(page.locator('.teamMessage')).toHaveText('');
      await expect(page.getByRole('button',{name:'Samen afronden',exact:true})).toBeVisible();
    }else{
      await expect(page.locator('[data-adventure-team-bar]')).toHaveAttribute('data-active-speaker',stage);
      const hint=await page.evaluate(stage=>window.AtlasChallengeHints.resolve(window.eval('level').id,window.eval('currentChallengeQuestions')()[0],stage),stage);
      await expect(page.locator('.teamMessage')).toHaveText(hint);
    }
  }
  if(id==='steen-4a')await keyboard(page);
  const before=await frame(page);
  if(mode==='assisted')await page.getByRole('button',{name:'Samen afronden',exact:true}).click();else await answer(page,true);
  expect((await record(page)).outcome).toBe(mode);
  await completion(page,before,mode!=='direct');
  await expect(page.locator('.teamMessage')).toHaveText('');
});

for(const id of ['RP-M6-OP-001','RP-M6-OP-006','RP-M6-BR-002','RP-M6-GE-001','RP-M6-GE-002','RP-M6-TI-006'])for(const mode of ['direct','afterExplanation'])test(`M6 ${id} ${mode} compact left controls and stable completion`,async({page})=>{
  await open(page,id);
  await footer(page);
  const inputs=page.locator('[data-open-answer]');
  if(await inputs.count()){
    const names=id.includes('-GE-')?['Euro','Cent']:['Jouw antwoord'];
    await expect(inputs).toHaveCount(names.length);
    for(const [index,name] of names.entries())await expect(inputs.nth(index)).toHaveAccessibleName(name);
  }
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
  if(mode==='afterExplanation')for(const stage of ['minnie','moose','explanation']){
    await answer(page,false);
    await expect(page.locator('.integratedHelpHeader')).not.toContainText(/Tip [12]/);
    await expect(page.locator('[data-help-stage]')).toHaveAttribute('data-help-stage',stage);
    await expect(page.locator('.integratedHelpHeader h3')).toHaveText(stage==='explanation'?'Moose legt het uit':stage==='minnie'?'Minnie':'Moose');
    await footer(page);
    const bounds=await page.locator('.notebookPaper').boundingBox(),history=await record(page);
    await page.getByRole('button',{name:'Kladblok',exact:true}).click();
    await settlePaper(page);
    expect(await page.locator('.notebookPaper').boundingBox()).toEqual(bounds);
    await footer(page);
    await page.locator('[data-action="scratchpad-close"]').click();await settlePaper(page);expect(await record(page)).toEqual(history);
    if(stage==='explanation'){
      await page.locator('.notebookPaper').evaluate(e=>e.scrollTop=e.scrollHeight);
      await footer(page);
      await page.locator('.notebookPaper').evaluate(e=>e.scrollTop=0);
      await page.screenshot({path:`${evidence}/${test.info().project.name}-${id}-explanation.png`,scale:'css'});
    }
  }
  if(id==='RP-M6-GE-001'){
    await expect(page.locator('[data-money-input]')).toHaveCSS('border-top-width','0px');
    await expect(page.locator('[data-money-input]')).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
    await expect(page.locator('.moneyPart > span')).toHaveText(['euro','cent']);
    for(const input of await page.locator('[data-money-part]').all()){
      await expect(input).toHaveAttribute('inputmode','numeric');
      const b=await input.boundingBox();expect(b.height).toBeGreaterThanOrEqual(44);expect(b.width).toBeGreaterThanOrEqual(44);
    }
    await keyboard(page);if(mode!=='direct')await footer(page);
    await expect(page.locator('.openAnswerControls')).toHaveCSS('background-image','none');
  }
  const before=await frame(page);await answer(page,true);
  expect((await record(page)).outcome).toBe(mode);
  await completion(page,before,mode==='afterExplanation');
});

test('decorative visual wrappers are flat while receipt and staged content remain intact',async({page})=>{
  await open(page,'RP-M6-OP-003');await answer(page,false);await answer(page,false);
  const visual=page.locator('[data-learning-visual="calculationSteps"]');
  await expect(visual).toHaveCSS('border-top-width','0px');await expect(visual).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
  for(const group of await visual.locator('.learningStepGroup').all())await expect(group).toHaveCSS('background-color','rgba(0, 0, 0, 0)');
  await expect(visual).not.toContainText('615');
  await page.screenshot({path:`${evidence}/${test.info().project.name}-flat-moose.png`,scale:'css'});
});
