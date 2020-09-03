// internal
import { SingleTag } from './index.interface';

export function isObject(payload: unknown): payload is object {
  return Object.prototype.toString.call(payload) === '[object Object]';
}

// skip children which should not have entity
export function isFalsyChild(child: unknown): boolean {
  return (
    child === undefined ||
    child === null ||
    typeof child === 'boolean' ||
    Number.isNaN(child)
  );
}

export function isSingleTag(tag: string, singleTags: SingleTag[]) {
  return singleTags.some((singleTag) =>
    typeof singleTag === 'string' ? singleTag === tag : singleTag.test(tag)
  );
}

export const encodeEntities = (raw: string) =>
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// DOM properties that should NOT have "px" added when numeric
const IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;

// Convert an Object style to a CSSText string
export function styleObjToCss(style: {
  [key: string]: string | number | null;
}): string {
  const keys = Reflect.ownKeys(style) as string[];
  const cssText = keys
    .filter((key) => style[key] != null)
    .reduce<string>((acc, key) => {
      const payload = style[key];
      const property =
        acc[0] === '-' ? key : key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const suffix =
        typeof payload === 'number' && !IS_NON_DIMENSIONAL.test(property)
          ? 'px'
          : '';
      const pair = `${property}: ${payload}${suffix};`;

      return `${acc} ${pair}`;
    }, '');

  return cssText.trim();
}
