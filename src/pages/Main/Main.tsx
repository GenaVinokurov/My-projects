import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { CardType, RenderCards } from '../../Types';

class Main extends Component<Record<string, unknown>, Partial<RenderCards>> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      error: null,
      isLoaded: true,
      allCountries: [],
    };
  }
  componentDidMount() {}

  onSearch = async (str: string) => {
    const rez = await fetch(`https://restcountries.com/v2/name/${str}`)
      .then((res) => res.json())
      .then((result) => {
        return result;
      });

    this.setState({
      isLoaded: true,
      allCountries: rez as unknown as CardType[],
    });
  };

  render() {
    const { error, isLoaded, allCountries } = this.state;
    console.log('allCountries', allCountries);
    if (error) return <div>Error: {error}</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
      <div className={css.container}>
        {console.log(this.state)}
        <Search
          onSearch={this.onSearch}
          state={this.state.allCountries}
          isLoaded={this.state.isLoaded}
          error={this.state.error}
        />
        <ul className={css.wrapper}>
          {allCountries &&
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
            ))}
        </ul>
      </div>
    );
  }
}

export default Main;
