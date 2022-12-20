import { join, resolve, basename } from 'path';
import { rl } from './prompt.js';
import { createReadStream, createWriteStream } from 'fs';
import { pathAbsolutize } from './pathAbsolutize.js';
import { access, constants, unlink } from 'fs/promises';
import { printDirName } from './printDirName.js';

export const moveFile = async (newData, defPath) => {
  try {

    let filePath, newDirPath;
    if (/\"\s+\"/.test(newData)) {
      [ filePath, newDirPath ] = newData.slice(1, -1).split(/\"\s+\"/);
    } else {
      [ filePath, newDirPath ] = newData.split(' ');
      if ((filePath.startsWith(`"`) || filePath.startsWith(`'`)) && (filePath.endsWith(`"`) || filePath.endsWith(`'`))) {
        filePath = filePath.slice(1, -1);
      }
      if ((newDirPath.startsWith(`"`) || newDirPath.startsWith(`'`)) && (newDirPath.endsWith(`"`) || newDirPath.endsWith(`'`))) {
        newDirPath = newDirPath.slice(1, -1);
      }
    }


  if (!filePath || !newDirPath) {
    rl.output.write('Invalid input\n');
  } else {
    let absoluteNewDirPath = pathAbsolutize(newDirPath, defPath);
    let absoluteFilePath = pathAbsolutize(filePath, defPath);

  await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK)
    .then(async () => {
        await access(resolve(absoluteNewDirPath), constants.R_OK | constants.W_OK)
          .then(async () => {
            await access(join(absoluteNewDirPath, basename(absoluteFilePath)), constants.R_OK | constants.W_OK)
            .then(() =>  {
              rl.output.write('Operation failed\n');
              printDirName(defPath)
            })
            .catch(() => {
              const rs = createReadStream(resolve(absoluteFilePath));
              const ws = createWriteStream(join(absoluteNewDirPath, basename(absoluteFilePath)));
              rs.pipe(ws);
              rs.on('end', async () => {
                await unlink(resolve(absoluteFilePath));
                printDirName(defPath);
              });
            });
          })
          .catch((err) => {
            rl.output.write('Operation failed\n');
            printDirName(defPath)
          });
    })
    .catch((err) =>  {
      rl.output.write(err);
      rl.output.write('Operation failed\n');
      printDirName(defPath)
    });
  }
  } catch (e) {
    rl.output.write('Invalid input\n');
    printDirName(defPath);
    return;
  }
  }
