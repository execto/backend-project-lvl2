import { expect, test } from '@jest/globals';

import plain from '../../src/formatters/plain.js';

const diff = [
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

const expectedResult =
  "Property 'common.follow' was added with value: false\nProperty 'common.setting2' was removed\nProperty 'common.setting3' was updated. From true to null\nProperty 'common.setting4' was added with value: 'blah blah'\nProperty 'common.setting5' was added with value: [complex value]\nProperty 'common.setting6.doge.wow' was updated. From '' to 'so much'\nProperty 'common.setting6.ops' was added with value: 'vops'\nProperty 'group1.baz' was updated. From 'bas' to 'bars'\nProperty 'group1.nest' was updated. From [complex value] to 'str'\nProperty 'group2' was removed\nProperty 'group3' was added with value: [complex value]";

test('plain formatter', () => {
  expect(plain(diff)).toBe(expectedResult);
});
