import { DiffState, DiffType } from '../enums/index.js';
import isObject from '../utils/lang.js';

const DEFAULT_SPACES = 4;
const REPLACER = ' ';

const formatValue = (value, spaces) => {
  if (isObject(value)) {
    const indent = REPLACER.repeat(spaces);
    const endBracketIndent = REPLACER.repeat(spaces - DEFAULT_SPACES);
    const lines = Object.entries(value).map(
      ([key, propValue]) => `${indent}${key}: ${formatValue(propValue, spaces + DEFAULT_SPACES)}`
    );

    return ['{', ...lines, `${endBracketIndent}}`].join('\n');
  }

  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  return `${value}`;
};

const stylish = (diff) => {
  const iter = (currentDiff, spaces) => {
    const indent = REPLACER.repeat(spaces);
    const indentForDiff = REPLACER.repeat(spaces - 2);
    const endBracketIndent = REPLACER.repeat(spaces - DEFAULT_SPACES);

    const lines = currentDiff.flatMap((diffItem) => {
      const {
        key,
        value,
        oldValue,
        newValue,
        meta: { state, type },
      } = diffItem;

      if (type === DiffType.nested) {
        return `${indent}${key}: ${iter(value, spaces + DEFAULT_SPACES)}`;
      }

      const formattedValue = formatValue(value, spaces + DEFAULT_SPACES);

      if (state === DiffState.added) {
        return `${indentForDiff}+ ${key}: ${formattedValue}`;
      }

      if (state === DiffState.deleted) {
        return `${indentForDiff}- ${key}: ${formattedValue}`;
      }

      if (state === DiffState.unchanged) {
        return `${indent}${key}: ${formattedValue}`;
      }

      return [
        `${indentForDiff}- ${key}: ${formatValue(oldValue, spaces + DEFAULT_SPACES)}`,
        `${indentForDiff}+ ${key}: ${formatValue(newValue, spaces + DEFAULT_SPACES)}`,
      ];
    });

    return ['{', ...lines, `${endBracketIndent}}`].join('\n');
  };

  return iter(diff, DEFAULT_SPACES);
};

export default stylish;
