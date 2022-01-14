import React from 'react';

type InputProps = {
  id: string;
  placeholder?: string;
}

const MyInput = ({ placeholder, id }: InputProps) => (
  <div className="input-wrapper">
    <label htmlFor={id}>
      <input type="text" placeholder={placeholder} id={id} />
    </label>

  </div>
);

export default MyInput;