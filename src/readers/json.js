import { readFileToText } from '../utils/files.js';

const readJson = (filepath) => {
  const fileText = readFileToText(filepath);

  return JSON.parse(fileText);
};

export default readJson;
