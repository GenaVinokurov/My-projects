import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { CardType } from '../../Types';
import Pagination from '../../components/Pagination/Pagination';
import { AllCountriesContext, OptContext, CountriesContext } from '../../Context';
import { ContextType, OptContextType, AllCountriesContextType } from '../../Types';
import { useNavigate } from 'react-router-dom';

const Main: React.FC = () => {
  const DATA = 'https://restcountries.com/v2/';
  const [isLoaded, setIsLoaded] = useState(false);
  const { allCountries, setAllCountries } = useContext(
    AllCountriesContext
  ) as AllCountriesContextType;
  const [error, setError] = useState();
  const { sort, setSort } = useContext(CountriesContext) as ContextType;
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);
  const { defaultOpt, setDefaultOpt } = useContext(OptContext) as OptContextType;
  const navigate = useNavigate();
  const toMoreInfo = (id: number) => {
    navigate('/more', { state: id });
  };
  const allDownload = () => {
    fetch(`${DATA + sort}`)
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
      const res = await fetch(`${DATA + 'name/' + str}`)
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
  const changeValueSort = (e: ChangeEvent) => {
    const el = e.target as HTMLSelectElement;
    if (el.id === 'bloc-opt') {
      setDefaultOpt({
        bloc: el.value,
        lang: 'all',
      });
    } else {
      setDefaultOpt({
        bloc: 'all',
        lang: el.value,
      });
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
  const langOptions = [
    { value: 'all', label: 'All nations' },
    { value: '/lang/en', label: 'English' },
    { value: '/lang/es', label: 'Spanish' },
    { value: '/lang/ru', label: 'Russian' },
    { value: '/lang/fr', label: 'French' },
    { value: '/lang/de', label: 'German' },
  ];

  if (error) return <div>Error: {error}</div>;
  if (!isLoaded) return <div>Loading...</div>;
  return (
    <div className={css.container}>
      <Search onSearch={onSearch} />

      <div className={css.sort__container}>
        <div>
          <h3 className={css.sort__title}>Regional bloc</h3>
          <select
            className={css.sort}
            value={defaultOpt.bloc}
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
            value={defaultOpt.lang}
            onChange={(e) => {
              changeValueSort(e);
            }}
          >
            {langOptions.map((el) => {
              return (
                <option value={el.value} key={el.value}>
                  {el.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <ul className={css.wrapper}>
        {currentCountry &&
          currentCountry.map((el, i) => (
            <Card key={i} {...el}>
              <button onClick={() => toMoreInfo(i)} className={css.btn__more}>
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
