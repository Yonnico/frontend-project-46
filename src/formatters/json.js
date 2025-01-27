/**
 * @param {Difference[]} difference - Массив различий между объектами
 * @returns {string} - Строка с результатом сравнения в формате json
 */
export default (difference) => JSON.stringify(difference, null, 2);
