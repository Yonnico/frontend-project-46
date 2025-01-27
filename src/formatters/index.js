import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

/**
 * @param {Difference[]} difference - Массив различий между объектами
 * @param {string} format - Формат вывода
 * @returns {string} - Строка с результатом сравнения в указанном формате
 */
export default (data, format) => {
  const formatTypes = {
    stylish: (difference) => stylish(difference),
    plain: (difference) => plain(difference),
    json: (difference) => json(difference),
  };

  return formatTypes[format](data);
};
