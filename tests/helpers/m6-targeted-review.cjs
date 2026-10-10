// Independent literals from the seven-ID approval. Historical tests restore
// only these fields; m6-targeted-review.spec checks the entire current records.
const before=require('../fixtures/m6-targeted-review-baseline.json');
const difficultyIds=['M6-TI-003','M6-TI-005','M6-TI-006'];
const moose={
  'M6-NS-002':'Van **3, 8, 5 en 7** is **8** het grootste, dus die staat vooraan. Kijk nu naar de cijfers **7, 5 en 3**: welk daarvan hoort op de volgende plek met de grootste waarde?',
  'M6-NS-005':'Het midden is **6.450**. **6.451** ligt daar net boven. Bedenk nu welk van de twee honderdtallen daardoor het dichtst bij 6.451 ligt.',
  'M6-NS-006':'Het midden is **8.500**. **8.620** ligt boven dat midden. Bedenk nu welk van de twee duizendtallen het dichtst bij 8.620 ligt.',
  'M6-MD-002':'Denk aan de keersom **16 × ? = 160**. Je weet dat **16 × 5 = 80**. En 160 is twee keer zoveel als 80. Wat betekent dat voor het aantal groepjes?'
};
const mooseVisual={groups:[{lines:['16 × ? = 160','16 × 5 = 80','160 = 2 × 80']}]};
const ids=[...Object.keys(moose),...difficultyIds];
function beforeTargetedReview(record){
  if(!ids.includes(record.id))return record;
  const result=structuredClone(record),old=before.changedBefore[record.id];
  result.contentVersion=old.contentVersion;
  if(difficultyIds.includes(record.id))result.difficulty=old.difficulty;
  if(moose[record.id])for(const s of result.surfaces){
    const previous=old.surfaces.find(p=>p.id===s.id);
    s.hintMoose=previous.hintMoose;
    if(record.id==='M6-MD-002')s.visual.stages.moose=structuredClone(previous.mooseVisual);
  }
  return result;
}
function currentExpansion(q){
  return {...q,...(moose[q.id]?{hintMoose:moose[q.id]}:{}),...(difficultyIds.includes(q.id)?{difficulty:2}:{})};
}
module.exports={ids,difficultyIds,moose,mooseVisual,beforeTargetedReview,currentExpansion};
