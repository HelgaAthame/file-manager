import { rl } from './prompt.js';
import { EOL, cpus, homedir, userInfo, arch } from 'os';

export const osInfo = (data) => {
  const info = data.slice(3);
  switch (info) {
    case '--EOL':
      rl.output.write( JSON.stringify(EOL) );
      break;
    case '--cpus':
      let cpusArr = cpus();
      rl.output.write( `${cpusArr.length} cpus: \n` );
      cpusArr.forEach((el) => {
        rl.output.write( `model: ${el.model} \n` );
        rl.output.write( `clock rate: ${+el.speed/1000} GHz\n\n` );
      });
      break;
    case '--homedir':
      rl.output.write( homedir() );
      break;
    case '--username':
      rl.output.write( userInfo().username );
      break;
    case '--architecture':
      rl.output.write( arch() );
      break;
    default:
      rl.output.write( 'Invalid input\n' );
  }
}
