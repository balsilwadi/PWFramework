#!/usr/bin/node
/* eslint-disable prettier/prettier */
const { spawn } = require('child_process');
const { ArgumentParser } = require('argparse');
const os = require('os');

const parser = new ArgumentParser();
parser.add_argument('--tags', { help: 'scenarios to run, e.g. @ACNT_022' });
parser.add_argument('--env', { default: 'qa-crate-us', help: 'site to target, e.g. qa-cb2-ca' });
parser.add_argument('--device', { default: 'Desktop Chrome', help: 'device to test on, e.g. iPhone 13' });
parser.add_argument('--report', { action: 'store_true', help: 'if included, generate report' });
parser.add_argument('--headless', { action: 'store_true', help: 'if included, run as headless' });
parser.add_argument('--rerun', { default: '', help: 'if included, run failed' });
const args = parser.parse_args();
// Check the value of --env and modify --tags to restrict the scenarios based on applicable sites
switch (true) {
  case args.env.includes('crate-us'):
    args.tags = args.tags ? `${args.tags} and @CBUS` : '@CBUS';
    break;
  case args.env.includes('cb2-us'):
    args.tags = args.tags ? `${args.tags} and @CB2US` : '@CB2US';
    break;
  case args.env.includes('crate-ca'):
    args.tags = args.tags ? `${args.tags} and @CBCA` : '@CBCA';
    break;
  case args.env.includes('cb2-ca'):
    args.tags = args.tags ? `${args.tags} and @CB2CA` : '@CB2CA';
    break;
  default:
    args.tags = args.tags ? `${args.tags}` : '';
    break;
}

process.env.ENV = args.env;
process.env.DEVICE = args.device;
process.env.HEADLESS = args.headless;

require('dotenv').config({ path: `./support/env/${args.env}.env`, override: true });

const commandChainOperator = os.platform() === 'win32' ? '&' : ';';

const enableRerun = true;
let rerunCommand = `${commandChainOperator} npm run cucumber -- --tags "${args.tags}" -p rerun @rerun.txt`;
rerunCommand = !enableRerun ? (rerunCommand = '') : rerunCommand;
const command = `run cucumber -- --tags "${args.tags}" ${rerunCommand} ${args.report ? `${commandChainOperator} npm run report` : ''}`;
spawn('npm', command.split(' '), { env: process.env, shell: true, stdio: 'inherit' });
