import React, { Component } from 'react';
import css from './Search.module.css';
import { CardType } from '../../Types';

interface IState {
  inputValue: string;
  allCountries: CardType[];
  isLoaded: boolean;
  error: null;
}
type PropsTypes = {
  allCountries: CardType[];
  isLoaded: boolean;
  error: null;
};

export default class Search extends Component<Record<string, unknown>, IState> {
  constructor(props: PropsTypes) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      inputValue: localStorage.getItem('inputValue') || '',
      allCountries: props.allCountries,
      isLoaded: props.isLoaded,
      error: props.error,
    };
  }

  componentDidMount = () => {
    console.log('sdsddsd= ', this.state.inputValue);
    fetch(`https://restcountries.com/v2/name/${this.state.inputValue}`)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            allCountries: result,
          });
          console.log(this.state);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  };

  componentWillUnmount = () => localStorage.setItem('inputValue', this.state.inputValue);

  handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  onClick() {
    this.setState({ isLoaded: false });
    localStorage.setItem('inputValue', this.state.inputValue);
    this.componentDidMount();
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
