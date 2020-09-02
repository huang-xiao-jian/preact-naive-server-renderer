
// internal
import { isObject } from './utils';
import { ElementVNodeProps } from './index.interface';

/**
 * @description - key 筛选、key 映射、value 转换、payload 同步
 * @param {import(./index.interface).ElementVNodeProps} props - vnode props
 */
export function renderProps(props: ElementVNodeProps): ElementVNodeProps {
  const normalizedProps: ElementVNodeProps = {};
  const keys = Reflect.ownKeys(props) as string[];
  // key, children, dangerouslySetInnerHTML 为逻辑属性，与 DOM 无关
  const specialKeys = [
    'defaultValue',
    'key',
    'children',
    'dangerouslySetInnerHTML',
  ];

  /**
   * 特别说明：
   *
   * 1. boolean 属性处理由 stringify 函数处理；
   * 2. 特殊字符编码由 stringify 函数处理；
   * 3. 'textarea'['value'] --> <textarea value="a&b"> --> <textarea>a&amp;b</textarea> 由 stringify 函数处理;
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

      /* key 映射 */
      if (key === 'className') {
        normalizedProps.class = payload;
      } else if (key === 'htmlFor') {
        normalizedProps.for = payload;
      }
      /* 值转换 */
      // style object 特殊处理，字符串使用默认逻辑
      else if (key === 'style' && payload && isObject(payload)) {
        normalizedProps.style = JSON.stringify(payload);
      }
      else {
        normalizedProps[key] = payload;
      }
    });

  return normalizedProps;
}
