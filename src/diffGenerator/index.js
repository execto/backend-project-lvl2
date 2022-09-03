import intersection from 'lodash/intersection.js';
import difference from 'lodash/difference.js';
import sortBy from 'lodash/sortBy.js';

import { DiffState, DiffType } from '../enums/index.js';
import isObject from '../utils/lang.js';

const generateDiff = (firstStruct, secondStruct) => {
  const firstStructKeys = Object.keys(firstStruct);
  const secondStructKeys = Object.keys(secondStruct);

  const deletedKeys = difference(firstStructKeys, secondStructKeys);
  const addedKeys = difference(secondStructKeys, firstStructKeys);
  const intersectionKeys = intersection(firstStructKeys, secondStructKeys);

  const addedProperties = addedKeys.map((key) => ({
    key,
    value: secondStruct[key],
    meta: { state: DiffState.added, type: DiffType.plain },
  }));

  const deletedProperties = deletedKeys.map((key) => ({
    key,
    value: firstStruct[key],
    meta: { state: DiffState.deleted, type: DiffType.plain },
  }));

  const intersectionProperties = intersectionKeys.map((key) => {
    const firstStructValue = firstStruct[key];
    const secondStructValue = secondStruct[key];

    if (isObject(firstStructValue) && isObject(secondStructValue)) {
      const property = {
        key,
        value: generateDiff(firstStructValue, secondStructValue),
        meta: {
          type: DiffType.nested,
        },
      };
      return property;
    }

    if (firstStructValue === secondStructValue) {
      const property = {
        key,
        value: firstStructValue,
        meta: {
          state: DiffState.unchanged,
          type: DiffType.plain,
        },
      };
      return property;
    }

    const property = {
      key,
      oldValue: firstStructValue,
      newValue: secondStructValue,
      meta: {
        state: DiffState.changed,
        type: DiffType.plain,
      },
    };
    return property;
  });

  const diff = sortBy(
    [...addedProperties, ...deletedProperties, ...intersectionProperties],
    ['key'],
  );

  return diff;
};

export default generateDiff;
