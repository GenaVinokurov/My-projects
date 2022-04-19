import React from 'react';
import css from './Switch.module.css';

const Switch = () => {
  return (
    <label className={css.switch} htmlFor="switcherMain">
      <input type="checkbox" id="switcherMain" className={css.input} />
      <span className={css.slider} />
    </label>
  );
};

export default Switch;
