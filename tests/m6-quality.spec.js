const {test,expect}=require('@playwright/test');
const crypto=require('node:crypto'),fs=require('node:fs');
const {records:productionRecords,bank}=require('../src/content/m6'),support=require('../src/challenge-support');
// Historical correction assertions still cover exactly their original 99 records.
const records=productionRecords.filter(r=>require('./fixtures/m6-expansion-20261010-baseline.json').records[r.id]);
const baseline=require('./fixtures/m6-quality-baseline.json');
const {auditCores}=require('../scripts/m6-core-audit.cjs');
const {time}=require('./helpers/time-approval.cjs');
const {beforeTargetedReview}=require('./helpers/m6-targeted-review.cjs');
const recalibrations={'M6-AS-004':2,'M6-TI-017':2,'M6-NS-008':1,'M6-AS-007':3,'M6-MO-007':3,'M6-FR-008':3,'M6-FR-010':2};
const replacements=['M6-MO-003','M6-MO-006','M6-TI-009','M6-TI-010','M6-TI-014','M6-TI-016'];
const canonical=x=>x&&typeof x==='object'?Array.isArray(x)?x.map(canonical):Object.fromEntries(Object.keys(x).sort().map(k=>[k,canonical(x[k])])):x;
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(canonical(x))).digest('hex');
const approval=fs.readFileSync('scripts/content/atlas-m6-quality-approved.md','utf8').replaceAll('\r\n','\n');

test('99 IDs, seven reclassifications, canonical domains and exact scoped version changes',()=>{
  const audit=require('../scripts/audit-m6.cjs').validateAndAudit();
  expect(audit.errors).toEqual([]);const originalInventory=require('../src/m6-bank').audit(records);
  expect(originalInventory.difficulty).toEqual({1:42,2:37,3:20});
  expect(originalInventory.domains).toEqual({numberSense:8,additionSubtraction:14,multiplicationDivision:10,fractionsRatios:16,money:14,time:24,measurementGeometry:7,dataPatterns:6});
  expect(records.map(r=>r.id)).toEqual(Object.keys(baseline));
  expect(records.filter(r=>r.difficulty===1&&r.educationalDomain!=='time')).toHaveLength(35);
  expect(records.filter(r=>r.difficulty===1&&r.educationalDomain==='time')).toHaveLength(7);
  for(const r of records.filter(r=>r.educationalDomain==='money'))expect(Number.isInteger(r.educationalCore.question.answer),r.id).toBe(true);
  // Keep the historical fingerprint checks; the seven superseding fields are
  // independently checked against the complete task-start records in m6-targeted-review.spec.
  for(const r of records.map(beforeTargetedReview)){
    const b=baseline[r.id],original=r.id.startsWith('RP-'),changed=original||replacements.includes(r.id)||r.id in recalibrations;
    expect(r.difficulty,r.id).toBe(recalibrations[r.id]||b.difficulty);
    if(time.ids.includes(r.id)){
      expect(bank.recover(r.id)).toMatchObject(time.replacement(r.id));
      expect(r.contentVersion).toBe(original?'0.3':b.contentVersion+(changed?1:0)+1);
      continue; // Exact old-core assertions below are superseded only for these 15 IDs.
    }
    expect(r.contentVersion,r.id).toBe(original?'0.2':b.contentVersion+(changed?1:0));
    expect(r.reportLabel,r.id).toBe(b.reportLabel);
    if(!changed)expect(hash(r),r.id).toBe(b.hash);
    if(!replacements.includes(r.id)){
      expect(r.educationalCore.values,r.id).toEqual(b.core.values);
      expect(r.educationalCore.question.answer,r.id).toEqual(b.core.question.answer);
      expect(r.educationalCore.question.choices,r.id).toEqual(b.core.question.choices);
      expect(r.surfaces[0].authoredSupport.explanationSteps).toHaveLength(b.stepCount);
    }
    if(original){expect(r.surfaces.map(s=>s.id)).toEqual(['original']);expect(r.surfaces[0].visual.type).toBe(b.visualType);}
    if(['RP-M6-OP-001','RP-M6-OP-003','RP-M6-OP-005'].includes(r.id))expect(hash(r.surfaces)).toBe(b.learnerHash);
  }
});

test('original 24 generic contexts and canonical objectives exactly match the approved targets',()=>{
  const section=approval.split('4. DIRECTLY GENERICIZE')[1].split('5. NORMALIZE')[0];
  const objectives=approval.split('6. NORMALIZE LEGACY OBJECTIVE METADATA')[1].split('7. FINAL NARRATIVE')[0];
  for(const r of records.filter(r=>r.id.startsWith('RP-'))){
    if(time.ids.includes(r.id)){expect(bank.recover(r.id)).toMatchObject(time.replacement(r.id));continue;}
    const q=bank.recover(r.id),block=section.split(r.id+'\n')[1].split(/\nRP-M6-|\n-+/)[0];
    const prompt=block.match(/\nQuestion:\n\n([^\n]+)/)?.[1];if(prompt)expect(q.prompt).toBe(prompt);
    const final=block.match(/\nFinal(?: explanation ends)?:\n([^\n]+)/)?.[1];if(final)expect(q.explanation.endsWith(final)).toBe(true);
    const objective=objectives.split(r.id+'\n')[1].trim().split('\n')[0];expect(q.learningObjective).toBe(objective);
    expect(JSON.stringify(q),r.id).not.toMatch(/Viking|Runenpoort|Eivar|schild|tempe[l]|vuurschaal|scheeps|schip|boottocht|muurtje|kade|aan boord|ingeladen|spijkers|planken/i);
    for(const frame of Object.values(q.visual.stages))expect(frame.symbol).not.toBe('shield');
  }
  expect(JSON.stringify(records)).not.toMatch(/Eivar/);
});

test('six replacements transcribe every approved surface, hint, explanation, answer and choices exactly',()=>{
  const expected=[
    ['M6-MO-003',30,['2,70','3,00','0,30']],['M6-MO-006',535,['14,65','20,00','5,35']],
    ['M6-TI-009',25,['08:25','08:50']],['M6-TI-010',30,['11:15','11:45']],
    ['M6-TI-014','10:20',['08:45','1 hour 35 minutes','10:20']],['M6-TI-016','15:25',['17:10','1 hour 45 minutes','15:25']]
  ];
  for(const [i,[id,answer,values]] of expected.entries()){
    if(time.ids.includes(id)){expect(bank.recover(id)).toMatchObject(time.replacement(id));continue;}
    const block=approval.split(`3${'ABCDEF'[i]}. ${id}\n`)[1].split(/\n3[A-F]\. M6-|\n4\. DIRECTLY/)[0];
    const r=bank.get(id);expect(r.educationalCore.question.answer).toBe(answer);
    for(const value of values)expect(r.educationalCore.values.authored).toContain(value);
    for(const surface of r.surfaces){
      const q=bank.recover(id,surface.id),promptStart=r.surfaces.length>1?`Surface \`${surface.id}\`:\n`:'Question:\n';
      expect(q.prompt).toBe(block.split(promptStart)[1].trim().split('\n\n')[0]);
      expect(q.hintMinnie).toBe(block.split('\nMinnie:\n')[1].split('\nMoose:')[0].trim());
      expect(q.hintMoose).toBe(block.split('\nMoose:\n')[1].split('\nFull explanation:')[0].trim());
      expect(q.explanation).toBe(block.split('\nFull explanation:\n')[1].split(/\nVisual:|\nUpdate the existing|\nTimeline stages:|\nTimeline:/)[0].trim());
      expect(q.authoredSupport.explanationSteps).toEqual(q.explanation.split('\n\n'));
      if(q.answerSpec.type==='euro'){
        expect(Number.isInteger(answer)).toBe(true);
        expect(support.parseAnswer(q,{euros:String(Math.floor(answer/100)),cents:String(answer%100)})).toMatchObject({valid:true,correct:true,interpreted:answer});
        expect(support.parseAnswer(q,{euros:'',cents:''}).valid).toBe(false);
        expect(support.parseAnswer(q,{euros:'50',cents:''})).toMatchObject({valid:true,correct:false,interpreted:5000});
      }else expect(support.parseAnswer(q,String(answer))).toMatchObject({valid:true,correct:true});
    }
  }
  expect(bank.recover('M6-TI-014').choices).toEqual(['09:20','10:10','10:20','10:30']);
  expect(bank.recover('M6-TI-016').choices).toEqual(['15:15','15:25','15:35','16:25']);
});

test('replacement visuals preserve intermediate support and disclose complete results only in explanation',()=>{
  const expectations={
    'M6-MO-003':['€2,70','100 − 70 = ? cent','30 cent = €0,30','€0,30'],
    'M6-MO-006':['€15,00','€15,00 → €20,00 = €5,00','€0,35 + €5,00 = €5,35','€5,35'],
    'M6-TI-009':['1 minuut = 60 seconden','300 : 60 = ?','300 : 60 = 5','300 : 60 = 5'],
    'M6-TI-010':['1 minuut = 60 seconden','4 × 60 = ?','4 × 60 = 240','4 × 60 = 240'],
    'M6-TI-014':['09:45','10:00','10:20','10:20'],
    'M6-TI-016':['16:10','16:00','15:25','15:25']
  };
  for(const [id,[minnie,moose,explanation,hidden]] of Object.entries(expectations)){
    const q=bank.recover(id);
    expect(support.renderVisual(q.visual,'minnie')).toContain(minnie);
    expect(support.renderVisual(q.visual,'moose')).toContain(moose);
    expect(support.renderVisual(q.visual,'explanation')).toContain(explanation);
    for(const stage of ['question','minnie','moose'])expect(support.renderVisual(q.visual,stage),id+'/'+stage).not.toContain(hidden);
  }
  for(const id of ['M6-TI-009','M6-TI-010'])expect(bank.recover(id).visual.type).toBe('calculationSteps');
  for(const f of Object.values(bank.recover('M6-TI-016').visual.stages))expect(f.direction).toBe('backward');
  expect(bank.recover('M6-TI-016').visual.stages.explanation).toMatchObject({nodes:['15:25','16:00','16:10','17:10'],jumps:['35 minuten','10 minuten','1 uur']});
});

test('all 132 resolved surfaces have consistent nouns and FR-008 uses the selected plural throughout',()=>{
  let count=0;
  for(const r of records)for(const s of r.surfaces){
    count++;const q=bank.recover(r.id,s.id);
    const text=[q.prompt,q.hintMinnie,q.hintMoose,q.explanation,...support.STAGES.map(stage=>support.renderVisual(q.visual,stage))].join('\n');
    expect(text,`${r.id}/${s.id}`).not.toMatch(/\bstuks\b|schaal of pakket|dozen of tafels|lampen of stoelen|rek of vak|rekken of vakken|flesjes of boeken|schalen of planken|\{\w+\}/);
    expect(bank.recover(r.id,s.id)).toEqual(q);
  }
  expect(count).toBe(132);
  for(const [surface,noun] of [['trays','schalen'],['packages','pakketten']]){
    const q=bank.recover('M6-FR-008',surface);
    expect(q.hintMoose).toContain(`Voor 7 ${noun}`);expect(q.explanation).toContain(`Daarna rekenen we voor 7 ${noun}`);
  }
});

test('numerical audit finds the six historical duplicate cores and none in the corrected 99',()=>{
  const old=structuredClone(records);
  for(const r of old)r.educationalCore=structuredClone(baseline[r.id].core);
  // Restore historical clock representations as well as historical cores;
  // the current records intentionally no longer ask these recognition questions.
  for(const r of old.filter(r=>baseline[r.id].visualType==='analogueClock'||baseline[r.id].visualType==='digitalClock')){
    r.surfaces[0].visual=structuredClone(require('../scripts/content/atlas-m6-expansion-visuals.cjs')[r.id]);
  }
  for(const [id,price,paid] of [['M6-MO-003','€3,20','€4,00'],['M6-MO-006','€12,40','€20,00']]){
    const frame=old.find(r=>r.id===id).surfaces[0].visual.stages.question;frame.items[0].amount=price;frame.paid=paid;
  }
  const historical=auditCores(old);expect(historical.duplicates).toHaveLength(6);
  expect(historical.duplicates.flat().filter(id=>id.startsWith('M6-')).sort()).toEqual([...replacements].sort());
  expect(auditCores(records)).toEqual({audited:99,duplicates:[]});
});
