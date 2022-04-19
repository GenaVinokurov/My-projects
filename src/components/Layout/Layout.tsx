import React from 'react';
import Nav from '../Nav/Nav';
import css from './Layout.module.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <header className={css.container}>
        <Nav />
      </header>
      <Outlet />
    </>
  );
};

export default Layout;
