import { FormatOptions } from './options';
export * from './options';
export * from './color-scheme';
/** Prints object to terminal with colors and custom format */
export declare function objConsole(data: any, opts?: FormatOptions): void;
/** Same as objConsole() but uses `process.stdout.write()`
 * instead of `console`. Intended to use in test environment
 * with "mute" console */
export declare function objStdout(data: any, opts?: FormatOptions): void;
/** Format object to ANSI-colored string */
export declare function objFormat(data: any, opts?: FormatOptions, depth?: number): string;
