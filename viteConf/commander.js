const program = require('commander');
const colors = require('colors');

program
  .version('1.0.0')
  .option('-m, --mode <string>', 'Add development mode')
  .option('-e, --env <string>', 'Add enviroment')
  .option('-p, --preview <string>', 'Preview or not')
  .parse(process.argv);

const mode = program.getOptionValue('mode');
const env = program.getOptionValue('env');
const is_preview = !!program.getOptionValue('preview');


module.exports = {
  mode,
  is_preview,
  env
}