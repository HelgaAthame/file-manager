import { resolve } from 'path';
import { readdir } from 'fs/promises';

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
  console.table(arrToLog);
}
