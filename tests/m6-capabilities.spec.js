const {test,expect}=require('@playwright/test');
const {fixtures}=require('./fixtures/m6-capabilities.cjs');
const engine=require('../src/m6-bank');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
async function start(page){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
}
async function open(page,levelId,fixture){
  await page.evaluate(async({levelId,fixture})=>{
    if(fixture)window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([fixture])};
    const call=n=>window.eval(n);await call('selectLevel')(levelId,{startImmediately:true});
    const rune=call('activeRunes')()[0];call('state').completedRunes=new Set(call('activeRunes')().filter(r=>r.id!==rune.id).map(r=>r.id));
    call('openRuneChallenge')(rune.id);
  },{levelId,fixture});
  await expect(page.locator('.challengeWorkspace')).toBeVisible();await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
}
async function snapshot(page){return page.evaluate(()=>{
  const call=n=>window.eval(n),s=call('state'),r=window.AtlasSessionReport.getCurrent();
  return {q:call('currentChallengeQuestions')()[s.questionIndex],stage:s.questionSupportStage,failures:s.challengeFailureCounts[s.activeRuneId],draws:call('learningPlanner').selections,
    notes:s.scratchpad,currency:s.currencyAnswerDraft,history:call('m6RecentHistory').entries,report:r.questions.find(q=>q.key===r.currentQuestionKey)};
});}
async function reopen(page){const before=await snapshot(page);await page.evaluate(()=>{const call=n=>window.eval(n),id=call('state').activeRuneId;call('closeChallenge')();call('openRuneChallenge')(id);call('render')();});expect(await snapshot(page)).toEqual(before);}
async function geometry(page){
  const result=await page.locator('.challengeWorkspace').evaluate(card=>{
    const zone=card.querySelector('.workspaceAnswerZone'),r=zone.getBoundingClientRect(),b=card.getBoundingClientRect();
    return {overflow:card.scrollWidth-card.clientWidth,top:b.top,bottom:b.bottom,height:innerHeight,answerBottom:r.bottom,answerTop:r.top,hit:zone.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2))};
  });
  expect(result.overflow).toBeLessThanOrEqual(1);expect(result.top).toBeGreaterThanOrEqual(0);expect(result.bottom).toBeLessThanOrEqual(result.height);expect(result.answerBottom).toBeLessThanOrEqual(result.bottom);expect(result.hit).toBe(true);
}
async function readMathText(locator) {
  return locator.evaluate(element=>{
    const clone=element.cloneNode(true);
    for(const fraction of clone.querySelectorAll('.authoredFraction'))fraction.replaceWith(`${fraction.children[0].textContent}/${fraction.children[1].textContent}`);
    return clone.textContent;
  });
}
for(const levelId of ['LVL-0032','LVL-0004','LVL-0001'])test(`global bank serves four stable positions in ${levelId} without local M6`,async({page})=>{
  await start(page);await open(page,levelId);
  expect(await page.evaluate(()=>window.eval('level').learningChallenges.flatMap(c=>c.questions.flatMap(s=>s.variants)).filter(v=>v.learningLevel==='M6'))).toEqual([]);
  const seen=[];
  for(let i=0;i<4;i++){
    const before=await snapshot(page);seen.push(before.q.id);
    const approved=require('../src/content/m6').bank.recover(before.q.id,before.q.surfaceId);
    expect(before.q.centralQuestionId).toBe(before.q.id);expect(before.q.prompt).toBe(approved.prompt);
    expect(before.report).toMatchObject({centralQuestionId:before.q.id,surfaceId:approved.surfaceId,prompt:approved.prompt,domain:'math',educationalDomain:before.q.educationalDomain,requestedLearningLevel:'M6',deliveredLearningLevel:'M6',deliveredDifficulty:before.q.difficulty});
    await reopen(page);
    await page.evaluate(()=>{const call=n=>window.eval(n);call('render')();call('render')();});expect(await snapshot(page)).toEqual(before);
    await geometry(page);
    await page.evaluate(()=>{
      const call=n=>window.eval(n),q=call('currentChallengeQuestions')()[call('state').questionIndex];
      let answer=String(q.answerSpec.allowedForms?.[0]??q.answer);
      if(window.AtlasChallengeSupport.usesStructuredMoney(q))answer={euros:String(Math.floor(q.answer/100)),cents:String(q.answer%100)};
      if(q.answerSpec.type==='currency'){let rest=q.answer;answer=Object.fromEntries([...q.answerSpec.denominations].sort((a,b)=>b-a).map(d=>{const count=Math.floor(rest/d);rest-=count*d;return[d,String(count)];}));}
      call('answerQuestion')(answer);
    });
    expect((await snapshot(page)).report.outcome).toBe('direct');
    await page.getByRole('button',{name:i===3?'Opdracht afronden':'Volgende vraag',exact:true}).click();
  }
  expect(new Set(seen).size).toBe(4);
});
for(const fixture of fixtures)test(`runtime capability ${fixture.id}: stages, notes, reopen, evidence and layout`,async({page})=>{
  await start(page);await open(page,'LVL-0032',fixture);
  const expected=engine.instantiate(fixture),composer=fixture.answerMode==='currencyCompose';
  expect((await snapshot(page)).q.id).toBe(fixture.id);
  expect(await readMathText(page.locator('.workspacePrompt'))).toBe(expected.prompt);
  if(expected.promptParts)await expect(page.locator('.workspacePrompt').getByRole('img',{name:'2 gedeeld door 3',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
  const initial=await snapshot(page);
  await page.getByRole('button',{name:'Controleer',exact:true}).click();
  const invalid=await snapshot(page);expect(invalid.stage).toBe('question');expect(invalid.failures).toBe(0);expect(invalid.report.attempts).toBe(0);expect(invalid.report.answerHistory.at(-1).valid).toBe(false);
  if(composer){
    const coin=page.locator('img[src="assets/ui/currency/20.png"]');
    await expect(coin).toBeVisible();await expect.poll(()=>coin.evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);
    const field=page.locator('[data-currency-count]').first();await expect(field).toHaveAttribute('inputmode','numeric');await expect(field).toHaveAttribute('maxlength','2');
    for(const button of await page.locator('[data-currency-step]').all()){const b=await button.boundingBox();expect(b.width).toBeGreaterThanOrEqual(44);expect(b.height).toBeGreaterThanOrEqual(44);}
    await page.locator('[data-currency-step="1"]').first().click();
  }else if(expected.answerSpec.type==='euro')await page.getByRole('textbox',{name:'Euro',exact:true}).fill('99');
  else await page.locator('[data-open-answer]').fill('99');
  for(const stage of ['minnie','moose','explanation']){
    await page.getByRole('button',{name:'Controleer',exact:true}).click();
    await expect(page.locator('[data-help-stage]')).toHaveAttribute('data-help-stage',stage);
    await expect(page.locator('[data-learning-visual]').last()).toHaveAttribute('data-support-stage',stage);
    await expect(page.locator('.notebookPaper')).toContainText(`Test stadium ${stage}`);
    if(stage==='explanation'){await expect(page.getByRole('heading',{name:'Moose legt het uit',exact:true})).toHaveCount(1);expect(await readMathText(page.locator('.explanationStepText'))).toBe(expected.authoredSupport.explanationSteps[0]);}
    else expect(await readMathText(page.locator('.integratedHintText'))).toBe(expected[stage==='minnie'?'hintMinnie':'hintMoose']);
    if(composer && stage==='moose'){
      const field=page.locator('[data-currency-count]').first(),draft=await field.inputValue(),before=await snapshot(page);
      // Bypass the numeric beforeinput guard deliberately to test a corrupt browser/runtime state.
      await field.evaluate(e=>{e.value='xx';e.dispatchEvent(new Event('input',{bubbles:true}));});
      await expect(field).toHaveValue('xx');await page.getByRole('button',{name:'Controleer',exact:true}).click();
      const invalid=await snapshot(page);expect(invalid.stage).toBe('moose');expect(invalid.failures).toBe(before.failures);expect(invalid.report.attempts).toBe(before.report.attempts);expect(invalid.report.explanationShown).toBe(false);
      await field.fill(draft);
    }
    await reopen(page);await geometry(page);
  }
  const after=await snapshot(page);expect(after.report.helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation']);expect(after.report.explanationShown).toBe(true);expect(after.draws).toBe(initial.draws);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();await page.locator('[data-scratchpad-notes]').fill('Mijn testnotitie');
  await page.locator('[data-action="scratchpad-close"]').click();await reopen(page);
  if(composer){
    const counts=fixture.id.endsWith('COMPOSE')?{2000:'1',200:'2',20:'2',10:'1'}:{1000:'1',200:'1',100:'1',20:'1',5:'1'};
    for(const field of await page.locator('[data-currency-count]').all())await field.fill(counts[await field.getAttribute('data-currency-count')]||'0');
  }else if(expected.answerSpec.type==='euro'){
    await page.getByRole('textbox',{name:'Euro',exact:true}).fill('29');await page.getByRole('textbox',{name:'Cent',exact:true}).fill('50');
  }else await page.locator('[data-open-answer]').fill('1');
  await page.screenshot({path:test.info().outputPath(fixture.id+'.png')});
  await page.getByRole('button',{name:'Controleer',exact:true}).click();
  const done=await snapshot(page);expect(done.report.outcome).toBe('afterExplanation');expect(done.report.attempts).toBe(4);expect(done.report.surfaceId).toBe('fixture');
  if(composer)expect(done.report.answerHistory.at(-1)).toMatchObject({interpreted:expected.answer,targetCents:expected.answer,unit:'cents',rawCounts:expect.any(Object),correct:true});
  await expect(page.locator('.challengeNotebook')).toHaveCount(0);
  await page.getByRole('button',{name:'Volgende vraag',exact:true}).click();
  await expect(page.locator('[data-help-speaker]')).toHaveCount(0);expect((await snapshot(page)).currency).toEqual({});expect((await snapshot(page)).notes.text).toBe('');
});

test('large bank browser startup/selection keeps only active instances and restores recent IDs after reload',async({page})=>{
  await start(page);
  const fixture=fixtures[0];
  const metrics=await page.evaluate(fixture=>{
    const rows=Array.from({length:600},(_,i)=>({...structuredClone(fixture),id:`TEST-M6-BROWSER-${i}`,difficulty:i%3+1,learningObjective:`Test objective ${i%20}`}));
    const t=performance.now();const b=window.AtlasM6Bank.createBank(rows);
    window.AtlasM6Content={...window.AtlasM6Content,bank:b};return {buildMs:performance.now()-t,size:b.size};
  },fixture);
  expect(metrics.size).toBe(600);expect(metrics.buildMs).toBeLessThan(2000);
  await open(page,'LVL-0032');const before=await snapshot(page);
  const count=await page.evaluate(()=>window.eval('state').activeQuestions.filter(q=>q.centralQuestionId).length);expect(count).toBe(1);
  const stored=await page.evaluate(()=>localStorage.getItem(window.AtlasM6Bank.HISTORY_KEY));expect(stored.length).toBeLessThan(1000);expect(stored).not.toContain('prompt');
  await page.reload();await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await expect(page.locator('.menuScreen')).toBeVisible();
  expect(await page.evaluate(()=>window.eval('m6RecentHistory').entries)).toEqual(before.history);
  console.log(JSON.stringify(metrics));
});

test('currency counts and notebook remain reachable above the reduced keyboard viewport',async({page})=>{
  await start(page);await open(page,'LVL-0032',fixtures[1]);
  await page.locator('[data-currency-step="1"]').first().click();await page.getByRole('button',{name:'Controleer',exact:true}).click();
  await page.locator('[data-currency-count]').last().focus();
  const height=await page.evaluate(()=>{
    const height=Math.min(Math.floor(innerHeight/2),405);
    Object.defineProperty(window.visualViewport,'height',{configurable:true,value:height});Object.defineProperty(window.visualViewport,'offsetTop',{configurable:true,value:0});
    window.eval('updateKeyboardViewportState')();return height;
  });
  await expect(page.locator('body')).toHaveClass(/keyboard-open/);
  await expect.poll(async()=>{const b=await page.locator('[data-currency-count]').last().boundingBox();return b.y+b.height;}).toBeLessThanOrEqual(height);
  await expect(page.locator('[data-currency-count]').last()).toBeFocused();
  await geometry(page);expect((await page.locator('.challengeWorkspace').boundingBox()).height).toBeLessThanOrEqual(height);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();await page.locator('[data-scratchpad-notes]').fill('Test\nnotitie');await page.locator('[data-action="scratchpad-close"]').click();
  await geometry(page);await expect(page.locator('.integratedHintText')).toContainText('Test Minnie');
  await page.screenshot({path:test.info().outputPath('currency-keyboard.png')});
});

test('multiple authored surfaces and choice ordering freeze across help, notes, rerender and reopening',async({page})=>{
  const r=structuredClone(fixtures[3]);r.answerMode='multipleChoice';r.educationalCore.question={answer:'6',choices:['4','5','6','7'],answerSpec:{type:'choice'}};
  r.surfaces[0].prompt='Test {bundle}';r.surfaces[0].tokens={bundle:'<b>A</b>'};
  r.surfaces.push({...structuredClone(r.surfaces[0]),id:'other',tokens:{bundle:'B'}});
  await start(page);await open(page,'LVL-0032',r);const before=await snapshot(page);
  await expect(page.locator('.workspacePrompt')).toHaveText(before.q.prompt);await expect(page.locator('.workspacePrompt b')).toHaveCount(0);
  await page.locator('[data-choice="4"]').click();
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();await page.locator('[data-scratchpad-notes]').fill('Privé');await page.locator('[data-action="scratchpad-close"]').click();await reopen(page);
  const after=await snapshot(page);expect(after.q).toEqual(before.q);expect(after.draws).toBe(before.draws);expect(after.history).toEqual(before.history);expect(after.report.surfaceId).toBe(before.q.surfaceId);expect(after.report.prompt).toBe(before.q.prompt);
  await page.locator('[data-choice="6"]').click();expect((await snapshot(page)).report.outcome).toBe('afterMinnie');
  await page.getByRole('button',{name:'Volgende vraag',exact:true}).click();expect((await snapshot(page)).q.surfaceId).not.toBe(before.q.surfaceId);
});

test('composition has direct completion for a second valid combination and standalone report evidence',async({page})=>{
  await start(page);await open(page,'LVL-0032',fixtures[1]);
  for(const [denomination,count] of Object.entries({1000:'2',200:'2',50:'1'}))await page.locator(`[data-currency-count="${denomination}"]`).fill(count);
  await page.locator('[data-currency-count="50"]').press('Enter');const done=await snapshot(page);
  expect(done.report).toMatchObject({outcome:'direct',explanationShown:false,attempts:1,helpHistory:[]});
  expect(done.report.answerHistory[0]).toMatchObject({interpreted:2450,targetCents:2450,rawCounts:{1000:'2',200:'2',50:'1'}});
  await page.evaluate(()=>{window.eval('returnToMenu')();window.AtlasM6Content={records:[],bank:window.AtlasM6Bank.createBank([])};});
  await page.getByRole('button',{name:'Voortgang',exact:true}).click();await page.locator('.sessionQuestionDetail').first().locator('summary').click();
  await expect(page.locator('.sessionQuestionDetail').first()).toContainText('TEST-M6-CURRENCY-COMPOSE / fixture');
  await expect(page.locator('.sessionQuestionDetail').first()).toContainText('2450 cents');
  await expect(page.locator('.sessionQuestionDetail').first()).toContainText('Direct goed');
});
