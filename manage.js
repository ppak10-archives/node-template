/**
 * manage.js
 * Entry file for running commands in shell
 */

// Node Modules
const {exec} = require('child_process');

// Constants
const {argv, platform} = process;
const {COMMANDS} = require('./manage.json');
const ARGUMENT_START_INDEX = 2;

class Manage {
  runExec(cmd) {
    exec(cmd, (err, stdout, stderr) => {
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
  }

  getCommand() {
    const arg = argv[ARGUMENT_START_INDEX];
    if (COMMANDS[arg]) {
      if (COMMANDS[arg].platforms[platform]) {
        return COMMANDS[arg].platforms[platform];
      } else {
        console.error(`err: Command not avaliable for '${platform}' platform`);
      }
    } else {
      console.error(`err: '${arg}' is not a recognized argument`);
    }
  }

  start() {
    if (argv.length <= ARGUMENT_START_INDEX) {
      console.error(`err: Please pass an argument`);
    } else {
      const cmd = this.getCommand();
      if (cmd) {
        this.runExec(cmd);
      }
    }
  }
}

const manage = new Manage();
manage.start();
