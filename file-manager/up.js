export const up = (myPath) => {
  if (myPath.includes('\\')) {
    let arr = myPath.split('\\');
    arr.pop();
    return arr.join('\\');
  }
  return myPath;
}
