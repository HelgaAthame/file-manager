import { rl } from "./prompt.js";

export const printDirName = async (directName) => {
  rl.output.write(`\nYou are currently in ${directName}\n`);
}
