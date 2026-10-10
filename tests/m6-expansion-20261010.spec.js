const {test,expect}=require('@playwright/test');
const fs=require('node:fs'),crypto=require('node:crypto');
const {records,bank}=require('../src/content/m6'),engine=require('../src/m6-bank'),support=require('../src/challenge-support'),cap=require('../src/challenge-capabilities'),learning=require('../src/learning-levels');
const imported=require('../scripts/m6-expansion-20261010.cjs'),baseline=require('./fixtures/m6-expansion-20261010-baseline.json');
const canonical=v=>v&&typeof v==='object'?Array.isArray(v)?v.map(canonical):Object.fromEntries(Object.keys(v).sort().map(k=>[k,canonical(v[k])])):v;
const hash=v=>crypto.createHash('sha256').update(JSON.stringify(canonical(v))).digest('hex');
const bytes=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const addition=records.filter(r=>imported.expectedIds.includes(r.id));

test('159 records: exact 60 additions, domain/difficulty/mode totals, schema, arithmetic and idempotence',()=>{
  expect(records).toHaveLength(159);expect(addition).toHaveLength(60);
  expect(records.filter(r=>!baseline.records[r.id]).map(r=>r.id).sort()).toEqual([...imported.expectedIds].sort());
  expect(engine.validateRecords(records,p=>fs.existsSync(p))).toEqual([]);
  expect(imported.validateExpansion(records)).toEqual([]);
  const result=require('../scripts/audit-m6.cjs').validateAndAudit();expect(result.errors).toEqual([]);
  expect(result.audit.difficulty).toEqual({1:64,2:58,3:37});expect(result.addition.difficulty).toEqual({1:22,2:21,3:17});
  expect(result.audit.domains).toEqual({additionSubtraction:20,dataPatterns:15,fractionsRatios:28,measurementGeometry:16,money:20,multiplicationDivision:16,numberSense:14,time:30});
  expect(addition.filter(r=>r.answerMode==='open')).toHaveLength(45);expect(addition.filter(r=>r.answerMode==='multipleChoice')).toHaveLength(15);
  for(let i=0;i<2;i++)expect(imported.moduleText()).toBe(fs.readFileSync('src/content/m6/expansion-20261010.js','utf8'));
  for(const r of addition){
    expect(r.contentVersion).toBe(1);expect(r.surfaces.map(s=>s.id)).toEqual(['original']);
    expect(JSON.stringify(r)).not.toMatch(/\{[A-Za-z][\w]*\}|allowedLevels|allowedChallenges|worldId|levelId|LVL-\d/);
    expect(r.educationalCore.question.answer,r.id).toEqual(require('../scripts/content/atlas-m6-expansion-20261010-cores.cjs')[r.id].answer);
  }
  expect(bank.get('M6-DP-012').difficulty).toBe(2);expect(bank.get('M6-NS-014').difficulty).toBe(3);
});

test('every authored word, choice and stage instruction is imported from the sole approved source',()=>{
  expect(bytes(imported.sourcePath)).toBe('507129fe5b6b072bcd2163bd179cba58748642684877366a9b58e600258ddeb1');
  const source=imported.source;
  const clean=s=>s.trim().replaceAll('`','').replace(/ +$/gm,'');
  for(const r of addition){
    const block=source.split(`### ${r.id} — `)[1].split('\n---')[0];
    const section=(name,end)=>clean(block.split(`**${name}**`)[1].trimStart().split(end)[0]);
    const q=bank.recover(r.id,'original');
    expect(q.prompt,r.id).toBe(section('Vraag',/\n\*\*Antwoord(?:opties|:)/));
    expect(q.hintMinnie,r.id).toBe(section('Minnie','**Moose**'));
    expect(q.hintMoose,r.id).toBe(section('Moose','**Volledige uitleg**'));
    expect(q.explanation,r.id).toBe(section('Volledige uitleg','**Visual**'));
    expect(q.visual.instructions,r.id).toBe(block.split('**Visual**')[1].trim());
    if(q.choices){
      const choices=block.split('**Antwoordopties**')[1].split('**Correct antwoord:**')[0].trim().split('\n').map(s=>clean(s.replace(/^- /,'').replace(/\s*\*\*\(correct\)\*\*/,'')));
      expect(q.choices).toEqual(choices);expect(new Set(q.choices).size).toBe(q.choices.length);expect(q.choices).toContain(q.answer);
    }
    expect(bank.recover(r.id,q.surfaceId)).toEqual(q);
    for(const stage of support.STAGES){
      expect(q.visual.stages[stage]).toBeTruthy();
      const html=support.renderVisual(q.visual,stage);expect(html).not.toMatch(/undefined|NaN|\[object Object\]/);
      if(q.visual.type!=='none')expect(html).toContain(`data-support-stage="${stage}"`);
    }
    expect(support.renderExplanation(q)).toContain('authoredExplanation');
  }
});

test('all 99 prior records, their resolved support and rendering, and all E5 remain frozen',()=>{
  const prior=records.filter(r=>baseline.records[r.id]);expect(prior).toHaveLength(99);
  for(const r of prior){
    const before=baseline.records[r.id];expect(hash(r),r.id).toBe(before.hash);expect(hash(r.educationalCore),r.id).toBe(before.coreHash);
    const resolved=r.surfaces.map(s=>{const q=bank.recover(r.id,s.id);return [q,...support.STAGES.map(stage=>support.renderVisual(q.visual,stage)),support.renderExplanation(q)];});
    expect(hash(resolved),r.id+'/resolved').toBe(before.resolvedHash);
  }
  for(const [file,digest] of Object.entries({...baseline.levels,...baseline.protectedFiles}))expect(bytes(file),file).toBe(digest);
  const hints=require('../src/challenge-hints');
  const e5=require('../scripts/level-utils').loadAllLevels().flatMap(({entry,level})=>(level.learningChallenges||[]).flatMap(c=>(c.questions||[]).flatMap(s=>(s.variants||[]).map(q=>[entry.id,c.id,s.id,q,hints.resolve(entry.id,q,'minnie'),hints.resolve(entry.id,q,'moose'),hints.resolveExplanation(entry.id,q),cap.renderClockVisual(q.visual)]))));
  expect(e5).toHaveLength(960);expect(hash(e5)).toBe(baseline.e5Hash);
});

test('duplicate numerical audit catches clones independent of ID, prose, choices and metadata',()=>{
  const {auditCores}=require('../scripts/m6-core-audit.cjs');expect(auditCores(records)).toEqual({audited:159,duplicates:[]});
  for(const r of addition){const copy=structuredClone(r);copy.id='TEST-DUPLICATE';copy.learningObjective='different wording';copy.difficulty=1;copy.surfaces[0].prompt='different story';expect(auditCores([r,copy]).duplicates).toEqual([[r.id,'TEST-DUPLICATE']]);}
  const arithmetic=structuredClone(bank.get('M6-MD-013'));arithmetic.id='TEST-OLD-SHAPE';arithmetic.educationalCore.values={authored:'7 × 46 = 322'};
  expect(auditCores([bank.get('M6-MD-013'),arithmetic]).duplicates).toHaveLength(1);
});

test('default planner, time exclusivity, exhaustion and difficulty fallback retain their contracts',()=>{
  expect(learning.DEFAULT_M6_PERCENTAGE).toBe(10);expect(learning.difficultyPolicy(10)).toEqual({1:100,2:0,3:0});
  for(const variants of [[{id:'e5',family:'bare_multiplication'}],[{id:'clock',visual:{type:'clock',hour:3,minute:0}}]]){
    const p=learning.createPlanner(10,()=>.3),history=engine.createHistory({getItem:()=>null,setItem(){}}),used=[];
    const results=Array.from({length:200},()=>{const s=learning.selectPosition(variants,p,bank,{history,used,random:()=>.3});used.push(s.variant);return s;});
    const m6=results.filter(s=>s.delivered==='M6');expect(m6).toHaveLength(20);expect(m6.every(s=>s.deliveredDifficulty===1)).toBe(true);
    expect(m6.every(s=>(s.variant.educationalDomain==='time')===(variants[0].id==='clock'))).toBe(true);
  }
  const prior=records.filter(r=>baseline.records[r.id]);expect(learning.difficultyPolicy(100)).toEqual({1:50,2:35,3:15});
  for(const difficulty of [1,2,3])for(const time of [false,true]){
    const eligible=r=>(r.educationalDomain==='time')===time;
    const chosen=records.find(r=>eligible(r)&&r.difficulty===difficulty),restricted=engine.createBank([chosen,prior.find(r=>!eligible(r))]);
    const h=engine.createHistory({getItem:()=>null,setItem(){}});h.remember(chosen.id,chosen.surfaces[0].id);
    const p=learning.createPlanner(100,()=>0);p.nextDifficulty=()=>difficulty===2?3:2;
    const s=learning.selectPosition([{id:'e5',...(time?{visual:{type:'clock',hour:3,minute:0}}:{family:'bare_multiplication'})}],p,restricted,{history:h,used:restricted.records||[chosen],random:()=>0});
    expect(s.variant.id).toBe(chosen.id);expect(s.deliveredDifficulty).toBe(difficulty);expect(s.difficultyFallback).toBe(true);
  }
});

test('all answer contracts including four structured euro amounts use existing grading',()=>{
  for(const r of addition){const q=bank.recover(r.id),raw=q.answerSpec.type==='euro'?{euros:String(Math.floor(q.answer/100)),cents:String(q.answer%100)}:q.answerSpec.allowedForms?.[0]||q.answer;
    expect(support.parseAnswer(q,raw),r.id).toMatchObject({valid:true,correct:true,interpreted:q.answer});
    expect(support.parseAnswer(q,q.answerSpec.type==='euro'?{euros:'',cents:''}:''),r.id).toMatchObject({valid:false,correct:false});
    if(q.choices)for(const choice of q.choices)expect(support.parseAnswer(q,choice).correct).toBe(choice===q.answer);
  }
  for(const [id,cents]of [['M6-MO-011',335],['M6-MO-012',1100],['M6-MO-013',475],['M6-MO-014',30]]){
    const q=bank.recover(id);expect(q).toMatchObject({answerMode:'open',answer:cents,answerSpec:{type:'euro'}});
    expect(support.parseAnswer(q,{euros:'50',cents:''})).toMatchObject({interpreted:5000,correct:false,valid:true});
    expect(support.parseAnswer(q,{euros:'5',cents:'5'})).toMatchObject({interpreted:505,normalizedDisplay:'€5,05'});
  }
});

test('geometry disclosure, opening and unknown sides remain authored and stable',()=>{
  for(let i=8;i<=13;i++){
    const q=bank.recover(`M6-ME-${String(i).padStart(3,'0')}`);
    expect(q.visual.type).toBe('geometryDiagram');const frames=q.visual.stages;
    for(const s of support.STAGES){expect(frames[s].shape).toBe(frames.question.shape);expect(frames[s].opening).toEqual(frames.question.opening);}
  }
  const frame=(id,s)=>bank.recover(id).visual.stages[s],html=(id,s)=>support.renderVisual(bank.recover(id).visual,s);
  expect(frame('M6-ME-008','question').sideLabels).toEqual({top:'6 m'});expect(Object.values(frame('M6-ME-008','moose').sideLabels)).toEqual(['6 m','6 m','6 m','6 m']);
  expect(frame('M6-ME-009','minnie').highlightRegion).toBe('row:0');expect(frame('M6-ME-009','moose').notes).toEqual(['4 rijen × 5']);
  for(const id of ['M6-ME-008','M6-ME-009','M6-ME-010','M6-ME-011','M6-ME-012','M6-ME-013']){
    for(const s of ['question','minnie','moose'])expect(html(id,s).replace(/<[^>]+>/g,''),id+s).not.toMatch(new RegExp(`\\b${bank.recover(id).answer}\\b`));
  }
  expect(html('M6-ME-012','question')).toContain('data-geometry-opening="bottom"');expect(frame('M6-ME-013','moose').unknownSides).toEqual(['left','right']);
  expect(frame('M6-ME-013','explanation').sideLabels).toMatchObject({left:'9 m',right:'9 m'});
  for(const invalid of [{shape:'triangle',sideLabels:{}},{shape:'square',sideLabels:{},opening:{side:'middle',label:'2'}},{shape:'rectangle',sideLabels:{},grid:{rows:0,columns:5}}])expect(cap.validateFrame('geometryDiagram',invalid).length).toBeGreaterThan(0);
});

test('approved stage examples retain useful diagrams without early endpoints or totals',()=>{
  const q=id=>bank.recover(id),frame=(id,s)=>q(id).visual.stages[s];
  const fr=frame('M6-FR-014','moose');expect(fr.notes).toEqual(['3 stappen vanaf 0']);expect(fr.ranges).toHaveLength(4);expect(fr.jumps).toBeUndefined();expect(fr.markers.some(m=>m.focus||m.label==='3/4')).toBe(false);
  expect(frame('M6-FR-014','explanation').markers.find(m=>m.value===.75)).toMatchObject({label:'3/4',focus:true});
  expect(q('M6-DP-009').visual.type).toBe('compactDataTable');expect(frame('M6-DP-009','moose')).toMatchObject({notes:['125 + 100 = 225','225 + 48 = ?']});expect(frame('M6-DP-009','moose').groups).toBeUndefined();
  expect(frame('M6-FR-015','moose').strips[1].segments.every(s=>!s.selected)).toBe(true);expect(frame('M6-FR-015','explanation').strips[1].segments.filter(s=>s.selected)).toHaveLength(6);
  expect(frame('M6-NS-014','minnie').ranges).toBeUndefined();expect(frame('M6-NS-014','moose').ranges).toBeUndefined();expect(frame('M6-NS-014','explanation').ranges).toEqual([{from:7500,to:8499}]);
  expect(support.renderVisual(q('M6-MO-011').visual,'question')).not.toContain('Betaald');
  expect(frame('M6-DP-014','moose').rows[2][1]).toBe('?');expect(frame('M6-DP-014','explanation').rows[2][1]).toBe('120');
});
