import React from 'react';
import './ui.css';
import { ButtonProp } from '../types';

const Button = ({ children, extraClass = '', disabled, onClick }: ButtonProp) => (
  <button className={`${extraClass} btn`} type="button" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

export default Button;