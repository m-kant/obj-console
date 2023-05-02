/** Simplfied analog of chalk */
declare const paint: {
    /** set text color in hex format */
    hex(hex: string, m: any, resetAtEnd?: boolean): string;
    /** set background color in hex format */
    bg(hex: string, m: any, resetAtEnd?: boolean): string;
    reset(realy?: boolean): "" | "\u001B[0m";
    key(m: any, resetAtEnd?: boolean): any;
    num(m: any, resetAtEnd?: boolean): any;
    bool(m: any, resetAtEnd?: boolean): any;
    str(m: any, resetAtEnd?: boolean): any;
    func(m: any, resetAtEnd?: boolean): any;
    white(m: any, resetAtEnd?: boolean): any;
    gray(m: any, resetAtEnd?: boolean): any;
};
export default paint;
