// Presentation references only. Educational text and visual frames remain in the authored question.
(function (global) {
  'use strict';
  const layouts = {
    'RP-M6-OP-001': {groups: [0, 1, 2, 3]},
    'RP-M6-OP-002': {groups: [1, 2, 3, 4]},
    'RP-M6-OP-003': {groups: [0, 1, 2, 3, 4]},
    'RP-M6-OP-004': {groups: [0, 1, 2, 3]},
    'RP-M6-OP-005': {groups: [0, 1, 2, 3, 4]},
    'RP-M6-OP-006': {groups: [0, 1, 2, 3, 4]},
    'RP-M6-GE-001': {receipt: 0, groups: [2, 3, 4]},
    'RP-M6-GE-002': {receipt: 0, groups: [1, 2, 3]},
    'RP-M6-GE-003': {receipt: 0, groups: [2, 3, 4]},
    'RP-M6-GE-004': {receipt: 0, groups: [2, 3, 4]},
    'RP-M6-GE-005': {receipt: 0, groups: [1, 2, 3, 4, 5]},
    'RP-M6-GE-006': {receipt: 0, groups: [1, 2, 4, 4, 5]},
    // Keep the relationships in a strip or timeline intact rather than slicing geometry.
    'RP-M6-BR-001': {shared: 3},
    'RP-M6-BR-002': {shared: 1},
    'RP-M6-BR-003': {shared: 2},
    'RP-M6-BR-004': {shared: 2},
    'RP-M6-BR-005': {shared: 3},
    'RP-M6-BR-006': {shared: 3},
    'RP-M6-TI-001': {shared: 3},
    'RP-M6-TI-002': {shared: 3},
    'RP-M6-TI-003': {shared: 5},
    'RP-M6-TI-004': {shared: 2},
    'RP-M6-TI-005': {shared: 4},
    'RP-M6-TI-006': {shared: 4}
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = layouts;
  global.AtlasChallengeExplanationLayouts = layouts;
})(typeof window !== 'undefined' ? window : globalThis);
