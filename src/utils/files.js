import { readFileSync } from 'fs';
import { cwd } from 'process';
import { resolve } from 'path';

export const resolvePath = (filePath) => resolve(cwd(), filePath);

export const readFileToText = (filePath) => {
  const fileBuffer = readFileSync(resolve(filePath));

  return fileBuffer.toString();
};
