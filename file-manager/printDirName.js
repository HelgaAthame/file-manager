import { rl } from "./prompt.js";

export const printDirName = (dirName) => {
  rl.output.write(`\nYou are currently in ${dirName}\n`);
}
