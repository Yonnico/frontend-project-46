import _ from 'lodash';

// Типы различий:
// deleted — ключ был в первом объекте, но отсутствует во втором
// added — ключ отсутствовал в первом объекте, но был добавлен во второй
// changed — ключ присутствовал и в первом и во втором объектах, но значения отличаются
// unchanged — ключ присутствовал и в первом и во втором объектах с одинаковыми значениями

/**
 * @typedef {object} Difference
 * @property {string} key - Ключ
 * @property {?unknown} oldValue - Значение в первом объекте
 * @property {?unknown} newValue - Значение во втором объекте
 * @property {?Difference[]} children - Дочерние элементы
 * @property {'deleted' | 'added' | 'changed' | 'unchanged'} typeDifference - Тип различия (см. в compare.js)
 */

/**
 * @param {object} object1 - Первый объект для сравнения
 * @param {object} object2 - Второй объект для сравнения
 * @returns {Difference[]} - Массив различий между объектами
 */
export const compare = (object1, object2) => {

  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  const keys = _.union(keys1, keys2).toSorted();

  const buildDifference = (key) => {

    const value1 = object1[key];
    const value2 = object2[key];

    if (key in object1 && !(key in object2)) {
      return {
        key,
        typeDifference: 'deleted',
        oldValue: value1,
        newValue: null,
        children: null,
      };
    }

    if (!(key in object1) && key in object2) {
      return {
        key,
        typeDifference: 'added',
        oldValue: null,
        newValue: value2,
        children: null,
      };
    }

    const isEqual = _.isEqual(value1, value2);
    const isBothObjects = _.isObject(value1) && _.isObject(value2);

    const result = {
      key,
      typeDifference: isEqual ? 'unchanged' : 'changed',
      oldValue: value1,
      newValue: value2,
      children: null,
    };

    if (!isEqual && isBothObjects) {
      result.children = compare(value1, value2);
    }

    return result;
  };

  const difference = keys.map(buildDifference);

  return difference;
};
