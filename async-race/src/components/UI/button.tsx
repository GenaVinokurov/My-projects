import React from 'react';
import './ui.css';
import { ButtonProp } from '../types';

const Button = ({ children, onClick }: ButtonProp) => (
  <button className="btn" type="button" onClick={onClick}>
    {children}
  </button>
);

export default Button;