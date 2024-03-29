import isArray from 'lodash/isArray.js';
import isString from 'lodash/isString.js';

import { DiffState, DiffType } from '../enums/index.js';
import isObject from '../utils/lang.js';

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (isArray(value)) {
    return JSON.stringify(value);
  }

  if (isString(value)) {
    return `'${value}'`;
  }

  return `${value}`;
};

const plain = (diff) => {
  const iter = (diffStruct, path) => {
    const result = diffStruct.reduce((acc, diffItem) => {
      const { state, type } = diffItem.meta;

      if (type === DiffType.nested) {
        const lines = iter(diffItem.value, [...path, diffItem.key]);
        return [...acc, ...lines];
      }

      const currentPath = [...path, diffItem.key].join('.');
      const formattedValue = formatValue(diffItem.value);
      const oldFormattedValue = formatValue(diffItem.oldValue);
      const newFormattedValue = formatValue(diffItem.newValue);

      if (state === DiffState.added) {
        const line = `Property '${currentPath}' was added with value: ${formattedValue}`;
        return [...acc, line];
      }

      if (state === DiffState.deleted) {
        const line = `Property '${currentPath}' was removed`;
        return [...acc, line];
      }

      if (state === DiffState.changed) {
        const line = `Property '${currentPath}' was updated. From ${oldFormattedValue} to ${newFormattedValue}`;
        return [...acc, line];
      }

      return acc;
    }, []);

    return result;
  };

  const formattedDif = iter(diff, []);

  return formattedDif.join('\n');
};

export default plain;
