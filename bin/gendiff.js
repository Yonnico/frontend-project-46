#!/usr/bin/env node

import { program } from 'commander';
import { readFile } from '../src/pathbuilder.js';
import { compare } from '../src/compare.js';

program
  .name('gendiff')
  .description('Compares two configuration files and generates a difference report.')
  .version('0.0.1')
  .argument('<filipath1>', 'first file path')
  .argument('<filipath2>', 'second file path')
  .option('-f, --format [type]', 'output format')
  .action((first, second, options) => {
    console.log(compare(readFile(first), readFile(second), options.format));
  });

program.parse();
