import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';

class Layout extends Component {
  render() {
    return (
      <>
        <header className={css.container}>
          <Nav></Nav>
        </header>
        <Outlet />
      </>
    );
  }
}

export default Layout;
