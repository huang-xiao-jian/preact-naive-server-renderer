/**
* @description - render vnode tree into element vnode tree
* @author - huang.jian <hjj491229492@hotmail.com>
*/

// package
import { toChildArray, Component, options } from 'preact';
// internal
import { createElement } from './host';
import { renderProps } from './render-props';

// parallel with render method
// server side render, lifecycle unnecessary
export function render(vnode, parent, globalContext = {}) {
  if (typeof vnode.type === 'function') {
    renderFunctionalNode(vnode, parent, globalContext);
  } else {
    renderElementNode(vnode, parent, globalContext);
  }

  return parent;
}

export function renderElementNode(vnode, parent, globalContext) {
  const { type, props } = vnode;
  // 顺序不同，先筛选属性，再创建元素
  const properties = renderProps(props);
  const element = createElement(type, properties);

  if (props.dangerouslySetInnerHTML?.__html) {
    parent.appendChild(props.dangerouslySetInnerHTML.__html);
  } else {
    renderChildren(props.children, element, globalContext);
  }

  // 插入结构
  parent.appendChild(element)
}

export function renderChildren(children, parent, globalContext) {
  // toChildArray 扁平化 children，排除 null, undefined, boolean 取值
  const _children = toChildArray(children);

  _children.forEach((childVNode) => {
    if (typeof childVNode === 'string' || typeof childVNode === 'number') {
      parent.appendChild(`${childVNode}`);
    } else {
      render(childVNode, parent, globalContext);
    }
  })
}

export function renderFunctionalNode(vnode, parent, globalContext) {
  // 组件实例
  let ins;

  const contextType = vnode.type.contextType;
  const provider = contextType && globalContext[contextType.__c]
  // provider 无 contextType 声明
  // useContext 不应该出现在 class component 中，作死的人拦不住就不拦了
  const context =
    contextType
      // 呵呵，_defaultValue 变 __
      ? provider ? provider.props.value : contextType.__
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

  // only getDerivedStateFromProps hook with be called
  if (typeof vnode.type.getDerivedStateFromProps === 'function') {
    Object.assign(
      ins.state,
      vnode.type.getDerivedStateFromProps(vnode.props, ins._nextState)
    );
  }

  vnode.__c = ins;

  // options.render
  if (options.__r) options.__r(vnode);


  const renderResult = ins.render(ins.props, ins.state, ins.context)
  // support context inheritance
  if (ins.getChildContext != null) {
    globalContext = { ...globalContext, ...ins.getChildContext() };
  }

  renderChildren(renderResult, parent, globalContext);
}


/** The `.render()` method for a PFC backing instance. */
function doRender(props) {
  return this.constructor(props);
}
