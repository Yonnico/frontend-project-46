import { readFile } from './utils/pathbuilder.js';
import { program } from 'commander';

program
  .name('gendiff')
  .description('Compares two configuration files and generates a difference report.')
  .version('0.0.1')
  .argument('<filipath1>', 'first file path')
  .argument('<filipath2>', 'second file path')
  .option('-f, --format [type]', 'output format')
  .action((first, second, options) => {
    const file1Content = readFile(first);
    const file2Content = readFile(second);
  });

program.parse();
