import { expect, test } from '@jest/globals';
import isObject from '../../src/utils/lang';

test('value is object', () => {
  expect(isObject({})).toBeTruthy();
  expect(isObject({ a: 1, b: 2 })).toBeTruthy();

  expect(isObject([1, 2, 3])).toBeFalsy();
  expect(
    isObject(() => {
      console.log('i`m a function, not an object');
    })
  ).toBeFalsy();
});
