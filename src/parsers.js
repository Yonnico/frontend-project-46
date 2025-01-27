import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

/**
 * @param {string} filepath - Путь к файлу
 * @returns {string} - Абсолютный путь к файлу
 */
export const getPath = (filepath) => path.resolve(process.cwd(), filepath);

/**
 * @param {string} filepath - Путь к файлу
 * @returns {string} - Содержимое файла
 */
export const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

/**
 * @param {string} filepath - Путь к файлу
 * @returns {object} - Содержимое файла
 */
export const fileParser = (filepath) => {
  const parseTypes = {
    json: (content) => JSON.parse(content),
    yml: (content) => yaml.load(content),
    yaml: (content) => yaml.load(content),
  };

  const content = readFile(filepath);
  const type = path.extname(filepath).slice(1);

  const result = parseTypes[type](content);

  return result;
};
