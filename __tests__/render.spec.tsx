// package
import { h, Fragment } from 'preact';
// internal
import { render } from '../src/render';
import { createElement } from '../src/host';
// fixtures
import { A, B, Theme } from './__fixtures__/components.fixture';

// Todo - find better way to keep import references
if (h || Fragment) { }

describe('renderer', () => {
  const parent = createElement('root', {});

  beforeEach(() => {
    parent.children = [];
  });

  it('should render naive element vnode', () => {
    expect(render(<p className="text-left">Left aligned text on all viewport sizes.</p>, parent)).toMatchSnapshot();;
  });

  it('should render naive functinal vnode', () => {
    expect(render(<A title="Hello World" message="youth is not a time of life!" />, parent)).toMatchSnapshot();
  });

  it('should support mixed children', () => {
    const vnode = (
      <>
        {null}
        <p className="text-left">Left aligned text on all viewport sizes.</p>
        {undefined}
        {null}
        <A title="Hello World" message="youth is not a time of life!" />
        {true}
        Mixed Text Node
      </>
    )

    expect(render(vnode, parent)).toMatchSnapshot();
  });

  it('should support context type with defaults', () => {
    expect(render(<B />, parent)).toMatchSnapshot();
  });

  it('should support context type with payload', () => {
    expect(render(
      <Theme.Provider value={{ header: 'yellow' }}>
        <B />
      </Theme.Provider>, parent)
    ).toMatchSnapshot();
  });
});
