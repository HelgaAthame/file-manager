import * as fs from 'fs';
import * as crypto from 'crypto';
import { resolve } from 'path';
import { pathAbsolutize } from './pathAbsolutize.js';
import { rl } from './prompt.js';
import { access, constants } from 'fs/promises';
import { printDirName } from './printDirName.js';

export const calcHash = async (data, path) => {
  let pathFile = data.slice(5);

  if ((pathFile.startsWith(`"`) || pathFile.startsWith(`'`)) && (pathFile.endsWith(`"`) || pathFile.endsWith(`'`))) {
    pathFile = pathFile.slice(1, -1);
  }

  let absolutePath = pathAbsolutize(pathFile, path);
  const hash = crypto.createHash('sha256');
  await access(resolve(absolutePath), constants.R_OK | constants.W_OK)
  .then(async () => {
    fs.readFile(resolve(absolutePath), (err, data) => {
      if (err) {
        rl.output.write('Operation failed\n');
        printDirName(path);
      }
      hash.update(data);
      rl.output.write(hash.digest('hex'));
      rl.output.write(`\n`);
      printDirName(path);
    });
  })
  .catch(() => {
    rl.output.write('Operation failed\n');
    printDirName(path);
  });

};
