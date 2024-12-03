import { compare } from '../src/compare.js';
import { readFile, fileParser } from '../src/parsers.js';
import { test, expect } from '@jest/globals';

test('Сравнение плоских JSON файлов', () => {
  const actual = compare(fileParser('__fixtures__/test1.json'), fileParser('__fixtures__/test1_1.json'));
  const expected = readFile('__fixtures__/flatTestExpected.txt');
  expect(actual).toEqual(expected);
});

test('Сравнение плоских YAML файлов', () => {
  const actual = compare(fileParser('__fixtures__/test2.yaml'), fileParser('__fixtures__/test2_2.yaml'));
  const expected = readFile('__fixtures__/flatTestExpected.txt');
  expect(actual).toEqual(expected);
});

test('Сравнение плоских YML файлов', () => {
  const actual = compare(fileParser('__fixtures__/test3.yml'), fileParser('__fixtures__/test3_3.yml'));
  const expected = readFile('__fixtures__/flatTestExpected.txt');
  expect(actual).toEqual(expected);
});