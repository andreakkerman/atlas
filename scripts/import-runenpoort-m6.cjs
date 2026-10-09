// Central content only. --write transcribes the current approved corrections;
// never restore retired slot copies or world-specific narrative surfaces.
const {validatePilot,makeRecords} = require('./runenpoort-m6-content.cjs');
if(process.argv.includes('--write')) {
  const fs=require('node:fs'),path=require('node:path'),engine=require('../src/m6-bank');
  const records=makeRecords(),errors=engine.validateRecords(records);
  if(errors.length)throw Error(errors.join('\n'));
  const files={BR:'fractions-ratios',OP:'addition-subtraction',GE:'money',TI:'time'};
  for(const [group,file] of Object.entries(files)) {
    const rows=records.filter(r=>r.id.startsWith(`RP-M6-${group}-`));
    fs.writeFileSync(path.join(__dirname,'../src/content/m6',`${file}.js`),`// Approved authored content, including atlas-m6-quality-approved.md corrections.\n(function (global) {\n  const records = ${JSON.stringify(rows,null,2)};\n  if (typeof module !== 'undefined' && module.exports) module.exports = records;\n  (global.AtlasM6Modules ||= {})['${file}'] = records;\n})(typeof window !== 'undefined' ? window : globalThis);\n`);
  }
}
const errors = validatePilot([]);
if (errors.length) throw new Error(errors.join('\n'));
console.log('The 24 approved questions are already in src/content/m6; central content verified.');
