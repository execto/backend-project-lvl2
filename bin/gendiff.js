#!/usr/bin/env node
import { Command } from 'commander';

import genDiff from '../src/index.js';

const program = new Command();
program.name('gendiff');
program.description('Compares two configuration files and shows a difference.');
program.version('1.0.0');

program
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format <type>', 'output format')
  .action(genDiff);

program.parse();
