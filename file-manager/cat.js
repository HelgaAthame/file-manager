import { createReadStream  } from 'fs';
import { resolve } from 'path';
import { rl } from './prompt.js';
import { pathAbsolutize } from './pathAbsoutize.js';
import { access, constants } from 'fs/promises';

export const cat = async (data, pat) => {
  const filePath = data.slice(4);
  let absolutePath = pathAbsolutize(filePath, pat);

  await access(resolve(absolutePath), constants.R_OK | constants.W_OK)
  .then(async () => {
    const rs = createReadStream(resolve(absolutePath));
    rs.on('error', () => rl.output.write('Operation failed\n'));
    rs.on('data', data => rl.output.write(data));
  })
  .catch(() => rl.output.write('Operation failed\n'));

};
