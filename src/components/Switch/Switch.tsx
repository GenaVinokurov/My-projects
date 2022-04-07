import React, { Component } from 'react';
import css from './Switch.module.css';

class Switch extends Component {
  render() {
    return (
      <label className={css.switch} htmlFor="switcherMain">
        <input type="checkbox" id="switcherMain" className={css.input} />
        <span className={css.slider} />
      </label>
    );
  }
}

export default Switch;
