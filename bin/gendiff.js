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
  .option('-f, --format <type>', 'format for diff: [stylish, plain, json]', 'stylish')
  .action((filepath1, filepath2, options) => {
    const { format } = options;
    const diff = genDiff(filepath1, filepath2, format);
    console.log(diff);
  });

program.parse();
