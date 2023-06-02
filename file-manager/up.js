import { printDirName } from './printDirName.js';

export const up = (myPath) => {
  if (myPath.includes('\\')) {
    let arr = myPath.split('\\');
    arr.pop();
    printDirName(arr.join('\\'));
    return arr.join('\\');
  }
  printDirName(myPath);
  return myPath;
}
