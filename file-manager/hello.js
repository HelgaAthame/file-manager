import { homedir } from 'os';
import { printDirName } from './printDirName.js';
const { stdout } = process;

export const hello = (username) => {
  stdout.write(`Welcome to the File Manager, ${username}!\n`);
  printDirName(homedir);
}
