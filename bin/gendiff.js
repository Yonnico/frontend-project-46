#!/usr/bin/env node

import { program } from 'commander';
import { readFile } from '../utils/pathbuilder.js';
import { compare } from '../utils/compare.js';

program
  .name('gendiff')
  .description('Compares two configuration files and generates a difference report.')
  .version('0.0.1')
  .argument('<filipath1>', 'first file path')
  .argument('<filipath2>', 'second file path')
  .option('-f, --format [type]', 'output format')
  .action((first, second) => {
    const file1Content = JSON.parse(readFile(first));
    const file2Content = JSON.parse(readFile(second));    

    const result = compare(file1Content, file2Content);

    console.log(result);
  });

program.parse();
