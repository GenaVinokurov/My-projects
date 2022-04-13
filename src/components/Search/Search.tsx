import React, { Component } from 'react';
import css from './Search.module.css';
import { CardType } from '../../Types';
import Main from '../../pages/Main/Main';

interface IState {
  inputValue: string;
}
type PropsTypes = {
  allCountries: CardType[];
  onSearch: (arg1: string) => void;
};

export default class Search extends Component<Record<string, unknown>, IState> {
  onSearch: (arg1: string) => void;
  constructor(props: PropsTypes) {
    super(props);
    this.onSearch = props.onSearch.bind(Main);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputValue: localStorage.getItem('inputValue') || '',
    };
  }

  componentWillUnmount = () => localStorage.setItem('inputValue', this.state.inputValue);

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  onClick() {
    this.onSearch(this.state.inputValue);
    localStorage.setItem('inputValue', this.state.inputValue);
  }
  render() {
    return (
      <div className={css.container}>
        <input
          type="search"
          color="warning"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Search"
          autoComplete="off"
          data-testid="input-search"
          title="search"
        />
        <button type="button" onClick={() => this.onClick()} title="button">
          Search
        </button>
      </div>
    );
  }
}
