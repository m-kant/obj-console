"use strict";
// https://logfetch.com/js-console-colors/
Object.defineProperty(exports, "__esModule", { value: true });
const hexs = {
    key: '#9cdcfe',
    num: '#b5cea8',
    bool: '#569cd6',
    str: '#ce9178',
    func: '#ffea76',
};
/** Simplfied analog of chalk */
const paint = {
    /** set text color in hex format */
    hex(hex, m, resetAtEnd = true) {
        const [r, g, b] = hexToRgb(hex);
        let formatted = `\x1b[38;2;${r};${g};${b}m` + String(m);
        if (resetAtEnd)
            formatted += '\x1b[39m';
        return formatted;
    },
    /** set background color in hex format */
    bg(hex, m, resetAtEnd = true) {
        const [r, g, b] = hexToRgb(hex);
        let formatted = `\x1b[48;2;${r};${g};${b}m` + String(m);
        if (resetAtEnd)
            formatted += '\x1b[49m';
        return formatted;
    },
    reset(realy = true) { return realy ? '\x1b[0m' : ''; },
    key(m, resetAtEnd) { return this.hex(hexs.key, m, resetAtEnd); },
    num(m, resetAtEnd) { return this.hex(hexs.num, m, resetAtEnd); },
    bool(m, resetAtEnd) { return this.hex(hexs.bool, m, resetAtEnd); },
    str(m, resetAtEnd) { return this.hex(hexs.str, m, resetAtEnd); },
    func(m, resetAtEnd) { return this.hex(hexs.func, m, resetAtEnd); },
    white(m, resetAtEnd) { return this.hex('ffffff', m, resetAtEnd); },
    gray(m, resetAtEnd) { return this.hex('aaaaaa', m, resetAtEnd); },
};
function hexToRgb(hex) {
    var bigint = parseInt(hex.replace(/^#/, ''), 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;
    return [r, g, b];
}
exports.default = paint;
