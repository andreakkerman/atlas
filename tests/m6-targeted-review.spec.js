const {test,expect}=require('@playwright/test');
const fs=require('node:fs'),crypto=require('node:crypto');
const {records:productionRecords,bank}=require('../src/content/m6');
const currentFreeze=require('./fixtures/m6-expansion-20261010-baseline.json');
const records=productionRecords.filter(r=>currentFreeze.records[r.id]);
const support=require('../src/challenge-support'),hints=require('../src/challenge-hints');
const before=require('./fixtures/m6-targeted-review-baseline.json');
const {ids,difficultyIds,moose,mooseVisual,beforeTargetedReview}=require('./helpers/m6-targeted-review.cjs');
const canonical=x=>x&&typeof x==='object'?Array.isArray(x)?x.map(canonical):Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
// Frozen extends only the exact level-ID hint opt-in; preserve the complete historical resolver check.
const bytes=p=>crypto.createHash('sha256').update(p==='src/challenge-hints.js'
  ? fs.readFileSync(p,'utf8').replace('Array.from({ length: 39 }','Array.from({ length: 35 }') : fs.readFileSync(p)).digest('hex');

test('all 99 cores and full records remain exact outside the seven explicitly approved field changes',()=>{
  expect(records).toHaveLength(99);
  expect(records.map(r=>r.id)).toEqual(Object.keys(before.records));
  const changed=[];
  for(const r of records){
    expect(hash(r.educationalCore),r.id+'/core').toBe(before.records[r.id].coreHash);
    if(hash(r)!==before.records[r.id].hash)changed.push(r.id);
    if(ids.includes(r.id)){
      expect(r.contentVersion,r.id).toBe(before.changedBefore[r.id].contentVersion+1);
      if(difficultyIds.includes(r.id))expect(r.difficulty).toBe(2);
      if(moose[r.id])for(const s of r.surfaces){
        expect(s.hintMoose,r.id+'/'+s.id).toBe(moose[r.id]);
        if(r.id==='M6-MD-002')expect(s.visual.stages.moose).toEqual(mooseVisual);
      }
    }
    // Undo ONLY the approved version/difficulty/Moose fields before comparing
    // the complete record, preserving every prompt, answer, choice and full explanation.
    expect(hash(beforeTargetedReview(r)),r.id+'/complete record').toBe(before.records[r.id].hash);
  }
  expect(changed.sort()).toEqual([...ids].sort());
});

test('all E5 source/resolved support, level data, planner, routing and reporting remain unchanged',()=>{
  // The subsequent authorized UX/capability additions supersede raw shared-UI
  // file hashes. The current expansion fixture freezes all 99 rendered records,
  // all E5 output, and the still-unchanged state/planner/reporting implementation.
  for(const [file,digest]of Object.entries({...before.levels,...currentFreeze.protectedFiles}))expect(bytes(file),file).toBe(digest);
  // The historical snapshot contains the original 35 levels, before Frozen Atlas.
  const resolved=require('../scripts/level-utils').loadAllLevels().filter(({entry})=>Object.hasOwn(before.levels,`Levels/${entry.id}/level.js`)).flatMap(({entry,level})=>(level.learningChallenges||[])
    .flatMap(c=>(c.questions||[]).flatMap(s=>(s.variants||[]).map(q=>[
      entry.id,c.id,s.id,q,hints.resolve(entry.id,q,'minnie'),hints.resolve(entry.id,q,'moose'),hints.resolveExplanation(entry.id,q)
    ]))));
  expect(resolved).toHaveLength(960);
  expect(hash(resolved)).toBe(before.resolvedE5Hash);
});

test('approved full-bank and time difficulty totals are exact',()=>{
  const count=rows=>rows.reduce((a,r)=>(a[r.difficulty]++,a),{1:0,2:0,3:0});
  expect(count(records)).toEqual({1:42,2:37,3:20});
  const time=records.filter(r=>r.educationalDomain==='time');
  expect(time).toHaveLength(24);
  expect(count(time)).toEqual({1:7,2:12,3:5});
  expect(count(records.filter(r=>r.id.startsWith('M6-')))).toEqual({1:34,2:29,3:12});
});

test('both MD-002 surfaces keep the final factor hidden through Moose and render exactly the three approved equations',()=>{
  const r=bank.get('M6-MD-002');
  expect(r.surfaces.map(s=>s.id)).toEqual(['pages','packs']);
  for(const s of r.surfaces){
    const q=bank.recover(r.id,s.id);
    expect(q.hintMoose).toBe(moose[r.id]);
    const html=support.renderVisual(q.visual,'moose');
    for(const line of mooseVisual.groups[0].lines)expect(html).toContain(line);
    expect(q.visual.stages.moose).toEqual(mooseVisual);
    for(const stage of ['question','minnie','moose']){
      const text=[stage==='question'?q.prompt:stage==='minnie'?q.hintMinnie:q.hintMoose,support.renderVisual(q.visual,stage)].join('\n');
      expect(text,`${s.id}/${stage}`).not.toMatch(/\b10\b|\btien\b/i);
    }
    expect(support.renderVisual(q.visual,'explanation')).toContain('16 × 10 = 160');
    expect(q.answer).toBe(10);
    expect(bank.recover(r.id,s.id)).toEqual(q);
  }
});

test('NS Moose hints retain a meaningful final ordering/rounding step without giving the answer',()=>{
  for(const [id,hidden,pending]of [
    ['M6-NS-002',/8[.]?753|8,?\s*7,?\s*5,?\s*3/,'welk daarvan hoort op de volgende plek met de grootste waarde?'],
    ['M6-NS-005',/6[.]?500/,'Bedenk nu welk van de twee honderdtallen daardoor het dichtst bij 6.451 ligt.'],
    ['M6-NS-006',/9[.]?000/,'Bedenk nu welk van de twee duizendtallen het dichtst bij 8.620 ligt.']
  ])for(const s of bank.get(id).surfaces){
    const q=bank.recover(id,s.id);
    expect(q.hintMoose).toBe(moose[id]);
    expect(q.hintMoose).toContain(pending);
    expect(q.hintMoose).not.toMatch(hidden);
    expect(bank.recover(id,s.id)).toEqual(q);
  }
});

test('offline re-import reproduces exactly the current expansion without cumulative version bumps',()=>{
  const source=require('../scripts/m6-expansion-content.cjs');
  const actual=records.filter(r=>r.id.startsWith('M6-'));
  for(let i=0;i<2;i++)expect(source.makeRecords(require('../scripts/content/atlas-m6-expansion-visuals.cjs'))).toEqual(actual);
  expect(source.validateExpansion(records)).toEqual([]);
  expect(require('../scripts/audit-m6.cjs').validateAndAudit().errors).toEqual([]);
});
