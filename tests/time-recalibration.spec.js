const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm'),crypto=require('crypto');
const {records:productionRecords,bank}=require('../src/content/m6'),engine=require('../src/m6-bank'),learning=require('../src/learning-levels'),hints=require('../src/challenge-hints'),support=require('../src/challenge-support'),cap=require('../src/challenge-capabilities');
const records=productionRecords.filter(r=>require('./fixtures/m6-expansion-20261010-baseline.json').records[r.id]);
const before=require('./fixtures/time-recalibration-baseline.json');
const {digitalMinnie,digitalMoose}=require('./helpers/time-approval.cjs');
const {beforeTargetedReview}=require('./helpers/m6-targeted-review.cjs');
const canonical=x=>x&&typeof x==='object'?Array.isArray(x)?x.map(canonical):Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
const load=id=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(`Levels/${id}/level.js`,'utf8'),c);return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));};
const changed=['RP-M6-TI-001','RP-M6-TI-002','RP-M6-TI-003','RP-M6-TI-004',...['001','002','003','004','005','006','007','008','009','010','013'].map(n=>'M6-TI-'+n)];
const approval=fs.readFileSync('scripts/content/atlas-time-recalibration-approved.md','utf8').replaceAll('\r\n','\n');

test('all 60 original semantic positions have exactly one analogue and one digital E5; all other level fields remain exact',()=>{
 let slots=0,analogue=0,digital=0;
 for(const [id,digest]of Object.entries(before.levels)){
  const level=load(id);
  for(const challenge of level.learningChallenges||[])for(const slot of challenge.questions){
   const old=before.clockVariants[id+':'+slot.variants[0].id];
   expect(learning.positionDomain(slot.variants)==='time').toBe(!!old);
   if(!old)continue;slots++;expect(slot.variants).toHaveLength(2);
   for(const [index,q]of slot.variants.entries()){
    const baseline=before.clockVariants[id+':'+q.id];expect(baseline.slot).toBe(slot.id);expect(baseline.index).toBe(index);
    expect(learning.resolveLevel(q)).toBe('E5');expect(q.visual).toEqual({...baseline.question.visual,type:index?'digitalClock':'clock'});
    if(index){digital++;const {visual,explanation,hintMinnie,hintMoose,...rest}=q;const {visual:ov,explanation:oe,hintMinnie:om,hintMoose:oo,...original}=baseline.question;expect(rest).toEqual(original);
     if(!/wijzer/i.test(oe))expect(explanation).toBe(oe);
     for(const s of ['minnie','moose'])expect(hints.resolve(id,q,s)).not.toMatch(/wijzer|wijzerplaat/i);
     expect(explanation).not.toMatch(/wijzer/i);
     expect(hints.resolve(id,q,'minnie')).toBe(digitalMinnie(q));
     expect(hints.resolve(id,q,'moose')).toBe(digitalMoose(q));
    }else{analogue++;expect(q).toEqual(baseline.question);}
    slot.variants[index]=structuredClone(baseline.question);
   }
  }
  // Restore only the explicitly enumerated representation conversions, then
  // compare the complete level: geometry, other questions, IDs and metadata.
  expect(hash(level),id).toBe(digest);
 }
 expect({slots,analogue,digital}).toEqual({slots:60,analogue:60,digital:60});
});

test('all 15 replacements use the exact new approved prose and answers; nine time records and other domains stay byte-equivalent',()=>{
 expect(records).toHaveLength(99);expect(records.map(r=>r.id)).toEqual(Object.keys(before.records));
 expect(records.filter(r=>r.educationalDomain==='time')).toHaveLength(24);
 expect(records.filter(r=>r.educationalDomain==='time').reduce((a,r)=>(a[r.difficulty]=(a[r.difficulty]||0)+1,a),{})).toEqual({1:7,2:12,3:5});
 // Preserve this approval's exact baseline, allowing only the subsequent seven
 // fields covered by the independent complete-record targeted-review tests.
 for(const r of records.map(beforeTargetedReview)){
  const baseline=before.records[r.id];expect(r.difficulty).toBe(baseline.difficulty);
  if(!changed.includes(r.id)){expect(hash(r),r.id).toBe(baseline.hash);continue;}
  expect(r.contentVersion).toBe(typeof baseline.version==='number'?baseline.version+1:'0.3');
  const block=approval.split(`\n${r.id}\n--------------------------------------------------\n`)[1].split(/\n-{10,}|\n={10,}/)[0];
  const extract=name=>block.split('\n'+name+':\n')[1].split(/\n(?:Answer|Answer mode|Unit|Choices|Correct|Minnie|Moose|Explanation|Visual|Visual type):/)[0].trim();
  const q=bank.recover(r.id);
  for(const [key,heading]of [['prompt','Question'],['hintMinnie','Minnie'],['hintMoose','Moose'],['explanation','Explanation']])expect(q[key],r.id+'/'+key).toBe(extract(heading));
  expect(q.authoredSupport.explanationSteps).toEqual(q.explanation.split(/\n\s*\n/));
  const choices=block.includes('\nChoices:')?extract('Choices').split('\n').filter(Boolean):undefined;
  expect(q.choices).toEqual(choices);expect(q.answer).toBe(choices?extract('Correct'):Number(extract('Answer')));
  expect(support.validate(q)).toEqual([]);
  expect(support.parseAnswer(q,String(q.answer))).toMatchObject({valid:true,correct:true});
  expect(support.parseAnswer(q,'')).toMatchObject({valid:false});
  if(q.answerMode==='open')for(const invalid of ['abc','1,5','1.5','-1'])expect(support.parseAnswer(q,invalid).valid).toBe(false);
 }
 expect(records.filter(r=>r.educationalDomain==='time'&&r.difficulty===1).every(r=>!r.learningObjective.includes('clock_to_spoken'))).toBe(true);
});

test('time arithmetic is independently correct for all 24 production tasks, including seconds and backwards time',()=>{
 const expected={
  'RP-M6-TI-001':240/60,'RP-M6-TI-002':3*60,'RP-M6-TI-003':`${Math.floor(430/60)} minuten ${430%60} seconden`,'RP-M6-TI-004':5*60+20,
  'RP-M6-TI-005':'15:15','RP-M6-TI-006':'14:45',
  'M6-TI-001':'16:02','M6-TI-002':'09:05','M6-TI-003':9+32,'M6-TI-004':17+28,'M6-TI-005':31+12,'M6-TI-006':10+34,
  'M6-TI-007':'18:24','M6-TI-008':'19:26','M6-TI-009':300/60,'M6-TI-010':4*60,'M6-TI-011':29+20,'M6-TI-012':18+39,'M6-TI-013':2*60+30,
  'M6-TI-014':'10:20','M6-TI-015':'14:35','M6-TI-016':'15:25','M6-TI-017':18+5,'M6-TI-018':'12:35'
 };
 for(const [id,value]of Object.entries(expected))expect(bank.recover(id).answer,id).toBe(value);
 expect(require('../scripts/m6-core-audit.cjs').auditCores(records)).toEqual({audited:99,duplicates:[]});
 // A conversion core remains distinct from its inverse, but a duplicate cannot
 // hide behind another objective, ID, narrative or serialized property order.
 const copy=structuredClone(bank.get('RP-M6-TI-001'));copy.id='TEST-DUPLICATE';copy.learningObjective='another_label';
 expect(require('../scripts/m6-core-audit.cjs').auditCores([...records,copy]).duplicates).toContainEqual(['RP-M6-TI-001','TEST-DUPLICATE']);
});

test('approved stage boundaries keep calculation totals and final clock times locked until explanation',()=>{
 const outputs={'RP-M6-TI-001':'240 : 60 = 4','RP-M6-TI-002':'3 × 60 = 180','RP-M6-TI-003':'430 − 420 = 10','RP-M6-TI-004':'300 + 20 = 320','M6-TI-003':'9 + 32 = 41','M6-TI-004':'17 + 28 = 45','M6-TI-005':'31 + 12 = 43','M6-TI-006':'10 + 34 = 44','M6-TI-007':'18:24','M6-TI-008':'19:26','M6-TI-009':'300 : 60 = 5','M6-TI-010':'4 × 60 = 240','M6-TI-013':'120 + 30 = 150'};
 for(const [id,answer]of Object.entries(outputs)){
  const q=bank.recover(id);for(const stage of ['question','minnie','moose'])expect(support.renderVisual(q.visual,stage),id+'/'+stage).not.toContain(answer);
  expect(support.renderVisual(q.visual,'explanation')).toContain(answer);
 }
 for(const [id,start,hour,end]of [['M6-TI-001','15:58','16:00','16:02'],['M6-TI-002','08:57','09:00','09:05']]){
  const q=bank.recover(id);for(const [i,stage]of support.STAGES.entries())expect(support.renderVisual(q.visual,stage)).toContain('Digitale klok: '+[start,hour,hour,end][i]);
 }
 for(const frame of Object.values(bank.recover('M6-TI-008').visual.stages))expect(frame.direction).toBe('backward');
});

test('planner and policy source unchanged; time/generic routing and allowed difficulty survive exhaustion',()=>{
 expect(hash(fs.readFileSync('src/learning-levels.js','utf8'))).toBe(before.plannerHash);expect(learning.DEFAULT_M6_PERCENTAGE).toBe(10);expect(learning.M6_DIFFICULTY_POLICY).toEqual(before.policy);
 for(const percentage of [10,40,50,60,70,80,90,100])for(const domain of ['time','generic']){
  const planner=learning.createPlanner(percentage,()=>0),history=engine.createHistory({getItem:()=>null,setItem(){}});
  const variants=domain==='time'?load('LVL-0033').learningChallenges.find(c=>c.id==='churchClock').questions[0].variants:load('LVL-0032').learningChallenges[0].questions[0].variants;
  for(let i=0;i<500;i++){
   const selected=learning.selectPosition(variants,planner,bank,{history,random:()=>.3});
   if(selected.delivered==='M6'){expect(selected.variant.educationalDomain==='time').toBe(domain==='time');expect(planner.allowedDifficulties).toContain(selected.deliveredDifficulty);expect(selected.deliveredDifficulty).toBe(selected.requestedDifficulty);}
  }
  expect(planner.selections).toBe(500);expect(planner.difficultySelections).toBe(500*percentage/100);
 }
});

test('shared seven-segment masks and accessibility encode all ten digits without font dependencies',()=>{
 const masks=['abcdef','bc','abdeg','abcdg','bcfg','acdfg','acdefg','abc','abcdefg','abcdfg'];
 for(let digit=0;digit<10;digit++){
  const html=cap.renderDigitalClock({hour:digit,minute:digit*6});
  const groups=[...html.matchAll(/<g data-clock-digit="(\d)"[^>]*>([\s\S]*?)<\/g>/g)];expect(groups).toHaveLength(4);
  for(const [,d,body]of groups)expect([...body.matchAll(/data-segment="([a-g])" class="digitalSegment digitalSegmentOn"/g)].map(m=>m[1]).join('')).toBe(masks[Number(d)]);
  expect(html).not.toMatch(/<animate|<text|font-family|setInterval/);
 }
 for(const [hour,minute]of [[0,5],[8,57],[9,5],[15,58],[16,2],[19,35],[21,55],[23,59]]){
  const frame={hour,minute};expect(cap.renderClockVisual({type:'digitalClock',...frame})).toBe(cap.render('digitalClock',frame));
  expect(support.renderVisual({type:'digitalClock',...frame})).toBe(''); // No second render or missing-stages crash.
  expect(cap.render('digitalClock',frame)).toContain(`Digitale klok: ${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')}`);
 }
 expect(cap.renderDigitalClock({hour:24,minute:0})).toBe('');
 for(const field of ['highlightHours','highlightMinutes']){
  const groups=[...cap.renderDigitalClock({hour:12,minute:34,[field]:true}).matchAll(/<g data-clock-digit="(\d)" class="([^"]*)"/g)];
  expect(groups.filter(g=>g[2].includes('digitalClockFocus')).map(g=>g[1])).toEqual(field==='highlightHours'?['1','2']:['3','4']);
 }
});
