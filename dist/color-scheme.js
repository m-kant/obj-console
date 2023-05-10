"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cylceColor = exports.colorScheme = void 0;
exports.colorScheme = {
    key: '#9cdcfe',
    number: '#b5cea8',
    boolean: '#569cd6',
    string: '#ce9178',
    stringCut: '#864023',
    function: '#ffea76',
    undefined: '#aaaaaa',
    null: '#aaaaaa',
    brackets: ["#1c7cff", "#b670b3", "#ffb417"]
};
/**
 * Returns color from colorScheme.brackets, according to given number.
 * If number is more then colors count, then returns to the start of colors array.
 */
function cylceColor(n) {
    const colors = exports.colorScheme.brackets;
    if (n > colors.length - 1)
        n = n % colors.length;
    return colors[n];
}
exports.cylceColor = cylceColor;
