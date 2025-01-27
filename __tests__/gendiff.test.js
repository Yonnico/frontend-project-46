import { describe, test, expect } from '@jest/globals';
import gendiff from '../src/index.js';
import { readFile } from '../src/parsers.js';

describe('Сравнение файлов', () => {
  const formats = ['json', 'yaml', 'yml'];
  const expectedFiles = {
    stylish: '__fixtures__/stylishExpected.txt',
    plain: '__fixtures__/plainExpected.txt',
    json: '__fixtures__/jsonExpected.json'
  };

  const testCases = formats.flatMap((format) =>
    ['stylish', 'plain', 'json'].map((formatter) => [format, formatter])
  );

  test.each(testCases)('Сравнение %s файлов с форматом вывода %s', (format, formatter) => {
    const file1 = `__fixtures__/test1.${format}`;
    const file2 = `__fixtures__/test2.${format}`;

    const actual = gendiff(file1, file2, formatter);
    const expected = readFile(expectedFiles[formatter]);

    expect(actual).toEqual(expected);
  });
});
