import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { ICard, RenderCards } from '../../Types';

export const getCountriesAPI = async (): Promise<Array<ICard>> => {
  const response = await fetch('https://restcountries.com/v2/all');
  return response.json();
};

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
    if (error) {
      return <div>Ошибка: {error}</div>;
    } else if (!isLoaded) {
      return <div>Загрузка...</div>;
    } else {
      return (
        <div className={css.container}>
          Main page
          <Search></Search>
          <ul className={css.wrapper}>
            {allCountries?.map((el, id) => {
              {
                console.log(el);
              }
              return (
                <Card
                  key={id}
                  name={el.name}
                  region={el.region}
                  flag={el.flag}
                  capital={el.capital}
                />
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default Main;
