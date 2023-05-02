"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objFormat = exports.objStdout = exports.objConsole = void 0;
const paint_1 = __importDefault(require("./paint"));
const options_1 = require("./options");
const format_scalar_1 = require("./format-scalar");
const color_scheme_1 = require("./color-scheme");
__exportStar(require("./options"), exports);
__exportStar(require("./color-scheme"), exports);
/** Prints object to terminal with colors and custom format */
function objConsole(data, opts) {
    console.log(objFormat(data, opts));
}
exports.objConsole = objConsole;
/** Same as objConsole() but uses `process.stdout.write()`
 * instead of `console`. Intended to use in test environment
 * with "mute" console */
function objStdout(data, opts) {
    process.stdout.write(objFormat(data, opts) + '\n');
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
    let eol = isLine ? '' : "\n";
    let bracketsPadd = '';
    for (let i = depth; i; i--)
        bracketsPadd += padding;
    if (isLine)
        bracketsPadd = "";
    const valPadd = isLine ? '' : bracketsPadd + padding;
    const eolComma = (eol && omitEolCommas) ? '' : ', ';
    // -- Arrays ----
    if (Array.isArray(data)) {
        let s = omitBrackets ? "" : paint_1.default.hex(bracketsColor, "[") + eol;
        for (let i = 0; i < data.length; i++) {
            // if ()
            s += valPadd + objFormat(data[i], opts, depth + 1);
            if (i < data.length - 1)
                s += paint_1.default.gray(eolComma);
            if (maxArrayLength && (i > maxArrayLength - 2)) {
                s += eol + valPadd + '... overall ' + data.length + ' elements' + eol;
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
    return data === null || typeof data !== 'object';
}
