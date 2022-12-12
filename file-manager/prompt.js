import { processData } from './processData.js';
import { createInterface } from 'readline';
const { stdin: input, stdout: output } = process;
export const rl = createInterface({ input, output });

export const prompt = (username) => {
  rl.on('line', async (data) => {
    if (data.toString().match(/\.exit/i)) {
      process.exit();
    }
    await processData(data);
  });
  process.on('SIGINT', () => {
    process.exit();
  });
  process.on('exit', () => {
    output.write(`\nThank you for using File Manager, ${username}, goodbye!\n\n`);
  });

}
