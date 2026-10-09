const {test,expect}=require('@playwright/test');
const fs=require('fs'), vm=require('vm'), crypto=require('crypto');
const {readApproved,validatePilot,expectedIds}=require('../scripts/runenpoort-m6-content.cjs');
const support=require('../src/challenge-support');
const learning=require('../src/learning-levels');
const hints=require('../src/challenge-hints');
const entries=readApproved();
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
const load=id=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(`Levels/${id}/level.js`,'utf8'),c);return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));};
const levels=[1,2,3].map(n=>load(`LVL-000${n}`));
const q=id=>entries.find(e=>e.question.id===`RP-M6-${id}`).question;
const cleanText=text=>text.replaceAll('**','');
const moneyParts=cents=>({euros:String(Math.floor(cents/100)),cents:String(cents%100).padStart(2,'0')});
const correctAnswer=question=>support.usesStructuredMoney(question)?moneyParts(question.answer):question.answerSpec.allowedForms?.[0]||question.answer;
const recordedRaw=value=>typeof value==='object'?`${value.euros}|${value.cents}`:value;

test('exact approved 24 IDs, copy, support, stage instructions, central migration and fixed answers validate',()=>{
  const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file,'utf8').replaceAll('\r\n','\n')).digest('hex');
  expect(hash('scripts/content/runenpoort-m6-approved.md')).toBe('dc024812603e912be15dee1f1e18f0bacf6da5b33cdf0eafffa0768a9c18d666');
  expect(hash('scripts/content/runenpoort-m6-visuals.json')).toBe('babe2dfe0f9d8534cf655ea3477ecf7be95379167a19c18a75cad8f6c16c3ada');
  expect(entries.map(e=>e.question.id)).toEqual(expectedIds);
  expect(validatePilot(levels)).toEqual([]);
  expect(new Set(entries.map(e=>e.levelId+':'+e.slotId)).size).toBe(20);
  const answers=[6,5,15,12,21,25,370,570,615,643,2113,3443,50,80,325,760,175,555,4,180,'7 minuten 10 seconden',320,'15:15','14:45'];
  expect(entries.map(e=>e.question.answer)).toEqual(answers);
  for(const {levelId,question} of entries){
    expect(support.validate(question),question.id).toEqual([]);
    const replacement=require('../scripts/content/atlas-time-recalibration.cjs').visuals[question.id];
    if(replacement)expect(question.visual).toEqual(replacement);
    else expect(Object.keys(question.visual.instructions)).toEqual(support.STAGES);
    for(const stage of ['minnie','moose'])expect(hints.resolve(levelId,question,stage)).toBe(question[stage==='minnie'?'hintMinnie':'hintMoose']);
    if(support.usesStructuredMoney(question))expect(support.parseAnswer(question,correctAnswer(question))).toMatchObject({valid:true,correct:true});
    else for(const form of question.answerSpec.allowedForms||[question.answer])expect(support.parseAnswer(question,form)).toMatchObject({valid:true,correct:true});
  }
  // Independent mathematical checks of the fixed, authored arithmetic.
  expect([12/2,20/4,20/4*3,18/3*2,35-35/5*2,40-40/8*3]).toEqual(answers.slice(0,6));
  expect([240+130,320+250,368+247,475+168,1475+638,2687+756]).toEqual(answers.slice(6,12));
  expect([200-150,400-320,1000-675,2000-1240,1000-475-350,2000-680-765]).toEqual(answers.slice(12,18));
  expect([240/60,3*60,`${Math.floor(430/60)} minuten ${430%60} seconden`,5*60+20]).toEqual(answers.slice(18,22));
});

test('all 816 E5 hint pairs remain exact, all 24 M6 variants are selectable in the central bank',()=>{
  const baseline=require('./fixtures/learning-levels-baseline.json');
  let total=0;
  for(const [id,pairs] of Object.entries(baseline.hintPairs)){
    const variants=load(id).learningChallenges.filter(c=>c.active!==false).flatMap(c=>c.questions.flatMap(s=>s.variants)).filter(v=>v.learningLevel!=='M6');
    expect(variants.map(v=>[v.id,hints.resolve(id,v,'minnie'),hints.resolve(id,v,'moose')])).toEqual(pairs);
    total+=variants.length;
  }
  expect(total).toBe(816);
  const {bank,records}=require('../src/content/m6'),local=levels[0].learningChallenges[0].questions[0].variants,picked=new Set();
  for(const domain of ['generic','time'])for(const [difficulty,draw] of [[1,0],[2,.6],[3,.9]]){
    const planner=learning.createPlanner(100,()=>0),history=require('../src/m6-bank').createHistory({getItem:()=>null,setItem(){}});
    planner.nextDifficulty=()=>difficulty;
    const count=records.filter(r=>r.difficulty===difficulty&&(r.educationalDomain==='time')===(domain==='time')).length;
    const position=domain==='time'?[{id:'clock',family:'clock_reading'}]:local;
    for(let n=0;n<count;n++)picked.add(learning.selectPosition(position,planner,bank,{random:()=>draw,history}).variant.id);
  }
  for(const e of entries)expect(picked.has(e.question.id),e.question.id).toBe(true);
  expect(picked.size).toBe(records.length);
});

test('validator rejects missing IDs, duplicates, changed educational content and premature disclosure',()=>{
  for(const mutation of [
    l=>l[0].learningChallenges[0].questions[0].variants.push(q('OP-001')),
  ]) {const copy=structuredClone(levels);mutation(copy);expect(validatePilot(copy).length).toBeGreaterThan(0);}
  for(const field of ['reportLabel','answerSpec','hintMoose','contentVersion']){const question=structuredClone(q('GE-005'));delete question[field];expect(support.validate(question).length).toBeGreaterThan(0);}
  for(const difficulty of [0,4,'2'])expect(support.validate({...q('BR-001'),difficulty}).length).toBeGreaterThan(0);
});

test('difficulty policy boundaries, nearest fallback, easier tie and no level debt',()=>{
  expect(learning.difficultyPolicy(100)).toEqual({1:50,2:35,3:15});
  const cycle=learning.createPlanner(100,()=>0),draws=Array.from({length:20},()=>cycle.nextDifficulty());
  expect([1,2,3].map(d=>draws.filter(x=>x===d).length)).toEqual([10,7,3]);
  const p=learning.createPlanner(100,()=>0);
  const variants=[{id:'one',learningLevel:'M6',difficulty:1},{id:'three',learningLevel:'M6',difficulty:3}];
  p.nextDifficulty=()=>2;
  expect(learning.selectVariant(variants,p,()=>.6)).toMatchObject({requestedDifficulty:2,deliveredDifficulty:1,difficultyFallback:true});
  p.nextDifficulty=()=>1;
  expect(learning.selectVariant([variants[1]],p,()=>.1)).toMatchObject({requestedDifficulty:1,deliveredDifficulty:3});
  p.nextDifficulty=()=>3;
  expect(learning.selectVariant([{id:'e5'}],p,()=>.99)).toMatchObject({requested:'M6',delivered:'E5',requestedDifficulty:3,deliveredDifficulty:null,fallback:true});
  expect(p.selections).toBe(3);
  const mix=learning.createPlanner(10,()=>0);
  expect(Array.from({length:40},()=>learning.selectVariant([{id:'e5'}],mix,()=>0)).filter(s=>s.requested==='M6')).toHaveLength(4);
  const alternatives=[{...variants[0],id:'a'},{...variants[0],id:'b'}];
  expect(Array.from({length:4},()=>learning.selectVariant(alternatives,p,()=>0,'same-slot').variant.id)).toEqual(['a','b','a','b']);
});

test('structured euro input retains evidence, rejects malformed fields, and never guesses cents',()=>{
  for(const [euros,cents,amount,display] of [['','50',50,'€0,50'],['0','50',50,'€0,50'],['3','25',325,'€3,25'],['7','60',760,'€7,60'],['5','5',505,'€5,05'],['5','',500,'€5,00'],['5','0',500,'€5,00'],['5','00',500,'€5,00'],['50','',5000,'€50,00'],['00','05',5,'€0,05']]){
    expect(support.parseAnswer(q('GE-001'),{euros,cents})).toEqual({raw:`${euros}|${cents}`,rawFields:{euros,cents},interpreted:amount,normalizedDisplay:display,unit:'cents',valid:true,correct:amount===50});
  }
  for(const raw of [{euros:'',cents:''},{euros:'x',cents:'50'},{euros:'1e2',cents:''},{euros:'-1',cents:''},{euros:'0',cents:'500'},{euros:'3,25',cents:''},{euros:'3.25',cents:''},{euros:' ',cents:'50'},{euros:5,cents:'05'},{euros:null,cents:'50'},{euros:'5'},[],{euros:'9007199254740991',cents:'99'},'0,50',null])expect(support.parseAnswer(q('GE-001'),raw),JSON.stringify(raw)).toMatchObject({valid:false,correct:false,interpreted:null,normalizedDisplay:null});
  // Other opt-in euro contracts and legacy questions keep their existing text grading.
  expect(support.parseAnswer({...q('GE-001'),learningLevel:'E5'},' 0,50 ')).toEqual({raw:' 0,50 ',interpreted:50,unit:'cents',valid:true,correct:true});
  for(const text of ['','€0,50','0,500','0 50','1.000,50','1e2','NaN','-0,50','0, 50'])expect(support.parseAnswer({...q('GE-001'),learningLevel:'E5'},text)).toMatchObject({valid:false,correct:false});
  for(const text of ['2113','2.113','2 113'])expect(support.parseAnswer(q('OP-005'),text).correct).toBe(true);
  expect(support.parseAnswer(q('OP-005'),'2.114')).toMatchObject({valid:true,correct:false,interpreted:2114});
  for(const text of ['2,113','2.113','2 113'])expect(support.parseAnswer(q('OP-001'),text).valid).toBe(false);
  expect(support.parseAnswer({answer:50,family:'money'},'0,50')).toBeNull();
});

test('visual frames expose only the authored stage, including fraction symbols and price totals',()=>{
  const forbidden={BR:['6 onderdelen','5 onderdelen','15 onderdelen','12 meter','21 kratten','25 houtblokken'],OP:['370','570','615','643','2.113','3.443'],GE:['€0,50','€0,80','€3,25','€7,60','€1,75','€5,55'],TI:['4 minuten','180 seconden','7 minuten en 10 seconden','320 seconden','15:15','14:45']};
  for(const {question} of entries){
    const [, ,group,num]=question.id.split('-');
    for(const stage of ['question','minnie','moose'])expect(support.renderVisual(question.visual,stage),`${question.id}/${stage}`).not.toContain(forbidden[group][Number(num)-1]);
    expect(support.renderVisual(question.visual,'explanation')).toContain(forbidden[group][Number(num)-1]);
  }
  expect(q('BR-001').visual.stages.moose.segments.map(s=>s.symbols)).toEqual([5,5]);
  expect(q('BR-001').visual.stages.moose.outsideSymbols).toBe(2);
  for(const id of ['GE-005','GE-006'])for(const stage of ['question','minnie'])expect(support.renderVisual(q(id).visual,stage)).not.toMatch(/€8,25|€14,45/);
  expect(q('TI-006').visual.stages.moose).toMatchObject({direction:'backward',nodes:['?','15:00','16:00','16:20']});
  expect(q('TI-005').choices).toEqual(['14:25','15:05','15:15','15:25']);
  expect(q('TI-006').choices).toEqual(['14:45','14:55','15:05','15:45']);
});

async function menu(page){
  await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
  await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','100'));
  await page.goto(base+'/?atlasSessionTest=1');
  await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
}
async function pick(page,id){
  const entry=entries.find(e=>e.question.id===id);
  await page.evaluate(async entry=>{
    const call=n=>window.eval(n);
    if(call('level')?.id!==entry.levelId)await call('selectLevel')(entry.levelId,{startImmediately:true});
    const l=call('level'),s=call('state');
    s.suspendedLearningChallenges={};s.completedRunes=new Set(call('activeRunes')().filter(r=>r.id!==entry.challengeId).map(r=>r.id));
    const challenge=l.learningChallenges.find(c=>c.id===entry.challengeId);
    const index=challenge.questions.findIndex(slot=>slot.id===entry.slotId);
    window.AtlasM6Content={...window.AtlasM6Content,bank:window.AtlasM6Bank.createBank(window.AtlasM6Content.records.filter(r=>r.id===entry.question.id))};
    call('openRuneChallenge')(entry.challengeId);
    s.questionIndex=index;s.questionSupportStage='question';s.challengeFailureCounts[entry.challengeId]=0;
    const report=window.AtlasSessionReport;report.discard();
    report.startOrVisitLevel({adventureId:'LVL-0001',adventureTitle:'De Runenpoort',levelId:l.id,levelTitle:l.title,m6Percentage:100});
    call('trackCurrentSessionQuestion')();call('render')();
  },entry);
  await expect(page.locator('[data-gpu-preparation]')).toHaveCount(0);
}


async function currentReport(page) {
  return page.evaluate(()=>{
    const report=window.AtlasSessionReport.getCurrent();
    return report.questions.find(q=>q.key===report.currentQuestionKey);
  });
}
async function answer(page,value) { await page.evaluate(value=>window.eval('answerQuestion')(value),value); }
function wrongAnswer(question) { return support.usesStructuredMoney(question)?{euros:'50',cents:''}:question.choices?.find(c=>c!==question.answer)||'9999'; }
async function fillAnswer(page,value) {
  if(typeof value==='object'){
    await page.locator('[data-money-part="euros"]').fill(value.euros);
    await page.locator('[data-money-part="cents"]').fill(value.cents);
  }else await page.locator('[data-open-answer]').fill(value);
}
async function assertStage(page,question,stage) {
  await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
  await expect(page.locator('[data-action="explain-question"], .authoredHint, .npcRetryHint, [data-adventure-team-bar]')).toHaveCount(0);
  const empty=question.visual.type==='calculationSteps'&&!question.visual.stages[stage].groups.length;
  if(empty)await expect(page.locator('[data-learning-visual]')).toHaveCount(0);
  else for(const visual of await page.locator('[data-learning-visual]').all())await expect(visual).toHaveAttribute('data-support-stage',stage);
  if(stage==='explanation'){
    expect(await page.locator('.explanationStepText').allTextContents()).toEqual(question.authoredSupport.explanationSteps.map(cleanText));
    await expect(page.getByRole('heading',{name:'Moose legt het uit',exact:true})).toHaveCount(1);
    await expect(page.locator('[data-help-speaker]')).toHaveAttribute('data-help-speaker','moose');
    const portrait=await page.evaluate(()=>window.eval('readyAssetSrc')(window.eval('guideEntries')().find(([id])=>id==='moose')[1].portrait));
    await expect(page.locator('.integratedHelpHeader .challengeCharacterPortrait')).toHaveAttribute('alt','Moose');
    await expect(page.locator('.integratedHelpHeader .challengeCharacterPortrait')).toHaveAttribute('src',portrait);
    await expect(page.locator('.instructionalChallengeBox')).not.toContainText(question.hintMoose);
    await expect(page.locator('.instructionalChallengeBox .sum')).toHaveText(question.prompt);
    const title=await page.evaluate(()=>window.eval('runeById')(window.eval('state').activeRuneId).name);
    await expect(page.locator('#challenge-title')).toHaveText(title);
    expect(await page.locator('.workspaceContent > [data-learning-visual]').count()).toBe(0);
    const layer=await page.locator('.m6WorkspaceLayer').boundingBox();
    expect(layer.y+layer.height).toBeGreaterThan((await page.evaluate(()=>innerHeight))-40);
  } else await expect(page.locator('.authoredExplanation')).toHaveCount(0);
  if(['minnie','moose'].includes(stage)){
    const help=page.locator('[data-help-speaker]');
    await expect(help).toHaveCount(1);
    await expect(help).toHaveAttribute('data-help-speaker',stage);
    await expect(help.locator('h3')).toHaveText(stage==='minnie'?'Minnie':'Moose');
    await expect(help.locator('.integratedHintText')).toHaveText(cleanText(question[stage==='minnie'?'hintMinnie':'hintMoose']));
  }
  if(stage==='question')await expect(page.locator('.challengeNotebook')).toHaveCount(0);
  else {
    await expect(page.locator('.challengeNotebook')).toHaveAttribute('data-notebook-mode','help');
    await expect(page.locator('.notebookPaper')).toHaveCSS('overflow-y','auto');
    await expect(page.locator('.notebookPaper .integratedHintText, .notebookPaper .authoredExplanation')).toHaveCount(1);
    const context=await page.locator('.compactChallengeHeader .challengePortraitFrame').boundingBox();
    const guide=await page.locator('.integratedHelpHeader .challengePortraitFrame').boundingBox();
    expect({width:guide.width,height:guide.height}).toEqual({width:context.width,height:context.height});
  }
  await assertWorkspaceLayout(page);
}
async function assertWorkspaceLayout(page,viewportHeight) {
  let bounds;
  await expect.poll(async()=>{
    bounds=await page.evaluate(()=>{
      const card=document.querySelector('.challengeWorkspace'),zone=card.querySelector('.workspaceAnswerZone');
      const b=card.getBoundingClientRect(),a=zone.getBoundingClientRect();
      const hit=document.elementFromPoint(a.left+a.width/2,a.top+a.height/2);
      return {top:b.top,bottom:b.bottom,answerTop:a.top,answerBottom:a.bottom,height:innerHeight,visible:zone.contains(hit),overflow:card.scrollWidth-card.clientWidth};
    });return bounds.visible;
  }).toBe(true);
  expect(bounds.top).toBeGreaterThanOrEqual(0);
  expect(bounds.answerTop).toBeGreaterThanOrEqual(bounds.top);
  expect(bounds.answerBottom).toBeLessThanOrEqual(bounds.bottom);
  expect(bounds.bottom).toBeLessThanOrEqual(viewportHeight||bounds.height);
  expect(bounds.overflow).toBeLessThanOrEqual(1);
}
async function reopenWithoutChanges(page) {
  const result=await page.evaluate(()=>{
    const call=n=>window.eval(n),s=call('state'),question=call('currentChallengeQuestions')()[s.questionIndex];
    const before={failures:s.challengeFailureCounts[s.activeRuneId],attempts:s.attempts,stage:s.questionSupportStage,moneyDraft:s.moneyAnswerDraft,answerDraft:s.answerDraft,scratchpad:s.scratchpad,draws:call('learningPlanner').selections,choices:JSON.stringify(question.choices),history:JSON.stringify(window.AtlasSessionReport.getCurrent().questions)};
    const id=s.activeRuneId;call('closeChallenge')();call('openRuneChallenge')(id);
    return {same:call('currentChallengeQuestions')()[s.questionIndex]===question,before,after:{failures:s.challengeFailureCounts[id],attempts:s.attempts,stage:s.questionSupportStage,moneyDraft:s.moneyAnswerDraft,answerDraft:s.answerDraft,scratchpad:s.scratchpad,draws:call('learningPlanner').selections,choices:JSON.stringify(question.choices),history:JSON.stringify(window.AtlasSessionReport.getCurrent().questions)}};
  });
  expect(result.same).toBe(true);expect(result.after).toEqual(result.before);
}

test('direct explanation gameplay handler and action are removed, not hidden',()=>{
  const app=fs.readFileSync('src/app.js','utf8');
  expect(app).not.toContain('explainCurrentQuestion');
  expect(app).not.toContain('explain-question');
});

for(const {question} of entries)test(question.id+': automatic help, integrated hints, stable choices, reopen and all completion outcomes',async({page})=>{
  await menu(page);
  for(let wrongs=0;wrongs<=3;wrongs++){
    await pick(page,question.id);
    await assertStage(page,question,'question');
    const initialChoices=await page.locator('[data-choice]').allTextContents();
    const identity=await page.locator('[data-challenge-character]').getAttribute('data-challenge-character');
    await reopenWithoutChanges(page);
    const wrong=wrongAnswer(question);
    for(let index=0;index<wrongs;index++){
      const stage=['minnie','moose','explanation'][index];
      await answer(page,wrong);
      await assertStage(page,question,stage);
      await expect(page.locator('#app')).toHaveAttribute('data-screen','challenge');
      expect(await page.locator('[data-choice]').allTextContents()).toEqual(initialChoices);
      await expect(page.locator('[data-challenge-character]')).toHaveAttribute('data-challenge-character',identity);
      expect(await page.evaluate(()=>window.eval('getChallengeCharacter')().id)).toBe(identity);
      const pending=await currentReport(page);
      expect(pending).toMatchObject({variantId:question.id,attempts:index+1,outcome:'incomplete',completedAt:null,explanationShown:index===2});
      expect(pending.helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation'].slice(0,index+1));
      if(index<2)expect(pending.helpHistory.at(-1).text).toBe(question[index===0?'hintMinnie':'hintMoose']);
      else expect(pending.helpHistory.at(-1)).toMatchObject({source:'automatic',steps:question.authoredSupport.explanationSteps});
      await reopenWithoutChanges(page);
      await assertStage(page,question,stage);
      expect(await page.locator('[data-choice]').allTextContents()).toEqual(initialChoices);
    }
    const correct=correctAnswer(question);
    await answer(page,correct);
    await expect(page.locator('#app')).toHaveAttribute('data-screen','correct');
    await expect(page.locator('.authoredExplanation')).toHaveCount(0);
    const result=await currentReport(page);
    expect(result).toMatchObject({variantId:question.id,contentVersion:'0.1',deliveredLearningLevel:'M6',deliveredDifficulty:question.difficulty,outcome:['direct','afterMinnie','afterMoose','afterExplanation'][wrongs],explanationShown:wrongs===3,attempts:wrongs+1,firstTryCorrect:wrongs===0,correctAnswerDisplay:question.answerDisplay});
    expect(result.answerHistory.map(a=>a.raw)).toEqual([...Array(wrongs).fill(wrong),correct].map(recordedRaw));
    expect(result.helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation'].slice(0,wrongs));
    // Every non-final slot, including Freya, restores its original presenter on the next question.
    if(wrongs===3 && await page.evaluate(()=>window.eval('state').questionIndex<window.eval('currentChallengeQuestions')().length-1)){
      await page.evaluate(()=>window.eval('nextQuestion')());
      expect(await page.evaluate(()=>window.eval('state').guideMessage.text)).toBe('');
      if(await page.locator('[data-adventure-team-bar]').count())await expect(page.locator('[data-adventure-team-bar] .teamMessage')).toHaveText('');
      await expect(page.locator('.authoredExplanation')).toHaveCount(0);
      await expect(page.locator('[data-challenge-character]')).toHaveAttribute('data-challenge-character',identity);
      await expect(page.locator('.instructionalExplanationLayer')).toHaveCount(0);
      for(const field of await page.locator('[data-money-part]').all())await expect(field).toHaveValue('');
    }
  }
});


for(const priorErrors of [0,1,2])test('invalid euro input at '+['question','Minnie','Moose'][priorErrors]+' does not advance automatic help',async({page})=>{
  await menu(page);await pick(page,'RP-M6-GE-001');
  for(let i=0;i<priorErrors;i++)await answer(page,{euros:'50',cents:''});
  for(const invalid of [{euros:'',cents:''},{euros:'nope',cents:''},{euros:'€0,50',cents:''},{euros:'0',cents:'500'}]){
    // A browser/runtime value bypassing numeric controls still goes through the real form handler.
    await page.locator('[data-money-input]').evaluate((control,value)=>{
      for(const part of ['euros','cents'])control.querySelector(`[data-money-part="${part}"]`).value=value[part];
    },invalid);
    await page.getByRole('button',{name:'Controleer',exact:true}).click();
    await expect(page.locator('.inputFeedback')).toBeInViewport();
    expect(await currentReport(page)).toMatchObject({attempts:priorErrors,outcome:'incomplete',explanationShown:false});
    expect((await currentReport(page)).answerHistory.at(-1)).toMatchObject({rawFields:invalid,valid:false,interpreted:null});
    await assertStage(page,q('GE-001'),['question','minnie','moose'][priorErrors]);
  }
  // These are valid wrong euro amounts. Invalid formats above never move the threshold.
  for(let i=priorErrors;i<3;i++)await answer(page,{euros:'50',cents:''});
  await assertStage(page,q('GE-001'),'explanation');
  await reopenWithoutChanges(page);
  await answer(page,{euros:'50',cents:''});
  expect((await currentReport(page)).helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation']);
  await fillAnswer(page,{euros:'',cents:'50'});await page.getByRole('button',{name:'Controleer',exact:true}).click();
  const result=await currentReport(page);
  expect(result).toMatchObject({attempts:5,outcome:'afterExplanation',firstTryCorrect:false});
  expect(result.answerHistory.filter(a=>a.valid===false)).toHaveLength(4);
  expect(result.answerHistory.at(-1)).toMatchObject({rawFields:{euros:'',cents:'50'},normalizedDisplay:'€0,50',interpreted:50,unit:'cents',correct:true});
});

for(const [id,euros,cents,display] of [['GE-001','','50','€0,50'],['GE-002','0','80','€0,80'],['GE-003','3','25','€3,25'],['GE-004','7','60','€7,60'],['GE-005','1','75','€1,75'],['GE-006','5','55','€5,55']])test('money control and Voortgang evidence: '+display,async({page,isMobile})=>{
  await menu(page);await pick(page,'RP-M6-'+id);
  const question=q(id),parts={euros,cents};
  const control=page.locator('[data-money-input]');
  await expect(control.locator('.answerPrefix')).toHaveText('€');
  await expect(control.locator('.moneySeparator')).toHaveText(',');
  await expect(control.locator('.moneyPart > span')).toHaveText(['euro','cent']);
  for(const part of ['euros','cents']){
    const field=control.locator(`[data-money-part="${part}"]`);
    await field.scrollIntoViewIfNeeded();
    if(isMobile)await field.tap();else await field.click();
    await expect(field).toBeFocused();
    await expect(field).toHaveAttribute('inputmode','numeric');
    await expect(field).toHaveAttribute('pattern','[0-9]*');
    const box=await field.boundingBox();expect(box.width).toBeGreaterThanOrEqual(44);expect(box.height).toBeGreaterThanOrEqual(44);
  }
  await expect(control.locator('[data-money-part="cents"]')).toHaveAttribute('maxlength','2');
  await fillAnswer(page,parts);await reopenWithoutChanges(page);
  for(const part of ['euros','cents'])await expect(control.locator(`[data-money-part="${part}"]`)).toHaveValue(parts[part]);
  await page.getByRole('button',{name:'Controleer',exact:true}).click();
  await expect(page.locator('#app')).toHaveAttribute('data-screen','correct');
  const result=await currentReport(page);
  expect(result).toMatchObject({outcome:'direct',attempts:1,explanationShown:false});
  expect(result.answerHistory[0]).toMatchObject({rawFields:parts,interpreted:question.answer,normalizedDisplay:display,unit:'cents',correct:true});
  await page.evaluate(()=>{window.AtlasSessionReport.end();window.eval('state').screen='menu';window.eval('render')();});
  await page.getByRole('button',{name:'Voortgang',exact:true}).click();
  const detail=page.locator('.sessionQuestionDetail').first();await detail.locator('summary').click();
  await expect(detail).toContainText(`Bedrag: ${display}`);
  await expect(detail).toContainText(`Gelezen als: ${question.answer} cents`);
  await expect(detail).toContainText(`euro ${euros}`);
  await expect(detail).toContainText(`cent ${cents}`);
});

test('money field input guards and single-cent semantics survive redraw and reopening',async({page})=>{
  await menu(page);await pick(page,'RP-M6-GE-001');
  const euros=page.getByRole('textbox',{name:'Euro',exact:true}),cents=page.getByRole('textbox',{name:'Cent',exact:true});
  await euros.pressSequentially('5,.x');await expect(euros).toHaveValue('5');
  await cents.pressSequentially('5a67');await expect(cents).toHaveValue('56');
  await cents.fill('5');await page.getByRole('button',{name:'Controleer',exact:true}).click();
  expect((await currentReport(page)).answerHistory.at(-1)).toMatchObject({rawFields:{euros:'5',cents:'5'},interpreted:505,normalizedDisplay:'€5,05',correct:false});
  await reopenWithoutChanges(page);await expect(euros).toHaveValue('5');await expect(cents).toHaveValue('5');
  await cents.fill('');await page.getByRole('button',{name:'Controleer',exact:true}).click();
  expect((await currentReport(page)).answerHistory.at(-1)).toMatchObject({interpreted:500,normalizedDisplay:'€5,00'});
  await assertStage(page,q('GE-001'),'moose');
});

test('outcomes, report drilldown and v1 history stay honest with incomplete explanation',async({page})=>{
  await menu(page);
  await page.evaluate(questions=>{
    const r=window.AtlasSessionReport;r.setNowForTest(1000);
    r.startOrVisitLevel({adventureId:'LVL-0001',adventureTitle:'De Runenpoort',levelId:'LVL-0001',levelTitle:'De Runenpoort',m6Percentage:10});
    for(let i=0;i<5;i++){
      const q=questions[i];q.atlasLearningSelection={requested:'M6',delivered:'M6',requestedDifficulty:2,deliveredDifficulty:q.difficulty};
      r.beginQuestion(q,{levelId:'LVL-0001',challengeId:'test',slotId:String(i),variantId:q.id});
      if(i===1)r.recordHint('minnie',q.hintMinnie);
      if(i===2)r.recordHint('moose',q.hintMoose);
      if(i>=3)r.recordExplanation(q.authoredSupport.explanationSteps,'automatic');
      if(i<4)r.recordAttempt(true,{raw:q.answerSpec.allowedForms[0],interpreted:q.answer,valid:true});
    }
    r.setNowForTest(10000);r.end();
    const store=JSON.parse(localStorage.getItem(r.storageKey));
    store.sessions.push({version:1,id:'legacy',endedAt:500,startedAt:0,activeMs:500,elapsedMs:500,adventureTitle:'Oude sessie',levels:[],questions:[{variantId:'old',prompt:'Oude vraag',attempts:3,completedAt:400,outcome:'assisted',assisted:true,minnieHint:true,mooseHint:true,category:'Tafels',detail:'Tafel van 8'}]});
    localStorage.setItem(r.storageKey,JSON.stringify(store));
  },entries.slice(0,5).map(e=>e.question));
  const sessions=await page.evaluate(()=>window.AtlasSessionReport.getSessions());
  expect(sessions[0].version).toBe(2);
  expect(sessions[0].questions.map(q=>q.outcome)).toEqual(['direct','afterMinnie','afterMoose','afterExplanation','incomplete']);
  expect(sessions[1].questions[0].deliveredLearningLevel).toBeUndefined();
  await page.getByRole('button',{name:'Voortgang',exact:true}).click();
  await expect(page.locator('.sessionLearningSummary').first()).toContainText('90% E5 · 10% M6');
  await expect(page.locator('.sessionLearningSummary').first()).toContainText('Werkelijk aangeboden: 0 E5 · 5 M6');
  const details=page.locator('.sessionQuestionDetail');await details.first().locator('summary').click();
  await expect(details.first()).toContainText('De helft van een hoeveelheid bepalen.');
  await details.nth(4).locator('summary').click();await expect(details.nth(4)).toContainText('Niet afgerond');
  await expect(details.nth(4)).not.toContainText('Leg uit');
  await details.last().locator('summary').click();await expect(details.last()).toContainText('niet geregistreerd');
  await expect(details.last()).toContainText('Samen afgerond · hulpresultaat');
});

test('session inactivity never turns a visible full explanation into a direct result',async({page})=>{
  await menu(page);await pick(page,'RP-M6-GE-001');
  for(let i=0;i<3;i++)await answer(page,{euros:'50',cents:''});
  await page.evaluate(()=>window.AtlasSessionReport.end('inactivity'));
  await fillAnswer(page,{euros:'0',cents:'50'});
  await page.getByRole('button',{name:'Controleer',exact:true}).click();
  const result=await page.evaluate(()=>({old:window.AtlasSessionReport.getSessions()[0],current:window.AtlasSessionReport.getCurrent()}));
  expect(result.old.questions.at(-1)).toMatchObject({explanationShown:true,outcome:'incomplete'});
  expect(result.current.m6Percentage).toBe(100);
  expect(result.current.questions[0]).toMatchObject({explanationShown:true,outcome:'afterExplanation',firstTryCorrect:false});
  expect(result.current.questions[0].helpHistory[0]).toMatchObject({source:'continued-question',steps:q('GE-001').authoredSupport.explanationSteps});
});

test('recovering a v1 active session preserves its version and missing metadata',async({page})=>{
  await menu(page);
  await page.evaluate(()=>{
    const now=Date.now();
    localStorage.setItem('atlas-session-current-v1',JSON.stringify({version:1,id:'v1-interrupted',adventureId:'LVL-0001',adventureTitle:'Oud',startedAt:now-5000,lastActivityAt:now,activeCheckpointAt:now,activeMs:5000,levels:[],questions:[{key:'old',prompt:'Oude vraag',attempts:0,completedAt:null,outcome:null}]}));
  });
  await page.reload();await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
  await expect(page.locator('.menuScreen')).toBeVisible();
  const result=await page.evaluate(()=>window.AtlasSessionReport.getSessions()[0]);
  expect(result).toMatchObject({id:'v1-interrupted',version:1,endReason:'schema-upgrade'});
  expect(result.questions[0]).toEqual({key:'old',prompt:'Oude vraag',attempts:0,completedAt:null,outcome:null});
  expect(result.m6Percentage).toBeUndefined();
});


test('historical direct Leg uit reports stay readable without rewriting their outcomes',async({page})=>{
  await menu(page);
  const historical=await page.evaluate(question=>{
    const now=Date.now();const session={version:2,id:'previous-direct-help',endedAt:now,startedAt:now-5000,activeMs:5000,elapsedMs:5000,adventureTitle:'Vorige pilot',m6Percentage:10,levels:[],questions:[{variantId:question.id,prompt:question.prompt,attempts:1,completedAt:now,outcome:'afterExplanation',explanationShown:true,category:'Geld',detail:question.reportLabel,answerHistory:[{at:now,raw:'0,50',interpreted:50,unit:'cents',valid:true,correct:true}],helpHistory:[{stage:'explanation',at:now-1000,source:'direct',steps:question.authoredSupport.explanationSteps}]}]};
    localStorage.setItem('atlas-session-report-v1',JSON.stringify({version:2,sessions:[session]}));return session;
  },q('GE-001'));
  await page.getByRole('button',{name:'Voortgang',exact:true}).click();
  await page.locator('.sessionQuestionDetail summary').click();
  await expect(page.locator('.sessionQuestionDetail')).toContainText('Leg uit');
  await expect(page.locator('.sessionQuestionDetail')).toContainText('Met volledige uitleg afgerond');
  await expect(page.locator('.sessionQuestionDetail')).toContainText('Invoer: 0,50');
  await expect(page.locator('.sessionQuestionDetail')).toContainText('Gelezen als: 50 cents');
  await expect(page.locator('.sessionQuestionDetail')).not.toContainText('Bedrag:');
  expect(await page.evaluate(()=>window.AtlasSessionReport.getSessions()[0])).toEqual(historical);
});

for(const id of ['RP-M6-BR-006','RP-M6-OP-003','RP-M6-OP-004','RP-M6-GE-006','RP-M6-TI-006','RP-M6-GE-002'])test('touch layout: '+id+' integrated help and answer controls at every help stage',async({page,isMobile})=>{
  await menu(page);await pick(page,id);
  const question=entries.find(e=>e.question.id===id).question;
  for(const stage of ['minnie','moose','explanation']){
    if(question.answerMode==='open'){
      await fillAnswer(page,wrongAnswer(question));
      const submit=page.getByRole('button',{name:'Controleer',exact:true});
      if(isMobile)await submit.tap();else await submit.click();
    }else{
      const choice=page.getByRole('button',{name:wrongAnswer(question),exact:true});
      if(isMobile)await choice.tap();else await choice.click();
    }
    await assertStage(page,question,stage);
    await assertWorkspaceLayout(page);
    const measurements=await page.locator('.instructionalChallengeBox').evaluate(box=>{
      const rect=box.getBoundingClientRect();return {overflow:box.scrollWidth-box.clientWidth,left:rect.left,right:rect.right,top:rect.top,bottom:rect.bottom,height:innerHeight,viewport:innerWidth,parts:[...box.querySelectorAll('.fractionPart')].map(p=>p.getBoundingClientRect().width)};
    });
    expect(measurements.overflow).toBeLessThanOrEqual(1);expect(measurements.left).toBeGreaterThanOrEqual(0);expect(measurements.right).toBeLessThanOrEqual(measurements.viewport);
    expect(measurements.top).toBeGreaterThanOrEqual(8);expect(measurements.bottom).toBeLessThanOrEqual(measurements.height);
    if(measurements.parts.length)expect(Math.max(...measurements.parts)-Math.min(...measurements.parts)).toBeLessThan(1);
    if(stage==='explanation'&&(id==='RP-M6-OP-003'||id==='RP-M6-GE-002')){
      await page.locator('.instructionalChallengeBox').evaluate(box=>box.scrollTop=0);
      await expect(page.locator('.compactChallengeHeader .challengeCharacterPortrait')).toBeInViewport();
      await page.screenshot({path:test.info().outputPath(id+'-explanation-presenter.png')});
    }
    const control=page.locator('[data-open-answer], [data-choice]').first();
    await control.scrollIntoViewIfNeeded();await expect(control).toBeInViewport();
    expect((await control.boundingBox()).height).toBeGreaterThanOrEqual(44);
    if(id==='RP-M6-OP-003'||id==='RP-M6-GE-002')await page.screenshot({path:test.info().outputPath(id+'-'+stage+'.png')});
  }
});

for(const id of ['RP-M6-OP-003','RP-M6-GE-002'])test('reduced keyboard viewport: '+id+' retains integrated help and answer access',async({page})=>{
  await menu(page);await pick(page,id);
  const question=entries.find(e=>e.question.id===id).question;
  await answer(page,wrongAnswer(question));await answer(page,wrongAnswer(question));
  const height=await page.evaluate(()=>{
    const height=Math.min(innerHeight-250,520);
    document.documentElement.style.setProperty('--visual-viewport-height',height+'px');
    document.documentElement.style.setProperty('--visual-viewport-offset-top','0px');
    document.body.classList.add('keyboard-open');return height;
  });
  await assertWorkspaceLayout(page,height);
  await page.locator('[data-open-answer]').last().scrollIntoViewIfNeeded();
  const controls=await page.locator('.openAnswerControls').boundingBox();
  await expect(page.locator('[data-adventure-team-bar]')).toHaveCount(0);
  expect(controls.y).toBeGreaterThanOrEqual(0);expect(controls.y+controls.height).toBeLessThanOrEqual(height);
  if(id==='RP-M6-OP-003')await page.screenshot({path:test.info().outputPath('keyboard-'+id+'.png')});
  await answer(page,wrongAnswer(question));
  await page.evaluate(height=>{
    document.documentElement.style.setProperty('--visual-viewport-height',height+'px');
    document.body.classList.add('keyboard-open');
  },height);
  await expect(page.locator('[data-adventure-team-bar]')).toHaveCount(0);
  await page.locator('[data-open-answer]').last().scrollIntoViewIfNeeded();
  const explanationControls=await page.locator('.openAnswerControls').boundingBox();
  expect(explanationControls.y).toBeGreaterThanOrEqual(0);expect(explanationControls.y+explanationControls.height).toBeLessThanOrEqual(height);
});
