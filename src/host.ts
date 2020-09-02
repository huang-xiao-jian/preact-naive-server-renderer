// internal
import { ElementVNodeProps } from './index.interface';

// inline type
type HostElementChild =
  | HostElement
  | string
  | number
  | boolean
  | null
  | undefined;

// type, props, children
export class HostElement {
  public children: HostElementChild[];

  constructor(public type: string, public props: ElementVNodeProps) {
    this.type = type;
    this.props = props;
    this.children = [];
  }

  appendChild(element: HostElementChild) {
    this.children.push(element);
  }
}

export function createElement(type: string, props: ElementVNodeProps): HostElement {
  return Reflect.construct(HostElement, [type, props]);
}
