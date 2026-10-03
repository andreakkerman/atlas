const { test, expect } = require('@playwright/test');
const fs = require('fs');
const vm = require('vm');

// Execute the actual grading expression rather than a second comparator in tests.
const source = fs.readFileSync('src/app.js', 'utf8');
const start = source.indexOf('  const isCorrect =', source.indexOf('function answerQuestion('));
const end = source.indexOf('  sessionReport?.recordAttempt', start);
const expression = source.slice(start, end) + '\nisCorrect;';
const grade = (family, correct, submitted) => vm.runInNewContext(expression, { question: { family }, correct, submitted });

test('spelling preserves orthographic distinctions, Unicode equivalence and case tolerance', () => {
  for (const word of ['Hiëroglief', 'Museum', 'Reliëf']) {
    expect(grade('spelling', word, word)).toBe(true);
    expect(grade('spelling', word, word.normalize('NFD'))).toBe(true);
    expect(grade('spelling', word.normalize('NFD'), word)).toBe(true);
    expect(grade('spelling', word, word.toUpperCase())).toBe(true);
  }
  for (const [answer, wrong] of [
    ['Hiëroglief', 'Hieroglief'], ['Museum', 'Museüm'], ['Reliëf', 'Relief'],
    ['Reliëf', 'Reliéf'], ['Reliëf', 'Reliëff'], ['Bouwplan', 'Bouw-plan'],
    ['Steen-blok', 'Steenblok'], ['Kruik', 'Kruiq']
  ]) expect(grade('spelling', answer, wrong), `${wrong} vs ${answer}`).toBe(false);
});

test('ordinary string answers keep accent-insensitive grading and numeric comparison is unchanged', () => {
  expect(grade('clock_reading', 'Twee uur', 'TWÉÉ UUR')).toBe(true);
  expect(grade('clock_reading', 'Twee uur', 'Drie uur')).toBe(false);
  expect(grade('story_multiplication', 'Museum', 'Museüm')).toBe(true);
  expect(grade('bare_multiplication', 42, 42)).toBe(true);
  expect(grade('bare_multiplication', 42, 43)).toBe(false);
});
