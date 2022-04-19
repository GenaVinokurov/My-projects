import React from 'react';
import css from './Nav.module.css';
import { Link } from 'react-router-dom';

const Nav: React.FC = () => {
  const navList = [
    {
      link: '/',
      label: 'Main',
    },
    {
      link: '/about',
      label: 'About Us',
    },
    {
      link: '/form',
      label: 'Form',
    },
  ];
  return (
    <nav>
      <ul className={css.ul}>
        {navList.map((el) => {
          return (
            <li key={el.label}>
              <Link to={el.link} className={css.link}>
                {el.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
