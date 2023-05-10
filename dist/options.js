"use strict";
// INTERFACE ----------------------------
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLUMNS = exports.ONE_LINE = exports.AS_JSON = exports.BRIEF = exports.COMPACT = exports.defaults = void 0;
// DEFAULTS ----------------------------
exports.defaults = {
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
exports.COMPACT = {
    unfoldDepth: 1,
    align: true,
};
/** Short representation of arrays and objects -
 * no more 5 array elements, limited strings , etc. */
exports.BRIEF = {
    unfoldDepth: 1,
    maxArrayLength: 5,
    maxStringLength: 20,
    maxDepth: 3,
    align: true,
};
/** as JSON with double qoutes */
exports.AS_JSON = {
    quote: `"`,
    keyQuote: `"`,
};
/** show object in one line */
exports.ONE_LINE = {
    unfoldDepth: 0,
};
/** show object as two columns - keys and values without brackets */
exports.COLUMNS = {
    unfoldDepth: 1,
    omitBrackets: true,
    omitEolCommas: true,
    quote: "",
    align: true,
};
