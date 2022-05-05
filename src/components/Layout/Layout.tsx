import React, { useReducer } from 'react';
import Nav from '../Nav/Nav';
import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';
import { ActionType, CounterType } from '../../Types';

const initialState = { count: 0 };

function reducer(state: CounterType, action: ActionType) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

const Layout = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <header className={css.container}>
        <Nav />
        <div className={css.wrapper}>
          <p className={css.text}>Count: {state.count}</p>
          <button className={css.btn} onClick={() => dispatch({ type: 'decrement' })}>
            -
          </button>
          <button className={css.btn} onClick={() => dispatch({ type: 'increment' })}>
            +
          </button>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
