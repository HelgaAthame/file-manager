import * as fs from 'fs';
import * as crypto from 'crypto';
import { resolve } from 'path';
import { pathAbsolutize } from './pathAbsoutize.js';
import { rl } from './prompt.js';
import { access, constants } from 'fs/promises';

export const calcHash = async (data, path) => {
  const pathFile = data.slice(5);
  let absolutePath = pathAbsolutize(pathFile, path);
  const hash = crypto.createHash('sha256');
  await access(resolve(absolutePath), constants.R_OK | constants.W_OK)
  .then(async () => {
    fs.readFile(resolve(absolutePath), (err, data) => {
      if (err) {
        rl.output.write('Operation failed\n');
      }
      hash.update(data);
      rl.output.write(hash.digest('hex'));
    });
  })
  .catch(() => rl.output.write('Operation failed\n'));

};
