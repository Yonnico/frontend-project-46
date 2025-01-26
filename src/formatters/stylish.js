import _ from 'lodash';

/**
 * @param {unknown} value - Значение для форматирования
 * @param {number} depth - Глубина вложенности (по умолчанию 1)
 * @returns {string} - Строка с форматированным значением
 */
const stylishFormatValue = (value, depth = 1) => {

  if (!_.isObject(value)) {
    return value;
  }

  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat(((depth - 1) * indentSize));

  const entries = Object.entries(value);

  const result = entries.map(([key, value]) => {
    const valueStr = stylishFormatValue(value, depth + 1);
    return `\n${currentIndent}${key}: ${valueStr}`;
  });

  return `{${result.join('')}\n${bracketIndent}}`;
};

/**
 * @param {Difference[]} difference - Массив различий между объектами
 * @param {number} depth - Глубина вложенности (по умолчанию 1)
 * @returns {string} - Строка с результатом сравнения в формате stylish
 */
export const stylish = (difference, depth = 1) => {
  const indentSize = 4;
  const indent = ' '.repeat((depth * indentSize) - 2);
  const bracketIndent = ' '.repeat(((depth - 1) * indentSize));

  const result = difference.map((object) => {
    if (object.typeDifference === 'deleted') {
      return `\n${indent}- ${object.key}: ${stylishFormatValue(object.oldValue, depth + 1)}`;
    }

    if (object.typeDifference === 'added') {
      return `\n${indent}+ ${object.key}: ${stylishFormatValue(object.newValue, depth + 1)}`;
    }

    if (object.typeDifference === 'unchanged') {
      return `\n${indent}  ${object.key}: ${stylishFormatValue(object.newValue, depth + 1)}`;
    }

    return object.typeDifference === 'changed' && object.children
      ? `\n${indent}  ${object.key}: ${stylish(object.children, depth + 1)}`
      : `\n${indent}- ${object.key}: ${stylishFormatValue(object.oldValue, depth + 1)}\n${indent}+ ${object.key}: ${stylishFormatValue(object.newValue, depth + 1)}`;
  });

  return `{${result.join('')}\n${bracketIndent}}`;
};
