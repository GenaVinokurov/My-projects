import React, { Component } from 'react';
import css from './Search.module.css';

interface IState {
  search: string;
}

class Search extends Component<Record<string, unknown>, IState> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      search: localStorage.getItem('search') || '',
    };
  }
  onClick() {
    localStorage.setItem('search', this.state.search);
  }
  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    this.setState({ search: text });
  }
  render() {
    return (
      <div className={css.container}>
        <label>
          <input
            type="text"
            placeholder="Enter the text"
            onChange={(e) => this.onChange(e)}
            title="search"
            value={this.state.search}
          />
        </label>
        <button type="button" onClick={() => this.onClick()} title="button">
          Search
        </button>
      </div>
    );
  }
}

export default Search;
