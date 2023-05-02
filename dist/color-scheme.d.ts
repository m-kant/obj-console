export declare const colorScheme: {
    key: string;
    number: string;
    boolean: string;
    string: string;
    stringCut: string;
    function: string;
    undefined: string;
    null: string;
    brackets: string[];
};
/**
 * Returns color from colorScheme.brackets, according to given number.
 * If number is more then colors count, then returns to the start of colors array.
 */
export declare function cylceColor(n: number): string;
