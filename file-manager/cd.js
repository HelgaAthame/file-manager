import { resolve } from 'path';
import { access, constants, stat } from 'fs/promises';
import { pathAbsolutize } from './pathAbsolutize.js';
import { rl } from './prompt.js';
import { printDirName } from './printDirName.js';

export const cd = async (dat, pat) => {
  let tempPath = dat.slice(3);

  try {

    if ((tempPath.startsWith(`"`) || tempPath.startsWith(`'`)) && (tempPath.endsWith(`"`) || tempPath.endsWith(`'`))) {
      tempPath = tempPath.slice(1, -1);
    }

    let absolutePath = pathAbsolutize(tempPath, pat);

    await access(absolutePath)
      .catch((e) => {
        rl.output.write('Operation failed\n');
        printDirName(pat);
        return pat;
      });

    const stats = await stat(absolutePath);
      if(stats) {
        if (stats.isFile()) {
          rl.output.write('Operation failed\n');
          printDirName(pat);
          return pat;
        }
        if (stats.isDirectory()) {
          pat = absolutePath;
          printDirName(pat);
          return absolutePath;
        }
      } else {
        rl.output.write('Operation failed\n');
        printDirName(pat);
        return pat;
      }
    return pat;
  } catch {(e) => {
    rl.output.write('Invalid input\n\n');
    printDirName(pat);
    return pat;
  }}
}
