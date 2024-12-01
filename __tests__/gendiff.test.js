import { compare } from '../src/compare.js';
import { readFile } from '../src/pathbuilder.js';
import { test, expect } from '@jest/globals';

test('Сравнение плоских JSON файлов', () => {
  const actual = compare(readFile('__fixtures__/test1.json'), readFile('__fixtures__/test1_1.json'));
  const expected = readFile('__fixtures__/test1_expected.txt');
  expect(actual).toEqual(expected);
});
