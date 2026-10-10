// Read the production recovery path, not the authoring parser, for review evidence.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {records,bank}=require('../src/content/m6'),support=require('../src/challenge-support');
const {expectedIds,sourcePath}=require('./m6-expansion-20261010.cjs');
const result=require('./audit-m6.cjs').validateAndAudit();
if(result.errors.length)throw Error(result.errors.join('\n'));
const count=(rows,field)=>rows.reduce((out,r)=>(out[r[field]]=(out[r[field]]||0)+1,out),{});
const newRecords=records.filter(r=>expectedIds.includes(r.id));
const artifact={
  source:'scripts/content/atlas-m6-expansion-20261010-approved.md',sourceSha256:crypto.createHash('sha256').update(fs.readFileSync(sourcePath)).digest('hex'),
  recovery:'AtlasM6Content.bank.recover(id, original)',
  inventory:{total:result.audit.total,domains:result.audit.domains,difficulty:result.audit.difficulty,answerModes:count(records,'answerMode'),visualCapabilities:result.audit.visualTypes,surfaces:records.reduce((n,r)=>n+r.surfaces.length,0),numericalCores:result.numericalCores},
  addition:{total:newRecords.length,difficulty:result.addition.difficulty,answerModes:count(newRecords,'answerMode'),visualCapabilities:result.addition.visualTypes},
  questions:newRecords.map(r=>{
    const q=bank.recover(r.id,'original');
    return {id:q.id,domain:q.educationalDomain,objective:q.learningObjective,reportLabel:q.reportLabel,difficulty:q.difficulty,answerMode:q.answerMode,answerSpec:q.answerSpec,answer:q.answer,answerDisplay:q.answerDisplay,
      educationalCore:q.educationalCore,question:q.prompt,choices:q.choices||[],minnie:q.hintMinnie,moose:q.hintMoose,explanation:q.explanation,
      visualType:q.visual.type,visuals:Object.fromEntries(support.STAGES.map(stage=>[stage,{data:q.visual.stages[stage],html:support.renderVisual(q.visual,stage)}])),
      explanationHTML:support.renderExplanation(q),contentVersion:q.contentVersion,surfaceId:q.surfaceId};
  })
};
const destination=path.join(__dirname,'../Docs/qa/M6_EXPANSION_20261010_RUNTIME.json');
fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,JSON.stringify(artifact,null,2)+'\n');
console.log(JSON.stringify({destination,inventory:artifact.inventory,addition:artifact.addition},null,2));
