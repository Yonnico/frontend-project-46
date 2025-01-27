import gendiff from '../src/index.js';
import { readFile } from '../src/parsers.js';
import { describe, test, expect } from '@jest/globals';

const formats = ['json', 'yaml', 'yml'];
const formatters = {
  stylish: { formatter: 'stylish', expected: '__fixtures__/stylishExpected.txt' },
  plain: { formatter: 'plain', expected: '__fixtures__/plainExpected.txt' },
  json: { formatter: 'json', expected: '__fixtures__/jsonExpected.json' }
};

describe('Сравнение файлов', () => {
  // Тестирование для каждого формата вывода (stylish, plain, json)
  Object.entries(formatters).map(([formatterName, { formatter, expected: expectedPath }]) => {
    describe(`Формат вывода: ${formatterName}`, () => {
      // Тестирование для каждого формата входных файлов (json, yaml, yml)
      formats.map((fileFormat) => {
        const file1 = `__fixtures__/test1.${fileFormat}`;
        const file2 = `__fixtures__/test2.${fileFormat}`;

        test(`Сравнение ${fileFormat.toUpperCase()} файлов`, () => {
          const actual = gendiff(file1, file2, formatter);
          const expected = readFile(expectedPath);

          expect(actual).toEqual(expected);
        });
      });
    });
  });
});
