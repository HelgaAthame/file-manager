import { join } from 'path';

export const pathAbsolutize = (myPath, defaultPath) => {
    if (myPath.match(/.:(\/|\\).*/i)) {
      return myPath;
    }
    return join(defaultPath, myPath);
};
