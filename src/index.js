import { generateDiff, diffToStr } from './diffGenerator/index.js';
import { readFile } from './utils/files.js';

const genDiff = (filepath1, filepath2) => {
  const file1Struct = readFile(filepath1);
  const file2Struct = readFile(filepath2);

  const diff = generateDiff(file1Struct, file2Struct);
  const diffStr = diffToStr(diff);

  console.log(diffStr.replace(/\n/g, '\\n').replace(/\t/, '\\t'));
};

export default genDiff;
