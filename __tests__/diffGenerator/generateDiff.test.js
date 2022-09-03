import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import generateDiff from '../../src/diffGenerator/index.js';
import { readFile } from '../../src/utils/files.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '..', '__fixtures__', filename);

const expectedResult = [
  {
    key: 'common',
    meta: {
      type: 'nested',
    },
    value: [
      {
        key: 'follow',
        value: false,
        meta: {
          state: 'added',
          type: 'plain',
        },
      },
      {
        key: 'setting1',
        meta: {
          state: 'unchanged',
          type: 'plain',
        },
        value: 'Value 1',
      },
      {
        key: 'setting2',
        value: 200,
        meta: {
          state: 'deleted',
          type: 'plain',
        },
      },
      {
        key: 'setting3',
        meta: {
          state: 'changed',
          type: 'plain',
        },
        oldValue: true,
        newValue: null,
      },
      {
        key: 'setting4',
        value: 'blah blah',
        meta: {
          state: 'added',
          type: 'plain',
        },
      },
      {
        key: 'setting5',
        value: {
          key5: 'value5',
        },
        meta: {
          state: 'added',
          type: 'plain',
        },
      },
      {
        key: 'setting6',
        meta: {
          type: 'nested',
        },
        value: [
          {
            key: 'doge',
            meta: {
              type: 'nested',
            },
            value: [
              {
                key: 'wow',
                meta: {
                  state: 'changed',
                  type: 'plain',
                },
                oldValue: '',
                newValue: 'so much',
              },
            ],
          },
          {
            key: 'key',
            meta: {
              state: 'unchanged',
              type: 'plain',
            },
            value: 'value',
          },
          {
            key: 'ops',
            value: 'vops',
            meta: {
              state: 'added',
              type: 'plain',
            },
          },
        ],
      },
    ],
  },
  {
    key: 'group1',
    meta: {
      type: 'nested',
    },
    value: [
      {
        key: 'baz',
        meta: {
          state: 'changed',
          type: 'plain',
        },
        oldValue: 'bas',
        newValue: 'bars',
      },
      {
        key: 'foo',
        meta: {
          state: 'unchanged',
          type: 'plain',
        },
        value: 'bar',
      },
      {
        key: 'nest',
        meta: {
          state: 'changed',
          type: 'plain',
        },
        oldValue: {
          key: 'value',
        },
        newValue: 'str',
      },
    ],
  },
  {
    key: 'group2',
    value: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
    meta: {
      state: 'deleted',
      type: 'plain',
    },
  },
  {
    key: 'group3',
    value: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
    meta: {
      state: 'added',
      type: 'plain',
    },
  },
];

test('generate diff from json', () => {
  const file1Path = getFixturePath('bigFile1.json');
  const file2Path = getFixturePath('bigFile2.json');
  const file1Struct = readFile(file1Path);
  const file2Struct = readFile(file2Path);

  expect(generateDiff(file1Struct, file2Struct)).toStrictEqual(expectedResult);
});

test('generate diff from yaml', () => {
  const file1Path = getFixturePath('bigFile1.yaml');
  const file2Path = getFixturePath('bigFile2.yml');
  const file1Struct = readFile(file1Path);
  const file2Struct = readFile(file2Path);

  expect(generateDiff(file1Struct, file2Struct)).toStrictEqual(expectedResult);
});
