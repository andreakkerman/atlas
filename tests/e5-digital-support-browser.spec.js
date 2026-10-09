const {test,expect}=require('@playwright/test');
const expected=require('./fixtures/e5-digital-support-expected.json');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
const shots='qa-screenshots/e5-digital-support-20261009';
const cases=[
 ['LVL-0033','churchClock','churchClock-4b'], // 12:05
 ['LVL-0025','pulleyPanel','pulley-panel-3b'], // 10:25
 ['LVL-0033','churchClock','churchClock-1b'], // 07:30
 ['LVL-0033','churchClock','churchClock-2b'], // 08:35
 ['LVL-0035','roundContainer','roundContainer-4b'], // 11:45
 ['LVL-0003','shipCompass','shipCompass-4b'], // 01:55
 ['LVL-0026','centralCodex','central-codex-2b'] // 10:45, also present in the requested examples
];
const snapshot=page=>page.evaluate(()=>{
 const c=n=>window.eval(n),s=c('state'),report=AtlasSessionReport.getCurrent();
 return {q:c('currentChallengeQuestions')()[s.questionIndex],stage:s.questionSupportStage,
  draws:c('learningPlanner').selections,difficultyDraws:c('learningPlanner').difficultySelections,
  report:report.questions.find(q=>q.key===report.currentQuestionKey)};
});
async function bounds(page){
 const box=await page.locator('.challengeWorkspace').evaluate(e=>{const r=e.getBoundingClientRect();return {left:r.left,right:r.right,bottom:r.bottom,w:innerWidth,h:innerHeight,overflow:e.scrollWidth-e.clientWidth};});
 expect(box.left).toBeGreaterThanOrEqual(0);expect(box.right).toBeLessThanOrEqual(box.w);expect(box.bottom).toBeLessThanOrEqual(box.h);expect(box.overflow).toBeLessThanOrEqual(1);
 for(const button of await page.locator('[data-choice]').all()){
  const r=await button.boundingBox();expect(r.width).toBeGreaterThanOrEqual(44);expect(r.height).toBeGreaterThanOrEqual(44);
  expect(await button.evaluate(e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})).toBe(true);
 }
}
for(const [level,challenge,id]of cases)test(`${level}/${id}: authored digital support, emphasis, reopening and completion`,async({page},info)=>{
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','0'));
 await page.goto(base+'/?atlasSessionTest=1');
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();await expect(page.locator('.menuScreen')).toBeVisible();
 await page.evaluate(async({level,challenge,id})=>{
  const c=n=>window.eval(n);await c('selectLevel')(level,{startImmediately:true,allowDisabledForEditor:true});
  const s=c('state'),rune=c('activeRunes')().find(r=>c('learningChallengeForRune')(r)?.id===challenge);
  if(!rune)throw Error('Missing actual production challenge '+challenge);
  s.completedRunes=new Set(c('activeRunes')().filter(r=>r.id!==rune.id).map(r=>r.id));
  const targetIndex=c('learningChallengeForRune')(rune).questions.findIndex(slot=>slot.variants.some(q=>q.id===id));
  if(targetIndex<0)throw Error('Missing production variant '+id);
  // The planner selects lazily on entry to each position, not all four on open.
  const random=Math.random;try{
   Math.random=()=>.99999;c('openRuneChallenge')(rune.id);
   while(s.questionIndex<targetIndex){c('answerQuestion')(c('currentChallengeQuestions')()[s.questionIndex].answer);c('nextQuestion')();}
   if(c('currentChallengeQuestions')()[s.questionIndex].id!==id)throw Error('Wrong selected production variant '+id);
  }finally{Math.random=random;}
 },{level,challenge,id});
 const initial=await snapshot(page),q=initial.q,e=expected[level+':'+id];
 expect(q.id).toBe(e.question.id);expect(q.visual).toEqual(e.question.visual);expect(q.answer).toBe(e.question.answer);expect(q.choices.slice().sort()).toEqual(e.question.choices.slice().sort());
 const choiceOrder=await page.locator('[data-choice]').allTextContents();
 const clock=page.locator('[data-clock-visual="digital"]');await expect(clock).toBeVisible();
 const size=await clock.boundingBox();
 await expect(page.getByRole('button',{name:'Leg uit',exact:true})).toHaveCount(0);
 for(const stage of ['question','minnie','moose','explanation']){
  if(stage!=='question')await page.getByRole('button',{name:q.choices.find(c=>c!==q.answer),exact:true}).click();
  expect((await snapshot(page)).stage).toBe(stage);
  const focused=await clock.locator('[data-clock-digit]').evaluateAll(nodes=>nodes.flatMap((e,i)=>e.classList.contains('digitalClockFocus')?[i]:[]));
  expect(focused).toEqual(stage==='minnie'?[2,3]:stage==='moose'?[0,1]:[]);
  const r=await clock.boundingBox();expect(r.width).toBe(size.width);expect(r.height).toBe(size.height);
  if(['minnie','moose'].includes(stage)){
   await expect(page.locator('[data-adventure-team-bar]')).toHaveAttribute('data-active-speaker',stage);
   await expect(page.locator('.teamMessage')).toHaveText(e[stage]);
   expect(await page.locator('.teamMessage').evaluate(el=>el.scrollHeight-el.clientHeight)).toBeLessThanOrEqual(1);
  }
  if(stage==='explanation'){
   await expect(page.locator('.workspaceContent .challengeFeedback')).toHaveText(e.explanation);
   await expect(page.getByRole('button',{name:'Samen afronden',exact:true})).toBeVisible();
  }
  await bounds(page);
  await page.screenshot({path:`${shots}/${info.project.name}-${id}-${stage}.png`});
  const before=await snapshot(page);
  await page.evaluate(()=>{const c=n=>window.eval(n),id=c('state').activeRuneId;c('closeChallenge')();c('openRuneChallenge')(id);c('render')();});
  expect(await snapshot(page)).toEqual(before);expect(before.draws).toBe(initial.draws);expect(before.difficultyDraws).toBe(0);
  expect(await page.locator('[data-choice]').allTextContents()).toEqual(choiceOrder);
  expect(await clock.locator('.digitalClockFocus').count()).toBe(['minnie','moose'].includes(stage)?2:0);
 }
 await page.getByRole('button',{name:q.answer,exact:true}).click();
 const report=(await snapshot(page)).report;
 expect(report).toMatchObject({outcome:'afterExplanation',attempts:4,explanationShown:true});
 expect(report.helpHistory.map(h=>h.stage)).toEqual(['minnie','moose','explanation']);
 expect(report.helpHistory).toMatchObject([{text:e.minnie},{text:e.moose},{steps:[e.explanation]}]);
});
