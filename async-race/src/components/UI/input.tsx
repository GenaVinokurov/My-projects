import React from 'react';
import './ui.css';

type InputProps = {
  id: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MyInput = ({ placeholder, id, value, onChange }: InputProps) => (
  <div className="input-wrapper">
    <label htmlFor={id}>
      <input type="text" placeholder={placeholder} id={id} className="input" onChange={onChange} />
    </label>

  </div>
);

export default MyInput;