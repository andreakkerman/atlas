// Keep the original E5/source assertions intact while excluding only the 24
// explicitly approved insertions. The pilot suite validates each insertion exactly.
const {readApproved,expectedIds}=require('../../scripts/runenpoort-m6-content.cjs');
const ids=new Set(expectedIds);
function withoutPilot(level){
  for(const challenge of level.learningChallenges||[])for(const slot of challenge.questions)slot.variants=slot.variants.filter(q=>!ids.has(q.id));
  return level;
}
function withoutPilotSource(source){
  let text=source.replaceAll('\r\n','\n');
  for(const {question} of readApproved())text=text.replace(',\n'+JSON.stringify(question,null,2).split('\n').map(line=>'            '+line).join('\n'),'');
  return text;
}
module.exports={withoutPilot,withoutPilotSource};
