const { stdin, stdout } = process;

export const printDirName = (dirName) => {
  stdout.write(`\nYou are currently in ${dirName}\n`);
}
