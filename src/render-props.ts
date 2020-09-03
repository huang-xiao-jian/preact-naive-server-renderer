// internal
import { isObject, styleObjToCss } from './utils';
import { ElementVNodeProps } from './index.interface';

/**
 * @description - key 筛选、key 映射、value 转换、payload 同步
 * @param {import(./index.interface).ElementVNodeProps} props - vnode props
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
   * 特别说明：
   *
   * 1. boolean 属性处理由 stringify 函数处理；
   * 2. 特殊字符编码由 stringify 函数处理；
   * 3. textarea'['value'] --> <textarea value="a&b"> --> <textarea>a&amp;b</textarea> 由 stringify 函数处理;
   * 4. option['value'] --> <option>value</option> 由 stringify 函数处理;
   *
   * */
  keys
    // 保持属性顺序一致性，便于测试
    .sort()
    /* 属性筛选 */
    // 排除特殊属性
    .filter((key) => !specialKeys.includes(key))
    // https://github.com/preactjs/preact-render-to-string/blob/694155845d7d98637d80f2fd10b92e64412cfe50/src/index.js#L164
    .filter((key) => !/[\s\n\\/='"\0<>]/.test(key))
    // 排除函数属性
    .filter((key) => typeof props[key] !== 'function')
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
      } else {
        normalizedProps[key] = payload;
      }
    });

  return normalizedProps;
}
