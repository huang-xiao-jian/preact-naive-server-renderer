// package
import { h, Fragment, createContext, Component } from 'preact';
import { useContext } from 'preact/hooks';

// Todo - find better way to keep import references
if (h || Fragment) {
}

export const Theme = createContext({
  header: 'red',
});

// naive function component
export function A(props) {
  return (
    <Fragment>
      <h4>{props.title}</h4>
      <p>{props.message}</p>
    </Fragment>
  );
}

// class component for static context
export class B extends Component {
  render(_, __, context) {
    return <header>{`Header With Context ${context.header}`}</header>;
  }
}

B.contextType = Theme;

export function C() {
  const theme = useContext(Theme);

  return <header>{`Header With Context ${theme.header}`}</header>;
}
