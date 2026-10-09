const fs = require('fs');
const path = require('path');
const {records} = require('../src/content/m6');
const {validateRecords,audit} = require('../src/m6-bank');
const {validateExpansion,expectedIds}=require('./m6-expansion-content.cjs');
function validateAndAudit() {
  const errors = validateRecords(records, asset => fs.existsSync(path.join(__dirname,'..',asset)));
  errors.push(...validateExpansion(records));
  errors.push(...require('./runenpoort-m6-content.cjs').validatePilot([]));
  if(records.length!==99||records.some(r=>r.id.startsWith('TEST-')))errors.push('Production inventory must contain exactly 99 approved questions, without test fixtures.');
  const expansion=audit(records.filter(r=>expectedIds.includes(r.id)));
  const expectedDomains={numberSense:8,additionSubtraction:8,multiplicationDivision:10,fractionsRatios:10,money:8,time:18,measurementGeometry:7,dataPatterns:6};
  for(const [key,count] of Object.entries(expectedDomains))if(expansion.domains[key]!==count)errors.push(`Expansion domain ${key}: expected ${count}.`);
  if(JSON.stringify(expansion.difficulty)!==JSON.stringify({1:37,2:26,3:12}))errors.push('Expansion difficulty counts must be 37/26/12.');
  return {errors, audit:audit(records), expansion, numericalCores:require('./m6-core-audit.cjs').auditCores(records)};
}
if (require.main === module) {
  const result = validateAndAudit();
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length) process.exitCode = 1;
}
module.exports = {validateAndAudit};
