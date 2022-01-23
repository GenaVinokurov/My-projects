import React from 'react';
import './ui.css';
import { ButtonProp } from '../types';

const CarBtn = ({ children, onClick }: ButtonProp) => (
  <button className="btn-car" type="button" onClick={onClick}>
    {children}
  </button>
);

export default CarBtn;