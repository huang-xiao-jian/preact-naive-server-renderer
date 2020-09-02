// stringify related
export type SingleTag = string | RegExp;

// spread case
export interface ElementVNode {
  type: string;
  props: ElementVNodeProps & SpecialElementVNodeProps;
  children: ElementChild[];
}

export type ElementChild =
  | ElementVNode
  | string
  | number
  | boolean
  | null
  | undefined;

export interface ElementVNodeProps {
  [key: string]: string | boolean | number;
}

// 渲染成 VNode tree，确定所有 children 都为数组
export interface SpecialElementVNodeProps {
  dangerouslySetInnerHTML?: {
    __html: string;
  };
}

