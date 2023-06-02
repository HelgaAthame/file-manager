import { unlink } from 'fs/promises';
import { printDirName } from './printDirName.js';
import{ resolve } from 'path';
import { rl } from './prompt.js';
import { pathAbsolutize } from './pathAbsolutize.js';
import { access, constants } from 'fs/promises';

export const deleteFile = async (pathToFil, defPath) => {
  let absoluteFilePath = pathAbsolutize(pathToFil, defPath);
try {
  await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK)
  .then(async () => {
    await unlink(resolve(absoluteFilePath));
    printDirName(defPath);
  })
  .catch((err) => {
    rl.output.write('Operation failed\n');
    printDirName(defPath);
  });
} catch(e) {
  rl.output.write('Invalid input\n');
    printDirName(defPath);
}

};
