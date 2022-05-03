import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AllCountriesContext } from '../../Context';
import css from './MorePage.module.css';
import { AllCountriesContextType } from '../../Context';
// onClick={() => toggleModal(el.name, el.region, el.capital)}
const MorePage = () => {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const location = useLocation();
  const { allCountries, setAllCountries } = useContext(
    AllCountriesContext
  ) as AllCountriesContextType;
  const num = location.state as number;
  const current = allCountries[num];
  const { name, region, capital } = current;
  return (
    <div>
      {console.log(current)}
      <button onClick={goBack} className={css.btn}>
        Go back
      </button>
      <h1>{name}</h1>
      <p className={css.text}>Capital: {capital}</p>
      <p className={css.text}>Region: {region}</p>
    </div>
  );
};

export default MorePage;
