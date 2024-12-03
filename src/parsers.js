import fs from 'fs';
import path from 'path';
import process from 'process';
import yaml from 'js-yaml';

export const getPath = (filepath) => path.resolve(process.cwd(), filepath);
export const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'utf-8');

export const fileParser = (filepath) => {

  const parseTypes = {
    json: JSON.parse,
    yml: yaml.load,
    yaml: yaml.load
  };

  const content = readFile(filepath);
  const type = path.extname(filepath).slice(1);
  
  const result = parseTypes[type](content);

  return result;
}