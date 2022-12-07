import { join, resolve, basename } from 'path';
import { rl } from './prompt.js';
import { createReadStream, createWriteStream } from 'fs';
import { pathAbsolutize } from './pathAbsoutize.js';
import { access, constants } from 'fs/promises';

export const copyFile = async (newData, defPath) => {
  const [ filePath, newDirPath ] = newData.split(' ');

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
          .then(() => rl.output.write('Operation failed\n'))
          .catch(() => {
            const rs = createReadStream(resolve(absoluteFilePath));
            const ws = createWriteStream(join(absoluteNewDirPath, basename(absoluteFilePath)));
            rs.pipe(ws);
          });
        })
        .catch((err) => rl.output.write('Operation failed\n'));
  })
  .catch((err) => rl.output.write('Operation failed\n'));
}

}
