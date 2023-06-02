import { hello } from './hello.js';
import { prompt } from './prompt.js';

const ar = process.argv;
export const username = ( ar.length > 2 && ar[ar.length - 1].slice(11)) ? ar[ar.length - 1].slice(11) : 'stranger';

hello(username);
prompt(username);
