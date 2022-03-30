import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { RenderCards } from '../../Types';

class Main extends Component<Record<string, unknown>, Partial<RenderCards>> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
    };
  }
  componentDidMount() {
    fetch('https://restcountries.com/v2/all')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            allCountries: result,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }
  render() {
    const { error, isLoaded, allCountries } = this.state;
    if (error) return <div>Error: {error}</div>;
    if (!isLoaded) return <div>Loading...</div>;

    const countries =
      allCountries &&
      allCountries.map((el, i) => (
        <Card
          key={i}
          id={el.name}
          name={el.name}
          region={el.region}
          flag={el.flag}
          capital={el.capital}
          data-testid={`item-${i}`}
        />
      ));

    return (
      <div className={css.container}>
        <Search />
        <ul className={css.wrapper}>{countries}</ul>
      </div>
    );
  }
}

export default Main;
