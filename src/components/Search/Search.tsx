import React, { Component } from 'react';

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
      <div className="flex items-center pt-3 pb-6 gap-x-3">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          className="w-full p-1 rounded-md pl-2"
          type="search"
          color="warning"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="Search"
          autoComplete="off"
          data-testid="input-search"
        />
        <button type="button" onClick={() => this.onClick()} title="button">
          Search
        </button>
      </div>
    );
  }
}
