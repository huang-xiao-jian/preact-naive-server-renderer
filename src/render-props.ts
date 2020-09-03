// internal
import { isObject, styleObjToCss } from './utils';
// interface
import { ElementVNodeProps } from './index.interface';

/**
 * @description - normalize vnode props
 *
 * @param {import(./index.interface).ElementVNodeProps} props - original vnode props
 *
 * @returns {import(./index.interface).ElementVNodeProps}
 */
export function renderProps(props: ElementVNodeProps): ElementVNodeProps {
  const normalizedProps: ElementVNodeProps = {};
  const keys = Reflect.ownKeys(props) as string[];
  // ignore logical property, see https://github.com/preactjs/preact-render-to-string/blob/694155845d7d98637d80f2fd10b92e64412cfe50/src/index.js#L166
  const specialKeys = [
    'defaultValue',
    'key',
    'ref',
    'children',
    '__self',
    '__source',
    'dangerouslySetInnerHTML',
  ];

  /**
   * extra notice:
   *
   * 1. handle boolean attribute within `stringify`；
   * 2. handle html entity within `stringify`；
   * 3. textarea'['value'] --> <textarea value="a&b"> --> <textarea>a&amp;b</textarea> within `stringify`；
   * 4. option['value'] --> <option>value</option> `stringify`；;
   *
   * */
  keys
    // keep order for better test
    .sort()
    /* ignore specific properties */
    // ignore preact related logical properties
    .filter((key) => !specialKeys.includes(key))
    // https://github.com/preactjs/preact-render-to-string/blob/694155845d7d98637d80f2fd10b92e64412cfe50/src/index.js#L164
    .filter((key) => !/[\s\n\\/='"\0<>]/.test(key))
    // ignore function payload and null, undefined
    .filter((key) => props[key] != null && typeof props[key] !== 'function')
    .forEach((key) => {
      const payload = props[key];

      /* key reverse */
      if (key === 'className') {
        normalizedProps.class = payload;
      } else if (key === 'htmlFor') {
        normalizedProps.for = payload;
      }
      /* payload convert */
      // only convert style object
      else if (key === 'style' && isObject(payload)) {
        normalizedProps.style = styleObjToCss(payload);
      }
      // fallback pass through
      else {
        normalizedProps[key] = payload;
      }
    });

  return normalizedProps;
}
