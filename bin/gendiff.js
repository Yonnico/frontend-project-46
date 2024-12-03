#!/usr/bin/env node

import { program } from 'commander';
import { fileParser } from '../src/parsers.js';
import { compare } from '../src/compare.js';

program
  .name('gendiff')
  .description('Compares two configuration files and generates a difference report.')
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2, options) => {
    console.log(compare(fileParser(filepath1), fileParser(filepath2), options.format));
  });

program.parse();
