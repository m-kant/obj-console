import { FormatOptions } from './options';
type scalar = undefined | null | string | number | boolean;
type anyFunc = (...args: any[]) => any;
/** formats any scalar value (except arrays and objects).
 * Colorize according to scheme, put in commas if necessery, etc. */
export declare function formatScalar(val: scalar | anyFunc, options: Required<FormatOptions>): string;
export {};
