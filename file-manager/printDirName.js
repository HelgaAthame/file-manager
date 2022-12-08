import { rl } from "./prompt.js";

export const printDirName = (directName) => {
  rl.output.write(`\nYou are currently in ${directName}\n`);
}
