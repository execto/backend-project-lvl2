import { extname } from 'path';

import readers from './readers/index.js';
import { generateDiff, diffToStr } from './diffGenerator/index.js';

const genDiff = (filepath1, filepath2) => {
  const file1Extname = extname(filepath1);
  const file2Extname = extname(filepath2);

  const file1Struct = readers[file1Extname](filepath1);
  const file2Struct = readers[file2Extname](filepath2);

  const diff = generateDiff(file1Struct, file2Struct);
  const diffStr = diffToStr(diff);

  console.log(diffStr);
};

export default genDiff;
