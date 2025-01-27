import { describe, test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import { readFile } from '../src/parsers.js';

const formats = ['json', 'yaml', 'yml'];
const formatters = {
  stylish: { formatter: 'stylish', expected: '__fixtures__/stylishExpected.txt' },
  plain: { formatter: 'plain', expected: '__fixtures__/plainExpected.txt' },
  json: { formatter: 'json', expected: '__fixtures__/jsonExpected.json' }
};

describe('Сравнение файлов', () => {
  test.each(Object.entries(formatters))(
    'Формат вывода: %s',
    (formatterName, { formatter, expected: expectedPath }) => {
      test.each(formats)(
        'Сравнение %s файлов',
        (fileFormat) => {
          const file1 = `__fixtures__/test1.${fileFormat}`;
          const file2 = `__fixtures__/test2.${fileFormat}`;

          const actual = gendiff(file1, file2, formatter);
          const expected = readFile(expectedPath);

          expect(actual).toEqual(expected);
        }
      );
    }
  );
});
