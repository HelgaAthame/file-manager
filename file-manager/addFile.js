import { access, constants } from 'fs/promises';
import { appendFile } from 'fs/promises';
import { join } from 'path';
import { rl } from './prompt.js';

export const addFile = async (fileName, directoryName) => {

  await access(join(directoryName, fileName), constants.R_OK | constants.W_OK)
  .then(async () => {
    rl.output.write(`File already exists in ${directoryName}\n`);
  })
  .catch(async () => {
    await appendFile(join(directoryName, fileName), '', (error) => {
      if (error) {
        rl.output.write('Operation failed');
      }
    });
  });

};
