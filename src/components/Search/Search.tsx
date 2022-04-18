import React, { Component, useState } from 'react';
import css from './Search.module.css';
import { CardType } from '../../Types';
import Main from '../../pages/Main/Main';

type PropsTypes = {
  onSearch: (arg: string) => void;
};

const Search: React.FC<PropsTypes> = (props) => {
  const [inputValue, setInputValue] = useState<string>(localStorage.getItem('inputValue') || '');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputValue(e.target.value);
  };
  const onClick = () => {
    props.onSearch(inputValue);
    localStorage.setItem('inputValue', inputValue);
  };
  return (
    <div className={css.container}>
      <input
        type="search"
        color="warning"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search"
        autoComplete="off"
        data-testid="input-search"
        title="search"
      />
      <button type="button" onClick={() => onClick()} data-testid="button-search">
        Search
      </button>
    </div>
  );
};

export default Search;
