import { hello } from './hello.js';
import { prompt } from './prompt.js';

const ar = process.argv;
export const username = ar[ar.length - 1].slice(11);

hello(username);
prompt(username);
