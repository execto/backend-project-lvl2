import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import generateDiff from '../src/diffGenerator/generateDiff.js';
import DiffState from '../src/enums/DiffStatus.js';
import { readFile } from '../src/utils/files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const expectedResult = [
  {
    key: 'follow',
    value: false,
    meta: { state: DiffState.deleted },
  },
  {
    key: 'host',
    value: 'hexlet.io',
    meta: { state: DiffState.unchanged },
  },
  {
    key: 'proxy',
    value: '123.234.53.22',
    meta: { state: DiffState.deleted },
  },
  {
    key: 'timeout',
    oldValue: 50,
    newValue: 20,
    meta: { state: DiffState.changed },
  },
  {
    key: 'verbose',
    value: true,
    meta: { state: DiffState.added },
  },
];

test('generate diff from json', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const file1Struct = readFile(file1Path);
  const file2Struct = readFile(file2Path);

  expect(generateDiff(file1Struct, file2Struct)).toStrictEqual(expectedResult);
});

test('generate diff from yaml', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const file1Struct = readFile(file1Path);
  const file2Struct = readFile(file2Path);

  expect(generateDiff(file1Struct, file2Struct)).toStrictEqual(expectedResult);
});
