import React, { Component } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { CardType, RenderCards } from '../../Types';
import Modal from '../../components/Modal/Modal';
class Main extends Component<Record<string, unknown>, Partial<RenderCards>> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      allCountries: [],
      isModalOpen: false,
    };
  }
  allDownload() {
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
  componentDidMount() {
    this.allDownload();
  }

  onSearch = async (str: string) => {
    if (str === '') {
      this.allDownload();
    } else {
      const rez = await fetch(`https://restcountries.com/v2/name/${str}`)
        .then((res) => res.json())
        .then(
          (result) => {
            if ((result.status >= 200 && result.status < 300) || result.status === undefined) {
              return result;
            } else {
              alert('No result');
            }
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        );
      this.setState({
        isLoaded: true,
        allCountries: rez as unknown as CardType[],
      });
    }
  };
  toggleModal = (name: string, region: string, capital: string) => {
    this.setState((state) => ({
      isModalOpen: !state.isModalOpen,
      countryName: name || '',
      countryRegion: region || '',
      countryCapital: capital || '',
    }));
  };
  render() {
    const { error, isLoaded, allCountries, countryName, countryCapital, countryRegion } =
      this.state;
    if (error) return <div>Error: {error}</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
      <div className={css.container}>
        {this.state.isModalOpen && (
          <Modal
            onClose={() => this.toggleModal('', '', '')}
            name={countryName}
            region={countryRegion}
            capital={countryCapital}
          ></Modal>
        )}
        <Search onSearch={this.onSearch} state={allCountries} isLoaded={isLoaded} error={error} />
        <ul className={css.wrapper}>
          {allCountries &&
            allCountries.map((el, i) => (
              <Card key={i} {...el} data-testid={`item-${i}`}>
                <button
                  className={css.btn__more}
                  onClick={() => this.toggleModal(el.name, el.region, el.capital)}
                >
                  More information
                </button>
              </Card>
            ))}
        </ul>
      </div>
    );
  }
}

export default Main;
