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

  constructor() {
    this.arg = argv[ARGUMENT_START_INDEX];
    this.branches = {
      remote: [],
    };
  };

  runExec(cmd, callback) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        console.error(`err: ${err.message}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      if (callback) {
        callback(stdout);
      } else {
        // eslint-disable-next-line no-console
        console.log(stdout);
      }

    });
  }

  getCommand() {
    if (COMMANDS[this.arg]) {
      if (COMMANDS[this.arg].platforms[platform]) {
        return COMMANDS[this.arg].platforms[platform];
      } else {
        console.error(`err: Command not avaliable for '${platform}' platform`);
      }
    } else {
      console.error(`err: '${this.arg}' is not a recognized argument`);
    }
  }

  start() {
    if (argv.length <= ARGUMENT_START_INDEX) {
      console.error(`err: Please pass an argument`);
    } else {
      const cmd = this.getCommand();
      if (cmd) {
        switch (this.arg) {
          case 'list-branches':
            this.runExec(cmd, (stdout) => {
              this.branches = {
                remote: stdout.match(/\bremotes\/origin\/(?!HEAD)[^\n]+/g),
              };
            });
            break;
          default:
            this.runExec(cmd);
            break;
        }
      }
    }
  }
}

const manage = new Manage();
manage.start();
