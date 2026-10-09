// Apply only the explicitly superseding 9 October time approval to expectations
// from older import/presentation tests. time-recalibration.spec independently
// checks its literal Markdown, arithmetic and the complete pre-change baseline.
const time=require('../../scripts/content/atlas-time-recalibration.cjs');
function currentExpansion(q){
 if(!time.ids.includes(q.id))return q;
 const r=time.replacement(q.id);
 return {...q,...r,objective:r.learningObjective,mode:r.answerMode,visualType:r.visual.type,
  surfaces:[{id:'original',prompt:r.prompt}],clock:null,currencyItems:[],instructions:undefined};
}
function beforeE5RepresentationChange(level){
 const copy=structuredClone(level),baseline=require('../fixtures/time-recalibration-baseline.json');
 for(const challenge of copy.learningChallenges||[])for(const slot of challenge.questions)for(const [i,q]of slot.variants.entries()){
  const previous=baseline.clockVariants[copy.id+':'+q.id];
  if(previous?.index===1)slot.variants[i]=structuredClone(previous.question);
 }
 return copy;
}
// Superseding digital-only support correction; historical analogue expectations
// and unrelated fingerprints remain frozen. These literals are not the resolver.
const digitalExpected=require('../fixtures/e5-digital-support-expected.json');
const expectedDigital=q=>Object.values(digitalExpected).find(e=>e.question.visual.hour===q.visual.hour&&e.question.visual.minute===q.visual.minute&&e.question.answer===q.answer);
const digitalMinnie=q=>expectedDigital(q).minnie;
const digitalMoose=q=>expectedDigital(q).moose;
const currentE5HintPairs=(id,pairs)=>pairs.map(pair=>{
 const expected=digitalExpected[id+':'+pair[0]];
 return expected?[pair[0],expected.minnie,expected.moose]:pair;
});
const currentE5Explanation=(id,q)=>digitalExpected[id+':'+q.id]?.explanation||q.explanation;
module.exports={time,currentExpansion,beforeE5RepresentationChange,digitalMinnie,digitalMoose,currentE5HintPairs,currentE5Explanation};
