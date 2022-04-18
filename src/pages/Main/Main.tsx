import React, { useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import css from './Main.module.css';
import Card from '../../components/Card/Card';
import { CardType, RenderCards } from '../../Types';
import Modal from '../../components/Modal/Modal';

const Main: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [allCountries, setAllCountries] = useState<CardType[]>([]);
  const [error, setError] = useState();
  const [isModal, setIsModal] = useState(false);
  const [countryName, setCountryName] = useState<string>('');
  const [countryRegion, setCountryRegion] = useState<string>('');
  const [countryCapital, setCountryCapital] = useState<string>('');
  const allDownload = () => {
    fetch('https://restcountries.com/v2/all')
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
  }, []);

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
      <ul className={css.wrapper}>
        {allCountries &&
          allCountries.map((el, i) => (
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
    </div>
  );
};

export default Main;
