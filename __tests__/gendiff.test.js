import { gendiff } from '../src/index.js';
import { readFile } from '../src/parsers.js';
import { describe, test, expect } from '@jest/globals';

describe('Сравнение вложенных файлов', () => {

  test('JSON', () => {
    const actual = gendiff('__fixtures__/deepTest1.json', '__fixtures__/deepTest1_1.json');
    const expected = readFile('__fixtures__/deepTestExpected.txt');
    expect(actual).toEqual(expected);
  });

  test('YAML', () => {
    const actual = gendiff('__fixtures__/deepTest2.yaml', '__fixtures__/deepTest2_2.yaml');
    const expected = readFile('__fixtures__/deepTestExpected.txt');
    expect(actual).toEqual(expected);
  });

  test('YML', () => {
    const actual = gendiff('__fixtures__/deepTest3.yml', '__fixtures__/deepTest3_3.yml');
    const expected = readFile('__fixtures__/deepTestExpected.txt');
    expect(actual).toEqual(expected);
  });

});
