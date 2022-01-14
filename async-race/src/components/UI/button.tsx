import React from 'react';
import './ui.css';

const Button: React.FC = ({ children }) => (
  <button className="btn" type="button">
    {children}
  </button>
);

export default Button;