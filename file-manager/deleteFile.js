import { unlink } from 'fs/promises';
import { stat } from 'fs';
import{ resolve } from 'path';
import { rl } from './prompt.js';
import { pathAbsolutize } from './pathAbsoutize.js';
import { access, constants } from 'fs/promises';

export const deleteFile = async (pathToFil, defPath) => {
  let absoluteFilePath = pathAbsolutize(pathToFil, defPath);

  await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK)
  .then(async () => {
    await unlink(resolve(absoluteFilePath));
  })
  .catch((err) => rl.output.write('Operation failed\n'));

  /*stat(resolve(absoluteFilePath), async (err) => {
    if (err) {
      rl.output.write('Operation failed\n');
    } else {
      await unlink(resolve(absoluteFilePath));
    }
  })*/
};
