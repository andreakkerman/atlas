const {test,expect}=require('@playwright/test');
const cap=require('../src/challenge-capabilities'),hints=require('../src/challenge-hints');
const base=(process.env.ATLAS_EDITOR_URL||'http://127.0.0.1:4173').split('?')[0];
const shots='qa-screenshots/time-recalibration-20261009';
const {currentE5Explanation}=require('./helpers/time-approval.cjs');
test.use({deviceScaleFactor:2});
async function start(page){
 await page.route('**/__dev/levels/*/editor-draft',r=>r.fulfill({json:{}}));
 await page.addInitScript(()=>localStorage.setItem('atlas.learning.m6Percentage','0'));
 await page.goto(base+'/?atlasSessionTest=1');
 await page.getByRole('button',{name:'Start avontuur',exact:true}).click();
 await expect(page.locator('.menuScreen')).toBeVisible();
}
const snapshot=page=>page.evaluate(()=>{
 const c=n=>window.eval(n),s=c('state'),report=AtlasSessionReport.getCurrent();
 return {q:c('currentChallengeQuestions')()[s.questionIndex],stage:s.questionSupportStage,
  draws:c('learningPlanner').selections,difficultyDraws:c('learningPlanner').difficultySelections,
  report:report.questions.find(q=>q.key===report.currentQuestionKey)};
});
async function bounds(page){
 const g=await page.locator('.challengeWorkspace').evaluate(e=>{
  const r=e.getBoundingClientRect();return {left:r.left,right:r.right,bottom:r.bottom,w:innerWidth,h:innerHeight,overflow:e.scrollWidth-e.clientWidth};
 });
 expect(g.left).toBeGreaterThanOrEqual(0);expect(g.right).toBeLessThanOrEqual(g.w);expect(g.bottom).toBeLessThanOrEqual(g.h);expect(g.overflow).toBeLessThanOrEqual(1);
 for(const button of await page.locator('[data-choice]').all()){
  const r=await button.boundingBox();expect(r.width).toBeGreaterThanOrEqual(44);expect(r.height).toBeGreaterThanOrEqual(44);
  expect(await button.evaluate(e=>{const r=e.getBoundingClientRect();return e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));})).toBe(true);
 }
}
for(const [level,id]of [['LVL-0033','churchClock'],['LVL-0035','roundContainer'],['LVL-0003','shipCompass']])for(const digital of [false,true]){
 test(`${level}/${id}: paired E5 ${digital?'digital':'analogue'}, all help stages, stable reopen`,async({page},info)=>{
  await start(page);
  await page.evaluate(async({level,id,digital})=>{
   const c=n=>window.eval(n);await c('selectLevel')(level,{startImmediately:true});
   c('state').completedRunes=new Set(c('activeRunes')().filter(r=>r.id!==id).map(r=>r.id));
   const random=Math.random;try{Math.random=()=>digital?.99999:0;c('openRuneChallenge')(id);}finally{Math.random=random;}
  },{level,id,digital});
  await expect(page.locator('.challengeWorkspace')).toBeVisible();const initial=await snapshot(page),q=initial.q;
  expect(q.visual.type).toBe(digital?'digitalClock':'clock');expect(q.atlasLearningSelection.delivered).toBe('E5');
  const shape=page.locator('[data-clock-visual]');await expect(shape).toBeVisible();
  if(digital)await expect(shape).toHaveAttribute('aria-label',`Digitale klok: ${String(q.visual.hour).padStart(2,'0')}:${String(q.visual.minute).padStart(2,'0')}`);
  await bounds(page);await page.screenshot({path:`${shots}/${info.project.name}-${level}-${digital?'digital':'analogue'}.png`});
  const wrong=q.choices.find(choice=>choice!==q.answer);
  for(const stage of ['minnie','moose','explanation']){
   await page.getByRole('button',{name:wrong,exact:true}).click();
   expect((await snapshot(page)).stage).toBe(stage);
   if(stage!=='explanation'){
    await expect(page.locator('[data-adventure-team-bar]')).toHaveAttribute('data-active-speaker',stage);
    await expect(page.locator('.teamMessage')).toHaveText(hints.resolve(level,q,stage));
   }else await expect(page.locator('.workspaceContent .challengeFeedback')).toHaveText(currentE5Explanation(level,q));
   expect((await snapshot(page)).q).toEqual(q);await bounds(page);
   const before=await snapshot(page);
   await page.evaluate(()=>{const c=n=>window.eval(n),id=c('state').activeRuneId;c('closeChallenge')();c('openRuneChallenge')(id);c('render')();});
   expect(await snapshot(page)).toEqual(before);expect(before.draws).toBe(initial.draws);expect(before.difficultyDraws).toBe(0);
  }
  await page.getByRole('button',{name:q.answer,exact:true}).click();
  expect((await snapshot(page)).report).toMatchObject({outcome:'afterExplanation',attempts:4,explanationShown:true});
 });
}

test('all eight required times: stable seven-segment geometry, colon, focus and compact DPR 2 gallery',async({page},info)=>{
 await page.goto(base);
 const times=[[0,5],[8,57],[9,5],[15,58],[16,2],[19,35],[21,55],[23,59]];
 await page.evaluate(markup=>{
  document.body.innerHTML=`<main class="clockQAGallery">${markup}</main>`;
  const style=document.createElement('style');style.textContent='.clockQAGallery{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;max-width:900px;margin:auto;padding:18px;background:#173c34}.clockQACase{min-width:0;text-align:center;color:#f7ebcd}.clockQACase h2{font:18px sans-serif;margin:0}';document.head.append(style);
 },times.map(([hour,minute])=>`<section class="clockQACase"><h2>${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}</h2>${cap.renderDigitalClock({hour,minute})}${cap.renderDigitalClock({hour,minute,compact:true,highlightMinutes:true})}</section>`).join(''));
 expect(await page.evaluate(()=>devicePixelRatio)).toBe(2);
 const metrics=await page.locator('.authoredDigitalClock').evaluateAll(clocks=>clocks.map(clock=>{
  const svg=clock.querySelector('svg'),b=clock.getBoundingClientRect(),r=svg.getBoundingClientRect();
  const groups=[...svg.querySelectorAll('[data-clock-digit]')];
  return {width:b.width,height:b.height,compact:clock.classList.contains('digitalClockCompact'),clip:clock.scrollWidth-clock.clientWidth,
   contained:r.left>=b.left&&r.right<=b.right&&r.top>=b.top&&r.bottom<=b.bottom,
   digits:groups.map(g=>g.dataset.clockDigit).join(''),
   geometry:[...svg.querySelectorAll('path,rect')].every(p=>{const v=p.getBoundingClientRect();return v.left>=r.left&&v.right<=r.right&&v.top>=r.top&&v.bottom<=r.bottom;}),
   animations:clock.getAnimations({subtree:true}).length,
   active:getComputedStyle(svg.querySelector('.digitalSegmentOn')).fill,
   inactive:getComputedStyle(svg.querySelector('.digitalSegmentOff')).fill,
   focus:!!svg.querySelector('.digitalClockFocus'),
   colon:[...svg.querySelectorAll('.digitalClockColon rect')].map(e=>({x:e.getAttribute('x'),y:e.getAttribute('y')}))};
 }));
 expect(metrics).toHaveLength(16);
 for(const [i,m]of metrics.entries()){
  expect(m.digits).toBe(times[Math.floor(i/2)].map(n=>String(n).padStart(2,'0')).join(''));
  expect(m.compact).toBe(i%2===1);expect(m.focus).toBe(i%2===1);
  expect(m.contained&&m.geometry).toBe(true);expect(m.clip).toBeLessThanOrEqual(1);expect(m.animations).toBe(0);
  expect(m.active).not.toBe(m.inactive);expect(m.colon).toEqual([{x:'151',y:'29'},{x:'151',y:'63'}]);
  expect(m.width).toBe(metrics[i%2].width);expect(m.height).toBe(metrics[i%2].height);
 }
 expect(metrics[1].width).toBeLessThan(metrics[0].width);
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
 await page.screenshot({path:`${shots}/${info.project.name}-digital-clock-gallery-DPR2.png`,fullPage:true});
});
