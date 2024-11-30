import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPath = (filename) => path.join(__dirname, '..', filename);
export const readFile = (filename) => fs.readFileSync(getPath(filename), 'utf-8').trim();
