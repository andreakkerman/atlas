const fs = require('fs');
const path = require('path');
const {records} = require('../src/content/m6');
const {validateRecords,audit} = require('../src/m6-bank');
const {validateExpansion,expectedIds}=require('./m6-expansion-content.cjs');
function validateAndAudit() {
  const errors = validateRecords(records, asset => fs.existsSync(path.join(__dirname,'..',asset)));
  errors.push(...validateExpansion(records));
  errors.push(...require('./m6-expansion-20261010.cjs').validateExpansion(records));
  errors.push(...require('./runenpoort-m6-content.cjs').validatePilot([]));
  if(records.length!==159||records.some(r=>r.id.startsWith('TEST-')))errors.push('Production inventory must contain exactly 159 approved questions, without test fixtures.');
  const expansion=audit(records.filter(r=>expectedIds.includes(r.id)));
  const expectedDomains={numberSense:8,additionSubtraction:8,multiplicationDivision:10,fractionsRatios:10,money:8,time:18,measurementGeometry:7,dataPatterns:6};
  for(const [key,count] of Object.entries(expectedDomains))if(expansion.domains[key]!==count)errors.push(`Expansion domain ${key}: expected ${count}.`);
  if(JSON.stringify(expansion.difficulty)!==JSON.stringify({1:34,2:29,3:12}))errors.push('Expansion difficulty counts must be 34/29/12.');
  const final=audit(records),addition=audit(records.filter(r=>require('./m6-expansion-20261010.cjs').expectedIds.includes(r.id)));
  const domains={additionSubtraction:20,dataPatterns:15,fractionsRatios:28,measurementGeometry:16,money:20,multiplicationDivision:16,numberSense:14,time:30};
  for(const [domain,count] of Object.entries(domains))if(final.domains[domain]!==count)errors.push(`Final domain ${domain}: expected ${count}.`);
  if(JSON.stringify(final.difficulty)!==JSON.stringify({1:64,2:58,3:37}))errors.push('Final difficulty counts must be 64/58/37.');
  if(JSON.stringify(addition.difficulty)!==JSON.stringify({1:22,2:21,3:17}))errors.push('New 60 difficulty counts must be 22/21/17.');
  const numericalCores=require('./m6-core-audit.cjs').auditCores(records);
  if(numericalCores.duplicates.length)errors.push('Duplicate numerical educational cores found.');
  return {errors, audit:final, expansion, addition, numericalCores};
}
if (require.main === module) {
  const result = validateAndAudit();
  console.log(JSON.stringify(result, null, 2));
  if (result.errors.length) process.exitCode = 1;
}
module.exports = {validateAndAudit};
