const {test,expect}=require('@playwright/test');
const crypto=require('node:crypto');
const {records,bank}=require('../src/content/m6');
const {currentExpansion,time}=require('./helpers/time-approval.cjs');
const readApproved=()=>require('../scripts/m6-expansion-content.cjs').readApproved().map(currentExpansion);
const support=require('../src/challenge-support');
const visuals={...require('../scripts/content/atlas-m6-expansion-visuals.cjs'),...require('../scripts/content/atlas-m6-quality.cjs').replacementVisuals,...time.visuals};
const {surfaceEdits,expectedSupport,expectedVisualNotes}=require('./fixtures/m6-presentation-expectations.cjs');
const hash=value=>crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
const forbidden=/schaal of pakket|dozen of tafels|doos of bij één tafel|lampen of stoelen|rekken? of vak(?:ken)?|dozen of voertuigen|doos of voertuig|onderdelen of (?:mensen|plaatsen)|schalen of planken|schaal of plank|flesjes of boeken|kost of gebruikt|meenemen of inpakken|voorraadvariant|routevariant|\{[a-zA-Z]\w*\}/;

test('all 75 questions / 108 surfaces retain their exact core, prompts and selected-context support at every stage',()=>{
  const source=readApproved();let count=0,changed=0;const changedIds=new Set();
  expect(source).toHaveLength(75);
  for(const q of source)for(const surface of q.surfaces){
    count++;const actual=bank.recover(q.id,surface.id),expected=expectedSupport(q,surface.id);
    expect(actual.prompt).toBe(surface.prompt);
    for(const [key,value] of Object.entries(expected)){
      expect(actual[key],`${q.id}/${surface.id}/${key}`).toBe(value);
    }
    expect(actual.authoredSupport.explanationSteps).toEqual(expected.explanation.split(/\n\s*\n/));
    if(Object.keys(expected).some(key=>expected[key]!==q[key])){changed++;changedIds.add(q.id);}
    const rendered=[actual.prompt,actual.hintMinnie,actual.hintMoose,support.renderExplanation(actual),...support.STAGES.map(stage=>support.renderVisual(actual.visual,stage))].join('\n');
    expect(rendered,`${q.id}/${surface.id}`).not.toMatch(forbidden);
    expect(bank.recover(q.id,surface.id)).toEqual(actual);
  }
  expect(count).toBe(108);expect(changed).toBe(20);expect([...changedIds]).toEqual(Object.keys(surfaceEdits));
  // Current approved correction snapshot. m6-quality.spec independently limits
  // changes against the pre-correction numerical/record baseline.
  expect(hash(records.map(({surfaces,contentVersion,...r})=>r))).toBe('5fdef4d70e99749dd8cc2c294a0174598a40d06aa5032727a0e0ac70cd498153');
  expect(hash(records.filter(r=>r.id.startsWith('RP-')))).toBe('a084a3c455108d9ac0dacbbfa7918df87b24228de70a65498281f0f4b56f3d0c');
});

test('all 300 authored visual stages preserve useful diagrams and equations, with only four prose-note edits',()=>{
  let changed=0;
  for(const q of readApproved()){
    const actual=bank.recover(q.id),expected=structuredClone(visuals[q.id]);
    for(const [stage,notes] of Object.entries(expectedVisualNotes[q.id]||{})){
      changed++;
      const original=expected.stages[stage].notes;
      expected.stages[stage].notes=notes;
      const html=support.renderVisual(actual.visual,stage);
      for(const text of notes)expect(html).toContain(text);
      for(const text of original.filter(n=>!notes.includes(n)))expect(html).not.toContain(text.replaceAll('**',''));
      expect(html).toContain('currency');
    }
    // Exact comparison protects geometry, labels, values and disclosure at ALL stages.
    expect(actual.visual.stages,q.id).toEqual(expected.stages);
    for(const surface of q.surfaces)expect(bank.recover(q.id,surface.id).visual.stages).toEqual(expected.stages);
  }
  expect(changed).toBe(4);
  for(const id of Object.keys(expectedVisualNotes)){
    const q=bank.recover(id),original=readApproved().find(q=>q.id===id);
    expect(q.hintMinnie).toBe(original.hintMinnie);expect(q.hintMoose).toBe(original.hintMoose);expect(q.explanation).toBe(original.explanation);
    expect(q.visual.stages.question.notes).toBeUndefined();expect(q.visual.stages.minnie.notes).toBeUndefined();
    expect(support.renderVisual(q.visual,'explanation')).not.toContain('Elke andere');
    expect(q.explanation).toContain('Elke andere');
  }
  for(const record of records.filter(r=>r.id.startsWith('M6-'))){
    const prior=surfaceEdits[record.id]||expectedVisualNotes[record.id]?2:1;
    const changed=require('../scripts/content/atlas-m6-quality.cjs').changedExpansionIds.includes(record.id);
    expect(record.contentVersion).toBe(prior+(changed?1:0)+(time.ids.includes(record.id)?1:0));
  }
});
