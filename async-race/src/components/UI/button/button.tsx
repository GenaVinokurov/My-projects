import React from 'react';
import './button.css';

const Button: React.FC = ({ children }) => (
  <button className="btn" type="button">
    {children}
  </button>
);

export default Button;