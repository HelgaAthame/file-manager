import { resolve } from 'path';
import { printDirName } from './printDirName.js';
import { access, constants } from 'fs/promises';
import { rl } from './prompt.js';

export const cat = async (data) => {
  const tempPath = data.slice(4);
  await access(tempPath, constants.R_OK | constants.W_OK)
  .then((file) => {
    if (file.isFile()) {
      output.write('this is file');
    }
    console.log('kuku');
    output.write('kuku');
  })
  .catch(() => console.error('cannot access'));
  printDirName(tempPath);
};
