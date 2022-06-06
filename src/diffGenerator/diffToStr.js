import DiffState from '../enums/index.js';

const diffToStr = (diff) => {
  const diffsAsStr = diff
    .map((curDiff) => {
      const diffState = curDiff.meta.state;

      let diffStr;
      if (diffState === DiffState.added) {
        diffStr = `  + ${curDiff.key}: ${curDiff.value}`;
      }

      if (diffState === DiffState.deleted) {
        diffStr = `  - ${curDiff.key}: ${curDiff.value}`;
      }

      if (diffState === DiffState.unchanged) {
        diffStr = `    ${curDiff.key}: ${curDiff.value}`;
      }

      if (diffState === DiffState.changed) {
        diffStr = `  - ${curDiff.key}: ${curDiff.oldValue}\n  + ${curDiff.key}: ${curDiff.newValue}`;
      }

      return diffStr;
    })
    .join('\n');

  return `{\n${diffsAsStr}\n}`;
};

export default diffToStr;
