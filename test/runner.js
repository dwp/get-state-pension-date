const { spawn } = require('node:child_process');
const glob = require('glob');

const testFiles = glob.sync('test/**/*.test.{js,mjs}');

spawn(process.execPath, [
  '--test',
  `--test-reporter=${process.stdout.isTTY ? 'spec' : 'tap'}`,
  '--test-reporter-destination=stdout',
  '--test-reporter=junit',
  '--test-reporter-destination=junit.xml',
  ...testFiles,
], {
  stdio: 'inherit',
  env: { ...process.env },
})
  .on('exit', process.exit);
