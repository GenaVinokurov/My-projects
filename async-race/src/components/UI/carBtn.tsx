import React from 'react';
import './ui.css';

const CarBtn: React.FC = ({ children }) => (
  <button className="btn-car" type="button">
    {children}
  </button>
);

export default CarBtn;