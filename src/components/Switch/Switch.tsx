import React, { Component } from 'react';
import css from './Switch.module.css';

class Switch extends Component {
  render() {
    return (
      <label className={css.switch} htmlFor="switcher1">
        <input type="checkbox" id="switcher1" className={css.input} />
        <span className={css.slider} />
      </label>
    );
  }
}

export default Switch;
