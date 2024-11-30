const { program } = require('commander');

program
  .name('gendiff')
  .description('Compares two configuration files and generates a difference report.')
  .version('0.0.1')
  .argument('<filipath1>', 'first file path')
  .argument('<filipath2>', 'second file path')
  .option('-f, --format [type]', 'output format')

program.parse();
