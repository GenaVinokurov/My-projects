import React from 'react';
import css from './FormCard.module.css';
import { FormCardType } from '../../Types';

const FormCard: React.FC<FormCardType> = (props) => {
  const { name, lastName, date, countries } = props;
  return (
    <div className={css.container}>
      <p className={css.text}>Name: {name}</p>
      <p className={css.text}>Last name: {lastName}</p>
      <p className={css.text}>Date: {date}</p>
      <p className={css.text}>Country: {countries}</p>
    </div>
  );
};

export default FormCard;
