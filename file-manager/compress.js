import { createReadStream, createWriteStream } from 'fs';
import { resolve, join, basename } from 'path';
import { createBrotliCompress } from 'zlib';
import { pathAbsolutize } from './pathAbsoutize.js';
import { access, constants } from 'fs/promises';
import { rl } from './prompt.js';

export const compress = async (data, defaultPath) => {
  const [pathToFile, pathToDestination ] = data.slice(9).split(' ');
  const brotli = createBrotliCompress();

  if (!pathToFile || !pathToDestination) {
    rl.output.write('Invalid input\n');
  } else {
    let absoluteNewDirPath = pathAbsolutize(pathToDestination, defaultPath);
    let absoluteFilePath = pathAbsolutize(pathToFile, defaultPath);

  await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK)
    .then(async () => {
        await access(resolve(absoluteNewDirPath), constants.R_OK | constants.W_OK)
          .then(async () => {
            await access(join(absoluteNewDirPath, basename(`${absoluteFilePath}.br`)), constants.R_OK | constants.W_OK)
            .then(() => rl.output.write('Operation failed\n'))
            .catch(() => {
              const rs = createReadStream(resolve(absoluteFilePath));
              const ws = createWriteStream(join(absoluteNewDirPath, basename(`${absoluteFilePath}.br`)));
              rs.pipe(brotli).pipe(ws);
            });
          })
          .catch((err) => rl.output.write('Operation failed\n'));
    })
    .catch((err) => rl.output.write('Operation failed\n'));
  }

};
