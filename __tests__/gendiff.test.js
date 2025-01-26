import { gendiff } from '../src/index.js';
import { readFile } from '../src/parsers.js';
import { describe, test, expect } from '@jest/globals';

describe('Сравнение файлов для формата stylish', () => {
  test('JSON', () => {
    const actual = gendiff('__fixtures__/test1.json', '__fixtures__/test2.json');
    const expected = readFile('__fixtures__/stylishExpected.txt');
    expect(actual).toEqual(expected);
  });

  test('YAML', () => {
    const actual = gendiff('__fixtures__/test1.yaml', '__fixtures__/test2.yaml');
    const expected = readFile('__fixtures__/stylishExpected.txt');
    expect(actual).toEqual(expected);
  });

  test('YML', () => {
    const actual = gendiff('__fixtures__/test1.yml', '__fixtures__/test2.yml');
    const expected = readFile('__fixtures__/stylishExpected.txt');
    expect(actual).toEqual(expected);
  });
});

// describe('Сравнение файлов для формата plain', () => {
//   test('JSON', () => {
//     const actual = gendiff('__fixtures__/test1.json', '__fixtures__/test2.json', 'plain');
//     const expected = readFile('__fixtures__/plainExpected.txt');
//     expect(actual).toEqual(expected);
//   });

//   test('YAML', () => {
//     const actual = gendiff('__fixtures__/test1.yaml', '__fixtures__/test2.yaml', 'plain');
//     const expected = readFile('__fixtures__/plainExpected.txt');
//     expect(actual).toEqual(expected);
//   });

//   test('YML', () => {
//     const actual = gendiff('__fixtures__/test1.yml', '__fixtures__/test2.yml', 'plain');
//     const expected = readFile('__fixtures__/plainExpected.txt');
//     expect(actual).toEqual(expected);
//   });
// });

// describe('Сравнение файлов для формата json', () => {
//   test('JSON', () => {
//     const actual = gendiff('__fixtures__/test1.json', '__fixtures__/test2.json', 'json');
//     const expected = readFile('__fixtures__/jsonExpected.txt');
//     expect(actual).toEqual(expected);
//   });

//   test('YAML', () => {
//     const actual = gendiff('__fixtures__/test1.yaml', '__fixtures__/test2.yaml', 'json');
//     const expected = readFile('__fixtures__/jsonExpected.txt');
//     expect(actual).toEqual(expected);
//   });

//   test('YML', () => {
//     const actual = gendiff('__fixtures__/test1.yml', '__fixtures__/test2.yml', 'json');
//     const expected = readFile('__fixtures__/jsonExpected.txt');
//     expect(actual).toEqual(expected);
//   });
// });
