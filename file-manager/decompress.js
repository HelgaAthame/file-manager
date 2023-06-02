import { createReadStream, createWriteStream } from 'fs';
import { resolve, join, basename } from 'path';
import { createBrotliDecompress } from 'zlib';
import { pathAbsolutize } from './pathAbsolutize.js';
import { access, constants } from 'fs/promises';
import { rl } from './prompt.js';
import { printDirName } from './printDirName.js';
import { stat } from 'fs';

export const decompress = async (data, defaultPath) => {
  let newData = data.slice(11);
  try {

    let pathToFile, pathToDestination;
    if (/\"\s+\"/.test(newData)) {
      [ pathToFile, pathToDestination ] = newData.slice(1, -1).split(/\"\s+\"/);
    } else if (/\'\s+\'/.test(newData)) {
      [ pathToFile, pathToDestination ] = newData.slice(1, -1).split(/\'\s+\'/);
    } else {
      [ pathToFile, pathToDestination ] = newData.split(' ');
      if ((pathToFile.startsWith(`"`) || pathToFile.startsWith(`'`)) && (pathToFile.endsWith(`"`) || pathToFile.endsWith(`'`))) {
        pathToFile = pathToFile.slice(1, -1);
      }
      if ((pathToDestination.startsWith(`"`) || pathToDestination.startsWith(`'`)) && (pathToDestination.endsWith(`"`) || pathToDestination.endsWith(`'`))) {
        pathToDestination = pathToDestination.slice(1, -1);
      }
    }

  const brotliDecompress = createBrotliDecompress();

  if (!pathToFile || !pathToDestination) {
    rl.output.write('Invalid input\n');
    printDirName(defaultPath);
  } else {
    let absoluteNewDirPath = pathAbsolutize(pathToDestination, defaultPath);
    let absoluteFilePath = pathAbsolutize(pathToFile, defaultPath);

    await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK)
    .then(async () => {
        await access(resolve(absoluteNewDirPath), constants.R_OK | constants.W_OK)
          .then(async () => {
            await access(join(absoluteNewDirPath, basename(absoluteFilePath.slice(0, -3))), constants.R_OK | constants.W_OK)
            .then(() => {
              rl.output.write('Operation failed\n');
              printDirName(defaultPath);
            })
            .catch(() => {
              stat(absoluteNewDirPath, (err, stats) => {

                if (stats.isFile()) {
                  rl.output.write('Operation failed333\n');
                  printDirName(defaultPath);
                }
                if (stats.isDirectory()) {

                  stat(absoluteFilePath, (err, stats) => {

                    if (stats.isFile()) {
                      const rs = createReadStream(resolve(absoluteFilePath));
                      const ws = createWriteStream(join(absoluteNewDirPath, basename(absoluteFilePath.slice(0, -3))));
                      rs.pipe(brotliDecompress).pipe(ws);
                      rs.on('end', () => printDirName(defaultPath));
                      rs.on('error', (err) => {
                        rl.output.write('Operation failed\n');
                        printDirName(defaultPath);
                      });
                    }
                    if (stats.isDirectory()) {
                      rl.output.write('Operation failed444\n');
                      printDirName(defaultPath);
                    }
                  })

                }
              })


              /*const rs = createReadStream(resolve(absoluteFilePath));
              const ws = createWriteStream(join(absoluteNewDirPath, basename(absoluteFilePath.slice(0, -3))));
              rs.pipe(brotliDecompress).pipe(ws);
              rs.on('end', () => printDirName(defaultPath));*/
            });
          })
          .catch((err) => {
            rl.output.write('Operation failed\n');
            printDirName(defaultPath);
          });
    })
    .catch((err) => {
      rl.output.write('Operation failed\n');
      printDirName(defaultPath);
    });
  }
} catch (e) {
  rl.output.write('Invalid input\n');
  printDirName(defaultPath);
  return;
}

};
