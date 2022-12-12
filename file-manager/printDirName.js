import { rl } from "./prompt.js";

export const printDirName = async (directName) => {
  if (!directName.toString().endsWith(`\\`)) directName += `\\`;
  rl.output.write(`\nYou are currently in ${directName}\n`);
}
