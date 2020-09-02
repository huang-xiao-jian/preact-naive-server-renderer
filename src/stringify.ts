/**
* @description - stringify element vnode tree into string without property crop logical
* @author - huang.jian <hjj491229492@hotmail.com>
*/

// internal
import { ElementVNode, ElementChild, SingleTag, ElementVNodeProps } from './index.interface';
import { isSingleTag, isFalsyChild } from './utils';

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
  'wbr'
];

export function stringifyElementAttributes(props: ElementVNodeProps) {
  // avoid annoying type mismatch issue
  const keys = Reflect.ownKeys(props) as string[];
  const result = keys.sort().reduce<string>((acc, key) => {
    const value = props[key as string];

    if (typeof value === 'string') {
      // quote attributes
      return value === '' ? `${acc} ${key}` : `${acc} ${key}="${value.replace(/"/g, '&quot;')}"`
    }

    if (typeof value === 'number') {
      return `${acc} ${key}=${value}`
    }

    if (typeof value === 'boolean') {
      if (value === true) {
        return `${acc} ${key}`
      }
      // always use string values instead of booleans for aria attributes
      else if (key[0] === 'a' && key[1] === 'r') {
        return `${acc} ${key}=${value}`
      }
    }

    return acc;
  }, '');

  return result.trim();
}

// 递归方式执行
export function stringifyElementChild(child: ElementChild, singleTags: SingleTag[] = []) {
  // 空字符串
  if (isFalsyChild(child)) {
    return '';
  }

  // 数字、字符串皆返回字符串
  if (typeof child === 'string' || typeof child === 'number') {
    return `${child}`;
  }

  // stringify element vnode
  const { type, children, props: { dangerouslySetInnerHTML, ...rest } } = child as ElementVNode;
  const before = `<${type}`;
  const attributes = stringifyElementAttributes(rest);

  // 自闭合元素，跳过 children 处理
  if (isSingleTag(type, singleTags)) {
    return `${before} ${attributes} />`;
  }

  // 渲染子元素
  return `${before} ${attributes}>${stringify(children)}</${type}>`
}

// 渲染成 VNode tree，确定所有 children 都为数组
// props 不为空
// property 不包含 key, ref, on*
export function stringify(children: ElementChild[], singleTags: SingleTag[] = DEFAULT_SINGLE_TAGS): string {
  return children.map((child) => stringifyElementChild(child, singleTags)).join('');
}
