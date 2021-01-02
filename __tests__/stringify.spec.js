/* eslint-disable quotes */
/**
 * @description - suits example
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// internal
import {
  stringifyElementChild,
  stringifyElementAttributes,
} from '../src/stringify';

describe('stringify element attributes', () => {
  it('should support empty', () => {
    expect(stringifyElementAttributes({ alt: '' })).toMatchInlineSnapshot(
      `"alt"`
    );
  });

  it('should convert number', () => {
    expect(stringifyElementAttributes({ value: 5 })).toMatchInlineSnapshot(
      `"value=5"`
    );
  });

  it('should take care of boolean value', () => {
    expect(
      stringifyElementAttributes({
        disabled: true,
        readonly: true,
      })
    ).toMatchInlineSnapshot(`"disabled readonly"`);

    expect(
      stringifyElementAttributes({
        disabled: true,
        readonly: false,
      })
    ).toMatchInlineSnapshot(`"disabled"`);

    expect(
      stringifyElementAttributes({
        readonly: false,
        'aria-haspopup': false,
      })
    ).toMatchInlineSnapshot(`"aria-haspopup=false"`);
  });

  it('should suport single', () => {
    expect(stringifyElementAttributes({ id: 'header' })).toMatchInlineSnapshot(
      `"id=\\"header\\""`
    );
  });

  it('should suport multiple', () => {
    expect(
      stringifyElementAttributes({
        id: 'header',
        style: 'color:red',
        'data-id': 'header',
      })
    ).toMatchInlineSnapshot(
      `"data-id=\\"header\\" id=\\"header\\" style=\\"color:red\\""`
    );
  });
});

describe('stringify element child', () => {
  it('should support literal case', () => {
    expect(stringifyElementChild('Hello world!')).toEqual('Hello world!');
    expect(stringifyElementChild(555)).toEqual('555');
  });

  it('should support element vnode case', () => {
    const vnode = {
      type: 'div',
      props: {
        id: 'header',
      },
      children: [
        'Hello World!',
        {
          type: 'h4',
          props: {},
          children: ['Level 4 Title'],
        },
      ],
    };

    expect(stringifyElementChild(vnode)).toMatchInlineSnapshot(
      `"<div id=\\"header\\">Hello World!<h4 >Level 4 Title</h4></div>"`
    );
  });
});
