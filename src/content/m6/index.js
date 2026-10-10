(function (global) {
  'use strict';
  const commonJS = typeof module !== 'undefined' && module.exports;
  const modules = commonJS ? [require('./fractions-ratios'), require('./addition-subtraction'), require('./money'), require('./time'),
    require('./expansion/number-sense'), require('./expansion/addition-subtraction'), require('./expansion/multiplication-division'), require('./expansion/fractions-ratios'), require('./expansion/money'), require('./expansion/time'), require('./expansion/measurement'), require('./expansion/data-patterns'), require('./expansion-20261010')] : Object.values(global.AtlasM6Modules);
  const engine = commonJS ? require('../../m6-bank') : global.AtlasM6Bank;
  const records = Object.freeze(modules.flat());
  const api = Object.freeze({records, bank:engine.createBank(records)});
  if (commonJS) module.exports = api;
  global.AtlasM6Content = api;
})(typeof window !== 'undefined' ? window : globalThis);
