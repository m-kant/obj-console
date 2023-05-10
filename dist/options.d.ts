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
export declare const defaults: Required<FormatOptions>;
/** whole object, no more 20 steps deep, linebreaks only at first level of deep */
export declare const COMPACT: FormatOptions;
/** Short representation of arrays and objects -
 * no more 5 array elements, limited strings , etc. */
export declare const BRIEF: FormatOptions;
/** as JSON with double qoutes */
export declare const AS_JSON: FormatOptions;
/** show object in one line */
export declare const ONE_LINE: FormatOptions;
/** show object as two columns - keys and values without brackets */
export declare const COLUMNS: FormatOptions;
