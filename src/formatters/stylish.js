import _ from 'lodash';

/**
 * @param {unknown} object - Объект для форматирования
 * @param {number} depth - Глубина вложенности (по умолчанию 1)
 * @returns {string} - Строка с форматированным объектом
 */
const stylishFormatValue = (data, depth = 1) => {
  if (!_.isObject(data)) {
    return data;
  }

  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat(((depth - 1) * indentSize));

  const entries = Object.entries(data);

  const result = entries.map(([key, value]) => {
    const valueStr = stylishFormatValue(value, depth + 1);
    return `${currentIndent}${key}: ${valueStr}`;
  });

  return `{\n${result.join('\n')}\n${bracketIndent}}`;
};

/**
 * @param {Difference[]} difference - Массив различий между объектами
 * @param {number} depth - Глубина вложенности (по умолчанию 1)
 * @returns {string} - Строка с результатом сравнения в формате stylish
 */
const stylish = (difference, depth = 1) => {
  const indentSize = 4;
  const indent = ' '.repeat((depth * indentSize) - 2);
  const bracketIndent = ' '.repeat(((depth - 1) * indentSize));

  const result = difference.map((object) => {
    if (object.typeDifference === 'deleted') {
      return `${indent}- ${object.key}: ${stylishFormatValue(object.oldValue, depth + 1)}`;
    }

    if (object.typeDifference === 'added') {
      return `${indent}+ ${object.key}: ${stylishFormatValue(object.newValue, depth + 1)}`;
    }

    if (object.typeDifference === 'unchanged') {
      return `${indent}  ${object.key}: ${stylishFormatValue(object.newValue, depth + 1)}`;
    }

    return object.typeDifference === 'changed' && object.children
      ? `${indent}  ${object.key}: ${stylish(object.children, depth + 1)}`
      : `${indent}- ${object.key}: ${stylishFormatValue(object.oldValue, depth + 1)}\n${indent}+ ${object.key}: ${stylishFormatValue(object.newValue, depth + 1)}`;
  });

  return `{\n${result.join('\n')}\n${bracketIndent}}`;
};

export default stylish;
