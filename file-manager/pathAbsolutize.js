import { join, resolve } from 'path';

export const pathAbsolutize = (myPath, defaultPath) => {
    if (myPath.match(/[a-zA-Z]:.*/i)) {
      return resolve('', myPath);
    }
    return join(defaultPath, myPath);
};
