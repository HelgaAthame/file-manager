import { join, resolve, basename } from 'path';
import { rl } from './prompt.js';
import { createReadStream, createWriteStream } from 'fs';
import { pathAbsolutize } from './pathAbsoutize.js';
import { access, constants, unlink, readFile, writeFile } from 'fs/promises';

export const moveFile = async (newData, defPath) => {
  const [ filePath, newDirPath ] = newData.split(' ');

if (!filePath || !newDirPath) {
  rl.output.write('Invalid input\n');
} else {
  let absoluteNewDirPath = pathAbsolutize(newDirPath, defPath);
  let absoluteFilePath = pathAbsolutize(filePath, defPath);

  try {
    await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK);
  } catch {
    rl.output.write('Operation failed');
    return;
  }

  try {
    await access(resolve(absoluteNewDirPath), constants.R_OK | constants.W_OK);
  } catch {
    rl.output.write('Operation failed');
    return;
  }

  try {
    await access(join(absoluteNewDirPath, basename(absoluteFilePath)), constants.R_OK | constants.W_OK);
    rl.output.write('Operation failed');
    return;
  } catch {
  }

  const fileItself = await readFile(resolve(absoluteFilePath));
  await writeFile(join(absoluteNewDirPath, basename(absoluteFilePath)), fileItself);
  await unlink(resolve(absoluteFilePath));
  //const rs = createReadStream(resolve(absoluteFilePath));
  //const ws = createWriteStream(join(absoluteNewDirPath, basename(absoluteFilePath)));
  //rs.pipe(ws);
  //await unlink(resolve(absoluteFilePath));


/*await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK)
  .then(async () => {
      await access(resolve(absoluteNewDirPath), constants.R_OK | constants.W_OK)
        .then(async () => {
          await access(join(absoluteNewDirPath, basename(absoluteFilePath)), constants.R_OK | constants.W_OK)
          .then(() => {
            rl.output.write('Operation failed-q\n');
            return;
        })
          .catch(() => {
            const rs = createReadStream(resolve(absoluteFilePath));
            const ws = createWriteStream(join(absoluteNewDirPath, basename(absoluteFilePath)));
            rs.pipe(ws);
          })
          .then(async () => {
            await access(resolve(absoluteFilePath), constants.R_OK | constants.W_OK)
            .then(async () => {
              await unlink(resolve(absoluteFilePath));
            })
            .catch((err) => {
              rl.output.write('Operation failed-w\n');
              return;
          });
          });
        })
        .catch((err) => {
          rl.output.write('Operation failed-e\n');
          return;
      });
  })
  .catch((err) => {
    rl.output.write('Operation failed-r\n');
    return;
});*/
}

}
