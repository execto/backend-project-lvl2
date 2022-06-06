import intersection from 'lodash/intersection.js';
import difference from 'lodash/difference.js';
import sortBy from 'lodash/sortBy.js';

import DiffState from '../enums/index.js';

const generateDiff = (firstStruct, secondStruct) => {
  const firstStructKeys = Object.keys(firstStruct);
  const secondStructKeys = Object.keys(secondStruct);

  const deletedKeys = difference(firstStructKeys, secondStructKeys);
  const addedKeys = difference(secondStructKeys, firstStructKeys);
  const intersectionKeys = intersection(firstStructKeys, secondStructKeys);

  const addedProperties = addedKeys.map((key) => ({
    key,
    value: secondStruct[key],
    meta: { state: DiffState.added },
  }));
  const deletedProperties = deletedKeys.map((key) => ({
    key,
    value: firstStruct[key],
    meta: { state: DiffState.deleted },
  }));
  const intersectionProperties = intersectionKeys.map((key) => {
    const firstStructValue = firstStruct[key];
    const secondStructValue = secondStruct[key];

    const property = {
      key,
      meta: {},
    };

    if (firstStructValue === secondStructValue) {
      property.meta.state = DiffState.unchanged;
      property.value = firstStructValue;
      return property;
    }

    property.meta.state = DiffState.changed;
    property.oldValue = firstStructValue;
    property.newValue = secondStructValue;
    return property;
  });

  const diff = sortBy(
    [...addedProperties, ...deletedProperties, ...intersectionProperties],
    ['key']
  );

  return diff;
};

export default generateDiff;
