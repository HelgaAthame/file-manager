import { join } from 'path';

export const pathAbsolutize = (myPath, defaultPath) => {
    if (myPath.match(/[a-zA-Z]:.*/i)) {
      return myPath;
    }
    return join(defaultPath, myPath);
};
