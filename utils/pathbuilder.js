import fs from 'fs';
import path from 'path';
import process from 'process';

export const getPath = (filename) => path.resolve(process.cwd(), filename);
export const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8').trim();
