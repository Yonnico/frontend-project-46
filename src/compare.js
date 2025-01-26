import _ from 'lodash';

// Типы различий:
// deleted — ключ был в первом объекте, но отсутствует во втором
// added — ключ отсутствовал в первом объекте, но был добавлен во второй
// changed — ключ присутствовал и в первом и во втором объектах, но значения отличаются
// unchanged — ключ присутствовал и в первом и во втором объектах с одинаковыми значениями

/**
 * @typedef {object} Difference
 * @property {string} key - Ключ
 * @property {string} keyPath - Путь к ключу
 * @property {?unknown} oldValue - Значение в первом объекте
 * @property {?unknown} newValue - Значение во втором объекте
 * @property {?Difference[]} children - Дочерние элементы
 * @property {'deleted' | 'added' | 'changed' | 'unchanged'} typeDifference - Тип различия (см. в compare.js)
 */

/**
 * @param {object} object1 - Первый объект для сравнения
 * @param {object} object2 - Второй объект для сравнения
 * @param {string[]} parentPath - Путь к родительскому ключу
 * @returns {Difference[]} - Массив различий между объектами
 */
export const compare = (object1, object2, parentPath = []) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  const keys = _.union(keys1, keys2).toSorted();

  const buildDifference = (key) => {
    const value1 = object1[key];
    const value2 = object2[key];
    const currentPath = [...parentPath, key];
    const keyPath = currentPath.join('.');

    /**
     * @param {string} typeDifference - Тип различия между объектами
     * @param {unknown} oldValue - Значение в первом объекте
     * @param {unknown} newValue - Значение во втором объекте 
     * @param {?Difference[]} children - Дочерние элементы
     * @returns {Difference} - Объект с информацией о различии
     */
    const createDiff = (typeDifference, oldValue, newValue, children = null) => ({
      key,
      keyPath,
      typeDifference,
      oldValue,
      newValue,
      children,
    });

    if (key in object1 && !(key in object2)) {
      return createDiff('deleted', value1, null);
    }

    if (!(key in object1) && key in object2) {
      return createDiff('added', null, value2);
    }

    const isEqual = _.isEqual(value1, value2);
    const isBothObjects = _.isObject(value1) && _.isObject(value2);

    if (!isEqual && isBothObjects) {
      return createDiff('changed', value1, value2, compare(value1, value2, currentPath));
    }

    return createDiff(isEqual ? 'unchanged' : 'changed', value1, value2);
  };

  return keys.map(buildDifference);
};
