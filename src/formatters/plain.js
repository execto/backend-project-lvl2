import isArray from 'lodash/isArray.js';
import isBoolean from 'lodash/isBoolean.js';
import isNull from 'lodash/isNull.js';

import { DiffState, DiffType } from '../enums/index.js';
import isObject from '../utils/lang.js';

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (isArray(value)) {
    return JSON.stringify(value);
  }

  if (isBoolean(value) || isNull(value)) {
    return `${value}`;
  }

  return `'${value}'`;
};

const plain = (diff) => {
  const iter = (diffStruct, path) => {
    const result = diffStruct.reduce((acc, diffItem) => {
      const { key, value, oldValue, newValue, meta } = diffItem;
      const { state, type } = meta;

      if (type === DiffType.nested) {
        const lines = iter(value, [...path, key]);
        return [...acc, ...lines];
      }

      const currentPath = [...path, key].join('.');
      const formattedValue = formatValue(value);
      const oldFormattedValue = formatValue(oldValue);
      const newFormattedValue = formatValue(newValue);

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
