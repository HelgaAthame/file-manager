import { resolve } from 'path';
import { access, constants } from 'fs/promises';
import { pathAbsolutize } from './pathAbsoutize.js';
import { rl } from './prompt.js';

export const cd = async (dat, pat) => {
  let tempPath = dat.slice(3);
  let absolutePath = pathAbsolutize(tempPath, pat);
  await access(resolve(absolutePath), constants.R_OK | constants.W_OK)
    .then(() => {
       pat = absolutePath;
    })
    .catch(() => rl.output.write('Operation failed\n'));
    return pat;
  }
