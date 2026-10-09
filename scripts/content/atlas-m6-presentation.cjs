// Authorized presentation corrections for the 75-question expansion (October 2026).
// Keep the approved Markdown and visual transcription intact. These literal edits
// select existing narrative nouns only; no arithmetic, grammar or hints are generated.
const contexts = {
  'M6-AS-001': {
    explanation: {
      bare: ['\n\nBij de voorraadvariant zijn er dus **690 onderdelen**.', ''],
      supplies: ['Bij de voorraadvariant zijn er dus', 'Er zijn dus']
    }
  },
  'M6-AS-007': {
    explanation: {
      bare: ['\n\nBij de routevariant is de route daarna **2.311 meter** lang.', ''],
      distance: ['Bij de routevariant is de route daarna', 'De route is daarna']
    }
  },
  'M6-MD-008': {
    replacements: [['kost of gebruikt', '{groupAction}']],
    tokens: {budget:{groupAction:'kost'}, length:{groupAction:'gebruikt'}}
  },
  'M6-MD-009': {
    replacements: [['meenemen of inpakken','{groupAction}'], ['dozen of voertuigen','{groups}'], ['onderdelen of mensen','{items}'], ['doos of voertuig','{group}']],
    tokens: {
      boxes:{groupAction:'inpakken',groups:'dozen',items:'onderdelen',group:'doos'},
      vehicles:{groupAction:'meenemen',groups:'voertuigen',items:'mensen',group:'voertuig'}
    }
  },
  'M6-MD-010': {
    replacements: [['onderdelen of plaatsen','{items}'], ['rekken of vakken','{groups}'], ['rek of vak','{group}']],
    tokens: {storage:{items:'onderdelen',groups:'rekken',group:'rek'}, seating:{items:'plaatsen',groups:'vakken',group:'vak'}}
  },
  'M6-FR-004': {
    replacements: [['dozen of tafels','{groups}'], ['lampen of stoelen','{items}']],
    tokens: {boxes:{groups:'dozen',items:'lampen'}, tables:{groups:'tafels',items:'stoelen'}}
  },
  'M6-FR-005': {
    replacements: [['lampen of stoelen','{items}'], ['In één doos of bij één tafel','{groupLocation}']],
    tokens: {boxes:{items:'lampen',groupLocation:'In één doos'}, tables:{items:'stoelen',groupLocation:'Bij één tafel'}}
  },
  'M6-FR-008': {
    replacements: [['schaal of pakket','{group}'],['7 stuks','7 {groups}']],
    tokens: {trays:{group:'schaal',groups:'schalen'}, packages:{group:'pakket',groups:'pakketten'}}
  },
  'M6-FR-010': {
    replacements: [['schaal of plank','{group}'], ['schalen of planken','{groups}'], ['flesjes of boeken','{items}']],
    tokens: {trays:{group:'schaal',groups:'schalen',items:'flesjes'}, shelves:{group:'plank',groups:'planken',items:'boeken'}}
  },
  'M6-ME-004': {
    replacements: [['De twee pakketten wegen samen:', 'De twee {groups} wegen samen:']],
    tokens: {packages:{groups:'pakketten'}, bags:{groups:'zakken'}}
  },
  'M6-ME-006': {
    replacements: [['De zes pakketten wegen dus', 'De zes {groups} wegen dus']],
    tokens: {packages:{groups:'pakketten'}, containers:{groups:'bakjes'}}
  }
};

// Only these redundant prose notes change. Currency controls/assets, equations,
// stage timing and all other visual annotations remain exactly as transcribed.
const visualNotes = {
  'M6-MO-004': {
    moose: {before:['Begin bijvoorbeeld met €5. Dan moet je nog €3,50 maken.'], after:['€8,50 − €5,00 = €3,50 over']},
    explanation: {before:['€5 + €2 + €1 + €0,50 = €8,50','Elke andere gekozen combinatie die precies **€8,50** vormt, is ook correct.'], after:['€5 + €2 + €1 + €0,50 = €8,50']}
  },
  'M6-MO-005': {
    moose: {before:['Begin bijvoorbeeld met €20. Dan ontbreekt nog €4,50.'], after:['€24,50 − €20,00 = €4,50 over']},
    explanation: {before:['€20 + €2 + €2 + €0,50 = €24,50','Elke andere combinatie die precies **€24,50** vormt, is ook correct.'], after:['€20 + €2 + €2 + €0,50 = €24,50']}
  }
};

function presentSupport(question, surfaceId) {
  const correction = contexts[question.id];
  const copy = Object.fromEntries(['hintMinnie','hintMoose','explanation'].map(key=>[key,question[key]]));
  if (!correction) return copy;
  for (const [from,to] of correction.replacements || []) {
    if (!Object.values(copy).some(text=>text.includes(from))) throw Error(`${question.id}: stale narrative correction: ${from}`);
    for (const key of Object.keys(copy)) copy[key] = copy[key].replaceAll(from,to);
  }
  if (correction.explanation) {
    const edit = correction.explanation[surfaceId];
    if (!edit || !copy.explanation.includes(edit[0])) throw Error(`${question.id}/${surfaceId}: stale explanation context`);
    copy.explanation = copy.explanation.replace(edit[0],edit[1]);
  }
  if (correction.tokens) {
    if (!correction.tokens[surfaceId]) throw Error(`${question.id}/${surfaceId}: missing narrative tokens`);
    copy.tokens = correction.tokens[surfaceId];
  }
  return copy;
}

function presentVisual(id, visual) {
  const copy = structuredClone(visual);
  for (const [stage,{before,after}] of Object.entries(visualNotes[id] || {})) {
    if (JSON.stringify(copy.stages[stage].notes) !== JSON.stringify(before)) throw Error(`${id}/${stage}: stale visual note correction`);
    copy.stages[stage].notes = [...after];
  }
  return copy;
}

const contentVersion = id => contexts[id] || visualNotes[id] ? 2 : 1;
module.exports = {contexts,visualNotes,presentSupport,presentVisual,contentVersion};
