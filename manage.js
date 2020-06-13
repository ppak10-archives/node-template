/**
 * manage.js
 * Entry file for running commands in shell
 */

// Node Modules
const {exec} = require('child_process');

// Constants
const {argv, platform} = process;
const {COMMANDS} = require('./manage.json');
const ARGUMENT_INDEX = 2;

const manage = () => {
  if (argv.length <= ARGUMENT_INDEX) {
    console.error(`err: Please pass an argument`);
  } else {
    const command = COMMANDS[argv[ARGUMENT_INDEX]].platforms[platform];
    run(command);
  }
};

const run = (command) => {
  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error(`err: ${err.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    // eslint-disable-next-line no-console
    console.log(`stdout: ${stdout}`);
  });
};

manage();
