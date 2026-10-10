const {test,expect}=require('@playwright/test');
const fs=require('fs');
const {readApproved}=require('../scripts/runenpoort-m6-content.cjs');
const support=require('../src/challenge-support');
const layouts=require('../src/challenge-explanation-layouts');
const entries=readApproved();
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
const evidence='qa-screenshots/challenge-notebook-finish-20261004';
const clean=text=>text.replaceAll('**','');
async function start(page){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
}
async function open(page,id){
  const entry=entries.find(e=>e.question.id===id);
  await page.evaluate(async entry=>{
    const call=n=>window.eval(n);
    if(call('level')?.id!==entry.levelId)await call('selectLevel')(entry.levelId,{startImmediately:true});
    const s=call('state'),l=call('level');
    s.suspendedLearningChallenges={};s.completedRunes=new Set(call('activeRunes')().filter(r=>r.id!==entry.challengeId).map(r=>r.id));
    const c=l.learningChallenges.find(c=>c.id===entry.challengeId),index=c.questions.findIndex(q=>q.id===entry.slotId);
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank(window.AtlasM6Content.records.filter(r=>r.id===entry.question.id))};call('openRuneChallenge')(entry.challengeId);
    s.questionIndex=index;call('trackCurrentSessionQuestion')();call('render')();
  },entry);
  await expect(page.locator('.challengeWorkspace')).toBeVisible();
  await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
}
async function snapshot(page){return page.evaluate(()=>{
  const s=window.eval('state'),q=window.eval('currentChallengeQuestions')()[s.questionIndex],r=window.AtlasSessionReport.getCurrent();
  return {question:q,stage:s.questionSupportStage,failures:s.challengeFailureCounts[s.activeRuneId],attempts:s.attempts,draws:window.eval('learningPlanner').selections,draft:s.answerDraft,money:s.moneyAnswerDraft,notes:s.scratchpad,record:r?.questions.find(q=>q.key===r.currentQuestionKey)};
});}
async function reopen(page){
  const before=await snapshot(page);
  await page.getByRole('button',{name:'Sluit opdracht',exact:true}).click();
  await expect(page.locator('[data-adventure-team-bar]')).toHaveCount(1);
  await expect(page.locator('.teamMessage')).toHaveText('');
  await page.evaluate(()=>{const s=window.eval('state');window.eval('openRuneChallenge')(Object.keys(s.suspendedLearningChallenges).at(-1));});
  expect(await snapshot(page)).toEqual(before);
}
async function wrong(page){await page.evaluate(()=>{
  const q=window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex];
  window.eval('answerQuestion')(window.AtlasChallengeSupport.usesStructuredMoney(q)?{euros:'99',cents:''}:q.choices?.find(c=>c!==q.answer)||'9999');
});}
async function finish(page){await page.evaluate(()=>{
  const q=window.eval('currentChallengeQuestions')()[window.eval('state').questionIndex];
  window.eval('answerQuestion')(window.AtlasChallengeSupport.usesStructuredMoney(q)?{euros:String(Math.floor(q.answer/100)),cents:String(q.answer%100)}:q.answerSpec?.allowedForms?.[0]||q.answer);
});}
async function geometry(page){
  await page.evaluate(()=>document.fonts.ready);
  await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
  // Rule alignment is measured on the flat page; the turn itself is checked separately.
  if(await page.locator('.notebookSheet').count())await page.locator('.notebookSheet').evaluate(e=>Promise.all(e.getAnimations().filter(a=>a.id==='notebook-page-turn').map(a=>a.finished)));
  const result=await page.locator('.challengeWorkspace').evaluate(card=>{
    const fields=[...card.querySelectorAll('[data-open-answer],[data-choice],button[type=submit]')];
    const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,bottom:r.bottom,right:r.right};};
    return{card:rect(card),fields:fields.map(e=>({...rect(e),hit:e.contains(document.elementFromPoint(e.getBoundingClientRect().x+e.clientWidth/2,e.getBoundingClientRect().y+e.clientHeight/2))})),overflow:card.scrollWidth-card.clientWidth,contentOverflow:card.querySelector('.workspaceContent').scrollWidth-card.querySelector('.workspaceContent').clientWidth,width:innerWidth,height:innerHeight,notes:card.querySelector('textarea')?rect(card.querySelector('textarea')):null};
  });
  if(result.overflow>1){
    await test.info().attach('overflow-layout',{body:JSON.stringify(await page.locator('.challengeWorkspace').evaluate(card=>{
      const r=card.getBoundingClientRect();return [...card.querySelectorAll('*')].map(e=>{const b=e.getBoundingClientRect();return {class:e.className,left:b.left,right:b.right,width:b.width,scrollWidth:e.scrollWidth,clientWidth:e.clientWidth};}).filter(e=>e.right>r.right||e.left<r.left||e.scrollWidth>e.clientWidth+1);
    }),null,2),contentType:'application/json'});
    await page.screenshot({path:`${evidence}/${test.info().project.name}-overflow.png`});
  }
  expect(result.card.x).toBeGreaterThanOrEqual(0);expect(result.card.right).toBeLessThanOrEqual(result.width);
  expect(result.card.bottom).toBeLessThanOrEqual(result.height);expect(result.overflow).toBeLessThanOrEqual(1);expect(result.contentOverflow).toBeLessThanOrEqual(1);
  for(const f of result.fields){expect(f.w).toBeGreaterThanOrEqual(44);expect(f.h).toBeGreaterThanOrEqual(44);expect(f.y).toBeGreaterThanOrEqual(result.card.y);expect(f.bottom).toBeLessThanOrEqual(result.card.bottom);expect(f.hit).toBe(true);}
  if(result.notes){expect(result.notes.w).toBeGreaterThanOrEqual(240);expect(result.notes.h).toBeGreaterThanOrEqual(60);}
  if(await page.locator('.challengeNotebook').count()){
    const notebook=await page.locator('.challengeNotebook').boundingBox(),main=await page.locator('.workspaceMain').boundingBox();
    if(result.width>700){expect(notebook.x).toBeGreaterThanOrEqual(main.x+main.width);expect(notebook.y).toBe(main.y);}
    const paper=page.locator('.notebookPaper');
    const decoration=await page.locator('.challengeNotebook').evaluate(notebook=>{
      const paper=notebook.querySelector('.notebookPaper'),binding=notebook.querySelector('.notebookBindingWindow');
      const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,bottom:r.bottom};};
      return {hidden:binding.getAttribute('aria-hidden'),pointer:getComputedStyle(binding).pointerEvents,binding:rect(binding),paper:rect(paper),color:getComputedStyle(notebook.querySelector('.notebookMaterialWindow')).backgroundColor,markers:[...paper.querySelectorAll('.explanationStepText')].map(block=>{
        const style=getComputedStyle(block),badge=getComputedStyle(block,'::before'),item=block.closest('li');
        return {offset:parseFloat(badge.top)-parseFloat(style.paddingTop),radius:badge.borderRadius,width:badge.width,content:badge.content,listStyle:getComputedStyle(item).listStyleType,listRole:item.parentElement.getAttribute('role')};
      })};
    });
    expect(decoration.hidden).toBe('true');expect(decoration.pointer).toBe('none');
    expect(decoration.binding.x).toBeLessThan(decoration.paper.x);
    expect(decoration.binding.y).toBeGreaterThan(decoration.paper.y);
    expect(decoration.binding.bottom).toBeLessThan(decoration.paper.bottom);
    expect(decoration.color).toBe('rgb(243, 232, 201)');
    expect(await paper.evaluate(e=>e.scrollWidth-e.clientWidth)).toBeLessThanOrEqual(1);
    await expect(paper).toHaveCSS('overflow-y','auto');
    if(await page.locator('.integratedHelpHeader').count()){
      const original=await page.locator('.compactChallengeHeader .challengePortraitFrame').boundingBox(),guide=await page.locator('.integratedHelpHeader .challengePortraitFrame').boundingBox();
      expect(guide.width).toBe(original.width);expect(guide.height).toBe(original.height);expect(guide.y).toBe(original.y);
    }
    const textLines=await paper.evaluate(e=>[...e.querySelectorAll('.explanationStepText')].flatMap(block=>{
      const range=document.createRange();range.selectNodeContents(block);return [...range.getClientRects()].map(rect=>rect.top);
    }));
    for(const top of textLines){const rows=(top-textLines[0])/28;expect(Math.abs(rows-Math.round(rows)),JSON.stringify(textLines)).toBeLessThan(.04);}
    for(const marker of decoration.markers){expect(marker.offset).toBe(3);expect(marker.radius).toBe('50%');expect(marker.width).toBe('22px');expect(marker.content).not.toBe('none');expect(marker.listStyle).toBe('none');expect(marker.listRole).toBe('list');}
  }
}

test('declarative explanation layouts preserve all text, groups and geometry exactly once',async({page})=>{
  await page.setContent('<main></main>');
  expect(Object.keys(layouts).sort()).toEqual(entries.map(e=>e.question.id).sort());
  for(const {question:q} of entries){
    expect(support.validateExplanationLayout(q),q.id).toEqual([]);
    await page.locator('main').evaluate((root,html)=>root.innerHTML=html,support.renderExplanation(q));
    expect(await page.locator('.explanationStepText').allTextContents()).toEqual(q.authoredSupport.explanationSteps.map(clean));
    const original=support.renderVisual(q.visual,'explanation');
    const expected=await page.evaluate(html=>{const el=document.createElement('div');el.innerHTML=html;return ['.learningStepGroup','.learningReceipt','.fractionStrip','.learningTimeline','.learningVisualNote'].map(s=>[s,[...el.querySelectorAll(s)].map(e=>e.textContent)]);},original);
    for(const [selector,texts] of expected)expect(await page.locator(selector).allTextContents(),q.id+selector).toEqual(texts);
    await expect(page.locator('main > .learningVisual')).toHaveCount(0);
    for(const [groupIndex,step] of (layouts[q.id].groups||[]).entries()){
      const text=await page.locator('.learningStepGroup').nth(groupIndex).evaluate(e=>e.closest('li').querySelector('.explanationStepText').textContent);
      expect(text).toBe(clean(q.authoredSupport.explanationSteps[step]));
    }
  }
});

for(const npc of [false,true])test(`E5 ${npc?'Freya NPC':'standard'} uses compact shared companion flow and stable reopening`,async({page})=>{
  await start(page);
  const q=await page.evaluate(async npc=>{
    await window.eval('selectLevel')('LVL-0001',{startImmediately:true});
    const l=window.eval('level'),s=window.eval('state');
    const c=l.learningChallenges.find(c=>c.id===(npc?'wind':'zon'));
    const question=npc?c.questions[1].variants.find(v=>v.id==='wind-2b'):c.questions[0].variants.find(v=>!v.learningLevel||v.learningLevel==='E5');
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([])};c.questions=[{id:c.questions[0].id,variants:[question]}];
    s.completedRunes=new Set(window.eval('activeRunes')().filter(r=>r.id!==c.id).map(r=>r.id));
    window.eval('openRuneChallenge')(c.id);return window.eval('currentChallengeQuestions')()[0];
  },npc);
  await expect(page.locator('.challengeWorkspace')).toHaveAttribute('data-learning-mode','E5');
  expect(q.atlasLearningSelection).toMatchObject({requested:'M6',delivered:'E5',fallback:true});
  if(npc){await expect(page.locator('.sum')).toHaveText('24 : 6 = ?');await expect(page.locator('[data-challenge-character]')).toHaveAttribute('data-challenge-character','freya');}
  await expect(page.locator('.npcEncounterCard,.npcRetryHint,[data-help-speaker],.scratchpadToggle')).toHaveCount(0);
  await reopen(page);
  for(const [index,stage] of ['minnie','moose','explanation'].entries()){
    await wrong(page);await reopen(page);
    const s=await snapshot(page);expect(s.failures).toBe(index+1);
    if(stage!=='explanation'){
      const hint=await page.evaluate(({q,stage})=>window.AtlasChallengeHints.resolve('LVL-0001',q,stage),{q,stage});
      await expect(page.locator('.teamMessage')).toHaveText(hint);
      await expect(page.locator('[data-adventure-team-bar]')).toHaveAttribute('data-active-speaker',stage);
    }else{await expect(page.locator('.challengeFeedback')).toHaveText(q.explanation);await expect(page.getByRole('button',{name:'Samen afronden',exact:true})).toBeVisible();}
    await expect(page.locator('.npcRetryHint,[data-help-speaker]')).toHaveCount(0);await geometry(page);
    await page.screenshot({path:`${evidence}/${test.info().project.name}-e5-${npc?'freya':'standard'}-${stage}.png`});
  }
  await page.getByRole('button',{name:'Samen afronden',exact:true}).click();
  await expect(page.locator('#app')).toHaveAttribute('data-screen','correct');
  await expect(page.locator('[data-action="next-question"]')).toBeVisible();
});

test('Freya E5 fallback then M6 runenstickers uses delivered level and clears prior hints',async({page})=>{
  await start(page);
  await page.evaluate(async()=>{
    await window.eval('selectLevel')('LVL-0001',{startImmediately:true});
    const c=window.eval('level').learningChallenges.find(c=>c.id==='wind');
    const e5=c.questions[1].variants.find(v=>v.id==='wind-2b');
    c.questions=[{id:'wind-slot-2',variants:[e5]},{id:'wind-slot-3',variants:[e5]},{id:'e5-transition-test',variants:[e5]}];
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([])};window.eval('state').completedRunes=new Set(['zon','steen']);window.eval('openRuneChallenge')('wind');
  });
  await expect(page.locator('.sum')).toHaveText('24 : 6 = ?');
  await wrong(page);await finish(page);
  await page.evaluate(()=>{window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank(window.AtlasM6Content.records.filter(r=>r.id==='RP-M6-GE-002'))};});
  await page.locator('[data-action="next-question"]').click();
  await expect(page.locator('.challengeWorkspace')).toHaveAttribute('data-learning-mode','M6');
  await expect(page.locator('.sum')).toHaveText(entries.find(e=>e.question.id==='RP-M6-GE-002').question.prompt);
  await expect(page.locator('[data-adventure-team-bar]')).toHaveCount(0);
  await wrong(page);await finish(page);
  await page.evaluate(()=>{window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([])};});
  await page.locator('[data-action="next-question"]').click();
  await expect(page.locator('.challengeWorkspace')).toHaveAttribute('data-learning-mode','E5');
  await expect(page.locator('.teamMessage')).toHaveText('');await expect(page.locator('[data-help-speaker]')).toHaveCount(0);
  await expect(page.locator('[data-challenge-character]')).toHaveAttribute('data-challenge-character','freya');
});

test('Eivar retains identity and E5 open drafts; empty input never counts as a wrong answer',async({page})=>{
  await start(page);
  const question=await page.evaluate(async()=>{
    await window.eval('selectLevel')('LVL-0003',{startImmediately:true});
    const c=window.eval('level').learningChallenges.find(c=>c.id==='gateShield');
    const q=c.questions.flatMap(s=>s.variants).find(v=>v.answerMode==='open'&&(!v.learningLevel||v.learningLevel==='E5'));
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([])};c.questions=[{id:c.questions[0].id,variants:[q]}];
    window.eval('state').completedRunes=new Set(window.eval('activeRunes')().filter(r=>r.id!==c.id).map(r=>r.id));window.eval('openRuneChallenge')(c.id);return q;
  });
  await expect(page.locator('.compactChallengeHeader .eyebrow')).toHaveText('Eivar');
  const before=await snapshot(page);
  await expect(page.locator('[data-open-answer]')).toHaveAttribute('pattern','[0-9]*');
  await page.locator('[data-open-answer]').fill('');await page.getByRole('button',{name:'Controleer',exact:true}).click();
  await page.evaluate(()=>window.eval('answerQuestion')('   '));
  const invalid=await snapshot(page);expect(invalid.attempts).toBe(before.attempts);expect(invalid.failures).toBe(0);expect(invalid.record.helpHistory).toEqual([]);
  await page.locator('[data-open-answer]').fill('2');await reopen(page);await expect(page.locator('[data-open-answer]')).toHaveValue('2');
  await wrong(page);await expect(page.locator('.teamMessage')).toHaveText(await page.evaluate(q=>window.AtlasChallengeHints.resolve('LVL-0003',q,'minnie'),question));
  await geometry(page);
  for(const stage of [1,2,3]){
    if(stage>1)await wrong(page);
    await page.locator('[data-open-answer]').focus();
    await page.evaluate(()=>{
      Object.defineProperty(window.visualViewport,'height',{configurable:true,value:480});
      Object.defineProperty(window.visualViewport,'offsetTop',{configurable:true,value:0});
      window.eval('updateKeyboardViewportState')();
    });
    await geometry(page);
    const card=await page.locator('.challengeWorkspace').boundingBox(),bar=await page.locator('[data-adventure-team-bar]').boundingBox();
    expect(card.y+card.height).toBeLessThanOrEqual(bar.y);expect(bar.y+bar.height).toBeLessThanOrEqual(480);
    if(stage===3){
      await page.screenshot({path:`${evidence}/${test.info().project.name}-e5-eivar-keyboard.png`});
      await test.info().attach('e5-keyboard-layout',{body:JSON.stringify(await page.evaluate(()=>['.challengeWorkspace','.workspaceHeader','.workspaceMain','.workspacePrompt','.workspaceContent','.challengeFeedback','.workspaceAnswerZone','.openAnswerForm','.assistedCompletionButton'].map(selector=>{const e=document.querySelector(selector),r=e.getBoundingClientRect();return{selector,top:r.top,height:r.height,scrollHeight:e.scrollHeight,margin:getComputedStyle(e).margin};})),null,2),contentType:'application/json'});
      await expect(page.locator('.challengeFeedback')).toBeInViewport({ratio:1});await expect(page.locator('[data-action="assisted-complete"]')).toBeInViewport({ratio:1});
    }
  }
  await page.screenshot({path:`${evidence}/${test.info().project.name}-e5-eivar-keyboard.png`});
});

test('scratchpad survives every help stage and reopening',async({page})=>{
  await start(page);await open(page,'RP-M6-OP-003');
  await page.locator('[data-open-answer]').fill('61');
  const before=await snapshot(page);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  const notes=page.getByRole('textbox',{name:'Eigen kladwerk'});
  await expect(notes).toHaveJSProperty('tagName','TEXTAREA');
  for(const [name,value]of Object.entries({inputmode:'decimal',autocorrect:'off',autocapitalize:'off',spellcheck:'false',autocomplete:'off'}))await expect(notes).toHaveAttribute(name,value);
  const text='Mijn eigen werk\n368 + 200\n€5,50 − 0.25';
  await expect(notes).toHaveValue('');await notes.fill(text);
  await page.getByRole('button',{name:'Sluit kladblok',exact:true}).click();
  expect((await snapshot(page)).record).toEqual(before.record);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();await expect(notes).toHaveValue(text);
  for(const stage of ['question','minnie','moose','explanation']){
    if(stage!=='question')await wrong(page);
    if(stage!=='question'){
      await expect(page.locator('.challengeNotebook')).toHaveAttribute('data-notebook-mode','help');
      await expect(notes).toHaveCount(0);
      await page.getByRole('button',{name:'Kladblok',exact:true}).click();
    }
    await reopen(page);await expect(notes).toHaveValue(text);await expect(notes).toHaveAttribute('inputmode','decimal');await expect(page.locator('[data-open-answer]')).toHaveValue('61');
    expect((await snapshot(page)).stage).toBe(stage);
  }
});

// Retention across all stages and clear/completion are separate browser scenarios
// so both retain their full assertions within the normal 30s iPad test budget.
test('clearing reopened notes preserves help and next-question notes start empty',async({page})=>{
  await start(page);await open(page,'RP-M6-OP-003');
  await page.locator('[data-open-answer]').fill('61');
  for(let i=0;i<3;i++)await wrong(page);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  const notes=page.getByRole('textbox',{name:'Eigen kladwerk'});
  await notes.fill('Mijn eigen werk\n368 + 200');
  await reopen(page);
  await expect(notes).toHaveValue('Mijn eigen werk\n368 + 200');
  await expect(page.locator('[data-open-answer]')).toHaveValue('61');
  const reached=await snapshot(page);
  await page.getByRole('button',{name:'Wis kladwerk',exact:true}).click();await expect(notes).toHaveValue('Mijn eigen werk\n368 + 200');
  await page.getByRole('button',{name:'Annuleren',exact:true}).click();
  await page.getByRole('button',{name:'Wis kladwerk',exact:true}).click();await page.getByRole('button',{name:'Wis',exact:true}).click();
  await expect(notes).toHaveValue('');const cleared=await snapshot(page);expect({...cleared,notes:reached.notes}).toEqual(reached);
  await finish(page);expect((await snapshot(page)).record.outcome).toBe('afterExplanation');
  await page.locator('[data-action="next-question"]').click();await page.getByRole('button',{name:'Kladblok',exact:true}).click();await expect(notes).toHaveValue('');
  await expect(page.locator('[data-help-speaker]')).toHaveCount(0);
});

test('scratchpad alone keeps direct, never enters reports or reload persistence',async({page})=>{
  await start(page);await open(page,'RP-M6-GE-002');
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  await page.getByRole('textbox',{name:'Eigen kladwerk'}).fill('PRIVATE-KLAD-NOTITIE-0123');
  await page.getByRole('textbox',{name:'Euro',exact:true}).fill('0');await page.getByRole('textbox',{name:'Cent',exact:true}).fill('80');
  await reopen(page);await page.getByRole('button',{name:'Controleer',exact:true}).click();
  const record=(await snapshot(page)).record;expect(record).toMatchObject({outcome:'direct',attempts:1,helpHistory:[],explanationShown:false});
  const persisted=await page.evaluate(()=>{window.AtlasSessionReport.end();return JSON.stringify({report:window.AtlasSessionReport.getSessions(),local:{...localStorage},session:{...sessionStorage}});});
  expect(persisted).not.toContain('PRIVATE-KLAD-NOTITIE-0123');
  await page.reload();await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await expect(page.locator('.menuScreen')).toBeVisible();await open(page,'RP-M6-GE-002');
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();await expect(page.getByRole('textbox',{name:'Eigen kladwerk'})).toHaveValue('');
});

for(const id of ['RP-M6-OP-003','RP-M6-GE-002','RP-M6-BR-006','RP-M6-TI-006'])test(`workspace screenshots and touch/focus: ${id}`,async({page,isMobile})=>{
  await start(page);await open(page,id);
  const toggle=page.getByRole('button',{name:'Kladblok',exact:true});
  for(const stage of ['question','minnie','moose','explanation']){
    if(stage!=='question')await wrong(page);
    for(const expanded of [false,true]){
      if(expanded){if(isMobile)await toggle.tap();else{await toggle.focus();await page.keyboard.press('Enter');}}
      await geometry(page);
      // Assert every stage/face. Capture endpoints at CSS resolution: full-DPR
      // textured tablet PNG encoding must not consume the interaction budget.
      if(stage==='question'||stage==='explanation')await page.screenshot({scale:'css',path:`${evidence}/${test.info().project.name}-${id}-${stage}-${expanded?'notes':'closed'}.png`});
      if(expanded){await page.getByRole('textbox',{name:'Eigen kladwerk'}).fill('Eigen kladwerk\n');await page.locator('[data-action="scratchpad-close"]').click();}
    }
  }
  const scroll=page.locator('.notebookPaper');
  await scroll.focus();await page.keyboard.press('End');
  await expect(scroll).toHaveCSS('overflow-y','auto');
  // Short explanations can fit in portrait. All final steps must be fully reachable,
  // while the long OP-003 fixture must genuinely exercise internal scrolling.
  if(id==='RP-M6-OP-003')expect(await scroll.evaluate(e=>e.scrollHeight>e.clientHeight)).toBe(true);
  await expect(page.locator('.authoredExplanation li').last()).toBeInViewport({ratio:1});
  await page.keyboard.press('Home');
  await expect(page.locator('.explanationStepText').first()).toBeInViewport({ratio:1});
  await geometry(page);
});

for(const id of ['RP-M6-OP-003','RP-M6-GE-002'])test(`scratchpad and answer keyboard viewport: ${id}`,async({page})=>{
  await start(page);await open(page,id);await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  await wrong(page);await wrong(page);await wrong(page);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  for(const selector of ['[data-scratchpad-notes]','[data-open-answer]']){
    await page.locator(selector).first().focus();
    const height=await page.evaluate(()=>{
      const height=Math.min(Math.floor(innerHeight/2),405);
      // Exercise the real focus/viewport handler. A CSS-only flag races WebKit's focus event.
      Object.defineProperty(window.visualViewport,'height',{configurable:true,value:height});
      Object.defineProperty(window.visualViewport,'offsetTop',{configurable:true,value:0});
      window.eval('updateKeyboardViewportState')();return height;
    });
    const result=await page.locator(selector).first().evaluate(e=>{const r=e.getBoundingClientRect();return{top:r.top,bottom:r.bottom,focused:document.activeElement===e};});
    expect(result.focused).toBe(true);expect(result.top).toBeGreaterThanOrEqual(0);expect(result.bottom).toBeLessThanOrEqual(height);
    const prompt=page.locator('.workspacePrompt');
    await expect(prompt).toHaveCSS('font-size',await prompt.evaluate(e=>e.classList.contains('storyPrompt')?'20px':'24px'));
    await geometry(page);await page.screenshot({path:`${evidence}/${test.info().project.name}-${id}-keyboard-${selector.includes('scratch')?'notes':'answer'}.png`});
  }
  await page.locator('[data-action="scratchpad-close"]').click();
  await page.locator('[data-open-answer]').first().focus();
  await page.evaluate(()=>window.eval('updateKeyboardViewportState')());
  await geometry(page);
  await expect(page.locator('.integratedHelpHeader')).toBeInViewport({ratio:1});
  expect((await page.locator('.challengeWorkspace').boundingBox()).height).toBeLessThanOrEqual(405);
  await page.screenshot({path:`${evidence}/${test.info().project.name}-${id}-keyboard-help.png`});
});

// Keep each stage independently diagnosable within the normal test timeout.
// Cross-stage private-note retention is also exercised by the scratchpad test above.
for(const id of ['RP-M6-OP-006','RP-M6-TI-006'])for(const [stageIndex,stage] of ['minnie','moose','explanation'].entries())test(`compact A and facing notebook B preserve content and history: ${id} ${stage}`,async({page})=>{
  await start(page);await open(page,id);
  const q=entries.find(e=>e.question.id===id).question;
  await expect(page.locator('.challengeNotebook')).toHaveCount(0);
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
  await expect(page.locator('.sum')).toHaveText(q.prompt);
  const initial=await page.locator('.challengeWorkspace').boundingBox();
  expect(initial.height).toBeLessThan(450);
  await expect(page.locator('.sum')).toBeInViewport({ratio:1});
  await geometry(page);
  await page.screenshot({path:`${evidence}/${test.info().project.name}-${id}-A.png`});
  for(let i=0;i<=stageIndex;i++)await wrong(page);
  {
    await expect(page.locator('.challengeNotebook')).toHaveAttribute('data-notebook-mode','help');
    await geometry(page);
    const before=await snapshot(page);
    await page.getByRole('button',{name:'Kladblok',exact:true}).click();
    await page.getByRole('textbox',{name:'Eigen kladwerk'}).fill('Mijn berekening');
    await expect(page.locator('.integratedChallengeHelp')).toHaveCount(0);
    await reopen(page);
    await page.getByRole('button',{name:stage==='explanation'?'Terug naar uitleg':'Terug naar tip',exact:true}).click();
    await expect(page.locator('.challengeNotebook')).toHaveAttribute('data-notebook-mode','help');
    await expect(page.locator('.integratedChallengeHelp')).toHaveAttribute('data-help-stage',stage);
    if(stage==='explanation')expect(await page.locator('.explanationStepText').allTextContents()).toEqual(q.authoredSupport.explanationSteps.map(clean));
    else await expect(page.locator('.integratedHintText')).toHaveText(clean(q[stage==='minnie'?'hintMinnie':'hintMoose']));
    const after=await snapshot(page);
    expect({...after,notes:before.notes}).toEqual(before);
    expect(after.notes.text).toBe('Mijn berekening');expect(after.notes.open).toBe(false);
    await reopen(page);await geometry(page);
    await page.screenshot({path:`${evidence}/${test.info().project.name}-${id}-B-${stage}.png`});
  }
  await finish(page);expect((await snapshot(page)).record.outcome).toBe(['afterMinnie','afterMoose','afterExplanation'][stageIndex]);
});

test('notebook page turn respects motion preference and never adds learning events',async({page})=>{
  await start(page);await open(page,'RP-M6-OP-003');await wrong(page);
  await page.evaluate(()=>document.fonts.ready);
  const bindingFrame=()=>page.locator('.notebookBindings').evaluate(e=>{
    const {x,y,width,height}=e.getBoundingClientRect(),style=getComputedStyle(e);
    return {x,y,width,height,image:style.backgroundImage,transform:style.transform,pointer:style.pointerEvents,hidden:e.getAttribute('aria-hidden')};
  });
  const fixedBindings=await bindingFrame();
  expect(fixedBindings).toMatchObject({transform:'matrix(1, 0, 0, 1, 0, 0)',pointer:'none',hidden:'true'});
  for(const preference of ['no-preference','reduce']){
    await page.emulateMedia({reducedMotion:preference});
    const before=await snapshot(page);
    // Start through the real action handler and inspect the animation in the same task.
    const durations=await page.evaluate(()=>{
      document.querySelector('[data-action="scratchpad-toggle"]').click();
      return document.querySelector('.notebookSheet').getAnimations().filter(a=>a.id==='notebook-page-turn').map(a=>a.effect.getTiming().duration);
    });
    expect(durations).toEqual(preference==='reduce'?[]:[320]);
    expect(await bindingFrame()).toEqual(fixedBindings);
    if(preference==='no-preference'){
      const during=await page.evaluate(()=>{
        const animation=document.querySelector('.notebookSheet').getAnimations().find(a=>a.id==='notebook-page-turn');
        animation.pause();animation.currentTime=80;
        const card=document.querySelector('.challengeWorkspace');return card.scrollWidth-card.clientWidth;
      });
      expect(during).toBeLessThanOrEqual(1);
      expect(await bindingFrame()).toEqual(fixedBindings);
      await page.screenshot({path:`${evidence}/${test.info().project.name}-page-turn-to-notes.png`});
      await page.locator('.notebookSheet').evaluate(e=>e.getAnimations().filter(a=>a.id==='notebook-page-turn').forEach(a=>a.finish()));
    }
    await page.getByRole('textbox',{name:'Eigen kladwerk'}).fill('12 + 3');
    const returning=await page.evaluate(()=>{
      document.querySelector('[data-action="scratchpad-close"]').click();
      const animation=document.querySelector('.notebookSheet').getAnimations().find(a=>a.id==='notebook-page-turn');
      if(animation){animation.pause();animation.currentTime=80;}
      const card=document.querySelector('.challengeWorkspace');return card.scrollWidth-card.clientWidth;
    });
    expect(returning).toBeLessThanOrEqual(1);
    expect(await bindingFrame()).toEqual(fixedBindings);
    if(preference==='no-preference')await page.screenshot({path:`${evidence}/${test.info().project.name}-page-turn-to-help.png`});
    await page.locator('.notebookSheet').evaluate(e=>e.getAnimations().filter(a=>a.id==='notebook-page-turn').forEach(a=>a.finish()));
    const after=await snapshot(page);expect({...after,notes:before.notes}).toEqual(before);
    expect(await bindingFrame()).toEqual(fixedBindings);
  }
});

test('Chromebook-size layout keeps question and answer beside the notebook',async({page})=>{
  await page.setViewportSize({width:1366,height:768});
  await start(page);await open(page,'RP-M6-OP-006');await wrong(page);await wrong(page);
  await geometry(page);await expect(page.locator('.sum')).toBeInViewport({ratio:1});
  await page.screenshot({path:`${evidence}/${test.info().project.name}-chromebook-size.png`});
});

test('multiple choice with notebook keyboard keeps all four answers reachable',async({page})=>{
  await start(page);await open(page,'RP-M6-TI-006');
  const options=await page.locator('[data-choice]').allTextContents();
  for(const stage of ['question','minnie','moose','explanation']){
    if(stage!=='question')await wrong(page);
    await page.getByRole('button',{name:'Kladblok',exact:true}).click();
    await page.getByRole('textbox',{name:'Eigen kladwerk'}).fill('Mijn berekening');
    await page.evaluate(()=>{
      Object.defineProperty(window.visualViewport,'height',{configurable:true,value:Math.min(Math.floor(innerHeight/2),405)});
      Object.defineProperty(window.visualViewport,'offsetTop',{configurable:true,value:0});
      window.eval('updateKeyboardViewportState')();
    });
    await geometry(page);
    expect(await page.locator('[data-choice]').allTextContents()).toEqual(options);
    expect((await page.locator('.challengeWorkspace').boundingBox()).height).toBeLessThanOrEqual(405);
    if(stage!=='question'){
      await page.locator('[data-action="scratchpad-close"]').click();
      await expect(page.locator('.integratedChallengeHelp')).toHaveAttribute('data-help-stage',stage);
      await geometry(page);
    }
  }
  await page.screenshot({path:`${evidence}/${test.info().project.name}-TI-006-keyboard-choices.png`});
});


test('notebook uses a local handwriting font, equal paper and aligned fixed controls',async({page})=>{
  await start(page);await open(page,'RP-M6-OP-006');await wrong(page);
  const paper=page.locator('.notebookPaper'),toggle=page.locator('.notebookToolbar .scratchpadToggle');
  const font=await page.evaluate(async()=>(await document.fonts.load('22px "Atlas Notebook"')).map(f=>f.status));
  expect(font).toEqual(['loaded']);await geometry(page);
  const decoration=await page.locator('.notebookBindings').evaluate(async e=>{
    const image=new Image();image.src=getComputedStyle(e).backgroundImage.slice(5,-2);await image.decode();
    const mark=getComputedStyle(document.querySelector('.workspaceMain'),'::before');
    const logo=new Image();logo.src=mark.backgroundImage.slice(5,-2);await logo.decode();
    const paperStyle=getComputedStyle(document.querySelector('.notebookPaper'));
    const materialStyle=getComputedStyle(document.querySelector('.notebookMaterial'));
    const paper=new Image();paper.src=materialStyle.backgroundImage.match(/url\("([^"]+)"\)/)[1];await paper.decode();
    return {ringWidth:image.naturalWidth,ringHeight:image.naturalHeight,paperLoaded:paper.naturalWidth>0,attachment:paperStyle.backgroundAttachment,logoLoaded:logo.naturalWidth>0,opacity:parseFloat(mark.opacity),pointer:mark.pointerEvents};
  });
  expect(decoration).toEqual({ringWidth:40,ringHeight:40,paperLoaded:true,attachment:'local, local',logoLoaded:true,opacity:.045,pointer:'none'});
  await expect(paper).toHaveCSS('font-family',/Atlas Notebook/);
  await expect(page.getByText('Jouw kladwerk blijft bewaard',{exact:true})).toHaveCount(0);
  const bounds=await paper.boundingBox(),control=await toggle.boundingBox();
  await page.screenshot({path:evidence+'/'+test.info().project.name+'-polished-minnie.png'});
  await toggle.click();await geometry(page);
  expect(await paper.boundingBox()).toEqual(bounds);
  expect(await toggle.boundingBox()).toEqual(control);
  const clear=page.getByRole('button',{name:'Wis kladwerk',exact:true}),clearBox=await clear.boundingBox();
  expect(clearBox.y).toBe((await page.locator('.challengeScratchpad header').boundingBox()).y);
  expect(clearBox.y+clearBox.height).toBeLessThan(bounds.y);expect(clearBox.height).toBe(control.height);
  expect(clearBox.x+clearBox.width).toBeCloseTo(bounds.x+bounds.width,0);
  await expect(clear.locator('svg')).toHaveCount(1);await expect(clear).toHaveText('');
  await page.getByRole('textbox',{name:'Eigen kladwerk'}).fill('756 = 700 + 50 + 6');
  await clear.click();expect(await paper.boundingBox()).toEqual(bounds);
  await expect(page.getByRole('button',{name:'Annuleren',exact:true})).toBeInViewport({ratio:1});
  await page.getByRole('button',{name:'Annuleren',exact:true}).click();
  await page.screenshot({path:evidence+'/'+test.info().project.name+'-polished-notes.png'});
  await toggle.click();await wrong(page);await wrong(page);await geometry(page);
  const fullPaper=await paper.boundingBox(),fullControl=await toggle.boundingBox();
  await toggle.click();await geometry(page);
  expect(await paper.boundingBox()).toEqual(fullPaper);expect(await toggle.boundingBox()).toEqual(fullControl);
});

async function notebookSurface(page){return page.locator('.notebookPaper').evaluate(paper=>{
  const face=paper.closest('.integratedChallengeHelp, .challengeScratchpad');
  const material=face.querySelector('.notebookMaterial'),rings=face.querySelector('.notebookBindings');
  const translate=e=>new DOMMatrixReadOnly(getComputedStyle(e).transform).m42;
  return {scroll:paper.scrollTop,height:paper.scrollHeight,viewport:paper.clientHeight,
    materialHeight:material.getBoundingClientRect().height,materialScroll:translate(material),ringScroll:translate(rings),
    ringCount:rings.clientHeight/40,ringRepeat:getComputedStyle(rings).backgroundRepeat,
    long:face.classList.contains('notebookLongPaper'),repeat:getComputedStyle(material).borderImageRepeat,
    cap:parseFloat(getComputedStyle(material).borderTopWidth),width:paper.clientWidth};
});}

test('long notebook help scrolls texture and ring pairs with the text',async({page})=>{
  await start(page);await open(page,'RP-M6-OP-006');await wrong(page);
  await page.evaluate(()=>document.fonts.ready);
  const short=await notebookSurface(page);expect(short.long).toBe(false);
  await wrong(page);await wrong(page);await geometry(page);
  const before=await snapshot(page),paper=page.locator('.notebookPaper');
  const long=await notebookSurface(page);
  expect(long.long).toBe(true);expect(long.ringCount).toBeGreaterThan(short.ringCount);
  expect(long.repeat).toBe('stretch round');expect(long.ringRepeat).toBe('repeat-y');
  // The texture's worn corners keep their scale rather than stretching vertically.
  expect(long.cap).toBeCloseTo(long.width*110/1536,0);
  await paper.focus();await paper.press('PageDown');
  await expect.poll(async()=>(await notebookSurface(page)).scroll).toBeGreaterThan(0);
  for(const [label,fraction] of [['top',0],['middle',.5],['bottom',1]]){
    await paper.evaluate((e,p)=>e.scrollTop=(e.scrollHeight-e.clientHeight)*p,fraction);
    await expect.poll(async()=>{
      const s=await notebookSurface(page);return Math.abs(s.materialScroll+s.scroll)+Math.abs(s.ringScroll+s.scroll);
    }).toBeLessThan(.1);
    const s=await notebookSurface(page);
    expect(s.materialHeight).toBe(s.height);expect(s.ringCount).toBe(long.ringCount);
    await geometry(page);
    await page.locator('.challengeNotebook').screenshot({path:`${evidence}/${test.info().project.name}-scrolling-paper-${label}.png`});
  }
  await expect(page.locator('.explanationStepText').last()).toBeInViewport({ratio:1});
  expect(await snapshot(page)).toEqual(before);
});

test('native notes grow and shrink the same scrollable sheet without extra learning events',async({page})=>{
  await start(page);await open(page,'RP-M6-OP-003');await wrong(page);
  const before=await snapshot(page);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  const notes=page.getByRole('textbox',{name:'Eigen kladwerk'});
  await page.evaluate(()=>document.fonts.ready);
  await geometry(page);
  const bounds=await notes.boundingBox(),blank=await notebookSurface(page);
  const text=Array.from({length:70},(_,i)=>'regel '+(i+1)).join('\n');
  await notes.fill(text);
  const written=await notebookSurface(page);
  expect(written.long).toBe(true);expect(written.ringCount).toBeGreaterThan(blank.ringCount);
  expect(written.materialHeight).toBe(written.height);expect(written.ringCount%1).toBe(0);
  await notes.evaluate(e=>e.scrollTop=e.scrollHeight);
  await expect.poll(async()=>{
    const s=await notebookSurface(page);return Math.abs(s.materialScroll+s.scroll)+Math.abs(s.ringScroll+s.scroll);
  }).toBeLessThan(.1);
  await geometry(page);expect(await notes.boundingBox()).toEqual(bounds);
  await page.locator('.challengeNotebook').screenshot({path:`${evidence}/${test.info().project.name}-scrolling-notes-bottom.png`});
  // Native deletion must shorten the material as well as the ring strip.
  await notes.fill('12 + 3');
  await expect.poll(async()=>(await notebookSurface(page)).height).toBe(blank.height);
  expect((await notebookSurface(page)).ringCount).toBe(blank.ringCount);
  await reopen(page);await expect(notes).toHaveValue('12 + 3');
  await page.getByRole('button',{name:'Terug naar tip',exact:true}).click();
  expect((await notebookSurface(page)).long).toBe(false);
  const after=await snapshot(page);expect(after.record).toEqual(before.record);expect(after.draws).toEqual(before.draws);
});

test('tap any blank notebook rule, type at its left edge and retain native editing',async({page,isMobile})=>{
  await start(page);await open(page,'RP-M6-OP-003');await wrong(page);
  const before=await snapshot(page);
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  const notes=page.getByRole('textbox',{name:'Eigen kladwerk'});
  await page.evaluate(()=>document.fonts.ready);
  const tapRow=async row=>{
    const position=await notes.evaluate((e,row)=>{const s=getComputedStyle(e);return{x:e.clientWidth-25,y:parseFloat(s.paddingTop)+parseFloat(s.lineHeight)*(row+.5)+parseFloat(s.borderTopWidth)-e.scrollTop};},row);
    if(isMobile)await notes.tap({position});else await notes.click({position});
  };
  await tapRow(3);await page.keyboard.insertText('368 + 200 = 568');
  await expect(notes).toHaveValue('\n\n\n368 + 200 = 568');
  await tapRow(1);await page.keyboard.insertText('247 = 200 + 40 + 7');
  await expect(notes).toHaveValue('\n247 = 200 + 40 + 7\n\n368 + 200 = 568');
  await reopen(page);
  await page.locator('[data-action="scratchpad-close"]').click();
  await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  await expect(notes).toHaveValue('\n247 = 200 + 40 + 7\n\n368 + 200 = 568');
  const after=await snapshot(page);expect(after.record).toEqual(before.record);expect(after.draws).toEqual(before.draws);
  // Native multiline paste and selection remain available in the textarea.
  await notes.fill('Eerste regel\nTweede regel');await notes.press('ControlOrMeta+A');await page.keyboard.insertText('Nieuwe eerste regel\nNieuwe tweede regel');
  await expect(notes).toHaveValue('Nieuwe eerste regel\nNieuwe tweede regel');
  await notes.fill('');await tapRow(4);await page.keyboard.insertText('5 + 5 = 10');
  await page.screenshot({path:evidence+'/'+test.info().project.name+'-selected-rule.png'});
  await expect(notes).toHaveValue('\n\n\n\n5 + 5 = 10');await geometry(page);
});

test('blank rule selection accounts for soft wrapping and scrolling without adding lines on drag',async({page})=>{
  await start(page);await open(page,'RP-M6-OP-003');await page.getByRole('button',{name:'Kladblok',exact:true}).click();
  const notes=page.getByRole('textbox',{name:'Eigen kladwerk'});await page.evaluate(()=>document.fonts.ready);
  // A known unbroken line wraps into two rows: count its width with the loaded font.
  const text=await notes.evaluate(e=>{const s=getComputedStyle(e),canvas=document.createElement('canvas'),c=canvas.getContext('2d');c.font=s.font;const width=e.clientWidth-parseFloat(s.paddingLeft)-parseFloat(s.paddingRight);return '8'.repeat(Math.floor(width/c.measureText('8').width)+3);});
  await notes.fill(text);
  const point=await notes.evaluate(e=>{const s=getComputedStyle(e);return{x:50,y:parseFloat(s.paddingTop)+parseFloat(s.lineHeight)*3.5+1};});
  await notes.click({position:point});await page.keyboard.insertText('Links');
  await expect(notes).toHaveValue(text+'\n\nLinks');
  await notes.fill(Array.from({length:24},(_,i)=>'regel '+(i+1)).join('\n')+'\n\n');
  await notes.evaluate(e=>e.scrollTop=e.scrollHeight);
  const content=await notes.inputValue();
  // A scroll/swipe gesture must not add blank rows or edit the private notes.
  const box=await notes.boundingBox();await page.mouse.move(box.x+50,box.y+box.height-30);await page.mouse.down();await page.mouse.move(box.x+50,box.y+30,{steps:5});await page.mouse.up();
  await expect(notes).toHaveValue(content);
  await notes.evaluate(e=>e.scrollTop=e.scrollHeight);
  const scrollPoint=await notes.evaluate(e=>{const s=getComputedStyle(e);return{x:60,y:parseFloat(s.paddingTop)+parseFloat(s.lineHeight)*25.5+1-e.scrollTop};});
  await notes.click({position:scrollPoint});await page.keyboard.insertText('Onderaan');
  await expect(notes).toHaveValue(content+'Onderaan');
});

for(const npc of [false,true])test('E5 '+(npc?'NPC':'standard')+' multiple choice has equal turquoise 2x2 buttons',async({page})=>{
  await start(page);
  await page.evaluate(async npc=>{
    await window.eval('selectLevel')('LVL-0001',{startImmediately:true});const l=window.eval('level'),s=window.eval('state');
    const c=l.learningChallenges.find(c=>c.id===(npc?'wind':'zon'));
    const question=c.questions.flatMap(q=>q.variants).find(q=>q.choices?.length===4&&(!q.learningLevel||q.learningLevel==='E5'));
    if(!question)throw Error('No authored E5 multiple choice fixture');
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank([])};c.questions=[{id:c.questions[0].id,variants:[question]}];s.completedRunes=new Set(window.eval('activeRunes')().filter(r=>r.id!==c.id).map(r=>r.id));window.eval('openRuneChallenge')(c.id);
  },npc);
  const choices=page.locator('.workspaceAnswerZone [data-choice]'),order=await choices.allTextContents();
  for(let i=0;i<3;i++){
    const rects=await choices.evaluateAll(nodes=>nodes.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height};}));
    expect(rects).toHaveLength(4);expect(rects[0].y).toBe(rects[1].y);expect(rects[2].y).toBe(rects[3].y);
    expect(rects[0].x).toBe(rects[2].x);expect(rects[1].x).toBe(rects[3].x);expect(rects[2].y).toBeGreaterThan(rects[0].y);
    for(const r of rects){expect(r.w).toBe(rects[0].w);expect(r.h).toBe(rects[0].h);}
    const colors=await choices.first().evaluate(e=>({background:getComputedStyle(e).backgroundImage,color:getComputedStyle(e).color}));
    expect(colors.background).toContain('radial-gradient');expect(colors.color).toBe('rgb(234, 255, 251)');
    await geometry(page);await reopen(page);expect(await choices.allTextContents()).toEqual(order);
    if(i<2)await wrong(page);
  }
  await page.screenshot({path:evidence+'/'+test.info().project.name+'-e5-2x2-'+npc+'.png'});
});
