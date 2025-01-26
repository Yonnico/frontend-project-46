/**
 * @param {Difference[]} difference - Массив различий между объектами
 * @returns {string} - Строка с результатом сравнения в формате json
 */
export const json = (difference) => JSON.stringify(difference, null, 2);