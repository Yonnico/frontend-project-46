import { fileParser } from "./parsers.js";
import { compare } from "./compare.js";
import { formatter } from "./formatters/index.js";

/**
 * @param {string} filepath1 - Путь к первому файлу
 * @param {string} filepath2 - Путь ко второму файлу
 * @param {string} format - Формат вывода (по умолчанию "stylish")
 * @returns {string} - Строка с результатом сравнения
 */
export const gendiff = (filepath1, filepath2, format = "stylish") => {

  const file1 = fileParser(filepath1);
  const file2 = fileParser(filepath2);

  const difference = compare(file1, file2);

  const result = formatter(difference, format);

  return result;
};
