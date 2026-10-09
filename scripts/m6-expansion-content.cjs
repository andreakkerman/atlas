// Build-time transcription of the approved Markdown. Never loaded by gameplay.
const fs = require('node:fs');
const path = require('node:path');
const presentation = require('./content/atlas-m6-presentation.cjs');
const quality = require('./content/atlas-m6-quality.cjs');
const sourcePath = path.join(__dirname, 'content/atlas-m6-central-approved.md');
const source = fs.readFileSync(sourcePath, 'utf8').replaceAll('\r\n', '\n');
const counts = {NS:8, AS:8, MD:10, FR:10, MO:8, TI:18, ME:7, DP:6};
const expectedIds = Object.entries(counts).flatMap(([group,n]) => Array.from({length:n},(_,i)=>`M6-${group}-${String(i+1).padStart(3,'0')}`));
const clean = value => (value || '').trim();
const plain = value => value.replaceAll('**','').replaceAll('`','');
const addendum = fs.readFileSync(path.join(__dirname,'content/atlas-m6-visual-addendum.md'),'utf8').replaceAll('\r\n','\n');
function fractionParts(value) {
  if(!/\d+\/\d+/.test(value))return value;
  const parts=[],pattern=/\*\*([\s\S]*?)\*\*|(\d+)\/(\d+)/g;let end=0;
  for(const m of value.matchAll(pattern)){if(m.index>end)parts.push(value.slice(end,m.index));parts.push(m[1]!==undefined?{strong:fractionParts(m[1])}:{numerator:Number(m[2]),denominator:Number(m[3])});end=m.index+m[0].length;}
  if(!parts.length)return value;if(end<value.length)parts.push(value.slice(end));return parts;
}
function promptParts(value,frame) {
  const match=value.match(/^\|[^\n]+\|\n\|[-:| ]+\|\n(?:\|[^\n]+\|(?:\n|$))+/m);
  if(!match)return value;
  return [value.slice(0,match.index),{table:{columns:frame.columns,rows:frame.rows},source:match[0]},value.slice(match.index+match[0].length)];
}
function readApproved() {
  return [...source.matchAll(/^## (M6-[A-Z]+-\d{3}) — ([^\n]+)\n([\s\S]*?)(?=^# |^## M6-|$(?![\s\S]))/gm)].map(([,id,title,block]) => {
    const field = name => clean(block.match(new RegExp(`^\\*\\*${name}:\\*\\* (.*)$`,'m'))?.[1]);
    const section = name => clean(block.match(new RegExp(`^### ${name}\\n([\\s\\S]*?)(?=^### |^---|$(?![\\s\\S]))`,'m'))?.[1]);
    const prose = value => clean(value.split(/^\*\*(?:Correct antwoord|Toegestane invoer):/m)[0]);
    const surfaceBlock = prose(section('Approved surfaces'));
    const surfaces = [...surfaceBlock.matchAll(/\*\*Surface `([^`]+)`\*\*\s*\n([\s\S]*?)(?=\n\*\*Surface |$(?![\s\S]))/g)].map(([,id,prompt])=>({id,prompt:clean(prompt)}));
    if (!surfaces.length) surfaces.push({id:'original',prompt:prose(section('Vraag'))});
    const instructionText = section('Visual stages');
    const instructions = Object.fromEntries([...instructionText.matchAll(/\*\*(Vraag|Minnie|Moose|Uitleg):\*\* ([\s\S]*?)(?=\n\*\*|$(?![\s\S]))/g)].map(([,key,text])=>[{Vraag:'question',Minnie:'minnie',Moose:'moose',Uitleg:'explanation'}[key],clean(text)]));
    if(!instructionText && ['M6-MD-002','M6-MD-003','M6-MD-004'].includes(id)) {
      const part=addendum.split(`## ${id} — `)[1].split('\n## ')[0];
      for(const [key,text] of [...part.matchAll(/### (Question|Minnie|Moose|Explanation)\n([\s\S]*?)(?=\n### |$(?![\s\S]))/g)].map(m=>[m[1].toLowerCase(),clean(m[2])]))instructions[key]=text;
    }
    const mode = field('answerMode'), correct = plain(field('Correct antwoord'));
    const answer = mode==='multipleChoice' ? correct : mode==='currencyCompose' ? Number(field('targetCents')) : Number(correct.split(' cent')[0].replaceAll('.',''));
    const forms = [...field('Toegestane invoer').matchAll(/`([^`]+)`/g)].map(m=>m[1]);
    const choices = section('Antwoordopties').split('\n').filter(s=>s.startsWith('- ')).map(s=>plain(s.slice(2).trim()));
    const denominations = [...section('Currency interaction').matchAll(/^- (\d+) cent/gm)].map(m=>Number(m[1]));
    const currencyMode = field('visual').split('/')[1];
    const answerSpec = mode==='multipleChoice' ? {type:'choice'} : mode==='currencyCompose' ? {type:'currency',mode:currencyMode,denominations,...(currencyMode==='change'?{priceCents:Number(field('priceCents')),paidCents:Number(field('paidCents'))}:{targetCents:answer})} : {type:mode==='structuredMoney'?'euro':'wholeNumber',allowedForms:forms.length?forms:[mode==='structuredMoney'?`${Math.floor(answer/100)},${String(answer%100).padStart(2,'0')}`:String(answer)],...(mode==='openWholeNumber'&&(/\d[. ]\d{3}/.test(correct)||forms.some(f=>/\d[. ]\d{3}/.test(f)))?{grouping:true}:{}),...(field('answerUnit')?{unit:field('answerUnit')}:{})};
    const explanation = section('Volledige uitleg');
    return {id,title,learningLevel:field('learningLevel'),difficulty:Number(field('difficulty')[0]),domain:field('domain'),objective:field('objective'),reportLabel:field('reportLabel'),mode,visualType:field('visual'),
      core:section('Educational core'),surfaces,answer,answerDisplay:correct || `€${Math.floor(answer/100)},${String(answer%100).padStart(2,'0')}`,answerSpec,...(choices.length?{choices}:{}),
      hintMinnie:section('Minnie'),hintMoose:section('Moose'),explanation,instructions,
      clock:field('hour')?{hour:Number(field('hour')),minute:Number(field('minute'))}:null,
      currencyItems:[...section('Currency visual').matchAll(/^- (\d+) × (\d+) cent/gm)].map(m=>({denomination:Number(m[2]),count:Number(m[1])}))};
  }).map(quality.correctExpansion);
}
function makeRecords(visuals) {
  visuals={...visuals,...quality.replacementVisuals};
  return readApproved().map(q=>({
    id:q.id,learningLevel:q.learningLevel,contentVersion:quality.contentVersion(q.id,presentation.contentVersion(q.id)),domain:'math',schoolBand:'M6-intended',difficulty:q.difficulty,
    educationalDomain:q.domain,learningObjective:q.objective,reportLabel:q.reportLabel,family:q.objective,presentation:'story',
    answerMode:q.mode==='multipleChoice'?'multipleChoice':q.mode==='currencyCompose'?'currencyCompose':'open',
    educationalCore:{values:{authored:q.core||q.surfaces[0].prompt},question:{answer:q.answer,answerSpec:q.answerSpec,...(q.choices?{choices:q.choices,...(q.id==='M6-FR-001'?{choiceParts:Object.fromEntries(q.choices.map(c=>[c,fractionParts(c)]))}:{})}:{})}},
    surfaces:q.surfaces.map(s=>{
      const copy=presentation.presentSupport(q,s.id);
      return {...s,prompt:promptParts(s.prompt,visuals[q.id].stages.question),answerDisplay:q.answerDisplay,...copy,
        authoredSupport:{explanationSteps:copy.explanation.split(/\n\s*\n/).map(step=>q.domain==='fractionsRatios'?fractionParts(step):step)},
        visual:{...presentation.presentVisual(q.id,visuals[q.id]),instructions:q.instructions}};
    })
  })).map(require('./content/atlas-time-recalibration.cjs').correctRecord);
}
function validateExpansion(records) {
  const {isDeepStrictEqual}=require('node:util');
  const approved=makeRecords(require('./content/atlas-m6-expansion-visuals.cjs'));
  const actual=records.filter(r=>expectedIds.includes(r.id)),errors=[];
  if(actual.length!==75 || new Set(actual.map(r=>r.id)).size!==75)errors.push('Expansion requires all 75 approved IDs exactly once.');
  for(const record of approved)if(!isDeepStrictEqual(records.find(r=>r.id===record.id),record))errors.push(`${record.id}: content differs from approved Markdown/addendum/visual transcription and authorized presentation corrections.`);
  return errors;
}
module.exports={sourcePath,source,expectedIds,readApproved,makeRecords,validateExpansion};
