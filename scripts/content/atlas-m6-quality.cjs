// Build-time only. Literal October 2026 corrections; no runtime generation.
// The approval is kept verbatim beside this transcription. Historical imports
// remain provenance, never alternative production surfaces.
const fs = require('node:fs');
const approval = fs.readFileSync(require('node:path').join(__dirname,'atlas-m6-quality-approved.md'),'utf8').replaceAll('\r\n','\n');
const difficulty = {'M6-AS-004':2,'M6-TI-017':2,'M6-NS-008':1,'M6-AS-007':3,'M6-MO-007':3,'M6-FR-008':3,'M6-FR-010':2};
const replacementIds = ['M6-MO-003','M6-MO-006','M6-TI-009','M6-TI-010','M6-TI-014','M6-TI-016'];
const changedExpansionIds = [...new Set([...Object.keys(difficulty),...replacementIds])];
const between = (text,start,end) => {
  const begin=text.indexOf(start);if(begin<0)throw Error(`Missing approved section: ${start}`);
  const body=text.slice(begin+start.length),finish=body.search(end);
  if(finish<0)throw Error(`Missing end of approved section: ${start}`);
  return body.slice(0,finish).trim();
};
const replacementBlocks = Object.fromEntries(replacementIds.map((id,i)=>[id,between(approval,`3${'ABCDEF'[i]}. ${id}\n`,/\n3[A-F]\. M6-|\n4\. DIRECTLY/).replace(/\n-+\s*$/,'').trim()]));
const answers = {'M6-MO-003':30,'M6-MO-006':535,'M6-TI-009':25,'M6-TI-010':30,'M6-TI-014':'10:20','M6-TI-016':'15:25'};
function correctExpansion(q) {
  q=structuredClone(q);
  if(difficulty[q.id])q.difficulty=difficulty[q.id];
  const block=replacementBlocks[q.id];if(!block)return q;
  q.core=between(block,'Educational core:\n',/\nCorrect canonical answer:|\nApproved surfaces:|\nQuestion:/);
  q.hintMinnie=between(block,'Minnie:\n',/\nMoose:/);
  q.hintMoose=between(block,'Moose:\n',/\nFull explanation:/);
  q.explanation=between(block,'Full explanation:\n',/\nVisual:|\nUpdate the existing|\nTimeline stages:|\nTimeline:/);
  q.surfaces=q.surfaces.map(s=>({...s,prompt:between(block,q.surfaces.length>1?`Surface \`${s.id}\`:\n`:'Question:\n',/\n\n/)}));
  q.answer=answers[q.id];
  if(q.answerSpec.type==='euro') {
    const amount=q.id==='M6-MO-003'?'0,30':'5,35';
    q.answerDisplay=`${q.answer} cents = €${amount}`.replace('cents','cent');
    q.answerSpec.allowedForms=[amount];
  } else q.answerDisplay=String(q.answer);
  if(q.choices)q.choices=between(block,'Choices:\n',/\nCorrect:/).split('\n').map(s=>s.replace(/^- /,''));
  q.instructions=structuredClone(visualInstructions[q.id]);
  return q;
}

const receipt=(price,paid,groups=[],change='?')=>({items:[{label:'Prijs',amount:price}],paid,change,highlight:[],groups});
const line=(nodes,jumps=[],extra={})=>({direction:'forward',nodes,jumps,...extra});
const replacementVisuals = {
  'M6-MO-003': {type:'moneyReceipt',stages:{
    question:receipt('€2,70','€3,00'),
    minnie:receipt('€2,70','€3,00',[{nodes:['€2,70','€3,00'],jumps:['?']}]),
    moose:receipt('€2,70','€3,00',[{lines:['100 − 70 = ? cent']}]),
    explanation:receipt('€2,70','€3,00',[{lines:['100 − 70 = 30 cent','30 cent = €0,30','€2,70 + €0,30 = €3,00']}],'€0,30')
  }},
  'M6-MO-006': {type:'moneyReceipt',stages:{
    question:receipt('€14,65','€20,00'),
    minnie:receipt('€14,65','€20,00',[{lines:['€15,00']}]),
    moose:receipt('€14,65','€20,00',[{lines:['€14,65 → €15,00 = €0,35','€15,00 → €20,00 = €5,00']}]),
    explanation:receipt('€14,65','€20,00',[{lines:['€0,35 + €5,00 = €5,35','€14,65 + €5,35 = €20,00']}],'€5,35')
  }},
  'M6-TI-009': {type:'timeLine',stages:{
    question:line(['08:25','08:50']),
    minnie:line(['08:25','08:50'],[],{focusNodes:[0,1]}),
    moose:line(['08:25','08:50'],[],{notes:['50 − 25 = ?']}),
    explanation:line(['08:25','08:50'],[],{notes:['50 − 25 = 25 minuten']})
  }},
  'M6-TI-010': {type:'timeLine',stages:{
    question:line(['11:15','11:45']),
    minnie:line(['11:15','11:45'],[],{focusNodes:[0,1]}),
    moose:line(['11:15','11:45'],[],{notes:['45 − 15 = ?']}),
    explanation:line(['11:15','11:45'],[],{notes:['45 − 15 = 30 minuten']})
  }},
  'M6-TI-014': {type:'timeLine',stages:{
    question:line(['08:45','?'],[],{notes:['duur 1 uur 35 minuten']}),
    minnie:line(['08:45','09:45','?'],['1 uur','?']),
    moose:line(['08:45','09:45','10:00','?'],['1 uur','15 minuten','20 minuten']),
    explanation:line(['08:45','09:45','10:00','10:20'],['1 uur','15 minuten','20 minuten'])
  }},
  'M6-TI-016': {type:'timeLine',stages:{
    question:line(['?','17:10'],[],{direction:'backward',notes:['duur 1 uur 45 minuten']}),
    minnie:line(['?','16:10','17:10'],['?','1 uur'],{direction:'backward'}),
    moose:line(['?','16:00','16:10','17:10'],['35 minuten','10 minuten','1 uur'],{direction:'backward'}),
    explanation:line(['15:25','16:00','16:10','17:10'],['35 minuten','10 minuten','1 uur'],{direction:'backward'})
  }}
};
const visualInstructions = {
  'M6-MO-003':{question:'price €2,70\npaid €3,00',minnie:'show price → paid, unknown jump.',moose:'100 − 70 = ? cent',explanation:'100 − 70 = 30 cent\n30 cent = €0,30\n€2,70 + €0,30 = €3,00'},
  'M6-MO-006':{question:'moneyReceipt met prijs €14,65, betaald €20,00, wisselgeld `?`.',minnie:'toon het handige tussenpunt €15,00.',moose:'toon `€14,65 → €15,00 = €0,35` en `€15,00 → €20,00 = €5,00`; totaal blijft open.',explanation:'toon `€0,35 + €5,00 = €5,35` en `€14,65 + €5,35 = €20,00`.'},
  'M6-TI-009':{question:'08:25 → 08:50',minnie:'same endpoints, visually emphasize the minute values.',moose:'50 − 25 = ?',explanation:'50 − 25 = 25 minuten'},
  'M6-TI-010':{question:'11:15 → 11:45',minnie:'highlight both minute values.',moose:'45 − 15 = ?',explanation:'45 − 15 = 30 minuten'},
  'M6-TI-014':{question:'08:45 → ?\nnote: duur 1 uur 35 minuten',minnie:'08:45 → 09:45 → ?\njumps: 1 uur, remaining unknown',moose:'08:45 → 09:45 → 10:00 → ?\njumps: 1 uur, 15 minuten, 20 minuten',explanation:'08:45 → 09:45 → 10:00 → 10:20\njumps: 1 uur, 15 minuten, 20 minuten'},
  'M6-TI-016':{question:'? → 17:10\nnote: duur 1 uur 45 minuten\ndirection backward',minnie:'? → 16:10 → 17:10\nshow 1 hour backward',moose:'? → 16:00 → 16:10 → 17:10\nshow 10 minutes + 1 hour and remaining 35 minutes',explanation:'15:25 → 16:00 → 16:10 → 17:10\njumps: 35 minutes, 10 minutes, 1 hour\ndirection backward'}
};

const objectives = {
  BR:['fraction_of_quantity_half','fraction_of_quantity_quarter','fraction_of_quantity_multiple_parts','fraction_of_quantity_multiple_parts','fraction_remainder_from_quantity','fraction_remainder_from_quantity'],
  OP:['add_hundreds_tens','add_three_digit_context','add_three_digit_crossing','add_three_digit_crossing','add_four_digit_and_three_digit','add_four_digit_and_three_digit'],
  GE:['calculate_change_to_next_euro','calculate_change_to_next_euro','calculate_change_mixed_euros_cents','calculate_change_mixed_euros_cents','add_prices_then_calculate_change','add_prices_then_calculate_change'],
  TI:['elapsed_time_half_hour','elapsed_time_same_hour','elapsed_time_cross_hour','elapsed_time_cross_hour','find_end_time_hours_minutes','find_start_time_hours_minutes']
};
const domains={BR:'fractionsRatios',OP:'additionSubtraction',GE:'money',TI:'time'};
// Replacements are deliberately scoped to one approved record. No broad prose pass.
const edits={
  'BR-001':[['schilden','onderdelen'],['schildsymbolen','neutrale symbolen'],['rode rand','gemarkeerd']],
  'BR-002':[['stenen','onderdelen'],['steensymbolen','neutrale symbolen'],['voor het muurtje','gebruikt']],
  'BR-003':[['schilden','onderdelen'],['blauwe rand','gemarkeerd']],
  'BR-004':[['Eivar gebruikt twee van die stukken.','Twee van die stukken worden gebruikt.'],['touwstrook','kabelstrook']],
  'BR-005':[['die nog op de kade staan','die nog moeten worden verplaatst'],['kratten aan boord','kratten die al zijn verplaatst'],['al aan boord','al verplaatst'],['aan boord','al verplaatst'],['nog op de kade','nog te verplaatsen'],['op de kade','nog te verplaatsen'],['de ingeladen','de verplaatste'],['twee ingeladen delen','twee verplaatste delen'],['ingeladen','verplaatst'],['voor de kade','voor de resterende delen']],
  'BR-006':[['De tempelwachter gebruikt ⅜ van de 40 houtblokken.','Er wordt ⅜ van de 40 houtblokken gebruikt.']],
  'OP-002':[['planken','onderdelen']],
  'OP-004':[['spijkers','onderdelen']],
  'OP-006':[['stenen','onderdelen'],['al geleverde','al aanwezige']],
  'GE-001':[['Vikingtekening','Kaartje'],['Vikingkaartje','Kaartje']],
  'GE-002':[['Runenstickers','Stickervel']],
  'GE-003':[['Vikingschip','Souvenir']],
  'GE-004':[['Boottocht','Toegangsbewijs']],
  'GE-005':[['Vikingboekje','Boekje'],['Runenstickers','Stickervel'],['boekje en de stickers','boekje en het stickervel']],
  'TI-003':[['tocht','rit']],
  'TI-004':[['wachtdienst','dienst']],
  'TI-005':[['De tocht duurt','De activiteit duurt']],
  'TI-006':[['Het schip komt om **16:20** terug en de tocht duurde','De activiteit eindigt om **16:20** en duurde']]
};
function mapStrings(value,replace) {
  return typeof value==='string'?replace(value):Array.isArray(value)?value.map(v=>mapStrings(v,replace)):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([k,v])=>[k,mapStrings(v,replace)])):value;
}
function correctOriginal(question) {
  const short=question.id.slice(6),group=short.slice(0,2),index=Number(short.slice(-3))-1;
  const section=approval.split('4. DIRECTLY GENERICIZE')[1].split('5. NORMALIZE')[0];
  const block=section.split(question.id+'\n')[1].split(/\nRP-M6-|\n-+|\nFor all 24:/)[0];
  if(!block)throw Error(`Missing generic approval: ${question.id}`);
  let q=mapStrings(question,s=>(edits[short]||[]).reduce((text,[from,to])=>text.replaceAll(from,to),s));
  if(block.includes('\nQuestion:\n'))q.prompt=between(block,'Question:\n',/\n\n/);
  const final=block.match(/\nFinal(?: explanation ends)?:\n([^\n]+)/)?.[1];
  if(final)q.authoredSupport.explanationSteps[q.authoredSupport.explanationSteps.length-1]=short==='BR-002'?`Eén groepje wordt gebruikt. ${final}`:final;
  q.explanation=q.authoredSupport.explanationSteps.join('\n\n');
  q.contentVersion='0.2';q.learningObjective=objectives[group][index];
  if(['BR-001','BR-002','BR-003'].includes(short))for(const frame of Object.values(q.visual.stages))delete frame.symbol;
  return q;
}
const contentVersion=(id,prior)=>prior+(changedExpansionIds.includes(id)?1:0);
module.exports={difficulty,replacementIds,changedExpansionIds,correctExpansion,replacementVisuals,correctOriginal,objectives,domains,contentVersion};
