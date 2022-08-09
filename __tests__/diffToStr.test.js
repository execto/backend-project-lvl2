import { expect, test } from '@jest/globals';

import diffToStr from '../src/diffGenerator/diffToStr.js';
import DiffState from '../src/enums/DiffStatus.js';

const diff = [
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

const expectedResult =
  '{\n  - follow: false\n    host: hexlet.io\n  - proxy: 123.234.53.22\n  - timeout: 50\n  + timeout: 20\n  + verbose: true\n}';

test('diff to str', () => {
  expect(diffToStr(diff)).toBe(expectedResult);
});
