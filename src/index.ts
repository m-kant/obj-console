import paint from "./paint";
import { FormatOptions, defaults } from './options';
import { formatScalar } from './format-scalar';
import { cylceColor } from './color-scheme';

export * from './options';
export * from './color-scheme';

/** Prints object to terminal with colors and custom format */
export function objConsole(data: any, opts?: FormatOptions) {
  console.log(objFormat(data, opts));
}
/** Same as objConsole() but uses `process.stdout.write()`
 * instead of `console`. Intended to use in test environment
 * with "mute" console */
export function objStdout(data: any, opts?: FormatOptions) {
  process.stdout.write(objFormat(data, opts) + '\n');
}

/** Format object to ANSI-colored string */
export function objFormat(data: any, opts?: FormatOptions, depth = 0): string {
  const localOpts = Object.assign({}, defaults, opts);
  if (isScalar(data)) return formatScalar(data, localOpts);
  // -- prepare ----
  const {
    padding, maxDepth, align, maxArrayLength, keyQuote, unfoldDepth,
    omitEolCommas, omitBrackets
  } = localOpts;
  if (depth > maxDepth) return paint.hex("BF360C", "...too deep", !depth);

  const isLine = depth >= unfoldDepth;
  const bracketsColor = cylceColor(depth);
  let eol = isLine ? '' : "\n";

  let bracketsPadd = '';
  for (let i = depth; i; i--) bracketsPadd += padding;
  if (isLine) bracketsPadd = "";
  const valPadd = isLine ? '' : bracketsPadd + padding;
  const eolComma = (eol && omitEolCommas) ? '' : ', ';

  // -- Arrays ----
  if (Array.isArray(data)) {
    let s = omitBrackets ? "" : paint.hex(bracketsColor, "[") + eol;
    for (let i = 0; i < data.length; i++) {
      // if ()
      s += valPadd + objFormat(data[i], opts, depth + 1);
      if (i < data.length - 1) s += paint.gray(eolComma);
      if (maxArrayLength && (i > maxArrayLength - 2)) {
        s += eol + valPadd +'... overall ' + data.length + ' elements' + eol;
        break;
      }
      s += eol;
    }
    if (!omitBrackets) s += bracketsPadd + paint.hex(bracketsColor, "]");
    return s;
  }
  // -- Objects ----
  if (typeof data === "object") {
    let s = omitBrackets ? "" : paint.hex(bracketsColor, "{") + eol;
    const keyMaxLen = align ? maxKeyLen(data) : 0;
    const keys = Object.keys(data);
    // scan key-value pairs ---------------
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const v = data[k];
      s += valPadd + paint.key( keyQuote + k + keyQuote);
      s += paint.gray(": ".padEnd(keyMaxLen - k.length + 2));
      s += objFormat(v, opts, depth + 1);
      if (i < keys.length - 1) s += paint.gray(eolComma);
      s += eol;
    }
    if (!omitBrackets) s +=  bracketsPadd + paint.hex(bracketsColor, "}");
    return s;
  }

  return "unnknown type " + typeof data + " : " + String(data);
}

/** Length of longest key in object (for alignement) */
function maxKeyLen(data: any) {
  const keys = Object.keys(data);
  return Math.max(...keys.map((k) => k.length));
}

/** if data is not array or object then TRUE */
function isScalar(data: any) {
  return data === null || typeof data !== 'object'
}
