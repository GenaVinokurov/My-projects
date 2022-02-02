import React from 'react';
import style from './Header.module.css'
import Button from '../button/Button';

const Header: React.FC = () => (
  <header className={style.container}>
    <div className={style.wrapper}>
      <h1 className={style.title}>RSLang</h1>
      <a href="/" className={style.link}>О команде</a>
    </div>
    <div className={style.wrapper}>
      <Button>Войти</Button>
      <button type='button' className={style.burger}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
);

export default Header;