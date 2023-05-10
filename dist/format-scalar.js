"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatScalar = void 0;
const paint_1 = __importDefault(require("./paint"));
const color_scheme_1 = require("./color-scheme");
/** formats any scalar value (except arrays and objects).
 * Colorize according to scheme, put in commas if necessery, etc. */
function formatScalar(val, options) {
    if (val === undefined)
        return paint_1.default.hex(color_scheme_1.colorScheme.undefined, "undefined");
    if (val === null)
        return paint_1.default.hex(color_scheme_1.colorScheme.null, "null");
    switch (typeof val) {
        case 'number': return paint_1.default.hex(color_scheme_1.colorScheme.number, val);
        case 'boolean': return paint_1.default.hex(color_scheme_1.colorScheme.boolean, val);
        case 'function': return paint_1.default.hex(color_scheme_1.colorScheme.function, 'func()');
        case 'string':
            const { str, remains } = limitStr(val, options.maxStringLength);
            let s = paint_1.default.hex(color_scheme_1.colorScheme.string, options.quote + str);
            if (remains)
                s += paint_1.default.hex(color_scheme_1.colorScheme.stringCut, "... +" + remains + "chrs.");
            return s + paint_1.default.hex(color_scheme_1.colorScheme.string, options.quote);
        default: return String(val);
    }
}
exports.formatScalar = formatScalar;
/**
 * Limit string length by `len` symbols
 * @returns limited string and remaining symbols count as {str, remains}
 */
function limitStr(str, len) {
    let remains = 0;
    const origLen = str.length;
    if (len && origLen > len) {
        str = str.substring(0, len);
        remains = origLen - len;
    }
    return { str, remains };
}
