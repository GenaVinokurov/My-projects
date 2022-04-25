import React, { ChangeEvent, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { CardType } from '../../Types';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';

const Main: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCountries, setAllCountries] = useState<CardType[]>([]);
  const [error, setError] = useState();
  const [isModal, setIsModal] = useState(false);
  const [countryName, setCountryName] = useState<string>('');
  const [countryRegion, setCountryRegion] = useState<string>('');
  const [countryCapital, setCountryCapital] = useState<string>('');
  const [sort, setSort] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(10);

  const allDownload = () => {
    fetch(`https://restcountries.com/v2/${sort}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setAllCountries(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };
  useEffect(() => {
    allDownload();
  }, [sort]);

  const onSearch = async (str: string) => {
    if (str === '') {
      allDownload();
    } else {
      const res = await fetch(`https://restcountries.com/v2/name/${str}`)
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
            setIsLoaded(true);
            setError(error);
          }
        );
      setIsLoaded(true);
      setAllCountries(res) as unknown as CardType[];
    }
  };
  const toggleModal = (name: string, region: string, capital: string) => {
    setIsModal(!isModal);
    setCountryName(name || '');
    setCountryRegion(region || '');
    setCountryCapital(capital || '');
  };
  const changeValueSort = (e: ChangeEvent) => {
    const el = e.target as HTMLSelectElement;
    setSort(el.value);
  };
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const currentCountry = allCountries.slice(firstCountryIndex, lastCountryIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (error) return <div>Error: {error}</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className={css.container}>
      {isModal && (
        <Modal
          onClose={() => toggleModal('', '', '')}
          name={countryName}
          region={countryRegion}
          capital={countryCapital}
        ></Modal>
      )}
      <Search onSearch={onSearch} />

      <div className={css.sort__container}>
        <div>
          <h3 className={css.sort__title}>Regional bloc</h3>
          <select
            className={css.sort}
            onChange={(e) => {
              changeValueSort(e);
            }}
          >
            <option value="all">All nations</option>
            <option value="/regionalbloc/EU">European union</option>
            <option value="/regionalbloc/EEU">Eurasian Economic Union</option>
            <option value="/regionalbloc/PA">Pacific Alliance</option>
            <option value="/regionalbloc/ASEAN">Association of Southeast Asian Nations</option>
            <option value="/regionalbloc/NAFTA">North American Free Trade Agreement</option>
          </select>
        </div>
        <div>
          <h3 className={css.sort__title}>LANGUAGE</h3>
          <select
            className={css.sort}
            onChange={(e) => {
              changeValueSort(e);
            }}
          >
            <option value="all">All languages</option>
            <option value="/lang/en">English</option>
            <option value="/lang/es">Spanish</option>
            <option value="/lang/ru">Russian</option>
            <option value="/lang/fr">French</option>
            <option value="/lang/de">German</option>
          </select>
        </div>
      </div>

      <ul className={css.wrapper}>
        {currentCountry &&
          currentCountry.map((el, i) => (
            <Card key={i} {...el}>
              <button
                className={css.btn__more}
                onClick={() => toggleModal(el.name, el.region, el.capital)}
              >
                More information
              </button>
            </Card>
          ))}
      </ul>
      <Pagination
        countriesPerPage={countriesPerPage}
        totalCountries={allCountries.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Main;
