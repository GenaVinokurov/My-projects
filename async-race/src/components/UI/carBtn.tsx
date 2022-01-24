import React from 'react';
import './ui.css';
import { ButtonProp } from '../types';

const CarBtn = ({ children, id, onClick }: ButtonProp) => (
  <button className="btn-car" type="button" onClick={onClick} id={`start-button-${id}`}>
    {children}
  </button>
);

export default CarBtn;