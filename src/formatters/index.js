import { stylish } from './stylish.js';
import { plain } from './plain.js';
import { json } from './json.js';

/**
 * @param {Difference[]} difference - Массив различий между объектами
 * @param {string} format - Формат вывода
 * @returns {string} - Строка с результатом сравнения в указанном формате
 */
export const formatter = (difference, format) => {

  const formatTypes = {
    stylish: (difference) => `${stylish(difference)}\n`,
    plain: (difference) => `${plain(difference)}\n`,
    json: (difference) => json(difference)
  };

  return formatTypes[format](difference);
};
