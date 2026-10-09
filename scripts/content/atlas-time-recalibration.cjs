// Offline transcription of the 9 October approval. Never loaded by gameplay.
const fs=require('node:fs'),path=require('node:path');
const approval=fs.readFileSync(path.join(__dirname,'atlas-time-recalibration-approved.md'),'utf8').replaceAll('\r\n','\n');
const definitions={
  'RP-M6-TI-001':{answer:4,values:{operation:'secondsToMinutes',seconds:240}},
  'RP-M6-TI-002':{answer:180,values:{operation:'minutesToSeconds',minutes:3}},
  'RP-M6-TI-003':{answer:'7 minuten 10 seconden',values:{operation:'secondsToMinutesRemainder',seconds:430}},
  'RP-M6-TI-004':{answer:320,values:{operation:'mixedTimeToSeconds',minutes:5,seconds:20},label:'Tijd · Minuten en seconden'},
  'M6-TI-001':{answer:'16:02',values:{start:'15:58',durationMinutes:4}},
  'M6-TI-002':{answer:'09:05',values:{start:'08:57',durationMinutes:8}},
  'M6-TI-003':{answer:41,values:{start:'14:51',end:'15:32'}},
  'M6-TI-004':{answer:45,values:{start:'19:43',end:'20:28'},label:'Tijd · Tijdsduur over het uur'},
  'M6-TI-005':{answer:43,values:{start:'15:29',end:'16:12'},label:'Tijd · Tijdsduur over het uur'},
  'M6-TI-006':{answer:44,values:{start:'08:50',end:'09:34'},label:'Tijd · Tijdsduur over het uur'},
  'M6-TI-007':{answer:'18:24',values:{start:'17:36',durationMinutes:48},label:'Tijd · Eindtijd bepalen'},
  'M6-TI-008':{answer:'19:26',values:{end:'20:13',durationMinutes:47},label:'Tijd · Begintijd bepalen'},
  'M6-TI-009':{answer:5,values:{operation:'secondsToMinutes',seconds:300},label:'Tijd · Seconden naar minuten'},
  'M6-TI-010':{answer:240,values:{operation:'minutesToSeconds',minutes:4},label:'Tijd · Minuten naar seconden'},
  'M6-TI-013':{answer:150,values:{operation:'mixedTimeToSeconds',minutes:2,seconds:30}}
};
const ids=Object.keys(definitions);
const blocks=Object.fromEntries([...approval.matchAll(/^-{10,}\n((?:RP-)?M6-TI-\d{3})\n-{10,}\n([\s\S]*?)(?=\n-{10,}|\n={10,}|$(?![\s\S]))/gm)].map(m=>[m[1],m[2].trim()]));
const field=(block,name)=>block.match(new RegExp(`^${name}:\\n([\\s\\S]*?)(?=\\n(?:Difficulty|Objective|Report label|Question|Answer|Answer mode|Unit|Minnie|Moose|Explanation|Visual type|Visual|Choices|Correct):|$(?![\\s\\S]))`,'m'))?.[1].trim();
const steps=(...lines)=>({groups:[{lines}]});
const calculation=(question,minnie,moose,explanation)=>({type:'calculationSteps',stages:{question:steps(...question),minnie:steps(...minnie),moose:steps(...moose),explanation:steps(...explanation)}});
const line=(nodes,jumps=[],notes=[],direction='forward')=>({nodes,jumps,notes,direction});
// Each frame is a literal transcription of the approved stages or equations
// already present in that stage's approved hint. No additional teaching steps.
const visuals={
  'RP-M6-TI-001':calculation(['240 seconden = ? minuten'],['1 minuut = 60 seconden'],['240 : 60 = ?'],['240 : 60 = 4','240 seconden = 4 minuten']),
  'RP-M6-TI-002':calculation(['3 minuten = ? seconden'],['1 minuut = 60 seconden'],['3 × 60 = ?'],['3 × 60 = 180','3 minuten = 180 seconden']),
  'RP-M6-TI-003':calculation(['430 seconden = ? minuten en seconden'],['1 minuut = 60 seconden'],['7 × 60 = 420 seconden','430 − 420 = ? seconden'],['7 × 60 = 420 seconden','430 − 420 = 10 seconden','430 seconden = 7 minuten en 10 seconden']),
  'RP-M6-TI-004':calculation(['5 minuten en 20 seconden = ? seconden'],['5 × 60 = ? seconden'],['5 × 60 = 300 seconden','300 + 20 = ? seconden'],['5 × 60 = 300 seconden','300 + 20 = 320 seconden','5 minuten en 20 seconden = 320 seconden']),
  'M6-TI-001':{type:'digitalClock',stages:{
    question:{hour:15,minute:58},minnie:{hour:16,minute:0,notes:['2 minuten verder']},
    moose:{hour:16,minute:0,notes:['2 van 4 minuten gebruikt','nog 2 minuten']},
    explanation:{hour:16,minute:2,notes:['15:58 + 4 minuten = 16:02']}
  }},
  'M6-TI-002':{type:'digitalClock',stages:{
    question:{hour:8,minute:57},minnie:{hour:9,minute:0,notes:['3 minuten verder']},
    moose:{hour:9,minute:0,notes:['3 minuten gebruikt','nog 5 minuten']},
    explanation:{hour:9,minute:5,notes:['08:57 + 8 minuten = 09:05']}
  }},
  'M6-TI-003':{type:'timeLine',stages:{question:line(['14:51','15:32']),minnie:line(['14:51','15:00','15:32']),moose:line(['14:51','15:00','15:32'],['9 min','32 min']),explanation:line(['14:51','15:00','15:32'],['9 min','32 min'],['9 + 32 = 41 minuten'])}},
  'M6-TI-004':{type:'timeLine',stages:{question:line(['19:43','20:28']),minnie:line(['19:43','20:00','20:28']),moose:line(['19:43','20:00','20:28'],['17 min','28 min']),explanation:line(['19:43','20:00','20:28'],['17 min','28 min'],['17 + 28 = 45 minuten'])}},
  'M6-TI-005':{type:'timeLine',stages:{question:line(['15:29','16:12']),minnie:line(['15:29','16:00','16:12']),moose:line(['15:29','16:00','16:12'],['31 min','12 min']),explanation:line(['15:29','16:00','16:12'],['31 min','12 min'],['31 + 12 = 43 minuten'])}},
  'M6-TI-006':{type:'timeLine',stages:{question:line(['08:50','09:34']),minnie:line(['08:50','09:00','09:34']),moose:line(['08:50','09:00','09:34'],['10 min','34 min']),explanation:line(['08:50','09:00','09:34'],['10 min','34 min'],['10 + 34 = 44 minuten'])}},
  'M6-TI-007':{type:'timeLine',stages:{question:line(['17:36','?'],['+48 minuten']),minnie:line(['17:36','18:00','?']),moose:line(['17:36','18:00','?'],['24 min','24 min']),explanation:line(['17:36','18:00','18:24'],['24 min','24 min'])}},
  'M6-TI-008':{type:'timeLine',stages:{question:line(['?','20:13'],[],['47 minuten'],'backward'),minnie:line(['?','20:00','20:13'],[],[],'backward'),moose:line(['?','20:00','20:13'],['34 min','13 min'],[],'backward'),explanation:line(['19:26','20:00','20:13'],['34 min','13 min'],[],'backward')}},
  'M6-TI-009':calculation(['300 seconden = ? minuten'],['1 minuut = 60 seconden'],['300 : 60 = ?'],['300 : 60 = 5','300 seconden = 5 minuten']),
  'M6-TI-010':calculation(['4 minuten = ? seconden'],['1 minuut = 60 seconden'],['4 × 60 = ?'],['4 × 60 = 240','4 minuten = 240 seconden']),
  'M6-TI-013':calculation(['2 min 30 sec = ? sec'],['2 min = 2 × 60 sec'],['120 + 30 = ?'],['120 + 30 = 150','2 min 30 sec = 150 sec'])
};
const nextVersion=v=>typeof v==='number'?v+1:v.replace(/\d+$/,n=>String(Number(n)+1));
function replacement(id){
 const d=definitions[id],b=blocks[id];if(!b)throw Error(`Missing approved replacement ${id}`);
 const objective=field(b,'Objective'),choices=field(b,'Choices')?.split('\n').filter(Boolean),unit=field(b,'Unit');
 const explanation=field(b,'Explanation');
 return {learningObjective:objective,reportLabel:field(b,'Report label')||d.label,family:objective,presentation:'story',answerMode:choices?'multipleChoice':'open',
  prompt:field(b,'Question'),answer:d.answer,answerSpec:choices?{type:'choice'}:{type:'wholeNumber',allowedForms:[String(d.answer)],unit},...(choices?{choices}:{}),
  answerDisplay:choices?d.answer:`${d.answer} ${unit}`,hintMinnie:field(b,'Minnie'),hintMoose:field(b,'Moose'),explanation,
  authoredSupport:{explanationSteps:explanation.split(/\n\s*\n/)},visual:structuredClone(visuals[id])};
}
function correctQuestion(q){
 if(!definitions[q.id])return q;
 const {choices,choiceParts,promptParts,...rest}=q;
 return {...rest,...replacement(q.id),contentVersion:nextVersion(q.contentVersion)};
}
function correctRecord(r){
 if(!definitions[r.id])return r;
 const {prompt,answer,answerSpec,choices,answerDisplay,hintMinnie,hintMoose,explanation,authoredSupport,visual,...meta}=replacement(r.id);
 return {...r,...meta,contentVersion:nextVersion(r.contentVersion),educationalCore:{values:definitions[r.id].values,question:{answer,answerSpec,...(choices?{choices}:{})}},
  surfaces:[{id:'original',prompt,answerDisplay,hintMinnie,hintMoose,explanation,authoredSupport,visual}]};
}
module.exports={ids,definitions,blocks,visuals,replacement,correctQuestion,correctRecord};
