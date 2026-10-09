// Import/verification only. Educational prose is extracted verbatim from the approved source.
const fs = require('fs');
const path = require('path');
const source = fs.readFileSync(path.join(__dirname, 'content/runenpoort-m6-approved.md'), 'utf8').replaceAll('\r\n', '\n');
const visuals = require('./content/runenpoort-m6-visuals.json');
const quality = require('./content/atlas-m6-quality.cjs');
const placements = {
  BR: [[2,'shieldWall',3],[1,'steen',3],[2,'shieldWall',3],[3,'mooringRope',3],[3,'harborMap',3],[2,'fireBowl',2]],
  OP: [[1,'zon',1],[3,'harborMap',1],[2,'shieldWall',2],[2,'shipModel',1],[2,'mapTable',3],[1,'steen',1]],
  GE: [[1,'zon',2],[1,'wind',3],[2,'shipModel',2],[3,'harborMap',2],[2,'mapTable',1],[2,'shipModel',2]],
  TI: [[3,'shipCompass',1],[2,'fireBowl',4],[3,'harborMap',4],[2,'shieldWall',4],[3,'shipCompass',1],[3,'harborMap',4]]
};
const expectedIds = Object.keys(placements).flatMap(group => Array.from({length:6}, (_, i) => `RP-M6-${group}-${String(i+1).padStart(3,'0')}`));
function readApproved() {
  return expectedIds.map(id => {
    const group = id.split('-')[2], index = Number(id.slice(-3)) - 1;
    const block = source.split(`## ${id} — `)[1]?.split(/\n## /)[0];
    if (!block) throw new Error(`Missing approved content: ${id}`);
    const field = name => block.match(new RegExp(`\\*\\*${name}:\\*\\* (.*)`))?.[1].trim();
    const section = name => block.split(`### ${name}`)[1]?.split('\n\n').slice(1).join('\n\n').split(/\n### |\n---/)[0].trim();
    const prompt = section('Vraag — exacte tekst');
    const explanationSteps = section('Volledige uitleg — exacte tekst, per stap').split(/\n\s*\n/);
    const meta = block.split('### Vraag')[0];
    const allowed = (meta.match(/\*\*Toegestane[^\n]+/)?.[0].match(/`([^`]+)`/g) || []).map(s => s.slice(1,-1));
    const mc = field('Antwoordmodus') === 'meerkeuze';
    const answer = mc ? field('Correct antwoord').replaceAll('`','') : Number(field('Canoniek antwoord in centen') || field('Canoniek antwoord') || field('Correct antwoord').match(/^\d+/)[0]);
    const unit = field('Eenheid naast het invoerveld') || (group === 'BR' ? field('Correct antwoord').replace(/^\d+ /,'') : '');
    const answerDisplay = field('Antwoord voor weergave') || field('Correct antwoord').replaceAll('`','');
    const instructions = section(group === 'BR' ? 'Visuele specificatie' : 'Weergavespecificatie');
    const visualInstructions = Object.fromEntries([...instructions.matchAll(/\*\*Bij (?:de )?(vraag|Minnie|Moose|(?:de )?volledige uitleg):\*\* ([\s\S]*?)(?=\n\n|$)/g)].map(m => [m[1] === 'vraag' ? 'question' : m[1].includes('uitleg') ? 'explanation' : m[1].toLowerCase(), m[2]]));
    const question = {
      id, domain:'math', schoolBand:'M6-intended', learningLevel:'M6', contentVersion:field('Versie'), difficulty:Math.floor(index/2)+1,
      family:{BR:'fraction_quantity',OP:'addition',GE:'money_change',TI:'time_duration'}[group],
      presentation:field('Vorm') === 'kale som' ? 'bare' : 'story', answerMode:mc?'multipleChoice':'open',
      prompt, answer, answerDisplay,
      answerSpec: { type:mc?'choice':group==='GE'?'euro':'wholeNumber', ...(mc ? {} : {allowedForms:allowed.length?allowed:[String(answer)]}), ...(unit && unit !== 'geen' ? {unit} : {}) },
      ...(mc ? {choices:[...meta.matchAll(/^- `([^`]+)`/gm)].map(m=>m[1])} : {}),
      learningObjective:field('Leerdoel'), reportLabel:field('Rapportagelabel'),
      hintMinnie:section('Minnie — exacte tekst'), hintMoose:section('Moose — exacte tekst'),
      explanation:explanationSteps.join('\n\n'), authoredSupport:{explanationSteps},
      visual:{...visuals[id], instructions:visualInstructions}
    };
    const [level,challenge,slot] = placements[group][index];
    return {levelId:`LVL-${String(level).padStart(4,'0')}`, challengeId:challenge, slotId:`${challenge}-slot-${slot}`, question:require('./content/atlas-time-recalibration.cjs').correctQuestion(quality.correctOriginal(question))};
  });
}
function makeRecords() {
  // Fixed numerical cores from the original import; context corrections never
  // infer arithmetic from prose or create new surfaces/IDs.
  const values={
    BR:[[12,1,2,false],[20,1,4,false],[20,3,4,false],[18,2,3,false],[35,2,5,true],[40,3,8,true]].map(([total,numerator,denominator,remainder])=>({total,fraction:{numerator,denominator},remainder})),
    OP:[[240,130],[320,250],[368,247],[475,168],[1475,638],[2687,756]].map(operands=>({operation:'addition',operands})),
    GE:[[[150],200],[[320],400],[[675],1000],[[1240],2000],[[475,350],1000],[[680,765],2000]].map(([pricesCents,paidCents])=>({pricesCents,paidCents})),
    TI:[{start:'09:20',end:'09:50'},{start:'10:10',end:'10:35'},{start:'14:35',end:'15:10'},{start:'11:45',end:'12:25'},{start:'13:50',durationMinutes:85},{end:'16:20',durationMinutes:95}]
  };
  return readApproved().map(({question:q})=>{
    const {prompt,answerDisplay,hintMinnie,hintMoose,explanation,authoredSupport,visual,answer,answerSpec,choices,...meta}=q;
    const group=q.id.split('-')[2],index=Number(q.id.slice(-3))-1;
    return {...meta,educationalDomain:quality.domains[group],educationalCore:{values:require('./content/atlas-time-recalibration.cjs').definitions[q.id]?.values||values[group][index],question:{answer,answerSpec,...(choices?{choices}:{})}},surfaces:[{id:'original',prompt,answerDisplay,hintMinnie,hintMoose,explanation,authoredSupport,visual}]};
  });
}
function validatePilot(levels, bank = require('../src/content/m6').bank) {
  const errors = [], expected = readApproved();
  const embedded = levels.flatMap(l => (l.learningChallenges||[]).flatMap(c => c.questions.flatMap(s => (s.variants||[]).filter(q=>q.learningLevel === 'M6'))));
  if (embedded.length) errors.push('M6 production content belongs only in the central bank, never in level slots.');
  const pilotIds = bank.metadata.map(e=>e.id).filter(id=>id.startsWith('RP-M6-')).sort();
  if (JSON.stringify(pilotIds) !== JSON.stringify([...expectedIds].sort())) errors.push('The migrated Runenpoort collection must contain exactly the 24 approved IDs, once each.');
  for (const {question:approved} of expected) {
    const selected = bank.recover(approved.id);
    if (!selected) { errors.push(`${approved.id}: missing central record`); continue; }
    const {centralQuestionId,surfaceId,educationalCore,educationalDomain,...question} = selected;
    if(educationalDomain!==quality.domains[approved.id.split('-')[2]])errors.push(`${approved.id}: noncanonical educational domain.`);
    if(bank.get(approved.id).surfaces.length!==1 || surfaceId!=='original')errors.push(`${approved.id}: genericize in place; no legacy surface.`);
    // Source placement was intentionally retired; every educational field remains exact.
    if (!require('util').isDeepStrictEqual(JSON.parse(JSON.stringify(question)),approved)) errors.push(`${approved.id}: approved content or stage disclosure differs from the import contract.`);
  }
  for(const record of makeRecords())if(!require('util').isDeepStrictEqual(JSON.parse(JSON.stringify(bank.get(record.id)||null)),record))errors.push(`${record.id}: central core or generic surface differs from current approval.`);
  return errors;
}
module.exports = {readApproved, makeRecords, validatePilot, expectedIds};
