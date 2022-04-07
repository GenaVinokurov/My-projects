import React, { Component } from 'react';
import css from './Search.module.css';

interface IState {
  inputValue: string;
}

export default class Search extends Component<Record<string, unknown>, IState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputValue: '',
    };
  }

  componentDidMount = () => this.setState({ inputValue: localStorage.getItem('inputValue') || '' });

  componentWillUnmount = () => localStorage.setItem('inputValue', this.state.inputValue);

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  onClick() {
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
