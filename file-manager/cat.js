import { createReadStream  } from 'fs';
import { resolve } from 'path';
import { rl } from './prompt.js';
import { pathAbsolutize } from './pathAbsolutize.js';
import { access, constants } from 'fs/promises';
import { printDirName } from './printDirName.js';

export const cat = async (data, pat) => {
  let filePath = data.slice(4);
  if ((filePath.startsWith(`"`) || filePath.startsWith(`'`)) && (filePath.endsWith(`"`) || filePath.endsWith(`'`))) {
    filePath = filePath.slice(1, -1);
  }
  let absolutePath = pathAbsolutize(filePath, pat);

  await access(resolve(absolutePath), constants.R_OK | constants.W_OK)
  .then(async () => {
    const rs = createReadStream(resolve(absolutePath));
    rs.on('error', () => rl.output.write('Operation failed\n'));
    rs.on('data', data => rl.output.write(data));
    rs.on('end', () => printDirName(pat));
  })
  .catch(() => {
    rl.output.write('Operation failed\n');
    printDirName(pat);
  });

};
