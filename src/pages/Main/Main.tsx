import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { CardType } from '../../Types';
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';
import {
  BlocOptContext,
  BlocOptContextType,
  ContextType,
  CountriesContext,
  LangOptContext,
  LangOptContextType,
} from '../../Context';

const Main: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCountries, setAllCountries] = useState<CardType[]>([]);
  const [error, setError] = useState();
  const [isModal, setIsModal] = useState(false);
  const [countryName, setCountryName] = useState<string>('');
  const [countryRegion, setCountryRegion] = useState<string>('');
  const [countryCapital, setCountryCapital] = useState<string>('');
  const { sort, setSort } = useContext(CountriesContext) as ContextType;
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const { defaultBlocOpt, setDefaultBlocOpt } = useContext(BlocOptContext) as BlocOptContextType;
  const { defaultLangOpt, setDefaultLangOpt } = useContext(LangOptContext) as LangOptContextType;
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
    if (el.id === 'bloc-opt') {
      setDefaultBlocOpt(el.value);
      setDefaultLangOpt('all');
    } else {
      setDefaultLangOpt(el.value);
      setDefaultBlocOpt('all');
    }
    setSort(el.value);
  };
  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const currentCountry = allCountries.slice(firstCountryIndex, lastCountryIndex);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const blocOptions = [
    { value: 'all', label: 'All nations' },
    { value: '/regionalbloc/EU', label: 'European union' },
    { value: '/regionalbloc/EEU', label: 'Eurasian Economic Union' },
    { value: '/regionalbloc/PA', label: 'Pacific Alliance' },
    { value: '/regionalbloc/ASEAN', label: 'Association of Southeast Asian Nations' },
    { value: '/regionalbloc/NAFTA', label: 'North American Free Trade Agreement' },
  ];

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
            value={defaultBlocOpt}
            id="bloc-opt"
            onChange={(e) => {
              changeValueSort(e);
            }}
          >
            {blocOptions.map((el) => {
              return (
                <option value={el.value} key={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h3 className={css.sort__title}>LANGUAGE</h3>
          <select
            className={css.sort}
            id="lang-opt"
            value={defaultLangOpt}
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
