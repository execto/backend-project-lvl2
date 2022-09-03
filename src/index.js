import generateDiff from './diffGenerator/index.js';
import { readFile } from './utils/files.js';
import getFormatter from './formatters/index.js';
import Formatter from './enums/Formatter.js';

const genDiff = (filepath1, filepath2, formatter = Formatter.stylish) => {
  const selectedFormatter = getFormatter(formatter);

  const file1Struct = readFile(filepath1);
  const file2Struct = readFile(filepath2);

  const diff = generateDiff(file1Struct, file2Struct);
  const diffStr = selectedFormatter(diff);

  return diffStr;
};

export default genDiff;
