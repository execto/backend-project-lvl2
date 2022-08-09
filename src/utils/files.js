import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve, extname } from 'path';
import parsers from '../parsers/index.js';

export const resolvePath = (filePath) => resolve(cwd(), filePath);

export const readFileToText = (filePath) => {
  const fileBuffer = readFileSync(resolve(filePath));

  return fileBuffer.toString();
};

export const readFile = (filePath) => {
  const fileExtension = extname(filePath);
  const fileContent = readFileToText(filePath);

  const structure = parsers[fileExtension](fileContent);

  return structure;
};
