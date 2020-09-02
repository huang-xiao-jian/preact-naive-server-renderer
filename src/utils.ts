// internal
import { SingleTag } from './index.interface';

export function isObject(payload: unknown): payload is object {
  return Object.prototype.toString.call(payload) === "[object Object]"
}

// skip children which should not have entity
export function isFalsyChild(child: unknown): boolean {
  return child === undefined || child === null || typeof child === 'boolean' || Number.isNaN(child);
}

export function isSingleTag(tag: string, singleTags: SingleTag[]) {
  return singleTags.some((singleTag) => typeof singleTag === 'string' ? singleTag === tag : singleTag.test(tag))
}
