const {test,expect}=require('@playwright/test');
const fs=require('fs'),vm=require('vm'),crypto=require('crypto');
const hints=require('../src/challenge-hints'),cap=require('../src/challenge-capabilities'),learning=require('../src/learning-levels');
const {records,bank}=require('../src/content/m6');
const baseline=require('./fixtures/e5-digital-support-baseline.json');
const expected=require('./fixtures/e5-digital-support-expected.json');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const load=id=>{const c={window:{}};vm.runInNewContext(fs.readFileSync(`Levels/${id}/level.js`,'utf8'),c);return JSON.parse(JSON.stringify(c.window.SVEN_LEVEL_DEFINITIONS[id]));};
const variants=level=>(level.learningChallenges||[]).flatMap(ch=>ch.questions.flatMap(s=>s.variants));
const clean=text=>text.toLocaleLowerCase('nl').normalize('NFD').replace(/\p{Diacritic}/gu,'');
const synthetic=(hour,minute,answer)=>({family:'clock_reading',visual:{type:'digitalClock',hour,minute},answer,explanation:'Original'});

test('all 60 digital E5 variants use reviewed minute/hour support without early answer leakage',()=>{
 const patterns={};let digital=0,analogue=0;
 for(const id of Object.keys(baseline.otherHints))for(const q of variants(load(id))){
  if(q.visual?.type==='clock')analogue++;
  if(q.visual?.type!=='digitalClock')continue;
  digital++;patterns[q.visual.minute]=(patterns[q.visual.minute]||0)+1;
  const e=expected[id+':'+q.id];expect(q).toEqual(e.question);
  expect(hints.resolve(id,q,'minnie')).toBe(e.minnie);
  expect(hints.resolve(id,q,'moose')).toBe(e.moose);
  expect(hints.resolveExplanation(id,q)).toBe(e.explanation);
  for(const text of [e.minnie,e.moose]){
   expect(text).not.toMatch(/wijzer|antwoordopties|kies dezelfde|undefined|NaN/);
   expect(clean(text)).not.toContain(clean(q.answer));
  }
  expect(e.moose).not.toBe(e.minnie);
  expect(e.explanation.endsWith(q.answer.toLocaleLowerCase('nl')+'.')).toBe(true);
  expect(learning.positionDomain([q])).toBe('time');
 }
 expect({digital,analogue,total:digital+analogue}).toEqual({digital:60,analogue:60,total:120});
 expect(patterns).toEqual({0:2,5:4,15:8,20:5,25:4,30:6,35:7,40:3,45:9,50:6,55:6});
 expect(Object.keys(expected)).toHaveLength(60);
});

test('all level data, other E5 hints, M6, routing, reporting, geometry and layout remain exact',()=>{
 for(const [file,digest]of Object.entries(baseline.sources))expect(hash(fs.readFileSync(file)),file).toBe(digest);
 for(const [id,digest]of Object.entries(baseline.otherHints)){
  const other=variants(load(id)).filter(q=>q.visual?.type!=='digitalClock');
  expect(hash(JSON.stringify(other.map(q=>[q.id,hints.resolve(id,q,'minnie'),hints.resolve(id,q,'moose')]))),id).toBe(digest);
  for(const q of other){expect(hints.resolveExplanation(id,q)).toBe(q.explanation);expect(hints.resolveClockVisual(id,q,'moose')).toBe(q.visual);}
 }
 for(const r of records)for(const surface of r.surfaces){
  const q=bank.recover(r.id,surface.id);
  expect(hints.resolveExplanation('LVL-0003',q)).toBe(q.explanation);
  expect(hints.resolveClockVisual('LVL-0003',q,'minnie')).toBe(q.visual);
  expect(hints.resolve('LVL-0003',q,'minnie')).toBe(q.hintMinnie);
  expect(hints.resolve('LVL-0003',q,'moose')).toBe(q.hintMoose);
 }
});

test('12:05 follows the approved wording; :00 uses the separately approved template',()=>{
 const q=synthetic(12,5,'Vijf over twaalf');
 expect(hints.resolve('LVL-0033',q,'minnie')).toBe('Kijk naar de minuten rechts van de dubbele punt. 05 betekent dat er 5 minuten voorbij het hele uur zijn.');
 expect(hints.resolve('LVL-0033',q,'moose')).toBe('Links staat 12. Het is dus 5 minuten na twaalf. Hoe zeg je 5 minuten na twaalf in woorden?');
 expect(hints.resolveExplanation('LVL-0033',q)).toBe('De digitale klok geeft 12:05 aan. De 05 betekent 5 minuten na het hele uur. Het hele uur is twaalf uur. Daarom is 12:05 vijf over twaalf.');
 expect(hints.resolveExplanation('LVL-0017',synthetic(9,0,'Negen uur'))).toBe('De digitale klok geeft 09:00 aan. De 00 betekent dat er nog geen minuten na het hele uur voorbij zijn. Daarom is 09:00 negen uur.');
});

for(const [hour,next]of [[9,'tien'],[10,'elf'],[11,'twaalf'],[12,'één'],[16,'vijf'],[19,'acht'],[20,'negen'],[23,'twaalf']]){
 test(`${hour}: next-hour and Dutch half-hour relationships remain correct`,()=>{
  for(const [minute,answer]of [[25,`Vijf voor half ${next}`],[30,`Half ${next}`],[35,`Vijf over half ${next}`],[45,`Kwart voor ${next}`],[55,`Vijf voor ${next}`]]){
   const q=synthetic(hour,minute,answer),moose=hints.resolve('LVL-0033',q,'moose'),explanation=hints.resolveExplanation('LVL-0033',q);
   expect(moose).toContain(next);expect(clean(moose)).not.toContain(clean(answer));
   expect(explanation).toContain(answer.toLocaleLowerCase('nl'));
   if(minute<=35)expect(explanation).toContain('half '+next);
   if(hour>12){expect(moose).toContain(`Na ${hour} uur komt ${(hour+1)%24} uur.`);expect(moose).toContain(`In gewone kloktaal is dat ${next} uur.`);}
   expect(moose+explanation).not.toMatch(/middag|avond/);
  }
 });
}

test('shared renderer emphasizes minutes, then hours, then resets without changing its geometry or input',()=>{
 for(const {question:q}of Object.values(expected)){
  const before=JSON.stringify(q);
  for(const stage of ['question','minnie','moose','explanation']){
   const frame=hints.resolveClockVisual('LVL-0033',q,stage),html=cap.renderClockVisual(frame);
   const digits=[...html.matchAll(/data-clock-digit="(\d)" class="([^"]*)"/g)];
   expect(digits).toHaveLength(4);
   expect(digits.map((d,i)=>d[2].includes('digitalClockFocus')?i:null).filter(i=>i!==null)).toEqual(stage==='minnie'?[2,3]:stage==='moose'?[0,1]:[]);
   expect(html).toContain('viewBox="0 0 300 100"');expect(frame.hour).toBe(q.visual.hour);expect(frame.minute).toBe(q.visual.minute);
  }
  expect(JSON.stringify(q)).toBe(before);
 }
});

test('explicit hint overrides remain exact; unapproved minute patterns fail instead of inventing support',()=>{
 const q={...synthetic(10,17,'test'),hintMinnie:'Authored Minnie',hintMoose:'Authored Moose'};
 expect(hints.resolve('LVL-0033',q,'minnie')).toBe(q.hintMinnie);expect(hints.resolve('LVL-0033',q,'moose')).toBe(q.hintMoose);
 for(const minute of [10,17,59])expect(()=>hints.resolve('LVL-0033',synthetic(10,minute,'test'),'minnie')).toThrow('No approved E5 digital-clock support pattern');
 expect(hints.resolveExplanation('LVL-9999',q)).toBe('Original');
});
