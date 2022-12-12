import { access, constants } from 'fs/promises';
import { appendFile } from 'fs/promises';
import { join } from 'path';
import { printDirName } from './printDirName.js';
import { rl } from './prompt.js';

export const addFile = async (fileName, directoryName) => {
if ((fileName.startsWith(`"`) || fileName.startsWith(`'`)) && (fileName.endsWith(`"`) || fileName.endsWith(`'`))) {
  fileName = fileName.slice(1, -1);
}

try {
  await access(join(directoryName, fileName), constants.R_OK | constants.W_OK)
  .then(async () => {
    rl.output.write(`Operation failed\n`);
    printDirName(directoryName);
  })
  .catch(async (err) => {
    await appendFile(join(directoryName, fileName), '', (error) => {
      if (error) {
        rl.output.write(`Operation failed\n`);
      }
    })
    .then(async () => {
      printDirName(directoryName);
    });

  });

} catch (e) {
  console.log(`Operation failed`);
  printDirName(directoryName);
}

};
