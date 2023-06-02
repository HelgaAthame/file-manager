import { resolve } from 'path';
import { readdir } from 'fs/promises';
import { printDirName } from './printDirName.js';

class Content {
  constructor(name, type) {
    this.name = name;
    this.type = type;
  }
}

export async function filesInFolder(myPath) {
  const files = await readdir(resolve(myPath), { withFileTypes: true });
  const arrToLog = [];
  for (let file of files) {
    arrToLog.push(new Content(file.name, file.isFile() ? 'file' : 'directory'));
  };
  arrToLog.sort((a, b) => {
    if (a.type === b.type) {
      return a.name < b.name ? -1 : 1;
    } else {
      return a.type < b.type ? -1 : 1;
    }
});
  console.table(arrToLog);
  printDirName(myPath);
}
