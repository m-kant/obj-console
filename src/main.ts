import { objConsole } from './index';
import { BRIEF, COMPACT, AS_JSON, COLUMNS } from './options';
import { ARR, freaky } from './tests/data';

const ar = ARR.slice(0,2)

// console.log('------------- objConsole(arr, BRIEF) ---------------')
// objConsole(ARR, BRIEF);

// console.log('------------- objConsole(arr[0], COLUMNS) ---------------')
// objConsole(ARR[0], COLUMNS);

// objConsole(freaky);
// '-----------------------------------------------------------------------------------';
// objConsole(ar, AS_JSON);

console.log('------ { unfoldDepth: 3, align: true } --------');
objConsole(ar, { unfoldDepth: 2, align: true, omitBrackets: false, omitEolCommas: false });
// '------ { unfoldDepth: 2 } --------';
// objConsole(ar, { unfoldDepth: 2 });
// '------ { unfoldDepth: 1 } --------';
// objConsole(ar, { unfoldDepth: 1 });

// '----------------{unfoldDepth: 1, omitBrackets: true, omitEolCommas: true}--------------------------------';
// objConsole(ar[0], {unfoldDepth: 1, omitBrackets: true, omitEolCommas: true});
// '-----------------------------------------------------------------------------------';
// objConsole(ar, {unfoldDepth: 1});
