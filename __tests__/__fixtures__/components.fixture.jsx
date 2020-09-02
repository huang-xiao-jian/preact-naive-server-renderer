// package
import { h, Fragment, createContext, Component } from 'preact';

export const Theme = createContext({
  header: 'red'
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
    return <header>{`Header With Context ${context.header}`}</header>
  }
}

B.contextType = Theme;
