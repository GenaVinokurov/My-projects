import React, { Component } from 'react';
import css from './Nav.module.css';
import { Link } from 'react-router-dom';

class Nav extends Component {
  render() {
    return (
      <nav>
        <ul className={css.ul}>
          <li>
            <Link to="/" className={css.link}>
              Main
            </Link>
          </li>
          <li>
            <Link to="/about" className={css.link}>
              About Us
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Nav;
