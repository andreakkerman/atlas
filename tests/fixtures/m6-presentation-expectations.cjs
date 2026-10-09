// Independent, literal expectations for the authorized surface-only corrections.
// Every other word is still compared with the immutable approved Markdown.
const surfaceEdits = {
  'M6-AS-001': {
    bare:[['\n\nBij de voorraadvariant zijn er dus **690 onderdelen**.','']],
    supplies:[['Bij de voorraadvariant zijn er dus','Er zijn dus']]
  },
  'M6-AS-007': {
    bare:[['\n\nBij de routevariant is de route daarna **2.311 meter** lang.','']],
    distance:[['Bij de routevariant is de route daarna','De route is daarna']]
  },
  'M6-MD-008': {budget:[['kost of gebruikt','kost']],length:[['kost of gebruikt','gebruikt']]},
  'M6-MD-009': {
    boxes:[['meenemen of inpakken','inpakken'],['dozen of voertuigen','dozen'],['onderdelen of mensen','onderdelen'],['doos of voertuig','doos']],
    vehicles:[['meenemen of inpakken','meenemen'],['dozen of voertuigen','voertuigen'],['onderdelen of mensen','mensen'],['doos of voertuig','voertuig']]
  },
  'M6-MD-010': {
    storage:[['onderdelen of plaatsen','onderdelen'],['rekken of vakken','rekken'],['rek of vak','rek']],
    seating:[['onderdelen of plaatsen','plaatsen'],['rekken of vakken','vakken'],['rek of vak','vak']]
  },
  'M6-FR-004': {
    boxes:[['dozen of tafels','dozen'],['lampen of stoelen','lampen']],
    tables:[['dozen of tafels','tafels'],['lampen of stoelen','stoelen']]
  },
  'M6-FR-005': {
    boxes:[['lampen of stoelen','lampen'],['In één doos of bij één tafel','In één doos']],
    tables:[['lampen of stoelen','stoelen'],['In één doos of bij één tafel','Bij één tafel']]
  },
  'M6-FR-008': {trays:[['schaal of pakket','schaal'],['7 stuks','7 schalen']],packages:[['schaal of pakket','pakket'],['7 stuks','7 pakketten']]},
  'M6-FR-010': {
    trays:[['schaal of plank','schaal'],['schalen of planken','schalen'],['flesjes of boeken','flesjes']],
    shelves:[['schaal of plank','plank'],['schalen of planken','planken'],['flesjes of boeken','boeken']]
  },
  'M6-ME-004': {packages:[],bags:[['De twee pakketten wegen samen:','De twee zakken wegen samen:']]},
  'M6-ME-006': {packages:[],containers:[['De zes pakketten wegen dus','De zes bakjes wegen dus']]}
};
function expectedSupport(q,surfaceId) {
  return Object.fromEntries(['hintMinnie','hintMoose','explanation'].map(key=>[key,
    (surfaceEdits[q.id]?.[surfaceId] || []).reduce((text,[before,after])=>text.replaceAll(before,after),q[key])
  ]));
}
const expectedVisualNotes = {
  'M6-MO-004':{moose:['€8,50 − €5,00 = €3,50 over'],explanation:['€5 + €2 + €1 + €0,50 = €8,50']},
  'M6-MO-005':{moose:['€24,50 − €20,00 = €4,50 over'],explanation:['€20 + €2 + €2 + €0,50 = €24,50']}
};
module.exports = {surfaceEdits,expectedSupport,expectedVisualNotes};
