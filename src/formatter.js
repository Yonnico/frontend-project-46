import _ from 'lodash';
export const formatter = (difference, format) => {

  const formatTypes = {
    stylish: stylish,
    plain: plain,
    json: json
  };

  return formatTypes[format](difference);
};

const formatObject = (object, depth = 1) => {

  if (!_.isObject(object)) {
    return object;
  }

  const indentSize = 4;
  const currentIndent = ' '.repeat(depth * indentSize);
  const bracketIndent = ' '.repeat(((depth - 1) * indentSize));

  const entries = Object.entries(object);

  const result = entries.map(([key, value]) => {
    const valueStr = formatObject(value, depth + 1);
    return `\n${currentIndent}${key}: ${valueStr}`;
  });

  return `{${result.join('')}\n${bracketIndent}}`;
};

const stylish = (difference, depth = 1) => {
  const indentSize = 4;
  const indent = ' '.repeat((depth * indentSize) - 2);
  const bracketIndent = ' '.repeat(((depth - 1) * indentSize));

  const result = difference.map((object) => {
    if (object.typeDifference === 'deleted') {
      return `\n${indent}- ${object.key}: ${formatObject(object.oldValue, depth + 1)}`;
    }

    if (object.typeDifference === 'added') {
      return `\n${indent}+ ${object.key}: ${formatObject(object.newValue, depth + 1)}`;
    }

    if (object.typeDifference === 'unchanged') {
      return `\n${indent}  ${object.key}: ${formatObject(object.newValue, depth + 1)}`;
    }

    return object.typeDifference === 'changed' && object.children
      ? `\n${indent}  ${object.key}: ${stylish(object.children, depth + 1)}`
      : `\n${indent}- ${object.key}: ${formatObject(object.oldValue, depth + 1)}\n${indent}+ ${object.key}: ${formatObject(object.newValue, depth + 1)}`;
  });

  return `{${result.join('')}\n${bracketIndent}}`;
};

const plain = (difference) => {
  return difference.join(''); // TODO: implement
};

const json = (difference) => {
  return difference.join(''); // TODO: implement
};
