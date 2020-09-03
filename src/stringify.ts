/**
 * @description - stringify element vnode tree into string without property crop logical
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// internal
import {
  ElementVNode,
  ElementChild,
  SingleTag,
  ElementVNodeProps,
} from './index.interface';
import { isSingleTag, encodeEntities } from './utils';

// scope
export const DEFAULT_SINGLE_TAGS = [
  'area',
  'base',
  'br',
  'col',
  'command',
  'embed',
  'hr',
  'img',
  'input',
  'keygen',
  'link',
  'menuitem',
  'meta',
  'param',
  'source',
  'track',
  'wbr',
];

export function stringifyElementAttributes(props: ElementVNodeProps) {
  // avoid annoying type mismatch issue
  const keys = Reflect.ownKeys(props) as string[];
  const result = keys.sort().reduce<string>((acc, key) => {
    const value = props[key as string];

    if (typeof value === 'string') {
      // quote attributes
      return value === ''
        ? `${acc} ${key}`
        : `${acc} ${key}="${encodeEntities(value)}"`;
    }

    if (typeof value === 'number') {
      return `${acc} ${key}=${value}`;
    }

    if (typeof value === 'boolean') {
      if (value === true) {
        return `${acc} ${key}`;
      }
      // always use string values instead of booleans for aria attributes
      else if (key[0] === 'a' && key[1] === 'r') {
        return `${acc} ${key}=${value}`;
      }
    }

    return acc;
  }, '');

  return result.trim();
}

export function stringifyElementChild(
  child: ElementChild,
  singleTags: SingleTag[] = []
) {
  // number convert into string
  if (typeof child === 'string' || typeof child === 'number') {
    return encodeEntities(`${child}`);
  }

  // stringify element vnode
  const {
    type,
    children,
    props: { dangerouslySetInnerHTML, ...rest },
  } = child as ElementVNode;
  const before = `<${type}`;
  const attributes = stringifyElementAttributes(rest);

  // self close tag, skip children
  if (isSingleTag(type, singleTags)) {
    return `${before} ${attributes} />`;
  }

  return `${before} ${attributes}>${stringify(children)}</${type}>`;
}

export function stringify(
  children: ElementChild[],
  singleTags: SingleTag[] = DEFAULT_SINGLE_TAGS
): string {
  return children
    .map((child) => stringifyElementChild(child, singleTags))
    .join('');
}
