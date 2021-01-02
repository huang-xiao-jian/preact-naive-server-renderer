// internal
import { isObject, isFalsyChild, isSingleTag } from '../src/utils';

describe('utils', () => {
  it('should detect falsy value', () => {
    expect(isFalsyChild(undefined)).toBe(true);
    expect(isFalsyChild(null)).toBe(true);
    expect(isFalsyChild(true)).toBe(true);
    expect(isFalsyChild(false)).toBe(true);
    expect(isFalsyChild(Number.NaN)).toBe(true);
    expect(isFalsyChild('Hello')).toBe(false);
    expect(isFalsyChild(10000)).toBe(false);
  });

  it('should detect object literal', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(false);
  });

  it('should detect single tag', () => {
    expect(isSingleTag('h', ['h1', 'h2'])).toBe(false);
    expect(isSingleTag('h1', ['h1', 'h2'])).toBe(true);
    expect(isSingleTag('h1', [/^h\d$/])).toBe(true);
  });
});
