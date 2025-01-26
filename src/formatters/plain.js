import _ from 'lodash';

/**
 * @param {Difference[]} difference - Массив различий между объектами
 * @returns {string} - Строка с результатом сравнения в формате plain
 */
const plainFormatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

export const plain = (difference) => {
  const result = difference.map((object) => {
    if (object.typeDifference === 'unchanged') {
      return [];
    }

    if (object.typeDifference === 'deleted') {
      return `Property '${object.keyPath}' was removed`;
    }

    if (object.typeDifference === 'added') {
      return `Property '${object.keyPath}' was added with value: ${plainFormatValue(object.newValue)}`;
    }

    return object.typeDifference === 'changed' && object.children
      ? plain(object.children)
      : `Property '${object.keyPath}' was updated. From ${plainFormatValue(object.oldValue)} to ${plainFormatValue(object.newValue)}`;
  });

  return result.flat().join('\n');
};
