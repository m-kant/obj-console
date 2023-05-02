import { FormatOptions } from './options';
import paint from './paint';
import { colorScheme } from './color-scheme';

type scalar = undefined | null | string | number | boolean;
type anyFunc = (...args: any[])=>any

/** formats any scalar value (except arrays and objects).
 * Colorize according to scheme, put in commas if necessery, etc. */
export function formatScalar(val: scalar | anyFunc, options: Required<FormatOptions>): string {
  if (val === undefined) return paint.hex(colorScheme.undefined, "undefined");
  if (val === null)      return paint.hex(colorScheme.null, "null");

  switch (typeof val) {
    case 'number':   return paint.hex(colorScheme.number, val);
    case 'boolean':  return paint.hex(colorScheme.boolean, val);
    case 'function': return paint.hex(colorScheme.function, 'func()');
    case 'string':
      const { str, remains } = limitStr(val, options.maxStringLength);
      let s = paint.hex(colorScheme.string, options.quote + str);
      if (remains) s += paint.hex(colorScheme.stringCut, "... +" + remains + "chrs.");
      return s + paint.hex(colorScheme.string, options.quote);
    default: return String(val);
  }
}

/**
 * Limit string length by `len` symbols
 * @returns limited string and remaining symbols count as {str, remains}
 */
function limitStr(str: string, len: number) {
  let remains = 0;
  const origLen = str.length;
  if (len && origLen > len) {
    str = str.substring(0, len);
    remains = origLen - len;
  }
  return {str, remains};
}
