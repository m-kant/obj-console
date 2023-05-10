# obj-console

Beautify terminal output of JS-objects with VSCode colors and custom format. 10K dist with no dependencies.

You can tune output to enhance readability of single objects or arrays. For example, options: `{unfoldDepth: 1, omitBrackets: true, omitEolCommas: true, quote: "", align: true}` leads to output:

![columns-object](https://github.com/m-kant/obj-console/raw/main/docs/columns-object.png)

You can vary `unfoldDepth` to get appropriate readability

![unfold depth](https://github.com/m-kant/obj-console/raw/main/docs/unfold-depth.png)

 Or print compact brief of data just to understand, that data has appropriate form.

![brief](https://github.com/m-kant/obj-console/raw/main/docs/brief.png)

## Usage

```javascript
import { objConsole, objFormat } from 'obj-console';

objConsole(someData);
objConsole(someData, options);

const str = objFormat(someData); // just format, no print
console.log(str); // same as objConsole(someData)
```

## Options

```typescript
interface FormatOptions {
  omitBrackets?: boolean;
  /** Ommit commas at the end of lines even in arrays */
  omitEolCommas?: boolean;
  /** Quotation marks to surround strings */
  quote?: "" | "'" | "\"";
  /** Quotation marks to surround keys in objects */
  keyQuote?: "" | "'" | "\"";
  /** All elemetns with index higher then `maxArrayLength`
   * will be ommited, text `...overall {n} elements` wil be added at the end */
  maxArrayLength?: number;
  /** Strings will be cutted to `maxStringLength`
   * text `... +{n}chrs` wil be added at the end */
  maxStringLength?: number;
  /** Maximum depth to scan object */
  maxDepth?: number;
  /** Spaces or other symbols for left padding  */
  padding?: string;
  /** Works on 1-st level */
  align?: boolean;
  /** If depth is more then `unfoldDepth`,
   * then objects will be printed in one line */
  unfoldDepth?: number;
}
```

## Predefined options

```javascript
import { objConsole, BRIEF } from 'obj-console';

objConsole(someData, BRIEF);
```

- COMPACT
- BRIEF
- ONE_LINE
- AS_JSON
- COLUMNS

