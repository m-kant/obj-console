
// INTERFACE ----------------------------

export interface FormatOptions {
  omitBrackets?: boolean;
  /** Ommit commas at the end of lines even in arrays */
  omitEolCommas?: boolean;
  /** Quotation marks to surround strings */
  quote?: "" | "'" | "\"";
  /** Quotation marks to surround keys of objects */
  keyQuote?: "" | "'" | "\"";
  /** All elemetns with index higher then `maxArrayLength`
   * will be ommited, text `...overall {n} elements` wil be added at the end */
  maxArrayLength?: number;
  /** Strings will be cutted to `maxStringLength`
   * text `... +{n}chrs` wil be added at the end */
  maxStringLength?: number;
  /** Maximum depth to scan object */
  maxDepth?: number;
  /** Spaces or other symbols for left padding  */
  padding?: string;
  /** Works on 1-st level of objects */
  align?: boolean;
  /** If depth is more then `unfoldDepth`,
   * then objects will be printed in one line */
  unfoldDepth?: number;
}

// DEFAULTS ----------------------------

export const defaults: Required<FormatOptions> = {
  omitBrackets: false,
  omitEolCommas: false,
  quote: "'",
  keyQuote: "",
  maxArrayLength: 0,
  maxStringLength: 0,
  maxDepth: 20,
  padding: "  ",
  align: false,
  unfoldDepth: 2,
};

// PREDEFINED --------------------------

/** whole object, no more 20 steps deep, linebreaks only at first level of deep */
export const COMPACT: FormatOptions = {
  unfoldDepth: 1,
  align: true,
}
/** Short representation of arrays and objects -
 * no more 5 array elements, limited strings , etc. */
export const BRIEF: FormatOptions = {
  unfoldDepth: 1,
  maxArrayLength: 5,
  maxStringLength: 20,
  maxDepth: 3,
  align: false,
}
/** as JSON with double qoutes */
export const AS_JSON: FormatOptions = {
  quote: `"`,
  keyQuote: `"`,
}
/** show object in one line */
export const ONE_LINE: FormatOptions = {
  unfoldDepth: 0,
}
/** show object as two columns - keys and values without brackets */
export const COLUMNS: FormatOptions = {
  unfoldDepth: 1,
  omitBrackets: true,
  omitEolCommas: true,
  quote: "",
  align: true,
}
