import React from 'react';
import './ui.css';

type InputProps = {
  id: string;
  placeholder?: string;
}

const MyInput = ({ placeholder, id }: InputProps) => (
  <div className="input-wrapper">
    <label htmlFor={id}>
      <input type="text" placeholder={placeholder} id={id} className="input" />
    </label>

  </div>
);

export default MyInput;