const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm'),crypto=require('crypto');
const engine=require('../src/m6-bank'),{records,bank}=require('../src/content/m6');
const learning=require('../src/learning-levels'),support=require('../src/challenge-support'),cap=require('../src/challenge-capabilities');
const {readApproved,validatePilot,expectedIds}=require('../scripts/runenpoort-m6-content.cjs');
const {fixtures}=require('./fixtures/m6-capabilities.cjs');
const memory=()=>{let data=null;return{getItem:()=>data,setItem:(k,v)=>{data=v;},removeItem:()=>{data=null;}};};
const load=id=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(`Levels/${id}/level.js`,'utf8'),c);return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));};
const canonical=x=>x&&typeof x==='object'?Array.isArray(x)?x.map(canonical):Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
test('24 exact currently approved generic records, preserved E5 and no embedded M6',()=>{
  const baseline=require('./fixtures/m6-migration-baseline.json');
  expect(bank.metadata.filter(q=>q.id.startsWith('RP-M6-')).map(q=>q.id)).toEqual(expectedIds);
  expect(bank.metadata.map(q=>q.id)).toEqual([...expectedIds,...require('../scripts/m6-expansion-content.cjs').expectedIds,...require('../scripts/m6-expansion-20261010.cjs').readApproved().map(q=>q.id)]);
  expect(validatePilot([1,2,3].map(n=>load(`LVL-000${n}`)))).toEqual([]);
  for(const {question} of readApproved()){
    const {centralQuestionId,surfaceId,educationalCore,educationalDomain,...actual}=bank.recover(question.id);
    expect(actual).toEqual(question);expect(hash(actual)).toBe(require('./fixtures/m6-generic-original-hashes.json')[question.id]);
    expect(surfaceId).toBe('original');expect(centralQuestionId).toBe(question.id);
    for(const stage of support.STAGES)expect(support.renderVisual(actual.visual,stage)).toBe(support.renderVisual(question.visual,stage));
    expect(support.renderExplanation(actual)).toBe(support.renderExplanation(question));
  }
  // The dedicated recalibration test checks every authorized representation edit
  // and the full current level. Retain this earlier migration's baseline too.
  for(const [id,digest] of Object.entries(baseline.levels))expect(hash(require('./helpers/time-approval.cjs').beforeE5RepresentationChange(load(id))),id).toBe(digest);
  expect(records.every(r=>!JSON.stringify(r).match(/allowedLevels|allowedChallenges|LVL-\d/))).toBe(true);
});
test('central validation rejects missing IDs, duplicates, altered approved content and early leakage',()=>{
  expect(validatePilot([],engine.createBank(records.slice(1))).length).toBeGreaterThan(0);
  // The immutable pilot gate must not prevent a future independently authored collection.
  expect(validatePilot([],engine.createBank([...records,structuredClone(fixtures[0])]))).toEqual([]);
  expect(()=>engine.createBank([...records,records[0]])).toThrow('duplicate ID');
  for(const mutate of [r=>r.surfaces[0].hintMinnie='Replacement',r=>r.surfaces[0].visual.stages.question.groups=[{lines:['370']}]]){
    const copy=structuredClone(records);mutate(copy.find(r=>r.id==='RP-M6-OP-001'));expect(validatePilot([],engine.createBank(copy)).length).toBeGreaterThan(0);
  }
  for(const field of ['contentVersion','domain','learningObjective','reportLabel','educationalCore','surfaces']){
    const r=structuredClone(records[0]);delete r[field];expect(engine.validateRecords([r]).length,field).toBeGreaterThan(0);
  }
  for(const field of ['allowedLevels','allowedChallenges','worldId','levelId','challengeId'])expect(engine.validateRecords([{...records[0],[field]:['test']}]).length).toBeGreaterThan(0);
  for(const mode of ['multipleChoice','currencyCompose'])expect(engine.validateRecords([{...records[0],answerMode:mode}]).join()).toContain('answerMode and answer contract must agree');
});
test('authored surfaces are coherent, escape HTML, resolve explicit tokens and never alter the core',()=>{
  const r=structuredClone(fixtures[0]);r.surfaces[0].prompt='In {container}: {items}.';r.surfaces[0].hintMinnie='Bekijk {items}.';r.surfaces[0].tokens={container:'een doos',items:'lampen'};
  r.surfaces.push({...structuredClone(r.surfaces[0]),id:'crate',tokens:{container:'een krat',items:'batterijen'}});
  const b=engine.createBank([r]),h=engine.createHistory(memory());
  const a=b.select(2,{history:h,random:()=>0}),c=b.select(2,{history:h,random:()=>0});
  expect(a.prompt).toBe('In een doos: lampen.');expect(a.hintMinnie).toBe('Bekijk lampen.');
  expect(c.prompt).toBe('In een krat: batterijen.');expect(c.hintMinnie).toBe('Bekijk batterijen.');
  expect(a.educationalCore).toEqual(c.educationalCore);expect(a.id).toBe(c.id);expect(a.surfaceId).not.toBe(c.surfaceId);
  expect(Object.isFrozen(a.visual.stages.question)).toBe(true);expect(b.recover(a.id,a.surfaceId)).toEqual(a);expect(b.recover('missing')).toBeNull();
  const broken=structuredClone(r);delete broken.surfaces[1].tokens.items;expect(engine.validateRecords([broken]).join()).toContain('Missing narrative token');
  expect(cap.richText(['<script>',{numerator:2,denominator:3}])).toContain('&lt;script&gt;');
  const fixed=structuredClone(fixtures[0]);fixed.educationalCore.tokens={total:28};fixed.surfaces[0].prompt='Test {total}';
  expect(engine.instantiate(fixed).prompt).toBe('Test 28');fixed.surfaces[0].tokens={total:36};
  expect(engine.validateRecords([fixed]).join()).toContain('cannot override educational core tokens');
});
test('selection retains 90/10, 50/35/15, exact and nearest difficulty, easier tie and last resort E5',()=>{
  expect(learning.DEFAULT_M6_PERCENTAGE).toBe(10);expect(learning.difficultyPolicy(100)).toEqual({1:50,2:35,3:15});
  const h=engine.createHistory(memory()),p=learning.createPlanner(100,()=>0),local=[{id:'e5'}];
  // Fix planner requests here to isolate selector fallback from the balanced difficulty deck.
  for(const [draw,difficulty] of [[0,1],[.5,2],[.85,3]]){
    p.nextDifficulty=()=>difficulty;
    expect(learning.selectPosition(local,p,bank,{random:()=>draw,history:h})).toMatchObject({requested:'M6',delivered:'M6',requestedDifficulty:difficulty,deliveredDifficulty:difficulty,fallback:false});
  }
  const gap=engine.createBank(records.filter(r=>r.difficulty!==2));
  p.nextDifficulty=()=>2;
  expect(learning.selectPosition(local,p,gap,{random:()=>.6})).toMatchObject({requestedDifficulty:2,deliveredDifficulty:1,difficultyFallback:true});
  p.nextDifficulty=()=>3;
  expect(learning.selectPosition(local,p,engine.createBank([]),{random:()=>.99})).toMatchObject({requestedDifficulty:3,deliveredDifficulty:null,delivered:'E5',fallback:true});
  expect(p.selections).toBe(5);
  const mix=learning.createPlanner(10,()=>0),draws=Array.from({length:40},()=>learning.selectPosition(local,mix,bank,{random:()=>0}));
  expect(draws.filter(q=>q.delivered==='M6')).toHaveLength(4);
  const zero=learning.createPlanner(0,()=>0);expect(learning.selectPosition(local,zero,bank,{random:()=>0}).variant).toBe(local[0]);
});
test('four positions prefer different objectives/domains and never repeat while alternatives remain',()=>{
  const used=[],history=engine.createHistory(memory());
  for(let i=0;i<4;i++)used.push(bank.select(1,{used,history,random:()=>0}));
  expect(new Set(used.map(q=>q.id)).size).toBe(4);expect(new Set(used.map(q=>q.learningObjective)).size).toBe(4);
  expect(Math.max(...[...new Set(used.map(q=>q.educationalDomain))].map(d=>used.filter(q=>q.educationalDomain===d).length))).toBeLessThanOrEqual(2);
  const small=engine.createBank(records.slice(0,3)),seen=[];
  for(let i=0;i<4;i++)seen.push(small.select(1,{used:seen,history,random:()=>0}));
  expect(new Set(seen.slice(0,3).map(q=>q.id)).size).toBe(3);expect(seen[3]).toBeTruthy();
});
test('recent sessions persist bounded IDs, exhaustion reuses oldest and storage failure never blocks',()=>{
  const store=memory(),h=engine.createHistory(store),b=engine.createBank(records.slice(0,2));
  const a=b.select(1,{history:h,random:()=>0}),second=b.select(1,{history:h,random:()=>0});expect(a.id).not.toBe(second.id);
  const recovered=engine.createHistory(store);expect(b.select(1,{history:recovered,random:()=>0}).id).toBe(a.id);
  for(let i=0;i<400;i++)h.remember('id'+i,'surface');expect(h.entries).toHaveLength(engine.HISTORY_LIMIT);expect(store.getItem().length).toBeLessThan(7000);
  expect(engine.createHistory({getItem(){throw Error();},setItem(){throw Error();}}).remember('id','s')).toBeUndefined();
  expect(engine.createHistory({getItem:()=>'{bad'}).entries).toEqual([]);
  expect(engine.createHistory({getItem:()=>JSON.stringify([{id:'a',surfaceId:'old'},{id:'b',surfaceId:'b',unexpected:'discard'},{id:'a',surfaceId:'new'}])}).entries).toEqual([{id:'b',surfaceId:'b'},{id:'a',surfaceId:'new'}]);
});
test('capability contracts validate boundaries, denomination assets and authored stage disclosure',()=>{
  expect(engine.validateRecords(fixtures,p=>fs.existsSync(p))).toEqual([]);
  expect(cap.currencyAssetForCents(2000)).toBe('assets/ui/currency/2000.png');
  expect(cap.currencyAssetForCents(20)).toBe('assets/ui/currency/20.png');expect(()=>cap.currencyAssetForCents(2)).toThrow('Unsupported');
  const twenty={mode:'count',items:[{denomination:20,count:1}]};
  expect(cap.validateFrame('currency',twenty,p=>fs.existsSync(p))).toEqual([]);
  expect(cap.render('currency',twenty)).toContain('src="assets/ui/currency/20.png" alt="€0,20"');
  for(const [type,frame] of [['digitalClock',{hour:24,minute:0}],['digitalClock',{hour:0,minute:-1}],['numberLine',{min:1,max:0,markers:[]}],['numberLine',{min:0,max:1,markers:[{value:2,label:'x'}]}],['measurement',{source:{value:3,unit:'inch'},targetUnit:'cm'}],['currency',{mode:'count',items:[{denomination:2,count:1}]}],['currency',{mode:'count',items:[{denomination:5,count:0}]}]])expect(cap.validateFrame(type,frame).length).toBeGreaterThan(0);
  expect(cap.validateFrame('currency',{mode:'count',items:[{denomination:5,count:1}]},()=>false).join()).toContain('Missing currency asset');
  const errors=[];cap.validateRich({numerator:1,denominator:0},errors);expect(errors).toHaveLength(1);
  for(const fixture of fixtures){const q=engine.instantiate(fixture);for(const stage of support.STAGES){const html=support.renderVisual(q.visual,stage);expect(html).toContain(`Test stadium ${stage}`);for(const later of support.STAGES.slice(support.STAGES.indexOf(stage)+1))expect(html).not.toContain(`Test stadium ${later}`);}}
  expect(support.renderVisual(engine.instantiate(fixtures[2]).visual)).not.toContain('1325');
  const line=engine.instantiate(fixtures[4]).visual, measurement=engine.instantiate(fixtures[5]).visual;
  for(const stage of ['question','minnie','moose']) {
    expect(support.renderVisual(line,stage)).not.toContain('>9500<');
    expect(support.renderVisual(measurement,stage)).toContain('?');
  }
  expect(support.renderVisual(line,'explanation')).toContain('>9500<');
  expect(support.renderVisual(measurement,'explanation')).toContain('3 <strong>m</strong>');
  expect(cap.render('digitalClock',{hour:2,minute:5})).toContain('02');expect(cap.render('digitalClock',{hour:2,minute:5})).toContain('05');
  expect(cap.render('measurement',{source:{value:300,unit:'cm'},targetUnit:'m'})).not.toContain('100 cm');
});
test('currency composition accepts different combinations with canonical evidence, rejects invalid/no attempt',()=>{
  const q=engine.instantiate(fixtures[1]);
  for(const counts of [{2000:'1',200:'2',50:'1'},{1000:'2',200:'2',50:'1'},{2000:'1',200:'2',20:'2',10:'1'}])expect(support.parseAnswer(q,counts)).toMatchObject({rawCounts:counts,interpreted:2450,targetCents:2450,unit:'cents',valid:true,correct:true});
  expect(support.parseAnswer(q,{2000:'1'})).toMatchObject({valid:true,correct:false,interpreted:2000});
  for(const value of [{},{2000:'0'},{2000:'-1'},{2000:'x'},{2000:'1.5'},{2000:1},{2:'1'},[],null,{2000:'100'}])expect(support.parseAnswer(q,value).valid,JSON.stringify(value)).toBe(false);
  expect(support.parseAnswer(engine.instantiate(fixtures[2]),{1000:'1',200:'1',100:'1',10:'2',5:'1'})).toMatchObject({valid:true,correct:true,interpreted:1325,targetCents:1325});
  expect(support.parseAnswer(engine.instantiate(fixtures[2]),{1000:'1',200:'1',100:'1',20:'1',5:'1'})).toMatchObject({valid:true,correct:true,interpreted:1325,targetCents:1325});
  const restricted=structuredClone(q);restricted.answerSpec.denominations=restricted.answerSpec.denominations.filter(n=>n!==20);
  expect(support.parseAnswer(restricted,{20:'1'}).valid).toBe(false);
});
test('600-record bank builds once, selects metadata buckets and bounds storage without rendering the bank',()=>{
  const large=Array.from({length:600},(_,i)=>{const r=structuredClone(fixtures[i%fixtures.length]);r.id=`TEST-M6-LARGE-${i}`;r.difficulty=i%3+1;r.learningObjective=`Objective ${i%37}`;return r;});
  const start=performance.now(),b=engine.createBank(large),built=performance.now()-start;
  const store=memory(),history=engine.createHistory(store),used=[];const begin=performance.now();
  for(let i=0;i<400;i++){if(i%4===0)used.length=0;used.push(b.select(i%3+1,{used,history,random:()=>.3}));}
  const elapsed=performance.now()-begin;
  expect(b.idsFor('difficulty',2)).toHaveLength(200);expect(b.idsFor('domain','currency').length).toBeGreaterThan(0);expect(b.idsFor('objective','Objective 1').length).toBeGreaterThan(0);
  expect(history.entries).toHaveLength(128);expect(store.getItem().length).toBeLessThan(11000);expect(built).toBeLessThan(2000);expect(elapsed).toBeLessThan(2000);
  console.log(JSON.stringify({bankRecords:600,buildMs:built,selection400Ms:elapsed,historyBytes:store.getItem().length}));
});
