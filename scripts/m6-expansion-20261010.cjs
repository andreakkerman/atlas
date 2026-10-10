// Build-time import of the single approved 60-question source. No gameplay generation.
const fs=require('node:fs'),path=require('node:path'),{isDeepStrictEqual}=require('node:util');
const sourcePath=path.join(__dirname,'content/atlas-m6-expansion-20261010-approved.md');
const source=fs.readFileSync(sourcePath,'utf8').replaceAll('\r\n','\n');
const domains={ME:'measurementGeometry',DP:'dataPatterns',MD:'multiplicationDivision',NS:'numberSense',FR:'fractionsRatios',MO:'money',TI:'time',AS:'additionSubtraction'};
const ranges={ME:[8,16],DP:[7,15],MD:[11,16],NS:[9,14],FR:[11,22],MO:[9,14],TI:[19,24],AS:[9,14]};
const expectedIds=Object.entries(ranges).flatMap(([prefix,[a,b]])=>Array.from({length:b-a+1},(_,i)=>`M6-${prefix}-${String(a+i).padStart(3,'0')}`));
// Markdown code fences mark inline maths in this source, not learner-visible punctuation.
const prose=s=>(s||'').trim().replaceAll('`','').replace(/ +$/gm,'');
const plain=s=>prose(s).replaceAll('**','');
function readApproved(){
  return [...source.matchAll(/^### (M6-([A-Z]+)-\d{3}) — D([123]) [^—]+ — ([^\n]+)\n([\s\S]*?)(?=^---|$(?![\s\S]))/gm)].map(([,id,prefix,difficulty,title,block])=>{
    const field=name=>block.match(new RegExp(`^\\*\\*${name}:\\*\\* (.*)$`,'m'))?.[1]?.trim()||'';
    const section=name=>block.match(new RegExp(`^\\*\\*${name}\\*\\* *\\n([\\s\\S]*?)(?=^\\*\\*(?:Vraag|Minnie|Moose|Volledige uitleg|Visual|Antwoordopties|[A-Za-z][^*\\n]*:)\\*\\*|$(?![\\s\\S]))`,'m'))?.[1]?.trim()||'';
    const answerMode=plain(field('Answer mode')),rawAnswer=field(answerMode==='multipleChoice'?'Correct antwoord':'Antwoord');
    const answerText=plain(rawAnswer.match(/`([^`]+)`/)?.[1]||rawAnswer);
    const euro=answerMode==='open'&&answerText.startsWith('€');
    const moneyParts=answerText.slice(1).split(',');
    const answer=answerMode==='multipleChoice'?answerText:euro?Number(moneyParts[0])*100+Number(moneyParts[1]):Number(answerText.replaceAll('.',''));
    const choices=section('Antwoordopties').split('\n').filter(s=>s.startsWith('- ')).map(s=>plain(s.slice(2).replace(/\s*\*\*\(correct\)\*\*/,'')));
    const tables=[...block.matchAll(/^\|[^\n]+\|\n\|[-:| ]+\|\n(?:\|[^\n]+\|(?:\n|$))+/gm)].map(m=>m[0].trim().split('\n').map(r=>r.split('|').slice(1,-1).map(c=>plain(c.trim()))));
    const unit=euro?'':plain(rawAnswer.replace(/`[^`]+`/,''));
    return {id,title,domain:domains[prefix],objective:plain(field('Objective')),difficulty:Number(difficulty),answerMode,
      prompt:prose(section('Vraag')),hintMinnie:prose(section('Minnie')),hintMoose:prose(section('Moose')),explanation:prose(section('Volledige uitleg')),
      answer,
      answerDisplay:plain(rawAnswer),answerSpec:answerMode==='multipleChoice'?{type:'choice'}:{type:euro?'euro':'wholeNumber',allowedForms:[euro?answerText.slice(1):String(answer),...(!euro&&answerText!==String(answer)?[answerText]:[])],...(!euro?{grouping:true}:{}),...(unit?{unit}:{})},
      ...(choices.length?{choices}:{}),visualType:plain(field('Visual'))==='geen'?'none':plain(field('Visual')),instructions:section('Visual'),
      ...(tables.length?{table:{columns:tables[0][0],rows:tables[0].slice(2)}}:{})};
  });
}
function fractionParts(value){
  if(!/\d+\/\d+/.test(value))return value;
  const parts=[],re=/\*\*([\s\S]*?)\*\*|(\d+)\/(\d+)/g;let end=0;
  for(const m of value.matchAll(re)){if(m.index>end)parts.push(value.slice(end,m.index));parts.push(m[1]!==undefined?{strong:fractionParts(m[1])}:{numerator:+m[2],denominator:+m[3]});end=m.index+m[0].length;}
  if(end<value.length)parts.push(value.slice(end));return parts;
}
function makeRecords(){
  const visuals=require('./content/atlas-m6-expansion-20261010-visuals.cjs');
  return readApproved().map(q=>({id:q.id,learningLevel:'M6',contentVersion:1,domain:'math',schoolBand:'M6-intended',difficulty:q.difficulty,
    educationalDomain:q.domain,learningObjective:q.objective,reportLabel:q.title,family:q.objective,presentation:'story',answerMode:q.answerMode,
    educationalCore:{values:{authored:q.prompt,task:require('./content/atlas-m6-expansion-20261010-cores.cjs')[q.id].core,...(q.table?{table:q.table}:{})},question:{answer:q.answer,answerSpec:q.answerSpec,...(q.choices?{choices:q.choices,choiceParts:Object.fromEntries(q.choices.map(c=>[c,fractionParts(c)]))}:{})}},
    surfaces:[{id:'original',prompt:fractionParts(q.prompt),answerDisplay:q.answerDisplay,hintMinnie:fractionParts(q.hintMinnie),hintMoose:fractionParts(q.hintMoose),explanation:q.explanation,
      authoredSupport:{explanationSteps:q.explanation.split(/\n\n/).map(fractionParts)},visual:{type:q.visualType,stages:visuals(q),instructions:q.instructions}}]}));
}
function validateExpansion(records){
  const errors=[],expected=makeRecords(),actual=records.filter(r=>expectedIds.includes(r.id));
  if(expected.length!==60||actual.length!==60||new Set(actual.map(r=>r.id)).size!==60)errors.push('The 20261010 expansion requires exactly the 60 approved IDs.');
  for(const r of expected)if(!expectedIds.includes(r.id)||!isDeepStrictEqual(records.find(a=>a.id===r.id),r))errors.push(`${r.id}: differs from approved 20261010 source/transcription.`);
  const numeric=require('./content/atlas-m6-expansion-20261010-cores.cjs');
  for(const r of actual)if(!numeric[r.id]||r.educationalCore.question.answer!==numeric[r.id].answer)errors.push(`${r.id}: arithmetic/choice does not match independently audited core.`);
  return errors;
}
function moduleText(){return `// Approved 60-question expansion. Source: scripts/content/atlas-m6-expansion-20261010-approved.md\n// Generated by scripts/m6-expansion-20261010.cjs; do not edit educational text here.\n(function(global){\n  const records = ${JSON.stringify(makeRecords(),null,2)};\n  if(typeof module !== 'undefined' && module.exports) module.exports=records;\n  (global.AtlasM6Modules ||= {})['expansion-20261010']=records;\n})(typeof window !== 'undefined' ? window : globalThis);\n`;}
if(require.main===module){
  const prior=require('../src/content/m6').records.filter(r=>!expectedIds.includes(r.id)),records=makeRecords();
  if(prior.length!==99||records.length!==60||records.some(r=>prior.some(p=>p.id===r.id)))throw Error('Unexpected baseline or colliding IDs.');
  const combined=[...prior,...records],errors=[...require('../src/m6-bank').validateRecords(combined),...validateExpansion(combined)];
  if(require('./m6-core-audit.cjs').auditCores(combined).duplicates.length)errors.push('Duplicate numerical educational core.');
  if(errors.length)throw Error(errors.join('\n'));
  fs.writeFileSync(path.join(__dirname,'../src/content/m6/expansion-20261010.js'),moduleText());
  console.log('Imported 60 approved records; existing modules untouched.');
}
module.exports={sourcePath,source,expectedIds,readApproved,makeRecords,validateExpansion,moduleText};
