import _ from 'lodash';

// Типы различий:
// deleted — ключ был в первом объекте, но отсутствует во втором
// added — ключ отсутствовал в первом объекте, но был добавлен во второй
// changed — ключ присутствовал и в первом и во втором объектах, но значения отличаются
// unchanged — ключ присутствовал и в первом и во втором объектах с одинаковыми значениями

/**
 * @typedef {object} Difference - Объект с информацией о различии
 * @property {string} key - Ключ
 * @property {string} keyPath - Путь к ключу
 * @property {'deleted' | 'added' | 'changed' | 'unchanged'} typeDifference - Тип (см. в compare.js)
 * @property {?unknown} oldValue - Значение в первом объекте
 * @property {?unknown} newValue - Значение во втором объекте
 * @property {?Difference[]} children - Дочерние элементы
 */

/**
 * @param {string} key - Ключ
 * @param {string} keyPath - Путь к ключу
 * @param {'deleted' | 'added' | 'changed' | 'unchanged'} typeDifference
 * @param {?unknown} oldValue - Значение в первом объекте
 * @param {?unknown} newValue - Значение во втором объекте
 * @param {?Difference[]} children - Дочерние элементы
 * @returns {Difference} - Объект с информацией о различии
 */
const createDiff = (key, keyPath, typeDifference, oldValue, newValue, children = null) => ({
  key,
  keyPath,
  typeDifference,
  oldValue,
  newValue,
  children,
});

/**
 * @param {object} object1 - Первый объект для сравнения
 * @param {object} object2 - Второй объект для сравнения
 * @param {string[]} parentPath - Путь к родительскому ключу
 * @returns {Difference[]} - Массив различий между объектами
 */
const compare = (object1, object2, parentPath = []) => {
  const keys = _.union(Object.keys(object1), Object.keys(object2)).toSorted();

  const buildDifference = (key, path) => {
    const currentPath = [...path, key].join('.');

    if (key in object1 && !(key in object2)) {
      return createDiff(key, currentPath, 'deleted', object1[key], null);
    }

    if (!(key in object1) && key in object2) {
      return createDiff(key, currentPath, 'added', null, object2[key]);
    }

    const isEqual = _.isEqual(object1[key], object2[key]);
    const isBothObjects = _.isObject(object1[key]) && _.isObject(object2[key]);

    if (!isEqual && isBothObjects) {
      return createDiff(
        key,
        currentPath,
        'changed',
        object1[key],
        object2[key],
        compare(object1[key], object2[key], [...path, key])
      );
    }

    return createDiff(
      key,
      currentPath,
      isEqual ? 'unchanged' : 'changed',
      object1[key],
      object2[key]
    );
  };

  return keys.map((key) => buildDifference(key, parentPath));
};

export default compare;
