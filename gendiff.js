const { program } = require('commander');

program
  .name('gendiff')
  .description('Compares two configuration files and generates a difference report.')
  .version('0.0.1')

program.parse();
