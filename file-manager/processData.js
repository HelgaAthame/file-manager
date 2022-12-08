import * as fs from 'node:fs';
import { homedir } from 'os';
import { resolve, basename } from 'path';
import { printDirName } from './printDirName.js';
const { stdin, stdout } = process;
import { filesInFolder } from './filesInFolder.js';
import { up } from './up.js';
import { cd } from './cd.js'
import { cat } from './cat.js';
import { rl } from './prompt.js';
import { addFile } from './addFile.js';
import { renameFile } from './renameFile.js';
import { copyFile } from './copyFile.js';
import { deleteFile } from './deleteFile.js';
import { moveFile } from './moveFile.js';
import { osInfo } from './osInfo.js';
import { calcHash } from './calcHash.js';
import { compress } from './compress.js';
import { decompress } from './decompress.js'

let somePath = homedir().toString();

export const processData = async (data) => {

  if (data.match(/^up/i)) {
    somePath = await up(somePath);

  } else if (data.match(/^cd .+/i)) {
    somePath = await cd(data, somePath);

  } else if (data.match(/^ls/i)) {
    await filesInFolder(somePath);

  } else if (data.match(/^cat .+/i)) {
    await cat(data, somePath);

  } else if(data.match(/^add .+/i)) {
    const fileName = data.slice(4);
    await addFile(fileName, somePath);

  } else if(data.match(/^rn .+/i)) {
    await renameFile(data, somePath);

  } else if(data.match(/^cp .+/i)) {
    const newData = data.slice(3);
    await copyFile(newData, somePath);

  } else if(data.match(/^rm .+/i)) {
    const pathToFile = data.slice(3);
    await deleteFile(pathToFile, somePath);

  } else if(data.match(/^mv .+/i)) {
    const pathFile = data.slice(3);
    await moveFile(pathFile, somePath);

  } else if(data.match(/^os .+/i)) {
    osInfo(data);

  } else if(data.match(/^hash .+/i)) {
    await calcHash(data, somePath);

  } else if(data.match(/^compress .+/i)) {
    await compress(data, somePath);

  } else if(data.match(/^decompress .+/i)) {
    await decompress(data, somePath);

  } else {
    await rl.output.write(`Invalid input\n`);
  }

  printDirName(somePath);
  return;
  //npm run start -- --username=Olga
}
