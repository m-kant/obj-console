"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objFormat = exports.objStdout = exports.objConsole = exports.cylceColor = exports.colorScheme = exports.defaults = exports.ONE_LINE = exports.COMPACT = exports.COLUMNS = exports.BRIEF = exports.AS_JSON = void 0;
const paint_1 = __importDefault(require("./paint"));
const options_1 = require("./options");
const format_scalar_1 = require("./format-scalar");
const color_scheme_1 = require("./color-scheme");
var options_2 = require("./options");
Object.defineProperty(exports, "AS_JSON", { enumerable: true, get: function () { return options_2.AS_JSON; } });
Object.defineProperty(exports, "BRIEF", { enumerable: true, get: function () { return options_2.BRIEF; } });
Object.defineProperty(exports, "COLUMNS", { enumerable: true, get: function () { return options_2.COLUMNS; } });
Object.defineProperty(exports, "COMPACT", { enumerable: true, get: function () { return options_2.COMPACT; } });
Object.defineProperty(exports, "ONE_LINE", { enumerable: true, get: function () { return options_2.ONE_LINE; } });
Object.defineProperty(exports, "defaults", { enumerable: true, get: function () { return options_2.defaults; } });
var color_scheme_2 = require("./color-scheme");
Object.defineProperty(exports, "colorScheme", { enumerable: true, get: function () { return color_scheme_2.colorScheme; } });
Object.defineProperty(exports, "cylceColor", { enumerable: true, get: function () { return color_scheme_2.cylceColor; } });
/** Prints object to terminal with colors and custom format */
function objConsole(data, opts) {
    console.log(objFormat(data, opts));
}
exports.objConsole = objConsole;
/** Same as objConsole() but uses `process.stdout.write()`
 * instead of `console`. Intended to use in test environment
 * with "mute" console */
function objStdout(data, opts) {
    process.stdout.write(objFormat(data, opts) + "\n");
}
exports.objStdout = objStdout;
/** Format object to ANSI-colored string */
function objFormat(data, opts, depth = 0) {
    const localOpts = Object.assign({}, options_1.defaults, opts);
    if (isScalar(data))
        return (0, format_scalar_1.formatScalar)(data, localOpts);
    // -- prepare ----
    const { padding, maxDepth, align, maxArrayLength, keyQuote, unfoldDepth, omitEolCommas, omitBrackets } = localOpts;
    if (depth > maxDepth)
        return paint_1.default.hex("BF360C", "...too deep", !depth);
    const isLine = depth >= unfoldDepth;
    const bracketsColor = (0, color_scheme_1.cylceColor)(depth);
    let eol = isLine ? "" : "\n";
    let bracketsPadd = "";
    for (let i = depth; i; i--)
        bracketsPadd += padding;
    if (isLine)
        bracketsPadd = "";
    const valPadd = isLine ? "" : bracketsPadd + padding;
    const eolComma = eol && omitEolCommas ? "" : ", ";
    // -- Arrays ----
    if (Array.isArray(data)) {
        let s = omitBrackets ? "" : paint_1.default.hex(bracketsColor, "[") + eol;
        for (let i = 0; i < data.length; i++) {
            // if ()
            s += valPadd + objFormat(data[i], opts, depth + 1);
            if (i < data.length - 1)
                s += paint_1.default.gray(eolComma);
            if (maxArrayLength && i > maxArrayLength - 2) {
                s += eol + valPadd + "... overall " + data.length + " elements" + eol;
                break;
            }
            s += eol;
        }
        if (!omitBrackets)
            s += bracketsPadd + paint_1.default.hex(bracketsColor, "]");
        return s;
    }
    // -- Objects ----
    if (typeof data === "object") {
        let s = omitBrackets ? "" : paint_1.default.hex(bracketsColor, "{") + eol;
        const keyMaxLen = align ? maxKeyLen(data) : 0;
        const keys = Object.keys(data);
        // scan key-value pairs ---------------
        for (let i = 0; i < keys.length; i++) {
            const k = keys[i];
            const v = data[k];
            s += valPadd + paint_1.default.key(keyQuote + k + keyQuote);
            s += paint_1.default.gray(": ".padEnd(keyMaxLen - k.length + 2));
            s += objFormat(v, opts, depth + 1);
            if (i < keys.length - 1)
                s += paint_1.default.gray(eolComma);
            s += eol;
        }
        if (!omitBrackets)
            s += bracketsPadd + paint_1.default.hex(bracketsColor, "}");
        return s;
    }
    return "unnknown type " + typeof data + " : " + String(data);
}
exports.objFormat = objFormat;
/** Length of longest key in object (for alignement) */
function maxKeyLen(data) {
    const keys = Object.keys(data);
    return Math.max(...keys.map((k) => k.length));
}
/** if data is not array or object then TRUE */
function isScalar(data) {
    return data === null || typeof data !== "object";
}
