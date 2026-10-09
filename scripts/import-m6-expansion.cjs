// Deliberate build-time import; no runtime generation or level writes.
const fs=require('node:fs'),path=require('node:path');
const {makeRecords,expectedIds}=require('./m6-expansion-content.cjs');
const visuals=require('./content/atlas-m6-expansion-visuals.cjs');
const records=makeRecords(visuals),engine=require('../src/m6-bank');
const prior=[...require('../src/content/m6/fractions-ratios'),...require('../src/content/m6/addition-subtraction'),...require('../src/content/m6/money'),...require('../src/content/m6/time')];
if(records.length!==75||new Set(records.map(r=>r.id)).size!==75||records.some(r=>!expectedIds.includes(r.id)||prior.some(p=>p.id===r.id)))throw Error('Missing, duplicate or colliding approved ID; no files written.');
const errors=engine.validateRecords([...prior,...records],p=>fs.existsSync(path.join(__dirname,'..',p)));
if(errors.length)throw Error(errors.join('\n'));
const modules={numberSense:'number-sense',additionSubtraction:'addition-subtraction',multiplicationDivision:'multiplication-division',fractionsRatios:'fractions-ratios',money:'money',time:'time',measurementGeometry:'measurement',dataPatterns:'data-patterns'};
const dir=path.join(__dirname,'../src/content/m6/expansion');fs.mkdirSync(dir,{recursive:true});
for(const [domain,file] of Object.entries(modules)) {
  const rows=records.filter(r=>r.educationalDomain===domain);
  const output=`// Approved Atlas M6 expansion. Source: scripts/content/atlas-m6-central-approved.md\n// Generated representation only; edit approved source/transcription, never educational prose here.\n(function (global) {\n  const records = ${JSON.stringify(rows,null,2)};\n  if (typeof module !== 'undefined' && module.exports) module.exports = records;\n  (global.AtlasM6Modules ||= {})['expansion-${file}'] = records;\n})(typeof window !== 'undefined' ? window : globalThis);\n`;
  fs.writeFileSync(path.join(dir,`${file}.js`),output);
}
console.log(JSON.stringify(engine.audit(records),null,2));
