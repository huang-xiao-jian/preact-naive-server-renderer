/**
 * @description - render vnode tree into element vnode tree
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { toChildArray, Component, options } from 'preact';
// internal
import { createElement } from './host';
import { renderProps } from './render-props';

// server side render entrance
export function render(vnode, parent, globalContext = {}) {
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    renderTextNode(vnode, parent);
  } else if (typeof vnode.type === 'function') {
    renderFunctionalNode(vnode, parent, globalContext);
  } else if (typeof vnode.type === 'string') {
    renderElementNode(vnode, parent, globalContext);
  } else if (Array.isArray(vnode)) {
    renderChildren(vnode, parent, globalContext);
  }
  // else {
  //   ignore boolean, undefined, null
  //}
}

// just for illustrate
export function renderTextNode(vnode, parent) {
  parent.appendChild(`${vnode}`);
}

export function renderElementNode(vnode, parent, globalContext) {
  const { type, props } = vnode;
  // render properties earlier
  const properties = renderProps(props);
  const element = createElement(type, properties);

  // handle special prop case dangerouslySetInnerHTML
  if (props.dangerouslySetInnerHTML?.__html) {
    element.appendChild(props.dangerouslySetInnerHTML.__html);
  } else {
    // render children into element, consider it as standalone render context
    renderChildren(props.children, element, globalContext);
  }

  // insert operation, cursor always tail within server renderer
  parent.appendChild(element);
}

export function renderChildren(children, parent, globalContext) {
  // toChildArray flatten children, ignore null, undefined, boolean child
  // keep only string, number and element vnode
  const _children = toChildArray(children);

  _children.forEach((childVNode) => {
    render(childVNode, parent, globalContext);
  });
}

export function renderFunctionalNode(vnode, parent, globalContext) {
  // 组件实例
  let ins;

  const contextType = vnode.type.contextType;
  const provider = contextType && globalContext[contextType.__c];
  // contextType should only related to class component
  // useContext should only related to function component
  // context structure change within server side, weired
  // _defaultValue --> __
  const context = contextType
    ? provider
      ? provider.props.value
      : contextType.__
    : globalContext;

  // Instantiate the new component
  if (vnode.type.prototype && vnode.type.prototype.render) {
    ins = new vnode.type(vnode.props, context);
  } else {
    ins = new Component(vnode.props, context);
    ins.constructor = vnode.type;
    ins.render = doRender;
  }

  // preset property
  ins.state = ins.state || {};

  // only getDerivedStateFromProps hook should be called
  if (typeof vnode.type.getDerivedStateFromProps === 'function') {
    Object.assign(
      ins.state,
      vnode.type.getDerivedStateFromProps(vnode.props, ins._nextState)
    );
  }

  // hooks bounding property change, weired still
  // unnecessary when drop hooks support
  // __component --> __c
  vnode.__c = ins;

  // context structure change within server side, weired
  // options.render --> options.__r
  if (options.__r) {
    options.__r(vnode);
  }

  const children = ins.render(ins.props, ins.state, ins.context);

  // support context inheritance
  // getChildContext only occure after render method call
  if (ins.getChildContext != null) {
    globalContext = { ...globalContext, ...ins.getChildContext() };
  }

  renderChildren(children, parent, globalContext);
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props) {
  return this.constructor(props);
}
