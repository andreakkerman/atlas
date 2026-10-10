// Literal user-approved seven-ID correction, 9 October 2026.
// Applied offline after the time recalibration; never loaded by gameplay.
const difficultyIds = ['M6-TI-003', 'M6-TI-005', 'M6-TI-006'];
const moose = {
  'M6-NS-002': 'Van **3, 8, 5 en 7** is **8** het grootste, dus die staat vooraan. Kijk nu naar de cijfers **7, 5 en 3**: welk daarvan hoort op de volgende plek met de grootste waarde?',
  'M6-NS-005': 'Het midden is **6.450**. **6.451** ligt daar net boven. Bedenk nu welk van de twee honderdtallen daardoor het dichtst bij 6.451 ligt.',
  'M6-NS-006': 'Het midden is **8.500**. **8.620** ligt boven dat midden. Bedenk nu welk van de twee duizendtallen het dichtst bij 8.620 ligt.',
  'M6-MD-002': 'Denk aan de keersom **16 × ? = 160**. Je weet dat **16 × 5 = 80**. En 160 is twee keer zoveel als 80. Wat betekent dat voor het aantal groepjes?'
};
function correctRecord(record) {
  if (!difficultyIds.includes(record.id) && !moose[record.id]) return record;
  const result = structuredClone(record);
  result.contentVersion += 1;
  if (difficultyIds.includes(result.id)) result.difficulty = 2;
  if (moose[result.id]) for (const surface of result.surfaces) {
    surface.hintMoose = moose[result.id];
    if (result.id === 'M6-MD-002') surface.visual.stages.moose = {
      groups: [{lines: ['16 × ? = 160', '16 × 5 = 80', '160 = 2 × 80']}]
    };
  }
  return result;
}
module.exports = {correctRecord};
