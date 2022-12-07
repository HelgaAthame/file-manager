import { stat } from 'fs';
import { rename } from 'fs/promises';
import { join, resolve, dirname } from 'path';
import { rl } from './prompt.js';
import { pathAbsolutize } from './pathAbsoutize.js';

export const renameFile = async (data, defPath) => {
  const [ filePath, newName ]  = data.slice(3).split(' ');
  if (!filePath || !newName) {
    rl.output.write(`Invalid input\n`);
    return;
  }
  let absolutePath = pathAbsolutize(filePath, defPath);

  stat(resolve(absolutePath), async (err) => {
    if (err) {
      rl.output.write(`Operation failed. There is no ${filePath}. Try again)\n`);
      return;
    } else {
      await rename(resolve(absolutePath), join(dirname(absolutePath), newName));
    }
  });

};
