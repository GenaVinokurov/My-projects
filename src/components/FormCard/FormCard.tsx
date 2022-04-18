import React from 'react';
import css from './FormCard.module.css';
import { FormCardType } from '../../Types';

const FormCard: React.FC<FormCardType> = (props) => {
  return (
    <div className={css.container}>
      <p className={css.text}>Name: {props.name}</p>
      <p className={css.text}>Last name: {props.lastName}</p>
      <p className={css.text}>Date: {props.date}</p>
      <p className={css.text}>Country: {props.countries}</p>
    </div>
  );
};

export default FormCard;
