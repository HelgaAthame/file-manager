import { stat } from 'fs';
import { rename } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { rl } from './prompt.js';
import { pathAbsolutize } from './pathAbsolutize.js';
import { printDirName } from './printDirName.js';

export const renameFile = async (data, defPath) => {
try {
  const newData = data.slice(3);
  let filePath, newName;
  if (/\"\s+\"/.test(newData)) {
    [ filePath, newName ] = newData.slice(1, -1).split(/\"\s+\"/);
  } else {
    [ filePath, newName ] = newData.split(' ');
    if ((filePath.startsWith(`"`) || filePath.startsWith(`'`)) && (filePath.endsWith(`"`) || filePath.endsWith(`'`))) {
      filePath = filePath.slice(1, -1);
    }
    if ((newName.startsWith(`"`) || newName.startsWith(`'`)) && (newName.endsWith(`"`) || newName.endsWith(`'`))) {
      newName = newName.slice(1, -1);
    }
  }


  if (!filePath || !newName) {
    rl.output.write(`Invalid input\n`);
    printDirName(defPath);
    return;
  }
  let absolutePath = pathAbsolutize(filePath, defPath);

  stat(resolve(absolutePath), async (err) => {
    if (err) {
      rl.output.write(`Operation failed\n`);
      printDirName(defPath);
      return;
    } else {
      await rename(resolve(absolutePath), join(dirname(absolutePath), newName));
      printDirName(defPath);
    }
  });
} catch (e) {
  rl.output.write(`Invalid input\n`);
  printDirName(defPath);
}
};
